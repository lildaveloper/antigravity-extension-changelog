// source: third_party/jetski/codeium_common_pb/codeium_common.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$exa$codeium_common_pb$PermissionGrantsConfig');

goog.require('jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig|undefined} msg The msg instance to transform.
 * @return {!jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$exa$codeium_common_pb$PermissionGrantsConfig.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig.ObjectFormat} */ ({
    allowList: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getRepeatedStringField(msg, 1, jspb_internal_adapters.RepeatedArrayReturnType.EITHER_FROZEN_OR_UNFROZEN)),
    denyList: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getRepeatedStringField(msg, 2, jspb_internal_adapters.RepeatedArrayReturnType.EITHER_FROZEN_OR_UNFROZEN)),
    askList: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getRepeatedStringField(msg, 3, jspb_internal_adapters.RepeatedArrayReturnType.EITHER_FROZEN_OR_UNFROZEN)),
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
 * @return {!jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig.ObjectFormat}
 */
jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig.prototype.toObject = function() {
  return /** @type {!jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig.ObjectFormat} */ (jspb$o$exa$codeium_common_pb$PermissionGrantsConfig.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$exa$codeium_common_pb$PermissionGrantsConfig.fromObject = function(obj) {
  const msg = new jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig();
  jspb_internal_adapters.setRepeatedStringField(msg, 1, obj.allowList);
  jspb_internal_adapters.setRepeatedStringField(msg, 2, obj.denyList);
  jspb_internal_adapters.setRepeatedStringField(msg, 3, obj.askList);
  return msg;
};
}

var jspb$o$jetbox_state_pb$CustomThemeSeeds;
Object.defineProperty(this, 'jspb$o$jetbox_state_pb$CustomThemeSeeds', {
  get() { return jspb$o$jetbox_state_pb$CustomThemeSeeds; },
  set(v) { jspb$o$jetbox_state_pb$CustomThemeSeeds = v; },
