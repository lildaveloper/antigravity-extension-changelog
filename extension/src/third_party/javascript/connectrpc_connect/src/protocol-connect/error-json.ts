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
 * Generated from: third_party/javascript/connectrpc_connect/src/protocol-connect/error-json.ts
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
goog.module('google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.error$2djson');
var module = module || { id: 'third_party/javascript/connectrpc_connect/src/protocol-connect/error-json.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_wire_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wire.index");
const tsickle_protobuf_2 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.index");
const tsickle_code_3 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.code");
const tsickle_connect_error_4 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.connect$2derror");
const tsickle_code_string_5 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.code$2dstring");
const wire_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wire.index');
const protobuf_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.index');
const code_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.code');
const connect_error_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.connect$2derror');
const code_string_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.code$2dstring');
/**
 * Parse a Connect error from a JSON value.
 * Will return a ConnectError, and throw the provided fallback if parsing failed.
 *
 * @param {(null|string|number|boolean|!Object<string,?>|!Array<?>)} jsonValue
 * @param {(undefined|!Array<!Array<?>>|?|!Headers)} metadata
 * @param {!tsickle_connect_error_4.ConnectError} fallback
 * @return {!tsickle_connect_error_4.ConnectError}
 */
function errorFromJson(jsonValue, metadata, fallback) {
    if (metadata) {
        new Headers(metadata).forEach((/**
         * @param {string} value
         * @param {string} key
         * @return {void}
         */
        (value, key) => fallback.metadata.append(key, value)));
    }
    if (typeof jsonValue !== "object" ||
        jsonValue == null ||
        Array.isArray(jsonValue)) {
        throw fallback;
    }
    /** @type {!tsickle_code_3.Code} */
    let code = fallback.code;
    if ("code" in jsonValue && typeof (/** @type {(null|string|number|boolean|!Object<string,?>|!Array<?>)} */ ((/** @type {!Object<string,(null|string|number|boolean|?|!Array<?>)>} */ (jsonValue)).code)) === "string") {
        code = (0, code_string_js_1.codeFromString)((/** @type {string} */ ((/** @type {!Object<string,(null|string|number|boolean|?|!Array<?>)>} */ (jsonValue)).code))) ?? code;
    }
    /** @type {(null|string|number|boolean|!Object<string,?>|!Array<?>)} */
    const message = (/** @type {(null|string|number|boolean|!Object<string,?>|!Array<?>)} */ ((/** @type {!Object<string,(null|string|number|boolean|?|!Array<?>)>} */ (jsonValue)).message));
    if (message != null && typeof message !== "string") {
        throw fallback;
    }
    /** @type {!tsickle_connect_error_4.ConnectError} */
    const error = new connect_error_js_1.ConnectError(message ?? "", code, metadata);
    if ("details" in jsonValue && Array.isArray((/** @type {(null|string|number|boolean|!Object<string,?>|!Array<?>)} */ ((/** @type {!Object<string,(null|string|number|boolean|?|!Array<?>)>} */ (jsonValue)).details)))) {
        for (const detail of (/** @type {!Array<(null|string|number|boolean|!Object<string,?>|?)>} */ ((/** @type {!Object<string,(null|string|number|boolean|?|!Array<?>)>} */ (jsonValue)).details))) {
            if (detail === null ||
                typeof detail != "object" ||
                Array.isArray(detail) ||
                typeof (/** @type {(null|string|number|boolean|!Object<string,?>|!Array<?>)} */ ((/** @type {!Object<string,(null|string|number|boolean|?|!Array<?>)>} */ (detail)).type)) != "string" ||
                typeof (/** @type {(null|string|number|boolean|!Object<string,?>|!Array<?>)} */ ((/** @type {!Object<string,(null|string|number|boolean|?|!Array<?>)>} */ (detail)).value)) != "string") {
                throw fallback;
            }
            try {
                error.details.push({
                    type: (/** @type {string} */ ((/** @type {!Object<string,(null|string|number|boolean|?|!Array<?>)>} */ (detail)).type)),
                    value: (0, wire_1.base64Decode)((/** @type {string} */ ((/** @type {!Object<string,(null|string|number|boolean|?|!Array<?>)>} */ (detail)).value))),
                    debug: (/** @type {(null|string|number|boolean|!Object<string,?>|!Array<?>)} */ ((/** @type {!Object<string,(null|string|number|boolean|?|!Array<?>)>} */ (detail)).debug)),
                });
            }
            catch (e) {
                throw fallback;
            }
        }
    }
    return error;
}
exports.errorFromJson = errorFromJson;
/**
 * Parse a Connect error from a serialized JSON value.
 * Will return a ConnectError, and throw the provided fallback if parsing failed.
 *
 * @param {!Uint8Array} bytes
 * @param {(undefined|!Array<!Array<?>>|?|!Headers)} metadata
 * @param {!tsickle_connect_error_4.ConnectError} fallback
 * @return {!tsickle_connect_error_4.ConnectError}
 */
function errorFromJsonBytes(bytes, metadata, fallback) {
    /** @type {(null|string|number|boolean|!Object<string,?>|!Array<?>)} */
    let jsonValue;
    try {
        jsonValue = (/** @type {(null|string|number|boolean|!Object<string,?>|!Array<?>)} */ (JSON.parse(new TextDecoder().decode(bytes))));
    }
    catch (e) {
        throw fallback;
    }
    return errorFromJson(jsonValue, metadata, fallback);
}
exports.errorFromJsonBytes = errorFromJsonBytes;
/**
 * Serialize the given error to JSON.
 *
 * The JSON serialization options are required to produce the optional
 * human-readable representation in the "debug" key if the detail uses
 * google.protobuf.Any. If serialization of the "debug" value fails, it
 * is silently disregarded.
 *
 * See https://connectrpc.com/docs/protocol#error-end-stream
 *
 * @param {!tsickle_connect_error_4.ConnectError} error
 * @param {(undefined|?)} jsonWriteOptions
 * @return {!Object<string,(null|string|number|boolean|?|!Array<?>)>}
 */
function errorToJson(error, jsonWriteOptions) {
    /** @type {!Object<string,(null|string|number|boolean|?|!Array<?>)>} */
    const o = {
        code: (0, code_string_js_1.codeToString)(error.code),
    };
    if (error.rawMessage.length > 0) {
        o.message = error.rawMessage;
    }
    if (error.details.length > 0) {
        /** @typedef {{type: string, value: !Uint8Array, debug: (undefined|null|string|number|boolean|!Object<string,(null|string|number|boolean|?|!Array<?>)>|!Array<(null|string|number|boolean|!Object<string,?>|?)>)}} */
        var IncomingDetail;
        o.details = error.details
            .map((/**
         * @param {({desc: !tsickle_protobuf_2.DescMessage, value: ?}|{type: string, value: !Uint8Array, debug: (undefined|null|string|number|boolean|!Object<string,(null|string|number|boolean|?|!Array<?>)>|!Array<(null|string|number|boolean|!Object<string,?>|?)>)})} detail
         * @return {{type: string, value: !Uint8Array, debug: (undefined|null|string|number|boolean|!Object<string,(null|string|number|boolean|?|!Array<?>)>|!Array<(null|string|number|boolean|!Object<string,?>|?)>)}}
         */
        (detail) => {
            if ("desc" in detail) {
                /** @type {*} */
                const msg = (0, protobuf_1.create)((/** @type {{desc: !tsickle_protobuf_2.DescMessage, value: ?}} */ (detail)).desc, (/** @type {{desc: !tsickle_protobuf_2.DescMessage, value: ?}} */ (detail)).value);
                /** @type {{type: string, value: !Uint8Array, debug: (undefined|null|string|number|boolean|!Object<string,(null|string|number|boolean|?|!Array<?>)>|!Array<(null|string|number|boolean|!Object<string,?>|?)>)}} */
                const i = {
                    type: (/** @type {{desc: !tsickle_protobuf_2.DescMessage, value: ?}} */ (detail)).desc.typeName,
                    value: (0, protobuf_1.toBinary)((/** @type {{desc: !tsickle_protobuf_2.DescMessage, value: ?}} */ (detail)).desc, msg),
                };
                try {
                    i.debug = (0, protobuf_1.toJson)((/** @type {{desc: !tsickle_protobuf_2.DescMessage, value: ?}} */ (detail)).desc, msg, jsonWriteOptions);
                }
                catch (e) {
                    // We deliberately ignore errors that may occur when serializing
                    // a message to JSON (the message contains an Any).
                    // The rationale is that we are only trying to provide optional
                    // debug information.
                }
                return i;
            }
            return detail;
        }))
            .map((/**
         * @param {{type: string, value: !Uint8Array, debug: (undefined|null|string|number|boolean|!Object<string,(null|string|number|boolean|?|!Array<?>)>|!Array<(null|string|number|boolean|!Object<string,?>|?)>)}} __0
         * @return {{value: string, type: string, debug: (undefined|null|string|number|boolean|!Object<string,(null|string|number|boolean|?|!Array<?>)>|!Array<(null|string|number|boolean|!Object<string,?>|?)>)}}
         */
        ({ value, ...rest }) => ({
            ...rest,
            value: (0, wire_1.base64Encode)(value, "std_raw"),
        })));
    }
    return o;
}
exports.errorToJson = errorToJson;
/**
 * Serialize the given error to JSON. This calls errorToJson(), but stringifies
 * the result, and converts it into a UInt8Array.
 *
 * @param {!tsickle_connect_error_4.ConnectError} error
 * @param {(undefined|?)} jsonWriteOptions
 * @return {!Uint8Array}
 */
function errorToJsonBytes(error, jsonWriteOptions) {
    /** @type {!TextEncoder} */
    const textEncoder = new TextEncoder();
    try {
        /** @type {!Object<string,(null|string|number|boolean|?|!Array<?>)>} */
        const jsonObject = errorToJson(error, jsonWriteOptions);
        /** @type {string} */
        const jsonString = JSON.stringify(jsonObject);
        return textEncoder.encode(jsonString);
    }
    catch (e) {
        /** @type {string} */
        const m = e instanceof Error ? (/** @type {!Error} */ (e)).message : String(e);
        throw new connect_error_js_1.ConnectError(`failed to serialize Connect Error: ${m}`, code_js_1.Code.Internal);
    }
}
exports.errorToJsonBytes = errorToJsonBytes;
