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
const tsickle_delegate_interfaces_2 = goog.requireType("google3.devtools.cider.extensions.jetski.delegate_interfaces");
const tsickle_loading_message_impl_3 = goog.requireType("google3.devtools.cider.extensions.jetski.loading.loading_message_impl");
const tsickle_http_4 = goog.requireType("google3.third_party.javascript.typings.node.node.http");
const tsickle_net_5 = goog.requireType("google3.third_party.javascript.typings.node.node.net");
const tsickle_os_6 = goog.requireType("google3.third_party.javascript.typings.node.node.os");
const tsickle_readline_7 = goog.requireType("google3.third_party.javascript.typings.node.node.readline");
const tsickle_vscode_8 = goog.requireType("vscode");
const tsickle_binary_downloader_9 = goog.requireType("google3.cloud.developer_experience.antigravity_extensions.vscode.binary_downloader");
const tsickle_telemetry_constants_10 = goog.requireType("google3.cloud.developer_experience.antigravity_extensions.vscode.telemetry_constants");
const child_process_1 = goog.require('google3.third_party.javascript.typings.node.node.child_process');
const http = goog.require('google3.third_party.javascript.typings.node.node.http');
const net = goog.require('google3.third_party.javascript.typings.node.node.net');
const os = goog.require('google3.third_party.javascript.typings.node.node.os');
const readline = goog.require('google3.third_party.javascript.typings.node.node.readline');
const vscode = goog.require('vscode'); // from //third_party/javascript/typings/vscode
// from //third_party/javascript/typings/vscode
const binary_downloader_1 = goog.require('google3.cloud.developer_experience.antigravity_extensions.vscode.binary_downloader');
const telemetry_constants_1 = goog.require('google3.cloud.developer_experience.antigravity_extensions.vscode.telemetry_constants');
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
     * @type {!tsickle_vscode_8.ExtensionContext}
     * @public
     */
    ServerStartOptions.prototype.context;
    /**
     * Optional loading notifier to report progress status.
     * @type {(undefined|!tsickle_loading_message_impl_3.MessageNotifierImpl)}
     * @public
     */
    ServerStartOptions.prototype.messageNotifier;
    /**
     * Optional workspace configuration override (primarily used in tests).
     * @type {(undefined|!tsickle_vscode_8.WorkspaceConfiguration)}
     * @public
     */
    ServerStartOptions.prototype.configOverride;
    /**
     * Optional telemetry service to log start duration (`duration_ms`) and failure telemetry.
     * @type {(undefined|!tsickle_delegate_interfaces_2.Telemetry)}
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
 */
