// source: learning/gemini/agents/projects/memory/fuse/proto/config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$b$jetski_memory$MemoryMountConfig');

goog.require('jspb$b$google$protobuf$Duration');
goog.require('jspb$b$jetski_memory$DumboBackendConfig');
goog.require('jspb$b$jetski_memory$FakeMemoryBackendConfig');
goog.require('jspb$b$jetski_memory$MemoryBankBackendConfig');
goog.require('jspb$b$jetski_memory$SkillsBackendConfig');
goog.require('jspb$b$jetski_memory$SmithBackendConfig');
goog.require('jspb$b$jetski_memory$SojoBackendConfig');
goog.require('jspb$jetski_memory$MutableMemoryMountConfig');
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
jspb$b$jetski_memory$MemoryMountConfig.fields = /** @pureOrBreakMyCode */([
  0,
  jspb$jetski_memory$MutableMemoryMountConfig.oneofGroup_backend_config_,
  jspb_internal_binary.RMessageOneofWMessage,
  jspb$b$jetski_memory$SmithBackendConfig.fields,
  jspb_internal_binary.RMessageOneofWMessage,
  jspb$b$jetski_memory$DumboBackendConfig.fields,
  jspb_internal_binary.RMessageOneofWMessage,
  jspb$b$jetski_memory$FakeMemoryBackendConfig.fields,
  jspb_internal_binary.RWBool,
  jspb_internal_binary.RMessageOneofWMessage,
  jspb$b$jetski_memory$SkillsBackendConfig.fields,
  jspb$b$google$protobuf$Duration.fields,
  jspb_internal_binary.RMessageOneofWMessage,
  jspb$b$jetski_memory$SojoBackendConfig.fields,
  jspb_internal_binary.RMessageOneofWMessage,
  jspb$b$jetski_memory$MemoryBankBackendConfig.fields
]);

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @nodts
 * @return {!Uint8Array}
 */
jspb$jetski_memory$MutableMemoryMountConfig.prototype.serializeBinary = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makePrototypeSerializeBinaryFunction(jspb$b$jetski_memory$MemoryMountConfig.fields));


var jspb$b$jetski_memory$FuseConfig;
Object.defineProperty(this, 'jspb$b$jetski_memory$FuseConfig', {
  get() { return jspb$b$jetski_memory$FuseConfig; },
  set(v) { jspb$b$jetski_memory$FuseConfig = v; },
