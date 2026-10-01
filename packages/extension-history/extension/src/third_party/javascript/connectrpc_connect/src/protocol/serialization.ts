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
 * Generated from: third_party/javascript/connectrpc_connect/src/protocol/serialization.ts
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
goog.module('google3.third_party.javascript.connectrpc_connect.src.protocol.serialization');
var module = module || { id: 'third_party/javascript/connectrpc_connect/src/protocol/serialization.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_protobuf_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.index");
const tsickle_connect_error_2 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.connect$2derror");
const tsickle_code_3 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.code");
const tsickle_limit_io_4 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.limit$2dio");
const protobuf_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.index');
const connect_error_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.connect$2derror');
const code_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.code');
const limit_io_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol.limit$2dio');
/**
 * Serialization provides methods to serialize or parse data with a certain
 * format.
 *
 * @record
 * @template T
 */
function Serialization() { }
exports.Serialization = Serialization;
/* istanbul ignore if */
if (false) {
    /**
     * Serialize T. Raises a ConnectError with Code.Internal if an error occurs.
     * @type {function(T): !Uint8Array}
     * @public
     */
    Serialization.prototype.serialize;
    /**
     * Parse T. Raises a ConnectError with Code.InvalidArgument if an error occurs.
     * @type {function(!Uint8Array): T}
     * @public
     */
    Serialization.prototype.parse;
}
/**
 * Sets default JSON serialization options for connect-es.
 *
 * With standard protobuf JSON serialization, unknown JSON fields are
 * rejected by default. In connect-es, unknown JSON fields are ignored
 * by default.
 * @param {(undefined|?)} options
 * @return {{alwaysEmitImplicit: (undefined|boolean), enumAsInteger: (undefined|boolean), useProtoFieldName: (undefined|boolean), ignoreUnknownFields: (undefined|boolean), registry: (undefined|!tsickle_protobuf_1.Registry)}}
 */
function getJsonOptions(options) {
    /** @type {{alwaysEmitImplicit: (undefined|boolean), enumAsInteger: (undefined|boolean), useProtoFieldName: (undefined|boolean), ignoreUnknownFields: (undefined|boolean), registry: (undefined|!tsickle_protobuf_1.Registry)}} */
    const o = { ...options };
    o.ignoreUnknownFields ??= true;
    return o;
}
exports.getJsonOptions = getJsonOptions;
/**
 * Create an object that provides convenient access to request and response
 * message serialization for a given method.
 *
 * @template I, O
 * @param {?} method
 * @param {(undefined|?)} binaryOptions
 * @param {(undefined|?)} jsonOptions
 * @param {{writeMaxBytes: number, readMaxBytes: number}} limitOptions
 * @return {!MethodSerializationLookup<I, O>}
 */
function createMethodSerializationLookup(method, binaryOptions, jsonOptions, limitOptions) {
    /** @type {!Serialization<?>} */
    const inputBinary = limitSerialization(createBinarySerialization(method.input, binaryOptions), limitOptions);
    /** @type {!Serialization<?>} */
    const inputJson = limitSerialization(createJsonSerialization(method.input, jsonOptions), limitOptions);
    /** @type {!Serialization<?>} */
    const outputBinary = limitSerialization(createBinarySerialization(method.output, binaryOptions), limitOptions);
    /** @type {!Serialization<?>} */
    const outputJson = limitSerialization(createJsonSerialization(method.output, jsonOptions), limitOptions);
    return {
        /**
         * @public
         * @param {boolean} useBinaryFormat
         * @return {!Serialization<?>}
         */
        getI(useBinaryFormat) {
            return useBinaryFormat ? inputBinary : inputJson;
        },
        /**
         * @public
         * @param {boolean} useBinaryFormat
         * @return {!Serialization<?>}
         */
        getO(useBinaryFormat) {
            return useBinaryFormat ? outputBinary : outputJson;
        },
    };
}
exports.createMethodSerializationLookup = createMethodSerializationLookup;
/**
 * MethodSerializationLookup provides convenient access to request and response
 * message serialization for a given method.
 *
 * @record
 * @template I, O
 */
function MethodSerializationLookup() { }
exports.MethodSerializationLookup = MethodSerializationLookup;
/* istanbul ignore if */
if (false) {
    /**
     * Get the JSON or binary serialization for the request message type.
     * @public
     * @param {boolean} useBinaryFormat
     * @return {!Serialization<?>}
     */
    MethodSerializationLookup.prototype.getI = function (useBinaryFormat) { };
    /**
     * Get the JSON or binary serialization for the response message type.
     * @public
     * @param {boolean} useBinaryFormat
     * @return {!Serialization<?>}
     */
    MethodSerializationLookup.prototype.getO = function (useBinaryFormat) { };
}
/**
 * Returns functions to normalize and serialize the input message
 * of an RPC, and to parse the output message of an RPC.
 *
 * @template I, O
 * @param {?} method
 * @param {boolean} useBinaryFormat
 * @param {(undefined|?)=} jsonOptions
 * @param {(undefined|?)=} binaryOptions
 * @return {{parse: function(!Uint8Array): ?, serialize: function(?): !Uint8Array}}
 */
function createClientMethodSerializers(method, useBinaryFormat, jsonOptions, binaryOptions) {
    /** @type {!Serialization<?>} */
    const input = useBinaryFormat
        ? createBinarySerialization(method.input, binaryOptions)
        : createJsonSerialization(method.input, jsonOptions);
    /** @type {!Serialization<?>} */
    const output = useBinaryFormat
        ? createBinarySerialization(method.output, binaryOptions)
        : createJsonSerialization(method.output, jsonOptions);
    return { parse: output.parse, serialize: input.serialize };
}
exports.createClientMethodSerializers = createClientMethodSerializers;
/**
 * Apply I/O limits to a Serialization object, returning a new object.
 *
 * @template T
 * @param {!Serialization<T>} serialization
 * @param {{writeMaxBytes: number, readMaxBytes: number}} limitOptions
 * @return {!Serialization<T>}
 */
function limitSerialization(serialization, limitOptions) {
    return {
        /**
         * @public
         * @param {T} data
         * @return {!Uint8Array}
         */
        serialize(data) {
            /** @type {!Uint8Array} */
            const bytes = serialization.serialize(data);
            (0, limit_io_js_1.assertWriteMaxBytes)(limitOptions.writeMaxBytes, bytes.byteLength);
            return bytes;
        },
        /**
         * @public
         * @param {!Uint8Array} data
         * @return {T}
         */
        parse(data) {
            (0, limit_io_js_1.assertReadMaxBytes)(limitOptions.readMaxBytes, data.byteLength, true);
            return serialization.parse(data);
        },
    };
}
exports.limitSerialization = limitSerialization;
/**
 * Options for createBinarySerialization()
 * @typedef {?}
 */
var BinarySerializationOptions;
/**
 * Creates a Serialization object for serializing the given protobuf message
 * with the protobuf binary format.
 * @template Desc
 * @param {Desc} desc
 * @param {(undefined|?)} options
 * @return {!Serialization<?>}
 */
function createBinarySerialization(desc, options) {
    return {
        /**
         * @public
         * @param {!Uint8Array} data
         * @return {?}
         */
        parse(data) {
            try {
                return (0, protobuf_1.fromBinary)(desc, data, options);
            }
            catch (e) {
                /** @type {string} */
                const m = e instanceof Error ? (/** @type {!Error} */ (e)).message : String(e);
                throw new connect_error_js_1.ConnectError(`parse binary: ${m}`, code_js_1.Code.Internal);
            }
        },
        /**
         * @public
         * @param {?} data
         * @return {!Uint8Array}
         */
        serialize(data) {
            try {
                return (0, protobuf_1.toBinary)(desc, data, options);
            }
            catch (e) {
                /** @type {string} */
                const m = e instanceof Error ? (/** @type {!Error} */ (e)).message : String(e);
                throw new connect_error_js_1.ConnectError(`serialize binary: ${m}`, code_js_1.Code.Internal);
            }
        },
    };
}
exports.createBinarySerialization = createBinarySerialization;
/**
 * Options for createJsonSerialization()
 * @typedef {?}
 */
var JsonSerializationOptions;
/**
 * Creates a Serialization object for serializing the given protobuf message
 * with the protobuf canonical JSON encoding.
 *
 * By default, unknown fields are ignored.
 * @template Desc
 * @param {Desc} desc
 * @param {(undefined|?)} options
 * @return {!Serialization<?>}
 */
function createJsonSerialization(desc, options) {
    /** @type {{encode: function((undefined|string)=): !Uint8Array}} */
    const textEncoder = options?.textEncoder ?? new TextEncoder();
    /** @type {(!TextDecoder|{decode: function((undefined|!Uint8Array)=): string})} */
    const textDecoder = options?.textDecoder ?? new TextDecoder();
    /** @type {{alwaysEmitImplicit: (undefined|boolean), enumAsInteger: (undefined|boolean), useProtoFieldName: (undefined|boolean), ignoreUnknownFields: (undefined|boolean), registry: (undefined|!tsickle_protobuf_1.Registry)}} */
    const o = getJsonOptions(options);
    return {
        /**
         * @public
         * @param {!Uint8Array} data
         * @return {?}
         */
        parse(data) {
            try {
                /** @type {string} */
                const json = textDecoder.decode(data);
                return (0, protobuf_1.fromJsonString)(desc, json, o);
            }
            catch (e) {
                throw connect_error_js_1.ConnectError.from(e, code_js_1.Code.InvalidArgument);
            }
        },
        /**
         * @public
         * @param {?} data
         * @return {!Uint8Array}
         */
        serialize(data) {
            try {
                /** @type {string} */
                const json = (0, protobuf_1.toJsonString)(desc, data, o);
                return textEncoder.encode(json);
            }
            catch (e) {
                throw connect_error_js_1.ConnectError.from(e, code_js_1.Code.Internal);
            }
        },
    };
}
exports.createJsonSerialization = createJsonSerialization;
