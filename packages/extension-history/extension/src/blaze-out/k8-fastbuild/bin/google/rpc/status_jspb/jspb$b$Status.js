// source: google/rpc/status.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$b$google$rpc$Status');

goog.require('jspb$b$google$protobuf$Any');
goog.require('jspb$google$rpc$MutableStatus');
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
jspb$b$google$rpc$Status.fields = /** @pureOrBreakMyCode */([
  0,
  jspb_internal_binary.RInt32IgnoringDefaultWInt32,
  jspb_internal_binary.RStringRequireUtf8IgnoringDefaultWString,
  jspb_internal_binary.RWRepeatedMessage,
  jspb$b$google$protobuf$Any.fields
]);

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @nodts
 * @return {!Uint8Array}
 */
jspb$google$rpc$MutableStatus.prototype.serializeBinary = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makePrototypeSerializeBinaryFunction(jspb$b$google$rpc$Status.fields));


var jspb$b$devtools_jetski_provisioning$DeploymentStatusDetail;
Object.defineProperty(this, 'jspb$b$devtools_jetski_provisioning$DeploymentStatusDetail', {
  get() { return jspb$b$devtools_jetski_provisioning$DeploymentStatusDetail; },
  set(v) { jspb$b$devtools_jetski_provisioning$DeploymentStatusDetail = v; },
