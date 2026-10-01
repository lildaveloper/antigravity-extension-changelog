/**
 * @fileoverview Common low level runtime utilities.
 */
goog.module('jspb.internal');

const {ArrayState, ArrayStateFlags, addArrayStateFlags, getArrayIndexOffset, getArrayState, getMessageArrayState, hasFlagBit, setArrayState} = goog.require('jspb.internal_array_state');
const {ByteString} = goog.require('jspb.bytestring');
const {DESTROYED, HAS_NATIVE_SYMBOL, MESSAGE_PROTOTYPE_MARKER, WithMessagePrototypeMarker} = goog.require('jspb.internal_symbols');
const {DETAILED_JSPB_ASSERTS} = goog.require('jspb.internal_options');
const {ENABLE_ASSERTS, assert, assertArray, assertExists, assertInstanceof, assertNumber, fail} = goog.require('goog.asserts');
const {dataAsU8, isU8} = goog.require('jspb.internal_bytes');
const {unsafeUnwrapByteString} = goog.require('jspb.unsafe_bytestring');

/**
 * Inner interface of the structure of a Message.
 *
 * <p>This can contain whatever we need in order to move functionality into this
 * file and out of message.js.  Because of the `exports` in message.js all
 * functionality needs to be exposed as properties on `Message`, as such it will
 * be inherited by es6 subclasses due to static-side inheritance.  To avoid that
 * internal functionality should be moved here.
 *
 * @interface
 * @extends {WithMessagePrototypeMarker}
 */
class InternalMessage {
  constructor() {
    /**
     * @private {!Array<*>}
     */
    this.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows;

    /**
     * This flag indicates that the message is mutable but the array is
     * immutable and we should copy it if we need to mutate.
     *
     * @private {!PrivateOptionToken|undefined}
     */
    this.copyOnWrite;

    /**
     * This flag indicates getters should always return `undefined` instead of
     * `null`. We use this to preserve behavior of messages that are the result
     * of copies when we take the copy-on-write path. Without copy-on-write,
     * the copy routine always turns `null` into `undefined`.
     *
     * @private {!PrivateOptionToken|undefined}
     */
    this.noLegacyNull;
  }

  /** @return {boolean} */
  isImmutable() {}

  /** @return {!Array<?>} */
  toJsonValue() {}

  /** @return {string|undefined} */
  getJsPbMessageId() {}

  /** @return {?} */
  getExtension(/** ? */ extensionFieldInfo) {}

  /** @return {number} */
  getExtensionCount(/** ? */ extensionFieldInfo) {}

  /** @return {boolean} */
  hasExtension(/** ? */ extensionFieldInfo) {}

  /** @return {?} */
  getReadonlyExtension(/** ? */ extensionFieldInfo) {}

  /** @return {?} */
  getExtensionAtIndex(/** ? */ extensionFieldInfo, /** number */ index) {}
}

const /** boolean */ USE_SYMBOL_FOR_INTERNAL_ARRAY =
    goog.DEBUG && HAS_NATIVE_SYMBOL && (Math.random() < 0.5);

const /** symbol|undefined */ INTERNAL_ARRAY_SYMBOL =
    USE_SYMBOL_FOR_INTERNAL_ARRAY ? Symbol() : undefined;

/**
 *
 * @param {!InternalMessage} msg The message to get the internal array from.
 * @return {!Array<*>} The internal array of the message.
 * @nosideeffects
 * @requireInlining
 */
function getInternalArrayInline(msg) {
  assert(isMessage(msg));
  if (USE_SYMBOL_FOR_INTERNAL_ARRAY) {
    return msg[assertExists(INTERNAL_ARRAY_SYMBOL)];
  } else {
    return msg.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows;
  }
}

/**
 *
 * @param {!InternalMessage} msg The message to get the internal array from.
 * @return {!Array<*>} The internal array of the message.
 * @nosideeffects
 */
function getInternalArray(msg) {
  return getInternalArrayInline(msg);
}

/**
 * Sets the internal array of the message.
 * @param {!InternalMessage} msg
 * @param {!Array<*>} array
 * @requireInlining
 */
function setInternalArrayForNewMessage(msg, array) {
  assert(isMessage(msg));
  assertArray(array);
  if (USE_SYMBOL_FOR_INTERNAL_ARRAY) {
    msg[assertExists(INTERNAL_ARRAY_SYMBOL)] = array;
  } else {
    msg.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows = array;
  }
}

/**
 * Sets the internal array of the message and clears copyOnWrite.
 * @param {!InternalMessage} msg
 * @param {!Array<*>} array
 * @requireInlining
 */
