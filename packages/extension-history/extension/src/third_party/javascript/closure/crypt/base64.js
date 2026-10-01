/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Base64 en/decoding. Not much to say here except that we
 * work with decoded values in arrays of bytes. By "byte" I mean a number
 * in [0, 255].
 */

goog.module('goog.crypt.base64');
goog.module.declareLegacyNamespace();

const asserts = goog.require('goog.asserts');
const crypt = goog.require('goog.crypt');
const internal = goog.require('goog.string.internal');
const product = goog.require('goog.userAgent.product');
const userAgent = goog.require('goog.userAgent');

/**
 * Default alphabet, shared between alphabets. Only 62 characters.
 * @type {string}
 */
const DEFAULT_ALPHABET_COMMON = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
    'abcdefghijklmnopqrstuvwxyz' +
    '0123456789';

/**
 * Alphabet characters for Alphabet.DEFAULT encoding.
 * For characters without padding, please consider using
 * `crypt.baseN.BASE_64` instead.
 *
 * @type {string}
 */
const ENCODED_VALS = DEFAULT_ALPHABET_COMMON + '+/=';

/**
 * Alphabet characters for Alphabet.WEBSAFE_DOT_PADDING encoding.
 * The dot padding is no Internet Standard, according to RFC 4686.
 * https://tools.ietf.org/html/rfc4648
 * For characters without padding, please consider using
 * `crypt.baseN.BASE_64_URL_SAFE` instead.
 *
 * @type {string}
 */
const ENCODED_VALS_WEBSAFE = DEFAULT_ALPHABET_COMMON + '-_.';

/**
 * Alphabets for Base64 encoding
 * Alphabets with no padding character are for encoding without padding.
 * About the alphabets, please refer to RFC 4686.
 * https://tools.ietf.org/html/rfc4648
 * @enum {number}
 */
const Alphabet = {
  /** Section 4 "base64". */
  DEFAULT: 0,
  /** Section 4 "base64", omitting padding per Section 3.2. */
  NO_PADDING: 1,
  /** Section 5 "base64url". */
  WEBSAFE: 2,
  /** Like WEBSAFE, but with non-standard '.' padding character. */
  WEBSAFE_DOT_PADDING: 3,
  /** Section 5 "base64url", omitting padding per Section 3.2. */
  WEBSAFE_NO_PADDING: 4,
};

/**
 * Padding chars for Base64 encoding
 * @const {string}
 */
const paddingChars = '=.';

/**
 * Check if a character is a padding character
 * @param {string} char
 * @return {boolean}
 */
function isPadding(char) {
  return internal.contains(paddingChars, char);
}

// Static lookup maps, lazily populated by init_()

/**
 * For each `Alphabet`, maps from bytes to characters.
 * @see https://jsperf.com/char-lookups
 * @type {!Object<!Alphabet, !Array<string>>}
 */
const byteToCharMaps = {};

/**
 * Maps characters to bytes.
 * This map is used for all alphabets since, across alphabets, common chars
 * always map to the same byte.
 * `null` indicates `init` has not yet been called.
 * @type {?Object<string, number>}
 */
let charToByteMap = null;

/**
 * White list of implementations with known-good native atob and btoa functions.
 * Listing these explicitly (via the ASSUME_* wrappers) benefits dead-code
 * removal in per-browser compilations.
 * @type {boolean}
 */
const ASSUME_NATIVE_SUPPORT = userAgent.GECKO || userAgent.WEBKIT;

/**
 * Does this browser have a working btoa function?
 * @type {boolean}
 */
const HAS_NATIVE_ENCODE = goog.FEATURESET_YEAR >= 2018 ||
    ASSUME_NATIVE_SUPPORT || typeof (goog.global.btoa) == 'function';

/**
 * Does this browser have a working atob function?
 * We blacklist known-bad implementations:
 *  - IE (10+) added atob() but it does not tolerate whitespace on the input.
 * @type {boolean}
 */
const HAS_NATIVE_DECODE = goog.FEATURESET_YEAR >= 2018 ||
    ASSUME_NATIVE_SUPPORT ||
    (!product.SAFARI && typeof (goog.global.atob) == 'function');

