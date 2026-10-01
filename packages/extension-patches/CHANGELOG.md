# Changelog

A minimal, safe patch manager for the Google Antigravity VS Code extension (`extension.js`).

Community hotfixes and upstream resolution tracking for installed Antigravity releases.

## Antigravity Patches

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
