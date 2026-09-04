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
 * Generated from: third_party/javascript/connectrpc_connect/src/protocol/envelope.ts
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
goog.module('google3.third_party.javascript.connectrpc_connect.src.protocol.envelope');
var module = module || { id: 'third_party/javascript/connectrpc_connect/src/protocol/envelope.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_connect_error_1 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.connect$2derror");
const tsickle_code_2 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.code");
const tsickle_compression_3 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.compression");
const tsickle_limit_io_4 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.limit$2dio");
const connect_error_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.connect$2derror');
const code_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.code');
const compression_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol.compression');
const limit_io_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol.limit$2dio');
/**
 * Represents an Enveloped-Message of the Connect protocol.
 * https://connectrpc.com/docs/protocol#streaming-rpcs
 *
 * @record
 */
function EnvelopedMessage() { }
exports.EnvelopedMessage = EnvelopedMessage;
/* istanbul ignore if */
if (false) {
    /**
     * Envelope-Flags, a set of 8 bitwise flags.
     * @type {number}
     * @public
     */
    EnvelopedMessage.prototype.flags;
    /**
     * Raw data of the message that was enveloped.
     * @type {!Uint8Array}
     * @public
     */
    EnvelopedMessage.prototype.data;
}
/**
 * Decodes chunks of raw bytes into enveloped messages.
 *
 * @typedef {{decode: function(!Uint8Array): !Array<!EnvelopedMessage>, byteLength: number, readMaxBytes: number}}
 */
exports.EnvelopeDecoder;
/**
 * Create an EnvelopeDecoder. The `readMaxBytes` argument limits the maximum
 * size for individual messages.
 *
 * @param {number} readMaxBytes
 * @return {{decode: function(!Uint8Array): !Array<!EnvelopedMessage>, byteLength: number, readMaxBytes: number}}
 */
function createEnvelopeDecoder(readMaxBytes) {
    return new EnvelopeDecoderImpl(readMaxBytes);
}
exports.createEnvelopeDecoder = createEnvelopeDecoder;
/**
 * tsickle: dropped implements: dropped implements of a type literal: EnvelopeDecoder
 */
class EnvelopeDecoderImpl {
    /**
     * @public
     * @param {number} readMaxBytes
     */
    constructor(readMaxBytes) {
        this.readMaxBytes = readMaxBytes;
        // Envelope headers are 5 bytes: 1 byte for flags, 4 bytes message length
        this.header = new Uint8Array(5);
        this.headerView = new DataView(this.header.buffer);
        this.buf = [];
    }
    /**
     * @public
     * @return {number}
     */
    get byteLength() {
        return this.buf.reduce((/**
         * @param {number} a
         * @param {!Uint8Array} b
         * @return {number}
         */
        (a, b) => a + b.byteLength), 0);
    }
    /**
     * @public
     * @param {!Uint8Array} chunk
     * @return {!Array<!EnvelopedMessage>}
     */
    decode(chunk) {
        this.buf.push(chunk);
        /** @type {!Array<!EnvelopedMessage>} */
        const envs = [];
        for (;;) {
            /** @type {(undefined|!EnvelopedMessage)} */
            let env = this.pop();
            if (!env) {
                break;
            }
            envs.push(env);
        }
        return envs;
    }
    // consume an enveloped message
    /**
     * @public
     * @return {(undefined|!EnvelopedMessage)}
     */
    pop() {
        if (!this.env) {
            this.env = this.head();
            if (!this.env) {
                return undefined;
            }
        }
        if (this.cons(this.env.data)) {
            /** @type {!EnvelopedMessage} */
            const env = this.env;
            this.env = undefined;
            return env;
        }
        return undefined;
    }
    // consume header
    /**
     * @public
     * @return {(undefined|!EnvelopedMessage)}
     */
    head() {
        if (!this.cons(this.header)) {
            return undefined;
        }
        /** @type {number} */
        const flags = this.headerView.getUint8(0);
        // first byte is flags
        /** @type {number} */
        const length = this.headerView.getUint32(1);
        // 4 bytes message length
        (0, limit_io_js_1.assertReadMaxBytes)(this.readMaxBytes, length, true);
        return {
            flags,
            data: new Uint8Array(length),
        };
    }
    // consume from buffer, fill target
    /**
     * @public
     * @param {!Uint8Array} target
     * @return {boolean}
     */
    cons(target) {
        /** @type {number} */
        const wantLength = target.byteLength;
        if (this.byteLength < wantLength) {
            return false;
        }
        /** @type {number} */
        let offset = 0;
        while (offset < wantLength) {
            /** @type {!Uint8Array} */
            const chunk = (/** @type {!Uint8Array} */ (this.buf.shift()));
            if (chunk.byteLength > wantLength - offset) {
                target.set(chunk.subarray(0, wantLength - offset), offset);
                this.buf.unshift(chunk.subarray(wantLength - offset));
                offset += wantLength - offset;
            }
            else {
                target.set(chunk, offset);
                offset += chunk.byteLength;
            }
        }
        return true;
    }
}
/* istanbul ignore if */
if (false) {
    /**
     * @const {!Uint8Array}
     * @private
     */
    EnvelopeDecoderImpl.prototype.header;
    /**
     * @const {!DataView}
     * @private
     */
    EnvelopeDecoderImpl.prototype.headerView;
    /**
     * @const {!Array<!Uint8Array>}
     * @private
     */
    EnvelopeDecoderImpl.prototype.buf;
    /**
     * @type {(undefined|!EnvelopedMessage)}
     * @private
     */
    EnvelopeDecoderImpl.prototype.env;
    /**
     * @const {number}
     * @public
     */
    EnvelopeDecoderImpl.prototype.readMaxBytes;
}
/**
 * Create a WHATWG ReadableStream of enveloped messages from a ReadableStream
 * of bytes.
 *
 * Ideally, this would simply be a TransformStream, but ReadableStream.pipeThrough
 * does not have the necessary availability at this time.
 *
 * @param {!ReadableStream<!Uint8Array>} stream
 * @return {!ReadableStream<!EnvelopedMessage>}
 */
function createEnvelopeReadableStream(stream) {
    /** @type {!ReadableStreamDefaultReader<!Uint8Array>} */
    let reader;
    /** @type {{decode: function(!Uint8Array): !Array<!EnvelopedMessage>, byteLength: number, readMaxBytes: number}} */
    const buffer = createEnvelopeDecoder(0xffffffff);
    return new ReadableStream({
        /**
         * @public
         * @return {void}
         */
        start() {
            reader = stream.getReader();
        },
        /**
         * @public
         * @param {!ReadableStreamDefaultController<!EnvelopedMessage>} controller
         * @return {!Promise<void>}
         */
        async pull(controller) {
            /** @type {boolean} */
            let enqueuedOnce = false;
            while (!enqueuedOnce) {
                /** @type {(!ReadableStreamReadValueResult<!Uint8Array>|!ReadableStreamReadDoneResult<!Uint8Array>)} */
                const result = await reader.read();
                if (result.done) {
                    if (buffer.byteLength > 0) {
                        controller.error(new connect_error_js_1.ConnectError("protocol error: incomplete envelope", code_js_1.Code.InvalidArgument));
                    }
                    controller.close();
                }
                else {
                    for (const env of buffer.decode((/** @type {!ReadableStreamReadValueResult<!Uint8Array>} */ (result)).value)) {
                        controller.enqueue(env);
                        enqueuedOnce = true;
                    }
                }
            }
        },
    });
}
exports.createEnvelopeReadableStream = createEnvelopeReadableStream;
/**
 * Compress an EnvelopedMessage.
 *
 * Raises Internal if an enveloped message is already compressed.
 *
 * @param {!EnvelopedMessage} envelope
 * @param {(null|!tsickle_compression_3.Compression)} compression
 * @param {number} compressMinBytes
 * @return {!Promise<!EnvelopedMessage>}
 */
async function envelopeCompress(envelope, compression, compressMinBytes) {
    let { flags, data } = envelope;
    if ((flags & compression_js_1.compressedFlag) === compression_js_1.compressedFlag) {
        throw new connect_error_js_1.ConnectError("invalid envelope, already compressed", code_js_1.Code.Internal);
    }
    if (compression && data.byteLength >= compressMinBytes) {
        data = await compression.compress(data);
        flags = flags | compression_js_1.compressedFlag;
    }
    return { data, flags };
}
exports.envelopeCompress = envelopeCompress;
/**
 * Decompress an EnvelopedMessage.
 *
 * Raises InvalidArgument if an envelope is compressed, but compression is null.
 *
 * Relies on the provided Compression to raise ResourceExhausted if the
 * *decompressed* message size is larger than readMaxBytes. If the envelope is
 * not compressed, readMaxBytes is not honored.
 *
 * @param {!EnvelopedMessage} envelope
 * @param {(null|!tsickle_compression_3.Compression)} compression
 * @param {number} readMaxBytes
 * @return {!Promise<!EnvelopedMessage>}
 */
async function envelopeDecompress(envelope, compression, readMaxBytes) {
    let { flags, data } = envelope;
    if ((flags & compression_js_1.compressedFlag) === compression_js_1.compressedFlag) {
        if (!compression) {
            throw new connect_error_js_1.ConnectError("received compressed envelope, but do not know how to decompress", code_js_1.Code.Internal);
        }
        data = await compression.decompress(data, readMaxBytes);
        flags = flags ^ compression_js_1.compressedFlag;
    }
    return { data, flags };
}
exports.envelopeDecompress = envelopeDecompress;
/**
 * Encode a single enveloped message.
 *
 * @param {number} flags
 * @param {!Uint8Array} data
 * @return {!Uint8Array}
 */
function encodeEnvelope(flags, data) {
    /** @type {!Uint8Array} */
    const bytes = new Uint8Array(data.length + 5);
    bytes.set(data, 5);
    /** @type {!DataView} */
    const v = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    v.setUint8(0, flags); // first byte is flags
    // first byte is flags
    v.setUint32(1, data.length); // 4 bytes message length
    return bytes;
}
exports.encodeEnvelope = encodeEnvelope;
/**
 * Encode a set of enveloped messages.
 *
 * @param {...!EnvelopedMessage} envelopes
 * @return {!Uint8Array}
 */
function encodeEnvelopes(...envelopes) {
    /** @type {number} */
    const len = envelopes.reduce((/**
     * @param {number} previousValue
     * @param {!EnvelopedMessage} currentValue
     * @return {number}
     */
    (previousValue, currentValue) => previousValue + currentValue.data.length + 5), 0);
    /** @type {!Uint8Array} */
    const bytes = new Uint8Array(len);
    /** @type {!DataView} */
    const v = new DataView(bytes.buffer);
    /** @type {number} */
    let offset = 0;
    for (const e of envelopes) {
        v.setUint8(offset, e.flags); // first byte is flags
        // first byte is flags
        v.setUint32(offset + 1, e.data.length); // 4 bytes message length
        // 4 bytes message length
        bytes.set(e.data, offset + 5);
        offset += e.data.length + 5;
    }
    return bytes;
}
exports.encodeEnvelopes = encodeEnvelopes;
