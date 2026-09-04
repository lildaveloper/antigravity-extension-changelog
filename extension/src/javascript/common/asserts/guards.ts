/**
 * @fileoverview The Guards module provides various core TypeGuards and
 * StateGuards, to be used with the asserts module (see ./asserts).
 *
 * The TypeGuards are not intended to be exhaustive of the TypeScript type
 * system, but rather to address the most common types that users tend to want
 * to have some form of runtime checking for.
 *
 * The set of library-provided StateGuards is currently limited. In general, we
 * expect most users to author their own state guards. For instructions on
 * creating state guards, see: go/guards-and-assertions#custom-state-guards
 * Generated from: javascript/common/asserts/guards.ts
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
goog.module('google3.javascript.common.asserts.guards');
var module = module || { id: 'javascript/common/asserts/guards.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_asserts_1 = goog.requireType("google3.javascript.common.asserts.asserts");
const tsickle_internal_2 = goog.requireType("google3.javascript.common.asserts.internal");
const asserts_1 = goog.require('google3.javascript.common.asserts.asserts');
const internal_1 = goog.require('google3.javascript.common.asserts.internal');
/**
 * isNumber is a TypeGuard for the number type.
 * @type {!tsickle_asserts_1.TypeGuard<number>}
 */
exports.isNumber = (0, asserts_1.defineTypeGuard)((/**
 * @param {*} arg
 * @param {!tsickle_asserts_1.Context} context
 * @return {boolean}
 */
(arg, context) => {
    return typeof arg === 'number';
}), 'number');
/**
 * isZero is a TypeGuard for 0.
 * @type {!tsickle_asserts_1.TypeGuard<number>}
 */
exports.isZero = isLiteral(0);
/**
 * isSafeInteger checks if a number is a safe integer.
 * @type {!tsickle_asserts_1.StateGuard<number>}
 */
exports.isSafeInteger = (0, asserts_1.defineStateGuard)((/**
 * @param {number} arg
 * @param {!tsickle_asserts_1.Context} context
 * @return {boolean}
 */
(arg, context) => Number.isSafeInteger(arg)), 'isSafeInteger');
/**
 * isInteger checks if a number is an integer.
 * @type {!tsickle_asserts_1.StateGuard<number>}
 */
exports.isInteger = (0, asserts_1.defineStateGuard)((/**
 * @param {number} arg
 * @param {!tsickle_asserts_1.Context} context
 * @return {boolean}
 */
(arg, context) => Number.isInteger(arg)), 'isInteger');
/**
 * isFinite checks if a number is finite.
 * @type {!tsickle_asserts_1.StateGuard<number>}
 */
exports.isFinite = (0, asserts_1.defineStateGuard)((/**
 * @param {number} arg
 * @param {!tsickle_asserts_1.Context} context
 * @return {boolean}
 */
(arg, context) => Number.isFinite(arg)), 'isFinite');
/**
 * isGreaterThan returns a StateGuard for `arg > min`.
 * @param {number} min
 * @return {!tsickle_asserts_1.StateGuard<number>}
 */
function isGreaterThan(min) {
    return (0, asserts_1.defineStateGuard)((/**
     * @param {number} arg
     * @return {boolean}
     */
    (arg) => arg > min), (/**
     * @return {string}
     */
    () => `isGreaterThan(${(0, internal_1.basicPrettyPrint)(min)})`));
}
exports.isGreaterThan = isGreaterThan;
/**
 * isAtLeast returns a StateGuard for `arg >= min`.
 * @type {function(number): !tsickle_asserts_1.StateGuard<number>}
 */
exports.isAtLeast = isGte;
/**
 * isGreaterThanOrEqualTo returns a StateGuard for `arg >= min`.
 * @type {function(number): !tsickle_asserts_1.StateGuard<number>}
 */
exports.isGreaterThanOrEqualTo = isGte;
/**
 * @param {number} min
 * @return {!tsickle_asserts_1.StateGuard<number>}
 */
function isGte(min) {
    return (0, asserts_1.defineStateGuard)((/**
     * @param {number} arg
     * @return {boolean}
     */
    (arg) => arg >= min), (/**
     * @return {string}
     */
    () => `isGreaterThanOrEqualTo(${(0, internal_1.basicPrettyPrint)(min)})`));
}
/**
 * isLessThan returns a StateGuard for `arg < max`.
 * @param {number} max
 * @return {!tsickle_asserts_1.StateGuard<number>}
 */
function isLessThan(max) {
    return (0, asserts_1.defineStateGuard)((/**
     * @param {number} arg
     * @return {boolean}
     */
    (arg) => arg < max), (/**
     * @return {string}
     */
    () => `isLessThan(${(0, internal_1.basicPrettyPrint)(max)})`));
}
exports.isLessThan = isLessThan;
/**
 * isLessThanOrEqualTo returns a StateGuard for `arg <= max`.
 * @type {function(number): !tsickle_asserts_1.StateGuard<number>}
 */
exports.isLessThanOrEqualTo = isLte;
/**
 * isAtMost returns a StateGuard for `arg <= max`.
 * @type {function(number): !tsickle_asserts_1.StateGuard<number>}
 */
exports.isAtMost = isLte;
/**
 * @param {number} max
 * @return {!tsickle_asserts_1.StateGuard<number>}
 */
function isLte(max) {
    return (0, asserts_1.defineStateGuard)((/**
     * @param {number} arg
     * @return {boolean}
     */
    (arg) => arg <= max), (/**
     * @return {string}
     */
    () => `isLessThanOrEqualTo(${(0, internal_1.basicPrettyPrint)(max)})`));
}
// NOTE: For range checks, write:
// [0, 1]: isAllOf(isAtLeast(0), isAtMost(1))
// [0, 1): isAllOf(isGreaterThanOrEqualTo(0), isLessThan(1))
// (0, 1): isAllOf(isGreaterThan(0), isLessThan(1))
// (0, 1]: isAllOf(isGreaterThan(0), isLessThanOrEqualTo(1))
//
// Alternatively, write two assertions:
// [0, 1]: assert(arg, isAtLeast(0)); assert(arg, isAtMost(1));
/**
 * isString is a TypeGuard for the string type. Note that this says nothing
 * about the length of strings (e.g. '' is still a string).
 * @type {!tsickle_asserts_1.TypeGuard<string>}
 */
exports.isString = (0, asserts_1.defineTypeGuard)((/**
 * @param {*} arg
 * @param {!tsickle_asserts_1.Context} context
 * @return {boolean}
 */
(arg, context) => typeof arg === 'string'), 'string');
/**
 * isEmptyString is a TypeGuard for the empty string.
 * @type {!tsickle_asserts_1.TypeGuard<string>}
 */