function setInternalArray(msg, array) {
  addArrayStateFlags(array, ArrayStateFlags.HAS_WRAPPER);
  setInternalArrayForNewMessage(msg, array);
  setCopyOnWrite(msg, false);
  setNoLegacyNull(msg, false);
}

/**
 * This exists only to define toMutable somewhere, so that internal_map can call
 * toMutable. Nothing actually references this interface. The use of toMutable
 * in internal_map is on a 'loose type', but if toMutable isn't defined anywhere
 * in the internal modules, the compiler thinks toMutable definitely doesn't
 * exist.
 *
 * We can't put toMutable in InternalMessage because in TS it would be treated
 * as public (even if marked protected), but Message wants to make toMutable
 * protected. TS would consider Message to not be assignable to InternalMessage
 * due to the visibility difference of toMutable.
 *
 * @interface
 */
class InternalImmutableMessage {
  /** @return {*} */
  toMutable() {}
}

/**
 * Inner interface of the structure of an ExtensionFieldInfo.
 *
 * @interface
 */
class InternalExtensionFieldInfo {
  constructor() {
    /** @const {number} */
    this.fieldIndex;

    /** @const {function(new: InternalMessage, ?Array=)|undefined} */
    this.extendeeCtor;

    /** @const {?function(new: InternalMessage, ?Array=)} */
    this.ctor;

    /** @const {number} */
    this.isRepeated;
  }
}

/** @type {?} */
let messageCtor;

function setMessageCtorInDebug(/** !Function */ ctor) {
  if (!goog.DEBUG) return;
  messageCtor = ctor;
}

/** @const {boolean} */
const MESSAGE_PROTOTYPE_MARKER_IS_SYMBOL =
    typeof MESSAGE_PROTOTYPE_MARKER === 'symbol';

/** @const {!Object} */
const MESSAGE_PROTOTYPE_MARKER_VALUE = {};

/**
 * Returns whether or not the object is a Message subtype.  This is intended to
 * be used for values found in the array/sparseObject of a jspb.Message.
 *
 * @param {!Object} v The value, callers should have already checked that it is
 *     non-null.
 * @return {boolean}
 * @tsType (v: Object): v is InternalMessage
 */
function isMessage(v) {
  const value = v[MESSAGE_PROTOTYPE_MARKER];
  const result = value === MESSAGE_PROTOTYPE_MARKER_VALUE;
  assert(!messageCtor || result === (v instanceof messageCtor));
  if (MESSAGE_PROTOTYPE_MARKER_IS_SYMBOL && value && !result) {
    if (goog.DEBUG) throw new Error('multiple jspb runtimes detected');
  }
  return result;
}

/**
 * Returns whether or not the value is a Message. Unlike isMessage, accepts all
 * inputs and doesn't throw on nullish values.
 *
 * @param {*} v
 * @return {boolean}
 * @tsType (v: unknown): v is InternalMessage
 */
function isInternalMessage(v) {
  return v != null && isMessage(/** @type {!Object} */ (v));
}

/** @const {!Object} */
const ANY_PROTOTYPE_MARKER_VALUE = {};

/**
 * Returns whether or not the object is an Any.
 *
 * This is defined to break dep cycles with our generated code.
 *
 * @param {!Object} v The value, callers should have already checked that it is
 *     non-null.
 * @return {boolean}
 */
function isAny(v) {
  const fn = /** @type {{jspbInternalDoNotUseAnyMarker: !Function}} */ (v)
                 .jspbInternalDoNotUseAnyMarker;
  if (typeof fn === 'function') {
    return fn() === ANY_PROTOTYPE_MARKER_VALUE;
  }
  return false;
}


/**
 * Inner interface of the structure of a Map.
 *
 * @interface
 */
class InternalMap {
  constructor() {
    /**
     * @private
     * @const {number}
     */
    this.arrayState;

    /**
     * @private
     * @const {!Object}
     */
    this.mapPrototypeMarker;
  }
}

/**
 * Interface used to define the serializeBinaryFnForAnyProto_ property used by
 * packAnyValueJspb.
 *
 * @interface
 */
class SerializeBinaryFnHolder {
  constructor() {
    /**
     * If this is an Any proto, this can store the serializeBinary function to
     * serialize the value to binary. See implementation of packAnyValueJspb.
     *
     * @type {(function(?):!Uint8Array)|undefined}
     */
    this.serializeBinaryFnForAnyProto_;
  }
}

/** @const {!Object} */
const MAP_PROTOTYPE_MARKER_VALUE = {};

