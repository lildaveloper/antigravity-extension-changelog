/**
 * @fileoverview internal instrumentation for elemental jspb operations.
 * @package
 *
 * DO NOT USE THIS OUTSIDE OF THIS PACKAGE.
 */
goog.module('jspb.internal_operations');

const {DETAILED_JSPB_ASSERTS} = goog.require('jspb.internal_options');
const {assertNumber} = goog.require('goog.asserts');

/** @record */
class PartialLog {
  constructor() {
    /** @type {number|undefined} */
    this.newArray;

    /** @type {number|undefined} */
    this.slice;

    /** @type {number|undefined} */
    this.getField;

    /** @type {number|undefined} */
    this.setField;

    /** @type {number|undefined} */
    this.constructMessage;

    /** @type {number|undefined} */
    this.constructMap;

    /** @type {number|undefined} */
    this.copyMessageWithImmutableFields;

    /** @type {number|undefined} */
    this.internalCompareFields;
  }
}

/**
 * @extends {PartialLog}
 * @record
 */
class OperationLog {
  constructor() {
    /** @package @override @type {number} */
    this.newArray;

    /** @package @override @type {number} */
    this.slice;

    /** @package @override @type {number} */
    this.getField;

    /** @package @override @type {number} */
    this.setField;

    /** @package @override @type {number} */
    this.constructMessage;

    /** @package @override @type {number} */
    this.constructMap;

    /** @package @override @type {number} */
    this.copyMessageWithImmutableFields;

    /** @package @override @type {number} */
    this.internalCompareFields;
  }
}

/** @type {!OperationLog|undefined} */
let currentLog = DETAILED_JSPB_ASSERTS ? emptyLog() : undefined;

/** @type {boolean} */
let shouldLogOperations = true;

/** @return {!OperationLog} */
function emptyLog() {
  if (!DETAILED_JSPB_ASSERTS) throw new Error();
  return {
    newArray: 0,
    slice: 0,
    getField: 0,
    setField: 0,
    constructMessage: 0,
    constructMap: 0,
    copyMessageWithImmutableFields: 0,
    internalCompareFields: 0,
  };
}

function logOperation(/** !PartialLog */ log) {
  if (!DETAILED_JSPB_ASSERTS) return;
  if (!shouldLogOperations) return;
  for (const k in /** @type {!Object} */ (log)) {
    /** @type {!Object} */ (currentLog)[k] +=
        assertNumber(/** @type {!Object} */ (log)[k]);
  }
}

/** Clears our current operation log. */
function clearLog() {
  if (!DETAILED_JSPB_ASSERTS) throw new Error();
  currentLog = emptyLog();
}

/** @return {!PartialLog} */
function getLog() {
  if (!DETAILED_JSPB_ASSERTS) throw new Error();
  const result = {};
  for (const k in /** @type {!Object} */ (currentLog)) {
    const value =
        /** @type {number} */ (/** @type {!Object} */ (currentLog)[k]);
    if (value > 0) {
      result[k] = value;
    }
  }
  // assign prevents mutations.
  return /** @type {!PartialLog} */ (result);
}

/**
 * @param {!ReadonlyArray<T>} value
 * @return {!Array<T>}
 * @template T
 */
function slice(value) {
  if (DETAILED_JSPB_ASSERTS) logOperation({slice: 1});
  // Use spread if we can, it is much faster on frozen arrays.
  return (goog.FEATURESET_YEAR >= 2018) ? [...value] :
                                          Array.prototype.slice.call(value);
}

/**
 * @param {!Array<T>} value
 * @return {!Array<T>}
 * @template T
 */
function logNewArray(value) {
  if (DETAILED_JSPB_ASSERTS) logOperation({newArray: 1});
  return value;
}

/**
 * @param {boolean} shouldLog
 * @template T
 */
function setShouldLog(shouldLog) {
  if (DETAILED_JSPB_ASSERTS) {
    shouldLogOperations = shouldLog;
  }
}

/**
 * @return {boolean}
 */
function getShouldLog() {
  return !!shouldLogOperations;
}

/**
 * @param {function(): T} fn
 * @return {T}
 * @template T
 */
function withoutLogging(fn) {
  if (!DETAILED_JSPB_ASSERTS) {
    return fn();
  }
  const shouldLog = getShouldLog();
  try {
    setShouldLog(false);
    return fn();
  } finally {
    setShouldLog(shouldLog);
  }
}

exports = {
  PartialLog,
  clearLog,
  getLog,
  getShouldLog,
  logNewArray,
  logOperation,
  setShouldLog,
  slice,
  withoutLogging,
};
