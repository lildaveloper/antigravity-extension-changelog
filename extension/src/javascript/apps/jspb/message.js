/**
 * @fileoverview Main library for JSPB, includes functions and classes related
 * to `Message` the baseclass of all generated protocol buffers.
 *
 * Functionality should go in this file if it is part of `Message` or is
 * directly related to `Message` and can't be reasonably used independently of
 * `Message`.  If the functionality is only needed for rare cases or by the
 * generated code, it would ideally go in a different file.
 */
goog.module('jspb');

const asserts = goog.require('goog.asserts');
const xid = goog.requireType('xid');
const {ArrayStateFlags, copyArrayBitsClone, getMessageArrayState, markArrayImmutable, markMutableReferencesAreOwned, setArrayState} = goog.require('jspb.internal_array_state');
const {DETAILED_JSPB_ASSERTS, GENERATE_TYPE_NAME_PROPERTIES, USE_DETAILED_MESSAGE_TYPE_HIERARCHY, getCheckEqualsConsistentWithHashCode, getCheckEqualsDoesNotChangeWithTypeInformation} = goog.require('jspb.internal_options');
const {EXEMPTED_SUBCLASS_MARKER, GENERATED_SUBCLASS_MARKER, InternalMessage, MESSAGE_PROTOTYPE_MARKER_VALUE, checkMutableMessage, disallowPassingToStructuredClone, getHasMessageId, getInternalArray, isImmutableMessage, isSparseObject, setInternalArray, setInternalArrayForNewMessage, setMessageCtorInDebug} = goog.require('jspb.internal');
const {ExtensionFieldInfo} = goog.requireType('jspb.extension_field_info');
const {ImmutableMessage} = goog.requireType('jspb.immutable_message');
const {KNOWN_MESSAGE_TYPE, MESSAGE_PROTOTYPE_MARKER} = goog.require('jspb.internal_symbols');
const {MutableMessageInterface} = goog.require('jspb.message_interface');
const {MutableMessage} = goog.requireType('jspb.mutable_message');
const {PivotSelector} = goog.require('jspb.dynamic_pivot_selection');
const {clearField, getMutableWrapperField, getReadonlyRepeatedWrapperField, getReadonlyWrapperField, getRepeatedFieldReturnType, getRepeatedIndexedMutableWrapper, hasWrapperField} = goog.require('jspb_internal_adapters');
const {clearUnknownField, maybeReviveUnknownField, recordUnknownFieldAccess} = goog.require('jspb.internal_unknown_fields');
const {cloneRaw, toJsonValue} = goog.require('jspb.internal_copy');
const {compareFields, compareMessages} = goog.require('jspb.internal_compare');
const {constructMessageArrayForMessageConstructor} = goog.require('jspb.internal_construct');
const {copyMutableIntoMessage, copyMutableWithImmutableFields, deserializeAsImmutable, messageToImmutable, messageToMutable} = goog.require('jspb.internal_immutability');
const {dumpInternal} = goog.require('jspb.internal_dump');
const {getDefaultImmutableInstance} = goog.require('jspb.internal_accessor_helpers');
const {hashCode} = goog.require('jspb.internal_j2cl_helpers');
const {logNewArray, logOperation, withoutLogging} = goog.require('jspb.internal_operations');
const {transferArray} = goog.require('jspb.internal.transfer_array');
/** @suppress {extraRequire} used by TTL. */
goog.requireType('jspb.immutable_message.ImmutableMessage');
/** @suppress {extraRequire} used by TTL. */
goog.requireType('jspb.mutable_message.MutableMessage');


/**
 * @define {boolean} Whether to generate toString methods for objects. Turn
 *     this off if you do not use toString in your project and want to trim it
 *     from the compiled JS.
 */
const GENERATE_TO_STRING = goog.define('jspb.Message.GENERATE_TO_STRING', true);


/**
 * Base class for all JsPb messages.
 *
 * Several common methods (toObject, serializeBinary, in particular) are not
 * defined on the prototype to encourage code patterns that minimize code bloat
 * due to otherwise unused code on all protos contained in the project.
 *
 * If you want to call these methods on a generic message, either
 * pass in your instance of method as a parameter:
 *     someFunction(instanceOfKnownProto,
 *                  KnownProtoClass.prototype.serializeBinary);
 * or use a lambda that knows the type:
 *     someFunction(()=>instanceOfKnownProto.serializeBinary());
 * or, if you don't care about code size, just suppress the
 *     WARNING - Property serializeBinary never defined on Message
 * and call it the intuitive way.
 *
 * @abstract
 * @struct
 * @implements {InternalMessage}
 * @implements {MutableMessageInterface<ImmutableMessage, MutableMessage>}
 */
class Message {
  /**
   * @param {?Array<?>|undefined} data An initial data array.
   * @param {number=} suggestedPivot The field number at which to
   *     firstFieldIndex putting fields into the extension object. This is only
   *     used if data does not contain an extension object already. 0/undefined
   *     if no extension object is required for this message type.
   * @param {string=} messageId The jspb message_id if any
   */
  constructor(data, suggestedPivot, messageId) {
    // We set this below if it's a property and not a symbol but we need to
    // declare it here.
    /** @const {undefined} */
    this.messagePrototypeMarker;

    if (goog.DEBUG) {
      makeMessageUnpredicable(this);
      disallowPassingToStructuredClone(this);

      // Add some debug only consistency checks
      // Were we directly called?
      asserts.assertInstanceof(
          this, Message,
          'The message constructor should only be used by subclasses');

      // Were we directly instantiated?
      asserts.assert(
          this.constructor !== Message,
          'Message is an abstract class and cannot be directly constructed');

      const ctor = this.constructor;
      if (data &&
          ((/** @type {?} */ (data)[KNOWN_MESSAGE_TYPE] ??= ctor) !== ctor)) {
        throw new Error('data must only be constructed with one message type');
      }

      // Now check that we are an expected subclass, or explicitly exempted.
      if (asserts.ENABLE_ASSERTS &&
          // Cast is necessary to remove @struct
          (/** @type {!Object} */ (this)[EXEMPTED_SUBCLASS_MARKER] !== true) &&
          USE_DETAILED_MESSAGE_TYPE_HIERARCHY) {
        // We could technically do both checks at once with the second assert,
        // but this leads to slightly better error messages.

        // Is this a subclass of GeneratedMessage?
        asserts.assert(
            // Cast is necessary to remove @struct
            /** @type{!Object} */ (this)[GENERATED_SUBCLASS_MARKER] === true,
            'Message can only be subclassed by proto gencode.');
        const parentPrototype =
            Object.getPrototypeOf(asserts.assert(Object.getPrototypeOf(this)));
        // Is the concrete type a direct subclass of GeneratedMessage.
        asserts.assert(
            parentPrototype.hasOwnProperty(GENERATED_SUBCLASS_MARKER),
            'Generated jspb classes should not be extended');
      }
    }

    setInternalArrayForNewMessage(
        this,
        constructMessageArrayForMessageConstructor(
            data, suggestedPivot, messageId));

    if (goog.DEBUG && asserts.ENABLE_ASSERTS) {
      const arrayState = getMessageArrayState(getInternalArray(this));
      asserts.assert(arrayState & ArrayStateFlags.CONSTRUCTED);
      asserts.assert(arrayState & ArrayStateFlags.HAS_WRAPPER);
      if (DETAILED_JSPB_ASSERTS) logOperation({constructMessage: 1});
    }
  }

