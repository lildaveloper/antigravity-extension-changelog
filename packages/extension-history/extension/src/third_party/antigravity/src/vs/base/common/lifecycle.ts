/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/antigravity/src/vs/base/common/lifecycle.ts
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
goog.module('google3.third_party.antigravity.src.vs.base.common.lifecycle');
var module = module || { id: 'third_party/antigravity/src/vs/base/common/lifecycle.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_arrays_1 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.arrays");
const tsickle_collections_2 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.collections");
const tsickle_map_3 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.map");
const tsickle_uri_4 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.uri");
const tsickle_functional_5 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.functional");
const tsickle_iterator_6 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.iterator");
const tsickle_errors_7 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.errors");
const tsickle_debugservice_8 = goog.requireType("fava.debug.DebugService");
const arrays_1 = goog.require('google3.third_party.antigravity.src.vs.base.common.arrays');
const collections_1 = goog.require('google3.third_party.antigravity.src.vs.base.common.collections');
const map_1 = goog.require('google3.third_party.antigravity.src.vs.base.common.map');
const functional_1 = goog.require('google3.third_party.antigravity.src.vs.base.common.functional');
const iterator_1 = goog.require('google3.third_party.antigravity.src.vs.base.common.iterator');
const errors_1 = goog.require('google3.third_party.antigravity.src.vs.base.common.errors');
// go/vscode-patch/telemetry/#3eye
const debugService = goog.require('fava.debug.DebugService');
// #region Disposable Tracking
/**
 * Enables logging of potentially leaked disposables.
 *
 * A disposable is considered leaked if it is not disposed or not registered as the child of
 * another disposable. This tracking is very simple an only works for classes that either
 * extend Disposable or use a DisposableStore. This means there are a lot of false positives.
 * @type {boolean}
 */
const TRACK_DISPOSABLES = false;
/** @type {(null|!IDisposableTracker)} */
let disposableTracker = null;
/**
 * @record
 */
function IDisposableTracker() { }
exports.IDisposableTracker = IDisposableTracker;
/* istanbul ignore if */
if (false) {
    /**
     * Is called on construction of a disposable.
     * @public
     * @param {!IDisposable} disposable
     * @return {void}
     */
    IDisposableTracker.prototype.trackDisposable = function (disposable) { };
    /**
     * Is called when a disposable is registered as child of another disposable (e.g. {\@link DisposableStore}).
     * If parent is `null`, the disposable is removed from its former parent.
     * @public
     * @param {!IDisposable} child
     * @param {(null|!IDisposable)} parent
     * @return {void}
     */
    IDisposableTracker.prototype.setParent = function (child, parent) { };
    /**
     * Is called after a disposable is disposed.
     * @public
     * @param {!IDisposable} disposable
     * @return {void}
     */
    IDisposableTracker.prototype.markAsDisposed = function (disposable) { };
    /**
     * Indicates that the given object is a singleton which does not need to be disposed.
     * @public
     * @param {!IDisposable} disposable
     * @return {void}
     */
    IDisposableTracker.prototype.markAsSingleton = function (disposable) { };
}
/**
 * @implements {IDisposableTracker}
 */
class GCBasedDisposableTracker {
    constructor() {
        this._registry = new FinalizationRegistry((/**
         * @param {string} heldValue
         * @return {void}
         */
        heldValue => {
            console.warn(`[LEAKED DISPOSABLE] ${heldValue}`);
        }));
    }
    /**
     * @public
     * @param {!IDisposable} disposable
     * @return {void}
     */
    trackDisposable(disposable) {
        /** @type {string} */
        const stack = (/** @type {string} */ (new Error('CREATED via:').stack));
        this._registry.register(disposable, stack, disposable);
    }
    /**
     * @public
     * @param {!IDisposable} child
     * @param {(null|!IDisposable)} parent
     * @return {void}
     */
    setParent(child, parent) {
        if (parent) {
            this._registry.unregister(child);
        }
        else {
            this.trackDisposable(child);
        }
    }
    /**
     * @public
     * @param {!IDisposable} disposable
     * @return {void}
     */
    markAsDisposed(disposable) {
        this._registry.unregister(disposable);
    }
    /**
     * @public
     * @param {!IDisposable} disposable
     * @return {void}
     */
    markAsSingleton(disposable) {
        this._registry.unregister(disposable);
    }
}
exports.GCBasedDisposableTracker = GCBasedDisposableTracker;
/* istanbul ignore if */
if (false) {
    /**
     * @const {?}
     * @private
     */
    GCBasedDisposableTracker.prototype._registry;
}
/**
 * @record
 */
function DisposableInfo() { }
exports.DisposableInfo = DisposableInfo;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!IDisposable}
     * @public
     */
    DisposableInfo.prototype.value;
    /**
     * @type {(null|string)}
     * @public
     */
    DisposableInfo.prototype.source;
    /**
     * @type {(null|!IDisposable)}
     * @public
     */
    DisposableInfo.prototype.parent;
    /**
     * @type {boolean}
     * @public
     */
    DisposableInfo.prototype.isSingleton;
    /**
     * @type {number}
     * @public
     */
    DisposableInfo.prototype.idx;
}
/**
 * @implements {IDisposableTracker}
 */
