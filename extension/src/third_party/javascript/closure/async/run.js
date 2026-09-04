/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */
goog.module('goog.async.run');
goog.module.declareLegacyNamespace();

const WorkQueue = goog.require('goog.async.WorkQueue');
const asyncStackTag = goog.require('goog.debug.asyncStackTag');
const nextTick = goog.require('goog.async.nextTick');
const throwException = goog.require('goog.async.throwException');

/**
 * @define {boolean} If true, use queueMicrotask to implement run rather
 * that its own work queue and scheduling.
 *
 * TODO(johnlenz): Enable this for goog.FEATURESET_YEAR >= 2021
 */
const USE_QUEUE_MICROTASK =
    goog.define('goog.async.run.USE_QUEUE_MICROTASK', false);

/**
 * The function used to schedule work asynchronousely.
 * @private {function()}
 */
let schedule;

/** @private {boolean} */
let workQueueScheduled = false;

/** @type {!WorkQueue} */
let workQueue = new WorkQueue();

/**
 * Fires the provided callback just before the current callstack unwinds, or as
 * soon as possible after the current JS execution context.
 * @param {function(this:THIS)} callback
 * @param {THIS=} context Object to use as the "this value" when calling the
 *     provided function.
 * @template THIS
 * @deprecated Use `queueMicrotask` instead.
 */
let run = (callback, context = undefined) => {
  callback = asyncStackTag.wrap(callback, 'goog.async.run');

  if (USE_QUEUE_MICROTASK) {
    queueMicrotask((context == null) ? callback : callback.bind(context));
    return;
  }
  if (!schedule) {
    initializeRunner();
  }
  if (!workQueueScheduled) {
    // Nothing is currently scheduled, schedule it now.
    schedule();
    workQueueScheduled = true;
  }

  workQueue.add(callback, context);
};

/** Initializes the function to use to process the work queue. */
let initializeRunner = () => {
  const promise = Promise.resolve(undefined);
  schedule = () => {
    promise.then(processWorkQueueInternal);
  };
};

/**
 * Forces run to use nextTick instead of Promise.
 * This should only be done in unit tests. It's useful because MockClock
 * replaces nextTick, but not the browser Promise implementation, so it allows
 * Promise-based code to be tested with MockClock.
 * However, we also want to run promises if the MockClock is no longer in
 * control so we schedule a backup "setTimeout" to the unmocked timeout if
 * provided.
 * @param {function(function())=} realSetTimeout
 */
run.forceNextTick = (realSetTimeout = undefined) => {
  if (goog.DISALLOW_TEST_ONLY_CODE) {
    throw new Error(
        'goog.async.run.forceNextTick is only available with goog.DEBUG');
  }
  schedule = () => {
    nextTick(processWorkQueueInternal);
    if (realSetTimeout) {
      realSetTimeout(processWorkQueueInternal);
    }
  };
};

if (goog.DEBUG) {
  /** Reset the work queue. Only available for tests in debug mode. */
  run.resetQueue = () => {
    workQueueScheduled = false;
    workQueue = new WorkQueue();
  };

  /** Resets the scheduler. Only available for tests in debug mode. */
  run.resetSchedulerForTest = () => {
    initializeRunner();
  };
}

/**
 * Run any pending run work items. This function is not intended
 * for general use.
 */
function processWorkQueueInternal() {
  // NOTE: additional work queue items may be added while processing.
  let item = null;
  while (item = workQueue.remove()) {
    try {
      item.fn.call(item.scope);
    } catch (e) {
      throwException(e);
    }
    workQueue.returnUnused(item);
  }

  // There are no more work items, allow processing to be scheduled again.
  workQueueScheduled = false;
}

/**
 * Run any pending run work items. This function is not intended
 * for general use.
 */
run.processWorkQueue =
    () => {
      if (goog.DISALLOW_TEST_ONLY_CODE) {
        throw new Error(
            'goog.async.run.processWorkQueue is only available for tests.');
      }
      processWorkQueueInternal();
    };

exports = run;
