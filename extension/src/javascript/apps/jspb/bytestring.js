/**
 * @fileoverview ByteString class for encapsulating bytes fields.
 */

goog.module('jspb.bytestring');

const {I_AM_INTERNAL, SUPPORTS_STRUCTURED_CLONE, dataAsU8, encodeByteArray, uint8ArrayEquals} = goog.require('jspb.internal_bytes');
const {assert, assertExists, assertInstanceof, assertNumber, assertString} = goog.require('goog.asserts');
const {decodeUtf8, encodeUtf8} = goog.require('jspb.binary.utf8');

/**
 * Encapsulation of a bytes field.
 *
 * Use the factory methods below to construct a ByteString.
 *
 * @final
 * @struct
 */
class ByteString {

  /**
   * Constructs a ByteString instance from a base64 string, per RFC 4648 section
   * 4.
   * @return {!ByteString}
   */
  static fromBase64(/** string */ value) {
    assertString(value);
    return value ? new ByteString(value, I_AM_INTERNAL) : ByteString.empty();
  }

  /**
   * Constructs a ByteString from a Uint8Array or Array of numbers.
   *
   * Makes a copy of the parameter.
   *
   * When passed an array of numbers, values will be truncated to be integers
   * and then their value mod 2^8 will be preserved.
   *
   * See https://tc39.es/ecma262/multipage/abstract-operations.html#sec-touint8
   *
   * @return {!ByteString}
   */
  static fromUint8Array(/** !Uint8Array|!Array<number> */ value) {
    assert(value instanceof Uint8Array || Array.isArray(value));
    return value.length ? new ByteString(new Uint8Array(value), I_AM_INTERNAL) :
                          ByteString.empty();
  }

  /**
   * Constructs a ByteString from an Uint8Array by transferring it.
   *
   * See
   * https://developer.mozilla.org/en-US/docs/Glossary/Transferable_objects#transferring_during_a_cloning_operation
   * for a definition.
   *
   * This means no copy is made, and the passed in reference will become empty.
   *
   * This method is `async` but should generally be quite fast with just one or
   * two ticks for the promise to resolve.  The implementation depends on the
   * particular browser APIs that are available so no performance guarantees can
   * be offered, however, in general this is only valuable for 'larger' buffers
   * (>1K).
   *
   * If you cannot tolerate async, consider using
   * `transferUint8ArrayToByteString` from `transfer_uint8array.ts` instead,
   * though note that it is not as safe against mutations of the underlying
   * data, and its attempted destruction of the original array in DEBUG mode is
   * not total.
   *
   * BROWSER COMPATIBILITY WARNING:
   * - This function does not work in Internet Explorer (any version)
   *    - The root issue is a failure to adhere to the MessagePort standard see
   * https://docs.microsoft.com/en-us/openspecs/ie_standards/ms-webmsg/5ea08d27-1111-1111-8459-7772c6694439
   * - This function does not support node versions < 15 because the
   * MessageChannel API was not implemented
   *
   * @return {!Promise<!ByteString>}
   */
  static async fromTransferredUint8Array(/** !Uint8Array */ array) {
    assertInstanceof(array, Uint8Array);
    return array.length ?
        new ByteString(
            await structuredClonePonyfill(array, [array.buffer]),
            I_AM_INTERNAL) :
        ByteString.empty();
  }

  /**
   * Encodes `text` into a sequence of UTF-8 bytes and returns the result as a
   * `ByteString`.
   * @return {!ByteString}
   */
  static fromStringUtf8(/** string */ text) {
    assertString(text);
    return text.length ?
        new ByteString(
            encodeUtf8(text, /* rejectUnpairedSurrogates=*/ true),
            I_AM_INTERNAL) :
        ByteString.empty();
  }

  /**
   * Constructs a ByteString from a Blob.
   *
   * It is async because Blob does not provide sync access to its data.
   *
   * BROWSER COMPATIBILITY WARNING:
   * This method uses Blob.arrayBuffer() to access Blob's content and therefore
   * is compatible with browsers supporting this API, which is any release 2021
   * and later. See http://go/mdn/API/Blob/arrayBuffer for the full
   * compatibility list.
   * @return {!Promise<!ByteString>}
   */
  static async fromBlob(/** !Blob */ blob) {
    assertInstanceof(blob, Blob);
    if (blob.size === 0) return ByteString.empty();
    const data = await blob.arrayBuffer();
    return new ByteString(new Uint8Array(data), I_AM_INTERNAL);
  }

  /**
   * Returns the empty ByteString.
   * @return {!ByteString}
   */
  static empty() {
    return emptyByteString ||
        (emptyByteString = new ByteString(null, I_AM_INTERNAL));
  }

