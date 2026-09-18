# Changelog

All notable releases and technical changes for the Google Antigravity VS Code Extension are documented in this file.

Each release includes both user-facing release notes (Highlights, Improvements, Fixes) and under-the-hood technical changes (Google3 monorepo architecture, Protobuf/JSPB schemas, and build metadata).

---

## [1.4.0] - 2026-09-17

### 🚀 Highlights
- **In-IDE Feedback & Diagnostics Collection**: Added an integrated feedback command (`antigravity.feedback`) and a high-performance, ring-buffered logging subsystem (`BufferedOutputChannel`) enabling diagnostic bundles and host installation logs to be inspected and reported directly within the IDE.

- **Fast-Path Startup & Startup Freeze Elimination**: Eliminated the ~94.5s cold-start freeze during offline or unreachable network states (b/559283462). When an existing valid backend binary is present, update discovery operates on a bounded 3-second budget, falling back immediately to the existing binary without delaying editor readiness.

- **Offline & Network Fallback Resilience**: Implemented automatic fallback to existing valid binaries (`>= 1.1.11`) upon update download failure, ensuring full offline capability while safeguarding against corrupted payloads by strictly enforcing integrity and signature verification.

- **Rate-Limiting & Backoff Intelligence**: Added `Retry-After` HTTP header support (parsing delta-seconds and HTTP-date timestamps) to respect upstream rate limiting (HTTP 429) across manifest discovery and asset downloads.

- **Agent Lifecycle Hooks & Clickable Step Diff Badges**: Introduced foundational protobuf schemas for workspace agent lifecycle hooks (`HooksDiscoveryConfig`), step title diff badges (`StepRenderInfo.FileDiffRef`), and contextual link scope references (`LinkScopeItem`).

### ✨ Improvements & Features
- **Integrated Feedback Command**: Contributed `antigravity.feedback` ("Provide Feedback") to the command palette and status bar settings flow, connecting to in-webview feedback panels.

- **Buffered Output Channel**: Implemented `BufferedOutputChannel` wrapping `vscode.OutputChannel` with an in-memory 1,000-line circular ring buffer and persistent append-only disk logging to `~/.gemini/logs/install.log`.

- **Host Diagnostics RPC**: Added `GetHostDiagnosticsRequest` and `GetHostDiagnosticsResponse` protobuf IPC endpoints, exposing host-level installation logs, binary path, and version to the webview client.

- **Fast-Path Binary Verification**: When a locally installed binary satisfies `MIN_AGY_VERSION` (`1.1.11`), the update check is bounded to a 3-second timeout budget (`updateCheckTimeoutMs: 3000`). If unreachable, the check is skipped and the existing binary boots immediately.

- **Offline Binary Availability**: Network or HTTP errors during update download gracefully fall back to the existing installed binary meeting minimum version requirements, preserving offline development workflows.

- **Retry-After Header Parsing**: Added `parseRetryAfterMs` to dynamically respect HTTP `Retry-After` headers during exponential backoff, preventing request flooding on rate-limited endpoints.

- **Safe Staging & Atomic Binary Promotion**: Binary downloads now unpack into an isolated temporary extraction directory (`tempExtractDir`), verify the executable, and atomically promote it before guaranteed cleanup in `finally` blocks.

- **Host Proxy Configuration**: Added `configureHostProxyEnvironment` to read VS Code's `http.proxy` and `http.noProxy` workspace configuration and configure `HTTP_PROXY`, `HTTPS_PROXY`, and `NO_PROXY` in the host process before binary acquisition.

- **Old Binary Cleanup**: Added `cleanupStaleOldBinaries` to automatically sweep orphaned temporary binary artifacts from `~/.gemini/bin/`.

- **Notebook AI Diff Alignment**: Migrated notebook diff hunk structures to `cider.ai.NotebookDiffHunk` and `cider.ai.NotebookDiffHunkType`, while refining Colab notebook cell metadata parsing to preserve cell ID mappings.

- **Notebook File Sync**: Replaced `vscode.AntigravityFiles.forceResolveFromFile` with `cider.ai.forceResolveFromFile` to ensure modified notebook files on disk are flushed prior to rendering inline diff zones.

