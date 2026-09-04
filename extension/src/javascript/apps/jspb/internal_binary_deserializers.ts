/**
 * @fileoverview Implementation of binary deserializers.
 *
 * DO NOT USE THIS OUTSIDE OF THIS PACKAGE.
 * Generated from: javascript/apps/jspb/internal_binary_deserializers.ts
 * @suppress {checkTypes} added by tsickle
 * @suppress {extraRequire} added by tsickle
 * @suppress {missingRequire} added by tsickle
 * @suppress {uselessCode} added by tsickle
 * @suppress {suspiciousCode} added by tsickle
 * @suppress {missingReturn} added by tsickle
 * @suppress {unusedLocalVariables} added by tsickle
 * @suppress {missingOverride} added by tsickle
 * @suppress {const} added by tsickle
 */
goog.module('google3.javascript.apps.jspb.internal_binary_deserializers');
var module = module || { id: 'javascript/apps/jspb/internal_binary_deserializers.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_errors_1 = goog.requireType("jspb.binary.errors");
const tsickle_reader_2 = goog.requireType("jspb.binary.reader");
const tsickle_bytestring_3 = goog.requireType("jspb.bytestring");
const tsickle_internal_4 = goog.requireType("jspb.internal");
const tsickle_internal_array_state_5 = goog.requireType("jspb.internal_array_state");
const tsickle_internal_binary_fields_6 = goog.requireType("google3.javascript.apps.jspb.internal_binary_fields");
const tsickle_internal_construct_7 = goog.requireType("jspb.internal_construct");
const tsickle_internal_jspb_adapters_8 = goog.requireType("jspb_internal_adapters");
const tsickle_internal_options_9 = goog.requireType("jspb.internal_options");
const tsickle_internal_unknown_fields_10 = goog.requireType("jspb.internal_unknown_fields");
const tsickle_internal_map_11 = goog.requireType("jspb.internal_map");
const tsickle_goog_jspb_12 = goog.requireType("jspb");
const errors_1 = goog.require('jspb.binary.errors');
const reader_1 = goog.require('jspb.binary.reader');
const internal_1 = goog.require('jspb.internal');
const internal_array_state_1 = goog.require('jspb.internal_array_state');
const internal_binary_fields_1 = goog.require('google3.javascript.apps.jspb.internal_binary_fields');
const internal_construct_1 = goog.require('jspb.internal_construct');
const internal_jspb_adapters_1 = goog.require('jspb_internal_adapters');
const internal_options_1 = goog.require('jspb.internal_options');
const internal_unknown_fields_1 = goog.require('jspb.internal_unknown_fields');
const assert_1 = goog.require('google3.javascript.typescript.contrib.assert');
/**
 * Returns a deserializer table for the given binary fields.
 * @nosideeffects
 * @param {?} binaryFields
 * @return {!tsickle_internal_binary_fields_6.Deserializers}
 */
function deserializersForBinaryFields(binaryFields) {
    return (0, internal_binary_fields_1.makeMessageFieldTable)(internal_binary_fields_1.CACHED_DESERIALIZERS, 
    /* emptyTable= */ undefined, addPrimitiveFieldToDeserializers, addMessageFieldToDeserializers, binaryFields);
}
exports.deserializersForBinaryFields = deserializersForBinaryFields;
/**
 * @param {!tsickle_internal_binary_fields_6.Deserializers} table
 * @param {?} fieldNumber
 * @param {!tsickle_internal_binary_fields_6.ReaderWriterPair} readerWriterPair
 * @param {(undefined|!Array<?>)=} oneofGroup
 * @return {void}
 */
function addPrimitiveFieldToDeserializers(table, fieldNumber, readerWriterPair, oneofGroup) {
    /** @type {function(!tsickle_reader_2.BinaryReader, !Array<*>, ?, (undefined|!Array<?>)=): boolean} */
    const readFn = (/** @type {function(!tsickle_reader_2.BinaryReader, !Array<*>, ?, (undefined|!Array<?>)=): boolean} */ (readerWriterPair.$$binaryReaderFn));
    table[fieldNumber] = !oneofGroup
        ? readFn
        : (/**
         * @param {!tsickle_reader_2.BinaryReader} reader
         * @param {!Array<*>} messageArray
         * @param {?} fieldNumber
         * @return {boolean}
         */
        (reader, messageArray, fieldNumber) => readFn(reader, messageArray, fieldNumber, oneofGroup));
}
/**
 * @param {!tsickle_internal_binary_fields_6.Deserializers} table
 * @param {?} fieldNumber
 * @param {!tsickle_internal_binary_fields_6.ReaderWriterPair} readerWriterPair
 * @param {?} submessageBinaryFields
 * @param {(undefined|!Array<?>)=} oneofGroup
 * @return {void}
 */
function addMessageFieldToDeserializers(table, fieldNumber, readerWriterPair, submessageBinaryFields, oneofGroup) {
    /** @type {function(!tsickle_reader_2.BinaryReader, !Array<*>, ?, !Array<?>, function(!Array<*>, !tsickle_reader_2.BinaryReader): boolean, (undefined|!Array<?>)=): boolean} */
    const readFn = (/** @type {function(!tsickle_reader_2.BinaryReader, !Array<*>, ?, !Array<?>, function(!Array<*>, !tsickle_reader_2.BinaryReader): boolean, (undefined|!Array<?>)=): boolean} */ (readerWriterPair.$$binaryReaderFn));
    /** @type {(undefined|function(!Array<*>, !tsickle_reader_2.BinaryReader): boolean)} */
    let deserializeBinaryFromReader;
    /** @type {(undefined|!Array<?>)} */
    let messageMetadata;
    table[fieldNumber] = (/**
     * @param {!tsickle_reader_2.BinaryReader} reader
     * @param {!Array<*>} messageArray
     * @param {?} fieldNumber
     * @return {boolean}
     */
    (reader, messageArray, fieldNumber) => readFn(reader, messageArray, fieldNumber, messageMetadata ||
        (messageMetadata = deserializersForBinaryFields(submessageBinaryFields).messageMetadata), deserializeBinaryFromReader ||
        (deserializeBinaryFromReader =
            makeDeserializeBinaryFromReaderFromBinaryFields(submessageBinaryFields)), oneofGroup));
}
/**
 * Constructs a DeserializeBinaryFromReaderFn for the given BinaryFields.
 * @param {?} binaryFields
 * @return {function(!Array<*>, !tsickle_reader_2.BinaryReader): boolean}
 */
function makeDeserializeBinaryFromReaderFromBinaryFields(binaryFields) {
    /** @type {(undefined|function(!Array<*>, !tsickle_reader_2.BinaryReader): boolean)} */
    let readerFn = binaryFields[internal_binary_fields_1.CACHED_DESERIALIZE_BINARY_FROM_READER];
    if (readerFn != null)
        return readerFn;
    /** @type {!tsickle_internal_binary_fields_6.Deserializers} */
    const deserializers = deserializersForBinaryFields(binaryFields);
    // Message sets have a completely different wireformat that requires a
    // custom reader.  We pass it through the binaryFields object to avoid a
    // static dependency.
    if (deserializers.isMessageSet) {
        readerFn = (/**
         * @param {!Array<*>} messageArray
         * @param {!tsickle_reader_2.BinaryReader} reader
         * @return {boolean}
         */
        (messageArray, reader) => (0, internal_binary_fields_1.getDeserializeBinaryMessageSet)()(messageArray, reader, deserializers));
    }
    else {
        readerFn = (/**
         * @param {!Array<*>} messageArray
         * @param {!tsickle_reader_2.BinaryReader} reader
         * @return {boolean}
         */
        (messageArray, reader) => deserializeBinaryFromReaderGenericImpl(messageArray, reader, deserializers));
    }
    binaryFields[internal_binary_fields_1.CACHED_DESERIALIZE_BINARY_FROM_READER] = readerFn;
    binaryFields[internal_binary_fields_1.CACHED_UNKNOWN_BINARY_FIELDS_REVIVER] =
        reviveUnknownFields.bind(binaryFields);
    return readerFn;
}
exports.makeDeserializeBinaryFromReaderFromBinaryFields = makeDeserializeBinaryFromReaderFromBinaryFields;
/**
 * Revives unknown binary fields into a given message array.
 *
 * If fieldNumber is undefined, we will attempt to revive all unknown fields.
 * @this {?}
 * @param {!Array<*>} messageArray
 * @param {(undefined|number)=} fieldNumber
 * @param {(undefined|!tsickle_internal_binary_fields_6.UnknownBinaryFieldsRevivalOptions)=} options
 * @param {(undefined|function(!Array<*>, ?, !Array<!tsickle_bytestring_3.ByteString>): void)=} unrevivedFieldCallbackFn
 * @return {void}
 */
function reviveUnknownFields(messageArray, fieldNumber, options, unrevivedFieldCallbackFn) {
    /** @type {?} */
    const binaryFields = this;
    /** @type {!tsickle_internal_binary_fields_6.Deserializers} */
    const deserializers = (/** @type {!tsickle_internal_binary_fields_6.Deserializers} */ (binaryFields[internal_binary_fields_1.CACHED_DESERIALIZERS]));
    /** @type {function(!Array<*>, !tsickle_reader_2.BinaryReader): boolean} */
    const deserializeBinaryFromReader = (/** @type {function(!Array<*>, !tsickle_reader_2.BinaryReader): boolean} */ (binaryFields[internal_binary_fields_1.CACHED_DESERIALIZE_BINARY_FROM_READER]));
    // We need to deserialize into a new array in case the original message
    // was immutable.
    /** @type {!Array<*>} */
    const newMsg = (0, internal_construct_1.constructMessageArrayFromMetaForBinary)(
    /* data= */ undefined, (/** @type {function(new:tsickle_internal_construct_7.module$contents$jspb$internal_construct_Opaque)} */ ((/** @type {*} */ (deserializers.messageMetadata)))));
    /** @type {(undefined|!tsickle_internal_unknown_fields_10.UnknownFields)} */
    const unknownFieldSet = (0, internal_unknown_fields_1.getUnknownFields)(messageArray);
    if (!unknownFieldSet)
        return;
    /** @type {boolean} */
    let hadUnknownField = false;
    /** @type {(undefined|!tsickle_internal_binary_fields_6.BinaryExtensionSet)} */
    const extensions = deserializers.extensions;
    if (!extensions)
        return;
    /** @type {function(!tsickle_internal_unknown_fields_10.UnknownFields, number, !Array<!tsickle_bytestring_3.ByteString>): void} */
    const reviveUnknownField = (/**
     * @param {!tsickle_internal_unknown_fields_10.UnknownFields} fieldSet
     * @param {number} fieldNumber
     * @param {!Array<!tsickle_bytestring_3.ByteString>} fieldEntries
     * @return {void}
     */
    (fieldSet, fieldNumber, fieldEntries) => {
        if (fieldEntries.length === 0)
            return;
        /** @type {boolean} */
        const hasField = extensions[(/** @type {?} */ (fieldNumber))] &&
            !(0, internal_options_1.getDisableExtensionRegistryInBinaryDeserializationForTesting)();
        if (!hasField) {
            unrevivedFieldCallbackFn?.(messageArray, (/** @type {?} */ (fieldNumber)), fieldEntries);
            return;
        }
        for (const fieldEntry of fieldEntries) {
            /** @type {!tsickle_reader_2.BinaryReader} */
            const reader = reader_1.BinaryReader.alloc(fieldEntry);
            try {
                hadUnknownField = true;
                deserializeBinaryFromReader(newMsg, reader);
            }
            finally {
                reader.free();
            }
        }
    });
    if (fieldNumber == null) {
        unknownFieldSet.forEachUnknownField(reviveUnknownField);
    }
    else if (unknownFieldSet != null) {
        /** @type {!Array<!tsickle_bytestring_3.ByteString>} */
        const value = unknownFieldSet[fieldNumber];
        if (value)
            reviveUnknownField(unknownFieldSet, fieldNumber, value);
    }
    if (hadUnknownField) {
        /** @type {number} */
        let arrayState = (0, internal_array_state_1.getMessageArrayState)(messageArray);
        // In a revive call, we should only revive fields on a mutable array or on
        // an immutable array that does not have a wrapper.
        //
        // In a lazy extension access, we may revive into an immutable array since
        // the mutation is not observable (except to equals or serialize).
        if (arrayState & internal_array_state_1.ArrayStateFlags.IS_IMMUTABLE_ARRAY &&
            arrayState & internal_array_state_1.ArrayStateFlags.HAS_WRAPPER &&
            !options?.reviveIntoImmutable) {
            throw goog.DEBUG
                ? new Error('Cannot revive unknown fields on an immutable message with a wrapper')
                : new Error();
        }
        /** @type {(undefined|!tsickle_internal_4.HasMessageId)} */
        const hasMessageId = (0, internal_1.getHasMessageId)(arrayState);
        /** @type {function(number, *): void} */
        const writeBackFieldFromNewParent = (/**
         * @param {number} n
         * @param {*} valueUntyped
         * @return {void}
         */
        (n, valueUntyped) => {
            // tslint:disable-next-line:gbigint-usage
            /** @type {(undefined|null|string|number|boolean|?|!gbigint|!tsickle_bytestring_3.ByteString|!tsickle_internal_map_11.JspbMap<?, ?>|!tsickle_goog_jspb_12.Message)} */
            const value = (/** @type {(undefined|null|string|number|boolean|?|!gbigint|!tsickle_bytestring_3.ByteString|!tsickle_internal_map_11.JspbMap<?, ?>|!tsickle_goog_jspb_12.Message)} */ (valueUntyped));
            // If there was a value already in our array, we should've already
            // emitted some finding.
            //
            // TODO(varomodt): There's no right decision here, is dropping out okay?
            if ((0, internal_jspb_adapters_1.getFieldNullableInternal)(messageArray, arrayState, n, hasMessageId) !=
                null) {
                switch (options?.resolutionBehavior) {
                    case internal_binary_fields_1.UnknownBinaryFieldRevivalResolutionBehavior.IGNORE_IF_EXISTING:
                        return;
                    case internal_binary_fields_1.UnknownBinaryFieldRevivalResolutionBehavior.FAIL_IF_EXISTING:
                    // fall through
                    default:
                        throw goog.DEBUG
                            ? new Error(`Unknown binary field ${n} already set in message`)
                            : new Error();
                }
            }
            // This clobbers any value that was already set. It's not clear that
            // merging in the unknown content would be better.
            if (value != null) {
                arrayState = (0, assert_1.assertExists)((0, internal_jspb_adapters_1.setFieldIgnoringImmutability)(messageArray, arrayState, n, value, hasMessageId));
            }
            // We want to delete the unknown field whether or not it was
            // null.
            delete (/** @type {!tsickle_internal_unknown_fields_10.UnknownFields} */ (unknownFieldSet))[n];
        });
        if (fieldNumber == null) {
            (0, internal_1.iterateFields)(newMsg, (0, internal_array_state_1.getMessageArrayState)(newMsg), (/**
             * @param {number} n
             * @param {*} valueUntyped
             * @return {void}
             */
            (n, valueUntyped) => {
                writeBackFieldFromNewParent((/** @type {?} */ (n)), valueUntyped);
            }));
        }
        else {
            writeBackFieldFromNewParent(fieldNumber, (0, internal_jspb_adapters_1.getFieldNullableInternal)(newMsg, (0, internal_array_state_1.getMessageArrayState)(newMsg), fieldNumber, hasMessageId));
        }
    }
}
/**
 * Parses a message in the MessageSet format.
 * @param {!Array<*>} messageArray
 * @param {!tsickle_reader_2.BinaryReader} reader
 * @param {!tsickle_internal_binary_fields_6.Deserializers} deserializers
 * @return {boolean}
 */
function deserializeBinaryMessageSet(messageArray, reader, deserializers) {
    reader.pushRecursion();
    try {
        (0, assert_1.assert)(Array.isArray(messageArray));
        /** @type {(undefined|!tsickle_internal_binary_fields_6.BinaryExtensionSet)} */
        const extensions = deserializers.extensions;
        /** @type {number} */
        const originalState = (0, internal_array_state_1.getPossiblyUnconstructedMessageArrayState)(messageArray);
        (0, assert_1.assert)(!(originalState & internal_array_state_1.ArrayStateFlags.IS_IMMUTABLE_ARRAY));
        while (reader.nextField() && !reader.isEndGroup()) {
            if (reader.isMessageSetGroup()) {
                /** @type {number} */
                const startPosition = reader.getFieldCursor();
                /** @type {boolean} */
                let unknown = false;
                /** @type {?} */
                let n;
                reader.readMessageSetGroup((/**
                 * @param {number} fieldNumber
                 * @param {!tsickle_reader_2.BinaryReader} payloadReader
                 * @return {void}
                 */
                (fieldNumber, payloadReader) => {
                    n = (/** @type {?} */ (fieldNumber));
                    /** @type {(function(!tsickle_reader_2.BinaryReader, !Array<*>, ?): boolean|function(!tsickle_reader_2.BinaryReader, !Array<*>, ?, !Array<?>, function(!Array<*>, !tsickle_reader_2.BinaryReader): boolean, (undefined|!Array<?>)=): boolean)} */
                    let deserializer = deserializers[n];
                    if (deserializer == null) {
                        /** @type {(undefined|!tsickle_internal_binary_fields_6.ReaderWriterPair|?|function(): ?|!Array<?>)} */
                        const binaryFieldInfo = extensions?.[n];
                        if (binaryFieldInfo &&
                            !(0, internal_options_1.getDisableExtensionRegistryInBinaryDeserializationForTesting)()) {
                            /** @type {?} */
                            const binaryFields = getBinaryFieldsFromMessageSetExtension(binaryFieldInfo);
                            /** @type {function(!Array<*>, !tsickle_reader_2.BinaryReader): boolean} */
                            const deserializeBinaryFromReader = makeDeserializeBinaryFromReaderFromBinaryFields(binaryFields);
                            // All message set extensions are singular submessages.
                            /** @type {!Array<?>} */
                            const messageMetadata = deserializersForBinaryFields(binaryFields).messageMetadata;
                            deserializer = deserializers[n] = (/**
                             * @param {!tsickle_reader_2.BinaryReader} subReader
                             * @param {!Array<*>} messageArray
                             * @param {?} fieldNumber
                             * @return {boolean}
                             */
                            (subReader, messageArray, fieldNumber) => deserializeBinaryFromReader((0, internal_jspb_adapters_1.getMutableWrapperArrayForBinary)(messageArray, (/** @type {function(new:tsickle_internal_construct_7.module$contents$jspb$internal_construct_Opaque)} */ ((/** @type {*} */ (messageMetadata)))), fieldNumber), subReader));
                        }
                    }
                    if (deserializer != null) {
                        ((/** @type {function(!tsickle_reader_2.BinaryReader, !Array<*>, ?): boolean} */ (deserializer)))(payloadReader, messageArray, n);
                    }
                    else {
                        unknown = true;
                        // we failed to parse the message set entry, store the whole group as
                        // an unknown field.
                        payloadReader.skipToEnd();
                    }
                }));
                // We need to do this outside of the callback to make sure we are at
                // the end of the group.
                if (unknown) {
                    (0, internal_unknown_fields_1.addUnknownField)(messageArray, (/** @type {?} */ (n)), reader.readUnknownFieldsStartingFrom(startPosition));
                }
            }
            else {
                (0, internal_unknown_fields_1.addUnknownField)(messageArray, reader.getFieldNumber(), reader.readUnknownField());
            }
        }
        /** @type {(undefined|!tsickle_internal_unknown_fields_10.UnknownFields)} */
        const unknownFieldSet = (0, internal_unknown_fields_1.getUnknownFields)(messageArray);
        if (unknownFieldSet) {
            unknownFieldSet.reviveUnknownFields = (0, assert_1.assertExists)(deserializers.binaryFields[internal_binary_fields_1.CACHED_UNKNOWN_BINARY_FIELDS_REVIVER]);
        }
        return true;
    }
    catch (err) {
        if (reader_1.LIMIT_RECURSION_DEPTH && err instanceof RangeError) {
            throw (0, errors_1.maxRecursionDepthExceededError)();
        }
        throw (0, assert_1.assertInstanceof)(err, Error);
    }
    finally {
        reader.popRecursion();
    }
}
exports.deserializeBinaryMessageSet = deserializeBinaryMessageSet;
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!Array<*>} messageArray
 * @param {!tsickle_reader_2.BinaryReader} reader
 * @param {!tsickle_internal_binary_fields_6.Deserializers} fieldDeserializers
 * @return {boolean}
 */
