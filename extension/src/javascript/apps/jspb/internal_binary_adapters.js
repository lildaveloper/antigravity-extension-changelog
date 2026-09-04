/**
 * @fileoverview contains internal gencode helper routines for gencode.
 *
 * DO NOT USE THIS OUTSIDE OF THIS PACKAGE.
 */
goog.module('jspb_internal_binary');
// needed for gencode
goog.module.declareLegacyNamespace();

const typeTokens = goog.require('google3.javascript.apps.jspb.internal_binary_type_tokens');
const {ArrayStateFlags, getArrayState, getPossiblyUnconstructedMessageArrayState, markKnownMapArray, setArrayState} = goog.require('jspb.internal_array_state');
const {BinaryComparisonTypeInfo, binaryComparisonTypeInfoForBinaryFields, isEmptyComparisonInfo} = goog.require('google3.javascript.apps.jspb.internal_binary_comparison');
const {BinaryReader, BinaryReaderOptions, LIMIT_RECURSION_DEPTH, UTF8_PARSING_ERRORS_ARE_FATAL} = goog.require('jspb.binary.reader');
const {BinaryWriter} = goog.require('jspb.binary.writer');
const {ByteSource} = goog.requireType('jspb.binary.bytesource');
const {ByteString} = goog.require('jspb.bytestring');
const {COMPARISON_TYPE_INFO_SYMBOL} = goog.require('jspb.internal_symbols');
const {Deserializers, ReaderWriterPair, WriterFn, asMessageArray, isMessageBinaryFieldsArray, makeMsgRWPair} = goog.require('google3.javascript.apps.jspb.internal_binary_fields');
const {ENCODED_MAP_META, MessageMeta, arrayIndexOffsetForMeta, constructMessageArrayFromMetaForBinary} = goog.require('jspb.internal_construct');
const {JspbMap} = goog.require('jspb.internal_map');
const {Message} = goog.require('jspb');
const {SerializeBinaryFnHolder, fieldNumberFromIndex, getHasMessageId, getInternalArray, hasOwnPropertyIfNotTrusted, isSparseObject} = goog.require('jspb.internal');
const {WireType} = goog.require('jspb.BinaryConstants');
const {addToRepeatedFieldForBinary, getMutableOneofWrapperArrayForBinary, getMutableWrapperArrayForBinary, getRepeatedFieldForBinary, putIntoMapForBinary, setFieldIgnoringImmutability, setOneofFieldForBinary} = goog.require('jspb_internal_adapters');
const {assert, assertArray, assertInstanceof} = goog.require('goog.asserts');
const {coerceToNullishBoolean, coerceToNullishBytesAsStringByteString, coerceToNullishFloatingPoint, coerceToNullishInt32, coerceToNullishInt64StringOrNumber, coerceToNullishString, coerceToNullishUint32, coerceToNullishUint64StringOrNumber} = goog.require('jspb.internal_accessor_helpers');
const {deserializeBinaryMessageSet, makeDeserializeBinaryFromReaderFromBinaryFields} = goog.require('google3.javascript.apps.jspb.internal_binary_deserializers');
const {getDeserializeBinary64BitIntsAsGbigint} = goog.require('jspb.internal_options');
const {maxRecursionDepthExceededError} = goog.require('jspb.binary.errors');
const {recordJspbAnyDroppedInSerializeBinary} = goog.require('jspb.internal_unknown_fields');
const {serializeBinaryToWriterGenericImpl, serializersForBinaryFields} = goog.require('google3.javascript.apps.jspb.internal_binary_serializers');
const {toGbigint} = goog.require('google3.javascript.common.bigint.index');

/** @const {function(!Array, !BinaryReader, !Deserializers)} */
exports.deserializeBinaryMessageSet = deserializeBinaryMessageSet;

// Note: this is narrower than the version in internal_binary_fields but because
// that one has an intersection it will end up `?`.
/** @typedef {!Array<*>} */
let BinaryFields;

/** @type {!gbigint} */
const GBIGINT_ZERO = /** @pureOrBreakMyCode */ (toGbigint(0));

/** @return {!WriterFn} */
exports.makeMessageSetExtensionWriterFn = function(
    /** !MessageMeta */ messageMetadata,
    /** function(!Array, !BinaryWriter) */ writerCallback) {
  return (/** !BinaryWriter */ w, /** ? */ subMessage,
          /** number */ fieldNumber) =>
             w.writeMessageSet(
                 fieldNumber, asMessageArray(subMessage, messageMetadata),
                 writerCallback);
};

/**
 * Coerces values in a primitive repeated field array.
 * @return {!Array<?>|undefined}
 */
function asCoercedArray(
    /** function(?):? */ coercionFn, /** ? */ v,
    /** boolean */ markApiFormatted) {
  if (!Array.isArray(v)) {
    return undefined;
  }

  const existingState = getArrayState(v);
  if (existingState & ArrayStateFlags.IS_API_FORMATTED) {
    return v;
  }
  let from = 0, to = 0;
  for (; from < v.length; from++) {
    const coerced = coercionFn(v[from]);
    if (coerced != null) {
      assert(typeof coerced !== 'object' || coerced instanceof ByteString);
      v[to++] = coerced;
    }
  }
  if (to < from) {
    // trim the end of the array since we dropped some invalid values.
    v.length = to;
  }
  let arrayState = existingState | ArrayStateFlags.IS_REPEATED_FIELD;
  if (markApiFormatted) {
    arrayState |= ArrayStateFlags.IS_API_FORMATTED;
    arrayState &=
        ~(ArrayStateFlags.STRING_FORMATTED | ArrayStateFlags.GBIGINT_FORMATTED);
  }
  if (arrayState !== existingState) {
    setArrayState(v, arrayState);
  }
  // Freeze if we've just marked an immutable array as API-formatted
  if (markApiFormatted && (arrayState & ArrayStateFlags.IS_IMMUTABLE_ARRAY)) {
    Object.freeze(v);
  }
  return v;
}

function doWriteRepeatedMessage(
    /** !BinaryWriter */ w, /** ? */ v, /** number */ fn,
    /** !MessageMeta */ mm,
    /** function(!Array<?>,!BinaryWriter) */
    wc, /**
           function(!BinaryWriter, ?,
           number, !MessageMeta,
           function(!Array<?>,!BinaryWriter))
         */
    delegate) {
  if (!Array.isArray(v)) {
    return;
  }
  for (let i = 0; i < v.length; i++) {
    delegate(w, v[i], fn, mm, wc);
  }
  const arrayState = getArrayState(v);
  if (!(arrayState & ArrayStateFlags.IS_REPEATED_FIELD)) {
    setArrayState(v, arrayState | ArrayStateFlags.IS_REPEATED_FIELD);
  }
}

/**
 * Write this Map field in wire format to a BinaryWriter, using the
 * given field number.
 */
function writeMapEntry(
    /** !BinaryWriter */ writer, /** ? */ mapValue,
    /** number */ mapFieldNumber,
    /** !MessageMeta */ mm, /** function(!Array<?>,!BinaryWriter) */ wc) {
  if (mapValue instanceof JspbMap) {
    mapValue.forEach((value, key) => {
      writer.writeMessage(
          mapFieldNumber,
          constructMessageArrayFromMetaForBinary([key, value], mm), wc);
    });
  } else if (Array.isArray(mapValue)) {
    for (let i = 0; i < mapValue.length; i++) {
      const entry = mapValue[i];
      // non-arrays imply a schema mismatch which is allowed so we just skip
      // over it.
      if (Array.isArray(entry)) {
        writer.writeMessage(
            mapFieldNumber, constructMessageArrayFromMetaForBinary(entry, mm),
            wc);
      }
    }
    markKnownMapArray(mapValue);
  }
}

/**
 * Read this Map field from the Binary Reader, writing to the given field index
 * in the message
 * @return {boolean}
 */
function readMapEntry(
    /** !BinaryReader */ reader, /** !Array */ messageArray,
    /** number */ mapFieldNumber, /** !MessageMeta */ messageEntryMeta,
    /** function(!Array<?>, !BinaryReader) */ messageEntryReader) {
  if (reader.getWireType() !== WireType.DELIMITED) {
    return false;
  }
  // Read the message entry as a message
  const entry = reader.readMessage(
      constructMessageArrayFromMetaForBinary(
          [undefined, undefined], messageEntryMeta),
      messageEntryReader);
  putIntoMapForBinary(messageArray, mapFieldNumber, entry);
  return true;
}

/** @const */
exports.makeDeserializeBinaryFromReaderFromBinaryFields =
    makeDeserializeBinaryFromReaderFromBinaryFields;

/** @return {!BinaryComparisonTypeInfo|undefined} */
function getChildBinaryComparisonTypeInfo(
    /** number */ fieldNumber,
    /** !BinaryComparisonTypeInfo */ parentBinaryComparisonTypeInfo,
) {
  const parent = /** @type {!IObject<number, !BinaryComparisonTypeInfo>} */ (
      parentBinaryComparisonTypeInfo);
  let childBinaryComparisonTypeInfo = parent[fieldNumber];
  if (!childBinaryComparisonTypeInfo) return;

  // Our type info was not yet constructed: do that now.
  if (isMessageBinaryFieldsArray(childBinaryComparisonTypeInfo)) {
    parent[fieldNumber] = childBinaryComparisonTypeInfo =
        binaryComparisonTypeInfoForBinaryFields(
            childBinaryComparisonTypeInfo,
        );
  }
  return childBinaryComparisonTypeInfo;
}

/**
 * Retrieves a (cached) BinaryComparisonTypeInfo object for the given binary
 * fields.
 *
 * @return {!BinaryComparisonTypeInfo}
 */
function getBinaryComparisonTypeInfo(/** !BinaryFields */ binaryFields) {
  return binaryComparisonTypeInfoForBinaryFields(binaryFields);
}

/** @const {number} */
const MAP_VALUE_FIELD_NUMBER = 2;

/**
 * Attaches comparison-related type information recursively to a field in a
 * message when that field is typed as a message.
 *
 * @param {number} fieldNumber
 * @param {!BinaryComparisonTypeInfo} parentBinaryComparisonTypeInfo Type
 *     information for the parent message.
 * @param {!Object} field the value of the field
 * @return {undefined}
 */
function makeCrossSerializerComparisonsCompatibleForField(
    fieldNumber, parentBinaryComparisonTypeInfo, field) {
  // If this field doesn't have type info, drop out.
  let childBinaryComparisonTypeInfo = getChildBinaryComparisonTypeInfo(
      fieldNumber, parentBinaryComparisonTypeInfo);
  if (!childBinaryComparisonTypeInfo) return;

  // If this is a literal map, we can recurse using forEach.
  if (field instanceof JspbMap) {
    // Our child type info is a BinaryComparisonTypeInfo object _for the map
    // entry_ since, from the binary perspective, maps are repeated messages.
    //
    // Therefore we unwrap the map value field here. If it does not have
    // comparison type info, we can drop out before walking it.
    const messageBinaryComparisonTypeInfo = getChildBinaryComparisonTypeInfo(
        MAP_VALUE_FIELD_NUMBER, childBinaryComparisonTypeInfo);
    if (!messageBinaryComparisonTypeInfo) return;
    for (const [k, v] of field) {
      makeCrossSerializerComparisonsCompatibleGenericImpl(
          getInternalArray(assertInstanceof(v, Message)),
          assert(messageBinaryComparisonTypeInfo));
    }
  }

  // This is a repeated message field or a repeated map entry field.
  if (parentBinaryComparisonTypeInfo.getRepeatedFields().has(fieldNumber) ||
      parentBinaryComparisonTypeInfo.getMapFields().has(fieldNumber)) {
    if (!Array.isArray(field)) return;

    for (let i = 0; i < field.length; i++) {
      let value = field[i];

      // If this was a repeated message field, unwrap any messages.
      if (value instanceof Message) {
        value = getInternalArray(value);
      } else if (!Array.isArray(value)) {
        throw (
            goog.DEBUG ? new Error(`found a bad value in place of a message: ${
                             value} with field number ${
                             fieldNumber} and comparison info ${
                             JSON.stringify(parentBinaryComparisonTypeInfo)}`) :
                         new Error());
      }

      // Recurse.
      makeCrossSerializerComparisonsCompatibleGenericImpl(
          value, childBinaryComparisonTypeInfo);
    }
    return;
  }

  // If this field is a message, unwrap it.
  if (field instanceof Message) {
    field = getInternalArray(field);
  } else if (!Array.isArray(field)) {
    throw (
        goog.DEBUG ? new Error('found a bad value in place of a message') :
                     new Error());
  }

  // this is a singular message field or map entry proto.
  makeCrossSerializerComparisonsCompatibleGenericImpl(
      field, childBinaryComparisonTypeInfo);
}

/**
 * Attaches type information to a message array to distinguish singular from
 * repeated or map fields.
 *
 * @param {!Array} messageArray The message object to which we are attaching
 *     type information.
 * @param {!BinaryComparisonTypeInfo} comparisonTypeInfo Type information for
 *     comparisons.
 */
function makeCrossSerializerComparisonsCompatibleGenericImpl(
    messageArray, comparisonTypeInfo) {
  assertArray(messageArray);
  // If the current message is effectively empty don't bother recursing.
  if (isEmptyComparisonInfo(comparisonTypeInfo)) return;

  // Be sure we attach type info at the root.
  if (!comparisonTypeInfo.onlySubmessages) {
    messageArray[COMPARISON_TYPE_INFO_SYMBOL] = comparisonTypeInfo;
  }

  // First, iterate over dense properties.
  const arrayLen = messageArray.length;
  const arrayIndexOffset = arrayIndexOffsetForMeta(
      /** @type {?} */ (assert(comparisonTypeInfo.messageMetadata)));
  for (let i = 0; i < messageArray.length; i++) {
    const value = messageArray[i];

    // We only care about present values with type object.
    if (!value || typeof value !== 'object') continue;

    // Unwrap and iterate over a sparse object if we see one.
    if (i === arrayLen - 1 && isSparseObject(value)) {
      const sparseObject = /** @type {!Object} */ (value);
      for (const k in sparseObject) {
        if (!hasOwnPropertyIfNotTrusted(sparseObject, k)) continue;
        const fieldNumber = +k;
        if (Number.isNaN(fieldNumber)) continue;

        // We only care about present values with type object.
        const value = sparseObject[k];
        if (!value || typeof value !== 'object') continue;

        makeCrossSerializerComparisonsCompatibleForField(
            fieldNumber, comparisonTypeInfo,
            /** @type {!Object} */ (value));
      }
      continue;
    }

    // If this field has comparison type info, recurse.
    const fieldNumber = fieldNumberFromIndex(i, arrayIndexOffset);
    makeCrossSerializerComparisonsCompatibleForField(
        fieldNumber, comparisonTypeInfo, /** @type {!Object} */ (value));
  }
}

/**
 * A private symbol for makeCrossSerializerComparisonsCompatible functions.
 */
const /** symbol */ makeCrossSerializerComparisonsCompatibleCache =
    /** @pureOrBreakMyCode */ (
        goog.DEBUG ? Symbol('makeCrossSerializerComparisonsCompatible') :
                     Symbol());


/**
 * Returns a cached implementation for makeCrossSerializerComparisonsCompatible
 * from the given binary fields object.
 *
 * @return {function(!Array)}
 * @template T
 */
function makeCrossSerializerComparisonsCompatibleFromBinaryFields(
    /** !BinaryFields */ binaryFieldsInitializer) {
  let /** ? */ makeCrossSerializerComparisonsCompatibleFn =
      binaryFieldsInitializer[makeCrossSerializerComparisonsCompatibleCache];
  if (!makeCrossSerializerComparisonsCompatibleFn) {
    const comparisonInfo = getBinaryComparisonTypeInfo(binaryFieldsInitializer);
    makeCrossSerializerComparisonsCompatibleFn = (/** !Array */ messageArray) =>
        makeCrossSerializerComparisonsCompatibleGenericImpl(
            messageArray, comparisonInfo);
    binaryFieldsInitializer[makeCrossSerializerComparisonsCompatibleCache] =
        makeCrossSerializerComparisonsCompatibleFn;
  }
  return makeCrossSerializerComparisonsCompatibleFn;
}