exports.isEmptyString = isLiteral('');
/**
 * isNotBlank ensures a string is neither the empty string or all whitespace.
 * @type {!tsickle_asserts_1.StateGuard<string>}
 */
exports.isNotBlank = (0, asserts_1.defineStateGuard)((/**
 * @param {string} arg
 * @param {!tsickle_asserts_1.Context} context
 * @return {boolean}
 */
(arg, context) => arg.trim() !== ''), 'isNotBlank');
/**
 * isBlank checks if a string is blank (empty or all whitespace).
 * @type {!tsickle_asserts_1.StateGuard<string>}
 */
exports.isBlank = (0, asserts_1.defineStateGuard)((/**
 * @param {string} arg
 * @param {!tsickle_asserts_1.Context} context
 * @return {boolean}
 */
(arg, context) => arg.trim() === ''), 'isBlank');
/**
 * startsWith returns a StateGuard that checks if a string starts with `prefix`.
 *
 * \@checkReturnValue
 * @param {string} prefix
 * @return {!tsickle_asserts_1.StateGuard<string>}
 */
function startsWith(prefix) {
    return (0, asserts_1.defineStateGuard)((/**
     * @param {string} arg
     * @param {!tsickle_asserts_1.Context} context
     * @return {boolean}
     */
    (arg, context) => arg.startsWith(prefix)), (/**
     * @return {string}
     */
    () => `startsWith(${(0, internal_1.basicPrettyPrint)(prefix)})`));
}
exports.startsWith = startsWith;
/**
 * endsWith returns a StateGuard that checks if a string ends with `suffix`.
 *
 * \@checkReturnValue
 * @param {string} suffix
 * @return {!tsickle_asserts_1.StateGuard<string>}
 */
function endsWith(suffix) {
    return (0, asserts_1.defineStateGuard)((/**
     * @param {string} arg
     * @param {!tsickle_asserts_1.Context} context
     * @return {boolean}
     */
    (arg, context) => arg.endsWith(suffix)), (/**
     * @return {string}
     */
    () => `endsWith(${(0, internal_1.basicPrettyPrint)(suffix)})`));
}
exports.endsWith = endsWith;
/**
 * stringIncludes returns a StateGuard that checks if a string includes
 * `subString`.
 * \@checkReturnValue
 * @param {string} subString
 * @return {!tsickle_asserts_1.StateGuard<string>}
 */
function stringIncludes(subString) {
    return (0, asserts_1.defineStateGuard)((/**
     * @param {string} arg
     * @param {!tsickle_asserts_1.Context} context
     * @return {boolean}
     */
    (arg, context) => arg.includes(subString)), (/**
     * @return {string}
     */
    () => `stringIncludes(${(0, internal_1.basicPrettyPrint)(subString)})`));
}
exports.stringIncludes = stringIncludes;
/**
 * stringMatches returns a StateGuard that checks if a string matches `regExp`.
 *
 * The passed-in `regExp` may not be global (flag 'g') nor sticky (flag 'y') as
 * they can make the returned state guard behave inconsistently.
 * \@checkReturnValue
 * @param {!RegExp} regExp
 * @return {!tsickle_asserts_1.StateGuard<string>}
 */
function stringMatches(regExp) {
    (0, asserts_1.assert)(regExp, isAllOf(isNot(isGlobalRegExp), isNot(isStickyRegExp)), 'stringMatches does not support global nor sticky regular expressions as they can make the returned state guard behave inconsistently');
    return (0, asserts_1.defineStateGuard)((/**
     * @param {string} arg
     * @param {!tsickle_asserts_1.Context} context
     * @return {boolean}
     */
    (arg, context) => regExp.test(arg)), (/**
     * @return {string}
     */
    () => `stringMatches(${regExp})`));
}
exports.stringMatches = stringMatches;
/**
 * isBoolean is a TypeGuard for the boolean type. Note that this is different
 * from truthiness - see the `exists` guard in ./asserts for the closest
 * equivalent.
 * @type {!tsickle_asserts_1.TypeGuard<boolean>}
 */
exports.isBoolean = (0, asserts_1.defineTypeGuard)((/**
 * @param {*} arg
 * @param {!tsickle_asserts_1.Context} context
 * @return {boolean}
 */
(arg, context) => typeof arg === 'boolean'), 'boolean');
/**
 * isBigInt is a TypeGuard for the native bigint values. Note that bigint is not
 * universally supported in all browsers. See go/bigint for guidance on working
 * with big integer values.
 *
 * Related guards:
 * - isGbigint google3/javascript/common/bigint/index.ts?q=symbol:isGbigint
 * - isJSbi
 * google3/third_party/javascript/jsbi/g3_wrapper/bigint_helpers.ts?q=symbol:isJsbi
 * @type {!tsickle_asserts_1.TypeGuard<bigint>}
 */
exports.isBigInt = (0, asserts_1.defineTypeGuard)((/**
 * @param {*} arg
 * @return {boolean}
 */
(arg) => typeof arg === 'bigint'), 'bigint');
/**
 * isNull is a TypeGuard for the null primitive.
 * @type {!tsickle_asserts_1.TypeGuard<null>}
 */
exports.isNull = (0, asserts_1.defineTypeGuard)((/**
 * @param {*} arg
 * @param {!tsickle_asserts_1.Context} context
 * @return {boolean}
 */
(arg, context) => arg === null), 'null');
/**
 * isUndefined is a TypeGuard for the undefined primitive.
 * @type {!tsickle_asserts_1.TypeGuard<undefined>}
 */
exports.isUndefined = (0, asserts_1.defineTypeGuard)((/**
 * @param {*} arg
 * @param {!tsickle_asserts_1.Context} context
 * @return {boolean}
 */
(arg, context) => arg === undefined), 'undefined');
/**
 * isNullish is a TypeGuard for null or undefined.
 *
 * For more info, see go/mdn-glossary/Nullish.
 * @type {!tsickle_asserts_1.TypeGuard<(undefined|null)>}
 */
exports.isNullish = (0, asserts_1.defineTypeGuard)((/**
 * @param {*} arg
 * @return {boolean}
 */
(arg) => arg == null), 'null | undefined');
/**
 * isLiteral returns a TypeGuard for literal values. The passed-in arg may only
 * be a single distinct literal value. Works with string and numeric enum values
 * as well.
 *
 * Notes:
 * - To guard a union of literals, use `isAnyLiteralOf`.
 * - To guard all values of an enum, use `isEnumMemberOf`.
 * - To guard null or undefined, use `isNull` or `isUndefined`.
 * - DO NOT use with string template types (e.g., `a${number}`).
 * \@checkReturnValue
 * @template E
 * @param {?} literal
 * @return {!tsickle_asserts_1.TypeGuard<E>}
 */
