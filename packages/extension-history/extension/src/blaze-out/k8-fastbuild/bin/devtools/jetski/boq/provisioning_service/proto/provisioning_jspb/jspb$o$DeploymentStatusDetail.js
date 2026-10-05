// source: devtools/jetski/boq/provisioning_service/proto/provisioning.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$devtools_jetski_provisioning$DeploymentStatusDetail');

goog.require('jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail');
goog.require('jspb$devtools_jetski_provisioning$MutableInstanceFailure');
goog.require('jspb$google$protobuf$MutableTimestamp');
goog.require('jspb$google$rpc$MutableStatus');
goog.require('jspb$o$devtools_jetski_provisioning$InstanceFailure');
goog.require('jspb$o$google$protobuf$Timestamp');
goog.require('jspb$o$google$rpc$Status');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail|undefined} msg The msg instance to transform.
 * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$devtools_jetski_provisioning$DeploymentStatusDetail.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail.ObjectFormat} */ ({
    message: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 1)),
    lastOperationError: jspb$o$google$rpc$Status.internal_toObject(msg.getLastOperationError()),
    failedOperationType: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getEnumFieldLegacyNullable(msg, 3)),
    lastOperationId: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 4)),
    statusTime: jspb$o$google$protobuf$Timestamp.internal_toObject(msg.getStatusTime()),
    failedPhase: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 6)),
    instanceFailuresList: jspb_internal_public_for_gencode.toObjectList(msg.getInstanceFailuresList(), jspb$o$devtools_jetski_provisioning$InstanceFailure.internal_toObject),
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
 * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail.ObjectFormat}
 */
jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail.prototype.toObject = function() {
  return /** @type {!jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail.ObjectFormat} */ (jspb$o$devtools_jetski_provisioning$DeploymentStatusDetail.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$devtools_jetski_provisioning$DeploymentStatusDetail.fromObject = function(obj) {
  const msg = new jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail();
  jspb_internal_adapters.setStringField(msg, 1, obj.message);
  jspb_internal_adapters.setWrapperField(msg,
      jspb$google$rpc$MutableStatus,
      2, jspb_internal_public_for_gencode.fromObjectNullable(obj.lastOperationError, jspb$o$google$rpc$Status.fromObject));
  jspb_internal_adapters.setEnumField(msg, 3, obj.failedOperationType);
  jspb_internal_adapters.setStringField(msg, 4, obj.lastOperationId);
  jspb_internal_adapters.setWrapperField(msg,
      jspb$google$protobuf$MutableTimestamp,
      5, jspb_internal_public_for_gencode.fromObjectNullable(obj.statusTime, jspb$o$google$protobuf$Timestamp.fromObject));
  jspb_internal_adapters.setStringField(msg, 6, obj.failedPhase);
  jspb_internal_adapters.setRepeatedWrapperField(msg, jspb$devtools_jetski_provisioning$MutableInstanceFailure,
      7, jspb_internal_public_for_gencode.fromObjectList(obj.instanceFailuresList,         jspb$o$devtools_jetski_provisioning$InstanceFailure.fromObject));
  return msg;
};
}

var jspb$o$devtools_jetski_provisioning$X20QuotaUsage;
Object.defineProperty(this, 'jspb$o$devtools_jetski_provisioning$X20QuotaUsage', {
  get() { return jspb$o$devtools_jetski_provisioning$X20QuotaUsage; },
  set(v) { jspb$o$devtools_jetski_provisioning$X20QuotaUsage = v; },
