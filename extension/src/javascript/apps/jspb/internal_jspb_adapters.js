/**
 * @fileoverview Holds internal functions for implementing per-field logic for
 * reading/writing data from the jspb internal array.  Use by code other than
 * jspb gencode is forbidden.  You will be broken if you call these functions
 * without explicit approval.
 *
 * DO NOT USE THIS OUTSIDE OF THIS PACKAGE.
 */
goog.module('jspb_internal_adapters');
goog.module.declareLegacyNamespace();

const {ArrayState, ArrayStateFlags, EMPTY_LIST_SENTINEL, NO_PIVOT, TypeSpecificApiFormat, addArrayStateFlags, checkMessageStateInvariants, clearFlagBit, clearFlags, clearTypeSpecificFormattedFlagBits, getArrayIndexOffset, getArrayStateInline, getDefaultTypeSpecificApiFormat, getMessageArrayStateInline, getPivot, getPossiblyUnconstructedMessageArrayStateInline, getRepeatedArrayState, getTypeSpecificApiFormat, hasFlagBit, isApiFormattedField, isImmutableArray, markArrayImmutable, markKnownMapArray, markMutableReferencesAreOwned, setArrayState, setFlagBit, setFlagBitTo} = goog.require('jspb.internal_array_state');
const {ByteString} = goog.require('jspb.bytestring');
const {DETAILED_JSPB_ASSERTS, LegacyNullableBehavior, getAsyncThrowIf64BitIntReturnTypeMismatches, getAsyncThrowIfStringTypedInt64FieldDowngrade, getLegacyNullableBehavior, getWriteBackGbigintValues} = goog.require('jspb.internal_options');
const {DO_NOT_FREEZE__LEGACY_OPTION, DoNotFreezeToken, HasMessageId, InternalMessage, OR_UNDEFINED, OrUndefinedToken, assertArrayInvariants, assertRepeated64BitIntegerFieldApiFormattingInvariants, assertValidHasMessageIdOrUndefined, bytesAsByteString, checkNotImmutableState, checkRepeatedIndexInRangeForGet, checkRepeatedIndexInRangeForSet, getHasMessageId, getInternalArrayInline, indexFromFieldNumber, indexFromFieldNumberAndHasMessageId, isImmutableMessage, isInternalMessage, isNoLegacyNull, isSparseObjectInline} = goog.require('jspb.internal');
const {ENABLE_ASSERTS, assert, assertExists, assertInstanceof} = goog.require('goog.asserts');
const {HAS_NATIVE_SYMBOL, ONEOF_ARRAY_SYMBOL, RETURNED_64BIT_INT_VALUE_MISMATCH_SYMBOL, STRING_TYPE_DOWNGRADES_SYMBOL} = goog.require('jspb.internal_symbols');
const {JspbMap, getImmutableEmptyMap, isImmutableMap} = goog.require('jspb.internal_map');
const {MessageMeta, constructMessageArrayFromMetaForBinary} = goog.require('jspb.internal_construct');
const {assertValidLeakedMutableSubstructures, canMarkImmutableInPlaceIfParentIsOwned, copyArrayWithImmutableFields, ensureMutable, leakedMutableSubstructures, maybeCopyOnWrite, messageToMutable} = goog.require('jspb.internal_immutability');
const {asyncThrowWarning, throttledAsyncThrowWarning} = goog.require('jspb.exceptions');
const {booleanKeyToApiForMaps, booleanToApiForMaps, bytesToApiForMaps, checkBoolean, checkBytes, checkEnum, checkFloatingPoint, checkInt32, checkInt64, checkMessageType, checkNullishBoolean, checkNullishBytes, checkNullishEnum, checkNullishFloatingPoint, checkNullishInt32, checkNullishInt64, checkNullishString, checkNullishUint32, checkNullishUint64, checkRepeatedFieldIsArray, checkString, checkUint32, checkUint64, coerceToNullishBoolean, coerceToNullishEnum, coerceToNullishFloatingPoint, coerceToNullishInt32, coerceToNullishInt64, coerceToNullishInt64Gbigint, coerceToNullishInt64String, coerceToNullishString, coerceToNullishUint32, coerceToNullishUint64, coerceToNullishUint64Gbigint, coerceToNullishUint64String, enumToApiForMaps, floatToApiForMaps, getDefaultImmutableInstance, int32KeyToApiForMaps, int32ToApiForMaps, int64GbigintKeyToApiForMaps, int64GbigintToApiForMaps, int64KeyToApiForMaps, int64ToApiForMaps, messageFromInlineStorage, stringKeyToApiForMaps, stringToApiForMaps, uint32KeyToApiForMaps, uint32ToApiForMaps, uint64GbigintKeyToApiForMaps, uint64GbigintToApiForMaps, uint64KeyToApiForMaps, uint64ToApiForMaps} = goog.require('jspb.internal_accessor_helpers');
const {logNewArray, logOperation, slice} = goog.require('jspb.internal_operations');
const {toGbigint} = goog.require('google3.javascript.common.bigint.index');

/**
 * Special field number used to signify a non-existent field.
 * @const {number}
 */
const NO_SUCH_FIELD = -1;

/**
 * Default value for 64-bit int fields as a gbigint.
 * @const {!gbigint}
 */
const GBIGINT_ZERO = toGbigint(0);

/** @typedef {boolean} */ let ForceTypeChecking;

/**
 * Performs a rate-limited async throw if value is not actually typed as
 * expected.
 *
 * @param {T} msg
 * @param {number|string|null|undefined} value
 * @param {boolean} expectStringValue True if value should be a string, else a
 *     number.
 * @template T
 */
function asyncThrowIf64BitIntReturnTypeMismatches(
    msg, value, expectStringValue) {
  if (value == null || !getAsyncThrowIf64BitIntReturnTypeMismatches()) {
    return;
  }

  const expectedType = expectStringValue ? 'string' : 'number';
  if (typeof value === expectedType) {
    return;
  } else if (
      expectedType === 'number' && !Number.isSafeInteger(Number(value))) {
    return;
  }

  const error = goog.DEBUG ?
      `Expected a ${expectedType}-typed 64-bit int value, but got ${
          goog.typeOf(value)}: ${value}` :
      '64birm';

  throttledAsyncThrowWarning(
      msg, RETURNED_64BIT_INT_VALUE_MISMATCH_SYMBOL,
      /* limit = */ 4, error);
}

/**
 * Performs a rate-limited async throw if values is not actually typed as
 * expected. This is a convenience version of
 * asyncThrowIf64BitIntReturnTypeMismatches. We only check one element for
 * repeated fields.
 *
 * @param {T} msg
 * @param {!Array<?>} values
 * @param {boolean} expectStringValue True if value should be a string, else a
 *     number.
 * @template T
 */
function asyncThrowIfRepeated64BitIntReturnTypeMismatches(
    msg, values, expectStringValue) {
  if (values.length === 0) {
    return;
  }

  // The purpose of this guard is to ensure the returned value generally
  // aligns with the getter return type. In particular, number[] types that
  // are actually becoming string[] due to traversing ESF.
  //
  // Unfortunately, legacy formatting semantics mean the repeated field could
  // technically consist of both string and number values. We punt on this
  // detecting this scenario to avoid undue burden.
  asyncThrowIf64BitIntReturnTypeMismatches(msg, values[0], expectStringValue);
}

/**
 * Tests whether or not the given array needs to be re-formatted.
 * Returns true if our state is not API formatted or if it corresponds to
 * a 64-bit int field that needs a different type-specific formatting
 * (if expectedFormatType is defined)
 *
 * @param {!InternalMessage} message
 * @param {!ArrayState} state
 * @param {!TypeSpecificApiFormat=} expectedFormatType
 * @param {boolean=} doesntReturnArray
 * @return {boolean} Returns true if field should be (re-)formatted.
 */
function needsApiFormatting(
    message, state, expectedFormatType, doesntReturnArray) {
  if (!hasFlagBit(state, ArrayStateFlags.IS_API_FORMATTED)) {
    // Not formatted to begin with.
    return true;
  }

  if (expectedFormatType == null) {
    // Lack of an expected format means this field isn't a 64-bit int. no
    // type-specific formatting is required.
    return false;
  }

  assert(
      expectedFormatType === TypeSpecificApiFormat.LEGACY ||
          expectedFormatType === ArrayStateFlags.STRING_FORMATTED ||
          expectedFormatType === ArrayStateFlags.GBIGINT_FORMATTED,
      `Expected format type to be one of legacy, string, or gbigint, but got ${
          expectedFormatType}`);

  // Complain on attempt to dowgrade to legacy formatting for 64-bit int fields.
  // Such a conversion is impossible (the legacy values were previously lost on
  // conversion to string or gbigint formatting).
  if (!doesntReturnArray &&
      expectedFormatType === TypeSpecificApiFormat.LEGACY &&
      (hasFlagBit(state, ArrayStateFlags.STRING_FORMATTED) ||
       hasFlagBit(state, ArrayStateFlags.GBIGINT_FORMATTED)) &&
      getAsyncThrowIfStringTypedInt64FieldDowngrade() &&
      // Emit a warning at most four times per type.
      (message.constructor[STRING_TYPE_DOWNGRADES_SYMBOL] =
           (message.constructor[STRING_TYPE_DOWNGRADES_SYMBOL] | 0) + 1) < 5) {
    asyncThrowWarning(
        goog.DEBUG ?
            'an _asLegacyNumberOrString accessor was called after an ' +
                '_asString accessor: this can cause type errors when numeric ' +
                'values are expected -- we recommend standardizing your ' +
                'whole application on the _asString version. See ' +
                'go/jspb-gencode?polyglot=typescript#int64-string-accessors ' +
                'for more information.' :
            'int64 downgrade');
  }

  // We know state already includes IS_API_FORMATTED (else would've returned
  // early). If legacy formatting was expected, there's nothing more that can be
  // done.
  if (expectedFormatType === TypeSpecificApiFormat.LEGACY) {
    return false;
  }

  return !hasFlagBit(
      state, /** @type {!ArrayStateFlags} */ (expectedFormatType));
}

class LegacyNullableToken {}
const LEGACY_NULLABLE = /** @type {!LegacyNullableToken} */ ({});

/**
 * Gets the value of a field.
 *
 * If !legacyNullable, result will always be `undefined` if the field is unset.
 * Otherwise, result will use historic legacy nullable behavior (modulo any
 * other setting that overrides it).
 *
 * If you pass a coercion function and a value is present, we will coerce the
 * value. If the result was different and non-nullish, we will set it back.
 *
 * @return {?}
 */
exports.getFieldNullable = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber,
    /** !HasMessageId|undefined */ hasMessageId,
    /** !LegacyNullableToken|undefined= */ legacyNullable,
    /** (function(?): ?)= */ coerceFn) {
  // Don't freeze jspb messages.
  assert(Object.isExtensible(message));
  const value = exports.getFieldNullableInternal(
      getInternalArrayInline(message), /* arrayState= */ undefined, fieldNumber,
      hasMessageId, coerceFn);
  if (value === null && (!legacyNullable || shouldReturnUndefined(message))) {
    return undefined;
  }
  return value;
};

/**
 * @param {!InternalMessage} message
 * @return {boolean}
 */
function shouldReturnUndefined(message) {
  return getLegacyNullableBehavior() ===
      LegacyNullableBehavior.ALWAYS_UNDEFINED ||
      isNoLegacyNull(message);
}

function assertIndexConsistentWithMessageState(
    /** !Array<?> */ messageArray,
    /** number */ arrayIndex,
    /** number */ fieldNumber) {
  if (ENABLE_ASSERTS) {
    assert(
        arrayIndex ===
        indexFromFieldNumber(
            fieldNumber,
            getArrayIndexOffset(getArrayStateInline(messageArray))));
  }
}


/**
 * Gets the value of a field.
 *
 * If you pass a coercion function and a value is present, we will coerce the
 * value. If the result was different and non-nullish, we will set it back.
 *
 * @return {?}
 */
exports.getFieldNullableInternal = function(
    /** !Array */ messageArray,
    /** number|undefined */ messageArrayState,
    /** number */ fieldNumber,
    /** !HasMessageId|undefined */ hasMessageId,
    /** (function(?): ?)= */ coerceFn) {
  assertValidHasMessageIdOrUndefined(messageArray, hasMessageId);
  if (DETAILED_JSPB_ASSERTS) {
    logOperation({getField: 1});
    assertValidLeakedMutableSubstructures(messageArray);
  }
  if (fieldNumber === NO_SUCH_FIELD) {
    return null;
  }

  // This is very performance sensitive code.
  //
  // Generally we expect to be finding a value in the array portion of the
  // message, so we avoid doing any work if the field number is less than
  // the arrayLength-1.
  //
  // We always need to check the array length so do that first and guard all
  // other checks on length checks first.
  const arrayIndex =
      indexFromFieldNumberAndHasMessageId(fieldNumber, hasMessageId);
  assertIndexConsistentWithMessageState(messageArray, arrayIndex, fieldNumber);
  assert(arrayIndex >= 0);
  const last = messageArray.length - 1;

  // Retrieve a value from the array or sparse object.
  let value;
  let /** ? */ lastValue;
  let /** boolean|undefined */ inSparseObject;
  if (last < indexFromFieldNumberAndHasMessageId(1, hasMessageId)) {
    return undefined;
  } else if (arrayIndex >= last) {
    lastValue = messageArray[last];
    if (isSparseObjectInline(lastValue)) {
      value = lastValue[fieldNumber];
      inSparseObject = true;
    } else if (arrayIndex === last) {
      value = lastValue;
    } else {
      return undefined;
    }
  } else {
    value = messageArray[arrayIndex];
  }

  if (coerceFn && value != null) {
    const coerced = coerceFn(value);
    // For an invalid value, we treat the field as unknown and preserve its
    // value. We may consider dropping them but there seems to be no strong
    // reason to do so and the case is very rare.
    if (coerced == null) return coerced;
    if (!Object.is(coerced, value)) {
      // Write back a coerced value.
      if (inSparseObject) {
        lastValue[fieldNumber] = coerced;
      } else {
        messageArray[arrayIndex] = coerced;
      }
      return coerced;
    }
  }

  return value;
};

/**
 * Sets the value of a field.
 * @param {T} message
 * @param {number} fieldNumber The field number.
 * @param {string|number|boolean|!gbigint|!ByteString|!Array|!JspbMap|!InternalMessage|null|undefined}
 *     value
 * @param {!HasMessageId|undefined} hasMessageId
 * @return {T}
 * @template T
 */
exports.setField = function(message, fieldNumber, value, hasMessageId) {
  ensureMutable(message);
  const messageArray = getInternalArrayInline(message);
  setFieldIgnoringImmutabilityInternal(
      messageArray, getMessageArrayStateInline(messageArray), fieldNumber,
      value, hasMessageId);
  return message;
};

/** @const */
exports.setFieldIgnoringImmutability = setFieldIgnoringImmutabilityInternal;


/**
 * Sets the value of a field even on immutable protos
 * @param {!Array<?>} messageArray
 * @param {!ArrayState|undefined} messageArrayState
 * @param {number} fieldNumber The field number.
 * @param {string|number|boolean|!gbigint|!ByteString|!Array|!JspbMap|!InternalMessage|null|undefined}
 *     value
 * @param {!HasMessageId|undefined} hasMessageId
 * @return {!ArrayState|undefined} the new array state.
 */
function setFieldIgnoringImmutabilityInternal(
    messageArray, messageArrayState, fieldNumber, value, hasMessageId) {
  assertValidHasMessageIdOrUndefined(messageArray, hasMessageId);
  if (DETAILED_JSPB_ASSERTS) logOperation({setField: 1});
  const arrayIndex =
      indexFromFieldNumberAndHasMessageId(fieldNumber, hasMessageId);
  assertIndexConsistentWithMessageState(messageArray, arrayIndex, fieldNumber);
  assert(arrayIndex >= 0);
  const last = messageArray.length - 1;
  if (last >= indexFromFieldNumberAndHasMessageId(1, hasMessageId) &&
      arrayIndex >= last) {
    const lastValue = messageArray[last];
    if (isSparseObjectInline(lastValue)) {
      lastValue[fieldNumber] = value;
      return messageArrayState;
    }
  }

  if (arrayIndex <= last) {
    messageArray[arrayIndex] = value;
    return messageArrayState;
  }

  // if we get here then we need to either extend the array or create a sparse
  // object.
  //
  // no point in doing anything if the value is undefined. However, if the value
  // is `null` then we need to assign it in order to preserve the behavior of
  // legacyNullable accessors
  if (value !== undefined) {
    const pivot = getPivot(
        messageArrayState ??= getMessageArrayStateInline(messageArray));
    if (fieldNumber >= pivot) {
      assert(pivot !== NO_PIVOT);
      // don't bother allocating a sparse object if the value is null. We don't
      // need to maintain null/undefined semantics for sparse objects.
      if (value != null) {
        messageArray[indexFromFieldNumberAndHasMessageId(pivot, hasMessageId)] =
            {[fieldNumber]: value};
      }
    } else {
      // Common case: field is below the pivot belongs in the array portion.
      messageArray[arrayIndex] = value;  // this will extend the array
    }
  }
  return messageArrayState;
}


/**
 * Returns whether the given field is set.
 * @return {boolean}
 */
exports.hasWrapperField = function(
    /** !InternalMessage */ message,
    /** function(new:InternalMessage, ?Array<?>=)  */ ctor,
    /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  const messageArray = getInternalArrayInline(message);
  return getReadonlyWrapperFieldOrUndefinedInternal(
             messageArray, getMessageArrayStateInline(messageArray), ctor,
             fieldNumber, hasMessageId) !== undefined;
};

/**
 * Parameter to `getRepeatedWrapperFieldInternal`/`getApiFormattedRepeatedField`
 * to document how frozen the caller wants the array to be.
 * @enum {number}
 */
const RepeatedArrayReturnType = {
  /** The caller intends to return a frozen array to the client. */
  FROZEN: 1,

  /**
   * The caller intends to return an unfrozen array to the client.
   * This is only valid if the message is mutable.
   */
  UNFROZEN: 2,

  /**
   * The caller will not return the array to the client, so the array returned
   * can either be frozen or unfrozen, no cloning or freezing required.
   */
  EITHER_FROZEN_OR_UNFROZEN: 3,

  /**
   * Same as FROZEN if the array has not already been shared as unfrozen, and
   * EITHER_FROZEN_OR_UNFROZEN otherwise.
   */
  FROZEN_UNLESS_SHARED: 4,
};

exports.RepeatedArrayReturnType = RepeatedArrayReturnType;

/**
 * Check invariants on returned messages.
 *
 * This ensures that:
 * - A mutable child is never returned from an immutable parent.
 *
 * @return {!InternalMessage|undefined}
 */
function assertMessageReturnedSafely(
    /** !InternalMessage|undefined */ child, /** !Array<?> */ parent,
    /** boolean|undefined */ isNewlyConstructed) {
  // Drop out if no message was present.
  if (!goog.DEBUG || !child) {
    return child;
  }

  // Cannot return a mutable message from an immutable parent.
  assert(isImmutableArray(parent) ? isImmutableMessage(child) : true);

  // TODO(varomodt): apply these assertions globally: currently they are
  // disabled due to non-Message values being set into JSPB arrays, especially
  // mocks.
  if (DETAILED_JSPB_ASSERTS) {
    // A child message, if any, should be constructed
    assert(
        getMessageArrayStateInline(getInternalArrayInline(child)) &
        ArrayStateFlags.CONSTRUCTED);

    // Cannot return a mutable message from an immutable parent.
    assert(
        !(getMessageArrayStateInline(parent) &
          ArrayStateFlags.IS_IMMUTABLE_ARRAY) ||
        (getMessageArrayStateInline(getInternalArrayInline(child)) &
         ArrayStateFlags.IS_IMMUTABLE_ARRAY));

    if (isNewlyConstructed) {
      // If the parent is owned, any newly constructed child should be owned or
      // immutable.
      if (getMessageArrayStateInline(parent) &
          ArrayStateFlags.MUTABLE_REFERENCES_ARE_OWNED) {
        assert(
            getMessageArrayStateInline(getInternalArrayInline(child)) &
                (ArrayStateFlags.MUTABLE_REFERENCES_ARE_OWNED |
                 ArrayStateFlags.IS_IMMUTABLE_ARRAY),
            'Array must be either owned or immutable.');
      }
    }
  }
  return child;
}

/**
 * Check invariants on returned maps.
 *
 * This ensures that:
 * - A map is always immutable|constructed|unowned.
 * - A mutable map is never returned from an immutable parent.
 * - An immutable map is never returned from a mutable parent.
 * - All message values in a map returned from an immutable parent are
 *   immutable or unconstructed.
 *
 * @template K, V
 * @return {!JspbMap<K, V>}
 * @suppress {visibility} accesses private properties of Map
 */
function assertMapReturnedSafely(
    /** !JspbMap<K, V> */ m, /** !Array<?> */ parent) {
  // A map's mutability should correspond with that of its parent.
  assert(isImmutableMap(m) === isImmutableArray(parent));

  // Perform complex (especially linear-complexity) assertions only if
  // DETAILED_JSPB_ASSERTS is set.
  if (DETAILED_JSPB_ASSERTS && m.valueCtor) {
    // values() will construct all our submessages before returning and we do
    // not want that here.
    for (const value of m.rawValuesInternal_()) {
      if (isInternalMessage(value)) {
        assertMessageReturnedSafely(
            /** @type {!InternalMessage} */ (value), parent,
            /* isNewlyConstructed = */ undefined);
      }

      if (Array.isArray(value)) {
        const state = getArrayStateInline(value);
        if (state & ArrayStateFlags.CONSTRUCTED) {
          // State may be constructed if we were parsed from binary
          checkMessageStateInvariants(value, state);
        }
      }
    }
  }

  return m;
}

/**
 * Check invariants on returned repeated fields.
 *
 * @template T
 * @return {!Array<T>}
 */
function assertArrayReturnedSafely(
    /** !Array<T> */ arr, /** !Array<?> */ parent,
    /** boolean= */ skipFrozenCheck = false) {
  if (!ENABLE_ASSERTS) {
    return arr;
  }
  assertArrayInvariants(arr, skipFrozenCheck);
  const arrayState = getArrayStateInline(arr);
  assert(arrayState & ArrayStateFlags.IS_REPEATED_FIELD);
  if (!skipFrozenCheck) {
    // We should always be frozen or unowned when an array is returned.
    assert(
        Object.isFrozen(arr) || (arrayState & ArrayStateFlags.UNFROZEN_SHARED));

    // If the parent was immutable, this array must be frozen, but not
    // necessarily marked as immutable for primitive fields.
    assert(isImmutableArray(parent) ? Object.isFrozen(arr) : true);
  }
  return arr;
}

/**
 * Check invariants on returned repeated wrapper fields.
 *
 * @template T
 * @return {!Array<T>}
 */
function assertMessageArrayReturnedSafely(
    /** !Array<T> */ arr,
    /** !Array<?> */ parent, /** number */ fieldNumber,
    /** boolean|undefined */ isNewlyConstructed,
    /** boolean= */ skipFrozenCheck = false) {
  if (!ENABLE_ASSERTS) {
    return arr;
  }
  const isParentImmutable = isImmutableArray(parent);
  const arrayImmutable = isImmutableArray(arr);
  const arrayFrozen = Object.isFrozen(arr);
  const frozenAndImmutable = (arrayFrozen && arrayImmutable);
  assertArrayReturnedSafely(arr, parent, skipFrozenCheck);

  // If the parent or array was immutable, this array must be frozen and
  // marked as immutable.
  if (isParentImmutable || arrayImmutable) {
    if (skipFrozenCheck) {
      assert(arrayImmutable);
    } else {
      assert(frozenAndImmutable);
    }
  }

  assert(isApiFormattedField(arr));

  if (arrayImmutable && arr.length) {
    // Perform linear-complexity assertions only if DETAILED_JSPB_ASSERTS.
    let length = 1;
    if (DETAILED_JSPB_ASSERTS) {
      length = arr.length;
    }
    for (let i = 0; i < length; i++) {
      assertMessageReturnedSafely(
          /** @type {!InternalMessage} */ (arr[i]), parent, isNewlyConstructed);
    }
  }
  return arr;
}

/**
 * Returns whether the given field is set.
 * @return {boolean}
 */
exports.hasOneofWrapperField = function(
    /** !InternalMessage */ message,
    /** function(new:InternalMessage, ?Array<?>=)  */ ctor,
    /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof,
    /** !HasMessageId= */ hasMessageId) {
  const messageArray = getInternalArrayInline(message);
  return getReadonlyWrapperFieldOrUndefinedInternal(
             messageArray, getMessageArrayStateInline(messageArray), ctor,
             exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
             hasMessageId) !== undefined;
};

/**
 * Gets the value of a repeated field.  This is only to be used by the binary
 * implementation for reading packed fields.
 * @return {!Array<?>}
 */
exports.getRepeatedFieldForBinary = function(
    /** !Array */ messageArray, /** number */ fieldNumber) {
  const messageArrayState =
      getPossiblyUnconstructedMessageArrayStateInline(messageArray);
  return getRepeatedFieldInternalForBinary(
      messageArray, messageArrayState, fieldNumber);
};

/**
 * Gets the count/size of a repeated field.
 * @return {number}
 * @template T
 */
exports.getRepeatedWrapperCount = function(
    /** !InternalMessage */ message,
    /** function(new:T, ?Array<?>)} */ ctor,
    /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  const messageArray = getInternalArrayInline(message);
  const wrappers = getRepeatedWrapperFieldInternal(
      message, messageArray, getMessageArrayStateInline(messageArray), ctor,
      fieldNumber, RepeatedArrayReturnType.EITHER_FROZEN_OR_UNFROZEN,
      hasMessageId);
  return wrappers.length;
};

/**
 * Gets readonly wrapper for the repeated field value at `index`.
 * @return {T}
 * @template T
 */
exports.getRepeatedIndexedReadonlyWrapper = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber,
    /** function(new:T, ?Array<?>)} */ ctor,
    /** number */ index,
    /** !HasMessageId= */ hasMessageId) {
  const messageArray = getInternalArrayInline(message);
  const wrappers = getRepeatedWrapperFieldInternal(
      message, messageArray, getMessageArrayStateInline(messageArray), ctor,
      fieldNumber, RepeatedArrayReturnType.EITHER_FROZEN_OR_UNFROZEN,
      hasMessageId);
  checkRepeatedIndexInRangeForGet(wrappers, index);
  return wrappers[index];
};

/**
 * Gets mutable wrapper for the repeated field value at `index`.
 * @return {T}
 * @template T
 */
exports.getRepeatedIndexedMutableWrapper = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber,
    /** function(new:T, ?Array<?>)} */ ctor,
    /** number */ index,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  const messageArray = getInternalArrayInline(message);
  const wrappers = getRepeatedWrapperFieldInternal(
      message, messageArray, getMessageArrayStateInline(messageArray), ctor,
      fieldNumber, RepeatedArrayReturnType.UNFROZEN, hasMessageId,
      /*doesntReturnArray=*/ true);
  checkRepeatedIndexInRangeForGet(wrappers, index);
  const submessage = wrappers[index];
  const asMutable = messageToMutable(submessage);
  if (submessage !== asMutable) {
    wrappers[index] = asMutable;
    const state = getRepeatedArrayState(wrappers);
    if (!hasFlagBit(state, ArrayStateFlags.MUTABLE_SUBSTRUCTURES)) {
      setArrayState(
          wrappers, setFlagBit(state, ArrayStateFlags.MUTABLE_SUBSTRUCTURES));
      leakedMutableSubstructures(messageArray);
    }
  }
  return asMutable;
};

/**
 * Sets wrapper for the repeated field value at `index`.
 * @return {Parent}
 * @template Parent, Child
 */
exports.setRepeatedIndexedWrapper = function(
    /** Parent */ message,
    /** number */ fieldNumber,
    /** function(new:Child, ?Array<?>=)} */ ctor,
    /** number */ index,
    /** Child */ value,
    /** !HasMessageId= */ hasMessageId) {
  const self = /** @type {!InternalMessage} */ (message);
  spliceRepeatedWrapperField(
      self, fieldNumber, ctor, hasMessageId, value, index,
      /*deleteCount=*/ 1, /* removeOnly = */ undefined);
  return message;
};

/**
 * @return {number|null|undefined}
 */
exports.getFloatingPointFieldNullable = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId,
    /** !LegacyNullableToken|undefined= */ legacyNullable) {
  return exports.getFieldNullable(
      message, fieldNumber, hasMessageId, legacyNullable,
      coerceToNullishFloatingPoint);
};

/**
 * @return {!ByteString|null|undefined}
 */
exports.getBytesFieldNullable = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId,
    /** !LegacyNullableToken|undefined= */ legacyNullable) {
  return exports.getFieldNullable(
      message, fieldNumber, hasMessageId, legacyNullable, coerceToNullishBytes);
};

/**
 * Whether a repeated field array should be frozen by the getter based on
 * opt-out and if it's an extension, expressed as a RepeatedArrayReturnType.
 * @param {!DoNotFreezeToken|undefined} freezeOptOut the
 *     DO_NOT_FREEZE__LEGACY_OPTION token if passed by the user to the accessor.
 * @return {!RepeatedArrayReturnType}
 */
exports.getRepeatedFieldReturnType = function(freezeOptOut) {
  return freezeOptOut === DO_NOT_FREEZE__LEGACY_OPTION ?
      RepeatedArrayReturnType.UNFROZEN :
      RepeatedArrayReturnType.FROZEN_UNLESS_SHARED;
};

