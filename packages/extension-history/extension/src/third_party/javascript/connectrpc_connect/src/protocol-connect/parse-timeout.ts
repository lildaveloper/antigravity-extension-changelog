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
 * Generated from: third_party/javascript/connectrpc_connect/src/protocol-connect/parse-timeout.ts
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
goog.module('google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.parse$2dtimeout');
var module = module || { id: 'third_party/javascript/connectrpc_connect/src/protocol-connect/parse-timeout.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_code_1 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.code");
const tsickle_connect_error_2 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.connect$2derror");
const code_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.code');
const connect_error_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.connect$2derror');
/**
 * Parse a Connect Timeout (Deadline) header.
 *
 * @param {(null|string)} value
 * @param {number} maxTimeoutMs
 * @return {({timeoutMs: (undefined|number), error: undefined}|{timeoutMs: (undefined|number), error: !tsickle_connect_error_2.ConnectError})}
 */
function parseTimeout(value, maxTimeoutMs) {
    if (value === null) {
        return {};
    }
    /** @type {(null|!RegExpExecArray)} */
    const results = /^\d{1,10}$/.exec(value);
    if (results === null) {
        return {
            error: new connect_error_js_1.ConnectError(`protocol error: invalid connect timeout value: ${value}`, code_js_1.Code.InvalidArgument),
        };
    }
    /** @type {number} */
    const timeoutMs = parseInt(results[0]);
    if (timeoutMs > maxTimeoutMs) {
        return {
            timeoutMs: timeoutMs,
            error: new connect_error_js_1.ConnectError(`timeout ${timeoutMs}ms must be <= ${maxTimeoutMs}`, code_js_1.Code.InvalidArgument),
        };
    }
    return {
        timeoutMs: parseInt(results[0]),
    };
}
exports.parseTimeout = parseTimeout;
