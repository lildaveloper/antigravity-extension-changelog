// source: third_party/jetski/project_pb/project.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$exa$project_pb$MutableProjectSettings');
goog.provide('jspb$ro.exa$project_pb$ReadonlyProjectSettings');

goog.require('jspb$exa$project_pb$MutableSecurityPluginSettings');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$e.exa$codeium_common_pb$AgentPermissionPreset');
goog.requireType('jspb$e.exa$codeium_common_pb$AgentSettingPolicy');
goog.requireType('jspb$e.exa$codeium_common_pb$ArtifactReviewMode');
goog.requireType('jspb$e.exa$codeium_common_pb$CascadeCommandsAutoExecution');
goog.requireType('jspb$exa$project_pb$ImmutableProjectSettings');
goog.requireType('jspb$exa$project_pb$ImmutableSecurityPluginSettings');
goog.requireType('jspb$r$exa$project_pb$ProjectSettings$internalDoNotUseReader');
goog.requireType('jspb$ro.exa$project_pb$ReadonlySecurityPluginSettings');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$exa$project_pb$ImmutableProjectSettings>}
 * @implements {jspb$r$exa$project_pb$ProjectSettings$internalDoNotUseReader}
 */
jspb$exa$project_pb$MutableProjectSettings = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional exa.codeium_common_pb.AgentSettingPolicy file_access_policy = 1;
   * @override
   * @return {!jspb$e.exa$codeium_common_pb$AgentSettingPolicy}
   */
  getFileAccessPolicy() {
    return /** @type {!jspb$e.exa$codeium_common_pb$AgentSettingPolicy} */ (jspb_internal_adapters.getEnumFieldWithDefault(this, 1));
  }


  /**
   * @param {!jspb$e.exa$codeium_common_pb$AgentSettingPolicy|null|undefined} value
   * @return {!jspb$exa$project_pb$MutableProjectSettings} returns this
   */
  setFileAccessPolicy(value) {
    return jspb_internal_adapters.setProto3EnumField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$project_pb$MutableProjectSettings} returns this
   */
  clearFileAccessPolicy() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * optional exa.codeium_common_pb.AgentSettingPolicy internet_policy = 2;
   * @override
   * @return {!jspb$e.exa$codeium_common_pb$AgentSettingPolicy}
   */
  getInternetPolicy() {
    return /** @type {!jspb$e.exa$codeium_common_pb$AgentSettingPolicy} */ (jspb_internal_adapters.getEnumFieldWithDefault(this, 2));
  }


  /**
   * @param {!jspb$e.exa$codeium_common_pb$AgentSettingPolicy|null|undefined} value
   * @return {!jspb$exa$project_pb$MutableProjectSettings} returns this
   */
  setInternetPolicy(value) {
    return jspb_internal_adapters.setProto3EnumField(this, 2, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$project_pb$MutableProjectSettings} returns this
   */
  clearInternetPolicy() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * optional bool sandbox_mode = 3;
   * @override
   * @return {boolean}
   */
  getSandboxMode() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 3);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$exa$project_pb$MutableProjectSettings} returns this
   */
  setSandboxMode(value) {
    return jspb_internal_adapters.setBooleanField(this, 3, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$project_pb$MutableProjectSettings} returns this
   */
  clearSandboxMode() {
    return jspb_internal_adapters.clearField(this, 3);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasSandboxMode() {
    return jspb_internal_adapters.hasBooleanField(this, 3);
  }


  /**
   * optional bool sandbox_mode = 3;
   * @override
   * @return {boolean|undefined}
   */
  getSandboxModeOrUndefined() {
    return jspb_internal_adapters.getBooleanFieldOrUndefined(this, 3);
  }


  /**
   * optional exa.codeium_common_pb.CascadeCommandsAutoExecution auto_execution_policy = 4;
   * @override
   * @return {!jspb$e.exa$codeium_common_pb$CascadeCommandsAutoExecution}
   */
  getAutoExecutionPolicy() {
    return /** @type {!jspb$e.exa$codeium_common_pb$CascadeCommandsAutoExecution} */ (jspb_internal_adapters.getEnumFieldWithDefault(this, 4));
  }


  /**
   * @param {!jspb$e.exa$codeium_common_pb$CascadeCommandsAutoExecution|null|undefined} value
   * @return {!jspb$exa$project_pb$MutableProjectSettings} returns this
   */
  setAutoExecutionPolicy(value) {
    return jspb_internal_adapters.setProto3EnumField(this, 4, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$project_pb$MutableProjectSettings} returns this
   */
  clearAutoExecutionPolicy() {
    return jspb_internal_adapters.clearField(this, 4);
  }


  /**
   * optional exa.codeium_common_pb.ArtifactReviewMode artifact_review_mode = 5;
   * @override
   * @return {!jspb$e.exa$codeium_common_pb$ArtifactReviewMode}
   */
  getArtifactReviewMode() {
    return /** @type {!jspb$e.exa$codeium_common_pb$ArtifactReviewMode} */ (jspb_internal_adapters.getEnumFieldWithDefault(this, 5));
  }


  /**
   * @param {!jspb$e.exa$codeium_common_pb$ArtifactReviewMode|null|undefined} value
   * @return {!jspb$exa$project_pb$MutableProjectSettings} returns this
   */
  setArtifactReviewMode(value) {
    return jspb_internal_adapters.setProto3EnumField(this, 5, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$project_pb$MutableProjectSettings} returns this
   */
  clearArtifactReviewMode() {
    return jspb_internal_adapters.clearField(this, 5);
  }


  /**
   * optional bool enable_permissioned_github = 6;
   * @override
   * @return {boolean}
   * @deprecated
   */
  getEnablePermissionedGithub() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 6);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$exa$project_pb$MutableProjectSettings} returns this
   * @deprecated
   */
  setEnablePermissionedGithub(value) {
    return jspb_internal_adapters.setProto3BooleanField(this, 6, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$project_pb$MutableProjectSettings} returns this
   * @deprecated
   */
  clearEnablePermissionedGithub() {
    return jspb_internal_adapters.clearField(this, 6);
  }


  /**
   * optional string shell_setup_script = 7;
   * @override
   * @return {string}
   */
  getShellSetupScript() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 7);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$exa$project_pb$MutableProjectSettings} returns this
   */
  setShellSetupScript(value) {
    return jspb_internal_adapters.setProto3StringField(this, 7, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$project_pb$MutableProjectSettings} returns this
   */
  clearShellSetupScript() {
    return jspb_internal_adapters.clearField(this, 7);
  }


  /**
   * optional exa.codeium_common_pb.AgentPermissionPreset permission_preset = 8;
   * @override
   * @return {!jspb$e.exa$codeium_common_pb$AgentPermissionPreset}
   */
  getPermissionPreset() {
    return /** @type {!jspb$e.exa$codeium_common_pb$AgentPermissionPreset} */ (jspb_internal_adapters.getEnumFieldWithDefault(this, 8));
  }


  /**
   * @param {!jspb$e.exa$codeium_common_pb$AgentPermissionPreset|null|undefined} value
   * @return {!jspb$exa$project_pb$MutableProjectSettings} returns this
   */
  setPermissionPreset(value) {
    return jspb_internal_adapters.setProto3EnumField(this, 8, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$project_pb$MutableProjectSettings} returns this
   */
  clearPermissionPreset() {
    return jspb_internal_adapters.clearField(this, 8);
  }


  /**
   * map<string, SecurityPluginSettings> security_plugins = 9;
   * @override
   * @return {!Map<string,!jspb$exa$project_pb$MutableSecurityPluginSettings>}
   */
  getSecurityPluginsMap() {
    return jspb_internal_adapters.getStringWrapperMapField(this, 9,
        jspb$exa$project_pb$MutableSecurityPluginSettings);}



  /**
   * map<string, SecurityPluginSettings> security_plugins = 9;
   * @override
   * @return {!Map<string,!jspb$ro.exa$project_pb$ReadonlySecurityPluginSettings>}
   */
  getReadonlySecurityPluginsMap() {
    return jspb_internal_adapters.getReadonlyStringWrapperMapField(this, 9,
        jspb$exa$project_pb$MutableSecurityPluginSettings);}



  /**
   * @param {string} key The key of value to set or replace.
   * @param {!jspb$ro.exa$project_pb$ReadonlySecurityPluginSettings} value The new value.
   * @return {!jspb$exa$project_pb$MutableProjectSettings} returns this
   */
  putSecurityPlugins(key, value) {
    return jspb_internal_adapters.putStringWrapperMapField(this, 9, key, value, jspb$exa$project_pb$MutableSecurityPluginSettings);
  }


  /**
   * @param {!ReadonlyMap<string,!jspb$ro.exa$project_pb$ReadonlySecurityPluginSettings>} value The new values.
   * @return {!jspb$exa$project_pb$MutableProjectSettings} returns this
   */
  putAllSecurityPlugins(value) {
    return jspb_internal_adapters.putAllStringWrapperMapField(this, 9, value, jspb$exa$project_pb$MutableSecurityPluginSettings);
  }


  /**
   * @param {!ReadonlyMap<string,!jspb$ro.exa$project_pb$ReadonlySecurityPluginSettings>|undefined} value The new values.
   * @return {!jspb$exa$project_pb$MutableProjectSettings} returns this
   */
  setSecurityPluginsMap(value) {
    return jspb_internal_adapters.setStringWrapperMapField(this, 9, value, jspb$exa$project_pb$MutableSecurityPluginSettings);
  }


  /**
   * @param {string} key The key of value to remove.
   * @return {!jspb$exa$project_pb$MutableProjectSettings} returns this
   */
  deleteSecurityPlugins(key) {
    return jspb_internal_adapters.deleteStringWrapperMapField(this, 9, key, jspb$exa$project_pb$MutableSecurityPluginSettings);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$project_pb$MutableProjectSettings} returns this
   */
  clearSecurityPluginsMap() {
    return jspb_internal_adapters.clearMapField(this, 9);
  }


};

/**
 * @override
 * @return {!jspb$exa$project_pb$ImmutableProjectSettings}
 */
jspb$exa$project_pb$MutableProjectSettings.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$exa$project_pb$MutableProjectSettings}
 */
jspb$exa$project_pb$MutableProjectSettings.prototype.clone;
/**
 * @const {function(string):!jspb$exa$project_pb$MutableProjectSettings}
 */
jspb$exa$project_pb$MutableProjectSettings.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$exa$project_pb$MutableProjectSettings));

