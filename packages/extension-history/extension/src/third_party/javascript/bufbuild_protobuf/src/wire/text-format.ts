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
 * Generated from: third_party/javascript/bufbuild_protobuf/src/wire/text-format.ts
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
goog.module('google3.third_party.javascript.bufbuild_protobuf.src.wire.text$2dformat');
var module = module || { id: 'third_party/javascript/bufbuild_protobuf/src/wire/text-format.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_descriptors_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.descriptors");
const tsickle_proto_int64_2 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.proto$2dint64");
const descriptors_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.descriptors');
const proto_int64_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.proto$2dint64');
/**
 * Parse an enum value from the Protobuf text format.
 *
 * @param {!tsickle_descriptors_1.DescEnum} descEnum
 * @param {string} value
 * @return {number}
 */
function parseTextFormatEnumValue(descEnum, value) {
    /** @type {(undefined|!tsickle_descriptors_1.DescEnumValue)} */
    const enumValue = descEnum.values.find((/**
     * @param {!tsickle_descriptors_1.DescEnumValue} v
     * @return {boolean}
     */
    (v) => v.name === value));
    if (!enumValue) {
        throw new Error(`cannot parse ${descEnum} default value: ${value}`);
    }
    return enumValue.number;
}
exports.parseTextFormatEnumValue = parseTextFormatEnumValue;
/**
 * Parse a scalar value from the Protobuf text format.
 *
 * @param {!tsickle_descriptors_1.ScalarType} type
 * @param {string} value
 * @return {(string|number|bigint|boolean|!Uint8Array)}
 */
function parseTextFormatScalarValue(type, value) {
    switch (type) {
        case descriptors_js_1.ScalarType.STRING:
            return value;
        case descriptors_js_1.ScalarType.BYTES: {
            /** @type {(boolean|!Uint8Array)} */
            const u = unescapeBytesDefaultValue(value);
            if (u === false) {
                throw new Error(`cannot parse ${descriptors_js_1.ScalarType[type]} default value: ${value}`);
            }
            return u;
        }
        case descriptors_js_1.ScalarType.INT64:
        case descriptors_js_1.ScalarType.SFIXED64:
        case descriptors_js_1.ScalarType.SINT64:
            return proto_int64_js_1.protoInt64.parse(value);
        case descriptors_js_1.ScalarType.UINT64:
        case descriptors_js_1.ScalarType.FIXED64:
            return proto_int64_js_1.protoInt64.uParse(value);
        case descriptors_js_1.ScalarType.DOUBLE:
        case descriptors_js_1.ScalarType.FLOAT:
            switch (value) {
                case "inf":
                    return Number.POSITIVE_INFINITY;
                case "-inf":
                    return Number.NEGATIVE_INFINITY;
                case "nan":
                    return Number.NaN;
                default:
                    return parseFloat(value);
            }
        case descriptors_js_1.ScalarType.BOOL:
            return value === "true";
        case descriptors_js_1.ScalarType.INT32:
        case descriptors_js_1.ScalarType.UINT32:
        case descriptors_js_1.ScalarType.SINT32:
        case descriptors_js_1.ScalarType.FIXED32:
        case descriptors_js_1.ScalarType.SFIXED32:
            return parseInt(value, 10);
    }
}
exports.parseTextFormatScalarValue = parseTextFormatScalarValue;
/**
 * Parses a text-encoded default value (proto2) of a BYTES field.
 * @param {string} str
 * @return {(boolean|!Uint8Array)}
 */
function unescapeBytesDefaultValue(str) {
    /** @type {!Array<number>} */
    const b = [];
    /** @type {{tail: string, c: string, next: function(): boolean, take: function(number): (string|boolean)}} */
    const input = {
        tail: str,
        c: "",
        /**
         * @public
         * @return {boolean}
         */
        next() {
            if (this.tail.length == 0) {
                return false;
            }
            this.c = this.tail[0];
            this.tail = this.tail.substring(1);
            return true;
        },
        /**
         * @public
         * @param {number} n
         * @return {(string|boolean)}
         */
        take(n) {
            if (this.tail.length >= n) {
                /** @type {string} */
                const r = this.tail.substring(0, n);
                this.tail = this.tail.substring(n);
                return r;
            }
            return false;
        },
    };
    while (input.next()) {
        switch (input.c) {
            case "\\":
                if (input.next()) {
                    switch ((/** @type {string} */ (input.c))) {
                        case "\\":
                            b.push((/** @type {string} */ (input.c)).charCodeAt(0));
                            break;
                        case "b":
                            b.push(0x08);
                            break;
                        case "f":
                            b.push(0x0c);
                            break;
                        case "n":
                            b.push(0x0a);
                            break;
                        case "r":
                            b.push(0x0d);
                            break;
                        case "t":
                            b.push(0x09);
                            break;
                        case "v":
                            b.push(0x0b);
                            break;
                        case "0":
                        case "1":
                        case "2":
                        case "3":
                        case "4":
                        case "5":
                        case "6":
                        case "7": {
                            /** @type {string} */
                            const s = input.c;
                            /** @type {(string|boolean)} */
                            const t = input.take(2);
                            if (t === false) {
                                return false;
                            }
                            /** @type {number} */
                            const n = parseInt(s + t, 8);
                            if (Number.isNaN(n)) {
                                return false;
                            }
                            b.push(n);
                            break;
                        }
                        case "x": {
                            /** @type {string} */
                            const s = input.c;
                            /** @type {(string|boolean)} */
                            const t = input.take(2);
                            if (t === false) {
                                return false;
                            }
                            /** @type {number} */
                            const n = parseInt(s + t, 16);
                            if (Number.isNaN(n)) {
                                return false;
                            }
                            b.push(n);
                            break;
                        }
                        case "u": {
                            /** @type {string} */
                            const s = input.c;
                            /** @type {(string|boolean)} */
                            const t = input.take(4);
                            if (t === false) {
                                return false;
                            }
                            /** @type {number} */
                            const n = parseInt(s + t, 16);
                            if (Number.isNaN(n)) {
                                return false;
                            }
                            /** @type {!Uint8Array} */
                            const chunk = new Uint8Array(4);
                            /** @type {!DataView} */
                            const view = new DataView(chunk.buffer);
                            view.setInt32(0, n, true);
                            b.push(chunk[0], chunk[1], chunk[2], chunk[3]);
                            break;
                        }
                        case "U": {
                            /** @type {string} */
                            const s = input.c;
                            /** @type {(string|boolean)} */
                            const t = input.take(8);
                            if (t === false) {
                                return false;
                            }
                            /** @type {{lo: number, hi: number}} */
                            const tc = proto_int64_js_1.protoInt64.uEnc(s + t);
                            /** @type {!Uint8Array} */
                            const chunk = new Uint8Array(8);
                            /** @type {!DataView} */
                            const view = new DataView(chunk.buffer);
                            view.setInt32(0, tc.lo, true);
                            view.setInt32(4, tc.hi, true);
                            b.push(chunk[0], chunk[1], chunk[2], chunk[3], chunk[4], chunk[5], chunk[6], chunk[7]);
                            break;
                        }
                    }
                }
                break;
            default:
                b.push(input.c.charCodeAt(0));
        }
    }
    return new Uint8Array(b);
}
