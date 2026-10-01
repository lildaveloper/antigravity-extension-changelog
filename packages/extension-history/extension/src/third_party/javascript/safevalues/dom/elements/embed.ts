/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/javascript/safevalues/dom/elements/embed.ts
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
goog.module('google3.third_party.javascript.safevalues.dom.elements.embed');
var module = module || { id: 'third_party/javascript/safevalues/dom/elements/embed.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_resource_url_impl_1 = goog.requireType("google3.third_party.javascript.safevalues.internals.resource_url_impl");
const resource_url_impl_1 = goog.require('google3.third_party.javascript.safevalues.internals.resource_url_impl');
/**
 * Sets the Src attribute from the given SafeUrl.
 * @param {!HTMLEmbedElement} embedEl
 * @param {!tsickle_resource_url_impl_1.TrustedResourceUrl} url
 * @return {void}
 */
function setEmbedSrc(embedEl, url) {
    embedEl.src = (/** @type {string} */ ((0, resource_url_impl_1.unwrapResourceUrl)(url)));
}
exports.setEmbedSrc = setEmbedSrc;
