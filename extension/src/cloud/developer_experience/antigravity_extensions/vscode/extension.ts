/**
 * @fileoverview added by tsickle
 * Generated from: cloud/developer_experience/antigravity_extensions/vscode/extension.ts
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
goog.module('google3.cloud.developer_experience.antigravity_extensions.vscode.extension');
var module = module || { id: 'cloud/developer_experience/antigravity_extensions/vscode/extension.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_vscode_1 = goog.requireType("vscode");
const tsickle_core_activation_2 = goog.requireType("google3.devtools.cider.extensions.jetski.core_activation");
const tsickle_delegate_interfaces_3 = goog.requireType("google3.devtools.cider.extensions.jetski.delegate_interfaces");
const tsickle_agent_edit_manager_4 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.agent_edit_manager");
const tsickle_hunk_storage_5 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.hunk_storage");
const tsickle_inline_diff_zone_renderer_6 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.inline_diff_zone_renderer");
const tsickle_side_by_side_diff_zone_renderer_7 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.side_by_side_diff_zone_renderer");
const tsickle_loading_message_impl_8 = goog.requireType("google3.devtools.cider.extensions.jetski.loading.loading_message_impl");
const tsickle_export_symbol_9 = goog.requireType("google3.javascript.tools.nodejs.export_symbol");
const tsickle_desktop_webview_delegate_10 = goog.requireType("google3.cloud.developer_experience.antigravity_extensions.vscode.desktop_webview_delegate");
const tsickle_server_manager_11 = goog.requireType("google3.cloud.developer_experience.antigravity_extensions.vscode.server_manager");
const tsickle_status_bar_12 = goog.requireType("google3.cloud.developer_experience.antigravity_extensions.vscode.status_bar");
const tsickle_telemetry_service_13 = goog.requireType("google3.cloud.developer_experience.antigravity_extensions.vscode.telemetry_service");
const vscode = goog.require('vscode'); // from //third_party/javascript/typings/vscode
// from //third_party/javascript/typings/vscode
const core_activation_1 = goog.require('google3.devtools.cider.extensions.jetski.core_activation');
const agent_edit_manager_1 = goog.require('google3.devtools.cider.extensions.jetski.diff_zones.agent_edit_manager');
const hunk_storage_1 = goog.require('google3.devtools.cider.extensions.jetski.diff_zones.hunk_storage');
const inline_diff_zone_renderer_1 = goog.require('google3.devtools.cider.extensions.jetski.diff_zones.inline_diff_zone_renderer');
const side_by_side_diff_zone_renderer_1 = goog.require('google3.devtools.cider.extensions.jetski.diff_zones.side_by_side_diff_zone_renderer');
const export_symbol_1 = goog.require('google3.javascript.tools.nodejs.export_symbol');
const desktop_webview_delegate_1 = goog.require('google3.cloud.developer_experience.antigravity_extensions.vscode.desktop_webview_delegate');
const server_manager_1 = goog.require('google3.cloud.developer_experience.antigravity_extensions.vscode.server_manager');
const status_bar_1 = goog.require('google3.cloud.developer_experience.antigravity_extensions.vscode.status_bar');
const telemetry_service_1 = goog.require('google3.cloud.developer_experience.antigravity_extensions.vscode.telemetry_service');
class DesktopWorkspaceManager {
    /**
     * @public
     * @param {!tsickle_vscode_1.ExtensionContext} context
     */
    constructor(context) {
        this.context = context;
    }
    /**
     * @public
     * @param {string} workspaceUri
     * @param {(undefined|string)=} conversationId
     * @return {!Promise<void>}
     */
    async changeWorkspace(workspaceUri, conversationId) {
        await this.context.globalState.update('antigravity.pendingConversationId', conversationId || 'new');
        /** @type {!tsickle_vscode_1.Uri} */
        const uri = vscode.Uri.parse(workspaceUri);
        await vscode.commands.executeCommand('vscode.openFolder', uri);
    }
}
/* istanbul ignore if */
if (false) {
    /**
     * @const {!tsickle_vscode_1.ExtensionContext}
     * @private
     */
    DesktopWorkspaceManager.prototype.context;
}
/**
 * Resolves or boots the Antigravity backend server process for desktop VS Code.
 *
 * @param {!tsickle_vscode_1.ExtensionContext} context The active VS Code extension context.
 * @param {!tsickle_loading_message_impl_8.MessageNotifierImpl} messageNotifier Loading message notifier for status updates.
 * @param {(undefined|!tsickle_delegate_interfaces_3.Telemetry)=} telemetry Telemetry service for recording start latency and diagnostics.
 * @return {!Promise<{effectiveUrl: string, humanReadable: string}>}
 */
