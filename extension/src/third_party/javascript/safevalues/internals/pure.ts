/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/javascript/safevalues/internals/pure.ts
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
goog.module('google3.third_party.javascript.safevalues.internals.pure');
var module = module || { id: 'third_party/javascript/safevalues/internals/pure.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
/**
 * Mark an expression as being free of side effects.
 * @template T
 * @param {function(): T} valueOf
 * @return {T}
 */
function pure(valueOf) {
    // This odd looking expression is a workaround specific to the Closure
    // compiler to mark an expression as pure.
    // BEGIN-INTERNAL
    // Note: @nosideeffects can get dropped if calls to this function get inlined,
    // whereas this expression is better preserved across inlining, resulting in
    // smaller sizes in most cases. See
    // https://groups.google.com/a/google.com/g/ise-web/c/vh4Ky_0KunY for context.
    // END-INTERNAL
    return { valueOf }.valueOf();
}
exports.pure = pure;