class DisposableTracker {
    constructor() {
        this.livingDisposables = new Map();
    }
    /**
     * @private
     * @param {!IDisposable} d
     * @return {!DisposableInfo}
     */
    getDisposableData(d) {
        /** @type {(undefined|!DisposableInfo)} */
        let val = this.livingDisposables.get(d);
        if (!val) {
            val = { parent: null, source: null, isSingleton: false, value: d, idx: DisposableTracker.idx++ };
            this.livingDisposables.set(d, val);
        }
        return val;
    }
    /**
     * @public
     * @param {!IDisposable} d
     * @return {void}
     */
    trackDisposable(d) {
        /** @type {!DisposableInfo} */
        const data = this.getDisposableData(d);
        if (!data.source) {
            data.source =
                (/** @type {string} */ (new Error().stack));
        }
    }
    /**
     * @public
     * @param {!IDisposable} child
     * @param {(null|!IDisposable)} parent
     * @return {void}
     */
    setParent(child, parent) {
        /** @type {!DisposableInfo} */
        const data = this.getDisposableData(child);
        data.parent = parent;
    }
    /**
     * @public
     * @param {!IDisposable} x
     * @return {void}
     */
    markAsDisposed(x) {
        this.livingDisposables.delete(x);
    }
    /**
     * @public
     * @param {!IDisposable} disposable
     * @return {void}
     */
    markAsSingleton(disposable) {
        this.getDisposableData(disposable).isSingleton = true;
    }
    /**
     * @private
     * @param {!DisposableInfo} data
     * @param {!Map<!DisposableInfo, !DisposableInfo>} cache
     * @return {!DisposableInfo}
     */
    getRootParent(data, cache) {
        /** @type {(undefined|!DisposableInfo)} */
        const cacheValue = cache.get(data);
        if (cacheValue) {
            return cacheValue;
        }
        /** @type {!DisposableInfo} */
        const result = data.parent ? this.getRootParent(this.getDisposableData(data.parent), cache) : data;
        cache.set(data, result);
        return result;
    }
    /**
     * @public
     * @return {!Array<!IDisposable>}
     */
    getTrackedDisposables() {
        /** @type {!Map<!DisposableInfo, !DisposableInfo>} */
        const rootParentCache = new Map();
        /** @type {!Array<!IDisposable>} */
        const leaking = [...this.livingDisposables.entries()]
            .filter((/**
         * @param {!Array<?>} __0
         * @return {boolean}
         */
        ([, v__tsickle_destructured_1]) => {
            let v = /** @type {!DisposableInfo} */ (v__tsickle_destructured_1);
            return (v.source !== null && !this.getRootParent(v, rootParentCache).isSingleton);
        }))
            .flatMap((/**
         * @param {!Array<?>} __0
         * @return {!IDisposable}
         */
        ([k__tsickle_destructured_2]) => {
            let k = /** @type {!IDisposable} */ (k__tsickle_destructured_2);
            return (k);
        }));
        return leaking;
    }
    /**
     * @public
     * @param {number=} maxReported
     * @param {(undefined|!Array<!DisposableInfo>)=} preComputedLeaks
     * @return {(undefined|{leaks: !Array<!DisposableInfo>, details: string})}
     */
    computeLeakingDisposables(maxReported = 10, preComputedLeaks) {
        /** @type {(undefined|!Array<!DisposableInfo>)} */
        let uncoveredLeakingObjs;
        if (preComputedLeaks) {
            uncoveredLeakingObjs = preComputedLeaks;
        }
        else {
            /** @type {!Map<!DisposableInfo, !DisposableInfo>} */
            const rootParentCache = new Map();
            /** @type {!Array<!DisposableInfo>} */
            const leakingObjects = [...this.livingDisposables.values()]
                .filter((/**
             * @param {!DisposableInfo} info
             * @return {boolean}
             */
            (info) => info.source !== null && !this.getRootParent(info, rootParentCache).isSingleton));
            if (leakingObjects.length === 0) {
                return;
            }
            /** @type {!Set<!IDisposable>} */
            const leakingObjsSet = new Set(leakingObjects.map((/**
             * @param {!DisposableInfo} o
             * @return {!IDisposable}
             */
            o => o.value)));
            // Remove all objects that are a child of other leaking objects. Assumes there are no cycles.
            uncoveredLeakingObjs = leakingObjects.filter((/**
             * @param {!DisposableInfo} l
             * @return {boolean}
             */
            l => {
                return !(l.parent && leakingObjsSet.has(l.parent));
            }));
            if (uncoveredLeakingObjs.length === 0) {
                throw new Error('There are cyclic diposable chains!');
            }
        }
        if (!uncoveredLeakingObjs) {
            return undefined;
        }
        /**
         * @param {!DisposableInfo} leaking
         * @return {!Array<string>}
         */
        function getStackTracePath(leaking) {
            /**
             * @param {!Array<string>} array
             * @param {!Array<(string|!RegExp)>} linesToRemove
             * @return {void}
             */
            function removePrefix(array, linesToRemove) {
                while (array.length > 0 && linesToRemove.some((/**
                 * @param {(string|!RegExp)} regexp
                 * @return {(null|boolean|!RegExpMatchArray)}
                 */
                regexp => typeof regexp === 'string' ? regexp === array[0] : array[0].match(regexp)))) {
                    array.shift();
                }
            }
            /** @type {!Array<string>} */
            const lines = (/** @type {string} */ (leaking.source)).split('\n').map((/**
             * @param {string} p
             * @return {string}
             */
            p => p.trim().replace('at ', ''))).filter((/**
             * @param {string} l
             * @return {boolean}
             */
            l => l !== ''));
            removePrefix(lines, ['Error', /^trackDisposable \(.*\)$/, /^DisposableTracker.trackDisposable \(.*\)$/]);
            return lines.reverse();
        }
        /** @type {!tsickle_map_3.SetMap<string, !DisposableInfo>} */
        const stackTraceStarts = new map_1.SetMap();
        for (const leaking of uncoveredLeakingObjs) {
            /** @type {!Array<string>} */
            const stackTracePath = getStackTracePath(leaking);
            for (let i = 0; i <= stackTracePath.length; i++) {
                stackTraceStarts.add(stackTracePath.slice(0, i).join('\n'), leaking);
            }
        }
        // Put earlier leaks first
        uncoveredLeakingObjs.sort((0, arrays_1.compareBy)((/**
         * @param {!DisposableInfo} l
         * @return {number}
         */
        l => l.idx), arrays_1.numberComparator));
        /** @type {string} */
        let message = '';
        /** @type {number} */
        let i = 0;
        for (const leaking of uncoveredLeakingObjs.slice(0, maxReported)) {
            i++;
            /** @type {!Array<string>} */
            const stackTracePath = getStackTracePath(leaking);
            /** @type {!Array<?>} */
            const stackTraceFormattedLines = [];
            for (let i = 0; i < stackTracePath.length; i++) {
                /** @type {string} */
                let line = stackTracePath[i];
                /** @type {!ReadonlySet<!DisposableInfo>} */
                const starts = stackTraceStarts.get(stackTracePath.slice(0, i + 1).join('\n'));
                line = `(shared with ${starts.size}/${uncoveredLeakingObjs.length} leaks) at ${line}`;
                /** @type {!ReadonlySet<!DisposableInfo>} */
                const prevStarts = stackTraceStarts.get(stackTracePath.slice(0, i).join('\n'));
                /** @type {?} */
                const continuations = (0, collections_1.groupBy)([...prevStarts].map((/**
                 * @param {!DisposableInfo} d
                 * @return {string}
                 */
                d => getStackTracePath(d)[i])), (/**
                 * @param {string} v
                 * @return {string}
                 */
                v => v));
                delete continuations[stackTracePath[i]];
                for (const [cont__tsickle_destructured_3, set__tsickle_destructured_4] of Object.entries(continuations)) {
                    const cont = /** @type {string} */ (cont__tsickle_destructured_3);
                    const set = /** @type {(undefined|!Array<string>)} */ (set__tsickle_destructured_4);
                    if (set) {
                        stackTraceFormattedLines.unshift(`    - stacktraces of ${set.length} other leaks continue with ${cont}`);
                    }
                }
                stackTraceFormattedLines.unshift(line);
            }
            message += `\n\n\n==================== Leaking disposable ${i}/${uncoveredLeakingObjs.length}: ${leaking.value.constructor.name} ====================\n${(/** @type {!Array<string>} */ (stackTraceFormattedLines)).join('\n')}\n============================================================\n\n`;
        }
        if (uncoveredLeakingObjs.length > maxReported) {
            message += `\n\n\n... and ${uncoveredLeakingObjs.length - maxReported} more leaking disposables\n\n`;
        }
        return { leaks: uncoveredLeakingObjs, details: message };
    }
}
exports.DisposableTracker = DisposableTracker;
DisposableTracker.idx = 0;
/* istanbul ignore if */
if (false) {
    /**
     * @type {number}
     * @private
     */
    DisposableTracker.idx;
    /**
     * @const {!Map<!IDisposable, !DisposableInfo>}
     * @private
     */
    DisposableTracker.prototype.livingDisposables;
}
/**
 * @param {(null|!IDisposableTracker)} tracker
 * @return {void}
 */