/**
 * Access a repeated field that needs some amount of 'coercion' off the wire.
 *
 * If message is immutable, the returned array will always be frozen.
 *
 * If message is mutable, the returned array will be frozen or unfrozen
 * depending on returnType.
 *
 * @param {!InternalMessage} message
 * @param {number} fieldNumber
 * @param {function(?):(T|undefined|null)} coercionFn If the coercion function
 *     returns a nullish value then the value will be dropped from the repeated
 *     field.
 * @param {!RepeatedArrayReturnType} returnTypeForMutable
 * @param {boolean=} doesntReturnArray
 * @param {!TypeSpecificApiFormat=} formatType Specific type the array should be
 coerced to.
 * @param {!HasMessageId=} hasMessageId
 * @return {!Array<T>}
 * @template T
 */
function getApiFormattedRepeatedField(
    message, fieldNumber, coercionFn, returnTypeForMutable, doesntReturnArray,
    formatType, hasMessageId) {
  let messageArray = getInternalArrayInline(message);
  let messageArrayState = getMessageArrayStateInline(messageArray);
  const isImmutableParent = isImmutableMessage(message, messageArrayState);
  const returnType =
      isImmutableParent ? RepeatedArrayReturnType.FROZEN : returnTypeForMutable;
  // EITHER_FROZEN_OR_UNFROZEN implies we don't return the array. Returning the
  // array requires an explicit frozenness choice
  doesntReturnArray = !!doesntReturnArray ||
      returnType === RepeatedArrayReturnType.EITHER_FROZEN_OR_UNFROZEN;

  if (returnType === RepeatedArrayReturnType.UNFROZEN) {
    if (maybeCopyOnWrite(message)) {
      messageArray = getInternalArrayInline(message);
      messageArrayState = getMessageArrayStateInline(messageArray);
    }
  }

  let values = getRawRepeatedFieldWithDefault(
      messageArray, messageArrayState, fieldNumber, hasMessageId);
  let existingState = getRepeatedArrayState(values);
  let valueState = setFlagsForRepeatedField(existingState, messageArrayState);

  assertRepeated64BitIntegerFieldApiFormattingInvariants(values);

  const needFormat =
      needsApiFormatting(message, valueState, formatType, doesntReturnArray);
  if (needFormat) {
    // If we are changing the type-specific formatting of a
    // 64-bit int repeated field, then we need to avoid modifying the instance
    // we previously returned (e.g. a legacy access followed by an _asString
    // access).
    if (hasFlagBit(valueState, ArrayStateFlags.IS_API_FORMATTED)) {
      values = slice(values);
      existingState = 0;
      valueState =
          setFlagsForSlicedRepeatedArray(valueState, messageArrayState);
      messageArrayState = assertExists(setFieldIgnoringImmutabilityInternal(
          messageArray, messageArrayState, fieldNumber, values, hasMessageId));
    }

    let from = 0, to = 0;
    for (; from < values.length; from++) {
      const coerced = coercionFn(values[from]);
      if (coerced != null) {
        values[to++] = coerced;
      }
    }
    if (to < from) {
      // trim the end of the array since we dropped some invalid values.
      values.length = to;
    }

    valueState = setFlagBit(valueState, ArrayStateFlags.IS_API_FORMATTED);
    valueState = clearTypeSpecificFormattedFlagBits(valueState);
    if (formatType) {
      valueState = setFlagBit(valueState, formatType);
    }
    valueState =
        clearFlagBit(valueState, ArrayStateFlags.MUTABLE_SUBSTRUCTURES);
  }

  if (valueState !== existingState) {
    existingState = setArrayState(values, valueState);
    if (hasFlagBit(valueState, ArrayStateFlags.IS_IMMUTABLE_ARRAY)) {
      Object.freeze(values);
    }
  }

  values = prepareRepeatedArrayForReturn(
      values, valueState, messageArray, messageArrayState, fieldNumber,
      hasMessageId, returnType, needFormat, doesntReturnArray);

  assertRepeated64BitIntegerFieldApiFormattingInvariants(values);
  if (!doesntReturnArray) {
    assertArrayReturnedSafely(values, messageArray);
  }

  return values;
}

/**
 * Determines frozenness of repeated field array as last step before returning.
 *
 * NOTE: After this function, valuesState and messageArrayState may be different
 *
 * @param {!Array<?>} values
 * @param {!ArrayState} valuesState
 * @param {!Array<?>} messageArray
 * @param {!ArrayState} messageArrayState
 * @param {number} fieldNumber
 * @param {!HasMessageId|undefined} hasMessageId
 * @param {!RepeatedArrayReturnType} returnType
 * @param {boolean} newlyFormatted
 * @param {boolean} doesntReturnArray
 * @return {!Array<?>} values (may be different from input)
 */
function prepareRepeatedArrayForReturn(
    values, valuesState, messageArray, messageArrayState, fieldNumber,
    hasMessageId, returnType, newlyFormatted, doesntReturnArray) {
  let existingState = valuesState;
  if (shouldReturnFrozen(returnType, valuesState, messageArrayState)) {
    if (!isFrozenByFlags(valuesState, values)) {
      const parentIsOwned = hasFlagBit(
          messageArrayState, ArrayStateFlags.MUTABLE_REFERENCES_ARE_OWNED);
      // set appropriate bit if freezing
      const onlyImmutableValues = !values.length ||
          // if newly formatted, we can trust all values
          (newlyFormatted &&
           !hasFlagBit(valuesState, ArrayStateFlags.MUTABLE_SUBSTRUCTURES)) ||
          // otherwise, standard conditions.
          (parentIsOwned &&
           canMarkImmutableInPlaceIfParentIsOwned(valuesState));
      valuesState = setFlagBit(
          valuesState,
          onlyImmutableValues ? ArrayStateFlags.IS_IMMUTABLE_ARRAY :
                                ArrayStateFlags.FROZEN_ARRAY);
      if (valuesState !== existingState) {
        // we're assuming users can't freeze arrays we give them, so this set
        // should not encounter a frozen array if we didn't freeze it
        existingState = setArrayState(values, valuesState);
      }
      Object.freeze(values);
    }
  } else {
    if (returnType === RepeatedArrayReturnType.UNFROZEN &&
        isFrozenByFlags(valuesState, values)) {
      values = slice(values);
      existingState = 0;
      valuesState =
          setFlagsForSlicedRepeatedArray(valuesState, messageArrayState);
      messageArrayState = assertExists(setFieldIgnoringImmutabilityInternal(
          messageArray, messageArrayState, fieldNumber, values, hasMessageId));
    }

    if (!isFrozenByFlags(valuesState, values)) {
      if (!doesntReturnArray) {
        valuesState = setFlagBit(valuesState, ArrayStateFlags.UNFROZEN_SHARED);
      }
      if (valuesState !== existingState) {
        existingState = setArrayState(values, valuesState);
      }
    }
  }

  if (!hasFlagBit(valuesState, ArrayStateFlags.IS_IMMUTABLE_ARRAY) &&
      !canMarkImmutableInPlaceIfParentIsOwned(valuesState)) {
    messageArrayState =
        leakedMutableSubstructures(messageArray, messageArrayState);
  }

  return values;
}

/**
 * @param {!Array<?>} messageArray
 * @param {number|undefined} messageArrayState
 * @param {number} fieldNumber
 * @param {!HasMessageId|undefined} hasMessageId
 * @return {!Array<?>}
 */
function getRawRepeatedFieldWithDefault(
    messageArray, messageArrayState, fieldNumber, hasMessageId) {
  const values = exports.getFieldNullableInternal(
      messageArray, messageArrayState, fieldNumber, hasMessageId);
  return Array.isArray(values) ? values : EMPTY_LIST_SENTINEL;
}

/**
 * @param {number} valueState
 * @param {number} parentState
 * @return {number}
 */
function setFlagsForRepeatedField(valueState, parentState) {
  if (hasFlagBit(parentState, ArrayStateFlags.IS_IMMUTABLE_ARRAY)) {
    valueState = setFlagBit(valueState, ArrayStateFlags.IS_IMMUTABLE_ARRAY);
  }
  valueState = setFlagBit(valueState, ArrayStateFlags.IS_REPEATED_FIELD);
  return valueState;
}

/**
 * Determines if a repeated field array is frozen by flags. We prefer to use
 * flags over Object.isFrozen for performance reasons.
 * @param {number} state
 * @param {!ReadonlyArray<?>} array
 * @return {boolean}
 */
function isFrozenByFlags(state, array) {
  // we maintain the invariant that repeated field arrays are frozen if it's
  // marked immutable and api formatted
  const isFrozen = (hasFlagBit(state, ArrayStateFlags.IS_IMMUTABLE_ARRAY) &&
                    hasFlagBit(state, ArrayStateFlags.IS_API_FORMATTED)) ||
      hasFlagBit(state, ArrayStateFlags.FROZEN_ARRAY);
  if (DETAILED_JSPB_ASSERTS && isFrozen) {
    assert(Object.isFrozen(array));
  }
  return isFrozen;
}

/**
 * @param {!RepeatedArrayReturnType} returnType
 * @param {!ArrayState} state
 * @param {!ArrayState} parentState
 * @return {boolean}
 */
function shouldReturnFrozen(returnType, state, parentState) {
  if (returnType === RepeatedArrayReturnType.FROZEN) {
    return true;
  }
  if (returnType !== RepeatedArrayReturnType.FROZEN_UNLESS_SHARED) {
    return false;
  }
  if (hasFlagBit(state, ArrayStateFlags.IS_IMMUTABLE_ARRAY)) {
    return true;
  }
  // If an array has already been returned as mutable before (i.e., from a
  // getter with DO_NOT_FREEZE), we don't freeze it later even if another
  // getter call doesn't have the opt-out.
  return !hasFlagBit(state, ArrayStateFlags.UNFROZEN_SHARED) &&
      // Historically, if the parent isn't owned, we treated the array as
      // implicitly already unfrozen shared, so we never froze it. However, we
      // should consider removing this and freezing arrays even if the parent
      // isn't owned.
      hasFlagBit(parentState, ArrayStateFlags.MUTABLE_REFERENCES_ARE_OWNED);
}

/**
 * @return {!ByteString|null|undefined}
 */
function coerceToNullishBytes(/** ? */ value) {
  return bytesAsByteString(
      value, /* invalidIsMissing=*/ true, /* allowNullishValues= */ true);
}



// NOTE: we handwrite this one instead of generating it because of the complex
// default value.
/**
 * Gets the value of a bytes field, with proto3 (non-nullable primitives)
 * semantics. Returns `defaultValue` as a ByteString if the field is not
 * otherwise set.
 * @return {!ByteString} The field's value.
 */
exports.getBytesFieldWithDefault = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** string= */ defaultValue,
    /** !HasMessageId= */ hasMessageId) {
  const value =
      exports.getBytesFieldNullable(message, fieldNumber, hasMessageId);
  if (value == null) {
    if (defaultValue === null) {
      return defaultValue;
    } else if (defaultValue === undefined) {
      return ByteString.empty();
    }
    return ByteString.fromBase64(defaultValue);
  } else {
    return value;
  }
};


/** @return{!Array} */
function shallowCopyMapEntryArray(/** !Array */ array) {
  array = slice(array);
  for (let i = 0; i < array.length; i++) {
    // TODO(lukes): we should handle non-array entries gracefully by dropping
    // them.
    const e = (array[i] = slice(array[i]));
    if (Array.isArray(e[1])) {
      e[1] = markArrayImmutable(e[1]);
    }
  }
  return markKnownMapArray(array);
}

/**
 * Gets the value of a map field, lazily creating the map container if
 * necessary.
 *
 * IMPORTANT: When this function returns, messageArray and messageArrayState
 * might have new values.
 *
 * @template K, V
 * @return {!JspbMap<K, V>}
 * @suppress {visibility} accesses private properties of Map
 */
function getReadonlyMapFieldInternal(
    /** !InternalMessage */ message,
    /** !Array<?> */ messageArray,
    /** number */ messageArrayState,
    /** boolean */ immutableMessage,
    /** number */ fieldNumber,
    /** ? */ valueCtor,
    /** ? */ keyToApi,
    /** ? */ valueToApi,
    /** !HasMessageId|undefined */ hasMessageId) {
  if (!immutableMessage && maybeCopyOnWrite(message)) {
    messageArray = getInternalArrayInline(message);
    messageArrayState = getMessageArrayStateInline(messageArray);
  }

  // Wrap the underlying elements array with a Map.
  let arrOrMap = exports.getFieldNullableInternal(
      messageArray, messageArrayState, fieldNumber, hasMessageId);
  let isMapArrayImmutable = false;
  if (arrOrMap == null) {
    if (immutableMessage) {
      return assertMapReturnedSafely(getImmutableEmptyMap(), messageArray);
    }

    // No need to add a RepeatedField tag,  Because maps are stored inline
    // there is no need to distinguish these arrays on their own.
    arrOrMap = logNewArray([]);
  } else if (arrOrMap.constructor === JspbMap) {
    // If this is an immutable map in a mutable message, unwrap so we can slice
    // below.
    const map = /** @type {!JspbMap<K,V>} */ (arrOrMap);
    const isImmutableMap = map.arrayState & ArrayStateFlags.IS_IMMUTABLE_ARRAY;
    if (isImmutableMap && !immutableMessage) {
      // This performs a shallow copy, so we don't need to set
      // `isMapArrayImmutable` to true. We also don't need to sort, since we are
      // about to construct a new map
      arrOrMap = map.toArrayInternalUnsorted();
    } else {
      return assertMapReturnedSafely(map, messageArray);
    }
  } else if (!Array.isArray(arrOrMap)) {
    // This implies some kind of schema mismatch.  Treat as empty
    arrOrMap = logNewArray([]);
  } else /* if (Array.isArray(arrOrMap)) */ {
    isMapArrayImmutable = isImmutableArray(arrOrMap);
  }

  // If we're immutable, ensure the map is marked as immutable.
  if (immutableMessage) {
    if (!arrOrMap.length) {
      // return a standard value instead of mutating the message to replace
      // an empty array
      return getImmutableEmptyMap();
    }
    if (!isMapArrayImmutable) {
      isMapArrayImmutable = true;
      markArrayImmutable(arrOrMap);
    }
  } else if (isMapArrayImmutable) {
    // If we are not immutable but the map array is, we should shallow copy but
    // preserve the immutability of any submessages.
    isMapArrayImmutable = false;
    markKnownMapArray(arrOrMap);
    arrOrMap = shallowCopyMapEntryArray(arrOrMap);
  }

  // If this map is mutable and the parent is owned, mark it owned. If the map
  // is immutable, don't bother.
  if (!isMapArrayImmutable &&
      (messageArrayState & ArrayStateFlags.MUTABLE_REFERENCES_ARE_OWNED)) {
    markMutableReferencesAreOwned(arrOrMap);
  }

  // Make a wrapper around our map array. We need to do this after marking it
  // to maintain array state invariants.
  const jspbMap = new JspbMap(
      /** @type {!Array<!Array<!Object>>} */ (arrOrMap), valueCtor, keyToApi,
      valueToApi);

  // Store the new map back into the array, even if the message is frozen
  messageArrayState = assertExists(setFieldIgnoringImmutabilityInternal(
      messageArray, messageArrayState, fieldNumber, jspbMap, hasMessageId));
  if (!isMapArrayImmutable) {
    messageArrayState =
        leakedMutableSubstructures(messageArray, messageArrayState);
  }
  return assertMapReturnedSafely(jspbMap, messageArray);
}


/**
 * Gets the value of a map field, lazily creating the map container if
 * necessary. Does not modify the mutability of values.
 *
 * This should only be called from generated code, because it requires knowledge
 * of serialization/parsing callbacks (which are required by the map at
 * construction time, and the map may be constructed here).
 *
 * The return type is non-nullish to match the API, though it may be actually
 * nullish if `noLazyCreate` is set.
 *
 * @template K, V
 * @return {!JspbMap<K, V>}
 */
function getReadonlyMapField(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** ? */ valueCtor,
    /** ? */ keyToApi,
    /** ? */ valueToApi,
    /** !HasMessageId|undefined */ hasMessageId) {
  const messageArray = getInternalArrayInline(message);
  const messageArrayState = getMessageArrayStateInline(messageArray);
  const immutableMessage = isImmutableMessage(message, messageArrayState);
  return getReadonlyMapFieldInternal(
      message, messageArray, messageArrayState, immutableMessage, fieldNumber,
      valueCtor, keyToApi, valueToApi, hasMessageId);
}

/**
 * Gets the value of a map field, lazily creating the map container if
 * necessary. Ensures that the mutability of values matches that of their
 * container.
 *
 * @template K, V
 * @return {!JspbMap<K, V>}
 * @suppress {visibility} accesses private properties of Map
 */
function getMapFieldInternal(
    /** !InternalMessage */ message,
    /** number */ fieldNumber,
    /** ? */ valueCtor,
    /** ? */ keyToApi,
    /** ? */ valueToApi,
    /** !HasMessageId|undefined */ hasMessageId) {
  let mapValue, immutableMessage;
  {
    const messageArray = getInternalArrayInline(message);
    assertValidHasMessageIdOrUndefined(messageArray, hasMessageId);
    const messageArrayState = getMessageArrayStateInline(messageArray);
    immutableMessage = isImmutableMessage(message, messageArrayState);
    mapValue = getReadonlyMapFieldInternal(
        message, messageArray, messageArrayState, immutableMessage, fieldNumber,
        valueCtor, keyToApi, valueToApi, hasMessageId);
  }

  // If the message is immutable, getReadonlyMapField will have already ensured
  // all values are immutable. If the message is mutable, some values may be
  // immutable. Here we indicate to the map that it should shallow-copy in that
  // case. This will also change the behavior of already accessed readonly maps.
  if (!immutableMessage && valueCtor) {
    mapValue.callToMutableOnAccess = true;
  }

  return mapValue;
}


/**
 * Adds an entry into a map without necessarily constructing it or type
 * checking it.
 *
 * Callers should consider that the entry is 'transferred' to this function, it
 * should not be reused.
 * @suppress {visibility} accesses private properties of Map
 */
exports.putIntoMapForBinary = function(
    /** !Array */ messageArray, /** number */ fieldNumber,
    /** !Array<?> */ entry) {
  // Slice our entry to prevent its being treated as a message during
  // serialization, since the CONSTRUCTED bit will be set during
  // deserialization.
  //
  // If we were to treat a map entry as a message, we might change its pivot
  // and sparse-encode, which would be an invalid encoding. See b/438519440
  // for when this happened with test randomization.
  entry = slice(entry);

  let messageArrayState =
      getPossiblyUnconstructedMessageArrayStateInline(messageArray);
  const hasMessageId = getHasMessageId(messageArrayState);
  checkNotImmutableState(messageArrayState);
  let mapValue = exports.getFieldNullableInternal(
      messageArray, messageArrayState, fieldNumber, hasMessageId);
  if (mapValue instanceof JspbMap) {
    const isImmutableMap =
        (mapValue.arrayState & ArrayStateFlags.IS_IMMUTABLE_ARRAY) != 0;
    if (isImmutableMap) {
      // Shallow copy the immutable map into a mutable array so we can mutate it
      mapValue = mapValue.toArrayInternalUnsorted();
      mapValue.push(entry);
      messageArrayState = setFieldIgnoringImmutabilityInternal(
          messageArray, messageArrayState, fieldNumber, mapValue, hasMessageId);
    } else {
      mapValue.setWireEntry(entry);
    }
    return;
  }

  if (!Array.isArray(mapValue)) {
    // Initialize a 'map' as an array with a single entry
    messageArrayState = setFieldIgnoringImmutabilityInternal(
        messageArray, messageArrayState, fieldNumber,
        markKnownMapArray([entry]), hasMessageId);
    return;
  }
  let arrayState = getArrayStateInline(mapValue);
  if (!(arrayState & ArrayStateFlags.KNOWN_MAP_ARRAY)) {
    setArrayState(mapValue, arrayState |= ArrayStateFlags.KNOWN_MAP_ARRAY);
  }
  if (arrayState & ArrayStateFlags.IS_IMMUTABLE_ARRAY) {
    mapValue = shallowCopyMapEntryArray(mapValue);
    messageArrayState = setFieldIgnoringImmutabilityInternal(
        messageArray, messageArrayState, fieldNumber, mapValue, hasMessageId);
  }
  // append the entry
  mapValue.push(entry);
};

/**
 * Gets the value of a map field, lazily creating the map container if
 * necessary. Ensures the mutability of values matches their container.
 *
 * This should only be called from generated code, because it requires knowledge
 * of serialization/parsing callbacks (which are required by the map at
 * construction time, and the map may be constructed here).
 *
 * The return type is non-nullish to match the API, though it may be actually
 * nullish if `noLazyCreate` is set.
 *
 * @template K, V
 * @return {!JspbMap<K, V>}
 */
exports.getMapField = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** ? */ valueCtor, /** ? */ keyToApi, /** ? */ valueToApi,
    /** !HasMessageId|undefined */ hasMessageId) {
  return getMapFieldInternal(
      message, fieldNumber, valueCtor, keyToApi, valueToApi, hasMessageId);
};

/**
 * Gets the value of a map field, lazily creating the map container if
 * necessary. Ensures the mutability of values matches their container.
 *
 * This should only be called from generated code, because it requires knowledge
 * of serialization/parsing callbacks (which are required by the map at
 * construction time, and the map may be constructed here).
 *
 * The return type is non-nullish to match the API, though it may be actually
 * nullish if `noLazyCreate` is set.
 *
 * @template K, V
 * @return {!JspbMap<K, V>}
 */
function getPrimitiveMapField(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !Function */ keyToApi, /** !Function */ valueToApi,
    /** !HasMessageId|undefined */ hasMessageId) {
  return getMapFieldInternal(
      message, fieldNumber, undefined, keyToApi, valueToApi, hasMessageId);
}

/**
 * Gets the value of a map field, lazily creating the map container if
 * necessary. Ensures the mutability of values matches their container.
 *
 * This should only be called from generated code, because it requires knowledge
 * of serialization/parsing callbacks (which are required by the map at
 * construction time, and the map may be constructed here).
 *
 * The return type is non-nullish to match the API, though it may be actually
 * nullish if `noLazyCreate` is set.
 *
 * @template K, V
 * @return {!JspbMap<K, V>}
 */
function getMessageValuedMapField(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !Function */ valueCtor, /** !Function */ keyToApi,
    /** !HasMessageId|undefined */ hasMessageId) {
  return getMapFieldInternal(
      message, fieldNumber, valueCtor, keyToApi, /* valueToApi=*/ undefined,
      hasMessageId);
}

/**
 * Clears a map field.
 * @return {T}
 * @template T
 */
exports.clearMapField = function(
    /** T */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  const self = /** @type {!InternalMessage} */ (message);
  ensureMutable(self);
  const messageArray = getInternalArrayInline(self);
  let messageArrayState = getMessageArrayStateInline(messageArray);
  const maybe = exports.getFieldNullableInternal(
      messageArray, messageArrayState, fieldNumber, hasMessageId);
  // If the map is immutable, then we have been shallow copied from an immutable
  // message but the map hasn't been accessed yet. So we might as well simply
  // clear the field since there is no point in maintaining an instance at all.
  if (maybe instanceof JspbMap && !isImmutableMap(maybe)) {
    maybe.clear();
  } else if (maybe != null) {
    messageArrayState = setFieldIgnoringImmutabilityInternal(
        messageArray, messageArrayState, fieldNumber, undefined, hasMessageId);
  }
  return self;
};

/** @this {JspbMap<?,?>} */ function mapSetter(value, key) {
  this.set(key, value);
}

/**
 * Access a repeated field that needs some amount of 'coercion' off the wire.
 * @param {!InternalMessage} message
 * @param {number} fieldNumber
 * @param {!ReadonlyArray<T>|null|undefined} values
 * @param {function(?,?=):T} checkFn may throw if a value cannot be converted.
 * @param {!HasMessageId|undefined} hasMessageId
 * @return {!InternalMessage}
 * @template T
 */
function setRepeatedPrimitiveField(
    message, fieldNumber, values, checkFn, hasMessageId) {
  ensureMutable(message);
  const messageArray = getInternalArrayInline(message);
  let messageArrayState = getMessageArrayStateInline(messageArray);
  if (values == null) {
    messageArrayState = setFieldIgnoringImmutabilityInternal(
        messageArray, messageArrayState, fieldNumber, undefined, hasMessageId);
    return message;
  }

  checkRepeatedFieldIsArray(values);
  let valueState = getRepeatedArrayState(values);
  let existingState = valueState;
  const frozenByUs = isFrozenByFlags(valueState, values);
  let isFrozen = frozenByUs || Object.isFrozen(values);

  // if not frozen by us, we don't trust any of the input array state
  if (!frozenByUs) {
    valueState = 0;
  }

  if (!isFrozen) {
    values = slice(values);
    existingState = 0;
    valueState = setFlagsForSlicedRepeatedArray(valueState, messageArrayState);
    isFrozen = false;
  }

  valueState = setFlagBit(
      valueState,
      ArrayStateFlags.IS_REPEATED_FIELD | ArrayStateFlags.IS_API_FORMATTED);

  const currentFormat =
      getTypeSpecificApiFormat(valueState) ?? getDefaultTypeSpecificApiFormat();
  valueState = setFlagBit(valueState, currentFormat);

  for (let i = 0; i < values.length; i++) {
    const value = values[i];
    const newValue = checkFn(value, currentFormat);
    if (!Object.is(value, newValue)) {
      if (isFrozen) {
        values = slice(values);
        existingState = 0;
        valueState =
            setFlagsForSlicedRepeatedArray(valueState, messageArrayState);
        isFrozen = false;
      }
      values[i] = newValue;
    }
  }

  if (valueState !== existingState) {
    if (isFrozen) {
      values = slice(values);
      valueState =
          setFlagsForSlicedRepeatedArray(valueState, messageArrayState);
    }
    setArrayState(values, valueState);
  }
  assertArrayInvariants(values);

  messageArrayState = setFieldIgnoringImmutabilityInternal(
      messageArray, messageArrayState, fieldNumber, values, hasMessageId);
  return message;
}

/**
 * Clears a field by making it undefined.
 * @return {T}
 * @template T
 */
exports.clearField = function(/** !T */ message, /** number */ fieldNumber,
                              /** !HasMessageId= */ hasMessageId) {
  return exports.setField(
      message, fieldNumber, /*value=*/ undefined, hasMessageId);
};

/**
 * Clears a oneof field by making it undefined.
 * @return {T}
 * @template T
 */
exports.clearOneofField = function(
    /** !T */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneofGroup,
    /** !HasMessageId= */ hasMessageId) {
  return exports.setOneofField(
      message, fieldNumber, oneofGroup, /*value=*/ undefined, hasMessageId);
};

/**
 * Clears all entries in a oneof field.
 * @return {T}
 * @template T
 */
exports.clearAllFieldsInOneof = function(
    /** !T */ message,
    /** !ReadonlyArray<number> */ oneofGroup,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  const messageArray = getInternalArrayInline(message);
  const messageArrayState = getMessageArrayStateInline(messageArray);
  setOneofCaseNumber(
      messageArray, messageArrayState, oneofGroup, /*fieldNumber=*/ 0,
      hasMessageId);
  return message;
};


/**
 * Sets the value of a non-extension primitive field, with proto3 (non-nullable
 * primitives) semantics of ignoring values that are equal to the type's
 * default.
 * @return {T} return msg
 * @template T
 */
function setFieldIgnoringDefault(
    /** T */ msg, /** number */ fieldNumber,
    /** string|number|boolean|!gbigint|!ByteString|null|undefined */ value,
    /** string|number|boolean|!gbigint|!ByteString */ defaultValue,
    /** !HasMessageId|undefined */ hasMessageId) {
  const self = /** @type{!InternalMessage} */ (msg);
  ensureMutable(self);
  const messageArray = getInternalArrayInline(self);
  let messageArrayState = getMessageArrayStateInline(messageArray);
  let isDefault;
  if (defaultValue === '0') {
    // '0' defaultValue is used for all int64 types. we allow value to be
    // number|string|gbigint here
    isDefault = Number(value) === 0;
  } else {
    isDefault = value === defaultValue;
  }
  messageArrayState = setFieldIgnoringImmutabilityInternal(
      messageArray, messageArrayState, fieldNumber,
      isDefault ? undefined : value, hasMessageId);
  return msg;
}

/**
 * Adds all values to a repeated, primitive field.
 * @return {T}
 * @template T
 */
function addAllToRepeatedFieldImpl(
    /** T */ message,
    /** number */ fieldNumber,
    /** function(?,?=):? */ checkFn,
    /** !Iterable<?> */ values,
    /** function(?):? */ coercionFn,
    /** !HasMessageId|undefined */ hasMessageId) {
  return spliceRepeatedPrimitiveField(
      message, fieldNumber, checkFn, values, /*index=*/ undefined, coercionFn,
      hasMessageId, /*deleteCount=*/ undefined,
      /*isSpreadable=*/ true, /* removeOnly = */ undefined);
}

