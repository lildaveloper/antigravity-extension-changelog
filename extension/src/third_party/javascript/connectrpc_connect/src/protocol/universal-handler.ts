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
 * Generated from: third_party/javascript/connectrpc_connect/src/protocol/universal-handler.ts
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
goog.module('google3.third_party.javascript.connectrpc_connect.src.protocol.universal$2dhandler');
var module = module || { id: 'third_party/javascript/connectrpc_connect/src/protocol/universal-handler.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_protobuf_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.index");
const tsickle_implementation_2 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.implementation");
const tsickle_universal_3 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.universal");
const tsickle_content_type_matcher_4 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.content$2dtype$2dmatcher");
const tsickle_compression_5 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.compression");
const tsickle_protocol_handler_factory_6 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.protocol$2dhandler$2dfactory");
const tsickle_limit_io_7 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.limit$2dio");
const tsickle_connect_error_8 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.connect$2derror");
const tsickle_code_9 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.code");
const tsickle_interceptor_10 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.interceptor");
const universal_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol.universal');
const content_type_matcher_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol.content$2dtype$2dmatcher');
const limit_io_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol.limit$2dio');
const connect_error_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.connect$2derror');
const code_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.code');
/**
 * Common options for handlers.
 *
 * @record
 */
function UniversalHandlerOptions() { }
exports.UniversalHandlerOptions = UniversalHandlerOptions;
/* istanbul ignore if */
if (false) {
    /**
     * Compression algorithms available to a server for decompressing request
     * messages, and for compressing response messages.
     * @type {!Array<!tsickle_compression_5.Compression>}
     * @public
     */
    UniversalHandlerOptions.prototype.acceptCompression;
    /**
     * Sets a minimum size threshold for compression: Messages that are smaller
     * than the configured minimum are sent uncompressed.
     *
     * The default value is 1 kibibyte, because the CPU cost of compressing very
     * small messages usually isn't worth the small reduction in network I/O.
     * @type {number}
     * @public
     */
    UniversalHandlerOptions.prototype.compressMinBytes;
    /**
     * Limits the performance impact of pathologically large messages sent by the
     * client. Limits apply to each individual message, not to the stream as a
     * whole.
     *
     * The default limit is the maximum supported value of ~4GiB.
     * @type {number}
     * @public
     */
    UniversalHandlerOptions.prototype.readMaxBytes;
    /**
     * Prevents sending messages too large for the client to handle.
     *
     * The default limit is the maximum supported value of ~4GiB.
     * @type {number}
     * @public
     */
    UniversalHandlerOptions.prototype.writeMaxBytes;
    /**
     * Options for the JSON format.
     * By default, unknown fields are ignored.
     * @type {(undefined|?)}
     * @public
     */
    UniversalHandlerOptions.prototype.jsonOptions;
    /**
     * Options for the binary wire format.
     * @type {(undefined|?)}
     * @public
     */
    UniversalHandlerOptions.prototype.binaryOptions;
    /**
     * The maximum value for timeouts that clients may specify.
     * If a clients requests a timeout that is greater than maxTimeoutMs,
     * the server responds with the error code InvalidArgument.
     * @type {number}
     * @public
     */
    UniversalHandlerOptions.prototype.maxTimeoutMs;
    /**
     * To shut down servers gracefully, this option takes an AbortSignal.
     * If this signal is aborted, all signals in handler contexts will be aborted
     * as well. This gives implementations a chance to wrap up work before the
     * server process is killed.
     * Abort this signal with a ConnectError to send a message and code to
     * clients.
     * @type {(undefined|!AbortSignal)}
     * @public
     */
    UniversalHandlerOptions.prototype.shutdownSignal;
    /**
     * Require requests using the Connect protocol to include the header
     * Connect-Protocol-Version. This ensures that HTTP proxies and other
     * code inspecting traffic can easily identify Connect RPC requests,
     * even if they use a common Content-Type like application/json.
     *
     * If a Connect request does not include the Connect-Protocol-Version
     * header, an error with code invalid_argument (HTTP 400) is returned.
     * This option has no effect if the client uses the gRPC or the gRPC-web
     * protocol.
     * @type {boolean}
     * @public
     */
    UniversalHandlerOptions.prototype.requireConnectProtocolHeader;
    /**
     * Interceptors that should be applied to all calls running through
     * this router. See the Interceptor type for details.
     * @type {!Array<function(function((!tsickle_interceptor_10.UnaryRequest<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>|!tsickle_interceptor_10.StreamRequest<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>)): !Promise<(!tsickle_interceptor_10.UnaryResponse<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>|!tsickle_interceptor_10.StreamResponse<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>)>): function((!tsickle_interceptor_10.UnaryRequest<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>|!tsickle_interceptor_10.StreamRequest<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>)): !Promise<(!tsickle_interceptor_10.UnaryResponse<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>|!tsickle_interceptor_10.StreamResponse<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>)>>}
     * @public
     */
    UniversalHandlerOptions.prototype.interceptors;
}
/**
 * An HTTP handler for one specific RPC - a procedure typically defined in
 * protobuf.
 * @record
 * tsickle: dropped extends: dropped extends of a type literal: UniversalHandlerFn
 */
function UniversalHandler() { }
exports.UniversalHandler = UniversalHandler;
/* istanbul ignore if */
if (false) {
    /**
     * The name of the protocols this handler implements.
     * @type {!Array<string>}
     * @public
     */
    UniversalHandler.prototype.protocolNames;
    /**
     * Information about the related protobuf service.
     * @type {!tsickle_protobuf_1.DescService}
     * @public
     */
    UniversalHandler.prototype.service;
    /**
     * Information about the method of the protobuf service.
     * @type {!tsickle_protobuf_1.DescMethod}
     * @public
     */
    UniversalHandler.prototype.method;
    /**
     * The request path of the procedure, without any prefixes.
     * For example, "/something/foo.FooService/Bar" for the method
     * "Bar" of the service "foo.FooService".
     * @type {string}
     * @public
     */
    UniversalHandler.prototype.requestPath;
    /**
     * The HTTP request methods this procedure allows. For example, "POST".
     * @type {!Array<string>}
     * @public
     */
    UniversalHandler.prototype.allowedMethods;
    /**
     * A matcher for Content-Type header values that this procedure supports.
     * @type {!tsickle_content_type_matcher_4.ContentTypeMatcher}
     * @public
     */
    UniversalHandler.prototype.supportedContentType;
}
/**
 * Asserts that the options are within sane limits, and returns default values
 * where no value is provided.
 *
 * Note that this function does not set default values for `acceptCompression`.
 *
 * @param {(undefined|?)} opt
 * @return {!UniversalHandlerOptions}
 */
function validateUniversalHandlerOptions(opt) {
    opt ??= {};
    /** @type {!Array<!tsickle_compression_5.Compression>} */
    const acceptCompression = opt.acceptCompression
        ? [...opt.acceptCompression]
        : [];
    /** @type {boolean} */
    const requireConnectProtocolHeader = opt.requireConnectProtocolHeader ?? false;
    /** @type {number} */
    const maxTimeoutMs = opt.maxTimeoutMs ?? Number.MAX_SAFE_INTEGER;
    return {
        acceptCompression,
        ...(0, limit_io_js_1.validateReadWriteMaxBytes)(opt.readMaxBytes, opt.writeMaxBytes, opt.compressMinBytes),
        jsonOptions: opt.jsonOptions,
        binaryOptions: opt.binaryOptions,
        maxTimeoutMs,
        shutdownSignal: opt.shutdownSignal,
        requireConnectProtocolHeader,
        interceptors: opt.interceptors ?? [],
    };
}
exports.validateUniversalHandlerOptions = validateUniversalHandlerOptions;
/**
 * For the given service implementation, return a universal handler for each
 * RPC. The handler serves the given protocols.
 *
 * At least one protocol is required.
 *
 * @param {{service: !tsickle_protobuf_1.DescService, methods: !Object<string,({kind: string, impl: function(*, !tsickle_implementation_2.HandlerContext): (?|!Promise<?>), method: ?}|{kind: string, impl: function(*, !tsickle_implementation_2.HandlerContext): !AsyncIterable<?, ?, ?>, method: ?}|{kind: string, impl: function(!AsyncIterable<*, ?, ?>, !tsickle_implementation_2.HandlerContext): !Promise<?>, method: ?}|{kind: string, impl: function(!AsyncIterable<*, ?, ?>, !tsickle_implementation_2.HandlerContext): !AsyncIterable<?, ?, ?>, method: ?})>}} spec
 * @param {!Array<!tsickle_protocol_handler_factory_6.ProtocolHandlerFactory>} protocols
 * @return {!Array<!UniversalHandler>}
 */
function createUniversalServiceHandlers(spec, protocols) {
    return Object.entries(spec.methods).map((/**
     * @param {!Array<?>} __0
     * @return {!UniversalHandler}
     */
    ([, implSpec__tsickle_destructured_1]) => {
        let implSpec = /** @type {({kind: string, impl: function(*, !tsickle_implementation_2.HandlerContext): (?|!Promise<?>), method: ?}|{kind: string, impl: function(*, !tsickle_implementation_2.HandlerContext): !AsyncIterable<?, ?, ?>, method: ?}|{kind: string, impl: function(!AsyncIterable<*, ?, ?>, !tsickle_implementation_2.HandlerContext): !Promise<?>, method: ?}|{kind: string, impl: function(!AsyncIterable<*, ?, ?>, !tsickle_implementation_2.HandlerContext): !AsyncIterable<?, ?, ?>, method: ?})} */ (implSpec__tsickle_destructured_1);
        return (createUniversalMethodHandler(implSpec, protocols));
    }));
}
exports.createUniversalServiceHandlers = createUniversalServiceHandlers;
/**
 * Return a universal handler for the given RPC implementation.
 * The handler serves the given protocols.
 *
 * At least one protocol is required.
 *
 * @param {({kind: string, impl: function(*, !tsickle_implementation_2.HandlerContext): (?|!Promise<?>), method: ?}|{kind: string, impl: function(*, !tsickle_implementation_2.HandlerContext): !AsyncIterable<?, ?, ?>, method: ?}|{kind: string, impl: function(!AsyncIterable<*, ?, ?>, !tsickle_implementation_2.HandlerContext): !Promise<?>, method: ?}|{kind: string, impl: function(!AsyncIterable<*, ?, ?>, !tsickle_implementation_2.HandlerContext): !AsyncIterable<?, ?, ?>, method: ?})} spec
 * @param {!Array<!tsickle_protocol_handler_factory_6.ProtocolHandlerFactory>} protocols
 * @return {!UniversalHandler}
 */
function createUniversalMethodHandler(spec, protocols) {
    return negotiateProtocol(protocols.map((/**
     * @param {!tsickle_protocol_handler_factory_6.ProtocolHandlerFactory} f
     * @return {!UniversalHandler}
     */
    (f) => f(spec))));
}
exports.createUniversalMethodHandler = createUniversalMethodHandler;
/**
 * Create a universal handler that negotiates the protocol.
 *
 * This functions takes one or more handlers - all for the same RPC, but for
 * different protocols - and returns a single handler that looks at the
 * Content-Type header and the HTTP verb of the incoming request to select
 * the appropriate protocol-specific handler.
 *
 * Raises an error if no protocol handlers were provided, or if they do not
 * handle exactly the same RPC.
 *
 * @param {!Array<!UniversalHandler>} protocolHandlers
 * @return {!UniversalHandler}
 */
function negotiateProtocol(protocolHandlers) {
    if (protocolHandlers.length == 0) {
        throw new connect_error_js_1.ConnectError("at least one protocol is required", code_js_1.Code.Internal);
    }
    /** @type {!tsickle_protobuf_1.DescService} */
    const service = protocolHandlers[0].service;
    /** @type {!tsickle_protobuf_1.DescMethod} */
    const method = protocolHandlers[0].method;
    /** @type {string} */
    const requestPath = protocolHandlers[0].requestPath;
    if (protocolHandlers.some((/**
     * @param {!UniversalHandler} h
     * @return {boolean}
     */
    (h) => h.service !== service || h.method !== method))) {
        throw new connect_error_js_1.ConnectError("cannot negotiate protocol for different RPCs", code_js_1.Code.Internal);
    }
    if (protocolHandlers.some((/**
     * @param {!UniversalHandler} h
     * @return {boolean}
     */
    (h) => h.requestPath !== requestPath))) {
        throw new connect_error_js_1.ConnectError("cannot negotiate protocol for different requestPaths", code_js_1.Code.Internal);
    }
    /**
     * @param {!tsickle_universal_3.UniversalServerRequest} request
     * @return {!Promise<?>}
     */
    async function protocolNegotiatingHandler(request) {
        if (method.methodKind == "bidi_streaming" &&
            request.httpVersion.startsWith("1.")) {
            return {
                ...universal_js_1.uResponseVersionNotSupported,
                // Clients coded to expect full-duplex connections may hang if they've
                // mistakenly negotiated HTTP/1.1. To unblock them, we must close the
                // underlying TCP connection.
                header: new Headers({ Connection: "close" }),
            };
        }
        /** @type {string} */
        const contentType = request.header.get("Content-Type") ?? "";
        /** @type {!Array<!UniversalHandler>} */
        const matchingMethod = protocolHandlers.filter((/**
         * @param {!UniversalHandler} h
         * @return {boolean}
         */
        (h) => h.allowedMethods.includes(request.method)));
        if (matchingMethod.length == 0) {
            return universal_js_1.uResponseMethodNotAllowed;
        }
        // If Content-Type is unset but only one handler matches, use it.
        if (matchingMethod.length == 1 && contentType === "") {
            /** @type {!UniversalHandler} */
            const onlyMatch = matchingMethod[0];
            return onlyMatch(request);
        }
        /** @type {!Array<!UniversalHandler>} */
        const matchingContentTypes = matchingMethod.filter((/**
         * @param {!UniversalHandler} h
         * @return {boolean}
         */
        (h) => h.supportedContentType(contentType)));
        if (matchingContentTypes.length == 0) {
            return universal_js_1.uResponseUnsupportedMediaType;
        }
        /** @type {!UniversalHandler} */
        const firstMatch = matchingContentTypes[0];
        return firstMatch(request);
    }
    return Object.assign(protocolNegotiatingHandler, {
        service,
        method,
        requestPath,
        supportedContentType: (0, content_type_matcher_js_1.contentTypeMatcher)(...protocolHandlers.map((/**
         * @param {!UniversalHandler} h
         * @return {!tsickle_content_type_matcher_4.ContentTypeMatcher}
         */
        (h) => h.supportedContentType))),
        protocolNames: protocolHandlers
            .flatMap((/**
         * @param {!UniversalHandler} h
         * @return {!Array<string>}
         */
        (h) => h.protocolNames))
            .filter((/**
         * @param {string} value
         * @param {number} index
         * @param {!Array<string>} array
         * @return {boolean}
         */
        (value, index, array) => array.indexOf(value) === index)),
        allowedMethods: protocolHandlers
            .flatMap((/**
         * @param {!UniversalHandler} h
         * @return {!Array<string>}
         */
        (h) => h.allowedMethods))
            .filter((/**
         * @param {string} value
         * @param {number} index
         * @param {!Array<string>} array
         * @return {boolean}
         */
        (value, index, array) => array.indexOf(value) === index)),
    });
}
exports.negotiateProtocol = negotiateProtocol;
