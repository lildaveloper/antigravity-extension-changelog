/**
 * @fileoverview Exception types thrown by Apps JSPB.
 *
 * Apps JSPB throws exceptions in the following contexts:
 *
 * - Internal assertions, which are typically state consistency checks that
 *   should never be violated.
 *
 * - Ordinary state exceptions, which can happen in certain obviously invalid
 *   circumstances. These are not handled by this library.
 *
 * - Type errors in setters, which are an ordinary `throw` statement but have
 *   a severity label indicating them as warnings. This is mostly for historical
 *   reasons now.
 *
 * - Asynchronous warnings, which are asynchronously thrown errors with a
 *   severity label indicating them as not important for error reporting
 *   ('incident'). They are typically picked up by eye3 (or AfterAll failures)
 *   for a 'soft' reporting mechanism that does not interrupt program execution.
 *
 * We use asynchronous warnings extensively when we _want_ to make something
 * a failure but have some expectation that it could happen in production.
 *
 * Applications that cannot receive asynchronous warnings automatically through
 * global error handlers (e.g. because they are embedded in another page) can
 * use `registerErrorHandler` to register their own interceptor.
 *
 * See go/ws-jserror-severity-guidance for context on the usage of severity
 * labels for docs reporting.
 */

goog.module('jspb.exceptions');

const asyncThrow = goog.require('goog.async.throwException');
const errorcontext = goog.require('goog.debug.errorcontext');

/**
 * Throttle key storage for global errors or situations where a message
 * constructor is not available.
 *
 * @private @type {!Object|undefined}
 */
let globalThrottles = goog.DEBUG ? {} : undefined;

/**
 * The registered error handler to be called whenever JSPB will throw (or
 * async-throw) an error.
 * @private @type {(function(!Error):void)|undefined}
 */
let errorHandler;

/**
 * Allows client teams to register a callback called whenever JSPB runtime would
 * throw or async-throw an error.
 * @param {function(!Error):void} handler
 */
function registerErrorHandler(handler) {
  if (errorHandler) {
    throw new Error(goog.DEBUG ? 'errorHandler already set!' : '');
  }
  errorHandler = (warning) => {
    goog.global.setTimeout(() => {
      handler(warning);
    }, 0);
  };
}

/**
 * Allows client teams to register an **execution-interrupting** callback called
 * whenever JSPB runtime would throw or async-throw an error.
 *
 * @param {function(!Error):void} handler
 */
function registerSynchronousErrorHandler(handler) {
  if (errorHandler) {
    throw new Error(goog.DEBUG ? 'errorHandler already set!' : '');
  }
  errorHandler = handler;
}

/**
 * Removes any registered error handler. Only for use in testing. JSPB clients
 * should call this via 'jspb.testing.errorhandler.removeErrorHandler()'.
 */
function removeErrorHandler() {
  if (!goog.DEBUG) throw new Error();
  errorHandler = undefined;
}

/**
 * Runs the registered error handler (if any) on the given Error.
 * @param {!Error} err
 */
function runErrorHandler(err) {
  if (!errorHandler) return;
  try {
    errorHandler(err);
  } catch (e) {
    e.cause = err;
    throw e;
  }
}

/**
 * Asynchronously throw an error to flag production issues to users via systems
 * like eye3.
 *
 * @param {string=} msg
 */
function asyncThrowWarning(msg) {
  const warning = makeTypeWarning(msg);
  if (!errorHandler) {
    asyncThrow(warning);
    return;
  }
  runErrorHandler(warning);
}

/**
 * Creates an error to be thrown from Apps JSPB type checking.
 * @return {!Error}
 */
function makeTypeError(/** string= */ message) {
  const error = new Error(message);
  errorcontext.addErrorContext(error, 'severity', 'warning');
  runErrorHandler(error);
  return error;
}

/**
 * An asynchronously thrown error used to test the addition of type checks.
 * @return {!Error}
 */
function makeTypeWarning(/** string= */ message) {
  const error = goog.DEBUG ? new Error(message) : new Error();
  errorcontext.addErrorContext(error, 'severity', 'incident');
  return error;
}

/**
 * @param {?} msg
 * @param {symbol|string} throttleKey
 * @param {number} limit
 * @param {string=} error
 */
function throttledAsyncThrowWarning(msg, throttleKey, limit, error) {
  // Emit a warning at most limit times per type.
  if (throttleKey == null) {
    return;
  }

  let throttleHandle;
  if (msg == null) {
    throttleHandle = (globalThrottles ??= {});
  } else {
    throttleHandle = msg.constructor;
  }

  const count = throttleHandle[throttleKey] || 0;
  if (count >= limit) {
    return;
  }

  throttleHandle[throttleKey] = count + 1;
  asyncThrowWarning(error);
}

/**
 * Test-only exports of functions in this module.
 * @const {{
 *   globalThrottles: ?,
 *   makeTypeWarning: typeof makeTypeWarning,
 *   removeErrorHandler: typeof removeErrorHandler,
 * }}
 */
const TESTONLY = {
  globalThrottles,
  makeTypeWarning,
  removeErrorHandler,
};

exports = {
  asyncThrowWarning,
  makeTypeError,
  registerErrorHandler,
  registerSynchronousErrorHandler,
  throttledAsyncThrowWarning,

  TESTONLY,
};
