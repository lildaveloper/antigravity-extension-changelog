/**
 * @fileoverview Internal accessors for hidden array state.
 *
 * DO NOT USE THIS OUTSIDE OF THIS PACKAGE.
 */

goog.module('jspb.internal_array_state');

const asserts = goog.require('goog.asserts');
const {ARRAY_STATE_SYMBOL, HAS_NATIVE_SYMBOL} = goog.require('jspb.internal_symbols');
const {getWriteBackGbigintValues} = goog.require('jspb.internal_options');
const {objectProperty} = goog.require('goog.reflect');

const /** number */ DEFAULT_ARRAY_STATE = 0;

/** @enum {number} */
const ArrayStateFlags = {
  /**
   * If set, this value is a repeated field. Never set for map fields.
   *
   * If unset AND another array bit is set AND there was not a schema mismatch,
   * then this is not a repeated field.
   */
  IS_REPEATED_FIELD: 1 << 0,

  /**
   * If set on a message array, repeated field array, or map (array), this value
   * cannot be mutated and contains only immutable values.
   *
   * Apps JSPB attempts to make state as immutable as possible so that it may
   * be shared safely across message instances:
   *
   * - A message array which is immutable may be shared by any number of
   *   wrappers. A message array which is mutable and owned may be referenced by
   *   exactly one wrapper. A message array which is not owned may be shared by
   *   only one wrapper in addition to external references.
   *
   * - A map array or object which is immutable may be shared by any number of
   *   parent messages. A map array or object which is mutable may be shared
   *   by only one parent message (except via external references).
   *
   * - A repeated field array which is immutable may be shared by any number
   *   of mutable or immutable parents. A marked mutable repeated field array
   *   may be shared by any number of mutable parents. An unmarked repeated
   *   field array may not be shared.
   *
   * If set with IS_API_FORMATTED, a repeated field array must be frozen.
   */
  IS_IMMUTABLE_ARRAY: 1 << 1,

  /**
   * If set on a repeated field array, this field has been coerced from wire
   * types to API types and does not need to be coerced again (though any
   * new values will).
   *
   * This is only set on repeated fields.
   *
   * This bit only ensures that values obtained _from the wire_ have been
   * converted: it's possible for an external mutation from the user to have
   * added invalid data to this array. As a result, we may clear this bit
   * in certain circumstances to be totally sure we are protected against
   * invalid values.
   *
   * If set with IS_IMMUTABLE_ARRAY, a repeated field array must be frozen.
   */
  IS_API_FORMATTED: 1 << 2,

  /**
   * If this array has not been externally mutated, this array is a repeated
   * submessage field and contains only constructed mutable messages. An array
   * is known to not have been externally mutated if parent message has
   * MUTABLE_REFERENCES_ARE_OWNED and this array doesn't have UNFROZEN_SHARED.
   *
   * We maintain this bit for mutable repeated submessage access on mutable
   * parents, where it avoids our having to perform a linear traversal on each
   * access to ensure values have the appropriate mutabilities.
   *
   * Only meaningful if IS_REPEATED_FIELD and IS_API_FORMATTED and
   * not IS_IMMUTABLE_ARRAY.
   */
  ONLY_MUTABLE_VALUES: 1 << 3,

  /**
   * Indicates a repeated field array that has been shared without being frozen.
   *
   * Specifically, this means DO_NOT_FREEZE__LEGACY_OPTION has been used on the
   * array.
   */
  UNFROZEN_SHARED: 1 << 4,

  /**
   * For mutable message arrays, indicates that there can be no references to
   * this array outside of the runtime. Only meaningful if not
   * IS_IMMUTABLE_ARRAY.
   *
   * A natural consequence is that any un-accessed child message, map, or
   * repeated fields are not referenced except by this array. Once fields are
   * first accessed, see IS_IMMUTABLE_ARRAY for invariants concerning sharing of
   * their references.
   *
   * If the value is immutable, this bit is irrelevant and may or may not be
   * set. It further does _not_ indicate whether references to the array are
   * shared by multiple messages.
   *
   * Note: This bit is only meaningfully set on message arrays. For (unwrapped)
   * map and repeated field arrays, this bit conceptually always has the same
   * value as the parent message. Various copying routines that are agnostic to
   * what the array represents may propagate this bit to map/repeated arrays,
   * but there's otherwise no guarantee that they are maintained on map/repeated
   * arrays. Code working with map/repeated arrays should always read this bit
   * from the parent message if needed.
   */
  MUTABLE_REFERENCES_ARE_OWNED: 1 << 5,

  /**
   * This indicates that the pivot and HAS_MESSAGE_ID bits have reliable values.
   *
   * Those bits are always accurate if they are non-zero. However, if they are
   * zero, then that value is only accurate if this bit is also set.
   */
  CONSTRUCTED: 1 << 6,

  /**
   * Marks the message array as having a message_id object.
   *
   * This is used to calculate the array index offset. It is always consistent
   * for CONSTRUCTED arrays.
   */
  HAS_MESSAGE_ID: 1 << 7,

  /**
   * Indicates that this array is frozen. An array may also be frozen if
   * (IS_IMMUTABLE_ARRAY && IS_API_FORMATTED) without this bit.
   *
   * This bit may be set when we freeze arrays internally to avoid checking
   * Object.isFrozen.
   *
   * We may do this for 'message' arrays that we would like to prevent being
   * passed to a constructor since FROZEN_ARRAY will cause constructMessageArray
   * to throw.
   *
   * We may also set this bit for repeated submessage fields when some of those
   * submessages might be mutable. If all of the submessages in the array are
   * known to be immutable, or it's an owned primitive repeated field, the
   * IS_IMMUTABLE_ARRAY and IS_API_FORMATTED bits should be set instead of this
   * one.
   */
  FROZEN_ARRAY: 1 << 8,

  // IS_API_FORMATTED subtypes for 64-bit integer repeated fields.
  //
  // Note: The absence of any subtype indicates "legacy" formatted values that
  // have been coerced to number|string. We can move freely between
  // STRING_FORMATTED and GBIGINT_FORMATTED. Legacy formatting is permanently
  // lost after conversion to GBIGINT_|STRING_FORMATTED since we cannot get the
  // legacy value back.

  /**
   * Indicates that valid 64-bit integer values that have been coerced to
   * string.
   *
   * Only meaningful for repeated [u]int64 fields. Should not be set otherwise.
   */
  STRING_FORMATTED: 1 << 9,

  /**
   * Indicates that valid 64-bit integer values that have been coerced to
   * gbigint.
   *
   * Only meaningful for repeated [u]int64 fields. Should not be set otherwise.
   */
  GBIGINT_FORMATTED: 1 << 10,

  /** Indicates whether a wrapper has been made for this message array. */
  HAS_WRAPPER: 1 << 11,

  /**
   * This is set to true whenever a message or repeated field array contains a
   * substructure that isn't immutable and cannot be upgraded in place to
   * immutable.
   *
   * Namely, the mutable substructures that cannot be upgraded are:
   * - Mutable wrapped submessages.
   * - Repeated fields that are unfrozen shared or contain mutable wrapped
   * submessages.
   *
   * This allows for a special case where we can construct a zero copy immutable
   * message.
   */
  MUTABLE_SUBSTRUCTURES: 1 << 12,

  /**
   * This is set when we know that the value is semantically a map.
   *
   * Code should not assume that the non presence of this bit means that the
   * array is not a map.
   *
   * As an example, this is used in `equals` so that equality tests know to
   * ignore value ordering.
   */
  KNOWN_MAP_ARRAY: 1 << 13,
};

