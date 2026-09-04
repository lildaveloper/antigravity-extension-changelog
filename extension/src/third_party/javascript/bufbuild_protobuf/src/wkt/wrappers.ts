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
 * Generated from: third_party/javascript/bufbuild_protobuf/src/wkt/wrappers.ts
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
goog.module('google3.third_party.javascript.bufbuild_protobuf.src.wkt.wrappers');
var module = module || { id: 'third_party/javascript/bufbuild_protobuf/src/wkt/wrappers.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_types_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.types");
const tsickle_wrappers_pb_2 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.wrappers_pb");
const tsickle_descriptors_3 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.descriptors");
/**
 * @param {*} arg
 * @return {boolean}
 */
function isWrapper(arg) {
    return isWrapperTypeName(arg.$typeName);
}
exports.isWrapper = isWrapper;
/** @typedef {?} */
exports.WktWrapperDesc;
/**
 * @param {!tsickle_descriptors_3.DescMessage} messageDesc
 * @return {boolean}
 */
function isWrapperDesc(messageDesc) {
    /** @type {(undefined|?)} */
    const f = (/** @type {(undefined|?)} */ (messageDesc.fields[0]));
    return (isWrapperTypeName(messageDesc.typeName) &&
        f !== undefined &&
        f.fieldKind == "scalar" &&
        f.name == "value" &&
        f.number == 1);
}
exports.isWrapperDesc = isWrapperDesc;
/**
 * @param {string} name
 * @return {boolean}
 */
function isWrapperTypeName(name) {
    return (name.startsWith("google.protobuf.") &&
        [
            "DoubleValue",
            "FloatValue",
            "Int64Value",
            "UInt64Value",
            "Int32Value",
            "UInt32Value",
            "BoolValue",
            "StringValue",
            "BytesValue",
        ].includes(name.substring(16)));
}
