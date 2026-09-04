// source: third_party/jetski/jetbox_state_pb/jetbox_state.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$jetbox_state_pb$MutableCustomModelsConfig');
goog.provide('jspb$ro.jetbox_state_pb$ReadonlyCustomModelsConfig');

goog.require('jspb$exa$codeium_common_pb$MutableModelInfo');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$exa$codeium_common_pb$ImmutableModelInfo');
goog.requireType('jspb$jetbox_state_pb$ImmutableCustomModelsConfig');
goog.requireType('jspb$r$jetbox_state_pb$CustomModelsConfig$internalDoNotUseReader');
goog.requireType('jspb$ro.exa$codeium_common_pb$ReadonlyModelInfo');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$jetbox_state_pb$ImmutableCustomModelsConfig>}
 * @implements {jspb$r$jetbox_state_pb$CustomModelsConfig$internalDoNotUseReader}
 */
jspb$jetbox_state_pb$MutableCustomModelsConfig = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * map<string, exa.codeium_common_pb.ModelInfo> custom_models = 1;
   * @override
   * @return {!Map<string,!jspb$exa$codeium_common_pb$MutableModelInfo>}
   */
  getCustomModelsMap() {
    return jspb_internal_adapters.getStringWrapperMapField(this, 1,
        jspb$exa$codeium_common_pb$MutableModelInfo);}



  /**
   * map<string, exa.codeium_common_pb.ModelInfo> custom_models = 1;
   * @override
   * @return {!Map<string,!jspb$ro.exa$codeium_common_pb$ReadonlyModelInfo>}
   */
  getReadonlyCustomModelsMap() {
    return jspb_internal_adapters.getReadonlyStringWrapperMapField(this, 1,
        jspb$exa$codeium_common_pb$MutableModelInfo);}



  /**
   * @param {string} key The key of value to set or replace.
   * @param {!jspb$ro.exa$codeium_common_pb$ReadonlyModelInfo} value The new value.
   * @return {!jspb$jetbox_state_pb$MutableCustomModelsConfig} returns this
   */
  putCustomModels(key, value) {
    return jspb_internal_adapters.putStringWrapperMapField(this, 1, key, value, jspb$exa$codeium_common_pb$MutableModelInfo);
  }


  /**
   * @param {!ReadonlyMap<string,!jspb$ro.exa$codeium_common_pb$ReadonlyModelInfo>} value The new values.
   * @return {!jspb$jetbox_state_pb$MutableCustomModelsConfig} returns this
   */
  putAllCustomModels(value) {
    return jspb_internal_adapters.putAllStringWrapperMapField(this, 1, value, jspb$exa$codeium_common_pb$MutableModelInfo);
  }


  /**
   * @param {!ReadonlyMap<string,!jspb$ro.exa$codeium_common_pb$ReadonlyModelInfo>|undefined} value The new values.
   * @return {!jspb$jetbox_state_pb$MutableCustomModelsConfig} returns this
   */
  setCustomModelsMap(value) {
    return jspb_internal_adapters.setStringWrapperMapField(this, 1, value, jspb$exa$codeium_common_pb$MutableModelInfo);
  }


  /**
   * @param {string} key The key of value to remove.
   * @return {!jspb$jetbox_state_pb$MutableCustomModelsConfig} returns this
   */
  deleteCustomModels(key) {
    return jspb_internal_adapters.deleteStringWrapperMapField(this, 1, key, jspb$exa$codeium_common_pb$MutableModelInfo);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableCustomModelsConfig} returns this
   */
  clearCustomModelsMap() {
    return jspb_internal_adapters.clearMapField(this, 1);
  }


};

/**
 * @override
 * @return {!jspb$jetbox_state_pb$ImmutableCustomModelsConfig}
 */
jspb$jetbox_state_pb$MutableCustomModelsConfig.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$jetbox_state_pb$MutableCustomModelsConfig}
 */
jspb$jetbox_state_pb$MutableCustomModelsConfig.prototype.clone;
/**
 * @const {function(string):!jspb$jetbox_state_pb$MutableCustomModelsConfig}
 */
jspb$jetbox_state_pb$MutableCustomModelsConfig.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$jetbox_state_pb$MutableCustomModelsConfig));

/**
 * Returns whether the given value is an instance of jspb$jetbox_state_pb$MutableCustomModelsConfig.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$jetbox_state_pb$MutableCustomModelsConfig>}
 */
jspb$jetbox_state_pb$MutableCustomModelsConfig.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$jetbox_state_pb$MutableCustomModelsConfig));

/**
 * Object form of CustomModelsConfig as accepted by the `fromObject` method.
 * @typedef {{
 *  customModelsMap: (?Array<!Array<!jspb$exa$codeium_common_pb$MutableModelInfo.ObjectFormat|string>>|undefined)
 * }}
 */
jspb$jetbox_state_pb$MutableCustomModelsConfig.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$jetbox_state_pb$MutableCustomModelsConfig.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$jetbox_state_pb$MutableCustomModelsConfig.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$jetbox_state_pb$MutableCustomModelsConfig.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for jetbox_state_pb$MutableCustomModelsConfig.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$jetbox_state_pb$MutableCustomModelsConfig.internalDoNotUse_debugOnlyProtoTypeName = "jetbox_state_pb.CustomModelsConfig";
}

/**
 * @typedef {!jspb$jetbox_state_pb$ImmutableCustomModelsConfig|!jspb$jetbox_state_pb$MutableCustomModelsConfig}
 */
jspb$ro.jetbox_state_pb$ReadonlyCustomModelsConfig = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'jetbox_state_pb.CustomModelsConfig'}
   */
  jspb$jetbox_state_pb$MutableCustomModelsConfig.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$jetbox_state_pb$MutableCustomModelsConfig.displayName = 'proto.jetbox_state_pb.CustomModelsConfig';
}
/**
 * Interface form of CustomModelsConfig as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  customModelsMap: (!ReadonlyMap<string,!jspb$ro.exa$codeium_common_pb$ReadonlyModelInfo>|!ReadonlyMap<string,!jspb$exa$codeium_common_pb$ImmutableModelInfo>|undefined)
 * }}
 */
jspb$jetbox_state_pb$MutableCustomModelsConfig.FieldsInterface;

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
 * @param {!jspb$jetbox_state_pb$MutableCustomModelsConfig.FieldsInterface} record
 * @return {!jspb$jetbox_state_pb$ImmutableCustomModelsConfig}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableCustomModelsConfig, ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableCustomModelsConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$jetbox_state_pb$ImmutableCustomModelsConfig
 */
jspb$jetbox_state_pb$MutableCustomModelsConfig.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$jetbox_state_pb$MutableCustomModelsConfig));

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
 * @param {!jspb$ro.jetbox_state_pb$ReadonlyCustomModelsConfig} value
 * @return {!jspb$jetbox_state_pb$MutableCustomModelsConfig.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.jetbox_state_pb$ReadonlyCustomModelsConfig): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableCustomModelsConfig, ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableCustomModelsConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$jetbox_state_pb$MutableCustomModelsConfig.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$jetbox_state_pb$MutableGoogleSpecificSettings;
Object.defineProperty(this, 'jspb$jetbox_state_pb$MutableGoogleSpecificSettings', {
  get() { return jspb$jetbox_state_pb$MutableGoogleSpecificSettings; },
  set(v) { jspb$jetbox_state_pb$MutableGoogleSpecificSettings = v; },
