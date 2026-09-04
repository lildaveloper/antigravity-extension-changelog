/**
 * @fileoverview Re-exports event-related functionality from VSCode.
 *
 * This is not a simple re-export, because VSCode's internal Event is not
 * directly compatibility with vscode.Event: The internal version accepts
 * DisposableStore as a third argument, but the extension API doesn't. Note that
 * this is primarily a compile-time type conflict, as some of the internal API
 * is not exposed to extensions while the exposed classes are actually the same.
 * Generated from: devtools/cider/extensionutils/vscode/event.ts
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
goog.module('google3.devtools.cider.extensionutils.vscode.event');
var module = module || { id: 'devtools/cider/extensionutils/vscode/event.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_event_1 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.event");
const tsickle_lifecycle_2 = goog.requireType("google3.devtools.cider.extensionutils.vscode.lifecycle");
const event_1 = goog.require('google3.third_party.antigravity.src.vs.base.common.event');
exports.Emitter = event_1.Emitter;
exports.Event = event_1.Event;
const lifecycle_1 = goog.require('google3.devtools.cider.extensionutils.vscode.lifecycle');
/**
 * @record
 */
function Disposable() { }
/* istanbul ignore if */
if (false) {
    /**
     * @public
     * @return {void}
     */
    Disposable.prototype.dispose = function () { };
}
/**
 * @record
 * @template T
 */
function BaseEvent() { }
/**
 * Export an event type which could be either the vscode.d.ts type, or an
 * internal VS Code event.
 *
 * The internal VS Code event, accepts a DisposableStore as a parameter, which
 * the other doesn't.
 * @typedef {(!BaseEvent<?>|?)}
 */
exports.CombinedEvent;
/**
 * @template T
 * @param {(!BaseEvent<T>|?)} event
 * @param {function(T): boolean} filter
 * @param {(undefined|!Array<!Disposable>|!tsickle_lifecycle_2.DisposableStore)=} disposables
 * @return {(!BaseEvent<T>|?)}
 */
function filter(event, filter, disposables) {
    return withDisposableStore(disposables, (/**
     * @param {!tsickle_lifecycle_2.DisposableStore} store
     * @return {?}
     */
    (store) => event_1.Event.filter((/** @type {?} */ (event)), filter, store)));
}
exports.filter = filter;
/**
 * @template T
 * @param {(!BaseEvent<T>|?)} event
 * @param {boolean=} flushAfterTimeout
 * @param {!Array<T>=} buffer
 * @param {(undefined|!Array<!Disposable>|!tsickle_lifecycle_2.DisposableStore)=} disposables
 * @return {(!BaseEvent<T>|?)}
 */
function buffer(event, flushAfterTimeout = false, buffer = [], disposables) {
    return withDisposableStore(disposables, (/**
     * @param {!tsickle_lifecycle_2.DisposableStore} store
     * @return {?}
     */
    (store) => event_1.Event.buffer((/** @type {?} */ (event)), flushAfterTimeout, buffer, store)));
}
exports.buffer = buffer;
/**
 * @template I, T
 * @param {(!BaseEvent<I>|?)} event
 * @param {function(I): T} map
 * @param {(undefined|!Array<!Disposable>|!tsickle_lifecycle_2.DisposableStore)=} disposables
 * @return {(!BaseEvent<T>|?)}
 */
function map(event, map, disposables) {
    return withDisposableStore(disposables, (/**
     * @param {!tsickle_lifecycle_2.DisposableStore} store
     * @return {?}
     */
    (store) => event_1.Event.map((/** @type {?} */ (event)), map, store)));
}
exports.map = map;
/**
 * Returns a promise that is resolved with the first value from an event.
 * @template T
 * @param {(!BaseEvent<T>|?)} event
 * @param {(undefined|!Array<!Disposable>)=} disposables
 * @return {!Promise<T>}
 */
function toPromise(event, disposables) {
    return event_1.Event.toPromise((/** @type {?} */ (event)), disposables);
}
exports.toPromise = toPromise;
/**
 * Returns an event that fires when the promise is resolved.
 * @template T
 * @param {!Promise<T>} promise
 * @return {(!BaseEvent<(undefined|T)>|?)}
 */
function fromPromise(promise) {
    /** @type {!tsickle_event_1.Emitter<(undefined|T)>} */
    const result = new event_1.Emitter();
    promise
        .then((/**
     * @param {T} res
     * @return {void}
     */
    (res) => {
        result.fire(res);
    }), (/**
     * @return {void}
     */
    () => {
        result.fire(undefined);
    }))
        .finally((/**
     * @return {void}
     */
    () => {
        result.dispose();
    }));
    return result.event;
}
exports.fromPromise = fromPromise;
/**
 * @template T
 * @param {...(!BaseEvent<T>|?)} events
 * @return {(!BaseEvent<T>|?)}
 */
function any(...events) {
    return event_1.Event.any(...((/** @type {!Array<?>} */ (events))));
}
exports.any = any;
/**
 * @template T
 * @param {(undefined|!Array<!Disposable>|!tsickle_lifecycle_2.DisposableStore)} disposables
 * @param {function(!tsickle_lifecycle_2.DisposableStore): (!BaseEvent<T>|?)} fn
 * @return {(!BaseEvent<T>|?)}
 */
function withDisposableStore(disposables, fn) {
    /** @type {!tsickle_lifecycle_2.DisposableStore} */
    const store = disposables instanceof lifecycle_1.DisposableStore
        ? disposables
        : new lifecycle_1.DisposableStore();
    if (Array.isArray(disposables)) {
        (/** @type {!Array<!Disposable>} */ (disposables)).push(store);
    }
    /** @type {(!BaseEvent<T>|?)} */
    const resultEvent = fn(store);
    if (disposables) {
        return resultEvent;
    }
    else {
        return {
            event: resultEvent,
            dispose: (/**
             * @return {undefined}
             */
            () => void store.dispose()),
        };
    }
}
/**
 * Wraps the event in an {\@link IChainableSythensis}, allowing a more functional
 * programming style.
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
 * @param {(!BaseEvent<T>|?)} event
 * @param {function(!tsickle_event_1.Event.IChainableSythensis<T>): !tsickle_event_1.Event.IChainableSythensis<R>} sythensize
 * @return {(!BaseEvent<R>|?)}
 */
function chain(event, sythensize) {
    return event_1.Event.chain((/** @type {?} */ (event)), sythensize);
}
exports.chain = chain;
