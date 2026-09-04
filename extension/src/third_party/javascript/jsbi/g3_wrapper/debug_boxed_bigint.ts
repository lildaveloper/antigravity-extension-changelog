/**
 * @fileoverview added by tsickle
 * Generated from: third_party/javascript/jsbi/g3_wrapper/debug_boxed_bigint.ts
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
goog.module('google3.third_party.javascript.jsbi.g3_wrapper.debug_boxed_bigint');
var module = module || { id: 'third_party/javascript/jsbi/g3_wrapper/debug_boxed_bigint.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
/**
 * Debug-only class used to store bigint values so that JSBI instances are
 * consistently not value types (at least in DEBUG builds).
 */
class DebugBoxedBigInt {
    /**
     * @public
     * @param {bigint} val
     */
    constructor(val) {
        this.val = val;
    }
    /**
     * @public
     * @param {(undefined|number)=} radix
     * @return {string}
     */
    toString(radix) {
        return this.val.toString(radix);
    }
    /**
     * @public
     * @return {bigint}
     */
    valueOf() {
        throw new Error('Convert JSBI instances to native numbers using `toNumber`.');
    }
    /**
     * @public
     * @return {bigint}
     */
    [Symbol.toPrimitive]() {
        return this.val;
    }
}
exports.DebugBoxedBigInt = DebugBoxedBigInt;
/* istanbul ignore if */
if (false) {
    /**
     * @const {bigint}
     * @public
     */
    DebugBoxedBigInt.prototype.val;
}
