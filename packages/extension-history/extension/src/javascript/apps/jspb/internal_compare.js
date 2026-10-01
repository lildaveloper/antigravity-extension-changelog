/**
 * @fileoverview Holds the implementation of Message.equals
 * @package
 *
 * DO NOT USE THIS OUTSIDE OF THIS PACKAGE.
 */
goog.module('jspb.internal_compare');

const {ArrayStateFlags, getArrayIndexOffset, getArrayState} = goog.require('jspb.internal_array_state');
const {ByteString} = goog.require('jspb.bytestring');
const {COMPARISON_TYPE_INFO_SYMBOL: COMPARISON_TYPE_INFO_SYMBOL_INTERNAL} = goog.require('jspb.internal_symbols');
const {ComparisonTypeInfo, InternalMessage, fieldNumberFromIndex, getInternalArray, hasOwnPropertyIfNotTrusted, isEmptyRepeatedField, isMessage, isRepeatedFieldInSet, isSparseObject} = goog.require('jspb.internal');
const {DETAILED_JSPB_ASSERTS} = goog.require('jspb.internal_options');
const {JspbMap} = goog.requireType('jspb.internal_map');
const {assert} = goog.require('goog.asserts');
const {decodeByteArray, isU8, uint8ArrayEquals} = goog.require('jspb.internal_bytes');
const {logOperation} = goog.require('jspb.internal_operations');

const /** symbol|undefined */ COMPARISON_TYPE_INFO_SYMBOL =
    goog.weakUsage(COMPARISON_TYPE_INFO_SYMBOL_INTERNAL);

/**
 * @param {!Uint8Array} a The uint8 array to comapre
 * @param {?} b value to compare, only `string` and `Uint8Array` values can
 *     possibly compare as equal.
 *  @return {boolean}
 */
function maybeCompareUint8Arrays(a, b) {
  if (typeof b === 'string') {
    try {
      b = decodeByteArray(b);
    } catch (e) {
      return false;
    }
  }
  return isU8(b) && uint8ArrayEquals(a, /** @type{!Uint8Array}*/ (b));
}

/**
 * @param {string} typeofValue The typeof string for some value
 * @return {boolean}
 */
function bigintOrStringOrNumber(typeofValue) {
  switch (typeofValue) {
    case 'bigint':
    case 'string':
    case 'number':
      return true;
    default:
      return false;
  }
}

/** @enum */
const ValueType = {
  /**
   * We are comparing something else, which might be a repeated or message
   * array.
   */
  UNKNOWN: 0,
  /** We are comparing arrays known to correspond to a repeated or map field. */
  REPEATED_ARRAY: 1,
  /** We are comparing arrays known to correspond to a message field. */
  MESSAGE_ARRAY: 2,
};

/**
 * @param {!Object} a
 * @param {!Object} b
 * @return {boolean}
 */
function compareMessages(a, b) {
  let /** !ComparisonTypeInfo|undefined */ comparisonTypeInfo;
  let /** !Array<?>|null|undefined */ aArr;
  let /** !Array<?>|null|undefined */ bArr;
  if (isMessage(a)) {
    const aMsg = /** @type {!InternalMessage} */ (a);
    aArr = getInternalArray(aMsg);
    if (COMPARISON_TYPE_INFO_SYMBOL) {
      comparisonTypeInfo ??= aArr[COMPARISON_TYPE_INFO_SYMBOL];
    }
  } else if (Array.isArray(a)) {
    aArr = /** @type {!Array<?>|null|undefined} */ (a);
  } else {
    return false;
  }

  if (isMessage(b)) {
    const bMsg = /** @type {!InternalMessage} */ (b);
    bArr = getInternalArray(bMsg);
    if (COMPARISON_TYPE_INFO_SYMBOL) {
      comparisonTypeInfo ??= bArr[COMPARISON_TYPE_INFO_SYMBOL];
    }
  } else if (Array.isArray(b)) {
    bArr = /** @type {!Array<?>|null|undefined} */ (b);
  } else {
    return false;
  }

  return compareFieldsInternal(
      aArr, bArr, comparisonTypeInfo,
      /* valueType = */ ValueType.MESSAGE_ARRAY);
}

/**
 * Compares two message fields recursively.
 * @param {*} field1 The first field.
 * @param {*} field2 The second field.
 * @param {!ComparisonTypeInfo=} comparisonTypeInfo
 * @return {boolean} true if the fields are null/undefined, or otherwise equal.
 */