/**
 * Returns whether the given value is an instance of jspb$exa$project_pb$MutableProjectSettings.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$exa$project_pb$MutableProjectSettings>}
 */
jspb$exa$project_pb$MutableProjectSettings.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$exa$project_pb$MutableProjectSettings));

/**
 * Object form of ProjectSettings as accepted by the `fromObject` method.
 * @typedef {{
 *  fileAccessPolicy: (?number|undefined),
 *  internetPolicy: (?number|undefined),
 *  sandboxMode: (?boolean|undefined),
 *  autoExecutionPolicy: (?number|undefined),
 *  artifactReviewMode: (?number|undefined),
 *  enablePermissionedGithub: (?boolean|undefined),
 *  shellSetupScript: (?string|undefined),
 *  permissionPreset: (?number|undefined),
 *  securityPluginsMap: (?Array<!Array<!jspb$exa$project_pb$MutableSecurityPluginSettings.ObjectFormat|string>>|undefined)
 * }}
 */
jspb$exa$project_pb$MutableProjectSettings.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$exa$project_pb$MutableProjectSettings.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$exa$project_pb$MutableProjectSettings.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$exa$project_pb$MutableProjectSettings.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for exa$project_pb$MutableProjectSettings.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$exa$project_pb$MutableProjectSettings.internalDoNotUse_debugOnlyProtoTypeName = "exa.project_pb.ProjectSettings";
}