  /**
   * Returns this ByteString as a base64 encoded string, per RFC 4648 section 4.
   * @return {string}
   */
  asBase64() {
    const value = this.value_;
    if (value == null) {
      return '';
    }
    if (typeof value === 'string') {
      return value;
    }
    return this.value_ = encodeByteArray(value);
  }

  /**
   * Returns this ByteString as a Uint8Array. This makes a copy and returns a
   * new Uint8Array.
   * @return {!Uint8Array}
   */
  asUint8Array() {
    return new Uint8Array(this.internalBytesUnsafe(I_AM_INTERNAL) || 0);
  }

  /**
   * Returns true if the ByteString is empty.
   * @return {boolean}
   */
  isEmpty() {
    return this.value_ == null;
  }

  /**
   * Returns the size of the byte string in bytes.
   *
   * If you are only interested in whether or not the ByteString is empty, call
   * `isEmpty` which is always faster.
   *
   * @return {number}
   */
  sizeBytes() {
    const bytes = this.internalBytesUnsafe(I_AM_INTERNAL);
    return bytes ? bytes.length : 0;
  }

  /**
   * Returns the numeric value of the _unsigned_ byte at the given index.
   * @return {number}
   */
  unsignedByteAt(/** number */ index) {
    assertNumber(index);
    assert(index >= 0, 'index %s should be non-negative', index);
    const bytes = this.internalBytesUnsafe(I_AM_INTERNAL);
    assert(
        index < bytes.length, 'index %s must be less than %s', index,
        bytes.length);
    return bytes[index];
  }

  /**
   * Returns the numeric value of the byte at the given index as a _signed_ byte
   * value in the range [-128,127]
   * @return {number}
   */
  signedByteAt(/** number */ index) {
    const unsignedByte = this.unsignedByteAt(index);
    // Bit operators are 'signed 32 bit' operators by default.
    // First left shift so the sign-bit if it exists is in the 32 bit signed
    // location
    // Then, right shift back into the lower 8 bits to recover the now signed
    // value.
    return (unsignedByte << 24) >> 24;
  }

  /**
   * Returns a string by decoding the bytes as UTF-8.
   * @param {{parsingErrorsAreFatal:boolean}=} opts an options bag.  The
   *     `parsingErrorsAreFatal` option controls if invalid utf8 bytes should be
   *     a runtime error (if `true`) or if they should be replaced with the
   *     replacement character `\ufffd` (if `false`), the default is to throw.
   * @return {string}
   */
  asStringUtf8({parsingErrorsAreFatal = true} = {}) {
    const bytes = this.internalBytesUnsafe(I_AM_INTERNAL);
    return bytes ? decodeUtf8(bytes, 0, bytes.length, parsingErrorsAreFatal) :
                   '';
  }

  /**
   * Returns the field as a Blob. This is a copy of the internal data.
   *
   * @param {?BlobPropertyBag=} options An object which may specify Blob
   *     properties.
   * @return {!Blob}
   */
  asBlob(options) {
    const bytes = this.internalBytesUnsafe(I_AM_INTERNAL);
    return bytes ? new Blob([bytes], options) : new Blob([], options);
  }

  /**
   * Returns the internals as a unint8array or a base64 encoded string
   *
   * This operation is only useful for legacy usecases and explicit typed access
   * via `asBase64` or `asStringUtf8` or `asUint8Array` should be strongly
   * preferred.
   *
   * @return {!Uint8Array|string}
   */
  legacyUnwrap() {
    const v = this.value_ || '';
    return typeof v === 'string' ? v : new Uint8Array(v);
  }

  /**
   * Returns whether this ByteString is equivalent to another.
   *
   * This is called equalsByteString to make property disambiguation easier, and
   * to support potential addition of equalsB64 and equalsU8.
   *
   * @param {!ByteString} other another ByteString
   * @return {boolean} whether these ByteStrings are equivalent.
   */
  equalsByteString(other) {
    assertInstanceof(other, ByteString);

    // First try ===, which will be faster than other equality mechanisms.
    if (!this.value_ || !other.value_ || this.value_ === other.value_) {
      return this.value_ === other.value_;
    }

    // If this both are strings, we need to compare byte-by-byte. According to
    // go/jspb-wire-format-details#bytes they must both be DEFAULT-alphabet
    // base64 strings but may or may not have padding.
    if (((typeof this.value_) === 'string') &&
        ((typeof other.value_) === 'string')) {
      let longer = this.value_;
      let shorter = other.value_;
      if (other.value_.length > this.value_.length) {
        shorter = this.value_;
        longer = other.value_;
      }

      // TODO(b/219090321): inline goog.string.startsWith once YT's force_rtl
      // doesn't fail on a changed load order.
      if (longer.lastIndexOf(shorter, 0) !== 0) {
        return false;
      }

      // The remaining characters should be padding.
      for (let i = shorter.length; i < longer.length; i++) {
        if (longer[i] !== '=') {
          return false;
        }
      }
      return true;
    }

    // Otherwise, we convert to Uint8Array and compare that way. It is typically
    // faster to base64-encode; but that can significantly increase GC pressure.
    const thisUint8Array =
        assertExists(this.internalBytesUnsafe(I_AM_INTERNAL));
    const otherUint8Array =
        assertExists(other.internalBytesUnsafe(I_AM_INTERNAL));
    return uint8ArrayEquals(thisUint8Array, otherUint8Array);
  }

