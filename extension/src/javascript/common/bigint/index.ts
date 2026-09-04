/**
 * @fileoverview added by tsickle
 * Generated from: javascript/common/bigint/index.ts
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
goog.module('google3.javascript.common.bigint.index');
var module = module || { id: 'javascript/common/bigint/index.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_asserts_1 = goog.requireType("google3.javascript.common.asserts.asserts");
const tsickle_guards_2 = goog.requireType("google3.javascript.common.asserts.guards");
const tsickle_debug_boxed_bigint_3 = goog.requireType("google3.third_party.javascript.jsbi.g3_wrapper.debug_boxed_bigint");
const tsickle_jsbi_4 = goog.requireType("google3.third_party.javascript.jsbi.g3_wrapper.jsbi");
const tsickle_platform_5 = goog.requireType("google3.javascript.common.bigint.platform");
const asserts_1 = goog.require('google3.javascript.common.asserts.asserts');
const guards_1 = goog.require('google3.javascript.common.asserts.guards');
const debug_boxed_bigint_1 = goog.require('google3.third_party.javascript.jsbi.g3_wrapper.debug_boxed_bigint');
const platform_1 = goog.require('google3.javascript.common.bigint.platform');
// tslint:disable:gbigint-usage The common bigint library needs to break these
// rules.
// Capture in a local alias to mitigate against the risk of users mutating the
// global `goog.DEBUG` value.  If it changes half way through a session,
// comparisons between `gbigint` values will start failing.
/** @type {boolean} */
const forcedAsStringHalfTheTime = goog.DEBUG;
/**
 * Converts the given value to a `gbigint`.
 *
 * Throws exceptions on invalid values! Even in production! This mirrors the
 * behavior of the `BigInt()` constructor.
 *
 * See go/bigint#creating-gbigint-values for examples of valid and invalid
 * values.
 *
 * In debug builds with native `BigInt` support, `gbigint` values will either be
 * a `bigint` or `string` reference split on even and odd values. For more info,
 * see go/bigint#debug-gbigint-representation
 * @nosideeffects
 * @param {(string|number|bigint|boolean|!tsickle_jsbi_4.default)} value
 * @return {!gbigint}
 */
function toGbigint(value) {
    validateToGbigintValue(value);
    if (platform_1.NATIVE_BIGINT_AVAILABLE) {
        if (forcedAsStringHalfTheTime) {
            return gbigintForcedAsStringHalfTheTime(value);
        }
        // Note: Native bigint is available and we're not in debug so JSBI instances
        // ARE bigint already so we can safely exclude the JSBI type.
        return castToGbigint(BigInt((/** @type {(string|number|bigint|boolean)} */ (value))));
    }
    if ((0, guards_1.isBoolean)(value)) {
        // Convert boolean values to 1 or 0.
        value = value ? '1' : '0';
    }
    else if ((0, guards_1.isString)(value)) {
        // Strings that are pure whitespace resolve to '0'.
        value = (/** @type {string} */ (value)).trim() || '0';
    }
    else {
        value = String(value);
    }
    return castToGbigint(value);
}
exports.toGbigint = toGbigint;
/**
 * TypeGuard for `gbigint`. See go/guards-and-assertions
 * @type {!tsickle_asserts_1.TypeGuard<!gbigint>}
 */
exports.isGbigint = (0, asserts_1.defineTypeGuard)((/**
 * @param {*} arg
 * @return {boolean}
 */
(arg) => {
    if (platform_1.NATIVE_BIGINT_AVAILABLE) {
        if (forcedAsStringHalfTheTime) {
            return isGbigintForcedAsStringHalfTheTime(arg);
        }
        return (0, guards_1.isBigInt)(arg);
    }
    return (0, guards_1.isString)(arg) && isValidGbigintDecimalString(arg);
}), 'gbigint');
/**
 * Returns whether `Number(value)` losslessly converts to a `number`. Equivalent
 * to the check performed by `Number.isSafeInteger()`.
 *
 * Note: This is _not_ a check for a valid two's complement 52-bit integer.
 * @type {!tsickle_asserts_1.StateGuard<(bigint|!gbigint)>}
 */
