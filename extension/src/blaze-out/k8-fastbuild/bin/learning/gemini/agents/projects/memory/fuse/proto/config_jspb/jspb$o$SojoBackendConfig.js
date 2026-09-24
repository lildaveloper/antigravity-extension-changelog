// source: learning/gemini/agents/projects/memory/fuse/proto/config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$jetski_memory$SojoBackendConfig');

goog.require('jspb$jetski_memory$MutableSojoBackendConfig');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$jetski_memory$MutableSojoBackendConfig|undefined} msg The msg instance to transform.
 * @return {!jspb$jetski_memory$MutableSojoBackendConfig.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$jetski_memory$SojoBackendConfig.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$jetski_memory$MutableSojoBackendConfig.ObjectFormat} */ ({
    target: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 1)),
    agentId: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 2)),
    readOnly: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getBooleanFieldLegacyNullable(msg, 3)),
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
 * @return {!jspb$jetski_memory$MutableSojoBackendConfig.ObjectFormat}
 */
jspb$jetski_memory$MutableSojoBackendConfig.prototype.toObject = function() {
  return /** @type {!jspb$jetski_memory$MutableSojoBackendConfig.ObjectFormat} */ (jspb$o$jetski_memory$SojoBackendConfig.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$jetski_memory$MutableSojoBackendConfig.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$jetski_memory$MutableSojoBackendConfig}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$jetski_memory$SojoBackendConfig.fromObject = function(obj) {
  const msg = new jspb$jetski_memory$MutableSojoBackendConfig();
  jspb_internal_adapters.setStringField(msg, 1, obj.target);
  jspb_internal_adapters.setStringField(msg, 2, obj.agentId);
  jspb_internal_adapters.setBooleanField(msg, 3, obj.readOnly);
  return msg;
};
}

var jspb$o$jetski_memory$MemoryMountConfig;
Object.defineProperty(this, 'jspb$o$jetski_memory$MemoryMountConfig', {
  get() { return jspb$o$jetski_memory$MemoryMountConfig; },
  set(v) { jspb$o$jetski_memory$MemoryMountConfig = v; },