const PIVOT_OFFSET = 14;
// Some implementations (Rhino) may incorrectly implement Math.log2 and produce
// a non-integer answer, which is in violation of the spec.
asserts.assert(
    Math.round(Math.log2(Math.max(...Object.values(ArrayStateFlags)))) ===
    PIVOT_OFFSET - 1);
const PIVOT_BITS = 10;
const PIVOT_LIMIT = (1 << PIVOT_BITS);
const PIVOT_MASK = PIVOT_LIMIT - 1;
const /** number */ ALL_FLAGS = ArrayStateFlags.IS_REPEATED_FIELD |
    ArrayStateFlags.IS_IMMUTABLE_ARRAY | ArrayStateFlags.IS_API_FORMATTED |
    ArrayStateFlags.ONLY_MUTABLE_VALUES | ArrayStateFlags.UNFROZEN_SHARED |
    ArrayStateFlags.MUTABLE_REFERENCES_ARE_OWNED | ArrayStateFlags.CONSTRUCTED |
    ArrayStateFlags.HAS_MESSAGE_ID | ArrayStateFlags.STRING_FORMATTED |
    ArrayStateFlags.GBIGINT_FORMATTED | ArrayStateFlags.FROZEN_ARRAY |
    ArrayStateFlags.HAS_WRAPPER | ArrayStateFlags.MUTABLE_SUBSTRUCTURES |
    ArrayStateFlags.KNOWN_MAP_ARRAY | (PIVOT_MASK << PIVOT_OFFSET);

