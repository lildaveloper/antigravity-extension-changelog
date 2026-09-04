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
 * Generated from: third_party/javascript/connectrpc_connect/src/protocol-connect/http-status.ts
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
goog.module('google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.http$2dstatus');
var module = module || { id: 'third_party/javascript/connectrpc_connect/src/protocol-connect/http-status.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_code_1 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.code");
const code_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.code');
/**
 * Determine the Connect error code for the given HTTP status code.
 * See https://connectrpc.com/docs/protocol/#http-to-error-code
 *
 * @param {number} httpStatus
 * @return {!tsickle_code_1.Code}
 */
function codeFromHttpStatus(httpStatus) {
    switch (httpStatus) {
        case 400: // Bad Request
            return code_js_1.Code.Internal;
        case 401: // Unauthorized
            return code_js_1.Code.Unauthenticated;
        case 403: // Forbidden
            return code_js_1.Code.PermissionDenied;
        case 404: // Not Found
            return code_js_1.Code.Unimplemented;
        case 429: // Too Many Requests
            return code_js_1.Code.Unavailable;
        case 502: // Bad Gateway
            return code_js_1.Code.Unavailable;
        case 503: // Service Unavailable
            return code_js_1.Code.Unavailable;
        case 504: // Gateway Timeout
            return code_js_1.Code.Unavailable;
        default:
            return code_js_1.Code.Unknown;
    }
}
exports.codeFromHttpStatus = codeFromHttpStatus;
/**
 * Returns a HTTP status code for the given Connect code.
 * See https://connectrpc.com/docs/protocol#error-codes
 *
 * @param {!tsickle_code_1.Code} code
 * @return {number}
 */
function codeToHttpStatus(code) {
    switch (code) {
        case code_js_1.Code.Canceled:
            return 499; // Client Closed Request
        case code_js_1.Code.Unknown:
            return 500; // Internal Server Error
        case code_js_1.Code.InvalidArgument:
            return 400; // Bad Request
        case code_js_1.Code.DeadlineExceeded:
            return 504; // Gateway Timeout
        case code_js_1.Code.NotFound:
            return 404; // Not Found
        case code_js_1.Code.AlreadyExists:
            return 409; // Conflict
        case code_js_1.Code.PermissionDenied:
            return 403; // Forbidden
        case code_js_1.Code.ResourceExhausted:
            return 429; // Too Many Requests
        case code_js_1.Code.FailedPrecondition:
            return 400; // Bad Request
        case code_js_1.Code.Aborted:
            return 409; // Conflict
        case code_js_1.Code.OutOfRange:
            return 400; // Bad Request
        case code_js_1.Code.Unimplemented:
            return 501; // Not Implemented
        case code_js_1.Code.Internal:
            return 500; // Internal Server Error
        case code_js_1.Code.Unavailable:
            return 503; // Service Unavailable
        case code_js_1.Code.DataLoss:
            return 500; // Internal Server Error
        case code_js_1.Code.Unauthenticated:
            return 401; // Unauthorized
        default:
            return 500; // same as CodeUnknown
    }
}
exports.codeToHttpStatus = codeToHttpStatus;
