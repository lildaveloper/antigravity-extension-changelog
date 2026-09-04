/**
 * @fileoverview Internal helpers for JSPB field accessors. See
 * go/jspb-interface-type-checking-requirements for more information.
 *
 * This package defines a library of type assertions and coercions for use by
 * JSPB generated code, and specifies the acceptable types in use by the JSPB
 * wire format and API surface for all primitive types, {boolean, string, bytes,
 * float, double, int32, uint32, int64, uint64}.
 *
 * In this abstraction, the "wire" is not quite the wire, but rather the JSPB
 * array. All wire types produced by this API are convertible to the actual
 * wire format via the convertToJsonFormat transformation.
 *
 * For each type, if isValidWire${type}, then the value is a valid array
 * representation and can be safely coerced to a user-visible representation via
 * ${type}ToApi. If not, JSPB ignores the wire value, as if it were `null`.
 *
 * For each type, if isValidApi${type}, then the value is a valid API
 * representation (such as we would receive in a setter method) and can be
 * safely stored in our internal state, or converted to a array representation
 * via ${type}ToWire. If this check does not pass, implementations should
 * assert-fail.
 *
 * @public
 */
goog.module('jspb.internal_accessor_helpers');

const asserts = goog.require('goog.asserts');
const {ArrayStateFlags, TypeSpecificApiFormat, getArrayState, getDefaultTypeSpecificApiFormat, markArrayImmutable, setArrayState} = goog.require('jspb.internal_array_state');
const {ByteString} = goog.require('jspb.bytestring');
const {CheckLevel, DETAILED_JSPB_ASSERTS, getTypeCheck32BitIntFields, getTypeCheck64BitIntFields, getTypeCheck64BitIntFieldsAreInRange, getTypeCheckEnumFields, isBigIntAvailable, shouldCoerce64BitIntFieldsByJsType} = goog.require('jspb.internal_options');
const {DEFAULT_IMMUTABLE_INSTANCE_SYMBOL} = goog.require('jspb.internal_symbols');
const {InternalMessage, bytesAsByteString, getInternalArray, isInternalMessage} = goog.require('jspb.internal');
const {asyncThrowWarning, makeTypeError} = goog.require('jspb.exceptions');
const {cast} = goog.require('google3.javascript.common.asserts.asserts');
const {checkExhaustive} = goog.require('google3.javascript.typescript.contrib.check');
const {getSplit64High, getSplit64Low, joinInt64, joinSignedDecimalString, joinUint64, joinUnsignedDecimalString, splitDecimalString, splitInt64} = goog.require('jspb.utils');
const {isBigInt: isBigIntImpl, isNumber, isString} = goog.require('google3.javascript.common.asserts.guards');
const {isSafeInt52: isSafeInt52Impl, isValidSignedInt64: isValidSignedInt64Impl, toGbigint} = goog.require('google3.javascript.common.bigint.index');
const {withoutLogging} = goog.require('jspb.internal_operations');

/** @const {function(number, bigint): bigint} */
const bigintAsIntN = /** @pureOrBreakMyCode */ (
    /** @type {?} */ (
        typeof BigInt === 'function' ? BigInt.asIntN : undefined));

/** @const {function(number, bigint): bigint} */
const bigintAsUintN = /** @pureOrBreakMyCode */ (
    /** @type {?} */ (
        typeof BigInt === 'function' ? BigInt.asUintN : undefined));

/** @const {function(number): boolean} */
const isSafeInteger = Number.isSafeInteger;

/** @const {function(number): boolean} */
const numberIsFinite = Number.isFinite;

/** @const {function(number): number} */
const trunc = Math.trunc;

/** @const {number} */
const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER;

const /** !gbigint */ GBIGINT_ZERO = /** @pureOrBreakMyCode */ (toGbigint(0));

/**
 * @param {!gbigint|bigint} value
 * @return {boolean}
 * @requireInlining
 */
function isValidSignedInt64(value) {
  return /** @type {!Function} */ (isValidSignedInt64Impl)(value);
}

/**
 * @param {!gbigint|bigint} value
 * @return {boolean}
 * @requireInlining
 */
function isSafeInt52(value) {
  return /** @type {!Function} */ (isSafeInt52Impl)(value);
}

/**
 * @param {*} value
 * @return {boolean}
 * @requireInlining
 */
function isBigInt(value) {
  return /** @type {!Function} */ (isBigIntImpl)(value);
}

/**
 * @param {*} value
 * @return {number}
 */
function checkFloatingPoint(value) {
  if (typeof value !== 'number') {
    throw new Error(`Value of float/double field must be a number, found ${
        typeof value}: ${value}`);
  }
  return /** @type {number} */ (value);
}

/**
 * @param {number|null|undefined} value
 * @return {number|null|undefined}
 */
function checkNullishFloatingPoint(value) {
  if (value == null) return value;
  return checkFloatingPoint(value);
}

/** @return {number|undefined|null} */
function coerceToNullishFloatingPoint(/** ? */ value) {
  if (value == null || typeof value === 'number') {
    return value;
  } else if (value === 'NaN' || value === 'Infinity' || value === '-Infinity') {
    return Number(value);
  } else {
    return undefined;
  }
}

/** @return {string} */
function ctorName(/** function(new: ?, ...)*/ ctor) {
  return ctor.displayName || ctor.name || 'unknown type name';
}

/** @return {!ByteString|undefined|null} */
function coerceToNullishBytes(/** ? */ value) {
  if (value == null || value instanceof ByteString) return value;
  if (typeof value === 'string') {
    return ByteString.fromBase64(value);
  }
  // TODO(b/396420284): remove.
  asserts.assert(!(value instanceof Uint8Array));
  return undefined;
}

/** @return {!ByteString} */
function checkBytes(
    /** string|!Uint8Array|!ByteString|null|undefined */ value) {
  return /** @type {!ByteString} */ (bytesAsByteString(
      value, /* invalidIsMissing=*/ false, /* allowNullishValues= */ false));
}

/** @return {!ByteString|null|undefined} */
function checkNullishBytes(
    /** string|!Uint8Array|!ByteString|null|undefined */ value) {
  return bytesAsByteString(
      value, /* invalidIsMissing=*/ false, /* allowNullishValues= */ true);
}

/**
 * @param {*} value
 * @return {boolean}
 */
function checkBoolean(value) {
  if (typeof value !== 'boolean') {
    throw new Error(`Expected boolean but got ${goog.typeOf(value)}: ${value}`);
  }
  return value;
}

/**
 * @param {*} value
 * @return {boolean|null|undefined}
 */
function checkNullishBoolean(value) {
  if (value == null) {
    return /** @type{null|undefined} */ (value);
  }
  return checkBoolean(value);
}

/** @return {boolean|undefined|null} */
function coerceToNullishBoolean(/** ? */ value) {
  if (value == null || typeof value === 'boolean') return value;
  if (typeof value === 'number') return !!value;
  return undefined;  // some invalid value
}

// Represents strings formed by calling toString on a number value. Notably,
// * Values < 1 must have a leading 0 (e.g. '0.5', but not '.5')
// * Values with a decimal must have a fractional part (e.g. '1.' disallowed)
// * Hex and exponential syntax are excluded
// * May not have leading 0s in the whole part (e.g. '0123', such as zip codes)
// This allows us to better match gbigint (go/bigint#creating-gbigint-values).
const NUMBER_SHAPED_CHECK = /^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;

/**
 * @param {*} value
 * @param {boolean} forceTypeChecking
 * @return {boolean}  Returns true if value will be suitable for constructing
 *     gbigint (go/bigint) after truncation.
 */
function isNumberShaped(value, forceTypeChecking) {
  switch (typeof value) {
    case 'bigint':
      return true;
    case 'number':
      return numberIsFinite(value);
    case 'string':
      if (!getTypeCheck64BitIntFieldsAreInRange(forceTypeChecking)) {
        return !!value && isFinite(value);
      }

      return NUMBER_SHAPED_CHECK.test(value);
    default:
      return false;
  }
}

/** @return {boolean} @requireInlining */
function isValidEnum(/** ? */ value) {
  return numberIsFinite(value);
}

