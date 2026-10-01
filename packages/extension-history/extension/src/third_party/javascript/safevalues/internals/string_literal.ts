/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/javascript/safevalues/internals/string_literal.ts
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
goog.module('google3.third_party.javascript.safevalues.internals.string_literal');
var module = module || { id: 'third_party/javascript/safevalues/internals/string_literal.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
/**
 * An object of type TemplateStringsArray represents the literal part(s) of a
 * template literal. This function checks if a TemplateStringsArray object is
 * actually from a template literal.
 *
 * @param {!TemplateStringsArray} templateObj This contains the literal part of the template literal.
 * @param {number} numExprs The number of embedded expressions
 * @return {void}
 */
function assertIsTemplateObject(templateObj, numExprs) {
    if (!isTemplateObject(templateObj) || numExprs + 1 !== templateObj.length) {
        throw new TypeError(`
    ############################## ERROR ##############################

    It looks like you are trying to call a template tag function (fn\`...\`)
    using the normal function syntax (fn(...)), which is not supported.

    The functions in the safevalues library are not designed to be called
    like normal functions, and doing so invalidates the security guarantees
    that safevalues provides.

    If you are stuck and not sure how to proceed, please reach out to us
    instead through:
     - go/ise-hardening-yaqs (preferred) // LINE-INTERNAL
     - g/ise-hardening // LINE-INTERNAL
     - https://github.com/google/safevalues/issues

    ############################## ERROR ##############################`);
    }
}
exports.assertIsTemplateObject = assertIsTemplateObject;
/**
 * Checks if `templateObj` and its raw property are frozen.
 * @param {!TemplateStringsArray} templateObj
 * @return {boolean}
 */
function checkFrozen(templateObj) {
    return Object.isFrozen(templateObj) && Object.isFrozen(templateObj.raw);
}
/** @typedef {function(!TemplateStringsArray): !TemplateStringsArray} */
var TagFn;
/**
 * Checks if a function containing a tagged template expression is transpiled.
 * @param {function(function(!TemplateStringsArray): !TemplateStringsArray): !TemplateStringsArray} fn
 * @return {boolean}
 */
function checkTranspiled(fn) {
    return fn.toString().indexOf('`') === -1;
}
/**
 * This value tells us if the code is transpiled, in which case we don't
 * check certain things that transpilers typically don't support. The
 * transpilation turns it into a function call that takes an array.
 * @type {boolean}
 */
const isTranspiled = checkTranspiled((/**
 * @param {function(!TemplateStringsArray): !TemplateStringsArray} tag
 * @return {!TemplateStringsArray}
 */
(tag) => tag ``)) ||
    checkTranspiled((/**
     * @param {function(!TemplateStringsArray): !TemplateStringsArray} tag
     * @return {!TemplateStringsArray}
     */
    (tag) => tag `\0`)) ||
    checkTranspiled((/**
     * @param {function(!TemplateStringsArray): !TemplateStringsArray} tag
     * @return {!TemplateStringsArray}
     */
    (tag) => tag `\n`)) ||
    checkTranspiled((/**
     * @param {function(!TemplateStringsArray): !TemplateStringsArray} tag
     * @return {!TemplateStringsArray}
     */
    (tag) => tag `\u0000`));
/**
 * This value tells us if `TemplateStringsArray` are typically frozen in the
 * current environment.
 * @type {boolean}
 */
const frozenTSA = checkFrozen `` && checkFrozen `\0` && checkFrozen `\n` && checkFrozen `\u0000`;
/**
 * Polyfill of https://github.com/tc39/proposal-array-is-template-object
 * @param {!TemplateStringsArray} templateObj
 * @return {boolean}
 */
function isTemplateObject(templateObj) {
    /*
     * ############################## WARNING ##############################
     *
     * If you are reading this code to understand how to create a value
     * that satisfies this check, STOP and read this paragraph.
     *
     * This function is there to ensure that our tagged template functions are
     * always called using the tag syntax fn`...`, rather than the normal
     * function syntax fn(...). Bypassing this check invalidates the guarantees
     * that safevalues provides and will result in security issues in your code.
     *
     * If you are stuck and not sure how to proceed, please reach out to us
     * instead through:
     *  - go/ise-hardening-yaqs (preferred) // LINE-INTERNAL
     *  - g/ise-hardening // LINE-INTERNAL
     *  - https://github.com/google/safevalues/issues
     *
     * ############################## WARNING ##############################
     */
    if (!Array.isArray(templateObj) || !Array.isArray(templateObj.raw)) {
        return false;
    }
    if (templateObj.length !== (/** @type {!Array<?>} */ (templateObj.raw)).length) {
        return false;
    }
    if (!isTranspiled && templateObj === templateObj.raw) {
        // Sometimes transpilers use the same array to save on codesize if the
        // template has no special characters that would cause the values in each
        // array to be different.
        return false;
    }
    if ((!isTranspiled || frozenTSA) && !checkFrozen(templateObj)) {
        // Transpilers typically don't freeze `TemplateStringsArray` objects, but we
        // expect that if they did, they would do it consistently, so we also
        // dynamically check if they do.
        return false;
    }
    return true;
}
