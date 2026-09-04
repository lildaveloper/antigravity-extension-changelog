// source: third_party/jetski/project_pb/project.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$exa$project_pb$MutableProject');
goog.provide('jspb$ro.exa$project_pb$ReadonlyProject');

goog.require('jspb$exa$project_pb$MutableEnvironments');
goog.require('jspb$exa$project_pb$MutablePermissionGrants');
goog.require('jspb$exa$project_pb$MutableProjectConversations');
goog.require('jspb$exa$project_pb$MutableProjectSettings');
goog.require('jspb$exa$project_pb$MutableResources');
goog.require('jspb$google$protobuf$MutableTimestamp');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$exa$project_pb$ImmutableProject');
goog.requireType('jspb$r$exa$project_pb$Project$internalDoNotUseReader');
goog.requireType('jspb$ro.exa$project_pb$ReadonlyEnvironments');
goog.requireType('jspb$ro.exa$project_pb$ReadonlyPermissionGrants');
goog.requireType('jspb$ro.exa$project_pb$ReadonlyProjectConversations');
goog.requireType('jspb$ro.exa$project_pb$ReadonlyProjectSettings');
goog.requireType('jspb$ro.exa$project_pb$ReadonlyResources');
goog.requireType('jspb$ro.google$protobuf$ReadonlyTimestamp');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$exa$project_pb$ImmutableProject>}
 * @implements {jspb$r$exa$project_pb$Project$internalDoNotUseReader}
 */
