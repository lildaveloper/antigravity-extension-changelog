// source: devtools/jetski/boq/provisioning_service/proto/provisioning.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$b$devtools_jetski_provisioning$DeploymentStatusDetail');

goog.require('jspb$b$devtools_jetski_provisioning$InstanceFailure');
goog.require('jspb$b$google$protobuf$Timestamp');
goog.require('jspb$b$google$rpc$Status');
goog.require('jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail');
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
jspb$b$devtools_jetski_provisioning$DeploymentStatusDetail.fields = /** @pureOrBreakMyCode */([
  0,
  jspb_internal_binary.RStringRequireUtf8WString,
  jspb$b$google$rpc$Status.fields,
  jspb_internal_binary.RWEnum,
  jspb_internal_binary.RStringRequireUtf8WString,
  jspb$b$google$protobuf$Timestamp.fields,
  jspb_internal_binary.RStringRequireUtf8WString,
  jspb_internal_binary.RWRepeatedMessage,
  jspb$b$devtools_jetski_provisioning$InstanceFailure.fields
]);

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @nodts
 * @return {!Uint8Array}
 */
jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail.prototype.serializeBinary = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makePrototypeSerializeBinaryFunction(jspb$b$devtools_jetski_provisioning$DeploymentStatusDetail.fields));


var jspb$devtools_jetski_provisioning$MutableX20QuotaUsage;
Object.defineProperty(this, 'jspb$devtools_jetski_provisioning$MutableX20QuotaUsage', {
  get() { return jspb$devtools_jetski_provisioning$MutableX20QuotaUsage; },
  set(v) { jspb$devtools_jetski_provisioning$MutableX20QuotaUsage = v; },
