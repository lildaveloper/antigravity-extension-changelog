/**
 * @fileoverview added by tsickle
 * Generated from: cloud/developer_experience/antigravity_extensions/vscode/server_manager.ts
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
goog.module('google3.cloud.developer_experience.antigravity_extensions.vscode.server_manager');
var module = module || { id: 'cloud/developer_experience/antigravity_extensions/vscode/server_manager.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_child_process_1 = goog.requireType("google3.third_party.javascript.typings.node.node.child_process");
const tsickle_crypto_2 = goog.requireType("google3.third_party.javascript.typings.node.node.crypto");
const tsickle_fs_3 = goog.requireType("google3.third_party.javascript.typings.node.node.fs");
const tsickle_delegate_interfaces_4 = goog.requireType("google3.devtools.cider.extensions.jetski.delegate_interfaces");
const tsickle_loading_message_impl_5 = goog.requireType("google3.devtools.cider.extensions.jetski.loading.loading_message_impl");
const tsickle_http_6 = goog.requireType("google3.third_party.javascript.typings.node.node.http");
const tsickle_net_7 = goog.requireType("google3.third_party.javascript.typings.node.node.net");
const tsickle_os_8 = goog.requireType("google3.third_party.javascript.typings.node.node.os");
const tsickle_readline_9 = goog.requireType("google3.third_party.javascript.typings.node.node.readline");
const tsickle_vscode_10 = goog.requireType("vscode");
const tsickle_binary_downloader_11 = goog.requireType("google3.cloud.developer_experience.antigravity_extensions.vscode.binary_downloader");
const tsickle_buffered_output_channel_12 = goog.requireType("google3.cloud.developer_experience.antigravity_extensions.vscode.buffered_output_channel");
const tsickle_cde_auth_service_13 = goog.requireType("google3.cloud.developer_experience.antigravity_extensions.vscode.cde_auth_service");
const tsickle_telemetry_constants_14 = goog.requireType("google3.cloud.developer_experience.antigravity_extensions.vscode.telemetry_constants");
const child_process_1 = goog.require('google3.third_party.javascript.typings.node.node.child_process');
const crypto = goog.require('google3.third_party.javascript.typings.node.node.crypto');
const fs = goog.require('google3.third_party.javascript.typings.node.node.fs');
const http = goog.require('google3.third_party.javascript.typings.node.node.http');
const net = goog.require('google3.third_party.javascript.typings.node.node.net');
const os = goog.require('google3.third_party.javascript.typings.node.node.os');
const readline = goog.require('google3.third_party.javascript.typings.node.node.readline');
const vscode = goog.require('vscode'); // from //third_party/javascript/typings/vscode
// from //third_party/javascript/typings/vscode
const binary_downloader_1 = goog.require('google3.cloud.developer_experience.antigravity_extensions.vscode.binary_downloader');
const buffered_output_channel_1 = goog.require('google3.cloud.developer_experience.antigravity_extensions.vscode.buffered_output_channel');
const cde_auth_service_1 = goog.require('google3.cloud.developer_experience.antigravity_extensions.vscode.cde_auth_service');
const telemetry_constants_1 = goog.require('google3.cloud.developer_experience.antigravity_extensions.vscode.telemetry_constants');
/**
 * Known system CA bundle paths by platform in order of priority.
 * @type {!Array<string>}
 */
exports.LINUX_SYSTEM_CA_PATHS = [
    '/etc/ssl/certs/ca-certificates.crt', // Debian/Ubuntu/Gentoo/glinux
    '/etc/pki/tls/certs/ca-bundle.crt', // Fedora/RHEL/CentOS
    '/etc/ssl/ca-bundle.pem', // OpenSUSE
    '/etc/pki/ca-trust/extracted/pem/tls-ca-bundle.pem', // Alpine / newer RHEL
];
/**
 * Default system CA bundle path on macOS (LibreSSL / Keychain export).
 * @type {string}
 */
exports.MACOS_SYSTEM_CA_PATH = '/etc/ssl/cert.pem';
/**
 * Resolves the default OS root CA certificate bundle path if present.
 * @param {string=} platform
 * @param {function(string): boolean=} fsExists
 * @return {(undefined|string)}
 */
function resolveSystemCaBundlePath(platform = process.platform, fsExists = fs.existsSync) {
    if (platform === 'darwin') {
        if (fsExists(exports.MACOS_SYSTEM_CA_PATH)) {
            return exports.MACOS_SYSTEM_CA_PATH;
        }
    }
    else if (platform === 'linux') {
        for (const candidate of exports.LINUX_SYSTEM_CA_PATHS) {
            if (fsExists(candidate)) {
                return candidate;
            }
        }
    }
    return undefined;
}
exports.resolveSystemCaBundlePath = resolveSystemCaBundlePath;
/**
 * Initializes security environment variables (such as OS CA certificates) in the current
 * extension host process so outbound network requests (e.g. manifest/binary downloads)
 * succeed behind corporate TLS inspection proxies (e.g. Zscaler).
 * @param {string=} platform
 * @param {function(string): boolean=} fsExists
 * @return {void}
 */
function initializeHostSecurityEnvironment(platform = process.platform, fsExists = fs.existsSync) {
    /** @type {(undefined|string)} */
    const systemCaPath = resolveSystemCaBundlePath(platform, fsExists);
    if (systemCaPath) {
        if (!process.env['NODE_EXTRA_CA_CERTS']) {
            process.env['NODE_EXTRA_CA_CERTS'] = systemCaPath;
        }
        if (!process.env['SSL_CERT_FILE']) {
            process.env['SSL_CERT_FILE'] = systemCaPath;
        }
    }
    if (!process.env['NODE_USE_SYSTEM_CA'] &&
        (platform === 'darwin' || platform === 'win32')) {
        process.env['NODE_USE_SYSTEM_CA'] = '1';
    }
}
exports.initializeHostSecurityEnvironment = initializeHostSecurityEnvironment;
/**
 * Ensures `localhost` and `127.0.0.1` are present in a comma-separated `NO_PROXY` value
 * whenever a proxy is active or `noProxy` is specified.
 * @param {(undefined|string)=} rawNoProxy
 * @return {string}
 */
