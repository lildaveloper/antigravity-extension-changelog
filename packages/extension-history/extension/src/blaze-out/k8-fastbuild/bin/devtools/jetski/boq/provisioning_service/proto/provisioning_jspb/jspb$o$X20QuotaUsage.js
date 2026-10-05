// source: devtools/jetski/boq/provisioning_service/proto/provisioning.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$devtools_jetski_provisioning$X20QuotaUsage');

goog.require('jspb$devtools_jetski_provisioning$MutableX20QuotaUsage');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$devtools_jetski_provisioning$MutableX20QuotaUsage|undefined} msg The msg instance to transform.
 * @return {!jspb$devtools_jetski_provisioning$MutableX20QuotaUsage.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$devtools_jetski_provisioning$X20QuotaUsage.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$devtools_jetski_provisioning$MutableX20QuotaUsage.ObjectFormat} */ ({
    quotaPath: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 1)),
    usedMbytes: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getInt64FieldLegacyNullable(msg, 2)),
    totalMbytes: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getInt64FieldLegacyNullable(msg, 3)),
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
 * @return {!jspb$devtools_jetski_provisioning$MutableX20QuotaUsage.ObjectFormat}
 */
jspb$devtools_jetski_provisioning$MutableX20QuotaUsage.prototype.toObject = function() {
  return /** @type {!jspb$devtools_jetski_provisioning$MutableX20QuotaUsage.ObjectFormat} */ (jspb$o$devtools_jetski_provisioning$X20QuotaUsage.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$devtools_jetski_provisioning$MutableX20QuotaUsage.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$devtools_jetski_provisioning$MutableX20QuotaUsage}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$devtools_jetski_provisioning$X20QuotaUsage.fromObject = function(obj) {
  const msg = new jspb$devtools_jetski_provisioning$MutableX20QuotaUsage();
  jspb_internal_adapters.setStringField(msg, 1, obj.quotaPath);
  jspb_internal_adapters.setInt64Field(msg, 2, obj.usedMbytes);
  jspb_internal_adapters.setInt64Field(msg, 3, obj.totalMbytes);
  return msg;
};
}

var jspb$o$devtools_jetski_provisioning$InstanceMetrics;
Object.defineProperty(this, 'jspb$o$devtools_jetski_provisioning$InstanceMetrics', {
  get() { return jspb$o$devtools_jetski_provisioning$InstanceMetrics; },
  set(v) { jspb$o$devtools_jetski_provisioning$InstanceMetrics = v; },
