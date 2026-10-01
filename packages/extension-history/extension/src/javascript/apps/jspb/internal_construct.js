/**
 * @fileoverview Internal message construction utils.
 *
 * DO NOT USE THIS OUTSIDE OF THIS PACKAGE.
 */

goog.module('jspb.internal_construct');

const {ALREADY_CONSTRUCTED_THROTTLE_KEY} = goog.require('jspb.internal_symbols');
const {ArrayState, ArrayStateFlags, PIVOT_LIMIT, checkMessageStateInvariants, getArrayIndexOffset, getArrayState, hasFlagBit, setArrayState, setPivot} = goog.require('jspb.internal_array_state');
const {ENABLE_ASSERTS, assert, assertArray} = goog.require('goog.asserts');
const {assertArrayInvariants, fieldNumberFromIndex, hasOwnPropertyIfNotTrusted, indexFromFieldNumber, isSparseObject} = goog.require('jspb.internal');
const {logNewArray} = goog.require('jspb.internal_operations');
const {shouldThrowInArrayConstructorIfArrayIsAlreadyConstructed, shouldTransferArrayInConstructor} = goog.require('jspb.internal_options');
const {throttledAsyncThrowWarning} = goog.require('jspb.exceptions');
const {transferArray} = goog.require('jspb.internal.transfer_array');


const ENCODED_MAP_META = /** @type {*} */ (/** @type {?} */ (true));

/** @abstract */
class Opaque {}

/**
 * A MessageMeta is an array describing the type information necessary to
 * construct a message.
 *
 * These arrays may have either two or three elements, which are:
 *
 * [
 *    suggested pivot (number, usually zero),
 *    message_id (string, usually undefined),
 *    is_map (boolean, true iff present)
 * ]
 *
 * Because we cannot express such a tuple in JS types, we expose only as an
 * opaque type and localize manipulations to this file.
 *
 * @typedef {typeof Opaque}
 */
let MessageMeta;

let /** !MessageMeta|undefined */ mapEntryMessageMeta;

let /** !MessageMeta|undefined */ noPivotNoMessageIdMessageMeta;

/**
 * Parses the value from the beginning of binaryFieldsObject into a MessageMeta
 * value, returns `undefined` if not a valid raw message meta.
 *
 * See `GenerateClassBinaryFields` in
 * net/proto2/compiler/js/internal/generator.cc
 *
 * @return {!MessageMeta|undefined}
 */
function tryParseMessageMeta(/** ? */ value) {
  switch (typeof value) {
    case 'boolean':
      // All map entry message metadatas are [0, undefined, true] so we
      // shouldn't bother making more than one array.
      return (mapEntryMessageMeta ||= createMapEntryMessageMeta());
    case 'number':
      // Take its negation, bare pivots are encoded as non-positive numbers to
      // avoid ambiguity with oneof field arrays which are always >=1
      return value > 0 ?
          undefined :
          // 0 is incredibly common so cache the MessageMeta for it
          // This also avoids the awkward `-0` values we would otherwise get.
          value === 0 ?
          (noPivotNoMessageIdMessageMeta ||= createMessageMeta(0)) :
          createMessageMeta(-value);
    case 'string':
      // This is just a message_id
      return createMessageMeta(0, value);
    case 'object':
      // This is a message meta, check that it is valid and cast.
      assertArray(value);
      assert(value.length === 2 || (value.length === 3 && value[2] === true));
      assert(
          value[0] == null || (typeof value[0] === 'number' && value[0] >= 0));
      assert(value[1] == null || typeof value[1] === 'string');
      return /** @type{!MessageMeta}*/ (/** @type{?} */ (value));
    default:
      return undefined;
  }
}

/**
 * Creates a `MessageMeta` for map entry fields.
 *
 * @return {!MessageMeta}
 */
function createMapEntryMessageMeta() {
  return /** @type {!MessageMeta} */ (/** @type {?} */ ([0, undefined, true]));
}

/**
 * @return {!MessageMeta}
 */
