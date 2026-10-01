/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/javascript/safevalues/dom/globals/service_worker_container.ts
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
goog.module('google3.third_party.javascript.safevalues.dom.globals.service_worker_container');
var module = module || { id: 'third_party/javascript/safevalues/dom/globals/service_worker_container.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_resource_url_impl_1 = goog.requireType("google3.third_party.javascript.safevalues.internals.resource_url_impl");
const resource_url_impl_1 = goog.require('google3.third_party.javascript.safevalues.internals.resource_url_impl');
/**
 * Safely registers a service worker by URL
 * @param {!ServiceWorkerContainer} container
 * @param {!tsickle_resource_url_impl_1.TrustedResourceUrl} scriptURL
 * @param {(undefined|!RegistrationOptions)=} options
 * @return {!Promise<!ServiceWorkerRegistration>}
 */
function serviceWorkerContainerRegister(container, scriptURL, options) {
    return container.register((/** @type {string} */ ((0, resource_url_impl_1.unwrapResourceUrl)(scriptURL))), options);
}
exports.serviceWorkerContainerRegister = serviceWorkerContainerRegister;
