# Antigravity Extension Patch Registry & Upstream Lifecycle

This document serves as the technical rationale and upstream lifecycle tracker for all patches in this repository.

The goal of this project is to maintain hotfixes for known issues in the Google Antigravity VS Code extension (`google.google-antigravity`) while tracking upstream releases. When Google resolves an issue upstream, the corresponding patch is marked as resolved and retired.

---

## Upstream Status Matrix

| Patch ID | Name | Upstream Status | Target Scope | Verified Version |
| :--- | :--- | :--- | :--- | :--- |
| `auto_open_priority` | Prioritize autoOpenFiles over skipOpen | Active | File reveal logic on agent edit events | v1.7.0 |
| `terminal_view` | Enable Standalone Terminal for Background Tasks | Active | Webview panel fallback for background task terminal UI | v1.7.0 |
| `line_counts` | Accurate Side-by-Side Line Counts | Resolved Upstream (Retired in v1.7.0) | Diff hunk line count calculation in side-by-side mode | v1.7.0 |

---

## Active Patches

### 1. `auto_open_priority` - Prioritize autoOpenFiles over skipOpen

* **Patch File:** [`patches/auto_open_priority.js`](patches/auto_open_priority.js)
* **Status:** Active (Not resolved upstream)
* **Target Version:** v1.7.0 (Verified)

#### Problem Statement
Users who configure `"antigravity.autoOpenFiles": true` expect files modified by the AI agent to open automatically in the editor for review. However, agent edit stream events frequently send `skipOpen: true`, which unconditionally suppresses the auto-open behavior and keeps modified files hidden in the background.

#### Root Cause Analysis
In `getOpenOptions(skipOpen, strictNav = false, keepOpen = false)`, the `skipOpen` flag is evaluated before checking `this.isAutoOpenEnabled()`:
```javascript
getOpenOptions(skipOpen, strictNav = false, keepOpen = false) {
    if (skipOpen === true) {
        return { shouldOpen: false, preview: true };
    }
    const autoOpenAll = this.isAutoOpenEnabled();
    if (strictNav) return { shouldOpen: true, preview: !keepOpen };
    if (autoOpenAll) return { shouldOpen: true, preview: false };
    return { shouldOpen: false, preview: true };
}
```

#### Fix Mechanism
The patch reorders the priority so that explicit user configuration (`autoOpenAll = this.isAutoOpenEnabled()`) takes precedence over the agent's default `skipOpen` flag:
```javascript
getOpenOptions(skipOpen, strictNav = false, keepOpen = false) {
    const autoOpenAll = this.isAutoOpenEnabled();
    if (autoOpenAll) {
        return { shouldOpen: true, preview: false };
    }
    if (strictNav) return { shouldOpen: true, preview: !keepOpen };
    if (skipOpen === true) return { shouldOpen: false, preview: true };
    return { shouldOpen: false, preview: true };
}
```

#### Upstream Retirement Criteria
Google adjusts `getOpenOptions` upstream so that user-configured `antigravity.autoOpenFiles: true` takes precedence over internal `skipOpen` parameters.

---

### 2. `terminal_view` - Enable Standalone Terminal for Background Tasks

* **Patch File:** [`patches/terminal_view.js`](patches/terminal_view.js)
* **Status:** Active (Not resolved upstream)
* **Target Version:** v1.7.0 (Verified)

#### Problem Statement
When a user launches background tasks (such as long-running build commands, watchers, or tests) during an Antigravity agent session, clicking the interactive task card in the chat UI fails to open the terminal stream. The user is unable to view real-time compilation logs, compiler warnings, or execution progress inside VS Code.

#### Root Cause Analysis
In `extension.js`, Google instantiates and registers a `TerminalPanelProvider` for `jetski.terminalView` as a `WebviewViewProvider` meant for Cider's bottom panel. However, `jetski.terminalView` is not declared as a view container in VS Code's `package.json`. Consequently, `resolveWebviewView` is never called by VS Code, leaving `this.view` permanently `undefined`. When `showTerminal(request)` runs, the existing logic checks `if (this.view)` and silently does nothing when `this.view` is absent, while `openTerminal(request)` attempts to focus a non-existent view (`jetski.terminalView.focus`).

#### Fix Mechanism
1. Guard `jetski.terminalView.focus` in `openTerminal` so it only executes when `this.terminalPanelProvider.view` exists.
2. In `TerminalPanelProvider.showTerminal(request)`, provide an editor tab fallback: when `this.view` is `undefined`, dynamically create or reveal a `vscode.window.createWebviewPanel('jetski.terminalPanel', 'Antigravity Terminal', vscode.ViewColumn.Beside, ...)` and delegate rendering via `this.renderer.renderJetskiIframe(this.panel, { targetRoute: 'terminal-standalone', extraParams, type: 'terminal', location: 'editor' })`.

#### Upstream Retirement Criteria
Google either declares `jetski.terminalView` under `contributes.views.panel` in `package.json` or provides an upstream editor tab fallback for standard VS Code environments.

#### Scope & Known Limitations
> [!NOTE]
> This patch enables live terminal output for **currently running** background tasks. Clicking older background tasks in the side panel that have already completed or stopped currently renders a blank tab, because Google's webview UI omits `stepIndex` when archiving finished tasks to `accumulatedSections`.

---

## Resolved Upstream Patches (Archive)

### 1. `line_counts` - Accurate Side-by-Side Line Counts

* **Patch File:** [`patches/line_counts.js`](patches/line_counts.js)
* **Status:** Resolved Upstream (Retired in v1.7.0)
* **Retired In:** Extension v1.7.0

#### Upstream Resolution
In Extension v1.7.0, Google resolved this issue natively by introducing `countDiffLines` in `agent_edit_manager.ts`, using Antigravity's internal diff engine (`getDiffHunks`) to parse unified diff hunks and count inserted and deleted lines, paired with `openSideBySideDiffs: true`. This hotfix is no longer needed and has been retired.

#### Original Problem Statement
When `antigravity.enableInlineDiff` was set to `false`, the diff indicator in the chat UI frequently displayed `+0 -0` for modified files, even when dozens of lines had been added or removed, due to naive length subtraction (`modifiedLines.length - originalLines.length`).

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