/**
 * @param {?} value
 * @return {string|undefined}
 */
function getEnumErrorMessage(value) {
  return goog.DEBUG ?
      `Expected enum as finite number but got ${goog.typeOf(value)}: ${value}` :
      'enum';
}

/** @return {number} */
function checkEnum(/** ? */ value) {
  if (!isValidEnum(value)) {
    switch (getTypeCheckEnumFields()) {
      case CheckLevel.THROW:
        throw makeTypeError(getEnumErrorMessage(value));
      case CheckLevel.ASYNC_THROW:
        asyncThrowWarning(getEnumErrorMessage(value));
      default:  // do nothing
    }
  }
  return getTypeCheckEnumFields() === CheckLevel.THROW ? value | 0 : value;
}

/** @return {number|null|undefined} */
function checkNullishEnum(/** ? */ value) {
  return value == null ? value : checkEnum(value);
}

/** @return {number|undefined|null} */
function coerceToNullishEnum(/** ? */ value) {
  if (value == null) return value;
  if (getTypeCheckEnumFields() === CheckLevel.THROW) {
    return isValidEnum(value) ? value | 0 : undefined;
  } else {
    return value;
  }
}

/**
 * @return {boolean}
 * @requireInlining
 */
function isValidInt32(/** ? */ value) {
  return numberIsFinite(value);
}

/**
 * @param {?} value
 * @return {string|undefined}
 */
function getInt32ErrorMessage(value) {
  return goog.DEBUG ? `Expected int32 as finite number but got ${
                          goog.typeOf(value)}: ${value}` :
                      'int32';
}

/** @return {number} */
function checkInt32(/** ? */ value) {
  if (typeof value !== 'number') {
    throw makeTypeError(getInt32ErrorMessage(value));
  }
  if (!isValidInt32(value)) {
    switch (getTypeCheck32BitIntFields()) {
      case CheckLevel.THROW:
        throw makeTypeError(getInt32ErrorMessage(value));
      case CheckLevel.ASYNC_THROW:
        asyncThrowWarning(getInt32ErrorMessage(value));
      default:  // do nothing
    }
  }
  return getTypeCheck32BitIntFields() === CheckLevel.THROW ? value | 0 : value;
}

/** @return {number|null|undefined} */
function checkNullishInt32(/** ? */ value) {
  return value == null ? value : checkInt32(value);
}

/** @return {number|undefined|null} */
function coerceToNullishInt32(/** ? */ value) {
  if (value == null) return value;
  if (typeof value === 'string' && value) {
    // We need to handle strings to support int64 -> int32 conversions.
    value = +value;
  } else if (typeof value !== 'number') {
    return undefined;
  }
  if (getTypeCheck32BitIntFields() === CheckLevel.THROW) {
    return isValidInt32(value) ? value | 0 : undefined;
  } else {
    return value;
  }
}

/**
 * @param {?} value
 * @return {string|undefined}
 */
function getUint32ErrorMessage(value) {
  return goog.DEBUG ? `Expected uint32 as finite number but got ${
                          goog.typeOf(value)}: ${value}` :
                      'uint32';
}

/** @return {number} */
function checkUint32(/** ? */ value) {
  if (typeof value !== 'number') {
    throw makeTypeError(getUint32ErrorMessage(value));
  }
  if (!isValidInt32(value)) {
    switch (getTypeCheck32BitIntFields()) {
      case CheckLevel.THROW:
        throw makeTypeError(getUint32ErrorMessage(value));
      case CheckLevel.ASYNC_THROW:
        asyncThrowWarning(getUint32ErrorMessage(value));
      default:  // do nothing
    }
  }
  return getTypeCheck32BitIntFields() === CheckLevel.THROW ? value >>> 0 :
                                                             value;
}

/** @return {number|null|undefined} */
function checkNullishUint32(/** ? */ value) {
  return value == null ? value : checkUint32(value);
}

/** @return {number|undefined|null} */
function coerceToNullishUint32(/** ? */ value) {
  if (value == null) return value;
  if (typeof value === 'string' && value) {
    // We need to handle strings to support uint64 -> uint32 conversions.
    value = +value;
  } else if (typeof value !== 'number') {
    return undefined;
  }
  if (getTypeCheck32BitIntFields() === CheckLevel.THROW) {
    return isValidInt32(value) ? value >>> 0 : undefined;
  } else {
    return value;
  }
}

/**
 * @param {?} value
 * @return {string|undefined}
 */
function getInt64ErrorMessage(value) {
  return goog.DEBUG ?
      `Expected an int64 value encoded as a number or a string but got ${
          goog.typeOf(value)}: ${value}` :
      'int64';
}

/**
 * Validate that the provided value is an int64 number|string|bigint. This
 * function may truncate values to fit within the int64 range, but will not
 * change the data type (string -> string, number -> number, bigint -> bigint)
 * so long as the resulting value is within the safe range. Nullish values are
 * rejected.
 *
 * @param {*} value
 * @param {!TypeSpecificApiFormat=} requestedFormat
 * @return {number|string|!gbigint}
 */
function checkInt64(value, requestedFormat) {
  // TODO: varomodt - Change default format to GBIGINT.
  requestedFormat ??= getDefaultTypeSpecificApiFormat();

  // If the underlying data is being accessed via the _asString alternates,
  // which always apply type checking, then we must also apply
  // type checking here for consistency. Otherwise, the values would be
  // marked as IS_API_FORMATTED under a different standard and have
  // invalid values.
  const shouldForceTypeChecking =
      requestedFormat !== TypeSpecificApiFormat.LEGACY;
  if (!getTypeCheck64BitIntFieldsAreInRange(
          /* forceTypeChecking = */ shouldForceTypeChecking)) {
    return /** @type{number|string|!gbigint} */ (value);
  }

  if (!isNumberShaped(
          value, /* forceTypeChecking = */ shouldForceTypeChecking)) {
    throw makeTypeError(getInt64ErrorMessage(value));
  }

  // We permit number|string|!gbigint values regardless of jstype annotations.
  // In order to avoid unnecessary coercions (particularly string -> number,
  // which can cause precision loss), guard against cross-type coercions.
  //
  // value must be number|string|!gbigint since it's number-shaped.

  const valueType = typeof value;

  switch (requestedFormat) {
    case TypeSpecificApiFormat.STRING:
      switch (valueType) {
        case 'string':
          return convertStringToInt64String(
              /** @type {string} */ (value), /* forceTypeChecking = */ true);
        case 'bigint':
          return convertBigintToInt64String(/** @type {bigint} */ (value));
        default:
          return convertNumberToInt64String(
              cast(value, isNumber), /* forceTypeChecking = */ true);
      }

    case TypeSpecificApiFormat.GBIGINT:
      switch (valueType) {
        case 'string':
          return convertStringToInt64Gbigint(/** @type {string} */ (value));
        case 'bigint':
          return convertBigintToInt64Gbigint(/** @type {bigint} */ (value));
        default:
          return convertNumberToInt64Gbigint(cast(value, isNumber));
      }

    case TypeSpecificApiFormat.LEGACY:
      switch (valueType) {
        case 'string':
          return convertStringToInt64String(
              /** @type {string} */ (value), /* forceTypeChecking = */ false);
        case 'bigint':
          return convertBigintToInt64Gbigint(/** @type {bigint} */ (value));
        default:
          return convertNumberToInt64Number(
              cast(value, isNumber), /* forceTypeChecking = */ false);
      }

    default:
      return checkExhaustive(
          requestedFormat, 'Unknown format requested type for int64');
  }
}

/**
 * Validate that the provided value is an int64 number|string. This function may
 * truncate values to fit within the int64 range, but will not change the data
 * type (string -> string, number -> number) so long as the resulting value is
 * within the safe range. Nullish values are permitted.
 *
 * @param {*} value
 * @param {!TypeSpecificApiFormat=} requestedFormat
 * @return {number|string|!gbigint|null|undefined}
 */
function checkNullishInt64(value, requestedFormat) {
  // TODO: b/319288438 - Change default format to GBIGINT.
  return value == null ?
      /** @type {null|undefined} */ (value) :
      /** @type{number|string} */ (checkInt64(value, requestedFormat));
}

