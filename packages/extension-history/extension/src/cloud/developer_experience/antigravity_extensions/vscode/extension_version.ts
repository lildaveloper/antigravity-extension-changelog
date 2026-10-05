/**
 * @fileoverview added by tsickle
 * Generated from: cloud/developer_experience/antigravity_extensions/vscode/extension_version.ts
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
goog.module('google3.cloud.developer_experience.antigravity_extensions.vscode.extension_version');
var module = module || { id: 'cloud/developer_experience/antigravity_extensions/vscode/extension_version.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_vscode_1 = goog.requireType("vscode");
const vscode = goog.require('vscode'); // from //third_party/javascript/typings/vscode
// from //third_party/javascript/typings/vscode
/**
 * Marketplace identifier (`publisher.name`) of the Antigravity extension, used
 * as a fallback when no extension context is available.
 * @type {string}
 */
exports.EXTENSION_ID = 'google.google-antigravity';
/**
 * Returns the installed Antigravity extension version (from its packaged
 * `package.json`), or 'unknown' if it cannot be determined.
 * @param {(undefined|!tsickle_vscode_1.ExtensionContext)=} context
 * @return {string}
 */
function getExtensionVersion(context) {
    /** @type {(undefined|{version: *})} */
    const packageJson = (/** @type {(undefined|{version: *})} */ ((context?.extension?.packageJSON ??
        vscode.extensions.getExtension(exports.EXTENSION_ID)?.packageJSON)));
    /** @type {*} */
    const version = packageJson?.version;
    return typeof version === 'string' && version ? version : 'unknown';
}
exports.getExtensionVersion = getExtensionVersion;
