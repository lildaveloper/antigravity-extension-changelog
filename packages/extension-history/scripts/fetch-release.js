const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

/**
 * Queries the official VS Code Marketplace API for Google.google-antigravity.
 * @return {Promise<{ latestVersion: string, lastUpdated: string, downloadUrl: string, versions: Array }>}
 */
function queryMarketplace() {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      filters: [{ criteria: [{ filterType: 7, value: 'Google.google-antigravity' }] }],
      flags: 0x1 | 0x2 | 0x4 | 0x8 | 0x10 | 0x20 | 0x80 | 0x100,
    });

    const req = https.request(
      {
        hostname: 'marketplace.visualstudio.com',
        path: '/_apis/public/gallery/extensionquery',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json;api-version=3.0-preview.1',
          'Content-Length': Buffer.byteLength(payload),
        },
        timeout: 10000,
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          try {
            const json = JSON.parse(body);
            const ext = json.results?.[0]?.extensions?.[0];
            if (!ext || !ext.versions || ext.versions.length === 0) {
              return reject(new Error('Google Antigravity extension not found in Marketplace.'));
            }
            const versions = ext.versions;
            const latest = versions[0];
            const vsixFile = latest.files?.find(
              (f) => f.assetType === 'Microsoft.VisualStudio.Services.VSIXPackage'
            );
            const downloadUrl =
              vsixFile?.source ||
              `https://marketplace.visualstudio.com/_apis/public/gallery/publishers/Google/vsextensions/google-antigravity/${latest.version}/vspackage`;

            resolve({
              latestVersion: latest.version,
              lastUpdated: latest.lastUpdated ? latest.lastUpdated.slice(0, 10) : null,
              downloadUrl,
              versions,
            });
          } catch (err) {
            reject(new Error(`Failed to parse Marketplace API response: ${err.message}`));
          }
        });
      }
    );

    req.on('error', (err) => reject(new Error(`Marketplace API request failed: ${err.message}`)));
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Marketplace API request timed out.'));
    });

    req.write(payload);
    req.end();
  });
}

/**
 * Downloads a file from a URL, following 301/302/307 redirects.
 * @param {string} url
 * @param {string} destPath
 * @return {Promise<string>}
 */
function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http;
    proto
      .get(url, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return resolve(downloadFile(res.headers.location, destPath));
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`Download failed with HTTP ${res.statusCode}`));
        }
        const file = fs.createWriteStream(destPath);
        res.pipe(file);
        file.on('finish', () => {
          file.close(() => resolve(destPath));
        });
      })
      .on('error', reject);
  });
}

/**
 * Resolves or downloads the VSIX release package for the specified version (or latest).
 * @param {string} [requestedVersion]
 * @param {boolean} [forceDownload=false]
 * @return {Promise<{ version: string, vsixPath: string, releaseDate: string, isNew: boolean }>}
 */
async function fetchRelease(requestedVersion, forceDownload = false) {
  const projectRoot = path.resolve(__dirname, '..');
  const releasesDir = path.join(projectRoot, 'releases');
  fs.mkdirSync(releasesDir, { recursive: true });

  console.log('[Marketplace] Querying Visual Studio Marketplace for Google Antigravity...');
  const marketInfo = await queryMarketplace();

  let targetVersion = requestedVersion;
  let releaseDate = null;
  let downloadUrl = null;

  if (!targetVersion || targetVersion === 'latest') {
    targetVersion = marketInfo.latestVersion;
    releaseDate = marketInfo.lastUpdated;
    downloadUrl = marketInfo.downloadUrl;
  } else {
    const matched = marketInfo.versions.find((v) => v.version === targetVersion);
    if (matched) {
      releaseDate = matched.lastUpdated ? matched.lastUpdated.slice(0, 10) : null;
      const vsixFile = matched.files?.find(
        (f) => f.assetType === 'Microsoft.VisualStudio.Services.VSIXPackage'
      );
      downloadUrl =
        vsixFile?.source ||
        `https://marketplace.visualstudio.com/_apis/public/gallery/publishers/Google/vsextensions/google-antigravity/${targetVersion}/vspackage`;
    } else {
      downloadUrl = `https://marketplace.visualstudio.com/_apis/public/gallery/publishers/Google/vsextensions/google-antigravity/${targetVersion}/vspackage`;
    }
  }

  const vsixFileName = `google.google-antigravity-${targetVersion}.vsix`;
  const vsixPath = path.join(releasesDir, vsixFileName);

  // Check if currently tracked in extension/package.json
  let currentVersion = null;
  const pkgPath = path.join(projectRoot, 'extension', 'package.json');
  if (fs.existsSync(pkgPath)) {
    try {
      currentVersion = require(pkgPath).version;
    } catch {}
  }

  const alreadyExists = fs.existsSync(vsixPath);

  if (alreadyExists && !forceDownload) {
    console.log(`[Marketplace] VSIX already cached locally at releases/${vsixFileName}`);
    return {
      version: targetVersion,
      vsixPath,
      releaseDate,
      isNew: currentVersion !== targetVersion,
    };
  }

  console.log(`[Marketplace] Downloading v${targetVersion} from Marketplace...`);
  await downloadFile(downloadUrl, vsixPath);
  const sizeMB = (fs.statSync(vsixPath).size / (1024 * 1024)).toFixed(2);
  console.log(`[Marketplace] Saved releases/${vsixFileName} (${sizeMB} MB)`);

  return {
    version: targetVersion,
    vsixPath,
    releaseDate,
    isNew: currentVersion !== targetVersion,
  };
}

if (require.main === module) {
  const arg = process.argv[2];
  const force = process.argv.includes('--force');
  fetchRelease(arg, force)
    .then((info) => {
      console.log(`\nRelease Information:`);
      console.log(`- Version: ${info.version}`);
      console.log(`- VSIX File: ${info.vsixPath}`);
      console.log(`- Release Date: ${info.releaseDate}`);
      console.log(`- Is New Release: ${info.isNew}`);
    })
    .catch((err) => {
      console.error('[Error]', err.message);
      process.exit(1);
    });
}

module.exports = { fetchRelease, queryMarketplace };
