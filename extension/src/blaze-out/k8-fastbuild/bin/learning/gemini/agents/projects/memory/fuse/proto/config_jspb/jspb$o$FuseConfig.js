// source: learning/gemini/agents/projects/memory/fuse/proto/config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$jetski_memory$FuseConfig');

goog.require('jspb$google$protobuf$MutableDuration');
goog.require('jspb$jetski_memory$MutableFakeMemoryBackendConfig');
goog.require('jspb$jetski_memory$MutableFuseConfig');
goog.require('jspb$o$google$protobuf$Duration');
goog.require('jspb$o$jetski_memory$FakeMemoryBackendConfig');
goog.require('jspb$o$jetski_memory$MemoryMountConfig');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$jetski_memory$MutableFuseConfig|undefined} msg The msg instance to transform.
 * @return {!jspb$jetski_memory$MutableFuseConfig.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$jetski_memory$FuseConfig.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$jetski_memory$MutableFuseConfig.ObjectFormat} */ ({
    config: jspb_internal_adapters.getStringFieldWithDefault(msg, 1, "~/.gemini/config/memory.txtpb"),
    smithBackendTarget: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getOneofStringFieldLegacyNullable(msg, 2, jspb$jetski_memory$MutableFuseConfig.oneofGroup_backend_config_)),
    dumboBackendTarget: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getOneofStringFieldLegacyNullable(msg, 26, jspb$jetski_memory$MutableFuseConfig.oneofGroup_backend_config_)),
    fakeBackend: jspb$o$jetski_memory$FakeMemoryBackendConfig.internal_toObject(msg.getFakeBackend()),
    rootDir: jspb_internal_adapters.getStringFieldWithDefault(msg, 12, "~/memory"),
    memoryGroupsList: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getRepeatedStringField(msg, 20, jspb_internal_adapters.RepeatedArrayReturnType.EITHER_FROZEN_OR_UNFROZEN)),
    mountsMap: jspb_internal_public_for_gencode.mapToObject(msg.getMountsMap(),
      jspb$o$jetski_memory$MemoryMountConfig.internal_toObject),
    debug: jspb_internal_adapters.getBooleanFieldWithDefault(msg, 5),
    daemonSocketFile: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 23)),
    daemonPort: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getInt32FieldLegacyNullable(msg, 28)),
    logDir: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 15)),
    numThreads: jspb_internal_adapters.getInt32FieldWithDefault(msg, 6, 4),
    asyncFlush: jspb_internal_adapters.getBooleanFieldWithDefault(msg, 14, true),
    debounceWindow: jspb$o$google$protobuf$Duration.internal_toObject(msg.getDebounceWindow()),
    pollChangesPeriod: jspb$o$google$protobuf$Duration.internal_toObject(msg.getPollChangesPeriod()),
    cacheMaxMb: jspb_internal_adapters.getInt64FieldWithDefault(msg, 9, 512),
    disableSkills: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getBooleanFieldLegacyNullable(msg, 29)),
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
 * @return {!jspb$jetski_memory$MutableFuseConfig.ObjectFormat}
 */
jspb$jetski_memory$MutableFuseConfig.prototype.toObject = function() {
  return /** @type {!jspb$jetski_memory$MutableFuseConfig.ObjectFormat} */ (jspb$o$jetski_memory$FuseConfig.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$jetski_memory$MutableFuseConfig.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$jetski_memory$MutableFuseConfig}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$jetski_memory$FuseConfig.fromObject = function(obj) {
  const msg = new jspb$jetski_memory$MutableFuseConfig();
  jspb_internal_adapters.setStringField(msg, 1, obj.config);
  jspb_internal_adapters.setOneofStringField(msg, 2, jspb$jetski_memory$MutableFuseConfig.oneofGroup_backend_config_, obj.smithBackendTarget);
  jspb_internal_adapters.setOneofStringField(msg, 26, jspb$jetski_memory$MutableFuseConfig.oneofGroup_backend_config_, obj.dumboBackendTarget);
  jspb_internal_adapters.setOneofWrapperField(msg,
      jspb$jetski_memory$MutableFakeMemoryBackendConfig,
      21, jspb$jetski_memory$MutableFuseConfig.oneofGroup_backend_config_, jspb_internal_public_for_gencode.fromObjectNullable(obj.fakeBackend, jspb$o$jetski_memory$FakeMemoryBackendConfig.fromObject));
  jspb_internal_adapters.setStringField(msg, 12, obj.rootDir);
  jspb_internal_adapters.setRepeatedStringField(msg, 20, obj.memoryGroupsList);
  obj.mountsMap && jspb_internal_public_for_gencode.mapFromObject(msg.getMountsMap(), obj.mountsMap, jspb$o$jetski_memory$MemoryMountConfig.fromObject);
  jspb_internal_adapters.setBooleanField(msg, 5, obj.debug);
  jspb_internal_adapters.setStringField(msg, 23, obj.daemonSocketFile);
  jspb_internal_adapters.setInt32Field(msg, 28, obj.daemonPort);
  jspb_internal_adapters.setStringField(msg, 15, obj.logDir);
  jspb_internal_adapters.setInt32Field(msg, 6, obj.numThreads);
  jspb_internal_adapters.setBooleanField(msg, 14, obj.asyncFlush);
  jspb_internal_adapters.setWrapperField(msg,
      jspb$google$protobuf$MutableDuration,
      18, jspb_internal_public_for_gencode.fromObjectNullable(obj.debounceWindow, jspb$o$google$protobuf$Duration.fromObject));
  jspb_internal_adapters.setWrapperField(msg,
      jspb$google$protobuf$MutableDuration,
      19, jspb_internal_public_for_gencode.fromObjectNullable(obj.pollChangesPeriod, jspb$o$google$protobuf$Duration.fromObject));
  jspb_internal_adapters.setInt64Field(msg, 9, obj.cacheMaxMb);
  jspb_internal_adapters.setBooleanField(msg, 29, obj.disableSkills);
  return msg;
};
}

var jspb$o$jetski_memory$MemoryConfig;
Object.defineProperty(this, 'jspb$o$jetski_memory$MemoryConfig', {
  get() { return jspb$o$jetski_memory$MemoryConfig; },
  set(v) { jspb$o$jetski_memory$MemoryConfig = v; },
