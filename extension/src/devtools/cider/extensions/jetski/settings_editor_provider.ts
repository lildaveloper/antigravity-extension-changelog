/**
 * @fileoverview added by tsickle
 * Generated from: devtools/cider/extensions/jetski/settings_editor_provider.ts
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
goog.module('google3.devtools.cider.extensions.jetski.settings_editor_provider');
var module = module || { id: 'devtools/cider/extensions/jetski/settings_editor_provider.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_vscode_1 = goog.requireType("vscode");
const tsickle_delegate_interfaces_2 = goog.requireType("google3.devtools.cider.extensions.jetski.delegate_interfaces");
const tsickle_util_3 = goog.requireType("google3.devtools.cider.extensions.jetski.setup.util");
const tsickle_webview_renderer_4 = goog.requireType("google3.devtools.cider.extensions.jetski.webview_renderer");
const vscode = goog.require('vscode'); // from //devtools/cider/extensions:vscode
const util_1 = goog.require('google3.devtools.cider.extensions.jetski.setup.util');
/**
 * Provider for custom editor viewing Jetski Settings.
 * @implements {tsickle_vscode_1.CustomReadonlyEditorProvider<!tsickle_vscode_1.CustomDocument>}
 */
class SettingsEditorProvider {
    /**
     * @public
     * @param {!tsickle_vscode_1.ExtensionContext} context
     * @param {!tsickle_webview_renderer_4.WebviewRenderer} renderer
     * @param {(undefined|!tsickle_delegate_interfaces_2.HostAppConfig)=} naming
     */
    constructor(context, renderer, naming) {
        this.renderer = renderer;
        this.naming = naming;
        context.subscriptions.push(vscode.workspace.registerTextDocumentContentProvider(SettingsEditorProvider.fileScheme, {
            /**
             * @public
             * @param {!tsickle_vscode_1.Uri} uri
             * @param {!tsickle_vscode_1.CancellationToken} token
             * @return {(undefined|null|string|!Thenable<(undefined|null|string)>)}
             */
            provideTextDocumentContent(uri, token) {
                return '';
            },
        }));
    }
    /**
     * @public
     * @param {!tsickle_vscode_1.Uri} uri
     * @param {!tsickle_vscode_1.CustomDocumentOpenContext} openContext
     * @param {!tsickle_vscode_1.CancellationToken} token
     * @return {!Promise<!tsickle_vscode_1.CustomDocument>}
     */
    async openCustomDocument(uri, openContext, token) {
        return {
            uri,
            dispose: (/**
             * @return {void}
             */
            () => { }),
        };
    }
    /**
     * @public
     * @param {!tsickle_vscode_1.CustomDocument} document
     * @param {!tsickle_vscode_1.WebviewPanel} webviewPanel
     * @param {!tsickle_vscode_1.CancellationToken} token
     * @return {!Promise<void>}
     */
    async resolveCustomEditor(document, webviewPanel, token) {
        webviewPanel.webview.options = {
            enableScripts: true,
        };
        /** @type {string} */
        const displayName = this.naming?.displayName ?? 'Jetski';
        webviewPanel.title = `${displayName} Settings`;
        /** @type {!URLSearchParams} */
        const query = new URLSearchParams(document.uri.query);
        /** @type {string} */
        const targetScreen = query.get('targetScreen') ?? '';
        /** @type {string} */
        const targetProjectId = query.get('targetProjectId') ?? '';
        /** @type {string} */
        const targetWorkspaceUri = query.get('targetWorkspaceUri') ?? '';
        /** @type {string} */
        const paramsStr = (0, util_1.buildExtraParams)({
            'targetScreen': targetScreen || undefined,
            'targetProjectId': targetProjectId || undefined,
            'targetWorkspaceUri': targetWorkspaceUri || undefined,
        });
        /** @type {string} */
        const extraParams = paramsStr ? `&${paramsStr}` : '';
        await this.renderer.renderJetskiIframe(webviewPanel, {
            extraParams,
            targetRoute: 'settings-standalone',
            type: 'settings',
            location: 'editor',
        });
    }
}
exports.SettingsEditorProvider = SettingsEditorProvider;
SettingsEditorProvider.viewType = 'jetski.settingsEditor';
SettingsEditorProvider.fileScheme = 'jetski-settings';
/* istanbul ignore if */
if (false) {
    /**
     * @const {string}
     * @public
     */
    SettingsEditorProvider.viewType;
    /**
     * @const {string}
     * @public
     */
    SettingsEditorProvider.fileScheme;
    /**
     * @const {!tsickle_webview_renderer_4.WebviewRenderer}
     * @private
     */
    SettingsEditorProvider.prototype.renderer;
    /**
     * @const {(undefined|!tsickle_delegate_interfaces_2.HostAppConfig)}
     * @private
     */
    SettingsEditorProvider.prototype.naming;
}
