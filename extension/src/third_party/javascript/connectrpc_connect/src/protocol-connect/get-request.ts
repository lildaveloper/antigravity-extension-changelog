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
 * Generated from: third_party/javascript/connectrpc_connect/src/protocol-connect/get-request.ts
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
goog.module('google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.get$2drequest');
var module = module || { id: 'third_party/javascript/connectrpc_connect/src/protocol-connect/get-request.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_protobuf_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.index");
const tsickle_wire_2 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wire.index");
const tsickle_headers_3 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.headers");
const tsickle_version_4 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.version");
const tsickle_interceptor_5 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.interceptor");
const wire_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wire.index');
const headers_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.headers');
const version_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.version');
/** @type {string} */
const contentTypePrefix = "application/";
/**
 * @param {!Uint8Array} message
 * @param {boolean} useBase64
 * @return {string}
 */
function encodeMessageForUrl(message, useBase64) {
    if (useBase64) {
        return (0, wire_1.base64Encode)(message, "url");
    }
    return encodeURIComponent(new TextDecoder().decode(message));
}
/**
 * @template I, O
 * @param {!tsickle_interceptor_5.UnaryRequest<I, O>} request
 * @param {!Uint8Array} message
 * @param {boolean} useBase64
 * @return {!tsickle_interceptor_5.UnaryRequest<I, O>}
 */
function transformConnectPostToGetRequest(request, message, useBase64) {
    /** @type {string} */
    let query = `?connect=v${version_js_1.protocolVersion}`;
    /** @type {(null|string)} */
    const contentType = request.header.get(headers_js_1.headerContentType);
    if (contentType?.indexOf(contentTypePrefix) === 0) {
        query +=
            "&encoding=" +
                encodeURIComponent(contentType.slice((/** @type {string} */ (contentTypePrefix)).length));
    }
    /** @type {(null|string)} */
    const compression = request.header.get(headers_js_1.headerUnaryEncoding);
    if (compression !== null && compression !== "identity") {
        query += "&compression=" + encodeURIComponent(compression);
        // Force base64 for compressed payloads.
        useBase64 = true;
    }
    if (useBase64) {
        query += "&base64=1";
    }
    query += "&message=" + encodeMessageForUrl(message, useBase64);
    /** @type {string} */
    const url = request.url + query;
    /** @type {!Headers} */
    const header = new Headers(request.header);
    // Omit headers that are not used for unary GET requests.
    for (const h of [
        headers_js_1.headerProtocolVersion,
        headers_js_1.headerContentType,
        headers_js_1.headerUnaryContentLength,
        headers_js_1.headerUnaryEncoding,
        headers_js_1.headerUnaryAcceptEncoding,
    ]) {
        header.delete(h);
    }
    return {
        ...request,
        requestMethod: "GET",
        url,
        header,
    };
}
exports.transformConnectPostToGetRequest = transformConnectPostToGetRequest;
