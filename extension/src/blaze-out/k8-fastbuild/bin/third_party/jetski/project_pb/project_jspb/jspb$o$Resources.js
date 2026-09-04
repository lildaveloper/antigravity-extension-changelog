// source: third_party/jetski/project_pb/project.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$exa$project_pb$Resources');

goog.require('jspb$exa$project_pb$MutableResource');
goog.require('jspb$exa$project_pb$MutableResources');
goog.require('jspb$o$exa$project_pb$Resource');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$exa$project_pb$MutableResources|undefined} msg The msg instance to transform.
 * @return {!jspb$exa$project_pb$MutableResources.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$exa$project_pb$Resources.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$exa$project_pb$MutableResources.ObjectFormat} */ ({
    resourcesList: jspb_internal_public_for_gencode.toObjectList(msg.getResourcesList(), jspb$o$exa$project_pb$Resource.internal_toObject),
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
 * @return {!jspb$exa$project_pb$MutableResources.ObjectFormat}
 */
jspb$exa$project_pb$MutableResources.prototype.toObject = function() {
  return /** @type {!jspb$exa$project_pb$MutableResources.ObjectFormat} */ (jspb$o$exa$project_pb$Resources.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$exa$project_pb$MutableResources.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$exa$project_pb$MutableResources}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$exa$project_pb$Resources.fromObject = function(obj) {
  const msg = new jspb$exa$project_pb$MutableResources();
  jspb_internal_adapters.setRepeatedWrapperField(msg, jspb$exa$project_pb$MutableResource,
      1, jspb_internal_public_for_gencode.fromObjectList(obj.resourcesList,         jspb$o$exa$project_pb$Resource.fromObject));
  return msg;
};
}

var jspb$o$exa$project_pb$Environment;
Object.defineProperty(this, 'jspb$o$exa$project_pb$Environment', {
  get() { return jspb$o$exa$project_pb$Environment; },
  set(v) { jspb$o$exa$project_pb$Environment = v; },