/**
 * Base64-encode an array of bytes.
 *
 * @param {Array<number>|Uint8Array} input An array of bytes (numbers with
 *     value in [0, 255]) to encode.
 * @param {!Alphabet=} alphabet Base 64 alphabet to
 *     use in encoding. Alphabet.DEFAULT is used by default.
 * @return {string} The base64 encoded string.
 */
function encodeByteArray(input, alphabet) {
  // Assert avoids runtime dependency on goog.isArrayLike, which helps reduce
  // size of jscompiler output, and which yields slight performance increase.
  asserts.assert(
      goog.isArrayLike(input), 'encodeByteArray takes an array as a parameter');

  if (alphabet === undefined) {
    alphabet = Alphabet.DEFAULT;
  }
  init();

  const byteToCharMap = byteToCharMaps[alphabet];
  const output = new Array(Math.floor(input.length / 3));
  const paddingChar = byteToCharMap[64] || '';

  // Add all blocks for which we have four output bytes.
  let inputIdx = 0;
  let outputIdx = 0;
  for (; inputIdx < input.length - 2; inputIdx += 3) {
    const byte1 = input[inputIdx];
    const byte2 = input[inputIdx + 1];
    const byte3 = input[inputIdx + 2];

    const outChar1 = byteToCharMap[byte1 >> 2];
    const outChar2 = byteToCharMap[((byte1 & 0x03) << 4) | (byte2 >> 4)];
    const outChar3 = byteToCharMap[((byte2 & 0x0F) << 2) | (byte3 >> 6)];
    const outChar4 = byteToCharMap[byte3 & 0x3F];

    output[outputIdx++] = ((('' + outChar1) + outChar2) + outChar3) + outChar4;
  }

  // Add our trailing block, in which case we can skip computations relating to
  // byte3/outByte4.
  let byte2 = 0;
  let outChar3 = paddingChar;
  switch (input.length - inputIdx) {
    case 2:
      byte2 = input[inputIdx + 1];
      outChar3 = byteToCharMap[(byte2 & 0x0F) << 2] || paddingChar;
      // fall through.
    case 1:
      const byte1 = input[inputIdx];
      const outChar1 = byteToCharMap[byte1 >> 2];
      const outChar2 = byteToCharMap[((byte1 & 0x03) << 4) | (byte2 >> 4)];

      output[outputIdx] =
          ((('' + outChar1) + outChar2) + outChar3) + paddingChar;
      // fall through.
    default:
      // We've ended on a block, so we have no more bytes to encode.
  }

  return output.join('');
}

/**
 * Base64-encode a binary string.  Note that binary strings are discouraged now
 * that Uint8Array is available on all supported browsers.  Users are encouraged
 * to strongly consider `encodeByteArray`.  This method is likely to be
 * deprecated at some point in favor of the Uint8Array version.
 *
 * @param {string} input A string to encode.  Must not contain characters
 *     outside of the Latin-1 range (i.e. charCode > 255).
 * @param {!Alphabet=} alphabet Base 64 alphabet to
 *     use in encoding. Alphabet.DEFAULT is used by default.
 * @return {string} The base64 encoded string.
 */
function encodeBinaryString(input, alphabet) {
  return encodeString(input, alphabet, true);
}

/**
 * Base64-encode a binary string.
 *
 * @param {string} input A string to encode.  Must not contain characters
 *     outside of the Latin-1 range (i.e. charCode > 255).
 * @param {!Alphabet=} alphabet Base 64 alphabet to
 *     use in encoding. Alphabet.DEFAULT is used by default.
 * @param {boolean=} throwSync Whether to throw synchronously on unicode.  Note
 *     that if not using a custom alphabet, the throw will always be sync.
 * @return {string} The base64 encoded string.
 */
function encodeString(input, alphabet, throwSync) {
  // Shortcut for browsers that implement
  // a native base64 encoder in the form of "btoa/atob"
  if (HAS_NATIVE_ENCODE && !alphabet) {
    return goog.global.btoa(input);
  }
  return encodeByteArray(crypt.stringToByteArray(input, throwSync), alphabet);
}