const /** string */ UINT64_MAX_STR = '18446744073709551615';

const /** number */ UINT64_MAX_STR_LEN = UINT64_MAX_STR.length;

/**
 * Determine if the provided value is within the uint64 value range based on its
 * length and leading digits.
 * @param {string} value
 * @return {boolean}
 */
function isStringInUint64Range(value) {
  if (value[0] === '-') {
    return false;
  }

  const len = value.length;
  if (len < UINT64_MAX_STR_LEN) {
    // value is definitely less than uint64 max is 18446744073709551615, which
    // is 20 digits.
    return true;
  }

  return len === UINT64_MAX_STR_LEN && value <= UINT64_MAX_STR;
}

const /** string */ INT64_MIN_STR = '-9223372036854775808';

const /** number */ INT64_MIN_STR_LEN = INT64_MIN_STR.length;

const /** string */ INT64_MAX_STR = '9223372036854775807';

const /** number */ INT64_MAX_STR_LEN = INT64_MAX_STR.length;

/**
 * Determine if the provided value is within the int64 value range based on its
 * length and leading digits.
 * @param {string} value
 * @return {boolean}
 */
function isStringInInt64Range(value) {
  const len = value.length;
  if (value[0] === '-') {
    if (len < INT64_MIN_STR_LEN) {
      // value is definitely greater than int64 min, -9223372036854775808, which
      // is 20 characters.
      return true;
    }

    return len === INT64_MIN_STR_LEN && value <= INT64_MIN_STR;
  }

  // else value >= 0
  if (len < INT64_MAX_STR_LEN) {
    // value is definitely less than int64 max is 9223372036854775807, which
    // is 19 digits.
    return true;
  }

  return len === INT64_MAX_STR_LEN && value <= INT64_MAX_STR;
}

/**
 * @param {number} value
 * @return {string}
 */
function truncateNumberToUint64RangeString(value) {
  // This is a slow path, so ensure caller did basic checks before resorting to
  // truncation.
  asserts.assert(value < 0 || value > MAX_SAFE_INTEGER);
  // Ensure no floating point values have made it to this point.
  asserts.assert(Number.isInteger(value));

  splitInt64(value);
  return joinUnsignedDecimalString(getSplit64Low(), getSplit64High());
}

/**
 * @param {number} value
 * @return {number}
 */
function truncateNumberToUint64RangeNumber(value) {
  // This is a slow path, so ensure caller did basic checks before resorting to
  // truncation.
  asserts.assert(value < 0 || value > MAX_SAFE_INTEGER);
  // Ensure no floating point values have made it to this point.
  asserts.assert(Number.isInteger(value));

  splitInt64(value);
  return joinUint64(getSplit64Low(), getSplit64High());
}

/**
 * @param {string} value
 * @return {string}
 */
function truncateStringToInt64RangeString(value) {
  // Ensure no floating point values have made it to this point.
  asserts.assert(value.indexOf('.') === -1);

  if (isStringInInt64Range(value)) {
    return value;
  }

  splitDecimalString(value);
  return joinSignedDecimalString(getSplit64Low(), getSplit64High());
}

/**
 * @param {number} value
 * @return {number}
 */
function truncateNumberToInt64RangeNumber(value) {
  // This is a slow path, so ensure caller did basic checks before resorting to
  // truncation.
  asserts.assert(!isSafeInteger(value));
  asserts.assert(Number.isInteger(value));

  splitInt64(value);
  return joinInt64(getSplit64Low(), getSplit64High());
}

/**
 * @param {number} value
 * @return {string}
 */
function truncateNumberToInt64RangeString(value) {
  // This is a slow path, so ensure caller did basic checks before resorting to
  // truncation.
  asserts.assert(!isSafeInteger(value));
  // Ensure no floating point values have reached this point. They should've
  // been truncated by the caller.
  asserts.assert(Number.isInteger(value));

  splitInt64(value);
  return joinSignedDecimalString(getSplit64Low(), getSplit64High());
}

/**
 * @param {string} value
 * @return {string}
 */
function truncateStringToUint64RangeString(value) {
  // Ensure no floating point values have reached this point. They should've
  // been truncated by the caller.
  asserts.assert(value.indexOf('.') === -1);

  if (isStringInUint64Range(value)) {
    return value;
  }

  splitDecimalString(value);
  return joinUnsignedDecimalString(getSplit64Low(), getSplit64High());
}

/**
 * @param {number} value
 * @param {boolean} forceTypeChecking
 * @return {number} The value truncated to the int64 range (if necessary). Note:
 *     this value may actually be a numeric string if the value is outside of
 *     the safe integer range.
 */
function convertNumberToInt64Number(value, forceTypeChecking) {
  // This is an assert here because the caller is expected to check.
  asserts.assert(isNumberShaped(value, forceTypeChecking));
  asserts.assert(getTypeCheck64BitIntFieldsAreInRange(forceTypeChecking));

  value = trunc(value);
  if (!getTypeCheck64BitIntFieldsAreInRange(forceTypeChecking)) {
    return value;
  }

  if (isSafeInteger(value)) {
    return value;
  }

  return truncateNumberToInt64RangeNumber(value);
}

/**
 * @param {number} value
 * @param {boolean} forceTypeChecking
 * @return {number} The value truncated to the uint64 range (if necessary).
 *     Note: this value may actually be a numeric string if the value is outside
 *     of the safe integer range.
 */
function convertNumberToUint64Number(value, forceTypeChecking) {
  // This is an assert here because the caller is expected to check.
  asserts.assert(isNumberShaped(value, forceTypeChecking));
  asserts.assert(getTypeCheck64BitIntFieldsAreInRange(forceTypeChecking));

  value = trunc(value);
  if (!getTypeCheck64BitIntFieldsAreInRange(forceTypeChecking)) {
    return value;
  }

  if (value >= 0 && isSafeInteger(value)) {
    return value;
  }

  return truncateNumberToUint64RangeNumber(value);
}

/**
 * Best effort string -> number within int64 range coercion. This operation will
 * not lose precision because we will return directly unsafe-integer as string
 * values with a type cast.
 *
 * @param {string} value
 * @param {boolean} forceTypeChecking
 * @return {number}
 */
function convertStringToInt64NumberWhenSafe(value, forceTypeChecking) {
  // These asserts are here because the caller is expected to check.
  asserts.assert(isNumberShaped(value, forceTypeChecking));
  asserts.assert(getTypeCheck64BitIntFieldsAreInRange(forceTypeChecking));
  asserts.assert(shouldCoerce64BitIntFieldsByJsType(forceTypeChecking));

  // Value is a number-shaped string. It must be one of:
  //   1. A safe, integer string (e.g. '3')
  //   2. A safe, floating point string (e.g. '3.14')
  //   3. An unsafe integer string
  //   4. An unsafe floating point string

  const coerced = Number(value);
  const numTrunc = trunc(coerced);
  if (isSafeInteger(numTrunc)) {
    // Case 1: safe integer or float string
    return numTrunc;
  }

  // Case 3 and 4: unsafe numeric string. Will need to apply an unsafe cast to
  // avoid precision loss.
  const int64Str = convertStringToInt64String(value, forceTypeChecking);
  const int64Num = Number(int64Str);
  return isSafeInteger(int64Num) ?
      int64Num :
      /** @type {number} */ (/** @type {?} */ (int64Str));
}

/**
 * Best effort string -> number within uint64 range coercion. This operation
 * will not lose precision because we will return directly unsafe-integer as
 * string values with a type cast.
 *
 * @param {string} value
 * @param {boolean} forceTypeChecking
 * @return {number}
 */
