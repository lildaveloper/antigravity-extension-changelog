/**
 * @fileoverview added by tsickle
 * Generated from: cloud/developer_experience/antigravity_extensions/vscode/binary_downloader.ts
 * @suppress {checkTypes} added by tsickle
 * @suppress {extraRequire} added by tsickle
 * @suppress {missingRequire} added by tsickle
 * @suppress {uselessCode} added by tsickle
 * @suppress {suspiciousCode} added by tsickle
 * @suppress {missingReturn} added by tsickle
 * @suppress {unusedLocalVariables} added by tsickle
 * @suppress {missingOverride} added by tsickle
 * @suppress {const} added by tsickle
 */
goog.module('google3.cloud.developer_experience.antigravity_extensions.vscode.binary_downloader');
var module = module || { id: 'cloud/developer_experience/antigravity_extensions/vscode/binary_downloader.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_child_process_1 = goog.requireType("google3.third_party.javascript.typings.node.node.child_process");
const tsickle_crypto_2 = goog.requireType("google3.third_party.javascript.typings.node.node.crypto");
const tsickle_fs_3 = goog.requireType("google3.third_party.javascript.typings.node.node.fs");
const tsickle_os_4 = goog.requireType("google3.third_party.javascript.typings.node.node.os");
const tsickle_path_5 = goog.requireType("google3.third_party.javascript.typings.node.node.path");
const tsickle_semver_6 = goog.requireType("google3.third_party.javascript.typings.semver.index");
const tsickle_stream_7 = goog.requireType("google3.third_party.javascript.typings.node.node.stream");
const tsickle_promises_8 = goog.requireType("google3.third_party.javascript.typings.node.node.stream.promises");
const tsickle_web_9 = goog.requireType("google3.third_party.javascript.typings.node.node.stream.web");
const tsickle_util_10 = goog.requireType("google3.third_party.javascript.typings.node.node.util");
const tsickle_vscode_11 = goog.requireType("vscode");
const child_process_1 = goog.require('google3.third_party.javascript.typings.node.node.child_process');
const crypto_1 = goog.require('google3.third_party.javascript.typings.node.node.crypto');
const fs_1 = goog.require('google3.third_party.javascript.typings.node.node.fs');
const os_1 = goog.require('google3.third_party.javascript.typings.node.node.os');
const path_1 = goog.require('google3.third_party.javascript.typings.node.node.path');
const semver_1 = goog.require('google3.third_party.javascript.typings.semver.index');
const stream_1 = goog.require('google3.third_party.javascript.typings.node.node.stream');
const promises_1 = goog.require('google3.third_party.javascript.typings.node.node.stream.promises');
const util_1 = goog.require('google3.third_party.javascript.typings.node.node.util');
const vscode = goog.require('vscode'); // from //third_party/javascript/typings/vscode
// from //third_party/javascript/typings/vscode
const execFileAsync = (0, util_1.promisify)(child_process_1.execFile);
/**
 * Checks whether a path exists asynchronously using fs/promises.
 * @param {string} filePath
 * @return {!Promise<boolean>}
 */
async function pathExists(filePath) {
    try {
        await fs_1.promises.access(filePath, fs_1.constants.F_OK);
        return true;
    }
    catch {
        return false;
    }
}
/**
 * Minimum required Antigravity backend API version.
 * @type {string}
 */
exports.MIN_AGY_VERSION = '1.1.3';
/**
 * Default base URL for downloading Antigravity release manifests and binaries (Production).
 * @type {string}
 */
exports.DEFAULT_RELEASE_BASE_URL = 'https://antigravity-cli-auto-updater-974169037036.us-central1.run.app';
/**
 * Default base URL for downloading Antigravity release manifests and binaries (Dogfood).
 * @type {string}
 */
exports.DOGFOOD_RELEASE_BASE_URL = 'https://storage.googleapis.com/antigravity-public/antigravity-cli';
/**
 * Returns the default release base URL based on the configured channel.
 * @return {string}
 */
function getDefaultReleaseBaseUrl() {
    /** @type {(undefined|string)} */
    const channel = vscode.workspace
        .getConfiguration('antigravity')
        .get('channel');
    if (channel === 'dogfood') {
        return exports.DOGFOOD_RELEASE_BASE_URL;
    }
    return exports.DEFAULT_RELEASE_BASE_URL;
}
exports.getDefaultReleaseBaseUrl = getDefaultReleaseBaseUrl;
/**
 * Information for a platform-specific binary inside a release manifest.
 * @record
 */
function PlatformBinaryInfo() { }
exports.PlatformBinaryInfo = PlatformBinaryInfo;
/* istanbul ignore if */
if (false) {
    /**
     * @const {string}
     * @public
     */
    PlatformBinaryInfo.prototype.url;
    /**
     * @const {(undefined|string)}
     * @public
     */
    PlatformBinaryInfo.prototype.sha256;
    /**
     * @const {(undefined|string)}
     * @public
     */
    PlatformBinaryInfo.prototype.sha512;
}
/** @typedef {!google3$cloud$developer_experience$antigravity_extensions$vscode$binary_downloader.ReleaseManifest} */
exports.ReleaseManifest;
/**
 * @param {*} val
 * @return {boolean}
 */
function isNonNullObject(val) {
    return typeof val === 'object' && val !== null;
}
/**
 * Type guard to verify whether an unknown object has the shape of a valid ReleaseManifest.
 * Requires a non-empty string version and at least one payload property (url, binaries, or platforms).
 * @param {*} obj
 * @return {boolean}
 */
function isValidReleaseManifestShape(obj) {
    if (!isNonNullObject(obj)) {
        return false;
    }
    if (typeof obj['version'] !== 'string' || !obj['version'].trim()) {
        return false;
    }
    /** @type {boolean} */
    const hasUrl = typeof obj['url'] === 'string';
    /** @type {boolean} */
    const hasBinaries = isNonNullObject(obj['binaries']);
    /** @type {boolean} */
    const hasPlatforms = isNonNullObject(obj['platforms']);
    return hasUrl || hasBinaries || hasPlatforms;
}
exports.isValidReleaseManifestShape = isValidReleaseManifestShape;
/**
 * Compares two semantic version strings (e.g., '0.0.1' vs '0.0.0').
 * Returns true if actualVersion is greater than or equal to minVersion.
 * @param {string} actualVersion
 * @param {string} minVersion
 * @return {boolean}
 */
function isVersionAtLeast(actualVersion, minVersion) {
    if (actualVersion.includes('dev') || actualVersion.includes('HEAD')) {
        return true;
    }
    try {
        /** @type {(null|!RegExpMatchArray)} */
        const match = actualVersion.match(/(\d+\.\d+\.\d+[^ \t\n\r]*)/);
        /** @type {string} */
        const parsedActual = match ? match[1] : actualVersion.trim();
        return (0, semver_1.gte)(parsedActual, minVersion);
    }
    catch (e) {
        return false;
    }
}
exports.isVersionAtLeast = isVersionAtLeast;
/**
 * Verifies whether the specified binary exists and reports a version >= minVersion.
 * @param {string} binaryPath
 * @param {string} minVersion
 * @param {(undefined|!tsickle_vscode_11.OutputChannel)=} outputChannel
 * @return {!Promise<(undefined|string)>}
 */
async function verifyBinaryVersion(binaryPath, minVersion, outputChannel) {
    if (!(await pathExists(binaryPath))) {
        outputChannel?.appendLine(`[INSTALL] Binary path does not exist: ${binaryPath}`);
        return undefined;
    }
    try {
        const { stdout, stderr } = await execFileAsync(binaryPath, ['--version'], {
            timeout: 5000,
        });
        /** @type {string} */
        const combinedOutput = `${stdout} ${stderr}`.trim();
        /** @type {boolean} */
        const result = isVersionAtLeast(combinedOutput, minVersion);
        if (!result) {
            outputChannel?.appendLine(`[INSTALL] Version check failed: actual='${combinedOutput}', expected>=${minVersion}`);
            return undefined;
        }
        return combinedOutput;
    }
    catch (error) {
        outputChannel?.appendLine(`[INSTALL] Failed to execute binary ${binaryPath}: ${error}`);
        return undefined;
    }
}
exports.verifyBinaryVersion = verifyBinaryVersion;
/**
 * Returns the version string reported by the binary, or undefined if unavailable.
 * @param {string} binaryPath
 * @return {!Promise<(undefined|string)>}
 */
async function getBinaryVersionString(binaryPath) {
    if (!(await pathExists(binaryPath))) {
        return undefined;
    }
    try {
        const { stdout, stderr } = await execFileAsync(binaryPath, ['--version'], {
            timeout: 3000,
        });
        /** @type {string} */
        const combinedOutput = `${stdout} ${stderr}`.trim();
        /** @type {(null|!RegExpMatchArray)} */
        const match = combinedOutput.match(/(\d+\.\d+\.\d+[^ \t\n\r]*)/);
        return match ? match[1] : combinedOutput;
    }
    catch (error) {
        return undefined;
    }
}
exports.getBinaryVersionString = getBinaryVersionString;
/**
 * Downloads a file from URL to destPath with HTTP/HTTPS redirect following and progress reporting.
 * @param {string} url
 * @param {string} destPath
 * @param {(undefined|function(number, (undefined|number)=): void)=} progressCallback
 * @return {!Promise<void>}
 */
async function downloadFile(url, destPath, progressCallback) {
    /** @type {!Response} */
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to download ${url}: HTTP status ${response.status}`);
    }
    /** @type {(null|string)} */
    const totalBytesStr = response.headers.get('content-length');
    /** @type {(undefined|number)} */
    let totalBytes;
    if (totalBytesStr) {
        /** @type {number} */
        const parsedBytes = Number(totalBytesStr);
        if (!isNaN(parsedBytes)) {
            totalBytes = parsedBytes;
        }
    }
    if (!response.body) {
        throw new Error('Response body is empty');
    }
    // Convert Web ReadableStream to Node.js Readable stream using safe cast
    const nodeReadable = stream_1.Readable.fromWeb((/** @type {?} */ ((/** @type {*} */ (response.body)))));
    const fileStream = (0, fs_1.createWriteStream)(destPath);
    // Async generator to intercept chunks and track progress in-flight
    /**
     * @return {!AsyncGenerator<?, void, *>}
     */
    async function* progressTracker() {
        /** @type {number} */
        let downloadedBytes = 0;
        for await (const chunk of nodeReadable) {
            /** @type {?} */
            let buffer;
            if (Buffer.isBuffer(chunk)) {
                buffer = chunk;
            }
            else if (chunk instanceof Uint8Array) {
                buffer = Buffer.from((/** @type {!Uint8Array} */ (chunk)).buffer, (/** @type {!Uint8Array} */ (chunk)).byteOffset, (/** @type {!Uint8Array} */ (chunk)).byteLength);
            }
            else if (typeof chunk === 'string') {
                buffer = Buffer.from(chunk);
            }
            else if (chunk instanceof ArrayBuffer) {
                buffer = Buffer.from(chunk);
            }
            else {
                throw new Error('Unsupported stream chunk type');
            }
            downloadedBytes += buffer.length;
            if (progressCallback) {
                progressCallback(downloadedBytes, totalBytes);
            }
            yield buffer;
        }
    }
    try {
        // pipeline handles clean closure, error propagation, and stream destruction
        await (0, promises_1.pipeline)(progressTracker(), fileStream);
    }
    catch (error) {
        // Clean up partially downloaded file on failure
        if (await pathExists(destPath)) {
            await fs_1.promises.unlink(destPath).catch((/**
             * @return {void}
             */
            () => { }));
        }
        throw error;
    }
}
exports.downloadFile = downloadFile;
/**
 * Resolves binary info for the current platform/architecture from a ReleaseManifest.
 * @param {!google3$cloud$developer_experience$antigravity_extensions$vscode$binary_downloader.ReleaseManifest} manifest
 * @param {string} platform
 * @param {string} arch
 * @return {(undefined|!PlatformBinaryInfo)}
 */
function resolvePlatformBinaryInfo(manifest, platform, arch) {
    if (manifest.url) {
        return {
            url: manifest.url,
            sha512: manifest.sha512,
            sha256: manifest.sha256,
        };
    }
    /** @type {string} */
    const platformArchKey = `${platform}-${arch}`;
    /** @type {(undefined|!PlatformBinaryInfo)} */
    const fromBinaries = manifest.binaries?.[platformArchKey];
    if (fromBinaries) {
        return fromBinaries;
    }
    // Fallback for public / test release manifests which use `platforms`, map `win32` -> `windows`,
    // and map `arm64`/`aarch64` -> `arm`.
    /** @type {string} */
    const normPlatform = platform === 'win32' ? 'windows' : platform;
    /** @type {string} */
    const normArch = arch === 'arm64' || arch === 'aarch64' ? 'arm' : arch;
    /** @type {string} */
    const normalizedKey = `${normPlatform}-${normArch}`;
    return (manifest.platforms?.[normalizedKey] ?? manifest.binaries?.[normalizedKey]);
}
exports.resolvePlatformBinaryInfo = resolvePlatformBinaryInfo;
/**
 * Fetches and parses a ReleaseManifest from the release server.
 * Supports both direct .json manifest URLs and base service URLs (/manifests/{goos}_{goarch}.json).
 * @param {string} releaseBaseUrl
 * @return {!Promise<!google3$cloud$developer_experience$antigravity_extensions$vscode$binary_downloader.ReleaseManifest>}
 */
async function fetchReleaseManifest(releaseBaseUrl) {
    /** @type {!Array<string>} */
    const errors = [];
    /** @type {function(string): !Promise<!google3$cloud$developer_experience$antigravity_extensions$vscode$binary_downloader.ReleaseManifest>} */
    const fetchManifestCandidate = (/**
     * @param {string} url
     * @return {!Promise<!google3$cloud$developer_experience$antigravity_extensions$vscode$binary_downloader.ReleaseManifest>}
     */
    async (url) => {
        /** @type {!Response} */
        const response = await fetch(url);
        if (response.status !== 200) {
            throw new Error(`HTTP status ${response.status}`);
        }
        /** @type {*} */
        const data = await response.json();
        if (isValidReleaseManifestShape(data)) {
            return data;
        }
        throw new Error(`Invalid manifest shape: ${JSON.stringify(data)}`);
    });
    /** @type {function(string): !Promise<(undefined|!google3$cloud$developer_experience$antigravity_extensions$vscode$binary_downloader.ReleaseManifest)>} */
    const tryFetch = (/**
     * @param {string} url
     * @return {!Promise<(undefined|!google3$cloud$developer_experience$antigravity_extensions$vscode$binary_downloader.ReleaseManifest)>}
     */
    async (url) => {
        try {
            return await fetchManifestCandidate(url);
        }
        catch (err) {
            /** @type {string} */
            const errMsg = err instanceof Error ? (/** @type {!Error} */ (err)).message : String(err);
            errors.push(`- ${url}: ${errMsg}`);
            return undefined;
        }
    });
    /** @type {boolean} */
    let isJsonManifest = false;
    try {
        isJsonManifest = new URL(releaseBaseUrl).pathname.endsWith('.json');
    }
    catch {
        isJsonManifest = releaseBaseUrl.endsWith('.json');
    }
    if (isJsonManifest) {
        /** @type {(undefined|!google3$cloud$developer_experience$antigravity_extensions$vscode$binary_downloader.ReleaseManifest)} */
        const directManifest = await tryFetch(releaseBaseUrl);
        if (directManifest) {
            return directManifest;
        }
        throw new Error(`Failed to fetch valid release manifest from direct JSON URL ${releaseBaseUrl}. Details:\n${errors.join('\n')}`);
    }
    /** @type {string} */
    const goos = process.platform === 'win32' ? 'windows' : process.platform;
    /** @type {string} */
    const goarch = process.arch === 'x64' ? 'amd64' : process.arch;
    /** @type {string} */
    const baseUrlNoSlash = releaseBaseUrl.replace(/\/+$/, '');
    /** @type {string} */
    const platformManifestUrl = `${baseUrlNoSlash}/manifests/${goos}_${goarch}.json`;
    // Candidate 1 (Default / Production Version): try /manifests/{goos}_{goarch}.json
    /** @type {(undefined|!google3$cloud$developer_experience$antigravity_extensions$vscode$binary_downloader.ReleaseManifest)} */
    const prodManifest = await tryFetch(platformManifestUrl);
    if (prodManifest) {
        return prodManifest;
    }
    // Candidate 2 (Fallback / Test Build): try /latest -> /<version>/manifest.json based on data shape
    try {
        /** @type {!Response} */
        const latestResponse = await fetch(`${baseUrlNoSlash}/latest`);
        if (latestResponse.status === 200) {
            /** @type {string} */
            const latestText = await latestResponse.text();
            /** @type {(null|!RegExpMatchArray)} */
            const versionMatch = latestText.match(/(\d+\.\d+\.\d+[^ \t\n\r]*)/);
            /** @type {string} */
            const version = versionMatch ? versionMatch[1] : latestText.trim();
            if (version) {
                /** @type {(undefined|!google3$cloud$developer_experience$antigravity_extensions$vscode$binary_downloader.ReleaseManifest)} */
                const testManifest = await tryFetch(`${baseUrlNoSlash}/${version}/manifest.json`);
                if (testManifest) {
                    return testManifest;
                }
            }
            else {
                errors.push(`- ${baseUrlNoSlash}/latest: No version found in response text: "${latestText.substring(0, 100)}"`);
            }
        }
        else {
            errors.push(`- ${baseUrlNoSlash}/latest: HTTP status ${latestResponse.status}`);
        }
    }
    catch (err) {
        /** @type {string} */
        const errMsg = err instanceof Error ? (/** @type {!Error} */ (err)).message : String(err);
        errors.push(`- ${baseUrlNoSlash}/latest: ${errMsg}`);
    }
    // Candidate 3 (Legacy Fallback): try /releases/latest/manifest.json
    /** @type {string} */
    const legacyUrl = `${baseUrlNoSlash}/releases/latest/manifest.json`;
    /** @type {(undefined|!google3$cloud$developer_experience$antigravity_extensions$vscode$binary_downloader.ReleaseManifest)} */
    const legacyManifest = await tryFetch(legacyUrl);
    if (legacyManifest) {
        return legacyManifest;
    }
    throw new Error(`Failed to fetch release manifest from all candidate endpoints for ${releaseBaseUrl}. Details:\n${errors.join('\n')}`);
}
exports.fetchReleaseManifest = fetchReleaseManifest;
/**
 * Computes the hexadecimal checksum of a file on disk using specified algorithm ('sha256' or 'sha512').
 * @param {string} filePath
 * @param {string=} algorithm
 * @return {!Promise<string>}
 */
async function computeFileChecksum(filePath, algorithm = 'sha512') {
    const hash = (0, crypto_1.createHash)(algorithm);
    const stream = (0, fs_1.createReadStream)(filePath);
    await (0, promises_1.pipeline)(stream, hash);
    return hash.digest('hex');
}
exports.computeFileChecksum = computeFileChecksum;
/**
 * Computes the hexadecimal SHA256 checksum of a file on disk.
 * @param {string} filePath
 * @return {!Promise<string>}
 */
async function computeFileSha256(filePath) {
    return computeFileChecksum(filePath, 'sha256');
}
exports.computeFileSha256 = computeFileSha256;
/**
 * Resolves the local persistent installed binary (`~/.gemini/bin/agy`) path.
 * @return {string}
 */
function getInstalledTargetPath() {
    /** @type {string} */
    const homeDir = (0, os_1.homedir)();
    /** @type {string} */
    const ext = process.platform === 'win32' ? '.exe' : '';
    return (0, path_1.join)(homeDir, '.gemini', 'bin', `agy${ext}`);
}
exports.getInstalledTargetPath = getInstalledTargetPath;
/**
 * @param {string} url
 * @param {string} destPath
 * @param {!tsickle_vscode_11.OutputChannel} outputChannel
 * @param {(undefined|!tsickle_vscode_11.Progress<{message: (undefined|string), increment: (undefined|number)}>)=} progress
 * @return {!Promise<void>}
 */
async function downloadWithProgress(url, destPath, outputChannel, progress) {
    /** @type {number} */
    let lastPercent = 0;
    await downloadFile(url, destPath, (/**
     * @param {number} downloaded
     * @param {(undefined|number)} total
     * @return {void}
     */
    (downloaded, total) => {
        if (total && total > 0) {
            /** @type {number} */
            const percent = Math.floor((downloaded / total) * 100);
            if (percent > lastPercent && percent % 10 === 0) {
                progress?.report({
                    message: `Downloading Antigravity Backend (${percent}%)...`,
                    increment: percent - lastPercent,
                });
                outputChannel.appendLine(`[INSTALL] Download progress: ${percent}% (${downloaded}/${total} bytes)`);
                lastPercent = percent;
            }
        }
    }));
}
/**
 * @param {string} filePath
 * @param {!PlatformBinaryInfo} binaryInfo
 * @param {!tsickle_vscode_11.OutputChannel} outputChannel
 * @param {(undefined|!tsickle_vscode_11.Progress<{message: (undefined|string), increment: (undefined|number)}>)=} progress
 * @return {!Promise<void>}
 */
async function verifyBinaryChecksum(filePath, binaryInfo, outputChannel, progress) {
    /** @type {(undefined|string)} */
    const expectedHash = binaryInfo.sha512 ?? binaryInfo.sha256;
    if (!expectedHash) {
        return;
    }
    /** @type {string} */
    const algorithm = binaryInfo.sha512 ? 'sha512' : 'sha256';
    progress?.report({
        message: `Verifying ${(/** @type {string} */ (algorithm)).toUpperCase()} checksum...`,
    });
    outputChannel.appendLine(`[INSTALL] Verifying ${(/** @type {string} */ (algorithm)).toUpperCase()} checksum...`);
    /** @type {string} */
    const actualHash = await computeFileChecksum(filePath, algorithm);
    if (actualHash.toLowerCase() !== expectedHash.toLowerCase()) {
        if (await pathExists(filePath)) {
            await fs_1.promises.unlink(filePath).catch((/**
             * @return {void}
             */
            () => { }));
        }
        /** @type {string} */
        const errorText = `${(/** @type {string} */ (algorithm)).toUpperCase()} checksum verification failed for downloaded binary. Expected: ${expectedHash}, Got: ${actualHash}`;
        outputChannel.appendLine(`[INSTALL ERROR] ${errorText}`);
        throw new Error(errorText);
    }
    outputChannel.appendLine(`[INSTALL] ${(/** @type {string} */ (algorithm)).toUpperCase()} checksum verified successfully.`);
}
/**
 * @record
 */
function UnpackOptions() { }
/* istanbul ignore if */
if (false) {
    /**
     * @const {string}
     * @public
     */
    UnpackOptions.prototype.stagingPath;
    /**
     * @const {string}
     * @public
     */
    UnpackOptions.prototype.installPath;
    /**
     * @const {boolean}
     * @public
     */
    UnpackOptions.prototype.isTarGz;
    /**
     * @const {!tsickle_vscode_11.OutputChannel}
     * @public
     */
    UnpackOptions.prototype.outputChannel;
    /**
     * @const {(undefined|!tsickle_vscode_11.Progress<{message: (undefined|string), increment: (undefined|number)}>)}
     * @public
     */
    UnpackOptions.prototype.progress;
}
/**
 * @param {!UnpackOptions} options
 * @return {!Promise<void>}
 */
async function unpackAndPromote(options) {
    const { stagingPath, installPath, isTarGz, outputChannel, progress } = options;
    /** @type {string} */
    const installDir = (0, path_1.dirname)(installPath);
    if (!isTarGz) {
        if (process.platform !== 'win32') {
            await fs_1.promises.chmod(stagingPath, 0o755);
        }
        await fs_1.promises.rename(stagingPath, installPath);
        return;
    }
    progress?.report({ message: 'Unpacking Antigravity Backend archive...' });
    outputChannel.appendLine(`[INSTALL] Unpacking tar.gz archive into ${installDir}...`);
    try {
        await execFileAsync('tar', ['-xzf', stagingPath, '-C', installDir]);
    }
    catch (error) {
        /** @type {string} */
        const errorText = `Failed to extract tar.gz archive ${stagingPath}: ${error}`;
        outputChannel.appendLine(`[INSTALL ERROR] ${errorText}`);
        throw new Error(errorText, { cause: error });
    }
    /** @type {boolean} */
    const isWin = process.platform === 'win32';
    /** @type {string} */
    const ext = isWin ? '.exe' : '';
    /** @type {!Array<string>} */
    const candidateNames = [
        `antigravity${ext}`,
        `agy${ext}`,
        `cli${ext}`,
        (0, path_1.join)('bin', `antigravity${ext}`),
        (0, path_1.join)('bin', `agy${ext}`),
        (0, path_1.join)('bin', `cli${ext}`),
    ];
    /** @type {boolean} */
    let foundAndPromoted = false;
    for (const candidate of candidateNames) {
        /** @type {string} */
        const extractedPath = (0, path_1.join)(installDir, candidate);
        if (await pathExists(extractedPath)) {
            if (process.platform !== 'win32') {
                await fs_1.promises.chmod(extractedPath, 0o755);
            }
            if (extractedPath !== installPath) {
                await fs_1.promises.rename(extractedPath, installPath);
            }
            foundAndPromoted = true;
            break;
        }
    }
    if (!foundAndPromoted && (await pathExists(stagingPath))) {
        await fs_1.promises.unlink(stagingPath).catch((/**
         * @return {void}
         */
        () => { }));
        /** @type {string} */
        const errorText = `Could not find executable in unpacked archive at ${installDir} (checked ${candidateNames.join(', ')})`;
        outputChannel.appendLine(`[INSTALL ERROR] ${errorText}`);
        throw new Error(errorText);
    }
    if (await pathExists(stagingPath)) {
        await fs_1.promises.unlink(stagingPath).catch((/**
         * @return {void}
         */
        () => { }));
    }
}
/**
 * Options for acquiring the Antigravity binary.
 * @record
 */
function AcquireBinaryOptions() { }
exports.AcquireBinaryOptions = AcquireBinaryOptions;
/* istanbul ignore if */
if (false) {
    /**
     * @const {!tsickle_vscode_11.ExtensionContext}
     * @public
     */
    AcquireBinaryOptions.prototype.context;
    /**
     * @const {!tsickle_vscode_11.OutputChannel}
     * @public
     */
    AcquireBinaryOptions.prototype.outputChannel;
    /**
     * @const {(undefined|!tsickle_vscode_11.Progress<{message: (undefined|string), increment: (undefined|number)}>)}
     * @public
     */
    AcquireBinaryOptions.prototype.progress;
    /**
     * @const {(undefined|!tsickle_vscode_11.WorkspaceConfiguration)}
     * @public
     */
    AcquireBinaryOptions.prototype.configOverride;
    /**
     * @const {(undefined|string)}
     * @public
     */
    AcquireBinaryOptions.prototype.targetPathOverride;
}
/**
 * Ensures the correct version of the Antigravity binary is installed and returns its path.
 * Downloads and installs the binary if it is missing or outdated.
 * @param {!AcquireBinaryOptions} options
 * @return {!Promise<string>}
 */
async function acquireInstalledBinaryPath(options) {
    const { context, outputChannel, progress, configOverride, targetPathOverride } = options;
    /** @type {string} */
    const installPath = targetPathOverride ?? getInstalledTargetPath();
    /** @type {?} */
    const extVersion = vscode.extensions.getExtension('google.antigravity')?.packageJSON
        ?.version ?? 'unknown';
    outputChannel.appendLine(`[INSTALL] Initializing update check. Platform: ${process.platform}-${process.arch}, Extension Version: ${extVersion}`);
    /** @type {!tsickle_vscode_11.WorkspaceConfiguration} */
    const config = configOverride ?? vscode.workspace.getConfiguration('antigravity');
    /** @type {(undefined|string)} */
    const userConfiguredUrl = config.get('releaseBaseUrl');
    if (userConfiguredUrl) {
        outputChannel.appendLine(`[INSTALL] Using custom releaseBaseUrl override: ${userConfiguredUrl} (Default: ${getDefaultReleaseBaseUrl()})`);
    }
    /** @type {(undefined|string)} */
    const userConfiguredChannel = config.get('channel');
    if (userConfiguredChannel) {
        outputChannel.appendLine(`[INSTALL] Using custom channel override: ${userConfiguredChannel}`);
    }
    /** @type {string} */
    let releaseBaseUrl = config.get('releaseBaseUrl') ?? getDefaultReleaseBaseUrl();
    if (!releaseBaseUrl ||
        releaseBaseUrl === 'https://storage.googleapis.com/antigravity-releases') {
        releaseBaseUrl = getDefaultReleaseBaseUrl();
    }
    outputChannel.appendLine(`[INSTALL] Checking for updates at releaseBaseUrl=${releaseBaseUrl}...`);
    /** @type {string} */
    let targetVersion = exports.MIN_AGY_VERSION;
    /** @type {boolean} */
    let manifestFetched = false;
    try {
        /** @type {!google3$cloud$developer_experience$antigravity_extensions$vscode$binary_downloader.ReleaseManifest} */
        const manifest = await fetchReleaseManifest(releaseBaseUrl);
        if (manifest && manifest.version) {
            targetVersion = manifest.version;
            manifestFetched = true;
        }
    }
    catch (err) {
        outputChannel.appendLine(`[INSTALL] Could not fetch release manifest: ${err}. Falling back to validation target version ${exports.MIN_AGY_VERSION}.`);
    }
    /** @type {(undefined|string)} */
    const lastInstalledUrl = context.globalState.get('antigravity.lastInstalledReleaseBaseUrl');
    /** @type {boolean} */
    const isChannelChanged = manifestFetched && lastInstalledUrl !== releaseBaseUrl;
    if (isChannelChanged) {
        outputChannel.appendLine(`[INSTALL] Release channel change detected (last installed URL: '${lastInstalledUrl}', target URL: '${releaseBaseUrl}'). Forcing backend binary re-download.`);
    }
    /** @type {(undefined|string)} */
    const installedVersion = isChannelChanged
        ? undefined
        : await verifyBinaryVersion(installPath, targetVersion, outputChannel);
    if (installedVersion) {
        outputChannel.appendLine(`[INSTALL] Installed binary is valid (actual version ${installedVersion} >= target ${targetVersion}). Skipping download.`);
        return installPath;
    }
    /** @type {function((undefined|!tsickle_vscode_11.Progress<{message: (undefined|string), increment: (undefined|number)}>)=): !Promise<string>} */
    const runInstall = (/**
     * @param {(undefined|!tsickle_vscode_11.Progress<{message: (undefined|string), increment: (undefined|number)}>)=} installProgress
     * @return {!Promise<string>}
     */
    async (installProgress) => {
        try {
            installProgress?.report({ message: 'Checking Antigravity releases...' });
            outputChannel.appendLine('[INSTALL] Checking Antigravity releases...');
            /** @type {!tsickle_vscode_11.WorkspaceConfiguration} */
            const config = configOverride ?? vscode.workspace.getConfiguration('antigravity');
            /** @type {string} */
            let releaseBaseUrl = config.get('releaseBaseUrl') ?? getDefaultReleaseBaseUrl();
            if (!releaseBaseUrl ||
                releaseBaseUrl === 'https://storage.googleapis.com/antigravity-releases') {
                releaseBaseUrl = getDefaultReleaseBaseUrl();
            }
            outputChannel.appendLine(`[INSTALL] Fetching manifest from releaseBaseUrl=${releaseBaseUrl}...`);
            /** @type {!google3$cloud$developer_experience$antigravity_extensions$vscode$binary_downloader.ReleaseManifest} */
            const manifest = await fetchReleaseManifest(releaseBaseUrl);
            /** @type {(undefined|!PlatformBinaryInfo)} */
            const binaryInfo = resolvePlatformBinaryInfo(manifest, process.platform, process.arch);
            if (!binaryInfo) {
                /** @type {string} */
                const errorText = `No compatible Antigravity binary found in release manifest for platform ${process.platform}-${process.arch}`;
                outputChannel.appendLine(`[INSTALL ERROR] ${errorText}`);
                throw new Error(errorText);
            }
            outputChannel.appendLine(`[INSTALL] Found release v${manifest.version} (${process.platform}-${process.arch}): ${binaryInfo.url}`);
            /** @type {string} */
            const installDir = (0, path_1.dirname)(installPath);
            await fs_1.promises.mkdir(installDir, { recursive: true });
            /** @type {string} */
            const urlPath = new URL(binaryInfo.url).pathname.toLowerCase();
            /** @type {boolean} */
            const isTarGz = urlPath.endsWith('.tar.gz') || urlPath.endsWith('.tgz');
            /** @type {string} */
            const stagingPath = (0, path_1.join)(installDir, `agy.tmp.${(0, crypto_1.randomUUID)()}${isTarGz ? '.tar.gz' : ''}`);
            installProgress?.report({
                message: `Downloading Antigravity Backend (${process.platform}-${process.arch})...`,
            });
            outputChannel.appendLine(`[INSTALL] Downloading Antigravity Backend to temporary path ${stagingPath}...`);
            await downloadWithProgress(binaryInfo.url, stagingPath, outputChannel, installProgress);
            await verifyBinaryChecksum(stagingPath, binaryInfo, outputChannel, installProgress);
            await unpackAndPromote({
                stagingPath,
                installPath,
                isTarGz,
                outputChannel,
                progress: installProgress,
            });
            outputChannel.appendLine(`[INSTALL] Antigravity Backend successfully installed to ${installPath}.`);
            await context.globalState.update('antigravity.lastInstalledReleaseBaseUrl', releaseBaseUrl);
            return installPath;
        }
        catch (error) {
            /** @type {string} */
            const errMsg = error instanceof Error ? (/** @type {!Error} */ (error)).message : String(error);
            outputChannel.appendLine(`[INSTALL ERROR] ${errMsg}`);
            throw error;
        }
    });
    if (progress) {
        return await runInstall(progress);
    }
    return await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: 'Installing Antigravity Backend...',
        cancellable: false,
    }, (/**
     * @param {!tsickle_vscode_11.Progress<{message: (undefined|string), increment: (undefined|number)}>} notificationProgress
     * @return {!Promise<string>}
     */
    async (notificationProgress) => {
        return await runInstall(notificationProgress);
    }));
}
exports.acquireInstalledBinaryPath = acquireInstalledBinaryPath;
