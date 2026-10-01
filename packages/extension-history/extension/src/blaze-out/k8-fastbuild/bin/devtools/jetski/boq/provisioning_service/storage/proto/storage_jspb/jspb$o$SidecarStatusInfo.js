// source: devtools/jetski/boq/provisioning_service/storage/proto/storage.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$devtools_jetski_provisioning$storage$SidecarStatusInfo');

goog.require('jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo|undefined} msg The msg instance to transform.
 * @return {!jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$devtools_jetski_provisioning$storage$SidecarStatusInfo.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo.ObjectFormat} */ ({
    sidecarId: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 1)),
    status: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getEnumFieldLegacyNullable(msg, 2)),
    lastError: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 3)),
    startTimeMs: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getInt64FieldLegacyNullable(msg, 4)),
    port: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getInt32FieldLegacyNullable(msg, 5)),
    baseUrl: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 6)),
    isBundled: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getBooleanFieldLegacyNullable(msg, 7)),
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
 * @return {!jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo.ObjectFormat}
 */
jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo.prototype.toObject = function() {
  return /** @type {!jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo.ObjectFormat} */ (jspb$o$devtools_jetski_provisioning$storage$SidecarStatusInfo.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$devtools_jetski_provisioning$storage$SidecarStatusInfo.fromObject = function(obj) {
  const msg = new jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo();
  jspb_internal_adapters.setStringField(msg, 1, obj.sidecarId);
  jspb_internal_adapters.setEnumField(msg, 2, obj.status);
  jspb_internal_adapters.setStringField(msg, 3, obj.lastError);
  jspb_internal_adapters.setInt64Field(msg, 4, obj.startTimeMs);
  jspb_internal_adapters.setInt32Field(msg, 5, obj.port);
  jspb_internal_adapters.setStringField(msg, 6, obj.baseUrl);
  jspb_internal_adapters.setBooleanField(msg, 7, obj.isBundled);
  return msg;
};
}

var jspb$o$devtools_jetski_provisioning$Instance;
Object.defineProperty(this, 'jspb$o$devtools_jetski_provisioning$Instance', {
  get() { return jspb$o$devtools_jetski_provisioning$Instance; },
  set(v) { jspb$o$devtools_jetski_provisioning$Instance = v; },
