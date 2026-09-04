/**
 * @fileoverview The asserts module provides various top-level functions to make
 * complex type assertions and type casts easier in TypeScript.
 * Generated from: javascript/common/asserts/asserts.ts
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
goog.module('google3.javascript.common.asserts.asserts');
var module = module || { id: 'javascript/common/asserts/asserts.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_internal_1 = goog.requireType("google3.javascript.common.asserts.internal");
const internal_1 = goog.require('google3.javascript.common.asserts.internal');
/** @typedef {!tsickle_internal_1.Context} */
exports.Context; // re-export typedef
/** @typedef {!tsickle_internal_1.StateGuard} */
exports.StateGuard; // re-export typedef
/** @typedef {!tsickle_internal_1.TypeGuard} */
exports.TypeGuard; // re-export typedef
/**
 * A `LazyMsg` is a custom error message as either a string or a `LazyMsgFunc`.
 * @typedef {(string|function(): string)}
 */
exports.LazyMsg;
/**
 * A function that returns a custom error message. Called only when the message
 * is needed (the assertion has failed).
 * @typedef {function(): string}
 */
exports.LazyMsgFunc;
/**
 * A ProdLazyMsg is similar to a LazyMsg, but also allows passing in the return
 * values from the `keepInProd` function. This type is only accepted by the
 * prod* top-level functions.
 *
 * See the documentation on `keepInProd` for more information.
 * @typedef {(string|function(): string|!RetainedMessage)}
 */
exports.ProdLazyMsg;
/**
 * `keepInProd` stashes the provided `LazyMsg` to later produce custom error
 * messages when throwing assertion errors. Ensures the custom error message is
 * not removed by the compiler.
 *
 * This function is intentionally limited in its capability: the only intended
 * use-case is to **directly** pass the value returned into a prod* variant
 * function call. Do not store and pass around these returned values. See
 * go/guards-and-assertions#custom-error-messages-in-production for more
 * information.
 * @param {(string|function(): string)} leakedString
 * @return {!RetainedMessage}
 */
function keepInProd(leakedString) {
    prodAssertTruthy(!keepInProdMsg, 'keepInProd must only be called directly as the `msg` param in `prod*` functions');
    keepInProdMsg = new RetainedMessage(leakedString);
    return (/** @type {!RetainedMessage} */ ((/** @type {*} */ (undefined))));
}
exports.keepInProd = keepInProd;
/**
 * @param {*} arg
 * @param {!tsickle_internal_1.StateGuard<?>} guard
 * @param {(undefined|string|function(): string)=} msg
 * @return {void}
 */
function assert(arg, guard, msg) {
    if (internal_1.ENABLE_ASSERTS)
        prodAssert(arg, guard, msg);
}
exports.assert = assert;
/**
 * @param {*} arg
 * @param {!tsickle_internal_1.StateGuard<?>} guard
 * @param {(undefined|string|function(): string|!RetainedMessage)=} msg
 * @return {void}
 */
function prodAssert(arg, guard, msg) {
    // Note: This has side-effects and _must_ be called every time.
    /** @type {(undefined|!RetainedMessage)} */
    const keepInProdMsgFunc = maybeGetKeepInProdMsgFunc();
    /// Compiled & optimized codepath.
    if (!goog.DEBUG) {
        // "Happy path". `guard` is satisfied with `arg` so bail.
        if (guard(arg))
            return;
        /** @type {string} */
        const extraMsg = formatLazyMsg(keepInProdMsgFunc)?.concat('\n') ?? '';
        throw new Error(extraMsg + String(arg));
    }
    /// Debug codepath.
    /** @type {?} */
    const context = (/** @type {?} */ (((/** @type {(undefined|?)} */ ((/** @type {!Array<string>} */ ([])))))));
    // "Happy path". `guard` is satisfied with `arg` so bail.
    if (executeNestedGuard(guard, arg, context))
        return;
    throwGuardFailure(msg, keepInProdMsgFunc, `Guard ${guardName(guard)} failed:`, ...context.reverse());
}
exports.prodAssert = prodAssert;
/**
 * @template T
 * @param {*} arg
 * @param {!tsickle_internal_1.TypeGuard<T>} guard
 * @param {(undefined|string|function(): string)=} msg
 * @return {T}
 */
