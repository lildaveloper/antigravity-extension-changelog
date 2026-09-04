/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/antigravity/src/vs/base/common/types.ts
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
goog.module('google3.third_party.antigravity.src.vs.base.common.types');
var module = module || { id: 'third_party/antigravity/src/vs/base/common/types.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_assert_1 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.assert");
const assert_1 = goog.require('google3.third_party.antigravity.src.vs.base.common.assert');
/**
 * @param {*} str
 * @return {boolean} whether the provided parameter is a JavaScript String or not.
 */
function isString(str) {
    return (typeof str === 'string');
}
exports.isString = isString;
/**
 * @param {*} value
 * @return {boolean} whether the provided parameter is a JavaScript Array and each element in the array is a string.
 */
function isStringArray(value) {
    return isArrayOf(value, isString);
}
exports.isStringArray = isStringArray;
/**
 * @template T
 * @param {*} value
 * @param {function(*): boolean} check
 * @return {boolean} whether the provided parameter is a JavaScript Array and each element in the array satisfies the provided type guard.
 */
function isArrayOf(value, check) {
    return Array.isArray(value) && (/** @type {!Array<?>} */ (value)).every(check);
}
exports.isArrayOf = isArrayOf;
/**
 * @param {*} obj
 * @return {boolean} whether the provided parameter is of type `object` but **not**
 * 	`null`, an `array`, a `regexp`, nor a `date`.
 */
function isObject(obj) {
    // The method can't do a type cast since there are type (like strings) which
    // are subclasses of any put not positvely matched by the function. Hence type
    // narrowing results in wrong results.
    return typeof obj === 'object'
        && obj !== null
        && !Array.isArray(obj)
        && !(obj instanceof RegExp)
        && !(obj instanceof Date);
}
exports.isObject = isObject;
/**
 * @param {*} obj
 * @return {boolean} whether the provided parameter is of type `Buffer` or Uint8Array dervived type
 */
function isTypedArray(obj) {
    /** @type {?} */
    const TypedArray = Object.getPrototypeOf(Uint8Array);
    return typeof obj === 'object'
        && obj instanceof TypedArray;
}
exports.isTypedArray = isTypedArray;
/**
 * In **contrast** to just checking `typeof` this will return `false` for `NaN`.
 * @param {*} obj
 * @return {boolean} whether the provided parameter is a JavaScript Number or not.
 */
function isNumber(obj) {
    return (typeof obj === 'number' && !isNaN(obj));
}
exports.isNumber = isNumber;
/**
 * @template T
 * @param {*} obj
 * @return {boolean} whether the provided parameter is an Iterable, casting to the given generic
 */
function isIterable(obj) {
    // eslint-disable-next-line local/code-no-any-casts
    return !!obj && typeof ((/** @type {?} */ (obj)))[Symbol.iterator] === 'function';
}
exports.isIterable = isIterable;
/**
 * @template T
 * @param {*} obj
 * @return {boolean} whether the provided parameter is an Iterable, casting to the given generic
 */
function isAsyncIterable(obj) {
    // eslint-disable-next-line local/code-no-any-casts
    return !!obj && typeof ((/** @type {?} */ (obj)))[Symbol.asyncIterator] === 'function';
}
exports.isAsyncIterable = isAsyncIterable;
/**
 * @param {*} obj
 * @return {boolean} whether the provided parameter is a JavaScript Boolean or not.
 */
function isBoolean(obj) {
    return (obj === true || obj === false);
}
exports.isBoolean = isBoolean;
/**
 * @param {*} obj
 * @return {boolean} whether the provided parameter is undefined.
 */
function isUndefined(obj) {
    return (typeof obj === 'undefined');
}
exports.isUndefined = isUndefined;
/**
 * @template T
 * @param {(undefined|null|T)} arg
 * @return {boolean} whether the provided parameter is defined.
 */
function isDefined(arg) {
    return !isUndefinedOrNull(arg);
}
exports.isDefined = isDefined;
/**
 * @param {*} obj
 * @return {boolean} whether the provided parameter is undefined or null.
 */
function isUndefinedOrNull(obj) {
    return (isUndefined(obj) || obj === null);
}
exports.isUndefinedOrNull = isUndefinedOrNull;
/**
 * @param {*} condition
 * @param {(undefined|string)=} type
 * @return {void}
 */
function assertType(condition, type) {
    if (!condition) {
        throw new Error(type ? `Unexpected type, expected '${type}'` : 'Unexpected type');
    }
}
exports.assertType = assertType;
/**
 * Asserts that the argument passed in is neither undefined nor null.
 *
 * @see {\@link assertDefined} for a similar utility that leverages TS assertion functions to narrow down the type of `arg` to be non-nullable.
 * @template T
 * @param {(undefined|null|T)} arg
 * @return {T}
 */
function assertReturnsDefined(arg) {
    (0, assert_1.assert)(arg !== null && arg !== undefined, 'Argument is `undefined` or `null`.');
    return arg;
}
exports.assertReturnsDefined = assertReturnsDefined;
/**
 * Asserts that a provided `value` is `defined` - not `null` or `undefined`,
 * throwing an error with the provided error or error message, while also
 * narrowing down the type of the `value` to be `NonNullable` using TS
 * assertion functions.
 *
 * @throws if the provided `value` is `null` or `undefined`.
 *
 * ## Examples
 *
 * ```typescript
 * // an assert with an error message
 * assertDefined('some value', 'String constant is not defined o_O.');
 *
 * // `throws!` the provided error
 * assertDefined(null, new Error('Should throw this error.'));
 *
 * // narrows down the type of `someValue` to be non-nullable
 * const someValue: string | undefined | null = blackbox();
 * assertDefined(someValue, 'Some value must be defined.');
 * console.log(someValue.length); // now type of `someValue` is `string`
 * ```
 *
 * @see {\@link assertReturnsDefined} for a similar utility but without assertion. / {\@link https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions typescript-3-7.html#assertion-functions}
 * @template T
 * @param {T} value
 * @param {(string|!Error)} error
 * @return {void}
 */
function assertDefined(value, error) {
    if (value === null || value === undefined) {
        /** @type {!Error} */
        const errorToThrow = typeof error === 'string' ? new Error(error) : error;
        throw errorToThrow;
    }
}
exports.assertDefined = assertDefined;
/**
 * @param {...*} args
 * @return {!Array<*>}
 */
function assertReturnsAllDefined(...args) {
    /** @type {!Array<?>} */
    const result = [];
    for (let i = 0; i < args.length; i++) {
        /** @type {*} */
        const arg = args[i];
        if (isUndefinedOrNull(arg)) {
            throw new Error(`Assertion Failed: argument at index ${i} is undefined or null`);
        }
        result.push(arg);
    }
    return result;
}
exports.assertReturnsAllDefined = assertReturnsAllDefined;
/**
 * Checks if the provided value is one of the vales in the provided list.
 *
 * ## Examples
 *
 * ```typescript
 * // note! item type is a `subset of string`
 * type TItem = ':' | '.' | '/';
 *
 * // note! item is type of `string` here
 * const item: string = ':';
 * // list of the items to check against
 * const list: TItem[] = [':', '.'];
 *
 * // ok
 * assert(
 *   isOneOf(item, list),
 *   'Must succeed.',
 * );
 *
 * // `item` is of `TItem` type now
 * ```
 * @type {function(?, !ReadonlyArray<?>): boolean}
 */
exports.isOneOf = (/**
 * @template TType, TSubtype
 * @param {?} value
 * @param {!ReadonlyArray<?>} validValues
 * @return {boolean}
 */
(value, validValues) => {
    // note! it is OK to type cast here, because we rely on the includes
    //       utility to check if the value is present in the provided list
    return validValues.includes((/** @type {?} */ (value)));
});
/**
 * Compile-time type check of a variable.
 * @template T
 * @param {T} _thing
 * @return {void}
 */
function typeCheck(_thing) { }
exports.typeCheck = typeCheck;
/** @type {function((string|number|symbol)): boolean} */
const hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * @param {*} obj
 * @return {boolean} whether the provided parameter is an empty JavaScript Object or not.
 */
function isEmptyObject(obj) {
    if (!isObject(obj)) {
        return false;
    }
    for (const key in obj) {
        if (hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
}
exports.isEmptyObject = isEmptyObject;
/**
 * @param {*} obj
 * @return {boolean} whether the provided parameter is a JavaScript Function or not.
 */
function isFunction(obj) {
    return (typeof obj === 'function');
}
exports.isFunction = isFunction;
/**
 * @param {...*} objects
 * @return {boolean} whether the provided parameters is are JavaScript Function or not.
 */
function areFunctions(...objects) {
    return objects.length > 0 && objects.every(isFunction);
}
exports.areFunctions = areFunctions;
/** @typedef {(string|!Function)} */
exports.TypeConstraint;
/**
 * @param {!Array<*>} args
 * @param {!Array<(undefined|string|!Function)>} constraints
 * @return {void}
 */
function validateConstraints(args, constraints) {
    /** @type {number} */
    const len = Math.min(args.length, constraints.length);
    for (let i = 0; i < len; i++) {
        validateConstraint(args[i], constraints[i]);
    }
}
exports.validateConstraints = validateConstraints;
/**
 * @param {*} arg
 * @param {(undefined|string|!Function)} constraint
 * @return {void}
 */
function validateConstraint(arg, constraint) {
    if (isString(constraint)) {
        if (typeof arg !== constraint) {
            throw new Error(`argument does not match constraint: typeof ${constraint}`);
        }
    }
    else if (isFunction(constraint)) {
        try {
            if (arg instanceof constraint) {
                return;
            }
        }
        catch {
            // ignore
        }
        // eslint-disable-next-line local/code-no-any-casts
        if (!isUndefinedOrNull(arg) && ((/** @type {?} */ (arg))).constructor === constraint) {
            return;
        }
        if ((/** @type {!Function} */ (constraint)).length === 1 && (/** @type {!Function} */ (constraint)).call(undefined, arg) === true) {
            return;
        }
        throw new Error(`argument does not match one of these constraints: arg instanceof constraint, arg.constructor === constraint, nor constraint(arg) === true`);
    }
}
exports.validateConstraint = validateConstraint;
/**
 * Helper type assertion that safely upcasts a type to a supertype.
 *
 * This can be used to make sure the argument correctly conforms to the subtype while still being able to pass it
 * to contexts that expects the supertype.
 * @template Base, Sub
 * @param {Sub} x
 * @return {Base}
 */
function upcast(x) {
    return x;
}
exports.upcast = upcast;
/** @typedef {?} */
var AddFirstParameterToFunction;
/**
 * Allows to add a first parameter to functions of a type.
 * @typedef {?}
 */
exports.AddFirstParameterToFunctions;
/**
 * Given an object with all optional properties, requires at least one to be defined.
 * i.e. AtLeastOne<MyObject>;
 * @typedef {?}
 */
exports.AtLeastOne;
/**
 * Only picks the non-optional properties of a type.
 * @typedef {?}
 */
exports.OmitOptional;
/**
 * A type that removed readonly-less from all properties of `T`
 * @typedef {?}
 */
exports.Mutable;
/**
 * A type that adds readonly to all properties of T, recursively.
 * @typedef {?}
 */
exports.DeepImmutable;
/**
 * A single object or an array of the objects.
 * @typedef {(?|!Array<?>)}
 */
exports.SingleOrMany;
/**
 * Given a `type X = { foo?: string }` checking that an object `satisfies X`
 * will ensure each property was explicitly defined, ensuring no properties
 * are omitted or forgotten.
 * @typedef {?}
 */
exports.WithDefinedProps;
/**
 * A type that recursively makes all properties of `T` required
 * @typedef {?}
 */
exports.DeepRequiredNonNullable;
/**
 * Represents a type that is a partial version of a given type `T`, where all properties are optional and can be deeply nested.
 * @typedef {?}
 */
exports.DeepPartial;
/**
 * Represents a type that is a partial version of a given type `T`, except a subset.
 * @typedef {?}
 */
exports.PartialExcept;
/** @typedef {?} */
var KeysOfUnionType;
/** @typedef {?} */
var FilterType;
/** @typedef {?} */
var MakeOptionalAndTrue;
/**
 * Type guard that checks if an object has specific keys and narrows the type accordingly.
 *
 * \@example
 * ```typescript
 * type A = { a: string };
 * type B = { b: number };
 * const obj: A | B = getObject();
 *
 * if (hasKey(obj, { a: true })) {
 *   // obj is now narrowed to type A
 *   console.log(obj.a);
 * }
 * ```
 * @template T, TKeys
 * @param {T} x - The object to check
 * @param {TKeys} key - An object with boolean values indicating which keys to check for
 * @return {boolean} true if all specified keys exist in the object, false otherwise
 *
 */
function hasKey(x, key) {
    for (const k in key) {
        if (!(k in x)) {
            return false;
        }
    }
    return true;
}
exports.hasKey = hasKey;
