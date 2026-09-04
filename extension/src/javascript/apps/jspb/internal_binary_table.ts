/**
 * @fileoverview Helpers for constructing TypeInfoTables from binary fields.
 *
 * DO NOT USE THIS OUTSIDE OF THIS PACKAGE.
 * Generated from: javascript/apps/jspb/internal_binary_table.ts
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
goog.module('google3.javascript.apps.jspb.internal_binary_table');
var module = module || { id: 'javascript/apps/jspb/internal_binary_table.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_immutable_message_1 = goog.requireType("jspb.immutable_message");
const tsickle_internal_binary_fields_2 = goog.requireType("google3.javascript.apps.jspb.internal_binary_fields");
const tsickle_internal_binary_type_tokens_3 = goog.requireType("google3.javascript.apps.jspb.internal_binary_type_tokens");
const tsickle_internal_construct_4 = goog.requireType("jspb.internal_construct");
const tsickle_message_5 = goog.requireType("jspb");
const tsickle_mutable_message_6 = goog.requireType("jspb.mutable_message");
const tsickle_constructors_7 = goog.requireType("google3.javascript.apps.jspb.types.constructors");
const immutable_message_1 = goog.require('jspb.immutable_message');
const internal_binary_fields_1 = goog.require('google3.javascript.apps.jspb.internal_binary_fields');
const typeTokens = goog.require('google3.javascript.apps.jspb.internal_binary_type_tokens');
const internal_construct_1 = goog.require('jspb.internal_construct');
const message_1 = goog.require('jspb');
const assert_1 = goog.require('google3.javascript.typescript.contrib.assert');
/** @typedef {!tsickle_internal_binary_fields_2.FieldTypeInfo} */
exports.FieldTypeInfo; // type-only export
/** @typedef {!tsickle_internal_binary_fields_2.SubmessageFieldTypeInfo} */
exports.SubmessageFieldTypeInfo; // type-only export
/** @typedef {!tsickle_internal_binary_fields_2.TypeInfoTable} */
exports.TypeInfoTable; // type-only export
/** @type {symbol} */
const BINARY_FIELDS_KEY = Symbol();
/** @type {symbol} */
const MESSAGE_TYPE_KEY = Symbol();
/**
 * A TypeInfoTable wrapped in an object to prevent user inspection.
 * @record
 */
function WrappedTypeTable() { }
exports.WrappedTypeTable = WrappedTypeTable;
/* istanbul ignore if */
if (false) {
    /* Skipping unnamed member:
    [BINARY_FIELDS_KEY]: BinaryFields;*/
    /* Skipping unnamed member:
    [MESSAGE_TYPE_KEY]: MessageConstructor<MutableMessage>;*/
}
/**
 * A factory for constructing a TypeInfoTable.
 * @param {!tsickle_constructors_7.MessageConstructor<!tsickle_mutable_message_6.MutableMessage<?>>} messageType
 * @param {?} binaryFields
 * @return {!WrappedTypeTable}
 */
function wrappedTypeTableForBinaryFields(messageType, binaryFields) {
    (0, assert_1.assert)((0, immutable_message_1.defaultImmutableInstance)(messageType).constructor === messageType);
    (0, assert_1.assert)(new messageType() instanceof message_1.Message);
    (0, internal_binary_fields_1.assertBinaryFields)(binaryFields);
    return {
        [BINARY_FIELDS_KEY]: binaryFields,
        [MESSAGE_TYPE_KEY]: messageType,
    };
}
exports.wrappedTypeTableForBinaryFields = wrappedTypeTableForBinaryFields;
/**
 * Returns a binary fields array for the given wrapped type table.
 * @param {!WrappedTypeTable} typeTable
 * @return {!tsickle_constructors_7.MessageConstructor<!tsickle_mutable_message_6.MutableMessage<?>>}
 */
