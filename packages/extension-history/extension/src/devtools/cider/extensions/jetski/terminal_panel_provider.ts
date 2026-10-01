/**
 * @fileoverview added by tsickle
 * Generated from: devtools/cider/extensions/jetski/terminal_panel_provider.ts
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
goog.module('google3.devtools.cider.extensions.jetski.terminal_panel_provider');
var module = module || { id: 'devtools/cider/extensions/jetski/terminal_panel_provider.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_iframe_messages_pb_1 = goog.requireType("google3.third_party.gemini_coder.proto.iframe_messages_pb");
const tsickle_vscode_2 = goog.requireType("vscode");
const tsickle_webview_renderer_3 = goog.requireType("google3.devtools.cider.extensions.jetski.webview_renderer");
const vscode = goog.require('vscode'); // from //devtools/cider/extensions:vscode
/**
 * WebviewViewProvider that renders the Standalone Terminal View inside a
 * Cider bottom panel.
 * @implements {tsickle_vscode_2.WebviewViewProvider}
 */
class TerminalPanelProvider {
    /**
     * @public
     * @param {!tsickle_vscode_2.ExtensionContext} context
     * @param {!tsickle_webview_renderer_3.WebviewRenderer} renderer
     * @param {string} viewType
     */
    constructor(context, renderer, viewType) {
        this.context = context;
        this.renderer = renderer;
        this.viewType = viewType;
        void vscode.commands.executeCommand('setContext', 'isJetskiTerminalVisible', false);
    }
    /**
     * @public
     * @param {!tsickle_vscode_2.WebviewView} webviewView
     * @param {!tsickle_vscode_2.WebviewViewResolveContext<*>} context
     * @param {!tsickle_vscode_2.CancellationToken} token
     * @return {!Promise<void>}
     */
    async resolveWebviewView(webviewView, context, token) {
        this.view = webviewView;
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this.context.extensionUri],
        };
        // If we already have a request, render it immediately when the view is resolved.
        if (this.currentRequest) {
            void this.renderWebview();
        }
    }
    /**
     * @public
     * @param {?} request
     * @return {!Promise<void>}
     */
    async showTerminal(request) {
        this.currentRequest = request;
        await vscode.commands.executeCommand('setContext', 'isJetskiTerminalVisible', true);
        if (this.view) {
            // If the view is visible, reveal it (which might not be necessary if we already focused it via command,
            // but good to ensure it's visible).
            this.view.show(true);
            await this.renderWebview();
        }
    }
    /**
     * @private
     * @return {!Promise<void>}
     */
    async renderWebview() {
        if (!this.view || !this.currentRequest) {
            return;
        }
        /** @type {?} */
        const request = this.currentRequest;
        /** @type {string} */
        const extraParams = `&conversationId=${encodeURIComponent(request.conversationId)}&stepIndex=${request.stepIndex}`;
        await this.renderer.renderJetskiIframe(this.view, {
            targetRoute: 'terminal-standalone',
            extraParams,
            type: 'terminal',
            location: 'panel',
        });
    }
}
exports.TerminalPanelProvider = TerminalPanelProvider;
/* istanbul ignore if */
if (false) {
    /**
     * @type {(undefined|!tsickle_vscode_2.WebviewView)}
     * @private
     */
    TerminalPanelProvider.prototype.view;
    /**
     * @type {(undefined|?)}
     * @private
     */
    TerminalPanelProvider.prototype.currentRequest;
    /**
     * @const {!tsickle_vscode_2.ExtensionContext}
     * @private
     */
    TerminalPanelProvider.prototype.context;
    /**
     * @const {!tsickle_webview_renderer_3.WebviewRenderer}
     * @private
     */
    TerminalPanelProvider.prototype.renderer;
    /**
     * @const {string}
     * @public
     */
    TerminalPanelProvider.prototype.viewType;
}