function ensureLoopbackNoProxy(rawNoProxy) {
    if (!rawNoProxy || !rawNoProxy.trim()) {
        return 'localhost,127.0.0.1';
    }
    /** @type {!Array<string>} */
    const parts = rawNoProxy
        .split(',')
        .map((/**
     * @param {string} p
     * @return {string}
     */
    (p) => p.trim()))
        .filter(Boolean);
    /** @type {!Set<string>} */
    const lowerParts = new Set(parts.map((/**
     * @param {string} p
     * @return {string}
     */
    (p) => p.toLowerCase())));
    if (!lowerParts.has('localhost')) {
        parts.push('localhost');
    }
    if (!lowerParts.has('127.0.0.1')) {
        parts.push('127.0.0.1');
    }
    return parts.join(',');
}
/**
 * Configures the current extension host process environment with HTTP and HTTPS proxy settings
 * derived from VS Code workspace configuration (`http.proxy` and `http.noProxy`).
 * @param {(undefined|!tsickle_vscode_10.WorkspaceConfiguration)=} configOverride
 * @return {void}
 */
function configureHostProxyEnvironment(configOverride) {
    /** @type {!tsickle_vscode_10.WorkspaceConfiguration} */
    const httpConfig = configOverride ?? vscode.workspace.getConfiguration('http');
    /** @type {*} */
    const rawProxy = httpConfig?.get('proxy');
    /** @type {(undefined|string)} */
    const proxySetting = typeof rawProxy === 'string' ? (/** @type {string} */ (rawProxy)).trim() : undefined;
    if (proxySetting) {
        if (!process.env['HTTP_PROXY'] && !process.env['http_proxy']) {
            process.env['HTTP_PROXY'] = proxySetting;
            process.env['http_proxy'] = proxySetting;
        }
        if (!process.env['HTTPS_PROXY'] && !process.env['https_proxy']) {
            process.env['HTTPS_PROXY'] = proxySetting;
            process.env['https_proxy'] = proxySetting;
        }
    }
    /** @type {*} */
    const rawNoProxy = httpConfig?.get('noProxy');
    /** @type {(undefined|string)} */
    const noProxySetting = typeof rawNoProxy === 'string' ? (/** @type {string} */ (rawNoProxy)).trim() : undefined;
    /** @type {boolean} */
    const hasActiveProxy = Boolean(proxySetting ||
        process.env['HTTP_PROXY'] ||
        process.env['http_proxy'] ||
        process.env['HTTPS_PROXY'] ||
        process.env['https_proxy']);
    if (noProxySetting || hasActiveProxy) {
        /** @type {(undefined|string)} */
        const existingNoProxy = process.env['NO_PROXY'] || process.env['no_proxy'];
        /** @type {string} */
        const effectiveNoProxy = ensureLoopbackNoProxy(existingNoProxy || noProxySetting);
        process.env['NO_PROXY'] = effectiveNoProxy;
        process.env['no_proxy'] = effectiveNoProxy;
    }
}
exports.configureHostProxyEnvironment = configureHostProxyEnvironment;
/**
 * Builds the process environment for launching the Antigravity backend language server,
 * propagating system proxy configurations and OS root CA certificates for corporate ZTNA/TLS inspection.
 * @param {(undefined|{baseEnv: (undefined|?), configOverride: (undefined|!tsickle_vscode_10.WorkspaceConfiguration), platform: (undefined|string), fsExists: (undefined|function(string): boolean)})=} options
 * @return {?}
 */
function buildServerEnvironment(options) {
    const baseEnv = options?.baseEnv ?? process.env;
    /** @type {string} */
    const platform = options?.platform ?? process.platform;
    /** @type {function(string): boolean} */
    const fsExists = options?.fsExists ?? fs.existsSync;
    /** @type {!tsickle_vscode_10.WorkspaceConfiguration} */
    const httpConfig = options?.configOverride ?? vscode.workspace.getConfiguration('http');
    const env = {
        ...baseEnv,
        ['HOME']: os.homedir(),
        ['USERPROFILE']: os.homedir(),
        ['AGY_ENABLE_HUB']: '1',
        ['ANTIGRAVITY_VSCODE_HOST']: '1',
        ['ANTIGRAVITY_AUTH_SUCCESS_APP']: vscode.env.uriScheme || 'vscode',
    };
    // 1. HTTP / HTTPS Proxy configuration propagation
    /** @type {*} */
    const rawProxy = httpConfig?.get('proxy');
    /** @type {(undefined|string)} */
    const proxySetting = typeof rawProxy === 'string' ? (/** @type {string} */ (rawProxy)).trim() : undefined;
    if (proxySetting) {
        if (!env['HTTP_PROXY'] && !env['http_proxy']) {
            env['HTTP_PROXY'] = proxySetting;
            env['http_proxy'] = proxySetting;
        }
        if (!env['HTTPS_PROXY'] && !env['https_proxy']) {
            env['HTTPS_PROXY'] = proxySetting;
            env['https_proxy'] = proxySetting;
        }
    }
    /** @type {*} */
    const rawNoProxy = httpConfig?.get('noProxy');
    /** @type {(undefined|string)} */
    const noProxySetting = typeof rawNoProxy === 'string' ? (/** @type {string} */ (rawNoProxy)).trim() : undefined;
    /** @type {boolean} */
    const hasActiveProxy = Boolean(proxySetting ||
        env['HTTP_PROXY'] ||
        env['http_proxy'] ||
        env['HTTPS_PROXY'] ||
        env['https_proxy']);
    if (noProxySetting || hasActiveProxy) {
        /** @type {(undefined|string)} */
        const existingNoProxy = env['NO_PROXY'] || env['no_proxy'];
        /** @type {string} */
        const effectiveNoProxy = ensureLoopbackNoProxy(existingNoProxy || noProxySetting);
        env['NO_PROXY'] = effectiveNoProxy;
        env['no_proxy'] = effectiveNoProxy;
    }
    // 2. OS Root CA Certificate propagation (for Zscaler/ZTNA SSL inspection)
    /** @type {(undefined|string)} */
    const systemCaPath = resolveSystemCaBundlePath(platform, fsExists);
    if (systemCaPath) {
        if (!env['NODE_EXTRA_CA_CERTS']) {
            env['NODE_EXTRA_CA_CERTS'] = systemCaPath;
        }
        if (!env['SSL_CERT_FILE']) {
            env['SSL_CERT_FILE'] = systemCaPath;
        }
    }
    // 3. Node system CA flag for Node.js runtimes
    if (!env['NODE_USE_SYSTEM_CA'] &&
        (platform === 'darwin' || platform === 'win32')) {
        env['NODE_USE_SYSTEM_CA'] = '1';
    }
    return env;
}
exports.buildServerEnvironment = buildServerEnvironment;
/**
 * Resolves the working directory for spawning the backend server.
 * When `cwd` passed to `child_process.spawn` does not exist on disk, Node.js
 * throws `spawn <binary> ENOENT` (blaming the binary rather than `cwd`).
 * @param {(undefined|!ReadonlyArray<!tsickle_vscode_10.WorkspaceFolder>)=} workspaceFolders
 * @param {(undefined|string)=} extensionPath
 * @param {function(string): boolean=} fsExists
 * @return {string}
 */
