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
 * Generated from: third_party/javascript/connectrpc_connect/src/protocol-grpc-web/handler-factory.ts
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
goog.module('google3.third_party.javascript.connectrpc_connect.src.protocol$2dgrpc$2dweb.handler$2dfactory');
var module = module || { id: 'third_party/javascript/connectrpc_connect/src/protocol-grpc-web/handler-factory.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_protobuf_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.index");
const tsickle_connect_error_2 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.connect$2derror");
const tsickle_code_3 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.code");
const tsickle_implementation_4 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.implementation");
const tsickle_trailer_5 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol$2dgrpc$2dweb.trailer");
const tsickle_headers_6 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol$2dgrpc$2dweb.headers");
const tsickle_content_type_7 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol$2dgrpc$2dweb.content$2dtype");
const tsickle_parse_timeout_8 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol$2dgrpc.parse$2dtimeout");
const tsickle_trailer_status_9 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol$2dgrpc.trailer$2dstatus");
const tsickle_async_iterable_10 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.async$2diterable");
const tsickle_compression_11 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.compression");
const tsickle_content_type_matcher_12 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.content$2dtype$2dmatcher");
const tsickle_create_method_url_13 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.create$2dmethod$2durl");
const tsickle_envelope_14 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.envelope");
const tsickle_invoke_implementation_15 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.invoke$2dimplementation");
const tsickle_protocol_handler_factory_16 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.protocol$2dhandler$2dfactory");
const tsickle_serialization_17 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.serialization");
const tsickle_universal_handler_18 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.universal$2dhandler");
const tsickle_universal_19 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.universal");
const connect_error_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.connect$2derror');
const code_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.code');
const implementation_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.implementation');
const trailer_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol$2dgrpc$2dweb.trailer');
const headers_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol$2dgrpc$2dweb.headers');
const content_type_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol$2dgrpc$2dweb.content$2dtype');
const parse_timeout_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol$2dgrpc.parse$2dtimeout');
const trailer_status_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol$2dgrpc.trailer$2dstatus');
const async_iterable_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol.async$2diterable');
const compression_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol.compression');
const content_type_matcher_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol.content$2dtype$2dmatcher');
const create_method_url_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol.create$2dmethod$2durl');
const invoke_implementation_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol.invoke$2dimplementation');
const serialization_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol.serialization');
const universal_handler_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol.universal$2dhandler');
const universal_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol.universal');
/** @type {string} */
const protocolName = "grpc-web";
/** @type {string} */
const methodPost = "POST";
/**
 * Create a factory that creates gRPC-web handlers.
 * @param {?} options
 * @return {!tsickle_protocol_handler_factory_16.ProtocolHandlerFactory}
 */
function createHandlerFactory(options) {
    /** @type {!tsickle_universal_handler_18.UniversalHandlerOptions} */
    const opt = (0, universal_handler_js_1.validateUniversalHandlerOptions)(options);
    /** @type {!tsickle_serialization_17.Serialization<!Headers>} */
    const trailerSerialization = (0, trailer_js_1.createTrailerSerialization)();
    /**
     * @param {({kind: string, impl: function(*, !tsickle_implementation_4.HandlerContext): (!Promise<?>|?), method: ?}|{kind: string, impl: function(*, !tsickle_implementation_4.HandlerContext): !AsyncIterable<?, ?, ?>, method: ?}|{kind: string, impl: function(!AsyncIterable<*, ?, ?>, !tsickle_implementation_4.HandlerContext): !Promise<?>, method: ?}|{kind: string, impl: function(!AsyncIterable<*, ?, ?>, !tsickle_implementation_4.HandlerContext): !AsyncIterable<?, ?, ?>, method: ?})} spec
     * @return {?}
     */
    function fact(spec) {
        /** @type {function(!tsickle_universal_19.UniversalServerRequest): !Promise<!tsickle_universal_19.UniversalServerResponse>} */
        const h = createHandler(opt, trailerSerialization, spec);
        return Object.assign(h, {
            protocolNames: [protocolName],
            allowedMethods: [methodPost],
            supportedContentType: (0, content_type_matcher_js_1.contentTypeMatcher)(content_type_js_1.contentTypeRegExp),
            requestPath: (0, create_method_url_js_1.createMethodUrl)("/", spec.method),
            service: spec.method.parent,
            method: spec.method,
        });
    }
    fact.protocolName = protocolName;
    return fact;
}
exports.createHandlerFactory = createHandlerFactory;
/**
 * @template I, O
 * @param {!tsickle_universal_handler_18.UniversalHandlerOptions} opt
 * @param {!tsickle_serialization_17.Serialization<!Headers>} trailerSerialization
 * @param {({kind: string, impl: function(?, !tsickle_implementation_4.HandlerContext): (!Promise<?>|?), method: ?}|{kind: string, impl: function(?, !tsickle_implementation_4.HandlerContext): !AsyncIterable<?, ?, ?>, method: ?}|{kind: string, impl: function(!AsyncIterable<?, ?, ?>, !tsickle_implementation_4.HandlerContext): !Promise<?>, method: ?}|{kind: string, impl: function(!AsyncIterable<?, ?, ?>, !tsickle_implementation_4.HandlerContext): !AsyncIterable<?, ?, ?>, method: ?})} spec
 * @return {function(!tsickle_universal_19.UniversalServerRequest): !Promise<!tsickle_universal_19.UniversalServerResponse>}
 */
function createHandler(opt, trailerSerialization, spec) {
    /** @type {!tsickle_serialization_17.MethodSerializationLookup<I, O>} */
    const serialization = (0, serialization_js_1.createMethodSerializationLookup)(spec.method, opt.binaryOptions, opt.jsonOptions, opt);
    return (/**
     * @param {!tsickle_universal_19.UniversalServerRequest} req
     * @return {!Promise<!tsickle_universal_19.UniversalServerResponse>}
     */
    async function handle(req) {
        (0, universal_js_1.assertByteStreamRequest)(req);
        /** @type {(undefined|{text: boolean, binary: boolean})} */
        const type = (0, content_type_js_1.parseContentType)(req.header.get(headers_js_1.headerContentType));
        if (type == undefined || type.text) {
            return universal_js_1.uResponseUnsupportedMediaType;
        }
        if (req.method !== methodPost) {
            return universal_js_1.uResponseMethodNotAllowed;
        }
        /** @type {({timeoutMs: (undefined|number), error: undefined}|{timeoutMs: (undefined|number), error: !tsickle_connect_error_2.ConnectError})} */
        const timeout = (0, parse_timeout_js_1.parseTimeout)(req.header.get(headers_js_1.headerTimeout), opt.maxTimeoutMs);
        /** @type {!HandlerContextController} */
        const context = (0, implementation_js_1.createHandlerContext)({
            ...spec,
            service: spec.method.parent,
            requestMethod: req.method,
            protocolName,
            timeoutMs: timeout.timeoutMs,
            shutdownSignal: opt.shutdownSignal,
            requestSignal: req.signal,
            requestHeader: req.header,
            url: req.url,
            responseHeader: {
                [headers_js_1.headerContentType]: type.binary ? content_type_js_1.contentTypeProto : content_type_js_1.contentTypeJson,
            },
            responseTrailer: {
                [headers_js_1.headerGrpcStatus]: trailer_status_js_1.grpcStatusOk,
            },
            contextValues: req.contextValues,
        });
        /** @type {{request: (null|!tsickle_compression_11.Compression), response: (null|!tsickle_compression_11.Compression), error: (undefined|!tsickle_connect_error_2.ConnectError)}} */
        const compression = (0, compression_js_1.compressionNegotiate)(opt.acceptCompression, req.header.get(headers_js_1.headerEncoding), req.header.get(headers_js_1.headerAcceptEncoding), headers_js_1.headerAcceptEncoding);
        if (compression.response) {
            context.responseHeader.set(headers_js_1.headerEncoding, compression.response.name);
        }
        // We split the pipeline into two parts: The request iterator, and the
        // response iterator. We do this because the request iterator is responsible
        // for parsing the request body, and we don't want write errors of the response
        // iterator to affect the request iterator.
        /** @type {!AsyncIterable<?, ?, ?>} */
        const inputIt = (0, async_iterable_js_1.pipe)(req.body, (0, async_iterable_js_1.transformPrepend)((/**
         * @return {undefined}
         */
        () => {
            // raise compression error to serialize it as a trailer status
            if (compression.error)
                throw compression.error;
            // raise timeout parsing error to serialize it as a trailer status
            if (timeout.error)
                throw (/** @type {{timeoutMs: (undefined|number), error: !tsickle_connect_error_2.ConnectError}} */ (timeout)).error;
            return undefined;
        })), (0, async_iterable_js_1.transformSplitEnvelope)(opt.readMaxBytes), (0, async_iterable_js_1.transformDecompressEnvelope)(compression.request, opt.readMaxBytes), (0, async_iterable_js_1.transformParseEnvelope)(serialization.getI(type.binary), trailer_js_1.trailerFlag));
        /** @type {!AsyncIterator<?, ?, ?>} */
        const it = (0, invoke_implementation_js_1.transformInvokeImplementation)(spec, context, opt.interceptors)(inputIt)[Symbol.asyncIterator]();
        /** @type {!AsyncIterable<!Uint8Array, ?, ?>} */
        const outputIt = (0, async_iterable_js_1.pipe)(
        // We wrap the iterator in an async iterator to ensure that the
        // abort signal is aborted when the iterator is done.
        {
            /**
             * @public
             * @return {{next: function(): !Promise<(!IteratorReturnResult<?>|!IteratorYieldResult<?>)>, throw: function(*): !Promise<(!IteratorReturnResult<?>|!IteratorYieldResult<?>)>, return: function(*): !Promise<(!IteratorReturnResult<?>|!IteratorYieldResult<?>)>}}
             */
            [Symbol.asyncIterator]() {
                return {
                    next: (/**
                     * @return {!Promise<(!IteratorReturnResult<?>|!IteratorYieldResult<?>)>}
                     */
                    () => it.next()),
                    throw: (/**
                     * @param {*} e
                     * @return {!Promise<(!IteratorReturnResult<?>|!IteratorYieldResult<?>)>}
                     */
                    (e) => {
                        context.abort(e);
                        return it.throw?.(e) ?? Promise.reject({ done: true });
                    }),
                    return: (/**
                     * @param {*} v
                     * @return {!Promise<(!IteratorReturnResult<?>|!IteratorYieldResult<?>)>}
                     */
                    (v) => {
                        context.abort();
                        return (it.return?.(v) ?? Promise.resolve({ done: true, value: v }));
                    }),
                };
            },
        }, (0, async_iterable_js_1.transformSerializeEnvelope)(serialization.getO(type.binary)), (0, async_iterable_js_1.transformCatchFinally)((/**
         * @param {*} e
         * @return {{flags: number, data: !Uint8Array}}
         */
        (e) => {
            context.abort(e);
            if (e instanceof connect_error_js_1.ConnectError) {
                (0, trailer_status_js_1.setTrailerStatus)(context.responseTrailer, e);
            }
            else if (e !== undefined) {
                (0, trailer_status_js_1.setTrailerStatus)(context.responseTrailer, new connect_error_js_1.ConnectError("internal error", code_js_1.Code.Internal, undefined, undefined, e));
            }
            return {
                flags: trailer_js_1.trailerFlag,
                data: trailerSerialization.serialize(context.responseTrailer),
            };
        })), (0, async_iterable_js_1.transformCompressEnvelope)(compression.response, opt.compressMinBytes), (0, async_iterable_js_1.transformJoinEnvelopes)(), { propagateDownStreamError: true });
        return {
            ...universal_js_1.uResponseOk,
            // We wait for the first response body bytes before resolving, so that
            // implementations have a chance to add headers before an adapter commits
            // them to the wire.
            body: await (0, async_iterable_js_1.untilFirst)(outputIt),
            header: context.responseHeader,
        };
    });
}
