// source: third_party/jetski/project_pb/project.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$exa$project_pb$PermissionGrants');

goog.require('jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig');
goog.require('jspb$exa$project_pb$MutablePermissionGrants');
goog.require('jspb$o$exa$codeium_common_pb$PermissionGrantsConfig');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$exa$project_pb$MutablePermissionGrants|undefined} msg The msg instance to transform.
 * @return {!jspb$exa$project_pb$MutablePermissionGrants.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$exa$project_pb$PermissionGrants.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$exa$project_pb$MutablePermissionGrants.ObjectFormat} */ ({
    permissionGrants: jspb$o$exa$codeium_common_pb$PermissionGrantsConfig.internal_toObject(msg.getPermissionGrants()),
    v2Migrated: jspb_internal_adapters.getBooleanFieldWithDefault(msg, 3),
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
 * @return {!jspb$exa$project_pb$MutablePermissionGrants.ObjectFormat}
 */
jspb$exa$project_pb$MutablePermissionGrants.prototype.toObject = function() {
  return /** @type {!jspb$exa$project_pb$MutablePermissionGrants.ObjectFormat} */ (jspb$o$exa$project_pb$PermissionGrants.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$exa$project_pb$MutablePermissionGrants.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$exa$project_pb$MutablePermissionGrants}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$exa$project_pb$PermissionGrants.fromObject = function(obj) {
  const msg = new jspb$exa$project_pb$MutablePermissionGrants();
  jspb_internal_adapters.setWrapperField(msg,
      jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig,
      2, jspb_internal_public_for_gencode.fromObjectNullable(obj.permissionGrants, jspb$o$exa$codeium_common_pb$PermissionGrantsConfig.fromObject));
  jspb_internal_adapters.setProto3BooleanField(msg, 3, obj.v2Migrated);
  return msg;
};
}

var jspb$o$exa$project_pb$ProjectConversation;
Object.defineProperty(this, 'jspb$o$exa$project_pb$ProjectConversation', {
  get() { return jspb$o$exa$project_pb$ProjectConversation; },
  set(v) { jspb$o$exa$project_pb$ProjectConversation = v; },
