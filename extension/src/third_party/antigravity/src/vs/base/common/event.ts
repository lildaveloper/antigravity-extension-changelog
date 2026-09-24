/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/antigravity/src/vs/base/common/event.ts
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
goog.module('google3.third_party.antigravity.src.vs.base.common.event');
var module = module || { id: 'third_party/antigravity/src/vs/base/common/event.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_async_1 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.async");
const tsickle_cancellation_2 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.cancellation");
const tsickle_collections_3 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.collections");
const tsickle_errors_4 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.errors");
const tsickle_functional_5 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.functional");
const tsickle_lifecycle_6 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.lifecycle");
const tsickle_linkedList_7 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.linkedList");
const tsickle_observable_8 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.observable");
const tsickle_stopwatch_9 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.stopwatch");
const tsickle_symbols_10 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.symbols");
const tsickle_debugservice_11 = goog.requireType("fava.debug.DebugService");
const collections_1 = goog.require('google3.third_party.antigravity.src.vs.base.common.collections');
const errors_1 = goog.require('google3.third_party.antigravity.src.vs.base.common.errors');
const functional_1 = goog.require('google3.third_party.antigravity.src.vs.base.common.functional');
const lifecycle_1 = goog.require('google3.third_party.antigravity.src.vs.base.common.lifecycle');
const linkedList_1 = goog.require('google3.third_party.antigravity.src.vs.base.common.linkedList');
const stopwatch_1 = goog.require('google3.third_party.antigravity.src.vs.base.common.stopwatch');
// go/vscode-patch/telemetry/#3eye
const debugService = goog.require('fava.debug.DebugService');
// -----------------------------------------------------------------------------------------------------------------------
// Uncomment the next line to print warnings whenever an emitter with listeners is disposed. That is a sign of code smell.
// -----------------------------------------------------------------------------------------------------------------------
/** @type {boolean} */
const _enableDisposeWithListenerWarning = false;
// -----------------------------------------------------------------------------------------------------------------------
// Uncomment the next line to print warnings whenever a snapshotted event is used repeatedly without cleanup.
// See https://github.com/microsoft/vscode/issues/142851
// -----------------------------------------------------------------------------------------------------------------------
/** @type {boolean} */
const _enableSnapshotPotentialLeakWarning = false;
// WARNING: interface has both a type and a value, skipping emit
var Event;
(function (Event) {
    /** @type {?} */
    Event.None = (/**
     * @return {?}
     */
    () => lifecycle_1.Disposable.None);
    /**
     * @param {!EmitterOptions} options
     * @return {void}
     */
    function _addLeakageTraceLogic(options) {
        if (_enableSnapshotPotentialLeakWarning) {
            const { onDidAddListener: origListenerDidAdd } = options;
            /** @type {!Stacktrace} */
            const stack = Stacktrace.create();
            /** @type {number} */
            let count = 0;
            options.onDidAddListener = (/**
             * @return {void}
             */
            () => {
                if (++count === 2) {
                    console.warn('snapshotted emitter LIKELY used public and SHOULD HAVE BEEN created with DisposableStore. snapshotted here');
                    stack.print();
                }
                origListenerDidAdd?.();
            });
        }
    }
    /**
     * Given an event, returns another event which debounces calls and defers the listeners to a later task via a shared
     * `setTimeout`. The event is converted into a signal (`Event<void>`) to avoid additional object creation as a
     * result of merging events and to try prevent race conditions that could arise when using related deferred and
     * non-deferred events.
     *
     * This is useful for deferring non-critical work (eg. general UI updates) to ensure it does not block critical work
     * (eg. latency of keypress to text rendered).
     *
     * *NOTE* that this function returns an `Event` and it MUST be called with a `DisposableStore` whenever the returned
     * event is accessible to "third parties", e.g the event is a public property. Otherwise a leaked listener on the
     * returned event causes this utility to leak a listener on the original event.
     *
     * @param {?} event The event source for the new event.
     * @param {(undefined|!tsickle_lifecycle_6.DisposableStore)=} disposable A disposable store to add the new EventEmitter to.
     * @return {?}
     */
    function defer(event, disposable) {
        return debounce(event, (/**
         * @return {undefined}
         */
        () => void 0), 0, undefined, true, undefined, disposable);
    }
    Event.defer = defer;
    /**
     * Given an event, returns another event which only fires once.
     *
     * @template T
     * @param {?} event The event source for the new event.
     * @return {?}
     */
    function once(event) {
        return (/**
         * @param {function(?): *} listener
         * @param {?=} thisArgs
         * @param {(undefined|!Array<!tsickle_lifecycle_6.IDisposable>|!tsickle_lifecycle_6.DisposableStore)=} disposables
         * @return {!tsickle_lifecycle_6.IDisposable}
         */
        (listener, thisArgs = null, disposables) => {
            // we need this, in case the event fires during the listener call
            /** @type {boolean} */
            let didFire = false;
            /** @type {(undefined|!tsickle_lifecycle_6.IDisposable)} */
            let result = undefined;
            result = event((/**
             * @param {?} e
             * @return {*}
             */
            e => {
                if (didFire) {
                    return;
                }
                else if (result) {
                    result.dispose();
                }
                else {
                    didFire = true;
                }
                return listener.call(thisArgs, e);
            }), null, disposables);
            if (didFire) {
                result.dispose();
            }
            return result;
        });
    }
    Event.once = once;
    /**
     * Given an event, returns another event which only fires once, and only when the condition is met.
     *
     * @template T
     * @param {?} event The event source for the new event.
     * @param {?} condition
     * @return {?}
     */
    function onceIf(event, condition) {
        return Event.once(Event.filter(event, condition));
    }
    Event.onceIf = onceIf;
    /**
     * Maps an event of one type into an event of another type using a mapping function, similar to how
     * `Array.prototype.map` works.
     *
     * *NOTE* that this function returns an `Event` and it MUST be called with a `DisposableStore` whenever the returned
     * event is accessible to "third parties", e.g the event is a public property. Otherwise a leaked listener on the
     * returned event causes this utility to leak a listener on the original event.
     *
     * @template I, O
     * @param {?} event The event source for the new event.
     * @param {?} map The mapping function.
     * @param {(undefined|!tsickle_lifecycle_6.DisposableStore)=} disposable A disposable store to add the new EventEmitter to.
     * @return {?}
     */
    function map(event, map, disposable) {
        return snapshot((/**
         * @param {function(?): *} listener
         * @param {?=} thisArgs
         * @param {(undefined|!Array<!tsickle_lifecycle_6.IDisposable>|!tsickle_lifecycle_6.DisposableStore)=} disposables
         * @return {!tsickle_lifecycle_6.IDisposable}
         */
        (listener, thisArgs = null, disposables) => event((/**
         * @param {?} i
         * @return {*}
         */
        i => listener.call(thisArgs, map(i))), null, disposables)), disposable);
    }
    Event.map = map;
    /**
     * Wraps an event in another event that performs some function on the event object before firing.
     *
     * *NOTE* that this function returns an `Event` and it MUST be called with a `DisposableStore` whenever the returned
     * event is accessible to "third parties", e.g the event is a public property. Otherwise a leaked listener on the
     * returned event causes this utility to leak a listener on the original event.
     *
     * @template I
     * @param {?} event The event source for the new event.
     * @param {?} each The function to perform on the event object.
     * @param {(undefined|!tsickle_lifecycle_6.DisposableStore)=} disposable A disposable store to add the new EventEmitter to.
     * @return {?}
     */
    function forEach(event, each, disposable) {
        return snapshot((/**
         * @param {function(?): *} listener
         * @param {?=} thisArgs
         * @param {(undefined|!Array<!tsickle_lifecycle_6.IDisposable>|!tsickle_lifecycle_6.DisposableStore)=} disposables
         * @return {!tsickle_lifecycle_6.IDisposable}
         */
        (listener, thisArgs = null, disposables) => event((/**
         * @param {?} i
         * @return {void}
         */
        i => { each(i); listener.call(thisArgs, i); }), null, disposables)), disposable);
    }
    Event.forEach = forEach;
    /**
     * @template T
     * @param {?} event
     * @param {?} filter
     * @param {(undefined|!tsickle_lifecycle_6.DisposableStore)=} disposable
     * @return {?}
     */
    function filter(event, filter, disposable) {
        return snapshot((/**
         * @param {function(?): *} listener
         * @param {?=} thisArgs
         * @param {(undefined|!Array<!tsickle_lifecycle_6.IDisposable>|!tsickle_lifecycle_6.DisposableStore)=} disposables
         * @return {!tsickle_lifecycle_6.IDisposable}
         */
        (listener, thisArgs = null, disposables) => event((/**
         * @param {?} e
         * @return {*}
         */
        e => filter(e) && listener.call(thisArgs, e)), null, disposables)), disposable);
    }
    Event.filter = filter;
    /**
     * Given an event, returns the same event but typed as `Event<void>`.
     * @template T
     * @param {?} event
     * @return {?}
     */
    function signal(event) {
        return (/** @type {?} */ ((/** @type {?} */ (event))));
    }
    Event.signal = signal;
    /**
     * @template T
     * @param {...?} events
     * @return {?}
     */
    function any(...events) {
        return (/**
         * @param {function(?): *} listener
         * @param {?=} thisArgs
         * @param {(undefined|!Array<!tsickle_lifecycle_6.IDisposable>|!tsickle_lifecycle_6.DisposableStore)=} disposables
         * @return {!tsickle_lifecycle_6.IDisposable}
         */
        (listener, thisArgs = null, disposables) => {
            /** @type {!tsickle_lifecycle_6.IDisposable} */
            const disposable = (0, lifecycle_1.combinedDisposable)(...events.map((/**
             * @param {?} event
             * @return {!tsickle_lifecycle_6.IDisposable}
             */
            event => event((/**
             * @param {?} e
             * @return {*}
             */
            e => listener.call(thisArgs, e))))));
            return addAndReturnDisposable(disposable, disposables);
        });
    }
    Event.any = any;
    /**
     * *NOTE* that this function returns an `Event` and it MUST be called with a `DisposableStore` whenever the returned
     * event is accessible to "third parties", e.g the event is a public property. Otherwise a leaked listener on the
     * returned event causes this utility to leak a listener on the original event.
     * @template I, O
     * @param {?} event
     * @param {?} merge
     * @param {(undefined|?)=} initial
     * @param {(undefined|!tsickle_lifecycle_6.DisposableStore)=} disposable
     * @return {?}
     */
    function reduce(event, merge, initial, disposable) {
        /** @type {(undefined|?)} */
        let output = initial;
        return map(event, (/**
         * @param {?} e
         * @return {?}
         */
        e => {
            output = merge(output, e);
            return output;
        }), disposable);
    }
    Event.reduce = reduce;
    /**
     * @template T
     * @param {?} event
     * @param {(undefined|!tsickle_lifecycle_6.DisposableStore)} disposable
     * @return {?}
     */
    function snapshot(event, disposable) {
        /** @type {(undefined|!tsickle_lifecycle_6.IDisposable)} */
        let listener;
        /** @type {(undefined|!EmitterOptions)} */
        const options = {
            /**
             * @public
             * @return {void}
             */
            onWillAddFirstListener() {
                listener = event(emitter.fire, emitter);
            },
            /**
             * @public
             * @return {void}
             */
            onDidRemoveLastListener() {
                listener?.dispose();
            }
        };
        if (!disposable) {
            _addLeakageTraceLogic(options);
        }
        /** @type {!Emitter<?>} */
        const emitter = new Emitter(options);
        disposable?.add(emitter);
        return emitter.event;
    }
    /**
     * Adds the IDisposable to the store if it's set, and returns it. Useful to
     * Event function implementation.
     * @template T
     * @param {?} d
     * @param {(undefined|!Array<!tsickle_lifecycle_6.IDisposable>|!tsickle_lifecycle_6.DisposableStore)} store
     * @return {?}
     */
    function addAndReturnDisposable(d, store) {
        if (store instanceof Array) {
            (/** @type {!Array<!tsickle_lifecycle_6.IDisposable>} */ (store)).push(d);
        }
        else if (store) {
            (/** @type {!tsickle_lifecycle_6.DisposableStore} */ (store)).add(d);
        }
        return d;
    }
    /**
     * @template I, O
     * @param {?} event
     * @param {?} merge
     * @param {(number|symbol)=} delay
     * @param {boolean=} leading
     * @param {boolean=} flushOnListenerRemove
     * @param {(undefined|number)=} leakWarningThreshold
     * @param {(undefined|!tsickle_lifecycle_6.DisposableStore)=} disposable
     * @return {?}
     */
    function debounce(event, merge, delay = 100, leading = false, flushOnListenerRemove = false, leakWarningThreshold, disposable) {
        /** @type {!tsickle_lifecycle_6.IDisposable} */
        let subscription;
        /** @type {(undefined|?)} */
        let output = undefined;
        // go/vscode-patch/timeout
        /** @type {(undefined|null|number)} */
        let handle = undefined;
        /** @type {number} */
        let numDebouncedCalls = 0;
        /** @type {(undefined|?)} */
        let doFire;
        /** @type {(undefined|!EmitterOptions)} */
        const options = {
            leakWarningThreshold,
            /**
             * @public
             * @return {void}
             */
            onWillAddFirstListener() {
                subscription = event((/**
                 * @param {?} cur
                 * @return {void}
                 */
                cur => {
                    numDebouncedCalls++;
                    output = merge(output, cur);
                    if (leading && !handle) {
                        emitter.fire(output);
                        output = undefined;
                    }
                    doFire = (/**
                     * @return {void}
                     */
                    () => {
                        /** @type {(undefined|?)} */
                        const _output = output;
                        output = undefined;
                        handle = undefined;
                        if (!leading || numDebouncedCalls > 1) {
                            emitter.fire((/** @type {?} */ (_output)));
                        }
                        numDebouncedCalls = 0;
                    });
                    if (typeof delay === 'number') {
                        if (handle) {
                            clearTimeout(handle);
                        }
                        handle = setTimeout(doFire, delay);
                    }
                    else {
                        if (handle === undefined) {
                            handle = null;
                            queueMicrotask(doFire);
                        }
                    }
                }));
            },
            /**
             * @public
             * @return {void}
             */
            onWillRemoveListener() {
                if (flushOnListenerRemove && numDebouncedCalls > 0) {
                    doFire?.();
                }
            },
            /**
             * @public
             * @return {void}
             */
            onDidRemoveLastListener() {
                doFire = undefined;
                subscription.dispose();
            }
        };
        if (!disposable) {
            _addLeakageTraceLogic(options);
        }
        /** @type {!Emitter<?>} */
        const emitter = new Emitter(options);
        disposable?.add(emitter);
        return emitter.event;
    }
    Event.debounce = debounce;
    /**
     * Debounces an event, firing after some delay (default=0) with an array of all event original objects.
     *
     * *NOTE* that this function returns an `Event` and it MUST be called with a `DisposableStore` whenever the returned
     * event is accessible to "third parties", e.g the event is a public property. Otherwise a leaked listener on the
     * returned event causes this utility to leak a listener on the original event.
     * @template T
     * @param {?} event
     * @param {(number|symbol)=} delay
     * @param {(undefined|!tsickle_lifecycle_6.DisposableStore)=} disposable
     * @return {?}
     */
    function accumulate(event, delay = 0, disposable) {
        return Event.debounce(event, (/**
         * @param {(undefined|!Array<?>)} last
         * @param {?} e
         * @return {!Array<?>}
         */
        (last, e) => {
            if (!last) {
                return [e];
            }
            last.push(e);
            return last;
        }), delay, undefined, true, undefined, disposable);
    }
    Event.accumulate = accumulate;
    /**
     * Filters an event such that some condition is _not_ met more than once in a row, effectively ensuring duplicate
     * event objects from different sources do not fire the same event object.
     *
     * *NOTE* that this function returns an `Event` and it MUST be called with a `DisposableStore` whenever the returned
     * event is accessible to "third parties", e.g the event is a public property. Otherwise a leaked listener on the
     * returned event causes this utility to leak a listener on the original event.
     *
     * \@example
     * ```
     * // Fire only one time when a single window is opened or focused
     * Event.latch(Event.any(onDidOpenWindow, onDidFocusWindow))
     * ```
     * @template T
     * @param {?} event The event source for the new event.
     * @param {?=} equals The equality condition.
     * @param {(undefined|!tsickle_lifecycle_6.DisposableStore)=} disposable A disposable store to add the new EventEmitter to.
     *
     * @return {?}
     */
    function latch(event, equals = (/**
     * @param {?} a
     * @param {?} b
     * @return {boolean}
     */
    (a, b) => a === b), disposable) {
        /** @type {boolean} */
        let firstCall = true;
        /** @type {?} */
        let cache;
        return filter(event, (/**
         * @param {?} value
         * @return {boolean}
         */
        value => {
            /** @type {boolean} */
            const shouldEmit = firstCall || !equals(value, cache);
            firstCall = false;
            cache = value;
            return shouldEmit;
        }), disposable);
    }
    Event.latch = latch;
    /**
     * Splits an event whose parameter is a union type into 2 separate events for each type in the union.
     *
     * *NOTE* that this function returns an `Event` and it MUST be called with a `DisposableStore` whenever the returned
     * event is accessible to "third parties", e.g the event is a public property. Otherwise a leaked listener on the
     * returned event causes this utility to leak a listener on the original event.
     *
     * \@example
     * ```
     * const event = new EventEmitter<number | undefined>().event;
     * const [numberEvent, undefinedEvent] = Event.split(event, isUndefined);
     * ```
     *
     * @template T, U
     * @param {?} event The event source for the new event.
     * @param {?} isT A function that determines what event is of the first type.
     * @param {(undefined|!tsickle_lifecycle_6.DisposableStore)=} disposable A disposable store to add the new EventEmitter to.
     * @return {!Array<?>}
     */
    function split(event, isT, disposable) {
        return [
            Event.filter(event, isT, disposable),
            (/** @type {?} */ (Event.filter(event, (/**
             * @param {?} e
             * @return {boolean}
             */
            e => !isT(e)), disposable))),
        ];
    }
    Event.split = split;
    /**
     * Buffers an event until it has a listener attached.
     *
     * *NOTE* that this function returns an `Event` and it MUST be called with a `DisposableStore` whenever the returned
     * event is accessible to "third parties", e.g the event is a public property. Otherwise a leaked listener on the
     * returned event causes this utility to leak a listener on the original event.
     *
     * \@example
     * ```
     * // Start accumulating events, when the first listener is attached, flush
     * // the event after a timeout such that multiple listeners attached before
     * // the timeout would receive the event
     * this.onInstallExtension = Event.buffer(service.onInstallExtension, true);
     * ```
     * @template T
     * @param {?} event The event source for the new event.
     * @param {boolean=} flushAfterTimeout Determines whether to flush the buffer after a timeout immediately or after a
     * `setTimeout` when the first event listener is added.
     * @param {!Array<?>=} _buffer Internal: A source event array used for tests.
     *
     * @param {(undefined|!tsickle_lifecycle_6.DisposableStore)=} disposable
     * @return {?}
     */
    function buffer(event, flushAfterTimeout = false, _buffer = [], disposable) {
        /** @type {(null|!Array<?>)} */
        let buffer = _buffer.slice();
        /** @type {(null|!tsickle_lifecycle_6.IDisposable)} */
        let listener = event((/**
         * @param {?} e
         * @return {void}
         */
        e => {
            if (buffer) {
                buffer.push(e);
            }
            else {
                emitter.fire(e);
            }
        }));
        if (disposable) {
            disposable.add(listener);
        }
        /** @type {?} */
        const flush = (/**
         * @return {void}
         */
        () => {
            buffer?.forEach((/**
             * @param {?} e
             * @return {void}
             */
            e => emitter.fire(e)));
            buffer = null;
        });
        /** @type {!Emitter<?>} */
        const emitter = new Emitter({
            /**
             * @public
             * @return {void}
             */
            onWillAddFirstListener() {
                if (!listener) {
                    listener = event((/**
                     * @param {?} e
                     * @return {void}
                     */
                    e => emitter.fire(e)));
                    if (disposable) {
                        disposable.add(listener);
                    }
                }
            },
            /**
             * @public
             * @return {void}
             */
            onDidAddFirstListener() {
                if (buffer) {
                    if (flushAfterTimeout) {
                        setTimeout(flush);
                    }
                    else {
                        flush();
                    }
                }
            },
            /**
             * @public
             * @return {void}
             */
            onDidRemoveLastListener() {
                if (listener) {
                    listener.dispose();
                }
                listener = null;
            }
        });
        if (disposable) {
            disposable.add(emitter);
        }
        return emitter.event;
    }
    Event.buffer = buffer;
    /**
     * Wraps the event in an {\@link IChainableEvent}, allowing a more functional programming style.
     *
     * \@example
     * ```
     * // Normal
     * const onEnterPressNormal = Event.filter(
     *   Event.map(onKeyPress.event, e => new StandardKeyboardEvent(e)),
     *   e.keyCode === KeyCode.Enter
     * ).event;
     *
     * // Using chain
     * const onEnterPressChain = Event.chain(onKeyPress.event, $ => $
     *   .map(e => new StandardKeyboardEvent(e))
     *   .filter(e => e.keyCode === KeyCode.Enter)
     * );
     * ```
     * @template T, R
     * @param {?} event
     * @param {?} sythensize
     * @return {?}
     */
    function chain(event, sythensize) {
        /** @type {?} */
        const fn = (/**
         * @param {function(?): *} listener
         * @param {?} thisArgs
         * @param {(undefined|!Array<!tsickle_lifecycle_6.IDisposable>|!tsickle_lifecycle_6.DisposableStore)} disposables
         * @return {!tsickle_lifecycle_6.IDisposable}
         */
        (listener, thisArgs, disposables) => {
            /** @type {?} */
            const cs = (/** @type {?} */ (sythensize(new ChainableSynthesis())));
            return event((/**
             * @param {?} value
             * @return {void}
             */
            function (value) {
                /** @type {?} */
                const result = cs.evaluate(value);
                if (result !== HaltChainable) {
                    listener.call(thisArgs, result);
                }
            }), undefined, disposables);
        });
        return fn;
    }
    Event.chain = chain;
    /** @type {?} */
    const HaltChainable = Symbol('HaltChainable');
    /**
     * tsickle: dropped implements: {?} type
     */
    class ChainableSynthesis {
        constructor() {
            this.steps = [];
        }
        /**
         * @public
         * @template THIS,O
         * @this {THIS}
         * @param {?} fn
         * @return {THIS}
         */
        map(fn) {
            (/** @type {?} */ (this)).steps.push(fn);
            return (/** @type {?} */ (this));
        }
        /**
         * @public
         * @template THIS
         * @this {THIS}
         * @param {?} fn
         * @return {THIS}
         */
        forEach(fn) {
            (/** @type {?} */ (this)).steps.push((/**
             * @param {?} v
             * @return {?}
             */
            v => {
                fn(v);
                return v;
            }));
            return (/** @type {?} */ (this));
        }
        /**
         * @public
         * @template THIS
         * @this {THIS}
         * @param {?} fn
         * @return {THIS}
         */
        filter(fn) {
            (/** @type {?} */ (this)).steps.push((/**
             * @param {?} v
             * @return {?}
             */
            v => fn(v) ? v : HaltChainable));
            return (/** @type {?} */ (this));
        }
        /**
         * @public
         * @template THIS,R
         * @this {THIS}
         * @param {?} merge
         * @param {(undefined|?)=} initial
         * @return {THIS}
         */
        reduce(merge, initial) {
            /** @type {(undefined|?)} */
            let last = initial;
            (/** @type {?} */ (this)).steps.push((/**
             * @param {?} v
             * @return {?}
             */
            v => {
                last = merge(last, v);
                return last;
            }));
            return (/** @type {?} */ (this));
        }
        /**
         * @public
         * @param {?=} equals
         * @return {?}
         */
        latch(equals = (/**
         * @param {?} a
         * @param {?} b
         * @return {boolean}
         */
        (a, b) => a === b)) {
            /** @type {boolean} */
            let firstCall = true;
            /** @type {?} */
            let cache;
            this.steps.push((/**
             * @param {?} value
             * @return {?}
             */
            value => {
                /** @type {boolean} */
                const shouldEmit = firstCall || !equals(value, cache);
                firstCall = false;
                cache = value;
                return shouldEmit ? value : HaltChainable;
            }));
            return this;
        }
        /**
         * @public
         * @param {?} value
         * @return {?}
         */
        evaluate(value) {
            for (const step of this.steps) {
                value = step(value);
                if (value === HaltChainable) {
                    break;
                }
            }
            return value;
        }
    }
    /* istanbul ignore if */
    if (false) {
        /**
         * @const {!Array<?>}
         * @private
         */
        ChainableSynthesis.prototype.steps;
    }
    /**
     * @record
     * @template T
     */
    function IChainableSythensis() { }
    Event.IChainableSythensis = IChainableSythensis;
    /* istanbul ignore if */
    if (false) {
        /**
         * @public
         * @template O
         * @param {?} fn
         * @return {?}
         */
        IChainableSythensis.prototype.map = function (fn) { };
        /**
         * @public
         * @param {?} fn
         * @return {?}
         */
        IChainableSythensis.prototype.forEach = function (fn) { };
        /**
         * @public
         * @template R
         * @param {?} fn
         * @return {?}
         */
        IChainableSythensis.prototype.filter = function (fn) { };
        /**
         * @public
         * @param {?} fn
         * @return {?}
         */
        IChainableSythensis.prototype.filter = function (fn) { };
        /**
         * @public
         * @template R
         * @param {?} merge
         * @param {?} initial
         * @return {?}
         */
        IChainableSythensis.prototype.reduce = function (merge, initial) { };
        /**
         * @public
         * @template R
         * @param {?} merge
         * @return {?}
         */
        IChainableSythensis.prototype.reduce = function (merge) { };
        /**
         * @public
         * @param {(undefined|?)=} equals
         * @return {?}
         */
        IChainableSythensis.prototype.latch = function (equals) { };
    }
    /**
     * @record
     */
    function NodeEventEmitter() { }
    Event.NodeEventEmitter = NodeEventEmitter;
    /* istanbul ignore if */
    if (false) {
        /**
         * @public
         * @param {(string|symbol)} event
         * @param {!Function} listener
         * @return {*}
         */
        NodeEventEmitter.prototype.on = function (event, listener) { };
        /**
         * @public
         * @param {(string|symbol)} event
         * @param {!Function} listener
         * @return {*}
         */
        NodeEventEmitter.prototype.removeListener = function (event, listener) { };
    }
    /**
     * Creates an {\@link Event} from a node event emitter.
     * @template T
     * @param {?} emitter
     * @param {string} eventName
     * @param {?=} map
     * @return {?}
     */
    function fromNodeEventEmitter(emitter, eventName, map = (/**
     * @param {?} id
     * @return {?}
     */
    id => id)) {
        /** @type {?} */
        const fn = (/**
         * @param {...?} args
         * @return {void}
         */
        (...args) => result.fire(map(...args)));
        /** @type {?} */
        const onFirstListenerAdd = (/**
         * @return {*}
         */
        () => emitter.on(eventName, fn));
        /** @type {?} */
        const onLastListenerRemove = (/**
         * @return {*}
         */
        () => emitter.removeListener(eventName, fn));
        /** @type {!Emitter<?>} */
        const result = new Emitter({ onWillAddFirstListener: onFirstListenerAdd, onDidRemoveLastListener: onLastListenerRemove });
        return result.event;
    }
    Event.fromNodeEventEmitter = fromNodeEventEmitter;
    /**
     * @record
     */
    function DOMEventEmitter() { }
    Event.DOMEventEmitter = DOMEventEmitter;
    /* istanbul ignore if */
    if (false) {
        /**
         * @public
         * @param {(string|symbol)} event
         * @param {!Function} listener
         * @return {void}
         */
        DOMEventEmitter.prototype.addEventListener = function (event, listener) { };
        /**
         * @public
         * @param {(string|symbol)} event
         * @param {!Function} listener
         * @return {void}
         */
        DOMEventEmitter.prototype.removeEventListener = function (event, listener) { };
    }
    /**
     * Creates an {\@link Event} from a DOM event emitter.
     * @template T
     * @param {?} emitter
     * @param {string} eventName
     * @param {?=} map
     * @return {?}
     */
    function fromDOMEventEmitter(emitter, eventName, map = (/**
     * @param {?} id
     * @return {?}
     */
    id => id)) {
        /** @type {?} */
        const fn = (/**
         * @param {...?} args
         * @return {void}
         */
        (...args) => result.fire(map(...args)));
        /** @type {?} */
        const onFirstListenerAdd = (/**
         * @return {void}
         */
        () => emitter.addEventListener(eventName, fn));
        /** @type {?} */
        const onLastListenerRemove = (/**
         * @return {void}
         */
        () => emitter.removeEventListener(eventName, fn));
        /** @type {!Emitter<?>} */
        const result = new Emitter({ onWillAddFirstListener: onFirstListenerAdd, onDidRemoveLastListener: onLastListenerRemove });
        return result.event;
    }
    Event.fromDOMEventEmitter = fromDOMEventEmitter;
    /**
     * Creates a promise out of an event, using the {\@link Event.once} helper.
     * @template T
     * @param {?} event
     * @param {(undefined|!Array<!tsickle_lifecycle_6.IDisposable>|!tsickle_lifecycle_6.DisposableStore)=} disposables
     * @return {!tsickle_async_1.CancelablePromise<?>}
     */
    function toPromise(event, disposables) {
        /** @type {?} */
        let cancelRef;
        /** @type {!tsickle_lifecycle_6.IDisposable} */
        let listener;
        /** @type {!tsickle_async_1.CancelablePromise<?>} */
        const promise = (/** @type {!tsickle_async_1.CancelablePromise<?>} */ (new Promise((/**
         * @param {function((?|!PromiseLike<?>)): void} resolve
         * @return {void}
         */
        (resolve) => {
            listener = once(event)(resolve);
            addToDisposables(listener, disposables);
            // not resolved, matching the behavior of a normal disposal
            cancelRef = (/**
             * @return {void}
             */
            () => {
                disposeAndRemove(listener, disposables);
            });
        }))));
        promise.cancel = (/** @type {?} */ (cancelRef));
        if (disposables) {
            promise.finally((/**
             * @return {void}
             */
            () => disposeAndRemove(listener, disposables)));
        }
        return promise;
    }
    Event.toPromise = toPromise;
    /**
     * A convenience function for forwarding an event to another emitter which
     * improves readability.
     *
     * This is similar to {\@link Relay} but allows instantiating and forwarding
     * on a single line and also allows for multiple source events.
     * \@example
     * Event.forward(event, emitter);
     * // equivalent to
     * event(e => emitter.fire(e));
     * // equivalent to
     * event(emitter.fire, emitter);
     * @template T
     * @param {?} from The event to forward.
     * @param {!Emitter<?>} to The emitter to forward the event to.
     * @return {!tsickle_lifecycle_6.IDisposable}
     */
    function forward(from, to) {
        return from((/**
         * @param {?} e
         * @return {void}
         */
        e => to.fire(e)));
    }
    Event.forward = forward;
    /**
     * @template T
     * @param {?} event
     * @param {?} handler
     * @param {(undefined|?)=} initial
     * @return {!tsickle_lifecycle_6.IDisposable}
     */
    function runAndSubscribe(event, handler, initial) {
        handler(initial);
        return event((/**
         * @param {?} e
         * @return {*}
         */
        e => handler(e)));
    }
    Event.runAndSubscribe = runAndSubscribe;
    /**
     * @template T
     * @implements {tsickle_observable_8.IObserver}
     */
    class EmitterObserver {
        /**
         * @public
         * @param {!tsickle_observable_8.IObservable<?>} _observable
         * @param {(undefined|!tsickle_lifecycle_6.DisposableStore)} store
         */
        constructor(_observable, store) {
            this._observable = _observable;
            this._counter = 0;
            this._hasChanged = false;
            /** @type {!EmitterOptions} */
            const options = {
                onWillAddFirstListener: (/**
                 * @return {void}
                 */
                () => {
                    _observable.addObserver(this);
                    // Communicate to the observable that we received its current value and would like to be notified about future changes.
                    this._observable.reportChanges();
                }),
                onDidRemoveLastListener: (/**
                 * @return {void}
                 */
                () => {
                    _observable.removeObserver(this);
                })
            };
            if (!store) {
                _addLeakageTraceLogic(options);
            }
            this.emitter = new Emitter(options);
            if (store) {
                store.add(this.emitter);
            }
        }
        /**
         * @public
         * @template T
         * @param {!tsickle_observable_8.IObservable<?>} _observable
         * @return {void}
         */
        beginUpdate(_observable) {
            // assert(_observable === this.obs);
            this._counter++;
        }
        /**
         * @public
         * @template T
         * @param {!tsickle_observable_8.IObservable<?>} _observable
         * @return {void}
         */
        handlePossibleChange(_observable) {
            // assert(_observable === this.obs);
        }
        /**
         * @public
         * @template T, TChange
         * @param {!tsickle_observable_8.IObservableWithChange<?, ?>} _observable
         * @param {?} _change
         * @return {void}
         */
        handleChange(_observable, _change) {
            // assert(_observable === this.obs);
            this._hasChanged = true;
        }
        /**
         * @public
         * @template T
         * @param {!tsickle_observable_8.IObservable<?>} _observable
         * @return {void}
         */
        endUpdate(_observable) {
            // assert(_observable === this.obs);
            this._counter--;
            if (this._counter === 0) {
                this._observable.reportChanges();
                if (this._hasChanged) {
                    this._hasChanged = false;
                    this.emitter.fire(this._observable.get());
                }
            }
        }
    }
    /* istanbul ignore if */
    if (false) {
        /**
         * @const {!Emitter<?>}
         * @public
         */
        EmitterObserver.prototype.emitter;
        /**
         * @type {number}
         * @private
         */
        EmitterObserver.prototype._counter;
        /**
         * @type {boolean}
         * @private
         */
        EmitterObserver.prototype._hasChanged;
        /**
         * @const {!tsickle_observable_8.IObservable<?>}
         * @public
         */
        EmitterObserver.prototype._observable;
    }
    /**
     * Creates an event emitter that is fired when the observable changes.
     * Each listeners subscribes to the emitter.
     * @template T
     * @param {!tsickle_observable_8.IObservable<?>} obs
     * @param {(undefined|!tsickle_lifecycle_6.DisposableStore)=} store
     * @return {?}
     */
    function fromObservable(obs, store) {
        /** @type {?} */
        const observer = new EmitterObserver(obs, store);
        return observer.emitter.event;
    }
    Event.fromObservable = fromObservable;
    /**
     * Each listener is attached to the observable directly.
     * @param {!tsickle_observable_8.IObservable<*>} observable
     * @return {?}
     */
    function fromObservableLight(observable) {
        return (/**
         * @param {function(void): *} listener
         * @param {?} thisArgs
         * @param {(undefined|!Array<!tsickle_lifecycle_6.IDisposable>|!tsickle_lifecycle_6.DisposableStore)} disposables
         * @return {?}
         */
        (listener, thisArgs, disposables) => {
            /** @type {number} */
            let count = 0;
            /** @type {boolean} */
            let didChange = false;
            /** @type {!tsickle_observable_8.IObserver} */
            const observer = {
                /**
                 * @public
                 * @return {void}
                 */
                beginUpdate() {
                    count++;
                },
                /**
                 * @public
                 * @return {void}
                 */
                endUpdate() {
                    count--;
                    if (count === 0) {
                        observable.reportChanges();
                        if (didChange) {
                            didChange = false;
                            listener.call(thisArgs);
                        }
                    }
                },
                /**
                 * @public
                 * @return {void}
                 */
                handlePossibleChange() {
                    // noop
                },
                /**
                 * @public
                 * @return {void}
                 */
                handleChange() {
                    didChange = true;
                }
            };
            observable.addObserver(observer);
            observable.reportChanges();
            /** @type {?} */
            const disposable = {
                /**
                 * @public
                 * @return {void}
                 */
                dispose() {
                    observable.removeObserver(observer);
                }
            };
            addToDisposables(disposable, disposables);
            return disposable;
        });
    }
    Event.fromObservableLight = fromObservableLight;
})(Event || (Event = {}));
exports.Event = Event;
/**
 * @record
 */
function EmitterOptions() { }
exports.EmitterOptions = EmitterOptions;
/* istanbul ignore if */
if (false) {
    /**
     * Optional function that's called *before* the very first listener is added
     * @type {(undefined|!Function)}
     * @public
     */
    EmitterOptions.prototype.onWillAddFirstListener;
    /**
     * Optional function that's called *after* the very first listener is added
     * @type {(undefined|!Function)}
     * @public
     */
    EmitterOptions.prototype.onDidAddFirstListener;
    /**
     * Optional function that's called after a listener is added
     * @type {(undefined|!Function)}
     * @public
     */
    EmitterOptions.prototype.onDidAddListener;
    /**
     * Optional function that's called *after* remove the very last listener
     * @type {(undefined|!Function)}
     * @public
     */
    EmitterOptions.prototype.onDidRemoveLastListener;
    /**
     * Optional function that's called *before* a listener is removed
     * @type {(undefined|!Function)}
     * @public
     */
    EmitterOptions.prototype.onWillRemoveListener;
    /**
     * Optional function that's called when a listener throws an error. Defaults to
     * {\@link onUnexpectedError}
     * @type {(undefined|function(?): void)}
     * @public
     */
    EmitterOptions.prototype.onListenerError;
    /**
     * Number of listeners that are allowed before assuming a leak. Default to
     * a globally configured value
     *
     * @see setGlobalLeakWarningThreshold
     * @type {(undefined|number)}
     * @public
     */
    EmitterOptions.prototype.leakWarningThreshold;
    /**
     * Pass in a delivery queue, which is useful for ensuring
     * in order event delivery across multiple emitters.
     * @type {(undefined|!EventDeliveryQueue)}
     * @public
     */
    EmitterOptions.prototype.deliveryQueue;
    /**
     * ONLY enable this during development
     * @type {(undefined|string)}
     * @public
     */
    EmitterOptions.prototype._profName;
}
class EventProfiling {
    /**
     * @public
     * @param {string} name
     */
    constructor(name) {
        this.listenerCount = 0;
        this.invocationCount = 0;
        this.elapsedOverall = 0;
        this.durations = [];
        this.name = `${name}_${EventProfiling._idPool++}`;
        EventProfiling.all.add(this);
    }
    /**
     * @public
     * @param {number} listenerCount
     * @return {void}
     */
    start(listenerCount) {
        this._stopWatch = new stopwatch_1.StopWatch();
        this.listenerCount = listenerCount;
    }
    /**
     * @public
     * @return {void}
     */
    stop() {
        if (this._stopWatch) {
            /** @type {number} */
            const elapsed = this._stopWatch.elapsed();
            this.durations.push(elapsed);
            this.elapsedOverall += elapsed;
            this.invocationCount += 1;
            this._stopWatch = undefined;
        }
    }
}
exports.EventProfiling = EventProfiling;
EventProfiling.all = new Set();
EventProfiling._idPool = 0;
/* istanbul ignore if */
if (false) {
    /**
     * @const {!Set<!EventProfiling>}
     * @public
     */
    EventProfiling.all;
    /**
     * @type {number}
     * @private
     */
    EventProfiling._idPool;
    /**
     * @const {string}
     * @public
     */
    EventProfiling.prototype.name;
    /**
     * @type {number}
     * @public
     */
    EventProfiling.prototype.listenerCount;
    /**
     * @type {number}
     * @public
     */
    EventProfiling.prototype.invocationCount;
    /**
     * @type {number}
     * @public
     */
    EventProfiling.prototype.elapsedOverall;
    /**
     * @type {!Array<number>}
     * @public
     */
    EventProfiling.prototype.durations;
    /**
     * @type {(undefined|!tsickle_stopwatch_9.StopWatch)}
     * @private
     */
    EventProfiling.prototype._stopWatch;
}
/** @type {number} */
let _globalLeakWarningThreshold = -1;
/**
 * @param {number} n
 * @return {!tsickle_lifecycle_6.IDisposable}
 */
function setGlobalLeakWarningThreshold(n) {
    /** @type {number} */
    const oldValue = _globalLeakWarningThreshold;
    _globalLeakWarningThreshold = n;
    return {
        /**
         * @public
         * @return {void}
         */
        dispose() {
            _globalLeakWarningThreshold = oldValue;
        }
    };
}
exports.setGlobalLeakWarningThreshold = setGlobalLeakWarningThreshold;
class LeakageMonitor {
    /**
     * @public
     * @param {function(!Error): void} _errorHandler
     * @param {number} threshold
     * @param {string=} name
     */
    constructor(_errorHandler, threshold, name = (LeakageMonitor._idPool++).toString(16).padStart(3, '0')) {
        this._errorHandler = _errorHandler;
        this.threshold = threshold;
        this.name = name;
        this._warnCountdown = 0;
    }
    /**
     * @public
     * @return {void}
     */
    dispose() {
        this._stacks?.clear();
    }
    /**
     * @public
     * @param {!Stacktrace} stack
     * @param {number} listenerCount
     * @return {(undefined|function(): void)}
     */
    check(stack, listenerCount) {
        /** @type {number} */
        const threshold = this.threshold;
        if (threshold <= 0 || listenerCount < threshold) {
            return undefined;
        }
        if (!this._stacks) {
            this._stacks = new Map();
        }
        /** @type {number} */
        const count = (this._stacks.get(stack.value) || 0);
        this._stacks.set(stack.value, count + 1);
        this._warnCountdown -= 1;
        if (this._warnCountdown <= 0) {
            // only warn on first exceed and then every time the limit
            // is exceeded by 50% again
            this._warnCountdown = threshold * 0.5;
            const [topStack__tsickle_destructured_1, topCount__tsickle_destructured_2] = (/** @type {!Array<?>} */ (this.getMostFrequentStack()));
            const topStack = /** @type {string} */ (topStack__tsickle_destructured_1);
            const topCount = /** @type {number} */ (topCount__tsickle_destructured_2);
            /** @type {string} */
            const message = `[${this.name}] potential listener LEAK detected, having ${listenerCount} listeners already. MOST frequent listener (${topCount}):`;
            console.warn(message);
            console.warn(topStack);
            /** @type {!ListenerLeakError} */
            const error = new ListenerLeakError(message, topStack);
            this._errorHandler(error);
            // go/vscode-patch/telemetry/#3eye
            debugService.getJsReporter()?.sendExceptionReport(error, message);
        }
        return (/**
         * @return {void}
         */
        () => {
            /** @type {number} */
            const count = ((/** @type {!Map<string, number>} */ (this._stacks)).get(stack.value) || 0);
            (/** @type {!Map<string, number>} */ (this._stacks)).set(stack.value, count - 1);
        });
    }
    /**
     * @public
     * @return {(undefined|!Array<?>)}
     */
    getMostFrequentStack() {
        if (!this._stacks) {
            return undefined;
        }
        /** @type {(undefined|!Array<?>)} */
        let topStack;
        /** @type {number} */
        let topCount = 0;
        for (const [stack__tsickle_destructured_3, count__tsickle_destructured_4] of this._stacks) {
            const stack = /** @type {string} */ (stack__tsickle_destructured_3);
            const count = /** @type {number} */ (count__tsickle_destructured_4);
            if (!topStack || topCount < count) {
                topStack = [stack, count];
                topCount = count;
            }
        }
        return topStack;
    }
}
LeakageMonitor._idPool = 1;
/* istanbul ignore if */
if (false) {
    /**
     * @type {number}
     * @private
     */
    LeakageMonitor._idPool;
    /**
     * @type {(undefined|!Map<string, number>)}
     * @private
     */
    LeakageMonitor.prototype._stacks;
    /**
     * @type {number}
     * @private
     */
    LeakageMonitor.prototype._warnCountdown;
    /**
     * @const {function(!Error): void}
     * @private
     */
    LeakageMonitor.prototype._errorHandler;
    /**
     * @const {number}
     * @public
     */
    LeakageMonitor.prototype.threshold;
    /**
     * @const {string}
     * @public
     */
    LeakageMonitor.prototype.name;
}
class Stacktrace {
    /**
     * @public
     * @return {!Stacktrace}
     */
    static create() {
        /** @type {!Error} */
        const err = new Error();
        return new Stacktrace(err.stack ?? '');
    }
    /**
     * @private
     * @param {string} value
     */
    constructor(value) {
        this.value = value;
    }
    /**
     * @public
     * @return {void}
     */
    print() {
        console.warn(this.value.split('\n').slice(2).join('\n'));
    }
}
/* istanbul ignore if */
if (false) {
    /**
     * @const {string}
     * @public
     */
    Stacktrace.prototype.value;
}
// error that is logged when going over the configured listener threshold
/**
 * @extends {Error}
 */
class ListenerLeakError extends Error {
    /**
     * @public
     * @param {string} message
     * @param {string} stack
     */
    constructor(message, stack) {
        super(message);
        this.name = 'ListenerLeakError';
        this.stack = stack;
        // See go/typescript/extending_builtins
        Object.setPrototypeOf(this, ListenerLeakError.prototype);
    }
}
exports.ListenerLeakError = ListenerLeakError;
// SEVERE error that is logged when having gone way over the configured listener
// threshold so that the emitter refuses to accept more listeners
/**
 * @extends {Error}
 */
class ListenerRefusalError extends Error {
    /**
     * @public
     * @param {string} message
     * @param {string} stack
     */
    constructor(message, stack) {
        super(message);
        this.name = 'ListenerRefusalError';
        this.stack = stack;
        // See go/typescript/extending_builtins
        Object.setPrototypeOf(this, ListenerRefusalError.prototype);
    }
}
exports.ListenerRefusalError = ListenerRefusalError;
/** @type {number} */
let id = 0;
/**
 * @template T
 */
class UniqueContainer {
    /**
     * @public
     * @param {T} value
     */
    constructor(value) {
        this.value = value;
        this.id = id++;
    }
}
/* istanbul ignore if */
if (false) {
    /**
     * @type {(undefined|!Stacktrace)}
     * @public
     */
    UniqueContainer.prototype.stack;
    /**
     * @type {number}
     * @public
     */
    UniqueContainer.prototype.id;
    /**
     * @const {T}
     * @public
     */
    UniqueContainer.prototype.value;
}
/** @type {number} */
const compactionThreshold = 2;
/** @typedef {!UniqueContainer<function(?): void>} */
var ListenerContainer;
/** @typedef {(!Array<(undefined|!UniqueContainer<function(?): void>)>|!UniqueContainer<function(?): void>)} */
var ListenerOrListeners;
/** @type {function((!Array<(undefined|!UniqueContainer<function(?): void>)>|!UniqueContainer<function(?): void>), function(!UniqueContainer<function(?): void>): void): void} */
const forEachListener = (/**
 * @template T
 * @param {(!Array<(undefined|!UniqueContainer<function(?): void>)>|!UniqueContainer<function(?): void>)} listeners
 * @param {function(!UniqueContainer<function(?): void>): void} fn
 * @return {void}
 */
(listeners, fn) => {
    if (listeners instanceof UniqueContainer) {
        fn(listeners);
    }
    else {
        for (let i = 0; i < (/** @type {!Array<(undefined|!UniqueContainer<function(?): void>)>} */ (listeners)).length; i++) {
            /** @type {(undefined|!UniqueContainer<function(?): void>)} */
            const l = listeners[i];
            if (l) {
                fn(l);
            }
        }
    }
});
/**
 * The Emitter can be used to expose an Event to the public
 * to fire it from the insides.
 * Sample:
 * class Document {
 * private readonly _onDidChange = new Emitter<(value:string)=>any>();
 * public onDidChange = this._onDidChange.event;
 * // getter-style
 * // get onDidChange(): Event<(value:string)=>any> {
 * // 	return this._onDidChange.event;
 * // }
 * private _doIt() {
 * //...
 * this._onDidChange.fire(value);
 * }
 * }
 * @template T
 */
class Emitter {
    /**
     * @public
     * @param {(undefined|!EmitterOptions)=} options
     */
    constructor(options) {
        this._size = 0;
        this._options = options;
        this._leakageMon = (_globalLeakWarningThreshold > 0 || this._options?.leakWarningThreshold)
            ? new LeakageMonitor(options?.onListenerError ?? errors_1.onUnexpectedError, this._options?.leakWarningThreshold ?? _globalLeakWarningThreshold) :
            undefined;
        this._perfMon = this._options?._profName ? new EventProfiling(this._options._profName) : undefined;
        this._deliveryQueue = (/** @type {(undefined|!EventDeliveryQueuePrivate)} */ (this._options?.deliveryQueue));
    }
    /**
     * @public
     * @return {void}
     */
    dispose() {
        if (!this._disposed) {
            this._disposed = true;
            // It is bad to have listeners at the time of disposing an emitter, it is worst to have listeners keep the emitter
            // alive via the reference that's embedded in their disposables. Therefore we loop over all remaining listeners and
            // unset their subscriptions/disposables. Looping and blaming remaining listeners is done on next tick because the
            // the following programming pattern is very popular:
            //
            // const someModel = this._disposables.add(new ModelObject()); // (1) create and register model
            // this._disposables.add(someModel.onDidChange(() => { ... }); // (2) subscribe and register model-event listener
            // ...later...
            // this._disposables.dispose(); disposes (1) then (2): don't warn after (1) but after the "overall dispose" is done
            if (this._deliveryQueue?.current === this) {
                this._deliveryQueue.reset();
            }
            if (this._listeners) {
                if (_enableDisposeWithListenerWarning) {
                    /** @type {(!Array<(undefined|!UniqueContainer<function(T): void>)>|!UniqueContainer<function(T): void>)} */
                    const listeners = this._listeners;
                    queueMicrotask((/**
                     * @return {void}
                     */
                    () => {
                        forEachListener(listeners, (/**
                         * @param {!UniqueContainer<function(T): void>} l
                         * @return {(undefined|void)}
                         */
                        l => l.stack?.print()));
                    }));
                }
                this._listeners = undefined;
                this._size = 0;
            }
            this._options?.onDidRemoveLastListener?.();
            this._leakageMon?.dispose();
        }
    }
    /**
     * For the public to allow to subscribe
     * to events from this Emitter
     * @public
     * @return {?}
     */
    get event() {
        this._event ??= (/**
         * @param {function(T): *} callback
         * @param {?=} thisArgs
         * @param {(undefined|!Array<!tsickle_lifecycle_6.IDisposable>|!tsickle_lifecycle_6.DisposableStore)=} disposables
         * @return {?}
         */
        (callback, thisArgs, disposables) => {
            if (this._leakageMon && this._size > this._leakageMon.threshold ** 2) {
                /** @type {string} */
                const message = `[${this._leakageMon.name}] REFUSES to accept new listeners because it exceeded its threshold by far (${this._size} vs ${this._leakageMon.threshold})`;
                console.warn(message);
                /** @type {!Array<?>} */
                const tuple = this._leakageMon.getMostFrequentStack() ?? ['UNKNOWN stack', -1];
                /** @type {!ListenerRefusalError} */
                const error = new ListenerRefusalError(`${message}. HINT: Stack shows most frequent listener (${tuple[1]}-times)`, tuple[0]);
                /** @type {function(?): void} */
                const errorHandler = this._options?.onListenerError || errors_1.onUnexpectedError;
                errorHandler(error);
                return lifecycle_1.Disposable.None;
            }
            if (this._disposed) {
                // todo: should we warn if a listener is added to a disposed emitter? This happens often
                return lifecycle_1.Disposable.None;
            }
            if (thisArgs) {
                callback = callback.bind(thisArgs);
            }
            /** @type {!UniqueContainer<function(T): *>} */
            const contained = new UniqueContainer(callback);
            /** @type {(undefined|!Function)} */
            let removeMonitor;
            /** @type {(undefined|!Stacktrace)} */
            let stack;
            if (this._leakageMon && this._size >= Math.ceil(this._leakageMon.threshold * 0.2)) {
                // check and record this emitter for potential leakage
                contained.stack = Stacktrace.create();
                removeMonitor = this._leakageMon.check(contained.stack, this._size + 1);
            }
            if (_enableDisposeWithListenerWarning) {
                contained.stack = stack ?? Stacktrace.create();
            }
            if (!this._listeners) {
                this._options?.onWillAddFirstListener?.(this);
                this._listeners = contained;
                this._options?.onDidAddFirstListener?.(this);
            }
            else if (this._listeners instanceof UniqueContainer) {
                this._deliveryQueue ??= new EventDeliveryQueuePrivate();
                this._listeners = [this._listeners, contained];
            }
            else {
                (/** @type {!Array<(undefined|!UniqueContainer<function(T): void>)>} */ (this._listeners)).push(contained);
            }
            this._options?.onDidAddListener?.(this);
            this._size++;
            /** @type {!tsickle_lifecycle_6.IDisposable} */
            const result = (0, lifecycle_1.toDisposable)((/**
             * @return {void}
             */
            () => {
                removeMonitor?.();
                this._removeListener(contained);
            }));
            addToDisposables(result, disposables);
            return result;
        });
        return this._event;
    }
    /**
     * @private
     * @param {!UniqueContainer<function(T): void>} listener
     * @return {void}
     */
    _removeListener(listener) {
        this._options?.onWillRemoveListener?.(this);
        if (!this._listeners) {
            return; // expected if a listener gets disposed
        }
        if (this._size === 1) {
            this._listeners = undefined;
            this._options?.onDidRemoveLastListener?.(this);
            this._size = 0;
            return;
        }
        // size > 1 which requires that listeners be a list:
        /** @type {!Array<(undefined|!UniqueContainer<function(T): void>)>} */
        const listeners = (/** @type {!Array<(undefined|!UniqueContainer<function(T): void>)>} */ (this._listeners));
        /** @type {number} */
        const index = listeners.indexOf(listener);
        if (index === -1) {
            console.log('disposed?', this._disposed);
            console.log('size?', this._size);
            console.log('arr?', JSON.stringify(this._listeners));
            throw new Error('Attempted to dispose unknown listener');
        }
        this._size--;
        listeners[index] = undefined;
        /** @type {boolean} */
        const adjustDeliveryQueue = (/** @type {!EventDeliveryQueuePrivate} */ (this._deliveryQueue)).current === this;
        if (this._size * compactionThreshold <= listeners.length) {
            /** @type {number} */
            let n = 0;
            for (let i = 0; i < listeners.length; i++) {
                if (listeners[i]) {
                    listeners[n++] = listeners[i];
                }
                else if (adjustDeliveryQueue && n < (/** @type {!EventDeliveryQueuePrivate} */ (this._deliveryQueue)).end) {
                    (/** @type {!EventDeliveryQueuePrivate} */ (this._deliveryQueue)).end--;
                    if (n < (/** @type {!EventDeliveryQueuePrivate} */ (this._deliveryQueue)).i) {
                        (/** @type {!EventDeliveryQueuePrivate} */ (this._deliveryQueue)).i--;
                    }
                }
            }
            listeners.length = n;
        }
    }
    /**
     * @private
     * @param {(undefined|!UniqueContainer<function(T): void>)} listener
     * @param {T} value
     * @return {void}
     */
    _deliver(listener, value) {
        if (!listener) {
            return;
        }
        /** @type {function(?): void} */
        const errorHandler = this._options?.onListenerError || errors_1.onUnexpectedError;
        if (!errorHandler) {
            listener.value(value);
            return;
        }
        try {
            listener.value(value);
        }
        catch (e) {
            errorHandler(e);
        }
    }
    /**
     * Delivers items in the queue. Assumes the queue is ready to go.
     * @private
     * @param {!EventDeliveryQueuePrivate} dq
     * @return {void}
     */
    _deliverQueue(dq) {
        /** @type {!Array<(undefined|!UniqueContainer<function(T): void>)>} */
        const listeners = (/** @type {!Array<(undefined|!UniqueContainer<function(T): void>)>} */ ((/** @type {(!Array<(undefined|!UniqueContainer<function(?): void>)>|!UniqueContainer<function(?): void>)} */ ((/** @type {!Emitter<?>} */ (dq.current))._listeners))));
        while (dq.i < dq.end) {
            // important: dq.i is incremented before calling deliver() because it might reenter deliverQueue()
            this._deliver(listeners[dq.i++], (/** @type {T} */ (dq.value)));
        }
        dq.reset();
    }
    /**
     * To be kept private to fire an event to
     * subscribers
     * @public
     * @param {T} event
     * @return {void}
     */
    fire(event) {
        if (this._deliveryQueue?.current) {
            this._deliverQueue(this._deliveryQueue);
            this._perfMon?.stop(); // last fire() will have starting perfmon, stop it before starting the next dispatch
        }
        this._perfMon?.start(this._size);
        if (!this._listeners) {
            // no-op
        }
        else if (this._listeners instanceof UniqueContainer) {
            this._deliver(this._listeners, event);
        }
        else {
            /** @type {!EventDeliveryQueuePrivate} */
            const dq = (/** @type {!EventDeliveryQueuePrivate} */ (this._deliveryQueue));
            dq.enqueue(this, event, (/** @type {!Array<(undefined|!UniqueContainer<function(T): void>)>} */ (this._listeners)).length);
            this._deliverQueue(dq);
        }
        this._perfMon?.stop();
    }
    /**
     * @public
     * @return {boolean}
     */
    hasListeners() {
        return this._size > 0;
    }
}
exports.Emitter = Emitter;
/* istanbul ignore if */
if (false) {
    /**
     * @const {(undefined|!EmitterOptions)}
     * @private
     */
    Emitter.prototype._options;
    /**
     * @const {(undefined|!LeakageMonitor)}
     * @private
     */
    Emitter.prototype._leakageMon;
    /**
     * @const {(undefined|!EventProfiling)}
     * @private
     */
    Emitter.prototype._perfMon;
    /**
     * @type {(undefined|boolean)}
     * @private
     */
    Emitter.prototype._disposed;
    /**
     * @type {(undefined|?)}
     * @private
     */
    Emitter.prototype._event;
    /**
     * A listener, or list of listeners. A single listener is the most common
     * for event emitters (#185789), so we optimize that special case to avoid
     * wrapping it in an array (just like Node.js itself.)
     *
     * A list of listeners never 'downgrades' back to a plain function if
     * listeners are removed, for two reasons:
     *
     *  1. That's complicated (especially with the deliveryQueue)
     *  2. A listener with >1 listener is likely to have >1 listener again at
     *     some point, and swapping between arrays and functions may[citation needed]
     *     introduce unnecessary work and garbage.
     *
     * The array listeners can be 'sparse', to avoid reallocating the array
     * whenever any listener is added or removed. If more than `1 / compactionThreshold`
     * of the array is empty, only then is it resized.
     * @type {(undefined|!Array<(undefined|!UniqueContainer<function(T): void>)>|!UniqueContainer<function(T): void>)}
     * @protected
     */
    Emitter.prototype._listeners;
    /**
     * Always to be defined if _listeners is an array. It's no longer a true
     * queue, but holds the dispatching 'state'. If `fire()` is called on an
     * emitter, any work left in the _deliveryQueue is finished first.
     * @type {(undefined|!EventDeliveryQueuePrivate)}
     * @private
     */
    Emitter.prototype._deliveryQueue;
    /**
     * @type {number}
     * @protected
     */
    Emitter.prototype._size;
}
/**
 * @record
 */
function EventDeliveryQueue() { }
exports.EventDeliveryQueue = EventDeliveryQueue;
/* istanbul ignore if */
if (false) {
    /**
     * @type {boolean}
     * @public
     */
    EventDeliveryQueue.prototype._isEventDeliveryQueue;
}
/** @type {function(): !EventDeliveryQueue} */
exports.createEventDeliveryQueue = (/**
 * @return {!EventDeliveryQueue}
 */
() => new EventDeliveryQueuePrivate());
/**
 * @implements {EventDeliveryQueue}
 */
class EventDeliveryQueuePrivate {
    constructor() {
        /**
         * Index in current's listener list.
         */
        this.i = -1;
        /**
         * The last index in the listener's list to deliver.
         */
        this.end = 0;
    }
    /**
     * @public
     * @template T
     * @param {!Emitter<T>} emitter
     * @param {T} value
     * @param {number} end
     * @return {void}
     */
    enqueue(emitter, value, end) {
        this.i = 0;
        this.end = end;
        this.current = emitter;
        this.value = value;
    }
    /**
     * @public
     * @return {void}
     */
    reset() {
        this.i = this.end; // force any current emission loop to stop, mainly for during dispose
        // force any current emission loop to stop, mainly for during dispose
        this.current = undefined;
        this.value = undefined;
    }
}
/* istanbul ignore if */
if (false) {
    /**
     * @type {boolean}
     * @public
     */
    EventDeliveryQueuePrivate.prototype._isEventDeliveryQueue;
    /**
     * Index in current's listener list.
     * @type {number}
     * @public
     */
    EventDeliveryQueuePrivate.prototype.i;
    /**
     * The last index in the listener's list to deliver.
     * @type {number}
     * @public
     */
    EventDeliveryQueuePrivate.prototype.end;
    /**
     * Emitter currently being dispatched on. Emitter._listeners is always an array.
     * @type {(undefined|!Emitter<?>)}
     * @public
     */
    EventDeliveryQueuePrivate.prototype.current;
    /**
     * Currently emitting value. Defined whenever `current` is.
     * @type {*}
     * @public
     */
    EventDeliveryQueuePrivate.prototype.value;
}
/**
 * @record
 */
function IWaitUntil() { }
exports.IWaitUntil = IWaitUntil;
/* istanbul ignore if */
if (false) {
    /**
     * @type {?}
     * @public
     */
    IWaitUntil.prototype.token;
    /**
     * @public
     * @param {!Promise<*>} thenable
     * @return {void}
     */
    IWaitUntil.prototype.waitUntil = function (thenable) { };
}
/** @typedef {?} */
exports.IWaitUntilData;
/**
 * @template T
 * @extends {Emitter<T>}
 */
class AsyncEmitter extends Emitter {
    /**
     * @public
     * @param {?} data
     * @param {?} token
     * @param {(undefined|function(!Promise<*>, !Function): !Promise<*>)=} promiseJoin
     * @return {!Promise<void>}
     */
    async fireAsync(data, token, promiseJoin) {
        if (!this._listeners) {
            return;
        }
        if (!this._asyncDeliveryQueue) {
            this._asyncDeliveryQueue = new linkedList_1.LinkedList();
        }
        forEachListener(this._listeners, (/**
         * @param {!UniqueContainer<function(T): void>} listener
         * @return {function(): void}
         */
        listener => (/** @type {!tsickle_linkedList_7.LinkedList<!Array<?>>} */ (this._asyncDeliveryQueue)).push([listener.value, data])));
        while (this._asyncDeliveryQueue.size > 0 && !token.isCancellationRequested) {
            const [listener__tsickle_destructured_5, data__tsickle_destructured_6] = (/** @type {!Array<?>} */ (this._asyncDeliveryQueue.shift()));
            const listener = /** @type {function(T): void} */ (listener__tsickle_destructured_5);
            const data = /** @type {?} */ (data__tsickle_destructured_6);
            /** @type {!Array<!Promise<*>>} */
            const thenables = [];
            // eslint-disable-next-line local/code-no-dangerous-type-assertions
            /** @type {T} */
            const event = (/** @type {T} */ ({
                ...data,
                token,
                waitUntil: (/**
                 * @param {!Promise<*>} p
                 * @return {void}
                 */
                (p) => {
                    if (Object.isFrozen(thenables)) {
                        throw new Error('waitUntil can NOT be called asynchronous');
                    }
                    if (promiseJoin) {
                        p = promiseJoin(p, listener);
                    }
                    thenables.push(p);
                })
            }));
            try {
                listener(event);
            }
            catch (e) {
                (0, errors_1.onUnexpectedError)(e);
                continue;
            }
            // freeze thenables-collection to enforce sync-calls to
            // wait until and then wait for all thenables to resolve
            Object.freeze(thenables);
            await Promise.allSettled(thenables).then((/**
             * @param {!Array<(!PromiseFulfilledResult<*>|!PromiseRejectedResult)>} values
             * @return {void}
             */
            values => {
                for (const value of values) {
                    if (value.status === 'rejected') {
                        (0, errors_1.onUnexpectedError)((/** @type {!PromiseRejectedResult} */ (value)).reason);
                    }
                }
            }));
        }
    }
}
exports.AsyncEmitter = AsyncEmitter;
/* istanbul ignore if */
if (false) {
    /**
     * @type {(undefined|!tsickle_linkedList_7.LinkedList<!Array<?>>)}
     * @private
     */
    AsyncEmitter.prototype._asyncDeliveryQueue;
}
/**
 * @template T
 * @extends {Emitter<T>}
 */
class PauseableEmitter extends Emitter {
    /**
     * @public
     * @return {boolean}
     */
    get isPaused() {
        return this._isPaused !== 0;
    }
    /**
     * @public
     * @param {(undefined|?)=} options
     */
    constructor(options) {
        super(options);
        this._isPaused = 0;
        this._eventQueue = new linkedList_1.LinkedList();
        this._mergeFn = options?.merge;
    }
    /**
     * @public
     * @return {void}
     */
    pause() {
        this._isPaused++;
    }
    /**
     * @public
     * @return {void}
     */
    resume() {
        if (this._isPaused !== 0 && --this._isPaused === 0) {
            if (this._mergeFn) {
                // use the merge function to create a single composite
                // event. make a copy in case firing pauses this emitter
                if (this._eventQueue.size > 0) {
                    /** @type {!Array<T>} */
                    const events = Array.from(this._eventQueue);
                    this._eventQueue.clear();
                    super.fire(this._mergeFn(events));
                }
            }
            else {
                // no merging, fire each event individually and test
                // that this emitter isn't paused halfway through
                while (!this._isPaused && this._eventQueue.size !== 0) {
                    super.fire((/** @type {T} */ (this._eventQueue.shift())));
                }
            }
        }
    }
    /**
     * @public
     * @param {T} event
     * @return {void}
     */
    fire(event) {
        if (this._size) {
            if (this._isPaused !== 0) {
                this._eventQueue.push(event);
            }
            else {
                super.fire(event);
            }
        }
    }
}
exports.PauseableEmitter = PauseableEmitter;
/* istanbul ignore if */
if (false) {
    /**
     * @type {number}
     * @private
     */
    PauseableEmitter.prototype._isPaused;
    /**
     * @type {!tsickle_linkedList_7.LinkedList<T>}
     * @protected
     */
    PauseableEmitter.prototype._eventQueue;
    /**
     * @type {(undefined|function(!Array<T>): T)}
     * @private
     */
    PauseableEmitter.prototype._mergeFn;
}
/**
 * @template T
 * @extends {PauseableEmitter<T>}
 */
class DebounceEmitter extends PauseableEmitter {
    /**
     * @public
     * @param {?} options
     */
    constructor(options) {
        super(options);
        this._delay = options.delay ?? 100;
    }
    /**
     * @public
     * @param {T} event
     * @return {void}
     */
    fire(event) {
        if (!this._handle) {
            this.pause();
            this._handle = setTimeout((/**
             * @return {void}
             */
            () => {
                this._handle = undefined;
                this.resume();
            }), this._delay);
        }
        super.fire(event);
    }
}
exports.DebounceEmitter = DebounceEmitter;
/* istanbul ignore if */
if (false) {
    /**
     * @const {number}
     * @private
     */
    DebounceEmitter.prototype._delay;
    /**
     * @type {(undefined|number)}
     * @private
     */
    DebounceEmitter.prototype._handle;
}
/**
 * An emitter which queue all events and then process them at the
 * end of the event loop.
 * @template T
 * @extends {Emitter<T>}
 */
class MicrotaskEmitter extends Emitter {
    /**
     * @public
     * @param {(undefined|?)=} options
     */
    constructor(options) {
        super(options);
        this._queuedEvents = [];
        this._mergeFn = options?.merge;
    }
    /**
     * @public
     * @param {T} event
     * @return {void}
     */
    fire(event) {
        if (!this.hasListeners()) {
            return;
        }
        this._queuedEvents.push(event);
        if (this._queuedEvents.length === 1) {
            queueMicrotask((/**
             * @return {void}
             */
            () => {
                if (this._mergeFn) {
                    super.fire(this._mergeFn(this._queuedEvents));
                }
                else {
                    this._queuedEvents.forEach((/**
                     * @param {T} e
                     * @return {void}
                     */
                    e => super.fire(e)));
                }
                this._queuedEvents = [];
            }));
        }
    }
}
exports.MicrotaskEmitter = MicrotaskEmitter;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!Array<T>}
     * @private
     */
    MicrotaskEmitter.prototype._queuedEvents;
    /**
     * @type {(undefined|function(!Array<T>): T)}
     * @private
     */
    MicrotaskEmitter.prototype._mergeFn;
}
/**
 * An event emitter that multiplexes many events into a single event.
 *
 * \@example Listen to the `onData` event of all `Thing`s, dynamically adding and removing `Thing`s
 * to the multiplexer as needed.
 *
 * ```typescript
 * const anythingDataMultiplexer = new EventMultiplexer<{ data: string }>();
 *
 * const thingListeners = DisposableMap<Thing, IDisposable>();
 *
 * thingService.onDidAddThing(thing => {
 *   thingListeners.set(thing, anythingDataMultiplexer.add(thing.onData);
 * });
 * thingService.onDidRemoveThing(thing => {
 *   thingListeners.deleteAndDispose(thing);
 * });
 *
 * anythingDataMultiplexer.event(e => {
 *   console.log('Something fired data ' + e.data)
 * });
 * ```
 * @template T
 * @implements {tsickle_lifecycle_6.IDisposable}
 */