  /**
   * Returns the JsPb message_id of this proto.
   * @deprecated using this can encourage changing the value of message_id on
   *   the message, which is highly breaking per go/jspb-options#message_id.
   * @override
   * @return {string|undefined} the message id or undefined if this message
   *     has no id.
   */
  getJsPbMessageId() {
    return /** @type {{messageId: (string|undefined)}} */ (this.constructor)
        .messageId;
  }

  /**
   * Returns this JSPB as a JSON-compatible array.
   *
   * WARNING: The objects returned should be treated as opaque values and only
   * used for passing data eventually to a supported JSPB parser. Dereferencing
   * into these objects to retrieve data is not supported and subject to random
   * breakages.
   *
   * See go/jspb-api-gotchas#toJsonValue for more information.
   *
   * This value is NOT the go/jsonpb format. For that, see go/jspb-json-interop.
   *
   * Generally, `serialize()` should be called instead, but this may be useful
   * when a JSON stringifiable value is required for compatibility with other
   * APIs.
   *
   * Note that this function performs a deep clone and converts internal
   * Uint8Array objects to base64 strings, and therefore the function is fairly
   * expensive, though not quite as expensive as serializing then deserializing.
   *
   * @param {!PivotSelector=} pivotSelector to use for selecting a pivot.
   * @return {!Array<?>} The proto represented as an array.
   * @override
   */
  toJsonValue(pivotSelector) {
    return toJsonValue(this, pivotSelector);
  }

  /**
   * Returns this JSPB as a JSON.stringify-compatible array.
   *
   * Generally, `serialize()` should be called instead, but this may be useful
   * when a JSON stringifiable value is required for compatibility with other
   * APIs.
   *
   * @return {!Array<?>} The proto represented as an array.
   * @override
   * @private
   */
  toJSON() {
    // TODO(b/385213186): delete this method. The JSPB runtime no longer relies
    // on it. Add an assert fail, then delete.
    return toJsonValue(this);
  }

  /**
   * Serializes a message to the go/jspb-wireformat for use in server requests.
   *
   * @override
   * @this {!Message}
   * @param {!PivotSelector=} pivotSelector to use for selecting a pivot.
   * @return {string} The serialized proto.
   */
  serialize(pivotSelector) {
    return JSON.stringify(toJsonValue(this, pivotSelector));
  }

  /**
   * Deserialize a JsPb string.
   * @param {function(new:JSPB, ?Array=)} ctor The constructor of the
   *     message type.
   * @param {string} data Our serialized data.
   * @return {JSPB} The new message with the serialized data populating
   *     its fields.
   * @template JSPB
   */
  static deserializeWithCtor(ctor, data) {
    // use asserts on parameters as a defense in depth for our type signatures
    // use actual errors for issues related to data.
    asserts.assertFunction(ctor);
    // Treat null/undefined/'' as an empty message. This is heavily depended
    // upon by tests and production applications.
    //
    // TODO(b/219382249): null/undefined is somewhat defensible but '' less so,
    // try to eliminate that case.
    if (data == null || data == '') {
      return asserts.assertInstanceof(new ctor(), Message);
    }

    asserts.assertString(data);
    const array = JSON.parse(data);
    if (!Array.isArray(array)) {
      throw new Error(
          goog.DEBUG ? ('Expected to deserialize an Array but got ' +
                        goog.typeOf(array) + ': ' + array) :
                       'dnarr');
    }

    return new ctor(markMutableReferencesAreOwned(array));
  }

  /**
   * Gets the value of the extension field from the extended object.
   *
   * This may actually return `null|undefined` (b/26920357) but is incorrectly
   * typed: prefer using `getExtensionOrUndefined` which is more explicit. See
   * go/jspb-api-gotchas#nullability
   *
   * @override
   * @param {!ExtensionFieldInfo<M, I, EXTENDEE, IE>} fieldInfo Specifies the
   *     field to get.
   * @return {M} The value of the field.
   * @template M, I, IE
   * @template THIS
   * Use TTL to force agreement between the extendee and this, otherwise the
   * jscompiler may resolve mismatches with a union which may cause errors to go
   * unnoticed or create odd error messages.
   * @template EXTENDEE := THIS =:
   * @this {THIS}
   * @suppress {visibility} ExtensionFieldInfo internals.
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
   * ): THIS extends
   *     import('google3/javascript/apps/jspb/immutable_message').ImmutableMessage
   *   ? IValue
   *   : MValue
   */
  getExtension(fieldInfo) {
    asserts.assertInstanceof(this, fieldInfo.extendeeCtor);
    const self = /** @type {!MutableMessage<I>} */ (
        asserts.assertInstanceof(this, Message));
    recordUnknownFieldAccess(self, fieldInfo.fieldIndex);
    maybeReviveUnknownField(self, fieldInfo.fieldIndex, fieldInfo.lazyParse);
    const freezeOptOut = undefined;
    const value = fieldInfo.ctor ?
        (fieldInfo.isRepeated ? fieldInfo.getExtensionFn(
                                    self, fieldInfo.ctor, fieldInfo.fieldIndex,
                                    getRepeatedFieldReturnType(freezeOptOut),
                                    fieldInfo.hasMessageId) :
                                fieldInfo.getExtensionFn(
                                    self, fieldInfo.ctor, fieldInfo.fieldIndex,
                                    fieldInfo.hasMessageId)) :
        (fieldInfo.isRepeated ?
             fieldInfo.getExtensionFn(
                 self, fieldInfo.fieldIndex,
                 getRepeatedFieldReturnType(freezeOptOut),
                 fieldInfo.hasMessageId) :
             fieldInfo.getExtensionFn(
                 self, fieldInfo.fieldIndex, fieldInfo.defaultValue,
                 fieldInfo.hasMessageId));

    // Otherwise, return.
    return value;
  }

