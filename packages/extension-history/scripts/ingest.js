const fs = require('fs');
const path = require('path');
const { fetchRelease } = require('./fetch-release');
const { unpackVsix } = require('./unpack-vsix');
const { extractSources } = require('./extract-sources');
const { normalizeBridge } = require('./normalize-bridge');
const { getMarketplaceReleaseDate } = require('./get-release-date');

async function main() {
  const projectRoot = path.resolve(__dirname, '..');
  const isForce = process.argv.includes('--force');
  let target = process.argv.filter((arg) => !arg.startsWith('--'))[2];

  let releaseInfo = null;

  // If no target or "latest" is passed, auto-check marketplace
  if (!target || target === 'latest') {
    try {
      releaseInfo = await fetchRelease('latest', isForce);
      target = releaseInfo.vsixPath;

      // If already on the latest version and not forcing, exit early
      if (!releaseInfo.isNew && !isForce) {
        console.log(`\n✨ Antigravity is already up to date! (v${releaseInfo.version} is the latest Marketplace release)`);
        console.log(`Tip: Pass --force to re-extract and re-normalize (e.g. "node scripts/ingest.js --force").`);
        return;
      }
    } catch (err) {
      console.warn(`[Marketplace] Notice: ${err.message}. Falling back to local releases.`);
    }
  } else if (/^\d+\.\d+\.\d+$/.test(target)) {
    // If a specific semver version was requested (e.g. 1.5.0), resolve it
    try {
      releaseInfo = await fetchRelease(target, isForce);
      target = releaseInfo.vsixPath;
    } catch (err) {
      console.warn(`[Marketplace] Notice: ${err.message}. Falling back to local releases.`);
    }
  }

  // Fallback to latest local .vsix in releases/ if target not resolved
  if (!target || !fs.existsSync(target)) {
    const releasesDir = path.join(projectRoot, 'releases');
    if (fs.existsSync(releasesDir)) {
      const vsixFiles = fs
        .readdirSync(releasesDir)
        .filter((f) => f.endsWith('.vsix'))
        .sort();
      if (vsixFiles.length > 0) {
        target = path.join(releasesDir, vsixFiles[vsixFiles.length - 1]);
      }
    }
  }

  if (!target || !fs.existsSync(target)) {
    console.error('Usage: node scripts/ingest.js [version-or-vsix-path] [--force]');
    console.error('Example: node scripts/ingest.js');
    console.error('Example: node scripts/ingest.js 1.6.0 --force');
    console.error('Example: node scripts/ingest.js releases/google.google-antigravity-1.6.0.vsix');
    process.exit(1);
  }

  console.log('='.repeat(60));
  console.log(`🚀 Ingesting Antigravity Extension Release: ${path.basename(target)}`);
  console.log('='.repeat(60));

  const startTime = Date.now();

  console.log('\n[Step 1/3] Unpacking VSIX...');
  unpackVsix(target);

  console.log('\n[Step 2/3] Extracting Google3 Monorepo Sources...');
  extractSources();

  console.log('\n[Step 3/3] Normalizing Bridges, Metadata, and Assets...');
  normalizeBridge();

  // Determine extension version and fetch official Marketplace release date
  let version = releaseInfo?.version || null;
  if (!version) {
    const pkgPath = path.join(projectRoot, 'extension', 'package.json');
    if (fs.existsSync(pkgPath)) {
      version = require(pkgPath).version;
    } else {
      const match = target.match(/(\d+\.\d+\.\d+)/);
      if (match) version = match[1];
    }
  }

  let releaseDate = releaseInfo?.releaseDate || null;
  if (version && !releaseDate) {
    releaseDate = await getMarketplaceReleaseDate(version);
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log('\n' + '='.repeat(60));
  console.log(`✅ Ingestion completed in ${duration}s!`);
  if (version && releaseDate) {
    console.log(`📅 Marketplace Release Date: ${releaseDate}`);
    console.log(`📋 Changelog Header: ## [${version}] - ${releaseDate}`);
  }
  console.log('='.repeat(60));
}

if (require.main === module) {
  main();
}

module.exports = { main };
