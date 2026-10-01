/**
 * @fileoverview Helpers for computing ComparisonTypeInfo from binary fields.
 *
 * DO NOT USE THIS OUTSIDE OF THIS PACKAGE.
 * Generated from: javascript/apps/jspb/internal_binary_comparison.ts
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
goog.module('google3.javascript.apps.jspb.internal_binary_comparison');
var module = module || { id: 'javascript/apps/jspb/internal_binary_comparison.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_internal_1 = goog.requireType("jspb.internal");
const tsickle_internal_binary_fields_2 = goog.requireType("google3.javascript.apps.jspb.internal_binary_fields");
const tsickle_internal_construct_3 = goog.requireType("jspb.internal_construct");
const internal_binary_fields_1 = goog.require('google3.javascript.apps.jspb.internal_binary_fields');
const internal_construct_1 = goog.require('jspb.internal_construct');
const assert_1 = goog.require('google3.javascript.typescript.contrib.assert');
/**
 * Type information required for performing accurate comparisons.
 *
 * This type encapsulates best-effort information about which fields are either
 * repeated or maps, to be used during comparisons. In addition to the
 * `repeatedFields` and `mapFields` properties, it has numeric properties for
 * each field number for which we have the same type information.
 *
 * This is the interface for the binary implementation, which is somewhat
 * different from the interface exposed from internal.js due to the presence
 * of binary-specific information in MessageFieldTable. You probably want the
 * internal.js variant if you're just reading the field.
 * @implements {tsickle_internal_binary_fields_2.MessageFieldTable<(undefined|null|!tsickle_internal_1.ComparisonTypeInfo|?)>}
 * @implements {tsickle_internal_1.ComparisonTypeInfo}
 */
class BinaryComparisonTypeInfo {
    /**
     * @public
     * @param {?} binaryFields
     * @param {!Array<?>} messageMetadata
     */
    constructor(binaryFields, messageMetadata) {
        this.binaryFields = binaryFields;
        this.messageMetadata = messageMetadata;
    }
    /**
     * @public
     * @return {!Set<number>}
     */
    getRepeatedFields() {
        /** @type {(undefined|!Set<number>)} */
        const repeatedFields = this.repeatedFields;
        if (!repeatedFields)
            return getEmptySet();
        return repeatedFields;
    }
    /**
     * @public
     * @return {!Set<number>}
     */
    getMapFields() {
        /** @type {(undefined|!Set<number>)} */
        const mapFields = this.mapFields;
        if (!mapFields)
            return getEmptySet();
        return mapFields;
    }
    /**
     * @public
     * @param {?} fieldNumber
     * @return {(undefined|!BinaryComparisonTypeInfo)}
     */
    getFieldComparisonTypeInfo(fieldNumber) {
        /** @type {!tsickle_internal_binary_fields_2.MessageFieldTable<(undefined|null|!tsickle_internal_1.ComparisonTypeInfo|?)>} */
        const thisTable = (/** @type {!tsickle_internal_binary_fields_2.MessageFieldTable<(undefined|null|!tsickle_internal_1.ComparisonTypeInfo|?)>} */ ((/** @type {*} */ (this))));
        /** @type {(undefined|null|!tsickle_internal_1.ComparisonTypeInfo|?)} */
        const directField = thisTable[fieldNumber];
        if (directField != null) {
            if (Array.isArray(directField)) {
                return (thisTable[fieldNumber] =
                    binaryComparisonTypeInfoForBinaryFields((0, internal_binary_fields_1.assertBinaryFields)(directField)));
            }
            return (0, assert_1.assertInstanceof)(directField, BinaryComparisonTypeInfo);
        }
        /** @type {(undefined|!tsickle_internal_binary_fields_2.BinaryExtensionSet)} */
        const extensions = this.extensions;
        if (extensions == null)
            return undefined;
        /** @type {(function(): ?|!tsickle_internal_binary_fields_2.ReaderWriterPair|!Array<?>|?)} */
        const thisExt = extensions[fieldNumber];
        if (thisExt == null)
            return undefined;
        /** @type {!Array<?>} */
        const tuple = (0, internal_binary_fields_1.getBinaryExtensionTuple)(thisExt);
        if (tuple[0].$$isRepeated && !this.repeatedFields?.has(fieldNumber)) {
            (this.repeatedFields ||= new Set()).add(fieldNumber);
        }
        /** @type {(undefined|function(): ?|?)} */
        const extBinaryFields = tuple[1];
        if (extBinaryFields == null)
            return undefined;
        return (thisTable[fieldNumber] = binaryComparisonTypeInfoForBinaryFields((0, internal_binary_fields_1.assertBinaryFields)(extBinaryFields)));
    }
}
exports.BinaryComparisonTypeInfo = BinaryComparisonTypeInfo;
/* istanbul ignore if */
if (false) {
    /**
     * @type {(undefined|boolean)}
     * @public
     */
    BinaryComparisonTypeInfo.prototype.onlySubmessages;
    /**
     * @type {(undefined|boolean)}
     * @public
     */
    BinaryComparisonTypeInfo.prototype.isMessageSet;
    /**
     * @type {(undefined|!tsickle_internal_binary_fields_2.BinaryExtensionSet)}
     * @public
     */
    BinaryComparisonTypeInfo.prototype.extensions;
    /**
     * @type {(undefined|!Set<number>)}
     * @public
     */
    BinaryComparisonTypeInfo.prototype.repeatedFields;
    /**
     * @type {(undefined|!Set<number>)}
     * @public
     */
    BinaryComparisonTypeInfo.prototype.mapFields;
    /**
     * @type {?}
     * @public
     */
    BinaryComparisonTypeInfo.prototype.binaryFields;
    /**
     * @type {!Array<?>}
     * @public
     */
    BinaryComparisonTypeInfo.prototype.messageMetadata;
    /* Skipping unhandled member: [k: FieldNumber]: BinaryComparisonTypeInfoValue;*/
}
/**
 * A factory for constructing BinaryComparisonTypeInfo.
 * @nosideeffects
 * @param {?} binaryFields
 * @return {!BinaryComparisonTypeInfo}
 */