jspb$exa$project_pb$MutableProject = class extends jspb_internal_public_for_gencode.GeneratedMessage {
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
   * @return {!jspb$exa$project_pb$MutableProject} returns this
   */
  setId(value) {
    return jspb_internal_adapters.setProto3StringField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$project_pb$MutableProject} returns this
   */
  clearId() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * optional string name = 2;
   * @override
   * @return {string}
   */
  getName() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 2);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$exa$project_pb$MutableProject} returns this
   */
  setName(value) {
    return jspb_internal_adapters.setProto3StringField(this, 2, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$project_pb$MutableProject} returns this
   */
  clearName() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * optional ProjectConversations project_conversations = 8;
   * @override
   * @return {!jspb$exa$project_pb$MutableProjectConversations|undefined}
   * @deprecated
   */
  getProjectConversations() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$exa$project_pb$MutableProjectConversations, 8);
  }


  /**
   * optional ProjectConversations project_conversations = 8;
   * @override
   * @return {!jspb$ro.exa$project_pb$ReadonlyProjectConversations}
   * @deprecated
   */
  getReadonlyProjectConversations() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$exa$project_pb$MutableProjectConversations, 8);
  }


  /**
   * optional ProjectConversations project_conversations = 8;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$exa$project_pb$MutableProjectConversations|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$exa$project_pb$MutableProjectConversations') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$exa$project_pb$MutableProjectConversations|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$exa$project_pb$MutableProjectConversations
   * @deprecated
   */
  getMutableProjectConversations(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$exa$project_pb$MutableProjectConversations, 8, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.exa$project_pb$ReadonlyProjectConversations|null|undefined} value
   * @return {!jspb$exa$project_pb$MutableProject} returns this
   * @deprecated
   */
  setProjectConversations(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$exa$project_pb$MutableProjectConversations, 8, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$project_pb$MutableProject} returns this
   * @deprecated
   */
  clearProjectConversations() {
    return jspb_internal_adapters.clearField(this, 8);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   * @deprecated
   */
  hasProjectConversations() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$exa$project_pb$MutableProjectConversations, 8);
  }


  /**
   * optional ProjectConversations project_conversations = 8;
   * @override
   * @return {!jspb$ro.exa$project_pb$ReadonlyProjectConversations|undefined}
   * @deprecated
   */
  getProjectConversationsOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$exa$project_pb$MutableProjectConversations, 8);
  }


  /**
   * optional Resources project_resources = 6;
   * @override
   * @return {!jspb$exa$project_pb$MutableResources|undefined}
   */
  getProjectResources() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$exa$project_pb$MutableResources, 6);
  }


  /**
   * optional Resources project_resources = 6;
   * @override
   * @return {!jspb$ro.exa$project_pb$ReadonlyResources}
   */
  getReadonlyProjectResources() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$exa$project_pb$MutableResources, 6);
  }


  /**
   * optional Resources project_resources = 6;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$exa$project_pb$MutableResources|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$exa$project_pb$MutableResources') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$exa$project_pb$MutableResources|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$exa$project_pb$MutableResources
   */
  getMutableProjectResources(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$exa$project_pb$MutableResources, 6, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.exa$project_pb$ReadonlyResources|null|undefined} value
   * @return {!jspb$exa$project_pb$MutableProject} returns this
   */
  setProjectResources(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$exa$project_pb$MutableResources, 6, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$project_pb$MutableProject} returns this
   */
  clearProjectResources() {
    return jspb_internal_adapters.clearField(this, 6);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasProjectResources() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$exa$project_pb$MutableResources, 6);
  }


  /**
   * optional Resources project_resources = 6;
   * @override
   * @return {!jspb$ro.exa$project_pb$ReadonlyResources|undefined}
   */
  getProjectResourcesOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$exa$project_pb$MutableResources, 6);
  }


  /**
   * optional Environments environments = 7;
   * @override
   * @return {!jspb$exa$project_pb$MutableEnvironments|undefined}
   */
  getEnvironments() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$exa$project_pb$MutableEnvironments, 7);
  }


  /**
   * optional Environments environments = 7;
   * @override
   * @return {!jspb$ro.exa$project_pb$ReadonlyEnvironments}
   */
  getReadonlyEnvironments() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$exa$project_pb$MutableEnvironments, 7);
  }


  /**
   * optional Environments environments = 7;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$exa$project_pb$MutableEnvironments|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$exa$project_pb$MutableEnvironments') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$exa$project_pb$MutableEnvironments|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$exa$project_pb$MutableEnvironments
   */
  getMutableEnvironments(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$exa$project_pb$MutableEnvironments, 7, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.exa$project_pb$ReadonlyEnvironments|null|undefined} value
   * @return {!jspb$exa$project_pb$MutableProject} returns this
   */
  setEnvironments(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$exa$project_pb$MutableEnvironments, 7, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$project_pb$MutableProject} returns this
   */
  clearEnvironments() {
    return jspb_internal_adapters.clearField(this, 7);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasEnvironments() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$exa$project_pb$MutableEnvironments, 7);
  }


  /**
   * optional Environments environments = 7;
   * @override
   * @return {!jspb$ro.exa$project_pb$ReadonlyEnvironments|undefined}
   */
  getEnvironmentsOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$exa$project_pb$MutableEnvironments, 7);
  }


  /**
   * optional PermissionGrants permission_grants = 9;
   * @override
   * @return {!jspb$exa$project_pb$MutablePermissionGrants|undefined}
   */
  getPermissionGrants() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$exa$project_pb$MutablePermissionGrants, 9);
  }


  /**
   * optional PermissionGrants permission_grants = 9;
   * @override
   * @return {!jspb$ro.exa$project_pb$ReadonlyPermissionGrants}
   */
  getReadonlyPermissionGrants() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$exa$project_pb$MutablePermissionGrants, 9);
  }


  /**
   * optional PermissionGrants permission_grants = 9;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$exa$project_pb$MutablePermissionGrants|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$exa$project_pb$MutablePermissionGrants') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$exa$project_pb$MutablePermissionGrants|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$exa$project_pb$MutablePermissionGrants
   */
  getMutablePermissionGrants(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$exa$project_pb$MutablePermissionGrants, 9, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.exa$project_pb$ReadonlyPermissionGrants|null|undefined} value
   * @return {!jspb$exa$project_pb$MutableProject} returns this
   */
  setPermissionGrants(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$exa$project_pb$MutablePermissionGrants, 9, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$project_pb$MutableProject} returns this
   */
  clearPermissionGrants() {
    return jspb_internal_adapters.clearField(this, 9);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasPermissionGrants() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$exa$project_pb$MutablePermissionGrants, 9);
  }


  /**
   * optional PermissionGrants permission_grants = 9;
   * @override
   * @return {!jspb$ro.exa$project_pb$ReadonlyPermissionGrants|undefined}
   */
  getPermissionGrantsOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$exa$project_pb$MutablePermissionGrants, 9);
  }


  /**
   * optional ProjectSettings settings = 10;
   * @override
   * @return {!jspb$exa$project_pb$MutableProjectSettings|undefined}
   */
  getSettings() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$exa$project_pb$MutableProjectSettings, 10);
  }


  /**
   * optional ProjectSettings settings = 10;
   * @override
   * @return {!jspb$ro.exa$project_pb$ReadonlyProjectSettings}
   */
  getReadonlySettings() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$exa$project_pb$MutableProjectSettings, 10);
  }


  /**
   * optional ProjectSettings settings = 10;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$exa$project_pb$MutableProjectSettings|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$exa$project_pb$MutableProjectSettings') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$exa$project_pb$MutableProjectSettings|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$exa$project_pb$MutableProjectSettings
   */
  getMutableSettings(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$exa$project_pb$MutableProjectSettings, 10, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.exa$project_pb$ReadonlyProjectSettings|null|undefined} value
   * @return {!jspb$exa$project_pb$MutableProject} returns this
   */
  setSettings(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$exa$project_pb$MutableProjectSettings, 10, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$project_pb$MutableProject} returns this
   */
  clearSettings() {
    return jspb_internal_adapters.clearField(this, 10);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasSettings() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$exa$project_pb$MutableProjectSettings, 10);
  }


  /**
   * optional ProjectSettings settings = 10;
   * @override
   * @return {!jspb$ro.exa$project_pb$ReadonlyProjectSettings|undefined}
   */
  getSettingsOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$exa$project_pb$MutableProjectSettings, 10);
  }


  /**
   * optional google.protobuf.Timestamp updated_at = 11;
   * @override
   * @return {!jspb$google$protobuf$MutableTimestamp|undefined}
   */
  getUpdatedAt() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$google$protobuf$MutableTimestamp, 11);
  }


  /**
   * optional google.protobuf.Timestamp updated_at = 11;
   * @override
   * @return {!jspb$ro.google$protobuf$ReadonlyTimestamp}
   */
  getReadonlyUpdatedAt() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$google$protobuf$MutableTimestamp, 11);
  }


  /**
   * optional google.protobuf.Timestamp updated_at = 11;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$google$protobuf$MutableTimestamp|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$google$protobuf$MutableTimestamp') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$google$protobuf$MutableTimestamp|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$google$protobuf$MutableTimestamp
   */
  getMutableUpdatedAt(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$google$protobuf$MutableTimestamp, 11, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.google$protobuf$ReadonlyTimestamp|null|undefined} value
   * @return {!jspb$exa$project_pb$MutableProject} returns this
   */
  setUpdatedAt(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$google$protobuf$MutableTimestamp, 11, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$project_pb$MutableProject} returns this
   */
  clearUpdatedAt() {
    return jspb_internal_adapters.clearField(this, 11);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasUpdatedAt() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$google$protobuf$MutableTimestamp, 11);
  }


  /**
   * optional google.protobuf.Timestamp updated_at = 11;
   * @override
   * @return {!jspb$ro.google$protobuf$ReadonlyTimestamp|undefined}
   */
  getUpdatedAtOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$google$protobuf$MutableTimestamp, 11);
  }


  /**
   * optional bool is_workspace_only = 12;
   * @override
   * @return {boolean}
   */
  getIsWorkspaceOnly() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 12);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$exa$project_pb$MutableProject} returns this
   */
  setIsWorkspaceOnly(value) {
    return jspb_internal_adapters.setBooleanField(this, 12, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$project_pb$MutableProject} returns this
   */
  clearIsWorkspaceOnly() {
    return jspb_internal_adapters.clearField(this, 12);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasIsWorkspaceOnly() {
    return jspb_internal_adapters.hasBooleanField(this, 12);
  }


  /**
   * optional bool is_workspace_only = 12;
   * @override
   * @return {boolean|undefined}
   */
  getIsWorkspaceOnlyOrUndefined() {
    return jspb_internal_adapters.getBooleanFieldOrUndefined(this, 12);
  }


  /**
   * optional bool archived = 13;
   * @override
   * @return {boolean}
   */
  getArchived() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 13);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$exa$project_pb$MutableProject} returns this
   */
  setArchived(value) {
    return jspb_internal_adapters.setBooleanField(this, 13, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$project_pb$MutableProject} returns this
   */
  clearArchived() {
    return jspb_internal_adapters.clearField(this, 13);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasArchived() {
    return jspb_internal_adapters.hasBooleanField(this, 13);
  }


  /**
   * optional bool archived = 13;
   * @override
   * @return {boolean|undefined}
   */
  getArchivedOrUndefined() {
    return jspb_internal_adapters.getBooleanFieldOrUndefined(this, 13);
  }


};

/**
 * @override
 * @return {!jspb$exa$project_pb$ImmutableProject}
 */
jspb$exa$project_pb$MutableProject.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$exa$project_pb$MutableProject}
 */
