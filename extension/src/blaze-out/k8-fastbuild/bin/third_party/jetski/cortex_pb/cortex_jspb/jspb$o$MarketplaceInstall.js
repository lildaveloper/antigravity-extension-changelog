// source: third_party/jetski/cortex_pb/cortex.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$exa$cortex_pb$MarketplaceInstall');

goog.require('jspb$exa$cortex_pb$MutableMarketplaceInstall');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$exa$cortex_pb$MutableMarketplaceInstall|undefined} msg The msg instance to transform.
 * @return {!jspb$exa$cortex_pb$MutableMarketplaceInstall.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$exa$cortex_pb$MarketplaceInstall.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$exa$cortex_pb$MutableMarketplaceInstall.ObjectFormat} */ ({
    marketplace: jspb_internal_adapters.getStringFieldWithDefault(msg, 1),
    id: jspb_internal_adapters.getStringFieldWithDefault(msg, 2),
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
 * @return {!jspb$exa$cortex_pb$MutableMarketplaceInstall.ObjectFormat}
 */
jspb$exa$cortex_pb$MutableMarketplaceInstall.prototype.toObject = function() {
  return /** @type {!jspb$exa$cortex_pb$MutableMarketplaceInstall.ObjectFormat} */ (jspb$o$exa$cortex_pb$MarketplaceInstall.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$exa$cortex_pb$MutableMarketplaceInstall.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$exa$cortex_pb$MutableMarketplaceInstall}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$exa$cortex_pb$MarketplaceInstall.fromObject = function(obj) {
  const msg = new jspb$exa$cortex_pb$MutableMarketplaceInstall();
  jspb_internal_adapters.setProto3StringField(msg, 1, obj.marketplace);
  jspb_internal_adapters.setProto3StringField(msg, 2, obj.id);
  return msg;
};
}

var jspb$o$exa$config_pb$PluginUserConfig;
Object.defineProperty(this, 'jspb$o$exa$config_pb$PluginUserConfig', {
  get() { return jspb$o$exa$config_pb$PluginUserConfig; },
  set(v) { jspb$o$exa$config_pb$PluginUserConfig = v; },