/**
 * Returns a function that wires enough type information to message fields to
 * allow them to be effectively compared using Message.equals across
 * go/jspb-wireformat implementations.
 *
 * @template T
 */
exports.makeCrossSerializerComparisonsCompatible =
    (/** !Message */ msg,
     /** !BinaryFields */ binaryFields) => {
      makeCrossSerializerComparisonsCompatibleFromBinaryFields(binaryFields)(
          getInternalArray(assertInstanceof(msg, Message)));
    };


/**
 * Implementation for the per-class deserializeBinary method.
 *
 * @template T
 * @return {T}
 */
exports.deserializeBinary = (/** ?ByteSource|!ByteString */ bytes,
                             /** function(new:T,?Array<?>=) */ ctor,
                             /** !BinaryFields */ binaryFields,
                             /** !BinaryReaderOptions=*/ userOptions) => {
  const options = {treatNewDataAsImmutable: true};
  if (userOptions) Object.assign(options, userOptions);
  const reader = BinaryReader.alloc(bytes, undefined, undefined, options);
  try {
    const msg = new ctor();
    const arr = getInternalArray(/** @type{!Message}*/ (msg));
    makeDeserializeBinaryFromReaderFromBinaryFields(binaryFields)(arr, reader);
    return msg;
  } catch (err) {
    if (LIMIT_RECURSION_DEPTH && err instanceof RangeError) {
      throw maxRecursionDepthExceededError();
    }
    throw assertInstanceof(err, Error);
  } finally {
    reader.free();
  }
};


/**
 * Implementation for the per-class serializeBinary method.
 * @return {!Uint8Array}
 */
exports.serializeBinary = (/** !Message */ message,
                           /** !BinaryFields */ binaryFieldsInitializer) => {
  const writer = new BinaryWriter();
  serializeBinaryToWriterGenericImpl(
      getInternalArray(assertInstanceof(message, Message)), writer,
      serializersForBinaryFields(binaryFieldsInitializer));
  return writer.getResultBuffer();
};

/**
 * Implementation for the per-class serializeBinaryToByteString method.
 * @return {!ByteString}
 */
exports.serializeBinaryToByteString =
    (/** !Message */ message,
     /** !BinaryFields */ binaryFieldsInitializer) => {
      const writer = new BinaryWriter();
      serializeBinaryToWriterGenericImpl(
          getInternalArray(assertInstanceof(message, Message)), writer,
          serializersForBinaryFields(binaryFieldsInitializer));
      return writer.getResultBufferAsByteString();
    };

/** Serializes a message to a binary writer. */
exports.serializeBinaryToWriter = (/** !Message */ message,
                                   /** !BinaryFields */ binaryFieldsInitializer,
                                   /** !BinaryWriter */ writer) => {
  serializeBinaryToWriterGenericImpl(
      getInternalArray(assertInstanceof(message, Message)), writer,
      serializersForBinaryFields(binaryFieldsInitializer));
};

/**
 * @return {!ReaderWriterPair}
 */
function makeRWPair(
    /** !Function */ reader, /** !Function */ writer,
    /** !typeTokens.OpaqueTypeToken */ typeToken) {
  return new ReaderWriterPair(
      reader, writer, /* isRepeated = */ false, typeToken);
}

/**
 * @return {!ReaderWriterPair}
 */
function makeRepeatedRWPair(
    /** !Function */ reader, /** !Function */ writer,
    /** !typeTokens.OpaqueTypeToken */ typeToken) {
  return new ReaderWriterPair(reader, writer, typeTokens.REPEATED, typeToken);
}

/**
 * @return {!ReaderWriterPair}
 */
function makeRepeatedMsgRWPair(
    /** !Function */ reader, /** !Function */ writer,
    /** !typeTokens.OpaqueTypeToken= */ typeToken = typeTokens.MESSAGE) {
  return new ReaderWriterPair(reader, writer, typeTokens.REPEATED, typeToken);
}

/*
 * The functions below all have a consistent signature documented here for
 * simplicity
 * For the `write*` functions we take
 *  - `w` The writer to write data to
 *  - `m` the Message to pull data from
 *  - `fn` the field number of the data
 *
 * For the `read*` functions we take
 * - `r` The reader to read data from
 * - `m` the Message to place data from
 * - `fi` where to place the data in the message
 * - `mc` (optional) for message valued fields, the message constructor
 * - `mr` (optional) for message valued fields the message reader callback
 *
 * For read and write we also have slighlty modified methods for
 * message/group fields that additionally take a constructor and a
 * serializer/deserializer function.
 *
 * Generally types are omitted in order to reduce bytes in this file for
 * uncompiled usecases.  We provide a type whenever we need to access a
 * property on an object of that type.
 */


/**
 * Specialized version of writeBytes for the Any.value field to allow handling
 * of values that are jspb instead of binary format.
 */
function writeAnyValueBytes(
    /** !BinaryWriter */ w, /** ? */ value, /** number */ fn) {
  if (value != null) {
    // Check if this is a jspb value Any. If it is, we can serialize it to
    // binary only if a serializeBinary function was provided to the packJspb
    // call that created this value. Without that function, the value won't be
    // binary serialized and appears as missing.
    if (value instanceof Message) {
      const serializeBinaryFnForAnyProto =
          (/** @type{!SerializeBinaryFnHolder} */ (/** @type{?} */ (value)))
              .serializeBinaryFnForAnyProto_;
      if (serializeBinaryFnForAnyProto) {
        w.writeBytes(fn, serializeBinaryFnForAnyProto(value));
      } else {
        recordJspbAnyDroppedInSerializeBinary(value);
      }
      return;
    } else if (Array.isArray(value)) {
      recordJspbAnyDroppedInSerializeBinary(value);
      // parsed jspb format value from wire, can't serialize to binary
      return;
    }
  }
  writeBytes(w, value, fn);
}


// Shim functions to simplify how the binary adapters below call into the
// jspb_adapters

function setFieldBinary(
    /** !Array */ messageArray, /** number */ fieldNumber, /** ? */ value) {
  setFieldIgnoringImmutability(
      messageArray, getPossiblyUnconstructedMessageArrayState(messageArray),
      fieldNumber, value, getHasMessageId(getArrayState(messageArray)));
}


/** @return {!Array} */
function addAndReturnBinary(
    /** !Array<?> */ messageArray,
    /** !MessageMeta */ meta,
    /** number */ fieldNumber) {
  const value = constructMessageArrayFromMetaForBinary(undefined, meta);
  addToRepeatedFieldForBinary(messageArray, fieldNumber, value);
  return value;
}


/** @const {?} */
exports.RBytesIgnoringDefaultWAnyValueBytes = /** @pureOrBreakMyCode */ (
    makeRWPair(readBytesIgnoringDefault, writeAnyValueBytes, typeTokens.BYTES));


/** @const {?} */
exports.RWMapEntry =
    /** @pureOrBreakMyCode */ (makeMsgRWPair(readMapEntry, writeMapEntry));


/**
 * @nosideeffects
 * @return {!BinaryFields}
 */
function createMapEntryBinaryFields(
    /** !ReaderWriterPair */ keyAdapter,
    /** !ReaderWriterPair */ valueAdapter) {
  return [ENCODED_MAP_META, keyAdapter, valueAdapter];
}

/**
 * @nosideeffects
 * @return {!BinaryFields}
 */
exports.createMessageMapEntryBinaryFields = function(
    /** !ReaderWriterPair */ keyAdapter,
    /** !BinaryFields|function():!BinaryFields */ messageBinaryFields) {
  // TODO(lukes): We could implement a cache since having multiple maps with
  // the same key and value would be likely.  For primitives we pre-cache all
  // combinations but for messages this isn't possible.
  return [ENCODED_MAP_META, keyAdapter, messageBinaryFields];
};

//
// Generated code follows. To update, run:
// javascript/apps/jspb/update_adapters.sh
//
// BEGIN AUTO-GENERATED ////////////////////////////////////////////////////////

function writeDouble(/** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writeDouble(fn, coerceToNullishFloatingPoint(v));
}
function writeRepeatedDouble(
    /** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writeRepeatedDouble(
      fn, asCoercedArray(coerceToNullishFloatingPoint, v, true));
}
function writePackedDouble(
    /** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writePackedDouble(
      fn, asCoercedArray(coerceToNullishFloatingPoint, v, true));
}
function writeFloat(/** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writeFloat(fn, coerceToNullishFloatingPoint(v));
}
function writeRepeatedFloat(
    /** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writeRepeatedFloat(
      fn, asCoercedArray(coerceToNullishFloatingPoint, v, true));
}
function writePackedFloat(
    /** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writePackedFloat(fn, asCoercedArray(coerceToNullishFloatingPoint, v, true));
}
function writeInt64(/** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writeInt64(fn, coerceToNullishInt64StringOrNumber(v));
}
function writeRepeatedInt64(
    /** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writeRepeatedInt64(
      fn, asCoercedArray(coerceToNullishInt64StringOrNumber, v, false));
}
function writePackedInt64(
    /** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writePackedInt64(
      fn, asCoercedArray(coerceToNullishInt64StringOrNumber, v, false));
}
function writeUint64ToleratingNegatives(
    /** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writeUint64ToleratingNegatives(fn, coerceToNullishUint64StringOrNumber(v));
}
function writeRepeatedUint64ToleratingNegatives(
    /** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writeRepeatedUint64ToleratingNegatives(
      fn, asCoercedArray(coerceToNullishUint64StringOrNumber, v, false));
}
function writePackedUint64ToleratingNegatives(
    /** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writePackedUint64ToleratingNegatives(
      fn, asCoercedArray(coerceToNullishUint64StringOrNumber, v, false));
}
function writeUint64(/** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writeUint64(fn, coerceToNullishUint64StringOrNumber(v));
}
function writeRepeatedUint64(
    /** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writeRepeatedUint64(
      fn, asCoercedArray(coerceToNullishUint64StringOrNumber, v, false));
}
function writePackedUint64(
    /** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writePackedUint64(
      fn, asCoercedArray(coerceToNullishUint64StringOrNumber, v, false));
}
function writeInt32(/** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writeInt32(fn, coerceToNullishInt32(v));
}
function writeRepeatedInt32(
    /** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writeRepeatedInt32(fn, asCoercedArray(coerceToNullishInt32, v, true));
}
function writePackedInt32(
    /** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writePackedInt32(fn, asCoercedArray(coerceToNullishInt32, v, true));
}
function writeFixed64ToleratingNegatives(
    /** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writeFixed64ToleratingNegatives(fn, coerceToNullishUint64StringOrNumber(v));
}
function writeRepeatedFixed64ToleratingNegatives(
    /** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writeRepeatedFixed64ToleratingNegatives(
      fn, asCoercedArray(coerceToNullishUint64StringOrNumber, v, false));
}
function writePackedFixed64ToleratingNegatives(
    /** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writePackedFixed64ToleratingNegatives(
      fn, asCoercedArray(coerceToNullishUint64StringOrNumber, v, false));
}
function writeFixed64(/** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writeFixed64(fn, coerceToNullishUint64StringOrNumber(v));
}
function writeRepeatedFixed64(
    /** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writeRepeatedFixed64(
      fn, asCoercedArray(coerceToNullishUint64StringOrNumber, v, false));
}
function writePackedFixed64(
    /** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writePackedFixed64(
      fn, asCoercedArray(coerceToNullishUint64StringOrNumber, v, false));
}
function writeFixed32(/** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writeFixed32(fn, coerceToNullishUint32(v));
}
function writeRepeatedFixed32(
    /** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writeRepeatedFixed32(fn, asCoercedArray(coerceToNullishUint32, v, true));
}
function writePackedFixed32(
    /** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writePackedFixed32(fn, asCoercedArray(coerceToNullishUint32, v, true));
}
function writeBool(/** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writeBool(fn, coerceToNullishBoolean(v));
}
function writeRepeatedBool(
    /** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writeRepeatedBool(fn, asCoercedArray(coerceToNullishBoolean, v, true));
}
function writePackedBool(/** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writePackedBool(fn, asCoercedArray(coerceToNullishBoolean, v, true));
}
function writeString(/** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writeString(fn, coerceToNullishString(v));
}
function writeRepeatedString(
    /** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writeRepeatedString(fn, asCoercedArray(coerceToNullishString, v, true));
}
function writeGroup(
    /** !BinaryWriter */ w, /** ? */ v, /** number */ fn,
    /** !MessageMeta */ mm, /** function(!Array<?>,!BinaryWriter) */ wc) {
  w.writeGroup(fn, asMessageArray(v, mm), wc);
}
function writeRepeatedGroup(
    /** !BinaryWriter */ w, /** ? */ v, /** number */ fn,
    /** !MessageMeta */ mm, /** function(!Array<?>,!BinaryWriter) */ wc) {
  doWriteRepeatedMessage(w, v, fn, mm, wc, writeGroup);
}
function writeMessage(
    /** !BinaryWriter */ w, /** ? */ v, /** number */ fn,
    /** !MessageMeta */ mm, /** function(!Array<?>,!BinaryWriter) */ wc) {
  w.writeMessage(fn, asMessageArray(v, mm), wc);
}
function writeRepeatedMessage(
    /** !BinaryWriter */ w, /** ? */ v, /** number */ fn,
    /** !MessageMeta */ mm, /** function(!Array<?>,!BinaryWriter) */ wc) {
  doWriteRepeatedMessage(w, v, fn, mm, wc, writeMessage);
}
function writeBytes(/** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writeBytes(fn, coerceToNullishBytesAsStringByteString(v));
}
function writeRepeatedBytes(
    /** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writeRepeatedBytes(
      fn, asCoercedArray(coerceToNullishBytesAsStringByteString, v, false));
}
function writeUint32(/** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writeUint32(fn, coerceToNullishUint32(v));
}
function writeRepeatedUint32(
    /** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writeRepeatedUint32(fn, asCoercedArray(coerceToNullishUint32, v, true));
}
function writePackedUint32(
    /** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writePackedUint32(fn, asCoercedArray(coerceToNullishUint32, v, true));
}
function writeEnum(/** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writeEnum(fn, coerceToNullishInt32(v));
}
function writeRepeatedEnum(
    /** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writeRepeatedEnum(fn, asCoercedArray(coerceToNullishInt32, v, true));
}
function writePackedEnum(/** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writePackedEnum(fn, asCoercedArray(coerceToNullishInt32, v, true));
}
function writeSfixed32(/** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writeSfixed32(fn, coerceToNullishInt32(v));
}
function writeRepeatedSfixed32(
    /** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writeRepeatedSfixed32(fn, asCoercedArray(coerceToNullishInt32, v, true));
}
function writePackedSfixed32(
    /** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writePackedSfixed32(fn, asCoercedArray(coerceToNullishInt32, v, true));
}
function writeSfixed64(/** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writeSfixed64(fn, coerceToNullishInt64StringOrNumber(v));
}
function writeRepeatedSfixed64(
    /** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writeRepeatedSfixed64(
      fn, asCoercedArray(coerceToNullishInt64StringOrNumber, v, false));
}
function writePackedSfixed64(
    /** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writePackedSfixed64(
      fn, asCoercedArray(coerceToNullishInt64StringOrNumber, v, false));
}
function writeSint32(/** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writeSint32(fn, coerceToNullishInt32(v));
}
function writeRepeatedSint32(
    /** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writeRepeatedSint32(fn, asCoercedArray(coerceToNullishInt32, v, true));
}
function writePackedSint32(
    /** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writePackedSint32(fn, asCoercedArray(coerceToNullishInt32, v, true));
}
function writeSint64(/** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writeSint64(fn, coerceToNullishInt64StringOrNumber(v));
}
function writeRepeatedSint64(
    /** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writeRepeatedSint64(
      fn, asCoercedArray(coerceToNullishInt64StringOrNumber, v, false));
}
function writePackedSint64(
    /** !BinaryWriter */ w, /** ? */ v, /** number */ fn) {
  w.writePackedSint64(
      fn, asCoercedArray(coerceToNullishInt64StringOrNumber, v, false));
}
function /** boolean */ readDouble(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.FIXED64) {
    return false;
  }
  setFieldBinary(m, fn, r.readDouble());
  return true;
}

