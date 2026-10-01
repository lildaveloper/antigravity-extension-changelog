const cp = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

/**
 * Validates JavaScript syntax using node --check.
 * Returns { ok: true } on success, or { ok: false, error: string } on failure.
 * @param {string} filePath
 * @return {{ ok: boolean, error?: string }}
 */
function validateJavaScript(filePath) {
  let targetPath = filePath;
  let tempCreated = false;

  // node --check requires a standard JS extension (.js, .cjs, .mjs)
  if (!/\.(js|cjs|mjs)$/i.test(filePath)) {
    const tmpDir = path.dirname(filePath);
    const tmpFile = path.join(tmpDir, `tmp_validate_${Date.now()}_${Math.random().toString(36).slice(2)}.js`);
    fs.copyFileSync(filePath, tmpFile);
    targetPath = tmpFile;
    tempCreated = true;
  }

  try {
    cp.execFileSync(process.execPath, ['--check', targetPath], {
      stdio: ['pipe', 'pipe', 'pipe'],
      encoding: 'utf8',
    });
    return { ok: true };
  } catch (err) {
    const errorOutput = err.stderr ? err.stderr.trim() : err.message;
    return { ok: false, error: errorOutput };
  } finally {
    if (tempCreated && fs.existsSync(targetPath)) {
      try {
        fs.unlinkSync(targetPath);
      } catch {}
    }
  }
}

module.exports = { validateJavaScript };
