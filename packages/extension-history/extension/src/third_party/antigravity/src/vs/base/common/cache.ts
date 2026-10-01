/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/antigravity/src/vs/base/common/cache.ts
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
goog.module('google3.third_party.antigravity.src.vs.base.common.cache');
var module = module || { id: 'third_party/antigravity/src/vs/base/common/cache.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_cancellation_1 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.cancellation");
const tsickle_lifecycle_2 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.lifecycle");
const cancellation_1 = goog.require('google3.third_party.antigravity.src.vs.base.common.cancellation');
/**
 * @record
 * @template T
 * @extends {tsickle_lifecycle_2.IDisposable}
 */
function CacheResult() { }
exports.CacheResult = CacheResult;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!Promise<T>}
     * @public
     */
    CacheResult.prototype.promise;
}
/**
 * @template T
 */
class Cache {
    /**
     * @public
     * @param {function(?): !Promise<T>} task
     */
    constructor(task) {
        this.task = task;
        this.result = null;
    }
    /**
     * @public
     * @return {!CacheResult<T>}
     */
    get() {
        if (this.result) {
            return this.result;
        }
        /** @type {!tsickle_cancellation_1.CancellationTokenSource} */
        const cts = new cancellation_1.CancellationTokenSource();
        /** @type {!Promise<T>} */
        const promise = this.task(cts.token);
        this.result = {
            promise,
            dispose: (/**
             * @return {void}
             */
            () => {
                this.result = null;
                cts.cancel();
                cts.dispose();
            })
        };
        return this.result;
    }
}
exports.Cache = Cache;
/* istanbul ignore if */
if (false) {
    /**
     * @type {(null|!CacheResult<T>)}
     * @private
     */
    Cache.prototype.result;
    /**
     * @type {function(?): !Promise<T>}
     * @private
     */
    Cache.prototype.task;
}
/**
 * @template T
 * @param {T} t
 * @return {T}
 */
function identity(t) {
    return t;
}
exports.identity = identity;
/**
 * @record
 * @template TArg
 */
function ICacheOptions() { }
/* istanbul ignore if */
if (false) {
    /**
     * The cache key is used to identify the cache entry.
     * Strict equality is used to compare cache keys.
     * @type {function(TArg): *}
     * @public
     */
    ICacheOptions.prototype.getCacheKey;
}
/**
 * Uses a LRU cache to make a given parametrized function cached.
 * Caches just the last key/value.
 * @template TArg, TComputed
 */
class LRUCachedFunction {
    /**
     * @public
     * @param {(!ICacheOptions<TArg>|function(TArg): TComputed)} arg1
     * @param {(undefined|function(TArg): TComputed)=} arg2
     */
    constructor(arg1, arg2) {
        this.lastCache = undefined;
        this.lastArgKey = undefined;
        if (typeof arg1 === 'function') {
            this._fn = arg1;
            this._computeKey = identity;
        }
        else {
            this._fn = (/** @type {function(TArg): TComputed} */ (arg2));
            this._computeKey = (/** @type {!ICacheOptions<TArg>} */ (arg1)).getCacheKey;
        }
    }
    /**
     * @public
     * @param {TArg} arg
     * @return {TComputed}
     */
    get(arg) {
        /** @type {*} */
        const key = this._computeKey(arg);
        if (this.lastArgKey !== key) {
            this.lastArgKey = key;
            this.lastCache = this._fn(arg);
        }
        return (/** @type {TComputed} */ (this.lastCache));
    }
}
exports.LRUCachedFunction = LRUCachedFunction;
/* istanbul ignore if */
if (false) {
    /**
     * @type {(undefined|TComputed)}
     * @private
     */
    LRUCachedFunction.prototype.lastCache;
    /**
     * @type {*}
     * @private
     */
    LRUCachedFunction.prototype.lastArgKey;
    /**
     * @const {function(TArg): TComputed}
     * @private
     */
    LRUCachedFunction.prototype._fn;
    /**
     * @const {function(TArg): *}
     * @private
     */
    LRUCachedFunction.prototype._computeKey;
}
/**
 * Uses an unbounded cache to memoize the results of the given function.
 * @template TArg, TComputed
 */
class CachedFunction {
    /**
     * @public
     * @return {!ReadonlyMap<TArg, TComputed>}
     */
    get cachedValues() {
        return this._map;
    }
    /**
     * @public
     * @param {(!ICacheOptions<TArg>|function(TArg): TComputed)} arg1
     * @param {(undefined|function(TArg): TComputed)=} arg2
     */
    constructor(arg1, arg2) {
        this._map = new Map();
        this._map2 = new Map();
        if (typeof arg1 === 'function') {
            this._fn = arg1;
            this._computeKey = identity;
        }
        else {
            this._fn = (/** @type {function(TArg): TComputed} */ (arg2));
            this._computeKey = (/** @type {!ICacheOptions<TArg>} */ (arg1)).getCacheKey;
        }
    }
    /**
     * @public
     * @param {TArg} arg
     * @return {TComputed}
     */
    get(arg) {
        /** @type {*} */
        const key = this._computeKey(arg);
        if (this._map2.has(key)) {
            return (/** @type {TComputed} */ (this._map2.get(key)));
        }
        /** @type {TComputed} */
        const value = this._fn(arg);
        this._map.set(arg, value);
        this._map2.set(key, value);
        return value;
    }
}
exports.CachedFunction = CachedFunction;
/* istanbul ignore if */
if (false) {
    /**
     * @const {!Map<TArg, TComputed>}
     * @private
     */
    CachedFunction.prototype._map;
    /**
     * @const {!Map<*, TComputed>}
     * @private
     */
    CachedFunction.prototype._map2;
    /**
     * @const {function(TArg): TComputed}
     * @private
     */
    CachedFunction.prototype._fn;
    /**
     * @const {function(TArg): *}
     * @private
     */
    CachedFunction.prototype._computeKey;
}
/**
 * Uses an unbounded cache to memoize the results of the given function.
 * @template TArg, TComputed
 */
class WeakCachedFunction {
    /**
     * @public
     * @param {(!ICacheOptions<TArg>|function(TArg): TComputed)} arg1
     * @param {(undefined|function(TArg): TComputed)=} arg2
     */
    constructor(arg1, arg2) {
        this._map = new WeakMap();
        if (typeof arg1 === 'function') {
            this._fn = arg1;
            this._computeKey = identity;
        }
        else {
            this._fn = (/** @type {function(TArg): TComputed} */ (arg2));
            this._computeKey = (/** @type {!ICacheOptions<TArg>} */ (arg1)).getCacheKey;
        }
    }
    /**
     * @public
     * @param {TArg} arg
     * @return {TComputed}
     */
    get(arg) {
        /** @type {!Object} */
        const key = (/** @type {!Object} */ (this._computeKey(arg)));
        if (this._map.has(key)) {
            return (/** @type {TComputed} */ (this._map.get(key)));
        }
        /** @type {TComputed} */
        const value = this._fn(arg);
        this._map.set(key, value);
        return value;
    }
}
exports.WeakCachedFunction = WeakCachedFunction;
/* istanbul ignore if */
if (false) {
    /**
     * @const {!WeakMap<!Object, TComputed>}
     * @private
     */
    WeakCachedFunction.prototype._map;
    /**
     * @const {function(TArg): TComputed}
     * @private
     */
    WeakCachedFunction.prototype._fn;
    /**
     * @const {function(TArg): *}
     * @private
     */
    WeakCachedFunction.prototype._computeKey;
}
