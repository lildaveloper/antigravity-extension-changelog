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
 * Generated from: third_party/javascript/bufbuild_protobuf/src/reflect/unsafe.ts
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
goog.module('google3.third_party.javascript.bufbuild_protobuf.src.reflect.unsafe');
var module = module || { id: 'third_party/javascript/bufbuild_protobuf/src/reflect/unsafe.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_descriptors_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.descriptors");
const tsickle_guard_2 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.guard");
const tsickle_scalar_3 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.scalar");
const tsickle_descriptor_pb_4 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.descriptor_pb");
const scalar_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.reflect.scalar');
// bootstrap-inject google.protobuf.FeatureSet.FieldPresence.IMPLICIT: const $name: FeatureSet_FieldPresence.$localName = $number;
/** @type {!tsickle_descriptor_pb_4.FeatureSet_FieldPresence} */
const IMPLICIT = 2;
/** @type {symbol} */
exports.unsafeLocal = Symbol.for("reflect unsafe local");
/**
 * Return the selected field of a oneof group.
 *
 * @param {?} target
 * @param {!tsickle_descriptors_1.DescOneof} oneof
 * @return {(undefined|?)}
 */
function unsafeOneofCase(
// biome-ignore lint/suspicious/noExplicitAny: `any` is the best choice for dynamic access
target, oneof) {
    /** @type {(undefined|string)} */
    const c = ((/** @type {({case: undefined, value: undefined}|{case: string, value: (string|number|bigint|boolean|*|!Uint8Array)})} */ (target[oneof.localName]))).case;
    if (c === undefined) {
        return c;
    }
    return oneof.fields.find((/**
     * @param {?} f
     * @return {boolean}
     */
    (f) => f.localName === c));
}
exports.unsafeOneofCase = unsafeOneofCase;
/**
 * Returns true if the field is set.
 *
 * @param {?} target
 * @param {?} field
 * @return {boolean}
 */
function unsafeIsSet(
// biome-ignore lint/suspicious/noExplicitAny: `any` is the best choice for dynamic access
target, field) {
    /** @type {string} */
    const name = field.localName;
    if (field.oneof) {
        return target[field.oneof.localName].case === name;
    }
    if (field.presence != IMPLICIT) {
        // Fields with explicit presence have properties on the prototype chain
        // for default / zero values (except for proto3).
        return (target[name] !== undefined &&
            Object.prototype.hasOwnProperty.call(target, name));
    }
    switch (field.fieldKind) {
        case "list":
            return ((/** @type {!Array<*>} */ (target[name]))).length > 0;
        case "map":
            return Object.keys(target[name]).length > 0;
        case "scalar":
            return !(0, scalar_js_1.isScalarZeroValue)(field.scalar, target[name]);
        case "enum":
            return target[name] !== field.enum.values[0].number;
    }
    throw new Error("message field with implicit presence");
}
exports.unsafeIsSet = unsafeIsSet;
/**
 * Returns true if the field is set, but only for singular fields with explicit
 * presence (proto2).
 *
 * @param {!Object} target
 * @param {string} localName
 * @return {boolean}
 */
function unsafeIsSetExplicit(target, localName) {
    return (Object.prototype.hasOwnProperty.call(target, localName) &&
        ((/** @type {?} */ (target)))[localName] !== undefined);
}
exports.unsafeIsSetExplicit = unsafeIsSetExplicit;
/**
 * Return a field value, respecting oneof groups.
 *
 * @param {?} target
 * @param {?} field
 * @return {*}
 */
function unsafeGet(target, field) {
    if (field.oneof) {
        /** @type {({case: undefined, value: undefined}|{case: string, value: (string|number|bigint|boolean|*|!Uint8Array)})} */
        const oneof = (/** @type {({case: undefined, value: undefined}|{case: string, value: (string|number|bigint|boolean|*|!Uint8Array)})} */ (target[field.oneof.localName]));
        if (oneof.case === field.localName) {
            return (/** @type {{case: string, value: (string|number|bigint|boolean|*|!Uint8Array)}} */ (oneof)).value;
        }
        return undefined;
    }
    return target[field.localName];
}
exports.unsafeGet = unsafeGet;
/**
 * Set a field value, respecting oneof groups.
 *
 * @param {?} target
 * @param {?} field
 * @param {*} value
 * @return {void}
 */
function unsafeSet(target, field, value) {
    if (field.oneof) {
        target[field.oneof.localName] = {
            case: field.localName,
            value: value,
        };
    }
    else {
        target[field.localName] = value;
    }
}
exports.unsafeSet = unsafeSet;
/**
 * Resets the field, so that unsafeIsSet() will return false.
 *
 * @param {?} target
 * @param {?} field
 * @return {void}
 */
function unsafeClear(
// biome-ignore lint/suspicious/noExplicitAny: `any` is the best choice for dynamic access
target, field) {
    /** @type {string} */
    const name = field.localName;
    if (field.oneof) {
        /** @type {string} */
        const oneofLocalName = field.oneof.localName;
        if (((/** @type {({case: undefined, value: undefined}|{case: string, value: (string|number|bigint|boolean|*|!Uint8Array)})} */ (target[oneofLocalName]))).case === name) {
            target[oneofLocalName] = { case: undefined };
        }
    }
    else if (field.presence != IMPLICIT) {
        // Fields with explicit presence have properties on the prototype chain
        // for default / zero values (except for proto3). By deleting their own
        // property, the field is reset.
        delete target[name];
    }
    else {
        switch (field.fieldKind) {
            case "map":
                target[name] = {};
                break;
            case "list":
                target[name] = [];
                break;
            case "enum":
                target[name] = field.enum.values[0].number;
                break;
            case "scalar":
                target[name] = (0, scalar_js_1.scalarZeroValue)(field.scalar, field.longAsString);
                break;
        }
    }
}
exports.unsafeClear = unsafeClear;
