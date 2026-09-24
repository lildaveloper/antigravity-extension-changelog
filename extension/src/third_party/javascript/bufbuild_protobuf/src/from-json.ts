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
 * Generated from: third_party/javascript/bufbuild_protobuf/src/from-json.ts
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
goog.module('google3.third_party.javascript.bufbuild_protobuf.src.from$2djson');
var module = module || { id: 'third_party/javascript/bufbuild_protobuf/src/from-json.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_descriptors_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.descriptors");
const tsickle_json_value_2 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.json$2dvalue");
const tsickle_proto_int64_3 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.proto$2dint64");
const tsickle_create_4 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.create");
const tsickle_registry_5 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.registry");
const tsickle_reflect_types_6 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.reflect$2dtypes");
const tsickle_reflect_7 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.reflect");
const tsickle_error_8 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.error");
const tsickle_reflect_check_9 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.reflect$2dcheck");
const tsickle_scalar_10 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.scalar");
const tsickle_types_11 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.types");
const tsickle_base64_encoding_12 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wire.base64$2dencoding");
const tsickle_wkt_13 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wkt.index");
const tsickle_extensions_14 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.extensions");
const descriptors_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.descriptors');
const proto_int64_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.proto$2dint64');
const create_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.create');
const reflect_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.reflect.reflect');
const error_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.reflect.error');
const reflect_check_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.reflect.reflect$2dcheck');
const scalar_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.reflect.scalar');
const base64_encoding_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wire.base64$2dencoding');
const index_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wkt.index');
const extensions_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.extensions');
/**
 * Options for parsing JSON data.
 * @record
 */
function JsonReadOptions() { }
exports.JsonReadOptions = JsonReadOptions;
/* istanbul ignore if */
if (false) {
    /**
     * Ignore unknown fields: Proto3 JSON parser should reject unknown fields
     * by default. This option ignores unknown fields in parsing, as well as
     * unrecognized enum string representations.
     * @type {boolean}
     * @public
     */
    JsonReadOptions.prototype.ignoreUnknownFields;
    /**
     * This option is required to read `google.protobuf.Any` and extensions
     * from JSON format.
     * @type {(undefined|!tsickle_registry_5.Registry)}
     * @public
     */
    JsonReadOptions.prototype.registry;
}
// Default options for parsing JSON.
/** @type {?} */
const jsonReadDefaults = {
    ignoreUnknownFields: false,
};
/**
 * @param {(undefined|?)=} options
 * @return {?}
 */
function makeReadOptions(options) {
    return options ? { ...jsonReadDefaults, ...options } : jsonReadDefaults;
}
/**
 * Parse a message from a JSON string.
 * @template Desc
 * @param {Desc} schema
 * @param {string} json
 * @param {(undefined|?)=} options
 * @return {?}
 */
function fromJsonString(schema, json, options) {
    return fromJson(schema, parseJsonString(json, schema.typeName), options);
}
exports.fromJsonString = fromJsonString;
/**
 * Parse a message from a JSON string, merging fields.
 *
 * Repeated fields are appended. Map entries are added, overwriting
 * existing keys.
 *
 * If a message field is already present, it will be merged with the
 * new data.
 * @template Desc
 * @param {Desc} schema
 * @param {?} target
 * @param {string} json
 * @param {(undefined|?)=} options
 * @return {?}
 */
function mergeFromJsonString(schema, target, json, options) {
    return mergeFromJson(schema, target, parseJsonString(json, schema.typeName), options);
}
exports.mergeFromJsonString = mergeFromJsonString;
/**
 * Parse a message from a JSON value.
 * @template Desc
 * @param {Desc} schema
 * @param {(null|string|number|boolean|!Array<?>|!Object<string,?>)} json
 * @param {(undefined|?)=} options
 * @return {?}
 */
function fromJson(schema, json, options) {
    /** @type {!tsickle_reflect_types_6.ReflectMessage} */
    const msg = (0, reflect_js_1.reflect)(schema);
    try {
        readMessage(msg, json, makeReadOptions(options));
    }
    catch (e) {
        if ((0, error_js_1.isFieldError)(e)) {
            throw new Error(`cannot decode ${(/** @type {!tsickle_error_8.FieldError} */ (e)).field()} from JSON: ${(/** @type {!tsickle_error_8.FieldError} */ (e)).message}`, {
                cause: e,
            });
        }
        throw e;
    }
    return (/** @type {?} */ (msg.message));
}
exports.fromJson = fromJson;
/**
 * Parse a message from a JSON value, merging fields.
 *
 * Repeated fields are appended. Map entries are added, overwriting
 * existing keys.
 *
 * If a message field is already present, it will be merged with the
 * new data.
 * @template Desc
 * @param {Desc} schema
 * @param {?} target
 * @param {(null|string|number|boolean|!Array<?>|!Object<string,?>)} json
 * @param {(undefined|?)=} options
 * @return {?}
 */
function mergeFromJson(schema, target, json, options) {
    try {
        readMessage((0, reflect_js_1.reflect)(schema, target), json, makeReadOptions(options));
    }
    catch (e) {
        if ((0, error_js_1.isFieldError)(e)) {
            throw new Error(`cannot decode ${(/** @type {!tsickle_error_8.FieldError} */ (e)).field()} from JSON: ${(/** @type {!tsickle_error_8.FieldError} */ (e)).message}`, {
                cause: e,
            });
        }
        throw e;
    }
    return target;
}
exports.mergeFromJson = mergeFromJson;
/**
 * Parses an enum value from JSON.
 * @template Desc
 * @param {Desc} descEnum
 * @param {?} json
 * @return {?}
 */
function enumFromJson(descEnum, json) {
    /** @type {(number|symbol)} */
    const val = readEnum(descEnum, json, false, false);
    if (val === tokenIgnoredUnknownEnum) {
        throw new Error(`cannot decode ${descEnum} from JSON: ${(0, reflect_check_js_1.formatVal)(json)}`);
    }
    return (/** @type {?} */ (val));
}
exports.enumFromJson = enumFromJson;
/**
 * Is the given value a JSON enum value?
 * @template Desc
 * @param {Desc} descEnum
 * @param {*} value
 * @return {boolean}
 */
function isEnumJson(descEnum, value) {
    return undefined !== descEnum.values.find((/**
     * @param {!tsickle_descriptors_1.DescEnumValue} v
     * @return {boolean}
     */
    (v) => v.name === value));
}
exports.isEnumJson = isEnumJson;
/**
 * @param {!tsickle_reflect_types_6.ReflectMessage} msg
 * @param {(null|string|number|boolean|!Array<?>|!Object<string,?>)} json
 * @param {!JsonReadOptions} opts
 * @return {void}
 */
function readMessage(msg, json, opts) {
    if (tryWktFromJson(msg, json, opts)) {
        return;
    }
    if (json == null || Array.isArray(json) || typeof json != "object") {
        throw new Error(`cannot decode ${msg.desc} from JSON: ${(0, reflect_check_js_1.formatVal)(json)}`);
    }
    /** @type {!Map<!tsickle_descriptors_1.DescOneof, ?>} */
    const oneofSeen = new Map();
    /** @type {!Map<string, ?>} */
    const jsonNames = new Map();
    for (const field of msg.desc.fields) {
        jsonNames.set(field.name, field).set(field.jsonName, field);
    }
    for (const [jsonKey__tsickle_destructured_1, jsonValue__tsickle_destructured_2] of Object.entries(json)) {
        const jsonKey = /** @type {string} */ (jsonKey__tsickle_destructured_1);
        const jsonValue = /** @type {(null|string|number|boolean|!Array<?>|!Object<string,?>)} */ (jsonValue__tsickle_destructured_2);
        /** @type {(undefined|?)} */
        const field = jsonNames.get(jsonKey);
        if (field) {
            if (field.oneof) {
                if (jsonValue === null && field.fieldKind == "scalar") {
                    // see conformance test Required.Proto3.JsonInput.OneofFieldNull{First,Second}
                    continue;
                }
                /** @type {(undefined|?)} */
                const seen = oneofSeen.get(field.oneof);
                if (seen !== undefined) {
                    throw new error_js_1.FieldError(field.oneof, `oneof set multiple times by ${seen.name} and ${field.name}`);
                }
                oneofSeen.set(field.oneof, field);
            }
            readField(msg, field, jsonValue, opts);
        }
        else {
            /** @type {(undefined|?)} */
            let extension = undefined;
            if (jsonKey.startsWith("[") &&
                jsonKey.endsWith("]") &&
                // biome-ignore lint/suspicious/noAssignInExpressions: no
                (extension = opts.registry?.getExtension(jsonKey.substring(1, jsonKey.length - 1))) &&
                extension.extendee.typeName === msg.desc.typeName) {
                const [container__tsickle_destructured_3, field__tsickle_destructured_4, get__tsickle_destructured_5] = (0, extensions_js_1.createExtensionContainer)(extension);
                const container = /** @type {!tsickle_reflect_types_6.ReflectMessage} */ (container__tsickle_destructured_3);
                const field = /** @type {?} */ (field__tsickle_destructured_4);
                const get = /** @type {function(): *} */ (get__tsickle_destructured_5);
                readField(container, field, jsonValue, opts);
                (0, extensions_js_1.setExtension)(msg.message, extension, get());
            }
            if (!extension && !opts.ignoreUnknownFields) {
                throw new Error(`cannot decode ${msg.desc} from JSON: key "${jsonKey}" is unknown`);
            }
        }
    }
}
/**
 * @param {!tsickle_reflect_types_6.ReflectMessage} msg
 * @param {?} field
 * @param {(null|string|number|boolean|!Array<?>|!Object<string,?>)} json
 * @param {!JsonReadOptions} opts
 * @return {void}
 */
function readField(msg, field, json, opts) {
    switch (field.fieldKind) {
        case "scalar":
            readScalarField(msg, field, json);
            break;
        case "enum":
            readEnumField(msg, field, json, opts);
            break;
        case "message":
            readMessageField(msg, field, json, opts);
            break;
        case "list":
            readListField(msg.get(field), json, opts);
            break;
        case "map":
            readMapField(msg.get(field), json, opts);
            break;
    }
}
/**
 * @param {!tsickle_reflect_types_6.ReflectMap<*, *>} map
 * @param {(null|string|number|boolean|!Array<?>|!Object<string,?>)} json
 * @param {!JsonReadOptions} opts
 * @return {void}
 */
function readMapField(map, json, opts) {
    if (json === null) {
        return;
    }
    /** @type {?} */
    const field = map.field();
    if (typeof json != "object" || Array.isArray(json)) {
        throw new error_js_1.FieldError(field, "expected object, got " + (0, reflect_check_js_1.formatVal)(json));
    }
    for (const [jsonMapKey__tsickle_destructured_6, jsonMapValue__tsickle_destructured_7] of Object.entries(json)) {
        const jsonMapKey = /** @type {string} */ (jsonMapKey__tsickle_destructured_6);
        const jsonMapValue = /** @type {(null|string|number|boolean|!Array<?>|!Object<string,?>)} */ (jsonMapValue__tsickle_destructured_7);
        if (jsonMapValue === null) {
            throw new error_js_1.FieldError(field, "map value must not be null");
        }
        /** @type {*} */
        let value;
        switch (field.mapKind) {
            case "message":
                /** @type {!tsickle_reflect_types_6.ReflectMessage} */
                const msgValue = (0, reflect_js_1.reflect)(field.message);
                readMessage(msgValue, jsonMapValue, opts);
                value = msgValue;
                break;
            case "enum":
                value = readEnum(field.enum, jsonMapValue, opts.ignoreUnknownFields, true);
                if (value === tokenIgnoredUnknownEnum) {
                    return;
                }
                break;
            case "scalar":
                value = scalarFromJson(field, jsonMapValue, true);
                break;
        }
        /** @type {(null|string|number|boolean|!Array<?>|!Object<string,?>)} */
        const key = mapKeyFromJson(field.mapKey, jsonMapKey);
        map.set(key, value);
    }
}
/**
 * @param {!tsickle_reflect_types_6.ReflectList<*>} list
 * @param {(null|string|number|boolean|!Array<?>|!Object<string,?>)} json
 * @param {!JsonReadOptions} opts
 * @return {void}
 */
function readListField(list, json, opts) {
    if (json === null) {
        return;
    }
    /** @type {?} */
    const field = list.field();
    if (!Array.isArray(json)) {
        throw new error_js_1.FieldError(field, "expected Array, got " + (0, reflect_check_js_1.formatVal)(json));
    }
    for (const jsonItem of json) {
        if (jsonItem === null) {
            throw new error_js_1.FieldError(field, "list item must not be null");
        }
        switch (field.listKind) {
            case "message":
                /** @type {!tsickle_reflect_types_6.ReflectMessage} */
                const msgValue = (0, reflect_js_1.reflect)(field.message);
                readMessage(msgValue, jsonItem, opts);
                list.add(msgValue);
                break;
            case "enum":
                /** @type {(number|symbol)} */
                const enumValue = readEnum(field.enum, jsonItem, opts.ignoreUnknownFields, true);
                if (enumValue !== tokenIgnoredUnknownEnum) {
                    list.add(enumValue);
                }
                break;
            case "scalar":
                list.add(scalarFromJson(field, jsonItem, true));
                break;
        }
    }
}
/**
 * @param {!tsickle_reflect_types_6.ReflectMessage} msg
 * @param {?} field
 * @param {(null|string|number|boolean|!Array<?>|!Object<string,?>)} json
 * @param {!JsonReadOptions} opts
 * @return {void}
 */
function readMessageField(msg, field, json, opts) {
    if (json === null && field.message.typeName != "google.protobuf.Value") {
        msg.clear(field);
        return;
    }
    /** @type {!tsickle_reflect_types_6.ReflectMessage} */
    const msgValue = msg.isSet(field) ? msg.get(field) : (0, reflect_js_1.reflect)(field.message);
    readMessage(msgValue, json, opts);
    msg.set(field, msgValue);
}
/**
 * @param {!tsickle_reflect_types_6.ReflectMessage} msg
 * @param {?} field
 * @param {(null|string|number|boolean|!Array<?>|!Object<string,?>)} json
 * @param {!JsonReadOptions} opts
 * @return {void}
 */
function readEnumField(msg, field, json, opts) {
    /** @type {(number|symbol)} */
    const enumValue = readEnum(field.enum, json, opts.ignoreUnknownFields, false);
    if (enumValue === tokenNull) {
        msg.clear(field);
    }
    else if (enumValue !== tokenIgnoredUnknownEnum) {
        msg.set(field, enumValue);
    }
}
/**
 * @param {!tsickle_reflect_types_6.ReflectMessage} msg
 * @param {?} field
 * @param {(null|string|number|boolean|!Array<?>|!Object<string,?>)} json
 * @return {void}
 */
function readScalarField(msg, field, json) {
    /** @type {(null|string|number|bigint|boolean|symbol|!Array<(null|string|number|boolean|?|!Object<string,?>)>|!Object<string,(null|string|number|boolean|!Array<?>|?)>|!Uint8Array)} */
    const scalarValue = scalarFromJson(field, json, false);
    if (scalarValue === tokenNull) {
        msg.clear(field);
    }
    else {
        msg.set(field, scalarValue);
    }
}
/** @type {symbol} */
const tokenIgnoredUnknownEnum = Symbol();
/**
 * @param {!tsickle_descriptors_1.DescEnum} desc
 * @param {(null|string|number|boolean|!Array<?>|!Object<string,?>)} json
 * @param {boolean} ignoreUnknownFields
 * @param {boolean} nullAsZeroValue
 * @return {(number|symbol)}
 */
function readEnum(desc, json, ignoreUnknownFields, nullAsZeroValue) {
    if (json === null) {
        if (desc.typeName == "google.protobuf.NullValue") {
            return 0; // google.protobuf.NullValue.NULL_VALUE = 0
        }
        return nullAsZeroValue ? desc.values[0].number : tokenNull;
    }
    switch (typeof json) {
        case "number":
            if (Number.isInteger(json)) {
                return json;
            }
            break;
        case "string":
            /** @type {(undefined|!tsickle_descriptors_1.DescEnumValue)} */
            const value = desc.values.find((/**
             * @param {!tsickle_descriptors_1.DescEnumValue} ev
             * @return {boolean}
             */
            (ev) => ev.name === json));
            if (value !== undefined) {
                return value.number;
            }
            if (ignoreUnknownFields) {
                return tokenIgnoredUnknownEnum;
            }
            break;
    }
    throw new Error(`cannot decode ${desc} from JSON: ${(0, reflect_check_js_1.formatVal)(json)}`);
}
/** @type {symbol} */
const tokenNull = Symbol();
/**
 * @param {?} field
 * @param {(null|string|number|boolean|!Array<?>|!Object<string,?>)} json
 * @param {boolean} nullAsZeroValue
 * @return {(null|string|number|bigint|boolean|symbol|!Array<(null|string|number|boolean|?|!Object<string,?>)>|!Object<string,(null|string|number|boolean|!Array<?>|?)>|!Uint8Array)}
 */
function scalarFromJson(field, json, nullAsZeroValue) {
    if (json === null) {
        if (nullAsZeroValue) {
            return (0, scalar_js_1.scalarZeroValue)(field.scalar, false);
        }
        return tokenNull;
    }
    // int64, sfixed64, sint64, fixed64, uint64: Reflect supports string and number.
    // string, bool: Supported by reflect.
    switch (field.scalar) {
        // float, double: JSON value will be a number or one of the special string values "NaN", "Infinity", and "-Infinity".
        // Either numbers or strings are accepted. Exponent notation is also accepted.
        case descriptors_js_1.ScalarType.DOUBLE:
        case descriptors_js_1.ScalarType.FLOAT:
            if (json === "NaN")
                return NaN;
            if (json === "Infinity")
                return Number.POSITIVE_INFINITY;
            if (json === "-Infinity")
                return Number.NEGATIVE_INFINITY;
            if (typeof json == "number") {
                if (Number.isNaN(json)) {
                    // NaN must be encoded with string constants
                    throw new error_js_1.FieldError(field, "unexpected NaN number");
                }
                if (!Number.isFinite(json)) {
                    // Infinity must be encoded with string constants
                    throw new error_js_1.FieldError(field, "unexpected infinite number");
                }
                break;
            }
            if (typeof json == "string") {
                if (json === "") {
                    // empty string is not a number
                    break;
                }
                if ((/** @type {string} */ (json)).trim().length !== (/** @type {string} */ (json)).length) {
                    // extra whitespace
                    break;
                }
                /** @type {number} */
                const float = Number(json);
                if (!Number.isFinite(float)) {
                    // Infinity and NaN must be encoded with string constants
                    break;
                }
                return float;
            }
            break;
        // int32, fixed32, uint32: JSON value will be a decimal number. Either numbers or strings are accepted.
        case descriptors_js_1.ScalarType.INT32:
        case descriptors_js_1.ScalarType.FIXED32:
        case descriptors_js_1.ScalarType.SFIXED32:
        case descriptors_js_1.ScalarType.SINT32:
        case descriptors_js_1.ScalarType.UINT32:
            return int32FromJson(json);
        // bytes: JSON value will be the data encoded as a string using standard base64 encoding with paddings.
        // Either standard or URL-safe base64 encoding with/without paddings are accepted.
        case descriptors_js_1.ScalarType.BYTES:
            if (typeof json == "string") {
                if (json === "") {
                    return new Uint8Array(0);
                }
                try {
                    return (0, base64_encoding_js_1.base64Decode)(json);
                }
                catch (e) {
                    /** @type {string} */
                    const message = e instanceof Error ? (/** @type {!Error} */ (e)).message : String(e);
                    throw new error_js_1.FieldError(field, message);
                }
            }
            break;
    }
    return json;
}
/**
 * Try to parse a JSON value to a map key for the reflect API.
 *
 * Returns the input if the JSON value cannot be converted.
 * @param {!tsickle_descriptors_1.ScalarType} type
 * @param {(null|string|number|boolean|!Array<?>|!Object<string,?>)} json
 * @return {(null|string|number|boolean|!Array<?>|!Object<string,?>)}
 */
function mapKeyFromJson(type, json) {
    switch (type) {
        case descriptors_js_1.ScalarType.BOOL:
            switch (json) {
                case "true":
                    return true;
                case "false":
                    return false;
            }
            return json;
        case descriptors_js_1.ScalarType.INT32:
        case descriptors_js_1.ScalarType.FIXED32:
        case descriptors_js_1.ScalarType.UINT32:
        case descriptors_js_1.ScalarType.SFIXED32:
        case descriptors_js_1.ScalarType.SINT32:
            return int32FromJson(json);
        default:
            return json;
    }
}
/**
 * Try to parse a JSON value to a 32-bit integer for the reflect API.
 *
 * Returns the input if the JSON value cannot be converted.
 * @param {(null|string|number|boolean|!Array<?>|!Object<string,?>)} json
 * @return {(null|string|number|boolean|!Array<(null|string|number|boolean|?|!Object<string,?>)>|!Object<string,(null|string|number|boolean|!Array<?>|?)>)}
 */
function int32FromJson(json) {
    if (typeof json == "string") {
        if (json === "") {
            // empty string is not a number
            return json;
        }
        if ((/** @type {string} */ (json)).trim().length !== (/** @type {string} */ (json)).length) {
            // extra whitespace
            return json;
        }
        /** @type {number} */
        const num = Number(json);
        if (Number.isNaN(num)) {
            // not a number
            return json;
        }
        return num;
    }
    return json;
}
/**
 * @param {string} jsonString
 * @param {string} typeName
 * @return {(null|string|number|boolean|!Array<?>|!Object<string,?>)}
 */
function parseJsonString(jsonString, typeName) {
    try {
        return (/** @type {(null|string|number|boolean|!Array<?>|!Object<string,?>)} */ (JSON.parse(jsonString)));
    }
    catch (e) {
        /** @type {string} */
        const message = e instanceof Error ? (/** @type {!Error} */ (e)).message : String(e);
        throw new Error(`cannot decode message ${typeName} from JSON: ${message}`, { cause: e });
    }
}
/**
 * @param {!tsickle_reflect_types_6.ReflectMessage} msg
 * @param {(null|string|number|boolean|!Array<?>|!Object<string,?>)} jsonValue
 * @param {!JsonReadOptions} opts
 * @return {boolean}
 */
function tryWktFromJson(msg, jsonValue, opts) {
    if (!msg.desc.typeName.startsWith("google.protobuf.")) {
        return false;
    }
    switch (msg.desc.typeName) {
        case "google.protobuf.Any":
            anyFromJson((/** @type {?} */ (msg.message)), jsonValue, opts);
            return true;
        case "google.protobuf.Timestamp":
            timestampFromJson((/** @type {?} */ (msg.message)), jsonValue);
            return true;
        case "google.protobuf.Duration":
            durationFromJson((/** @type {?} */ (msg.message)), jsonValue);
            return true;
        case "google.protobuf.FieldMask":
            fieldMaskFromJson((/** @type {?} */ (msg.message)), jsonValue);
            return true;
        case "google.protobuf.Struct":
            structFromJson((/** @type {?} */ (msg.message)), jsonValue);
            return true;
        case "google.protobuf.Value":
            valueFromJson((/** @type {?} */ (msg.message)), jsonValue);
            return true;
        case "google.protobuf.ListValue":
            listValueFromJson((/** @type {?} */ (msg.message)), jsonValue);
            return true;
        default:
            if ((0, index_js_1.isWrapperDesc)(msg.desc)) {
                /** @type {?} */
                const valueField = msg.desc.fields[0];
                if (jsonValue === null) {
                    msg.clear(valueField);
                }
                else {
                    msg.set(valueField, scalarFromJson(valueField, jsonValue, true));
                }
                return true;
            }
            return false;
    }
}
/**
 * @param {?} any
 * @param {(null|string|number|boolean|!Array<?>|!Object<string,?>)} json
 * @param {!JsonReadOptions} opts
 * @return {void}
 */
function anyFromJson(any, json, opts) {
    if (json === null || Array.isArray(json) || typeof json != "object") {
        throw new Error(`cannot decode message ${any.$typeName} from JSON: expected object but got ${(0, reflect_check_js_1.formatVal)(json)}`);
    }
    if (Object.keys(json).length == 0) {
        return;
    }
    /** @type {(null|string|number|boolean|!Array<?>|!Object<string,?>)} */
    const typeUrl = json["@type"];
    if (typeof typeUrl != "string" || typeUrl == "") {
        throw new Error(`cannot decode message ${any.$typeName} from JSON: "@type" is empty`);
    }
    /** @type {string} */
    const typeName = (/** @type {string} */ (typeUrl)).includes("/")
        ? (/** @type {string} */ (typeUrl)).substring((/** @type {string} */ (typeUrl)).lastIndexOf("/") + 1)
        : typeUrl;
    if (!typeName.length) {
        throw new Error(`cannot decode message ${any.$typeName} from JSON: "@type" is invalid`);
    }
    /** @type {(undefined|!tsickle_descriptors_1.DescMessage)} */
    const desc = opts.registry?.getMessage(typeName);
    if (!desc) {
        throw new Error(`cannot decode message ${any.$typeName} from JSON: ${typeUrl} is not in the type registry`);
    }
    /** @type {!tsickle_reflect_types_6.ReflectMessage} */
    const msg = (0, reflect_js_1.reflect)(desc);
    if (typeName.startsWith("google.protobuf.") &&
        Object.prototype.hasOwnProperty.call(json, "value")) {
        /** @type {(null|string|number|boolean|!Array<?>|!Object<string,?>)} */
        const value = (/** @type {(null|string|number|boolean|!Array<?>|!Object<string,?>)} */ ((/** @type {!Object<string,(null|string|number|boolean|!Array<?>|?)>} */ (json)).value));
        readMessage(msg, value, opts);
    }
    else {
        /** @type {!Object<string,(null|string|number|boolean|!Array<?>|?)>} */
        const copy = Object.assign({}, json);
        // biome-ignore lint/performance/noDelete: <explanation>
        delete copy["@type"];
        readMessage(msg, copy, opts);
    }
    (0, index_js_1.anyPack)(msg.desc, msg.message, any);
}
/**
 * @param {?} timestamp
 * @param {(null|string|number|boolean|!Array<?>|!Object<string,?>)} json
 * @return {void}
 */
function timestampFromJson(timestamp, json) {
    if (typeof json !== "string") {
        throw new Error(`cannot decode message ${timestamp.$typeName} from JSON: ${(0, reflect_check_js_1.formatVal)(json)}`);
    }
    /** @type {(null|!RegExpMatchArray)} */
    const matches = (/** @type {string} */ (json)).match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})(?:\.([0-9]{1,9}))?(?:Z|([+-][0-9][0-9]:[0-9][0-9]))$/);
    if (!matches) {
        throw new Error(`cannot decode message ${timestamp.$typeName} from JSON: invalid RFC 3339 string`);
    }
    /** @type {number} */
    const ms = Date.parse(
    // biome-ignore format: want this to read well
    matches[1] + "-" + matches[2] + "-" + matches[3] + "T" + matches[4] + ":" + matches[5] + ":" + matches[6] + (matches[8] ? matches[8] : "Z"));
    if (Number.isNaN(ms)) {
        throw new Error(`cannot decode message ${timestamp.$typeName} from JSON: invalid RFC 3339 string`);
    }
    if (ms < Date.parse("0001-01-01T00:00:00Z") ||
        ms > Date.parse("9999-12-31T23:59:59Z")) {
        throw new Error(`cannot decode message ${timestamp.$typeName} from JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive`);
    }
    timestamp.seconds = proto_int64_js_1.protoInt64.parse(ms / 1000);
    timestamp.nanos = 0;
    if (matches[7]) {
        timestamp.nanos =
            parseInt("1" + matches[7] + "0".repeat(9 - matches[7].length)) -
                1000000000;
    }
}
/**
 * @param {?} duration
 * @param {(null|string|number|boolean|!Array<?>|!Object<string,?>)} json
 * @return {void}
 */
