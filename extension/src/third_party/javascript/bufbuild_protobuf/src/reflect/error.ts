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
 * Generated from: third_party/javascript/bufbuild_protobuf/src/reflect/error.ts
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
goog.module('google3.third_party.javascript.bufbuild_protobuf.src.reflect.error');
var module = module || { id: 'third_party/javascript/bufbuild_protobuf/src/reflect/error.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_descriptors_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.descriptors");
/** @type {!Array<string>} */
const errorNames = [
    "FieldValueInvalidError",
    "FieldListRangeError",
    "ForeignFieldError",
];
/**
 * @extends {Error}
 */
class FieldError extends Error {
    /**
     * @public
     * @param {(!tsickle_descriptors_1.DescOneof|?)} fieldOrOneof
     * @param {string} message
     * @param {string=} name
     */
    constructor(fieldOrOneof, message, name = "FieldValueInvalidError") {
        super(message);
        this.name = name;
        this.field = (/**
         * @return {(!tsickle_descriptors_1.DescOneof|?)}
         */
        () => fieldOrOneof);
    }
}
exports.FieldError = FieldError;
/* istanbul ignore if */
if (false) {
    /**
     * @const {function(): (!tsickle_descriptors_1.DescOneof|?)}
     * @public
     */
    FieldError.prototype.field;
    /**
     * @const {string}
     * @public
     */
    FieldError.prototype.name;
}
/**
 * @param {*} arg
 * @return {boolean}
 */
function isFieldError(arg) {
    return (arg instanceof Error &&
        errorNames.includes((/** @type {!Error} */ (arg)).name) &&
        "field" in arg &&
        typeof arg.field == "function");
}
exports.isFieldError = isFieldError;
