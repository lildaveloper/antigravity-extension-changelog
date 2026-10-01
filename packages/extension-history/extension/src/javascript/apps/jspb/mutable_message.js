/**
 * @fileoverview Mutable message type variant.
 */

goog.module('jspb.mutable_message');

const {ExtensionFieldInfo} = goog.requireType('jspb.extension_field_info');
const {Message} = goog.require('jspb');
const {SUPPORTS_HAS_INSTANCE, invisiblePropValue} = goog.require('jspb.internal');
const {USE_DETAILED_MESSAGE_TYPE_HIERARCHY} = goog.require('jspb.internal_options');
const {assert, assertInstanceof} = goog.require('goog.asserts');
const {copyMutableWithImmutableFields} = goog.require('jspb.internal_immutability');


/**
 * Virtual base class for all mutable jspb messages.
 *
 * This class does not exist at runtime in compiled code: do not reference it.
 *
 * @template I
 * @abstract
 */
class MutableMessageImpl extends Message {
  /**
   * Gets the value of the extension field from the extended object.
   *
   * This may actually return `null|undefined` (b/26920357) but is incorrectly
   * typed: prefer using `getExtensionOrUndefined` which is more explicit. See
   * go/jspb-api-gotchas#nullability
   *
   * @override
   * @param {!ExtensionFieldInfo<EM, EI, EXTENDEE, IE>} fieldInfo Specifies the
   *     field to get.
   * @return {EM} The value of the field.
   * @template EM, EI, IE
   * @template THIS
   * Use TTL to force agreement between the extendee and this, otherwise the
   * jscompiler may resolve mismatches with a union which may cause errors to go
   * unnoticed or create odd error messages.
   * @template EXTENDEE := THIS =:
   * @this {THIS}
   * @tsType <
   *   THIS,
   *   MValue,
   *   IValue,
   *   MExtendee extends
   *     | THIS
   *     |
   * import('google3/javascript/apps/jspb/mutable_message').MutableMessage<THIS>,
   *   IExtendee extends
   *     | THIS
   *     | import('google3/javascript/apps/jspb/immutable_message')
   *           .ImmutableMessage<THIS>
   * >(
   *   this: THIS,
   *   fieldInfo: import('google3/javascript/apps/jspb/extension_field_info')
   *       .ExtensionFieldInfo<
   *     MValue,
   *     IValue,
   *     MExtendee,
   *     IExtendee
   *   >
   * ): THIS extends import('google3/javascript/apps/jspb/immutable_message')
   *     .ImmutableMessage
   *   ? never
   *   : MValue
   */
  getExtension(fieldInfo) {
    return Message.prototype.getExtension.call(
        /** @type {!Message} */ (this), fieldInfo);
  }

  /**
   * Gets the value of the message-valued extension field from the extended
   * object as a mutable message.
   *
   * This can be singular or repeated, if singular and not present, this
   * accessor creates a new instance and writes it back to the parent proto. If
   * repeated, it coerces all values to mutable and writes them back to the
   * parent proto.
   *
   * @public
   * @override
   * @param {!ExtensionFieldInfo<EM, EI, EXTENDEE>} fieldInfo Specifies the
   *     field to get.
   * @return {EM} The value of the field.
   * @template EM, EI
   * @template THIS
   * Use TTL to force agreement between the extendee and this, otherwise the
   * jscompiler may resolve mismatches with a union which may cause errors to go
   * unnoticed or create odd error messages.
   * @template EXTENDEE := THIS =:
   * @this {THIS}
   * @suppress {visibility} ExtensionFieldInfo internals.
   * @tsType <
   *   THIS,
   *   MValue extends
   *     | import('google3/javascript/apps/jspb/mutable_message').MutableMessage
   *     | ReadonlyArray<
   *         import('google3/javascript/apps/jspb/mutable_message').MutableMessage
   *       >,
   *   IValue extends
   *     |
   * import('google3/javascript/apps/jspb/immutable_message').ImmutableMessage
   *     | ReadonlyArray<
   *         import('google3/javascript/apps/jspb/immutable_message').ImmutableMessage
   *       >,
   *   MExtendee extends
   *     THIS extends import('google3/javascript/apps/jspb/immutable_message')
   *         .ImmutableMessage<unknown>
   *       ?
   * import('google3/javascript/apps/jspb/mutable_message').MutableMessage<THIS>
   *       : THIS
   * >(
   *   this: THIS,
   *   fieldInfo: import('google3/javascript/apps/jspb/extension_field_info')
   *       .ExtensionFieldInfo<
   *     MValue,
   *     IValue,
   *     MExtendee
   *   >
   * ): THIS extends import('google3/javascript/apps/jspb/immutable_message')
   *     .ImmutableMessage<unknown>
   *   ? never
   *   : MValue
   */
  getMutableExtension(fieldInfo) {
    return super.getMutableExtension(fieldInfo);
  }

