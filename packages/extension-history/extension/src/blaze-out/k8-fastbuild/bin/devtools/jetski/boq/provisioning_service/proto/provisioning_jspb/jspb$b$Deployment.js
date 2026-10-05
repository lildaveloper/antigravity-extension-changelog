// source: devtools/jetski/boq/provisioning_service/proto/provisioning.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$b$devtools_jetski_provisioning$Deployment');

goog.require('jspb$b$devtools_jetski_provisioning$BlueprintBinding');
goog.require('jspb$b$devtools_jetski_provisioning$DeploymentConfig');
goog.require('jspb$b$devtools_jetski_provisioning$DeploymentStatusDetail');
goog.require('jspb$b$devtools_jetski_provisioning$Instance');
goog.require('jspb$b$devtools_jetski_provisioning$InstanceMetrics');
goog.require('jspb$b$devtools_jetski_provisioning$ProvisioningConfig');
goog.require('jspb$b$google$protobuf$Duration');
goog.require('jspb$b$google$protobuf$Timestamp');
goog.require('jspb$devtools_jetski_provisioning$MutableDeployment');
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
jspb$b$devtools_jetski_provisioning$Deployment.fields = /** @pureOrBreakMyCode */([
  0,
  jspb_internal_binary.RStringRequireUtf8WString,
  -3,
  jspb_internal_binary.RWEnum,
  jspb$b$google$protobuf$Timestamp.fields,
  -1,
  jspb_internal_binary.RStringRequireUtf8WString,
  jspb$b$devtools_jetski_provisioning$DeploymentConfig.fields,
  jspb$b$google$protobuf$Duration.fields,
  jspb_internal_binary.RWInt32,
  1,
  jspb_internal_binary.RRepeatedStringRequireUtf8WRepeatedString,
  jspb_internal_binary.RStringRequireUtf8WString,
  -1,
  jspb$b$google$protobuf$Timestamp.fields,
  -1,
  jspb_internal_binary.RWInt32,
  jspb_internal_binary.RWRepeatedMessage,
  jspb$b$devtools_jetski_provisioning$Instance.fields,
  jspb_internal_binary.RStringRequireUtf8WString,
  1,
  jspb$b$devtools_jetski_provisioning$BlueprintBinding.fields,
  jspb$b$devtools_jetski_provisioning$InstanceMetrics.fields,
  jspb$b$devtools_jetski_provisioning$ProvisioningConfig.fields,
  1,
  jspb$b$google$protobuf$Timestamp.fields,
  jspb_internal_binary.RStringRequireUtf8WString,
  jspb_internal_binary.RWEnum,
  jspb_internal_binary.RWFloat,
  jspb$b$devtools_jetski_provisioning$DeploymentStatusDetail.fields
]);

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @nodts
 * @return {!Uint8Array}
 */
jspb$devtools_jetski_provisioning$MutableDeployment.prototype.serializeBinary = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makePrototypeSerializeBinaryFunction(jspb$b$devtools_jetski_provisioning$Deployment.fields));


var jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse;
Object.defineProperty(this, 'jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse', {
  get() { return jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse; },
  set(v) { jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse = v; },
