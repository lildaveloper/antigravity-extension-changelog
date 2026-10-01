/**
 * @fileoverview Internal utilities for manipulating immutable messages.
 * @package
 *
 * DO NOT USE THIS OUTSIDE OF THIS PACKAGE.
 */
goog.module('jspb.internal_immutability');

const asserts = goog.require('goog.asserts');
const {ALLOW_COPY_ON_WRITE, DETAILED_JSPB_ASSERTS} = goog.require('jspb.internal_options');
const {ArrayState, ArrayStateFlags, addArrayStateFlags, copyArrayBitsClone, getArrayState, getMessageArrayState, getPossiblyUnconstructedMessageArrayState, getPossiblyUnconstructedMessageArrayStateInline, hasFlagBit, markArrayImmutable, setArrayState} = goog.require('jspb.internal_array_state');
const {ByteString} = goog.require('jspb.bytestring');
const {EXEMPTED_SUBCLASS_MARKER, InternalMessage, assertArrayInvariants, checkMutableMessage, getInternalArray, isCopyOnWrite, isImmutableMessage, isInternalMessage, iterateFields, setCopyOnWrite, setInternalArray, setInternalArrayForNewMessage, setNoLegacyNull} = goog.require('jspb.internal');
const {JspbMap, isImmutableMap} = goog.require('jspb.internal_map');
const {cloneJspbArray} = goog.require('jspb.internal_copy');
const {logOperation} = goog.require('jspb.internal_operations');


/**
 * Returns whether an array with the given state is a candidate for in-place
 * markImmutable.
 *
 * @param {!ArrayState} state
 * @return {boolean}
 */
function canMarkImmutableInPlaceIfParentIsOwned(state) {
  // Callers shouldn't call us on already immutable arrays.
  asserts.assert(!hasFlagBit(state, ArrayStateFlags.IS_IMMUTABLE_ARRAY));

  // We never have a mutable sub-array with a wrapper inside a mutable parent
  // with a wrapper because we always write back the wrapper.
  asserts.assert(!hasFlagBit(state, ArrayStateFlags.HAS_WRAPPER));

  // All message and map arrays that have no wrappers can be marked immutable
  // in-place. Only repeated field arrays that have been unfrozen shared or
  // contain mutable submessages can't be marked immutable.
  return !hasFlagBit(state, ArrayStateFlags.MUTABLE_SUBSTRUCTURES) &&
      !hasFlagBit(state, ArrayStateFlags.UNFROZEN_SHARED);
}

/**
 * @param {T} v
 * @param {boolean} parentIsOwned
 * @return {T}
 * @template T
 * @suppress {visibility} Access to map internals
 */
function copyImmutableFieldValue(v, parentIsOwned) {
  asserts.assertExists(v);
  // boolean, number, string, bigint are all immutable, so we can just return
  // them.
  if (typeof v !== 'object') {
    return v;
  }
  if (Array.isArray(v)) {
    assertArrayInvariants(v);
    const state = getArrayState(v);
    // If this is an empty repeated field, don't copy it in any mode.
    if (v.length === 0 && (state & ArrayStateFlags.IS_REPEATED_FIELD)) {
      return undefined;
    }
    return getArrayForClone(v, state, parentIsOwned);
  }

  if (isInternalMessage(v)) {
    return copyToImmutableMessageOrArray(/** @type {!InternalMessage} */ (v));
  }
  if (v instanceof JspbMap) {
    const mapArrayState = v.arrayState;
    if (mapArrayState & ArrayStateFlags.IS_IMMUTABLE_ARRAY) return v;
    if (!v.size) return undefined;
    const entries = markArrayImmutable(v.toArrayInternalUnsorted());
    if (v.valueCtor) {
      // Message maps are lazily constructed so we need to inspect and copy the
      // values. Keys can be ignored because they are all immutable and already
      // validated.
      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        let value = entry[1];
        if (value == null || typeof value !== 'object') {
          // lined up with the behavior of JspbMap.constructor, undefined is
          // treated as missing and modeled as `null` in the map entry
          value = undefined;
          // type inference cannot figure out that `value` is a !Object here :(
        } else if (isInternalMessage(value)) {
          value = copyToImmutableMessageOrArray(
              /** @type {!InternalMessage} */ (value));
        } else if (Array.isArray(value)) {
          value = getArrayForClone(
              value, getPossiblyUnconstructedMessageArrayStateInline(value),
              !!(mapArrayState & ArrayStateFlags.MUTABLE_REFERENCES_ARE_OWNED));
        } else {
          // This must be some schema skew issue, just drop the value.
          value = undefined;
        }
        entry[1] = value;
      }
    } else {
      // No need to inspect values because they are all immutable and in fact
      // the constructor has already validated everything.
    }
    return entries;
  }
  if (v instanceof ByteString) {
    return v;
  }
  // TODO: b/396420284 - remove.
  asserts.assert(!(v instanceof Uint8Array));
  // Arrays and sparse objects were handled by our caller, so this is really
  // just an invalid value. Drop it.
  return undefined;
}

