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
 * Generated from: third_party/javascript/connectrpc_connect/src/implementation.ts
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
goog.module('google3.third_party.javascript.connectrpc_connect.src.implementation');
var module = module || { id: 'third_party/javascript/connectrpc_connect/src/implementation.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_protobuf_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.index");
const tsickle_connect_error_2 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.connect$2derror");
const tsickle_code_3 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.code");
const tsickle_signals_4 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.signals");
const tsickle_context_values_5 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.context$2dvalues");
const connect_error_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.connect$2derror');
const code_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.code');
const signals_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol.signals');
const context_values_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.context$2dvalues');
/**
 * ServiceImpl is the interface of the implementation of a service.
 * @typedef {?}
 */
exports.ServiceImpl;
/**
 * MethodImpl is the signature of the implementation of an RPC.
 * @typedef {?}
 */
exports.MethodImpl;
/**
 * Context for an RPC on the server. Every RPC implementation can accept a
 * HandlerContext as an argument to gain access to headers and service metadata.
 * @record
 */
function HandlerContext() { }
exports.HandlerContext = HandlerContext;
/* istanbul ignore if */
if (false) {
    /**
     * Metadata for the method being called.
     * @const {!tsickle_protobuf_1.DescMethod}
     * @public
     */
    HandlerContext.prototype.method;
    /**
     * Metadata for the service being called.
     * @const {!tsickle_protobuf_1.DescService}
     * @public
     */
    HandlerContext.prototype.service;
    /**
     * An AbortSignal that triggers when the deadline is reached, or when an error
     * occurs that aborts processing of the request, but also when the RPC is
     * completed without error.
     *
     * The signal can be used to automatically cancel downstream calls.
     * @const {!AbortSignal}
     * @public
     */
    HandlerContext.prototype.signal;
    /**
     * If the current request has a timeout, this function returns the remaining
     * time.
     * @const {function(): (undefined|number)}
     * @public
     */
    HandlerContext.prototype.timeoutMs;
    /**
     * HTTP method of incoming request, usually "POST", but "GET" in the case of
     * Connect Get.
     * @const {string}
     * @public
     */
    HandlerContext.prototype.requestMethod;
    /**
     * Incoming request headers.
     * @const {!Headers}
     * @public
     */
    HandlerContext.prototype.requestHeader;
    /**
     * Outgoing response headers.
     *
     * For methods that return a stream, response headers must be set before
     * yielding the first response message.
     * @const {!Headers}
     * @public
     */
    HandlerContext.prototype.responseHeader;
    /**
     * Outgoing response trailers.
     * @const {!Headers}
     * @public
     */
    HandlerContext.prototype.responseTrailer;
    /**
     * Name of the RPC protocol in use; one of "connect", "grpc" or "grpc-web".
     * @const {string}
     * @public
     */
    HandlerContext.prototype.protocolName;
    /**
     * Per RPC context values that can be used to pass data to handlers.
     * @const {!tsickle_context_values_5.ContextValues}
     * @public
     */
    HandlerContext.prototype.values;
    /**
     * The URL received by the server.
     * @const {string}
     * @public
     */
    HandlerContext.prototype.url;
}
/**
 * Options for creating a HandlerContext.
 * @record
 */
function HandlerContextInit() { }
/* istanbul ignore if */
if (false) {
    /**
     * @type {!tsickle_protobuf_1.DescService}
     * @public
     */
    HandlerContextInit.prototype.service;
    /**
     * @type {!tsickle_protobuf_1.DescMethod}
     * @public
     */
    HandlerContextInit.prototype.method;
    /**
     * @type {string}
     * @public
     */
    HandlerContextInit.prototype.protocolName;
    /**
     * @type {string}
     * @public
     */
    HandlerContextInit.prototype.requestMethod;
    /**
     * @type {string}
     * @public
     */
    HandlerContextInit.prototype.url;
    /**
     * @type {(undefined|number)}
     * @public
     */
    HandlerContextInit.prototype.timeoutMs;
    /**
     * @type {(undefined|!AbortSignal)}
     * @public
     */
    HandlerContextInit.prototype.shutdownSignal;
    /**
     * @type {(undefined|!AbortSignal)}
     * @public
     */
    HandlerContextInit.prototype.requestSignal;
    /**
     * @type {(undefined|!Array<!Array<?>>|!Headers|?)}
     * @public
     */
    HandlerContextInit.prototype.requestHeader;
    /**
     * @type {(undefined|!Array<!Array<?>>|!Headers|?)}
     * @public
     */
    HandlerContextInit.prototype.responseHeader;
    /**
     * @type {(undefined|!Array<!Array<?>>|!Headers|?)}
     * @public
     */
    HandlerContextInit.prototype.responseTrailer;
    /**
     * @type {(undefined|!tsickle_context_values_5.ContextValues)}
     * @public
     */
    HandlerContextInit.prototype.contextValues;
}
/**
 * @record
 * @extends {HandlerContext}
 */
function HandlerContextController() { }
/* istanbul ignore if */
if (false) {
    /**
     * @public
     * @param {*=} reason
     * @return {void}
     */
    HandlerContextController.prototype.abort = function (reason) { };
}
/**
 * Create a new HandlerContext.
 *
 * The context is usually automatically created by handlers, but if a service
 * implementation is used in unit tests, this function can be used to create
 * a context.
 * @param {!HandlerContextInit} init
 * @return {!HandlerContextController}
 */
function createHandlerContext(init) {
    /** @type {function(): (undefined|number)} */
    let timeoutMs;
    if (init.timeoutMs !== undefined) {
        /** @type {!Date} */
        const date = new Date(Date.now() + init.timeoutMs);
        timeoutMs = (/**
         * @return {number}
         */
        () => date.getTime() - Date.now());
    }
    else {
        timeoutMs = (/**
         * @return {undefined}
         */
        () => undefined);
    }
    /** @type {{signal: !AbortSignal, cleanup: function(): void}} */
    const deadline = (0, signals_js_1.createDeadlineSignal)(init.timeoutMs);
    /** @type {!AbortController} */
    const abortController = (0, signals_js_1.createLinkedAbortController)(deadline.signal, init.requestSignal, init.shutdownSignal);
    return {
        ...init,
        signal: abortController.signal,
        timeoutMs,
        requestHeader: new Headers(init.requestHeader),
        responseHeader: new Headers(init.responseHeader),
        responseTrailer: new Headers(init.responseTrailer),
        /**
         * @public
         * @param {*=} reason
         * @return {void}
         */
        abort(reason) {
            deadline.cleanup();
            abortController.abort(reason);
        },
        values: init.contextValues ?? (0, context_values_js_1.createContextValues)(),
    };
}
exports.createHandlerContext = createHandlerContext;
/**
 * UnaryImpl is the signature of the implementation of a unary RPC.
 * @typedef {function(?, !HandlerContext): (!Promise<?>|?)}
 */
exports.UnaryImpl;
/**
 * ClientStreamingImpl is the signature of the implementation of a
 * client-streaming RPC.
 * @typedef {function(!AsyncIterable<?, ?, ?>, !HandlerContext): !Promise<?>}
 */
exports.ClientStreamingImpl;
/**
 * ServerStreamingImpl is the signature of the implementation of a
 * server-streaming RPC.
 * @typedef {function(?, !HandlerContext): !AsyncIterable<?, ?, ?>}
 */
exports.ServerStreamingImpl;
/**
 * BiDiStreamingImpl is the signature of the implementation of a bi-di
 * streaming RPC.
 * @typedef {function(!AsyncIterable<?, ?, ?>, !HandlerContext): !AsyncIterable<?, ?, ?>}
 */
exports.BiDiStreamingImpl;
/**
 * Wraps a user-provided implementation along with service and method
 * metadata in a discriminated union type.
 * @typedef {({kind: string, impl: function(?, !HandlerContext): (!Promise<?>|?), method: ?}|{kind: string, impl: function(?, !HandlerContext): !AsyncIterable<?, ?, ?>, method: ?}|{kind: string, impl: function(!AsyncIterable<?, ?, ?>, !HandlerContext): !Promise<?>, method: ?}|{kind: string, impl: function(!AsyncIterable<?, ?, ?>, !HandlerContext): !AsyncIterable<?, ?, ?>, method: ?})}
 */
exports.MethodImplSpec;
/**
 * Wraps a user-provided service implementation and provides metadata.
 * @typedef {{service: !tsickle_protobuf_1.DescService, methods: !Object<string,({kind: string, impl: function(*, !HandlerContext): (!Promise<?>|?), method: ?}|{kind: string, impl: function(*, !HandlerContext): !AsyncIterable<?, ?, ?>, method: ?}|{kind: string, impl: function(!AsyncIterable<*, ?, ?>, !HandlerContext): !Promise<?>, method: ?}|{kind: string, impl: function(!AsyncIterable<*, ?, ?>, !HandlerContext): !AsyncIterable<?, ?, ?>, method: ?})>}}
 */
exports.ServiceImplSpec;
/**
 * Create an MethodImplSpec - a user-provided implementation for a method,
 * wrapped in a discriminated union type along with service and method metadata.
 * @template M
 * @param {M} method
 * @param {?} impl
 * @return {({kind: string, impl: function(*, !HandlerContext): (!Promise<?>|?), method: ?}|{kind: string, impl: function(*, !HandlerContext): !AsyncIterable<?, ?, ?>, method: ?}|{kind: string, impl: function(!AsyncIterable<*, ?, ?>, !HandlerContext): !Promise<?>, method: ?}|{kind: string, impl: function(!AsyncIterable<*, ?, ?>, !HandlerContext): !AsyncIterable<?, ?, ?>, method: ?})}
 */
function createMethodImplSpec(method, impl) {
    return (/** @type {({kind: string, impl: function(*, !HandlerContext): (!Promise<?>|?), method: ?}|{kind: string, impl: function(*, !HandlerContext): !AsyncIterable<?, ?, ?>, method: ?}|{kind: string, impl: function(!AsyncIterable<*, ?, ?>, !HandlerContext): !Promise<?>, method: ?}|{kind: string, impl: function(!AsyncIterable<*, ?, ?>, !HandlerContext): !AsyncIterable<?, ?, ?>, method: ?})} */ ({
        kind: method.methodKind,
        method,
        impl,
    }));
}
exports.createMethodImplSpec = createMethodImplSpec;
/**
 * Create an ServiceImplSpec - a user-provided service implementation wrapped
 * with metadata.
 * @template Desc
 * @param {!tsickle_protobuf_1.DescService} service
 * @param {?} impl
 * @return {{service: !tsickle_protobuf_1.DescService, methods: !Object<string,({kind: string, impl: function(*, !HandlerContext): (!Promise<?>|?), method: ?}|{kind: string, impl: function(*, !HandlerContext): !AsyncIterable<?, ?, ?>, method: ?}|{kind: string, impl: function(!AsyncIterable<*, ?, ?>, !HandlerContext): !Promise<?>, method: ?}|{kind: string, impl: function(!AsyncIterable<*, ?, ?>, !HandlerContext): !AsyncIterable<?, ?, ?>, method: ?})>}}
 */
function createServiceImplSpec(service, impl) {
    /** @type {{service: !tsickle_protobuf_1.DescService, methods: !Object<string,({kind: string, impl: function(*, !HandlerContext): (!Promise<?>|?), method: ?}|{kind: string, impl: function(*, !HandlerContext): !AsyncIterable<?, ?, ?>, method: ?}|{kind: string, impl: function(!AsyncIterable<*, ?, ?>, !HandlerContext): !Promise<?>, method: ?}|{kind: string, impl: function(!AsyncIterable<*, ?, ?>, !HandlerContext): !AsyncIterable<?, ?, ?>, method: ?})>}} */
    const s = { service, methods: {} };
    for (const method of service.methods) {
        /** @type {(undefined|function(!AsyncIterable<*, ?, ?>, !HandlerContext): !AsyncIterable<?, ?, ?>|function(!AsyncIterable<*, ?, ?>, !HandlerContext): !Promise<?>|function(*, !HandlerContext): !AsyncIterable<?, ?, ?>|function(*, !HandlerContext): (!Promise<?>|?))} */
        let fn = impl[method.localName];
        if (typeof fn == "function") {
            fn = fn.bind(impl);
        }
        else {
            /** @type {string} */
            const message = `${service.typeName}.${method.name} is not implemented`;
            fn = (/**
             * @return {?}
             */
            function unimplemented() {
                throw new connect_error_js_1.ConnectError(message, code_js_1.Code.Unimplemented);
            });
        }
        s.methods[method.localName] = createMethodImplSpec((/** @type {?} */ (method)), fn);
    }
    return s;
}
exports.createServiceImplSpec = createServiceImplSpec;