function setDisposableTracker(tracker) {
    disposableTracker = tracker;
}
exports.setDisposableTracker = setDisposableTracker;
if (TRACK_DISPOSABLES) {
    /** @type {string} */
    const __is_disposable_tracked__ = '__is_disposable_tracked__';
    setDisposableTracker(new class {
        /**
         * @public
         * @param {!IDisposable} x
         * @return {void}
         */
        trackDisposable(x) {
            /** @type {string} */
            const stack = (/** @type {string} */ (new Error('Potentially leaked disposable').stack));
            setTimeout((/**
             * @return {void}
             */
            () => {
                // eslint-disable-next-line local/code-no-any-casts
                if (!((/** @type {?} */ (x)))[__is_disposable_tracked__]) {
                    console.log(stack);
                }
            }), 3000);
        }
        /**
         * @public
         * @param {!IDisposable} child
         * @param {(null|!IDisposable)} parent
         * @return {void}
         */
        setParent(child, parent) {
            if (child && child !== Disposable.None) {
                try {
                    // eslint-disable-next-line local/code-no-any-casts
                    ((/** @type {?} */ (child)))[__is_disposable_tracked__] = true;
                }
                catch {
                    // noop
                }
            }
        }
        /**
         * @public
         * @param {!IDisposable} disposable
         * @return {void}
         */
        markAsDisposed(disposable) {
            if (disposable && disposable !== Disposable.None) {
                try {
                    // eslint-disable-next-line local/code-no-any-casts
                    ((/** @type {?} */ (disposable)))[__is_disposable_tracked__] = true;
                }
                catch {
                    // noop
                }
            }
        }
        /**
         * @public
         * @param {!IDisposable} disposable
         * @return {void}
         */
        markAsSingleton(disposable) { }
    });
}
/**
 * @template T
 * @param {T} x
 * @return {T}
 */
