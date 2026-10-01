/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/gemini_coder/agent_ui_toolkit/src/vscode/base/common/functional.ts
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
goog.module('google3.third_party.gemini_coder.agent_ui_toolkit.src.vscode.base.common.functional');
var module = module || { id: 'third_party/gemini_coder/agent_ui_toolkit/src/vscode/base/common/functional.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
/**
 * Given a function, returns a function that is only calling that function once.
 * @template T
 * @this {*}
 * @param {T} fn
 * @param {(undefined|function(): void)=} fnDidRunCallback
 * @return {T}
 */
function createSingleCallFunction(fn, fnDidRunCallback) {
    /** @type {*} */
    const _this = this;
    /** @type {boolean} */
    let didCall = false;
    /** @type {*} */
    let result;
    return (/** @type {T} */ ((/** @type {*} */ ((/**
     * @return {*}
     */
    function () {
        if (didCall) {
            return result;
        }
        didCall = true;
        if (fnDidRunCallback) {
            try {
                result = fn.apply(_this, arguments);
            }
            finally {
                fnDidRunCallback();
            }
        }
        else {
            result = fn.apply(_this, arguments);
        }
        return result;
    })))));
}
exports.createSingleCallFunction = createSingleCallFunction;
