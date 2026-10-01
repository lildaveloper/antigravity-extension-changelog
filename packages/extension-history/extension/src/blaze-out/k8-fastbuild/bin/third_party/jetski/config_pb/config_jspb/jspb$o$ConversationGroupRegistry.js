// source: third_party/jetski/config_pb/config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$exa$config_pb$ConversationGroupRegistry');

goog.require('jspb$exa$config_pb$MutableConversationGroupRegistry');
goog.require('jspb$o$exa$config_pb$ConversationGroupConfig');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$exa$config_pb$MutableConversationGroupRegistry|undefined} msg The msg instance to transform.
 * @return {!jspb$exa$config_pb$MutableConversationGroupRegistry.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$exa$config_pb$ConversationGroupRegistry.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$exa$config_pb$MutableConversationGroupRegistry.ObjectFormat} */ ({
    groupsMap: jspb_internal_public_for_gencode.mapToObject(msg.getGroupsMap(),
      jspb$o$exa$config_pb$ConversationGroupConfig.internal_toObject),
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
 * @return {!jspb$exa$config_pb$MutableConversationGroupRegistry.ObjectFormat}
 */
jspb$exa$config_pb$MutableConversationGroupRegistry.prototype.toObject = function() {
  return /** @type {!jspb$exa$config_pb$MutableConversationGroupRegistry.ObjectFormat} */ (jspb$o$exa$config_pb$ConversationGroupRegistry.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$exa$config_pb$MutableConversationGroupRegistry.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$exa$config_pb$MutableConversationGroupRegistry}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$exa$config_pb$ConversationGroupRegistry.fromObject = function(obj) {
  const msg = new jspb$exa$config_pb$MutableConversationGroupRegistry();
  obj.groupsMap && jspb_internal_public_for_gencode.mapFromObject(msg.getGroupsMap(), obj.groupsMap, jspb$o$exa$config_pb$ConversationGroupConfig.fromObject);
  return msg;
};
}

var jspb$o$exa$config_pb$PluginMcpUserConfig;
Object.defineProperty(this, 'jspb$o$exa$config_pb$PluginMcpUserConfig', {
  get() { return jspb$o$exa$config_pb$PluginMcpUserConfig; },
  set(v) { jspb$o$exa$config_pb$PluginMcpUserConfig = v; },