- **Protocol & Schema Expansions**:
  - `cortex_pb.ts`: Added `HooksDiscoveryConfig` for workspace hook discovery; added `StepRenderInfo.FileDiffRef` for clickable (+N/-M) hunk badges in step headers.
  - `codeium_common_pb.ts`: Added `LinkScopeItem` for pasted external links (Critique CLs, issue trackers) with client-resolved metadata.
  - `config_pb`: Added `sort_order` (int32) to `ConversationGroupConfig`.
  - `cortex_pb` (JSPB): Added `version` (string) to `MarketplaceInstall`.
  - `learning/gemini/.../deployment/config_jspb`: Added `retrieval_query` (string) to `AmbientInjectionConfig`.
  - `semantic_annotations_pb.ts`: Added semantic types `ST_MODEL_TOOL_RESPONSE_URL` (1917) and `ST_YOUTUBE_EXTERNAL_VIDEO_TRACK_ID` (14203).
  - `verbalization_options_pb.ts`: Added `CitationGranularityOptions` under citation chunking options.

### 🐛 Fixes & Patches
- **Network Startup Freeze (b/559283462)**: Fixed a critical bug where sequential probing of manifest candidate URLs hung for ~94.5s on unreachable networks. Candidate probing now sets a 5-second socket timeout with a single attempt per candidate, and aborts immediately upon encountering non-HTTP transport/socket failures.

- **Legacy Cascade Listener Deprecation**: Removed obsolete `vscode.Cascade` event subscriptions (`onDidRequestAcceptAllInFile`, `onDidRequestRejectAllInFile`, `onDidRequestNextHunk`, `onDidRequestPreviousHunk`, and `onDidDragToCascade`), eliminating stale IPC listeners.

- **License & Notice Alignment**: Updated `LICENSE.txt` to MIT License and refreshed `ThirdPartyNotices.txt` to reflect upstream package distribution metadata.

---

### ⚙️ Under the Hood (Technical & Internal Intelligence)
*This section documents exact Google3 monorepo changes, schemas, and build revisions.*

- **Core & Lifecycle (`extension/src/cloud/...`)**:
  - `buffered_output_channel.ts`: [NEW] Created `BufferedOutputChannel` implementing `vscode.OutputChannel` with circular in-memory buffer (`DEFAULT_MAX_BUFFERED_LINES = 1000`) and best-effort disk logging to `~/.gemini/logs/install.log`.
  - `server_manager.ts`: Implemented `HostDiagnosticsProvider` (`getHostDiagnostics()`, `getOrCreateOutputChannel()`, `getOutputChannelLogs()`); added `configureHostProxyEnvironment()` syncing VS Code `http.proxy` to `process.env`.
  - `binary_downloader.ts`:
    - Bumped `MIN_AGY_VERSION` from `1.1.3` to `1.1.11`.
    - Added `parseRetryAfterMs()` and updated `HttpError.fromResponse()` to extract `retry-after` header values.
    - Updated `withRetry()` to honor `retryAfterMs` delay.
    - Added fast-path 3-second timeout race when existing binary meets `MIN_AGY_VERSION`.
    - Added offline fallback: returns existing valid binary if network download fails (excluding checksum/integrity failures).
    - Hardened `fetchReleaseManifest()` candidate probing with 5-second candidate timeouts and immediate transport error bailout (b/559283462).
    - Unpacked archives into isolated `tempExtractDir` before atomic promotion via `promoteBinarySafely()`.
    - Added `cleanupStaleOldBinaries()` for directory hygiene in `~/.gemini/bin/`.
  - `status_bar.ts`: Registered `antigravity.feedback` command triggering `openAntigravitySettings('Provide Feedback')`.
  - `extension.ts`: Initialized proxy configuration during `activate()`; passed `hostDiagnosticsProvider` to extension API activation dependencies.

- **Jetski & Diff Zones (`extension/src/devtools/cider/...`)**:
  - `extension_api.ts`:
    - Added `getHostDiagnostics(request)` returning `GetHostDiagnosticsResponse` message.
    - Updated `provideFeedback()` to route through `antigravity.feedback` in VS Code environments and `feedback.start` in Cider.
    - Removed obsolete `vscode.Cascade` listeners and `vscode.AntigravityFiles.onDidDragToCascade`.
  - `core_activation.ts`: Added `hostDiagnosticsProvider` to `JetskiCoreDependencies`.
  - `diff_zones/diff_zone_renderer.ts`: Migrated notebook diff types to `cider.ai.NotebookDiffHunk` and `NotebookDiffHunkType`; improved cell metadata preservation in `parseNotebookCells()`.
  - `diff_zones/agent_edit_manager.ts`: Replaced `vscode.AntigravityFiles.forceResolveFromFile` with `cider.ai.forceResolveFromFile`.
  - `webclient/workspace/ids.ts`: Simplified `getWorkspaceQueryParams()` to query `window.location.search` directly; removed redundant `getPreservableParams()`.

