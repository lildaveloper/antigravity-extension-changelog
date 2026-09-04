// source: devtools/jetski/boq/provisioning_service/proto/deployment_config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$devtools_jetski_provisioning$MutableDeploymentConfig');
goog.provide('jspb$ro.devtools_jetski_provisioning$ReadonlyDeploymentConfig');

goog.require('jspb$devtools_jetski_provisioning$MutableChatConfig');
goog.require('jspb$devtools_jetski_provisioning$MutableCustomizationConfig');
goog.require('jspb$devtools_jetski_provisioning$MutableMemoryConfig');
goog.require('jspb$devtools_jetski_provisioning$MutableSidecar');
goog.require('jspb$exa$config_pb$MutableUserConfig');
goog.require('jspb$exa$project_pb$MutableProject');
goog.require('jspb$jetbox_state_pb$MutableJetboxAppState');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$devtools_jetski_provisioning$ImmutableDeploymentConfig');
goog.requireType('jspb$e.devtools_jetski_provisioning$DeploymentConfig$HubReleaseChannel');
goog.requireType('jspb$e.devtools_jetski_provisioning$DeploymentConfig$PersistenceMode');
goog.requireType('jspb$exa$project_pb$ImmutableProject');
goog.requireType('jspb$r$devtools_jetski_provisioning$DeploymentConfig$internalDoNotUseReader');
goog.requireType('jspb$ro.devtools_jetski_provisioning$ReadonlyChatConfig');
goog.requireType('jspb$ro.devtools_jetski_provisioning$ReadonlyCustomizationConfig');
goog.requireType('jspb$ro.devtools_jetski_provisioning$ReadonlyMemoryConfig');
goog.requireType('jspb$ro.devtools_jetski_provisioning$ReadonlySidecar');
goog.requireType('jspb$ro.exa$config_pb$ReadonlyUserConfig');
goog.requireType('jspb$ro.exa$project_pb$ReadonlyProject');
goog.requireType('jspb$ro.jetbox_state_pb$ReadonlyJetboxAppState');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$devtools_jetski_provisioning$ImmutableDeploymentConfig>}
 * @implements {jspb$r$devtools_jetski_provisioning$DeploymentConfig$internalDoNotUseReader}
 */