/**
 * Returns whether or not the object is a JspbMap.
 *
 * Note that this is a property test instead of an `instanceof` check because
 * that is, curiously, about twice as fast.
 *
 * @param {!Object} v The value, callers should have already checked that it is
 *     non-null.
 * @return {boolean}
 * @suppress {visibility} access to map internals
 */
function isMap(v) {
  const result =
      !!(v && (typeof v === 'object') &&
         (/** @type {!InternalMap} */ (v).mapPrototypeMarker ===
          MAP_PROTOTYPE_MARKER_VALUE));
  assert(result === (v instanceof Map));
  return result;
}

/**
 * Returns whether or not the object is an empty JSPB map.
 *
 * This method is designed to avoid pinning the polyfill for maps.
 *
 * @param {!Object} v The value
 * @return {boolean}
 */
function isEmptyMap(v) {
  return isMap(v) && assertInstanceof(v, Map).size === 0;
}

/**
 * Returns the index into `internalArray_` at which the proto field with tag
 * number fieldNumber will be located.
 * @return {number}
 */
function indexFromFieldNumber(
    /** number */ fieldNumber, /** number */ arrayIndexOffset) {
  assertNumber(fieldNumber);
  assert(fieldNumber > 0);
  assert(arrayIndexOffset === 0 || arrayIndexOffset === -1);
  return fieldNumber + arrayIndexOffset;
}

/**
 * Returns the index into the array at which the proto field with tag
 * number fieldNumber will be located.
 * @return {number}
 */
function indexFromFieldNumberAndHasMessageId(
    /** number */ fieldNumber, /** !HasMessageId|undefined */ hasMessageId) {
  assert(hasMessageId === HAS_MESSAGE_ID || hasMessageId === NO_MESSAGE_ID);
  return fieldNumber + (hasMessageId ? 0 : -1);
}

/**
 * Returns the tag number based on the index in msg.array.
 * @return {number}
 */
function fieldNumberFromIndex(
    /** number */ index, /** number */ arrayIndexOffset) {
  assertNumber(index);
  assert(index >= 0);
  assert(arrayIndexOffset === 0 || arrayIndexOffset === -1);
  return index - arrayIndexOffset;
}

/**
 * Returns true if the provided message immutable.
 *
 * A message is immutable if and only if its array is immutable and it is not
 * copy-on-write.
 * @param {!InternalMessage} msg Message to check.
 * @param {!ArrayState=} arrayState message array state
 * @return {boolean}
 * @package
 */
function isImmutableMessage(msg, arrayState) {
  // use least expensive path based on already-read data
  if (arrayState === undefined) {
    return !isCopyOnWrite(msg) &&
        hasFlagBit(
            getMessageArrayState(getInternalArray(msg)),
            ArrayStateFlags.IS_IMMUTABLE_ARRAY);
  } else {
    assert(arrayState === getMessageArrayState(getInternalArray(msg)));
    return hasFlagBit(arrayState, ArrayStateFlags.IS_IMMUTABLE_ARRAY) &&
        !isCopyOnWrite(msg);
  }
}

class PrivateOptionToken {}

/** @const {!PrivateOptionToken} */
const PRIVATE_OPTION_TOKEN = /** @type {!PrivateOptionToken} */ ({});

/**
 * @param {!InternalMessage} msg
 * @return {boolean}
 */
function isCopyOnWrite(msg) {
  const value = msg.copyOnWrite;
  assert(
      !value ||
      hasFlagBit(
          getMessageArrayState(getInternalArray(msg)),
          ArrayStateFlags.IS_IMMUTABLE_ARRAY));
  assert(value === undefined || value === PRIVATE_OPTION_TOKEN);
  return value === PRIVATE_OPTION_TOKEN;
}

/**
 * @param {!InternalMessage} msg
 * @param {boolean} value
 */
function setCopyOnWrite(msg, value) {
  assert(
      value ===
      hasFlagBit(
          getMessageArrayState(getInternalArray(msg)),
          ArrayStateFlags.IS_IMMUTABLE_ARRAY));
  msg.copyOnWrite = value ? PRIVATE_OPTION_TOKEN : undefined;
}

/**
 * @param {!InternalMessage} msg
 * @return {boolean}
 */
function isNoLegacyNull(msg) {
  const value = msg.noLegacyNull;
  assert(value === undefined || value === PRIVATE_OPTION_TOKEN);
  return value === PRIVATE_OPTION_TOKEN;
}

/**
 * @param {!InternalMessage} msg
 * @param {boolean} value
 */