function convertStringToUint64NumberWhenSafe(value, forceTypeChecking) {
  // These asserts are here because the caller is expected to check.
  asserts.assert(isNumberShaped(value, forceTypeChecking));
  asserts.assert(getTypeCheck64BitIntFieldsAreInRange(forceTypeChecking));
  asserts.assert(shouldCoerce64BitIntFieldsByJsType(forceTypeChecking));

  // Value is a number-shaped string. It must be one of:
  //   1. A safe, integer string (e.g. '3')
  //   2. A safe, floating point string (e.g. '3.14')
  //   3. An unsafe integer string
  //   4. An unsafe floating point string

  const coerced = Number(value);

  const numTrunc = trunc(coerced);
  if (!getTypeCheck64BitIntFieldsAreInRange(forceTypeChecking)) {
    if (isSafeInteger(numTrunc)) {
      // Case 1 and 2: safe integer or float string
      return numTrunc;
    }

    // Case 3 and 4: unsafe numeric string. Apply an unsafe cast to avoid
    // precision loss.
    return /** @type {number} */ (
        /** @type {*} */ (
            convertStringToUint64String(value, forceTypeChecking)));
  }

  if (0 <= numTrunc && numTrunc <= MAX_SAFE_INTEGER) {
    // Case 1 and 2: safe integer or float string
    // Positive safe integers do not need range truncation.
    return numTrunc;
  }

  // Case 3 and 4: unsafe numeric string. Apply an unsafe cast to avoid
  // precision loss.
  const uint64Str = convertStringToUint64String(value, forceTypeChecking);
  const uint64Num = Number(uint64Str);

  return isSafeInteger(uint64Num) ?
      uint64Num :
      /** @type {number} */ (/** @type {*} */ (uint64Str));
}

/**
 * @param {number} value
 * @param {boolean} forceTypeChecking
 * @return {string}
 */
function convertNumberToInt64String(value, forceTypeChecking) {
  // This is an assert here because the caller is expected to check.
  asserts.assert(isNumberShaped(value, forceTypeChecking));
  asserts.assert(getTypeCheck64BitIntFieldsAreInRange(forceTypeChecking));

  value = trunc(value);
  if (!getTypeCheck64BitIntFieldsAreInRange(forceTypeChecking)) {
    return String(value);
  }

  // There's no positive safe integer value that could result
  // in an unsafe signed integer after two's complement truncation:
  // MAX_SAFE_INTEGER (2**53 - 1) < Int64 max (2**63 - 1).
  if (isSafeInteger(value)) {
    return String(value);
  }

  return truncateNumberToInt64RangeString(value);
}

/**
 * Best effort bigint -> number within int64 range coercion. This operation will
 * not lose precision because we will return directly unsafe-integer as string
 * values with a type cast.
 * @param {bigint} value
 * @return {number}
 */
function convertBigintToInt64NumberWhenSafe(value) {
  if (isSafeInt52(value)) {
    return Number(value);
  }

  const value64 = bigintAsIntN(64, value);
  if (isSafeInt52(value64)) {
    return Number(value64);
  }

  return /** @type {number} */ (/** @type {*} */ (String(value64)));
}

/**
 * @param {bigint} value
 * @return {string}
 */
function convertBigintToInt64String(value) {
  return String(bigintAsIntN(64, value));
}

/**
 * Best effort bigint -> number within uint64 range coercion. This operation
 * will not lose precision because we will return directly unsafe-integer as
 * string values with a type cast.
 * @param {bigint} value
 * @return {number}
 */
function convertBigintToUint64NumberWhenSafe(value) {
  if (value >= 0 && isSafeInt52(value)) {
    return Number(value);
  }

  const value64 = bigintAsUintN(64, value);
  if (isSafeInt52(value64)) {
    return Number(value64);
  }

  return /** @type {number} */ (/** @type {*} */ (String(value64)));
}

/**
 * @param {bigint} value
 * @return {string}
 */
function convertBigintToUint64String(value) {
  return String(bigintAsUintN(64, value));
}

/**
 * @param {number} value
 * @param {boolean} forceTypeChecking
 * @return {string}
 */
function convertNumberToUint64String(value, forceTypeChecking) {
  // This is an assert here because the caller is expected to check.
  asserts.assert(isNumberShaped(value, forceTypeChecking));
  asserts.assert(getTypeCheck64BitIntFields(forceTypeChecking));

  value = trunc(value);
  if (!getTypeCheck64BitIntFieldsAreInRange(forceTypeChecking)) {
    return String(value);
  }

  if (value >= 0 && isSafeInteger(value)) {
    return String(value);
  }

  return truncateNumberToUint64RangeString(value);
}

/**
 * @param {string} value
 * @param {boolean} forceTypeChecking
 * @return {string}
 */
function convertStringToInt64String(value, forceTypeChecking) {
  // This is an assert here because the caller is expected to check.
  asserts.assert(isNumberShaped(value, forceTypeChecking));
  asserts.assert(getTypeCheck64BitIntFieldsAreInRange(forceTypeChecking));

  const coerced = trunc(Number(value));
  if (isSafeInteger(coerced)) {
    // This shortcut simplifies the obvious safe floats as well as
    // edge cases like '+0' and '-0' that gbigint would reject.
    return String(coerced);
  }

  const decimalIdx = value.indexOf('.');
  if (decimalIdx !== -1) {
    // e.g. '1.5' -> '1'
    value = value.substring(0, decimalIdx);
  }

  if (!getTypeCheck64BitIntFieldsAreInRange(forceTypeChecking)) {
    // No decimal remaining in value.
    return value;
  }

  // The truncated value cannot be a safe integer (we would've already
  // finished), so we can't use the faster splitInt64.
  return truncateStringToInt64RangeString(value);
}

/**
 * @param {string} value
 * @return {!gbigint}
 */
function convertStringToInt64Gbigint(value) {
  const coerced = trunc(Number(value));
  if (isSafeInteger(coerced)) {
    // This shortcut simplifies the obvious safe floats as well as
    // edge cases like '+0' and '-0' that gbigint would reject.
    return toGbigint(coerced);
  }

  const decimalIdx = value.indexOf('.');
  if (decimalIdx !== -1) {
    // e.g. '1.5' -> '1'
    value = value.substring(0, decimalIdx);
  }

  if (isBigIntAvailable()) {
    return convertBigintToInt64Gbigint(BigInt(value));
  }

  // The truncated value cannot be a safe integer (we would've already
  // finished), so we can't use the faster splitInt64.
  return toGbigint(truncateStringToInt64RangeString(value));
}

// TODO: b/319288438 - Remove string coercions in convertNumberTo(U)Int64Gbigint
// once we can deserialize directly into gbigint.
//
// Value may be a valid 64-bit int value, but not a safe integer  because we
// cannot yet binary deserialize directly into gbigint. The binary
// deserialization to number may have already lost the precision before we ever
// try to truncate into the 64-bit int range.
//
// However, toGbigint will throw on unsafe number inputs, so we may need to
// coerce to string first to avoid the exception.

/**
 * @param {number} value
 * @return {!gbigint}
 */
function convertNumberToInt64Gbigint(value) {
  if (isSafeInteger(value)) {
    return toGbigint(
        convertNumberToInt64Number(value, /*forceTypeChecking=*/ true));
  }

  return toGbigint(
      convertNumberToInt64String(value, /*forceTypeChecking=*/ true));
}

/**
 * @param {number} value
 * @return {!gbigint}
 */
function convertNumberToUint64Gbigint(value) {
  if (isSafeInteger(value)) {
    return toGbigint(
        convertNumberToUint64Number(value, /*forceTypeChecking=*/ true));
  }

  return toGbigint(
      convertNumberToUint64String(value, /*forceTypeChecking=*/ true));
}

/**
 * @param {string} value
 * @param {boolean} forceTypeChecking
 * @return {string}
 */
function convertStringToUint64String(value, forceTypeChecking) {
  // This is an assert here because the caller is expected to check.
  asserts.assert(isNumberShaped(value, forceTypeChecking));
  asserts.assert(getTypeCheck64BitIntFieldsAreInRange(forceTypeChecking));

  const coerced = trunc(Number(value));
  if (isSafeInteger(coerced)) {
    if (!getTypeCheck64BitIntFieldsAreInRange(forceTypeChecking) ||
        coerced >= 0) {
      // This shortcut simplifies the obvious safe floats as well as
      // edge cases like '+0' and '-0' that gbigint would reject.
      //
      // Additionally, safe positive integers will always be in uint64 range
      // without truncation, so we're done. Negative values are omitted
      // because they will need two's complement truncation to the uint64
      // range.
      return String(coerced);
    }
  }

  const decimalIdx = value.indexOf('.');
  if (decimalIdx !== -1) {
    // e.g. '1.5' -> '1'
    value = value.substring(0, decimalIdx);
  }

  return truncateStringToUint64RangeString(value);
}