/** @return {!Array<?>} */
function getRepeatedFieldInternalForBinary(
    /** !Array<?> */ messageArray, /** !ArrayState */ messageArrayState,
    /** number */ fieldNumber) {
  checkNotImmutableState(messageArrayState);
  const hasMessageId = getHasMessageId(messageArrayState);

  let values = getRawRepeatedFieldWithDefault(
      messageArray, messageArrayState, fieldNumber, hasMessageId);
  let existingState = getRepeatedArrayState(values);
  let valueState = setFlagsForRepeatedField(existingState, messageArrayState);

  // Slice any immutable or frozen array, or a shared array.
  if (hasFlagBit(valueState, ArrayStateFlags.IS_IMMUTABLE_ARRAY) ||
      isFrozenByFlags(valueState, values) ||
      hasFlagBit(valueState, ArrayStateFlags.UNFROZEN_SHARED)) {
    if (valueState !== existingState && !isFrozenByFlags(valueState, values)) {
      setArrayState(values, valueState);
    }
    values = slice(values);
    existingState = 0;
    valueState = setFlagsForSlicedRepeatedArray(valueState, messageArrayState);
    messageArrayState = assertExists(setFieldIgnoringImmutabilityInternal(
        messageArray, messageArrayState, fieldNumber, values, hasMessageId));
  }

  // Update state bits.
  valueState = clearFlagBit(
      valueState,
      // The binary implementation will push an unchecked value.
      ArrayStateFlags.IS_API_FORMATTED |
          // We may have mutable or immutable submessages.
          ArrayStateFlags.ONLY_MUTABLE_VALUES);

  // If anything changed, set it on the array.
  if (valueState !== existingState) {
    // Note that this is always the case if we sliced the array.
    existingState = setArrayState(values, valueState);
  }

  // Perform some basic safety assertions: our returned array should always
  // be marked as repeated and never immutable or api-formatted, since we will
  // `push` an unformatted value onto it.
  if (DETAILED_JSPB_ASSERTS) {
    assert(valueState & ArrayStateFlags.IS_REPEATED_FIELD);
    assert(!(valueState & ArrayStateFlags.IS_IMMUTABLE_ARRAY));
    assert(!(valueState & ArrayStateFlags.IS_API_FORMATTED));
  }
  return values;
}

/**
 * Adds a value to a repeated field for binary implementation.
 * @param {!Array<?>} messageArray,
 * @param {number} fieldNumber
 * @param {*} value
 */
exports.addToRepeatedFieldForBinary = function(
    messageArray, fieldNumber, value) {
  const messageArrayState =
      getPossiblyUnconstructedMessageArrayStateInline(messageArray);
  getRepeatedFieldInternalForBinary(
      messageArray, messageArrayState, fieldNumber)
      .push(value);
};

/**
 * Sets the a primitive repeated field's value at `index`.
 * @param {T} message
 * @param {number} fieldNumber
 * @param {function(?,?=):?} checkFn may throw if a value
 *     cannot be converted.
 * @param {number} index
 * @param {string|number|boolean|!gbigint|!ByteString|!Uint8Array} value
 * @param {function(?):?} coercionFn
 * @param {!HasMessageId|undefined} hasMessageId
 * @return {T}
 * @template T
 */
function setRepeatedIndexedFieldImpl(
    message, fieldNumber, checkFn, index, value, coercionFn, hasMessageId) {
  return spliceRepeatedPrimitiveField(
      message, fieldNumber, checkFn, value, index, coercionFn, hasMessageId,
      /*deleteCount=*/ 1);
}

/**
 * Sets the value of a field in a oneof union and clears all other fields in
 * the union.
 * @return {T}
 * @template T
 */
exports.setOneofField = function(
    /** T */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof,
    /**
       string|number|boolean|!gbigint|!ByteString|!Array|!InternalMessage|null|undefined
     */
    value, /** !HasMessageId|undefined */ hasMessageId) {
  const self = /** @type {!InternalMessage} */ (message);
  ensureMutable(self);
  const messageArray = getInternalArrayInline(self);
  let messageArrayState = getMessageArrayStateInline(messageArray);
  if (value == null) {
    const oneofsCaseMap = getOneofsCaseMap(messageArray);
    const oneofCase = computeOneofCaseInternal(
        oneofsCaseMap, messageArray, messageArrayState, oneof, hasMessageId);
    if (oneofCase === fieldNumber) {
      oneofsCaseMap.set(oneof, 0);
    } else {
      // some other case is set and we are clearing this one?  That is a no-op.
      return self;
    }
  } else {
    messageArrayState = setOneofCaseNumber(
        messageArray, messageArrayState, oneof, fieldNumber, hasMessageId);
  }
  messageArrayState = setFieldIgnoringImmutabilityInternal(
      messageArray, messageArrayState, fieldNumber, value, hasMessageId);
  return message;
};


/**
 * Sets the value of a field in a oneof union and clears all other fields in
 * the union.
 * @template T
 */
exports.setOneofFieldForBinary = function(
    /** !Array<?> */ messageArray, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof,
    /** string|number|boolean|!ByteString|!gbigint|!InternalMessage */ value) {
  assertExists(value);
  let messageArrayState =
      getPossiblyUnconstructedMessageArrayStateInline(messageArray);
  const hasMessageId = getHasMessageId(messageArrayState);
  messageArrayState = setOneofCaseNumber(
      messageArray, messageArrayState, oneof, fieldNumber, hasMessageId);
  messageArrayState = setFieldIgnoringImmutabilityInternal(
      messageArray, messageArrayState, fieldNumber, value, hasMessageId);
};

/**
 * Returns fieldNumber if the given oneof group in msg is indeed set to
 * fieldNumber. Otherwise returns NO_SUCH_FIELD.
 *
 * NOTE: this is exposed on, and accessed via, the exports object purely so it
 * can be monkey patched by debug.js.
 *
 * @param {!InternalMessage} message The message.
 * @param {!ReadonlyArray<number>} oneof The fields belonging to the oneof.
 * @param {number} fieldNumber The field number.
 * @param {!HasMessageId|undefined} hasMessageId
 * @return {number}
 */
exports.isOneofCase = function(message, oneof, fieldNumber, hasMessageId) {
  return exports.computeOneofCase(message, oneof, hasMessageId) ===
          fieldNumber ?
      fieldNumber :
      NO_SUCH_FIELD;
};


/**
 * Computes the selection in a oneof group for the given message, ensuring
 * only one field is set in the process.
 *
 * According to the protobuf language guide (
 * https://developers.google.com/protocol-buffers/docs/proto#oneof), "if the
 * parser encounters multiple members of the same oneof on the wire, only the
 * last member seen is used in the parsed message." Since JSPB serializes
 * messages to a JSON array, the "last member seen" will always be the field
 * with the greatest field number (directly corresponding to the greatest
 * array index).
 *
 * @return {number} The field number currently set in the union, or 0 if none.
 */
exports.computeOneofCase = function(
    /** !InternalMessage */ message, /** !ReadonlyArray<number> */ oneof,
    /** !HasMessageId= */ hasMessageId) {
  const messageArray = getInternalArrayInline(message);
  return computeOneofCaseInternal(
      getOneofsCaseMap(messageArray), messageArray,
      /* messageArrayState= */ undefined, oneof, hasMessageId);
};


/** @return {!Map<!ReadonlyArray<number>, number>} */
function getOneofsCaseMap(/** !Array */ internalArray) {
  const asObject = /** @type {!Object} */ (internalArray);
  if (HAS_NATIVE_SYMBOL) {
    return asObject[ONEOF_ARRAY_SYMBOL] ??= new Map();
  } else if (ONEOF_ARRAY_SYMBOL in internalArray) {
    return assertInstanceof(asObject[ONEOF_ARRAY_SYMBOL], Map);
  } else {
    const oneofsSet = new Map();
    Object.defineProperty(asObject, ONEOF_ARRAY_SYMBOL, {value: oneofsSet});
    return oneofsSet;
  }
}

/**
 * Updates the oneof case number to the given field number.
 *
 * This enforces the oneof constraint, so any array mutations should come after
 * calling this.
 *
 * @return {!ArrayState|undefined}
 */
function setOneofCaseNumber(
    /** !Array<?> */ messageArray,
    /** !ArrayState|undefined */ messageArrayState,
    /** !ReadonlyArray<number> */ oneof,
    /** number */ fieldNumber, /** !HasMessageId|undefined */ hasMessageId) {
  assert(fieldNumber === 0 || oneof.includes(fieldNumber));
  const oneofsCaseMap = getOneofsCaseMap(messageArray);
  const oneofCase = computeOneofCaseInternal(
      oneofsCaseMap, messageArray, messageArrayState, oneof, hasMessageId);
  if (oneofCase !== fieldNumber) {
    if (oneofCase) {
      messageArrayState = setFieldIgnoringImmutabilityInternal(
          messageArray, messageArrayState, oneofCase, undefined, hasMessageId);
    }
    oneofsCaseMap.set(oneof, fieldNumber);
  }
  return messageArrayState;
}


/**
 * Enforces the oneof constraint and returns the case number.
 * @return {number}
 */
function computeOneofCaseInternal(
    /** !Map<!ReadonlyArray<number>, number> */ oneofsCaseMap,
    /** !Array<?> */ messageArray,
    /** !ArrayState|undefined */ messageArrayState,
    /** !ReadonlyArray<number> */ oneof,
    /** !HasMessageId|undefined */ hasMessageId) {
  assertValidHasMessageIdOrUndefined(messageArray, hasMessageId);
  let caseNumber = oneofsCaseMap.get(oneof);
  if (caseNumber != null) {
    return caseNumber;
  }
  // Scan for the last field in the oneof that is set.  Clear out all other
  // fields.
  caseNumber = 0;
  for (let i = 0; i < oneof.length; i++) {
    const fieldNumber = oneof[i];
    if (exports.getFieldNullableInternal(
            messageArray, messageArrayState, fieldNumber, hasMessageId) !=
        null) {
      if (caseNumber !== 0) {
        // Multiple oneof fields are set, clear the previous and keep looking.
        messageArrayState = setFieldIgnoringImmutabilityInternal(
            messageArray, messageArrayState, caseNumber, undefined,
            hasMessageId);
      }
      caseNumber = fieldNumber;
    }
  }
  oneofsCaseMap.set(oneof, caseNumber);
  return caseNumber;
}


/**
 * Gets and wraps a proto field on access, if there is no field present, it
 * creates and inserts one.
 * @return {T} The field as a jspb proto.
 * @template T
 */
exports.getMutableOneofWrapperField = function(
    /** !InternalMessage */ message,
    /** function(new:T, ?Array<?>=) */ ctor, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof,
    /** !OrUndefinedToken<?>|undefined */ legacyOrUndefined,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  if (legacyOrUndefined === OR_UNDEFINED) {
    if (exports.isOneofCase(message, oneof, fieldNumber, hasMessageId) !==
        fieldNumber) {
      return undefined;
    }
  } else {
    const messageArray = getInternalArrayInline(message);
    setOneofCaseNumber(
        messageArray, /* messageArrayState= */ undefined, oneof, fieldNumber,
        hasMessageId);
  }
  return exports.getMutableWrapperField(
      message, ctor, fieldNumber, legacyOrUndefined, hasMessageId);
};


/**
 * Gets and wraps a mutable proto field on access, if there is no field present,
 * it creates and inserts one.
 *
 * @template T
 * @return {T} The field as a jspb proto.
 */
exports.getMutableWrapperField = function(
    /** !InternalMessage */ message,
    /** function(new:T, ?Array<?>=) */ ctor,
    /** number */ fieldNumber,
    /** !OrUndefinedToken<?>|undefined */ legacyOrUndefined,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  const messageArray = getInternalArrayInline(message);
  let messageArrayState = getMessageArrayStateInline(messageArray);
  const data = exports.getFieldNullableInternal(
      messageArray, messageArrayState, fieldNumber, hasMessageId);
  const wantOrUndefined = legacyOrUndefined === OR_UNDEFINED;
  let submessage = messageFromInlineStorage(
      data, ctor, /* constructMissing= */ !wantOrUndefined,
      /* arrayState = */ messageArrayState);
  if (wantOrUndefined && !submessage) {
    return undefined;
  }
  submessage = messageToMutable(submessage);
  // This will happen if the message was missing, we are constructing from an
  // Array or we needed to make a mutable copy. In such cases we need to store
  // back to ensure the wrapper and the value are in sync.
  if (data !== submessage) {
    messageArrayState = setFieldIgnoringImmutabilityInternal(
        messageArray, messageArrayState, fieldNumber, submessage, hasMessageId);
    messageArrayState =
        leakedMutableSubstructures(messageArray, messageArrayState);
  }
  return submessage;
};

/**
 * Gets and wraps a mutable proto field on access, if there is no field present,
 * it creates and inserts one.
 *
 * @return {!Array} The field as a jspb proto.
 */
exports.getMutableOneofWrapperArrayForBinary = function(
    /** !Array */ messageArray,
    /** !MessageMeta */ messageMeta,
    /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof) {
  let messageArrayState = getArrayStateInline(messageArray);
  setOneofCaseNumber(
      messageArray, messageArrayState, oneof, fieldNumber,
      getHasMessageId(messageArrayState));
  return exports.getMutableWrapperArrayForBinary(
      messageArray, messageMeta, fieldNumber);
};

/**
 * Gets and wraps a mutable proto field on access, if there is no field present,
 * it creates and inserts one.
 *
 * @return {!Array} The field as a jspb proto.
 */
exports.getMutableWrapperArrayForBinary = function(
    /** !Array */ messageArray,
    /** !MessageMeta */ messageMeta,
    /** number */ fieldNumber) {
  let messageArrayState =
      getPossiblyUnconstructedMessageArrayStateInline(messageArray);
  const hasMessageId = getHasMessageId(messageArrayState);
  const data = exports.getFieldNullableInternal(
      messageArray, messageArrayState, fieldNumber, hasMessageId);
  let /** !Array<?>|undefined */ submessageArray;
  if (isInternalMessage(data)) {
    const /** !InternalMessage */ asMessage = data;
    if (!isImmutableMessage(asMessage)) {
      maybeCopyOnWrite(asMessage);
      return getInternalArrayInline(asMessage);
    }
    // we know this is an immutable array and will clone it below.
    submessageArray = getInternalArrayInline(asMessage);
    assert(
        getArrayStateInline(submessageArray) &
        ArrayStateFlags.IS_IMMUTABLE_ARRAY);
  } else if (Array.isArray(data)) {
    submessageArray = data;
  }
  if (submessageArray) {
    const dataArrayState = getArrayStateInline(submessageArray);
    if (dataArrayState & ArrayStateFlags.IS_IMMUTABLE_ARRAY) {
      submessageArray =
          copyArrayWithImmutableFields(submessageArray, dataArrayState);
    }
  }
  submessageArray =
      constructMessageArrayFromMetaForBinary(submessageArray, messageMeta);
  // if we either copied or constructed back, store the new value.
  if (submessageArray !== data) {
    messageArrayState = setFieldIgnoringImmutabilityInternal(
        messageArray, messageArrayState, fieldNumber, submessageArray,
        hasMessageId);
  }
  return submessageArray;
};

/**
 * Gets and wraps a proto field on access, maintaining null/undefined and
 * mutability state.
 *
 * @return {T_RETURN} The field as a jspb proto.
 * @template T
 * Use go/closure-ttl to modify the return value to be nullable without
 * influencing generic type inference
 * @template T_RETURN := union(T, 'undefined') =:
 */
function getReadonlyWrapperFieldOrUndefinedInternal(
    /** !Array<?> */ messageArray,
    /** !ArrayState */ messageArrayState,
    /** function(new:T, ?Array<?>=) */ ctor,
    /** number */ fieldNumber,
    /** !HasMessageId|undefined */ hasMessageId) {
  let isNewlyConstructed = false;
  const submsg =
      /** @type {!InternalMessage} */ (exports.getFieldNullableInternal(
          messageArray, messageArrayState, fieldNumber, hasMessageId,
          (data) => {
            const result = messageFromInlineStorage(
                data, ctor,
                /* constructMissing= */ false,
                /* arrayState = */ messageArrayState);
            isNewlyConstructed = result !== data && result != null;
            return result;
          }));
  if (submsg == null) return undefined;
  if (isNewlyConstructed && !isImmutableMessage(submsg)) {
    leakedMutableSubstructures(messageArray, messageArrayState);
  }
  return assertMessageReturnedSafely(submsg, messageArray, isNewlyConstructed);
}

/**
 * Gets and wraps a proto field on access, returning a default immutable
 * instance if no value is present.
 *
 * @return {!M} The field as a jspb proto.
 * @template M
 */
exports.getReadonlyWrapperField = function(
    /** !InternalMessage */ message,
    /** function(new:M, ?Array<?>=) */ ctor,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  const messageArray = getInternalArrayInline(message);
  return getReadonlyWrapperFieldOrUndefinedInternal(
             messageArray, getMessageArrayStateInline(messageArray), ctor,
             fieldNumber, hasMessageId) ||
      getDefaultImmutableInstance(ctor);
};

/**
 * Gets and wraps a proto field on access, returning `undefined` if no value is
 * present.
 *
 * @return {!M|undefined} The field as a jspb proto.
 * @template M
 */
exports.getReadonlyWrapperFieldOrUndefined = function(
    /** !InternalMessage */ message,
    /** function(new:M, ?Array<?>=) */ ctor,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  const messageArray = getInternalArrayInline(message);
  return getReadonlyWrapperFieldOrUndefinedInternal(
      messageArray, getMessageArrayStateInline(messageArray), ctor, fieldNumber,
      hasMessageId);
};

/**
 * Gets and wraps a proto field on access, with the mutability of the parent
 * message. Returns the literal value if null or undefined.
 *
 * If the value in the message is immutable and its parent is mutable, this
 * method will coerce and copy back to the parent message.
 *
 * @return {T_RETURN} The field as a jspb proto.
 * @template T
 * Use go/closure-ttl to modify the return value to be nullable without
 * influencing generic type inference
 * @template T_RETURN := union(T, 'undefined') =:
 */
exports.getWrapperFieldOrUndefined = function(
    /** !InternalMessage */ message,
    /** function(new:T, ?Array<?>=) */ ctor,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  let messageArray = getInternalArrayInline(message);
  let messageArrayState = getMessageArrayStateInline(messageArray);
  let submessage = getReadonlyWrapperFieldOrUndefinedInternal(
      messageArray, messageArrayState, ctor, fieldNumber, hasMessageId);
  if (submessage == null) {
    return submessage;
  }

  // If we are mutable then we must return a mutable submessage.
  messageArrayState = getMessageArrayStateInline(messageArray);
  if (!isImmutableMessage(message, messageArrayState)) {
    const mutableSubmessage = messageToMutable(submessage);
    if (mutableSubmessage !== submessage) {
      if (maybeCopyOnWrite(message)) {
        messageArray = getInternalArrayInline(message);
        messageArrayState = getMessageArrayStateInline(messageArray);
      }
      submessage = mutableSubmessage;
      messageArrayState = setFieldIgnoringImmutabilityInternal(
          messageArray, messageArrayState, fieldNumber, submessage,
          hasMessageId);
      messageArrayState =
          leakedMutableSubstructures(messageArray, messageArrayState);
    }
  }
  return assertMessageReturnedSafely(
      submessage, messageArray, /* isNewlyConstructed = */ undefined);
};

/**
 * Gets and wraps a repeated proto field on access, maintaining the current
 * mutability of the values.
 *
 * @param {!InternalMessage} message
 * @param {function(new:T, ?Array<?>)} ctor Constructor for the
 *     field.
 * @param {number} fieldNumber The field number.
 * @param {!HasMessageId=} hasMessageId
 * @return {!Array<T>} The repeated field as an array of protos.
 * @template T
 */
exports.getReadonlyRepeatedWrapperField = function(
    message, ctor, fieldNumber, hasMessageId) {
  const messageArray = getInternalArrayInline(message);
  return getRepeatedWrapperFieldInternal(
      message, messageArray, getMessageArrayStateInline(messageArray), ctor,
      fieldNumber, RepeatedArrayReturnType.FROZEN, hasMessageId);
};

/**
 * Gets and wraps a repeated proto field on access.
 *
 * IMPORTANT: When this function returns, messageArray and messageArrayState
 * might have new values.
 *
 * @param {!InternalMessage} message parent message
 * @param {!Array<?>} messageArray
 * @param {number} messageArrayState array state of our parent.
 * @param {function(new:T, ?Array<?>)} ctor Constructor for the field.
 * @param {number} fieldNumber The field number.
 * @param {!RepeatedArrayReturnType} returnTypeForMutable Whether we should
 *     return a frozen or unfrozen array. Ignored if immutable parent.
 * @param {!HasMessageId|undefined} hasMessageId
 * @param {boolean=} doesntReturnArray
 * @param {boolean=} forceMutableValuesIfParentIsMutable Coerce values to
 *     mutable if that has not been done. Only has effect if the parent is
 *     mutable.
 * @return {!Array<T>} The repeated field as an array of protos.
 * @template T
 */
function getRepeatedWrapperFieldInternal(
    message, messageArray, messageArrayState, ctor, fieldNumber,
    returnTypeForMutable, hasMessageId, doesntReturnArray,
    forceMutableValuesIfParentIsMutable) {
  const immutableMessage = isImmutableMessage(message, messageArrayState);
  const returnType =
      immutableMessage ? RepeatedArrayReturnType.FROZEN : returnTypeForMutable;
  doesntReturnArray = !!doesntReturnArray ||
      returnType === RepeatedArrayReturnType.EITHER_FROZEN_OR_UNFROZEN;
  const forceMutableValues =
      forceMutableValuesIfParentIsMutable && !immutableMessage;

  if (returnType === RepeatedArrayReturnType.UNFROZEN || forceMutableValues) {
    if (maybeCopyOnWrite(message)) {
      messageArray = getInternalArrayInline(message);
      messageArrayState = getMessageArrayStateInline(messageArray);
    }
  }

  let data = getRawRepeatedFieldWithDefault(
      messageArray, messageArrayState, fieldNumber, hasMessageId);
  let existingState = getRepeatedArrayState(data);
  let valueState = setFlagsForRepeatedField(existingState, messageArrayState);

  const needFormat = !hasFlagBit(valueState, ArrayStateFlags.IS_API_FORMATTED);
  if (needFormat) {
    valueState =
        constructRepeatedSubmessages(data, ctor, valueState, messageArrayState);
  }

  if (valueState !== existingState) {
    existingState = setArrayState(data, valueState);
    if (hasFlagBit(valueState, ArrayStateFlags.IS_IMMUTABLE_ARRAY)) {
      Object.freeze(data);
    }
  }

  if (forceMutableValues) {
    // if returning frozen, an empty array has only mutable even if not marked
    const onlyMutableValues =
        hasFlagBit(valueState, ArrayStateFlags.ONLY_MUTABLE_VALUES) ||
        (!data.length &&
         shouldReturnFrozen(returnType, valueState, messageArrayState));
    if (!onlyMutableValues) {
      // we assume users can't freeze arrays we give them, so we only have to
      // slice if we froze this array
      if (isFrozenByFlags(valueState, data)) {
        data = slice(data);
        valueState =
            setFlagsForSlicedRepeatedArray(valueState, messageArrayState);
        messageArrayState = assertExists(setFieldIgnoringImmutabilityInternal(
            messageArray, messageArrayState, fieldNumber, data, hasMessageId));
      }
      valueState = coerceToMutable(data, valueState);
      existingState = setArrayState(data, valueState);
    }
  }

  data = prepareRepeatedArrayForReturn(
      data, valueState, messageArray, messageArrayState, fieldNumber,
      hasMessageId, returnType, needFormat, doesntReturnArray);

  // TODO: add some assert even when doesntReturnArray
  if (!doesntReturnArray) {
    assertMessageArrayReturnedSafely(
        data, messageArray, fieldNumber,
        /*isNewlyConstructed=*/ needFormat,
        /*skipFrozenCheck=*/ returnType === RepeatedArrayReturnType.UNFROZEN);
  }

  return data;
}

/**
 * Constructs each of the messages in a repeated message field. Returns the new
 * state bits of the repeated field array. Caller is responsible for setting the
 * new state bits on the array.
 * @param {!Array<?>} data Array of raw submessages to construct.
 * @param {function(new:InternalMessage, ?Array<?>)} ctor Constructor for the
 *     submessages.
 * @param {!ArrayState} dataState array state of data.
 * @param {!ArrayState} messageArrayState array state of our parent.
 * @return {!ArrayState} new array state for data.
 */
function constructRepeatedSubmessages(
    data, ctor, dataState, messageArrayState) {
  const isImmutableArray =
      hasFlagBit(dataState, ArrayStateFlags.IS_IMMUTABLE_ARRAY);
  // submessages inherit state bits from the parent message by default, but if
  // the repeated field array is marked immutable, the submessages have to be
  // immutable
  if (isImmutableArray) {
    messageArrayState =
        setFlagBit(messageArrayState, ArrayStateFlags.IS_IMMUTABLE_ARRAY);
  }
  let hasOnlyMutableValues = !isImmutableArray;
  let hasOnlyImmutableValues = true;
  let readFrom = 0;
  let writeTo = 0;
  for (; readFrom < data.length; readFrom++) {
    const datum = data[readFrom];
    // Construct a new message.
    const msg = messageFromInlineStorage(
        datum, ctor, /*constructMissing=*/ false,
        /*messageArrayState=*/ messageArrayState);
    if (!(msg instanceof ctor)) {
      // This means the value stored in this position is incorrect, and there
      // is no message for it.  We need to just keep going.
      continue;
    }
    if (!isImmutableArray) {
      const isImmutable = isImmutableMessage(msg);
      hasOnlyMutableValues &&= !isImmutable;
      hasOnlyImmutableValues &&= isImmutable;
    }
    data[writeTo++] = msg;
  }

  // Trim the end of the array if we had to remove invalid values.
  if (writeTo < readFrom) {
    data.length = writeTo;
  }

  dataState = setFlagBit(dataState, ArrayStateFlags.IS_API_FORMATTED);
  dataState = setFlagBitTo(
      dataState, ArrayStateFlags.MUTABLE_SUBSTRUCTURES,
      !hasOnlyImmutableValues);
  dataState = setFlagBitTo(
      dataState, ArrayStateFlags.ONLY_MUTABLE_VALUES, hasOnlyMutableValues);

  return dataState;
}

/**
 * Coerce all elements of data to be mutable.
 * @param {!Array<?>} data array of messages
 * @param {!ArrayState} state array state of data
 * @return {!ArrayState} new array state for data
 */
function coerceToMutable(data, state) {
  for (let i = 0; i < data.length; i++) {
    const msg = data[i];
    const asMutable = messageToMutable(msg);
    if (msg !== asMutable) {
      data[i] = asMutable;
    }
  }
  state = setFlagBit(state, ArrayStateFlags.ONLY_MUTABLE_VALUES);
  state =
      setFlagBitTo(state, ArrayStateFlags.MUTABLE_SUBSTRUCTURES, !!data.length);
  return state;
}

/**
 * Gets the value of a oneof wrapper field, maintaining its current mutability.
 *
 * @return {!T_NOT_NULL_OR_UNDEFINED}
 * @template T
 * @template T_NOT_NULL_OR_UNDEFINED :=
 *     cond(isUnknown(T), unknown(),
 *       mapunion(T, (X) =>
 *         cond(eq(X, 'null'), none(),
 *           cond(eq(X, 'undefined'), none(), X))))
 * =:
 */
exports.getReadonlyOneofWrapperField = function(
    /** !InternalMessage */ message, /** function(new:T, ?Array<?>=) */ ctor,
    /** number */ fieldNumber, /** !ReadonlyArray<number> */ oneof,
    /** !HasMessageId= */ hasMessageId) {
  return exports.getReadonlyWrapperField(
      message, ctor,
      exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      hasMessageId);
};

/**
 * Gets and wraps a repeated proto field on access, ensuring that each returned
 * value matches the mutability of its parent.
 *
 * If the parent message is mutable and we see an immutable value in the array,
 * we will shallow-copy to a mutable value and copy back to the source arrays.
 *
 * @param {!InternalMessage} message
 * @param {function(new:T, ?Array<?>)} ctor Constructor for the field.
 * @param {number} fieldNumber The field number.
 * @param {!RepeatedArrayReturnType} returnTypeForMutable The return type if
 *     message is mutable. Ignored if message is immutable.
 * @param {!HasMessageId=} hasMessageId
 * @return {!Array<T>} The repeated field as an array of protos.
 * @template T
 */
exports.getRepeatedWrapperField = function(
    message, ctor, fieldNumber, returnTypeForMutable, hasMessageId) {
  const messageArray = getInternalArrayInline(message);
  return getRepeatedWrapperFieldInternal(
      message, messageArray, getMessageArrayStateInline(messageArray), ctor,
      fieldNumber, returnTypeForMutable, hasMessageId,
      /*doesntReturnArray=*/ false,
      /*forceMutableValuesIfParentIsMutable=*/ true);
};

/**
 * @return {M}
 * @template M
 */
function checkWrapperForSetter(
    /** ?M|undefined */ value,
    /** function(new:M, ?Array<?>=)|undefined */ ctor) {
  if (value != null) {
    // ctor must exist if there is data
    checkMessageType(value, assertExists(ctor));
  } else {
    // Normalize null to undefined in storage
    value = undefined;
  }
  return value;
}

/**
 * @param {!InternalMessage} message
 * @param {?InternalMessage|undefined} value
 */
function leakedMutableIfValueIsMutable(message, value) {
  if (value && !isImmutableMessage(value)) {
    leakedMutableSubstructures(getInternalArrayInline(message));
  }
}

/**
 * Sets a proto field and syncs it to the backing array.
 * @return {T}
 * @template T,M
 */
exports.setWrapperField = function(
    /** T */ message,
    /** function(new:M, ?Array<?>=)|undefined */ ctor,
    /** number */ fieldNumber,
    /** ?M|undefined */ value, /** !HasMessageId= */ hasMessageId) {
  value = checkWrapperForSetter(value, ctor);
  exports.setField(message, fieldNumber, value, hasMessageId);
  leakedMutableIfValueIsMutable(message, value);
  return message;
};

