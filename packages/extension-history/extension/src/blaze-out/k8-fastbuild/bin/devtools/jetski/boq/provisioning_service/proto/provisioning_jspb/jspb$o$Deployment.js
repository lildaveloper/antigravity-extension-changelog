// source: devtools/jetski/boq/provisioning_service/proto/provisioning.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$devtools_jetski_provisioning$Deployment');

goog.require('jspb$devtools_jetski_provisioning$MutableBlueprintBinding');
goog.require('jspb$devtools_jetski_provisioning$MutableDeployment');
goog.require('jspb$devtools_jetski_provisioning$MutableDeploymentConfig');
goog.require('jspb$devtools_jetski_provisioning$MutableInstance');
goog.require('jspb$devtools_jetski_provisioning$MutableInstanceMetrics');
goog.require('jspb$devtools_jetski_provisioning$MutableProvisioningConfig');
goog.require('jspb$google$protobuf$MutableDuration');
goog.require('jspb$google$protobuf$MutableTimestamp');
goog.require('jspb$o$devtools_jetski_provisioning$BlueprintBinding');
goog.require('jspb$o$devtools_jetski_provisioning$DeploymentConfig');
goog.require('jspb$o$devtools_jetski_provisioning$Instance');
goog.require('jspb$o$devtools_jetski_provisioning$InstanceMetrics');
goog.require('jspb$o$devtools_jetski_provisioning$ProvisioningConfig');
goog.require('jspb$o$google$protobuf$Duration');
goog.require('jspb$o$google$protobuf$Timestamp');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$devtools_jetski_provisioning$MutableDeployment|undefined} msg The msg instance to transform.
 * @return {!jspb$devtools_jetski_provisioning$MutableDeployment.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$devtools_jetski_provisioning$Deployment.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$devtools_jetski_provisioning$MutableDeployment.ObjectFormat} */ ({
    deploymentId: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 1)),
    identity: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 8)),
    lifetime: jspb$o$google$protobuf$Duration.internal_toObject(msg.getLifetime()),
    alias: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 15)),
    config: jspb$o$devtools_jetski_provisioning$DeploymentConfig.internal_toObject(msg.getConfig()),
    blueprintBinding: jspb$o$devtools_jetski_provisioning$BlueprintBinding.internal_toObject(msg.getBlueprintBinding()),
    provisioningConfig: jspb$o$devtools_jetski_provisioning$ProvisioningConfig.internal_toObject(msg.getProvisioningConfig()),
    displayName: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 14)),
    tagsList: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getRepeatedStringField(msg, 13, jspb_internal_adapters.RepeatedArrayReturnType.EITHER_FROZEN_OR_UNFROZEN)),
    creator: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 2)),
    instanceId: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 3)),
    instanceFqdn: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 4)),
    status: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getEnumFieldLegacyNullable(msg, 5)),
    createTime: jspb$o$google$protobuf$Timestamp.internal_toObject(msg.getCreateTime()),
    updateTime: jspb$o$google$protobuf$Timestamp.internal_toObject(msg.getUpdateTime()),
    lastUpdatedBy: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 27)),
    expiryTime: jspb$o$google$protobuf$Timestamp.internal_toObject(msg.getExpiryTime()),
    jetskiPort: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getInt32FieldLegacyNullable(msg, 11)),
    jetskiCsrfToken: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 20)),
    instanceExpiryTime: jspb$o$google$protobuf$Timestamp.internal_toObject(msg.getInstanceExpiryTime()),
    lastCheckinTime: jspb$o$google$protobuf$Timestamp.internal_toObject(msg.getLastCheckinTime()),
    metrics: jspb$o$devtools_jetski_provisioning$InstanceMetrics.internal_toObject(msg.getMetrics()),
    desiredReplicas: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getInt32FieldLegacyNullable(msg, 18)),
    instancesList: jspb_internal_public_for_gencode.toObjectList(msg.getInstancesList(), jspb$o$devtools_jetski_provisioning$Instance.internal_toObject),
    autoRenewalEligibility: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getEnumFieldLegacyNullable(msg, 28)),
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
 * @return {!jspb$devtools_jetski_provisioning$MutableDeployment.ObjectFormat}
 */
