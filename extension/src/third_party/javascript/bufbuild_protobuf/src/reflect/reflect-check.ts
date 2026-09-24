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
 * Generated from: third_party/javascript/bufbuild_protobuf/src/reflect/reflect-check.ts
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
goog.module('google3.third_party.javascript.bufbuild_protobuf.src.reflect.reflect$2dcheck');
var module = module || { id: 'third_party/javascript/bufbuild_protobuf/src/reflect/reflect-check.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_descriptors_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.descriptors");
const tsickle_is_message_2 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.is$2dmessage");
const tsickle_error_3 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.error");
const tsickle_guard_4 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.guard");
const tsickle_binary_encoding_5 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wire.binary$2dencoding");
const tsickle_text_encoding_6 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wire.text$2dencoding");
const tsickle_proto_int64_7 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.proto$2dint64");
const tsickle_reflect_types_8 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.reflect$2dtypes");
const descriptors_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.descriptors');
const is_message_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.is$2dmessage');
const error_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.reflect.error');
const guard_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.reflect.guard');
const binary_encoding_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wire.binary$2dencoding');
const text_encoding_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wire.text$2dencoding');
const proto_int64_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.proto$2dint64');
/**
 * Check whether the given field value is valid for the reflect API.
 * @param {?} field
 * @param {*} value
 * @return {(undefined|!tsickle_error_3.FieldError)}
 */
function checkField(field, value) {
    /** @type {(string|boolean)} */
    const check = field.fieldKind == "list"
        ? (0, guard_js_1.isReflectList)(value, field)
        : field.fieldKind == "map"
            ? (0, guard_js_1.isReflectMap)(value, field)
            : checkSingular(field, value);
    if (check === true) {
        return undefined;
    }
    /** @type {string} */
    let reason;
    switch (field.fieldKind) {
        case "list":
            reason = `expected ${formatReflectList(field)}, got ${formatVal(value)}`;
            break;
        case "map":
            reason = `expected ${formatReflectMap(field)}, got ${formatVal(value)}`;
            break;
        default: {
            reason = reasonSingular(field, value, check);
        }
    }
    return new error_js_1.FieldError(field, reason);
}
exports.checkField = checkField;
/**
 * Check whether the given list item is valid for the reflect API.
 * @param {?} field
 * @param {number} index
 * @param {*} value
 * @return {(undefined|!tsickle_error_3.FieldError)}
 */
function checkListItem(field, index, value) {
    /** @type {(string|boolean)} */
    const check = checkSingular(field, value);
    if (check !== true) {
        return new error_js_1.FieldError(field, `list item #${index + 1}: ${reasonSingular(field, value, check)}`);
    }
    return undefined;
}
exports.checkListItem = checkListItem;
/**
 * Check whether the given map key and value are valid for the reflect API.
 * @param {?} field
 * @param {*} key
 * @param {*} value
 * @return {(undefined|!tsickle_error_3.FieldError)}
 */
function checkMapEntry(field, key, value) {
    /** @type {(string|boolean)} */
    const checkKey = checkScalarValue(key, field.mapKey);
    if (checkKey !== true) {
        return new error_js_1.FieldError(field, `invalid map key: ${reasonSingular({ scalar: field.mapKey }, key, checkKey)}`);
    }
    /** @type {(string|boolean)} */
    const checkVal = checkSingular(field, value);
    if (checkVal !== true) {
        return new error_js_1.FieldError(field, `map entry ${formatVal(key)}: ${reasonSingular(field, value, checkVal)}`);
    }
    return undefined;
}
exports.checkMapEntry = checkMapEntry;
/**
 * @param {?} field
 * @param {*} value
 * @return {(string|boolean)}
 */
function checkSingular(field, value) {
    if (field.scalar !== undefined) {
        return checkScalarValue(value, field.scalar);
    }
    if (field.enum !== undefined) {
        if (field.enum.open) {
            return Number.isInteger(value);
        }
        return field.enum.values.some((/**
         * @param {!tsickle_descriptors_1.DescEnumValue} v
         * @return {boolean}
         */
        (v) => v.number === value));
    }
    return (0, guard_js_1.isReflectMessage)(value, field.message);
}
/** @typedef {(string|boolean)} */
var InvalidScalarValueErr;
/**
 * @param {*} value
 * @param {!tsickle_descriptors_1.ScalarType} scalar
 * @return {(string|boolean)}
 */
function checkScalarValue(value, scalar) {
    switch (scalar) {
        case descriptors_js_1.ScalarType.DOUBLE:
            return typeof value == "number";
        case descriptors_js_1.ScalarType.FLOAT:
            if (typeof value != "number") {
                return false;
            }
            if (Number.isNaN(value) || !Number.isFinite(value)) {
                return true;
            }
            if (value > binary_encoding_js_1.FLOAT32_MAX || value < binary_encoding_js_1.FLOAT32_MIN) {
                return `${(/** @type {number} */ (value)).toFixed()} out of range`;
            }
            return true;
        case descriptors_js_1.ScalarType.INT32:
        case descriptors_js_1.ScalarType.SFIXED32:
        case descriptors_js_1.ScalarType.SINT32:
            // signed
            if (typeof value !== "number" || !Number.isInteger(value)) {
                return false;
            }
            if (value > binary_encoding_js_1.INT32_MAX || value < binary_encoding_js_1.INT32_MIN) {
                return `${(/** @type {number} */ (value)).toFixed()} out of range`;
            }
            return true;
        case descriptors_js_1.ScalarType.FIXED32:
        case descriptors_js_1.ScalarType.UINT32:
            // unsigned
            if (typeof value !== "number" || !Number.isInteger(value)) {
                return false;
            }
            if (value > binary_encoding_js_1.UINT32_MAX || value < 0) {
                return `${(/** @type {number} */ (value)).toFixed()} out of range`;
            }
            return true;
        case descriptors_js_1.ScalarType.BOOL:
            return typeof value == "boolean";
        case descriptors_js_1.ScalarType.STRING:
            if (typeof value != "string") {
                return false;
            }
            return (0, text_encoding_js_1.getTextEncoding)().checkUtf8(value) || "invalid UTF8";
        case descriptors_js_1.ScalarType.BYTES:
            return value instanceof Uint8Array;
        case descriptors_js_1.ScalarType.INT64:
        case descriptors_js_1.ScalarType.SFIXED64:
        case descriptors_js_1.ScalarType.SINT64:
            // signed
            if (typeof value == "bigint" ||
                typeof value == "number" ||
                (typeof value == "string" && (/** @type {string} */ (value)).length > 0)) {
                try {
                    proto_int64_js_1.protoInt64.parse(value);
                    return true;
                }
                catch (_) {
                    return `${value} out of range`;
                }
            }
            return false;
        case descriptors_js_1.ScalarType.FIXED64:
        case descriptors_js_1.ScalarType.UINT64:
            // unsigned
            if (typeof value == "bigint" ||
                typeof value == "number" ||
                (typeof value == "string" && (/** @type {string} */ (value)).length > 0)) {
                try {
                    proto_int64_js_1.protoInt64.uParse(value);
                    return true;
                }
                catch (_) {
                    return `${value} out of range`;
                }
            }
            return false;
    }
}
/**
 * @param {({scalar: !tsickle_descriptors_1.ScalarType, message: undefined, enum: undefined}|{scalar: undefined, message: !tsickle_descriptors_1.DescMessage, enum: undefined}|{scalar: undefined, message: undefined, enum: !tsickle_descriptors_1.DescEnum})} field
 * @param {*} val
 * @param {(undefined|string|boolean)=} details
 * @return {string}
 */
function reasonSingular(field, val, details) {
    details =
        typeof details == "string" ? `: ${details}` : `, got ${formatVal(val)}`;
    if (field.scalar !== undefined) {
        return `expected ${scalarTypeDescription((/** @type {{scalar: !tsickle_descriptors_1.ScalarType, message: undefined, enum: undefined}} */ (field)).scalar)}` + details;
    }
    if ((/** @type {({scalar: undefined, message: !tsickle_descriptors_1.DescMessage, enum: undefined}|{scalar: undefined, message: undefined, enum: !tsickle_descriptors_1.DescEnum})} */ (field)).enum !== undefined) {
        return `expected ${(/** @type {{scalar: undefined, message: undefined, enum: !tsickle_descriptors_1.DescEnum}} */ (field)).enum.toString()}` + details;
    }
    return `expected ${formatReflectMessage((/** @type {{scalar: undefined, message: !tsickle_descriptors_1.DescMessage, enum: undefined}} */ (field)).message)}` + details;
}
/**
 * @param {*} val
 * @return {string}
 */
function formatVal(val) {
    switch (typeof val) {
        case "object":
            if (val === null) {
                return "null";
            }
            if (val instanceof Uint8Array) {
                return `Uint8Array(${(/** @type {!Uint8Array} */ (val)).length})`;
            }
            if (Array.isArray(val)) {
                return `Array(${(/** @type {!Array<?>} */ (val)).length})`;
            }
            if ((0, guard_js_1.isReflectList)(val)) {
                return formatReflectList((/** @type {!tsickle_reflect_types_8.ReflectList<*>} */ (val)).field());
            }
            if ((0, guard_js_1.isReflectMap)(val)) {
                return formatReflectMap((/** @type {!tsickle_reflect_types_8.ReflectMap<*, *>} */ (val)).field());
            }
            if ((0, guard_js_1.isReflectMessage)(val)) {
                return formatReflectMessage((/** @type {!tsickle_reflect_types_8.ReflectMessage} */ (val)).desc);
            }
            if ((0, is_message_js_1.isMessage)(val)) {
                return `message ${(/** @type {*} */ (val)).$typeName}`;
            }
            return "object";
        case "string":
            return (/** @type {string} */ (val)).length > 30 ? "string" : `"${(/** @type {string} */ (val)).split('"').join('\\"')}"`;
        case "boolean":
            return String(val);
        case "number":
            return String(val);
        case "bigint":
            return String(val) + "n";
        default:
            // "symbol" | "undefined" | "object" | "function"
            return typeof val;
    }
}
exports.formatVal = formatVal;
/**
 * @param {!tsickle_descriptors_1.DescMessage} desc
 * @return {string}
 */
function formatReflectMessage(desc) {
    return `ReflectMessage (${desc.typeName})`;
}
/**
 * @param {?} field
 * @return {string}
 */
function formatReflectList(field) {
    switch (field.listKind) {
        case "message":
            return `ReflectList (${field.message.toString()})`;
        case "enum":
            return `ReflectList (${field.enum.toString()})`;
        case "scalar":
            return `ReflectList (${descriptors_js_1.ScalarType[field.scalar]})`;
    }
}
/**
 * @param {?} field
 * @return {string}
 */
function formatReflectMap(field) {
    switch (field.mapKind) {
        case "message":
            return `ReflectMap (${descriptors_js_1.ScalarType[field.mapKey]}, ${field.message.toString()})`;
        case "enum":
            return `ReflectMap (${descriptors_js_1.ScalarType[field.mapKey]}, ${field.enum.toString()})`;
        case "scalar":
            return `ReflectMap (${descriptors_js_1.ScalarType[field.mapKey]}, ${descriptors_js_1.ScalarType[field.scalar]})`;
    }
}
/**
 * @param {!tsickle_descriptors_1.ScalarType} scalar
 * @return {string}
 */
function scalarTypeDescription(scalar) {
    switch (scalar) {
        case descriptors_js_1.ScalarType.STRING:
            return "string";
        case descriptors_js_1.ScalarType.BOOL:
            return "boolean";
        case descriptors_js_1.ScalarType.INT64:
        case descriptors_js_1.ScalarType.SINT64:
        case descriptors_js_1.ScalarType.SFIXED64:
            return "bigint (int64)";
        case descriptors_js_1.ScalarType.UINT64:
        case descriptors_js_1.ScalarType.FIXED64:
            return "bigint (uint64)";
        case descriptors_js_1.ScalarType.BYTES:
            return "Uint8Array";
        case descriptors_js_1.ScalarType.DOUBLE:
            return "number (float64)";
        case descriptors_js_1.ScalarType.FLOAT:
            return "number (float32)";
        case descriptors_js_1.ScalarType.FIXED32:
        case descriptors_js_1.ScalarType.UINT32:
            return "number (uint32)";
        case descriptors_js_1.ScalarType.INT32:
        case descriptors_js_1.ScalarType.SFIXED32:
        case descriptors_js_1.ScalarType.SINT32:
            return "number (int32)";
    }
}
