/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/antigravity/src/vs/base/common/cancellation.ts
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
goog.module('google3.third_party.antigravity.src.vs.base.common.cancellation');
var module = module || { id: 'third_party/antigravity/src/vs/base/common/cancellation.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_event_1 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.event");
const tsickle_lifecycle_2 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.lifecycle");
const event_1 = goog.require('google3.third_party.antigravity.src.vs.base.common.event');
const lifecycle_1 = goog.require('google3.third_party.antigravity.src.vs.base.common.lifecycle');
// WARNING: interface has both a type and a value, skipping emit
/** @type {?} */
const shortcutEvent = Object.freeze((/**
 * @param {function(void): *} callback
 * @param {?=} context
 * @return {!tsickle_lifecycle_2.IDisposable}
 */
function (callback, context) {
    /** @type {number} */
    const handle = setTimeout(callback.bind(context), 0);
    return { /**
         * @public
         * @return {void}
         */
        dispose() { clearTimeout(handle); } };
}));
var CancellationToken;
(function (CancellationToken) {
    /**
     * @param {*} thing
     * @return {boolean}
     */
    function isCancellationToken(thing) {
        if (thing === CancellationToken.None || thing === CancellationToken.Cancelled) {
            return true;
        }
        if (thing instanceof MutableToken) {
            return true;
        }
        if (!thing || typeof thing !== 'object') {
            return false;
        }
        return typeof ((/** @type {?} */ (thing))).isCancellationRequested === 'boolean'
            && typeof ((/** @type {?} */ (thing))).onCancellationRequested === 'function';
    }
    CancellationToken.isCancellationToken = isCancellationToken;
    /** @type {?} */
    CancellationToken.None = Object.freeze({
        isCancellationRequested: false,
        onCancellationRequested: event_1.Event.None
    });
    /** @type {?} */
    CancellationToken.Cancelled = Object.freeze({
        isCancellationRequested: true,
        onCancellationRequested: shortcutEvent
    });
})(CancellationToken || (CancellationToken = {}));
exports.CancellationToken = CancellationToken;
/**
 * tsickle: dropped implements: {?} type
 */
class MutableToken {
    constructor() {
        this._isCancelled = false;
        this._emitter = null;
    }
    /**
     * @public
     * @return {void}
     */
    cancel() {
        if (!this._isCancelled) {
            this._isCancelled = true;
            if (this._emitter) {
                this._emitter.fire(undefined);
                this.dispose();
            }
        }
    }
    /**
     * @public
     * @return {boolean}
     */
    get isCancellationRequested() {
        return this._isCancelled;
    }
    /**
     * @public
     * @return {?}
     */
    get onCancellationRequested() {
        if (this._isCancelled) {
            return shortcutEvent;
        }
        if (!this._emitter) {
            this._emitter = new event_1.Emitter();
        }
        return this._emitter.event;
    }
    /**
     * @public
     * @return {void}
     */
    dispose() {
        if (this._emitter) {
            this._emitter.dispose();
            this._emitter = null;
        }
    }
}
/* istanbul ignore if */
if (false) {
    /**
     * @type {boolean}
     * @private
     */
    MutableToken.prototype._isCancelled;
    /**
     * @type {(null|!tsickle_event_1.Emitter<void>)}
     * @private
     */
    MutableToken.prototype._emitter;
}
class CancellationTokenSource {
    /**
     * @public
     * @param {(undefined|?)=} parent
     */
    constructor(parent) {
        this._token = undefined;
        this._parentListener = undefined;
        this._parentListener = parent && parent.onCancellationRequested(this.cancel, this);
    }
    /**
     * @public
     * @return {?}
     */
    get token() {
        if (!this._token) {
            // be lazy and create the token only when
            // actually needed
            this._token = new MutableToken();
        }
        return this._token;
    }
    /**
     * @public
     * @return {void}
     */
    cancel() {
        if (!this._token) {
            // save an object by returning the default
            // cancelled token when cancellation happens
            // before someone asks for the token
            this._token = CancellationToken.Cancelled;
        }
        else if (this._token instanceof MutableToken) {
            // actually cancel
            (/** @type {!MutableToken} */ (this._token)).cancel();
        }
    }
    /**
     * @public
     * @param {boolean=} cancel
     * @return {void}
     */
    dispose(cancel = false) {
        if (cancel) {
            this.cancel();
        }
        this._parentListener?.dispose();
        if (!this._token) {
            // ensure to initialize with an empty token if we had none
            this._token = CancellationToken.None;
        }
        else if (this._token instanceof MutableToken) {
            // actually dispose
            (/** @type {!MutableToken} */ (this._token)).dispose();
        }
    }
}
exports.CancellationTokenSource = CancellationTokenSource;
/* istanbul ignore if */
if (false) {
    /**
     * @type {(undefined|?)}
     * @private
     */
    CancellationTokenSource.prototype._token;
    /**
     * @type {(undefined|!tsickle_lifecycle_2.IDisposable)}
     * @private
     */
    CancellationTokenSource.prototype._parentListener;
}
/**
 * @param {!tsickle_lifecycle_2.DisposableStore} store
 * @return {?}
 */
function cancelOnDispose(store) {
    /** @type {!CancellationTokenSource} */
    const source = new CancellationTokenSource();
    store.add({ /**
         * @public
         * @return {void}
         */
        dispose() { source.cancel(); } });
    return source.token;
}
exports.cancelOnDispose = cancelOnDispose;
/**
 * A pool that aggregates multiple cancellation tokens. The pool's own token
 * (accessible via `pool.token`) is cancelled only after every token added
 * to the pool has been cancelled. Adding tokens after the pool token has
 * been cancelled has no effect.
 */
class CancellationTokenPool {
    constructor() {
        this._source = new CancellationTokenSource();
        this._listeners = new lifecycle_1.DisposableStore();
        this._total = 0;
        this._cancelled = 0;
        this._isDone = false;
    }
    /**
     * @public
     * @return {?}
     */
    get token() {
        return this._source.token;
    }
    /**
     * Add a token to the pool. If the token is already cancelled it is counted
     * immediately. Tokens added after the pool token has been cancelled are ignored.
     * @public
     * @param {?} token
     * @return {void}
     */
    add(token) {
        if (this._isDone) {
            return;
        }
        this._total++;
        if (token.isCancellationRequested) {
            this._cancelled++;
            this._check();
            return;
        }
        /** @type {!tsickle_lifecycle_2.IDisposable} */
        const d = token.onCancellationRequested((/**
         * @return {void}
         */
        () => {
            d.dispose();
            this._cancelled++;
            this._check();
        }));
        this._listeners.add(d);
    }
    /**
     * @private
     * @return {void}
     */
    _check() {
        if (!this._isDone && this._total > 0 && this._total === this._cancelled) {
            this._isDone = true;
            this._listeners.dispose();
            this._source.cancel();
        }
    }
    /**
     * @public
     * @return {void}
     */
    dispose() {
        this._listeners.dispose();
        this._source.dispose();
    }
}
exports.CancellationTokenPool = CancellationTokenPool;
/* istanbul ignore if */
if (false) {
    /**
     * @const {!CancellationTokenSource}
     * @private
     */
    CancellationTokenPool.prototype._source;
    /**
     * @const {!tsickle_lifecycle_2.DisposableStore}
     * @private
     */
    CancellationTokenPool.prototype._listeners;
    /**
     * @type {number}
     * @private
     */
    CancellationTokenPool.prototype._total;
    /**
     * @type {number}
     * @private
     */
    CancellationTokenPool.prototype._cancelled;
    /**
     * @type {boolean}
     * @private
     */
    CancellationTokenPool.prototype._isDone;
}
