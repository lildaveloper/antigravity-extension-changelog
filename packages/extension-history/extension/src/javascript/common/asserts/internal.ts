/**
 * @fileoverview Internal details of the Guards & Asserts library.
 * Generated from: javascript/common/asserts/internal.ts
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
goog.module('google3.javascript.common.asserts.internal');
var module = module || { id: 'javascript/common/asserts/internal.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_enable_goog_asserts_1 = goog.requireType("google3.javascript.common.asserts.enable_goog_asserts");
const enable_goog_asserts_1 = goog.require('google3.javascript.common.asserts.enable_goog_asserts');
///
/// PUBLIC: These types and symbols form part of the public G&A API.
///
/**
 * @define {boolean} Whether assertions are enabled. Note that some assertion framework
 *     methods (prodAssert, prodCast) deliberately ignore this flag to allow for
 *     complex use-cases (e.g. library maintainers that need these checks to
 *     persist in production builds for security reasons).
 *
 * Considering setting this define to true for a production build? Please
 * carefully read over go/guards-and-assertions#production-vs-debug-builds and
 * reach out to tsjs-libraries-eng\@ for advice before doing so.
 */
exports.ENABLE_ASSERTS = goog.define('closure.core.ENABLE_ASSERTS', enable_goog_asserts_1.ENABLE_GOOG_ASSERTS);
/**
 * A StateGuard encapsulates runtime verification and debugging logic into a
 * single instance that can be run in both debug-only code (e.g. when used with
 * `assert`) as well as production code (e.g. when used with `prodAssert` or
 * called directly).
 *
 * New StateGuards are defined using the `defineStateGuard` function. Please
 * review pre-existing state guards (in ./guards.ts). If you would like to
 * suggest or contribute a generally useful state guard to this library, feel
 * free to send a CL or a proposal via go/tsjs-api-review.
 *
 * StateGuards are contravariant meaning that a variable of type
 * `StateGuard<Super>` is assignable to `StateGuard<Sub>` (where `Sub` extends
 * `Super`) though not the other way around. This implies that a variable of
 * type `StateGuard<unknown>` (including `TypeGuard<T>`) is assignable to
 * `StateGuard<A>` for any `A`.
 * @record
 * @template A
 */
function StateGuard() { }
exports.StateGuard = StateGuard;
/* istanbul ignore if */
if (false) {
    /* Skipping unnamed member:
    [pleaseCreateWithDefineGuardFunction]: never;*/
    /* Skipping unhandled member: (arg: A): boolean;*/
}
/**
 * A TypeGuard encapsulates runtime type-checking and debugging logic into a
 * single instance that can be re-used among the various assertion framework
 * functions.
 *
 * New TypeGuards are defined using the `defineTypeGuard` function, but users of
 * the assertion framework are strongly encouraged to instead re-use existing
 * TypeGuard definitions (in ./guards.ts) where possible.
 *
 * TypeGuards are invariant meaning that variables of type `TypeGuard<Super>`
 * and `TypeGuard<Sub>` (where `Sub` extends `Super`) are not assignable to each
 * other.
 * @record
 * @template T
 */
function TypeGuard() { }
exports.TypeGuard = TypeGuard;
/* istanbul ignore if */
if (false) {
    /* Skipping unnamed member:
    [pleaseCreateWithDefineGuardFunction]: never;*/
    /* Skipping unhandled member: (x: unknown): x is T;*/
}
/**
 * Context is created exclusively by the assertion framework in order to record
 * debugging context when guards fail, and is used when defining custom guards.
 * @record
 */
function Context() { }
exports.Context = Context;
/* istanbul ignore if */
if (false) {
    /* Skipping unnamed member:
    [contextCreatedByFramework]: never;*/
}
/**
 * Debug versions of guard and context are deliberately internal-only to avoid
 * usage outside the asserts package accidentally un-doing the compiler
 * optimizations that remove debugging information from the guards.
 * @record
 * @extends {TypeGuard}
 */
function DebugGuard() { }
exports.DebugGuard = DebugGuard;
/* istanbul ignore if */
if (false) {
    /* Skipping unhandled member: (x: unknown, context: DebugContext): boolean;*/
    /**
     * A function returning a human-readable name for the type this guard is
     * validating. To use this information when defining a custom higher-order
     * Guard, use the `guardName` function.
     *
     * This function is called by the assertion framework if guards fail, and is
     * only available in debugging contexts (e.g. as part of constructing the
     * `guardType` parameter in the `defineTypeGuard` factory function, or
     * otherwise guarded by `goog.DEBUG`. This method is not defined when
     * `goog.DEBUG` is false).
     * @public
     * @return {string}
     */
    DebugGuard.prototype.guardName = function () { };
}
/**
 * DebugContext is the underlying type of Contexts when in debug builds, and is
 * intended for manipulation only via assertion framework methods. DebugContext
 * will be undefined in the case that a guard is called directly (not via the
 * assertion framework top-level functions) in debug mode (where the external
 * method signature only allows the argument to check against, and does not
 * allow providing a context).
 * @typedef {(undefined|?)}
 */