/**
 * Returns an array suitable for a clone, possibly without any copying.
 *
 * @param {!Array<?>} array
 * @param {!ArrayState} arrayState
 * @param {boolean} parentIsOwned
 * @return {!Array<?>}
 */
function getArrayForClone(array, arrayState, parentIsOwned) {
  if (arrayState & ArrayStateFlags.IS_IMMUTABLE_ARRAY) {
    return array;
  }
  if (parentIsOwned && canMarkImmutableInPlaceIfParentIsOwned(arrayState)) {
    addArrayStateFlags(
        array,
        ArrayStateFlags.IS_IMMUTABLE_ARRAY |
            ArrayStateFlags.MUTABLE_REFERENCES_ARE_OWNED);
    // Immutable API_FORMATTED arrays must be frozen.
    if (arrayState & ArrayStateFlags.IS_API_FORMATTED) Object.freeze(array);
  } else {
    array = copyArrayWithImmutableFields(
        array, arrayState, /*markImmutable=*/ false,
        parentIsOwned && !(arrayState & ArrayStateFlags.UNFROZEN_SHARED));
  }
  return array;
}

/**
 * @param {!InternalMessage} template
 * @param {!Array<?>} array
 * @param {boolean=} mutable
 * @return {!InternalMessage}
 */
function wrapImmutableArray(template, array, mutable) {
  const ctor = /** @type {function(new:InternalMessage, ?Array=)} */ (
      template.constructor);
  const msg = new ctor(array);
  if (mutable) {
    setCopyOnWrite(msg, true);
  }
  setNoLegacyNull(msg, true);
  return msg;
}

/**
 * Returns an immutable message/array (possibly without any copying), or a copy
 * of the message's array suitable for a clone.
 *
 * @param {!InternalMessage} msg Message to copy from.
 * @return {!InternalMessage|!Array<?>}
 */
function copyToImmutableMessageOrArray(msg) {
  asserts.assert(isInternalMessage(msg));
  const array = getInternalArray(msg);
  const arrayState = getMessageArrayState(array);
  if (isImmutableMessage(msg, arrayState)) {
    return msg;
  }
  if (tryZeroCopyImmutable(msg, array, arrayState)) {
    // ideally, we just return array here, but we wrap in a message to be able
    // to mark noLegacyNull.
    return wrapImmutableArray(msg, array);
  }
  return copyArrayWithImmutableFields(array, arrayState);
}

/**
 * Returns a copy of the provided message with a mutable base messages and
 * immutable submessages.
 *
 * @param {!T} msg Message to copy from.
 * @return {!T} A copied message with immutable fields.
 * @template T
 */
function copyMutableWithImmutableFields(msg) {
  asserts.assert(isInternalMessage(msg));
  const array = getInternalArray(msg);
  const arrayState = getMessageArrayState(array);
  if (tryZeroCopyImmutable(msg, array, arrayState)) {
    return wrapImmutableArray(msg, array, /*mutable=*/ true);
  }
  return copyArrayToMessageWithImmutableFields(
      msg, array, arrayState, /*immutable=*/ false);
}

/**
 * Copies the content of the second argument into the first.
 *
 * @param {!T} toMessage Message which will receive a copy of fromMessage
 * @param {!T} fromMessage Message that will be copied into toMessage.
 * @return {!T} toMessage
 * @template T
 */
function copyMutableIntoMessage(toMessage, fromMessage) {
  asserts.assert(isInternalMessage(toMessage));
  asserts.assert(isInternalMessage(fromMessage));
  checkMutableMessage(toMessage);
  if (fromMessage.constructor !== toMessage.constructor) {
    throw new Error('Copy source and target message must have the same type.');
  }
  let array = getInternalArray(fromMessage);
  const arrayState = getMessageArrayState(array);
  if (tryZeroCopyImmutable(fromMessage, array, arrayState)) {
    setInternalArrayForNewMessage(toMessage, array);
    setCopyOnWrite(toMessage, true);
    setNoLegacyNull(toMessage, true);
    return toMessage;
  }
  array = copyArrayWithImmutableFields(array, arrayState);
  setInternalArray(toMessage, array);
  return toMessage;
}

