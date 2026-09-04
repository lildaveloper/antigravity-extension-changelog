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
 * Generated from: third_party/javascript/connectrpc_connect/src/protocol-grpc/trailer-status.ts
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
goog.module('google3.third_party.javascript.connectrpc_connect.src.protocol$2dgrpc.trailer$2dstatus');
var module = module || { id: 'third_party/javascript/connectrpc_connect/src/protocol-grpc/trailer-status.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_status_pb_1 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol$2dgrpc.gen.status_pb");
const tsickle_connect_error_2 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.connect$2derror");
const tsickle_http_headers_3 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.http$2dheaders");
const tsickle_code_4 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.code");
const tsickle_wkt_5 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wkt.index");
const tsickle_headers_6 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol$2dgrpc.headers");
const tsickle_protobuf_7 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.index");
const status_pb_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol$2dgrpc.gen.status_pb');
const connect_error_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.connect$2derror');
const http_headers_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.http$2dheaders');
const code_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.code');
const wkt_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wkt.index');
const headers_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol$2dgrpc.headers');
const protobuf_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.index');
/**
 * The value of the Grpc-Status header or trailer in case of success.
 * Used by the gRPC and gRPC-web protocols.
 *
 * @type {string}
 */
exports.grpcStatusOk = "0";
/**
 * Sets the fields "grpc-status" and "grpc-message" in the given
 * Headers object.
 * If an error is given and contains error details, the function
 * will also set the field "grpc-status-details-bin" with an encoded
 * google.rpc.Status message including the error details.
 *
 * @param {!Headers} target
 * @param {(undefined|!tsickle_connect_error_2.ConnectError)} error
 * @return {!Headers}
 */
function setTrailerStatus(target, error) {
    if (error) {
        // Copy any metadata specified in the error into the target Headers
        // Note that if a protocol header happens to be specified in metadata, it
        // its value will be overridden below by the official protocol headers.
        error.metadata.forEach((/**
         * @param {string} value
         * @param {string} key
         * @return {void}
         */
        (value, key) => {
            target.append(key, value);
        }));
        target.set(headers_js_1.headerGrpcStatus, error.code.toString(10));
        target.set(headers_js_1.headerGrpcMessage, encodeURIComponent(error.rawMessage));
        if (error.details.length > 0) {
            /** @type {?} */
            const status = (0, protobuf_1.create)(status_pb_js_1.StatusSchema, {
                code: error.code,
                message: error.rawMessage,
                details: error.details.map((/**
                 * @param {({desc: !tsickle_protobuf_7.DescMessage, value: ?}|{type: string, value: !Uint8Array, debug: (undefined|null|string|number|boolean|!Object<string,(null|string|number|boolean|?|!Array<?>)>|!Array<(null|string|number|boolean|!Object<string,?>|?)>)})} detail
                 * @return {(?|{typeUrl: string, value: !Uint8Array})}
                 */
                (detail) => "desc" in detail
                    ? (0, wkt_1.anyPack)((/** @type {{desc: !tsickle_protobuf_7.DescMessage, value: ?}} */ (detail)).desc, (0, protobuf_1.create)((/** @type {{desc: !tsickle_protobuf_7.DescMessage, value: ?}} */ (detail)).desc, (/** @type {{desc: !tsickle_protobuf_7.DescMessage, value: ?}} */ (detail)).value))
                    : {
                        typeUrl: `type.googleapis.com/${(/** @type {{type: string, value: !Uint8Array, debug: (undefined|null|string|number|boolean|!Object<string,(null|string|number|boolean|?|!Array<?>)>|!Array<(null|string|number|boolean|!Object<string,?>|?)>)}} */ (detail)).type}`,
                        value: (/** @type {{type: string, value: !Uint8Array, debug: (undefined|null|string|number|boolean|!Object<string,(null|string|number|boolean|?|!Array<?>)>|!Array<(null|string|number|boolean|!Object<string,?>|?)>)}} */ (detail)).value,
                    })),
            });
            target.set(headers_js_1.headerStatusDetailsBin, (0, http_headers_js_1.encodeBinaryHeader)(status, status_pb_js_1.StatusSchema));
        }
    }
    else {
        target.set(headers_js_1.headerGrpcStatus, (/** @type {string} */ (exports.grpcStatusOk)).toString());
    }
    return target;
}
exports.setTrailerStatus = setTrailerStatus;
/**
 * Find an error status in the given Headers object, which can be either
 * a trailer, or a header (as allowed for so-called trailers-only responses).
 * The field "grpc-status-details-bin" is inspected, and if not present,
 * the fields "grpc-status" and "grpc-message" are used.
 * Returns an error only if the gRPC status code is > 0.
 *
 * @param {!Headers} headerOrTrailer
 * @return {(undefined|!tsickle_connect_error_2.ConnectError)}
 */
function findTrailerError(headerOrTrailer) {
    // TODO
    // let code: Code;
    // let message: string = "";
    // TODO
    // let code: Code;
    // let message: string = "";
    // Prefer the protobuf-encoded data to the grpc-status header.
    /** @type {(null|string)} */
    const statusBytes = headerOrTrailer.get(headers_js_1.headerStatusDetailsBin);
    if (statusBytes != null) {
        /** @type {?} */
        const status = (0, http_headers_js_1.decodeBinaryHeader)(statusBytes, status_pb_js_1.StatusSchema);
        if (status.code == 0) {
            return undefined;
        }
        /** @type {!tsickle_connect_error_2.ConnectError} */
        const error = new connect_error_js_1.ConnectError(status.message, status.code, headerOrTrailer);
        error.details = status.details.map((/**
         * @param {?} any
         * @return {{type: string, value: !Uint8Array}}
         */
        (any) => ({
            type: any.typeUrl.substring(any.typeUrl.lastIndexOf("/") + 1),
            value: any.value,
        })));
        return error;
    }
    /** @type {(null|string)} */
    const grpcStatus = headerOrTrailer.get(headers_js_1.headerGrpcStatus);
    if (grpcStatus != null) {
        if (grpcStatus === exports.grpcStatusOk) {
            return undefined;
        }
        /** @type {number} */
        const code = parseInt(grpcStatus, 10);
        if (code in code_js_1.Code) {
            return new connect_error_js_1.ConnectError(decodeURIComponent(headerOrTrailer.get(headers_js_1.headerGrpcMessage) ?? ""), code, headerOrTrailer);
        }
        return new connect_error_js_1.ConnectError(`invalid grpc-status: ${grpcStatus}`, code_js_1.Code.Internal, headerOrTrailer);
    }
    return undefined;
}
exports.findTrailerError = findTrailerError;