function resolveActiveCwd(workspaceFolders, extensionPath, fsExists = fs.existsSync) {
    if (workspaceFolders) {
        for (const folder of workspaceFolders) {
            /** @type {string} */
            const folderPath = folder?.uri?.fsPath;
            if (folderPath && fsExists(folderPath)) {
                return folderPath;
            }
        }
    }
    if (extensionPath && fsExists(extensionPath)) {
        return extensionPath;
    }
    return os.homedir();
}
exports.resolveActiveCwd = resolveActiveCwd;
/**
 * Allocates a free ephemeral loopback port (127.0.0.1).
 * @return {!Promise<number>}
 */
async function getAvailableEphemeralPort() {
    return new Promise((/**
     * @param {function((number|!PromiseLike<number>)): void} resolve
     * @param {function(?=): void} reject
     * @return {void}
     */
    (resolve, reject) => {
        const server = net.createServer();
        server.listen(0, '127.0.0.1', (/**
         * @return {void}
         */
        () => {
            /** @type {(null|string|?)} */
            const address = server.address();
            if (!address || typeof address === 'string') {
                server.close();
                reject(new Error('Failed to obtain ephemeral loopback port'));
                return;
            }
            /** @type {number} */
            const port = address.port;
            server.close((/**
             * @param {(undefined|!Error)} err
             * @return {void}
             */
            (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(port);
                }
            }));
        }));
    }));
}
exports.getAvailableEphemeralPort = getAvailableEphemeralPort;
/**
 * Options for starting the Antigravity backend language server.
 * @record
 */
function ServerStartOptions() { }
exports.ServerStartOptions = ServerStartOptions;
/* istanbul ignore if */
if (false) {
    /**
     * The active VS Code extension context.
     * @type {!tsickle_vscode_10.ExtensionContext}
     * @public
     */
    ServerStartOptions.prototype.context;
    /**
     * Optional loading notifier to report progress status.
     * @type {(undefined|!tsickle_loading_message_impl_5.MessageNotifierImpl)}
     * @public
     */
    ServerStartOptions.prototype.messageNotifier;
    /**
     * Optional workspace configuration override (primarily used in tests).
     * @type {(undefined|!tsickle_vscode_10.WorkspaceConfiguration)}
     * @public
     */
    ServerStartOptions.prototype.configOverride;
    /**
     * Optional telemetry service to log start duration (`duration_ms`) and failure telemetry.
     * @type {(undefined|!tsickle_delegate_interfaces_4.Telemetry)}
     * @public
     */
    ServerStartOptions.prototype.telemetry;
}
/**
 * Default startup timeout waiting for backend language server HTTP health check (30 seconds).
 * @type {number}
 */
exports.DEFAULT_SERVER_STARTUP_TIMEOUT_MS = 30000;
/**
 * Resolves the startup readiness timeout in milliseconds.
 * @param {(undefined|!tsickle_vscode_10.WorkspaceConfiguration)=} configOverride
 * @return {number}
 */
function resolveServerStartupTimeoutMs(configOverride) {
    /** @type {number} */
    const envTimeout = Number(process.env['ANTIGRAVITY_SERVER_READY_TIMEOUT_MS']);
    if (envTimeout > 0) {
        return envTimeout;
    }
    /** @type {!tsickle_vscode_10.WorkspaceConfiguration} */
    const activeConfig = configOverride ?? vscode.workspace.getConfiguration('antigravity');
    /** @type {number} */
    const configuredTimeout = activeConfig?.get('serverStartupTimeoutMs', exports.DEFAULT_SERVER_STARTUP_TIMEOUT_MS);
    return typeof configuredTimeout === 'number' && configuredTimeout > 0
        ? configuredTimeout
        : exports.DEFAULT_SERVER_STARTUP_TIMEOUT_MS;
}
/**
 * Extracts `.name` from an `Error` or plain object, ignoring functions (which carry a function
 * `.name` property of their own and would otherwise misclassify e.g. `throw TimeoutError`).
 * @param {*} err
 * @return {(undefined|string)}
 */
function getErrorName(err) {
    if (err instanceof Error) {
        return (/** @type {!Error} */ (err)).name;
    }
    if (typeof err === 'object' && err !== null) {
        return ((/** @type {{name: (undefined|string)}} */ (err))).name;
    }
    return undefined;
}
/**
 * Returns true when `err` represents an `AbortSignal.timeout` or download stall timeout.
 *
 * Checked ahead of the generic `/timed? out/i` test in `categorizeServerStartError` because the DOM
 * message ("The operation was aborted due to timeout") has no space in "timeout" and would
 * otherwise fall through to `unexpected_failure`.
 * @param {*} err
 * @param {string} message
 * @return {boolean}
 */