/**
 * Returns a copy of the provided message `Array` as a message with
 * immutable sub structures.
 *
 * @return {!InternalMessage}
 * @template T
 */
function copyArrayToMessageWithImmutableFields(
    /** !T */ template, /** !Array<?> */ array, /** number */ arrayState,
    /** boolean */ immutable) {
  return new template.constructor(
      copyArrayWithImmutableFields(array, arrayState, immutable));
}

/**
 * Returns a copy of the provided message `Array` as a deeply immutable array.
 *
 * The returned array is always newly constructed but may share internal
 * structures with the provided array.
 *
 * @param {!Array<?>} array
 * @param {!ArrayState} arrayState
 * @param {boolean=} markImmutable Whether new array should be marked immutable.
 * @param {boolean=} isOwned Whether array is known not to be exposed to users.
 * @return {!Array}
 */
function copyArrayWithImmutableFields(
    array, arrayState, markImmutable, isOwned) {
  if (DETAILED_JSPB_ASSERTS) {
    logOperation({copyMessageWithImmutableFields: 1});
  }
  asserts.assert(arrayState === getArrayState(array));

  isOwned ??= hasFlagBit(
      arrayState,
      ArrayStateFlags.MUTABLE_REFERENCES_ARE_OWNED |
          ArrayStateFlags.IS_IMMUTABLE_ARRAY);
  const newArray =
      cloneJspbArray(array, arrayState, copyImmutableFieldValue, isOwned);

  arrayState = copyArrayBitsClone(arrayState, markImmutable);
  setArrayState(newArray, arrayState);

  return newArray;
}

/**
 * Returns a frozen message directly from a JSPB Transport Format encoded
 * string.
 * @param {function(new:JSPB, ?Array=)} ctor Constructor for the message.
 * @param {string} data a string of JSPB Transport Format encoded data.
 * @return {!JSPB} a frozen message.
 * @template JSPB
 */
function deserializeAsImmutable(ctor, data) {
  asserts.assertString(data);
  asserts.assertFunction(ctor);
  const array = JSON.parse(data);
  if (!Array.isArray(array)) {
    throw new Error(
        'Expected jspb data to be an array, got ' + goog.typeOf(array) + ': ' +
        array);
  }
  markArrayImmutable(array);
  const msg = new ctor(array);
  asserts.assert(isInternalMessage(msg));
  return msg;
}

/**
 * Converts the given message to a mutable instance, if necessary.
 *
 * @param {!InternalMessage} msg
 * @return {!InternalMessage}
 */
function messageToMutable(msg) {
  const array = getInternalArray(msg);
  const arrayState = getMessageArrayState(array);
  if (!isImmutableMessage(msg, arrayState)) {
    return msg;
  }
  if (tryZeroCopyImmutable(msg, array, arrayState)) {
    return wrapImmutableArray(msg, array, /*mutable=*/ true);
  }
  return copyArrayToMessageWithImmutableFields(
      msg, array, arrayState, /*immutable=*/ false);
}

/**
 * Converts the given message to an immutable instance, if necessary.
 *
 * @param {!InternalMessage} msg
 * @return {!InternalMessage}
 */
function messageToImmutable(msg) {
  const array = getInternalArray(msg);
  const arrayState = getMessageArrayState(array);
  if (isImmutableMessage(msg, arrayState)) {
    return msg;
  }
  if (tryZeroCopyImmutable(msg, array, arrayState)) {
    return wrapImmutableArray(msg, array);
  }
  return copyArrayToMessageWithImmutableFields(
      msg, array, arrayState, /*immutable=*/ true);
}

/**
 * @param {!InternalMessage} msg
 * @return {boolean} whether copy happened
 */
function maybeCopyOnWrite(msg) {
  if (!isCopyOnWrite(msg)) {
    return false;
  }
  let array = getInternalArray(msg);
  const arrayState = getMessageArrayState(array);
  asserts.assert(arrayState & ArrayStateFlags.IS_IMMUTABLE_ARRAY);
  array = copyArrayWithImmutableFields(array, arrayState);
  setInternalArray(msg, array);
  return true;
}

/**
 * Ensures the given message is mutable, and makes array mutable if necessary.
 * Throws otherwise.
 * @param {!InternalMessage} msg
 * @param {!ArrayState=} arrayState
 */
function ensureMutable(msg, arrayState) {
  if (arrayState !== undefined &&
      !(arrayState & ArrayStateFlags.IS_IMMUTABLE_ARRAY)) {
    return;
  }
  if (!maybeCopyOnWrite(msg)) {
    checkMutableMessage(
        msg, arrayState ?? getMessageArrayState(getInternalArray(msg)));
  }
}