class AntigravityServerManager {
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
     * Resolves the local persistent installed binary (`~/.gemini/bin/agy`) path.
     * @public
     * @return {string}
     */
    getInstalledTargetPath() {
        return (0, binary_downloader_1.getInstalledTargetPath)();
    }
    /**
     * Executes the Dynamic Auto-Installation state machine via `binary_downloader.ts`.
     * @public
     * @param {!tsickle_vscode_8.ExtensionContext} context
     * @param {(undefined|!tsickle_vscode_8.Progress<{message: (undefined|string), increment: (undefined|number)}>)=} progress
     * @param {(undefined|!tsickle_vscode_8.WorkspaceConfiguration)=} configOverride
     * @return {!Promise<string>}
     */
    async acquireInstalledBinaryPath(context, progress, configOverride) {
        if (!this.outputChannel) {
            this.outputChannel = vscode.window.createOutputChannel('Antigravity');
        }
        return await (0, binary_downloader_1.acquireInstalledBinaryPath)({
            context,
            outputChannel: this.outputChannel,
            progress,
            configOverride,
            targetPathOverride: this.getInstalledTargetPath(),
        });
    }
    /**
     * Resolves the Antigravity language server executable path via the Auto-Install approach (`~/.gemini/bin/agy`).
     * @public
     * @param {!tsickle_vscode_8.ExtensionContext} context
     * @param {(undefined|!tsickle_vscode_8.WorkspaceConfiguration)=} configOverride
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
     * @param {(!tsickle_vscode_8.ExtensionContext|!ServerStartOptions)} optionsOrContext Either a ServerStartOptions object or the active VS Code extension context.
     * @param {(undefined|!tsickle_loading_message_impl_3.MessageNotifierImpl)=} messageNotifier Optional loading notifier to report progress status (legacy parameter).
     * @param {(undefined|!tsickle_vscode_8.WorkspaceConfiguration)=} configOverride Optional workspace configuration override (legacy parameter).
     * @param {(undefined|!tsickle_delegate_interfaces_2.Telemetry)=} telemetry Optional telemetry service to log start duration (`duration_ms`) and failure telemetry (legacy parameter).
     * @return {!Promise<string>}
     */
    async start(optionsOrContext, messageNotifier, configOverride, telemetry) {
        /** @type {!ServerStartOptions} */
        const options = typeof ((/** @type {!tsickle_vscode_8.ExtensionContext} */ (optionsOrContext))).subscriptions !==
            'undefined'
            ? {
                context: (/** @type {!tsickle_vscode_8.ExtensionContext} */ (optionsOrContext)),
                messageNotifier,
                configOverride,
                telemetry,
            }
            : ((/** @type {!ServerStartOptions} */ (optionsOrContext)));
        const { context, telemetry: activeTelemetry } = options;
        if (!this.outputChannel) {
            this.outputChannel = vscode.window.createOutputChannel('Antigravity');
        }
        if (this.startingPromise) {
            return this.startingPromise;
        }
        if (this.serverProcess && this.serverUrl) {
            return this.serverUrl;
        }
        /** @type {number} */
        const startTime = Date.now();
        void activeTelemetry?.logEvent(telemetry_constants_1.AntigravityEvent.SERVER_START);
        this.startingPromise = ((/**
         * @return {!Promise<string>}
         */
        async () => {
            try {
                /** @type {string} */
                const binaryPath = await this.acquireBinaryPath(context, options.configOverride);
                /** @type {number} */
                const port = await getAvailableEphemeralPort();
                /** @type {!Array<string>} */
                const args = [
                    '--hub',
                    `--hub-port=${port}`,
                    '--app_data_dir=antigravity',
                ];
                /** @type {!ReadonlyArray<!tsickle_vscode_8.WorkspaceFolder>} */
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
                this.serverProcess = (0, child_process_1.spawn)(binaryPath, args, {
                    cwd: activeCwd,
                    env: {
                        ...process.env,
                        ['HOME']: os.homedir(),
                        ['USERPROFILE']: os.homedir(),
                        ['AGY_ENABLE_HUB']: '1',
                        ['ANTIGRAVITY_VSCODE_HOST']: '1',
                        ['ANTIGRAVITY_AUTH_SUCCESS_APP']: vscode.env.uriScheme || 'vscode',
                    },
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
                                    /** @type {!tsickle_vscode_8.Uri} */
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
                /** @type {string} */
                const backendUrl = `http://127.0.0.1:${port}`;
                this.serverProcess.on('error', (/**
                 * @param {!Error} err
                 * @return {void}
                 */
                (err) => {
                    this.outputChannel?.appendLine(`[LAUNCH PROCESS ERROR] Failed to spawn process: ${err.message}`);
                }));
                this.serverProcess.on('exit', (/**
                 * @param {(null|number)} code
                 * @param {(null|string)} signal
                 * @return {void}
                 */
                (code, signal) => {
                    /** @type {string} */
                    const msg = `[LAUNCH ERROR] Server process exited unexpectedly with code ${code}, signal ${signal}`;
                    console.error(msg);
                    this.outputChannel?.appendLine(msg);
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
                /** @type {number} */
                const durationMs = Date.now() - startTime;
                /** @type {string} */
                const failureReason = categorizeServerStartError(err);
                void activeTelemetry?.logError?.(telemetry_constants_1.AntigravityEvent.SERVER_START_FAILURE, {
                    'duration_ms': durationMs,
                    'failure_reason': failureReason,
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
     * @type {(undefined|!tsickle_vscode_8.OutputChannel)}
     * @private
     */
    AntigravityServerManager.prototype.outputChannel;
    /**
     * @type {(undefined|!Promise<string>)}
     * @private
     */
    AntigravityServerManager.prototype.startingPromise;
}