async function desktopSetup(context, messageNotifier, telemetry) {
    /** @type {!tsickle_vscode_1.WorkspaceConfiguration} */
    const config = vscode.workspace.getConfiguration('antigravity');
    /** @type {(undefined|string)} */
    let serverUrl = process?.env['ANTIGRAVITY_SERVER_URL'] || config.get('serverUrl');
    /** @type {string} */
    let humanReadable;
    if (serverUrl) {
        humanReadable = `Remote Antigravity server`;
    }
    else {
        /** @type {!tsickle_server_manager_11.AntigravityServerManager} */
        const serverManager = server_manager_1.AntigravityServerManager.getInstance();
        // Wrap server acquisition in a recovery loop. If automatic retries exhaust (e.g. on first-time install
        // when offline), display the error in the sidebar webview with a "Retry" button via messageNotifier
        // instead of crashing extension activation.
        while (!serverUrl) {
            try {
                messageNotifier.notifyMessage('Setting up Antigravity server...');
                serverUrl = await serverManager.start({
                    context,
                    messageNotifier,
                    telemetry,
                });
            }
            catch (e) {
                /** @type {string} */
                const errorMsg = e instanceof Error ? (/** @type {!Error} */ (e)).message : String(e);
                messageNotifier.notifyError(errorMsg);
                // Suspend until the user clicks the "Retry" button in the webview sidebar,
                // which triggers onRetry and restarts the installation attempt.
                await new Promise((/**
                 * @param {function((void|!PromiseLike<void>)): void} resolve
                 * @return {void}
                 */
                (resolve) => {
                    /** @type {!tsickle_vscode_1.Disposable} */
                    const disposable = messageNotifier.onRetry((/**
                     * @return {void}
                     */
                    () => {
                        disposable.dispose();
                        resolve();
                    }));
                }));
            }
        }
        humanReadable = `Installed Antigravity`;
    }
    /** @type {!tsickle_vscode_1.Uri} */
    const externalUri = await vscode.env.asExternalUri(vscode.Uri.parse(serverUrl));
    /** @type {string} */
    const effectiveUrl = externalUri.toString().replace(/\/$/, '');
    return {
        effectiveUrl,
        humanReadable,
    };
}
/**
 * Activates the Antigravity desktop extension.
 * @param {!tsickle_vscode_1.ExtensionContext} context
 * @return {void}
 */