- **Protobuf & IPC Schemas (`extension/src/blaze-out/` & `extension/src/third_party/jetski/`)**:
  - Reconstructed 912 Google3 Piper monorepo modules (519 Closure, 393 CJS), adding `buffered_output_channel.ts`.
  - New Schemas & Messages:
    - `HooksDiscoveryConfig` (schema index 193) in `third_party/jetski/cortex_pb/cortex_pb.ts`.
    - `StepRenderInfo.FileDiffRef` in `third_party/jetski/cortex_pb/cortex_pb.ts`.
    - `LinkScopeItem` (schema index 133) in `third_party/jetski/codeium_common_pb/codeium_common_pb.ts`.
    - `GetHostDiagnosticsRequest` and `GetHostDiagnosticsResponse` in `third_party/gemini_coder/proto/iframe_messages_pb.ts`.
    - `CitationGranularityOptions` in `google/ai/generativelanguage/v1main/verbalization_options_pb.ts`.
  - Updated Fields:
    - `AmbientInjectionConfig` (`config_jspb`): Added field 3 `retrieval_query` (string).
    - `ConversationGroupConfig` (`config_jspb`): Added field 2 `sort_order` (int32).
    - `MarketplaceInstall` (`cortex_jspb`): Added field 3 `version` (string).
    - `SemanticType` (`semantic_annotations_pb.ts`): Added `ST_MODEL_TOOL_RESPONSE_URL = 1917` and `ST_YOUTUBE_EXTERNAL_VIDEO_TRACK_ID = 14203`.

- **Webview Bridges (`extension/bridge.js`, `extension/loading_bridge.js`)**:
  - `bridge.js`: Re-bundled with new protobuf descriptors (`GetHostDiagnosticsRequest`, `GetHostDiagnosticsResponse`, `HooksDiscoveryConfig`, `LinkScopeItem`, `FileDiffRef`).

- **Build Metadata (`extension/package.json`)**:
  - `BUILD_DEPOT_PATH`: `//depot/branches/antigravity_vscode_extension_release_branch/980964133.1/google3`
  - `BUILD_BLAZE_RELEASE`: `release blaze-2026.09.02-1 (mainline @974746007)`
  - `BUILD_EMBED_LABEL`: `antigravity_vscode_extension_1.4.0_RC01`
  - `BUILD_HOSTNAME`: `oqbb8.prod.google.com`

---

## [1.3.0] - 2026-09-10

### 🚀 Highlights
- **Branded Initialization & Loading Experience**: Overhauled the extension activation and webview loading interface with the official Antigravity logo, ambient glow effects, indeterminate progress bar, and smooth transitions.

- **Enterprise Proxy & ZTNA Support**: Automatic discovery and propagation of system root CA bundles across Linux and macOS, alongside HTTP/HTTPS proxy configuration inheritance, enabling seamless operation behind enterprise security gateways (e.g. Zscaler).

- **Cursor-Focused Diff Hunk Controls**: Introduced dedicated commands and context keys to accept or reject the specific diff hunk currently focused under the editor cursor, without requiring mouse interaction.

- **Subagents Architecture & Hub Schemas**: Introduced core protobuf schemas and persistence models for autonomous subagents (`SubagentDescriptor`, `SubagentMetadata`, `SubagentSpec`, `SubagentResult`, `SubagentState`).

- **Unified Remote & CitC Workspace Navigation**: Modularized remote workspace URI translation (`toCiderWebclientUri` / `toJetskiFileUri`), supporting linked worktree and Jujutsu (`jj`) commit resolution.

### ✨ Improvements & Features
- **Branded Loading View**: Added vector Antigravity logo (`ANTIGRAVITY_LOGO_SVG`) with radial blur glow, styled product branding, animated progress bar, and 10s fallback reveal in `desktop_webview_delegate.ts`.

- **Focused Diff Hunk Commands**: Registered `antigravity.prioritized.agentAcceptFocusedHunk`, `agentRejectFocusedHunk`, `agentFocusNextHunk`, `agentFocusPreviousHunk`, `agentAcceptAllInFile`, and `agentRejectAllInFile`.

