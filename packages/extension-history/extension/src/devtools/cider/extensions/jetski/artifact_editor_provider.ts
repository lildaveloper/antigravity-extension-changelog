/**
 * @fileoverview added by tsickle
 * Generated from: devtools/cider/extensions/jetski/artifact_editor_provider.ts
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
goog.module('google3.devtools.cider.extensions.jetski.artifact_editor_provider');
var module = module || { id: 'devtools/cider/extensions/jetski/artifact_editor_provider.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_vscode_1 = goog.requireType("vscode");
const tsickle_util_2 = goog.requireType("google3.devtools.cider.extensions.jetski.setup.util");
const tsickle_webview_renderer_3 = goog.requireType("google3.devtools.cider.extensions.jetski.webview_renderer");
const vscode = goog.require('vscode'); // from //devtools/cider/extensions:vscode
// from //devtools/cider/extensions:vscode
const util_1 = goog.require('google3.devtools.cider.extensions.jetski.setup.util');
// LINT.IfChange(cascade_brain_path_regex)
/**
 * Regular expression matching the conversation/cascade UUID directory in brain artifact paths.
 * Matches `/brain/<uuid>/` where `<uuid>` is a standard 36-character hexadecimal UUID.
 * @type {!RegExp}
 */
const CASCADE_BRAIN_PATH_REGEX = /\/brain\/([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})\//;
// LINT.ThenChange(//depot/google3/third_party/gemini_coder/agent_ui_toolkit/src/utils/artifacts/artifactUtils.ts:cascade_brain_path_regex)
/**
 * Provider for custom editor viewing Jetski Artifacts.
 *
 * Renders the artifact markdown inside a Webview panel using Single-App Webview Routing,
 * bypassing local disk reads since artifacts reside on the remote Language Server.
 * @implements {tsickle_vscode_1.CustomReadonlyEditorProvider<!tsickle_vscode_1.CustomDocument>}
 */
class ArtifactEditorProvider {
    /**
     * @public
     * @param {!tsickle_vscode_1.ExtensionContext} context
     * @param {!tsickle_webview_renderer_3.WebviewRenderer} renderer
     */
    constructor(context, renderer) {
        this.renderer = renderer;
        /**
         * In-memory cache mapping normalized file paths to cascadeIds.
         * This allows cascadeId resolution even if the document URI query is kept empty
         * or stripped for canonical tab deduplication, and when the file path does not
         * match CASCADE_BRAIN_PATH_REGEX.
         */
        this.cascadeIdByPath = new Map();
        context.subscriptions.push(vscode.workspace.registerTextDocumentContentProvider(ArtifactEditorProvider.fileScheme, {
            /**
             * @public
             * @param {!tsickle_vscode_1.Uri} uri
             * @param {!tsickle_vscode_1.CancellationToken} token
             * @return {(undefined|null|string|!Thenable<(undefined|null|string)>)}
             */
            provideTextDocumentContent(uri, token) {
                // This is just a dummy provider to enable the schema to be registered.
                // The actual content is provided by the custom editor provider via the
                // webview.
                return '';
            },
        }));
    }
    /**
     * Sets the cascadeId associated with an artifact file path.
     *
     * @public
     * @param {string} path The file path of the artifact.
     * @param {string} cascadeId The cascade/conversation UUID.
     * @return {void}
     */
    setCascadeIdForPath(path, cascadeId) {
        this.cascadeIdByPath.set(path, cascadeId);
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
        webviewPanel.webview.options = {
            enableScripts: true,
        };
        /** @type {!URLSearchParams} */
        const queryParams = new URLSearchParams(document.uri.query);
        /** @type {string} */
        let cascadeId = queryParams.get('cascadeId') ?? '';
        if (!cascadeId) {
            /** @type {(null|!RegExpMatchArray)} */
            const match = document.uri.path.match(CASCADE_BRAIN_PATH_REGEX);
            if (match) {
                cascadeId = match[1];
            }
        }
        if (!cascadeId) {
            cascadeId = this.cascadeIdByPath.get(document.uri.path) ?? '';
        }
        /** @type {string} */
        const cleanUri = document.uri.with({ query: '', scheme: 'file' }).toString();
        /** @type {string} */
        const paramsStr = (0, util_1.buildExtraParams)({
            'uri': cleanUri,
            'cascadeId': cascadeId || undefined,
        });
        /** @type {string} */
        const extraParams = paramsStr ? `&${paramsStr}` : '';
        await this.renderer.renderJetskiIframe(webviewPanel, {
            extraParams,
            targetRoute: 'artifact',
            type: 'artifact',
            location: 'editor',
        });
    }
}
exports.ArtifactEditorProvider = ArtifactEditorProvider;
ArtifactEditorProvider.viewType = 'jetski.artifactEditor';
ArtifactEditorProvider.fileScheme = 'jetski-artifact';
/* istanbul ignore if */
if (false) {
    /**
     * @const {string}
     * @public
     */
    ArtifactEditorProvider.viewType;
    /**
     * @const {string}
     * @public
     */
    ArtifactEditorProvider.fileScheme;
    /**
     * In-memory cache mapping normalized file paths to cascadeIds.
     * This allows cascadeId resolution even if the document URI query is kept empty
     * or stripped for canonical tab deduplication, and when the file path does not
     * match CASCADE_BRAIN_PATH_REGEX.
     * @const {!Map<string, string>}
     * @private
     */
    ArtifactEditorProvider.prototype.cascadeIdByPath;
    /**
     * @const {!tsickle_webview_renderer_3.WebviewRenderer}
     * @private
     */
    ArtifactEditorProvider.prototype.renderer;
}
