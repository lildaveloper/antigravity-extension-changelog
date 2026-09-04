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
 * Generated from: third_party/javascript/bufbuild_protobuf/src/from-binary.ts
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
goog.module('google3.third_party.javascript.bufbuild_protobuf.src.from$2dbinary');
var module = module || { id: 'third_party/javascript/bufbuild_protobuf/src/from-binary.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_descriptors_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.descriptors");
const tsickle_types_2 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.types");
const tsickle_reflect_3 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.index");
const tsickle_scalar_4 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.scalar");
const tsickle_reflect_5 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.reflect");
const tsickle_binary_encoding_6 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wire.binary$2dencoding");
const tsickle_varint_7 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wire.varint");
const descriptors_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.descriptors');
const scalar_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.reflect.scalar');
const reflect_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.reflect.reflect');
const binary_encoding_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wire.binary$2dencoding');
const varint_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wire.varint');
/**
 * Options for parsing binary data.
 * @record
 */
function BinaryReadOptions() { }
exports.BinaryReadOptions = BinaryReadOptions;
/* istanbul ignore if */
if (false) {
    /**
     * Retain unknown fields during parsing? The default behavior is to retain
     * unknown fields and include them in the serialized output.
     *
     * For more details see https://developers.google.com/protocol-buffers/docs/proto3#unknowns
     * @type {boolean}
     * @public
     */
    BinaryReadOptions.prototype.readUnknownFields;
}
// Default options for parsing binary data.
/** @type {?} */
const readDefaults = {
    readUnknownFields: true,
};
/**
 * @param {(undefined|?)=} options
 * @return {?}
 */
function makeReadOptions(options) {
    return options ? { ...readDefaults, ...options } : readDefaults;
}
/**
 * Parse serialized binary data.
 * @template Desc
 * @param {Desc} schema
 * @param {!Uint8Array} bytes
 * @param {(undefined|?)=} options
 * @return {?}
 */
function fromBinary(schema, bytes, options) {
    /** @type {!tsickle_reflect_3.ReflectMessage} */
    const msg = (0, reflect_js_1.reflect)(schema, undefined, false);
    readMessage(msg, new binary_encoding_js_1.BinaryReader(bytes), makeReadOptions(options), false, bytes.byteLength);
    return (/** @type {?} */ (msg.message));
}
exports.fromBinary = fromBinary;
/**
 * Parse from binary data, merging fields.
 *
 * Repeated fields are appended. Map entries are added, overwriting
 * existing keys.
 *
 * If a message field is already present, it will be merged with the
 * new data.
 * @template Desc
 * @param {Desc} schema
 * @param {?} target
 * @param {!Uint8Array} bytes
 * @param {(undefined|?)=} options
 * @return {?}
 */
function mergeFromBinary(schema, target, bytes, options) {
    readMessage((0, reflect_js_1.reflect)(schema, target, false), new binary_encoding_js_1.BinaryReader(bytes), makeReadOptions(options), false, bytes.byteLength);
    return target;
}
exports.mergeFromBinary = mergeFromBinary;
/**
 * If `delimited` is false, read the length given in `lengthOrDelimitedFieldNo`.
 *
 * If `delimited` is true, read until an EndGroup tag. `lengthOrDelimitedFieldNo`
 * is the expected field number.
 *
 * @param {!tsickle_reflect_3.ReflectMessage} message
 * @param {!tsickle_binary_encoding_6.BinaryReader} reader
 * @param {!BinaryReadOptions} options
 * @param {boolean} delimited
 * @param {number} lengthOrDelimitedFieldNo
 * @return {void}
 */
function readMessage(message, reader, options, delimited, lengthOrDelimitedFieldNo) {
    /** @type {number} */
    const end = delimited ? reader.len : reader.pos + lengthOrDelimitedFieldNo;
    /** @type {(undefined|number)} */
    let fieldNo;
    /** @type {(undefined|!tsickle_binary_encoding_6.WireType)} */
    let wireType;
    /** @type {!Array<{no: number, wireType: !tsickle_binary_encoding_6.WireType, data: !Uint8Array}>} */
    const unknownFields = message.getUnknown() ?? [];
    while (reader.pos < end) {
        [fieldNo, wireType] = reader.tag();
        if (delimited && wireType == binary_encoding_js_1.WireType.EndGroup) {
            break;
        }
        /** @type {(undefined|?)} */
        const field = message.findNumber(fieldNo);
        if (!field) {
            /** @type {!Uint8Array} */
            const data = reader.skip(wireType, fieldNo);
            if (options.readUnknownFields) {
                unknownFields.push({ no: fieldNo, wireType, data });
            }
            continue;
        }
        readField(message, reader, field, wireType, options);
    }
    if (delimited) {
        if (wireType != binary_encoding_js_1.WireType.EndGroup || fieldNo !== lengthOrDelimitedFieldNo) {
            throw new Error("invalid end group tag");
        }
    }
    if (unknownFields.length > 0) {
        message.setUnknown(unknownFields);
    }
}
/**
 * @param {!tsickle_reflect_3.ReflectMessage} message
 * @param {!tsickle_binary_encoding_6.BinaryReader} reader
 * @param {?} field
 * @param {!tsickle_binary_encoding_6.WireType} wireType
 * @param {!BinaryReadOptions} options
 * @return {void}
 */
function readField(message, reader, field, wireType, options) {
    switch (field.fieldKind) {
        case "scalar":
            message.set(field, readScalar(reader, field.scalar));
            break;
        case "enum":
            /** @type {(string|number|bigint|boolean|!Uint8Array)} */
            const val = readScalar(reader, descriptors_js_1.ScalarType.INT32);
            if (field.enum.open) {
                message.set(field, val);
            }
            else {
                /** @type {boolean} */
                const ok = field.enum.values.some((/**
                 * @param {!tsickle_descriptors_1.DescEnumValue} v
                 * @return {boolean}
                 */
                (v) => v.number === val));
                if (ok) {
                    message.set(field, val);
                }
                else if (options.readUnknownFields) {
                    /** @type {!Array<number>} */
                    const bytes = [];
                    (0, varint_js_1.varint32write)((/** @type {number} */ (val)), bytes);
                    /** @type {!Array<{no: number, wireType: !tsickle_binary_encoding_6.WireType, data: !Uint8Array}>} */
                    const unknownFields = message.getUnknown() ?? [];
                    unknownFields.push({
                        no: field.number,
                        wireType,
                        data: new Uint8Array(bytes),
                    });
                    message.setUnknown(unknownFields);
                }
            }
            break;
        case "message":
            message.set(field, readMessageField(reader, options, field, message.get(field)));
            break;
        case "list":
            readListField(reader, wireType, message.get(field), options);
            break;
        case "map":
            readMapEntry(reader, message.get(field), options);
            break;
    }
}
exports.readField = readField;
// Read a map field, expecting key field = 1, value field = 2
/**
 * @param {!tsickle_binary_encoding_6.BinaryReader} reader
 * @param {!tsickle_reflect_3.ReflectMap<*, *>} map
 * @param {!BinaryReadOptions} options
 * @return {void}
 */
function readMapEntry(reader, map, options) {
    /** @type {?} */
    const field = map.field();
    /** @type {(undefined|string|number|bigint|boolean|!Uint8Array)} */
    let key;
    /** @type {(undefined|string|number|bigint|boolean|!Uint8Array|!tsickle_reflect_3.ReflectMessage)} */
    let val;
    // Read the length of the map entry, which is a varint.
    /** @type {number} */
    const len = reader.uint32();
    // WARNING: Calculate end AFTER advancing reader.pos (above), so that
    //          reader.pos is at the start of the map entry.
    /** @type {number} */
    const end = reader.pos + len;
    while (reader.pos < end) {
        const [fieldNo__tsickle_destructured_1] = reader.tag();
        const fieldNo = /** @type {number} */ (fieldNo__tsickle_destructured_1);
        switch (fieldNo) {
            case 1:
                key = readScalar(reader, field.mapKey);
                break;
            case 2:
                switch (field.mapKind) {
                    case "scalar":
                        val = readScalar(reader, field.scalar);
                        break;
                    case "enum":
                        val = reader.int32();
                        break;
                    case "message":
                        val = readMessageField(reader, options, field);
                        break;
                }
                break;
        }
    }
    if (key === undefined) {
        key = (0, scalar_js_1.scalarZeroValue)(field.mapKey, false);
    }
    if (val === undefined) {
        switch (field.mapKind) {
            case "scalar":
                val = (0, scalar_js_1.scalarZeroValue)(field.scalar, false);
                break;
            case "enum":
                val = field.enum.values[0].number;
                break;
            case "message":
                val = (0, reflect_js_1.reflect)(field.message, undefined, false);
                break;
        }
    }
    map.set(key, val);
}
/**
 * @param {!tsickle_binary_encoding_6.BinaryReader} reader
 * @param {!tsickle_binary_encoding_6.WireType} wireType
 * @param {!tsickle_reflect_3.ReflectList<*>} list
 * @param {!BinaryReadOptions} options
 * @return {void}
 */
function readListField(reader, wireType, list, options) {
    /** @type {?} */
    const field = list.field();
    if (field.listKind === "message") {
        list.add(readMessageField(reader, options, field));
        return;
    }
    /** @type {!tsickle_descriptors_1.ScalarType} */
    const scalarType = field.scalar ?? descriptors_js_1.ScalarType.INT32;
    /** @type {boolean} */
    const packed = wireType == binary_encoding_js_1.WireType.LengthDelimited &&
        scalarType != descriptors_js_1.ScalarType.STRING &&
        scalarType != descriptors_js_1.ScalarType.BYTES;
    if (!packed) {
        list.add(readScalar(reader, scalarType));
        return;
    }
    /** @type {number} */
    const e = reader.uint32() + reader.pos;
    while (reader.pos < e) {
        list.add(readScalar(reader, scalarType));
    }
}
/**
 * @param {!tsickle_binary_encoding_6.BinaryReader} reader
 * @param {!BinaryReadOptions} options
 * @param {?} field
 * @param {(undefined|!tsickle_reflect_3.ReflectMessage)=} mergeMessage
 * @return {!tsickle_reflect_3.ReflectMessage}
 */
function readMessageField(reader, options, field, mergeMessage) {
    /** @type {boolean} */
    const delimited = field.delimitedEncoding;
    /** @type {!tsickle_reflect_3.ReflectMessage} */
    const message = mergeMessage ?? (0, reflect_js_1.reflect)(field.message, undefined, false);
    readMessage(message, reader, options, delimited, delimited ? field.number : reader.uint32());
    return message;
}
/**
 * @param {!tsickle_binary_encoding_6.BinaryReader} reader
 * @param {!tsickle_descriptors_1.ScalarType} type
 * @return {(string|number|bigint|boolean|!Uint8Array)}
 */
function readScalar(reader, type) {
    switch (type) {
        case descriptors_js_1.ScalarType.STRING:
            return reader.string();
        case descriptors_js_1.ScalarType.BOOL:
            return reader.bool();
        case descriptors_js_1.ScalarType.DOUBLE:
            return reader.double();
        case descriptors_js_1.ScalarType.FLOAT:
            return reader.float();
        case descriptors_js_1.ScalarType.INT32:
            return reader.int32();
        case descriptors_js_1.ScalarType.INT64:
            return reader.int64();
        case descriptors_js_1.ScalarType.UINT64:
            return reader.uint64();
        case descriptors_js_1.ScalarType.FIXED64:
            return reader.fixed64();
        case descriptors_js_1.ScalarType.BYTES:
            return reader.bytes();
        case descriptors_js_1.ScalarType.FIXED32:
            return reader.fixed32();
        case descriptors_js_1.ScalarType.SFIXED32:
            return reader.sfixed32();
        case descriptors_js_1.ScalarType.SFIXED64:
            return reader.sfixed64();
        case descriptors_js_1.ScalarType.SINT64:
            return reader.sint64();
        case descriptors_js_1.ScalarType.UINT32:
            return reader.uint32();
        case descriptors_js_1.ScalarType.SINT32:
            return reader.sint32();
    }
}
