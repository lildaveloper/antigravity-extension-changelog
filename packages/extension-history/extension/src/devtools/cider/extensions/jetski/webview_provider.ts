/**
 * @fileoverview added by tsickle
 * Generated from: devtools/cider/extensions/jetski/webview_provider.ts
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
goog.module('google3.devtools.cider.extensions.jetski.webview_provider');
var module = module || { id: 'devtools/cider/extensions/jetski/webview_provider.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_vscode_1 = goog.requireType("vscode");
const tsickle_delegate_interfaces_2 = goog.requireType("google3.devtools.cider.extensions.jetski.delegate_interfaces");
const tsickle_webview_renderer_3 = goog.requireType("google3.devtools.cider.extensions.jetski.webview_renderer");
const vscode = goog.require('vscode'); // from //devtools/cider/extensions:vscode
/**
 * WebviewViewProvider that renders the Jetski Agent Manager inside a
 * Cider sidebar panel.
 *
 * The webview loads the Jetski web UI in an iframe with `extensionView=true`,
 * which activates the condensed layout optimized for sidebar embedding.
 * A postMessage bridge forwards actions from the iframe to Cider APIs
 * (file open, storage, etc.).
 *
 * If a server URL is provided, the iframe will load that URL. Otherwise, it
 * will attempt to read the URL from the extension configuration.
 * @implements {tsickle_vscode_1.WebviewViewProvider}
 */
class JetskiWebviewProvider {
    /**
     * @public
     * @param {string} id
     * @return {void}
     */
    setStartupConversationId(id) {
        this.startupConversationId = id;
        if (id) {
            void this.context.workspaceState.update('lastConversationId', id);
        }
    }
    /**
     * @public
     * @param {!tsickle_vscode_1.ExtensionContext} context
     * @param {!tsickle_webview_renderer_3.WebviewRenderer} renderer
     * @param {string} viewType
     * @param {(undefined|!tsickle_delegate_interfaces_2.HostAppConfig)=} naming
     */
    constructor(context, renderer, viewType, naming) {
        this.context = context;
        this.renderer = renderer;
        this.viewType = viewType;
        this.naming = naming;
        this.isSidebarVisible = true;
        void vscode.commands.executeCommand('setContext', 'isJetskiSidebarHidden', !this.isSidebarVisible);
    }
    /**
     * @public
     * @return {!Promise<void>}
     */
    async toggle() {
        // TODO(dmarting): At some point we should transmit also the state of the
        // sidebar to the webview, so that we can render the appropriate
        // conversation.
        this.isSidebarVisible = !this.isSidebarVisible;
        void vscode.commands.executeCommand('setContext', 'isJetskiSidebarHidden', !this.isSidebarVisible);
        if (this.isSidebarVisible) {
            if (this.editorPanel) {
                this.editorPanel.dispose();
                this.editorPanel = undefined;
                this.view = this.sidebarView;
                await this.renderWebview();
            }
            return;
        }
        if (this.editorPanel) {
            this.editorPanel.reveal(vscode.ViewColumn.Active);
            return;
        }
        this.editorPanel = vscode.window.createWebviewPanel('jetski-web.editor', this.naming?.displayName ?? 'Jetski', vscode.ViewColumn.Active, {
            enableScripts: true,
            retainContextWhenHidden: true,
        });
        this.editorPanel.onDidDispose((/**
         * @return {void}
         */
        () => {
            this.editorPanel = undefined;
            this.isSidebarVisible = true;
            void vscode.commands.executeCommand('setContext', 'isJetskiSidebarHidden', !this.isSidebarVisible);
        }));
        await this.resolveWebview(this.editorPanel);
    }
    /**
     * Refreshes the webview content (e.g. after URL change).
     * @public
     * @return {void}
     */
    refresh() {
        this.renderer.refresh();
        if (!this.view) {
            return;
        }
        this.renderWebview();
        void this.renderer.updateTitle(this.view);
    }
    /**
     * @public
     * @param {!tsickle_vscode_1.WebviewView} webviewView
     * @return {!Promise<void>}
     */
    resolveWebviewView(webviewView) {
        this.sidebarView = webviewView;
        return this.resolveWebview(webviewView);
    }
    /**
     * @public
     * @param {(!tsickle_vscode_1.WebviewPanel|!tsickle_vscode_1.WebviewView)} view
     * @return {!Promise<void>}
     */
    async resolveWebview(view) {
        this.view = view;
        view.webview.options = {
            enableScripts: true,
            localResourceRoots: [this.context.extensionUri],
        };
        // Render the webview, initially setting it as the loading page, and then
        // switching to the Jetski iframe once it is ready.
        await this.renderWebview();
        // Update the title of the view to the server info once it is ready.
        await this.renderer.updateTitle(this.view);
    }
    /**
     * @private
     * @return {!Promise<void>}
     */
    async renderWebview() {
        if (!this.view) {
            return;
        }
        // Prioritize the startup conversation ID (from URL) over the cached
        // workspaceState. This ensures that when Cider reloads due to a workspace
        // switch with a specific conversation ID in the URL, we load that
        // conversation instead of the last active one in the target workspace.
        /** @type {(undefined|string)} */
        const conversationId = this.startupConversationId ??
            this.context.workspaceState.get('lastConversationId');
        this.startupConversationId = undefined; // consume it
        if (conversationId) {
            void this.context.workspaceState.update('lastConversationId', conversationId);
        }
        await this.renderer.renderJetskiIframe(this.view, {
            targetRoute: conversationId ? `c/${conversationId}` : '',
            type: 'main',
            location: 'sideBar',
        });
    }
}
exports.JetskiWebviewProvider = JetskiWebviewProvider;
/* istanbul ignore if */
if (false) {
    /**
     * @type {(undefined|!tsickle_vscode_1.WebviewView)}
     * @private
     */
    JetskiWebviewProvider.prototype.sidebarView;
    /**
     * @type {(undefined|!tsickle_vscode_1.WebviewPanel)}
     * @private
     */
    JetskiWebviewProvider.prototype.editorPanel;
    /**
     * @type {(undefined|!tsickle_vscode_1.WebviewPanel|!tsickle_vscode_1.WebviewView)}
     * @private
     */
    JetskiWebviewProvider.prototype.view;
    /**
     * @type {boolean}
     * @private
     */
    JetskiWebviewProvider.prototype.isSidebarVisible;
    /**
     * @type {(undefined|string)}
     * @private
     */
    JetskiWebviewProvider.prototype.startupConversationId;
    /**
     * @const {!tsickle_vscode_1.ExtensionContext}
     * @private
     */
    JetskiWebviewProvider.prototype.context;
    /**
     * @const {!tsickle_webview_renderer_3.WebviewRenderer}
     * @private
     */
    JetskiWebviewProvider.prototype.renderer;
    /**
     * @const {string}
     * @public
     */
    JetskiWebviewProvider.prototype.viewType;
    /**
     * @const {(undefined|!tsickle_delegate_interfaces_2.HostAppConfig)}
     * @private
     */
    JetskiWebviewProvider.prototype.naming;
}
