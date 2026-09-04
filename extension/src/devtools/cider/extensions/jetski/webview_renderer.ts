/**
 * @fileoverview added by tsickle
 * Generated from: devtools/cider/extensions/jetski/webview_renderer.ts
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
goog.module('google3.devtools.cider.extensions.jetski.webview_renderer');
var module = module || { id: 'devtools/cider/extensions/jetski/webview_renderer.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_vscode_1 = goog.requireType("vscode");
const tsickle_delegate_interfaces_2 = goog.requireType("google3.devtools.cider.extensions.jetski.delegate_interfaces");
const tsickle_extension_api_3 = goog.requireType("google3.devtools.cider.extensions.jetski.extension_api");
const tsickle_loading_message_impl_4 = goog.requireType("google3.devtools.cider.extensions.jetski.loading.loading_message_impl");
const tsickle_util_5 = goog.requireType("google3.devtools.cider.extensions.jetski.setup.util");
const loading_message_impl_1 = goog.require('google3.devtools.cider.extensions.jetski.loading.loading_message_impl');
const util_1 = goog.require('google3.devtools.cider.extensions.jetski.setup.util');
/**
 * Configuration for initializing a WebviewRenderer.
 * @record
 */
function WebviewRendererConfig() { }
exports.WebviewRendererConfig = WebviewRendererConfig;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!tsickle_extension_api_3.ExtensionApiImpl}
     * @public
     */
    WebviewRendererConfig.prototype.apiImpl;
    /**
     * @type {!tsickle_vscode_1.ExtensionContext}
     * @public
     */
    WebviewRendererConfig.prototype.context;
    /**
     * @type {!tsickle_delegate_interfaces_2.WebviewDelegate}
     * @public
     */
    WebviewRendererConfig.prototype.delegate;
    /**
     * @type {function(!tsickle_vscode_1.ExtensionContext, !tsickle_loading_message_impl_4.MessageNotifierImpl): !Promise<!tsickle_util_5.ServerInfo>}
     * @public
     */
    WebviewRendererConfig.prototype.setupFn;
}
/**
 * Centralised rendering and lifecycle management for Jetski webviews.
 *
 * Owns the full webview setup lifecycle: showing a loading indicator,
 * resolving the server URL, rendering the iframe HTML, and registering the
 * webview with the ExtensionApi. Callers (e.g. the artifact editor or the
 * main panel provider) only need to call `renderJetskiIframe` with the
 * target view and options.
 */
class WebviewRenderer {
    /**
     * @public
     * @param {!WebviewRendererConfig} config
     */
    constructor(config) {
        this.apiImpl = config.apiImpl;
        this.context = config.context;
        this.delegate = config.delegate;
        this.setupFn = config.setupFn;
        this.messageNotifier = new loading_message_impl_1.MessageNotifierImpl();
    }
    /**
     * Invalidates the cached server URL, forcing re-setup on next render.
     * @public
     * @return {void}
     */
    refresh() {
        this.serverInfo = undefined;
    }
    /**
     * Returns the server info (effective URL, human-readable name, etc.).
     * @public
     * @return {!Promise<!tsickle_util_5.ServerInfo>}
     */
    getServerInfo() {
        if (!this.serverInfo) {
            this.serverInfo = this.setupFn(this.context, this.messageNotifier);
        }
        return this.serverInfo;
    }
    /**
     * Updates the title/description of the view.
     * @public
     * @param {(undefined|!tsickle_vscode_1.WebviewView|!tsickle_vscode_1.WebviewPanel)} view
     * @return {!Promise<void>}
     */
    async updateTitle(view) {
        await this.delegate.updateTitle(view, this.getServerInfo());
    }
    /**
     * Full webview lifecycle: shows a loading indicator, resolves the server
     * URL, renders the Jetski iframe, and registers the view with the API.
     * @public
     * @param {(!tsickle_vscode_1.WebviewView|!tsickle_vscode_1.WebviewPanel)} view
     * @param {!tsickle_delegate_interfaces_2.RenderIframeOptions} options
     * @return {!Promise<void>}
     */
    async renderJetskiIframe(view, options) {
        // Show loading indicator while the server URL is resolved.
        this.messageNotifier.resolveWebviewView(view);
        this.delegate.renderLoading(view.webview, options.location);
        try {
            // Resolve and validate the server URL.
            /** @type {string} */
            const serverUrl = this.delegate.validateServerUrl((await this.getServerInfo()).effectiveUrl);
            // Render the Jetski iframe.
            await this.delegate.renderIframe(view.webview, serverUrl, options);
            this.messageNotifier.dispose();
            // Register the webview with the ExtensionApi so it can receive RPCs.
            await this.apiImpl.registerWebview(view, options.type);
        }
        catch (error) {
            this.messageNotifier.notifyError((0, util_1.getHumanReadableError)(error));
        }
    }
}
exports.WebviewRenderer = WebviewRenderer;
/* istanbul ignore if */
if (false) {
    /**
     * @const {!tsickle_extension_api_3.ExtensionApiImpl}
     * @private
     */
    WebviewRenderer.prototype.apiImpl;
    /**
     * @const {!tsickle_vscode_1.ExtensionContext}
     * @private
     */
    WebviewRenderer.prototype.context;
    /**
     * @const {!tsickle_delegate_interfaces_2.WebviewDelegate}
     * @private
     */
    WebviewRenderer.prototype.delegate;
    /**
     * @const {!tsickle_loading_message_impl_4.MessageNotifierImpl}
     * @private
     */
    WebviewRenderer.prototype.messageNotifier;
    /**
     * @type {(undefined|!Promise<!tsickle_util_5.ServerInfo>)}
     * @private
     */
    WebviewRenderer.prototype.serverInfo;
    /**
     * @const {function(!tsickle_vscode_1.ExtensionContext, !tsickle_loading_message_impl_4.MessageNotifierImpl): !Promise<!tsickle_util_5.ServerInfo>}
     * @private
     */
    WebviewRenderer.prototype.setupFn;
}
