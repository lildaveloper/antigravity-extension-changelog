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
    /**
     * Optional handler when the user clicks "Report Issue" in the error UI.
     * @type {(undefined|function(): void)}
     * @public
     */
    WebviewRendererConfig.prototype.onReportIssue;
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
        this.onReportIssue = config.onReportIssue;
        this.messageNotifier = new loading_message_impl_1.MessageNotifierImpl();
        // "Report Issue" from the loading-page error state (shown on hard backend
        // start failures) routes through the same host handler as the iframe error
        // component, keeping the two error surfaces behaviorally identical.
        if (this.onReportIssue) {
            /** @type {!tsickle_vscode_1.Disposable} */
            const reportIssueSub = this.messageNotifier.onReportIssue((/**
             * @return {void}
             */
            () => {
                this.onReportIssue?.();
            }));
            // context.subscriptions may be absent in some hosts/tests; only register
            // when available so disposal is still wired where supported.
            this.context.subscriptions?.push(reportIssueSub);
        }
    }
    /**
     * Invalidates the cached server URL, forcing re-setup on next render.
     * @public
     * @return {void}
     */
    refresh() {
        this.cachedServerInfo = undefined;
        this.serverInfo = undefined;
    }
    /**
     * Returns the server info (effective URL, human-readable name, etc.).
     * @public
     * @return {!Promise<!tsickle_util_5.ServerInfo>}
     */
    getServerInfo() {
        if (!this.serverInfo) {
            this.serverInfo = ((/**
             * @return {!Promise<!tsickle_util_5.ServerInfo>}
             */
            async () => {
                try {
                    /** @type {!tsickle_util_5.ServerInfo} */
                    const serverInfo = await this.setupFn(this.context, this.messageNotifier);
                    this.cachedServerInfo = serverInfo;
                    return serverInfo;
                }
                catch (error) {
                    // Reset cached promise and server info on error so subsequent calls
                    // (e.g. user retrying after failure or re-rendering) can re-invoke
                    // setupFn instead of permanently caching the rejected promise.
                    this.cachedServerInfo = undefined;
                    this.serverInfo = undefined;
                    throw error;
                }
            }))();
        }
        return this.serverInfo;
    }
    /**
     * Updates the title/description of the view.
     * @public
     * @param {(undefined|!tsickle_vscode_1.WebviewPanel|!tsickle_vscode_1.WebviewView)} view
     * @return {!Promise<void>}
     */
    async updateTitle(view) {
        await this.delegate.updateTitle(view, this.getServerInfo());
    }
    /**
     * Full webview lifecycle: shows a loading indicator, resolves the server
     * URL, renders the Jetski iframe, and registers the view with the API.
     * @public
     * @param {(!tsickle_vscode_1.WebviewPanel|!tsickle_vscode_1.WebviewView)} view
     * @param {!tsickle_delegate_interfaces_2.RenderIframeOptions} options
     * @return {!Promise<void>}
     */
    async renderJetskiIframe(view, options) {
        /** @type {function(): void} */
        const onReload = (/**
         * @return {void}
         */
        () => {
            this.refresh();
            void this.renderJetskiIframe(view, options);
        });
        /** @type {!tsickle_delegate_interfaces_2.RenderIframeOptions} */
        const iframeOptions = {
            ...options,
            onReload,
            onReportIssue: this.onReportIssue,
        };
        // When opening secondary views (e.g. Settings, Artifacts, Terminal), the backend
        // server is already running and cached. Avoid calling renderLoading() if serverInfo
        // is already available, because rewriting webview.html in rapid succession forces
        // Chromium to tear down and recreate the webview DOM twice, leading to blank screens
        // and noticeable latency (b/558282887). The template rendered by delegate.renderIframe
        // already includes its own loading indicator and spinner while the iframe connects.
        if (!this.cachedServerInfo) {
            this.messageNotifier.resolveWebviewView(view);
            this.delegate.renderLoading(view.webview, options.location);
        }
        try {
            // Resolve and validate the server URL.
            /** @type {!tsickle_util_5.ServerInfo} */
            const serverInfo = this.cachedServerInfo ?? (await this.getServerInfo());
            /** @type {string} */
            const serverUrl = this.delegate.validateServerUrl(serverInfo.effectiveUrl);
            // Render the Jetski iframe.
            await this.delegate.renderIframe(view.webview, serverUrl, iframeOptions);
            this.messageNotifier.dispose();
            // Register the webview with the ExtensionApi so it can receive RPCs.
            await this.apiImpl.registerWebview(view, options.type);
        }
        catch (error) {
            if (this.cachedServerInfo) {
                // If server info was cached, renderLoading was skipped above; set it up now
                // so the user sees the error message and retry options.
                this.messageNotifier.resolveWebviewView(view);
                this.delegate.renderLoading(view.webview, options.location);
            }
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
     * @type {(undefined|!tsickle_util_5.ServerInfo)}
     * @private
     */
    WebviewRenderer.prototype.cachedServerInfo;
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
    /**
     * @const {(undefined|function(): void)}
     * @private
     */
    WebviewRenderer.prototype.onReportIssue;
}
