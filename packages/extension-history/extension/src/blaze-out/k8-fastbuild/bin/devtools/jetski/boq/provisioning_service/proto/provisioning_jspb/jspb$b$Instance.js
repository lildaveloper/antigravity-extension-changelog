// source: devtools/jetski/boq/provisioning_service/proto/provisioning.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$b$devtools_jetski_provisioning$Instance');

goog.require('jspb$b$devtools_jetski_provisioning$InstanceMetrics');
goog.require('jspb$b$devtools_jetski_provisioning$storage$SidecarStatusInfo');
goog.require('jspb$b$google$protobuf$Timestamp');
goog.require('jspb$devtools_jetski_provisioning$MutableInstance');
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
jspb$b$devtools_jetski_provisioning$Instance.fields = /** @pureOrBreakMyCode */([
  0,
  jspb_internal_binary.RWInt32,
  jspb_internal_binary.RStringRequireUtf8WString,
  -1,
  jspb_internal_binary.RWInt32,
  jspb$b$google$protobuf$Timestamp.fields,
  jspb_internal_binary.RWEnum,
  jspb_internal_binary.RStringRequireUtf8WString,
  jspb$b$devtools_jetski_provisioning$InstanceMetrics.fields,
  jspb_internal_binary.RWRepeatedMessage,
  jspb$b$devtools_jetski_provisioning$storage$SidecarStatusInfo.fields,
  jspb_internal_binary.RStringRequireUtf8WString,
  jspb_internal_binary.RWFloat,
  jspb_internal_binary.RStringRequireUtf8WString,
  jspb$b$google$protobuf$Timestamp.fields,
  -1,
  2,
  jspb$b$google$protobuf$Timestamp.fields
]);

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @nodts
 * @return {!Uint8Array}
 */
jspb$devtools_jetski_provisioning$MutableInstance.prototype.serializeBinary = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makePrototypeSerializeBinaryFunction(jspb$b$devtools_jetski_provisioning$Instance.fields));


var jspb$google$type$MutableTimeZone;
Object.defineProperty(this, 'jspb$google$type$MutableTimeZone', {
  get() { return jspb$google$type$MutableTimeZone; },
  set(v) { jspb$google$type$MutableTimeZone = v; },
