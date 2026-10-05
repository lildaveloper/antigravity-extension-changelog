// source: third_party/jetski/jetbox_state_pb/jetbox_state.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$jetbox_state_pb$JetboxAppState');

goog.require('jspb$jetbox_state_pb$MutableCustomModelsConfig');
goog.require('jspb$jetbox_state_pb$MutableGoogleSpecificSettings');
goog.require('jspb$jetbox_state_pb$MutableJetboxAppState');
goog.require('jspb$jetbox_state_pb$MutablePostOnboardingState');
goog.require('jspb$jetbox_state_pb$MutableSeenNuxUids');
goog.require('jspb$o$jetbox_state_pb$CustomModelsConfig');
goog.require('jspb$o$jetbox_state_pb$GoogleSpecificSettings');
goog.require('jspb$o$jetbox_state_pb$PostOnboardingState');
goog.require('jspb$o$jetbox_state_pb$SeenNuxUids');
goog.require('jspb$o$jetbox_state_pb$SidebarWorkspaceInfo');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$jetbox_state_pb$MutableJetboxAppState|undefined} msg The msg instance to transform.
 * @return {!jspb$jetbox_state_pb$MutableJetboxAppState.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$jetbox_state_pb$JetboxAppState.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$jetbox_state_pb$MutableJetboxAppState.ObjectFormat} */ ({
    postOnboarding: jspb$o$jetbox_state_pb$PostOnboardingState.internal_toObject(msg.getPostOnboarding()),
    seenNuxs: jspb$o$jetbox_state_pb$SeenNuxUids.internal_toObject(msg.getSeenNuxs()),
    sidebarWorkspacesMigrated: jspb_internal_adapters.getBooleanFieldWithDefault(msg, 3),
    googleSettings: jspb$o$jetbox_state_pb$GoogleSpecificSettings.internal_toObject(msg.getGoogleSettings()),
    agentOnboardingCompleted: jspb_internal_adapters.getEnumFieldWithDefault(msg, 5),
    sidebarWorkspacesMap: jspb_internal_public_for_gencode.mapToObject(msg.getSidebarWorkspacesMap(),
      jspb$o$jetbox_state_pb$SidebarWorkspaceInfo.internal_toObject),
    lastSelectedAgentModel: jspb_internal_adapters.getEnumFieldWithDefault(msg, 10),
    customModelsConfig: jspb$o$jetbox_state_pb$CustomModelsConfig.internal_toObject(msg.getCustomModelsConfig()),
    agentEnvironment: jspb_internal_adapters.getEnumFieldWithDefault(msg, 13),
    userConfigMigrated: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getBooleanFieldLegacyNullable(msg, 14)),
    migrateConvosIntoProjects: jspb_internal_adapters.getEnumFieldWithDefault(msg, 16),
    installationUuid: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 17)),
    migrateInternalProjects: jspb_internal_adapters.getEnumFieldWithDefault(msg, 18),
    migrateRetroactiveProjects: jspb_internal_adapters.getEnumFieldWithDefault(msg, 19),
    optedOutBestOfNAutoTriggerAt: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getInt64FieldLegacyNullable(msg, 20)),
    migrationsMap: jspb_internal_public_for_gencode.mapToObject(msg.getMigrationsMap()),
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
 * @return {!jspb$jetbox_state_pb$MutableJetboxAppState.ObjectFormat}
 */
jspb$jetbox_state_pb$MutableJetboxAppState.prototype.toObject = function() {
  return /** @type {!jspb$jetbox_state_pb$MutableJetboxAppState.ObjectFormat} */ (jspb$o$jetbox_state_pb$JetboxAppState.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$jetbox_state_pb$MutableJetboxAppState.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$jetbox_state_pb$MutableJetboxAppState}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$jetbox_state_pb$JetboxAppState.fromObject = function(obj) {
  const msg = new jspb$jetbox_state_pb$MutableJetboxAppState();
  jspb_internal_adapters.setWrapperField(msg,
      jspb$jetbox_state_pb$MutablePostOnboardingState,
      1, jspb_internal_public_for_gencode.fromObjectNullable(obj.postOnboarding, jspb$o$jetbox_state_pb$PostOnboardingState.fromObject));
  jspb_internal_adapters.setWrapperField(msg,
      jspb$jetbox_state_pb$MutableSeenNuxUids,
      2, jspb_internal_public_for_gencode.fromObjectNullable(obj.seenNuxs, jspb$o$jetbox_state_pb$SeenNuxUids.fromObject));
  jspb_internal_adapters.setProto3BooleanField(msg, 3, obj.sidebarWorkspacesMigrated);
  jspb_internal_adapters.setWrapperField(msg,
      jspb$jetbox_state_pb$MutableGoogleSpecificSettings,
      4, jspb_internal_public_for_gencode.fromObjectNullable(obj.googleSettings, jspb$o$jetbox_state_pb$GoogleSpecificSettings.fromObject));
  jspb_internal_adapters.setProto3EnumField(msg, 5, obj.agentOnboardingCompleted);
  obj.sidebarWorkspacesMap && jspb_internal_public_for_gencode.mapFromObject(msg.getSidebarWorkspacesMap(), obj.sidebarWorkspacesMap, jspb$o$jetbox_state_pb$SidebarWorkspaceInfo.fromObject);
  jspb_internal_adapters.setProto3EnumField(msg, 10, obj.lastSelectedAgentModel);
  jspb_internal_adapters.setWrapperField(msg,
      jspb$jetbox_state_pb$MutableCustomModelsConfig,
      11, jspb_internal_public_for_gencode.fromObjectNullable(obj.customModelsConfig, jspb$o$jetbox_state_pb$CustomModelsConfig.fromObject));
  jspb_internal_adapters.setProto3EnumField(msg, 13, obj.agentEnvironment);
  jspb_internal_adapters.setBooleanField(msg, 14, obj.userConfigMigrated);
  jspb_internal_adapters.setProto3EnumField(msg, 16, obj.migrateConvosIntoProjects);
  jspb_internal_adapters.setStringField(msg, 17, obj.installationUuid);
  jspb_internal_adapters.setProto3EnumField(msg, 18, obj.migrateInternalProjects);
  jspb_internal_adapters.setProto3EnumField(msg, 19, obj.migrateRetroactiveProjects);
  jspb_internal_adapters.setInt64Field(msg, 20, obj.optedOutBestOfNAutoTriggerAt);
  obj.migrationsMap && jspb_internal_public_for_gencode.mapFromObject(msg.getMigrationsMap(), obj.migrationsMap);
  return msg;
};
}

var jspb$o$exa$project_pb$GitFolder;
Object.defineProperty(this, 'jspb$o$exa$project_pb$GitFolder', {
  get() { return jspb$o$exa$project_pb$GitFolder; },
  set(v) { jspb$o$exa$project_pb$GitFolder = v; },
