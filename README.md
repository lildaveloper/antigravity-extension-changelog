# Google Antigravity Extension Release History

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-brightgreen.svg)](https://nodejs.org)

A dedicated Git repository for tracking, analyzing, and documenting releases of the **Google Antigravity VS Code Extension** (`google.google-antigravity`).

This repository automatically downloads new releases from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=Google.google-antigravity), reconstitutes the internal Google3 monorepo source files from the extension bundle via sourcemaps, normalizes webview bridges, documents categorized release notes in `CHANGELOG.md`, and produces pristine Git diffs across releases.

---

## About the Changelog

Unlike high-level marketing release notes, `CHANGELOG.md` is designed as an **exhaustive technical audit and engineering record**:

* **Progressive Disclosure:** Each release starts with high-level highlights for a quick 5-second scan, expands into user-facing improvements and fixes, and finishes with an in-depth code breakdown.
* **Under the Hood Depth:** The technical section documents exact changes across reconstructed Google3 TypeScript sources, Protobuf/JSPB schemas, RPC indices, and Blaze build labels so developers and modders have total visibility into what changed.

---

## Updating Antigravity

This repository is powered by an automated agent skill. Whenever Google releases a new version of the extension, simply prompt any AI agent in this workspace:

```text
/update-antigravity
```

The agent will automatically:
1. Query the Visual Studio Marketplace API and download the newest `.vsix` into `releases/`.
2. Extract and de-bundle the Google3 monorepo TypeScript sources into `extension/src/`.
3. Normalize frontend webview bridges and extension assets.
4. Perform deep diff analysis across lifecycle services, Jetski diff zones, and Protobuf schemas.
5. Prepend structured, two-tier release notes into `CHANGELOG.md`.
6. Create an atomic release commit.

---

## Repository Structure

```
agy-extension-history/
├── README.md                          # Repository documentation (this file)
├── CHANGELOG.md                       # Categorized release notes (Google-style + Under the Hood)
├── LICENSE                            # MIT License for repository tooling and scripts
├── .gitignore                         # Ignores local staging directory and OS artifacts
├── scripts/                           # Release pipeline automation tooling
│   ├── fetch-release.js               # VS Code Marketplace API downloader & release resolver
│   ├── ingest.js                      # Unified runner: fetch -> unpack -> extract -> normalize -> resolve date
│   ├── get-release-date.js            # Marketplace release date resolver
│   ├── unpack-vsix.js                 # Unzips .vsix into temporary .staging/
│   ├── extract-sources.js             # Reconstructs Google3 Piper source tree into extension/src/
│   └── normalize-bridge.js            # Strips signatures, formats bridges, copies assets
├── releases/                          # Raw .vsix archive files
│   ├── google.google-antigravity-1.0.0.vsix
│   ├── google.google-antigravity-1.1.0.vsix
│   └── ...
└── extension/                         # Tracked Google Antigravity extension payload
    ├── package.json                   # Extension manifest
    ├── README.md                      # Extension README
    ├── LICENSE.txt
    ├── ThirdPartyNotices.txt
    ├── bridge.js                      # Normalized frontend bridge
    ├── loading_bridge.js              # Normalized loading bridge
    ├── img/                           # Extension icon assets
    │   ├── logo.png
    │   └── logo.svg
    └── src/                           # Reconstituted Google3 monorepo (~860+ individual modules)
        ├── cloud/developer_experience/antigravity_extensions/vscode/
        ├── devtools/cider/extensions/jetski/
        ├── blaze-out/
        └── third_party/
```

---

## Manual Execution (Optional)

If running the ingestion pipeline manually from terminal:

```bash
# Ingest latest marketplace release automatically
node scripts/ingest.js

# Or ingest a specific version
node scripts/ingest.js 1.7.0
```

---

## Related Projects

* [antigravity-extension-patches](https://github.com/lildaveloper/antigravity-extension-patches) — A safe, modular patch manager for applying client-side fixes and enhancements to the installed Google Antigravity VS Code extension.

---

## Disclaimer

This project is an independent community archive and tooling repository. It is not affiliated with, endorsed by, or sponsored by Google LLC. All Google Antigravity trademarks and extension payloads remain the property of Google LLC.