/**
 * Base64-encode a text string.  Non-ASCII characters (charCode > 127) will be
 * encoded as UTF-8.
 *
 * @param {string} input A string to encode.
 * @param {!Alphabet=} alphabet Base 64 alphabet to
 *     use in encoding. Alphabet.DEFAULT is used by default.
 * @return {string} The base64 encoded string.
 */
function encodeStringUtf8(input, alphabet) {
  return encodeText(input, alphabet);
}

/**
 * Base64-encode a text string.  Non-ASCII characters (charCode > 127) will be
 * encoded as UTF-8.
 *
 * @param {string} input A string to encode.
 * @param {!Alphabet=} alphabet Base 64 alphabet to
 *     use in encoding. Alphabet.DEFAULT is used by default.
 * @return {string} The base64 encoded string.
 */
function encodeText(input, alphabet) {
  // Shortcut for browsers that implement
  // a native base64 encoder in the form of "btoa/atob"
  if (HAS_NATIVE_ENCODE && !alphabet) {
    return goog.global.btoa(unescape(encodeURIComponent(input)));
  }
  return encodeByteArray(crypt.stringToUtf8ByteArray(input), alphabet);
}

/**
 * Base64-decode a string into a binary bytestring.  Note that binary strings
 * are discouraged now that Uint8Array is available on all supported browsers.
 * Users are encouraged to strongly consider `decodeStringToUint8Array`.  This
 * method is likely to be deprecated at some point in favor of the Uint8Array
 * version.
 *
 * @param {string} input Input to decode. Any whitespace is ignored, and the
 *     input maybe encoded with either supported alphabet (or a mix thereof).
 * @param {boolean=} useCustomDecoder True indicates the custom decoder is used,
 *     which supports alternative alphabets. Note that passing false may still
 *     use the custom decoder on browsers without native support.
 * @return {string} string representing the decoded value.
 */
function decodeToBinaryString(input, useCustomDecoder) {
  // Shortcut for browsers that implement
  // a native base64 encoder in the form of "btoa/atob"
  if (HAS_NATIVE_DECODE && !useCustomDecoder) {
    return goog.global.atob(input);
  }
  let output = '';
  function pushByte(b) {
    output += String.fromCharCode(b);
  }

  decodeStringInternal(input, pushByte);

  return output;
}

/**
 * Base64-decode a string into a binary bytestring.
 *
 * @param {string} input Input to decode. Any whitespace is ignored, and the
 *     input maybe encoded with either supported alphabet (or a mix thereof).
 * @param {boolean=} useCustomDecoder True indicates the custom decoder is used,
 *     which supports alternative alphabets. Note that passing false may still
 *     use the custom decoder on browsers without native support.
 * @return {string} string representing the decoded value.
 */
const decodeString = decodeToBinaryString;

/**
 * Base64-decode a string.  The input should be the result of a double-encoding
 * a unicode string: first the unicode characters (>127) are encoded as UTF-8
 * bytes, and then the resulting bytes are base64-encoded.
 *
 * @param {string} input Input to decode. Any whitespace is ignored, and the
 *     input maybe encoded with either supported alphabet (or a mix thereof).
 * @param {boolean=} useCustomDecoder True indicates the custom decoder is used,
 *     which supports alternative alphabets. Note that passing false may still
 *     use the custom decoder on browsers without native support.
 * @return {string} string representing the decoded value.
 */
function decodeStringUtf8(input, useCustomDecoder) {
  return decodeToText(input, useCustomDecoder);
}

/**
 * Base64-decode a string.  The input should be the result of a double-encoding
 * a unicode string: first the unicode characters (>127) are encoded as UTF-8
 * bytes, and then the resulting bytes are base64-encoded.
 *
 * @param {string} input Input to decode. Any whitespace is ignored, and the
 *     input maybe encoded with either supported alphabet (or a mix thereof).
 * @param {boolean=} useCustomDecoder True indicates the custom decoder is used,
 *     which supports alternative alphabets. Note that passing false may still
 *     use the custom decoder on browsers without native support.
 * @return {string} string representing the decoded value.
 */