function /** boolean */ readPackableDoubleInto(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.FIXED64 &&
      r.getWireType() !== WireType.DELIMITED) {
    return false;
  }
  r.readPackableDoubleInto(getRepeatedFieldForBinary(m, fn));
  return true;
}

function /** boolean */ readDoubleIgnoringDefault(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.FIXED64) {
    return false;
  }
  const v = r.readDouble();
  setFieldBinary(m, fn, v === 0 ? undefined : v);
  return true;
}

function /** boolean */ readDoubleOneof(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn, /** ? */ o) {
  if (r.getWireType() !== WireType.FIXED64) {
    return false;
  }
  setOneofFieldForBinary(m, fn, o, r.readDouble());
  return true;
}

function /** boolean */ readFloat(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.FIXED32) {
    return false;
  }
  setFieldBinary(m, fn, r.readFloat());
  return true;
}

function /** boolean */ readPackableFloatInto(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.FIXED32 &&
      r.getWireType() !== WireType.DELIMITED) {
    return false;
  }
  r.readPackableFloatInto(getRepeatedFieldForBinary(m, fn));
  return true;
}

function /** boolean */ readFloatIgnoringDefault(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.FIXED32) {
    return false;
  }
  const v = r.readFloat();
  setFieldBinary(m, fn, v === 0 ? undefined : v);
  return true;
}

function /** boolean */ readFloatOneof(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn, /** ? */ o) {
  if (r.getWireType() !== WireType.FIXED32) {
    return false;
  }
  setOneofFieldForBinary(m, fn, o, r.readFloat());
  return true;
}

function /** boolean */ readInt64Gbigint(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.VARINT) {
    return false;
  }
  setFieldBinary(m, fn, r.readInt64Gbigint());
  return true;
}

function /** boolean */ readPackableInt64GbigintInto(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.VARINT &&
      r.getWireType() !== WireType.DELIMITED) {
    return false;
  }
  r.readPackableInt64GbigintInto(getRepeatedFieldForBinary(m, fn));
  return true;
}

function /** boolean */ readInt64GbigintIgnoringDefault(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.VARINT) {
    return false;
  }
  const v = r.readInt64Gbigint();
  setFieldBinary(m, fn, v === GBIGINT_ZERO ? undefined : v);
  return true;
}

function /** boolean */ readInt64GbigintOneof(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn, /** ? */ o) {
  if (r.getWireType() !== WireType.VARINT) {
    return false;
  }
  setOneofFieldForBinary(m, fn, o, r.readInt64Gbigint());
  return true;
}

function /** boolean */ readInt64String(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (getDeserializeBinary64BitIntsAsGbigint()) {
    return readInt64Gbigint(r, m, fn);
  }
  if (r.getWireType() !== WireType.VARINT) {
    return false;
  }
  setFieldBinary(m, fn, r.readInt64String());
  return true;
}

function /** boolean */ readPackableInt64StringInto(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (getDeserializeBinary64BitIntsAsGbigint()) {
    return readPackableInt64GbigintInto(r, m, fn);
  }
  if (r.getWireType() !== WireType.VARINT &&
      r.getWireType() !== WireType.DELIMITED) {
    return false;
  }
  r.readPackableInt64StringInto(getRepeatedFieldForBinary(m, fn));
  return true;
}

function /** boolean */ readInt64StringIgnoringDefault(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (getDeserializeBinary64BitIntsAsGbigint()) {
    return readInt64GbigintIgnoringDefault(r, m, fn);
  }
  if (r.getWireType() !== WireType.VARINT) {
    return false;
  }
  const v = r.readInt64String();
  setFieldBinary(m, fn, v === '0' ? undefined : v);
  return true;
}

function /** boolean */ readInt64StringOneof(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn, /** ? */ o) {
  if (getDeserializeBinary64BitIntsAsGbigint()) {
    return readInt64GbigintOneof(r, m, fn, o);
  }
  if (r.getWireType() !== WireType.VARINT) {
    return false;
  }
  setOneofFieldForBinary(m, fn, o, r.readInt64String());
  return true;
}

function /** boolean */ readInt64(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (getDeserializeBinary64BitIntsAsGbigint()) {
    return readInt64Gbigint(r, m, fn);
  }
  if (r.getWireType() !== WireType.VARINT) {
    return false;
  }
  setFieldBinary(m, fn, r.readInt64());
  return true;
}

function /** boolean */ readPackableInt64Into(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (getDeserializeBinary64BitIntsAsGbigint()) {
    return readPackableInt64GbigintInto(r, m, fn);
  }
  if (r.getWireType() !== WireType.VARINT &&
      r.getWireType() !== WireType.DELIMITED) {
    return false;
  }
  r.readPackableInt64Into(getRepeatedFieldForBinary(m, fn));
  return true;
}

function /** boolean */ readInt64IgnoringDefault(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (getDeserializeBinary64BitIntsAsGbigint()) {
    return readInt64GbigintIgnoringDefault(r, m, fn);
  }
  if (r.getWireType() !== WireType.VARINT) {
    return false;
  }
  const v = r.readInt64();
  setFieldBinary(m, fn, v === 0 ? undefined : v);
  return true;
}

function /** boolean */ readInt64Oneof(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn, /** ? */ o) {
  if (getDeserializeBinary64BitIntsAsGbigint()) {
    return readInt64GbigintOneof(r, m, fn, o);
  }
  if (r.getWireType() !== WireType.VARINT) {
    return false;
  }
  setOneofFieldForBinary(m, fn, o, r.readInt64());
  return true;
}

function /** boolean */ readUint64Gbigint(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.VARINT) {
    return false;
  }
  setFieldBinary(m, fn, r.readUint64Gbigint());
  return true;
}

function /** boolean */ readPackableUint64GbigintInto(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.VARINT &&
      r.getWireType() !== WireType.DELIMITED) {
    return false;
  }
  r.readPackableUint64GbigintInto(getRepeatedFieldForBinary(m, fn));
  return true;
}

function /** boolean */ readUint64GbigintIgnoringDefault(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.VARINT) {
    return false;
  }
  const v = r.readUint64Gbigint();
  setFieldBinary(m, fn, v === GBIGINT_ZERO ? undefined : v);
  return true;
}

function /** boolean */ readUint64GbigintOneof(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn, /** ? */ o) {
  if (r.getWireType() !== WireType.VARINT) {
    return false;
  }
  setOneofFieldForBinary(m, fn, o, r.readUint64Gbigint());
  return true;
}

function /** boolean */ readUint64String(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (getDeserializeBinary64BitIntsAsGbigint()) {
    return readUint64Gbigint(r, m, fn);
  }
  if (r.getWireType() !== WireType.VARINT) {
    return false;
  }
  setFieldBinary(m, fn, r.readUint64String());
  return true;
}

function /** boolean */ readPackableUint64StringInto(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (getDeserializeBinary64BitIntsAsGbigint()) {
    return readPackableUint64GbigintInto(r, m, fn);
  }
  if (r.getWireType() !== WireType.VARINT &&
      r.getWireType() !== WireType.DELIMITED) {
    return false;
  }
  r.readPackableUint64StringInto(getRepeatedFieldForBinary(m, fn));
  return true;
}

function /** boolean */ readUint64StringIgnoringDefault(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (getDeserializeBinary64BitIntsAsGbigint()) {
    return readUint64GbigintIgnoringDefault(r, m, fn);
  }
  if (r.getWireType() !== WireType.VARINT) {
    return false;
  }
  const v = r.readUint64String();
  setFieldBinary(m, fn, v === '0' ? undefined : v);
  return true;
}

function /** boolean */ readUint64StringOneof(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn, /** ? */ o) {
  if (getDeserializeBinary64BitIntsAsGbigint()) {
    return readUint64GbigintOneof(r, m, fn, o);
  }
  if (r.getWireType() !== WireType.VARINT) {
    return false;
  }
  setOneofFieldForBinary(m, fn, o, r.readUint64String());
  return true;
}

function /** boolean */ readUint64(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (getDeserializeBinary64BitIntsAsGbigint()) {
    return readUint64Gbigint(r, m, fn);
  }
  if (r.getWireType() !== WireType.VARINT) {
    return false;
  }
  setFieldBinary(m, fn, r.readUint64());
  return true;
}

function /** boolean */ readPackableUint64Into(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (getDeserializeBinary64BitIntsAsGbigint()) {
    return readPackableUint64GbigintInto(r, m, fn);
  }
  if (r.getWireType() !== WireType.VARINT &&
      r.getWireType() !== WireType.DELIMITED) {
    return false;
  }
  r.readPackableUint64Into(getRepeatedFieldForBinary(m, fn));
  return true;
}

function /** boolean */ readUint64IgnoringDefault(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (getDeserializeBinary64BitIntsAsGbigint()) {
    return readUint64GbigintIgnoringDefault(r, m, fn);
  }
  if (r.getWireType() !== WireType.VARINT) {
    return false;
  }
  const v = r.readUint64();
  setFieldBinary(m, fn, v === 0 ? undefined : v);
  return true;
}

function /** boolean */ readUint64Oneof(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn, /** ? */ o) {
  if (getDeserializeBinary64BitIntsAsGbigint()) {
    return readUint64GbigintOneof(r, m, fn, o);
  }
  if (r.getWireType() !== WireType.VARINT) {
    return false;
  }
  setOneofFieldForBinary(m, fn, o, r.readUint64());
  return true;
}

function /** boolean */ readInt32(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.VARINT) {
    return false;
  }
  setFieldBinary(m, fn, r.readInt32());
  return true;
}

function /** boolean */ readPackableInt32Into(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.VARINT &&
      r.getWireType() !== WireType.DELIMITED) {
    return false;
  }
  r.readPackableInt32Into(getRepeatedFieldForBinary(m, fn));
  return true;
}

function /** boolean */ readInt32IgnoringDefault(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.VARINT) {
    return false;
  }
  const v = r.readInt32();
  setFieldBinary(m, fn, v === 0 ? undefined : v);
  return true;
}

function /** boolean */ readInt32Oneof(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn, /** ? */ o) {
  if (r.getWireType() !== WireType.VARINT) {
    return false;
  }
  setOneofFieldForBinary(m, fn, o, r.readInt32());
  return true;
}

function /** boolean */ readFixed64Gbigint(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.FIXED64) {
    return false;
  }
  setFieldBinary(m, fn, r.readFixed64Gbigint());
  return true;
}

function /** boolean */ readPackableFixed64GbigintInto(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.FIXED64 &&
      r.getWireType() !== WireType.DELIMITED) {
    return false;
  }
  r.readPackableFixed64GbigintInto(getRepeatedFieldForBinary(m, fn));
  return true;
}

function /** boolean */ readFixed64GbigintIgnoringDefault(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.FIXED64) {
    return false;
  }
  const v = r.readFixed64Gbigint();
  setFieldBinary(m, fn, v === GBIGINT_ZERO ? undefined : v);
  return true;
}

function /** boolean */ readFixed64GbigintOneof(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn, /** ? */ o) {
  if (r.getWireType() !== WireType.FIXED64) {
    return false;
  }
  setOneofFieldForBinary(m, fn, o, r.readFixed64Gbigint());
  return true;
}

function /** boolean */ readFixed64String(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (getDeserializeBinary64BitIntsAsGbigint()) {
    return readFixed64Gbigint(r, m, fn);
  }
  if (r.getWireType() !== WireType.FIXED64) {
    return false;
  }
  setFieldBinary(m, fn, r.readFixed64String());
  return true;
}

function /** boolean */ readPackableFixed64StringInto(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (getDeserializeBinary64BitIntsAsGbigint()) {
    return readPackableFixed64GbigintInto(r, m, fn);
  }
  if (r.getWireType() !== WireType.FIXED64 &&
      r.getWireType() !== WireType.DELIMITED) {
    return false;
  }
  r.readPackableFixed64StringInto(getRepeatedFieldForBinary(m, fn));
  return true;
}

function /** boolean */ readFixed64StringIgnoringDefault(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (getDeserializeBinary64BitIntsAsGbigint()) {
    return readFixed64GbigintIgnoringDefault(r, m, fn);
  }
  if (r.getWireType() !== WireType.FIXED64) {
    return false;
  }
  const v = r.readFixed64String();
  setFieldBinary(m, fn, v === '0' ? undefined : v);
  return true;
}

function /** boolean */ readFixed64StringOneof(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn, /** ? */ o) {
  if (getDeserializeBinary64BitIntsAsGbigint()) {
    return readFixed64GbigintOneof(r, m, fn, o);
  }
  if (r.getWireType() !== WireType.FIXED64) {
    return false;
  }
  setOneofFieldForBinary(m, fn, o, r.readFixed64String());
  return true;
}

function /** boolean */ readFixed64(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (getDeserializeBinary64BitIntsAsGbigint()) {
    return readFixed64Gbigint(r, m, fn);
  }
  if (r.getWireType() !== WireType.FIXED64) {
    return false;
  }
  setFieldBinary(m, fn, r.readFixed64());
  return true;
}

function /** boolean */ readPackableFixed64Into(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (getDeserializeBinary64BitIntsAsGbigint()) {
    return readPackableFixed64GbigintInto(r, m, fn);
  }
  if (r.getWireType() !== WireType.FIXED64 &&
      r.getWireType() !== WireType.DELIMITED) {
    return false;
  }
  r.readPackableFixed64Into(getRepeatedFieldForBinary(m, fn));
  return true;
}

function /** boolean */ readFixed64IgnoringDefault(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (getDeserializeBinary64BitIntsAsGbigint()) {
    return readFixed64GbigintIgnoringDefault(r, m, fn);
  }
  if (r.getWireType() !== WireType.FIXED64) {
    return false;
  }
  const v = r.readFixed64();
  setFieldBinary(m, fn, v === 0 ? undefined : v);
  return true;
}

function /** boolean */ readFixed64Oneof(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn, /** ? */ o) {
  if (getDeserializeBinary64BitIntsAsGbigint()) {
    return readFixed64GbigintOneof(r, m, fn, o);
  }
  if (r.getWireType() !== WireType.FIXED64) {
    return false;
  }
  setOneofFieldForBinary(m, fn, o, r.readFixed64());
  return true;
}

function /** boolean */ readFixed32(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.FIXED32) {
    return false;
  }
  setFieldBinary(m, fn, r.readFixed32());
  return true;
}

function /** boolean */ readPackableFixed32Into(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.FIXED32 &&
      r.getWireType() !== WireType.DELIMITED) {
    return false;
  }
  r.readPackableFixed32Into(getRepeatedFieldForBinary(m, fn));
  return true;
}

function /** boolean */ readFixed32IgnoringDefault(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.FIXED32) {
    return false;
  }
  const v = r.readFixed32();
  setFieldBinary(m, fn, v === 0 ? undefined : v);
  return true;
}

function /** boolean */ readFixed32Oneof(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn, /** ? */ o) {
  if (r.getWireType() !== WireType.FIXED32) {
    return false;
  }
  setOneofFieldForBinary(m, fn, o, r.readFixed32());
  return true;
}

function /** boolean */ readBool(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.VARINT) {
    return false;
  }
  setFieldBinary(m, fn, r.readBool());
  return true;
}

function /** boolean */ readPackableBoolInto(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.VARINT &&
      r.getWireType() !== WireType.DELIMITED) {
    return false;
  }
  r.readPackableBoolInto(getRepeatedFieldForBinary(m, fn));
  return true;
}

function /** boolean */ readBoolIgnoringDefault(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.VARINT) {
    return false;
  }
  const v = r.readBool();
  setFieldBinary(m, fn, v === false ? undefined : v);
  return true;
}