/**
 * @param {string} value
 * @return {!gbigint}
 */
function convertStringToUint64Gbigint(value) {
  const coerced = trunc(Number(value));
  if (isSafeInteger(coerced) && coerced >= 0) {
    // This shortcut simplifies the obvious safe floats as well as
    // edge cases like '+0' and '-0' that gbigint would reject.
    //
    // Additionally, safe positive integers will always be in uint64 range
    // without truncation, so we're done. Negative values are omitted because
    // they will need two's complement truncation to the uint64 range.
    return toGbigint(coerced);
  }

  const decimalIdx = value.indexOf('.');
  if (decimalIdx !== -1) {
    // e.g. '1.5' -> '1'
    value = value.substring(0, decimalIdx);
  }

  if (isBigIntAvailable()) {
    return convertBigintToUint64Gbigint(BigInt(value));
  }

  return toGbigint(truncateStringToUint64RangeString(value));
}

/**
 * @param {bigint} value
 * @return {!gbigint}
 */
function convertBigintToInt64Gbigint(value) {
  asserts.assert(typeof value === 'bigint');
  return toGbigint(bigintAsIntN(64, value));
}

/**
 * @param {bigint} value
 * @return {!gbigint}
 */
function convertBigintToUint64Gbigint(value) {
  asserts.assert(typeof value === 'bigint');
  return toGbigint(bigintAsUintN(64, value));
}

/**
 * @param {*} value
 *
 * @return {number|undefined|null}
 */
function coerceToNullishInt64(value) {
  // Nullish values are ok
  if (value == null) {
    return /** @type {null|undefined} */ (value);
  } else if (typeof value === 'bigint') {
    return convertBigintToInt64NumberWhenSafe(/** @type{bigint} */ (value));
  }

  // TODO: b/169076588 - Successively tighten value enforcement to nullish
  // values within int64 range.
  if (!getTypeCheck64BitIntFieldsAreInRange(
          /*forceTypeChecking = */ false)) {
    return /** @type {number|undefined|null} */ (value);
  }

  if (!isNumberShaped(value, /*forceTypeChecking = */ false)) {
    return undefined;
  } else if (typeof value === 'number') {
    return convertNumberToInt64Number(
        /** @type {number} */ (value), /*forceTypeChecking = */ false);
  }

  const strValue = cast(value, isString);

  // Only coerce across types if jstype-driven coercion is enabled.
  if (shouldCoerce64BitIntFieldsByJsType(/* forceTypeChecking = */ false)) {
    return convertStringToInt64NumberWhenSafe(
        strValue, /* forceTypeChecking = */ false);
  }
  // We know value is an acceptable number-shaped input, but may still
  // need to truncate to an integer.
  return /** @type{number} */ (
      /** @type {?} */ (convertStringToInt64String(
          strValue, /*forceTypeChecking = */ false)));
}

/**
 * @param {*} value
 * @param {boolean=} forceTypeChecking
 *
 * @return {string|undefined|null}
 */
function coerceToNullishInt64String(value, forceTypeChecking = false) {
  const valueType = typeof value;
  if (value == null) {
    return /** @type {undefined|null} */ (value);
  } else if (valueType === 'bigint') {
    return convertBigintToInt64String(/** @type {bigint} */ (value));
  }

  if (!getTypeCheck64BitIntFieldsAreInRange(forceTypeChecking)) {
    return /** @type {string|undefined|null} */ (value);
  }

  if (!isNumberShaped(value, forceTypeChecking)) {
    return undefined;
  } else if (valueType === 'string') {
    return convertStringToInt64String(
        /** @type {string} */ (value), forceTypeChecking);
  }

  const numValue = cast(value, isNumber);

  // Only coerce across types if jstype-driven coercion is enabled.
  if (shouldCoerce64BitIntFieldsByJsType(forceTypeChecking)) {
    return convertNumberToInt64String(numValue, forceTypeChecking);
  }

  // May still to truncate to an integer and apply range enforcement.
  return /** @type {string} */ (
      /** @type {?} */ (
          convertNumberToInt64Number(numValue, forceTypeChecking)));
}

/**
 * @param {*} value
 *
 * @return {!gbigint|undefined|null}
 */
function coerceToNullishInt64Gbigint(value) {
  const valueType = typeof value;
  if (value == null) {
    return /** @type {undefined|null} */ (value);
  } else if (valueType === 'bigint') {
    return convertBigintToInt64Gbigint(/** @type {bigint} */ (value));
  }

  if (!isNumberShaped(value, /* forceTypeChecking = */ true)) {
    return undefined;
  } else if (valueType === 'string') {
    return convertStringToInt64Gbigint(/** @type {string} */ (value));
  }

  const numValue = cast(value, isNumber);

  return convertNumberToInt64Gbigint(numValue);
}

/**
 * @param {?} value
 * @return {string|undefined}
 */
function getUint64ErrorMessage(value) {
  return goog.DEBUG ?
      `Expected an uint64 value encoded as a number or a string but got ${
          goog.typeOf(value)}: ${value}` :
      'uint64';
}

/**
 * @param {*} value
 * @param {!TypeSpecificApiFormat=} requestedFormat
 * @return {number|string|!gbigint}
 */
function checkUint64(value, requestedFormat) {
  // TODO: varomodt - Change default format to GBIGINT.
  requestedFormat ??= getDefaultTypeSpecificApiFormat();

  // If the underlying data is being accessed via the _asString alternates,
  // which always apply type checking, then we must also apply
  // type checking here for consistency. Otherwise, the values would be
  // marked as IS_API_FORMATTED under a different standard and have
  // invalid values.
  const shouldForceTypeChecking =
      requestedFormat !== TypeSpecificApiFormat.LEGACY;
  if (!getTypeCheck64BitIntFieldsAreInRange(
          /* forceTypeChecking = */ shouldForceTypeChecking)) {
    return /** @type{number|string|!gbigint} */ (value);
  }

  if (!isNumberShaped(
          value, /* forceTypeChecking = */ shouldForceTypeChecking)) {
    throw makeTypeError(getUint64ErrorMessage(value));
  }

  // We permit number|string values regardless of jstype annotations. In
  // order to avoid unnecessary coercions (particularly string -> number,
  // which can cause precision loss), guard against cross-type coercions.
  //
  // value must be number|string|!gbigint since it's number-shaped.
  const valueType = typeof value;
  switch (requestedFormat) {
    case TypeSpecificApiFormat.STRING:
      switch (valueType) {
        case 'string':
          return convertStringToUint64String(
              /** @type {string} */ (value), /* forceTypeChecking = */ true);
        case 'bigint':
          return convertBigintToUint64String(/** @type {bigint} */ (value));
        default:
          return convertNumberToUint64String(
              cast(value, isNumber), /* forceTypeChecking = */ true);
      }

    case TypeSpecificApiFormat.GBIGINT:
      switch (valueType) {
        case 'string':
          return convertStringToUint64Gbigint(/** @type {string} */ (value));
        case 'bigint':
          return convertBigintToUint64Gbigint(/** @type {bigint} */ (value));
        default:
          return convertNumberToUint64Gbigint(cast(value, isNumber));
      }

    case TypeSpecificApiFormat.LEGACY:
      switch (valueType) {
        case 'string':
          return convertStringToUint64String(
              /** @type {string} */ (value), /* forceTypeChecking = */ false);
        case 'bigint':
          return convertBigintToUint64Gbigint(/** @type {bigint} */ (value));
        default:
          return convertNumberToUint64Number(
              cast(value, isNumber), /* forceTypeChecking = */ false);
      }

    default:
      return checkExhaustive(
          requestedFormat, 'Unknown format requested type for int64');
  }
}

/**
 * @param {*} value
 * @param {!TypeSpecificApiFormat=} requestedFormat
 * @return {number|string|null|undefined}
 */
