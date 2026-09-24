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
 * Generated from: third_party/javascript/connectrpc_connect/src/connect-error.ts
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
goog.module('google3.third_party.javascript.connectrpc_connect.src.connect$2derror');
var module = module || { id: 'third_party/javascript/connectrpc_connect/src/connect-error.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_code_1 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.code");
const tsickle_protobuf_2 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.index");
const tsickle_code_string_3 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.code$2dstring");
const code_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.code');
const protobuf_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.index');
const code_string_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.code$2dstring');
/**
 * ConnectError captures four pieces of information: a Code, an error
 * message, an optional cause of the error, and an optional collection of
 * arbitrary Protobuf messages called  "details".
 *
 * Because developer tools typically show just the error message, we prefix
 * it with the status code, so that the most important information is always
 * visible immediately.
 *
 * Error details are wrapped with google.protobuf.Any on the wire, so that
 * a server or middleware can attach arbitrary data to an error. Use the
 * method findDetails() to retrieve the details.
 * @extends {Error}
 */
class ConnectError extends Error {
    /**
     * Create a new ConnectError.
     * If no code is provided, code "unknown" is used.
     * Outgoing details are only relevant for the server side - a service may
     * raise an error with details, and it is up to the protocol implementation
     * to encode and send the details along with the error.
     * @public
     * @param {string} message
     * @param {!tsickle_code_1.Code=} code
     * @param {(undefined|!Array<!Array<?>>|!Headers|?)=} metadata
     * @param {(undefined|!Array<{desc: !tsickle_protobuf_2.DescMessage, value: ?}>)=} outgoingDetails
     * @param {*=} cause
     */
    constructor(message, code = code_js_1.Code.Unknown, metadata, outgoingDetails, cause) {
        super(createMessage(message, code));
        this.name = "ConnectError";
        // see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html#example
        Object.setPrototypeOf(this, new.target.prototype);
        this.rawMessage = message;
        this.code = code;
        this.metadata = new Headers(metadata ?? {});
        this.details = outgoingDetails ?? [];
        this.cause = cause;
    }
    /**
     * Convert any value - typically a caught error into a ConnectError,
     * following these rules:
     * - If the value is already a ConnectError, return it as is.
     * - If the value is an AbortError or TimeoutError from the fetch API, return
     *   the message of the error with code Canceled.
     * - For other Errors, return the error message with code Unknown by default.
     * - For other values, return the values String representation as a message,
     *   with the code Unknown by default.
     * The original value will be used for the "cause" property for the new
     * ConnectError.
     * @public
     * @param {*} reason
     * @param {!tsickle_code_1.Code=} code
     * @return {!ConnectError}
     */
    static from(reason, code = code_js_1.Code.Unknown) {
        if (reason instanceof ConnectError) {
            return reason;
        }
        if (reason instanceof Error) {
            if ((/** @type {!Error} */ (reason)).name == "AbortError" || (/** @type {!Error} */ (reason)).name == "TimeoutError") {
                // Fetch requests can only be canceled with an AbortController,
                // or with AbortSignal.timeout().
                return new ConnectError((/** @type {!Error} */ (reason)).message, code_js_1.Code.Canceled);
            }
            return new ConnectError((/** @type {!Error} */ (reason)).message, code, undefined, undefined, reason);
        }
        return new ConnectError(String(reason), code, undefined, undefined, reason);
    }
    /**
     * @public
     * @param {*} v
     * @return {boolean}
     */
    static [Symbol.hasInstance](v) {
        if (!(v instanceof Error)) {
            return false;
        }
        if (Object.getPrototypeOf(v) === ConnectError.prototype) {
            return true;
        }
        return ((/** @type {!Error} */ (v)).name === "ConnectError" &&
            "code" in v &&
            typeof v.code === "number" &&
            "metadata" in v &&
            "details" in v &&
            Array.isArray(v.details) &&
            "rawMessage" in v &&
            typeof v.rawMessage == "string" &&
            "cause" in v);
    }
    /**
     * @public
     * @param {(!tsickle_protobuf_2.DescMessage|!tsickle_protobuf_2.Registry)} typeOrRegistry
     * @return {!Array<*>}
     */
    findDetails(typeOrRegistry) {
        /** @type {(!tsickle_protobuf_2.Registry|{getMessage: function(string): (undefined|!tsickle_protobuf_2.DescMessage)})} */
        const registry = typeOrRegistry.kind === "message"
            ? {
                getMessage: (/**
                 * @param {string} typeName
                 * @return {(undefined|!tsickle_protobuf_2.DescMessage)}
                 */
                (typeName) => typeName === (/** @type {!tsickle_protobuf_2.DescMessage} */ (typeOrRegistry)).typeName ? typeOrRegistry : undefined),
            }
            : typeOrRegistry;
        /** @type {!Array<*>} */
        const details = [];
        for (const data of this.details) {
            if ("desc" in data) {
                if (registry.getMessage((/** @type {{desc: !tsickle_protobuf_2.DescMessage, value: ?}} */ (data)).desc.typeName)) {
                    details.push((0, protobuf_1.create)((/** @type {{desc: !tsickle_protobuf_2.DescMessage, value: ?}} */ (data)).desc, (/** @type {{desc: !tsickle_protobuf_2.DescMessage, value: ?}} */ (data)).value));
                }
                continue;
            }
            /** @type {(undefined|!tsickle_protobuf_2.DescMessage)} */
            const desc = registry.getMessage((/** @type {{type: string, value: !Uint8Array, debug: (undefined|null|string|number|boolean|!Array<(null|string|number|boolean|?|!Object<string,?>)>|!Object<string,(null|string|number|boolean|!Array<?>|?)>)}} */ (data)).type);
            if (desc) {
                try {
                    details.push((0, protobuf_1.fromBinary)(desc, (/** @type {{type: string, value: !Uint8Array, debug: (undefined|null|string|number|boolean|!Array<(null|string|number|boolean|?|!Object<string,?>)>|!Object<string,(null|string|number|boolean|!Array<?>|?)>)}} */ (data)).value));
                }
                catch (_) {
                    // We silently give up if we are unable to parse the detail, because
                    // that appears to be the least worst behavior.
                    // It is very unlikely that a user surrounds a catch body handling the
                    // error with another try-catch statement, and we do not want to
                    // recommend doing so.
                }
            }
        }
        return details;
    }
}
exports.ConnectError = ConnectError;
/* istanbul ignore if */
if (false) {
    /**
     * The Code for this error.
     * @const {!tsickle_code_1.Code}
     * @public
     */
    ConnectError.prototype.code;
    /**
     * A union of response headers and trailers associated with this error.
     * @const {!Headers}
     * @public
     */
    ConnectError.prototype.metadata;
    /**
     * When an error is parsed from the wire, incoming error details are stored
     * in this property. They can be retrieved using findDetails().
     *
     * When an error is constructed to be sent over the wire, outgoing error
     * details are stored in this property as well.
     * @type {!Array<({type: string, value: !Uint8Array, debug: (undefined|null|string|number|boolean|!Array<(null|string|number|boolean|?|!Object<string,?>)>|!Object<string,(null|string|number|boolean|!Array<?>|?)>)}|{desc: !tsickle_protobuf_2.DescMessage, value: ?})>}
     * @public
     */
    ConnectError.prototype.details;
    /**
     * The error message, but without a status code in front.
     *
     * For example, a new `ConnectError("hello", Code.NotFound)` will have
     * the message `[not found] hello`, and the rawMessage `hello`.
     * @const {string}
     * @public
     */
    ConnectError.prototype.rawMessage;
    /**
     * @type {string}
     * @public
     */
    ConnectError.prototype.name;
    /**
     * The underlying cause of this error, if any. In cases where the actual cause
     * is elided with the error message, the cause is specified here so that we
     * don't leak the underlying error, but instead make it available for logging.
     * @type {*}
     * @public
     */
    ConnectError.prototype.cause;
}
/**
 * An incoming detail is basically a google.protobuf.Any, but it includes an
 * optional JSON representation in the "debug" key, and stores a type name
 * instead of a type URL.
 * @typedef {{type: string, value: !Uint8Array, debug: (undefined|null|string|number|boolean|!Array<(null|string|number|boolean|?|!Object<string,?>)>|!Object<string,(null|string|number|boolean|!Array<?>|?)>)}}
 */
var IncomingDetail;
/**
 * Message and Desc Pair.
 * @typedef {{desc: !tsickle_protobuf_2.DescMessage, value: ?}}
 */
var OutgoingDetail;
/**
 * Create an error message, prefixing the given code.
 * @param {string} message
 * @param {!tsickle_code_1.Code} code
 * @return {string}
 */
function createMessage(message, code) {
    return message.length
        ? `[${(0, code_string_js_1.codeToString)(code)}] ${message}`
        : `[${(0, code_string_js_1.codeToString)(code)}]`;
}