function durationFromJson(duration, json) {
    if (typeof json !== "string") {
        throw new Error(`cannot decode message ${duration.$typeName} from JSON: ${(0, reflect_check_js_1.formatVal)(json)}`);
    }
    /** @type {(null|!RegExpMatchArray)} */
    const match = (/** @type {string} */ (json)).match(/^(-?[0-9]+)(?:\.([0-9]+))?s/);
    if (match === null) {
        throw new Error(`cannot decode message ${duration.$typeName} from JSON: ${(0, reflect_check_js_1.formatVal)(json)}`);
    }
    /** @type {number} */
    const longSeconds = Number(match[1]);
    if (longSeconds > 315576000000 || longSeconds < -315576000000) {
        throw new Error(`cannot decode message ${duration.$typeName} from JSON: ${(0, reflect_check_js_1.formatVal)(json)}`);
    }
    duration.seconds = proto_int64_js_1.protoInt64.parse(longSeconds);
    if (typeof match[2] !== "string") {
        return;
    }
    /** @type {string} */
    const nanosStr = match[2] + "0".repeat(9 - match[2].length);
    duration.nanos = parseInt(nanosStr);
    if (longSeconds < 0 || Object.is(longSeconds, -0)) {
        duration.nanos = -duration.nanos;
    }
}
/**
 * @param {?} fieldMask
 * @param {(null|string|number|boolean|!Array<?>|!Object<string,?>)} json
 * @return {void}
 */