jspb$devtools_jetski_provisioning$MutableDeployment.prototype.toObject = function() {
  return /** @type {!jspb$devtools_jetski_provisioning$MutableDeployment.ObjectFormat} */ (jspb$o$devtools_jetski_provisioning$Deployment.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$devtools_jetski_provisioning$MutableDeployment.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$devtools_jetski_provisioning$MutableDeployment}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$devtools_jetski_provisioning$Deployment.fromObject = function(obj) {
  const msg = new jspb$devtools_jetski_provisioning$MutableDeployment();
  jspb_internal_adapters.setStringField(msg, 1, obj.deploymentId);
  jspb_internal_adapters.setStringField(msg, 8, obj.identity);
  jspb_internal_adapters.setWrapperField(msg,
      jspb$google$protobuf$MutableDuration,
      10, jspb_internal_public_for_gencode.fromObjectNullable(obj.lifetime, jspb$o$google$protobuf$Duration.fromObject));
  jspb_internal_adapters.setStringField(msg, 15, obj.alias);
  jspb_internal_adapters.setWrapperField(msg,
      jspb$devtools_jetski_provisioning$MutableDeploymentConfig,
      9, jspb_internal_public_for_gencode.fromObjectNullable(obj.config, jspb$o$devtools_jetski_provisioning$DeploymentConfig.fromObject));
  jspb_internal_adapters.setWrapperField(msg,
      jspb$devtools_jetski_provisioning$MutableBlueprintBinding,
      22, jspb_internal_public_for_gencode.fromObjectNullable(obj.blueprintBinding, jspb$o$devtools_jetski_provisioning$BlueprintBinding.fromObject));
  jspb_internal_adapters.setWrapperField(msg,
      jspb$devtools_jetski_provisioning$MutableProvisioningConfig,
      24, jspb_internal_public_for_gencode.fromObjectNullable(obj.provisioningConfig, jspb$o$devtools_jetski_provisioning$ProvisioningConfig.fromObject));
  jspb_internal_adapters.setStringField(msg, 14, obj.displayName);
  jspb_internal_adapters.setRepeatedStringField(msg, 13, obj.tagsList);
  jspb_internal_adapters.setStringField(msg, 2, obj.creator);
  jspb_internal_adapters.setStringField(msg, 3, obj.instanceId);
  jspb_internal_adapters.setStringField(msg, 4, obj.instanceFqdn);
  jspb_internal_adapters.setEnumField(msg, 5, obj.status);
  jspb_internal_adapters.setWrapperField(msg,
      jspb$google$protobuf$MutableTimestamp,
      6, jspb_internal_public_for_gencode.fromObjectNullable(obj.createTime, jspb$o$google$protobuf$Timestamp.fromObject));
  jspb_internal_adapters.setWrapperField(msg,
      jspb$google$protobuf$MutableTimestamp,
      26, jspb_internal_public_for_gencode.fromObjectNullable(obj.updateTime, jspb$o$google$protobuf$Timestamp.fromObject));
  jspb_internal_adapters.setStringField(msg, 27, obj.lastUpdatedBy);
  jspb_internal_adapters.setWrapperField(msg,
      jspb$google$protobuf$MutableTimestamp,
      7, jspb_internal_public_for_gencode.fromObjectNullable(obj.expiryTime, jspb$o$google$protobuf$Timestamp.fromObject));
  jspb_internal_adapters.setInt32Field(msg, 11, obj.jetskiPort);
  jspb_internal_adapters.setStringField(msg, 20, obj.jetskiCsrfToken);
  jspb_internal_adapters.setWrapperField(msg,
      jspb$google$protobuf$MutableTimestamp,
      16, jspb_internal_public_for_gencode.fromObjectNullable(obj.instanceExpiryTime, jspb$o$google$protobuf$Timestamp.fromObject));
  jspb_internal_adapters.setWrapperField(msg,
      jspb$google$protobuf$MutableTimestamp,
      17, jspb_internal_public_for_gencode.fromObjectNullable(obj.lastCheckinTime, jspb$o$google$protobuf$Timestamp.fromObject));
  jspb_internal_adapters.setWrapperField(msg,
      jspb$devtools_jetski_provisioning$MutableInstanceMetrics,
      23, jspb_internal_public_for_gencode.fromObjectNullable(obj.metrics, jspb$o$devtools_jetski_provisioning$InstanceMetrics.fromObject));
  jspb_internal_adapters.setInt32Field(msg, 18, obj.desiredReplicas);
  jspb_internal_adapters.setRepeatedWrapperField(msg, jspb$devtools_jetski_provisioning$MutableInstance,
      19, jspb_internal_public_for_gencode.fromObjectList(obj.instancesList,         jspb$o$devtools_jetski_provisioning$Instance.fromObject));
  jspb_internal_adapters.setEnumField(msg, 28, obj.autoRenewalEligibility);
  return msg;
};
}

var jspb$o$devtools_jetski_provisioning$ListDeploymentsResponse;
Object.defineProperty(this, 'jspb$o$devtools_jetski_provisioning$ListDeploymentsResponse', {
  get() { return jspb$o$devtools_jetski_provisioning$ListDeploymentsResponse; },
  set(v) { jspb$o$devtools_jetski_provisioning$ListDeploymentsResponse = v; },