function isLiteral(literal) {
    return (0, asserts_1.defineTypeGuard)((/**
     * @param {*} arg
     * @param {!tsickle_asserts_1.Context} context
     * @return {boolean}
     */
    (arg, context) => arg === literal), (
    // basicPrettyPrint() is more readable than String() for several types.
    /**
     * @return {string}
     */
    () => (0, internal_1.basicPrettyPrint)(literal)));
}
exports.isLiteral = isLiteral;
/**
 * Validates that the arg for `isLiteral` is valid. Resolves to `never` if
 * invalid.
 * @typedef {?}
 */
var LiteralArg;
/**
 * isAnyLiteralOf returns a TypeGuard for a union of literal values. The same
 * restrictions and caveats of `isLiteral` apply here.
 * \@checkReturnValue
 * @template T
 * @param {...?} literals
 * @return {!tsickle_asserts_1.TypeGuard<?>}
 */
function isAnyLiteralOf(...literals) {
    /** @type {!Set<*>} */
    const literalSet = new Set(literals);
    return (0, asserts_1.defineTypeGuard)((/**
     * @param {*} arg
     * @param {!tsickle_asserts_1.Context} context
     * @return {boolean}
     */
    (arg, context) => literalSet.has(arg)), (
    // basicPrettyPrint() is more readable than String() for several types.
    /**
     * @return {string}
     */
    () => literals.map((/**
     * @param {?} l
     * @return {string}
     */
    (l) => (0, internal_1.basicPrettyPrint)(l))).join('|')));
}
exports.isAnyLiteralOf = isAnyLiteralOf;
/**
 * Validates that the args for `isAnyLiteralOf` are valid and positionally sets
 * the type of invalid params to `never`.
 * @typedef {?}
 */
var AnyLiteralOfArgs;
/**
 * isEnumMemberOf returns a TypeGuard for elements of an enum. The passed-in
 * enum must be either a string enum or a numeric enum (mixing strings and
 * numbers is not supported).
 *
 * WARNING: This can be an expensive check in production code with large enums.
 * See go/guards-and-assertions#runtime-cost-considerations
 *
 * \@checkReturnValue
 * @template T
 * @param {T} enumContainer The enum container object (e.g. for `enum Foo {...}`,
 *     the `Foo` object itself must be passed as the first argument.
 * @param {(undefined|string)=} name A human-readable name for the enum, to be formatted in messages.
 *     This provides nicer debugging because there is no way to access the enum
 *     name from the container object at runtime.
 * @return {?}
 */
function isEnumMemberOf(enumContainer, name) {
    return (/** @type {?} */ ((/** @type {*} */ ((0, asserts_1.defineTypeGuard)((/**
     * @param {*} arg
     * @return {boolean}
     */
    (arg) => {
        /** @type {!Object<string,*>} */
        const enumAsDict = (/** @type {!Object<string,*>} */ (enumContainer));
        for (const key in enumAsDict) {
            if (arg === enumAsDict[key] && !/^[0-9]+$/.test(key)) {
                return true;
            }
        }
        return false;
    }), (/**
     * @return {string}
     */
    () => name ?? 'unknown enum'))))));
}
exports.isEnumMemberOf = isEnumMemberOf;
/**
 * Return type for `isEnum`.
 *
 * When `T` is an enum container, `EnumGuard<T>` is the element type.
 * Otherwise, it's `NotAnEnum<T>`, which is not assignable to `Guard`.
 *
 * `E` is the union of the enum elements.
 * @typedef {?}
 */
var EnumGuard;
/**
 * Determines whether the union types in E are a valid set of enum values.
 *
 * The singleton tuples `[E]` prevent TypeScript from distributing over unions.
 * @typedef {?}
 */
var AreValidEnumValues;
/**
 * Type returned from `isEnum()` when its argument is invalid.
 * @record
 * @template T
 */
function NotAnEnum() { }
/* istanbul ignore if */
if (false) {
    /* Skipping unnamed member:
    [isEnumMemberOfParameterMustBeAnEnum]: T;*/
}
/**
 * Checks whether a value is any kind of Thenable object.
 *
 * This includes native Promises, goog.Promise, and Deferred.
 * @type {!tsickle_asserts_1.TypeGuard<!PromiseLike<*>>}
 */
exports.isThenable = (0, asserts_1.defineTypeGuard)((/**
 * @param {*} arg
 * @param {!tsickle_asserts_1.Context} context
 * @return {boolean}
 */
(arg, context) => arg != null &&
    typeof arg === 'object' &&
    typeof ((/** @type {!Promise<*>} */ (arg))).then === 'function'), 'Thenable');
/**
 * isFunction is a TypeGuard for functions.
 * @type {!tsickle_asserts_1.TypeGuard<!Function>}
 */
exports.isFunction = (0, asserts_1.defineTypeGuard)((/**
 * @param {*} arg
 * @param {!tsickle_asserts_1.Context} context
 * @return {boolean}
 */
(arg, context) => typeof arg === 'function'), 'Function');
/**
 * isGuard is a StateGuard for TypeGuards and StateGuards.
 *
 * Note: This is not a TypeGuard because there would be no way to detect if the
 * given arg is a TypeGuard or a StateGuard. Even if we could distinguish, the
 * resulting guarded type would need to be TypeGuard<any> or StateGuard<any> as
 * there is no way, at runtime, to identify the guarded type.
 * @type {!tsickle_asserts_1.StateGuard<*>}
 */
exports.isGuard = (0, asserts_1.defineStateGuard)((/**
 * @param {*} arg
 * @param {!tsickle_asserts_1.Context} context
 * @return {boolean}
 */
(arg, context) => {
    if (!(0, asserts_1.executeNestedGuard)(exports.isFunction, arg, context))
        return false;
    return (((/** @type {!tsickle_internal_2.BrandedGuard} */ ((/** @type {*} */ (arg))))).isGuard_doNotManuallySetPrettyPlease ===
        true);
}), 'isGuard');
/**
 * Convenience type guard for Date.
 *
 * This guard does no verification of valid dates as invalid dates are still
 * instances of `Date`. Use in conjunction with `isValidDate` for validation.
 *
 * For more on invalid dates, see:
 * go/mdn/JavaScript/Reference/Global_Objects/Date#the_epoch_timestamps_and_invalid_date
 * @type {!tsickle_asserts_1.TypeGuard<!Date>}
 */
exports.isDate = isInstanceOf(Date);
/**
 * isValidDate checks if a Date is valid.
 *
 * For more on invalid dates, see:
 * go/mdn/JavaScript/Reference/Global_Objects/Date#the_epoch_timestamps_and_invalid_date
 * @type {!tsickle_asserts_1.StateGuard<!Date>}
 */