function cast(arg, guard, msg) {
    assert(arg, guard, msg);
    return arg;
}
exports.cast = cast;
/**
 * @template T
 * @param {*} arg
 * @param {!tsickle_internal_1.TypeGuard<T>} guard
 * @param {(undefined|string|function(): string|!RetainedMessage)=} msg
 * @return {T}
 */
function prodCast(arg, guard, msg) {
    prodAssert(arg, guard, msg);
    return arg;
}
exports.prodCast = prodCast;
/** @typedef {symbol} */
var PrivateAnySymbolIsolator;
/**
 * Asserts the given argument. If the argument is falsy, an error is thrown.
 *
 * The assertion is compiled out when `ENABLE_ASSERTS` is false.
 * @param {*} arg The argument to assert on.
 * @param {(undefined|string|function(): string)=} msg An optional custom error message used in debug builds.
 * @return {void}
 */
function assertTruthy(arg, msg) {
    if (internal_1.ENABLE_ASSERTS)
        prodAssertTruthy(arg, msg);
}
exports.assertTruthy = assertTruthy;
/**
 * See `assertTruthy`. The assertion is NOT compiled out even if
 * `ENABLE_ASSERTS` is false. Use with caution.
 * @param {*} arg The argument to assert on.
 * @param {(undefined|string|function(): string|!RetainedMessage)=} msg Unless wrapped in `keepInProd`, compiled out entirely in
 *     production builds.
 * @return {void}
 */
function prodAssertTruthy(arg, msg) {
    // Note: This has side-effects and _must_ be called every time.
    /** @type {(undefined|!RetainedMessage)} */
    const keepInProdMsgFunc = maybeGetKeepInProdMsgFunc();
    /// "Happy path". `arg` is truthy so bail.
    if (arg)
        return;
    /// Compiled & optimized codepath.
    if (!goog.DEBUG) {
        throw new Error(formatLazyMsg(keepInProdMsgFunc) || String(arg));
    }
    /// Debug codepath.
    throwGuardFailure('Guard truthy failed:', msg || keepInProdMsgFunc || `Expected truthy, got ${(0, internal_1.basicPrettyPrint)(arg)}`);
}
exports.prodAssertTruthy = prodAssertTruthy;
/**
 * `castTruthy` will throw an error if the argument is falsy and otherwise
 * return the argument given with the return value's type narrowed as
 * non-nullable. Explicitly, an error will be thrown if the argument is `null`,
 * `undefined`, `0`, `-0`, `NaN`, or the empty string.
 *
 * Only use `castTruthy` when you need to treat a falsy primitive as invalid and
 * directly use the non-nullable arg result in an expression. `castExists` and
 * `assertTruthy` are preferred otherwise.
 *
 * The assertion is compiled out when `ENABLE_ASSERTS` is false.
 * \@checkReturnValue
 * @template A
 * @param {A} arg
 * @param {(undefined|string|function(): string)=} msg An optional custom error message used in debug builds.
 * @return {?}
 */
function castTruthy(arg, msg) {
    assertTruthy(arg, msg);
    return (/** @type {?} */ (arg));
}
exports.castTruthy = castTruthy;
/**
 * See `castTruthy`. The assertion is NOT compiled out (when `ENABLE_ASSERTS` is
 * false). Use with caution.
 * \@checkReturnValue
 * @template A
 * @param {A} arg
 * @param {(undefined|string|function(): string|!RetainedMessage)=} msg Unless wrapped in `keepInProd`, compiled out entirely in
 *     production builds.
 * @return {?}
 */
function prodCastTruthy(arg, msg) {
    prodAssertTruthy(arg, msg);
    return (/** @type {?} */ (arg));
}
exports.prodCastTruthy = prodCastTruthy;
/**
 * `assertExists` asserts the argument is neither null nor undefined.
 *
 * The assertion is compiled out when `ENABLE_ASSERTS` is false.
 * @template A
 * @param {A} arg The argument to assert on.
 * @param {(undefined|string|function(): string)=} msg An optional custom error message used in debug builds.
 * @return {void}
 */
