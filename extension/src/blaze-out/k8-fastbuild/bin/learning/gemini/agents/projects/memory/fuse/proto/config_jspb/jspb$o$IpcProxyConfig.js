// source: learning/gemini/agents/projects/memory/fuse/proto/config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$jetski_memory$IpcProxyConfig');

goog.require('jspb$jetski_memory$MutableIpcProxyConfig');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$jetski_memory$MutableIpcProxyConfig|undefined} msg The msg instance to transform.
 * @return {!jspb$jetski_memory$MutableIpcProxyConfig.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$jetski_memory$IpcProxyConfig.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$jetski_memory$MutableIpcProxyConfig.ObjectFormat} */ ({
    fdReq: jspb_internal_adapters.getInt32FieldWithDefault(msg, 1, 4),
    fdResp: jspb_internal_adapters.getInt32FieldWithDefault(msg, 2, 3),
    timeoutMs: jspb_internal_adapters.getInt32FieldWithDefault(msg, 3, 5000),
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
 * @return {!jspb$jetski_memory$MutableIpcProxyConfig.ObjectFormat}
 */
jspb$jetski_memory$MutableIpcProxyConfig.prototype.toObject = function() {
  return /** @type {!jspb$jetski_memory$MutableIpcProxyConfig.ObjectFormat} */ (jspb$o$jetski_memory$IpcProxyConfig.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$jetski_memory$MutableIpcProxyConfig.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$jetski_memory$MutableIpcProxyConfig}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$jetski_memory$IpcProxyConfig.fromObject = function(obj) {
  const msg = new jspb$jetski_memory$MutableIpcProxyConfig();
  jspb_internal_adapters.setInt32Field(msg, 1, obj.fdReq);
  jspb_internal_adapters.setInt32Field(msg, 2, obj.fdResp);
  jspb_internal_adapters.setInt32Field(msg, 3, obj.timeoutMs);
  return msg;
};
}

var jspb$o$jetski_memory$DumboBackendConfig;
Object.defineProperty(this, 'jspb$o$jetski_memory$DumboBackendConfig', {
  get() { return jspb$o$jetski_memory$DumboBackendConfig; },
  set(v) { jspb$o$jetski_memory$DumboBackendConfig = v; },