jspb$devtools_jetski_provisioning$MutableDeploymentConfig = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * repeated Sidecar sidecars = 1;
   * @param {!jspb_internal_public_for_gencode.DoNotFreezeToken=} freezeOptOut
   * @tsType (freezeOptOut: import('google3/javascript/apps/jspb/internal_public').DoNotFreezeToken): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableSidecar[]
   * @tsType (): readonly ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableSidecar[]
   * @override
   * @return {!ReadonlyArray<!jspb$devtools_jetski_provisioning$MutableSidecar>}
   */
  getSidecarsList(freezeOptOut) {
    return jspb_internal_adapters.getRepeatedWrapperField(this, jspb$devtools_jetski_provisioning$MutableSidecar, 1, jspb_internal_adapters.getRepeatedFieldReturnType(freezeOptOut));
  }


  /**
   * repeated Sidecar sidecars = 1;
   * @override
   * @return {!ReadonlyArray<!jspb$ro.devtools_jetski_provisioning$ReadonlySidecar>}
   */
  getReadonlySidecarsList() {
    return jspb_internal_adapters.getReadonlyRepeatedWrapperField(this, jspb$devtools_jetski_provisioning$MutableSidecar, 1);
  }


  /**
   * @param {!ReadonlyArray<!jspb$ro.devtools_jetski_provisioning$ReadonlySidecar>|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  setSidecarsList(value) {
    return jspb_internal_adapters.setRepeatedWrapperField(this, jspb$devtools_jetski_provisioning$MutableSidecar, 1, value);
  }


  /**
   * Gets mutable repeated field reference.
   * @param {number} index
   * @return {!jspb$devtools_jetski_provisioning$MutableSidecar}
   */
  getMutableSidecars(index) {
    return jspb_internal_adapters.getRepeatedIndexedMutableWrapper(this, 1, jspb$devtools_jetski_provisioning$MutableSidecar, index);
  }


  /**
   * Gets readonly repeated field reference.
   * @override
   * @param {number} index
   * @return {!jspb$ro.devtools_jetski_provisioning$ReadonlySidecar}
   */
  getReadonlySidecars(index) {
    return jspb_internal_adapters.getRepeatedIndexedReadonlyWrapper(this, 1, jspb$devtools_jetski_provisioning$MutableSidecar, index);
  }


  /**
   * Adds repeated field and returns `this`.
   * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlySidecar} value
   * @param {number=} index
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  addSidecars(value, index) {
    return jspb_internal_adapters.addToRepeatedWrapperField(this, 1, jspb$devtools_jetski_provisioning$MutableSidecar, value, index);
  }


  /**
   * Adds repeated field and returns newly added submessage.
   * @param {!jspb$devtools_jetski_provisioning$MutableSidecar=} value
   * @param {number=} index
   * @return {!jspb$devtools_jetski_provisioning$MutableSidecar} the value that was added
   */
  addAndReturnSidecars(value, index) {
    return jspb_internal_adapters.addAndReturnRepeatedWrapperField(this, 1, jspb$devtools_jetski_provisioning$MutableSidecar, value, index);
  }


  /**
   * Adds multiple values to a repeated field and returns `this`.
   * @param {!Iterable<!jspb$ro.devtools_jetski_provisioning$ReadonlySidecar>} values
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  addAllSidecars(values) {
    return jspb_internal_adapters.addAllToRepeatedWrapperField(this, 1, jspb$devtools_jetski_provisioning$MutableSidecar, values);
  }


  /**
   * Sets repeated field value at `index` and returns `this`.
   * @param {number} index
   * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlySidecar} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  setSidecars(index, value) {
    return jspb_internal_adapters.setRepeatedIndexedWrapper(this, 1, jspb$devtools_jetski_provisioning$MutableSidecar, index, value);
  }


  /**
   * Removes a value from a repeated field and returns `this`.
   * @param {number=} index defaults to the end
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  removeSidecars(index) {
    return jspb_internal_adapters.removeFromRepeatedWrapperField(this, 1, jspb$devtools_jetski_provisioning$MutableSidecar, index);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  clearSidecarsList() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * Returns the size of this field.
   * @override
   * @return {number}
   */
  getSidecarsCount() {
    return jspb_internal_adapters.getRepeatedWrapperCount(this, jspb$devtools_jetski_provisioning$MutableSidecar, 1);
  }


  /**
   * optional CustomizationConfig skills = 8;
   * @override
   * @return {!jspb$devtools_jetski_provisioning$MutableCustomizationConfig|undefined}
   */
  getSkills() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$devtools_jetski_provisioning$MutableCustomizationConfig, 8);
  }


  /**
   * optional CustomizationConfig skills = 8;
   * @override
   * @return {!jspb$ro.devtools_jetski_provisioning$ReadonlyCustomizationConfig}
   */
  getReadonlySkills() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$devtools_jetski_provisioning$MutableCustomizationConfig, 8);
  }


  /**
   * optional CustomizationConfig skills = 8;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$devtools_jetski_provisioning$MutableCustomizationConfig|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$devtools_jetski_provisioning$MutableCustomizationConfig') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableCustomizationConfig|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableCustomizationConfig
   */
  getMutableSkills(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$devtools_jetski_provisioning$MutableCustomizationConfig, 8, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyCustomizationConfig|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  setSkills(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$devtools_jetski_provisioning$MutableCustomizationConfig, 8, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  clearSkills() {
    return jspb_internal_adapters.clearField(this, 8);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasSkills() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$devtools_jetski_provisioning$MutableCustomizationConfig, 8);
  }


  /**
   * optional CustomizationConfig skills = 8;
   * @override
   * @return {!jspb$ro.devtools_jetski_provisioning$ReadonlyCustomizationConfig|undefined}
   */
  getSkillsOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$devtools_jetski_provisioning$MutableCustomizationConfig, 8);
  }


  /**
   * optional CustomizationConfig agents = 9;
   * @override
   * @return {!jspb$devtools_jetski_provisioning$MutableCustomizationConfig|undefined}
   */
  getAgents() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$devtools_jetski_provisioning$MutableCustomizationConfig, 9);
  }


  /**
   * optional CustomizationConfig agents = 9;
   * @override
   * @return {!jspb$ro.devtools_jetski_provisioning$ReadonlyCustomizationConfig}
   */
  getReadonlyAgents() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$devtools_jetski_provisioning$MutableCustomizationConfig, 9);
  }


  /**
   * optional CustomizationConfig agents = 9;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$devtools_jetski_provisioning$MutableCustomizationConfig|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$devtools_jetski_provisioning$MutableCustomizationConfig') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableCustomizationConfig|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableCustomizationConfig
   */
  getMutableAgents(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$devtools_jetski_provisioning$MutableCustomizationConfig, 9, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyCustomizationConfig|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  setAgents(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$devtools_jetski_provisioning$MutableCustomizationConfig, 9, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  clearAgents() {
    return jspb_internal_adapters.clearField(this, 9);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasAgents() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$devtools_jetski_provisioning$MutableCustomizationConfig, 9);
  }


  /**
   * optional CustomizationConfig agents = 9;
   * @override
   * @return {!jspb$ro.devtools_jetski_provisioning$ReadonlyCustomizationConfig|undefined}
   */
  getAgentsOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$devtools_jetski_provisioning$MutableCustomizationConfig, 9);
  }


  /**
   * optional CustomizationConfig plugins = 22;
   * @override
   * @return {!jspb$devtools_jetski_provisioning$MutableCustomizationConfig|undefined}
   */
  getPlugins() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$devtools_jetski_provisioning$MutableCustomizationConfig, 22);
  }


  /**
   * optional CustomizationConfig plugins = 22;
   * @override
   * @return {!jspb$ro.devtools_jetski_provisioning$ReadonlyCustomizationConfig}
   */
  getReadonlyPlugins() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$devtools_jetski_provisioning$MutableCustomizationConfig, 22);
  }


  /**
   * optional CustomizationConfig plugins = 22;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$devtools_jetski_provisioning$MutableCustomizationConfig|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$devtools_jetski_provisioning$MutableCustomizationConfig') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableCustomizationConfig|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableCustomizationConfig
   */
  getMutablePlugins(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$devtools_jetski_provisioning$MutableCustomizationConfig, 22, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyCustomizationConfig|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  setPlugins(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$devtools_jetski_provisioning$MutableCustomizationConfig, 22, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  clearPlugins() {
    return jspb_internal_adapters.clearField(this, 22);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasPlugins() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$devtools_jetski_provisioning$MutableCustomizationConfig, 22);
  }


  /**
   * optional CustomizationConfig plugins = 22;
   * @override
   * @return {!jspb$ro.devtools_jetski_provisioning$ReadonlyCustomizationConfig|undefined}
   */
  getPluginsOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$devtools_jetski_provisioning$MutableCustomizationConfig, 22);
  }


  /**
   * optional MemoryConfig jetski_memory_config = 29;
   * @override
   * @return {!jspb$devtools_jetski_provisioning$MutableMemoryConfig|undefined}
   */
  getJetskiMemoryConfig() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$devtools_jetski_provisioning$MutableMemoryConfig, 29);
  }


  /**
   * optional MemoryConfig jetski_memory_config = 29;
   * @override
   * @return {!jspb$ro.devtools_jetski_provisioning$ReadonlyMemoryConfig}
   */
  getReadonlyJetskiMemoryConfig() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$devtools_jetski_provisioning$MutableMemoryConfig, 29);
  }


  /**
   * optional MemoryConfig jetski_memory_config = 29;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$devtools_jetski_provisioning$MutableMemoryConfig|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$devtools_jetski_provisioning$MutableMemoryConfig') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableMemoryConfig|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableMemoryConfig
   */
  getMutableJetskiMemoryConfig(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$devtools_jetski_provisioning$MutableMemoryConfig, 29, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyMemoryConfig|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  setJetskiMemoryConfig(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$devtools_jetski_provisioning$MutableMemoryConfig, 29, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  clearJetskiMemoryConfig() {
    return jspb_internal_adapters.clearField(this, 29);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasJetskiMemoryConfig() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$devtools_jetski_provisioning$MutableMemoryConfig, 29);
  }


  /**
   * optional MemoryConfig jetski_memory_config = 29;
   * @override
   * @return {!jspb$ro.devtools_jetski_provisioning$ReadonlyMemoryConfig|undefined}
   */
  getJetskiMemoryConfigOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$devtools_jetski_provisioning$MutableMemoryConfig, 29);
  }


  /**
   * optional exa.config_pb.UserConfig user_config = 19;
   * @override
   * @return {!jspb$exa$config_pb$MutableUserConfig|undefined}
   */
  getUserConfig() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$exa$config_pb$MutableUserConfig, 19);
  }


  /**
   * optional exa.config_pb.UserConfig user_config = 19;
   * @override
   * @return {!jspb$ro.exa$config_pb$ReadonlyUserConfig}
   */
  getReadonlyUserConfig() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$exa$config_pb$MutableUserConfig, 19);
  }


  /**
   * optional exa.config_pb.UserConfig user_config = 19;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$exa$config_pb$MutableUserConfig|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$exa$config_pb$MutableUserConfig') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$exa$config_pb$MutableUserConfig|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$exa$config_pb$MutableUserConfig
   */
  getMutableUserConfig(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$exa$config_pb$MutableUserConfig, 19, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.exa$config_pb$ReadonlyUserConfig|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  setUserConfig(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$exa$config_pb$MutableUserConfig, 19, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  clearUserConfig() {
    return jspb_internal_adapters.clearField(this, 19);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasUserConfig() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$exa$config_pb$MutableUserConfig, 19);
  }


  /**
   * optional exa.config_pb.UserConfig user_config = 19;
   * @override
   * @return {!jspb$ro.exa$config_pb$ReadonlyUserConfig|undefined}
   */
  getUserConfigOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$exa$config_pb$MutableUserConfig, 19);
  }


  /**
   * map<string, exa.project_pb.Project> projects = 18;
   * @override
   * @return {!Map<string,!jspb$exa$project_pb$MutableProject>}
   */
  getProjectsMap() {
    return jspb_internal_adapters.getStringWrapperMapField(this, 18,
        jspb$exa$project_pb$MutableProject);}



  /**
   * map<string, exa.project_pb.Project> projects = 18;
   * @override
   * @return {!Map<string,!jspb$ro.exa$project_pb$ReadonlyProject>}
   */
  getReadonlyProjectsMap() {
    return jspb_internal_adapters.getReadonlyStringWrapperMapField(this, 18,
        jspb$exa$project_pb$MutableProject);}



  /**
   * @param {string} key The key of value to set or replace.
   * @param {!jspb$ro.exa$project_pb$ReadonlyProject} value The new value.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  putProjects(key, value) {
    return jspb_internal_adapters.putStringWrapperMapField(this, 18, key, value, jspb$exa$project_pb$MutableProject);
  }


  /**
   * @param {!ReadonlyMap<string,!jspb$ro.exa$project_pb$ReadonlyProject>} value The new values.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  putAllProjects(value) {
    return jspb_internal_adapters.putAllStringWrapperMapField(this, 18, value, jspb$exa$project_pb$MutableProject);
  }


  /**
   * @param {!ReadonlyMap<string,!jspb$ro.exa$project_pb$ReadonlyProject>|undefined} value The new values.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  setProjectsMap(value) {
    return jspb_internal_adapters.setStringWrapperMapField(this, 18, value, jspb$exa$project_pb$MutableProject);
  }


  /**
   * @param {string} key The key of value to remove.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  deleteProjects(key) {
    return jspb_internal_adapters.deleteStringWrapperMapField(this, 18, key, jspb$exa$project_pb$MutableProject);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  clearProjectsMap() {
    return jspb_internal_adapters.clearMapField(this, 18);
  }


  /**
   * optional jetbox_state_pb.JetboxAppState jetbox_app_state = 17;
   * @override
   * @return {!jspb$jetbox_state_pb$MutableJetboxAppState|undefined}
   */
  getJetboxAppState() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$jetbox_state_pb$MutableJetboxAppState, 17);
  }


  /**
   * optional jetbox_state_pb.JetboxAppState jetbox_app_state = 17;
   * @override
   * @return {!jspb$ro.jetbox_state_pb$ReadonlyJetboxAppState}
   */
  getReadonlyJetboxAppState() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$jetbox_state_pb$MutableJetboxAppState, 17);
  }


  /**
   * optional jetbox_state_pb.JetboxAppState jetbox_app_state = 17;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$jetbox_state_pb$MutableJetboxAppState|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$jetbox_state_pb$MutableJetboxAppState') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableJetboxAppState|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableJetboxAppState
   */
  getMutableJetboxAppState(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$jetbox_state_pb$MutableJetboxAppState, 17, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.jetbox_state_pb$ReadonlyJetboxAppState|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  setJetboxAppState(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$jetbox_state_pb$MutableJetboxAppState, 17, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  clearJetboxAppState() {
    return jspb_internal_adapters.clearField(this, 17);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasJetboxAppState() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$jetbox_state_pb$MutableJetboxAppState, 17);
  }


  /**
   * optional jetbox_state_pb.JetboxAppState jetbox_app_state = 17;
   * @override
   * @return {!jspb$ro.jetbox_state_pb$ReadonlyJetboxAppState|undefined}
   */
  getJetboxAppStateOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$jetbox_state_pb$MutableJetboxAppState, 17);
  }


  /**
   * optional ChatConfig chat_config = 4;
   * @override
   * @return {!jspb$devtools_jetski_provisioning$MutableChatConfig|undefined}
   */
  getChatConfig() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$devtools_jetski_provisioning$MutableChatConfig, 4);
  }


  /**
   * optional ChatConfig chat_config = 4;
   * @override
   * @return {!jspb$ro.devtools_jetski_provisioning$ReadonlyChatConfig}
   */
  getReadonlyChatConfig() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$devtools_jetski_provisioning$MutableChatConfig, 4);
  }


  /**
   * optional ChatConfig chat_config = 4;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$devtools_jetski_provisioning$MutableChatConfig|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$devtools_jetski_provisioning$MutableChatConfig') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableChatConfig|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableChatConfig
   */
  getMutableChatConfig(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$devtools_jetski_provisioning$MutableChatConfig, 4, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyChatConfig|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  setChatConfig(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$devtools_jetski_provisioning$MutableChatConfig, 4, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  clearChatConfig() {
    return jspb_internal_adapters.clearField(this, 4);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasChatConfig() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$devtools_jetski_provisioning$MutableChatConfig, 4);
  }


  /**
   * optional ChatConfig chat_config = 4;
   * @override
   * @return {!jspb$ro.devtools_jetski_provisioning$ReadonlyChatConfig|undefined}
   */
  getChatConfigOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$devtools_jetski_provisioning$MutableChatConfig, 4);
  }


  /**
   * optional string setup_script = 6;
   * @override
   * @return {string}
   */
  getSetupScript() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 6);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  setSetupScript(value) {
    return jspb_internal_adapters.setStringField(this, 6, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  clearSetupScript() {
    return jspb_internal_adapters.clearField(this, 6);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasSetupScript() {
    return jspb_internal_adapters.hasStringField(this, 6);
  }


  /**
   * optional string setup_script = 6;
   * @override
   * @return {string|undefined}
   */
  getSetupScriptOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 6);
  }


  /**
   * optional string gemini_md = 11;
   * @override
   * @return {string}
   */
  getGeminiMd() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 11);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  setGeminiMd(value) {
    return jspb_internal_adapters.setStringField(this, 11, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  clearGeminiMd() {
    return jspb_internal_adapters.clearField(this, 11);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasGeminiMd() {
    return jspb_internal_adapters.hasStringField(this, 11);
  }


  /**
   * optional string gemini_md = 11;
   * @override
   * @return {string|undefined}
   */
  getGeminiMdOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 11);
  }


  /**
   * optional bool use_x20_gemini_dir = 12;
   * @override
   * @return {boolean}
   */
  getUseX20GeminiDir() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 12);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  setUseX20GeminiDir(value) {
    return jspb_internal_adapters.setBooleanField(this, 12, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  clearUseX20GeminiDir() {
    return jspb_internal_adapters.clearField(this, 12);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasUseX20GeminiDir() {
    return jspb_internal_adapters.hasBooleanField(this, 12);
  }


  /**
   * optional bool use_x20_gemini_dir = 12;
   * @override
   * @return {boolean|undefined}
   */
  getUseX20GeminiDirOrUndefined() {
    return jspb_internal_adapters.getBooleanFieldOrUndefined(this, 12);
  }


  /**
   * optional PersistenceMode persistence_mode = 25;
   * @override
   * @return {!jspb$e.devtools_jetski_provisioning$DeploymentConfig$PersistenceMode}
   */
  getPersistenceMode() {
    return /** @type {!jspb$e.devtools_jetski_provisioning$DeploymentConfig$PersistenceMode} */ (jspb_internal_adapters.getEnumFieldWithDefault(this, 25));
  }


  /**
   * @param {!jspb$e.devtools_jetski_provisioning$DeploymentConfig$PersistenceMode|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  setPersistenceMode(value) {
    return jspb_internal_adapters.setEnumField(this, 25, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  clearPersistenceMode() {
    return jspb_internal_adapters.clearField(this, 25);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasPersistenceMode() {
    return jspb_internal_adapters.hasEnumField(this, 25);
  }


  /**
   * optional PersistenceMode persistence_mode = 25;
   * @override
   * @return {!jspb$e.devtools_jetski_provisioning$DeploymentConfig$PersistenceMode|undefined}
   */
  getPersistenceModeOrUndefined() {
    return /** @type {!jspb$e.devtools_jetski_provisioning$DeploymentConfig$PersistenceMode|undefined} */ (jspb_internal_adapters.getEnumFieldOrUndefined(this, 25));
  }


  /**
   * optional HubReleaseChannel hub_release_channel = 13;
   * @override
   * @return {!jspb$e.devtools_jetski_provisioning$DeploymentConfig$HubReleaseChannel}
   */
  getHubReleaseChannel() {
    return /** @type {!jspb$e.devtools_jetski_provisioning$DeploymentConfig$HubReleaseChannel} */ (jspb_internal_adapters.getEnumFieldWithDefault(this, 13));
  }


  /**
   * @param {!jspb$e.devtools_jetski_provisioning$DeploymentConfig$HubReleaseChannel|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  setHubReleaseChannel(value) {
    return jspb_internal_adapters.setEnumField(this, 13, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  clearHubReleaseChannel() {
    return jspb_internal_adapters.clearField(this, 13);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasHubReleaseChannel() {
    return jspb_internal_adapters.hasEnumField(this, 13);
  }


  /**
   * optional HubReleaseChannel hub_release_channel = 13;
   * @override
   * @return {!jspb$e.devtools_jetski_provisioning$DeploymentConfig$HubReleaseChannel|undefined}
   */
  getHubReleaseChannelOrUndefined() {
    return /** @type {!jspb$e.devtools_jetski_provisioning$DeploymentConfig$HubReleaseChannel|undefined} */ (jspb_internal_adapters.getEnumFieldOrUndefined(this, 13));
  }


  /**
   * optional string beyond_quota_bucket = 14;
   * @override
   * @return {string}
   */
  getBeyondQuotaBucket() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 14);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  setBeyondQuotaBucket(value) {
    return jspb_internal_adapters.setStringField(this, 14, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  clearBeyondQuotaBucket() {
    return jspb_internal_adapters.clearField(this, 14);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasBeyondQuotaBucket() {
    return jspb_internal_adapters.hasStringField(this, 14);
  }


  /**
   * optional string beyond_quota_bucket = 14;
   * @override
   * @return {string|undefined}
   */
  getBeyondQuotaBucketOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 14);
  }


  /**
   * optional bool preserve_existing_data = 15;
   * @override
   * @return {boolean}
   */
  getPreserveExistingData() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 15);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  setPreserveExistingData(value) {
    return jspb_internal_adapters.setBooleanField(this, 15, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  clearPreserveExistingData() {
    return jspb_internal_adapters.clearField(this, 15);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasPreserveExistingData() {
    return jspb_internal_adapters.hasBooleanField(this, 15);
  }


  /**
   * optional bool preserve_existing_data = 15;
   * @override
   * @return {boolean|undefined}
   */
  getPreserveExistingDataOrUndefined() {
    return jspb_internal_adapters.getBooleanFieldOrUndefined(this, 15);
  }


  /**
   * optional bool preserve_sidecars = 28;
   * @override
   * @return {boolean}
   */
  getPreserveSidecars() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 28);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  setPreserveSidecars(value) {
    return jspb_internal_adapters.setBooleanField(this, 28, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  clearPreserveSidecars() {
    return jspb_internal_adapters.clearField(this, 28);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasPreserveSidecars() {
    return jspb_internal_adapters.hasBooleanField(this, 28);
  }


  /**
   * optional bool preserve_sidecars = 28;
   * @override
   * @return {boolean|undefined}
   */
  getPreserveSidecarsOrUndefined() {
    return jspb_internal_adapters.getBooleanFieldOrUndefined(this, 28);
  }


  /**
   * optional string hooks_json = 16;
   * @override
   * @return {string}
   */
  getHooksJson() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 16);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  setHooksJson(value) {
    return jspb_internal_adapters.setStringField(this, 16, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  clearHooksJson() {
    return jspb_internal_adapters.clearField(this, 16);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasHooksJson() {
    return jspb_internal_adapters.hasStringField(this, 16);
  }


  /**
   * optional string hooks_json = 16;
   * @override
   * @return {string|undefined}
   */
  getHooksJsonOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 16);
  }


  /**
   * optional bool enable_cloud_project = 20;
   * @override
   * @return {boolean}
   */
  getEnableCloudProject() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 20);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  setEnableCloudProject(value) {
    return jspb_internal_adapters.setBooleanField(this, 20, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  clearEnableCloudProject() {
    return jspb_internal_adapters.clearField(this, 20);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasEnableCloudProject() {
    return jspb_internal_adapters.hasBooleanField(this, 20);
  }


  /**
   * optional bool enable_cloud_project = 20;
   * @override
   * @return {boolean|undefined}
   */
  getEnableCloudProjectOrUndefined() {
    return jspb_internal_adapters.getBooleanFieldOrUndefined(this, 20);
  }


  /**
   * map<string, string> env_vars = 23;
   * @override
   * @return {!Map<string,string>}
   */
  getEnvVarsMap() {
    return jspb_internal_adapters.getStringStringMapField(this, 23);}



  /**
   * @param {string} key The key of value to set or replace.
   * @param {string} value The new value.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  putEnvVars(key, value) {
    return jspb_internal_adapters.putStringStringMapField(this, 23, key, value);
  }


  /**
   * @param {!ReadonlyMap<string,string>} value The new values.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  putAllEnvVars(value) {
    return jspb_internal_adapters.putAllStringStringMapField(this, 23, value);
  }


  /**
   * @param {!ReadonlyMap<string,string>|undefined} value The new values.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  setEnvVarsMap(value) {
    return jspb_internal_adapters.setStringStringMapField(this, 23, value);
  }


  /**
   * @param {string} key The key of value to remove.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  deleteEnvVars(key) {
    return jspb_internal_adapters.deleteStringStringMapField(this, 23, key);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  clearEnvVarsMap() {
    return jspb_internal_adapters.clearMapField(this, 23);
  }


  /**
   * optional string generative_service_addr = 24;
   * @override
   * @return {string}
   * @deprecated
   */
  getGenerativeServiceAddr() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 24);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   * @deprecated
   */
  setGenerativeServiceAddr(value) {
    return jspb_internal_adapters.setStringField(this, 24, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   * @deprecated
   */
  clearGenerativeServiceAddr() {
    return jspb_internal_adapters.clearField(this, 24);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   * @deprecated
   */
  hasGenerativeServiceAddr() {
    return jspb_internal_adapters.hasStringField(this, 24);
  }


  /**
   * optional string generative_service_addr = 24;
   * @override
   * @return {string|undefined}
   * @deprecated
   */
  getGenerativeServiceAddrOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 24);
  }


  /**
   * repeated string additional_ls_args = 27;
   * @override
   * @param {!jspb_internal_public_for_gencode.DoNotFreezeToken=} freezeOptOut
   * @tsType (freezeOptOut: import('google3/javascript/apps/jspb/internal_public').DoNotFreezeToken): string[]
   * @tsType (): readonly string[]
   * @return {!ReadonlyArray<string>}
   */
  getAdditionalLsArgsList(freezeOptOut) {
    return jspb_internal_adapters.getRepeatedStringField(this, 27, jspb_internal_adapters.getRepeatedFieldReturnType(freezeOptOut));
  }


  /**
   * @param {!ReadonlyArray<string>|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  setAdditionalLsArgsList(value) {
    return jspb_internal_adapters.setRepeatedStringField(this, 27, value);
  }


  /**
   * @param {string} value
   * @param {number=} index
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  addAdditionalLsArgs(value, index) {
    return jspb_internal_adapters.addToRepeatedStringField(this, 27, value, index);
  }


  /**
   * @param {!Iterable<string>} values
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  addAllAdditionalLsArgs(values) {
    return jspb_internal_adapters.addAllToRepeatedStringField(this, 27, values);
  }


  /**
   * @param {number=} index If not passed, defaults to the end.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  removeAdditionalLsArgs(index) {
    return jspb_internal_adapters.removeFromRepeatedStringField(this, 27, index);
  }


  /**
   * Returns value at `index`.
   * @override
   * @param {number} index
   * @return {string}
   */
  getAdditionalLsArgs(index) {
   return jspb_internal_adapters.getRepeatedIndexedStringField(this, 27, index);
  }


  /**
   * @param {number} index
   * @param {string} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  setAdditionalLsArgs(index, value) {
    return jspb_internal_adapters.setRepeatedIndexedStringField(this, 27, index, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  clearAdditionalLsArgsList() {
    return jspb_internal_adapters.clearField(this, 27);
  }


  /**
   * Returns the size of this field.
   * @override
   * @return {number}
   */
  getAdditionalLsArgsCount() {
    return jspb_internal_adapters.getRepeatedStringCount(this, 27);
  }


  /**
   * map<string, string> extra_files = 30;
   * @override
   * @return {!Map<string,string>}
   */
  getExtraFilesMap() {
    return jspb_internal_adapters.getStringStringMapField(this, 30);}



  /**
   * @param {string} key The key of value to set or replace.
   * @param {string} value The new value.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  putExtraFiles(key, value) {
    return jspb_internal_adapters.putStringStringMapField(this, 30, key, value);
  }


  /**
   * @param {!ReadonlyMap<string,string>} value The new values.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  putAllExtraFiles(value) {
    return jspb_internal_adapters.putAllStringStringMapField(this, 30, value);
  }


  /**
   * @param {!ReadonlyMap<string,string>|undefined} value The new values.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  setExtraFilesMap(value) {
    return jspb_internal_adapters.setStringStringMapField(this, 30, value);
  }


  /**
   * @param {string} key The key of value to remove.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  deleteExtraFiles(key) {
    return jspb_internal_adapters.deleteStringStringMapField(this, 30, key);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig} returns this
   */
  clearExtraFilesMap() {
    return jspb_internal_adapters.clearMapField(this, 30);
  }


};

/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$ImmutableDeploymentConfig}
 */
jspb$devtools_jetski_provisioning$MutableDeploymentConfig.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig}
 */
jspb$devtools_jetski_provisioning$MutableDeploymentConfig.prototype.clone;
/**
 * @const {function(string):!jspb$devtools_jetski_provisioning$MutableDeploymentConfig}
 */
jspb$devtools_jetski_provisioning$MutableDeploymentConfig.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$devtools_jetski_provisioning$MutableDeploymentConfig));

/**
 * Returns whether the given value is an instance of jspb$devtools_jetski_provisioning$MutableDeploymentConfig.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$devtools_jetski_provisioning$MutableDeploymentConfig>}
 */
jspb$devtools_jetski_provisioning$MutableDeploymentConfig.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$devtools_jetski_provisioning$MutableDeploymentConfig));

/**
 * Object form of DeploymentConfig as accepted by the `fromObject` method.
 * @typedef {{
 *  sidecarsList: (?Array<!jspb$devtools_jetski_provisioning$MutableSidecar.ObjectFormat>|undefined),
 *  skills: (?jspb$devtools_jetski_provisioning$MutableCustomizationConfig.ObjectFormat|undefined),
 *  agents: (?jspb$devtools_jetski_provisioning$MutableCustomizationConfig.ObjectFormat|undefined),
 *  plugins: (?jspb$devtools_jetski_provisioning$MutableCustomizationConfig.ObjectFormat|undefined),
 *  jetskiMemoryConfig: (?jspb$devtools_jetski_provisioning$MutableMemoryConfig.ObjectFormat|undefined),
 *  userConfig: (?jspb$exa$config_pb$MutableUserConfig.ObjectFormat|undefined),
 *  projectsMap: (?Array<!Array<!jspb$exa$project_pb$MutableProject.ObjectFormat|string>>|undefined),
 *  jetboxAppState: (?jspb$jetbox_state_pb$MutableJetboxAppState.ObjectFormat|undefined),
 *  chatConfig: (?jspb$devtools_jetski_provisioning$MutableChatConfig.ObjectFormat|undefined),
 *  setupScript: (?string|undefined),
 *  geminiMd: (?string|undefined),
 *  useX20GeminiDir: (?boolean|undefined),
 *  persistenceMode: (?number|undefined),
 *  hubReleaseChannel: (?number|undefined),
 *  beyondQuotaBucket: (?string|undefined),
 *  preserveExistingData: (?boolean|undefined),
 *  preserveSidecars: (?boolean|undefined),
 *  hooksJson: (?string|undefined),
 *  enableCloudProject: (?boolean|undefined),
 *  envVarsMap: (?Array<!Array<string>>|undefined),
 *  generativeServiceAddr: (?string|undefined),
 *  additionalLsArgsList: (?Array<string>|undefined),
 *  extraFilesMap: (?Array<!Array<string>>|undefined)
 * }}
 */
jspb$devtools_jetski_provisioning$MutableDeploymentConfig.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$devtools_jetski_provisioning$MutableDeploymentConfig.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$devtools_jetski_provisioning$MutableDeploymentConfig.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for devtools_jetski_provisioning$MutableDeploymentConfig.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$devtools_jetski_provisioning$MutableDeploymentConfig.internalDoNotUse_debugOnlyProtoTypeName = "devtools_jetski_provisioning.DeploymentConfig";
}

/**
 * @typedef {!jspb$devtools_jetski_provisioning$ImmutableDeploymentConfig|!jspb$devtools_jetski_provisioning$MutableDeploymentConfig}
 */
jspb$ro.devtools_jetski_provisioning$ReadonlyDeploymentConfig = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'devtools_jetski_provisioning.DeploymentConfig'}
   */
  jspb$devtools_jetski_provisioning$MutableDeploymentConfig.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$devtools_jetski_provisioning$MutableDeploymentConfig.displayName = 'proto.devtools_jetski_provisioning.DeploymentConfig';
}
/**
 * Interface form of DeploymentConfig as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  sidecarsList: (!ReadonlyArray<!jspb$ro.devtools_jetski_provisioning$ReadonlySidecar>|undefined),
 *  skills: (!jspb$ro.devtools_jetski_provisioning$ReadonlyCustomizationConfig|undefined),
 *  agents: (!jspb$ro.devtools_jetski_provisioning$ReadonlyCustomizationConfig|undefined),
 *  plugins: (!jspb$ro.devtools_jetski_provisioning$ReadonlyCustomizationConfig|undefined),
 *  jetskiMemoryConfig: (!jspb$ro.devtools_jetski_provisioning$ReadonlyMemoryConfig|undefined),
 *  userConfig: (!jspb$ro.exa$config_pb$ReadonlyUserConfig|undefined),
 *  projectsMap: (!ReadonlyMap<string,!jspb$ro.exa$project_pb$ReadonlyProject>|!ReadonlyMap<string,!jspb$exa$project_pb$ImmutableProject>|undefined),
 *  jetboxAppState: (!jspb$ro.jetbox_state_pb$ReadonlyJetboxAppState|undefined),
 *  chatConfig: (!jspb$ro.devtools_jetski_provisioning$ReadonlyChatConfig|undefined),
 *  setupScript: (string|undefined),
 *  geminiMd: (string|undefined),
 *  useX20GeminiDir: (boolean|undefined),
 *  persistenceMode: (!jspb$e.devtools_jetski_provisioning$DeploymentConfig$PersistenceMode|undefined),
 *  hubReleaseChannel: (!jspb$e.devtools_jetski_provisioning$DeploymentConfig$HubReleaseChannel|undefined),
 *  beyondQuotaBucket: (string|undefined),
 *  preserveExistingData: (boolean|undefined),
 *  preserveSidecars: (boolean|undefined),
 *  hooksJson: (string|undefined),
 *  enableCloudProject: (boolean|undefined),
 *  envVarsMap: (!ReadonlyMap<string,string>|undefined),
 *  generativeServiceAddr: (string|undefined),
 *  additionalLsArgsList: (!ReadonlyArray<string>|undefined),
 *  extraFilesMap: (!ReadonlyMap<string,string>|undefined)
 * }}
 */
jspb$devtools_jetski_provisioning$MutableDeploymentConfig.FieldsInterface;

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
 * @param {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig.FieldsInterface} record
 * @return {!jspb$devtools_jetski_provisioning$ImmutableDeploymentConfig}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableDeploymentConfig, ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableDeploymentConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$ImmutableDeploymentConfig
 */
jspb$devtools_jetski_provisioning$MutableDeploymentConfig.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$devtools_jetski_provisioning$MutableDeploymentConfig));

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
 * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyDeploymentConfig} value
 * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.devtools_jetski_provisioning$ReadonlyDeploymentConfig): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableDeploymentConfig, ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableDeploymentConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$devtools_jetski_provisioning$MutableDeploymentConfig.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$b$exa$config_pb$PluginUserConfig;
Object.defineProperty(this, 'jspb$b$exa$config_pb$PluginUserConfig', {
  get() { return jspb$b$exa$config_pb$PluginUserConfig; },
  set(v) { jspb$b$exa$config_pb$PluginUserConfig = v; },
