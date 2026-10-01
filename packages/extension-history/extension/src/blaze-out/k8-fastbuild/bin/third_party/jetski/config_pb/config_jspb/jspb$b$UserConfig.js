// source: third_party/jetski/config_pb/config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$b$exa$config_pb$UserConfig');

goog.require('jspb$b$exa$config_pb$ConversationGroupRegistry');
goog.require('jspb$b$exa$config_pb$PluginUserConfig');
goog.require('jspb$b$exa$config_pb$SkillUserConfig');
goog.require('jspb$b$exa$cortex_pb$SidecarUserConfig');
goog.require('jspb$b$jetbox_state_pb$UserSettings');
goog.require('jspb$exa$config_pb$MutableUserConfig');
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
jspb$b$exa$config_pb$UserConfig.fields = /** @pureOrBreakMyCode */([
  0,
  jspb_internal_binary.RWMapEntry,
  jspb_internal_binary.createMessageMapEntryBinaryFields(
      jspb_internal_binary.RStringRequireUtf8WString,
      jspb$b$exa$cortex_pb$SidecarUserConfig.fields),
  jspb$b$jetbox_state_pb$UserSettings.fields,
  jspb_internal_binary.RWMapEntry,
  jspb_internal_binary.createMessageMapEntryBinaryFields(
      jspb_internal_binary.RStringRequireUtf8WString,
      jspb$b$exa$config_pb$PluginUserConfig.fields),
  jspb$b$exa$config_pb$ConversationGroupRegistry.fields,
  jspb_internal_binary.RWMapEntry,
  jspb_internal_binary.createMessageMapEntryBinaryFields(
      jspb_internal_binary.RStringRequireUtf8WString,
      jspb$b$exa$config_pb$SkillUserConfig.fields)
]);

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @nodts
 * @return {!Uint8Array}
 */
jspb$exa$config_pb$MutableUserConfig.prototype.serializeBinary = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makePrototypeSerializeBinaryFunction(jspb$b$exa$config_pb$UserConfig.fields));


var jspb$b$exa$codeium_common_pb$ModelFeatures;
Object.defineProperty(this, 'jspb$b$exa$codeium_common_pb$ModelFeatures', {
  get() { return jspb$b$exa$codeium_common_pb$ModelFeatures; },
  set(v) { jspb$b$exa$codeium_common_pb$ModelFeatures = v; },
