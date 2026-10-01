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
 * Generated from: third_party/javascript/connectrpc_connect/src/protocol-connect/request-header.ts
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
goog.module('google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.request$2dheader');
var module = module || { id: 'third_party/javascript/connectrpc_connect/src/protocol-connect/request-header.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_headers_1 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.headers");
const tsickle_version_2 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.version");
const tsickle_content_type_3 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.content$2dtype");
const tsickle_compression_4 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.compression");
const tsickle_protobuf_5 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.index");
const headers_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.headers');
const version_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.version');
const content_type_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.content$2dtype');
/**
 * Creates headers for a Connect request.
 *
 * @param {string} methodKind
 * @param {boolean} useBinaryFormat
 * @param {(undefined|number)} timeoutMs
 * @param {(undefined|!Array<!Array<?>>|!Headers|?)} userProvidedHeaders
 * @param {boolean} setUserAgent
 * @return {!Headers}
 */
function requestHeader(methodKind, useBinaryFormat, timeoutMs, userProvidedHeaders, setUserAgent) {
    /** @type {!Headers} */
    const result = new Headers(userProvidedHeaders ?? {});
    if (timeoutMs !== undefined) {
        result.set(headers_js_1.headerTimeout, `${timeoutMs}`);
    }
    result.set(headers_js_1.headerContentType, methodKind == "unary"
        ? useBinaryFormat
            ? content_type_js_1.contentTypeUnaryProto
            : content_type_js_1.contentTypeUnaryJson
        : useBinaryFormat
            ? content_type_js_1.contentTypeStreamProto
            : content_type_js_1.contentTypeStreamJson);
    result.set(headers_js_1.headerProtocolVersion, version_js_1.protocolVersion);
    if (!result.has(headers_js_1.headerUserAgent) && setUserAgent) {
        // Note that we do not strictly comply with gRPC user agents.
        // We use "connect-es/1.2.3" where gRPC would use "grpc-es/1.2.3".
        // See https://github.com/grpc/grpc/blob/c462bb8d485fc1434ecfae438823ca8d14cf3154/doc/PROTOCOL-HTTP2.md#user-agents
        result.set(headers_js_1.headerUserAgent, "CONNECT_ES_USER_AGENT");
    }
    return result;
}
exports.requestHeader = requestHeader;
/**
 * Creates headers for a Connect request with compression.
 *
 * Note that we always set the Content-Encoding header for unary methods.
 * It is up to the caller to decide whether to apply compression - and remove
 * the header if compression is not used, for example because the payload is
 * too small to make compression effective.
 *
 * @param {string} methodKind
 * @param {boolean} useBinaryFormat
 * @param {(undefined|number)} timeoutMs
 * @param {(undefined|!Array<!Array<?>>|!Headers|?)} userProvidedHeaders
 * @param {!Array<!tsickle_compression_4.Compression>} acceptCompression
 * @param {(null|!tsickle_compression_4.Compression)} sendCompression
 * @param {boolean} setUserAgent
 * @return {!Headers}
 */
function requestHeaderWithCompression(methodKind, useBinaryFormat, timeoutMs, userProvidedHeaders, acceptCompression, sendCompression, setUserAgent) {
    /** @type {!Headers} */
    const result = requestHeader(methodKind, useBinaryFormat, timeoutMs, userProvidedHeaders, setUserAgent);
    if (sendCompression != null) {
        /** @type {string} */
        const name = methodKind == "unary" ? headers_js_1.headerUnaryEncoding : headers_js_1.headerStreamEncoding;
        result.set(name, sendCompression.name);
    }
    if (acceptCompression.length > 0) {
        /** @type {string} */
        const name = methodKind == "unary"
            ? headers_js_1.headerUnaryAcceptEncoding
            : headers_js_1.headerStreamAcceptEncoding;
        result.set(name, acceptCompression.map((/**
         * @param {!tsickle_compression_4.Compression} c
         * @return {string}
         */
        (c) => c.name)).join(","));
    }
    return result;
}
exports.requestHeaderWithCompression = requestHeaderWithCompression;
