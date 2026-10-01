// source: google/protobuf/any.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$google$protobuf$MutableAny');
goog.provide('jspb$ro.google$protobuf$ReadonlyAny');

goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.types.constructors');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.types.internal_readonly_type_conversions');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.types.readonly_type_conversions');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$google$protobuf$ImmutableAny');
goog.requireType('jspb$r$google$protobuf$Any$internalDoNotUseReader');
goog.requireType('jspb');
goog.requireType('jspb.bytestring');
/** @suppress {extraRequire} */
goog.requireType('jspb.immutable_message.ImmutableMessage');
/** @suppress {extraRequire} */
goog.requireType('jspb.mutable_message.MutableMessage');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$google$protobuf$ImmutableAny>}
 * @implements {jspb$r$google$protobuf$Any$internalDoNotUseReader}
 */
jspb$google$protobuf$MutableAny = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional string type_url = 1;
   * @override
   * @return {string}
   */
  getTypeUrl() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 1);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$google$protobuf$MutableAny} returns this
   */
  setTypeUrl(value) {
    return jspb_internal_adapters.setProto3StringField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$google$protobuf$MutableAny} returns this
   */
  clearTypeUrl() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * Returns the type name contained in this instance, if any.
   * @return {string}
   * @override
   */
  getTypeName() {
    return jspb_internal_public_for_gencode.getAnyTypeName(this);
  }


  /**
   * Packs the given message instance into this Any.
   * For binary format usage only.
   * @param {!Uint8Array|string|!jspb.bytestring.ByteString} serialized The serialized data to pack.
   * @param {string} name The type name of this message object.
   * @param {string=} typeUrlPrefix the type URL prefix.
   * @return {!jspb$google$protobuf$MutableAny}
   */
  pack(serialized, name, typeUrlPrefix) {
    return jspb_internal_public_for_gencode.packAnyValueBinary(
        this, serialized, name, typeUrlPrefix);
  }

  /**
   * Returns the value field contents as a ByteString.
   *
   * Prefer calling `unpack` or `unpackJspb` instead.
   *
   * If the value has been set by `packJspb` or parsed from jspb format then this
   * method will throw an Error. It is only valid to access such values using
   * `unpackJspb`.
   *
   * @return {!jspb.bytestring.ByteString}
   * @override
   * @deprecated DANGEROUS: do not call this method directly. Use appropriate unpack* method instead (go/jspb-gencode?polyglot=typescript#any).
   */
  getValue() {
    return jspb_internal_public_for_gencode.getAnyValueField(this);
  }

  /**
   * Applications should call `pack` or `packJspb` instead of directly
   * manipulating the `value` field.
   * @param {string|!Uint8Array|!jspb.bytestring.ByteString|!Array<?>} value
   * @return {!jspb$google$protobuf$MutableAny} returns this
   * @deprecated DANGEROUS: do not call this method directly. Use appropriate pack* method instead (go/jspb-gencode?polyglot=typescript#any).
   */
  setValue(value) {
    return jspb_internal_public_for_gencode.fromObjectAnyValue(this, value);
  }


  /**
   * Packs the given message instance into this Any.
   * For jspb format usage only.
   * Note that Any will share the internal data with the packed
   * message. So changing the packed message will also change the Any.
   * @param {!T} msg Proto message to pack.
   * @param {string} name The type name of this message object.
   * @param {function(!T):!Uint8Array=} serializeBinaryFn Static serializeBinary
   *     function for msg if this Any will be serialized to binary.
   * @param {string=} typeUrlPrefix the type URL prefix.
   * @return {!jspb$google$protobuf$MutableAny}
   * @template T
   * @tsType <T extends import('google3/javascript/apps/jspb/message').Message>(msg: T, name: string, serializeBinaryFn?: (msg: T) => Uint8Array, typeUrlPrefix?: string): this
   */
  packJspb(msg, name, serializeBinaryFn, typeUrlPrefix = 'type.googleapis.com') {
    return jspb_internal_public_for_gencode.packAnyValueJspb(this, msg, name, serializeBinaryFn, typeUrlPrefix);
  }

  /**
   * Unpacks the value into a new message object. If the value is binary, use the
   * given deserialization function. If it is JSPB, simply construct a message.
   * @param {function(!Uint8Array):T} deserializeBinaryFn Function that will
   *     deserialize the binary data properly.
   * @param {string} name The expected type name of this message object.
   * @return {?T} If the name matched the expected name, returns the deserialized
   *     object, otherwise returns null.
   * @template T
   * @throws {Error} if the value is not in binary format
   * @override
   * @tsType <
   *   EXPLICIT extends import('google3/javascript/apps/jspb/message').Message,
   *   M extends import('google3/javascript/apps/jspb/mutable_message').MutableMessage<I> =
   *     import('google3/javascript/apps/jspb/types/readonly_type_conversions').ToMutable<EXPLICIT>,
   *   I extends import('google3/javascript/apps/jspb/immutable_message').ImmutableMessage<M> =
   *     import('google3/javascript/apps/jspb/types/readonly_type_conversions').ToImmutable<EXPLICIT>,
   * >(
   *   deserialize: ((arr: Uint8Array) => import('google3/javascript/apps/jspb/mutable_message').MutableMessage<I>)
   *     | ((arr: Uint8Array) => import('google3/javascript/apps/jspb/immutable_message').ImmutableMessage<M>),
   *   name: string,
   * ): import('google3/javascript/apps/jspb/types/internal_readonly_type_conversions').SpecificMutableType<M, I> | null
   */
  unpack(deserializeBinaryFn, name) {
    return jspb_internal_public_for_gencode.unpackAnyJspbCompat(this, undefined, deserializeBinaryFn, name);
  }

  /**
   * Unpacks the value into a new message object. If the value is binary, use the
   * given deserialization function. If it is JSPB, simply construct a message.
   * @param {function(new:M, !Array<?>=)|!jspb.immutable_message.ImmutableMessage<!M>} ctorOrDefaultInstance Constructor or default instance of the message.
   * @param {function(!Uint8Array):(!M|!jspb.immutable_message.ImmutableMessage<!M>)} deserializeBinaryFn Function that will deserialize
   * @param {string} name The expected type name of this message object.
   * @return {?M} If the name matched the expected name,
   *     returns the deserialized object, otherwise returns null.
   * @template M
   * @override
   * @tsType <M extends import('google3/javascript/apps/jspb/mutable_message').MutableMessage<I>, I extends import('google3/javascript/apps/jspb/immutable_message').ImmutableMessage<M>>(
   *   ctorOrDefaultInstance: import('google3/javascript/apps/jspb/types/constructors').MessageConstructor<M>|I,
   *   deserialize: ((arr: Uint8Array) => import('google3/javascript/apps/jspb/mutable_message').MutableMessage<I>)|((arr: Uint8Array) => import('google3/javascript/apps/jspb/immutable_message').ImmutableMessage<M>),
   *   name: string
   * ): import('google3/javascript/apps/jspb/types/internal_readonly_type_conversions').SpecificMutableType<M, I>|null
   */
  unpackJspbCompat(ctorOrDefaultInstance, deserializeBinaryFn, name) {
    return jspb_internal_public_for_gencode.unpackAnyJspbCompat(this, ctorOrDefaultInstance, deserializeBinaryFn, name);
  }

  /**
   * Unpacks the value into a message, if it is JSPB formatted. Throws if the
   * value is binary.
   *
   * @param {function(new:M, !Array<?>=)|!jspb.immutable_message.ImmutableMessage<!M>} ctorOrDefaultInstance Constructor or default instance of the message.
   * @param {string} name The expected type name of this message object. Must be
   *     specified as it cannot be determined from the proto constructor.
   * @return {?M} If the name matched the
   *     expected name, returns the deserialized object, otherwise returns null.
   * @template M
   * @throws {Error} if the value is not in the JSPB format
   * @override
   * @tsType <M extends import('google3/javascript/apps/jspb/mutable_message').MutableMessage<I>, I extends import('google3/javascript/apps/jspb/immutable_message').ImmutableMessage<M>>(
   *   ctorOrDefaultInstance: import('google3/javascript/apps/jspb/types/constructors').MessageConstructor<M>|I,
   *   name: string
   * ): import('google3/javascript/apps/jspb/types/internal_readonly_type_conversions').SpecificMutableType<M, I>|null
   */
  unpackJspb(ctorOrDefaultInstance, name) {
    return jspb_internal_public_for_gencode.unpackAnyJspbCompat(this, ctorOrDefaultInstance, undefined, name);
  }

  /**
   * @private
   * @return {?}
   */
  jspbInternalDoNotUseAnyMarker() {
    return jspb_internal_public_for_gencode.ANY_PROTOTYPE_MARKER_VALUE;
  }
};

