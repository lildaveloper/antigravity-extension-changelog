// source: third_party/jetski/project_pb/project.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$exa$project_pb$Environment');

goog.require('jspb$exa$project_pb$MutableEnvironment');
goog.require('jspb$exa$project_pb$MutableResources');
goog.require('jspb$o$exa$project_pb$Resources');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$exa$project_pb$MutableEnvironment|undefined} msg The msg instance to transform.
 * @return {!jspb$exa$project_pb$MutableEnvironment.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$exa$project_pb$Environment.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$exa$project_pb$MutableEnvironment.ObjectFormat} */ ({
    id: jspb_internal_adapters.getStringFieldWithDefault(msg, 1),
    name: jspb_internal_adapters.getStringFieldWithDefault(msg, 2),
    resources: jspb$o$exa$project_pb$Resources.internal_toObject(msg.getResources()),
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
 * @return {!jspb$exa$project_pb$MutableEnvironment.ObjectFormat}
 */
jspb$exa$project_pb$MutableEnvironment.prototype.toObject = function() {
  return /** @type {!jspb$exa$project_pb$MutableEnvironment.ObjectFormat} */ (jspb$o$exa$project_pb$Environment.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$exa$project_pb$MutableEnvironment.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$exa$project_pb$MutableEnvironment}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$exa$project_pb$Environment.fromObject = function(obj) {
  const msg = new jspb$exa$project_pb$MutableEnvironment();
  jspb_internal_adapters.setProto3StringField(msg, 1, obj.id);
  jspb_internal_adapters.setProto3StringField(msg, 2, obj.name);
  jspb_internal_adapters.setWrapperField(msg,
      jspb$exa$project_pb$MutableResources,
      3, jspb_internal_public_for_gencode.fromObjectNullable(obj.resources, jspb$o$exa$project_pb$Resources.fromObject));
  return msg;
};
}

var jspb$o$exa$project_pb$Environments;
Object.defineProperty(this, 'jspb$o$exa$project_pb$Environments', {
  get() { return jspb$o$exa$project_pb$Environments; },
  set(v) { jspb$o$exa$project_pb$Environments = v; },
