/**
 * @fileoverview Utilities to parse binary fields objects.
 *
 * DO NOT USE THIS OUTSIDE OF THIS PACKAGE.
 * Generated from: javascript/apps/jspb/internal_binary_fields.ts
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
// tslint:disable:gbigint-usage
goog.module('google3.javascript.apps.jspb.internal_binary_fields');
var module = module || { id: 'javascript/apps/jspb/internal_binary_fields.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_binary_constants_1 = goog.requireType("jspb.BinaryConstants");
const tsickle_reader_2 = goog.requireType("jspb.binary.reader");
const tsickle_writer_3 = goog.requireType("jspb.binary.writer");
const tsickle_bytestring_4 = goog.requireType("jspb.bytestring");
const tsickle_internal_5 = goog.requireType("jspb.internal");
const tsickle_internal_binary_type_tokens_6 = goog.requireType("google3.javascript.apps.jspb.internal_binary_type_tokens");
const tsickle_internal_construct_7 = goog.requireType("jspb.internal_construct");
const tsickle_internal_jspb_adapters_8 = goog.requireType("jspb_internal_adapters");
const tsickle_internal_map_9 = goog.requireType("jspb.internal_map");
const tsickle_message_10 = goog.requireType("jspb");
const tsickle_mutable_message_11 = goog.requireType("jspb.mutable_message");
const tsickle_constructors_12 = goog.requireType("google3.javascript.apps.jspb.types.constructors");
const binary_constants_1 = goog.require('jspb.BinaryConstants');
const internal_1 = goog.require('jspb.internal');
const typeTokens = goog.require('google3.javascript.apps.jspb.internal_binary_type_tokens');
const internal_construct_1 = goog.require('jspb.internal_construct');
const internal_jspb_adapters_1 = goog.require('jspb_internal_adapters');
const message_1 = goog.require('jspb');
const assert_1 = goog.require('google3.javascript.typescript.contrib.assert');
/**
 * @template T
 * @param {!tsickle_internal_binary_type_tokens_6.OpaqueTypeToken<T>} value
 * @param {(undefined|!tsickle_internal_binary_type_tokens_6.OpaqueTypeToken<T>)} typeToken
 * @return {boolean}
 */
function weakEqualsTypeToken(value, typeToken) {
    return !!typeToken && value === typeToken;
}
/**
 * Binary field [de]serialization references.
 */
class ReaderWriterPair {
    /**
     * @public
     * @param {(function(!tsickle_reader_2.BinaryReader, !Array<*>, ?): boolean|function(!tsickle_reader_2.BinaryReader, !Array<*>, ?, (undefined|!Array<?>)=): boolean|function(!tsickle_reader_2.BinaryReader, !Array<*>, ?, !Array<?>, function(!Array<*>, !tsickle_reader_2.BinaryReader): boolean, (undefined|!Array<?>)=): boolean)} $$binaryReaderFn
     * @param {(function(!tsickle_writer_3.BinaryWriter, *, ?, !Array<?>, function(!Array<*>, !tsickle_writer_3.BinaryWriter): void): void|function(!tsickle_writer_3.BinaryWriter, *, ?): void)} $$binaryWriterFn
     * @param {(boolean|!tsickle_internal_binary_type_tokens_6.OpaqueTypeToken<string>)} $$isRepeated
     * @param {!tsickle_internal_binary_type_tokens_6.OpaqueTypeToken<string>} $$valueType
     */
    constructor($$binaryReaderFn, $$binaryWriterFn, $$isRepeated, $$valueType) {
        this.$$binaryReaderFn = $$binaryReaderFn;
        this.$$binaryWriterFn = $$binaryWriterFn;
        this.$$isRepeated = $$isRepeated;
        this.$$valueType = $$valueType;
        this.$$isMsg =
            weakEqualsTypeToken($$valueType, goog.weakUsage(typeTokens.MESSAGE)) ||
                weakEqualsTypeToken($$valueType, goog.weakUsage(typeTokens.GROUP));
    }
}
exports.ReaderWriterPair = ReaderWriterPair;
/* istanbul ignore if */
if (false) {
    /**
     * @const {boolean}
     * @public
     */
    ReaderWriterPair.prototype.$$isMsg;
    /**
     * @const {(function(!tsickle_reader_2.BinaryReader, !Array<*>, ?): boolean|function(!tsickle_reader_2.BinaryReader, !Array<*>, ?, (undefined|!Array<?>)=): boolean|function(!tsickle_reader_2.BinaryReader, !Array<*>, ?, !Array<?>, function(!Array<*>, !tsickle_reader_2.BinaryReader): boolean, (undefined|!Array<?>)=): boolean)}
     * @public
     */
    ReaderWriterPair.prototype.$$binaryReaderFn;
    /**
     * @const {(function(!tsickle_writer_3.BinaryWriter, *, ?, !Array<?>, function(!Array<*>, !tsickle_writer_3.BinaryWriter): void): void|function(!tsickle_writer_3.BinaryWriter, *, ?): void)}
     * @public
     */
    ReaderWriterPair.prototype.$$binaryWriterFn;
    /**
     * @const {(boolean|!tsickle_internal_binary_type_tokens_6.OpaqueTypeToken<string>)}
     * @public
     */
    ReaderWriterPair.prototype.$$isRepeated;
    /**
     * @const {!tsickle_internal_binary_type_tokens_6.OpaqueTypeToken<string>}
     * @public
     */
    ReaderWriterPair.prototype.$$valueType;
}
/**
 * Constructs a RW pair for a message type.
 * @nosideeffects
 * @param {!Function} reader
 * @param {!Function} writer
 * @param {!tsickle_internal_binary_type_tokens_6.OpaqueTypeToken<string>=} typeToken
 * @return {!ReaderWriterPair}
 */
