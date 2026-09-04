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
 * Error thrown when an HTTP request fails with a non-2xx status code.
 * Preserves the HTTP status code for structured error inspection and retry filtering.
 * Uses Object.setPrototypeOf and a static type-guard to ensure reliable instanceof checks
 * across compilation targets and bundling environments.
 * @extends {Error}
 */
class HttpError extends Error {
    /**
     * @public
     * @param {number} status
     * @param {(undefined|string)=} message
     */
    constructor(status, message) {
        super(message ?? `HTTP status ${status}`);
        this.status = status;
        this.isHttpError = true;
        this.name = 'HttpError';
        Object.setPrototypeOf(this, HttpError.prototype);
    }
    /**
     * Checks whether an unknown error is an instance of HttpError.
     * @public
     * @param {*} error
     * @return {boolean}
     */
    static isHttpError(error) {
        return (error instanceof HttpError ||
            (typeof error === 'object' &&
                error !== null &&
                'isHttpError' in error &&
                ((/** @type {{isHttpError: (undefined|boolean)}} */ (error))).isHttpError === true));
    }
}
exports.HttpError = HttpError;
/* istanbul ignore if */
if (false) {
    /**
     * @const {boolean}
     * @public
     */
    HttpError.prototype.isHttpError;
    /**
     * @const {number}
     * @public
     */
    HttpError.prototype.status;
}
/**
 * Options to configure exponential backoff retry behavior for network operations.
 * @record
 */
function RetryOptions() { }
exports.RetryOptions = RetryOptions;
/* istanbul ignore if */
if (false) {
    /**
     * Maximum number of execution attempts before throwing the last error. Default: 3
     * @const {(undefined|number)}
     * @public
     */
    RetryOptions.prototype.maxAttempts;
    /**
     * Initial delay in milliseconds before the first retry attempt. Default: 500ms
     * @const {(undefined|number)}
     * @public
     */
    RetryOptions.prototype.initialDelayMs;
    /**
     * Exponential multiplier applied to the delay after each retry attempt. Default: 2
     * @const {(undefined|number)}
     * @public
     */
    RetryOptions.prototype.backoffFactor;
    /**
     * Upper bound cap for the delay duration between retry attempts. Default: 3000ms
     * @const {(undefined|number)}
     * @public
     */
    RetryOptions.prototype.maxDelayMs;
}
/**
 * Default retry settings for network operations (3 attempts with 500ms initial delay).
 * @type {?}
 */
exports.DEFAULT_RETRY_OPTIONS = {
    maxAttempts: 3,
    initialDelayMs: 500,
    backoffFactor: 2,
    maxDelayMs: 3000,
};
/**
 * Executes an asynchronous operation with exponential backoff retry logic.
 *
 * @template T
 * @param {function(number): !Promise<T>} operation The async function to execute, receiving the 1-based attempt index.
 * @param {(undefined|!RetryOptions)=} options Configuration for attempts, initial delay, backoff multiplier, and delay cap.
 * @param {(undefined|function(*, number, number): void)=} onRetry Optional callback invoked whenever an attempt fails and a retry will follow.
 * @param {function(*): boolean=} shouldRetry Optional predicate to determine if a caught error is retryable.
 *                    If this returns false, retries abort immediately and the error is thrown.
 * @return {!Promise<T>} The resolved value of the operation upon success.
 */