exports.isSafeInt52 = (0, asserts_1.defineStateGuard)((/**
 * @param {(bigint|!gbigint)} value
 * @return {boolean}
 */
(value) => {
    if (platform_1.NATIVE_BIGINT_AVAILABLE) {
        (0, asserts_1.assert)(MIN_SAFE_INT52_BIGINT, guards_1.isBigInt);
        (0, asserts_1.assert)(MAX_SAFE_INT52_BIGINT, guards_1.isBigInt);
        /** @type {bigint} */
        const valueAsBigInt = forcedAsStringHalfTheTime
            ? BigInt(value)
            : (0, asserts_1.cast)(value, guards_1.isBigInt);
        return (valueAsBigInt >= MIN_SAFE_INT52_BIGINT &&
            valueAsBigInt <= MAX_SAFE_INT52_BIGINT);
    }
    /** @type {?} */
    const valueAsString = (0, asserts_1.cast)(value, guards_1.isString);
    if (valueAsString[0] === '-') {
        return isInRange(valueAsString, MIN_SAFE_INT52_STR);
    }
    return isInRange(valueAsString, MAX_SAFE_INT52_STR);
}), 'isSafeInt52');
/** @type {string} */
const MIN_SAFE_INT52_STR = Number.MIN_SAFE_INTEGER.toString();
/** @type {(undefined|bigint)} */
const MIN_SAFE_INT52_BIGINT = platform_1.NATIVE_BIGINT_AVAILABLE
    ? BigInt(Number.MIN_SAFE_INTEGER)
    : undefined;
/** @type {string} */
const MAX_SAFE_INT52_STR = Number.MAX_SAFE_INTEGER.toString();
/** @type {(undefined|bigint)} */
const MAX_SAFE_INT52_BIGINT = platform_1.NATIVE_BIGINT_AVAILABLE
    ? BigInt(Number.MAX_SAFE_INTEGER)
    : undefined;
/**
 * Returns whether `value` is in the `int64` range.
 * @type {!tsickle_asserts_1.StateGuard<(bigint|!gbigint)>}
 */
exports.isValidSignedInt64 = (0, asserts_1.defineStateGuard)((/**
 * @param {(bigint|!gbigint)} value
 * @return {boolean}
 */
(value) => {
    if (platform_1.NATIVE_BIGINT_AVAILABLE) {
        (0, asserts_1.assert)(MIN_SIGNED_INT64_BIGINT, guards_1.isBigInt);
        (0, asserts_1.assert)(MAX_SIGNED_INT64_BIGINT, guards_1.isBigInt);
        /** @type {bigint} */
        const valueAsBigInt = forcedAsStringHalfTheTime
            ? BigInt(value)
            : (0, asserts_1.cast)(value, guards_1.isBigInt);
        return (valueAsBigInt >= MIN_SIGNED_INT64_BIGINT &&
            valueAsBigInt <= MAX_SIGNED_INT64_BIGINT);
    }
    /** @type {?} */
    const valueAsString = (0, asserts_1.cast)(value, guards_1.isString);
    if (valueAsString[0] === '-') {
        return isInRange(valueAsString, MIN_SIGNED_INT64_STR);
    }
    return isInRange(valueAsString, MAX_SIGNED_INT64_STR);
}), 'isValidSignedInt64');
/** @type {string} */
const MIN_SIGNED_INT64_STR = '-9223372036854775808';
/** @type {(undefined|bigint)} */
const MIN_SIGNED_INT64_BIGINT = platform_1.NATIVE_BIGINT_AVAILABLE
    ? BigInt(MIN_SIGNED_INT64_STR)
    : undefined;
/** @type {string} */
const MAX_SIGNED_INT64_STR = '9223372036854775807';
/** @type {(undefined|bigint)} */
const MAX_SIGNED_INT64_BIGINT = platform_1.NATIVE_BIGINT_AVAILABLE
    ? BigInt(MAX_SIGNED_INT64_STR)
    : undefined;
/**
 * Returns whether `value` is in the `uint64` range.
 * @type {!tsickle_asserts_1.StateGuard<(bigint|!gbigint)>}
 */
