// source: devtools/jetski/boq/provisioning_service/proto/vmstorage_config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$devtools_jetski_provisioning$MutableVmstorageConfig');
goog.provide('jspb$ro.devtools_jetski_provisioning$ReadonlyVmstorageConfig');

goog.require('jspb$devtools_jetski_provisioning$MutableMountedDirectory');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$devtools_jetski_provisioning$ImmutableVmstorageConfig');
goog.requireType('jspb$r$devtools_jetski_provisioning$VmstorageConfig$internalDoNotUseReader');
goog.requireType('jspb$ro.devtools_jetski_provisioning$ReadonlyMountedDirectory');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$devtools_jetski_provisioning$ImmutableVmstorageConfig>}
 * @implements {jspb$r$devtools_jetski_provisioning$VmstorageConfig$internalDoNotUseReader}
 */
jspb$devtools_jetski_provisioning$MutableVmstorageConfig = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional string coordinator_address = 1;
   * @override
   * @return {string}
   */
  getCoordinatorAddress() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 1);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableVmstorageConfig} returns this
   */
  setCoordinatorAddress(value) {
    return jspb_internal_adapters.setStringField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableVmstorageConfig} returns this
   */
  clearCoordinatorAddress() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasCoordinatorAddress() {
    return jspb_internal_adapters.hasStringField(this, 1);
  }


  /**
   * optional string coordinator_address = 1;
   * @override
   * @return {string|undefined}
   */
  getCoordinatorAddressOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 1);
  }


  /**
   * optional string volume_id = 2;
   * @override
   * @return {string}
   */
  getVolumeId() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 2);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableVmstorageConfig} returns this
   */
  setVolumeId(value) {
    return jspb_internal_adapters.setStringField(this, 2, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableVmstorageConfig} returns this
   */
  clearVolumeId() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasVolumeId() {
    return jspb_internal_adapters.hasStringField(this, 2);
  }


  /**
   * optional string volume_id = 2;
   * @override
   * @return {string|undefined}
   */
  getVolumeIdOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 2);
  }


  /**
   * optional bool insecure = 3;
   * @override
   * @return {boolean}
   */
  getInsecure() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 3);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableVmstorageConfig} returns this
   */
  setInsecure(value) {
    return jspb_internal_adapters.setBooleanField(this, 3, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableVmstorageConfig} returns this
   */
  clearInsecure() {
    return jspb_internal_adapters.clearField(this, 3);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasInsecure() {
    return jspb_internal_adapters.hasBooleanField(this, 3);
  }


  /**
   * optional bool insecure = 3;
   * @override
   * @return {boolean|undefined}
   */
  getInsecureOrUndefined() {
    return jspb_internal_adapters.getBooleanFieldOrUndefined(this, 3);
  }


  /**
   * optional string gemini_dir = 4;
   * @override
   * @return {string}
   */
  getGeminiDir() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 4);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableVmstorageConfig} returns this
   */
  setGeminiDir(value) {
    return jspb_internal_adapters.setStringField(this, 4, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableVmstorageConfig} returns this
   */
  clearGeminiDir() {
    return jspb_internal_adapters.clearField(this, 4);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasGeminiDir() {
    return jspb_internal_adapters.hasStringField(this, 4);
  }


  /**
   * optional string gemini_dir = 4;
   * @override
   * @return {string|undefined}
   */
  getGeminiDirOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 4);
  }


  /**
   * optional string app_data_dir = 5;
   * @override
   * @return {string}
   */
  getAppDataDir() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 5);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableVmstorageConfig} returns this
   */
  setAppDataDir(value) {
    return jspb_internal_adapters.setStringField(this, 5, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableVmstorageConfig} returns this
   */
  clearAppDataDir() {
    return jspb_internal_adapters.clearField(this, 5);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasAppDataDir() {
    return jspb_internal_adapters.hasStringField(this, 5);
  }


  /**
   * optional string app_data_dir = 5;
   * @override
   * @return {string|undefined}
   */
  getAppDataDirOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 5);
  }


  /**
   * repeated MountedDirectory mounts = 6;
   * @param {!jspb_internal_public_for_gencode.DoNotFreezeToken=} freezeOptOut
   * @tsType (freezeOptOut: import('google3/javascript/apps/jspb/internal_public').DoNotFreezeToken): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableMountedDirectory[]
   * @tsType (): readonly ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableMountedDirectory[]
   * @override
   * @return {!ReadonlyArray<!jspb$devtools_jetski_provisioning$MutableMountedDirectory>}
   */
  getMountsList(freezeOptOut) {
    return jspb_internal_adapters.getRepeatedWrapperField(this, jspb$devtools_jetski_provisioning$MutableMountedDirectory, 6, jspb_internal_adapters.getRepeatedFieldReturnType(freezeOptOut));
  }


  /**
   * repeated MountedDirectory mounts = 6;
   * @override
   * @return {!ReadonlyArray<!jspb$ro.devtools_jetski_provisioning$ReadonlyMountedDirectory>}
   */
  getReadonlyMountsList() {
    return jspb_internal_adapters.getReadonlyRepeatedWrapperField(this, jspb$devtools_jetski_provisioning$MutableMountedDirectory, 6);
  }


  /**
   * @param {!ReadonlyArray<!jspb$ro.devtools_jetski_provisioning$ReadonlyMountedDirectory>|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableVmstorageConfig} returns this
   */
  setMountsList(value) {
    return jspb_internal_adapters.setRepeatedWrapperField(this, jspb$devtools_jetski_provisioning$MutableMountedDirectory, 6, value);
  }


  /**
   * Gets mutable repeated field reference.
   * @param {number} index
   * @return {!jspb$devtools_jetski_provisioning$MutableMountedDirectory}
   */
  getMutableMounts(index) {
    return jspb_internal_adapters.getRepeatedIndexedMutableWrapper(this, 6, jspb$devtools_jetski_provisioning$MutableMountedDirectory, index);
  }


  /**
   * Gets readonly repeated field reference.
   * @override
   * @param {number} index
   * @return {!jspb$ro.devtools_jetski_provisioning$ReadonlyMountedDirectory}
   */
  getReadonlyMounts(index) {
    return jspb_internal_adapters.getRepeatedIndexedReadonlyWrapper(this, 6, jspb$devtools_jetski_provisioning$MutableMountedDirectory, index);
  }


  /**
   * Adds repeated field and returns `this`.
   * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyMountedDirectory} value
   * @param {number=} index
   * @return {!jspb$devtools_jetski_provisioning$MutableVmstorageConfig} returns this
   */
  addMounts(value, index) {
    return jspb_internal_adapters.addToRepeatedWrapperField(this, 6, jspb$devtools_jetski_provisioning$MutableMountedDirectory, value, index);
  }


  /**
   * Adds repeated field and returns newly added submessage.
   * @param {!jspb$devtools_jetski_provisioning$MutableMountedDirectory=} value
   * @param {number=} index
   * @return {!jspb$devtools_jetski_provisioning$MutableMountedDirectory} the value that was added
   */
  addAndReturnMounts(value, index) {
    return jspb_internal_adapters.addAndReturnRepeatedWrapperField(this, 6, jspb$devtools_jetski_provisioning$MutableMountedDirectory, value, index);
  }


  /**
   * Adds multiple values to a repeated field and returns `this`.
   * @param {!Iterable<!jspb$ro.devtools_jetski_provisioning$ReadonlyMountedDirectory>} values
   * @return {!jspb$devtools_jetski_provisioning$MutableVmstorageConfig} returns this
   */
  addAllMounts(values) {
    return jspb_internal_adapters.addAllToRepeatedWrapperField(this, 6, jspb$devtools_jetski_provisioning$MutableMountedDirectory, values);
  }


  /**
   * Sets repeated field value at `index` and returns `this`.
   * @param {number} index
   * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyMountedDirectory} value
   * @return {!jspb$devtools_jetski_provisioning$MutableVmstorageConfig} returns this
   */
  setMounts(index, value) {
    return jspb_internal_adapters.setRepeatedIndexedWrapper(this, 6, jspb$devtools_jetski_provisioning$MutableMountedDirectory, index, value);
  }


  /**
   * Removes a value from a repeated field and returns `this`.
   * @param {number=} index defaults to the end
   * @return {!jspb$devtools_jetski_provisioning$MutableVmstorageConfig} returns this
   */
  removeMounts(index) {
    return jspb_internal_adapters.removeFromRepeatedWrapperField(this, 6, jspb$devtools_jetski_provisioning$MutableMountedDirectory, index);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableVmstorageConfig} returns this
   */
  clearMountsList() {
    return jspb_internal_adapters.clearField(this, 6);
  }


  /**
   * Returns the size of this field.
   * @override
   * @return {number}
   */
  getMountsCount() {
    return jspb_internal_adapters.getRepeatedWrapperCount(this, jspb$devtools_jetski_provisioning$MutableMountedDirectory, 6);
  }


};

