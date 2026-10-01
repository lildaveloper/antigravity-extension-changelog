// source: devtools/jetski/boq/provisioning_service/proto/deployment_config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$devtools_jetski_provisioning$ChatConfig');

goog.require('jspb$devtools_jetski_provisioning$MutableChatConfig');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$devtools_jetski_provisioning$MutableChatConfig|undefined} msg The msg instance to transform.
 * @return {!jspb$devtools_jetski_provisioning$MutableChatConfig.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$devtools_jetski_provisioning$ChatConfig.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$devtools_jetski_provisioning$MutableChatConfig.ObjectFormat} */ ({
    enabled: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getBooleanFieldLegacyNullable(msg, 1)),
    displayName: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 2)),
    avatarUrl: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 3)),
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
 * @return {!jspb$devtools_jetski_provisioning$MutableChatConfig.ObjectFormat}
 */
jspb$devtools_jetski_provisioning$MutableChatConfig.prototype.toObject = function() {
  return /** @type {!jspb$devtools_jetski_provisioning$MutableChatConfig.ObjectFormat} */ (jspb$o$devtools_jetski_provisioning$ChatConfig.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$devtools_jetski_provisioning$MutableChatConfig.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$devtools_jetski_provisioning$MutableChatConfig}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$devtools_jetski_provisioning$ChatConfig.fromObject = function(obj) {
  const msg = new jspb$devtools_jetski_provisioning$MutableChatConfig();
  jspb_internal_adapters.setBooleanField(msg, 1, obj.enabled);
  jspb_internal_adapters.setStringField(msg, 2, obj.displayName);
  jspb_internal_adapters.setStringField(msg, 3, obj.avatarUrl);
  return msg;
};
}

var jspb$o$devtools_jetski_provisioning$PathEntry;
Object.defineProperty(this, 'jspb$o$devtools_jetski_provisioning$PathEntry', {
  get() { return jspb$o$devtools_jetski_provisioning$PathEntry; },
  set(v) { jspb$o$devtools_jetski_provisioning$PathEntry = v; },