function assertExists(arg, msg) {
    assert(arg, exists, msg);
}
exports.assertExists = assertExists;
/**
 * See `assertExists`. The assertion is NOT compiled out (when `ENABLE_ASSERTS`
 * is false). Use with caution.
 * @template A
 * @param {A} arg The argument to assert on.
 * @param {(undefined|string|function(): string|!RetainedMessage)=} msg Unless wrapped in `keepInProd`, compiled out entirely in
 *     production builds.
 * @return {void}
 */
function prodAssertExists(arg, msg) {
    prodAssert(arg, exists, msg);
}
exports.prodAssertExists = prodAssertExists;
/**
 * `castExists` will throw an error if the argument is either null or undefined,
 * and otherwise return the argument given.
 *
 * Note that this will _not_ throw an error if falsy values are provided (e.g.,
 * 0 and the empty string). For that behavior, use `castTruthy`.
 *
 * The assertion is compiled out when `ENABLE_ASSERTS` is false.
 * \@checkReturnValue
 * @template A
 * @param {A} arg
 * @param {(undefined|string|function(): string)=} msg An optional custom error message used in debug builds.
 * @return {A}
 */
function castExists(arg, msg) {
    return (/** @type {A} */ (cast(arg, exists, msg)));
}
exports.castExists = castExists;
/**
 * See `castExists`. The assertion is NOT compiled out (when `ENABLE_ASSERTS` is
 * false). Use with caution.
 *
 * Note that this will _not_ throw an error if falsy values are provided (e.g.,
 * empty strings and `0`). For that behavior, use `prodCastTruthy`.
 * \@checkReturnValue
 * @template A
 * @param {A} arg The argument to assert on.
 * @param {(undefined|string|function(): string|!RetainedMessage)=} msg Unless wrapped in `keepInProd`, compiled out entirely in
 *     production builds.
 * @return {A}
 */
function prodCastExists(arg, msg) {
    return (/** @type {A} */ (prodCast(arg, exists, msg)));
}
exports.prodCastExists = prodCastExists;
/**
 * In debug builds, throws an error with an optional custom error message. Call
 * this when your code has entered a code branch which "should never happen"™.
 *
 * The assertion is compiled out when `ENABLE_ASSERTS` is false. In other words,
 * by default in production builds, this will _not_ throw an exception! Use
 * `prodFail` if you need to guarantee a thrown exception in prod builds.
 * @param {(undefined|string|function(): string)=} msg An optional custom error message used in debug builds.
 * @return {?}
 */
function fail(msg) {
    if (internal_1.ENABLE_ASSERTS)
        prodFail(msg);
    return (/** @type {?} */ (undefined));
}
exports.fail = fail;
/**
 * See `fail`. The assertion is NOT compiled out even if `ENABLE_ASSERTS` is
 * false. Use with caution.
 * @param {(undefined|string|function(): string|!RetainedMessage)=} msg Unless wrapped in `keepInProd`, compiled out entirely in
 *     production builds.
 * @return {?}
 */
function prodFail(msg) {
    // Note: This has side-effects and _must_ be called every time.
    /** @type {(undefined|!RetainedMessage)} */
    const keepInProdMsgFunc = maybeGetKeepInProdMsgFunc();
    /// Compiled & optimized codepath.
    if (!goog.DEBUG) {
        throw new Error(formatLazyMsg(keepInProdMsgFunc));
    }
    /// Debug codepath.
    throwGuardFailure('Assertion fail:', msg || keepInProdMsgFunc);
}
exports.prodFail = prodFail;
/**
 * StateGuardFn implements a runtime check to verify the state of an arg.
 * The StateGuardFn is also passed a Context, created and managed by the
 * assertion framework, used for recording debug information. This information
 * (and the parameter) is removed in production builds.
 * @typedef {function(?, !tsickle_internal_1.Context): boolean}
 */
var StateGuardFn;
/**
 * defineStateGuard is a factory function that constructs new StateGuards from
 * the given StateGuardFn and other debugging information. Where possible, avoid
 * using this and instead use the pre-defined guards in ./guards.
 * @template A
 * @param {function(A, !tsickle_internal_1.Context): boolean} stateGuardFn The guard's runtime verification function.
 * @param {(string|function(): string)} guardName A string or a function that returns a name for this guard.
 *     For StateGuards, the general convention is to just use the variable name:
 *     `const isAdjective = defineStateGuard(..., 'isAdjective');`
 *     Used ONLY in debug mode for human-readable error messages and will be
 *     compiled away when `ENABLE_ASSERTS` is false.
 * @return {!tsickle_internal_1.StateGuard<A>}
 */
