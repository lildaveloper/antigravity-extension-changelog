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
Inspect `packages/extension-patches/PATCHES.md` (specifically the **Upstream Status Matrix** and **Active Patches** sections) and `packages/extension-patches/patches/index.js`:
1. Dynamically enumerate all patches currently marked as **Active** in `PATCHES.md`.
2. For each active patch, carefully review its:
   - **Problem Statement**: What symptom or issue does this patch solve for the user?
   - **Root Cause Analysis**: What mechanism or code flow causes the issue?
   - **Upstream Retirement Criteria**: What conditions indicate that Google resolved the issue natively?
   - **Target Scope**: Which subsystems or source files in `packages/extension-history/extension/src/` govern this feature?

### Step 3: Inspect Upstream Changes in Extracted Sources & Bundle

> [!WARNING]
> **Avoid Target Tunnel Vision**: Our patches are hotfixes that target symptoms at specific code locations. Upstream Google engineers often fix bugs at the architectural or caller level (e.g. introducing a new helper, rewiring the caller, or changing configuration flags) while leaving the old function sitting as untouched dead code in the bundle.
> **Never assume a bug is still present just because the target string in your patch still matches in `extension.js`.** Always trace the end-to-end data flow in the extracted sources (`packages/extension-history/extension/src/`).

1. **Semantic Source Diff Inspection**:
   For each active patch identified in Step 2, inspect the git diff in `packages/extension-history/extension/src/` across its relevant subsystems:
   ```bash
   git diff HEAD~1 packages/extension-history/extension/src/<SUBSYSTEM_PATH>/
   ```
   *Trace the full execution path: Did Google add a new function or helper that bypasses the old logic? Did a caller change how options are evaluated? Did a new setting or default flag get introduced?*

2. **Bundle Syntax Matching Test**:
   Verify whether active patches still match cleanly in the release `.vsix` bundle:
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
   - Google fixed the underlying issue upstream (either at our target site or architecturally elsewhere in the subsystem).
   - Mark the patch as **Resolved Upstream (Retired in v<NEW_VERSION>)** in `packages/extension-patches/PATCHES.md`.
   - Remove the patch module from `ALL_PATCHES` in `packages/extension-patches/patches/index.js` (retain the patch file as an archive reference).
   - Document the upstream resolution in `packages/extension-history/CHANGELOG.md` under Fixes if not already noted.
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
Prepend a new release block directly under the `---` separator in `packages/extension-patches/CHANGELOG.md`.

Use separate sections for **`### Active Hotfixes`** and **`### Resolved Upstream`** so the documentation site generates distinct, informative accordion dropdowns:

```markdown
## [v<NEW_VERSION>] - <YYYY-MM-DD>

### <Headline summarizing status, e.g. "Compatibility update and upstream retirement for Extension v<NEW_VERSION>">

<1-2 sentences summarizing which patches are active, verified, or retired upstream.>

### Active Hotfixes
- **<Patch Name> (`<patch_id>`)**:
  - <Status: Verified compatible or updated syntax for v<NEW_VERSION>>.

### Resolved Upstream
- **<Patch Name> (`<patch_id>`)**:
  - **Resolved in Extension v<NEW_VERSION>**: <Technical details of how Google fixed it upstream>.
  - This hotfix is no longer needed and has been retired from the active patch registry.
```
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
