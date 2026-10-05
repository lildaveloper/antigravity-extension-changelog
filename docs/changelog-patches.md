# Changelog

A minimal, safe patch manager for the Google Antigravity VS Code extension (`extension.js`).

Community hotfixes and upstream resolution tracking for installed Antigravity releases.

## Antigravity Patches

---

## [v1.7.0] - 2026-10-05

### Compatibility update and upstream retirement for Extension v1.7.0

Audited all companion hotfixes against Google Antigravity Extension v1.7.0 release. The `line_counts` hotfix is now resolved upstream by Google and retired, while `auto_open_priority` has been updated with `keepOpen` support and remains active.

### Active Hotfixes
- **Prioritize Auto-Open on Agent Edits (`auto_open_priority`)**:
  - Updated replacement pattern to accommodate upstream's new `keepOpen` argument in `getOpenOptions`, ensuring files open cleanly while preserving `autoOpenFiles` precedence over `skipOpen`.

### Resolved Upstream
- **Accurate Side-by-Side Line Counts (`line_counts`)**:
  - **Resolved in Extension v1.7.0**: Google natively resolved the `+0 -0` bug in Extension v1.7.0 by introducing `countDiffLines` using `getDiffHunks` in `agent_edit_manager.ts` and activating `openSideBySideDiffs: true`.
  - This hotfix is no longer needed and has been retired from the active patch registry.

---

## [v1.6.0] - 2026-09-30

### Accurate side-by-side line counts and prioritized file reveal

Hotfixes for Google Antigravity Extension v1.6.0 restoring accurate diff metrics in side-by-side mode and prioritizing file reveal preferences during agent edits.

### Fixes
- **Accurate Side-by-Side Line Counts (`line_counts`)**:
  - Resolves an issue where diff indicators in chat display `+0 -0` when inline diff mode is disabled.
  - Parses unified diff hunks via Antigravity's internal diff engine to compute accurate `+N -M` line additions and deletions.

- **Prioritize Auto-Open on Agent Edits (`auto_open_priority`)**:
  - Resolves an issue where modified files fail to automatically reveal in the editor when `antigravity.autoOpenFiles` is enabled.
  - Prioritizes user workspace preferences over the internal `skipOpen` event flag during agent turns.