- **Active Diff Context Keys**: Added real-time tracking of unresolved hunks in the active document via `antigravity.canAcceptOrRejectFocusedHunk` and `antigravity.canAcceptOrRejectAllAgentEditsInFile`.

- **Enterprise Root CA Auto-Resolution**: Automatically detects OS certificate stores (`/etc/ssl/certs/ca-certificates.crt`, `/etc/pki/tls/certs/ca-bundle.crt`, `/etc/ssl/ca-bundle.pem`, `/etc/pki/ca-trust/extracted/pem/tls-ca-bundle.pem`, `/etc/ssl/cert.pem`) and sets `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, and `NODE_USE_SYSTEM_CA` in the extension host and server process.

- **Proxy Configuration Propagation**: Reads VS Code `http.proxy` and `http.noProxy` settings and populates `HTTP_PROXY`, `HTTPS_PROXY`, and `NO_PROXY` environment variables for backend server processes.

- **Remote Worktree & Jujutsu Resolution**: Chat file links in linked worktrees and CitC workspaces are dynamically translated to accessible editor URIs (e.g. `jj-commits://`) via `workspaceManager.resolveFileUri()`.

- **Webview Double-Render Prevention**: Cached server resolution in `webview_renderer.ts` avoids redundant DOM teardown and recreation when opening secondary views (Settings, Artifacts, Terminal), eliminating blank flashes and latency (b/558282887).

- **Graceful Webview RPC Error Handling**: Suppressed noisy `ConnectError` (`NotFound`) rejections when webviews are mounting or not yet listening for editor state or category updates.

- **Non-Stealing View Reveal**: Added `show({ preserveFocus })` on `JetskiInstance` to reveal panels and views without stealing focus from active editors.

- **User Theme Preference Synchronization**: Added `UserThemePreferenceChangeMessage` protocol supporting bidirectional theme preference announcements between framed webview apps and host editors (b/545227979).

- **New Gemini Models & Vertex Settings**: Added enum mappings in `codeium_common_pb.ts` for `gemini-3.8-flash-cyber` (1317), `gemini-3.8-flash-high` (1318), `gemini-3.8-flash-medium` (1319), `gemini-3.8-flash-low` (1320), `gemini-3.8-flash (Cyber Permissive)` (1321), `gemini-3.8-flash-tiered` (1322), and `abc-hillclimbing-tf` (1323). Added `vertex_service_tier` in `UserSettings`.

- **Grounding Citations & Media ID**: Added `Source` and `GroundingMetadata` messages for search/document citations, and added `media_id` field to `Media`.

- **Plugin MCP Configuration**: Added `PluginMcpUserConfig` schema with configurable variables map for MCP plugins.

### 🐛 Fixes & Patches
- **Safe `.git/index` Timestamp Updating**: Replaced dangerous `readFile` + `writeFile` cycle on `.git/index` with `fs.promises.utimes` (`safeTouchFile`), avoiding file content truncation or race conditions during GitLens blame cache invalidation.

- **GitLens Guard**: Avoids touching `.git/index` if the GitLens extension (`eamodio.gitlens`) is not installed or active.

- **Debounced Git/GitLens Invalidation**: Consolidated consecutive git and GitLens cache flushes into a single debounced timer (100ms).

- **Network Telemetry IP Sanitization**: Extended telemetry PII scrubber to redact IPv4 addresses and port combinations to `<IP_REDACTED>`.

- **Server Startup Error Recovery**: Ensured `getServerInfo()` clears rejected promises on failure so subsequent user retry attempts re-invoke server startup rather than caching failures.

---

### ⚙️ Under the Hood (Technical & Internal Intelligence)
*This section documents exact Google3 monorepo changes, schemas, and build revisions.*

