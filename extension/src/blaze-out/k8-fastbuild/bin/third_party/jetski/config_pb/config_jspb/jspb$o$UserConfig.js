// source: third_party/jetski/config_pb/config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$exa$config_pb$UserConfig');

goog.require('jspb$exa$config_pb$MutableUserConfig');
goog.require('jspb$jetbox_state_pb$MutableUserSettings');
goog.require('jspb$o$exa$config_pb$PluginUserConfig');
goog.require('jspb$o$exa$cortex_pb$SidecarUserConfig');
goog.require('jspb$o$jetbox_state_pb$UserSettings');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$exa$config_pb$MutableUserConfig|undefined} msg The msg instance to transform.
 * @return {!jspb$exa$config_pb$MutableUserConfig.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$exa$config_pb$UserConfig.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$exa$config_pb$MutableUserConfig.ObjectFormat} */ ({
    sidecarsMap: jspb_internal_public_for_gencode.mapToObject(msg.getSidecarsMap(),
      jspb$o$exa$cortex_pb$SidecarUserConfig.internal_toObject),
    userSettings: jspb$o$jetbox_state_pb$UserSettings.internal_toObject(msg.getUserSettings()),
    pluginsMap: jspb_internal_public_for_gencode.mapToObject(msg.getPluginsMap(),
      jspb$o$exa$config_pb$PluginUserConfig.internal_toObject),
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
 * @return {!jspb$exa$config_pb$MutableUserConfig.ObjectFormat}
 */
jspb$exa$config_pb$MutableUserConfig.prototype.toObject = function() {
  return /** @type {!jspb$exa$config_pb$MutableUserConfig.ObjectFormat} */ (jspb$o$exa$config_pb$UserConfig.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$exa$config_pb$MutableUserConfig.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$exa$config_pb$MutableUserConfig}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$exa$config_pb$UserConfig.fromObject = function(obj) {
  const msg = new jspb$exa$config_pb$MutableUserConfig();
  obj.sidecarsMap && jspb_internal_public_for_gencode.mapFromObject(msg.getSidecarsMap(), obj.sidecarsMap, jspb$o$exa$cortex_pb$SidecarUserConfig.fromObject);
  jspb_internal_adapters.setWrapperField(msg,
      jspb$jetbox_state_pb$MutableUserSettings,
      2, jspb_internal_public_for_gencode.fromObjectNullable(obj.userSettings, jspb$o$jetbox_state_pb$UserSettings.fromObject));
  obj.pluginsMap && jspb_internal_public_for_gencode.mapFromObject(msg.getPluginsMap(), obj.pluginsMap, jspb$o$exa$config_pb$PluginUserConfig.fromObject);
  return msg;
};
}

var jspb$o$exa$codeium_common_pb$ModelFeatures;
Object.defineProperty(this, 'jspb$o$exa$codeium_common_pb$ModelFeatures', {
  get() { return jspb$o$exa$codeium_common_pb$ModelFeatures; },
  set(v) { jspb$o$exa$codeium_common_pb$ModelFeatures = v; },
