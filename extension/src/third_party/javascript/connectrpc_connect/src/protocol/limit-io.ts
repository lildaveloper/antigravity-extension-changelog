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
 * Generated from: third_party/javascript/connectrpc_connect/src/protocol/limit-io.ts
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
goog.module('google3.third_party.javascript.connectrpc_connect.src.protocol.limit$2dio');
var module = module || { id: 'third_party/javascript/connectrpc_connect/src/protocol/limit-io.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_connect_error_1 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.connect$2derror");
const tsickle_code_2 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.code");
const connect_error_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.connect$2derror');
const code_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.code');
/**
 * At most, allow ~4GiB to be received or sent per message.
 * zlib used by Node.js caps maxOutputLength at this value. It also happens to
 * be the maximum theoretical message size supported by protobuf-es.
 * @type {number}
 */
const maxReadMaxBytes = 0xffffffff;
/** @type {number} */
const maxWriteMaxBytes = maxReadMaxBytes;
/**
 * The default value for the compressMinBytes option. The CPU cost of compressing
 * very small messages usually isn't worth the small reduction in network I/O, so
 * the default value is 1 kibibyte.
 * @type {number}
 */
const defaultCompressMinBytes = 1024;
/**
 * Asserts that the options writeMaxBytes, readMaxBytes, and compressMinBytes
 * are within sane limits, and returns default values where no value is
 * provided.
 *
 * @param {(undefined|number)} readMaxBytes
 * @param {(undefined|number)} writeMaxBytes
 * @param {(undefined|number)} compressMinBytes
 * @return {{readMaxBytes: number, writeMaxBytes: number, compressMinBytes: number}}
 */
function validateReadWriteMaxBytes(readMaxBytes, writeMaxBytes, compressMinBytes) {
    writeMaxBytes ??= maxWriteMaxBytes;
    readMaxBytes ??= maxReadMaxBytes;
    compressMinBytes ??= defaultCompressMinBytes;
    if (writeMaxBytes < 1 || writeMaxBytes > maxWriteMaxBytes) {
        throw new connect_error_js_1.ConnectError(`writeMaxBytes ${writeMaxBytes} must be >= 1 and <= ${maxWriteMaxBytes}`, code_js_1.Code.Internal);
    }
    if (readMaxBytes < 1 || readMaxBytes > maxReadMaxBytes) {
        throw new connect_error_js_1.ConnectError(`readMaxBytes ${readMaxBytes} must be >= 1 and <= ${maxReadMaxBytes}`, code_js_1.Code.Internal);
    }
    return {
        readMaxBytes,
        writeMaxBytes,
        compressMinBytes,
    };
}
exports.validateReadWriteMaxBytes = validateReadWriteMaxBytes;
/**
 * Raise an error ResourceExhausted if more than writeMaxByte are written.
 *
 * @param {number} writeMaxBytes
 * @param {number} bytesWritten
 * @return {void}
 */
function assertWriteMaxBytes(writeMaxBytes, bytesWritten) {
    if (bytesWritten > writeMaxBytes) {
        throw new connect_error_js_1.ConnectError(`message size ${bytesWritten} is larger than configured writeMaxBytes ${writeMaxBytes}`, code_js_1.Code.ResourceExhausted);
    }
}
exports.assertWriteMaxBytes = assertWriteMaxBytes;
/**
 * Raise an error ResourceExhausted if more than readMaxBytes are read.
 *
 * @param {number} readMaxBytes
 * @param {number} bytesRead
 * @param {boolean=} totalSizeKnown
 * @return {void}
 */
function assertReadMaxBytes(readMaxBytes, bytesRead, totalSizeKnown = false) {
    if (bytesRead > readMaxBytes) {
        /** @type {string} */
        let message = `message size is larger than configured readMaxBytes ${readMaxBytes}`;
        if (totalSizeKnown) {
            message = `message size ${bytesRead} is larger than configured readMaxBytes ${readMaxBytes}`;
        }
        throw new connect_error_js_1.ConnectError(message, code_js_1.Code.ResourceExhausted);
    }
}
exports.assertReadMaxBytes = assertReadMaxBytes;
