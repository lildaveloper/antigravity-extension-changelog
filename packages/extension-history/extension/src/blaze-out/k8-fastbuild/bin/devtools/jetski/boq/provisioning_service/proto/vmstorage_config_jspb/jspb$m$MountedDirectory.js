// source: devtools/jetski/boq/provisioning_service/proto/vmstorage_config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$devtools_jetski_provisioning$MutableMountedDirectory');
goog.provide('jspb$ro.devtools_jetski_provisioning$ReadonlyMountedDirectory');

goog.require('jspb$devtools_jetski_provisioning$MutableVolumeClientConfig');
goog.require('jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$devtools_jetski_provisioning$ImmutableMountedDirectory');
goog.requireType('jspb$e.devtools_jetski_provisioning$MountedDirectory$SourceCase');
goog.requireType('jspb$r$devtools_jetski_provisioning$MountedDirectory$internalDoNotUseReader');
goog.requireType('jspb$ro.devtools_jetski_provisioning$ReadonlyVolumeClientConfig');
goog.requireType('jspb$ro.devtools_jetski_provisioning$ReadonlyVolumeCreationConfig');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$devtools_jetski_provisioning$ImmutableMountedDirectory>}
 * @implements {jspb$r$devtools_jetski_provisioning$MountedDirectory$internalDoNotUseReader}
 */
