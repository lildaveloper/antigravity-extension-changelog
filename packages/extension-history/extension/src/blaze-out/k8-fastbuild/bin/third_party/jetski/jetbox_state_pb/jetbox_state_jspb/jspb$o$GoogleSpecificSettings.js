// source: third_party/jetski/jetbox_state_pb/jetbox_state.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$jetbox_state_pb$GoogleSpecificSettings');

goog.require('jspb$jetbox_state_pb$MutableGoogleSpecificSettings');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$jetbox_state_pb$MutableGoogleSpecificSettings|undefined} msg The msg instance to transform.
 * @return {!jspb$jetbox_state_pb$MutableGoogleSpecificSettings.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$jetbox_state_pb$GoogleSpecificSettings.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$jetbox_state_pb$MutableGoogleSpecificSettings.ObjectFormat} */ ({
    google3ProjectCreated: jspb_internal_adapters.getBooleanFieldWithDefault(msg, 1),
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
 * @return {!jspb$jetbox_state_pb$MutableGoogleSpecificSettings.ObjectFormat}
 */
jspb$jetbox_state_pb$MutableGoogleSpecificSettings.prototype.toObject = function() {
  return /** @type {!jspb$jetbox_state_pb$MutableGoogleSpecificSettings.ObjectFormat} */ (jspb$o$jetbox_state_pb$GoogleSpecificSettings.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$jetbox_state_pb$MutableGoogleSpecificSettings.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$jetbox_state_pb$MutableGoogleSpecificSettings}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$jetbox_state_pb$GoogleSpecificSettings.fromObject = function(obj) {
  const msg = new jspb$jetbox_state_pb$MutableGoogleSpecificSettings();
  jspb_internal_adapters.setProto3BooleanField(msg, 1, obj.google3ProjectCreated);
  return msg;
};
}

var jspb$o$jetbox_state_pb$PostOnboardingState;
Object.defineProperty(this, 'jspb$o$jetbox_state_pb$PostOnboardingState', {
  get() { return jspb$o$jetbox_state_pb$PostOnboardingState; },
  set(v) { jspb$o$jetbox_state_pb$PostOnboardingState = v; },