function compareFields(field1, field2, comparisonTypeInfo) {
  return compareFieldsInternal(
      field1, field2, comparisonTypeInfo, ValueType.UNKNOWN);
}

/**
 * Compares two message fields recursively.
 * @param {*} field1 The first field.
 * @param {*} field2 The second field.
 * @param {!ComparisonTypeInfo|undefined} comparisonTypeInfo
 * @param {!ValueType} valueType describes the type of our values, if we know
 *     them to be message arrays or repeated fields.
 * @return {boolean} true if the fields are null/undefined, or otherwise equal.
 * @suppress {visibility} access to map internals.
 */
function compareFieldsInternal(field1, field2, comparisonTypeInfo, valueType) {
  if (DETAILED_JSPB_ASSERTS) {
    logOperation({internalCompareFields: 1});
  }

  // If the fields are identical, they're equal.
  if (field1 === field2) {
    return true;
  }

  // If the fields are both nullish they're equal.
  if (field1 == null && field2 == null) {
    return true;
  }

  // Also specialize map comparisons, including against nulls.
  // TODO(b/273580687): avoid this instanceof check.
  if (field1 instanceof Map) {
    return /** @type {!JspbMap} */ (field1).internalMapComparator(
        field2, comparisonTypeInfo);
  }
  if (field2 instanceof Map) {
    return /** @type {!JspbMap} */ (field2).internalMapComparator(
        field1, comparisonTypeInfo);
  }

  // Other than maps, comparing any value against null fails.
  if (field1 == null || field2 == null) {
    return false;
  }

  // This allows for ByteString|Uint8Array|string to compare as equal, so it
  // needs to come before the typeof test.
  // TODO(b/273580687): avoid this instanceof check.
  if (field1 instanceof ByteString) {
    return field1.internalCompareEqualsDoNotUse(field2);
  }
  if (field2 instanceof ByteString) {
    return field2.internalCompareEqualsDoNotUse(field1);
  }

  // We test bytestrings before uint8arrays so these operators don't have to
  // consider them.
  // TODO(b/385213186); this case is rare and only related to old client
  // side serializations. We should be able to eventually remove it.
  if (isU8(field1)) {
    return maybeCompareUint8Arrays(/** @type {!Uint8Array} */ (field1), field2);
  }
  if (isU8(field2)) {
    return maybeCompareUint8Arrays(/** @type {!Uint8Array} */ (field2), field1);
  }

  const typeofField1 = typeof field1;
  const typeofField2 = typeof field2;
  if (typeofField1 !== 'object' || typeofField2 !== 'object') {
    // NaN != NaN so we cover this case.
    if (Number.isNaN(field1) || Number.isNaN(field2)) {
      // One of the fields might be a string "NaN".
      //
      // We allow comparing NaN == NaN to account for the fact that that is how
      // we would compare them based on the wire (since NaN is always encoded
      // as a string on the wire. For consistency, we do the same here when NaN
      // is a number.
      return String(field1) === String(field2);
    }

    // support number vs boolean and number vs string but not boolean vs string.
    if (bigintOrStringOrNumber(typeofField1) &&
        bigintOrStringOrNumber(typeofField2)) {
      return ('' + field1) === ('' + field2);
    }
    if ((typeofField1 === 'boolean' && typeofField2 === 'number') ||
        (typeofField1 === 'number' && typeofField2 === 'boolean')) {
      return !field1 === !field2;
    }

    // If the fields aren't trivially equal and one of them isn't an object,
    // it cannot be equal.  All supported cases have already been handled.
    return false;
  }

  field1 = /** @type {!Object} */ (field1);
  field2 = /** @type {!Object} */ (field2);
  if (isMessage(field1) || isMessage(field2)) {
    return compareMessages(field1, field2);
  }

  // We have two objects. If they're different types, they're not equal.
  if (field1.constructor != field2.constructor) return false;

  // If they're both Arrays, compare them element by element except for the
  // optional extension objects at the end, which we compare separately.
  if (field1.constructor === Array) {
    const arr1 = /** @type {!Array<?>} */ (field1);
    const arr2 = /** @type {!Array<?>} */ (field2);
    const arrayState1 = getArrayState(arr1);
    const arrayState2 = getArrayState(arr2);
    const length1 = arr1.length;
    const length2 = arr2.length;
    const maxLength = Math.max(length1, length2);
    const offset = getArrayIndexOffset(
        // Fake the CONSTRUCTED bit: this might be wrong but we know it is
        // correct if either side was constructed.
        arrayState1 | arrayState2 | ArrayStateFlags.CONSTRUCTED);
    const fieldIsRepeated = (valueType === ValueType.REPEATED_ARRAY) ||
        !!((arrayState1 | arrayState2) & ArrayStateFlags.IS_REPEATED_FIELD);
    if (fieldIsRepeated) {
      assert(valueType !== ValueType.MESSAGE_ARRAY);
      valueType = ValueType.REPEATED_ARRAY;
    } else if ((arrayState1 | arrayState2) & ArrayStateFlags.KNOWN_MAP_ARRAY) {
      assert(valueType !== ValueType.MESSAGE_ARRAY);
      return goog.module.get('jspb.internal_map')
          .compareMapArrays(arr1, arr2, comparisonTypeInfo);
    }

    // Try to retrieve type information for fields not known to be repeated.
    let /** !Set<number>|undefined */ repeatedFields;
    let /** !Set<number>|undefined */ mapFields;
    if (!fieldIsRepeated && COMPARISON_TYPE_INFO_SYMBOL) {
      comparisonTypeInfo ??= arr1[COMPARISON_TYPE_INFO_SYMBOL] ??
          arr2[COMPARISON_TYPE_INFO_SYMBOL];
      if (comparisonTypeInfo != null) {
        repeatedFields = comparisonTypeInfo.getRepeatedFields();
        mapFields = comparisonTypeInfo.getMapFields();
      }
    }

    // Retrieve sparse objects, if any.
    let sparse1 = length1 && arr1[length1 - 1];
    let sparse2 = length2 && arr2[length2 - 1];
    if (!isSparseObject(sparse1)) sparse1 = null;
    if (!isSparseObject(sparse2)) sparse2 = null;

    // We will need pivots to guard against low extensions written into the
    // sparse object.
    const pivot1 = length1 - offset - +(!!sparse1);
    const pivot2 = length2 - offset - +(!!sparse2);

    // Iterate through dense fields.
    for (let i = 0; i < maxLength; i++) {
      if (!compareFieldsInternalIter(
              fieldNumberFromIndex(i, offset), arr1, sparse1, pivot1, arr2,
              sparse2, pivot2, offset, repeatedFields, mapFields,
              comparisonTypeInfo, valueType)) {
        return false;
      }
    }

    // Test keys in either sparse object.
    if (sparse1) {
      for (let name in sparse1) {
        if (!compareFieldsInternalObjIter(
                sparse1, name, arr1, sparse1, pivot1, arr2, sparse2, pivot2,
                offset, repeatedFields, mapFields, comparisonTypeInfo)) {
          return false;
        }
      }
    }
    if (sparse2) {
      for (let name in sparse2) {
        // Check that we haven't looked at this field above and compare ow.
        if (!(sparse1 && name in sparse1) &&
            !compareFieldsInternalObjIter(
                sparse2, name, arr1, sparse1, pivot1, arr2, sparse2, pivot2,
                offset, repeatedFields, mapFields, comparisonTypeInfo)) {
          return false;
        }
      }
    }
    return true;
  }

  // We're comparing a raw object other than the sparse object.
  //
  // This should never happen in normal Apps JSPB usages; but we tolerate it
  // here because we have historically and because it's quite likely Ritz ends
  // up comparing GWT protos this way.
  if (field1.constructor === Object) {
    // TODO(varomodt): at least assert-fail here.
    if (DETAILED_JSPB_ASSERTS) {
      throw new Error('bad object comparison');
    }
    return compareFields([field1], [field2]);
  }

  if (goog.DEBUG) {
    throw new Error(`Invalid type in JSPB array: ${JSON.stringify(field1)} vs ${
        JSON.stringify(field2)}`);
  } else {
    throw new Error();
  }
}