function makeMsgRWPair(reader, writer, typeToken = typeTokens.MESSAGE) {
    return new ReaderWriterPair((/** @type {function(!tsickle_reader_2.BinaryReader, !Array<*>, ?): boolean} */ ((/** @type {*} */ (reader)))), (/** @type {function(!tsickle_writer_3.BinaryWriter, *, ?): void} */ ((/** @type {*} */ (writer)))), 
    /* isRepeated = */ false, typeToken);
}
exports.makeMsgRWPair = makeMsgRWPair;
/**
 * @param {!tsickle_reader_2.BinaryReader} r
 * @param {!Array<*>} m
 * @param {number} fn
 * @param {!Array<?>} mm
 * @param {function(!Array<*>, !tsickle_reader_2.BinaryReader): void} mr
 * @return {boolean}
 */
function readMessage(r, m, fn, mm, mr) {
    if (r.getWireType() !== binary_constants_1.WireType.DELIMITED) {
        return false;
    }
    r.readMessage((0, internal_jspb_adapters_1.getMutableWrapperArrayForBinary)(m, (/** @type {function(new:tsickle_internal_construct_7.module$contents$jspb$internal_construct_Opaque)} */ ((/** @type {*} */ (mm)))), fn), mr);
    return true;
}
/**
 * @param {!tsickle_reader_2.BinaryReader} r
 * @param {!Array<*>} m
 * @param {number} fn
 * @param {!Array<?>} mm
 * @param {function(!Array<*>, !tsickle_reader_2.BinaryReader): void} mr
 * @return {boolean}
 */
function readMessageExt(r, m, fn, mm, mr) {
    if (r.getWireType() !== binary_constants_1.WireType.DELIMITED) {
        return false;
    }
    r.readMessage((0, internal_jspb_adapters_1.getMutableWrapperArrayForBinary)(m, (/** @type {function(new:tsickle_internal_construct_7.module$contents$jspb$internal_construct_Opaque)} */ ((/** @type {*} */ (mm)))), fn), mr);
    return true;
}
/**
 * @param {!tsickle_writer_3.BinaryWriter} w
 * @param {*} v
 * @param {number} fn
 * @param {function(new:tsickle_internal_construct_7.module$contents$jspb$internal_construct_Opaque)} mm
 * @param {function(!Array<*>, !tsickle_writer_3.BinaryWriter): void} wc
 * @return {void}
 */
function writeMessage(w, v, fn, mm, wc) {
    w.writeMessage(fn, asMessageArray(v, mm), wc);
}
/** @type {!ReaderWriterPair} */
const rwMessage = /** @pureOrBreakMyCode */ makeMsgRWPair(readMessage, writeMessage);
/** @type {!ReaderWriterPair} */
const rwMessageExt = /** @pureOrBreakMyCode */ makeMsgRWPair(readMessageExt, writeMessage);
/**
 * The number of a field.
 * @typedef {?}
 */
exports.FieldNumber;
/**
 * The suggested pivot in our message metadata.
 * @typedef {?}
 */
var SuggestedPivot;
/**
 * The message_id of a type.
 * @typedef {?}
 */
var MessageId;
/**
 * Whether a field is a map.
 * @typedef {?}
 */