function setNoLegacyNull(msg, value) {
  msg.noLegacyNull = value ? PRIVATE_OPTION_TOKEN : undefined;
}

/**
 * Returns true if the provided argument is an extension object.
 *
 * Prior to calling this you should check that the element is the last item of
 * the owning array and that the array is the internalArray_ of a message
 * instance.
 *
 * @param {*} o The object to classify as array or not.
 * @return {boolean} True if the provided object is an extension object.
 * @requireInlining
 */
function isSparseObjectInline(o) {
  // Normal fields are never plain objects, so we can be sure that if we find an
  // object here, then it is the extension object.
  return o != null && typeof o === 'object' &&
      // Transferred arrays cannot be used as sparse objects. This allows us to
      // accurately walk partially transferred arrays in
      // internal_transfer_array.
      !(goog.DEBUG && /** @type {!Object} */ (o)[DESTROYED]) &&
      /** @type {!Object} */ (o).constructor === Object;
}

/**
 * Returns true if the provided argument is an extension object.
 *
 * Prior to calling this you should check that the element is the last item of
 * the owning array and that the array is the internalArray_ of a message
 * instance.
 *
 * @param {*} o The object to classify as array or not.
 * @return {boolean} True if the provided object is an extension object.
 */
function isSparseObject(o) {
  return isSparseObjectInline(o);
}

/**
 * Helper method to ensure that properties iterated with for-in loop come from
 * the object. If JS runs on a pages with other 3rd party code it's possible
 * that that code (e.g. prototype.js) patches native Object.prototype. Without
 * hasOwnProperty JSPB code might get broken by that. Most google code runs on
 * owned pages and it's very unlikely to get patched native prototype. So by
 * default this check always returns true. The check is only enabled when
 * goog.TRUSTED_SITE is set to false.
 *
 * @param {!Object} obj
 * @param {string} property
 * @return {boolean}
 */
function hasOwnPropertyIfNotTrusted(obj, property) {
  return goog.TRUSTED_SITE ||
      // Per http://jsben.ch/RIBNc this is the fastest way to call and is, as of
      // 2023 faster than Object.hasOwn.
      Object.prototype.hasOwnProperty.call(obj, property);
}


/**
 * A marker for JSPB subclasses which have been explicitly exempted from runtime
 * enforcement. See javascript/apps/jspb/exemptions/unsupported_subclass.js and
 * its callers.
 * @const {symbol|undefined}
 * @public because it is accessed by the 'exemptions' subpackage.
 */
const EXEMPTED_SUBCLASS_MARKER = ENABLE_ASSERTS ?
    Symbol(goog.DEBUG ? 'exempted jspb subclass' : undefined) :
    undefined;

/**
 * A marker added to all generated JSPB subclasses so the runtime can verify
 * expected subclasses.
 *  @const {symbol|undefined}
 */
const GENERATED_SUBCLASS_MARKER = ENABLE_ASSERTS ?
    Symbol(goog.DEBUG ? 'generated by jspb' : undefined) :
    undefined;


/**
 * Coerce a 'bytes' field to a Uint8Array byte buffer.
 * Note that Uint8Array is not supported on IE versions before 10 nor on Opera
 * Mini. @see http://caniuse.com/Uint8Array
 * @param {string|!Uint8Array|!ByteString|null} value
 * @return {?Uint8Array} The field's coerced value.
 */
function bytesAsU8(value) {
  return dataAsU8(
      /** @type {string|?Uint8Array} */ (maybeUnsafeUnwrapByteString(value)));
}

/** @return {!ByteString} lies */
function invalidBytes(/** ? */ value) {
  throw goog.DEBUG ?
      new Error(
          'cannot coerce ' + value +
          ' to a ByteString, expected a uint8Array, a base64 encoded string or a ByteString') :
      new Error();
}
/**
 * Wraps a 'bytes' field into a ByteString.
 * @param {string|!Uint8Array|!ByteString|null|undefined} value
 * @param {boolean} invalidIsMissing
 * @param {boolean} allowNullishValues
 * @return {!ByteString|null|undefined} The field's wrapped value.
 */
function bytesAsByteString(value, invalidIsMissing, allowNullishValues) {
  if (value == null) {
    if (allowNullishValues) {
      return value;
    }
    return invalidBytes(value);
  }
  if (typeof value === 'string') {
    return ByteString.fromBase64(value);
  }
  if (value.constructor === ByteString) {
    return /** @type {!ByteString} */ (value);
  }
  // Even though Uint8Array is not supported on the wire, this is still
  // called by setters.
  if (isU8(value)) {
    return ByteString.fromUint8Array(/** @type {!Uint8Array} */ (value));
  }
  // If we get here then the value is invalid, so we either treat it as absent
  // or fall through and throw.
  return invalidIsMissing ? undefined : invalidBytes(value);
}