function fieldMaskFromJson(fieldMask, json) {
    if (typeof json !== "string") {
        throw new Error(`cannot decode message ${fieldMask.$typeName} from JSON: ${(0, reflect_check_js_1.formatVal)(json)}`);
    }
    if (json === "") {
        return;
    }
    /**
     * @param {string} str
     * @return {string}
     */
    function camelToSnake(str) {
        if (str.includes("_")) {
            throw new Error(`cannot decode message ${fieldMask.$typeName} from JSON: path names must be lowerCamelCase`);
        }
        /** @type {string} */
        const sc = str.replace(/[A-Z]/g, (/**
         * @param {string} letter
         * @return {string}
         */
        (letter) => "_" + letter.toLowerCase()));
        return sc[0] === "_" ? sc.substring(1) : sc;
    }
    fieldMask.paths = (/** @type {string} */ (json)).split(",").map(camelToSnake);
}
/**
 * @param {?} struct
 * @param {(null|string|number|boolean|!Array<?>|!Object<string,?>)} json
 * @return {void}
 */
function structFromJson(struct, json) {
    if (typeof json != "object" || json == null || Array.isArray(json)) {
        throw new Error(`cannot decode message ${struct.$typeName} from JSON ${(0, reflect_check_js_1.formatVal)(json)}`);
    }
    for (const [k__tsickle_destructured_8, v__tsickle_destructured_9] of Object.entries(json)) {
        const k = /** @type {string} */ (k__tsickle_destructured_8);
        const v = /** @type {(null|string|number|boolean|!Array<?>|!Object<string,?>)} */ (v__tsickle_destructured_9);
        /** @type {?} */
        const parsedV = (0, create_js_1.create)(index_js_1.ValueSchema);
        valueFromJson(parsedV, v);
        struct.fields[k] = parsedV;
    }
}
/**
 * @param {?} value
 * @param {(null|string|number|boolean|!Array<?>|!Object<string,?>)} json
 * @return {?}
 */
