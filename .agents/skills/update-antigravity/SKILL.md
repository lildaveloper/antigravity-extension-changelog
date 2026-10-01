---
name: update-antigravity
description: Automatically fetches, ingests, de-bundles, and normalizes a new Antigravity extension release from the VS Code Marketplace, performs deep diff analysis, generates release notes in CHANGELOG.md, and creates a release commit.
---

# Update Antigravity Extension Release Skill

This skill provides a fully automated, deterministic pipeline for tracking Google Antigravity VS Code Extension (`google.google-antigravity`) releases:
1. Automatically queries and downloads the latest `.vsix` from the Visual Studio Marketplace into `packages/extension-history/releases/`.
2. Reconstructs the internal Google3 monorepo source tree from sourcemaps into `packages/extension-history/extension/`.
3. Normalizes webview bridges, manifest metadata, and icon assets.
4. Performs deep AST/protobuf/diff analysis against the prior release.
5. Formats and prepends a two-tier release report in `packages/extension-history/CHANGELOG.md`.
6. Rebuilds the documentation surface (`docs/index.html`).
7. Creates an atomic release commit.

---

## 1. Quick Reference: The Unified Pipeline

To check for and ingest a new release:

```bash
# Auto-check Marketplace for the latest release (downloads if new)
node packages/extension-history/scripts/ingest.js

# Or ingest a specific version
node packages/extension-history/scripts/ingest.js <VERSION>
```

**Examples:**
```bash
node packages/extension-history/scripts/ingest.js
node packages/extension-history/scripts/ingest.js 1.7.0
```

### Tooling Inventory:
1. **`packages/extension-history/scripts/fetch-release.js`**: Queries the VS Code Marketplace API for `Google.google-antigravity`, checks for new versions, and streams the `.vsix` archive directly into `packages/extension-history/releases/`.
2. **`packages/extension-history/scripts/unpack-vsix.js`**: Unzips the `.vsix` package into temporary `.staging/`.
3. **`packages/extension-history/scripts/extract-sources.js`**:
   - Parses `extension.js.map` sections.
   - Reconstructs ~860+ individual Google3 monorepo source files under `packages/extension-history/extension/src/`.
   - Strips Closure/CJS wrappers and code signing blocks.
4. **`packages/extension-history/scripts/normalize-bridge.js`**:
   - Copies manifests, licenses, and icon assets into `packages/extension-history/extension/`.
   - Strips digital signatures from `packages/extension-history/extension/bridge.js` and `loading_bridge.js`.
   - Formats bridge scripts with Prettier for clean diffs.
   - Cleans up `.staging/`.
5. **`packages/extension-history/scripts/get-release-date.js`**: Resolves official publication timestamps from the Marketplace.

---

## 2. Step-by-Step Update Workflow

When the user triggers `/update-antigravity` (with or without a specific version):

### Step 1: Run the Unified Ingestion Runner
```bash
node packages/extension-history/scripts/ingest.js [VERSION]
```

- **If already up to date:** The script will report that the current version matches the latest marketplace version and is already cached. Inform the user: *"Antigravity is already up to date (current version: X.Y.Z)."* and stop.
- **If a new version was ingested:** Note the `📅 Marketplace Release Date` and `📋 Changelog Header` printed at the end of the script output.

### Step 2: Inspect Git Changes
Check modified, added, and deleted files:
```bash
git status
git diff --stat packages/extension-history/extension/
```

### Step 3: Perform Deep Diff Analysis
Inspect diffs across these key functional areas to gather both user-facing changes and deep technical under-the-hood details:

1. **Extension Core & Server Lifecycle**:
   ```bash
   git diff packages/extension-history/extension/src/cloud/developer_experience/antigravity_extensions/vscode/
   ```
   *Look for: binary download logic, LSP/server startup recovery loops, workspace management, telemetry.*

2. **Diff Rendering & Inline Editing (Jetski)**:
   ```bash
   git diff packages/extension-history/extension/src/devtools/cider/extensions/jetski/diff_zones/
   ```
   *Look for: inline diff zone renderers, hunk storage, agent edit manager, conflict resolution.*

3. **Protobuf & IPC Schemas**:
   ```bash
   git diff packages/extension-history/extension/src/blaze-out/ packages/extension-history/extension/src/third_party/jetski/ packages/extension-history/extension/src/net/proto2/
   ```
   *Look for: new RPC services, message fields, configuration schemas, feature flags.*

4. **Webview Bridges & UI**:
   ```bash
   git diff packages/extension-history/extension/bridge.js packages/extension-history/extension/loading_bridge.js
   ```
   *Look for: webview message handlers, event listeners, UI theme changes.*