function checkNullishUint64(value, requestedFormat) {
  // TODO: b/319288438 - Change default format to GBIGINT.
  return value == null ?
      /** @type {null|undefined} */ (value) :
      /** @type {number|string} */ (checkUint64(value, requestedFormat));
}

/**
 * @param {*} value
 *
 * @return {number|undefined|null}
 */
function coerceToNullishUint64(value) {
  if (value == null) {
    return /** @type{undefined|null} */ (value);
  } else if (typeof value === 'bigint') {
    return convertBigintToUint64NumberWhenSafe(/** @type{bigint} */ (value));
  }

  if (!getTypeCheck64BitIntFieldsAreInRange(/*forceTypeChecking = */ false)) {
    return /** @type {number|undefined|null} */ (value);
  }

  if (!isNumberShaped(value, /*forceTypeChecking = */ false)) {
    return undefined;
  } else if (typeof value === 'number') {
    return convertNumberToUint64Number(value, /*forceTypeChecking = */ false);
  }

  const strValue = cast(value, isString);

  // Only coerce across type if full jstype-driven coercion is enabled.
  if (shouldCoerce64BitIntFieldsByJsType(/* forceTypeChecking = */ false)) {
    return convertStringToUint64NumberWhenSafe(
        strValue, /* forceTypeChecking = */ false);
  }

  // We know value is an acceptable number-shaped input, but may still
  // need to truncate to an integer.
  return /** @type{number} */ (
      /** @type {?} */ (convertStringToUint64String(
          strValue, /*forceTypeChecking = */ false)));
}

/**
 * @param {*} value
 * @param {boolean=} forceTypeChecking
 *
 * @return {string|undefined|null}
 */
function coerceToNullishUint64String(value, forceTypeChecking = false) {
  const valueType = typeof value;
  if (value == null) {
    return /** @type {null|undefined} */ (value);
  } else if (valueType === 'bigint') {
    return convertBigintToUint64String(/** @type {bigint} */ (value));
  }

  if (!getTypeCheck64BitIntFieldsAreInRange(forceTypeChecking)) {
    return /** @type {string|undefined|null} */ (value);
  }

  if (!isNumberShaped(value, forceTypeChecking)) {
    return undefined;
  } else if (valueType === 'string') {
    return convertStringToUint64String(
        /** @type{string} */ (value), forceTypeChecking);
  }

  const numValue = cast(value, isNumber);

  // Only coerce across type if jstype-driven coercion is enabled.
  if (shouldCoerce64BitIntFieldsByJsType(forceTypeChecking)) {
    return convertNumberToUint64String(numValue, forceTypeChecking);
  }
  // May still need to truncate to an integer and apply range enforcement.
  return /** @type {string} */ (
      /** @type {?} */ (
          convertNumberToUint64Number(numValue, forceTypeChecking)));
}

/**
 * @param {*} value
 * @return {!gbigint|undefined|null}
 */
function coerceToNullishUint64Gbigint(value) {
  const valueType = typeof value;
  if (value == null) {
    return /** @type {undefined|null} */ (value);
  } else if (valueType === 'bigint') {
    return convertBigintToUint64Gbigint(/** @type {bigint} */ (value));
  }

  if (!isNumberShaped(value, /* forceTypeChecking = */ true)) {
    return undefined;
  } else if (valueType === 'string') {
    return convertStringToUint64Gbigint(/** @type {string} */ (value));
  }

  const numValue = cast(value, isNumber);

  return convertNumberToUint64Gbigint(numValue);
}

/**
 * Replacement for int64 coercion helpers to avoid precision loss. True
 * numbers and numbers as strings are both acceptable values for binary
 * serialization.
 *
 * @param {*} value
 *
 * @return {number|string|undefined|null}
 */
function coerceToNullishInt64StringOrNumber(value) {
  // Nullish values are ok
  if (value == null) {
    return /** @type{null|undefined} */ (value);
  }

  const valueType = typeof value;
  if (valueType === 'bigint') {
    return convertBigintToInt64String(/** @type{bigint} */ (value));
  }

  // This function is only used by binary serialization so it cannot/should
  // not force type checking. We only want to enable type checking early when
  // a user specifically opts into it via a specialized getter.
  const doNotForceTypeChecking = false;

  if (!getTypeCheck64BitIntFieldsAreInRange(doNotForceTypeChecking)) {
    return /** @type{number|string|undefined|null} */ (value);
  }

  if (!isNumberShaped(value, doNotForceTypeChecking)) {
    return undefined;
  } else if (valueType === 'string') {
    return convertStringToInt64String(
        /** @type {string} */ (value), doNotForceTypeChecking);
  } else if (valueType === 'number') {
    return convertNumberToInt64Number(
        /** @type {number} */ (value), doNotForceTypeChecking);
  }

  return undefined;
}

/**
 * Replacement for uint64 coercion helpers to avoid precision loss. True
 * numbers and numbers as strings are both acceptable values for binary
 * serialization.
 *
 * @param {*} value
 *
 * @return {number|string|undefined|null}
 */
function coerceToNullishUint64StringOrNumber(value) {
  // Nullish values are ok
  if (value == null) {
    return /** @type{null|undefined} */ (value);
  }

  const valueType = typeof value;
  if (valueType === 'bigint') {
    return convertBigintToUint64String(/** @type{bigint} */ (value));
  }

  // This function is only used by binary serialization so it cannot/should
  // not force type checking. We only want to enable type checking early when
  // a user specifically opts into it via a specialized getter.
  const doNotForceTypeChecking = false;

  if (!getTypeCheck64BitIntFieldsAreInRange(doNotForceTypeChecking)) {
    return /** @type{number|string|undefined|null} */ (value);
  }

  if (!isNumberShaped(value, doNotForceTypeChecking)) {
    return undefined;
  } else if (valueType === 'string') {
    return convertStringToUint64String(
        /** @type {string} */ (value), doNotForceTypeChecking);
  } else if (valueType === 'number') {
    return convertNumberToUint64Number(
        /** @type {number} */ (value), doNotForceTypeChecking);
  }

  return undefined;
}

/**
 * Coercion for use in the binary implementation that doesn't eagerly
 * construct bytestrings.
 *
 * @return {string|!ByteString|null|undefined}
 */
function coerceToNullishBytesAsStringByteString(/** ? */ v) {
  if (v == null || typeof v == 'string' || v instanceof ByteString) {
    return v;
  }
  // TODO(b/396420284): remove.
  asserts.assert(!(v instanceof Uint8Array));
  return undefined;
}


/**
 * @param {*} value
 * @return {string}
 */
function checkString(value) {
  if (typeof value !== 'string') {
    throw (
        goog.DEBUG ?
            new Error(
                `Expected a string but got ${value} a ${goog.typeOf(value)}`) :
            new Error());
  }
  return /** @type {string} */ (value);
}

/**
 * @param {*} value
 * @return {string|null|undefined}
 */
function checkNullishString(value) {
  if (value != null && typeof value !== 'string') {
    throw (
        goog.DEBUG ?
            new Error(`Expected a string or null or undefined but got ${
                value} a ${goog.typeOf(value)}`) :
            new Error());
  }
  return /** @type{string|null|undefined} */ (value);
}

/** @return {string|undefined|null} */
function coerceToNullishString(/** ? */ value) {
  return (value == null || typeof value === 'string') ?
      /** @type{string|undefined|null} */ (value) :
      undefined;
}

/**
 * Checks that the value matches the type, subject to the current checkLevel.
 *
 * @param {?} value The value to check.
 * @param {function(new: T, ...)} ctor A user-defined constructor.
 * @return {T}
 * @template T
 * @closurePrimitive {asserts.matchesReturn}
 */
function checkMessageType(value, ctor) {
  // It would be faster to do a .constructor === ctor check, but that would
  // break applications using `exemptUnsupportedSubclass` :-{. So instead we use
  // instanceof.
  if (!(value instanceof ctor)) {
    throw new Error(`Expected instanceof ${ctorName(ctor)} but got ${
        value && ctorName(value.constructor)}`);
  }
  return value;
}

