/**
 * @fileoverview Additional utilities needed for j2cl compatibility.
 * @package
 *
 * DO NOT USE THIS OUTSIDE OF THIS PACKAGE.
 */
goog.module('jspb.internal_j2cl_helpers');

const {ArrayStateFlags} = goog.require('jspb.internal_array_state');
const {ByteString} = goog.require('jspb.bytestring');
const {CACHED_HASH_CODE_SYMBOL} = goog.require('jspb.internal_symbols');
const {InternalMap, InternalMessage, getInternalArrayInline, hasOwnPropertyIfNotTrusted, isImmutableMessage, isMap, isMessage, isSparseObject} = goog.require('jspb.internal');
const {fail} = goog.require('goog.asserts');

// This is computed lazily to avert the kix snapshot determinism tests.
let /** number|undefined */ randomHashAddition;

/** @return {number} */
function getRandomHashAddition() {
  return randomHashAddition ??=
             (goog.DEBUG ? Math.floor(Math.random() * 1000) : 1);
}

/**
 * Caches a hashCode on an object.
 *
 * @param {T} value
 * @param {function(T): number} compute
 * @template T
 * @return {number}
 */
function cachedHashOrElse(value, compute) {
  return value[CACHED_HASH_CODE_SYMBOL] ??= compute(value);
}

/**
 * Computes a JVM-style hash code for the given string. Returns an int32.
 *
 * @param {string} value
 * @return {number}
 * @nosideeffects
 */
function hashString(value) {
  let hashValue = 1;
  let stringLength = value.length;

  // Strip off padding for base64 comparisons.
  for (let lastChar = value[stringLength - 1];
       lastChar === '=' || lastChar === '.';
       lastChar = value[--stringLength - 1]) {
  }

  // Process batches of 4 characters at a time and add them to the hash
  // coercing to 32 bits
  const stringBatchLength = stringLength - 4;
  let i = 0;
  while (i < stringBatchLength) {
    hashValue = (value.charCodeAt(i) + 31 * hashValue) | 0;
    hashValue = (value.charCodeAt(i + 1) + 31 * hashValue) | 0;
    hashValue = (value.charCodeAt(i + 2) + 31 * hashValue) | 0;
    hashValue = (value.charCodeAt(i + 3) + 31 * hashValue) | 0;
    i += 4;
  }

  // Now process the leftovers
  while (i < stringLength) {
    hashValue = (value.charCodeAt(i++) + 31 * hashValue) | 0;
  }
  return hashValue;
}

/**
 * @param {!Array<?>} arr
 * @return {number}
 * @nosideeffects
 */
function hashArray(arr) {
  // Empty arrays **must** hash to zero since they could be an empty
  // repeated or map field.
  let hash = 0;
  const length = arr.length;
  for (let i = 0; i < length; i++) {
    const value = arr[i];
    if ((i === length - 1) && isSparseObject(value)) {
      // Find all numeric keys in the extension object.
      for (const k in value) {
        const numericKey = +k;
        if (hasOwnPropertyIfNotTrusted(value, k) && !Number.isNaN(numericKey)) {
          hash = (hash + hashCodeInternal(value[k])) | 0;
        }
      }
    } else {
      hash = (hash + hashCodeInternal(value)) | 0;
    }
  }
  // The choice of 17 here is arbitrary, it is just a small prime so that we
  // distinguish levels of nesting in our hashes.
  return (hash * 17) | 0;
}


/**
 * Computes a JVM-style hash code for the given ByteString.
 *
 * @param {!ByteString} value
 * @return {number}
 */
function hashByteString(value) {
  return hashString(value.asBase64());
}

/**
 * Computes a JVM-style hash code for the given Message.
 *
 * @param {!InternalMessage} value
 * @return {number}
 */
function hashMessage(value) {
  return hashArray(getInternalArrayInline(value));
}

/**
 * Computes a JVM-style hash code for the given Map.
 *
 * These hash codes necessarily match those for unconstructed maps (and array
 * of arrays), which is why we use an expensive spread of entries().
 *
 * NOTE: this implementation is fundamentally broken because unconstructed
 * maps may have duplicate keys or other deltas from this implementation that
 * change the hash value; but this is about as good as we can do, and is
 * at least as correct as Message.equals.
 *
 * @param {!ReadonlyMap<?, ?>} value
 * @return {number}
 */
function hashMap(value) {
  return hashArray([...value.entries()]);
}

const /** number */ TRUE_HASH = /** @pureOrBreakMyCode */ (hashString('1'));
const /** number */ FALSE_HASH = /** @pureOrBreakMyCode */ (hashString('0'));

/**
 * Returns a consistent hash code for the given value.
 *
 * @package
 * @param {number|string|boolean|null|undefined|!Array|!ByteString|!InternalMessage|!InternalMap}
 *     value
 * @return {number}
 * @suppress {visibility} access to map internals.
 */
function hashCodeInternal(value) {
  if (value == null) return 0;
  switch (typeof value) {
    case 'boolean':
      return value ? TRUE_HASH : FALSE_HASH;
    case 'string':
      return hashString(value);
    case 'object':
      if (Array.isArray(value)) {
        return hashArray(value);
      } else if (isMessage(value)) {
        const asMessage = /** @type {!InternalMessage} */ (value);
        return isImmutableMessage(asMessage) ?
            cachedHashOrElse(asMessage, hashMessage) :
            hashMessage(asMessage);
      } else if (isMap(value)) {
        const asMap =
            /** @type {!ReadonlyMap<?, ?>} */ (/** @type {?} */ (value));
        return (/** @type {!InternalMap} */ (value).arrayState &
                ArrayStateFlags.IS_IMMUTABLE_ARRAY) ?
            cachedHashOrElse(asMap, hashMap) :
            hashMap(asMap);
      } else if (value instanceof ByteString) {
        return cachedHashOrElse(
            /** @type {!ByteString} */ (value), hashByteString);
      } else {
        fail(
            'unknown object %s with ctor %s in Message array', value,
            value.constructor);
      }
    default:
  }
  // Usually a `number`.
  return hashString(String(value));
}

/**
 * Returns a consistent int32 hash code for the given value.
 *
 * @package
 * @param {number|string|boolean|null|undefined|!Array|!ByteString|!InternalMessage|!InternalMap}
 *     value
 * @return {number}
 */
function hashCode(value) {
  // Note that we need another |0 after adding the hash addition.
  return (hashCodeInternal(value) + getRandomHashAddition()) | 0;
}

/** @const {(function(?): number)|undefined} */
const hashCodeInternalForTesting = goog.DEBUG ? hashCodeInternal : undefined;

exports = {
  hashCode,
  hashCodeInternalForTesting,
};
