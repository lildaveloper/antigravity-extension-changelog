/**
 * @fileoverview Immutable message type variant.
 */

goog.module('jspb.immutable_message');

const {ExtensionFieldInfo} = goog.requireType('jspb.extension_field_info');
const {Message} = goog.require('jspb');
const {MutableMessage} = goog.requireType('jspb.mutable_message');
const {SUPPORTS_HAS_INSTANCE, invisiblePropValue} = goog.require('jspb.internal');
const {USE_DETAILED_MESSAGE_TYPE_HIERARCHY} = goog.require('jspb.internal_options');
const {assert} = goog.require('goog.asserts');
const {getDefaultImmutableInstance} = goog.require('jspb.internal_accessor_helpers');



/**
 * Virtual base class for all immutable jspb messages.
 *
 * This class does not exist at runtime in compiled code: do not reference it.
 *
 * @template M
 * @abstract
 * @constructor
 * @extends {Message}
 * @suppress {checkEs5InheritanceCorrectnessConditions} not instantiated.
 */
function ImmutableMessage() {
  throw new Error('ImmutableMessage is not instantiable');
}

/**
 * Returns an immutable default instance for the type of this message.
 *
 * @override
 * @public
 * @this {THIS}
 * @template THIS
 * @return {!THIS}
 * @tsType (): this
 */
ImmutableMessage.prototype.getDefaultInstanceForType = function() {};

/**
 * Makes a deep copy of this message returning it as a mutable class.
 *
 * @public
 * @return {!M}
 * @override
 * @abstract
 */
ImmutableMessage.prototype.clone = function() {};

/**
 * Returns this proto as a mutable instance.
 *
 * @public
 * @return {!M}
 * @abstract
 * @override
 * @tsType (): M
 * @suppress {visibility} to expand visibility from protected to public
 */
ImmutableMessage.prototype.toMutable = function() {};

/**
 * Coerces this message to an immutable message.
 *
 * @public so that this is accessible on readonly type variants.
 * @return {!THIS}
 * @this {THIS}
 * @template THIS
 * @abstract
 * @override
 */
ImmutableMessage.prototype.toImmutable = function() {};

/**
 * Gets the value of the extension field from the extended object.
 *
 * @param {!ExtensionFieldInfo<EM, EI, ME, EXTENDEE>} fieldInfo
 *     Specifies the field to get.
 * @return {!EI} The value of the field.
 * @template EM, EI, ME, THIS
 * @template EXTENDEE := THIS =:
 * @this {THIS}
 * @suppress {visibility} ExtensionFieldInfo internals.f
 * @override
 * @abstract
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
 *   : never
 */
ImmutableMessage.prototype.getExtension = function(fieldInfo) {};

/**
 * Gets the value of the singular extension field from the extended object,
 * returning `undefined` if it is not present.
 *
 * @param {!ExtensionFieldInfo<EM, EI, ME, EXTENDEE>} fieldInfo
 *     Specifies the field to get.
 * @return {!MESSAGE_TYPE_NOT_ARRAY|undefined} The value of the field.
 * @template EM, EI, ME, THIS
 * @template EXTENDEE := THIS =:
 * @this {THIS}
 * @template MESSAGE_TYPE_NOT_ARRAY :=
 *     cond(isUnknown(EI), unknown(),
 *       mapunion(EI, (X) =>
 *         cond(eq(X, 'undefined'), none(),
 *           cond(sub(X, 'ReadonlyArray'), none(),
 *             X))))
 * =:
 * @override
 * @abstract
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
 * ): IValue | undefined
 */
ImmutableMessage.prototype.getExtensionOrUndefined = function(fieldInfo) {};

