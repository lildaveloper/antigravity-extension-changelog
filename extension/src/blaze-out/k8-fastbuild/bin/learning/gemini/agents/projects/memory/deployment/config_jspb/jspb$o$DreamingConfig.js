// source: learning/gemini/agents/projects/memory/deployment/config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$jetski_memory$DreamingConfig');

goog.require('jspb$jetski_memory$MutableDreamingConfig');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$jetski_memory$MutableDreamingConfig|undefined} msg The msg instance to transform.
 * @return {!jspb$jetski_memory$MutableDreamingConfig.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$jetski_memory$DreamingConfig.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$jetski_memory$MutableDreamingConfig.ObjectFormat} */ ({
    disable: jspb_internal_adapters.getBooleanFieldWithDefault(msg, 1),
    promptPath: jspb_internal_adapters.getStringFieldWithDefault(msg, 2),
    bin: jspb_internal_adapters.getStringFieldWithDefault(msg, 3),
    modelEnum: jspb_internal_adapters.getEnumFieldWithDefault(msg, 4),
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
 * @return {!jspb$jetski_memory$MutableDreamingConfig.ObjectFormat}
 */
jspb$jetski_memory$MutableDreamingConfig.prototype.toObject = function() {
  return /** @type {!jspb$jetski_memory$MutableDreamingConfig.ObjectFormat} */ (jspb$o$jetski_memory$DreamingConfig.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$jetski_memory$MutableDreamingConfig.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$jetski_memory$MutableDreamingConfig}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$jetski_memory$DreamingConfig.fromObject = function(obj) {
  const msg = new jspb$jetski_memory$MutableDreamingConfig();
  jspb_internal_adapters.setProto3BooleanField(msg, 1, obj.disable);
  jspb_internal_adapters.setProto3StringField(msg, 2, obj.promptPath);
  jspb_internal_adapters.setProto3StringField(msg, 3, obj.bin);
  jspb_internal_adapters.setProto3EnumField(msg, 4, obj.modelEnum);
  return msg;
};
}

var jspb$o$google$protobuf$Duration;
Object.defineProperty(this, 'jspb$o$google$protobuf$Duration', {
  get() { return jspb$o$google$protobuf$Duration; },
  set(v) { jspb$o$google$protobuf$Duration = v; },
