/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/gemini_coder/agent_ui_toolkit/src/vscode/base/common/assert.ts
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
goog.module('google3.third_party.gemini_coder.agent_ui_toolkit.src.vscode.base.common.assert');
var module = module || { id: 'third_party/gemini_coder/agent_ui_toolkit/src/vscode/base/common/assert.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_errors_1 = goog.requireType("google3.third_party.gemini_coder.agent_ui_toolkit.src.vscode.base.common.errors");
const errors_1 = goog.require('google3.third_party.gemini_coder.agent_ui_toolkit.src.vscode.base.common.errors');
/**
 * Throws an error with the provided message if the provided value does not evaluate to a true Javascript value.
 *
 * @deprecated Use `assert(...)` instead.
 * This method is usually used like this:
 * ```ts
 * import * as assert from 'vs/base/common/assert';
 * assert.ok(...);
 * ```
 *
 * However, `assert` in that example is a user chosen name.
 * There is no tooling for generating such an import statement.
 * Thus, the `assert(...)` function should be used instead.
 * @param {*=} value
 * @param {(undefined|string)=} message
 * @return {void}
 */
function ok(value, message) {
    if (!value) {
        throw new Error(message ? `Assertion failed (${message})` : 'Assertion Failed');
    }
}
exports.ok = ok;
/**
 * @param {?} value
 * @param {string=} message
 * @return {?}
 */
function assertNever(value, message = 'Unreachable') {
    throw new Error(message);
}
exports.assertNever = assertNever;
/**
 * @param {?} value
 * @return {void}
 */
function softAssertNever(value) {
    // no-op
}
exports.softAssertNever = softAssertNever;
/**
 * Asserts that a condition is `truthy`.
 *
 * @throws provided {\@linkcode messageOrError} if the {\@linkcode condition} is `falsy`.
 *
 * @param {boolean} condition The condition to assert.
 * @param {(string|!Error)=} messageOrError An error message or error object to throw if condition is `falsy`.
 * @return {void}
 */
function assert(condition, messageOrError = 'unexpected state') {
    if (!condition) {
        // if error instance is provided, use it, otherwise create a new one
        /** @type {!Error} */
        const errorToThrow = typeof messageOrError === 'string'
            ? new errors_1.BugIndicatingError(`Assertion Failed: ${messageOrError}`)
            : messageOrError;
        throw errorToThrow;
    }
}
exports.assert = assert;
/**
 * Like assert, but doesn't throw.
 * @param {boolean} condition
 * @param {string=} message
 * @return {void}
 */
function softAssert(condition, message = 'Soft Assertion Failed') {
    if (!condition) {
        (0, errors_1.onUnexpectedError)(new errors_1.BugIndicatingError(message));
    }
}
exports.softAssert = softAssert;
/**
 * condition must be side-effect free!
 * @param {function(): boolean} condition
 * @return {void}
 */
function assertFn(condition) {
    if (!condition()) {
        // eslint-disable-next-line no-debugger
        debugger;
        // Reevaluate `condition` again to make debugging easier
        condition();
        (0, errors_1.onUnexpectedError)(new errors_1.BugIndicatingError('Assertion Failed'));
    }
}
exports.assertFn = assertFn;
/**
 * @template T
 * @param {!ReadonlyArray<T>} items
 * @param {function(T, T): boolean} predicate
 * @return {boolean}
 */
function checkAdjacentItems(items, predicate) {
    /** @type {number} */
    let i = 0;
    while (i < items.length - 1) {
        /** @type {T} */
        const a = items[i];
        /** @type {T} */
        const b = items[i + 1];
        if (!predicate(a, b)) {
            return false;
        }
        i++;
    }
    return true;
}
exports.checkAdjacentItems = checkAdjacentItems;