function trackDisposable(x) {
    disposableTracker?.trackDisposable(x);
    return x;
}
exports.trackDisposable = trackDisposable;
/**
 * @param {!IDisposable} disposable
 * @return {void}
 */
function markAsDisposed(disposable) {
    disposableTracker?.markAsDisposed(disposable);
}
exports.markAsDisposed = markAsDisposed;
/**
 * @param {!IDisposable} child
 * @param {(null|!IDisposable)} parent
 * @return {void}
 */
function setParentOfDisposable(child, parent) {
    disposableTracker?.setParent(child, parent);
}
/**
 * @param {!Array<!IDisposable>} children
 * @param {(null|!IDisposable)} parent
 * @return {void}
 */
function setParentOfDisposables(children, parent) {
    if (!disposableTracker) {
        return;
    }
    for (const child of children) {
        disposableTracker.setParent(child, parent);
    }
}
/**
 * Indicates that the given object is a singleton which does not need to be disposed.
 * @template T
 * @param {T} singleton
 * @return {T}
 */
function markAsSingleton(singleton) {
    disposableTracker?.markAsSingleton(singleton);
    return singleton;
}
exports.markAsSingleton = markAsSingleton;
/**
 * An object that performs a cleanup operation when `.dispose()` is called.
 *
 * Some examples of how disposables are used:
 *
 * - An event listener that removes itself when `.dispose()` is called.
 * - A resource such as a file system watcher that cleans up the resource when `.dispose()` is called.
 * - The return value from registering a provider. When `.dispose()` is called, the provider is unregistered.
 * @record
 */
function IDisposable() { }
exports.IDisposable = IDisposable;
/* istanbul ignore if */
if (false) {
    /**
     * @public
     * @return {void}
     */
    IDisposable.prototype.dispose = function () { };
}
/**
 * Check if `thing` is {\@link IDisposable disposable}.
 * @template E
 * @param {E} thing
 * @return {boolean}
 */
function isDisposable(thing) {
    // eslint-disable-next-line local/code-no-any-casts
    return typeof thing === 'object' && thing !== null && typeof ((/** @type {!IDisposable} */ ((/** @type {?} */ (thing))))).dispose === 'function' && ((/** @type {!IDisposable} */ ((/** @type {?} */ (thing))))).dispose.length === 0;
}
exports.isDisposable = isDisposable;
/**
 * @template T
 * @param {(undefined|T|!Iterable<T, ?, ?>)} arg
 * @return {?}
 */
function dispose(arg) {
    if (iterator_1.Iterable.is(arg)) {
        /** @type {!Array<?>} */
        const errors = [];
        for (const d of arg) {
            if (d) {
                try {
                    d.dispose();
                }
                catch (e) {
                    errors.push(e);
                }
            }
        }
        if (errors.length === 1) {
            throw errors[0];
        }
        else if (errors.length > 1) {
            throw new AggregateError(errors, 'Encountered errors while disposing of store');
        }
        return Array.isArray(arg) ? [] : arg;
    }
    else if (arg) {
        (/** @type {T} */ (arg)).dispose();
        return arg;
    }
}
exports.dispose = dispose;
/**
 * @template T
 * @param {!Array<T>} disposables
 * @return {!Array<T>}
 */
function disposeIfDisposable(disposables) {
    for (const d of disposables) {
        if (isDisposable(d)) {
            d.dispose();
        }
    }
    return [];
}
exports.disposeIfDisposable = disposeIfDisposable;
/**
 * Combine multiple disposable values into a single {\@link IDisposable}.
 * @param {...!IDisposable} disposables
 * @return {!IDisposable}
 */
