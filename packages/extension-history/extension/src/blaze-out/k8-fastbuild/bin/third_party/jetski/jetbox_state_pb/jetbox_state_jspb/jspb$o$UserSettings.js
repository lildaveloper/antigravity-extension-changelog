// source: third_party/jetski/jetbox_state_pb/jetbox_state.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$jetbox_state_pb$UserSettings');

goog.require('jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig');
goog.require('jspb$jetbox_state_pb$MutableCustomThemeSeeds');
goog.require('jspb$jetbox_state_pb$MutableGoogleSpecificConfig');
goog.require('jspb$jetbox_state_pb$MutableUserSettings');
goog.require('jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy');
goog.require('jspb$o$exa$codeium_common_pb$PermissionGrantsConfig');
goog.require('jspb$o$jetbox_state_pb$CustomThemeSeeds');
goog.require('jspb$o$jetbox_state_pb$GoogleSpecificConfig');
goog.require('jspb$o$jetbox_state_pb$UserSettings$SandboxProxy');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$jetbox_state_pb$MutableUserSettings|undefined} msg The msg instance to transform.
 * @return {!jspb$jetbox_state_pb$MutableUserSettings.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$jetbox_state_pb$UserSettings.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$jetbox_state_pb$MutableUserSettings.ObjectFormat} */ ({
    autoExecutionPolicy: jspb_internal_adapters.getEnumFieldWithDefault(msg, 1),
    artifactReviewMode: jspb_internal_adapters.getEnumFieldWithDefault(msg, 2),
    allowAgentAccessNonWorkspaceFiles: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getBooleanFieldLegacyNullable(msg, 3)),
    allowedCommandsList: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getRepeatedStringField(msg, 4, jspb_internal_adapters.RepeatedArrayReturnType.EITHER_FROZEN_OR_UNFROZEN)),
    deniedCommandsList: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getRepeatedStringField(msg, 5, jspb_internal_adapters.RepeatedArrayReturnType.EITHER_FROZEN_OR_UNFROZEN)),
    planningMode: jspb_internal_adapters.getEnumFieldWithDefault(msg, 6),
    secureModeEnabled: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getBooleanFieldLegacyNullable(msg, 7)),
    allowCascadeAccessGitignoreFiles: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getBooleanFieldLegacyNullable(msg, 8)),
    enableTerminalSandbox: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getBooleanFieldLegacyNullable(msg, 9)),
    disableDefaultCustomizations: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getBooleanFieldLegacyNullable(msg, 10)),
    globalPermissionGrants: jspb$o$exa$codeium_common_pb$PermissionGrantsConfig.internal_toObject(msg.getGlobalPermissionGrants()),
    agentEnvironment: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getEnumFieldLegacyNullable(msg, 12)),
    verboseAgentChat: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getBooleanFieldLegacyNullable(msg, 13)),
    sandboxAllowNetwork: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getBooleanFieldLegacyNullable(msg, 14)),
    nonWorkspaceFileAccessPolicy: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getEnumFieldLegacyNullable(msg, 17)),
    internetAccessPolicy: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getEnumFieldLegacyNullable(msg, 18)),
    allowAgentAccessGitignoreFiles: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getBooleanFieldLegacyNullable(msg, 19)),
    themeMode: jspb_internal_adapters.getEnumFieldWithDefault(msg, 20),
    customThemeSeedsLight: jspb$o$jetbox_state_pb$CustomThemeSeeds.internal_toObject(msg.getCustomThemeSeedsLight()),
    customThemeSeedsDark: jspb$o$jetbox_state_pb$CustomThemeSeeds.internal_toObject(msg.getCustomThemeSeedsDark()),
    browserJsExecutionPolicy: jspb_internal_adapters.getEnumFieldWithDefault(msg, 23),
    maxClonedWorkspaces: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getInt32FieldLegacyNullable(msg, 24)),
    maxClonesPerWorkspace: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getInt32FieldLegacyNullable(msg, 25)),
    disableEagerCloning: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getBooleanFieldLegacyNullable(msg, 26)),
    gcpRegion: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 27)),
    remoteControlEnabled: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getBooleanFieldLegacyNullable(msg, 28)),
    useAiCredits: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getBooleanFieldLegacyNullable(msg, 29)),
    activeProfile: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 30)),
    conversationWidth: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getEnumFieldLegacyNullable(msg, 31)),
    remoteControlHostname: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 33)),
    cliRemoteControlHostname: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 42)),
    queuedMessageDeliveryStrategy: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getEnumFieldLegacyNullable(msg, 34)),
    googleConfig: jspb$o$jetbox_state_pb$GoogleSpecificConfig.internal_toObject(msg.getGoogleConfig()),
    enableBusinessLogin: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getBooleanFieldLegacyNullable(msg, 36)),
    enableNotificationsForSpecialEvents: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getBooleanFieldLegacyNullable(msg, 37)),
    enablePersonalCustomizations: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getBooleanFieldLegacyNullable(msg, 38)),
    shellSetupScript: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 39)),
    enableSoundsForSpecialEvents: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getBooleanFieldLegacyNullable(msg, 40)),
    permissionPreset: jspb_internal_adapters.getEnumFieldWithDefault(msg, 41),
    enableAdc: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getBooleanFieldLegacyNullable(msg, 43)),
    permissionGrantsV2Migrated: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getBooleanFieldLegacyNullable(msg, 44)),
    sandboxEnabledAtV2Migration: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getBooleanFieldLegacyNullable(msg, 45)),
    vertexServiceTier: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 46)),
    sandboxProxy: jspb$o$jetbox_state_pb$UserSettings$SandboxProxy.internal_toObject(msg.getSandboxProxy()),
  }));

};

