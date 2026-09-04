/**
 * @fileoverview Helper methods for checking program state.
 *
 * Statically all helpers assert that the type of the input is sufficiently
 * narrow. At runtime the helpers behave in two different ways:
 * - checkExhaustive* - unconditionally throws.
 * - assumeExhaustive* - does nothing.
 *
 * Prefer `checkExhaustive()` unless you find yourself writing
 * `try {
 *    checkExhaustive(value);
 *  } catch (error) {
 *    // Handle the error.
 *  }`
 * in which case use `assumeExhaustive()` directly, without the `try`.
 * Generated from: javascript/typescript/contrib/check.ts
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
goog.module('google3.javascript.typescript.contrib.check');
var module = module || { id: 'javascript/typescript/contrib/check.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
/**
 * Throw an exception on unexpected values.
 *
 * checkExhaustive can be used along with type narrowing to ensure at
 * compile time that all possible types for a value have been handled. For cases
 * where exhaustiveness can not be guaranteed at compile time (i.e. proto enums)
 * an exception will be thrown.
 *
 * A common use-case is in switch statements:
 *
 * ```
 * // enumValue: Enum.A | Enum.B
 * switch(enumValue) {
 *   case Enum.A:
 *   case Enum.B:
 *     break;
 *   default:
 *     checkExhaustive(enumValue);
 * }
 * ```
 *
 * This method throws an exception rather than using an assertion because
 * assertions are stripped in production code and we need the check to fail in
 * production.
 *
 * @param {?} value The value to be checked
 * @param {(undefined|string)=} msg An optional error message to throw
 * @return {?}
 */
function checkExhaustive(value, msg) {
    return checkExhaustiveAllowing(value, msg);
}
exports.checkExhaustive = checkExhaustive;
/**
 * Throw an exception on unexpected values.
 *
 * checkExhaustiveAllowing is similar to checkExhaustive, with one difference
 * that user can specify expected type of value other than 'never'.
 *
 * The template parameter is absolutely required so that the type checker can
 * actually ensure that nothing other than the explicitly-allowed types is
 * passed.  If the allowed type is broader than you expect, consider trying a
 * different approach to narrow it, or else using the go/guards-and-assertions
 * library to make a different kind of assertion.
 *
 * It is useful when enum contains values that should never occur. Those should
 * be passed as the type argument to checkExhaustiveAllowing. A common use-case
 * would be like:
 *
 * ```
 * // enumValue: Enum.A | Enum.B | Enum.UNSPECIFIED | Enum.UNKNOWN
 * switch(enumValue) {
 *   case Enum.A:
 *   case Enum.B:
 *     break;
 *   default:
 *     checkExhaustiveAllowing<Enum.UNSPECIFIED|Enum.UNKNOWN>(enumValue);
 * }
 * ```
 *
 * @template Allowed, Arg
 * @param {Arg} value The value to be checked
 * @param {string=} msg An optional error message to throw
 * @return {?}
 */
function checkExhaustiveAllowing(value, msg = `unexpected value ${value}!`) {
    throw new Error(msg);
}
exports.checkExhaustiveAllowing = checkExhaustiveAllowing;
/**
 * Type argument for legacy incorrect usages of `checkExhaustiveAllowing`.
 * This function is intended to be called with an explicit template parameter,
 * but this was not always enforced. When the parameter is elided, the type
 * checker cannot actually verify anything useful. This placeholder type allows
 * legacy callsites to continue passing type checking, but should not be used in
 * new calls.
 *
 * Consider replacing the call to `checkExhaustiveAllowing` with a call to the
 * Guards and Assertions library (go/guards-and-assertions).
 * @typedef {*}
 */
exports.LegacyIncorrectUsage;
/**
 * Fail to compile on unexpected values.
 *
 * assumeExhaustive can be used along with type narrowing to ensure at compile
 * time that all possible types for a value have been handled. At runtime it is
 * a no-op.
 *
 * A common use-case is in switch statements:
 *
 * ```
 * // sensibleDefault: string
 * // numericEnumValue: Enum.A | Enum.B
 * switch(numericEnumValue) {
 *   case Enum.A:
 *     return 'A';
 *   case Enum.B:
 *     return 'B';
 *   default:
 *     assumeExhaustive(numericEnumValue);
 *     return sensibleDefault;
 * }
 * ```
 * @param {?} value
 * @return {void}
 */
function assumeExhaustive(value) { }
exports.assumeExhaustive = assumeExhaustive;
/**
 * Fail to compile on unexpected values.
 *
 * assumeExhaustiveAllowing is similar to assumeExhaustive, with one difference
 * that user can specify expected type of value other than 'never'.
 *
 * It is useful when enum contains values that should never occur. Those should
 * be passed as the type argument to assumeExhaustiveAllowing. A common use-case
 * would be like:
 *
 * ```
 * // enumValue: Enum.A | Enum.B | Enum.UNSPECIFIED | Enum.UNKNOWN
 * switch(enumValue) {
 *   case Enum.A:
 *     break;
 *   case Enum.B:
 *     break;
 *   default:
 *     assumeExhaustiveAllowing<Enum.UNSPECIFIED|Enum.UNKNOWN>(enumValue);
 *     break;
 * }
 * ```
 * @template Allowed, Arg
 * @param {Arg} value
 * @return {void}
 */
function assumeExhaustiveAllowing(value) { }
exports.assumeExhaustiveAllowing = assumeExhaustiveAllowing;
