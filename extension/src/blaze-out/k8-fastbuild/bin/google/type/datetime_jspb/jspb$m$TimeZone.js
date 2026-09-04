// source: google/type/datetime.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$google$type$MutableTimeZone');
goog.provide('jspb$ro.google$type$ReadonlyTimeZone');

goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$google$type$ImmutableTimeZone');
goog.requireType('jspb$r$google$type$TimeZone$internalDoNotUseReader');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$google$type$ImmutableTimeZone>}
 * @implements {jspb$r$google$type$TimeZone$internalDoNotUseReader}
 */
jspb$google$type$MutableTimeZone = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional string id = 1;
   * @override
   * @return {string}
   */
  getId() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 1);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$google$type$MutableTimeZone} returns this
   */
  setId(value) {
    return jspb_internal_adapters.setProto3StringField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$google$type$MutableTimeZone} returns this
   */
  clearId() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * optional string version = 2;
   * @override
   * @return {string}
   */
  getVersion() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 2);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$google$type$MutableTimeZone} returns this
   */
  setVersion(value) {
    return jspb_internal_adapters.setProto3StringField(this, 2, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$google$type$MutableTimeZone} returns this
   */
  clearVersion() {
    return jspb_internal_adapters.clearField(this, 2);
  }


};

/**
 * @override
 * @return {!jspb$google$type$ImmutableTimeZone}
 */
jspb$google$type$MutableTimeZone.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$google$type$MutableTimeZone}
 */
jspb$google$type$MutableTimeZone.prototype.clone;
/**
 * @const {function(string):!jspb$google$type$MutableTimeZone}
 */
jspb$google$type$MutableTimeZone.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$google$type$MutableTimeZone));

/**
 * Returns whether the given value is an instance of jspb$google$type$MutableTimeZone.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$google$type$MutableTimeZone>}
 */
jspb$google$type$MutableTimeZone.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$google$type$MutableTimeZone));

/**
 * Object form of TimeZone as accepted by the `fromObject` method.
 * @typedef {{
 *  id: (?string|undefined),
 *  version: (?string|undefined)
 * }}
 */
jspb$google$type$MutableTimeZone.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$google$type$MutableTimeZone.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @return {!jspb$google$type$MutableTimeZone.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$google$type$MutableTimeZone.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for google$type$MutableTimeZone.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$google$type$MutableTimeZone.internalDoNotUse_debugOnlyProtoTypeName = "google.type.TimeZone";
}

/**
 * @typedef {!jspb$google$type$ImmutableTimeZone|!jspb$google$type$MutableTimeZone}
 */
jspb$ro.google$type$ReadonlyTimeZone = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'google.type.TimeZone'}
   */
  jspb$google$type$MutableTimeZone.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$google$type$MutableTimeZone.displayName = 'proto.google.type.TimeZone';
}
/**
 * Interface form of TimeZone as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  id: (string|undefined),
 *  version: (string|undefined)
 * }}
 */
jspb$google$type$MutableTimeZone.FieldsInterface;

/**
 * Constructs a set of proto fields into an immutable proto.
 *
 * This method can only be called in TS and must be passed an object.
 * literal with keys matching the setter names (so where you have
 * setFooList on the type, you can write {fooList: ...} here).
 *
 * See go/jspb-fields-interface for more information.
 *
 * This record format is **not a serialization format**.
 * @package this cannot be called from JS.
 * @param {!jspb$google$type$MutableTimeZone.FieldsInterface} record
 * @return {!jspb$google$type$ImmutableTimeZone}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$google$type$MutableTimeZone, ಠ_ಠ.clutz.jspb$google$type$MutableTimeZone.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$google$type$ImmutableTimeZone
 */
jspb$google$type$MutableTimeZone.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$google$type$MutableTimeZone));

/**
 * Retrieves the fields of this proto in a destructurable interface.
 *
 * This method can only be called in TS and the result must be
 * immediately destructured (so you can write
 * const {a} = Foo.getFields(value);).
 *
 * See go/jspb-fields-interface for more information.
 *
 * @package this cannot be called from JS.
 * @param {!jspb$ro.google$type$ReadonlyTimeZone} value
 * @return {!jspb$google$type$MutableTimeZone.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.google$type$ReadonlyTimeZone): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$google$type$MutableTimeZone, ಠ_ಠ.clutz.jspb$google$type$MutableTimeZone.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$google$type$MutableTimeZone.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy;
Object.defineProperty(this, 'jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy', {
  get() { return jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy; },
  set(v) { jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy = v; },
