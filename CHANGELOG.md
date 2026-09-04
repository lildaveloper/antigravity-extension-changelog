# Changelog

All notable releases and technical changes for the Google Antigravity VS Code Extension are documented in this file.

Each release includes both user-facing release notes (Highlights, Improvements, Fixes) and under-the-hood technical changes (Google3 monorepo architecture, Protobuf/JSPB schemas, and build metadata).

---

## [1.2.0] - 2026-09-03

### 🚀 Highlights
- **Status Bar Integration & Settings Command**: Introduced a dedicated status bar button (`Antigravity - Settings`) and registered the `antigravity.openSettings` command for direct access to Antigravity and Jetski configuration panels with screen targeting.

- **Git & GitLens Deep Integration**: Added automatic GitLens blame cache invalidation (via `.git/index` mtime updates) and `git.refresh` synchronization upon diff resolution, ensuring new and accepted agent edits appear as uncommitted working changes rather than attributing lines to historical commits.

- **Custom Editor Tab Deduplication**: Resolved editor tab duplication for both Settings (`jetski-settings://global`) and Artifacts (`jetski-artifact://`) across split editor groups, transitioning to canonical queryless URIs and in-place webview navigation.

- **Configurable Server Port & Process Crash Telemetry**: Added `antigravity.serverPort` configuration to allow binding fixed ports, alongside comprehensive `SERVER_CRASH` telemetry tracking unexpected process terminations, signals, and spawn failures.

### ✨ Improvements & Features
- **Status Bar Item**: Added a persistent, right-aligned status bar item (`Antigravity - Settings`) linking directly to settings.

- **Customizable Server Port**: Added `antigravity.serverPort` setting (default `0` for ephemeral port allocation) with automatic window reload prompting on change.

- **Auto-Open Agent Edits**: Added native `antigravity.autoOpenFiles` setting (with backward compatibility for `jetski-web.autoOpenFiles`) to reveal agent-modified files in the editor.

- **In-Memory Binary Version Cache**: Keyed by SHA-256 file checksums in `binary_downloader.ts`, eliminating redundant `agy --version` child process executions during startup and installation while automatically invalidating if binaries change on disk.

- **Web & Remote Tunnel Connection Overhaul**: Fixed Chrome Private Network Access (PNA) and CORS blocking when connecting from webview host origins (`https://*.vscode-cdn.net`) to local servers (`127.0.0.1`), switching to iframe `load` and `message` event tracking.

- **Platform-Aware Webview Delegate**: Passes `platform` parameter (`web` vs `electron`) based on `vscode.env.uiKind`, enabling webviews to use environment-appropriate clipboard and paste mechanics.

- **Non-Destructive Tab Closure**: Closing a document with active inline diffs now safely unregisters tracking state in memory without reverting or mutating files on disk.

- **Automatic Formatted Content Adoption**: If workspace formatters alter on-disk file content during an agent's turn, the inline diff renderer automatically adopts the on-disk text as `modifiedContents` instead of erroneously failing with "content diverged" read-only diffs.

- **Multi-Step Edit Deduplication**: Improved hunk tracking across multi-turn and same-turn edits by verifying matching `conversationId` and `turnIndex`.

- **Notification Deduplication & Window Focus Awareness**: Deduplicates OS notifications via an in-memory ID cache and suppresses notifications when the window is actively focused on the conversation.

- **New AI Models & Multimodal Options**: Added enum mappings for Gemini Next (model 1260) and internal research models (`gemini-harness-le`, `gdm-safety-tf-2-non-logging`, `gemini-3p7-raw-thoughts`, `gdm-safety-tf-yolo`). Added WebM audio format, `Resolution` tokenization options (`P640X368`, `P368X640`), and `DocsOptions.ImageMode` for embedded document image extraction.

### 🐛 Fixes & Patches
- **Duplicate Settings Tabs**: Prevented duplicate settings tabs from spawning across split editor groups or different navigation routes by checking existing tabs via `findOpenCustomTab` and navigating in-place via `updateActiveSettings`.