function deserializeBinaryFromReaderGenericImpl(messageArray, reader, fieldDeserializers) {
    reader.pushRecursion();
    try {
        /** @type {number} */
        const originalState = (0, internal_array_state_1.getPossiblyUnconstructedMessageArrayState)(messageArray);
        (0, assert_1.assert)(!(originalState & internal_array_state_1.ArrayStateFlags.IS_IMMUTABLE_ARRAY));
        while (reader.nextField()) {
            if (reader.isEndGroup()) {
                break;
            }
            /** @type {?} */
            const fieldNumber = (/** @type {?} */ (reader.getFieldNumber()));
            /** @type {(undefined|function(!tsickle_reader_2.BinaryReader, !Array<*>, ?): boolean|function(!tsickle_reader_2.BinaryReader, !Array<*>, ?, !Array<?>, function(!Array<*>, !tsickle_reader_2.BinaryReader): boolean, (undefined|!Array<?>)=): boolean)} */
            let parser = fieldDeserializers[fieldNumber];
            if (parser == null) {
                /** @type {(undefined|!tsickle_internal_binary_fields_6.BinaryExtensionSet)} */
                const extensions = fieldDeserializers.extensions;
                if (extensions &&
                    !(0, internal_options_1.getDisableExtensionRegistryInBinaryDeserializationForTesting)()) {
                    /** @type {(!tsickle_internal_binary_fields_6.ReaderWriterPair|?|function(): ?|!Array<?>)} */
                    const binaryFieldInfo = extensions[fieldNumber];
                    if (binaryFieldInfo) {
                        // Store back in fieldParsers to save the result for a later
                        // execution.
                        /** @type {(function(!tsickle_reader_2.BinaryReader, !Array<*>, ?): boolean|function(!tsickle_reader_2.BinaryReader, !Array<*>, ?, !Array<?>, function(!Array<*>, !tsickle_reader_2.BinaryReader): boolean, (undefined|!Array<?>)=): boolean)} */
                        const parserFromExtension = makeParserFromBinaryExtension(binaryFieldInfo);
                        if (parserFromExtension != null) {
                            parser = fieldDeserializers[fieldNumber] = parserFromExtension;
                        }
                    }
                }
            }
            if (parser == null ||
                !((/** @type {function(!tsickle_reader_2.BinaryReader, !Array<*>, ?): boolean} */ (parser)))(reader, messageArray, fieldNumber)) {
                (0, internal_unknown_fields_1.addUnknownField)(messageArray, fieldNumber, reader.readUnknownField());
            }
        }
        /** @type {(undefined|!tsickle_internal_unknown_fields_10.UnknownFields)} */
        const unknownFieldSet = (0, internal_unknown_fields_1.getUnknownFields)(messageArray);
        if (unknownFieldSet) {
            unknownFieldSet.reviveUnknownFields = (0, assert_1.assertExists)(fieldDeserializers.binaryFields[internal_binary_fields_1.CACHED_UNKNOWN_BINARY_FIELDS_REVIVER]);
        }
        return true;
    }
    catch (err) {
        if (reader_1.LIMIT_RECURSION_DEPTH && err instanceof RangeError) {
            throw (0, errors_1.maxRecursionDepthExceededError)();
        }
        throw (0, assert_1.assertInstanceof)(err, Error);
    }
    finally {
        reader.popRecursion();
    }
}
exports.deserializeBinaryFromReaderGenericImpl = deserializeBinaryFromReaderGenericImpl;
/**
 * Transforms a binary extension into a parserFunction function.
 *
 * Callers must cache the result of this function and call it at most once per
 * ExtensionFieldBinaryInfo object.
 * @param {(!tsickle_internal_binary_fields_6.ReaderWriterPair|?|function(): ?|!Array<?>)} binaryFieldInfo
 * @return {(function(!tsickle_reader_2.BinaryReader, !Array<*>, ?): boolean|function(!tsickle_reader_2.BinaryReader, !Array<*>, ?, !Array<?>, function(!Array<*>, !tsickle_reader_2.BinaryReader): boolean, (undefined|!Array<?>)=): boolean)}
 */
