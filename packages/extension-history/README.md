# Antigravity Extension History Engine

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-brightgreen.svg)](https://nodejs.org)

Automated tracking, reverse-engineering, and documentation engine for official releases of the **Google Antigravity VS Code Extension** (`google.google-antigravity`).

---

## Capabilities

* **Marketplace Querying & Ingestion**: Streams new `.vsix` packages from the Visual Studio Marketplace into `releases/`.
* **Piper / Google3 Source Reconstruction**: Parses embedded sourcemap sections to reconstruct ~860+ original TypeScript modules under `extension/src/`.
* **Bridge Normalization**: Strips code signing wrappers and digital signatures, formatting bridges with Prettier for pristine Git diffs.
* **Granular Diff Auditing**: Pinpoints changes across lifecycle managers, Jetski inline diff zones, webview protocols, and Protobuf schemas.

---

## Directory Structure

```text
packages/extension-history/
├── CHANGELOG.md                       # Canonical extension changelog
├── README.md                          # Package documentation
├── scripts/                           # Ingestion pipeline scripts
│   ├── fetch-release.js               # Marketplace downloader
│   ├── unpack-vsix.js                 # VSIX extractor
│   ├── extract-sources.js             # Google3 sourcemap reconstructor
│   ├── normalize-bridge.js            # Bridge cleaner & formatter
│   ├── get-release-date.js            # Marketplace timestamp resolver
│   └── ingest.js                      # Unified pipeline runner
├── releases/                          # Cached raw .vsix archives
└── extension/                         # Reconstituted Google3 monorepo & manifest
```

---

## Running the Pipeline

```bash
# Ingest the latest release from the Marketplace
node scripts/ingest.js

# Or ingest a specific version
node scripts/ingest.js 1.6.0
```
