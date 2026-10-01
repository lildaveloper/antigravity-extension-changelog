// source: third_party/jetski/cortex_pb/cortex.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$exa$cortex_pb$MutableSidecarUserConfig');
goog.provide('jspb$ro.exa$cortex_pb$ReadonlySidecarUserConfig');

goog.require('jspb$exa$cortex_pb$MutableSidecarAgentPermissions');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$e.exa$cortex_pb$SidecarUserConfig$ProjectScopeCase');
goog.requireType('jspb$exa$cortex_pb$ImmutableSidecarUserConfig');
goog.requireType('jspb$r$exa$cortex_pb$SidecarUserConfig$internalDoNotUseReader');
goog.requireType('jspb$ro.exa$cortex_pb$ReadonlySidecarAgentPermissions');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$exa$cortex_pb$ImmutableSidecarUserConfig>}
 * @implements {jspb$r$exa$cortex_pb$SidecarUserConfig$internalDoNotUseReader}
 */
jspb$exa$cortex_pb$MutableSidecarUserConfig = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * @override
   * @return {!jspb$e.exa$cortex_pb$SidecarUserConfig$ProjectScopeCase}
   */
  getProjectScopeCase() {
    return /** @type {!jspb$e.exa$cortex_pb$SidecarUserConfig$ProjectScopeCase} */(jspb_internal_adapters.computeOneofCase(this, jspb$exa$cortex_pb$MutableSidecarUserConfig.oneofGroup_project_scope_));
  }


  /**
   * @return {!jspb$exa$cortex_pb$MutableSidecarUserConfig}
   */
  clearProjectScope() {
    return jspb_internal_adapters.clearAllFieldsInOneof(this, jspb$exa$cortex_pb$MutableSidecarUserConfig.oneofGroup_project_scope_);
  }


  /**
   * optional bool enabled = 1;
   * @override
   * @return {boolean}
   */
  getEnabled() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 1);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$exa$cortex_pb$MutableSidecarUserConfig} returns this
   */
  setEnabled(value) {
    return jspb_internal_adapters.setBooleanField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$cortex_pb$MutableSidecarUserConfig} returns this
   */
  clearEnabled() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasEnabled() {
    return jspb_internal_adapters.hasBooleanField(this, 1);
  }


  /**
   * optional bool enabled = 1;
   * @override
   * @return {boolean|undefined}
   */
  getEnabledOrUndefined() {
    return jspb_internal_adapters.getBooleanFieldOrUndefined(this, 1);
  }


  /**
   * optional string project_id = 2;
   * @override
   * @return {string}
   */
  getProjectId() {
    return jspb_internal_adapters.getOneofStringFieldWithDefault(this, 2, jspb$exa$cortex_pb$MutableSidecarUserConfig.oneofGroup_project_scope_);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$exa$cortex_pb$MutableSidecarUserConfig} returns this
   */
  setProjectId(value) {
    return jspb_internal_adapters.setOneofStringField(this, 2, jspb$exa$cortex_pb$MutableSidecarUserConfig.oneofGroup_project_scope_, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$cortex_pb$MutableSidecarUserConfig} returns this
   */
  clearProjectId() {
    return jspb_internal_adapters.clearOneofField(this, 2, jspb$exa$cortex_pb$MutableSidecarUserConfig.oneofGroup_project_scope_);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasProjectId() {
    return jspb_internal_adapters.hasOneofStringField(this, 2, jspb$exa$cortex_pb$MutableSidecarUserConfig.oneofGroup_project_scope_);
  }


  /**
   * optional string project_id = 2;
   * @override
   * @return {string|undefined}
   */
  getProjectIdOrUndefined() {
    return jspb_internal_adapters.getOneofStringFieldOrUndefined(this, 2, jspb$exa$cortex_pb$MutableSidecarUserConfig.oneofGroup_project_scope_);
  }


  /**
   * optional bool all_projects = 3;
   * @override
   * @return {boolean}
   * @deprecated
   */
  getAllProjects() {
    return jspb_internal_adapters.getOneofBooleanFieldWithDefault(this, 3, jspb$exa$cortex_pb$MutableSidecarUserConfig.oneofGroup_project_scope_);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$exa$cortex_pb$MutableSidecarUserConfig} returns this
   * @deprecated
   */
  setAllProjects(value) {
    return jspb_internal_adapters.setOneofBooleanField(this, 3, jspb$exa$cortex_pb$MutableSidecarUserConfig.oneofGroup_project_scope_, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$cortex_pb$MutableSidecarUserConfig} returns this
   * @deprecated
   */
  clearAllProjects() {
    return jspb_internal_adapters.clearOneofField(this, 3, jspb$exa$cortex_pb$MutableSidecarUserConfig.oneofGroup_project_scope_);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   * @deprecated
   */
  hasAllProjects() {
    return jspb_internal_adapters.hasOneofBooleanField(this, 3, jspb$exa$cortex_pb$MutableSidecarUserConfig.oneofGroup_project_scope_);
  }


  /**
   * optional bool all_projects = 3;
   * @override
   * @return {boolean|undefined}
   * @deprecated
   */
  getAllProjectsOrUndefined() {
    return jspb_internal_adapters.getOneofBooleanFieldOrUndefined(this, 3, jspb$exa$cortex_pb$MutableSidecarUserConfig.oneofGroup_project_scope_);
  }


  /**
   * map<string, string> argument_values = 4;
   * @override
   * @return {!Map<string,string>}
   */
  getArgumentValuesMap() {
    return jspb_internal_adapters.getStringStringMapField(this, 4);}



  /**
   * @param {string} key The key of value to set or replace.
   * @param {string} value The new value.
   * @return {!jspb$exa$cortex_pb$MutableSidecarUserConfig} returns this
   */
  putArgumentValues(key, value) {
    return jspb_internal_adapters.putStringStringMapField(this, 4, key, value);
  }


  /**
   * @param {!ReadonlyMap<string,string>} value The new values.
   * @return {!jspb$exa$cortex_pb$MutableSidecarUserConfig} returns this
   */
  putAllArgumentValues(value) {
    return jspb_internal_adapters.putAllStringStringMapField(this, 4, value);
  }


  /**
   * @param {!ReadonlyMap<string,string>|undefined} value The new values.
   * @return {!jspb$exa$cortex_pb$MutableSidecarUserConfig} returns this
   */
  setArgumentValuesMap(value) {
    return jspb_internal_adapters.setStringStringMapField(this, 4, value);
  }


  /**
   * @param {string} key The key of value to remove.
   * @return {!jspb$exa$cortex_pb$MutableSidecarUserConfig} returns this
   */
  deleteArgumentValues(key) {
    return jspb_internal_adapters.deleteStringStringMapField(this, 4, key);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$cortex_pb$MutableSidecarUserConfig} returns this
   */
  clearArgumentValuesMap() {
    return jspb_internal_adapters.clearMapField(this, 4);
  }


  /**
   * optional int32 schema_version = 6;
   * @override
   * @return {number}
   */
  getSchemaVersion() {
    return jspb_internal_adapters.getInt32FieldWithDefault(this, 6);
  }


  /**
   * @param {number|null|undefined} value
   * @return {!jspb$exa$cortex_pb$MutableSidecarUserConfig} returns this
   */
  setSchemaVersion(value) {
    return jspb_internal_adapters.setProto3Int32Field(this, 6, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$cortex_pb$MutableSidecarUserConfig} returns this
   */
  clearSchemaVersion() {
    return jspb_internal_adapters.clearField(this, 6);
  }


  /**
   * optional SidecarAgentPermissions resolved_permissions = 5;
   * @override
   * @return {!jspb$exa$cortex_pb$MutableSidecarAgentPermissions|undefined}
   */
  getResolvedPermissions() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$exa$cortex_pb$MutableSidecarAgentPermissions, 5);
  }


  /**
   * optional SidecarAgentPermissions resolved_permissions = 5;
   * @override
   * @return {!jspb$ro.exa$cortex_pb$ReadonlySidecarAgentPermissions}
   */
  getReadonlyResolvedPermissions() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$exa$cortex_pb$MutableSidecarAgentPermissions, 5);
  }


  /**
   * optional SidecarAgentPermissions resolved_permissions = 5;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$exa$cortex_pb$MutableSidecarAgentPermissions|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$exa$cortex_pb$MutableSidecarAgentPermissions') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$exa$cortex_pb$MutableSidecarAgentPermissions|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$exa$cortex_pb$MutableSidecarAgentPermissions
   */
  getMutableResolvedPermissions(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$exa$cortex_pb$MutableSidecarAgentPermissions, 5, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.exa$cortex_pb$ReadonlySidecarAgentPermissions|null|undefined} value
   * @return {!jspb$exa$cortex_pb$MutableSidecarUserConfig} returns this
   */
  setResolvedPermissions(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$exa$cortex_pb$MutableSidecarAgentPermissions, 5, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$cortex_pb$MutableSidecarUserConfig} returns this
   */
  clearResolvedPermissions() {
    return jspb_internal_adapters.clearField(this, 5);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasResolvedPermissions() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$exa$cortex_pb$MutableSidecarAgentPermissions, 5);
  }


  /**
   * optional SidecarAgentPermissions resolved_permissions = 5;
   * @override
   * @return {!jspb$ro.exa$cortex_pb$ReadonlySidecarAgentPermissions|undefined}
   */
  getResolvedPermissionsOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$exa$cortex_pb$MutableSidecarAgentPermissions, 5);
  }


};