function binaryComparisonTypeInfoForBinaryFieldsInternal(binaryFields) {
    return (0, internal_binary_fields_1.makeMessageFieldTable)(internal_binary_fields_1.CACHED_COMPARISON_TYPE_INFO, makeEmptyComparisonTypeInfo, addSingularFieldInfoToComparisonTable, addMessageFieldInfoToComparisonTable, binaryFields);
}
/**
 * @return {!BinaryComparisonTypeInfo}
 */
function makeEmptyComparisonTypeInfo() {
    return new BinaryComparisonTypeInfo((/** @type {?} */ ((/** @type {*} */ (
    // the binary fields will be written by makeMessageFieldTable.
    undefined)))), (/** @type {!Array<?>} */ ((/** @type {*} */ ((0, internal_binary_fields_1.tryParseMessageMeta)(0))))));
}
/**
 * @param {!tsickle_internal_binary_fields_2.MessageFieldTable<(undefined|null|!tsickle_internal_1.ComparisonTypeInfo|?)>} table
 * @param {?} fieldNumber
 * @param {!tsickle_internal_binary_fields_2.ReaderWriterPair} readerWriterPair
 * @param {(undefined|!Array<?>)=} oneofGroup
 * @return {void}
 */
function addSingularFieldInfoToComparisonTable(table, fieldNumber, readerWriterPair, oneofGroup) {
    addFieldInfoToComparisonTable((/** @type {!BinaryComparisonTypeInfo} */ (table)), fieldNumber, !!readerWriterPair.$$isRepeated, 
    /* childBinaryFields= */ undefined);
}
/**
 * @param {!tsickle_internal_binary_fields_2.MessageFieldTable<(undefined|null|!tsickle_internal_1.ComparisonTypeInfo|?)>} table
 * @param {?} fieldNumber
 * @param {!tsickle_internal_binary_fields_2.ReaderWriterPair} readerWriterPair
 * @param {?} submessageBinaryFields
 * @param {(undefined|!Array<?>)=} oneofGroup
 * @return {void}
 */