var IsMap;
/** @typedef {*} */
var RawMessageMeta;
/**
 * MessageMeta as interpreted by internal_construct.js.
 *
 * These arrays may have either two or three elements, which are:
 *
 * [
 *    suggested pivot (number, usually zero),
 *    message_id (string, usually undefined),
 *    is_map (boolean, true iff present)
 * ]
 * @typedef {!Array<?>}
 */
exports.MessageMeta;
/**
 * Attempt to parse message metadata.
 * @param {*} messageMeta
 * @return {(undefined|!Array<?>)}
 */
function tryParseMessageMeta(messageMeta) {
    return (/** @type {(undefined|!Array<?>)} */ ((0, internal_construct_1.tryParseMessageMeta)(messageMeta)));
}
exports.tryParseMessageMeta = tryParseMessageMeta;
/**
 * A MessageSet deserializer.
 * @typedef {function(!Array<*>, !tsickle_reader_2.BinaryReader, !Deserializers): boolean}
 */
var DeserializeBinaryMessageSetFunction;
/**
 * A MessageSet serializer.
 * @typedef {function(!Array<?>, function(!Array<*>, !tsickle_writer_3.BinaryWriter): void): function(!tsickle_writer_3.BinaryWriter, *, ?): void}
 */
var MakeMessageSetExtensionWriterFn;
/**
 * The possible values in our comparison type info mapping.
 * @typedef {(undefined|null|!tsickle_internal_5.ComparisonTypeInfo|?)}
 */
exports.BinaryComparisonTypeInfoValue;
/**
 * Binary deserializers
 * @record
 * @extends {MessageFieldTable}
 */
function Deserializers() { }
exports.Deserializers = Deserializers;
/**
 * Binary serializers.
 * @record
 * @extends {MessageFieldTable}
 */
function Serializers() { }
exports.Serializers = Serializers;
/**
 * Serializers cached on binary fields.
 * @type {symbol}
 */
exports.CACHED_SERIALIZERS = 
/** @pureOrBreakMyCode */ Symbol();
/**
 * Deserializers cached on binary fields.
 * @type {symbol}
 */
exports.CACHED_DESERIALIZERS = 
/** @pureOrBreakMyCode */ Symbol();
/**
 * deserializeBinaryFromReader functions cached on binary fields.
 * @type {symbol}
 */
exports.CACHED_DESERIALIZE_BINARY_FROM_READER = 
/** @pureOrBreakMyCode */ Symbol();
/**
 * serializeBinaryToReader functions cached on binary fields.
 * @type {symbol}
 */
exports.CACHED_SERIALIZE_BINARY_TO_WRITER = 
/** @pureOrBreakMyCode */ Symbol();
/**
 * ComparisonTypeInfo cached on binary fields.
 * @type {symbol}
 */
exports.CACHED_COMPARISON_TYPE_INFO = 
/** @pureOrBreakMyCode */ Symbol();
/**
 * TypeInfoTable cached on binary fields.
 * @type {symbol}
 */
exports.CACHED_TYPE_INFO = Symbol();
/**
 * Cached unknown binary fields reviver.
 * @type {symbol}
 */
exports.CACHED_UNKNOWN_BINARY_FIELDS_REVIVER = Symbol();
/**
 * @record
 */
function BinaryFieldsCachedValues() { }
/* istanbul ignore if */
if (false) {
    /* Skipping unnamed member:
    [CACHED_SERIALIZERS]?: Serializers;*/
    /* Skipping unnamed member:
    [CACHED_DESERIALIZERS]?: Deserializers;*/
    /* Skipping unnamed member:
    [CACHED_DESERIALIZE_BINARY_FROM_READER]?: DeserializeBinaryFromReaderFn;*/
    /* Skipping unnamed member:
    [CACHED_SERIALIZE_BINARY_TO_WRITER]?: SerializeBinaryToWriterFn;*/
    /* Skipping unnamed member:
    [CACHED_COMPARISON_TYPE_INFO]?: MessageFieldTable<BinaryComparisonTypeInfoValue>;*/
    /* Skipping unnamed member:
    [CACHED_TYPE_INFO]?: TypeInfoTable;*/
    /* Skipping unnamed member:
    [CACHED_UNKNOWN_BINARY_FIELDS_REVIVER]?: UnknownBinaryFieldsReviverFn;*/
}
/**
 * An array of binary field definitions.
 *
 * - a number/string/array in position 0 from which we can derive a MessageMeta
 * value, see `tryParseMessageMeta`
 * - an optional extensions object  (in position 1, if present)
 * - two optional functions representing the deserializeBinaryMessageSet and
 *   makeMessageSetExtensionWriterFn, in positions 2 and 3 only optionally if
 *   extensions are present
 * - an arbitrary number of `oneof group` definitions.
 *   These are arrays of numbers >0 and so can be easily distinguished from
 *   messages
 * - an arbitrary number of 'field' declarations
 *    - a field starts with an optional `number` representing a field offset
 *      from the previous field, less the implied offset of 1
 *    - then there is either a ReaderWriterPair or a BinaryFields object
 *    - then an optional negative number representing how many times to repeat
 *      this field
 *
 * @typedef {?}
 */
