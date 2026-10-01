/** @fileoverview Internal utilities for working with unknown fields. */
goog.module('jspb.internal_unknown_fields');

const asyncThrow = goog.require('goog.async.throwException');
const {ByteString} = goog.require('jspb.bytestring');
const {HAS_NATIVE_SYMBOL, LAZILY_PARSE_LATE_LOADED_EXTENSIONS_SYMBOL, UNKNOWN_BINARY_FIELDS_SYMBOL, UNKNOWN_BINARY_FIELD_IN_JSPB_SERIALIZE_THROTTLE_KEY, UNKNOWN_BINARY_THROTTLE_KEY, UNKNOWN_JSPB_FIELD_IN_BINARY_SERIALIZE_THROTTLE_KEY} = goog.require('jspb.internal_symbols');
const {InternalMessage, getInternalArray, hasOwnPropertyIfNotTrusted, isMessage} = goog.require('jspb.internal');
const {assert, assertArray} = goog.require('goog.asserts');
const {slice} = goog.require('jspb.internal_operations');
const {throttledAsyncThrowWarning} = goog.require('jspb.exceptions');


/** @return {!UnknownFields|undefined} */
function getUnknownFields(/** !Array */ messageArray) {
  const unknownBinaryFields = goog.weakUsage(UNKNOWN_BINARY_FIELDS_SYMBOL);
  return unknownBinaryFields ? assertArray(messageArray)[unknownBinaryFields] :
                               undefined;
}

/** @typedef {function(!Array, number, !Array<!ByteString>)} */
let UnrevivedFieldCallbackFn;

/**
 * @implements {IObject<number, !Array<!ByteString>>}
 */
class UnknownFields {
  constructor() {
    /**
     * @type {(function(!Array, (number|undefined), ?,
     *     !UnrevivedFieldCallbackFn=): void)|undefined}
     */
    this.reviveUnknownFields;
  }

  forEachUnknownField(
      /** function(!UnknownFields, number, !Array<!ByteString>) */ fn) {
    for (const k in /** @type {?} */ (this)) {
      // the isNaN skips the reviveUnknownFields property.
      if (!hasOwnPropertyIfNotTrusted(this, k) || isNaN(k)) continue;
      fn(this, +k, assertArray(/** @type {?} */ (this)[k]));
    }
  }

  /**
   * Copies this unknown field set.
   * @return {!UnknownFields}
   */
  cloneUnknownFields() {
    const otherFields = new UnknownFields();
    this.forEachUnknownField((fieldSet, fieldNumber, entries) => {
      otherFields[fieldNumber] = slice(entries);
    });
    otherFields.reviveUnknownFields = this.reviveUnknownFields;
    return otherFields;
  }
}


/** Adds a single unknown field. */
function addUnknownField(
    /** !Array */ messageArray, /** number */ fieldNumber,
    /** !ByteString|undefined */ unknownField) {
  assertArray(messageArray);
  if (!unknownField) return;
  const fields = messageArray[UNKNOWN_BINARY_FIELDS_SYMBOL] ??=
      new UnknownFields();
  (fields[fieldNumber] ??= []).push(unknownField);
}

/** Clears all the unknown fields from the array. */
function clearUnknownFields(/** !Array */ messageArray) {
  assertArray(messageArray);
  const unknownBinaryFields = goog.weakUsage(UNKNOWN_BINARY_FIELDS_SYMBOL);
  if (unknownBinaryFields && unknownBinaryFields in messageArray) {
    delete messageArray[unknownBinaryFields];
  }
}

/** Clears all the unknown fields from the array. */
function clearUnknownField(/** !InternalMessage */ msg,
                           /** number */ fieldNumber) {
  assert(isMessage(msg));
  const messageArray = getInternalArray(msg);
  assertArray(messageArray);
  const unknownBinaryFields = goog.weakUsage(UNKNOWN_BINARY_FIELDS_SYMBOL);
  if (unknownBinaryFields && unknownBinaryFields in messageArray) {
    const fields = messageArray[unknownBinaryFields];
    if (fields) delete fields[fieldNumber];
  }
}

