/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview This file exports a default instance of the CSS sanitizer,
 * similarly to how the default instance of the HTML sanitizer is exported.
 *
 * The reason why it's in a separate file is to ensure that html_sanitizer.ts
 * doesn't depend on html_sanitizer_builder.ts, which would cause
 * a circular dependency.
 * Generated from: third_party/javascript/safevalues/builders/html_sanitizer/default_css_sanitizer.ts
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
goog.module('google3.third_party.javascript.safevalues.builders.html_sanitizer.default_css_sanitizer');
var module = module || { id: 'third_party/javascript/safevalues/builders/html_sanitizer/default_css_sanitizer.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_pure_1 = goog.requireType("google3.third_party.javascript.safevalues.internals.pure");
const tsickle_html_sanitizer_builder_2 = goog.requireType("google3.third_party.javascript.safevalues.builders.html_sanitizer.html_sanitizer_builder");
const tsickle_html_sanitizer_3 = goog.requireType("google3.third_party.javascript.safevalues.builders.html_sanitizer.html_sanitizer");
const pure_1 = goog.require('google3.third_party.javascript.safevalues.internals.pure');
const html_sanitizer_builder_1 = goog.require('google3.third_party.javascript.safevalues.builders.html_sanitizer.html_sanitizer_builder');
/** @type {!tsickle_html_sanitizer_3.CssSanitizer} */
const defaultCssSanitizer = (0, pure_1.pure)((/**
 * @return {!tsickle_html_sanitizer_3.CssSanitizer}
 */
() => new html_sanitizer_builder_1.CssSanitizerBuilder().build()));
/**
 * Sanitizes untrusted CSS using the default sanitizer configuration.
 * // BEGIN-INTERNAL
 * See go/safevalues-css-sanitizer for more information about usage, especially
 * if you want to customize the sanitizer, or use it in an Angular or Lit app.
 * // END-INTERNAL
 * @param {string} css
 * @return {!DocumentFragment}
 */
function sanitizeHtmlWithCss(css) {
    return defaultCssSanitizer.sanitizeToFragment(css);
}
exports.sanitizeHtmlWithCss = sanitizeHtmlWithCss;