/**
 * Sets a proto field in a oneof union and syncs it to the backing array.
 * @return {T}
 * @template T,M
 */
exports.setOneofWrapperField = function(
    /** T */ message,
    /** function(new:M, ?Array<?>=) */ ctor,
    /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof,
    /** ?M|undefined */ value, /** !HasMessageId= */ hasMessageId) {
  value = checkWrapperForSetter(value, ctor);
  exports.setOneofField(message, fieldNumber, oneof, value, hasMessageId);
  leakedMutableIfValueIsMutable(message, value);
  return message;
};

/**
 * Sets a repeated proto field and syncs it to the backing array.
 * @return {T}
 * @template T,M
 */
exports.setRepeatedWrapperField = function(
    /** T */ message,
    /** function(new:M, ?Array<?>=)|undefined*/ ctor,
    /** number */ fieldNumber,
    /** ?ReadonlyArray<?>|undefined */ msgs,
    /** !HasMessageId= */ hasMessageId) {
  const self = /** @type {!InternalMessage} */ (message);
  ensureMutable(self);
  const messageArray = getInternalArrayInline(self);
  let messageArrayState = getMessageArrayStateInline(messageArray);

  if (msgs == null) {
    messageArrayState = setFieldIgnoringImmutabilityInternal(
        messageArray, messageArrayState, fieldNumber, undefined, hasMessageId);
    return message;
  }

  checkRepeatedFieldIsArray(msgs);
  let valueState = getRepeatedArrayState(msgs);
  let existingState = valueState;
  const frozenByUs = isFrozenByFlags(valueState, msgs);
  const isFrozen = frozenByUs || Object.isFrozen(msgs);

  // go over array and check values are of the right message type. also compute
  // mutability info if array wasn't frozen by us
  let hasOnlyMutableValues = true;
  let hasOnlyImmutableValues = true;
  for (let i = 0; i < msgs.length; i++) {
    const item = msgs[i];
    checkMessageType(item, assertExists(ctor));
    if (!frozenByUs) {
      const isImmutable = isImmutableMessage(item);
      hasOnlyMutableValues &&= !isImmutable;
      hasOnlyImmutableValues &&= isImmutable;
    }
  }

  // we only update state bits if array wasn't already frozen by us
  if (!frozenByUs) {
    valueState =
        ArrayStateFlags.IS_REPEATED_FIELD | ArrayStateFlags.IS_API_FORMATTED;
    valueState = setFlagBitTo(
        valueState, ArrayStateFlags.ONLY_MUTABLE_VALUES, hasOnlyMutableValues);
    valueState = setFlagBitTo(
        valueState, ArrayStateFlags.MUTABLE_SUBSTRUCTURES,
        !hasOnlyImmutableValues);
  }
  if (!isFrozen || valueState !== existingState) {
    msgs = slice(msgs);
    existingState = 0;
    valueState = setFlagsForSlicedRepeatedArray(valueState, messageArrayState);
  }
  if (valueState !== existingState) {
    setArrayState(msgs, valueState);
  }
  assertArrayInvariants(msgs);

  messageArrayState = setFieldIgnoringImmutabilityInternal(
      messageArray, messageArrayState, fieldNumber, msgs, hasMessageId);
  if (!hasFlagBit(valueState, ArrayStateFlags.IS_IMMUTABLE_ARRAY) &&
      !canMarkImmutableInPlaceIfParentIsOwned(valueState)) {
    messageArrayState =
        leakedMutableSubstructures(messageArray, messageArrayState);
  }
  return message;
};

/**
 * Updates flags on the state of a newly sliced repeated array.
 *
 * @param {!ArrayState} state the current state
 * @param {!ArrayState} parentState state of the parent message
 * @return {!ArrayState} the new state
 */
function setFlagsForSlicedRepeatedArray(state, parentState) {
  const immutableParent =
      hasFlagBit(parentState, ArrayStateFlags.IS_IMMUTABLE_ARRAY);
  state =
      setFlagBitTo(state, ArrayStateFlags.IS_IMMUTABLE_ARRAY, immutableParent);
  state = clearFlagBit(
      state, ArrayStateFlags.FROZEN_ARRAY | ArrayStateFlags.UNFROZEN_SHARED);
  return state;
}

/**
 * Supports four use-cases:
 *   1) Appending new value or iterable of values
 *      * `index` === undefined
 *      * `deleteCount` === undefined
 *      * `isSpreadable` - indicates whether `value` is an iterable
 *   2) Inserting a new value
 *      * `index` - number defining the insertion point
 *      * `deleteCount` === undefined
 *   3) Replace an existing value
 *      * `index` - number defining the insertion point
 *      * `deleteCount` === 1
 *   3) Remove an existing value
 *      * `index` - number defining the removal point, defaulting to the end.
 *      * `removeOnly` === true
 *      * `deleteCount` === 1
 * @param {T} message
 * @param {number} fieldNumber
 * @param {function(?,?=):?} checkFn
 * @param {*} value a singular value or an iterable of values depending on
 *     parameter `isSpreadable`
 * @param {number|undefined} index
 * @param {function(?):?} coercionFn
 * @param {!HasMessageId|undefined} hasMessageId
 * @param {number=} deleteCount
 * @param {boolean=} isSpreadable whether `value` is an iterable
 * @param {boolean=} removeOnly
 * @return {T}
 * @template T
 */
function spliceRepeatedPrimitiveField(
    message, fieldNumber, checkFn, value, index, coercionFn, hasMessageId,
    deleteCount, isSpreadable, removeOnly) {
  const self = /** @type {!InternalMessage} */ (message);
  ensureMutable(self);
  const arr = getApiFormattedRepeatedField(
      self, fieldNumber, coercionFn, RepeatedArrayReturnType.UNFROZEN,
      /*doesntReturnArray=*/ true, /* formatType = */ undefined, hasMessageId);
  let arrState = getRepeatedArrayState(arr);
  const currentFormat =
      getTypeSpecificApiFormat(arrState) ?? getDefaultTypeSpecificApiFormat();

  if (isSpreadable) {
    if (Array.isArray(value)) {
      // in case value === arr, only read up to the original length
      const length = value.length;
      for (let i = 0; i < length; i++) {
        arr.push(checkFn(value[i], currentFormat));
      }
    } else {
      for (const v of /** @type {!Iterable<?>} */ (value)) {
        arr.push(checkFn(v, currentFormat));
      }
    }
  } else {
    if (deleteCount) {
      assert(deleteCount === 1);
    }
    if (deleteCount && removeOnly) {
      index ??= arr.length - 1;
      checkRepeatedIndexInRangeForGet(arr, index);
      arr.splice(index, deleteCount);
    } else {
      if (deleteCount) {
        checkRepeatedIndexInRangeForSet(arr, index);
      }
      if (index != undefined) {
        // NOTE: an explicit `undefined` for deleteCount acts like zero.
        arr.splice(index, deleteCount, checkFn(value, currentFormat));
      } else {
        arr.push(checkFn(value, currentFormat));
      }
    }
  }

  assertRepeated64BitIntegerFieldApiFormattingInvariants(arr);
  return message;
}

/**
 * Splices a submessage into a repeated proto field, optionally deleting at most
 * one, and returns the newly added submessage.
 *
 * Supports four use-cases:
 *   1) Appending new value
 *      * `index` === undefined
 *      * `deleteCount` === undefined
 *      * `value` can undefined to create a new value, or specify the existing
 *        wrapper value to append.
 *   2) Inserting a new value
 *      * `index` - number defining the insertion point
 *      * `deleteCount` === undefined
 *      * `value` can undefined to create a new value, or specify the existing
 *        wrapper append
 *   3) Replace an existing value
 *      * `index` - number defining the insertion point
 *      * `deleteCount` === 1
 *      * `value` must be specified as an existing wrapper of the field type
 *   4) Removing an existing value
 *      * `index` - number defining the insertion point, defaulting to the end.
 *      * `deleteCount` === 1
 *      * `removeOnly` === true
 * @param {!InternalMessage} message
 * @param {number} fieldNumber The field number.
 * @param {function(new:T_CHILD, ?Array=)} ctor The constructor of the
 *     message type.
 * @param {!HasMessageId|undefined} hasMessageId
 * @param {T_CHILD=} value Proto that will be added to the
 *     repeated field.
 * @param {number|undefined=} index Index at which to insert the value.
 * @param {number=} deleteCount Number of elements to delete when splicing,
 *     defaults to zero and merely inserts.
 * @param {boolean=} removeOnly
 * @return {T_CHILD|undefined} proto that was inserted to the repeated
 *     field, or undefined if removing only
 * @template MessageType
 * Use go/closure-ttl to declare a non-undefined version of T_CHILD. Replace
 * the undefined in blah|undefined with none. This is necessary because the
 * compiler will infer T_CHILD to be |undefined.
 * @template T_CHILD
 * =:
 */
function spliceRepeatedWrapperField(
    message, fieldNumber, ctor, hasMessageId, value, index, deleteCount,
    removeOnly) {
  ensureMutable(message);
  const messageArray = getInternalArrayInline(message);
  const msgs = getRepeatedWrapperFieldInternal(
      message, messageArray, getMessageArrayStateInline(messageArray), ctor,
      fieldNumber, RepeatedArrayReturnType.UNFROZEN, hasMessageId,
      /*doesntReturnArray=*/ true);

  // Replacing or appending one value is currently the only use-case for delete
  // count.
  if (deleteCount) {
    assert(deleteCount === 1);
  }
  if (deleteCount && removeOnly) {
    index ??= msgs.length - 1;
    checkRepeatedIndexInRangeForGet(msgs, index);
    msgs.splice(index, deleteCount);
    if (!msgs.length) {
      clearFlags(msgs, ArrayStateFlags.MUTABLE_SUBSTRUCTURES);
    }
    return undefined;
  } else {
    if (deleteCount) {
      checkRepeatedIndexInRangeForSet(msgs, index);
      // Check that setters pass the right type.
      checkMessageType(value, ctor);
    } else {
      value = value != null ? checkMessageType(value, ctor) : new ctor();
    }
    if (index != undefined) {
      // NOTE: an explicit `undefined` for deleteCount acts like zero.
      msgs.splice(index, deleteCount, value);
    } else {
      msgs.push(value);
    }

    let arrayState = getRepeatedArrayState(msgs);
    const oldState = arrayState;
    const immutableValue = isImmutableMessage(value);

    if (immutableValue) {
      // We no longer know that this wrapper field has only mutable values.
      arrayState =
          clearFlagBit(arrayState, ArrayStateFlags.ONLY_MUTABLE_VALUES);
      if (msgs.length === 1) {
        arrayState =
            clearFlagBit(arrayState, ArrayStateFlags.MUTABLE_SUBSTRUCTURES);
      }
    } else {
      arrayState =
          setFlagBit(arrayState, ArrayStateFlags.MUTABLE_SUBSTRUCTURES);
    }

    if (arrayState !== oldState) {
      setArrayState(msgs, arrayState);
    }
    if (!immutableValue) {
      leakedMutableSubstructures(messageArray);
    }

    return value;
  }
}

/**
 * Adds a submessage to a repeated proto field, and returns the newly added
 * submessage.
 * @param {!InternalMessage} message
 * @param {number} fieldNumber The field number.
 * @param {function(new:T_CHILD, ?Array=)} ctor The constructor of the
 *     message type.
 * @param {T_CHILD=} value Proto that will be added to the
 *     repeated field.
 * @param {number|undefined=} index Index at which to insert the value.
 * @param {!HasMessageId=} hasMessageId
 * @return {T_CHILD_NOT_UNDEFINED} proto that was inserted to the repeated
 *     field
 * @template MessageType
 * Use go/closure-ttl to declare a non-undefined version of T_CHILD. Replace
 * the undefined in blah|undefined with none. This is necessary because the
 * compiler will infer T_CHILD to be |undefined.
 * @template T_CHILD
 * @template T_CHILD_NOT_UNDEFINED :=
 *     cond(isUnknown(T_CHILD), unknown(),
 *       mapunion(T_CHILD, (X) =>
 *         cond(eq(X, 'undefined'), none(), X)))
 * =:
 */
exports.addAndReturnRepeatedWrapperField = function(
    message, fieldNumber, ctor, value, index, hasMessageId) {
  return spliceRepeatedWrapperField(
      message, fieldNumber, ctor, hasMessageId, value, index);
};

/**
 * Adds a submessage to a repeated proto field, and returns `this`.
 * @return {T}
 * @template T
 * @template T_CHILD
 */
exports.addToRepeatedWrapperField = function(
    /** T */ message,
    /** number */ fieldNumber, /** function(new:T_CHILD, ?Array=) */ ctor,
    /** T_CHILD */ value, /**number=*/ index,
    /** !HasMessageId= */ hasMessageId) {
  exports.addAndReturnRepeatedWrapperField(
      message, fieldNumber, ctor, value, index, hasMessageId);
  return message;
};

/**
 * Adds a submessage to a repeated proto field, and returns `this`.
 * @return {T}
 * @template T
 * @template T_CHILD
 */
exports.removeFromRepeatedWrapperField = function(
    /** T */ message,
    /** number */ fieldNumber, /** function(new:T_CHILD, ?Array=) */ ctor,
    /** number= */ index, /** !HasMessageId= */ hasMessageId) {
  spliceRepeatedWrapperField(
      message, fieldNumber, ctor, hasMessageId, /*value=*/ undefined, index,
      /*deleteCount=*/ 1, /*removeOnly=*/ true);
  return message;
};

/**
 * Adds a submessage to a repeated proto field, and returns `this`.
 * @return {T}
 * @template T
 * @template T_CHILD
 */
exports.addAllToRepeatedWrapperField = function(
    /** T */ message,
    /** number */ fieldNumber, /** function(new:T_CHILD, ?Array=) */ ctor,
    /** !Iterable<T_CHILD> */ values, /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  const messageArray = getInternalArrayInline(message);
  const msgs = getRepeatedWrapperFieldInternal(
      message, messageArray, getMessageArrayStateInline(messageArray), ctor,
      fieldNumber, RepeatedArrayReturnType.UNFROZEN, hasMessageId,
      /*doesntReturnArray=*/ true);
  let clearedOnlyMutable = 0;
  let clearedOnlyImmutable = 0;
  if (Array.isArray(values)) {
    // in case values === msgs, only read up to the original length
    const length = values.length;
    for (let i = 0; i < length; i++) {
      const insertedValue = checkMessageType(values[i], ctor);
      msgs.push(insertedValue);
      const valueIsImmutable = isImmutableMessage(insertedValue);
      if (valueIsImmutable && !(clearedOnlyMutable++)) {
        clearFlags(msgs, ArrayStateFlags.ONLY_MUTABLE_VALUES);
      }
      if (!valueIsImmutable && !(clearedOnlyImmutable++)) {
        addArrayStateFlags(msgs, ArrayStateFlags.MUTABLE_SUBSTRUCTURES);
      }
    }
  } else {
    for (const value of values) {
      const insertedValue = checkMessageType(value, ctor);
      msgs.push(insertedValue);
      const valueIsImmutable = isImmutableMessage(insertedValue);
      if (valueIsImmutable && !(clearedOnlyMutable++)) {
        clearFlags(msgs, ArrayStateFlags.ONLY_MUTABLE_VALUES);
      }
      if (!valueIsImmutable && !(clearedOnlyImmutable++)) {
        addArrayStateFlags(msgs, ArrayStateFlags.MUTABLE_SUBSTRUCTURES);
      }
    }
  }
  if (clearedOnlyImmutable) {
    leakedMutableSubstructures(messageArray);
  }
  return message;
};

/**
 * @return {number|null|undefined}
 */
exports.getInt64FieldNullable = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId,
    /** !LegacyNullableToken|undefined= */ legacyNullable) {
  if (getWriteBackGbigintValues()) {
    return coerceToNullishInt64(exports.getFieldNullable(
        message, fieldNumber, hasMessageId, legacyNullable,
        coerceToNullishInt64Gbigint));
  } else {
    const value = coerceToNullishInt64(exports.getFieldNullable(
        message, fieldNumber, hasMessageId, legacyNullable));
    asyncThrowIf64BitIntReturnTypeMismatches(
        message, value, /* expectStringValue = */ false);
    return value;
  }
};

/**
 * @return {string|null|undefined}
 */
exports.getInt64FieldNullable_asString = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId,
    /** !LegacyNullableToken|undefined= */ legacyNullable) {
  if (getWriteBackGbigintValues()) {
    return coerceToNullishInt64String(exports.getFieldNullable(
        message, fieldNumber, hasMessageId, legacyNullable,
        coerceToNullishInt64Gbigint));
  } else {
    return coerceToNullishInt64String(
        exports.getFieldNullable(
            message, fieldNumber, hasMessageId, legacyNullable),
        /* forceTypeChecking = */ true);
  }
};

/**
 * @return {string|null|undefined}
 */
exports.getInt64StringFieldNullable = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId,
    /** !LegacyNullableToken|undefined= */ legacyNullable) {
  const value = coerceToNullishInt64String(exports.getFieldNullable(
      message, fieldNumber, hasMessageId, legacyNullable));
  asyncThrowIf64BitIntReturnTypeMismatches(
      message, value, /* expectStringValue = */ true);
  return value;
};

/**
 * @return {!gbigint|null|undefined}
 */
exports.getInt64GbigintFieldNullable = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId,
    /** !LegacyNullableToken|undefined= */ legacyNullable) {
  if (getWriteBackGbigintValues()) {
    return exports.getFieldNullable(
        message, fieldNumber, hasMessageId, legacyNullable,
        coerceToNullishInt64Gbigint);
  } else {
    return coerceToNullishInt64Gbigint(exports.getFieldNullable(
        message, fieldNumber, hasMessageId, legacyNullable));
  }
};

/**
 * @return {number|null|undefined}
 */
exports.getUint64FieldNullable = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId,
    /** !LegacyNullableToken|undefined= */ legacyNullable) {
  if (getWriteBackGbigintValues()) {
    return coerceToNullishUint64(exports.getFieldNullable(
        message, fieldNumber, hasMessageId, legacyNullable,
        coerceToNullishUint64Gbigint));
  } else {
    const value = coerceToNullishUint64(exports.getFieldNullable(
        message, fieldNumber, hasMessageId, legacyNullable));
    asyncThrowIf64BitIntReturnTypeMismatches(
        message, value, /* expectStringValue = */ false);
    return value;
  }
};

/**
 * @return {string|null|undefined}
 */
exports.getUint64FieldNullable_asString = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId,
    /** !LegacyNullableToken|undefined= */ legacyNullable) {
  if (getWriteBackGbigintValues()) {
    return coerceToNullishUint64String(exports.getFieldNullable(
        message, fieldNumber, hasMessageId, legacyNullable,
        coerceToNullishUint64Gbigint));
  } else {
    return coerceToNullishUint64String(
        exports.getFieldNullable(
            message, fieldNumber, hasMessageId, legacyNullable),
        /* forceTypeChecking = */ true);
  }
};

/**
 * @return {string|null|undefined}
 */
exports.getUint64StringFieldNullable = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId,
    /** !LegacyNullableToken|undefined= */ legacyNullable) {
  const value = coerceToNullishUint64String(exports.getFieldNullable(
      message, fieldNumber, hasMessageId, legacyNullable));
  asyncThrowIf64BitIntReturnTypeMismatches(
      message, value, /* expectStringValue = */ true);
  return value;
};

/**
 * @return {!gbigint|null|undefined}
 */
exports.getUint64GbigintFieldNullable = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId,
    /** !LegacyNullableToken|undefined= */ legacyNullable) {
  if (getWriteBackGbigintValues()) {
    return exports.getFieldNullable(
        message, fieldNumber, hasMessageId, legacyNullable,
        coerceToNullishUint64Gbigint);
  } else {
    return coerceToNullishUint64Gbigint(exports.getFieldNullable(
        message, fieldNumber, hasMessageId, legacyNullable));
  }
};

/**
 * Gets the value of a repeated int64 field.
 * @param {!InternalMessage} message
 * @param {number} fieldNumber
 * @param {!RepeatedArrayReturnType} returnType
 * @param {!HasMessageId=} hasMessageId
 * @param {boolean=} doesntReturnArray
 * @return {!Array<number>}
 */
exports.getRepeatedInt64Field = function(
    message, fieldNumber, returnType, hasMessageId, doesntReturnArray) {
  const value = getApiFormattedRepeatedField(
      message, fieldNumber, coerceToNullishInt64, returnType, doesntReturnArray,
      TypeSpecificApiFormat.LEGACY, hasMessageId);
  if (!doesntReturnArray) {
    asyncThrowIfRepeated64BitIntReturnTypeMismatches(
        message, value,
        /* expectStringValue = */ false);
  }
  return value;
};

/**
 * Gets the value of a repeated int64 field.
 * @param {!InternalMessage} message
 * @param {number} fieldNumber
 * @param {!RepeatedArrayReturnType} returnType
 * @param {!HasMessageId=} hasMessageId
 * @param {boolean=} doesntReturnArray
 * @return {!Array<!gbigint>}
 */
exports.getRepeatedInt64GbigintField = function(
    message, fieldNumber, returnType, hasMessageId, doesntReturnArray) {
  return getApiFormattedRepeatedField(
      message, fieldNumber, coerceToNullishInt64Gbigint, returnType,
      doesntReturnArray, TypeSpecificApiFormat.GBIGINT, hasMessageId);
};

/**
 * @param {*} value
 * @return {string|null|undefined}
 */
function coerceToNullishInt64StringWithForcedTypeChecking(value) {
  return coerceToNullishInt64String(value, /* forceTypeChecking = */ true);
}

/**
 * Gets the value of a repeated int64 field.
 * @param {!InternalMessage} message
 * @param {number} fieldNumber
 * @param {!RepeatedArrayReturnType} returnType
 * @param {!HasMessageId=} hasMessageId
 * @param {boolean=} doesntReturnArray
 * @return {!ReadonlyArray<string>}
 */
exports.getRepeatedInt64Field_asString = function(
    message, fieldNumber, returnType, hasMessageId, doesntReturnArray) {
  return /** @type {!ReadonlyArray<string>} */ (getApiFormattedRepeatedField(
      message, fieldNumber, coerceToNullishInt64StringWithForcedTypeChecking,
      returnType, doesntReturnArray, TypeSpecificApiFormat.STRING,
      hasMessageId));
};

/**
 * Gets the value of a repeated int64 as string field.
 * @param {!InternalMessage} message
 * @param {number} fieldNumber
 * @param {!RepeatedArrayReturnType} returnType
 * @param {!HasMessageId=} hasMessageId
 * @param {boolean=} doesntReturnArray
 * @return {!Array<string>}
 */
exports.getRepeatedInt64StringField = function(
    message, fieldNumber, returnType, hasMessageId, doesntReturnArray) {
  const value = getApiFormattedRepeatedField(
      message, fieldNumber, coerceToNullishInt64String, returnType,
      doesntReturnArray, TypeSpecificApiFormat.LEGACY, hasMessageId);
  if (!doesntReturnArray) {
    asyncThrowIfRepeated64BitIntReturnTypeMismatches(
        message, value,
        /* expectStringValue = */ true);
  }

  return value;
};

/**
 * Gets the value of a repeated uint64 field.
 * @return {!Array<number>}
 */
exports.getRepeatedUint64Field = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !RepeatedArrayReturnType */ returnType,
    /** !HasMessageId= */ hasMessageId, /** boolean= */ doesntReturnArray) {
  const value = getApiFormattedRepeatedField(
      message, fieldNumber, coerceToNullishUint64, returnType,
      doesntReturnArray, TypeSpecificApiFormat.LEGACY, hasMessageId);
  if (!doesntReturnArray) {
    asyncThrowIfRepeated64BitIntReturnTypeMismatches(
        message, value,
        /* expectStringValue = */ false);
  }
  return value;
};

/**
 * @param {*} value
 * @return {string|null|undefined}
 */
function coerceToNullishUint64StringWithForcedTypeChecking(value) {
  return coerceToNullishUint64String(value, /* forceTypeChecking = */ true);
}

/**
 * Gets the value of a repeated uint64 field.
 * @return {!ReadonlyArray<string>}
 */
exports.getRepeatedUint64Field_asString = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !RepeatedArrayReturnType */ returnType,
    /** !HasMessageId= */ hasMessageId, /** boolean= */ doesntReturnArray) {
  return /** @type {!ReadonlyArray<string>} */ (getApiFormattedRepeatedField(
      message, fieldNumber, coerceToNullishUint64StringWithForcedTypeChecking,
      returnType, doesntReturnArray,
      /* formatType = */ TypeSpecificApiFormat.STRING, hasMessageId));
};

/**
 * Gets the value of a repeated uint64 field.
 * @return {!Array<!gbigint>}
 */
exports.getRepeatedUint64GbigintField = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !RepeatedArrayReturnType */ returnType,
    /** !HasMessageId= */ hasMessageId, /** boolean= */ doesntReturnArray) {
  return getApiFormattedRepeatedField(
      message, fieldNumber, coerceToNullishUint64Gbigint, returnType,
      doesntReturnArray, TypeSpecificApiFormat.GBIGINT, hasMessageId);
};

/**
 * Gets the value of a repeated uint64 as string field.
 * @return {!Array<string>}
 */
exports.getRepeatedUint64StringField = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !RepeatedArrayReturnType */ returnType,
    /** !HasMessageId= */ hasMessageId, /** boolean= */ doesntReturnArray) {
  const value = getApiFormattedRepeatedField(
      message, fieldNumber, coerceToNullishUint64String, returnType,
      doesntReturnArray, TypeSpecificApiFormat.LEGACY, hasMessageId);
  if (!doesntReturnArray) {
    asyncThrowIfRepeated64BitIntReturnTypeMismatches(
        message, value,
        /* expectStringValue = */ true);
  }
  return value;
};

const checkInt64String = checkInt64;
const checkUint64String = checkUint64;
const checkNullishInt64String = checkNullishInt64;
const checkNullishUint64String = checkNullishUint64;

// These aliases are OK in debug mode because the implementations are
// handwritten above.
exports.getRepeatedInt64StringField_asString =
    exports.getRepeatedInt64Field_asString;
exports.getRepeatedUint64StringField_asString =
    exports.getRepeatedUint64Field_asString;

//
// Generated code follows. To update, run:
// javascript/apps/jspb/update_adapters.sh
//
// BEGIN AUTO-GENERATED ////////////////////////////////////////////////////////

/**
 * @return {boolean|null|undefined}
 */
exports.getBooleanFieldNullable = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId,
    /** !LegacyNullableToken|undefined= */ legacyNullable) {
  return coerceToNullishBoolean(exports.getFieldNullable(
      message, fieldNumber, hasMessageId, legacyNullable));
};

/**
 * @return {number|null|undefined}
 */
exports.getInt32FieldNullable = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId,
    /** !LegacyNullableToken|undefined= */ legacyNullable) {
  return coerceToNullishInt32(exports.getFieldNullable(
      message, fieldNumber, hasMessageId, legacyNullable));
};

/**
 * @return {number|null|undefined}
 */
exports.getUint32FieldNullable = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId,
    /** !LegacyNullableToken|undefined= */ legacyNullable) {
  return coerceToNullishUint32(exports.getFieldNullable(
      message, fieldNumber, hasMessageId, legacyNullable));
};

/**
 * @return {string|null|undefined}
 */
exports.getStringFieldNullable = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId,
    /** !LegacyNullableToken|undefined= */ legacyNullable) {
  return coerceToNullishString(exports.getFieldNullable(
      message, fieldNumber, hasMessageId, legacyNullable));
};

/**
 * @return {number|null|undefined}
 */
exports.getEnumFieldNullable = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId,
    /** !LegacyNullableToken|undefined= */ legacyNullable) {
  return coerceToNullishEnum(exports.getFieldNullable(
      message, fieldNumber, hasMessageId, legacyNullable));
};

/**
 * Gets the value of a field or default when unset.
 * @return {boolean}
 */
exports.getBooleanFieldWithDefault = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** boolean= */ defaultValue = false, /** !HasMessageId= */ hasMessageId) {
  return exports.getBooleanFieldNullable(message, fieldNumber, hasMessageId) ??
      defaultValue;
};

/**
 * Gets the value of a field or default when unset.
 * @return {number}
 */
exports.getInt32FieldWithDefault = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** number= */ defaultValue = 0, /** !HasMessageId= */ hasMessageId) {
  return exports.getInt32FieldNullable(message, fieldNumber, hasMessageId) ??
      defaultValue;
};

/**
 * Gets the value of a field or default when unset.
 * @return {number}
 */
exports.getUint32FieldWithDefault = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** number= */ defaultValue = 0, /** !HasMessageId= */ hasMessageId) {
  return exports.getUint32FieldNullable(message, fieldNumber, hasMessageId) ??
      defaultValue;
};

/**
 * Gets the value of a field or default when unset.
 * @return {number}
 */
exports.getInt64FieldWithDefault = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** number= */ defaultValue = 0, /** !HasMessageId= */ hasMessageId) {
  return exports.getInt64FieldNullable(message, fieldNumber, hasMessageId) ??
      defaultValue;
};

/**
 * Gets the value of a field or default when unset.
 * @return {number}
 */
exports.getUint64FieldWithDefault = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** number= */ defaultValue = 0, /** !HasMessageId= */ hasMessageId) {
  return exports.getUint64FieldNullable(message, fieldNumber, hasMessageId) ??
      defaultValue;
};

/**
 * Gets the value of a field or default when unset.
 * @return {string}
 */