/**
 * @override
 * @return {!jspb$exa$cortex_pb$ImmutableSidecarUserConfig}
 */
jspb$exa$cortex_pb$MutableSidecarUserConfig.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$exa$cortex_pb$MutableSidecarUserConfig}
 */
jspb$exa$cortex_pb$MutableSidecarUserConfig.prototype.clone;
/**
 * @const {function(string):!jspb$exa$cortex_pb$MutableSidecarUserConfig}
 */
jspb$exa$cortex_pb$MutableSidecarUserConfig.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$exa$cortex_pb$MutableSidecarUserConfig));

/**
 * Returns whether the given value is an instance of jspb$exa$cortex_pb$MutableSidecarUserConfig.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$exa$cortex_pb$MutableSidecarUserConfig>}
 */
jspb$exa$cortex_pb$MutableSidecarUserConfig.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$exa$cortex_pb$MutableSidecarUserConfig));

/**
 * Object form of SidecarUserConfig as accepted by the `fromObject` method.
 * @typedef {{
 *  enabled: (?boolean|undefined),
 *  projectId: (?string|undefined),
 *  allProjects: (?boolean|undefined),
 *  argumentValuesMap: (?Array<!Array<string>>|undefined),
 *  schemaVersion: (?number|undefined),
 *  resolvedPermissions: (?jspb$exa$cortex_pb$MutableSidecarAgentPermissions.ObjectFormat|undefined)
 * }}
 */
