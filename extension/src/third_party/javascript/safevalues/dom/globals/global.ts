/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/javascript/safevalues/dom/globals/global.ts
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
goog.module('google3.third_party.javascript.safevalues.dom.globals.global');
var module = module || { id: 'third_party/javascript/safevalues/dom/globals/global.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_script_impl_1 = goog.requireType("google3.third_party.javascript.safevalues.internals.script_impl");
const tsickle_fetch_2 = goog.requireType("google3.third_party.javascript.safevalues.dom.globals.fetch");
const script_impl_1 = goog.require('google3.third_party.javascript.safevalues.internals.script_impl');
const fetch_1 = goog.require('google3.third_party.javascript.safevalues.dom.globals.fetch');
exports.fetchResourceUrl = fetch_1.fetchResourceUrl;
/** @typedef {!tsickle_fetch_2.SafeResponse} */
exports.SafeResponse; // re-export typedef
/**
 * Evaluates a SafeScript value in the given scope using eval.
 *
 * Strongly consider avoiding this, as eval blocks CSP adoption and does not
 * benefit from compiler optimizations.
 * // BEGIN-INTERNAL
 * \@google3-ignore-for-3p-optimization-safety {return} Accessing keys on objects
 *     created by eval (which aren't subject to any jscompiler optimizations)
 *     will require externally declared interfaces in user code.
 * // END-INTERNAL
 * @param {(?|!Window)} win
 * @param {!tsickle_script_impl_1.SafeScript} script
 * @return {*}
 */
function globalEval(win, script) {
    /** @type {(string|?)} */
    const trustedScript = (0, script_impl_1.unwrapScript)(script);
    /** @type {?} */
    let result = ((/** @type {?} */ (win))).eval((/** @type {string} */ (trustedScript)));
    if (result === trustedScript) {
        // https://crbug.com/1024786 manifesting in workers.
        result = ((/** @type {?} */ (win))).eval(trustedScript.toString());
    }
    return result;
}
exports.globalEval = globalEval;