class EventMultiplexer {
    /**
     * @public
     */
    constructor() {
        this.hasListeners = false;
        this.events = [];
        this.emitter = new Emitter({
            onWillAddFirstListener: (/**
             * @return {void}
             */
            () => this.onFirstListenerAdd()),
            onDidRemoveLastListener: (/**
             * @return {void}
             */
            () => this.onLastListenerRemove())
        });
    }
    /**
     * @public
     * @return {?}
     */
    get event() {
        return this.emitter.event;
    }
    /**
     * @public
     * @param {?} event
     * @return {!tsickle_lifecycle_6.IDisposable}
     */
    add(event) {
        /** @type {{event: ?, listener: null}} */
        const e = { event: event, listener: null };
        this.events.push(e);
        if (this.hasListeners) {
            this.hook(e);
        }
        /** @type {function(): void} */
        const dispose = (/**
         * @return {void}
         */
        () => {
            if (this.hasListeners) {
                this.unhook(e);
            }
            /** @type {number} */
            const idx = this.events.indexOf(e);
            this.events.splice(idx, 1);
        });
        return (0, lifecycle_1.toDisposable)((0, functional_1.createSingleCallFunction)(dispose));
    }
    /**
     * @private
     * @return {void}
     */
    onFirstListenerAdd() {
        this.hasListeners = true;
        this.events.forEach((/**
         * @param {{event: ?, listener: (null|!tsickle_lifecycle_6.IDisposable)}} e
         * @return {void}
         */
        e => this.hook(e)));
    }
    /**
     * @private
     * @return {void}
     */
    onLastListenerRemove() {
        this.hasListeners = false;
        this.events.forEach((/**
         * @param {{event: ?, listener: (null|!tsickle_lifecycle_6.IDisposable)}} e
         * @return {void}
         */
        e => this.unhook(e)));
    }
    /**
     * @private
     * @param {{event: ?, listener: (null|!tsickle_lifecycle_6.IDisposable)}} e
     * @return {void}
     */
    hook(e) {
        e.listener = e.event((/**
         * @param {T} r
         * @return {void}
         */
        r => this.emitter.fire(r)));
    }
    /**
     * @private
     * @param {{event: ?, listener: (null|!tsickle_lifecycle_6.IDisposable)}} e
     * @return {void}
     */
    unhook(e) {
        e.listener?.dispose();
        e.listener = null;
    }
    /**
     * @public
     * @return {void}
     */
    dispose() {
        this.emitter.dispose();
        for (const e of this.events) {
            e.listener?.dispose();
        }
        this.events = [];
    }
}
exports.EventMultiplexer = EventMultiplexer;
/* istanbul ignore if */
if (false) {
    /**
     * @const {!Emitter<T>}
     * @private
     */
    EventMultiplexer.prototype.emitter;
    /**
     * @type {boolean}
     * @private
     */
    EventMultiplexer.prototype.hasListeners;
    /**
     * @type {!Array<{event: ?, listener: (null|!tsickle_lifecycle_6.IDisposable)}>}
     * @private
     */
    EventMultiplexer.prototype.events;
}
/**
 * @record
 * @template TEventType
 * @extends {tsickle_lifecycle_6.IDisposable}
 */