/**
 * Compares two message fields recursively.
 * @param {!Object} obj the object we're testing on
 * @param {string} name the object key
 * @param {!Array<?>} arr1 the LHS array.
 * @param {!Object|null} sparse1 the LHS sparse object.
 * @param {number} pivot1 the pivot on the LHS.
 * @param {!Array<?>} arr2 the RHS array.
 * @param {!Object|null} sparse2 the RHS sparse object.
 * @param {number} pivot2 the pivot on the RHS.
 * @param {number} offset the array index offset
 * @param {!Array<?>|!Set<number>|undefined} repeatedFields the set of repeated
 *     fields in this message.
 * @param {!Set<number>|undefined} mapFields the set of map fields in this
 *     message.
 * @param {!ComparisonTypeInfo|undefined} comparisonTypeInfo
 * @return {boolean} whether the values were equal.
 */
function compareFieldsInternalObjIter(
    obj, name, arr1, sparse1, pivot1, arr2, sparse2, pivot2, offset,
    repeatedFields, mapFields, comparisonTypeInfo) {
  // Check that we have this property if necessary.
  if (!hasOwnPropertyIfNotTrusted(obj, name)) return true;

  // Skip non-numeric keys.
  const n = +name;
  if (!Number.isFinite(n)) return true;

  // If this was below a pivot, we've already tested it.
  if (n < pivot1 || n < pivot2) return true;

  // Compare the fields.
  return compareFieldsInternalIter(
      n, arr1, sparse1, pivot1, arr2, sparse2, pivot2, offset, repeatedFields,
      mapFields, comparisonTypeInfo, /* valueType= */ ValueType.MESSAGE_ARRAY);
}