function getMessageType(typeTable) {
    /** @type {!tsickle_constructors_7.MessageConstructor<!tsickle_mutable_message_6.MutableMessage<?>>} */
    const messageType = typeTable[MESSAGE_TYPE_KEY];
    (0, assert_1.assert)((0, immutable_message_1.defaultImmutableInstance)(messageType).constructor === messageType);
    (0, assert_1.assert)(new messageType() instanceof message_1.Message);
    return messageType;
}
exports.getMessageType = getMessageType;
/**
 * Returns a binary fields array for the given wrapped type table.
 * @param {!WrappedTypeTable} typeTable
 * @return {?}
 */
function getBinaryFields(typeTable) {
    /** @type {?} */
    const binaryFields = typeTable[BINARY_FIELDS_KEY];
    (0, internal_binary_fields_1.assertBinaryFields)(binaryFields);
    return binaryFields;
}
exports.getBinaryFields = getBinaryFields;
/**
 * Returns a TypeInfoTable for the given wrapped type table.
 * @param {!WrappedTypeTable} typeTable
 * @return {!tsickle_internal_binary_fields_2.TypeInfoTable}
 */
function getTypeInfoTable(typeTable) {
    const { [BINARY_FIELDS_KEY]: binaryFields, [MESSAGE_TYPE_KEY]: messageType } = typeTable;
    (0, internal_binary_fields_1.assertBinaryFields)(binaryFields);
    /** @type {!tsickle_internal_binary_fields_2.TypeInfoTable} */
    const table = typeInfoForBinaryFieldsInternal(binaryFields);
    table.messageType ??= messageType;
    (0, assert_1.assert)(table.messageType === messageType);
    return table;
}
exports.getTypeInfoTable = getTypeInfoTable;
/**
 * Iterates over all fields in the given table.
 * @param {!tsickle_internal_binary_fields_2.TypeInfoTable} table
 * @return {?}
 */
function getExtensionsInTable(table) {
    /** @type {*} */
    const extensionTypeInfos = (table.extensionTypeInfos ??= {});
    // tslint:disable-next-line:forin
    for (const fieldNumberString in table.extensions) {
        /** @type {?} */
        const fieldNumber = (/** @type {?} */ (+fieldNumberString));
        if (isNaN(fieldNumber))
            continue;
        /** @type {(!tsickle_internal_binary_fields_2.FieldTypeInfo|!tsickle_internal_binary_fields_2.SubmessageFieldTypeInfo)} */
        const cachedTypeInfo = extensionTypeInfos[fieldNumber];
        if (cachedTypeInfo)
            continue;
        let [readerWriterPair__tsickle_destructured_1, submessageBinaryFields__tsickle_destructured_2] = (0, internal_binary_fields_1.getBinaryExtensionTuple)(table.extensions[(/** @type {?} */ ((/** @type {*} */ (fieldNumber))))]);
        let readerWriterPair = /** @type {!tsickle_internal_binary_fields_2.ReaderWriterPair} */ (readerWriterPair__tsickle_destructured_1);
        let submessageBinaryFields = /** @type {(undefined|?|function(): ?)} */ (submessageBinaryFields__tsickle_destructured_2);
        if (submessageBinaryFields) {
            if (typeof submessageBinaryFields === 'function') {
                submessageBinaryFields = submessageBinaryFields();
            }
        }
        extensionTypeInfos[fieldNumber] = submessageBinaryFields
            ? new CachedSubmessageTypeInfo(submessageBinaryFields, (/** @type {!tsickle_internal_binary_type_tokens_3.OpaqueTypeToken<string>} */ (readerWriterPair.$$valueType)), readerWriterPair.$$isRepeated, 
            /* isMap= */ false, 
            /* oneofGroup= */ undefined, submessageBinaryFields)
            : new CachedPrimitiveTypeInfo(readerWriterPair.$$valueType, readerWriterPair.$$isRepeated, 
            /* oneofGroup= */ undefined);
    }
    return table.extensionTypeInfos;
}
exports.getExtensionsInTable = getExtensionsInTable;
/**
 * Iterates over all fields in the given table.
 * @param {!tsickle_internal_binary_fields_2.TypeInfoTable} table
 * @param {function(?, !tsickle_internal_binary_fields_2.FieldTypeInfo, boolean): void} forEachField
 * @return {void}
 */