/** @requireInlining */
function assertValidFlags(/** number */ flags) {
  asserts.assert((flags & ALL_FLAGS) === flags);
}

const /** !ArrayStateHolder */ ZERO_ARRAY_STATE_PROPERTY = {
  internalArrayState: {
    value: 0,
    configurable: true,
    writable: true,
    enumerable: false,
  },
};

const OBJECT_DEFINE_PROPERTIES = Object.defineProperties;

/** @typedef {{internalArrayState: ?}} */
let ArrayStateHolder;

/** @const {boolean} */
const USE_SYMBOL_ARRAY_STATE = HAS_NATIVE_SYMBOL;

const /** symbol|string */ ARRAY_STATE_PROPERTY = /** @pureOrBreakMyCode */ (
    USE_SYMBOL_ARRAY_STATE ? asserts.assertExists(ARRAY_STATE_SYMBOL) :
                             objectProperty(
                                 'internalArrayState',
                                 /** @type {!ArrayStateHolder} */ (undefined)));

/** const {!ArrayState} */
const EMPTY_LIST_SENTINEL_STATE = ArrayStateFlags.IS_IMMUTABLE_ARRAY |
    ArrayStateFlags.IS_REPEATED_FIELD | ArrayStateFlags.IS_API_FORMATTED;

/**
 * Used to mark empty repeated fields.
 *
 * This value will be replaced by null when serializing to JSON.
 *
 * When reading a repeated field readers must check the return value against
 * this value and return and replace it with a new empty array if it is
 * present.
 *
 * The initializer 'launders' the value through `valueOf` which tricks the
 * compiler into thinking that this is side-effect free, even though
 * `Object.freeze` doesn't normally qualify.  This will allow this declaration
 * to get moved or DCE'd when necessary.
 *
 * @const {!Array<?>}
 */
const EMPTY_LIST_SENTINEL = /** @type{!Array<?>} */ ({
  valueOf: () => {
    // This is a valid immutable array, so if we mark it as such we can avoid
    // copies.
    // Similarly empty arrays are always API_FORMATTED, so we can pre-mark it to
    // avoid checks elsewhere.
    const array = [];
    setArrayState(array, EMPTY_LIST_SENTINEL_STATE);
    return Object.freeze(array);
  }
}.valueOf());

/**
 * Returns the array state value
 * @param {!Array<?>|!ReadonlyArray<?>} arr
 * @return {!ArrayState}
 * @requireInlining
 * @nosideeffects
 */
function getArrayStateInline(arr) {
  return /** @type {?} */ (asserts.assertArray(
             arr,
             'state is only maintained on arrays.'))[ARRAY_STATE_PROPERTY] |
      0;
}