exports.BinaryFields;
/** @typedef {function(): ?} */
var BinaryFieldsSupplier;
/**
 * Represents a oneof group as an array of field numbers.
 * @typedef {!Array<?>}
 */
exports.OneofGroup;
/**
 * An offset between field numbers.
 * @typedef {number}
 */
var FieldNumberOffset;
/**
 * The number of times a field is repeated.
 * @typedef {number}
 */
var RepeatCount;
/**
 * A field entry in a BinaryFields object.
 * @typedef {!Array<?>}
 */
var FieldEntry;
/**
 * An opaque type representing BinaryFields for a submessage.
 *
 * TypeScript allows us to define arbitrarily recursive types for objects
 * but not for arrays. As a result, we need to break the recursion with a hole.
 * @abstract
 */
class OpaqueSubmessageBinaryFields {
    /**
     * @public
     */
    constructor() {
        throw new Error('uninstantiable');
    }
    /**
     * @public
     * @param {!OpaqueSubmessageBinaryFields} fields
     * @return {(function(): ?|?)}
     */
    static asBinaryFields(fields) {
        return (/** @type {(function(): ?|?)} */ ((/** @type {*} */ (fields))));
    }
}
/**
 * An unknown number of field entries.
 *
 * TS cannot write interleaved array types so we simply enumerate up to 5
 * fields. That should be good enough to ensure our logic iterates correctly.
 * @typedef {!Array<?>}
 */
var FieldEntries;
/**
 * A function that writes a field to a BinaryWriter.
 * @typedef {function(!tsickle_writer_3.BinaryWriter, *, ?): void}
 */
exports.WriterFn;
/**
 * A function for writing a submessage binary field.
 * @typedef {function(!tsickle_writer_3.BinaryWriter, *, ?, !Array<?>, function(!Array<*>, !tsickle_writer_3.BinaryWriter): void): void}
 */
exports.SubmessageWriterFn;
/**
 * A function for serializing a message to a BinaryWriter.
 * @typedef {function(!Array<*>, !tsickle_writer_3.BinaryWriter): void}
 */
exports.SerializeBinaryToWriterFn;
/**
 * A function for reading a single binary field.
 * @typedef {function(!tsickle_reader_2.BinaryReader, !Array<*>, ?): boolean}
 */
exports.ReaderFn;
/**
 * A function for reading a single submessage field.
 * @typedef {function(!tsickle_reader_2.BinaryReader, !Array<*>, ?, !Array<?>, function(!Array<*>, !tsickle_reader_2.BinaryReader): boolean, (undefined|!Array<?>)=): boolean}
 */
exports.SubmessageReaderFn;
/**
 * A function constructing a message from a BinaryReader.
 * @typedef {function(!Array<*>, !tsickle_reader_2.BinaryReader): boolean}
 */
exports.DeserializeBinaryFromReaderFn;
/**
 * A function for reading a single binary field.
 * @typedef {function(!tsickle_reader_2.BinaryReader, !Array<*>, ?, (undefined|!Array<?>)=): boolean}
 */
exports.ReaderFnWithOneofGroup;
/**
 * Stores binary-related information for a single extension field.
 *
 * This is either a ReaderWriterPair, a tuple of a ReaderWriterPair and a
 * BinaryFieldsObject or a single BinaryFields object.
 *
 * `instanceof` can distinguish the first case and the latter case can be
 * distinguished if the array starts with a ReaderWriterPair or not.
 * @typedef {(function(): ?|!ReaderWriterPair|!Array<?>|?)}
 */
exports.ExtensionFieldBinaryInfo;
/**
 * A set of binary extensions.
 * @record
 */
function BinaryExtensionSet() { }
exports.BinaryExtensionSet = BinaryExtensionSet;
/**
 * A mapping from field number to a certain value type for a message. The value
 * type may be, for example, a binary serializer or deserializer.
 * @record
 * @template V
 */
