/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/javascript/safevalues/restricted/reviewed.ts
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
goog.module('google3.third_party.javascript.safevalues.restricted.reviewed');
var module = module || { id: 'third_party/javascript/safevalues/restricted/reviewed.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_dev_1 = goog.requireType("google3.third_party.javascript.safevalues.environment.dev");
const tsickle_html_impl_2 = goog.requireType("google3.third_party.javascript.safevalues.internals.html_impl");
const tsickle_resource_url_impl_3 = goog.requireType("google3.third_party.javascript.safevalues.internals.resource_url_impl");
const tsickle_script_impl_4 = goog.requireType("google3.third_party.javascript.safevalues.internals.script_impl");
const tsickle_style_sheet_impl_5 = goog.requireType("google3.third_party.javascript.safevalues.internals.style_sheet_impl");
const tsickle_url_impl_6 = goog.requireType("google3.third_party.javascript.safevalues.internals.url_impl");
const dev_1 = goog.require('google3.third_party.javascript.safevalues.environment.dev');
const html_impl_1 = goog.require('google3.third_party.javascript.safevalues.internals.html_impl');
const resource_url_impl_1 = goog.require('google3.third_party.javascript.safevalues.internals.resource_url_impl');
const script_impl_1 = goog.require('google3.third_party.javascript.safevalues.internals.script_impl');
const style_sheet_impl_1 = goog.require('google3.third_party.javascript.safevalues.internals.style_sheet_impl');
const url_impl_1 = goog.require('google3.third_party.javascript.safevalues.internals.url_impl'); // LINE-INTERNAL
// END-INTERNAL
/**
 * Utilities to convert arbitrary strings to values of the various
 * Safe HTML types, subject to security review. These are also referred to as
 * "reviewed conversions".
 *
 * These functions are intended for use-cases that cannot be expressed using an
 * existing safe API (such as a type's builder) and instead require custom code
 * to produce values of a Safe HTML type. A security review is required to
 * verify that the custom code is indeed guaranteed to produce values that
 * satisfy the target type's security contract.
 *
 * Code using restricted conversions should be structured such that this
 * property is straightforward to establish. In particular, correctness should
 * only depend on the code immediately surrounding the reviewed conversion, and
 * not on assumptions about values received from outside the enclosing function
 * (or, at the most, the enclosing file).
 */
// BEGIN-INTERNAL
/**
 * You can only use these functions after adding yourself to the exemption list
 * in javascript/typescript/security_allowlists/unchecked-conversions.bzl. Write
 * your code to meet the guidelines described here, and send the code that uses
 * the reviewed conversion, together with the security_allowlists changes
 * in one CL to ise-hardening-reviews (should be added automatically as a
 * reviewer).
 *
 * The full guidelines can be found at go/safehtml-unchecked.
 */
// END-INTERNAL
/**
 * Asserts that the provided justification is valid (non-empty). Throws an
 * exception if that is not the case.
 * @param {string} justification
 * @return {void}
 */
function assertValidJustification(justification) {
    if (typeof justification !== 'string' || justification.trim() === '') {
        /** @type {string} */
        let errMsg = 'Calls to uncheckedconversion functions must go through security review.';
        errMsg +=
            ' A justification must be provided to capture what security' +
                ' assumptions are being made.';
        // BEGIN-INTERNAL
        errMsg += ' See go/unchecked-conversions';
        // END-INTERNAL
        throw new Error(errMsg);
    }
}
/**
 * Performs a "reviewed conversion" to SafeHtml from a plain string that is
 * known to satisfy the SafeHtml type contract.
 *
 * IMPORTANT: Uses of this method must be carefully security-reviewed to ensure
 * that the value of `html` satisfies the SafeHtml type contract in all
 * possible program states. An appropriate `justification` must be provided
 * explaining why this particular use of the function is safe.
 * \@google3-ignore-for-3p-optimization-safety {options} // LINE-INTERNAL
 * @param {string} html
 * @param {{justification: string}} options
 * @return {!tsickle_html_impl_2.SafeHtml}
 */
function htmlSafeByReview(html, options) {
    if (dev_1.DEV_MODE) {
        assertValidJustification(options.justification);
    }
    return (0, html_impl_1.createHtmlInternal)(html);
}
exports.htmlSafeByReview = htmlSafeByReview;
/**
 * Performs a "reviewed conversion" to SafeScript from a plain string that
 * is known to satisfy the SafeScript type contract.
 *
 * IMPORTANT: Uses of this method must be carefully security-reviewed to ensure
 * that the value of `script` satisfies the SafeScript type contract in
 * all possible program states. An appropriate `justification` must be provided
 * explaining why this particular use of the function is safe.
 * \@google3-ignore-for-3p-optimization-safety {options} // LINE-INTERNAL
 * @param {string} script
 * @param {{justification: string}} options
 * @return {!tsickle_script_impl_4.SafeScript}
 */
function scriptSafeByReview(script, options) {
    if (dev_1.DEV_MODE) {
        assertValidJustification(options.justification);
    }
    return (0, script_impl_1.createScriptInternal)(script);
}
exports.scriptSafeByReview = scriptSafeByReview;
/**
 * Performs a "reviewed conversion" to TrustedResourceUrl from a plain string
 * that is known to satisfy the SafeUrl type contract.
 *
 * IMPORTANT: Uses of this method must be carefully security-reviewed to ensure
 * that the value of `url` satisfies the TrustedResourceUrl type
 * contract in all possible program states. An appropriate `justification` must
 * be provided explaining why this particular use of the function is safe.
 * \@google3-ignore-for-3p-optimization-safety {options} // LINE-INTERNAL
 * @param {string} url
 * @param {{justification: string}} options
 * @return {!tsickle_resource_url_impl_3.TrustedResourceUrl}
 */
function resourceUrlSafeByReview(url, options) {
    if (dev_1.DEV_MODE) {
        assertValidJustification(options.justification);
    }
    return (0, resource_url_impl_1.createResourceUrlInternal)(url);
}
exports.resourceUrlSafeByReview = resourceUrlSafeByReview;
/**
 * Performs a "reviewed conversion" to SafeStyleSheet from a plain string that
 * is known to satisfy the SafeStyleSheet type contract.
 *
 * IMPORTANT: Uses of this method must be carefully security-reviewed to ensure
 * that the value of `stylesheet` satisfies the SafeStyleSheet type
 * contract in all possible program states. An appropriate `justification` must
 * be provided explaining why this particular use of the function is safe; this
 * may include a security review ticket number.
 * \@google3-ignore-for-3p-optimization-safety {options} // LINE-INTERNAL
 * @param {string} stylesheet
 * @param {{justification: string}} options
 * @return {!tsickle_style_sheet_impl_5.SafeStyleSheet}
 */
function styleSheetSafeByReview(stylesheet, options) {
    if (dev_1.DEV_MODE) {
        assertValidJustification(options.justification);
    }
    return (0, style_sheet_impl_1.createStyleSheetInternal)(stylesheet);
}
exports.styleSheetSafeByReview = styleSheetSafeByReview;
// BEGIN-INTERNAL
/**
 * Performs a "reviewed conversion" to SafeUrl from a plain string that is
 * known to satisfy the SafeUrl type contract.
 *
 * IMPORTANT: Uses of this method must be carefully security-reviewed to ensure
 * that the value of `url` satisfies the SafeUrl type contract in all
 * possible program states. An appropriate `justification` must be provided
 * explaining why this particular use of the function is safe.
 * \@google3-ignore-for-3p-optimization-safety {options} // LINE-INTERNAL
 * @param {string} url
 * @param {{justification: string}} options
 * @return {!tsickle_url_impl_6.SafeUrl}
 */
function urlSafeByReview(url, options) {
    if (dev_1.DEV_MODE) {
        assertValidJustification(options.justification);
    }
    return (0, url_impl_1.createUrlInternal)(url);
}
exports.urlSafeByReview = urlSafeByReview;
