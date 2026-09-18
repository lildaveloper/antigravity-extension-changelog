/**
 * @fileoverview added by tsickle
 * Generated from: devtools/cider/extensions/jetski/core_activation.ts
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
goog.module('google3.devtools.cider.extensions.jetski.core_activation');
var module = module || { id: 'devtools/cider/extensions/jetski/core_activation.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_vscode_1 = goog.requireType("vscode");
const tsickle_artifact_editor_provider_2 = goog.requireType("google3.devtools.cider.extensions.jetski.artifact_editor_provider");
const tsickle_delegate_interfaces_3 = goog.requireType("google3.devtools.cider.extensions.jetski.delegate_interfaces");
const tsickle_agent_edit_manager_4 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.agent_edit_manager");
const tsickle_extension_api_5 = goog.requireType("google3.devtools.cider.extensions.jetski.extension_api");
const tsickle_loading_message_impl_6 = goog.requireType("google3.devtools.cider.extensions.jetski.loading.loading_message_impl");
const tsickle_notebook_utils_interface_7 = goog.requireType("google3.devtools.cider.extensions.jetski.notebook_utils_interface");
const tsickle_settings_editor_provider_8 = goog.requireType("google3.devtools.cider.extensions.jetski.settings_editor_provider");
const tsickle_cider_host_management_9 = goog.requireType("google3.devtools.cider.extensions.jetski.setup.cider_host_management");
const tsickle_util_10 = goog.requireType("google3.devtools.cider.extensions.jetski.setup.util");
const tsickle_terminal_panel_provider_11 = goog.requireType("google3.devtools.cider.extensions.jetski.terminal_panel_provider");
const tsickle_webview_provider_12 = goog.requireType("google3.devtools.cider.extensions.jetski.webview_provider");
const tsickle_webview_renderer_13 = goog.requireType("google3.devtools.cider.extensions.jetski.webview_renderer");
const vscode = goog.require('vscode'); // from //devtools/cider/extensions:vscode
// from //devtools/cider/extensions:vscode
const artifact_editor_provider_1 = goog.require('google3.devtools.cider.extensions.jetski.artifact_editor_provider');
const extension_api_1 = goog.require('google3.devtools.cider.extensions.jetski.extension_api');
const settings_editor_provider_1 = goog.require('google3.devtools.cider.extensions.jetski.settings_editor_provider');
const cider_host_management_1 = goog.require('google3.devtools.cider.extensions.jetski.setup.cider_host_management');
const util_1 = goog.require('google3.devtools.cider.extensions.jetski.setup.util');
const terminal_panel_provider_1 = goog.require('google3.devtools.cider.extensions.jetski.terminal_panel_provider');
const webview_provider_1 = goog.require('google3.devtools.cider.extensions.jetski.webview_provider');
const webview_renderer_1 = goog.require('google3.devtools.cider.extensions.jetski.webview_renderer');
/**
 * Dependencies required to activate the Jetski core logic.
 * @record
 */
function JetskiCoreDependencies() { }
exports.JetskiCoreDependencies = JetskiCoreDependencies;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!tsickle_agent_edit_manager_4.AgentEditManager}
     * @public
     */
    JetskiCoreDependencies.prototype.agentEditManager;
    /**
     * @type {(undefined|!tsickle_delegate_interfaces_3.BrowserNotificationDelegate)}
     * @public
     */
    JetskiCoreDependencies.prototype.browserNotificationDelegate;
    /**
     * @type {(undefined|!tsickle_delegate_interfaces_3.ConnectionResolver)}
     * @public
     */
    JetskiCoreDependencies.prototype.connectionResolver;
    /**
     * @type {(undefined|!tsickle_delegate_interfaces_3.HostDiagnosticsProvider)}
     * @public
     */
    JetskiCoreDependencies.prototype.hostDiagnosticsProvider;
    /**
     * @type {(undefined|!tsickle_delegate_interfaces_3.NotebookExecutor)}
     * @public
     */
    JetskiCoreDependencies.prototype.notebookExecutor;
    /**
     * @type {(undefined|!tsickle_notebook_utils_interface_7.NotebookUtils)}
     * @public
     */
    JetskiCoreDependencies.prototype.notebookUtils;
    /**
     * @type {function(!tsickle_vscode_1.ExtensionContext, !tsickle_loading_message_impl_6.MessageNotifierImpl): !Promise<!tsickle_util_10.ServerInfo>}
     * @public
     */
    JetskiCoreDependencies.prototype.setupFn;
    /**
     * @type {!tsickle_delegate_interfaces_3.Telemetry}
     * @public
     */
    JetskiCoreDependencies.prototype.telemetry;
    /**
     * @type {!tsickle_delegate_interfaces_3.WebviewDelegate}
     * @public
     */
    JetskiCoreDependencies.prototype.webviewDelegate;
    /**
     * @type {!tsickle_delegate_interfaces_3.WorkspaceManager}
     * @public
     */
    JetskiCoreDependencies.prototype.workspaceManager;
}
/**
 * Activates the shared Jetski core components.
 * Registers generic webview providers and commands.
 * @param {!tsickle_vscode_1.ExtensionContext} context
 * @param {!JetskiCoreDependencies} deps
 * @param {!tsickle_delegate_interfaces_3.HostAppConfig} naming
 * @return {{apiImpl: !tsickle_extension_api_5.ExtensionApiImpl, provider: !tsickle_webview_provider_12.JetskiWebviewProvider}}
 */
