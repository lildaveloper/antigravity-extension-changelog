// source: third_party/jetski/jetbox_state_pb/jetbox_state.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$jetbox_state_pb$MutableJetboxAppState');
goog.provide('jspb$ro.jetbox_state_pb$ReadonlyJetboxAppState');

goog.require('jspb$jetbox_state_pb$MutableCustomModelsConfig');
goog.require('jspb$jetbox_state_pb$MutableGoogleSpecificSettings');
goog.require('jspb$jetbox_state_pb$MutablePostOnboardingState');
goog.require('jspb$jetbox_state_pb$MutableSeenNuxUids');
goog.require('jspb$jetbox_state_pb$MutableSidebarWorkspaceInfo');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$e.exa$codeium_common_pb$Model');
goog.requireType('jspb$e.jetbox_state_pb$AgentEnvironment');
goog.requireType('jspb$e.jetbox_state_pb$AgentOnboardingState');
goog.requireType('jspb$e.jetbox_state_pb$MigrationStatus');
goog.requireType('jspb$e.jetbox_state_pb$RetroactiveMigrationStatus');
goog.requireType('jspb$jetbox_state_pb$ImmutableJetboxAppState');
goog.requireType('jspb$jetbox_state_pb$ImmutableSidebarWorkspaceInfo');
goog.requireType('jspb$r$jetbox_state_pb$JetboxAppState$internalDoNotUseReader');
goog.requireType('jspb$ro.jetbox_state_pb$ReadonlyCustomModelsConfig');
goog.requireType('jspb$ro.jetbox_state_pb$ReadonlyGoogleSpecificSettings');
goog.requireType('jspb$ro.jetbox_state_pb$ReadonlyPostOnboardingState');
goog.requireType('jspb$ro.jetbox_state_pb$ReadonlySeenNuxUids');
goog.requireType('jspb$ro.jetbox_state_pb$ReadonlySidebarWorkspaceInfo');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$jetbox_state_pb$ImmutableJetboxAppState>}
 * @implements {jspb$r$jetbox_state_pb$JetboxAppState$internalDoNotUseReader}
 */
