// source: learning/gemini/agents/projects/memory/fuse/proto/config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$jetski_memory$DumboBackendConfig');

goog.require('jspb$jetski_memory$MutableDumboBackendConfig');
goog.require('jspb$jetski_memory$MutableIpcProxyConfig');
goog.require('jspb$o$jetski_memory$IpcProxyConfig');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$jetski_memory$MutableDumboBackendConfig|undefined} msg The msg instance to transform.
 * @return {!jspb$jetski_memory$MutableDumboBackendConfig.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$jetski_memory$DumboBackendConfig.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$jetski_memory$MutableDumboBackendConfig.ObjectFormat} */ ({
    target: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 1)),
    resourceName: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getStringFieldLegacyNullable(msg, 2)),
    ipcProxy: jspb$o$jetski_memory$IpcProxyConfig.internal_toObject(msg.getIpcProxy()),
    readOnly: jspb_internal_public_for_gencode.toObjectPrimitive(jspb_internal_adapters.getBooleanFieldLegacyNullable(msg, 4)),
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
 * @return {!jspb$jetski_memory$MutableDumboBackendConfig.ObjectFormat}
 */
jspb$jetski_memory$MutableDumboBackendConfig.prototype.toObject = function() {
  return /** @type {!jspb$jetski_memory$MutableDumboBackendConfig.ObjectFormat} */ (jspb$o$jetski_memory$DumboBackendConfig.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$jetski_memory$MutableDumboBackendConfig.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$jetski_memory$MutableDumboBackendConfig}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$jetski_memory$DumboBackendConfig.fromObject = function(obj) {
  const msg = new jspb$jetski_memory$MutableDumboBackendConfig();
  jspb_internal_adapters.setStringField(msg, 1, obj.target);
  jspb_internal_adapters.setStringField(msg, 2, obj.resourceName);
  jspb_internal_adapters.setWrapperField(msg,
      jspb$jetski_memory$MutableIpcProxyConfig,
      3, jspb_internal_public_for_gencode.fromObjectNullable(obj.ipcProxy, jspb$o$jetski_memory$IpcProxyConfig.fromObject));
  jspb_internal_adapters.setBooleanField(msg, 4, obj.readOnly);
  return msg;
};
}

var jspb$o$jetski_memory$SkillsBackendConfig;
Object.defineProperty(this, 'jspb$o$jetski_memory$SkillsBackendConfig', {
  get() { return jspb$o$jetski_memory$SkillsBackendConfig; },
  set(v) { jspb$o$jetski_memory$SkillsBackendConfig = v; },
