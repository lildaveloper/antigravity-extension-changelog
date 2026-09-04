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
 * Generated from: third_party/javascript/connectrpc_connect/src/protocol/compression.ts
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
goog.module('google3.third_party.javascript.connectrpc_connect.src.protocol.compression');
var module = module || { id: 'third_party/javascript/connectrpc_connect/src/protocol/compression.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_connect_error_1 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.connect$2derror");
const tsickle_code_2 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.code");
const connect_error_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.connect$2derror');
const code_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.code');
/**
 * compressedFlag indicates that the data in a EnvelopedMessage is
 * compressed. It has the same meaning in the gRPC-Web, gRPC-HTTP2,
 * and Connect protocols.
 *
 * @type {number}
 */
exports.compressedFlag = 0b00000001;
/**
 * Compression provides methods to compress and decompress data with
 * a certain compression algorithm.
 * @record
 */
function Compression() { }
exports.Compression = Compression;
/* istanbul ignore if */
if (false) {
    /**
     * The name of the compression algorithm.
     * @type {string}
     * @public
     */
    Compression.prototype.name;
    /**
     * Compress a chunk of data.
     * @type {function(!Uint8Array): !Promise<!Uint8Array>}
     * @public
     */
    Compression.prototype.compress;
    /**
     * Decompress a chunk of data.
     *
     * A zero-length chunk is acceptable, and will return a zero-length result.
     *
     * Raises a ConnectError with Code.InvalidArgument if the decompressed
     * size exceeds readMaxBytes.
     * @type {function(!Uint8Array, number): !Promise<!Uint8Array>}
     * @public
     */
    Compression.prototype.decompress;
}
/**
 * Validates the request encoding and determines the accepted response encoding.
 *
 * Returns the request and response compression to use. If the client requested
 * an encoding that is not available, the returned object contains an error that
 * must be used for the response.
 *
 * @param {!Array<!Compression>} available
 * @param {(null|string)} requested
 * @param {(null|string)} accepted
 * @param {string} headerNameAcceptEncoding
 * @return {{request: (null|!Compression), response: (null|!Compression), error: (undefined|!tsickle_connect_error_1.ConnectError)}}
 */
function compressionNegotiate(available, requested, // e.g. the value of the Grpc-Encoding header
accepted, // e.g. the value of the Grpc-Accept-Encoding header
headerNameAcceptEncoding) {
    /** @type {?} */
    let request = null;
    /** @type {?} */
    let response = null;
    /** @type {?} */
    let error = undefined;
    if (requested !== null && requested !== "identity") {
        /** @type {(undefined|!Compression)} */
        const found = available.find((/**
         * @param {!Compression} c
         * @return {boolean}
         */
        (c) => c.name === requested));
        if (found) {
            request = found;
        }
        else {
            // To comply with https://github.com/grpc/grpc/blob/master/doc/compression.md
            // and the Connect protocol, we return code "unimplemented" and specify
            // acceptable compression(s).
            /** @type {string} */
            const acceptable = available.map((/**
             * @param {!Compression} c
             * @return {string}
             */
            (c) => c.name)).join(",");
            error = new connect_error_js_1.ConnectError(`unknown compression "${requested}": supported encodings are ${acceptable}`, code_js_1.Code.Unimplemented, {
                [headerNameAcceptEncoding]: acceptable,
            });
        }
    }
    if (accepted === null || accepted === "") {
        // Support asymmetric compression. This logic follows
        // https://github.com/grpc/grpc/blob/master/doc/compression.md and common
        // sense.
        response = request;
    }
    else {
        /** @type {!Array<string>} */
        const acceptNames = accepted.split(",").map((/**
         * @param {string} n
         * @return {string}
         */
        (n) => n.trim()));
        for (const name of acceptNames) {
            /** @type {(undefined|!Compression)} */
            const found = available.find((/**
             * @param {!Compression} c
             * @return {boolean}
             */
            (c) => c.name === name));
            if (found) {
                response = found;
                break;
            }
        }
    }
    return { request, response, error };
}
exports.compressionNegotiate = compressionNegotiate;