/**
 * @param {*} field
 * @return {*}
 */
function maybeUnsafeUnwrapByteString(field) {
  if (field instanceof ByteString) {
    return unsafeUnwrapByteString(field);
  }
  return field;
}

/**
 * @param {!ReadonlyArray<number>|!Set<number>|undefined} repeatedFields
 * @param {number} fieldNumber
 * @return {boolean}
 */
function isRepeatedFieldInSet(repeatedFields, fieldNumber) {
  return !!repeatedFields &&
      (Array.isArray(repeatedFields) ?
           repeatedFields.includes(fieldNumber) :
           /** @type {!Set<number>} */ (repeatedFields).has(fieldNumber));
}

/**
 * Checks whether the given value is an empty repeated field. It must be either
 * marked or in the given repeated field array.
 *
 * @param {?} value
 * @param {!ReadonlyArray<number>|!Set<number>|undefined} repeatedFields
 * @param {number} fieldNumber
 * @return {boolean}
 */
function isEmptyRepeatedField(value, repeatedFields, fieldNumber) {
  if (!Array.isArray(value) || value.length) {
    return false;
  }

  // We could be marked with a repeated field bit.
  const arrayState = getArrayState(value);
  if (arrayState & ArrayStateFlags.IS_REPEATED_FIELD) {
    return true;
  }

  // Or we could know this is a repeated field without having marked it.
  if (!isRepeatedFieldInSet(repeatedFields, fieldNumber)) {
    return false;
  }

  // Write back the bit so we don't have to check the array again.
  setArrayState(value, arrayState | ArrayStateFlags.IS_REPEATED_FIELD);
  return true;
}

/**
 * Throws an error if the given state indicates a frozen parent.
 * @param {!ArrayState} state The parent's array state, if any.
 * @suppress {visibility} access to message internals.
 */
function checkNotImmutableState(state) {
  if (state & ArrayStateFlags.IS_IMMUTABLE_ARRAY) {
    if (goog.DEBUG) {
      throw new Error('Cannot mutate an immutable Message');
    } else {
      throw new Error();
    }
  }
}

/**
 * @param {!InternalMessage} msg
 * @param {!ArrayState=} arrayState
 */
function checkMutableMessage(msg, arrayState) {
  if (isImmutableMessage(msg, arrayState)) {
    if (goog.DEBUG) {
      throw new Error('Cannot mutate an immutable Message');
    } else {
      throw new Error();
    }
  }
}

/**
 * Throws if `index` is out of range to read from `array`
 * @param {!ReadonlyArray<*>} array
 * @param {number} index
 */
function checkRepeatedIndexInRangeForGet(array, index) {
  if (typeof index !== 'number' || index < 0 || index >= array.length) {
    if (goog.DEBUG) {
      throw new Error(
          `Index ${index} out of range for field of length ${array.length}.`);
    } else {
      throw new Error();
    }
  }
}

/**
 * Throws if `index` is out of range to write to `array`. Allowed to equal the
 * length, since writing would not create holes.
 * @param {!Array<*>} array
 * @param {number|undefined} index
 */
function checkRepeatedIndexInRangeForSet(array, index) {
  if (typeof index !== 'number' || index < 0 || index > array.length) {
    if (goog.DEBUG) {
      throw new Error(
          `Index ${index} out of range for field of length ${array.length}.`);
    } else {
      throw new Error();
    }
  }
}

/** @const {boolean} Whether we support Symbol.hasInstance. */
const SUPPORTS_HAS_INSTANCE = goog.FEATURESET_YEAR >= 2018 ||
    (typeof Symbol != 'undefined' && typeof Symbol.hasInstance != 'undefined');

/**
 * @param {*} value
 * @return {!ObjectPropertyDescriptor}
 * @tsType (value: any): PropertyDescriptor
 */
// NOTE: the JS externs call it ObjectPropertyDescriptor but the TS externs
// call the type PropertyDescriptor.
function invisiblePropValue(value) {
  return {
    value,
    configurable: false,
    writable: false,
    enumerable: false,
  };
}

/**
 * Prevents the given value from being passed to structuredClone interfaces.
 * @param {!Object} obj
 */
function disallowPassingToStructuredClone(obj) {
  if (goog.DEBUG) {
    obj['preventPassingToStructuredClone'] = dontPassJspbTypeToStructuredClone;
  }
}

