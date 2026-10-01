/**
 * @license
 * Copyright 2021-2025 Buf Technologies, Inc
 * SPDX-License-Identifier: Apache-2.0
 */
// Copyright 2021-2025 Buf Technologies, Inc.
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
 * Generated from: third_party/javascript/bufbuild_protobuf/src/wire/text-encoding.ts
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
goog.module('google3.third_party.javascript.bufbuild_protobuf.src.wire.text$2dencoding');
var module = module || { id: 'third_party/javascript/bufbuild_protobuf/src/wire/text-encoding.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
/** @type {symbol} */
const symbol = Symbol.for("@bufbuild/protobuf/text-encoding");
/**
 * @record
 */
function TextEncoding() { }
/* istanbul ignore if */
if (false) {
    /**
     * Verify that the given text is valid UTF-8.
     * @type {function(string): boolean}
     * @public
     */
    TextEncoding.prototype.checkUtf8;
    /**
     * Encode UTF-8 text to binary.
     * @type {function(string): !Uint8Array}
     * @public
     */
    TextEncoding.prototype.encodeUtf8;
    /**
     * Decode UTF-8 text from binary.
     * @type {function(!Uint8Array): string}
     * @public
     */
    TextEncoding.prototype.decodeUtf8;
}
/**
 * Protobuf-ES requires the Text Encoding API to convert UTF-8 from and to
 * binary. This WHATWG API is widely available, but it is not part of the
 * ECMAScript standard. On runtimes where it is not available, use this
 * function to provide your own implementation.
 *
 * Note that the Text Encoding API does not provide a way to validate UTF-8.
 * Our implementation falls back to use encodeURIComponent().
 * @param {!TextEncoding} textEncoding
 * @return {void}
 */
function configureTextEncoding(textEncoding) {
    ((/** @type {*} */ (globalThis)))[symbol] = textEncoding;
}
exports.configureTextEncoding = configureTextEncoding;
/**
 * @return {!TextEncoding}
 */
function getTextEncoding() {
    if (((/** @type {*} */ (globalThis)))[symbol] == undefined) {
        /** @type {{encode: function(string): !Uint8Array}} */
        const te = new ((/** @type {{TextEncoder: function(new:{encode: function(string): !Uint8Array}), TextDecoder: function(new:{decode: function(!Uint8Array): string})}} */ ((/** @type {*} */ (globalThis))))).TextEncoder();
        /** @type {{decode: function(!Uint8Array): string}} */
        const td = new ((/** @type {{TextEncoder: function(new:{encode: function(string): !Uint8Array}), TextDecoder: function(new:{decode: function(!Uint8Array): string})}} */ ((/** @type {*} */ (globalThis))))).TextDecoder();
        ((/** @type {*} */ (globalThis)))[symbol] = {
            /**
             * @public
             * @param {string} text
             * @return {!Uint8Array}
             */
            encodeUtf8(text) {
                return te.encode(text);
            },
            /**
             * @public
             * @param {!Uint8Array} bytes
             * @return {string}
             */
            decodeUtf8(bytes) {
                return td.decode(bytes);
            },
            /**
             * @public
             * @param {string} text
             * @return {boolean}
             */
            checkUtf8(text) {
                try {
                    encodeURIComponent(text);
                    return true;
                }
                catch (_) {
                    return false;
                }
            },
        };
    }
    return (/** @type {!TextEncoding} */ (((/** @type {*} */ (globalThis)))[symbol]));
}
exports.getTextEncoding = getTextEncoding;
/** @typedef {*} */
var GlobalWithTextEncoding;
/** @typedef {{TextEncoder: function(new:{encode: function(string): !Uint8Array}), TextDecoder: function(new:{decode: function(!Uint8Array): string})}} */
var GlobalWithTextEncoderDecoder;