/**
 * Returns the array state value
 * @param {!Array<?>|!ReadonlyArray<?>} arr
 * @return {!ArrayState}
 * @nosideeffects
 */
function getArrayState(arr) {
  return getArrayStateInline(arr);
}

/**
 * Adds a flag value into the given array's state value.
 *
 * @param {!Array<?>} arr
 * @param {!ArrayState} flags
 * @return {!ArrayState}
 */
function addFlags(arr, flags) {
  assertValidFlags(flags);
  asserts.assertArray(arr, 'state is only maintained on arrays.');
  if (!USE_SYMBOL_ARRAY_STATE && !(ARRAY_STATE_PROPERTY in arr)) {
    OBJECT_DEFINE_PROPERTIES(arr, ZERO_ARRAY_STATE_PROPERTY);
  }
  return /** @type {?} */ (arr)[ARRAY_STATE_PROPERTY] |= flags;
}

/**
 * Sets the current array state
 * @param {!Array<?>} arr
 * @param {!ArrayState} flags
 * @return {!ArrayState} flags
 */
function setArrayState(arr, flags) {
  assertValidFlags(flags);
  asserts.assertArray(arr, 'state is only maintained on arrays.');
  if (!USE_SYMBOL_ARRAY_STATE && !(ARRAY_STATE_PROPERTY in arr)) {
    OBJECT_DEFINE_PROPERTIES(arr, ZERO_ARRAY_STATE_PROPERTY);
  }
  /** @type {?} */ (arr)[ARRAY_STATE_PROPERTY] = flags;
  return flags;
}

/**
 * Clears the array mask's given state value.
 *
 * @param {!Array<?>} arr
 * @param {!ArrayState} flags
 * @return {!ArrayState} the new state
 */
function clearFlags(arr, flags) {
  assertValidFlags(flags);
  asserts.assert(ARRAY_STATE_PROPERTY in arr);
  asserts.assertArray(arr, 'state is only maintained on arrays.');
  return /** @type {?} */ (arr)[ARRAY_STATE_PROPERTY] &= ~flags;
}

/**
 * Returns whether or not at least one of the flag bit(s) is set on the given
 * array state.
 * @param {!ArrayState} stateValue The array's state value.
 * @param {!ArrayState} flag The flag bit(s) to check.
 * @return {boolean}
 * @requireInlining
 */
function hasFlagBit(stateValue, flag) {
  return !!(flag & stateValue);
}

/**
 * Sets the flag bit(s) on the given array state. If isEnabled, sets the flag
 * bit(s) to '1'. Otherwise, clears the flag bit(s) by setting it to '0'.
 * @param {!ArrayState} stateValue The array's state value.
 * @param {!ArrayState} flag The flag bit(s) to toggle.
 * @param {boolean} isEnabled Whether to enable or disable the flag bit(s).
 * @return {!ArrayState} The new state value.
 * @requireInlining
 */
function setFlagBitTo(stateValue, flag, isEnabled) {
  return isEnabled ? setFlagBit(stateValue, flag) :
                     clearFlagBit(stateValue, flag);
}

/**
 * Sets the flag bit(s) on the given array state to 1.
 * @param {!ArrayState} stateValue The array's state value.
 * @param {!ArrayState} flag The flag bit(s) to set.
 * @return {!ArrayState} The new state value.
 * @requireInlining
 */
function setFlagBit(stateValue, flag) {
  return stateValue | flag;
}

/**
 * Clears the flag bit(s) on the given array state.
 * @param {!ArrayState} stateValue The array's state value.
 * @param {!ArrayState} flag The flag bit(s) to clear.
 * @return {!ArrayState} The new state value.
 * @requireInlining
 */
function clearFlagBit(stateValue, flag) {
  return stateValue & ~flag;
}