function activate(context) {
    (0, status_bar_1.registerAntigravityStatusBar)(context);
    // Command to clear persistent conversation and diff state from workspaceState:
    // - 'lastConversationId': The conversation route to restore on reload. If pointing to a deleted
    //   trajectory on disk, resetting this allows the extension to boot into a fresh chat.
    // - RESOLVED_HUNKS_KEY ('jetski.resolvedHunks'): Records accepted/rejected inline diff actions.
    // - CONTENT_SNAPSHOTS_KEY ('jetski.contentSnapshots'): File content hashes used by DiffZone to
    //   detect external edits.
    context.subscriptions.push(vscode.commands.registerCommand('antigravity.resetConversationState', (/**
     * @return {!Promise<void>}
     */
    async () => {
        await context.workspaceState.update('lastConversationId', undefined);
        await context.workspaceState.update(hunk_storage_1.RESOLVED_HUNKS_KEY, undefined);
        await context.workspaceState.update(hunk_storage_1.CONTENT_SNAPSHOTS_KEY, undefined);
        void vscode.window.showInformationMessage('Antigravity conversation state reset.');
    })));
    context.subscriptions.push(vscode.commands.registerCommand('antigravity.showThirdPartyNotices', (/**
     * @return {!Promise<void>}
     */
    async () => {
        /** @type {!tsickle_vscode_1.Uri} */
        const noticesUri = vscode.Uri.joinPath(context.extensionUri, 'ThirdPartyNotices.txt');
        try {
            /** @type {!tsickle_vscode_1.TextDocument} */
            const doc = await vscode.workspace.openTextDocument(noticesUri);
            await vscode.window.showTextDocument(doc);
        }
        catch (e) {
            void vscode.window.showErrorMessage(`Failed to open ThirdPartyNotices.txt: ${e instanceof Error ? (/** @type {!Error} */ (e)).message : e}`);
        }
    })));
    context.subscriptions.push(vscode.commands.registerCommand('antigravity.toggleInlineDiff', (/**
     * @return {!Promise<void>}
     */
    async () => {
        /** @type {!tsickle_vscode_1.WorkspaceConfiguration} */
        const config = vscode.workspace.getConfiguration('antigravity');
        /** @type {boolean} */
        const current = config.get('enableInlineDiff', true);
        await config.update('enableInlineDiff', !current);
        void vscode.window.showInformationMessage(`Antigravity Inline Diff ${!current ? 'enabled' : 'disabled'}.`);
    })));
    // If the user has no folders open, they should start fresh in standalone mode
    // rather than restoring a project-specific conversation.
    if (!vscode.workspace.workspaceFolders ||
        vscode.workspace.workspaceFolders.length === 0) {
        context.workspaceState.update('lastConversationId', undefined);
    }
    // Restore pending conversation ID across window reloads/workspace switches.
    /** @type {(undefined|string)} */
    const pendingConvoId = context.globalState.get('antigravity.pendingConversationId');
    if (pendingConvoId) {
        if (pendingConvoId === 'new') {
            context.workspaceState.update('lastConversationId', undefined);
        }
        else {
            context.workspaceState.update('lastConversationId', pendingConvoId);
        }
        context.globalState.update('antigravity.pendingConversationId', undefined);
    }
    const { telemetry } = (0, telemetry_service_1.initTelemetry)(context);
    /** @type {!DesktopWorkspaceManager} */
    const workspaceManager = new DesktopWorkspaceManager(context);
    /** @type {!tsickle_desktop_webview_delegate_10.DesktopWebviewDelegate} */
    const webviewDelegate = new desktop_webview_delegate_1.DesktopWebviewDelegate(context);
    context.subscriptions.push(vscode.window.registerUriHandler({
        /**
         * @public
         * @param {!tsickle_vscode_1.Uri} uri
         * @return {undefined}
         */
        handleUri(uri) {
            if (uri.path === '/oauth-success' || uri.path === '/auth-success') {
                vscode.window.setStatusBarMessage('Antigravity: Sign-in successful', 3000);
                void vscode.commands
                    .executeCommand('antigravity.panel.focus')
                    .then(undefined, (/**
                 * @return {void}
                 */
                () => { }));
            }
        },
    }));
    context.subscriptions.push({
        dispose: (/**
         * @return {void}
         */
        () => {
            server_manager_1.AntigravityServerManager.getInstance().stop();
        }),
    });
    // The viewLocation must match the default container location configured in package.json.
    /** @type {!tsickle_delegate_interfaces_3.HostAppConfig} */
    const desktopNaming = {
        prefix: 'antigravity',
        viewId: 'antigravity.panel',
        artifactEditorId: 'antigravity.artifactEditor',
        storageKey: 'antigravity-storage',
        displayName: 'Antigravity',
        logChannelName: 'Antigravity LS',
        viewLocation: 'sidebar',
    };
    /** @type {!tsickle_agent_edit_manager_4.AgentEditManager} */
    const agentEditManager = new agent_edit_manager_1.AgentEditManager(context, (/**
     * @return {(!tsickle_inline_diff_zone_renderer_6.InlineDiffZoneRenderer|!tsickle_side_by_side_diff_zone_renderer_7.SideBySideDiffZoneRenderer)}
     */
    () => {
        /** @type {!tsickle_vscode_1.WorkspaceConfiguration} */
        const config = vscode.workspace.getConfiguration('antigravity');
        return config.get('enableInlineDiff', true)
            ? new inline_diff_zone_renderer_1.InlineDiffZoneRenderer()
            : new side_by_side_diff_zone_renderer_1.SideBySideDiffZoneRenderer();
    }), {
        autoAcceptOnChat: false,
        ageOutThreshold: 5,
    });
    context.subscriptions.push(agentEditManager);
    context.subscriptions.push(vscode.workspace.onDidChangeConfiguration((/**
     * @param {!tsickle_vscode_1.ConfigurationChangeEvent} e
     * @return {!Promise<void>}
     */
    async (e) => {
        if (e.affectsConfiguration('antigravity.enableInlineDiff')) {
            agentEditManager.updateDiffZoneRenderer();
        }
        if (e.affectsConfiguration('antigravity.serverPort')) {
            /** @type {(undefined|string)} */
            const action = await vscode.window.showInformationMessage('Changing the Antigravity server port requires reloading the window to take effect.', 'Reload Window');
            if (action === 'Reload Window') {
                void vscode.commands.executeCommand('workbench.action.reloadWindow');
            }
        }
    })));
    (0, core_activation_1.activateWithDependencies)(context, {
        agentEditManager,
        telemetry,
        workspaceManager,
        webviewDelegate,
        setupFn: (/**
         * @param {!tsickle_vscode_1.ExtensionContext} ctx
         * @param {!tsickle_loading_message_impl_8.MessageNotifierImpl} notifier
         * @return {!Promise<{effectiveUrl: string, humanReadable: string}>}
         */
        (ctx, notifier) => desktopSetup(ctx, notifier, telemetry)),
    }, desktopNaming);
}
exports.activate = activate;
/**
 * Deactivates the Antigravity desktop extension and stops background server processes.
 * @return {!Promise<void>}
 */
async function deactivate() {
    await server_manager_1.AntigravityServerManager.getInstance().stop();
}
exports.deactivate = deactivate;
(0, export_symbol_1.exportNodejsSymbol)('activate', activate);
(0, export_symbol_1.exportNodejsSymbol)('deactivate', deactivate);
