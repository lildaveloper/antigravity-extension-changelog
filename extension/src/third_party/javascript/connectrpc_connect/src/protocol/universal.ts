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
 * Generated from: third_party/javascript/connectrpc_connect/src/protocol/universal.ts
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
goog.module('google3.third_party.javascript.connectrpc_connect.src.protocol.universal');
var module = module || { id: 'third_party/javascript/connectrpc_connect/src/protocol/universal.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_protobuf_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.index");
const tsickle_context_values_2 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.context$2dvalues");
/**
 * A minimal abstraction of an HTTP client.
 * @typedef {function(!UniversalClientRequest): !Promise<!UniversalClientResponse>}
 */
exports.UniversalClientFn;
/**
 * A minimal abstraction of an HTTP request on the client side.
 * @record
 */
function UniversalClientRequest() { }
exports.UniversalClientRequest = UniversalClientRequest;
/* istanbul ignore if */
if (false) {
    /**
     * @type {string}
     * @public
     */
    UniversalClientRequest.prototype.url;
    /**
     * @type {string}
     * @public
     */
    UniversalClientRequest.prototype.method;
    /**
     * @type {!Headers}
     * @public
     */
    UniversalClientRequest.prototype.header;
    /**
     * @type {(undefined|!AsyncIterable<!Uint8Array, ?, ?>)}
     * @public
     */
    UniversalClientRequest.prototype.body;
    /**
     * @type {(undefined|!AbortSignal)}
     * @public
     */
    UniversalClientRequest.prototype.signal;
}
/**
 * A minimal abstraction of an HTTP request on the client side.
 * @record
 */
function UniversalClientResponse() { }
exports.UniversalClientResponse = UniversalClientResponse;
/* istanbul ignore if */
if (false) {
    /**
     * @type {number}
     * @public
     */
    UniversalClientResponse.prototype.status;
    /**
     * @type {!Headers}
     * @public
     */
    UniversalClientResponse.prototype.header;
    /**
     * @type {!AsyncIterable<!Uint8Array, ?, ?>}
     * @public
     */
    UniversalClientResponse.prototype.body;
    /**
     * @type {!Headers}
     * @public
     */
    UniversalClientResponse.prototype.trailer;
}
/**
 * A minimal abstraction of an HTTP handler.
 * @typedef {function(!UniversalServerRequest): !Promise<!UniversalServerResponse>}
 */
exports.UniversalHandlerFn;
/**
 * A minimal abstraction of an HTTP request on the server side.
 * @record
 */
function UniversalServerRequest() { }
exports.UniversalServerRequest = UniversalServerRequest;
/* istanbul ignore if */
if (false) {
    /**
     * @type {string}
     * @public
     */
    UniversalServerRequest.prototype.httpVersion;
    /**
     * @type {string}
     * @public
     */
    UniversalServerRequest.prototype.url;
    /**
     * @type {string}
     * @public
     */
    UniversalServerRequest.prototype.method;
    /**
     * @type {!Headers}
     * @public
     */
    UniversalServerRequest.prototype.header;
    /**
     * Many server frameworks parse request bodies with the mime type
     * application/json automatically. We accept a JSON value as an
     * alternative to a byte stream here so that this situation can be
     * handled efficiently.
     * @type {(null|string|number|boolean|!Object<string,(null|string|number|boolean|?|!Array<?>)>|!Array<(null|string|number|boolean|!Object<string,?>|?)>|!AsyncIterable<!Uint8Array, ?, ?>)}
     * @public
     */
    UniversalServerRequest.prototype.body;
    /**
     * @type {!AbortSignal}
     * @public
     */
    UniversalServerRequest.prototype.signal;
    /**
     * @type {(undefined|!tsickle_context_values_2.ContextValues)}
     * @public
     */
    UniversalServerRequest.prototype.contextValues;
}
/**
 * A minimal abstraction of an HTTP response on the server side.
 * @record
 */
function UniversalServerResponse() { }
exports.UniversalServerResponse = UniversalServerResponse;
/* istanbul ignore if */
if (false) {
    /**
     * @type {number}
     * @public
     */
    UniversalServerResponse.prototype.status;
    /**
     * @type {(undefined|!Headers)}
     * @public
     */
    UniversalServerResponse.prototype.header;
    /**
     * @type {(undefined|!AsyncIterable<!Uint8Array, ?, ?>)}
     * @public
     */
    UniversalServerResponse.prototype.body;
    /**
     * @type {(undefined|!Headers)}
     * @public
     */
    UniversalServerResponse.prototype.trailer;
}
/**
 * Assert that the given UniversalServerRequest has a byte stream body, not
 * a JSON value.
 *
 * We accept a JSON object or a byte stream in server requests.
 * In practice, only Connect unary handlers will receive a parse
 * JSON object. Other call-sites can use this assertion to narrow
 * the union type. A failure in such a call-sites indicates that
 * the contract between a server framework and the connect-node \
 * handler is broken.
 *
 * @param {!UniversalServerRequest} req
 * @return {void}
 */
function assertByteStreamRequest(req) {
    if (typeof req.body == "object" &&
        req.body !== null &&
        Symbol.asyncIterator in req.body) {
        return;
    }
    throw new Error("byte stream required, but received JSON");
}
exports.assertByteStreamRequest = assertByteStreamRequest;
/**
 * HTTP 200 OK
 *
 * @type {?}
 */
exports.uResponseOk = {
    status: 200,
};
/**
 * HTTP 404 Not Found
 *
 * @type {?}
 */
exports.uResponseNotFound = {
    status: 404,
};
/**
 * HTTP 415 Unsupported Media Type
 *
 * @type {?}
 */
exports.uResponseUnsupportedMediaType = {
    status: 415,
};
/**
 * HTTP 405 Method Not Allowed
 *
 * @type {?}
 */
exports.uResponseMethodNotAllowed = {
    status: 405,
};
/**
 * HTTP 505 Version Not Supported
 *
 * @type {?}
 */
exports.uResponseVersionNotSupported = {
    status: 505,
};
