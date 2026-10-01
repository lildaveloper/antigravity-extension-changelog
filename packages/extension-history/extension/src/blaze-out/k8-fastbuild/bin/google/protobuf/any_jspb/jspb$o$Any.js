// source: google/protobuf/any.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$google$protobuf$Any');

goog.require('jspb$google$protobuf$MutableAny');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$google$protobuf$MutableAny|undefined} msg The msg instance to transform.
 * @return {!jspb$google$protobuf$MutableAny.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$google$protobuf$Any.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$google$protobuf$MutableAny.ObjectFormat} */ ({
    typeUrl: jspb_internal_adapters.getStringFieldWithDefault(msg, 1),
    value: jspb_internal_public_for_gencode.toObjectAnyValue(msg),
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
 * @return {!jspb$google$protobuf$MutableAny.ObjectFormat}
 */
jspb$google$protobuf$MutableAny.prototype.toObject = function() {
  return /** @type {!jspb$google$protobuf$MutableAny.ObjectFormat} */ (jspb$o$google$protobuf$Any.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$google$protobuf$MutableAny.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$google$protobuf$MutableAny}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$google$protobuf$Any.fromObject = function(obj) {
  const msg = new jspb$google$protobuf$MutableAny();
  jspb_internal_adapters.setProto3StringField(msg, 1, obj.typeUrl);
  jspb_internal_public_for_gencode.fromObjectAnyValue(msg, obj.value);
  return msg;
};
}

var jspb$o$devtools_jetski_provisioning$BlueprintBinding;
Object.defineProperty(this, 'jspb$o$devtools_jetski_provisioning$BlueprintBinding', {
  get() { return jspb$o$devtools_jetski_provisioning$BlueprintBinding; },
  set(v) { jspb$o$devtools_jetski_provisioning$BlueprintBinding = v; },