jspb$jetbox_state_pb$MutableJetboxAppState = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional PostOnboardingState post_onboarding = 1;
   * @override
   * @return {!jspb$jetbox_state_pb$MutablePostOnboardingState|undefined}
   */
  getPostOnboarding() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$jetbox_state_pb$MutablePostOnboardingState, 1);
  }


  /**
   * optional PostOnboardingState post_onboarding = 1;
   * @override
   * @return {!jspb$ro.jetbox_state_pb$ReadonlyPostOnboardingState}
   */
  getReadonlyPostOnboarding() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$jetbox_state_pb$MutablePostOnboardingState, 1);
  }


  /**
   * optional PostOnboardingState post_onboarding = 1;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$jetbox_state_pb$MutablePostOnboardingState|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$jetbox_state_pb$MutablePostOnboardingState') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutablePostOnboardingState|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutablePostOnboardingState
   */
  getMutablePostOnboarding(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$jetbox_state_pb$MutablePostOnboardingState, 1, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.jetbox_state_pb$ReadonlyPostOnboardingState|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableJetboxAppState} returns this
   */
  setPostOnboarding(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$jetbox_state_pb$MutablePostOnboardingState, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableJetboxAppState} returns this
   */
  clearPostOnboarding() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasPostOnboarding() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$jetbox_state_pb$MutablePostOnboardingState, 1);
  }


  /**
   * optional PostOnboardingState post_onboarding = 1;
   * @override
   * @return {!jspb$ro.jetbox_state_pb$ReadonlyPostOnboardingState|undefined}
   */
  getPostOnboardingOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$jetbox_state_pb$MutablePostOnboardingState, 1);
  }


  /**
   * optional SeenNuxUids seen_nuxs = 2;
   * @override
   * @return {!jspb$jetbox_state_pb$MutableSeenNuxUids|undefined}
   */
  getSeenNuxs() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$jetbox_state_pb$MutableSeenNuxUids, 2);
  }


  /**
   * optional SeenNuxUids seen_nuxs = 2;
   * @override
   * @return {!jspb$ro.jetbox_state_pb$ReadonlySeenNuxUids}
   */
  getReadonlySeenNuxs() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$jetbox_state_pb$MutableSeenNuxUids, 2);
  }


  /**
   * optional SeenNuxUids seen_nuxs = 2;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$jetbox_state_pb$MutableSeenNuxUids|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$jetbox_state_pb$MutableSeenNuxUids') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableSeenNuxUids|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableSeenNuxUids
   */
  getMutableSeenNuxs(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$jetbox_state_pb$MutableSeenNuxUids, 2, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.jetbox_state_pb$ReadonlySeenNuxUids|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableJetboxAppState} returns this
   */
  setSeenNuxs(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$jetbox_state_pb$MutableSeenNuxUids, 2, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableJetboxAppState} returns this
   */
  clearSeenNuxs() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasSeenNuxs() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$jetbox_state_pb$MutableSeenNuxUids, 2);
  }


  /**
   * optional SeenNuxUids seen_nuxs = 2;
   * @override
   * @return {!jspb$ro.jetbox_state_pb$ReadonlySeenNuxUids|undefined}
   */
  getSeenNuxsOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$jetbox_state_pb$MutableSeenNuxUids, 2);
  }


  /**
   * optional bool sidebar_workspaces_migrated = 3;
   * @override
   * @return {boolean}
   */
  getSidebarWorkspacesMigrated() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 3);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableJetboxAppState} returns this
   */
  setSidebarWorkspacesMigrated(value) {
    return jspb_internal_adapters.setProto3BooleanField(this, 3, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableJetboxAppState} returns this
   */
  clearSidebarWorkspacesMigrated() {
    return jspb_internal_adapters.clearField(this, 3);
  }


  /**
   * optional GoogleSpecificSettings google_settings = 4;
   * @override
   * @return {!jspb$jetbox_state_pb$MutableGoogleSpecificSettings|undefined}
   */
  getGoogleSettings() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$jetbox_state_pb$MutableGoogleSpecificSettings, 4);
  }


  /**
   * optional GoogleSpecificSettings google_settings = 4;
   * @override
   * @return {!jspb$ro.jetbox_state_pb$ReadonlyGoogleSpecificSettings}
   */
  getReadonlyGoogleSettings() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$jetbox_state_pb$MutableGoogleSpecificSettings, 4);
  }


  /**
   * optional GoogleSpecificSettings google_settings = 4;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$jetbox_state_pb$MutableGoogleSpecificSettings|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$jetbox_state_pb$MutableGoogleSpecificSettings') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableGoogleSpecificSettings|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableGoogleSpecificSettings
   */
  getMutableGoogleSettings(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$jetbox_state_pb$MutableGoogleSpecificSettings, 4, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.jetbox_state_pb$ReadonlyGoogleSpecificSettings|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableJetboxAppState} returns this
   */
  setGoogleSettings(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$jetbox_state_pb$MutableGoogleSpecificSettings, 4, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableJetboxAppState} returns this
   */
  clearGoogleSettings() {
    return jspb_internal_adapters.clearField(this, 4);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasGoogleSettings() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$jetbox_state_pb$MutableGoogleSpecificSettings, 4);
  }


  /**
   * optional GoogleSpecificSettings google_settings = 4;
   * @override
   * @return {!jspb$ro.jetbox_state_pb$ReadonlyGoogleSpecificSettings|undefined}
   */
  getGoogleSettingsOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$jetbox_state_pb$MutableGoogleSpecificSettings, 4);
  }


  /**
   * optional AgentOnboardingState agent_onboarding_completed = 5;
   * @override
   * @return {!jspb$e.jetbox_state_pb$AgentOnboardingState}
   */
  getAgentOnboardingCompleted() {
    return /** @type {!jspb$e.jetbox_state_pb$AgentOnboardingState} */ (jspb_internal_adapters.getEnumFieldWithDefault(this, 5));
  }


  /**
   * @param {!jspb$e.jetbox_state_pb$AgentOnboardingState|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableJetboxAppState} returns this
   */
  setAgentOnboardingCompleted(value) {
    return jspb_internal_adapters.setProto3EnumField(this, 5, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableJetboxAppState} returns this
   */
  clearAgentOnboardingCompleted() {
    return jspb_internal_adapters.clearField(this, 5);
  }


  /**
   * map<string, SidebarWorkspaceInfo> sidebar_workspaces = 6;
   * @override
   * @return {!Map<string,!jspb$jetbox_state_pb$MutableSidebarWorkspaceInfo>}
   */
  getSidebarWorkspacesMap() {
    return jspb_internal_adapters.getStringWrapperMapField(this, 6,
        jspb$jetbox_state_pb$MutableSidebarWorkspaceInfo);}



  /**
   * map<string, SidebarWorkspaceInfo> sidebar_workspaces = 6;
   * @override
   * @return {!Map<string,!jspb$ro.jetbox_state_pb$ReadonlySidebarWorkspaceInfo>}
   */
  getReadonlySidebarWorkspacesMap() {
    return jspb_internal_adapters.getReadonlyStringWrapperMapField(this, 6,
        jspb$jetbox_state_pb$MutableSidebarWorkspaceInfo);}



  /**
   * @param {string} key The key of value to set or replace.
   * @param {!jspb$ro.jetbox_state_pb$ReadonlySidebarWorkspaceInfo} value The new value.
   * @return {!jspb$jetbox_state_pb$MutableJetboxAppState} returns this
   */
  putSidebarWorkspaces(key, value) {
    return jspb_internal_adapters.putStringWrapperMapField(this, 6, key, value, jspb$jetbox_state_pb$MutableSidebarWorkspaceInfo);
  }


  /**
   * @param {!ReadonlyMap<string,!jspb$ro.jetbox_state_pb$ReadonlySidebarWorkspaceInfo>} value The new values.
   * @return {!jspb$jetbox_state_pb$MutableJetboxAppState} returns this
   */
  putAllSidebarWorkspaces(value) {
    return jspb_internal_adapters.putAllStringWrapperMapField(this, 6, value, jspb$jetbox_state_pb$MutableSidebarWorkspaceInfo);
  }


  /**
   * @param {!ReadonlyMap<string,!jspb$ro.jetbox_state_pb$ReadonlySidebarWorkspaceInfo>|undefined} value The new values.
   * @return {!jspb$jetbox_state_pb$MutableJetboxAppState} returns this
   */
  setSidebarWorkspacesMap(value) {
    return jspb_internal_adapters.setStringWrapperMapField(this, 6, value, jspb$jetbox_state_pb$MutableSidebarWorkspaceInfo);
  }


  /**
   * @param {string} key The key of value to remove.
   * @return {!jspb$jetbox_state_pb$MutableJetboxAppState} returns this
   */
  deleteSidebarWorkspaces(key) {
    return jspb_internal_adapters.deleteStringWrapperMapField(this, 6, key, jspb$jetbox_state_pb$MutableSidebarWorkspaceInfo);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableJetboxAppState} returns this
   */
  clearSidebarWorkspacesMap() {
    return jspb_internal_adapters.clearMapField(this, 6);
  }


  /**
   * optional exa.codeium_common_pb.Model last_selected_agent_model = 10;
   * @override
   * @return {!jspb$e.exa$codeium_common_pb$Model}
   */
  getLastSelectedAgentModel() {
    return /** @type {!jspb$e.exa$codeium_common_pb$Model} */ (jspb_internal_adapters.getEnumFieldWithDefault(this, 10));
  }


  /**
   * @param {!jspb$e.exa$codeium_common_pb$Model|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableJetboxAppState} returns this
   */
  setLastSelectedAgentModel(value) {
    return jspb_internal_adapters.setProto3EnumField(this, 10, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableJetboxAppState} returns this
   */
  clearLastSelectedAgentModel() {
    return jspb_internal_adapters.clearField(this, 10);
  }


  /**
   * optional CustomModelsConfig custom_models_config = 11;
   * @override
   * @return {!jspb$jetbox_state_pb$MutableCustomModelsConfig|undefined}
   */
  getCustomModelsConfig() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$jetbox_state_pb$MutableCustomModelsConfig, 11);
  }


  /**
   * optional CustomModelsConfig custom_models_config = 11;
   * @override
   * @return {!jspb$ro.jetbox_state_pb$ReadonlyCustomModelsConfig}
   */
  getReadonlyCustomModelsConfig() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$jetbox_state_pb$MutableCustomModelsConfig, 11);
  }


  /**
   * optional CustomModelsConfig custom_models_config = 11;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$jetbox_state_pb$MutableCustomModelsConfig|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$jetbox_state_pb$MutableCustomModelsConfig') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableCustomModelsConfig|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableCustomModelsConfig
   */
  getMutableCustomModelsConfig(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$jetbox_state_pb$MutableCustomModelsConfig, 11, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.jetbox_state_pb$ReadonlyCustomModelsConfig|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableJetboxAppState} returns this
   */
  setCustomModelsConfig(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$jetbox_state_pb$MutableCustomModelsConfig, 11, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableJetboxAppState} returns this
   */
  clearCustomModelsConfig() {
    return jspb_internal_adapters.clearField(this, 11);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasCustomModelsConfig() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$jetbox_state_pb$MutableCustomModelsConfig, 11);
  }


  /**
   * optional CustomModelsConfig custom_models_config = 11;
   * @override
   * @return {!jspb$ro.jetbox_state_pb$ReadonlyCustomModelsConfig|undefined}
   */
  getCustomModelsConfigOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$jetbox_state_pb$MutableCustomModelsConfig, 11);
  }


  /**
   * optional AgentEnvironment agent_environment = 13;
   * @override
   * @return {!jspb$e.jetbox_state_pb$AgentEnvironment}
   */
  getAgentEnvironment() {
    return /** @type {!jspb$e.jetbox_state_pb$AgentEnvironment} */ (jspb_internal_adapters.getEnumFieldWithDefault(this, 13));
  }


  /**
   * @param {!jspb$e.jetbox_state_pb$AgentEnvironment|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableJetboxAppState} returns this
   */
  setAgentEnvironment(value) {
    return jspb_internal_adapters.setProto3EnumField(this, 13, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableJetboxAppState} returns this
   */
  clearAgentEnvironment() {
    return jspb_internal_adapters.clearField(this, 13);
  }


  /**
   * optional bool user_config_migrated = 14;
   * @override
   * @return {boolean}
   */
  getUserConfigMigrated() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 14);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableJetboxAppState} returns this
   */
  setUserConfigMigrated(value) {
    return jspb_internal_adapters.setBooleanField(this, 14, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableJetboxAppState} returns this
   */
  clearUserConfigMigrated() {
    return jspb_internal_adapters.clearField(this, 14);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasUserConfigMigrated() {
    return jspb_internal_adapters.hasBooleanField(this, 14);
  }


  /**
   * optional bool user_config_migrated = 14;
   * @override
   * @return {boolean|undefined}
   */
  getUserConfigMigratedOrUndefined() {
    return jspb_internal_adapters.getBooleanFieldOrUndefined(this, 14);
  }


  /**
   * optional MigrationStatus migrate_convos_into_projects = 16;
   * @override
   * @return {!jspb$e.jetbox_state_pb$MigrationStatus}
   */
  getMigrateConvosIntoProjects() {
    return /** @type {!jspb$e.jetbox_state_pb$MigrationStatus} */ (jspb_internal_adapters.getEnumFieldWithDefault(this, 16));
  }


  /**
   * @param {!jspb$e.jetbox_state_pb$MigrationStatus|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableJetboxAppState} returns this
   */
  setMigrateConvosIntoProjects(value) {
    return jspb_internal_adapters.setProto3EnumField(this, 16, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableJetboxAppState} returns this
   */
  clearMigrateConvosIntoProjects() {
    return jspb_internal_adapters.clearField(this, 16);
  }


  /**
   * optional string installation_uuid = 17;
   * @override
   * @return {string}
   */
  getInstallationUuid() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 17);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableJetboxAppState} returns this
   */
  setInstallationUuid(value) {
    return jspb_internal_adapters.setStringField(this, 17, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableJetboxAppState} returns this
   */
  clearInstallationUuid() {
    return jspb_internal_adapters.clearField(this, 17);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasInstallationUuid() {
    return jspb_internal_adapters.hasStringField(this, 17);
  }


  /**
   * optional string installation_uuid = 17;
   * @override
   * @return {string|undefined}
   */
  getInstallationUuidOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 17);
  }


  /**
   * optional MigrationStatus migrate_internal_projects = 18;
   * @override
   * @return {!jspb$e.jetbox_state_pb$MigrationStatus}
   */
  getMigrateInternalProjects() {
    return /** @type {!jspb$e.jetbox_state_pb$MigrationStatus} */ (jspb_internal_adapters.getEnumFieldWithDefault(this, 18));
  }


  /**
   * @param {!jspb$e.jetbox_state_pb$MigrationStatus|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableJetboxAppState} returns this
   */
  setMigrateInternalProjects(value) {
    return jspb_internal_adapters.setProto3EnumField(this, 18, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableJetboxAppState} returns this
   */
  clearMigrateInternalProjects() {
    return jspb_internal_adapters.clearField(this, 18);
  }


  /**
   * optional RetroactiveMigrationStatus migrate_retroactive_projects = 19;
   * @override
   * @return {!jspb$e.jetbox_state_pb$RetroactiveMigrationStatus}
   */
  getMigrateRetroactiveProjects() {
    return /** @type {!jspb$e.jetbox_state_pb$RetroactiveMigrationStatus} */ (jspb_internal_adapters.getEnumFieldWithDefault(this, 19));
  }


  /**
   * @param {!jspb$e.jetbox_state_pb$RetroactiveMigrationStatus|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableJetboxAppState} returns this
   */
  setMigrateRetroactiveProjects(value) {
    return jspb_internal_adapters.setProto3EnumField(this, 19, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableJetboxAppState} returns this
   */
  clearMigrateRetroactiveProjects() {
    return jspb_internal_adapters.clearField(this, 19);
  }


  /**
   * optional int64 opted_out_best_of_n_auto_trigger_at = 20;
   * @override
   * @return {!gbigint}
   */
  getOptedOutBestOfNAutoTriggerAt() {
    return jspb_internal_adapters.getInt64GbigintFieldWithDefault(this, 20);
  }


  /**
   * optional int64 opted_out_best_of_n_auto_trigger_at = 20;
   * @override
   * @return {number}
   * @deprecated unsafe int64 behavior: go/jspb-api-gotchas#int64
   */
  getOptedOutBestOfNAutoTriggerAt_asLegacyNumberOrString() {
    return jspb_internal_adapters.getInt64FieldWithDefault(this, 20);
  }


  /**
   * optional int64 opted_out_best_of_n_auto_trigger_at = 20;
   * @override
   * @return {string}
   */
  getOptedOutBestOfNAutoTriggerAt_asString() {
    return jspb_internal_adapters.getInt64FieldWithDefault_asString(this, 20);
  }


  /**
   * @param {number|string|!gbigint|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableJetboxAppState} returns this
   */
  setOptedOutBestOfNAutoTriggerAt(value) {
    return jspb_internal_adapters.setInt64Field(this, 20, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableJetboxAppState} returns this
   */
  clearOptedOutBestOfNAutoTriggerAt() {
    return jspb_internal_adapters.clearField(this, 20);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasOptedOutBestOfNAutoTriggerAt() {
    return jspb_internal_adapters.hasInt64Field(this, 20);
  }


  /**
   * optional int64 opted_out_best_of_n_auto_trigger_at = 20;
   * @override
   * @return {!gbigint|undefined}
   */
  getOptedOutBestOfNAutoTriggerAtOrUndefined() {
    return jspb_internal_adapters.getInt64GbigintFieldOrUndefined(this, 20);
  }


  /**
   * optional int64 opted_out_best_of_n_auto_trigger_at = 20;
   * @override
   * @return {number|undefined}
   * @deprecated unsafe int64 behavior: go/jspb-api-gotchas#int64
   */
  getOptedOutBestOfNAutoTriggerAtOrUndefined_asLegacyNumberOrString() {
    return jspb_internal_adapters.getInt64FieldOrUndefined(this, 20);
  }


  /**
   * optional int64 opted_out_best_of_n_auto_trigger_at = 20;
   * @override
   * @return {string|undefined}
   */
  getOptedOutBestOfNAutoTriggerAtOrUndefined_asString() {
    return jspb_internal_adapters.getInt64FieldOrUndefined_asString(this, 20);
  }


  /**
   * map<int32, MigrationStatus> migrations = 21;
   * @override
   * @return {!Map<number,!jspb$e.jetbox_state_pb$MigrationStatus>}
   */
  getMigrationsMap() {
    return jspb_internal_adapters.getInt32EnumMapField(this, 21);}



  /**
   * @param {number} key The key of value to set or replace.
   * @param {!jspb$e.jetbox_state_pb$MigrationStatus} value The new value.
   * @return {!jspb$jetbox_state_pb$MutableJetboxAppState} returns this
   */
  putMigrations(key, value) {
    return jspb_internal_adapters.putInt32EnumMapField(this, 21, key, value);
  }


  /**
   * @param {!ReadonlyMap<number,!jspb$e.jetbox_state_pb$MigrationStatus>} value The new values.
   * @return {!jspb$jetbox_state_pb$MutableJetboxAppState} returns this
   */
  putAllMigrations(value) {
    return jspb_internal_adapters.putAllInt32EnumMapField(this, 21, value);
  }


  /**
   * @param {!ReadonlyMap<number,!jspb$e.jetbox_state_pb$MigrationStatus>|undefined} value The new values.
   * @return {!jspb$jetbox_state_pb$MutableJetboxAppState} returns this
   */
  setMigrationsMap(value) {
    return jspb_internal_adapters.setInt32EnumMapField(this, 21, value);
  }


  /**
   * @param {number} key The key of value to remove.
   * @return {!jspb$jetbox_state_pb$MutableJetboxAppState} returns this
   */
  deleteMigrations(key) {
    return jspb_internal_adapters.deleteInt32EnumMapField(this, 21, key);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableJetboxAppState} returns this
   */
  clearMigrationsMap() {
    return jspb_internal_adapters.clearMapField(this, 21);
  }


};

/**
 * @override
 * @return {!jspb$jetbox_state_pb$ImmutableJetboxAppState}
 */
jspb$jetbox_state_pb$MutableJetboxAppState.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$jetbox_state_pb$MutableJetboxAppState}
 */
jspb$jetbox_state_pb$MutableJetboxAppState.prototype.clone;
/**
 * @const {function(string):!jspb$jetbox_state_pb$MutableJetboxAppState}
 */
jspb$jetbox_state_pb$MutableJetboxAppState.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$jetbox_state_pb$MutableJetboxAppState));

/**
 * Returns whether the given value is an instance of jspb$jetbox_state_pb$MutableJetboxAppState.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$jetbox_state_pb$MutableJetboxAppState>}
 */
jspb$jetbox_state_pb$MutableJetboxAppState.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$jetbox_state_pb$MutableJetboxAppState));

