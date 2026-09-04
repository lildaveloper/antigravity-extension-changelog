/**
 * @fileoverview added by tsickle
 * Generated from: devtools/cider/extensions/jetski/extension_api.ts
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
goog.module('google3.devtools.cider.extensions.jetski.extension_api');
var module = module || { id: 'devtools/cider/extensions/jetski/extension_api.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_protobuf_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.index");
const tsickle_connect_2 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.index");
const tsickle_codeium_common_pb_3 = goog.requireType("google3.third_party.jetski.codeium_common_pb.codeium_common_pb");
const tsickle_iframe_messages_pb_4 = goog.requireType("google3.third_party.gemini_coder.proto.iframe_messages_pb");
const tsickle_agent_edit_manager_5 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.agent_edit_manager");
const tsickle_check_6 = goog.requireType("google3.javascript.typescript.contrib.check");
const tsickle_extensionApi_7 = goog.requireType("google3.third_party.gemini_coder.agent_ui_toolkit.src.features.iframe.extensionApi");
const tsickle_vscode_8 = goog.requireType("vscode");
const tsickle_artifact_editor_provider_9 = goog.requireType("google3.devtools.cider.extensions.jetski.artifact_editor_provider");
const tsickle_delegate_interfaces_10 = goog.requireType("google3.devtools.cider.extensions.jetski.delegate_interfaces");
const tsickle_editor_state_watcher_11 = goog.requireType("google3.devtools.cider.extensions.jetski.editor_state_watcher");
const tsickle_jetski_instance_12 = goog.requireType("google3.devtools.cider.extensions.jetski.jetski_instance");
const tsickle_notebook_utils_interface_13 = goog.requireType("google3.devtools.cider.extensions.jetski.notebook_utils_interface");
const tsickle_settings_editor_provider_14 = goog.requireType("google3.devtools.cider.extensions.jetski.settings_editor_provider");
const tsickle_util_15 = goog.requireType("google3.devtools.cider.extensions.jetski.setup.util");
const tsickle_terminal_panel_provider_16 = goog.requireType("google3.devtools.cider.extensions.jetski.terminal_panel_provider");
const protobuf_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.index'); // from //third_party/javascript/bufbuild_protobuf
// from //third_party/javascript/bufbuild_protobuf
const connect_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.index'); // from //third_party/javascript/connectrpc_connect
// from //third_party/javascript/connectrpc_connect
const codeium_common_pb_1 = goog.require('google3.third_party.jetski.codeium_common_pb.codeium_common_pb'); // from //third_party/jetski/codeium_common_pb:codeium_common_ts_proto
// from //third_party/jetski/codeium_common_pb:codeium_common_ts_proto
const iframe_messages_pb_1 = goog.require('google3.third_party.gemini_coder.proto.iframe_messages_pb');
const check_1 = goog.require('google3.javascript.typescript.contrib.check');
const vscode = goog.require('vscode'); // from //devtools/cider/extensions:vscode
// from //devtools/cider/extensions:vscode
const artifact_editor_provider_1 = goog.require('google3.devtools.cider.extensions.jetski.artifact_editor_provider');
const editor_state_watcher_1 = goog.require('google3.devtools.cider.extensions.jetski.editor_state_watcher');
const jetski_instance_1 = goog.require('google3.devtools.cider.extensions.jetski.jetski_instance');
const settings_editor_provider_1 = goog.require('google3.devtools.cider.extensions.jetski.settings_editor_provider');
const util_1 = goog.require('google3.devtools.cider.extensions.jetski.setup.util');
/** @typedef {!tsickle_delegate_interfaces_10.DynamicContextCategoryItem} */
exports.DynamicContextCategoryItem; // type-only export
/** @typedef {!tsickle_delegate_interfaces_10.DynamicContextProvider} */
exports.DynamicContextProvider; // type-only export
/**
 * Typing for arguments passed to antigravity.addContext.
 * @typedef {({type: string, text: string}|{type: string, uri: string, label: (undefined|string), range: (undefined|{startLineNumber: number, endLineNumber: number, startColumn: number, endColumn: number})}|{type: string, url: string}|{type: string, processId: (undefined|string|number), name: (undefined|string), selectionContent: (undefined|string)})}
 */
var ContextArg;
/**
 * Typing for arguments passed to ExtensionApiImpl.addContext.
 * @typedef {(undefined|string|{value: ?, case: string}|{case: undefined, value: undefined}|{case: string, value: ?})}
 */
exports.ContextChunk;
/**
 * Configuration for initializing the ExtensionApiImpl.
 * @record
 */
function ExtensionApiConfig() { }
exports.ExtensionApiConfig = ExtensionApiConfig;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!tsickle_agent_edit_manager_5.AgentEditManager}
     * @public
     */
    ExtensionApiConfig.prototype.agentEditManager;
    /**
     * @type {(undefined|!tsickle_delegate_interfaces_10.BrowserNotificationDelegate)}
     * @public
     */
    ExtensionApiConfig.prototype.browserNotificationDelegate;
    /**
     * @type {(undefined|!tsickle_delegate_interfaces_10.ConnectionResolver)}
     * @public
     */
    ExtensionApiConfig.prototype.connectionResolver;
    /**
     * @type {!tsickle_vscode_8.ExtensionContext}
     * @public
     */
    ExtensionApiConfig.prototype.context;
    /**
     * @type {!tsickle_delegate_interfaces_10.HostAppConfig}
     * @public
     */
    ExtensionApiConfig.prototype.naming;
    /**
     * @type {(undefined|!tsickle_delegate_interfaces_10.NotebookExecutor)}
     * @public
     */
    ExtensionApiConfig.prototype.notebookExecutor;
    /**
     * @type {(undefined|!tsickle_notebook_utils_interface_13.NotebookUtils)}
     * @public
     */
    ExtensionApiConfig.prototype.notebookUtils;
    /**
     * @type {(undefined|!tsickle_delegate_interfaces_10.Telemetry)}
     * @public
     */
    ExtensionApiConfig.prototype.telemetry;
    /**
     * @type {(undefined|!tsickle_delegate_interfaces_10.WorkspaceManager)}
     * @public
     */
    ExtensionApiConfig.prototype.workspaceManager;
}
/** @type {number} */
const MAX_SENT_NOTIFICATION_IDS = 50;
/**
 * Custom editor tab input containing URI and viewType.
 * @record
 */
function CustomTabInput() { }
/* istanbul ignore if */
if (false) {
    /**
     * @const {!tsickle_vscode_8.Uri}
     * @public
     */
    CustomTabInput.prototype.uri;
    /**
     * @const {string}
     * @public
     */
    CustomTabInput.prototype.viewType;
}
/**
 * Represents an existing open custom editor tab and its containing tab group.
 * @record
 */
function OpenTabMatch() { }
/* istanbul ignore if */
if (false) {
    /**
     * @const {!tsickle_vscode_8.TabGroup}
     * @public
     */
    OpenTabMatch.prototype.group;
    /**
     * @const {!tsickle_vscode_8.Uri}
     * @public
     */
    OpenTabMatch.prototype.uri;
}
/**
 * Safely checks if a tab input is a custom editor input.
 * Checks for `uri` (vscode.Uri) and `viewType` (string) properties, which uniquely
 * identify custom editor tab inputs without using reflection on the vscode module object.
 * @param {*} input
 * @return {boolean}
 */
function isTabInputCustom(input) {
    if (input == null || typeof input !== 'object') {
        return false;
    }
    return ('uri' in input &&
        input.uri instanceof vscode.Uri &&
        'viewType' in input &&
        typeof input.viewType === 'string');
}
/**
 * Searches all open tab groups for a custom editor tab matching the specified predicate.
 *
 * @param {function(!CustomTabInput): boolean} predicate Callback returning true if the tab input matches the target editor.
 * @return {(undefined|!OpenTabMatch)} An object containing the matching group and tab URI, or undefined if not found.
 */
function findOpenCustomTab(predicate) {
    for (const group of vscode.window.tabGroups?.all ?? []) {
        for (const tab of group.tabs) {
            /** @type {*} */
            const input = tab.input;
            if (isTabInputCustom(input) && predicate(input)) {
                return { group, uri: (/** @type {!CustomTabInput} */ (input)).uri };
            }
        }
    }
    return undefined;
}
/**
 * Reveals and focuses an already open custom editor tab in its existing viewColumn,
 * preventing duplicate editor tabs from being opened across split editor groups.
 *
 * @param {!OpenTabMatch} match The open tab match returned from `findOpenCustomTab`.
 * @param {string} viewType The viewType of the custom editor to reveal.
 * @return {!Promise<void>}
 */
async function revealOpenCustomTab(match, viewType) {
    await vscode.commands.executeCommand('vscode.openWith', match.uri, viewType, {
        viewColumn: match.group.viewColumn,
        preview: false,
        preserveFocus: false,
    });
}
/**
 * Central implementation of the ExtensionApi service.
 *
 * Handles all RPC calls from the Jetski iframe, manages the lifecycle of
 * JetskiInstance views, and coordinates editor state forwarding.
 * @implements {tsickle_vscode_8.TextDocumentContentProvider}
 * tsickle: dropped implements: dropped implements of a type literal: ServiceImplWithoutEvents<typeof ExtensionApi, AntigravityApiEmitters>
 */
