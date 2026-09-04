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
     * Sets pending navigation options to be applied when the custom editor resolves.
     * Used when opening the settings tab with a specific target screen or project.
     * @public
     * @param {?} options
     * @return {void}
     */
    setPendingOptions(options) {
        this.pendingOptions = options;
    }
    /**
     * Updates an already-open settings editor panel with new target options
     * (e.g. switching from 'General' to 'Customizations') without creating a new editor tab.
     *
     * @public
     * @param {?} options Target navigation options to update in the settings view.
     * @return {!Promise<void>}
     */
    async updateActiveSettings(options) {
        if (this.activePanel == null) {
            return;
        }
        /** @type {string} */
        const parameterString = (0, util_1.buildExtraParams)({
            'targetScreen': options.targetScreen,
            'targetProjectId': options.targetProjectId,
            'targetWorkspaceUri': options.targetWorkspaceUri,
        });
        /** @type {string} */
        const extraParams = parameterString ? `&${parameterString}` : '';
        await this.renderer.renderJetskiIframe(this.activePanel, {
            extraParams,
            targetRoute: 'settings-standalone',
            type: 'settings',
            location: 'editor',
        });
    }
    /**
     * @public
     * @param {!tsickle_vscode_1.Uri} uri
     * @param {!tsickle_vscode_1.CustomDocumentOpenContext} openContext
     * @param {!tsickle_vscode_1.CancellationToken} token
     * @return {!tsickle_vscode_1.CustomDocument}
     */
    openCustomDocument(uri, openContext, token) {
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
        // Retain reference to active panel and clean up on disposal.
        this.activePanel = webviewPanel;
        webviewPanel.onDidDispose((/**
         * @return {void}
         */
        () => {
            if (this.activePanel === webviewPanel) {
                this.activePanel = undefined;
            }
        }));
        webviewPanel.webview.options = {
            enableScripts: true,
        };
        /** @type {string} */
        const displayName = this.naming?.displayName ?? 'Jetski';
        webviewPanel.title = `${displayName} Settings`;
        // Prioritize pending in-memory options to maintain canonical document URIs
        // (without query string pollution). Fall back to document URI query parameters
        // for backward compatibility with external links or legacy callers across all environments.
        /** @type {!URLSearchParams} */
        const query = new URLSearchParams(document.uri.query);
        /** @type {string} */
        const targetScreen = this.pendingOptions?.targetScreen ?? query.get('targetScreen') ?? '';
        /** @type {string} */
        const targetProjectId = this.pendingOptions?.targetProjectId ??
            query.get('targetProjectId') ??
            '';
        /** @type {string} */
        const targetWorkspaceUri = this.pendingOptions?.targetWorkspaceUri ??
            query.get('targetWorkspaceUri') ??
            '';
        this.pendingOptions = undefined;
        /** @type {string} */
        const parameterString = (0, util_1.buildExtraParams)({
            'targetScreen': targetScreen,
            'targetProjectId': targetProjectId,
            'targetWorkspaceUri': targetWorkspaceUri,
        });
        /** @type {string} */
        const extraParams = parameterString ? `&${parameterString}` : '';
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
     * Reference to the currently active and resolved Settings WebviewPanel.
     * Tracking the active panel enables:
     * 1. Dynamic in-place navigation (switching screens) without opening duplicate tabs.
     * 2. Re-rendering or updating iframe parameters on an already opened panel.
     * @type {(undefined|!tsickle_vscode_1.WebviewPanel)}
     * @private
     */
    SettingsEditorProvider.prototype.activePanel;
    /**
     * Pending navigation options to apply during the next resolveCustomEditor call.
     * By keeping dynamic target options (targetScreen, targetProjectId, targetWorkspaceUri)
     * in memory rather than in the document URI's query string, the document URI remains
     * canonical (`jetski-settings://global`). This ensures VS Code's editor matcher
     * (`CustomEditorInput.matches`, which does strict URI equality) recognizes that
     * any subsequent open request refers to the exact same document, preventing duplicate tabs.
     * @type {(undefined|{targetScreen: (undefined|string), targetProjectId: (undefined|string), targetWorkspaceUri: (undefined|string)})}
     * @private
     */
    SettingsEditorProvider.prototype.pendingOptions;
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