function MessageFieldTable() { }
exports.MessageFieldTable = MessageFieldTable;
/* istanbul ignore if */
if (false) {
    /**
     * A mapping from extension number to extension info.
     *
     * Note that this is not eagerly parsed into T because extensions may be
     * loaded after the fields are initially processed.
     * @type {(undefined|!BinaryExtensionSet)}
     * @public
     */
    MessageFieldTable.prototype.extensions;
    /**
     * Metadata concerning this message.
     *
     * This is needed for message construction and should not be inspected.
     * @type {!Array<?>}
     * @public
     */
    MessageFieldTable.prototype.messageMetadata;
    /**
     * If set, this is a MessageSet.
     * @type {(undefined|boolean)}
     * @public
     */
    MessageFieldTable.prototype.isMessageSet;
    /**
     * A reference to the binary fields that this table was constructed from.
     * @type {?}
     * @public
     */
    MessageFieldTable.prototype.binaryFields;
    /* Skipping unhandled member: [k: FieldNumber]: V;*/
}
/**
 * Type information about a field, for use by multiformat serializers.
 * @record
 */
function FieldTypeInfo() { }
exports.FieldTypeInfo = FieldTypeInfo;
/* istanbul ignore if */
if (false) {
    /**
     * The singular type of this field.
     * @type {!tsickle_internal_binary_type_tokens_6.OpaqueTypeToken<string>}
     * @public
     */
    FieldTypeInfo.prototype.typeToken;
    /**
     * Whether this field is repeated.
     * @type {(boolean|!tsickle_internal_binary_type_tokens_6.OpaqueTypeToken<string>)}
     * @public
     */
    FieldTypeInfo.prototype.isRepeated;
    /**
     * Whether this field is a map.
     * @type {(boolean|!tsickle_internal_binary_type_tokens_6.OpaqueTypeToken<string>)}
     * @public
     */
    FieldTypeInfo.prototype.isMap;
    /**
     * If this field is in a oneof group, the group members.
     * @type {(undefined|!Array<?>)}
     * @public
     */
    FieldTypeInfo.prototype.oneofGroup;
}
/**
 * Type information about a field, for use by multiformat serializers.
 * @record
 * @extends {FieldTypeInfo}
 */
function SubmessageFieldTypeInfo() { }
exports.SubmessageFieldTypeInfo = SubmessageFieldTypeInfo;
/* istanbul ignore if */
if (false) {
    /**
     * The singular type of this field.
     * @type {!tsickle_internal_binary_type_tokens_6.OpaqueTypeToken<string>}
     * @public
     */
    SubmessageFieldTypeInfo.prototype.typeToken;
    /**
     * If this is a message field, a table for the fields of that message.
     * @public
     * @return {!TypeInfoTable}
     */
    SubmessageFieldTypeInfo.prototype.getSubmessageTypeInfo = function () { };
}
/**
 * Structured type information about a type.
 * @record
 * @extends {MessageFieldTable}
 */
function TypeInfoTable() { }
exports.TypeInfoTable = TypeInfoTable;
/* istanbul ignore if */
if (false) {
    /**
     * @type {(undefined|!tsickle_constructors_12.MessageConstructor<!tsickle_mutable_message_11.MutableMessage<?>>)}
     * @public
     */
    TypeInfoTable.prototype.messageType;
    /**
     * @type {(undefined|*)}
     * @public
     */
    TypeInfoTable.prototype.extensionTypeInfos;
}
/**
 * Cached reference to the message set deserializer.
 *
 * Written here to break a cyle.
 * @type {(undefined|function(!Array<*>, !tsickle_reader_2.BinaryReader, !Deserializers): boolean)}
 */
let deserializeBinaryMessageSetFn;
/**
 * Returns a cached reference to the message set deserializer.
 * @return {function(!Array<*>, !tsickle_reader_2.BinaryReader, !Deserializers): boolean}
 */
function getDeserializeBinaryMessageSet() {
    return (0, assert_1.assert)(deserializeBinaryMessageSetFn);
}
exports.getDeserializeBinaryMessageSet = getDeserializeBinaryMessageSet;
/**
 * Cached reference to the messageset extension writer.
 *
 * Written here to break a cyle.
 * @type {(undefined|function(!Array<?>, function(!Array<*>, !tsickle_writer_3.BinaryWriter): void): function(!tsickle_writer_3.BinaryWriter, *, ?): void)}
 */
