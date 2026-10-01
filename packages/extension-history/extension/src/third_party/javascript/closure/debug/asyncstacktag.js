/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Utilites for creating and running console tasks which improve
 * stack traces of asynchronous code using the Async Stack Tagging API
 * (https://developer.chrome.com/docs/devtools/console/api/#createtask).
 */

goog.module('goog.debug.asyncStackTag');
goog.module.declareLegacyNamespace();

const {assertExists} = goog.require('goog.asserts');

/** Cached `DEBUG` in case tests override it (yes, people do this). */
const DEBUG = goog.DEBUG;

/**
 * Store a local variable with the createTask function. This prevents tests that
 * overwrite console from failing.
 * @const {(function(string): ?)|undefined}
 */
const createTask =
    DEBUG && goog.global.console && goog.global.console.createTask ?
    goog.global.console.createTask.bind(goog.global.console) :
    undefined;

/** @const {symbol|undefined} */
const CONSOLE_TASK_SYMBOL = createTask ? Symbol('consoleTask') : undefined;

/**
 * Utility to wrap the function to tag its stack at this point. If the function
 * has already been tagged, this does nothing.
 * @param {!T} fn
 * @param {string=} name
 * @return {!T}
 * @template T
 */
function wrap(fn, name = 'anonymous') {
  if (!DEBUG) return fn;
  if (CONSOLE_TASK_SYMBOL && fn[CONSOLE_TASK_SYMBOL]) return fn;
  const originalFn = fn;
  const originalTest = testNameProvider?.();
  fn = function(...args) {
    const currentTest = testNameProvider?.();
    if (originalTest !== currentTest) {
      throw new Error(`${name} was scheduled in '${
          originalTest}' but called in '${currentTest}'.
Make sure your test awaits all async calls.

TIP: To help investigate, debug the test in Chrome and look at the async portion
of the call stack to see what originally scheduled the callback.  Then, make the
test wait for the relevant asynchronous work to finish.`);
    }
    return originalFn.call(/** @type {?} */ (this), ...args);
  };
  if (!createTask) return fn;

  const consoleTask = createTask(fn.name || name);
  function wrappedFn(...args) {
    return consoleTask['run'](() => fn.call(/** @type {?} */ (this), ...args));
  }
  wrappedFn[assertExists(CONSOLE_TASK_SYMBOL)] = consoleTask;
  return wrappedFn;
}

exports = {
  wrap,
};

/**
 * Returns the current async context, which should not change across callbacks.
 * @type {undefined|function(): string}
 */
let testNameProvider;

/**
 * Sets a context provider.  Async callbacks will throw if they're called with
 * a different context than they were registered with.  This is meant for unit
 * tests.
 *
 * This is also consumed by MockClock.
 *
 * This feature is only compatible with Jasmine or TestCase.useNativePromise()
 *
 * @param {undefined|function(): string} provider
 */
exports.setTestNameProvider = (provider) => {
  if (!DEBUG) throw new Error('This feature is debug-only');
  testNameProvider = provider;
};

/** @return {undefined|function(): string} */
exports.getTestNameProvider = () => {
  if (!DEBUG) throw new Error('This feature is debug-only');
  return testNameProvider;
};
