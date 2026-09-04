// source: third_party/jetski/project_pb/project.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$exa$project_pb$ProjectConversation');

goog.require('jspb$exa$project_pb$MutableProjectConversation');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$exa$project_pb$MutableProjectConversation|undefined} msg The msg instance to transform.
 * @return {!jspb$exa$project_pb$MutableProjectConversation.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$exa$project_pb$ProjectConversation.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$exa$project_pb$MutableProjectConversation.ObjectFormat} */ ({
    conversationId: jspb_internal_adapters.getStringFieldWithDefault(msg, 1),
    environmentId: jspb_internal_adapters.getStringFieldWithDefault(msg, 2),
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
 * @return {!jspb$exa$project_pb$MutableProjectConversation.ObjectFormat}
 */
jspb$exa$project_pb$MutableProjectConversation.prototype.toObject = function() {
  return /** @type {!jspb$exa$project_pb$MutableProjectConversation.ObjectFormat} */ (jspb$o$exa$project_pb$ProjectConversation.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$exa$project_pb$MutableProjectConversation.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$exa$project_pb$MutableProjectConversation}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$exa$project_pb$ProjectConversation.fromObject = function(obj) {
  const msg = new jspb$exa$project_pb$MutableProjectConversation();
  jspb_internal_adapters.setProto3StringField(msg, 1, obj.conversationId);
  jspb_internal_adapters.setProto3StringField(msg, 2, obj.environmentId);
  return msg;
};
}

var jspb$o$exa$project_pb$ProjectConversations;
Object.defineProperty(this, 'jspb$o$exa$project_pb$ProjectConversations', {
  get() { return jspb$o$exa$project_pb$ProjectConversations; },
  set(v) { jspb$o$exa$project_pb$ProjectConversations = v; },