function combinedDisposable(...disposables) {
    /** @type {!IDisposable} */
    const parent = toDisposable((/**
     * @return {!Array<!IDisposable>}
     */
    () => dispose(disposables)));
    setParentOfDisposables(disposables, parent);
    return parent;
}
exports.combinedDisposable = combinedDisposable;
/**
 * @implements {IDisposable}
 */
class FunctionDisposable {
    /**
     * @public
     * @param {function(): void} fn
     */
    constructor(fn) {
        this._isDisposed = false;
        this._fn = fn;
        trackDisposable(this);
    }
    /**
     * @public
     * @return {void}
     */
    dispose() {
        if (this._isDisposed) {
            return;
        }
        if (!this._fn) {
            throw new Error(`Unbound disposable context: Need to use an arrow function to preserve the value of this`);
        }
        this._isDisposed = true;
        markAsDisposed(this);
        this._fn();
    }
}
/* istanbul ignore if */
if (false) {
    /**
     * @type {boolean}
     * @private
     */
    FunctionDisposable.prototype._isDisposed;
    /**
     * @const {function(): void}
     * @private
     */
    FunctionDisposable.prototype._fn;
}
/**
 * Turn a function that implements dispose into an {\@link IDisposable}.
 *
 * @param {function(): void} fn Clean up function, guaranteed to be called only **once**.
 * @return {!IDisposable}
 */
function toDisposable(fn) {
    return new FunctionDisposable(fn);
}
exports.toDisposable = toDisposable;
/**
 * Manages a collection of disposable values.
 *
 * This is the preferred way to manage multiple disposables. A `DisposableStore` is safer to work with than an
 * `IDisposable[]` as it considers edge cases, such as registering the same value multiple times or adding an item to a
 * store that has already been disposed of.
 * @implements {IDisposable}
 */
class DisposableStore {
    /**
     * @public
     */
    constructor() {
        this._toDispose = new Set();
        this._isDisposed = false;
        trackDisposable(this);
    }
    /**
     * Dispose of all registered disposables and mark this object as disposed.
     *
     * Any future disposables added to this object will be disposed of on `add`.
     * @public
     * @return {void}
     */
    dispose() {
        if (this._isDisposed) {
            return;
        }
        markAsDisposed(this);
        this._isDisposed = true;
        this.clear();
    }
    /**
     * @public
     * @return {boolean} `true` if this object has been disposed of.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * Dispose of all registered disposables but do not mark this object as disposed.
     * @public
     * @return {void}
     */
    clear() {
        if (this._toDispose.size === 0) {
            return;
        }
        try {
            dispose(this._toDispose);
        }
        finally {
            this._toDispose.clear();
        }
    }
    /**
     * Add a new {\@link IDisposable disposable} to the collection.
     * @public
     * @template T
     * @param {T} o
     * @return {T}
     */
    add(o) {
        if (!o || o === Disposable.None) {
            return o;
        }
        if (((/** @type {!DisposableStore} */ ((/** @type {*} */ (o))))) === this) {
            throw new Error('Cannot register a disposable on itself!');
        }
        setParentOfDisposable(o, this);
        if (this._isDisposed) {
            if (!DisposableStore.DISABLE_DISPOSED_WARNING) {
                /** @type {!Error} */
                const error = new Error('Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!');
                console.warn(error.stack);
                // go/vscode-patch/telemetry/#3eye
                debugService.getJsReporter()?.sendExceptionReport(error, "Memory leak");
            }
        }
        else {
            this._toDispose.add(o);
        }
        return o;
    }
    /**
     * Deletes a disposable from store and disposes of it. This will not throw or warn and proceed to dispose the
     * disposable even when the disposable is not part in the store.
     * @public
     * @template T
     * @param {T} o
     * @return {void}
     */
    delete(o) {
        if (!o) {
            return;
        }
        if (((/** @type {!DisposableStore} */ ((/** @type {*} */ (o))))) === this) {
            throw new Error('Cannot dispose a disposable on itself!');
        }
        this._toDispose.delete(o);
        o.dispose();
    }
    /**
     * Deletes the value from the store, but does not dispose it.
     * @public
     * @template T
     * @param {T} o
     * @return {void}
     */
    deleteAndLeak(o) {
        if (!o) {
            return;
        }
        if (this._toDispose.delete(o)) {
            setParentOfDisposable(o, null);
        }
    }
    /**
     * @public
     * @return {void}
     */
    assertNotDisposed() {
        if (this._isDisposed) {
            (0, errors_1.onUnexpectedError)(new errors_1.BugIndicatingError('Object disposed'));
        }
    }
}
exports.DisposableStore = DisposableStore;
DisposableStore.DISABLE_DISPOSED_WARNING = false;
/* istanbul ignore if */
if (false) {
    /**
     * @type {boolean}
     * @public
     */
    DisposableStore.DISABLE_DISPOSED_WARNING;
    /**
     * @const {!Set<!IDisposable>}
     * @private
     */
    DisposableStore.prototype._toDispose;
    /**
     * @type {boolean}
     * @private
     */
    DisposableStore.prototype._isDisposed;
}
/**
 * Abstract base class for a {\@link IDisposable disposable} object.
 *
 * Subclasses can {\@linkcode _register} disposables that will be automatically cleaned up when this object is disposed of.
 * @abstract
 * @implements {IDisposable}
 */
