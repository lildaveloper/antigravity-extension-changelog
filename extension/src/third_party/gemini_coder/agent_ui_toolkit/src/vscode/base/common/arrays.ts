/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/gemini_coder/agent_ui_toolkit/src/vscode/base/common/arrays.ts
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
goog.module('google3.third_party.gemini_coder.agent_ui_toolkit.src.vscode.base.common.arrays');
var module = module || { id: 'third_party/gemini_coder/agent_ui_toolkit/src/vscode/base/common/arrays.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_arraysFind_1 = goog.requireType("google3.third_party.gemini_coder.agent_ui_toolkit.src.vscode.base.common.arraysFind");
const tsickle_cancellation_2 = goog.requireType("google3.third_party.gemini_coder.agent_ui_toolkit.src.vscode.base.common.cancellation");
const tsickle_errors_3 = goog.requireType("google3.third_party.gemini_coder.agent_ui_toolkit.src.vscode.base.common.errors");
const tsickle_sequence_4 = goog.requireType("google3.third_party.gemini_coder.agent_ui_toolkit.src.vscode.base.common.sequence");
const arraysFind_1 = goog.require('google3.third_party.gemini_coder.agent_ui_toolkit.src.vscode.base.common.arraysFind');
const errors_1 = goog.require('google3.third_party.gemini_coder.agent_ui_toolkit.src.vscode.base.common.errors');
/**
 * Returns the last entry and the initial N-1 entries of the array, as a tuple of [rest, last].
 *
 * The array must have at least one element.
 *
 * @throws Error if the array is empty
 * @template T
 * @param {!Array<T>} arr The input array
 * @return {!Array<?>} A tuple of [rest, last] where rest is all but the last element and last is the last element
 */
function tail(arr) {
    if (arr.length === 0) {
        throw new Error('Invalid tail call');
    }
    return [arr.slice(0, arr.length - 1), arr[arr.length - 1]];
}
exports.tail = tail;
/**
 * @template T
 * @param {(undefined|!ReadonlyArray<T>)} one
 * @param {(undefined|!ReadonlyArray<T>)} other
 * @param {function(T, T): boolean=} itemEquals
 * @return {boolean}
 */
function equals(one, other, itemEquals = (/**
 * @param {T} a
 * @param {T} b
 * @return {boolean}
 */
(a, b) => a === b)) {
    if (one === other) {
        return true;
    }
    if (!one || !other) {
        return false;
    }
    if (one.length !== other.length) {
        return false;
    }
    for (let i = 0, len = one.length; i < len; i++) {
        if (!itemEquals(one[i], other[i])) {
            return false;
        }
    }
    return true;
}
exports.equals = equals;
/**
 * Remove the element at `index` by replacing it with the last element. This is faster than `splice`
 * but changes the order of the array
 * @template T
 * @param {!Array<T>} array
 * @param {number} index
 * @return {void}
 */
function removeFastWithoutKeepingOrder(array, index) {
    /** @type {number} */
    const last = array.length - 1;
    if (index < last) {
        array[index] = array[last];
    }
    array.pop();
}
exports.removeFastWithoutKeepingOrder = removeFastWithoutKeepingOrder;
/**
 * Performs a binary search algorithm over a sorted array.
 *
 * @template T
 * @param {!ReadonlyArray<T>} array The array being searched.
 * @param {T} key The value we search for.
 * @param {function(T, T): number} comparator A function that takes two array elements and returns zero
 *   if they are equal, a negative number if the first element precedes the
 *   second one in the sorting order, or a positive number if the second element
 *   precedes the first one.
 * @return {number} See {\@link binarySearch2}
 */
function binarySearch(array, key, comparator) {
    return binarySearch2(array.length, (/**
     * @param {number} i
     * @return {number}
     */
    (i) => comparator(array[i], key)));
}
exports.binarySearch = binarySearch;
/**
 * Performs a binary search algorithm over a sorted collection. Useful for cases
 * when we need to perform a binary search over something that isn't actually an
 * array, and converting data to an array would defeat the use of binary search
 * in the first place.
 *
 * @param {number} length The collection length.
 * @param {function(number): number} compareToKey A function that takes an index of an element in the
 *   collection and returns zero if the value at this index is equal to the
 *   search key, a negative number if the value precedes the search key in the
 *   sorting order, or a positive number if the search key precedes the value.
 * @return {number} A non-negative index of an element, if found. If not found, the
 *   result is -(n+1) (or ~n, using bitwise notation), where n is the index
 *   where the key should be inserted to maintain the sorting order.
 */
function binarySearch2(length, compareToKey) {
    /** @type {number} */
    let low = 0;
    /** @type {number} */
    let high = length - 1;
    while (low <= high) {
        /** @type {number} */
        const mid = ((low + high) / 2) | 0;
        /** @type {number} */
        const comp = compareToKey(mid);
        if (comp < 0) {
            low = mid + 1;
        }
        else if (comp > 0) {
            high = mid - 1;
        }
        else {
            return mid;
        }
    }
    return -(low + 1);
}
exports.binarySearch2 = binarySearch2;
/** @typedef {function(?, ?): number} */
var Compare;
/**
 * Finds the nth smallest element in the array using quickselect algorithm.
 * The data does not need to be sorted.
 *
 * @throws TypeError if nth is >= data.length
 * @template T
 * @param {number} nth The zero-based index of the element to find (0 = smallest, 1 = second smallest, etc.)
 * @param {!Array<T>} data The unsorted array
 * @param {function(T, T): number} compare A comparator function that defines the sort order
 * @return {T} The nth smallest element
 */
function quickSelect(nth, data, compare) {
    nth = nth | 0;
    if (nth >= data.length) {
        throw new TypeError('invalid index');
    }
    /** @type {T} */
    const pivotValue = data[Math.floor(data.length * Math.random())];
    /** @type {!Array<T>} */
    const lower = [];
    /** @type {!Array<T>} */
    const higher = [];
    /** @type {!Array<T>} */
    const pivots = [];
    for (const value of data) {
        /** @type {number} */
        const val = compare(value, pivotValue);
        if (val < 0) {
            lower.push(value);
        }
        else if (val > 0) {
            higher.push(value);
        }
        else {
            pivots.push(value);
        }
    }
    if (nth < lower.length) {
        return quickSelect(nth, lower, compare);
    }
    else if (nth < lower.length + pivots.length) {
        return pivots[0];
    }
    else {
        return quickSelect(nth - (lower.length + pivots.length), higher, compare);
    }
}
exports.quickSelect = quickSelect;
/**
 * @template T
 * @param {!ReadonlyArray<T>} data
 * @param {function(T, T): number} compare
 * @return {!Array<!Array<T>>}
 */
function groupBy(data, compare) {
    /** @type {!Array<!Array<T>>} */
    const result = [];
    /** @type {(undefined|!Array<T>)} */
    let currentGroup = undefined;
    for (const element of data.slice(0).sort(compare)) {
        if (!currentGroup || compare(currentGroup[0], element) !== 0) {
            currentGroup = [element];
            result.push(currentGroup);
        }
        else {
            currentGroup.push(element);
        }
    }
    return result;
}
exports.groupBy = groupBy;
/**
 * Splits the given items into a list of (non-empty) groups.
 * `shouldBeGrouped` is used to decide if two consecutive items should be in the same group.
 * The order of the items is preserved.
 * @template T
 * @param {!Iterable<T, ?, ?>} items
 * @param {function(T, T): boolean} shouldBeGrouped
 * @return {!Iterable<!Array<T>, ?, ?>}
 */
function* groupAdjacentBy(items, shouldBeGrouped) {
    /** @type {(undefined|!Array<T>)} */
    let currentGroup;
    /** @type {(undefined|T)} */
    let last;
    for (const item of items) {
        if (last !== undefined && shouldBeGrouped(last, item)) {
            (/** @type {!Array<T>} */ (currentGroup)).push(item);
        }
        else {
            if (currentGroup) {
                yield currentGroup;
            }
            currentGroup = [item];
        }
        last = item;
    }
    if (currentGroup) {
        yield currentGroup;
    }
}
exports.groupAdjacentBy = groupAdjacentBy;
/**
 * @template T
 * @param {!Array<T>} arr
 * @param {function((undefined|T), (undefined|T)): void} f
 * @return {void}
 */
function forEachAdjacent(arr, f) {
    for (let i = 0; i <= arr.length; i++) {
        f(i === 0 ? undefined : arr[i - 1], i === arr.length ? undefined : arr[i]);
    }
}
exports.forEachAdjacent = forEachAdjacent;
/**
 * @template T
 * @param {!Array<T>} arr
 * @param {function((undefined|T), T, (undefined|T)): void} f
 * @return {void}
 */
function forEachWithNeighbors(arr, f) {
    for (let i = 0; i < arr.length; i++) {
        f(i === 0 ? undefined : arr[i - 1], arr[i], i + 1 === arr.length ? undefined : arr[i + 1]);
    }
}
exports.forEachWithNeighbors = forEachWithNeighbors;
/**
 * @template T
 * @param {...?} arrays
 * @return {!Array<?>}
 */
function concatArrays(...arrays) {
    return [].concat(...arrays);
}
exports.concatArrays = concatArrays;
/**
 * @record
 * @template T
 * @extends {tsickle_sequence_4.ISplice}
 */
function IMutableSplice() { }
/* istanbul ignore if */
if (false) {
    /**
     * @const {!Array<T>}
     * @public
     */
    IMutableSplice.prototype.toInsert;
    /**
     * @type {number}
     * @public
     */
    IMutableSplice.prototype.deleteCount;
}
/**
 * Diffs two *sorted* arrays and computes the splices which apply the diff.
 * @template T
 * @param {!ReadonlyArray<T>} before
 * @param {!ReadonlyArray<T>} after
 * @param {function(T, T): number} compare
 * @return {!Array<!tsickle_sequence_4.ISplice<T>>}
 */
function sortedDiff(before, after, compare) {
    /** @type {!Array<!IMutableSplice<T>>} */
    const result = [];
    /**
     * @param {number} start
     * @param {number} deleteCount
     * @param {!Array<T>} toInsert
     * @return {void}
     */
    function pushSplice(start, deleteCount, toInsert) {
        if (deleteCount === 0 && toInsert.length === 0) {
            return;
        }
        /** @type {!IMutableSplice<T>} */
        const latest = result[result.length - 1];
        if (latest && latest.start + latest.deleteCount === start) {
            latest.deleteCount += deleteCount;
            latest.toInsert.push(...toInsert);
        }
        else {
            result.push({ start, deleteCount, toInsert });
        }
    }
    /** @type {number} */
    let beforeIdx = 0;
    /** @type {number} */
    let afterIdx = 0;
    while (true) {
        if (beforeIdx === before.length) {
            pushSplice(beforeIdx, 0, after.slice(afterIdx));
            break;
        }
        if (afterIdx === after.length) {
            pushSplice(beforeIdx, before.length - beforeIdx, []);
            break;
        }
        /** @type {T} */
        const beforeElement = before[beforeIdx];
        /** @type {T} */
        const afterElement = after[afterIdx];
        /** @type {number} */
        const n = compare(beforeElement, afterElement);
        if (n === 0) {
            // equal
            beforeIdx += 1;
            afterIdx += 1;
        }
        else if (n < 0) {
            // beforeElement is smaller -> before element removed
            pushSplice(beforeIdx, 1, []);
            beforeIdx += 1;
        }
        else if (n > 0) {
            // beforeElement is greater -> after element added
            pushSplice(beforeIdx, 0, [afterElement]);
            afterIdx += 1;
        }
    }
    return result;
}
exports.sortedDiff = sortedDiff;
/**
 * Takes two *sorted* arrays and computes their delta (removed, added elements).
 * Finishes in `Math.min(before.length, after.length)` steps.
 * @template T
 * @param {!ReadonlyArray<T>} before
 * @param {!ReadonlyArray<T>} after
 * @param {function(T, T): number} compare
 * @return {{removed: !Array<T>, added: !Array<T>}}
 */
function delta(before, after, compare) {
    /** @type {!Array<!tsickle_sequence_4.ISplice<T>>} */
    const splices = sortedDiff(before, after, compare);
    /** @type {!Array<T>} */
    const removed = [];
    /** @type {!Array<T>} */
    const added = [];
    for (const splice of splices) {
        removed.push(...before.slice(splice.start, splice.start + splice.deleteCount));
        added.push(...splice.toInsert);
    }
    return { removed, added };
}
exports.delta = delta;
/**
 * Returns the top N elements from the array.
 *
 * Faster than sorting the entire array when the array is a lot larger than N.
 *
 * @template T
 * @param {!ReadonlyArray<T>} array The unsorted array.
 * @param {function(T, T): number} compare A sort function for the elements.
 * @param {number} n The number of elements to return.
 * @return {!Array<T>} The first n elements from array when sorted with compare.
 */
function top(array, compare, n) {
    if (n === 0) {
        return [];
    }
    /** @type {!Array<T>} */
    const result = array.slice(0, n).sort(compare);
    topStep(array, compare, result, n, array.length);
    return result;
}
exports.top = top;
/**
 * Asynchronous variant of `top()` allowing for splitting up work in batches between which the event loop can run.
 *
 * Returns the top N elements from the array.
 *
 * Faster than sorting the entire array when the array is a lot larger than N.
 *
 * @template T
 * @param {!Array<T>} array The unsorted array.
 * @param {function(T, T): number} compare A sort function for the elements.
 * @param {number} n The number of elements to return.
 * @param {number} batch The number of elements to examine before yielding to the event loop.
 * @param {(undefined|?)=} token
 * @return {!Promise<!Array<T>>} The first n elements from array when sorted with compare.
 */
function topAsync(array, compare, n, batch, token) {
    if (n === 0) {
        return Promise.resolve([]);
    }
    return new Promise((/**
     * @param {function((!Array<T>|!PromiseLike<!Array<T>>)): void} resolve
     * @param {function(?=): void} reject
     * @return {void}
     */
    (resolve, reject) => {
        ((/**
         * @return {!Promise<!Array<T>>}
         */
        async () => {
            /** @type {number} */
            const o = array.length;
            /** @type {!Array<T>} */
            const result = array.slice(0, n).sort(compare);
            for (let i = n, m = Math.min(n + batch, o); i < o; i = m, m = Math.min(m + batch, o)) {
                if (i > n) {
                    await new Promise((/**
                     * @param {function(*): void} resolve
                     * @return {number}
                     */
                    (resolve) => setTimeout(resolve))); // any other delay function would starve I/O
                }
                if (token && token.isCancellationRequested) {
                    throw new errors_1.CancellationError();
                }
                topStep(array, compare, result, i, m);
            }
            return result;
        }))().then(resolve, reject);
    }));
}
exports.topAsync = topAsync;
/**
 * @template T
 * @param {!ReadonlyArray<T>} array
 * @param {function(T, T): number} compare
 * @param {!Array<T>} result
 * @param {number} i
 * @param {number} m
 * @return {void}
 */
function topStep(array, compare, result, i, m) {
    for (const n = result.length; i < m; i++) {
        /** @type {T} */
        const element = array[i];
        if (compare(element, result[n - 1]) < 0) {
            result.pop();
            /** @type {number} */
            const j = (0, arraysFind_1.findFirstIdxMonotonousOrArrLen)(result, (/**
             * @param {T} e
             * @return {boolean}
             */
            (e) => compare(element, e) < 0));
            result.splice(j, 0, element);
        }
    }
}
/**
 * @template T
 * @param {!ReadonlyArray<(undefined|null|T)>} array
 * @return {!Array<T>} New array with all falsy values removed. The original array IS NOT modified.
 */
function coalesce(array) {
    return array.filter((/**
     * @param {(undefined|null|T)} e
     * @return {boolean}
     */
    (e) => !!e));
}
exports.coalesce = coalesce;
/**
 * Remove all falsy values from `array`. The original array IS modified.
 * @template T
 * @param {!Array<(undefined|null|T)>} array
 * @return {void}
 */
function coalesceInPlace(array) {
    /** @type {number} */
    let to = 0;
    for (let i = 0; i < array.length; i++) {
        if (!!array[i]) {
            array[to] = array[i];
            to += 1;
        }
    }
    array.length = to;
}
exports.coalesceInPlace = coalesceInPlace;
/**
 * @deprecated Use `Array.copyWithin` instead
 * @param {!Array<*>} array
 * @param {number} from
 * @param {number} to
 * @return {void}
 */
function move(array, from, to) {
    array.splice(to, 0, array.splice(from, 1)[0]);
}
exports.move = move;
/**
 * @param {*} obj
 * @return {boolean} false if the provided object is an array and not empty.
 */
function isFalsyOrEmpty(obj) {
    return !Array.isArray(obj) || (/** @type {!Array<?>} */ (obj)).length === 0;
}
exports.isFalsyOrEmpty = isFalsyOrEmpty;
/**
 * @template T
 * @param {(undefined|null|!Array<T>|!ReadonlyArray<T>)} obj
 * @return {boolean}
 */
function isNonEmptyArray(obj) {
    return Array.isArray(obj) && (/** @type {!Array<T>} */ (obj)).length > 0;
}
exports.isNonEmptyArray = isNonEmptyArray;
/**
 * Removes duplicates from the given array. The optional keyFn allows to specify
 * how elements are checked for equality by returning an alternate value for each.
 * @template T
 * @param {!ReadonlyArray<T>} array
 * @param {function(T): *=} keyFn
 * @return {!Array<T>}
 */
function distinct(array, keyFn = (/**
 * @param {T} value
 * @return {T}
 */
(value) => value)) {
    /** @type {!Set<?>} */
    const seen = new Set();
    return array.filter((/**
     * @param {T} element
     * @return {boolean}
     */
    (element) => {
        /** @type {*} */
        const key = keyFn(element);
        if (seen.has(key)) {
            return false;
        }
        seen.add(key);
        return true;
    }));
}
exports.distinct = distinct;
/**
 * @template T, R
 * @param {function(T): R} keyFn
 * @return {function(T): boolean}
 */
function uniqueFilter(keyFn) {
    /** @type {!Set<R>} */
    const seen = new Set();
    return (/**
     * @param {T} element
     * @return {boolean}
     */
    (element) => {
        /** @type {R} */
        const key = keyFn(element);
        if (seen.has(key)) {
            return false;
        }
        seen.add(key);
        return true;
    });
}
exports.uniqueFilter = uniqueFilter;
/**
 * @template T
 * @param {!ReadonlyArray<T>} one
 * @param {!ReadonlyArray<T>} other
 * @param {function(T, T): boolean=} equals
 * @return {number}
 */
function commonPrefixLength(one, other, equals = (/**
 * @param {T} a
 * @param {T} b
 * @return {boolean}
 */
(a, b) => a === b)) {
    /** @type {number} */
    let result = 0;
    for (let i = 0, len = Math.min(one.length, other.length); i < len && equals(one[i], other[i]); i++) {
        result++;
    }
    return result;
}
exports.commonPrefixLength = commonPrefixLength;
/**
 * @param {number} arg
 * @param {(undefined|number)=} to
 * @return {!Array<number>}
 */
function range(arg, to) {
    /** @type {number} */
    let from = typeof to === 'number' ? arg : 0;
    if (typeof to === 'number') {
        from = arg;
    }
    else {
        from = 0;
        to = arg;
    }
    /** @type {!Array<number>} */
    const result = [];
    if (from <= to) {
        for (let i = from; i < to; i++) {
            result.push(i);
        }
    }
    else {
        for (let i = from; i > to; i--) {
            result.push(i);
        }
    }
    return result;
}
exports.range = range;
/**
 * @template T, R
 * @param {!ReadonlyArray<T>} array
 * @param {function(T): string} indexer
 * @param {(undefined|function(T): R)=} mapper
 * @return {!Object<string,R>}
 */
function index(array, indexer, mapper) {
    return array.reduce((/**
     * @param {?} r
     * @param {T} t
     * @return {?}
     */
    (r, t) => {
        r[indexer(t)] = mapper ? mapper(t) : t;
        return r;
    }), Object.create(null));
}
exports.index = index;
/**
 * Inserts an element into an array. Returns a function which, when
 * called, will remove that element from the array.
 *
 * @deprecated In almost all cases, use a `Set<T>` instead.
 * @template T
 * @param {!Array<T>} array
 * @param {T} element
 * @return {function(): void}
 */
function insert(array, element) {
    array.push(element);
    return (/**
     * @return {(undefined|T)}
     */
    () => remove(array, element));
}
exports.insert = insert;
/**
 * Removes an element from an array if it can be found.
 *
 * @deprecated In almost all cases, use a `Set<T>` instead.
 * @template T
 * @param {!Array<T>} array
 * @param {T} element
 * @return {(undefined|T)}
 */
function remove(array, element) {
    /** @type {number} */
    const index = array.indexOf(element);
    if (index > -1) {
        array.splice(index, 1);
        return element;
    }
    return undefined;
}
exports.remove = remove;
/**
 * Insert `insertArr` inside `target` at `insertIndex`.
 * Please don't touch unless you understand https://jsperf.com/inserting-an-array-within-an-array
 * @template T
 * @param {!Array<T>} target
 * @param {number} insertIndex
 * @param {!Array<T>} insertArr
 * @return {!Array<T>}
 */
function arrayInsert(target, insertIndex, insertArr) {
    /** @type {!Array<T>} */
    const before = target.slice(0, insertIndex);
    /** @type {!Array<T>} */
    const after = target.slice(insertIndex);
    return before.concat(insertArr, after);
}
exports.arrayInsert = arrayInsert;
/**
 * Uses Fisher-Yates shuffle to shuffle the given array
 * @template T
 * @param {!Array<T>} array
 * @param {(undefined|number)=} _seed
 * @return {void}
 */
function shuffle(array, _seed) {
    /** @type {function(): number} */
    let rand;
    if (typeof _seed === 'number') {
        /** @type {number} */
        let seed = _seed;
        // Seeded random number generator in JS. Modified from:
        // https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
        rand = (/**
         * @return {number}
         */
        () => {
            /** @type {number} */
            const x = Math.sin(seed++) * 179426549;
            return x - Math.floor(x);
        });
    }
    else {
        rand = Math.random;
    }
    for (let i = array.length - 1; i > 0; i -= 1) {
        /** @type {number} */
        const j = Math.floor(rand() * (i + 1));
        /** @type {T} */
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
exports.shuffle = shuffle;
/**
 * Pushes an element to the start of the array, if found.
 * @template T
 * @param {!Array<T>} arr
 * @param {T} value
 * @return {void}
 */
function pushToStart(arr, value) {
    /** @type {number} */
    const index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
        arr.unshift(value);
    }
}
exports.pushToStart = pushToStart;
/**
 * Pushes an element to the end of the array, if found.
 * @template T
 * @param {!Array<T>} arr
 * @param {T} value
 * @return {void}
 */
function pushToEnd(arr, value) {
    /** @type {number} */
    const index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
        arr.push(value);
    }
}
exports.pushToEnd = pushToEnd;
/**
 * @template T
 * @param {!Array<T>} arr
 * @param {!ReadonlyArray<T>} items
 * @return {void}
 */
function pushMany(arr, items) {
    for (const item of items) {
        arr.push(item);
    }
}
exports.pushMany = pushMany;
/**
 * @template T, U
 * @param {(T|!Array<T>)} items
 * @param {function(T): U} fn
 * @return {(U|!Array<U>)}
 */
function mapArrayOrNot(items, fn) {
    return Array.isArray(items) ? (/** @type {!Array<T>} */ (items)).map(fn) : fn(items);
}
exports.mapArrayOrNot = mapArrayOrNot;
/**
 * @template T, U
 * @param {!ReadonlyArray<T>} array
 * @param {function(T): (undefined|U)} fn
 * @return {!Array<U>}
 */
function mapFilter(array, fn) {
    /** @type {!Array<U>} */
    const result = [];
    for (const item of array) {
        /** @type {(undefined|U)} */
        const mapped = fn(item);
        if (mapped !== undefined) {
            result.push(mapped);
        }
    }
    return result;
}
exports.mapFilter = mapFilter;
/**
 * @template T
 * @param {!ReadonlyArray<T>} array
 * @return {!Array<T>}
 */
function withoutDuplicates(array) {
    /** @type {!Set<T>} */
    const s = new Set(array);
    return Array.from(s);
}
exports.withoutDuplicates = withoutDuplicates;
/**
 * @template T
 * @param {(T|!Array<T>)} x
 * @return {!Array<T>}
 */
function asArray(x) {
    return Array.isArray(x) ? x : [x];
}
exports.asArray = asArray;
/**
 * @template T
 * @param {!Array<T>} arr
 * @return {(undefined|T)}
 */
function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
exports.getRandomElement = getRandomElement;
/**
 * Insert the new items in the array.
 * @template T
 * @param {!Array<T>} array The original array.
 * @param {number} start The zero-based location in the array from which to start inserting elements.
 * @param {!Array<T>} newItems The items to be inserted
 * @return {void}
 */
function insertInto(array, start, newItems) {
    /** @type {number} */
    const startIdx = getActualStartIndex(array, start);
    /** @type {number} */
    const originalLength = array.length;
    /** @type {number} */
    const newItemsLength = newItems.length;
    array.length = originalLength + newItemsLength;
    // Move the items after the start index, start from the end so that we don't overwrite any value.
    for (let i = originalLength - 1; i >= startIdx; i--) {
        array[i + newItemsLength] = array[i];
    }
    for (let i = 0; i < newItemsLength; i++) {
        array[i + startIdx] = newItems[i];
    }
}
exports.insertInto = insertInto;
/**
 * Removes elements from an array and inserts new elements in their place, returning the deleted elements. Alternative to the native Array.splice method, it
 * can only support limited number of items due to the maximum call stack size limit.
 * @template T
 * @param {!Array<T>} array The original array.
 * @param {number} start The zero-based location in the array from which to start removing elements.
 * @param {number} deleteCount The number of elements to remove.
 * @param {!Array<T>} newItems
 * @return {!Array<T>} An array containing the elements that were deleted.
 */
function splice(array, start, deleteCount, newItems) {
    /** @type {number} */
    const index = getActualStartIndex(array, start);
    /** @type {!Array<T>} */
    let result = array.splice(index, deleteCount);
    if (result === undefined) {
        // see https://bugs.webkit.org/show_bug.cgi?id=261140
        result = [];
    }
    insertInto(array, index, newItems);
    return result;
}
exports.splice = splice;
/**
 * Determine the actual start index (same logic as the native splice() or slice())
 * If greater than the length of the array, start will be set to the length of the array. In this case, no element will be deleted but the method will behave as an adding function, adding as many element as item[n*] provided.
 * If negative, it will begin that many elements from the end of the array. (In this case, the origin -1, meaning -n is the index of the nth last element, and is therefore equivalent to the index of array.length - n.) If array.length + start is less than 0, it will begin from index 0.
 * @template T
 * @param {!Array<T>} array The target array.
 * @param {number} start The operation index.
 * @return {number}
 */
function getActualStartIndex(array, start) {
    return start < 0
        ? Math.max(start + array.length, 0)
        : Math.min(start, array.length);
}
var CompareResult;
(function (CompareResult) {
    /**
     * @param {number} result
     * @return {boolean}
     */
    function isLessThan(result) {
        return result < 0;
    }
    CompareResult.isLessThan = isLessThan;
    /**
     * @param {number} result
     * @return {boolean}
     */
    function isLessThanOrEqual(result) {
        return result <= 0;
    }
    CompareResult.isLessThanOrEqual = isLessThanOrEqual;
    /**
     * @param {number} result
     * @return {boolean}
     */
    function isGreaterThan(result) {
        return result > 0;
    }
    CompareResult.isGreaterThan = isGreaterThan;
    /**
     * @param {number} result
     * @return {boolean}
     */
    function isNeitherLessOrGreaterThan(result) {
        return result === 0;
    }
    CompareResult.isNeitherLessOrGreaterThan = isNeitherLessOrGreaterThan;
    /** @type {number} */
    CompareResult.greaterThan = 1;
    /** @type {number} */
    CompareResult.lessThan = -1;
    /** @type {number} */
    CompareResult.neitherLessOrGreaterThan = 0;
})(CompareResult || (CompareResult = {}));
exports.CompareResult = CompareResult;
/**
 * A comparator `c` defines a total order `<=` on `T` as following:
 * `c(a, b) <= 0` iff `a` <= `b`.
 * We also have `c(a, b) == 0` iff `c(b, a) == 0`.
 * @typedef {function(?, ?): number}
 */
exports.Comparator;
/**
 * @template TItem, TCompareBy
 * @param {function(TItem): TCompareBy} selector
 * @param {function(TCompareBy, TCompareBy): number} comparator
 * @return {function(TItem, TItem): number}
 */
function compareBy(selector, comparator) {
    return (/**
     * @param {TItem} a
     * @param {TItem} b
     * @return {number}
     */
    (a, b) => comparator(selector(a), selector(b)));
}
exports.compareBy = compareBy;
/**
 * @template TItem
 * @param {...function(TItem, TItem): number} comparators
 * @return {function(TItem, TItem): number}
 */
function tieBreakComparators(...comparators) {
    return (/**
     * @param {TItem} item1
     * @param {TItem} item2
     * @return {number}
     */
    (item1, item2) => {
        for (const comparator of comparators) {
            /** @type {number} */
            const result = comparator(item1, item2);
            if (!CompareResult.isNeitherLessOrGreaterThan(result)) {
                return result;
            }
        }
        return CompareResult.neitherLessOrGreaterThan;
    });
}
exports.tieBreakComparators = tieBreakComparators;
/**
 * The natural order on numbers.
 * @type {function(number, number): number}
 */
exports.numberComparator = (/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
(a, b) => a - b);
/** @type {function(boolean, boolean): number} */
exports.booleanComparator = (/**
 * @param {boolean} a
 * @param {boolean} b
 * @return {number}
 */
(a, b) => (0, exports.numberComparator)(a ? 1 : 0, b ? 1 : 0));
/**
 * @template TItem
 * @param {function(TItem, TItem): number} comparator
 * @return {function(TItem, TItem): number}
 */
function reverseOrder(comparator) {
    return (/**
     * @param {TItem} a
     * @param {TItem} b
     * @return {number}
     */
    (a, b) => -comparator(a, b));
}
exports.reverseOrder = reverseOrder;
/**
 * Returns a new comparator that treats `undefined` as the smallest value.
 * All other values are compared using the given comparator.
 * @template T
 * @param {function(T, T): number} comparator
 * @return {function((undefined|T), (undefined|T)): number}
 */
function compareUndefinedSmallest(comparator) {
    return (/**
     * @param {(undefined|T)} a
     * @param {(undefined|T)} b
     * @return {number}
     */
    (a, b) => {
        if (a === undefined) {
            return b === undefined
                ? CompareResult.neitherLessOrGreaterThan
                : CompareResult.lessThan;
        }
        else if (b === undefined) {
            return CompareResult.greaterThan;
        }
        return comparator(a, b);
    });
}
exports.compareUndefinedSmallest = compareUndefinedSmallest;
/**
 * @template T
 */
class ArrayQueue {
    /**
     * Constructs a queue that is backed by the given array. Runtime is O(1).
     * @public
     * @param {!ReadonlyArray<T>} items
     */
    constructor(items) {
        this.firstIdx = 0;
        this.items = items;
        this.lastIdx = this.items.length - 1;
    }
    /**
     * @public
     * @return {number}
     */
    get length() {
        return this.lastIdx - this.firstIdx + 1;
    }
    /**
     * Consumes elements from the beginning of the queue as long as the predicate returns true.
     * If no elements were consumed, `null` is returned. Has a runtime of O(result.length).
     * @public
     * @param {function(T): boolean} predicate
     * @return {(null|!Array<T>)}
     */
    takeWhile(predicate) {
        // P(k) := k <= this.lastIdx && predicate(this.items[k])
        // Find s := min { k | k >= this.firstIdx && !P(k) } and return this.data[this.firstIdx...s)
        // P(k) := k <= this.lastIdx && predicate(this.items[k])
        // Find s := min { k | k >= this.firstIdx && !P(k) } and return this.data[this.firstIdx...s)
        /** @type {number} */
        let startIdx = this.firstIdx;
        while (startIdx < this.items.length && predicate(this.items[startIdx])) {
            startIdx++;
        }
        /** @type {(null|!Array<T>)} */
        const result = startIdx === this.firstIdx
            ? null
            : this.items.slice(this.firstIdx, startIdx);
        this.firstIdx = startIdx;
        return result;
    }
    /**
     * Consumes elements from the end of the queue as long as the predicate returns true.
     * If no elements were consumed, `null` is returned.
     * The result has the same order as the underlying array!
     * @public
     * @param {function(T): boolean} predicate
     * @return {(null|!Array<T>)}
     */
    takeFromEndWhile(predicate) {
        // P(k) := this.firstIdx >= k && predicate(this.items[k])
        // Find s := max { k | k <= this.lastIdx && !P(k) } and return this.data(s...this.lastIdx]
        // P(k) := this.firstIdx >= k && predicate(this.items[k])
        // Find s := max { k | k <= this.lastIdx && !P(k) } and return this.data(s...this.lastIdx]
        /** @type {number} */
        let endIdx = this.lastIdx;
        while (endIdx >= 0 && predicate(this.items[endIdx])) {
            endIdx--;
        }
        /** @type {(null|!Array<T>)} */
        const result = endIdx === this.lastIdx
            ? null
            : this.items.slice(endIdx + 1, this.lastIdx + 1);
        this.lastIdx = endIdx;
        return result;
    }
    /**
     * @public
     * @return {(undefined|T)}
     */
    peek() {
        if (this.length === 0) {
            return undefined;
        }
        return this.items[this.firstIdx];
    }
    /**
     * @public
     * @return {(undefined|T)}
     */
    peekLast() {
        if (this.length === 0) {
            return undefined;
        }
        return this.items[this.lastIdx];
    }
    /**
     * @public
     * @return {(undefined|T)}
     */
    dequeue() {
        /** @type {T} */
        const result = this.items[this.firstIdx];
        this.firstIdx++;
        return result;
    }
    /**
     * @public
     * @return {(undefined|T)}
     */
    removeLast() {
        /** @type {T} */
        const result = this.items[this.lastIdx];
        this.lastIdx--;
        return result;
    }
    /**
     * @public
     * @param {number} count
     * @return {!Array<T>}
     */
    takeCount(count) {
        /** @type {!Array<T>} */
        const result = this.items.slice(this.firstIdx, this.firstIdx + count);
        this.firstIdx += count;
        return result;
    }
}
exports.ArrayQueue = ArrayQueue;
/* istanbul ignore if */
if (false) {
    /**
     * @const {!ReadonlyArray<T>}
     * @private
     */
    ArrayQueue.prototype.items;
    /**
     * @type {number}
     * @private
     */
    ArrayQueue.prototype.firstIdx;
    /**
     * @type {number}
     * @private
     */
    ArrayQueue.prototype.lastIdx;
}
/**
 * This class is faster than an iterator and array for lazy computed data.
 * @template T
 */
class CallbackIterable {
    /**
     * @public
     * @param {function(function(T): boolean): void} iterate
     */
    constructor(iterate) {
        this.iterate = iterate;
    }
    /**
     * @public
     * @param {function(T): void} handler
     * @return {void}
     */
    forEach(handler) {
        this.iterate((/**
         * @param {T} item
         * @return {boolean}
         */
        (item) => {
            handler(item);
            return true;
        }));
    }
    /**
     * @public
     * @return {!Array<T>}
     */
    toArray() {
        /** @type {!Array<T>} */
        const result = [];
        this.iterate((/**
         * @param {T} item
         * @return {boolean}
         */
        (item) => {
            result.push(item);
            return true;
        }));
        return result;
    }
    /**
     * @public
     * @param {function(T): boolean} predicate
     * @return {!CallbackIterable}
     */
    filter(predicate) {
        return new CallbackIterable((/**
         * @param {function(T): boolean} cb
         * @return {void}
         */
        (cb) => this.iterate((/**
         * @param {T} item
         * @return {boolean}
         */
        (item) => (predicate(item) ? cb(item) : true)))));
    }
    /**
     * @public
     * @template TResult
     * @param {function(T): TResult} mapFn
     * @return {!CallbackIterable<TResult>}
     */
    map(mapFn) {
        return new CallbackIterable((/**
         * @param {function(TResult): boolean} cb
         * @return {void}
         */
        (cb) => this.iterate((/**
         * @param {T} item
         * @return {boolean}
         */
        (item) => cb(mapFn(item))))));
    }
    /**
     * @public
     * @param {function(T): boolean} predicate
     * @return {boolean}
     */
    some(predicate) {
        /** @type {boolean} */
        let result = false;
        this.iterate((/**
         * @param {T} item
         * @return {boolean}
         */
        (item) => {
            result = predicate(item);
            return !result;
        }));
        return result;
    }
    /**
     * @public
     * @param {function(T): boolean} predicate
     * @return {(undefined|T)}
     */
    findFirst(predicate) {
        /** @type {(undefined|T)} */
        let result;
        this.iterate((/**
         * @param {T} item
         * @return {boolean}
         */
        (item) => {
            if (predicate(item)) {
                result = item;
                return false;
            }
            return true;
        }));
        return result;
    }
    /**
     * @public
     * @param {function(T): boolean} predicate
     * @return {(undefined|T)}
     */
    findLast(predicate) {
        /** @type {(undefined|T)} */
        let result;
        this.iterate((/**
         * @param {T} item
         * @return {boolean}
         */
        (item) => {
            if (predicate(item)) {
                result = item;
            }
            return true;
        }));
        return result;
    }
    /**
     * @public
     * @param {function(T, T): number} comparator
     * @return {(undefined|T)}
     */
    findLastMaxBy(comparator) {
        /** @type {(undefined|T)} */
        let result;
        /** @type {boolean} */
        let first = true;
        this.iterate((/**
         * @param {T} item
         * @return {boolean}
         */
        (item) => {
            if (first || CompareResult.isGreaterThan(comparator(item, (/** @type {T} */ (result))))) {
                first = false;
                result = item;
            }
            return true;
        }));
        return result;
    }
}
exports.CallbackIterable = CallbackIterable;
CallbackIterable.empty = new CallbackIterable((/**
 * @param {function(?): boolean} _callback
 * @return {void}
 */
(_callback) => { }));
/* istanbul ignore if */
if (false) {
    /**
     * @const {!CallbackIterable<?>}
     * @public
     */
    CallbackIterable.empty;
    /**
     * Calls the callback for every item.
     * Stops when the callback returns false.
     * @const {function(function(T): boolean): void}
     * @public
     */
    CallbackIterable.prototype.iterate;
}
/**
 * Represents a re-arrangement of items in an array.
 */
class Permutation {
    /**
     * @public
     * @param {!ReadonlyArray<number>} _indexMap
     */
    constructor(_indexMap) {
        this._indexMap = _indexMap;
    }
    /**
     * Returns a permutation that sorts the given array according to the given compare function.
     * @public
     * @template T
     * @param {!ReadonlyArray<T>} arr
     * @param {function(T, T): number} compareFn
     * @return {!Permutation}
     */
    static createSortPermutation(arr, compareFn) {
        /** @type {!Array<number>} */
        const sortIndices = Array.from(arr.keys()).sort((/**
         * @param {number} index1
         * @param {number} index2
         * @return {number}
         */
        (index1, index2) => compareFn(arr[index1], arr[index2])));
        return new Permutation(sortIndices);
    }
    /**
     * Returns a new array with the elements of the given array re-arranged according to this permutation.
     * @public
     * @template T
     * @param {!ReadonlyArray<T>} arr
     * @return {!Array<T>}
     */
    apply(arr) {
        return arr.map((/**
         * @param {T} _
         * @param {number} index
         * @return {T}
         */
        (_, index) => arr[this._indexMap[index]]));
    }
    /**
     * Returns a new permutation that undoes the re-arrangement of this permutation.
     * @public
     * @return {!Permutation}
     */
    inverse() {
        /** @type {!Array<number>} */
        const inverseIndexMap = this._indexMap.slice();
        for (let i = 0; i < this._indexMap.length; i++) {
            inverseIndexMap[this._indexMap[i]] = i;
        }
        return new Permutation(inverseIndexMap);
    }
}
exports.Permutation = Permutation;
/* istanbul ignore if */
if (false) {
    /**
     * @const {!ReadonlyArray<number>}
     * @private
     */
    Permutation.prototype._indexMap;
}
/**
 * Asynchronous variant of `Array.find()`, returning the first element in
 * the array for which the predicate returns true.
 *
 * This implementation does not bail early and waits for all promises to
 * resolve before returning.
 * @template T
 * @param {!ReadonlyArray<T>} array
 * @param {function(T, number): !Promise<boolean>} predicate
 * @return {!Promise<(undefined|T)>}
 */
async function findAsync(array, predicate) {
    /** @type {!Array<{element: T, ok: boolean}>} */
    const results = await Promise.all(array.map((/**
     * @param {T} element
     * @param {number} index
     * @return {!Promise<{element: T, ok: boolean}>}
     */
    async (element, index) => ({
        element,
        ok: await predicate(element, index),
    }))));
    return results.find((/**
     * @param {{element: T, ok: boolean}} r
     * @return {boolean}
     */
    (r) => r.ok))?.element;
}
exports.findAsync = findAsync;
/**
 * @param {!ReadonlyArray<number>} array
 * @return {number}
 */
function sum(array) {
    return array.reduce((/**
     * @param {number} acc
     * @param {number} value
     * @return {number}
     */
    (acc, value) => acc + value), 0);
}
exports.sum = sum;
/**
 * @template T
 * @param {!ReadonlyArray<T>} array
 * @param {function(T): number} selector
 * @return {number}
 */
function sumBy(array, selector) {
    return array.reduce((/**
     * @param {number} acc
     * @param {T} value
     * @return {number}
     */
    (acc, value) => acc + selector(value)), 0);
}
exports.sumBy = sumBy;