function IDynamicListEventMultiplexer() { }
exports.IDynamicListEventMultiplexer = IDynamicListEventMultiplexer;
/* istanbul ignore if */
if (false) {
    /**
     * @const {?}
     * @public
     */
    IDynamicListEventMultiplexer.prototype.event;
}
/**
 * @template TItem, TEventType
 * @implements {IDynamicListEventMultiplexer<TEventType>}
 */
class DynamicListEventMultiplexer {
    /**
     * @public
     * @param {!Array<TItem>} items
     * @param {?} onAddItem
     * @param {?} onRemoveItem
     * @param {function(TItem): ?} getEvent
     */
    constructor(items, onAddItem, onRemoveItem, getEvent) {
        this._store = new lifecycle_1.DisposableStore();
        /** @type {!EventMultiplexer<TEventType>} */
        const multiplexer = this._store.add(new EventMultiplexer());
        /** @type {!tsickle_lifecycle_6.DisposableMap<TItem, !tsickle_lifecycle_6.IDisposable>} */
        const itemListeners = this._store.add(new lifecycle_1.DisposableMap());
        /**
         * @param {TItem} instance
         * @return {void}
         */
        function addItem(instance) {
            itemListeners.set(instance, multiplexer.add(getEvent(instance)));
        }
        // Existing items
        for (const instance of items) {
            addItem(instance);
        }
        // Added items
        this._store.add(onAddItem((/**
         * @param {TItem} instance
         * @return {void}
         */
        instance => {
            addItem(instance);
        })));
        // Removed items
        this._store.add(onRemoveItem((/**
         * @param {TItem} instance
         * @return {void}
         */
        instance => {
            itemListeners.deleteAndDispose(instance);
        })));
        this.event = multiplexer.event;
    }
    /**
     * @public
     * @return {void}
     */
    dispose() {
        this._store.dispose();
    }
}
exports.DynamicListEventMultiplexer = DynamicListEventMultiplexer;
/* istanbul ignore if */
if (false) {
    /**
     * @const {!tsickle_lifecycle_6.DisposableStore}
     * @private
     */
    DynamicListEventMultiplexer.prototype._store;
    /**
     * @const {?}
     * @public
     */
    DynamicListEventMultiplexer.prototype.event;
}
/**
 * The EventBufferer is useful in situations in which you want
 * to delay firing your events during some code.
 * You can wrap that code and be sure that the event will not
 * be fired during that wrap.
 *
 * ```
 * const emitter: Emitter;
 * const delayer = new EventDelayer();
 * const delayedEvent = delayer.wrapEvent(emitter.event);
 *
 * delayedEvent(console.log);
 *
 * delayer.bufferEvents(() => {
 *   emitter.fire(); // event will not be fired yet
 * });
 *
 * // event will only be fired at this point
 * ```
 */
