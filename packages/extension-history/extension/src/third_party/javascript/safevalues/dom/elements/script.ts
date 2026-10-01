/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/javascript/safevalues/dom/elements/script.ts
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
goog.module('google3.third_party.javascript.safevalues.dom.elements.script');
var module = module || { id: 'third_party/javascript/safevalues/dom/elements/script.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_resource_url_impl_1 = goog.requireType("google3.third_party.javascript.safevalues.internals.resource_url_impl");
const tsickle_script_impl_2 = goog.requireType("google3.third_party.javascript.safevalues.internals.script_impl");
const tsickle_window_3 = goog.requireType("google3.third_party.javascript.safevalues.dom.globals.window");
const resource_url_impl_1 = goog.require('google3.third_party.javascript.safevalues.internals.resource_url_impl');
const script_impl_1 = goog.require('google3.third_party.javascript.safevalues.internals.script_impl');
const window_1 = goog.require('google3.third_party.javascript.safevalues.dom.globals.window');
/**
 * Propagates CSP nonce to dynamically created scripts.
 * @param {!HTMLScriptElement} script
 * @return {void}
 */
function setNonceForScriptElement(script) {
    /** @type {string} */
    const nonce = (0, window_1.getScriptNonce)(script.ownerDocument);
    if (nonce) {
        script.setAttribute('nonce', nonce);
    }
}
/**
 * Sets textContent from the given SafeScript.
 * @param {!HTMLScriptElement} script
 * @param {!tsickle_script_impl_2.SafeScript} v
 * @param {(undefined|{omitNonce: (undefined|boolean)})=} options
 * @return {void}
 */
function setScriptTextContent(script, v, options) {
    script.textContent = (/** @type {string} */ ((0, script_impl_1.unwrapScript)(v)));
    if (options?.omitNonce)
        return;
    setNonceForScriptElement(script);
}
exports.setScriptTextContent = setScriptTextContent;
/**
 * Sets the Src attribute using a TrustedResourceUrl
 * @param {!HTMLScriptElement} script
 * @param {!tsickle_resource_url_impl_1.TrustedResourceUrl} v
 * @param {(undefined|{omitNonce: (undefined|boolean)})=} options
 * @return {void}
 */
function setScriptSrc(script, v, options) {
    script.src = (/** @type {string} */ ((0, resource_url_impl_1.unwrapResourceUrl)(v)));
    if (options?.omitNonce)
        return;
    setNonceForScriptElement(script);
}
exports.setScriptSrc = setScriptSrc;
