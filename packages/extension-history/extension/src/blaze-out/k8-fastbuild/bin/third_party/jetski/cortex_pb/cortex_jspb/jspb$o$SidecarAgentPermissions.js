// source: third_party/jetski/cortex_pb/cortex.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$exa$cortex_pb$SidecarAgentPermissions');

goog.require('jspb$exa$cortex_pb$MutableSidecarAgentPermissions');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$exa$cortex_pb$MutableSidecarAgentPermissions|undefined} msg The msg instance to transform.
 * @return {!jspb$exa$cortex_pb$MutableSidecarAgentPermissions.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$exa$cortex_pb$SidecarAgentPermissions.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$exa$cortex_pb$MutableSidecarAgentPermissions.ObjectFormat} */ ({
    workspaceUrisList: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getRepeatedStringField(msg, 1, jspb_internal_adapters.RepeatedArrayReturnType.EITHER_FROZEN_OR_UNFROZEN)),
    accessGrantsList: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getRepeatedStringField(msg, 2, jspb_internal_adapters.RepeatedArrayReturnType.EITHER_FROZEN_OR_UNFROZEN)),
    allowsUserInteractions: jspb_internal_adapters.getBooleanFieldWithDefault(msg, 3),
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
 * @return {!jspb$exa$cortex_pb$MutableSidecarAgentPermissions.ObjectFormat}
 */
jspb$exa$cortex_pb$MutableSidecarAgentPermissions.prototype.toObject = function() {
  return /** @type {!jspb$exa$cortex_pb$MutableSidecarAgentPermissions.ObjectFormat} */ (jspb$o$exa$cortex_pb$SidecarAgentPermissions.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$exa$cortex_pb$MutableSidecarAgentPermissions.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$exa$cortex_pb$MutableSidecarAgentPermissions}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$exa$cortex_pb$SidecarAgentPermissions.fromObject = function(obj) {
  const msg = new jspb$exa$cortex_pb$MutableSidecarAgentPermissions();
  jspb_internal_adapters.setRepeatedStringField(msg, 1, obj.workspaceUrisList);
  jspb_internal_adapters.setRepeatedStringField(msg, 2, obj.accessGrantsList);
  jspb_internal_adapters.setProto3BooleanField(msg, 3, obj.allowsUserInteractions);
  return msg;
};
}

var jspb$o$exa$cortex_pb$SidecarUserConfig;
Object.defineProperty(this, 'jspb$o$exa$cortex_pb$SidecarUserConfig', {
  get() { return jspb$o$exa$cortex_pb$SidecarUserConfig; },
  set(v) { jspb$o$exa$cortex_pb$SidecarUserConfig = v; },
