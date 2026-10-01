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
 * Generated from: third_party/javascript/connectrpc_connect/src/protocol-connect/validate-response.ts
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
goog.module('google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.validate$2dresponse');
var module = module || { id: 'third_party/javascript/connectrpc_connect/src/protocol-connect/validate-response.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_code_1 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.code");
const tsickle_http_status_2 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.http$2dstatus");
const tsickle_connect_error_3 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.connect$2derror");
const tsickle_content_type_4 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.content$2dtype");
const tsickle_headers_5 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.headers");
const tsickle_compression_6 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.compression");
const tsickle_protobuf_7 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.index");
const code_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.code');
const http_status_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.http$2dstatus');
const connect_error_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.connect$2derror');
const content_type_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.content$2dtype');
const headers_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.headers');
/**
 * Validates response status and header for the Connect protocol.
 * Throws a ConnectError if the header indicates an error, or if
 * the content type is unexpected, with the following exception:
 * For unary RPCs with an HTTP error status, this returns an error
 * derived from the HTTP status instead of throwing it, giving an
 * implementation a chance to parse a Connect error from the wire.
 *
 * @param {string} methodKind
 * @param {boolean} useBinaryFormat
 * @param {number} status
 * @param {!Headers} headers
 * @return {({isUnaryError: boolean, unaryError: undefined}|{isUnaryError: boolean, unaryError: !tsickle_connect_error_3.ConnectError})}
 */
function validateResponse(methodKind, useBinaryFormat, status, headers) {
    /** @type {(null|string)} */
    const mimeType = headers.get(headers_js_1.headerContentType);
    /** @type {(undefined|{stream: boolean, binary: boolean})} */
    const parsedType = (0, content_type_js_1.parseContentType)(mimeType);
    if (status !== 200) {
        /** @type {!tsickle_connect_error_3.ConnectError} */
        const errorFromStatus = new connect_error_js_1.ConnectError(`HTTP ${status}`, (0, http_status_js_1.codeFromHttpStatus)(status), headers);
        // If parsedType is defined and it is not binary, then this is a unary JSON response
        if (methodKind == "unary" && parsedType && !parsedType.binary) {
            return { isUnaryError: true, unaryError: errorFromStatus };
        }
        throw errorFromStatus;
    }
    /** @type {{binary: boolean, stream: boolean}} */
    const allowedContentType = {
        binary: useBinaryFormat,
        stream: methodKind !== "unary",
    };
    if (parsedType?.binary !== allowedContentType.binary ||
        parsedType.stream !== allowedContentType.stream) {
        throw new connect_error_js_1.ConnectError(`unsupported content type ${mimeType}`, parsedType === undefined ? code_js_1.Code.Unknown : code_js_1.Code.Internal, headers);
    }
    return { isUnaryError: false };
}
exports.validateResponse = validateResponse;
/**
 * Validates response status and header for the Connect protocol.
 * This function is identical to validateResponse(), but also verifies
 * that a given encoding header is acceptable.
 *
 * @param {string} methodKind
 * @param {!Array<!tsickle_compression_6.Compression>} acceptCompression
 * @param {boolean} useBinaryFormat
 * @param {number} status
 * @param {!Headers} headers
 * @return {?}
 */
function validateResponseWithCompression(methodKind, acceptCompression, useBinaryFormat, status, headers) {
    /** @type {(undefined|!tsickle_compression_6.Compression)} */
    let compression;
    /** @type {(null|string)} */
    const encoding = headers.get(methodKind == "unary" ? headers_js_1.headerUnaryEncoding : headers_js_1.headerStreamEncoding);
    if (encoding != null && encoding.toLowerCase() !== "identity") {
        compression = acceptCompression.find((/**
         * @param {!tsickle_compression_6.Compression} c
         * @return {boolean}
         */
        (c) => c.name === encoding));
        if (!compression) {
            throw new connect_error_js_1.ConnectError(`unsupported response encoding "${encoding}"`, code_js_1.Code.Internal, headers);
        }
    }
    return {
        compression,
        ...validateResponse(methodKind, useBinaryFormat, status, headers),
    };
}
exports.validateResponseWithCompression = validateResponseWithCompression;
