/**
 * @fileoverview Helpers for constructing Serializers from binary fields.
 *
 * DO NOT USE THIS OUTSIDE OF THIS PACKAGE.
 * Generated from: javascript/apps/jspb/internal_binary_serializers.ts
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
goog.module('google3.javascript.apps.jspb.internal_binary_serializers');
var module = module || { id: 'javascript/apps/jspb/internal_binary_serializers.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_writer_1 = goog.requireType("jspb.binary.writer");
const tsickle_internal_2 = goog.requireType("jspb.internal");
const tsickle_internal_array_state_3 = goog.requireType("jspb.internal_array_state");
const tsickle_internal_binary_fields_4 = goog.requireType("google3.javascript.apps.jspb.internal_binary_fields");
const tsickle_internal_unknown_fields_5 = goog.requireType("jspb.internal_unknown_fields");
const tsickle_bytestring_6 = goog.requireType("jspb.bytestring");
const internal_1 = goog.require('jspb.internal');
const internal_array_state_1 = goog.require('jspb.internal_array_state');
const internal_binary_fields_1 = goog.require('google3.javascript.apps.jspb.internal_binary_fields');
const internal_unknown_fields_1 = goog.require('jspb.internal_unknown_fields');
const assert_1 = goog.require('google3.javascript.typescript.contrib.assert');
/**
 * Constructs a serializers table for the given binary fields.
 * @nosideeffects
 * @param {?} binaryFields
 * @return {!tsickle_internal_binary_fields_4.Serializers}
 */
function serializersForBinaryFields(binaryFields) {
    return (0, internal_binary_fields_1.makeMessageFieldTable)(internal_binary_fields_1.CACHED_SERIALIZERS, 
    /* emptyTable= */ undefined, addSingularFieldToSerializers, addMessageFieldToSerializers, binaryFields);
}
exports.serializersForBinaryFields = serializersForBinaryFields;
/**
 * @param {!tsickle_internal_binary_fields_4.Serializers} table
 * @param {?} fieldNumber
 * @param {!tsickle_internal_binary_fields_4.ReaderWriterPair} readerWriterPair
 * @param {(undefined|!Array<?>)=} oneofGroup
 * @return {void}
 */
function addSingularFieldToSerializers(table, fieldNumber, readerWriterPair, oneofGroup) {
    table[fieldNumber] = readerWriterPair.$$binaryWriterFn;
}
/**
 * @param {!tsickle_internal_binary_fields_4.Serializers} table
 * @param {?} fieldNumber
 * @param {!tsickle_internal_binary_fields_4.ReaderWriterPair} readerWriterPair
 * @param {?} submessageBinaryFields
 * @param {(undefined|!Array<?>)=} oneofGroup
 * @return {void}
 */
function addMessageFieldToSerializers(table, fieldNumber, readerWriterPair, submessageBinaryFields, oneofGroup) {
    // Note: we simply ignore the optional oneof parameter as it is unused on the
    // write side.
    // Lazily initialize these values to avoid eagerly constructing all transitive
    // serializers.
    /** @type {(undefined|function(!Array<*>, !tsickle_writer_1.BinaryWriter): void)} */
    let serializeBinaryToWriterFn;
    /** @type {(undefined|!Array<?>)} */
    let messageMetadata;
    /** @type {function(!tsickle_writer_1.BinaryWriter, *, ?, !Array<?>, function(!Array<*>, !tsickle_writer_1.BinaryWriter): void): void} */
    const writeFn = readerWriterPair.$$binaryWriterFn;
    table[fieldNumber] = (/**
     * @param {!tsickle_writer_1.BinaryWriter} writer
     * @param {*} value
     * @param {?} fieldNumber
     * @return {void}
     */
    (writer, value, fieldNumber) => writeFn(writer, value, fieldNumber, messageMetadata ||
        (messageMetadata = serializersForBinaryFields(submessageBinaryFields).messageMetadata), serializeBinaryToWriterFn ||
        (serializeBinaryToWriterFn =
            makeSerializeBinaryToWriterFromBinaryFields(submessageBinaryFields))));
}
/**
 * Returns a function that will write a given message to a BinaryWriter.
 * @param {?} binaryFields
 * @return {function(!Array<*>, !tsickle_writer_1.BinaryWriter): void}
 */
function makeSerializeBinaryToWriterFromBinaryFields(binaryFields) {
    /** @type {(undefined|function(!Array<*>, !tsickle_writer_1.BinaryWriter): void)} */
    let writerFn = binaryFields[internal_binary_fields_1.CACHED_SERIALIZE_BINARY_TO_WRITER];
    if (!writerFn) {
        /** @type {!tsickle_internal_binary_fields_4.Serializers} */
        const binarySerializers = serializersForBinaryFields(binaryFields);
        writerFn = (/**
         * @param {!Array<*>} messageArray
         * @param {!tsickle_writer_1.BinaryWriter} writer
         * @return {void}
         */
        (messageArray, writer) => serializeBinaryToWriterGenericImpl(messageArray, writer, binarySerializers));
        binaryFields[internal_binary_fields_1.CACHED_SERIALIZE_BINARY_TO_WRITER] = writerFn;
    }
    return writerFn;
}
/**
 * Serializes a message to a BinaryWriter.
 * @param {!Array<*>} messageArray
 * @param {!tsickle_writer_1.BinaryWriter} writer
 * @param {!tsickle_internal_binary_fields_4.Serializers} serializers
 * @return {void}
 */
