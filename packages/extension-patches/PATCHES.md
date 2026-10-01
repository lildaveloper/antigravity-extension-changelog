# Antigravity Extension Patch Registry & Upstream Lifecycle

This document serves as the technical rationale and upstream lifecycle tracker for all patches in this repository.

The goal of this project is to maintain hotfixes for known issues in the Google Antigravity VS Code extension (`google.google-antigravity`) while tracking upstream releases. When Google resolves an issue upstream, the corresponding patch is marked as resolved and retired.

---

## Upstream Status Matrix

| Patch ID | Name | Upstream Status | Target Scope | Verified Version |
| :--- | :--- | :--- | :--- | :--- |
| `line_counts` | Accurate Side-by-Side Line Counts | Active | Diff hunk line count calculation in side-by-side mode | v1.6.0 |
| `auto_open_priority` | Prioritize autoOpenFiles over skipOpen | Active | File reveal logic on agent edit events | v1.6.0 |

---

## Active Patches

### 1. `line_counts` - Accurate Side-by-Side Line Counts

* **Patch File:** [`patches/line_counts.js`](patches/line_counts.js)
* **Status:** Active (Not resolved upstream)
* **Target Version:** v1.6.0 (Verified)

#### Problem Statement
When `antigravity.enableInlineDiff` is set to `false`, the diff indicator in the chat UI frequently displays `+0 -0` for modified files, even when dozens of lines have been added or removed.

#### Root Cause Analysis
In `extension.js`, `computeLineCounts(original, modified)` uses a naive length subtraction calculation:
```javascript
function computeLineCounts(original, modified) {
    const originalLines = original === '' ? [] : original.split(/\r?\n/);
    const modifiedLines = modified === '' ? [] : modified.split(/\r?\n/);
    const diff = modifiedLines.length - originalLines.length;
    return {
        numLinesInserted: Math.max(0, diff),
        numLinesDeleted: Math.max(0, -diff),
    };
}
```
If a file has 10 lines replaced with 10 different lines, `diff` is `0`, resulting in `numLinesInserted: 0` and `numLinesDeleted: 0`.

#### Fix Mechanism
The patch injects a call to Antigravity's internal diff engine (`google3.devtools.cider.extensions.jetski.diff_zones.diff_helper.getDiffHunks`) to parse the actual unified diff hunks:
```javascript
const hunks = helper.getDiffHunks(original, modified);
for (const hunk of hunks) {
    for (const line of hunk.lines) {
        if (line.startsWith('+')) numLinesInserted++;
        else if (line.startsWith('-')) numLinesDeleted++;
    }
}
```
It includes a graceful fallback to the length difference method if the internal diff helper is unavailable.

#### Upstream Retirement Criteria
Google updates `computeLineCounts` in upstream releases to parse actual diff hunks rather than calculating line count delta.

---

### 2. `auto_open_priority` - Prioritize autoOpenFiles over skipOpen

* **Patch File:** [`patches/auto_open_priority.js`](patches/auto_open_priority.js)
* **Status:** Active (Not resolved upstream)
* **Target Version:** v1.6.0 (Verified)

#### Problem Statement
Users who configure `"antigravity.autoOpenFiles": true` expect files modified by the AI agent to open automatically in the editor for review. However, agent edit stream events frequently send `skipOpen: true`, which unconditionally suppresses the auto-open behavior and keeps modified files hidden in the background.

#### Root Cause Analysis
In `getOpenOptions(skipOpen, strictNav = false)`, the `skipOpen` flag is evaluated before checking `this.isAutoOpenEnabled()`:
```javascript
getOpenOptions(skipOpen, strictNav = false) {
    if (skipOpen === true) {
        return { shouldOpen: false, preview: true };
    }
    const autoOpenAll = this.isAutoOpenEnabled();
    if (strictNav) return { shouldOpen: true, preview: true };
    if (autoOpenAll) return { shouldOpen: true, preview: false };
    return { shouldOpen: false, preview: true };
}
```

#### Fix Mechanism
The patch reorders the priority so that explicit user configuration (`autoOpenAll = this.isAutoOpenEnabled()`) takes precedence over the agent's default `skipOpen` flag:
```javascript
getOpenOptions(skipOpen, strictNav = false) {
    const autoOpenAll = this.isAutoOpenEnabled();
    if (autoOpenAll) {
        return { shouldOpen: true, preview: false };
    }
    if (strictNav) return { shouldOpen: true, preview: true };
    if (skipOpen === true) return { shouldOpen: false, preview: true };
    return { shouldOpen: false, preview: true };
}
```

#### Upstream Retirement Criteria
Google adjusts `getOpenOptions` upstream so that user-configured `antigravity.autoOpenFiles: true` takes precedence over internal `skipOpen` parameters.

---

## Upstream Lifecycle & Retirement Workflow

When a new version of the Antigravity extension is released:
1. **Verification:** Inspect whether Google fixed any of the issues in their upstream bundle (using `packages/extension-history/` diffs or the `/audit-patches` skill).
2. **Retirement:** If an issue is resolved upstream:
   - Mark the patch status as `Resolved Upstream (vX.Y.Z)` in the matrix above.
   - Remove the patch module from [`patches/index.js`](patches/index.js).
   - Move the patch entry to a "Resolved Upstream Patches" archive section.

---

## Contributing a Patch

1. Verify the issue is reproducible on the latest official version of the Google Antigravity extension.
2. Follow the declarative patch format outlined in [`README.md`](README.md#adding-a-new-patch-zero-boilerplate).
3. Ensure every patch includes safe pattern matching, idempotency, and passes syntax validation via `node --check`.
