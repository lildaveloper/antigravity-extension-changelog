/**
 * @fileoverview defines the interface of the message base class. This is
 * intended to be used by J2CL to ensure properties are renamed correctly.
 *
 * For most consumers, there will not be a good reason to use these types.
 */
goog.module('jspb.message_interface');

/**
 * Interface for proto messages.
 *
 * @template IMMUTABLE_MESSAGE_TYPE
 * @template MUTABLE_MESSAGE_TYPE
 * @interface
 */
class ReadonlyMessageInterface {
  /**
   * Returns the internal JSON representation of a proto in JSPB wire format.
   * The return value of this method should not be used directly but rather be
   * treated as an opaque value that can be send to the server or be used to
   * construct another proto.
   * @return {string}
   */
  serialize() {}

  /**
   * Returns a parser that takes a JSPB wire format string and returns a new
   * message of the same type as this message.
   * @private this is not always available.
   * @return {function(string): IMMUTABLE_MESSAGE_TYPE}
   */
  getParserForType() {}

  /**
   * Get an instance of the type with no fields set.
   * @private this is not always available.
   * @return {!IMMUTABLE_MESSAGE_TYPE}
   */
  getDefaultInstanceForType() {}

  /**
   * Returns true for any proto that is a message of the same type and contains
   * identical values.
   * @private this is not always available.
   * @param {*} other
   * @return {boolean}
   */
  equals(other) {}

  /**
   * Returns a number (int32) that is suitable for use in hashed structures.
   * @return {number}
   * @private this is not always available.
   */
  hashCode() {}

  /**
   * Returns a builder initialized with the values of this message.
   * @return {MUTABLE_MESSAGE_TYPE}
   */
  toBuilder() {}

  /**
   * If this message is mutable, returns it. If this message is immutable,
   * returns a clone.
   * @return {MUTABLE_MESSAGE_TYPE}
   */
  toMutable() {}

  /**
   * Returns a mutable clone of this message. Copies whether or not the message
   * is immutable.
   * @return {MUTABLE_MESSAGE_TYPE}
   */
  clone() {}

  /**
   * Gets the value of an extension.
   * @param {?} extensionInfo
   * @return {?}
   */
  getExtension(extensionInfo) {}

  /**
   * Returns the element at the specified position of the repeated extension.
   * @param {?} extensionInfo
   * @param {number} index
   * @return {?}
   */
  getExtensionAtIndex(extensionInfo, index) {}

  /**
   * Returns the number of elements in a repeated extension.
   * @param {?} extensionInfo
   * @return {number}
   */
  getExtensionCount(extensionInfo) {}

  /**
   * Returns true if a singular extension is present.
   * @param {?} extensionInfo
   * @return {boolean}
   */
  hasExtension(extensionInfo) {}
}


/**
 * Interface for mutable proto types.
 *
 * @template IMMUTABLE_MESSAGE_TYPE
 * @template MUTABLE_MESSAGE_TYPE
 * @interface
 * @extends {ReadonlyMessageInterface}
 */
class MutableMessageInterface {
  /**
   * Constructs the message based on the state of the Builder. Subsequent
   * changes to the Builder will not affect the returned message.
   *
   * @return {IMMUTABLE_MESSAGE_TYPE}
   */
  build() {}

  /**
   * Constructs the message based on the state of the Builder. Subsequent
   * changes to the Builder will not affect the returned message.
   *
   * @return {IMMUTABLE_MESSAGE_TYPE}
   */
  toImmutable() {}

  /**
   * Clones this proto as a mutable message.
   *
   * @return {MUTABLE_MESSAGE_TYPE}
   */
  clone() {}

  /**
   * Appends a value to a repeated extension.
   * @param {?} extensionInfo
   * @param {?} value
   * @return {MUTABLE_MESSAGE_TYPE}
   */
  addExtension(extensionInfo, value) {}

  /**
   * Clears an extension.
   * @param {?} extensionInfo
   * @return {MUTABLE_MESSAGE_TYPE}
   */
  clearExtension(extensionInfo) {}

  /**
   * Gets the value of an extension.
   * @param {?} extensionInfo
   * @return {?}
   */
  getExtension(extensionInfo) {}

  /**
   * Returns the element at the specified position of the repeated extension.
   * @param {?} extensionInfo
   * @param {number} index
   * @return {?}
   */
  getExtensionAtIndex(extensionInfo, index) {}

  /**
   * Returns the number of elements in a repeated extension.
   * @param {?} extensionInfo
   * @return {number}
   */
  getExtensionCount(extensionInfo) {}

  /**
   * Returns true if a singular extension is present.
   * @param {?} extensionInfo
   * @return {boolean}
   */
  hasExtension(extensionInfo) {}

  /**
   * Sets the value of an extension.
   * @param {?} extensionInfo
   * @param {?} value
   * @return {MUTABLE_MESSAGE_TYPE}
   */
  setExtension(extensionInfo, value) {}

  /**
   * Sets the element at the specified position of the repeated extension.
   * @param {?} extensionInfo
   * @param {number} index
   * @param {?} value
   * @return {MUTABLE_MESSAGE_TYPE}
   */
  setExtensionAtIndex(extensionInfo, index, value) {}
}


exports = {
  ReadonlyMessageInterface,
  MutableMessageInterface,
};