- **Core & Lifecycle (`extension/src/cloud/...`)**:
  - `extension.ts`: Initialized host security environment on activation via `initializeHostSecurityEnvironment()`.
  - `server_manager.ts`: Added `resolveSystemCaBundlePath()` scanning platform CA bundles (`LINUX_SYSTEM_CA_PATHS`, `MACOS_SYSTEM_CA_PATH`); added `initializeHostSecurityEnvironment()`; added `buildServerEnvironment()` propagating proxy settings and SSL environment flags (`NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `NODE_USE_SYSTEM_CA`).
  - `desktop_webview_delegate.ts`: Redesigned loading template with `ANTIGRAVITY_LOGO_SVG`, `LOADING_COMMON_CSS`, `getLoadingContentHtml()`, progress bar keyframe animation, and 10-second safety fallback.
  - `telemetry_service.ts`: Added regex to scrub IPv4 addresses with optional ports (`<IP_REDACTED>`).

- **Jetski & Diff Zones (`extension/src/devtools/cider/...`)**:
  - `diff_zones/diff_zone_renderer.ts`: Added `acceptFocusedHunk(fileUri)`, `rejectFocusedHunk(fileUri)`, and `revealDocument(fileUri, preview)` to `DiffZoneRenderer` interface.
  - `diff_zones/inline_diff_zone_renderer.ts`: Implemented `acceptFocusedHunk` and `rejectFocusedHunk`, locating cursor line inside active diff ranges.
  - `diff_zones/side_by_side_diff_zone_renderer.ts`: Implemented `revealDocument(fileUri, preview)` with `vscode.diff`.
  - `diff_zones/agent_edit_manager.ts`: Added `handleAcceptFocusedHunk` and `handleRejectFocusedHunk`; integrated `revealDocument`; used `toJetskiFileUri`.
  - `diff_zones/inline_diff_manager.ts`: Replaced index rewrite with `safeTouchFile` (`fs.promises.utimes`); added `isGitLensActive()`; added `gitRefreshTimeout` debouncer.
  - `diff_zones/utils.ts`: Integrated `toCiderWebclientUri` into `normalizeUri`.
  - `extension_api.ts`: Registered prioritized commands (`agentFocusNextHunk`, `agentFocusPreviousHunk`, `agentAcceptFocusedHunk`, `agentRejectFocusedHunk`, `agentAcceptAllInFile`, `agentRejectAllInFile`); added `updateHunkContext()` publishing `antigravity.canAcceptOrRejectFocusedHunk` and `antigravity.canAcceptOrRejectAllAgentEditsInFile`; added worktree URI translation via `workspaceManager.resolveFileUri()`; handled `ConnectError.NotFound` in `setContextCategories`.
  - `editor_state_watcher.ts`: Normalized document URIs with `toJetskiFileUri`; caught `ConnectError.NotFound` in `setEditorState`.
  - `extensionutils/workspace.ts`: [NEW] Modular workspace URI translation (`parseWorkspaceRootUri`, `getRemoteWorkspaceInfo`, `toCiderWebclientUri`, `toJetskiFileUri`, `getResourceFromWorkspacePath`).
  - `webclient/workspace/ids.ts`: [NEW] VCS workspace identity mapping (`workspaceIdToCitcId`, `workspaceIdToPiperId`, `workspaceIdToVcsId`, `workspaceIdToString`) supporting `PIPER`, `FIG`, `COG`, `JJ`, `REMOTE`.
  - `setup/cider_host_management.ts`: Added remote host awareness via `getRemoteWorkspaceInfo()`.
  - `webview_renderer.ts`: Cached `serverInfo` to skip duplicate `renderLoading()` during secondary view registration (b/558282887); cleared cached state on failure.
  - `jetski_instance.ts`: Added `show({ preserveFocus })`.

- **Protobuf & IPC Schemas (`extension/src/blaze-out/` & `extension/src/third_party/jetski/`)**:
  - Reconstructed 911 Google3 Piper monorepo modules (518 Closure, 393 CJS), adding 20 new files.
  - New Schemas & Modules:
    - `SubagentDescriptor`, `SubagentMetadata`, `SubagentSpec`, `SubagentResult`, `CortexStepInvokeSubagent` under `third_party/jetski/cortex_pb/`.
    - `WorkspaceId` (`jspb$b$WorkspaceId.js`, `jspb$m$WorkspaceId.js`, `jspb$o$WorkspaceId.js`, etc.) under `blaze-out/.../devtools/sourcerers/workspace/`.
    - `PluginMcpUserConfig` (`jspb$b$PluginMcpUserConfig.js`, `jspb$m$PluginMcpUserConfig.js`, `jspb$o$PluginMcpUserConfig.js`) under `third_party/jetski/config_pb/`.
    - Vendored VS Code base runtime modules under `third_party/antigravity/src/vs/base/common/` (`uri.ts`, `path.ts`, `extpath.ts`, `marshallingIds.ts`, `network.ts`, `platform.ts`, `process.ts`, `resources.ts`, `nls.ts`).
  - Updated Schemas:
    - `cortex_pb.ts`: Added `SubagentState` enum (`UNSPECIFIED = 0`, `ALIVE = 1`, `KILLED = 2`).
    - `codeium_common_pb.ts`: Added models 1317–1323 (`gemini-3.8-flash-cyber`, `gemini-3.8-flash-high`, `gemini-3.8-flash-medium`, `gemini-3.8-flash-low`, `gemini-3.8-flash (Cyber Permissive)`, `gemini-3.8-flash-tiered`, `abc-hillclimbing-tf`); added `Source` and `GroundingMetadata` messages; added `media_id` (field 9) to `Media`.
    - `iframe_messages_pb.ts`: Added `UserThemePreferenceChangeMessage` and `UserThemePreferenceChangeResponse` with `UserThemePreference` enum.
    - `config_pb`: Added `mcp` map (field 3) to `PluginUserConfig`.
    - `jetbox_state_pb`: Added `vertex_service_tier` (field 46) to `UserSettings`.
    - `closure/net/xhrio.js` & `xmlhttpfactory.js`: Added `RequestInit` and `FetchXmlHttpFactory` parameter support.

- **Webview Bridges (`extension/bridge.js`, `extension/loading_bridge.js`)**:
  - `bridge.js`: Normalized runtime (988 diff lines), updated protobuf descriptors (`codeium_common.proto`, `cortex.proto`, `iframe_messages.proto`, `config.proto`, `workspace_id.proto`) and bindings (`SubagentDescriptor`, `SubagentMetadata`, `GroundingMetadata`, `Source`, `PluginMcpUserConfig`, `WorkspaceId`).

- **Build Metadata (`extension/package.json`)**:
  - `BUILD_DEPOT_PATH`: `//depot/google3`
  - `BUILD_BLAZE_RELEASE`: `release blaze-2026.09.02-1 (mainline @974746007)`
  - `BUILD_EMBED_LABEL`: `antigravity_vscode_extension_1.3.0_RC01`
  - `BUILD_HOSTNAME`: `ovo11.prod.google.com`

---

## [1.2.1] - 2026-09-08

### 🚀 Highlights
- **Third-Party Webview Compatibility & Prototype Isolation**: Scoped webview message serialization directly to the Antigravity webview instance, preventing global prototype mutation that affected third-party extension webviews (such as GitLens).

- **Binary Webview Message Support**: Added direct pass-through for `ArrayBuffer` and typed array views (`ArrayBuffer.isView`) in webview IPC, avoiding destructive JSON stringification of binary payloads.

### 🐛 Fixes & Patches
- **Third-Party Extension Webview Interference**: Removed global `Object.getPrototypeOf(webview)` prototype patching in `desktop_webview_delegate.ts`. Webview patching for BigInt serialization is now applied strictly to the individual Antigravity webview instance, eliminating side effects on other extensions sharing the VS Code Webview prototype.

- **Binary Message Serialization**: Guarded `postMessage` JSON serialization against `ArrayBuffer` and `ArrayBufferView` payloads, ensuring binary buffers are forwarded untouched rather than mangled by `JSON.stringify`.

---

### ⚙️ Under the Hood (Technical & Internal Intelligence)
*This section documents exact Google3 monorepo changes, schemas, and build revisions.*

- **Core & Lifecycle (`extension/src/cloud/...`)**:
  - `desktop_webview_delegate.ts`:
    - Refactored `patchWebviewPostMessage(webview)` to eliminate prototype-level mutation (`Object.getPrototypeOf(webview)`).
    - Inlined instance-level patching with safety check (`typeof webview.postMessage !== 'function'`) and idempotency guard (`extendedWebview._patchedForBigInt`).
    - Added fast-path bypass for binary messages (`ArrayBuffer.isView(message) || message instanceof ArrayBuffer`) before JSON BigInt stringification.

- **Build Metadata (`extension/package.json`)**:
  - `BUILD_DEPOT_PATH`: `//depot/branches/antigravity_vscode_extension_release_branch/974744555.1/google3`
  - `BUILD_BLAZE_RELEASE`: `release blaze-2026.08.18-1 (mainline @965897722)`
  - `BUILD_EMBED_LABEL`: `antigravity_vscode_extension_1.2.1_RC02`
  - `BUILD_HOSTNAME`: `lman20.prod.google.com`

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
