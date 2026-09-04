// source: devtools/jetski/boq/provisioning_service/proto/deployment_config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$devtools_jetski_provisioning$MemoryConfig');

goog.require('jspb$devtools_jetski_provisioning$MutableMemoryConfig');
goog.require('jspb$jetski_memory$MutableMemoryConfig');
goog.require('jspb$o$jetski_memory$MemoryConfig');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$devtools_jetski_provisioning$MutableMemoryConfig|undefined} msg The msg instance to transform.
 * @return {!jspb$devtools_jetski_provisioning$MutableMemoryConfig.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$devtools_jetski_provisioning$MemoryConfig.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$devtools_jetski_provisioning$MutableMemoryConfig.ObjectFormat} */ ({
    state: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getEnumFieldLegacyNullable(msg, 1)),
    config: jspb$o$jetski_memory$MemoryConfig.internal_toObject(msg.getConfig()),
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
 * @return {!jspb$devtools_jetski_provisioning$MutableMemoryConfig.ObjectFormat}
 */
jspb$devtools_jetski_provisioning$MutableMemoryConfig.prototype.toObject = function() {
  return /** @type {!jspb$devtools_jetski_provisioning$MutableMemoryConfig.ObjectFormat} */ (jspb$o$devtools_jetski_provisioning$MemoryConfig.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$devtools_jetski_provisioning$MutableMemoryConfig.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$devtools_jetski_provisioning$MutableMemoryConfig}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$devtools_jetski_provisioning$MemoryConfig.fromObject = function(obj) {
  const msg = new jspb$devtools_jetski_provisioning$MutableMemoryConfig();
  jspb_internal_adapters.setEnumField(msg, 1, obj.state);
  jspb_internal_adapters.setWrapperField(msg,
      jspb$jetski_memory$MutableMemoryConfig,
      2, jspb_internal_public_for_gencode.fromObjectNullable(obj.config, jspb$o$jetski_memory$MemoryConfig.fromObject));
  return msg;
};
}

var jspb$o$devtools_jetski_provisioning$Sidecar;
Object.defineProperty(this, 'jspb$o$devtools_jetski_provisioning$Sidecar', {
  get() { return jspb$o$devtools_jetski_provisioning$Sidecar; },
  set(v) { jspb$o$devtools_jetski_provisioning$Sidecar = v; },
