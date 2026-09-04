/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/antigravity/src/vs/base/common/buffer.ts
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
goog.module('google3.third_party.antigravity.src.vs.base.common.buffer');
var module = module || { id: 'third_party/antigravity/src/vs/base/common/buffer.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_lazy_1 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.lazy");
const tsickle_stream_2 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.stream");
const lazy_1 = goog.require('google3.third_party.antigravity.src.vs.base.common.lazy');
const streams = goog.require('google3.third_party.antigravity.src.vs.base.common.stream');
/**
 * @record
 */
function NodeBuffer() { }
/* istanbul ignore if */
if (false) {
    /**
     * @public
     * @param {number} size
     * @return {!Uint8Array}
     */
    NodeBuffer.prototype.allocUnsafe = function (size) { };
    /**
     * @public
     * @param {*} obj
     * @return {boolean}
     */
    NodeBuffer.prototype.isBuffer = function (obj) { };
    /**
     * @public
     * @param {!ArrayBuffer} arrayBuffer
     * @param {(undefined|number)=} byteOffset
     * @param {(undefined|number)=} length
     * @return {!Uint8Array}
     */
    NodeBuffer.prototype.from = function (arrayBuffer, byteOffset, length) { };
    /**
     * @public
     * @param {string} data
     * @return {!Uint8Array}
     */
    NodeBuffer.prototype.from = function (data) { };
}
/** @type {boolean} */
const hasBuffer = (typeof Buffer !== 'undefined');
/** @type {!tsickle_lazy_1.Lazy<!Uint8Array>} */
const indexOfTable = new lazy_1.Lazy((/**
 * @return {!Uint8Array}
 */
() => new Uint8Array(256)));
/** @type {(null|{encode: function(string): !Uint8Array})} */
let textEncoder;
/** @type {(null|{decode: function(!Uint8Array): string})} */
let textDecoder;
class VSBuffer {
    /**
     * When running in a nodejs context, the backing store for the returned `VSBuffer` instance
     * might use a nodejs Buffer allocated from node's Buffer pool, which is not transferrable.
     * @public
     * @param {number} byteLength
     * @return {!VSBuffer}
     */
    static alloc(byteLength) {
        if (hasBuffer) {
            return new VSBuffer(Buffer.allocUnsafe(byteLength));
        }
        else {
            return new VSBuffer(new Uint8Array(byteLength));
        }
    }
    /**
     * When running in a nodejs context, if `actual` is not a nodejs Buffer, the backing store for
     * the returned `VSBuffer` instance might use a nodejs Buffer allocated from node's Buffer pool,
     * which is not transferrable.
     * @public
     * @param {!Uint8Array} actual
     * @return {!VSBuffer}
     */
    static wrap(actual) {
        if (hasBuffer && !(Buffer.isBuffer(actual))) {
            // https://nodejs.org/dist/latest-v10.x/docs/api/buffer.html#buffer_class_method_buffer_from_arraybuffer_byteoffset_length
            // Create a zero-copy Buffer wrapper around the ArrayBuffer pointed to by the Uint8Array
            actual = Buffer.from(actual.buffer, actual.byteOffset, actual.byteLength);
        }
        return new VSBuffer(actual);
    }
    /**
     * When running in a nodejs context, the backing store for the returned `VSBuffer` instance
     * might use a nodejs Buffer allocated from node's Buffer pool, which is not transferrable.
     * @public
     * @param {string} source
     * @param {(undefined|{dontUseNodeBuffer: (undefined|boolean)})=} options
     * @return {!VSBuffer}
     */
    static fromString(source, options) {
        /** @type {boolean} */
        const dontUseNodeBuffer = options?.dontUseNodeBuffer || false;
        if (!dontUseNodeBuffer && hasBuffer) {
            return new VSBuffer(Buffer.from(source));
        }
        else {
            if (!textEncoder) {
                textEncoder = new TextEncoder();
            }
            return new VSBuffer(textEncoder.encode(source));
        }
    }
    /**
     * When running in a nodejs context, the backing store for the returned `VSBuffer` instance
     * might use a nodejs Buffer allocated from node's Buffer pool, which is not transferrable.
     * @public
     * @param {!Array<number>} source
     * @return {!VSBuffer}
     */
    static fromByteArray(source) {
        /** @type {!VSBuffer} */
        const result = VSBuffer.alloc(source.length);
        for (let i = 0, len = source.length; i < len; i++) {
            result.buffer[i] = source[i];
        }
        return result;
    }
    /**
     * When running in a nodejs context, the backing store for the returned `VSBuffer` instance
     * might use a nodejs Buffer allocated from node's Buffer pool, which is not transferrable.
     * @public
     * @param {!Array<!VSBuffer>} buffers
     * @param {(undefined|number)=} totalLength
     * @return {!VSBuffer}
     */
    static concat(buffers, totalLength) {
        if (typeof totalLength === 'undefined') {
            totalLength = 0;
            for (let i = 0, len = buffers.length; i < len; i++) {
                totalLength += buffers[i].byteLength;
            }
        }
        /** @type {!VSBuffer} */
        const ret = VSBuffer.alloc(totalLength);
        /** @type {number} */
        let offset = 0;
        for (let i = 0, len = buffers.length; i < len; i++) {
            /** @type {!VSBuffer} */
            const element = buffers[i];
            ret.set(element, offset);
            offset += element.byteLength;
        }
        return ret;
    }
    /**
     * @public
     * @param {*} buffer
     * @return {boolean}
     */
    static isNativeBuffer(buffer) {
        return hasBuffer && Buffer.isBuffer(buffer);
    }
    /**
     * @private
     * @param {!Uint8Array} buffer
     */
    constructor(buffer) {
        this.buffer = buffer;
        this.byteLength = this.buffer.byteLength;
    }
    /**
     * When running in a nodejs context, the backing store for the returned `VSBuffer` instance
     * might use a nodejs Buffer allocated from node's Buffer pool, which is not transferrable.
     * @public
     * @return {!VSBuffer}
     */
    clone() {
        /** @type {!VSBuffer} */
        const result = VSBuffer.alloc(this.byteLength);
        result.set(this);
        return result;
    }
    /**
     * @public
     * @return {string}
     */
    toString() {
        if (hasBuffer) {
            return this.buffer.toString();
        }
        else {
            if (!textDecoder) {
                textDecoder = new TextDecoder(undefined, { ignoreBOM: true });
            }
            return textDecoder.decode(this.buffer);
        }
    }
    /**
     * @public
     * @param {(undefined|number)=} start
     * @param {(undefined|number)=} end
     * @return {!VSBuffer}
     */
    slice(start, end) {
        // IMPORTANT: use subarray instead of slice because TypedArray#slice
        // creates shallow copy and NodeBuffer#slice doesn't. The use of subarray
        // ensures the same, performance, behaviour.
        return new VSBuffer(this.buffer.subarray(start, end));
    }
    /**
     * @public
     * @param {(!ArrayBuffer|!Uint8Array|!VSBuffer|!ArrayBufferView)} array
     * @param {(undefined|number)=} offset
     * @return {void}
     */
    set(array, offset) {
        if (array instanceof VSBuffer) {
            this.buffer.set((/** @type {!VSBuffer} */ (array)).buffer, offset);
        }
        else if (array instanceof Uint8Array) {
            this.buffer.set(array, offset);
        }
        else if (array instanceof ArrayBuffer) {
            this.buffer.set(new Uint8Array(array), offset);
        }
        else if (ArrayBuffer.isView(array)) {
            this.buffer.set(new Uint8Array((/** @type {!ArrayBufferView} */ (array)).buffer, (/** @type {!ArrayBufferView} */ (array)).byteOffset, (/** @type {!ArrayBufferView} */ (array)).byteLength), offset);
        }
        else {
            throw new Error(`Unknown argument 'array'`);
        }
    }
    /**
     * @public
     * @param {number} offset
     * @return {number}
     */
    readUInt32BE(offset) {
        return readUInt32BE(this.buffer, offset);
    }
    /**
     * @public
     * @param {number} value
     * @param {number} offset
     * @return {void}
     */
    writeUInt32BE(value, offset) {
        writeUInt32BE(this.buffer, value, offset);
    }
    /**
     * @public
     * @param {number} offset
     * @return {number}
     */
    readUInt32LE(offset) {
        return readUInt32LE(this.buffer, offset);
    }
    /**
     * @public
     * @param {number} value
     * @param {number} offset
     * @return {void}
     */
    writeUInt32LE(value, offset) {
        writeUInt32LE(this.buffer, value, offset);
    }
    /**
     * @public
     * @param {number} offset
     * @return {number}
     */
    readUInt8(offset) {
        return readUInt8(this.buffer, offset);
    }
    /**
     * @public
     * @param {number} value
     * @param {number} offset
     * @return {void}
     */
    writeUInt8(value, offset) {
        writeUInt8(this.buffer, value, offset);
    }
    /**
     * @public
     * @param {(!Uint8Array|!VSBuffer)} subarray
     * @param {number=} offset
     * @return {number}
     */
    indexOf(subarray, offset = 0) {
        return binaryIndexOf(this.buffer, subarray instanceof VSBuffer ? (/** @type {!VSBuffer} */ (subarray)).buffer : subarray, offset);
    }
    /**
     * @public
     * @param {!VSBuffer} other
     * @return {boolean}
     */
    equals(other) {
        if (this === other) {
            return true;
        }
        if (this.byteLength !== other.byteLength) {
            return false;
        }
        return this.buffer.every((/**
         * @param {number} value
         * @param {number} index
         * @return {boolean}
         */
        (value, index) => value === other.buffer[index]));
    }
}
exports.VSBuffer = VSBuffer;
/* istanbul ignore if */
if (false) {
    /**
     * @const {!Uint8Array}
     * @public
     */
    VSBuffer.prototype.buffer;
    /**
     * @const {number}
     * @public
     */
    VSBuffer.prototype.byteLength;
}
/**
 * Like String.indexOf, but works on Uint8Arrays.
 * Uses the boyer-moore-horspool algorithm to be reasonably speedy.
 * @param {!Uint8Array} haystack
 * @param {!Uint8Array} needle
 * @param {number=} offset
 * @return {number}
 */
function binaryIndexOf(haystack, needle, offset = 0) {
    /** @type {number} */
    const needleLen = needle.byteLength;
    /** @type {number} */
    const haystackLen = haystack.byteLength;
    if (needleLen === 0) {
        return 0;
    }
    if (needleLen === 1) {
        return haystack.indexOf(needle[0]);
    }
    if (needleLen > haystackLen - offset) {
        return -1;
    }
    // find index of the subarray using boyer-moore-horspool algorithm
    /** @type {!Uint8Array} */
    const table = indexOfTable.value;
    table.fill(needle.length);
    for (let i = 0; i < needle.length; i++) {
        table[needle[i]] = needle.length - i - 1;
    }
    /** @type {number} */
    let i = offset + needle.length - 1;
    /** @type {number} */
    let j = i;
    /** @type {number} */
    let result = -1;
    while (i < haystackLen) {
        if (haystack[i] === needle[j]) {
            if (j === 0) {
                result = i;
                break;
            }
            i--;
            j--;
        }
        else {
            i += Math.max(needle.length - j, table[haystack[i]]);
            j = needle.length - 1;
        }
    }
    return result;
}
exports.binaryIndexOf = binaryIndexOf;
/**
 * @param {!Uint8Array} source
 * @param {number} offset
 * @return {number}
 */
function readUInt16LE(source, offset) {
    return (((source[offset + 0] << 0) >>> 0) |
        ((source[offset + 1] << 8) >>> 0));
}
exports.readUInt16LE = readUInt16LE;
/**
 * @param {!Uint8Array} destination
 * @param {number} value
 * @param {number} offset
 * @return {void}
 */
function writeUInt16LE(destination, value, offset) {
    destination[offset + 0] = (value & 0b11111111);
    value = value >>> 8;
    destination[offset + 1] = (value & 0b11111111);
}
exports.writeUInt16LE = writeUInt16LE;
/**
 * @param {!Uint8Array} source
 * @param {number} offset
 * @return {number}
 */
function readUInt32BE(source, offset) {
    return (source[offset] * 2 ** 24
        + source[offset + 1] * 2 ** 16
        + source[offset + 2] * 2 ** 8
        + source[offset + 3]);
}
exports.readUInt32BE = readUInt32BE;
/**
 * @param {!Uint8Array} destination
 * @param {number} value
 * @param {number} offset
 * @return {void}
 */
function writeUInt32BE(destination, value, offset) {
    destination[offset + 3] = value;
    value = value >>> 8;
    destination[offset + 2] = value;
    value = value >>> 8;
    destination[offset + 1] = value;
    value = value >>> 8;
    destination[offset] = value;
}
exports.writeUInt32BE = writeUInt32BE;
/**
 * @param {!Uint8Array} source
 * @param {number} offset
 * @return {number}
 */
function readUInt32LE(source, offset) {
    return (((source[offset + 0] << 0) >>> 0) |
        ((source[offset + 1] << 8) >>> 0) |
        ((source[offset + 2] << 16) >>> 0) |
        ((source[offset + 3] << 24) >>> 0));
}
exports.readUInt32LE = readUInt32LE;
/**
 * @param {!Uint8Array} destination
 * @param {number} value
 * @param {number} offset
 * @return {void}
 */
function writeUInt32LE(destination, value, offset) {
    destination[offset + 0] = (value & 0b11111111);
    value = value >>> 8;
    destination[offset + 1] = (value & 0b11111111);
    value = value >>> 8;
    destination[offset + 2] = (value & 0b11111111);
    value = value >>> 8;
    destination[offset + 3] = (value & 0b11111111);
}
exports.writeUInt32LE = writeUInt32LE;
/**
 * @param {!Uint8Array} source
 * @param {number} offset
 * @return {number}
 */
function readUInt8(source, offset) {
    return source[offset];
}
exports.readUInt8 = readUInt8;
/**
 * @param {!Uint8Array} destination
 * @param {number} value
 * @param {number} offset
 * @return {void}
 */
function writeUInt8(destination, value, offset) {
    destination[offset] = value;
}
exports.writeUInt8 = writeUInt8;
/**
 * @record
 * @extends {tsickle_stream_2.Readable}
 */
function VSBufferReadable() { }
exports.VSBufferReadable = VSBufferReadable;
/**
 * @record
 * @extends {tsickle_stream_2.ReadableStream}
 */
function VSBufferReadableStream() { }
exports.VSBufferReadableStream = VSBufferReadableStream;
/**
 * @record
 * @extends {tsickle_stream_2.WriteableStream}
 */
function VSBufferWriteableStream() { }
exports.VSBufferWriteableStream = VSBufferWriteableStream;
/**
 * @record
 * @extends {tsickle_stream_2.ReadableBufferedStream}
 */
function VSBufferReadableBufferedStream() { }
exports.VSBufferReadableBufferedStream = VSBufferReadableBufferedStream;
/**
 * @param {!VSBufferReadable} readable
 * @return {!VSBuffer}
 */
function readableToBuffer(readable) {
    return streams.consumeReadable(readable, (/**
     * @param {!Array<!VSBuffer>} chunks
     * @return {!VSBuffer}
     */
    chunks => VSBuffer.concat(chunks)));
}
exports.readableToBuffer = readableToBuffer;
/**
 * @param {!VSBuffer} buffer
 * @return {!VSBufferReadable}
 */
function bufferToReadable(buffer) {
    return streams.toReadable(buffer);
}
exports.bufferToReadable = bufferToReadable;
/**
 * @param {!tsickle_stream_2.ReadableStream<!VSBuffer>} stream
 * @return {!Promise<!VSBuffer>}
 */
function streamToBuffer(stream) {
    return streams.consumeStream(stream, (/**
     * @param {!Array<!VSBuffer>} chunks
     * @return {!VSBuffer}
     */
    chunks => VSBuffer.concat(chunks)));
}
exports.streamToBuffer = streamToBuffer;
/**
 * @param {!tsickle_stream_2.ReadableBufferedStream<!VSBuffer>} bufferedStream
 * @return {!Promise<!VSBuffer>}
 */
async function bufferedStreamToBuffer(bufferedStream) {
    if (bufferedStream.ended) {
        return VSBuffer.concat(bufferedStream.buffer);
    }
    return VSBuffer.concat([
        // Include already read chunks...
        ...bufferedStream.buffer,
        // ...and all additional chunks
        await streamToBuffer(bufferedStream.stream)
    ]);
}
exports.bufferedStreamToBuffer = bufferedStreamToBuffer;
/**
 * @param {!VSBuffer} buffer
 * @return {!tsickle_stream_2.ReadableStream<!VSBuffer>}
 */
function bufferToStream(buffer) {
    return streams.toStream(buffer, (/**
     * @param {!Array<!VSBuffer>} chunks
     * @return {!VSBuffer}
     */
    chunks => VSBuffer.concat(chunks)));
}
exports.bufferToStream = bufferToStream;
/**
 * @param {!tsickle_stream_2.ReadableStreamEvents<(string|!Uint8Array)>} stream
 * @return {!tsickle_stream_2.ReadableStream<!VSBuffer>}
 */
function streamToBufferReadableStream(stream) {
    return streams.transform(stream, { data: (/**
         * @param {(string|!Uint8Array)} data
         * @return {!VSBuffer}
         */
        data => typeof data === 'string' ? VSBuffer.fromString(data) : VSBuffer.wrap(data)) }, (/**
     * @param {!Array<!VSBuffer>} chunks
     * @return {!VSBuffer}
     */
    chunks => VSBuffer.concat(chunks)));
}
exports.streamToBufferReadableStream = streamToBufferReadableStream;
/**
 * @param {(undefined|!tsickle_stream_2.WriteableStreamOptions)=} options
 * @return {!tsickle_stream_2.WriteableStream<!VSBuffer>}
 */
function newWriteableBufferStream(options) {
    return streams.newWriteableStream((/**
     * @param {!Array<!VSBuffer>} chunks
     * @return {!VSBuffer}
     */
    chunks => VSBuffer.concat(chunks)), options);
}
exports.newWriteableBufferStream = newWriteableBufferStream;
/**
 * @param {!VSBuffer} prefix
 * @param {!VSBufferReadable} readable
 * @return {!VSBufferReadable}
 */
function prefixedBufferReadable(prefix, readable) {
    return streams.prefixedReadable(prefix, readable, (/**
     * @param {!Array<!VSBuffer>} chunks
     * @return {!VSBuffer}
     */
    chunks => VSBuffer.concat(chunks)));
}
exports.prefixedBufferReadable = prefixedBufferReadable;
/**
 * @param {!VSBuffer} prefix
 * @param {!VSBufferReadableStream} stream
 * @return {!VSBufferReadableStream}
 */
function prefixedBufferStream(prefix, stream) {
    return streams.prefixedStream(prefix, stream, (/**
     * @param {!Array<!VSBuffer>} chunks
     * @return {!VSBuffer}
     */
    chunks => VSBuffer.concat(chunks)));
}
exports.prefixedBufferStream = prefixedBufferStream;
/**
 * Decodes base64 to a uint8 array. URL-encoded and unpadded base64 is allowed.
 * @param {string} encoded
 * @return {!VSBuffer}
 */
function decodeBase64(encoded) {
    /** @type {number} */
    let building = 0;
    /** @type {number} */
    let remainder = 0;
    /** @type {number} */
    let bufi = 0;
    // The simpler way to do this is `Uint8Array.from(atob(str), c => c.charCodeAt(0))`,
    // but that's about 10-20x slower than this function in current Chromium versions.
    /** @type {!Uint8Array} */
    const buffer = new Uint8Array(Math.floor(encoded.length / 4 * 3));
    /** @type {function(number): void} */
    const append = (/**
     * @param {number} value
     * @return {void}
     */
    (value) => {
        switch (remainder) {
            case 3:
                buffer[bufi++] = building | value;
                remainder = 0;
                break;
            case 2:
                buffer[bufi++] = building | (value >>> 2);
                building = value << 6;
                remainder = 3;
                break;
            case 1:
                buffer[bufi++] = building | (value >>> 4);
                building = value << 4;
                remainder = 2;
                break;
            default:
                building = value << 2;
                remainder = 1;
        }
    });
    for (let i = 0; i < encoded.length; i++) {
        /** @type {number} */
        const code = encoded.charCodeAt(i);
        // See https://datatracker.ietf.org/doc/html/rfc4648#section-4
        // This branchy code is about 3x faster than an indexOf on a base64 char string.
        if (code >= 65 && code <= 90) {
            append(code - 65); // A-Z starts ranges from char code 65 to 90
        }
        else if (code >= 97 && code <= 122) {
            append(code - 97 + 26); // a-z starts ranges from char code 97 to 122, starting at byte 26
        }
        else if (code >= 48 && code <= 57) {
            append(code - 48 + 52); // 0-9 starts ranges from char code 48 to 58, starting at byte 52
        }
        else if (code === 43 || code === 45) {
            append(62); // "+" or "-" for URLS
        }
        else if (code === 47 || code === 95) {
            append(63); // "/" or "_" for URLS
        }
        else if (code === 61) {
            break; // "="
        }
        else {
            throw new SyntaxError(`Unexpected base64 character ${encoded[i]}`);
        }
    }
    /** @type {number} */
    const unpadded = bufi;
    while (remainder > 0) {
        append(0);
    }
    // slice is needed to account for overestimation due to padding
    return VSBuffer.wrap(buffer).slice(0, unpadded);
}
exports.decodeBase64 = decodeBase64;
/** @type {string} */
const base64Alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
/** @type {string} */
const base64UrlSafeAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
/**
 * Encodes a buffer to a base64 string.
 * @param {!VSBuffer} __0
 * @param {boolean=} padded
 * @param {boolean=} urlSafe
 * @return {string}
 */
function encodeBase64({ buffer }, padded = true, urlSafe = false) {
    /** @type {string} */
    const dictionary = urlSafe ? base64UrlSafeAlphabet : base64Alphabet;
    /** @type {string} */
    let output = '';
    /** @type {number} */
    const remainder = buffer.byteLength % 3;
    /** @type {number} */
    let i = 0;
    for (; i < buffer.byteLength - remainder; i += 3) {
        /** @type {number} */
        const a = buffer[i + 0];
        /** @type {number} */
        const b = buffer[i + 1];
        /** @type {number} */
        const c = buffer[i + 2];
        output += dictionary[a >>> 2];
        output += dictionary[(a << 4 | b >>> 4) & 0b111111];
        output += dictionary[(b << 2 | c >>> 6) & 0b111111];
        output += dictionary[c & 0b111111];
    }
    if (remainder === 1) {
        /** @type {number} */
        const a = buffer[i + 0];
        output += dictionary[a >>> 2];
        output += dictionary[(a << 4) & 0b111111];
        if (padded) {
            output += '==';
        }
    }
    else if (remainder === 2) {
        /** @type {number} */
        const a = buffer[i + 0];
        /** @type {number} */
        const b = buffer[i + 1];
        output += dictionary[a >>> 2];
        output += dictionary[(a << 4 | b >>> 4) & 0b111111];
        output += dictionary[(b << 2) & 0b111111];
        if (padded) {
            output += '=';
        }
    }
    return output;
}
exports.encodeBase64 = encodeBase64;
/** @type {string} */
const hexChars = '0123456789abcdef';
/**
 * @param {!VSBuffer} __0
 * @return {string}
 */
function encodeHex({ buffer }) {
    /** @type {string} */
    let result = '';
    for (let i = 0; i < buffer.length; i++) {
        /** @type {number} */
        const byte = buffer[i];
        result += hexChars[byte >>> 4];
        result += hexChars[byte & 0x0f];
    }
    return result;
}
exports.encodeHex = encodeHex;
/**
 * @param {string} hex
 * @return {!VSBuffer}
 */
function decodeHex(hex) {
    if (hex.length % 2 !== 0) {
        throw new SyntaxError('Hex string must have an even length');
    }
    /** @type {!Uint8Array} */
    const out = new Uint8Array(hex.length >> 1);
    for (let i = 0; i < hex.length;) {
        out[i >> 1] = (decodeHexChar(hex, i++) << 4) | decodeHexChar(hex, i++);
    }
    return VSBuffer.wrap(out);
}
exports.decodeHex = decodeHex;
/**
 * @param {string} str
 * @param {number} position
 * @return {number}
 */
function decodeHexChar(str, position) {
    /** @type {number} */
    const s = str.charCodeAt(position);
    if (s >= 48 && s <= 57) { // '0'-'9'
        return s - 48;
    }
    else if (s >= 97 && s <= 102) { // 'a'-'f'
        return s - 87;
    }
    else if (s >= 65 && s <= 70) { // 'A'-'F'
        return s - 55;
    }
    else {
        throw new SyntaxError(`Invalid hex character at position ${position}`);
    }
}