function isDownloadTimeoutError(err, message) {
    return (getErrorName(err) === 'TimeoutError' ||
        /aborted due to timeout/i.test(message));
}
/**
 * @param {*} err
 * @param {(undefined|{exitCode: (undefined|number), signal: (undefined|string)})=} processState
 * @return {string}
 */
function categorizeServerStartError(err, processState) {
    if (processState?.signal) {
        return `killed_by_${processState.signal}`;
    }
    if (processState?.exitCode !== undefined) {
        return processState.exitCode === 0
            ? 'process_exit_zero'
            : 'process_exit_nonzero';
    }
    if (!err) {
        return 'unknown';
    }
    /** @type {(undefined|string)} */
    const code = ((/** @type {{code: (undefined|string)}} */ (err)))?.code;
    if (code === 'ENOENT') {
        return 'binary_not_found';
    }
    if (code === 'EACCES' || code === 'EPERM') {
        return 'permission_denied';
    }
    if (code === 'ETIMEDOUT') {
        return 'timeout';
    }
    /** @type {string} */
    const message = err instanceof Error ? (/** @type {!Error} */ (err)).message : String(err);
    if (isDownloadTimeoutError(err, message)) {
        return 'download_failed';
    }
    if (/timed? out/i.test(message) || /failed to start at/i.test(message)) {
        return 'timeout';
    }
    if (/ENOENT/i.test(message) || /not found/i.test(message)) {
        return 'binary_not_found';
    }
    if (/EACCES/i.test(message) || /permission denied/i.test(message)) {
        return 'permission_denied';
    }
    if (/download/i.test(message) || /fetch/i.test(message)) {
        return 'download_failed';
    }
    if (/spawn/i.test(message)) {
        return 'spawn_failed';
    }
    return 'unexpected_failure';
}
/**
 * Manages acquiring and running the Antigravity backend language server process (`agy --hub`).
 *
 * Implements the Dynamic Auto-Installation strategy (`~/.gemini/bin/agy`).
 * @implements {tsickle_delegate_interfaces_4.HostDiagnosticsProvider}
 */
