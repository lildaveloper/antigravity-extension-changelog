goog.module('google3.third_party.gemini_coder.agent_ui_toolkit.src.vscode.base.common.map');
var module = module || { id: 'third_party/gemini_coder/agent_ui_toolkit/src/vscode/base/common/map.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
var _a, _b, _c;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/gemini_coder/agent_ui_toolkit/src/vscode/base/common/map.ts
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
const tsickle_uri_1 = goog.requireType("google3.third_party.gemini_coder.agent_ui_toolkit.src.vscode.base.common.uri");
/**
 * @template K, V
 * @param {!Map<K, V>} map
 * @param {K} key
 * @param {V} value
 * @return {V}
 */
function getOrSet(map, key, value) {
    /** @type {(undefined|V)} */
    let result = map.get(key);
    if (result === undefined) {
        result = value;
        map.set(key, result);
    }
    return result;
}
exports.getOrSet = getOrSet;
/**
 * @template K, V
 * @param {!Map<K, V>} map
 * @return {string}
 */
function mapToString(map) {
    /** @type {!Array<string>} */
    const entries = [];
    map.forEach((/**
     * @param {V} value
     * @param {K} key
     * @return {void}
     */
    (value, key) => {
        entries.push(`${key} => ${value}`);
    }));
    return `Map(${map.size}) {${entries.join(', ')}}`;
}
exports.mapToString = mapToString;
/**
 * @template K
 * @param {!Set<K>} set
 * @return {string}
 */
function setToString(set) {
    /** @type {!Array<K>} */
    const entries = [];
    set.forEach((/**
     * @param {K} value
     * @return {void}
     */
    (value) => {
        entries.push(value);
    }));
    return `Set(${set.size}) {${entries.join(', ')}}`;
}
exports.setToString = setToString;
/**
 * @record
 */
function ResourceMapKeyFn() { }
/**
 * @template T
 */
class ResourceMapEntry {
    /**
     * @public
     * @param {!tsickle_uri_1.URI} uri
     * @param {T} value
     */
    constructor(uri, value) {
        this.uri = uri;
        this.value = value;
    }
}
/* istanbul ignore if */
if (false) {
    /**
     * @const {!tsickle_uri_1.URI}
     * @public
     */
    ResourceMapEntry.prototype.uri;
    /**
     * @const {T}
     * @public
     */
    ResourceMapEntry.prototype.value;
}
/**
 * @template T
 * @param {(undefined|!ResourceMapKeyFn|!ResourceMap<T>|!ReadonlyArray<!Array<?>>)} arg
 * @return {boolean}
 */
function isEntries(arg) {
    return Array.isArray(arg);
}
/**
 * @template T
 * @implements {Map<!tsickle_uri_1.URI, T>}
 */
class ResourceMap {
    /**
     * @public
     * @param {(undefined|!ResourceMapKeyFn|!ResourceMap|!ReadonlyArray<!Array<?>>)=} arg
     * @param {(undefined|!ResourceMapKeyFn)=} toKey
     */
    constructor(arg, toKey) {
        this[_a] = 'ResourceMap';
        if (arg instanceof ResourceMap) {
            this.map = new Map((/** @type {!ResourceMap} */ (arg)).map);
            this.toKey = toKey ?? ResourceMap.defaultToKey;
        }
        else if (isEntries(arg)) {
            this.map = new Map();
            this.toKey = toKey ?? ResourceMap.defaultToKey;
            for (const [resource__tsickle_destructured_1, value__tsickle_destructured_2] of arg) {
                const resource = /** @type {!tsickle_uri_1.URI} */ (resource__tsickle_destructured_1);
                const value = /** @type {T} */ (value__tsickle_destructured_2);
                this.set(resource, value);
            }
        }
        else {
            this.map = new Map();
            this.toKey = arg ?? ResourceMap.defaultToKey;
        }
    }
    /**
     * @public
     * @template THIS
     * @this {THIS}
     * @param {!tsickle_uri_1.URI} resource
     * @param {T} value
     * @return {THIS}
     */
    set(resource, value) {
        (/** @type {!ResourceMap} */ (this)).map.set((/** @type {!ResourceMap} */ (this)).toKey(resource), new ResourceMapEntry(resource, value));
        return (/** @type {!ResourceMap} */ (this));
    }
    /**
     * @public
     * @param {!tsickle_uri_1.URI} resource
     * @return {(undefined|T)}
     */
    get(resource) {
        return this.map.get(this.toKey(resource))?.value;
    }
    /**
     * @public
     * @param {!tsickle_uri_1.URI} resource
     * @return {boolean}
     */
    has(resource) {
        return this.map.has(this.toKey(resource));
    }
    /**
     * @public
     * @return {number}
     */
    get size() {
        return this.map.size;
    }
    /**
     * @public
     * @return {void}
     */
    clear() {
        this.map.clear();
    }
    /**
     * @public
     * @param {!tsickle_uri_1.URI} resource
     * @return {boolean}
     */
    delete(resource) {
        return this.map.delete(this.toKey(resource));
    }
    /**
     * @public
     * @param {function(T, !tsickle_uri_1.URI, !Map<!tsickle_uri_1.URI, T>): void} clb
     * @param {(undefined|!Object)=} thisArg
     * @return {void}
     */
    forEach(clb, thisArg) {
        if (typeof thisArg !== 'undefined') {
            clb = clb.bind(thisArg);
        }
        for (const [___tsickle_destructured_3, entry__tsickle_destructured_4] of this.map) {
            const _ = /** @type {string} */ (___tsickle_destructured_3);
            const entry = /** @type {!ResourceMapEntry<T>} */ (entry__tsickle_destructured_4);
            clb(entry.value, entry.uri, (/** @type {!Map<!tsickle_uri_1.URI, T>} */ ((/** @type {*} */ (this)))));
        }
    }
    /**
     * @public
     * @return {!MapIterator<T>}
     */
    *values() {
        for (const entry of this.map.values()) {
            yield entry.value;
        }
    }
    /**
     * @public
     * @return {!MapIterator<!tsickle_uri_1.URI>}
     */
    *keys() {
        for (const entry of this.map.values()) {
            yield entry.uri;
        }
    }
    /**
     * @public
     * @return {!MapIterator<!Array<?>>}
     */
    *entries() {
        for (const entry of this.map.values()) {
            yield [entry.uri, entry.value];
        }
    }
    /**
     * @public
     * @return {!MapIterator<!Array<?>>}
     */
    *[(_a = Symbol.toStringTag, Symbol.iterator)]() {
        for (const [, entry__tsickle_destructured_5] of this.map) {
            const entry = /** @type {!ResourceMapEntry<T>} */ (entry__tsickle_destructured_5);
            yield [entry.uri, entry.value];
        }
    }
}
exports.ResourceMap = ResourceMap;
ResourceMap.defaultToKey = (/**
 * @param {!tsickle_uri_1.URI} resource
 * @return {string}
 */
(resource) => resource.toString());
/* istanbul ignore if */
if (false) {
    /**
     * @const {function(!tsickle_uri_1.URI): string}
     * @private
     */
    ResourceMap.defaultToKey;
    /* Skipping unnamed member:
    readonly [Symbol.toStringTag] = 'ResourceMap';*/
    /**
     * @const {!Map<string, !ResourceMapEntry<T>>}
     * @private
     */
    ResourceMap.prototype.map;
    /**
     * @const {!ResourceMapKeyFn}
     * @private
     */
    ResourceMap.prototype.toKey;
}
/**
 * @implements {Set<!tsickle_uri_1.URI>}
 */
class ResourceSet {
    /**
     * @public
     * @param {(undefined|!ResourceMapKeyFn|!ReadonlyArray<!tsickle_uri_1.URI>)=} entriesOrKey
     * @param {(undefined|!ResourceMapKeyFn)=} toKey
     */
    constructor(entriesOrKey, toKey) {
        this[_b] = 'ResourceSet';
        if (!entriesOrKey || typeof entriesOrKey === 'function') {
            this._map = new ResourceMap(entriesOrKey);
        }
        else {
            this._map = new ResourceMap(toKey);
            (/** @type {!ReadonlyArray<!tsickle_uri_1.URI>} */ (entriesOrKey)).forEach(this.add, this);
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
     * @param {!tsickle_uri_1.URI} value
     * @return {THIS}
     */
    add(value) {
        (/** @type {!ResourceSet} */ (this))._map.set(value, value);
        return (/** @type {!ResourceSet} */ (this));
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
     * @param {!tsickle_uri_1.URI} value
     * @return {boolean}
     */
    delete(value) {
        return this._map.delete(value);
    }
    /**
     * @public
     * @param {function(!tsickle_uri_1.URI, !tsickle_uri_1.URI, !Set<!tsickle_uri_1.URI>): void} callbackfn
     * @param {*=} thisArg
     * @return {void}
     */
    forEach(callbackfn, thisArg) {
        this._map.forEach((/**
         * @param {!tsickle_uri_1.URI} _value
         * @param {!tsickle_uri_1.URI} key
         * @return {?}
         */
        (_value, key) => callbackfn.call(thisArg, key, key, (/** @type {!Set<!tsickle_uri_1.URI>} */ ((/** @type {*} */ (this)))))));
    }
    /**
     * @public
     * @param {!tsickle_uri_1.URI} value
     * @return {boolean}
     */
    has(value) {
        return this._map.has(value);
    }
    /**
     * @public
     * @return {!SetIterator<!Array<?>>}
     */
    entries() {
        return (/** @type {!SetIterator<!Array<?>>} */ ((/** @type {*} */ (this._map.entries()))));
    }
    /**
     * @public
     * @return {!SetIterator<!tsickle_uri_1.URI>}
     */
    keys() {
        return (/** @type {!SetIterator<!tsickle_uri_1.URI>} */ ((/** @type {*} */ (this._map.keys()))));
    }
    /**
     * @public
     * @return {!SetIterator<!tsickle_uri_1.URI>}
     */
    values() {
        return (/** @type {!SetIterator<!tsickle_uri_1.URI>} */ ((/** @type {*} */ (this._map.keys()))));
    }
    /**
     * @public
     * @return {!SetIterator<!tsickle_uri_1.URI>}
     */
    [(_b = Symbol.toStringTag, Symbol.iterator)]() {
        return this.keys();
    }
    // ES2024 Set methods
    /**
     * @public
     * @template U
     * @param {!ReadonlySet<U>} other
     * @return {!Set<(!tsickle_uri_1.URI|U)>}
     */
    union(other) {
        /** @type {!Set<(!tsickle_uri_1.URI|U)>} */
        const result = new Set();
        for (const elem of this) {
            result.add(elem);
        }
        for (const elem of Array.from({ [Symbol.iterator]: (/**
             * @return {!SetIterator<U>}
             */
            () => other.keys()) })) {
            result.add(elem);
        }
        return result;
    }
    /**
     * @public
     * @template U
     * @param {!ReadonlySet<U>} other
     * @return {!Set<?>}
     */
    intersection(other) {
        /** @type {!Set<?>} */
        const result = new Set();
        for (const elem of this) {
            if (other.has((/** @type {U} */ ((/** @type {*} */ (elem)))))) {
                result.add((/** @type {?} */ (elem)));
            }
        }
        return result;
    }
    /**
     * @public
     * @template U
     * @param {!ReadonlySet<U>} other
     * @return {!Set<!tsickle_uri_1.URI>}
     */
    difference(other) {
        /** @type {!Set<!tsickle_uri_1.URI>} */
        const result = new Set();
        for (const elem of this) {
            if (!other.has((/** @type {U} */ ((/** @type {*} */ (elem)))))) {
                result.add(elem);
            }
        }
        return result;
    }
    /**
     * @public
     * @template U
     * @param {!ReadonlySet<U>} other
     * @return {!Set<(!tsickle_uri_1.URI|U)>}
     */
    symmetricDifference(other) {
        /** @type {!Set<(!tsickle_uri_1.URI|U)>} */
        const result = new Set();
        for (const elem of this) {
            if (!other.has((/** @type {U} */ ((/** @type {*} */ (elem)))))) {
                result.add(elem);
            }
        }
        for (const elem of Array.from({ [Symbol.iterator]: (/**
             * @return {!SetIterator<U>}
             */
            () => other.keys()) })) {
            if (!this.has((/** @type {!tsickle_uri_1.URI} */ ((/** @type {*} */ (elem)))))) {
                result.add(elem);
            }
        }
        return result;
    }
    /**
     * @public
     * @param {!ReadonlySet<*>} other
     * @return {boolean}
     */
    isSubsetOf(other) {
        for (const elem of this) {
            if (!other.has(elem)) {
                return false;
            }
        }
        return true;
    }
    /**
     * @public
     * @param {!ReadonlySet<*>} other
     * @return {boolean}
     */
    isSupersetOf(other) {
        for (const elem of Array.from({ [Symbol.iterator]: (/**
             * @return {!SetIterator<*>}
             */
            () => other.keys()) })) {
            if (!this.has((/** @type {!tsickle_uri_1.URI} */ ((/** @type {*} */ (elem)))))) {
                return false;
            }
        }
        return true;
    }
    /**
     * @public
     * @param {!ReadonlySet<*>} other
     * @return {boolean}
     */
    isDisjointFrom(other) {
        for (const elem of this) {
            if (other.has(elem)) {
                return false;
            }
        }
        return true;
    }
}
exports.ResourceSet = ResourceSet;
/* istanbul ignore if */
if (false) {
    /* Skipping unnamed member:
    readonly [Symbol.toStringTag]: string = 'ResourceSet';*/
    /**
     * @const {!ResourceMap<!tsickle_uri_1.URI>}
     * @private
     */
    ResourceSet.prototype._map;
}
/**
 * @record
 * @template K, V
 */
function Item() { }
/* istanbul ignore if */
if (false) {
    /**
     * @type {(undefined|!Item)}
     * @public
     */
    Item.prototype.previous;
    /**
     * @type {(undefined|!Item)}
     * @public
     */
    Item.prototype.next;
    /**
     * @type {K}
     * @public
     */
    Item.prototype.key;
    /**
     * @type {V}
     * @public
     */
    Item.prototype.value;
}
/** @enum {number} */
const Touch = {
    None: 0,
    AsOld: 1,
    AsNew: 2,
};
exports.Touch = Touch;
/**
 * @template K, V
 * @implements {Map<K, V>}
 */
class LinkedMap {
    /**
     * @public
     */
    constructor() {
        this[_c] = 'LinkedMap';
        this._map = new Map();
        this._head = undefined;
        this._tail = undefined;
        this._size = 0;
        this._state = 0;
    }
    /**
     * @public
     * @return {void}
     */
    clear() {
        this._map.clear();
        this._head = undefined;
        this._tail = undefined;
        this._size = 0;
        this._state++;
    }
    /**
     * @public
     * @return {boolean}
     */
    isEmpty() {
        return !this._head && !this._tail;
    }
    /**
     * @public
     * @return {number}
     */
    get size() {
        return this._size;
    }
    /**
     * @public
     * @return {(undefined|V)}
     */
    get first() {
        return this._head?.value;
    }
    /**
     * @public
     * @return {(undefined|V)}
     */
    get last() {
        return this._tail?.value;
    }
    /**
     * @public
     * @param {K} key
     * @return {boolean}
     */
    has(key) {
        return this._map.has(key);
    }
    /**
     * @public
     * @param {K} key
     * @param {!Touch=} touch
     * @return {(undefined|V)}
     */
    get(key, touch = Touch.None) {
        /** @type {(undefined|!Item<K, V>)} */
        const item = this._map.get(key);
        if (!item) {
            return undefined;
        }
        if (touch !== Touch.None) {
            this.touch(item, touch);
        }
        return item.value;
    }
    /**
     * @public
     * @template THIS
     * @this {THIS}
     * @param {K} key
     * @param {V} value
     * @param {!Touch=} touch
     * @return {THIS}
     */
    set(key, value, touch = Touch.None) {
        /** @type {(undefined|!Item<K, V>)} */
        let item = (/** @type {!LinkedMap} */ (this))._map.get(key);
        if (item) {
            item.value = value;
            if (touch !== Touch.None) {
                (/** @type {!LinkedMap} */ (this)).touch(item, touch);
            }
        }
        else {
            item = { key, value, next: undefined, previous: undefined };
            switch (touch) {
                case Touch.None:
                    (/** @type {!LinkedMap} */ (this)).addItemLast(item);
                    break;
                case Touch.AsOld:
                    (/** @type {!LinkedMap} */ (this)).addItemFirst(item);
                    break;
                case Touch.AsNew:
                    (/** @type {!LinkedMap} */ (this)).addItemLast(item);
                    break;
                default:
                    (/** @type {!LinkedMap} */ (this)).addItemLast(item);
                    break;
            }
            (/** @type {!LinkedMap} */ (this))._map.set(key, item);
            (/** @type {!LinkedMap} */ (this))._size++;
        }
        return (/** @type {!LinkedMap} */ (this));
    }
    /**
     * @public
     * @param {K} key
     * @return {boolean}
     */
    delete(key) {
        return !!this.remove(key);
    }
    /**
     * @public
     * @param {K} key
     * @return {(undefined|V)}
     */
    remove(key) {
        /** @type {(undefined|!Item<K, V>)} */
        const item = this._map.get(key);
        if (!item) {
            return undefined;
        }
        this._map.delete(key);
        this.removeItem(item);
        this._size--;
        return item.value;
    }
    /**
     * @public
     * @return {(undefined|V)}
     */
    shift() {
        if (!this._head && !this._tail) {
            return undefined;
        }
        if (!this._head || !this._tail) {
            throw new Error('Invalid list');
        }
        /** @type {!Item<K, V>} */
        const item = this._head;
        this._map.delete(item.key);
        this.removeItem(item);
        this._size--;
        return item.value;
    }
    /**
     * @public
     * @param {function(V, K, !Map<K, V>): void} callbackfn
     * @param {*=} thisArg
     * @return {void}
     */
    forEach(callbackfn, thisArg) {
        /** @type {number} */
        const state = this._state;
        /** @type {(undefined|!Item<K, V>)} */
        let current = this._head;
        while (current) {
            if (thisArg) {
                callbackfn.bind(thisArg)(current.value, current.key, (/** @type {!Map<K, V>} */ ((/** @type {*} */ (this)))));
            }
            else {
                callbackfn(current.value, current.key, (/** @type {!Map<K, V>} */ ((/** @type {*} */ (this)))));
            }
            if (this._state !== state) {
                throw new Error(`LinkedMap got modified during iteration.`);
            }
            current = current.next;
        }
    }
    /**
     * @public
     * @return {!MapIterator<K>}
     */
    keys() {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        /** @type {!LinkedMap} */
        const map = this;
        /** @type {number} */
        const state = this._state;
        /** @type {(undefined|!Item<K, V>)} */
        let current = this._head;
        /** @type {!MapIterator<K>} */
        const iterator = (/** @type {!MapIterator<K>} */ ({
            /**
             * @public
             * @return {!MapIterator<K>}
             */
            [Symbol.iterator]() {
                return iterator;
            },
            /**
             * @public
             * @return {(!IteratorReturnResult<?>|!IteratorYieldResult<K>)}
             */
            next() {
                if (map._state !== state) {
                    throw new Error(`LinkedMap got modified during iteration.`);
                }
                if (current) {
                    /** @type {{value: K, done: boolean}} */
                    const result = { value: current.key, done: false };
                    current = current.next;
                    return result;
                }
                else {
                    return { value: undefined, done: true };
                }
            },
        }));
        return iterator;
    }
    /**
     * @public
     * @return {!MapIterator<V>}
     */
    values() {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        /** @type {!LinkedMap} */
        const map = this;
        /** @type {number} */
        const state = this._state;
        /** @type {(undefined|!Item<K, V>)} */
        let current = this._head;
        /** @type {!MapIterator<V>} */
        const iterator = (/** @type {!MapIterator<V>} */ ({
            /**
             * @public
             * @return {!MapIterator<V>}
             */
            [Symbol.iterator]() {
                return iterator;
            },
            /**
             * @public
             * @return {(!IteratorReturnResult<?>|!IteratorYieldResult<V>)}
             */
            next() {
                if (map._state !== state) {
                    throw new Error(`LinkedMap got modified during iteration.`);
                }
                if (current) {
                    /** @type {{value: V, done: boolean}} */
                    const result = { value: current.value, done: false };
                    current = current.next;
                    return result;
                }
                else {
                    return { value: undefined, done: true };
                }
            },
        }));
        return iterator;
    }
    /**
     * @public
     * @return {!MapIterator<!Array<?>>}
     */
    entries() {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        /** @type {!LinkedMap} */
        const map = this;
        /** @type {number} */
        const state = this._state;
        /** @type {(undefined|!Item<K, V>)} */
        let current = this._head;
        /** @type {!MapIterator<!Array<?>>} */
        const iterator = (/** @type {!MapIterator<!Array<?>>} */ ({
            /**
             * @public
             * @return {!MapIterator<!Array<?>>}
             */
            [Symbol.iterator]() {
                return iterator;
            },
            /**
             * @public
             * @return {(!IteratorReturnResult<?>|!IteratorYieldResult<!Array<?>>)}
             */
            next() {
                if (map._state !== state) {
                    throw new Error(`LinkedMap got modified during iteration.`);
                }
                if (current) {
                    /** @type {(!IteratorReturnResult<?>|!IteratorYieldResult<!Array<?>>)} */
                    const result = {
                        value: [current.key, current.value],
                        done: false,
                    };
                    current = current.next;
                    return result;
                }
                else {
                    return { value: undefined, done: true };
                }
            },
        }));
        return iterator;
    }
    /**
     * @public
     * @return {!MapIterator<!Array<?>>}
     */
    [(_c = Symbol.toStringTag, Symbol.iterator)]() {
        return this.entries();
    }
    /**
     * @protected
     * @param {number} newSize
     * @return {void}
     */
    trimOld(newSize) {
        if (newSize >= this.size) {
            return;
        }
        if (newSize === 0) {
            this.clear();
            return;
        }
        /** @type {(undefined|!Item<K, V>)} */
        let current = this._head;
        /** @type {number} */
        let currentSize = this.size;
        while (current && currentSize > newSize) {
            this._map.delete(current.key);
            current = current.next;
            currentSize--;
        }
        this._head = current;
        this._size = currentSize;
        if (current) {
            current.previous = undefined;
        }
        this._state++;
    }
    /**
     * @protected
     * @param {number} newSize
     * @return {void}
     */
    trimNew(newSize) {
        if (newSize >= this.size) {
            return;
        }
        if (newSize === 0) {
            this.clear();
            return;
        }
        /** @type {(undefined|!Item<K, V>)} */
        let current = this._tail;
        /** @type {number} */
        let currentSize = this.size;
        while (current && currentSize > newSize) {
            this._map.delete(current.key);
            current = current.previous;
            currentSize--;
        }
        this._tail = current;
        this._size = currentSize;
        if (current) {
            current.next = undefined;
        }
        this._state++;
    }
    /**
     * @private
     * @param {!Item<K, V>} item
     * @return {void}
     */
    addItemFirst(item) {
        // First time Insert
        if (!this._head && !this._tail) {
            this._tail = item;
        }
        else if (!this._head) {
            throw new Error('Invalid list');
        }
        else {
            item.next = this._head;
            this._head.previous = item;
        }
        this._head = item;
        this._state++;
    }
    /**
     * @private
     * @param {!Item<K, V>} item
     * @return {void}
     */
    addItemLast(item) {
        // First time Insert
        if (!this._head && !this._tail) {
            this._head = item;
        }
        else if (!this._tail) {
            throw new Error('Invalid list');
        }
        else {
            item.previous = this._tail;
            this._tail.next = item;
        }
        this._tail = item;
        this._state++;
    }
    /**
     * @private
     * @param {!Item<K, V>} item
     * @return {void}
     */
    removeItem(item) {
        if (item === this._head && item === this._tail) {
            this._head = undefined;
            this._tail = undefined;
        }
        else if (item === this._head) {
            // This can only happen if size === 1 which is handled
            // by the case above.
            if (!item.next) {
                throw new Error('Invalid list');
            }
            item.next.previous = undefined;
            this._head = item.next;
        }
        else if (item === this._tail) {
            // This can only happen if size === 1 which is handled
            // by the case above.
            if (!item.previous) {
                throw new Error('Invalid list');
            }
            item.previous.next = undefined;
            this._tail = item.previous;
        }
        else {
            /** @type {(undefined|!Item<K, V>)} */
            const next = item.next;
            /** @type {(undefined|!Item<K, V>)} */
            const previous = item.previous;
            if (!next || !previous) {
                throw new Error('Invalid list');
            }
            next.previous = previous;
            previous.next = next;
        }
        item.next = undefined;
        item.previous = undefined;
        this._state++;
    }
    /**
     * @private
     * @param {!Item<K, V>} item
     * @param {!Touch} touch
     * @return {void}
     */
    touch(item, touch) {
        if (!this._head || !this._tail) {
            throw new Error('Invalid list');
        }
        if (touch !== Touch.AsOld && touch !== Touch.AsNew) {
            return;
        }
        if (touch === Touch.AsOld) {
            if (item === this._head) {
                return;
            }
            /** @type {(undefined|!Item<K, V>)} */
            const next = item.next;
            /** @type {(undefined|!Item<K, V>)} */
            const previous = item.previous;
            // Unlink the item
            if (item === this._tail) {
                // previous must be defined since item was not head but is tail
                // So there are more than on item in the map
                (/** @type {!Item<K, V>} */ (previous)).next = undefined;
                this._tail = previous;
            }
            else {
                // Both next and previous are not undefined since item was neither head nor tail.
                (/** @type {!Item<K, V>} */ (next)).previous = previous;
                (/** @type {!Item<K, V>} */ (previous)).next = next;
            }
            // Insert the node at head
            item.previous = undefined;
            item.next = this._head;
            this._head.previous = item;
            this._head = item;
            this._state++;
        }
        else if (touch === Touch.AsNew) {
            if (item === this._tail) {
                return;
            }
            /** @type {(undefined|!Item<K, V>)} */
            const next = item.next;
            /** @type {(undefined|!Item<K, V>)} */
            const previous = item.previous;
            // Unlink the item.
            if (item === this._head) {
                // next must be defined since item was not tail but is head
                // So there are more than on item in the map
                (/** @type {!Item<K, V>} */ (next)).previous = undefined;
                this._head = next;
            }
            else {
                // Both next and previous are not undefined since item was neither head nor tail.
                (/** @type {!Item<K, V>} */ (next)).previous = previous;
                (/** @type {!Item<K, V>} */ (previous)).next = next;
            }
            item.next = undefined;
            item.previous = this._tail;
            this._tail.next = item;
            this._tail = item;
            this._state++;
        }
    }
    /**
     * @public
     * @return {!Array<!Array<?>>}
     */
    toJSON() {
        /** @type {!Array<!Array<?>>} */
        const data = [];
        this.forEach((/**
         * @param {V} value
         * @param {K} key
         * @return {void}
         */
        (value, key) => {
            data.push([key, value]);
        }));
        return data;
    }
    /**
     * @public
     * @param {!Array<!Array<?>>} data
     * @return {void}
     */
    fromJSON(data) {
        this.clear();
        for (const [key__tsickle_destructured_6, value__tsickle_destructured_7] of data) {
            const key = /** @type {K} */ (key__tsickle_destructured_6);
            const value = /** @type {V} */ (value__tsickle_destructured_7);
            this.set(key, value);
        }
    }
}
exports.LinkedMap = LinkedMap;
/* istanbul ignore if */
if (false) {
    /* Skipping unnamed member:
    readonly [Symbol.toStringTag] = 'LinkedMap';*/
    /**
     * @type {!Map<K, !Item<K, V>>}
     * @private
     */
    LinkedMap.prototype._map;
    /**
     * @type {(undefined|!Item<K, V>)}
     * @private
     */
    LinkedMap.prototype._head;
    /**
     * @type {(undefined|!Item<K, V>)}
     * @private
     */
    LinkedMap.prototype._tail;
    /**
     * @type {number}
     * @private
     */
    LinkedMap.prototype._size;
    /**
     * @type {number}
     * @private
     */
    LinkedMap.prototype._state;
}
/**
 * @abstract
 * @template K, V
 * @extends {LinkedMap<K, V>}
 */
class Cache extends LinkedMap {
    /**
     * @public
     * @param {number} limit
     * @param {number=} ratio
     */
    constructor(limit, ratio = 1) {
        super();
        this._limit = limit;
        this._ratio = Math.min(Math.max(0, ratio), 1);
    }
    /**
     * @public
     * @return {number}
     */
    get limit() {
        return this._limit;
    }
    /**
     * @public
     * @param {number} limit
     * @return {void}
     */
    set limit(limit) {
        this._limit = limit;
        this.checkTrim();
    }
    /**
     * @public
     * @return {number}
     */
    get ratio() {
        return this._ratio;
    }
    /**
     * @public
     * @param {number} ratio
     * @return {void}
     */
    set ratio(ratio) {
        this._ratio = Math.min(Math.max(0, ratio), 1);
        this.checkTrim();
    }
    /**
     * @public
     * @param {K} key
     * @param {!Touch=} touch
     * @return {(undefined|V)}
     */
    get(key, touch = Touch.AsNew) {
        return super.get(key, touch);
    }
    /**
     * @public
     * @param {K} key
     * @return {(undefined|V)}
     */
    peek(key) {
        return super.get(key, Touch.None);
    }
    /**
     * @public
     * @template THIS
     * @this {THIS}
     * @param {K} key
     * @param {V} value
     * @return {THIS}
     */
    set(key, value) {
        super.set(key, value, Touch.AsNew);
        return (/** @type {!Cache} */ (this));
    }
    /**
     * @protected
     * @return {void}
     */
    checkTrim() {
        if (this.size > this._limit) {
            this.trim(Math.round(this._limit * this._ratio));
        }
    }
}
/* istanbul ignore if */
if (false) {
    /**
     * @type {number}
     * @protected
     */
    Cache.prototype._limit;
    /**
     * @type {number}
     * @protected
     */
    Cache.prototype._ratio;
    /**
     * @abstract
     * @protected
     * @param {number} newSize
     * @return {void}
     */
    Cache.prototype.trim = function (newSize) { };
}
/**
 * @template K, V
 * @extends {Cache<K, V>}
 */
class LRUCache extends Cache {
    /**
     * @public
     * @param {number} limit
     * @param {number=} ratio
     */
    constructor(limit, ratio = 1) {
        super(limit, ratio);
    }
    /**
     * @protected
     * @param {number} newSize
     * @return {void}
     */
    trim(newSize) {
        this.trimOld(newSize);
    }
    /**
     * @public
     * @template THIS
     * @this {THIS}
     * @param {K} key
     * @param {V} value
     * @return {THIS}
     */
    set(key, value) {
        super.set(key, value);
        (/** @type {!LRUCache} */ (this)).checkTrim();
        return (/** @type {!LRUCache} */ (this));
    }
}
exports.LRUCache = LRUCache;
/**
 * @template K, V
 * @extends {Cache<K, V>}
 */
class MRUCache extends Cache {
    /**
     * @public
     * @param {number} limit
     * @param {number=} ratio
     */
    constructor(limit, ratio = 1) {
        super(limit, ratio);
    }
    /**
     * @protected
     * @param {number} newSize
     * @return {void}
     */
    trim(newSize) {
        this.trimNew(newSize);
    }
    /**
     * @public
     * @template THIS
     * @this {THIS}
     * @param {K} key
     * @param {V} value
     * @return {THIS}
     */
    set(key, value) {
        if ((/** @type {!MRUCache} */ (this))._limit <= (/** @type {!MRUCache} */ (this)).size && !(/** @type {!MRUCache} */ (this)).has(key)) {
            (/** @type {!MRUCache} */ (this)).trim(Math.round((/** @type {!MRUCache} */ (this))._limit * (/** @type {!MRUCache} */ (this))._ratio) - 1);
        }
        super.set(key, value);
        return (/** @type {!MRUCache} */ (this));
    }
}
exports.MRUCache = MRUCache;
/**
 * @template T
 */
class CounterSet {
    constructor() {
        this.map = new Map();
    }
    /**
     * @public
     * @param {T} value
     * @return {!CounterSet}
     */
    add(value) {
        this.map.set(value, (this.map.get(value) || 0) + 1);
        return this;
    }
    /**
     * @public
     * @param {T} value
     * @return {boolean}
     */
    delete(value) {
        /** @type {number} */
        let counter = this.map.get(value) || 0;
        if (counter === 0) {
            return false;
        }
        counter--;
        if (counter === 0) {
            this.map.delete(value);
        }
        else {
            this.map.set(value, counter);
        }
        return true;
    }
    /**
     * @public
     * @param {T} value
     * @return {boolean}
     */
    has(value) {
        return this.map.has(value);
    }
}
exports.CounterSet = CounterSet;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!Map<T, number>}
     * @private
     */
    CounterSet.prototype.map;
}
/**
 * A map that allows access both by keys and values.
 * **NOTE**: values need to be unique.
 * @template K, V
 */
class BidirectionalMap {
    /**
     * @public
     * @param {(undefined|!ReadonlyArray<!Array<?>>)=} entries
     */
    constructor(entries) {
        this._m1 = new Map();
        this._m2 = new Map();
        if (entries) {
            for (const [key__tsickle_destructured_8, value__tsickle_destructured_9] of entries) {
                const key = /** @type {K} */ (key__tsickle_destructured_8);
                const value = /** @type {V} */ (value__tsickle_destructured_9);
                this.set(key, value);
            }
        }
    }
    /**
     * @public
     * @return {void}
     */
    clear() {
        this._m1.clear();
        this._m2.clear();
    }
    /**
     * @public
     * @param {K} key
     * @param {V} value
     * @return {void}
     */
    set(key, value) {
        this._m1.set(key, value);
        this._m2.set(value, key);
    }
    /**
     * @public
     * @param {K} key
     * @return {(undefined|V)}
     */
    get(key) {
        return this._m1.get(key);
    }
    /**
     * @public
     * @param {V} value
     * @return {(undefined|K)}
     */
    getKey(value) {
        return this._m2.get(value);
    }
    /**
     * @public
     * @param {K} key
     * @return {boolean}
     */
    delete(key) {
        /** @type {(undefined|V)} */
        const value = this._m1.get(key);
        if (value === undefined) {
            return false;
        }
        this._m1.delete(key);
        this._m2.delete(value);
        return true;
    }
    /**
     * @public
     * @param {function(V, K, !BidirectionalMap): void} callbackfn
     * @param {*=} thisArg
     * @return {void}
     */
    forEach(callbackfn, thisArg) {
        this._m1.forEach((/**
         * @param {V} value
         * @param {K} key
         * @return {void}
         */
        (value, key) => {
            callbackfn.call(thisArg, value, key, this);
        }));
    }
    /**
     * @public
     * @return {!IterableIterator<K, ?, ?>}
     */
    keys() {
        return this._m1.keys();
    }
    /**
     * @public
     * @return {!IterableIterator<V, ?, ?>}
     */
    values() {
        return this._m1.values();
    }
}
exports.BidirectionalMap = BidirectionalMap;
/* istanbul ignore if */
if (false) {
    /**
     * @const {!Map<K, V>}
     * @private
     */
    BidirectionalMap.prototype._m1;
    /**
     * @const {!Map<V, K>}
     * @private
     */
    BidirectionalMap.prototype._m2;
}
/**
 * @template K, V
 */
class SetMap {
    constructor() {
        this.map = new Map();
    }
    /**
     * @public
     * @param {K} key
     * @param {V} value
     * @return {void}
     */
    add(key, value) {
        /** @type {(undefined|!Set<V>)} */
        let values = this.map.get(key);
        if (!values) {
            values = new Set();
            this.map.set(key, values);
        }
        values.add(value);
    }
    /**
     * @public
     * @param {K} key
     * @param {V} value
     * @return {void}
     */
    delete(key, value) {
        /** @type {(undefined|!Set<V>)} */
        const values = this.map.get(key);
        if (!values) {
            return;
        }
        values.delete(value);
        if (values.size === 0) {
            this.map.delete(key);
        }
    }
    /**
     * @public
     * @param {K} key
     * @param {function(V): void} fn
     * @return {void}
     */
    forEach(key, fn) {
        /** @type {(undefined|!Set<V>)} */
        const values = this.map.get(key);
        if (!values) {
            return;
        }
        values.forEach(fn);
    }
    /**
     * @public
     * @param {K} key
     * @return {!ReadonlySet<V>}
     */
    get(key) {
        /** @type {(undefined|!Set<V>)} */
        const values = this.map.get(key);
        if (!values) {
            return new Set();
        }
        return values;
    }
}
exports.SetMap = SetMap;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!Map<K, !Set<V>>}
     * @private
     */
    SetMap.prototype.map;
}
/**
 * @param {!Map<*, *>} a
 * @param {!Map<*, *>} b
 * @return {boolean}
 */