jspb$devtools_jetski_provisioning$MutableMountedDirectory = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * @override
   * @return {!jspb$e.devtools_jetski_provisioning$MountedDirectory$SourceCase}
   */
  getSourceCase() {
    return /** @type {!jspb$e.devtools_jetski_provisioning$MountedDirectory$SourceCase} */(jspb_internal_adapters.computeOneofCase(this, jspb$devtools_jetski_provisioning$MutableMountedDirectory.oneofGroup_source_));
  }


  /**
   * @return {!jspb$devtools_jetski_provisioning$MutableMountedDirectory}
   */
  clearSource() {
    return jspb_internal_adapters.clearAllFieldsInOneof(this, jspb$devtools_jetski_provisioning$MutableMountedDirectory.oneofGroup_source_);
  }


  /**
   * optional string mount_point = 1;
   * @override
   * @return {string}
   */
  getMountPoint() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 1);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableMountedDirectory} returns this
   */
  setMountPoint(value) {
    return jspb_internal_adapters.setStringField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableMountedDirectory} returns this
   */
  clearMountPoint() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasMountPoint() {
    return jspb_internal_adapters.hasStringField(this, 1);
  }


  /**
   * optional string mount_point = 1;
   * @override
   * @return {string|undefined}
   */
  getMountPointOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 1);
  }


  /**
   * optional string host_path = 2;
   * @override
   * @return {string}
   */
  getHostPath() {
    return jspb_internal_adapters.getOneofStringFieldWithDefault(this, 2, jspb$devtools_jetski_provisioning$MutableMountedDirectory.oneofGroup_source_);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableMountedDirectory} returns this
   */
  setHostPath(value) {
    return jspb_internal_adapters.setOneofStringField(this, 2, jspb$devtools_jetski_provisioning$MutableMountedDirectory.oneofGroup_source_, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableMountedDirectory} returns this
   */
  clearHostPath() {
    return jspb_internal_adapters.clearOneofField(this, 2, jspb$devtools_jetski_provisioning$MutableMountedDirectory.oneofGroup_source_);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasHostPath() {
    return jspb_internal_adapters.hasOneofStringField(this, 2, jspb$devtools_jetski_provisioning$MutableMountedDirectory.oneofGroup_source_);
  }


  /**
   * optional string host_path = 2;
   * @override
   * @return {string|undefined}
   */
  getHostPathOrUndefined() {
    return jspb_internal_adapters.getOneofStringFieldOrUndefined(this, 2, jspb$devtools_jetski_provisioning$MutableMountedDirectory.oneofGroup_source_);
  }


  /**
   * optional VolumeCreationConfig volume_creation_config = 6;
   * @override
   * @return {!jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig|undefined}
   */
  getVolumeCreationConfig() {
    return jspb_internal_adapters.getOneofWrapperFieldOrUndefined(this, jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig, 6, jspb$devtools_jetski_provisioning$MutableMountedDirectory.oneofGroup_source_);
  }


  /**
   * optional VolumeCreationConfig volume_creation_config = 6;
   * @override
   * @return {!jspb$ro.devtools_jetski_provisioning$ReadonlyVolumeCreationConfig}
   */
  getReadonlyVolumeCreationConfig() {
    return jspb_internal_adapters.getReadonlyOneofWrapperField(this, jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig, 6, jspb$devtools_jetski_provisioning$MutableMountedDirectory.oneofGroup_source_);
  }


  /**
   * optional VolumeCreationConfig volume_creation_config = 6;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig
   */
  getMutableVolumeCreationConfig(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableOneofWrapperField(this, jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig, 6, jspb$devtools_jetski_provisioning$MutableMountedDirectory.oneofGroup_source_, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyVolumeCreationConfig|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableMountedDirectory} returns this
   */
  setVolumeCreationConfig(value) {
    return jspb_internal_adapters.setOneofWrapperField(this, jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig, 6, jspb$devtools_jetski_provisioning$MutableMountedDirectory.oneofGroup_source_, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableMountedDirectory} returns this
   */
  clearVolumeCreationConfig() {
    return jspb_internal_adapters.clearOneofField(this, 6, jspb$devtools_jetski_provisioning$MutableMountedDirectory.oneofGroup_source_);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasVolumeCreationConfig() {
    return jspb_internal_adapters.hasOneofWrapperField(this, jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig, 6, jspb$devtools_jetski_provisioning$MutableMountedDirectory.oneofGroup_source_);
  }


  /**
   * optional VolumeCreationConfig volume_creation_config = 6;
   * @override
   * @return {!jspb$ro.devtools_jetski_provisioning$ReadonlyVolumeCreationConfig|undefined}
   */
  getVolumeCreationConfigOrUndefined() {
    return jspb_internal_adapters.getReadonlyOneofWrapperFieldOrUndefined(this, jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig, 6, jspb$devtools_jetski_provisioning$MutableMountedDirectory.oneofGroup_source_);
  }


  /**
   * optional VolumeClientConfig client_config = 5;
   * @override
   * @return {!jspb$devtools_jetski_provisioning$MutableVolumeClientConfig|undefined}
   */
  getClientConfig() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$devtools_jetski_provisioning$MutableVolumeClientConfig, 5);
  }


  /**
   * optional VolumeClientConfig client_config = 5;
   * @override
   * @return {!jspb$ro.devtools_jetski_provisioning$ReadonlyVolumeClientConfig}
   */
  getReadonlyClientConfig() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$devtools_jetski_provisioning$MutableVolumeClientConfig, 5);
  }


  /**
   * optional VolumeClientConfig client_config = 5;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$devtools_jetski_provisioning$MutableVolumeClientConfig|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$devtools_jetski_provisioning$MutableVolumeClientConfig') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableVolumeClientConfig|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableVolumeClientConfig
   */
  getMutableClientConfig(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$devtools_jetski_provisioning$MutableVolumeClientConfig, 5, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyVolumeClientConfig|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableMountedDirectory} returns this
   */
  setClientConfig(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$devtools_jetski_provisioning$MutableVolumeClientConfig, 5, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableMountedDirectory} returns this
   */
  clearClientConfig() {
    return jspb_internal_adapters.clearField(this, 5);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasClientConfig() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$devtools_jetski_provisioning$MutableVolumeClientConfig, 5);
  }


  /**
   * optional VolumeClientConfig client_config = 5;
   * @override
   * @return {!jspb$ro.devtools_jetski_provisioning$ReadonlyVolumeClientConfig|undefined}
   */
  getClientConfigOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$devtools_jetski_provisioning$MutableVolumeClientConfig, 5);
  }


  /**
   * optional bool read_only = 3;
   * @override
   * @return {boolean}
   */
  getReadOnly() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 3);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableMountedDirectory} returns this
   */
  setReadOnly(value) {
    return jspb_internal_adapters.setBooleanField(this, 3, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableMountedDirectory} returns this
   */
  clearReadOnly() {
    return jspb_internal_adapters.clearField(this, 3);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasReadOnly() {
    return jspb_internal_adapters.hasBooleanField(this, 3);
  }


  /**
   * optional bool read_only = 3;
   * @override
   * @return {boolean|undefined}
   */
  getReadOnlyOrUndefined() {
    return jspb_internal_adapters.getBooleanFieldOrUndefined(this, 3);
  }


  /**
   * optional bool mount_at_root = 4;
   * @override
   * @return {boolean}
   */
  getMountAtRoot() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 4);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableMountedDirectory} returns this
   */
  setMountAtRoot(value) {
    return jspb_internal_adapters.setBooleanField(this, 4, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableMountedDirectory} returns this
   */
  clearMountAtRoot() {
    return jspb_internal_adapters.clearField(this, 4);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasMountAtRoot() {
    return jspb_internal_adapters.hasBooleanField(this, 4);
  }


  /**
   * optional bool mount_at_root = 4;
   * @override
   * @return {boolean|undefined}
   */
  getMountAtRootOrUndefined() {
    return jspb_internal_adapters.getBooleanFieldOrUndefined(this, 4);
  }


};

/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$ImmutableMountedDirectory}
 */
