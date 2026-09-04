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
 * Generated from: third_party/javascript/connectrpc_connect/src/cors.ts
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
goog.module('google3.third_party.javascript.connectrpc_connect.src.cors');
var module = module || { id: 'third_party/javascript/connectrpc_connect/src/cors.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_headers_1 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.headers");
const tsickle_headers_2 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol$2dgrpc.headers");
const tsickle_headers_3 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol$2dgrpc$2dweb.headers");
const connect = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.headers');
const grpc = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol$2dgrpc.headers');
const grpcWeb = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol$2dgrpc$2dweb.headers');
/**
 * CORS prevents rogue scripts in a web browser from making arbitrary requests
 * to other web servers.
 *
 * This object provides helpful constants to configure CORS middleware for
 * cross-domain requests with the protocols supported by Connect.
 *
 * Make sure to add application-specific headers that your application
 * uses as well.
 * @type {{allowedMethods: !ReadonlyArray<string>, allowedHeaders: !ReadonlyArray<string>, exposedHeaders: !ReadonlyArray<string>}}
 */
exports.cors = {
    /**
     * Request methods that scripts running in the browser are permitted to use.
     *
     * To support cross-domain requests with the protocols supported by Connect,
     * these headers fields must be included in the preflight response header
     * Access-Control-Allow-Methods.
     */
    allowedMethods: (/** @type {!ReadonlyArray<string>} */ (["POST", "GET"])),
    /**
     * Header fields that scripts running in the browser are permitted to send.
     *
     * To support cross-domain requests with the protocols supported by Connect,
     * these field names must be included in the preflight response header
     * Access-Control-Allow-Headers.
     *
     * Make sure to include any application-specific headers your browser client
     * may send.
     */
    allowedHeaders: (/** @type {!ReadonlyArray<string>} */ ([
        connect.headerContentType,
        connect.headerProtocolVersion,
        connect.headerTimeout,
        connect.headerStreamEncoding, // Unused in web browsers, but added for future-proofing
        connect.headerStreamAcceptEncoding, // Unused in web browsers, but added for future-proofing
        connect.headerUnaryEncoding, // Unused in web browsers, but added for future-proofing
        connect.headerUnaryAcceptEncoding, // Unused in web browsers, but added for future-proofing
        grpc.headerMessageType, // Unused in web browsers, but added for future-proofing
        grpcWeb.headerXGrpcWeb,
        grpcWeb.headerXUserAgent,
        grpcWeb.headerTimeout,
    ])),
    /**
     * Header fields that scripts running the browser are permitted to see.
     *
     * To support cross-domain requests with the protocols supported by Connect,
     * these field names must be included in header Access-Control-Expose-Headers
     * of the actual response.
     *
     * Make sure to include any application-specific headers your browser client
     * should see. If your application uses trailers, they will be sent as header
     * fields with a `Trailer-` prefix for Connect unary RPCs - make sure to
     * expose them as well if you want them to be visible in all supported
     * protocols.
     */
    exposedHeaders: (/** @type {!ReadonlyArray<string>} */ ([
        grpcWeb.headerGrpcStatus, // Crucial for gRPC-web
        grpcWeb.headerGrpcMessage, // Crucial for gRPC-web
        grpcWeb.headerStatusDetailsBin, // Error details in gRPC, gRPC-web
        connect.headerUnaryEncoding, // Unused in web browsers, but added for future-proofing
        connect.headerStreamEncoding, // Unused in web browsers, but added for future-proofing
    ])),
};