let makeMessageSetExtensionWriterFn;
/**
 * Returns a cached reference to the messageset extension writer.
 * @return {function(!Array<?>, function(!Array<*>, !tsickle_writer_3.BinaryWriter): void): function(!tsickle_writer_3.BinaryWriter, *, ?): void}
 */
function getMakeMessageSetExtensionWriterFn() {
    return (0, assert_1.assert)(makeMessageSetExtensionWriterFn);
}
exports.getMakeMessageSetExtensionWriterFn = getMakeMessageSetExtensionWriterFn;
/**
 * Constructs a MessageFieldTable subtype.
 * @typedef {function(?): ?}
 */
exports.MessageFieldTableFactory;
/**
 * Behavior for merging revived unknown fields into a message.
 * @enum {number}
 */
const UnknownBinaryFieldRevivalResolutionBehavior = {
    /**
     * Throws if we find a value set in our message. This is the default.
     */
    FAIL_IF_EXISTING: 0,
    /**
     * Drops unknown fields if we find a value set in our message.
     */
    IGNORE_IF_EXISTING: 1,
};
exports.UnknownBinaryFieldRevivalResolutionBehavior = UnknownBinaryFieldRevivalResolutionBehavior;
UnknownBinaryFieldRevivalResolutionBehavior[UnknownBinaryFieldRevivalResolutionBehavior.FAIL_IF_EXISTING] = 'FAIL_IF_EXISTING';
UnknownBinaryFieldRevivalResolutionBehavior[UnknownBinaryFieldRevivalResolutionBehavior.IGNORE_IF_EXISTING] = 'IGNORE_IF_EXISTING';
/**
 * Options for reviving unknown binary fields.
 * @record
 */
function UnknownBinaryFieldsRevivalOptions() { }
exports.UnknownBinaryFieldsRevivalOptions = UnknownBinaryFieldsRevivalOptions;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!UnknownBinaryFieldRevivalResolutionBehavior}
     * @public
     */
    UnknownBinaryFieldsRevivalOptions.prototype.resolutionBehavior;
    /**
     * @type {(undefined|boolean)}
     * @public
     */
    UnknownBinaryFieldsRevivalOptions.prototype.reviveIntoImmutable;
}
/**
 * A function for reviving unknown binary fields.
 * @typedef {function(!Array<*>, (undefined|number)=, (undefined|!UnknownBinaryFieldsRevivalOptions)=, (undefined|function(!Array<*>, ?, !Array<!tsickle_bytestring_4.ByteString>): void)=): void}
 */
exports.UnknownBinaryFieldsReviverFn;
/**
 * A function to call when an unknown field could not be revived.
 * @typedef {function(!Array<*>, ?, !Array<!tsickle_bytestring_4.ByteString>): void}
 */
exports.UnrevivedFieldCallbackFn;
/**
 * A helper for 'parsing' the binary fields data.
 *
 * The BinaryFields is an Array in the form:
 * - a number/string/array in position 0 from which we can derive a MessageMeta
 * value, see `tryParseMessageMeta`
 * - an optional extensions object  (in position 1, if present)
 * - two optional functions representing the deserializeBinaryMessageSet and
 *   makeMessageSetExtensionWriterFn, in positions 2 and 3 only optionally if
 *   extensions are present
 * - an arbitrary number of `oneof group` definitions.
 *   These are arrays of numbers >0 and so can be easily distinguished from
 *   messages
 * - an arbitrary number of 'field' declarations
 *    - a field starts with an optional `number` representing a field offset
 *      from the previous field, less the implied offset of 1
 *    - then there is either a ReaderWriterPair or a BinaryFields object
 *    - then an optional negative number representing how many times to repeat
 *      this field
 *
 * This function decomposes all the cases based on the array structure and
 * invokes one of the callbacks for every type of field.
 *
 * @nosideeffects
 * @template T, S
 * @param {S} cacheKey
 * @param {(undefined|function(): T)} emptyTable
 * @param {function(T, ?, !ReaderWriterPair, (undefined|!Array<?>)=): void} addPrimitiveField
 * @param {function(T, ?, !ReaderWriterPair, ?, (undefined|!Array<?>)=): void} addMessageField
 * @param {?} binaryFields
 * @return {T}
 */