  /**
   * Gets the value of the message-valued extension field from the extended
   * object. This can be singular or repeated, if singular and not present, this
   * accessor returns a default instance.
   *
   * This cannot be used with ImmutableJS extensions.
   *
   * @override
   * @param {!ExtensionFieldInfo<M, I, EXTENDEE>} fieldInfo Specifies the field
   *     to get.
   * @return {READONLY_RESULT_WITHOUT_UNKNOWNS} The value of the field.
   * @template M, I
   * @template THIS
   * Use TTL to force agreement between the extendee and this, otherwise the
   * jscompiler may resolve mismatches with a union which may cause errors to go
   * unnoticed or create odd error messages.
   * @template EXTENDEE := THIS =:
   * @template READONLY_RESULT :=
   *   mapunion(union(M, I), (X) =>
   *     cond(
   *       sub(
   *         cond(isTemplatized(X) && (
   *           eq(rawTypeOf(X), 'Array') || eq(rawTypeOf(X), 'ReadonlyArray')),
   *           templateTypeOf(X, 0),
   *           X),
   *         union(
   *           'jspb.mutable_message.MutableMessage',
   *           'jspb.immutable_message.ImmutableMessage')),
   *       X,
   *       none()))
   * =:
   * @template READONLY_RESULT_WITHOUT_UNKNOWNS :=
   *   cond(isUnknown(READONLY_RESULT), 'undefined', READONLY_RESULT)
   * =:
   * @this {THIS}
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
   *   ? IValue
   *   : MValue | IValue
   */
  getReadonlyExtension(fieldInfo) {
    asserts.assert(fieldInfo.ctor);
    asserts.assertInstanceof(this, fieldInfo.extendeeCtor);
    const self = /** @type {!Message} */ (this);
    // TODO: b/397982381 - this is buggy with unknown fields, we only report
    // for now to preserve existing behavior.
    recordUnknownFieldAccess(self, fieldInfo.fieldIndex);
    maybeReviveUnknownField(self, fieldInfo.fieldIndex, fieldInfo.lazyParse);
    return fieldInfo.isRepeated ?
        getReadonlyRepeatedWrapperField(
            self, fieldInfo.ctor, fieldInfo.fieldIndex,
            fieldInfo.hasMessageId) :
        getReadonlyWrapperField(
            self, fieldInfo.ctor, fieldInfo.fieldIndex, fieldInfo.hasMessageId);
  }