class Disposable {
    /**
     * @public
     */
    constructor() {
        this._store = new DisposableStore();
        trackDisposable(this);
        setParentOfDisposable(this._store, this);
    }
    /**
     * @public
     * @return {void}
     */
    dispose() {
        markAsDisposed(this);
        this._store.dispose();
    }
    /**
     * Adds `o` to the collection of disposables managed by this object.
     * @protected
     * @template T
     * @param {T} o
     * @return {T}
     */
    _register(o) {
        if (((/** @type {!Disposable} */ ((/** @type {*} */ (o))))) === this) {
            throw new Error('Cannot register a disposable on itself!');
        }
        return this._store.add(o);
    }
}
exports.Disposable = Disposable;
/**
 * A disposable that does nothing when it is disposed of.
 *
 * TODO: This should not be a static property.
 */
Disposable.None = Object.freeze({ /**
     * @public
     * @return {void}
     */
    dispose() { } });
/* istanbul ignore if */
if (false) {
    /**
     * A disposable that does nothing when it is disposed of.
     *
     * TODO: This should not be a static property.
     * @const {?}
     * @public
     */
    Disposable.None;
    /**
     * @const {!DisposableStore}
     * @protected
     */
    Disposable.prototype._store;
}
/**
 * Manages the lifecycle of a disposable value that may be changed.
 *
 * This ensures that when the disposable value is changed, the previously held disposable is disposed of. You can
 * also register a `MutableDisposable` on a `Disposable` to ensure it is automatically cleaned up.
 * @template T
 * @implements {IDisposable}
 */
class MutableDisposable {
    /**
     * @public
     */
    constructor() {
        this._isDisposed = false;
        trackDisposable(this);
    }
    /**
     * Get the currently held disposable value, or `undefined` if this MutableDisposable has been disposed
     * @public
     * @return {(undefined|T)}
     */
    get value() {
        return this._isDisposed ? undefined : this._value;
    }
    /**
     * Set a new disposable value.
     *
     * Behaviour:
     * - If the MutableDisposable has been disposed, the setter is a no-op.
     * - If the new value is strictly equal to the current value, the setter is a no-op.
     * - Otherwise the previous value (if any) is disposed and the new value is stored.
     *
     * Related helpers:
     * - clear() resets the value to `undefined` (and disposes the previous value).
     * - clearAndLeak() returns the old value without disposing it and removes its parent.
     * @public
     * @param {(undefined|T)} value
     * @return {void}
     */
    set value(value) {
        if (this._isDisposed || value === this._value) {
            return;
        }
        this._value?.dispose();
        if (value) {
            setParentOfDisposable(value, this);
        }
        this._value = value;
    }
    /**
     * Resets the stored value and disposed of the previously stored value.
     * @public
     * @return {void}
     */
    clear() {
        this.value = undefined;
    }
    /**
     * @public
     * @return {void}
     */
    dispose() {
        this._isDisposed = true;
        markAsDisposed(this);
        this._value?.dispose();
        this._value = undefined;
    }
    /**
     * Clears the value, but does not dispose it.
     * The old value is returned.
     * @public
     * @return {(undefined|T)}
     */
    clearAndLeak() {
        /** @type {(undefined|T)} */
        const oldValue = this._value;
        this._value = undefined;
        if (oldValue) {
            setParentOfDisposable(oldValue, null);
        }
        return oldValue;
    }
}
exports.MutableDisposable = MutableDisposable;
/* istanbul ignore if */
if (false) {
    /**
     * @type {(undefined|T)}
     * @private
     */
    MutableDisposable.prototype._value;
    /**
     * @type {boolean}
     * @private
     */
    MutableDisposable.prototype._isDisposed;
}
/**
 * Manages the lifecycle of a disposable value that may be changed like {\@link MutableDisposable}, but the value must
 * exist and cannot be undefined.
 * @template T
 * @implements {IDisposable}
 */
