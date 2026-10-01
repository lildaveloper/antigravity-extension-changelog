/**
 * @fileoverview The implementation of the main jspb copying routines.
 * clone and toJsonValue.
 *
 * DO NOT USE THIS OUTSIDE OF THIS PACKAGE.
 */
goog.module('jspb.internal_copy');

const {ArrayStateFlags, DEFAULT_ARRAY_STATE, getArrayIndexOffset, getArrayState, getMessageArrayState} = goog.require('jspb.internal_array_state');
const {ByteString} = goog.require('jspb.bytestring');
const {DEFAULT_PIVOT_SELECTOR, DETERMINISTIC_PIVOT_SELECTOR, PivotSelector} = goog.require('jspb.dynamic_pivot_selection');
const {ENABLE_ASSERTS, assert, assertArray, assertExists} = goog.require('goog.asserts');
const {HAS_NATIVE_SYMBOL, UNKNOWN_BINARY_FIELDS_SYMBOL} = goog.require('jspb.internal_symbols');
const {InternalMessage, assertArrayInvariants, fieldNumberFromIndex, getInternalArray, hasOwnPropertyIfNotTrusted, indexFromFieldNumber, isInternalMessage, isSparseObject} = goog.require('jspb.internal');
const {InternalPivotSelector, assertValidPivotSelector, noChangePivotSelector} = goog.require('jspb.internal_pivot_selectors');
const {JspbMap} = goog.require('jspb.internal_map');
const {SUPPORTS_STRUCTURED_CLONE} = goog.require('jspb.internal_bytes');
const {copyUnknownFields, recordUnknownFieldDroppedInSerialize} = goog.require('jspb.internal_unknown_fields');
const {isSafeInt52} = goog.require('google3.javascript.common.bigint.index');
const {logNewArray} = goog.require('jspb.internal_operations');


const NO_PIVOT = -1 >>> 0;  // 2^32-1

/**
 * Helper for cloning an internal JsPb object.
 * @param {!Array<?>} array A JsPb object, eg, a field, to be cloned.
 * @param {number} arrayState The state of the array.
 * @param {(function(*, boolean): *)} convertLeaf a function to map onto
 *     all primitive values in this object.
 * @param {boolean=} isOwned Whether array is known not to be exposed to users.
 *     When this is provided, it's taken to imply we're in a clone operation.
 * @param {function(new: InternalMessage)=} maybeCtorInDebug The constructor
 *     of the message, if available, in debug mode.
 * @return {!Array<?>} A clone of the input object.
 */
