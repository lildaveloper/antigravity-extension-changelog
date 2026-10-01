const fs = require('fs');
const path = require('path');
const os = require('os');

/**
 * Finds the active Antigravity extension.js file.
 * If explicitPath is provided, validates and returns it.
 * Otherwise, scans ~/.vscode/extensions/google.google-antigravity-[version]/extension.js.
 * @param {string} [explicitPath]
 * @return {string}
 */
function findExtensionJs(explicitPath) {
  if (explicitPath) {
    let resolved = explicitPath;
    if (resolved.startsWith('~')) {
      resolved = path.join(os.homedir(), resolved.slice(1));
    }
    resolved = path.resolve(resolved);
    if (!fs.existsSync(resolved) || !fs.statSync(resolved).isFile()) {
      throw new Error(`Specified target does not exist: ${resolved}`);
    }
    return resolved;
  }

  const extensionsDir = path.join(os.homedir(), '.vscode', 'extensions');
  if (!fs.existsSync(extensionsDir)) {
    throw new Error(`VS Code extensions directory not found at: ${extensionsDir}`);
  }

  const entries = fs.readdirSync(extensionsDir);
  const matches = entries
    .filter((name) => name.startsWith('google.google-antigravity-'))
    .map((name) => path.join(extensionsDir, name, 'extension.js'))
    .filter((fullPath) => fs.existsSync(fullPath))
    .sort();

  if (matches.length === 0) {
    throw new Error(
      'Could not find any installed google.google-antigravity extension in ~/.vscode/extensions/'
    );
  }

  // Return the latest installed version (sorted ascending)
  return matches[matches.length - 1];
}

/**
 * Extracts extension version from directory name or package.json.
 * @param {string} extPath
 * @return {string}
 */
function getExtensionVersion(extPath) {
  const dirName = path.basename(path.dirname(extPath));
  const match = dirName.match(/google-antigravity-([0-9.]+)/);
  if (match) {
    return match[1];
  }

  const pkgPath = path.join(path.dirname(extPath), 'package.json');
  if (fs.existsSync(pkgPath)) {
    try {
      return require(pkgPath).version || 'unknown';
    } catch {}
  }

  return 'unknown';
}

module.exports = { findExtensionJs, getExtensionVersion };