async function withRetry(operation, options, onRetry, shouldRetry = (/**
 * @return {boolean}
 */
() => true)) {
    /** @type {number} */
    const maxAttempts = options?.maxAttempts ?? exports.DEFAULT_RETRY_OPTIONS.maxAttempts;
    /** @type {number} */
    const initialDelay = options?.initialDelayMs ?? exports.DEFAULT_RETRY_OPTIONS.initialDelayMs;
    /** @type {number} */
    const factor = options?.backoffFactor ?? exports.DEFAULT_RETRY_OPTIONS.backoffFactor;
    /** @type {number} */
    const maxDelay = options?.maxDelayMs ?? exports.DEFAULT_RETRY_OPTIONS.maxDelayMs;
    /** @type {number} */
    let currentDelay = initialDelay;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await operation(attempt);
        }
        catch (error) {
            if (attempt >= maxAttempts || !shouldRetry(error)) {
                throw error;
            }
            if (onRetry) {
                onRetry(error, attempt, currentDelay);
            }
            await new Promise((/**
             * @param {function((void|!PromiseLike<void>)): void} resolve
             * @return {void}
             */
            (resolve) => {
                setTimeout(resolve, currentDelay);
            }));
            currentDelay = Math.min(currentDelay * factor, maxDelay);
        }
    }
    throw new Error('Unreachable retry loop termination');
}
exports.withRetry = withRetry;
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
        // Normalize date-based versions (e.g., 2026.08.24 or 1970.01.01) by stripping
        // leading zeros from dot-separated numeric segments to satisfy SemVer 2.0.0.
        /** @type {string} */
        const normalizedActual = parsedActual.replace(/\.0+(\d+)/g, '.$1');
        /** @type {string} */
        const normalizedMin = minVersion.trim().replace(/\.0+(\d+)/g, '.$1');
        return (0, semver_1.gte)(normalizedActual, normalizedMin);
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
 * Downloads a file from URL to destPath with HTTP/HTTPS redirect following, progress reporting, and retry logic.
 *
 * Retry policy:
 * - Automatically cleans up any partially downloaded file before starting each attempt.
 * - Retries transient connection drops, stream timeouts, and 5xx server errors with exponential backoff.
 * - Immediately aborts on non-retryable 4xx client errors (e.g. 400 Bad Request, 401/403 Auth, 404 Not Found)
 *   since repeating identical requests will not resolve client-side errors.
 * @param {string} url
 * @param {string} destPath
 * @param {(undefined|function(number, (undefined|number)=): void)=} progressCallback
 * @param {(undefined|!RetryOptions)=} retryOptions
 * @param {(undefined|function(*, number, number): void)=} onRetry
 * @return {!Promise<void>}
 */
