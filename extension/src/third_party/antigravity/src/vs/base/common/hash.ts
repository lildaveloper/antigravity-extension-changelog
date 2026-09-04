/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/antigravity/src/vs/base/common/hash.ts
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
goog.module('google3.third_party.antigravity.src.vs.base.common.hash');
var module = module || { id: 'third_party/antigravity/src/vs/base/common/hash.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_buffer_1 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.buffer");
const tsickle_strings_2 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.strings");
const buffer_1 = goog.require('google3.third_party.antigravity.src.vs.base.common.buffer');
const strings = goog.require('google3.third_party.antigravity.src.vs.base.common.strings');
/** @typedef {(!ArrayBuffer|!ArrayBufferView)} */
var NotSyncHashable;
/**
 * Return a hash value for an object.
 *
 * Note that this should not be used for binary data types. Instead,
 * prefer {\@link hashAsync}.
 * @template T
 * @param {?} obj
 * @return {number}
 */
function hash(obj) {
    return doHash(obj, 0);
}
exports.hash = hash;
/**
 * @param {*} obj
 * @param {number} hashVal
 * @return {number}
 */
function doHash(obj, hashVal) {
    switch (typeof obj) {
        case 'object':
            if (obj === null) {
                return numberHash(349, hashVal);
            }
            else if (Array.isArray(obj)) {
                return arrayHash(obj, hashVal);
            }
            return objectHash(obj, hashVal);
        case 'string':
            return stringHash(obj, hashVal);
        case 'boolean':
            return booleanHash(obj, hashVal);
        case 'number':
            return numberHash(obj, hashVal);
        case 'undefined':
            return numberHash(937, hashVal);
        default:
            return numberHash(617, hashVal);
    }
}
exports.doHash = doHash;
/**
 * @param {number} val
 * @param {number} initialHashVal
 * @return {number}
 */
function numberHash(val, initialHashVal) {
    return (((initialHashVal << 5) - initialHashVal) + val) | 0; // hashVal * 31 + ch, keep as int32
}
exports.numberHash = numberHash;
/**
 * @param {boolean} b
 * @param {number} initialHashVal
 * @return {number}
 */
function booleanHash(b, initialHashVal) {
    return numberHash(b ? 433 : 863, initialHashVal);
}
/**
 * @param {string} s
 * @param {number} hashVal
 * @return {number}
 */
function stringHash(s, hashVal) {
    hashVal = numberHash(149417, hashVal);
    for (let i = 0, length = s.length; i < length; i++) {
        hashVal = numberHash(s.charCodeAt(i), hashVal);
    }
    return hashVal;
}
exports.stringHash = stringHash;
/**
 * @param {!Array<*>} arr
 * @param {number} initialHashVal
 * @return {number}
 */
function arrayHash(arr, initialHashVal) {
    initialHashVal = numberHash(104579, initialHashVal);
    return arr.reduce((/**
     * @param {number} hashVal
     * @param {*} item
     * @return {number}
     */
    (hashVal, item) => doHash(item, hashVal)), initialHashVal);
}
/**
 * @param {!Object} obj
 * @param {number} initialHashVal
 * @return {number}
 */
function objectHash(obj, initialHashVal) {
    initialHashVal = numberHash(181387, initialHashVal);
    return Object.keys(obj).sort().reduce((/**
     * @param {number} hashVal
     * @param {string} key
     * @return {number}
     */
    (hashVal, key) => {
        hashVal = stringHash(key, hashVal);
        return doHash(((/** @type {?} */ (obj)))[key], hashVal);
    }), initialHashVal);
}
/**
 * Hashes the input as SHA-1, returning a hex-encoded string.
 * @type {function((string|!ArrayBufferView|!tsickle_buffer_1.VSBuffer)): !Promise<string>}
 */
exports.hashAsync = (/**
 * @param {(string|!ArrayBufferView|!tsickle_buffer_1.VSBuffer)} input
 * @return {!Promise<string>}
 */
(input) => {
    // Note: I would very much like to expose a streaming interface for hashing
    // generally, but this is not available in web crypto yet, see
    // https://github.com/w3c/webcrypto/issues/73
    // StringSHA1 is faster for small string input, use it since we have it:
    if (typeof input === 'string' && (/** @type {string} */ (input)).length < 250) {
        /** @type {!StringSHA1} */
        const sha = new StringSHA1();
        sha.update(input);
        return Promise.resolve(sha.digest());
    }
    /** @type {!ArrayBufferView} */
    let buff;
    if (typeof input === 'string') {
        buff = new TextEncoder().encode(input);
    }
    else if (input instanceof buffer_1.VSBuffer) {
        buff = (/** @type {!tsickle_buffer_1.VSBuffer} */ (input)).buffer;
    }
    else {
        buff = input;
    }
    return crypto.subtle.digest('sha-1', (/** @type {!ArrayBufferView} */ (buff))).then(toHexString); // CodeQL [SM04514] we use sha1 here for validating old stored client state, not for security
});
/** @enum {number} */
var SHA1Constant = {
    BLOCK_SIZE: 64, // 512 / 8
    // 512 / 8
    UNICODE_REPLACEMENT: 65533,
};
SHA1Constant[SHA1Constant.BLOCK_SIZE] = 'BLOCK_SIZE';
SHA1Constant[SHA1Constant.UNICODE_REPLACEMENT] = 'UNICODE_REPLACEMENT';
/**
 * @param {number} value
 * @param {number} bits
 * @param {number=} totalBits
 * @return {number}
 */
function leftRotate(value, bits, totalBits = 32) {
    // delta + bits = totalBits
    /** @type {number} */
    const delta = totalBits - bits;
    // All ones, expect `delta` zeros aligned to the right
    /** @type {number} */
    const mask = ~((1 << delta) - 1);
    // Join (value left-shifted `bits` bits) with (masked value right-shifted `delta` bits)
    return ((value << bits) | ((mask & value) >>> delta)) >>> 0;
}
/**
 * @param {(number|!ArrayBuffer)} bufferOrValue
 * @param {number=} bitsize
 * @return {string}
 */
function toHexString(bufferOrValue, bitsize = 32) {
    if (bufferOrValue instanceof ArrayBuffer) {
        return (0, buffer_1.encodeHex)(buffer_1.VSBuffer.wrap(new Uint8Array(bufferOrValue)));
    }
    return (bufferOrValue >>> 0).toString(16).padStart(bitsize / 4, '0');
}
/**
 * A SHA1 implementation that works with strings and does not allocate.
 *
 * Prefer to use {\@link hashAsync} in async contexts
 */
class StringSHA1 {
    /**
     * @public
     */
    constructor() {
        // 80 * 4 = 320
        this._h0 = 0x67452301;
        this._h1 = 0xEFCDAB89;
        this._h2 = 0x98BADCFE;
        this._h3 = 0x10325476;
        this._h4 = 0xC3D2E1F0;
        this._buff = new Uint8Array(SHA1Constant.BLOCK_SIZE + 3 /* to fit any utf-8 */);
        this._buffDV = new DataView(this._buff.buffer);
        this._buffLen = 0;
        this._totalLen = 0;
        this._leftoverHighSurrogate = 0;
        this._finished = false;
    }
    /**
     * @public
     * @param {string} str
     * @return {void}
     */
    update(str) {
        /** @type {number} */
        const strLen = str.length;
        if (strLen === 0) {
            return;
        }
        /** @type {!Uint8Array} */
        const buff = this._buff;
        /** @type {number} */
        let buffLen = this._buffLen;
        /** @type {number} */
        let leftoverHighSurrogate = this._leftoverHighSurrogate;
        /** @type {number} */
        let charCode;
        /** @type {number} */
        let offset;
        if (leftoverHighSurrogate !== 0) {
            charCode = leftoverHighSurrogate;
            offset = -1;
            leftoverHighSurrogate = 0;
        }
        else {
            charCode = str.charCodeAt(0);
            offset = 0;
        }
        while (true) {
            /** @type {number} */
            let codePoint = charCode;
            if (strings.isHighSurrogate(charCode)) {
                if (offset + 1 < strLen) {
                    /** @type {number} */
                    const nextCharCode = str.charCodeAt(offset + 1);
                    if (strings.isLowSurrogate(nextCharCode)) {
                        offset++;
                        codePoint = strings.computeCodePoint(charCode, nextCharCode);
                    }
                    else {
                        // illegal => unicode replacement character
                        codePoint = SHA1Constant.UNICODE_REPLACEMENT;
                    }
                }
                else {
                    // last character is a surrogate pair
                    leftoverHighSurrogate = charCode;
                    break;
                }
            }
            else if (strings.isLowSurrogate(charCode)) {
                // illegal => unicode replacement character
                codePoint = SHA1Constant.UNICODE_REPLACEMENT;
            }
            buffLen = this._push(buff, buffLen, codePoint);
            offset++;
            if (offset < strLen) {
                charCode = str.charCodeAt(offset);
            }
            else {
                break;
            }
        }
        this._buffLen = buffLen;
        this._leftoverHighSurrogate = leftoverHighSurrogate;
    }
    /**
     * @private
     * @param {!Uint8Array} buff
     * @param {number} buffLen
     * @param {number} codePoint
     * @return {number}
     */
    _push(buff, buffLen, codePoint) {
        if (codePoint < 0x0080) {
            buff[buffLen++] = codePoint;
        }
        else if (codePoint < 0x0800) {
            buff[buffLen++] = 0b11000000 | ((codePoint & 0b00000000000000000000011111000000) >>> 6);
            buff[buffLen++] = 0b10000000 | ((codePoint & 0b00000000000000000000000000111111) >>> 0);
        }
        else if (codePoint < 0x10000) {
            buff[buffLen++] = 0b11100000 | ((codePoint & 0b00000000000000001111000000000000) >>> 12);
            buff[buffLen++] = 0b10000000 | ((codePoint & 0b00000000000000000000111111000000) >>> 6);
            buff[buffLen++] = 0b10000000 | ((codePoint & 0b00000000000000000000000000111111) >>> 0);
        }
        else {
            buff[buffLen++] = 0b11110000 | ((codePoint & 0b00000000000111000000000000000000) >>> 18);
            buff[buffLen++] = 0b10000000 | ((codePoint & 0b00000000000000111111000000000000) >>> 12);
            buff[buffLen++] = 0b10000000 | ((codePoint & 0b00000000000000000000111111000000) >>> 6);
            buff[buffLen++] = 0b10000000 | ((codePoint & 0b00000000000000000000000000111111) >>> 0);
        }
        if (buffLen >= SHA1Constant.BLOCK_SIZE) {
            this._step();
            buffLen -= SHA1Constant.BLOCK_SIZE;
            this._totalLen += SHA1Constant.BLOCK_SIZE;
            // take last 3 in case of UTF8 overflow
            buff[0] = buff[SHA1Constant.BLOCK_SIZE + 0];
            buff[1] = buff[SHA1Constant.BLOCK_SIZE + 1];
            buff[2] = buff[SHA1Constant.BLOCK_SIZE + 2];
        }
        return buffLen;
    }
    /**
     * @public
     * @return {string}
     */
    digest() {
        if (!this._finished) {
            this._finished = true;
            if (this._leftoverHighSurrogate) {
                // illegal => unicode replacement character
                this._leftoverHighSurrogate = 0;
                this._buffLen = this._push(this._buff, this._buffLen, SHA1Constant.UNICODE_REPLACEMENT);
            }
            this._totalLen += this._buffLen;
            this._wrapUp();
        }
        return toHexString(this._h0) + toHexString(this._h1) + toHexString(this._h2) + toHexString(this._h3) + toHexString(this._h4);
    }
    /**
     * @private
     * @return {void}
     */
    _wrapUp() {
        this._buff[this._buffLen++] = 0x80;
        this._buff.subarray(this._buffLen).fill(0);
        if (this._buffLen > 56) {
            this._step();
            this._buff.fill(0);
        }
        // this will fit because the mantissa can cover up to 52 bits
        /** @type {number} */
        const ml = 8 * this._totalLen;
        this._buffDV.setUint32(56, Math.floor(ml / 4294967296), false);
        this._buffDV.setUint32(60, ml % 4294967296, false);
        this._step();
    }
    /**
     * @private
     * @return {void}
     */
    _step() {
        /** @type {!DataView} */
        const bigBlock32 = StringSHA1._bigBlock32;
        /** @type {!DataView} */
        const data = this._buffDV;
        for (let j = 0; j < 64 /* 16*4 */; j += 4) {
            bigBlock32.setUint32(j, data.getUint32(j, false), false);
        }
        for (let j = 64; j < 320 /* 80*4 */; j += 4) {
            bigBlock32.setUint32(j, leftRotate((bigBlock32.getUint32(j - 12, false) ^ bigBlock32.getUint32(j - 32, false) ^ bigBlock32.getUint32(j - 56, false) ^ bigBlock32.getUint32(j - 64, false)), 1), false);
        }
        /** @type {number} */
        let a = this._h0;
        /** @type {number} */
        let b = this._h1;
        /** @type {number} */
        let c = this._h2;
        /** @type {number} */
        let d = this._h3;
        /** @type {number} */
        let e = this._h4;
        /** @type {number} */
        let f;
        /** @type {number} */
        let k;
        /** @type {number} */
        let temp;
        for (let j = 0; j < 80; j++) {
            if (j < 20) {
                f = (b & c) | ((~b) & d);
                k = 0x5A827999;
            }
            else if (j < 40) {
                f = b ^ c ^ d;
                k = 0x6ED9EBA1;
            }
            else if (j < 60) {
                f = (b & c) | (b & d) | (c & d);
                k = 0x8F1BBCDC;
            }
            else {
                f = b ^ c ^ d;
                k = 0xCA62C1D6;
            }
            temp = (leftRotate(a, 5) + f + e + k + bigBlock32.getUint32(j * 4, false)) & 0xffffffff;
            e = d;
            d = c;
            c = leftRotate(b, 30);
            b = a;
            a = temp;
        }
        this._h0 = (this._h0 + a) & 0xffffffff;
        this._h1 = (this._h1 + b) & 0xffffffff;
        this._h2 = (this._h2 + c) & 0xffffffff;
        this._h3 = (this._h3 + d) & 0xffffffff;
        this._h4 = (this._h4 + e) & 0xffffffff;
    }
}
exports.StringSHA1 = StringSHA1;
StringSHA1._bigBlock32 = new DataView(new ArrayBuffer(320)); // 80 * 4 = 320
/* istanbul ignore if */
if (false) {
    /**
     * @type {!DataView}
     * @private
     */
    StringSHA1._bigBlock32;
    /**
     * @type {number}
     * @private
     */
    StringSHA1.prototype._h0;
    /**
     * @type {number}
     * @private
     */
    StringSHA1.prototype._h1;
    /**
     * @type {number}
     * @private
     */
    StringSHA1.prototype._h2;
    /**
     * @type {number}
     * @private
     */
    StringSHA1.prototype._h3;
    /**
     * @type {number}
     * @private
     */
    StringSHA1.prototype._h4;
    /**
     * @const {!Uint8Array}
     * @private
     */
    StringSHA1.prototype._buff;
    /**
     * @const {!DataView}
     * @private
     */
    StringSHA1.prototype._buffDV;
    /**
     * @type {number}
     * @private
     */
    StringSHA1.prototype._buffLen;
    /**
     * @type {number}
     * @private
     */
    StringSHA1.prototype._totalLen;
    /**
     * @type {number}
     * @private
     */
    StringSHA1.prototype._leftoverHighSurrogate;
    /**
     * @type {boolean}
     * @private
     */
    StringSHA1.prototype._finished;
}
