// source: learning/gemini/agents/projects/memory/fuse/proto/config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$jetski_memory$FakeMemoryBackendConfig');

goog.require('jspb$jetski_memory$MutableFakeLatency');
goog.require('jspb$jetski_memory$MutableFakeMemoryBackendConfig');
goog.require('jspb$o$jetski_memory$FakeLatency');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$jetski_memory$MutableFakeMemoryBackendConfig|undefined} msg The msg instance to transform.
 * @return {!jspb$jetski_memory$MutableFakeMemoryBackendConfig.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$jetski_memory$FakeMemoryBackendConfig.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$jetski_memory$MutableFakeMemoryBackendConfig.ObjectFormat} */ ({
    port: jspb_internal_adapters.getInt32FieldWithDefault(msg, 1),
    readLatency: jspb$o$jetski_memory$FakeLatency.internal_toObject(msg.getReadLatency()),
    writeLatency: jspb$o$jetski_memory$FakeLatency.internal_toObject(msg.getWriteLatency()),
    listLatency: jspb$o$jetski_memory$FakeLatency.internal_toObject(msg.getListLatency()),
    numInitialMemories: jspb_internal_adapters.getInt32FieldWithDefault(msg, 8, 100),
    sizeMeanBytes: jspb_internal_adapters.getInt64FieldWithDefault(msg, 9, 4096),
    sizeStddevBytes: jspb_internal_adapters.getInt64FieldWithDefault(msg, 10, 1024),
    randomSeed: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getInt64FieldLegacyNullable(msg, 11)),
  }));

};

/**
 * Creates a bad object rep of this proto. Please do not use.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @nodts
 * @const
 * @private
 * @return {!jspb$jetski_memory$MutableFakeMemoryBackendConfig.ObjectFormat}
 */
jspb$jetski_memory$MutableFakeMemoryBackendConfig.prototype.toObject = function() {
  return /** @type {!jspb$jetski_memory$MutableFakeMemoryBackendConfig.ObjectFormat} */ (jspb$o$jetski_memory$FakeMemoryBackendConfig.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$jetski_memory$MutableFakeMemoryBackendConfig.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$jetski_memory$MutableFakeMemoryBackendConfig}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$jetski_memory$FakeMemoryBackendConfig.fromObject = function(obj) {
  const msg = new jspb$jetski_memory$MutableFakeMemoryBackendConfig();
  jspb_internal_adapters.setInt32Field(msg, 1, obj.port);
  jspb_internal_adapters.setWrapperField(msg,
      jspb$jetski_memory$MutableFakeLatency,
      2, jspb_internal_public_for_gencode.fromObjectNullable(obj.readLatency, jspb$o$jetski_memory$FakeLatency.fromObject));
  jspb_internal_adapters.setWrapperField(msg,
      jspb$jetski_memory$MutableFakeLatency,
      3, jspb_internal_public_for_gencode.fromObjectNullable(obj.writeLatency, jspb$o$jetski_memory$FakeLatency.fromObject));
  jspb_internal_adapters.setWrapperField(msg,
      jspb$jetski_memory$MutableFakeLatency,
      4, jspb_internal_public_for_gencode.fromObjectNullable(obj.listLatency, jspb$o$jetski_memory$FakeLatency.fromObject));
  jspb_internal_adapters.setInt32Field(msg, 8, obj.numInitialMemories);
  jspb_internal_adapters.setInt64Field(msg, 9, obj.sizeMeanBytes);
  jspb_internal_adapters.setInt64Field(msg, 10, obj.sizeStddevBytes);
  jspb_internal_adapters.setInt64Field(msg, 11, obj.randomSeed);
  return msg;
};
}

var jspb$o$jetski_memory$IpcProxyConfig;
Object.defineProperty(this, 'jspb$o$jetski_memory$IpcProxyConfig', {
  get() { return jspb$o$jetski_memory$IpcProxyConfig; },
  set(v) { jspb$o$jetski_memory$IpcProxyConfig = v; },
