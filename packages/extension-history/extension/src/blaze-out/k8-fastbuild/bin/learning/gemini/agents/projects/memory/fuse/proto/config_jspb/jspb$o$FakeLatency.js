// source: learning/gemini/agents/projects/memory/fuse/proto/config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$jetski_memory$FakeLatency');

goog.require('jspb$jetski_memory$MutableFakeLatency');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$jetski_memory$MutableFakeLatency|undefined} msg The msg instance to transform.
 * @return {!jspb$jetski_memory$MutableFakeLatency.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$jetski_memory$FakeLatency.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$jetski_memory$MutableFakeLatency.ObjectFormat} */ ({
    meanMs: jspb_internal_adapters.getFloatingPointFieldWithDefault(msg, 1, 50.0),
    stddevMs: jspb_internal_adapters.getFloatingPointFieldWithDefault(msg, 2, 10.0),
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
 * @return {!jspb$jetski_memory$MutableFakeLatency.ObjectFormat}
 */
jspb$jetski_memory$MutableFakeLatency.prototype.toObject = function() {
  return /** @type {!jspb$jetski_memory$MutableFakeLatency.ObjectFormat} */ (jspb$o$jetski_memory$FakeLatency.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$jetski_memory$MutableFakeLatency.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$jetski_memory$MutableFakeLatency}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$jetski_memory$FakeLatency.fromObject = function(obj) {
  const msg = new jspb$jetski_memory$MutableFakeLatency();
  jspb_internal_adapters.setFloatingPointField(msg, 1, obj.meanMs);
  jspb_internal_adapters.setFloatingPointField(msg, 2, obj.stddevMs);
  return msg;
};
}

var jspb$o$jetski_memory$FakeMemoryBackendConfig;
Object.defineProperty(this, 'jspb$o$jetski_memory$FakeMemoryBackendConfig', {
  get() { return jspb$o$jetski_memory$FakeMemoryBackendConfig; },
  set(v) { jspb$o$jetski_memory$FakeMemoryBackendConfig = v; },
