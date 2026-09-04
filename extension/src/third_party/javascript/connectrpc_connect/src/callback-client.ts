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
 * Generated from: third_party/javascript/connectrpc_connect/src/callback-client.ts
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
goog.module('google3.third_party.javascript.connectrpc_connect.src.callback$2dclient');
var module = module || { id: 'third_party/javascript/connectrpc_connect/src/callback-client.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_protobuf_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.index");
const tsickle_connect_error_2 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.connect$2derror");
const tsickle_transport_3 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.transport");
const tsickle_code_4 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.code");
const tsickle_any_client_5 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.any$2dclient");
const tsickle_call_options_6 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.call$2doptions");
const tsickle_async_iterable_7 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.async$2diterable");
const tsickle_interceptor_8 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.interceptor");
const protobuf_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.index');
const connect_error_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.connect$2derror');
const code_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.code');
const any_client_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.any$2dclient');
const async_iterable_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol.async$2diterable');
/**
 * CallbackClient is a simple client that supports unary and server
 * streaming methods. Methods take callback functions, which will be
 * called when a response message arrives, or an error occurs.
 *
 * Client methods return a function that cancels the call. This is a
 * convenient alternative to creating a AbortController and passing
 * its AbortSignal as an option to the method.
 *
 * If a call is cancelled by an AbortController or by the returned
 * cancel function, ConnectErrors with the code Canceled are
 * silently discarded.
 *
 * CallbackClient is most convenient for use in React effects, where
 * a function returned by the effect is called when the effect is
 * torn down.
 * @typedef {?}
 */
exports.CallbackClient;
/** @typedef {function(): void} */
var CancelFn;
/**
 * Create a CallbackClient for the given service, invoking RPCs through the
 * given transport.
 * @template T
 * @param {T} service
 * @param {!tsickle_transport_3.Transport} transport
 * @return {?}
 */
function createCallbackClient(service, transport) {
    return (/** @type {?} */ ((0, any_client_js_1.makeAnyClient)(service, (/**
     * @param {?} method
     * @return {(null|function(?, function((undefined|!tsickle_connect_error_2.ConnectError), (undefined|*)): void, (undefined|!tsickle_call_options_6.CallOptions)=): function(): void|function(?, function(*): void, function((undefined|!tsickle_connect_error_2.ConnectError)): void, (undefined|!tsickle_call_options_6.CallOptions)=): function(): void)}
     */
    (method) => {
        switch (method.methodKind) {
            case "unary":
                return createUnaryFn(transport, method);
            case "server_streaming":
                return createServerStreamingFn(transport, method);
            default:
                return null;
        }
    }))));
}
exports.createCallbackClient = createCallbackClient;
/**
 * UnaryFn is the method signature for a unary method of a CallbackClient.
 * @typedef {function(?, function((undefined|!tsickle_connect_error_2.ConnectError), (undefined|?)): void, (undefined|!tsickle_call_options_6.CallOptions)=): function(): void}
 */
var UnaryFn;
/**
 * @template I, O
 * @param {!tsickle_transport_3.Transport} transport
 * @param {?} method
 * @return {function(?, function((undefined|!tsickle_connect_error_2.ConnectError), (undefined|?)): void, (undefined|!tsickle_call_options_6.CallOptions)=): function(): void}
 */
function createUnaryFn(transport, method) {
    return (/**
     * @param {?} requestMessage
     * @param {function((undefined|!tsickle_connect_error_2.ConnectError), (undefined|?)): void} callback
     * @param {(undefined|!tsickle_call_options_6.CallOptions)} options
     * @return {function(): void}
     */
    (requestMessage, callback, options) => {
        /** @type {!AbortController} */
        const abort = new AbortController();
        options = wrapSignal(abort, options);
        transport
            .unary(method, abort.signal, options.timeoutMs, options.headers, requestMessage, options.contextValues)
            .then((/**
         * @param {!tsickle_interceptor_8.UnaryResponse<I, O>} response
         * @return {void}
         */
        (response) => {
            options.onHeader?.(response.header);
            options.onTrailer?.(response.trailer);
            callback(undefined, response.message);
        }), (/**
         * @param {?} reason
         * @return {void}
         */
        (reason) => {
            /** @type {!tsickle_connect_error_2.ConnectError} */
            const err = connect_error_js_1.ConnectError.from(reason, code_js_1.Code.Internal);
            if (err.code === code_js_1.Code.Canceled && abort.signal.aborted) {
                // As documented, discard Canceled errors if canceled by the user.
                return;
            }
            callback(err, (0, protobuf_1.create)(method.output));
        }));
        return (/**
         * @return {void}
         */
        () => abort.abort());
    });
}
/**
 * ServerStreamingFn is the method signature for a server-streaming method of
 * a CallbackClient.
 * @typedef {function(?, function(?): void, function((undefined|!tsickle_connect_error_2.ConnectError)): void, (undefined|!tsickle_call_options_6.CallOptions)=): function(): void}
 */
var ServerStreamingFn;
/**
 * @template I, O
 * @param {!tsickle_transport_3.Transport} transport
 * @param {?} method
 * @return {function(?, function(?): void, function((undefined|!tsickle_connect_error_2.ConnectError)): void, (undefined|!tsickle_call_options_6.CallOptions)=): function(): void}
 */
function createServerStreamingFn(transport, method) {
    return (/**
     * @param {?} input
     * @param {function(?): void} onResponse
     * @param {function((undefined|!tsickle_connect_error_2.ConnectError)): void} onClose
     * @param {(undefined|!tsickle_call_options_6.CallOptions)} options
     * @return {function(): void}
     */
    (input, onResponse, onClose, options) => {
        /** @type {!AbortController} */
        const abort = new AbortController();
        /**
         * @return {!Promise<void>}
         */
        async function run() {
            options = wrapSignal(abort, options);
            /** @type {!tsickle_interceptor_8.StreamResponse<I, O>} */
            const response = await transport.stream(method, options.signal, options.timeoutMs, options.headers, (0, async_iterable_js_1.createAsyncIterable)([input]), options.contextValues);
            options.onHeader?.(response.header);
            for await (const message of response.message) {
                onResponse(message);
            }
            options.onTrailer?.(response.trailer);
            onClose(undefined);
        }
        run().catch((/**
         * @param {?} reason
         * @return {void}
         */
        (reason) => {
            /** @type {!tsickle_connect_error_2.ConnectError} */
            const err = connect_error_js_1.ConnectError.from(reason, code_js_1.Code.Internal);
            if (err.code === code_js_1.Code.Canceled && abort.signal.aborted) {
                // As documented, discard Canceled errors if canceled by the user,
                // but do invoke the close-callback.
                onClose(undefined);
            }
            else {
                onClose(err);
            }
        }));
        return (/**
         * @return {void}
         */
        () => abort.abort());
    });
}
/**
 * @param {!AbortController} abort
 * @param {(undefined|!tsickle_call_options_6.CallOptions)} options
 * @return {!tsickle_call_options_6.CallOptions}
 */
function wrapSignal(abort, options) {
    if (options?.signal) {
        options.signal.addEventListener("abort", (/**
         * @return {void}
         */
        () => abort.abort()));
        if (options.signal.aborted) {
            abort.abort();
        }
    }
    return { ...options, signal: abort.signal };
}