function createMessageMeta(
    /** number|undefined */ suggestedPivot,
    /** string|undefined= */ messageId) {
  return /** @type{!MessageMeta}*/ (
      /** @type{?} */ ([suggestedPivot, messageId]));
}

/** @return {!Array<?>} */
function constructMessageArrayFromMetaForBinary(
    /** ?Array<?>|undefined */ data, /** !MessageMeta */ metadata) {
  assertArray(metadata);
  const metaAsArray = /** @type{!Array<?>} */ (/** @type{?} */ (metadata));
  const suggestedPivot = metaAsArray[0];
  const messageId = metaAsArray[1];
  return constructMessageArray(data, suggestedPivot, messageId);
}

/** @return {!Array<?>} */
function constructMessageArrayForJsonConversion(
    /** ?Array<?>|undefined */ data, /** string|undefined= */ messageId) {
  return constructMessageArray(data, /*suggestedPivot=*/ 500, messageId);
}

/** @return {boolean} */
function metaHasMessageId(/** !MessageMeta */ metadata) {
  assertArray(metadata);
  const metaAsArray = /** @type{!Array<?>} */ (/** @type{?} */ (metadata));
  return !!(metaAsArray[1]);
}

/**
 * Computes an array index offset given a MessageMeta.
 *
 * @return {number}
 */
function arrayIndexOffsetForMeta(/** !MessageMeta */ metadata) {
  return metaHasMessageId(metadata) ? 0 : -1;
}

/** @return {!Array<?>} */
function constructMessageArrayForMessageConstructor(
    /** ?Array<?>|undefined */ data, /** number|undefined=*/ suggestedPivot,
    /** string|undefined= */ messageId) {
  return constructMessageArray(
      data, suggestedPivot, messageId, ArrayStateFlags.HAS_WRAPPER);
}