  /**
   * Gets the value of the singular extension field from the extended object,
   * returning `undefined` if it is not present.
   *
   * @override
   * @param {!ExtensionFieldInfo<EM, EI, THIS, IE>}
   *     fieldInfo Specifies the field to get.
   * @return {!MESSAGE_TYPE_NOT_ARRAY|undefined} The value of the field.
   * @template EM, EI, IE
   * @template THIS
   * @this {THIS}
   * @template MESSAGE_TYPE_NOT_ARRAY :=
   *     cond(isUnknown(EM), unknown(),
   *       mapunion(EM, (X) =>
   *         cond(eq(X, 'undefined'), none(),
   *           cond(sub(X, 'ReadonlyArray'), none(),
   *             X))))
   * =:
   * @tsType <
   *   THIS,
   *   MValue,
   *   IValue,
   *   MExtendee extends
   *     | THIS
   *     |
   * import('google3/javascript/apps/jspb/mutable_message').MutableMessage<THIS>,
   *   IExtendee extends
   *     | THIS
   *     | import('google3/javascript/apps/jspb/immutable_message')
   *           .ImmutableMessage<THIS>
   * >(
   *   this: THIS,
   *   fieldInfo: import('google3/javascript/apps/jspb/extension_field_info')
   *       .ExtensionFieldInfo<
   *     Exclude<MValue, readonly unknown[]>,
   *     Exclude<IValue, readonly unknown[]>,
   *     MExtendee,
   *     IExtendee
   *   >
   * ): MValue | undefined
   */
  getExtensionOrUndefined(fieldInfo) {
    return Message.prototype.getExtensionOrUndefined.call(
        /** @type {!Message} */ (this), fieldInfo);
  }

  /**
   * Sets the value of the extension field in the extended object.
   *
   * @override
   * @public
   * @param {!ExtensionFieldInfo<EM, EI, EXTENDEE, IE>} fieldInfo Specifies the
   *     field to set.
   * @param {M_OR_I_OR_NULL_OR_UNDEFINED} value The value to set.
   * @return {THIS} For chaining
   * @template THIS, EM, EI, IE
   * Use TTL to force agreement between the extendee and this, otherwise the
   * jscompiler may resolve mismatches with a union which may cause errors to go
   * unnoticed or create odd error messages.
   * @template EXTENDEE := THIS =:
   * Use TTL to prevent type inference on value
   * @template M_OR_I_OR_NULL_OR_UNDEFINED := union(EM, EI, 'null', 'undefined')
   *     =:
   * @this {THIS}
   * @tsType <
   *   THIS extends
   *     import('google3/javascript/apps/jspb/mutable_message').MutableMessage<unknown>,
   *   MValue,
   *   IValue
   * >(
   *   this: THIS,
   *   fieldInfo: import('google3/javascript/apps/jspb/extension_field_info')
   *       .ExtensionFieldInfo<
   *     MValue,
   *     IValue,
   *     THIS
   *   >,
   *   value: MValue | IValue | null | undefined
   * ): this
   */
  setExtension(fieldInfo, value) {
    return Message.prototype.setExtension.call(
        /** @type {!Message} */ (this), fieldInfo, value);
  };

  /**
   * Clears the value of an extension field in the extended object.
   *
   * If you pass `undefined` to this method, it unsets the extension.
   *
   * @override
   * @public
   * @param {!ExtensionFieldInfo<EM, EI, EXTENDEE>} fieldInfo Specifies the
   *     field to set.
   * @return {THIS} For chaining
   * @template THIS, EM, EI
   * Use TTL to force agreement between the extendee and this, otherwise the
   * jscompiler may resolve mismatches with a union which may cause errors to go
   * unnoticed or create odd error messages.
   * @template EXTENDEE := THIS =:
   * Use TTL to prevent type inference on value
   * @template M_OR_I_OR_NULL_OR_UNDEFINED := union(EM, EI, 'null', 'undefined')
   *     =:
   * @this {THIS}
   * @suppress {visibility} ExtensionFieldInfo internals.
   * @tsType <
   *   THIS extends
   *     import('google3/javascript/apps/jspb/mutable_message').MutableMessage<unknown>,
   *   MValue,
   *   IValue
   * >(
   *   this: THIS,
   *   fieldInfo: import('google3/javascript/apps/jspb/extension_field_info')
   *       .ExtensionFieldInfo<
   *     MValue,
   *     IValue,
   *     THIS
   *   >
   * ): this
   */
  clearExtension(fieldInfo) {
    return Message.prototype.clearExtension.call(
        /** @type {!Message} */ (this), fieldInfo);
  }

