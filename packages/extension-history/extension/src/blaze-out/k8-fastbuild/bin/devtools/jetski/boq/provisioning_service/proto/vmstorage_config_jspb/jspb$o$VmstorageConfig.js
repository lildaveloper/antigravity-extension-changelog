// source: devtools/jetski/boq/provisioning_service/proto/vmstorage_config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$devtools_jetski_provisioning$VmstorageConfig');

goog.require('jspb$devtools_jetski_provisioning$MutableMountedDirectory');
goog.require('jspb$devtools_jetski_provisioning$MutableVmstorageConfig');
goog.require('jspb$o$devtools_jetski_provisioning$MountedDirectory');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$devtools_jetski_provisioning$MutableVmstorageConfig|undefined} msg The msg instance to transform.
 * @return {!jspb$devtools_jetski_provisioning$MutableVmstorageConfig.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$devtools_jetski_provisioning$VmstorageConfig.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$devtools_jetski_provisioning$MutableVmstorageConfig.ObjectFormat} */ ({
    coordinatorAddress: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 1)),
    volumeId: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 2)),
    insecure: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getBooleanFieldLegacyNullable(msg, 3)),
    geminiDir: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 4)),
    appDataDir: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 5)),
    mountsList: jspb_internal_public_for_gencode.toObjectList(msg.getMountsList(), jspb$o$devtools_jetski_provisioning$MountedDirectory.internal_toObject),
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
 * @return {!jspb$devtools_jetski_provisioning$MutableVmstorageConfig.ObjectFormat}
 */
jspb$devtools_jetski_provisioning$MutableVmstorageConfig.prototype.toObject = function() {
  return /** @type {!jspb$devtools_jetski_provisioning$MutableVmstorageConfig.ObjectFormat} */ (jspb$o$devtools_jetski_provisioning$VmstorageConfig.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$devtools_jetski_provisioning$MutableVmstorageConfig.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$devtools_jetski_provisioning$MutableVmstorageConfig}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$devtools_jetski_provisioning$VmstorageConfig.fromObject = function(obj) {
  const msg = new jspb$devtools_jetski_provisioning$MutableVmstorageConfig();
  jspb_internal_adapters.setStringField(msg, 1, obj.coordinatorAddress);
  jspb_internal_adapters.setStringField(msg, 2, obj.volumeId);
  jspb_internal_adapters.setBooleanField(msg, 3, obj.insecure);
  jspb_internal_adapters.setStringField(msg, 4, obj.geminiDir);
  jspb_internal_adapters.setStringField(msg, 5, obj.appDataDir);
  jspb_internal_adapters.setRepeatedWrapperField(msg, jspb$devtools_jetski_provisioning$MutableMountedDirectory,
      6, jspb_internal_public_for_gencode.fromObjectList(obj.mountsList,         jspb$o$devtools_jetski_provisioning$MountedDirectory.fromObject));
  return msg;
};
}

var jspb$o$exa$config_pb$ConversationGroupConfig;
Object.defineProperty(this, 'jspb$o$exa$config_pb$ConversationGroupConfig', {
  get() { return jspb$o$exa$config_pb$ConversationGroupConfig; },
  set(v) { jspb$o$exa$config_pb$ConversationGroupConfig = v; },
