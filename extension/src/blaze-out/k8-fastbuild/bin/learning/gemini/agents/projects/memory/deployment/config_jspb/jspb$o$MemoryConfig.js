// source: learning/gemini/agents/projects/memory/deployment/config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$jetski_memory$MemoryConfig');

goog.require('jspb$jetski_memory$MutableAmbientInjectionConfig');
goog.require('jspb$jetski_memory$MutableDreamingConfig');
goog.require('jspb$jetski_memory$MutableFuseConfig');
goog.require('jspb$jetski_memory$MutableMemoryConfig');
goog.require('jspb$o$jetski_memory$AmbientInjectionConfig');
goog.require('jspb$o$jetski_memory$DreamingConfig');
goog.require('jspb$o$jetski_memory$FuseConfig');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$jetski_memory$MutableMemoryConfig|undefined} msg The msg instance to transform.
 * @return {!jspb$jetski_memory$MutableMemoryConfig.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$jetski_memory$MemoryConfig.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$jetski_memory$MutableMemoryConfig.ObjectFormat} */ ({
    ambientMemory: jspb$o$jetski_memory$AmbientInjectionConfig.internal_toObject(msg.getAmbientMemory()),
    dreaming: jspb$o$jetski_memory$DreamingConfig.internal_toObject(msg.getDreaming()),
    fuse: jspb$o$jetski_memory$FuseConfig.internal_toObject(msg.getFuse()),
    disableSkills: jspb_internal_adapters.getBooleanFieldWithDefault(msg, 5),
    profile: jspb_internal_adapters.getStringFieldWithDefault(msg, 6),
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
 * @return {!jspb$jetski_memory$MutableMemoryConfig.ObjectFormat}
 */
jspb$jetski_memory$MutableMemoryConfig.prototype.toObject = function() {
  return /** @type {!jspb$jetski_memory$MutableMemoryConfig.ObjectFormat} */ (jspb$o$jetski_memory$MemoryConfig.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$jetski_memory$MutableMemoryConfig.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$jetski_memory$MutableMemoryConfig}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$jetski_memory$MemoryConfig.fromObject = function(obj) {
  const msg = new jspb$jetski_memory$MutableMemoryConfig();
  jspb_internal_adapters.setWrapperField(msg,
      jspb$jetski_memory$MutableAmbientInjectionConfig,
      1, jspb_internal_public_for_gencode.fromObjectNullable(obj.ambientMemory, jspb$o$jetski_memory$AmbientInjectionConfig.fromObject));
  jspb_internal_adapters.setWrapperField(msg,
      jspb$jetski_memory$MutableDreamingConfig,
      4, jspb_internal_public_for_gencode.fromObjectNullable(obj.dreaming, jspb$o$jetski_memory$DreamingConfig.fromObject));
  jspb_internal_adapters.setWrapperField(msg,
      jspb$jetski_memory$MutableFuseConfig,
      3, jspb_internal_public_for_gencode.fromObjectNullable(obj.fuse, jspb$o$jetski_memory$FuseConfig.fromObject));
  jspb_internal_adapters.setProto3BooleanField(msg, 5, obj.disableSkills);
  jspb_internal_adapters.setProto3StringField(msg, 6, obj.profile);
  return msg;
};
}

var jspb$o$devtools_jetski_provisioning$MemoryConfig;
Object.defineProperty(this, 'jspb$o$devtools_jetski_provisioning$MemoryConfig', {
  get() { return jspb$o$devtools_jetski_provisioning$MemoryConfig; },
  set(v) { jspb$o$devtools_jetski_provisioning$MemoryConfig = v; },
