/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/antigravity/src/vs/base/common/iterator.ts
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
goog.module('google3.third_party.antigravity.src.vs.base.common.iterator');
var module = module || { id: 'third_party/antigravity/src/vs/base/common/iterator.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_types_1 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.types");
const types_1 = goog.require('google3.third_party.antigravity.src.vs.base.common.types');
var Iterable;
(function (Iterable) {
    /**
     * @template T
     * @param {*} thing
     * @return {boolean}
     */
    function is(thing) {
        return !!thing && typeof thing === 'object' && typeof ((/** @type {!Iterable<?, ?, ?>} */ (thing)))[Symbol.iterator] === 'function';
    }
    Iterable.is = is;
    /** @type {!Iterable<?, ?, ?>} */
    const _empty = Object.freeze([]);
    /**
     * @template T
     * @return {!ReadonlyArray<?>}
     */
    function empty() {
        return (/** @type {!ReadonlyArray<?>} */ (_empty));
    }
    Iterable.empty = empty;
    /**
     * @template T
     * @param {?} element
     * @return {!Iterable<?, ?, ?>}
     */
    function* single(element) {
        yield element;
    }
    Iterable.single = single;
    /**
     * @template T
     * @param {(?|!Iterable<?, ?, ?>)} iterableOrElement
     * @return {!Iterable<?, ?, ?>}
     */
    function wrap(iterableOrElement) {
        if (is(iterableOrElement)) {
            return iterableOrElement;
        }
        else {
            return single(iterableOrElement);
        }
    }
    Iterable.wrap = wrap;
    /**
     * @template T
     * @param {(undefined|null|!Iterable<?, ?, ?>)} iterable
     * @return {!Iterable<?, ?, ?>}
     */
    function from(iterable) {
        return iterable ?? ((/** @type {!Iterable<?, ?, ?>} */ (_empty)));
    }
    Iterable.from = from;
    /**
     * @template T
     * @param {!ReadonlyArray<?>} array
     * @return {!Iterable<?, ?, ?>}
     */
    function* reverse(array) {
        for (let i = array.length - 1; i >= 0; i--) {
            yield array[i];
        }
    }
    Iterable.reverse = reverse;
    /**
     * @template T
     * @param {(undefined|null|!Iterable<?, ?, ?>)} iterable
     * @return {boolean}
     */
    function isEmpty(iterable) {
        return !iterable || iterable[Symbol.iterator]().next().done === true;
    }
    Iterable.isEmpty = isEmpty;
    /**
     * @template T
     * @param {!Iterable<?, ?, ?>} iterable
     * @return {(undefined|?)}
     */
    function first(iterable) {
        return iterable[Symbol.iterator]().next().value;
    }
    Iterable.first = first;
    /**
     * @template T
     * @param {!Iterable<?, ?, ?>} iterable
     * @param {?} predicate
     * @return {boolean}
     */
    function some(iterable, predicate) {
        /** @type {number} */
        let i = 0;
        for (const element of iterable) {
            if (predicate(element, i++)) {
                return true;
            }
        }
        return false;
    }
    Iterable.some = some;
    /**
     * @template T
     * @param {!Iterable<?, ?, ?>} iterable
     * @param {?} predicate
     * @return {boolean}
     */
    function every(iterable, predicate) {
        /** @type {number} */
        let i = 0;
        for (const element of iterable) {
            if (!predicate(element, i++)) {
                return false;
            }
        }
        return true;
    }
    Iterable.every = every;
    /**
     * @template T
     * @param {!Iterable<?, ?, ?>} iterable
     * @param {?} predicate
     * @return {(undefined|?)}
     */
    function find(iterable, predicate) {
        for (const element of iterable) {
            if (predicate(element)) {
                return element;
            }
        }
        return undefined;
    }
    Iterable.find = find;
    /**
     * @template T
     * @param {!Iterable<?, ?, ?>} iterable
     * @param {?} predicate
     * @return {!Iterable<?, ?, ?>}
     */
    function* filter(iterable, predicate) {
        for (const element of iterable) {
            if (predicate(element)) {
                yield element;
            }
        }
    }
    Iterable.filter = filter;
    /**
     * @template T, R
     * @param {!Iterable<?, ?, ?>} iterable
     * @param {?} fn
     * @return {!Iterable<?, ?, ?>}
     */
    function* map(iterable, fn) {
        /** @type {number} */
        let index = 0;
        for (const element of iterable) {
            yield fn(element, index++);
        }
    }
    Iterable.map = map;
    /**
     * @template T, R
     * @param {!Iterable<?, ?, ?>} iterable
     * @param {?} fn
     * @return {!Iterable<?, ?, ?>}
     */
    function* flatMap(iterable, fn) {
        /** @type {number} */
        let index = 0;
        for (const element of iterable) {
            yield* fn(element, index++);
        }
    }
    Iterable.flatMap = flatMap;
    /**
     * @template T
     * @param {...(?|!Iterable<?, ?, ?>)} iterables
     * @return {!Iterable<?, ?, ?>}
     */
    function* concat(...iterables) {
        for (const item of iterables) {
            if ((0, types_1.isIterable)(item)) {
                yield* item;
            }
            else {
                yield item;
            }
        }
    }
    Iterable.concat = concat;
    /**
     * @template T, R
     * @param {!Iterable<?, ?, ?>} iterable
     * @param {?} reducer
     * @param {?} initialValue
     * @return {?}
     */
    function reduce(iterable, reducer, initialValue) {
        /** @type {?} */
        let value = initialValue;
        for (const element of iterable) {
            value = reducer(value, element);
        }
        return value;
    }
    Iterable.reduce = reduce;
    /**
     * @template T
     * @param {!Iterable<?, ?, ?>} iterable
     * @return {number}
     */
    function length(iterable) {
        /** @type {number} */
        let count = 0;
        for (const _ of iterable) {
            count++;
        }
        return count;
    }
    Iterable.length = length;
    /**
     * Returns an iterable slice of the array, with the same semantics as `array.slice()`.
     * @template T
     * @param {!ReadonlyArray<?>} arr
     * @param {number} from
     * @param {number=} to
     * @return {!Iterable<?, ?, ?>}
     */
    function* slice(arr, from, to = arr.length) {
        if (from < -arr.length) {
            from = 0;
        }
        if (from < 0) {
            from += arr.length;
        }
        if (to < 0) {
            to += arr.length;
        }
        else if (to > arr.length) {
            to = arr.length;
        }
        for (; from < to; from++) {
            yield arr[from];
        }
    }
    Iterable.slice = slice;
    /**
     * Consumes `atMost` elements from iterable and returns the consumed elements,
     * and an iterable for the rest of the elements.
     * @template T
     * @param {!Iterable<?, ?, ?>} iterable
     * @param {number=} atMost
     * @return {!Array<?>}
     */
    function consume(iterable, atMost = Number.POSITIVE_INFINITY) {
        /** @type {!Array<?>} */
        const consumed = [];
        if (atMost === 0) {
            return [consumed, iterable];
        }
        /** @type {!Iterator<?, ?, ?>} */
        const iterator = iterable[Symbol.iterator]();
        for (let i = 0; i < atMost; i++) {
            /** @type {(!IteratorReturnResult<?>|!IteratorYieldResult<?>)} */
            const next = iterator.next();
            if (next.done) {
                return [consumed, Iterable.empty()];
            }
            consumed.push((/** @type {!IteratorYieldResult<?>} */ (next)).value);
        }
        return [consumed, { /**
                 * @public
                 * @return {!Iterator<?, ?, ?>}
                 */
                [Symbol.iterator]() { return iterator; } }];
    }
    Iterable.consume = consume;
    /**
     * @template T
     * @param {!AsyncIterable<?, ?, ?>} iterable
     * @return {!Promise<!Array<?>>}
     */
    async function asyncToArray(iterable) {
        /** @type {!Array<?>} */
        const result = [];
        for await (const item of iterable) {
            result.push(item);
        }
        return result;
    }
    Iterable.asyncToArray = asyncToArray;
    /**
     * @template T
     * @param {!AsyncIterable<!Array<?>, ?, ?>} iterable
     * @return {!Promise<!Array<?>>}
     */
    async function asyncToArrayFlat(iterable) {
        /** @type {!Array<?>} */
        let result = [];
        for await (const item of iterable) {
            result = result.concat(item);
        }
        return result;
    }
    Iterable.asyncToArrayFlat = asyncToArrayFlat;
})(Iterable || (Iterable = {}));
exports.Iterable = Iterable;