/**
 * Set as a property of a JSPB object to prevent passing it over a structured
 * clone interface, which will break and cannot be made to work.
 *
 * If you need to use postMessage etc. with Apps JSPB, please call
 * `.toJsonValue` on the message then pass that value to a
 * message constructor on the other side.
 */
function dontPassJspbTypeToStructuredClone() {}


/**
 * An IteratorIterable that transforms the values of another iterable.
 *
 * <p>Like map IteratorIterables, this is lazy and one-shot.
 * @implements {IteratorIterable<B>}
 * @template A, B, THIS_ARG
 * @final
 */
class TransformingIteratorIterable {
  /**
   * @param {!IteratorIterable<A>} iterable the source iterable.
   * @param {(function(this: THIS_ARG, A): B)} mapper
   * @param {THIS_ARG} thisArg
   */
  constructor(iterable, mapper, thisArg) {
    /** @private @const */
    this.iterable = iterable;

    /** @private @const {function(A): B} */
    this.mapper = mapper;

    /** @private @const {THIS_ARG} */
    this.thisArg = thisArg;
  }

  /**
   * @override
   * @return {!IIterableResult<B>}
   */
  next() {
    const r = this.iterable.next();
    if (!r.done) {
      r.value = this.mapper.call(this.thisArg, r.value);
    }
    return r;
  }

  /**
   * @override
   * @return {!IteratorLike<B>}
   */
  [Symbol.iterator]() {
    return this;
  }
}


/**
 * @param {!IteratorIterable<A>} iterable
 * @param {function(A): B} mapper
 * @param {THIS_ARG} thisArg
 * @return {!IteratorIterable<B>}
 * @template A, B, THIS_ARG
 */
function newTransformingIteratorIterable(iterable, mapper, thisArg) {
  return new TransformingIteratorIterable(iterable, mapper, thisArg);
}

/**
 * Type information required for performing accurate comparisons.
 *
 * This type encapsulates best-effort information about which fields are either
 * repeated or maps, to be used during comparisons.
 * @interface
 */
class ComparisonTypeInfo {
  constructor() {
    /** @type {!Set<number>|undefined} */
    this.repeatedFields;

    /** @type {!Set<number>|undefined} */
    this.mapFields;
  }

  /**
   * @return {!ComparisonTypeInfo|undefined}
   */
  getFieldComparisonTypeInfo(/** number */ fieldNumber) {}

  /**
   * @return {!Set<number>}
   */
  getRepeatedFields() {}

  /**
   * @return {!Set<number>}
   */
  getMapFields() {}
}

/**
 * Asserts state invariants on the given array.
 *
 * Note that it's safe to skip the frozenness check _only_ when calling from
 * ImmutableJS, when we know that the ImmutableJS accessors will freeze after
 * potentially caching a coerced array on this one.
 */
function assertArrayInvariants(
    /** !Array */ arr, /** boolean= */ skipFrozennessCheck) {
  if (!goog.DEBUG) return;

  // Assert that we're always marked as repeated
  const state = getArrayState(assertArray(arr));

  // If a repeated field array is marked with the frozen bit, or the immutable
  // and api formatted bits, then assert that the array is actually frozen.
  // array is always frozen.
  if (!skipFrozennessCheck) {
    const shouldBeFrozen = ((state & ArrayStateFlags.IS_IMMUTABLE_ARRAY) &&
                            (state & ArrayStateFlags.IS_API_FORMATTED)) ||
        (state & ArrayStateFlags.FROZEN_ARRAY);
    assert(!shouldBeFrozen || Object.isFrozen(arr));
  }

  if (DETAILED_JSPB_ASSERTS && !(state & ArrayStateFlags.UNFROZEN_SHARED)) {
    // Don't bother checking value mutabilities unless we might assert on them.
    const onlyMutableValues = !!(state & ArrayStateFlags.ONLY_MUTABLE_VALUES);
    const onlyImmutableValues =
        !(state & ArrayStateFlags.MUTABLE_SUBSTRUCTURES);
    if (onlyMutableValues || onlyImmutableValues) {
      let hasMutableMessage, hasImmutableMessage, hasInlineArray;
      for (const v of arr) {
        if (Array.isArray(v)) {
          hasInlineArray = true;
        } else if (isInternalMessage(v)) {
          if (isImmutableMessage(v)) {
            hasImmutableMessage = true;
          } else {
            hasMutableMessage = true;
          }
        }
      }

      // If we had an inlined array, we can't say formatted.
      if (hasInlineArray) {
        assert(!(state & ArrayStateFlags.IS_API_FORMATTED));
      }

      // We cannot have a mutable message without MUTABLE_SUBSTRUCTURES.
      if (onlyImmutableValues) {
        assert(!hasMutableMessage);
      }

      // We cannot have an inlined immutable message with ONLY_MUTABLE_VALUES.
      if (onlyMutableValues) {
        assert(!hasInlineArray && !hasImmutableMessage);
      }
    }
  }
  assertRepeated64BitIntegerFieldApiFormattingInvariants(arr);
}

