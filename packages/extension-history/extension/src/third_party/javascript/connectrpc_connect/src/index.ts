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
 * Generated from: third_party/javascript/connectrpc_connect/src/index.ts
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
goog.module('google3.third_party.javascript.connectrpc_connect.src.index');
var module = module || { id: 'third_party/javascript/connectrpc_connect/src/index.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_connect_error_1 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.connect$2derror");
const tsickle_code_2 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.code");
const tsickle_http_headers_3 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.http$2dheaders");
const tsickle_callback_client_4 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.callback$2dclient");
const tsickle_promise_client_5 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.promise$2dclient");
const tsickle_call_options_6 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.call$2doptions");
const tsickle_transport_7 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.transport");
const tsickle_interceptor_8 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.interceptor");
const tsickle_implementation_9 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.implementation");
const tsickle_router_10 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.router");
const tsickle_cors_11 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.cors");
const tsickle_context_values_12 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.context$2dvalues");
const tsickle_any_client_13 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.any$2dclient");
const tsickle_router_transport_14 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.router$2dtransport");
const connect_error_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.connect$2derror');
exports.ConnectError = connect_error_js_1.ConnectError;
const code_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.code');
exports.Code = code_js_1.Code;
const http_headers_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.http$2dheaders');
exports.encodeBinaryHeader = http_headers_js_1.encodeBinaryHeader;
exports.decodeBinaryHeader = http_headers_js_1.decodeBinaryHeader;
exports.appendHeaders = http_headers_js_1.appendHeaders;
const callback_client_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.callback$2dclient');
exports.createCallbackClient = callback_client_js_1.createCallbackClient;
/** @typedef {!tsickle_callback_client_4.CallbackClient} */
exports.CallbackClient; // type-only export
const promise_client_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.promise$2dclient');
exports.createClient = promise_client_js_1.createClient;
/** @typedef {!tsickle_promise_client_5.Client} */
exports.Client; // type-only export
/** @typedef {!tsickle_call_options_6.CallOptions} */
exports.CallOptions; // type-only export
/** @typedef {!tsickle_transport_7.Transport} */
exports.Transport; // type-only export
/** @typedef {!tsickle_interceptor_8.Interceptor} */
exports.Interceptor; // type-only export
/** @typedef {!tsickle_interceptor_8.UnaryRequest} */
exports.UnaryRequest; // type-only export
/** @typedef {!tsickle_interceptor_8.UnaryResponse} */
exports.UnaryResponse; // type-only export
/** @typedef {!tsickle_interceptor_8.StreamRequest} */
exports.StreamRequest; // type-only export
/** @typedef {!tsickle_interceptor_8.StreamResponse} */
exports.StreamResponse; // type-only export
/** @typedef {!tsickle_implementation_9.ServiceImpl} */
exports.ServiceImpl; // type-only export
/** @typedef {!tsickle_implementation_9.MethodImpl} */
exports.MethodImpl; // type-only export
/** @typedef {!tsickle_implementation_9.HandlerContext} */
exports.HandlerContext; // type-only export
const router_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.router');
exports.createConnectRouter = router_js_1.createConnectRouter;
/** @typedef {!tsickle_router_10.ConnectRouter} */
exports.ConnectRouter; // type-only export
/** @typedef {!tsickle_router_10.ConnectRouterOptions} */
exports.ConnectRouterOptions; // type-only export
const implementation_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.implementation');
exports.createHandlerContext = implementation_js_1.createHandlerContext;
const cors_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.cors');
exports.cors = cors_js_1.cors;
const context_values_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.context$2dvalues');
exports.createContextKey = context_values_js_1.createContextKey;
exports.createContextValues = context_values_js_1.createContextValues;
/** @typedef {!tsickle_context_values_12.ContextKey} */
exports.ContextKey; // type-only export
/** @typedef {!tsickle_context_values_12.ContextValues} */
exports.ContextValues; // type-only export
// Symbols above should be relevant to end users.
// Symbols below should only be relevant for other libraries.
const any_client_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.any$2dclient');
exports.makeAnyClient = any_client_js_1.makeAnyClient;
/** @typedef {!tsickle_any_client_13.AnyClient} */
exports.AnyClient; // type-only export
const implementation_js_2 = implementation_js_1;
exports.createServiceImplSpec = implementation_js_2.createServiceImplSpec;
exports.createMethodImplSpec = implementation_js_2.createMethodImplSpec;
/** @typedef {!tsickle_implementation_9.ServiceImplSpec} */
exports.ServiceImplSpec; // type-only export
/** @typedef {!tsickle_implementation_9.MethodImplSpec} */
exports.MethodImplSpec; // type-only export
const router_transport_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.router$2dtransport');
exports.createRouterTransport = router_transport_js_1.createRouterTransport;