function /** boolean */ readBoolOneof(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn, /** ? */ o) {
  if (r.getWireType() !== WireType.VARINT) {
    return false;
  }
  setOneofFieldForBinary(m, fn, o, r.readBool());
  return true;
}

function /** boolean */ readStringRequireUtf8(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.DELIMITED) {
    return false;
  }
  setFieldBinary(m, fn, r.readStringRequireUtf8());
  return true;
}

function /** boolean */ readRepeatedStringRequireUtf8(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.DELIMITED) {
    return false;
  }
  addToRepeatedFieldForBinary(m, fn, r.readStringRequireUtf8());
  return true;
}

function /** boolean */ readStringRequireUtf8IgnoringDefault(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.DELIMITED) {
    return false;
  }
  const v = r.readStringRequireUtf8();
  setFieldBinary(m, fn, v === '' ? undefined : v);
  return true;
}

function /** boolean */ readStringRequireUtf8Oneof(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn, /** ? */ o) {
  if (r.getWireType() !== WireType.DELIMITED) {
    return false;
  }
  setOneofFieldForBinary(m, fn, o, r.readStringRequireUtf8());
  return true;
}

function /** boolean */ readString(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.DELIMITED) {
    return false;
  }
  setFieldBinary(m, fn, r.readString());
  return true;
}

function /** boolean */ readRepeatedString(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.DELIMITED) {
    return false;
  }
  addToRepeatedFieldForBinary(m, fn, r.readString());
  return true;
}

function /** boolean */ readStringIgnoringDefault(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.DELIMITED) {
    return false;
  }
  const v = r.readString();
  setFieldBinary(m, fn, v === '' ? undefined : v);
  return true;
}

function /** boolean */ readStringOneof(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn, /** ? */ o) {
  if (r.getWireType() !== WireType.DELIMITED) {
    return false;
  }
  setOneofFieldForBinary(m, fn, o, r.readString());
  return true;
}

function /** boolean */ readGroup(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn,
    /** !MessageMeta */ mm, /** function(!Array<?>,!BinaryReader) */ mr) {
  if (r.getWireType() !== WireType.START_GROUP) {
    return false;
  }
  r.readGroup(fn, getMutableWrapperArrayForBinary(m, mm, fn), mr);
  return true;
}

function /** boolean */ readRepeatedGroup(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn,
    /** !MessageMeta */ mm, /** function(!Array<?>,!BinaryReader) */ mr) {
  if (r.getWireType() !== WireType.START_GROUP) {
    return false;
  }
  r.readGroup(fn, addAndReturnBinary(m, mm, fn), mr);
  return true;
}

function /** boolean */ readGroupOneof(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn,
    /** !MessageMeta */ mm, /** function(!Array<?>,!BinaryReader) */ mr,
    /** !Array<number> */ o) {
  if (r.getWireType() !== WireType.START_GROUP) {
    return false;
  }
  r.readGroup(fn, getMutableOneofWrapperArrayForBinary(m, mm, fn, o), mr);
  return true;
}

function /** boolean */ readMessage(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn,
    /** !MessageMeta */ mm, /** function(!Array<?>,!BinaryReader) */ mr) {
  if (r.getWireType() !== WireType.DELIMITED) {
    return false;
  }
  r.readMessage(getMutableWrapperArrayForBinary(m, mm, fn), mr);
  return true;
}

function /** boolean */ readRepeatedMessage(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn,
    /** !MessageMeta */ mm, /** function(!Array<?>,!BinaryReader) */ mr) {
  if (r.getWireType() !== WireType.DELIMITED) {
    return false;
  }
  r.readMessage(addAndReturnBinary(m, mm, fn), mr);
  return true;
}

function /** boolean */ readMessageOneof(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn,
    /** !MessageMeta */ mm, /** function(!Array<?>,!BinaryReader) */ mr,
    /** !Array<number> */ o) {
  if (r.getWireType() !== WireType.DELIMITED) {
    return false;
  }
  r.readMessage(getMutableOneofWrapperArrayForBinary(m, mm, fn, o), mr);
  return true;
}

function /** boolean */ readBytes(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.DELIMITED) {
    return false;
  }
  setFieldBinary(m, fn, r.readByteString());
  return true;
}

function /** boolean */ readRepeatedBytes(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.DELIMITED) {
    return false;
  }
  addToRepeatedFieldForBinary(m, fn, r.readByteString());
  return true;
}

function /** boolean */ readBytesIgnoringDefault(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.DELIMITED) {
    return false;
  }
  const v = r.readByteString();
  setFieldBinary(m, fn, v === ByteString.empty() ? undefined : v);
  return true;
}

function /** boolean */ readBytesOneof(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn, /** ? */ o) {
  if (r.getWireType() !== WireType.DELIMITED) {
    return false;
  }
  setOneofFieldForBinary(m, fn, o, r.readByteString());
  return true;
}

function /** boolean */ readUint32(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.VARINT) {
    return false;
  }
  setFieldBinary(m, fn, r.readUint32());
  return true;
}

function /** boolean */ readPackableUint32Into(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.VARINT &&
      r.getWireType() !== WireType.DELIMITED) {
    return false;
  }
  r.readPackableUint32Into(getRepeatedFieldForBinary(m, fn));
  return true;
}

function /** boolean */ readUint32IgnoringDefault(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.VARINT) {
    return false;
  }
  const v = r.readUint32();
  setFieldBinary(m, fn, v === 0 ? undefined : v);
  return true;
}

function /** boolean */ readUint32Oneof(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn, /** ? */ o) {
  if (r.getWireType() !== WireType.VARINT) {
    return false;
  }
  setOneofFieldForBinary(m, fn, o, r.readUint32());
  return true;
}

function /** boolean */ readEnum(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.VARINT) {
    return false;
  }
  setFieldBinary(m, fn, r.readEnum());
  return true;
}

function /** boolean */ readPackableEnumInto(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.VARINT &&
      r.getWireType() !== WireType.DELIMITED) {
    return false;
  }
  r.readPackableEnumInto(getRepeatedFieldForBinary(m, fn));
  return true;
}

function /** boolean */ readEnumIgnoringDefault(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.VARINT) {
    return false;
  }
  const v = r.readEnum();
  setFieldBinary(m, fn, v === 0 ? undefined : v);
  return true;
}

function /** boolean */ readEnumOneof(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn, /** ? */ o) {
  if (r.getWireType() !== WireType.VARINT) {
    return false;
  }
  setOneofFieldForBinary(m, fn, o, r.readEnum());
  return true;
}

function /** boolean */ readSfixed32(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.FIXED32) {
    return false;
  }
  setFieldBinary(m, fn, r.readSfixed32());
  return true;
}

function /** boolean */ readPackableSfixed32Into(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.FIXED32 &&
      r.getWireType() !== WireType.DELIMITED) {
    return false;
  }
  r.readPackableSfixed32Into(getRepeatedFieldForBinary(m, fn));
  return true;
}

function /** boolean */ readSfixed32IgnoringDefault(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.FIXED32) {
    return false;
  }
  const v = r.readSfixed32();
  setFieldBinary(m, fn, v === 0 ? undefined : v);
  return true;
}

function /** boolean */ readSfixed32Oneof(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn, /** ? */ o) {
  if (r.getWireType() !== WireType.FIXED32) {
    return false;
  }
  setOneofFieldForBinary(m, fn, o, r.readSfixed32());
  return true;
}

function /** boolean */ readSfixed64Gbigint(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.FIXED64) {
    return false;
  }
  setFieldBinary(m, fn, r.readSfixed64Gbigint());
  return true;
}

function /** boolean */ readPackableSfixed64GbigintInto(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.FIXED64 &&
      r.getWireType() !== WireType.DELIMITED) {
    return false;
  }
  r.readPackableSfixed64GbigintInto(getRepeatedFieldForBinary(m, fn));
  return true;
}

function /** boolean */ readSfixed64GbigintIgnoringDefault(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.FIXED64) {
    return false;
  }
  const v = r.readSfixed64Gbigint();
  setFieldBinary(m, fn, v === GBIGINT_ZERO ? undefined : v);
  return true;
}

function /** boolean */ readSfixed64GbigintOneof(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn, /** ? */ o) {
  if (r.getWireType() !== WireType.FIXED64) {
    return false;
  }
  setOneofFieldForBinary(m, fn, o, r.readSfixed64Gbigint());
  return true;
}

function /** boolean */ readSfixed64String(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (getDeserializeBinary64BitIntsAsGbigint()) {
    return readSfixed64Gbigint(r, m, fn);
  }
  if (r.getWireType() !== WireType.FIXED64) {
    return false;
  }
  setFieldBinary(m, fn, r.readSfixed64String());
  return true;
}

function /** boolean */ readPackableSfixed64StringInto(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (getDeserializeBinary64BitIntsAsGbigint()) {
    return readPackableSfixed64GbigintInto(r, m, fn);
  }
  if (r.getWireType() !== WireType.FIXED64 &&
      r.getWireType() !== WireType.DELIMITED) {
    return false;
  }
  r.readPackableSfixed64StringInto(getRepeatedFieldForBinary(m, fn));
  return true;
}

function /** boolean */ readSfixed64StringIgnoringDefault(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (getDeserializeBinary64BitIntsAsGbigint()) {
    return readSfixed64GbigintIgnoringDefault(r, m, fn);
  }
  if (r.getWireType() !== WireType.FIXED64) {
    return false;
  }
  const v = r.readSfixed64String();
  setFieldBinary(m, fn, v === '0' ? undefined : v);
  return true;
}

function /** boolean */ readSfixed64StringOneof(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn, /** ? */ o) {
  if (getDeserializeBinary64BitIntsAsGbigint()) {
    return readSfixed64GbigintOneof(r, m, fn, o);
  }
  if (r.getWireType() !== WireType.FIXED64) {
    return false;
  }
  setOneofFieldForBinary(m, fn, o, r.readSfixed64String());
  return true;
}

function /** boolean */ readSfixed64(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (getDeserializeBinary64BitIntsAsGbigint()) {
    return readSfixed64Gbigint(r, m, fn);
  }
  if (r.getWireType() !== WireType.FIXED64) {
    return false;
  }
  setFieldBinary(m, fn, r.readSfixed64());
  return true;
}

function /** boolean */ readPackableSfixed64Into(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (getDeserializeBinary64BitIntsAsGbigint()) {
    return readPackableSfixed64GbigintInto(r, m, fn);
  }
  if (r.getWireType() !== WireType.FIXED64 &&
      r.getWireType() !== WireType.DELIMITED) {
    return false;
  }
  r.readPackableSfixed64Into(getRepeatedFieldForBinary(m, fn));
  return true;
}

function /** boolean */ readSfixed64IgnoringDefault(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (getDeserializeBinary64BitIntsAsGbigint()) {
    return readSfixed64GbigintIgnoringDefault(r, m, fn);
  }
  if (r.getWireType() !== WireType.FIXED64) {
    return false;
  }
  const v = r.readSfixed64();
  setFieldBinary(m, fn, v === 0 ? undefined : v);
  return true;
}

function /** boolean */ readSfixed64Oneof(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn, /** ? */ o) {
  if (getDeserializeBinary64BitIntsAsGbigint()) {
    return readSfixed64GbigintOneof(r, m, fn, o);
  }
  if (r.getWireType() !== WireType.FIXED64) {
    return false;
  }
  setOneofFieldForBinary(m, fn, o, r.readSfixed64());
  return true;
}

function /** boolean */ readSint32(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.VARINT) {
    return false;
  }
  setFieldBinary(m, fn, r.readSint32());
  return true;
}

function /** boolean */ readPackableSint32Into(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.VARINT &&
      r.getWireType() !== WireType.DELIMITED) {
    return false;
  }
  r.readPackableSint32Into(getRepeatedFieldForBinary(m, fn));
  return true;
}

function /** boolean */ readSint32IgnoringDefault(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.VARINT) {
    return false;
  }
  const v = r.readSint32();
  setFieldBinary(m, fn, v === 0 ? undefined : v);
  return true;
}

function /** boolean */ readSint32Oneof(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn, /** ? */ o) {
  if (r.getWireType() !== WireType.VARINT) {
    return false;
  }
  setOneofFieldForBinary(m, fn, o, r.readSint32());
  return true;
}

function /** boolean */ readSint64Gbigint(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.VARINT) {
    return false;
  }
  setFieldBinary(m, fn, r.readSint64Gbigint());
  return true;
}

function /** boolean */ readPackableSint64GbigintInto(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.VARINT &&
      r.getWireType() !== WireType.DELIMITED) {
    return false;
  }
  r.readPackableSint64GbigintInto(getRepeatedFieldForBinary(m, fn));
  return true;
}

function /** boolean */ readSint64GbigintIgnoringDefault(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (r.getWireType() !== WireType.VARINT) {
    return false;
  }
  const v = r.readSint64Gbigint();
  setFieldBinary(m, fn, v === GBIGINT_ZERO ? undefined : v);
  return true;
}

function /** boolean */ readSint64GbigintOneof(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn, /** ? */ o) {
  if (r.getWireType() !== WireType.VARINT) {
    return false;
  }
  setOneofFieldForBinary(m, fn, o, r.readSint64Gbigint());
  return true;
}

function /** boolean */ readSint64String(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (getDeserializeBinary64BitIntsAsGbigint()) {
    return readSint64Gbigint(r, m, fn);
  }
  if (r.getWireType() !== WireType.VARINT) {
    return false;
  }
  setFieldBinary(m, fn, r.readSint64String());
  return true;
}

function /** boolean */ readPackableSint64StringInto(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (getDeserializeBinary64BitIntsAsGbigint()) {
    return readPackableSint64GbigintInto(r, m, fn);
  }
  if (r.getWireType() !== WireType.VARINT &&
      r.getWireType() !== WireType.DELIMITED) {
    return false;
  }
  r.readPackableSint64StringInto(getRepeatedFieldForBinary(m, fn));
  return true;
}

function /** boolean */ readSint64StringIgnoringDefault(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (getDeserializeBinary64BitIntsAsGbigint()) {
    return readSint64GbigintIgnoringDefault(r, m, fn);
  }
  if (r.getWireType() !== WireType.VARINT) {
    return false;
  }
  const v = r.readSint64String();
  setFieldBinary(m, fn, v === '0' ? undefined : v);
  return true;
}

function /** boolean */ readSint64StringOneof(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn, /** ? */ o) {
  if (getDeserializeBinary64BitIntsAsGbigint()) {
    return readSint64GbigintOneof(r, m, fn, o);
  }
  if (r.getWireType() !== WireType.VARINT) {
    return false;
  }
  setOneofFieldForBinary(m, fn, o, r.readSint64String());
  return true;
}

function /** boolean */ readSint64(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (getDeserializeBinary64BitIntsAsGbigint()) {
    return readSint64Gbigint(r, m, fn);
  }
  if (r.getWireType() !== WireType.VARINT) {
    return false;
  }
  setFieldBinary(m, fn, r.readSint64());
  return true;
}

function /** boolean */ readPackableSint64Into(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (getDeserializeBinary64BitIntsAsGbigint()) {
    return readPackableSint64GbigintInto(r, m, fn);
  }
  if (r.getWireType() !== WireType.VARINT &&
      r.getWireType() !== WireType.DELIMITED) {
    return false;
  }
  r.readPackableSint64Into(getRepeatedFieldForBinary(m, fn));
  return true;
}

function /** boolean */ readSint64IgnoringDefault(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn) {
  if (getDeserializeBinary64BitIntsAsGbigint()) {
    return readSint64GbigintIgnoringDefault(r, m, fn);
  }
  if (r.getWireType() !== WireType.VARINT) {
    return false;
  }
  const v = r.readSint64();
  setFieldBinary(m, fn, v === 0 ? undefined : v);
  return true;
}

function /** boolean */ readSint64Oneof(
    /** !BinaryReader */ r, /** !Array<?> */ m, /** number */ fn, /** ? */ o) {
  if (getDeserializeBinary64BitIntsAsGbigint()) {
    return readSint64GbigintOneof(r, m, fn, o);
  }
  if (r.getWireType() !== WireType.VARINT) {
    return false;
  }
  setOneofFieldForBinary(m, fn, o, r.readSint64());
  return true;
}

