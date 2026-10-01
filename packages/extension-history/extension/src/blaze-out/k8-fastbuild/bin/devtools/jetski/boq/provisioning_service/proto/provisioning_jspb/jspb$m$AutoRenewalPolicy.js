// source: devtools/jetski/boq/provisioning_service/proto/provisioning.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy');
goog.provide('jspb$ro.devtools_jetski_provisioning$ReadonlyAutoRenewalPolicy');

goog.require('jspb$google$type$MutableTimeZone');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$devtools_jetski_provisioning$ImmutableAutoRenewalPolicy');
goog.requireType('jspb$e.devtools_jetski_provisioning$AutoRenewMode');
goog.requireType('jspb$r$devtools_jetski_provisioning$AutoRenewalPolicy$internalDoNotUseReader');
goog.requireType('jspb$ro.google$type$ReadonlyTimeZone');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$devtools_jetski_provisioning$ImmutableAutoRenewalPolicy>}
 * @implements {jspb$r$devtools_jetski_provisioning$AutoRenewalPolicy$internalDoNotUseReader}
 */
jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional AutoRenewMode auto_renew_mode = 1;
   * @override
   * @return {!jspb$e.devtools_jetski_provisioning$AutoRenewMode}
   */
  getAutoRenewMode() {
    return /** @type {!jspb$e.devtools_jetski_provisioning$AutoRenewMode} */ (jspb_internal_adapters.getEnumFieldWithDefault(this, 1));
  }


  /**
   * @param {!jspb$e.devtools_jetski_provisioning$AutoRenewMode|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy} returns this
   */
  setAutoRenewMode(value) {
    return jspb_internal_adapters.setEnumField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy} returns this
   */
  clearAutoRenewMode() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasAutoRenewMode() {
    return jspb_internal_adapters.hasEnumField(this, 1);
  }


  /**
   * optional AutoRenewMode auto_renew_mode = 1;
   * @override
   * @return {!jspb$e.devtools_jetski_provisioning$AutoRenewMode|undefined}
   */
  getAutoRenewModeOrUndefined() {
    return /** @type {!jspb$e.devtools_jetski_provisioning$AutoRenewMode|undefined} */ (jspb_internal_adapters.getEnumFieldOrUndefined(this, 1));
  }


  /**
   * optional google.type.TimeZone timezone = 2;
   * @override
   * @return {!jspb$google$type$MutableTimeZone|undefined}
   */
  getTimezone() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$google$type$MutableTimeZone, 2);
  }


  /**
   * optional google.type.TimeZone timezone = 2;
   * @override
   * @return {!jspb$ro.google$type$ReadonlyTimeZone}
   */
  getReadonlyTimezone() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$google$type$MutableTimeZone, 2);
  }


  /**
   * optional google.type.TimeZone timezone = 2;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$google$type$MutableTimeZone|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$google$type$MutableTimeZone') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$google$type$MutableTimeZone|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$google$type$MutableTimeZone
   */
  getMutableTimezone(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$google$type$MutableTimeZone, 2, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.google$type$ReadonlyTimeZone|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy} returns this
   */
  setTimezone(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$google$type$MutableTimeZone, 2, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy} returns this
   */
  clearTimezone() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasTimezone() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$google$type$MutableTimeZone, 2);
  }


  /**
   * optional google.type.TimeZone timezone = 2;
   * @override
   * @return {!jspb$ro.google$type$ReadonlyTimeZone|undefined}
   */
  getTimezoneOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$google$type$MutableTimeZone, 2);
  }


};

/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$ImmutableAutoRenewalPolicy}
 */
jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy}
 */
jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy.prototype.clone;
/**
 * @const {function(string):!jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy}
 */
jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy));

/**
 * Returns whether the given value is an instance of jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy>}
 */
jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy));

/**
 * Object form of AutoRenewalPolicy as accepted by the `fromObject` method.
 * @typedef {{
 *  autoRenewMode: (?number|undefined),
 *  timezone: (?jspb$google$type$MutableTimeZone.ObjectFormat|undefined)
 * }}
 */
jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for devtools_jetski_provisioning$MutableAutoRenewalPolicy.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy.internalDoNotUse_debugOnlyProtoTypeName = "devtools_jetski_provisioning.AutoRenewalPolicy";
}

/**
 * @typedef {!jspb$devtools_jetski_provisioning$ImmutableAutoRenewalPolicy|!jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy}
 */
jspb$ro.devtools_jetski_provisioning$ReadonlyAutoRenewalPolicy = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'devtools_jetski_provisioning.AutoRenewalPolicy'}
   */
  jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy.displayName = 'proto.devtools_jetski_provisioning.AutoRenewalPolicy';
}
/**
 * Interface form of AutoRenewalPolicy as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  autoRenewMode: (!jspb$e.devtools_jetski_provisioning$AutoRenewMode|undefined),
 *  timezone: (!jspb$ro.google$type$ReadonlyTimeZone|undefined)
 * }}
 */
jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy.FieldsInterface;

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
 * @param {!jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy.FieldsInterface} record
 * @return {!jspb$devtools_jetski_provisioning$ImmutableAutoRenewalPolicy}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy, ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$ImmutableAutoRenewalPolicy
 */
jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy));

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
 * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyAutoRenewalPolicy} value
 * @return {!jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.devtools_jetski_provisioning$ReadonlyAutoRenewalPolicy): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy, ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$b$google$type$TimeZone;
Object.defineProperty(this, 'jspb$b$google$type$TimeZone', {
  get() { return jspb$b$google$type$TimeZone; },
  set(v) { jspb$b$google$type$TimeZone = v; },