exports.isValidDate = (0, asserts_1.defineStateGuard)((/**
 * @param {!Date} arg
 * @return {boolean}
 */
(arg) => !isNaN((/** @type {number} */ ((/** @type {*} */ (arg)))))), 'isValidDate');
/**
 * isGlobalRegExp checks if a RegExp is global (has the `g` flag).
 *
 * Note: this guard is internal-only at the moment. If you would like to use it,
 * DON'T COPY IT! Ask us about it via tsjs-libraries-eng\@ or just send a CL.
 * @type {!tsickle_asserts_1.StateGuard<!RegExp>}
 */
const isGlobalRegExp = (0, asserts_1.defineStateGuard)((/**
 * @param {!RegExp} arg
 * @return {boolean}
 */
(arg) => arg.global), 'isGlobalRegExp');
/**
 * isStickyRegExp checks if a RegExp is sticky (has the `y` flag).
 *
 * Note: this guard is internal-only at the moment. If you would like to use it,
 * DON'T COPY IT! Ask us about it via tsjs-libraries-eng\@ or just send a CL.
 * @type {!tsickle_asserts_1.StateGuard<!RegExp>}
 */
const isStickyRegExp = (0, asserts_1.defineStateGuard)((/**
 * @param {!RegExp} arg
 * @return {boolean}
 */
(arg) => arg.sticky), 'isStickyRegExp');
/**
 * isObject is a TypeGuard for Objects.
 * @type {!tsickle_asserts_1.TypeGuard<!Object>}
 */
exports.isObject = (0, asserts_1.defineTypeGuard)((/**
 * @param {*} arg
 * @param {!tsickle_asserts_1.Context} context
 * @return {boolean}
 */
(arg, context) => !!arg && (typeof arg === 'object' || typeof arg === 'function')), 'object');
/**
 * isInstanceOf is a TypeGuard for instanceof checks, both for concrete and
 * abstract classes.
 * \@checkReturnValue
 * @template T
 * @param {?} c
 * @return {!tsickle_asserts_1.TypeGuard<T>}
 */
function isInstanceOf(c) {
    return (0, asserts_1.defineTypeGuard)((/**
     * @param {*} arg
     * @param {!tsickle_asserts_1.Context} context
     * @return {boolean}
     */
    (arg, context) => {
        return arg instanceof c;
    }), (/**
     * @return {string}
     */
    () => (0, internal_1.functionName)(c)));
}
exports.isInstanceOf = isInstanceOf;
/** @typedef {?} */
var Constructor;
/**
 * isStruct is a TypeGuard that verifies that the structure of an object adheres
 * to an interface.
 *
 * This function **must** be called with exactly one type parameter explicitly
 * specified (i.e. `isStruct<Foo>(...)`). The second parameter is present only
 * to provide a type error when the first parameter is missing; it should never
 * be explicitly specified.
 *
 * Unsupported types:
 * - Concrete classes (use `isInstanceOf`)
 * - Interfaces with index signatures (consider `isRecordOf`)
 * - Interfaces with type recursion (i.e., only DAGs of types are supported). If
 *   you need this feature, +1 b/265962324 and provide details of your use case.
 * - Union of multiple interfaces (use `isAnyOf` with `isStruct`)
 * - Empty interfaces
 *
 * Note: interface methods are only guarded via `isFunction`. If you need to
 * verify function types at runtime, +1 b/265962339 and provide details of your
 * use case.
 *
 * WARNING: Be aware of property renaming and the key names of the guarded `arg`
 * (which could _not_ be renamed) and the `guardSpec`. Do NOT quote property
 * keys in your `guardSpec`.
 * See go/typescript-g3patterns#property-renaming
 *
 * WARNING: This can be an expensive check in production code if your object has
 * many properties or nested values.
 * See go/guards-and-assertions#runtime-cost-considerations
 *
 * \@checkReturnValue
 * @template T, U
 * @param {?} guardSpec An object literal formed by taking T and replacing its
 *     property types with guards. Guards for optional properties need to be
 *     wrapped in the `isOptional` guard.
 * @param {string} typeName A human-readable name for the type, to be formatted in
 *     messages. This provides nicer debugging because there is no way to access
 *     the type name of `T` as a string at runtime.
 * @return {!tsickle_asserts_1.TypeGuard<T>}
 */
function isStruct(guardSpec, typeName) {
    return (0, asserts_1.defineTypeGuard)((/**
     * @param {*} arg
     * @param {!tsickle_asserts_1.Context} context
     * @return {boolean}
     */
    (arg, context) => {
        // executeNestedGuard not used as the extra error is not useful here.
        if (!(0, exports.isObject)(arg))
            return false;
        for (const [key__tsickle_destructured_1, guard__tsickle_destructured_2] of Object.entries((/** @type {?} */ (guardSpec)))) {
            const key = /** @type {string} */ (key__tsickle_destructured_1);
            const guard = /** @type {!tsickle_asserts_1.TypeGuard<*>} */ (guard__tsickle_destructured_2);
            if (!(key in arg)) {
                // Object properties may be absent for optional guards.
                if ((0, internal_1.isOptionalGuard)(guard))
                    continue;
                (0, asserts_1.addMessageToContext)(context, `Missing required property ${key}`);
                return false;
            }
            /** @type {*} */
            const value = ((/** @type {?} */ (arg)))[key];
            if (!(0, asserts_1.executeNestedGuard)(guard, value, context, `For property ${key}`)) {
                return false;
            }
        }
        return true;
    }), typeName);
}
exports.isStruct = isStruct;
/**
 * The type for the `guardSpec` param of `isStruct`. Converts an interface to
 * have required readonly properties with Guards as values.
 *
 * In the event of an unsupported type, resolves to `never`.
 *
 * This type can be useful on its own when creating guards of interfaces which
 * extend another interface. Specs can be merged into an isStruct call.
 * @typedef {?}
 */
exports.StructGuardSpec;
/**
 * Checks if the given type is supported by `StructGuardSpec`.
 * @typedef {?}
 */
var IsSupportedStruct;
/**
 * Checks if the given type has non-public properties.
 * @typedef {?}
 */
var HasNonPublicProperties;
/**
 * Checks if the given type has an index signature.
 * @typedef {?}
 */
var HasIndexSignature;
/**
 * Checks if the given type is empty.
 * @typedef {?}
 */
var IsEmpty;
/**
 * Checks whether key P of T is optional.
 * @typedef {?}
 */
var IsOptionalProp;
/**
 * For any function or method, simplifies the guard type to `Function`.
 * @typedef {?}
 */
var SimplifyFunction;
/**
 * Excludes undefined from a union type.
 * @typedef {?}
 */