function decodeToText(input, useCustomDecoder) {
  return decodeURIComponent(escape(decodeString(input, useCustomDecoder)));
}

/**
 * Base64-decode a string to an Array of numbers.
 *
 * In base-64 decoding, groups of four characters are converted into three
 * bytes.  If the encoder did not apply padding, the input length may not
 * be a multiple of 4.
 *
 * In this case, the last group will have fewer than 4 characters, and
 * padding will be inferred.  If the group has one or two characters, it decodes
 * to one byte.  If the group has three characters, it decodes to two bytes.
 *
 * TODO(sdh): We may want to consider renaming this to `decodeToByteArray` for
 * consistency with `decodeToText`/`decodeToBinaryString`.
 *
 * @param {string} input Input to decode. Any whitespace is ignored, and the
 *     input maybe encoded with either supported alphabet (or a mix thereof).
 * @param {boolean=} opt_ignored Unused parameter, retained for compatibility.
 * @return {!Array<number>} bytes representing the decoded value.
 */
function decodeStringToByteArray(input, opt_ignored) {
  const output = [];
  function pushByte(b) {
    output.push(b);
  }

  decodeStringInternal(input, pushByte);

  return output;
}

/**
 * Base64-decode a string to a Uint8Array.
 *
 * Note that Uint8Array is not supported on older browsers, e.g. IE < 10.
 * @see http://caniuse.com/uint8array
 *
 * In base-64 decoding, groups of four characters are converted into three
 * bytes.  If the encoder did not apply padding, the input length may not
 * be a multiple of 4.
 *
 * In this case, the last group will have fewer than 4 characters, and
 * padding will be inferred.  If the group has one or two characters, it decodes
 * to one byte.  If the group has three characters, it decodes to two bytes.
 *
 * TODO(sdh): We may want to consider renaming this to `decodeToUint8Array` for
 * consistency with `decodeToText`/`decodeToBinaryString`.
 *
 * @param {string} input Input to decode. Any whitespace is ignored, and the
 *     input maybe encoded with either supported alphabet (or a mix thereof).
 * @return {!Uint8Array} bytes representing the decoded value.
 */
function decodeStringToUint8Array(input) {
  // TODO(b/384553364): leverage Uint8Array.fromBase64()
  const len = input.length;
  // Approximate the length of the array needed for output.
  // Our method varies according to the format of the input, which we can
  // consider in three categories:
  //   A) well-formed with proper padding
  //   B) well-formed without any padding
  //   C) not-well-formed, either with extra whitespace in the middle or with
  //      extra padding characters.
  //
  //  In the case of (A), (length * 3 / 4) will result in an integer number of
  //  bytes evenly divisible by 3, and we need only subtract bytes according to
  //  the padding observed.
  //
  //  In the case of (B), (length * 3 / 4) will result in a non-integer number
  //  of bytes, or not evenly divisible by 3. (If the result is evenly divisible
  //  by 3, it's well-formed with the proper amount of padding [0 padding]).
  //  This approximation can become exact by rounding down.
  //
  //  In the case of (C), the only way to get the length is to walk the full
  //  length of the string to consider each character. This is handled by
  //  tracking the number of bytes added to the array and using subarray to
  //  trim the array back down to size.
  let approxByteLength = len * 3 / 4;
  if (approxByteLength % 3) {
    // The string isn't complete, either because it didn't include padding, or
    // because it has extra white space.
    // In either case, we won't generate more bytes than are completely encoded,
    // so rounding down is appropriate to have a buffer at least as large as
    // output.
    approxByteLength = Math.floor(approxByteLength);
  } else if (isPadding(input[len - 1])) {
    // The string has a round length, and has some padding.
    // Reduce the byte length according to the quantity of padding.
    if (isPadding(input[len - 2])) {
      approxByteLength -= 2;
    } else {
      approxByteLength -= 1;
    }
  }
  const output = new Uint8Array(approxByteLength);
  let outLen = 0;
  function pushByte(b) {
    output[outLen++] = b;
  }

  decodeStringInternal(input, pushByte);

  // Trim unused trailing bytes if necessary, this only happens if the input
  // included extra whitespace or extra padding that caused our estimate to be
  // too large (this is uncommon).
  //
  // It would be correct to simply always call subarray, but we avoid doing so
  // to avoid potential poor performance from chrome.
  // See https://bugs.chromium.org/p/v8/issues/detail?id=7161
  return outLen !== approxByteLength ? output.subarray(0, outLen) : output;
}