exports.DebugContext;
/**
 * Type used exclusively to identify a guard at runtime. Does not distinguish
 * between TypeGuard and StateGuard as they are identical at runtime.
 * @record
 */
function BrandedGuard() { }
exports.BrandedGuard = BrandedGuard;
/* istanbul ignore if */
if (false) {
    /**
     * @type {boolean}
     * @public
     */
    BrandedGuard.prototype.isGuard_doNotManuallySetPrettyPlease;
}
/**
 * Converts the given `arg` to a string. May only be called in debug-mode so
 * calls to this method should be gated by `goog.DEBUG`.
 * @param {*} arg
 * @param {!Set<*>=} seenSet
 * @return {string}
 */
function basicPrettyPrint(arg, seenSet = new Set()) {
    if (!goog.DEBUG) {
        throw new Error('basicPrettyPrint should only be used in DEBUG mode');
    }
    if (seenSet.has(arg)) {
        return '(Recursive reference)';
    }
    switch (typeof arg) {
        case 'object':
            if (arg) {
                /** @type {?} */
                const prototype = Object.getPrototypeOf(arg);
                switch (prototype) {
                    case Map.prototype:
                    case Set.prototype:
                    case Array.prototype: {
                        seenSet.add(arg);
                        /** @type {string} */
                        let val = `[${Array.from((/** @type {!Iterable<*, ?, ?>} */ (arg)), (/**
                         * @param {*} a
                         * @return {string}
                         */
                        (a) => basicPrettyPrint(a, seenSet))).join(', ')}]`;
                        seenSet.delete(arg);
                        if (prototype !== Array.prototype) {
                            /** @type {string} */
                            const name = functionName(prototype.constructor);
                            val = `${name}(${val})`;
                        }
                        return val;
                    }
                    case Object.prototype: {
                        seenSet.add(arg);
                        /** @type {string} */
                        const val = `{${Object.entries(arg)
                            .map((/**
                         * @param {!Array<?>} __0
                         * @return {string}
                         */
                        ([key__tsickle_destructured_1, value__tsickle_destructured_2]) => {
                            let key = /** @type {string} */ (key__tsickle_destructured_1);
                            let value = /** @type {?} */ (value__tsickle_destructured_2);
                            return (`${key}: ${basicPrettyPrint(value, seenSet)}`);
                        }))
                            .join(', ')}}`;
                        seenSet.delete(arg);
                        return val;
                    }
                    default: {
                        /** @type {string} */
                        let name = 'Object';
                        if (prototype && prototype.constructor) {
                            name = functionName(prototype.constructor);
                        }
                        if (typeof (/** @type {!Object} */ (arg)).toString === 'function' &&
                            (/** @type {!Object} */ (arg)).toString !== Object.prototype.toString) {
                            /** @type {string} */
                            const val = String(arg);
                            return `${name}(${val})`;
                        }
                        return `(object ${name})`;
                    }
                }
            }
            // break out to json stringify.
            break;
        case 'function':
            /** @type {string} */
            const name = functionName(arg);
            return `function ${name}`;
        case 'number':
            if (!Number.isFinite(arg)) {
                return String(arg);
            }
            // break out to json stringify.
            break;
        case 'bigint':
            return `${(/** @type {bigint} */ (arg)).toString(10)}n`;
        case 'symbol':
            return (/** @type {symbol} */ (arg)).toString();
        default:
        // passthrough
    }
    return JSON.stringify(arg);
}
exports.basicPrettyPrint = basicPrettyPrint;
/**
 * @param {!Function} f The function's name to print.
 * @return {string}
 */