var ExcludeUndefined;
/**
 * Takes any guard and creates a variant of it that can be `T` or `undefined`.
 *
 * Also tells `isStruct` that its OK if an associated property is absent.
 *
 * \@checkReturnValue
 * @template T
 * @param {!tsickle_asserts_1.TypeGuard<T>} innerGuard The inner guard for optional guard.
 * @return {?}
 */
function isOptional(innerGuard) {
    return markOptional((0, asserts_1.defineTypeGuard)((/**
     * @param {*} arg
     * @param {!tsickle_asserts_1.Context} context
     * @return {boolean}
     */
    (arg, context) => {
        if (arg === undefined)
            return true;
        // We don't use executeNestedGuard as the error message is repetitive
        // though we do pass along the context.
        return ((/** @type {!tsickle_internal_2.DebugGuard} */ (innerGuard)))(arg, (/** @type {(undefined|?)} */ (context)));
    }), (/**
     * @return {string}
     */
    () => `optional ${(0, asserts_1.guardName)(innerGuard)}`)));
}
exports.isOptional = isOptional;
/**
 * Extracted to eliminate a class of dead-code-elimination bugs that cropped up
 * with isOptional.
 * @nosideeffects
 * @template T
 * @param {!tsickle_asserts_1.TypeGuard<(undefined|T)>} guard
 * @return {?}
 */
function markOptional(guard) {
    ((/** @type {?} */ (guard))).isOptionalGuard_doNotManuallySetPrettyPlease =
        true;
    return (/** @type {?} */ (guard));
}
/**
 * `isUnknown` is a TypeGuard for the `unknown` type.
 *
 * This is a fairly pointless guard on its own as, when used with assertions, it
 * does not refine types because `T & unknown` is just `T`.
 *
 * The main application for `isUnknown` is with `isStruct` when guarding a
 * property typed as `unknown`.
 * @type {!tsickle_asserts_1.TypeGuard<*>}
 */
exports.isUnknown = (0, asserts_1.defineTypeGuard)((/**
 * @param {*} arg
 * @param {!tsickle_asserts_1.Context} context
 * @return {boolean}
 */
(arg, context) => true), 'unknown');
/**
 * isArray is a TypeGuard for readonly arrays that does not validate the type of
 * the array's contents.
 *
 * Note that this guard is not able to know at runtime that an array is
 * readonly - this differentiation is only for compile-time checks (e.g. to
 * ensure that you don't mutate the array).
 * @type {!tsickle_asserts_1.TypeGuard<!ReadonlyArray<*>>}
 */
exports.isArray = arrayGuardBase();
/**
 * isMutableArray is a TypeGuard for mutable arrays that does not validate the
 * type of the array's contents.
 *
 * Note that using this guard on a readonly array will widen the type and make
 * the array mutable.
 * @type {!tsickle_asserts_1.TypeGuard<!Array<*>>}
 */
exports.isMutableArray = arrayGuardBase();
// return-only generics is safer in this case than casts because it restricts
// the type to be rooted at ReadonlyArray<unknown> instead of anything.
// tslint:disable-next-line:no-return-only-generics
/**
 * @template R
 * @return {!tsickle_asserts_1.TypeGuard<R>}
 */
function arrayGuardBase() {
    return (0, asserts_1.defineTypeGuard)((/**
     * @param {*} arg
     * @param {!tsickle_asserts_1.Context} context
     * @return {boolean}
     */
    (arg, context) => Array.isArray(arg)), 'Array<unknown>');
}
/**
 * @param {!tsickle_asserts_1.StateGuard<?>} itemGuard
 * @return {!tsickle_asserts_1.StateGuard<?>}
 */
function isArrayOf(itemGuard) {
    return mutableArrayGuard(itemGuard);
}
exports.isArrayOf = isArrayOf;
/**
 * isMutableArrayOf returns a guard for mutable arrays.
 *
 * Note, as a TypeGuard, using this guard on a readonly array will widen the
 * type and make the array mutable.
 *
 * WARNING: This can be an expensive check in production code with large arrays.
 * See go/guards-and-assertions#runtime-cost-considerations
 *
 * \@checkReturnValue
 * @template T
 * @param {!tsickle_asserts_1.TypeGuard<T>} itemGuard The guard for each item in the array. This guard must pass
 *     for all items in the array for the overall guard to pass.
 * @return {!tsickle_asserts_1.TypeGuard<!Array<T>>}
 */
function isMutableArrayOf(itemGuard) {
    return (/** @type {!tsickle_asserts_1.TypeGuard<!Array<T>>} */ (mutableArrayGuard(itemGuard)));
}
exports.isMutableArrayOf = isMutableArrayOf;
/**
 * @param {!tsickle_asserts_1.StateGuard<?>} itemGuard
 * @return {!tsickle_asserts_1.StateGuard<?>}
 */
function mutableArrayGuard(itemGuard) {
    return (0, asserts_1.defineStateGuard)((/**
     * @param {*} arg
     * @param {!tsickle_asserts_1.Context} context
     * @return {boolean}
     */
    (arg, context) => {
        if (!(0, asserts_1.executeNestedGuard)(exports.isMutableArray, arg, context)) {
            return false;
        }
        return (/** @type {!Array<*>} */ (arg)).every((/**
         * @param {*} value
         * @param {number} i
         * @return {boolean}
         */
        (value, i) => (0, asserts_1.executeNestedGuard)(itemGuard, value, context, `At index ${i}`)));
    }), (/**
     * @return {string}
     */
    () => `Array<${(0, asserts_1.guardName)(itemGuard)}>`));
}
/**
 * @param {...!tsickle_asserts_1.StateGuard<?>} guards
 * @return {!tsickle_asserts_1.StateGuard<?>}
 */
function isTupleOf(...guards) {
    return mutableTupleGuard(guards);
}
exports.isTupleOf = isTupleOf;
/**
 * isMutableTupleOf returns a guard asserting a given argument is a mutable
 * tuple whose elements satisfy each guard.
 *
 * Note, as a TypeGuard, using this guard on a readonly tuple will widen the
 * type and make the tuple mutable.
 *
 * Note: Does not support optional or rest elements. If you need these features,
 * please +1 b/265950491 and/or b/265950848 and provide details of your use
 * case.
 *
 * WARNING: This can be an expensive check in production code for large tuples.
 * See go/guards-and-assertions#runtime-cost-considerations
 * \@checkReturnValue
 * @template T
 * @param {...!tsickle_asserts_1.TypeGuard<?>} guards
 * @return {!tsickle_asserts_1.TypeGuard<?>}
 */
