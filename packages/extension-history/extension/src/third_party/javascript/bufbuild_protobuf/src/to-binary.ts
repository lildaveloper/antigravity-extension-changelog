/**
 * @license
 * Copyright 2021-2025 Buf Technologies, Inc
 * SPDX-License-Identifier: Apache-2.0
 */
// Copyright 2021-2025 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/javascript/bufbuild_protobuf/src/to-binary.ts
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
goog.module('google3.third_party.javascript.bufbuild_protobuf.src.to$2dbinary');
var module = module || { id: 'third_party/javascript/bufbuild_protobuf/src/to-binary.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_types_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.types");
const tsickle_reflect_2 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.reflect");
const tsickle_binary_encoding_3 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wire.binary$2dencoding");
const tsickle_descriptor_pb_4 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.descriptor_pb");
const tsickle_scalar_5 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.scalar");
const tsickle_descriptors_6 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.descriptors");
const tsickle_reflect_7 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.index");
const reflect_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.reflect.reflect');
const binary_encoding_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wire.binary$2dencoding');
const descriptors_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.descriptors');
// bootstrap-inject google.protobuf.FeatureSet.FieldPresence.LEGACY_REQUIRED: const $name: FeatureSet_FieldPresence.$localName = $number;
/** @type {!tsickle_descriptor_pb_4.FeatureSet_FieldPresence} */
const LEGACY_REQUIRED = 3;
/**
 * Options for serializing to binary data.
 *
 * V1 also had the option `readerFactory` for using a custom implementation to
 * encode to binary.
 * @record
 */
function BinaryWriteOptions() { }
exports.BinaryWriteOptions = BinaryWriteOptions;
/* istanbul ignore if */
if (false) {
    /**
     * Include unknown fields in the serialized output? The default behavior
     * is to retain unknown fields and include them in the serialized output.
     *
     * For more details see https://developers.google.com/protocol-buffers/docs/proto3#unknowns
     * @type {boolean}
     * @public
     */
    BinaryWriteOptions.prototype.writeUnknownFields;
}
// Default options for serializing binary data.
/** @type {?} */
const writeDefaults = {
    writeUnknownFields: true,
};
/**
 * @param {(undefined|?)=} options
 * @return {?}
 */
function makeWriteOptions(options) {
    return options ? { ...writeDefaults, ...options } : writeDefaults;
}
/**
 * @template Desc
 * @param {Desc} schema
 * @param {?} message
 * @param {(undefined|?)=} options
 * @return {!Uint8Array}
 */
function toBinary(schema, message, options) {
    return writeFields(new binary_encoding_js_1.BinaryWriter(), makeWriteOptions(options), (0, reflect_js_1.reflect)(schema, message)).finish();
}
exports.toBinary = toBinary;
/**
 * @param {!tsickle_binary_encoding_3.BinaryWriter} writer
 * @param {!BinaryWriteOptions} opts
 * @param {!tsickle_reflect_7.ReflectMessage} msg
 * @return {!tsickle_binary_encoding_3.BinaryWriter}
 */
function writeFields(writer, opts, msg) {
    for (const f of msg.sortedFields) {
        if (!msg.isSet(f)) {
            if (f.presence == LEGACY_REQUIRED) {
                throw new Error(`cannot encode ${f} to binary: required field not set`);
            }
            continue;
        }
        writeField(writer, opts, msg, f);
    }
    if (opts.writeUnknownFields) {
        for (const { no, wireType, data } of msg.getUnknown() ?? []) {
            writer.tag(no, wireType).raw(data);
        }
    }
    return writer;
}
/**
 * @param {!tsickle_binary_encoding_3.BinaryWriter} writer
 * @param {!BinaryWriteOptions} opts
 * @param {!tsickle_reflect_7.ReflectMessage} msg
 * @param {?} field
 * @return {void}
 */
function writeField(writer, opts, msg, field) {
    switch (field.fieldKind) {
        case "scalar":
        case "enum":
            writeScalar(writer, msg.desc.typeName, field.name, field.scalar ?? descriptors_js_1.ScalarType.INT32, field.number, msg.get(field));
            break;
        case "list":
            writeListField(writer, opts, field, msg.get(field));
            break;
        case "message":
            writeMessageField(writer, opts, field, msg.get(field));
            break;
        case "map":
            for (const [key__tsickle_destructured_1, val__tsickle_destructured_2] of msg.get(field)) {
                const key = /** @type {*} */ (key__tsickle_destructured_1);
                const val = /** @type {*} */ (val__tsickle_destructured_2);
                writeMapEntry(writer, opts, field, key, val);
            }
            break;
    }
}
exports.writeField = writeField;
/**
 * @param {!tsickle_binary_encoding_3.BinaryWriter} writer
 * @param {string} msgName
 * @param {string} fieldName
 * @param {!tsickle_descriptors_6.ScalarType} scalarType
 * @param {number} fieldNo
 * @param {*} value
 * @return {void}
 */
function writeScalar(writer, msgName, fieldName, scalarType, fieldNo, value) {
    writeScalarValue(writer.tag(fieldNo, writeTypeOfScalar(scalarType)), msgName, fieldName, scalarType, (/** @type {(string|number|bigint|boolean|!Uint8Array)} */ (value)));
}
/**
 * @param {!tsickle_binary_encoding_3.BinaryWriter} writer
 * @param {!BinaryWriteOptions} opts
 * @param {?} field
 * @param {!tsickle_reflect_7.ReflectMessage} message
 * @return {void}
 */
function writeMessageField(writer, opts, field, message) {
    if (field.delimitedEncoding) {
        writeFields(writer.tag(field.number, binary_encoding_js_1.WireType.StartGroup), opts, message).tag(field.number, binary_encoding_js_1.WireType.EndGroup);
    }
    else {
        writeFields(writer.tag(field.number, binary_encoding_js_1.WireType.LengthDelimited).fork(), opts, message).join();
    }
}
/**
 * @param {!tsickle_binary_encoding_3.BinaryWriter} writer
 * @param {!BinaryWriteOptions} opts
 * @param {?} field
 * @param {!tsickle_reflect_7.ReflectList<*>} list
 * @return {void}
 */
function writeListField(writer, opts, field, list) {
    if (field.listKind == "message") {
        for (const item of list) {
            writeMessageField(writer, opts, field, (/** @type {!tsickle_reflect_7.ReflectMessage} */ (item)));
        }
        return;
    }
    /** @type {!tsickle_descriptors_6.ScalarType} */
    const scalarType = field.scalar ?? descriptors_js_1.ScalarType.INT32;
    if (field.packed) {
        if (!list.size) {
            return;
        }
        writer.tag(field.number, binary_encoding_js_1.WireType.LengthDelimited).fork();
        for (const item of list) {
            writeScalarValue(writer, field.parent.typeName, field.name, scalarType, (/** @type {(string|number|bigint|boolean|!Uint8Array)} */ (item)));
        }
        writer.join();
        return;
    }
    for (const item of list) {
        writeScalar(writer, field.parent.typeName, field.name, scalarType, field.number, item);
    }
}
/**
 * @param {!tsickle_binary_encoding_3.BinaryWriter} writer
 * @param {!BinaryWriteOptions} opts
 * @param {?} field
 * @param {*} key
 * @param {*} value
 * @return {void}
 */
function writeMapEntry(writer, opts, field, key, value) {
    writer.tag(field.number, binary_encoding_js_1.WireType.LengthDelimited).fork();
    // write key, expecting key field number = 1
    writeScalar(writer, field.parent.typeName, field.name, field.mapKey, 1, key);
    // write value, expecting value field number = 2
    switch (field.mapKind) {
        case "scalar":
        case "enum":
            writeScalar(writer, field.parent.typeName, field.name, field.scalar ?? descriptors_js_1.ScalarType.INT32, 2, value);
            break;
        case "message":
            writeFields(writer.tag(2, binary_encoding_js_1.WireType.LengthDelimited).fork(), opts, (/** @type {!tsickle_reflect_7.ReflectMessage} */ (value))).join();
            break;
    }
    writer.join();
}
/**
 * @param {!tsickle_binary_encoding_3.BinaryWriter} writer
 * @param {string} msgName
 * @param {string} fieldName
 * @param {!tsickle_descriptors_6.ScalarType} type
 * @param {(string|number|bigint|boolean|!Uint8Array)} value
 * @return {void}
 */
function writeScalarValue(writer, msgName, fieldName, type, value) {
    try {
        switch (type) {
            case descriptors_js_1.ScalarType.STRING:
                writer.string((/** @type {string} */ (value)));
                break;
            case descriptors_js_1.ScalarType.BOOL:
                writer.bool((/** @type {boolean} */ (value)));
                break;
            case descriptors_js_1.ScalarType.DOUBLE:
                writer.double((/** @type {number} */ (value)));
                break;
            case descriptors_js_1.ScalarType.FLOAT:
                writer.float((/** @type {number} */ (value)));
                break;
            case descriptors_js_1.ScalarType.INT32:
                writer.int32((/** @type {number} */ (value)));
                break;
            case descriptors_js_1.ScalarType.INT64:
                writer.int64((/** @type {number} */ (value)));
                break;
            case descriptors_js_1.ScalarType.UINT64:
                writer.uint64((/** @type {number} */ (value)));
                break;
            case descriptors_js_1.ScalarType.FIXED64:
                writer.fixed64((/** @type {number} */ (value)));
                break;
            case descriptors_js_1.ScalarType.BYTES:
                writer.bytes((/** @type {!Uint8Array} */ (value)));
                break;
            case descriptors_js_1.ScalarType.FIXED32:
                writer.fixed32((/** @type {number} */ (value)));
                break;
            case descriptors_js_1.ScalarType.SFIXED32:
                writer.sfixed32((/** @type {number} */ (value)));
                break;
            case descriptors_js_1.ScalarType.SFIXED64:
                writer.sfixed64((/** @type {number} */ (value)));
                break;
            case descriptors_js_1.ScalarType.SINT64:
                writer.sint64((/** @type {number} */ (value)));
                break;
            case descriptors_js_1.ScalarType.UINT32:
                writer.uint32((/** @type {number} */ (value)));
                break;
            case descriptors_js_1.ScalarType.SINT32:
                writer.sint32((/** @type {number} */ (value)));
                break;
        }
    }
    catch (e) {
        if (e instanceof Error) {
            throw new Error(`cannot encode field ${msgName}.${fieldName} to binary: ${(/** @type {!Error} */ (e)).message}`);
        }
        throw e;
    }
}
/**
 * @param {!tsickle_descriptors_6.ScalarType} type
 * @return {!tsickle_binary_encoding_3.WireType}
 */
function writeTypeOfScalar(type) {
    switch (type) {
        case descriptors_js_1.ScalarType.BYTES:
        case descriptors_js_1.ScalarType.STRING:
            return binary_encoding_js_1.WireType.LengthDelimited;
        case descriptors_js_1.ScalarType.DOUBLE:
        case descriptors_js_1.ScalarType.FIXED64:
        case descriptors_js_1.ScalarType.SFIXED64:
            return binary_encoding_js_1.WireType.Bit64;
        case descriptors_js_1.ScalarType.FIXED32:
        case descriptors_js_1.ScalarType.SFIXED32:
        case descriptors_js_1.ScalarType.FLOAT:
            return binary_encoding_js_1.WireType.Bit32;
        default:
            return binary_encoding_js_1.WireType.Varint;
    }
}
