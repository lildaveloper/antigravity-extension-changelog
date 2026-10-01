/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/javascript/safevalues/dom/elements/style.ts
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
goog.module('google3.third_party.javascript.safevalues.dom.elements.style');
var module = module || { id: 'third_party/javascript/safevalues/dom/elements/style.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_style_sheet_impl_1 = goog.requireType("google3.third_party.javascript.safevalues.internals.style_sheet_impl");
const style_sheet_impl_1 = goog.require('google3.third_party.javascript.safevalues.internals.style_sheet_impl');
/**
 * Safe setters for `HTMLStyleElement`s.
 * @param {!HTMLStyleElement} elem
 * @param {!tsickle_style_sheet_impl_1.SafeStyleSheet} safeStyleSheet
 * @return {void}
 */
function setStyleTextContent(elem, safeStyleSheet) {
    elem.textContent = (0, style_sheet_impl_1.unwrapStyleSheet)(safeStyleSheet);
}
exports.setStyleTextContent = setStyleTextContent;
