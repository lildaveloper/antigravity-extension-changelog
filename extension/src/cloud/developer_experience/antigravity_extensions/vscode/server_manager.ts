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
const tsickle_fs_2 = goog.requireType("google3.third_party.javascript.typings.node.node.fs");
const tsickle_delegate_interfaces_3 = goog.requireType("google3.devtools.cider.extensions.jetski.delegate_interfaces");
const tsickle_loading_message_impl_4 = goog.requireType("google3.devtools.cider.extensions.jetski.loading.loading_message_impl");
const tsickle_http_5 = goog.requireType("google3.third_party.javascript.typings.node.node.http");
const tsickle_net_6 = goog.requireType("google3.third_party.javascript.typings.node.node.net");
const tsickle_os_7 = goog.requireType("google3.third_party.javascript.typings.node.node.os");
const tsickle_readline_8 = goog.requireType("google3.third_party.javascript.typings.node.node.readline");
const tsickle_vscode_9 = goog.requireType("vscode");
const tsickle_binary_downloader_10 = goog.requireType("google3.cloud.developer_experience.antigravity_extensions.vscode.binary_downloader");
const tsickle_buffered_output_channel_11 = goog.requireType("google3.cloud.developer_experience.antigravity_extensions.vscode.buffered_output_channel");
const tsickle_telemetry_constants_12 = goog.requireType("google3.cloud.developer_experience.antigravity_extensions.vscode.telemetry_constants");
const child_process_1 = goog.require('google3.third_party.javascript.typings.node.node.child_process');
const fs = goog.require('google3.third_party.javascript.typings.node.node.fs');
const http = goog.require('google3.third_party.javascript.typings.node.node.http');
const net = goog.require('google3.third_party.javascript.typings.node.node.net');
const os = goog.require('google3.third_party.javascript.typings.node.node.os');
const readline = goog.require('google3.third_party.javascript.typings.node.node.readline');
const vscode = goog.require('vscode'); // from //third_party/javascript/typings/vscode
// from //third_party/javascript/typings/vscode
const binary_downloader_1 = goog.require('google3.cloud.developer_experience.antigravity_extensions.vscode.binary_downloader');
const buffered_output_channel_1 = goog.require('google3.cloud.developer_experience.antigravity_extensions.vscode.buffered_output_channel');
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
 * Configures the current extension host process environment with HTTP and HTTPS proxy settings
 * derived from VS Code workspace configuration (`http.proxy` and `http.noProxy`).
 * @param {(undefined|!tsickle_vscode_9.WorkspaceConfiguration)=} configOverride
 * @return {void}
 */
function configureHostProxyEnvironment(configOverride) {
    /** @type {!tsickle_vscode_9.WorkspaceConfiguration} */
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
    if (noProxySetting) {
        if (!process.env['NO_PROXY'] && !process.env['no_proxy']) {
            process.env['NO_PROXY'] = noProxySetting;
            process.env['no_proxy'] = noProxySetting;
        }
    }
}
exports.configureHostProxyEnvironment = configureHostProxyEnvironment;
/**
 * Builds the process environment for launching the Antigravity backend language server,
 * propagating system proxy configurations and OS root CA certificates for corporate ZTNA/TLS inspection.
 * @param {(undefined|{baseEnv: (undefined|?), configOverride: (undefined|!tsickle_vscode_9.WorkspaceConfiguration), platform: (undefined|string), fsExists: (undefined|function(string): boolean)})=} options
 * @return {?}
 */