  /**
   * Gets the value of the message-valued extension field from the extended
   * object as a mutable message. The field must be singular, since getExtension
   * will already return only truthy mutable values for repeated fields.
   *
   * This cannot be used with ImmutableJS extensions.
   *
   * @protected exposed on mutable messages
   * @param {!ExtensionFieldInfo<M, I, EXTENDEE>} fieldInfo Specifies the field
   *     to get.
   * @return {MUTABLE_RESULT_WITHOUT_UNKNOWNS} The value of the field.
   * @template M, I
   * @template THIS
   * Use TTL to force agreement between the extendee and this, otherwise the
   * jscompiler may resolve mismatches with a union which may cause errors to go
   * unnoticed or create odd error messages.
   * @template EXTENDEE := THIS =:
   * @template MUTABLE_RESULT :=
   *   mapunion(union(M, I), (X) =>
   *     cond(sub(X, 'jspb.mutable_message.MutableMessage'), X, none()))
   * =:
   * @template MUTABLE_RESULT_WITHOUT_UNKNOWNS :=
   *   cond(isUnknown(MUTABLE_RESULT), 'undefined', MUTABLE_RESULT)
   * =:
   * @this {THIS}
   * @tsType <
   *   THIS,
   *   MValue extends
   *     import('google3/javascript/apps/jspb/mutable_message').MutableMessage,
   *   IValue extends
   *     import('google3/javascript/apps/jspb/immutable_message').ImmutableMessage,
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
    asserts.assert(fieldInfo.ctor);
    asserts.assertInstanceof(this, fieldInfo.extendeeCtor);
    asserts.assert(!fieldInfo.isRepeated);
    const self = /** @type {!Message} */ (this);
    // TODO: b/397982381 - this is buggy with unknown fields, we only report
    // for now to preserve existing behavior.
    recordUnknownFieldAccess(self, fieldInfo.fieldIndex);
    maybeReviveUnknownField(self, fieldInfo.fieldIndex, fieldInfo.lazyParse);
    return getMutableWrapperField(
        self, fieldInfo.ctor, fieldInfo.fieldIndex,
        /* legacyOrUndefined= */ undefined, fieldInfo.hasMessageId);
  }

  /**
   * Gets the value of the singular extension field from the extended object,
   * returning `undefined` if it is not present.
   *
   * @param {!ExtensionFieldInfo<M, I, EXTENDEE, IE>} fieldInfo Specifies the
   *     field to get.
   * @return {MESSAGE_TYPE_NOT_ARRAY|undefined} The value of the field.
   * @template M, I, IE
   * @template THIS
   * @this {THIS}
   * Use TTL to force agreement between the extendee and this, otherwise the
   * jscompiler may resolve mismatches with a union which may cause errors to go
   * unnoticed or create odd error messages.
   * @template EXTENDEE := THIS =:
   * @template MESSAGE_TYPE_NOT_ARRAY :=
   *     cond(isUnknown(M), unknown(),
   *       mapunion(M, (X) =>
   *         cond(eq(X, 'undefined'), none(),
   *           cond(sub(X, 'ReadonlyArray'), none(),
   *             X))))
   * =:
   * @suppress {visibility} ExtensionFieldInfo internals.
   * @tsType <
   *   THIS extends
   *     import('google3/javascript/apps/jspb/mutable_message').MutableMessage,
   *   MValue,
   *   IValue,
   *   MExtendee extends THIS,
   *   IExtendee extends
   *     import('google3/javascript/apps/jspb/immutable_message').ImmutableMessage<THIS>
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
   * @tsType <
   *   THIS extends
   *     import('google3/javascript/apps/jspb/immutable_message').ImmutableMessage,
   *   MValue,
   *   IValue,
   *   MExtendee extends
   *     import('google3/javascript/apps/jspb/mutable_message').MutableMessage<THIS>,
   *   IExtendee extends THIS
   * >(
   *   this: THIS,
   *   fieldInfo: import('google3/javascript/apps/jspb/extension_field_info')
   *       .ExtensionFieldInfo<
   *     Exclude<MValue, readonly unknown[]>,
   *     Exclude<IValue, readonly unknown[]>,
   *     MExtendee,
   *     IExtendee
   *   >
   * ): IValue | undefined
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
   * ): MValue | IValue | undefined
   */
  getExtensionOrUndefined(fieldInfo) {
    asserts.assert(
        !fieldInfo.isRepeated,
        'repeated extensions don\'t support getExtensionOrUndefined');
    asserts.assertInstanceof(this, fieldInfo.extendeeCtor);
    const self = /** @type {!MutableMessage<I>} */ (
        asserts.assertInstanceof(this, Message));
    // TODO: b/397982381 - this is buggy with unknown fields, we only report
    // for now to preserve existing behavior.
    recordUnknownFieldAccess(self, fieldInfo.fieldIndex);
    maybeReviveUnknownField(self, fieldInfo.fieldIndex, fieldInfo.lazyParse);
    const result = fieldInfo.ctor ?
        fieldInfo.getExtensionFn(
            self, fieldInfo.ctor, fieldInfo.fieldIndex,
            fieldInfo.hasMessageId) :
        // Deliberately use null as the defaultValue to identify absence
        fieldInfo.getExtensionFn(
            self, fieldInfo.fieldIndex, /* defaultValue= */ null,
            fieldInfo.hasMessageId);
    return result === null ? undefined : result;
  }

  /**
   * Returns whether the given singular extension is present.
   *
   * @override
   * @param {!ExtensionFieldInfo<T, I, EXTENDEE, IE>} fieldInfo Specifies the
   *     field to get.
   * @return {boolean} Whether the extension is present.
   * @template T, I, IE
   * @template THIS
   * @this {THIS}
   * Use TTL to force agreement between the extendee and this, otherwise the
   * jscompiler may resolve mismatches with a union which may cause errors to go
   * unnoticed or create odd error messages.
   * @template EXTENDEE := THIS =:
   * @suppress {visibility} ExtensionFieldInfo internals.
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
   *     IValue,
   *     MExtendee,
   *     IExtendee
   *   >
   * ): boolean
   */
  hasExtension(fieldInfo) {
    asserts.assert(
        !fieldInfo.isRepeated,
        'repeated extensions don\'t support hasExtension');
    const self = /** @type{!MutableMessage<I>} */ (
        asserts.assertInstanceof(this, Message));
    // TODO: b/397982381 - this is buggy with unknown fields, we only report
    // for now to preserve existing behavior.
    recordUnknownFieldAccess(self, fieldInfo.fieldIndex);
    maybeReviveUnknownField(self, fieldInfo.fieldIndex, fieldInfo.lazyParse);
    return fieldInfo.ctor ?
        hasWrapperField(
            self, fieldInfo.ctor, fieldInfo.fieldIndex,
            fieldInfo.hasMessageId) :
        (self.getExtensionOrUndefined(fieldInfo) !== undefined);
  }

  /**
   * Gets a value in a repeated extension field.
   *
   * @override
   * @param {!ExtensionFieldInfo<!ReadonlyArray<M>, !ReadonlyArray<I>,
   *     EXTENDEE>} fieldInfo Specifies the field to get.
   * @param {number} idx The index to read from this field.
   * @return {M|I} The value of the field.
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
   *   idx: number
   * ): MValue[number] | IValue[number]
   */
  getExtensionAtIndex(fieldInfo, idx) {
    const self = asserts.assertInstanceof(this, Message);
    asserts.assertInstanceof(self, fieldInfo.extendeeCtor);
    asserts.assert(fieldInfo.isRepeated);
    // TODO: b/397982381 - this is buggy with unknown fields, we only report
    // for now to preserve existing behavior.
    recordUnknownFieldAccess(self, fieldInfo.fieldIndex);
    maybeReviveUnknownField(self, fieldInfo.fieldIndex, fieldInfo.lazyParse);
    return fieldInfo.ctor ?
        fieldInfo.getExtensionAtIndexFn(
            self, fieldInfo.fieldIndex, fieldInfo.ctor, idx,
            fieldInfo.hasMessageId) :
        fieldInfo.getExtensionAtIndexFn(
            self, fieldInfo.fieldIndex, idx, fieldInfo.hasMessageId);
  }

  /**
   * Gets the length of a repeated extension field.
   *
   * @override
   * @param {!ExtensionFieldInfo<!ReadonlyArray<M>, !ReadonlyArray<I>,
   *     EXTENDEE>} fieldInfo Specifies the field to get.
   * @return {number} The number of values in this field.
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
   *   MValue extends ReadonlyArray<any>,
   *   IValue extends ReadonlyArray<any>,
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
   * ): number
   */
  getExtensionCount(fieldInfo) {
    const self = /** @type {!Message} */ (this);
    asserts.assertInstanceof(self, fieldInfo.extendeeCtor);
    asserts.assertInstanceof(self, Message);
    asserts.assert(fieldInfo.isRepeated);
    // TODO: b/397982381 - this is buggy with unknown fields, we only report
    // for now to preserve existing behavior.
    recordUnknownFieldAccess(self, fieldInfo.fieldIndex);
    maybeReviveUnknownField(self, fieldInfo.fieldIndex, fieldInfo.lazyParse);
    return fieldInfo.ctor ?
        fieldInfo.getExtensionCountFn(
            self, fieldInfo.ctor, fieldInfo.fieldIndex,
            fieldInfo.hasMessageId) :
        fieldInfo.getExtensionCountFn(
            self, fieldInfo.fieldIndex, fieldInfo.hasMessageId);
  }

  /**
   * Creates a difference object between two messages.
   *
   * The result will contain the top-level fields of m2 that differ from those
   * of m1 at any level of nesting.
   *
   * @param {MESSAGE_TYPE} m1 The first message object.
   * @param {MESSAGE_TYPE} m2 The second message object.
   * @return {MESSAGE_TYPE_NOT_UNDEFINED} The difference returned as a proto
   *     message. Note that the returned message may be missing required fields.
   *     This is currently tolerated in JS, but would cause an error if you
   *     tried to send such a proto to the server.
   * @throws {!Error} If the messages are responses with different types.
   *
   * Use go/closure-ttl to declare a non-undefined version of T_CHILD. Replace
   * the undefined in blah|undefined with none. This is necessary because the
   * compiler will infer MESSAGE_TYPE to be |undefined.
   * @template MESSAGE_TYPE
   * @template MESSAGE_TYPE_NOT_UNDEFINED :=
   *     cond(isUnknown(MESSAGE_TYPE), unknown(),
   *       mapunion(MESSAGE_TYPE, (X) =>
   *         cond(eq(X, 'undefined'), none(), X)))
   * =:
   * @tsType <T extends
   * import('google3/javascript/apps/jspb/message').Message>(m1: T, m2: T): T
   * @deprecated Avoid using this method, consider tracking differences manually
   *     or using APIs like `jspb.debug.messageEquals` to compare protos. See
   *     go/jspb-api-gotchas#difference for more information.
   */
  static difference(m1, m2) {
    if (!(m1 instanceof Message)) {
      throw new Error('Message.difference called on non-Message.');
    }
    if (m1.constructor !== m2.constructor) {
      throw new Error('Messages have different types.');
    }
    const isImmutable = isImmutableMessage(m1);
    if (isImmutable !== isImmutableMessage(m2)) {
      throw new Error('Messages must both be immutable or both be mutable.');
    }
    const arr1 = getInternalArray(m1);
    // Convert to immutable to make field values safe to share.
    const arr2 = getInternalArray(messageToImmutable(m2));
    const res = logNewArray([]);
    let firstFieldIndex = 0;
    const length = Math.max(arr1.length, arr2.length);
    const messageId = m1.getJsPbMessageId();
    if (messageId) {
      res[0] = messageId;
      firstFieldIndex = 1;
    }
    for (let i = firstFieldIndex; i < length; i++) {
      const v1 = arr1[i];
      const v2 = arr2[i];
      if (i === arr2.length - 1 && isSparseObject(v2)) {
        // According to the implementation of compareFields, if one is a
        // sparse object, they should both be.
        const resObj = (res[i] = {});
        const fromObj = isSparseObject(v1) ? v1 : {};
        const toObj = arr2[i];
        for (const key in toObj) {
          if (!compareFields(fromObj[key], toObj[key])) {
            resObj[key] = toObj[key];
          }
        }
      } else if (!compareFields(v1, v2)) {
        res[i] = v2;
      }
    }
    if (isImmutable) {
      markArrayImmutable(res);
    }
    return new m1.constructor(markMutableReferencesAreOwned(res));
  }


  /**
   * Tests whether two messages are equal.
   *
   * See go/jspb-api-gotchas#equals for more information.
   *
   * @param {?Message|undefined} m1 The first message object.
   * @param {?Message|undefined} m2 The second message object.
   * @return {boolean} true if both messages are null/undefined, or if both are
   *     of the same type and have the same field values.
   */
  static equals(m1, m2) {
    const result = m1 === m2 || (m1 == null && m2 == null) ||
        (!!(m1 && m2) && (m1 instanceof m2.constructor) &&
         compareMessages(m1, m2));

    // If the result of this comparison would've changed from type information
    // being present, instruct the user to add a call to
    // makeCrossSerializerComparisonsCompatible.
    if (getCheckEqualsDoesNotChangeWithTypeInformation() && goog.DEBUG && m1 &&
        m2 && (m1.constructor === m2.constructor) && !result) {
      const ctor = m1.constructor;
      const makeCrossSerializerComparisonsCompatible =
          ctor['makeCrossSerializerComparisonsCompatible'];
      if (makeCrossSerializerComparisonsCompatible) {
        withoutLogging(() => {
          const m1WithTypeInfo = new ctor(m1.toJsonValue());
          makeCrossSerializerComparisonsCompatible(m1WithTypeInfo);
          const resultWithLeftTypeInfo =
              compareMessages(m1WithTypeInfo, asserts.assert(m2));
          if (resultWithLeftTypeInfo) {
            throw new Error(
                'Comparison between protos had a false negative and would ' +
                'have changed from false to true with type information. ' +
                `Please add a call to ${
                    ctor.displayName}.makeCrossSerializerComparisonsCompatible ` +
                'to one or both sides of the comparison to ensure it is ' +
                'reliable.\n\nCompared protos were:\n' +
                `${m1.serialize()} and ${m2.serialize()}\n`);
          }
        });
      }
    }

    // Test validity of our hash function when possible.
    if (getCheckEqualsConsistentWithHashCode() && goog.DEBUG && m1 && result) {
      const h1 = hashCode(m1);
      const h2 = hashCode(m2);
      if (h1 !== h2) {
        asserts.fail(
            'expect messages %s and %s to have the same hashCode, got %s and %s',
            m1.serialize(), m2.serialize(), h1, h2);
      }
    }
    return result;
  }

  /**
   * Makes a mutable copy of this message. This copies any mutable state.
   *
   * Named `clone` for compatibility with `goog.object.unsafeClone`
   *
   * @override
   * @return {!MutableMessage}
   * @tsType ():
   * import('google3/javascript/apps/jspb/mutable_message').MutableMessage
   */
  clone() {
    const self = asserts.assertInstanceof(this, Message);
    return /** @type {!MutableMessage} */ (
        copyMutableWithImmutableFields(self));
  }

  /**
   * Returns whether this message is mutable.
   *
   * @return {boolean}
   * @tsType <T>(
   *   this: T
   * ): this is T extends import('google3/javascript/apps/jspb/mutable_message')
   *     .MutableMessage<any>
   *   ? T
   *   :
   * import('google3/javascript/apps/jspb/mutable_message').MutableMessage<unknown>
   */
  isMutable() {
    return !isImmutableMessage(/** @type {!Message} */ (this));
  }

  /**
   * Returns whether this message is immutable.
   *
   * @return {boolean}
   * @override
   * @tsType <T>(
   *   this: T
   * ): this is T extends
   * import('google3/javascript/apps/jspb/immutable_message')
   *     .ImmutableMessage<any>
   *   ? T
   *   : import('google3/javascript/apps/jspb/immutable_message')
   *         .ImmutableMessage<unknown>
   */
  isImmutable() {
    return isImmutableMessage(/** @type {!Message} */ (this));
  }

  /**
   * Coerces this message to a mutable message. Performs no copy if it is
   * already mutable.
   *
   * @override
   * @return {!MutableMessage<?>}
   * @protected this is made public by subclasses with better types.
   */
  toMutable() {
    return /** @type {!MutableMessage<?>} */ (messageToMutable(this));
  }

  /**
   * Coerces this message to an immutable message. Performs no copy if it is
   * already immutable.
   *
   * @override
   * @return {!ImmutableMessage<?>}
   */
  toImmutable() {
    return /** @type {!ImmutableMessage<?>} */ (messageToImmutable(this));
  }

  /**
   * Sets the value of the extension field in the extended object.
   *
   * If you pass `undefined` to this method, it unsets the extension.
   *
   * @override
   * @package will be presented only on MutableMessage or via J2CL
   * @param {!ExtensionFieldInfo<EM, EI, EXTENDEE>} fieldInfo Specifies the
   *     field to set.
   * @param {M_OR_I_OR_NULL_OR_UNDEFINED} value The value to set.
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
   *   >,
   *   value: MValue | IValue | null | undefined
   * ): this
   */
  setExtension(fieldInfo, value) {
    const self = /** @type {!MutableMessage<?>} */ (this);
    asserts.assertInstanceof(self, fieldInfo.extendeeCtor);
    clearUnknownField(self, fieldInfo.fieldIndex);
    return fieldInfo.ctor ?
        fieldInfo.setExtensionFn(
            self, fieldInfo.ctor, fieldInfo.fieldIndex, value,
            fieldInfo.hasMessageId) :
        fieldInfo.setExtensionFn(
            self, fieldInfo.fieldIndex, value, fieldInfo.hasMessageId);
  }

  /**
   * Clears the value of an extension field in the extended object.
   *
   * If you pass `undefined` to this method, it unsets the extension.
   *
   * @override
   * @package will be presented only on MutableMessage or via J2CL
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
    const self = /** @type {!MutableMessage<?>} */ (this);
    asserts.assertInstanceof(self, fieldInfo.extendeeCtor);
    clearUnknownField(self, fieldInfo.fieldIndex);
    return clearField(self, fieldInfo.fieldIndex, fieldInfo.hasMessageId);
  }

  /**
   * Sets the value of the extension field in the extended object.
   *
   * If you pass `undefined` to this method, it unsets the extension.
   *
   * @override
   * @package will be presented only on MutableMessage or via J2CL
   * @param {!ExtensionFieldInfo<!ReadonlyArray<M>, !ReadonlyArray<I>,
   *     EXTENDEE>} fieldInfo Specifies the field to get.
   * @param {number} index The index of the value to set.
   * @param {M_OR_I} value The value to set.
   * @return {THIS} For chaining
   * @template THIS, M, I
   * Use TTL to force agreement between the extendee and this, otherwise the
   * jscompiler may resolve mismatches with a union which may cause errors to go
   * unnoticed or create odd error messages.
   * @template EXTENDEE := THIS =:
   * Use TTL to prevent type inference on value
   * @template M_OR_I := union(M, I) =:
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
    const self = /** @type {!MutableMessage<?>} */ (this);
    // TODO: b/397982381 - this is buggy with unknown fields, we only report
    // for now to preserve existing behavior.
    recordUnknownFieldAccess(self, fieldInfo.fieldIndex);
    maybeReviveUnknownField(
        self, fieldInfo.fieldIndex, fieldInfo.lazyParse, /* orClear= */ true);
    asserts.assertInstanceof(self, fieldInfo.extendeeCtor);
    asserts.assert(fieldInfo.isRepeated);
    if (fieldInfo.ctor) {
      fieldInfo.setExtensionAtIndexFn(
          self, fieldInfo.fieldIndex, fieldInfo.ctor, index, value,
          fieldInfo.hasMessageId);
    } else {
      fieldInfo.setExtensionAtIndexFn(
          self, fieldInfo.fieldIndex, index, value, fieldInfo.hasMessageId);
    }
    return self;
  }

  /**
   * Gets a value in a repeated extension field.
   *
   * @package will be presented only on MutableMessage
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
    const self = asserts.assertInstanceof(this, Message);
    asserts.assert(fieldInfo.ctor);
    asserts.assertInstanceof(self, fieldInfo.extendeeCtor);
    asserts.assert(fieldInfo.isRepeated);
    // TODO: b/397982381 - this is buggy with unknown fields, we only report
    // for now to preserve existing behavior.
    recordUnknownFieldAccess(self, fieldInfo.fieldIndex);
    maybeReviveUnknownField(self, fieldInfo.fieldIndex, fieldInfo.lazyParse);
    return getRepeatedIndexedMutableWrapper(
        self, fieldInfo.fieldIndex, fieldInfo.ctor, idx,
        fieldInfo.hasMessageId);
  }

  /**
   * Sets the value of the extension field in the extended object.
   *
   * If you pass `undefined` to this method, it unsets the extension.
   *
   * @override
   * @package will be presented only on MutableMessage or via J2CL
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
    const self = /** @type {!MutableMessage<?>} */ (this);
    // TODO: b/397982381 - this is buggy with unknown fields, we only report
    // for now to preserve existing behavior.
    recordUnknownFieldAccess(self, fieldInfo.fieldIndex);
    maybeReviveUnknownField(
        self, fieldInfo.fieldIndex, fieldInfo.lazyParse, /* orClear= */ true);
    asserts.assertInstanceof(self, fieldInfo.extendeeCtor);
    asserts.assert(fieldInfo.isRepeated);
    if (fieldInfo.ctor) {
      fieldInfo.addExtensionFn(
          self, fieldInfo.fieldIndex, fieldInfo.ctor, value,
          fieldInfo.hasMessageId);
    } else {
      fieldInfo.addExtensionFn(
          self, fieldInfo.fieldIndex, value, fieldInfo.hasMessageId);
    }
    return self;
  }

  /**
   * Returns a function which deserializes the type of this message.
   *
   * Always deserializes values as immutable.
   *
   * @override
   * @this {THIS}
   * @template THIS
   * @return {function(string): THIS}
   * @tsType (): ((serialized: string) => this)
   */
  getParserForType() {
    const self = /** @type {!Message} */ (this);
    if (!self.isImmutable()) {
      if (goog.DEBUG) {
        throw new Error(
            'getParserForType can only be called on immutable messages');
      } else {
        throw new Error('gpft');
      }
    }

    const ctor = self.constructor;
    const withCachedLambda =
        /**
           @type {{internalJspbCachedParserFn_: ((function(string):
               THIS)|undefined)}}
         */
        (ctor);
    if (withCachedLambda.internalJspbCachedParserFn_) {
      return withCachedLambda.internalJspbCachedParserFn_;
    }

    return (
        withCachedLambda.internalJspbCachedParserFn_ = (serialized) =>
            deserializeAsImmutable(ctor, serialized));
  }

  /**
   * Returns an immutable default instance for the type of this message.
   *
   * @override
   * @protected exposed by subtypes
   * @return {!ImmutableMessage}
   */
  getDefaultInstanceForType() {
    const defaultInstance = getDefaultImmutableInstance(
        /** function(new:MutableMessage<I>, ?Array<?>=) */ (
            /** @type {!Message} */ (this).constructor));
    asserts.assertInstanceof(
        defaultInstance, Message,
        'value was not a mutable message constructor');
    return /** @type {!ImmutableMessage} */ (defaultInstance);
  }

  /**
   * Converts this message to a mutable one.
   *
   * @override
   * @private can only be called from poorly typed immutablejs code
   * @return {?}
   */
  toBuilder() {
    asserts.assert(this.isImmutable());
    return /** @type {!MutableMessage} */ (messageToMutable(this));
  }
}

