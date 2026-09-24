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
exports.MIN_AGY_VERSION = '1.1.11';
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
 * @param {string} rawUrl
 * @param {(undefined|!tsickle_vscode_11.OutputChannel)=} outputChannel
 * @param {string=} sourceDescription
 * @return {string}
 */
function validateAndNormalizeReleaseBaseUrl(rawUrl, outputChannel, sourceDescription = 'configuration') {
    // Strip leading/trailing whitespace and any trailing slashes first so comparisons
    // and parsing operate on a canonical base URL.
    /** @type {string} */
    const normalizedUrl = rawUrl.trim().replace(/\/+$/, '');
    // Redirect legacy release bucket endpoint to the current default URL,
    // matching both with and without trailing slashes.
    if (normalizedUrl === 'https://storage.googleapis.com/antigravity-releases') {
        return getDefaultReleaseBaseUrl();
    }
    try {
        /** @type {!URL} */
        const parsed = new URL(normalizedUrl);
        // Enforce TLS (https:) for all remote network endpoints to prevent MITM tampering.
        // Plain http: is strictly permitted only for loopback development (localhost, 127.0.0.1).
        // All other protocols (e.g. ftp:, ws:) are rejected regardless of hostname.
        /** @type {boolean} */
        const isHttps = parsed.protocol === 'https:';
        /** @type {boolean} */
        const isLocalHttp = parsed.protocol === 'http:' &&
            (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1');
        if (!isHttps && !isLocalHttp) {
            outputChannel?.appendLine(`[INSTALL WARNING] Insecure protocol '${parsed.protocol}' in ${sourceDescription} '${rawUrl}' is rejected. Falling back to default URL.`);
            return getDefaultReleaseBaseUrl();
        }
        return normalizedUrl;
    }
    catch (error) {
        outputChannel?.appendLine(`[INSTALL WARNING] Invalid URL in ${sourceDescription} '${rawUrl}': ${error}. Falling back to default URL.`);
        return getDefaultReleaseBaseUrl();
    }
}
/**
 * Resolves and validates the release base URL for Antigravity binary downloads.
 *
 * Precedence and Validation:
 * 1. AGY_RELEASE_BASE_URL environment variable (highest precedence).
 * 2. antigravity.releaseBaseUrl configuration setting (user or workspace).
 * 3. Default fallback URL.
 *
 * Security controls and their limits:
 * - Untrusted workspace protection: Handled at the VS Code extension host level;
 *   Antigravity does not support untrusted workspaces and is not loaded in untrusted mode.
 *   Workspace trust is therefore the control that governs which origin is trusted here.
 * - Protocol enforcement: The URL must use HTTPS (or loopback http://localhost / http://127.0.0.1
 *   for development). This prevents an HTTP downgrade but does NOT restrict which HTTPS host may
 *   be used; there is deliberately no origin allowlist at this time.
 * - Checksum verification: Downloaded binaries must pass a mandatory SHA-512 (or SHA-256) check.
 *   Note that the expected digest is read from the same manifest as the binary URL, so this
 *   protects against transport corruption and tampering in transit, not against a hostile origin.
 * - Signature verification: NOT enforced. `verifyBinarySignature` exists as an unwired primitive;
 *   see its documentation for what must be true before it can be enabled.
 * @param {(undefined|!tsickle_vscode_11.WorkspaceConfiguration)=} config
 * @param {(undefined|!tsickle_vscode_11.OutputChannel)=} outputChannel
 * @return {string}
 */
function resolveReleaseBaseUrl(config, outputChannel) {
    /** @type {(undefined|string)} */
    const envUrl = process.env['AGY_RELEASE_BASE_URL'];
    if (envUrl && envUrl.trim()) {
        return validateAndNormalizeReleaseBaseUrl(envUrl.trim(), outputChannel, 'environment variable AGY_RELEASE_BASE_URL');
    }
    /** @type {!tsickle_vscode_11.WorkspaceConfiguration} */
    const activeConfig = config ?? vscode.workspace.getConfiguration('antigravity');
    /** @type {(undefined|string)} */
    const configured = activeConfig.get('releaseBaseUrl');
    if (configured && configured.trim()) {
        return validateAndNormalizeReleaseBaseUrl(configured.trim(), outputChannel, 'configuration');
    }
    return getDefaultReleaseBaseUrl();
}
exports.resolveReleaseBaseUrl = resolveReleaseBaseUrl;
/**
 * Parses a Retry-After HTTP header value (delta-seconds or HTTP-date string) into milliseconds.
 * Returns undefined if the header is absent, empty, or unparseable.
 * @param {(undefined|null|string)} headerValue
 * @return {(undefined|number)}
 */
function parseRetryAfterMs(headerValue) {
    if (!headerValue) {
        return undefined;
    }
    /** @type {string} */
    const trimmed = headerValue.trim();
    /** @type {number} */
    const seconds = Number(trimmed);
    if (!isNaN(seconds) && seconds >= 0) {
        return seconds * 1000;
    }
    /** @type {number} */
    const dateMs = Date.parse(trimmed);
    if (!isNaN(dateMs)) {
        /** @type {number} */
        const diffMs = dateMs - Date.now();
        return diffMs > 0 ? diffMs : 0;
    }
    return undefined;
}
exports.parseRetryAfterMs = parseRetryAfterMs;
/**
 * Error thrown when an HTTP request fails with a non-2xx status code.
 * Preserves the HTTP status code and optional Retry-After duration for structured error inspection.
 * Uses Object.setPrototypeOf and a static type-guard to ensure reliable instanceof checks
 * across compilation targets and bundling environments.
 * @extends {Error}
 */
class HttpError extends Error {
    /**
     * @public
     * @param {number} status
     * @param {(undefined|string)=} message
     * @param {(undefined|number)=} retryAfterMs
     */
    constructor(status, message, retryAfterMs) {
        super(message ?? `HTTP status ${status}`);
        this.status = status;
        this.retryAfterMs = retryAfterMs;
        this.isHttpError = true;
        this.name = 'HttpError';
        Object.setPrototypeOf(this, HttpError.prototype);
    }
    /**
     * Creates an HttpError from a fetch Response, extracting status and optional Retry-After header.
     * @public
     * @param {{status: number, headers: (undefined|{get: function(string): (null|string)})}} response
     * @param {(undefined|string)=} message
     * @return {!HttpError}
     */
    static fromResponse(response, message) {
        /** @type {(undefined|null|string)} */
        const retryAfterHeader = response.headers?.get('retry-after');
        /** @type {(undefined|number)} */
        const retryAfterMs = parseRetryAfterMs(retryAfterHeader);
        return new HttpError(response.status, message ?? `HTTP status ${response.status}`, retryAfterMs);
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
    /**
     * @const {(undefined|number)}
     * @public
     */
    HttpError.prototype.retryAfterMs;
}
/**
 * Determines whether an error is a non-retryable HTTP client error.
 * HTTP 4xx errors are permanent client errors and should not be retried,
 * except for HTTP 429 (Too Many Requests), which indicates transient rate limiting.
 * @param {*} error
 * @return {boolean}
 */
function isNonRetryableHttpError(error) {
    return (HttpError.isHttpError(error) &&
        (/** @type {!HttpError} */ (error)).status >= 400 &&
        (/** @type {!HttpError} */ (error)).status < 500 &&
        (/** @type {!HttpError} */ (error)).status !== 429);
}
exports.isNonRetryableHttpError = isNonRetryableHttpError;
/**
 * Standard retry predicate for network operations: retries all errors except
 * non-retryable HTTP client errors (4xx other than 429).
 * @param {*} error
 * @return {boolean}
 */
function isRetryableError(error) {
    return !isNonRetryableHttpError(error);
}
exports.isRetryableError = isRetryableError;
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
    /**
     * Timeout in milliseconds for each network attempt. Default: 120000ms (2 minutes)
     * @const {(undefined|number)}
     * @public
     */
    RetryOptions.prototype.timeoutMs;
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
    timeoutMs: 120000,
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
async function withRetry(operation, options, onRetry, shouldRetry = isRetryableError) {
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
            // If error specifies a Retry-After duration (e.g. HTTP 429 response),
            // respect that duration up to maxDelayMs.
            /** @type {number} */
            const delay = HttpError.isHttpError(error) && (/** @type {!HttpError} */ (error)).retryAfterMs !== undefined
                ? Math.min(Math.max((/** @type {!HttpError} */ (error)).retryAfterMs, 0), maxDelay)
                : currentDelay;
            if (onRetry) {
                onRetry(error, attempt, delay);
            }
            await new Promise((/**
             * @param {function((void|!PromiseLike<void>)): void} resolve
             * @return {void}
             */
            (resolve) => {
                setTimeout(resolve, delay);
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
 * In-memory cache mapping a binary's filesystem identity to its resolved
 * version string. This exists to avoid redundant `agy --version` child
 * process spawns.
 *
 * The key is derived from a single `stat()` (path, size, mtime, ctime, inode)
 * rather than from the file's contents. Content hashing was the original
 * approach and was a serious performance bug: the agy binary is ~200 MiB, so
 * every lookup streamed and hashed the entire file. That costs roughly a
 * second on a warm page cache and considerably more on Windows, where most of
 * our startup latency lives. Because the version is resolved twice per
 * startup, a cache introduced to save a ~50ms subprocess spawn was instead
 * spending seconds. See b/561981286.
 *
 * A stat tuple is a weaker identity than a content hash: it cannot detect an
 * edit that preserves size, mtime, ctime and inode simultaneously. That is an
 * acceptable trade here. The binary is only ever replaced by this module's
 * atomic write-to-temp-then-rename, which necessarily produces a new inode and
 * mtime. Integrity of a freshly downloaded binary is a separate concern and
 * remains enforced by `verifyChecksum` against the signed release manifest,
 * which is the one place a real hash is warranted.
 * @type {!Map<string, string>}
 */
const binaryVersionCache = new Map();
/**
 * Builds a cheap cache key identifying the file currently at `binaryPath`.
 *
 * `ino` is 0 on Windows, so the key degrades to (path, size, mtime, ctime)
 * there. That remains sufficient to detect the downloader's replace-on-update.
 * @param {string} binaryPath
 * @return {!Promise<string>}
 */
async function getBinaryIdentityKey(binaryPath) {
    const stats = await fs_1.promises.stat(binaryPath);
    return [binaryPath, stats.size, stats.mtimeMs, stats.ctimeMs, stats.ino].join(':');
}
/**
 * Clears the in-memory binary version cache (primarily used in tests).
 * @return {void}
 */
function clearBinaryVersionCache() {
    binaryVersionCache.clear();
}
exports.clearBinaryVersionCache = clearBinaryVersionCache;
/**
 * Returns the version string reported by the binary, or undefined if
 * unavailable. Reuses the in-memory version cached against the binary's
 * filesystem identity.
 * @param {string} binaryPath
 * @param {(undefined|!tsickle_vscode_11.OutputChannel)=} outputChannel
 * @return {!Promise<(undefined|string)>}
 */
async function getBinaryVersionString(binaryPath, outputChannel) {
    if (!(await pathExists(binaryPath))) {
        outputChannel?.appendLine(`[INSTALL] Binary path does not exist: ${binaryPath}`);
        return undefined;
    }
    /** @type {string} */
    let identityKey;
    try {
        identityKey = await getBinaryIdentityKey(binaryPath);
    }
    catch (error) {
        outputChannel?.appendLine(`[INSTALL] Failed to stat binary ${binaryPath}: ${error}`);
        return undefined;
    }
    /** @type {(undefined|string)} */
    const cachedVersion = binaryVersionCache.get(identityKey);
    if (cachedVersion !== undefined) {
        return cachedVersion;
    }
    try {
        const { stdout, stderr } = await execFileAsync(binaryPath, ['--version'], {
            timeout: 5000,
        });
        /** @type {string} */
        const combinedOutput = `${stdout} ${stderr}`.trim();
        /** @type {(null|!RegExpMatchArray)} */
        const match = combinedOutput.match(/(\d+\.\d+\.\d+[^ \t\n\r]*)/);
        /** @type {string} */
        const resolvedVersion = match ? match[1] : combinedOutput;
        binaryVersionCache.set(identityKey, resolvedVersion);
        return resolvedVersion;
    }
    catch (error) {
        outputChannel?.appendLine(`[INSTALL] Failed to execute binary ${binaryPath}: ${error}`);
        return undefined;
    }
}
exports.getBinaryVersionString = getBinaryVersionString;
/**
 * Verifies whether the specified binary exists and reports a version >=
 * minVersion. Reuses getBinaryVersionString (and its stat-keyed in-memory
 * cache) to avoid redundant subprocess spawns.
 * @param {string} binaryPath
 * @param {string} minVersion
 * @param {(undefined|!tsickle_vscode_11.OutputChannel)=} outputChannel
 * @return {!Promise<(undefined|string)>}
 */
async function verifyBinaryVersion(binaryPath, minVersion, outputChannel) {
    /** @type {(undefined|string)} */
    const version = await getBinaryVersionString(binaryPath, outputChannel);
    if (!version) {
        return undefined;
    }
    /** @type {boolean} */
    const result = isVersionAtLeast(version, minVersion);
    if (!result) {
        outputChannel?.appendLine(`[INSTALL] Version check failed: actual='${version}', expected>=${minVersion}`);
        return undefined;
    }
    return version;
}
exports.verifyBinaryVersion = verifyBinaryVersion;
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
    /** @type {number} */
    const timeoutMs = retryOptions?.timeoutMs ?? exports.DEFAULT_RETRY_OPTIONS.timeoutMs;
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
        const response = await fetch(url, {
            signal: AbortSignal.timeout(timeoutMs),
        });
        if (!response.ok) {
            throw HttpError.fromResponse(response, `Failed to download ${url}: HTTP status ${response.status}`);
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
    () => singleAttempt()), retryOptions, onRetry, isRetryableError);
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
 * Fetches and parses a ReleaseManifest JSON directly from a URL with retry logic.
 * @param {string} url
 * @param {?} retryOptions
 * @param {(undefined|!tsickle_vscode_11.OutputChannel)=} outputChannel
 * @return {!Promise<!google3$cloud$developer_experience$antigravity_extensions$vscode$binary_downloader.ReleaseManifest>}
 */
async function fetchManifestFromUrl(url, retryOptions, outputChannel) {
    return await withRetry((/**
     * @return {!Promise<!google3$cloud$developer_experience$antigravity_extensions$vscode$binary_downloader.ReleaseManifest>}
     */
    async () => {
        /** @type {!Response} */
        const response = await fetch(url, {
            signal: AbortSignal.timeout(retryOptions.timeoutMs),
        });
        if (response.status !== 200) {
            throw HttpError.fromResponse(response);
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
    }), isRetryableError);
}
exports.fetchManifestFromUrl = fetchManifestFromUrl;
/**
 * Probes the /latest text endpoint to discover a version string, then fetches
 * the corresponding /{version}/manifest.json manifest.
 * @param {string} baseUrlNoSlash
 * @param {?} retryOptions
 * @param {(undefined|!tsickle_vscode_11.OutputChannel)=} outputChannel
 * @return {!Promise<{manifest: (undefined|!google3$cloud$developer_experience$antigravity_extensions$vscode$binary_downloader.ReleaseManifest), errorSnippet: (undefined|string)}>}
 */
async function fetchVersionedManifestCandidate(baseUrlNoSlash, retryOptions, outputChannel) {
    /** @type {!Response} */
    const latestResponse = await withRetry((/**
     * @return {!Promise<!Response>}
     */
    async () => {
        /** @type {!Response} */
        const res = await fetch(`${baseUrlNoSlash}/latest`, {
            signal: AbortSignal.timeout(retryOptions.timeoutMs),
        });
        if (res.status !== 200) {
            throw HttpError.fromResponse(res);
        }
        return res;
    }), retryOptions, undefined, isRetryableError);
    /** @type {string} */
    const latestText = await latestResponse.text();
    /** @type {(null|!RegExpMatchArray)} */
    const versionMatch = latestText.match(/(\d+\.\d+\.\d+[^ \t\n\r]*)/);
    /** @type {string} */
    const version = versionMatch ? versionMatch[1] : latestText.trim();
    if (!version) {
        return {
            errorSnippet: `No version found in response text: "${latestText.substring(0, 100)}"`,
        };
    }
    /** @type {!google3$cloud$developer_experience$antigravity_extensions$vscode$binary_downloader.ReleaseManifest} */
    const manifest = await fetchManifestFromUrl(`${baseUrlNoSlash}/${version}/manifest.json`, retryOptions, outputChannel);
    return { manifest };
}
/**
 * Fetches and parses a ReleaseManifest from the release server.
 * Supports both direct .json manifest URLs and base service URLs (/manifests/{goos}_{goarch}.json).
 *
 * Candidate probing and retry strategy:
 * - Probes candidate endpoint formats sequentially for URL schema discovery:
 *     1. Production manifest: /manifests/{goos}_{goarch}.json
 *     2. Test / Custom build manifest: /latest -> /{version}/manifest.json
 *     3. Legacy manifest: /releases/latest/manifest.json
 * - 404 Not Found: Deliberately NOT retried during candidate probing to allow immediate
 *   fallback to subsequent candidate endpoint formats across server version differences.
 * - Non-HTTP errors vs HTTP status codes: Candidate probing exists solely for URL structure discovery.
 *   If a candidate probe encounters a non-HTTP error (socket timeout, connection drop, DNS lookup failure),
 *   the transport layer or host is unreachable. In that scenario, candidate probing aborts immediately without
 *   attempting subsequent candidates on the same unreachable host, preventing the ~94.5s freeze (b/559283462).
 * - Candidate timeout: Bounded to 1 attempt and a 5-second socket timeout per candidate by default.
 * @param {string} releaseBaseUrl
 * @param {(undefined|!RetryOptions)=} retryOptions
 * @param {(undefined|!tsickle_vscode_11.OutputChannel)=} outputChannel
 * @return {!Promise<!google3$cloud$developer_experience$antigravity_extensions$vscode$binary_downloader.ReleaseManifest>}
 */
async function fetchReleaseManifest(releaseBaseUrl, retryOptions, outputChannel) {
    /** @type {!Array<string>} */
    const errors = [];
    // Default candidate probing to 1 attempt and a 5000ms timeout per candidate,
    // unless explicitly configured by caller.
    /** @type {?} */
    const candidateRetryOptions = {
        maxAttempts: retryOptions?.maxAttempts ?? 1,
        initialDelayMs: retryOptions?.initialDelayMs ?? 500,
        backoffFactor: retryOptions?.backoffFactor ?? 2,
        maxDelayMs: retryOptions?.maxDelayMs ?? 3000,
        timeoutMs: retryOptions?.timeoutMs ?? 5000,
    };
    /** @type {boolean} */
    let isJsonManifest = false;
    try {
        isJsonManifest = new URL(releaseBaseUrl).pathname.endsWith('.json');
    }
    catch {
        isJsonManifest = releaseBaseUrl.endsWith('.json');
    }
    if (isJsonManifest) {
        try {
            return await fetchManifestFromUrl(releaseBaseUrl, candidateRetryOptions, outputChannel);
        }
        catch (err) {
            /** @type {string} */
            const errMsg = err instanceof Error ? (/** @type {!Error} */ (err)).message : String(err);
            throw new Error(`Failed to fetch valid release manifest from direct JSON URL ${releaseBaseUrl}. Details:\n- ${releaseBaseUrl}: ${errMsg}`);
        }
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
    try {
        return await fetchManifestFromUrl(platformManifestUrl, candidateRetryOptions, outputChannel);
    }
    catch (err) {
        /** @type {string} */
        const errMsg = err instanceof Error ? (/** @type {!Error} */ (err)).message : String(err);
        errors.push(`- ${platformManifestUrl}: ${errMsg}`);
        if (!HttpError.isHttpError(err)) {
            throw new Error(`Failed to fetch release manifest for ${releaseBaseUrl}. Details:\n${errors.join('\n')}`);
        }
    }
    // Candidate 2 (Fallback / Test Build): try /latest -> /<version>/manifest.json based on data shape
    try {
        /** @type {{manifest: (undefined|!google3$cloud$developer_experience$antigravity_extensions$vscode$binary_downloader.ReleaseManifest), errorSnippet: (undefined|string)}} */
        const candidate2Result = await fetchVersionedManifestCandidate(baseUrlNoSlash, candidateRetryOptions, outputChannel);
        if (candidate2Result.manifest) {
            return candidate2Result.manifest;
        }
        if (candidate2Result.errorSnippet) {
            errors.push(`- ${baseUrlNoSlash}/latest: ${candidate2Result.errorSnippet}`);
        }
    }
    catch (err) {
        /** @type {string} */
        const errMsg = err instanceof Error ? (/** @type {!Error} */ (err)).message : String(err);
        errors.push(`- ${baseUrlNoSlash}/latest: ${errMsg}`);
        if (!HttpError.isHttpError(err)) {
            throw new Error(`Failed to fetch release manifest for ${releaseBaseUrl}. Details:\n${errors.join('\n')}`);
        }
    }
    // Candidate 3 (Legacy Fallback): try /releases/latest/manifest.json
    /** @type {string} */
    const legacyUrl = `${baseUrlNoSlash}/releases/latest/manifest.json`;
    try {
        return await fetchManifestFromUrl(legacyUrl, candidateRetryOptions, outputChannel);
    }
    catch (err) {
        /** @type {string} */
        const errMsg = err instanceof Error ? (/** @type {!Error} */ (err)).message : String(err);
        errors.push(`- ${legacyUrl}: ${errMsg}`);
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
 * Verifies the SHA-512 or SHA-256 cryptographic checksum of a downloaded binary.
 * Rejects manifest entries without checksums, safely unlinks the file on mismatch,
 * and logs validation progress and status to the provided output channel.
 *
 * @throws Error if checksum verification fails or if no checksum is provided in manifest.
 * @param {string} filePath The local filesystem path to the downloaded binary file.
 * @param {!PlatformBinaryInfo} binaryInfo Platform release metadata containing expected sha512/sha256 digests.
 * @param {!tsickle_vscode_11.OutputChannel} outputChannel VS Code output channel for logging verification diagnostics.
 * @param {(undefined|!tsickle_vscode_11.Progress<{message: (undefined|string), increment: (undefined|number)}>)=} progress Optional progress reporter to update verification status.
 * @return {!Promise<void>}
 */
async function verifyBinaryChecksum(filePath, binaryInfo, outputChannel, progress) {
    /** @type {(undefined|string)} */
    const expectedHash = binaryInfo.sha512 ?? binaryInfo.sha256;
    if (!expectedHash) {
        if (await pathExists(filePath)) {
            await fs_1.promises.unlink(filePath).catch((/**
             * @return {void}
             */
            () => { }));
        }
        /** @type {string} */
        const errorText = 'Integrity verification failed: release manifest does not contain a sha512 or sha256 checksum.';
        outputChannel.appendLine(`[INSTALL ERROR] ${errorText}`);
        throw new Error(errorText);
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
exports.verifyBinaryChecksum = verifyBinaryChecksum;
/**
 * Options for safely promoting a binary to the destination installation path.
 * @record
 */
function PromoteOptions() { }
exports.PromoteOptions = PromoteOptions;
/* istanbul ignore if */
if (false) {
    /**
     * @const {(undefined|string)}
     * @public
     */
    PromoteOptions.prototype.platform;
    /**
     * @const {(undefined|function(string, string): !Promise<void>)}
     * @public
     */
    PromoteOptions.prototype.fsRename;
    /**
     * @const {(undefined|function(string): !Promise<void>)}
     * @public
     */
    PromoteOptions.prototype.fsUnlink;
    /**
     * @const {(undefined|function(string): !Promise<boolean>)}
     * @public
     */
    PromoteOptions.prototype.fsExists;
    /**
     * @const {(undefined|function(string): !Promise<!Array<string>>)}
     * @public
     */
    PromoteOptions.prototype.fsReaddir;
    /**
     * @const {(undefined|number)}
     * @public
     */
    PromoteOptions.prototype.maxAttempts;
    /**
     * @const {(undefined|number)}
     * @public
     */
    PromoteOptions.prototype.initialDelayMs;
}
/** @type {?} */
exports.DEFAULT_PROMOTE_OPTIONS = {
    platform: process.platform,
    fsRename: fs_1.promises.rename,
    fsUnlink: fs_1.promises.unlink,
    fsExists: pathExists,
    fsReaddir: fs_1.promises.readdir,
    maxAttempts: 5,
    initialDelayMs: 100,
};
/**
 * @param {(undefined|!PromoteOptions)=} options
 * @return {?}
 */
function resolvePromoteOptions(options) {
    return {
        platform: options?.platform ?? exports.DEFAULT_PROMOTE_OPTIONS.platform,
        fsRename: options?.fsRename ?? exports.DEFAULT_PROMOTE_OPTIONS.fsRename,
        fsUnlink: options?.fsUnlink ?? exports.DEFAULT_PROMOTE_OPTIONS.fsUnlink,
        fsExists: options?.fsExists ?? exports.DEFAULT_PROMOTE_OPTIONS.fsExists,
        fsReaddir: options?.fsReaddir ?? exports.DEFAULT_PROMOTE_OPTIONS.fsReaddir,
        maxAttempts: options?.maxAttempts ?? exports.DEFAULT_PROMOTE_OPTIONS.maxAttempts,
        initialDelayMs: options?.initialDelayMs ?? exports.DEFAULT_PROMOTE_OPTIONS.initialDelayMs,
    };
}
exports.resolvePromoteOptions = resolvePromoteOptions;
/**
 * Options for retryOnLock.
 * @record
 */
function RetryOnLockOptions() { }
exports.RetryOnLockOptions = RetryOnLockOptions;
/* istanbul ignore if */
if (false) {
    /**
     * @const {(undefined|number)}
     * @public
     */
    RetryOnLockOptions.prototype.maxAttempts;
    /**
     * @const {(undefined|number)}
     * @public
     */
    RetryOnLockOptions.prototype.initialDelayMs;
    /**
     * @const {(undefined|!tsickle_vscode_11.OutputChannel)}
     * @public
     */
    RetryOnLockOptions.prototype.outputChannel;
    /**
     * @const {(undefined|function(number): !Promise<void>)}
     * @public
     */
    RetryOnLockOptions.prototype.sleepFn;
}
/**
 * Retries an asynchronous operation with exponential backoff if it fails with
 * a transient Windows file lock error (EPERM, EBUSY, or EACCES).
 * @template T
 * @param {function(): !Promise<T>} fn
 * @param {(undefined|!RetryOnLockOptions)=} options
 * @return {!Promise<T>}
 */
async function retryOnLock(fn, options) {
    /** @type {number} */
    const maxAttempts = options?.maxAttempts ?? 5;
    /** @type {number} */
    let delay = options?.initialDelayMs ?? 100;
    /** @type {(undefined|!tsickle_vscode_11.OutputChannel)} */
    const outputChannel = options?.outputChannel;
    /** @type {function(number): !Promise<void>} */
    const sleep = options?.sleepFn ??
        ((/**
         * @param {number} ms
         * @return {!Promise<void>}
         */
        (ms) => new Promise((/**
         * @param {function((void|!PromiseLike<void>)): void} resolve
         * @return {void}
         */
        (resolve) => {
            setTimeout(resolve, ms);
        }))));
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        }
        catch (error) {
            /** @type {(undefined|string)} */
            const code = ((/** @type {{code: (undefined|string)}} */ (error)))?.code;
            /** @type {boolean} */
            const isLock = code === 'EPERM' || code === 'EBUSY' || code === 'EACCES';
            if (attempt >= maxAttempts || !isLock) {
                throw error;
            }
            outputChannel?.appendLine(`[INSTALL] Windows file lock encountered (${code ?? 'lock'}). Retrying in ${delay}ms (attempt ${attempt}/${maxAttempts})...`);
            await sleep(delay);
            delay *= 2;
        }
    }
    throw new Error('Unreachable retryOnLock termination');
}
exports.retryOnLock = retryOnLock;
/**
 * Scans the binary installation directory and deletes any leftover `*.old.*` binary backups.
 * Failures to delete specific files (e.g. if still locked by active processes) are non-fatal.
 * @param {string} installDir
 * @param {(undefined|!tsickle_vscode_11.OutputChannel)=} outputChannel
 * @param {(undefined|!PromoteOptions)=} options
 * @return {!Promise<void>}
 */
async function cleanupStaleOldBinaries(installDir, outputChannel, options) {
    const { fsReaddir, fsUnlink, fsExists } = resolvePromoteOptions(options);
    try {
        if (!(await fsExists(installDir))) {
            return;
        }
        /** @type {!Array<string>} */
        const entries = await fsReaddir(installDir);
        /** @type {!RegExp} */
        const oldBinaryPattern = /\.old\.[0-9a-fA-F]{8}$/;
        for (const entry of entries) {
            if (oldBinaryPattern.test(entry)) {
                /** @type {string} */
                const oldFilePath = (0, path_1.join)(installDir, entry);
                try {
                    await fsUnlink(oldFilePath);
                    outputChannel?.appendLine(`[INSTALL] Cleaned up stale binary backup: ${oldFilePath}`);
                }
                catch (unlinkErr) {
                    // File might still be locked by a running process, safe to ignore.
                    outputChannel?.appendLine(`[INSTALL] Could not delete stale binary backup ${oldFilePath}: ${unlinkErr}`);
                }
            }
        }
    }
    catch (err) {
        outputChannel?.appendLine(`[INSTALL WARNING] Failed to clean up stale binaries in ${installDir}: ${err}`);
    }
}
exports.cleanupStaleOldBinaries = cleanupStaleOldBinaries;
/**
 * Promotes a newly extracted or downloaded binary to the destination path safely across platforms.
 *
 * Windows File Locking Handling:
 * - On Windows (NTFS), running executables cannot be deleted or overwritten in-place,
 *   causing `fs.rename` to fail with `EPERM` or `EBUSY`.
 * - However, Windows NTFS allows renaming an open executable if it was launched with
 *   `FILE_SHARE_DELETE` (which the Windows PE loader sets).
 * - Therefore, on Windows:
 *   1. If destination (`installPath`) exists, rename it aside to `<installPath>.old.<id>`.
 *   2. Move `sourcePath` to `installPath`.
 *   3. Clean up the `.old` file and any leftover stale backups in the directory.
 *   4. Wrap operations in an exponential backoff retry loop (default 5 attempts) to wait
 *      out transient antivirus (e.g. Windows Defender) or indexing file locks.
 * @param {string} sourcePath
 * @param {string} installPath
 * @param {(undefined|!tsickle_vscode_11.OutputChannel)=} outputChannel
 * @param {(undefined|!PromoteOptions)=} options
 * @return {!Promise<void>}
 */
async function promoteBinarySafely(sourcePath, installPath, outputChannel, options) {
    /** @type {?} */
    const resolved = resolvePromoteOptions(options);
    const { platform, fsRename, fsExists, maxAttempts, initialDelayMs } = resolved;
    if (platform !== 'win32') {
        await fs_1.promises.chmod(sourcePath, 0o755);
        await fsRename(sourcePath, installPath);
        return;
    }
    // If installPath exists on Windows, rename it aside first
    /** @type {(undefined|string)} */
    let stagedOldPath;
    if (await fsExists(installPath)) {
        stagedOldPath = `${installPath}.old.${(0, crypto_1.randomUUID)().slice(0, 8)}`;
        try {
            await retryOnLock((/**
             * @return {!Promise<void>}
             */
            async () => {
                await fsRename(installPath, (/** @type {string} */ (stagedOldPath)));
            }), { maxAttempts, initialDelayMs, outputChannel });
            outputChannel?.appendLine(`[INSTALL] Staged existing Windows binary aside to ${stagedOldPath}`);
        }
        catch (err) {
            outputChannel?.appendLine(`[INSTALL WARNING] Failed to rename existing Windows binary aside: ${err}. Attempting direct replacement...`);
            stagedOldPath = undefined;
        }
    }
    // Promote the new binary to installPath with lock retry
    await retryOnLock((/**
     * @return {!Promise<void>}
     */
    async () => {
        await fsRename(sourcePath, installPath);
    }), { maxAttempts, initialDelayMs, outputChannel });
    // Clean up the staged old binary and any leftover stale backups in the install directory.
    await cleanupStaleOldBinaries((0, path_1.dirname)(installPath), outputChannel, resolved);
}
exports.promoteBinarySafely = promoteBinarySafely;
/**
 * Verifies the Ed25519 cryptographic signature of a downloaded binary against a trusted public key.
 * Throws an error and unlinks the downloaded file if the signature is invalid or corrupt.
 *
 * NOT YET WIRED INTO THE INSTALL PATH. Release manifests do not currently carry a `signature`
 * field and there is no producer-side signer for the `agy` CLI binary, so this is deliberately
 * kept as a standalone, unit-tested primitive rather than being called from
 * `acquireInstalledBinaryPath`.
 *
 * Before enabling it, `publicKey` must be sourced from a hardcoded, compiled-in trust anchor.
 * Reading the key from a mutable environment variable would be self-defeating: an attacker able
 * to set that variable can also point `AGY_RELEASE_BASE_URL` at a hostile origin and supply a
 * matching manifest, binary, and signature. See the follow-up bug tracking whether to adopt BCID
 * provenance for `lorry_path:///antigravity/` instead of a bespoke signing scheme.
 * @param {string} filePath
 * @param {string} signatureBase64
 * @param {(string|?)} publicKey
 * @param {(undefined|!tsickle_vscode_11.OutputChannel)=} outputChannel
 * @param {(undefined|!tsickle_vscode_11.Progress<{message: (undefined|string), increment: (undefined|number)}>)=} progress
 * @return {!Promise<void>}
 */
async function verifyBinarySignature(filePath, signatureBase64, publicKey, outputChannel, progress) {
    progress?.report({ message: 'Verifying Ed25519 signature...' });
    outputChannel?.appendLine('[INSTALL] Verifying Ed25519 cryptographic signature...');
    const fileBuffer = await fs_1.promises.readFile(filePath);
    const signatureBuffer = Buffer.from(signatureBase64, 'base64');
    /** @type {boolean} */
    let isValid = false;
    try {
        // Pass Buffer instances directly to cryptoVerify without wrapping in new Uint8Array(fileBuffer).
        // In Node.js, Buffer is already an ArrayBufferView at runtime; casting avoids TS type definition
        // incompatibilities while preventing an unnecessary 50MB+ heap buffer copy during verification.
        isValid = (0, crypto_1.verify)(null, (/** @type {(!BigInt64Array|!BigUint64Array|!DataView|!Float32Array|!Float64Array|!Int16Array|!Int32Array|!Int8Array|!Uint16Array|!Uint32Array|!Uint8Array|!Uint8ClampedArray)} */ ((/** @type {*} */ (fileBuffer)))), publicKey, (/** @type {(!BigInt64Array|!BigUint64Array|!DataView|!Float32Array|!Float64Array|!Int16Array|!Int32Array|!Int8Array|!Uint16Array|!Uint32Array|!Uint8Array|!Uint8ClampedArray)} */ ((/** @type {*} */ (signatureBuffer)))));
    }
    catch (error) {
        if (await pathExists(filePath)) {
            await fs_1.promises.unlink(filePath).catch((/**
             * @return {void}
             */
            () => { }));
        }
        /** @type {string} */
        const errorText = `Ed25519 signature verification encountered an error: ${error}`;
        outputChannel?.appendLine(`[INSTALL ERROR] ${errorText}`);
        throw new Error(errorText, { cause: error });
    }
    if (!isValid) {
        if (await pathExists(filePath)) {
            await fs_1.promises.unlink(filePath).catch((/**
             * @return {void}
             */
            () => { }));
        }
        /** @type {string} */
        const errorText = 'Ed25519 cryptographic signature verification failed: signature does not match downloaded binary.';
        outputChannel?.appendLine(`[INSTALL ERROR] ${errorText}`);
        throw new Error(errorText);
    }
    outputChannel?.appendLine('[INSTALL] Ed25519 cryptographic signature verified successfully.');
}
exports.verifyBinarySignature = verifyBinarySignature;
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
        await promoteBinarySafely(stagingPath, installPath, outputChannel);
        return;
    }
    progress?.report({ message: 'Unpacking Antigravity Backend archive...' });
    /** @type {string} */
    const tempExtractDir = (0, path_1.join)(installDir, `.unpack_${(0, crypto_1.randomUUID)().slice(0, 8)}`);
    outputChannel.appendLine(`[INSTALL] Unpacking tar.gz archive into temporary dir ${tempExtractDir}...`);
    try {
        await fs_1.promises.mkdir(tempExtractDir, { recursive: true });
        try {
            await execFileAsync('tar', ['-xzf', stagingPath, '-C', tempExtractDir]);
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
            const extractedPath = (0, path_1.join)(tempExtractDir, candidate);
            if (await pathExists(extractedPath)) {
                await promoteBinarySafely(extractedPath, installPath, outputChannel);
                foundAndPromoted = true;
                break;
            }
        }
        if (!foundAndPromoted) {
            /** @type {string} */
            const errorText = `Could not find executable in unpacked archive at ${tempExtractDir} (checked ${candidateNames.join(', ')})`;
            outputChannel.appendLine(`[INSTALL ERROR] ${errorText}`);
            throw new Error(errorText);
        }
    }
    finally {
        await fs_1.promises
            .rm(tempExtractDir, { recursive: true, force: true })
            .catch((/**
         * @return {void}
         */
        () => { }));
        if (await pathExists(stagingPath)) {
            await fs_1.promises.unlink(stagingPath).catch((/**
             * @return {void}
             */
            () => { }));
        }
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
    /** @type {string} */
    const installDir = (0, path_1.dirname)(installPath);
    await cleanupStaleOldBinaries(installDir, outputChannel);
    /** @type {?} */
    const extVersion = context?.extension?.packageJSON?.version ?? 'unknown';
    outputChannel.appendLine(`[INSTALL] Initializing update check. Platform: ${process.platform}-${process.arch}, Extension Version: ${extVersion}`);
    /** @type {!tsickle_vscode_11.WorkspaceConfiguration} */
    const config = configOverride ?? vscode.workspace.getConfiguration('antigravity');
    /** @type {string} */
    const releaseBaseUrl = resolveReleaseBaseUrl(config, outputChannel);
    /** @type {(undefined|string)} */
    const userConfiguredChannel = config.get('channel');
    if (userConfiguredChannel) {
        outputChannel.appendLine(`[INSTALL] Using custom channel override: ${userConfiguredChannel}`);
    }
    outputChannel.appendLine(`[INSTALL] Checking for updates at releaseBaseUrl=${releaseBaseUrl}...`);
    // Check whether a locally installed binary already exists and satisfies MIN_AGY_VERSION.
    // If so, attempt to check for updates with a fast timeout (3000ms budget). If unreachable or offline,
    // skip the update check and start the existing binary immediately to avoid blocking cold start.
    /** @type {(undefined|string)} */
    const existingValidVersion = await verifyBinaryVersion(installPath, exports.MIN_AGY_VERSION, outputChannel);
    /** @type {string} */
    let targetVersion = exports.MIN_AGY_VERSION;
    /** @type {boolean} */
    let manifestFetched = false;
    if (existingValidVersion) {
        outputChannel.appendLine(`[INSTALL] Found existing valid binary v${existingValidVersion} (>= ${exports.MIN_AGY_VERSION}). Checking for updates with 3s budget...`);
        /** @type {number} */
        const updateCheckTimeoutMs = retryOptions?.timeoutMs ?? 3000;
        /** @type {(undefined|?)} */
        let timerId;
        /** @type {!Promise<?>} */
        const timeoutPromise = new Promise((/**
         * @param {function(!PromiseLike<?>): void} _
         * @param {function(?=): void} reject
         * @return {void}
         */
        (_, reject) => {
            timerId = setTimeout((/**
             * @return {void}
             */
            () => {
                reject(new Error(`Update check timed out after ${updateCheckTimeoutMs}ms`));
            }), updateCheckTimeoutMs);
            timerId.unref?.();
        }));
        try {
            /** @type {!google3$cloud$developer_experience$antigravity_extensions$vscode$binary_downloader.ReleaseManifest} */
            const manifest = await Promise.race([
                fetchReleaseManifest(releaseBaseUrl, { ...retryOptions, maxAttempts: 1, timeoutMs: updateCheckTimeoutMs }, outputChannel),
                timeoutPromise,
            ]);
            if (manifest && manifest.version) {
                targetVersion = manifest.version;
                manifestFetched = true;
            }
        }
        catch (err) {
            outputChannel.appendLine(`[INSTALL] Could not fetch release manifest: ${err}. Falling back to validation target version ${exports.MIN_AGY_VERSION}.`);
            outputChannel.appendLine(`[INSTALL] Fast-path update check skipped (${err}). Continuing with existing binary v${existingValidVersion}.`);
            return installPath;
        }
        finally {
            if (timerId) {
                clearTimeout(timerId);
            }
        }
    }
    else {
        outputChannel.appendLine(`[INSTALL] Checking for updates at releaseBaseUrl=${releaseBaseUrl}...`);
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
            const releaseBaseUrl = resolveReleaseBaseUrl(config, outputChannel);
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
            // Fail fast when the manifest carries no checksum. This is a manifest defect rather than a
            // transient fault, so re-downloading the binary cannot resolve it. Checking here (instead of
            // only inside verifyBinaryChecksum, which runs within withRetry) avoids repeatedly
            // re-downloading a multi-hundred-megabyte archive to rediscover the same missing metadata.
            // A checksum *mismatch* is still verified inside the retry loop, since that can be transient
            // corruption which a retry legitimately repairs.
            if (!binaryInfo.sha512 && !binaryInfo.sha256) {
                /** @type {string} */
                const errorText = 'Integrity verification failed: release manifest does not contain a sha512 or sha256 checksum.';
                outputChannel.appendLine(`[INSTALL ERROR] ${errorText}`);
                throw new Error(errorText);
            }
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
            // Download the platform binary and verify its cryptographic hash and signature.
            // Both download and verification are wrapped in withRetry: if a network dropout or corruption
            // causes verification to fail, the invalid staging file is unlinked and the download is cleanly retried.
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
            try {
                /** @type {string} */
                const identityKey = await getBinaryIdentityKey(installPath);
                binaryVersionCache.set(identityKey, targetVersion);
            }
            catch {
                // Non-fatal if identity key cannot be computed here.
            }
            return installPath;
        }
        catch (error) {
            /** @type {string} */
            const errMsg = error instanceof Error ? (/** @type {!Error} */ (error)).message : String(error);
            outputChannel.appendLine(`[INSTALL ERROR] ${errMsg}`);
            // Offline / network failure fallback: If downloading the update failed due to network/server issues,
            // but an existing installed binary is present on disk and satisfies MIN_AGY_VERSION, fall back to
            // using it so the extension remains operational offline.
            // Do not fall back on cryptographic checksum, signature, or integrity verification errors.
            /** @type {boolean} */
            const isIntegrityError = /checksum.*failed|signature.*failed|integrity.*failed/i.test(errMsg);
            if (!isIntegrityError) {
                /** @type {(undefined|string)} */
                const fallbackVersion = await verifyBinaryVersion(installPath, exports.MIN_AGY_VERSION, outputChannel);
                if (fallbackVersion) {
                    outputChannel.appendLine(`[INSTALL WARNING] Update download failed (${errMsg}), but existing installed binary v${fallbackVersion} meets minimum version requirement (>= ${exports.MIN_AGY_VERSION}). Falling back to existing binary to maintain offline availability.`);
                    return installPath;
                }
            }
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
