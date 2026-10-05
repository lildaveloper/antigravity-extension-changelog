goog.module('google3.third_party.antigravity.src.vs.base.common.collections');
var module = module || { id: 'third_party/antigravity/src/vs/base/common/collections.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
var _a;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/antigravity/src/vs/base/common/collections.ts
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
/**
 * An interface for a JavaScript object that
 * acts a dictionary. The keys are strings.
 * @typedef {?}
 */
exports.IStringDictionary;
/**
 * An interface for a JavaScript object that
 * acts a dictionary. The keys are numbers.
 * @typedef {?}
 */
exports.INumberDictionary;
/**
 * Groups the collection into a dictionary based on the provided
 * group function.
 * @template K, V
 * @param {!ReadonlyArray<V>} data
 * @param {function(V): K} groupFn
 * @return {?}
 */
function groupBy(data, groupFn) {
    /** @type {?} */
    const result = Object.create(null);
    for (const element of data) {
        /** @type {K} */
        const key = groupFn(element);
        /** @type {?} */
        let target = result[key];
        if (!target) {
            target = result[key] = [];
        }
        (/** @type {!Array<V>} */ (target)).push(element);
    }
    return result;
}
exports.groupBy = groupBy;
/**
 * @template K, V
 * @param {!Array<V>} data
 * @param {function(V): K} groupFn
 * @return {!Map<K, !Array<V>>}
 */
function groupByMap(data, groupFn) {
    /** @type {!Map<K, !Array<V>>} */
    const result = new Map();
    for (const element of data) {
        /** @type {K} */
        const key = groupFn(element);
        /** @type {(undefined|!Array<V>)} */
        let target = result.get(key);
        if (!target) {
            target = [];
            result.set(key, target);
        }
        target.push(element);
    }
    return result;
}
exports.groupByMap = groupByMap;
/**
 * @template T
 * @param {!ReadonlySet<T>} before
 * @param {!ReadonlySet<T>} after
 * @return {{removed: !Array<T>, added: !Array<T>}}
 */
function diffSets(before, after) {
    /** @type {!Array<T>} */
    const removed = [];
    /** @type {!Array<T>} */
    const added = [];
    for (const element of before) {
        if (!after.has(element)) {
            removed.push(element);
        }
    }
    for (const element of after) {
        if (!before.has(element)) {
            added.push(element);
        }
    }
    return { removed, added };
}
exports.diffSets = diffSets;
/**
 * Checks whether two sets contain exactly the same elements.
 *
 * @template T
 * @param {!ReadonlySet<T>} a - The first set.
 * @param {!ReadonlySet<T>} b - The second set.
 * @return {boolean} `true` if both sets have the same size and every element of `a` is also in `b`.
 */
function equalSets(a, b) {
    if (a === b) {
        return true;
    }
    if (a.size !== b.size) {
        return false;
    }
    for (const element of a) {
        if (!b.has(element)) {
            return false;
        }
    }
    return true;
}
exports.equalSets = equalSets;
/**
 * @template K, V
 * @param {!Map<K, V>} before
 * @param {!Map<K, V>} after
 * @return {{removed: !Array<V>, added: !Array<V>}}
 */
function diffMaps(before, after) {
    /** @type {!Array<V>} */
    const removed = [];
    /** @type {!Array<V>} */
    const added = [];
    for (const [index__tsickle_destructured_1, value__tsickle_destructured_2] of before) {
        const index = /** @type {K} */ (index__tsickle_destructured_1);
        const value = /** @type {V} */ (value__tsickle_destructured_2);
        if (!after.has(index)) {
            removed.push(value);
        }
    }
    for (const [index__tsickle_destructured_3, value__tsickle_destructured_4] of after) {
        const index = /** @type {K} */ (index__tsickle_destructured_3);
        const value = /** @type {V} */ (value__tsickle_destructured_4);
        if (!before.has(index)) {
            added.push(value);
        }
    }
    return { removed, added };
}
exports.diffMaps = diffMaps;
/**
 * Computes the intersection of two sets.
 *
 * @template T
 * @param {!Set<T>} setA - The first set.
 * @param {!Iterable<T, ?, ?>} setB - The second iterable.
 * @return {!Set<T>} A new set containing the elements that are in both `setA` and `setB`.
 */
function intersection(setA, setB) {
    /** @type {!Set<T>} */
    const result = new Set();
    for (const elem of setB) {
        if (setA.has(elem)) {
            result.add(elem);
        }
    }
    return result;
}
exports.intersection = intersection;
/**
 * @template T
 * @implements {Set<T>}
 */
class SetWithKey {
    /**
     * @public
     * @param {!Array<T>} values
     * @param {function(T): *} toKey
     */
    constructor(values, toKey) {
        this.toKey = toKey;
        this._map = new Map();
        this[_a] = 'SetWithKey';
        for (const value of values) {
            this.add(value);
        }
    }
    /**
     * @public
     * @return {number}
     */
    get size() {
        return this._map.size;
    }
    /**
     * @public
     * @template THIS
     * @this {THIS}
     * @param {T} value
     * @return {THIS}
     */
    add(value) {
        /** @type {*} */
        const key = (/** @type {!SetWithKey} */ (this)).toKey(value);
        (/** @type {!SetWithKey} */ (this))._map.set(key, value);
        return (/** @type {!SetWithKey} */ (this));
    }
    /**
     * @public
     * @param {T} value
     * @return {boolean}
     */
    delete(value) {
        return this._map.delete(this.toKey(value));
    }
    /**
     * @public
     * @param {T} value
     * @return {boolean}
     */
    has(value) {
        return this._map.has(this.toKey(value));
    }
    /**
     * @public
     * @return {!SetIterator<!Array<?>>}
     */
    *entries() {
        for (const entry of this._map.values()) {
            yield [entry, entry];
        }
    }
    /**
     * @public
     * @return {!SetIterator<T>}
     */
    keys() {
        return this.values();
    }
    /**
     * @public
     * @return {!SetIterator<T>}
     */
    *values() {
        for (const entry of this._map.values()) {
            yield entry;
        }
    }
    /**
     * @public
     * @return {void}
     */
    clear() {
        this._map.clear();
    }
    /**
     * @public
     * @param {function(T, T, !Set<T>): void} callbackfn
     * @param {*=} thisArg
     * @return {void}
     */
    forEach(callbackfn, thisArg) {
        this._map.forEach((/**
         * @param {T} entry
         * @return {void}
         */
        entry => callbackfn.call(thisArg, entry, entry, this)));
    }
    /**
     * @public
     * @return {!SetIterator<T>}
     */
    [Symbol.iterator]() {
        return this.values();
    }
}
exports.SetWithKey = SetWithKey;
_a = Symbol.toStringTag;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!Map<*, T>}
     * @private
     */
    SetWithKey.prototype._map;
    /* Skipping unnamed member:
    [Symbol.toStringTag]: string = 'SetWithKey';*/
    /**
     * @type {function(T): *}
     * @private
     */
    SetWithKey.prototype.toKey;
}
