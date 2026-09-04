// source: learning/gemini/agents/projects/memory/deployment/config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$jetski_memory$AmbientInjectionConfig');

goog.require('jspb$jetski_memory$MutableAmbientInjectionConfig');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$jetski_memory$MutableAmbientInjectionConfig|undefined} msg The msg instance to transform.
 * @return {!jspb$jetski_memory$MutableAmbientInjectionConfig.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$jetski_memory$AmbientInjectionConfig.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$jetski_memory$MutableAmbientInjectionConfig.ObjectFormat} */ ({
    disable: jspb_internal_adapters.getBooleanFieldWithDefault(msg, 1),
    bin: jspb_internal_adapters.getStringFieldWithDefault(msg, 2),
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
 * @return {!jspb$jetski_memory$MutableAmbientInjectionConfig.ObjectFormat}
 */
jspb$jetski_memory$MutableAmbientInjectionConfig.prototype.toObject = function() {
  return /** @type {!jspb$jetski_memory$MutableAmbientInjectionConfig.ObjectFormat} */ (jspb$o$jetski_memory$AmbientInjectionConfig.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$jetski_memory$MutableAmbientInjectionConfig.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$jetski_memory$MutableAmbientInjectionConfig}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$jetski_memory$AmbientInjectionConfig.fromObject = function(obj) {
  const msg = new jspb$jetski_memory$MutableAmbientInjectionConfig();
  jspb_internal_adapters.setProto3BooleanField(msg, 1, obj.disable);
  jspb_internal_adapters.setProto3StringField(msg, 2, obj.bin);
  return msg;
};
}

var jspb$o$jetski_memory$DreamingConfig;
Object.defineProperty(this, 'jspb$o$jetski_memory$DreamingConfig', {
  get() { return jspb$o$jetski_memory$DreamingConfig; },
  set(v) { jspb$o$jetski_memory$DreamingConfig = v; },
