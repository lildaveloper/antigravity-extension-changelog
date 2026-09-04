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
 * Generated from: third_party/javascript/connectrpc_connect/src/protocol/run-call.ts
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
goog.module('google3.third_party.javascript.connectrpc_connect.src.protocol.run$2dcall');
var module = module || { id: 'third_party/javascript/connectrpc_connect/src/protocol/run-call.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_protobuf_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.index");
const tsickle_interceptor_2 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.interceptor");
const tsickle_connect_error_3 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.connect$2derror");
const tsickle_signals_4 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.signals");
const tsickle_normalize_5 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.normalize");
const tsickle_context_values_6 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.context$2dvalues");
const interceptor_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.interceptor');
const connect_error_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.connect$2derror');
const signals_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol.signals');
const normalize_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol.normalize');
/**
 * UnaryFn represents the client-side invocation of a unary RPC - a method
 * that takes a single input message, and responds with a single output
 * message.
 * A Transport implements such a function, and makes it available to
 * interceptors.
 * @typedef {function(!tsickle_interceptor_2.UnaryRequest<?, ?>): !Promise<!tsickle_interceptor_2.UnaryResponse<?, ?>>}
 */
var UnaryFn;
/**
 * Runs a unary method with the given interceptors. Note that this function
 * is only used when implementing a Transport.
 * @template I, O
 * @param {{req: ?, next: function(!tsickle_interceptor_2.UnaryRequest<I, O>): !Promise<!tsickle_interceptor_2.UnaryResponse<I, O>>, timeoutMs: (undefined|number), signal: (undefined|!AbortSignal), interceptors: (undefined|!Array<function(function((!tsickle_interceptor_2.UnaryRequest<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>|!tsickle_interceptor_2.StreamRequest<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>)): !Promise<(!tsickle_interceptor_2.UnaryResponse<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>|!tsickle_interceptor_2.StreamResponse<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>)>): function((!tsickle_interceptor_2.UnaryRequest<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>|!tsickle_interceptor_2.StreamRequest<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>)): !Promise<(!tsickle_interceptor_2.UnaryResponse<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>|!tsickle_interceptor_2.StreamResponse<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>)>>)}} opt
 * @return {!Promise<!tsickle_interceptor_2.UnaryResponse<I, O>>}
 */
function runUnaryCall(opt) {
    /** @type {function(!tsickle_interceptor_2.UnaryRequest<I, O>): !Promise<!tsickle_interceptor_2.UnaryResponse<I, O>>} */
    const next = (0, interceptor_js_1.applyInterceptors)(opt.next, opt.interceptors);
    const [signal__tsickle_destructured_1, abort__tsickle_destructured_2, done__tsickle_destructured_3] = setupSignal(opt);
    const signal = /** @type {!AbortSignal} */ (signal__tsickle_destructured_1);
    const abort = /** @type {function(*): !Promise<?>} */ (abort__tsickle_destructured_2);
    const done = /** @type {function(): void} */ (done__tsickle_destructured_3);
    /** @type {{message: ?, signal: !AbortSignal, method: ?, url: string, contextValues: !tsickle_context_values_6.ContextValues, header: !Headers, stream: boolean, service: !tsickle_protobuf_1.DescService, requestMethod: string}} */
    const req = {
        ...opt.req,
        message: (0, normalize_js_1.normalize)(opt.req.method.input, opt.req.message),
        signal,
    };
    return next(req).then((/**
     * @param {!tsickle_interceptor_2.UnaryResponse<I, O>} res
     * @return {!tsickle_interceptor_2.UnaryResponse<I, O>}
     */
    (res) => {
        done();
        return res;
    }), abort);
}
exports.runUnaryCall = runUnaryCall;
/**
 * StreamingFn represents the client-side invocation of a streaming RPC - a
 * method that takes zero or more input messages, and responds with zero or
 * more output messages.
 * A Transport implements such a function, and makes it available to
 * interceptors.
 * @typedef {function(!tsickle_interceptor_2.StreamRequest<?, ?>): !Promise<!tsickle_interceptor_2.StreamResponse<?, ?>>}
 */
var StreamingFn;
/**
 * Runs a server-streaming method with the given interceptors. Note that this
 * function is only used when implementing a Transport.
 * @template I, O
 * @param {{req: ?, next: function(!tsickle_interceptor_2.StreamRequest<I, O>): !Promise<!tsickle_interceptor_2.StreamResponse<I, O>>, timeoutMs: (undefined|number), signal: (undefined|!AbortSignal), interceptors: (undefined|!Array<function(function((!tsickle_interceptor_2.UnaryRequest<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>|!tsickle_interceptor_2.StreamRequest<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>)): !Promise<(!tsickle_interceptor_2.UnaryResponse<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>|!tsickle_interceptor_2.StreamResponse<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>)>): function((!tsickle_interceptor_2.UnaryRequest<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>|!tsickle_interceptor_2.StreamRequest<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>)): !Promise<(!tsickle_interceptor_2.UnaryResponse<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>|!tsickle_interceptor_2.StreamResponse<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>)>>)}} opt
 * @return {!Promise<!tsickle_interceptor_2.StreamResponse<I, O>>}
 */
function runStreamingCall(opt) {
    /** @type {function(!tsickle_interceptor_2.StreamRequest<I, O>): !Promise<!tsickle_interceptor_2.StreamResponse<I, O>>} */
    const next = (0, interceptor_js_1.applyInterceptors)(opt.next, opt.interceptors);
    const [signal__tsickle_destructured_4, abort__tsickle_destructured_5, done__tsickle_destructured_6] = setupSignal(opt);
    const signal = /** @type {!AbortSignal} */ (signal__tsickle_destructured_4);
    const abort = /** @type {function(*): !Promise<?>} */ (abort__tsickle_destructured_5);
    const done = /** @type {function(): void} */ (done__tsickle_destructured_6);
    /** @type {{message: !AsyncIterable<?, ?, ?>, signal: !AbortSignal, method: ?, url: string, contextValues: !tsickle_context_values_6.ContextValues, header: !Headers, stream: boolean, service: !tsickle_protobuf_1.DescService, requestMethod: string}} */
    const req = {
        ...opt.req,
        message: (0, normalize_js_1.normalizeIterable)(opt.req.method.input, opt.req.message),
        signal,
    };
    /** @type {boolean} */
    let doneCalled = false;
    // Call return on the request iterable to indicate
    // that we will no longer consume it and it should
    // cleanup any allocated resources.
    signal.addEventListener("abort", (/**
     * @return {void}
     */
    function () {
        /** @type {!AsyncIterator<?, ?, ?>} */
        const it = opt.req.message[Symbol.asyncIterator]();
        // If the signal is aborted due to an error, we want to throw
        // the error to the request iterator.
        if (!doneCalled) {
            it.throw?.(this.reason).catch((/**
             * @return {void}
             */
            () => {
                // throw returns a promise, which we don't care about.
                //
                // Uncaught promises are thrown at sometime/somewhere by the event loop,
                // this is to ensure error is caught and ignored.
            }));
        }
        it.return?.().catch((/**
         * @return {void}
         */
        () => {
            // return returns a promise, which we don't care about.
            //
            // Uncaught promises are thrown at sometime/somewhere by the event loop,
            // this is to ensure error is caught and ignored.
        }));
    }));
    return next(req).then((/**
     * @param {!tsickle_interceptor_2.StreamResponse<I, O>} res
     * @return {{message: *, stream: boolean, method: ?, service: !tsickle_protobuf_1.DescService, header: !Headers, trailer: !Headers}}
     */
    (res) => {
        return {
            ...res,
            message: {
                /**
                 * @public
                 * @return {{next: function(): !Promise<(!IteratorReturnResult<?>|!IteratorYieldResult<?>)>}}
                 */
                [Symbol.asyncIterator]() {
                    /** @type {!AsyncIterator<?, ?, ?>} */
                    const it = res.message[Symbol.asyncIterator]();
                    return {
                        /**
                         * @public
                         * @return {!Promise<(!IteratorReturnResult<?>|!IteratorYieldResult<?>)>}
                         */
                        next() {
                            return it.next().then((/**
                             * @param {(!IteratorReturnResult<?>|!IteratorYieldResult<?>)} r
                             * @return {(!IteratorReturnResult<?>|!IteratorYieldResult<?>)}
                             */
                            (r) => {
                                if (r.done == true) {
                                    doneCalled = true;
                                    done();
                                }
                                return r;
                            }), abort);
                        },
                        // We deliberately omit throw/return.
                    };
                },
            },
        };
    }), abort);
}
exports.runStreamingCall = runStreamingCall;
/**
 * Create an AbortSignal for Transport implementations. The signal is available
 * in UnaryRequest and StreamingRequest, and is triggered when the call is
 * aborted (via a timeout or explicit cancellation), errored (e.g. when reading
 * an error from the server from the wire), or finished successfully.
 *
 * Transport implementations can pass the signal to HTTP clients to ensure that
 * there are no unused connections leak.
 *
 * Returns a tuple:
 * [0]: The signal, which is also aborted if the optional deadline is reached.
 * [1]: Function to call if the Transport encountered an error.
 * [2]: Function to call if the Transport finished without an error.
 * @param {{timeoutMs: (undefined|number), signal: (undefined|!AbortSignal)}} opt
 * @return {!Array<?>}
 */
function setupSignal(opt) {
    const { signal, cleanup } = (0, signals_js_1.createDeadlineSignal)(opt.timeoutMs);
    /** @type {!AbortController} */
    const controller = (0, signals_js_1.createLinkedAbortController)(opt.signal, signal);
    return [
        controller.signal,
        (/**
         * @param {*} reason
         * @return {!Promise<?>}
         */
        function abort(reason) {
            // We peek at the deadline signal because fetch() will throw an error on
            // abort that discards the signal reason.
            /** @type {!tsickle_connect_error_3.ConnectError} */
            const e = connect_error_js_1.ConnectError.from(signal.aborted ? (0, signals_js_1.getAbortSignalReason)(signal) : reason);
            controller.abort(e);
            cleanup();
            return Promise.reject(e);
        }),
        (/**
         * @return {void}
         */
        function done() {
            cleanup();
            controller.abort();
        }),
    ];
}
