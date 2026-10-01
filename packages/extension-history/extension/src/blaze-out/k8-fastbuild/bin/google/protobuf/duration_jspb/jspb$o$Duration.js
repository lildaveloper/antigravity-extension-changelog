// source: google/protobuf/duration.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$google$protobuf$Duration');

goog.require('jspb$google$protobuf$MutableDuration');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$google$protobuf$MutableDuration|undefined} msg The msg instance to transform.
 * @return {!jspb$google$protobuf$MutableDuration.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$google$protobuf$Duration.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$google$protobuf$MutableDuration.ObjectFormat} */ ({
    seconds: jspb_internal_adapters.getInt64FieldWithDefault(msg, 1),
    nanos: jspb_internal_adapters.getInt32FieldWithDefault(msg, 2),
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
 * @return {!jspb$google$protobuf$MutableDuration.ObjectFormat}
 */
jspb$google$protobuf$MutableDuration.prototype.toObject = function() {
  return /** @type {!jspb$google$protobuf$MutableDuration.ObjectFormat} */ (jspb$o$google$protobuf$Duration.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$google$protobuf$MutableDuration.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$google$protobuf$MutableDuration}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$google$protobuf$Duration.fromObject = function(obj) {
  const msg = new jspb$google$protobuf$MutableDuration();
  jspb_internal_adapters.setProto3Int64Field(msg, 1, obj.seconds);
  jspb_internal_adapters.setProto3Int32Field(msg, 2, obj.nanos);
  return msg;
};
}

var jspb$o$jetski_memory$FakeLatency;
Object.defineProperty(this, 'jspb$o$jetski_memory$FakeLatency', {
  get() { return jspb$o$jetski_memory$FakeLatency; },
  set(v) { jspb$o$jetski_memory$FakeLatency = v; },
