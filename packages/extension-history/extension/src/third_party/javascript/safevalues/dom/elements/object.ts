/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/javascript/safevalues/dom/elements/object.ts
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
goog.module('google3.third_party.javascript.safevalues.dom.elements.object');
var module = module || { id: 'third_party/javascript/safevalues/dom/elements/object.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_resource_url_impl_1 = goog.requireType("google3.third_party.javascript.safevalues.internals.resource_url_impl");
const resource_url_impl_1 = goog.require('google3.third_party.javascript.safevalues.internals.resource_url_impl');
/**
 * Sets the data attribute using a TrustedResourceUrl
 * @param {!HTMLObjectElement} obj
 * @param {!tsickle_resource_url_impl_1.TrustedResourceUrl} v
 * @return {void}
 */
function setObjectData(obj, v) {
    obj.data = (/** @type {string} */ ((0, resource_url_impl_1.unwrapResourceUrl)(v)));
}
exports.setObjectData = setObjectData;
