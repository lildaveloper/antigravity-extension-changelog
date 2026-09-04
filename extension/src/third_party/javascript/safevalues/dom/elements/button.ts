/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/javascript/safevalues/dom/elements/button.ts
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
goog.module('google3.third_party.javascript.safevalues.dom.elements.button');
var module = module || { id: 'third_party/javascript/safevalues/dom/elements/button.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_url_builders_1 = goog.requireType("google3.third_party.javascript.safevalues.builders.url_builders");
const tsickle_url_impl_2 = goog.requireType("google3.third_party.javascript.safevalues.internals.url_impl");
const url_builders_1 = goog.require('google3.third_party.javascript.safevalues.builders.url_builders');
/**
 * Sets the Formaction attribute from the given Url.
 * @param {!HTMLButtonElement} button
 * @param {(string|!tsickle_url_impl_2.SafeUrl)} url
 * @return {void}
 */
function setButtonFormaction(button, url) {
    /** @type {(undefined|string)} */
    const sanitizedUrl = (0, url_builders_1.unwrapUrlOrSanitize)(url);
    if (sanitizedUrl !== undefined) {
        button.formAction = sanitizedUrl;
    }
}
exports.setButtonFormaction = setButtonFormaction;
