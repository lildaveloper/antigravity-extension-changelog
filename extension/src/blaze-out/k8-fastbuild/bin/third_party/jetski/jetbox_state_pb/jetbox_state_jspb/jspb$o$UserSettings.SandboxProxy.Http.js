// source: third_party/jetski/jetbox_state_pb/jetbox_state.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$jetbox_state_pb$UserSettings$SandboxProxy$Http');

goog.require('jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp|undefined} msg The msg instance to transform.
 * @return {!jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$jetbox_state_pb$UserSettings$SandboxProxy$Http.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp.ObjectFormat} */ ({
    address: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 1)),
    certFile: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 2)),
    username: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 3)),
    password: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 4)),
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
 * @return {!jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp.ObjectFormat}
 */
jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp.prototype.toObject = function() {
  return /** @type {!jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp.ObjectFormat} */ (jspb$o$jetbox_state_pb$UserSettings$SandboxProxy$Http.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$jetbox_state_pb$UserSettings$SandboxProxy$Http.fromObject = function(obj) {
  const msg = new jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp();
  jspb_internal_adapters.setStringField(msg, 1, obj.address);
  jspb_internal_adapters.setStringField(msg, 2, obj.certFile);
  jspb_internal_adapters.setStringField(msg, 3, obj.username);
  jspb_internal_adapters.setStringField(msg, 4, obj.password);
  return msg;
};
}

var jspb$o$jetbox_state_pb$UserSettings$SandboxProxy;
Object.defineProperty(this, 'jspb$o$jetbox_state_pb$UserSettings$SandboxProxy', {
  get() { return jspb$o$jetbox_state_pb$UserSettings$SandboxProxy; },
  set(v) { jspb$o$jetbox_state_pb$UserSettings$SandboxProxy = v; },