/** @const {?} */
exports.RWDouble = /** @pureOrBreakMyCode */ (
    makeRWPair(readDouble, writeDouble, typeTokens.DOUBLE));

/** @const {?} */
exports.RPackableDoubleIntoWRepeatedDouble =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableDoubleInto, writeRepeatedDouble, typeTokens.DOUBLE));

/** @const {?} */
exports.RPackableDoubleIntoWPackedDouble =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableDoubleInto, writePackedDouble, typeTokens.DOUBLE));

/** @const {?} */
exports.RDoubleIgnoringDefaultWDouble = /** @pureOrBreakMyCode */ (
    makeRWPair(readDoubleIgnoringDefault, writeDouble, typeTokens.DOUBLE));

/** @const {?} */
exports.RDoubleOneofWDouble = /** @pureOrBreakMyCode */ (
    makeRWPair(readDoubleOneof, writeDouble, typeTokens.DOUBLE));

/** @const {?} */
exports.RWFloat = /** @pureOrBreakMyCode */ (
    makeRWPair(readFloat, writeFloat, typeTokens.FLOAT));

/** @const {?} */
exports.RPackableFloatIntoWRepeatedFloat =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableFloatInto, writeRepeatedFloat, typeTokens.FLOAT));

/** @const {?} */
exports.RPackableFloatIntoWPackedFloat =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableFloatInto, writePackedFloat, typeTokens.FLOAT));

/** @const {?} */
exports.RFloatIgnoringDefaultWFloat = /** @pureOrBreakMyCode */ (
    makeRWPair(readFloatIgnoringDefault, writeFloat, typeTokens.FLOAT));

/** @const {?} */
exports.RFloatOneofWFloat = /** @pureOrBreakMyCode */ (
    makeRWPair(readFloatOneof, writeFloat, typeTokens.FLOAT));

/** @const {?} */
exports.RInt64GbigintWInt64 = /** @pureOrBreakMyCode */ (
    makeRWPair(readInt64Gbigint, writeInt64, typeTokens.INT64));

/** @const {?} */
exports.RPackableInt64GbigintIntoWRepeatedInt64 =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableInt64GbigintInto, writeRepeatedInt64, typeTokens.INT64));

/** @const {?} */
exports.RPackableInt64GbigintIntoWPackedInt64 =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableInt64GbigintInto, writePackedInt64, typeTokens.INT64));

/** @const {?} */
exports.RInt64GbigintIgnoringDefaultWInt64 = /** @pureOrBreakMyCode */ (
    makeRWPair(readInt64GbigintIgnoringDefault, writeInt64, typeTokens.INT64));

/** @const {?} */
exports.RInt64GbigintOneofWInt64 = /** @pureOrBreakMyCode */ (
    makeRWPair(readInt64GbigintOneof, writeInt64, typeTokens.INT64));

/** @const {?} */
exports.RInt64StringWInt64 = /** @pureOrBreakMyCode */ (
    makeRWPair(readInt64String, writeInt64, typeTokens.INT64));

/** @const {?} */
exports.RPackableInt64StringIntoWRepeatedInt64 =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableInt64StringInto, writeRepeatedInt64, typeTokens.INT64));

/** @const {?} */
exports.RPackableInt64StringIntoWPackedInt64 =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableInt64StringInto, writePackedInt64, typeTokens.INT64));

/** @const {?} */
exports.RInt64StringIgnoringDefaultWInt64 = /** @pureOrBreakMyCode */ (
    makeRWPair(readInt64StringIgnoringDefault, writeInt64, typeTokens.INT64));

/** @const {?} */
exports.RInt64StringOneofWInt64 = /** @pureOrBreakMyCode */ (
    makeRWPair(readInt64StringOneof, writeInt64, typeTokens.INT64));

/** @const {?} */
exports.RWInt64 = /** @pureOrBreakMyCode */ (
    makeRWPair(readInt64, writeInt64, typeTokens.INT64));

/** @const {?} */
exports.RPackableInt64IntoWRepeatedInt64 =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableInt64Into, writeRepeatedInt64, typeTokens.INT64));

/** @const {?} */
exports.RPackableInt64IntoWPackedInt64 =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableInt64Into, writePackedInt64, typeTokens.INT64));

/** @const {?} */
exports.RInt64IgnoringDefaultWInt64 = /** @pureOrBreakMyCode */ (
    makeRWPair(readInt64IgnoringDefault, writeInt64, typeTokens.INT64));

/** @const {?} */
exports.RInt64OneofWInt64 = /** @pureOrBreakMyCode */ (
    makeRWPair(readInt64Oneof, writeInt64, typeTokens.INT64));

/** @const {?} */
exports.RUint64GbigintWUint64ToleratingNegatives =
    /** @pureOrBreakMyCode */ (makeRWPair(
        readUint64Gbigint, writeUint64ToleratingNegatives, typeTokens.UINT64));

/** @const {?} */
exports.RUint64GbigintWUint64 = /** @pureOrBreakMyCode */ (
    makeRWPair(readUint64Gbigint, writeUint64, typeTokens.UINT64));

/** @const {?} */
exports.RPackableUint64GbigintIntoWRepeatedUint64ToleratingNegatives =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableUint64GbigintInto, writeRepeatedUint64ToleratingNegatives,
        typeTokens.UINT64));

/** @const {?} */
exports.RPackableUint64GbigintIntoWPackedUint64ToleratingNegatives =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableUint64GbigintInto, writePackedUint64ToleratingNegatives,
        typeTokens.UINT64));

/** @const {?} */
exports.RPackableUint64GbigintIntoWRepeatedUint64 =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableUint64GbigintInto, writeRepeatedUint64, typeTokens.UINT64));

/** @const {?} */
exports.RPackableUint64GbigintIntoWPackedUint64 =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableUint64GbigintInto, writePackedUint64, typeTokens.UINT64));

/** @const {?} */
exports.RUint64GbigintIgnoringDefaultWUint64ToleratingNegatives =
    /** @pureOrBreakMyCode */ (makeRWPair(
        readUint64GbigintIgnoringDefault, writeUint64ToleratingNegatives,
        typeTokens.UINT64));

/** @const {?} */
exports.RUint64GbigintIgnoringDefaultWUint64 =
    /** @pureOrBreakMyCode */ (makeRWPair(
        readUint64GbigintIgnoringDefault, writeUint64, typeTokens.UINT64));

/** @const {?} */
exports.RUint64GbigintOneofWUint64ToleratingNegatives =
    /** @pureOrBreakMyCode */ (makeRWPair(
        readUint64GbigintOneof, writeUint64ToleratingNegatives,
        typeTokens.UINT64));

/** @const {?} */
exports.RUint64GbigintOneofWUint64 = /** @pureOrBreakMyCode */ (
    makeRWPair(readUint64GbigintOneof, writeUint64, typeTokens.UINT64));

/** @const {?} */
exports.RUint64StringWUint64ToleratingNegatives =
    /** @pureOrBreakMyCode */ (makeRWPair(
        readUint64String, writeUint64ToleratingNegatives, typeTokens.UINT64));

/** @const {?} */
exports.RUint64StringWUint64 = /** @pureOrBreakMyCode */ (
    makeRWPair(readUint64String, writeUint64, typeTokens.UINT64));

/** @const {?} */
exports.RPackableUint64StringIntoWRepeatedUint64ToleratingNegatives =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableUint64StringInto, writeRepeatedUint64ToleratingNegatives,
        typeTokens.UINT64));

/** @const {?} */
exports.RPackableUint64StringIntoWPackedUint64ToleratingNegatives =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableUint64StringInto, writePackedUint64ToleratingNegatives,
        typeTokens.UINT64));

/** @const {?} */
exports.RPackableUint64StringIntoWRepeatedUint64 =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableUint64StringInto, writeRepeatedUint64, typeTokens.UINT64));

/** @const {?} */
exports.RPackableUint64StringIntoWPackedUint64 =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableUint64StringInto, writePackedUint64, typeTokens.UINT64));

/** @const {?} */
exports.RUint64StringIgnoringDefaultWUint64ToleratingNegatives =
    /** @pureOrBreakMyCode */ (makeRWPair(
        readUint64StringIgnoringDefault, writeUint64ToleratingNegatives,
        typeTokens.UINT64));

/** @const {?} */
exports.RUint64StringIgnoringDefaultWUint64 =
    /** @pureOrBreakMyCode */ (makeRWPair(
        readUint64StringIgnoringDefault, writeUint64, typeTokens.UINT64));

/** @const {?} */
exports.RUint64StringOneofWUint64ToleratingNegatives =
    /** @pureOrBreakMyCode */ (makeRWPair(
        readUint64StringOneof, writeUint64ToleratingNegatives,
        typeTokens.UINT64));

/** @const {?} */
exports.RUint64StringOneofWUint64 = /** @pureOrBreakMyCode */ (
    makeRWPair(readUint64StringOneof, writeUint64, typeTokens.UINT64));

/** @const {?} */
exports.RUint64WUint64ToleratingNegatives = /** @pureOrBreakMyCode */ (
    makeRWPair(readUint64, writeUint64ToleratingNegatives, typeTokens.UINT64));

/** @const {?} */
exports.RWUint64 = /** @pureOrBreakMyCode */ (
    makeRWPair(readUint64, writeUint64, typeTokens.UINT64));

/** @const {?} */
exports.RPackableUint64IntoWRepeatedUint64ToleratingNegatives =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableUint64Into, writeRepeatedUint64ToleratingNegatives,
        typeTokens.UINT64));

/** @const {?} */
exports.RPackableUint64IntoWPackedUint64ToleratingNegatives =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableUint64Into, writePackedUint64ToleratingNegatives,
        typeTokens.UINT64));

/** @const {?} */
exports.RPackableUint64IntoWRepeatedUint64 =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableUint64Into, writeRepeatedUint64, typeTokens.UINT64));

/** @const {?} */
exports.RPackableUint64IntoWPackedUint64 =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableUint64Into, writePackedUint64, typeTokens.UINT64));

/** @const {?} */
exports.RUint64IgnoringDefaultWUint64ToleratingNegatives =
    /** @pureOrBreakMyCode */ (makeRWPair(
        readUint64IgnoringDefault, writeUint64ToleratingNegatives,
        typeTokens.UINT64));

/** @const {?} */
exports.RUint64IgnoringDefaultWUint64 = /** @pureOrBreakMyCode */ (
    makeRWPair(readUint64IgnoringDefault, writeUint64, typeTokens.UINT64));

/** @const {?} */
exports.RUint64OneofWUint64ToleratingNegatives =
    /** @pureOrBreakMyCode */ (makeRWPair(
        readUint64Oneof, writeUint64ToleratingNegatives, typeTokens.UINT64));

/** @const {?} */
exports.RUint64OneofWUint64 = /** @pureOrBreakMyCode */ (
    makeRWPair(readUint64Oneof, writeUint64, typeTokens.UINT64));

/** @const {?} */
exports.RWInt32 = /** @pureOrBreakMyCode */ (
    makeRWPair(readInt32, writeInt32, typeTokens.INT32));

/** @const {?} */
exports.RPackableInt32IntoWRepeatedInt32 =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableInt32Into, writeRepeatedInt32, typeTokens.INT32));

/** @const {?} */
exports.RPackableInt32IntoWPackedInt32 =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableInt32Into, writePackedInt32, typeTokens.INT32));

/** @const {?} */
exports.RInt32IgnoringDefaultWInt32 = /** @pureOrBreakMyCode */ (
    makeRWPair(readInt32IgnoringDefault, writeInt32, typeTokens.INT32));

/** @const {?} */
exports.RInt32OneofWInt32 = /** @pureOrBreakMyCode */ (
    makeRWPair(readInt32Oneof, writeInt32, typeTokens.INT32));

/** @const {?} */
exports.RFixed64GbigintWFixed64ToleratingNegatives =
    /** @pureOrBreakMyCode */ (makeRWPair(
        readFixed64Gbigint, writeFixed64ToleratingNegatives,
        typeTokens.FIXED64));

/** @const {?} */
exports.RFixed64GbigintWFixed64 = /** @pureOrBreakMyCode */ (
    makeRWPair(readFixed64Gbigint, writeFixed64, typeTokens.FIXED64));

/** @const {?} */
exports.RPackableFixed64GbigintIntoWRepeatedFixed64ToleratingNegatives =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableFixed64GbigintInto, writeRepeatedFixed64ToleratingNegatives,
        typeTokens.FIXED64));

/** @const {?} */
exports.RPackableFixed64GbigintIntoWPackedFixed64ToleratingNegatives =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableFixed64GbigintInto, writePackedFixed64ToleratingNegatives,
        typeTokens.FIXED64));

/** @const {?} */
exports.RPackableFixed64GbigintIntoWRepeatedFixed64 =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableFixed64GbigintInto, writeRepeatedFixed64,
        typeTokens.FIXED64));

/** @const {?} */
exports.RPackableFixed64GbigintIntoWPackedFixed64 =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableFixed64GbigintInto, writePackedFixed64,
        typeTokens.FIXED64));

/** @const {?} */
exports.RFixed64GbigintIgnoringDefaultWFixed64ToleratingNegatives =
    /** @pureOrBreakMyCode */ (makeRWPair(
        readFixed64GbigintIgnoringDefault, writeFixed64ToleratingNegatives,
        typeTokens.FIXED64));

/** @const {?} */
exports.RFixed64GbigintIgnoringDefaultWFixed64 =
    /** @pureOrBreakMyCode */ (makeRWPair(
        readFixed64GbigintIgnoringDefault, writeFixed64, typeTokens.FIXED64));

/** @const {?} */
exports.RFixed64GbigintOneofWFixed64ToleratingNegatives =
    /** @pureOrBreakMyCode */ (makeRWPair(
        readFixed64GbigintOneof, writeFixed64ToleratingNegatives,
        typeTokens.FIXED64));

/** @const {?} */
exports.RFixed64GbigintOneofWFixed64 = /** @pureOrBreakMyCode */ (
    makeRWPair(readFixed64GbigintOneof, writeFixed64, typeTokens.FIXED64));

/** @const {?} */
exports.RFixed64StringWFixed64ToleratingNegatives =
    /** @pureOrBreakMyCode */ (makeRWPair(
        readFixed64String, writeFixed64ToleratingNegatives,
        typeTokens.FIXED64));

/** @const {?} */
exports.RFixed64StringWFixed64 = /** @pureOrBreakMyCode */ (
    makeRWPair(readFixed64String, writeFixed64, typeTokens.FIXED64));

/** @const {?} */
exports.RPackableFixed64StringIntoWRepeatedFixed64ToleratingNegatives =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableFixed64StringInto, writeRepeatedFixed64ToleratingNegatives,
        typeTokens.FIXED64));

/** @const {?} */
exports.RPackableFixed64StringIntoWPackedFixed64ToleratingNegatives =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableFixed64StringInto, writePackedFixed64ToleratingNegatives,
        typeTokens.FIXED64));

/** @const {?} */
exports.RPackableFixed64StringIntoWRepeatedFixed64 =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableFixed64StringInto, writeRepeatedFixed64,
        typeTokens.FIXED64));

/** @const {?} */
exports.RPackableFixed64StringIntoWPackedFixed64 =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableFixed64StringInto, writePackedFixed64, typeTokens.FIXED64));

/** @const {?} */
exports.RFixed64StringIgnoringDefaultWFixed64ToleratingNegatives =
    /** @pureOrBreakMyCode */ (makeRWPair(
        readFixed64StringIgnoringDefault, writeFixed64ToleratingNegatives,
        typeTokens.FIXED64));

/** @const {?} */
exports.RFixed64StringIgnoringDefaultWFixed64 =
    /** @pureOrBreakMyCode */ (makeRWPair(
        readFixed64StringIgnoringDefault, writeFixed64, typeTokens.FIXED64));

