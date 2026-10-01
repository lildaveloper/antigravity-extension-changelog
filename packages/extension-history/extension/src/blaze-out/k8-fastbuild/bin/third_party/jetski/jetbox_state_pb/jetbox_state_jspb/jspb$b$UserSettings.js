// source: third_party/jetski/jetbox_state_pb/jetbox_state.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$b$jetbox_state_pb$UserSettings');

goog.require('jspb$b$exa$codeium_common_pb$PermissionGrantsConfig');
goog.require('jspb$b$jetbox_state_pb$CustomThemeSeeds');
goog.require('jspb$b$jetbox_state_pb$GoogleSpecificConfig');
goog.require('jspb$b$jetbox_state_pb$UserSettings$SandboxProxy');
goog.require('jspb$jetbox_state_pb$MutableUserSettings');
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
jspb$b$jetbox_state_pb$UserSettings.fields = /** @pureOrBreakMyCode */([
  0,
  jspb_internal_binary.REnumIgnoringDefaultWEnum,
  -1,
  jspb_internal_binary.RWBool,
  jspb_internal_binary.RRepeatedStringRequireUtf8WRepeatedString,
  -1,
  jspb_internal_binary.REnumIgnoringDefaultWEnum,
  jspb_internal_binary.RWBool,
  -3,
  jspb$b$exa$codeium_common_pb$PermissionGrantsConfig.fields,
  jspb_internal_binary.RWEnum,
  jspb_internal_binary.RWBool,
  -1,
  2,
  jspb_internal_binary.RWEnum,
  -1,
  jspb_internal_binary.RWBool,
  jspb_internal_binary.REnumIgnoringDefaultWEnum,
  jspb$b$jetbox_state_pb$CustomThemeSeeds.fields,
  -1,
  jspb_internal_binary.REnumIgnoringDefaultWEnum,
  jspb_internal_binary.RWInt32,
  -1,
  jspb_internal_binary.RWBool,
  jspb_internal_binary.RStringRequireUtf8WString,
  jspb_internal_binary.RWBool,
  -1,
  jspb_internal_binary.RStringRequireUtf8WString,
  jspb_internal_binary.RWEnum,
  1,
  jspb_internal_binary.RStringRequireUtf8WString,
  jspb_internal_binary.RWEnum,
  jspb$b$jetbox_state_pb$GoogleSpecificConfig.fields,
  jspb_internal_binary.RWBool,
  -2,
  jspb_internal_binary.RStringRequireUtf8WString,
  jspb_internal_binary.RWBool,
  jspb_internal_binary.REnumIgnoringDefaultWEnum,
  jspb_internal_binary.RStringRequireUtf8WString,
  jspb_internal_binary.RWBool,
  -2,
  jspb_internal_binary.RStringRequireUtf8WString,
  jspb$b$jetbox_state_pb$UserSettings$SandboxProxy.fields
]);

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @nodts
 * @return {!Uint8Array}
 */
jspb$jetbox_state_pb$MutableUserSettings.prototype.serializeBinary = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makePrototypeSerializeBinaryFunction(jspb$b$jetbox_state_pb$UserSettings.fields));


var jspb$b$exa$config_pb$UserConfig;
Object.defineProperty(this, 'jspb$b$exa$config_pb$UserConfig', {
  get() { return jspb$b$exa$config_pb$UserConfig; },
  set(v) { jspb$b$exa$config_pb$UserConfig = v; },