/**
 * Object form of JetboxAppState as accepted by the `fromObject` method.
 * @typedef {{
 *  postOnboarding: (?jspb$jetbox_state_pb$MutablePostOnboardingState.ObjectFormat|undefined),
 *  seenNuxs: (?jspb$jetbox_state_pb$MutableSeenNuxUids.ObjectFormat|undefined),
 *  sidebarWorkspacesMigrated: (?boolean|undefined),
 *  googleSettings: (?jspb$jetbox_state_pb$MutableGoogleSpecificSettings.ObjectFormat|undefined),
 *  agentOnboardingCompleted: (?number|undefined),
 *  sidebarWorkspacesMap: (?Array<!Array<!jspb$jetbox_state_pb$MutableSidebarWorkspaceInfo.ObjectFormat|string>>|undefined),
 *  lastSelectedAgentModel: (?number|undefined),
 *  customModelsConfig: (?jspb$jetbox_state_pb$MutableCustomModelsConfig.ObjectFormat|undefined),
 *  agentEnvironment: (?number|undefined),
 *  userConfigMigrated: (?boolean|undefined),
 *  migrateConvosIntoProjects: (?number|undefined),
 *  installationUuid: (?string|undefined),
 *  migrateInternalProjects: (?number|undefined),
 *  migrateRetroactiveProjects: (?number|undefined),
 *  optedOutBestOfNAutoTriggerAt: (?number|string|undefined),
 *  migrationsMap: (?Array<!Array<number>>|undefined)
 * }}
 */
