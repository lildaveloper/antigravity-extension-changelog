/**
 * @fileoverview Exports a null-safe `propagateAsyncContext` function.
 * Generated from: javascript/common/async/context/propagate.ts
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
goog.module('google3.javascript.common.async.context.propagate');
var module = module || { id: 'javascript/common/async/context/propagate.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
/**
 * Null-safe and polyfill-safe wrapper to propagate the current context into the
 * given function.
 * @type {function(?): ?}
 */
exports.propagateAsyncContext = typeof AsyncContext !== 'undefined' &&
    typeof AsyncContext.Snapshot === 'function'
    ? (/**
     * @param {?} fn
     * @return {?}
     */
    (fn) => fn && AsyncContext.Snapshot.wrap(fn))
    : (/**
     * @param {?} fn
     * @return {?}
     */
    (fn) => fn);