function cloneJspbArray(
    array, arrayState, convertLeaf, isOwned, maybeCtorInDebug) {
  const inClone = isOwned !== undefined;
  isOwned = !!isOwned;

  // Complain when we drop unknown fields.
  const unknownBinaryFieldsSymbol =
      goog.weakUsage(UNKNOWN_BINARY_FIELDS_SYMBOL);
  let unknownBinaryFields;
  if (!inClone && HAS_NATIVE_SYMBOL && unknownBinaryFieldsSymbol &&
      (unknownBinaryFields = array[unknownBinaryFieldsSymbol])) {
    unknownBinaryFields.forEachUnknownField(
        recordUnknownFieldDroppedInSerialize);
  }

  // The array we are copying into.
  const clonedArray = logNewArray([]);
  let length = array.length;
  let sparseObject;
  // The array index at which to start writing values to a sparse object when
  // iterating over the array.
  let pivotIndex = NO_PIVOT;
  let movableSparseObject = false;

  // Compute an array index offset, which is defined if we are constructed.
  const isConstructed = !!(arrayState & ArrayStateFlags.CONSTRUCTED);
  const arrayIndexOffset =
      isConstructed ? getArrayIndexOffset(arrayState) : undefined;

  // There are 3 interesting cases
  // 1. We have a constructed message array and are performing a clone
  //    operation.
  // 2. We have a constructed message array and are not performing a clone
  //    operation.
  // 3. We have an array that is either not a message or is not constructed.
  //
  // For case 1, we can trust the pivot and sparse object bits. But we don't
  // want to shift anything around.  In theory we could move the sparse object
  // if it made sense but in the interest of backwards compatibility we do not,
  // plus APIs like `toImmutable` do not accept a pivot selector.
  //
  // For case 2, we perform pivot selection and move the sparse object as
  // needed.
  //
  // For case 3, we cannot trust either the pivot or sparse object bits,
  // and thus do not move anything.


  // Locate a sparse object and derive the pivot if the array is not repeated.
  if (!(arrayState & ArrayStateFlags.IS_REPEATED_FIELD)) {
    sparseObject = length && array[length - 1];
    if (isSparseObject(sparseObject)) {
      length--;
      pivotIndex = length;
    } else {
      sparseObject = undefined;
      // Here we could read the pivot from the array state for constructed
      // messages, but there is no need to do so as we know it is beyond any
      // field index.
    }

    // We may be moving the pivot if we have a pivot selector, do not have a
    // message ID and are not cloning. We could move the pivot on clones
    // but there is no need to and doing so may incur some extra allocations.
    if (isConstructed && !(arrayState & ArrayStateFlags.HAS_MESSAGE_ID) &&
        !inClone) {
      movableSparseObject = true;
      const pivotSelector = /** @type {!InternalPivotSelector} */ (
          /** @type {?} */ (currentPivotSelector ?? DEFAULT_PIVOT_SELECTOR));
      pivotIndex = indexFromFieldNumber(
          pivotSelector(
              fieldNumberFromIndex(pivotIndex, assertExists(arrayIndexOffset)),
              assertExists(arrayIndexOffset), array, sparseObject,
              maybeCtorInDebug),
          assertExists(arrayIndexOffset));
    }
  }

  // Copy fields from the array into the cloned array or sparse object.
  let newSparseObject = undefined;
  for (let i = 0; i < length; i++) {
    let item = array[i];
    // This implicitly turns null into undefined which is a legacy behavior we
    // need to maintain for _legacyNullable callers.
    if (item == null || (item = convertLeaf(item, isOwned)) == null) {
      continue;
    }
    if (isConstructed && i >= pivotIndex) {
      // This should not be possible unless there is a pivot selector.
      assertNontrivialPivotSelector();
      const n = fieldNumberFromIndex(i, assertExists(arrayIndexOffset));
      (newSparseObject ??= {})[n] = item;
    } else {
      clonedArray[i] = item;
    }
  }

  // Copy fields from any existing sparse object into the array or object.
  if (sparseObject) {
    for (let key in sparseObject) {
      if (!hasOwnPropertyIfNotTrusted(sparseObject, key)) {
        continue;
      }
      let item = sparseObject[key];
      // This implicitly turns null into undefined which is a legacy behavior we
      // need to maintain for _legacyNullable callers.
      if (item == null || (item = convertLeaf(item, isOwned)) == null) {
        continue;
      }
      const n = +key;
      let i;
      if (isConstructed && !Number.isNaN(n) &&
          (i = indexFromFieldNumber(n, assertExists(arrayIndexOffset))) <
              pivotIndex) {
        // This should not be possible unless there is a pivot selector.
        assertNontrivialPivotSelector();
        clonedArray[assertExists(i)] = item;
      } else {
        (newSparseObject ??= {})[key] = item;
      }
    }
  }

  // If we have a sparse object, we need to add it to the end of the array.
  // In a cloneImmutable operation we maintain pivots but otherwise we can
  // just place the sparse object at the end of the array.
  if (newSparseObject) {
    if (movableSparseObject) {
      clonedArray.push(newSparseObject);
    } else {
      assert(pivotIndex < NO_PIVOT);
      clonedArray[pivotIndex] = newSparseObject;
    }
  }

  // If in a clone operation, attempt to copy unknown binary fields. By doing
  // this at the end we assure that the array accesses in the above loop are
  // monomorphic.
  if (inClone) {
    copyUnknownFields(clonedArray, array);
  }
  return clonedArray;
}


/** @return {!Array<?>} */
function convertMapEntryToJsonFormat(/** !Array<?> */ entry) {
  entry[0] = convertToJsonFormat(entry[0]);
  entry[1] = convertToJsonFormat(entry[1]);
  return entry;
}

/**
 * @param {?} v the value to copy if it's a Uint8Array.
 * @return {?}
 * @suppress {visibility} access to map internals
 */
function convertToJsonFormat(v) {
  assertExists(v);  // callers should have handled this.
  switch (typeof v) {
    case 'number':
      return Number.isFinite(v) ? v : '' + v;
    case 'bigint':
      return /** @type{!Function}*/ (isSafeInt52)(v) ? Number(v) : '' + v;
    case 'boolean':
      // Coerce to 0 or 1
      return v ? 1 : 0;
    case 'object':
      if (Array.isArray(v)) {
        assertArrayInvariants(v);
        const state = getArrayState(v);
        // If this is an empty repeated field, don't copy it in any mode.
        if (v.length === 0 && (state & ArrayStateFlags.IS_REPEATED_FIELD)) {
          return undefined;
        }
        return cloneJspbArray(v, state, convertToJsonFormat);
      }
      if (isInternalMessage(v)) {
        return toJsonValueInternal(/** @type {!InternalMessage} */ (v));
      }
      // TODO(b/205306125): We use instanceof below to support dead code
      // elimination even though constructor comparisons would be preferable
      // performance wise.
      if (v instanceof ByteString) {
        return v.asBase64();
      }
      if (v instanceof JspbMap) {
        return v.toArrayOrUndefinedInternal(convertMapEntryToJsonFormat);
      }
      // TODO(b/396420284): remove.
      assert(!(v instanceof Uint8Array));
      // Arrays and sparse objects were handled by our caller, so this is really
      // just an invalid value. Drop it.
      return undefined;
  }
  return v;
}

