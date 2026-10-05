// source: devtools/jetski/boq/provisioning_service/proto/vmstorage_config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$devtools_jetski_provisioning$VolumeClientConfig');

goog.require('jspb$devtools_jetski_provisioning$MutableVolumeClientConfig');
goog.require('jspb$google$protobuf$MutableTimestamp');
goog.require('jspb$o$google$protobuf$Timestamp');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$devtools_jetski_provisioning$MutableVolumeClientConfig|undefined} msg The msg instance to transform.
 * @return {!jspb$devtools_jetski_provisioning$MutableVolumeClientConfig.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$devtools_jetski_provisioning$VolumeClientConfig.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$devtools_jetski_provisioning$MutableVolumeClientConfig.ObjectFormat} */ ({
    family: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 1)),
    user: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 2)),
    volume: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 3)),
    authToken: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 4)),
    authTokenExpiration: jspb$o$google$protobuf$Timestamp.internal_toObject(msg.getAuthTokenExpiration()),
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
 * @return {!jspb$devtools_jetski_provisioning$MutableVolumeClientConfig.ObjectFormat}
 */
jspb$devtools_jetski_provisioning$MutableVolumeClientConfig.prototype.toObject = function() {
  return /** @type {!jspb$devtools_jetski_provisioning$MutableVolumeClientConfig.ObjectFormat} */ (jspb$o$devtools_jetski_provisioning$VolumeClientConfig.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$devtools_jetski_provisioning$MutableVolumeClientConfig.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$devtools_jetski_provisioning$MutableVolumeClientConfig}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$devtools_jetski_provisioning$VolumeClientConfig.fromObject = function(obj) {
  const msg = new jspb$devtools_jetski_provisioning$MutableVolumeClientConfig();
  jspb_internal_adapters.setStringField(msg, 1, obj.family);
  jspb_internal_adapters.setStringField(msg, 2, obj.user);
  jspb_internal_adapters.setStringField(msg, 3, obj.volume);
  jspb_internal_adapters.setStringField(msg, 4, obj.authToken);
  jspb_internal_adapters.setWrapperField(msg,
      jspb$google$protobuf$MutableTimestamp,
      5, jspb_internal_public_for_gencode.fromObjectNullable(obj.authTokenExpiration, jspb$o$google$protobuf$Timestamp.fromObject));
  return msg;
};
}

var jspb$o$devtools_jetski_provisioning$VolumeCreationConfig;
Object.defineProperty(this, 'jspb$o$devtools_jetski_provisioning$VolumeCreationConfig', {
  get() { return jspb$o$devtools_jetski_provisioning$VolumeCreationConfig; },
  set(v) { jspb$o$devtools_jetski_provisioning$VolumeCreationConfig = v; },