function isMutableTupleOf(...guards) {
    return (/** @type {!tsickle_asserts_1.TypeGuard<?>} */ (mutableTupleGuard(guards)));
}
exports.isMutableTupleOf = isMutableTupleOf;
/** @typedef {?} */
var TupleTypeGuardArgsToTuple;
/** @typedef {?} */
var TupleStateGuardArgsToTuple;
/**
 * @param {!Array<!tsickle_asserts_1.StateGuard<?>>} guards
 * @return {!tsickle_asserts_1.StateGuard<?>}
 */
function mutableTupleGuard(guards) {
    return (0, asserts_1.defineStateGuard)((/**
     * @param {*} arg
     * @param {!tsickle_asserts_1.Context} context
     * @return {boolean}
     */
    (arg, context) => {
        if (!(0, asserts_1.executeNestedGuard)(exports.isArray, arg, context)) {
            return false;
        }
        if ((/** @type {!ReadonlyArray<*>} */ (arg)).length !== guards.length) {
            (0, asserts_1.addMessageToContext)(context, `Expected ${guards.length} elements; got ${(/** @type {!ReadonlyArray<*>} */ (arg)).length} elements`);
            return false;
        }
        for (let i = 0; i < (/** @type {!ReadonlyArray<*>} */ (arg)).length; ++i) {
            if (!(0, asserts_1.executeNestedGuard)(guards[i], arg[i], context, `At index ${i}`)) {
                return false;
            }
        }
        return true;
    }), (/**
     * @return {string}
     */
    () => `[${guards.map(asserts_1.guardName).join(', ')}]`));
}
/**
 * isSet is a TypeGuard for readonly Sets that does not validate the type of the
 * set's entries.
 *
 * Note that this guard is not able to know at runtime that a Set is readonly -
 * this differentiation is only for compile-time checks (e.g. to ensure that you
 * don't mutate the Set).
 * @type {!tsickle_asserts_1.TypeGuard<!ReadonlySet<*>>}
 */
exports.isSet = setGuardBase();
/**
 * isMutableSet is a TypeGuard for mutable Sets that does not validate the type
 * of the set's entries.
 *
 * Note that using this guard on a readonly Set will widen the type and make the
 * Set mutable.
 * @type {!tsickle_asserts_1.TypeGuard<!Set<*>>}
 */
exports.isMutableSet = setGuardBase();
// return-only generics is safer in this case than casts because it restricts
// the type to be rooted at ReadonlySet<unknown> instead of anything.
// tslint:disable-next-line:no-return-only-generics
/**
 * @template R
 * @return {!tsickle_asserts_1.TypeGuard<R>}
 */
function setGuardBase() {
    return (0, asserts_1.defineTypeGuard)((/**
     * @param {*} arg
     * @param {!tsickle_asserts_1.Context} context
     * @return {boolean}
     */
    (arg, context) => {
        return arg instanceof Set;
    }), 'Set<unknown>');
}
/**
 * @param {!tsickle_asserts_1.StateGuard<?>} itemGuard
 * @return {!tsickle_asserts_1.StateGuard<?>}
 */
function isSetOf(itemGuard) {
    return mutableSetGuard(itemGuard);
}
exports.isSetOf = isSetOf;
/**
 * isMutableSetOf returns a guard for mutable Sets.
 *
 * Note that, as a TypeGuard, using this guard on a readonly Set will widen the
 * type and make the Set mutable.
 *
 * WARNING: This can be an expensive check in production code with large sets.
 * See go/guards-and-assertions#runtime-cost-considerations
 *
 * \@checkReturnValue
 * @template T
 * @param {!tsickle_asserts_1.TypeGuard<T>} itemGuard The guard for each item in the Set. This guard must pass
 *     for all items in the Set for the overall guard to pass.
 * @return {!tsickle_asserts_1.TypeGuard<!Set<T>>}
 */
function isMutableSetOf(itemGuard) {
    return (/** @type {!tsickle_asserts_1.TypeGuard<!Set<T>>} */ (mutableSetGuard(itemGuard)));
}
exports.isMutableSetOf = isMutableSetOf;
/**
 * @param {!tsickle_asserts_1.StateGuard<?>} itemGuard
 * @return {!tsickle_asserts_1.StateGuard<?>}
 */
function mutableSetGuard(itemGuard) {
    return (0, asserts_1.defineStateGuard)((/**
     * @param {*} arg
     * @param {!tsickle_asserts_1.Context} context
     * @return {boolean}
     */
    (arg, context) => {
        if (!(0, asserts_1.executeNestedGuard)(exports.isMutableSet, arg, context)) {
            return false;
        }
        for (const kV of (/** @type {!Set<*>} */ (arg)).entries()) {
            /** @type {*} */
            const item = kV[1];
            /** @type {boolean} */
            const guarded = (0, asserts_1.executeNestedGuard)(itemGuard, item, context);
            if (!guarded)
                return false;
        }
        return true;
    }), (/**
     * @return {string}
     */
    () => `Set<${(0, asserts_1.guardName)(itemGuard)}>`));
}
/**
 * isMap is a TypeGuard for readonly Maps that does not validate the types of
 * the map's keys nor values.
 *
 * Note that this guard is not able to know at runtime that a map is readonly -
 * this differentiation is only for compile-time checks (e.g. to ensure that you
 * don't mutate the map after having type-guarded it).
 * @type {!tsickle_asserts_1.TypeGuard<!ReadonlyMap<*, *>>}
 */
exports.isMap = mapGuardBase();
/**
 * isMutableMap is a TypeGuard for mutable Maps that does not validate types of
 * the map's keys nor values.
 *
 * Note that using this guard on a readonly Map will widen the type and make the
 * Map mutable.
 * @type {!tsickle_asserts_1.TypeGuard<!Map<*, *>>}
 */
exports.isMutableMap = mapGuardBase();
// return-only generics is safer in this case than casts because it restricts
// the type to be rooted at ReadonlyMap<unknown,unknown> instead of anything.
// tslint:disable-next-line:no-return-only-generics
/**
 * @template R
 * @return {!tsickle_asserts_1.TypeGuard<R>}
 */
function mapGuardBase() {
    return (0, asserts_1.defineTypeGuard)((/**
     * @param {*} arg
     * @param {!tsickle_asserts_1.Context} context
     * @return {boolean}
     */
    (arg, context) => {
        return arg instanceof Map;
    }), 'Map<unknown, unknown>');
}
/**
 * @param {!tsickle_asserts_1.StateGuard<?>} keyGuard
 * @param {!tsickle_asserts_1.StateGuard<?>} valueGuard
 * @return {!tsickle_asserts_1.StateGuard<?>}
 */
function isMapOf(keyGuard, valueGuard) {
    return mutableMapGuard(keyGuard, valueGuard);
}
exports.isMapOf = isMapOf;
/**
 * @param {!tsickle_asserts_1.StateGuard<?>} keyGuard
 * @param {!tsickle_asserts_1.StateGuard<?>} valueGuard
 * @return {!tsickle_asserts_1.StateGuard<?>}
 */
