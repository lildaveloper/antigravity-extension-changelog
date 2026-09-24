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
 * Generated from: third_party/javascript/bufbuild_protobuf/src/to-json.ts
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
goog.module('google3.third_party.javascript.bufbuild_protobuf.src.to$2djson');
var module = module || { id: 'third_party/javascript/bufbuild_protobuf/src/to-json.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_descriptors_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.descriptors");
const tsickle_json_value_2 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.json$2dvalue");
const tsickle_names_3 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.names");
const tsickle_reflect_4 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.reflect");
const tsickle_registry_5 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.registry");
const tsickle_reflect_types_6 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.reflect$2dtypes");
const tsickle_types_7 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.types");
const tsickle_wkt_8 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wkt.index");
const tsickle_wrappers_9 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wkt.wrappers");
const tsickle_wire_10 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wire.index");
const tsickle_extensions_11 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.extensions");
const tsickle_reflect_check_12 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.reflect$2dcheck");
const descriptors_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.descriptors');
const names_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.reflect.names');
const reflect_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.reflect.reflect');
const index_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wkt.index');
const wrappers_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wkt.wrappers');
const index_js_2 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wire.index');
const extensions_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.extensions');
const reflect_check_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.reflect.reflect$2dcheck');
// bootstrap-inject google.protobuf.FeatureSet.FieldPresence.LEGACY_REQUIRED: const $name: FeatureSet_FieldPresence.$localName = $number;
/** @type {!tsickle_wkt_8.FeatureSet_FieldPresence} */
const LEGACY_REQUIRED = 3;
// bootstrap-inject google.protobuf.FeatureSet.FieldPresence.IMPLICIT: const $name: FeatureSet_FieldPresence.$localName = $number;
/** @type {!tsickle_wkt_8.FeatureSet_FieldPresence} */
const IMPLICIT = 2;
/**
 * Options for serializing to JSON.
 * @record
 */
function JsonWriteOptions() { }
exports.JsonWriteOptions = JsonWriteOptions;
/* istanbul ignore if */
if (false) {
    /**
     * By default, fields with implicit presence are not serialized if they are
     * unset. For example, an empty list field or a proto3 int32 field with 0 is
     * not serialized. With this option enabled, such fields are included in the
     * output.
     * @type {boolean}
     * @public
     */
    JsonWriteOptions.prototype.alwaysEmitImplicit;
    /**
     * Emit enum values as integers instead of strings: The name of an enum
     * value is used by default in JSON output. An option may be provided to
     * use the numeric value of the enum value instead.
     * @type {boolean}
     * @public
     */
    JsonWriteOptions.prototype.enumAsInteger;
    /**
     * Use proto field name instead of lowerCamelCase name: By default proto3
     * JSON printer should convert the field name to lowerCamelCase and use
     * that as the JSON name. An implementation may provide an option to use
     * proto field name as the JSON name instead. Proto3 JSON parsers are
     * required to accept both the converted lowerCamelCase name and the proto
     * field name.
     * @type {boolean}
     * @public
     */
    JsonWriteOptions.prototype.useProtoFieldName;
    /**
     * This option is required to write `google.protobuf.Any` and extensions
     * to JSON format.
     * @type {(undefined|!tsickle_registry_5.Registry)}
     * @public
     */
    JsonWriteOptions.prototype.registry;
}
/**
 * Options for serializing to JSON.
 * @record
 * @extends {JsonWriteOptions}
 */
function JsonWriteStringOptions() { }
exports.JsonWriteStringOptions = JsonWriteStringOptions;
/* istanbul ignore if */
if (false) {
    /**
     * Format JSON with indentation. Indicates the number of space characters to
     * be used as indentation.
     *
     * This option is passed to JSON.stringify as `space`.
     * @type {number}
     * @public
     */
    JsonWriteStringOptions.prototype.prettySpaces;
}
// Default options for serializing to JSON.
/** @type {?} */
const jsonWriteDefaults = {
    alwaysEmitImplicit: false,
    enumAsInteger: false,
    useProtoFieldName: false,
};
/**
 * @param {(undefined|?)=} options
 * @return {?}
 */
function makeWriteOptions(options) {
    return options ? { ...jsonWriteDefaults, ...options } : jsonWriteDefaults;
}
/**
 * Serialize the message to a JSON value, a JavaScript value that can be
 * passed to JSON.stringify().
 *
 * @nosideeffects
 * @template Desc, Opts
 * @param {Desc} schema
 * @param {?} message
 * @param {(undefined|Opts)=} options
 * @return {?}
 */
function toJson(schema, message, options) {
    return (/** @type {?} */ (reflectToJson((0, reflect_js_1.reflect)(schema, message), makeWriteOptions(options))));
}
exports.toJson = toJson;
/** @typedef {?} */
var ToJson;
/**
 * Serialize the message to a JSON string.
 * @template Desc
 * @param {Desc} schema
 * @param {?} message
 * @param {(undefined|?)=} options
 * @return {string}
 */
function toJsonString(schema, message, options) {
    /** @type {(null|string|number|boolean|!Array<?>|!Object<string,?>)} */
    const jsonValue = toJson(schema, message, options);
    return JSON.stringify(jsonValue, null, options?.prettySpaces ?? 0);
}
exports.toJsonString = toJsonString;
/**
 * Serialize a single enum value to JSON.
 * @template Desc
 * @param {Desc} descEnum
 * @param {?} value
 * @return {?}
 */
function enumToJson(descEnum, value) {
    if (descEnum.typeName == "google.protobuf.NullValue") {
        return (/** @type {?} */ (null));
    }
    /** @type {(undefined|string)} */
    const name = ((/** @type {(undefined|!tsickle_descriptors_1.DescEnumValue)} */ (descEnum.value[value])))?.name;
    if (name === undefined) {
        throw new Error(`${value} is not a value in ${descEnum}`);
    }
    return (/** @type {?} */ (name));
}
exports.enumToJson = enumToJson;
/**
 * @param {!tsickle_reflect_types_6.ReflectMessage} msg
 * @param {!JsonWriteOptions} opts
 * @return {(null|string|number|boolean|!Array<?>|!Object<string,?>)}
 */
function reflectToJson(msg, opts) {
    /** @type {(undefined|null|string|number|boolean|!Array<(null|string|number|boolean|?|!Object<string,?>)>|!Object<string,(null|string|number|boolean|!Array<?>|?)>)} */
    const wktJson = tryWktToJson(msg, opts);
    if (wktJson !== undefined)
        return wktJson;
    /** @type {!Object<string,(null|string|number|boolean|!Array<?>|?)>} */
    const json = {};
    for (const f of msg.sortedFields) {
        if (!msg.isSet(f)) {
            if (f.presence == LEGACY_REQUIRED) {
                throw new Error(`cannot encode ${f} to JSON: required field not set`);
            }
            if (!opts.alwaysEmitImplicit || f.presence !== IMPLICIT) {
                // Fields with implicit presence omit zero values (e.g. empty string) by default
                continue;
            }
        }
        /** @type {(undefined|null|string|number|boolean|!Array<(null|string|number|boolean|?|!Object<string,?>)>|!Object<string,(null|string|number|boolean|!Array<?>|?)>)} */
        const jsonValue = fieldToJson(f, msg.get(f), opts);
        if (jsonValue !== undefined) {
            json[jsonName(f, opts)] = jsonValue;
        }
    }
    if (opts.registry) {
        /** @type {!Set<number>} */
        const tagSeen = new Set();
        for (const { no } of msg.getUnknown() ?? []) {
            // Same tag can appear multiple times, so we
            // keep track and skip identical ones.
            if (!tagSeen.has(no)) {
                tagSeen.add(no);
                /** @type {(undefined|?)} */
                const extension = opts.registry.getExtensionFor(msg.desc, no);
                if (!extension) {
                    continue;
                }
                /** @type {*} */
                const value = (0, extensions_js_1.getExtension)(msg.message, extension);
                const [container__tsickle_destructured_1, field__tsickle_destructured_2] = (0, extensions_js_1.createExtensionContainer)(extension, value);
                const container = /** @type {!tsickle_reflect_types_6.ReflectMessage} */ (container__tsickle_destructured_1);
                const field = /** @type {?} */ (field__tsickle_destructured_2);
                /** @type {(undefined|null|string|number|boolean|!Array<(null|string|number|boolean|?|!Object<string,?>)>|!Object<string,(null|string|number|boolean|!Array<?>|?)>)} */
                const jsonValue = fieldToJson(field, container.get(field), opts);
                if (jsonValue !== undefined) {
                    json[extension.jsonName] = jsonValue;
                }
            }
        }
    }
    return json;
}
/**
 * @param {?} f
 * @param {*} val
 * @param {!JsonWriteOptions} opts
 * @return {(undefined|null|string|number|boolean|!Array<(null|string|number|boolean|?|!Object<string,?>)>|!Object<string,(null|string|number|boolean|!Array<?>|?)>)}
 */
function fieldToJson(f, val, opts) {
    switch (f.fieldKind) {
        case "scalar":
            return scalarToJson(f, val);
        case "message":
            return reflectToJson((/** @type {!tsickle_reflect_types_6.ReflectMessage} */ (val)), opts);
        case "enum":
            return enumToJsonInternal(f.enum, val, opts.enumAsInteger);
        case "list":
            return listToJson((/** @type {!tsickle_reflect_types_6.ReflectList<*>} */ (val)), opts);
        case "map":
            return mapToJson((/** @type {!tsickle_reflect_types_6.ReflectMap<*, *>} */ (val)), opts);
    }
}
/**
 * @param {!tsickle_reflect_types_6.ReflectMap<*, *>} map
 * @param {!JsonWriteOptions} opts
 * @return {(undefined|!Object<string,(null|string|number|boolean|!Array<?>|?)>)}
 */
function mapToJson(map, opts) {
    /** @type {?} */
    const f = map.field();
    /** @type {!Object<string,(null|string|number|boolean|!Array<?>|?)>} */
    const jsonObj = {};
    switch (f.mapKind) {
        case "scalar":
            for (const [entryKey__tsickle_destructured_3, entryValue__tsickle_destructured_4] of map) {
                const entryKey = /** @type {*} */ (entryKey__tsickle_destructured_3);
                const entryValue = /** @type {*} */ (entryValue__tsickle_destructured_4);
                jsonObj[(/** @type {?} */ (entryKey))] = scalarToJson(f, entryValue);
            }
            break;
        case "message":
            for (const [entryKey__tsickle_destructured_5, entryValue__tsickle_destructured_6] of map) {
                const entryKey = /** @type {*} */ (entryKey__tsickle_destructured_5);
                const entryValue = /** @type {*} */ (entryValue__tsickle_destructured_6);
                jsonObj[(/** @type {?} */ (entryKey))] = reflectToJson((/** @type {!tsickle_reflect_types_6.ReflectMessage} */ (entryValue)), opts);
            }
            break;
        case "enum":
            for (const [entryKey__tsickle_destructured_7, entryValue__tsickle_destructured_8] of map) {
                const entryKey = /** @type {*} */ (entryKey__tsickle_destructured_7);
                const entryValue = /** @type {*} */ (entryValue__tsickle_destructured_8);
                jsonObj[(/** @type {?} */ (entryKey))] = enumToJsonInternal(f.enum, entryValue, opts.enumAsInteger);
            }
            break;
    }
    return opts.alwaysEmitImplicit || map.size > 0 ? jsonObj : undefined;
}
/**
 * @param {!tsickle_reflect_types_6.ReflectList<*>} list
 * @param {!JsonWriteOptions} opts
 * @return {(undefined|!Array<(null|string|number|boolean|!Array<?>|!Object<string,?>)>)}
 */
function listToJson(list, opts) {
    /** @type {?} */
    const f = list.field();
    /** @type {!Array<(null|string|number|boolean|!Array<?>|!Object<string,?>)>} */
    const jsonArr = [];
    switch (f.listKind) {
        case "scalar":
            for (const item of list) {
                jsonArr.push((/** @type {(null|string|number|boolean|!Array<?>|!Object<string,?>)} */ (scalarToJson(f, item))));
            }
            break;
        case "enum":
            for (const item of list) {
                jsonArr.push((/** @type {(null|string|number|boolean|!Array<?>|!Object<string,?>)} */ (enumToJsonInternal(f.enum, item, opts.enumAsInteger))));
            }
            break;
        case "message":
            for (const item of list) {
                jsonArr.push(reflectToJson((/** @type {!tsickle_reflect_types_6.ReflectMessage} */ (item)), opts));
            }
            break;
    }
    return opts.alwaysEmitImplicit || jsonArr.length > 0 ? jsonArr : undefined;
}
/**
 * @param {!tsickle_descriptors_1.DescEnum} desc
 * @param {*} value
 * @param {boolean} enumAsInteger
 * @return {(null|string|number)}
 */
function enumToJsonInternal(desc, value, enumAsInteger) {
    if (typeof value != "number") {
        throw new Error(`cannot encode ${desc} to JSON: expected number, got ${(0, reflect_check_js_1.formatVal)(value)}`);
    }
    if (desc.typeName == "google.protobuf.NullValue") {
        return null;
    }
    if (enumAsInteger) {
        return value;
    }
    /** @type {(undefined|!tsickle_descriptors_1.DescEnumValue)} */
    const val = (/** @type {(undefined|!tsickle_descriptors_1.DescEnumValue)} */ (desc.value[value]));
    return val?.name ?? value; // if we don't know the enum value, just return the number
}
/**
 * @param {?} field
 * @param {*} value
 * @return {(string|number|boolean)}
 */
function scalarToJson(field, value) {
    switch (field.scalar) {
        // int32, fixed32, uint32: JSON value will be a decimal number. Either numbers or strings are accepted.
        case descriptors_js_1.ScalarType.INT32:
        case descriptors_js_1.ScalarType.SFIXED32:
        case descriptors_js_1.ScalarType.SINT32:
        case descriptors_js_1.ScalarType.FIXED32:
        case descriptors_js_1.ScalarType.UINT32:
            if (typeof value != "number") {
                throw new Error(`cannot encode ${field} to JSON: ${(0, reflect_check_js_1.checkField)(field, value)?.message}`);
            }
            return value;
        // float, double: JSON value will be a number or one of the special string values "NaN", "Infinity", and "-Infinity".
        // Either numbers or strings are accepted. Exponent notation is also accepted.
        case descriptors_js_1.ScalarType.FLOAT:
        case descriptors_js_1.ScalarType.DOUBLE: // eslint-disable-line no-fallthrough
            if (typeof value != "number") {
                throw new Error(`cannot encode ${field} to JSON: ${(0, reflect_check_js_1.checkField)(field, value)?.message}`);
            }
            if (Number.isNaN(value))
                return "NaN";
            if (value === Number.POSITIVE_INFINITY)
                return "Infinity";
            if (value === Number.NEGATIVE_INFINITY)
                return "-Infinity";
            return value;
        // string:
        case descriptors_js_1.ScalarType.STRING:
            if (typeof value != "string") {
                throw new Error(`cannot encode ${field} to JSON: ${(0, reflect_check_js_1.checkField)(field, value)?.message}`);
            }
            return value;
        // bool:
        case descriptors_js_1.ScalarType.BOOL:
            if (typeof value != "boolean") {
                throw new Error(`cannot encode ${field} to JSON: ${(0, reflect_check_js_1.checkField)(field, value)?.message}`);
            }
            return value;
        // JSON value will be a decimal string. Either numbers or strings are accepted.
        case descriptors_js_1.ScalarType.UINT64:
        case descriptors_js_1.ScalarType.FIXED64:
        case descriptors_js_1.ScalarType.INT64:
        case descriptors_js_1.ScalarType.SFIXED64:
        case descriptors_js_1.ScalarType.SINT64:
            if (typeof value != "bigint" && typeof value != "string") {
                throw new Error(`cannot encode ${field} to JSON: ${(0, reflect_check_js_1.checkField)(field, value)?.message}`);
            }
            return (/** @type {(string|bigint)} */ (value)).toString();
        // bytes: JSON value will be the data encoded as a string using standard base64 encoding with paddings.
        // Either standard or URL-safe base64 encoding with/without paddings are accepted.
        case descriptors_js_1.ScalarType.BYTES:
            if (value instanceof Uint8Array) {
                return (0, index_js_2.base64Encode)(value);
            }
            throw new Error(`cannot encode ${field} to JSON: ${(0, reflect_check_js_1.checkField)(field, value)?.message}`);
    }
}
/**
 * @param {?} f
 * @param {!JsonWriteOptions} opts
 * @return {string}
 */
function jsonName(f, opts) {
    return opts.useProtoFieldName ? f.name : f.jsonName;
}
// returns a json value if wkt, otherwise returns undefined.
/**
 * @param {!tsickle_reflect_types_6.ReflectMessage} msg
 * @param {!JsonWriteOptions} opts
 * @return {(undefined|null|string|number|boolean|!Array<(null|string|number|boolean|?|!Object<string,?>)>|!Object<string,(null|string|number|boolean|!Array<?>|?)>)}
 */
function tryWktToJson(msg, opts) {
    if (!msg.desc.typeName.startsWith("google.protobuf.")) {
        return undefined;
    }
    switch (msg.desc.typeName) {
        case "google.protobuf.Any":
            return anyToJson((/** @type {?} */ (msg.message)), opts);
        case "google.protobuf.Timestamp":
            return timestampToJson((/** @type {?} */ (msg.message)));
        case "google.protobuf.Duration":
            return durationToJson((/** @type {?} */ (msg.message)));
        case "google.protobuf.FieldMask":
            return fieldMaskToJson((/** @type {?} */ (msg.message)));
        case "google.protobuf.Struct":
            return structToJson((/** @type {?} */ (msg.message)));
        case "google.protobuf.Value":
            return valueToJson((/** @type {?} */ (msg.message)));
        case "google.protobuf.ListValue":
            return listValueToJson((/** @type {?} */ (msg.message)));
        default:
            if ((0, wrappers_js_1.isWrapperDesc)(msg.desc)) {
                /** @type {?} */
                const valueField = msg.desc.fields[0];
                return scalarToJson(valueField, msg.get(valueField));
            }
            return undefined;
    }
}
/**
 * @param {?} val
 * @param {!JsonWriteOptions} opts
 * @return {(null|string|number|boolean|!Array<?>|!Object<string,?>)}
 */
function anyToJson(val, opts) {
    if (val.typeUrl === "") {
        return {};
    }
    const { registry } = opts;
    /** @type {(undefined|*)} */
    let message;
    /** @type {(undefined|!tsickle_descriptors_1.DescMessage)} */
    let desc;
    if (registry) {
        message = (0, index_js_1.anyUnpack)(val, registry);
        if (message) {
            desc = registry.getMessage(message.$typeName);
        }
    }
    if (!desc || !message) {
        throw new Error(`cannot encode message ${val.$typeName} to JSON: "${val.typeUrl}" is not in the type registry`);
    }
    /** @type {(null|string|number|boolean|!Array<?>|!Object<string,?>)} */
    let json = reflectToJson((0, reflect_js_1.reflect)(desc, message), opts);
    if (desc.typeName.startsWith("google.protobuf.") ||
        json === null ||
        Array.isArray(json) ||
        typeof json !== "object") {
        json = { value: json };
    }
    json["@type"] = val.typeUrl;
    return json;
}
/**
 * @param {?} val
 * @return {string}
 */
function durationToJson(val) {
    /** @type {number} */
    const seconds = Number(val.seconds);
    /** @type {number} */
    const nanos = val.nanos;
    if (seconds > 315576000000 || seconds < -315576000000) {
        throw new Error(`cannot encode message ${val.$typeName} to JSON: value out of range`);
    }
    if ((seconds > 0 && nanos < 0) || (seconds < 0 && nanos > 0)) {
        throw new Error(`cannot encode message ${val.$typeName} to JSON: nanos sign must match seconds sign`);
    }
    /** @type {string} */
    let text = val.seconds.toString();
    if (nanos !== 0) {
        /** @type {string} */
        let nanosStr = Math.abs(nanos).toString();
        nanosStr = "0".repeat(9 - nanosStr.length) + nanosStr;
        if (nanosStr.substring(3) === "000000") {
            nanosStr = nanosStr.substring(0, 3);
        }
        else if (nanosStr.substring(6) === "000") {
            nanosStr = nanosStr.substring(0, 6);
        }
        text += "." + nanosStr;
        if (nanos < 0 && seconds == 0) {
            text = "-" + text;
        }
    }
    return text + "s";
}
/**
 * @param {?} val
 * @return {string}
 */
function fieldMaskToJson(val) {
    return val.paths
        .map((/**
     * @param {string} p
     * @return {string}
     */
    (p) => {
        if (p.match(/_[0-9]?_/g) || p.match(/[A-Z]/g)) {
            throw new Error(`cannot encode message ${val.$typeName} to JSON: lowerCamelCase of path name "` +
                p +
                '" is irreversible');
        }
        return (0, names_js_1.protoCamelCase)(p);
    }))
        .join(",");
}
/**
 * @param {?} val
 * @return {!Object<string,(null|string|number|boolean|!Array<?>|?)>}
 */
function structToJson(val) {
    /** @type {!Object<string,(null|string|number|boolean|!Array<?>|?)>} */
    const json = {};
    for (const [k__tsickle_destructured_9, v__tsickle_destructured_10] of Object.entries(val.fields)) {
        const k = /** @type {string} */ (k__tsickle_destructured_9);
        const v = /** @type {?} */ (v__tsickle_destructured_10);
        json[k] = valueToJson(v);
    }
    return json;
}
/**
 * @param {?} val
 * @return {(null|string|number|boolean|!Array<(null|string|number|boolean|!Array<?>|!Object<string,?>)>|!Object<string,(null|string|number|boolean|!Array<?>|?)>)}
 */
function valueToJson(val) {
    switch (val.kind.case) {
        case "nullValue":
            return null;
        case "numberValue":
            if (!Number.isFinite((/** @type {{value: number, case: string}} */ (val.kind)).value)) {
                throw new Error(`${val.$typeName} cannot be NaN or Infinity`);
            }
            return (/** @type {{value: number, case: string}} */ (val.kind)).value;
        case "boolValue":
            return (/** @type {{value: boolean, case: string}} */ (val.kind)).value;
        case "stringValue":
            return (/** @type {{value: string, case: string}} */ (val.kind)).value;
        case "structValue":
            return structToJson((/** @type {{value: ?, case: string}} */ (val.kind)).value);
        case "listValue":
            return listValueToJson((/** @type {{value: ?, case: string}} */ (val.kind)).value);
        default:
            throw new Error(`${val.$typeName} must have a value`);
    }
}
/**
 * @param {?} val
 * @return {!Array<(null|string|number|boolean|!Array<?>|!Object<string,?>)>}
 */
function listValueToJson(val) {
    return val.values.map(valueToJson);
}
/**
 * @param {?} val
 * @return {string}
 */
function timestampToJson(val) {
    /** @type {number} */
    const ms = Number(val.seconds) * 1000;
    if (ms < Date.parse("0001-01-01T00:00:00Z") ||
        ms > Date.parse("9999-12-31T23:59:59Z")) {
        throw new Error(`cannot encode message ${val.$typeName} to JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive`);
    }
    if (val.nanos < 0) {
        throw new Error(`cannot encode message ${val.$typeName} to JSON: nanos must not be negative`);
    }
    if (val.nanos > 999999999) {
        throw new Error(`cannot encode message ${val.$typeName} to JSON: nanos must not be greater than 99999999`);
    }
    /** @type {string} */
    let z = "Z";
    if (val.nanos > 0) {
        /** @type {string} */
        const nanosStr = (val.nanos + 1000000000).toString().substring(1);
        if (nanosStr.substring(3) === "000000") {
            z = "." + nanosStr.substring(0, 3) + "Z";
        }
        else if (nanosStr.substring(6) === "000") {
            z = "." + nanosStr.substring(0, 6) + "Z";
        }
        else {
            z = "." + nanosStr + "Z";
        }
    }
    return new Date(ms).toISOString().replace(".000Z", z);
}