/** @const {?} */
exports.RFixed64StringOneofWFixed64ToleratingNegatives =
    /** @pureOrBreakMyCode */ (makeRWPair(
        readFixed64StringOneof, writeFixed64ToleratingNegatives,
        typeTokens.FIXED64));

/** @const {?} */
exports.RFixed64StringOneofWFixed64 = /** @pureOrBreakMyCode */ (
    makeRWPair(readFixed64StringOneof, writeFixed64, typeTokens.FIXED64));

/** @const {?} */
exports.RFixed64WFixed64ToleratingNegatives =
    /** @pureOrBreakMyCode */ (makeRWPair(
        readFixed64, writeFixed64ToleratingNegatives, typeTokens.FIXED64));

/** @const {?} */
exports.RWFixed64 = /** @pureOrBreakMyCode */ (
    makeRWPair(readFixed64, writeFixed64, typeTokens.FIXED64));

/** @const {?} */
exports.RPackableFixed64IntoWRepeatedFixed64ToleratingNegatives =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableFixed64Into, writeRepeatedFixed64ToleratingNegatives,
        typeTokens.FIXED64));

/** @const {?} */
exports.RPackableFixed64IntoWPackedFixed64ToleratingNegatives =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableFixed64Into, writePackedFixed64ToleratingNegatives,
        typeTokens.FIXED64));

/** @const {?} */
exports.RPackableFixed64IntoWRepeatedFixed64 =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableFixed64Into, writeRepeatedFixed64, typeTokens.FIXED64));

/** @const {?} */
exports.RPackableFixed64IntoWPackedFixed64 =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableFixed64Into, writePackedFixed64, typeTokens.FIXED64));

/** @const {?} */
exports.RFixed64IgnoringDefaultWFixed64ToleratingNegatives =
    /** @pureOrBreakMyCode */ (makeRWPair(
        readFixed64IgnoringDefault, writeFixed64ToleratingNegatives,
        typeTokens.FIXED64));

/** @const {?} */
exports.RFixed64IgnoringDefaultWFixed64 = /** @pureOrBreakMyCode */ (
    makeRWPair(readFixed64IgnoringDefault, writeFixed64, typeTokens.FIXED64));

/** @const {?} */
exports.RFixed64OneofWFixed64ToleratingNegatives =
    /** @pureOrBreakMyCode */ (makeRWPair(
        readFixed64Oneof, writeFixed64ToleratingNegatives, typeTokens.FIXED64));

/** @const {?} */
exports.RFixed64OneofWFixed64 = /** @pureOrBreakMyCode */ (
    makeRWPair(readFixed64Oneof, writeFixed64, typeTokens.FIXED64));

/** @const {?} */
exports.RWFixed32 = /** @pureOrBreakMyCode */ (
    makeRWPair(readFixed32, writeFixed32, typeTokens.FIXED32));

/** @const {?} */
exports.RPackableFixed32IntoWRepeatedFixed32 =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableFixed32Into, writeRepeatedFixed32, typeTokens.FIXED32));

/** @const {?} */
exports.RPackableFixed32IntoWPackedFixed32 =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableFixed32Into, writePackedFixed32, typeTokens.FIXED32));

/** @const {?} */
exports.RFixed32IgnoringDefaultWFixed32 = /** @pureOrBreakMyCode */ (
    makeRWPair(readFixed32IgnoringDefault, writeFixed32, typeTokens.FIXED32));

/** @const {?} */
exports.RFixed32OneofWFixed32 = /** @pureOrBreakMyCode */ (
    makeRWPair(readFixed32Oneof, writeFixed32, typeTokens.FIXED32));

/** @const {?} */
exports.RWBool = /** @pureOrBreakMyCode */ (
    makeRWPair(readBool, writeBool, typeTokens.BOOLEAN));

/** @const {?} */
exports.RPackableBoolIntoWRepeatedBool =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableBoolInto, writeRepeatedBool, typeTokens.BOOLEAN));

/** @const {?} */
exports.RPackableBoolIntoWPackedBool =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableBoolInto, writePackedBool, typeTokens.BOOLEAN));

/** @const {?} */
exports.RBoolIgnoringDefaultWBool = /** @pureOrBreakMyCode */ (
    makeRWPair(readBoolIgnoringDefault, writeBool, typeTokens.BOOLEAN));

/** @const {?} */
exports.RBoolOneofWBool = /** @pureOrBreakMyCode */ (
    makeRWPair(readBoolOneof, writeBool, typeTokens.BOOLEAN));

/** @const {?} */
exports.RStringRequireUtf8WString = /** @pureOrBreakMyCode */ (
    makeRWPair(readStringRequireUtf8, writeString, typeTokens.STRING));

/** @const {?} */
exports.RRepeatedStringRequireUtf8WRepeatedString =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readRepeatedStringRequireUtf8, writeRepeatedString, typeTokens.STRING));

/** @const {?} */
exports.RStringRequireUtf8IgnoringDefaultWString =
    /** @pureOrBreakMyCode */ (makeRWPair(
        readStringRequireUtf8IgnoringDefault, writeString, typeTokens.STRING));

/** @const {?} */
exports.RStringRequireUtf8OneofWString = /** @pureOrBreakMyCode */ (
    makeRWPair(readStringRequireUtf8Oneof, writeString, typeTokens.STRING));

/** @const {?} */
exports.RWString = /** @pureOrBreakMyCode */ (
    UTF8_PARSING_ERRORS_ARE_FATAL ?
        exports.RStringRequireUtf8WString :
        makeRWPair(readString, writeString, typeTokens.STRING));

/** @const {?} */
exports.RWRepeatedString = /** @pureOrBreakMyCode */ (
    UTF8_PARSING_ERRORS_ARE_FATAL ?
        exports.RRepeatedStringRequireUtf8WRepeatedString :
        makeRepeatedRWPair(
            readRepeatedString, writeRepeatedString, typeTokens.STRING));

/** @const {?} */
exports.RStringIgnoringDefaultWString = /** @pureOrBreakMyCode */ (
    UTF8_PARSING_ERRORS_ARE_FATAL ?
        exports.RStringRequireUtf8IgnoringDefaultWString :
        makeRWPair(readStringIgnoringDefault, writeString, typeTokens.STRING));

/** @const {?} */
exports.RStringOneofWString = /** @pureOrBreakMyCode */ (
    UTF8_PARSING_ERRORS_ARE_FATAL ?
        exports.RStringRequireUtf8OneofWString :
        makeRWPair(readStringOneof, writeString, typeTokens.STRING));

/** @const {?} */
exports.RWGroup = /** @pureOrBreakMyCode */ (
    makeMsgRWPair(readGroup, writeGroup, typeTokens.GROUP));

/** @const {?} */
exports.RWRepeatedGroup = /** @pureOrBreakMyCode */ (makeRepeatedMsgRWPair(
    readRepeatedGroup, writeRepeatedGroup, typeTokens.GROUP));

/** @const {?} */
exports.RGroupOneofWGroup = /** @pureOrBreakMyCode */ (
    makeMsgRWPair(readGroupOneof, writeGroup, typeTokens.GROUP));

/** @const {?} */
exports.RWMessage =
    /** @pureOrBreakMyCode */ (makeMsgRWPair(readMessage, writeMessage));

/** @const {?} */
exports.RWRepeatedMessage = /** @pureOrBreakMyCode */ (
    makeRepeatedMsgRWPair(readRepeatedMessage, writeRepeatedMessage));

/** @const {?} */
exports.RMessageOneofWMessage =
    /** @pureOrBreakMyCode */ (makeMsgRWPair(readMessageOneof, writeMessage));

/** @const {?} */
exports.RWBytes = /** @pureOrBreakMyCode */ (
    makeRWPair(readBytes, writeBytes, typeTokens.BYTES));

/** @const {?} */
exports.RWRepeatedBytes = /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
    readRepeatedBytes, writeRepeatedBytes, typeTokens.BYTES));

/** @const {?} */
exports.RBytesIgnoringDefaultWBytes = /** @pureOrBreakMyCode */ (
    makeRWPair(readBytesIgnoringDefault, writeBytes, typeTokens.BYTES));

/** @const {?} */
exports.RBytesOneofWBytes = /** @pureOrBreakMyCode */ (
    makeRWPair(readBytesOneof, writeBytes, typeTokens.BYTES));

/** @const {?} */
exports.RWUint32 = /** @pureOrBreakMyCode */ (
    makeRWPair(readUint32, writeUint32, typeTokens.UINT32));

/** @const {?} */
exports.RPackableUint32IntoWRepeatedUint32 =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableUint32Into, writeRepeatedUint32, typeTokens.UINT32));

/** @const {?} */
exports.RPackableUint32IntoWPackedUint32 =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableUint32Into, writePackedUint32, typeTokens.UINT32));

/** @const {?} */
exports.RUint32IgnoringDefaultWUint32 = /** @pureOrBreakMyCode */ (
    makeRWPair(readUint32IgnoringDefault, writeUint32, typeTokens.UINT32));

/** @const {?} */
exports.RUint32OneofWUint32 = /** @pureOrBreakMyCode */ (
    makeRWPair(readUint32Oneof, writeUint32, typeTokens.UINT32));

/** @const {?} */
exports.RWEnum = /** @pureOrBreakMyCode */ (
    makeRWPair(readEnum, writeEnum, typeTokens.ENUM));

/** @const {?} */
exports.RPackableEnumIntoWRepeatedEnum =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableEnumInto, writeRepeatedEnum, typeTokens.ENUM));

/** @const {?} */
exports.RPackableEnumIntoWPackedEnum = /** @pureOrBreakMyCode */ (
    makeRepeatedRWPair(readPackableEnumInto, writePackedEnum, typeTokens.ENUM));

/** @const {?} */
exports.REnumIgnoringDefaultWEnum = /** @pureOrBreakMyCode */ (
    makeRWPair(readEnumIgnoringDefault, writeEnum, typeTokens.ENUM));

/** @const {?} */
exports.REnumOneofWEnum = /** @pureOrBreakMyCode */ (
    makeRWPair(readEnumOneof, writeEnum, typeTokens.ENUM));

/** @const {?} */
exports.RWSfixed32 = /** @pureOrBreakMyCode */ (
    makeRWPair(readSfixed32, writeSfixed32, typeTokens.SFIXED32));

/** @const {?} */
exports.RPackableSfixed32IntoWRepeatedSfixed32 =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableSfixed32Into, writeRepeatedSfixed32, typeTokens.SFIXED32));

/** @const {?} */
exports.RPackableSfixed32IntoWPackedSfixed32 =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableSfixed32Into, writePackedSfixed32, typeTokens.SFIXED32));

/** @const {?} */
exports.RSfixed32IgnoringDefaultWSfixed32 =
    /** @pureOrBreakMyCode */ (makeRWPair(
        readSfixed32IgnoringDefault, writeSfixed32, typeTokens.SFIXED32));

/** @const {?} */
exports.RSfixed32OneofWSfixed32 = /** @pureOrBreakMyCode */ (
    makeRWPair(readSfixed32Oneof, writeSfixed32, typeTokens.SFIXED32));

/** @const {?} */
exports.RSfixed64GbigintWSfixed64 = /** @pureOrBreakMyCode */ (
    makeRWPair(readSfixed64Gbigint, writeSfixed64, typeTokens.SFIXED64));

/** @const {?} */
exports.RPackableSfixed64GbigintIntoWRepeatedSfixed64 =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableSfixed64GbigintInto, writeRepeatedSfixed64,
        typeTokens.SFIXED64));

/** @const {?} */
exports.RPackableSfixed64GbigintIntoWPackedSfixed64 =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableSfixed64GbigintInto, writePackedSfixed64,
        typeTokens.SFIXED64));

/** @const {?} */
exports.RSfixed64GbigintIgnoringDefaultWSfixed64 =
    /** @pureOrBreakMyCode */ (makeRWPair(
        readSfixed64GbigintIgnoringDefault, writeSfixed64,
        typeTokens.SFIXED64));

/** @const {?} */
exports.RSfixed64GbigintOneofWSfixed64 = /** @pureOrBreakMyCode */ (
    makeRWPair(readSfixed64GbigintOneof, writeSfixed64, typeTokens.SFIXED64));

/** @const {?} */
exports.RSfixed64StringWSfixed64 = /** @pureOrBreakMyCode */ (
    makeRWPair(readSfixed64String, writeSfixed64, typeTokens.SFIXED64));

/** @const {?} */
exports.RPackableSfixed64StringIntoWRepeatedSfixed64 =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableSfixed64StringInto, writeRepeatedSfixed64,
        typeTokens.SFIXED64));

/** @const {?} */
exports.RPackableSfixed64StringIntoWPackedSfixed64 =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableSfixed64StringInto, writePackedSfixed64,
        typeTokens.SFIXED64));

/** @const {?} */
exports.RSfixed64StringIgnoringDefaultWSfixed64 =
    /** @pureOrBreakMyCode */ (makeRWPair(
        readSfixed64StringIgnoringDefault, writeSfixed64, typeTokens.SFIXED64));

/** @const {?} */
exports.RSfixed64StringOneofWSfixed64 = /** @pureOrBreakMyCode */ (
    makeRWPair(readSfixed64StringOneof, writeSfixed64, typeTokens.SFIXED64));

/** @const {?} */
exports.RWSfixed64 = /** @pureOrBreakMyCode */ (
    makeRWPair(readSfixed64, writeSfixed64, typeTokens.SFIXED64));

/** @const {?} */
exports.RPackableSfixed64IntoWRepeatedSfixed64 =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableSfixed64Into, writeRepeatedSfixed64, typeTokens.SFIXED64));

/** @const {?} */
exports.RPackableSfixed64IntoWPackedSfixed64 =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableSfixed64Into, writePackedSfixed64, typeTokens.SFIXED64));

/** @const {?} */
exports.RSfixed64IgnoringDefaultWSfixed64 =
    /** @pureOrBreakMyCode */ (makeRWPair(
        readSfixed64IgnoringDefault, writeSfixed64, typeTokens.SFIXED64));

/** @const {?} */
exports.RSfixed64OneofWSfixed64 = /** @pureOrBreakMyCode */ (
    makeRWPair(readSfixed64Oneof, writeSfixed64, typeTokens.SFIXED64));

/** @const {?} */
exports.RWSint32 = /** @pureOrBreakMyCode */ (
    makeRWPair(readSint32, writeSint32, typeTokens.SINT32));

/** @const {?} */
exports.RPackableSint32IntoWRepeatedSint32 =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableSint32Into, writeRepeatedSint32, typeTokens.SINT32));

/** @const {?} */
exports.RPackableSint32IntoWPackedSint32 =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableSint32Into, writePackedSint32, typeTokens.SINT32));

/** @const {?} */
exports.RSint32IgnoringDefaultWSint32 = /** @pureOrBreakMyCode */ (
    makeRWPair(readSint32IgnoringDefault, writeSint32, typeTokens.SINT32));

/** @const {?} */
exports.RSint32OneofWSint32 = /** @pureOrBreakMyCode */ (
    makeRWPair(readSint32Oneof, writeSint32, typeTokens.SINT32));

/** @const {?} */
exports.RSint64GbigintWSint64 = /** @pureOrBreakMyCode */ (
    makeRWPair(readSint64Gbigint, writeSint64, typeTokens.SINT64));

/** @const {?} */
exports.RPackableSint64GbigintIntoWRepeatedSint64 =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableSint64GbigintInto, writeRepeatedSint64, typeTokens.SINT64));

/** @const {?} */
exports.RPackableSint64GbigintIntoWPackedSint64 =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableSint64GbigintInto, writePackedSint64, typeTokens.SINT64));

/** @const {?} */
exports.RSint64GbigintIgnoringDefaultWSint64 =
    /** @pureOrBreakMyCode */ (makeRWPair(
        readSint64GbigintIgnoringDefault, writeSint64, typeTokens.SINT64));