// Inject our message constructor into internal.js so that we can ensure that
// the result of isMessage is always correct.
if (goog.DEBUG) {
  setMessageCtorInDebug(Message);
}

/**
 * Forward declaration of an `equals` function for J2CL.
 *
 * This satisfies the subtyping relation with (Readonly|Mutable)MessageInterface
 * for subtypes. The real implementation is provided by
 * j2cl_accessor_patches_message.js.
 *
 * @private will only be called via interface from j2cl
 * @override
 * @param {?} other
 * @return {boolean}
 */
Message.prototype.equals;

/**
 * Forward declaration of a `hashCode` function for J2CL.
 *
 * This satisfies the subtyping relation with MessageLike and BuilderLike for
 * subtypes. The real implementation is provided by
 * j2cl_accessor_patches_message.js.
 *
 * @override
 * @private will only be called via interface from j2cl
 * @return {number}
 */
Message.prototype.hashCode;

/**
 * Forward declaration of `build` for j2cl.
 *
 * @override
 * @private can only be called from poorly typed immutablejs code
 * @return {?}
 */
Message.prototype.build;

/**
 * Indicates to J2CL that equals and hashCode should be available.
 *
 * @private will only be accessed via interface from j2cl
 * @const {*}
 */
Message.prototype.equalsAndHashCodeShouldBeAvailable = 1;

