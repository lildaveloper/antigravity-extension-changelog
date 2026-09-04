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
 * Generated from: third_party/javascript/bufbuild_protobuf/src/codegenv2/scalar.ts
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
goog.module('google3.third_party.javascript.bufbuild_protobuf.src.codegenv2.scalar');
var module = module || { id: 'third_party/javascript/bufbuild_protobuf/src/codegenv2/scalar.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_descriptors_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.descriptors");
const descriptors_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.descriptors');
/**
 * Return the TypeScript type (as a string) for the given scalar type.
 * @param {!tsickle_descriptors_1.ScalarType} scalar
 * @param {boolean} longAsString
 * @return {string}
 */
function scalarTypeScriptType(scalar, longAsString) {
    switch (scalar) {
        case descriptors_js_1.ScalarType.STRING:
            return "string";
        case descriptors_js_1.ScalarType.BOOL:
            return "boolean";
        case descriptors_js_1.ScalarType.UINT64:
        case descriptors_js_1.ScalarType.SFIXED64:
        case descriptors_js_1.ScalarType.FIXED64:
        case descriptors_js_1.ScalarType.SINT64:
        case descriptors_js_1.ScalarType.INT64:
            return longAsString ? "string" : "bigint";
        case descriptors_js_1.ScalarType.BYTES:
            return "Uint8Array";
        default:
            return "number";
    }
}
exports.scalarTypeScriptType = scalarTypeScriptType;
/**
 * Return the JSON type (as a string) for the given scalar type.
 * @param {!tsickle_descriptors_1.ScalarType} scalar
 * @return {string}
 */
function scalarJsonType(scalar) {
    switch (scalar) {
        case descriptors_js_1.ScalarType.DOUBLE:
        case descriptors_js_1.ScalarType.FLOAT:
            return `number | "NaN" | "Infinity" | "-Infinity"`;
        case descriptors_js_1.ScalarType.UINT64:
        case descriptors_js_1.ScalarType.SFIXED64:
        case descriptors_js_1.ScalarType.FIXED64:
        case descriptors_js_1.ScalarType.SINT64:
        case descriptors_js_1.ScalarType.INT64:
            return "string";
        case descriptors_js_1.ScalarType.INT32:
        case descriptors_js_1.ScalarType.FIXED32:
        case descriptors_js_1.ScalarType.UINT32:
        case descriptors_js_1.ScalarType.SFIXED32:
        case descriptors_js_1.ScalarType.SINT32:
            return "number";
        case descriptors_js_1.ScalarType.STRING:
            return "string";
        case descriptors_js_1.ScalarType.BOOL:
            return "boolean";
        case descriptors_js_1.ScalarType.BYTES:
            return "string";
    }
}
exports.scalarJsonType = scalarJsonType;
