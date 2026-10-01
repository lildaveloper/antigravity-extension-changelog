// source: third_party/jetski/project_pb/project.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$exa$project_pb$Project');

goog.require('jspb$exa$project_pb$MutableEnvironments');
goog.require('jspb$exa$project_pb$MutablePermissionGrants');
goog.require('jspb$exa$project_pb$MutableProject');
goog.require('jspb$exa$project_pb$MutableProjectConversations');
goog.require('jspb$exa$project_pb$MutableProjectSettings');
goog.require('jspb$exa$project_pb$MutableResources');
goog.require('jspb$google$protobuf$MutableTimestamp');
goog.require('jspb$o$exa$project_pb$Environments');
goog.require('jspb$o$exa$project_pb$PermissionGrants');
goog.require('jspb$o$exa$project_pb$ProjectConversations');
goog.require('jspb$o$exa$project_pb$ProjectSettings');
goog.require('jspb$o$exa$project_pb$Resources');
goog.require('jspb$o$google$protobuf$Timestamp');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$exa$project_pb$MutableProject|undefined} msg The msg instance to transform.
 * @return {!jspb$exa$project_pb$MutableProject.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$exa$project_pb$Project.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$exa$project_pb$MutableProject.ObjectFormat} */ ({
    id: jspb_internal_adapters.getStringFieldWithDefault(msg, 1),
    name: jspb_internal_adapters.getStringFieldWithDefault(msg, 2),
    projectConversations: jspb$o$exa$project_pb$ProjectConversations.internal_toObject(msg.getProjectConversations()),
    projectResources: jspb$o$exa$project_pb$Resources.internal_toObject(msg.getProjectResources()),
    environments: jspb$o$exa$project_pb$Environments.internal_toObject(msg.getEnvironments()),
    permissionGrants: jspb$o$exa$project_pb$PermissionGrants.internal_toObject(msg.getPermissionGrants()),
    settings: jspb$o$exa$project_pb$ProjectSettings.internal_toObject(msg.getSettings()),
    updatedAt: jspb$o$google$protobuf$Timestamp.internal_toObject(msg.getUpdatedAt()),
    isWorkspaceOnly: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getBooleanFieldLegacyNullable(msg, 12)),
    archived: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getBooleanFieldLegacyNullable(msg, 13)),
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
 * @return {!jspb$exa$project_pb$MutableProject.ObjectFormat}
 */
jspb$exa$project_pb$MutableProject.prototype.toObject = function() {
  return /** @type {!jspb$exa$project_pb$MutableProject.ObjectFormat} */ (jspb$o$exa$project_pb$Project.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$exa$project_pb$MutableProject.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$exa$project_pb$MutableProject}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$exa$project_pb$Project.fromObject = function(obj) {
  const msg = new jspb$exa$project_pb$MutableProject();
  jspb_internal_adapters.setProto3StringField(msg, 1, obj.id);
  jspb_internal_adapters.setProto3StringField(msg, 2, obj.name);
  jspb_internal_adapters.setWrapperField(msg,
      jspb$exa$project_pb$MutableProjectConversations,
      8, jspb_internal_public_for_gencode.fromObjectNullable(obj.projectConversations, jspb$o$exa$project_pb$ProjectConversations.fromObject));
  jspb_internal_adapters.setWrapperField(msg,
      jspb$exa$project_pb$MutableResources,
      6, jspb_internal_public_for_gencode.fromObjectNullable(obj.projectResources, jspb$o$exa$project_pb$Resources.fromObject));
  jspb_internal_adapters.setWrapperField(msg,
      jspb$exa$project_pb$MutableEnvironments,
      7, jspb_internal_public_for_gencode.fromObjectNullable(obj.environments, jspb$o$exa$project_pb$Environments.fromObject));
  jspb_internal_adapters.setWrapperField(msg,
      jspb$exa$project_pb$MutablePermissionGrants,
      9, jspb_internal_public_for_gencode.fromObjectNullable(obj.permissionGrants, jspb$o$exa$project_pb$PermissionGrants.fromObject));
  jspb_internal_adapters.setWrapperField(msg,
      jspb$exa$project_pb$MutableProjectSettings,
      10, jspb_internal_public_for_gencode.fromObjectNullable(obj.settings, jspb$o$exa$project_pb$ProjectSettings.fromObject));
  jspb_internal_adapters.setWrapperField(msg,
      jspb$google$protobuf$MutableTimestamp,
      11, jspb_internal_public_for_gencode.fromObjectNullable(obj.updatedAt, jspb$o$google$protobuf$Timestamp.fromObject));
  jspb_internal_adapters.setBooleanField(msg, 12, obj.isWorkspaceOnly);
  jspb_internal_adapters.setBooleanField(msg, 13, obj.archived);
  return msg;
};
}

var jspb$o$devtools_jetski_provisioning$DeploymentConfig;
Object.defineProperty(this, 'jspb$o$devtools_jetski_provisioning$DeploymentConfig', {
  get() { return jspb$o$devtools_jetski_provisioning$DeploymentConfig; },
  set(v) { jspb$o$devtools_jetski_provisioning$DeploymentConfig = v; },
