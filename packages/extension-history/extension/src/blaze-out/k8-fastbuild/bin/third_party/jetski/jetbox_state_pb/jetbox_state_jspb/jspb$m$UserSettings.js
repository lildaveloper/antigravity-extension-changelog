// source: third_party/jetski/jetbox_state_pb/jetbox_state.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$jetbox_state_pb$MutableUserSettings');
goog.provide('jspb$ro.jetbox_state_pb$ReadonlyUserSettings');

goog.require('jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig');
goog.require('jspb$jetbox_state_pb$MutableCustomThemeSeeds');
goog.require('jspb$jetbox_state_pb$MutableGoogleSpecificConfig');
goog.require('jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$e.exa$codeium_common_pb$AgentPermissionPreset');
goog.requireType('jspb$e.exa$codeium_common_pb$AgentSettingPolicy');
goog.requireType('jspb$e.exa$codeium_common_pb$ArtifactReviewMode');
goog.requireType('jspb$e.exa$codeium_common_pb$BrowserJsExecutionPolicy');
goog.requireType('jspb$e.exa$codeium_common_pb$CascadeCommandsAutoExecution');
goog.requireType('jspb$e.exa$codeium_common_pb$PlanningMode');
goog.requireType('jspb$e.exa$cortex_pb$MessageDeliveryStrategy');
goog.requireType('jspb$e.jetbox_state_pb$AgentEnvironment');
goog.requireType('jspb$e.jetbox_state_pb$ConversationWidth');
goog.requireType('jspb$e.jetbox_state_pb$TerminalPlacement');
goog.requireType('jspb$e.jetbox_state_pb$ThemeMode');
goog.requireType('jspb$jetbox_state_pb$ImmutableUserSettings');
goog.requireType('jspb$r$jetbox_state_pb$UserSettings$internalDoNotUseReader');
goog.requireType('jspb$ro.exa$codeium_common_pb$ReadonlyPermissionGrantsConfig');
goog.requireType('jspb$ro.jetbox_state_pb$ReadonlyCustomThemeSeeds');
goog.requireType('jspb$ro.jetbox_state_pb$ReadonlyGoogleSpecificConfig');
goog.requireType('jspb$ro.jetbox_state_pb$UserSettings$ReadonlySandboxProxy');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$jetbox_state_pb$ImmutableUserSettings>}
 * @implements {jspb$r$jetbox_state_pb$UserSettings$internalDoNotUseReader}
 */