exports.isValidUnsignedInt64 = (0, asserts_1.defineStateGuard)((/**
 * @param {(bigint|!gbigint)} value
 * @return {boolean}
 */
(value) => {
    if (platform_1.NATIVE_BIGINT_AVAILABLE) {
        (0, asserts_1.assert)(MIN_UNSIGNED_INT64_BIGINT, guards_1.isBigInt);
        (0, asserts_1.assert)(MAX_UNSIGNED_INT64_BIGINT, guards_1.isBigInt);
        /** @type {bigint} */
        const valueAsBigInt = forcedAsStringHalfTheTime
            ? BigInt(value)
            : (0, asserts_1.cast)(value, guards_1.isBigInt);
        return (valueAsBigInt >= MIN_UNSIGNED_INT64_BIGINT &&
            valueAsBigInt <= MAX_UNSIGNED_INT64_BIGINT);
    }
    /** @type {?} */
    const valueAsString = (0, asserts_1.cast)(value, guards_1.isString);
    if (valueAsString[0] === '-')
        return false;
    (0, asserts_1.assert)(MAX_UNSIGNED_INT64_STR, guards_1.isString);
    return isInRange(valueAsString, MAX_UNSIGNED_INT64_STR);
}), 'isValidUnsignedInt64');
/** @type {(undefined|bigint)} */
const MIN_UNSIGNED_INT64_BIGINT = platform_1.NATIVE_BIGINT_AVAILABLE
    ? BigInt(0)
    : undefined;
/** @type {string} */
const MAX_UNSIGNED_INT64_STR = '18446744073709551615';
/** @type {(undefined|bigint)} */
const MAX_UNSIGNED_INT64_BIGINT = platform_1.NATIVE_BIGINT_AVAILABLE
    ? BigInt(MAX_UNSIGNED_INT64_STR)
    : undefined;
/**
 * Safely converts a `gbigint` value to a `boolean`.
 *
 * This function is necessary because `Boolean('0') !== Boolean(0n)`.
 * @param {!gbigint} value
 * @return {boolean}
 */
function gbigintToBoolean(value) {
    if (platform_1.NATIVE_BIGINT_AVAILABLE) {
        (0, asserts_1.assert)(ZERO_BIGINT, guards_1.isBigInt);
        /** @type {bigint} */
        const valueAsBigInt = forcedAsStringHalfTheTime
            ? BigInt(value)
            : (0, asserts_1.cast)(value, guards_1.isBigInt);
        return valueAsBigInt !== ZERO_BIGINT;
    }
    /** @type {?} */
    const valueAsString = (0, asserts_1.cast)(value, guards_1.isString);
    return valueAsString !== ZERO_STR;
}
exports.gbigintToBoolean = gbigintToBoolean;
/**
 * Compares two gbigint or bigint values numerically. Compatible with
 * `Array.sort`.
 * @param {(bigint|!gbigint)} a
 * @param {(bigint|!gbigint)} b
 * @return {number}
 */
function compareBigInt(a, b) {
    if (platform_1.NATIVE_BIGINT_AVAILABLE) {
        /** @type {bigint} */
        const aAsBigInt = forcedAsStringHalfTheTime ? BigInt(a) : (0, asserts_1.cast)(a, guards_1.isBigInt);
        /** @type {bigint} */
        const bAsBigInt = forcedAsStringHalfTheTime ? BigInt(b) : (0, asserts_1.cast)(b, guards_1.isBigInt);
        return aAsBigInt > bAsBigInt ? 1 : aAsBigInt === bAsBigInt ? 0 : -1;
    }
    /** @type {?} */
    const aAsString = (0, asserts_1.cast)(a, guards_1.isString);
    /** @type {?} */
    const bAsString = (0, asserts_1.cast)(b, guards_1.isString);
    // String.startsWith is prohibted by GWS conformance: go/gws-inline-js-conformance#string-methods
    /** @type {(boolean|number)} */
    const aIsNegative = aAsString.length && aAsString[0] === '-';
    /** @type {(boolean|number)} */
    const bIsNegative = bAsString.length && bAsString[0] === '-';
    /** @type {number} */
    const aSign = aIsNegative ? -1 : 1;
    // The sign of a and b are different.
    if (aIsNegative !== bIsNegative)
        return aSign;
    // With equal sign, a and b have different lengths.
    if (aAsString.length !== bAsString.length) {
        return aAsString.length > bAsString.length ? aSign : -aSign;
    }
    // With equal sign and same length.
    return aSign * aAsString.localeCompare(bAsString);
}
exports.compareBigInt = compareBigInt;
/// Internal implementation details. Not part of the API.
/**
 * Ensures `value` is valid input for `toGbigint`. ALWAYS throws if invalid.
 * @param {(string|number|bigint|boolean|!tsickle_jsbi_4.default)} value
 * @return {void}
 */
