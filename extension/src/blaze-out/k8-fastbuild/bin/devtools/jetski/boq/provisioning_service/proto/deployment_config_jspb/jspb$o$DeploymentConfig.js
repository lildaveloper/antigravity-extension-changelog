// source: devtools/jetski/boq/provisioning_service/proto/deployment_config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$devtools_jetski_provisioning$DeploymentConfig');

goog.require('jspb$devtools_jetski_provisioning$MutableChatConfig');
goog.require('jspb$devtools_jetski_provisioning$MutableCustomizationConfig');
goog.require('jspb$devtools_jetski_provisioning$MutableDeploymentConfig');
goog.require('jspb$devtools_jetski_provisioning$MutableMemoryConfig');
goog.require('jspb$devtools_jetski_provisioning$MutableSidecar');
goog.require('jspb$exa$config_pb$MutableUserConfig');
goog.require('jspb$jetbox_state_pb$MutableJetboxAppState');
goog.require('jspb$o$devtools_jetski_provisioning$ChatConfig');
goog.require('jspb$o$devtools_jetski_provisioning$CustomizationConfig');
goog.require('jspb$o$devtools_jetski_provisioning$MemoryConfig');
goog.require('jspb$o$devtools_jetski_provisioning$Sidecar');
goog.require('jspb$o$exa$config_pb$UserConfig');
goog.require('jspb$o$exa$project_pb$Project');
goog.require('jspb$o$jetbox_state_pb$JetboxAppState');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$devtools_jetski_provisioning$MutableDeploymentConfig|undefined} msg The msg instance to transform.
 * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$devtools_jetski_provisioning$DeploymentConfig.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig.ObjectFormat} */ ({
    sidecarsList: jspb_internal_public_for_gencode.toObjectList(msg.getSidecarsList(), jspb$o$devtools_jetski_provisioning$Sidecar.internal_toObject),
    skills: jspb$o$devtools_jetski_provisioning$CustomizationConfig.internal_toObject(msg.getSkills()),
    agents: jspb$o$devtools_jetski_provisioning$CustomizationConfig.internal_toObject(msg.getAgents()),
    plugins: jspb$o$devtools_jetski_provisioning$CustomizationConfig.internal_toObject(msg.getPlugins()),
    jetskiMemoryConfig: jspb$o$devtools_jetski_provisioning$MemoryConfig.internal_toObject(msg.getJetskiMemoryConfig()),
    userConfig: jspb$o$exa$config_pb$UserConfig.internal_toObject(msg.getUserConfig()),
    projectsMap: jspb_internal_public_for_gencode.mapToObject(msg.getProjectsMap(),
      jspb$o$exa$project_pb$Project.internal_toObject),
    jetboxAppState: jspb$o$jetbox_state_pb$JetboxAppState.internal_toObject(msg.getJetboxAppState()),
    chatConfig: jspb$o$devtools_jetski_provisioning$ChatConfig.internal_toObject(msg.getChatConfig()),
    setupScript: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 6)),
    geminiMd: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 11)),
    useX20GeminiDir: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getBooleanFieldLegacyNullable(msg, 12)),
    persistenceMode: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getEnumFieldLegacyNullable(msg, 25)),
    hubReleaseChannel: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getEnumFieldLegacyNullable(msg, 13)),
    beyondQuotaBucket: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 14)),
    preserveExistingData: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getBooleanFieldLegacyNullable(msg, 15)),
    preserveSidecars: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getBooleanFieldLegacyNullable(msg, 28)),
    hooksJson: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 16)),
    enableCloudProject: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getBooleanFieldLegacyNullable(msg, 20)),
    envVarsMap: jspb_internal_public_for_gencode.mapToObject(msg.getEnvVarsMap()),
    generativeServiceAddr: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 24)),
    additionalLsArgsList: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getRepeatedStringField(msg, 27, jspb_internal_adapters.RepeatedArrayReturnType.EITHER_FROZEN_OR_UNFROZEN)),
    extraFilesMap: jspb_internal_public_for_gencode.mapToObject(msg.getExtraFilesMap()),
    enableControlPlaneMonitoring: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getBooleanFieldLegacyNullable(msg, 31)),
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
 * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig.ObjectFormat}
 */
