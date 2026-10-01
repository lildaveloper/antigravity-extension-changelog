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
 * Generated from: third_party/javascript/bufbuild_protobuf/src/create.ts
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
goog.module('google3.third_party.javascript.bufbuild_protobuf.src.create');
var module = module || { id: 'third_party/javascript/bufbuild_protobuf/src/create.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_is_message_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.is$2dmessage");
const tsickle_descriptors_2 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.descriptors");
const tsickle_types_3 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.types");
const tsickle_scalar_4 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.scalar");
const tsickle_error_5 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.error");
const tsickle_guard_6 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.guard");
const tsickle_unsafe_7 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.unsafe");
const tsickle_wrappers_8 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wkt.wrappers");
const tsickle_descriptor_pb_9 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.descriptor_pb");
const is_message_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.is$2dmessage');
const descriptors_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.descriptors');
const scalar_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.reflect.scalar');
const guard_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.reflect.guard');
const unsafe_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.reflect.unsafe');
const wrappers_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wkt.wrappers');
// bootstrap-inject google.protobuf.Edition.EDITION_PROTO3: const $name: Edition.$localName = $number;
/** @type {!tsickle_descriptor_pb_9.Edition} */
const EDITION_PROTO3 = 999;
// bootstrap-inject google.protobuf.Edition.EDITION_PROTO2: const $name: Edition.$localName = $number;
/** @type {!tsickle_descriptor_pb_9.Edition} */
const EDITION_PROTO2 = 998;
// bootstrap-inject google.protobuf.FeatureSet.FieldPresence.IMPLICIT: const $name: FeatureSet_FieldPresence.$localName = $number;
/** @type {!tsickle_descriptor_pb_9.FeatureSet_FieldPresence} */
const IMPLICIT = 2;
/**
 * Create a new message instance.
 *
 * The second argument is an optional initializer object, where all fields are
 * optional.
 * @template Desc
 * @param {Desc} schema
 * @param {(undefined|?)=} init
 * @return {?}
 */
function create(schema, init) {
    if ((0, is_message_js_1.isMessage)(init, schema)) {
        return init;
    }
    /** @type {?} */
    const message = (/** @type {?} */ (createZeroMessage(schema)));
    if (init !== undefined) {
        initMessage(schema, message, init);
    }
    return message;
}
exports.create = create;
/**
 * Sets field values from a MessageInitShape on a zero message.
 * @template Desc
 * @param {Desc} messageDesc
 * @param {?} message
 * @param {?} init
 * @return {(!tsickle_error_5.FieldError|?)}
 */
function initMessage(messageDesc, message, init) {
    for (const member of messageDesc.members) {
        /** @type {*} */
        let value = ((/** @type {?} */ (init)))[member.localName];
        if (value == null) {
            // intentionally ignore undefined and null
            continue;
        }
        /** @type {?} */
        let field;
        if (member.kind == "oneof") {
            /** @type {(undefined|?)} */
            const oneofField = (0, unsafe_js_1.unsafeOneofCase)(init, member);
            if (!oneofField) {
                continue;
            }
            field = oneofField;
            value = (0, unsafe_js_1.unsafeGet)(init, oneofField);
        }
        else {
            field = member;
        }
        switch (field.fieldKind) {
            case "message":
                value = toMessage(field, value);
                break;
            case "scalar":
                value = initScalar(field, value);
                break;
            case "list":
                value = initList(field, value);
                break;
            case "map":
                value = initMap(field, value);
                break;
        }
        (0, unsafe_js_1.unsafeSet)(message, field, value);
    }
    return message;
}
/**
 * @param {?} field
 * @param {*} value
 * @return {*}
 */
function initScalar(field, value) {
    if (field.scalar == descriptors_js_1.ScalarType.BYTES) {
        return toU8Arr(value);
    }
    return value;
}
/**
 * @param {?} field
 * @param {*} value
 * @return {*}
 */
function initMap(field, value) {
    if ((0, guard_js_1.isObject)(value)) {
        if (field.scalar == descriptors_js_1.ScalarType.BYTES) {
            return convertObjectValues(value, toU8Arr);
        }
        if (field.mapKind == "message") {
            return convertObjectValues(value, (/**
             * @param {*} val
             * @return {*}
             */
            (val) => toMessage(field, val)));
        }
    }
    return value;
}
/**
 * @param {?} field
 * @param {*} value
 * @return {*}
 */
function initList(field, value) {
    if (Array.isArray(value)) {
        if (field.scalar == descriptors_js_1.ScalarType.BYTES) {
            return (/** @type {!Array<?>} */ (value)).map(toU8Arr);
        }
        if (field.listKind == "message") {
            return (/** @type {!Array<?>} */ (value)).map((/**
             * @param {*} item
             * @return {*}
             */
            (item) => toMessage(field, item)));
        }
    }
    return value;
}
/**
 * @param {?} field
 * @param {*} value
 * @return {*}
 */
function toMessage(field, value) {
    if (field.fieldKind == "message" &&
        !field.oneof &&
        (0, wrappers_js_1.isWrapperDesc)(field.message)) {
        // Types from google/protobuf/wrappers.proto are unwrapped when used in
        // a singular field that is not part of a oneof group.
        return initScalar(field.message.fields[0], value);
    }
    if ((0, guard_js_1.isObject)(value)) {
        if (field.message.typeName == "google.protobuf.Struct" &&
            field.parent.typeName !== "google.protobuf.Value") {
            // google.protobuf.Struct is represented with JsonObject when used in a
            // field, except when used in google.protobuf.Value.
            return value;
        }
        if (!(0, is_message_js_1.isMessage)(value, field.message)) {
            return create(field.message, value);
        }
    }
    return value;
}
// converts any ArrayLike<number> to Uint8Array if necessary.
/**
 * @param {*} value
 * @return {*}
 */
function toU8Arr(value) {
    return Array.isArray(value) ? new Uint8Array(value) : value;
}
/**
 * @param {?} obj
 * @param {function(*): *} fn
 * @return {?}
 */
function convertObjectValues(obj, fn) {
    /** @type {?} */
    const ret = {};
    for (const entry of Object.entries(obj)) {
        ret[entry[0]] = fn(entry[1]);
    }
    return ret;
}
/** @type {symbol} */
const tokenZeroMessageField = Symbol();
/** @type {!WeakMap<!tsickle_descriptors_2.DescMessage, {prototype: ?, members: !Set<(!tsickle_descriptors_2.DescOneof|?)>}>} */
const messagePrototypes = new WeakMap();
/**
 * Create a zero message.
 * @param {!tsickle_descriptors_2.DescMessage} desc
 * @return {*}
 */
function createZeroMessage(desc) {
    /** @type {?} */
    let msg;
    if (!needsPrototypeChain(desc)) {
        msg = {
            $typeName: desc.typeName,
        };
        for (const member of desc.members) {
            if (member.kind == "oneof" || member.presence == IMPLICIT) {
                msg[member.localName] = createZeroField(member);
            }
        }
    }
    else {
        // Support default values and track presence via the prototype chain
        /** @type {(undefined|{prototype: ?, members: !Set<(!tsickle_descriptors_2.DescOneof|?)>})} */
        const cached = messagePrototypes.get(desc);
        /** @type {?} */
        let prototype;
        /** @type {!Set<(!tsickle_descriptors_2.DescOneof|?)>} */
        let members;
        if (cached) {
            ({ prototype, members } = cached);
        }
        else {
            prototype = {};
            members = new Set();
            for (const member of desc.members) {
                if (member.kind == "oneof") {
                    // we can only put immutable values on the prototype,
                    // oneof ADTs are mutable
                    continue;
                }
                if (member.fieldKind != "scalar" && member.fieldKind != "enum") {
                    // only scalar and enum values are immutable, map, list, and message
                    // are not
                    continue;
                }
                if (member.presence == IMPLICIT) {
                    // implicit presence tracks field presence by zero values - e.g. 0, false, "", are unset, 1, true, "x" are set.
                    // message, map, list fields are mutable, and also have IMPLICIT presence.
                    continue;
                }
                members.add(member);
                prototype[member.localName] = createZeroField(member);
            }
            messagePrototypes.set(desc, { prototype, members });
        }
        msg = (/** @type {?} */ (Object.create(prototype)));
        msg.$typeName = desc.typeName;
        for (const member of desc.members) {
            if (members.has(member)) {
                continue;
            }
            if (member.kind == "field") {
                if (member.fieldKind == "message") {
                    continue;
                }
                if (member.fieldKind == "scalar" || member.fieldKind == "enum") {
                    if (member.presence != IMPLICIT) {
                        continue;
                    }
                }
            }
            msg[(/** @type {(!tsickle_descriptors_2.DescOneof|?)} */ (member)).localName] = createZeroField(member);
        }
    }
    return (/** @type {*} */ (msg));
}
/**
 * Do we need the prototype chain to track field presence?
 * @param {!tsickle_descriptors_2.DescMessage} desc
 * @return {boolean}
 */
function needsPrototypeChain(desc) {
    switch (desc.file.edition) {
        case EDITION_PROTO3:
            // proto3 always uses implicit presence, we never need the prototype chain.
            return false;
        case EDITION_PROTO2:
            // proto2 never uses implicit presence, we always need the prototype chain.
            return true;
        default:
            // If a message uses scalar or enum fields with explicit presence, we need
            // the prototype chain to track presence. This rule does not apply to fields
            // in a oneof group - they use a different mechanism to track presence.
            return desc.fields.some((/**
             * @param {?} f
             * @return {boolean}
             */
            (f) => f.presence != IMPLICIT && f.fieldKind != "message" && !f.oneof));
    }
}
/**
 * Returns a zero value for oneof groups, and for every field kind except
 * messages. Scalar and enum fields can have default values.
 * @param {(!tsickle_descriptors_2.DescOneof|?)} field
 * @return {(string|number|bigint|boolean|symbol|!Object|!Uint8Array|{case: undefined, value: undefined}|{case: string, value: (string|number|bigint|boolean|*|!Uint8Array)}|!Array<?>)}
 */
function createZeroField(field) {
    if (field.kind == "oneof") {
        return { case: undefined };
    }
    if (field.fieldKind == "list") {
        return [];
    }
    if (field.fieldKind == "map") {
        return {}; // Object.create(null) would be desirable here, but is unsupported by react https://react.dev/reference/react/use-server#serializable-parameters-and-return-values
    }
    if (field.fieldKind == "message") {
        return tokenZeroMessageField;
    }
    /** @type {(undefined|string|number|bigint|boolean|!Uint8Array)} */
    const defaultValue = field.getDefaultValue();
    if (defaultValue !== undefined) {
        return field.fieldKind == "scalar" && field.longAsString
            ? defaultValue.toString()
            : defaultValue;
    }
    return field.fieldKind == "scalar"
        ? (0, scalar_js_1.scalarZeroValue)(field.scalar, field.longAsString)
        : field.enum.values[0].number;
}