function validateToGbigintValue(value) {
    if ((0, guards_1.isString)(value)) {
        if (!isValidGbigintInputString(value)) {
            throw new Error(goog.DEBUG ? `Invalid string for toGbigint: ${value}` : String(value));
        }
    }
    else if ((0, guards_1.isNumber)(value)) {
        if (!isValidGbigintInputNumber(value)) {
            throw new Error(goog.DEBUG ? `Invalid number for toGbigint: ${value}` : String(value));
        }
    }
}
/**
 * Returns whether `value` is a valid string **input** for `toGbigint()`.
 *
 * Valid values: `'0', '-12', '900719925474099175178', '  42  ', '\t'`, ''
 *
 * Invalid values: `'12.34', '-0', '0x1a7e', 'one', 'not a number'`
 * @param {string} value
 * @return {boolean}
 */
function isValidGbigintInputString(value) {
    return /^\s*(?:-?[1-9]\d*|0)?\s*$/.test(value);
}
/**
 * Returns whether `value` is a valid number input for `toGbigint()`.
 *
 * Valid values: `0, -12, 9007199254740991`
 *
 * Invalid values: `9007199254740992, 12.34, NaN, Infinity`
 * @param {number} value
 * @return {boolean}
 */
function isValidGbigintInputNumber(value) {
    return Number.isSafeInteger(value);
}
/**
 * Returns whether `value` is a valid `gbigint` string value. Equivalent to the
 * set of all `bigint` values converted to string with `.toString()`.
 *
 * Valid values: `'0', '-12', '900719925474099175178'`
 *
 * Invalid values: `'12.34', '-0', '  42  ', '0x1a7e', 'one', 'not a number'`
 * @param {string} value
 * @return {boolean}
 */
function isValidGbigintDecimalString(value) {
    return /^(?:-?[1-9]\d*|0)$/.test(value);
}
/**
 * Casts the given value to a `gbigint`.
 *
 * Note to Googlers reading through this code... DON'T REPLICATE THIS CAST! :)
 * Call `toGbigint()` instead to guarantee runtime consistency and input
 * validation.
 * @param {(string|bigint)} value
 * @return {!gbigint}
 */
function castToGbigint(value) {
    return (/** @type {!gbigint} */ ((/** @type {*} */ (value))));
}
/**
 * @param {string} value
 * @param {string} boundary
 * @return {boolean}
 */
function isInRange(value, boundary) {
    // Fast comparisons.
    if (value.length > boundary.length)
        return false;
    if (value.length < boundary.length)
        return true;
    if (value === boundary)
        return true;
    // Compare two strings conforming to isValidGbigintDecimalString char by char.
    // At this point, both `value` and `boundary` are the same length and, if
    // negative, both start with `-`.
    for (let i = 0; i < value.length; i++) {
        /** @type {string} */
        const valueChar = value[i];
        /** @type {string} */
        const boundaryChar = boundary[i];
        // Numeric chars compare the same as numbers.
        if (valueChar > boundaryChar)
            return false;
        if (valueChar < boundaryChar)
            return true;
    }
    (0, asserts_1.fail)(`isInRange weird case. Value was: ${value}. Boundary was: ${boundary}.`);
}
/** @type {string} */
const ZERO_STR = '0';
/** @type {(undefined|bigint)} */
const ZERO_BIGINT = platform_1.NATIVE_BIGINT_AVAILABLE ? BigInt(0) : undefined;
/**
 * In DEBUG builds with native `BigInt` support, forces `gbigint` to be a
 * `string` half the time and a `bigint` otherwise in a consistent manner.
 *
 * The main sharp edge of `gbigint` is that a `gbigint` instance is itself a
 * `string` or a `bigint` at runtime. This can cause problems if a `gbigint`
 * value's type is unioned with `string` or `bigint` or is checked with
 * something like `isString()`. For example, this could result in a behavior
 * issue that only occurs on older browsers in production.
 *
 * This DEBUG-only behavior aims at helping developers detect these unexpected
 * edge cases earlier.
 * @param {(string|number|bigint|boolean|!tsickle_jsbi_4.default)} value
 * @return {!gbigint}
 */