/**
 * @override
 * @return {!jspb$google$protobuf$ImmutableAny}
 */
jspb$google$protobuf$MutableAny.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$google$protobuf$MutableAny}
 */
jspb$google$protobuf$MutableAny.prototype.clone;
/**
 * @const {function(string):!jspb$google$protobuf$MutableAny}
 */
jspb$google$protobuf$MutableAny.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$google$protobuf$MutableAny));

/**
 * Returns whether the given value is an instance of jspb$google$protobuf$MutableAny.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$google$protobuf$MutableAny>}
 */
jspb$google$protobuf$MutableAny.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$google$protobuf$MutableAny));

/**
 * Object form of Any as accepted by the `fromObject` method.
 * @typedef {{
 *  typeUrl: (?string|undefined),
 *  value: (!Array<?>|string|null|undefined)
 * }}
 */
jspb$google$protobuf$MutableAny.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$google$protobuf$MutableAny.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @return {!jspb$google$protobuf$MutableAny.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$google$protobuf$MutableAny.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for google$protobuf$MutableAny.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$google$protobuf$MutableAny.internalDoNotUse_debugOnlyProtoTypeName = "google.protobuf.Any";
}

/**
 * @typedef {!jspb$google$protobuf$ImmutableAny|!jspb$google$protobuf$MutableAny}
 */
jspb$ro.google$protobuf$ReadonlyAny = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'google.protobuf.Any'}
   */
  jspb$google$protobuf$MutableAny.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$google$protobuf$MutableAny.displayName = 'proto.google.protobuf.Any';
}
/**
 * Interface form of Any as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  typeUrl: (string|undefined),
 *  value: (!jspb.bytestring.ByteString|undefined)
 * }}
 */
jspb$google$protobuf$MutableAny.FieldsInterface;

var jspb$devtools_jetski_provisioning$MutableBlueprintBinding;
Object.defineProperty(this, 'jspb$devtools_jetski_provisioning$MutableBlueprintBinding', {
  get() { return jspb$devtools_jetski_provisioning$MutableBlueprintBinding; },
  set(v) { jspb$devtools_jetski_provisioning$MutableBlueprintBinding = v; },
