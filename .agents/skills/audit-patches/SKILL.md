---
name: audit-patches
description: Audits Antigravity Extension patches against a newly ingested upstream extension release, verifies patch compatibility, marks upstream bug resolutions/retirements in PATCHES.md, bumps TARGET_EXTENSION_VERSION in patch.js, updates the patches CHANGELOG.md, and rebuilds the documentation site.
---

# Audit Antigravity Patches Skill

This skill audits the companion hotfix patch set in `packages/extension-patches/` whenever a new Google Antigravity VS Code Extension release has been ingested into `packages/extension-history/`.

---

## 1. When to Use This Skill
Run `/audit-patches` whenever a new version of the extension has been ingested into `packages/extension-history/` and you need to:
1. Verify if Google resolved any of our active hotfixes upstream.
2. Verify if existing string replacements still apply cleanly or need updating.
3. Update `TARGET_EXTENSION_VERSION` in `packages/extension-patches/patch.js`.
4. Document the upstream resolution or ongoing compatibility in `packages/extension-patches/CHANGELOG.md`.
5. Recompile documentation via `node build_docs.js`.

---

## 2. Step-by-Step Audit Workflow

### Step 1: Identify the Newly Ingested Version
Check the newest version header in `packages/extension-history/CHANGELOG.md`:
```bash
head -n 20 packages/extension-history/CHANGELOG.md
```
Note the new version `<NEW_VERSION>` (e.g. `1.7.0`) and release date.

### Step 2: Read Active Patches and Upstream Retirement Criteria
Inspect `packages/extension-patches/PATCHES.md` and each file in `packages/extension-patches/patches/`:
* `line_counts`: Target is `computeLineCounts` in `extension.js`. Upstream retirement criteria: Google parses actual unified diff hunks rather than calculating line count delta (`modifiedLines.length - originalLines.length`).
* `auto_open_priority`: Target is file reveal on agent edit events in `extension.js`. Upstream retirement criteria: Google prioritizes `autoOpenFiles` setting over internal `skipOpen` flag.

### Step 3: Inspect Upstream Changes in Extracted Sources & Bundle
Inspect the newly reconstituted Google3 sources in `packages/extension-history/extension/src/` to see how Google modified the targeted areas:
```bash
# Check if computeLineCounts changed
git diff HEAD~1 packages/extension-history/extension/src/devtools/cider/extensions/jetski/diff_zones/

# Check if auto-open or skipOpen logic changed
git diff HEAD~1 packages/extension-history/extension/src/cloud/developer_experience/antigravity_extensions/vscode/
```
To test whether the active patch string replacements match cleanly in the newly downloaded `.vsix` release bundle:
```bash
node -e "
const cp = require('child_process');
const content = cp.execSync('unzip -p packages/extension-history/releases/google.google-antigravity-<NEW_VERSION>.vsix \"extension/extension.js\"', { maxBuffer: 50 * 1024 * 1024 }).toString();
const { ALL_PATCHES } = require('./packages/extension-patches/patches');
for (const p of ALL_PATCHES) {
  const matched = p.REPLACEMENTS.every(([target]) => content.includes(target));
  console.log(p.ID, 'clean match in new bundle:', matched);
}
"
```

### Step 4: Determine Status for Each Patch
For each patch, categorize into one of three states:
1. **Resolved Upstream (Retire Patch)**:
   - Google fixed the underlying issue upstream!
   - Mark the patch as **Resolved Upstream (Retired in v<NEW_VERSION>)** in `packages/extension-patches/PATCHES.md`.
   - Remove the patch module from `packages/extension-patches/patches/index.js`.
2. **Still Needed & Fully Compatible**:
   - The bug is still present and Google's code still matches our `ORIGINAL` replacement string.
   - Patch is verified working for `<NEW_VERSION>`.
3. **Still Needed but Code Drifted**:
   - The bug is still present, but Google modified surrounding lines or variable names.
   - Update `ORIGINAL` and `REPLACEMENT` in the corresponding patch file under `packages/extension-patches/patches/` to match the new syntax.
   - Validate with `node --check`.

### Step 5: Bump Target Version in `patch.js`
In `packages/extension-patches/patch.js`, update:
```javascript
const TARGET_EXTENSION_VERSION = '<NEW_VERSION>';
```

### Step 6: Prepend Release Entry in `packages/extension-patches/CHANGELOG.md`
Prepend a new release block directly under the `---` separator in `packages/extension-patches/CHANGELOG.md`:

```markdown
## [v<NEW_VERSION>] - <YYYY-MM-DD>

### <Headline summarizing status, e.g. "Compatibility update for Extension v<NEW_VERSION>">

<1-2 sentences summarizing which patches are active, verified, or retired upstream.>

### Fixes
- **<Patch Name or Upstream Resolution> (`<patch_id>`)**:
  - <Status: Verified compatible, updated syntax, or retired as resolved upstream by Google in v<NEW_VERSION>>.
```

### Step 7: Recompile Documentation
```bash
node build_docs.js
```
Verify that `docs/index.html` and `docs/changelog-patches.md` were regenerated without errors.

### Step 8: Stage Changes for User Review
```bash
git add packages/extension-patches/ docs/
git status
```
Present a clear summary of the audit findings in chat for the user to review.
