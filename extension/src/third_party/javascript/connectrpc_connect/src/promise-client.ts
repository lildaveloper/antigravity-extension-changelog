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
 * Generated from: third_party/javascript/connectrpc_connect/src/promise-client.ts
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
goog.module('google3.third_party.javascript.connectrpc_connect.src.promise$2dclient');
var module = module || { id: 'third_party/javascript/connectrpc_connect/src/promise-client.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_protobuf_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.index");
const tsickle_transport_2 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.transport");
const tsickle_any_client_3 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.any$2dclient");
const tsickle_call_options_4 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.call$2doptions");
const tsickle_connect_error_5 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.connect$2derror");
const tsickle_code_6 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.code");
const tsickle_async_iterable_7 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.async$2diterable");
const tsickle_interceptor_8 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.interceptor");
const any_client_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.any$2dclient');
const connect_error_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.connect$2derror');
const code_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.code');
const async_iterable_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol.async$2diterable');
/**
 * Client is a simple client that supports unary and server-streaming
 * methods. Methods will produce a promise for the response message,
 * or an asynchronous iterable of response messages.
 * @typedef {?}
 */
exports.Client;
/**
 * Create a Client for the given service, invoking RPCs through the
 * given transport.
 * @template T
 * @param {T} service
 * @param {!tsickle_transport_2.Transport} transport
 * @return {?}
 */
function createClient(service, transport) {
    return (/** @type {?} */ ((0, any_client_js_1.makeAnyClient)(service, (/**
     * @param {?} method
     * @return {(null|function(?, (undefined|!tsickle_call_options_4.CallOptions)=): !Promise<*>|function(?, (undefined|!tsickle_call_options_4.CallOptions)=): !AsyncIterable<*, ?, ?>|function(!AsyncIterable<?, ?, ?>, (undefined|!tsickle_call_options_4.CallOptions)=): !Promise<*>|function(!AsyncIterable<?, ?, ?>, (undefined|!tsickle_call_options_4.CallOptions)=): !AsyncIterable<*, ?, ?>)}
     */
    (method) => {
        switch (method.methodKind) {
            case "unary":
                return createUnaryFn(transport, method);
            case "server_streaming":
                return createServerStreamingFn(transport, method);
            case "client_streaming":
                return createClientStreamingFn(transport, method);
            case "bidi_streaming":
                return createBiDiStreamingFn(transport, method);
            default:
                return null;
        }
    }))));
}
exports.createClient = createClient;
/**
 * UnaryFn is the method signature for a unary method of a PromiseClient.
 * @typedef {function(?, (undefined|!tsickle_call_options_4.CallOptions)=): !Promise<?>}
 */
var UnaryFn;
/**
 * @template I, O
 * @param {!tsickle_transport_2.Transport} transport
 * @param {?} method
 * @return {function(?, (undefined|!tsickle_call_options_4.CallOptions)=): !Promise<?>}
 */
function createUnaryFn(transport, method) {
    return (/**
     * @param {?} input
     * @param {(undefined|!tsickle_call_options_4.CallOptions)} options
     * @return {!Promise<?>}
     */
    async (input, options) => {
        /** @type {!tsickle_interceptor_8.UnaryResponse<I, O>} */
        const response = await transport.unary(method, options?.signal, options?.timeoutMs, options?.headers, input, options?.contextValues);
        options?.onHeader?.(response.header);
        options?.onTrailer?.(response.trailer);
        return response.message;
    });
}
exports.createUnaryFn = createUnaryFn;
/**
 * ServerStreamingFn is the method signature for a server-streaming method of
 * a PromiseClient.
 * @typedef {function(?, (undefined|!tsickle_call_options_4.CallOptions)=): !AsyncIterable<?, ?, ?>}
 */
var ServerStreamingFn;
/**
 * @template I, O
 * @param {!tsickle_transport_2.Transport} transport
 * @param {?} method
 * @return {function(?, (undefined|!tsickle_call_options_4.CallOptions)=): !AsyncIterable<?, ?, ?>}
 */
function createServerStreamingFn(transport, method) {
    return (/**
     * @param {?} input
     * @param {(undefined|!tsickle_call_options_4.CallOptions)} options
     * @return {!AsyncIterable<?, ?, ?>}
     */
    (input, options) => handleStreamResponse(transport.stream(method, options?.signal, options?.timeoutMs, options?.headers, (0, async_iterable_js_1.createAsyncIterable)([input]), options?.contextValues), options));
}
exports.createServerStreamingFn = createServerStreamingFn;
/**
 * ClientStreamFn is the method signature for a client streaming method of a
 * PromiseClient.
 * @typedef {function(!AsyncIterable<?, ?, ?>, (undefined|!tsickle_call_options_4.CallOptions)=): !Promise<?>}
 */
var ClientStreamingFn;
/**
 * @template I, O
 * @param {!tsickle_transport_2.Transport} transport
 * @param {?} method
 * @return {function(!AsyncIterable<?, ?, ?>, (undefined|!tsickle_call_options_4.CallOptions)=): !Promise<?>}
 */
function createClientStreamingFn(transport, method) {
    return (/**
     * @param {!AsyncIterable<?, ?, ?>} request
     * @param {(undefined|!tsickle_call_options_4.CallOptions)=} options
     * @return {!Promise<?>}
     */
    async (request, options) => {
        /** @type {!tsickle_interceptor_8.StreamResponse<I, O>} */
        const response = await transport.stream(method, options?.signal, options?.timeoutMs, options?.headers, request, options?.contextValues);
        options?.onHeader?.(response.header);
        /** @type {(undefined|?)} */
        let singleMessage;
        /** @type {number} */
        let count = 0;
        for await (const message of response.message) {
            singleMessage = message;
            count++;
        }
        if (!singleMessage) {
            throw new connect_error_js_1.ConnectError("protocol error: missing response message", code_js_1.Code.Unimplemented);
        }
        if (count > 1) {
            throw new connect_error_js_1.ConnectError("protocol error: received extra messages for client streaming method", code_js_1.Code.Unimplemented);
        }
        options?.onTrailer?.(response.trailer);
        return singleMessage;
    });
}
exports.createClientStreamingFn = createClientStreamingFn;
/**
 * BiDiStreamFn is the method signature for a bi-directional streaming method
 * of a PromiseClient.
 * @typedef {function(!AsyncIterable<?, ?, ?>, (undefined|!tsickle_call_options_4.CallOptions)=): !AsyncIterable<?, ?, ?>}
 */
var BiDiStreamingFn;
/**
 * @template I, O
 * @param {!tsickle_transport_2.Transport} transport
 * @param {?} method
 * @return {function(!AsyncIterable<?, ?, ?>, (undefined|!tsickle_call_options_4.CallOptions)=): !AsyncIterable<?, ?, ?>}
 */
function createBiDiStreamingFn(transport, method) {
    return (/**
     * @param {!AsyncIterable<?, ?, ?>} request
     * @param {(undefined|!tsickle_call_options_4.CallOptions)=} options
     * @return {!AsyncIterable<?, ?, ?>}
     */
    (request, options) => handleStreamResponse(transport.stream(method, options?.signal, options?.timeoutMs, options?.headers, request, options?.contextValues), options));
}
exports.createBiDiStreamingFn = createBiDiStreamingFn;
/**
 * @template I, O
 * @param {!Promise<!tsickle_interceptor_8.StreamResponse<I, O>>} stream
 * @param {(undefined|!tsickle_call_options_4.CallOptions)=} options
 * @return {!AsyncIterable<?, ?, ?>}
 */
function handleStreamResponse(stream, options) {
    /** @type {!AsyncGenerator<?, void, ?>} */
    const it = ((/**
     * @return {!AsyncGenerator<?, void, ?>}
     */
    async function* () {
        /** @type {!tsickle_interceptor_8.StreamResponse<I, O>} */
        const response = await stream;
        options?.onHeader?.(response.header);
        yield* response.message;
        options?.onTrailer?.(response.trailer);
    }))()[Symbol.asyncIterator]();
    // Create a new iterable to omit throw/return.
    return {
        [Symbol.asyncIterator]: (/**
         * @return {{next: function(): !Promise<(!IteratorReturnResult<void>|!IteratorYieldResult<?>)>}}
         */
        () => ({
            next: (/**
             * @return {!Promise<(!IteratorReturnResult<void>|!IteratorYieldResult<?>)>}
             */
            () => it.next()),
        })),
    };
}