function checkMessageStateInvariants(
    /** !Array */ array, /** !ArrayState */ arrayState,
    /** boolean= */ allowUnconstructed = false) {
  // Invariant checking for message states

  // Messages always set CONSTRUCTED unless we are in binary serialization
  // or deserialization, in which case we only partially 'construct' the message
  // array to handle message_id and pivot state.
  //
  // But if HAS_WRAPPER is set, we must always be constructed.
  if (!allowUnconstructed || arrayState & ArrayStateFlags.HAS_WRAPPER) {
    asserts.assert(
        arrayState & ArrayStateFlags.CONSTRUCTED,
        'state for messages must be constructed');
  }

  asserts.assert(
      (arrayState &
       (ArrayStateFlags.IS_REPEATED_FIELD |
        ArrayStateFlags.IS_API_FORMATTED)) === 0,
      'state for messages should not contain repeated field state');

  asserts.assert(
      (arrayState & (ArrayStateFlags.KNOWN_MAP_ARRAY)) === 0,
      'state for messages should not contain map field state');

  // HAS_SPARSE_OBJECT, HAS_MESSAGE_ID, and the pivot are only consistently set
  // for constructed messages.
  if (arrayState & ArrayStateFlags.CONSTRUCTED) {
    // Fields like pivot and arrayIndexOffset should be in
    // sync with the array structure
    const pivot = getPivot(arrayState);
    const arrayIndexOffset = getArrayIndexOffset(arrayState);
    const arrayLength = array.length;
    asserts.assert(
        pivot + arrayIndexOffset >= arrayLength - 1,
        'pivot %s is pointing at an index earlier than the last index of the array, length: %s',
        pivot, arrayLength);
    if (arrayState & ArrayStateFlags.HAS_MESSAGE_ID) {
      asserts.assert(
          typeof array[0] === 'string',
          'arrays with a message_id bit must have a string in the first position, got: %s',
          array[0]);
    }
  }
}

/**
 * Returns the array state value for a constructed message
 *
 * This is identical to getArrayStateInline but adds some extra development time
 * checks.
 * @param {!Array<?>} arr
 * @param {boolean=} allowUnconstructed
 * @return {!ArrayState}
 * @requireInlining
 * @nosideeffects
 */
function getMessageArrayStateInline(arr, allowUnconstructed) {
  const state = getArrayStateInline(arr);
  if (asserts.ENABLE_ASSERTS) {
    checkMessageStateInvariants(arr, state, allowUnconstructed);
  }
  return state;
}

/**
 * @param {!Array<?>} arr
 * @return {!ArrayState}
 * @nosideeffects
 */
function getMessageArrayState(arr) {
  return getMessageArrayStateInline(arr);
}

/**
 * @param {!Array<?>} arr
 * @return {!ArrayState}
 * @requireInlining
 * @nosideeffects
 */
// TODO: b/436254718 - remove this in favor of a getMessageArrayState that
// does not assert.
function getPossiblyUnconstructedMessageArrayStateInline(arr) {
  return getMessageArrayStateInline(arr, /* allowUnconstructed= */ true);
}

/**
 * @param {!Array<?>} arr
 * @return {!ArrayState}
 * @nosideeffects
 */
// TODO: b/436254718 - remove this in favor of a getMessageArrayState that
// does not assert.
function getPossiblyUnconstructedMessageArrayState(arr) {
  return getPossiblyUnconstructedMessageArrayStateInline(arr);
}

/**
 * Returns the array state value of a repeated field.
 * @param {!Array<?>|!ReadonlyArray<?>} arr
 * @return {!ArrayState}
 * @requireInlining
 */
function getRepeatedArrayState(arr) {
  return arr === EMPTY_LIST_SENTINEL ? EMPTY_LIST_SENTINEL_STATE :
                                       getArrayStateInline(arr);
}

/**
 * Array API formatting states for 64-bit integer fields.
 * @enum {number}
 */
const TypeSpecificApiFormat = {
  LEGACY: 0,
  STRING: ArrayStateFlags.STRING_FORMATTED,
  GBIGINT: ArrayStateFlags.GBIGINT_FORMATTED,
};

