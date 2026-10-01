// source: learning/gemini/agents/projects/memory/fuse/proto/config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$jetski_memory$MemoryMountConfig');

goog.require('jspb$google$protobuf$MutableDuration');
goog.require('jspb$jetski_memory$MutableDumboBackendConfig');
goog.require('jspb$jetski_memory$MutableFakeMemoryBackendConfig');
goog.require('jspb$jetski_memory$MutableMemoryBankBackendConfig');
goog.require('jspb$jetski_memory$MutableMemoryMountConfig');
goog.require('jspb$jetski_memory$MutableSkillsBackendConfig');
goog.require('jspb$jetski_memory$MutableSmithBackendConfig');
goog.require('jspb$o$google$protobuf$Duration');
goog.require('jspb$o$jetski_memory$DumboBackendConfig');
goog.require('jspb$o$jetski_memory$FakeMemoryBackendConfig');
goog.require('jspb$o$jetski_memory$MemoryBankBackendConfig');
goog.require('jspb$o$jetski_memory$SkillsBackendConfig');
goog.require('jspb$o$jetski_memory$SmithBackendConfig');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$jetski_memory$MutableMemoryMountConfig|undefined} msg The msg instance to transform.
 * @return {!jspb$jetski_memory$MutableMemoryMountConfig.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$jetski_memory$MemoryMountConfig.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$jetski_memory$MutableMemoryMountConfig.ObjectFormat} */ ({
    smith: jspb$o$jetski_memory$SmithBackendConfig.internal_toObject(msg.getSmith()),
    dumbo: jspb$o$jetski_memory$DumboBackendConfig.internal_toObject(msg.getDumbo()),
    fake: jspb$o$jetski_memory$FakeMemoryBackendConfig.internal_toObject(msg.getFake()),
    skills: jspb$o$jetski_memory$SkillsBackendConfig.internal_toObject(msg.getSkills()),
    memoryBank: jspb$o$jetski_memory$MemoryBankBackendConfig.internal_toObject(msg.getMemoryBank()),
    eagerCacheWarming: jspb_internal_adapters.getBooleanFieldWithDefault(msg, 4, true),
    pollChangesPeriod: jspb$o$google$protobuf$Duration.internal_toObject(msg.getPollChangesPeriod()),
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
 * @return {!jspb$jetski_memory$MutableMemoryMountConfig.ObjectFormat}
 */
jspb$jetski_memory$MutableMemoryMountConfig.prototype.toObject = function() {
  return /** @type {!jspb$jetski_memory$MutableMemoryMountConfig.ObjectFormat} */ (jspb$o$jetski_memory$MemoryMountConfig.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$jetski_memory$MutableMemoryMountConfig.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$jetski_memory$MutableMemoryMountConfig}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$jetski_memory$MemoryMountConfig.fromObject = function(obj) {
  const msg = new jspb$jetski_memory$MutableMemoryMountConfig();
  jspb_internal_adapters.setOneofWrapperField(msg,
      jspb$jetski_memory$MutableSmithBackendConfig,
      1, jspb$jetski_memory$MutableMemoryMountConfig.oneofGroup_backend_config_, jspb_internal_public_for_gencode.fromObjectNullable(obj.smith, jspb$o$jetski_memory$SmithBackendConfig.fromObject));
  jspb_internal_adapters.setOneofWrapperField(msg,
      jspb$jetski_memory$MutableDumboBackendConfig,
      2, jspb$jetski_memory$MutableMemoryMountConfig.oneofGroup_backend_config_, jspb_internal_public_for_gencode.fromObjectNullable(obj.dumbo, jspb$o$jetski_memory$DumboBackendConfig.fromObject));
  jspb_internal_adapters.setOneofWrapperField(msg,
      jspb$jetski_memory$MutableFakeMemoryBackendConfig,
      3, jspb$jetski_memory$MutableMemoryMountConfig.oneofGroup_backend_config_, jspb_internal_public_for_gencode.fromObjectNullable(obj.fake, jspb$o$jetski_memory$FakeMemoryBackendConfig.fromObject));
  jspb_internal_adapters.setOneofWrapperField(msg,
      jspb$jetski_memory$MutableSkillsBackendConfig,
      5, jspb$jetski_memory$MutableMemoryMountConfig.oneofGroup_backend_config_, jspb_internal_public_for_gencode.fromObjectNullable(obj.skills, jspb$o$jetski_memory$SkillsBackendConfig.fromObject));
  jspb_internal_adapters.setOneofWrapperField(msg,
      jspb$jetski_memory$MutableMemoryBankBackendConfig,
      8, jspb$jetski_memory$MutableMemoryMountConfig.oneofGroup_backend_config_, jspb_internal_public_for_gencode.fromObjectNullable(obj.memoryBank, jspb$o$jetski_memory$MemoryBankBackendConfig.fromObject));
  jspb_internal_adapters.setBooleanField(msg, 4, obj.eagerCacheWarming);
  jspb_internal_adapters.setWrapperField(msg,
      jspb$google$protobuf$MutableDuration,
      6, jspb_internal_public_for_gencode.fromObjectNullable(obj.pollChangesPeriod, jspb$o$google$protobuf$Duration.fromObject));
  return msg;
};
}

var jspb$o$jetski_memory$FuseConfig;
Object.defineProperty(this, 'jspb$o$jetski_memory$FuseConfig', {
  get() { return jspb$o$jetski_memory$FuseConfig; },
  set(v) { jspb$o$jetski_memory$FuseConfig = v; },
