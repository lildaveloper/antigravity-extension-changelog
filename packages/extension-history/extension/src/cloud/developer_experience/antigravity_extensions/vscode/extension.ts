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
const tsickle_inline_diff_manager_6 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.inline_diff_manager");
const tsickle_inline_diff_zone_renderer_7 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.inline_diff_zone_renderer");
const tsickle_resolved_diff_decorations_8 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.resolved_diff_decorations");
const tsickle_side_by_side_diff_zone_renderer_9 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.side_by_side_diff_zone_renderer");
const tsickle_side_by_side_review_actions_10 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.side_by_side_review_actions");
const tsickle_export_symbol_11 = goog.requireType("google3.javascript.tools.nodejs.export_symbol");
const tsickle_auto_save_notice_12 = goog.requireType("google3.cloud.developer_experience.antigravity_extensions.vscode.auto_save_notice");
const tsickle_cde_auth_service_13 = goog.requireType("google3.cloud.developer_experience.antigravity_extensions.vscode.cde_auth_service");
const tsickle_deferred_renderer_switch_14 = goog.requireType("google3.cloud.developer_experience.antigravity_extensions.vscode.deferred_renderer_switch");
const tsickle_server_manager_15 = goog.requireType("google3.cloud.developer_experience.antigravity_extensions.vscode.server_manager");
const tsickle_status_bar_16 = goog.requireType("google3.cloud.developer_experience.antigravity_extensions.vscode.status_bar");
const tsickle_telemetry_service_17 = goog.requireType("google3.cloud.developer_experience.antigravity_extensions.vscode.telemetry_service");
const tsickle_vscode_notification_delegate_18 = goog.requireType("google3.cloud.developer_experience.antigravity_extensions.vscode.vscode_notification_delegate");
const tsickle_webview_delegate_19 = goog.requireType("google3.cloud.developer_experience.antigravity_extensions.vscode.webview_delegate");
const tsickle_loading_message_impl_20 = goog.requireType("google3.devtools.cider.extensions.jetski.loading.loading_message_impl");
const vscode = goog.require('vscode'); // from //third_party/javascript/typings/vscode
// from //third_party/javascript/typings/vscode
const core_activation_1 = goog.require('google3.devtools.cider.extensions.jetski.core_activation');
const agent_edit_manager_1 = goog.require('google3.devtools.cider.extensions.jetski.diff_zones.agent_edit_manager');
const hunk_storage_1 = goog.require('google3.devtools.cider.extensions.jetski.diff_zones.hunk_storage');
const inline_diff_manager_1 = goog.require('google3.devtools.cider.extensions.jetski.diff_zones.inline_diff_manager');
const inline_diff_zone_renderer_1 = goog.require('google3.devtools.cider.extensions.jetski.diff_zones.inline_diff_zone_renderer');
const resolved_diff_decorations_1 = goog.require('google3.devtools.cider.extensions.jetski.diff_zones.resolved_diff_decorations');
const side_by_side_diff_zone_renderer_1 = goog.require('google3.devtools.cider.extensions.jetski.diff_zones.side_by_side_diff_zone_renderer');
const side_by_side_review_actions_1 = goog.require('google3.devtools.cider.extensions.jetski.diff_zones.side_by_side_review_actions');
const export_symbol_1 = goog.require('google3.javascript.tools.nodejs.export_symbol');
const auto_save_notice_1 = goog.require('google3.cloud.developer_experience.antigravity_extensions.vscode.auto_save_notice');
const cde_auth_service_1 = goog.require('google3.cloud.developer_experience.antigravity_extensions.vscode.cde_auth_service');
const deferred_renderer_switch_1 = goog.require('google3.cloud.developer_experience.antigravity_extensions.vscode.deferred_renderer_switch');
const server_manager_1 = goog.require('google3.cloud.developer_experience.antigravity_extensions.vscode.server_manager');
const status_bar_1 = goog.require('google3.cloud.developer_experience.antigravity_extensions.vscode.status_bar');
const telemetry_service_1 = goog.require('google3.cloud.developer_experience.antigravity_extensions.vscode.telemetry_service');
const vscode_notification_delegate_1 = goog.require('google3.cloud.developer_experience.antigravity_extensions.vscode.vscode_notification_delegate');
const webview_delegate_1 = goog.require('google3.cloud.developer_experience.antigravity_extensions.vscode.webview_delegate');
/**
 * Public API exposed by the Antigravity extension upon activation.
 * @record
 */
