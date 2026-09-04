// source: third_party/jetski/jetbox_state_pb/jetbox_state.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$b$jetbox_state_pb$JetboxAppState');

goog.require('jspb$b$jetbox_state_pb$CustomModelsConfig');
goog.require('jspb$b$jetbox_state_pb$GoogleSpecificSettings');
goog.require('jspb$b$jetbox_state_pb$PostOnboardingState');
goog.require('jspb$b$jetbox_state_pb$SeenNuxUids');
goog.require('jspb$b$jetbox_state_pb$SidebarWorkspaceInfo');
goog.require('jspb$jetbox_state_pb$MutableJetboxAppState');
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
jspb$b$jetbox_state_pb$JetboxAppState.fields = /** @pureOrBreakMyCode */([
  0,
  jspb$b$jetbox_state_pb$PostOnboardingState.fields,
  jspb$b$jetbox_state_pb$SeenNuxUids.fields,
  jspb_internal_binary.RBoolIgnoringDefaultWBool,
  jspb$b$jetbox_state_pb$GoogleSpecificSettings.fields,
  jspb_internal_binary.REnumIgnoringDefaultWEnum,
  jspb_internal_binary.RWMapEntry,
  jspb_internal_binary.createMessageMapEntryBinaryFields(
      jspb_internal_binary.RStringRequireUtf8WString,
      jspb$b$jetbox_state_pb$SidebarWorkspaceInfo.fields),
  3,
  jspb_internal_binary.REnumIgnoringDefaultWEnum,
  jspb$b$jetbox_state_pb$CustomModelsConfig.fields,
  1,
  jspb_internal_binary.REnumIgnoringDefaultWEnum,
  jspb_internal_binary.RWBool,
  1,
  jspb_internal_binary.REnumIgnoringDefaultWEnum,
  jspb_internal_binary.RStringRequireUtf8WString,
  jspb_internal_binary.REnumIgnoringDefaultWEnum,
  -1,
  jspb_internal_binary.RWInt64,
  jspb_internal_binary.RWMapEntry,
  jspb_internal_binary.Int32EnumMap
]);

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @nodts
 * @return {!Uint8Array}
 */
jspb$jetbox_state_pb$MutableJetboxAppState.prototype.serializeBinary = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makePrototypeSerializeBinaryFunction(jspb$b$jetbox_state_pb$JetboxAppState.fields));


var jspb$b$google$protobuf$Timestamp;
Object.defineProperty(this, 'jspb$b$google$protobuf$Timestamp', {
  get() { return jspb$b$google$protobuf$Timestamp; },
  set(v) { jspb$b$google$protobuf$Timestamp = v; },
