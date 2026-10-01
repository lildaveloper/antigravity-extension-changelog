/** @fileoverview Implements special message construction utilities. */

goog.module('jspb.internal.transfer_array');

const {ByteString} = goog.require('jspb.bytestring');
const {DEFAULT_ARRAY_STATE} = goog.require('jspb.internal_array_state');
const {DESTROYED} = goog.require('jspb.internal_symbols');
const {cloneJspbArray, cloneRaw, convertToJsonFormat} = goog.require('jspb.internal_copy');

/** @type {boolean} */
let destroyTransferredArrays = goog.DEBUG;

/** @type {!WeakMap<?, ?>|undefined} */
let immutablyTransferredArrays = goog.DEBUG ? new WeakMap() : undefined;

/** @type {!WeakSet<?>|undefined} */
let allDestroyedArrays = goog.DEBUG ? new WeakSet() : undefined;

/** Reset the destroy status, for testing only. */
function setDestroyTransferredArraysForTesting(/** boolean */ destroy) {
  destroyTransferredArrays = destroy;
  if (!immutablyTransferredArrays && destroy) {
    immutablyTransferredArrays = new WeakMap();
    allDestroyedArrays = new WeakSet();
  } else if (!destroy) {
    immutablyTransferredArrays = undefined;
    allDestroyedArrays = undefined;
  }
}

/**
 * Constructs a JSPB message from an array directly **and marks it as owned**.
 *
 * In order to ensure this operation is "safe", in debug we have std::move-like
 * semantics in which it destroys the existing array.
 *
 * @param {!Array<?>} array Our serialized data.
 * @param {boolean} mutable whether we have transferred to a mutable instance.
 * @return {!Array<?>}
 */
function transferArray(array, mutable) {
  if (!mutable && immutablyTransferredArrays?.has(array)) {
    return immutablyTransferredArrays.get(array);
  } else if (allDestroyedArrays?.has(array)) {
    throw new Error('this array was already transferred');
  }
  if (!Array.isArray(array)) {
    throw goog.DEBUG ? new Error('must be an array') : new Error();
  }
  if (Object.isFrozen(array) || Object.isSealed(array) ||
      !Object.isExtensible(array)) {
    throw goog.DEBUG ?
        new Error('arrays passed to jspb constructors must be mutable') :
        new Error();
  }

  // If we are in DEBUG, we ensure that external code now cannot use the array,
  // so as to implement std::move-like "transfer" semantics.
  if (destroyTransferredArrays) {
    // If this is an immutable transfer, clone and replace any transferred
    // substructures, since all values involved are immutable and can be
    // logically shared. In the mutable case, just clone.
    const newArray = mutable ? cloneRaw(array) :
                               cloneAndReuseTransferredImmutableValues(array);

    // Make the original array unusable. In the case of an immutable transfer,
    // we will have copied already immutably transferred substructures, so we
    // need to skip them during destruction.
    makeArrayUnusable(array);
    return /** @type {!Array<?>} */ (newArray);
  }
  return array;
}

/**
 * Makes a value unusable.
 *
 * This checks that a mutable value will not be accessed again.
 *
 * @param {?} value
 */
function makeValueUnusable(value) {
  if (value == null) return;
  if (Array.isArray(value)) {
    makeArrayUnusable(value);
  } else if (typeof value === 'object') {
    if (value instanceof ByteString) {
      return;
    }
    makeObjectUnusable(/** @type {!Object} */ (value));
  }
}

/** @type {!Object|undefined} */
let badPrototype;

if (destroyTransferredArrays && (typeof Proxy !== 'undefined')) {
  const /** ? */ untypedHandlerMethod = dontUseThisItBelongsToJspb;
  badPrototype = new Proxy({}, {
    getPrototypeOf: untypedHandlerMethod,
    setPrototypeOf: untypedHandlerMethod,
    isExtensible: untypedHandlerMethod,
    preventExtensions: untypedHandlerMethod,
    getOwnPropertyDescriptor: untypedHandlerMethod,
    defineProperty: untypedHandlerMethod,
    has: untypedHandlerMethod,
    get: untypedHandlerMethod,
    set: untypedHandlerMethod,
    deleteProperty: untypedHandlerMethod,
    // We intentionally skip the ownKeys handler due to
    // https://bugs.chromium.org/p/chromium/issues/detail?id=1362010
    // ownKeys: untypedHandlerMethod,
    apply: untypedHandlerMethod,
    construct: untypedHandlerMethod,
  });
}

/**
 * Makes an array unusable.
 *
 * This checks that an array will not be accessed again.
 *
 * @param {!Array<?>} array Our serialized data.
 */
function makeArrayUnusable(array) {
  if (allDestroyedArrays.has(array)) return;
  allDestroyedArrays.add(array);

  for (let i = 0; i < array.length; i++) {
    makeValueUnusable(array[i]);
  }

  // If this array was already frozen, not much more we can do.
  if (!Object.isExtensible(array)) {
    throw new Error('cannot transfer a frozen or sealed array');
  }

  // Type cast to prevent jsc from preventing property assignments.
  const arrayAsObject = /** @type {!Object} */ (array);

  // Make sure any callers are aware of this change.
  array.length = 1;
  array[0] = dontUseThisItBelongsToJspb;
  arrayAsObject['toJSON'] = dontUseThisItBelongsToJspb;
  if (badPrototype) {
    Object.setPrototypeOf(arrayAsObject, badPrototype);
  }
  Object.freeze(array);
}