  /**
   * Sets the value of the extension field in the extended object.
   *
   * If you pass `undefined` to this method, it unsets the extension.
   *
   * @override
   * @public
   * @param {!ExtensionFieldInfo<!ReadonlyArray<EM>, !ReadonlyArray<EI>,
   *     EXTENDEE>} fieldInfo Specifies the field to get.
   * @param {number} index The index of the value to set.
   * @param {M_OR_I} value The value to set.
   * @return {THIS} For chaining
   * @template THIS, EM, EI
   * Use TTL to force agreement between the extendee and this, otherwise the
   * jscompiler may resolve mismatches with a union which may cause errors to go
   * unnoticed or create odd error messages.
   * @template EXTENDEE := THIS =:
   * Use TTL to prevent type inference on value
   * @template M_OR_I := union(EM, EI) =:
   * @this {THIS}
   * @suppress {visibility} ExtensionFieldInfo internals.
   * @tsType <
   *   THIS,
   *   MValue extends ReadonlyArray<any>,
   *   IValue extends ReadonlyArray<any>,
   *   MExtendee extends
   *     | THIS
   *     |
   * import('google3/javascript/apps/jspb/mutable_message').MutableMessage<THIS>,
   *   IExtendee extends
   *     | THIS
   *     | import('google3/javascript/apps/jspb/immutable_message')
   *           .ImmutableMessage<THIS>
   * >(
   *   this: THIS,
   *   fieldInfo: import('google3/javascript/apps/jspb/extension_field_info')
   *       .ExtensionFieldInfo<
   *     MValue,
   *     IValue,
   *     MExtendee,
   *     IExtendee
   *   >,
   *   idx: number,
   *   value: MValue[number] | IValue[number]
   * ): THIS
   */
  setExtensionAtIndex(fieldInfo, index, value) {
    return Message.prototype.setExtensionAtIndex.call(
        /** @type {!Message} */ (this), fieldInfo, index, value);
  }

  /**
   * Gets a value in a repeated extension field.
   *
   * @override
   * @public
   * @param {!ExtensionFieldInfo<!ReadonlyArray<M>, !ReadonlyArray<I>,
   *     EXTENDEE>} fieldInfo Specifies the field to get.
   * @param {number} idx The index to read from this field.
   * @return {M} The value of the field.
   * @template M, I
   * @template THIS
   * Use TTL to force agreement between the extendee and this, otherwise the
   * jscompiler may resolve mismatches with a union which may cause errors to go
   * unnoticed or create odd error messages.
   * @template EXTENDEE := THIS =:
   * @this {THIS}
   * @suppress {visibility} ExtensionFieldInfo internals.
   * @tsType <
   *   THIS,
   *   MValue extends ReadonlyArray<
   *         import('google3/javascript/apps/jspb/mutable_message').MutableMessage
   *       >,
   *   IValue extends ReadonlyArray<
   *         import('google3/javascript/apps/jspb/immutable_message').ImmutableMessage
   *       >,
   *   MExtendee extends
   *     | THIS
   *     |
   * import('google3/javascript/apps/jspb/mutable_message').MutableMessage<THIS>,
   *   IExtendee extends
   *     | THIS
   *     | import('google3/javascript/apps/jspb/immutable_message')
   *           .ImmutableMessage<THIS>
   * >(
   *   this: THIS,
   *   fieldInfo: import('google3/javascript/apps/jspb/extension_field_info')
   *       .ExtensionFieldInfo<
   *     MValue,
   *     IValue,
   *     MExtendee,
   *     IExtendee
   *   >,
   *   idx: number
   * ): MValue[number]
   */
  getMutableExtensionAtIndex(fieldInfo, idx) {
    return Message.prototype.getMutableExtensionAtIndex.call(
        /** @type {!Message} */ (this), fieldInfo, idx);
  }

