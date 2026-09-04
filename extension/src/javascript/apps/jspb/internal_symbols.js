/**
 * @fileoverview Internal symbols and utilities for hidden state keeping.
 *
 * DO NOT USE THIS OUTSIDE OF THIS PACKAGE.
 */

goog.module('jspb.internal_symbols');

const {objectProperty} = goog.require('goog.reflect');

/** @define {boolean} */
const DISALLOW_NATIVE_SYMBOL =
    goog.define('jspb.DISALLOW_NATIVE_SYMBOL_FOR_TESTING', false);

/** @const {boolean} */
const HAS_NATIVE_SYMBOL = !DISALLOW_NATIVE_SYMBOL &&
    (goog.FEATURESET_YEAR >= 2018 ||
     // This particular condition is structured so that the jscompiler
     // recognizes it as feature detection and won't load the Symbol
     // polyfill due to this code.  The first check feature detects Symbol
     // and the second ensures that the version of Symbol that exists is
     // the native version.
     typeof Symbol === 'function' && typeof Symbol() === 'symbol');

/**
 * @param {string|undefined} name
 * @param {T} fallbackValue
 * @param {boolean=} useSymbolFor
 * @return {symbol|T}
 * @template T
 * @nosideeffects
 */
function createSymbolInternal(name, fallbackValue, useSymbolFor = false) {
  // Explicitly test support for native Symbol because Symbol is more performant
  // than generic properties, but we don't want to fallback to the polyfill
  // since that creates an enumerable property which isn't desirable.
  const symbol = !DISALLOW_NATIVE_SYMBOL &&
          (goog.FEATURESET_YEAR >= 2018 ||
           // This particular condition is structured so that the jscompiler
           // recognizes it as feature detection and won't load the Symbol
           // polyfill due to this code.  The first check feature detects Symbol
           // and the second ensures that the version of Symbol that exists is
           // the native version.
           (typeof Symbol === 'function' && typeof Symbol() === 'symbol')) ?
      ((useSymbolFor && Symbol.for && name) ?
           Symbol.for(name) :
           (name != null ? Symbol(name) : Symbol())) :
      fallbackValue;
  return symbol;
}

/**
 * @param {string} name
 * @param {T} fallbackValue
 * @return {symbol|T}
 * @template T
 * @nosideeffects
 * @requireInlining
 */
function createSymbol(name, fallbackValue) {
  return createSymbolInternal(goog.DEBUG ? name : undefined, fallbackValue);
}

/**
 * @param {string} name
 * @param {T} fallbackValue
 * @return {symbol|T}
 * @template T
 * @nosideeffects
 * @requireInlining
 */
function createSymbolFor(name, fallbackValue) {
  return createSymbolInternal(name, fallbackValue, /* useSymbolFor= */ true);
}

// Note: this uses Symbol.for to minimize issues with multiple
// copies of the JSPB runtime (see go/jspb-freeze-and-reload).
/** @const {symbol|undefined} */
const ARRAY_STATE_SYMBOL = createSymbolFor('jas', undefined);

/** @const {symbol|string} */
const DEFAULT_IMMUTABLE_INSTANCE_SYMBOL =
    /** @pureOrBreakMyCode */ (createSymbol('defaultInstance', '0di'));

/** @const {symbol|string} */
const DUPLICATED_EXTENSION_SYMBOL =
    /** @pureOrBreakMyCode */ (
        createSymbol('DUPLICATED_EXTENSION_SYMBOL', '2ex'));

/** @const {symbol|string} */
const ONEOF_ARRAY_SYMBOL =
    /** @pureOrBreakMyCode */ (createSymbol('oneofCases', '1oa'));

/** @const {symbol|string} */
const RETURNED_64BIT_INT_VALUE_MISMATCH_SYMBOL =
    /** @pureOrBreakMyCode */ (
        createSymbol('RETURNED_64BIT_INT_VALUE_MISMATCH', '64im'));

/** @const {symbol|string} */
const STRING_TYPE_DOWNGRADES_SYMBOL =
    /** @pureOrBreakMyCode */ (createSymbol('STRING_TYPE_DOWNGRADES', '0dg'));

/** @const {symbol|string} */
const CACHED_HASH_CODE_SYMBOL =
    /** @pureOrBreakMyCode */ (createSymbol('internalJspbHashCode', 'ijhc'));

/** @const {symbol} */
const COMPARISON_TYPE_INFO_SYMBOL =
    /** @pureOrBreakMyCode */ (
        createSymbol('internalComparisonTypeInfo', Symbol()));

/** @const {symbol} */
const UNKNOWN_BINARY_FIELDS_SYMBOL =
    /** @pureOrBreakMyCode */ (createSymbol('unknownBinaryFields', Symbol()));

/** @const {symbol|string} */
const UNKNOWN_BINARY_THROTTLE_KEY =
    createSymbol('unknownBinaryThrottleKey', '0ub');

