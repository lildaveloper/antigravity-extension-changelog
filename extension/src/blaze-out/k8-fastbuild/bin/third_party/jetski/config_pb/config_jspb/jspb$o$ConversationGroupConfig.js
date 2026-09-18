// source: third_party/jetski/config_pb/config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$exa$config_pb$ConversationGroupConfig');

goog.require('jspb$exa$config_pb$MutableConversationGroupConfig');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$exa$config_pb$MutableConversationGroupConfig|undefined} msg The msg instance to transform.
 * @return {!jspb$exa$config_pb$MutableConversationGroupConfig.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$exa$config_pb$ConversationGroupConfig.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$exa$config_pb$MutableConversationGroupConfig.ObjectFormat} */ ({
    name: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 1)),
    sortOrder: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getInt32FieldLegacyNullable(msg, 2)),
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
 * @return {!jspb$exa$config_pb$MutableConversationGroupConfig.ObjectFormat}
 */
jspb$exa$config_pb$MutableConversationGroupConfig.prototype.toObject = function() {
  return /** @type {!jspb$exa$config_pb$MutableConversationGroupConfig.ObjectFormat} */ (jspb$o$exa$config_pb$ConversationGroupConfig.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$exa$config_pb$MutableConversationGroupConfig.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$exa$config_pb$MutableConversationGroupConfig}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$exa$config_pb$ConversationGroupConfig.fromObject = function(obj) {
  const msg = new jspb$exa$config_pb$MutableConversationGroupConfig();
  jspb_internal_adapters.setStringField(msg, 1, obj.name);
  jspb_internal_adapters.setInt32Field(msg, 2, obj.sortOrder);
  return msg;
};
}

var jspb$o$exa$config_pb$ConversationGroupRegistry;
Object.defineProperty(this, 'jspb$o$exa$config_pb$ConversationGroupRegistry', {
  get() { return jspb$o$exa$config_pb$ConversationGroupRegistry; },
  set(v) { jspb$o$exa$config_pb$ConversationGroupRegistry = v; },
