/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/javascript/safevalues/builders/html_sanitizer/inert_fragment.ts
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
goog.module('google3.third_party.javascript.safevalues.builders.html_sanitizer.inert_fragment');
var module = module || { id: 'third_party/javascript/safevalues/builders/html_sanitizer/inert_fragment.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_range_1 = goog.requireType("google3.third_party.javascript.safevalues.dom.globals.range");
const tsickle_dev_2 = goog.requireType("google3.third_party.javascript.safevalues.environment.dev");
const tsickle_html_impl_3 = goog.requireType("google3.third_party.javascript.safevalues.internals.html_impl");
const range_1 = goog.require('google3.third_party.javascript.safevalues.dom.globals.range');
const dev_1 = goog.require('google3.third_party.javascript.safevalues.environment.dev');
const html_impl_1 = goog.require('google3.third_party.javascript.safevalues.internals.html_impl');
/**
 * Returns a fragment that contains the parsed HTML for `dirtyHtml` without
 * executing any of the potential payload.
 * @param {string} dirtyHtml
 * @param {!Document} inertDocument
 * @return {!DocumentFragment}
 */
function createInertFragment(dirtyHtml, inertDocument) {
    if (dev_1.DEV_MODE) {
        // We are checking if the function was accidentally called with non-inert
        // document. One observable difference between live and inert documents
        // is that live document has a `defaultView` equal to `window`, while
        // inert document has a `defaultView` equal to `null`.
        if (inertDocument.defaultView) {
            throw new Error('createInertFragment called with non-inert document');
        }
    }
    /** @type {!Range} */
    const range = inertDocument.createRange();
    range.selectNode(inertDocument.body);
    // This call is only used to create an inert tree for the sanitizer to
    // further process and is never returned directly to the caller. We can't use
    // a reviewed conversion in order to avoid an import loop.
    /** @type {!tsickle_html_impl_3.SafeHtml} */
    const temporarySafeHtml = (0, html_impl_1.createHtmlInternal)(dirtyHtml);
    return (0, range_1.rangeCreateContextualFragment)(range, temporarySafeHtml);
}
exports.createInertFragment = createInertFragment;