jspb$exa$project_pb$MutableProject.prototype.clone;
/**
 * @const {function(string):!jspb$exa$project_pb$MutableProject}
 */
jspb$exa$project_pb$MutableProject.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$exa$project_pb$MutableProject));

/**
 * Returns whether the given value is an instance of jspb$exa$project_pb$MutableProject.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$exa$project_pb$MutableProject>}
 */
jspb$exa$project_pb$MutableProject.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$exa$project_pb$MutableProject));

/**
 * Object form of Project as accepted by the `fromObject` method.
 * @typedef {{
 *  id: (?string|undefined),
 *  name: (?string|undefined),
 *  projectConversations: (?jspb$exa$project_pb$MutableProjectConversations.ObjectFormat|undefined),
 *  projectResources: (?jspb$exa$project_pb$MutableResources.ObjectFormat|undefined),
 *  environments: (?jspb$exa$project_pb$MutableEnvironments.ObjectFormat|undefined),
 *  permissionGrants: (?jspb$exa$project_pb$MutablePermissionGrants.ObjectFormat|undefined),
 *  settings: (?jspb$exa$project_pb$MutableProjectSettings.ObjectFormat|undefined),
 *  updatedAt: (?jspb$google$protobuf$MutableTimestamp.ObjectFormat|undefined),
 *  isWorkspaceOnly: (?boolean|undefined),
 *  archived: (?boolean|undefined)
 * }}
 */