/**
 * Returns the current TypeSpecificApiFormat of the provided array or undefined
 * if the array lacks IS_API_FORMATTED.
 * @param {!ArrayState} state
 * @return {!TypeSpecificApiFormat|undefined}
 */
function getTypeSpecificApiFormat(state) {
  if (hasFlagBit(state, ArrayStateFlags.IS_API_FORMATTED)) {
    if (hasFlagBit(state, ArrayStateFlags.STRING_FORMATTED)) {
      return TypeSpecificApiFormat.STRING;
    } else if (hasFlagBit(state, ArrayStateFlags.GBIGINT_FORMATTED)) {
      return TypeSpecificApiFormat.GBIGINT;
    }
    return TypeSpecificApiFormat.LEGACY;
  }

  return undefined;
}

/** @return {!TypeSpecificApiFormat} */
function getDefaultTypeSpecificApiFormat() {
  return getWriteBackGbigintValues() ? TypeSpecificApiFormat.GBIGINT :
                                       TypeSpecificApiFormat.LEGACY;
}

/**
 * @param {!ArrayState} state
 * @return {!ArrayState}
 */
function clearTypeSpecificFormattedFlagBits(state) {
  state = clearFlagBit(state, ArrayStateFlags.STRING_FORMATTED);
  state = clearFlagBit(state, ArrayStateFlags.GBIGINT_FORMATTED);

  return state;
}

/**
 * Tests whether or not the given array has been tagged with
 * `markApiFormattedField`.
 *
 * @param {!Array<?>} arr
 * @return {boolean}
 */
function isApiFormattedField(arr) {
  const state = getArrayStateInline(arr);
  return Boolean(state & ArrayStateFlags.IS_API_FORMATTED);
}

/**
 * Returns whether arr is an immutable array.
 * @param {!Array<?>} arr
 * @return {boolean}
 */
function isImmutableArray(arr) {
  const state = getArrayStateInline(arr);
  return Boolean(state & ArrayStateFlags.IS_IMMUTABLE_ARRAY);
}

/**
 * Marks arr as an immutable array.
 *
 * @param {!Array<T>} arr
 * @return {!Array<T>} arr
 * @template T
 */
function markArrayImmutable(arr) {
  addFlags(
      arr,
      ArrayStateFlags.IS_IMMUTABLE_ARRAY |
          ArrayStateFlags.MUTABLE_REFERENCES_ARE_OWNED);
  return arr;
}

/**
 * Marks arr as a known map array.
 *
 * @param {!Array<T>} arr
 * @return {!Array<T>} arr
 * @template T
 */
function markKnownMapArray(arr) {
  addFlags(arr, ArrayStateFlags.KNOWN_MAP_ARRAY);
  return arr;
}

/**
 * Marks arr as having owned references.
 *
 * @param {!Array<T>} arr
 * @return {!Array<T>}
 * @template T
 */
function markMutableReferencesAreOwned(arr) {
  addFlags(arr, ArrayStateFlags.MUTABLE_REFERENCES_ARE_OWNED);
  return arr;
}



/**
 * Marks arr as shared, unsetting the owned bit.
 *
 * @param {!Array<T>} arr
 * @return {!Array<T>} arr
 * @template T
 */
function markShared(arr) {
  clearFlags(arr, ArrayStateFlags.MUTABLE_REFERENCES_ARE_OWNED);
  return arr;
}

/**
 * Returns whether we know arr to only have owned references.
 *
 * @param {!ReadonlyArray<?>} arr
 * @return {boolean}
 */
function areMutableReferencesOwned(arr) {
  const state = getArrayStateInline(arr);
  return Boolean(state & ArrayStateFlags.MUTABLE_REFERENCES_ARE_OWNED);
}

/**
 * Marks arr as having been used to construct a message or map.
 *
 * @param {!Array<T>} arr
 * @return {!Array<T>} arr
 * @template T
 */
function markConstructed(arr) {
  addFlags(arr, ArrayStateFlags.CONSTRUCTED);
  return arr;
}


