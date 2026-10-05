// source: third_party/jetski/project_pb/project.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$exa$project_pb$Resource');

goog.require('jspb$exa$project_pb$MutableGitFolder');
goog.require('jspb$exa$project_pb$MutableGoogle3');
goog.require('jspb$exa$project_pb$MutableRemoteResource');
goog.require('jspb$exa$project_pb$MutableResource');
goog.require('jspb$o$exa$project_pb$GitFolder');
goog.require('jspb$o$exa$project_pb$Google3');
goog.require('jspb$o$exa$project_pb$RemoteResource');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$exa$project_pb$MutableResource|undefined} msg The msg instance to transform.
 * @return {!jspb$exa$project_pb$MutableResource.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$exa$project_pb$Resource.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$exa$project_pb$MutableResource.ObjectFormat} */ ({
    folderUri: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getOneofStringFieldLegacyNullable(msg, 1, jspb$exa$project_pb$MutableResource.oneofGroup_type_)),
    google3: jspb$o$exa$project_pb$Google3.internal_toObject(msg.getGoogle3()),
    gitFolder: jspb$o$exa$project_pb$GitFolder.internal_toObject(msg.getGitFolder()),
    remoteResource: jspb$o$exa$project_pb$RemoteResource.internal_toObject(msg.getRemoteResource()),
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
 * @return {!jspb$exa$project_pb$MutableResource.ObjectFormat}
 */
jspb$exa$project_pb$MutableResource.prototype.toObject = function() {
  return /** @type {!jspb$exa$project_pb$MutableResource.ObjectFormat} */ (jspb$o$exa$project_pb$Resource.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$exa$project_pb$MutableResource.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$exa$project_pb$MutableResource}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$exa$project_pb$Resource.fromObject = function(obj) {
  const msg = new jspb$exa$project_pb$MutableResource();
  jspb_internal_adapters.setOneofStringField(msg, 1, jspb$exa$project_pb$MutableResource.oneofGroup_type_, obj.folderUri);
  jspb_internal_adapters.setOneofWrapperField(msg,
      jspb$exa$project_pb$MutableGoogle3,
      2, jspb$exa$project_pb$MutableResource.oneofGroup_type_, jspb_internal_public_for_gencode.fromObjectNullable(obj.google3, jspb$o$exa$project_pb$Google3.fromObject));
  jspb_internal_adapters.setOneofWrapperField(msg,
      jspb$exa$project_pb$MutableGitFolder,
      3, jspb$exa$project_pb$MutableResource.oneofGroup_type_, jspb_internal_public_for_gencode.fromObjectNullable(obj.gitFolder, jspb$o$exa$project_pb$GitFolder.fromObject));
  jspb_internal_adapters.setOneofWrapperField(msg,
      jspb$exa$project_pb$MutableRemoteResource,
      4, jspb$exa$project_pb$MutableResource.oneofGroup_type_, jspb_internal_public_for_gencode.fromObjectNullable(obj.remoteResource, jspb$o$exa$project_pb$RemoteResource.fromObject));
  return msg;
};
}

var jspb$o$exa$project_pb$Resources;
Object.defineProperty(this, 'jspb$o$exa$project_pb$Resources', {
  get() { return jspb$o$exa$project_pb$Resources; },
  set(v) { jspb$o$exa$project_pb$Resources = v; },
