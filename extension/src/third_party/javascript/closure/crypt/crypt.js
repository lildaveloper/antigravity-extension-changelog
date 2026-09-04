/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Namespace with crypto related helper functions.
 */

goog.module('goog.crypt');
goog.module.declareLegacyNamespace();

const asserts = goog.require('goog.asserts');
const throwException = goog.require('goog.async.throwException');

/**
 * Whether to async-throw on unicode input to the legacy versions of
 * `stringToByteArray` (i.e. when `throwSync` is false).
 * NOTE: The default will change to `true` soon, after notifying users.
 * @define {boolean}
 */
const ASYNC_THROW_ON_UNICODE_TO_BYTE =
    goog.define('goog.crypt.ASYNC_THROW_ON_UNICODE_TO_BYTE', goog.DEBUG);

/**
 * Test-only stub to make our use of async.throwException more testable.
 */
const TEST_ONLY = {};

/** Remappable alias. */
TEST_ONLY.throwException = throwException;

/** Configurable so that we can test the async-throw behavior. */
TEST_ONLY.alwaysThrowSynchronously = goog.DEBUG;

/**
 * Turns a string into an array of bytes; a "byte" being a JS number in the
 * range 0-255. Multi-byte characters will throw.
 * @param {string} str String value to arrify.
 * @return {!Array<number>} Array of numbers corresponding to the
 *     UCS character codes of each character in str.
 */
function binaryStringToByteArray(str) {
  return stringToByteArray(str, true);
}

/**
 * Turns a string into an array of bytes; a "byte" being a JS number in the
 * range 0-255. Multi-byte characters are written as little-endian.
 * @param {string} str String value to arrify.
 * @param {boolean=} throwSync Whether to throw synchronously.
 * @return {!Array<number>} Array of numbers corresponding to the
 *     UCS character codes of each character in str.
 */
function stringToByteArray(str, throwSync) {
  const output = [];
  let p = 0;
  for (let i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i);
    // NOTE: c <= 0xffff since JavaScript strings are UTF-16.
    if (c > 0xff) {
      const err = new Error('go/unicode-to-byte-error');
      // NOTE: fail faster in debug to catch errors reliably in tests.
      if (TEST_ONLY.alwaysThrowSynchronously || throwSync) {
        throw err;
      } else if (ASYNC_THROW_ON_UNICODE_TO_BYTE) {
        TEST_ONLY.throwException(err);
      }
      output[p++] = c & 0xff;
      c >>= 8;
    }
    output[p++] = c;
  }
  return output;
}

/**
 * Turns an array of numbers into the string given by the concatenation of the
 * characters to which the numbers correspond.
 * @param {!Uint8Array|!Array<number>} bytes Array of numbers representing
 *     characters.
 * @return {string} Stringification of the array.
 */
function byteArrayToString(bytes) {
  return byteArrayToBinaryString(bytes);
}

/**
 * Turns an array of numbers into the string given by the concatenation of the
 * characters to which the numbers correspond.
 * @param {!Uint8Array|!Array<number>} bytes Array of numbers representing
 *     characters.
 * @return {string} Stringification of the array.
 */
function byteArrayToBinaryString(bytes) {
  const CHUNK_SIZE = 8192;

  // Special-case the simple case for speed's sake.
  if (bytes.length <= CHUNK_SIZE) {
    return String.fromCharCode.apply(null, bytes);
  }

  // The remaining logic splits conversion by chunks since
  // Function#apply() has a maximum parameter count.
  // See discussion: http://goo.gl/LrWmZ9

  let str = '';
  for (let i = 0; i < bytes.length; i += CHUNK_SIZE) {
    const chunk = Array.prototype.slice.call(bytes, i, i + CHUNK_SIZE);
    str += String.fromCharCode.apply(null, chunk);
  }
  return str;
}

/**
 * Turns an array of numbers into the hex string given by the concatenation of
 * the hex values to which the numbers correspond.
 * @param {Uint8Array|Array<number>} array Array of numbers representing
 *     characters.
 * @param {string=} opt_separator Optional separator between values
 * @return {string} Hex string.
 */
function byteArrayToHex(array, opt_separator) {
  return Array.prototype.map
      .call(
          array,
          function(numByte) {
            const hexByte = numByte.toString(16);
            return hexByte.length > 1 ? hexByte : '0' + hexByte;
          })
      .join(opt_separator || '');
}

/**
 * Converts a hex string into an integer array.
 * @param {string} hexString Hex string of 16-bit integers (two characters
 *     per integer).
 * @return {!Array<number>} Array of {0,255} integers for the given string.
 */
function hexToByteArray(hexString) {
  asserts.assert(
      hexString.length % 2 == 0, 'Key string length must be multiple of 2');
  const arr = [];
  for (let i = 0; i < hexString.length; i += 2) {
    arr.push(parseInt(hexString.substring(i, i + 2), 16));
  }
  return arr;
}