function AntigravityExtensionApi() { }
exports.AntigravityExtensionApi = AntigravityExtensionApi;
/* istanbul ignore if */
if (false) {
    /**
     * The random CSRF token passed to the Antigravity backend language server.
     * @type {string}
     * @public
     */
    AntigravityExtensionApi.prototype.csrfToken;
    /**
     * The active server port if started locally.
     * @const {(undefined|number)}
     * @public
     */
    AntigravityExtensionApi.prototype.port;
}
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
 * @return {(undefined|string)}
 */
function getConfiguredServerUrl() {
    return (process?.env['ANTIGRAVITY_SERVER_URL'] ||
        vscode.workspace.getConfiguration('antigravity').get('serverUrl'));
}
/**
 * Interface representing the loading notification surface used during extension setup.
 * @record
 */
function MessageNotifier() { }
exports.MessageNotifier = MessageNotifier;
/* istanbul ignore if */
if (false) {
    /**
     * Event triggered when the user clicks the retry or action button.
     * @const {!tsickle_vscode_1.Event<void>}
     * @public
     */
    MessageNotifier.prototype.onRetry;
    /**
     * Notifies the loading indicator with an informational message.
     * @public
     * @param {(undefined|string)=} message
     * @return {void}
     */
    MessageNotifier.prototype.notifyMessage = function (message) { };
    /**
     * Notifies the loading indicator with an error.
     * @public
     * @param {string} error
     * @return {void}
     */
    MessageNotifier.prototype.notifyError = function (error) { };
    /**
     * Prompts the user to authenticate in the loading view.
     * @public
     * @param {(undefined|{title: (undefined|string), subtitle: (undefined|string), buttonLabel: (undefined|string)})=} options
     * @return {void}
     */
    MessageNotifier.prototype.promptAuth = function (options) { };
}
/**
 * Suspends until the user triggers a retry or user action in the loading webview.
 * @param {!MessageNotifier} messageNotifier
 * @return {!Promise<void>}
 */