class ExtensionApiImpl {
    /**
     * @public
     * @return {!tsickle_vscode_8.Event<!tsickle_jetski_instance_12.JetskiInstance>}
     */
    get onDidRegisterView() {
        return this.onDidRegisterViewEmitter.event;
    }
    /**
     * Registers the TerminalPanelProvider with this extension API instance.
     * @public
     * @param {!tsickle_terminal_panel_provider_16.TerminalPanelProvider} provider
     * @return {void}
     */
    setTerminalPanelProvider(provider) {
        this.terminalPanelProvider = provider;
    }
    /**
     * Registers the SettingsEditorProvider with this extension API instance.
     * @public
     * @param {!tsickle_settings_editor_provider_14.SettingsEditorProvider} provider
     * @return {void}
     */
    setSettingsEditorProvider(provider) {
        this.settingsEditorProvider = provider;
    }
    /**
     * Registers the ArtifactEditorProvider with this extension API instance.
     * @public
     * @param {!tsickle_artifact_editor_provider_9.ArtifactEditorProvider} provider
     * @return {void}
     */
    setArtifactEditorProvider(provider) {
        this.artifactEditorProvider = provider;
    }
    /**
     * @public
     * @return {!Array<!tsickle_jetski_instance_12.JetskiInstance>}
     */
    get mainViews() {
        return this.views.filter((/**
         * @param {!tsickle_jetski_instance_12.JetskiInstance} view
         * @return {boolean}
         */
        (view) => view.type === 'main'));
    }
    /**
     * Returns the first active main Jetski instance, or undefined if none exists.
     * @public
     * @return {(undefined|!tsickle_jetski_instance_12.JetskiInstance)}
     */
    getMainInstance() {
        return this.mainViews[0];
    }
    /**
     * Returns the first active main Jetski instance. If none exists, focuses the
     * panel to create it and waits for it to be registered.
     * @public
     * @return {!Promise<!tsickle_jetski_instance_12.JetskiInstance>}
     */
    async ensureMainInstance() {
        /** @type {(undefined|!tsickle_jetski_instance_12.JetskiInstance)} */
        const existing = this.getMainInstance();
        if (existing) {
            await existing.ready;
            return existing;
        }
        const { promise, resolve } = Promise.withResolvers();
        /** @type {(undefined|!tsickle_vscode_8.Disposable)} */
        let listener;
        try {
            listener = this.onDidRegisterView((/**
             * @param {!tsickle_jetski_instance_12.JetskiInstance} view
             * @return {void}
             */
            (view) => {
                if (view.type === 'main') {
                    resolve(view);
                }
            }));
            await vscode.commands.executeCommand(`${this.naming.viewId}.focus`);
            /** @type {!tsickle_jetski_instance_12.JetskiInstance} */
            const view = await promise;
            await view.ready;
            return view;
        }
        finally {
            listener?.dispose();
        }
    }
    /**
     * @private
     * @param {(undefined|string)=} action
     * @return {!Promise<void>}
     */
    async handleToggleChatFocus(action) {
        /** @type {!tsickle_jetski_instance_12.JetskiInstance} */
        const view = await this.ensureMainInstance();
        if (action === 'close') {
            await this.closeChatView(view);
            return;
        }
        await this.focusChatView(view);
    }
    /**
     * Sets the `${prefix}.chatFocused` context key in VS Code.
     *
     * In VS Code Desktop, the chat UI lives inside an out-of-process sandboxed iframe.
     * VS Code's native `focusedView` context key is only updated for native TreeViews/Lists
     * and remains empty ("") when focus enters a WebviewView iframe.
     * Tracking `chatFocused` explicitly allows keybindings in package.json to distinguish
     * between when the chat is focused (e.g. Cmd+L closes the sidebar) versus when another
     * part of the IDE is focused (Cmd+L reveals/focuses the chat).
     * @private
     * @param {boolean} focused
     * @return {void}
     */
    setChatFocused(focused) {
        void vscode.commands.executeCommand('setContext', `${this.naming.prefix}.chatFocused`, focused);
    }
    /**
     * @private
     * @param {!tsickle_jetski_instance_12.JetskiInstance} view
     * @return {!Promise<void>}
     */
    async closeChatView(view) {
        this.setChatFocused(false);
        /** @type {string} */
        const location = this.viewLocation;
        switch (location) {
            case 'sidebar':
                await vscode.commands.executeCommand('workbench.action.toggleSidebarVisibility');
                if (view.visible) {
                    // If still visible, we must have toggled the sidebar by mistake (e.g. user moved view to aux bar).
                    // Restore sidebar state and toggle auxiliary bar.
                    await vscode.commands.executeCommand('workbench.action.toggleSidebarVisibility');
                    await vscode.commands.executeCommand('workbench.action.toggleAuxiliaryBar');
                    this.viewLocation = 'auxiliarybar';
                }
                break;
            case 'auxiliarybar':
                await vscode.commands.executeCommand('workbench.action.toggleAuxiliaryBar');
                if (view.visible) {
                    // If still visible, we must have toggled the auxiliary bar by mistake (e.g. user moved view to sidebar).
                    // Restore auxiliary bar state and toggle sidebar.
                    await vscode.commands.executeCommand('workbench.action.toggleAuxiliaryBar');
                    await vscode.commands.executeCommand('workbench.action.toggleSidebarVisibility');
                    this.viewLocation = 'sidebar';
                }
                break;
            default:
                (0, check_1.checkExhaustive)(location);
        }
    }
    /**
     * Focuses the chat view and its input in the webview.
     * In VS Code Desktop (Antigravity), showing the sidebar webview panel is asynchronous.
     * When opening from a hidden state, focusInput is retried after a short delay
     * to ensure the input box is focused once the container finishes revealing.
     * @private
     * @param {!tsickle_jetski_instance_12.JetskiInstance} view
     * @return {!Promise<void>}
     */
    async focusChatView(view) {
        this.setChatFocused(true);
        view.focus();
        try {
            await view.api.sendCommand({ commandId: 'focusInput' });
            // In VS Code Desktop (Electron), revealing the sidebar webview panel from a closed
            // state is asynchronous. When opening, the initial focusInput command may be dropped
            // before Electron finishes window-level focus delegation to the iframe. Retry after a
            // short delay to ensure the input box receives focus once the container finishes revealing.
            if (!(0, util_1.isInCider)()) {
                setTimeout((/**
                 * @return {void}
                 */
                () => {
                    void view.api.sendCommand({ commandId: 'focusInput' }).catch((/**
                     * @param {?} e
                     * @return {void}
                     */
                    (e) => {
                        console.error('[ExtensionAPI] Failed to focus input in webview on retry:', e);
                    }));
                }), 50);
            }
        }
        catch (e) {
            console.error('[ExtensionAPI] Failed to focus input in webview:', e);
        }
    }
    /**
     * @private
     * @param {string} commandId
     * @param {string} webviewCommandId
     * @return {void}
     */
    registerWebviewCommand(commandId, webviewCommandId) {
        if (this.registeredCommands.has(commandId)) {
            return;
        }
        this.context.subscriptions.push(vscode.commands.registerCommand(commandId, (/**
         * @return {!Promise<void>}
         */
        async () => {
            try {
                /** @type {!tsickle_jetski_instance_12.JetskiInstance} */
                const mainView = await this.ensureMainInstance();
                await mainView.ready;
                await mainView.api.sendCommand({ commandId: webviewCommandId });
            }
            catch (e) {
                (0, util_1.getOutputChannel)().appendLine(`[ExtensionAPI] Failed to execute command ${commandId}: ${e}`);
            }
        })));
        this.registeredCommands.add(commandId);
    }
    /**
     * @private
     * @param {!tsickle_jetski_instance_12.JetskiInstance} view
     * @return {!Promise<void>}
     */
    async registerDynamicCommands(view) {
        try {
            /** @type {?} */
            const response = await view.api.listCommands({});
            for (const cmd of response.commands) {
                /** @type {string} */
                const commandId = `${this.naming.prefix}.dynamic.${cmd.id}`;
                this.registerWebviewCommand(commandId, cmd.id);
            }
        }
        catch (e) {
            console.error('[Jetski] Failed to list and register commands', e);
        }
    }
    /**
     * @private
     * @return {void}
     */
    registerStaticCommandsFromPackageJson() {
        /** @type {?} */
        const packageJSON = this.context.extension.packageJSON;
        /** @type {?} */
        const commands = packageJSON?.contributes?.commands;
        if (!Array.isArray(commands)) {
            return;
        }
        /** @type {string} */
        const prefix = `${this.naming.prefix}.dynamic.`;
        for (const cmd of commands) {
            if (typeof cmd.command === 'string' && cmd.command.startsWith(prefix)) {
                /** @type {?} */
                const commandId = cmd.command;
                /** @type {?} */
                const webviewCommandId = commandId.substring(prefix.length);
                this.registerWebviewCommand(commandId, webviewCommandId);
            }
        }
    }
    /**
     * @public
     * @param {!ExtensionApiConfig} config
     */
    constructor(config) {
        // Public fields
        this.views = new Array();
        this.commentsStateJson = '{}';
        this.contextCategoryProviders = new Map();
        this.feedbackMetadata = {};
        this.modifiedContentsMap = new Map();
        this.onDidRegisterViewEmitter = new vscode.EventEmitter();
        this.originalContentsMap = new Map();
        this.registeredCommands = new Set();
        this.sentNotificationIds = new Set();
        /**
         * Concurrency guard for openArtifact: tracks in-flight open operations by file path to prevent
         * race conditions from rapid concurrent clicks opening duplicate tabs for the same file.
         */
        this.pendingOpenArtifacts = new Map();
        this.browserNotificationDelegate = config.browserNotificationDelegate;
        this.connectionResolver = config.connectionResolver;
        this.context = config.context;
        this.naming = config.naming;
        this.viewLocation = config.naming.viewLocation;
        this.telemetry = config.telemetry;
        this.workspaceManager = config.workspaceManager;
        this.notebookExecutor = config.notebookExecutor;
        this.agentEditManager = config.agentEditManager;
        this.agentEditManager.setOpenStandardDiff((/**
         * @param {string} fileUri
         * @param {string} originalContents
         * @param {string} modifiedContents
         * @return {!Promise<void>}
         */
        async (fileUri, originalContents, modifiedContents) => {
            await this.openVirtualDiff(fileUri, originalContents, modifiedContents, `Diff: ${fileUri.substring(fileUri.lastIndexOf('/') + 1)} (Resolved)`);
        }));
        this.context.subscriptions.push(this.agentEditManager.onDidChangeDiffZones((/**
         * @param {!Array<!tsickle_agent_edit_manager_5.FileAgentEditState>} states
         * @return {void}
         */
        (states) => {
            for (const view of this.views) {
                void view.api.setFileDiffs({ fileDiffs: states }).catch((/**
                 * @param {?} e
                 * @return {void}
                 */
                (e) => {
                    if (connect_1.ConnectError.from(e).code !== connect_1.Code.NotFound) {
                        console.error('[ExtensionAPI] Failed to send file diffs to view', e);
                    }
                }));
            }
        })));
        this.context.subscriptions.push(this.onDidRegisterViewEmitter);
        // Clear chatFocused context key when focus moves back into an active text editor or terminal.
        this.context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor((/**
         * @param {(undefined|!tsickle_vscode_8.TextEditor)} editor
         * @return {void}
         */
        (editor) => {
            if (editor) {
                this.setChatFocused(false);
            }
        })), vscode.window.onDidChangeTextEditorSelection((/**
         * @return {void}
         */
        () => {
            this.setChatFocused(false);
        })), vscode.window.onDidChangeActiveTerminal((/**
         * @param {(undefined|!tsickle_vscode_8.Terminal)} terminal
         * @return {void}
         */
        (terminal) => {
            if (terminal) {
                this.setChatFocused(false);
            }
        })));
        this.context.subscriptions.push(vscode.workspace.registerTextDocumentContentProvider('jetski-diff', this));
        this.context.subscriptions.push(vscode.commands.registerCommand(`${this.naming.prefix}.insertSnippet`, (/**
         * @return {!Promise<void>}
         */
        async () => {
            /** @type {(undefined|!tsickle_vscode_8.TextEditor)} */
            const editor = vscode.window.activeTextEditor;
            /** @type {(undefined|!tsickle_vscode_8.Selection)} */
            const selection = editor?.selection;
            if (!selection)
                return;
            void this.addContext({
                case: 'fileLineRange',
                value: {
                    absoluteUri: editor.document.uri.toString(),
                    startLine: selection.start.line,
                    endLine: selection.end.line,
                },
            });
            try {
                /** @type {!tsickle_jetski_instance_12.JetskiInstance} */
                const view = await this.ensureMainInstance();
                await this.focusChatView(view);
            }
            catch (e) {
                (0, util_1.getOutputChannel)().appendLine(`[ExtensionAPI] Failed to focus chat after inserting snippet: ${e}`);
            }
        })));
        this.context.subscriptions.push(this.onDidRegisterView((/**
         * @param {!tsickle_jetski_instance_12.JetskiInstance} view
         * @return {!Promise<void>}
         */
        async (view) => {
            if (view.type === 'main') {
                await view.ready;
                void this.registerDynamicCommands(view);
                this.context.subscriptions.push(view.api.onDidChangeConversations((/**
                 * @param {?} msg
                 * @return {void}
                 */
                (msg) => {
                    this.updateAgentStatusContext(msg);
                })));
            }
        })));
        this.context.subscriptions.push(vscode.commands.registerCommand(`${this.naming.prefix}.insertTerminalSnippet`, (/**
         * @return {!Promise<void>}
         */
        async () => {
            /** @type {(undefined|!tsickle_vscode_8.Terminal)} */
            const terminal = vscode.window.activeTerminal;
            if (!terminal)
                return;
            /** @type {(undefined|string)} */
            const selection = ((/** @type {{selection: (undefined|string)}} */ (terminal))).selection;
            if (!selection)
                return;
            void this.addContext({
                case: 'terminal',
                value: {
                    processId: (await terminal.processId)?.toString() ?? '',
                    name: terminal.name,
                    lastCommand: '',
                    selectionContent: selection,
                },
            }, ' ');
            try {
                /** @type {!tsickle_jetski_instance_12.JetskiInstance} */
                const view = await this.ensureMainInstance();
                await this.focusChatView(view);
            }
            catch (e) {
                (0, util_1.getOutputChannel)().appendLine(`[ExtensionAPI] Failed to focus chat after inserting terminal snippet: ${e}`);
            }
        })));
        this.context.subscriptions.push(vscode.commands.registerCommand('antigravity.toggleChatFocus', (/**
         * @param {(undefined|string)=} action
         * @return {!Promise<void>}
         */
        (action) => this.handleToggleChatFocus(action))));
        this.context.subscriptions.push(vscode.commands.registerCommand('antigravity.startNewConversation', (/**
         * @return {!Promise<void>}
         */
        async () => {
            await this.newConversation();
        })));
        this.context.subscriptions.push(vscode.commands.registerCommand('antigravity.addContext', (/**
         * @param {...?} args
         * @return {!Promise<void>}
         */
        async (...args) => {
            /** @type {!Array<(undefined|string|{value: ?, case: string}|{case: undefined, value: undefined}|{case: string, value: ?})>} */
            const chunks = [];
            /** @type {!Array<(string|{type: string, text: string}|{type: string, uri: string, label: (undefined|string), range: (undefined|{startLineNumber: number, endLineNumber: number, startColumn: number, endColumn: number})}|{type: string, url: string}|{type: string, processId: (undefined|string|number), name: (undefined|string), selectionContent: (undefined|string)})>} */
            const items = args.flat();
            for (const item of items) {
                if (typeof item === 'string') {
                    chunks.push(item);
                }
                else {
                    switch ((/** @type {({type: string, text: string}|{type: string, uri: string, label: (undefined|string), range: (undefined|{startLineNumber: number, endLineNumber: number, startColumn: number, endColumn: number})}|{type: string, url: string}|{type: string, processId: (undefined|string|number), name: (undefined|string), selectionContent: (undefined|string)})} */ (item)).type) {
                        case 'text':
                            chunks.push((/** @type {{type: string, text: string}} */ (item)).text);
                            break;
                        case 'link':
                            chunks.push((/** @type {{type: string, url: string}} */ (item)).url);
                            break;
                        case 'file': {
                            if ((/** @type {{type: string, uri: string, label: (undefined|string), range: (undefined|{startLineNumber: number, endLineNumber: number, startColumn: number, endColumn: number})}} */ (item)).range) {
                                chunks.push({
                                    case: 'fileLineRange',
                                    value: {
                                        absoluteUri: (/** @type {{type: string, uri: string, label: (undefined|string), range: (undefined|{startLineNumber: number, endLineNumber: number, startColumn: number, endColumn: number})}} */ (item)).uri,
                                        startLine: (/** @type {{type: string, uri: string, label: (undefined|string), range: (undefined|{startLineNumber: number, endLineNumber: number, startColumn: number, endColumn: number})}} */ (item)).range.startLineNumber - 1,
                                        endLine: (/** @type {{type: string, uri: string, label: (undefined|string), range: (undefined|{startLineNumber: number, endLineNumber: number, startColumn: number, endColumn: number})}} */ (item)).range.endLineNumber - 1,
                                    },
                                });
                            }
                            else {
                                /** @type {boolean} */
                                let isDirectory = false;
                                try {
                                    /** @type {!tsickle_vscode_8.FileStat} */
                                    const stat = await vscode.workspace.fs.stat(vscode.Uri.parse((/** @type {{type: string, uri: string, label: (undefined|string), range: (undefined|{startLineNumber: number, endLineNumber: number, startColumn: number, endColumn: number})}} */ (item)).uri));
                                    isDirectory =
                                        (stat.type & vscode.FileType.Directory) !== 0;
                                }
                                catch {
                                    // Ignore stat error and default to file
                                }
                                if (isDirectory) {
                                    chunks.push({
                                        case: 'directory',
                                        value: {
                                            absoluteUri: (/** @type {{type: string, uri: string, label: (undefined|string), range: (undefined|{startLineNumber: number, endLineNumber: number, startColumn: number, endColumn: number})}} */ (item)).uri,
                                        },
                                    });
                                }
                                else {
                                    chunks.push({
                                        case: 'file',
                                        value: {
                                            absoluteUri: (/** @type {{type: string, uri: string, label: (undefined|string), range: (undefined|{startLineNumber: number, endLineNumber: number, startColumn: number, endColumn: number})}} */ (item)).uri,
                                        },
                                    });
                                }
                            }
                            break;
                        }
                        case 'terminal': {
                            chunks.push({
                                case: 'terminal',
                                value: {
                                    processId: (/** @type {{type: string, processId: (undefined|string|number), name: (undefined|string), selectionContent: (undefined|string)}} */ (item)).processId?.toString() ?? '',
                                    name: (/** @type {{type: string, processId: (undefined|string|number), name: (undefined|string), selectionContent: (undefined|string)}} */ (item)).name ?? '',
                                    lastCommand: '',
                                    selectionContent: (/** @type {{type: string, processId: (undefined|string|number), name: (undefined|string), selectionContent: (undefined|string)}} */ (item)).selectionContent ?? '',
                                },
                            });
                            break;
                        }
                        default:
                            (0, check_1.assumeExhaustive)(item);
                            console.warn('[Jetski] Unknown context item type:', item);
                    }
                }
            }
            await this.addContext(...chunks);
        })));
        this.context.subscriptions.push(vscode.commands.registerCommand('antigravity.explainAndFixProblem', (/**
         * @param {string} errorMessage
         * @param {{absoluteUri: string, startLine: number, endLine: number}} value
         * @return {!Promise<void>}
         */
        async (errorMessage, value) => {
            await this.addContext(`Explain what this problem is and help me fix it: ${errorMessage} `, {
                case: 'fileLineRange',
                value: {
                    absoluteUri: value.absoluteUri,
                    startLine: value.startLine,
                    endLine: value.endLine,
                },
            });
        })));
        this.context.subscriptions.push(vscode.AntigravityFiles?.onDidDragToCascade((/**
         * @param {!Array<!tsickle_vscode_8.AntigravityFiles.FileDragItem>} items
         * @return {!Promise<void>}
         */
        async (items) => {
            /** @type {!Array<(undefined|string|{value: ?, case: string}|{case: undefined, value: undefined}|{case: string, value: ?})>} */
            const chunks = await Promise.all(items.map((/**
             * @param {!tsickle_vscode_8.AntigravityFiles.FileDragItem} item
             * @return {!Promise<(undefined|string|{value: ?, case: string}|{case: undefined, value: undefined}|{case: string, value: ?})>}
             */
            async (item) => {
                if (item.range) {
                    return {
                        case: 'fileLineRange',
                        value: {
                            absoluteUri: item.uri.toString(),
                            startLine: item.range.start.line,
                            endLine: item.range.end.line,
                        },
                    };
                }
                /** @type {boolean} */
                let isDirectory = false;
                try {
                    /** @type {!tsickle_vscode_8.FileStat} */
                    const stat = await vscode.workspace.fs.stat(item.uri);
                    isDirectory = (stat.type & vscode.FileType.Directory) !== 0;
                }
                catch {
                    // Ignore stat error and default to file
                }
                if (isDirectory) {
                    return {
                        case: 'directory',
                        value: {
                            absoluteUri: item.uri.toString(),
                        },
                    };
                }
                return {
                    case: 'file',
                    value: {
                        absoluteUri: item.uri.toString(),
                    },
                };
            })));
            await this.addContext(...chunks);
        })) ?? { dispose: (/**
             * @return {void}
             */
            () => { }) });
        this.context.subscriptions.push(vscode.commands.registerCommand('antigravity.triggerSend', (/**
         * @return {!Promise<void>}
         */
        async () => {
            /** @type {!tsickle_jetski_instance_12.JetskiInstance} */
            const view = await this.ensureMainInstance();
            view.focus();
            await view.api.triggerSend({});
        })));
        this.registerCascadeListeners();
        this.editorStateWatcher = new editor_state_watcher_1.EditorStateWatcher({
            views: (/**
             * @return {!Array<!tsickle_jetski_instance_12.JetskiInstance>}
             */
            () => this.mainViews),
            notebookUtils: config.notebookUtils,
        });
        this.context.subscriptions.push(this.editorStateWatcher.watch());
        this.registerStaticCommandsFromPackageJson();
        // Trigger startup request to sync initial context.
        /** @type {(undefined|!tsickle_vscode_8.TextEditor)} */
        const activeEditor = vscode.window.activeTextEditor;
        /** @type {(undefined|?)} */
        const activeDoc = this.editorStateWatcher.buildTextDocument(activeEditor, activeEditor?.document) ??
            this.editorStateWatcher.buildNotebookDocument(vscode.window.activeNotebookEditor);
        this.editorStateWatcher.forward('STARTUP', activeDoc);
    }
    /**
     * @public
     * @param {...(undefined|string|{value: ?, case: string}|{case: undefined, value: undefined}|{case: string, value: ?})} chunks
     * @return {!Promise<void>}
     */
    async addContext(...chunks) {
        /** @type {!tsickle_jetski_instance_12.JetskiInstance} */
        const view = await this.ensureMainInstance();
        view.focus();
        /** @type {!Array<(undefined|string|{value: ?, case: string}|{case: undefined, value: undefined}|{case: string, value: ?})>} */
        const expandedChunks = [];
        for (const chunk of chunks) {
            expandedChunks.push(chunk);
            if (typeof chunk !== 'string') {
                expandedChunks.push(' ');
            }
        }
        /** @type {!Array<?>} */
        const items = expandedChunks.map((/**
         * @param {(undefined|string|{value: ?, case: string}|{case: undefined, value: undefined}|{case: string, value: ?})} chunk
         * @return {?}
         */
        (chunk) => {
            if (typeof chunk === 'string') {
                return (0, protobuf_1.create)(codeium_common_pb_1.TextOrScopeItemSchema, {
                    chunk: {
                        case: 'text',
                        value: chunk,
                    },
                });
            }
            else {
                return (0, protobuf_1.create)(codeium_common_pb_1.TextOrScopeItemSchema, {
                    chunk: {
                        case: 'item',
                        value: (0, protobuf_1.create)(codeium_common_pb_1.ContextScopeItemSchema, {
                            scopeItem: chunk,
                        }),
                    },
                });
            }
        }));
        if (items.length > 0) {
            /** @type {number} */
            let attempts = 0;
            /** @type {number} */
            const maxAttempts = 10;
            while (attempts < maxAttempts) {
                try {
                    await view.api.addContext({ items });
                    break;
                }
                catch (e) {
                    attempts++;
                    if (attempts >= maxAttempts) {
                        throw e;
                    }
                    await new Promise((/**
                     * @param {function(*): void} r
                     * @return {void}
                     */
                    (r) => {
                        setTimeout(r, 500);
                    }));
                }
            }
        }
    }
    /**
     * @public
     * @return {!Promise<void>}
     */
    async newConversation() {
        /** @type {!tsickle_jetski_instance_12.JetskiInstance} */
        const view = await this.ensureMainInstance();
        view.focus();
        await view.api.newConversation({});
    }
    /**
     * @public
     * @param {!Array<*>} markers
     * @return {!Promise<void>}
     */
    async sendAllMarkers(markers) {
        /** @type {!tsickle_jetski_instance_12.JetskiInstance} */
        const view = await this.ensureMainInstance();
        await this.newConversation();
        /** @type {string} */
        const primer = `The IDE found these problems in the workspace. Any line numbers in the following JSON are 1-based.`;
        /** @type {string} */
        const content = `${primer} Problems in JSON format: ${JSON.stringify(markers)}`;
        await this.addContext({
            case: 'textBlock',
            value: {
                content,
                identifier: {
                    case: 'label',
                    value: 'Current Problems',
                },
            },
        });
        await this.addContext("Fix the problems listed in 'Current Problems'.");
        await view.api.triggerSend({});
    }
    /**
     * @public
     * @param {string} fileName
     * @param {string} filePath
     * @param {!Array<*>} markers
     * @return {!Promise<void>}
     */
    async sendFileMarkers(fileName, filePath, markers) {
        /** @type {!tsickle_jetski_instance_12.JetskiInstance} */
        const view = await this.ensureMainInstance();
        await this.newConversation();
        /** @type {string} */
        const primer = `The IDE found these problems in ${fileName}. Any line numbers in the following JSON are 1-based.`;
        /** @type {string} */
        const content = `${primer} Problems in JSON format: ${JSON.stringify(markers)}`;
        await this.addContext({
            case: 'textBlock',
            value: {
                content,
                identifier: {
                    case: 'label',
                    value: `Current Problems in ${fileName}`,
                },
            },
        });
        await this.addContext(`Fix the problems listed in 'Current Problems in ${fileName}'.`);
        await view.api.triggerSend({});
    }
    /**
     * @public
     * @param {!tsickle_vscode_8.Uri} uri
     * @return {string}
     */
    provideTextDocumentContent(uri) {
        /** @type {string} */
        const fileUri = decodeURIComponent(uri.path.substring(1));
        if (uri.authority === 'original') {
            return this.originalContentsMap.get(fileUri) ?? '';
        }
        else if (uri.authority === 'modified') {
            return this.modifiedContentsMap.get(fileUri) ?? '';
        }
        return '';
    }
    /**
     * @private
     * @return {void}
     */
    registerCascadeListeners() {
        if (typeof vscode.Cascade === 'undefined')
            return;
        this.context.subscriptions.push(vscode.Cascade.onDidRequestAcceptAllInFile((/**
         * @param {{uri: !tsickle_vscode_8.Uri}} __0
         * @return {!Promise<void>}
         */
        async ({ uri }) => {
            await this.agentEditManager.handleResolveAllAgentEditsInFile(uri.toString(), true);
        })));
        this.context.subscriptions.push(vscode.Cascade.onDidRequestRejectAllInFile((/**
         * @param {{uri: !tsickle_vscode_8.Uri}} __0
         * @return {!Promise<void>}
         */
        async ({ uri }) => {
            await this.agentEditManager.handleResolveAllAgentEditsInFile(uri.toString(), false);
        })));
        this.context.subscriptions.push(vscode.Cascade.onDidRequestNextHunk((/**
         * @param {!tsickle_vscode_8.Uri} uri
         * @return {void}
         */
        (uri) => {
            this.agentEditManager.focusHunk(uri.toString(), 'next');
        })));
        this.context.subscriptions.push(vscode.Cascade.onDidRequestPreviousHunk((/**
         * @param {!tsickle_vscode_8.Uri} uri
         * @return {void}
         */
        (uri) => {
            this.agentEditManager.focusHunk(uri.toString(), 'previous');
        })));
    }
    /**
     * @public
     * @param {(!tsickle_vscode_8.WebviewView|!tsickle_vscode_8.WebviewPanel)} webviewView
     * @param {string} type
     * @return {!Promise<void>}
     */
    async registerWebview(webviewView, type) {
        /** @type {number} */
        const existingIndex = this.views.findIndex((/**
         * @param {!tsickle_jetski_instance_12.JetskiInstance} v
         * @return {boolean}
         */
        (v) => v.webview === webviewView.webview ||
            (type === 'main' && v.type === 'main')));
        if (existingIndex > -1) {
            /** @type {!tsickle_jetski_instance_12.JetskiInstance} */
            const existingView = this.views.splice(existingIndex, 1)[0];
            existingView.dispose();
        }
        /** @type {!tsickle_jetski_instance_12.JetskiInstance} */
        const view = new jetski_instance_1.JetskiInstance({
            extensionApi: this,
            type,
            view: webviewView,
            prefix: this.naming.prefix,
        });
        this.views.push(view);
        this.onDidRegisterViewEmitter.fire(view);
        if (this.commentsStateJson !== '{}') {
            void view.api
                .setComments({ commentsStateJson: this.commentsStateJson })
                .catch((/**
             * @param {?} e
             * @return {void}
             */
            (e) => {
                console.error('[Jetski] Failed to send initial comments to new view', e);
            }));
        }
        void this.forwardContextCategories(view);
        /** @type {!Array<!tsickle_agent_edit_manager_5.FileAgentEditState>} */
        const currentDiffStates = this.agentEditManager.getCurrentStates();
        if (currentDiffStates.length > 0) {
            void view.api.setFileDiffs({ fileDiffs: currentDiffStates }).catch((/**
             * @param {?} e
             * @return {void}
             */
            (e) => {
                if (connect_1.ConnectError.from(e).code !== connect_1.Code.NotFound) {
                    console.error('[ExtensionAPI] Failed to send initial file diffs to new view', e);
                }
            }));
        }
        /** @type {!Array<!tsickle_vscode_8.Disposable>} */
        const viewDisposables = [];
        viewDisposables.push(view.api.onDidChangeUrl((/**
         * @param {?} msg
         * @return {!Promise<void>}
         */
        (msg) => this.handleDidChangeUrl(view, msg))), view.api.onDidSendChatMessage((/**
         * @return {void}
         */
        () => {
            void this.telemetry?.logEvent('jetski_web.chat_message_sent', {
                'userAction': true,
            });
            /** @type {(undefined|!tsickle_vscode_8.TextEditor)} */
            const activeEditor = vscode.window.activeTextEditor;
            /** @type {(undefined|string)} */
            const activeFileUri = activeEditor?.document.uri.toString();
            this.agentEditManager.onChatSent(activeFileUri);
        })), view.api.onDidStartConversation((/**
         * @return {void}
         */
        () => {
            void this.telemetry?.logEvent('jetski_web.conversation_started', {
                'userAction': true,
            });
        })), view.api.onWebviewFocused((/**
         * @return {!Promise<void>}
         */
        async () => {
            this.editorStateWatcher.webviewFocused();
            this.setChatFocused(true);
            if (view.type !== 'main') {
                return;
            }
            try {
                await view.api.sendCommand({ commandId: 'focusInput' });
            }
            catch (e) {
                console.warn('[ExtensionAPI] Failed to focus input in webview:', e);
            }
        })));
        if ('onDidChangeVisibility' in webviewView &&
            typeof (/** @type {!tsickle_vscode_8.WebviewView} */ (webviewView)).onDidChangeVisibility === 'function') {
            viewDisposables.push((/** @type {!tsickle_vscode_8.WebviewView} */ (webviewView)).onDidChangeVisibility((/**
             * @return {void}
             */
            () => {
                this.setChatFocused((/** @type {!tsickle_vscode_8.WebviewView} */ (webviewView)).visible);
            })));
        }
        else if ('onDidChangeViewState' in webviewView &&
            typeof (/** @type {!tsickle_vscode_8.WebviewPanel} */ (webviewView)).onDidChangeViewState === 'function') {
            viewDisposables.push((/** @type {!tsickle_vscode_8.WebviewPanel} */ (webviewView)).onDidChangeViewState((/**
             * @param {!tsickle_vscode_8.WebviewPanelOnDidChangeViewStateEvent} e
             * @return {void}
             */
            (e) => {
                this.setChatFocused(e.webviewPanel.active);
            })));
        }
        webviewView.onDidDispose((/**
         * @return {void}
         */
        () => {
            /** @type {number} */
            const index = this.views.indexOf(view);
            if (index > -1) {
                this.views.splice(index, 1);
            }
            for (const d of viewDisposables) {
                d.dispose();
            }
            view.dispose();
        }));
    }
    /**
     * @private
     * @param {!tsickle_jetski_instance_12.JetskiInstance} view
     * @param {?} request
     * @return {!Promise<void>}
     */
    async handleDidChangeUrl(view, request) {
        if (view.type !== 'main') {
            return;
        }
        if (request.path) {
            /** @type {(null|!RegExpMatchArray)} */
            const match = request.path.match(/^\/c\/([^/]+)$/);
            if (match) {
                /** @type {string} */
                const conversationId = match[1];
                /** @type {(undefined|string)} */
                const lastConversationId = this.context.workspaceState.get('lastConversationId');
                // When starting a new chat from the '/' screen, lastConversationId is unset.
                // As the chat starts, the webview assigns an ID and updates the URL to '/c/<id>'.
                // Do not auto-accept here, as the user is still reviewing the newly proposed edits.
                // Only auto-accept pending edits when switching away from an existing chat to a different chat.
                if (lastConversationId && lastConversationId !== conversationId) {
                    await this.agentEditManager.handleResolveAllAgentEdits(true);
                }
                void this.context.workspaceState.update('lastConversationId', conversationId);
            }
            else if (request.path === '/') {
                /** @type {(undefined|string)} */
                const lastConversationId = this.context.workspaceState.get('lastConversationId');
                // Auto-accept remaining edits from the previous chat when explicitly clicking
                // "+ New Chat" (navigating back to root '/').
                if (lastConversationId) {
                    await this.agentEditManager.handleResolveAllAgentEdits(true);
                }
                void this.context.workspaceState.update('lastConversationId', undefined);
            }
        }
    }
    /**
     * @public
     * @param {?} request
     * @return {!Promise<*>}
     */
    async logTelemetry(request) {
        /** @type {?} */
        const properties = {};
        if (request.properties) {
            for (const [key__tsickle_destructured_1, value__tsickle_destructured_2] of Object.entries(request.properties)) {
                const key = /** @type {string} */ (key__tsickle_destructured_1);
                const value = /** @type {string} */ (value__tsickle_destructured_2);
                properties[key] = value;
            }
        }
        if (request.eventName) {
            await this.telemetry?.logEvent(request.eventName, properties);
        }
        return {};
    }
    /**
     * @public
     * @param {?} request
     * @return {!Promise<*>}
     */
    async openUrl(request) {
        if (request.url) {
            try {
                /** @type {!tsickle_vscode_8.Uri} */
                const uri = vscode.Uri.parse(request.url);
                await vscode.env.openExternal(uri);
            }
            catch (e) {
                console.error('[Jetski] Failed to open URL', e);
                throw e;
            }
        }
        return {};
    }
    /**
     * Opens the Settings custom editor in an editor tab.
     *
     * Fixes duplicate tab bug across both Cider and VS Code Desktop:
     * - VS Code and Cider match custom editor tabs using `CustomEditorInput.matches()`, which delegates
     *   to strict URI string equality (`ExtUri.isEqual()`). Varying query strings across callers
     *   (e.g. `?targetScreen=General` vs `?targetScreen=Customizations` vs no query) cause the editor host
     *   to treat each as an independent document and spawn duplicate editor tabs.
     * - Furthermore, `vscode.openWith` without an explicit `viewColumn` defaults to the active editor group.
     *   If Settings is already open in Group 1 but the user is currently editing code in Group 2 (split view),
     *   calling `vscode.openWith` would spawn a second Settings tab in Group 2.
     * - Fix:
     *   1. Checks all tab groups via `findOpenCustomTab` to detect if a Settings tab is already open.
     *   2. If open: reveals that existing tab in its current `viewColumn` via `revealOpenCustomTab`,
     *      and calls `SettingsEditorProvider.updateActiveSettings()` to navigate to the target screen in-place.
     *   3. If not open: records pending target options in-memory via `SettingsEditorProvider.setPendingOptions()`
     *      and opens the canonical document URI (`jetski-settings://global`) with no query parameters.
     * @public
     * @param {?} request
     * @return {!Promise<?>}
     */
    async openSettings(request) {
        // Concurrency guard: await any in-flight openSettings operation to prevent race conditions
        // from rapid concurrent calls (e.g. double-click) opening duplicate tabs.
        if (this.pendingOpenSettingsPromise != null) {
            try {
                await this.pendingOpenSettingsPromise;
            }
            catch {
                // Ignore error from prior invocation and proceed with current request.
            }
        }
        /** @type {!Promise<void>} */
        const openPromise = ((/**
         * @return {!Promise<void>}
         */
        async () => {
            try {
                /** @type {!tsickle_vscode_8.Uri} */
                const canonicalUri = vscode.Uri.parse(`${settings_editor_provider_1.SettingsEditorProvider.fileScheme}://global`);
                // Check if a settings tab is already open across all tab groups to prevent opening duplicate
                // tabs when triggered from different editor groups or at different times.
                /** @type {(undefined|!OpenTabMatch)} */
                const existingTab = findOpenCustomTab((/**
                 * @param {!CustomTabInput} input
                 * @return {boolean}
                 */
                (input) => input.viewType === settings_editor_provider_1.SettingsEditorProvider.viewType ||
                    input.uri.scheme === settings_editor_provider_1.SettingsEditorProvider.fileScheme));
                if (existingTab) {
                    // Tab is already open! Reveal and focus the existing tab in its current view column.
                    await revealOpenCustomTab(existingTab, settings_editor_provider_1.SettingsEditorProvider.viewType);
                    // If a specific target screen, project, or workspace was requested, update the active
                    // settings webview panel in-place rather than opening a new tab.
                    if (request.targetScreen ||
                        request.targetProjectId ||
                        request.targetWorkspaceUri) {
                        await this.settingsEditorProvider?.updateActiveSettings({
                            targetScreen: request.targetScreen,
                            targetProjectId: request.targetProjectId,
                            targetWorkspaceUri: request.targetWorkspaceUri,
                        });
                    }
                    return;
                }
                // No tab open yet: record pending navigation options before opening so resolveCustomEditor
                // can pick them up during initialization without polluting the document URI.
                this.settingsEditorProvider?.setPendingOptions({
                    targetScreen: request.targetScreen,
                    targetProjectId: request.targetProjectId,
                    targetWorkspaceUri: request.targetWorkspaceUri,
                });
                await vscode.commands.executeCommand('vscode.openWith', canonicalUri, settings_editor_provider_1.SettingsEditorProvider.viewType, { preview: false });
            }
            catch (error) {
                console.error('[Jetski] Failed to open settings panel', error);
                void this.telemetry?.logError?.('jetski_web.open_settings_error', {
                    'errorName': error instanceof Error ? (/** @type {!Error} */ (error)).name : 'unknown',
                    'errorMessage': String(error),
                    'targetScreen': request.targetScreen,
                });
                throw error;
            }
        }))();
        this.pendingOpenSettingsPromise = openPromise;
        try {
            await openPromise;
        }
        finally {
            if (this.pendingOpenSettingsPromise === openPromise) {
                this.pendingOpenSettingsPromise = undefined;
            }
        }
        return {};
    }
    /**
     * @public
     * @param {?} request
     * @return {!Promise<*>}
     */
    async openTerminal(request) {
        try {
            if (!this.terminalPanelProvider) {
                throw new Error('Terminal panel provider not registered');
            }
            await this.terminalPanelProvider.showTerminal(request);
            await vscode.commands.executeCommand('jetski.terminalView.focus');
        }
        catch (e) {
            console.error('[Jetski] Failed to open terminal panel', e);
            throw e;
        }
        return {};
    }
    /**
     * @public
     * @param {?} request
     * @return {!Promise<*>}
     */
    async changeWorkspace(request) {
        if (!request.workspaceUri) {
            return {};
        }
        try {
            if (this.workspaceManager) {
                /** @type {(undefined|string)} */
                const conversationId = this.context.workspaceState.get('lastConversationId');
                await this.workspaceManager.changeWorkspace(request.workspaceUri, conversationId);
            }
            else {
                /** @type {!tsickle_vscode_8.Uri} */
                const uri = vscode.Uri.parse(request.workspaceUri);
                await vscode.commands.executeCommand('vscode.openFolder', uri);
            }
        }
        catch (e) {
            console.error(`[Jetski] Failed to change workspace: ${request.workspaceUri}`, e);
        }
        return {};
    }
    /**
     * @public
     * @param {?} request
     * @return {!Promise<?>}
     */
    async executeNotebookCells(request) {
        if (!request.notebookUri) {
            throw new Error('notebookUri is required');
        }
        if (!request.cellIds || request.cellIds.length === 0) {
            throw new Error('cellIds is required');
        }
        if (!this.notebookExecutor) {
            throw new Error('Notebook execution is not supported in this environment.');
        }
        try {
            /** @type {!Array<!tsickle_delegate_interfaces_10.CellExecutionOutput>} */
            const outputs = await this.notebookExecutor.executeNotebookCells(request.notebookUri, request.cellIds ?? []);
            return (0, protobuf_1.create)(iframe_messages_pb_1.ExecuteNotebookCellsResponseSchema, {
                result: {
                    case: 'executionResult',
                    value: {
                        outputs,
                        status: 'success',
                    },
                },
            });
        }
        catch (e) {
            console.error(`[Jetski] Failed to execute notebook cells: ${request.notebookUri}`, e);
            return (0, protobuf_1.create)(iframe_messages_pb_1.ExecuteNotebookCellsResponseSchema, {
                result: {
                    case: 'errorResult',
                    value: {
                        errorMessage: e instanceof Error ? (/** @type {!Error} */ (e)).message : String(e),
                    },
                },
            });
        }
    }
    /**
     * @public
     * @param {?} request
     * @return {!Promise<*>}
     */
    async openFile(request) {
        if (request.fileUri) {
            try {
                /** @type {!tsickle_vscode_8.Uri} */
                const uri = vscode.Uri.parse(request.fileUri);
                if (this.isWorkspaceRoot(uri)) {
                    await this.changeWorkspace((0, protobuf_1.create)(iframe_messages_pb_1.ChangeWorkspaceRequestSchema, {
                        workspaceUri: request.fileUri,
                    }));
                    return {};
                }
                try {
                    /** @type {!tsickle_vscode_8.FileStat} */
                    const stat = await vscode.workspace.fs.stat(uri);
                    if (stat.type === vscode.FileType.Directory) {
                        // This fixes issue when explorer is not visible.
                        await vscode.commands.executeCommand('workbench.view.explorer');
                        await vscode.commands.executeCommand('revealInExplorer', uri);
                        return {};
                    }
                }
                catch (e) {
                    // Ignore stat failure, proceed to open as file
                }
                // Check if file is resolved in current edit session
                /** @type {boolean} */
                const hasUnresolved = this.agentEditManager.hasUnresolvedHunks(request.fileUri);
                /** @type {(undefined|{originalContents: string, modifiedContents: string})} */
                const diffDetails = this.agentEditManager.getDiffZoneDetails(request.fileUri);
                if (!hasUnresolved && diffDetails) {
                    await this.openVirtualDiff(request.fileUri, diffDetails.originalContents, diffDetails.modifiedContents, `Diff: ${request.fileUri.substring(request.fileUri.lastIndexOf('/') + 1)} (Resolved)`);
                    return {};
                }
                /** @type {!tsickle_vscode_8.TextDocument} */
                const doc = await vscode.workspace.openTextDocument(uri);
                /** @type {!tsickle_vscode_8.TextDocumentShowOptions} */
                const options = { preview: true };
                if (request.line > 0) {
                    /** @type {!tsickle_vscode_8.Position} */
                    const pos = new vscode.Position(request.line - 1, 0);
                    options.selection = new vscode.Range(pos, pos);
                }
                await vscode.window.showTextDocument(doc, options);
            }
            catch (e) {
                console.error(`[Jetski] Failed to open file: ${request.fileUri}`, e);
                throw e;
            }
        }
        return {};
    }
    /**
     * @private
     * @param {!tsickle_vscode_8.Uri} uri
     * @return {boolean}
     */
    isWorkspaceRoot(uri) {
        /** @type {string} */
        const path = uri.path;
        // CitC: /google/src/cloud/user/workspace(/google3)?
        /** @type {!RegExp} */
        const citcRegex = /^\/google\/src\/cloud\/[^/]+\/[^/]+(\/google3)?\/?$/;
        // Cog: /google/cog/cloud/user/workspace
        /** @type {!RegExp} */
        const cogRegex = /^\/google\/cog\/cloud\/[^/]+\/[^/]+\/?$/;
        return citcRegex.test(path) || cogRegex.test(path);
    }
    /**
     * Opens an Artifact custom editor tab for a given file URI.
     *
     * Fixes duplicate tab bug across both Cider and VS Code Desktop:
     * 1. Normalizes the URI by stripping fragment anchors (`#heading`, `#L1-10`) so that link clicks
     *    pointing to headings match the exact document URI of tabs opened from the explorer or chip.
     * 2. Inspects all tab groups (`vscode.window.tabGroups.all`) to find any open custom editor tab
     *    matching the file's canonical path (`targetPath`), across `file:`, `jetski-artifact:`, and
     *    the configured `artifactEditorId` viewType.
     * 3. If an existing tab is found: reveals that tab in its existing `group.viewColumn` with `preview: false`.
     *    This prevents opening duplicate tabs across split editor groups or when opened via different schemes.
     * 4. If not found: records `cascadeId` in `ArtifactEditorProvider` and opens with canonical URI.
     * @public
     * @param {?} request
     * @return {!Promise<?>}
     */
    async openArtifact(request) {
        if (!request.fileUri) {
            return {};
        }
        /** @type {!tsickle_vscode_8.Uri} */
        const baseUri = vscode.Uri.parse(request.fileUri);
        /** @type {string} */
        const cascadeId = request.cascadeId ?? '';
        /** @type {string} */
        const targetViewType = this.naming.artifactEditorId ?? artifact_editor_provider_1.ArtifactEditorProvider.viewType;
        // Strip fragments (e.g. #L1-L10 or #heading) to ensure the document URI
        // matches across all callers and does not cause VS Code to open duplicate tabs.
        /** @type {!tsickle_vscode_8.Uri} */
        const cleanBaseUri = baseUri.with({ fragment: '' });
        /** @type {string} */
        const targetPath = cleanBaseUri.path;
        // Concurrency guard: await any in-flight open operation for this exact file path
        // to prevent rapid concurrent clicks from opening duplicate tabs.
        /** @type {(undefined|!Promise<void>)} */
        const pending = this.pendingOpenArtifacts.get(targetPath);
        if (pending != null) {
            try {
                await pending;
            }
            catch {
                // Ignore error from prior invocation and proceed with current request.
            }
        }
        /** @type {!Promise<void>} */
        const openPromise = ((/**
         * @return {!Promise<void>}
         */
        async () => {
            try {
                // Check if an artifact tab for this exact file is already open across all tab groups.
                // This handles cases where:
                // 1. The artifact was opened from the file explorer or Quick Open (scheme: 'file', no query).
                // 2. The artifact was opened earlier in a different editor group (split window).
                // 3. The artifact was opened from another conversation/subagent with a different cascadeId query.
                /** @type {(undefined|!OpenTabMatch)} */
                const existingTab = findOpenCustomTab((/**
                 * @param {!CustomTabInput} input
                 * @return {boolean}
                 */
                (input) => (input.viewType === targetViewType ||
                    input.viewType === artifact_editor_provider_1.ArtifactEditorProvider.viewType ||
                    input.uri.scheme === artifact_editor_provider_1.ArtifactEditorProvider.fileScheme) &&
                    input.uri.path === targetPath));
                if (existingTab) {
                    // Tab is already open! Reveal and focus the existing tab in its current view column.
                    await revealOpenCustomTab(existingTab, targetViewType);
                    return;
                }
                // Store cascadeId for the path in the provider if available.
                if (cascadeId) {
                    this.artifactEditorProvider?.setCascadeIdForPath(targetPath, cascadeId);
                }
                // Canonical artifact URI using jetski-artifact scheme.
                /** @type {!URLSearchParams} */
                const queryParams = new URLSearchParams();
                if (cascadeId) {
                    queryParams.set('cascadeId', cascadeId);
                }
                /** @type {!tsickle_vscode_8.Uri} */
                const uri = cleanBaseUri.with({
                    scheme: artifact_editor_provider_1.ArtifactEditorProvider.fileScheme,
                    query: queryParams.toString(),
                });
                await vscode.commands.executeCommand('vscode.openWith', uri, targetViewType, { preview: true });
            }
            catch (error) {
                console.error(`[Jetski] Failed to open artifact: ${request.fileUri}`, error);
                throw error;
            }
        }))();
        this.pendingOpenArtifacts.set(targetPath, openPromise);
        try {
            await openPromise;
        }
        finally {
            if (this.pendingOpenArtifacts.get(targetPath) === openPromise) {
                this.pendingOpenArtifacts.delete(targetPath);
            }
        }
        return {};
    }
    /**
     * @private
     * @param {string} fileUri
     * @param {string} originalContents
     * @param {string} modifiedContents
     * @param {(undefined|string)=} title
     * @return {!Promise<void>}
     */
    async openVirtualDiff(fileUri, originalContents, modifiedContents, title) {
        this.originalContentsMap.set(fileUri, originalContents);
        this.modifiedContentsMap.set(fileUri, modifiedContents);
        /** @type {!tsickle_vscode_8.Uri} */
        const originalUri = vscode.Uri.parse(`jetski-diff://original/${encodeURIComponent(fileUri)}`);
        /** @type {!tsickle_vscode_8.Uri} */
        const modifiedUri = vscode.Uri.parse(`jetski-diff://modified/${encodeURIComponent(fileUri)}`);
        /** @type {string} */
        const fileName = fileUri.substring(fileUri.lastIndexOf('/') + 1);
        /** @type {string} */
        const finalTitle = title ?? `Diff: ${fileName}`;
        await vscode.commands.executeCommand('vscode.diff', originalUri, modifiedUri, finalTitle);
    }
    /**
     * @public
     * @param {?} request
     * @return {!Promise<*>}
     */
    async openDiff(request) {
        if (request.originalUri && request.modifiedUri) {
            try {
                /** @type {!tsickle_vscode_8.Uri} */
                const original = vscode.Uri.parse(request.originalUri);
                /** @type {!tsickle_vscode_8.Uri} */
                const modified = vscode.Uri.parse(request.modifiedUri);
                /** @type {string} */
                const title = request.title ?? 'Diff';
                await vscode.commands.executeCommand('vscode.diff', original, modified, title);
            }
            catch (e) {
                console.error('[Jetski] Failed to open diff', e);
                throw e;
            }
        }
        else if (request.fileUri &&
            request.originalContents !== undefined &&
            request.modifiedContents !== undefined) {
            try {
                await this.openVirtualDiff(request.fileUri, request.originalContents, request.modifiedContents, request.title);
            }
            catch (e) {
                console.error('[Jetski] Failed to open virtual diff', e);
                throw e;
            }
        }
        return {};
    }
    /**
     * @public
     * @param {?} request
     * @return {!Promise<*>}
     */
    async addAgentEdit(request) {
        await this.agentEditManager.handleAddAgentEdit(request);
        return {};
    }
    /**
     * @public
     * @return {!Promise<*>}
     */
    async closeAllDiffZones() {
        await this.agentEditManager.handleResolveAllAgentEdits(false);
        return {};
    }
    /**
     * @public
     * @param {?} request
     * @return {!Promise<*>}
     */
    async resolveAllAgentEdits(request) {
        await this.agentEditManager.handleResolveAllAgentEdits(request.accept);
        return {};
    }
    /**
     * @public
     * @return {!Promise<{states: !Array<{uri: string, numLinesInserted: number, numLinesDeleted: number, createdByCascade: boolean}>}>}
     */
    async requestAgentEditsState() {
        /** @type {!Array<!tsickle_agent_edit_manager_5.FileAgentEditState>} */
        const states = this.agentEditManager.getCurrentStates();
        /** @type {!Array<{uri: string, numLinesInserted: number, numLinesDeleted: number, createdByCascade: boolean}>} */
        const protoStates = states.map((/**
         * @param {!tsickle_agent_edit_manager_5.FileAgentEditState} s
         * @return {{uri: string, numLinesInserted: number, numLinesDeleted: number, createdByCascade: boolean}}
         */
        (s) => ({
            uri: s.uri,
            numLinesInserted: s.numLinesInserted,
            numLinesDeleted: s.numLinesDeleted,
            createdByCascade: s.createdByCascade,
        })));
        return { states: protoStates };
    }
    /**
     * @public
     * @return {!Promise<{states: !Array<{uri: string, numLinesInserted: number, numLinesDeleted: number, createdByCascade: boolean}>}>}
     */
    async requestDiffZonesState() {
        /** @type {!Array<!tsickle_agent_edit_manager_5.FileAgentEditState>} */
        const states = this.agentEditManager.getCurrentStates();
        /** @type {!Array<{uri: string, numLinesInserted: number, numLinesDeleted: number, createdByCascade: boolean}>} */
        const protoStates = states.map((/**
         * @param {!tsickle_agent_edit_manager_5.FileAgentEditState} s
         * @return {{uri: string, numLinesInserted: number, numLinesDeleted: number, createdByCascade: boolean}}
         */
        (s) => ({
            uri: s.uri,
            numLinesInserted: s.numLinesInserted,
            numLinesDeleted: s.numLinesDeleted,
            createdByCascade: s.createdByCascade,
        })));
        return { states: protoStates };
    }
    /**
     * @public
     * @param {?} request
     * @return {!Promise<{items: ?}>}
     */
    async storageGetItems(request) {
        /** @type {?} */
        const state = this.context.globalState.get(this.naming.storageKey) || {};
        /** @type {?} */
        let result = {};
        // Note: in TypeScript protobuf / ConnectRPC, omitted repeated fields default
        // to an empty array [] which is truthy in JavaScript. Check length > 0 so that
        // an empty or omitted keys list returns all items (desktop polyfill style).
        if (request.keys && request.keys.length > 0) {
            // Cider style: filter by requested keys
            for (const key of request.keys) {
                /** @type {string} */
                const value = state[key];
                if (value !== undefined && value !== null) {
                    result[key] =
                        typeof value === 'string' ? value : JSON.stringify(value);
                }
            }
        }
        else {
            // Desktop polyfill style: return all items
            result = state;
        }
        return { items: result };
    }
    /**
     * @public
     * @param {?} request
     * @return {!Promise<*>}
     */
    async storageUpdateItems(request) {
        /** @type {?} */
        const state = this.context.globalState.get(this.naming.storageKey) || {};
        for (const [key__tsickle_destructured_3, value__tsickle_destructured_4] of Object.entries(request.items)) {
            const key = /** @type {string} */ (key__tsickle_destructured_3);
            const value = /** @type {string} */ (value__tsickle_destructured_4);
            state[key] = value;
        }
        for (const key of request.keysToDelete) {
            delete state[key];
        }
        await this.context.globalState.update(this.naming.storageKey, state);
        return {};
    }
    /**
     * @public
     * @return {!Promise<{text: string}>}
     */
    async clipboardRead() {
        // Read clipboard from the extension host (which has full access) and
        // send the text back to the sandboxed iframe that can't read clipboard
        // directly.
        try {
            /** @type {string} */
            const text = await vscode.env.clipboard.readText();
            return { text };
        }
        catch (e) {
            console.error('[Jetski] Failed to read clipboard', e);
            throw e;
        }
    }
    /**
     * @public
     * @param {*} request
     * @return {!Promise<{permission: string}>}
     */
    async getBrowserNotificationPermissionState(request) {
        return {
            permission: (await this.browserNotificationDelegate?.getNotificationPermissionState(request)) ?? 'denied',
        };
    }
    /**
     * @public
     * @param {*} request
     * @return {!Promise<{permission: string}>}
     */
    async requestBrowserNotificationPermission(request) {
        return {
            permission: (await this.browserNotificationDelegate?.requestNotificationPermission(request)) ?? 'denied',
        };
    }
    /**
     * @public
     * @param {?} request
     * @return {!Promise<*>}
     */
    async showBrowserNotification(request) {
        /** @type {(undefined|string)} */
        const notificationId = request.payload?.id;
        if (notificationId) {
            if (this.sentNotificationIds.has(notificationId)) {
                return {};
            }
            this.sentNotificationIds.add(notificationId);
            if (this.sentNotificationIds.size > MAX_SENT_NOTIFICATION_IDS) {
                /** @type {?} */
                const first = this.sentNotificationIds.values().next().value;
                if (first !== undefined) {
                    this.sentNotificationIds.delete(first);
                }
            }
        }
        /** @type {(undefined|string)} */
        const cascadeId = request.payload?.cascadeId;
        /** @type {(undefined|string)} */
        const activeConversationId = this.context.workspaceState.get('lastConversationId');
        // Only suppress if Cider is currently focused AND the notification is for the active conversation
        if (vscode.window.state.focused &&
            cascadeId &&
            cascadeId === activeConversationId) {
            return {};
        }
        await this.browserNotificationDelegate?.showBrowserNotification(request);
        return {};
    }
    /**
     * @public
     * @param {?} request
     * @return {!Promise<{handled: boolean, primaryActionClicked: boolean}>}
     */
    async showNotification(request) {
        if (this.browserNotificationDelegate?.showFocusingNotification &&
            !vscode.window.state.focused) {
            return this.browserNotificationDelegate.showFocusingNotification(request);
        }
        return this.showVSCodeNotification(request);
    }
    /**
     * @private
     * @param {?} request
     * @return {!Promise<{handled: boolean, primaryActionClicked: boolean}>}
     */
    async showVSCodeNotification(request) {
        /** @type {string} */
        const message = request.title
            ? `${request.title}: ${request.message}`
            : request.message;
        /** @type {!Array<string>} */
        const items = [];
        if (request.primaryActionLabel) {
            items.push(request.primaryActionLabel);
        }
        /** @type {(undefined|string)} */
        const result = await vscode.window.showInformationMessage(message, ...items);
        return {
            handled: true,
            primaryActionClicked: result === request.primaryActionLabel,
        };
    }
    /**
     * @public
     * @param {?} request
     * @return {!Promise<*>}
     */
    async reportFeedbackMetadata(request) {
        this.feedbackMetadata = request.metadata;
        return {};
    }
    /**
     * @public
     * @param {?} request
     * @return {!Promise<*>}
     */
    async provideFeedback(request) {
        void vscode.commands.executeCommand('feedback.start', {
            bucket: 'jetski-web',
            title: request.title,
            description: request.description,
        });
        return {};
    }
    /**
     * @public
     * @return {?}
     */
    getFeedbackMetadata() {
        return { ...this.feedbackMetadata };
    }
    /**
     * @public
     * @param {*} request
     * @return {!Promise<?>}
     */
    async getEditorState(request) {
        return this.editorStateWatcher.getCurrentEditorState();
    }
    /**
     * @public
     * @param {?} request
     * @return {!Promise<*>}
     */
    async broadcastComments(request) {
        this.commentsStateJson = request.commentsStateJson;
        for (const view of this.views) {
            void view.api
                .setComments({ commentsStateJson: this.commentsStateJson })
                .catch((/**
             * @param {?} e
             * @return {void}
             */
            (e) => {
                console.error(`[Jetski] Failed to broadcast comments to view of type ${view.type} (title: ${view.title})`, e);
            }));
        }
        return {};
    }
    /**
     * @public
     * @param {?} request
     * @return {!Promise<{canResolve: boolean}>}
     */
    async canResolveConnection(request) {
        if (request.type === iframe_messages_pb_1.ConnectionResolutionType.RECONNECT ||
            request.type === iframe_messages_pb_1.ConnectionResolutionType.RESTART_LS) {
            return { canResolve: true };
        }
        /** @type {boolean} */
        const canResolve = (await this.connectionResolver?.canResolveConnection(request.type)) ??
            false;
        return { canResolve };
    }
    /**
     * @public
     * @param {?} request
     * @return {(!Promise<{success: boolean, errorMessage: (undefined|string)}>|{success: boolean, errorMessage: undefined}|{success: boolean, errorMessage: string})}
     */
    resolveConnection(request) {
        /** @type {!tsickle_util_15.OutputChannelWithNetwork} */
        const log = (0, util_1.getOutputChannel)();
        log.appendLine(`[ExtensionApi] resolveConnection called with type: ${request.type}`);
        if (request.type === iframe_messages_pb_1.ConnectionResolutionType.RECONNECT) {
            log.appendLine('[ExtensionApi] Reconnection requested by UI');
            void vscode.commands.executeCommand(`${this.naming.prefix}.reconnect`);
            return { success: true };
        }
        if (request.type === iframe_messages_pb_1.ConnectionResolutionType.RESTART_LS) {
            log.appendLine('[ExtensionApi] Restart requested by UI');
            void vscode.commands.executeCommand(`${this.naming.prefix}.triggerUpdate`);
            return { success: true };
        }
        if (!this.connectionResolver) {
            log.appendLine(`[ExtensionApi] Resolution type requires a connection resolver which is not defined: ${request.type}`);
            return {
                success: false,
                errorMessage: `Resolution type requires a connection resolver which is not defined: ${request.type}`,
            };
        }
        try {
            return this.connectionResolver.resolveConnection(request.type);
        }
        catch (e) {
            return {
                success: false,
                errorMessage: String(e),
            };
        }
    }
    /**
     * @public
     * @param {(undefined|!tsickle_jetski_instance_12.JetskiInstance)=} targetView
     * @return {!Promise<void>}
     */
    async forwardContextCategories(targetView) {
        const { categories } = await this.getContextCategories();
        /** @type {!Array<!tsickle_jetski_instance_12.JetskiInstance>} */
        const viewsToNotify = targetView ? [targetView] : this.views;
        for (const view of viewsToNotify) {
            void view.api.setContextCategories({ categories });
        }
    }
    /**
     * @public
     * @param {!tsickle_delegate_interfaces_10.DynamicContextProvider} provider
     * @return {!tsickle_vscode_8.Disposable}
     */
    registerContextCategoryProvider(provider) {
        this.contextCategoryProviders.set(provider.trigger, provider);
        void this.forwardContextCategories();
        return new vscode.Disposable((/**
         * @return {void}
         */
        () => {
            if (this.contextCategoryProviders.get(provider.trigger) === provider) {
                this.contextCategoryProviders.delete(provider.trigger);
                void this.forwardContextCategories();
            }
        }));
    }
    /**
     * @public
     * @return {!Promise<{categories: !Array<{trigger: string, label: string, iconUri: string}>}>}
     */
    async getContextCategories() {
        /** @type {!Array<{trigger: string, label: string, iconUri: string}>} */
        const categories = [];
        for (const p of this.contextCategoryProviders.values()) {
            /** @type {(undefined|string)} */
            const iconUriStr = p.iconUri && typeof p.iconUri !== 'string'
                ? (/** @type {!tsickle_vscode_8.Uri} */ (p.iconUri)).toString()
                : ((/** @type {(undefined|string)} */ (p.iconUri)));
            categories.push({
                trigger: p.trigger,
                label: p.label,
                iconUri: iconUriStr ?? '',
            });
        }
        return { categories };
    }
    /**
     * @public
     * @param {{trigger: string, query: string}} request
     * @return {!Promise<({items: undefined}|{items: !Array<{value: string, label: string, iconUri: string, uri: string}>})>}
     */
    async queryContextCategory(request) {
        /** @type {(undefined|!tsickle_delegate_interfaces_10.DynamicContextProvider)} */
        const provider = this.contextCategoryProviders.get(request.trigger);
        if (!provider) {
            return {};
        }
        try {
            /** @type {!Array<!tsickle_delegate_interfaces_10.DynamicContextCategoryItem>} */
            const items = await provider.provideItems(request.query);
            if (items && items.length > 0) {
                return {
                    items: items.map((/**
                     * @param {!tsickle_delegate_interfaces_10.DynamicContextCategoryItem} item
                     * @return {{value: string, label: string, iconUri: string, uri: string}}
                     */
                    (item) => ({
                        value: item.value,
                        label: item.label ?? '',
                        iconUri: item.iconUri ?? '',
                        uri: item.uri ?? '',
                    }))),
                };
            }
        }
        catch (e) {
            console.error(`Error querying context category provider for trigger ${request.trigger}:`, e);
        }
        return {};
    }
    /**
     * @private
     * @param {?} msg
     * @return {void}
     */
    updateAgentStatusContext(msg) {
        /** @type {boolean} */
        const anyRunning = msg.conversations.some((/**
         * @param {?} c
         * @return {(undefined|boolean)}
         */
        (c) => c.summary?.notFullyIdle));
        /** @type {boolean} */
        const anyPending = msg.conversations.some((/**
         * @param {?} c
         * @return {(undefined|boolean)}
         */
        (c) => c.summary?.waitingSteps && c.summary.waitingSteps.length > 0));
        void vscode.commands.executeCommand('setContext', `${this.naming.prefix}.agentRunning`, anyRunning);
        void vscode.commands.executeCommand('setContext', `${this.naming.prefix}.stepPending`, anyPending);
    }
}
exports.ExtensionApiImpl = ExtensionApiImpl;
/* istanbul ignore if */
if (false) {
    /**
     * @const {!Array<!tsickle_jetski_instance_12.JetskiInstance>}
     * @public
     */
    ExtensionApiImpl.prototype.views;
    /**
     * @const {!tsickle_agent_edit_manager_5.AgentEditManager}
     * @private
     */
    ExtensionApiImpl.prototype.agentEditManager;
    /**
     * @const {(undefined|!tsickle_delegate_interfaces_10.BrowserNotificationDelegate)}
     * @private
     */
    ExtensionApiImpl.prototype.browserNotificationDelegate;
    /**
     * @type {string}
     * @private
     */
    ExtensionApiImpl.prototype.commentsStateJson;
    /**
     * @const {(undefined|!tsickle_delegate_interfaces_10.ConnectionResolver)}
     * @private
     */
    ExtensionApiImpl.prototype.connectionResolver;
    /**
     * @const {!Map<string, !tsickle_delegate_interfaces_10.DynamicContextProvider>}
     * @private
     */
    ExtensionApiImpl.prototype.contextCategoryProviders;
    /**
     * @const {!tsickle_vscode_8.ExtensionContext}
     * @private
     */
    ExtensionApiImpl.prototype.context;
    /**
     * @const {!tsickle_editor_state_watcher_11.EditorStateWatcher}
     * @private
     */
    ExtensionApiImpl.prototype.editorStateWatcher;
    /**
     * @type {?}
     * @private
     */
    ExtensionApiImpl.prototype.feedbackMetadata;
    /**
     * @const {!Map<string, string>}
     * @private
     */
    ExtensionApiImpl.prototype.modifiedContentsMap;
    /**
     * @const {!tsickle_delegate_interfaces_10.HostAppConfig}
     * @private
     */
    ExtensionApiImpl.prototype.naming;
    /**
     * @type {string}
     * @private
     */
    ExtensionApiImpl.prototype.viewLocation;
    /**
     * @const {(undefined|!tsickle_delegate_interfaces_10.NotebookExecutor)}
     * @private
     */
    ExtensionApiImpl.prototype.notebookExecutor;
    /**
     * @const {!tsickle_vscode_8.EventEmitter<!tsickle_jetski_instance_12.JetskiInstance>}
     * @private
     */
    ExtensionApiImpl.prototype.onDidRegisterViewEmitter;
    /**
     * @const {!Map<string, string>}
     * @private
     */
    ExtensionApiImpl.prototype.originalContentsMap;
    /**
     * @const {!Set<string>}
     * @private
     */
    ExtensionApiImpl.prototype.registeredCommands;
    /**
     * @const {!Set<string>}
     * @private
     */
    ExtensionApiImpl.prototype.sentNotificationIds;
    /**
     * @const {(undefined|!tsickle_delegate_interfaces_10.Telemetry)}
     * @private
     */
    ExtensionApiImpl.prototype.telemetry;
    /**
     * @const {(undefined|!tsickle_delegate_interfaces_10.WorkspaceManager)}
     * @private
     */
    ExtensionApiImpl.prototype.workspaceManager;
    /**
     * @type {(undefined|!tsickle_terminal_panel_provider_16.TerminalPanelProvider)}
     * @private
     */
    ExtensionApiImpl.prototype.terminalPanelProvider;
    /**
     * Reference to the SettingsEditorProvider instance.
     * Enables ExtensionApiImpl to:
     * 1. Pass in-memory pending navigation options (targetScreen, targetProjectId, etc.)
     *    prior to opening the settings tab, preserving a canonical URI without query params.
     * 2. Dynamically update an already-open Settings panel in-place when navigation requests
     *    arrive, avoiding duplicate editor tabs in VS Code.
     * @type {(undefined|!tsickle_settings_editor_provider_14.SettingsEditorProvider)}
     * @private
     */
    ExtensionApiImpl.prototype.settingsEditorProvider;
    /**
     * Reference to the ArtifactEditorProvider instance.
     * Enables ExtensionApiImpl to cache conversation IDs (`cascadeId`) by file path
     * so that artifacts can be resolved without encoding transient queries in the URI.
     * @type {(undefined|!tsickle_artifact_editor_provider_9.ArtifactEditorProvider)}
     * @private
     */
    ExtensionApiImpl.prototype.artifactEditorProvider;
    /**
     * Concurrency guard for openSettings: tracks an in-flight open operation to prevent
     * race conditions from rapid concurrent calls (e.g. double-click) opening duplicate tabs.
     * @type {(undefined|!Promise<void>)}
     * @private
     */
    ExtensionApiImpl.prototype.pendingOpenSettingsPromise;
    /**
     * Concurrency guard for openArtifact: tracks in-flight open operations by file path to prevent
     * race conditions from rapid concurrent clicks opening duplicate tabs for the same file.
     * @const {!Map<string, !Promise<void>>}
     * @private
     */
    ExtensionApiImpl.prototype.pendingOpenArtifacts;
}
