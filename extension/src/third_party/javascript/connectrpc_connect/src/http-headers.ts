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
 * Generated from: third_party/javascript/connectrpc_connect/src/http-headers.ts
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
goog.module('google3.third_party.javascript.connectrpc_connect.src.http$2dheaders');
var module = module || { id: 'third_party/javascript/connectrpc_connect/src/http-headers.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_protobuf_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.index");
const tsickle_wire_2 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wire.index");
const tsickle_connect_error_3 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.connect$2derror");
const tsickle_code_4 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.code");
const protobuf_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.index');
const wire_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wire.index');
const connect_error_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.connect$2derror');
const code_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.code');
/**
 * @param {(string|!ArrayBuffer|*|!Uint8Array)} value
 * @param {(undefined|!tsickle_protobuf_1.DescMessage)=} desc
 * @return {string}
 */
function encodeBinaryHeader(value, desc) {
    /** @type {!Uint8Array} */
    let bytes;
    if (desc !== undefined) {
        bytes = (0, protobuf_1.toBinary)(desc, (/** @type {*} */ (value)));
    }
    else if (typeof value == "string") {
        bytes = new TextEncoder().encode(value);
    }
    else {
        bytes =
            value instanceof Uint8Array
                ? value
                : new Uint8Array((/** @type {!ArrayBuffer} */ (value)));
    }
    return (0, wire_1.base64Encode)(bytes, "std_raw");
}
exports.encodeBinaryHeader = encodeBinaryHeader;
/**
 * @template Desc
 * @param {string} value
 * @param {(undefined|Desc)=} desc
 * @param {(undefined|?)=} options
 * @return {(!Uint8Array|?)}
 */
function decodeBinaryHeader(value, desc, options) {
    try {
        /** @type {!Uint8Array} */
        const bytes = (0, wire_1.base64Decode)(value);
        if (desc) {
            return (0, protobuf_1.fromBinary)(desc, bytes, options);
        }
        return bytes;
    }
    catch (e) {
        throw connect_error_js_1.ConnectError.from(e, code_js_1.Code.DataLoss);
    }
}
exports.decodeBinaryHeader = decodeBinaryHeader;
/**
 * Merge two or more Headers objects by appending all fields from
 * all inputs to a new Headers object.
 * @param {...!Headers} headers
 * @return {!Headers}
 */
function appendHeaders(...headers) {
    /** @type {!Headers} */
    const h = new Headers();
    for (const e of headers) {
        e.forEach((/**
         * @param {string} value
         * @param {string} key
         * @return {void}
         */
        (value, key) => {
            h.append(key, value);
        }));
    }
    return h;
}
exports.appendHeaders = appendHeaders;