function waitForRetry(messageNotifier) {
    return new Promise((/**
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
/**
 * Formats a server URL into an external URI string and human-readable label.
 * @param {string} serverUrl
 * @param {string} humanReadable
 * @return {!Promise<{effectiveUrl: string, humanReadable: string}>}
 */
async function formatEffectiveServerUrl(serverUrl, humanReadable) {
    /** @type {!tsickle_vscode_1.Uri} */
    const externalUri = await vscode.env.asExternalUri(vscode.Uri.parse(serverUrl));
    return {
        effectiveUrl: externalUri.toString().replace(/\/$/, ''),
        humanReadable,
    };
}
/**
 * Starts the Antigravity backend language server with user-facing retry on failure.
 * @param {!tsickle_vscode_1.ExtensionContext} context
 * @param {!MessageNotifier} messageNotifier
 * @param {(undefined|!tsickle_delegate_interfaces_3.Telemetry)=} telemetry
 * @return {!Promise<string>}
 */
async function startServerWithRecovery(context, messageNotifier, telemetry) {
    /** @type {!tsickle_server_manager_15.AntigravityServerManager} */
    const serverManager = server_manager_1.AntigravityServerManager.getInstance();
    while (true) {
        try {
            messageNotifier.notifyMessage('Setting up Antigravity server...');
            return await serverManager.start({
                context,
                telemetry,
            });
        }
        catch (e) {
            /** @type {string} */
            const errorMsg = e instanceof Error ? (/** @type {!Error} */ (e)).message : String(e);
            serverManager.setLastStartupError(errorMsg);
            messageNotifier.notifyError(errorMsg);
            await waitForRetry(messageNotifier);
            serverManager.setLastStartupError(undefined);
        }
    }
}
/**
 * Resolves or boots the Antigravity backend server process for Desktop VS Code.
 *
 * @param {!tsickle_vscode_1.ExtensionContext} context The active VS Code extension context.
 * @param {!MessageNotifier} messageNotifier Loading message notifier for status updates.
 * @param {(undefined|!tsickle_delegate_interfaces_3.Telemetry)=} telemetry Telemetry service for recording start latency and diagnostics.
 * @return {!Promise<{effectiveUrl: string, humanReadable: string}>}
 */
async function desktopSetup(context, messageNotifier, telemetry) {
    /** @type {(undefined|string)} */
    const configuredUrl = getConfiguredServerUrl();
    if (configuredUrl) {
        return formatEffectiveServerUrl(configuredUrl, 'Remote Antigravity server');
    }
    /** @type {string} */
    const serverUrl = await startServerWithRecovery(context, messageNotifier, telemetry);
    return formatEffectiveServerUrl(serverUrl, 'Installed Antigravity');
}
/**
 * Verifies whether valid CDE authentication credentials already exist,
 * retrying if binary acquisition fails.
 * @param {!tsickle_vscode_1.ExtensionContext} context
 * @param {!MessageNotifier} messageNotifier
 * @return {!Promise<boolean>}
 */
async function verifyCdePreFlightAuth(context, messageNotifier) {
    /** @type {!tsickle_server_manager_15.AntigravityServerManager} */
    const serverManager = server_manager_1.AntigravityServerManager.getInstance();
    while (true) {
        try {
            messageNotifier.notifyMessage('Checking Antigravity setup...');
            return await serverManager.checkCdeAuth(context);
        }
        catch (e) {
            /** @type {string} */
            const errorMsg = e instanceof Error ? (/** @type {!Error} */ (e)).message : String(e);
            messageNotifier.notifyError(errorMsg);
            await waitForRetry(messageNotifier);
        }
    }
}
/**
 * Prompts the user to log in and runs the interactive terminal authentication flow,
 * retrying upon user request if the process fails or is aborted.
 * @param {!tsickle_vscode_1.ExtensionContext} context
 * @param {!MessageNotifier} messageNotifier
 * @return {!Promise<void>}
 */
async function runInteractiveCdeLogin(context, messageNotifier) {
    /** @type {!tsickle_server_manager_15.AntigravityServerManager} */
    const serverManager = server_manager_1.AntigravityServerManager.getInstance();
    while (true) {
        messageNotifier.promptAuth({
            title: 'Sign in to Antigravity',
            subtitle: 'Sign in with your Google account to start using Antigravity in this Cloud Developer Environment.',
            buttonLabel: 'Log In',
        });
        await waitForRetry(messageNotifier);
        messageNotifier.notifyMessage('Waiting for terminal authorization...');
        try {
            /** @type {boolean} */
            const loginSuccess = await serverManager.runCdeLoginTerminal(context);
            if (loginSuccess) {
                return;
            }
        }
        catch (e) {
            /** @type {string} */
            const errorMsg = e instanceof Error ? (/** @type {!Error} */ (e)).message : String(e);
            messageNotifier.notifyError(errorMsg);
            await waitForRetry(messageNotifier);
        }
    }
}
/**
 * Ensures valid credentials exist in Cloud Developer Environments before launching the server.
 * Runs pre-flight verification and guides the user through terminal authentication if unauthenticated.
 * @param {!tsickle_vscode_1.ExtensionContext} context
 * @param {!MessageNotifier} messageNotifier
 * @return {!Promise<void>}
 */
async function ensureCdeAuthenticated(context, messageNotifier) {
    /** @type {boolean} */
    const isAuthenticated = await verifyCdePreFlightAuth(context, messageNotifier);
    if (!isAuthenticated) {
        await runInteractiveCdeLogin(context, messageNotifier);
    }
}
/**
 * Resolves or boots the Antigravity backend server process for Cloud Developer Environments (CDE).
 * Ensures credentials exist before spawning the language server process.
 *
 * @param {!tsickle_vscode_1.ExtensionContext} context The active VS Code extension context.
 * @param {!MessageNotifier} messageNotifier Loading message notifier for status updates.
 * @param {(undefined|!tsickle_delegate_interfaces_3.Telemetry)=} telemetry Telemetry service for recording start latency and diagnostics.
 * @return {!Promise<{effectiveUrl: string, humanReadable: string}>}
 */
async function cdeSetup(context, messageNotifier, telemetry) {
    /** @type {(undefined|string)} */
    const configuredUrl = getConfiguredServerUrl();
    if (configuredUrl) {
        return formatEffectiveServerUrl(configuredUrl, 'Remote Antigravity server');
    }
    await ensureCdeAuthenticated(context, messageNotifier);
    /** @type {string} */
    const serverUrl = await startServerWithRecovery(context, messageNotifier, telemetry);
    return formatEffectiveServerUrl(serverUrl, 'Installed Antigravity (CDE)');
}
/**
 * Activates the Antigravity desktop extension.
 * @param {!tsickle_vscode_1.ExtensionContext} context
 * @return {!Promise<!AntigravityExtensionApi>}
 */
async function activate(context) {
    (0, server_manager_1.initializeHostSecurityEnvironment)();
    (0, server_manager_1.configureHostProxyEnvironment)();
    (0, status_bar_1.registerAntigravityStatusBar)(context);
    // Command to clear persistent conversation and diff state from workspaceState:
    // - 'lastConversationId': The conversation route to restore on reload. If pointing to a deleted
    //   trajectory on disk, resetting this allows the extension to boot into a fresh chat.
    // - RESOLVED_HUNKS_KEY ('jetski.resolvedHunks'): Records accepted/rejected inline diff actions.
    // - CONTENT_SNAPSHOTS_KEY ('jetski.contentSnapshots'): File content hashes used by DiffZone to
    //   detect external edits.
    // - REVIEWED_CONTENTS_KEY ('jetski.reviewedContents'): The text an inline review was built
    //   from, when it differed from the turn's text; used for the read-only (Resolved) diff.
    context.subscriptions.push(vscode.commands.registerCommand('antigravity.resetConversationState', (/**
     * @return {!Promise<void>}
     */
    async () => {
        await context.workspaceState.update('lastConversationId', undefined);
        await context.workspaceState.update(hunk_storage_1.RESOLVED_HUNKS_KEY, undefined);
        await context.workspaceState.update(hunk_storage_1.CONTENT_SNAPSHOTS_KEY, undefined);
        await context.workspaceState.update(hunk_storage_1.REVIEWED_CONTENTS_KEY, undefined);
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
        void context.workspaceState.update('lastConversationId', undefined);
    }
    // Restore pending conversation ID across window reloads/workspace switches.
    /** @type {(undefined|string)} */
    const pendingConvoId = context.globalState.get('antigravity.pendingConversationId');
    if (pendingConvoId) {
        if (pendingConvoId === 'new') {
            void context.workspaceState.update('lastConversationId', undefined);
        }
        else {
            void context.workspaceState.update('lastConversationId', pendingConvoId);
        }
        void context.globalState.update('antigravity.pendingConversationId', undefined);
    }
    const { telemetry } = (0, telemetry_service_1.initTelemetry)(context);
    /** @type {!DesktopWorkspaceManager} */
    const workspaceManager = new DesktopWorkspaceManager(context);
    /** @type {!tsickle_delegate_interfaces_3.WebviewDelegate} */
    const webviewDelegate = (0, webview_delegate_1.createWebviewDelegate)(context);
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
            else if (uri.path === '/open-conversation') {
                /** @type {!URLSearchParams} */
                const params = new URLSearchParams(uri.query);
                void vscode.commands
                    .executeCommand('antigravity.openConversation', params.get('cascadeId') || undefined, params.get('path') || undefined)
                    .then(undefined, (/**
                 * @return {void}
                 */
                () => { }));
            }
        },
    }));
    /** @type {!tsickle_server_manager_15.AntigravityServerManager} */
    const serverManager = server_manager_1.AntigravityServerManager.getInstance();
    context.subscriptions.push({
        dispose: (/**
         * @return {void}
         */
        () => {
            serverManager.stop();
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
    /** @type {!tsickle_vscode_1.WorkspaceConfiguration} */
    const antigravityConfig = vscode.workspace.getConfiguration('antigravity');
    /** @type {!tsickle_auto_save_notice_12.AutoSaveNotice} */
    const autoSaveNotice = new auto_save_notice_1.AutoSaveNotice(context.globalState);
    // The newest InlineDiffManager created, and the one in use (if inline).
    /** @type {(undefined|!tsickle_inline_diff_manager_6.InlineDiffManager)} */
    let createdInlineDiffManager;
    /** @type {(undefined|!tsickle_inline_diff_manager_6.InlineDiffManager)} */
    let inlineReviews;
    /** @type {!tsickle_agent_edit_manager_4.AgentEditManager} */
    const agentEditManager = new agent_edit_manager_1.AgentEditManager(context, (/**
     * @return {(!tsickle_inline_diff_zone_renderer_7.InlineDiffZoneRenderer|!tsickle_side_by_side_diff_zone_renderer_9.SideBySideDiffZoneRenderer)}
     */
    () => {
        /** @type {!tsickle_vscode_1.WorkspaceConfiguration} */
        const config = vscode.workspace.getConfiguration('antigravity');
        if (!config.get('enableInlineDiff', true)) {
            return new side_by_side_diff_zone_renderer_1.SideBySideDiffZoneRenderer({ keepNewerReviews: true });
        }
        /** @type {!tsickle_inline_diff_manager_6.InlineDiffManager} */
        const inlineDiffManager = new inline_diff_manager_1.InlineDiffManager({
            // Auto Save would write the staged deleted lines to disk.
            hideDeletedLines: (/**
             * @param {!tsickle_vscode_1.TextDocument} document
             * @return {boolean}
             */
            (document) => vscode.workspace
                .getConfiguration('files', document)
                .get('autoSave', 'off') !== 'off'),
        });
        createdInlineDiffManager = inlineDiffManager;
        inlineDiffManager.onDidChangeActiveDiffs((/**
         * @return {void}
         */
        () => {
            if (inlineDiffManager.hasActiveDiffs()) {
                void autoSaveNotice.maybeShow(inlineDiffManager);
            }
        }));
        return new inline_diff_zone_renderer_1.InlineDiffZoneRenderer(inlineDiffManager);
    }), {
        autoAcceptOnChat: antigravityConfig.get('autoAcceptOnChat', true),
        ageOutThreshold: 5,
        undoableUserResolutions: true,
        openSideBySideDiffs: true,
        readOnlyNavigationWithoutOpenReview: true,
    });
    context.subscriptions.push(agentEditManager);
    context.subscriptions.push((0, side_by_side_review_actions_1.registerSideBySideReviewActions)(agentEditManager));
    context.subscriptions.push((0, resolved_diff_decorations_1.registerResolvedDiffDecorations)(agentEditManager));
    /** @type {function(): void} */
    const trackInlineReviews = (/**
     * @return {void}
     */
    () => {
        inlineReviews =
            agentEditManager.diffZoneType === 'inline'
                ? createdInlineDiffManager
                : undefined;
    });
    trackInlineReviews();
    /** @type {!tsickle_deferred_renderer_switch_14.DeferredRendererSwitch} */
    const rendererSwitch = new deferred_renderer_switch_1.DeferredRendererSwitch((/**
     * @return {void}
     */
    () => {
        /** @type {string} */
        const before = agentEditManager.diffZoneType;
        agentEditManager.updateDiffZoneRenderer();
        if (agentEditManager.diffZoneType !== before)
            trackInlineReviews();
    }));
    context.subscriptions.push(rendererSwitch);
    context.subscriptions.push(vscode.workspace.onDidChangeConfiguration((/**
     * @param {!tsickle_vscode_1.ConfigurationChangeEvent} e
     * @return {!Promise<void>}
     */
    async (e) => {
        if (e.affectsConfiguration('antigravity.enableInlineDiff')) {
            rendererSwitch.request(inlineReviews);
        }
        if (e.affectsConfiguration('antigravity.autoAcceptOnChat')) {
            /** @type {!tsickle_vscode_1.WorkspaceConfiguration} */
            const config = vscode.workspace.getConfiguration('antigravity');
            agentEditManager.setAutoAcceptOnChat(config.get('autoAcceptOnChat', true));
        }
        if (e.affectsConfiguration('antigravity.serverPort')) {
            /** @type {(undefined|string)} */
            const action = await vscode.window.showInformationMessage('Changing the Antigravity server port requires reloading the window to take effect.', 'Reload Window');
            if (action === 'Reload Window') {
                void vscode.commands.executeCommand('workbench.action.reloadWindow');
            }
        }
    })));
    /** @type {boolean} */
    const isCde = cde_auth_service_1.CdeAuthService.getInstance().isCdeEnvironment();
    const { apiImpl } = (0, core_activation_1.activateWithDependencies)(context, {
        agentEditManager,
        browserNotificationDelegate: new vscode_notification_delegate_1.VscodeNotificationDelegate(context.extensionUri?.fsPath, context.extension?.id),
        telemetry,
        workspaceManager,
        webviewDelegate,
        hostDiagnosticsProvider: server_manager_1.AntigravityServerManager.getInstance(),
        setupFn: (/**
         * @param {!tsickle_vscode_1.ExtensionContext} ctx
         * @param {!tsickle_loading_message_impl_20.MessageNotifierImpl} notifier
         * @return {!Promise<{effectiveUrl: string, humanReadable: string}>}
         */
        (ctx, notifier) => isCde
            ? cdeSetup(ctx, notifier, telemetry)
            : desktopSetup(ctx, notifier, telemetry)),
    }, desktopNaming);
    // When the backend crashes or stops unexpectedly mid-session, flip every open
    // surface into the in-surface error component and record the crash detail for
    // the "Report issue" action.
    context.subscriptions.push(serverManager.onServerCrash((/**
     * @param {{code: (null|number), signal: (null|string), reason: string}} info
     * @return {void}
     */
    (info) => {
        serverManager.setLastStartupError(`Backend stopped unexpectedly: ${info.reason}`);
        apiImpl.broadcastServerError(`The Antigravity backend stopped unexpectedly (${info.reason}).`);
    })));
    if (!getConfiguredServerUrl()) {
        try {
            // In CDE, skip background pre-warm unless the user is already authenticated
            if (!isCde || (await serverManager.checkCdeAuth(context))) {
                await serverManager.start({ context, telemetry });
            }
        }
        catch {
            // Errors during initial background server start are handled and retried
            // via desktopSetup or cdeSetup when the webview opens.
        }
    }
    return {
        csrfToken: serverManager.csrfToken,
        /**
         * @public
         * @return {(undefined|number)}
         */
        get port() {
            return serverManager.port;
        },
    };
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
/** @type {{desktopSetup: function(!tsickle_vscode_1.ExtensionContext, !MessageNotifier, (undefined|!tsickle_delegate_interfaces_3.Telemetry)=): !Promise<{effectiveUrl: string, humanReadable: string}>, cdeSetup: function(!tsickle_vscode_1.ExtensionContext, !MessageNotifier, (undefined|!tsickle_delegate_interfaces_3.Telemetry)=): !Promise<{effectiveUrl: string, humanReadable: string}>}} */
exports.TEST_ONLY = {
    desktopSetup,
    cdeSetup,
};