/**
 * @typedef {!jspb$exa$project_pb$ImmutableProjectSettings|!jspb$exa$project_pb$MutableProjectSettings}
 */
jspb$ro.exa$project_pb$ReadonlyProjectSettings = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'exa.project_pb.ProjectSettings'}
   */
  jspb$exa$project_pb$MutableProjectSettings.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$exa$project_pb$MutableProjectSettings.displayName = 'proto.exa.project_pb.ProjectSettings';
}
/**
 * Interface form of ProjectSettings as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  fileAccessPolicy: (!jspb$e.exa$codeium_common_pb$AgentSettingPolicy|undefined),
 *  internetPolicy: (!jspb$e.exa$codeium_common_pb$AgentSettingPolicy|undefined),
 *  sandboxMode: (boolean|undefined),
 *  autoExecutionPolicy: (!jspb$e.exa$codeium_common_pb$CascadeCommandsAutoExecution|undefined),
 *  artifactReviewMode: (!jspb$e.exa$codeium_common_pb$ArtifactReviewMode|undefined),
 *  enablePermissionedGithub: (boolean|undefined),
 *  shellSetupScript: (string|undefined),
 *  permissionPreset: (!jspb$e.exa$codeium_common_pb$AgentPermissionPreset|undefined),
 *  securityPluginsMap: (!ReadonlyMap<string,!jspb$ro.exa$project_pb$ReadonlySecurityPluginSettings>|!ReadonlyMap<string,!jspb$exa$project_pb$ImmutableSecurityPluginSettings>|undefined)
 * }}
 */
jspb$exa$project_pb$MutableProjectSettings.FieldsInterface;

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
 * @param {!jspb$exa$project_pb$MutableProjectSettings.FieldsInterface} record
 * @return {!jspb$exa$project_pb$ImmutableProjectSettings}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$exa$project_pb$MutableProjectSettings, ಠ_ಠ.clutz.jspb$exa$project_pb$MutableProjectSettings.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$exa$project_pb$ImmutableProjectSettings
 */
jspb$exa$project_pb$MutableProjectSettings.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$exa$project_pb$MutableProjectSettings));

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
 * @param {!jspb$ro.exa$project_pb$ReadonlyProjectSettings} value
 * @return {!jspb$exa$project_pb$MutableProjectSettings.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.exa$project_pb$ReadonlyProjectSettings): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$exa$project_pb$MutableProjectSettings, ಠ_ಠ.clutz.jspb$exa$project_pb$MutableProjectSettings.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$exa$project_pb$MutableProjectSettings.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$exa$project_pb$MutableProject;
Object.defineProperty(this, 'jspb$exa$project_pb$MutableProject', {
  get() { return jspb$exa$project_pb$MutableProject; },
  set(v) { jspb$exa$project_pb$MutableProject = v; },
