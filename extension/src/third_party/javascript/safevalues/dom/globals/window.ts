/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/javascript/safevalues/dom/globals/window.ts
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
goog.module('google3.third_party.javascript.safevalues.dom.globals.window');
var module = module || { id: 'third_party/javascript/safevalues/dom/globals/window.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_url_builders_1 = goog.requireType("google3.third_party.javascript.safevalues.builders.url_builders");
const tsickle_url_impl_2 = goog.requireType("google3.third_party.javascript.safevalues.internals.url_impl");
const url_builders_1 = goog.require('google3.third_party.javascript.safevalues.builders.url_builders');
/**
 * windowOpen calls {\@link Window.open} on the given {\@link Window}, given a
 * target {\@link Url}.
 * @param {!Window} win
 * @param {(string|!tsickle_url_impl_2.SafeUrl)} url
 * @param {(undefined|string)=} target
 * @param {(undefined|string)=} features
 * @return {(null|!Window)}
 */
function windowOpen(win, url, target, features) {
    /** @type {(undefined|string)} */
    const sanitizedUrl = (0, url_builders_1.unwrapUrlOrSanitize)(url);
    if (sanitizedUrl !== undefined) {
        return win.open(sanitizedUrl, target, features);
    }
    return null;
}
exports.windowOpen = windowOpen;
/**
 * Returns CSP nonce, if set for any script tag.
 * @param {(undefined|!Document)=} doc
 * @return {string}
 */
function getScriptNonce(doc) {
    return getNonceFor('script', doc);
}
exports.getScriptNonce = getScriptNonce;
/**
 * Returns CSP nonce, if set for any style tag.
 * @param {(undefined|!Document)=} doc
 * @return {string}
 */
function getStyleNonce(doc) {
    return getNonceFor('style', doc);
}
exports.getStyleNonce = getStyleNonce;
/**
 * @param {string} elementName
 * @param {!Document=} doc
 * @return {string}
 */
function getNonceFor(elementName, doc = document) {
    // document.querySelector can be undefined in non-browser environments.
    /** @type {(null|!HTMLScriptElement|!HTMLStyleElement)} */
    const el = doc.querySelector?.(`${elementName}[nonce]`);
    if (el == null) {
        return '';
    }
    // Try to get the nonce from the IDL property first, because browsers that
    // implement additional nonce protection features (currently only Chrome) to
    // prevent nonce stealing via CSS do not expose the nonce via attributes.
    // See https://github.com/whatwg/html/issues/2369
    return el['nonce'] || el.getAttribute('nonce') || '';
}