/**
 * Creates a bad object rep of this proto. Please do not use.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @nodts
 * @const
 * @private
 * @return {!jspb$jetbox_state_pb$MutableUserSettings.ObjectFormat}
 */
jspb$jetbox_state_pb$MutableUserSettings.prototype.toObject = function() {
  return /** @type {!jspb$jetbox_state_pb$MutableUserSettings.ObjectFormat} */ (jspb$o$jetbox_state_pb$UserSettings.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$jetbox_state_pb$MutableUserSettings.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$jetbox_state_pb$MutableUserSettings}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$jetbox_state_pb$UserSettings.fromObject = function(obj) {
  const msg = new jspb$jetbox_state_pb$MutableUserSettings();
  jspb_internal_adapters.setProto3EnumField(msg, 1, obj.autoExecutionPolicy);
  jspb_internal_adapters.setProto3EnumField(msg, 2, obj.artifactReviewMode);
  jspb_internal_adapters.setBooleanField(msg, 3, obj.allowAgentAccessNonWorkspaceFiles);
  jspb_internal_adapters.setRepeatedStringField(msg, 4, obj.allowedCommandsList);
  jspb_internal_adapters.setRepeatedStringField(msg, 5, obj.deniedCommandsList);
  jspb_internal_adapters.setProto3EnumField(msg, 6, obj.planningMode);
  jspb_internal_adapters.setBooleanField(msg, 7, obj.secureModeEnabled);
  jspb_internal_adapters.setBooleanField(msg, 8, obj.allowCascadeAccessGitignoreFiles);
  jspb_internal_adapters.setBooleanField(msg, 9, obj.enableTerminalSandbox);
  jspb_internal_adapters.setBooleanField(msg, 10, obj.disableDefaultCustomizations);
  jspb_internal_adapters.setWrapperField(msg,
      jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig,
      11, jspb_internal_public_for_gencode.fromObjectNullable(obj.globalPermissionGrants, jspb$o$exa$codeium_common_pb$PermissionGrantsConfig.fromObject));
  jspb_internal_adapters.setEnumField(msg, 12, obj.agentEnvironment);
  jspb_internal_adapters.setBooleanField(msg, 13, obj.verboseAgentChat);
  jspb_internal_adapters.setBooleanField(msg, 14, obj.sandboxAllowNetwork);
  jspb_internal_adapters.setEnumField(msg, 17, obj.nonWorkspaceFileAccessPolicy);
  jspb_internal_adapters.setEnumField(msg, 18, obj.internetAccessPolicy);
  jspb_internal_adapters.setBooleanField(msg, 19, obj.allowAgentAccessGitignoreFiles);
  jspb_internal_adapters.setProto3EnumField(msg, 20, obj.themeMode);
  jspb_internal_adapters.setWrapperField(msg,
      jspb$jetbox_state_pb$MutableCustomThemeSeeds,
      21, jspb_internal_public_for_gencode.fromObjectNullable(obj.customThemeSeedsLight, jspb$o$jetbox_state_pb$CustomThemeSeeds.fromObject));
  jspb_internal_adapters.setWrapperField(msg,
      jspb$jetbox_state_pb$MutableCustomThemeSeeds,
      22, jspb_internal_public_for_gencode.fromObjectNullable(obj.customThemeSeedsDark, jspb$o$jetbox_state_pb$CustomThemeSeeds.fromObject));
  jspb_internal_adapters.setProto3EnumField(msg, 23, obj.browserJsExecutionPolicy);
  jspb_internal_adapters.setInt32Field(msg, 24, obj.maxClonedWorkspaces);
  jspb_internal_adapters.setInt32Field(msg, 25, obj.maxClonesPerWorkspace);
  jspb_internal_adapters.setBooleanField(msg, 26, obj.disableEagerCloning);
  jspb_internal_adapters.setStringField(msg, 27, obj.gcpRegion);
  jspb_internal_adapters.setBooleanField(msg, 28, obj.remoteControlEnabled);
  jspb_internal_adapters.setBooleanField(msg, 29, obj.useAiCredits);
  jspb_internal_adapters.setStringField(msg, 30, obj.activeProfile);
  jspb_internal_adapters.setEnumField(msg, 31, obj.conversationWidth);
  jspb_internal_adapters.setStringField(msg, 33, obj.remoteControlHostname);
  jspb_internal_adapters.setStringField(msg, 42, obj.cliRemoteControlHostname);
  jspb_internal_adapters.setEnumField(msg, 34, obj.queuedMessageDeliveryStrategy);
  jspb_internal_adapters.setWrapperField(msg,
      jspb$jetbox_state_pb$MutableGoogleSpecificConfig,
      35, jspb_internal_public_for_gencode.fromObjectNullable(obj.googleConfig, jspb$o$jetbox_state_pb$GoogleSpecificConfig.fromObject));
  jspb_internal_adapters.setBooleanField(msg, 36, obj.enableBusinessLogin);
  jspb_internal_adapters.setBooleanField(msg, 37, obj.enableNotificationsForSpecialEvents);
  jspb_internal_adapters.setBooleanField(msg, 38, obj.enablePersonalCustomizations);
  jspb_internal_adapters.setStringField(msg, 39, obj.shellSetupScript);
  jspb_internal_adapters.setBooleanField(msg, 40, obj.enableSoundsForSpecialEvents);
  jspb_internal_adapters.setProto3EnumField(msg, 41, obj.permissionPreset);
  jspb_internal_adapters.setBooleanField(msg, 43, obj.enableAdc);
  jspb_internal_adapters.setBooleanField(msg, 44, obj.permissionGrantsV2Migrated);
  jspb_internal_adapters.setBooleanField(msg, 45, obj.sandboxEnabledAtV2Migration);
  jspb_internal_adapters.setStringField(msg, 46, obj.vertexServiceTier);
  jspb_internal_adapters.setWrapperField(msg,
      jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy,
      47, jspb_internal_public_for_gencode.fromObjectNullable(obj.sandboxProxy, jspb$o$jetbox_state_pb$UserSettings$SandboxProxy.fromObject));
  return msg;
};
}

var jspb$o$exa$config_pb$UserConfig;
Object.defineProperty(this, 'jspb$o$exa$config_pb$UserConfig', {
  get() { return jspb$o$exa$config_pb$UserConfig; },
  set(v) { jspb$o$exa$config_pb$UserConfig = v; },
