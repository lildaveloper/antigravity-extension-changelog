// source: devtools/jetski/boq/provisioning_service/proto/deployment_config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$devtools_jetski_provisioning$MutableBlueprintBinding');
goog.provide('jspb$ro.devtools_jetski_provisioning$ReadonlyBlueprintBinding');

goog.require('jspb$google$protobuf$MutableAny');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$devtools_jetski_provisioning$ImmutableBlueprintBinding');
goog.requireType('jspb$r$devtools_jetski_provisioning$BlueprintBinding$internalDoNotUseReader');
goog.requireType('jspb$ro.google$protobuf$ReadonlyAny');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$devtools_jetski_provisioning$ImmutableBlueprintBinding>}
 * @implements {jspb$r$devtools_jetski_provisioning$BlueprintBinding$internalDoNotUseReader}
 */
jspb$devtools_jetski_provisioning$MutableBlueprintBinding = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional string blueprint_id = 1;
   * @override
   * @return {string}
   */
  getBlueprintId() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 1);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableBlueprintBinding} returns this
   */
  setBlueprintId(value) {
    return jspb_internal_adapters.setStringField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableBlueprintBinding} returns this
   */
  clearBlueprintId() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasBlueprintId() {
    return jspb_internal_adapters.hasStringField(this, 1);
  }


  /**
   * optional string blueprint_id = 1;
   * @override
   * @return {string|undefined}
   */
  getBlueprintIdOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 1);
  }


  /**
   * map<string, string> params = 2;
   * @override
   * @return {!Map<string,string>}
   * @deprecated
   */
  getParamsMap() {
    return jspb_internal_adapters.getStringStringMapField(this, 2);}



  /**
   * @param {string} key The key of value to set or replace.
   * @param {string} value The new value.
   * @return {!jspb$devtools_jetski_provisioning$MutableBlueprintBinding} returns this
   * @deprecated
   */
  putParams(key, value) {
    return jspb_internal_adapters.putStringStringMapField(this, 2, key, value);
  }


  /**
   * @param {!ReadonlyMap<string,string>} value The new values.
   * @return {!jspb$devtools_jetski_provisioning$MutableBlueprintBinding} returns this
   * @deprecated
   */
  putAllParams(value) {
    return jspb_internal_adapters.putAllStringStringMapField(this, 2, value);
  }


  /**
   * @param {!ReadonlyMap<string,string>|undefined} value The new values.
   * @return {!jspb$devtools_jetski_provisioning$MutableBlueprintBinding} returns this
   * @deprecated
   */
  setParamsMap(value) {
    return jspb_internal_adapters.setStringStringMapField(this, 2, value);
  }


  /**
   * @param {string} key The key of value to remove.
   * @return {!jspb$devtools_jetski_provisioning$MutableBlueprintBinding} returns this
   * @deprecated
   */
  deleteParams(key) {
    return jspb_internal_adapters.deleteStringStringMapField(this, 2, key);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableBlueprintBinding} returns this
   * @deprecated
   */
  clearParamsMap() {
    return jspb_internal_adapters.clearMapField(this, 2);
  }


  /**
   * optional string version_name = 3;
   * @override
   * @return {string}
   */
  getVersionName() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 3);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableBlueprintBinding} returns this
   */
  setVersionName(value) {
    return jspb_internal_adapters.setStringField(this, 3, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableBlueprintBinding} returns this
   */
  clearVersionName() {
    return jspb_internal_adapters.clearField(this, 3);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasVersionName() {
    return jspb_internal_adapters.hasStringField(this, 3);
  }


  /**
   * optional string version_name = 3;
   * @override
   * @return {string|undefined}
   */
  getVersionNameOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 3);
  }


  /**
   * optional google.protobuf.Any user_config = 4;
   * @override
   * @return {!jspb$google$protobuf$MutableAny|undefined}
   */
  getUserConfig() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$google$protobuf$MutableAny, 4);
  }


  /**
   * optional google.protobuf.Any user_config = 4;
   * @override
   * @return {!jspb$ro.google$protobuf$ReadonlyAny}
   */
  getReadonlyUserConfig() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$google$protobuf$MutableAny, 4);
  }


  /**
   * optional google.protobuf.Any user_config = 4;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$google$protobuf$MutableAny|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$google$protobuf$MutableAny') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$google$protobuf$MutableAny|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$google$protobuf$MutableAny
   */
  getMutableUserConfig(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$google$protobuf$MutableAny, 4, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.google$protobuf$ReadonlyAny|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableBlueprintBinding} returns this
   */
  setUserConfig(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$google$protobuf$MutableAny, 4, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableBlueprintBinding} returns this
   */
  clearUserConfig() {
    return jspb_internal_adapters.clearField(this, 4);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasUserConfig() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$google$protobuf$MutableAny, 4);
  }


  /**
   * optional google.protobuf.Any user_config = 4;
   * @override
   * @return {!jspb$ro.google$protobuf$ReadonlyAny|undefined}
   */
  getUserConfigOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$google$protobuf$MutableAny, 4);
  }


};

