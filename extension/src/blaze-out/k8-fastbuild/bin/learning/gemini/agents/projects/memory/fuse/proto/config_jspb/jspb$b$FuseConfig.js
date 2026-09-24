// source: learning/gemini/agents/projects/memory/fuse/proto/config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$b$jetski_memory$FuseConfig');

goog.require('jspb$b$google$protobuf$Duration');
goog.require('jspb$b$jetski_memory$FakeMemoryBackendConfig');
goog.require('jspb$b$jetski_memory$MemoryMountConfig');
goog.require('jspb$jetski_memory$MutableFuseConfig');
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
jspb$b$jetski_memory$FuseConfig.fields = /** @pureOrBreakMyCode */([
  0,
  jspb$jetski_memory$MutableFuseConfig.oneofGroup_backend_config_,
  jspb_internal_binary.RStringRequireUtf8WString,
  jspb_internal_binary.RStringRequireUtf8OneofWString,
  2,
  jspb_internal_binary.RWBool,
  jspb_internal_binary.RWInt32,
  2,
  jspb_internal_binary.RWInt64,
  2,
  jspb_internal_binary.RStringRequireUtf8WString,
  1,
  jspb_internal_binary.RWBool,
  jspb_internal_binary.RStringRequireUtf8WString,
  2,
  jspb$b$google$protobuf$Duration.fields,
  -1,
  jspb_internal_binary.RRepeatedStringRequireUtf8WRepeatedString,
  jspb_internal_binary.RMessageOneofWMessage,
  jspb$b$jetski_memory$FakeMemoryBackendConfig.fields,
  1,
  jspb_internal_binary.RStringRequireUtf8WString,
  2,
  jspb_internal_binary.RStringRequireUtf8OneofWString,
  jspb_internal_binary.RWMapEntry,
  jspb_internal_binary.createMessageMapEntryBinaryFields(
      jspb_internal_binary.RStringRequireUtf8WString,
      jspb$b$jetski_memory$MemoryMountConfig.fields),
  jspb_internal_binary.RWInt32,
  jspb_internal_binary.RWBool,
  jspb_internal_binary.RWInt64
]);

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @nodts
 * @return {!Uint8Array}
 */
jspb$jetski_memory$MutableFuseConfig.prototype.serializeBinary = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makePrototypeSerializeBinaryFunction(jspb$b$jetski_memory$FuseConfig.fields));


var jspb$b$jetski_memory$MemoryConfig;
Object.defineProperty(this, 'jspb$b$jetski_memory$MemoryConfig', {
  get() { return jspb$b$jetski_memory$MemoryConfig; },
  set(v) { jspb$b$jetski_memory$MemoryConfig = v; },
