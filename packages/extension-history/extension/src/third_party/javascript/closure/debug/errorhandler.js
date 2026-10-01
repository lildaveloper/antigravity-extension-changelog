/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Error handling utilities.
 */
goog.module('goog.debug.ErrorHandler');
goog.module.declareLegacyNamespace();

const DebugError = goog.require('goog.debug.Error');
const Disposable = goog.require('goog.Disposable');
const asserts = goog.require('goog.asserts');
const entryPointRegistry = goog.require('goog.debug.entryPointRegistry');

/**
 * The ErrorHandler can be used to to wrap functions with a try/catch
 * statement. If an exception is thrown, the given error handler function will
 * be called.
 *
 * When this object is disposed, it will stop handling exceptions and tracing.
 * It will also try to restore window.setTimeout and window.setInterval
 * if it wrapped them. Notice that in the general case, it is not technically
 * possible to remove the wrapper, because functions have no knowledge of
 * what they have been assigned to. So the app is responsible for other
 * forms of unwrapping.
 *
 * @param {Function} handler Handler for exceptions.
 * @constructor
 * @extends {Disposable}
 * @implements {entryPointRegistry.EntryPointMonitor}
 */
function ErrorHandler(handler) {
  ErrorHandler.base(this, 'constructor');

  /**
   * Handler for exceptions, which can do logging, reporting, etc.
   * @type {Function}
   * @private
   */
  this.errorHandlerFn_ = handler;

  /**
   * Whether errors should be wrapped in
   * ErrorHandler.ProtectedFunctionError before rethrowing.
   * @type {boolean}
   * @private
   */
  this.wrapErrors_ = true;  // TODO(malteubl) Change default.

  /**
   * Whether to add a prefix to all error messages. The prefix is
   * ErrorHandler.ProtectedFunctionError.MESSAGE_PREFIX. This option
   * only has an effect if this.wrapErrors_  is set to false.
   * @type {boolean}
   * @private
   */
  this.prefixErrorMessages_ = false;
}
goog.inherits(ErrorHandler, Disposable);

/** @override */
ErrorHandler.prototype.wrap = function(fn) {
  return this.protectEntryPoint(asserts.assertFunction(fn));
};

/** @override */
ErrorHandler.prototype.unwrap = function(fn) {
  asserts.assertFunction(fn);
  return fn[this.getFunctionIndex_(false)] || fn;
};

/**
 * Get the index for a function. Used for internal indexing.
 * @param {boolean} wrapper True for the wrapper; false for the wrapped.
 * @return {string} The index where we should store the function in its
 *     wrapper/wrapped function.
 * @private
 */
ErrorHandler.prototype.getFunctionIndex_ = function(wrapper) {
  return (wrapper ? '__wrapper_' : '__protected_') + goog.getUid(this) + '__';
};

/**
 * Installs exception protection for an entry point function. When an exception
 * is thrown from a protected function, a handler will be invoked to handle it.
 *
 * @param {!Function} fn An entry point function to be protected.
 * @return {!Function} A protected wrapper function that calls the entry point
 *     function.
 */
ErrorHandler.prototype.protectEntryPoint = function(fn) {
  const protectedFnName = this.getFunctionIndex_(true);
  if (!fn[protectedFnName]) {
    const wrapper = fn[protectedFnName] = this.getProtectedFunction(fn);
    wrapper[this.getFunctionIndex_(false)] = fn;
  }
  return fn[protectedFnName];
};

/**
 * Helps {@link #protectEntryPoint} by actually creating the protected
 * wrapper function, after {@link #protectEntryPoint} determines that one does
 * not already exist for the given function.  Can be overridden by subclasses
 * that may want to implement different error handling, or add additional
 * entry point hooks.
 * @param {!Function} fn An entry point function to be protected.
 * @return {!Function} protected wrapper function.
 * @protected
 */