jspb$jetbox_state_pb$MutableUserSettings = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional exa.codeium_common_pb.CascadeCommandsAutoExecution auto_execution_policy = 1;
   * @override
   * @return {!jspb$e.exa$codeium_common_pb$CascadeCommandsAutoExecution}
   */
  getAutoExecutionPolicy() {
    return /** @type {!jspb$e.exa$codeium_common_pb$CascadeCommandsAutoExecution} */ (jspb_internal_adapters.getEnumFieldWithDefault(this, 1));
  }


  /**
   * @param {!jspb$e.exa$codeium_common_pb$CascadeCommandsAutoExecution|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  setAutoExecutionPolicy(value) {
    return jspb_internal_adapters.setProto3EnumField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  clearAutoExecutionPolicy() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * optional exa.codeium_common_pb.ArtifactReviewMode artifact_review_mode = 2;
   * @override
   * @return {!jspb$e.exa$codeium_common_pb$ArtifactReviewMode}
   */
  getArtifactReviewMode() {
    return /** @type {!jspb$e.exa$codeium_common_pb$ArtifactReviewMode} */ (jspb_internal_adapters.getEnumFieldWithDefault(this, 2));
  }


  /**
   * @param {!jspb$e.exa$codeium_common_pb$ArtifactReviewMode|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  setArtifactReviewMode(value) {
    return jspb_internal_adapters.setProto3EnumField(this, 2, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  clearArtifactReviewMode() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * optional bool allow_agent_access_non_workspace_files = 3;
   * @override
   * @return {boolean}
   * @deprecated
   */
  getAllowAgentAccessNonWorkspaceFiles() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 3);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   * @deprecated
   */
  setAllowAgentAccessNonWorkspaceFiles(value) {
    return jspb_internal_adapters.setBooleanField(this, 3, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   * @deprecated
   */
  clearAllowAgentAccessNonWorkspaceFiles() {
    return jspb_internal_adapters.clearField(this, 3);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   * @deprecated
   */
  hasAllowAgentAccessNonWorkspaceFiles() {
    return jspb_internal_adapters.hasBooleanField(this, 3);
  }


  /**
   * optional bool allow_agent_access_non_workspace_files = 3;
   * @override
   * @return {boolean|undefined}
   * @deprecated
   */
  getAllowAgentAccessNonWorkspaceFilesOrUndefined() {
    return jspb_internal_adapters.getBooleanFieldOrUndefined(this, 3);
  }


  /**
   * repeated string allowed_commands = 4;
   * @override
   * @param {!jspb_internal_public_for_gencode.DoNotFreezeToken=} freezeOptOut
   * @tsType (freezeOptOut: import('google3/javascript/apps/jspb/internal_public').DoNotFreezeToken): string[]
   * @tsType (): readonly string[]
   * @return {!ReadonlyArray<string>}
   * @deprecated
   */
  getAllowedCommandsList(freezeOptOut) {
    return jspb_internal_adapters.getRepeatedStringField(this, 4, jspb_internal_adapters.getRepeatedFieldReturnType(freezeOptOut));
  }


  /**
   * @param {!ReadonlyArray<string>|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   * @deprecated
   */
  setAllowedCommandsList(value) {
    return jspb_internal_adapters.setRepeatedStringField(this, 4, value);
  }


  /**
   * @param {string} value
   * @param {number=} index
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   * @deprecated
   */
  addAllowedCommands(value, index) {
    return jspb_internal_adapters.addToRepeatedStringField(this, 4, value, index);
  }


  /**
   * @param {!Iterable<string>} values
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   * @deprecated
   */
  addAllAllowedCommands(values) {
    return jspb_internal_adapters.addAllToRepeatedStringField(this, 4, values);
  }


  /**
   * @param {number=} index If not passed, defaults to the end.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   * @deprecated
   */
  removeAllowedCommands(index) {
    return jspb_internal_adapters.removeFromRepeatedStringField(this, 4, index);
  }


  /**
   * Returns value at `index`.
   * @override
   * @param {number} index
   * @return {string}
   * @deprecated
   */
  getAllowedCommands(index) {
   return jspb_internal_adapters.getRepeatedIndexedStringField(this, 4, index);
  }


  /**
   * @param {number} index
   * @param {string} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   * @deprecated
   */
  setAllowedCommands(index, value) {
    return jspb_internal_adapters.setRepeatedIndexedStringField(this, 4, index, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   * @deprecated
   */
  clearAllowedCommandsList() {
    return jspb_internal_adapters.clearField(this, 4);
  }


  /**
   * Returns the size of this field.
   * @override
   * @return {number}
   * @deprecated
   */
  getAllowedCommandsCount() {
    return jspb_internal_adapters.getRepeatedStringCount(this, 4);
  }


  /**
   * repeated string denied_commands = 5;
   * @override
   * @param {!jspb_internal_public_for_gencode.DoNotFreezeToken=} freezeOptOut
   * @tsType (freezeOptOut: import('google3/javascript/apps/jspb/internal_public').DoNotFreezeToken): string[]
   * @tsType (): readonly string[]
   * @return {!ReadonlyArray<string>}
   * @deprecated
   */
  getDeniedCommandsList(freezeOptOut) {
    return jspb_internal_adapters.getRepeatedStringField(this, 5, jspb_internal_adapters.getRepeatedFieldReturnType(freezeOptOut));
  }


  /**
   * @param {!ReadonlyArray<string>|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   * @deprecated
   */
  setDeniedCommandsList(value) {
    return jspb_internal_adapters.setRepeatedStringField(this, 5, value);
  }


  /**
   * @param {string} value
   * @param {number=} index
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   * @deprecated
   */
  addDeniedCommands(value, index) {
    return jspb_internal_adapters.addToRepeatedStringField(this, 5, value, index);
  }


  /**
   * @param {!Iterable<string>} values
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   * @deprecated
   */
  addAllDeniedCommands(values) {
    return jspb_internal_adapters.addAllToRepeatedStringField(this, 5, values);
  }


  /**
   * @param {number=} index If not passed, defaults to the end.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   * @deprecated
   */
  removeDeniedCommands(index) {
    return jspb_internal_adapters.removeFromRepeatedStringField(this, 5, index);
  }


  /**
   * Returns value at `index`.
   * @override
   * @param {number} index
   * @return {string}
   * @deprecated
   */
  getDeniedCommands(index) {
   return jspb_internal_adapters.getRepeatedIndexedStringField(this, 5, index);
  }


  /**
   * @param {number} index
   * @param {string} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   * @deprecated
   */
  setDeniedCommands(index, value) {
    return jspb_internal_adapters.setRepeatedIndexedStringField(this, 5, index, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   * @deprecated
   */
  clearDeniedCommandsList() {
    return jspb_internal_adapters.clearField(this, 5);
  }


  /**
   * Returns the size of this field.
   * @override
   * @return {number}
   * @deprecated
   */
  getDeniedCommandsCount() {
    return jspb_internal_adapters.getRepeatedStringCount(this, 5);
  }


  /**
   * optional exa.codeium_common_pb.PlanningMode planning_mode = 6;
   * @override
   * @return {!jspb$e.exa$codeium_common_pb$PlanningMode}
   * @deprecated
   */
  getPlanningMode() {
    return /** @type {!jspb$e.exa$codeium_common_pb$PlanningMode} */ (jspb_internal_adapters.getEnumFieldWithDefault(this, 6));
  }


  /**
   * @param {!jspb$e.exa$codeium_common_pb$PlanningMode|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   * @deprecated
   */
  setPlanningMode(value) {
    return jspb_internal_adapters.setProto3EnumField(this, 6, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   * @deprecated
   */
  clearPlanningMode() {
    return jspb_internal_adapters.clearField(this, 6);
  }


  /**
   * optional bool secure_mode_enabled = 7;
   * @override
   * @return {boolean}
   * @deprecated
   */
  getSecureModeEnabled() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 7);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   * @deprecated
   */
  setSecureModeEnabled(value) {
    return jspb_internal_adapters.setBooleanField(this, 7, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   * @deprecated
   */
  clearSecureModeEnabled() {
    return jspb_internal_adapters.clearField(this, 7);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   * @deprecated
   */
  hasSecureModeEnabled() {
    return jspb_internal_adapters.hasBooleanField(this, 7);
  }


  /**
   * optional bool secure_mode_enabled = 7;
   * @override
   * @return {boolean|undefined}
   * @deprecated
   */
  getSecureModeEnabledOrUndefined() {
    return jspb_internal_adapters.getBooleanFieldOrUndefined(this, 7);
  }


  /**
   * optional bool allow_cascade_access_gitignore_files = 8;
   * @override
   * @return {boolean}
   * @deprecated
   */
  getAllowCascadeAccessGitignoreFiles() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 8);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   * @deprecated
   */
  setAllowCascadeAccessGitignoreFiles(value) {
    return jspb_internal_adapters.setBooleanField(this, 8, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   * @deprecated
   */
  clearAllowCascadeAccessGitignoreFiles() {
    return jspb_internal_adapters.clearField(this, 8);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   * @deprecated
   */
  hasAllowCascadeAccessGitignoreFiles() {
    return jspb_internal_adapters.hasBooleanField(this, 8);
  }


  /**
   * optional bool allow_cascade_access_gitignore_files = 8;
   * @override
   * @return {boolean|undefined}
   * @deprecated
   */
  getAllowCascadeAccessGitignoreFilesOrUndefined() {
    return jspb_internal_adapters.getBooleanFieldOrUndefined(this, 8);
  }


  /**
   * optional bool enable_terminal_sandbox = 9;
   * @override
   * @return {boolean}
   */
  getEnableTerminalSandbox() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 9);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  setEnableTerminalSandbox(value) {
    return jspb_internal_adapters.setBooleanField(this, 9, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  clearEnableTerminalSandbox() {
    return jspb_internal_adapters.clearField(this, 9);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasEnableTerminalSandbox() {
    return jspb_internal_adapters.hasBooleanField(this, 9);
  }


  /**
   * optional bool enable_terminal_sandbox = 9;
   * @override
   * @return {boolean|undefined}
   */
  getEnableTerminalSandboxOrUndefined() {
    return jspb_internal_adapters.getBooleanFieldOrUndefined(this, 9);
  }


  /**
   * optional bool disable_default_customizations = 10;
   * @override
   * @return {boolean}
   */
  getDisableDefaultCustomizations() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 10);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  setDisableDefaultCustomizations(value) {
    return jspb_internal_adapters.setBooleanField(this, 10, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  clearDisableDefaultCustomizations() {
    return jspb_internal_adapters.clearField(this, 10);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasDisableDefaultCustomizations() {
    return jspb_internal_adapters.hasBooleanField(this, 10);
  }


  /**
   * optional bool disable_default_customizations = 10;
   * @override
   * @return {boolean|undefined}
   */
  getDisableDefaultCustomizationsOrUndefined() {
    return jspb_internal_adapters.getBooleanFieldOrUndefined(this, 10);
  }


  /**
   * optional exa.codeium_common_pb.PermissionGrantsConfig global_permission_grants = 11;
   * @override
   * @return {!jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig|undefined}
   */
  getGlobalPermissionGrants() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig, 11);
  }


  /**
   * optional exa.codeium_common_pb.PermissionGrantsConfig global_permission_grants = 11;
   * @override
   * @return {!jspb$ro.exa$codeium_common_pb$ReadonlyPermissionGrantsConfig}
   */
  getReadonlyGlobalPermissionGrants() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig, 11);
  }


  /**
   * optional exa.codeium_common_pb.PermissionGrantsConfig global_permission_grants = 11;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig
   */
  getMutableGlobalPermissionGrants(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig, 11, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.exa$codeium_common_pb$ReadonlyPermissionGrantsConfig|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  setGlobalPermissionGrants(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig, 11, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  clearGlobalPermissionGrants() {
    return jspb_internal_adapters.clearField(this, 11);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasGlobalPermissionGrants() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig, 11);
  }


  /**
   * optional exa.codeium_common_pb.PermissionGrantsConfig global_permission_grants = 11;
   * @override
   * @return {!jspb$ro.exa$codeium_common_pb$ReadonlyPermissionGrantsConfig|undefined}
   */
  getGlobalPermissionGrantsOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig, 11);
  }


  /**
   * optional AgentEnvironment agent_environment = 12;
   * @override
   * @return {!jspb$e.jetbox_state_pb$AgentEnvironment}
   */
  getAgentEnvironment() {
    return /** @type {!jspb$e.jetbox_state_pb$AgentEnvironment} */ (jspb_internal_adapters.getEnumFieldWithDefault(this, 12));
  }


  /**
   * @param {!jspb$e.jetbox_state_pb$AgentEnvironment|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  setAgentEnvironment(value) {
    return jspb_internal_adapters.setEnumField(this, 12, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  clearAgentEnvironment() {
    return jspb_internal_adapters.clearField(this, 12);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasAgentEnvironment() {
    return jspb_internal_adapters.hasEnumField(this, 12);
  }


  /**
   * optional AgentEnvironment agent_environment = 12;
   * @override
   * @return {!jspb$e.jetbox_state_pb$AgentEnvironment|undefined}
   */
  getAgentEnvironmentOrUndefined() {
    return /** @type {!jspb$e.jetbox_state_pb$AgentEnvironment|undefined} */ (jspb_internal_adapters.getEnumFieldOrUndefined(this, 12));
  }


  /**
   * optional bool verbose_agent_chat = 13;
   * @override
   * @return {boolean}
   */
  getVerboseAgentChat() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 13);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  setVerboseAgentChat(value) {
    return jspb_internal_adapters.setBooleanField(this, 13, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  clearVerboseAgentChat() {
    return jspb_internal_adapters.clearField(this, 13);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasVerboseAgentChat() {
    return jspb_internal_adapters.hasBooleanField(this, 13);
  }


  /**
   * optional bool verbose_agent_chat = 13;
   * @override
   * @return {boolean|undefined}
   */
  getVerboseAgentChatOrUndefined() {
    return jspb_internal_adapters.getBooleanFieldOrUndefined(this, 13);
  }


  /**
   * optional bool sandbox_allow_network = 14;
   * @override
   * @return {boolean}
   */
  getSandboxAllowNetwork() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 14);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  setSandboxAllowNetwork(value) {
    return jspb_internal_adapters.setBooleanField(this, 14, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  clearSandboxAllowNetwork() {
    return jspb_internal_adapters.clearField(this, 14);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasSandboxAllowNetwork() {
    return jspb_internal_adapters.hasBooleanField(this, 14);
  }


  /**
   * optional bool sandbox_allow_network = 14;
   * @override
   * @return {boolean|undefined}
   */
  getSandboxAllowNetworkOrUndefined() {
    return jspb_internal_adapters.getBooleanFieldOrUndefined(this, 14);
  }


  /**
   * optional exa.codeium_common_pb.AgentSettingPolicy non_workspace_file_access_policy = 17;
   * @override
   * @return {!jspb$e.exa$codeium_common_pb$AgentSettingPolicy}
   */
  getNonWorkspaceFileAccessPolicy() {
    return /** @type {!jspb$e.exa$codeium_common_pb$AgentSettingPolicy} */ (jspb_internal_adapters.getEnumFieldWithDefault(this, 17));
  }


  /**
   * @param {!jspb$e.exa$codeium_common_pb$AgentSettingPolicy|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  setNonWorkspaceFileAccessPolicy(value) {
    return jspb_internal_adapters.setEnumField(this, 17, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  clearNonWorkspaceFileAccessPolicy() {
    return jspb_internal_adapters.clearField(this, 17);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasNonWorkspaceFileAccessPolicy() {
    return jspb_internal_adapters.hasEnumField(this, 17);
  }


  /**
   * optional exa.codeium_common_pb.AgentSettingPolicy non_workspace_file_access_policy = 17;
   * @override
   * @return {!jspb$e.exa$codeium_common_pb$AgentSettingPolicy|undefined}
   */
  getNonWorkspaceFileAccessPolicyOrUndefined() {
    return /** @type {!jspb$e.exa$codeium_common_pb$AgentSettingPolicy|undefined} */ (jspb_internal_adapters.getEnumFieldOrUndefined(this, 17));
  }


  /**
   * optional exa.codeium_common_pb.AgentSettingPolicy internet_access_policy = 18;
   * @override
   * @return {!jspb$e.exa$codeium_common_pb$AgentSettingPolicy}
   */
  getInternetAccessPolicy() {
    return /** @type {!jspb$e.exa$codeium_common_pb$AgentSettingPolicy} */ (jspb_internal_adapters.getEnumFieldWithDefault(this, 18));
  }


  /**
   * @param {!jspb$e.exa$codeium_common_pb$AgentSettingPolicy|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  setInternetAccessPolicy(value) {
    return jspb_internal_adapters.setEnumField(this, 18, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  clearInternetAccessPolicy() {
    return jspb_internal_adapters.clearField(this, 18);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasInternetAccessPolicy() {
    return jspb_internal_adapters.hasEnumField(this, 18);
  }


  /**
   * optional exa.codeium_common_pb.AgentSettingPolicy internet_access_policy = 18;
   * @override
   * @return {!jspb$e.exa$codeium_common_pb$AgentSettingPolicy|undefined}
   */
  getInternetAccessPolicyOrUndefined() {
    return /** @type {!jspb$e.exa$codeium_common_pb$AgentSettingPolicy|undefined} */ (jspb_internal_adapters.getEnumFieldOrUndefined(this, 18));
  }


  /**
   * optional bool allow_agent_access_gitignore_files = 19;
   * @override
   * @return {boolean}
   * @deprecated
   */
  getAllowAgentAccessGitignoreFiles() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 19);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   * @deprecated
   */
  setAllowAgentAccessGitignoreFiles(value) {
    return jspb_internal_adapters.setBooleanField(this, 19, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   * @deprecated
   */
  clearAllowAgentAccessGitignoreFiles() {
    return jspb_internal_adapters.clearField(this, 19);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   * @deprecated
   */
  hasAllowAgentAccessGitignoreFiles() {
    return jspb_internal_adapters.hasBooleanField(this, 19);
  }


  /**
   * optional bool allow_agent_access_gitignore_files = 19;
   * @override
   * @return {boolean|undefined}
   * @deprecated
   */
  getAllowAgentAccessGitignoreFilesOrUndefined() {
    return jspb_internal_adapters.getBooleanFieldOrUndefined(this, 19);
  }


  /**
   * optional ThemeMode theme_mode = 20;
   * @override
   * @return {!jspb$e.jetbox_state_pb$ThemeMode}
   */
  getThemeMode() {
    return /** @type {!jspb$e.jetbox_state_pb$ThemeMode} */ (jspb_internal_adapters.getEnumFieldWithDefault(this, 20));
  }


  /**
   * @param {!jspb$e.jetbox_state_pb$ThemeMode|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  setThemeMode(value) {
    return jspb_internal_adapters.setProto3EnumField(this, 20, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  clearThemeMode() {
    return jspb_internal_adapters.clearField(this, 20);
  }


  /**
   * optional CustomThemeSeeds custom_theme_seeds_light = 21;
   * @override
   * @return {!jspb$jetbox_state_pb$MutableCustomThemeSeeds|undefined}
   */
  getCustomThemeSeedsLight() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$jetbox_state_pb$MutableCustomThemeSeeds, 21);
  }


  /**
   * optional CustomThemeSeeds custom_theme_seeds_light = 21;
   * @override
   * @return {!jspb$ro.jetbox_state_pb$ReadonlyCustomThemeSeeds}
   */
  getReadonlyCustomThemeSeedsLight() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$jetbox_state_pb$MutableCustomThemeSeeds, 21);
  }


  /**
   * optional CustomThemeSeeds custom_theme_seeds_light = 21;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$jetbox_state_pb$MutableCustomThemeSeeds|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$jetbox_state_pb$MutableCustomThemeSeeds') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableCustomThemeSeeds|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableCustomThemeSeeds
   */
  getMutableCustomThemeSeedsLight(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$jetbox_state_pb$MutableCustomThemeSeeds, 21, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.jetbox_state_pb$ReadonlyCustomThemeSeeds|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  setCustomThemeSeedsLight(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$jetbox_state_pb$MutableCustomThemeSeeds, 21, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  clearCustomThemeSeedsLight() {
    return jspb_internal_adapters.clearField(this, 21);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasCustomThemeSeedsLight() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$jetbox_state_pb$MutableCustomThemeSeeds, 21);
  }


  /**
   * optional CustomThemeSeeds custom_theme_seeds_light = 21;
   * @override
   * @return {!jspb$ro.jetbox_state_pb$ReadonlyCustomThemeSeeds|undefined}
   */
  getCustomThemeSeedsLightOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$jetbox_state_pb$MutableCustomThemeSeeds, 21);
  }


  /**
   * optional CustomThemeSeeds custom_theme_seeds_dark = 22;
   * @override
   * @return {!jspb$jetbox_state_pb$MutableCustomThemeSeeds|undefined}
   */
  getCustomThemeSeedsDark() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$jetbox_state_pb$MutableCustomThemeSeeds, 22);
  }


  /**
   * optional CustomThemeSeeds custom_theme_seeds_dark = 22;
   * @override
   * @return {!jspb$ro.jetbox_state_pb$ReadonlyCustomThemeSeeds}
   */
  getReadonlyCustomThemeSeedsDark() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$jetbox_state_pb$MutableCustomThemeSeeds, 22);
  }


  /**
   * optional CustomThemeSeeds custom_theme_seeds_dark = 22;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$jetbox_state_pb$MutableCustomThemeSeeds|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$jetbox_state_pb$MutableCustomThemeSeeds') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableCustomThemeSeeds|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableCustomThemeSeeds
   */
  getMutableCustomThemeSeedsDark(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$jetbox_state_pb$MutableCustomThemeSeeds, 22, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.jetbox_state_pb$ReadonlyCustomThemeSeeds|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  setCustomThemeSeedsDark(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$jetbox_state_pb$MutableCustomThemeSeeds, 22, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  clearCustomThemeSeedsDark() {
    return jspb_internal_adapters.clearField(this, 22);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasCustomThemeSeedsDark() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$jetbox_state_pb$MutableCustomThemeSeeds, 22);
  }


  /**
   * optional CustomThemeSeeds custom_theme_seeds_dark = 22;
   * @override
   * @return {!jspb$ro.jetbox_state_pb$ReadonlyCustomThemeSeeds|undefined}
   */
  getCustomThemeSeedsDarkOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$jetbox_state_pb$MutableCustomThemeSeeds, 22);
  }


  /**
   * optional exa.codeium_common_pb.BrowserJsExecutionPolicy browser_js_execution_policy = 23;
   * @override
   * @return {!jspb$e.exa$codeium_common_pb$BrowserJsExecutionPolicy}
   */
  getBrowserJsExecutionPolicy() {
    return /** @type {!jspb$e.exa$codeium_common_pb$BrowserJsExecutionPolicy} */ (jspb_internal_adapters.getEnumFieldWithDefault(this, 23));
  }


  /**
   * @param {!jspb$e.exa$codeium_common_pb$BrowserJsExecutionPolicy|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  setBrowserJsExecutionPolicy(value) {
    return jspb_internal_adapters.setProto3EnumField(this, 23, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  clearBrowserJsExecutionPolicy() {
    return jspb_internal_adapters.clearField(this, 23);
  }


  /**
   * optional int32 max_cloned_workspaces = 24;
   * @override
   * @return {number}
   */
  getMaxClonedWorkspaces() {
    return jspb_internal_adapters.getInt32FieldWithDefault(this, 24);
  }


  /**
   * @param {number|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  setMaxClonedWorkspaces(value) {
    return jspb_internal_adapters.setInt32Field(this, 24, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  clearMaxClonedWorkspaces() {
    return jspb_internal_adapters.clearField(this, 24);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasMaxClonedWorkspaces() {
    return jspb_internal_adapters.hasInt32Field(this, 24);
  }


  /**
   * optional int32 max_cloned_workspaces = 24;
   * @override
   * @return {number|undefined}
   */
  getMaxClonedWorkspacesOrUndefined() {
    return jspb_internal_adapters.getInt32FieldOrUndefined(this, 24);
  }


  /**
   * optional int32 max_clones_per_workspace = 25;
   * @override
   * @return {number}
   */
  getMaxClonesPerWorkspace() {
    return jspb_internal_adapters.getInt32FieldWithDefault(this, 25);
  }


  /**
   * @param {number|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  setMaxClonesPerWorkspace(value) {
    return jspb_internal_adapters.setInt32Field(this, 25, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  clearMaxClonesPerWorkspace() {
    return jspb_internal_adapters.clearField(this, 25);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasMaxClonesPerWorkspace() {
    return jspb_internal_adapters.hasInt32Field(this, 25);
  }


  /**
   * optional int32 max_clones_per_workspace = 25;
   * @override
   * @return {number|undefined}
   */
  getMaxClonesPerWorkspaceOrUndefined() {
    return jspb_internal_adapters.getInt32FieldOrUndefined(this, 25);
  }


  /**
   * optional bool disable_eager_cloning = 26;
   * @override
   * @return {boolean}
   */
  getDisableEagerCloning() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 26);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  setDisableEagerCloning(value) {
    return jspb_internal_adapters.setBooleanField(this, 26, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  clearDisableEagerCloning() {
    return jspb_internal_adapters.clearField(this, 26);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasDisableEagerCloning() {
    return jspb_internal_adapters.hasBooleanField(this, 26);
  }


  /**
   * optional bool disable_eager_cloning = 26;
   * @override
   * @return {boolean|undefined}
   */
  getDisableEagerCloningOrUndefined() {
    return jspb_internal_adapters.getBooleanFieldOrUndefined(this, 26);
  }


  /**
   * optional string gcp_region = 27;
   * @override
   * @return {string}
   */
  getGcpRegion() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 27);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  setGcpRegion(value) {
    return jspb_internal_adapters.setStringField(this, 27, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  clearGcpRegion() {
    return jspb_internal_adapters.clearField(this, 27);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasGcpRegion() {
    return jspb_internal_adapters.hasStringField(this, 27);
  }


  /**
   * optional string gcp_region = 27;
   * @override
   * @return {string|undefined}
   */
  getGcpRegionOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 27);
  }


  /**
   * optional bool remote_control_enabled = 28;
   * @override
   * @return {boolean}
   */
  getRemoteControlEnabled() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 28);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  setRemoteControlEnabled(value) {
    return jspb_internal_adapters.setBooleanField(this, 28, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  clearRemoteControlEnabled() {
    return jspb_internal_adapters.clearField(this, 28);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasRemoteControlEnabled() {
    return jspb_internal_adapters.hasBooleanField(this, 28);
  }


  /**
   * optional bool remote_control_enabled = 28;
   * @override
   * @return {boolean|undefined}
   */
  getRemoteControlEnabledOrUndefined() {
    return jspb_internal_adapters.getBooleanFieldOrUndefined(this, 28);
  }


  /**
   * optional bool use_ai_credits = 29;
   * @override
   * @return {boolean}
   */
  getUseAiCredits() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 29);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  setUseAiCredits(value) {
    return jspb_internal_adapters.setBooleanField(this, 29, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  clearUseAiCredits() {
    return jspb_internal_adapters.clearField(this, 29);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasUseAiCredits() {
    return jspb_internal_adapters.hasBooleanField(this, 29);
  }


  /**
   * optional bool use_ai_credits = 29;
   * @override
   * @return {boolean|undefined}
   */
  getUseAiCreditsOrUndefined() {
    return jspb_internal_adapters.getBooleanFieldOrUndefined(this, 29);
  }


  /**
   * optional string active_profile = 30;
   * @override
   * @return {string}
   * @deprecated
   */
  getActiveProfile() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 30);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   * @deprecated
   */
  setActiveProfile(value) {
    return jspb_internal_adapters.setStringField(this, 30, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   * @deprecated
   */
  clearActiveProfile() {
    return jspb_internal_adapters.clearField(this, 30);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   * @deprecated
   */
  hasActiveProfile() {
    return jspb_internal_adapters.hasStringField(this, 30);
  }


  /**
   * optional string active_profile = 30;
   * @override
   * @return {string|undefined}
   * @deprecated
   */
  getActiveProfileOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 30);
  }


  /**
   * optional ConversationWidth conversation_width = 31;
   * @override
   * @return {!jspb$e.jetbox_state_pb$ConversationWidth}
   */
  getConversationWidth() {
    return /** @type {!jspb$e.jetbox_state_pb$ConversationWidth} */ (jspb_internal_adapters.getEnumFieldWithDefault(this, 31));
  }


  /**
   * @param {!jspb$e.jetbox_state_pb$ConversationWidth|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  setConversationWidth(value) {
    return jspb_internal_adapters.setEnumField(this, 31, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  clearConversationWidth() {
    return jspb_internal_adapters.clearField(this, 31);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasConversationWidth() {
    return jspb_internal_adapters.hasEnumField(this, 31);
  }


  /**
   * optional ConversationWidth conversation_width = 31;
   * @override
   * @return {!jspb$e.jetbox_state_pb$ConversationWidth|undefined}
   */
  getConversationWidthOrUndefined() {
    return /** @type {!jspb$e.jetbox_state_pb$ConversationWidth|undefined} */ (jspb_internal_adapters.getEnumFieldOrUndefined(this, 31));
  }


  /**
   * optional string remote_control_hostname = 33;
   * @override
   * @return {string}
   */
  getRemoteControlHostname() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 33);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  setRemoteControlHostname(value) {
    return jspb_internal_adapters.setStringField(this, 33, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  clearRemoteControlHostname() {
    return jspb_internal_adapters.clearField(this, 33);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasRemoteControlHostname() {
    return jspb_internal_adapters.hasStringField(this, 33);
  }


  /**
   * optional string remote_control_hostname = 33;
   * @override
   * @return {string|undefined}
   */
  getRemoteControlHostnameOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 33);
  }


  /**
   * optional string cli_remote_control_hostname = 42;
   * @override
   * @return {string}
   */
  getCliRemoteControlHostname() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 42);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  setCliRemoteControlHostname(value) {
    return jspb_internal_adapters.setStringField(this, 42, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  clearCliRemoteControlHostname() {
    return jspb_internal_adapters.clearField(this, 42);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasCliRemoteControlHostname() {
    return jspb_internal_adapters.hasStringField(this, 42);
  }


  /**
   * optional string cli_remote_control_hostname = 42;
   * @override
   * @return {string|undefined}
   */
  getCliRemoteControlHostnameOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 42);
  }


  /**
   * optional exa.cortex_pb.MessageDeliveryStrategy queued_message_delivery_strategy = 34;
   * @override
   * @return {!jspb$e.exa$cortex_pb$MessageDeliveryStrategy}
   */
  getQueuedMessageDeliveryStrategy() {
    return /** @type {!jspb$e.exa$cortex_pb$MessageDeliveryStrategy} */ (jspb_internal_adapters.getEnumFieldWithDefault(this, 34));
  }


  /**
   * @param {!jspb$e.exa$cortex_pb$MessageDeliveryStrategy|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  setQueuedMessageDeliveryStrategy(value) {
    return jspb_internal_adapters.setEnumField(this, 34, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  clearQueuedMessageDeliveryStrategy() {
    return jspb_internal_adapters.clearField(this, 34);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasQueuedMessageDeliveryStrategy() {
    return jspb_internal_adapters.hasEnumField(this, 34);
  }


  /**
   * optional exa.cortex_pb.MessageDeliveryStrategy queued_message_delivery_strategy = 34;
   * @override
   * @return {!jspb$e.exa$cortex_pb$MessageDeliveryStrategy|undefined}
   */
  getQueuedMessageDeliveryStrategyOrUndefined() {
    return /** @type {!jspb$e.exa$cortex_pb$MessageDeliveryStrategy|undefined} */ (jspb_internal_adapters.getEnumFieldOrUndefined(this, 34));
  }


  /**
   * optional GoogleSpecificConfig google_config = 35;
   * @override
   * @return {!jspb$jetbox_state_pb$MutableGoogleSpecificConfig|undefined}
   */
  getGoogleConfig() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$jetbox_state_pb$MutableGoogleSpecificConfig, 35);
  }


  /**
   * optional GoogleSpecificConfig google_config = 35;
   * @override
   * @return {!jspb$ro.jetbox_state_pb$ReadonlyGoogleSpecificConfig}
   */
  getReadonlyGoogleConfig() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$jetbox_state_pb$MutableGoogleSpecificConfig, 35);
  }


  /**
   * optional GoogleSpecificConfig google_config = 35;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$jetbox_state_pb$MutableGoogleSpecificConfig|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$jetbox_state_pb$MutableGoogleSpecificConfig') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableGoogleSpecificConfig|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableGoogleSpecificConfig
   */
  getMutableGoogleConfig(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$jetbox_state_pb$MutableGoogleSpecificConfig, 35, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.jetbox_state_pb$ReadonlyGoogleSpecificConfig|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  setGoogleConfig(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$jetbox_state_pb$MutableGoogleSpecificConfig, 35, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  clearGoogleConfig() {
    return jspb_internal_adapters.clearField(this, 35);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasGoogleConfig() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$jetbox_state_pb$MutableGoogleSpecificConfig, 35);
  }


  /**
   * optional GoogleSpecificConfig google_config = 35;
   * @override
   * @return {!jspb$ro.jetbox_state_pb$ReadonlyGoogleSpecificConfig|undefined}
   */
  getGoogleConfigOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$jetbox_state_pb$MutableGoogleSpecificConfig, 35);
  }


  /**
   * optional bool enable_business_login = 36;
   * @override
   * @return {boolean}
   */
  getEnableBusinessLogin() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 36);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  setEnableBusinessLogin(value) {
    return jspb_internal_adapters.setBooleanField(this, 36, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  clearEnableBusinessLogin() {
    return jspb_internal_adapters.clearField(this, 36);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasEnableBusinessLogin() {
    return jspb_internal_adapters.hasBooleanField(this, 36);
  }


  /**
   * optional bool enable_business_login = 36;
   * @override
   * @return {boolean|undefined}
   */
  getEnableBusinessLoginOrUndefined() {
    return jspb_internal_adapters.getBooleanFieldOrUndefined(this, 36);
  }


  /**
   * optional bool enable_notifications_for_special_events = 37;
   * @override
   * @return {boolean}
   */
  getEnableNotificationsForSpecialEvents() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 37);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  setEnableNotificationsForSpecialEvents(value) {
    return jspb_internal_adapters.setBooleanField(this, 37, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  clearEnableNotificationsForSpecialEvents() {
    return jspb_internal_adapters.clearField(this, 37);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasEnableNotificationsForSpecialEvents() {
    return jspb_internal_adapters.hasBooleanField(this, 37);
  }


  /**
   * optional bool enable_notifications_for_special_events = 37;
   * @override
   * @return {boolean|undefined}
   */
  getEnableNotificationsForSpecialEventsOrUndefined() {
    return jspb_internal_adapters.getBooleanFieldOrUndefined(this, 37);
  }


  /**
   * optional bool enable_personal_customizations = 38;
   * @override
   * @return {boolean}
   * @deprecated
   */
  getEnablePersonalCustomizations() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 38);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   * @deprecated
   */
  setEnablePersonalCustomizations(value) {
    return jspb_internal_adapters.setBooleanField(this, 38, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   * @deprecated
   */
  clearEnablePersonalCustomizations() {
    return jspb_internal_adapters.clearField(this, 38);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   * @deprecated
   */
  hasEnablePersonalCustomizations() {
    return jspb_internal_adapters.hasBooleanField(this, 38);
  }


  /**
   * optional bool enable_personal_customizations = 38;
   * @override
   * @return {boolean|undefined}
   * @deprecated
   */
  getEnablePersonalCustomizationsOrUndefined() {
    return jspb_internal_adapters.getBooleanFieldOrUndefined(this, 38);
  }


  /**
   * optional string shell_setup_script = 39;
   * @override
   * @return {string}
   */
  getShellSetupScript() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 39);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  setShellSetupScript(value) {
    return jspb_internal_adapters.setStringField(this, 39, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  clearShellSetupScript() {
    return jspb_internal_adapters.clearField(this, 39);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasShellSetupScript() {
    return jspb_internal_adapters.hasStringField(this, 39);
  }


  /**
   * optional string shell_setup_script = 39;
   * @override
   * @return {string|undefined}
   */
  getShellSetupScriptOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 39);
  }


  /**
   * optional bool enable_sounds_for_special_events = 40;
   * @override
   * @return {boolean}
   */
  getEnableSoundsForSpecialEvents() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 40);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  setEnableSoundsForSpecialEvents(value) {
    return jspb_internal_adapters.setBooleanField(this, 40, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  clearEnableSoundsForSpecialEvents() {
    return jspb_internal_adapters.clearField(this, 40);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasEnableSoundsForSpecialEvents() {
    return jspb_internal_adapters.hasBooleanField(this, 40);
  }


  /**
   * optional bool enable_sounds_for_special_events = 40;
   * @override
   * @return {boolean|undefined}
   */
  getEnableSoundsForSpecialEventsOrUndefined() {
    return jspb_internal_adapters.getBooleanFieldOrUndefined(this, 40);
  }


  /**
   * optional exa.codeium_common_pb.AgentPermissionPreset permission_preset = 41;
   * @override
   * @return {!jspb$e.exa$codeium_common_pb$AgentPermissionPreset}
   */
  getPermissionPreset() {
    return /** @type {!jspb$e.exa$codeium_common_pb$AgentPermissionPreset} */ (jspb_internal_adapters.getEnumFieldWithDefault(this, 41));
  }


  /**
   * @param {!jspb$e.exa$codeium_common_pb$AgentPermissionPreset|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  setPermissionPreset(value) {
    return jspb_internal_adapters.setProto3EnumField(this, 41, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  clearPermissionPreset() {
    return jspb_internal_adapters.clearField(this, 41);
  }


  /**
   * optional bool enable_adc = 43;
   * @override
   * @return {boolean}
   */
  getEnableAdc() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 43);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  setEnableAdc(value) {
    return jspb_internal_adapters.setBooleanField(this, 43, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  clearEnableAdc() {
    return jspb_internal_adapters.clearField(this, 43);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasEnableAdc() {
    return jspb_internal_adapters.hasBooleanField(this, 43);
  }


  /**
   * optional bool enable_adc = 43;
   * @override
   * @return {boolean|undefined}
   */
  getEnableAdcOrUndefined() {
    return jspb_internal_adapters.getBooleanFieldOrUndefined(this, 43);
  }


  /**
   * optional bool permission_grants_v2_migrated = 44;
   * @override
   * @return {boolean}
   */
  getPermissionGrantsV2Migrated() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 44);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  setPermissionGrantsV2Migrated(value) {
    return jspb_internal_adapters.setBooleanField(this, 44, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  clearPermissionGrantsV2Migrated() {
    return jspb_internal_adapters.clearField(this, 44);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasPermissionGrantsV2Migrated() {
    return jspb_internal_adapters.hasBooleanField(this, 44);
  }


  /**
   * optional bool permission_grants_v2_migrated = 44;
   * @override
   * @return {boolean|undefined}
   */
  getPermissionGrantsV2MigratedOrUndefined() {
    return jspb_internal_adapters.getBooleanFieldOrUndefined(this, 44);
  }


  /**
   * optional bool sandbox_enabled_at_v2_migration = 45;
   * @override
   * @return {boolean}
   */
  getSandboxEnabledAtV2Migration() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 45);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  setSandboxEnabledAtV2Migration(value) {
    return jspb_internal_adapters.setBooleanField(this, 45, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  clearSandboxEnabledAtV2Migration() {
    return jspb_internal_adapters.clearField(this, 45);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasSandboxEnabledAtV2Migration() {
    return jspb_internal_adapters.hasBooleanField(this, 45);
  }


  /**
   * optional bool sandbox_enabled_at_v2_migration = 45;
   * @override
   * @return {boolean|undefined}
   */
  getSandboxEnabledAtV2MigrationOrUndefined() {
    return jspb_internal_adapters.getBooleanFieldOrUndefined(this, 45);
  }


  /**
   * optional string vertex_service_tier = 46;
   * @override
   * @return {string}
   */
  getVertexServiceTier() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 46);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  setVertexServiceTier(value) {
    return jspb_internal_adapters.setStringField(this, 46, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  clearVertexServiceTier() {
    return jspb_internal_adapters.clearField(this, 46);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasVertexServiceTier() {
    return jspb_internal_adapters.hasStringField(this, 46);
  }


  /**
   * optional string vertex_service_tier = 46;
   * @override
   * @return {string|undefined}
   */
  getVertexServiceTierOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 46);
  }


  /**
   * optional SandboxProxy sandbox_proxy = 47;
   * @override
   * @return {!jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy|undefined}
   */
  getSandboxProxy() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy, 47);
  }


  /**
   * optional SandboxProxy sandbox_proxy = 47;
   * @override
   * @return {!jspb$ro.jetbox_state_pb$UserSettings$ReadonlySandboxProxy}
   */
  getReadonlySandboxProxy() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy, 47);
  }


  /**
   * optional SandboxProxy sandbox_proxy = 47;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy
   */
  getMutableSandboxProxy(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy, 47, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.jetbox_state_pb$UserSettings$ReadonlySandboxProxy|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  setSandboxProxy(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy, 47, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  clearSandboxProxy() {
    return jspb_internal_adapters.clearField(this, 47);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasSandboxProxy() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy, 47);
  }


  /**
   * optional SandboxProxy sandbox_proxy = 47;
   * @override
   * @return {!jspb$ro.jetbox_state_pb$UserSettings$ReadonlySandboxProxy|undefined}
   */
  getSandboxProxyOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy, 47);
  }


  /**
   * optional TerminalPlacement terminal_placement = 48;
   * @override
   * @return {!jspb$e.jetbox_state_pb$TerminalPlacement}
   */
  getTerminalPlacement() {
    return /** @type {!jspb$e.jetbox_state_pb$TerminalPlacement} */ (jspb_internal_adapters.getEnumFieldWithDefault(this, 48));
  }


  /**
   * @param {!jspb$e.jetbox_state_pb$TerminalPlacement|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  setTerminalPlacement(value) {
    return jspb_internal_adapters.setEnumField(this, 48, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  clearTerminalPlacement() {
    return jspb_internal_adapters.clearField(this, 48);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasTerminalPlacement() {
    return jspb_internal_adapters.hasEnumField(this, 48);
  }


  /**
   * optional TerminalPlacement terminal_placement = 48;
   * @override
   * @return {!jspb$e.jetbox_state_pb$TerminalPlacement|undefined}
   */
  getTerminalPlacementOrUndefined() {
    return /** @type {!jspb$e.jetbox_state_pb$TerminalPlacement|undefined} */ (jspb_internal_adapters.getEnumFieldOrUndefined(this, 48));
  }


  /**
   * optional int32 agent_sound_volume = 49;
   * @override
   * @return {number}
   */
  getAgentSoundVolume() {
    return jspb_internal_adapters.getInt32FieldWithDefault(this, 49);
  }


  /**
   * @param {number|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  setAgentSoundVolume(value) {
    return jspb_internal_adapters.setInt32Field(this, 49, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableUserSettings} returns this
   */
  clearAgentSoundVolume() {
    return jspb_internal_adapters.clearField(this, 49);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasAgentSoundVolume() {
    return jspb_internal_adapters.hasInt32Field(this, 49);
  }


  /**
   * optional int32 agent_sound_volume = 49;
   * @override
   * @return {number|undefined}
   */
  getAgentSoundVolumeOrUndefined() {
    return jspb_internal_adapters.getInt32FieldOrUndefined(this, 49);
  }


};

/**
 * @override
 * @return {!jspb$jetbox_state_pb$ImmutableUserSettings}
 */
jspb$jetbox_state_pb$MutableUserSettings.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$jetbox_state_pb$MutableUserSettings}
 */
jspb$jetbox_state_pb$MutableUserSettings.prototype.clone;
/**
 * @const {function(string):!jspb$jetbox_state_pb$MutableUserSettings}
 */
jspb$jetbox_state_pb$MutableUserSettings.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$jetbox_state_pb$MutableUserSettings));

/**
 * Returns whether the given value is an instance of jspb$jetbox_state_pb$MutableUserSettings.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$jetbox_state_pb$MutableUserSettings>}
 */
jspb$jetbox_state_pb$MutableUserSettings.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$jetbox_state_pb$MutableUserSettings));

/**
 * Object form of UserSettings as accepted by the `fromObject` method.
 * @typedef {{
 *  autoExecutionPolicy: (?number|undefined),
 *  artifactReviewMode: (?number|undefined),
 *  allowAgentAccessNonWorkspaceFiles: (?boolean|undefined),
 *  allowedCommandsList: (?Array<string>|undefined),
 *  deniedCommandsList: (?Array<string>|undefined),
 *  planningMode: (?number|undefined),
 *  secureModeEnabled: (?boolean|undefined),
 *  allowCascadeAccessGitignoreFiles: (?boolean|undefined),
 *  enableTerminalSandbox: (?boolean|undefined),
 *  disableDefaultCustomizations: (?boolean|undefined),
 *  globalPermissionGrants: (?jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig.ObjectFormat|undefined),
 *  agentEnvironment: (?number|undefined),
 *  verboseAgentChat: (?boolean|undefined),
 *  sandboxAllowNetwork: (?boolean|undefined),
 *  nonWorkspaceFileAccessPolicy: (?number|undefined),
 *  internetAccessPolicy: (?number|undefined),
 *  allowAgentAccessGitignoreFiles: (?boolean|undefined),
 *  themeMode: (?number|undefined),
 *  customThemeSeedsLight: (?jspb$jetbox_state_pb$MutableCustomThemeSeeds.ObjectFormat|undefined),
 *  customThemeSeedsDark: (?jspb$jetbox_state_pb$MutableCustomThemeSeeds.ObjectFormat|undefined),
 *  browserJsExecutionPolicy: (?number|undefined),
 *  maxClonedWorkspaces: (?number|undefined),
 *  maxClonesPerWorkspace: (?number|undefined),
 *  disableEagerCloning: (?boolean|undefined),
 *  gcpRegion: (?string|undefined),
 *  remoteControlEnabled: (?boolean|undefined),
 *  useAiCredits: (?boolean|undefined),
 *  activeProfile: (?string|undefined),
 *  conversationWidth: (?number|undefined),
 *  remoteControlHostname: (?string|undefined),
 *  cliRemoteControlHostname: (?string|undefined),
 *  queuedMessageDeliveryStrategy: (?number|undefined),
 *  googleConfig: (?jspb$jetbox_state_pb$MutableGoogleSpecificConfig.ObjectFormat|undefined),
 *  enableBusinessLogin: (?boolean|undefined),
 *  enableNotificationsForSpecialEvents: (?boolean|undefined),
 *  enablePersonalCustomizations: (?boolean|undefined),
 *  shellSetupScript: (?string|undefined),
 *  enableSoundsForSpecialEvents: (?boolean|undefined),
 *  permissionPreset: (?number|undefined),
 *  enableAdc: (?boolean|undefined),
 *  permissionGrantsV2Migrated: (?boolean|undefined),
 *  sandboxEnabledAtV2Migration: (?boolean|undefined),
 *  vertexServiceTier: (?string|undefined),
 *  sandboxProxy: (?jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy.ObjectFormat|undefined),
 *  terminalPlacement: (?number|undefined),
 *  agentSoundVolume: (?number|undefined)
 * }}
 */
jspb$jetbox_state_pb$MutableUserSettings.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$jetbox_state_pb$MutableUserSettings.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$jetbox_state_pb$MutableUserSettings.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$jetbox_state_pb$MutableUserSettings.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for jetbox_state_pb$MutableUserSettings.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$jetbox_state_pb$MutableUserSettings.internalDoNotUse_debugOnlyProtoTypeName = "jetbox_state_pb.UserSettings";
}

/**
 * @typedef {!jspb$jetbox_state_pb$ImmutableUserSettings|!jspb$jetbox_state_pb$MutableUserSettings}
 */
jspb$ro.jetbox_state_pb$ReadonlyUserSettings = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'jetbox_state_pb.UserSettings'}
   */
  jspb$jetbox_state_pb$MutableUserSettings.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$jetbox_state_pb$MutableUserSettings.displayName = 'proto.jetbox_state_pb.UserSettings';
}
/**
 * Interface form of UserSettings as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  autoExecutionPolicy: (!jspb$e.exa$codeium_common_pb$CascadeCommandsAutoExecution|undefined),
 *  artifactReviewMode: (!jspb$e.exa$codeium_common_pb$ArtifactReviewMode|undefined),
 *  allowAgentAccessNonWorkspaceFiles: (boolean|undefined),
 *  allowedCommandsList: (!ReadonlyArray<string>|undefined),
 *  deniedCommandsList: (!ReadonlyArray<string>|undefined),
 *  planningMode: (!jspb$e.exa$codeium_common_pb$PlanningMode|undefined),
 *  secureModeEnabled: (boolean|undefined),
 *  allowCascadeAccessGitignoreFiles: (boolean|undefined),
 *  enableTerminalSandbox: (boolean|undefined),
 *  disableDefaultCustomizations: (boolean|undefined),
 *  globalPermissionGrants: (!jspb$ro.exa$codeium_common_pb$ReadonlyPermissionGrantsConfig|undefined),
 *  agentEnvironment: (!jspb$e.jetbox_state_pb$AgentEnvironment|undefined),
 *  verboseAgentChat: (boolean|undefined),
 *  sandboxAllowNetwork: (boolean|undefined),
 *  nonWorkspaceFileAccessPolicy: (!jspb$e.exa$codeium_common_pb$AgentSettingPolicy|undefined),
 *  internetAccessPolicy: (!jspb$e.exa$codeium_common_pb$AgentSettingPolicy|undefined),
 *  allowAgentAccessGitignoreFiles: (boolean|undefined),
 *  themeMode: (!jspb$e.jetbox_state_pb$ThemeMode|undefined),
 *  customThemeSeedsLight: (!jspb$ro.jetbox_state_pb$ReadonlyCustomThemeSeeds|undefined),
 *  customThemeSeedsDark: (!jspb$ro.jetbox_state_pb$ReadonlyCustomThemeSeeds|undefined),
 *  browserJsExecutionPolicy: (!jspb$e.exa$codeium_common_pb$BrowserJsExecutionPolicy|undefined),
 *  maxClonedWorkspaces: (number|undefined),
 *  maxClonesPerWorkspace: (number|undefined),
 *  disableEagerCloning: (boolean|undefined),
 *  gcpRegion: (string|undefined),
 *  remoteControlEnabled: (boolean|undefined),
 *  useAiCredits: (boolean|undefined),
 *  activeProfile: (string|undefined),
 *  conversationWidth: (!jspb$e.jetbox_state_pb$ConversationWidth|undefined),
 *  remoteControlHostname: (string|undefined),
 *  cliRemoteControlHostname: (string|undefined),
 *  queuedMessageDeliveryStrategy: (!jspb$e.exa$cortex_pb$MessageDeliveryStrategy|undefined),
 *  googleConfig: (!jspb$ro.jetbox_state_pb$ReadonlyGoogleSpecificConfig|undefined),
 *  enableBusinessLogin: (boolean|undefined),
 *  enableNotificationsForSpecialEvents: (boolean|undefined),
 *  enablePersonalCustomizations: (boolean|undefined),
 *  shellSetupScript: (string|undefined),
 *  enableSoundsForSpecialEvents: (boolean|undefined),
 *  permissionPreset: (!jspb$e.exa$codeium_common_pb$AgentPermissionPreset|undefined),
 *  enableAdc: (boolean|undefined),
 *  permissionGrantsV2Migrated: (boolean|undefined),
 *  sandboxEnabledAtV2Migration: (boolean|undefined),
 *  vertexServiceTier: (string|undefined),
 *  sandboxProxy: (!jspb$ro.jetbox_state_pb$UserSettings$ReadonlySandboxProxy|undefined),
 *  terminalPlacement: (!jspb$e.jetbox_state_pb$TerminalPlacement|undefined),
 *  agentSoundVolume: (number|undefined)
 * }}
 */
jspb$jetbox_state_pb$MutableUserSettings.FieldsInterface;

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
 * @param {!jspb$jetbox_state_pb$MutableUserSettings.FieldsInterface} record
 * @return {!jspb$jetbox_state_pb$ImmutableUserSettings}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableUserSettings, ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableUserSettings.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$jetbox_state_pb$ImmutableUserSettings
 */
jspb$jetbox_state_pb$MutableUserSettings.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$jetbox_state_pb$MutableUserSettings));

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
 * @param {!jspb$ro.jetbox_state_pb$ReadonlyUserSettings} value
 * @return {!jspb$jetbox_state_pb$MutableUserSettings.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.jetbox_state_pb$ReadonlyUserSettings): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableUserSettings, ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableUserSettings.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$jetbox_state_pb$MutableUserSettings.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$exa$config_pb$MutableUserConfig;
Object.defineProperty(this, 'jspb$exa$config_pb$MutableUserConfig', {
  get() { return jspb$exa$config_pb$MutableUserConfig; },
  set(v) { jspb$exa$config_pb$MutableUserConfig = v; },
