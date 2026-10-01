/**
 * @fileoverview Pivot selectors for message serialization.
 * @package
 *
 * DO NOT USE THIS OUTSIDE OF THIS PACKAGE.
 */

goog.module('jspb.internal_pivot_selectors');

const {InternalMessage, fieldNumberFromIndex} = goog.require('jspb.internal');
const {TestSerializationFormat, getRandomizeSerializationFormat} = goog.require('jspb.internal_options');
const {VALID_PIVOT_SELECTOR} = goog.require('jspb.internal_symbols');
const {fail} = goog.require('goog.asserts');

const /** ? */ VALID_PIVOT_SELECTOR_VALUE = {};

/**
 * We flip this bit in a test variant to exercise the memory cost pivot
 * selector.
 * @define {boolean}
 */
const TEST_ONLY_USE_MEMORY_COST_PIVOT_SELECTOR_BY_DEFAULT = goog.define(
    'jspb.TEST_ONLY_USE_MEMORY_COST_PIVOT_SELECTOR_BY_DEFAULT', false);

/**
 * @typedef {function(number, number, !Array, (!Object|undefined),
 * ((function(new: InternalMessage))|undefined)): number}
 */
let InternalPivotSelector;

const MIN_PIVOT = 1;
const MAX_PIVOT = 1024;

const /** symbol */ RANDOMIZED_PIVOT_CHOICE = Symbol();
let /** boolean|undefined */ withoutWrapperRandomizedPivotChoice;

/**
 * Selects the existing pivot.
 * @return {number}
 */
function defaultPivotSelector(
    /** number */ currentPivot, /** number */ arrayIndexOffset,
    /** !Array */ array,
    /** !Object|undefined */ sparseObject,
    /** (function(new: InternalMessage))|undefined */ maybeCtor) {
  // Break unsupported parsers.
  if (goog.DEBUG && !COMPILED) {
    const format = getRandomizeSerializationFormat();
    if (format === TestSerializationFormat.ALWAYS_SPARSE) {
      return 1;
    }
    if (format === TestSerializationFormat.RANDOMIZED &&
        (maybeCtor ?
             (/** @type {?} */ (maybeCtor)[RANDOMIZED_PIVOT_CHOICE] ??=
                  Math.random() < 0.5) :
             withoutWrapperRandomizedPivotChoice ??= Math.random() < 0.5)) {
      return 1;
    }
  }
  if (TEST_ONLY_USE_MEMORY_COST_PIVOT_SELECTOR_BY_DEFAULT) {
    return memoryCostPivotSelector(
        currentPivot, arrayIndexOffset, array, sparseObject, maybeCtor);
  }
  return noChangePivotSelector(
      currentPivot, arrayIndexOffset, array, sparseObject, maybeCtor);
}

defaultPivotSelector[VALID_PIVOT_SELECTOR] = VALID_PIVOT_SELECTOR_VALUE;

/**
 * Selects the existing pivot.
 * @return {number}
 */
function noChangePivotSelector(
    /** number */ currentPivot, /** number */ arrayIndexOffset,
    /** !Array */ array,
    /** !Object|undefined */ sparseObject,
    /** (function(new: InternalMessage))|undefined */ maybeCtor) {
  return currentPivot;
}

/**
 * Select a pivot to minimize the in-memory cost of the wire format in V8.
 * @return {number}
 */
function memoryCostPivotSelector(
    /** number */ currentPivot, /** number */ arrayIndexOffset,
    /** !Array */ array,
    /** !Object|undefined */ sparseObject,
    /** (function(new: InternalMessage))|undefined */ maybeCtor) {
  return costPivotSelector(
      currentPivot, arrayIndexOffset, array, sparseObject, arrayMemoryCost,
      objectMemoryCost);
}

memoryCostPivotSelector[VALID_PIVOT_SELECTOR] = VALID_PIVOT_SELECTOR_VALUE;

/**
 * Select a pivot to minimize the uncompressed wire cost of JSPB serialization.
 * @return {number}
 */