/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$ImmutableBlueprintBinding}
 */
jspb$devtools_jetski_provisioning$MutableBlueprintBinding.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$MutableBlueprintBinding}
 */
jspb$devtools_jetski_provisioning$MutableBlueprintBinding.prototype.clone;
/**
 * @const {function(string):!jspb$devtools_jetski_provisioning$MutableBlueprintBinding}
 */
jspb$devtools_jetski_provisioning$MutableBlueprintBinding.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$devtools_jetski_provisioning$MutableBlueprintBinding));

/**
 * Returns whether the given value is an instance of jspb$devtools_jetski_provisioning$MutableBlueprintBinding.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$devtools_jetski_provisioning$MutableBlueprintBinding>}
 */
jspb$devtools_jetski_provisioning$MutableBlueprintBinding.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$devtools_jetski_provisioning$MutableBlueprintBinding));

/**
 * Object form of BlueprintBinding as accepted by the `fromObject` method.
 * @typedef {{
 *  blueprintId: (?string|undefined),
 *  paramsMap: (?Array<!Array<string>>|undefined),
 *  versionName: (?string|undefined),
 *  userConfig: (?jspb$google$protobuf$MutableAny.ObjectFormat|undefined)
 * }}
 */
jspb$devtools_jetski_provisioning$MutableBlueprintBinding.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$devtools_jetski_provisioning$MutableBlueprintBinding.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$devtools_jetski_provisioning$MutableBlueprintBinding.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$devtools_jetski_provisioning$MutableBlueprintBinding.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for devtools_jetski_provisioning$MutableBlueprintBinding.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$devtools_jetski_provisioning$MutableBlueprintBinding.internalDoNotUse_debugOnlyProtoTypeName = "devtools_jetski_provisioning.BlueprintBinding";
}

/**
 * @typedef {!jspb$devtools_jetski_provisioning$ImmutableBlueprintBinding|!jspb$devtools_jetski_provisioning$MutableBlueprintBinding}
 */
jspb$ro.devtools_jetski_provisioning$ReadonlyBlueprintBinding = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'devtools_jetski_provisioning.BlueprintBinding'}
   */
  jspb$devtools_jetski_provisioning$MutableBlueprintBinding.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$devtools_jetski_provisioning$MutableBlueprintBinding.displayName = 'proto.devtools_jetski_provisioning.BlueprintBinding';
}
/**
 * Interface form of BlueprintBinding as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  blueprintId: (string|undefined),
 *  paramsMap: (!ReadonlyMap<string,string>|undefined),
 *  versionName: (string|undefined),
 *  userConfig: (!jspb$ro.google$protobuf$ReadonlyAny|undefined)
 * }}
 */
jspb$devtools_jetski_provisioning$MutableBlueprintBinding.FieldsInterface;

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
 * @param {!jspb$devtools_jetski_provisioning$MutableBlueprintBinding.FieldsInterface} record
 * @return {!jspb$devtools_jetski_provisioning$ImmutableBlueprintBinding}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableBlueprintBinding, ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableBlueprintBinding.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$ImmutableBlueprintBinding
 */
jspb$devtools_jetski_provisioning$MutableBlueprintBinding.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$devtools_jetski_provisioning$MutableBlueprintBinding));

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
 * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyBlueprintBinding} value
 * @return {!jspb$devtools_jetski_provisioning$MutableBlueprintBinding.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.devtools_jetski_provisioning$ReadonlyBlueprintBinding): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableBlueprintBinding, ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableBlueprintBinding.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$devtools_jetski_provisioning$MutableBlueprintBinding.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$b$google$protobuf$Any;
Object.defineProperty(this, 'jspb$b$google$protobuf$Any', {
  get() { return jspb$b$google$protobuf$Any; },
  set(v) { jspb$b$google$protobuf$Any = v; },