/**
 * Makes an object unusable.
 *
 * This ensures that an object will not be accessed again.
 *
 * @param {!Object} obj
 */
function makeObjectUnusable(obj) {
  for (const k in obj) {
    const value = obj[k];
    if (obj.hasOwnProperty(k)) {
      delete obj[k];
      makeValueUnusable(value);
    }
  }

  // Make sure any callers are aware of this change.
  Object.defineProperty(
      obj, 'dontUseThisItBelongsToJspb',
      {enumerable: true, get: dontUseThisItBelongsToJspb});
  obj['toJSON'] = dontUseThisItBelongsToJspb;
  if (badPrototype) {
    Object.setPrototypeOf(obj, badPrototype);
  }
  Object.freeze(obj);
}

/**
 * Indicates that this array has been "moved" to be owned by the JSPB runtime
 * and should NOT be reused.
 * @return {boolean}
 */
function dontUseThisItBelongsToJspb(
    /** ?= */ targetIfGetterOrHasser, /** ?= */ propIfGetterOrHasser) {
  if (goog.DEBUG) {
    // If this is a `get` or `has` handler we will get DESTROYED here. This is
    // an unforgeable unique symbol so it's OK to test against.
    if (propIfGetterOrHasser === DESTROYED) return true;
    throw new Error(
        'this array or object is owned by JSPB and should not be reused, ' +
        'did you mean to copy it with copyJspbArray? ' +
        'See go/jspb-api-gotchas#construct_from_array');
  }

  // No message otherwise
  throw new Error();
}

/**
 * Transfers ownership of a Uint8Array to the caller.
 *
 * In production, this does nothing except throw if the value is not a
 * Uint8Array.
 *
 * In debug, this will copy the array and then rewrite it with random data to
 * prevent callers from reusing it. It also patches on a broken prototype which
 * will cause most methods to throw (even instanceof), which should further
 * inhibit dependencies even if callers are not dependent on specific values.
 *
 * @return {!Uint8Array}
 */
function transferUint8Array(
    /** !Uint8Array */ u8,
    /** boolean= */ dontDestroyBuffer = false) {
  if (!(u8.constructor === Uint8Array && u8 instanceof Uint8Array)) {
    throw goog.DEBUG ? new Error('must be a native Uint8Array') : new Error();
  }

  if (destroyTransferredArrays) {
    if (allDestroyedArrays.has(u8)) {
      throw new Error('this array was already transferred');
    }
    let cloned;
    if (dontDestroyBuffer && (Math.random() < 0.5)) {
      // If we aren't destroying the buffer, make reliance on
      // effects or non-effects 50% flaky.
      cloned = new Uint8Array(u8.buffer, u8.byteOffset, u8.length);
    } else {
      cloned = new Uint8Array(u8);
      allDestroyedArrays.add(u8);
    }
    if (destroyTransferredArrays) {
      // Unfortunately Object.freeze is not allowed on Uint8Array but we'll
      // do the best we can.
      if (!dontDestroyBuffer) {
        const v = Math.trunc(Math.random() * 256);
        for (let i = 0; i < u8.length; i++) {
          u8[i] = v;
        }
      }
      u8.constructor = null;
      if (badPrototype) Object.setPrototypeOf(u8, badPrototype);
    }
    return cloned;
  }

  return u8;
}

/**
 * Clones an object and reuses original immutable arrays for any substructures
 * if this is an immutable transfer.
 *
 * @param {!Array} array The array to clone and untransfer.
 * @return {*}
 */
function cloneAndReuseTransferredImmutableValues(array) {
  // Short-circuit if we have already transferred this array.
  if (immutablyTransferredArrays.has(array)) {
    return immutablyTransferredArrays.get(array);
  }

  const result = cloneJspbArray(array, DEFAULT_ARRAY_STATE, (v) => {
    let originalIfAlreadyTransferred = immutablyTransferredArrays.get(v);
    if (originalIfAlreadyTransferred) return originalIfAlreadyTransferred;
    if (isTransferredArray(v)) throw new Error('already transferred');
    if (Array.isArray(v)) return cloneAndReuseTransferredImmutableValues(v);
    return v;
  });

  immutablyTransferredArrays.set(array, result);
  return result;
}

/** @return {boolean} */
function isTransferredArray(/** ? */ array) {
  return destroyTransferredArrays && array != null &&
      typeof array === 'object' && allDestroyedArrays.has(array);
}

/**
 * Returns a copy of the given array even if it or any substructure has been
 * immutably transferred.
 *
 * @return {!Array<?>}
 */
function clonePossiblyTransferredMessageArray(/** !Array<?> */ array) {
  if (immutablyTransferredArrays?.has(array)) {
    array = immutablyTransferredArrays.get(array);
  }
  return cloneJspbArray(array, DEFAULT_ARRAY_STATE, (v) => {
    if (immutablyTransferredArrays?.has(v) || Array.isArray(v)) {
      return clonePossiblyTransferredMessageArray(/** @type {!Array<?>} */ (v));
    }
    return convertToJsonFormat(v);
  });
}

exports = {
  clonePossiblyTransferredMessageArray,
  isTransferredArray,
  transferArray,
  transferUint8Array,
  setDestroyTransferredArraysForTesting,
};
