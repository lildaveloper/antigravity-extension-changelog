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
 * Generated from: third_party/javascript/connectrpc_connect/src/interceptor.ts
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
goog.module('google3.third_party.javascript.connectrpc_connect.src.interceptor');
var module = module || { id: 'third_party/javascript/connectrpc_connect/src/interceptor.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_protobuf_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.index");
const tsickle_context_values_2 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.context$2dvalues");
/**
 * An interceptor can add logic to clients or servers, similar to the decorators
 * or middleware you may have seen in other libraries. Interceptors may
 * mutate the request and response, catch errors and retry/recover, emit
 * logs, or do nearly everything else.
 *
 * For a simple example, the following interceptor logs all requests:
 *
 * ```ts
 * const logger: Interceptor = (next) => async (req) => {
 *   console.log(`sending message to ${req.url}`);
 *   return await next(req);
 * };
 * ```
 *
 * You can think of interceptors like a layered onion. A request initiated
 * by a client goes through the outermost layer first. In the center, the
 * actual HTTP request is run by the transport. The response then comes back
 * through all layers and is returned to the client.
 *
 * Similarly, a request received by a server goes through the outermost layer
 * first. In the center, the actual HTTP request is received by the handler. The
 * response then comes back through all layers and is returned to the client.
 *
 * To implement that layering, Interceptors are functions that wrap a call
 * invocation. In an array of interceptors, the interceptor at the end of
 * the array is applied first.
 * @typedef {function(function((!StreamRequest<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>|!UnaryRequest<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>)): !Promise<(!StreamResponse<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>|!UnaryResponse<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>)>): function((!StreamRequest<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>|!UnaryRequest<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>)): !Promise<(!StreamResponse<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>|!UnaryResponse<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>)>}
 */
exports.Interceptor;
/**
 * AnyFn represents the client-side invocation of an RPC. Interceptors can wrap
 * this invocation, add request headers, and wrap parts of the request or
 * response to inspect and log.
 * @typedef {function((!StreamRequest<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>|!UnaryRequest<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>)): !Promise<(!StreamResponse<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>|!UnaryResponse<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>)>}
 */
var AnyFn;
/**
 * UnaryRequest is used in interceptors to represent a request with a
 * single input message.
 * @record
 * @template I, O
 * @extends {RequestCommon}
 */
function UnaryRequest() { }
exports.UnaryRequest = UnaryRequest;
/* istanbul ignore if */
if (false) {
    /**
     * The `stream` property discriminates between UnaryRequest and
     * StreamingRequest.
     * @const {boolean}
     * @public
     */
    UnaryRequest.prototype.stream;
    /**
     * The input message that will be transmitted.
     * @const {?}
     * @public
     */
    UnaryRequest.prototype.message;
    /**
     * Metadata related to the service method that is being called.
     * @const {?}
     * @public
     */
    UnaryRequest.prototype.method;
}
/**
 * UnaryResponse is used in interceptors to represent a response with
 * a single output message.
 * @record
 * @template I, O
 * @extends {ResponseCommon}
 */
function UnaryResponse() { }
exports.UnaryResponse = UnaryResponse;
/* istanbul ignore if */
if (false) {
    /**
     * The `stream` property discriminates between UnaryResponse and
     * StreamingConn.
     * @const {boolean}
     * @public
     */
    UnaryResponse.prototype.stream;
    /**
     * The received output message.
     * @const {?}
     * @public
     */
    UnaryResponse.prototype.message;
    /**
     * Metadata related to the service method that is being called.
     * @const {?}
     * @public
     */
    UnaryResponse.prototype.method;
}
/**
 * StreamRequest is used in interceptors to represent a request that has
 * zero or more input messages, and zero or more output messages.
 * @record
 * @template I, O
 * @extends {RequestCommon}
 */
function StreamRequest() { }
exports.StreamRequest = StreamRequest;
/* istanbul ignore if */
if (false) {
    /**
     * The `stream` property discriminates between UnaryRequest and
     * StreamingRequest.
     * @const {boolean}
     * @public
     */
    StreamRequest.prototype.stream;
    /**
     * The input messages that will be transmitted.
     * @const {!AsyncIterable<?, ?, ?>}
     * @public
     */
    StreamRequest.prototype.message;
    /**
     * Metadata related to the service method that is being called.
     * @const {?}
     * @public
     */
    StreamRequest.prototype.method;
}
/**
 * StreamResponse is used in interceptors to represent an ongoing call that has
 * zero or more input messages, and zero or more output messages.
 * @record
 * @template I, O
 * @extends {ResponseCommon}
 */
function StreamResponse() { }
exports.StreamResponse = StreamResponse;
/* istanbul ignore if */
if (false) {
    /**
     * The `stream` property discriminates between UnaryResponse and
     * StreamingConn.
     * @const {boolean}
     * @public
     */
    StreamResponse.prototype.stream;
    /**
     * The output messages.
     * @const {!AsyncIterable<?, ?, ?>}
     * @public
     */
    StreamResponse.prototype.message;
    /**
     * Metadata related to the service method that is being called.
     * @const {?}
     * @public
     */
    StreamResponse.prototype.method;
}
/**
 * @record
 */
function RequestCommon() { }
exports.RequestCommon = RequestCommon;
/* istanbul ignore if */
if (false) {
    /**
     * Metadata related to the service that is being called.
     * @const {!tsickle_protobuf_1.DescService}
     * @public
     */
    RequestCommon.prototype.service;
    /**
     * HTTP method of the request. Server-side interceptors may use this value
     * to identify Connect GET requests.
     * @const {string}
     * @public
     */
    RequestCommon.prototype.requestMethod;
    /**
     * The URL the request is going to hit for the clients or the
     * URL received by the server.
     * @const {string}
     * @public
     */
    RequestCommon.prototype.url;
    /**
     * The AbortSignal for the current call.
     * @const {!AbortSignal}
     * @public
     */
    RequestCommon.prototype.signal;
    /**
     * Headers that will be sent along with the request.
     * @const {!Headers}
     * @public
     */
    RequestCommon.prototype.header;
    /**
     * The context values for the current call.
     * @const {!tsickle_context_values_2.ContextValues}
     * @public
     */
    RequestCommon.prototype.contextValues;
}
/**
 * @record
 */
function ResponseCommon() { }
exports.ResponseCommon = ResponseCommon;
/* istanbul ignore if */
if (false) {
    /**
     * Metadata related to the service that is being called.
     * @const {!tsickle_protobuf_1.DescService}
     * @public
     */
    ResponseCommon.prototype.service;
    /**
     * Headers received from the response.
     * @const {!Headers}
     * @public
     */
    ResponseCommon.prototype.header;
    /**
     * Trailers received from the response.
     * Note that trailers are only populated when the entirety of the response
     * has been read.
     * @const {!Headers}
     * @public
     */
    ResponseCommon.prototype.trailer;
}
/**
 * applyInterceptors takes the given UnaryFn or ServerStreamingFn, and wraps
 * it with each of the given interceptors, returning a new UnaryFn or
 * ServerStreamingFn.
 * @template T
 * @param {T} next
 * @param {(undefined|!Array<function(function((!StreamRequest<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>|!UnaryRequest<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>)): !Promise<(!StreamResponse<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>|!UnaryResponse<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>)>): function((!StreamRequest<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>|!UnaryRequest<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>)): !Promise<(!StreamResponse<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>|!UnaryResponse<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>)>>)} interceptors
 * @return {T}
 */
function applyInterceptors(next, interceptors) {
    if (!interceptors) {
        return next;
    }
    for (const i of interceptors.concat().reverse()) {
        next = (/** @type {T} */ (i((/** @type {function((!StreamRequest<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>|!UnaryRequest<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>)): !Promise<(!StreamResponse<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>|!UnaryResponse<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>)>} */ (next)))));
    }
    return next;
}
exports.applyInterceptors = applyInterceptors;
