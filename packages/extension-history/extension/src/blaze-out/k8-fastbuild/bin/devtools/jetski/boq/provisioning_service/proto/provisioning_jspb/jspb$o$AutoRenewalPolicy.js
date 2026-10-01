// source: devtools/jetski/boq/provisioning_service/proto/provisioning.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$devtools_jetski_provisioning$AutoRenewalPolicy');

goog.require('jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy');
goog.require('jspb$google$type$MutableTimeZone');
goog.require('jspb$o$google$type$TimeZone');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy|undefined} msg The msg instance to transform.
 * @return {!jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$devtools_jetski_provisioning$AutoRenewalPolicy.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy.ObjectFormat} */ ({
    autoRenewMode: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getEnumFieldLegacyNullable(msg, 1)),
    timezone: jspb$o$google$type$TimeZone.internal_toObject(msg.getTimezone()),
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
 * @return {!jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy.ObjectFormat}
 */
jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy.prototype.toObject = function() {
  return /** @type {!jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy.ObjectFormat} */ (jspb$o$devtools_jetski_provisioning$AutoRenewalPolicy.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$devtools_jetski_provisioning$AutoRenewalPolicy.fromObject = function(obj) {
  const msg = new jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy();
  jspb_internal_adapters.setEnumField(msg, 1, obj.autoRenewMode);
  jspb_internal_adapters.setWrapperField(msg,
      jspb$google$type$MutableTimeZone,
      2, jspb_internal_public_for_gencode.fromObjectNullable(obj.timezone, jspb$o$google$type$TimeZone.fromObject));
  return msg;
};
}

var jspb$o$devtools_jetski_provisioning$ProvisioningConfig;
Object.defineProperty(this, 'jspb$o$devtools_jetski_provisioning$ProvisioningConfig', {
  get() { return jspb$o$devtools_jetski_provisioning$ProvisioningConfig; },
  set(v) { jspb$o$devtools_jetski_provisioning$ProvisioningConfig = v; },