/** @return {!Array<?>} @noinline */
function constructMessageArray(
    /** ?Array<?>|undefined */ data, /** number|undefined=*/ suggestedPivot,
    /** string|undefined= */ messageId,
    /** !ArrayState= */ arrayStateToAdd = 0) {
  // In tests, assert that immutable api formatted values are always
  // frozen. This allows us to surface state management problems early, before
  // assertArrayReturnedSafely and friends would fail.
  if (goog.DEBUG && ENABLE_ASSERTS && (data != null)) {
    for (let i = 0; i < data.length; i++) {
      const value = data[i];
      if (Array.isArray(value)) {
        assertArrayInvariants(value);
      }
    }
  }

  // Check array state invariants.
  let arrayState;
  if (data == null) {
    // The only reference to this array is this message so we know there are
    // no external mutable references.
    arrayState = ArrayStateFlags.MUTABLE_REFERENCES_ARE_OWNED;
    if (messageId) {
      data = logNewArray([messageId]);
      arrayState |= ArrayStateFlags.HAS_MESSAGE_ID;
    } else {
      data = logNewArray([]);
    }
    if (suggestedPivot) {
      arrayState = setPivot(arrayState, suggestedPivot);
    }
  } else {
    if (!Array.isArray(data)) {
      if (goog.DEBUG) {
        throw new Error(
            `data passed to JSPB constructors must be an Array, got '${
                JSON.stringify(data)}' a ${goog.typeOf(data)}`);
      } else {
        throw new Error('narr');
      }
    }

    arrayState = getArrayState(data);

    // Throw an error if the array is already owned by another jspb proto
    // instance.
    // Repeated field arrays should never be passed to constructors.
    if (shouldThrowInArrayConstructorIfArrayIsAlreadyConstructed() &&
        hasFlagBit(arrayState, ArrayStateFlags.IS_REPEATED_FIELD)) {
      if (goog.DEBUG) {
        throw new Error(
            'Array passed to JSPB constructor is a repeated field array that belongs to another proto instance.');
      } else {
        throw new Error('rfarr');
      }
    }

    // Mutable arrays that have already been marked as constructed belong to
    // another proto instance, so they cannot be safely used to construct
    // another message.
    if (isPossiblyMutablyShared(arrayState)) {
      maybeThrowAlreadyConstructedError();
    }

    if (goog.DEBUG) {
      // Only perform these mutability tests in debug, this is almost entirely
      // a testonly issue.
      if (Object.isFrozen(data) || !Object.isExtensible(data) ||
          Object.isSealed(data)) {
        throw new Error(`data passed to JSPB constructors must be mutable`);
      }
    }

    // If `shouldTransferArrayInConstructor` is enabled, and the array is not
    // owned by us, then transfer it in debug environments to prevent external
    // mutations by users.
    if (shouldTransferArrayInConstructor() &&
        hasFlagBit(arrayStateToAdd, ArrayStateFlags.HAS_WRAPPER) &&
        !hasFlagBit(arrayState, ArrayStateFlags.MUTABLE_REFERENCES_ARE_OWNED) &&
        !hasFlagBit(arrayState, ArrayStateFlags.IS_IMMUTABLE_ARRAY)) {
      // Transfer array in debug environments to prevent external mutations by
      // users.
      data = transferArray(/** @type{!Array<?>} */ (data), /* mutable= */ true);
    }

    if (arrayState & ArrayStateFlags.FROZEN_ARRAY) {
      // In DEBUG we would've thrown above.
      throw new Error('farr');
    }

    // Fast-path for constructed messages.
    if (arrayState & ArrayStateFlags.CONSTRUCTED) {
      if ((arrayState | arrayStateToAdd) !== arrayState) {
        setArrayState(data, arrayState |= arrayStateToAdd);
      }

      // Check state invariants.
      if (ENABLE_ASSERTS) {
        checkMessageStateInvariants(data, arrayState);
      }

      return data;
    }

    if (messageId) {
      arrayState |= ArrayStateFlags.HAS_MESSAGE_ID;
      if (messageId !== data[0]) {
        // Validate message ids in messages constructed from data.
        // Ensure that the data matches the Id unless explicitly disabled.
        if (goog.DEBUG) {
          throw new Error(`Expected message to have a message id: "${
              messageId}" in the array, got: ${JSON.stringify(data[0])} a ${
              goog.typeOf(data[0])}, are you parsing with the wrong proto?`);
        } else {
          throw new Error('mid');
        }
      }
    }

    arrayState = initPivotAndSparseObject(
        data,
        // Pretend to set CONSTRUCTED for assertions.
        //
        // We will do this below but avoid it here so there is exactly one
        // assignment.
        arrayState | ArrayStateFlags.CONSTRUCTED, suggestedPivot);
  }

  // At this point all message bits are consistent so we can set CONSTRUCTED.
  arrayState |= ArrayStateFlags.CONSTRUCTED | arrayStateToAdd;

  // Update our array state.
  setArrayState(data, arrayState);

  return data;
}

/** @noinline */
function maybeThrowAlreadyConstructedError() {
  if (shouldThrowInArrayConstructorIfArrayIsAlreadyConstructed()) {
    if (goog.DEBUG) {
      throw new Error(
          'Array passed to JSPB constructor already belongs to another JSPB proto instance');
    } else {
      throw new Error('carr');
    }
  }
  // Async-throw if !goog.DEBUG. If we were in debug mode but
  // shouldThrowInArrayConstructorIfArrayIsAlreadyConstructed was false then
  // it was explicitly disabled for testing.
  if (!goog.DEBUG) {
    throttledAsyncThrowWarning(
        undefined, ALREADY_CONSTRUCTED_THROTTLE_KEY, 5, 'carr');
  }
}

/**
 * Whether the array is owned by another jspb proto instance and unsafe
 * to be passed to the message constructor.
 *
 * @param {!ArrayState} arrayState
 * @return {boolean}
 */
