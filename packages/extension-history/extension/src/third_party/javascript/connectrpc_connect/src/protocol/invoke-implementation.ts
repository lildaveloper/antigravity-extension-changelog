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
 * Generated from: third_party/javascript/connectrpc_connect/src/protocol/invoke-implementation.ts
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
goog.module('google3.third_party.javascript.connectrpc_connect.src.protocol.invoke$2dimplementation');
var module = module || { id: 'third_party/javascript/connectrpc_connect/src/protocol/invoke-implementation.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_protobuf_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.index");
const tsickle_connect_error_2 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.connect$2derror");
const tsickle_code_3 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.code");
const tsickle_implementation_4 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.implementation");
const tsickle_async_iterable_5 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.async$2diterable");
const tsickle_normalize_6 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.normalize");
const tsickle_interceptor_7 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.interceptor");
const connect_error_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.connect$2derror');
const code_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.code');
const async_iterable_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol.async$2diterable');
const normalize_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol.normalize');
const interceptor_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.interceptor');
/**
 * Invoke a user-provided implementation of a unary RPC. Returns a normalized
 * output message.
 *
 * @template I, O
 * @param {?} spec
 * @param {!tsickle_implementation_4.HandlerContext} context
 * @param {?} input
 * @param {!Array<function(function((!tsickle_interceptor_7.StreamRequest<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>|!tsickle_interceptor_7.UnaryRequest<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>)): !Promise<(!tsickle_interceptor_7.StreamResponse<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>|!tsickle_interceptor_7.UnaryResponse<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>)>): function((!tsickle_interceptor_7.StreamRequest<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>|!tsickle_interceptor_7.UnaryRequest<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>)): !Promise<(!tsickle_interceptor_7.StreamResponse<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>|!tsickle_interceptor_7.UnaryResponse<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>)>>} interceptors
 * @return {!Promise<?>}
 */
async function invokeUnaryImplementation(spec, context, input, interceptors) {
    /** @type {function(!tsickle_interceptor_7.UnaryRequest<I, O>): !Promise<!tsickle_interceptor_7.UnaryResponse<I, O>>} */
    const anyFn = (/**
     * @param {!tsickle_interceptor_7.UnaryRequest<I, O>} req
     * @return {!Promise<!tsickle_interceptor_7.UnaryResponse<I, O>>}
     */
    async (req) => {
        return {
            message: (0, normalize_js_1.normalize)(spec.method.output, await spec.impl(req.message, mergeRequest(context, req))),
            stream: false,
            method: spec.method,
            ...responseCommon(context, spec),
        };
    });
    /** @type {function(!tsickle_interceptor_7.UnaryRequest<I, O>): !Promise<!tsickle_interceptor_7.UnaryResponse<I, O>>} */
    const next = (0, interceptor_js_1.applyInterceptors)(anyFn, interceptors);
    const { message, header, trailer } = await next({
        stream: false,
        message: input,
        method: spec.method,
        ...requestCommon(context, spec),
    });
    copyHeaders(header, context.responseHeader);
    copyHeaders(trailer, context.responseTrailer);
    return message;
}
exports.invokeUnaryImplementation = invokeUnaryImplementation;
/**
 * Return an AsyncIterableTransform that invokes a user-provided implementation,
 * giving it input from an asynchronous iterable, and returning its output as an
 * asynchronous iterable.
 *
 * @template I, O
 * @param {({kind: string, impl: function(?, !tsickle_implementation_4.HandlerContext): (!Promise<?>|?), method: ?}|{kind: string, impl: function(?, !tsickle_implementation_4.HandlerContext): !AsyncIterable<?, ?, ?>, method: ?}|{kind: string, impl: function(!AsyncIterable<?, ?, ?>, !tsickle_implementation_4.HandlerContext): !Promise<?>, method: ?}|{kind: string, impl: function(!AsyncIterable<?, ?, ?>, !tsickle_implementation_4.HandlerContext): !AsyncIterable<?, ?, ?>, method: ?})} spec
 * @param {!tsickle_implementation_4.HandlerContext} context
 * @param {!Array<function(function((!tsickle_interceptor_7.StreamRequest<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>|!tsickle_interceptor_7.UnaryRequest<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>)): !Promise<(!tsickle_interceptor_7.StreamResponse<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>|!tsickle_interceptor_7.UnaryResponse<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>)>): function((!tsickle_interceptor_7.StreamRequest<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>|!tsickle_interceptor_7.UnaryRequest<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>)): !Promise<(!tsickle_interceptor_7.StreamResponse<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>|!tsickle_interceptor_7.UnaryResponse<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>)>>} interceptors
 * @return {function(!AsyncIterable<?, ?, ?>): !AsyncIterable<?, ?, ?>}
 */
function transformInvokeImplementation(spec, context, interceptors) {
    switch (spec.kind) {
        case "unary":
            return (/**
             * @param {!AsyncIterable<?, ?, ?>} input
             * @return {!AsyncGenerator<?, void, ?>}
             */
            async function* unary(input) {
                yield await invokeUnaryImplementation(spec, context, await ensureSingle(input, "unary"), interceptors);
            });
        case "server_streaming": {
            return (/**
             * @param {!AsyncIterable<?, ?, ?>} input
             * @return {!AsyncIterable<?, ?, ?>}
             */
            function serverStreaming(input) {
                return invokeStreamImplementation(spec, context, input, interceptors, (/**
                 * @param {!tsickle_interceptor_7.StreamRequest<I, O>} req
                 * @return {!Promise<!tsickle_interceptor_7.StreamResponse<I, O>>}
                 */
                async (req) => {
                    /** @type {!AsyncIterable<?, ?, ?>} */
                    const output = (0, normalize_js_1.normalizeIterable)((/** @type {{kind: string, impl: function(?, !tsickle_implementation_4.HandlerContext): !AsyncIterable<?, ?, ?>, method: ?}} */ (spec)).method.output, (/** @type {{kind: string, impl: function(?, !tsickle_implementation_4.HandlerContext): !AsyncIterable<?, ?, ?>, method: ?}} */ (spec)).impl(await ensureSingle(req.message, "server-streaming"), mergeRequest(context, req)));
                    return {
                        stream: true,
                        message: output,
                        method: (/** @type {{kind: string, impl: function(?, !tsickle_implementation_4.HandlerContext): !AsyncIterable<?, ?, ?>, method: ?}} */ (spec)).method,
                        ...responseCommon(context, spec),
                    };
                }));
            });
        }
        case "client_streaming": {
            return (/**
             * @param {!AsyncIterable<?, ?, ?>} input
             * @return {!AsyncIterable<?, ?, ?>}
             */
            function clientStreaming(input) {
                return invokeStreamImplementation(spec, context, input, interceptors, (/**
                 * @param {!tsickle_interceptor_7.StreamRequest<I, O>} req
                 * @return {!Promise<!tsickle_interceptor_7.StreamResponse<I, O>>}
                 */
                async (req) => {
                    return {
                        message: (0, async_iterable_js_1.createAsyncIterable)([
                            (0, normalize_js_1.normalize)((/** @type {{kind: string, impl: function(!AsyncIterable<?, ?, ?>, !tsickle_implementation_4.HandlerContext): !Promise<?>, method: ?}} */ (spec)).method.output, await (/** @type {{kind: string, impl: function(!AsyncIterable<?, ?, ?>, !tsickle_implementation_4.HandlerContext): !Promise<?>, method: ?}} */ (spec)).impl(req.message, mergeRequest(context, req))),
                        ]),
                        stream: true,
                        method: (/** @type {{kind: string, impl: function(!AsyncIterable<?, ?, ?>, !tsickle_implementation_4.HandlerContext): !Promise<?>, method: ?}} */ (spec)).method,
                        ...responseCommon(context, spec),
                    };
                }));
            });
        }
        case "bidi_streaming":
            return (/**
             * @param {!AsyncIterable<?, ?, ?>} input
             * @return {!AsyncIterable<?, ?, ?>}
             */
            function biDiStreaming(input) {
                return invokeStreamImplementation(spec, context, input, interceptors, (/**
                 * @param {!tsickle_interceptor_7.StreamRequest<I, O>} req
                 * @return {!Promise<!tsickle_interceptor_7.StreamResponse<I, O>>}
                 */
                (req) => {
                    return Promise.resolve({
                        message: (0, normalize_js_1.normalizeIterable)((/** @type {{kind: string, impl: function(!AsyncIterable<?, ?, ?>, !tsickle_implementation_4.HandlerContext): !AsyncIterable<?, ?, ?>, method: ?}} */ (spec)).method.output, (/** @type {{kind: string, impl: function(!AsyncIterable<?, ?, ?>, !tsickle_implementation_4.HandlerContext): !AsyncIterable<?, ?, ?>, method: ?}} */ (spec)).impl(req.message, mergeRequest(context, req))),
                        stream: true,
                        method: (/** @type {{kind: string, impl: function(!AsyncIterable<?, ?, ?>, !tsickle_implementation_4.HandlerContext): !AsyncIterable<?, ?, ?>, method: ?}} */ (spec)).method,
                        ...responseCommon(context, spec),
                    });
                }));
            });
    }
}
exports.transformInvokeImplementation = transformInvokeImplementation;
/**
 * @template I, O
 * @param {?} spec
 * @param {!tsickle_implementation_4.HandlerContext} context
 * @param {!AsyncIterable<?, ?, ?>} input
 * @param {!Array<function(function((!tsickle_interceptor_7.StreamRequest<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>|!tsickle_interceptor_7.UnaryRequest<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>)): !Promise<(!tsickle_interceptor_7.StreamResponse<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>|!tsickle_interceptor_7.UnaryResponse<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>)>): function((!tsickle_interceptor_7.StreamRequest<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>|!tsickle_interceptor_7.UnaryRequest<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>)): !Promise<(!tsickle_interceptor_7.StreamResponse<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>|!tsickle_interceptor_7.UnaryResponse<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>)>>} interceptors
 * @param {function(!tsickle_interceptor_7.StreamRequest<I, O>): !Promise<!tsickle_interceptor_7.StreamResponse<I, O>>} anyFn
 * @return {!AsyncIterable<?, ?, ?>}
 */
async function* invokeStreamImplementation(spec, context, input, interceptors, anyFn) {
    /** @type {function(!tsickle_interceptor_7.StreamRequest<I, O>): !Promise<!tsickle_interceptor_7.StreamResponse<I, O>>} */
    const next = (0, interceptor_js_1.applyInterceptors)(anyFn, interceptors);
    const { message, header, trailer } = await next({
        stream: true,
        message: input,
        method: spec.method,
        ...requestCommon(context, spec),
    });
    copyHeaders(header, context.responseHeader);
    yield* message;
    copyHeaders(trailer, context.responseTrailer);
}
/**
 * @template T
 * @param {!AsyncIterable<T, ?, ?>} iterable
 * @param {string} method
 * @return {!Promise<T>}
 */
async function ensureSingle(iterable, method) {
    /** @type {!AsyncIterator<T, ?, ?>} */
    const it = iterable[Symbol.asyncIterator]();
    /** @type {(!IteratorReturnResult<?>|!IteratorYieldResult<T>)} */
    const first = await it.next();
    if (first.done === true) {
        throw new connect_error_js_1.ConnectError(`protocol error: missing input message for ${method} method`, code_js_1.Code.Unimplemented);
    }
    /** @type {(!IteratorReturnResult<?>|!IteratorYieldResult<T>)} */
    const second = await it.next();
    if (second.done !== true) {
        throw new connect_error_js_1.ConnectError(`protocol error: received extra input message for ${method} method`, code_js_1.Code.Unimplemented);
    }
    return (/** @type {!IteratorYieldResult<T>} */ (first)).value;
}
/**
 * @param {!tsickle_implementation_4.HandlerContext} context
 * @param {({kind: string, impl: function(*, !tsickle_implementation_4.HandlerContext): (!Promise<?>|?), method: ?}|{kind: string, impl: function(*, !tsickle_implementation_4.HandlerContext): !AsyncIterable<?, ?, ?>, method: ?}|{kind: string, impl: function(!AsyncIterable<*, ?, ?>, !tsickle_implementation_4.HandlerContext): !Promise<?>, method: ?}|{kind: string, impl: function(!AsyncIterable<*, ?, ?>, !tsickle_implementation_4.HandlerContext): !AsyncIterable<?, ?, ?>, method: ?})} spec
 * @return {!tsickle_interceptor_7.RequestCommon}
 */
function requestCommon(context, spec) {
    return {
        requestMethod: context.requestMethod,
        url: context.url,
        signal: context.signal,
        header: context.requestHeader,
        service: spec.method.parent,
        contextValues: context.values,
    };
}
/**
 * @param {!tsickle_implementation_4.HandlerContext} context
 * @param {({kind: string, impl: function(*, !tsickle_implementation_4.HandlerContext): (!Promise<?>|?), method: ?}|{kind: string, impl: function(*, !tsickle_implementation_4.HandlerContext): !AsyncIterable<?, ?, ?>, method: ?}|{kind: string, impl: function(!AsyncIterable<*, ?, ?>, !tsickle_implementation_4.HandlerContext): !Promise<?>, method: ?}|{kind: string, impl: function(!AsyncIterable<*, ?, ?>, !tsickle_implementation_4.HandlerContext): !AsyncIterable<?, ?, ?>, method: ?})} spec
 * @return {!tsickle_interceptor_7.ResponseCommon}
 */
function responseCommon(context, spec) {
    return {
        service: spec.method.parent,
        header: context.responseHeader,
        trailer: context.responseTrailer,
    };
}
/**
 * @param {!tsickle_implementation_4.HandlerContext} context
 * @param {!tsickle_interceptor_7.RequestCommon} req
 * @return {!tsickle_implementation_4.HandlerContext}
 */
function mergeRequest(context, req) {
    return {
        ...context,
        service: req.service,
        requestHeader: req.header,
        signal: req.signal,
        values: req.contextValues,
    };
}
/**
 * @param {!Headers} from
 * @param {!Headers} to
 * @return {void}
 */
function copyHeaders(from, to) {
    if (from === to) {
        return;
    }
    to.forEach((/**
     * @param {string} _
     * @param {string} key
     * @return {void}
     */
    (_, key) => {
        to.delete(key);
    }));
    from.forEach((/**
     * @param {string} value
     * @param {string} key
     * @return {void}
     */
    (value, key) => {
        to.set(key, value);
    }));
}
