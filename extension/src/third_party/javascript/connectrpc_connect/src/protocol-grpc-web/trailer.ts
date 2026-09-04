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
 * Generated from: third_party/javascript/connectrpc_connect/src/protocol-grpc-web/trailer.ts
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
goog.module('google3.third_party.javascript.connectrpc_connect.src.protocol$2dgrpc$2dweb.trailer');
var module = module || { id: 'third_party/javascript/connectrpc_connect/src/protocol-grpc-web/trailer.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_serialization_1 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.serialization");
/**
 * trailerFlag indicates that the data in a EnvelopedMessage
 * is a set of trailers of the gRPC-web protocol.
 *
 * @type {number}
 */
exports.trailerFlag = 0b10000000;
/**
 * Parse a gRPC-web trailer, a set of header fields separated by CRLF.
 *
 * @param {!Uint8Array} data
 * @return {!Headers}
 */
function trailerParse(data) {
    /** @type {!Headers} */
    const headers = new Headers();
    /** @type {!Array<string>} */
    const lines = new TextDecoder().decode(data).split("\r\n");
    for (const line of lines) {
        if (line === "") {
            continue;
        }
        /** @type {number} */
        const i = line.indexOf(":");
        if (i > 0) {
            /** @type {string} */
            const name = line.substring(0, i).trim();
            /** @type {string} */
            const value = line.substring(i + 1).trim();
            headers.append(name, value);
        }
    }
    return headers;
}
exports.trailerParse = trailerParse;
/**
 * Serialize a Headers object as a gRPC-web trailer.
 *
 * @param {!Headers} trailer
 * @return {!Uint8Array}
 */
function trailerSerialize(trailer) {
    /** @type {!Array<string>} */
    const lines = [];
    trailer.forEach((/**
     * @param {string} value
     * @param {string} key
     * @return {void}
     */
    (value, key) => {
        lines.push(`${key}: ${value}\r\n`);
    }));
    return new TextEncoder().encode(lines.join(""));
}
exports.trailerSerialize = trailerSerialize;
/**
 * Create a Serialization object that serializes a gRPC-web trailer, a Headers
 * object that is serialized as a set of header fields, separated by CRLF.
 *
 * @return {!tsickle_serialization_1.Serialization<!Headers>}
 */
function createTrailerSerialization() {
    return {
        serialize: trailerSerialize,
        parse: trailerParse,
    };
}
exports.createTrailerSerialization = createTrailerSerialization;