function serializeBinaryToWriterGenericImpl(messageArray, writer, serializers) {
    // TODO(b/212312033): Consider iterating the array in a different order, at
    // least in debug mode. This would help flag issues related to applications
    // relying on 'canonical encoding'.  See go/proto-serialization-not-canonical
    /** @type {number} */
    const arrayState = (0, internal_array_state_1.getArrayState)(messageArray);
    (0, internal_1.iterateFields)(messageArray, arrayState, (/**
     * @param {number} fieldNumber
     * @param {*} item
     * @return {void}
     */
    (fieldNumber, item) => {
        if (item == null)
            return;
        /** @type {(undefined|function(!tsickle_writer_1.BinaryWriter, *, ?): void|function(!tsickle_writer_1.BinaryWriter, *, ?, !Array<?>, function(!Array<*>, !tsickle_writer_1.BinaryWriter): void): void)} */
        const writerFn = getWriterFn(serializers, (/** @type {?} */ (fieldNumber)));
        if (!writerFn) {
            (0, internal_unknown_fields_1.recordUnknownFieldDroppedInSerializeBinary)(messageArray, fieldNumber);
            return; // an unknown field
        }
        ((/** @type {function(!tsickle_writer_1.BinaryWriter, *, ?): void} */ (writerFn)))(writer, item, (/** @type {?} */ (fieldNumber)));
    }));
    /** @type {(undefined|!tsickle_internal_unknown_fields_5.UnknownFields)} */
    const unknownFields = (0, internal_unknown_fields_1.getUnknownFields)(messageArray);
    if (unknownFields) {
        unknownFields.forEachUnknownField((/**
         * @param {!tsickle_internal_unknown_fields_5.UnknownFields} fieldSet
         * @param {number} fieldNumber
         * @param {!Array<!tsickle_bytestring_6.ByteString>} fieldEntries
         * @return {void}
         */
        (fieldSet, fieldNumber, fieldEntries) => {
            writer.writeUnknownFields(fieldEntries);
        }));
    }
}
exports.serializeBinaryToWriterGenericImpl = serializeBinaryToWriterGenericImpl;
/**
 * @param {!tsickle_internal_binary_fields_4.Serializers} serializers
 * @param {?} fieldNumber
 * @return {(undefined|function(!tsickle_writer_1.BinaryWriter, *, ?): void|function(!tsickle_writer_1.BinaryWriter, *, ?, !Array<?>, function(!Array<*>, !tsickle_writer_1.BinaryWriter): void): void)}
 */
function getWriterFn(serializers, fieldNumber) {
    /** @type {(function(!tsickle_writer_1.BinaryWriter, *, ?): void|function(!tsickle_writer_1.BinaryWriter, *, ?, !Array<?>, function(!Array<*>, !tsickle_writer_1.BinaryWriter): void): void)} */
    let writerFn = serializers[fieldNumber];
    if (writerFn)
        return writerFn;
    /** @type {(undefined|!tsickle_internal_binary_fields_4.BinaryExtensionSet)} */
    const extensions = serializers.extensions;
    if (!extensions)
        return undefined;
    /** @type {(!tsickle_internal_binary_fields_4.ReaderWriterPair|?|function(): ?|!Array<?>)} */
    const binaryFieldInfo = extensions[fieldNumber];
    if (!binaryFieldInfo)
        return undefined;
    /** @type {!Array<?>} */
    const tuple = (0, internal_binary_fields_1.getBinaryExtensionTuple)(binaryFieldInfo);
    /** @type {!tsickle_internal_binary_fields_4.ReaderWriterPair} */
    const readerWriterPair = (0, assert_1.assertInstanceof)(tuple[0], internal_binary_fields_1.ReaderWriterPair);
    /** @type {(function(!tsickle_writer_1.BinaryWriter, *, ?): void|function(!tsickle_writer_1.BinaryWriter, *, ?, !Array<?>, function(!Array<*>, !tsickle_writer_1.BinaryWriter): void): void)} */
    const baseWriterFn = readerWriterPair.$$binaryWriterFn;
    /** @type {(undefined|?|function(): ?)} */
    let binaryFields = tuple[1];
    if (binaryFields) {
        // message valued extension
        binaryFields = (0, internal_binary_fields_1.assertBinaryFields)(binaryFields);
        /** @type {function(!Array<*>, !tsickle_writer_1.BinaryWriter): void} */
        const writerCallback = makeSerializeBinaryToWriterFromBinaryFields(binaryFields);
        /** @type {!Array<?>} */
        const messageMetadata = serializersForBinaryFields(binaryFields).messageMetadata;
        // If the parent is a message_set_wireformat message we need to call
        // makeMessageSetExtensionWriterFn but we access it
        // indirectly through the serializers to avoid a static dependency.
        if (serializers.isMessageSet) {
            writerFn = (0, internal_binary_fields_1.getMakeMessageSetExtensionWriterFn)()(messageMetadata, writerCallback);
        }
        else {
            writerFn = (/**
             * @param {!tsickle_writer_1.BinaryWriter} w
             * @param {*} value
             * @param {?} fieldNumber
             * @return {void}
             */
            (w, value, fieldNumber) => baseWriterFn(w, value, fieldNumber, messageMetadata, writerCallback));
        }
    }
    else {
        // primitive extension
        writerFn = baseWriterFn;
    }
    return (serializers[fieldNumber] = writerFn);
}