/**
 * Returns whether the given singular extension is present.
 *
 * @param {!ExtensionFieldInfo<EM, EI, ME, EXTENDEE>} fieldInfo
 *     Specifies the field to get.
 * @return {boolean} Whether the extension is present.
 * @template EM, EI, ME, THIS
 * @template EXTENDEE := THIS =:
 * @this {THIS}
 * @override
 * @abstract
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
ImmutableMessage.prototype.hasExtension = function(fieldInfo) {};

/**
 * Gets the length of a repeated extension field.
 *
 * @abstract
 * @override
 * @param {!ExtensionFieldInfo<!ReadonlyArray<EM>, !ReadonlyArray<EI>, ?,
 *     EXTENDEE>} fieldInfo Specifies the field to get.
 * @return {number} The number of values in this field.
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
 *     MExtendee,
 *     THIS
 *   >
 * ): number
 */
ImmutableMessage.prototype.getExtensionCount = function(fieldInfo) {};

/**
 * Gets a value in a repeated extension field.
 *
 * @abstract
 * @override
 * @param {!ExtensionFieldInfo<!ReadonlyArray<EM>, !ReadonlyArray<EI>, ?,
 *     EXTENDEE>} fieldInfo Specifies the field to get.
 * @param {number} idx The index to read from this field.
 * @return {!EI} The value of the field.
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
 * ): IValue[number]
 */
ImmutableMessage.prototype.getExtensionAtIndex = function(fieldInfo, idx) {};

/**
 * Returns a function which deserializes the type of this message.
 *
 * Always deserializes values as immutable.
 *
 * @abstract
 * @override
 * @public
 * @this {THIS}
 * @template THIS
 * @return {function(string): THIS}
 * @tsType (): ((serialized: string) => this)
 */
ImmutableMessage.prototype.getParserForType = function() {};


/**
 * Do not call this method, you cannot use static-side inheritance since
 * it will be deleted at runtime.
 *
 * @deprecated Call Message.equals directly
 * @package
 * @param {!null} param
 * @return {!null}
 * @tsType (param: never): never
 */
ImmutableMessage.equals = function(param) {
  throw new Error('Call equals directly on the Message class, not a subclass');
};

/*
 * Overrides the behavior of `instanceof` to prevent checks.
 *
 * Because this class should be completely devirtualized and optimized away
 * by the JSCompiler, we cannot depend on its constructor or prototype. As
 * a result, `instanceof` checks cannot be made to work at runtime and we need
 * to defensively fail.
 */
if (USE_DETAILED_MESSAGE_TYPE_HIERARCHY && SUPPORTS_HAS_INSTANCE) {
  const rejectInstanceof = () => {
    throw new Error(
        goog.DEBUG ?
            ('Cannot perform instanceof checks for ImmutableMessage. Please use ' +
             '.isMutable or .isImmutable to determine whether a message is ' +
             'mutable. See go/jspb-api-gotchas#immutable-classes for more ' +
             'information') :
            undefined);
  };
  // TODO(b/219105470): use defineProperty once JSC supports it
  Object.defineProperties(ImmutableMessage, {
    [Symbol.hasInstance]: invisiblePropValue(rejectInstanceof),
  });
  assert(
      ImmutableMessage[Symbol.hasInstance] === rejectInstanceof,
      'broken defineProperties implementation');
}

/**
 * Retrieves the default instance of an immutable proto.
 *
 * @param {function(new: MutableMessage<I>)} mutableCtor
 * @return {!I}
 * @template I
 * @tsType <
 *   I extends
 * import('google3/javascript/apps/jspb/immutable_message').ImmutableMessage
 * >(
 *   ctor: new () =>
 *     import('google3/javascript/apps/jspb/mutable_message').MutableMessage<I>
 * ): I
 */
function defaultImmutableInstance(mutableCtor) {
  if (!(mutableCtor?.prototype instanceof Message)) {
    throw goog.DEBUG ?
        new Error(
            `value ${mutableCtor} was not a mutable message constructor`) :
        new Error();
  }
  return getDefaultImmutableInstance(mutableCtor);
}

exports = {
  defaultImmutableInstance,
  ImmutableMessage,
};
