/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/gemini_coder/agent_ui_toolkit/src/vscode/base/common/iterator.ts
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
goog.module('google3.third_party.gemini_coder.agent_ui_toolkit.src.vscode.base.common.iterator');
var module = module || { id: 'third_party/gemini_coder/agent_ui_toolkit/src/vscode/base/common/iterator.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_types_1 = goog.requireType("google3.third_party.gemini_coder.agent_ui_toolkit.src.vscode.base.common.types");
const types_1 = goog.require('google3.third_party.gemini_coder.agent_ui_toolkit.src.vscode.base.common.types');
/** @type {{is: function(*): boolean, empty: function(): !ReadonlyArray<?>, single: function(?): !Iterable<?, ?, ?>, wrap: function((?|!Iterable<?, ?, ?>)): !Iterable<?, ?, ?>, from: function((undefined|null|!Iterable<?, ?, ?>)): !Iterable<?, ?, ?>, reverse: function(!ReadonlyArray<?>): !Iterable<?, ?, ?>, isEmpty: function((undefined|null|!Iterable<?, ?, ?>)): boolean, first: function(!Iterable<?, ?, ?>): (undefined|?), some: function(!Iterable<?, ?, ?>, function(?, number): *): boolean, every: function(!Iterable<?, ?, ?>, function(?, number): *): boolean, find: function(!Iterable<?, ?, ?>, function(?): boolean): (undefined|?), filter: function(!Iterable<?, ?, ?>, function(?): boolean): !Iterable<?, ?, ?>, map: function(!Iterable<?, ?, ?>, function(?, number): ?): !Iterable<?, ?, ?>, flatMap: function(!Iterable<?, ?, ?>, function(?, number): !Iterable<?, ?, ?>): !Iterable<?, ?, ?>, concat: function(...(?|!Iterable<?, ?, ?>)): !Iterable<?, ?, ?>, reduce: function(!Iterable<?, ?, ?>, function(?, ?): ?, ?): ?, length: function(!Iterable<?, ?, ?>): number, slice: function(!ReadonlyArray<?>, number, number=): !Iterable<?, ?, ?>, consume: function(!Iterable<?, ?, ?>, number=): !Array<?>, asyncToArray: function(!AsyncIterable<?, ?, ?>): !Promise<!Array<?>>, asyncToArrayFlat: function(!AsyncIterable<!Array<?>, ?, ?>): !Promise<!Array<?>>}} */
exports.Iterable = ((/**
 * @return {{is: function(*): boolean, empty: function(): !ReadonlyArray<?>, single: function(?): !Iterable<?, ?, ?>, wrap: function((?|!Iterable<?, ?, ?>)): !Iterable<?, ?, ?>, from: function((undefined|null|!Iterable<?, ?, ?>)): !Iterable<?, ?, ?>, reverse: function(!ReadonlyArray<?>): !Iterable<?, ?, ?>, isEmpty: function((undefined|null|!Iterable<?, ?, ?>)): boolean, first: function(!Iterable<?, ?, ?>): (undefined|?), some: function(!Iterable<?, ?, ?>, function(?, number): *): boolean, every: function(!Iterable<?, ?, ?>, function(?, number): *): boolean, find: function(!Iterable<?, ?, ?>, function(?): boolean): (undefined|?), filter: function(!Iterable<?, ?, ?>, function(?): boolean): !Iterable<?, ?, ?>, map: function(!Iterable<?, ?, ?>, function(?, number): ?): !Iterable<?, ?, ?>, flatMap: function(!Iterable<?, ?, ?>, function(?, number): !Iterable<?, ?, ?>): !Iterable<?, ?, ?>, concat: function(...(?|!Iterable<?, ?, ?>)): !Iterable<?, ?, ?>, reduce: function(!Iterable<?, ?, ?>, function(?, ?): ?, ?): ?, length: function(!Iterable<?, ?, ?>): number, slice: function(!ReadonlyArray<?>, number, number=): !Iterable<?, ?, ?>, consume: function(!Iterable<?, ?, ?>, number=): !Array<?>, asyncToArray: function(!AsyncIterable<?, ?, ?>): !Promise<!Array<?>>, asyncToArrayFlat: function(!AsyncIterable<!Array<?>, ?, ?>): !Promise<!Array<?>>}}
 */
() => {
    /**
     * @template T
     * @param {*} thing
     * @return {boolean}
     */
    function is(thing) {
        return (!!thing &&
            typeof thing === 'object' &&
            typeof ((/** @type {!Iterable<?, ?, ?>} */ (thing)))[Symbol.iterator] === 'function');
    }
    /** @type {!Iterable<?, ?, ?>} */
    const _empty = Object.freeze([]);
    /**
     * @template T
     * @return {!ReadonlyArray<?>}
     */
    function empty() {
        return (/** @type {!ReadonlyArray<?>} */ (_empty));
    }
    /**
     * @template T
     * @param {?} element
     * @return {!Iterable<?, ?, ?>}
     */
    function* single(element) {
        yield element;
    }
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
    /**
     * @template T
     * @param {(undefined|null|!Iterable<?, ?, ?>)} iterable
     * @return {!Iterable<?, ?, ?>}
     */
    function from(iterable) {
        return iterable ?? ((/** @type {!Iterable<?, ?, ?>} */ (_empty)));
    }
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
    /**
     * @template T
     * @param {(undefined|null|!Iterable<?, ?, ?>)} iterable
     * @return {boolean}
     */
    function isEmpty(iterable) {
        return !iterable || iterable[Symbol.iterator]().next().done === true;
    }
    /**
     * @template T
     * @param {!Iterable<?, ?, ?>} iterable
     * @return {(undefined|?)}
     */
    function first(iterable) {
        return iterable[Symbol.iterator]().next().value;
    }
    /**
     * @template T
     * @param {!Iterable<?, ?, ?>} iterable
     * @param {function(?, number): *} predicate
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
    /**
     * @template T
     * @param {!Iterable<?, ?, ?>} iterable
     * @param {function(?, number): *} predicate
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
    /**
     * @template T
     * @param {!Iterable<?, ?, ?>} iterable
     * @param {function(?): boolean} predicate
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
    /**
     * @template T
     * @param {!Iterable<?, ?, ?>} iterable
     * @param {function(?): boolean} predicate
     * @return {!Iterable<?, ?, ?>}
     */
    function* filter(iterable, predicate) {
        for (const element of iterable) {
            if (predicate(element)) {
                yield element;
            }
        }
    }
    /**
     * @template T, R
     * @param {!Iterable<?, ?, ?>} iterable
     * @param {function(?, number): ?} fn
     * @return {!Iterable<?, ?, ?>}
     */
    function* map(iterable, fn) {
        /** @type {number} */
        let index = 0;
        for (const element of iterable) {
            yield fn(element, index++);
        }
    }
    /**
     * @template T, R
     * @param {!Iterable<?, ?, ?>} iterable
     * @param {function(?, number): !Iterable<?, ?, ?>} fn
     * @return {!Iterable<?, ?, ?>}
     */
    function* flatMap(iterable, fn) {
        /** @type {number} */
        let index = 0;
        for (const element of iterable) {
            yield* fn(element, index++);
        }
    }
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
    /**
     * @template T, R
     * @param {!Iterable<?, ?, ?>} iterable
     * @param {function(?, ?): ?} reducer
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
                return [consumed, empty()];
            }
            consumed.push((/** @type {!IteratorYieldResult<?>} */ (next)).value);
        }
        return [
            consumed,
            {
                /**
                 * @public
                 * @return {!Iterator<?, ?, ?>}
                 */
                [Symbol.iterator]() {
                    return iterator;
                },
            },
        ];
    }
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
    return {
        is,
        empty,
        single,
        wrap,
        from,
        reverse,
        isEmpty,
        first,
        some,
        every,
        find,
        filter,
        map,
        flatMap,
        concat,
        reduce,
        length,
        slice,
        consume,
        asyncToArray,
        asyncToArrayFlat,
    };
}))();