exports.getInt64StringFieldWithDefault = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** string= */ defaultValue = '0', /** !HasMessageId= */ hasMessageId) {
  return exports.getInt64StringFieldNullable(
             message, fieldNumber, hasMessageId) ??
      defaultValue;
};

/**
 * Gets the value of a field or default when unset.
 * @return {string}
 */
exports.getUint64StringFieldWithDefault = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** string= */ defaultValue = '0', /** !HasMessageId= */ hasMessageId) {
  return exports.getUint64StringFieldNullable(
             message, fieldNumber, hasMessageId) ??
      defaultValue;
};

/**
 * Gets the value of a field or default when unset.
 * @return {!gbigint}
 */
exports.getInt64GbigintFieldWithDefault = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !gbigint= */ defaultValue = GBIGINT_ZERO,
    /** !HasMessageId= */ hasMessageId) {
  return exports.getInt64GbigintFieldNullable(
             message, fieldNumber, hasMessageId) ??
      defaultValue;
};

/**
 * Gets the value of a field or default when unset.
 * @return {!gbigint}
 */
exports.getUint64GbigintFieldWithDefault = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !gbigint= */ defaultValue = GBIGINT_ZERO,
    /** !HasMessageId= */ hasMessageId) {
  return exports.getUint64GbigintFieldNullable(
             message, fieldNumber, hasMessageId) ??
      defaultValue;
};

/**
 * Gets the value of a field or default when unset.
 * @return {number}
 */
exports.getFloatingPointFieldWithDefault = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** number= */ defaultValue = 0, /** !HasMessageId= */ hasMessageId) {
  return exports.getFloatingPointFieldNullable(
             message, fieldNumber, hasMessageId) ??
      defaultValue;
};

/**
 * Gets the value of a field or default when unset.
 * @return {string}
 */
exports.getStringFieldWithDefault = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** string= */ defaultValue = '', /** !HasMessageId= */ hasMessageId) {
  return exports.getStringFieldNullable(message, fieldNumber, hasMessageId) ??
      defaultValue;
};

/**
 * Gets the value of a field or default when unset.
 * @return {number}
 */
exports.getEnumFieldWithDefault = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** number= */ defaultValue = 0, /** !HasMessageId= */ hasMessageId) {
  return exports.getEnumFieldNullable(message, fieldNumber, hasMessageId) ??
      defaultValue;
};

/**
 * Gets the value of a field or default when unset.
 * @return {string}
 */
exports.getInt64FieldWithDefault_asString = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** string= */ defaultValue = '0', /** !HasMessageId= */ hasMessageId) {
  return exports.getInt64FieldNullable_asString(
             message, fieldNumber, hasMessageId) ??
      defaultValue;
};

/**
 * Gets the value of a field or default when unset.
 * @return {string}
 */
exports.getUint64FieldWithDefault_asString = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** string= */ defaultValue = '0', /** !HasMessageId= */ hasMessageId) {
  return exports.getUint64FieldNullable_asString(
             message, fieldNumber, hasMessageId) ??
      defaultValue;
};

/**
 * Gets the value of a field or default when unset.
 * @return {string}
 */
exports.getInt64StringFieldWithDefault_asString = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** string= */ defaultValue = '0', /** !HasMessageId= */ hasMessageId) {
  return exports.getInt64FieldNullable_asString(
             message, fieldNumber, hasMessageId) ??
      defaultValue;
};

/**
 * Gets the value of a field or default when unset.
 * @return {string}
 */
exports.getUint64StringFieldWithDefault_asString = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** string= */ defaultValue = '0', /** !HasMessageId= */ hasMessageId) {
  return exports.getUint64FieldNullable_asString(
             message, fieldNumber, hasMessageId) ??
      defaultValue;
};

/**
 * @return {!Array<boolean>}
 */
exports.getRepeatedBooleanField = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !RepeatedArrayReturnType */ returnType,
    /** !HasMessageId= */ hasMessageId, /** boolean= */ doesntReturnArray) {
  return getApiFormattedRepeatedField(
      message, fieldNumber, coerceToNullishBoolean, returnType,
      doesntReturnArray, /* formatType= */ undefined, hasMessageId);
};

/**
 * Gets the a primitive repeated field's value at `index`.
 * @return {boolean}
 */
exports.getRepeatedIndexedBooleanField = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** number */ index, /** !HasMessageId= */ hasMessageId) {
  const data = exports.getRepeatedBooleanField(
      message, fieldNumber, RepeatedArrayReturnType.EITHER_FROZEN_OR_UNFROZEN,
      hasMessageId, /*doesntReturnArray=*/ true);
  checkRepeatedIndexInRangeForGet(data, index);
  return data[index];
};

/**
 * Gets the count of a primitive repeated field's values.
 * @return {number}
 */
exports.getRepeatedBooleanCount = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return exports
      .getRepeatedBooleanField(
          message, fieldNumber,
          RepeatedArrayReturnType.EITHER_FROZEN_OR_UNFROZEN, hasMessageId,
          /*doesntReturnArray=*/ true)
      .length;
};

/**
 * @return {!Array<number>}
 */
exports.getRepeatedInt32Field = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !RepeatedArrayReturnType */ returnType,
    /** !HasMessageId= */ hasMessageId, /** boolean= */ doesntReturnArray) {
  return getApiFormattedRepeatedField(
      message, fieldNumber, coerceToNullishInt32, returnType, doesntReturnArray,
      /* formatType= */ undefined, hasMessageId);
};

/**
 * Gets the a primitive repeated field's value at `index`.
 * @return {number}
 */
exports.getRepeatedIndexedInt32Field = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** number */ index, /** !HasMessageId= */ hasMessageId) {
  const data = exports.getRepeatedInt32Field(
      message, fieldNumber, RepeatedArrayReturnType.EITHER_FROZEN_OR_UNFROZEN,
      hasMessageId, /*doesntReturnArray=*/ true);
  checkRepeatedIndexInRangeForGet(data, index);
  return data[index];
};

/**
 * Gets the count of a primitive repeated field's values.
 * @return {number}
 */
exports.getRepeatedInt32Count = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return exports
      .getRepeatedInt32Field(
          message, fieldNumber,
          RepeatedArrayReturnType.EITHER_FROZEN_OR_UNFROZEN, hasMessageId,
          /*doesntReturnArray=*/ true)
      .length;
};

/**
 * @return {!Array<number>}
 */
exports.getRepeatedUint32Field = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !RepeatedArrayReturnType */ returnType,
    /** !HasMessageId= */ hasMessageId, /** boolean= */ doesntReturnArray) {
  return getApiFormattedRepeatedField(
      message, fieldNumber, coerceToNullishUint32, returnType,
      doesntReturnArray, /* formatType= */ undefined, hasMessageId);
};

/**
 * Gets the a primitive repeated field's value at `index`.
 * @return {number}
 */
exports.getRepeatedIndexedUint32Field = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** number */ index, /** !HasMessageId= */ hasMessageId) {
  const data = exports.getRepeatedUint32Field(
      message, fieldNumber, RepeatedArrayReturnType.EITHER_FROZEN_OR_UNFROZEN,
      hasMessageId, /*doesntReturnArray=*/ true);
  checkRepeatedIndexInRangeForGet(data, index);
  return data[index];
};

/**
 * Gets the count of a primitive repeated field's values.
 * @return {number}
 */
exports.getRepeatedUint32Count = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return exports
      .getRepeatedUint32Field(
          message, fieldNumber,
          RepeatedArrayReturnType.EITHER_FROZEN_OR_UNFROZEN, hasMessageId,
          /*doesntReturnArray=*/ true)
      .length;
};

/**
 * Gets the a primitive repeated field's value at `index`.
 * @return {number}
 */
exports.getRepeatedIndexedInt64Field = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** number */ index, /** !HasMessageId= */ hasMessageId) {
  const data = exports.getRepeatedInt64Field(
      message, fieldNumber, RepeatedArrayReturnType.EITHER_FROZEN_OR_UNFROZEN,
      hasMessageId, /*doesntReturnArray=*/ true);
  checkRepeatedIndexInRangeForGet(data, index);
  return data[index];
};

/**
 * Gets the count of a primitive repeated field's values.
 * @return {number}
 */
exports.getRepeatedInt64Count = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return exports
      .getRepeatedInt64Field(
          message, fieldNumber,
          RepeatedArrayReturnType.EITHER_FROZEN_OR_UNFROZEN, hasMessageId,
          /*doesntReturnArray=*/ true)
      .length;
};

/**
 * Gets the a primitive repeated field's value at `index`.
 * @return {number}
 */
exports.getRepeatedIndexedUint64Field = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** number */ index, /** !HasMessageId= */ hasMessageId) {
  const data = exports.getRepeatedUint64Field(
      message, fieldNumber, RepeatedArrayReturnType.EITHER_FROZEN_OR_UNFROZEN,
      hasMessageId, /*doesntReturnArray=*/ true);
  checkRepeatedIndexInRangeForGet(data, index);
  return data[index];
};

/**
 * Gets the count of a primitive repeated field's values.
 * @return {number}
 */
exports.getRepeatedUint64Count = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return exports
      .getRepeatedUint64Field(
          message, fieldNumber,
          RepeatedArrayReturnType.EITHER_FROZEN_OR_UNFROZEN, hasMessageId,
          /*doesntReturnArray=*/ true)
      .length;
};

/**
 * Gets the a primitive repeated field's value at `index`.
 * @return {string}
 */
exports.getRepeatedIndexedInt64StringField = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** number */ index, /** !HasMessageId= */ hasMessageId) {
  const data = exports.getRepeatedInt64StringField(
      message, fieldNumber, RepeatedArrayReturnType.EITHER_FROZEN_OR_UNFROZEN,
      hasMessageId, /*doesntReturnArray=*/ true);
  checkRepeatedIndexInRangeForGet(data, index);
  return data[index];
};

/**
 * Gets the count of a primitive repeated field's values.
 * @return {number}
 */
exports.getRepeatedInt64StringCount = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return exports
      .getRepeatedInt64StringField(
          message, fieldNumber,
          RepeatedArrayReturnType.EITHER_FROZEN_OR_UNFROZEN, hasMessageId,
          /*doesntReturnArray=*/ true)
      .length;
};

/**
 * Gets the a primitive repeated field's value at `index`.
 * @return {string}
 */
exports.getRepeatedIndexedUint64StringField = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** number */ index, /** !HasMessageId= */ hasMessageId) {
  const data = exports.getRepeatedUint64StringField(
      message, fieldNumber, RepeatedArrayReturnType.EITHER_FROZEN_OR_UNFROZEN,
      hasMessageId, /*doesntReturnArray=*/ true);
  checkRepeatedIndexInRangeForGet(data, index);
  return data[index];
};

/**
 * Gets the count of a primitive repeated field's values.
 * @return {number}
 */
exports.getRepeatedUint64StringCount = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return exports
      .getRepeatedUint64StringField(
          message, fieldNumber,
          RepeatedArrayReturnType.EITHER_FROZEN_OR_UNFROZEN, hasMessageId,
          /*doesntReturnArray=*/ true)
      .length;
};

/**
 * Gets the a primitive repeated field's value at `index`.
 * @return {!gbigint}
 */
exports.getRepeatedIndexedInt64GbigintField = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** number */ index, /** !HasMessageId= */ hasMessageId) {
  const data = exports.getRepeatedInt64GbigintField(
      message, fieldNumber, RepeatedArrayReturnType.EITHER_FROZEN_OR_UNFROZEN,
      hasMessageId, /*doesntReturnArray=*/ true);
  checkRepeatedIndexInRangeForGet(data, index);
  return data[index];
};

/**
 * Gets the a primitive repeated field's value at `index`.
 * @return {!gbigint}
 */
exports.getRepeatedIndexedUint64GbigintField = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** number */ index, /** !HasMessageId= */ hasMessageId) {
  const data = exports.getRepeatedUint64GbigintField(
      message, fieldNumber, RepeatedArrayReturnType.EITHER_FROZEN_OR_UNFROZEN,
      hasMessageId, /*doesntReturnArray=*/ true);
  checkRepeatedIndexInRangeForGet(data, index);
  return data[index];
};

/**
 * @return {!Array<number>}
 */
exports.getRepeatedFloatingPointField = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !RepeatedArrayReturnType */ returnType,
    /** !HasMessageId= */ hasMessageId, /** boolean= */ doesntReturnArray) {
  return getApiFormattedRepeatedField(
      message, fieldNumber, coerceToNullishFloatingPoint, returnType,
      doesntReturnArray, /* formatType= */ undefined, hasMessageId);
};

/**
 * Gets the a primitive repeated field's value at `index`.
 * @return {number}
 */
exports.getRepeatedIndexedFloatingPointField = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** number */ index, /** !HasMessageId= */ hasMessageId) {
  const data = exports.getRepeatedFloatingPointField(
      message, fieldNumber, RepeatedArrayReturnType.EITHER_FROZEN_OR_UNFROZEN,
      hasMessageId, /*doesntReturnArray=*/ true);
  checkRepeatedIndexInRangeForGet(data, index);
  return data[index];
};

/**
 * Gets the count of a primitive repeated field's values.
 * @return {number}
 */
exports.getRepeatedFloatingPointCount = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return exports
      .getRepeatedFloatingPointField(
          message, fieldNumber,
          RepeatedArrayReturnType.EITHER_FROZEN_OR_UNFROZEN, hasMessageId,
          /*doesntReturnArray=*/ true)
      .length;
};

/**
 * @return {!Array<string>}
 */
exports.getRepeatedStringField = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !RepeatedArrayReturnType */ returnType,
    /** !HasMessageId= */ hasMessageId, /** boolean= */ doesntReturnArray) {
  return getApiFormattedRepeatedField(
      message, fieldNumber, coerceToNullishString, returnType,
      doesntReturnArray, /* formatType= */ undefined, hasMessageId);
};

/**
 * Gets the a primitive repeated field's value at `index`.
 * @return {string}
 */
exports.getRepeatedIndexedStringField = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** number */ index, /** !HasMessageId= */ hasMessageId) {
  const data = exports.getRepeatedStringField(
      message, fieldNumber, RepeatedArrayReturnType.EITHER_FROZEN_OR_UNFROZEN,
      hasMessageId, /*doesntReturnArray=*/ true);
  checkRepeatedIndexInRangeForGet(data, index);
  return data[index];
};

/**
 * Gets the count of a primitive repeated field's values.
 * @return {number}
 */
exports.getRepeatedStringCount = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return exports
      .getRepeatedStringField(
          message, fieldNumber,
          RepeatedArrayReturnType.EITHER_FROZEN_OR_UNFROZEN, hasMessageId,
          /*doesntReturnArray=*/ true)
      .length;
};

/**
 * @return {!Array<!ByteString>}
 */
exports.getRepeatedBytesField = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !RepeatedArrayReturnType */ returnType,
    /** !HasMessageId= */ hasMessageId, /** boolean= */ doesntReturnArray) {
  return getApiFormattedRepeatedField(
      message, fieldNumber, coerceToNullishBytes, returnType, doesntReturnArray,
      /* formatType= */ undefined, hasMessageId);
};

/**
 * Gets the a primitive repeated field's value at `index`.
 * @return {!ByteString}
 */
exports.getRepeatedIndexedBytesField = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** number */ index, /** !HasMessageId= */ hasMessageId) {
  const data = exports.getRepeatedBytesField(
      message, fieldNumber, RepeatedArrayReturnType.EITHER_FROZEN_OR_UNFROZEN,
      hasMessageId, /*doesntReturnArray=*/ true);
  checkRepeatedIndexInRangeForGet(data, index);
  return data[index];
};

/**
 * Gets the count of a primitive repeated field's values.
 * @return {number}
 */
exports.getRepeatedBytesCount = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return exports
      .getRepeatedBytesField(
          message, fieldNumber,
          RepeatedArrayReturnType.EITHER_FROZEN_OR_UNFROZEN, hasMessageId,
          /*doesntReturnArray=*/ true)
      .length;
};

/**
 * @return {!Array<number>}
 */
exports.getRepeatedEnumField = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !RepeatedArrayReturnType */ returnType,
    /** !HasMessageId= */ hasMessageId, /** boolean= */ doesntReturnArray) {
  return getApiFormattedRepeatedField(
      message, fieldNumber, coerceToNullishEnum, returnType, doesntReturnArray,
      /* formatType= */ undefined, hasMessageId);
};

/**
 * Gets the a primitive repeated field's value at `index`.
 * @return {number}
 */
exports.getRepeatedIndexedEnumField = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** number */ index, /** !HasMessageId= */ hasMessageId) {
  const data = exports.getRepeatedEnumField(
      message, fieldNumber, RepeatedArrayReturnType.EITHER_FROZEN_OR_UNFROZEN,
      hasMessageId, /*doesntReturnArray=*/ true);
  checkRepeatedIndexInRangeForGet(data, index);
  return data[index];
};

/**
 * Gets the count of a primitive repeated field's values.
 * @return {number}
 */
exports.getRepeatedEnumCount = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return exports
      .getRepeatedEnumField(
          message, fieldNumber,
          RepeatedArrayReturnType.EITHER_FROZEN_OR_UNFROZEN, hasMessageId,
          /*doesntReturnArray=*/ true)
      .length;
};

/**
 * Gets the a primitive repeated field's value at `index`.
 * @return {string}
 */
exports.getRepeatedIndexedInt64Field_asString = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** number */ index, /** !HasMessageId= */ hasMessageId) {
  const data = exports.getRepeatedInt64Field_asString(
      message, fieldNumber, RepeatedArrayReturnType.EITHER_FROZEN_OR_UNFROZEN,
      hasMessageId, /*doesntReturnArray=*/ true);
  checkRepeatedIndexInRangeForGet(data, index);
  return data[index];
};

/**
 * Gets the a primitive repeated field's value at `index`.
 * @return {string}
 */
exports.getRepeatedIndexedUint64Field_asString = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** number */ index, /** !HasMessageId= */ hasMessageId) {
  const data = exports.getRepeatedUint64Field_asString(
      message, fieldNumber, RepeatedArrayReturnType.EITHER_FROZEN_OR_UNFROZEN,
      hasMessageId, /*doesntReturnArray=*/ true);
  checkRepeatedIndexInRangeForGet(data, index);
  return data[index];
};

/**
 * Gets the a primitive repeated field's value at `index`.
 * @return {string}
 */
exports.getRepeatedIndexedInt64StringField_asString = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** number */ index, /** !HasMessageId= */ hasMessageId) {
  const data = exports.getRepeatedInt64Field_asString(
      message, fieldNumber, RepeatedArrayReturnType.EITHER_FROZEN_OR_UNFROZEN,
      hasMessageId, /*doesntReturnArray=*/ true);
  checkRepeatedIndexInRangeForGet(data, index);
  return data[index];
};

/**
 * Gets the a primitive repeated field's value at `index`.
 * @return {string}
 */
exports.getRepeatedIndexedUint64StringField_asString = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** number */ index, /** !HasMessageId= */ hasMessageId) {
  const data = exports.getRepeatedUint64Field_asString(
      message, fieldNumber, RepeatedArrayReturnType.EITHER_FROZEN_OR_UNFROZEN,
      hasMessageId, /*doesntReturnArray=*/ true);
  checkRepeatedIndexInRangeForGet(data, index);
  return data[index];
};

/**
 * Gets the value of a oneof field.
 * @return {boolean}
 */