function addMessageFieldInfoToComparisonTable(table, fieldNumber, readerWriterPair, submessageBinaryFields, oneofGroup) {
    addFieldInfoToComparisonTable((/** @type {!BinaryComparisonTypeInfo} */ (table)), fieldNumber, !!readerWriterPair.$$isRepeated, submessageBinaryFields);
}
/**
 * @param {!BinaryComparisonTypeInfo} parentTypeInfo
 * @param {?} fieldNumber
 * @param {boolean} isRepeated
 * @param {(undefined|?)} childBinaryFields
 * @return {void}
 */
function addFieldInfoToComparisonTable(parentTypeInfo, fieldNumber, isRepeated, childBinaryFields) {
    /** @type {(undefined|!Array<?>)} */
    let childMeta;
    if (childBinaryFields) {
        // If our child was initialized with comparison type info, write that back
        // to our parent. Otherwise, write a reference to the binary fields object
        // as a placeholder.
        /** @type {(undefined|!BinaryComparisonTypeInfo)} */
        const maybeChildComparisonTypeInfo = (/** @type {(undefined|!BinaryComparisonTypeInfo)} */ (childBinaryFields[internal_binary_fields_1.CACHED_COMPARISON_TYPE_INFO]));
        childMeta = maybeChildComparisonTypeInfo
            ? maybeChildComparisonTypeInfo.messageMetadata
            : (0, assert_1.assert)((0, internal_binary_fields_1.tryParseMessageMeta)(childBinaryFields[0]));
        parentTypeInfo[fieldNumber] =
            maybeChildComparisonTypeInfo ?? childBinaryFields;
    }
    // Add this field to the map or repeated fields arrays, as appropriate.
    // This data may be represented as an Array or a Set depending on whether or
    // not we have started quering it.  Support both.
    if (childMeta &&
        (0, internal_construct_1.isMapEntryMessageMeta)((/** @type {function(new:tsickle_internal_construct_3.module$contents$jspb$internal_construct_Opaque)} */ ((/** @type {*} */ (childMeta)))))) {
        /** @type {!Set<number>} */
        const mapFields = (parentTypeInfo.mapFields ??= new Set());
        (0, assert_1.assertInstanceof)(mapFields, Set).add(fieldNumber);
    }
    else if (isRepeated) {
        /** @type {!Set<number>} */
        const repeatedFields = (parentTypeInfo.repeatedFields ??= new Set());
        (0, assert_1.assertInstanceof)(repeatedFields, Set).add(fieldNumber);
    }
}
/**
 * Retrieves a BinaryComparisonTypeInfo for the given BinaryFields.
 * @param {?} binaryFields
 * @return {!BinaryComparisonTypeInfo}
 */
