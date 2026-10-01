# Google Antigravity Extension Changelog

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-brightgreen.svg)](https://nodejs.org)

A dedicated Git repository and monorepo for tracking, analyzing, and documenting releases of the **Google Antigravity VS Code Extension** (`google.google-antigravity`) alongside companion development tooling.

This repository automatically downloads new releases from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=Google.google-antigravity), reconstitutes internal Google3 monorepo source files from extension bundles via sourcemaps, normalizes webview bridges, documents categorized release notes in package changelogs, and produces pristine Git diffs across releases.

---

## About the Changelogs

Unlike high-level marketing release notes, changelogs in this project are designed as **exhaustive technical audits and engineering records**:

* **Progressive Disclosure:** Each release starts with high-level highlights for a quick 5-second scan, expands into user-facing improvements and fixes, and finishes with an in-depth code breakdown.
* **Under the Hood Depth:** The technical section documents exact changes across reconstructed Google3 TypeScript sources, Protobuf/JSPB schemas, RPC indices, and Blaze build labels so developers and modders have total visibility into what changed.

---

## Updating & Auditing Skills

This repository includes automated companion skills for managing upstream releases and patch lifecycles:

### 1. Ingest Upstream Release (`/update-antigravity`)
Whenever Google publishes a new version on the Visual Studio Marketplace, run:
```text
/update-antigravity
```
The agent automatically downloads the `.vsix`, reconstructs Google3 TypeScript sources from sourcemaps into `packages/extension-history/extension/src/`, normalizes webview bridges, performs deep diff analysis, documents categorized release notes in `packages/extension-history/CHANGELOG.md`, and rebuilds docs.

### 2. Audit Companion Patches (`/audit-patches`)
After a new release is ingested, audit the hotfix patches in `packages/extension-patches/`:
```text
/audit-patches
```
The agent checks whether Google resolved any hotfixes upstream, verifies AST/code replacement targets against the new `.vsix` bundle, updates version locks in `patch.js` and `PATCHES.md`, and records upstream resolution tracking in `packages/extension-patches/CHANGELOG.md`.

---

## Monorepo Structure

```text
antigravity-extension-changelog/
├── README.md                          # Monorepo workspace overview (this file)
├── LICENSE                            # Global MIT License
├── build_docs.js                      # Multi-tab documentation site generator
│
├── docs/                              # Static documentation deployment (served via GitHub Pages)
│   ├── index.html                     # Compiled interactive changelog website
│   ├── changelog-extension.md         # Dedicated markdown changelog for Extension
│   ├── changelog-patches.md           # Dedicated markdown changelog for Patches CLI
│   └── assets/                        # Fonts, styles, and static icons
│
└── packages/
    ├── extension-history/             # Extension de-bundling, tracking, and diff engine
    │   ├── CHANGELOG.md               # Dedicated extension release audit & changelog
    │   ├── README.md                  # Package overview and usage
    │   ├── scripts/                   # Pipeline automation tooling
    │   │   ├── fetch-release.js       # Marketplace API downloader
    │   │   ├── ingest.js              # Unified runner: fetch -> unpack -> extract -> normalize
    │   │   ├── get-release-date.js    # Marketplace release date resolver
    │   │   ├── unpack-vsix.js         # Unzips .vsix into staging
    │   │   ├── extract-sources.js     # Reconstructs Google3 Piper sources
    │   │   └── normalize-bridge.js    # Strips signatures, formats bridges
    │   ├── releases/                  # Cached raw .vsix archives
    │   └── extension/                 # Reconstituted Google3 monorepo & manifest
    │
    └── extension-patches/             # Safe, modular client-side patch manager
        ├── CHANGELOG.md               # Dedicated patches changelog
        ├── PATCHES.md                 # Upstream tracking & forensic patch registry
        ├── README.md                  # Package overview and patch commands
        ├── patch.js                   # CLI entry point (status, apply, revert)
        ├── core/                      # Engine, locator, and AST validator
        └── patches/                   # Active patch definitions
```

---

## Running the Ingestion Pipeline

```bash
# Ingest latest marketplace release automatically
node packages/extension-history/scripts/ingest.js

# Or ingest a specific version
node packages/extension-history/scripts/ingest.js 1.7.0

# Rebuild documentation website & tab-scoped markdown artifacts
node build_docs.js
```

---

## Disclaimer

This project is an independent community archive and tooling repository. It is not affiliated with, endorsed by, or sponsored by Google LLC. All Google Antigravity trademarks and extension payloads remain the property of Google LLC.
