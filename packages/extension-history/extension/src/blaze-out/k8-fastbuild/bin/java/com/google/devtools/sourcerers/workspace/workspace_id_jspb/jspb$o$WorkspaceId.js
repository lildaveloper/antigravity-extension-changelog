// source: java/com/google/devtools/sourcerers/workspace/workspace_id.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$devtools$sourcerers$WorkspaceId');

goog.require('jspb$devtools$sourcerers$MutableWorkspaceId');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$devtools$sourcerers$MutableWorkspaceId|undefined} msg The msg instance to transform.
 * @return {!jspb$devtools$sourcerers$MutableWorkspaceId.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$devtools$sourcerers$WorkspaceId.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$devtools$sourcerers$MutableWorkspaceId.ObjectFormat} */ ({
    owner: jspb_internal_adapters.getStringFieldWithDefault(msg, 1),
    citcId: jspb_internal_adapters.getUint64FieldWithDefault(msg, 2),
    name: jspb_internal_adapters.getStringFieldWithDefault(msg, 3),
    vcs: jspb_internal_adapters.getEnumFieldWithDefault(msg, 4),
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
 * @return {!jspb$devtools$sourcerers$MutableWorkspaceId.ObjectFormat}
 */
jspb$devtools$sourcerers$MutableWorkspaceId.prototype.toObject = function() {
  return /** @type {!jspb$devtools$sourcerers$MutableWorkspaceId.ObjectFormat} */ (jspb$o$devtools$sourcerers$WorkspaceId.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$devtools$sourcerers$MutableWorkspaceId.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$devtools$sourcerers$MutableWorkspaceId}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$devtools$sourcerers$WorkspaceId.fromObject = function(obj) {
  const msg = new jspb$devtools$sourcerers$MutableWorkspaceId();
  jspb_internal_adapters.setProto3StringField(msg, 1, obj.owner);
  jspb_internal_adapters.setProto3Uint64Field(msg, 2, obj.citcId);
  jspb_internal_adapters.setProto3StringField(msg, 3, obj.name);
  jspb_internal_adapters.setProto3EnumField(msg, 4, obj.vcs);
  return msg;
};
}

var devtools;
Object.defineProperty(this, 'devtools', {
  get() { return devtools; },
  set(v) { devtools = v; },