/**
 * Inspects the value and either returns it if is already constructed,
 * constructs it in place, or otherwise returns `undefined`.
 *
 * @param {*} value
 * @param {function(new: T, ...)} ctor A user-defined constructor.
 * @param {boolean} constructMissing if the value is not an array or a
 *     message, construct an empty proto
 * @param {number} parentArrayState the array state of the parent array
 * @return {T_RETURN}
 * @template T
 * Use TTL to avoid weird inference
 * @template T_RETURN := union(T, 'null', 'undefined') =:
 * @suppress {visibility} access to message internals
 */
function messageFromInlineStorage(
    value, ctor, constructMissing, parentArrayState) {
  // We want a fast check that it is a message, since in the common case we
  // expect that value is either null/undefined or already constructed. If we
  // find an array we will bootstrap it.

  // The obvious choice is 'instanceof ctor' but that is about half as fast as
  // the property test implemented by isMessage.
  // The second choice is to do `value.constructor === ctor` but that would
  // break applications using `exemptUnsupportedSubclass` :-{. So instead we use
  // the messagePrototype property test.
  if (isInternalMessage(value)) {
    return value;
  }

  if (!Array.isArray(value)) {
    if (!constructMissing) {
      return undefined;
    }

    return (parentArrayState & ArrayStateFlags.IS_IMMUTABLE_ARRAY) ?
        getDefaultImmutableInstanceInternalInline(ctor) :
        new ctor();
  }

  // Otherwise, find our array.
  updateArrayStateForNewlyParsedArray(value, parentArrayState);

  // And return a new instance.
  return new ctor(value);
}


/**
 * @param {!Array<*>} arr
 * @param {number} parentArrayState
 */
function updateArrayStateForNewlyParsedArray(arr, parentArrayState) {
  // Copy the immutable and owned bits bits from our parent to the
  // submessage if they are set.
  const originalArrState = getArrayState(arr);
  let arrState = originalArrState;

  // Newly parsed arrays get their owned bit from their parent.
  arrState |= parentArrayState & ArrayStateFlags.MUTABLE_REFERENCES_ARE_OWNED;

  // If our parent is immutable, we must be immutable.
  arrState |= parentArrayState & ArrayStateFlags.IS_IMMUTABLE_ARRAY;

  if (arrState !== originalArrState) setArrayState(arr, arrState);
}

/**
 * @param {?} value
 * @return {string|undefined}
 */
function getArrayErrorMessage(value) {
  return goog.DEBUG ? `Expected array but got ${goog.typeOf(value)}: ${value}` :
                      undefined;
}

/**
 * @param {*} value
 * @return {!Array<*>}
 * @closurePrimitive {asserts.matchesReturn}
 */
function checkRepeatedFieldIsArray(value) {
  if (!Array.isArray(value)) {
    throw makeTypeError(getArrayErrorMessage(value));
  }
  return /** @type {!Array<*>} */ (value);
}

/**
 * Gets a default immutable instance for the given type.
 *
 * @return {!InternalMessage} The immutable instance.
 * @requireInlining
 */
function getDefaultImmutableInstanceInternalInline(
    /** function(new:InternalMessage, ?Array<?>=) */ ctor) {
  return /** @type {!Object} */ (ctor)[DEFAULT_IMMUTABLE_INSTANCE_SYMBOL] ||=
             emptyImmutableMessage(ctor);
}

/** @return {!InternalMessage} */
function getDefaultImmutableInstanceInternal(
    /** function(new:InternalMessage, ?Array<?>=) */ ctor) {
  return getDefaultImmutableInstanceInternalInline(ctor);
}

/** @return {!InternalMessage} */
function getDefaultImmutableInstanceInternalWithoutLoggingOperations(
    /** function(new:InternalMessage, ?Array<?>=) */ ctor) {
  // Avoid side-effects from this function in operations logs so that we
  // do not have deltas due to test ordering.
  return withoutLogging(() => getDefaultImmutableInstanceInternal(ctor));
}

/**
 * Gets a default immutable instance for the given type.
 *
 * @return {!InternalMessage} The immutable instance.
 */
function getDefaultImmutableInstance(
    /** function(new:InternalMessage, ?Array<?>=) */ ctor) {
  if (DETAILED_JSPB_ASSERTS) {
    // This is defined in another function because the JSCompiler's inlining
    // will back off if you write _any_ lambda.
    return getDefaultImmutableInstanceInternalWithoutLoggingOperations(ctor);
  }

  return getDefaultImmutableInstanceInternalInline(ctor);
}

/**
 * Gets an empty immutable instance for the given type.
 *
 * @param {function(new:InternalMessage, ?Array<?>=)} ctor A user-defined
 *     constructor.
 * @return {!InternalMessage} The immutable instance.
 */
function emptyImmutableMessage(ctor) {
  const newMsg = new ctor();
  markArrayImmutable(
      getInternalArray(/** @type {!InternalMessage} */ (newMsg)));
  return newMsg;
}

/**
 * Coerces the given value to a boolean for map keys or values. Returns
 * undefined if the value is invalid.
 *
 * @return {boolean|undefined}
 */
function booleanToApiForMaps(
    /** ? */ value, /** boolean */ assertCorrectTypeForSetters,
    /** boolean */ constructMissing) {
  if (assertCorrectTypeForSetters) return checkBoolean(value);
  const coerced = coerceToNullishBoolean(value);
  return coerced ?? (constructMissing ? false : undefined);
}

/**
 * Coerces the given value to a boolean for map keys. Returns undefined if the
 * value is invalid.
 *
 * @const
 */
const booleanKeyToApiForMaps = booleanToApiForMaps;


/**
 * Coerces the given value to a number for map keys or values. Returns
 * undefined if the value is invalid.
 *
 * @return {number|undefined}
 */
function int32ToApiForMaps(
    /** ? */ value, /** boolean */ assertCorrectTypeForSetters,
    /** boolean */ constructMissing) {
  value = assertCorrectTypeForSetters ? checkInt32(value) :
                                        coerceToNullishInt32(value);
  // TODO (b//280497549): remove the `| 0` bit once we coerce consistently.
  return (value == null) ? (constructMissing ? 0 : undefined) : (value | 0);
}

/**
 * Coerces the given value to a number for map keys. Returns undefined if the
 * value is invalid.
 *
 * @const
 */
const int32KeyToApiForMaps = int32ToApiForMaps;

/**
 * Coerces the given value to a number for map keys or values. Returns
 * undefined if the value is invalid.
 *
 * @return {number|undefined}
 */
function uint32ToApiForMaps(
    /** ? */ value, /** boolean */ assertCorrectTypeForSetters,
    /** boolean */ constructMissing) {
  value = assertCorrectTypeForSetters ? checkUint32(value) :
                                        coerceToNullishUint32(value);
  // TODO (b//280497549): remove the `>>> 0` bit once we coerce consistently.
  return (value == null) ? (constructMissing ? 0 : undefined) : (value >>> 0);
}

/**
 * Coerces the given value to a number for map keys. Returns undefined if the
 * value is invalid.
 *
 * @return {number|undefined}
 */
function uint32KeyToApiForMaps(
    /** ? */ value, /** boolean */ assertCorrectTypeForSetters,
    /** boolean */ constructMissing) {
  let coerced =
      uint32ToApiForMaps(value, assertCorrectTypeForSetters, constructMissing);
  if (typeof coerced === 'number') {
    return coerced >>> 0;
  }
  return coerced;
}

/**
 * Coerces the given value to a number for map values. Returns undefined if
 * the value is invalid.
 *
 * @return {number|string|!gbigint|undefined}
 */
function int64ToApiForMaps(
    /** ? */ value, /** boolean */ assertCorrectTypeForSetters,
    /** boolean */ constructMissing) {
  value = assertCorrectTypeForSetters ? checkInt64(value) :
                                        coerceToNullishInt64(value);
  return (value == null) ? (constructMissing ? 0 : undefined) : value;
}

/**
 * Coerces the given value to a number for map keys. Returns undefined if the
 * value is invalid.
 *
 * @return {number|string|!gbigint|undefined}
 */
