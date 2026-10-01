// source: third_party/jetski/config_pb/config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$exa$config_pb$PluginMcpUserConfig');

goog.require('jspb$exa$config_pb$MutablePluginMcpUserConfig');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$exa$config_pb$MutablePluginMcpUserConfig|undefined} msg The msg instance to transform.
 * @return {!jspb$exa$config_pb$MutablePluginMcpUserConfig.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$exa$config_pb$PluginMcpUserConfig.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$exa$config_pb$MutablePluginMcpUserConfig.ObjectFormat} */ ({
    variablesMap: jspb_internal_public_for_gencode.mapToObject(msg.getVariablesMap()),
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
 * @return {!jspb$exa$config_pb$MutablePluginMcpUserConfig.ObjectFormat}
 */
jspb$exa$config_pb$MutablePluginMcpUserConfig.prototype.toObject = function() {
  return /** @type {!jspb$exa$config_pb$MutablePluginMcpUserConfig.ObjectFormat} */ (jspb$o$exa$config_pb$PluginMcpUserConfig.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$exa$config_pb$MutablePluginMcpUserConfig.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$exa$config_pb$MutablePluginMcpUserConfig}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$exa$config_pb$PluginMcpUserConfig.fromObject = function(obj) {
  const msg = new jspb$exa$config_pb$MutablePluginMcpUserConfig();
  obj.variablesMap && jspb_internal_public_for_gencode.mapFromObject(msg.getVariablesMap(), obj.variablesMap);
  return msg;
};
}

var jspb$o$exa$cortex_pb$MarketplaceInstall;
Object.defineProperty(this, 'jspb$o$exa$cortex_pb$MarketplaceInstall', {
  get() { return jspb$o$exa$cortex_pb$MarketplaceInstall; },
  set(v) { jspb$o$exa$cortex_pb$MarketplaceInstall = v; },
