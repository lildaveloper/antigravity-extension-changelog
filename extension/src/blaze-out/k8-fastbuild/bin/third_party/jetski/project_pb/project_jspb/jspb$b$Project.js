// source: third_party/jetski/project_pb/project.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$b$exa$project_pb$Project');

goog.require('jspb$b$exa$project_pb$Environments');
goog.require('jspb$b$exa$project_pb$PermissionGrants');
goog.require('jspb$b$exa$project_pb$ProjectConversations');
goog.require('jspb$b$exa$project_pb$ProjectSettings');
goog.require('jspb$b$exa$project_pb$Resources');
goog.require('jspb$b$google$protobuf$Timestamp');
goog.require('jspb$exa$project_pb$MutableProject');
goog.require('jspb_internal_binary');
goog.require('jspb_internal_public_for_gencode');

/**
 * The set of binary field definitions, this is for internal use only
 * and unsupported in all other cases.
 * @nodts
 * @const
 * @type {!Array<?>}
 * @suppress {visibility} access to oneof groups.
 */
jspb$b$exa$project_pb$Project.fields = /** @pureOrBreakMyCode */([
  0,
  jspb_internal_binary.RStringRequireUtf8IgnoringDefaultWString,
  -1,
  3,
  jspb$b$exa$project_pb$Resources.fields,
  jspb$b$exa$project_pb$Environments.fields,
  jspb$b$exa$project_pb$ProjectConversations.fields,
  jspb$b$exa$project_pb$PermissionGrants.fields,
  jspb$b$exa$project_pb$ProjectSettings.fields,
  jspb$b$google$protobuf$Timestamp.fields,
  jspb_internal_binary.RWBool,
  -1
]);

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @nodts
 * @return {!Uint8Array}
 */
jspb$exa$project_pb$MutableProject.prototype.serializeBinary = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makePrototypeSerializeBinaryFunction(jspb$b$exa$project_pb$Project.fields));


var jspb$b$devtools_jetski_provisioning$DeploymentConfig;
Object.defineProperty(this, 'jspb$b$devtools_jetski_provisioning$DeploymentConfig', {
  get() { return jspb$b$devtools_jetski_provisioning$DeploymentConfig; },
  set(v) { jspb$b$devtools_jetski_provisioning$DeploymentConfig = v; },
