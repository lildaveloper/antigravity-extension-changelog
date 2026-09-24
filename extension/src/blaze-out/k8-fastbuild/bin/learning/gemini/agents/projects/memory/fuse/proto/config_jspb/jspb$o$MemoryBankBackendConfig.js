// source: learning/gemini/agents/projects/memory/fuse/proto/config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$jetski_memory$MemoryBankBackendConfig');

goog.require('jspb$jetski_memory$MutableMemoryBankBackendConfig');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$jetski_memory$MutableMemoryBankBackendConfig|undefined} msg The msg instance to transform.
 * @return {!jspb$jetski_memory$MutableMemoryBankBackendConfig.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$jetski_memory$MemoryBankBackendConfig.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$jetski_memory$MutableMemoryBankBackendConfig.ObjectFormat} */ ({
    target: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 1)),
    parent: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 2)),
    agentId: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 3)),
    bundleType: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 4)),
    readOnly: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getBooleanFieldLegacyNullable(msg, 5)),
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
 * @return {!jspb$jetski_memory$MutableMemoryBankBackendConfig.ObjectFormat}
 */
jspb$jetski_memory$MutableMemoryBankBackendConfig.prototype.toObject = function() {
  return /** @type {!jspb$jetski_memory$MutableMemoryBankBackendConfig.ObjectFormat} */ (jspb$o$jetski_memory$MemoryBankBackendConfig.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$jetski_memory$MutableMemoryBankBackendConfig.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$jetski_memory$MutableMemoryBankBackendConfig}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$jetski_memory$MemoryBankBackendConfig.fromObject = function(obj) {
  const msg = new jspb$jetski_memory$MutableMemoryBankBackendConfig();
  jspb_internal_adapters.setStringField(msg, 1, obj.target);
  jspb_internal_adapters.setStringField(msg, 2, obj.parent);
  jspb_internal_adapters.setStringField(msg, 3, obj.agentId);
  jspb_internal_adapters.setStringField(msg, 4, obj.bundleType);
  jspb_internal_adapters.setBooleanField(msg, 5, obj.readOnly);
  return msg;
};
}

var jspb$o$jetski_memory$SkillsBackendConfig;
Object.defineProperty(this, 'jspb$o$jetski_memory$SkillsBackendConfig', {
  get() { return jspb$o$jetski_memory$SkillsBackendConfig; },
  set(v) { jspb$o$jetski_memory$SkillsBackendConfig = v; },
