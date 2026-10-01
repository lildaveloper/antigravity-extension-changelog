// source: devtools/jetski/boq/provisioning_service/proto/provisioning.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$b$devtools_jetski_provisioning$ListDeploymentsResponse');

goog.require('jspb$b$devtools_jetski_provisioning$Deployment');
goog.require('jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse');
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
jspb$b$devtools_jetski_provisioning$ListDeploymentsResponse.fields = /** @pureOrBreakMyCode */([
  0,
  jspb_internal_binary.RWRepeatedMessage,
  jspb$b$devtools_jetski_provisioning$Deployment.fields,
  jspb_internal_binary.RWEnum
]);

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @nodts
 * @return {!Uint8Array}
 */
jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse.prototype.serializeBinary = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makePrototypeSerializeBinaryFunction(jspb$b$devtools_jetski_provisioning$ListDeploymentsResponse.fields));


var jspb$devtools_jetski_provisioning$ImmutableListDeploymentsResponse;
Object.defineProperty(this, 'jspb$devtools_jetski_provisioning$ImmutableListDeploymentsResponse', {
  get() { return jspb$devtools_jetski_provisioning$ImmutableListDeploymentsResponse; },
  set(v) { jspb$devtools_jetski_provisioning$ImmutableListDeploymentsResponse = v; },