class AntigravityServerManager {
    constructor() {
        this.csrfToken = crypto.randomUUID();
        /**
         * Indicates whether the server is undergoing intentional shutdown to suppress false-positive crash telemetry.
         */
        this.isStopping = false;
        /**
         * Fires when the backend server process terminates unexpectedly (i.e. not via
         * an intentional {\@link stop}). Consumers (e.g. the webview renderer) use this
         * to flip already-loaded surfaces into the error state instead of leaving a
         * stale/blank iframe pointing at a dead port.
         */
        this.serverCrashEmitter = new vscode.EventEmitter();
        this.onServerCrash = this.serverCrashEmitter.event;
    }
    /**
     * @public
     * @return {!AntigravityServerManager}
     */
    static getInstance() {
        if (AntigravityServerManager.instance) {
            return AntigravityServerManager.instance;
        }
        AntigravityServerManager.instance = new AntigravityServerManager();
        return AntigravityServerManager.instance;
    }
    /**
     * Returns the URL of the currently running backend server, if any.
     *
     * Returns undefined when the server has not started, has crashed, or is
     * mid-startup. This reflects only the locally spawned process and does not
     * account for a remotely configured `antigravity.serverUrl`.
     * @public
     * @return {(undefined|string)}
     */
    getServerUrl() {
        return this.serverUrl;
    }
    /**
     * Returns the most recent startup or CLI loading error message, if any.
     * @public
     * @return {(undefined|string)}
     */
    getLastStartupError() {
        return this.lastStartupError;
    }
    /**
     * Sets or clears the most recent startup or CLI loading error message.
     * @public
     * @param {(undefined|string)=} error
     * @return {void}
     */
    setLastStartupError(error) {
        this.lastStartupError = error;
    }
    /**
     * Reports whether the backend server frontend is reachable and responding.
     *
     * Resolves the effective server URL (remote override, spawned process, or the
     * `antigravity.serverUrl`/`ANTIGRAVITY_SERVER_URL` configuration) and probes
     * it with a short-timeout HTTP request. Used to decide whether the CLI-served
     * feedback UI can be shown or whether the local fallback form is required.
     * @public
     * @param {number=} timeoutMs
     * @return {!Promise<boolean>}
     */
    async isServerHealthy(timeoutMs = 2000) {
        if (this.lastStartupError) {
            return false;
        }
        /** @type {(undefined|string)} */
        const url = this.getEffectiveServerUrl();
        if (!url) {
            return false;
        }
        return this.waitForServerReady(url, timeoutMs);
    }
    /**
     * Resolves the effective backend URL, preferring an explicit remote override
     * (`ANTIGRAVITY_SERVER_URL` env or `antigravity.serverUrl` setting) and
     * falling back to the locally spawned process URL.
     * @public
     * @return {(undefined|string)}
     */
    getEffectiveServerUrl() {
        /** @type {(undefined|string)} */
        const configuredUrl = process?.env['ANTIGRAVITY_SERVER_URL'] ??
            vscode.workspace.getConfiguration('antigravity').get('serverUrl');
        return configuredUrl ?? this.serverUrl;
    }
    /**
     * Lazily initializes or returns the host-level BufferedOutputChannel.
     * @public
     * @return {!tsickle_buffered_output_channel_12.BufferedOutputChannel}
     */
    getOrCreateOutputChannel() {
        if (!this.outputChannel) {
            this.outputChannel = new buffered_output_channel_1.BufferedOutputChannel(vscode.window.createOutputChannel('Antigravity'));
        }
        return this.outputChannel;
    }
    /**
     * Returns the underlying BufferedOutputChannel if initialized.
     * @public
     * @return {(undefined|!tsickle_buffered_output_channel_12.BufferedOutputChannel)}
     */
    getOutputChannel() {
        return this.outputChannel;
    }
    /**
     * Returns a snapshot of buffered installation and server lifecycle logs.
     * @public
     * @return {!Array<string>}
     */
    getOutputChannelLogs() {
        return this.getOrCreateOutputChannel().getLines();
    }
    /**
     * Gathers host-side operational logs and binary information for diagnostics collection.
     * @public
     * @return {!Promise<!tsickle_delegate_interfaces_4.HostDiagnostics>}
     */
    async getHostDiagnostics() {
        /** @type {string} */
        const binaryPath = this.getInstalledTargetPath();
        /** @type {!Array<string>} */
        const installLogs = this.getOutputChannelLogs();
        /** @type {(undefined|string)} */
        let binaryVersion;
        try {
            binaryVersion = await (0, binary_downloader_1.getBinaryVersionString)(binaryPath);
        }
        catch {
            // Binary might not be installed or executable yet.
        }
        if (!binaryVersion) {
            for (let i = installLogs.length - 1; i >= 0; i--) {
                /** @type {(null|!RegExpMatchArray)} */
                const match = installLogs[i].match(/(?:CLI version:\s*|binary\s+v|agy\s+\(v)(\d+\.\d+\.\d+[^ )\t\n\r]*)/i);
                if (match) {
                    binaryVersion = match[1];
                    break;
                }
            }
        }
        return {
            installLogs,
            extensionLogs: [],
            binaryVersion: binaryVersion ?? '',
            binaryPath,
        };
    }
    /**
     * Resolves the local persistent installed binary (`~/.gemini/bin/agy`) path.
     * @public
     * @return {string}
     */
    getInstalledTargetPath() {
        return (0, binary_downloader_1.getInstalledTargetPath)();
    }
    /**
     * Allocates a free ephemeral loopback port (127.0.0.1).
     * @public
     * @return {!Promise<number>}
     */
    async getAvailableEphemeralPort() {
        return await getAvailableEphemeralPort();
    }
    /**
     * Executes the Dynamic Auto-Installation state machine via `binary_downloader.ts`.
     * @public
     * @param {!tsickle_vscode_10.ExtensionContext} context
     * @param {(undefined|!tsickle_vscode_10.Progress<{message: (undefined|string), increment: (undefined|number)}>)=} progress
     * @param {(undefined|!tsickle_vscode_10.WorkspaceConfiguration)=} configOverride
     * @return {!Promise<string>}
     */
    async acquireInstalledBinaryPath(context, progress, configOverride) {
        initializeHostSecurityEnvironment();
        configureHostProxyEnvironment(configOverride);
        /** @type {!tsickle_buffered_output_channel_12.BufferedOutputChannel} */
        const outputChannel = this.getOrCreateOutputChannel();
        return await (0, binary_downloader_1.acquireInstalledBinaryPath)({
            context,
            outputChannel,
            progress,
            configOverride,
            targetPathOverride: this.getInstalledTargetPath(),
        });
    }
    /**
     * Resolves the Antigravity language server executable path via the Auto-Install approach (`~/.gemini/bin/agy`).
     * @public
     * @param {!tsickle_vscode_10.ExtensionContext} context
     * @param {(undefined|!tsickle_vscode_10.WorkspaceConfiguration)=} configOverride
     * @return {!Promise<string>}
     */
    async acquireBinaryPath(context, configOverride) {
        return await this.acquireInstalledBinaryPath(context, undefined, configOverride);
    }
    /**
     * Polls the specified HTTP URL until it returns a healthy status code (200-499) or times out.
     * Periodically verifies process liveness via `isProcessAlive` callback (if provided) to abort early
     * when the server process crashes or terminates unexpectedly during startup.
     * @public
     * @param {string} url
     * @param {(undefined|number)=} timeoutMs
     * @param {(undefined|function(): boolean)=} isProcessAlive
     * @return {!Promise<boolean>}
     */
    async waitForServerReady(url, timeoutMs, isProcessAlive) {
        /** @type {(undefined|number)} */
        const envTimeout = process.env['ANTIGRAVITY_SERVER_READY_TIMEOUT_MS']
            ? Number(process.env['ANTIGRAVITY_SERVER_READY_TIMEOUT_MS'])
            : undefined;
        /** @type {number} */
        const effectiveTimeoutMs = timeoutMs ??
            (envTimeout && !isNaN(envTimeout)
                ? envTimeout
                : exports.DEFAULT_SERVER_STARTUP_TIMEOUT_MS);
        /** @type {number} */
        const start = Date.now();
        /** @type {number} */
        let attempt = 0;
        /** @type {string} */
        const healthUrl = url.endsWith('/healthz')
            ? url
            : `${url.replace(/\/$/, '')}/healthz`;
        /** @type {(undefined|string)} */
        let lastProbeError;
        while (Date.now() - start < effectiveTimeoutMs) {
            if (isProcessAlive && !isProcessAlive()) {
                this.outputChannel?.appendLine(`[LAUNCH ERROR] Server process terminated early during startup probe (attempt ${attempt}).`);
                return false;
            }
            attempt++;
            try {
                /** @type {boolean} */
                const healthy = await new Promise((/**
                 * @param {function((boolean|!PromiseLike<boolean>)): void} resolve
                 * @return {void}
                 */
                (resolve) => {
                    /** @type {string} */
                    const pollUrl = attempt % 2 === 1 ? healthUrl : url;
                    const req = http.get(pollUrl, { agent: false }, (/**
                     * @param {?} res
                     * @return {void}
                     */
                    (res) => {
                        res.resume();
                        resolve(res.statusCode !== undefined &&
                            res.statusCode >= 200 &&
                            res.statusCode < 500);
                    }));
                    /** @type {boolean} */
                    let timedOut = false;
                    req.on('error', (/**
                     * @param {!Error} err
                     * @return {void}
                     */
                    (err) => {
                        if (attempt % 20 === 1) {
                            console.log(`[LAUNCH POLL ${attempt}] Error connecting to ${pollUrl}: ${err.message}`);
                        }
                        if (!timedOut) {
                            lastProbeError = err?.message || String(err);
                        }
                        resolve(false);
                    }));
                    req.setTimeout(2000, (/**
                     * @return {void}
                     */
                    () => {
                        timedOut = true;
                        lastProbeError = 'probe request timed out';
                        req.destroy();
                        resolve(false);
                    }));
                }));
                if (healthy) {
                    this.outputChannel?.appendLine(`[LAUNCH] Server at ${url} is READY after ${attempt} attempt(s).`);
                    console.log(`[LAUNCH] Server at ${url} is READY after ${attempt} attempt(s).`);
                    return true;
                }
            }
            catch (err) {
                lastProbeError = err instanceof Error ? (/** @type {!Error} */ (err)).message : String(err);
                // Retry
            }
            if (isProcessAlive && !isProcessAlive()) {
                this.outputChannel?.appendLine(`[LAUNCH ERROR] Server process terminated early during startup probe (attempt ${attempt}).`);
                return false;
            }
            await new Promise((/**
             * @param {function((void|!PromiseLike<void>)): void} r
             * @return {void}
             */
            (r) => {
                setTimeout(r, 250);
            }));
        }
        /** @type {string} */
        const timeoutMsg = `[LAUNCH ERROR] Timed out waiting for server at ${url} after ${effectiveTimeoutMs}ms (${attempt} attempts, last error: ${lastProbeError || 'none'}).`;
        this.outputChannel?.appendLine(timeoutMsg);
        console.error(timeoutMsg);
        return false;
    }
    /**
     * Starts the Antigravity backend language server (`agy --hub`).
     *
     * @public
     * @param {(!tsickle_vscode_10.ExtensionContext|!ServerStartOptions)} optionsOrContext Either a ServerStartOptions object or the active VS Code extension context.
     * @param {(undefined|!tsickle_loading_message_impl_5.MessageNotifierImpl)=} messageNotifier Optional loading notifier to report progress status (legacy parameter).
     * @param {(undefined|!tsickle_vscode_10.WorkspaceConfiguration)=} configOverride Optional workspace configuration override (legacy parameter).
     * @param {(undefined|!tsickle_delegate_interfaces_4.Telemetry)=} telemetry Optional telemetry service to log start duration (`duration_ms`) and failure telemetry (legacy parameter).
     * @return {!Promise<string>}
     */
    async start(optionsOrContext, messageNotifier, configOverride, telemetry) {
        /** @type {!ServerStartOptions} */
        const options = typeof ((/** @type {!tsickle_vscode_10.ExtensionContext} */ (optionsOrContext))).subscriptions !==
            'undefined'
            ? {
                context: (/** @type {!tsickle_vscode_10.ExtensionContext} */ (optionsOrContext)),
                messageNotifier,
                configOverride,
                telemetry,
            }
            : ((/** @type {!ServerStartOptions} */ (optionsOrContext)));
        const { context, telemetry: activeTelemetry } = options;
        this.getOrCreateOutputChannel();
        if (this.startingPromise) {
            return this.startingPromise;
        }
        if (this.serverProcess && this.serverUrl) {
            return this.serverUrl;
        }
        this.isStopping = false;
        this.lastStartupError = undefined;
        /** @type {number} */
        const startTime = Date.now();
        void activeTelemetry?.logEvent(telemetry_constants_1.AntigravityEvent.SERVER_START);
        this.startingPromise = ((/**
         * @return {!Promise<string>}
         */
        async () => {
            /** @type {(undefined|number)} */
            let startupExitCode;
            /** @type {(undefined|string)} */
            let startupSignal;
            /** @type {(undefined|!Error)} */
            let startupSpawnError;
            /** @type {(undefined|number)} */
            let spawnStartTime;
            try {
                /** @type {(undefined|number)} */
                const configuredPort = vscode.workspace
                    .getConfiguration('antigravity')
                    .get('serverPort');
                /** @type {number} */
                const startupTimeoutMs = resolveServerStartupTimeoutMs(options.configOverride);
                /** @type {number} */
                const port = Number(configuredPort) || (await this.getAvailableEphemeralPort());
                /** @type {string} */
                const backendUrl = `http://127.0.0.1:${port}`;
                /** @type {string} */
                const binaryPath = await this.acquireBinaryPath(context, options.configOverride);
                /** @type {!Array<string>} */
                const args = [
                    '--hub',
                    `--hub-port=${port}`,
                    '--app_data_dir=antigravity',
                    `--csrf_token=${this.csrfToken}`,
                ];
                /** @type {!ReadonlyArray<!tsickle_vscode_10.WorkspaceFolder>} */
                const workspaceFolders = vscode.workspace.workspaceFolders ?? [];
                for (const folder of workspaceFolders) {
                    if (folder?.uri?.fsPath && fs.existsSync(folder.uri.fsPath)) {
                        args.push(`--add-dir=${folder.uri.fsPath}`);
                    }
                }
                /** @type {!Array<string>} */
                const customArgs = configOverride?.get('serverArgs') ??
                    vscode.workspace
                        .getConfiguration('antigravity')
                        .get('serverArgs') ??
                    [];
                if (Array.isArray(customArgs) && customArgs.length > 0) {
                    args.push(...customArgs);
                }
                /** @type {(undefined|string)} */
                const versionStr = await (0, binary_downloader_1.getBinaryVersionString)(binaryPath);
                /** @type {string} */
                const versionLog = versionStr ? ` (v${versionStr})` : '';
                this.outputChannel?.appendLine(`[LAUNCH] Spawning ${binaryPath}${versionLog} ${args.join(' ')}`);
                console.log(`[LAUNCH] Spawning ${binaryPath}${versionLog} ${args.join(' ')}`);
                /** @type {string} */
                const activeCwd = resolveActiveCwd(workspaceFolders, context.extensionPath);
                const serverEnv = buildServerEnvironment({
                    configOverride: options.configOverride,
                });
                if (cde_auth_service_1.CdeAuthService.getInstance().isCdeEnvironment()) {
                    serverEnv['ANTIGRAVITY_CDE'] = 'true';
                }
                spawnStartTime = Date.now();
                this.serverProcess = (0, child_process_1.spawn)(binaryPath, args, {
                    cwd: activeCwd,
                    env: serverEnv,
                    shell: false,
                    stdio: ['ignore', 'pipe', 'pipe'],
                });
                if (this.serverProcess.stdout) {
                    const rl = readline.createInterface({
                        input: this.serverProcess.stdout,
                        terminal: false,
                    });
                    rl.on('line', (/**
                     * @param {string} line
                     * @return {void}
                     */
                    (line) => {
                        if (line.trim()) {
                            this.outputChannel?.appendLine(`[HUB STDOUT] ${line}`);
                            console.log(`[HUB STDOUT] ${line}`);
                            if (line.startsWith('ANTIGRAVITY_OPEN_URL:')) {
                                /** @type {string} */
                                const url = line
                                    .substring('ANTIGRAVITY_OPEN_URL:'.length)
                                    .trim();
                                this.outputChannel?.appendLine(`[LAUNCH] Intercepted auth URL: ${url}`);
                                try {
                                    /** @type {!tsickle_vscode_10.Uri} */
                                    const uri = vscode.Uri.parse(url);
                                    vscode.env.openExternal(uri).then((/**
                                     * @param {boolean} success
                                     * @return {void}
                                     */
                                    (success) => {
                                        if (!success) {
                                            this.outputChannel?.appendLine(`[LAUNCH WARNING] vscode.env.openExternal returned false for URL: ${url}`);
                                        }
                                    }), (/**
                                     * @param {?} err
                                     * @return {void}
                                     */
                                    (err) => {
                                        this.outputChannel?.appendLine(`[LAUNCH ERROR] Failed to open external URL "${url}": ${err instanceof Error ? (/** @type {!Error} */ (err)).message : err}`);
                                    }));
                                }
                                catch (err) {
                                    this.outputChannel?.appendLine(`[LAUNCH ERROR] Failed to parse auth URL "${url}": ${err instanceof Error ? (/** @type {!Error} */ (err)).message : err}`);
                                }
                            }
                        }
                    }));
                }
                if (this.serverProcess.stderr) {
                    const rlStderr = readline.createInterface({
                        input: this.serverProcess.stderr,
                        terminal: false,
                    });
                    rlStderr.on('line', (/**
                     * @param {string} line
                     * @return {void}
                     */
                    (line) => {
                        if (line.trim()) {
                            this.outputChannel?.appendLine(`[HUB STDERR] ${line}`);
                            console.log(`[HUB STDERR] ${line}`);
                        }
                    }));
                }
                // Log telemetry when the process fails to spawn directly (e.g. executable not runnable).
                this.serverProcess.on('error', (/**
                 * @param {!Error} err
                 * @return {void}
                 */
                (err) => {
                    if (!this.isStopping) {
                        startupSpawnError = err;
                    }
                    this.outputChannel?.appendLine(`[LAUNCH PROCESS ERROR] Failed to spawn process: ${err.message}`);
                    void activeTelemetry?.logError?.(telemetry_constants_1.AntigravityEvent.SERVER_CRASH, {
                        'exit_code': -1,
                        'error': err.message,
                        'stack': err.stack,
                        'failure_reason': 'spawn_error',
                    });
                    this.serverProcess = undefined;
                    this.serverUrl = undefined;
                    this.port = undefined;
                }));
                // Track process exit. If the process terminates unexpectedly (not triggered via intentional stop()),
                // emit a SERVER_CRASH event for both non-zero exit codes and signal kills (e.g. OOM SIGKILL, SIGSEGV).
                this.serverProcess.on('exit', (/**
                 * @param {(null|number)} code
                 * @param {(null|string)} signal
                 * @return {void}
                 */
                (code, signal) => {
                    if (!this.isStopping) {
                        startupExitCode = code !== null ? code : undefined;
                        startupSignal = signal ?? undefined;
                    }
                    /** @type {string} */
                    const msg = `[LAUNCH ERROR] Server process exited unexpectedly with code ${code}, signal ${signal}`;
                    console.error(msg);
                    this.outputChannel?.appendLine(msg);
                    /** @type {boolean} */
                    const unexpected = !this.isStopping && (code !== 0 || signal !== null);
                    // Whether the server had already come up before this exit. Only a
                    // crash *after* a successful start should flip live surfaces into the
                    // error state; a failure during initial startup is handled by the
                    // renderer's setup/catch path and its own loading error UI.
                    /** @type {boolean} */
                    const hadStarted = this.serverUrl !== undefined;
                    if (unexpected) {
                        void activeTelemetry?.logError?.(telemetry_constants_1.AntigravityEvent.SERVER_CRASH, {
                            'exit_code': code ?? -1,
                            'signal': signal || 'none',
                            'error': msg,
                            'failure_reason': signal
                                ? `killed_by_${signal}`
                                : 'process_exit_nonzero',
                        });
                    }
                    // Notify listeners of a mid-session termination/crash so open webviews
                    // can show the error component instead of a frozen/blank iframe
                    // (including SIGTERM traps where the Go binary exits with code 0).
                    if (!this.isStopping && hadStarted) {
                        /** @type {string} */
                        const reason = signal
                            ? `killed_by_${signal}`
                            : code !== 0
                                ? 'process_exit_nonzero'
                                : 'process_terminated';
                        this.serverCrashEmitter.fire({
                            code: code ?? null,
                            signal: signal ?? null,
                            reason,
                        });
                    }
                    this.serverProcess = undefined;
                    this.serverUrl = undefined;
                    this.port = undefined;
                }));
                /** @type {function(): boolean} */
                const isProcessAlive = (/**
                 * @return {boolean}
                 */
                () => startupSpawnError === undefined &&
                    this.serverProcess !== undefined &&
                    this.serverProcess.exitCode === null &&
                    this.serverProcess.signalCode === null &&
                    !this.serverProcess.killed);
                /** @type {boolean} */
                const ready = await this.waitForServerReady(backendUrl, startupTimeoutMs, isProcessAlive);
                if (!ready) {
                    await this.stop();
                    if (startupSpawnError) {
                        throw startupSpawnError;
                    }
                    if (startupSignal) {
                        throw new Error(`Server failed to start: process terminated by signal ${startupSignal}`);
                    }
                    if (startupExitCode !== undefined) {
                        throw new Error(`Server failed to start: process exited early with code ${startupExitCode}`);
                    }
                    // `backendUrl` is left verbatim on purpose. `sanitizeString` in
                    // telemetry_service collapses `127.0.0.1:<port>` to a single
                    // `<IP_REDACTED>` token before the message is sent, so rewriting the
                    // host here would only leak the ephemeral port and give every event
                    // a distinct error string.
                    throw new Error(`Server failed to start at ${backendUrl} after ${startupTimeoutMs}ms`);
                }
                this.serverUrl = backendUrl;
                this.port = port;
                this.lastStartupError = undefined;
                /** @type {number} */
                const durationMs = Date.now() - (spawnStartTime ?? startTime);
                void activeTelemetry?.logEvent(telemetry_constants_1.AntigravityEvent.SERVER_START_SUCCESS, {
                    'duration_ms': durationMs,
                    'success': true,
                });
                return this.serverUrl;
            }
            catch (err) {
                this.serverUrl = undefined;
                this.port = undefined;
                this.lastStartupError =
                    err instanceof Error ? (/** @type {!Error} */ (err)).message : String(err);
                // Record startup failure duration, categorized reason, exit code, sanitized error message, and stack trace in telemetry.
                /** @type {number} */
                const durationMs = Date.now() - (spawnStartTime ?? startTime);
                /** @type {string} */
                const failureReason = categorizeServerStartError(err, {
                    exitCode: startupExitCode,
                    signal: startupSignal,
                });
                /** @type {number} */
                const exitCode = startupExitCode ??
                    (typeof ((/** @type {{exitCode: *}} */ (err)))?.exitCode === 'number'
                        ? ((/** @type {{exitCode: number}} */ (err))).exitCode
                        : -1);
                void activeTelemetry?.logError?.(telemetry_constants_1.AntigravityEvent.SERVER_START_FAILURE, {
                    'duration_ms': durationMs,
                    'failure_reason': failureReason,
                    'exit_code': exitCode,
                    'error': err instanceof Error ? (/** @type {!Error} */ (err)).message : String(err),
                    'stack': err instanceof Error ? (/** @type {!Error} */ (err)).stack : undefined,
                });
                throw err;
            }
            finally {
                this.startingPromise = undefined;
            }
        }))();
        return this.startingPromise;
    }
    /**
     * Gracefully stops the spawned server process.
     * @public
     * @return {!Promise<void>}
     */
    async stop() {
        this.isStopping = true;
        if (!this.serverProcess) {
            return;
        }
        const targetProcess = this.serverProcess;
        this.serverProcess = undefined;
        this.serverUrl = undefined;
        this.port = undefined;
        await new Promise((/**
         * @param {function((void|!PromiseLike<void>)): void} resolve
         * @return {void}
         */
        (resolve) => {
            /** @type {boolean} */
            let settled = false;
            /** @type {function(): void} */
            const done = (/**
             * @return {void}
             */
            () => {
                if (!settled) {
                    settled = true;
                    resolve();
                }
            });
            targetProcess.on('exit', done);
            targetProcess.kill('SIGTERM');
            setTimeout((/**
             * @return {void}
             */
            () => {
                try {
                    targetProcess.kill('SIGKILL');
                }
                catch {
                    // Process already exited
                }
                done();
            }), 5000);
        }));
    }
}
exports.AntigravityServerManager = AntigravityServerManager;
/* istanbul ignore if */
if (false) {
    /**
     * @type {(undefined|!AntigravityServerManager)}
     * @private
     */
    AntigravityServerManager.instance;
    /**
     * @type {(undefined|?)}
     * @private
     */
    AntigravityServerManager.prototype.serverProcess;
    /**
     * @type {(undefined|string)}
     * @private
     */
    AntigravityServerManager.prototype.serverUrl;
    /**
     * @type {(undefined|number)}
     * @public
     */
    AntigravityServerManager.prototype.port;
    /**
     * @const {string}
     * @public
     */
    AntigravityServerManager.prototype.csrfToken;
    /**
     * @type {(undefined|!tsickle_buffered_output_channel_12.BufferedOutputChannel)}
     * @private
     */
    AntigravityServerManager.prototype.outputChannel;
    /**
     * @type {(undefined|!Promise<string>)}
     * @private
     */
    AntigravityServerManager.prototype.startingPromise;
    /**
     * @type {(undefined|string)}
     * @private
     */
    AntigravityServerManager.prototype.lastStartupError;
    /**
     * Indicates whether the server is undergoing intentional shutdown to suppress false-positive crash telemetry.
     * @type {boolean}
     * @private
     */
    AntigravityServerManager.prototype.isStopping;
    /**
     * Fires when the backend server process terminates unexpectedly (i.e. not via
     * an intentional {\@link stop}). Consumers (e.g. the webview renderer) use this
     * to flip already-loaded surfaces into the error state instead of leaving a
     * stale/blank iframe pointing at a dead port.
     * @const {!tsickle_vscode_10.EventEmitter<{code: (null|number), signal: (null|string), reason: string}>}
     * @private
     */
    AntigravityServerManager.prototype.serverCrashEmitter;
    /**
     * @const {!tsickle_vscode_10.Event<{code: (null|number), signal: (null|string), reason: string}>}
     * @public
     */
    AntigravityServerManager.prototype.onServerCrash;
}