/**
 * Verifies that a string-formatted [u]int64 field contains only string
 * elements.
 *
 * @param {!Array<?>} arr
 */
function assertStringFormattedInvariant(arr) {
  if (!DETAILED_JSPB_ASSERTS) return;

  const state = getArrayState(arr);

  if (!hasFlagBit(state, ArrayStateFlags.STRING_FORMATTED)) {
    return;
  }

  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] !== 'string') {
      fail(`Unexpected element of type ${
          typeof arr[i]} in string formatted repeated 64-bit int field`);
    }
  }
}

/**
 * Verifies that a 64-bit int repeated field has the correct API formatting
 * array state flags.
 *
 * - There is at most 1 type-specific flag (may be 0 if not already API
 * formatted or is the empty list sentinel)
 * - If string formatted, all elements are strings
 *
 * @param {!Array<?>} arr
 */
function assertRepeated64BitIntegerFieldApiFormattingInvariants(arr) {
  if (!ENABLE_ASSERTS) return;

  const state = getArrayState(arr);
  const isApiFormatted = state & ArrayStateFlags.IS_API_FORMATTED;

  const typeFormattedSetCount =
      (hasFlagBit(state, ArrayStateFlags.STRING_FORMATTED) ? 1 : 0) +
      (hasFlagBit(state, ArrayStateFlags.GBIGINT_FORMATTED) ? 1 : 0);

  assert(
      (isApiFormatted && typeFormattedSetCount <= 1) ||
          (!isApiFormatted && typeFormattedSetCount === 0),
      `Expected at most 1 type-specific formatting bit, but got ${
          typeFormattedSetCount} with state: ${state}`);

  assertStringFormattedInvariant(arr);
}

/**
 * @nosideeffects
 * @return {?}
 */
function makeToken() {
  return Object.freeze({});
}

// Do not export these. Do not mark @private
// The intent is just to be types that are not externally instantiable.
class InternalDoNotFreezeToken {}

/** @typedef {!InternalDoNotFreezeToken} */
let DoNotFreezeToken;

/** @type {!DoNotFreezeToken} */
const DO_NOT_FREEZE__LEGACY_OPTION = makeToken();

/** @template T */
class OrUndefinedToken {}

// type param is for closure type inference.
/** @type {!OrUndefinedToken<undefined>} */
const OR_UNDEFINED = makeToken();

/**
 * A private key to guard methods on DescriptorTypeReferenceImpl.
 * @const {!Object}
 */
const DESCRIPTOR_TYPE_REFERENCE_INTERNAL_ARG = {};

/** @const {symbol|undefined} */
const DEBUG_EXTENSIONS = goog.DEBUG ? Symbol('debugExtensions') : undefined;

/** @return {!Object<!Object<string, !InternalExtensionFieldInfo>>|undefined} */
function getExtensionRegistryForDebugging(/** !Function */ parentCtor) {
  return parentCtor[DEBUG_EXTENSIONS];
}

/**
 * Registers extensions for debugging;
 */
function registerExtensionsForDebugging(
    /** !Function */ ctor, /** ? */ extensions) {
  ctor[DEBUG_EXTENSIONS] = extensions;
}

/** @return {boolean} */
function startsWith(/** string */ str, /** string */ prefix) {
  return str.indexOf(prefix) === 0;
}

/** @return {boolean} */
function endsWith(/** string */ str, /** string */ suffix) {
  return str.lastIndexOf(suffix) === Math.max(0, str.length - suffix.length);
}

/**
 * Iterates over all fields in a message array with a callback
 *
 * @param {!Array} internalArray to iterate the fields of.
 * @param {!ArrayState} messageArrayState array state.
 * @param {function (number, *)} callback to call on each fields.
 *     The arguments are the value and the field number.
 */
