// source: devtools/jetski/boq/provisioning_service/proto/provisioning.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$devtools_jetski_provisioning$InstanceMetrics');

goog.require('jspb$devtools_jetski_provisioning$MutableInstanceMetrics');
goog.require('jspb$devtools_jetski_provisioning$MutableX20QuotaUsage');
goog.require('jspb$o$devtools_jetski_provisioning$X20QuotaUsage');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$devtools_jetski_provisioning$MutableInstanceMetrics|undefined} msg The msg instance to transform.
 * @return {!jspb$devtools_jetski_provisioning$MutableInstanceMetrics.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$devtools_jetski_provisioning$InstanceMetrics.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$devtools_jetski_provisioning$MutableInstanceMetrics.ObjectFormat} */ ({
    loadAverage: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getFloatingPointFieldLegacyNullable(msg, 1)),
    cpuCount: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getInt32FieldLegacyNullable(msg, 6)),
    ramUsedMbytes: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getInt64FieldLegacyNullable(msg, 2)),
    ramTotalMbytes: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getInt64FieldLegacyNullable(msg, 3)),
    diskUsedMbytes: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getInt64FieldLegacyNullable(msg, 4)),
    diskTotalMbytes: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getInt64FieldLegacyNullable(msg, 5)),
    x20QuotasList: jspb_internal_public_for_gencode.toObjectList(msg.getX20QuotasList(), jspb$o$devtools_jetski_provisioning$X20QuotaUsage.internal_toObject),
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
 * @return {!jspb$devtools_jetski_provisioning$MutableInstanceMetrics.ObjectFormat}
 */
jspb$devtools_jetski_provisioning$MutableInstanceMetrics.prototype.toObject = function() {
  return /** @type {!jspb$devtools_jetski_provisioning$MutableInstanceMetrics.ObjectFormat} */ (jspb$o$devtools_jetski_provisioning$InstanceMetrics.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$devtools_jetski_provisioning$MutableInstanceMetrics.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$devtools_jetski_provisioning$MutableInstanceMetrics}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$devtools_jetski_provisioning$InstanceMetrics.fromObject = function(obj) {
  const msg = new jspb$devtools_jetski_provisioning$MutableInstanceMetrics();
  jspb_internal_adapters.setFloatingPointField(msg, 1, obj.loadAverage);
  jspb_internal_adapters.setInt32Field(msg, 6, obj.cpuCount);
  jspb_internal_adapters.setInt64Field(msg, 2, obj.ramUsedMbytes);
  jspb_internal_adapters.setInt64Field(msg, 3, obj.ramTotalMbytes);
  jspb_internal_adapters.setInt64Field(msg, 4, obj.diskUsedMbytes);
  jspb_internal_adapters.setInt64Field(msg, 5, obj.diskTotalMbytes);
  jspb_internal_adapters.setRepeatedWrapperField(msg, jspb$devtools_jetski_provisioning$MutableX20QuotaUsage,
      7, jspb_internal_public_for_gencode.fromObjectList(obj.x20QuotasList,         jspb$o$devtools_jetski_provisioning$X20QuotaUsage.fromObject));
  return msg;
};
}

var jspb$o$devtools_jetski_provisioning$storage$SidecarStatusInfo;
Object.defineProperty(this, 'jspb$o$devtools_jetski_provisioning$storage$SidecarStatusInfo', {
  get() { return jspb$o$devtools_jetski_provisioning$storage$SidecarStatusInfo; },
  set(v) { jspb$o$devtools_jetski_provisioning$storage$SidecarStatusInfo = v; },
