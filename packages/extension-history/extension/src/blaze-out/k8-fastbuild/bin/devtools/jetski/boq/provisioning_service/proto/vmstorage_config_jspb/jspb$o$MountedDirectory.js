// source: devtools/jetski/boq/provisioning_service/proto/vmstorage_config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$devtools_jetski_provisioning$MountedDirectory');

goog.require('jspb$devtools_jetski_provisioning$MutableMountedDirectory');
goog.require('jspb$devtools_jetski_provisioning$MutableVolumeClientConfig');
goog.require('jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig');
goog.require('jspb$o$devtools_jetski_provisioning$VolumeClientConfig');
goog.require('jspb$o$devtools_jetski_provisioning$VolumeCreationConfig');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$devtools_jetski_provisioning$MutableMountedDirectory|undefined} msg The msg instance to transform.
 * @return {!jspb$devtools_jetski_provisioning$MutableMountedDirectory.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$devtools_jetski_provisioning$MountedDirectory.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$devtools_jetski_provisioning$MutableMountedDirectory.ObjectFormat} */ ({
    mountPoint: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 1)),
    hostPath: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getOneofStringFieldLegacyNullable(msg, 2, jspb$devtools_jetski_provisioning$MutableMountedDirectory.oneofGroup_source_)),
    volumeCreationConfig: jspb$o$devtools_jetski_provisioning$VolumeCreationConfig.internal_toObject(msg.getVolumeCreationConfig()),
    clientConfig: jspb$o$devtools_jetski_provisioning$VolumeClientConfig.internal_toObject(msg.getClientConfig()),
    readOnly: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getBooleanFieldLegacyNullable(msg, 3)),
    mountAtRoot: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getBooleanFieldLegacyNullable(msg, 4)),
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
 * @return {!jspb$devtools_jetski_provisioning$MutableMountedDirectory.ObjectFormat}
 */
jspb$devtools_jetski_provisioning$MutableMountedDirectory.prototype.toObject = function() {
  return /** @type {!jspb$devtools_jetski_provisioning$MutableMountedDirectory.ObjectFormat} */ (jspb$o$devtools_jetski_provisioning$MountedDirectory.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$devtools_jetski_provisioning$MutableMountedDirectory.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$devtools_jetski_provisioning$MutableMountedDirectory}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$devtools_jetski_provisioning$MountedDirectory.fromObject = function(obj) {
  const msg = new jspb$devtools_jetski_provisioning$MutableMountedDirectory();
  jspb_internal_adapters.setStringField(msg, 1, obj.mountPoint);
  jspb_internal_adapters.setOneofStringField(msg, 2, jspb$devtools_jetski_provisioning$MutableMountedDirectory.oneofGroup_source_, obj.hostPath);
  jspb_internal_adapters.setOneofWrapperField(msg,
      jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig,
      6, jspb$devtools_jetski_provisioning$MutableMountedDirectory.oneofGroup_source_, jspb_internal_public_for_gencode.fromObjectNullable(obj.volumeCreationConfig, jspb$o$devtools_jetski_provisioning$VolumeCreationConfig.fromObject));
  jspb_internal_adapters.setWrapperField(msg,
      jspb$devtools_jetski_provisioning$MutableVolumeClientConfig,
      5, jspb_internal_public_for_gencode.fromObjectNullable(obj.clientConfig, jspb$o$devtools_jetski_provisioning$VolumeClientConfig.fromObject));
  jspb_internal_adapters.setBooleanField(msg, 3, obj.readOnly);
  jspb_internal_adapters.setBooleanField(msg, 4, obj.mountAtRoot);
  return msg;
};
}

var jspb$o$devtools_jetski_provisioning$VmstorageConfig;
Object.defineProperty(this, 'jspb$o$devtools_jetski_provisioning$VmstorageConfig', {
  get() { return jspb$o$devtools_jetski_provisioning$VmstorageConfig; },
  set(v) { jspb$o$devtools_jetski_provisioning$VmstorageConfig = v; },