function forEachFieldInTable(table, forEachField) {
    for (const fieldNumber in table) {
        if (isNaN((/** @type {number} */ ((/** @type {*} */ (fieldNumber))))))
            continue;
        /** @type {(!tsickle_internal_binary_fields_2.FieldTypeInfo|!tsickle_internal_binary_fields_2.SubmessageFieldTypeInfo)} */
        const typeInfo = table[(/** @type {?} */ ((/** @type {*} */ (fieldNumber))))];
        forEachField((/** @type {?} */ (+fieldNumber)), typeInfo, 
        /* isExtension= */ false);
    }
    /** @type {?} */
    const extensionTypeInfos = getExtensionsInTable(table);
    // tslint:disable-next-line:forin
    for (const fieldNumberString in extensionTypeInfos) {
        /** @type {?} */
        const fieldNumber = (/** @type {?} */ (+fieldNumberString));
        if (isNaN(fieldNumber))
            continue;
        forEachField(fieldNumber, extensionTypeInfos[fieldNumber], 
        /* isExtension= */ true);
    }
}
exports.forEachFieldInTable = forEachFieldInTable;
/**
 * A factory for constructing a TypeInfoTable.
 * @param {?} binaryFields
 * @return {!tsickle_internal_binary_fields_2.TypeInfoTable}
 */
function typeInfoForBinaryFieldsInternal(binaryFields) {
    return (0, internal_binary_fields_1.makeMessageFieldTable)(internal_binary_fields_1.CACHED_TYPE_INFO, 
    /* emptyTable= */ undefined, addPrimitiveFieldToTypeInfoTable, addMessageFieldToTypeInfoTable, binaryFields);
}
/**
 * @param {!tsickle_internal_binary_fields_2.TypeInfoTable} table
 * @param {?} fieldNumber
 * @param {!tsickle_internal_binary_fields_2.ReaderWriterPair} readerWriterPair
 * @param {(undefined|!Array<?>)=} oneofGroup
 * @return {void}
 */
function addPrimitiveFieldToTypeInfoTable(table, fieldNumber, readerWriterPair, oneofGroup) {
    (0, assert_1.assert)(!(readerWriterPair.$$valueType === typeTokens.MESSAGE ||
        readerWriterPair.$$valueType === typeTokens.GROUP ||
        readerWriterPair.$$valueType === typeTokens.MAP));
    table[fieldNumber] = new CachedPrimitiveTypeInfo(readerWriterPair.$$valueType, readerWriterPair.$$isRepeated, oneofGroup);
}
/**
 * @implements {tsickle_internal_binary_fields_2.FieldTypeInfo}
 */