  /**
   * Internal only for access to the bytes in a zero copy fashion.
   *
   * See `unsafe_bytestring.js` for how to access this API.
   * @param {*} areYouInternal
   * @return {?Uint8Array}
   * @package
   */
  internalBytesUnsafe(areYouInternal) {
    checkAllowedCaller(areYouInternal);
    const u8 = dataAsU8(this.value_);
    return (u8 == null) ? u8 : (this.value_ = u8);
  }

  /**
   * Internal only for access to the internals state of the bytestring, in a
   * zero copy fashion.
   *
   * See `unsafe_bytestring.js` for how to access this API.
   * @param {*} areYouInternal
   * @return {string|!Uint8Array}
   * @package
   */
  internalUnwrap(areYouInternal) {
    checkAllowedCaller(areYouInternal);
    return this.value_ || '';
  }

  /**
   * An internal only method for comparing this bytestring with an unknown
   * value.
   * @private should be package but since TS doesn't support that we need to use
   *     private
   * @return {boolean}
   */
  internalCompareEqualsDoNotUse(/** ? */ value) {
    let /**!ByteString*/ other;
    if (typeof value === 'string') {
      other = ByteString.fromBase64(value);
    } else if (value instanceof Uint8Array) {
      // zero copy is ok since this is a temporary.  If we ever start
      // returning the bytestring we should copy
      other = new ByteString(/** @type {!Uint8Array} */ (value), I_AM_INTERNAL);
    } else if (value instanceof ByteString) {
      other = value;
    } else {
      return false;
    }
    return this.equalsByteString(other);
  }

  /**
   * INTERNAL USE ONLY: Clients should use the factory functions above.
   * @param {!Uint8Array|string|null} value Base64 string or Uint8Array. If
   *     null, this is an empty array.
   * @param {*} areYouInternal
   * @package
   */
  constructor(value, areYouInternal) {
    checkAllowedCaller(areYouInternal);

    /**
     * This value is either a Uint8Array or a string, or else `null` for an
     * empty byte string.
     *
     * @private {!Uint8Array|string|null}
     */
    this.value_ = value;

    if (value != null && value.length === 0) {
      throw new Error('ByteString should be constructed with non-empty values');
    }

    // Prevent passing ByteStrings to structured clone interfaces.
    if (goog.DEBUG) {
      /** @type {!Object} */ (this)['dontPassByteStringToStructuredClone'] =
          dontPassByteStringToStructuredClone;
    }
  }
}


/** @type {!ByteString|undefined} */
let emptyByteString;

/**
 * @param {*} areYouInternal
 */
function checkAllowedCaller(areYouInternal) {
  if (areYouInternal !== I_AM_INTERNAL) {
    throw new Error('illegal external caller');
  }
}

/**
 * @param {T} obj
 * @param {!Array<!Transferable>} transfer
 * @return {!Promise<T>}
 * @template T
 */
async function structuredCloneBasedOnMessageChannel(obj, transfer) {
  return new Promise((resolve, reject) => {
    const channel = new MessageChannel();
    channel.port2.onmessage = (/** !MessageEvent<*> */ e) => {
      resolve(e.data);
    };
    try {
      channel.port1.postMessage(obj, transfer);
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * @param {T} obj
 * @param {!Array<!Transferable>} transfer
 * @return {!Promise<T>}
 * @template T
 */
const structuredClonePonyfill =
    // It is kind of weird to target the future, but all the browsers that we
    // track with featureset year have already released this feature in 2022 so
    // it should be safe to rely on come 2023.
    SUPPORTS_STRUCTURED_CLONE ?
    (obj, transfer) =>
        Promise.resolve(structuredClone(obj, {'transfer': transfer})) :
    structuredCloneBasedOnMessageChannel;


/**
 * Indicates to J2CL that equals and hashCode should be available.
 *
 * @private will only be called via interface from j2cl
 * @const {*}
 */
ByteString.prototype.equalsAndHashCodeShouldBeAvailable = 1;

/**
 * Set as a property of the ByteString to prevent passing it over a
 * structured clone interface, which will break and cannot be made to work.
 *
 * If you need to use postMessage etc. with Apps JSPB, please transmit byte
 * strings via base64 (`.asBase64`) or as a `Uint8Array` (`.asUint8Array`).
 */
function dontPassByteStringToStructuredClone() {}


exports = {ByteString};
