// source: third_party/jetski/cortex_pb/cortex.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$exa$cortex_pb$SidecarUserConfig');

goog.require('jspb$exa$cortex_pb$MutableSidecarAgentPermissions');
goog.require('jspb$exa$cortex_pb$MutableSidecarUserConfig');
goog.require('jspb$o$exa$cortex_pb$SidecarAgentPermissions');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$exa$cortex_pb$MutableSidecarUserConfig|undefined} msg The msg instance to transform.
 * @return {!jspb$exa$cortex_pb$MutableSidecarUserConfig.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$exa$cortex_pb$SidecarUserConfig.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$exa$cortex_pb$MutableSidecarUserConfig.ObjectFormat} */ ({
    enabled: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getBooleanFieldLegacyNullable(msg, 1)),
    projectId: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getOneofStringFieldLegacyNullable(msg, 2, jspb$exa$cortex_pb$MutableSidecarUserConfig.oneofGroup_project_scope_)),
    allProjects: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getOneofBooleanFieldLegacyNullable(msg, 3, jspb$exa$cortex_pb$MutableSidecarUserConfig.oneofGroup_project_scope_)),
    argumentValuesMap: jspb_internal_public_for_gencode.mapToObject(msg.getArgumentValuesMap()),
    schemaVersion: jspb_internal_adapters.getInt32FieldWithDefault(msg, 6),
    resolvedPermissions: jspb$o$exa$cortex_pb$SidecarAgentPermissions.internal_toObject(msg.getResolvedPermissions()),
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
 * @return {!jspb$exa$cortex_pb$MutableSidecarUserConfig.ObjectFormat}
 */
jspb$exa$cortex_pb$MutableSidecarUserConfig.prototype.toObject = function() {
  return /** @type {!jspb$exa$cortex_pb$MutableSidecarUserConfig.ObjectFormat} */ (jspb$o$exa$cortex_pb$SidecarUserConfig.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$exa$cortex_pb$MutableSidecarUserConfig.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$exa$cortex_pb$MutableSidecarUserConfig}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$exa$cortex_pb$SidecarUserConfig.fromObject = function(obj) {
  const msg = new jspb$exa$cortex_pb$MutableSidecarUserConfig();
  jspb_internal_adapters.setBooleanField(msg, 1, obj.enabled);
  jspb_internal_adapters.setOneofStringField(msg, 2, jspb$exa$cortex_pb$MutableSidecarUserConfig.oneofGroup_project_scope_, obj.projectId);
  jspb_internal_adapters.setOneofBooleanField(msg, 3, jspb$exa$cortex_pb$MutableSidecarUserConfig.oneofGroup_project_scope_, obj.allProjects);
  obj.argumentValuesMap && jspb_internal_public_for_gencode.mapFromObject(msg.getArgumentValuesMap(), obj.argumentValuesMap);
  jspb_internal_adapters.setProto3Int32Field(msg, 6, obj.schemaVersion);
  jspb_internal_adapters.setWrapperField(msg,
      jspb$exa$cortex_pb$MutableSidecarAgentPermissions,
      5, jspb_internal_public_for_gencode.fromObjectNullable(obj.resolvedPermissions, jspb$o$exa$cortex_pb$SidecarAgentPermissions.fromObject));
  return msg;
};
}

var jspb$o$exa$codeium_common_pb$PermissionGrantsConfig;
Object.defineProperty(this, 'jspb$o$exa$codeium_common_pb$PermissionGrantsConfig', {
  get() { return jspb$o$exa$codeium_common_pb$PermissionGrantsConfig; },
  set(v) { jspb$o$exa$codeium_common_pb$PermissionGrantsConfig = v; },
