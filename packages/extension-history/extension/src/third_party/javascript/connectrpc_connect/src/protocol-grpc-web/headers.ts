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
 * Generated from: third_party/javascript/connectrpc_connect/src/protocol-grpc-web/headers.ts
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
goog.module('google3.third_party.javascript.connectrpc_connect.src.protocol$2dgrpc$2dweb.headers');
var module = module || { id: 'third_party/javascript/connectrpc_connect/src/protocol-grpc-web/headers.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_headers_1 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol$2dgrpc.headers");
/**
 * @private Internal code, does not follow semantic versioning.
 */
const headers_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol$2dgrpc.headers');
exports.headerContentType = headers_js_1.headerContentType;
exports.headerEncoding = headers_js_1.headerEncoding;
exports.headerAcceptEncoding = headers_js_1.headerAcceptEncoding;
exports.headerTimeout = headers_js_1.headerTimeout;
exports.headerGrpcStatus = headers_js_1.headerGrpcStatus;
exports.headerGrpcMessage = headers_js_1.headerGrpcMessage;
exports.headerStatusDetailsBin = headers_js_1.headerStatusDetailsBin;
exports.headerUserAgent = headers_js_1.headerUserAgent;
/**
 * gRPC-web does not use the standard header User-Agent.
 *
 * @type {string}
 */
exports.headerXUserAgent = "X-User-Agent";
/**
 * The canonical grpc/grpc-web JavaScript implementation sets
 * this request header with value "1".
 * Some servers may rely on the header to identify gRPC-web
 * requests. For example the proxy by improbable:
 * https://github.com/improbable-eng/grpc-web/blob/53aaf4cdc0fede7103c1b06f0cfc560c003a5c41/go/grpcweb/wrapper.go#L231
 *
 * @type {string}
 */
exports.headerXGrpcWeb = "X-Grpc-Web";
