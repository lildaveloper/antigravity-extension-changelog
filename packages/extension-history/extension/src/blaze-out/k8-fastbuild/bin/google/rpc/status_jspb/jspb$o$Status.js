// source: google/rpc/status.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$google$rpc$Status');

goog.require('jspb$google$protobuf$MutableAny');
goog.require('jspb$google$rpc$MutableStatus');
goog.require('jspb$o$google$protobuf$Any');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$google$rpc$MutableStatus|undefined} msg The msg instance to transform.
 * @return {!jspb$google$rpc$MutableStatus.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$google$rpc$Status.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$google$rpc$MutableStatus.ObjectFormat} */ ({
    code: jspb_internal_adapters.getInt32FieldWithDefault(msg, 1),
    message: jspb_internal_adapters.getStringFieldWithDefault(msg, 2),
    detailsList: jspb_internal_public_for_gencode.toObjectList(msg.getDetailsList(), jspb$o$google$protobuf$Any.internal_toObject),
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
 * @return {!jspb$google$rpc$MutableStatus.ObjectFormat}
 */
jspb$google$rpc$MutableStatus.prototype.toObject = function() {
  return /** @type {!jspb$google$rpc$MutableStatus.ObjectFormat} */ (jspb$o$google$rpc$Status.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$google$rpc$MutableStatus.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$google$rpc$MutableStatus}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$google$rpc$Status.fromObject = function(obj) {
  const msg = new jspb$google$rpc$MutableStatus();
  jspb_internal_adapters.setProto3Int32Field(msg, 1, obj.code);
  jspb_internal_adapters.setProto3StringField(msg, 2, obj.message);
  jspb_internal_adapters.setRepeatedWrapperField(msg, jspb$google$protobuf$MutableAny,
      3, jspb_internal_public_for_gencode.fromObjectList(obj.detailsList,         jspb$o$google$protobuf$Any.fromObject));
  return msg;
};
}

var jspb$o$devtools_jetski_provisioning$DeploymentStatusDetail;
Object.defineProperty(this, 'jspb$o$devtools_jetski_provisioning$DeploymentStatusDetail', {
  get() { return jspb$o$devtools_jetski_provisioning$DeploymentStatusDetail; },
  set(v) { jspb$o$devtools_jetski_provisioning$DeploymentStatusDetail = v; },