class MandatoryMutableDisposable {
    /**
     * @public
     * @param {T} initialValue
     */
    constructor(initialValue) {
        this._disposable = new MutableDisposable();
        this._isDisposed = false;
        this._disposable.value = initialValue;
    }
    /**
     * @public
     * @return {T}
     */
    get value() {
        return (/** @type {T} */ (this._disposable.value));
    }
    /**
     * @public
     * @param {T} value
     * @return {void}
     */
    set value(value) {
        if (this._isDisposed || value === this._disposable.value) {
            return;
        }
        this._disposable.value = value;
    }
    /**
     * @public
     * @return {void}
     */
    dispose() {
        this._isDisposed = true;
        this._disposable.dispose();
    }
}
exports.MandatoryMutableDisposable = MandatoryMutableDisposable;
/* istanbul ignore if */
if (false) {
    /**
     * @const {!MutableDisposable<T>}
     * @private
     */
    MandatoryMutableDisposable.prototype._disposable;
    /**
     * @type {boolean}
     * @private
     */
    MandatoryMutableDisposable.prototype._isDisposed;
}
class RefCountedDisposable {
    /**
     * @public
     * @param {!IDisposable} _disposable
     */
    constructor(_disposable) {
        this._disposable = _disposable;
        this._counter = 1;
    }
    /**
     * @public
     * @template THIS
     * @this {THIS}
     * @return {THIS}
     */
    acquire() {
        (/** @type {!RefCountedDisposable} */ (this))._counter++;
        return (/** @type {!RefCountedDisposable} */ (this));
    }
    /**
     * @public
     * @template THIS
     * @this {THIS}
     * @return {THIS}
     */
    release() {
        if (--(/** @type {!RefCountedDisposable} */ (this))._counter === 0) {
            (/** @type {!RefCountedDisposable} */ (this))._disposable.dispose();
        }
        return (/** @type {!RefCountedDisposable} */ (this));
    }
}
exports.RefCountedDisposable = RefCountedDisposable;
/* istanbul ignore if */
if (false) {
    /**
     * @type {number}
     * @private
     */
    RefCountedDisposable.prototype._counter;
    /**
     * @const {!IDisposable}
     * @private
     */
    RefCountedDisposable.prototype._disposable;
}
/**
 * @record
 * @template T
 * @extends {IDisposable}
 */
function IReference() { }
exports.IReference = IReference;
/* istanbul ignore if */
if (false) {
    /**
     * @const {T}
     * @public
     */
    IReference.prototype.object;
}
/**
 * @abstract
 * @template T
 */
class ReferenceCollection {
    constructor() {
        this.references = new Map();
    }
    /**
     * @public
     * @param {string} key
     * @param {...*} args
     * @return {!IReference<T>}
     */
    acquire(key, ...args) {
        /** @type {(undefined|{object: T, counter: number})} */
        let reference = this.references.get(key);
        if (!reference) {
            reference = { counter: 0, object: this.createReferencedObject(key, ...args) };
            this.references.set(key, reference);
        }
        const { object } = reference;
        /** @type {function(): void} */
        const dispose = (0, functional_1.createSingleCallFunction)((/**
         * @return {void}
         */
        () => {
            // go/vscode-patch/typescript#type-refinements
            if (--(/** @type {{object: T, counter: number}} */ (reference)).counter === 0) {
                this.destroyReferencedObject(key, (/** @type {{object: T, counter: number}} */ (reference)).object);
                this.references.delete(key);
            }
        }));
        reference.counter++;
        return { object, dispose };
    }
}
exports.ReferenceCollection = ReferenceCollection;
/* istanbul ignore if */
if (false) {
    /**
     * @const {!Map<string, {object: T, counter: number}>}
     * @private
     */
    ReferenceCollection.prototype.references;
    /**
     * @abstract
     * @protected
     * @param {string} key
     * @param {...*} args
     * @return {T}
     */
    ReferenceCollection.prototype.createReferencedObject = function (key, args) { };
    /**
     * @abstract
     * @protected
     * @param {string} key
     * @param {T} object
     * @return {void}
     */
    ReferenceCollection.prototype.destroyReferencedObject = function (key, object) { };
}
/**
 * Unwraps a reference collection of promised values. Makes sure
 * references are disposed whenever promises get rejected.
 * @template T
 */
class AsyncReferenceCollection {
    /**
     * @public
     * @param {!ReferenceCollection<!Promise<T>>} referenceCollection
     */
    constructor(referenceCollection) {
        this.referenceCollection = referenceCollection;
    }
    /**
     * @public
     * @param {string} key
     * @param {...?} args
     * @return {!Promise<!IReference<T>>}
     */
    async acquire(key, ...args) {
        /** @type {!IReference<!Promise<T>>} */
        const ref = this.referenceCollection.acquire(key, ...args);
        try {
            /** @type {?} */
            const object = await ref.object;
            return {
                object,
                dispose: (/**
                 * @return {void}
                 */
                () => ref.dispose())
            };
        }
        catch (error) {
            ref.dispose();
            throw error;
        }
    }
}
exports.AsyncReferenceCollection = AsyncReferenceCollection;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!ReferenceCollection<!Promise<T>>}
     * @private
     */
    AsyncReferenceCollection.prototype.referenceCollection;
}
/**
 * @template T
 * @implements {IReference<T>}
 */
class ImmortalReference {
    /**
     * @public
     * @param {T} object
     */
    constructor(object) {
        this.object = object;
    }
    /**
     * @public
     * @return {void}
     */
    dispose() { }
}
exports.ImmortalReference = ImmortalReference;
/* istanbul ignore if */
if (false) {
    /**
     * @type {T}
     * @public
     */
    ImmortalReference.prototype.object;
}
/**
 * @param {function(!DisposableStore): void} fn
 * @return {void}
 */
