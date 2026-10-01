// source: devtools/jetski/boq/provisioning_service/proto/deployment_config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$devtools_jetski_provisioning$CustomizationConfig');

goog.require('jspb$devtools_jetski_provisioning$MutableCustomizationConfig');
goog.require('jspb$devtools_jetski_provisioning$MutablePathEntry');
goog.require('jspb$o$devtools_jetski_provisioning$PathEntry');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$devtools_jetski_provisioning$MutableCustomizationConfig|undefined} msg The msg instance to transform.
 * @return {!jspb$devtools_jetski_provisioning$MutableCustomizationConfig.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$devtools_jetski_provisioning$CustomizationConfig.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$devtools_jetski_provisioning$MutableCustomizationConfig.ObjectFormat} */ ({
    inheritsList: jspb_internal_public_for_gencode.toObjectList(msg.getInheritsList(), jspb$o$devtools_jetski_provisioning$PathEntry.internal_toObject),
    entriesList: jspb_internal_public_for_gencode.toObjectList(msg.getEntriesList(), jspb$o$devtools_jetski_provisioning$PathEntry.internal_toObject),
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
 * @return {!jspb$devtools_jetski_provisioning$MutableCustomizationConfig.ObjectFormat}
 */
jspb$devtools_jetski_provisioning$MutableCustomizationConfig.prototype.toObject = function() {
  return /** @type {!jspb$devtools_jetski_provisioning$MutableCustomizationConfig.ObjectFormat} */ (jspb$o$devtools_jetski_provisioning$CustomizationConfig.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$devtools_jetski_provisioning$MutableCustomizationConfig.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$devtools_jetski_provisioning$MutableCustomizationConfig}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$devtools_jetski_provisioning$CustomizationConfig.fromObject = function(obj) {
  const msg = new jspb$devtools_jetski_provisioning$MutableCustomizationConfig();
  jspb_internal_adapters.setRepeatedWrapperField(msg, jspb$devtools_jetski_provisioning$MutablePathEntry,
      1, jspb_internal_public_for_gencode.fromObjectList(obj.inheritsList,         jspb$o$devtools_jetski_provisioning$PathEntry.fromObject));
  jspb_internal_adapters.setRepeatedWrapperField(msg, jspb$devtools_jetski_provisioning$MutablePathEntry,
      2, jspb_internal_public_for_gencode.fromObjectList(obj.entriesList,         jspb$o$devtools_jetski_provisioning$PathEntry.fromObject));
  return msg;
};
}

var jspb$o$jetski_memory$AmbientInjectionConfig;
Object.defineProperty(this, 'jspb$o$jetski_memory$AmbientInjectionConfig', {
  get() { return jspb$o$jetski_memory$AmbientInjectionConfig; },
  set(v) { jspb$o$jetski_memory$AmbientInjectionConfig = v; },
