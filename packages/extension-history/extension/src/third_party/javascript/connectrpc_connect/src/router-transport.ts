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
 * Generated from: third_party/javascript/connectrpc_connect/src/router-transport.ts
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
goog.module('google3.third_party.javascript.connectrpc_connect.src.router$2dtransport');
var module = module || { id: 'third_party/javascript/connectrpc_connect/src/router-transport.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_transport_1 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.transport");
const tsickle_transport_options_2 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.transport$2doptions");
const tsickle_universal_handler_client_3 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.universal$2dhandler$2dclient");
const tsickle_router_4 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.router");
const tsickle_transport_5 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.transport");
const transport_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.transport');
const universal_handler_client_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol.universal$2dhandler$2dclient');
const router_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.router');
/**
 * Creates a Transport that routes requests to the configured router. Useful for testing
 * and calling services running in the same process.
 *
 * This can be used to test both client logic by using this to stub/mock the backend,
 * and to test server logic by using this to run without needing to spin up a server.
 * @param {function(!tsickle_router_4.ConnectRouter): void} routes
 * @param {(undefined|{transport: (undefined|?), router: (undefined|!tsickle_router_4.ConnectRouterOptions)})=} options
 * @return {!tsickle_transport_5.Transport}
 */
function createRouterTransport(routes, options) {
    /** @type {!tsickle_router_4.ConnectRouter} */
    const router = (0, router_js_1.createConnectRouter)({
        ...(options?.router ?? {}),
        connect: true,
    });
    routes(router);
    return (0, transport_js_1.createTransport)({
        httpClient: (0, universal_handler_client_js_1.createUniversalHandlerClient)(router.handlers),
        baseUrl: "https://in-memory",
        useBinaryFormat: true,
        interceptors: [],
        acceptCompression: [],
        sendCompression: null,
        compressMinBytes: Number.MAX_SAFE_INTEGER,
        readMaxBytes: Number.MAX_SAFE_INTEGER,
        writeMaxBytes: Number.MAX_SAFE_INTEGER,
        ...(options?.transport ?? {}),
    });
}
exports.createRouterTransport = createRouterTransport;
