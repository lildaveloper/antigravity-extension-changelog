const fs = require('fs');
const path = require('path');
const cp = require('child_process');

function unpackVsix(vsixInput) {
  if (!vsixInput) {
    console.error('Usage: node scripts/unpack-vsix.js <path-or-version>');
    process.exit(1);
  }

  const projectRoot = path.resolve(__dirname, '..');
  let vsixPath = vsixInput;

  // Resolve if version shorthand provided (e.g. "1.0.0")
  if (!fs.existsSync(vsixPath)) {
    const candidatePath = path.join(projectRoot, 'releases', `google.google-antigravity-${vsixInput}.vsix`);
    if (fs.existsSync(candidatePath)) {
      vsixPath = candidatePath;
    } else {
      // Check if relative to project root
      const fromRoot = path.join(projectRoot, vsixInput);
      if (fs.existsSync(fromRoot)) {
        vsixPath = fromRoot;
      } else {
        console.error(`[Error] VSIX file not found: ${vsixInput}`);
        process.exit(1);
      }
    }
  }

  const stagingDir = path.join(projectRoot, '.staging');
  if (fs.existsSync(stagingDir)) {
    fs.rmSync(stagingDir, { recursive: true, force: true });
  }
  fs.mkdirSync(stagingDir, { recursive: true });

  console.log(`[Unpack] Unzipping ${path.basename(vsixPath)} into .staging...`);
  cp.execSync(`unzip -q "${path.resolve(vsixPath)}" -d "${stagingDir}"`);

  const extDir = path.join(stagingDir, 'extension');
  if (!fs.existsSync(extDir)) {
    console.error('[Error] Expected "extension" directory not found inside .staging.');
    process.exit(1);
  }

  console.log(`[Unpack] Extraction complete. Staging folder ready at ${extDir}`);
}

if (require.main === module) {
  unpackVsix(process.argv[2]);
}

module.exports = { unpackVsix };
