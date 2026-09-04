/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/antigravity/src/vs/base/common/lazy.ts
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
goog.module('google3.third_party.antigravity.src.vs.base.common.lazy');
var module = module || { id: 'third_party/antigravity/src/vs/base/common/lazy.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
/** @enum {number} */
var LazyValueState = {
    Uninitialized: 0,
    Running: 1,
    Completed: 2,
};
LazyValueState[LazyValueState.Uninitialized] = 'Uninitialized';
LazyValueState[LazyValueState.Running] = 'Running';
LazyValueState[LazyValueState.Completed] = 'Completed';
/**
 * @template T
 */
class Lazy {
    /**
     * @public
     * @param {function(): T} executor
     */
    constructor(executor) {
        this.executor = executor;
        this._state = LazyValueState.Uninitialized;
    }
    /**
     * True if the lazy value has been resolved.
     * @public
     * @return {boolean}
     */
    get hasValue() { return this._state === LazyValueState.Completed; }
    /**
     * Get the wrapped value.
     *
     * This will force evaluation of the lazy value if it has not been resolved yet. Lazy values are only
     * resolved once. `getValue` will re-throw exceptions that are hit while resolving the value
     * @public
     * @return {T}
     */
    get value() {
        if (this._state === LazyValueState.Uninitialized) {
            this._state = LazyValueState.Running;
            try {
                this._value = this.executor();
            }
            catch (err) {
                this._error = err;
            }
            finally {
                this._state = LazyValueState.Completed;
            }
        }
        else if (this._state === LazyValueState.Running) {
            throw new Error('Cannot read the value of a lazy that is being initialized');
        }
        if (this._error) {
            // go/vscode-patch/boq-conformance
            throw this._error instanceof Error ? this._error : new Error(String(this._error));
        }
        return (/** @type {T} */ (this._value));
    }
    /**
     * Get the wrapped value without forcing evaluation.
     * @public
     * @return {(undefined|T)}
     */
    get rawValue() { return this._value; }
}
exports.Lazy = Lazy;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!LazyValueState}
     * @private
     */
    Lazy.prototype._state;
    /**
     * @type {(undefined|T)}
     * @private
     */
    Lazy.prototype._value;
    /**
     * @type {(undefined|!Error)}
     * @private
     */
    Lazy.prototype._error;
    /**
     * @const {function(): T}
     * @private
     */
    Lazy.prototype.executor;
}