/**
 * Converts a JS string to a UTF-8 "byte" array.
 * @param {string} str 16-bit unicode string.
 * @return {!Array<number>} UTF-8 byte array.
 */
function stringToUtf8ByteArray(str) {
  return textToByteArray(str);
}

/**
 * Converts a JS string to a UTF-8 "byte" array.
 * @param {string} str 16-bit unicode string.
 * @return {!Array<number>} UTF-8 byte array.
 */
function textToByteArray(str) {
  // TODO(b/283396162): Use native implementations if/when available
  const out = [];
  let p = 0;
  for (let i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i);
    if (c < 128) {
      out[p++] = c;
    } else if (c < 2048) {
      out[p++] = (c >> 6) | 192;
      out[p++] = (c & 63) | 128;
    } else if (
        ((c & 0xFC00) == 0xD800) && (i + 1) < str.length &&
        ((str.charCodeAt(i + 1) & 0xFC00) == 0xDC00)) {
      // Surrogate Pair
      c = 0x10000 + ((c & 0x03FF) << 10) + (str.charCodeAt(++i) & 0x03FF);
      out[p++] = (c >> 18) | 240;
      out[p++] = ((c >> 12) & 63) | 128;
      out[p++] = ((c >> 6) & 63) | 128;
      out[p++] = (c & 63) | 128;
    } else {
      out[p++] = (c >> 12) | 224;
      out[p++] = ((c >> 6) & 63) | 128;
      out[p++] = (c & 63) | 128;
    }
  }
  return out;
}

/**
 * Converts a UTF-8 byte array to JavaScript's 16-bit Unicode.
 * @param {Uint8Array|Array<number>} bytes UTF-8 byte array.
 * @return {string} 16-bit Unicode string.
 */
function utf8ByteArrayToString(bytes) {
  return byteArrayToText(bytes);
}

/**
 * Converts a UTF-8 byte array to JavaScript's 16-bit Unicode.
 * @param {Uint8Array|Array<number>} bytes UTF-8 byte array.
 * @return {string} 16-bit Unicode string.
 */
function byteArrayToText(bytes) {
  // TODO(pupius): Use native implementations if/when available
  const out = [];
  let pos = 0;
  let c = 0;
  while (pos < bytes.length) {
    const c1 = bytes[pos++];
    if (c1 < 128) {
      out[c++] = String.fromCharCode(c1);
    } else if (c1 > 191 && c1 < 224) {
      const c2 = bytes[pos++];
      out[c++] = String.fromCharCode((c1 & 31) << 6 | c2 & 63);
    } else if (c1 > 239 && c1 < 365) {
      // Surrogate Pair
      const c2 = bytes[pos++];
      const c3 = bytes[pos++];
      const c4 = bytes[pos++];
      const u = ((c1 & 7) << 18 | (c2 & 63) << 12 | (c3 & 63) << 6 | c4 & 63) -
          0x10000;
      out[c++] = String.fromCharCode(0xD800 + (u >> 10));
      out[c++] = String.fromCharCode(0xDC00 + (u & 1023));
    } else {
      const c2 = bytes[pos++];
      const c3 = bytes[pos++];
      out[c++] =
          String.fromCharCode((c1 & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
    }
  }
  return out.join('');
}

/**
 * XOR two byte arrays.
 * @param {!Uint8Array|!Int8Array|!Array<number>} bytes1 Byte array 1.
 * @param {!Uint8Array|!Int8Array|!Array<number>} bytes2 Byte array 2.
 * @return {!Array<number>} Resulting XOR of the two byte arrays.
 */
function xorByteArray(bytes1, bytes2) {
  asserts.assert(
      bytes1.length == bytes2.length, 'XOR array lengths must match');

  const result = [];
  for (let i = 0; i < bytes1.length; i++) {
    result.push(bytes1[i] ^ bytes2[i]);
  }
  return result;
}

exports.ASYNC_THROW_ON_UNICODE_TO_BYTE = ASYNC_THROW_ON_UNICODE_TO_BYTE;
exports.TEST_ONLY = TEST_ONLY;
exports.binaryStringToByteArray = binaryStringToByteArray;
exports.byteArrayToBinaryString = byteArrayToBinaryString;
exports.byteArrayToHex = byteArrayToHex;
exports.byteArrayToString = byteArrayToString;
exports.byteArrayToText = byteArrayToText;
exports.hexToByteArray = hexToByteArray;
exports.stringToByteArray = stringToByteArray;
exports.stringToUtf8ByteArray = stringToUtf8ByteArray;
exports.textToByteArray = textToByteArray;
exports.utf8ByteArrayToString = utf8ByteArrayToString;
exports.xorByteArray = xorByteArray;
