// source: third_party/jetski/config_pb/config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$b$exa$config_pb$PluginUserConfig');

goog.require('jspb$b$exa$config_pb$PluginMcpUserConfig');
goog.require('jspb$b$exa$cortex_pb$MarketplaceInstall');
goog.require('jspb$exa$config_pb$MutablePluginUserConfig');
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
jspb$b$exa$config_pb$PluginUserConfig.fields = /** @pureOrBreakMyCode */([
  0,
  jspb_internal_binary.RWBool,
  jspb$b$exa$cortex_pb$MarketplaceInstall.fields,
  jspb_internal_binary.RWMapEntry,
  jspb_internal_binary.createMessageMapEntryBinaryFields(
      jspb_internal_binary.RStringRequireUtf8WString,
      jspb$b$exa$config_pb$PluginMcpUserConfig.fields)
]);

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @nodts
 * @return {!Uint8Array}
 */
jspb$exa$config_pb$MutablePluginUserConfig.prototype.serializeBinary = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makePrototypeSerializeBinaryFunction(jspb$b$exa$config_pb$PluginUserConfig.fields));


var jspb$b$exa$config_pb$SkillUserConfig;
Object.defineProperty(this, 'jspb$b$exa$config_pb$SkillUserConfig', {
  get() { return jspb$b$exa$config_pb$SkillUserConfig; },
  set(v) { jspb$b$exa$config_pb$SkillUserConfig = v; },
