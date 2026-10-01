// source: devtools/jetski/boq/provisioning_service/proto/provisioning.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$devtools_jetski_provisioning$ListDeploymentsRequest');

goog.require('jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest|undefined} msg The msg instance to transform.
 * @return {!jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$devtools_jetski_provisioning$ListDeploymentsRequest.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest.ObjectFormat} */ ({
    view: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getEnumFieldLegacyNullable(msg, 1)),
    tagsList: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getRepeatedStringField(msg, 2, jspb_internal_adapters.RepeatedArrayReturnType.EITHER_FROZEN_OR_UNFROZEN)),
    forceRefreshCache: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getBooleanFieldLegacyNullable(msg, 3)),
    filter: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 4)),
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
 * @return {!jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest.ObjectFormat}
 */
jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest.prototype.toObject = function() {
  return /** @type {!jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest.ObjectFormat} */ (jspb$o$devtools_jetski_provisioning$ListDeploymentsRequest.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$devtools_jetski_provisioning$ListDeploymentsRequest.fromObject = function(obj) {
  const msg = new jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest();
  jspb_internal_adapters.setEnumField(msg, 1, obj.view);
  jspb_internal_adapters.setRepeatedStringField(msg, 2, obj.tagsList);
  jspb_internal_adapters.setBooleanField(msg, 3, obj.forceRefreshCache);
  jspb_internal_adapters.setStringField(msg, 4, obj.filter);
  return msg;
};
}

var proto;
Object.defineProperty(this, 'proto', {
  get() { return proto; },
  set(v) { proto = v; },
