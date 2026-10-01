// source: devtools/jetski/boq/provisioning_service/proto/provisioning.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$b$devtools_jetski_provisioning$ProvisioningConfig');

goog.require('jspb$b$devtools_jetski_provisioning$AutoRenewalPolicy');
goog.require('jspb$devtools_jetski_provisioning$MutableProvisioningConfig');
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
jspb$b$devtools_jetski_provisioning$ProvisioningConfig.fields = /** @pureOrBreakMyCode */([
  0,
  jspb_internal_binary.RStringRequireUtf8WString,
  jspb_internal_binary.RRepeatedStringRequireUtf8WRepeatedString,
  jspb_internal_binary.RStringRequireUtf8WString,
  -1,
  jspb$b$devtools_jetski_provisioning$AutoRenewalPolicy.fields,
  jspb_internal_binary.RWEnum
]);

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @nodts
 * @return {!Uint8Array}
 */
jspb$devtools_jetski_provisioning$MutableProvisioningConfig.prototype.serializeBinary = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makePrototypeSerializeBinaryFunction(jspb$b$devtools_jetski_provisioning$ProvisioningConfig.fields));


var jspb$devtools_jetski_provisioning$MutableDeployment;
Object.defineProperty(this, 'jspb$devtools_jetski_provisioning$MutableDeployment', {
  get() { return jspb$devtools_jetski_provisioning$MutableDeployment; },
  set(v) { jspb$devtools_jetski_provisioning$MutableDeployment = v; },
