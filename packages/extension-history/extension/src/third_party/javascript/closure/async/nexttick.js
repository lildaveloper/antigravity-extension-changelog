/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Provides a function to schedule running a function as soon
 * as possible after the current JS execution stops and yields to the event
 * loop.
 */

goog.module('goog.async.nextTick');
goog.module.declareLegacyNamespace();

const entryPointRegistry = goog.require('goog.debug.entryPointRegistry');
const propagate = goog.require('google3.javascript.common.async.context.propagate');

/**
 * Fires the provided callbacks as soon as possible after the current JS
 * execution context. setTimeout(…, 0) takes at least 4ms when called from
 * within another setTimeout(…, 0) for legacy reasons.
 *
 * This will not schedule the callback as a microtask (i.e. a task that can
 * preempt user input or networking callbacks). It is meant to emulate what
 * setTimeout(_, 0) would do if it were not throttled. If you desire microtask
 * behavior, use {@see goog.Promise} instead.
 *
 * @param {function(this:SCOPE)} callback Callback function to fire as soon as
 *     possible.
 * @param {SCOPE=} opt_context Object in whose scope to call the listener.
 * @template SCOPE
 */
function nextTick(callback, opt_context) {
  let cb = callback;
  if (opt_context) {
    cb = goog.bind(callback, opt_context);
  }

  cb = nextTick.wrapCallback_(cb);
  if (nextTick.USE_SET_TIMEOUT) {
    setTimeout(cb, 0);
    return;
  } else {
    cb = nextTick.propagateAsyncContext_(cb);
  }

  // Note we do allow callers to also request setImmediate if they are willing
  // to accept the possible tradeoffs of incorrectness in exchange for speed.
  // The IE fallback of readystate change is much slower. See useSetImmediate_
  // for details.
  if (goog.DEBUG && typeof goog.global.setImmediate === 'function' &&
      (nextTick.useSetImmediate_())) {
    goog.global.setImmediate(cb);
    return;
  }

  // Look for and cache the custom fallback version of setImmediate.
  if (!nextTick.nextTickImpl) {
    nextTick.nextTickImpl = nextTick.getNextTickImpl_();
  }
  nextTick.nextTickImpl(cb);
}

/**
 * Null-safe wrapper around `AsyncContext.Snapshot.wrap`.
 * @private @const
 */
nextTick.propagateAsyncContext_ = propagate.propagateAsyncContext;

// TODO(johnlenz): Enable this for goog.FEATURESET_YEAR >= 2018
/** @define {boolean} */
nextTick.USE_SET_TIMEOUT =
    goog.define('goog.async.nextTick.USE_SET_TIMEOUT', false);

/**
 * Returns whether should use setImmediate implementation currently on window.
 *
 * window.setImmediate was introduced and currently only supported by IE10+,
 * but due to a bug in the implementation it is not guaranteed that
 * setImmediate is faster than setTimeout nor that setImmediate N is before
 * setImmediate N+1. That is why we do not use the native version if
 * available. We do, however, call setImmediate if it is a non-native function
 * because that indicates that it has been replaced by goog.testing.MockClock
 * which we do want to support.
 * See
 * http://connect.microsoft.com/IE/feedback/details/801823/setimmediate-and-messagechannel-are-broken-in-ie10
 *
 * @return {boolean} Whether to use the implementation of setImmediate defined
 *     on Window.
 * @private
 * @suppress {missingProperties} For "Window.prototype.setImmediate"
 */
nextTick.useSetImmediate_ = function() {
  // Not a browser environment.
  if (!goog.global.Window || !goog.global.Window.prototype) {
    return true;
  }

  if (goog.global.Window.prototype.setImmediate != goog.global.setImmediate) {
    // Something redefined setImmediate in which case we decide to use it (This
    // is so that we use the mockClock setImmediate).
    return true;
  }

  return false;
};

/**
 * Cache for the nextTick implementation. Exposed so tests can replace it,
 * if needed.
 * @type {function(function())}
 */
nextTick.nextTickImpl;

/**
 * Determines the best possible implementation to run a function as soon as
 * the JS event loop is idle.
 * @return {function(function())} The "setImmediate" implementation.
 * @private
 */
nextTick.getNextTickImpl_ = function() {
  // Create a private message channel and use it to postMessage empty messages
  // to ourselves.

  if (typeof MessageChannel !== 'undefined') {
    const channel = new MessageChannel();
    // Use a fifo linked list to call callbacks in the right order.
    let head = {};
    let tail = head;
    channel['port1'].onmessage = function() {
      if (head.next !== undefined) {
        head = head.next;
        const cb = head.cb;
        head.cb = null;
        cb();
      }
    };
    return function(cb) {
      tail.next = {cb: cb};
      tail = tail.next;
      channel['port2'].postMessage(0);
    };
  }
  // Fall back to setTimeout with 0. In browsers this creates a delay of 5ms
  // or more.
  // NOTE(step): This fallback is used for IE.
  return function(cb) {
    goog.global.setTimeout(/** @type {function()} */ (cb), 0);
  };
};

/**
 * Helper function that is overrided to protect callbacks with entry point
 * monitor if the application monitors entry points.
 * @param {function()} callback Callback function to fire as soon as possible.
 * @return {function()} The wrapped callback.
 * @private
 */
nextTick.wrapCallback_ = (callback) => callback;

// Register the callback function as an entry point, so that it can be
// monitored for exception handling, etc. This has to be done in this file
// since it requires special code to handle all browsers.
entryPointRegistry.register(
    /**
     * @param {function(!Function): !Function} transformer The transforming
     *     function.
     */
    function(transformer) {
      nextTick.wrapCallback_ = transformer;
    });

exports = nextTick;