/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$ImmutableVmstorageConfig}
 */
jspb$devtools_jetski_provisioning$MutableVmstorageConfig.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$MutableVmstorageConfig}
 */
jspb$devtools_jetski_provisioning$MutableVmstorageConfig.prototype.clone;
/**
 * @const {function(string):!jspb$devtools_jetski_provisioning$MutableVmstorageConfig}
 */
jspb$devtools_jetski_provisioning$MutableVmstorageConfig.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$devtools_jetski_provisioning$MutableVmstorageConfig));

/**
 * Returns whether the given value is an instance of jspb$devtools_jetski_provisioning$MutableVmstorageConfig.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$devtools_jetski_provisioning$MutableVmstorageConfig>}
 */
jspb$devtools_jetski_provisioning$MutableVmstorageConfig.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$devtools_jetski_provisioning$MutableVmstorageConfig));

/**
 * Object form of VmstorageConfig as accepted by the `fromObject` method.
 * @typedef {{
 *  coordinatorAddress: (?string|undefined),
 *  volumeId: (?string|undefined),
 *  insecure: (?boolean|undefined),
 *  geminiDir: (?string|undefined),
 *  appDataDir: (?string|undefined),
 *  mountsList: (?Array<!jspb$devtools_jetski_provisioning$MutableMountedDirectory.ObjectFormat>|undefined)
 * }}
 */