function mapsStrictEqualIgnoreOrder(a, b) {
    if (a === b) {
        return true;
    }
    if (a.size !== b.size) {
        return false;
    }
    for (const [key__tsickle_destructured_10, value__tsickle_destructured_11] of a) {
        const key = /** @type {*} */ (key__tsickle_destructured_10);
        const value = /** @type {*} */ (value__tsickle_destructured_11);
        if (!b.has(key) || b.get(key) !== value) {
            return false;
        }
    }
    for (const [key__tsickle_destructured_12] of b) {
        const key = /** @type {*} */ (key__tsickle_destructured_12);
        if (!a.has(key)) {
            return false;
        }
    }
    return true;
}
exports.mapsStrictEqualIgnoreOrder = mapsStrictEqualIgnoreOrder;
/**
 * A map that is addressable with an arbitrary number of keys. This is useful in high performance
 * scenarios where creating a composite key whenever the data is accessed is too expensive. For
 * example for a very hot function, constructing a string like `first-second-third` for every call
 * will cause a significant hit to performance.
 * @template TValue, TKeys
 */
class NKeyMap {
    constructor() {
        this._data = new Map();
    }
    /**
     * Sets a value on the map. Note that unlike a standard `Map`, the first argument is the value.
     * This is because the spread operator is used for the keys and must be last..
     * @public
     * @param {TValue} value The value to set.
     * @param {...TKeys} keys The keys for the value.
     * @return {void}
     */
    set(value, ...keys) {
        /** @type {!Map<?, ?>} */
        let currentMap = this._data;
        for (let i = 0; i < keys.length - 1; i++) {
            /** @type {?} */
            let nextMap = currentMap.get(keys[i]);
            if (nextMap === undefined) {
                nextMap = new Map();
                currentMap.set(keys[i], nextMap);
            }
            currentMap = nextMap;
        }
        currentMap.set(keys[keys.length - 1], value);
    }
    /**
     * @public
     * @param {...TKeys} keys
     * @return {(undefined|TValue)}
     */
    get(...keys) {
        /** @type {!Map<?, ?>} */
        let currentMap = this._data;
        for (let i = 0; i < keys.length - 1; i++) {
            /** @type {?} */
            const nextMap = currentMap.get(keys[i]);
            if (nextMap === undefined) {
                return undefined;
            }
            currentMap = nextMap;
        }
        return currentMap.get(keys[keys.length - 1]);
    }
    /**
     * @public
     * @return {void}
     */
    clear() {
        this._data.clear();
    }
    /**
     * @public
     * @return {!IterableIterator<TValue, ?, ?>}
     */
    *values() {
        /**
         * @param {!Map<?, ?>} map
         * @return {!IterableIterator<TValue, ?, ?>}
         */
        function* iterate(map) {
            for (const value of map.values()) {
                if (value instanceof Map) {
                    yield* iterate(value);
                }
                else {
                    yield value;
                }
            }
        }
        yield* iterate(this._data);
    }
    /**
     * Get a textual representation of the map for debugging purposes.
     * @public
     * @return {string}
     */
    toString() {
        /** @type {function(!Map<?, ?>, number): string} */
        const printMap = (/**
         * @param {!Map<?, ?>} map
         * @param {number} depth
         * @return {string}
         */
        (map, depth) => {
            /** @type {string} */
            let result = '';
            for (const [key__tsickle_destructured_13, value__tsickle_destructured_14] of map) {
                const key = /** @type {?} */ (key__tsickle_destructured_13);
                const value = /** @type {?} */ (value__tsickle_destructured_14);
                result += `${'  '.repeat(depth)}${key}: `;
                if (value instanceof Map) {
                    result += '\n' + printMap(value, depth + 1);
                }
                else {
                    result += `${value}\n`;
                }
            }
            return result;
        });
        return printMap(this._data, 0);
    }
}
exports.NKeyMap = NKeyMap;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!Map<?, ?>}
     * @private
     */
    NKeyMap.prototype._data;
}