function defineStateGuard(stateGuardFn, guardName) {
    // Marks a `stateGuardFn` as being a guard to enable `isGuard`.
    ((/** @type {!tsickle_internal_1.BrandedGuard} */ ((/** @type {*} */ (stateGuardFn))))).isGuard_doNotManuallySetPrettyPlease = true;
    if (!goog.DEBUG)
        return (/** @type {!tsickle_internal_1.StateGuard<A>} */ (stateGuardFn));
    /** @type {!tsickle_internal_1.DebugGuard} */
    const debugGuard = (/** @type {!tsickle_internal_1.DebugGuard} */ (stateGuardFn));
    debugGuard.guardName =
        typeof guardName === 'function' ? guardName : (/**
         * @return {string}
         */
        () => guardName);
    return debugGuard;
}
exports.defineStateGuard = defineStateGuard;
/**
 * TypeGuardFn implements the exact runtime checks to determine if arg is really
 * of type T.
 * The TypeGuardFn is also passed a Context, created and managed by the
 * assertion framework, used for recording debug information. This information
 * (and the parameter) is removed in production builds.
 * @typedef {function(*, !tsickle_internal_1.Context): boolean}
 */
var TypeGuardFn;
// Note: We completely re-use defineStateGuard rather than inline a call to it
// to ensure complete dead-code elimination in prod builds.
/**
 * defineTypeGuard is a factory function that constructs new TypeGuards from the
 * given TypeGuardFn and other debugging information. Where possible, avoid
 * using this and instead use the pre-defined guards in ./guards.
 * \@param typeGuardFn The guard's runtime type-checking function. This function
 *     MUST assert exact membership in `T`.
 * \@param guardedTypeName A string or a function that returns the type `T` in
 *     string form as the TypeScript compiler would display it:
 *     `const isXyz = defineTypeGuard((arg: unknown): arg is Xyz {...}, 'Xyz');`
 *     Used ONLY in debug mode for human-readable error messages and will be
 *     compiled away when `ENABLE_ASSERTS` is false.
 * @type {function(function(*, !tsickle_internal_1.Context): boolean, (string|function(): string)): !tsickle_internal_1.TypeGuard<?>}
 */
exports.defineTypeGuard = (/** @type {function(function(*, !tsickle_internal_1.Context): boolean, (string|function(): string)): !tsickle_internal_1.TypeGuard<?>} */ ((/** @type {*} */ (defineStateGuard))));
/**
 * Describes a guard, useful when naming custom higher-order guards. In
 * production builds, this function returns an empty string.
 *
 * For type guards, this is the guarded type (e.g. for `TypeGuard<Foo>`, the
 * guard's name would be "Foo").
 *
 * For state guards, this describes the performed check (e.g. for a
 * `StateGuard<number>` that checks for prime numbers, the guard's name could be
 * "prime").
 * @param {!tsickle_internal_1.StateGuard<?>} guard The guard to describe.
 * @return {string}
 */
// Because StateGuard is contravariant, to accept all guards, we cannot use
// StateGuard<unknown>. We _could_ use StateGuard<never> but that is arguably
// more confusing than StateGuard<any>.
// tslint:disable-next-line:no-any
function guardName(guard) {
    if (!goog.DEBUG)
        return '';
    return ((/** @type {!tsickle_internal_1.DebugGuard} */ (guard))).guardName().trim();
}
exports.guardName = guardName;
/**
 * @param {!tsickle_internal_1.StateGuard<?>} guard
 * @param {*} arg
 * @param {!tsickle_internal_1.Context} context
 * @param {(undefined|string|function(): string)=} contextMsg
 * @return {boolean}
 */
