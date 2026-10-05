// source: devtools/jetski/boq/provisioning_service/proto/vmstorage_config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$b$devtools_jetski_provisioning$MountedDirectory');

goog.require('jspb$b$devtools_jetski_provisioning$VolumeClientConfig');
goog.require('jspb$b$devtools_jetski_provisioning$VolumeCreationConfig');
goog.require('jspb$devtools_jetski_provisioning$MutableMountedDirectory');
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
jspb$b$devtools_jetski_provisioning$MountedDirectory.fields = /** @pureOrBreakMyCode */([
  0,
  jspb$devtools_jetski_provisioning$MutableMountedDirectory.oneofGroup_source_,
  jspb_internal_binary.RStringRequireUtf8WString,
  jspb_internal_binary.RStringRequireUtf8OneofWString,
  jspb_internal_binary.RWBool,
  -1,
  jspb$b$devtools_jetski_provisioning$VolumeClientConfig.fields,
  jspb_internal_binary.RMessageOneofWMessage,
  jspb$b$devtools_jetski_provisioning$VolumeCreationConfig.fields
]);

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @nodts
 * @return {!Uint8Array}
 */
jspb$devtools_jetski_provisioning$MutableMountedDirectory.prototype.serializeBinary = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makePrototypeSerializeBinaryFunction(jspb$b$devtools_jetski_provisioning$MountedDirectory.fields));


var jspb$b$devtools_jetski_provisioning$VmstorageConfig;
Object.defineProperty(this, 'jspb$b$devtools_jetski_provisioning$VmstorageConfig', {
  get() { return jspb$b$devtools_jetski_provisioning$VmstorageConfig; },
  set(v) { jspb$b$devtools_jetski_provisioning$VmstorageConfig = v; },