function wireCostPivotSelector(
    /** number */ currentPivot, /** number */ arrayIndexOffset,
    /** !Array */ array,
    /** !Object|undefined */ sparseObject,
    /** (function(new: InternalMessage))|undefined */ maybeCtor) {
  return costPivotSelector(
      currentPivot, arrayIndexOffset, array, sparseObject, arrayWireCost,
      objectWireCost);
}

wireCostPivotSelector[VALID_PIVOT_SELECTOR] = VALID_PIVOT_SELECTOR_VALUE;

/**
 * Selects a pivot of one.
 * @return {number}
 */
function objectOnlyPivotSelector(
    /** number */ currentPivot, /** number */ arrayIndexOffset,
    /** !Array */ array,
    /** !Object|undefined */ sparseObject,
    /** (function(new: InternalMessage))|undefined */ maybeCtor) {
  return MIN_PIVOT;
}

objectOnlyPivotSelector[VALID_PIVOT_SELECTOR] = VALID_PIVOT_SELECTOR_VALUE;

/** @typedef {number} */
let MaxFieldNumberInObject;

/** @typedef {number} */
let NumFieldsInObject;

/** @typedef {number} */
let TotalObjectKeyBytes;

/** @typedef {number} */
let NumEntriesInArray;

/** @typedef {number} */
let SetFieldsInArray;

/** @typedef {function(!NumEntriesInArray, !SetFieldsInArray): number } */
let ArrayCostFn;

/**
 * @typedef {function(!NumFieldsInObject, !MaxFieldNumberInObject,
 * !TotalObjectKeyBytes): number }
 */
let ObjectCostFn;

/**
 * Select a pivot to minimize the cost of the wire format, according to the
 * given cost functions.
 * @return {number}
 */
function costPivotSelector(
    /** number */ originalPivot, /** number */ arrayIndexOffset,
    /** !Array */ array,
    /** !Object|undefined */ sparseObject,
    /** !ArrayCostFn */ arrayCostFn,
    /** !ObjectCostFn */ objectCostFn) {
  // Fast-track empty arrays.
  if (!array.length && !sparseObject) return MIN_PIVOT;

  // Derive initial parameters for our cost function by walking the initial
  // state of the array and sparse object.
  let initialMaxFieldNumberInObject = 0;
  let initialFieldsInObject = 0;
  let initialSetFieldsInArray = 0;
  let initialArrayLength = 0;
  let initialTotalObjectKeyBytes = 0;
  for (let i = array.length - 1; i >= 0; i--) {
    const value = array[i];
    if (sparseObject && i === array.length - 1 && (value === sparseObject)) {
      continue;
    }
    initialArrayLength++;
    if (value != null) initialSetFieldsInArray++;
  }
  if (sparseObject) {
    for (const k in sparseObject) {
      const n = +k;
      if (isNaN(n)) continue;
      initialTotalObjectKeyBytes += keyBytes(n);
      initialFieldsInObject++;
      if (n > initialMaxFieldNumberInObject) initialMaxFieldNumberInObject = n;
    }
  }

  // Initialize our min-cost pivot selection with the initial cost.
  let minCostPivot = originalPivot;
  let minCost = arrayCostFn(initialArrayLength, initialSetFieldsInArray) +
      objectCostFn(initialFieldsInObject, initialMaxFieldNumberInObject,
                   initialTotalObjectKeyBytes);

  // Our first case is a pivot lower than the current one. To select one, we
  // iterate over the array and each time we see a value, we consider the pivot
  // being (n+1).
  let setFieldsInArray = initialSetFieldsInArray;
  let fieldsInObject = initialFieldsInObject;
  let maxFieldNumberInObject = initialMaxFieldNumberInObject;
  let totalObjectKeyBytes = initialTotalObjectKeyBytes;
  for (let i = array.length - 1; i >= 0; i--) {
    // Skip nulls and the sparse object.
    const value = array[i];
    if (value == null ||
        (sparseObject && i === array.length - 1 && (value === sparseObject))) {
      continue;
    }

    // Consider the pivot being (n+1).
    const n = fieldNumberFromIndex(i, arrayIndexOffset);
    const lastFieldNumberInArray = n;
    const cost = arrayCostFn(lastFieldNumberInArray, setFieldsInArray) +
        objectCostFn(fieldsInObject, maxFieldNumberInObject,
                     totalObjectKeyBytes);
    if (cost < minCost) {
      minCostPivot = 1 + n;
      minCost = cost;
    }

    // On our next iteration, this field will be in the object; so we need to
    // increase its count and max field number.
    fieldsInObject++;
    setFieldsInArray--;
    totalObjectKeyBytes += keyBytes(n);
    maxFieldNumberInObject = Math.max(maxFieldNumberInObject, n);
  }

  // Our second case is the pivot being one. We write this after iterating
  // the array so that we know how many fields were written.
  const zeroPivotCost = arrayCostFn(0, 0) +
      objectCostFn(fieldsInObject, maxFieldNumberInObject, totalObjectKeyBytes);
  if (zeroPivotCost < minCost) {
    minCostPivot = 1;
    minCost = zeroPivotCost;
  }

  // And our third case is the pivot being greater than the current one. This
  // only makes sense if we have an object. Note that by spec, numeric keys in
  // objects iterate in order, which is important for this logic.
  if (sparseObject) {
    fieldsInObject = initialFieldsInObject;
    maxFieldNumberInObject = initialMaxFieldNumberInObject;
    totalObjectKeyBytes = initialTotalObjectKeyBytes;
    setFieldsInArray = initialSetFieldsInArray;
    for (const k in sparseObject) {
      const n = +k;
      if (isNaN(n)) continue;
      // We never put fields above 1023 in the array.
      if (n >= MAX_PIVOT) continue;
      fieldsInObject--;
      setFieldsInArray++;
      totalObjectKeyBytes -= k.length;
      const cost = arrayCostFn(n, setFieldsInArray) +
          objectCostFn(fieldsInObject, maxFieldNumberInObject,
                       totalObjectKeyBytes);
      if (cost < minCost) {
        minCostPivot = 1 + n;
        minCost = cost;
      }
    }
  }

  return minCostPivot;
}