function isPossiblyMutablyShared(arrayState) {
  // Any mutable instance with a wrapper is owned by another proto.
  return hasFlagBit(arrayState, ArrayStateFlags.HAS_WRAPPER) &&
      !hasFlagBit(arrayState, ArrayStateFlags.IS_IMMUTABLE_ARRAY);
}

/**
 * If the array contains an sparse object in its last position, then the
 * object is kept in place and its position is used as the pivot.  If not,
 * decides the pivot of the message based on suggestedPivot without
 * materializing the extension object.  Returns the updated arrayState value
 *
 * @param {!Array} data The JsPb internal array.
 * @param {number} arrayState the array state for the message.
 * @param {number|undefined} suggestedPivot See description for
 *     Message.constructor.
 * @return {number}
 */
function initPivotAndSparseObject(data, arrayState, suggestedPivot) {
  // There are 3 variants that need to be dealt with which are the
  // combination of whether there exists an sparse object (SO) and
  // whether there is a suggested pivot (SP).
  //
  // SO,    ?    : pivot is the index of the SO
  // no-SO, no-SP: pivot is MAX_INT
  // no-SO, SP   : pivot is the max(lastindex + 1, SP)
  const msgLength = data.length;
  if (msgLength) {
    const lastIndex = msgLength - 1;
    const obj = data[lastIndex];
    if (isSparseObject(obj)) {
      const arrayIndexOffset = getArrayIndexOffset(arrayState);
      const pivot = fieldNumberFromIndex(lastIndex, arrayIndexOffset);
      if (pivot >= PIVOT_LIMIT) {
        if (goog.DEBUG) {
          throw new Error(
              `Found a message with a sparse object at fieldNumber ${
                  pivot} is >= the limit ${PIVOT_LIMIT}`);
        } else {
          throw new Error('pvtlmt');
        }
      }

      // Move low extensions to the dense portion so we don't have to worry
      // about them. This means that values in the sparse object 'overwrite'
      // values in the array but that is consistent with server behavior.
      //
      // Note that we cannot assume that the sparse object keys are ordered
      // because they might not have been in browsers before 2016.
      //
      // We don't bother removing the sparse object because serialization
      // already implements that.
      for (const k in obj) {
        if (!hasOwnPropertyIfNotTrusted(obj, k)) continue;
        const n = +k;
        if (n < pivot) {
          const i = indexFromFieldNumber(n, arrayIndexOffset);
          assert(data[i] == null);
          data[i] = obj[k];
          delete obj[k];
        } else if (goog.FEATURESET_YEAR >= 2018) {
          break;
        }
      }

      return setPivot(arrayState, pivot);
    }
  }
  if (suggestedPivot) {
    // If a sparse object is not present, set the pivot value as being
    // after the last value in the array to avoid overwriting values, etc.
    const arrayIndexOffset = getArrayIndexOffset(arrayState);
    const pivot = Math.max(
        suggestedPivot, fieldNumberFromIndex(msgLength, arrayIndexOffset));
    if (pivot > PIVOT_LIMIT) {
      if (goog.DEBUG) {
        throw new Error(`a message was constructed with an array of length ${
            msgLength} which is longer than ${
            PIVOT_LIMIT}, are you using a supported serializer?`);
      } else {
        throw new Error('spvt');
      }
    }
    // Otherwise store in the arrayState
    return setPivot(arrayState, pivot);
  } else {
    // otherwise don't set a pivot, this is the same as explicitly setting
    // NO_PIVOT
    return arrayState;
  }
}

/**
 * Returns whether the given MessageMeta corresponds to a map entry field.
 *
 * @return {boolean}
 */
function isMapEntryMessageMeta(/** !MessageMeta */ messageMeta) {
  return messageMeta === mapEntryMessageMeta;
}

exports = {
  ENCODED_MAP_META,
  MessageMeta,
  arrayIndexOffsetForMeta,
  constructMessageArrayForJsonConversion,
  constructMessageArrayForMessageConstructor,
  constructMessageArrayFromMetaForBinary,
  isMapEntryMessageMeta,
  metaHasMessageId,
  tryParseMessageMeta,
};