function disposeOnReturn(fn) {
    /** @type {!DisposableStore} */
    const store = new DisposableStore();
    try {
        fn(store);
    }
    finally {
        store.dispose();
    }
}
exports.disposeOnReturn = disposeOnReturn;
/**
 * A map the manages the lifecycle of the values that it stores.
 * @template K, V
 * @implements {IDisposable}
 */
class DisposableMap {
    /**
     * @public
     * @param {!Map<K, V>=} store
     */
    constructor(store = new Map()) {
        this._isDisposed = false;
        this._store = store;
        trackDisposable(this);
    }
    /**
     * Disposes of all stored values and mark this object as disposed.
     *
     * Trying to use this object after it has been disposed of is an error.
     * @public
     * @return {void}
     */
    dispose() {
        markAsDisposed(this);
        this._isDisposed = true;
        this.clearAndDisposeAll();
    }
    /**
     * Disposes of all stored values and clear the map, but DO NOT mark this object as disposed.
     * @public
     * @return {void}
     */
    clearAndDisposeAll() {
        if (!this._store.size) {
            return;
        }
        try {
            dispose(this._store.values());
        }
        finally {
            this._store.clear();
        }
    }
    /**
     * @public
     * @param {K} key
     * @return {boolean}
     */
    has(key) {
        return this._store.has(key);
    }
    /**
     * @public
     * @return {number}
     */
    get size() {
        return this._store.size;
    }
    /**
     * @public
     * @param {K} key
     * @return {(undefined|V)}
     */
    get(key) {
        return this._store.get(key);
    }
    /**
     * @public
     * @param {K} key
     * @param {V} value
     * @param {boolean=} skipDisposeOnOverwrite
     * @return {void}
     */
    set(key, value, skipDisposeOnOverwrite = false) {
        if (this._isDisposed) {
            console.warn(new Error('Trying to add a disposable to a DisposableMap that has already been disposed of. The added object will be leaked!').stack);
        }
        if (!skipDisposeOnOverwrite) {
            this._store.get(key)?.dispose();
        }
        this._store.set(key, value);
        setParentOfDisposable(value, this);
    }
    /**
     * Delete the value stored for `key` from this map and also dispose of it.
     * @public
     * @param {K} key
     * @return {void}
     */
    deleteAndDispose(key) {
        this._store.get(key)?.dispose();
        this._store.delete(key);
    }
    /**
     * Delete the value stored for `key` from this map but return it. The caller is
     * responsible for disposing of the value.
     * @public
     * @param {K} key
     * @return {(undefined|V)}
     */
    deleteAndLeak(key) {
        /** @type {(undefined|V)} */
        const value = this._store.get(key);
        if (value) {
            setParentOfDisposable(value, null);
        }
        this._store.delete(key);
        return value;
    }
    /**
     * @public
     * @return {!IterableIterator<K, ?, ?>}
     */
    keys() {
        return this._store.keys();
    }
    /**
     * @public
     * @return {!IterableIterator<V, ?, ?>}
     */
    values() {
        return this._store.values();
    }
    /**
     * @public
     * @return {!IterableIterator<!Array<?>, ?, ?>}
     */
    [Symbol.iterator]() {
        return this._store[Symbol.iterator]();
    }
}
exports.DisposableMap = DisposableMap;
/* istanbul ignore if */
if (false) {
    /**
     * @const {!Map<K, V>}
     * @private
     */
    DisposableMap.prototype._store;
    /**
     * @type {boolean}
     * @private
     */
    DisposableMap.prototype._isDisposed;
}
/**
 * Call `then` on a Promise, unless the returned disposable is disposed.
 * @template T
 * @param {!Promise<T>} promise
 * @param {function(T): void} then
 * @return {!IDisposable}
 */
function thenIfNotDisposed(promise, then) {
    /** @type {boolean} */
    let disposed = false;
    promise.then((/**
     * @param {T} result
     * @return {void}
     */
    result => {
        if (disposed) {
            return;
        }
        then(result);
    }));
    return toDisposable((/**
     * @return {void}
     */
    () => {
        disposed = true;
    }));
}
exports.thenIfNotDisposed = thenIfNotDisposed;
/**
 * Call `then` on a promise that resolves to a {\@link IDisposable}, then either register the
 * disposable or register it to the {\@link DisposableStore}, depending on whether the store is
 * disposed or not.
 * @template T
 * @param {!Promise<T>} promise
 * @param {!DisposableStore} store
 * @return {!Promise<T>}
 */
function thenRegisterOrDispose(promise, store) {
    return promise.then((/**
     * @param {T} disposable
     * @return {T}
     */
    disposable => {
        if (store.isDisposed) {
            disposable.dispose();
        }
        else {
            store.add(disposable);
        }
        return disposable;
    }));
}
exports.thenRegisterOrDispose = thenRegisterOrDispose;
/**
 * @template V
 * @extends {DisposableMap<!tsickle_uri_4.URI, V>}
 */
class DisposableResourceMap extends DisposableMap {
    /**
     * @public
     */
    constructor() {
        super(new map_1.ResourceMap());
    }
}
exports.DisposableResourceMap = DisposableResourceMap;