- **Duplicate Artifact Tabs**: Canonicalized artifact URIs by stripping URL fragments, caching `cascadeId` per file path in memory, and focusing existing custom editor tabs across all editor groups.

- **Premature Edit Acceptance on New Chat**: Fixed an issue where transitioning from `/` to `/c/<id>` upon starting a new chat prematurely auto-accepted pending edits before user review.

- **Non-Git Workspace Modal Dialog Fix**: Guarded `git.refresh` calls with `hasOpenGitRepositories()`, preventing VS Code's Git extension from throwing modal warning dialogs ("Git: There are no available repositories") in Google3/CitC or non-Git workspaces.

- **GitLens Blame Desynchronization**: Touched `.git/index` mtime upon diff resolution (handling worktrees and submodules) to flush GitLens in-memory blame caches.

- **CodeLens UI Thrashing**: Debounced inline diff CodeLens refreshes with a 250ms timer to eliminate visual flickering during rapid edits.

- **Server Crash & Process Telemetry**: Added structured logging for `SERVER_CRASH` capturing `exit_code`, termination signals, and sanitized error stacks, while suppressing false-positive crashes during intentional extension deactivation.

- **Enhanced Telemetry PII Scrubbing**: Integrated `stacktrace_parser` to sanitize stack traces down to file basenames and line numbers, while scrubbing home directory paths across Windows, macOS, and Linux to `<USER_DIR>`.

---

### ⚙️ Under the Hood (Technical & Internal Intelligence)
*This section documents exact Google3 monorepo changes, schemas, and build revisions.*

- **Core & Lifecycle (`extension/src/cloud/...`)**:
  - `status_bar.ts`: [NEW] Registered right-aligned status bar item (`Antigravity - Settings`) and `antigravity.openSettings` command delegating to `SettingsEditorProvider`.
  - `extension.ts`: Registered status bar item during activation; added `onDidChangeConfiguration` listener for `antigravity.serverPort` with window reload confirmation.
  - `server_manager.ts`: Added `isStopping` intentional-shutdown flag; read `antigravity.serverPort` from configuration; added `getAvailableEphemeralPort()`; wired `SERVER_CRASH` event logging on process exit and spawn error; added `exit_code` and sanitized stack traces to `SERVER_START_FAILURE`.
  - `binary_downloader.ts`: Added `binaryVersionCache` Map keyed on SHA-256 checksums; added `clearBinaryVersionCache()`; increased version command timeout to 5000ms; updated extension version resolution via `context?.extension?.packageJSON?.version`.
  - `desktop_webview_delegate.ts`: Added `platform` query parameter (`web` / `electron`) based on `vscode.env.uiKind`; replaced raw `fetch` loopback polling with iframe `load`/`message` event tracking (`revealIframe`); applied flex column centering for `.container`.
  - `telemetry_service.ts`: Integrated `stacktrace_parser` for frame path sanitization; added PII filters for user home directories (`<USER_DIR>`) and URL parameters (`<REDACTED_PARAMS>`); mapped `exit_code`, `exitCode`, `error_code`, `errorCode`, `error_message`, and `failure_reason`.
  - `telemetry_constants.ts`: Added `SERVER_CRASH: "google.antigravity.vscode.extension.server.crash"`.

- **Jetski & Diff Zones (`extension/src/devtools/cider/...`)**:
  - `diff_zones/inline_diff_manager.ts`: Added `refreshGitAndGitLens()` with `hasOpenGitRepositories()` guard; added `touchGitIndexForUri()` supporting worktree/submodule `gitdir:` resolution; added `debouncedRefreshCodeLenses()` (250ms); eliminated destructive `rejectRemaining` on document tab close; synchronized `antigravity.hasActiveDiff` context key across all files.
  - `diff_zones/agent_edit_manager.ts`: Added `isAutoOpenEnabled()` supporting `antigravity.autoOpenFiles` and `jetski-web.autoOpenFiles`; implemented automatic on-disk content divergence adoption for formatted files; enhanced `handleExistingDiffZone` to recognize `isSameTurn`.
  - `extension_api.ts`: Implemented tab deduplication and in-place navigation in `openSettings` and `openArtifact` via `findOpenCustomTab` and `revealOpenCustomTab`; guarded concurrent tab opens via `pendingOpenSettingsPromise` and `pendingOpenArtifacts`; updated `notifyPathChange` to prevent auto-accepting edits on initial `/` to `/c/<id>` navigation; added bounded `sentNotificationIds` cache (50 entries) and focused-window suppression in `showBrowserNotification`.
  - `settings_editor_provider.ts`: Added `setPendingOptions()`, `updateActiveSettings()`, and `activePanel` lifecycle tracking.
  - `artifact_editor_provider.ts`: Added `cascadeIdByPath` Map and `setCascadeIdForPath()`.
  - `core_activation.ts`: Instantiated singletons for `ArtifactEditorProvider` and `SettingsEditorProvider` shared with `ExtensionApiImpl`.
  - `webview_provider.ts`: Synchronized `lastConversationId` into `workspaceState`.

