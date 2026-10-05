// source: devtools/jetski/boq/provisioning_service/proto/deployment_config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$devtools_jetski_provisioning$Sidecar');

goog.require('jspb$devtools_jetski_provisioning$MutableSidecar');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$devtools_jetski_provisioning$MutableSidecar|undefined} msg The msg instance to transform.
 * @return {!jspb$devtools_jetski_provisioning$MutableSidecar.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$devtools_jetski_provisioning$Sidecar.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$devtools_jetski_provisioning$MutableSidecar.ObjectFormat} */ ({
    path: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 1)),
    inlineJson: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 2)),
    id: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 3)),
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
 * @return {!jspb$devtools_jetski_provisioning$MutableSidecar.ObjectFormat}
 */
jspb$devtools_jetski_provisioning$MutableSidecar.prototype.toObject = function() {
  return /** @type {!jspb$devtools_jetski_provisioning$MutableSidecar.ObjectFormat} */ (jspb$o$devtools_jetski_provisioning$Sidecar.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$devtools_jetski_provisioning$MutableSidecar.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$devtools_jetski_provisioning$MutableSidecar}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$devtools_jetski_provisioning$Sidecar.fromObject = function(obj) {
  const msg = new jspb$devtools_jetski_provisioning$MutableSidecar();
  jspb_internal_adapters.setStringField(msg, 1, obj.path);
  jspb_internal_adapters.setStringField(msg, 2, obj.inlineJson);
  jspb_internal_adapters.setStringField(msg, 3, obj.id);
  return msg;
};
}

var jspb$o$google$protobuf$Timestamp;
Object.defineProperty(this, 'jspb$o$google$protobuf$Timestamp', {
  get() { return jspb$o$google$protobuf$Timestamp; },
  set(v) { jspb$o$google$protobuf$Timestamp = v; },
