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
 * Generated from: third_party/javascript/connectrpc_connect/src/protocol-connect/end-stream.ts
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
goog.module('google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.end$2dstream');
var module = module || { id: 'third_party/javascript/connectrpc_connect/src/protocol-connect/end-stream.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_protobuf_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.index");
const tsickle_error_json_2 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.error$2djson");
const tsickle_http_headers_3 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.http$2dheaders");
const tsickle_connect_error_4 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.connect$2derror");
const tsickle_code_5 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.code");
const tsickle_serialization_6 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.serialization");
const error_json_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.error$2djson');
const http_headers_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.http$2dheaders');
const connect_error_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.connect$2derror');
const code_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.code');
/**
 * endStreamFlag indicates that the data in a EnvelopedMessage
 * is a EndStreamResponse of the Connect protocol.
 *
 * @type {number}
 */
exports.endStreamFlag = 0b00000010;
/**
 * Represents the EndStreamResponse of the Connect protocol.
 *
 * @record
 */
function EndStreamResponse() { }
exports.EndStreamResponse = EndStreamResponse;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!Headers}
     * @public
     */
    EndStreamResponse.prototype.metadata;
    /**
     * @type {(undefined|!tsickle_connect_error_4.ConnectError)}
     * @public
     */
    EndStreamResponse.prototype.error;
}
/**
 * Parse an EndStreamResponse of the Connect protocol.
 * Throws a ConnectError on malformed input.
 *
 * @param {(string|!Uint8Array)} data
 * @return {!EndStreamResponse}
 */
function endStreamFromJson(data) {
    /** @type {!tsickle_connect_error_4.ConnectError} */
    const parseErr = new connect_error_js_1.ConnectError("invalid end stream", code_js_1.Code.Unknown);
    /** @type {(null|string|number|boolean|!Array<?>|!Object<string,?>)} */
    let jsonValue;
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        jsonValue = JSON.parse(typeof data == "string" ? data : new TextDecoder().decode(data));
    }
    catch (e) {
        throw parseErr;
    }
    if (typeof jsonValue != "object" ||
        jsonValue == null ||
        Array.isArray(jsonValue)) {
        throw parseErr;
    }
    /** @type {!Headers} */
    const metadata = new Headers();
    if ("metadata" in jsonValue) {
        if (typeof (/** @type {(null|string|number|boolean|!Array<?>|!Object<string,?>)} */ ((/** @type {!Object<string,(null|string|number|boolean|!Array<?>|?)>} */ (jsonValue)).metadata)) != "object" ||
            (/** @type {(null|!Array<(null|string|number|boolean|?|!Object<string,?>)>|!Object<string,(null|string|number|boolean|!Array<?>|?)>)} */ ((/** @type {!Object<string,(null|string|number|boolean|!Array<?>|?)>} */ (jsonValue)).metadata)) == null ||
            Array.isArray((/** @type {(!Array<(null|string|number|boolean|?|!Object<string,?>)>|!Object<string,(null|string|number|boolean|!Array<?>|?)>)} */ ((/** @type {!Object<string,(null|string|number|boolean|!Array<?>|?)>} */ (jsonValue)).metadata)))) {
            throw parseErr;
        }
        for (const [key__tsickle_destructured_1, values__tsickle_destructured_2] of Object.entries((/** @type {!Object<string,(null|string|number|boolean|!Array<?>|?)>} */ ((/** @type {!Object<string,(null|string|number|boolean|!Array<?>|?)>} */ (jsonValue)).metadata)))) {
            const key = /** @type {string} */ (key__tsickle_destructured_1);
            const values = /** @type {(null|string|number|boolean|!Array<?>|!Object<string,?>)} */ (values__tsickle_destructured_2);
            if (!Array.isArray(values) ||
                (/** @type {!Array<(null|string|number|boolean|?|!Object<string,?>)>} */ (values)).some((/**
                 * @param {(null|string|number|boolean|!Array<?>|!Object<string,?>)} value
                 * @return {boolean}
                 */
                (value) => typeof value != "string"))) {
                throw parseErr;
            }
            for (const value of values) {
                metadata.append(key, (/** @type {string} */ (value)));
            }
        }
    }
    /** @type {(undefined|!tsickle_connect_error_4.ConnectError)} */
    const error = "error" in jsonValue && (/** @type {(null|string|number|boolean|!Array<?>|!Object<string,?>)} */ ((/** @type {!Object<string,(null|string|number|boolean|!Array<?>|?)>} */ (jsonValue)).error)) != null
        ? (0, error_json_js_1.errorFromJson)((/** @type {(string|number|boolean|!Array<(null|string|number|boolean|?|!Object<string,?>)>|!Object<string,(null|string|number|boolean|!Array<?>|?)>)} */ ((/** @type {!Object<string,(null|string|number|boolean|!Array<?>|?)>} */ (jsonValue)).error)), metadata, parseErr)
        : undefined;
    return { metadata, error };
}
exports.endStreamFromJson = endStreamFromJson;
/**
 * Serialize the given EndStreamResponse to JSON.
 *
 * The JSON serialization options are required to produce the optional
 * human-readable representation of error details if the detail uses
 * google.protobuf.Any.
 *
 * See https://connectrpc.com/docs/protocol#error-end-stream
 *
 * @param {!Headers} metadata
 * @param {(undefined|!tsickle_connect_error_4.ConnectError)} error
 * @param {(undefined|?)} jsonWriteOptions
 * @return {!Object<string,(null|string|number|boolean|!Array<?>|?)>}
 */
