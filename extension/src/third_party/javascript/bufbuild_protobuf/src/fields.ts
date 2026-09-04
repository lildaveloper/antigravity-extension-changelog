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
 * Generated from: third_party/javascript/bufbuild_protobuf/src/fields.ts
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
goog.module('google3.third_party.javascript.bufbuild_protobuf.src.fields');
var module = module || { id: 'third_party/javascript/bufbuild_protobuf/src/fields.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_types_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.types");
const tsickle_descriptors_2 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.descriptors");
const tsickle_unsafe_3 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.unsafe");
const unsafe_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.reflect.unsafe');
/**
 * Returns true if the field is set.
 *
 * - Scalar and enum fields with implicit presence (proto3):
 *   Set if not a zero value.
 *
 * - Scalar and enum fields with explicit presence (proto2, oneof):
 *   Set if a value was set when creating or parsing the message, or when a
 *   value was assigned to the field's property.
 *
 * - Message fields:
 *   Set if the property is not undefined.
 *
 * - List and map fields:
 *   Set if not empty.
 * @template Desc
 * @param {?} message
 * @param {?} field
 * @return {boolean}
 */
function isFieldSet(message, field) {
    return (field.parent.typeName == (/** @type {*} */ (message)).$typeName && (0, unsafe_js_1.unsafeIsSet)(message, field));
}
exports.isFieldSet = isFieldSet;
/**
 * Resets the field, so that isFieldSet() will return false.
 * @template Desc
 * @param {?} message
 * @param {?} field
 * @return {void}
 */
function clearField(message, field) {
    if (field.parent.typeName == (/** @type {*} */ (message)).$typeName) {
        (0, unsafe_js_1.unsafeClear)(message, field);
    }
}
exports.clearField = clearField;