function executeNestedGuard(guard, arg, context, contextMsg) {
    if (!goog.DEBUG)
        return guard(arg);
    /** @type {!tsickle_internal_1.DebugGuard} */
    const debugGuard = (/** @type {!tsickle_internal_1.DebugGuard} */ (guard));
    /** @type {boolean} */
    const guardPassed = debugGuard(arg, (/** @type {(undefined|?)} */ (context)));
    if (!guardPassed) {
        addMessageToContext(context, (/**
         * @return {string}
         */
        () => {
            /** @type {string} */
            let additionalContext = contextMsg
                ? (typeof contextMsg === 'function' ? contextMsg() : contextMsg).trim()
                : '';
            if (additionalContext.length > 0)
                additionalContext += ': ';
            return `${additionalContext}Expected ${guardName(guard)}, got ${(0, internal_1.basicPrettyPrint)(arg)}`;
        }));
    }
    return guardPassed;
}
exports.executeNestedGuard = executeNestedGuard;
/**
 * `addMessageToContext` is a helper function (intended only to be used inside
 * the implementation function of a guard) that adds the given `contextMsg` to
 * the context.
 *
 * Prefer calling `executeNestedGuard` instead where feasible.
 * @param {!tsickle_internal_1.Context} context A testing context. This is created by the assertion framework
 *     and passed to a guard and must be passed along to ensure accurate
 *     debugging information.
 * @param {(string|function(): string)} contextMsg An optional string (or function that will be called) to add
 *     more context to the guard's failure only in debug mode.
 * @return {void}
 */
function addMessageToContext(context, contextMsg) {
    if (!goog.DEBUG)
        return;
    ((/** @type {(undefined|?)} */ (context)))?.push((typeof contextMsg === 'function' ? contextMsg() : contextMsg).trim());
}
exports.addMessageToContext = addMessageToContext;
// Note to maintainers: this type is not exported to discourage incorrect usage
// of the keepInProd function (by storing the returned value into a variable,
// instead of passing it directly into a prod* variant).
class RetainedMessage {
    /**
     * @public
     * @param {(string|function(): string)} msg
     */
    constructor(msg) {
        this.msg = msg;
    }
}
/* istanbul ignore if */
if (false) {
    /**
     * @const {(string|function(): string)}
     * @public
     */
    RetainedMessage.prototype.msg;
}
/**
 * This module local variable stores a function wrapping the value passed to the
 * most recently executed keepInProd function call, and is checked whenever the
 * framework is expected to produce error messages.
 *
 * DO NOT DIRECTLY ACCESS. Use `maybeGetKeepInProdMsgFunc`.
 * @type {(undefined|!RetainedMessage)}
 */
let keepInProdMsg = undefined;
/**
 * If `keepInProd` was called immediately before calling this function, returns
 * a function that, when called, evaluates the most recent `leakedString` passed
 * to a `keepInProd` call. Otherwise, returns undefined.
 *
 * Note: This function purposefully has side effects as it clears
 * `keepInProdMsgFunc` when called.
 * @return {(undefined|!RetainedMessage)}
 */
function maybeGetKeepInProdMsgFunc() {
    /** @type {(undefined|!RetainedMessage)} */
    const localKeepInProdMsg = keepInProdMsg;
    // This is a hack to tell the js compiler that this assignment is dead if
    // `keepInProd` is never called.
    if (localKeepInProdMsg instanceof RetainedMessage) {
        keepInProdMsg = undefined;
    }
    return localKeepInProdMsg;
}
/**
 * @param {(undefined|string|function(): string|!RetainedMessage)} msg
 * @return {(undefined|string)}
 */
function formatLazyMsg(msg) {
    if (msg instanceof RetainedMessage) {
        msg = (/** @type {!RetainedMessage} */ (msg)).msg;
    }
    return typeof msg === 'function' ? msg() : msg;
}
/**
 * Constructs and throws an `Error`. `LazyMsgFunc` parts are called to get the
 * message string. Parts are concatenated with newlines.
 * @param {...(undefined|string|function(): string|!RetainedMessage)} errorMsgParts
 * @return {?}
 */
function throwGuardFailure(...errorMsgParts) {
    throw new Error(errorMsgParts
        .map(formatLazyMsg)
        .filter(Boolean)
        .join('\n')
        .trim()
        .replace(/:$/, ''));
}
/**
 * The exists type guard is an internal guard that checks whether the given
 * argument is neither null nor undefined.
 * @type {!tsickle_internal_1.TypeGuard<*>}
 */
const exists = (0, exports.defineTypeGuard)((/**
 * @param {*} arg
 * @return {boolean}
 */
(arg) => arg !== null && arg !== undefined), 'exists');
