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
 * Generated from: third_party/javascript/connectrpc_connect/src/protocol-connect/transport.ts
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
goog.module('google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.transport');
var module = module || { id: 'third_party/javascript/connectrpc_connect/src/protocol-connect/transport.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_protobuf_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.index");
const tsickle_request_header_2 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.request$2dheader");
const tsickle_headers_3 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.headers");
const tsickle_validate_response_4 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.validate$2dresponse");
const tsickle_trailer_mux_5 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.trailer$2dmux");
const tsickle_error_json_6 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.error$2djson");
const tsickle_end_stream_7 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.end$2dstream");
const tsickle_get_request_8 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.get$2drequest");
const tsickle_transport_options_9 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.transport$2doptions");
const tsickle_code_10 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.code");
const tsickle_connect_error_11 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.connect$2derror");
const tsickle_http_headers_12 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.http$2dheaders");
const tsickle_interceptor_13 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.interceptor");
const tsickle_async_iterable_14 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.async$2diterable");
const tsickle_create_method_url_15 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.create$2dmethod$2durl");
const tsickle_run_call_16 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.run$2dcall");
const tsickle_serialization_17 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.serialization");
const tsickle_transport_18 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.transport");
const tsickle_context_values_19 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.context$2dvalues");
const tsickle_wkt_20 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wkt.index");
const tsickle_universal_21 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.universal");
const request_header_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.request$2dheader');
const headers_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.headers');
const validate_response_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.validate$2dresponse');
const trailer_mux_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.trailer$2dmux');
const error_json_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.error$2djson');
const end_stream_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.end$2dstream');
const get_request_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.get$2drequest');
const code_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.code');
const connect_error_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.connect$2derror');
const http_headers_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.http$2dheaders');
const async_iterable_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol.async$2diterable');
const create_method_url_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol.create$2dmethod$2durl');
const run_call_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol.run$2dcall');
const serialization_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol.serialization');
const context_values_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.context$2dvalues');
const wkt_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wkt.index');
/**
 * Create a Transport for the Connect protocol.
 * @param {!tsickle_transport_options_9.CommonTransportOptions} opt
 * @return {!tsickle_transport_18.Transport}
 */
function createTransport(opt) {
    return {
        /**
         * @public
         * @template I, O
         * @param {?} method
         * @param {(undefined|!AbortSignal)} signal
         * @param {(undefined|number)} timeoutMs
         * @param {(undefined|!Array<!Array<?>>|!Headers|?)} header
         * @param {?} message
         * @param {(undefined|!tsickle_context_values_19.ContextValues)=} contextValues
         * @return {!Promise<!tsickle_interceptor_13.UnaryResponse<I, O>>}
         */
        async unary(method, signal, timeoutMs, header, message, contextValues) {
            /** @type {!tsickle_serialization_17.MethodSerializationLookup<I, O>} */
            const serialization = (0, serialization_js_1.createMethodSerializationLookup)(method, opt.binaryOptions, opt.jsonOptions, opt);
            timeoutMs =
                timeoutMs === undefined
                    ? opt.defaultTimeoutMs
                    : timeoutMs <= 0
                        ? undefined
                        : timeoutMs;
            return await (0, run_call_js_1.runUnaryCall)({
                interceptors: opt.interceptors,
                signal,
                timeoutMs,
                req: {
                    stream: false,
                    service: method.parent,
                    method,
                    requestMethod: "POST",
                    url: (0, create_method_url_js_1.createMethodUrl)(opt.baseUrl, method),
                    header: (0, request_header_js_1.requestHeaderWithCompression)(method.methodKind, opt.useBinaryFormat, timeoutMs, header, opt.acceptCompression, opt.sendCompression, true),
                    contextValues: contextValues ?? (0, context_values_js_1.createContextValues)(),
                    message,
                },
                next: (/**
                 * @param {!tsickle_interceptor_13.UnaryRequest<I, O>} req
                 * @return {!Promise<!tsickle_interceptor_13.UnaryResponse<I, O>>}
                 */
                async (req) => {
                    /** @type {!Uint8Array} */
                    let requestBody = serialization
                        .getI(opt.useBinaryFormat)
                        .serialize(req.message);
                    if (opt.sendCompression &&
                        requestBody.byteLength > opt.compressMinBytes) {
                        requestBody = await opt.sendCompression.compress(requestBody);
                        req.header.set(headers_js_1.headerUnaryEncoding, opt.sendCompression.name);
                    }
                    else {
                        req.header.delete(headers_js_1.headerUnaryEncoding);
                    }
                    /** @type {boolean} */
                    const useGet = opt.useHttpGet === true &&
                        method.idempotency ===
                            wkt_1.MethodOptions_IdempotencyLevel.NO_SIDE_EFFECTS;
                    /** @type {(undefined|!AsyncIterable<!Uint8Array, ?, ?>)} */
                    let body;
                    if (useGet) {
                        req = (0, get_request_js_1.transformConnectPostToGetRequest)(req, requestBody, opt.useBinaryFormat);
                    }
                    else {
                        body = (0, async_iterable_js_1.createAsyncIterable)([requestBody]);
                    }
                    /** @type {!tsickle_universal_21.UniversalClientResponse} */
                    const universalResponse = await opt.httpClient({
                        url: req.url,
                        method: req.requestMethod,
                        header: req.header,
                        signal: req.signal,
                        body,
                    });
                    const { compression, isUnaryError, unaryError } = (0, validate_response_js_1.validateResponseWithCompression)(method.methodKind, opt.acceptCompression, opt.useBinaryFormat, universalResponse.status, universalResponse.header);
                    const [header__tsickle_destructured_1, trailer__tsickle_destructured_2] = (0, trailer_mux_js_1.trailerDemux)(universalResponse.header);
                    const header = /** @type {!Headers} */ (header__tsickle_destructured_1);
                    const trailer = /** @type {!Headers} */ (trailer__tsickle_destructured_2);
                    /** @type {!Uint8Array} */
                    let responseBody = await (0, async_iterable_js_1.pipeTo)(universalResponse.body, (0, async_iterable_js_1.sinkAllBytes)(opt.readMaxBytes, universalResponse.header.get(headers_js_1.headerUnaryContentLength)), { propagateDownStreamError: false });
                    if (compression) {
                        responseBody = await compression.decompress(responseBody, opt.readMaxBytes);
                    }
                    if (isUnaryError) {
                        throw (0, error_json_js_1.errorFromJsonBytes)(responseBody, (0, http_headers_js_1.appendHeaders)(header, trailer), unaryError);
                    }
                    return (/** @type {!tsickle_interceptor_13.UnaryResponse<I, O>} */ ({
                        stream: false,
                        service: method.parent,
                        method,
                        header,
                        message: serialization
                            .getO(opt.useBinaryFormat)
                            .parse(responseBody),
                        trailer,
                    }));
                }),
            });
        },
        /**
         * @public
         * @template I, O
         * @param {?} method
         * @param {(undefined|!AbortSignal)} signal
         * @param {(undefined|number)} timeoutMs
         * @param {(undefined|!Array<!Array<?>>|!Headers|?)} header
         * @param {!AsyncIterable<?, ?, ?>} input
         * @param {(undefined|!tsickle_context_values_19.ContextValues)=} contextValues
         * @return {!Promise<!tsickle_interceptor_13.StreamResponse<I, O>>}
         */
        async stream(method, signal, timeoutMs, header, input, contextValues) {
            /** @type {!tsickle_serialization_17.MethodSerializationLookup<I, O>} */
            const serialization = (0, serialization_js_1.createMethodSerializationLookup)(method, opt.binaryOptions, opt.jsonOptions, opt);
            /** @type {!tsickle_serialization_17.Serialization<!tsickle_end_stream_7.EndStreamResponse>} */
            const endStreamSerialization = (0, end_stream_js_1.createEndStreamSerialization)(opt.jsonOptions);
            timeoutMs =
                timeoutMs === undefined
                    ? opt.defaultTimeoutMs
                    : timeoutMs <= 0
                        ? undefined
                        : timeoutMs;
            return (0, run_call_js_1.runStreamingCall)({
                interceptors: opt.interceptors,
                signal,
                timeoutMs,
                req: {
                    stream: true,
                    service: method.parent,
                    method,
                    requestMethod: "POST",
                    url: (0, create_method_url_js_1.createMethodUrl)(opt.baseUrl, method),
                    header: (0, request_header_js_1.requestHeaderWithCompression)(method.methodKind, opt.useBinaryFormat, timeoutMs, header, opt.acceptCompression, opt.sendCompression, true),
                    contextValues: contextValues ?? (0, context_values_js_1.createContextValues)(),
                    message: input,
                },
                next: (/**
                 * @param {!tsickle_interceptor_13.StreamRequest<I, O>} req
                 * @return {!Promise<!tsickle_interceptor_13.StreamResponse<I, O>>}
                 */
                async (req) => {
                    /** @type {!tsickle_universal_21.UniversalClientResponse} */
                    const uRes = await opt.httpClient({
                        url: req.url,
                        method: "POST",
                        header: req.header,
                        signal: req.signal,
                        body: (0, async_iterable_js_1.pipe)(req.message, (0, async_iterable_js_1.transformSerializeEnvelope)(serialization.getI(opt.useBinaryFormat)), (0, async_iterable_js_1.transformCompressEnvelope)(opt.sendCompression, opt.compressMinBytes), (0, async_iterable_js_1.transformJoinEnvelopes)(), { propagateDownStreamError: true }),
                    });
                    const { compression } = (0, validate_response_js_1.validateResponseWithCompression)(method.methodKind, opt.acceptCompression, opt.useBinaryFormat, uRes.status, uRes.header);
                    /** @type {!tsickle_interceptor_13.StreamResponse<I, O>} */
                    const res = {
                        ...req,
                        header: uRes.header,
                        trailer: new Headers(),
                        message: (0, async_iterable_js_1.pipe)(uRes.body, (0, async_iterable_js_1.transformSplitEnvelope)(opt.readMaxBytes), (0, async_iterable_js_1.transformDecompressEnvelope)(compression ?? null, opt.readMaxBytes), (0, async_iterable_js_1.transformParseEnvelope)(serialization.getO(opt.useBinaryFormat), end_stream_js_1.endStreamFlag, endStreamSerialization), (/**
                         * @param {!AsyncIterable<({end: boolean, value: ?}|{end: boolean, value: !tsickle_end_stream_7.EndStreamResponse}), ?, ?>} iterable
                         * @return {!AsyncGenerator<?, void, ?>}
                         */
                        async function* (iterable) {
                            /** @type {boolean} */
                            let endStreamReceived = false;
                            for await (const chunk of iterable) {
                                if (chunk.end) {
                                    if (endStreamReceived) {
                                        throw new connect_error_js_1.ConnectError("protocol error: received extra EndStreamResponse", code_js_1.Code.InvalidArgument);
                                    }
                                    endStreamReceived = true;
                                    if ((/** @type {{end: boolean, value: !tsickle_end_stream_7.EndStreamResponse}} */ (chunk)).value.error) {
                                        /** @type {!tsickle_connect_error_11.ConnectError} */
                                        const error = (/** @type {{end: boolean, value: !tsickle_end_stream_7.EndStreamResponse}} */ (chunk)).value.error;
                                        uRes.header.forEach((/**
                                         * @param {string} value
                                         * @param {string} key
                                         * @return {void}
                                         */
                                        (value, key) => {
                                            error.metadata.append(key, value);
                                        }));
                                        throw error;
                                    }
                                    (/** @type {{end: boolean, value: !tsickle_end_stream_7.EndStreamResponse}} */ (chunk)).value.metadata.forEach((/**
                                     * @param {string} value
                                     * @param {string} key
                                     * @return {void}
                                     */
                                    (value, key) => res.trailer.set(key, value)));
                                    continue;
                                }
                                if (endStreamReceived) {
                                    throw new connect_error_js_1.ConnectError("protocol error: received extra message after EndStreamResponse", code_js_1.Code.InvalidArgument);
                                }
                                yield (/** @type {{end: boolean, value: ?}} */ (chunk)).value;
                            }
                            if (!endStreamReceived) {
                                throw new connect_error_js_1.ConnectError("protocol error: missing EndStreamResponse", code_js_1.Code.InvalidArgument);
                            }
                        }), { propagateDownStreamError: true }),
                    };
                    return res;
                }),
            });
        },
    };
}
exports.createTransport = createTransport;