  /**
   * Sets the value of the extension field in the extended object.
   *
   * If you pass `undefined` to this method, it unsets the extension.
   *
   * @override
   * @public
   * @param {!ExtensionFieldInfo<!ReadonlyArray<EM>, !ReadonlyArray<EI>,
   *     EXTENDEE>} fieldInfo Specifies the field to get.
   * @param {M_OR_I} value The value to set.
   * @return {THIS} For chaining
   * @template THIS, EM, EI
   * Use TTL to force agreement between the extendee and this, otherwise the
   * jscompiler may resolve mismatches with a union which may cause errors to go
   * unnoticed or create odd error messages.
   * @template EXTENDEE := THIS =:
   * Use TTL to prevent type inference on value
   * @template M_OR_I := union(EM, EI) =:
   * @this {THIS}
   * @suppress {visibility} ExtensionFieldInfo internals.
   * @tsType <
   *   THIS,
   *   MValue extends ReadonlyArray<any>,
   *   IValue extends ReadonlyArray<any>,
   *   MExtendee extends
   *     | THIS
   *     |
   * import('google3/javascript/apps/jspb/mutable_message').MutableMessage<THIS>,
   *   IExtendee extends
   *     | THIS
   *     | import('google3/javascript/apps/jspb/immutable_message')
   *           .ImmutableMessage<THIS>
   * >(
   *   this: THIS,
   *   fieldInfo: import('google3/javascript/apps/jspb/extension_field_info')
   *       .ExtensionFieldInfo<
   *     MValue,
   *     IValue,
   *     MExtendee,
   *     IExtendee
   *   >,
   *   value: MValue[number] | IValue[number]
   * ): THIS
   */
  addExtension(fieldInfo, value) {
    return Message.prototype.addExtension.call(
        /** @type {!Message} */ (this), fieldInfo, value);
  }

  /**
   * Builds this message into an immutable one.
   *
   * @override
   * @public
   * @return {!I}
   * @tsType (): I
   */
  toImmutable() {
    return Message.prototype.toImmutable.call(/** @type {!Message} */ (this));
  }

  /**
   * No-op.
   *
   * @protected so that this method is not accessible on readonly types.
   * @return {!THIS}
   * @this {THIS}
   * @template THIS
   * @override
   * @tsType (): this
   */
  toMutable() {
    return Message.prototype.toMutable.call(/** @type {!Message} */ (this));
  }

  /**
   * Makes a deep copy of this message.
   *
   * Named `clone` for compatibility with `goog.object.unsafeClone`
   *
   * @override
   * @public
   * @return {T}
   * @this {T}
   * @template T
   * @tsType (): this
   */
  clone() {
    // This implementation is identical to Message.prototype.clone due to
    // b/265047960, which causes misoptimization when we use super.clone.
    const self = assertInstanceof(this, Message);
    return /** @type {!T} */ (copyMutableWithImmutableFields(self));
  }

  /**
   * Returns a an immutable default instance for the type of this message.
   *
   * @override
   * @public
   * @return {!I}
   */
  getDefaultInstanceForType() {
    return /** @type {!I} */ (Message.prototype.getDefaultInstanceForType.call(
        /** @type {!Message} */ (this)));
  }

  /**
   * Do not call this method, you cannot use static-side inheritance since
   * it will be deleted at runtime.
   *
   * @deprecated Call Message.equals directly
   * @package
   * @override
   */
  static equals() {
    throw new Error(
        'Call equals directly on the Message class, not a subclass');
  }
}

/*
 * Overrides the behavior of `instanceof` to prevent checks.
 *
 * Technically, the runtime instances declared as `ImmutableMessage` will
 * have `MutableMessage` in their prototype chain; so an `instanceof` check
 * will be a highly incorrect means to decide a value's immutability. For this
 * reason, we should prevent these checks on `MutableMessage`.
 */
if (SUPPORTS_HAS_INSTANCE && USE_DETAILED_MESSAGE_TYPE_HIERARCHY) {
  const rejectInstanceof = () => {
    throw new Error(
        goog.DEBUG ?
            ('Cannot perform instanceof checks for MutableMessage. Please use ' +
             '.isMutable or .isImmutable to determine whether a message is ' +
             'mutable. See go/jspb-api-gotchas#immutable-classes for more ' +
             'information') :
            undefined);
  };
  // TODO(b/219105470): use defineProperty once JSC supports it
  Object.defineProperties(MutableMessageImpl, {
    [Symbol.hasInstance]: invisiblePropValue(rejectInstanceof),
  });
  assert(
      MutableMessageImpl[Symbol.hasInstance] === rejectInstanceof,
      'defineProperties did not work: was it monkey-patched?');
}

/**
 * Virtual base class for all mutable jspb messages.
 *
 * This class does not exist at runtime in compiled code: do not reference it.
 *
 * This is conditional so that we get detailed type overrides in DEBUG but
 * they do not incur additional costs due to the length of their prototype
 * chain in production (especially during message construction.
 *
 * @type {typeof MutableMessageImpl}
 */
const MutableMessage = /** @type {typeof MutableMessageImpl} */ (
    USE_DETAILED_MESSAGE_TYPE_HIERARCHY ? MutableMessageImpl : Message);

exports = {
  MutableMessage,
};