exports.getOneofBooleanFieldWithDefault = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** boolean= */ defaultValue,
    /** !HasMessageId= */ hasMessageId) {
  return exports.getBooleanFieldWithDefault(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      defaultValue, hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {number}
 */
exports.getOneofInt32FieldWithDefault = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** number= */ defaultValue,
    /** !HasMessageId= */ hasMessageId) {
  return exports.getInt32FieldWithDefault(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      defaultValue, hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {number}
 */
exports.getOneofUint32FieldWithDefault = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** number= */ defaultValue,
    /** !HasMessageId= */ hasMessageId) {
  return exports.getUint32FieldWithDefault(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      defaultValue, hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {number}
 */
exports.getOneofInt64FieldWithDefault = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** number= */ defaultValue,
    /** !HasMessageId= */ hasMessageId) {
  return exports.getInt64FieldWithDefault(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      defaultValue, hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {string}
 */
exports.getOneofInt64FieldWithDefault_asString = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** string= */ defaultValue,
    /** !HasMessageId= */ hasMessageId) {
  return exports.getInt64FieldWithDefault_asString(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      defaultValue, hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {number}
 */
exports.getOneofUint64FieldWithDefault = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** number= */ defaultValue,
    /** !HasMessageId= */ hasMessageId) {
  return exports.getUint64FieldWithDefault(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      defaultValue, hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {string}
 */
exports.getOneofUint64FieldWithDefault_asString = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** string= */ defaultValue,
    /** !HasMessageId= */ hasMessageId) {
  return exports.getUint64FieldWithDefault_asString(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      defaultValue, hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {string}
 */
exports.getOneofInt64StringFieldWithDefault = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** string= */ defaultValue,
    /** !HasMessageId= */ hasMessageId) {
  return exports.getInt64StringFieldWithDefault(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      defaultValue, hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {string}
 */
exports.getOneofInt64StringFieldWithDefault_asString = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** string= */ defaultValue,
    /** !HasMessageId= */ hasMessageId) {
  return exports.getInt64FieldWithDefault_asString(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      defaultValue, hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {string}
 */
exports.getOneofUint64StringFieldWithDefault = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** string= */ defaultValue,
    /** !HasMessageId= */ hasMessageId) {
  return exports.getUint64StringFieldWithDefault(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      defaultValue, hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {string}
 */
exports.getOneofUint64StringFieldWithDefault_asString = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** string= */ defaultValue,
    /** !HasMessageId= */ hasMessageId) {
  return exports.getUint64FieldWithDefault_asString(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      defaultValue, hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {!gbigint}
 */
exports.getOneofInt64GbigintFieldWithDefault = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** !gbigint= */ defaultValue,
    /** !HasMessageId= */ hasMessageId) {
  return exports.getInt64GbigintFieldWithDefault(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      defaultValue, hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {!gbigint}
 */
exports.getOneofUint64GbigintFieldWithDefault = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** !gbigint= */ defaultValue,
    /** !HasMessageId= */ hasMessageId) {
  return exports.getUint64GbigintFieldWithDefault(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      defaultValue, hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {number}
 */
exports.getOneofFloatingPointFieldWithDefault = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** number= */ defaultValue,
    /** !HasMessageId= */ hasMessageId) {
  return exports.getFloatingPointFieldWithDefault(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      defaultValue, hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {string}
 */
exports.getOneofStringFieldWithDefault = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** string= */ defaultValue,
    /** !HasMessageId= */ hasMessageId) {
  return exports.getStringFieldWithDefault(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      defaultValue, hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {!ByteString}
 */
exports.getOneofBytesFieldWithDefault = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** string= */ defaultValue,
    /** !HasMessageId= */ hasMessageId) {
  return exports.getBytesFieldWithDefault(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      defaultValue, hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {number}
 */
exports.getOneofEnumFieldWithDefault = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** number= */ defaultValue,
    /** !HasMessageId= */ hasMessageId) {
  return exports.getEnumFieldWithDefault(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      defaultValue, hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {boolean}
 */
exports.getOneofBooleanFieldLegacyNullable = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** !HasMessageId= */ hasMessageId) {
  return exports.getBooleanFieldLegacyNullable(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {number}
 */
exports.getOneofInt32FieldLegacyNullable = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** !HasMessageId= */ hasMessageId) {
  return exports.getInt32FieldLegacyNullable(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {number}
 */
exports.getOneofUint32FieldLegacyNullable = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** !HasMessageId= */ hasMessageId) {
  return exports.getUint32FieldLegacyNullable(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {number}
 */
exports.getOneofInt64FieldLegacyNullable = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** !HasMessageId= */ hasMessageId) {
  return exports.getInt64FieldLegacyNullable(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {string}
 */
exports.getOneofInt64FieldLegacyNullable_asString = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** !HasMessageId= */ hasMessageId) {
  return exports.getInt64FieldLegacyNullable_asString(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {number}
 */
exports.getOneofUint64FieldLegacyNullable = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** !HasMessageId= */ hasMessageId) {
  return exports.getUint64FieldLegacyNullable(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {string}
 */
exports.getOneofUint64FieldLegacyNullable_asString = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** !HasMessageId= */ hasMessageId) {
  return exports.getUint64FieldLegacyNullable_asString(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {string}
 */
exports.getOneofInt64StringFieldLegacyNullable = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** !HasMessageId= */ hasMessageId) {
  return exports.getInt64StringFieldLegacyNullable(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {string}
 */
exports.getOneofInt64StringFieldLegacyNullable_asString = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** !HasMessageId= */ hasMessageId) {
  return exports.getInt64FieldLegacyNullable_asString(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {string}
 */
exports.getOneofUint64StringFieldLegacyNullable = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** !HasMessageId= */ hasMessageId) {
  return exports.getUint64StringFieldLegacyNullable(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {string}
 */
exports.getOneofUint64StringFieldLegacyNullable_asString = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** !HasMessageId= */ hasMessageId) {
  return exports.getUint64FieldLegacyNullable_asString(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {!gbigint}
 */
exports.getOneofInt64GbigintFieldLegacyNullable = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** !HasMessageId= */ hasMessageId) {
  return exports.getInt64GbigintFieldLegacyNullable(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {!gbigint}
 */
exports.getOneofUint64GbigintFieldLegacyNullable = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** !HasMessageId= */ hasMessageId) {
  return exports.getUint64GbigintFieldLegacyNullable(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {number}
 */
exports.getOneofFloatingPointFieldLegacyNullable = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** !HasMessageId= */ hasMessageId) {
  return exports.getFloatingPointFieldLegacyNullable(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {string}
 */
exports.getOneofStringFieldLegacyNullable = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** !HasMessageId= */ hasMessageId) {
  return exports.getStringFieldLegacyNullable(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {!ByteString}
 */
exports.getOneofBytesFieldLegacyNullable = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** !HasMessageId= */ hasMessageId) {
  return exports.getBytesFieldLegacyNullable(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {T|undefined}
 * @template T
 */
exports.getOneofWrapperFieldOrUndefined = function(
    /** !InternalMessage */ message, /** function(new:T, ?Array<?>=) */ ctor,
    /** number */ fieldNumber, /** !ReadonlyArray<number> */ oneof,
    /** !HasMessageId= */ hasMessageId) {
  return exports.getWrapperFieldOrUndefined(
      message, ctor,
      exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {number}
 */
exports.getOneofEnumFieldLegacyNullable = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** !HasMessageId= */ hasMessageId) {
  return exports.getEnumFieldLegacyNullable(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {boolean|undefined}
 */
exports.getOneofBooleanFieldOrUndefined = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** !HasMessageId= */ hasMessageId) {
  return exports.getBooleanFieldOrUndefined(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {number|undefined}
 */
exports.getOneofInt32FieldOrUndefined = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** !HasMessageId= */ hasMessageId) {
  return exports.getInt32FieldOrUndefined(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {number|undefined}
 */
exports.getOneofUint32FieldOrUndefined = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** !HasMessageId= */ hasMessageId) {
  return exports.getUint32FieldOrUndefined(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {number|undefined}
 */
exports.getOneofInt64FieldOrUndefined = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** !HasMessageId= */ hasMessageId) {
  return exports.getInt64FieldOrUndefined(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {string|undefined}
 */
exports.getOneofInt64FieldOrUndefined_asString = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** !HasMessageId= */ hasMessageId) {
  return exports.getInt64FieldOrUndefined_asString(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {number|undefined}
 */
exports.getOneofUint64FieldOrUndefined = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** !HasMessageId= */ hasMessageId) {
  return exports.getUint64FieldOrUndefined(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {string|undefined}
 */
exports.getOneofUint64FieldOrUndefined_asString = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** !HasMessageId= */ hasMessageId) {
  return exports.getUint64FieldOrUndefined_asString(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {string|undefined}
 */
exports.getOneofInt64StringFieldOrUndefined = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** !HasMessageId= */ hasMessageId) {
  return exports.getInt64StringFieldOrUndefined(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {string|undefined}
 */
exports.getOneofInt64StringFieldOrUndefined_asString = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** !HasMessageId= */ hasMessageId) {
  return exports.getInt64FieldOrUndefined_asString(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {string|undefined}
 */
exports.getOneofUint64StringFieldOrUndefined = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** !HasMessageId= */ hasMessageId) {
  return exports.getUint64StringFieldOrUndefined(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {string|undefined}
 */
exports.getOneofUint64StringFieldOrUndefined_asString = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** !HasMessageId= */ hasMessageId) {
  return exports.getUint64FieldOrUndefined_asString(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {!gbigint|undefined}
 */
exports.getOneofInt64GbigintFieldOrUndefined = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** !HasMessageId= */ hasMessageId) {
  return exports.getInt64GbigintFieldOrUndefined(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {!gbigint|undefined}
 */
exports.getOneofUint64GbigintFieldOrUndefined = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** !HasMessageId= */ hasMessageId) {
  return exports.getUint64GbigintFieldOrUndefined(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {number|undefined}
 */
exports.getOneofFloatingPointFieldOrUndefined = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** !HasMessageId= */ hasMessageId) {
  return exports.getFloatingPointFieldOrUndefined(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {string|undefined}
 */
exports.getOneofStringFieldOrUndefined = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** !HasMessageId= */ hasMessageId) {
  return exports.getStringFieldOrUndefined(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {!ByteString|undefined}
 */
exports.getOneofBytesFieldOrUndefined = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** !HasMessageId= */ hasMessageId) {
  return exports.getBytesFieldOrUndefined(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {T|undefined}
 * @template T
 */
exports.getReadonlyOneofWrapperFieldOrUndefined = function(
    /** !InternalMessage */ message, /** function(new:T, ?Array<?>=) */ ctor,
    /** number */ fieldNumber, /** !ReadonlyArray<number> */ oneof,
    /** !HasMessageId= */ hasMessageId) {
  return exports.getReadonlyWrapperFieldOrUndefined(
      message, ctor,
      exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      hasMessageId);
};

/**
 * Gets the value of a oneof field.
 * @return {number|undefined}
 */
exports.getOneofEnumFieldOrUndefined = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** !HasMessageId= */ hasMessageId) {
  return exports.getEnumFieldOrUndefined(
      message, exports.isOneofCase(message, oneof, fieldNumber, hasMessageId),
      hasMessageId);
};

/**
 * @return {boolean|undefined}
 */
exports.getBooleanFieldOrUndefined = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return /** @type {boolean|undefined} */ (
      exports.getBooleanFieldNullable(message, fieldNumber, hasMessageId));
};

/**
 * @return {boolean}
 */
exports.getBooleanFieldLegacyNullable = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return /** @type {boolean} */ (exports.getBooleanFieldNullable(
      message, fieldNumber, hasMessageId, LEGACY_NULLABLE));
};

/**
 * @return {number|undefined}
 */
exports.getInt32FieldOrUndefined = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return /** @type {number|undefined} */ (
      exports.getInt32FieldNullable(message, fieldNumber, hasMessageId));
};

/**
 * @return {number}
 */
exports.getInt32FieldLegacyNullable = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return /** @type {number} */ (exports.getInt32FieldNullable(
      message, fieldNumber, hasMessageId, LEGACY_NULLABLE));
};

/**
 * @return {number|undefined}
 */
exports.getUint32FieldOrUndefined = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return /** @type {number|undefined} */ (
      exports.getUint32FieldNullable(message, fieldNumber, hasMessageId));
};

/**
 * @return {number}
 */
exports.getUint32FieldLegacyNullable = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return /** @type {number} */ (exports.getUint32FieldNullable(
      message, fieldNumber, hasMessageId, LEGACY_NULLABLE));
};

/**
 * @return {number|undefined}
 */
exports.getInt64FieldOrUndefined = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return /** @type {number|undefined} */ (
      exports.getInt64FieldNullable(message, fieldNumber, hasMessageId));
};

/**
 * @return {number}
 */
exports.getInt64FieldLegacyNullable = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return /** @type {number} */ (exports.getInt64FieldNullable(
      message, fieldNumber, hasMessageId, LEGACY_NULLABLE));
};

/**
 * @return {number|undefined}
 */
exports.getUint64FieldOrUndefined = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return /** @type {number|undefined} */ (
      exports.getUint64FieldNullable(message, fieldNumber, hasMessageId));
};

/**
 * @return {number}
 */
exports.getUint64FieldLegacyNullable = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return /** @type {number} */ (exports.getUint64FieldNullable(
      message, fieldNumber, hasMessageId, LEGACY_NULLABLE));
};

/**
 * @return {string|undefined}
 */
exports.getInt64StringFieldOrUndefined = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return /** @type {string|undefined} */ (
      exports.getInt64StringFieldNullable(message, fieldNumber, hasMessageId));
};

/**
 * @return {string}
 */
exports.getInt64StringFieldLegacyNullable = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return /** @type {string} */ (exports.getInt64StringFieldNullable(
      message, fieldNumber, hasMessageId, LEGACY_NULLABLE));
};

/**
 * @return {string|undefined}
 */
exports.getUint64StringFieldOrUndefined = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return /** @type {string|undefined} */ (
      exports.getUint64StringFieldNullable(message, fieldNumber, hasMessageId));
};

/**
 * @return {string}
 */
exports.getUint64StringFieldLegacyNullable = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return /** @type {string} */ (exports.getUint64StringFieldNullable(
      message, fieldNumber, hasMessageId, LEGACY_NULLABLE));
};

/**
 * @return {!gbigint|undefined}
 */
exports.getInt64GbigintFieldOrUndefined = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return /** @type {!gbigint|undefined} */ (
      exports.getInt64GbigintFieldNullable(message, fieldNumber, hasMessageId));
};

/**
 * @return {!gbigint}
 */
exports.getInt64GbigintFieldLegacyNullable = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return /** @type {!gbigint} */ (exports.getInt64GbigintFieldNullable(
      message, fieldNumber, hasMessageId, LEGACY_NULLABLE));
};

/**
 * @return {!gbigint|undefined}
 */
exports.getUint64GbigintFieldOrUndefined = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return /** @type {!gbigint|undefined} */ (
      exports.getUint64GbigintFieldNullable(
          message, fieldNumber, hasMessageId));
};

/**
 * @return {!gbigint}
 */
exports.getUint64GbigintFieldLegacyNullable = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return /** @type {!gbigint} */ (exports.getUint64GbigintFieldNullable(
      message, fieldNumber, hasMessageId, LEGACY_NULLABLE));
};

/**
 * @return {number|undefined}
 */
exports.getFloatingPointFieldOrUndefined = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return /** @type {number|undefined} */ (exports.getFloatingPointFieldNullable(
      message, fieldNumber, hasMessageId));
};

/**
 * @return {number}
 */
exports.getFloatingPointFieldLegacyNullable = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return /** @type {number} */ (exports.getFloatingPointFieldNullable(
      message, fieldNumber, hasMessageId, LEGACY_NULLABLE));
};

/**
 * @return {string|undefined}
 */
exports.getStringFieldOrUndefined = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return /** @type {string|undefined} */ (
      exports.getStringFieldNullable(message, fieldNumber, hasMessageId));
};

/**
 * @return {string}
 */
exports.getStringFieldLegacyNullable = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return /** @type {string} */ (exports.getStringFieldNullable(
      message, fieldNumber, hasMessageId, LEGACY_NULLABLE));
};

/**
 * @return {!ByteString|undefined}
 */
exports.getBytesFieldOrUndefined = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return /** @type {!ByteString|undefined} */ (
      exports.getBytesFieldNullable(message, fieldNumber, hasMessageId));
};

/**
 * @return {!ByteString}
 */
exports.getBytesFieldLegacyNullable = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return /** @type {!ByteString} */ (exports.getBytesFieldNullable(
      message, fieldNumber, hasMessageId, LEGACY_NULLABLE));
};

/**
 * @return {number|undefined}
 */
exports.getEnumFieldOrUndefined = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return /** @type {number|undefined} */ (
      exports.getEnumFieldNullable(message, fieldNumber, hasMessageId));
};

/**
 * @return {number}
 */
exports.getEnumFieldLegacyNullable = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return /** @type {number} */ (exports.getEnumFieldNullable(
      message, fieldNumber, hasMessageId, LEGACY_NULLABLE));
};

/**
 * @return {string|undefined}
 */
exports.getInt64FieldOrUndefined_asString = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return /** @type {string|undefined} */ (
      exports.getInt64FieldNullable_asString(
          message, fieldNumber, hasMessageId));
};

/**
 * @return {string}
 */
exports.getInt64FieldLegacyNullable_asString = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return /** @type {string} */ (exports.getInt64FieldNullable_asString(
      message, fieldNumber, hasMessageId, LEGACY_NULLABLE));
};

/**
 * @return {string|undefined}
 */
exports.getUint64FieldOrUndefined_asString = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return /** @type {string|undefined} */ (
      exports.getUint64FieldNullable_asString(
          message, fieldNumber, hasMessageId));
};

/**
 * @return {string}
 */
exports.getUint64FieldLegacyNullable_asString = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return /** @type {string} */ (exports.getUint64FieldNullable_asString(
      message, fieldNumber, hasMessageId, LEGACY_NULLABLE));
};

/**
 * @return {string|undefined}
 */
exports.getInt64StringFieldOrUndefined_asString = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return /** @type {string|undefined} */ (
      exports.getInt64FieldNullable_asString(
          message, fieldNumber, hasMessageId));
};

/**
 * @return {string}
 */
exports.getInt64StringFieldLegacyNullable_asString = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return /** @type {string} */ (exports.getInt64FieldNullable_asString(
      message, fieldNumber, hasMessageId, LEGACY_NULLABLE));
};

/**
 * @return {string|undefined}
 */
exports.getUint64StringFieldOrUndefined_asString = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return /** @type {string|undefined} */ (
      exports.getUint64FieldNullable_asString(
          message, fieldNumber, hasMessageId));
};

/**
 * @return {string}
 */
exports.getUint64StringFieldLegacyNullable_asString = function(
    /** !InternalMessage */ message, /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return /** @type {string} */ (exports.getUint64FieldNullable_asString(
      message, fieldNumber, hasMessageId, LEGACY_NULLABLE));
};

/**
 * @return {T}
 * @template T
 */
exports.setBooleanField = function(
    /** T */ message, /** number */ fieldNumber,
    /** boolean|null|undefined */ value, /** !HasMessageId= */ hasMessageId) {
  return exports.setField(
      message, fieldNumber, checkNullishBoolean(value), hasMessageId);
};

/**
 * @return {T}
 * @template T
 */
exports.setProto3BooleanField = function(
    /** T */ message, /** number */ fieldNumber,
    /** boolean|null|undefined */ value, /** !HasMessageId= */ hasMessageId) {
  return setFieldIgnoringDefault(
      message, fieldNumber, checkNullishBoolean(value), false, hasMessageId);
};

/**
 * @return {T}
 * @template T
 */
exports.setOneofBooleanField = function(
    /** T */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** boolean|null|undefined */ value,
    /** !HasMessageId= */ hasMessageId) {
  return exports.setOneofField(
      message, fieldNumber, oneof, checkNullishBoolean(value), hasMessageId);
};

/**
 * @return {T}
 * @template T
 */
exports.setInt32Field = function(
    /** T */ message, /** number */ fieldNumber,
    /** number|null|undefined */ value, /** !HasMessageId= */ hasMessageId) {
  return exports.setField(
      message, fieldNumber, checkNullishInt32(value), hasMessageId);
};

/**
 * @return {T}
 * @template T
 */
exports.setProto3Int32Field = function(
    /** T */ message, /** number */ fieldNumber,
    /** number|null|undefined */ value, /** !HasMessageId= */ hasMessageId) {
  return setFieldIgnoringDefault(
      message, fieldNumber, checkNullishInt32(value), 0, hasMessageId);
};

/**
 * @return {T}
 * @template T
 */
exports.setOneofInt32Field = function(
    /** T */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** number|null|undefined */ value,
    /** !HasMessageId= */ hasMessageId) {
  return exports.setOneofField(
      message, fieldNumber, oneof, checkNullishInt32(value), hasMessageId);
};

/**
 * @return {T}
 * @template T
 */
exports.setUint32Field = function(
    /** T */ message, /** number */ fieldNumber,
    /** number|null|undefined */ value, /** !HasMessageId= */ hasMessageId) {
  return exports.setField(
      message, fieldNumber, checkNullishUint32(value), hasMessageId);
};

/**
 * @return {T}
 * @template T
 */
exports.setProto3Uint32Field = function(
    /** T */ message, /** number */ fieldNumber,
    /** number|null|undefined */ value, /** !HasMessageId= */ hasMessageId) {
  return setFieldIgnoringDefault(
      message, fieldNumber, checkNullishUint32(value), 0, hasMessageId);
};

/**
 * @return {T}
 * @template T
 */
exports.setOneofUint32Field = function(
    /** T */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** number|null|undefined */ value,
    /** !HasMessageId= */ hasMessageId) {
  return exports.setOneofField(
      message, fieldNumber, oneof, checkNullishUint32(value), hasMessageId);
};

/**
 * @return {T}
 * @template T
 */
exports.setInt64Field = function(
    /** T */ message, /** number */ fieldNumber,
    /** number|string|!gbigint|null|undefined */ value,
    /** !TypeSpecificApiFormat= */ requestedFormat,
    /** !HasMessageId= */ hasMessageId) {
  return exports.setField(
      message, fieldNumber, checkNullishInt64(value, requestedFormat),
      hasMessageId);
};

/**
 * @return {T}
 * @template T
 */
exports.setProto3Int64Field = function(
    /** T */ message, /** number */ fieldNumber,
    /** number|string|!gbigint|null|undefined */ value,
    /** !TypeSpecificApiFormat= */ requestedFormat,
    /** !HasMessageId= */ hasMessageId) {
  return setFieldIgnoringDefault(
      message, fieldNumber, checkNullishInt64(value, requestedFormat), '0',
      hasMessageId);
};

/**
 * @return {T}
 * @template T
 */
exports.setOneofInt64Field = function(
    /** T */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof,
    /** number|string|!gbigint|null|undefined */ value,
    /** !TypeSpecificApiFormat= */ requestedFormat,
    /** !HasMessageId= */ hasMessageId) {
  return exports.setOneofField(
      message, fieldNumber, oneof, checkNullishInt64(value, requestedFormat),
      hasMessageId);
};

/**
 * @return {T}
 * @template T
 */
exports.setUint64Field = function(
    /** T */ message, /** number */ fieldNumber,
    /** number|string|!gbigint|null|undefined */ value,
    /** !TypeSpecificApiFormat= */ requestedFormat,
    /** !HasMessageId= */ hasMessageId) {
  return exports.setField(
      message, fieldNumber, checkNullishUint64(value, requestedFormat),
      hasMessageId);
};

/**
 * @return {T}
 * @template T
 */
exports.setProto3Uint64Field = function(
    /** T */ message, /** number */ fieldNumber,
    /** number|string|!gbigint|null|undefined */ value,
    /** !TypeSpecificApiFormat= */ requestedFormat,
    /** !HasMessageId= */ hasMessageId) {
  return setFieldIgnoringDefault(
      message, fieldNumber, checkNullishUint64(value, requestedFormat), '0',
      hasMessageId);
};

/**
 * @return {T}
 * @template T
 */
exports.setOneofUint64Field = function(
    /** T */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof,
    /** number|string|!gbigint|null|undefined */ value,
    /** !TypeSpecificApiFormat= */ requestedFormat,
    /** !HasMessageId= */ hasMessageId) {
  return exports.setOneofField(
      message, fieldNumber, oneof, checkNullishUint64(value, requestedFormat),
      hasMessageId);
};

/**
 * @return {T}
 * @template T
 */
exports.setInt64StringField = function(
    /** T */ message, /** number */ fieldNumber,
    /** number|string|!gbigint|null|undefined */ value,
    /** !TypeSpecificApiFormat= */ requestedFormat,
    /** !HasMessageId= */ hasMessageId) {
  return exports.setField(
      message, fieldNumber, checkNullishInt64String(value, requestedFormat),
      hasMessageId);
};

/**
 * @return {T}
 * @template T
 */
exports.setProto3Int64StringField = function(
    /** T */ message, /** number */ fieldNumber,
    /** number|string|!gbigint|null|undefined */ value,
    /** !TypeSpecificApiFormat= */ requestedFormat,
    /** !HasMessageId= */ hasMessageId) {
  return setFieldIgnoringDefault(
      message, fieldNumber, checkNullishInt64String(value, requestedFormat),
      '0', hasMessageId);
};

/**
 * @return {T}
 * @template T
 */
exports.setOneofInt64StringField = function(
    /** T */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof,
    /** number|string|!gbigint|null|undefined */ value,
    /** !TypeSpecificApiFormat= */ requestedFormat,
    /** !HasMessageId= */ hasMessageId) {
  return exports.setOneofField(
      message, fieldNumber, oneof,
      checkNullishInt64String(value, requestedFormat), hasMessageId);
};

/**
 * @return {T}
 * @template T
 */
exports.setUint64StringField = function(
    /** T */ message, /** number */ fieldNumber,
    /** number|string|!gbigint|null|undefined */ value,
    /** !TypeSpecificApiFormat= */ requestedFormat,
    /** !HasMessageId= */ hasMessageId) {
  return exports.setField(
      message, fieldNumber, checkNullishUint64String(value, requestedFormat),
      hasMessageId);
};

/**
 * @return {T}
 * @template T
 */
exports.setProto3Uint64StringField = function(
    /** T */ message, /** number */ fieldNumber,
    /** number|string|!gbigint|null|undefined */ value,
    /** !TypeSpecificApiFormat= */ requestedFormat,
    /** !HasMessageId= */ hasMessageId) {
  return setFieldIgnoringDefault(
      message, fieldNumber, checkNullishUint64String(value, requestedFormat),
      '0', hasMessageId);
};

/**
 * @return {T}
 * @template T
 */
exports.setOneofUint64StringField = function(
    /** T */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof,
    /** number|string|!gbigint|null|undefined */ value,
    /** !TypeSpecificApiFormat= */ requestedFormat,
    /** !HasMessageId= */ hasMessageId) {
  return exports.setOneofField(
      message, fieldNumber, oneof,
      checkNullishUint64String(value, requestedFormat), hasMessageId);
};

/**
 * @return {T}
 * @template T
 */
exports.setFloatingPointField = function(
    /** T */ message, /** number */ fieldNumber,
    /** number|null|undefined */ value, /** !HasMessageId= */ hasMessageId) {
  return exports.setField(
      message, fieldNumber, checkNullishFloatingPoint(value), hasMessageId);
};

/**
 * @return {T}
 * @template T
 */
exports.setProto3FloatingPointField = function(
    /** T */ message, /** number */ fieldNumber,
    /** number|null|undefined */ value, /** !HasMessageId= */ hasMessageId) {
  return setFieldIgnoringDefault(
      message, fieldNumber, checkNullishFloatingPoint(value), 0, hasMessageId);
};

/**
 * @return {T}
 * @template T
 */
exports.setOneofFloatingPointField = function(
    /** T */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** number|null|undefined */ value,
    /** !HasMessageId= */ hasMessageId) {
  return exports.setOneofField(
      message, fieldNumber, oneof, checkNullishFloatingPoint(value),
      hasMessageId);
};

/**
 * @return {T}
 * @template T
 */
exports.setStringField = function(
    /** T */ message, /** number */ fieldNumber,
    /** string|null|undefined */ value, /** !HasMessageId= */ hasMessageId) {
  return exports.setField(
      message, fieldNumber, checkNullishString(value), hasMessageId);
};

/**
 * @return {T}
 * @template T
 */
exports.setProto3StringField = function(
    /** T */ message, /** number */ fieldNumber,
    /** string|null|undefined */ value, /** !HasMessageId= */ hasMessageId) {
  return setFieldIgnoringDefault(
      message, fieldNumber, checkNullishString(value), '', hasMessageId);
};

/**
 * @return {T}
 * @template T
 */
exports.setOneofStringField = function(
    /** T */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** string|null|undefined */ value,
    /** !HasMessageId= */ hasMessageId) {
  return exports.setOneofField(
      message, fieldNumber, oneof, checkNullishString(value), hasMessageId);
};

/**
 * @return {T}
 * @template T
 */
exports.setBytesField = function(
    /** T */ message, /** number */ fieldNumber,
    /** string|!Uint8Array|!ByteString|null|undefined */ value,
    /** !HasMessageId= */ hasMessageId) {
  return exports.setField(
      message, fieldNumber, checkNullishBytes(value), hasMessageId);
};

/**
 * @return {T}
 * @template T
 */
exports.setProto3BytesField = function(
    /** T */ message, /** number */ fieldNumber,
    /** string|!Uint8Array|!ByteString|null|undefined */ value,
    /** !HasMessageId= */ hasMessageId) {
  return setFieldIgnoringDefault(
      message, fieldNumber, checkNullishBytes(value), ByteString.empty(),
      hasMessageId);
};

/**
 * @return {T}
 * @template T
 */
exports.setOneofBytesField = function(
    /** T */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof,
    /** string|!Uint8Array|!ByteString|null|undefined */ value,
    /** !HasMessageId= */ hasMessageId) {
  return exports.setOneofField(
      message, fieldNumber, oneof, checkNullishBytes(value), hasMessageId);
};

/**
 * @return {T}
 * @template T
 */
exports.setEnumField = function(
    /** T */ message, /** number */ fieldNumber,
    /** number|null|undefined */ value, /** !HasMessageId= */ hasMessageId) {
  return exports.setField(
      message, fieldNumber, checkNullishEnum(value), hasMessageId);
};

/**
 * @return {T}
 * @template T
 */
exports.setProto3EnumField = function(
    /** T */ message, /** number */ fieldNumber,
    /** number|null|undefined */ value, /** !HasMessageId= */ hasMessageId) {
  return setFieldIgnoringDefault(
      message, fieldNumber, checkNullishEnum(value), 0, hasMessageId);
};

/**
 * @return {T}
 * @template T
 */
exports.setOneofEnumField = function(
    /** T */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number> */ oneof, /** number|null|undefined */ value,
    /** !HasMessageId= */ hasMessageId) {
  return exports.setOneofField(
      message, fieldNumber, oneof, checkNullishEnum(value), hasMessageId);
};

/**
 * @return {T}
 * @template T
 */
exports.setRepeatedBooleanField = function(
    /** T */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<boolean>|null|undefined */ value,
    /** !HasMessageId= */ hasMessageId) {
  return setRepeatedPrimitiveField(
      message, fieldNumber, value, checkBoolean, hasMessageId);
};

/**
 * Adds a value to a repeated primitive field.
 * @return {T}
 * @template T
 */
exports.addToRepeatedBooleanField = function(
    /** T */ message, /** number */ fieldNumber, /** boolean */ value,
    /** number= */ index, /** !HasMessageId= */ hasMessageId) {
  return spliceRepeatedPrimitiveField(
      message, fieldNumber, checkBoolean, value, index, coerceToNullishBoolean,
      hasMessageId);
};

/**
 * Removes a value from a repeated primitive field.
 * @return {T}
 * @template T
 */
exports.removeFromRepeatedBooleanField = function(
    /** T */ message, /** number */ fieldNumber, /** number= */ index,
    /** !HasMessageId= */ hasMessageId) {
  return spliceRepeatedPrimitiveField(
      message, fieldNumber, checkBoolean, undefined, index,
      coerceToNullishBoolean, hasMessageId, /*deleteCount=*/ 1,
      /*isSpreadable=*/ false, /*removeOnly=*/ true);
};

/**
 * Adds a collection of values to a repeated primitive field.
 * @return {T}
 * @template T
 */
exports.addAllToRepeatedBooleanField = function(
    /** T */ message,
    /** number */ fieldNumber,
    /** !Iterable<boolean> */ values,
    /** !HasMessageId= */ hasMessageId) {
  return addAllToRepeatedFieldImpl(
      message, fieldNumber, checkBoolean, values, coerceToNullishBoolean,
      hasMessageId);
};

/**
 * Sets the a primitive repeated field's value at `index`.
 * @return {T}
 * @template T
 */
exports.setRepeatedIndexedBooleanField = function(
    /** T */ message, /** number */ fieldNumber, /** number */ index,
    /** boolean */ value, /** !HasMessageId= */ hasMessageId) {
  return setRepeatedIndexedFieldImpl(
      message, fieldNumber, checkBoolean, index, value, coerceToNullishBoolean,
      hasMessageId);
};

/**
 * @return {T}
 * @template T
 */
exports.setRepeatedInt32Field = function(
    /** T */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number>|null|undefined */ value,
    /** !HasMessageId= */ hasMessageId) {
  return setRepeatedPrimitiveField(
      message, fieldNumber, value, checkInt32, hasMessageId);
};

/**
 * Adds a value to a repeated primitive field.
 * @return {T}
 * @template T
 */
exports.addToRepeatedInt32Field = function(
    /** T */ message, /** number */ fieldNumber, /** number */ value,
    /** number= */ index, /** !HasMessageId= */ hasMessageId) {
  return spliceRepeatedPrimitiveField(
      message, fieldNumber, checkInt32, value, index, coerceToNullishInt32,
      hasMessageId);
};

/**
 * Removes a value from a repeated primitive field.
 * @return {T}
 * @template T
 */
exports.removeFromRepeatedInt32Field = function(
    /** T */ message, /** number */ fieldNumber, /** number= */ index,
    /** !HasMessageId= */ hasMessageId) {
  return spliceRepeatedPrimitiveField(
      message, fieldNumber, checkInt32, undefined, index, coerceToNullishInt32,
      hasMessageId, /*deleteCount=*/ 1, /*isSpreadable=*/ false,
      /*removeOnly=*/ true);
};

/**
 * Adds a collection of values to a repeated primitive field.
 * @return {T}
 * @template T
 */
exports.addAllToRepeatedInt32Field = function(
    /** T */ message,
    /** number */ fieldNumber,
    /** !Iterable<number> */ values,
    /** !HasMessageId= */ hasMessageId) {
  return addAllToRepeatedFieldImpl(
      message, fieldNumber, checkInt32, values, coerceToNullishInt32,
      hasMessageId);
};

/**
 * Sets the a primitive repeated field's value at `index`.
 * @return {T}
 * @template T
 */
exports.setRepeatedIndexedInt32Field = function(
    /** T */ message, /** number */ fieldNumber, /** number */ index,
    /** number */ value, /** !HasMessageId= */ hasMessageId) {
  return setRepeatedIndexedFieldImpl(
      message, fieldNumber, checkInt32, index, value, coerceToNullishInt32,
      hasMessageId);
};

/**
 * @return {T}
 * @template T
 */
exports.setRepeatedUint32Field = function(
    /** T */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number>|null|undefined */ value,
    /** !HasMessageId= */ hasMessageId) {
  return setRepeatedPrimitiveField(
      message, fieldNumber, value, checkUint32, hasMessageId);
};

/**
 * Adds a value to a repeated primitive field.
 * @return {T}
 * @template T
 */
exports.addToRepeatedUint32Field = function(
    /** T */ message, /** number */ fieldNumber, /** number */ value,
    /** number= */ index, /** !HasMessageId= */ hasMessageId) {
  return spliceRepeatedPrimitiveField(
      message, fieldNumber, checkUint32, value, index, coerceToNullishUint32,
      hasMessageId);
};

/**
 * Removes a value from a repeated primitive field.
 * @return {T}
 * @template T
 */
exports.removeFromRepeatedUint32Field = function(
    /** T */ message, /** number */ fieldNumber, /** number= */ index,
    /** !HasMessageId= */ hasMessageId) {
  return spliceRepeatedPrimitiveField(
      message, fieldNumber, checkUint32, undefined, index,
      coerceToNullishUint32, hasMessageId, /*deleteCount=*/ 1,
      /*isSpreadable=*/ false, /*removeOnly=*/ true);
};

/**
 * Adds a collection of values to a repeated primitive field.
 * @return {T}
 * @template T
 */
exports.addAllToRepeatedUint32Field = function(
    /** T */ message,
    /** number */ fieldNumber,
    /** !Iterable<number> */ values,
    /** !HasMessageId= */ hasMessageId) {
  return addAllToRepeatedFieldImpl(
      message, fieldNumber, checkUint32, values, coerceToNullishUint32,
      hasMessageId);
};

/**
 * Sets the a primitive repeated field's value at `index`.
 * @return {T}
 * @template T
 */
exports.setRepeatedIndexedUint32Field = function(
    /** T */ message, /** number */ fieldNumber, /** number */ index,
    /** number */ value, /** !HasMessageId= */ hasMessageId) {
  return setRepeatedIndexedFieldImpl(
      message, fieldNumber, checkUint32, index, value, coerceToNullishUint32,
      hasMessageId);
};

/**
 * @return {T}
 * @template T
 */
exports.setRepeatedInt64Field = function(
    /** T */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number|string|!gbigint>|null|undefined */ value,
    /** !HasMessageId= */ hasMessageId) {
  return setRepeatedPrimitiveField(
      message, fieldNumber, value, checkInt64, hasMessageId);
};

/**
 * Adds a value to a repeated primitive field.
 * @return {T}
 * @template T
 */
exports.addToRepeatedInt64Field = function(
    /** T */ message, /** number */ fieldNumber,
    /** number|string|!gbigint */ value, /** number= */ index,
    /** !HasMessageId= */ hasMessageId) {
  return spliceRepeatedPrimitiveField(
      message, fieldNumber, checkInt64, value, index, coerceToNullishInt64,
      hasMessageId);
};

/**
 * Removes a value from a repeated primitive field.
 * @return {T}
 * @template T
 */
exports.removeFromRepeatedInt64Field = function(
    /** T */ message, /** number */ fieldNumber, /** number= */ index,
    /** !HasMessageId= */ hasMessageId) {
  return spliceRepeatedPrimitiveField(
      message, fieldNumber, checkInt64, undefined, index, coerceToNullishInt64,
      hasMessageId, /*deleteCount=*/ 1, /*isSpreadable=*/ false,
      /*removeOnly=*/ true);
};

/**
 * Adds a collection of values to a repeated primitive field.
 * @return {T}
 * @template T
 */
exports.addAllToRepeatedInt64Field = function(
    /** T */ message,
    /** number */ fieldNumber,
    /** !Iterable<number|string|!gbigint> */ values,
    /** !HasMessageId= */ hasMessageId) {
  return addAllToRepeatedFieldImpl(
      message, fieldNumber, checkInt64, values, coerceToNullishInt64,
      hasMessageId);
};

/**
 * Sets the a primitive repeated field's value at `index`.
 * @return {T}
 * @template T
 */
exports.setRepeatedIndexedInt64Field = function(
    /** T */ message, /** number */ fieldNumber, /** number */ index,
    /** number|string|!gbigint */ value, /** !HasMessageId= */ hasMessageId) {
  return setRepeatedIndexedFieldImpl(
      message, fieldNumber, checkInt64, index, value, coerceToNullishInt64,
      hasMessageId);
};

/**
 * @return {T}
 * @template T
 */
exports.setRepeatedUint64Field = function(
    /** T */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number|string|!gbigint>|null|undefined */ value,
    /** !HasMessageId= */ hasMessageId) {
  return setRepeatedPrimitiveField(
      message, fieldNumber, value, checkUint64, hasMessageId);
};

/**
 * Adds a value to a repeated primitive field.
 * @return {T}
 * @template T
 */
exports.addToRepeatedUint64Field = function(
    /** T */ message, /** number */ fieldNumber,
    /** number|string|!gbigint */ value, /** number= */ index,
    /** !HasMessageId= */ hasMessageId) {
  return spliceRepeatedPrimitiveField(
      message, fieldNumber, checkUint64, value, index, coerceToNullishUint64,
      hasMessageId);
};

/**
 * Removes a value from a repeated primitive field.
 * @return {T}
 * @template T
 */
exports.removeFromRepeatedUint64Field = function(
    /** T */ message, /** number */ fieldNumber, /** number= */ index,
    /** !HasMessageId= */ hasMessageId) {
  return spliceRepeatedPrimitiveField(
      message, fieldNumber, checkUint64, undefined, index,
      coerceToNullishUint64, hasMessageId, /*deleteCount=*/ 1,
      /*isSpreadable=*/ false, /*removeOnly=*/ true);
};

/**
 * Adds a collection of values to a repeated primitive field.
 * @return {T}
 * @template T
 */
exports.addAllToRepeatedUint64Field = function(
    /** T */ message,
    /** number */ fieldNumber,
    /** !Iterable<number|string|!gbigint> */ values,
    /** !HasMessageId= */ hasMessageId) {
  return addAllToRepeatedFieldImpl(
      message, fieldNumber, checkUint64, values, coerceToNullishUint64,
      hasMessageId);
};

/**
 * Sets the a primitive repeated field's value at `index`.
 * @return {T}
 * @template T
 */
exports.setRepeatedIndexedUint64Field = function(
    /** T */ message, /** number */ fieldNumber, /** number */ index,
    /** number|string|!gbigint */ value, /** !HasMessageId= */ hasMessageId) {
  return setRepeatedIndexedFieldImpl(
      message, fieldNumber, checkUint64, index, value, coerceToNullishUint64,
      hasMessageId);
};

/**
 * @return {T}
 * @template T
 */
exports.setRepeatedInt64StringField = function(
    /** T */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number|string|!gbigint>|null|undefined */ value,
    /** !HasMessageId= */ hasMessageId) {
  return setRepeatedPrimitiveField(
      message, fieldNumber, value, checkInt64String, hasMessageId);
};

/**
 * Adds a value to a repeated primitive field.
 * @return {T}
 * @template T
 */
exports.addToRepeatedInt64StringField = function(
    /** T */ message, /** number */ fieldNumber,
    /** number|string|!gbigint */ value, /** number= */ index,
    /** !HasMessageId= */ hasMessageId) {
  return spliceRepeatedPrimitiveField(
      message, fieldNumber, checkInt64String, value, index,
      coerceToNullishInt64String, hasMessageId);
};

/**
 * Removes a value from a repeated primitive field.
 * @return {T}
 * @template T
 */
exports.removeFromRepeatedInt64StringField = function(
    /** T */ message, /** number */ fieldNumber, /** number= */ index,
    /** !HasMessageId= */ hasMessageId) {
  return spliceRepeatedPrimitiveField(
      message, fieldNumber, checkInt64String, undefined, index,
      coerceToNullishInt64String, hasMessageId, /*deleteCount=*/ 1,
      /*isSpreadable=*/ false, /*removeOnly=*/ true);
};

/**
 * Adds a collection of values to a repeated primitive field.
 * @return {T}
 * @template T
 */
exports.addAllToRepeatedInt64StringField = function(
    /** T */ message,
    /** number */ fieldNumber,
    /** !Iterable<number|string|!gbigint> */ values,
    /** !HasMessageId= */ hasMessageId) {
  return addAllToRepeatedFieldImpl(
      message, fieldNumber, checkInt64String, values,
      coerceToNullishInt64String, hasMessageId);
};

/**
 * Sets the a primitive repeated field's value at `index`.
 * @return {T}
 * @template T
 */
exports.setRepeatedIndexedInt64StringField = function(
    /** T */ message, /** number */ fieldNumber, /** number */ index,
    /** number|string|!gbigint */ value, /** !HasMessageId= */ hasMessageId) {
  return setRepeatedIndexedFieldImpl(
      message, fieldNumber, checkInt64String, index, value,
      coerceToNullishInt64String, hasMessageId);
};

/**
 * @return {T}
 * @template T
 */
exports.setRepeatedUint64StringField = function(
    /** T */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number|string|!gbigint>|null|undefined */ value,
    /** !HasMessageId= */ hasMessageId) {
  return setRepeatedPrimitiveField(
      message, fieldNumber, value, checkUint64String, hasMessageId);
};

/**
 * Adds a value to a repeated primitive field.
 * @return {T}
 * @template T
 */
exports.addToRepeatedUint64StringField = function(
    /** T */ message, /** number */ fieldNumber,
    /** number|string|!gbigint */ value, /** number= */ index,
    /** !HasMessageId= */ hasMessageId) {
  return spliceRepeatedPrimitiveField(
      message, fieldNumber, checkUint64String, value, index,
      coerceToNullishUint64String, hasMessageId);
};

/**
 * Removes a value from a repeated primitive field.
 * @return {T}
 * @template T
 */
exports.removeFromRepeatedUint64StringField = function(
    /** T */ message, /** number */ fieldNumber, /** number= */ index,
    /** !HasMessageId= */ hasMessageId) {
  return spliceRepeatedPrimitiveField(
      message, fieldNumber, checkUint64String, undefined, index,
      coerceToNullishUint64String, hasMessageId, /*deleteCount=*/ 1,
      /*isSpreadable=*/ false, /*removeOnly=*/ true);
};

/**
 * Adds a collection of values to a repeated primitive field.
 * @return {T}
 * @template T
 */
exports.addAllToRepeatedUint64StringField = function(
    /** T */ message,
    /** number */ fieldNumber,
    /** !Iterable<number|string|!gbigint> */ values,
    /** !HasMessageId= */ hasMessageId) {
  return addAllToRepeatedFieldImpl(
      message, fieldNumber, checkUint64String, values,
      coerceToNullishUint64String, hasMessageId);
};

/**
 * Sets the a primitive repeated field's value at `index`.
 * @return {T}
 * @template T
 */
exports.setRepeatedIndexedUint64StringField = function(
    /** T */ message, /** number */ fieldNumber, /** number */ index,
    /** number|string|!gbigint */ value, /** !HasMessageId= */ hasMessageId) {
  return setRepeatedIndexedFieldImpl(
      message, fieldNumber, checkUint64String, index, value,
      coerceToNullishUint64String, hasMessageId);
};

/**
 * @return {T}
 * @template T
 */
exports.setRepeatedFloatingPointField = function(
    /** T */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number>|null|undefined */ value,
    /** !HasMessageId= */ hasMessageId) {
  return setRepeatedPrimitiveField(
      message, fieldNumber, value, checkFloatingPoint, hasMessageId);
};

/**
 * Adds a value to a repeated primitive field.
 * @return {T}
 * @template T
 */
exports.addToRepeatedFloatingPointField = function(
    /** T */ message, /** number */ fieldNumber, /** number */ value,
    /** number= */ index, /** !HasMessageId= */ hasMessageId) {
  return spliceRepeatedPrimitiveField(
      message, fieldNumber, checkFloatingPoint, value, index,
      coerceToNullishFloatingPoint, hasMessageId);
};

/**
 * Removes a value from a repeated primitive field.
 * @return {T}
 * @template T
 */
exports.removeFromRepeatedFloatingPointField = function(
    /** T */ message, /** number */ fieldNumber, /** number= */ index,
    /** !HasMessageId= */ hasMessageId) {
  return spliceRepeatedPrimitiveField(
      message, fieldNumber, checkFloatingPoint, undefined, index,
      coerceToNullishFloatingPoint, hasMessageId, /*deleteCount=*/ 1,
      /*isSpreadable=*/ false, /*removeOnly=*/ true);
};

/**
 * Adds a collection of values to a repeated primitive field.
 * @return {T}
 * @template T
 */
exports.addAllToRepeatedFloatingPointField = function(
    /** T */ message,
    /** number */ fieldNumber,
    /** !Iterable<number> */ values,
    /** !HasMessageId= */ hasMessageId) {
  return addAllToRepeatedFieldImpl(
      message, fieldNumber, checkFloatingPoint, values,
      coerceToNullishFloatingPoint, hasMessageId);
};

/**
 * Sets the a primitive repeated field's value at `index`.
 * @return {T}
 * @template T
 */
exports.setRepeatedIndexedFloatingPointField = function(
    /** T */ message, /** number */ fieldNumber, /** number */ index,
    /** number */ value, /** !HasMessageId= */ hasMessageId) {
  return setRepeatedIndexedFieldImpl(
      message, fieldNumber, checkFloatingPoint, index, value,
      coerceToNullishFloatingPoint, hasMessageId);
};

/**
 * @return {T}
 * @template T
 */
exports.setRepeatedStringField = function(
    /** T */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<string>|null|undefined */ value,
    /** !HasMessageId= */ hasMessageId) {
  return setRepeatedPrimitiveField(
      message, fieldNumber, value, checkString, hasMessageId);
};

/**
 * Adds a value to a repeated primitive field.
 * @return {T}
 * @template T
 */
exports.addToRepeatedStringField = function(
    /** T */ message, /** number */ fieldNumber, /** string */ value,
    /** number= */ index, /** !HasMessageId= */ hasMessageId) {
  return spliceRepeatedPrimitiveField(
      message, fieldNumber, checkString, value, index, coerceToNullishString,
      hasMessageId);
};

/**
 * Removes a value from a repeated primitive field.
 * @return {T}
 * @template T
 */
exports.removeFromRepeatedStringField = function(
    /** T */ message, /** number */ fieldNumber, /** number= */ index,
    /** !HasMessageId= */ hasMessageId) {
  return spliceRepeatedPrimitiveField(
      message, fieldNumber, checkString, undefined, index,
      coerceToNullishString, hasMessageId, /*deleteCount=*/ 1,
      /*isSpreadable=*/ false, /*removeOnly=*/ true);
};

/**
 * Adds a collection of values to a repeated primitive field.
 * @return {T}
 * @template T
 */
exports.addAllToRepeatedStringField = function(
    /** T */ message,
    /** number */ fieldNumber,
    /** !Iterable<string> */ values,
    /** !HasMessageId= */ hasMessageId) {
  return addAllToRepeatedFieldImpl(
      message, fieldNumber, checkString, values, coerceToNullishString,
      hasMessageId);
};

/**
 * Sets the a primitive repeated field's value at `index`.
 * @return {T}
 * @template T
 */
exports.setRepeatedIndexedStringField = function(
    /** T */ message, /** number */ fieldNumber, /** number */ index,
    /** string */ value, /** !HasMessageId= */ hasMessageId) {
  return setRepeatedIndexedFieldImpl(
      message, fieldNumber, checkString, index, value, coerceToNullishString,
      hasMessageId);
};

/**
 * @return {T}
 * @template T
 */
exports.setRepeatedBytesField = function(
    /** T */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<string|!Uint8Array|!ByteString>|null|undefined */ value,
    /** !HasMessageId= */ hasMessageId) {
  return setRepeatedPrimitiveField(
      message, fieldNumber, value, checkBytes, hasMessageId);
};

/**
 * Adds a value to a repeated primitive field.
 * @return {T}
 * @template T
 */
exports.addToRepeatedBytesField = function(
    /** T */ message, /** number */ fieldNumber,
    /** string|!Uint8Array|!ByteString */ value, /** number= */ index,
    /** !HasMessageId= */ hasMessageId) {
  return spliceRepeatedPrimitiveField(
      message, fieldNumber, checkBytes, value, index, coerceToNullishBytes,
      hasMessageId);
};

/**
 * Removes a value from a repeated primitive field.
 * @return {T}
 * @template T
 */
exports.removeFromRepeatedBytesField = function(
    /** T */ message, /** number */ fieldNumber, /** number= */ index,
    /** !HasMessageId= */ hasMessageId) {
  return spliceRepeatedPrimitiveField(
      message, fieldNumber, checkBytes, undefined, index, coerceToNullishBytes,
      hasMessageId, /*deleteCount=*/ 1, /*isSpreadable=*/ false,
      /*removeOnly=*/ true);
};

/**
 * Adds a collection of values to a repeated primitive field.
 * @return {T}
 * @template T
 */
exports.addAllToRepeatedBytesField = function(
    /** T */ message,
    /** number */ fieldNumber,
    /** !Iterable<string|!Uint8Array|!ByteString> */ values,
    /** !HasMessageId= */ hasMessageId) {
  return addAllToRepeatedFieldImpl(
      message, fieldNumber, checkBytes, values, coerceToNullishBytes,
      hasMessageId);
};

/**
 * Sets the a primitive repeated field's value at `index`.
 * @return {T}
 * @template T
 */
exports.setRepeatedIndexedBytesField = function(
    /** T */ message, /** number */ fieldNumber, /** number */ index,
    /** string|!Uint8Array|!ByteString */ value,
    /** !HasMessageId= */ hasMessageId) {
  return setRepeatedIndexedFieldImpl(
      message, fieldNumber, checkBytes, index, value, coerceToNullishBytes,
      hasMessageId);
};

/**
 * @return {T}
 * @template T
 */
exports.setRepeatedEnumField = function(
    /** T */ message, /** number */ fieldNumber,
    /** !ReadonlyArray<number>|null|undefined */ value,
    /** !HasMessageId= */ hasMessageId) {
  return setRepeatedPrimitiveField(
      message, fieldNumber, value, checkEnum, hasMessageId);
};

/**
 * Adds a value to a repeated primitive field.
 * @return {T}
 * @template T
 */
exports.addToRepeatedEnumField = function(
    /** T */ message, /** number */ fieldNumber, /** number */ value,
    /** number= */ index, /** !HasMessageId= */ hasMessageId) {
  return spliceRepeatedPrimitiveField(
      message, fieldNumber, checkEnum, value, index, coerceToNullishEnum,
      hasMessageId);
};

/**
 * Removes a value from a repeated primitive field.
 * @return {T}
 * @template T
 */
exports.removeFromRepeatedEnumField = function(
    /** T */ message, /** number */ fieldNumber, /** number= */ index,
    /** !HasMessageId= */ hasMessageId) {
  return spliceRepeatedPrimitiveField(
      message, fieldNumber, checkEnum, undefined, index, coerceToNullishEnum,
      hasMessageId, /*deleteCount=*/ 1, /*isSpreadable=*/ false,
      /*removeOnly=*/ true);
};

/**
 * Adds a collection of values to a repeated primitive field.
 * @return {T}
 * @template T
 */
exports.addAllToRepeatedEnumField = function(
    /** T */ message,
    /** number */ fieldNumber,
    /** !Iterable<number> */ values,
    /** !HasMessageId= */ hasMessageId) {
  return addAllToRepeatedFieldImpl(
      message, fieldNumber, checkEnum, values, coerceToNullishEnum,
      hasMessageId);
};

/**
 * Sets the a primitive repeated field's value at `index`.
 * @return {T}
 * @template T
 */
exports.setRepeatedIndexedEnumField = function(
    /** T */ message, /** number */ fieldNumber, /** number */ index,
    /** number */ value, /** !HasMessageId= */ hasMessageId) {
  return setRepeatedIndexedFieldImpl(
      message, fieldNumber, checkEnum, index, value, coerceToNullishEnum,
      hasMessageId);
};

/**
 * Returns the presence of a field.
 * @return {boolean}
 */
exports.hasBooleanField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return exports.getBooleanFieldOrUndefined(
             message, fieldNumber, hasMessageId) != null;
};

/**
 * Returns the presence of a field.
 * @return {boolean}
 */
exports.hasOneofBooleanField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyArray<number> */ oneof,
    /** !HasMessageId= */ hasMessageId) {
  return exports.getOneofBooleanFieldOrUndefined(
             message, fieldNumber, oneof, hasMessageId) != null;
};

/**
 * Returns the presence of a field.
 * @return {boolean}
 */
exports.hasInt32Field = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return exports.getInt32FieldOrUndefined(message, fieldNumber, hasMessageId) !=
      null;
};

/**
 * Returns the presence of a field.
 * @return {boolean}
 */
exports.hasOneofInt32Field = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyArray<number> */ oneof,
    /** !HasMessageId= */ hasMessageId) {
  return exports.getOneofInt32FieldOrUndefined(
             message, fieldNumber, oneof, hasMessageId) != null;
};

/**
 * Returns the presence of a field.
 * @return {boolean}
 */
exports.hasUint32Field = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return exports.getUint32FieldOrUndefined(
             message, fieldNumber, hasMessageId) != null;
};

/**
 * Returns the presence of a field.
 * @return {boolean}
 */
exports.hasOneofUint32Field = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyArray<number> */ oneof,
    /** !HasMessageId= */ hasMessageId) {
  return exports.getOneofUint32FieldOrUndefined(
             message, fieldNumber, oneof, hasMessageId) != null;
};

/**
 * Returns the presence of a field.
 * @return {boolean}
 */
exports.hasInt64Field = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return exports.getInt64FieldOrUndefined(message, fieldNumber, hasMessageId) !=
      null;
};

/**
 * Returns the presence of a field.
 * @return {boolean}
 */
exports.hasOneofInt64Field = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyArray<number> */ oneof,
    /** !HasMessageId= */ hasMessageId) {
  return exports.getOneofInt64FieldOrUndefined(
             message, fieldNumber, oneof, hasMessageId) != null;
};

/**
 * Returns the presence of a field.
 * @return {boolean}
 */
exports.hasUint64Field = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return exports.getUint64FieldOrUndefined(
             message, fieldNumber, hasMessageId) != null;
};

/**
 * Returns the presence of a field.
 * @return {boolean}
 */
exports.hasOneofUint64Field = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyArray<number> */ oneof,
    /** !HasMessageId= */ hasMessageId) {
  return exports.getOneofUint64FieldOrUndefined(
             message, fieldNumber, oneof, hasMessageId) != null;
};

/**
 * Returns the presence of a field.
 * @return {boolean}
 */
exports.hasInt64StringField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return exports.getInt64StringFieldOrUndefined(
             message, fieldNumber, hasMessageId) != null;
};

/**
 * Returns the presence of a field.
 * @return {boolean}
 */
exports.hasOneofInt64StringField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyArray<number> */ oneof,
    /** !HasMessageId= */ hasMessageId) {
  return exports.getOneofInt64StringFieldOrUndefined(
             message, fieldNumber, oneof, hasMessageId) != null;
};

/**
 * Returns the presence of a field.
 * @return {boolean}
 */
exports.hasUint64StringField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return exports.getUint64StringFieldOrUndefined(
             message, fieldNumber, hasMessageId) != null;
};

/**
 * Returns the presence of a field.
 * @return {boolean}
 */
exports.hasOneofUint64StringField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyArray<number> */ oneof,
    /** !HasMessageId= */ hasMessageId) {
  return exports.getOneofUint64StringFieldOrUndefined(
             message, fieldNumber, oneof, hasMessageId) != null;
};

/**
 * Returns the presence of a field.
 * @return {boolean}
 */
exports.hasFloatingPointField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return exports.getFloatingPointFieldOrUndefined(
             message, fieldNumber, hasMessageId) != null;
};

/**
 * Returns the presence of a field.
 * @return {boolean}
 */
exports.hasOneofFloatingPointField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyArray<number> */ oneof,
    /** !HasMessageId= */ hasMessageId) {
  return exports.getOneofFloatingPointFieldOrUndefined(
             message, fieldNumber, oneof, hasMessageId) != null;
};

/**
 * Returns the presence of a field.
 * @return {boolean}
 */
exports.hasStringField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return exports.getStringFieldOrUndefined(
             message, fieldNumber, hasMessageId) != null;
};

/**
 * Returns the presence of a field.
 * @return {boolean}
 */
exports.hasOneofStringField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyArray<number> */ oneof,
    /** !HasMessageId= */ hasMessageId) {
  return exports.getOneofStringFieldOrUndefined(
             message, fieldNumber, oneof, hasMessageId) != null;
};

/**
 * Returns the presence of a field.
 * @return {boolean}
 */
exports.hasBytesField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return exports.getBytesFieldOrUndefined(message, fieldNumber, hasMessageId) !=
      null;
};

