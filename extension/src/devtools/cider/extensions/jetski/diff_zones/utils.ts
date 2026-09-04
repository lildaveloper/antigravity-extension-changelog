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
const tsickle_vscode_1 = goog.requireType("vscode");
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
 * Normalizes the URI string using vscode.Uri.
 * @param {string} uriStr
 * @return {string}
 */
function normalizeUri(uriStr) {
    try {
        /** @type {!tsickle_vscode_1.Uri} */
        const parsed = vscode.Uri.parse(uriStr);
        /** @type {string} */
        const lowerScheme = parsed.scheme.toLowerCase();
        if (parsed.scheme !== lowerScheme) {
            return parsed.with({ scheme: lowerScheme }).toString();
        }
        return parsed.toString();
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
