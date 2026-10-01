/**
 * @fileoverview added by tsickle
 * Generated from: devtools/cider/extensions/jetski/diff_zones/utils.ts
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
goog.module('google3.devtools.cider.extensions.jetski.diff_zones.utils');
var module = module || { id: 'devtools/cider/extensions/jetski/diff_zones/utils.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_cider_1 = goog.requireType("google3.devtools.cider.extensions.cider");
const tsickle_workspace_2 = goog.requireType("google3.devtools.cider.extensionutils.workspace");
const tsickle_vscode_3 = goog.requireType("vscode");
const cider_1 = goog.require('google3.devtools.cider.extensions.cider');
const workspace_1 = goog.require('google3.devtools.cider.extensionutils.workspace');
const vscode = goog.require('vscode'); // from //devtools/cider/extensions:vscode
// from //devtools/cider/extensions:vscode
/**
 * Normalizes line endings to LF.
 * @param {string} str
 * @return {string}
 */
function normalizeLineEndings(str) {
    return str.replace(/\r\n/g, '\n');
}
exports.normalizeLineEndings = normalizeLineEndings;
/**
 * Normalizes the URI string using vscode.Uri, converting to Cider URI if in a
 * remote workspace.
 * @param {string} uriStr
 * @return {string}
 */
function normalizeUri(uriStr) {
    try {
        /** @type {!tsickle_vscode_3.Uri} */
        const ciderUri = (0, workspace_1.toCiderWebclientUri)(uriStr);
        /** @type {string} */
        const lowerScheme = ciderUri.scheme.toLowerCase();
        if (ciderUri.scheme !== lowerScheme) {
            return ciderUri.with({ scheme: lowerScheme }).toString();
        }
        return ciderUri.toString();
    }
    catch {
        return uriStr;
    }
}
exports.normalizeUri = normalizeUri;
/**
 * Checks if the URI points to a notebook.
 * @param {string} uriStr
 * @return {boolean}
 */
function isNotebook(uriStr) {
    // Strip fragment (#) and query (?) if present, then check extension
    return uriStr.split('#')[0].split('?')[0].endsWith('.ipynb');
}
exports.isNotebook = isNotebook;
/**
 * Whether `cider.ai.forceResolveFromFile` exists. Throws outside Cider.
 * @return {boolean}
 */
function hasCiderForceResolveFromFile() {
    /** @type {(undefined|?)} */
    const ai = cider_1.cider?.ai;
    return typeof ai?.forceResolveFromFile === 'function';
}
exports.hasCiderForceResolveFromFile = hasCiderForceResolveFromFile;
/**
 * Finds an active or visible text editor matching the given URI.
 * Checks activeTextEditor first, and falls back to visibleTextEditors if focus
 * is currently in another pane (e.g., side panel webview).
 * @param {string} fileUri
 * @return {(undefined|!tsickle_vscode_3.TextEditor)}
 */
function findEditorForUri(fileUri) {
    /** @type {string} */
    const normalizedUri = normalizeUri(fileUri);
    return ((vscode.window.activeTextEditor &&
        normalizeUri(vscode.window.activeTextEditor.document.uri.toString()) ===
            normalizedUri
        ? vscode.window.activeTextEditor
        : undefined) ??
        vscode.window.visibleTextEditors.find((/**
         * @param {!tsickle_vscode_3.TextEditor} editor
         * @return {boolean}
         */
        (editor) => normalizeUri(editor.document.uri.toString()) === normalizedUri)));
}
exports.findEditorForUri = findEditorForUri;