5. **Extension Manifest & Contributes**:
   ```bash
   git diff packages/extension-history/extension/package.json
   ```
   *Look for: new commands, configuration properties, menu contributions, keybindings, Blaze build labels.*

---

## 3. Step 4: Document in `packages/extension-history/CHANGELOG.md` (Two-Tier Structure)

### Release Date:
Use the date printed by `packages/extension-history/scripts/ingest.js` for the release heading:
`## [v<VERSION>] - <YYYY-MM-DD>`

### Stacking Rule: Reverse-Chronological Order (Newest at Top)
Always prepend the new release block directly below the header separator (`---`) in `packages/extension-history/CHANGELOG.md`.

### Headline & Summary Guidelines (Official Google Antigravity Style):
Immediately below the version header (`## [v<VERSION>] - <YYYY-MM-DD>`), add:
1. **Headline (`### <Headline>`)**: 5–10 words, active and punchy, capturing the top 1–3 capabilities (e.g. `### Terminal context, resumable downloads, and native OS notifications`).
2. **Summary Paragraph**: Exactly 1–2 conversational sentences (25–45 words) summarizing the primary user value, new capabilities, and stability/performance enhancements.
   - **Avoid repetitive boilerplate**: Never start every summary with formulaic openings like *"This release introduces..."*, *"This update adds..."*, or *"In this version..."*.
   - **Select a capability-first opening hook**:
     - *Action-oriented / Direct user value*: Lead with what developers can do (e.g., *"You can now mention @terminal to pull active selections or recent terminal execution output directly into chat context."* or *"Report issues and inspect host logs directly inside the editor with the new antigravity.feedback diagnostics screen."*).
     - *Performance / System-level breakthrough*: Lead with the architectural gain (e.g., *"Lightweight filesystem stat caching replaces full SHA-256 checks on backend binaries, eliminating multi-second cold-start freezes."*).
     - *Visual / Surface experience*: Lead with the aesthetic or UI upgrade (e.g., *"A redesigned activation screen brings the official Antigravity logo, ambient glow effects, and smooth loading transitions to your sidebar."*).
     - *Resilience / Stability*: Lead with the reliability safeguard (e.g., *"Recover seamlessly from network hiccups with exponential backoff download retries and an interactive webview retry screen."*).
   - **Inspect existing releases for tone calibration**: Always inspect previous entries in `packages/extension-history/CHANGELOG.md` (especially releases sharing similar themes or user values) before drafting the summary to maintain consistent voice, cadence, and conciseness.
   - **Sentence structure**: Sentence 1 highlights the star capability and direct developer benefit. Sentence 2 cleanly groups secondary improvements and fixes (e.g., *"This release also adds..."*, *"This patch also adds..."*).
   - **Grounded details & zero artificial fluff**: Technical entries across all sections use bold topic anchors (`- **Topic**: Details`). Keep them factual and grounded strictly in the diff. Nested sub-bullets are strictly optional—only use them when a feature naturally breaks down into multiple distinct technical facets or files. If a single bullet explains the change completely, keep it as a single bullet without padding filler.

### Template:
```markdown
## [v<VERSION>] - <YYYY-MM-DD>

### <Punchy 5-10 word headline highlighting top 1-3 capabilities>
<1-2 conversational sentences leading with a capability hook and summarizing core user benefits and secondary updates.>

### Highlights
- **<Topic>**: <High-level summary of major capability or change>

- **<Topic>**: <High-level summary of major capability or change>

### Improvements
- **<Feature Area>**:
  - <Description of feature or improvement>
  - <Additional sub-points if needed...>

- **<Feature Area>**:
  - <Description of feature or improvement>
  - <Additional sub-points if needed...>

### Fixes
- **<Fix Area>**: <Description of bug fix or stability improvement>

- **<Fix Area>**: <Description of bug fix or stability improvement>

---

### Under the Hood
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

## 4. Step 5: Rebuild Documentation Site

`packages/extension-history/CHANGELOG.md` is the canonical source of truth for the extension release history. Run the site generator to compile `docs/index.html`:

```bash
node build_docs.js
```

Verify that the generator completed without errors and updated `docs/index.html`.

---

## 5. Step 6: Atomic Stage and Commit

Stage the updated extension payload, releases archive, canonical changelog, and documentation website:
```bash
git add packages/extension-history/ docs/
git commit -m "Antigravity Extension - Version <VERSION>"
```

Verify that `git status` is clean:
```bash
git status
```

---

## 6. Step 7: Present Release Notes to User

Output the user-facing release notes and key technical highlights directly in chat for the user.