Message.prototype[MESSAGE_PROTOTYPE_MARKER] = MESSAGE_PROTOTYPE_MARKER_VALUE;

/**
 * The xid of this proto type (The same for all instances of a proto). Provides
 * a way to identify a proto by stable obfuscated name.
 * @see {xid}.
 * Available if {@link jspb.generate_xid} is added as a Message option to
 * a protocol buffer.
 * @type {!xid.String|undefined} The xid or undefined if message is
 *     annotated to generate the xid.
 * See go/const-js-library-faq
 */
Message.prototype.messageXid;

if (GENERATE_TO_STRING) {
  /**
   * Creates a string representation of the internal data array of this proto.
   *
   * NOTE: This string is *not* suitable for use in server requests.
   *
   * @this {Message}
   * @return {string} A string representation of this proto.
   * @override
   * @deprecated please use .serialize() instead.
   */
  Message.prototype.toString = function() {
    // TODO(b/385213186): delete this method. The JSPB runtime does not rely on
    // this method, it has undefined behavior and cannot be dead code eliminated
    return getInternalArray(this).toString();
  };
}

if (goog.DEBUG && !COMPILED) {
  /**
   * @protected
   * @return {*}
   * @tsType (): {}
   */
  Message.prototype.internalDoNotUse_annotations;
}