function makeParserFromBinaryExtension(binaryFieldInfo) {
    /** @type {!Array<?>} */
    const tuple = (0, internal_binary_fields_1.getBinaryExtensionTuple)(binaryFieldInfo);
    /** @type {!tsickle_internal_binary_fields_6.ReaderWriterPair} */
    const readerWriterPair = (0, assert_1.assertInstanceof)(tuple[0], internal_binary_fields_1.ReaderWriterPair);
    /** @type {(function(!tsickle_reader_2.BinaryReader, !Array<*>, ?): boolean|function(!tsickle_reader_2.BinaryReader, !Array<*>, ?, !Array<?>, function(!Array<*>, !tsickle_reader_2.BinaryReader): boolean, (undefined|!Array<?>)=): boolean|function(!tsickle_reader_2.BinaryReader, !Array<*>, ?, (undefined|!Array<?>)=): boolean)} */
    const readerFn = readerWriterPair.$$binaryReaderFn;
    /** @type {(undefined|?|function(): ?)} */
    const binaryFields = tuple[1];
    if (binaryFields) {
        /** @type {function(!Array<*>, !tsickle_reader_2.BinaryReader): boolean} */
        const deserializeBinaryFromReader = makeDeserializeBinaryFromReaderFromBinaryFields((0, internal_binary_fields_1.assertBinaryFields)(binaryFields));
        /** @type {!Array<?>} */
        const messageMetadata = deserializersForBinaryFields((0, internal_binary_fields_1.assertBinaryFields)(binaryFields)).messageMetadata;
        return (/**
         * @param {!tsickle_reader_2.BinaryReader} reader
         * @param {!Array<*>} messageArray
         * @param {?} fieldNumber
         * @return {boolean}
         */
        (reader, messageArray, fieldNumber) => ((/** @type {function(!tsickle_reader_2.BinaryReader, !Array<*>, ?, !Array<?>, function(!Array<*>, !tsickle_reader_2.BinaryReader): boolean, (undefined|!Array<?>)=): boolean} */ (readerFn)))(reader, messageArray, fieldNumber, messageMetadata, deserializeBinaryFromReader));
    }
    // primitive extension
    return (/** @type {function(!tsickle_reader_2.BinaryReader, !Array<*>, ?): boolean} */ (readerFn));
}
/**
 * Extracts the BinaryFields from a MessageSet extension.
 *
 * MessageSet extensions always use the BinaryFields form of BinaryFieldInfo and
 * so we can optimize for that.  This function should optimize to just
 * `fieldinfo`
 * @param {(!tsickle_internal_binary_fields_6.ReaderWriterPair|?|function(): ?|!Array<?>)} fieldInfo
 * @return {?}
 */
function getBinaryFieldsFromMessageSetExtension(fieldInfo) {
    return (0, internal_binary_fields_1.assertBinaryFields)(fieldInfo);
}