function endStreamToJson(metadata, error, jsonWriteOptions) {
    /** @type {!Object<string,(null|string|number|boolean|!Array<?>|?)>} */
    const es = {};
    if (error !== undefined) {
        es.error = (0, error_json_js_1.errorToJson)(error, jsonWriteOptions);
        metadata = (0, http_headers_js_1.appendHeaders)(metadata, error.metadata);
    }
    /** @type {boolean} */
    let hasMetadata = false;
    /** @type {!Object<string,(null|string|number|boolean|!Array<?>|?)>} */
    const md = {};
    metadata.forEach((/**
     * @param {string} value
     * @param {string} key
     * @return {void}
     */
    (value, key) => {
        hasMetadata = true;
        md[key] = [value];
    }));
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (hasMetadata) {
        es.metadata = md;
    }
    return es;
}
exports.endStreamToJson = endStreamToJson;
/**
 * Create a Serialization object that serializes a Connect EndStreamResponse.
 *
 * @param {(undefined|?)} options
 * @return {!tsickle_serialization_6.Serialization<!EndStreamResponse>}
 */
function createEndStreamSerialization(options) {
    /** @type {!TextEncoder} */
    const textEncoder = new TextEncoder();
    return {
        /**
         * @public
         * @param {!EndStreamResponse} data
         * @return {!Uint8Array}
         */
        serialize(data) {
            try {
                /** @type {!Object<string,(null|string|number|boolean|!Array<?>|?)>} */
                const jsonObject = endStreamToJson(data.metadata, data.error, options);
                /** @type {string} */
                const jsonString = JSON.stringify(jsonObject);
                return textEncoder.encode(jsonString);
            }
            catch (e) {
                /** @type {string} */
                const m = e instanceof Error ? (/** @type {!Error} */ (e)).message : String(e);
                throw new connect_error_js_1.ConnectError(`failed to serialize EndStreamResponse: ${m}`, code_js_1.Code.Internal);
            }
        },
        /**
         * @public
         * @param {!Uint8Array} data
         * @return {!EndStreamResponse}
         */
        parse(data) {
            try {
                return endStreamFromJson(data);
            }
            catch (e) {
                /** @type {string} */
                const m = e instanceof Error ? (/** @type {!Error} */ (e)).message : String(e);
                throw new connect_error_js_1.ConnectError(`failed to parse EndStreamResponse: ${m}`, code_js_1.Code.InvalidArgument);
            }
        },
    };
}
exports.createEndStreamSerialization = createEndStreamSerialization;
