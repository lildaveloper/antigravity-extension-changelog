/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/javascript/safevalues/dom/globals/range.ts
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
goog.module('google3.third_party.javascript.safevalues.dom.globals.range');
var module = module || { id: 'third_party/javascript/safevalues/dom/globals/range.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_html_impl_1 = goog.requireType("google3.third_party.javascript.safevalues.internals.html_impl");
const html_impl_1 = goog.require('google3.third_party.javascript.safevalues.internals.html_impl');
/**
 * Safely creates a contextualFragment.
 * @param {!Range} range
 * @param {!tsickle_html_impl_1.SafeHtml} html
 * @return {!DocumentFragment}
 */
function rangeCreateContextualFragment(range, html) {
    return range.createContextualFragment((/** @type {string} */ ((0, html_impl_1.unwrapHtml)(html))));
}
exports.rangeCreateContextualFragment = rangeCreateContextualFragment;
