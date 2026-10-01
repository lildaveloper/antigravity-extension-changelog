// source: learning/gemini/agents/projects/memory/fuse/proto/config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$b$jetski_memory$FakeMemoryBackendConfig');

goog.require('jspb$b$jetski_memory$FakeLatency');
goog.require('jspb$jetski_memory$MutableFakeMemoryBackendConfig');
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
jspb$b$jetski_memory$FakeMemoryBackendConfig.fields = /** @pureOrBreakMyCode */([
  0,
  jspb_internal_binary.RWInt32,
  jspb$b$jetski_memory$FakeLatency.fields,
  -2,
  3,
  jspb_internal_binary.RWInt32,
  jspb_internal_binary.RWInt64,
  -2
]);

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @nodts
 * @return {!Uint8Array}
 */
jspb$jetski_memory$MutableFakeMemoryBackendConfig.prototype.serializeBinary = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makePrototypeSerializeBinaryFunction(jspb$b$jetski_memory$FakeMemoryBackendConfig.fields));


var jspb$b$jetski_memory$IpcProxyConfig;
Object.defineProperty(this, 'jspb$b$jetski_memory$IpcProxyConfig', {
  get() { return jspb$b$jetski_memory$IpcProxyConfig; },
  set(v) { jspb$b$jetski_memory$IpcProxyConfig = v; },