function iterateFields(internalArray, messageArrayState, callback) {
  // Our iteration is not correct unless we have a consistent HAS_MESSAGE_ID.
  assert(messageArrayState & ArrayStateFlags.CONSTRUCTED);
  const arrayIndexOffset = getArrayIndexOffset(messageArrayState);
  const arrayLength = internalArray.length;
  const hasSparseObject =
      !!arrayLength && isSparseObjectInline(internalArray[arrayLength - 1]);
  const end = arrayLength + (hasSparseObject ? -1 : 0);
  assert(!!hasSparseObject === isSparseObject(internalArray[arrayLength - 1]));
  for (let i = (messageArrayState & ArrayStateFlags.HAS_MESSAGE_ID) ? 1 : 0;
       i < end; i++) {
    const value = internalArray[i];
    callback(fieldNumberFromIndex(i, arrayIndexOffset), value);
  }

  if (hasSparseObject) {
    const sparseObject = internalArray[arrayLength - 1];
    for (const k in sparseObject) {
      if (!hasOwnPropertyIfNotTrusted(sparseObject, k) || isNaN(k)) {
        continue;
      }
      callback(+k, sparseObject[k]);
    }
  }
}

/**
 * Opaque type that indicates that a message has a messageId field.
 * @abstract
 */
class HasMessageId {
  constructor() {
    throw new Error('not instantiable');
  }
}

const /** !HasMessageId */ HAS_MESSAGE_ID =
    /** @type {!HasMessageId} */ (/** @type {?} */ ({}));

const /** !HasMessageId|undefined */ NO_MESSAGE_ID = undefined;

function assertValidHasMessageIdOrUndefined(
    /** !Array */ messageArray, /** !HasMessageId|undefined */ hasMessageId) {
  if (!ENABLE_ASSERTS) return;
  const arrayState = getArrayState(messageArray);
  // The HAS_MESSAGE_ID bit is not consistent unless CONSTRUCTED is set.
  assert(arrayState & ArrayStateFlags.CONSTRUCTED);
  if (arrayState & ArrayStateFlags.HAS_MESSAGE_ID) {
    assert(hasMessageId === HAS_MESSAGE_ID);
  } else {
    assert(hasMessageId === NO_MESSAGE_ID);
  }
}

/** @return {!HasMessageId|undefined} */
function getHasMessageId(/** number */ arrayState) {
  assert(arrayState & ArrayStateFlags.CONSTRUCTED);
  return arrayState & ArrayStateFlags.HAS_MESSAGE_ID ? HAS_MESSAGE_ID :
                                                       NO_MESSAGE_ID;
}

exports = {
  ANY_PROTOTYPE_MARKER_VALUE,
  ComparisonTypeInfo,
  DESCRIPTOR_TYPE_REFERENCE_INTERNAL_ARG,
  DO_NOT_FREEZE__LEGACY_OPTION,
  DoNotFreezeToken,
  EXEMPTED_SUBCLASS_MARKER,
  GENERATED_SUBCLASS_MARKER,
  HAS_MESSAGE_ID,
  HasMessageId,
  InternalExtensionFieldInfo,
  InternalImmutableMessage,
  InternalMap,
  InternalMessage,
  MAP_PROTOTYPE_MARKER_VALUE,
  MESSAGE_PROTOTYPE_MARKER_VALUE,
  NO_MESSAGE_ID,
  OR_UNDEFINED,
  OrUndefinedToken,
  SUPPORTS_HAS_INSTANCE,
  SerializeBinaryFnHolder,
  assertArrayInvariants,
  assertRepeated64BitIntegerFieldApiFormattingInvariants,
  assertValidHasMessageIdOrUndefined,
  bytesAsByteString,
  bytesAsU8,
  checkMutableMessage,
  checkNotImmutableState,
  checkRepeatedIndexInRangeForGet,
  checkRepeatedIndexInRangeForSet,
  disallowPassingToStructuredClone,
  endsWith,
  fieldNumberFromIndex,
  getExtensionRegistryForDebugging,
  getHasMessageId,
  hasOwnPropertyIfNotTrusted,
  indexFromFieldNumber,
  indexFromFieldNumberAndHasMessageId,
  invisiblePropValue,
  isAny,
  isEmptyMap,
  isEmptyRepeatedField,
  isImmutableMessage,
  isInternalMessage,
  isMap,
  isMessage,
  isRepeatedFieldInSet,
  isSparseObject,
  isSparseObjectInline,
  iterateFields,
  maybeUnsafeUnwrapByteString,
  newTransformingIteratorIterable,
  registerExtensionsForDebugging,
  setMessageCtorInDebug,
  startsWith,
  getInternalArray,
  getInternalArrayInline,
  setInternalArray,
  setInternalArrayForNewMessage,
  isCopyOnWrite,
  setCopyOnWrite,
  isNoLegacyNull,
  setNoLegacyNull,
};