function activateWithDependencies(context, deps, naming) {
    (0, util_1.initLogSystem)(context, naming.logChannelName ?? `${naming.displayName ?? 'Jetski'} Extension`);
    /** @type {!tsickle_extension_api_5.ExtensionApiImpl} */
    const apiImpl = new extension_api_1.ExtensionApiImpl({
        agentEditManager: deps.agentEditManager,
        browserNotificationDelegate: deps.browserNotificationDelegate,
        connectionResolver: deps.connectionResolver,
        context,
        hostDiagnosticsProvider: deps.hostDiagnosticsProvider,
        naming,
        notebookExecutor: deps.notebookExecutor,
        notebookUtils: deps.notebookUtils,
        telemetry: deps.telemetry,
        workspaceManager: deps.workspaceManager,
    });
    /** @type {!tsickle_webview_renderer_13.WebviewRenderer} */
    const renderer = new webview_renderer_1.WebviewRenderer({
        apiImpl,
        context,
        delegate: deps.webviewDelegate,
        setupFn: deps.setupFn,
    });
    /** @type {!tsickle_webview_provider_12.JetskiWebviewProvider} */
    const provider = new webview_provider_1.JetskiWebviewProvider(context, renderer, naming.viewId, naming);
    /** @type {!tsickle_terminal_panel_provider_11.TerminalPanelProvider} */
    const terminalPanelProvider = new terminal_panel_provider_1.TerminalPanelProvider(context, renderer, 'jetski.terminalView');
    apiImpl.setTerminalPanelProvider(terminalPanelProvider);
    // Instantiate artifact and settings custom editor providers, and register their references
    // with apiImpl so they can coordinate tab deduplication, in-place navigation, and in-memory caching.
    /** @type {!tsickle_artifact_editor_provider_2.ArtifactEditorProvider} */
    const artifactEditorProvider = new artifact_editor_provider_1.ArtifactEditorProvider(context, renderer);
    apiImpl.setArtifactEditorProvider(artifactEditorProvider);
    /** @type {!tsickle_settings_editor_provider_8.SettingsEditorProvider} */
    const settingsEditorProvider = new settings_editor_provider_1.SettingsEditorProvider(context, renderer, naming);
    apiImpl.setSettingsEditorProvider(settingsEditorProvider);
    // Webview creation (sidebar, artifact editor, settings editor, and terminal)
    context.subscriptions.push(vscode.window.registerWebviewViewProvider(naming.viewId, provider, {
        webviewOptions: {
            retainContextWhenHidden: true,
        },
    }), vscode.window.registerCustomEditorProvider(naming.artifactEditorId, artifactEditorProvider, {
        webviewOptions: {
            retainContextWhenHidden: true,
        },
    }), vscode.window.registerCustomEditorProvider(settings_editor_provider_1.SettingsEditorProvider.viewType, settingsEditorProvider, {
        webviewOptions: {
            retainContextWhenHidden: true,
        },
    }), vscode.window.registerWebviewViewProvider('jetski.terminalView', terminalPanelProvider, {
        webviewOptions: {
            retainContextWhenHidden: true,
        },
    }));
    // Command registration (generic ones)
    context.subscriptions.push(vscode.commands.registerCommand(`${naming.prefix}.toggleAgent.maximize`, (/**
     * @return {void}
     */
    () => {
        vscode.commands.executeCommand('workbench.action.maximizeAuxiliaryBar');
    })), vscode.commands.registerCommand(`${naming.prefix}.toggleAgent.close`, (/**
     * @return {void}
     */
    () => {
        vscode.commands.executeCommand('workbench.action.closeAuxiliaryBar');
    })), vscode.commands.registerCommand(`${naming.prefix}.moveBetweenEditorAndSidebar`, (/**
     * @return {!Promise<void>}
     */
    async () => {
        await provider.toggle();
    })), vscode.commands.registerCommand(`${naming.prefix}.reconnect`, (/**
     * @return {void}
     */
    () => {
        provider.refresh();
    })), vscode.commands.registerCommand(`${naming.prefix}.triggerUpdate`, (/**
     * @return {!Promise<void>}
     */
    async () => {
        await context.globalState.update(`${naming.prefix}.forceUpdate`, true);
        provider.refresh();
    })), vscode.commands.registerCommand(`${naming.prefix}.setServerUrl`, (/**
     * @param {(undefined|!tsickle_vscode_1.ConfigurationTarget)=} target
     * @return {!Promise<void>}
     */
    async (target) => {
        /** @type {!tsickle_vscode_1.WorkspaceConfiguration} */
        const config = vscode.workspace.getConfiguration(naming.prefix);
        /** @type {string} */
        const currentUrl = config.get('serverUrl') || '';
        /** @type {(undefined|string)} */
        const newUrl = await vscode.window.showInputBox({
            prompt: 'Enter the Jetski server URL',
            value: currentUrl,
            placeHolder: 'e.g., https://<cloudtop>-3000.proxy.googlers.com/',
        });
        if (newUrl !== undefined) {
            await config.update('serverUrl', newUrl, target ?? (0, cider_host_management_1.getConfigurationTarget)());
        }
    })));
    context.subscriptions.push(vscode.workspace.onDidChangeConfiguration((/**
     * @param {!tsickle_vscode_1.ConfigurationChangeEvent} e
     * @return {void}
     */
    (e) => {
        if (e.affectsConfiguration(`${naming.prefix}.serverUrl`) ||
            e.affectsConfiguration(`${naming.prefix}.cloudtopHost`) ||
            e.affectsConfiguration(`${naming.prefix}.host`)) {
            provider.refresh();
        }
    })));
    return { apiImpl, provider };
}
exports.activateWithDependencies = activateWithDependencies;