jspb$devtools_jetski_provisioning$MutableDeploymentConfig.prototype.toObject = function() {
  return /** @type {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig.ObjectFormat} */ (jspb$o$devtools_jetski_provisioning$DeploymentConfig.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$devtools_jetski_provisioning$DeploymentConfig.fromObject = function(obj) {
  const msg = new jspb$devtools_jetski_provisioning$MutableDeploymentConfig();
  jspb_internal_adapters.setRepeatedWrapperField(msg, jspb$devtools_jetski_provisioning$MutableSidecar,
      1, jspb_internal_public_for_gencode.fromObjectList(obj.sidecarsList,         jspb$o$devtools_jetski_provisioning$Sidecar.fromObject));
  jspb_internal_adapters.setWrapperField(msg,
      jspb$devtools_jetski_provisioning$MutableCustomizationConfig,
      8, jspb_internal_public_for_gencode.fromObjectNullable(obj.skills, jspb$o$devtools_jetski_provisioning$CustomizationConfig.fromObject));
  jspb_internal_adapters.setWrapperField(msg,
      jspb$devtools_jetski_provisioning$MutableCustomizationConfig,
      9, jspb_internal_public_for_gencode.fromObjectNullable(obj.agents, jspb$o$devtools_jetski_provisioning$CustomizationConfig.fromObject));
  jspb_internal_adapters.setWrapperField(msg,
      jspb$devtools_jetski_provisioning$MutableCustomizationConfig,
      22, jspb_internal_public_for_gencode.fromObjectNullable(obj.plugins, jspb$o$devtools_jetski_provisioning$CustomizationConfig.fromObject));
  jspb_internal_adapters.setWrapperField(msg,
      jspb$devtools_jetski_provisioning$MutableMemoryConfig,
      29, jspb_internal_public_for_gencode.fromObjectNullable(obj.jetskiMemoryConfig, jspb$o$devtools_jetski_provisioning$MemoryConfig.fromObject));
  jspb_internal_adapters.setWrapperField(msg,
      jspb$exa$config_pb$MutableUserConfig,
      19, jspb_internal_public_for_gencode.fromObjectNullable(obj.userConfig, jspb$o$exa$config_pb$UserConfig.fromObject));
  obj.projectsMap && jspb_internal_public_for_gencode.mapFromObject(msg.getProjectsMap(), obj.projectsMap, jspb$o$exa$project_pb$Project.fromObject);
  jspb_internal_adapters.setWrapperField(msg,
      jspb$jetbox_state_pb$MutableJetboxAppState,
      17, jspb_internal_public_for_gencode.fromObjectNullable(obj.jetboxAppState, jspb$o$jetbox_state_pb$JetboxAppState.fromObject));
  jspb_internal_adapters.setWrapperField(msg,
      jspb$devtools_jetski_provisioning$MutableChatConfig,
      4, jspb_internal_public_for_gencode.fromObjectNullable(obj.chatConfig, jspb$o$devtools_jetski_provisioning$ChatConfig.fromObject));
  jspb_internal_adapters.setStringField(msg, 6, obj.setupScript);
  jspb_internal_adapters.setStringField(msg, 11, obj.geminiMd);
  jspb_internal_adapters.setBooleanField(msg, 12, obj.useX20GeminiDir);
  jspb_internal_adapters.setEnumField(msg, 25, obj.persistenceMode);
  jspb_internal_adapters.setEnumField(msg, 13, obj.hubReleaseChannel);
  jspb_internal_adapters.setStringField(msg, 14, obj.beyondQuotaBucket);
  jspb_internal_adapters.setBooleanField(msg, 15, obj.preserveExistingData);
  jspb_internal_adapters.setBooleanField(msg, 28, obj.preserveSidecars);
  jspb_internal_adapters.setStringField(msg, 16, obj.hooksJson);
  jspb_internal_adapters.setBooleanField(msg, 20, obj.enableCloudProject);
  obj.envVarsMap && jspb_internal_public_for_gencode.mapFromObject(msg.getEnvVarsMap(), obj.envVarsMap);
  jspb_internal_adapters.setStringField(msg, 24, obj.generativeServiceAddr);
  jspb_internal_adapters.setRepeatedStringField(msg, 27, obj.additionalLsArgsList);
  obj.extraFilesMap && jspb_internal_public_for_gencode.mapFromObject(msg.getExtraFilesMap(), obj.extraFilesMap);
  jspb_internal_adapters.setBooleanField(msg, 31, obj.enableControlPlaneMonitoring);
  return msg;
};
}

var jspb$o$devtools_jetski_provisioning$InstanceMetrics;
Object.defineProperty(this, 'jspb$o$devtools_jetski_provisioning$InstanceMetrics', {
  get() { return jspb$o$devtools_jetski_provisioning$InstanceMetrics; },
  set(v) { jspb$o$devtools_jetski_provisioning$InstanceMetrics = v; },