// LINT.IfChange(PivotSelector)
/** @return {number} */
function objectWireCost(
    /** !NumFieldsInObject */ numFields,
    /** !MaxFieldNumberInObject */ maxFieldNumber,
    /** !TotalObjectKeyBytes */ totalObjectKeyBytes) {
  const numCommas = numFields > 1 ? numFields - 1 : 0;
  return totalObjectKeyBytes + numFields * 3 + numCommas;
}

/** @return {number} */
function arrayWireCost(
    /** !NumEntriesInArray */ numEntriesInArray,
    /** !SetFieldsInArray */ setFieldsInArray) {
  const numCommas = numEntriesInArray > 1 ? numEntriesInArray - 1 : 0;
  const numNulls = (numEntriesInArray - setFieldsInArray);
  return numCommas + numNulls * 4;
}

/** @return {number} */
function objectMemoryCost(
    /** !NumFieldsInObject */ numFields,
    /** !MaxFieldNumberInObject */ maxFieldNumber,
    /** !TotalObjectKeyBytes */ totalObjectKeyBytes) {
  if (numFields == 0) return 0;

  // There are two basic representations that could be applied to the sparse
  // object keys in V8, a NumberDictionary and a FixedArray.
  //
  // V8 chooses representations based on some heuristics, which are implemented
  // below.
  const preferFastElementsSizeFactor = 3;
  const numberDictionaryEntrySize = 3;
  const fieldCountWithBuffer = numFields + (numFields / 2);
  const minimumNumberDictionaryCapacity = 4;
  const sizeThreshold = preferFastElementsSizeFactor *
      numberDictionaryEntrySize *
      Math.max(
          roundUpToPowerOfTwo(fieldCountWithBuffer),
          minimumNumberDictionaryCapacity);
  return sizeThreshold <= maxFieldNumber ?
      numberDictionaryMemoryCost(numFields) :
      arrayMemoryCost(
          maxFieldNumber,
          // This is wrong but the implementation ignores the parameter.
          /* setFieldsInArray= */ maxFieldNumber);
}

