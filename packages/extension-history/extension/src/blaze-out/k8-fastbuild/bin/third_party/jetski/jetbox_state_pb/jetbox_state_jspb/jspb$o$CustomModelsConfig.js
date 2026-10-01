// source: third_party/jetski/jetbox_state_pb/jetbox_state.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$jetbox_state_pb$CustomModelsConfig');

goog.require('jspb$jetbox_state_pb$MutableCustomModelsConfig');
goog.require('jspb$o$exa$codeium_common_pb$ModelInfo');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$jetbox_state_pb$MutableCustomModelsConfig|undefined} msg The msg instance to transform.
 * @return {!jspb$jetbox_state_pb$MutableCustomModelsConfig.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$jetbox_state_pb$CustomModelsConfig.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$jetbox_state_pb$MutableCustomModelsConfig.ObjectFormat} */ ({
    customModelsMap: jspb_internal_public_for_gencode.mapToObject(msg.getCustomModelsMap(),
      jspb$o$exa$codeium_common_pb$ModelInfo.internal_toObject),
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
 * @return {!jspb$jetbox_state_pb$MutableCustomModelsConfig.ObjectFormat}
 */
jspb$jetbox_state_pb$MutableCustomModelsConfig.prototype.toObject = function() {
  return /** @type {!jspb$jetbox_state_pb$MutableCustomModelsConfig.ObjectFormat} */ (jspb$o$jetbox_state_pb$CustomModelsConfig.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$jetbox_state_pb$MutableCustomModelsConfig.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$jetbox_state_pb$MutableCustomModelsConfig}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$jetbox_state_pb$CustomModelsConfig.fromObject = function(obj) {
  const msg = new jspb$jetbox_state_pb$MutableCustomModelsConfig();
  obj.customModelsMap && jspb_internal_public_for_gencode.mapFromObject(msg.getCustomModelsMap(), obj.customModelsMap, jspb$o$exa$codeium_common_pb$ModelInfo.fromObject);
  return msg;
};
}

var jspb$o$jetbox_state_pb$GoogleSpecificSettings;
Object.defineProperty(this, 'jspb$o$jetbox_state_pb$GoogleSpecificSettings', {
  get() { return jspb$o$jetbox_state_pb$GoogleSpecificSettings; },
  set(v) { jspb$o$jetbox_state_pb$GoogleSpecificSettings = v; },