jspb$devtools_jetski_provisioning$MutableVmstorageConfig.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$devtools_jetski_provisioning$MutableVmstorageConfig.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$devtools_jetski_provisioning$MutableVmstorageConfig.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$devtools_jetski_provisioning$MutableVmstorageConfig.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for devtools_jetski_provisioning$MutableVmstorageConfig.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$devtools_jetski_provisioning$MutableVmstorageConfig.internalDoNotUse_debugOnlyProtoTypeName = "devtools_jetski_provisioning.VmstorageConfig";
}

/**
 * @typedef {!jspb$devtools_jetski_provisioning$ImmutableVmstorageConfig|!jspb$devtools_jetski_provisioning$MutableVmstorageConfig}
 */
jspb$ro.devtools_jetski_provisioning$ReadonlyVmstorageConfig = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'devtools_jetski_provisioning.VmstorageConfig'}
   */
  jspb$devtools_jetski_provisioning$MutableVmstorageConfig.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$devtools_jetski_provisioning$MutableVmstorageConfig.displayName = 'proto.devtools_jetski_provisioning.VmstorageConfig';
}
/**
 * Interface form of VmstorageConfig as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  coordinatorAddress: (string|undefined),
 *  volumeId: (string|undefined),
 *  insecure: (boolean|undefined),
 *  geminiDir: (string|undefined),
 *  appDataDir: (string|undefined),
 *  mountsList: (!ReadonlyArray<!jspb$ro.devtools_jetski_provisioning$ReadonlyMountedDirectory>|undefined)
 * }}
 */
jspb$devtools_jetski_provisioning$MutableVmstorageConfig.FieldsInterface;

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
 * @param {!jspb$devtools_jetski_provisioning$MutableVmstorageConfig.FieldsInterface} record
 * @return {!jspb$devtools_jetski_provisioning$ImmutableVmstorageConfig}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableVmstorageConfig, ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableVmstorageConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$ImmutableVmstorageConfig
 */
jspb$devtools_jetski_provisioning$MutableVmstorageConfig.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$devtools_jetski_provisioning$MutableVmstorageConfig));

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
 * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyVmstorageConfig} value
 * @return {!jspb$devtools_jetski_provisioning$MutableVmstorageConfig.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.devtools_jetski_provisioning$ReadonlyVmstorageConfig): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableVmstorageConfig, ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableVmstorageConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$devtools_jetski_provisioning$MutableVmstorageConfig.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$exa$config_pb$MutableConversationGroupConfig;
Object.defineProperty(this, 'jspb$exa$config_pb$MutableConversationGroupConfig', {
  get() { return jspb$exa$config_pb$MutableConversationGroupConfig; },
  set(v) { jspb$exa$config_pb$MutableConversationGroupConfig = v; },
