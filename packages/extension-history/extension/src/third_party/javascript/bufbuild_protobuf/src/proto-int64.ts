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
 * Generated from: third_party/javascript/bufbuild_protobuf/src/proto-int64.ts
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
goog.module('google3.third_party.javascript.bufbuild_protobuf.src.proto$2dint64');
var module = module || { id: 'third_party/javascript/bufbuild_protobuf/src/proto-int64.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_varint_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wire.varint");
const varint_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wire.varint');
/**
 * Int64Support for the current environment.
 * @type {!Int64Support}
 */
exports.protoInt64 = makeInt64Support();
/**
 * We use the `bigint` primitive to represent 64-bit integral types. If bigint
 * is unavailable, we fall back to a string representation, which means that
 * all values typed as `bigint` will actually be strings.
 *
 * If your code is intended to run in an environment where bigint may be
 * unavailable, it must handle both the bigint and the string representation.
 * For presenting values, this is straight-forward with implicit or explicit
 * conversion to string:
 *
 * ```ts
 * let el = document.createElement("span");
 * el.innerText = message.int64Field; // assuming a protobuf int64 field
 *
 * console.log(`int64: ${message.int64Field}`);
 *
 * let str: string = message.int64Field.toString();
 * ```
 *
 * If you need to manipulate 64-bit integral values and are sure the values
 * can be safely represented as an IEEE-754 double precision number, you can
 * convert to a JavaScript Number:
 *
 * ```ts
 * console.log(message.int64Field.toString())
 * let num = Number(message.int64Field);
 * num = num + 1;
 * message.int64Field = protoInt64.parse(num);
 * ```
 *
 * If you need to manipulate 64-bit integral values that are outside the
 * range of safe representation as a JavaScript Number, we recommend you
 * use a third party library, for example the npm package "long":
 *
 * ```ts
 * // convert the field value to a Long
 * const bits = protoInt64.enc(message.int64Field);
 * const longValue = Long.fromBits(bits.lo, bits.hi);
 *
 * // perform arithmetic
 * const longResult = longValue.subtract(1);
 *
 * // set the result in the field
 * message.int64Field = protoInt64.dec(longResult.low, longResult.high);
 *
 * // Assuming int64Field contains 9223372036854775807:
 * console.log(message.int64Field); // 9223372036854775806
 * ```
 * @record
 */
function Int64Support() { }
/* istanbul ignore if */
if (false) {
    /**
     * 0n if bigint is available, "0" if unavailable.
     * @const {bigint}
     * @public
     */
    Int64Support.prototype.zero;
    /**
     * Is bigint available?
     * @const {boolean}
     * @public
     */
    Int64Support.prototype.supported;
    /**
     * Parse a signed 64-bit integer.
     * Returns a bigint if available, a string otherwise.
     * @public
     * @param {(string|number|bigint)} value
     * @return {bigint}
     */
    Int64Support.prototype.parse = function (value) { };
    /**
     * Parse an unsigned 64-bit integer.
     * Returns a bigint if available, a string otherwise.
     * @public
     * @param {(string|number|bigint)} value
     * @return {bigint}
     */
    Int64Support.prototype.uParse = function (value) { };
    /**
     * Convert a signed 64-bit integral value to a two's complement.
     * @public
     * @param {(string|number|bigint)} value
     * @return {{lo: number, hi: number}}
     */
    Int64Support.prototype.enc = function (value) { };
    /**
     * Convert an unsigned 64-bit integral value to a two's complement.
     * @public
     * @param {(string|number|bigint)} value
     * @return {{lo: number, hi: number}}
     */
    Int64Support.prototype.uEnc = function (value) { };
    /**
     * Convert a two's complement to a signed 64-bit integral value.
     * Returns a bigint if available, a string otherwise.
     * @public
     * @param {number} lo
     * @param {number} hi
     * @return {bigint}
     */
    Int64Support.prototype.dec = function (lo, hi) { };
    /**
     * Convert a two's complement to an unsigned 64-bit integral value.
     * Returns a bigint if available, a string otherwise.
     * @public
     * @param {number} lo
     * @param {number} hi
     * @return {bigint}
     */
    Int64Support.prototype.uDec = function (lo, hi) { };
}
/**
 * @return {!Int64Support}
 */
function makeInt64Support() {
    /** @type {!DataView} */
    const dv = new DataView(new ArrayBuffer(8));
    // note that Safari 14 implements BigInt, but not the DataView methods
    /** @type {boolean} */
    const ok = typeof BigInt === "function" &&
        typeof dv.getBigInt64 === "function" &&
        typeof dv.getBigUint64 === "function" &&
        typeof dv.setBigInt64 === "function" &&
        typeof dv.setBigUint64 === "function" &&
        (!!((/** @type {{Deno: *}} */ (globalThis))).Deno ||
            typeof process != "object" ||
            typeof process.env != "object" ||
            process.env.BUF_BIGINT_DISABLE !== "1");
    if (ok) {
        /** @type {bigint} */
        const MIN = BigInt("-9223372036854775808");
        /** @type {bigint} */
        const MAX = BigInt("9223372036854775807");
        /** @type {bigint} */
        const UMIN = BigInt("0");
        /** @type {bigint} */
        const UMAX = BigInt("18446744073709551615");
        return {
            zero: BigInt(0),
            supported: true,
            /**
             * @public
             * @param {(string|number|bigint)} value
             * @return {bigint}
             */
            parse(value) {
                /** @type {bigint} */
                const bi = typeof value == "bigint" ? value : BigInt(value);
                if (bi > MAX || bi < MIN) {
                    throw new Error(`invalid int64: ${value}`);
                }
                return bi;
            },
            /**
             * @public
             * @param {(string|number|bigint)} value
             * @return {bigint}
             */
            uParse(value) {
                /** @type {bigint} */
                const bi = typeof value == "bigint" ? value : BigInt(value);
                if (bi > UMAX || bi < UMIN) {
                    throw new Error(`invalid uint64: ${value}`);
                }
                return bi;
            },
            /**
             * @public
             * @param {(string|number|bigint)} value
             * @return {{lo: number, hi: number}}
             */
            enc(value) {
                dv.setBigInt64(0, this.parse(value), true);
                return {
                    lo: dv.getInt32(0, true),
                    hi: dv.getInt32(4, true),
                };
            },
            /**
             * @public
             * @param {(string|number|bigint)} value
             * @return {{lo: number, hi: number}}
             */
            uEnc(value) {
                dv.setBigInt64(0, this.uParse(value), true);
                return {
                    lo: dv.getInt32(0, true),
                    hi: dv.getInt32(4, true),
                };
            },
            /**
             * @public
             * @param {number} lo
             * @param {number} hi
             * @return {bigint}
             */
            dec(lo, hi) {
                dv.setInt32(0, lo, true);
                dv.setInt32(4, hi, true);
                return dv.getBigInt64(0, true);
            },
            /**
             * @public
             * @param {number} lo
             * @param {number} hi
             * @return {bigint}
             */
            uDec(lo, hi) {
                dv.setInt32(0, lo, true);
                dv.setInt32(4, hi, true);
                return dv.getBigUint64(0, true);
            },
        };
    }
    return {
        zero: (/** @type {bigint} */ ((/** @type {*} */ ("0")))),
        supported: false,
        /**
         * @public
         * @param {(string|number|bigint)} value
         * @return {bigint}
         */
        parse(value) {
            if (typeof value != "string") {
                value = (/** @type {(number|bigint)} */ (value)).toString();
            }
            assertInt64String(value);
            return (/** @type {bigint} */ ((/** @type {*} */ (value))));
        },
        /**
         * @public
         * @param {(string|number|bigint)} value
         * @return {bigint}
         */
        uParse(value) {
            if (typeof value != "string") {
                value = (/** @type {(number|bigint)} */ (value)).toString();
            }
            assertUInt64String(value);
            return (/** @type {bigint} */ ((/** @type {*} */ (value))));
        },
        /**
         * @public
         * @param {(string|number|bigint)} value
         * @return {{lo: number, hi: number}}
         */
        enc(value) {
            if (typeof value != "string") {
                value = (/** @type {(number|bigint)} */ (value)).toString();
            }
            assertInt64String(value);
            return (0, varint_js_1.int64FromString)(value);
        },
        /**
         * @public
         * @param {(string|number|bigint)} value
         * @return {{lo: number, hi: number}}
         */
        uEnc(value) {
            if (typeof value != "string") {
                value = (/** @type {(number|bigint)} */ (value)).toString();
            }
            assertUInt64String(value);
            return (0, varint_js_1.int64FromString)(value);
        },
        /**
         * @public
         * @param {number} lo
         * @param {number} hi
         * @return {bigint}
         */
        dec(lo, hi) {
            return (/** @type {bigint} */ ((/** @type {*} */ ((0, varint_js_1.int64ToString)(lo, hi)))));
        },
        /**
         * @public
         * @param {number} lo
         * @param {number} hi
         * @return {bigint}
         */
        uDec(lo, hi) {
            return (/** @type {bigint} */ ((/** @type {*} */ ((0, varint_js_1.uInt64ToString)(lo, hi)))));
        },
    };
}
/**
 * @param {string} value
 * @return {void}
 */
function assertInt64String(value) {
    if (!/^-?[0-9]+$/.test(value)) {
        throw new Error("invalid int64: " + value);
    }
}
/**
 * @param {string} value
 * @return {void}
 */
function assertUInt64String(value) {
    if (!/^[0-9]+$/.test(value)) {
        throw new Error("invalid uint64: " + value);
    }
}
