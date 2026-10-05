// source: google/protobuf/timestamp.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$google$protobuf$Timestamp');

goog.require('jspb$google$protobuf$MutableTimestamp');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$google$protobuf$MutableTimestamp|undefined} msg The msg instance to transform.
 * @return {!jspb$google$protobuf$MutableTimestamp.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$google$protobuf$Timestamp.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$google$protobuf$MutableTimestamp.ObjectFormat} */ ({
    seconds: jspb_internal_adapters.getInt64FieldWithDefault(msg, 1),
    nanos: jspb_internal_adapters.getInt32FieldWithDefault(msg, 2),
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
 * @return {!jspb$google$protobuf$MutableTimestamp.ObjectFormat}
 */
jspb$google$protobuf$MutableTimestamp.prototype.toObject = function() {
  return /** @type {!jspb$google$protobuf$MutableTimestamp.ObjectFormat} */ (jspb$o$google$protobuf$Timestamp.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$google$protobuf$MutableTimestamp.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$google$protobuf$MutableTimestamp}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$google$protobuf$Timestamp.fromObject = function(obj) {
  const msg = new jspb$google$protobuf$MutableTimestamp();
  jspb_internal_adapters.setProto3Int64Field(msg, 1, obj.seconds);
  jspb_internal_adapters.setProto3Int32Field(msg, 2, obj.nanos);
  return msg;
};
}

var jspb$o$devtools_jetski_provisioning$VolumeClientConfig;
Object.defineProperty(this, 'jspb$o$devtools_jetski_provisioning$VolumeClientConfig', {
  get() { return jspb$o$devtools_jetski_provisioning$VolumeClientConfig; },
  set(v) { jspb$o$devtools_jetski_provisioning$VolumeClientConfig = v; },