/**
 * Compares two message fields recursively.
 * @param {number} n the field number
 * @param {!Array<?>} arr1 the LHS array.
 * @param {!Object|null} sparse1 the LHS sparse object.
 * @param {number} pivot1 the pivot on the LHS.
 * @param {!Array<?>} arr2 the RHS array.
 * @param {!Object|null} sparse2 the RHS sparse object.
 * @param {number} pivot2 the pivot on the RHS.
 * @param {number} offset the array index offset
 * @param {!Array<?>|!Set<number>|undefined} repeatedFields the set of repeated
 *     fields in this message.
 * @param {!Set<number>|undefined} mapFields the set of map fields in this
 *     message.
 * @param {!ComparisonTypeInfo|undefined} comparisonTypeInfo
 * @param {!ValueType} valueType describes whether we know this field to be a
 *     repeated or message array.
 * @return {boolean} whether the values were equal.
 */
function compareFieldsInternalIter(
    n, arr1, sparse1, pivot1, arr2, sparse2, pivot2, offset, repeatedFields,
    mapFields, comparisonTypeInfo, valueType) {
  const val1 = getField(n, arr1, sparse1, pivot1, offset);
  const val2 = getField(n, arr2, sparse2, pivot2, offset);
  const fieldIsRepeated = valueType === ValueType.REPEATED_ARRAY;

  // Comparing a nullish with an empty repeated field is the same as
  // comparing two empty repeated fields.
  if (val2 == null && isEmptyRepeatedField(val1, repeatedFields, n)) {
    return true;
  }

  if (val1 == null && isEmptyRepeatedField(val2, repeatedFields, n)) {
    return true;
  }

  // If our parent is repeated, we use the same comparison type info as this
  // array is simply entries of the same field.
  const childComparisonTypeInfo = fieldIsRepeated ?
      comparisonTypeInfo :
      comparisonTypeInfo?.getFieldComparisonTypeInfo(n);

  // Handle edge-cases for map comparisons. This code lives in internal_map
  // to reduce duplication.
  const isMapField = mapFields?.has(n);
  if (isMapField) {
    if (val1 == null && Array.isArray(val2)) {
      return val2.length === 0;
    } else if (val2 == null && Array.isArray(val1)) {
      return val1.length === 0;
    } else if (Array.isArray(val1) && Array.isArray(val2)) {
      return goog.module.get('jspb.internal_map')
          .compareMapArrays(val1, val2, childComparisonTypeInfo);
    }
  }

  return compareFieldsInternal(
      val1, val2, childComparisonTypeInfo,
      // Note that we will check array state bits in the recursive call so
      // we don't need to do that here.
      /* valueType = */
      (isMapField || isRepeatedFieldInSet(repeatedFields, n)) ?
          ValueType.REPEATED_ARRAY :
          ValueType.UNKNOWN);
}

/**
 * Retrieves a field from the dense or sparse object.
 * @param {number} fieldNumber the field number
 * @param {!Array<?>} arr the LHS array.
 * @param {!Object|null} sparse the LHS sparse object.
 * @param {number} pivot the pivot on the LHS.
 * @param {number} offset the array index offset
 * @return {?}
 */
function getField(fieldNumber, arr, sparse, pivot, offset) {
  // Check the dense object first if we're below the pivot. If we were above the
  // pivot or if there was no value (so there might be a low extension), then
  // try the sparse object.
  return ((fieldNumber < pivot) ? arr[fieldNumber + offset] : undefined) ??
      sparse?.[fieldNumber];
}

exports = {
  compareFields,
  compareMessages,
  bigintOrStringOrNumber,
};
