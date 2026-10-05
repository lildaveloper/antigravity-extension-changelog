// source: devtools/jetski/boq/provisioning_service/proto/provisioning.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$devtools_jetski_provisioning$Instance');

goog.require('jspb$devtools_jetski_provisioning$MutableInstance');
goog.require('jspb$devtools_jetski_provisioning$MutableInstanceMetrics');
goog.require('jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo');
goog.require('jspb$google$protobuf$MutableTimestamp');
goog.require('jspb$o$devtools_jetski_provisioning$InstanceMetrics');
goog.require('jspb$o$devtools_jetski_provisioning$storage$SidecarStatusInfo');
goog.require('jspb$o$google$protobuf$Timestamp');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$devtools_jetski_provisioning$MutableInstance|undefined} msg The msg instance to transform.
 * @return {!jspb$devtools_jetski_provisioning$MutableInstance.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$devtools_jetski_provisioning$Instance.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$devtools_jetski_provisioning$MutableInstance.ObjectFormat} */ ({
    replicaIndex: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getInt32FieldLegacyNullable(msg, 1)),
    instanceId: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 2)),
    instanceFqdn: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 3)),
    jetskiPort: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getInt32FieldLegacyNullable(msg, 4)),
    jetskiCsrfToken: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 7)),
    expiryTime: jspb$o$google$protobuf$Timestamp.internal_toObject(msg.getExpiryTime()),
    lastCheckinTime: jspb$o$google$protobuf$Timestamp.internal_toObject(msg.getLastCheckinTime()),
    status: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getEnumFieldLegacyNullable(msg, 6)),
    metrics: jspb$o$devtools_jetski_provisioning$InstanceMetrics.internal_toObject(msg.getMetrics()),
    sidecarsList: jspb_internal_public_for_gencode.toObjectList(msg.getSidecarsList(), jspb$o$devtools_jetski_provisioning$storage$SidecarStatusInfo.internal_toObject),
    version: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 10)),
    uptime7d: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getFloatingPointFieldLegacyNullable(msg, 11)),
    errorMessage: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 12)),
    createTime: jspb$o$google$protobuf$Timestamp.internal_toObject(msg.getCreateTime()),
    stopTime: jspb$o$google$protobuf$Timestamp.internal_toObject(msg.getStopTime()),
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
 * @return {!jspb$devtools_jetski_provisioning$MutableInstance.ObjectFormat}
 */
jspb$devtools_jetski_provisioning$MutableInstance.prototype.toObject = function() {
  return /** @type {!jspb$devtools_jetski_provisioning$MutableInstance.ObjectFormat} */ (jspb$o$devtools_jetski_provisioning$Instance.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$devtools_jetski_provisioning$MutableInstance.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$devtools_jetski_provisioning$MutableInstance}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$devtools_jetski_provisioning$Instance.fromObject = function(obj) {
  const msg = new jspb$devtools_jetski_provisioning$MutableInstance();
  jspb_internal_adapters.setInt32Field(msg, 1, obj.replicaIndex);
  jspb_internal_adapters.setStringField(msg, 2, obj.instanceId);
  jspb_internal_adapters.setStringField(msg, 3, obj.instanceFqdn);
  jspb_internal_adapters.setInt32Field(msg, 4, obj.jetskiPort);
  jspb_internal_adapters.setStringField(msg, 7, obj.jetskiCsrfToken);
  jspb_internal_adapters.setWrapperField(msg,
      jspb$google$protobuf$MutableTimestamp,
      5, jspb_internal_public_for_gencode.fromObjectNullable(obj.expiryTime, jspb$o$google$protobuf$Timestamp.fromObject));
  jspb_internal_adapters.setWrapperField(msg,
      jspb$google$protobuf$MutableTimestamp,
      17, jspb_internal_public_for_gencode.fromObjectNullable(obj.lastCheckinTime, jspb$o$google$protobuf$Timestamp.fromObject));
  jspb_internal_adapters.setEnumField(msg, 6, obj.status);
  jspb_internal_adapters.setWrapperField(msg,
      jspb$devtools_jetski_provisioning$MutableInstanceMetrics,
      8, jspb_internal_public_for_gencode.fromObjectNullable(obj.metrics, jspb$o$devtools_jetski_provisioning$InstanceMetrics.fromObject));
  jspb_internal_adapters.setRepeatedWrapperField(msg, jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo,
      9, jspb_internal_public_for_gencode.fromObjectList(obj.sidecarsList,         jspb$o$devtools_jetski_provisioning$storage$SidecarStatusInfo.fromObject));
  jspb_internal_adapters.setStringField(msg, 10, obj.version);
  jspb_internal_adapters.setFloatingPointField(msg, 11, obj.uptime7d);
  jspb_internal_adapters.setStringField(msg, 12, obj.errorMessage);
  jspb_internal_adapters.setWrapperField(msg,
      jspb$google$protobuf$MutableTimestamp,
      13, jspb_internal_public_for_gencode.fromObjectNullable(obj.createTime, jspb$o$google$protobuf$Timestamp.fromObject));
  jspb_internal_adapters.setWrapperField(msg,
      jspb$google$protobuf$MutableTimestamp,
      14, jspb_internal_public_for_gencode.fromObjectNullable(obj.stopTime, jspb$o$google$protobuf$Timestamp.fromObject));
  return msg;
};
}

var jspb$o$google$type$TimeZone;
Object.defineProperty(this, 'jspb$o$google$type$TimeZone', {
  get() { return jspb$o$google$type$TimeZone; },
  set(v) { jspb$o$google$type$TimeZone = v; },