function functionName(f) {
    /** @type {*} */
    const displayName = ((/** @type {!FunctionWithDisplayName} */ (f))).displayName;
    if (displayName && typeof displayName === 'string')
        return displayName;
    /** @type {string} */
    const fnName = f.name;
    if (fnName && typeof fnName === 'string')
        return fnName;
    // Very old browsers don't support Function#name, or Function#name can
    // sometimes be undefined (e.g. delete the property from both the instance and
    // the Function prototype). As a last-ditch attempt, try and heuristically
    // retrieve it from the stringified function.
    // 'Anonymous' isn't always a good fallback value, but for actual anonymous
    // functions there is no other way to get a name, so it will just have to
    // suffice.
    /** @type {string} */
    const functionSource = String(f);
    /** @type {(null|!RegExpExecArray)} */
    const nameMatch = /function\s+([^\(]+)/m.exec(functionSource);
    return nameMatch ? nameMatch[1] : '(Anonymous)';
}
exports.functionName = functionName;
/**
 * Defines an options-bag with the if/else branch types for conditional types.
 *
 * ```ts
 * type IsAwesome<T, R extends Result> = T extends Awesome ? R['Y'] : R['N'];
 * type Usage = IsAwesome<SomeClass, {Y: true, N: false}>;
 * ```
 * @record
 */
function Result() { }
exports.Result = Result;
/* istanbul ignore if */
if (false) {
    /**
     * The type returned by the generic type if the check passes.
     * @type {*}
     * @public
     */
    Result.prototype.Y;
    /**
     * The type returned by the generic type if the check fails.
     * @type {*}
     * @public
     */
    Result.prototype.N;
}
/**
 * Represents any guard. Not to be confused with `isAnyOf`.
 * @typedef {!StateGuard<?>}
 */
exports.AnyGuard;
/**
 * Represents any type guard. Not to be confused with `isAnyOf`.
 * @typedef {!TypeGuard<?>}
 */
exports.AnyTypeGuard;
/**
 * Ensures a given value T is a distinict non-union literal or enum value.
 * @typedef {?}
 */
exports.IsValidLiteral;
/**
 * Ensures a single number literal or a numeric number enum value.
 * @typedef {?}
 */
var IsNumberLiteral;
/**
 * Ensures a single literal value.
 * @typedef {?}
 */
var IsLiteral;
/**
 * Given type `E`, if `E` is a type union (e.g., `null | undefined`), returns
 * `Y`, otherwise `N`.
 * @typedef {?}
 */
exports.IsUnion;
/**
 * Determines whether `E` is exactly `string` (i.e., is _all_ strings) or if `E`
 * defines some specific strings.
 * @typedef {?}
 */
exports.IsExactlyString;
/**
 * Determines whether `E` is exactly `number` (i.e., is _all_ numbers) or if `E`
 * defines some specific numbers.
 *
 * Implemented by intersecting two indexed types. Explained visually as follows:
 *
 * If `E` is exactly `number`:
 * ```
 * true extends ({[key: number]: true} & {[K in number]: false})[number]
 * true extends ({[key: number]: true} & {[key: number]: false})[number]
 * true extends ({[key: number]: true & false})[number]
 * true extends ({[key: number]: never})[number]
 * true extends never  // false so resolves to Y
 * ```
 *
 * And, if we start with a numeric enum, say `MyEnum` with vals `ONE` and `TWO`,
 * `E` is `MyEnum.ONE = 1 | MyEnum.TWO = 2`:
 * ```
 * true extends ({[key: number]: true} & {[K in (1 | 2)]: false})[number]
 * true extends ({[key: number]: true} & {[1]: false, [2]: false})[number]
 * true extends ({[key: number]: true, [1]: false, [2]: false})[number]      {1}
 * true extends true  // true so resolves to N                               {2}
 *
 * {1} This type is invalid on its own but OK when intersecting. Try entering
 *     `type BadType = {[key: number]: true, [1]: false}` and
 *     `type OkType  = {[key: number]: true} & {[1]: false}` in go/ersatz.
 * {2} We specifically read from `[key: number]` so get `true`. If, above, we
 *     replaced `[number]` with `[1]`, we would get `false` instead. Try:
 *     `type False = ({[key: number]: true} & {[1]: false})[1]`.
 * ```
 *
 * This hack comes from go/tissue/26362 and is required because normally all
 * numbers are assignable to numeric enums (which doesn't make a lot of sense,
 * generally).
 * @typedef {?}
 */
exports.IsExactlyNumber;
/**
 * Represents an optional value that can be T or undefined.
 * @typedef {?}
 */
exports.OptionalTypeGuard;
/**
 * "Guard" (i.e. not a G&A Guard but a raw type predicate) for
 * `OptionalTypeGuard`.
 * @template T
 * @param {!TypeGuard<(undefined|T)>} guard
 * @return {boolean}
 */
function isOptionalGuard(guard) {
    return (((/** @type {?} */ (guard)))
        .isOptionalGuard_doNotManuallySetPrettyPlease === true);
}
exports.isOptionalGuard = isOptionalGuard;