/**
 * Returns the presence of a field.
 * @return {boolean}
 */
exports.hasOneofBytesField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyArray<number> */ oneof,
    /** !HasMessageId= */ hasMessageId) {
  return exports.getOneofBytesFieldOrUndefined(
             message, fieldNumber, oneof, hasMessageId) != null;
};

/**
 * Returns the presence of a field.
 * @return {boolean}
 */
exports.hasEnumField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber,
    /** !HasMessageId= */ hasMessageId) {
  return exports.getEnumFieldOrUndefined(message, fieldNumber, hasMessageId) !=
      null;
};

/**
 * Returns the presence of a field.
 * @return {boolean}
 */
exports.hasOneofEnumField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyArray<number> */ oneof,
    /** !HasMessageId= */ hasMessageId) {
  return exports.getOneofEnumFieldOrUndefined(
             message, fieldNumber, oneof, hasMessageId) != null;
};

/**
 * Gets the value of a map field.
 * @return {!Map<boolean,boolean>}
 */
exports.getBooleanBooleanMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, booleanKeyToApiForMaps, booleanToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putBooleanBooleanMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getBooleanBooleanMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllBooleanBooleanMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getBooleanBooleanMapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setBooleanBooleanMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllBooleanBooleanMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteBooleanBooleanMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getBooleanBooleanMapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<boolean,number>}
 */
exports.getBooleanInt32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, booleanKeyToApiForMaps, int32ToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putBooleanInt32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getBooleanInt32MapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllBooleanInt32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getBooleanInt32MapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setBooleanInt32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllBooleanInt32MapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteBooleanInt32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getBooleanInt32MapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<boolean,number>}
 */
exports.getBooleanUint32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, booleanKeyToApiForMaps, uint32ToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putBooleanUint32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getBooleanUint32MapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllBooleanUint32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getBooleanUint32MapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setBooleanUint32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllBooleanUint32MapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteBooleanUint32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getBooleanUint32MapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<boolean,number>}
 */
exports.getBooleanInt64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, booleanKeyToApiForMaps, int64ToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putBooleanInt64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getBooleanInt64MapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllBooleanInt64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getBooleanInt64MapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setBooleanInt64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllBooleanInt64MapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteBooleanInt64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getBooleanInt64MapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<boolean,number>}
 */
exports.getBooleanUint64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, booleanKeyToApiForMaps, uint64ToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putBooleanUint64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getBooleanUint64MapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllBooleanUint64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getBooleanUint64MapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setBooleanUint64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllBooleanUint64MapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteBooleanUint64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getBooleanUint64MapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<boolean,number>}
 */
exports.getBooleanFloatingPointMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, booleanKeyToApiForMaps, floatToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putBooleanFloatingPointMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getBooleanFloatingPointMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllBooleanFloatingPointMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getBooleanFloatingPointMapField(
          message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setBooleanFloatingPointMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllBooleanFloatingPointMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteBooleanFloatingPointMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getBooleanFloatingPointMapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<boolean,string>}
 */
exports.getBooleanStringMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, booleanKeyToApiForMaps, stringToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putBooleanStringMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getBooleanStringMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllBooleanStringMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getBooleanStringMapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setBooleanStringMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllBooleanStringMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteBooleanStringMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getBooleanStringMapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<boolean,!ByteString>}
 */
exports.getBooleanBytesMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, booleanKeyToApiForMaps, bytesToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putBooleanBytesMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getBooleanBytesMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllBooleanBytesMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getBooleanBytesMapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setBooleanBytesMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllBooleanBytesMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteBooleanBytesMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getBooleanBytesMapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<boolean,?>}
 */
exports.getBooleanEnumMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, booleanKeyToApiForMaps, enumToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putBooleanEnumMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getBooleanEnumMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllBooleanEnumMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getBooleanEnumMapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setBooleanEnumMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllBooleanEnumMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteBooleanEnumMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getBooleanEnumMapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<boolean,?>}
 */
exports.getReadonlyBooleanWrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ?= */ valueCtor,
    /** !HasMessageId= */ hasMessageId) {
  return getReadonlyMapField(
      message, fieldNumber, valueCtor, booleanKeyToApiForMaps,
      /* valueToApi= */ undefined, hasMessageId);
};

/**
 * Gets the value of a map field.
 * @return {!Map<boolean,?>}
 */
exports.getBooleanWrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ?= */ valueCtor,
    /** !HasMessageId= */ hasMessageId) {
  return getMessageValuedMapField(
      message, fieldNumber, valueCtor, booleanKeyToApiForMaps, hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putBooleanWrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** ?= */ valueCtor, /** !HasMessageId= */ hasMessageId) {
  exports
      .getReadonlyBooleanWrapperMapField(
          message, fieldNumber, valueCtor, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllBooleanWrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** ?= */ valueCtor, /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getReadonlyBooleanWrapperMapField(
          message, fieldNumber, valueCtor, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setBooleanWrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** ?= */ valueCtor, /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllBooleanWrapperMapField(
        message, fieldNumber, newMap, valueCtor, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteBooleanWrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ?= */ valueCtor,
    /** !HasMessageId= */ hasMessageId) {
  exports
      .getReadonlyBooleanWrapperMapField(
          message, fieldNumber, valueCtor, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<boolean,!gbigint>}
 */
exports.getBooleanInt64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, booleanKeyToApiForMaps, int64GbigintToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putBooleanInt64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getBooleanInt64GbigintMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllBooleanInt64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getBooleanInt64GbigintMapField(
          message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setBooleanInt64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllBooleanInt64GbigintMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteBooleanInt64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getBooleanInt64GbigintMapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<boolean,!gbigint>}
 */
exports.getBooleanUint64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, booleanKeyToApiForMaps, uint64GbigintToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putBooleanUint64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getBooleanUint64GbigintMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllBooleanUint64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getBooleanUint64GbigintMapField(
          message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setBooleanUint64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllBooleanUint64GbigintMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteBooleanUint64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getBooleanUint64GbigintMapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,boolean>}
 */
exports.getInt32BooleanMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, int32KeyToApiForMaps, booleanToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putInt32BooleanMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt32BooleanMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllInt32BooleanMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getInt32BooleanMapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setInt32BooleanMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllInt32BooleanMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteInt32BooleanMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt32BooleanMapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,number>}
 */
exports.getInt32Int32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, int32KeyToApiForMaps, int32ToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putInt32Int32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt32Int32MapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllInt32Int32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getInt32Int32MapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setInt32Int32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllInt32Int32MapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteInt32Int32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt32Int32MapField(message, fieldNumber, hasMessageId).delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,number>}
 */
exports.getInt32Uint32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, int32KeyToApiForMaps, uint32ToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putInt32Uint32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt32Uint32MapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllInt32Uint32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getInt32Uint32MapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setInt32Uint32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllInt32Uint32MapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteInt32Uint32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt32Uint32MapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,number>}
 */
exports.getInt32Int64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, int32KeyToApiForMaps, int64ToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putInt32Int64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt32Int64MapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllInt32Int64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getInt32Int64MapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setInt32Int64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllInt32Int64MapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteInt32Int64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt32Int64MapField(message, fieldNumber, hasMessageId).delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,number>}
 */
exports.getInt32Uint64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, int32KeyToApiForMaps, uint64ToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putInt32Uint64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt32Uint64MapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllInt32Uint64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getInt32Uint64MapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setInt32Uint64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllInt32Uint64MapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteInt32Uint64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt32Uint64MapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,number>}
 */
exports.getInt32FloatingPointMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, int32KeyToApiForMaps, floatToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putInt32FloatingPointMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt32FloatingPointMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllInt32FloatingPointMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getInt32FloatingPointMapField(
          message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setInt32FloatingPointMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllInt32FloatingPointMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteInt32FloatingPointMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt32FloatingPointMapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,string>}
 */
exports.getInt32StringMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, int32KeyToApiForMaps, stringToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putInt32StringMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt32StringMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllInt32StringMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getInt32StringMapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setInt32StringMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllInt32StringMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteInt32StringMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt32StringMapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,!ByteString>}
 */
exports.getInt32BytesMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, int32KeyToApiForMaps, bytesToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putInt32BytesMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt32BytesMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllInt32BytesMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getInt32BytesMapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setInt32BytesMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllInt32BytesMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteInt32BytesMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt32BytesMapField(message, fieldNumber, hasMessageId).delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,?>}
 */
exports.getInt32EnumMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, int32KeyToApiForMaps, enumToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putInt32EnumMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt32EnumMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllInt32EnumMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getInt32EnumMapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setInt32EnumMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllInt32EnumMapField(message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteInt32EnumMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt32EnumMapField(message, fieldNumber, hasMessageId).delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,?>}
 */
exports.getReadonlyInt32WrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ?= */ valueCtor,
    /** !HasMessageId= */ hasMessageId) {
  return getReadonlyMapField(
      message, fieldNumber, valueCtor, int32KeyToApiForMaps,
      /* valueToApi= */ undefined, hasMessageId);
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,?>}
 */