class EventBufferer {
    constructor() {
        this.data = [];
    }
    /**
     * @public
     * @template T, O
     * @param {?} event
     * @param {(undefined|function((undefined|O|T), T): (O|T))=} reduce
     * @param {(undefined|O)=} initial
     * @return {?}
     */
    wrapEvent(event, reduce, initial) {
        return (/**
         * @param {function((O|T)): *} listener
         * @param {?=} thisArgs
         * @param {(undefined|!Array<!tsickle_lifecycle_6.IDisposable>|!tsickle_lifecycle_6.DisposableStore)=} disposables
         * @return {!tsickle_lifecycle_6.IDisposable}
         */
        (listener, thisArgs, disposables) => {
            return event((/**
             * @param {T} i
             * @return {void}
             */
            i => {
                /** @type {{buffers: !Array<!Function>}} */
                const data = this.data[this.data.length - 1];
                // Non-reduce scenario
                if (!reduce) {
                    // Buffering case
                    if (data) {
                        data.buffers.push((/**
                         * @return {*}
                         */
                        () => listener.call(thisArgs, i)));
                    }
                    else {
                        // Not buffering case
                        listener.call(thisArgs, i);
                    }
                    return;
                }
                // Reduce scenario
                /** @type {?} */
                const reduceData = (/** @type {?} */ (data));
                // Not buffering case
                if (!reduceData) {
                    // TODO: Is there a way to cache this reduce call for all listeners?
                    listener.call(thisArgs, reduce(initial, i));
                    return;
                }
                // Buffering case
                reduceData.items ??= [];
                reduceData.items.push(i);
                if (reduceData.buffers.length === 0) {
                    // Include a single buffered function that will reduce all events when we're done buffering events
                    data.buffers.push((/**
                     * @return {void}
                     */
                    () => {
                        // cache the reduced result so that the value can be shared across all listeners
                        reduceData.reducedResult ??= initial
                            ? (/** @type {!Array<T>} */ (reduceData.items)).reduce((/** @type {function((undefined|O), T): O} */ (reduce)), initial)
                            : (/** @type {!Array<T>} */ (reduceData.items)).reduce((/** @type {function((undefined|T), T): T} */ (reduce)));
                        listener.call(thisArgs, reduceData.reducedResult);
                    }));
                }
            }), undefined, disposables);
        });
    }
    /**
     * @public
     * @template R
     * @param {function(): R} fn
     * @return {R}
     */
    bufferEvents(fn) {
        /** @type {{buffers: !Array<!Function>}} */
        const data = { buffers: new Array() };
        this.data.push(data);
        /** @type {R} */
        const r = fn();
        this.data.pop();
        data.buffers.forEach((/**
         * @param {!Function} flush
         * @return {?}
         */
        flush => flush()));
        return r;
    }
}
exports.EventBufferer = EventBufferer;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!Array<{buffers: !Array<!Function>}>}
     * @private
     */
    EventBufferer.prototype.data;
}
/**
 * A Relay is an event forwarder which functions as a replugabble event pipe.
 * Once created, you can connect an input event to it and it will simply forward
 * events from that input event through its own `event` property. The `input`
 * can be changed at any point in time.
 * @template T
 * @implements {tsickle_lifecycle_6.IDisposable}
 */
