// source: devtools/jetski/boq/provisioning_service/proto/deployment_config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$b$devtools_jetski_provisioning$DeploymentConfig');

goog.require('jspb$b$devtools_jetski_provisioning$ChatConfig');
goog.require('jspb$b$devtools_jetski_provisioning$CustomizationConfig');
goog.require('jspb$b$devtools_jetski_provisioning$MemoryConfig');
goog.require('jspb$b$devtools_jetski_provisioning$Sidecar');
goog.require('jspb$b$devtools_jetski_provisioning$VmstorageConfig');
goog.require('jspb$b$exa$config_pb$UserConfig');
goog.require('jspb$b$exa$project_pb$Project');
goog.require('jspb$b$jetbox_state_pb$JetboxAppState');
goog.require('jspb$devtools_jetski_provisioning$MutableDeploymentConfig');
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
jspb$b$devtools_jetski_provisioning$DeploymentConfig.fields = /** @pureOrBreakMyCode */([
  0,
  jspb_internal_binary.RWRepeatedMessage,
  jspb$b$devtools_jetski_provisioning$Sidecar.fields,
  2,
  jspb$b$devtools_jetski_provisioning$ChatConfig.fields,
  1,
  jspb_internal_binary.RStringRequireUtf8WString,
  1,
  jspb$b$devtools_jetski_provisioning$CustomizationConfig.fields,
  -1,
  1,
  jspb_internal_binary.RStringRequireUtf8WString,
  jspb_internal_binary.RWBool,
  jspb_internal_binary.RWEnum,
  jspb_internal_binary.RStringRequireUtf8WString,
  jspb_internal_binary.RWBool,
  jspb_internal_binary.RStringRequireUtf8WString,
  jspb$b$jetbox_state_pb$JetboxAppState.fields,
  jspb_internal_binary.RWMapEntry,
  jspb_internal_binary.createMessageMapEntryBinaryFields(
      jspb_internal_binary.RStringRequireUtf8WString,
      jspb$b$exa$project_pb$Project.fields),
  jspb$b$exa$config_pb$UserConfig.fields,
  jspb_internal_binary.RWBool,
  1,
  jspb$b$devtools_jetski_provisioning$CustomizationConfig.fields,
  jspb_internal_binary.RWMapEntry,
  jspb_internal_binary.StringRequireUtf8StringRequireUtf8Map,
  jspb_internal_binary.RStringRequireUtf8WString,
  jspb_internal_binary.RWEnum,
  1,
  jspb_internal_binary.RRepeatedStringRequireUtf8WRepeatedString,
  jspb_internal_binary.RWBool,
  jspb$b$devtools_jetski_provisioning$MemoryConfig.fields,
  jspb_internal_binary.RWMapEntry,
  jspb_internal_binary.StringRequireUtf8StringRequireUtf8Map,
  jspb_internal_binary.RWBool,
  jspb_internal_binary.RStringRequireUtf8WString,
  jspb_internal_binary.RWBool,
  -1,
  jspb$b$devtools_jetski_provisioning$VmstorageConfig.fields
]);

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @nodts
 * @return {!Uint8Array}
 */
jspb$devtools_jetski_provisioning$MutableDeploymentConfig.prototype.serializeBinary = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makePrototypeSerializeBinaryFunction(jspb$b$devtools_jetski_provisioning$DeploymentConfig.fields));


var jspb$devtools_jetski_provisioning$MutableInstanceFailure;
Object.defineProperty(this, 'jspb$devtools_jetski_provisioning$MutableInstanceFailure', {
  get() { return jspb$devtools_jetski_provisioning$MutableInstanceFailure; },
  set(v) { jspb$devtools_jetski_provisioning$MutableInstanceFailure = v; },
