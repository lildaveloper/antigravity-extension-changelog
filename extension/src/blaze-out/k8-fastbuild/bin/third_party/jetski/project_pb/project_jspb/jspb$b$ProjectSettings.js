// source: third_party/jetski/project_pb/project.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$b$exa$project_pb$ProjectSettings');

goog.require('jspb$b$exa$project_pb$SecurityPluginSettings');
goog.require('jspb$exa$project_pb$MutableProjectSettings');
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
jspb$b$exa$project_pb$ProjectSettings.fields = /** @pureOrBreakMyCode */([
  0,
  jspb_internal_binary.REnumIgnoringDefaultWEnum,
  -1,
  jspb_internal_binary.RWBool,
  jspb_internal_binary.REnumIgnoringDefaultWEnum,
  -1,
  jspb_internal_binary.RBoolIgnoringDefaultWBool,
  jspb_internal_binary.RStringRequireUtf8IgnoringDefaultWString,
  jspb_internal_binary.REnumIgnoringDefaultWEnum,
  jspb_internal_binary.RWMapEntry,
  jspb_internal_binary.createMessageMapEntryBinaryFields(
      jspb_internal_binary.RStringRequireUtf8WString,
      jspb$b$exa$project_pb$SecurityPluginSettings.fields)
]);

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @nodts
 * @return {!Uint8Array}
 */
jspb$exa$project_pb$MutableProjectSettings.prototype.serializeBinary = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makePrototypeSerializeBinaryFunction(jspb$b$exa$project_pb$ProjectSettings.fields));


var jspb$b$exa$project_pb$Project;
Object.defineProperty(this, 'jspb$b$exa$project_pb$Project', {
  get() { return jspb$b$exa$project_pb$Project; },
  set(v) { jspb$b$exa$project_pb$Project = v; },
