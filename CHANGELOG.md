# Changelog

All notable releases and technical changes for the Google Antigravity VS Code Extension are documented in this file.

Each release includes both user-facing release notes (Highlights, Improvements, Fixes) and under-the-hood technical changes (Google3 monorepo architecture, Protobuf/JSPB schemas, and build metadata).

---

## [1.1.0] - 2026-08-27

### 🚀 Highlights
- **Resilient Server Startup & Recovery**: Introduced exponential backoff retry loops and an interactive in-webview recovery state with a manual "Retry" action, preventing extension crashes during network dropouts or backend server installation issues.

- **Enhanced Inline Diff Navigation**: Added automatic viewport scrolling and cursor advancement to remaining hunks upon accept/reject, plus relative navigation (`next` / `previous`) across inline diffs.

- **Permissions V2 & Skills Foundation**: Added core protobuf schemas and client state models for Permissions V2, security plugin settings, conversation grouping, and custom skill configurations.

### ✨ Improvements & Features
- **Interactive Startup Recovery**: When local server startup or binary acquisition fails, the webview displays a themed error screen with actionable diagnostics and a "Retry" button.

- **Next-Hunk Auto-Advancement**: Accepting or rejecting an inline diff hunk now automatically reveals and focuses the next remaining hunk in the editor.

- **Relative Diff Hunk Navigation**: Added `focusHunk` with support for `'next'` and `'previous'` relative navigation respecting active cursor line positions.

- **Auto-Open Edited Files**: Added support for `jetski-web.autoOpenFiles` setting to automatically reveal agent-modified files in the editor.

- **Notebook Diff Invalidation**: Forcing on-disk reloads for dirty notebooks via `AntigravityFiles.forceResolveFromFile` prior to computing inline diff zones.

- **Host Page Reload Protocol**: Added `ReloadRequestMessage` allowing webview and standalone PWA instances to request a parent page reload when recovering wedged sessions.

- **Location-Aware Webview Themes**: Loading and error views now automatically match the background and foreground colors of their specific host container (`sideBar` vs editor tab).

- **New AI Models & Multimodal Options**: Added enum definitions for internal Gemini variants (`gemini-tl-test-high`, `medium`, `low`) and millisecond precision options for interleaved modality verbalization.

### 🐛 Fixes & Patches
- **Binary Downloader Exponential Backoff**: Download pipelines and manifest lookups now automatically retry transient network drops up to 3 times with exponential backoff, while failing fast on non-retryable 4xx client errors.

- **Corrupt Binary Cleanup**: Automatically unlinks and re-downloads staging files if SHA-256 checksum verification fails.

- **Date-Based SemVer Normalization**: Stripped leading zeros in date-based version numbers (e.g. `2026.08.24`) to avoid SemVer parsing errors during version checks.

- **Empty Protobuf Key Filter Fix**: Fixed `ExtensionApiImpl.globalStorageGet` to treat empty repeated protobuf key arrays as unfiltered requests.

- **Structured Server Error Classification**: Categorized backend launch errors into structured error types (`timeout`, `binary_not_found`, `permission_denied`, `download_failed`, `spawn_failed`, `unexpected_failure`) for telemetry.

---

### ⚙️ Under the Hood (Technical & Internal Intelligence)
*This section documents exact Google3 monorepo changes, schemas, and build revisions.*

- **Core & Lifecycle (`extension/src/cloud/...`)**:
  - `binary_downloader.ts`: Added `HttpError` error class, `withRetry` with `DEFAULT_RETRY_OPTIONS` (exponential backoff), SHA-256 verification retry wrapper, and leading-zero normalization in `isVersionAtLeast`.
  - `server_manager.ts`: Added `ServerStartOptions` interface, server launch telemetry (`SERVER_START`, `SERVER_START_SUCCESS` with `duration_ms`, `SERVER_START_FAILURE` with `failure_reason`), and `categorizeServerStartError`.
  - `extension.ts`: Refactored `desktopSetup` into a `while (!serverUrl)` recovery loop awaiting user interaction via `messageNotifier.onRetry()`.
  - `desktop_webview_delegate.ts`: Updated `renderLoading` with dynamic location theme variables (`--vscode-agy-background`, `--vscode-agy-foreground`), `.retry-btn` button, and structured `#loading-error` container.
  - `telemetry_service.ts`: Added duration key aliases (`duration_ms`, `durationMs`, `duration`) mapping to `CommonMetadataKey.DURATION_MS`.

