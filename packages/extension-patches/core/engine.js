const fs = require('fs');
const path = require('path');
const { ALL_PATCHES, getPatchById } = require('../patches');
const { validateJavaScript } = require('./validator');

class PatchEngine {
  constructor(extPath) {
    this.extPath = extPath;
  }

  get bakPath() {
    return `${this.extPath}.bak`;
  }

  hasBackup() {
    return fs.existsSync(this.bakPath);
  }

  readContent() {
    return fs.readFileSync(this.extPath, 'utf8');
  }

  writeContent(content) {
    const dirName = path.dirname(this.extPath);
    const tmpPath = path.join(
      dirName,
      `tmp_patch_${Date.now()}_${Math.random().toString(36).slice(2)}.js`
    );

    fs.writeFileSync(tmpPath, content, 'utf8');

    try {
      const validation = validateJavaScript(tmpPath);
      if (!validation.ok) {
        throw new Error(`Syntax validation failed with node --check:\n${validation.error}`);
      }

      if (!this.hasBackup()) {
        fs.copyFileSync(this.extPath, this.bakPath);
      }

      fs.renameSync(tmpPath, this.extPath);
    } finally {
      if (fs.existsSync(tmpPath)) {
        try {
          fs.unlinkSync(tmpPath);
        } catch {}
      }
    }
  }

  checkPatchStatus(patch, content) {
    const allApplied = patch.REPLACEMENTS.every(([, repl]) => content.includes(repl));
    if (allApplied) {
      return 'applied';
    }

    const allUnpatched = patch.REPLACEMENTS.every(([target]) => content.includes(target));
    if (allUnpatched) {
      return 'unpatched';
    }

    return 'conflict';
  }

  getStatuses() {
    const content = this.readContent();
    const result = {};
    for (const patch of ALL_PATCHES) {
      result[patch.ID] = {
        name: patch.NAME,
        description: patch.DESCRIPTION,
        status: this.checkPatchStatus(patch, content),
      };
    }
    return result;
  }

  apply(patchId = 'all') {
    let content = this.readContent();
    const targetPatches =
      patchId === 'all' ? ALL_PATCHES : [this._resolvePatch(patchId)];

    const results = [];
    let modified = false;

    for (const patch of targetPatches) {
      const status = this.checkPatchStatus(patch, content);
      if (status === 'applied') {
        results.push([patch.ID, 'already_applied', 'Already applied.']);
      } else if (status === 'conflict') {
        results.push([patch.ID, 'conflict', 'Target signature missing or diverged.']);
      } else {
        for (const [target, replacement] of patch.REPLACEMENTS) {
          content = content.replace(target, replacement);
        }
        modified = true;
        results.push([patch.ID, 'applied', 'Successfully applied.']);
      }
    }

    if (modified) {
      this.writeContent(content);
    }

    return results;
  }

  revert() {
    if (!this.hasBackup()) {
      throw new Error(
        `No backup file found at '${this.bakPath}'. Extension is already unpatched.`
      );
    }

    const validation = validateJavaScript(this.bakPath);
    if (!validation.ok) {
      throw new Error(`Backup file failed syntax validation:\n${validation.error}`);
    }

    fs.copyFileSync(this.bakPath, this.extPath);
    fs.unlinkSync(this.bakPath);
  }

  _resolvePatch(patchId) {
    const patch = getPatchById(patchId);
    if (!patch) {
      const validIds = ALL_PATCHES.map((p) => p.ID).join(', ');
      throw new Error(
        `Unknown patch ID '${patchId}'. Available patches: ${validIds}`
      );
    }
    return patch;
  }
}

module.exports = { PatchEngine };
