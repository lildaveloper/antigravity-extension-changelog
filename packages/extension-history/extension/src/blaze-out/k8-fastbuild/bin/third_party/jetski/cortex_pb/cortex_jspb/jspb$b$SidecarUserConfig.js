// source: third_party/jetski/cortex_pb/cortex.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$b$exa$cortex_pb$SidecarUserConfig');

goog.require('jspb$b$exa$cortex_pb$SidecarAgentPermissions');
goog.require('jspb$exa$cortex_pb$MutableSidecarUserConfig');
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
jspb$b$exa$cortex_pb$SidecarUserConfig.fields = /** @pureOrBreakMyCode */([
  0,
  jspb$exa$cortex_pb$MutableSidecarUserConfig.oneofGroup_project_scope_,
  jspb_internal_binary.RWBool,
  jspb_internal_binary.RStringRequireUtf8OneofWString,
  jspb_internal_binary.RBoolOneofWBool,
  jspb_internal_binary.RWMapEntry,
  jspb_internal_binary.StringRequireUtf8StringRequireUtf8Map,
  jspb$b$exa$cortex_pb$SidecarAgentPermissions.fields,
  jspb_internal_binary.RInt32IgnoringDefaultWInt32
]);

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @nodts
 * @return {!Uint8Array}
 */
jspb$exa$cortex_pb$MutableSidecarUserConfig.prototype.serializeBinary = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makePrototypeSerializeBinaryFunction(jspb$b$exa$cortex_pb$SidecarUserConfig.fields));


var jspb$b$exa$codeium_common_pb$PermissionGrantsConfig;
Object.defineProperty(this, 'jspb$b$exa$codeium_common_pb$PermissionGrantsConfig', {
  get() { return jspb$b$exa$codeium_common_pb$PermissionGrantsConfig; },
  set(v) { jspb$b$exa$codeium_common_pb$PermissionGrantsConfig = v; },