- **Jetski & Diff Zones (`extension/src/devtools/cider/...`)**:
  - `diff_zones/inline_diff_manager.ts`: Added `focusNextHunk(uriStr, index)` to auto-advance editor viewport and selection after hunk resolution.
  - `diff_zones/inline_diff_zone_renderer.ts`: Added `focusHunk(fileUri, target)` supporting `'next'`, `'previous'`, and direct numeric indexes.
  - `diff_zones/agent_edit_manager.ts`: Integrated `jetski-web.autoOpenFiles` setting, called `AntigravityFiles.forceResolveFromFile` for notebooks, and recorded remaining hunk resolutions on batch completion (`event.final`).
  - `diff_zones/utils.ts`: Added `findEditorForUri(fileUri)` resolving across `activeTextEditor` and `visibleTextEditors`.
  - `extension_api.ts`: Fixed `request.keys` empty check to support ConnectRPC empty arrays in `globalStorageGet`.

- **Protobuf & IPC Schemas (`extension/src/blaze-out/` & `extension/src/third_party/jetski/`)**:
  - Reconstructed 887 Google3 Piper monorepo modules (506 Closure, 381 CJS), adding 21 new schema files.
  - New Schemas: `ConversationGroupConfig`, `ConversationGroupRegistry`, `SkillUserConfig`, `MarketplaceInstall`, `SecurityPluginSettings` (`.Cli`, `.Vetted`).
  - Updated Schemas:
    - `UserConfig`: Added `conversation_groups` (field 4) and `skills` map (field 5).
    - `PluginUserConfig`: Added `installed_from` (field 2, `MarketplaceInstall`).
    - `ProjectSettings`: Added `security_plugins` map (field 9); deprecated `enable_permissioned_github` (field 6).
    - `UserSettings`: Added `permission_grants_v2_migrated` (field 44) and `sandbox_enabled_at_v2_migration` (field 45).
    - `PermissionGrants`: Added `v2_migrated` (field 3).
    - `DeploymentConfig`: Added `enable_control_plane_monitoring` (field 31).
    - `MemoryMountConfig`: Deprecated `eager_cache_warming` (field 4).
    - `Project`: Deprecated `updated_at` (field 11).
    - `cortex_pb.ts`: Deprecated `MessageConfig`; added `ToolOutputConfig` and `ToolOutputConfigSchema` (field 168); extended `CascadeToolConfig` (Next ID: 57).
    - `jetski_cortex_pb.ts`: Added `HookStatus` and `HookStatusSchema` (field 5).
    - `iframe_messages_pb.ts`: Added `ReloadRequestMessage` and `ReloadRequestMessageSchema` (field 35).
    - `codeium_common_pb.ts`: Added models 1307-1312 and `CASCADE_NUX_TRIGGER_PERMISSIONS_V2_ENABLED = 16`.
    - `verbalization_options_pb.ts`: Added `VerbalizationSchema.ModalityInterleavingOptions` with `TimestampPrecision` enum.

- **Webview Bridges (`extension/bridge.js`, `extension/loading_bridge.js`)**:
  - `bridge.js`: Normalized and signature-stripped runtime (5,129 diff lines), integrating Permissions V2 interaction specs (`BlockReason.OUTSIDE_WORKSPACE`, `BlockReason.GITIGNORED`, `TriggerSource.CROSS_PROJECT_ISOLATION`), `ReloadRequestMessage` support, and skill user configs.

- **Build Metadata (`extension/package.json`)**:
  - `BUILD_BLAZE_RELEASE`: `release blaze-2026.08.11-3 (mainline @962449167)`
  - `BUILD_EMBED_LABEL`: `antigravity_vscode_extension_1.1.0_RC00`
  - `BUILD_HOSTNAME`: `lfe28.prod.google.com`

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