function valueFromJson(value, json) {
    switch (typeof json) {
        case "number":
            value.kind = { case: "numberValue", value: json };
            break;
        case "string":
            value.kind = { case: "stringValue", value: json };
            break;
        case "boolean":
            value.kind = { case: "boolValue", value: json };
            break;
        case "object":
            if (json === null) {
                value.kind = { case: "nullValue", value: index_js_1.NullValue.NULL_VALUE };
            }
            else if (Array.isArray(json)) {
                /** @type {?} */
                const listValue = (0, create_js_1.create)(index_js_1.ListValueSchema);
                listValueFromJson(listValue, json);
                value.kind = { case: "listValue", value: listValue };
            }
            else {
                /** @type {?} */
                const struct = (0, create_js_1.create)(index_js_1.StructSchema);
                structFromJson(struct, json);
                value.kind = { case: "structValue", value: struct };
            }
            break;
        default:
            throw new Error(`cannot decode message ${value.$typeName} from JSON ${(0, reflect_check_js_1.formatVal)(json)}`);
    }
    return value;
}
/**
 * @param {?} listValue
 * @param {(null|string|number|boolean|!Array<?>|!Object<string,?>)} json
 * @return {void}
 */
function listValueFromJson(listValue, json) {
    if (!Array.isArray(json)) {
        throw new Error(`cannot decode message ${listValue.$typeName} from JSON ${(0, reflect_check_js_1.formatVal)(json)}`);
    }
    for (const e of json) {
        /** @type {?} */
        const value = (0, create_js_1.create)(index_js_1.ValueSchema);
        valueFromJson(value, e);
        listValue.values.push(value);
    }
}