/** @return {number} */
function numberDictionaryMemoryCost(/** number */ numFields) {
  // NumberDictionary sizes up every 2 fields up to field number 6. These
  // numbers are written below and linearly interpolated across the flat
  // regions. The interpolation prevents some pathological behavior where we
  // always write a second value into the object when we can.
  //
  // Everything above 10 fields is an upper bound.
  if (numFields == 0) {
    return 0;
  } else if (numFields < 4) {
    return 100 + (numFields - 1) * 16;
  } else if (numFields < 6) {
    return 148 + (numFields - 4) * 16;
  } else if (numFields < 12) {
    return 244 + (numFields - 6) * 16;
  } else if (numFields < 22) {
    return 436 + (numFields - 12) * 19;
  } else if (numFields < 44) {
    return 820 + (numFields - 22) * 17;
  }
  // Anything else which we have not measured should use a linear upper-bound.
  // In practice this is unlikely to happen.
  return 52 + 32 * numFields;
}

/** @return {number} */
function arrayMemoryCost(
    /** !NumEntriesInArray */ maxFieldNumber,
    /** !SetFieldsInArray */ setFieldsInArray) {
  // Note that this is actually the cost of an object backed by a FixedArray.
  //
  // The delta, however, is a constant factor so it doesn't matter for our
  // purposes.
  return 40 + 4 * maxFieldNumber;
}

/** @return {number} */
function roundUpToPowerOfTwo(/** number */ value) {
  // There is no unsigned left shift in JS.
  return 1 << (32 - Math.clz32(value - 1));
}

/** @return {number} */
function keyBytes(/** number */ value) {
  if (value >= 100) {
    if (value >= 10000) {
      return Math.ceil(Math.log10(1 + value));
    }
    return value < 1000 ? 3 : 4;
  } else {
    return value < 10 ? 1 : 2;
  }
}

// LINT.ThenChange(//depot/google3/java/com/google/apps/jspb/Serializer.java:PivotSelector)

/** @type {boolean} */
let checkPivotSelectorInstances = true;

function setCheckPivotSelectorInstances(/** boolean */ value) {
  checkPivotSelectorInstances = value;
}

/**
 * @return {!InternalPivotSelector}
 */
function assertValidPivotSelector(/** !Object */ obj) {
  if (obj == null || obj === noChangePivotSelector) {
    return noChangePivotSelector;
  }
  if (checkPivotSelectorInstances &&
      (obj[VALID_PIVOT_SELECTOR] !== VALID_PIVOT_SELECTOR_VALUE)) {
    // Don't throw when we have a bad parameter because recaptcha's botguard
    // obfuscations sometimes pass one.
    //
    // TODO(varomodt): figure out which pass is unsound.
    fail('Invalid pivot selector');
    return noChangePivotSelector;
  }
  return /** @type {!InternalPivotSelector} */ (obj);
}

/**
 * Used to gate tests which depend on the exact wire format. That should be
 * handled by wire conformance.
 *
 * @return {boolean}
 */
function hasNonstandardPivotSelector() {
  return TEST_ONLY_USE_MEMORY_COST_PIVOT_SELECTOR_BY_DEFAULT;
}

exports = {
  InternalPivotSelector,
  assertValidPivotSelector,
  defaultPivotSelector,
  memoryCostPivotSelector,
  noChangePivotSelector,
  objectOnlyPivotSelector,
  wireCostPivotSelector,

  // Exported for testing.
  arrayMemoryCost,
  arrayWireCost,
  costPivotSelector,
  hasNonstandardPivotSelector,
  keyBytes,
  objectMemoryCost,
  objectWireCost,
  roundUpToPowerOfTwo,
  setCheckPivotSelectorInstances,
};