/**
 * Copy unknown fields from one message to another. Assumes that the other
 * message does not already have unknown fields.
 */
function copyUnknownFields(/** !Array */ to, /** !Array */ from) {
  if (!goog.weakUsage(UNKNOWN_BINARY_FIELDS_SYMBOL)) return;
  assertArray(to);
  assertArray(from);
  assert(to[UNKNOWN_BINARY_FIELDS_SYMBOL] === undefined);
  const sourceFields = getUnknownFields(from);
  if (sourceFields && sourceFields instanceof UnknownFields) {
    to[UNKNOWN_BINARY_FIELDS_SYMBOL] = sourceFields.cloneUnknownFields();
  }
}

const LAZY_REVIVAL_OPTIONS = {
  reviveIntoImmutable: true
};

function maybeReviveUnknownField(
    /** !InternalMessage */ msg,
    /** number */ fieldNumber,
    /** (typeof LAZILY_PARSE_LATE_LOADED_EXTENSIONS_SYMBOL)|undefined */
    lazyParse,
    /** boolean= */ orClear = false) {
  if (
      // We don't need to retain this block if the lazy parsing or unknown
      // fields symbols are not referenced in this program.
      goog.weakUsage(LAZILY_PARSE_LATE_LOADED_EXTENSIONS_SYMBOL) &&
      goog.weakUsage(UNKNOWN_BINARY_FIELDS_SYMBOL) &&
      // We only revive fields if their extendee sets the lazy pasing bit.
      lazyParse === LAZILY_PARSE_LATE_LOADED_EXTENSIONS_SYMBOL) {
    const messageArray = getInternalArray(msg);
    const unknownBinaryFields = messageArray[UNKNOWN_BINARY_FIELDS_SYMBOL];
    if (!unknownBinaryFields) return;

    // If we have a reviver function and we have not previously failed to revive
    // this field, attempt to revive it.
    const revive = unknownBinaryFields.reviveUnknownFields;
    if (revive) {
      try {
        revive(messageArray, fieldNumber, LAZY_REVIVAL_OPTIONS);
        return;
      } catch (e) {
        // In debug we throw the error to help with debugging but in production
        // we simply continue with the field unset and set a bit to avoid
        // attempting to parse again.
        if (goog.DEBUG) {
          throw new Error(`unknown binary extension ${fieldNumber}`);
        }
        asyncThrow(e);
      }
    }
  }
  if (orClear) clearUnknownField(msg, fieldNumber);
}

let /** boolean|undefined */ shouldIgnoreUnknownFieldAccess;

/**
 * @template T
 * @return {T}
 */
function withoutReportingUnknownExtensionAccess(/** function(): T */ fn) {
  try {
    shouldIgnoreUnknownFieldAccess = true;
    return fn();
  } finally {
    shouldIgnoreUnknownFieldAccess = undefined;
  }
}

let /** boolean|undefined */ shouldIgnoreDroppedUnknownAny;

/**
 * @template T
 * @return {T}
 */
function withoutReportingDroppedUnknownAny(/** function(): T */ fn) {
  try {
    shouldIgnoreDroppedUnknownAny = true;
    return fn();
  } finally {
    shouldIgnoreDroppedUnknownAny = undefined;
  }
}

/**
 * This method should be called on any extension field access to detect
 * dropped unknown binary extensions.
 */
function recordUnknownFieldAccessOnArray(/** !Array */ messageArray,
                                         /** number */ fieldNumber) {
  assertArray(messageArray);
  const unknownBinaryFieldsSymbol =
      goog.weakUsage(UNKNOWN_BINARY_FIELDS_SYMBOL);
  if (HAS_NATIVE_SYMBOL && !shouldIgnoreUnknownFieldAccess &&
      unknownBinaryFieldsSymbol &&
      messageArray[unknownBinaryFieldsSymbol]?.[fieldNumber] != null) {
    // If you see a failure due to this log line, you are losing data because
    // a binary field was unknown at parse time. This could be either an
    // unknown field (e.g. a field that was added after this client was built)
    // or possibly an extension which is unknown to this binary.
    //
    // In the case of an extension, see go/jspb-proto2-extensions for
    // information on how to ensure it is loaded before the parse occurs.
    //
    // See go/jspb-unknown-fields for more context.
    throttledAsyncThrowWarning(
        undefined, UNKNOWN_BINARY_THROTTLE_KEY, 3, `0ub:${fieldNumber}`);
  }
}