ErrorHandler.prototype.getProtectedFunction = function(fn) {
  const that = this;
  const googDebugErrorHandlerProtectedFunction = function() {
    const self = /** @type {?} */ (this);
    if (that.isDisposed()) {
      return fn.apply(self, arguments);
    }

    try {
      return fn.apply(self, arguments);
    } catch (e) {
      that.handleError_(e);
    }
  };
  googDebugErrorHandlerProtectedFunction[this.getFunctionIndex_(false)] = fn;
  return googDebugErrorHandlerProtectedFunction;
};

/**
 * Internal error handler.
 * @param {?} e The error string or an Error-like object.
 * @private
 */
ErrorHandler.prototype.handleError_ = function(e) {
  // Don't re-report errors that have already been handled by this code.
  const MESSAGE_PREFIX = ErrorHandler.ProtectedFunctionError.MESSAGE_PREFIX;
  if ((e && typeof e === 'object' && typeof e.message === 'string' &&
       e.message.indexOf(MESSAGE_PREFIX) == 0) ||
      (typeof e === 'string' && e.indexOf(MESSAGE_PREFIX) == 0)) {
    return;
  }
  this.errorHandlerFn_(e);
  if (!this.wrapErrors_) {
    // Add the prefix to the existing message.
    if (this.prefixErrorMessages_) {
      if (typeof e === 'object' && e && typeof e.message === 'string') {
        /** @type {{message}} */ (e).message = MESSAGE_PREFIX + e.message;
      } else {
        e = MESSAGE_PREFIX + e;
      }
    }
    if (goog.DEBUG) {
      // Work around for https://code.google.com/p/v8/issues/detail?id=2625
      // and https://code.google.com/p/chromium/issues/detail?id=237059
      // Custom errors and errors with custom stack traces show the wrong
      // stack trace
      // If it has a stack and Error.captureStackTrace is supported (only
      // supported in V8 as of May 2013) log the stack to the console.
      if (e && typeof e.stack === 'string' && Error.captureStackTrace &&
          goog.global['console']) {
        goog.global['console']['error'](e.message, e.stack);
      }
    }
    // Re-throw original error. This is great for debugging as it makes
    // browser JS dev consoles show the correct error and stack trace.
    throw e;
  }
  // Re-throw it since this may be expected by the caller.
  throw new ErrorHandler.ProtectedFunctionError(e);
};

// TODO(mknichel): Allow these functions to take in the window to protect.
/**
 * Installs exception protection for window.setTimeout to handle exceptions.
 */
ErrorHandler.prototype.protectWindowSetTimeout = function() {
  this.protectWindowFunctionsHelper_('setTimeout');
};

/**
 * Install exception protection for window.setInterval to handle exceptions.
 */
ErrorHandler.prototype.protectWindowSetInterval = function() {
  this.protectWindowFunctionsHelper_('setInterval');
};

/**
 * Install an unhandledrejection event listener that reports rejected promises.
 * Note: this will only work with Chrome 49+ and friends, but so far is the only
 * way to report uncaught errors in aysnc/await functions.
 * @param {!Window=} win the window to instrument, defaults to current window
 */
ErrorHandler.prototype.catchUnhandledRejections = function(win) {
  win = win || goog.global['window'] || goog.global['globalThis'];
  if ('onunhandledrejection' in win) {
    win.onunhandledrejection = (event) => {
      // event.reason contains the rejection reason. When an Error is
      // thrown, this is the Error object. If it is undefined, create a new
      // error object.
      const e =
          event && event.reason ? event.reason : new Error('uncaught error');
      this.handleError_(e);
    };
  }
};

/**
 * Install exception protection for window.requestAnimationFrame to handle
 * exceptions.
 */
ErrorHandler.prototype.protectWindowRequestAnimationFrame = function() {
  const win = goog.global['window'] || goog.global['globalThis'];
  const fnNames = [
    'requestAnimationFrame', 'mozRequestAnimationFrame', 'webkitAnimationFrame',
    'msRequestAnimationFrame'
  ];
  for (let i = 0; i < fnNames.length; i++) {
    const fnName = fnNames[i];
    if (fnNames[i] in win) {
      this.protectWindowFunctionsHelper_(fnName);
    }
  }
};

