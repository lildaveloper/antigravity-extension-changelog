/**
 * @license
 * Copyright 2021-2025 The Connect Authors
 * SPDX-License-Identifier: Apache-2.0
 */
// Copyright 2021-2025 The Connect Authors
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
 * Generated from: third_party/javascript/connectrpc_connect/src/protocol-connect/code-string.ts
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
goog.module('google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.code$2dstring');
var module = module || { id: 'third_party/javascript/connectrpc_connect/src/protocol-connect/code-string.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_code_1 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.code");
const code_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.code');
/**
 * codeToString returns the string representation of a Code.
 *
 * @param {!tsickle_code_1.Code} value
 * @return {string}
 */
function codeToString(value) {
    /** @type {(undefined|string)} */
    const name = (/** @type {(undefined|string)} */ (code_js_1.Code[value]));
    if (typeof name != "string") {
        return value.toString();
    }
    return (name[0].toLowerCase() +
        name.substring(1).replace(/[A-Z]/g, (/**
         * @param {string} c
         * @return {string}
         */
        (c) => "_" + c.toLowerCase())));
}
exports.codeToString = codeToString;
/** @type {(undefined|?)} */
let stringToCode;
/**
 * codeFromString parses the string representation of a Code in snake_case.
 * For example, the string "permission_denied" parses into Code.PermissionDenied.
 *
 * If the given string cannot be parsed, the function returns undefined.
 *
 * @param {string} value
 * @return {(undefined|!tsickle_code_1.Code)}
 */
function codeFromString(value) {
    if (!stringToCode) {
        stringToCode = {};
        for (const value of Object.values(code_js_1.Code)) {
            if (typeof value == "string") {
                continue;
            }
            stringToCode[codeToString(value)] = value;
        }
    }
    return stringToCode[value];
}
exports.codeFromString = codeFromString;