- **Protobuf & IPC Schemas (`extension/src/blaze-out/` & `extension/src/third_party/jetski/`)**:
  - Reconstructed 891 Google3 Piper monorepo modules (507 Closure, 384 CJS), adding 4 new files.
  - New Schemas: `google.protobuf.Any` (`jspb$b$Any.js`, `jspb$m$Any.js`, `jspb$o$Any.js` under `google/protobuf/any_jspb/`).
  - Relocated Schemas: Relocated `MarketplaceInstall` from `third_party/jetski/config_pb` to `third_party/jetski/cortex_pb` (`cortex_jspb/`) to resolve layering constraints for provenance surfacing.
  - Updated Schemas:
    - `BlueprintBinding`: Deprecated `paramsMap` (field 2); added `user_config` (field 4, `google.protobuf.Any`).
    - `ListDeploymentsRequest`: Added `filter` (field 4, string).
    - `MemoryConfig`: Added `release_track` (field 7, `ReleaseTrack` enum).
    - `UserSettings`: Deprecated `enable_personal_customizations` (field 38).
    - `cortex_pb.ts`: Added `SidecarStatus.STARTING = 5`; updated message schemas following `MarketplaceInstall` insertion.
    - `content_pb.ts`: Added `AudioContent.MimeType.TYPE_WEBM = 15`; replaced `FunctionContent` with `Function` message and `Function.Behavior` enum (`UNSPECIFIED = 0`, `BLOCKING = 1`, `NON_BLOCKING = 2`).
    - `processing_options_pb.ts`: Added `WorkspaceOptions.DocsOptions.ImageMode` enum (`IMAGE_MODE_UNSPECIFIED = 0`, `EMBEDDED_IMAGES_ONLY = 1`).
    - `resolution_pb.ts`: Added `Resolution.RESOLUTION_P640X368 = 8` and `Resolution.RESOLUTION_P368X640 = 9`.
    - `hooks_pb.ts`: Added `agent_name` (field 9, string) to `HookArgsCommon`.
    - `codeium_common_pb.ts`: Added models 1260 (`Gemini Next`), 1313 (`gemini-harness-le`), 1314 (`gdm-safety-tf-2-non-logging`), 1315 (`gemini-3p7-raw-thoughts`), 1316 (`gdm-safety-tf-yolo`).
    - `constants.ts` (DataCloud): Added `AUTH_METHOD: "authMethod"`.

- **Webview Bridges (`extension/bridge.js`, `extension/loading_bridge.js`)**:
  - `bridge.js`: Normalized and signature-stripped runtime (1,048 diff lines), updated protobuf descriptors (`hooks.proto`, `cortex.proto`, `content.proto`, `resolution.proto`, `processing_options.proto`) and enum bindings (`SidecarStatus`, `AudioContent_MimeType`, `Function_Behavior`, `DocsOptions_ImageMode`, `Resolution`).

- **Build Metadata (`extension/package.json`)**:
  - `BUILD_BLAZE_RELEASE`: `release blaze-2026.08.18-1 (mainline @965897722)`
  - `BUILD_EMBED_LABEL`: `antigravity_vscode_extension_1.2.0_RC00`
  - `BUILD_HOSTNAME`: `lmbgv8.prod.google.com`

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