/** @const {?} */
exports.RSint64GbigintOneofWSint64 = /** @pureOrBreakMyCode */ (
    makeRWPair(readSint64GbigintOneof, writeSint64, typeTokens.SINT64));

/** @const {?} */
exports.RSint64StringWSint64 = /** @pureOrBreakMyCode */ (
    makeRWPair(readSint64String, writeSint64, typeTokens.SINT64));

/** @const {?} */
exports.RPackableSint64StringIntoWRepeatedSint64 =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableSint64StringInto, writeRepeatedSint64, typeTokens.SINT64));

/** @const {?} */
exports.RPackableSint64StringIntoWPackedSint64 =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableSint64StringInto, writePackedSint64, typeTokens.SINT64));

/** @const {?} */
exports.RSint64StringIgnoringDefaultWSint64 =
    /** @pureOrBreakMyCode */ (makeRWPair(
        readSint64StringIgnoringDefault, writeSint64, typeTokens.SINT64));

/** @const {?} */
exports.RSint64StringOneofWSint64 = /** @pureOrBreakMyCode */ (
    makeRWPair(readSint64StringOneof, writeSint64, typeTokens.SINT64));

/** @const {?} */
exports.RWSint64 = /** @pureOrBreakMyCode */ (
    makeRWPair(readSint64, writeSint64, typeTokens.SINT64));

/** @const {?} */
exports.RPackableSint64IntoWRepeatedSint64 =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableSint64Into, writeRepeatedSint64, typeTokens.SINT64));

/** @const {?} */
exports.RPackableSint64IntoWPackedSint64 =
    /** @pureOrBreakMyCode */ (makeRepeatedRWPair(
        readPackableSint64Into, writePackedSint64, typeTokens.SINT64));

/** @const {?} */
exports.RSint64IgnoringDefaultWSint64 = /** @pureOrBreakMyCode */ (
    makeRWPair(readSint64IgnoringDefault, writeSint64, typeTokens.SINT64));

/** @const {?} */
exports.RSint64OneofWSint64 = /** @pureOrBreakMyCode */ (
    makeRWPair(readSint64Oneof, writeSint64, typeTokens.SINT64));

/** @const {!BinaryFields}*/
exports.Int64DoubleMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWInt64, exports.RWDouble));

/** @const {!BinaryFields}*/
exports.Int64FloatMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWInt64, exports.RWFloat));

/** @const {!BinaryFields}*/
exports.Int64Int64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWInt64, exports.RWInt64));

/** @const {!BinaryFields}*/
exports.Int64Uint64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWInt64, exports.RWUint64));

/** @const {!BinaryFields}*/
exports.Int64Int32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWInt64, exports.RWInt32));

/** @const {!BinaryFields}*/
exports.Int64Fixed64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWInt64, exports.RWFixed64));

/** @const {!BinaryFields}*/
exports.Int64Fixed32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWInt64, exports.RWFixed32));

/** @const {!BinaryFields}*/
exports.Int64BoolMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWInt64, exports.RWBool));

/** @const {!BinaryFields}*/
exports.Int64StringMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWInt64, exports.RWString));

/** @const {!BinaryFields}*/
exports.Int64StringRequireUtf8Map = /** @pureOrBreakMyCode*/ (
    UTF8_PARSING_ERRORS_ARE_FATAL ?
        exports.Int64StringMap :
        createMapEntryBinaryFields(
            exports.RWInt64, exports.RStringRequireUtf8WString));

/** @const {!BinaryFields}*/
exports.Int64BytesMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWInt64, exports.RWBytes));

/** @const {!BinaryFields}*/
exports.Int64Uint32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWInt64, exports.RWUint32));

/** @const {!BinaryFields}*/
exports.Int64EnumMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWInt64, exports.RWEnum));

/** @const {!BinaryFields}*/
exports.Int64Sfixed32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWInt64, exports.RWSfixed32));

/** @const {!BinaryFields}*/
exports.Int64Sfixed64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWInt64, exports.RWSfixed64));

/** @const {!BinaryFields}*/
exports.Int64Sint32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWInt64, exports.RWSint32));

/** @const {!BinaryFields}*/
exports.Int64Sint64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWInt64, exports.RWSint64));

/** @const {!BinaryFields}*/
exports.Uint64DoubleMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWUint64, exports.RWDouble));

/** @const {!BinaryFields}*/
exports.Uint64FloatMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWUint64, exports.RWFloat));

/** @const {!BinaryFields}*/
exports.Uint64Int64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWUint64, exports.RWInt64));

/** @const {!BinaryFields}*/
exports.Uint64Uint64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWUint64, exports.RWUint64));

/** @const {!BinaryFields}*/
exports.Uint64Int32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWUint64, exports.RWInt32));

/** @const {!BinaryFields}*/
exports.Uint64Fixed64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWUint64, exports.RWFixed64));

/** @const {!BinaryFields}*/
exports.Uint64Fixed32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWUint64, exports.RWFixed32));

/** @const {!BinaryFields}*/
exports.Uint64BoolMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWUint64, exports.RWBool));

/** @const {!BinaryFields}*/
exports.Uint64StringMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWUint64, exports.RWString));

/** @const {!BinaryFields}*/
exports.Uint64StringRequireUtf8Map = /** @pureOrBreakMyCode*/ (
    UTF8_PARSING_ERRORS_ARE_FATAL ?
        exports.Uint64StringMap :
        createMapEntryBinaryFields(
            exports.RWUint64, exports.RStringRequireUtf8WString));

/** @const {!BinaryFields}*/
exports.Uint64BytesMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWUint64, exports.RWBytes));

/** @const {!BinaryFields}*/
exports.Uint64Uint32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWUint64, exports.RWUint32));

/** @const {!BinaryFields}*/
exports.Uint64EnumMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWUint64, exports.RWEnum));

/** @const {!BinaryFields}*/
exports.Uint64Sfixed32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWUint64, exports.RWSfixed32));

/** @const {!BinaryFields}*/
exports.Uint64Sfixed64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWUint64, exports.RWSfixed64));

/** @const {!BinaryFields}*/
exports.Uint64Sint32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWUint64, exports.RWSint32));

/** @const {!BinaryFields}*/
exports.Uint64Sint64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWUint64, exports.RWSint64));

/** @const {!BinaryFields}*/
exports.Int32DoubleMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWInt32, exports.RWDouble));

/** @const {!BinaryFields}*/
exports.Int32FloatMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWInt32, exports.RWFloat));

/** @const {!BinaryFields}*/
exports.Int32Int64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWInt32, exports.RWInt64));

/** @const {!BinaryFields}*/
exports.Int32Uint64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWInt32, exports.RWUint64));

/** @const {!BinaryFields}*/
exports.Int32Int32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWInt32, exports.RWInt32));

/** @const {!BinaryFields}*/
exports.Int32Fixed64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWInt32, exports.RWFixed64));

/** @const {!BinaryFields}*/
exports.Int32Fixed32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWInt32, exports.RWFixed32));

/** @const {!BinaryFields}*/
exports.Int32BoolMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWInt32, exports.RWBool));

/** @const {!BinaryFields}*/
exports.Int32StringMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWInt32, exports.RWString));

/** @const {!BinaryFields}*/
exports.Int32StringRequireUtf8Map = /** @pureOrBreakMyCode*/ (
    UTF8_PARSING_ERRORS_ARE_FATAL ?
        exports.Int32StringMap :
        createMapEntryBinaryFields(
            exports.RWInt32, exports.RStringRequireUtf8WString));

/** @const {!BinaryFields}*/
exports.Int32BytesMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWInt32, exports.RWBytes));

/** @const {!BinaryFields}*/
exports.Int32Uint32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWInt32, exports.RWUint32));

/** @const {!BinaryFields}*/
exports.Int32EnumMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWInt32, exports.RWEnum));

/** @const {!BinaryFields}*/
exports.Int32Sfixed32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWInt32, exports.RWSfixed32));

/** @const {!BinaryFields}*/
exports.Int32Sfixed64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWInt32, exports.RWSfixed64));

/** @const {!BinaryFields}*/
exports.Int32Sint32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWInt32, exports.RWSint32));

/** @const {!BinaryFields}*/
exports.Int32Sint64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWInt32, exports.RWSint64));

/** @const {!BinaryFields}*/
exports.Fixed64DoubleMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWFixed64, exports.RWDouble));

/** @const {!BinaryFields}*/
exports.Fixed64FloatMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWFixed64, exports.RWFloat));

/** @const {!BinaryFields}*/
exports.Fixed64Int64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWFixed64, exports.RWInt64));

/** @const {!BinaryFields}*/
exports.Fixed64Uint64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWFixed64, exports.RWUint64));

/** @const {!BinaryFields}*/
exports.Fixed64Int32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWFixed64, exports.RWInt32));

/** @const {!BinaryFields}*/
exports.Fixed64Fixed64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWFixed64, exports.RWFixed64));

/** @const {!BinaryFields}*/
exports.Fixed64Fixed32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWFixed64, exports.RWFixed32));

/** @const {!BinaryFields}*/
exports.Fixed64BoolMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWFixed64, exports.RWBool));

/** @const {!BinaryFields}*/
exports.Fixed64StringMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWFixed64, exports.RWString));

/** @const {!BinaryFields}*/
exports.Fixed64StringRequireUtf8Map = /** @pureOrBreakMyCode*/ (
    UTF8_PARSING_ERRORS_ARE_FATAL ?
        exports.Fixed64StringMap :
        createMapEntryBinaryFields(
            exports.RWFixed64, exports.RStringRequireUtf8WString));

/** @const {!BinaryFields}*/
exports.Fixed64BytesMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWFixed64, exports.RWBytes));

/** @const {!BinaryFields}*/
exports.Fixed64Uint32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWFixed64, exports.RWUint32));

/** @const {!BinaryFields}*/
exports.Fixed64EnumMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWFixed64, exports.RWEnum));

/** @const {!BinaryFields}*/
exports.Fixed64Sfixed32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWFixed64, exports.RWSfixed32));

/** @const {!BinaryFields}*/
exports.Fixed64Sfixed64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWFixed64, exports.RWSfixed64));

/** @const {!BinaryFields}*/
exports.Fixed64Sint32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWFixed64, exports.RWSint32));

/** @const {!BinaryFields}*/
exports.Fixed64Sint64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWFixed64, exports.RWSint64));

/** @const {!BinaryFields}*/
exports.Fixed32DoubleMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWFixed32, exports.RWDouble));

/** @const {!BinaryFields}*/
exports.Fixed32FloatMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWFixed32, exports.RWFloat));

/** @const {!BinaryFields}*/
exports.Fixed32Int64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWFixed32, exports.RWInt64));

/** @const {!BinaryFields}*/
exports.Fixed32Uint64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWFixed32, exports.RWUint64));

/** @const {!BinaryFields}*/
exports.Fixed32Int32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWFixed32, exports.RWInt32));

/** @const {!BinaryFields}*/
exports.Fixed32Fixed64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWFixed32, exports.RWFixed64));

/** @const {!BinaryFields}*/
exports.Fixed32Fixed32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWFixed32, exports.RWFixed32));

/** @const {!BinaryFields}*/
exports.Fixed32BoolMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWFixed32, exports.RWBool));

/** @const {!BinaryFields}*/
exports.Fixed32StringMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWFixed32, exports.RWString));

/** @const {!BinaryFields}*/
exports.Fixed32StringRequireUtf8Map = /** @pureOrBreakMyCode*/ (
    UTF8_PARSING_ERRORS_ARE_FATAL ?
        exports.Fixed32StringMap :
        createMapEntryBinaryFields(
            exports.RWFixed32, exports.RStringRequireUtf8WString));

/** @const {!BinaryFields}*/
exports.Fixed32BytesMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWFixed32, exports.RWBytes));

/** @const {!BinaryFields}*/
exports.Fixed32Uint32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWFixed32, exports.RWUint32));

/** @const {!BinaryFields}*/
exports.Fixed32EnumMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWFixed32, exports.RWEnum));

/** @const {!BinaryFields}*/
exports.Fixed32Sfixed32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWFixed32, exports.RWSfixed32));

/** @const {!BinaryFields}*/
exports.Fixed32Sfixed64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWFixed32, exports.RWSfixed64));

/** @const {!BinaryFields}*/
exports.Fixed32Sint32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWFixed32, exports.RWSint32));

/** @const {!BinaryFields}*/
exports.Fixed32Sint64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWFixed32, exports.RWSint64));

/** @const {!BinaryFields}*/
exports.BoolDoubleMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWBool, exports.RWDouble));

/** @const {!BinaryFields}*/
exports.BoolFloatMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWBool, exports.RWFloat));

/** @const {!BinaryFields}*/
exports.BoolInt64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWBool, exports.RWInt64));

/** @const {!BinaryFields}*/
exports.BoolUint64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWBool, exports.RWUint64));

/** @const {!BinaryFields}*/
exports.BoolInt32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWBool, exports.RWInt32));

/** @const {!BinaryFields}*/
exports.BoolFixed64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWBool, exports.RWFixed64));

/** @const {!BinaryFields}*/
exports.BoolFixed32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWBool, exports.RWFixed32));

/** @const {!BinaryFields}*/
exports.BoolBoolMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWBool, exports.RWBool));

/** @const {!BinaryFields}*/
exports.BoolStringMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWBool, exports.RWString));

/** @const {!BinaryFields}*/
exports.BoolStringRequireUtf8Map = /** @pureOrBreakMyCode*/ (
    UTF8_PARSING_ERRORS_ARE_FATAL ?
        exports.BoolStringMap :
        createMapEntryBinaryFields(
            exports.RWBool, exports.RStringRequireUtf8WString));

/** @const {!BinaryFields}*/
exports.BoolBytesMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWBool, exports.RWBytes));

/** @const {!BinaryFields}*/
exports.BoolUint32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWBool, exports.RWUint32));

/** @const {!BinaryFields}*/
exports.BoolEnumMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWBool, exports.RWEnum));

/** @const {!BinaryFields}*/
exports.BoolSfixed32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWBool, exports.RWSfixed32));

/** @const {!BinaryFields}*/
exports.BoolSfixed64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWBool, exports.RWSfixed64));

/** @const {!BinaryFields}*/
exports.BoolSint32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWBool, exports.RWSint32));

/** @const {!BinaryFields}*/
exports.BoolSint64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWBool, exports.RWSint64));

/** @const {!BinaryFields}*/
exports.StringDoubleMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWString, exports.RWDouble));

/** @const {!BinaryFields}*/
exports.StringRequireUtf8DoubleMap = /** @pureOrBreakMyCode*/ (
    UTF8_PARSING_ERRORS_ARE_FATAL ?
        exports.StringDoubleMap :
        createMapEntryBinaryFields(
            exports.RStringRequireUtf8WString, exports.RWDouble));

/** @const {!BinaryFields}*/
exports.StringFloatMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWString, exports.RWFloat));

/** @const {!BinaryFields}*/
exports.StringRequireUtf8FloatMap = /** @pureOrBreakMyCode*/ (
    UTF8_PARSING_ERRORS_ARE_FATAL ?
        exports.StringFloatMap :
        createMapEntryBinaryFields(
            exports.RStringRequireUtf8WString, exports.RWFloat));

/** @const {!BinaryFields}*/
exports.StringInt64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWString, exports.RWInt64));

/** @const {!BinaryFields}*/
exports.StringRequireUtf8Int64Map = /** @pureOrBreakMyCode*/ (
    UTF8_PARSING_ERRORS_ARE_FATAL ?
        exports.StringInt64Map :
        createMapEntryBinaryFields(
            exports.RStringRequireUtf8WString, exports.RWInt64));

/** @const {!BinaryFields}*/
exports.StringUint64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWString, exports.RWUint64));

/** @const {!BinaryFields}*/
exports.StringRequireUtf8Uint64Map = /** @pureOrBreakMyCode*/ (
    UTF8_PARSING_ERRORS_ARE_FATAL ?
        exports.StringUint64Map :
        createMapEntryBinaryFields(
            exports.RStringRequireUtf8WString, exports.RWUint64));