/** @typedef {number} */
let ArrayState;


/**
 * @param {!ArrayState} fromState
 * @param {boolean=} markImmutable
 * @return {!ArrayState}
 */
function copyArrayBitsClone(fromState, markImmutable) {
  // Preserve the following bits:
  // - IS_REPEATED_FIELD: this makes certain comparisons easier.
  // - HAS_MESSAGE_ID: This is important for pivot selection logic
  // - CONSTRUCTED: this bit lets us know we can trust the pivot value.
  // - PIVOT: Copy the pivot value if present
  //
  // We do not copy the following bits:
  // - IS_API_FORMATTED: For some repeated fields we could maintain this bit but
  //   there are subtleties with repeated messages that make this tricky. For
  //   now we drop it.
  //     - The same goes for many other repeated field bits.  There is an
  //       opportunity to improve this in the future.
  let flagsToAdd = ArrayStateFlags.MUTABLE_REFERENCES_ARE_OWNED;
  if (markImmutable) {
    flagsToAdd |= ArrayStateFlags.IS_IMMUTABLE_ARRAY;
  }
  const flagsToKeep = ArrayStateFlags.IS_REPEATED_FIELD |
      ArrayStateFlags.KNOWN_MAP_ARRAY | ArrayStateFlags.HAS_MESSAGE_ID |
      ArrayStateFlags.CONSTRUCTED | (PIVOT_MASK << PIVOT_OFFSET);
  return (fromState & flagsToKeep) | flagsToAdd;
}

// This value is higher than all field numbers but it is still small enough to
// be a SMI
const /** number */ NO_PIVOT = 1 << 29;

/** @return {number} */
function setPivot(/** !ArrayState */ arrayState, /** number */ pivot) {
  asserts.assertNumber(pivot);
  asserts.assert(
      pivot > 0 && pivot <= PIVOT_MASK || NO_PIVOT === pivot,
      'pivot must be in the range [1, 1024) or NO_PIVOT got %s', pivot);
  // clear old and set new
  // by masking pivot with PIVOT_MASK we implicitly turn NO_PIVOT into zero.
  return (arrayState & ~(PIVOT_MASK << PIVOT_OFFSET)) |
      ((pivot & PIVOT_MASK) << PIVOT_OFFSET);
}

/**
 * Returns the pivot where a sparse object should be written.
 *
 *
 * @return {number} @requireInlining
 */
function getPivot(/** !ArrayState */ arrayState) {
  asserts.assert(arrayState & ArrayStateFlags.CONSTRUCTED);
  return (arrayState >> PIVOT_OFFSET) & PIVOT_MASK || NO_PIVOT;
}

/** @return {number} @requireInlining */
function getArrayIndexOffsetInline(/** !ArrayState */ arrayState) {
  // If there is a message id it is 0 otherwise -1.
  //
  // NOTE: by making this a single expression we can keep this as an inlining
  // candidate
  asserts.assert(arrayState & ArrayStateFlags.CONSTRUCTED);
  return arrayState & ArrayStateFlags.HAS_MESSAGE_ID ? 0 : -1;
}

/**
 * @return {number}
 * @nosideeffects
 */
function getArrayIndexOffset(
    /** !ArrayState */ arrayState) {
  return getArrayIndexOffsetInline(arrayState);
}

if (goog.DEBUG) {
  // Capture the previous version of this property if any, this will happen if
  // there are multiple copies of this code loaded in the same window.
  const prev = Object.getOwnPropertyDescriptor(
      Array.prototype, objectProperty('jspbArrayState', Array.prototype));
  // Add a debug property to aid developer usecases in the console.
  Object.defineProperties(Array.prototype, {
    jspbArrayState: {
      /**
       * @this {!Array<?>}
       * @return {string}
       */
      get() {
        const formatted = prettyPrintArrayState(this);
        if (prev) {
          // compose with prior version if any.
          return prev.get.call(this) + '|' + formatted;
        }
        return formatted;
      },
      // Allow this property to be defined multiple times in case multiple
      // binaries are loaded onto the same page with this code.
      configurable: true,
      enumerable: false,
    },
  });
}