/**
 * Helper function for protecting a function that causes a function to be
 * asynchronously called, for example setTimeout or requestAnimationFrame.
 * @param {string} fnName The name of the function to protect.
 * @private
 */
ErrorHandler.prototype.protectWindowFunctionsHelper_ = function(fnName) {
  const win = goog.global['window'] || goog.global['globalThis'];
  const originalFn = win[fnName];
  if (!originalFn) throw new Error(fnName + ' not on global?');
  const that = this;
  win[fnName] = function(fn, time) {
    if (typeof fn === 'string') {
      fn = goog.partial(goog.globalEval, fn);
    }
    // The first arg (function to call) might be undefined or null, and
    // protectEntryPoint doesn't like this.
    // If the fn was a string, the call to goog.partial above always returns a
    // function, so they will always be called protected.
    // (e.g. setTimeout(undefined, 1000))
    if (fn) {
      arguments[0] = fn = that.protectEntryPoint(fn);
    }

    // IE doesn't support .call for setInterval/setTimeout, but it
    // also doesn't care what "this" is, so we can just call the
    // original function directly
    if (originalFn.apply) {
      return originalFn.apply(/** @type {?} */ (this), arguments);
    } else {
      let callback = fn;
      if (arguments.length > 2) {
        const args = Array.prototype.slice.call(arguments, 2);
        callback = function() {
          fn.apply(/** @type {?} */ (this), args);
        };
      }
      return originalFn(callback, time);
    }
  };
  win[fnName][this.getFunctionIndex_(false)] = originalFn;
};

/**
 * Set whether to wrap errors that occur in protected functions in a
 * ErrorHandler.ProtectedFunctionError.
 * @param {boolean} wrapErrors Whether to wrap errors.
 */
ErrorHandler.prototype.setWrapErrors = function(wrapErrors) {
  this.wrapErrors_ = wrapErrors;
};

/**
 * Set whether to add a prefix to all error messages that occur in protected
 * functions.
 * @param {boolean} prefixErrorMessages Whether to add a prefix to error
 *     messages.
 */
ErrorHandler.prototype.setPrefixErrorMessages = function(prefixErrorMessages) {
  this.prefixErrorMessages_ = prefixErrorMessages;
};

/** @override */
ErrorHandler.prototype.disposeInternal = function() {
  // Try to unwrap window.setTimeout and window.setInterval.
  const win = goog.global['window'] || goog.global['globalThis'];
  win.setTimeout = this.unwrap(win.setTimeout);
  win.setInterval = this.unwrap(win.setInterval);

  ErrorHandler.base(this, 'disposeInternal');
};

/**
 * Error thrown to the caller of a protected entry point if the entry point
 * throws an error.
 * @param {*} cause The error thrown by the entry point.
 * @constructor
 * @extends {DebugError}
 * @final
 */
ErrorHandler.ProtectedFunctionError = function(cause) {
  /** @suppress {missingProperties} message may not be defined. */
  const message = ErrorHandler.ProtectedFunctionError.MESSAGE_PREFIX +
      (cause && cause.message ? String(cause.message) : String(cause));
  ErrorHandler.ProtectedFunctionError.base(
      this, 'constructor', message, /** @type {?} */ (cause));

  /** @suppress {missingProperties} stack may not be defined. */
  const stack = cause && cause.stack;
  if (stack && typeof stack === 'string') {
    this.stack = /** @type {string} */ (stack);
  }
};
goog.inherits(ErrorHandler.ProtectedFunctionError, DebugError);

/**
 * Text to prefix the message with.
 * @type {string}
 */
ErrorHandler.ProtectedFunctionError.MESSAGE_PREFIX =
    'Error in protected function: ';

exports = ErrorHandler;