jspb$exa$cortex_pb$MutableSidecarUserConfig.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$exa$cortex_pb$MutableSidecarUserConfig.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$exa$cortex_pb$MutableSidecarUserConfig.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$exa$cortex_pb$MutableSidecarUserConfig.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for exa$cortex_pb$MutableSidecarUserConfig.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$exa$cortex_pb$MutableSidecarUserConfig.internalDoNotUse_debugOnlyProtoTypeName = "exa.cortex_pb.SidecarUserConfig";
}

/**
 * @typedef {!jspb$exa$cortex_pb$ImmutableSidecarUserConfig|!jspb$exa$cortex_pb$MutableSidecarUserConfig}
 */
jspb$ro.exa$cortex_pb$ReadonlySidecarUserConfig = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'exa.cortex_pb.SidecarUserConfig'}
   */
  jspb$exa$cortex_pb$MutableSidecarUserConfig.prototype.internalDoNotUse_annotations;
}
/**
 * Oneof group definition.
 * @private {!ReadonlyArray<number>}
 * @const
 * @nodts
 */
jspb$exa$cortex_pb$MutableSidecarUserConfig.oneofGroup_project_scope_ = [2,3];

if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$exa$cortex_pb$MutableSidecarUserConfig.displayName = 'proto.exa.cortex_pb.SidecarUserConfig';
}
/**
 * Interface form of SidecarUserConfig as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  enabled: (boolean|undefined),
 *  projectId: (string|undefined),
 *  allProjects: (boolean|undefined),
 *  argumentValuesMap: (!ReadonlyMap<string,string>|undefined),
 *  schemaVersion: (number|undefined),
 *  resolvedPermissions: (!jspb$ro.exa$cortex_pb$ReadonlySidecarAgentPermissions|undefined)
 * }}
 */
jspb$exa$cortex_pb$MutableSidecarUserConfig.FieldsInterface;

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
 * @param {!jspb$exa$cortex_pb$MutableSidecarUserConfig.FieldsInterface} record
 * @return {!jspb$exa$cortex_pb$ImmutableSidecarUserConfig}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$exa$cortex_pb$MutableSidecarUserConfig, ಠ_ಠ.clutz.jspb$exa$cortex_pb$MutableSidecarUserConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$exa$cortex_pb$ImmutableSidecarUserConfig
 */
jspb$exa$cortex_pb$MutableSidecarUserConfig.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$exa$cortex_pb$MutableSidecarUserConfig));

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
 * @param {!jspb$ro.exa$cortex_pb$ReadonlySidecarUserConfig} value
 * @return {!jspb$exa$cortex_pb$MutableSidecarUserConfig.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.exa$cortex_pb$ReadonlySidecarUserConfig): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$exa$cortex_pb$MutableSidecarUserConfig, ಠ_ಠ.clutz.jspb$exa$cortex_pb$MutableSidecarUserConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$exa$cortex_pb$MutableSidecarUserConfig.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig;
Object.defineProperty(this, 'jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig', {
  get() { return jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig; },
  set(v) { jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig = v; },
