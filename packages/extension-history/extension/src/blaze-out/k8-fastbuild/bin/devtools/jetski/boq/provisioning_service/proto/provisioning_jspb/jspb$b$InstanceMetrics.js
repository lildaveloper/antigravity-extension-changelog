// source: devtools/jetski/boq/provisioning_service/proto/provisioning.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$b$devtools_jetski_provisioning$InstanceMetrics');

goog.require('jspb$b$devtools_jetski_provisioning$X20QuotaUsage');
goog.require('jspb$devtools_jetski_provisioning$MutableInstanceMetrics');
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
jspb$b$devtools_jetski_provisioning$InstanceMetrics.fields = /** @pureOrBreakMyCode */([
  0,
  jspb_internal_binary.RWFloat,
  jspb_internal_binary.RWInt64,
  -3,
  jspb_internal_binary.RWInt32,
  jspb_internal_binary.RWRepeatedMessage,
  jspb$b$devtools_jetski_provisioning$X20QuotaUsage.fields
]);

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @nodts
 * @return {!Uint8Array}
 */
jspb$devtools_jetski_provisioning$MutableInstanceMetrics.prototype.serializeBinary = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makePrototypeSerializeBinaryFunction(jspb$b$devtools_jetski_provisioning$InstanceMetrics.fields));


var jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo;
Object.defineProperty(this, 'jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo', {
  get() { return jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo; },
  set(v) { jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo = v; },
