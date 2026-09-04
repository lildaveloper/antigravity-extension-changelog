/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/javascript/safevalues/dom/elements/form.ts
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
goog.module('google3.third_party.javascript.safevalues.dom.elements.form');
var module = module || { id: 'third_party/javascript/safevalues/dom/elements/form.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_url_builders_1 = goog.requireType("google3.third_party.javascript.safevalues.builders.url_builders");
const tsickle_url_impl_2 = goog.requireType("google3.third_party.javascript.safevalues.internals.url_impl");
const url_builders_1 = goog.require('google3.third_party.javascript.safevalues.builders.url_builders');
/**
 * Sets the Action attribute from the given Url.
 * // BEGIN-INTERNAL
 * \@google3-ignore-for-3p-optimization-safety {form} Type is native, and
 *     generally accessing keys on this type would require externally declared
 *     interfaces in user code.
 * // END-INTERNAL
 * @param {!HTMLFormElement} form
 * @param {(string|!tsickle_url_impl_2.SafeUrl)} url
 * @return {void}
 */
function setFormAction(form, url) {
    /** @type {(undefined|string)} */
    const sanitizedUrl = (0, url_builders_1.unwrapUrlOrSanitize)(url);
    if (sanitizedUrl !== undefined) {
        form.action = sanitizedUrl;
    }
}
exports.setFormAction = setFormAction;
// BEGIN-INTERNAL
/**
 * Same as the function above, but with the smallest amount of code.
 * This function will replace the one above once we have confirmed that it
 * doen't break any tests potentially mocking the underlying DOM APIs.
 * \@google3-ignore-for-3p-optimization-safety {form} Type is native, and
 *     generally accessing keys on this type would require externally declared
 *     interfaces in user code.
 * @param {!HTMLFormElement} form
 * @param {(string|!tsickle_url_impl_2.SafeUrl)} url
 * @return {void}
 */
function setFormActionLite(form, url) {
    // Here we rely on the fact that `SafeUrl` will automatically stringify to
    // its value when checked with a Regex and/or used in a DOM API.
    if (!(0, url_builders_1.reportJavaScriptUrl)((/** @type {string} */ ((/** @type {*} */ (url)))))) {
        form.action = (/** @type {string} */ ((/** @type {*} */ (url))));
    }
}
exports.setFormActionLite = setFormActionLite;
