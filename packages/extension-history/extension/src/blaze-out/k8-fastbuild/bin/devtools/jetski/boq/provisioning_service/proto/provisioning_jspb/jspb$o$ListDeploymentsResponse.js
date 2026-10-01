// source: devtools/jetski/boq/provisioning_service/proto/provisioning.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$devtools_jetski_provisioning$ListDeploymentsResponse');

goog.require('jspb$devtools_jetski_provisioning$MutableDeployment');
goog.require('jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse');
goog.require('jspb$o$devtools_jetski_provisioning$Deployment');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse|undefined} msg The msg instance to transform.
 * @return {!jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$devtools_jetski_provisioning$ListDeploymentsResponse.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse.ObjectFormat} */ ({
    deploymentsList: jspb_internal_public_for_gencode.toObjectList(msg.getDeploymentsList(), jspb$o$devtools_jetski_provisioning$Deployment.internal_toObject),
    callerAutoRenewalEligibility: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getEnumFieldLegacyNullable(msg, 2)),
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
 * @return {!jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse.ObjectFormat}
 */
jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse.prototype.toObject = function() {
  return /** @type {!jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse.ObjectFormat} */ (jspb$o$devtools_jetski_provisioning$ListDeploymentsResponse.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$devtools_jetski_provisioning$ListDeploymentsResponse.fromObject = function(obj) {
  const msg = new jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse();
  jspb_internal_adapters.setRepeatedWrapperField(msg, jspb$devtools_jetski_provisioning$MutableDeployment,
      1, jspb_internal_public_for_gencode.fromObjectList(obj.deploymentsList,         jspb$o$devtools_jetski_provisioning$Deployment.fromObject));
  jspb_internal_adapters.setEnumField(msg, 2, obj.callerAutoRenewalEligibility);
  return msg;
};
}