/**
 * Clear all fields of the message and set them to their default values.
 *
 * After this operation the message will be equivalent to a newly constructed
 * instance.
 *
 * You probably don't need this and are better off just constructing a new
 * message.
 *
 * @param {T} msg
 * @template T
 * @return {T}
 * @tsType <T extends
 * import('google3/javascript/apps/jspb/message').Message>(msg: T): T
 */
function clearMessage(msg) {
  asserts.assertInstanceof(msg, Message);
  checkMutableMessage(msg);
  let array = getInternalArray(msg);
  const arrayState = getMessageArrayState(array);
  if (getHasMessageId(arrayState)) {
    array = [array[0]];
  } else {
    array = [];
  }
  setArrayState(array, copyArrayBitsClone(arrayState));
  setInternalArray(msg, array);
  return msg;
}

/**
 * Copies the content of the second argument into the first.
 *
 * This method takes two messages of the same type and copies the contents of
 * fromMessage into toMessage. After this call, both arguments will be
 * `Message.equals`, but will share no mutable state. All data in the
 * destination message will be overwritten.
 *
 * This function has equivalent functionality to `CopyFrom` found in other
 * proto implementations (C++, Python), and the signature is meant to match that
 * of core web methods like `Object.assign`.
 *
 * You probably don't need this and are better off just cloning and
 * constructing a new message.
 *
 * @param {MESSAGE} toMessage Message which will receive a copy of fromMessage
 * @param {MESSAGE} fromMessage Message that will be copied into toMessage.
 *     as its contents.
 * @template MESSAGE
 * @return {MESSAGE} toMessage
 * @tsType <
 *   M extends
 * import('google3/javascript/apps/jspb/mutable_message').MutableMessage
 * >(
 *   to: M,
 *   from:
 *     | M
 *     |
 * import('google3/javascript/apps/jspb/immutable_message').ImmutableMessage<M>
 * ): M
 */
function copyMessage(toMessage, fromMessage) {
  return copyMutableIntoMessage(toMessage, fromMessage);
}

/**
 * Copies the content of the second argument into the first.
 *
 * This method takes two messages of the same type and copies the contents of
 * fromMessage into toMessage. After this call, both arguments will be
 * `Message.equals`, but will share no mutable state. All data in the
 * destination message will be overwritten.
 *
 * When `fromMessage` is `null` or `undefined`, clears all fields of the message
 * and sets them to their default values. After this operation the message will
 * be equivalent to a newly constructed instance.
 *
 * This function has equivalent functionality to `CopyFrom` found in other
 * proto implementations (C++, Python), and the signature is meant to match that
 * of core web methods like `Object.assign`.
 *
 * @param {MESSAGE} toMessage Message which will receive a copy of fromMessage
 * @param {?MESSAGE|undefined} fromMessage Message that will be copied into
 *     toMessage. as its contents.
 * @template MESSAGE
 * @return {MESSAGE} toMessage
 * @tsType <
 *   M extends
 * import('google3/javascript/apps/jspb/mutable_message').MutableMessage
 * >(
 *   to: M,
 *   from:
 *     | M
 *     |
 * import('google3/javascript/apps/jspb/immutable_message').ImmutableMessage<M>
 *     | null
 *     | undefined
 * ): M
 */
