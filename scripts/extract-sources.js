const fs = require('fs');
const path = require('path');

function extractSources() {
  const projectRoot = path.resolve(__dirname, '..');
  const stagingExt = path.join(projectRoot, '.staging', 'extension');
  const outSrcDir = path.join(projectRoot, 'extension', 'src');

  const extJsPath = path.join(stagingExt, 'extension.js');
  const mapPath = path.join(stagingExt, 'extension.js.map');

  if (!fs.existsSync(extJsPath) || !fs.existsSync(mapPath)) {
    console.error('[Error] extension.js or extension.js.map not found in .staging/extension. Run unpack-vsix.js first.');
    process.exit(1);
  }

  console.log('[Extract] Reading extension.js and source map...');
  const code = fs.readFileSync(extJsPath, 'utf8').split('\n');
  const map = JSON.parse(fs.readFileSync(mapPath, 'utf8'));

  if (fs.existsSync(outSrcDir)) {
    fs.rmSync(outSrcDir, { recursive: true, force: true });
  }
  fs.mkdirSync(outSrcDir, { recursive: true });

  console.log(`[Extract] Reconstructing ${map.sections.length} Google3 modules into extension/src/...`);

  let cjsCount = 0;
  let closureCount = 0;

  for (let i = 0; i < map.sections.length; i++) {
    const s = map.sections[i];
    const nextS = map.sections[i + 1];

    const rawSource = (s.map && s.map.sources && s.map.sources[0]) || `module_${i}.js`;
    const cleanPath = rawSource
      .replace('https://source.corp.google.com/piper///depot/google3/', '')
      .replace(/^\//, '');

    const startLine = s.offset.line;
    const endLine = nextS ? nextS.offset.line : code.length;
    let lines = code.slice(startLine, endLine);

    const isClosure = (s.offset.column === 48);
    const isLast = (i === map.sections.length - 1);

    if (isClosure) {
      closureCount++;
      // Strip goog.loadModule(...) header on first line if present
      const closurePrefix = "goog.loadModule(function(exports) {'use strict';";
      if (lines[0] && lines[0].startsWith(closurePrefix)) {
        lines[0] = lines[0].slice(closurePrefix.length);
      }

      // Strip trailing ;return exports;});
      let foundReturn = -1;
      for (let j = lines.length - 1; j >= 0; j--) {
        if (lines[j].includes(';return exports;});')) {
          foundReturn = j;
          lines[j] = lines[j].replace(';return exports;});', '').trimEnd();
          break;
        }
      }
      if (foundReturn !== -1) {
        lines = lines.slice(0, foundReturn + 1);
      }
    } else {
      cjsCount++;
      // Strip next module declaration and closing wrapper });
      while (lines.length > 0) {
        const last = lines[lines.length - 1].trim();
        if (
          !last ||
          last.startsWith('const $_req_') ||
          last.startsWith('var goog') ||
          last.startsWith('Object.defineProperty') ||
          last === '});'
        ) {
          lines.pop();
        } else {
          break;
        }
      }
    }

    // For the last module (extension.ts), ensure digital signatures and bundle footer are stripped
    if (isLast) {
      let cutoff = -1;
      for (let j = 0; j < lines.length; j++) {
        if (
          lines[j].includes('// SIG //') ||
          lines[j].includes('//# sourceMappingURL') ||
          lines[j].includes('}.call(Object.assign')
        ) {
          cutoff = j;
          break;
        }
      }
      if (cutoff !== -1) {
        lines = lines.slice(0, cutoff);
      }
    }

    const content = lines.join('\n').trim() + '\n';
    const destFile = path.join(outSrcDir, cleanPath);
    fs.mkdirSync(path.dirname(destFile), { recursive: true });
    fs.writeFileSync(destFile, content, 'utf8');
  }

  console.log(`[Extract] Reconstructed ${map.sections.length} source files (${closureCount} Closure, ${cjsCount} CJS) into extension/src/`);
}

if (require.main === module) {
  extractSources();
}

module.exports = { extractSources };