/** @return {string} */
function prettyPrintArrayState(/** !Array<?> */ array) {
  const arrayState = getArrayState(array);
  const bits = [];
  function maybeAddFlag(/** !ArrayStateFlags */ bit, /** string */ s) {
    if (bit & arrayState) {
      bits.push(s);
    }
  }
  maybeAddFlag(ArrayStateFlags.IS_REPEATED_FIELD, 'IS_REPEATED_FIELD');
  maybeAddFlag(ArrayStateFlags.IS_IMMUTABLE_ARRAY, 'IS_IMMUTABLE_ARRAY');
  maybeAddFlag(ArrayStateFlags.IS_API_FORMATTED, 'IS_API_FORMATTED');
  maybeAddFlag(ArrayStateFlags.STRING_FORMATTED, 'STRING_FORMATTED');
  maybeAddFlag(ArrayStateFlags.GBIGINT_FORMATTED, 'GBIGINT_FORMATTED');
  maybeAddFlag(ArrayStateFlags.GBIGINT_FORMATTED, 'BINARY');
  maybeAddFlag(ArrayStateFlags.ONLY_MUTABLE_VALUES, 'ONLY_MUTABLE_VALUES');
  maybeAddFlag(ArrayStateFlags.UNFROZEN_SHARED, 'UNFROZEN_SHARED');
  maybeAddFlag(
      ArrayStateFlags.MUTABLE_REFERENCES_ARE_OWNED,
      'MUTABLE_REFERENCES_ARE_OWNED');
  maybeAddFlag(ArrayStateFlags.CONSTRUCTED, 'CONSTRUCTED');
  maybeAddFlag(ArrayStateFlags.HAS_MESSAGE_ID, 'HAS_MESSAGE_ID');
  maybeAddFlag(ArrayStateFlags.FROZEN_ARRAY, 'FROZEN_ARRAY');
  maybeAddFlag(ArrayStateFlags.HAS_WRAPPER, 'HAS_WRAPPER');
  maybeAddFlag(ArrayStateFlags.MUTABLE_SUBSTRUCTURES, 'MUTABLE_SUBSTRUCTURES');
  maybeAddFlag(ArrayStateFlags.KNOWN_MAP_ARRAY, 'KNOWN_MAP_ARRAY');
  if (arrayState & ArrayStateFlags.CONSTRUCTED) {
    const pivot = getPivot(arrayState);
    if (pivot !== NO_PIVOT) {
      bits.push(`pivot: ${pivot}`);
    }
  }
  return bits.join(',');
}

exports = {
  ArrayState,
  ArrayStateFlags,
  DEFAULT_ARRAY_STATE,
  EMPTY_LIST_SENTINEL,
  NO_PIVOT,
  PIVOT_LIMIT,
  TypeSpecificApiFormat,
  addArrayStateFlags: addFlags,
  areMutableReferencesOwned,
  checkMessageStateInvariants,
  clearFlagBit,
  clearFlags,
  clearTypeSpecificFormattedFlagBits,
  copyArrayBitsClone,
  getArrayIndexOffsetInline,
  getArrayIndexOffset,
  getArrayState,
  getArrayStateInline,
  getDefaultTypeSpecificApiFormat,
  getMessageArrayState,
  getMessageArrayStateInline,
  getPivot,
  getPossiblyUnconstructedMessageArrayState,
  getPossiblyUnconstructedMessageArrayStateInline,
  getRepeatedArrayState,
  getTypeSpecificApiFormat,
  hasFlagBit,
  isApiFormattedField,
  isImmutableArray,
  markArrayImmutable,
  markConstructed,
  markKnownMapArray,
  markMutableReferencesAreOwned,
  markShared,
  prettyPrintArrayState,
  setArrayState,
  setFlagBit,
  setFlagBitTo,
  setPivot,
};