/** @const {symbol|string} */
const UNKNOWN_BINARY_FIELD_IN_JSPB_SERIALIZE_THROTTLE_KEY =
    createSymbol('unknownBinaryThrottleKey', '0ubs');

/** @const {symbol|string} */
const UNKNOWN_JSPB_FIELD_IN_BINARY_SERIALIZE_THROTTLE_KEY =
    createSymbol('unknownBinarySerializeBinaryThrottleKey', '0ubsb');

/**
 * @const {symbol}
 *
 * NOTE: this cannot use Symbol.for because we depend on the value being this
 * module's Message type.
 */
const CACHED_JSPB_MESSAGE_ON_TRANSFERRED_ARRAY_SYMBOL =
    /** @pureOrBreakMyCode */ (
        createSymbol('cachedJspbMessageOnTransferredArray', Symbol()));

/** @const {symbol} */
const GET_CLONED_JSPB_ARRAY_ON_TRANSFERRED_ARRAY_SYMBOL =
    /** @pureOrBreakMyCode */ (createSymbolFor('_jcca', Symbol()));

/** @const {symbol|string} */
const ARRAY_SYMBOL_WARNING_KEY =
    /** @pureOrBreakMyCode */ (createSymbol('arraySymbolWarningKey', 'aswk'));

/** @const {symbol|string} */
const ALREADY_CONSTRUCTED_THROTTLE_KEY =
    /** @pureOrBreakMyCode */ (
        createSymbol('alreadyConstructedThrottleKey', '0actk'));

/** @const {symbol|string} */
const U8_THROTTLE_KEY =
    /** @pureOrBreakMyCode */ (createSymbol('uint8ArrayThrottleKey', '8utk'));

/** @interface */
class WithMessagePrototypeMarker {
  constructor() {
    /** @const {?} */
    this.messagePrototypeMarker;
  }
}

/** @const {symbol|string} */
const MESSAGE_PROTOTYPE_MARKER = /** @pureOrBreakMyCode */ (createSymbolFor(
    'm_m',
    objectProperty(
        'messagePrototypeMarker',
        /** @type {!WithMessagePrototypeMarker} */ (undefined))));

/** @const {symbol|string} */
const MULTIPLE_RUNTIMES_THROTTLE_KEY =
    /** @pureOrBreakMyCode */ (
        createSymbol('multipleRuntimesThrottleKey', 'mrtk'));

/** @const {symbol|string} */
const VALID_PIVOT_SELECTOR = createSymbol('validPivotSelector', 'vps');

/**
 * @const {symbol|undefined}
 * @tsType unique symbol
 */
const LAZILY_PARSE_LATE_LOADED_EXTENSIONS_SYMBOL =
    createSymbol('lazilyParseLateLoadedExtensions', undefined);

/**
 * @const {symbol|string}
 * @tsType unique symbol
 */
const KNOWN_MESSAGE_TYPE = createSymbol('knownMessageType', 'knownMessageType');

/**
 * @const {symbol|string}
 * @tsType unique symbol
 */
const DESTROYED = createSymbol('destroyedStructure', 'destroyedStructure');

exports = {
  ALREADY_CONSTRUCTED_THROTTLE_KEY,
  MESSAGE_PROTOTYPE_MARKER,
  ARRAY_STATE_SYMBOL,
  ARRAY_SYMBOL_WARNING_KEY,
  CACHED_HASH_CODE_SYMBOL,
  CACHED_JSPB_MESSAGE_ON_TRANSFERRED_ARRAY_SYMBOL,
  COMPARISON_TYPE_INFO_SYMBOL,
  DEFAULT_IMMUTABLE_INSTANCE_SYMBOL,
  DESTROYED,
  DUPLICATED_EXTENSION_SYMBOL,
  GET_CLONED_JSPB_ARRAY_ON_TRANSFERRED_ARRAY_SYMBOL,
  HAS_NATIVE_SYMBOL,
  KNOWN_MESSAGE_TYPE,
  LAZILY_PARSE_LATE_LOADED_EXTENSIONS_SYMBOL,
  MULTIPLE_RUNTIMES_THROTTLE_KEY,
  ONEOF_ARRAY_SYMBOL,
  RETURNED_64BIT_INT_VALUE_MISMATCH_SYMBOL,
  STRING_TYPE_DOWNGRADES_SYMBOL,
  U8_THROTTLE_KEY,
  UNKNOWN_BINARY_FIELDS_SYMBOL,
  UNKNOWN_BINARY_THROTTLE_KEY,
  UNKNOWN_JSPB_FIELD_IN_BINARY_SERIALIZE_THROTTLE_KEY,
  UNKNOWN_BINARY_FIELD_IN_JSPB_SERIALIZE_THROTTLE_KEY,
  VALID_PIVOT_SELECTOR,
  WithMessagePrototypeMarker,
};
