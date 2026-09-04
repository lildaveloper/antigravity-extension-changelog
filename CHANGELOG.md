# Changelog

All notable releases and technical changes for the Google Antigravity VS Code Extension are documented in this file.

Each release includes both user-facing release notes (Highlights, Improvements, Fixes) and under-the-hood technical changes (Google3 monorepo architecture, Protobuf/JSPB schemas, and build metadata).

---

## [1.0.0] - 2026-08-20

### 🚀 Highlights
- **Initial Public Release**: Google Antigravity for Visual Studio Code brings Google's agent-first AI development platform directly into the VS Code editor.

### ✨ Improvements & Features
- **Antigravity Language Server Integration**: Automated lifecycle management, downloading, and background execution of local Antigravity server processes.

- **Agent Edit Manager & Inline Diffs**: Real-time inline diff zone rendering and side-by-side diff reviews powered by Google Jetski.

- **Interactive Webview Sidebar**: Low-latency webview interface (`bridge.js`) featuring real-time chat, conversation management, and VS Code theme synchronization.

- **Workspace Navigation**: Support for changing workspaces and synchronizing conversation state across sessions.

### 🐛 Fixes & Patches
- Baseline launch release.

---

### ⚙️ Under the Hood (Technical & Internal Intelligence)
*This section documents exact Google3 monorepo changes, schemas, and build revisions.*

- **Core & Lifecycle (`extension/src/cloud/...`)**:
  - `extension.ts`: Main activation entry point with `desktopSetup`, telemetry binding, and command registrations (`antigravity.openAgentUi`, `antigravity.changeWorkspace`, `antigravity.openSettings`).
  - `server_manager.ts`: Process management and port binding for local Antigravity server instances.
  - `binary_downloader.ts`: Platform-specific binary downloader with checksum validation and extract pipeline.
  - `desktop_webview_delegate.ts`: Bridge communication protocol between the webview and extension host.

- **Jetski & Diff Zones (`extension/src/devtools/cider/...`)**:
  - `diff_zones/inline_diff_zone_renderer.ts`: Inline Monacoe editor diff zones for displaying AI code revisions.
  - `diff_zones/agent_edit_manager.ts`: Multi-file transaction coordinator and hunk storage.

- **Protobuf & IPC Schemas (`extension/src/blaze-out/` & `extension/src/third_party/jetski/`)**:
  - 866 Google3 Piper monorepo modules reconstructed via `extension.js.map`.
  - Core JSPB schemas for Cortex, Chat, Diff Actions, Codeium Common, and Boq Provisioning services.

- **Webview Bridges**:
  - `bridge.js`: Frontend webview runtime normalized and signature-stripped (40,048 formatted lines).
  - `loading_bridge.js`: Lightweight loading spinner bridge normalized and signature-stripped.

- **Build Metadata (`extension/package.json`)**:
  - Blaze release: `release blaze-2026.08.06-4 (mainline @959908470)`
  - Embed label: `antigravity_vscode_extension_1.0.0_RC00`
  - Hostname: `jadk3.prod.google.com`