/** @const {!BinaryFields}*/
exports.StringInt32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWString, exports.RWInt32));

/** @const {!BinaryFields}*/
exports.StringRequireUtf8Int32Map = /** @pureOrBreakMyCode*/ (
    UTF8_PARSING_ERRORS_ARE_FATAL ?
        exports.StringInt32Map :
        createMapEntryBinaryFields(
            exports.RStringRequireUtf8WString, exports.RWInt32));

/** @const {!BinaryFields}*/
exports.StringFixed64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWString, exports.RWFixed64));

/** @const {!BinaryFields}*/
exports.StringRequireUtf8Fixed64Map = /** @pureOrBreakMyCode*/ (
    UTF8_PARSING_ERRORS_ARE_FATAL ?
        exports.StringFixed64Map :
        createMapEntryBinaryFields(
            exports.RStringRequireUtf8WString, exports.RWFixed64));

/** @const {!BinaryFields}*/
exports.StringFixed32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWString, exports.RWFixed32));

/** @const {!BinaryFields}*/
exports.StringRequireUtf8Fixed32Map = /** @pureOrBreakMyCode*/ (
    UTF8_PARSING_ERRORS_ARE_FATAL ?
        exports.StringFixed32Map :
        createMapEntryBinaryFields(
            exports.RStringRequireUtf8WString, exports.RWFixed32));

/** @const {!BinaryFields}*/
exports.StringBoolMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWString, exports.RWBool));

/** @const {!BinaryFields}*/
exports.StringRequireUtf8BoolMap = /** @pureOrBreakMyCode*/ (
    UTF8_PARSING_ERRORS_ARE_FATAL ?
        exports.StringBoolMap :
        createMapEntryBinaryFields(
            exports.RStringRequireUtf8WString, exports.RWBool));

/** @const {!BinaryFields}*/
exports.StringStringMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWString, exports.RWString));

/** @const {!BinaryFields}*/
exports.StringRequireUtf8StringRequireUtf8Map = /** @pureOrBreakMyCode*/ (
    UTF8_PARSING_ERRORS_ARE_FATAL ? exports.StringStringMap :
                                    createMapEntryBinaryFields(
                                        exports.RStringRequireUtf8WString,
                                        exports.RStringRequireUtf8WString));

/** @const {!BinaryFields}*/
exports.StringBytesMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWString, exports.RWBytes));

/** @const {!BinaryFields}*/
exports.StringRequireUtf8BytesMap = /** @pureOrBreakMyCode*/ (
    UTF8_PARSING_ERRORS_ARE_FATAL ?
        exports.StringBytesMap :
        createMapEntryBinaryFields(
            exports.RStringRequireUtf8WString, exports.RWBytes));

/** @const {!BinaryFields}*/
exports.StringUint32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWString, exports.RWUint32));

/** @const {!BinaryFields}*/
exports.StringRequireUtf8Uint32Map = /** @pureOrBreakMyCode*/ (
    UTF8_PARSING_ERRORS_ARE_FATAL ?
        exports.StringUint32Map :
        createMapEntryBinaryFields(
            exports.RStringRequireUtf8WString, exports.RWUint32));

/** @const {!BinaryFields}*/
exports.StringEnumMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWString, exports.RWEnum));

/** @const {!BinaryFields}*/
exports.StringRequireUtf8EnumMap = /** @pureOrBreakMyCode*/ (
    UTF8_PARSING_ERRORS_ARE_FATAL ?
        exports.StringEnumMap :
        createMapEntryBinaryFields(
            exports.RStringRequireUtf8WString, exports.RWEnum));

/** @const {!BinaryFields}*/
exports.StringSfixed32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWString, exports.RWSfixed32));

/** @const {!BinaryFields}*/
exports.StringRequireUtf8Sfixed32Map = /** @pureOrBreakMyCode*/ (
    UTF8_PARSING_ERRORS_ARE_FATAL ?
        exports.StringSfixed32Map :
        createMapEntryBinaryFields(
            exports.RStringRequireUtf8WString, exports.RWSfixed32));

/** @const {!BinaryFields}*/
exports.StringSfixed64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWString, exports.RWSfixed64));

/** @const {!BinaryFields}*/
exports.StringRequireUtf8Sfixed64Map = /** @pureOrBreakMyCode*/ (
    UTF8_PARSING_ERRORS_ARE_FATAL ?
        exports.StringSfixed64Map :
        createMapEntryBinaryFields(
            exports.RStringRequireUtf8WString, exports.RWSfixed64));

/** @const {!BinaryFields}*/
exports.StringSint32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWString, exports.RWSint32));

/** @const {!BinaryFields}*/
exports.StringRequireUtf8Sint32Map = /** @pureOrBreakMyCode*/ (
    UTF8_PARSING_ERRORS_ARE_FATAL ?
        exports.StringSint32Map :
        createMapEntryBinaryFields(
            exports.RStringRequireUtf8WString, exports.RWSint32));

/** @const {!BinaryFields}*/
exports.StringSint64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWString, exports.RWSint64));

/** @const {!BinaryFields}*/
exports.StringRequireUtf8Sint64Map = /** @pureOrBreakMyCode*/ (
    UTF8_PARSING_ERRORS_ARE_FATAL ?
        exports.StringSint64Map :
        createMapEntryBinaryFields(
            exports.RStringRequireUtf8WString, exports.RWSint64));

/** @const {!BinaryFields}*/
exports.Uint32DoubleMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWUint32, exports.RWDouble));

/** @const {!BinaryFields}*/
exports.Uint32FloatMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWUint32, exports.RWFloat));

/** @const {!BinaryFields}*/
exports.Uint32Int64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWUint32, exports.RWInt64));

/** @const {!BinaryFields}*/
exports.Uint32Uint64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWUint32, exports.RWUint64));

/** @const {!BinaryFields}*/
exports.Uint32Int32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWUint32, exports.RWInt32));

/** @const {!BinaryFields}*/
exports.Uint32Fixed64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWUint32, exports.RWFixed64));

/** @const {!BinaryFields}*/
exports.Uint32Fixed32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWUint32, exports.RWFixed32));

/** @const {!BinaryFields}*/
exports.Uint32BoolMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWUint32, exports.RWBool));

/** @const {!BinaryFields}*/
exports.Uint32StringMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWUint32, exports.RWString));

/** @const {!BinaryFields}*/
exports.Uint32StringRequireUtf8Map = /** @pureOrBreakMyCode*/ (
    UTF8_PARSING_ERRORS_ARE_FATAL ?
        exports.Uint32StringMap :
        createMapEntryBinaryFields(
            exports.RWUint32, exports.RStringRequireUtf8WString));

/** @const {!BinaryFields}*/
exports.Uint32BytesMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWUint32, exports.RWBytes));

/** @const {!BinaryFields}*/
exports.Uint32Uint32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWUint32, exports.RWUint32));

/** @const {!BinaryFields}*/
exports.Uint32EnumMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWUint32, exports.RWEnum));

/** @const {!BinaryFields}*/
exports.Uint32Sfixed32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWUint32, exports.RWSfixed32));

/** @const {!BinaryFields}*/
exports.Uint32Sfixed64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWUint32, exports.RWSfixed64));

/** @const {!BinaryFields}*/
exports.Uint32Sint32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWUint32, exports.RWSint32));

/** @const {!BinaryFields}*/
exports.Uint32Sint64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWUint32, exports.RWSint64));

/** @const {!BinaryFields}*/
exports.Sfixed32DoubleMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSfixed32, exports.RWDouble));

/** @const {!BinaryFields}*/
exports.Sfixed32FloatMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSfixed32, exports.RWFloat));

/** @const {!BinaryFields}*/
exports.Sfixed32Int64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSfixed32, exports.RWInt64));

/** @const {!BinaryFields}*/
exports.Sfixed32Uint64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSfixed32, exports.RWUint64));

/** @const {!BinaryFields}*/
exports.Sfixed32Int32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSfixed32, exports.RWInt32));

/** @const {!BinaryFields}*/
exports.Sfixed32Fixed64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSfixed32, exports.RWFixed64));

/** @const {!BinaryFields}*/
exports.Sfixed32Fixed32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSfixed32, exports.RWFixed32));

/** @const {!BinaryFields}*/
exports.Sfixed32BoolMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSfixed32, exports.RWBool));

/** @const {!BinaryFields}*/
exports.Sfixed32StringMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSfixed32, exports.RWString));

/** @const {!BinaryFields}*/
exports.Sfixed32StringRequireUtf8Map = /** @pureOrBreakMyCode*/ (
    UTF8_PARSING_ERRORS_ARE_FATAL ?
        exports.Sfixed32StringMap :
        createMapEntryBinaryFields(
            exports.RWSfixed32, exports.RStringRequireUtf8WString));

/** @const {!BinaryFields}*/
exports.Sfixed32BytesMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSfixed32, exports.RWBytes));

/** @const {!BinaryFields}*/
exports.Sfixed32Uint32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSfixed32, exports.RWUint32));

/** @const {!BinaryFields}*/
exports.Sfixed32EnumMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSfixed32, exports.RWEnum));

/** @const {!BinaryFields}*/
exports.Sfixed32Sfixed32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSfixed32, exports.RWSfixed32));

/** @const {!BinaryFields}*/
exports.Sfixed32Sfixed64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSfixed32, exports.RWSfixed64));

/** @const {!BinaryFields}*/
exports.Sfixed32Sint32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSfixed32, exports.RWSint32));

/** @const {!BinaryFields}*/
exports.Sfixed32Sint64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSfixed32, exports.RWSint64));

/** @const {!BinaryFields}*/
exports.Sfixed64DoubleMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSfixed64, exports.RWDouble));

/** @const {!BinaryFields}*/
exports.Sfixed64FloatMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSfixed64, exports.RWFloat));

/** @const {!BinaryFields}*/
exports.Sfixed64Int64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSfixed64, exports.RWInt64));

/** @const {!BinaryFields}*/
exports.Sfixed64Uint64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSfixed64, exports.RWUint64));

/** @const {!BinaryFields}*/
exports.Sfixed64Int32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSfixed64, exports.RWInt32));

/** @const {!BinaryFields}*/
exports.Sfixed64Fixed64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSfixed64, exports.RWFixed64));

/** @const {!BinaryFields}*/
exports.Sfixed64Fixed32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSfixed64, exports.RWFixed32));

/** @const {!BinaryFields}*/
exports.Sfixed64BoolMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSfixed64, exports.RWBool));

/** @const {!BinaryFields}*/
exports.Sfixed64StringMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSfixed64, exports.RWString));

/** @const {!BinaryFields}*/
exports.Sfixed64StringRequireUtf8Map = /** @pureOrBreakMyCode*/ (
    UTF8_PARSING_ERRORS_ARE_FATAL ?
        exports.Sfixed64StringMap :
        createMapEntryBinaryFields(
            exports.RWSfixed64, exports.RStringRequireUtf8WString));

/** @const {!BinaryFields}*/
exports.Sfixed64BytesMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSfixed64, exports.RWBytes));

/** @const {!BinaryFields}*/
exports.Sfixed64Uint32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSfixed64, exports.RWUint32));

/** @const {!BinaryFields}*/
exports.Sfixed64EnumMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSfixed64, exports.RWEnum));

/** @const {!BinaryFields}*/
exports.Sfixed64Sfixed32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSfixed64, exports.RWSfixed32));

/** @const {!BinaryFields}*/
exports.Sfixed64Sfixed64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSfixed64, exports.RWSfixed64));

/** @const {!BinaryFields}*/
exports.Sfixed64Sint32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSfixed64, exports.RWSint32));

/** @const {!BinaryFields}*/
exports.Sfixed64Sint64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSfixed64, exports.RWSint64));

/** @const {!BinaryFields}*/
exports.Sint32DoubleMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSint32, exports.RWDouble));

/** @const {!BinaryFields}*/
exports.Sint32FloatMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSint32, exports.RWFloat));

/** @const {!BinaryFields}*/
exports.Sint32Int64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSint32, exports.RWInt64));

/** @const {!BinaryFields}*/
exports.Sint32Uint64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSint32, exports.RWUint64));

/** @const {!BinaryFields}*/
exports.Sint32Int32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSint32, exports.RWInt32));

/** @const {!BinaryFields}*/
exports.Sint32Fixed64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSint32, exports.RWFixed64));

/** @const {!BinaryFields}*/
exports.Sint32Fixed32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSint32, exports.RWFixed32));

/** @const {!BinaryFields}*/
exports.Sint32BoolMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSint32, exports.RWBool));

/** @const {!BinaryFields}*/
exports.Sint32StringMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSint32, exports.RWString));

/** @const {!BinaryFields}*/
exports.Sint32StringRequireUtf8Map = /** @pureOrBreakMyCode*/ (
    UTF8_PARSING_ERRORS_ARE_FATAL ?
        exports.Sint32StringMap :
        createMapEntryBinaryFields(
            exports.RWSint32, exports.RStringRequireUtf8WString));

/** @const {!BinaryFields}*/
exports.Sint32BytesMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSint32, exports.RWBytes));

/** @const {!BinaryFields}*/
exports.Sint32Uint32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSint32, exports.RWUint32));

/** @const {!BinaryFields}*/
exports.Sint32EnumMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSint32, exports.RWEnum));

/** @const {!BinaryFields}*/
exports.Sint32Sfixed32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSint32, exports.RWSfixed32));

/** @const {!BinaryFields}*/
exports.Sint32Sfixed64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSint32, exports.RWSfixed64));

/** @const {!BinaryFields}*/
exports.Sint32Sint32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSint32, exports.RWSint32));

/** @const {!BinaryFields}*/
exports.Sint32Sint64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSint32, exports.RWSint64));

/** @const {!BinaryFields}*/
exports.Sint64DoubleMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSint64, exports.RWDouble));

/** @const {!BinaryFields}*/
exports.Sint64FloatMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSint64, exports.RWFloat));

/** @const {!BinaryFields}*/
exports.Sint64Int64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSint64, exports.RWInt64));

/** @const {!BinaryFields}*/
exports.Sint64Uint64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSint64, exports.RWUint64));

/** @const {!BinaryFields}*/
exports.Sint64Int32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSint64, exports.RWInt32));

/** @const {!BinaryFields}*/
exports.Sint64Fixed64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSint64, exports.RWFixed64));

/** @const {!BinaryFields}*/
exports.Sint64Fixed32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSint64, exports.RWFixed32));

/** @const {!BinaryFields}*/
exports.Sint64BoolMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSint64, exports.RWBool));

/** @const {!BinaryFields}*/
exports.Sint64StringMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSint64, exports.RWString));

/** @const {!BinaryFields}*/
exports.Sint64StringRequireUtf8Map = /** @pureOrBreakMyCode*/ (
    UTF8_PARSING_ERRORS_ARE_FATAL ?
        exports.Sint64StringMap :
        createMapEntryBinaryFields(
            exports.RWSint64, exports.RStringRequireUtf8WString));

/** @const {!BinaryFields}*/
exports.Sint64BytesMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSint64, exports.RWBytes));

/** @const {!BinaryFields}*/
exports.Sint64Uint32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSint64, exports.RWUint32));

/** @const {!BinaryFields}*/
exports.Sint64EnumMap = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSint64, exports.RWEnum));

/** @const {!BinaryFields}*/
exports.Sint64Sfixed32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSint64, exports.RWSfixed32));

/** @const {!BinaryFields}*/
exports.Sint64Sfixed64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSint64, exports.RWSfixed64));

/** @const {!BinaryFields}*/
exports.Sint64Sint32Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSint64, exports.RWSint32));

/** @const {!BinaryFields}*/
exports.Sint64Sint64Map = /** @pureOrBreakMyCode*/ (
    createMapEntryBinaryFields(exports.RWSint64, exports.RWSint64));

// END AUTO-GENERATED
////////////////////////////////////////////////////////////