function isMutableMapOf(keyGuard, valueGuard) {
    return mutableMapGuard(keyGuard, valueGuard);
}
exports.isMutableMapOf = isMutableMapOf;
/**
 * @param {!tsickle_asserts_1.StateGuard<?>} keyGuard
 * @param {!tsickle_asserts_1.StateGuard<?>} valueGuard
 * @return {!tsickle_asserts_1.StateGuard<?>}
 */
function mutableMapGuard(keyGuard, valueGuard) {
    return (0, asserts_1.defineStateGuard)((/**
     * @param {*} arg
     * @param {!tsickle_asserts_1.Context} context
     * @return {boolean}
     */
    (arg, context) => {
        if (!(0, asserts_1.executeNestedGuard)(exports.isMutableMap, arg, context)) {
            return false;
        }
        for (const [key__tsickle_destructured_3, val__tsickle_destructured_4] of (/** @type {!Map<*, *>} */ (arg)).entries()) {
            const key = /** @type {*} */ (key__tsickle_destructured_3);
            const val = /** @type {*} */ (val__tsickle_destructured_4);
            /** @type {boolean} */
            const isValidKey = (0, asserts_1.executeNestedGuard)(keyGuard, key, context, (/**
             * @return {string}
             */
            () => `For key ${key}`));
            if (!isValidKey)
                return false;
            /** @type {boolean} */
            const isValidValue = (0, asserts_1.executeNestedGuard)(valueGuard, val, context, (/**
             * @return {string}
             */
            () => `For key ${key}, checking value`));
            if (!isValidValue)
                return false;
        }
        return true;
    }), (/**
     * @return {string}
     */
    () => `Map<${(0, asserts_1.guardName)(keyGuard)}, ${(0, asserts_1.guardName)(valueGuard)}>`));
}
/**
 * @param {!tsickle_asserts_1.StateGuard<?>} keyGuard
 * @param {!tsickle_asserts_1.StateGuard<?>} valueGuard
 * @return {!tsickle_asserts_1.StateGuard<?>}
 */
function isRecordOf(keyGuard, valueGuard) {
    return mutableRecordGuard(keyGuard, valueGuard);
}
exports.isRecordOf = isRecordOf;
/**
 * isMutableRecordOf returns a TypeGuard for a mutable Record whose keys that
 * match the keyGuard have values that match the valueGuard.
 *
 * Note that using this guard on a readonly Record will widen the type and make
 * the Record mutable.
 *
 * WARNING: This can be an expensive check in production code with large
 * records. See go/guards-and-assertions#runtime-cost-considerations
 *
 * \@checkReturnValue
 * @template K, V
 * @param {!tsickle_asserts_1.TypeGuard<K>} keyGuard The Guard for the keys of the record.
 * @param {!tsickle_asserts_1.TypeGuard<V>} valueGuard The Guard for the values of the record.
 * @return {!tsickle_asserts_1.TypeGuard<?>}
 */
function isMutableRecordOf(keyGuard, valueGuard) {
    return (/** @type {!tsickle_asserts_1.TypeGuard<?>} */ ((/** @type {*} */ (mutableRecordGuard(keyGuard, valueGuard)))));
}
exports.isMutableRecordOf = isMutableRecordOf;
/**
 * @param {!tsickle_asserts_1.StateGuard<?>} keyGuard
 * @param {!tsickle_asserts_1.StateGuard<?>} valueGuard
 * @return {!tsickle_asserts_1.StateGuard<?>}
 */
function mutableRecordGuard(keyGuard, valueGuard) {
    return (0, asserts_1.defineStateGuard)((/**
     * @param {*} arg
     * @param {!tsickle_asserts_1.Context} context
     * @return {boolean}
     */
    (arg, context) => {
        if (!(0, asserts_1.executeNestedGuard)(exports.isObject, arg, context)) {
            return false;
        }
        /** @type {?} */
        const argProto = Object.getPrototypeOf(arg);
        /** @type {boolean} */
        const isPOJO = argProto === Object.prototype || argProto == null;
        // Iterate over the prototype chain to check all properties, including
        // inherited ones. We stop before Object.prototype to avoid checking
        // built-in methods like toString or hasOwnProperty.
        for (let o = (/** @type {!Object} */ (arg)); o && o !== Object.prototype; o = Object.getPrototypeOf(o)) {
            for (const k of Reflect.ownKeys(o)) {
                // TypeScript has a specific carve-out for Object.prototype properties
                // in Record<string, V>:
                //     const x: Record<string, number> = {toString: 1};
                //     const y: () => string = x.toString;
                // To thread the needle between these two somewhat contradictory
                // expectations, we (1) exclude any Object.prototype property names
                // from being checked by the nested guards, but also (2) ignore the
                // above exclusion for Plain Old JavaScript Objects. This keeps a
                // reasonable balance between class instances (which may override
                // these methods) and object literals.
                if (!isPOJO && isObjectPrototypePropertyName(k)) {
                    continue;
                }
                // Record assignability only cares about the declared key type.
                // Non-matching keys are unconstrained and can be anything.
                if (!executeRecordKeyGuard(keyGuard, k, context)) {
                    continue;
                }
                // Finally, once the key type is matched, we can check the value type.
                if (!(0, asserts_1.executeNestedGuard)(valueGuard, ((/** @type {?} */ (o)))[k], context, (/**
                 * @return {string}
                 */
                () => `For key ${(0, internal_1.basicPrettyPrint)(k)}, checking value`))) {
                    return false;
                }
            }
        }
        return true;
    }), (/**
     * @return {string}
     */
    () => `Record<${(0, asserts_1.guardName)(keyGuard)}, ${(0, asserts_1.guardName)(valueGuard)}>`));
}
/**
 * Checks if a given property name is one of the built-in properties on
 * `Object.prototype`.
 * @param {(string|symbol)} key
 * @return {boolean}
 */
function isObjectPrototypePropertyName(key) {
    // Calling this with the receiver as Object.prototype is intentional!
    return Object.prototype.hasOwnProperty(key);
}
/**
 * Validates a record key against the provided `keyGuard`.
 *
 * Object keys are always strings at runtime in JavaScript, but TypeScript
 * supports `Record<number, V>`. To support this, if the key is number-like,
 * we speculatively try to validate it as a number first.
 *
 * To avoid polluting the main context or running guards multiple times, we use
 * temporary contexts to capture failure messages from both number and string
 * attempts. If both fail, we propagate the most relevant messages to the main
 * context.
 * @param {!tsickle_asserts_1.StateGuard<?>} keyGuard
 * @param {(string|symbol)} key
 * @param {!tsickle_asserts_1.Context} context
 * @return {boolean}
 */