/**
 * Reports via async warning that a field was accessed when unknown binary data
 * was present for that field number.
 */
function recordUnknownFieldAccess(/** !InternalMessage */ msg,
                                  /** number */ fieldNumber) {
  assert(isMessage(msg));
  recordUnknownFieldAccessOnArray(getInternalArray(msg), fieldNumber);
}

/**
 * Reports via async warning that a field was dropped during binary
 * serialization.
 */
function recordUnknownFieldDroppedInSerializeBinary(/** !Array */ messageArray,
                                                    /** number */ fieldNumber) {
  assertArray(messageArray);

  // Drop out for low field numbers as they are not likely to be extensions
  // so a warning would not be actionable.
  if (fieldNumber < 500) return;

  // If you see a failure due to this log line, you are losing data because
  // a JSPB field was unknown at serialization time. This could be either an
  // unknown field (e.g. a field that was added after this client was built)
  // or possibly an extension which is unknown to this binary.
  //
  // In the case of an extension, see go/jspb-proto2-extensions for
  // information on how to ensure it is loaded before the serialization
  // occurs.
  throttledAsyncThrowWarning(
      undefined, UNKNOWN_JSPB_FIELD_IN_BINARY_SERIALIZE_THROTTLE_KEY, 3,
      `0ubsb:${fieldNumber}`);
}


/**
 * Reports via async warning that an Any value was dropped during binary
 * serialization.
 */
function recordJspbAnyDroppedInSerializeBinary(
    /** !Array|!InternalMessage */ value) {
  if (!shouldIgnoreDroppedUnknownAny) {
    // If you see a failure due to this log line, you are losing data from an
    // Any proto during binary serialization, see go/jspb-api-gotchas#any.
    //
    // We recommend passing the `serializeBinaryFn` parameter to `Any.packJspb`
    // if the Any was packed client-side.
    throttledAsyncThrowWarning(
        undefined, UNKNOWN_JSPB_FIELD_IN_BINARY_SERIALIZE_THROTTLE_KEY, 3,
        '0ubsb');
  }
}

/**
 * Reports via async warning that a field was dropped during JSPB
 * serialization.
 */
function recordUnknownFieldDroppedInSerialize(
    /** !UnknownFields */ unknownFields,
    /** number */ fieldNumber,
    /** !Array<!ByteString> */ entries) {
  // Drop out for low field numbers as they are not likely to be extensions
  // so a warning would not be actionable.
  if (fieldNumber < 100) return;

  // If you see a failure due to this log line, you are losing data because
  // a binary field was unknown at parse time. This could be either an
  // unknown field (e.g. a field that was added after this client was built)
  // or possibly an extension which is unknown to this binary.
  //
  // In the case of an extension, see go/jspb-proto2-extensions for
  // information on how to ensure it is loaded before the parse occurs.
  //
  // See go/jspb-unknown-fields for more context.
  throttledAsyncThrowWarning(
      undefined, UNKNOWN_BINARY_FIELD_IN_JSPB_SERIALIZE_THROTTLE_KEY, 1,
      `0ubs:${fieldNumber}`);
}

exports = {
  UnknownFields,
  addUnknownField,
  clearUnknownField,
  clearUnknownFields,
  copyUnknownFields,
  getUnknownFields,
  maybeReviveUnknownField,
  recordJspbAnyDroppedInSerializeBinary,
  recordUnknownFieldAccess,
  recordUnknownFieldDroppedInSerializeBinary,
  recordUnknownFieldDroppedInSerialize,
  withoutReportingDroppedUnknownAny,
  withoutReportingUnknownExtensionAccess,
};
