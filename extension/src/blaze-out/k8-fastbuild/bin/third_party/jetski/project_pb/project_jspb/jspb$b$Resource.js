// source: third_party/jetski/project_pb/project.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$b$exa$project_pb$Resource');

goog.require('jspb$b$exa$project_pb$GitFolder');
goog.require('jspb$b$exa$project_pb$Google3');
goog.require('jspb$exa$project_pb$MutableResource');
goog.require('jspb_internal_binary');
goog.require('jspb_internal_public_for_gencode');

/**
 * The set of binary field definitions, this is for internal use only
 * and unsupported in all other cases.
 * @nodts
 * @const
 * @type {!Array<?>}
 * @suppress {visibility} access to oneof groups.
 */
jspb$b$exa$project_pb$Resource.fields = /** @pureOrBreakMyCode */([
  0,
  jspb$exa$project_pb$MutableResource.oneofGroup_type_,
  jspb_internal_binary.RStringRequireUtf8OneofWString,
  jspb_internal_binary.RMessageOneofWMessage,
  jspb$b$exa$project_pb$Google3.fields,
  jspb_internal_binary.RMessageOneofWMessage,
  jspb$b$exa$project_pb$GitFolder.fields
]);

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @nodts
 * @return {!Uint8Array}
 */
jspb$exa$project_pb$MutableResource.prototype.serializeBinary = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makePrototypeSerializeBinaryFunction(jspb$b$exa$project_pb$Resource.fields));


var jspb$b$exa$project_pb$Resources;
Object.defineProperty(this, 'jspb$b$exa$project_pb$Resources', {
  get() { return jspb$b$exa$project_pb$Resources; },
  set(v) { jspb$b$exa$project_pb$Resources = v; },
