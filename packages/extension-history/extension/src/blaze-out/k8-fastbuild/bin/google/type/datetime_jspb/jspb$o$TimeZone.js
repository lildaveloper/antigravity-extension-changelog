// source: google/type/datetime.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$google$type$TimeZone');

goog.require('jspb$google$type$MutableTimeZone');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$google$type$MutableTimeZone|undefined} msg The msg instance to transform.
 * @return {!jspb$google$type$MutableTimeZone.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$google$type$TimeZone.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$google$type$MutableTimeZone.ObjectFormat} */ ({
    id: jspb_internal_adapters.getStringFieldWithDefault(msg, 1),
    version: jspb_internal_adapters.getStringFieldWithDefault(msg, 2),
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
 * @return {!jspb$google$type$MutableTimeZone.ObjectFormat}
 */
jspb$google$type$MutableTimeZone.prototype.toObject = function() {
  return /** @type {!jspb$google$type$MutableTimeZone.ObjectFormat} */ (jspb$o$google$type$TimeZone.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$google$type$MutableTimeZone.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$google$type$MutableTimeZone}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$google$type$TimeZone.fromObject = function(obj) {
  const msg = new jspb$google$type$MutableTimeZone();
  jspb_internal_adapters.setProto3StringField(msg, 1, obj.id);
  jspb_internal_adapters.setProto3StringField(msg, 2, obj.version);
  return msg;
};
}

var jspb$o$devtools_jetski_provisioning$AutoRenewalPolicy;
Object.defineProperty(this, 'jspb$o$devtools_jetski_provisioning$AutoRenewalPolicy', {
  get() { return jspb$o$devtools_jetski_provisioning$AutoRenewalPolicy; },
  set(v) { jspb$o$devtools_jetski_provisioning$AutoRenewalPolicy = v; },