/**
 * @param {!Array<?>} messageArray
 * @param {!ArrayState=} messageArrayState
 * @return {!ArrayState}
 */
function leakedMutableSubstructures(messageArray, messageArrayState) {
  if (!ALLOW_COPY_ON_WRITE) {
    return messageArrayState ?? 0;
  }
  if (messageArrayState === undefined) {
    messageArrayState =
        getPossiblyUnconstructedMessageArrayStateInline(messageArray);
  } else {
    asserts.assert(
        messageArrayState ===
        getPossiblyUnconstructedMessageArrayState(messageArray));
  }
  asserts.assert(!(messageArrayState & ArrayStateFlags.IS_IMMUTABLE_ARRAY));
  if (DETAILED_JSPB_ASSERTS) {
    asserts.assert(hasLeakedMutableDebugOnly(messageArray));
  }
  if (!hasLeakedMutableSubstructures(messageArrayState)) {
    messageArrayState |= ArrayStateFlags.MUTABLE_SUBSTRUCTURES;
    setArrayState(messageArray, messageArrayState);
  }
  return messageArrayState;
}

/**
 * @param {!ArrayState} arrayState
 * @return {boolean}
 */
function hasLeakedMutableSubstructures(arrayState) {
  return !(arrayState & ArrayStateFlags.MUTABLE_REFERENCES_ARE_OWNED) ||
      !!(arrayState & ArrayStateFlags.MUTABLE_SUBSTRUCTURES);
}

/**
 * Attempts to mark the given array as immutable in place.
 *
 * @param {!InternalMessage} msg
 * @param {!Array<?>} array
 * @param {!ArrayState} arrayState
 * @return {boolean} whether the array was made immutable
 */
function tryZeroCopyImmutable(msg, array, arrayState) {
  if (!ALLOW_COPY_ON_WRITE) {
    return false;
  }
  // We don't want to copy-on-write unsupported subclasses because they may not
  // respect expectations about the internal array.
  if (EXEMPTED_SUBCLASS_MARKER && msg[EXEMPTED_SUBCLASS_MARKER]) {
    return false;
  }
  if (arrayState & ArrayStateFlags.IS_IMMUTABLE_ARRAY) {
    return true;
  }
  if (!hasLeakedMutableSubstructures(arrayState)) {
    if (DETAILED_JSPB_ASSERTS) {
      asserts.assert(!hasLeakedMutableDebugOnly(array));
    }
    setArrayState(array, arrayState | ArrayStateFlags.IS_IMMUTABLE_ARRAY);
    setCopyOnWrite(msg, true);
    return true;
  }
  return false;
}

/**
 * @param {!Array<?>} messageArray
 * @return {boolean}
 */
function hasLeakedMutableDebugOnly(messageArray) {
  const arrayState =
      getPossiblyUnconstructedMessageArrayStateInline(messageArray);
  if (!(arrayState & ArrayStateFlags.MUTABLE_REFERENCES_ARE_OWNED)) {
    return true;
  }
  let leaked = false;
  iterateFields(messageArray, arrayState, (fieldNumber, value) => {
    leaked ||= isLeakedMutableFieldDebugOnlyWithOwnedParent(value);
  });
  return leaked;
}

/**
 * @param {*} value
 * @return {boolean}
 */
function isLeakedMutableFieldDebugOnlyWithOwnedParent(value) {
  if (isInternalMessage(value)) {
    return !isImmutableMessage(/** @type {!InternalMessage} */ (value));
  }
  if (value instanceof JspbMap) {
    return !isImmutableMap(value);
  }
  if (Array.isArray(value)) {
    const arrayState = getArrayState(value);
    if (arrayState & ArrayStateFlags.IS_IMMUTABLE_ARRAY) return false;
    return !canMarkImmutableInPlaceIfParentIsOwned(arrayState);
  }
  return false;
}

/**
 * @param {!Array<?>} messageArray
 */
function assertValidLeakedMutableSubstructures(messageArray) {
  if (ALLOW_COPY_ON_WRITE) {
    asserts.assert(
        hasLeakedMutableSubstructures(
            getPossiblyUnconstructedMessageArrayState(messageArray)) ||
        !hasLeakedMutableDebugOnly(messageArray));
  }
}

exports = {
  assertValidLeakedMutableSubstructures,
  canMarkImmutableInPlaceIfParentIsOwned,
  copyArrayWithImmutableFields,
  copyImmutableFieldValue,
  copyMutableIntoMessage,
  copyMutableWithImmutableFields,
  deserializeAsImmutable,
  ensureMutable,
  leakedMutableSubstructures,
  maybeCopyOnWrite,
  messageToImmutable,
  messageToMutable,
};
