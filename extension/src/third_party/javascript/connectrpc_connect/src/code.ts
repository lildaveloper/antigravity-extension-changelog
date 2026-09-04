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
 * Generated from: third_party/javascript/connectrpc_connect/src/code.ts
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
goog.module('google3.third_party.javascript.connectrpc_connect.src.code');
var module = module || { id: 'third_party/javascript/connectrpc_connect/src/code.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
/**
 * Connect represents categories of errors as codes, and each code maps to a
 * specific HTTP status code. The codes and their semantics were chosen to
 * match gRPC. Only the codes below are valid — there are no user-defined
 * codes.
 *
 * See the specification at https://connectrpc.com/docs/protocol#error-codes
 * for details.
 * @enum {number}
 */
const Code = {
    /**
     * Canceled, usually by the user
     */
    Canceled: 1,
    /**
     * Unknown error
     */
    Unknown: 2,
    /**
     * Argument invalid regardless of system state
     */
    InvalidArgument: 3,
    /**
     * Operation expired, may or may not have completed.
     */
    DeadlineExceeded: 4,
    /**
     * Entity not found.
     */
    NotFound: 5,
    /**
     * Entity already exists.
     */
    AlreadyExists: 6,
    /**
     * Operation not authorized.
     */
    PermissionDenied: 7,
    /**
     * Quota exhausted.
     */
    ResourceExhausted: 8,
    /**
     * Argument invalid in current system state.
     */
    FailedPrecondition: 9,
    /**
     * Operation aborted.
     */
    Aborted: 10,
    /**
     * Out of bounds, use instead of FailedPrecondition.
     */
    OutOfRange: 11,
    /**
     * Operation not implemented or disabled.
     */
    Unimplemented: 12,
    /**
     * Internal error, reserved for "serious errors".
     */
    Internal: 13,
    /**
     * Unavailable, client should back off and retry.
     */
    Unavailable: 14,
    /**
     * Unrecoverable data loss or corruption.
     */
    DataLoss: 15,
    /**
     * Request isn't authenticated.
     */
    Unauthenticated: 16,
};
exports.Code = Code;
Code[Code.Canceled] = 'Canceled';
Code[Code.Unknown] = 'Unknown';
Code[Code.InvalidArgument] = 'InvalidArgument';
Code[Code.DeadlineExceeded] = 'DeadlineExceeded';
Code[Code.NotFound] = 'NotFound';
Code[Code.AlreadyExists] = 'AlreadyExists';
Code[Code.PermissionDenied] = 'PermissionDenied';
Code[Code.ResourceExhausted] = 'ResourceExhausted';
Code[Code.FailedPrecondition] = 'FailedPrecondition';
Code[Code.Aborted] = 'Aborted';
Code[Code.OutOfRange] = 'OutOfRange';
Code[Code.Unimplemented] = 'Unimplemented';
Code[Code.Internal] = 'Internal';
Code[Code.Unavailable] = 'Unavailable';
Code[Code.DataLoss] = 'DataLoss';
Code[Code.Unauthenticated] = 'Unauthenticated';