class CachedPrimitiveTypeInfo {
    /**
     * @public
     * @param {!tsickle_internal_binary_type_tokens_3.OpaqueTypeToken<string>} typeToken
     * @param {(boolean|!tsickle_internal_binary_type_tokens_3.OpaqueTypeToken<string>)} isRepeated
     * @param {(undefined|!Array<?>)} oneofGroup
     */
    constructor(typeToken, isRepeated, oneofGroup) {
        this.typeToken = typeToken;
        this.isRepeated = isRepeated;
        this.oneofGroup = oneofGroup;
        this.isMap = false;
    }
}
/* istanbul ignore if */
if (false) {
    /**
     * @const {boolean}
     * @public
     */
    CachedPrimitiveTypeInfo.prototype.isMap;
    /**
     * @const {!tsickle_internal_binary_type_tokens_3.OpaqueTypeToken<string>}
     * @public
     */
    CachedPrimitiveTypeInfo.prototype.typeToken;
    /**
     * @const {(boolean|!tsickle_internal_binary_type_tokens_3.OpaqueTypeToken<string>)}
     * @public
     */
    CachedPrimitiveTypeInfo.prototype.isRepeated;
    /**
     * @const {(undefined|!Array<?>)}
     * @public
     */
    CachedPrimitiveTypeInfo.prototype.oneofGroup;
}
class CachedSubmessageTypeInfo {
    /**
     * @public
     * @param {?} binaryFields
     * @param {!tsickle_internal_binary_type_tokens_3.OpaqueTypeToken<string>} typeToken
     * @param {(boolean|!tsickle_internal_binary_type_tokens_3.OpaqueTypeToken<string>)} isRepeated
     * @param {(boolean|!tsickle_internal_binary_type_tokens_3.OpaqueTypeToken<string>)} isMap
     * @param {(undefined|!Array<?>)} oneofGroup
     * @param {?} submessageBinaryFields
     */
    constructor(binaryFields, typeToken, isRepeated, isMap, oneofGroup, submessageBinaryFields) {
        this.binaryFields = binaryFields;
        this.typeToken = typeToken;
        this.isRepeated = isRepeated;
        this.isMap = isMap;
        this.oneofGroup = oneofGroup;
        this.submessageBinaryFields = submessageBinaryFields;
    }
    /**
     * @public
     * @return {!tsickle_internal_binary_fields_2.TypeInfoTable}
     */
    getSubmessageTypeInfo() {
        return (this.submessageTypeInfoCached ??= typeInfoForBinaryFieldsInternal(this.submessageBinaryFields));
    }
}
/* istanbul ignore if */
if (false) {
    /**
     * @type {(undefined|!tsickle_internal_binary_fields_2.TypeInfoTable)}
     * @private
     */
    CachedSubmessageTypeInfo.prototype.submessageTypeInfoCached;
    /**
     * @const {?}
     * @public
     */
    CachedSubmessageTypeInfo.prototype.binaryFields;
    /**
     * @const {!tsickle_internal_binary_type_tokens_3.OpaqueTypeToken<string>}
     * @public
     */
    CachedSubmessageTypeInfo.prototype.typeToken;
    /**
     * @const {(boolean|!tsickle_internal_binary_type_tokens_3.OpaqueTypeToken<string>)}
     * @public
     */
    CachedSubmessageTypeInfo.prototype.isRepeated;
    /**
     * @const {(boolean|!tsickle_internal_binary_type_tokens_3.OpaqueTypeToken<string>)}
     * @public
     */
    CachedSubmessageTypeInfo.prototype.isMap;
    /**
     * @const {(undefined|!Array<?>)}
     * @public
     */
    CachedSubmessageTypeInfo.prototype.oneofGroup;
    /**
     * @const {?}
     * @private
     */
    CachedSubmessageTypeInfo.prototype.submessageBinaryFields;
}
/**
 * @param {!tsickle_internal_binary_fields_2.TypeInfoTable} table
 * @param {?} fieldNumber
 * @param {!tsickle_internal_binary_fields_2.ReaderWriterPair} readerWriterPair
 * @param {?} submessageBinaryFields
 * @param {(undefined|!Array<?>)=} oneofGroup
 * @return {void}
 */
function addMessageFieldToTypeInfoTable(table, fieldNumber, readerWriterPair, submessageBinaryFields, oneofGroup) {
    (0, assert_1.assert)(readerWriterPair.$$valueType === typeTokens.MESSAGE ||
        readerWriterPair.$$valueType === typeTokens.GROUP);
    /** @type {(undefined|function(new:tsickle_internal_construct_4.module$contents$jspb$internal_construct_Opaque))} */
    const messageMeta = (0, internal_construct_1.tryParseMessageMeta)(submessageBinaryFields[0]);
    /** @type {boolean} */
    const isMap = messageMeta ? (0, internal_construct_1.isMapEntryMessageMeta)(messageMeta) : false;
    table[fieldNumber] = new CachedSubmessageTypeInfo(submessageBinaryFields, (/** @type {!tsickle_internal_binary_type_tokens_3.OpaqueTypeToken<string>} */ (readerWriterPair.$$valueType)), isMap ? typeTokens.REPEATED : readerWriterPair.$$isRepeated, isMap ? typeTokens.MAP : false, oneofGroup, submessageBinaryFields);
}
