const fs = require('fs');
const path = require('path');
const cp = require('child_process');

function normalizeBridge() {
  const projectRoot = path.resolve(__dirname, '..');
  const stagingExt = path.join(projectRoot, '.staging', 'extension');
  const targetExtDir = path.join(projectRoot, 'extension');

  if (!fs.existsSync(stagingExt)) {
    console.error('[Error] .staging/extension not found. Run unpack-vsix.js first.');
    process.exit(1);
  }

  fs.mkdirSync(targetExtDir, { recursive: true });

  // 1. Copy static metadata files into extension/
  const staticFiles = ['package.json', 'README.md', 'LICENSE.txt', 'ThirdPartyNotices.txt'];
  staticFiles.forEach((file) => {
    const src = path.join(stagingExt, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(targetExtDir, file));
    }
  });

  // 2. Copy extension icon assets into extension/img/
  const imgDir = path.join(stagingExt, 'img');
  if (fs.existsSync(imgDir)) {
    fs.cpSync(imgDir, path.join(targetExtDir, 'img'), { recursive: true });
  }

  // Helper function to strip digital signatures and format with Prettier
  function normalizeJsFile(fileName) {
    const rawPath = path.join(stagingExt, fileName);
    const destPath = path.join(targetExtDir, fileName);

    if (fs.existsSync(rawPath)) {
      console.log(`[Normalize] Stripping digital signature from ${fileName}...`);
      const rawContent = fs.readFileSync(rawPath, 'utf8');
      const stripped = rawContent.split('// SIG //')[0].trim() + '\n';
      fs.writeFileSync(destPath, stripped, 'utf8');

      console.log(`[Normalize] Formatting ${fileName} with Prettier...`);
      try {
        cp.execSync(`npx --yes prettier --write "${destPath}"`, { stdio: 'ignore' });
      } catch (err) {
        console.warn(`[Warning] Prettier formatting failed for ${fileName}, using stripped output:`, err.message);
      }
    }
  }

  normalizeJsFile('bridge.js');
  normalizeJsFile('loading_bridge.js');

  // 3. Clean up staging directory
  const stagingDir = path.join(projectRoot, '.staging');
  if (fs.existsSync(stagingDir)) {
    fs.rmSync(stagingDir, { recursive: true, force: true });
  }

  console.log('[Normalize] Normalization and staging cleanup complete.');
}

if (require.main === module) {
  normalizeBridge();
}

module.exports = { normalizeBridge };