function makeMessageFieldTable(cacheKey, emptyTable, addPrimitiveField, addMessageField, binaryFields) {
    /** @type {(undefined|T)} */
    const cached = (/** @type {(undefined|T)} */ (binaryFields[cacheKey]));
    if (cached)
        return cached;
    /** @type {T} */
    const table = emptyTable ? emptyTable() : ((/** @type {T} */ ((/** @type {*} */ ({})))));
    table.binaryFields = binaryFields;
    table.messageMetadata = (0, assert_1.assert)(tryParseMessageMeta(binaryFields[0]));
    /** @type {*} */
    let cur = binaryFields[1];
    /** @type {number} */
    let i = 1;
    // Extensions, if they exist, come first.
    if (cur && cur.constructor === Object) {
        table.extensions = (/** @type {!BinaryExtensionSet} */ (cur));
        // If this is a messageSet message, then the next two items will
        // be functions.
        cur = binaryFields[++i];
        if (typeof cur === 'function') {
            // Message set extensions are always implemented by the same functions.
            if (assert_1.ENABLE_ASSERTS && deserializeBinaryMessageSetFn != null) {
                (0, assert_1.assert)(deserializeBinaryMessageSetFn === cur);
                (0, assert_1.assert)(makeMessageSetExtensionWriterFn === binaryFields[1 + i]);
            }
            table.isMessageSet = true;
            deserializeBinaryMessageSetFn ??=
                (/** @type {function(!Array<*>, !tsickle_reader_2.BinaryReader, !Deserializers): boolean} */ (cur));
            makeMessageSetExtensionWriterFn ??= (/** @type {function(!Array<?>, function(!Array<*>, !tsickle_writer_3.BinaryWriter): void): function(!tsickle_writer_3.BinaryWriter, *, ?): void} */ ((0, assert_1.assertFunction)(binaryFields[i + 1])));
            cur = binaryFields[(i += 2)];
        }
    }
    // Following that, there are an arbitrary number of oneof groups
    // Consume all oneof arrays and index them by field number, so that each field
    // number maps to its oneof array group
    /** @type {*} */
    const oneofIndex = {};
    // There are an arbitrary number of oneof groups at the beginning
    // An array is a oneof group if it starts with an integer that is >0
    while (cur && isOneofArray(cur)) {
        for (let j = 0; j < (/** @type {!Array<?>} */ (cur)).length; j++) {
            oneofIndex[cur[j]] = cur;
        }
        cur = binaryFields[++i];
    }
    /** @type {number} */
    let field = 1;
    while (cur !== undefined) {
        // we start with an optional field number offset
        if (typeof cur === 'number') {
            (0, assert_1.assert)(cur > 0);
            field += cur;
            cur = binaryFields[++i];
        }
        // 2 options for the next member
        // 1. a BinaryFields object -> a singular message field
        // 2. a ReaderWriterPair
        /** @type {?} */
        let readerWriter;
        /** @type {?} */
        let binaryFieldsObject;
        if (!(cur instanceof ReaderWriterPair)) {
            readerWriter = rwMessage;
            i--; // back up so we can re-read the field below
        }
        else {
            readerWriter = cur;
        }
        // Do we expect a binary fields object for this ReaderWriterPair?
        if (readerWriter?.$$isMsg) {
            cur = binaryFields[++i];
            binaryFieldsObject = valueAsBinaryFields(binaryFields, i, (/** @type {(function(): ?|?)} */ (cur)));
        }
        cur = binaryFields[++i];
        // If the next item is a number it is either a field number offset for the
        // next field or a number of repeats for this field.
        // Repeats are represented as negative numbers so we can distinguish based
        // on 'sign'
        /** @type {number} */
        let end = field + 1;
        if (typeof cur === 'number' && cur < 0) {
            end -= cur;
            cur = binaryFields[++i];
        }
        for (; field < end; field++) {
            /** @type {!Array<?>} */
            const oneof = oneofIndex[(/** @type {?} */ (field))];
            if (binaryFieldsObject) {
                addMessageField(table, (/** @type {?} */ (field)), (0, assert_1.assert)(readerWriter), binaryFieldsObject, oneof);
            }
            else {
                addPrimitiveField(table, (/** @type {?} */ (field)), (0, assert_1.assert)(readerWriter), oneof);
            }
        }
    }
    return (binaryFields[cacheKey] = table);
}
exports.makeMessageFieldTable = makeMessageFieldTable;
/**
 * @param {*} v
 * @return {boolean}
 */
function isOneofArray(v) {
    return Array.isArray(v) && !!(/** @type {!Array<?>} */ (v)).length && typeof v[0] === 'number' && v[0] > 0;
}
/**
 * Returns the value as a BinaryFields array handling the case where it is
 * represented as a supplier function.
 * @param {?} parent
 * @param {number} index
 * @param {(function(): ?|?)} value
 * @return {?}
 */
