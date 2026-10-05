// source: devtools/jetski/boq/provisioning_service/proto/provisioning.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$devtools_jetski_provisioning$InstanceFailure');

goog.require('jspb$devtools_jetski_provisioning$MutableInstanceFailure');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$devtools_jetski_provisioning$MutableInstanceFailure|undefined} msg The msg instance to transform.
 * @return {!jspb$devtools_jetski_provisioning$MutableInstanceFailure.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$devtools_jetski_provisioning$InstanceFailure.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$devtools_jetski_provisioning$MutableInstanceFailure.ObjectFormat} */ ({
    instanceId: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 1)),
    replicaIndex: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getInt32FieldLegacyNullable(msg, 2)),
    failedPhase: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 3)),
    remoteshellCause: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 4)),
    errorMessage: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 5)),
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
 * @return {!jspb$devtools_jetski_provisioning$MutableInstanceFailure.ObjectFormat}
 */
jspb$devtools_jetski_provisioning$MutableInstanceFailure.prototype.toObject = function() {
  return /** @type {!jspb$devtools_jetski_provisioning$MutableInstanceFailure.ObjectFormat} */ (jspb$o$devtools_jetski_provisioning$InstanceFailure.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$devtools_jetski_provisioning$MutableInstanceFailure.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$devtools_jetski_provisioning$MutableInstanceFailure}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$devtools_jetski_provisioning$InstanceFailure.fromObject = function(obj) {
  const msg = new jspb$devtools_jetski_provisioning$MutableInstanceFailure();
  jspb_internal_adapters.setStringField(msg, 1, obj.instanceId);
  jspb_internal_adapters.setInt32Field(msg, 2, obj.replicaIndex);
  jspb_internal_adapters.setStringField(msg, 3, obj.failedPhase);
  jspb_internal_adapters.setStringField(msg, 4, obj.remoteshellCause);
  jspb_internal_adapters.setStringField(msg, 5, obj.errorMessage);
  return msg;
};
}

var jspb$o$google$rpc$Status;
Object.defineProperty(this, 'jspb$o$google$rpc$Status', {
  get() { return jspb$o$google$rpc$Status; },
  set(v) { jspb$o$google$rpc$Status = v; },
