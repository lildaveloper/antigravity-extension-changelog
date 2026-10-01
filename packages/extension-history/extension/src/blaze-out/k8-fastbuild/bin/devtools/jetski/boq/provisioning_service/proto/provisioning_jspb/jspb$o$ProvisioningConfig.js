// source: devtools/jetski/boq/provisioning_service/proto/provisioning.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$devtools_jetski_provisioning$ProvisioningConfig');

goog.require('jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy');
goog.require('jspb$devtools_jetski_provisioning$MutableProvisioningConfig');
goog.require('jspb$o$devtools_jetski_provisioning$AutoRenewalPolicy');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$devtools_jetski_provisioning$MutableProvisioningConfig|undefined} msg The msg instance to transform.
 * @return {!jspb$devtools_jetski_provisioning$MutableProvisioningConfig.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$devtools_jetski_provisioning$ProvisioningConfig.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$devtools_jetski_provisioning$MutableProvisioningConfig.ObjectFormat} */ ({
    capsuleAccountingGroup: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 1)),
    autoAddToGroupsList: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getRepeatedStringField(msg, 2, jspb_internal_adapters.RepeatedArrayReturnType.EITHER_FROZEN_OR_UNFROZEN)),
    deploymentName: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 3)),
    origin: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 4)),
    autoRenewalPolicy: jspb$o$devtools_jetski_provisioning$AutoRenewalPolicy.internal_toObject(msg.getAutoRenewalPolicy()),
    product: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getEnumFieldLegacyNullable(msg, 6)),
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
 * @return {!jspb$devtools_jetski_provisioning$MutableProvisioningConfig.ObjectFormat}
 */
jspb$devtools_jetski_provisioning$MutableProvisioningConfig.prototype.toObject = function() {
  return /** @type {!jspb$devtools_jetski_provisioning$MutableProvisioningConfig.ObjectFormat} */ (jspb$o$devtools_jetski_provisioning$ProvisioningConfig.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$devtools_jetski_provisioning$MutableProvisioningConfig.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$devtools_jetski_provisioning$MutableProvisioningConfig}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$devtools_jetski_provisioning$ProvisioningConfig.fromObject = function(obj) {
  const msg = new jspb$devtools_jetski_provisioning$MutableProvisioningConfig();
  jspb_internal_adapters.setStringField(msg, 1, obj.capsuleAccountingGroup);
  jspb_internal_adapters.setRepeatedStringField(msg, 2, obj.autoAddToGroupsList);
  jspb_internal_adapters.setStringField(msg, 3, obj.deploymentName);
  jspb_internal_adapters.setStringField(msg, 4, obj.origin);
  jspb_internal_adapters.setWrapperField(msg,
      jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy,
      5, jspb_internal_public_for_gencode.fromObjectNullable(obj.autoRenewalPolicy, jspb$o$devtools_jetski_provisioning$AutoRenewalPolicy.fromObject));
  jspb_internal_adapters.setEnumField(msg, 6, obj.product);
  return msg;
};
}

var jspb$o$devtools_jetski_provisioning$Deployment;
Object.defineProperty(this, 'jspb$o$devtools_jetski_provisioning$Deployment', {
  get() { return jspb$o$devtools_jetski_provisioning$Deployment; },
  set(v) { jspb$o$devtools_jetski_provisioning$Deployment = v; },