function binaryComparisonTypeInfoForBinaryFields(binaryFields) {
    // Don't re-do this work.
    /** @type {(undefined|!tsickle_internal_binary_fields_2.MessageFieldTable<(undefined|null|!tsickle_internal_1.ComparisonTypeInfo|?)>)} */
    const cachedValue = binaryFields[internal_binary_fields_1.CACHED_COMPARISON_TYPE_INFO];
    if (cachedValue)
        return (/** @type {!BinaryComparisonTypeInfo} */ (cachedValue));
    // Walk our type table as usual.
    /** @type {!BinaryComparisonTypeInfo} */
    const comparisonTypeInfo = binaryComparisonTypeInfoForBinaryFieldsInternal(binaryFields);
    // Add some postprocessing to speed up some common cases.
    //
    // If this object is actually empty, mark it as such and replace with a
    // sentinel. This saves some work when we can skip attaching data to leaf
    // protos.
    //
    // **NOTE:** we cannot do this for extendable messages since more fields may
    // show up later.
    if (!comparisonTypeInfo.extensions &&
        !comparisonTypeInfo.repeatedFields?.size &&
        !comparisonTypeInfo.mapFields?.size) {
        // If there are any numeric keys then we are not empty
        // Numeric keys always come first per the spec on object iteration
        // See
        // https://tc39.es/ecma262/multipage/ordinary-and-exotic-objects-behaviours.html#sec-ordinaryownpropertykeys
        /** @type {boolean} */
        let empty = true;
        for (const k in comparisonTypeInfo) {
            if (!isNaN((/** @type {number} */ ((/** @type {*} */ (k)))))) {
                empty = false;
            }
        }
        if (empty) {
            // Replace this instance with the standard empty instance
            // NOTE: because this instance is empty this is the only reference and
            // so we are replacing all references with this write.
            /** @type {boolean} */
            const isMapEntry = (0, internal_construct_1.isMapEntryMessageMeta)((/** @type {function(new:tsickle_internal_construct_3.module$contents$jspb$internal_construct_Opaque)} */ ((/** @type {*} */ ((0, assert_1.assert)((0, internal_binary_fields_1.tryParseMessageMeta)(binaryFields[0])))))));
            return (binaryFields[internal_binary_fields_1.CACHED_COMPARISON_TYPE_INFO] = isMapEntry
                ? getEmptyMapEntryComparisonInfo()
                : getEmptyComparisonInfo());
        }
        else {
            // There are no repeated fields but there must be some submessages.
            // In this case we can skip attaching but not traversal
            comparisonTypeInfo.onlySubmessages = true;
        }
    }
    return (0, assert_1.assert)(comparisonTypeInfo);
}
exports.binaryComparisonTypeInfoForBinaryFields = binaryComparisonTypeInfoForBinaryFields;
/** @type {(undefined|!BinaryComparisonTypeInfo)} */
let emptyComparisonInfo;
/**
 * @return {!BinaryComparisonTypeInfo}
 */
function getEmptyComparisonInfo() {
    return (emptyComparisonInfo ??= new BinaryComparisonTypeInfo((/** @type {?} */ ((/** @type {*} */ (
    // the binary fields will be written by makeMessageFieldTable.
    undefined)))), (/** @type {!Array<?>} */ ((/** @type {*} */ ((0, internal_binary_fields_1.tryParseMessageMeta)(0)))))));
}
/** @type {(undefined|!BinaryComparisonTypeInfo)} */
let emptyMapEntryComparisonInfo;
/**
 * @return {!BinaryComparisonTypeInfo}
 */
function getEmptyMapEntryComparisonInfo() {
    if (emptyMapEntryComparisonInfo)
        return emptyMapEntryComparisonInfo;
    /** @type {!BinaryComparisonTypeInfo} */
    const typeInfo = new BinaryComparisonTypeInfo((/** @type {?} */ ((/** @type {*} */ (
    // the binary fields will be written by makeMessageFieldTable.
    undefined)))), (/** @type {!Array<?>} */ ((0, internal_binary_fields_1.tryParseMessageMeta)(internal_construct_1.ENCODED_MAP_META))));
    typeInfo.messageMetadata = (0, assert_1.assert)((0, internal_binary_fields_1.tryParseMessageMeta)(internal_construct_1.ENCODED_MAP_META));
    return (emptyMapEntryComparisonInfo = typeInfo);
}
/**
 * Returns whether the given value is an empty sentinel CTI.
 * @param {!BinaryComparisonTypeInfo} info
 * @return {boolean}
 */
function isEmptyComparisonInfo(info) {
    return info === emptyComparisonInfo || info === emptyMapEntryComparisonInfo;
}
exports.isEmptyComparisonInfo = isEmptyComparisonInfo;
/** @type {(undefined|!Set<number>)} */
let emptySet;
/**
 * @return {!Set<number>}
 */
function getEmptySet() {
    return (emptySet ??= new Set());
}