/**
 * Returns a deep copy of the given object, converting inner fields to
 * JSON-compatible types.
 *
 * @param {!Array<?>} el element to clone.
 * @return {!Array<?>} A copy of this element
 */
function cloneToJsonFormat(el) {
  assertArray(el);
  return cloneJspbArray(
      el,
      // We don't need to pass the array state here because we either don't
      // expect any existing state from the source (e.g. cloneRaw) or we are not
      // producing an array for a clone so the caller doesn't need it.
      DEFAULT_ARRAY_STATE,
      /* convertLeaf = */ convertToJsonFormat);
}

/**
 * Helper for cloning an external array.
 *
 * @const {function(!Array<?>): !Array<?>}
 */
const cloneRaw = SUPPORTS_STRUCTURED_CLONE ?
    /** @type {function(!Array<?>): !Array<?>} */ (
        /** @type{?}*/ (structuredClone)) :
    /** @return {!Array<?>} */
    (/** !Array<?> */ arr) => cloneToJsonFormat(arr);

/**
 * Our current pivot selector.
 *
 * Stashed in a global and managed by `toRaw`.  This is simpler than
 * threading it through the recursive methods and it also makes it
 * easier for the compiler to trim it and related conditions when
 * the application isn't using pivot selectors.
 *
 * @private {!InternalPivotSelector|undefined}
 */
let currentPivotSelector;

/**
 * @param {!InternalMessage} message
 * @param {!PivotSelector=} pivotSelector
 * @return {!Array<?>}
 */
function toJsonValue(message, pivotSelector) {
  assert(!currentPivotSelector);
  if (pivotSelector) {
    currentPivotSelector = assertValidPivotSelector(pivotSelector);
    try {
      return toJsonValueInternal(message);
    } finally {
      currentPivotSelector = undefined;
    }
  }
  return toJsonValueInternal(message);
}

/**
 * Internal implementation of `toJSON` that can be devirtualized
 *
 * Generally, `serialize()` should be called instead, but this may be useful
 * when a JSON stringifiable value is required for compatibility with other
 * APIs.
 *
 * @param {!InternalMessage} message
 * @return {!Array<?>} The proto represented as an array.
 */
function toJsonValueInternal(message) {
  const internalArr = getInternalArray(message);
  return cloneJspbArray(
      internalArr, getMessageArrayState(internalArr),
      /* convertLeaf = */ convertToJsonFormat,
      /* isOwned= */ undefined,
      /* ctor= */ goog.DEBUG ?
          /** @type {function(new: InternalMessage)} */ (message.constructor) :
          undefined);
}

/**
 * Check for branches that can only be reached if a pivot selector other than
 * noChangePivotSelector is in use.
 */
function assertNontrivialPivotSelector() {
  if (!ENABLE_ASSERTS) return;
  const pivotSelector = currentPivotSelector ?? DEFAULT_PIVOT_SELECTOR;
  assert(pivotSelector !== noChangePivotSelector);
}

/**
 * @param {function(): T} func
 * @return {T}
 * @template T
 */
function withDeterministicPivotSelector(func) {
  assert(!currentPivotSelector);
  try {
    currentPivotSelector =
        assertValidPivotSelector(DETERMINISTIC_PIVOT_SELECTOR);
    return func();
  } finally {
    currentPivotSelector = undefined;
  }
}

exports = {
  // A low level array copying routine for unconstructed arrays.
  cloneRaw,
  // A primitive copy routine exposed for clone/toMutable/toImmutable
  cloneJspbArray,
  // Also used by dump.
  cloneToJsonFormat,
  // Used by transfer utilities.
  convertToJsonFormat,
  // The internal implementation of `toJsonValue` that can be devirtualized.
  toJsonValue,
  // Runs the given function (usually a copy operation) with a deterministic
  // pivot selector when the operation would be sensitive to randomization.
  withDeterministicPivotSelector,
};