class Relay {
    constructor() {
        this.listening = false;
        this.inputEvent = Event.None;
        this.inputEventListener = lifecycle_1.Disposable.None;
        this.emitter = new Emitter({
            onDidAddFirstListener: (/**
             * @return {void}
             */
            () => {
                this.listening = true;
                this.inputEventListener = this.inputEvent(this.emitter.fire, this.emitter);
            }),
            onDidRemoveLastListener: (/**
             * @return {void}
             */
            () => {
                this.listening = false;
                this.inputEventListener.dispose();
            })
        });
        this.event = this.emitter.event;
    }
    /**
     * @public
     * @param {?} event
     * @return {void}
     */
    set input(event) {
        this.inputEvent = event;
        if (this.listening) {
            this.inputEventListener.dispose();
            this.inputEventListener = event(this.emitter.fire, this.emitter);
        }
    }
    /**
     * @public
     * @return {void}
     */
    dispose() {
        this.inputEventListener.dispose();
        this.emitter.dispose();
    }
}
exports.Relay = Relay;
/* istanbul ignore if */
if (false) {
    /**
     * @type {boolean}
     * @private
     */
    Relay.prototype.listening;
    /**
     * @type {?}
     * @private
     */
    Relay.prototype.inputEvent;
    /**
     * @type {!tsickle_lifecycle_6.IDisposable}
     * @private
     */
    Relay.prototype.inputEventListener;
    /**
     * @const {!Emitter<T>}
     * @private
     */
    Relay.prototype.emitter;
    /**
     * @const {?}
     * @public
     */
    Relay.prototype.event;
}
/**
 * @record
 * @template T
 */
