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
 * Generated from: third_party/javascript/connectrpc_connect/src/protocol-connect/handler-factory.ts
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
goog.module('google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.handler$2dfactory');
var module = module || { id: 'third_party/javascript/connectrpc_connect/src/protocol-connect/handler-factory.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_protobuf_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.index");
const tsickle_wire_2 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wire.index");
const tsickle_code_3 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.code");
const tsickle_connect_error_4 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.connect$2derror");
const tsickle_implementation_5 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.implementation");
const tsickle_content_type_6 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.content$2dtype");
const tsickle_end_stream_7 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.end$2dstream");
const tsickle_error_json_8 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.error$2djson");
const tsickle_headers_9 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.headers");
const tsickle_http_status_10 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.http$2dstatus");
const tsickle_parse_timeout_11 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.parse$2dtimeout");
const tsickle_query_params_12 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.query$2dparams");
const tsickle_trailer_mux_13 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.trailer$2dmux");
const tsickle_version_14 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.version");
const tsickle_compression_15 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.compression");
const tsickle_serialization_16 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.serialization");
const tsickle_universal_handler_17 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.universal$2dhandler");
const tsickle_universal_18 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.universal");
const tsickle_async_iterable_19 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.async$2diterable");
const tsickle_content_type_matcher_20 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.content$2dtype$2dmatcher");
const tsickle_create_method_url_21 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.create$2dmethod$2durl");
const tsickle_envelope_22 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.envelope");
const tsickle_invoke_implementation_23 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.invoke$2dimplementation");
const tsickle_protocol_handler_factory_24 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.protocol$2dhandler$2dfactory");
const tsickle_wkt_25 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wkt.index");
const protobuf_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.index');
const wire_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wire.index');
const code_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.code');
const connect_error_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.connect$2derror');
const implementation_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.implementation');
const content_type_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.content$2dtype');
const end_stream_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.end$2dstream');
const error_json_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.error$2djson');
const headers_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.headers');
const http_status_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.http$2dstatus');
const parse_timeout_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.parse$2dtimeout');
const query_params_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.query$2dparams');
const trailer_mux_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.trailer$2dmux');
const version_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.version');
const compression_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol.compression');
const serialization_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol.serialization');
const universal_handler_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol.universal$2dhandler');
const universal_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol.universal');
const async_iterable_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol.async$2diterable');
const content_type_matcher_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol.content$2dtype$2dmatcher');
const create_method_url_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol.create$2dmethod$2durl');
const invoke_implementation_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol.invoke$2dimplementation');
const wkt_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wkt.index');
/** @type {string} */
const protocolName = "connect";
/** @type {string} */
const methodPost = "POST";
/** @type {string} */
const methodGet = "GET";
/**
 * Create a factory that creates Connect handlers.
 * @param {?} options
 * @return {!tsickle_protocol_handler_factory_24.ProtocolHandlerFactory}
 */
function createHandlerFactory(options) {
    /** @type {!tsickle_universal_handler_17.UniversalHandlerOptions} */
    const opt = (0, universal_handler_js_1.validateUniversalHandlerOptions)(options);
    /** @type {!tsickle_serialization_16.Serialization<!tsickle_end_stream_7.EndStreamResponse>} */
    const endStreamSerialization = (0, end_stream_js_1.createEndStreamSerialization)(opt.jsonOptions);
    /**
     * @param {({kind: string, impl: function(*, !tsickle_implementation_5.HandlerContext): (!Promise<?>|?), method: ?}|{kind: string, impl: function(*, !tsickle_implementation_5.HandlerContext): !AsyncIterable<?, ?, ?>, method: ?}|{kind: string, impl: function(!AsyncIterable<*, ?, ?>, !tsickle_implementation_5.HandlerContext): !Promise<?>, method: ?}|{kind: string, impl: function(!AsyncIterable<*, ?, ?>, !tsickle_implementation_5.HandlerContext): !AsyncIterable<?, ?, ?>, method: ?})} spec
     * @return {?}
     */
    function fact(spec) {
        /** @type {function(!tsickle_universal_18.UniversalServerRequest): !Promise<!tsickle_universal_18.UniversalServerResponse>} */
        let h;
        /** @type {!RegExp} */
        let contentTypeRegExp;
        /** @type {!tsickle_serialization_16.MethodSerializationLookup<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>} */
        const serialization = (0, serialization_js_1.createMethodSerializationLookup)(spec.method, opt.binaryOptions, opt.jsonOptions, opt);
        switch (spec.kind) {
            case "unary":
                contentTypeRegExp = content_type_js_1.contentTypeUnaryRegExp;
                h = createUnaryHandler(opt, spec, serialization);
                break;
            default:
                contentTypeRegExp = content_type_js_1.contentTypeStreamRegExp;
                h = createStreamHandler(opt, spec, serialization, endStreamSerialization);
                break;
        }
        /** @type {!Array<string>} */
        const allowedMethods = [methodPost];
        if (spec.method.idempotency === wkt_1.MethodOptions_IdempotencyLevel.NO_SIDE_EFFECTS) {
            allowedMethods.push(methodGet);
        }
        return Object.assign(h, {
            protocolNames: [protocolName],
            supportedContentType: (0, content_type_matcher_js_1.contentTypeMatcher)(contentTypeRegExp),
            allowedMethods,
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
 * @param {!tsickle_universal_handler_17.UniversalHandlerOptions} opt
 * @param {?} spec
 * @param {!tsickle_serialization_16.MethodSerializationLookup<I, O>} serialization
 * @return {function(!tsickle_universal_18.UniversalServerRequest): !Promise<!tsickle_universal_18.UniversalServerResponse>}
 */
function createUnaryHandler(opt, spec, serialization) {
    return (/**
     * @param {!tsickle_universal_18.UniversalServerRequest} req
     * @return {!Promise<!tsickle_universal_18.UniversalServerResponse>}
     */
    async function handle(req) {
        /** @type {boolean} */
        const isGet = req.method == methodGet;
        if (isGet &&
            spec.method.idempotency != wkt_1.MethodOptions_IdempotencyLevel.NO_SIDE_EFFECTS) {
            return universal_js_1.uResponseMethodNotAllowed;
        }
        /** @type {!URLSearchParams} */
        const queryParams = new URL(req.url).searchParams;
        /** @type {(null|string)} */
        const compressionRequested = isGet
            ? queryParams.get(query_params_js_1.paramCompression)
            : req.header.get(headers_js_1.headerUnaryEncoding);
        /** @type {(undefined|{stream: boolean, binary: boolean})} */
        const type = isGet
            ? (0, content_type_js_1.parseEncodingQuery)(queryParams.get(query_params_js_1.paramEncoding))
            : (0, content_type_js_1.parseContentType)(req.header.get(headers_js_1.headerContentType));
        if (type == undefined || type.stream) {
            return universal_js_1.uResponseUnsupportedMediaType;
        }
        /** @type {({timeoutMs: (undefined|number), error: undefined}|{timeoutMs: (undefined|number), error: !tsickle_connect_error_4.ConnectError})} */
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
                [headers_js_1.headerContentType]: type.binary
                    ? content_type_js_1.contentTypeUnaryProto
                    : content_type_js_1.contentTypeUnaryJson,
            },
            contextValues: req.contextValues,
        });
        /** @type {{request: (null|!tsickle_compression_15.Compression), response: (null|!tsickle_compression_15.Compression), error: (undefined|!tsickle_connect_error_4.ConnectError)}} */
        const compression = (0, compression_js_1.compressionNegotiate)(opt.acceptCompression, compressionRequested, req.header.get(headers_js_1.headerUnaryAcceptEncoding), headers_js_1.headerUnaryAcceptEncoding);
        /** @type {number} */
        let status = universal_js_1.uResponseOk.status;
        /** @type {!Uint8Array} */
        let body;
        try {
            if (opt.requireConnectProtocolHeader) {
                if (isGet) {
                    (0, version_js_1.requireProtocolVersionParam)(queryParams);
                }
                else {
                    (0, version_js_1.requireProtocolVersionHeader)(req.header);
                }
            }
            // raise compression error to serialize it as a error response
            if (compression.error) {
                throw compression.error;
            }
            // raise timeout parsing error to serialize it as a trailer status
            if (timeout.error) {
                throw (/** @type {{timeoutMs: (undefined|number), error: !tsickle_connect_error_4.ConnectError}} */ (timeout)).error;
            }
            /** @type {(null|string|number|boolean|!Array<(null|string|number|boolean|?|!Object<string,?>)>|!Object<string,(null|string|number|boolean|!Array<?>|?)>|!Uint8Array)} */
            let reqBody;
            if (isGet) {
                reqBody = await readUnaryMessageFromQuery(opt.readMaxBytes, compression.request, queryParams);
            }
            else {
                reqBody = await readUnaryMessageFromBody(opt.readMaxBytes, compression.request, req);
            }
            /** @type {?} */
            const input = parseUnaryMessage(spec.method, type.binary, serialization, reqBody);
            /** @type {?} */
            const output = await (0, invoke_implementation_js_1.invokeUnaryImplementation)(spec, context, input, opt.interceptors);
            body = serialization.getO(type.binary).serialize(output);
        }
        catch (e) {
            context.abort(e);
            /** @type {(undefined|!tsickle_connect_error_4.ConnectError)} */
            let error;
            if (e instanceof connect_error_js_1.ConnectError) {
                error = e;
            }
            else {
                error = new connect_error_js_1.ConnectError("internal error", code_js_1.Code.Internal, undefined, undefined, e);
            }
            status = (0, http_status_js_1.codeToHttpStatus)(error.code);
            context.responseHeader.set(headers_js_1.headerContentType, content_type_js_1.contentTypeUnaryJson);
            error.metadata.forEach((/**
             * @param {string} value
             * @param {string} key
             * @return {void}
             */
            (value, key) => {
                context.responseHeader.set(key, value);
            }));
            body = (0, error_json_js_1.errorToJsonBytes)(error, opt.jsonOptions);
        }
        finally {
            context.abort();
        }
        if (compression.response && body.byteLength >= opt.compressMinBytes) {
            body = await compression.response.compress(body);
            context.responseHeader.set(headers_js_1.headerUnaryEncoding, compression.response.name);
        }
        /** @type {!Headers} */
        const header = (0, trailer_mux_js_1.trailerMux)(context.responseHeader, context.responseTrailer);
        header.set(headers_js_1.headerUnaryContentLength, body.byteLength.toString(10));
        return {
            status,
            body: (0, async_iterable_js_1.createAsyncIterable)([body]),
            header,
        };
    });
}
/**
 * @param {number} readMaxBytes
 * @param {(null|!tsickle_compression_15.Compression)} compression
 * @param {!tsickle_universal_18.UniversalServerRequest} request
 * @return {!Promise<(null|string|number|boolean|!Array<(null|string|number|boolean|?|!Object<string,?>)>|!Object<string,(null|string|number|boolean|!Array<?>|?)>|!Uint8Array)>}
 */
async function readUnaryMessageFromBody(readMaxBytes, compression, request) {
    if (typeof request.body == "object" &&
        request.body !== null &&
        Symbol.asyncIterator in request.body) {
        /** @type {!Uint8Array} */
        let reqBytes = await (0, async_iterable_js_1.readAllBytes)(request.body, readMaxBytes, request.header.get(headers_js_1.headerUnaryContentLength));
        if (compression) {
            reqBytes = await compression.decompress(reqBytes, readMaxBytes);
        }
        return reqBytes;
    }
    return request.body;
}
/**
 * @param {number} readMaxBytes
 * @param {(null|!tsickle_compression_15.Compression)} compression
 * @param {!URLSearchParams} queryParams
 * @return {!Promise<!Uint8Array>}
 */
async function readUnaryMessageFromQuery(readMaxBytes, compression, queryParams) {
    /** @type {(null|string)} */
    const base64 = queryParams.get(query_params_js_1.paramBase64);
    /** @type {string} */
    const message = queryParams.get(query_params_js_1.paramMessage) ?? "";
    /** @type {!Uint8Array} */
    let decoded;
    if (base64 === "1") {
        decoded = (0, wire_1.base64Decode)(message);
    }
    else {
        decoded = new TextEncoder().encode(message);
    }
    if (compression) {
        decoded = await compression.decompress(decoded, readMaxBytes);
    }
    return decoded;
}
/**
 * @template I, O
 * @param {?} method
 * @param {boolean} useBinaryFormat
 * @param {!tsickle_serialization_16.MethodSerializationLookup<I, O>} serialization
 * @param {(null|string|number|boolean|!Array<(null|string|number|boolean|?|!Object<string,?>)>|!Object<string,(null|string|number|boolean|!Array<?>|?)>|!Uint8Array)} input
 * @return {?}
 */
function parseUnaryMessage(method, useBinaryFormat, serialization, input) {
    if (input instanceof Uint8Array) {
        return serialization.getI(useBinaryFormat).parse(input);
    }
    if (useBinaryFormat) {
        throw new connect_error_js_1.ConnectError("received parsed JSON request body, but content-type indicates binary format", code_js_1.Code.Internal);
    }
    try {
        return (0, protobuf_1.fromJson)(method.input, input);
    }
    catch (e) {
        throw connect_error_js_1.ConnectError.from(e, code_js_1.Code.InvalidArgument);
    }
}
/**
 * @template I, O
 * @param {!tsickle_universal_handler_17.UniversalHandlerOptions} opt
 * @param {({kind: string, impl: function(?, !tsickle_implementation_5.HandlerContext): (!Promise<?>|?), method: ?}|{kind: string, impl: function(?, !tsickle_implementation_5.HandlerContext): !AsyncIterable<?, ?, ?>, method: ?}|{kind: string, impl: function(!AsyncIterable<?, ?, ?>, !tsickle_implementation_5.HandlerContext): !Promise<?>, method: ?}|{kind: string, impl: function(!AsyncIterable<?, ?, ?>, !tsickle_implementation_5.HandlerContext): !AsyncIterable<?, ?, ?>, method: ?})} spec
 * @param {!tsickle_serialization_16.MethodSerializationLookup<I, O>} serialization
 * @param {!tsickle_serialization_16.Serialization<!tsickle_end_stream_7.EndStreamResponse>} endStreamSerialization
 * @return {function(!tsickle_universal_18.UniversalServerRequest): !Promise<!tsickle_universal_18.UniversalServerResponse>}
 */
function createStreamHandler(opt, spec, serialization, endStreamSerialization) {
    return (/**
     * @param {!tsickle_universal_18.UniversalServerRequest} req
     * @return {!Promise<!tsickle_universal_18.UniversalServerResponse>}
     */
    async function handle(req) {
        (0, universal_js_1.assertByteStreamRequest)(req);
        /** @type {(undefined|{stream: boolean, binary: boolean})} */
        const type = (0, content_type_js_1.parseContentType)(req.header.get(headers_js_1.headerContentType));
        if (type == undefined || !type.stream) {
            return universal_js_1.uResponseUnsupportedMediaType;
        }
        if (req.method !== methodPost) {
            return universal_js_1.uResponseMethodNotAllowed;
        }
        /** @type {({timeoutMs: (undefined|number), error: undefined}|{timeoutMs: (undefined|number), error: !tsickle_connect_error_4.ConnectError})} */
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
                [headers_js_1.headerContentType]: type.binary
                    ? content_type_js_1.contentTypeStreamProto
                    : content_type_js_1.contentTypeStreamJson,
            },
            contextValues: req.contextValues,
        });
        /** @type {{request: (null|!tsickle_compression_15.Compression), response: (null|!tsickle_compression_15.Compression), error: (undefined|!tsickle_connect_error_4.ConnectError)}} */
        const compression = (0, compression_js_1.compressionNegotiate)(opt.acceptCompression, req.header.get(headers_js_1.headerStreamEncoding), req.header.get(headers_js_1.headerStreamAcceptEncoding), headers_js_1.headerStreamAcceptEncoding);
        if (compression.response) {
            context.responseHeader.set(headers_js_1.headerStreamEncoding, compression.response.name);
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
            if (opt.requireConnectProtocolHeader) {
                (0, version_js_1.requireProtocolVersionHeader)(req.header);
            }
            // raise compression error to serialize it as the end stream response
            if (compression.error)
                throw compression.error;
            // raise timeout parsing error to serialize it as a trailer status
            if (timeout.error)
                throw (/** @type {{timeoutMs: (undefined|number), error: !tsickle_connect_error_4.ConnectError}} */ (timeout)).error;
            return undefined;
        })), (0, async_iterable_js_1.transformSplitEnvelope)(opt.readMaxBytes), (0, async_iterable_js_1.transformDecompressEnvelope)(compression.request, opt.readMaxBytes), (0, async_iterable_js_1.transformParseEnvelope)(serialization.getI(type.binary), end_stream_js_1.endStreamFlag));
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
            /** @type {!tsickle_end_stream_7.EndStreamResponse} */
            const end = {
                metadata: context.responseTrailer,
            };
            if (e instanceof connect_error_js_1.ConnectError) {
                end.error = e;
            }
            else if (e !== undefined) {
                end.error = new connect_error_js_1.ConnectError("internal error", code_js_1.Code.Internal, undefined, undefined, e);
            }
            return {
                flags: end_stream_js_1.endStreamFlag,
                data: endStreamSerialization.serialize(end),
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