function executeRecordKeyGuard(keyGuard, key, context) {
    /** @type {(undefined|?)} */
    const numContext = (/** @type {(undefined|?)} */ ((goog.DEBUG ? [] : undefined)));
    /** @type {(undefined|?)} */
    const strContext = (/** @type {(undefined|?)} */ ((goog.DEBUG ? [] : undefined)));
    if (keyGuard !== exports.isString && (0, exports.isString)(key)) {
        /** @type {number} */
        const numKey = Number(key);
        if (
        // Ensures that the numKey is a valid number as it would be stringifed.
        // Eg. String(Number('0.11111111111111118')) is '0.11111111111111117'.
        String(numKey) === key &&
            (0, asserts_1.executeNestedGuard)(keyGuard, numKey, (/** @type {?} */ (numContext)), (/**
             * @return {string}
             */
            () => `For key ${(0, internal_1.basicPrettyPrint)(numKey)} (as number)`))) {
            return true;
        }
    }
    if ((0, asserts_1.executeNestedGuard)(keyGuard, key, (/** @type {?} */ (strContext)), (/**
     * @return {string}
     */
    () => `For key ${(0, internal_1.basicPrettyPrint)(key)}`))) {
        return true;
    }
    if (goog.DEBUG) {
        if ((/** @type {?} */ (numContext)).length > 0) {
            (/** @type {?} */ (((/** @type {(undefined|?)} */ (context))))).push(...((/** @type {!Array<string>} */ (numContext))));
        }
        else if ((/** @type {?} */ (strContext)).length > 0) {
            (/** @type {?} */ (((/** @type {(undefined|?)} */ (context))))).push(...((/** @type {!Array<string>} */ (strContext))));
        }
    }
    return false;
}
/**
 * @param {...!tsickle_asserts_1.StateGuard<?>} guards
 * @return {!tsickle_asserts_1.StateGuard<?>}
 */
function isAnyOf(...guards) {
    return (0, asserts_1.defineStateGuard)((/**
     * @param {*} arg
     * @param {!tsickle_asserts_1.Context} context
     * @return {boolean}
     */
    (arg, context) => {
        // We intentionally do not use `executeNestedGuard` here as the resulting
        // debugging messages are overly verbose and confusing.
        return guards.some((/**
         * @param {!tsickle_asserts_1.StateGuard<?>} guard
         * @return {boolean}
         */
        (guard) => guard(arg)));
    }), (/**
     * @return {string}
     */
    () => `${guards.map((/**
     * @param {!tsickle_asserts_1.StateGuard<?>} guard
     * @return {string}
     */
    (guard) => (0, asserts_1.guardName)(guard))).join(' | ')}`));
}
exports.isAnyOf = isAnyOf;
/**
 * Converts [TypeGuard<A>, TypeGuard<B>, …] to the type `A | B | …`.
 * @typedef {?}
 */
var UnionGuardedTypes;
/**
 * Converts [StateGuard<A>, StateGuard<B>, …] to the type `A & B & …`.
 * @typedef {?}
 */
var IntersectStateGuardArgTypes;
/**
 * Converts `[TypeGuard<A>, TypeGuard<B>, …]` to `[A, B, …]`.
 * @typedef {?}
 */
var TypeGuardTupleToTuple;
/**
 * Converts `[StateGuard<A>, StateGuard<B>, …]` to `[A, B, …]`.
 * @typedef {?}
 */
var StateGuardTupleToTuple;
/**
 * @param {...!tsickle_asserts_1.StateGuard<?>} guards
 * @return {!tsickle_asserts_1.StateGuard<?>}
 */
function isAllOf(...guards) {
    return (0, asserts_1.defineStateGuard)((/**
     * @param {*} arg
     * @param {!tsickle_asserts_1.Context} context
     * @return {boolean}
     */
    (arg, context) => guards.every((/**
     * @param {!tsickle_asserts_1.StateGuard<?>} guard
     * @param {number} i
     * @return {boolean}
     */
    (guard, i) => (0, asserts_1.executeNestedGuard)(guard, arg, context, (/**
     * @return {string}
     */
    () => `At Guards index ${i}`))))), (/**
     * @return {string}
     */
    () => `${guards.map((/**
     * @param {!tsickle_asserts_1.StateGuard<?>} g
     * @return {string}
     */
    (g) => (0, asserts_1.guardName)(g))).join(' & ')}`));
}
exports.isAllOf = isAllOf;
/**
 * Converts [TypeGuard<A>, TypeGuard<B>, …] to the type `A & B & …`.
 * @typedef {?}
 */
var IntersectGuardedTypes;
/**
 * Calculates the loosest StateGuard type based on the guards passed to isAllOf.
 * Designed so that while `isAllOf(isPositive, isInteger)` returns a
 * `StateGuard<number>`, `isAllOf(isNumber, isPositive, isInteger)` returns a
 * `StateGuard<unknown>` allowing any arg type instead of just number because
 * `isNumber` is a `TypeGuard` that accepts `unknown` args, and so the arg will
 * be guaranteed to be a number before isPositive and isInteger are called.
 * @typedef {?}
 */
var IsAllOfStateGuardArg;
/**
 * Converts `[A,B,…]` to `A&B&…`
 * @typedef {?}
 */
var TupleToIntersection;
/**
 * Converts `[A,B,…]` to `[[A],[B],…]`.
 * @typedef {?}
 */
var WrapTupleElements;
/**
 * Converts `[A]` to `A`, `[A]|[B]|…` to `A|B|…`, and `[A]&[B]&…` to `A&B&…`
 * @typedef {?}
 */
var UnwrapTuple;
/**
 * Negates the result of a `StateGuard`.
 *
 * Note that the returned guard cannot support descriptive debug error messages
 * because the passed-in `innerGuard` does not have the capacity to add error
 * messages to `context` indicating why it _passed_.
 * \@checkReturnValue
 * @template A
 * @param {!tsickle_asserts_1.StateGuard<A>} innerGuard
 * @return {!tsickle_asserts_1.StateGuard<A>}
 */
function isNot(innerGuard) {
    return (0, asserts_1.defineStateGuard)((/**
     * @param {A} arg
     * @param {!tsickle_asserts_1.Context} context
     * @return {boolean}
     */
    (arg, context) => 
    // We intentionally do not use `executeNestedGuard` here as `innerGuard`
    // would only add debugging messages if it failed but our guard _expects_
    // it to fail so the error message would be incorrect.
    !innerGuard(arg)), `isNot(${(0, asserts_1.guardName)(innerGuard)})`);
}
exports.isNot = isNot;