function IValueWithChangeEvent() { }
exports.IValueWithChangeEvent = IValueWithChangeEvent;
/* istanbul ignore if */
if (false) {
    /**
     * @const {?}
     * @public
     */
    IValueWithChangeEvent.prototype.onDidChange;
    /**
     * @public
     * @return {T}
     */
    IValueWithChangeEvent.prototype.value = function () { };
}
/**
 * @template T
 * @implements {IValueWithChangeEvent<T>}
 */
class ValueWithChangeEvent {
    /**
     * @public
     * @template T
     * @param {T} value
     * @return {!IValueWithChangeEvent<T>}
     */
    static const(value) {
        return new ConstValueWithChangeEvent(value);
    }
    /**
     * @public
     * @param {T} _value
     */
    constructor(_value) {
        this._value = _value;
        this._onDidChange = new Emitter();
        this.onDidChange = this._onDidChange.event;
    }
    /**
     * @public
     * @return {T}
     */
    get value() {
        return this._value;
    }
    /**
     * @public
     * @param {T} value
     * @return {void}
     */
    set value(value) {
        if (value !== this._value) {
            this._value = value;
            this._onDidChange.fire(undefined);
        }
    }
}
exports.ValueWithChangeEvent = ValueWithChangeEvent;
/* istanbul ignore if */
if (false) {
    /**
     * @const {!Emitter<void>}
     * @private
     */
    ValueWithChangeEvent.prototype._onDidChange;
    /**
     * @const {?}
     * @public
     */
    ValueWithChangeEvent.prototype.onDidChange;
    /**
     * @type {T}
     * @private
     */
    ValueWithChangeEvent.prototype._value;
}
/**
 * @template T
 * @implements {IValueWithChangeEvent<T>}
 */
