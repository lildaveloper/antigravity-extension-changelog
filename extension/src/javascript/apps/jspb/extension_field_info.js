goog.module('jspb.extension_field_info');
goog.module.declareLegacyNamespace();

const {ENABLE_ASSERTS, assert} = goog.require('goog.asserts');
const {HAS_MESSAGE_ID, HasMessageId, InternalExtensionFieldInfo, NO_MESSAGE_ID} = goog.require('jspb.internal');
const {LAZILY_PARSE_LATE_LOADED_EXTENSIONS_SYMBOL} = goog.require('jspb.internal_symbols');
const {Message} = goog.requireType('jspb');
const {sinkValue} = goog.require('goog.reflect');

/** @const {string} */
const INTERNAL_SYMBOL_NAME_PREFIX =
    goog.DEBUG ? 'jspbInternalDoNotUseExtensionSymbol$' : '';

/**
 * Stores information for a single extension field.
 *
 * For example, an extension field defined like so:
 *
 *     extend BaseMessage {
 *       optional MyMessage my_field = 123;
 *     }
 *
 * will result in an ExtensionFieldInfo object with these properties:
 *
 *     {
 *       fieldIndex: 123,
 *       extendeeCtor: proto.example.BaseMessage,
 *       ctor: proto.example.MyMessage,
 *       isRepeated: 0
 *       getExtensionFn: getWrapperFieldOrUndefined,
 *       setExtensionFn: setWrapperField,
 *       defaultValue: undefined
 *     }
 *
 * We include `toObjectFn` to allow the JSCompiler to perform dead-code
 * removal on unused toObject() methods.
 *
 * If an extension field is primitive, ctor will be undefined.
 * isRepeated should be 0 or 1.
 *
 * defaultValue is the explicit default value for a scalar extension, otherwise
 * it will be undefined.
 *
 * @template M
 * @template I
 * @template ME
 * @template IE
 * @template K
 * @implements {InternalExtensionFieldInfo}
 * @final
 */
class ExtensionFieldInfo {
  /**
   * @param {number} fieldIndex
   * @param {function(new:ME, ?Array=)} extendeeCtor
   * @param {?function(new: Message, ?Array=)} ctor
   * @param {number} isRepeated
   * @param {?} getExtensionFn For scalars, this should be the
   *     get*FieldWithDefault getter for the type. Messages should use
   *     getWrapperFieldOrUndefined. Repeated fields use getRepeated*Field for
   *     the type.
   * @param {?} getExtensionAtIndexFn
   * @param {?} getExtensionCountFn
   * @param {?} setExtensionFn The set*Field setter for the field type.
   * @param {?} setExtensionAtIndexFn
   * @param {?} addExtensionFn
   * @param {string|number|boolean|undefined} defaultValue The explicit default
   *     value if this is a scalar field with explicit default.
   * @param {(typeof LAZILY_PARSE_LATE_LOADED_EXTENSIONS_SYMBOL)|undefined}
   *     lazyParse
   * @private
   */
  constructor(
      fieldIndex, extendeeCtor, ctor, isRepeated, getExtensionFn,
      getExtensionAtIndexFn, getExtensionCountFn, setExtensionFn,
      setExtensionAtIndexFn, addExtensionFn, defaultValue, lazyParse) {
    assert(fieldIndex > 0);
    /** @override @const {number} */
    this.fieldIndex = fieldIndex;
    if (ENABLE_ASSERTS) {
      // Only define this property if asserts are enabled since it will only be
      // used for an assert.
      /** @override @protected @const */
      this.extendeeCtor = extendeeCtor;
    }
    /** @override @const {?function(new: Message, ?Array=)} */
    this.ctor = ctor;
    /** @override @const {number} */
    this.isRepeated = isRepeated;
    /** @private @const {?} */
    this.getExtensionFn = getExtensionFn;
    /** @private @const {?} */
    this.getExtensionCountFn = getExtensionCountFn;
    /** @private @const {?} */
    this.getExtensionAtIndexFn = getExtensionAtIndexFn;
    /** @private @const {?} */
    this.setExtensionFn = setExtensionFn;
    /** @private @const {?} */
    this.addExtensionFn = addExtensionFn;
    /** @private @const {?} */
    this.setExtensionAtIndexFn = setExtensionAtIndexFn;
    /** @private @const {string|number|boolean|undefined} */
    this.defaultValue = defaultValue;
    /** @const {!HasMessageId|undefined} */
    this.hasMessageId =
        /** @type {{messageId: (string|undefined)}} */ (extendeeCtor)
                .messageId != null ?
        HAS_MESSAGE_ID :
        NO_MESSAGE_ID;
    /**
     * @package @const {(typeof
     *     LAZILY_PARSE_LATE_LOADED_EXTENSIONS_SYMBOL)|undefined}
     * @nodts
     */
    this.lazyParse = lazyParse;
    assert(
        lazyParse === undefined ||
            lazyParse === LAZILY_PARSE_LATE_LOADED_EXTENSIONS_SYMBOL,
        'lazyParse must be undefined or LAZILY_PARSE_LATE_LOADED_EXTENSIONS_SYMBOL');
    if (!COMPILED) {
      /**
       * A symbol key for use in the go/jspb-fields-interface.
       *
       * This will be deleted in compiled code. Please contact g/web-protos-team
       * if you have a use-case that requires it.
       *
       * @public @const {symbol}
       * @tsType: K
       */
      this.key = Symbol(INTERNAL_SYMBOL_NAME_PREFIX + fieldIndex);
    }
  }

  /**
   * Registers this extension field. This ensures it will not be dropped on
   * binary serialization or deserialization.
   *
   * Unlike a simple import, this function forces the compiler to load this
   * extension before execution can proceed.
   *
   * @encourageInlining
   */
  register() {
    sinkValue(this);
  }

  /**
   * @return {boolean} Does this field represent a sub Message?
   */
  isMessageType() {
    return !!this.ctor;
  }
}

exports = {ExtensionFieldInfo};
