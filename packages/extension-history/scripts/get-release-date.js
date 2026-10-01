const https = require('https');
const path = require('path');
const fs = require('fs');

/**
 * Fetches the public live release date (YYYY-MM-DD) for a given extension version
 * from the official VS Code Marketplace API.
 * @param {string} version
 * @return {Promise<string|null>}
 */
function getMarketplaceReleaseDate(version) {
  return new Promise((resolve) => {
    const payload = JSON.stringify({
      filters: [{ criteria: [{ filterType: 7, value: 'google.google-antigravity' }] }],
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
        timeout: 5000,
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          try {
            const json = JSON.parse(body);
            const versions = json.results?.[0]?.extensions?.[0]?.versions ?? [];
            const match = versions.find((v) => v.version === version);
            if (match && match.lastUpdated) {
              resolve(match.lastUpdated.slice(0, 10));
              return;
            }
          } catch {}
          resolve(null);
        });
      },
    );

    req.on('error', () => resolve(null));
    req.on('timeout', () => {
      req.destroy();
      resolve(null);
    });

    req.write(payload);
    req.end();
  });
}

// Standalone CLI usage: node scripts/get-release-date.js [version]
if (require.main === module) {
  let ver = process.argv[2];
  if (!ver) {
    const pkgPath = path.resolve(__dirname, '../extension/package.json');
    if (fs.existsSync(pkgPath)) {
      ver = require(pkgPath).version;
    }
  }
  if (!ver) {
    console.error('Usage: node scripts/get-release-date.js <version>');
    process.exit(1);
  }

  getMarketplaceReleaseDate(ver).then((date) => {
    if (date) {
      console.log(date);
    } else {
      console.error(`Could not find release date for version ${ver}`);
      process.exit(1);
    }
  });
}

module.exports = { getMarketplaceReleaseDate };
