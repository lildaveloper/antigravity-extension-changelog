---
name: update-antigravity
description: Automatically fetches, ingests, de-bundles, and normalizes a new Antigravity extension release from the VS Code Marketplace, performs deep diff analysis, generates release notes in CHANGELOG.md, and creates a release commit.
---

# Update Antigravity Extension Release Skill

This skill provides a fully automated, deterministic pipeline for tracking Google Antigravity VS Code Extension (`google.google-antigravity`) releases:
1. Automatically queries and downloads the latest `.vsix` from the Visual Studio Marketplace into `releases/`.
2. Reconstructs the internal Google3 monorepo source tree from sourcemaps into `extension/`.
3. Normalizes webview bridges, manifest metadata, and icon assets.
4. Performs deep AST/protobuf/diff analysis against the prior release.
5. Formats and prepends a two-tier release report in `CHANGELOG.md`.
6. Creates an atomic release commit.

---

## 1. Quick Reference: The Unified Pipeline

To check for and ingest a new release:

```bash
# Auto-check Marketplace for the latest release (downloads if new)
node scripts/ingest.js

# Or ingest a specific version
node scripts/ingest.js <VERSION>
```

**Examples:**
```bash
node scripts/ingest.js
node scripts/ingest.js 1.7.0
```

### Tooling Inventory:
1. **`scripts/fetch-release.js`**: Queries the VS Code Marketplace API for `Google.google-antigravity`, checks for new versions, and streams the `.vsix` archive directly into `releases/`.
2. **`scripts/unpack-vsix.js`**: Unzips the `.vsix` package into temporary `.staging/`.
3. **`scripts/extract-sources.js`**:
   - Parses `extension.js.map` sections.
   - Reconstructs ~860+ individual Google3 monorepo source files under `extension/src/`.
   - Strips Closure/CJS wrappers and code signing blocks.
4. **`scripts/normalize-bridge.js`**:
   - Copies manifests, licenses, and icon assets into `extension/`.
   - Strips digital signatures from `extension/bridge.js` and `extension/loading_bridge.js`.
   - Formats bridge scripts with Prettier for clean diffs.
   - Cleans up `.staging/`.
5. **`scripts/get-release-date.js`**: Resolves official publication timestamps from the Marketplace.

---

## 2. Step-by-Step Update Workflow

When the user triggers `/update-antigravity` (with or without a specific version):

### Step 1: Run the Unified Ingestion Runner
```bash
node scripts/ingest.js [VERSION]
```

- **If already up to date:** The script will report that the current version matches the latest marketplace version and is already cached. Inform the user: *"Antigravity is already up to date (current version: X.Y.Z)."* and stop.
- **If a new version was ingested:** Note the `📅 Marketplace Release Date` and `📋 Changelog Header` printed at the end of the script output.

### Step 2: Inspect Git Changes
Check modified, added, and deleted files:
```bash
git status
git diff --stat extension/
```

### Step 3: Perform Deep Diff Analysis
Inspect diffs across these key functional areas to gather both user-facing changes and deep technical under-the-hood details:

1. **Extension Core & Server Lifecycle**:
   ```bash
   git diff extension/src/cloud/developer_experience/antigravity_extensions/vscode/
   ```
   *Look for: binary download logic, LSP/server startup recovery loops, workspace management, telemetry.*

2. **Diff Rendering & Inline Editing (Jetski)**:
   ```bash
   git diff extension/src/devtools/cider/extensions/jetski/diff_zones/
   ```
   *Look for: inline diff zone renderers, hunk storage, agent edit manager, conflict resolution.*

3. **Protobuf & IPC Schemas**:
   ```bash
   git diff extension/src/blaze-out/ extension/src/third_party/jetski/ extension/src/net/proto2/
   ```
   *Look for: new RPC services, message fields, configuration schemas, feature flags.*

4. **Webview Bridges & UI**:
   ```bash
   git diff extension/bridge.js extension/loading_bridge.js
   ```
   *Look for: webview message handlers, event listeners, UI theme changes.*

5. **Extension Manifest & Contributes**:
   ```bash
   git diff extension/package.json
   ```
   *Look for: new commands, configuration properties, menu contributions, keybindings, Blaze build labels.*

---

## 3. Step 4: Document in `CHANGELOG.md` (Two-Tier Structure)

### Release Date:
Use the date printed by `scripts/ingest.js` for the release heading:
`## [<VERSION>] - <YYYY-MM-DD>`

### Stacking Rule: Reverse-Chronological Order (Newest at Top)
Always prepend the new release block directly below the header separator (`---`) in `CHANGELOG.md`.

### Formatting & Spacing Guidelines:
- **Loose List Spacing:** Include a single blank line between top-level bullet blocks for clean readability in Markdown viewers. Keep child sub-bullets grouped tightly under their respective parent bullet.

### Template:
```markdown
## [<VERSION>] - <YYYY-MM-DD>

### 🚀 Highlights
- **<Topic>**: <High-level summary of major capability or change>

- **<Topic>**: <High-level summary of major capability or change>

### ✨ Improvements & Features
- **<Feature Area>**:
  - <Description of feature or improvement>
  - <Additional sub-points if needed...>

- **<Feature Area>**:
  - <Description of feature or improvement>
  - <Additional sub-points if needed...>

### 🐛 Fixes & Patches
- **<Fix Area>**: <Description of bug fix or stability improvement>

- **<Fix Area>**: <Description of bug fix or stability improvement>

---

### ⚙️ Under the Hood (Technical & Internal Intelligence)
*This section documents exact Google3 monorepo changes, schemas, and build revisions.*

- **Core & Lifecycle (`extension/src/cloud/...`)**:
  - `<file_name.ts>`:
    - <Specific functions, classes, and constants modified or added (e.g. extension.ts, server_manager.ts, binary_downloader.ts)>

- **Jetski & Diff Zones (`extension/src/devtools/cider/...`)**:
  - <Internal changes to inline diff renderers, hunk storage, or conflict managers>

- **Protobuf & IPC Schemas (`extension/src/blaze-out/` & `extension/src/third_party/jetski/`)**:
  - <List all new or refactored JSPB schemas and fields (e.g. ConversationGroupConfig, SkillUserConfig)>

- **Webview Bridges (`extension/bridge.js`, `extension/loading_bridge.js`)**:
  - <Message handling, protocol, and state management updates>

- **Build Metadata (`extension/package.json`)**:
  - `BUILD_BLAZE_RELEASE`: `<label>`
  - `BUILD_EMBED_LABEL`: `<label>`
```

---

## 4. Step 5: Atomic Stage and Commit

Stage the updated extension payload, releases archive, and changelog:
```bash
git add extension/ releases/ CHANGELOG.md
git commit -m "Antigravity Extension - Version <VERSION>"
```

Verify that `git status` is clean:
```bash
git status
```

---

## 5. Step 6: Present Release Notes to User

Output the user-facing release notes and key technical highlights directly in chat for the user.