/**
 * @param {string} input Input to decode.
 * @param {function(number):void} pushByte result accumulator.
 */
function decodeStringInternal(input, pushByte) {
  init();

  let nextCharIndex = 0;
  /**
   * @param {number} default_val Used for end-of-input.
   * @return {number} The next 6-bit value, or the default for end-of-input.
   */
  function getByte(default_val) {
    while (nextCharIndex < input.length) {
      const ch = input.charAt(nextCharIndex++);
      const b = charToByteMap[ch];
      if (b != null) {
        return b;  // Common case: decoded the char.
      }
      if (!internal.isEmptyOrWhitespace(ch)) {
        throw new Error('Unknown base64 encoding at char: ' + ch);
      }
      // We encountered whitespace: loop around to the next input char.
    }
    return default_val;  // No more input remaining.
  }

  while (true) {
    const byte1 = getByte(-1);
    const byte2 = getByte(0);
    const byte3 = getByte(64);
    const byte4 = getByte(64);

    // The common case is that all four bytes are present, so if we have byte4
    // we can skip over the truncated input special case handling.
    if (byte4 === 64) {
      if (byte1 === -1) {
        return;  // Terminal case: no input left to decode.
      }
      // Here we know an intermediate number of bytes are missing.
      // The defaults for byte2, byte3 and byte4 apply the inferred padding
      // rules per the public API documentation. i.e: 1 byte
      // missing should yield 2 bytes of output, but 2 or 3 missing bytes yield
      // a single byte of output. (Recall that 64 corresponds the padding char).
    }

    const outByte1 = (byte1 << 2) | (byte2 >> 4);
    pushByte(outByte1);

    if (byte3 != 64) {
      const outByte2 = ((byte2 << 4) & 0xF0) | (byte3 >> 2);
      pushByte(outByte2);

      if (byte4 != 64) {
        const outByte3 = ((byte3 << 6) & 0xC0) | byte4;
        pushByte(outByte3);
      }
    }
  }
}

/**
 * Lazy static initialization function. Called before
 * accessing any of the static map variables.
 */
function init() {
  if (charToByteMap) {
    return;
  }
  charToByteMap = {};

  // We want quick mappings back and forth, so we precompute encoding maps.

  /** @type {!Array<string>} */
  const commonChars = DEFAULT_ALPHABET_COMMON.split('');
  const specialChars = [
    '+/=',  // DEFAULT
    '+/',   // NO_PADDING
    '-_=',  // WEBSAFE
    '-_.',  // WEBSAFE_DOT_PADDING
    '-_',   // WEBSAFE_NO_PADDING
  ];

  for (let i = 0; i < 5; i++) {
    // `i` is each value of the `goog.crypt.base64.Alphabet` enum
    const chars = commonChars.concat(specialChars[i].split(''));

    // Sets byte-to-char map
    byteToCharMaps[/** @type {!Alphabet} */ (i)] = chars;

    // Sets char-to-byte map
    for (let j = 0; j < chars.length; j++) {
      const char = chars[j];

      const existingByte = charToByteMap[char];
      if (existingByte === undefined) {
        charToByteMap[char] = j;
      } else {
        asserts.assert(existingByte === j);
      }
    }
  }
}

exports = {
  Alphabet,
  ENCODED_VALS,
  ENCODED_VALS_WEBSAFE,
  decodeString,
  decodeStringToByteArray,
  decodeStringToUint8Array,
  decodeStringUtf8,
  decodeToBinaryString,
  decodeToText,
  encodeBinaryString,
  encodeByteArray,
  encodeString,
  encodeStringUtf8,
  encodeText,
};
