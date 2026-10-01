/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/gemini_coder/agent_ui_toolkit/src/vscode/base/common/arraysFind.ts
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
goog.module('google3.third_party.gemini_coder.agent_ui_toolkit.src.vscode.base.common.arraysFind');
var module = module || { id: 'third_party/gemini_coder/agent_ui_toolkit/src/vscode/base/common/arraysFind.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_arrays_1 = goog.requireType("google3.third_party.gemini_coder.agent_ui_toolkit.src.vscode.base.common.arrays");
/**
 * @template T
 * @param {!ReadonlyArray<T>} array
 * @param {function(T, number): *} predicate
 * @param {number=} fromIndex
 * @return {(undefined|T)}
 */
function findLast(array, predicate, fromIndex = array.length - 1) {
    /** @type {number} */
    const idx = findLastIdx(array, predicate, fromIndex);
    if (idx === -1) {
        return undefined;
    }
    return array[idx];
}
exports.findLast = findLast;
/**
 * @template T
 * @param {!ReadonlyArray<T>} array
 * @param {function(T, number): *} predicate
 * @param {number=} fromIndex
 * @return {number}
 */
function findLastIdx(array, predicate, fromIndex = array.length - 1) {
    for (let i = fromIndex; i >= 0; i--) {
        /** @type {T} */
        const element = array[i];
        if (predicate(element, i)) {
            return i;
        }
    }
    return -1;
}
exports.findLastIdx = findLastIdx;
/**
 * @template T
 * @param {!ReadonlyArray<T>} array
 * @param {function(T, number): *} predicate
 * @param {number=} fromIndex
 * @return {(undefined|T)}
 */
function findFirst(array, predicate, fromIndex = 0) {
    /** @type {number} */
    const idx = findFirstIdx(array, predicate, fromIndex);
    if (idx === -1) {
        return undefined;
    }
    return array[idx];
}
exports.findFirst = findFirst;
/**
 * @template T
 * @param {!ReadonlyArray<T>} array
 * @param {function(T, number): *} predicate
 * @param {number=} fromIndex
 * @return {number}
 */
function findFirstIdx(array, predicate, fromIndex = 0) {
    for (let i = fromIndex; i < array.length; i++) {
        /** @type {T} */
        const element = array[i];
        if (predicate(element, i)) {
            return i;
        }
    }
    return -1;
}
exports.findFirstIdx = findFirstIdx;
/**
 * Finds the last item where predicate is true using binary search.
 * `predicate` must be monotonous, i.e. `arr.map(predicate)` must be like `[true, ..., true, false, ..., false]`!
 *
 * @template T
 * @param {!ReadonlyArray<T>} array
 * @param {function(T): boolean} predicate
 * @return {(undefined|T)} `undefined` if no item matches, otherwise the last item that matches the predicate.
 */
function findLastMonotonous(array, predicate) {
    /** @type {number} */
    const idx = findLastIdxMonotonous(array, predicate);
    return idx === -1 ? undefined : array[idx];
}
exports.findLastMonotonous = findLastMonotonous;
/**
 * Finds the last item where predicate is true using binary search.
 * `predicate` must be monotonous, i.e. `arr.map(predicate)` must be like `[true, ..., true, false, ..., false]`!
 *
 * @template T
 * @param {!ReadonlyArray<T>} array
 * @param {function(T): boolean} predicate
 * @param {number=} startIdx
 * @param {number=} endIdxEx
 * @return {number} `startIdx - 1` if predicate is false for all items, otherwise the index of the last item that matches the predicate.
 */
function findLastIdxMonotonous(array, predicate, startIdx = 0, endIdxEx = array.length) {
    /** @type {number} */
    let i = startIdx;
    /** @type {number} */
    let j = endIdxEx;
    while (i < j) {
        /** @type {number} */
        const k = Math.floor((i + j) / 2);
        if (predicate(array[k])) {
            i = k + 1;
        }
        else {
            j = k;
        }
    }
    return i - 1;
}
exports.findLastIdxMonotonous = findLastIdxMonotonous;
/**
 * Finds the first item where predicate is true using binary search.
 * `predicate` must be monotonous, i.e. `arr.map(predicate)` must be like `[false, ..., false, true, ..., true]`!
 *
 * @template T
 * @param {!ReadonlyArray<T>} array
 * @param {function(T): boolean} predicate
 * @return {(undefined|T)} `undefined` if no item matches, otherwise the first item that matches the predicate.
 */
function findFirstMonotonous(array, predicate) {
    /** @type {number} */
    const idx = findFirstIdxMonotonousOrArrLen(array, predicate);
    return idx === array.length ? undefined : array[idx];
}
exports.findFirstMonotonous = findFirstMonotonous;
/**
 * Finds the first item where predicate is true using binary search.
 * `predicate` must be monotonous, i.e. `arr.map(predicate)` must be like `[false, ..., false, true, ..., true]`!
 *
 * @template T
 * @param {!ReadonlyArray<T>} array
 * @param {function(T): boolean} predicate
 * @param {number=} startIdx
 * @param {number=} endIdxEx
 * @return {number} `endIdxEx` if predicate is false for all items, otherwise the index of the first item that matches the predicate.
 */
function findFirstIdxMonotonousOrArrLen(array, predicate, startIdx = 0, endIdxEx = array.length) {
    /** @type {number} */
    let i = startIdx;
    /** @type {number} */
    let j = endIdxEx;
    while (i < j) {
        /** @type {number} */
        const k = Math.floor((i + j) / 2);
        if (predicate(array[k])) {
            j = k;
        }
        else {
            i = k + 1;
        }
    }
    return i;
}
exports.findFirstIdxMonotonousOrArrLen = findFirstIdxMonotonousOrArrLen;
/**
 * @template T
 * @param {!ReadonlyArray<T>} array
 * @param {function(T): boolean} predicate
 * @param {number=} startIdx
 * @param {number=} endIdxEx
 * @return {number}
 */
function findFirstIdxMonotonous(array, predicate, startIdx = 0, endIdxEx = array.length) {
    /** @type {number} */
    const idx = findFirstIdxMonotonousOrArrLen(array, predicate, startIdx, endIdxEx);
    return idx === array.length ? -1 : idx;
}
exports.findFirstIdxMonotonous = findFirstIdxMonotonous;
/**
 * Use this when
 * * You have a sorted array
 * * You query this array with a monotonous predicate to find the last item that has a certain property.
 * * You query this array multiple times with monotonous predicates that get weaker and weaker.
 * @template T
 */
class MonotonousArray {
    /**
     * @public
     * @param {!ReadonlyArray<T>} _array
     */
    constructor(_array) {
        this._array = _array;
        this._findLastMonotonousLastIdx = 0;
    }
    /**
     * The predicate must be monotonous, i.e. `arr.map(predicate)` must be like `[true, ..., true, false, ..., false]`!
     * For subsequent calls, current predicate must be weaker than (or equal to) the previous predicate, i.e. more entries must be `true`.
     * @public
     * @param {function(T): boolean} predicate
     * @return {(undefined|T)}
     */
    findLastMonotonous(predicate) {
        if (MonotonousArray.assertInvariants) {
            if (this._prevFindLastPredicate) {
                for (const item of this._array) {
                    if (this._prevFindLastPredicate(item) && !predicate(item)) {
                        throw new Error('MonotonousArray: current predicate must be weaker than (or equal to) the previous predicate.');
                    }
                }
            }
            this._prevFindLastPredicate = predicate;
        }
        /** @type {number} */
        const idx = findLastIdxMonotonous(this._array, predicate, this._findLastMonotonousLastIdx);
        this._findLastMonotonousLastIdx = idx + 1;
        return idx === -1 ? undefined : this._array[idx];
    }
}
exports.MonotonousArray = MonotonousArray;
MonotonousArray.assertInvariants = false;
/* istanbul ignore if */
if (false) {
    /**
     * @type {boolean}
     * @public
     */
    MonotonousArray.assertInvariants;
    /**
     * @type {number}
     * @private
     */
    MonotonousArray.prototype._findLastMonotonousLastIdx;
    /**
     * @type {(undefined|function(T): boolean)}
     * @private
     */
    MonotonousArray.prototype._prevFindLastPredicate;
    /**
     * @const {!ReadonlyArray<T>}
     * @private
     */
    MonotonousArray.prototype._array;
}
/**
 * Returns the first item that is equal to or greater than every other item.
 * @template T
 * @param {!ReadonlyArray<T>} array
 * @param {function(T, T): number} comparator
 * @return {(undefined|T)}
 */
function findFirstMax(array, comparator) {
    if (array.length === 0) {
        return undefined;
    }
    /** @type {T} */
    let max = array[0];
    for (let i = 1; i < array.length; i++) {
        /** @type {T} */
        const item = array[i];
        if (comparator(item, max) > 0) {
            max = item;
        }
    }
    return max;
}
exports.findFirstMax = findFirstMax;
/**
 * Returns the last item that is equal to or greater than every other item.
 * @template T
 * @param {!ReadonlyArray<T>} array
 * @param {function(T, T): number} comparator
 * @return {(undefined|T)}
 */
function findLastMax(array, comparator) {
    if (array.length === 0) {
        return undefined;
    }
    /** @type {T} */
    let max = array[0];
    for (let i = 1; i < array.length; i++) {
        /** @type {T} */
        const item = array[i];
        if (comparator(item, max) >= 0) {
            max = item;
        }
    }
    return max;
}
exports.findLastMax = findLastMax;
/**
 * Returns the first item that is equal to or less than every other item.
 * @template T
 * @param {!ReadonlyArray<T>} array
 * @param {function(T, T): number} comparator
 * @return {(undefined|T)}
 */
function findFirstMin(array, comparator) {
    return findFirstMax(array, (/**
     * @param {T} a
     * @param {T} b
     * @return {number}
     */
    (a, b) => -comparator(a, b)));
}
exports.findFirstMin = findFirstMin;
/**
 * @template T
 * @param {!ReadonlyArray<T>} array
 * @param {function(T, T): number} comparator
 * @return {number}
 */
function findMaxIdx(array, comparator) {
    if (array.length === 0) {
        return -1;
    }
    /** @type {number} */
    let maxIdx = 0;
    for (let i = 1; i < array.length; i++) {
        /** @type {T} */
        const item = array[i];
        if (comparator(item, array[maxIdx]) > 0) {
            maxIdx = i;
        }
    }
    return maxIdx;
}
exports.findMaxIdx = findMaxIdx;
/**
 * Returns the first mapped value of the array which is not undefined.
 * @template T, R
 * @param {!Iterable<T, ?, ?>} items
 * @param {function(T): (undefined|R)} mapFn
 * @return {(undefined|R)}
 */
function mapFindFirst(items, mapFn) {
    for (const value of items) {
        /** @type {(undefined|R)} */
        const mapped = mapFn(value);
        if (mapped !== undefined) {
            return mapped;
        }
    }
    return undefined;
}
exports.mapFindFirst = mapFindFirst;