function buildServerEnvironment(options) {
    const baseEnv = options?.baseEnv ?? process.env;
    /** @type {string} */
    const platform = options?.platform ?? process.platform;
    /** @type {function(string): boolean} */
    const fsExists = options?.fsExists ?? fs.existsSync;
    /** @type {!tsickle_vscode_9.WorkspaceConfiguration} */
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
    if (noProxySetting) {
        if (!env['NO_PROXY'] && !env['no_proxy']) {
            env['NO_PROXY'] = noProxySetting;
            env['no_proxy'] = noProxySetting;
        }
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
     * @type {!tsickle_vscode_9.ExtensionContext}
     * @public
     */
    ServerStartOptions.prototype.context;
    /**
     * Optional loading notifier to report progress status.
     * @type {(undefined|!tsickle_loading_message_impl_4.MessageNotifierImpl)}
     * @public
     */
    ServerStartOptions.prototype.messageNotifier;
    /**
     * Optional workspace configuration override (primarily used in tests).
     * @type {(undefined|!tsickle_vscode_9.WorkspaceConfiguration)}
     * @public
     */
    ServerStartOptions.prototype.configOverride;
    /**
     * Optional telemetry service to log start duration (`duration_ms`) and failure telemetry.
     * @type {(undefined|!tsickle_delegate_interfaces_3.Telemetry)}
     * @public
     */
    ServerStartOptions.prototype.telemetry;
}
/**
 * @param {*} err
 * @return {string}
 */
function categorizeServerStartError(err) {
    if (!err) {
        return 'unknown';
    }
    /** @type {string} */
    const message = err instanceof Error ? (/** @type {!Error} */ (err)).message : String(err);
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
 * @implements {tsickle_delegate_interfaces_3.HostDiagnosticsProvider}
 */
class AntigravityServerManager {
    constructor() {
        /**
         * Indicates whether the server is undergoing intentional shutdown to suppress false-positive crash telemetry.
         */
        this.isStopping = false;
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
     * Lazily initializes or returns the host-level BufferedOutputChannel.
     * @public
     * @return {!tsickle_buffered_output_channel_11.BufferedOutputChannel}
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
     * @return {(undefined|!tsickle_buffered_output_channel_11.BufferedOutputChannel)}
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
     * @return {!Promise<!tsickle_delegate_interfaces_3.HostDiagnostics>}
     */
    async getHostDiagnostics() {
        /** @type {string} */
        const binaryPath = this.getInstalledTargetPath();
        /** @type {(undefined|string)} */
        let binaryVersion;
        try {
            binaryVersion = await (0, binary_downloader_1.getBinaryVersionString)(binaryPath);
        }
        catch {
            // Binary might not be installed or executable yet.
        }
        return {
            installLogs: this.getOutputChannelLogs(),
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
     * @param {!tsickle_vscode_9.ExtensionContext} context
     * @param {(undefined|!tsickle_vscode_9.Progress<{message: (undefined|string), increment: (undefined|number)}>)=} progress
     * @param {(undefined|!tsickle_vscode_9.WorkspaceConfiguration)=} configOverride
     * @return {!Promise<string>}
     */
    async acquireInstalledBinaryPath(context, progress, configOverride) {
        initializeHostSecurityEnvironment();
        configureHostProxyEnvironment(configOverride);
        /** @type {!tsickle_buffered_output_channel_11.BufferedOutputChannel} */
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
     * @param {!tsickle_vscode_9.ExtensionContext} context
     * @param {(undefined|!tsickle_vscode_9.WorkspaceConfiguration)=} configOverride
     * @return {!Promise<string>}
     */
    async acquireBinaryPath(context, configOverride) {
        return await this.acquireInstalledBinaryPath(context, undefined, configOverride);
    }
    /**
     * Polls the specified HTTP URL until it returns a healthy status code (200-499) or times out.
     * @public
     * @param {string} url
     * @param {number=} timeoutMs
     * @return {!Promise<boolean>}
     */
    async waitForServerReady(url, timeoutMs = 15000) {
        /** @type {number} */
        const start = Date.now();
        /** @type {number} */
        let attempt = 0;
        while (Date.now() - start < timeoutMs) {
            attempt++;
            try {
                /** @type {boolean} */
                const healthy = await new Promise((/**
                 * @param {function((boolean|!PromiseLike<boolean>)): void} resolve
                 * @return {void}
                 */
                (resolve) => {
                    const req = http.get(url, (/**
                     * @param {?} res
                     * @return {void}
                     */
                    (res) => {
                        resolve(res.statusCode !== undefined &&
                            res.statusCode >= 200 &&
                            res.statusCode < 500);
                    }));
                    req.on('error', (/**
                     * @return {void}
                     */
                    () => {
                        resolve(false);
                    }));
                    req.setTimeout(1000, (/**
                     * @return {void}
                     */
                    () => {
                        req.destroy();
                        resolve(false);
                    }));
                }));
                if (healthy) {
                    this.outputChannel?.appendLine(`[LAUNCH] Server at ${url} is READY after ${attempt} attempt(s).`);
                    return true;
                }
            }
            catch {
                // Retry
            }
            await new Promise((/**
             * @param {function((void|!PromiseLike<void>)): void} r
             * @return {void}
             */
            (r) => {
                setTimeout(r, 250);
            }));
        }
        this.outputChannel?.appendLine(`[LAUNCH ERROR] Timed out waiting for server at ${url} after ${timeoutMs}ms.`);
        return false;
    }
    /**
     * Starts the Antigravity backend language server (`agy --hub`).
     *
     * @public
     * @param {(!tsickle_vscode_9.ExtensionContext|!ServerStartOptions)} optionsOrContext Either a ServerStartOptions object or the active VS Code extension context.
     * @param {(undefined|!tsickle_loading_message_impl_4.MessageNotifierImpl)=} messageNotifier Optional loading notifier to report progress status (legacy parameter).
     * @param {(undefined|!tsickle_vscode_9.WorkspaceConfiguration)=} configOverride Optional workspace configuration override (legacy parameter).
     * @param {(undefined|!tsickle_delegate_interfaces_3.Telemetry)=} telemetry Optional telemetry service to log start duration (`duration_ms`) and failure telemetry (legacy parameter).
     * @return {!Promise<string>}
     */
    async start(optionsOrContext, messageNotifier, configOverride, telemetry) {
        /** @type {!ServerStartOptions} */
        const options = typeof ((/** @type {!tsickle_vscode_9.ExtensionContext} */ (optionsOrContext))).subscriptions !==
            'undefined'
            ? {
                context: (/** @type {!tsickle_vscode_9.ExtensionContext} */ (optionsOrContext)),
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
        /** @type {number} */
        const startTime = Date.now();
        void activeTelemetry?.logEvent(telemetry_constants_1.AntigravityEvent.SERVER_START);
        this.startingPromise = ((/**
         * @return {!Promise<string>}
         */
        async () => {
            /** @type {(undefined|number)} */
            let startupExitCode;
            try {
                /** @type {(undefined|number)} */
                const configuredPort = vscode.workspace
                    .getConfiguration('antigravity')
                    .get('serverPort');
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
                ];
                /** @type {!ReadonlyArray<!tsickle_vscode_9.WorkspaceFolder>} */
                const workspaceFolders = vscode.workspace.workspaceFolders ?? [];
                for (const folder of workspaceFolders) {
                    if (folder?.uri?.fsPath) {
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
                /** @type {string} */
                const activeCwd = workspaceFolders[0]?.uri?.fsPath ?? context.extensionPath;
                const serverEnv = buildServerEnvironment({
                    configOverride: options.configOverride,
                });
                this.serverProcess = (0, child_process_1.spawn)(binaryPath, args, {
                    cwd: activeCwd,
                    env: serverEnv,
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
                            if (line.startsWith('ANTIGRAVITY_OPEN_URL:')) {
                                /** @type {string} */
                                const url = line
                                    .substring('ANTIGRAVITY_OPEN_URL:'.length)
                                    .trim();
                                this.outputChannel?.appendLine(`[LAUNCH] Intercepted auth URL: ${url}`);
                                try {
                                    /** @type {!tsickle_vscode_9.Uri} */
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
                        }
                    }));
                }
                // Log telemetry when the process fails to spawn directly (e.g. executable not runnable).
                this.serverProcess.on('error', (/**
                 * @param {!Error} err
                 * @return {void}
                 */
                (err) => {
                    this.outputChannel?.appendLine(`[LAUNCH PROCESS ERROR] Failed to spawn process: ${err.message}`);
                    void activeTelemetry?.logError?.(telemetry_constants_1.AntigravityEvent.SERVER_CRASH, {
                        'exit_code': -1,
                        'error': err.message,
                        'stack': err.stack,
                        'failure_reason': 'spawn_error',
                    });
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
                        startupExitCode = code ?? -1;
                    }
                    /** @type {string} */
                    const msg = `[LAUNCH ERROR] Server process exited unexpectedly with code ${code}, signal ${signal}`;
                    console.error(msg);
                    this.outputChannel?.appendLine(msg);
                    if (!this.isStopping && (code !== 0 || signal !== null)) {
                        void activeTelemetry?.logError?.(telemetry_constants_1.AntigravityEvent.SERVER_CRASH, {
                            'exit_code': code ?? -1,
                            'signal': signal || 'none',
                            'error': msg,
                            'failure_reason': signal
                                ? `killed_by_${signal}`
                                : 'process_exit_nonzero',
                        });
                    }
                    this.serverProcess = undefined;
                    this.serverUrl = undefined;
                }));
                /** @type {boolean} */
                const ready = await this.waitForServerReady(backendUrl);
                if (!ready) {
                    await this.stop();
                    throw new Error(`Server failed to start at ${backendUrl}`);
                }
                this.serverUrl = backendUrl;
                /** @type {number} */
                const durationMs = Date.now() - startTime;
                void activeTelemetry?.logEvent(telemetry_constants_1.AntigravityEvent.SERVER_START_SUCCESS, {
                    'duration_ms': durationMs,
                    'success': true,
                });
                return this.serverUrl;
            }
            catch (err) {
                // Record startup failure duration, categorized reason, exit code, sanitized error message, and stack trace in telemetry.
                /** @type {number} */
                const durationMs = Date.now() - startTime;
                /** @type {string} */
                const failureReason = categorizeServerStartError(err);
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
     * @type {(undefined|!tsickle_buffered_output_channel_11.BufferedOutputChannel)}
     * @private
     */
    AntigravityServerManager.prototype.outputChannel;
    /**
     * @type {(undefined|!Promise<string>)}
     * @private
     */
    AntigravityServerManager.prototype.startingPromise;
    /**
     * Indicates whether the server is undergoing intentional shutdown to suppress false-positive crash telemetry.
     * @type {boolean}
     * @private
     */
    AntigravityServerManager.prototype.isStopping;
}