class ConstValueWithChangeEvent {
    /**
     * @public
     * @param {T} value
     */
    constructor(value) {
        this.value = value;
        this.onDidChange = Event.None;
    }
}
/* istanbul ignore if */
if (false) {
    /**
     * @const {?}
     * @public
     */
    ConstValueWithChangeEvent.prototype.onDidChange;
    /**
     * @const {T}
     * @public
     */
    ConstValueWithChangeEvent.prototype.value;
}
/**
 * @template T
 * @param {function(): !ReadonlySet<T>} getData
 * @param {?} onDidChangeData
 * @param {function(T): !tsickle_lifecycle_6.IDisposable} handleItem Is called for each item in the set (but only the first time the item is seen in the set).
 * 	The returned disposable is disposed if the item is no longer in the set.
 * @return {!tsickle_lifecycle_6.IDisposable}
 */
function trackSetChanges(getData, onDidChangeData, handleItem) {
    /** @type {!tsickle_lifecycle_6.DisposableMap<T, !tsickle_lifecycle_6.IDisposable>} */
    const map = new lifecycle_1.DisposableMap();
    /** @type {!Set<T>} */
    let oldData = new Set(getData());
    for (const d of oldData) {
        map.set(d, handleItem(d));
    }
    /** @type {!tsickle_lifecycle_6.DisposableStore} */
    const store = new lifecycle_1.DisposableStore();
    store.add(onDidChangeData((/**
     * @return {void}
     */
    () => {
        /** @type {!ReadonlySet<T>} */
        const newData = getData();
        /** @type {{removed: !Array<T>, added: !Array<T>}} */
        const diff = (0, collections_1.diffSets)(oldData, newData);
        for (const r of diff.removed) {
            map.deleteAndDispose(r);
        }
        for (const a of diff.added) {
            map.set(a, handleItem(a));
        }
        oldData = new Set(newData);
    })));
    store.add(map);
    return store;
}
exports.trackSetChanges = trackSetChanges;
/**
 * @param {!tsickle_lifecycle_6.IDisposable} result
 * @param {(undefined|!Array<!tsickle_lifecycle_6.IDisposable>|!tsickle_lifecycle_6.DisposableStore)} disposables
 * @return {void}
 */
function addToDisposables(result, disposables) {
    if (disposables instanceof lifecycle_1.DisposableStore) {
        (/** @type {!tsickle_lifecycle_6.DisposableStore} */ (disposables)).add(result);
    }
    else if (Array.isArray(disposables)) {
        (/** @type {!Array<!tsickle_lifecycle_6.IDisposable>} */ (disposables)).push(result);
    }
}
/**
 * @param {!tsickle_lifecycle_6.IDisposable} result
 * @param {(undefined|!Array<!tsickle_lifecycle_6.IDisposable>|!tsickle_lifecycle_6.DisposableStore)} disposables
 * @return {void}
 */
function disposeAndRemove(result, disposables) {
    if (disposables instanceof lifecycle_1.DisposableStore) {
        (/** @type {!tsickle_lifecycle_6.DisposableStore} */ (disposables)).delete(result);
    }
    else if (Array.isArray(disposables)) {
        /** @type {number} */
        const index = (/** @type {!Array<!tsickle_lifecycle_6.IDisposable>} */ (disposables)).indexOf(result);
        if (index !== -1) {
            (/** @type {!Array<!tsickle_lifecycle_6.IDisposable>} */ (disposables)).splice(index, 1);
        }
    }
    result.dispose();
}