exports.getInt32WrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ?= */ valueCtor,
    /** !HasMessageId= */ hasMessageId) {
  return getMessageValuedMapField(
      message, fieldNumber, valueCtor, int32KeyToApiForMaps, hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putInt32WrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** ?= */ valueCtor, /** !HasMessageId= */ hasMessageId) {
  exports
      .getReadonlyInt32WrapperMapField(
          message, fieldNumber, valueCtor, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllInt32WrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** ?= */ valueCtor, /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getReadonlyInt32WrapperMapField(
          message, fieldNumber, valueCtor, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setInt32WrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** ?= */ valueCtor, /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllInt32WrapperMapField(
        message, fieldNumber, newMap, valueCtor, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteInt32WrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ?= */ valueCtor,
    /** !HasMessageId= */ hasMessageId) {
  exports
      .getReadonlyInt32WrapperMapField(
          message, fieldNumber, valueCtor, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,!gbigint>}
 */
exports.getInt32Int64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, int32KeyToApiForMaps, int64GbigintToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putInt32Int64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt32Int64GbigintMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllInt32Int64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getInt32Int64GbigintMapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setInt32Int64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllInt32Int64GbigintMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteInt32Int64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt32Int64GbigintMapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,!gbigint>}
 */
exports.getInt32Uint64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, int32KeyToApiForMaps, uint64GbigintToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putInt32Uint64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt32Uint64GbigintMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllInt32Uint64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getInt32Uint64GbigintMapField(
          message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setInt32Uint64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllInt32Uint64GbigintMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteInt32Uint64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt32Uint64GbigintMapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,boolean>}
 */
exports.getUint32BooleanMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, uint32KeyToApiForMaps, booleanToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putUint32BooleanMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint32BooleanMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllUint32BooleanMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getUint32BooleanMapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setUint32BooleanMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllUint32BooleanMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteUint32BooleanMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint32BooleanMapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,number>}
 */
exports.getUint32Int32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, uint32KeyToApiForMaps, int32ToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putUint32Int32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint32Int32MapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllUint32Int32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getUint32Int32MapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setUint32Int32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllUint32Int32MapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteUint32Int32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint32Int32MapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,number>}
 */
exports.getUint32Uint32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, uint32KeyToApiForMaps, uint32ToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putUint32Uint32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint32Uint32MapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllUint32Uint32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getUint32Uint32MapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setUint32Uint32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllUint32Uint32MapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteUint32Uint32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint32Uint32MapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,number>}
 */
exports.getUint32Int64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, uint32KeyToApiForMaps, int64ToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putUint32Int64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint32Int64MapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllUint32Int64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getUint32Int64MapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setUint32Int64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllUint32Int64MapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteUint32Int64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint32Int64MapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,number>}
 */
exports.getUint32Uint64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, uint32KeyToApiForMaps, uint64ToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putUint32Uint64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint32Uint64MapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllUint32Uint64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getUint32Uint64MapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setUint32Uint64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllUint32Uint64MapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteUint32Uint64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint32Uint64MapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,number>}
 */
exports.getUint32FloatingPointMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, uint32KeyToApiForMaps, floatToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putUint32FloatingPointMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint32FloatingPointMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllUint32FloatingPointMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getUint32FloatingPointMapField(
          message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setUint32FloatingPointMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllUint32FloatingPointMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteUint32FloatingPointMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint32FloatingPointMapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,string>}
 */
exports.getUint32StringMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, uint32KeyToApiForMaps, stringToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putUint32StringMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint32StringMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllUint32StringMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getUint32StringMapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setUint32StringMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllUint32StringMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteUint32StringMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint32StringMapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,!ByteString>}
 */
exports.getUint32BytesMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, uint32KeyToApiForMaps, bytesToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putUint32BytesMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint32BytesMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllUint32BytesMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getUint32BytesMapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setUint32BytesMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllUint32BytesMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteUint32BytesMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint32BytesMapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,?>}
 */
exports.getUint32EnumMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, uint32KeyToApiForMaps, enumToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putUint32EnumMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint32EnumMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllUint32EnumMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getUint32EnumMapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setUint32EnumMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllUint32EnumMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteUint32EnumMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint32EnumMapField(message, fieldNumber, hasMessageId).delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,?>}
 */
exports.getReadonlyUint32WrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ?= */ valueCtor,
    /** !HasMessageId= */ hasMessageId) {
  return getReadonlyMapField(
      message, fieldNumber, valueCtor, uint32KeyToApiForMaps,
      /* valueToApi= */ undefined, hasMessageId);
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,?>}
 */
exports.getUint32WrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ?= */ valueCtor,
    /** !HasMessageId= */ hasMessageId) {
  return getMessageValuedMapField(
      message, fieldNumber, valueCtor, uint32KeyToApiForMaps, hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putUint32WrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** ?= */ valueCtor, /** !HasMessageId= */ hasMessageId) {
  exports
      .getReadonlyUint32WrapperMapField(
          message, fieldNumber, valueCtor, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllUint32WrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** ?= */ valueCtor, /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getReadonlyUint32WrapperMapField(
          message, fieldNumber, valueCtor, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setUint32WrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** ?= */ valueCtor, /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllUint32WrapperMapField(
        message, fieldNumber, newMap, valueCtor, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteUint32WrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ?= */ valueCtor,
    /** !HasMessageId= */ hasMessageId) {
  exports
      .getReadonlyUint32WrapperMapField(
          message, fieldNumber, valueCtor, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,!gbigint>}
 */
exports.getUint32Int64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, uint32KeyToApiForMaps, int64GbigintToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putUint32Int64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint32Int64GbigintMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllUint32Int64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getUint32Int64GbigintMapField(
          message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setUint32Int64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllUint32Int64GbigintMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteUint32Int64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint32Int64GbigintMapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,!gbigint>}
 */
exports.getUint32Uint64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, uint32KeyToApiForMaps, uint64GbigintToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putUint32Uint64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint32Uint64GbigintMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllUint32Uint64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getUint32Uint64GbigintMapField(
          message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setUint32Uint64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllUint32Uint64GbigintMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteUint32Uint64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint32Uint64GbigintMapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,boolean>}
 */
exports.getInt64BooleanMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, int64KeyToApiForMaps, booleanToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putInt64BooleanMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt64BooleanMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllInt64BooleanMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getInt64BooleanMapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setInt64BooleanMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllInt64BooleanMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteInt64BooleanMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt64BooleanMapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,number>}
 */
exports.getInt64Int32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, int64KeyToApiForMaps, int32ToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putInt64Int32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt64Int32MapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllInt64Int32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getInt64Int32MapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setInt64Int32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllInt64Int32MapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteInt64Int32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt64Int32MapField(message, fieldNumber, hasMessageId).delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,number>}
 */
exports.getInt64Uint32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, int64KeyToApiForMaps, uint32ToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putInt64Uint32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt64Uint32MapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllInt64Uint32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getInt64Uint32MapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setInt64Uint32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllInt64Uint32MapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteInt64Uint32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt64Uint32MapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,number>}
 */
exports.getInt64Int64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, int64KeyToApiForMaps, int64ToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putInt64Int64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt64Int64MapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllInt64Int64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getInt64Int64MapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setInt64Int64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllInt64Int64MapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteInt64Int64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt64Int64MapField(message, fieldNumber, hasMessageId).delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,number>}
 */
exports.getInt64Uint64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, int64KeyToApiForMaps, uint64ToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putInt64Uint64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt64Uint64MapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllInt64Uint64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getInt64Uint64MapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setInt64Uint64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllInt64Uint64MapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteInt64Uint64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt64Uint64MapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,number>}
 */
exports.getInt64FloatingPointMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, int64KeyToApiForMaps, floatToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putInt64FloatingPointMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt64FloatingPointMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllInt64FloatingPointMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getInt64FloatingPointMapField(
          message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setInt64FloatingPointMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllInt64FloatingPointMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteInt64FloatingPointMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt64FloatingPointMapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,string>}
 */
exports.getInt64StringMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, int64KeyToApiForMaps, stringToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putInt64StringMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt64StringMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllInt64StringMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getInt64StringMapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setInt64StringMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllInt64StringMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteInt64StringMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt64StringMapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,!ByteString>}
 */
exports.getInt64BytesMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, int64KeyToApiForMaps, bytesToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putInt64BytesMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt64BytesMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllInt64BytesMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getInt64BytesMapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setInt64BytesMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllInt64BytesMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteInt64BytesMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt64BytesMapField(message, fieldNumber, hasMessageId).delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,?>}
 */
exports.getInt64EnumMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, int64KeyToApiForMaps, enumToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putInt64EnumMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt64EnumMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllInt64EnumMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getInt64EnumMapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setInt64EnumMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllInt64EnumMapField(message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteInt64EnumMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt64EnumMapField(message, fieldNumber, hasMessageId).delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,?>}
 */
exports.getReadonlyInt64WrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ?= */ valueCtor,
    /** !HasMessageId= */ hasMessageId) {
  return getReadonlyMapField(
      message, fieldNumber, valueCtor, int64KeyToApiForMaps,
      /* valueToApi= */ undefined, hasMessageId);
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,?>}
 */
exports.getInt64WrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ?= */ valueCtor,
    /** !HasMessageId= */ hasMessageId) {
  return getMessageValuedMapField(
      message, fieldNumber, valueCtor, int64KeyToApiForMaps, hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putInt64WrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** ?= */ valueCtor, /** !HasMessageId= */ hasMessageId) {
  exports
      .getReadonlyInt64WrapperMapField(
          message, fieldNumber, valueCtor, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllInt64WrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** ?= */ valueCtor, /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getReadonlyInt64WrapperMapField(
          message, fieldNumber, valueCtor, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setInt64WrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** ?= */ valueCtor, /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllInt64WrapperMapField(
        message, fieldNumber, newMap, valueCtor, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteInt64WrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ?= */ valueCtor,
    /** !HasMessageId= */ hasMessageId) {
  exports
      .getReadonlyInt64WrapperMapField(
          message, fieldNumber, valueCtor, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,boolean>}
 */
exports.getUint64BooleanMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, uint64KeyToApiForMaps, booleanToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putUint64BooleanMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint64BooleanMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllUint64BooleanMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getUint64BooleanMapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setUint64BooleanMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllUint64BooleanMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteUint64BooleanMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint64BooleanMapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,number>}
 */
exports.getUint64Int32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, uint64KeyToApiForMaps, int32ToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putUint64Int32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint64Int32MapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllUint64Int32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getUint64Int32MapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setUint64Int32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllUint64Int32MapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteUint64Int32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint64Int32MapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,number>}
 */
exports.getUint64Uint32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, uint64KeyToApiForMaps, uint32ToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putUint64Uint32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint64Uint32MapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllUint64Uint32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getUint64Uint32MapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setUint64Uint32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllUint64Uint32MapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteUint64Uint32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint64Uint32MapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,number>}
 */
exports.getUint64Int64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, uint64KeyToApiForMaps, int64ToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putUint64Int64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint64Int64MapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllUint64Int64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getUint64Int64MapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setUint64Int64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllUint64Int64MapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteUint64Int64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint64Int64MapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,number>}
 */
exports.getUint64Uint64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, uint64KeyToApiForMaps, uint64ToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putUint64Uint64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint64Uint64MapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllUint64Uint64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getUint64Uint64MapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setUint64Uint64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllUint64Uint64MapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteUint64Uint64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint64Uint64MapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,number>}
 */
exports.getUint64FloatingPointMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, uint64KeyToApiForMaps, floatToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putUint64FloatingPointMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint64FloatingPointMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllUint64FloatingPointMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getUint64FloatingPointMapField(
          message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setUint64FloatingPointMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllUint64FloatingPointMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteUint64FloatingPointMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint64FloatingPointMapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,string>}
 */
exports.getUint64StringMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, uint64KeyToApiForMaps, stringToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putUint64StringMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint64StringMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllUint64StringMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getUint64StringMapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setUint64StringMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllUint64StringMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteUint64StringMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint64StringMapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,!ByteString>}
 */
exports.getUint64BytesMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, uint64KeyToApiForMaps, bytesToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putUint64BytesMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint64BytesMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllUint64BytesMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getUint64BytesMapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setUint64BytesMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllUint64BytesMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteUint64BytesMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint64BytesMapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,?>}
 */
exports.getUint64EnumMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, uint64KeyToApiForMaps, enumToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putUint64EnumMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint64EnumMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllUint64EnumMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getUint64EnumMapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setUint64EnumMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllUint64EnumMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteUint64EnumMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint64EnumMapField(message, fieldNumber, hasMessageId).delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,?>}
 */
exports.getReadonlyUint64WrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ?= */ valueCtor,
    /** !HasMessageId= */ hasMessageId) {
  return getReadonlyMapField(
      message, fieldNumber, valueCtor, uint64KeyToApiForMaps,
      /* valueToApi= */ undefined, hasMessageId);
};

/**
 * Gets the value of a map field.
 * @return {!Map<number,?>}
 */
exports.getUint64WrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ?= */ valueCtor,
    /** !HasMessageId= */ hasMessageId) {
  return getMessageValuedMapField(
      message, fieldNumber, valueCtor, uint64KeyToApiForMaps, hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putUint64WrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** ?= */ valueCtor, /** !HasMessageId= */ hasMessageId) {
  exports
      .getReadonlyUint64WrapperMapField(
          message, fieldNumber, valueCtor, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllUint64WrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** ?= */ valueCtor, /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getReadonlyUint64WrapperMapField(
          message, fieldNumber, valueCtor, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setUint64WrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** ?= */ valueCtor, /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllUint64WrapperMapField(
        message, fieldNumber, newMap, valueCtor, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteUint64WrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ?= */ valueCtor,
    /** !HasMessageId= */ hasMessageId) {
  exports
      .getReadonlyUint64WrapperMapField(
          message, fieldNumber, valueCtor, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<string,boolean>}
 */
exports.getStringBooleanMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, stringKeyToApiForMaps, booleanToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putStringBooleanMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getStringBooleanMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllStringBooleanMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getStringBooleanMapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setStringBooleanMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllStringBooleanMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteStringBooleanMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getStringBooleanMapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<string,number>}
 */
exports.getStringInt32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, stringKeyToApiForMaps, int32ToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putStringInt32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getStringInt32MapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllStringInt32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getStringInt32MapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setStringInt32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllStringInt32MapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteStringInt32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getStringInt32MapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<string,number>}
 */
exports.getStringUint32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, stringKeyToApiForMaps, uint32ToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putStringUint32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getStringUint32MapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllStringUint32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getStringUint32MapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setStringUint32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllStringUint32MapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteStringUint32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getStringUint32MapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<string,number>}
 */
exports.getStringInt64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, stringKeyToApiForMaps, int64ToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putStringInt64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getStringInt64MapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllStringInt64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getStringInt64MapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setStringInt64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllStringInt64MapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteStringInt64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getStringInt64MapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<string,number>}
 */
exports.getStringUint64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, stringKeyToApiForMaps, uint64ToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putStringUint64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getStringUint64MapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllStringUint64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getStringUint64MapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setStringUint64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllStringUint64MapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteStringUint64MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getStringUint64MapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<string,number>}
 */
exports.getStringFloatingPointMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, stringKeyToApiForMaps, floatToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putStringFloatingPointMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getStringFloatingPointMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllStringFloatingPointMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getStringFloatingPointMapField(
          message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setStringFloatingPointMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllStringFloatingPointMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteStringFloatingPointMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getStringFloatingPointMapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<string,string>}
 */
exports.getStringStringMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, stringKeyToApiForMaps, stringToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putStringStringMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getStringStringMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllStringStringMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getStringStringMapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setStringStringMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllStringStringMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteStringStringMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getStringStringMapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<string,!ByteString>}
 */
exports.getStringBytesMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, stringKeyToApiForMaps, bytesToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putStringBytesMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getStringBytesMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllStringBytesMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getStringBytesMapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setStringBytesMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllStringBytesMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteStringBytesMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getStringBytesMapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<string,?>}
 */
exports.getStringEnumMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, stringKeyToApiForMaps, enumToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putStringEnumMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getStringEnumMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllStringEnumMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getStringEnumMapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setStringEnumMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllStringEnumMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteStringEnumMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getStringEnumMapField(message, fieldNumber, hasMessageId).delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<string,?>}
 */
exports.getReadonlyStringWrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ?= */ valueCtor,
    /** !HasMessageId= */ hasMessageId) {
  return getReadonlyMapField(
      message, fieldNumber, valueCtor, stringKeyToApiForMaps,
      /* valueToApi= */ undefined, hasMessageId);
};

/**
 * Gets the value of a map field.
 * @return {!Map<string,?>}
 */
exports.getStringWrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ?= */ valueCtor,
    /** !HasMessageId= */ hasMessageId) {
  return getMessageValuedMapField(
      message, fieldNumber, valueCtor, stringKeyToApiForMaps, hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putStringWrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** ?= */ valueCtor, /** !HasMessageId= */ hasMessageId) {
  exports
      .getReadonlyStringWrapperMapField(
          message, fieldNumber, valueCtor, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllStringWrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** ?= */ valueCtor, /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getReadonlyStringWrapperMapField(
          message, fieldNumber, valueCtor, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setStringWrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** ?= */ valueCtor, /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllStringWrapperMapField(
        message, fieldNumber, newMap, valueCtor, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteStringWrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ?= */ valueCtor,
    /** !HasMessageId= */ hasMessageId) {
  exports
      .getReadonlyStringWrapperMapField(
          message, fieldNumber, valueCtor, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<string,!gbigint>}
 */
exports.getStringInt64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, stringKeyToApiForMaps, int64GbigintToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putStringInt64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getStringInt64GbigintMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllStringInt64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getStringInt64GbigintMapField(
          message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setStringInt64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllStringInt64GbigintMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteStringInt64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getStringInt64GbigintMapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<string,!gbigint>}
 */
exports.getStringUint64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, stringKeyToApiForMaps, uint64GbigintToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putStringUint64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getStringUint64GbigintMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllStringUint64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getStringUint64GbigintMapField(
          message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setStringUint64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllStringUint64GbigintMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteStringUint64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getStringUint64GbigintMapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<!gbigint,boolean>}
 */
exports.getInt64GbigintBooleanMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, int64GbigintKeyToApiForMaps, booleanToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putInt64GbigintBooleanMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt64GbigintBooleanMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllInt64GbigintBooleanMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getInt64GbigintBooleanMapField(
          message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setInt64GbigintBooleanMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllInt64GbigintBooleanMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteInt64GbigintBooleanMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt64GbigintBooleanMapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<!gbigint,number>}
 */
exports.getInt64GbigintInt32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, int64GbigintKeyToApiForMaps, int32ToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putInt64GbigintInt32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt64GbigintInt32MapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllInt64GbigintInt32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getInt64GbigintInt32MapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setInt64GbigintInt32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllInt64GbigintInt32MapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteInt64GbigintInt32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt64GbigintInt32MapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<!gbigint,number>}
 */
exports.getInt64GbigintUint32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, int64GbigintKeyToApiForMaps, uint32ToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putInt64GbigintUint32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt64GbigintUint32MapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllInt64GbigintUint32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getInt64GbigintUint32MapField(
          message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setInt64GbigintUint32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllInt64GbigintUint32MapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteInt64GbigintUint32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt64GbigintUint32MapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<!gbigint,number>}
 */
exports.getInt64GbigintFloatingPointMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, int64GbigintKeyToApiForMaps, floatToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putInt64GbigintFloatingPointMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports
      .getInt64GbigintFloatingPointMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllInt64GbigintFloatingPointMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getInt64GbigintFloatingPointMapField(
          message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setInt64GbigintFloatingPointMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllInt64GbigintFloatingPointMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteInt64GbigintFloatingPointMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports
      .getInt64GbigintFloatingPointMapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<!gbigint,string>}
 */
exports.getInt64GbigintStringMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, int64GbigintKeyToApiForMaps, stringToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putInt64GbigintStringMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt64GbigintStringMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllInt64GbigintStringMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getInt64GbigintStringMapField(
          message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setInt64GbigintStringMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllInt64GbigintStringMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteInt64GbigintStringMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt64GbigintStringMapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<!gbigint,!ByteString>}
 */
exports.getInt64GbigintBytesMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, int64GbigintKeyToApiForMaps, bytesToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putInt64GbigintBytesMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt64GbigintBytesMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllInt64GbigintBytesMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getInt64GbigintBytesMapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setInt64GbigintBytesMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllInt64GbigintBytesMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteInt64GbigintBytesMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt64GbigintBytesMapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<!gbigint,?>}
 */
exports.getInt64GbigintEnumMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, int64GbigintKeyToApiForMaps, enumToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putInt64GbigintEnumMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt64GbigintEnumMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllInt64GbigintEnumMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getInt64GbigintEnumMapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setInt64GbigintEnumMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllInt64GbigintEnumMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteInt64GbigintEnumMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getInt64GbigintEnumMapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<!gbigint,?>}
 */
exports.getReadonlyInt64GbigintWrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ?= */ valueCtor,
    /** !HasMessageId= */ hasMessageId) {
  return getReadonlyMapField(
      message, fieldNumber, valueCtor, int64GbigintKeyToApiForMaps,
      /* valueToApi= */ undefined, hasMessageId);
};

/**
 * Gets the value of a map field.
 * @return {!Map<!gbigint,?>}
 */
exports.getInt64GbigintWrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ?= */ valueCtor,
    /** !HasMessageId= */ hasMessageId) {
  return getMessageValuedMapField(
      message, fieldNumber, valueCtor, int64GbigintKeyToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putInt64GbigintWrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** ?= */ valueCtor, /** !HasMessageId= */ hasMessageId) {
  exports
      .getReadonlyInt64GbigintWrapperMapField(
          message, fieldNumber, valueCtor, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllInt64GbigintWrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** ?= */ valueCtor, /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getReadonlyInt64GbigintWrapperMapField(
          message, fieldNumber, valueCtor, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setInt64GbigintWrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** ?= */ valueCtor, /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllInt64GbigintWrapperMapField(
        message, fieldNumber, newMap, valueCtor, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteInt64GbigintWrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ?= */ valueCtor,
    /** !HasMessageId= */ hasMessageId) {
  exports
      .getReadonlyInt64GbigintWrapperMapField(
          message, fieldNumber, valueCtor, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<!gbigint,!gbigint>}
 */
exports.getInt64GbigintInt64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, int64GbigintKeyToApiForMaps,
      int64GbigintToApiForMaps, hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putInt64GbigintInt64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports
      .getInt64GbigintInt64GbigintMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllInt64GbigintInt64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getInt64GbigintInt64GbigintMapField(
          message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setInt64GbigintInt64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllInt64GbigintInt64GbigintMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteInt64GbigintInt64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports
      .getInt64GbigintInt64GbigintMapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<!gbigint,!gbigint>}
 */
exports.getInt64GbigintUint64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, int64GbigintKeyToApiForMaps,
      uint64GbigintToApiForMaps, hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putInt64GbigintUint64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports
      .getInt64GbigintUint64GbigintMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllInt64GbigintUint64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getInt64GbigintUint64GbigintMapField(
          message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setInt64GbigintUint64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllInt64GbigintUint64GbigintMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteInt64GbigintUint64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports
      .getInt64GbigintUint64GbigintMapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<!gbigint,boolean>}
 */
exports.getUint64GbigintBooleanMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, uint64GbigintKeyToApiForMaps, booleanToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putUint64GbigintBooleanMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint64GbigintBooleanMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllUint64GbigintBooleanMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getUint64GbigintBooleanMapField(
          message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setUint64GbigintBooleanMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllUint64GbigintBooleanMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteUint64GbigintBooleanMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint64GbigintBooleanMapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<!gbigint,number>}
 */
exports.getUint64GbigintInt32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, uint64GbigintKeyToApiForMaps, int32ToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putUint64GbigintInt32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint64GbigintInt32MapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllUint64GbigintInt32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getUint64GbigintInt32MapField(
          message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setUint64GbigintInt32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllUint64GbigintInt32MapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteUint64GbigintInt32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint64GbigintInt32MapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<!gbigint,number>}
 */
exports.getUint64GbigintUint32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, uint64GbigintKeyToApiForMaps, uint32ToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putUint64GbigintUint32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint64GbigintUint32MapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllUint64GbigintUint32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getUint64GbigintUint32MapField(
          message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setUint64GbigintUint32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllUint64GbigintUint32MapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteUint64GbigintUint32MapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint64GbigintUint32MapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<!gbigint,number>}
 */
exports.getUint64GbigintFloatingPointMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, uint64GbigintKeyToApiForMaps, floatToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putUint64GbigintFloatingPointMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports
      .getUint64GbigintFloatingPointMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllUint64GbigintFloatingPointMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getUint64GbigintFloatingPointMapField(
          message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setUint64GbigintFloatingPointMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllUint64GbigintFloatingPointMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteUint64GbigintFloatingPointMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports
      .getUint64GbigintFloatingPointMapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<!gbigint,string>}
 */
exports.getUint64GbigintStringMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, uint64GbigintKeyToApiForMaps, stringToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putUint64GbigintStringMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint64GbigintStringMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllUint64GbigintStringMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getUint64GbigintStringMapField(
          message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setUint64GbigintStringMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllUint64GbigintStringMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteUint64GbigintStringMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint64GbigintStringMapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<!gbigint,!ByteString>}
 */
exports.getUint64GbigintBytesMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, uint64GbigintKeyToApiForMaps, bytesToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putUint64GbigintBytesMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint64GbigintBytesMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllUint64GbigintBytesMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getUint64GbigintBytesMapField(
          message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setUint64GbigintBytesMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllUint64GbigintBytesMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteUint64GbigintBytesMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint64GbigintBytesMapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<!gbigint,?>}
 */
exports.getUint64GbigintEnumMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, uint64GbigintKeyToApiForMaps, enumToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putUint64GbigintEnumMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint64GbigintEnumMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllUint64GbigintEnumMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getUint64GbigintEnumMapField(message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setUint64GbigintEnumMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllUint64GbigintEnumMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteUint64GbigintEnumMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports.getUint64GbigintEnumMapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<!gbigint,?>}
 */
exports.getReadonlyUint64GbigintWrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ?= */ valueCtor,
    /** !HasMessageId= */ hasMessageId) {
  return getReadonlyMapField(
      message, fieldNumber, valueCtor, uint64GbigintKeyToApiForMaps,
      /* valueToApi= */ undefined, hasMessageId);
};

/**
 * Gets the value of a map field.
 * @return {!Map<!gbigint,?>}
 */
exports.getUint64GbigintWrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ?= */ valueCtor,
    /** !HasMessageId= */ hasMessageId) {
  return getMessageValuedMapField(
      message, fieldNumber, valueCtor, uint64GbigintKeyToApiForMaps,
      hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putUint64GbigintWrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** ?= */ valueCtor, /** !HasMessageId= */ hasMessageId) {
  exports
      .getReadonlyUint64GbigintWrapperMapField(
          message, fieldNumber, valueCtor, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllUint64GbigintWrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** ?= */ valueCtor, /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getReadonlyUint64GbigintWrapperMapField(
          message, fieldNumber, valueCtor, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setUint64GbigintWrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** ?= */ valueCtor, /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllUint64GbigintWrapperMapField(
        message, fieldNumber, newMap, valueCtor, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteUint64GbigintWrapperMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ?= */ valueCtor,
    /** !HasMessageId= */ hasMessageId) {
  exports
      .getReadonlyUint64GbigintWrapperMapField(
          message, fieldNumber, valueCtor, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<!gbigint,!gbigint>}
 */
exports.getUint64GbigintInt64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, uint64GbigintKeyToApiForMaps,
      int64GbigintToApiForMaps, hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putUint64GbigintInt64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports
      .getUint64GbigintInt64GbigintMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllUint64GbigintInt64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getUint64GbigintInt64GbigintMapField(
          message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setUint64GbigintInt64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllUint64GbigintInt64GbigintMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteUint64GbigintInt64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports
      .getUint64GbigintInt64GbigintMapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

/**
 * Gets the value of a map field.
 * @return {!Map<!gbigint,!gbigint>}
 */
exports.getUint64GbigintUint64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !HasMessageId= */ hasMessageId) {
  return getPrimitiveMapField(
      message, fieldNumber, uint64GbigintKeyToApiForMaps,
      uint64GbigintToApiForMaps, hasMessageId);
};

/**
 * Sets a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.putUint64GbigintUint64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key, /** ? */ value,
    /** !HasMessageId= */ hasMessageId) {
  exports
      .getUint64GbigintUint64GbigintMapField(message, fieldNumber, hasMessageId)
      .set(key, value);
  return message;
};

/**
 * Sets all entries from the passed in map.
 * @return {T}
 * @template T
 */
exports.putAllUint64GbigintUint64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?> */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  ensureMutable(message);
  newMap.forEach(
      mapSetter,
      exports.getUint64GbigintUint64GbigintMapField(
          message, fieldNumber, hasMessageId));
  return message;
};

/**
 * Replaces entries with the passed in map.
 * @return {?}
 */
exports.setUint64GbigintUint64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** !ReadonlyMap<?, ?>|undefined */ newMap,
    /** !HasMessageId= */ hasMessageId) {
  exports.clearMapField(message, fieldNumber, hasMessageId);
  if (newMap) {
    exports.putAllUint64GbigintUint64GbigintMapField(
        message, fieldNumber, newMap, hasMessageId);
  }
  return message;
};

/**
 * Deletes a single entry of a map field.
 * @return {T}
 * @template T
 */
exports.deleteUint64GbigintUint64GbigintMapField = function(
    /** !InternalMessage */ message,
    /** number */ fieldNumber, /** ? */ key,
    /** !HasMessageId= */ hasMessageId) {
  exports
      .getUint64GbigintUint64GbigintMapField(message, fieldNumber, hasMessageId)
      .delete(key);
  return message;
};

// END AUTO-GENERATED
// //////////////////////////////////////////////////////////
