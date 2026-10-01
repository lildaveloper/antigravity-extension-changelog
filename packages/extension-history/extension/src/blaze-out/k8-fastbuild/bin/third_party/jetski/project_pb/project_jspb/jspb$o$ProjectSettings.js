// source: third_party/jetski/project_pb/project.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$exa$project_pb$ProjectSettings');

goog.require('jspb$exa$project_pb$MutableProjectSettings');
goog.require('jspb$o$exa$project_pb$SecurityPluginSettings');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$exa$project_pb$MutableProjectSettings|undefined} msg The msg instance to transform.
 * @return {!jspb$exa$project_pb$MutableProjectSettings.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$exa$project_pb$ProjectSettings.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$exa$project_pb$MutableProjectSettings.ObjectFormat} */ ({
    fileAccessPolicy: jspb_internal_adapters.getEnumFieldWithDefault(msg, 1),
    internetPolicy: jspb_internal_adapters.getEnumFieldWithDefault(msg, 2),
    sandboxMode: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getBooleanFieldLegacyNullable(msg, 3)),
    autoExecutionPolicy: jspb_internal_adapters.getEnumFieldWithDefault(msg, 4),
    artifactReviewMode: jspb_internal_adapters.getEnumFieldWithDefault(msg, 5),
    enablePermissionedGithub: jspb_internal_adapters.getBooleanFieldWithDefault(msg, 6),
    shellSetupScript: jspb_internal_adapters.getStringFieldWithDefault(msg, 7),
    permissionPreset: jspb_internal_adapters.getEnumFieldWithDefault(msg, 8),
    securityPluginsMap: jspb_internal_public_for_gencode.mapToObject(msg.getSecurityPluginsMap(),
      jspb$o$exa$project_pb$SecurityPluginSettings.internal_toObject),
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
 * @return {!jspb$exa$project_pb$MutableProjectSettings.ObjectFormat}
 */
jspb$exa$project_pb$MutableProjectSettings.prototype.toObject = function() {
  return /** @type {!jspb$exa$project_pb$MutableProjectSettings.ObjectFormat} */ (jspb$o$exa$project_pb$ProjectSettings.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$exa$project_pb$MutableProjectSettings.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$exa$project_pb$MutableProjectSettings}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$exa$project_pb$ProjectSettings.fromObject = function(obj) {
  const msg = new jspb$exa$project_pb$MutableProjectSettings();
  jspb_internal_adapters.setProto3EnumField(msg, 1, obj.fileAccessPolicy);
  jspb_internal_adapters.setProto3EnumField(msg, 2, obj.internetPolicy);
  jspb_internal_adapters.setBooleanField(msg, 3, obj.sandboxMode);
  jspb_internal_adapters.setProto3EnumField(msg, 4, obj.autoExecutionPolicy);
  jspb_internal_adapters.setProto3EnumField(msg, 5, obj.artifactReviewMode);
  jspb_internal_adapters.setProto3BooleanField(msg, 6, obj.enablePermissionedGithub);
  jspb_internal_adapters.setProto3StringField(msg, 7, obj.shellSetupScript);
  jspb_internal_adapters.setProto3EnumField(msg, 8, obj.permissionPreset);
  obj.securityPluginsMap && jspb_internal_public_for_gencode.mapFromObject(msg.getSecurityPluginsMap(), obj.securityPluginsMap, jspb$o$exa$project_pb$SecurityPluginSettings.fromObject);
  return msg;
};
}

var jspb$o$exa$project_pb$Project;
Object.defineProperty(this, 'jspb$o$exa$project_pb$Project', {
  get() { return jspb$o$exa$project_pb$Project; },
  set(v) { jspb$o$exa$project_pb$Project = v; },