async function downloadFile(url, destPath, progressCallback, retryOptions, onRetry) {
    /** @type {function(): !Promise<void>} */
    const singleAttempt = (/**
     * @return {!Promise<void>}
     */
    async () => {
        if (await pathExists(destPath)) {
            await fs_1.promises.unlink(destPath).catch((/**
             * @return {void}
             */
            () => { }));
        }
        /** @type {!Response} */
        const response = await fetch(url);
        if (!response.ok) {
            throw new HttpError(response.status, `Failed to download ${url}: HTTP status ${response.status}`);
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
    });
    await withRetry((/**
     * @return {!Promise<void>}
     */
    () => singleAttempt()), retryOptions, onRetry, (/**
     * @param {*} err
     * @return {boolean}
     */
    (err) => {
        // Non-retryable HTTP client errors (e.g. 400 Bad Request, 401/403 Auth, 404 Not Found)
        if (HttpError.isHttpError(err) && (/** @type {!HttpError} */ (err)).status >= 400 && (/** @type {!HttpError} */ (err)).status < 500) {
            return false;
        }
        return true;
    }));
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
 *
 * Candidate probing and retry strategy:
 * - Probes candidate endpoint formats sequentially:
 *     1. Production manifest: /manifests/{goos}_{goarch}.json
 *     2. Test / Custom build manifest: /latest -> /{version}/manifest.json
 *     3. Legacy manifest: /releases/latest/manifest.json
 * - 404 Not Found errors are deliberately NOT retried during candidate probing to avoid delaying
 *   fallback to subsequent candidate endpoints.
 * - Transient errors (e.g. 5xx server errors, connection resets, network drops) ARE retried with
 *   exponential backoff before abandoning each candidate endpoint.
 * @param {string} releaseBaseUrl
 * @param {(undefined|!RetryOptions)=} retryOptions
 * @param {(undefined|!tsickle_vscode_11.OutputChannel)=} outputChannel
 * @return {!Promise<!google3$cloud$developer_experience$antigravity_extensions$vscode$binary_downloader.ReleaseManifest>}
 */
async function fetchReleaseManifest(releaseBaseUrl, retryOptions, outputChannel) {
    /** @type {!Array<string>} */
    const errors = [];
    /** @type {function(string): !Promise<!google3$cloud$developer_experience$antigravity_extensions$vscode$binary_downloader.ReleaseManifest>} */
    const fetchManifestCandidate = (/**
     * @param {string} url
     * @return {!Promise<!google3$cloud$developer_experience$antigravity_extensions$vscode$binary_downloader.ReleaseManifest>}
     */
    async (url) => {
        return await withRetry((/**
         * @return {!Promise<!google3$cloud$developer_experience$antigravity_extensions$vscode$binary_downloader.ReleaseManifest>}
         */
        async () => {
            /** @type {!Response} */
            const response = await fetch(url);
            if (response.status !== 200) {
                throw new HttpError(response.status);
            }
            /** @type {*} */
            const data = await response.json();
            if (isValidReleaseManifestShape(data)) {
                return data;
            }
            throw new Error(`Invalid manifest shape: ${JSON.stringify(data)}`);
        }), retryOptions, (/**
         * @param {*} err
         * @param {number} attempt
         * @param {number} delayMs
         * @return {void}
         */
        (err, attempt, delayMs) => {
            /** @type {string} */
            const errMsg = err instanceof Error ? (/** @type {!Error} */ (err)).message : String(err);
            outputChannel?.appendLine(`[INSTALL] Manifest fetch attempt ${attempt} from ${url} failed: ${errMsg}. Retrying in ${delayMs}ms...`);
        }), (/**
         * @param {*} err
         * @return {boolean}
         */
        (err) => {
            // Do not retry 404 since it's normal during candidate endpoint probing
            if (HttpError.isHttpError(err) && (/** @type {!HttpError} */ (err)).status === 404) {
                return false;
            }
            return true;
        }));
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
        const latestResponse = await withRetry((/**
         * @return {!Promise<!Response>}
         */
        async () => {
            /** @type {!Response} */
            const res = await fetch(`${baseUrlNoSlash}/latest`);
            if (res.status !== 200) {
                throw new HttpError(res.status);
            }
            return res;
        }), retryOptions, undefined, (
        // Do not retry 404 on /latest check to allow fallback to Candidate 3
        /**
         * @param {*} err
         * @return {boolean}
         */
        (err) => !(HttpError.isHttpError(err) && (/** @type {!HttpError} */ (err)).status === 404)));
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
 * @param {(undefined|!RetryOptions)=} retryOptions
 * @return {!Promise<void>}
 */
async function downloadWithProgress(url, destPath, outputChannel, progress, retryOptions) {
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
    }), retryOptions, (/**
     * @param {*} error
     * @param {number} attempt
     * @param {number} delayMs
     * @return {void}
     */
    (error, attempt, delayMs) => {
        /** @type {string} */
        const errMsg = error instanceof Error ? (/** @type {!Error} */ (error)).message : String(error);
        outputChannel.appendLine(`[INSTALL] Download attempt ${attempt} failed: ${errMsg}. Retrying in ${delayMs}ms...`);
        progress?.report({
            message: `Download attempt ${attempt} failed, retrying in ${delayMs}ms...`,
        });
        lastPercent = 0;
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
    /**
     * @const {(undefined|!RetryOptions)}
     * @public
     */
    AcquireBinaryOptions.prototype.retryOptions;
}
/**
 * Ensures the correct version of the Antigravity binary is installed and returns its path.
 * Downloads and installs the binary if it is missing or outdated.
 * @param {!AcquireBinaryOptions} options
 * @return {!Promise<string>}
 */
async function acquireInstalledBinaryPath(options) {
    const { context, outputChannel, progress, configOverride, targetPathOverride, retryOptions, } = options;
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
        const manifest = await fetchReleaseManifest(releaseBaseUrl, retryOptions, outputChannel);
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
            const manifest = await fetchReleaseManifest(releaseBaseUrl, retryOptions, outputChannel);
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
            // Download the platform binary and verify its cryptographic hash.
            // Both download and checksum verification are wrapped in withRetry: if a network dropout or corruption
            // causes a checksum mismatch, the invalid staging file is unlinked and the download is cleanly retried.
            await withRetry((/**
             * @param {number} attempt
             * @return {!Promise<void>}
             */
            async (attempt) => {
                if (attempt > 1) {
                    outputChannel.appendLine(`[INSTALL] Retrying backend binary download and verification (attempt ${attempt})...`);
                }
                await downloadWithProgress(binaryInfo.url, stagingPath, outputChannel, installProgress, { ...retryOptions, maxAttempts: 1 });
                await verifyBinaryChecksum(stagingPath, binaryInfo, outputChannel, installProgress);
            }), retryOptions, (/**
             * @param {*} error
             * @param {number} attempt
             * @param {number} delayMs
             * @return {void}
             */
            (error, attempt, delayMs) => {
                /** @type {string} */
                const errMsg = error instanceof Error ? (/** @type {!Error} */ (error)).message : String(error);
                outputChannel.appendLine(`[INSTALL] Binary acquisition attempt ${attempt} failed: ${errMsg}. Retrying in ${delayMs}ms...`);
            }));
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
