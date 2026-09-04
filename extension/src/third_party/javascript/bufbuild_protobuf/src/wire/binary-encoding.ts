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
 * Generated from: third_party/javascript/bufbuild_protobuf/src/wire/binary-encoding.ts
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
goog.module('google3.third_party.javascript.bufbuild_protobuf.src.wire.binary$2dencoding');
var module = module || { id: 'third_party/javascript/bufbuild_protobuf/src/wire/binary-encoding.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_varint_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wire.varint");
const tsickle_proto_int64_2 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.proto$2dint64");
const tsickle_text_encoding_3 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wire.text$2dencoding");
const varint_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wire.varint');
const proto_int64_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.proto$2dint64');
const text_encoding_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wire.text$2dencoding');
/**
 * Protobuf binary format wire types.
 *
 * A wire type provides just enough information to find the length of the
 * following value.
 *
 * See https://developers.google.com/protocol-buffers/docs/encoding#structure
 * @enum {number}
 */
const WireType = {
    /**
     * Used for int32, int64, uint32, uint64, sint32, sint64, bool, enum
     */
    Varint: 0,
    /**
     * Used for fixed64, sfixed64, double.
     * Always 8 bytes with little-endian byte order.
     */
    Bit64: 1,
    /**
     * Used for string, bytes, embedded messages, packed repeated fields
     *
     * Only repeated numeric types (types which use the varint, 32-bit,
     * or 64-bit wire types) can be packed. In proto3, such fields are
     * packed by default.
     */
    LengthDelimited: 2,
    /**
     * Start of a tag-delimited aggregate, such as a proto2 group, or a message
     * in editions with message_encoding = DELIMITED.
     */
    StartGroup: 3,
    /**
     * End of a tag-delimited aggregate.
     */
    EndGroup: 4,
    /**
     * Used for fixed32, sfixed32, float.
     * Always 4 bytes with little-endian byte order.
     */
    Bit32: 5,
};
exports.WireType = WireType;
WireType[WireType.Varint] = 'Varint';
WireType[WireType.Bit64] = 'Bit64';
WireType[WireType.LengthDelimited] = 'LengthDelimited';
WireType[WireType.StartGroup] = 'StartGroup';
WireType[WireType.EndGroup] = 'EndGroup';
WireType[WireType.Bit32] = 'Bit32';
/**
 * Maximum value for a 32-bit floating point value (Protobuf FLOAT).
 * @type {number}
 */
exports.FLOAT32_MAX = 3.4028234663852886e38;
/**
 * Minimum value for a 32-bit floating point value (Protobuf FLOAT).
 * @type {number}
 */
exports.FLOAT32_MIN = -3.4028234663852886e38;
/**
 * Maximum value for an unsigned 32-bit integer (Protobuf UINT32, FIXED32).
 * @type {number}
 */
exports.UINT32_MAX = 0xffffffff;
/**
 * Maximum value for a signed 32-bit integer (Protobuf INT32, SFIXED32, SINT32).
 * @type {number}
 */
exports.INT32_MAX = 0x7fffffff;
/**
 * Minimum value for a signed 32-bit integer (Protobuf INT32, SFIXED32, SINT32).
 * @type {number}
 */
exports.INT32_MIN = -0x80000000;
class BinaryWriter {
    /**
     * @public
     * @param {function(string): !Uint8Array=} encodeUtf8
     */
    constructor(encodeUtf8 = (0, text_encoding_js_1.getTextEncoding)().encodeUtf8) {
        this.encodeUtf8 = encodeUtf8;
        /**
         * Previous fork states.
         */
        this.stack = [];
        this.chunks = [];
        this.buf = [];
    }
    /**
     * Return all bytes written and reset this writer.
     * @public
     * @return {!Uint8Array}
     */
    finish() {
        if (this.buf.length) {
            this.chunks.push(new Uint8Array(this.buf)); // flush the buffer
            // flush the buffer
            this.buf = [];
        }
        /** @type {number} */
        let len = 0;
        for (let i = 0; i < this.chunks.length; i++)
            len += this.chunks[i].length;
        /** @type {!Uint8Array} */
        let bytes = new Uint8Array(len);
        /** @type {number} */
        let offset = 0;
        for (let i = 0; i < this.chunks.length; i++) {
            bytes.set(this.chunks[i], offset);
            offset += this.chunks[i].length;
        }
        this.chunks = [];
        return bytes;
    }
    /**
     * Start a new fork for length-delimited data like a message
     * or a packed repeated field.
     *
     * Must be joined later with `join()`.
     * @public
     * @template THIS
     * @this {THIS}
     * @return {THIS}
     */
    fork() {
        (/** @type {!BinaryWriter} */ (this)).stack.push({ chunks: (/** @type {!BinaryWriter} */ (this)).chunks, buf: (/** @type {!BinaryWriter} */ (this)).buf });
        (/** @type {!BinaryWriter} */ (this)).chunks = [];
        (/** @type {!BinaryWriter} */ (this)).buf = [];
        return (/** @type {!BinaryWriter} */ (this));
    }
    /**
     * Join the last fork. Write its length and bytes, then
     * return to the previous state.
     * @public
     * @template THIS
     * @this {THIS}
     * @return {THIS}
     */
    join() {
        // get chunk of fork
        /** @type {!Uint8Array} */
        let chunk = (/** @type {!BinaryWriter} */ (this)).finish();
        // restore previous state
        /** @type {(undefined|{chunks: !Array<!Uint8Array>, buf: !Array<number>})} */
        let prev = (/** @type {!BinaryWriter} */ (this)).stack.pop();
        if (!prev)
            throw new Error("invalid state, fork stack empty");
        (/** @type {!BinaryWriter} */ (this)).chunks = prev.chunks;
        (/** @type {!BinaryWriter} */ (this)).buf = prev.buf;
        // write length of chunk as varint
        (/** @type {!BinaryWriter} */ (this)).uint32(chunk.byteLength);
        return (/** @type {!BinaryWriter} */ (this)).raw(chunk);
    }
    /**
     * Writes a tag (field number and wire type).
     *
     * Equivalent to `uint32( (fieldNo << 3 | type) >>> 0 )`.
     *
     * Generated code should compute the tag ahead of time and call `uint32()`.
     * @public
     * @template THIS
     * @this {THIS}
     * @param {number} fieldNo
     * @param {!WireType} type
     * @return {THIS}
     */
    tag(fieldNo, type) {
        return (/** @type {!BinaryWriter} */ (this)).uint32(((fieldNo << 3) | type) >>> 0);
    }
    /**
     * Write a chunk of raw bytes.
     * @public
     * @template THIS
     * @this {THIS}
     * @param {!Uint8Array} chunk
     * @return {THIS}
     */
    raw(chunk) {
        if ((/** @type {!BinaryWriter} */ (this)).buf.length) {
            (/** @type {!BinaryWriter} */ (this)).chunks.push(new Uint8Array((/** @type {!BinaryWriter} */ (this)).buf));
            (/** @type {!BinaryWriter} */ (this)).buf = [];
        }
        (/** @type {!BinaryWriter} */ (this)).chunks.push(chunk);
        return (/** @type {!BinaryWriter} */ (this));
    }
    /**
     * Write a `uint32` value, an unsigned 32 bit varint.
     * @public
     * @template THIS
     * @this {THIS}
     * @param {number} value
     * @return {THIS}
     */
    uint32(value) {
        assertUInt32(value);
        // write value as varint 32, inlined for speed
        while (value > 0x7f) {
            (/** @type {!BinaryWriter} */ (this)).buf.push((value & 0x7f) | 0x80);
            value = value >>> 7;
        }
        (/** @type {!BinaryWriter} */ (this)).buf.push(value);
        return (/** @type {!BinaryWriter} */ (this));
    }
    /**
     * Write a `int32` value, a signed 32 bit varint.
     * @public
     * @template THIS
     * @this {THIS}
     * @param {number} value
     * @return {THIS}
     */
    int32(value) {
        assertInt32(value);
        (0, varint_js_1.varint32write)(value, (/** @type {!BinaryWriter} */ (this)).buf);
        return (/** @type {!BinaryWriter} */ (this));
    }
    /**
     * Write a `bool` value, a variant.
     * @public
     * @template THIS
     * @this {THIS}
     * @param {boolean} value
     * @return {THIS}
     */
    bool(value) {
        (/** @type {!BinaryWriter} */ (this)).buf.push(value ? 1 : 0);
        return (/** @type {!BinaryWriter} */ (this));
    }
    /**
     * Write a `bytes` value, length-delimited arbitrary data.
     * @public
     * @template THIS
     * @this {THIS}
     * @param {!Uint8Array} value
     * @return {THIS}
     */
    bytes(value) {
        (/** @type {!BinaryWriter} */ (this)).uint32(value.byteLength); // write length of chunk as varint
        return (/** @type {!BinaryWriter} */ (this)).raw(value);
    }
    /**
     * Write a `string` value, length-delimited data converted to UTF-8 text.
     * @public
     * @template THIS
     * @this {THIS}
     * @param {string} value
     * @return {THIS}
     */
    string(value) {
        /** @type {!Uint8Array} */
        let chunk = (/** @type {!BinaryWriter} */ (this)).encodeUtf8(value);
        (/** @type {!BinaryWriter} */ (this)).uint32(chunk.byteLength); // write length of chunk as varint
        return (/** @type {!BinaryWriter} */ (this)).raw(chunk);
    }
    /**
     * Write a `float` value, 32-bit floating point number.
     * @public
     * @template THIS
     * @this {THIS}
     * @param {number} value
     * @return {THIS}
     */
    float(value) {
        assertFloat32(value);
        /** @type {!Uint8Array} */
        let chunk = new Uint8Array(4);
        new DataView(chunk.buffer).setFloat32(0, value, true);
        return (/** @type {!BinaryWriter} */ (this)).raw(chunk);
    }
    /**
     * Write a `double` value, a 64-bit floating point number.
     * @public
     * @template THIS
     * @this {THIS}
     * @param {number} value
     * @return {THIS}
     */
    double(value) {
        /** @type {!Uint8Array} */
        let chunk = new Uint8Array(8);
        new DataView(chunk.buffer).setFloat64(0, value, true);
        return (/** @type {!BinaryWriter} */ (this)).raw(chunk);
    }
    /**
     * Write a `fixed32` value, an unsigned, fixed-length 32-bit integer.
     * @public
     * @template THIS
     * @this {THIS}
     * @param {number} value
     * @return {THIS}
     */
    fixed32(value) {
        assertUInt32(value);
        /** @type {!Uint8Array} */
        let chunk = new Uint8Array(4);
        new DataView(chunk.buffer).setUint32(0, value, true);
        return (/** @type {!BinaryWriter} */ (this)).raw(chunk);
    }
    /**
     * Write a `sfixed32` value, a signed, fixed-length 32-bit integer.
     * @public
     * @template THIS
     * @this {THIS}
     * @param {number} value
     * @return {THIS}
     */
    sfixed32(value) {
        assertInt32(value);
        /** @type {!Uint8Array} */
        let chunk = new Uint8Array(4);
        new DataView(chunk.buffer).setInt32(0, value, true);
        return (/** @type {!BinaryWriter} */ (this)).raw(chunk);
    }
    /**
     * Write a `sint32` value, a signed, zigzag-encoded 32-bit varint.
     * @public
     * @template THIS
     * @this {THIS}
     * @param {number} value
     * @return {THIS}
     */
    sint32(value) {
        assertInt32(value);
        // zigzag encode
        value = ((value << 1) ^ (value >> 31)) >>> 0;
        (0, varint_js_1.varint32write)(value, (/** @type {!BinaryWriter} */ (this)).buf);
        return (/** @type {!BinaryWriter} */ (this));
    }
    /**
     * Write a `fixed64` value, a signed, fixed-length 64-bit integer.
     * @public
     * @template THIS
     * @this {THIS}
     * @param {(string|number|bigint)} value
     * @return {THIS}
     */
    sfixed64(value) {
        /** @type {!Uint8Array} */
        let chunk = new Uint8Array(8);
        /** @type {!DataView} */
        let view = new DataView(chunk.buffer);
        /** @type {{lo: number, hi: number}} */
        let tc = proto_int64_js_1.protoInt64.enc(value);
        view.setInt32(0, tc.lo, true);
        view.setInt32(4, tc.hi, true);
        return (/** @type {!BinaryWriter} */ (this)).raw(chunk);
    }
    /**
     * Write a `fixed64` value, an unsigned, fixed-length 64 bit integer.
     * @public
     * @template THIS
     * @this {THIS}
     * @param {(string|number|bigint)} value
     * @return {THIS}
     */
    fixed64(value) {
        /** @type {!Uint8Array} */
        let chunk = new Uint8Array(8);
        /** @type {!DataView} */
        let view = new DataView(chunk.buffer);
        /** @type {{lo: number, hi: number}} */
        let tc = proto_int64_js_1.protoInt64.uEnc(value);
        view.setInt32(0, tc.lo, true);
        view.setInt32(4, tc.hi, true);
        return (/** @type {!BinaryWriter} */ (this)).raw(chunk);
    }
    /**
     * Write a `int64` value, a signed 64-bit varint.
     * @public
     * @template THIS
     * @this {THIS}
     * @param {(string|number|bigint)} value
     * @return {THIS}
     */
    int64(value) {
        /** @type {{lo: number, hi: number}} */
        let tc = proto_int64_js_1.protoInt64.enc(value);
        (0, varint_js_1.varint64write)(tc.lo, tc.hi, (/** @type {!BinaryWriter} */ (this)).buf);
        return (/** @type {!BinaryWriter} */ (this));
    }
    /**
     * Write a `sint64` value, a signed, zig-zag-encoded 64-bit varint.
     * @public
     * @template THIS
     * @this {THIS}
     * @param {(string|number|bigint)} value
     * @return {THIS}
     */
    sint64(value) {
        /** @type {{lo: number, hi: number}} */
        const tc = proto_int64_js_1.protoInt64.enc(value);
        /** @type {number} */
        const sign = tc.hi >> 31;
        /** @type {number} */
        const lo = (tc.lo << 1) ^ sign;
        /** @type {number} */
        const hi = ((tc.hi << 1) | (tc.lo >>> 31)) ^ sign;
        (0, varint_js_1.varint64write)(lo, hi, (/** @type {!BinaryWriter} */ (this)).buf);
        return (/** @type {!BinaryWriter} */ (this));
    }
    /**
     * Write a `uint64` value, an unsigned 64-bit varint.
     * @public
     * @template THIS
     * @this {THIS}
     * @param {(string|number|bigint)} value
     * @return {THIS}
     */
    uint64(value) {
        /** @type {{lo: number, hi: number}} */
        const tc = proto_int64_js_1.protoInt64.uEnc(value);
        (0, varint_js_1.varint64write)(tc.lo, tc.hi, (/** @type {!BinaryWriter} */ (this)).buf);
        return (/** @type {!BinaryWriter} */ (this));
    }
}
exports.BinaryWriter = BinaryWriter;
/* istanbul ignore if */
if (false) {
    /**
     * We cannot allocate a buffer for the entire output
     * because we don't know it's size.
     *
     * So we collect smaller chunks of known size and
     * concat them later.
     *
     * Use `raw()` to push data to this array. It will flush
     * `buf` first.
     * @type {!Array<!Uint8Array>}
     * @private
     */
    BinaryWriter.prototype.chunks;
    /**
     * A growing buffer for byte values. If you don't know
     * the size of the data you are writing, push to this
     * array.
     * @type {!Array<number>}
     * @protected
     */
    BinaryWriter.prototype.buf;
    /**
     * Previous fork states.
     * @type {!Array<{chunks: !Array<!Uint8Array>, buf: !Array<number>}>}
     * @private
     */
    BinaryWriter.prototype.stack;
    /**
     * @const {function(string): !Uint8Array}
     * @private
     */
    BinaryWriter.prototype.encodeUtf8;
}
class BinaryReader {
    /**
     * @public
     * @param {!Uint8Array} buf
     * @param {function(!Uint8Array): string=} decodeUtf8
     */
    constructor(buf, decodeUtf8 = (0, text_encoding_js_1.getTextEncoding)().decodeUtf8) {
        this.decodeUtf8 = decodeUtf8;
        this.varint64 = (/** @type {function(): !Array<?>} */ (varint_js_1.varint64read)); // dirty cast for `this`
        /**
         * Read a `uint32` field, an unsigned 32 bit varint.
         */
        this.uint32 = varint_js_1.varint32read;
        this.buf = buf;
        this.len = buf.length;
        this.pos = 0;
        this.view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    }
    /**
     * Reads a tag - field number and wire type.
     * @public
     * @return {!Array<?>}
     */
    tag() {
        /** @type {number} */
        let tag = this.uint32();
        /** @type {number} */
        let fieldNo = tag >>> 3;
        /** @type {number} */
        let wireType = tag & 7;
        if (fieldNo <= 0 || wireType < 0 || wireType > 5)
            throw new Error("illegal tag: field no " + fieldNo + " wire type " + wireType);
        return [fieldNo, wireType];
    }
    /**
     * Skip one element and return the skipped data.
     *
     * When skipping StartGroup, provide the tags field number to check for
     * matching field number in the EndGroup tag.
     * @public
     * @param {!WireType} wireType
     * @param {(undefined|number)=} fieldNo
     * @return {!Uint8Array}
     */
    skip(wireType, fieldNo) {
        /** @type {number} */
        let start = this.pos;
        switch (wireType) {
            case WireType.Varint:
                while (this.buf[this.pos++] & 0x80) {
                    // ignore
                }
                break;
            // @ts-ignore TS7029: Fallthrough case in switch -- ignore instead of expect-error for compiler settings without noFallthroughCasesInSwitch: true
            case WireType.Bit64:
                this.pos += 4;
            case WireType.Bit32:
                this.pos += 4;
                break;
            case WireType.LengthDelimited:
                /** @type {number} */
                let len = this.uint32();
                this.pos += len;
                break;
            case WireType.StartGroup:
                for (;;) {
                    const [fn__tsickle_destructured_1, wt__tsickle_destructured_2] = this.tag();
                    const fn = /** @type {number} */ (fn__tsickle_destructured_1);
                    const wt = /** @type {!WireType} */ (wt__tsickle_destructured_2);
                    if (wt === WireType.EndGroup) {
                        if (fieldNo !== undefined && fn !== fieldNo) {
                            throw new Error("invalid end group tag");
                        }
                        break;
                    }
                    this.skip(wt, fn);
                }
                break;
            default:
                throw new Error("cant skip wire type " + wireType);
        }
        this.assertBounds();
        return this.buf.subarray(start, this.pos);
    }
    // dirty cast for `this`
    /**
     * Throws error if position in byte array is out of range.
     * @protected
     * @return {void}
     */
    assertBounds() {
        if (this.pos > this.len)
            throw new RangeError("premature EOF");
    }
    /**
     * Read a `int32` field, a signed 32 bit varint.
     * @public
     * @return {number}
     */
    int32() {
        return this.uint32() | 0;
    }
    /**
     * Read a `sint32` field, a signed, zigzag-encoded 32-bit varint.
     * @public
     * @return {number}
     */
    sint32() {
        /** @type {number} */
        let zze = this.uint32();
        // decode zigzag
        return (zze >>> 1) ^ -(zze & 1);
    }
    /**
     * Read a `int64` field, a signed 64-bit varint.
     * @public
     * @return {(string|bigint)}
     */
    int64() {
        return proto_int64_js_1.protoInt64.dec(...this.varint64());
    }
    /**
     * Read a `uint64` field, an unsigned 64-bit varint.
     * @public
     * @return {(string|bigint)}
     */
    uint64() {
        return proto_int64_js_1.protoInt64.uDec(...this.varint64());
    }
    /**
     * Read a `sint64` field, a signed, zig-zag-encoded 64-bit varint.
     * @public
     * @return {(string|bigint)}
     */
    sint64() {
        let [lo__tsickle_destructured_3, hi__tsickle_destructured_4] = this.varint64();
        let lo = /** @type {number} */ (lo__tsickle_destructured_3);
        let hi = /** @type {number} */ (hi__tsickle_destructured_4);
        // decode zig zag
        /** @type {number} */
        let s = -(lo & 1);
        lo = ((lo >>> 1) | ((hi & 1) << 31)) ^ s;
        hi = (hi >>> 1) ^ s;
        return proto_int64_js_1.protoInt64.dec(lo, hi);
    }
    /**
     * Read a `bool` field, a variant.
     * @public
     * @return {boolean}
     */
    bool() {
        let [lo__tsickle_destructured_5, hi__tsickle_destructured_6] = this.varint64();
        let lo = /** @type {number} */ (lo__tsickle_destructured_5);
        let hi = /** @type {number} */ (hi__tsickle_destructured_6);
        return lo !== 0 || hi !== 0;
    }
    /**
     * Read a `fixed32` field, an unsigned, fixed-length 32-bit integer.
     * @public
     * @return {number}
     */
    fixed32() {
        // biome-ignore lint/suspicious/noAssignInExpressions: no
        return this.view.getUint32((this.pos += 4) - 4, true);
    }
    /**
     * Read a `sfixed32` field, a signed, fixed-length 32-bit integer.
     * @public
     * @return {number}
     */
    sfixed32() {
        // biome-ignore lint/suspicious/noAssignInExpressions: no
        return this.view.getInt32((this.pos += 4) - 4, true);
    }
    /**
     * Read a `fixed64` field, an unsigned, fixed-length 64 bit integer.
     * @public
     * @return {(string|bigint)}
     */
    fixed64() {
        return proto_int64_js_1.protoInt64.uDec(this.sfixed32(), this.sfixed32());
    }
    /**
     * Read a `fixed64` field, a signed, fixed-length 64-bit integer.
     * @public
     * @return {(string|bigint)}
     */
    sfixed64() {
        return proto_int64_js_1.protoInt64.dec(this.sfixed32(), this.sfixed32());
    }
    /**
     * Read a `float` field, 32-bit floating point number.
     * @public
     * @return {number}
     */
    float() {
        // biome-ignore lint/suspicious/noAssignInExpressions: no
        return this.view.getFloat32((this.pos += 4) - 4, true);
    }
    /**
     * Read a `double` field, a 64-bit floating point number.
     * @public
     * @return {number}
     */
    double() {
        // biome-ignore lint/suspicious/noAssignInExpressions: no
        return this.view.getFloat64((this.pos += 8) - 8, true);
    }
    /**
     * Read a `bytes` field, length-delimited arbitrary data.
     * @public
     * @return {!Uint8Array}
     */
    bytes() {
        /** @type {number} */
        let len = this.uint32();
        /** @type {number} */
        let start = this.pos;
        this.pos += len;
        this.assertBounds();
        return this.buf.subarray(start, start + len);
    }
    /**
     * Read a `string` field, length-delimited data converted to UTF-8 text.
     * @public
     * @return {string}
     */
    string() {
        return this.decodeUtf8(this.bytes());
    }
}
exports.BinaryReader = BinaryReader;
/* istanbul ignore if */
if (false) {
    /**
     * Current position.
     * @type {number}
     * @public
     */
    BinaryReader.prototype.pos;
    /**
     * Number of bytes available in this reader.
     * @const {number}
     * @public
     */
    BinaryReader.prototype.len;
    /**
     * @const {!Uint8Array}
     * @protected
     */
    BinaryReader.prototype.buf;
    /**
     * @const {!DataView}
     * @private
     */
    BinaryReader.prototype.view;
    /**
     * @type {function(): !Array<?>}
     * @protected
     */
    BinaryReader.prototype.varint64;
    /**
     * Read a `uint32` field, an unsigned 32 bit varint.
     * @type {function(): number}
     * @public
     */
    BinaryReader.prototype.uint32;
    /**
     * @const {function(!Uint8Array): string}
     * @private
     */
    BinaryReader.prototype.decodeUtf8;
}
/**
 * Assert a valid signed protobuf 32-bit integer as a number or string.
 * @param {*} arg
 * @return {void}
 */
function assertInt32(arg) {
    if (typeof arg == "string") {
        arg = Number(arg);
    }
    else if (typeof arg != "number") {
        throw new Error("invalid int32: " + typeof arg);
    }
    if (!Number.isInteger(arg) ||
        ((/** @type {number} */ (arg))) > exports.INT32_MAX ||
        ((/** @type {number} */ (arg))) < exports.INT32_MIN)
        throw new Error("invalid int32: " + arg);
}
/**
 * Assert a valid unsigned protobuf 32-bit integer as a number or string.
 * @param {*} arg
 * @return {void}
 */
function assertUInt32(arg) {
    if (typeof arg == "string") {
        arg = Number(arg);
    }
    else if (typeof arg != "number") {
        throw new Error("invalid uint32: " + typeof arg);
    }
    if (!Number.isInteger(arg) ||
        ((/** @type {number} */ (arg))) > exports.UINT32_MAX ||
        ((/** @type {number} */ (arg))) < 0)
        throw new Error("invalid uint32: " + arg);
}
/**
 * Assert a valid protobuf float value as a number or string.
 * @param {*} arg
 * @return {void}
 */
function assertFloat32(arg) {
    if (typeof arg == "string") {
        /** @type {string} */
        const o = arg;
        arg = Number(arg);
        if (Number.isNaN((/** @type {number} */ (arg))) && o !== "NaN") {
            throw new Error("invalid float32: " + o);
        }
    }
    else if (typeof arg != "number") {
        throw new Error("invalid float32: " + typeof arg);
    }
    if (Number.isFinite(arg) &&
        (((/** @type {number} */ (arg))) > exports.FLOAT32_MAX || ((/** @type {number} */ (arg))) < exports.FLOAT32_MIN))
        throw new Error("invalid float32: " + arg);
}