jspb$devtools_jetski_provisioning$MutableMountedDirectory.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$MutableMountedDirectory}
 */
jspb$devtools_jetski_provisioning$MutableMountedDirectory.prototype.clone;
/**
 * @const {function(string):!jspb$devtools_jetski_provisioning$MutableMountedDirectory}
 */
jspb$devtools_jetski_provisioning$MutableMountedDirectory.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$devtools_jetski_provisioning$MutableMountedDirectory));

/**
 * Returns whether the given value is an instance of jspb$devtools_jetski_provisioning$MutableMountedDirectory.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$devtools_jetski_provisioning$MutableMountedDirectory>}
 */
jspb$devtools_jetski_provisioning$MutableMountedDirectory.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$devtools_jetski_provisioning$MutableMountedDirectory));

/**
 * Object form of MountedDirectory as accepted by the `fromObject` method.
 * @typedef {{
 *  mountPoint: (?string|undefined),
 *  hostPath: (?string|undefined),
 *  volumeCreationConfig: (?jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig.ObjectFormat|undefined),
 *  clientConfig: (?jspb$devtools_jetski_provisioning$MutableVolumeClientConfig.ObjectFormat|undefined),
 *  readOnly: (?boolean|undefined),
 *  mountAtRoot: (?boolean|undefined)
 * }}
 */
jspb$devtools_jetski_provisioning$MutableMountedDirectory.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$devtools_jetski_provisioning$MutableMountedDirectory.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$devtools_jetski_provisioning$MutableMountedDirectory.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$devtools_jetski_provisioning$MutableMountedDirectory.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for devtools_jetski_provisioning$MutableMountedDirectory.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$devtools_jetski_provisioning$MutableMountedDirectory.internalDoNotUse_debugOnlyProtoTypeName = "devtools_jetski_provisioning.MountedDirectory";
}

/**
 * @typedef {!jspb$devtools_jetski_provisioning$ImmutableMountedDirectory|!jspb$devtools_jetski_provisioning$MutableMountedDirectory}
 */
jspb$ro.devtools_jetski_provisioning$ReadonlyMountedDirectory = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'devtools_jetski_provisioning.MountedDirectory'}
   */
  jspb$devtools_jetski_provisioning$MutableMountedDirectory.prototype.internalDoNotUse_annotations;
}
/**
 * Oneof group definition.
 * @private {!ReadonlyArray<number>}
 * @const
 * @nodts
 */
jspb$devtools_jetski_provisioning$MutableMountedDirectory.oneofGroup_source_ = [2,6];

if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$devtools_jetski_provisioning$MutableMountedDirectory.displayName = 'proto.devtools_jetski_provisioning.MountedDirectory';
}
/**
 * Interface form of MountedDirectory as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  mountPoint: (string|undefined),
 *  hostPath: (string|undefined),
 *  volumeCreationConfig: (!jspb$ro.devtools_jetski_provisioning$ReadonlyVolumeCreationConfig|undefined),
 *  clientConfig: (!jspb$ro.devtools_jetski_provisioning$ReadonlyVolumeClientConfig|undefined),
 *  readOnly: (boolean|undefined),
 *  mountAtRoot: (boolean|undefined)
 * }}
 */
jspb$devtools_jetski_provisioning$MutableMountedDirectory.FieldsInterface;

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
 * @param {!jspb$devtools_jetski_provisioning$MutableMountedDirectory.FieldsInterface} record
 * @return {!jspb$devtools_jetski_provisioning$ImmutableMountedDirectory}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableMountedDirectory, ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableMountedDirectory.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$ImmutableMountedDirectory
 */
jspb$devtools_jetski_provisioning$MutableMountedDirectory.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$devtools_jetski_provisioning$MutableMountedDirectory));

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
 * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyMountedDirectory} value
 * @return {!jspb$devtools_jetski_provisioning$MutableMountedDirectory.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.devtools_jetski_provisioning$ReadonlyMountedDirectory): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableMountedDirectory, ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableMountedDirectory.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$devtools_jetski_provisioning$MutableMountedDirectory.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$devtools_jetski_provisioning$MutableVmstorageConfig;
Object.defineProperty(this, 'jspb$devtools_jetski_provisioning$MutableVmstorageConfig', {
  get() { return jspb$devtools_jetski_provisioning$MutableVmstorageConfig; },
  set(v) { jspb$devtools_jetski_provisioning$MutableVmstorageConfig = v; },