function copyMessageOrClear(toMessage, fromMessage) {
  if (fromMessage != null) {
    return copyMessage(toMessage, fromMessage);
  }
  return clearMessage(toMessage);
}

/** @type {number} */
let messageCounter = 0;

/**
 * Adds a unique property to the message that will ensure that instances don't
 * compare structurally in tests.
 */
function makeMessageUnpredicable(/** ? */ m) {
  if (goog.DEBUG && !COMPILED) {
    m['See go/jspb-testing for how to use protos in tests'] = messageCounter++;
  }
}

/**
 * Constructs a mutable JSPB message from an array.
 *
 * The JSPB runtime takes ownership of the passed array, callers should not use
 * the array after passing it to this method.  Generally, messages should be
 * parsed with the `deserialize` or `deserializeBinary` functions, or
 * constructed from scratch using `new Foo()`.Consider using `cloneJspbArray` to
 * make a copy if you need the original array to be reused after calling this
 * method.
 *
 * @param {function(new:T, ?Array=)} ctor The constructor of the
 *     message type.
 * @param {!Array<?>|!OpaqueJspbArray|null|undefined} array Our serialized data.
 * @return {T} The new message with the serialized data populating
 *     its fields.
 * @template T
 * @noinline because these methods break coverage when inlined.
 * @tsType <
 *   T extends
 * import('google3/javascript/apps/jspb/mutable_message').MutableMessage
 * >(
 *   ctor: new (data?: unknown[] | null) => T,
 *   array:
 *     | unknown[]
 *     | import('google3/javascript/apps/jspb/message').OpaqueJspbArray
 *     | null
 *     | undefined
 * ): T
 */
// TODO(b/271560370): remove the @noinline on this method
function newMutableMessageFromTransferredArray(ctor, array) {
  if (array == null) {
    return new ctor();
  }
  array = transferArray(/** @type{!Array<?>} */ (array), /* mutable= */ true);
  const newMessage = new ctor(markMutableReferencesAreOwned(array));
  asserts.assertInstanceof(newMessage, Message);
  return newMessage;
}

/**
 * Constructs an immutable JSPB message from an array.
 *
 * The JSPB runtime takes ownership of the passed array, callers should not use
 * the array after passing it to this method.  Generally, messages should be
 * parsed with the `deserialize` or `deserializeBinary` functions, or
 * constructed from scratch using `new Foo()`.Consider using `cloneJspbArray` to
 * make a copy if you need the original array to be reused after calling this
 * method.
 *
 * @param {T} defaultInstance The `defaultInstance` of the immutable message
 *     type.
 * @param {!Array<?>|!OpaqueJspbArray|null|undefined} array Our serialized data.
 * @return {T} The new message with the serialized data populating
 *     its fields.
 * @template T
 * @noinline because these methods break coverage when inlined.
 * @tsType <
 *   T extends
 * import('google3/javascript/apps/jspb/immutable_message').ImmutableMessage
 * >(
 *   defaultInstance: T,
 *   array:
 *     | unknown[]
 *     | import('google3/javascript/apps/jspb/message').OpaqueJspbArray
 *     | null
 *     | undefined
 * ): T
 */
// TODO(b/271560370): remove the @noinline on this method
function newImmutableMessageFromTransferredArray(defaultInstance, array) {
  asserts.assertInstanceof(defaultInstance, Message);
  asserts.assert(defaultInstance.isImmutable());
  const newMessage = /** @type {!Message} */ (
      (array == null) ?
          getDefaultImmutableInstance(defaultInstance.constructor) :
          new defaultInstance.constructor(
              markArrayImmutable(transferArray(/** @type{!Array<?>} */ (
                                                   /** @type{?} */ (array)),
                                               /* mutable= */ false))));
  asserts.assertInstanceof(newMessage, Message);
  return /** @type {!T} */ (newMessage);
}

// Do not export. Do not mark @private
// The intent is just to be a type that is not externally instantiable and has
// no useful properties/behaviors.
class InternalOpaqueJspbArray {}

/**
 * An opaque type representing a jspb array.
 *
 * Should only be used as a marker for eventually passing to
 * `newImmutableMessageFromTransferredArray` and
 * `newMutableMessageFromTransferredArray`
 *
 * @typedef {typeof InternalOpaqueJspbArray}
 */
let OpaqueJspbArray;

/**
 * Makes a deep copy of a jspb array.
 *
 * This is useful for passing to `newImmutableMessageFromTransferredArray` and
 * `newMutableMessageFromTransferredArray`.
 *
 * @param {!Array<?>} array
 * @return {!OpaqueJspbArray}
 */
function cloneJspbArray(array) {
  return /** @type {!OpaqueJspbArray} */ (/** @type {?} */ (cloneRaw(array)));
}

if (goog.DEBUG) {
  // Constructs a debug-only representation. Do not call this in code.
  Object.defineProperties(Message.prototype, {
    urlToInspectInProtoshop: {
      get: /** @return {?} */ function() {
        const /** !Function|undefined */ inspect =
            globalThis?.['top']?.['protoshop']?.['inspect'];
        if (!inspect) {
          return 'You need http://go/protoshop-browser-extension';
        }

        return inspect(
            /** @type {?} */ (this),
            GENERATE_TYPE_NAME_PROPERTIES ?
                /**
                   @type {{internalDoNotUse_debugOnlyProtoTypeName:
                       (string|undefined)}}
                 */
                (
                    /** @type {?} */ (this).constructor)
                    .internalDoNotUse_debugOnlyProtoTypeName :
                undefined);
      },
      enumerable: false,
      configurable: false,
    },
    // DO NOT RENAME: this is used in
    // javascript/apps/jspb/testing/install_jspb_custom_formatter.js
    fieldsForDebugging: {
      get: /** @return {?} */ function() {
        return dumpInternal(/** @type {?} */ (this));
      },
      enumerable: false,
      configurable: false,
    }
  });
}

exports = {
  Message,
  OpaqueJspbArray,
  clearMessage,
  cloneJspbArray,
  copyMessage,
  copyMessageOrClear,
  newImmutableMessageFromTransferredArray,
  newMutableMessageFromTransferredArray,
};
