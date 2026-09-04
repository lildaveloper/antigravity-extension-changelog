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
 * Generated from: third_party/javascript/bufbuild_protobuf/src/reflect/guard.ts
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
goog.module('google3.third_party.javascript.bufbuild_protobuf.src.reflect.guard');
var module = module || { id: 'third_party/javascript/bufbuild_protobuf/src/reflect/guard.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_types_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.types");
const tsickle_scalar_2 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.scalar");
const tsickle_reflect_types_3 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.reflect$2dtypes");
const tsickle_unsafe_4 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.unsafe");
const tsickle_descriptors_5 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.descriptors");
const unsafe_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.reflect.unsafe');
/**
 * @param {*} arg
 * @return {boolean}
 */
function isObject(arg) {
    return arg !== null && typeof arg == "object" && !Array.isArray(arg);
}
exports.isObject = isObject;
/**
 * @param {*} arg
 * @return {boolean}
 */
function isOneofADT(arg) {
    return (arg !== null &&
        typeof arg == "object" &&
        "case" in arg &&
        ((typeof arg.case == "string" && "value" in arg && arg.value != null) ||
            (arg.case === undefined &&
                (!("value" in arg) || arg.value === undefined))));
}
exports.isOneofADT = isOneofADT;
/** @typedef {({case: undefined, value: undefined}|{case: string, value: (string|number|bigint|boolean|*|!Uint8Array)})} */
exports.OneofADT;
/**
 * @param {*} arg
 * @param {(undefined|?)=} field
 * @return {boolean}
 */
function isReflectList(arg, field) {
    if (isObject(arg) &&
        unsafe_js_1.unsafeLocal in arg &&
        "add" in arg &&
        "field" in arg &&
        typeof arg.field == "function") {
        if (field !== undefined) {
            /** @type {?} */
            const a = field;
            /** @type {?} */
            const b = (/** @type {?} */ (arg.field()));
            return (a.listKind == b.listKind &&
                a.scalar === b.scalar &&
                a.message?.typeName === b.message?.typeName &&
                a.enum?.typeName === b.enum?.typeName);
        }
        return true;
    }
    return false;
}
exports.isReflectList = isReflectList;
/**
 * @param {*} arg
 * @param {(undefined|?)=} field
 * @return {boolean}
 */
function isReflectMap(arg, field) {
    if (isObject(arg) &&
        unsafe_js_1.unsafeLocal in arg &&
        "has" in arg &&
        "field" in arg &&
        typeof arg.field == "function") {
        if (field !== undefined) {
            /** @type {?} */
            const a = field;
            /** @type {?} */
            const b = (/** @type {?} */ (arg.field()));
            return (a.mapKey === b.mapKey &&
                a.mapKind == b.mapKind &&
                a.scalar === b.scalar &&
                a.message?.typeName === b.message?.typeName &&
                a.enum?.typeName === b.enum?.typeName);
        }
        return true;
    }
    return false;
}
exports.isReflectMap = isReflectMap;
/**
 * @param {*} arg
 * @param {(undefined|!tsickle_descriptors_5.DescMessage)=} messageDesc
 * @return {boolean}
 */
function isReflectMessage(arg, messageDesc) {
    return (isObject(arg) &&
        unsafe_js_1.unsafeLocal in arg &&
        "desc" in arg &&
        isObject(arg.desc) &&
        arg.desc.kind === "message" &&
        (messageDesc === undefined || arg.desc.typeName == messageDesc.typeName));
}
exports.isReflectMessage = isReflectMessage;