jspb$exa$project_pb$MutableProject.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$exa$project_pb$MutableProject.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$exa$project_pb$MutableProject.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$exa$project_pb$MutableProject.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for exa$project_pb$MutableProject.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$exa$project_pb$MutableProject.internalDoNotUse_debugOnlyProtoTypeName = "exa.project_pb.Project";
}

/**
 * @typedef {!jspb$exa$project_pb$ImmutableProject|!jspb$exa$project_pb$MutableProject}
 */
jspb$ro.exa$project_pb$ReadonlyProject = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'exa.project_pb.Project'}
   */
  jspb$exa$project_pb$MutableProject.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$exa$project_pb$MutableProject.displayName = 'proto.exa.project_pb.Project';
}
/**
 * Interface form of Project as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  id: (string|undefined),
 *  name: (string|undefined),
 *  projectConversations: (!jspb$ro.exa$project_pb$ReadonlyProjectConversations|undefined),
 *  projectResources: (!jspb$ro.exa$project_pb$ReadonlyResources|undefined),
 *  environments: (!jspb$ro.exa$project_pb$ReadonlyEnvironments|undefined),
 *  permissionGrants: (!jspb$ro.exa$project_pb$ReadonlyPermissionGrants|undefined),
 *  settings: (!jspb$ro.exa$project_pb$ReadonlyProjectSettings|undefined),
 *  updatedAt: (!jspb$ro.google$protobuf$ReadonlyTimestamp|undefined),
 *  isWorkspaceOnly: (boolean|undefined),
 *  archived: (boolean|undefined)
 * }}
 */
jspb$exa$project_pb$MutableProject.FieldsInterface;

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
 * @param {!jspb$exa$project_pb$MutableProject.FieldsInterface} record
 * @return {!jspb$exa$project_pb$ImmutableProject}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$exa$project_pb$MutableProject, ಠ_ಠ.clutz.jspb$exa$project_pb$MutableProject.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$exa$project_pb$ImmutableProject
 */
jspb$exa$project_pb$MutableProject.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$exa$project_pb$MutableProject));

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
 * @param {!jspb$ro.exa$project_pb$ReadonlyProject} value
 * @return {!jspb$exa$project_pb$MutableProject.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.exa$project_pb$ReadonlyProject): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$exa$project_pb$MutableProject, ಠ_ಠ.clutz.jspb$exa$project_pb$MutableProject.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$exa$project_pb$MutableProject.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$devtools_jetski_provisioning$MutableDeploymentConfig;
Object.defineProperty(this, 'jspb$devtools_jetski_provisioning$MutableDeploymentConfig', {
  get() { return jspb$devtools_jetski_provisioning$MutableDeploymentConfig; },
  set(v) { jspb$devtools_jetski_provisioning$MutableDeploymentConfig = v; },