function gbigintForcedAsStringHalfTheTime(value) {
    /** @type {bigint} */
    let valueAsBigInt;
    // In development builds, JSBI references are instances of DebugBoxedBigInt.
    // This indirection avoids a full dependency on the large OSS JSBI sources.
    if (value instanceof debug_boxed_bigint_1.DebugBoxedBigInt) {
        valueAsBigInt = value.val;
    }
    else if ((0, guards_1.isBigInt)(value)) {
        valueAsBigInt = value;
    }
    else {
        (0, asserts_1.assert)(value, (0, guards_1.isAnyOf)(guards_1.isString, guards_1.isBoolean, guards_1.isNumber));
        valueAsBigInt = BigInt(value);
    }
    if (valueAsBigInt % BigInt(2) ===
        BigInt(getGBigIntUseStrInDebugToggleVal())) {
        return castToGbigint(valueAsBigInt.toString());
    }
    return castToGbigint(valueAsBigInt);
}
/**
 * @param {*} arg
 * @return {boolean}
 */
function isGbigintForcedAsStringHalfTheTime(arg) {
    if (typeof arg === 'bigint') {
        if (arg % BigInt(2) === BigInt(getGBigIntUseStrInDebugToggleVal())) {
            console.error('isGbigint: got a `bigint` when we were expecting a `string`. Make sure to call `toGbigint()` when creating `gbigint` instances!');
            return false;
        }
        return true;
    }
    if ((0, guards_1.isString)(arg)) {
        if (!isValidGbigintDecimalString(arg))
            return false;
        if (Number(arg[(/** @type {string} */ (arg)).length - 1]) % 2 ===
            getGBigIntUseStrInDebugToggleVal()) {
            return true;
        }
        console.error('isGbigint: got a `string` when we were expecting a `bigint`. Make sure to call `toGbigint()` when creating `gbigint` instances!');
        return false;
    }
    return false;
}
// NOTE: This is a function rather than a module-local variable to ensure the
// compiler can dead-code-eliminate it when compiled.
/**
 * @return {number}
 */
function getGBigIntUseStrInDebugToggleVal() {
    (0, asserts_1.assertTruthy)(forcedAsStringHalfTheTime);
    if (platform_1.ODD_FORCED_STRING_IN_DEBUG) {
        return 1;
    }
    // In an iframe-compatible manner, determines whether odd or even gbigint
    // values should be strings.
    return ((/**
     * @return {number}
     */
    () => {
        /** @type {!GlobalThisWithDebugModResultAsString} */
        const container = (/** @type {!GlobalThisWithDebugModResultAsString} */ ((typeof Window === 'function' && globalThis.top instanceof Window
            ? globalThis.top
            : globalThis)));
        if (container.gbigintUseStrInDebugToggleVal == null) {
            // Define it as readonly to prevent it from being mutated. If this value
            // changes half way through a session, comparisons will start failing.
            Object.defineProperties(container, {
                // The types on defineProperties confuse the linter.
                // tslint:disable-next-line:no-implicit-dictionary-conversion
                gbigintUseStrInDebugToggleVal: {
                    value: (/** @type {number} */ (Math.round(Math.random()))),
                },
            });
        }
        return (/** @type {number} */ (container.gbigintUseStrInDebugToggleVal));
    }))();
}