function int64KeyToApiForMaps(
    /** ? */ value, /** boolean */ assertCorrectTypeForSetters,
    /** boolean */ constructMissing) {
  let coerced =
      int64ToApiForMaps(value, assertCorrectTypeForSetters, constructMissing);
  if (typeof coerced === 'string') {
    const num = +coerced;
    if (isSafeInteger(num)) {
      return num;
    }
  }
  return coerced;
}

/**
 * Coerces the given value to a number for map values. Returns undefined if
 * the value is invalid.
 *
 * @return {!gbigint|undefined}
 */
function int64GbigintToApiForMaps(
    /** ? */ value, /** boolean */ assertCorrectTypeForSetters,
    /** boolean */ constructMissing) {
  value = assertCorrectTypeForSetters ?
      /** @type {!gbigint} */ (
          checkInt64(value, TypeSpecificApiFormat.GBIGINT)) :
      coerceToNullishInt64Gbigint(value);
  return (value == null) ? (constructMissing ? GBIGINT_ZERO : undefined) :
                           value;
}


/**
 * Coerces the given value to a number for map keys. Returns undefined if the
 * value is invalid.
 *
 * @return {!gbigint|undefined}
 */
function int64GbigintKeyToApiForMaps(
    /** ? */ value, /** boolean */ assertCorrectTypeForSetters,
    /** boolean */ constructMissing) {
  return int64GbigintToApiForMaps(
      value, assertCorrectTypeForSetters, constructMissing);
}

/**
 * Coerces the given value to a number for map values. Returns  undefined if
 * the value is invalid.
 *
 * @return {number|string|!gbigint|undefined}
 */
function uint64ToApiForMaps(
    /** ? */ value, /** boolean */ assertCorrectTypeForSetters,
    /** boolean */ constructMissing) {
  value = assertCorrectTypeForSetters ? checkUint64(value) :
                                        coerceToNullishUint64(value);
  return (value == null) ? (constructMissing ? 0 : undefined) : value;
}

/**
 * Coerces the given value to a number for map keys. Returns undefined if the
 * value is invalid.
 *
 * @return {number|string|!gbigint|undefined}
 */
function uint64KeyToApiForMaps(
    /** ? */ value, /** boolean */ assertCorrectTypeForSetters,
    /** boolean */ constructMissing) {
  let coerced =
      uint64ToApiForMaps(value, assertCorrectTypeForSetters, constructMissing);
  if (typeof coerced === 'string') {
    const num = +coerced;
    if (isSafeInteger(num)) {
      return num;
    }
  }
  return coerced;
}

/**
 * Coerces the given value to a number for map values. Returns undefined if
 * the value is invalid.
 *
 * @return {!gbigint|undefined}
 */
function uint64GbigintToApiForMaps(
    /** ? */ value, /** boolean */ assertCorrectTypeForSetters,
    /** boolean */ constructMissing) {
  value = assertCorrectTypeForSetters ?
      /** @type {!gbigint} */ (
          checkUint64(value, TypeSpecificApiFormat.GBIGINT)) :
      coerceToNullishUint64Gbigint(value);
  return (value == null) ? (constructMissing ? GBIGINT_ZERO : undefined) :
                           value;
}


/**
 * Coerces the given value to a number for map keys. Returns undefined if the
 * value is invalid.
 *
 * @return {!gbigint|undefined}
 */
function uint64GbigintKeyToApiForMaps(
    /** ? */ value, /** boolean */ assertCorrectTypeForSetters,
    /** boolean */ constructMissing) {
  return uint64GbigintToApiForMaps(
      value, assertCorrectTypeForSetters, constructMissing);
}

/**
 * Coerces the given value to a number for map keys or values. Returns
 * undefined if the value is invalid.
 *
 * @return {number|undefined}
 */
function floatToApiForMaps(
    /** ? */ value, /** boolean */ assertCorrectTypeForSetters,
    /** boolean */ constructMissing) {
  if (assertCorrectTypeForSetters) return checkFloatingPoint(value);
  const coerced = coerceToNullishFloatingPoint(value);
  return coerced ?? (constructMissing ? 0 : undefined);
}

/**
 * Coerces the given value to a string for map keys or values. Returns
 * undefined if the value is invalid.
 *
 * @return {string|undefined}
 */
function stringToApiForMaps(
    /** ? */ value, /** boolean */ assertCorrectTypeForSetters,
    /** boolean */ constructMissing) {
  if (assertCorrectTypeForSetters) return checkString(value);
  const coerced = coerceToNullishString(value);
  return coerced ?? (constructMissing ? '' : undefined);
}

/**
 * Coerces the given value to a string for map keys. Returns undefined if the
 * value is invalid.
 *
 * @const
 */
const stringKeyToApiForMaps = stringToApiForMaps;

/**
 * Coerces the given value to a ByteString for map keys or values. Returns
 * undefined if the value is invalid.
 *
 * @return {!ByteString|undefined}
 */
function bytesToApiForMaps(
    /** ? */ value, /** boolean */ assertCorrectTypeForSetters,
    /** boolean */ constructMissing) {
  if (assertCorrectTypeForSetters) return checkBytes(value);
  const coerced = coerceToNullishBytes(value);
  return coerced ?? (constructMissing ? ByteString.empty() : undefined);
}

/**
 * Coerces the given value to a number for map keys or values. Returns
 * undefined if the value is invalid.
 *
 * @return {number|undefined}
 */
function enumToApiForMaps(
    /** ? */ value, /** boolean */ assertCorrectTypeForSetters,
    /** boolean */ constructMissing) {
  value = assertCorrectTypeForSetters ? checkEnum(value) :
                                        coerceToNullishEnum(value);
  if (value == null) {
    // NOTE: 0 is not necessarily the correct default value for a proto2 enum
    // (it should be the first value defined in the enum), but we don't have
    // that information here.
    return constructMissing ? 0 : undefined;
  }
  return value;
}

exports = {
  booleanKeyToApiForMaps,
  booleanToApiForMaps,
  bytesToApiForMaps,
  checkBoolean,
  checkBytes,
  checkEnum,
  checkFloatingPoint,
  checkInt32,
  checkInt64,
  checkMessageType,
  checkNullishBoolean,
  checkNullishBytes,
  checkNullishEnum,
  checkNullishFloatingPoint,
  checkNullishInt32,
  checkNullishInt64,
  checkNullishString,
  checkNullishUint32,
  checkNullishUint64,
  // TODO: b/237837118 - update callers to checkFloatingPoint and remove
  checkNumber: checkFloatingPoint,
  checkRepeatedFieldIsArray,
  checkString,
  checkUint32,
  checkUint64,
  coerceToNullishBoolean,
  coerceToNullishBytes,
  coerceToNullishEnum,
  coerceToNullishInt32,
  coerceToNullishInt64,
  coerceToNullishInt64Gbigint,
  coerceToNullishInt64String,
  coerceToNullishInt64StringOrNumber,
  coerceToNullishFloatingPoint,
  coerceToNullishString,
  coerceToNullishUint32,
  coerceToNullishUint64,
  coerceToNullishUint64Gbigint,
  coerceToNullishUint64String,
  coerceToNullishUint64StringOrNumber,
  convertBigintToInt64Gbigint,
  convertBigintToUint64Gbigint,
  convertNumberToInt64Gbigint,
  convertNumberToUint64Gbigint,
  convertStringToInt64Gbigint,
  convertStringToUint64Gbigint,
  enumToApiForMaps,
  floatToApiForMaps,
  getDefaultImmutableInstance,
  int32KeyToApiForMaps,
  int32ToApiForMaps,
  int64KeyToApiForMaps,
  int64ToApiForMaps,
  int64GbigintKeyToApiForMaps,
  int64GbigintToApiForMaps,
  isNumberShaped,
  isSafeInt52,
  isValidSignedInt64,
  messageFromInlineStorage,
  stringKeyToApiForMaps,
  stringToApiForMaps,
  uint32KeyToApiForMaps,
  uint32ToApiForMaps,
  uint64KeyToApiForMaps,
  uint64ToApiForMaps,
  uint64GbigintKeyToApiForMaps,
  uint64GbigintToApiForMaps,
  coerceToNullishBytesAsStringByteString,
};