jspb$jetbox_state_pb$MutableJetboxAppState.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$jetbox_state_pb$MutableJetboxAppState.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$jetbox_state_pb$MutableJetboxAppState.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$jetbox_state_pb$MutableJetboxAppState.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for jetbox_state_pb$MutableJetboxAppState.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$jetbox_state_pb$MutableJetboxAppState.internalDoNotUse_debugOnlyProtoTypeName = "jetbox_state_pb.JetboxAppState";
}

/**
 * @typedef {!jspb$jetbox_state_pb$ImmutableJetboxAppState|!jspb$jetbox_state_pb$MutableJetboxAppState}
 */
jspb$ro.jetbox_state_pb$ReadonlyJetboxAppState = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'jetbox_state_pb.JetboxAppState'}
   */
  jspb$jetbox_state_pb$MutableJetboxAppState.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$jetbox_state_pb$MutableJetboxAppState.displayName = 'proto.jetbox_state_pb.JetboxAppState';
}
/**
 * Interface form of JetboxAppState as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  postOnboarding: (!jspb$ro.jetbox_state_pb$ReadonlyPostOnboardingState|undefined),
 *  seenNuxs: (!jspb$ro.jetbox_state_pb$ReadonlySeenNuxUids|undefined),
 *  sidebarWorkspacesMigrated: (boolean|undefined),
 *  googleSettings: (!jspb$ro.jetbox_state_pb$ReadonlyGoogleSpecificSettings|undefined),
 *  agentOnboardingCompleted: (!jspb$e.jetbox_state_pb$AgentOnboardingState|undefined),
 *  sidebarWorkspacesMap: (!ReadonlyMap<string,!jspb$ro.jetbox_state_pb$ReadonlySidebarWorkspaceInfo>|!ReadonlyMap<string,!jspb$jetbox_state_pb$ImmutableSidebarWorkspaceInfo>|undefined),
 *  lastSelectedAgentModel: (!jspb$e.exa$codeium_common_pb$Model|undefined),
 *  customModelsConfig: (!jspb$ro.jetbox_state_pb$ReadonlyCustomModelsConfig|undefined),
 *  agentEnvironment: (!jspb$e.jetbox_state_pb$AgentEnvironment|undefined),
 *  userConfigMigrated: (boolean|undefined),
 *  migrateConvosIntoProjects: (!jspb$e.jetbox_state_pb$MigrationStatus|undefined),
 *  installationUuid: (string|undefined),
 *  migrateInternalProjects: (!jspb$e.jetbox_state_pb$MigrationStatus|undefined),
 *  migrateRetroactiveProjects: (!jspb$e.jetbox_state_pb$RetroactiveMigrationStatus|undefined),
 *  optedOutBestOfNAutoTriggerAt: (!gbigint|undefined),
 *  optedOutBestOfNAutoTriggerAt_asLegacyNumberOrString: (number|string|undefined),
 *  migrationsMap: (!ReadonlyMap<number,!jspb$e.jetbox_state_pb$MigrationStatus>|undefined)
 * }}
 */
jspb$jetbox_state_pb$MutableJetboxAppState.FieldsInterface;

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
 * @param {!jspb$jetbox_state_pb$MutableJetboxAppState.FieldsInterface} record
 * @return {!jspb$jetbox_state_pb$ImmutableJetboxAppState}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableJetboxAppState, ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableJetboxAppState.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$jetbox_state_pb$ImmutableJetboxAppState
 */
jspb$jetbox_state_pb$MutableJetboxAppState.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$jetbox_state_pb$MutableJetboxAppState));

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
 * @param {!jspb$ro.jetbox_state_pb$ReadonlyJetboxAppState} value
 * @return {!jspb$jetbox_state_pb$MutableJetboxAppState.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.jetbox_state_pb$ReadonlyJetboxAppState): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableJetboxAppState, ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableJetboxAppState.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$jetbox_state_pb$MutableJetboxAppState.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$google$protobuf$MutableTimestamp;
Object.defineProperty(this, 'jspb$google$protobuf$MutableTimestamp', {
  get() { return jspb$google$protobuf$MutableTimestamp; },
  set(v) { jspb$google$protobuf$MutableTimestamp = v; },
