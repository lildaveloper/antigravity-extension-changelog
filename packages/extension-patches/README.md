# Antigravity Extension Patches

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](../../LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-brightgreen.svg)](https://nodejs.org)

A minimal, safe patch manager for the Google Antigravity VS Code extension (`extension.js`).

---

## Quick Reference

| Command | Description |
| :--- | :--- |
| `node patch.js status` | View active version, backup status, and patch states (`[APPLIED]` / `[UNPATCHED]`) |
| `node patch.js apply all` | Create pristine backup (`.bak`) and apply all available patches |
| `node patch.js apply <id>` | Create pristine backup and apply a specific patch by ID |
| `node patch.js revert` | Restore original unpatched `extension.js` from backup and clear `.bak` |

> **Note**: After running `apply` or `revert`, reload your VS Code window (`Cmd+Shift+P` → **Developer: Reload Window**) to activate changes.

---

## Active Patches

| Patch ID | Description |
| :--- | :--- |
| [`line_counts`](patches/line_counts.js) | Fixes `+0 -0` diff count calculation in side-by-side mode by parsing unified diff hunks. |
| [`auto_open_priority`](patches/auto_open_priority.js) | Ensures files automatically open when modified if `antigravity.autoOpenFiles` is true. |

For detailed technical rationales, root cause analyses, and upstream lifecycle tracking, see [`PATCHES.md`](PATCHES.md). For release notes and version history, see [`CHANGELOG.md`](CHANGELOG.md).

---

## Command Details

### 1. Check Status
Inspects the extension file directly to check whether patches and backups are present.
```bash
node patch.js status
```

### 2. Apply All Patches
Backs up `extension.js` to `extension.js.bak` (if not already backed up), validates syntax via `node --check`, and atomically applies all patches.
```bash
node patch.js apply all
```

### 3. Apply a Single Patch
Apply only a specific patch by its ID without applying others.
```bash
node patch.js apply line_counts
node patch.js apply auto_open_priority
```

### 4. Revert All Patches
Instantly restores the original `extension.js` from `extension.js.bak` and removes the backup file.
```bash
node patch.js revert
```

### 5. Explicit Target (Optional)
Specify a custom path to `extension.js` if running outside the standard VS Code extensions directory:
```bash
node patch.js status --target /path/to/extension.js
node patch.js apply all --target /path/to/extension.js
node patch.js revert --target /path/to/extension.js
```

### 6. Version Safety Lock
Patches are strictly locked to the verified extension version. If VS Code auto-updates the extension to a newer release, `patch.js` blocks patch application to protect against syntax errors or conflicts until this repository has been audited and updated for the new release.

---

## Common Workflows

### Running Only a Single Patch
If multiple patches are currently applied and you only want one active:
```bash
# 1. Restore clean Google code
node patch.js revert

# 2. Apply only the patch you want
node patch.js apply auto_open_priority
```

### Upstream Update Handling
When VS Code updates the extension upstream, `patch.js` automatically blocks patching until this repository audits the new release for compatibility or upstream bug fixes. Once this repository is updated, pull latest changes and apply:
```bash
# 1. Inspect status and verified target version
node patch.js status

# 2. Apply verified patches
node patch.js apply all
```

---

## Adding a New Patch (Zero Boilerplate)

1. Create a new file in [`patches/`](patches/) (e.g. `patches/my_patch.js`).
2. Define metadata and string replacements:

```javascript
/**
 * Patch: Short Description
 * ID: my_patch
 */

const ID = 'my_patch';
const NAME = 'Human Readable Name';
const DESCRIPTION = 'One sentence summary of the fix.';

const TARGET = `// exact original Google snippet`;
const REPLACEMENT = `// your patched replacement snippet`;

const REPLACEMENTS = [
  [TARGET, REPLACEMENT],
];

module.exports = {
  ID,
  NAME,
  DESCRIPTION,
  REPLACEMENTS,
};
```

3. Register it in [`patches/index.js`](patches/index.js):
```javascript
const lineCounts = require('./line_counts');
const autoOpenPriority = require('./auto_open_priority');
const myPatch = require('./my_patch');

const ALL_PATCHES = [
  lineCounts,
  autoOpenPriority,
  myPatch,
];
```

---

## Monorepo Context

Part of the [antigravity-extension-changelog](../../README.md) monorepo:
* [`packages/extension-history`](../extension-history) — Historical archive, sourcemap unbundler, and changelog for official Google Antigravity VS Code Extension releases.
* [`docs/`](../../docs) — Documentation website and web changelogs.

---

## Disclaimer

This project is an independent community modding tool. It is not affiliated with, endorsed by, or sponsored by Google LLC. All Google Antigravity trademarks and extension payloads remain the property of Google LLC.