function valueAsBinaryFields(parent, index, value) {
    // A 'binary fields' object may be occasionally stored as a function in order
    // to resolve cycles between protos.  If so we expect it to be a function with
    // no parameters.
    if (typeof value === 'function') {
        (0, assert_1.assert)((/** @type {function(): ?} */ (value)).length === 0);
        value = value();
        // Store the evaluated value back, should save a small amount of work if we
        // ever needs to read this value again and it also allows the function
        // object to be gc'd.
        parent[index] = value;
    }
    assertBinaryFields(value);
    return value;
}
/**
 * \@closurePrimitive {asserts.matchesReturn}
 * @param {*} value
 * @return {(undefined|?)}
 */
function assertBinaryFieldsOrUndefined(value) {
    if (assert_1.ENABLE_ASSERTS) {
        value === undefined || assertBinaryFields(value);
    }
    return (/** @type {(undefined|?)} */ (value));
}
exports.assertBinaryFieldsOrUndefined = assertBinaryFieldsOrUndefined;
/**
 * \@closurePrimitive {asserts.matchesReturn}
 * @param {*} value
 * @return {?}
 */
function assertBinaryFields(value) {
    // Some products don't enable the Closure Asserts processing pass so guard
    // this specifically.
    if (assert_1.ENABLE_ASSERTS)
        (0, assert_1.assert)(isMessageBinaryFieldsArray(value));
    return (/** @type {?} */ (value));
}
exports.assertBinaryFields = assertBinaryFields;
/**
 * Returns whether or not this is a message meta value.
 *
 * See `GenerateClassBinaryFields` in
 * net/proto2/compiler/js/internal/generator.cc
 * @param {*} array
 * @return {boolean}
 */
function isMessageBinaryFieldsArray(array) {
    if (!Array.isArray(array) || !(/** @type {!Array<?>} */ (array)).length)
        return false;
    /** @type {*} */
    const maybeMessageMeta = (/** @type {*} */ (array[0]));
    /** @type {(undefined|!Array<?>)} */
    const parsed = tryParseMessageMeta(maybeMessageMeta);
    if (parsed != null && parsed !== maybeMessageMeta)
        array[0] = parsed;
    return parsed != null;
}
exports.isMessageBinaryFieldsArray = isMessageBinaryFieldsArray;
/**
 * Returns a tuple of a ReaderWriterPair and an optional BinaryFields object for
 * the given extension.
 * @param {(function(): ?|!ReaderWriterPair|!Array<?>|?)} fieldInfo
 * @return {!Array<?>}
 */
function getBinaryExtensionTuple(fieldInfo) {
    if (Array.isArray(fieldInfo)) {
        if (fieldInfo[0] instanceof ReaderWriterPair) {
            (0, assert_1.assert)((/** @type {(!Array<?>|?)} */ (fieldInfo)).length === 2);
            assertBinaryFields(fieldInfo[1]);
            // A repeated message extension.
            return (/** @type {!Array<?>} */ (fieldInfo));
        }
        // A singular message or MessageSet extension
        return [rwMessageExt, assertBinaryFields(fieldInfo)];
    }
    // a primitive extension
    return [(0, assert_1.assertInstanceof)(fieldInfo, ReaderWriterPair), undefined];
}
exports.getBinaryExtensionTuple = getBinaryExtensionTuple;
/**
 * @record
 */
function JspbArrayStore() { }
/** @typedef {?} */
var JspbSparseObject;
/** @typedef {?} */
var JspbArray;
/**
 * Any value we might find on the wire.
 * @typedef {(undefined|null|string|number|boolean|!tsickle_bytestring_4.ByteString|!tsickle_internal_map_9.JspbMap<?, ?>|!tsickle_message_10.Message|!gbigint|?)}
 */
exports.AnyJspbValue;
/**
 * Casts the given value to a message array, unwrapping a class if needed.
 *
 * @suppress {visibility}  access to internalArray_.
 * @param {*} v
 * @param {function(new:tsickle_internal_construct_7.module$contents$jspb$internal_construct_Opaque)} mm
 * @return {(undefined|?)}
 */
function asMessageArray(v, mm) {
    if (v instanceof message_1.Message) {
        return (/** @type {?} */ ((0, internal_1.getInternalArray)(v)));
    }
    if (!Array.isArray(v))
        return undefined;
    return (/** @type {?} */ ((0, internal_construct_1.constructMessageArrayFromMetaForBinary)(v, mm)));
}
exports.asMessageArray = asMessageArray;
