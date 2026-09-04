/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/javascript/safevalues/dom/globals/worker.ts
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
goog.module('google3.third_party.javascript.safevalues.dom.globals.worker');
var module = module || { id: 'third_party/javascript/safevalues/dom/globals/worker.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_resource_url_impl_1 = goog.requireType("google3.third_party.javascript.safevalues.internals.resource_url_impl");
const resource_url_impl_1 = goog.require('google3.third_party.javascript.safevalues.internals.resource_url_impl');
/** @typedef {!google3$third_party$javascript$safevalues$dom$globals$worker.WorkerGlobalScopeWithImportScripts} */
exports.WorkerGlobalScopeWithImportScripts;
/**
 * Safely creates a Web Worker.
 *
 * Example usage:
 *   const trustedResourceUrl = trustedResourceUrl`/safe_script.js`;
 *   createWorker(trustedResourceUrl);
 * which is a safe alternative to
 *   new Worker(url);
 * The latter can result in loading untrusted code.
 * @param {!tsickle_resource_url_impl_1.TrustedResourceUrl} url
 * @param {(undefined|*)=} options
 * @return {!Worker}
 */
function createWorker(url, options) {
    return new Worker((/** @type {string} */ ((0, resource_url_impl_1.unwrapResourceUrl)(url))), options);
}
exports.createWorker = createWorker;
/**
 * Safely creates a shared Web Worker.
 * @param {!tsickle_resource_url_impl_1.TrustedResourceUrl} url
 * @param {(undefined|string|!WorkerOptions)=} options
 * @return {!SharedWorker}
 */
function createSharedWorker(url, options) {
    return new SharedWorker((/** @type {string} */ ((0, resource_url_impl_1.unwrapResourceUrl)(url))), options);
}
exports.createSharedWorker = createSharedWorker;
/**
 * Safely calls importScripts
 * @param {!google3$third_party$javascript$safevalues$dom$globals$worker.WorkerGlobalScopeWithImportScripts} scope
 * @param {...!tsickle_resource_url_impl_1.TrustedResourceUrl} urls
 * @return {void}
 */
function workerGlobalScopeImportScripts(scope, ...urls) {
    scope.importScripts(...urls.map((/**
     * @param {!tsickle_resource_url_impl_1.TrustedResourceUrl} url
     * @return {string}
     */
    (url) => (/** @type {string} */ ((0, resource_url_impl_1.unwrapResourceUrl)(url))))));
}
exports.workerGlobalScopeImportScripts = workerGlobalScopeImportScripts;
