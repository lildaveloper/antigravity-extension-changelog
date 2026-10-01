// source: third_party/jetski/config_pb/config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$exa$config_pb$MutablePluginMcpUserConfig');
goog.provide('jspb$ro.exa$config_pb$ReadonlyPluginMcpUserConfig');

goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$exa$config_pb$ImmutablePluginMcpUserConfig');
goog.requireType('jspb$r$exa$config_pb$PluginMcpUserConfig$internalDoNotUseReader');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$exa$config_pb$ImmutablePluginMcpUserConfig>}
 * @implements {jspb$r$exa$config_pb$PluginMcpUserConfig$internalDoNotUseReader}
 */
jspb$exa$config_pb$MutablePluginMcpUserConfig = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * map<string, string> variables = 1;
   * @override
   * @return {!Map<string,string>}
   */
  getVariablesMap() {
    return jspb_internal_adapters.getStringStringMapField(this, 1);}



  /**
   * @param {string} key The key of value to set or replace.
   * @param {string} value The new value.
   * @return {!jspb$exa$config_pb$MutablePluginMcpUserConfig} returns this
   */
  putVariables(key, value) {
    return jspb_internal_adapters.putStringStringMapField(this, 1, key, value);
  }


  /**
   * @param {!ReadonlyMap<string,string>} value The new values.
   * @return {!jspb$exa$config_pb$MutablePluginMcpUserConfig} returns this
   */
  putAllVariables(value) {
    return jspb_internal_adapters.putAllStringStringMapField(this, 1, value);
  }


  /**
   * @param {!ReadonlyMap<string,string>|undefined} value The new values.
   * @return {!jspb$exa$config_pb$MutablePluginMcpUserConfig} returns this
   */
  setVariablesMap(value) {
    return jspb_internal_adapters.setStringStringMapField(this, 1, value);
  }


  /**
   * @param {string} key The key of value to remove.
   * @return {!jspb$exa$config_pb$MutablePluginMcpUserConfig} returns this
   */
  deleteVariables(key) {
    return jspb_internal_adapters.deleteStringStringMapField(this, 1, key);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$config_pb$MutablePluginMcpUserConfig} returns this
   */
  clearVariablesMap() {
    return jspb_internal_adapters.clearMapField(this, 1);
  }


};

/**
 * @override
 * @return {!jspb$exa$config_pb$ImmutablePluginMcpUserConfig}
 */
jspb$exa$config_pb$MutablePluginMcpUserConfig.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$exa$config_pb$MutablePluginMcpUserConfig}
 */
jspb$exa$config_pb$MutablePluginMcpUserConfig.prototype.clone;
/**
 * @const {function(string):!jspb$exa$config_pb$MutablePluginMcpUserConfig}
 */
jspb$exa$config_pb$MutablePluginMcpUserConfig.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$exa$config_pb$MutablePluginMcpUserConfig));

/**
 * Returns whether the given value is an instance of jspb$exa$config_pb$MutablePluginMcpUserConfig.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$exa$config_pb$MutablePluginMcpUserConfig>}
 */
jspb$exa$config_pb$MutablePluginMcpUserConfig.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$exa$config_pb$MutablePluginMcpUserConfig));

/**
 * Object form of PluginMcpUserConfig as accepted by the `fromObject` method.
 * @typedef {{
 *  variablesMap: (?Array<!Array<string>>|undefined)
 * }}
 */
jspb$exa$config_pb$MutablePluginMcpUserConfig.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$exa$config_pb$MutablePluginMcpUserConfig.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$exa$config_pb$MutablePluginMcpUserConfig.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$exa$config_pb$MutablePluginMcpUserConfig.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for exa$config_pb$MutablePluginMcpUserConfig.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$exa$config_pb$MutablePluginMcpUserConfig.internalDoNotUse_debugOnlyProtoTypeName = "exa.config_pb.PluginMcpUserConfig";
}

/**
 * @typedef {!jspb$exa$config_pb$ImmutablePluginMcpUserConfig|!jspb$exa$config_pb$MutablePluginMcpUserConfig}
 */
jspb$ro.exa$config_pb$ReadonlyPluginMcpUserConfig = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'exa.config_pb.PluginMcpUserConfig'}
   */
  jspb$exa$config_pb$MutablePluginMcpUserConfig.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$exa$config_pb$MutablePluginMcpUserConfig.displayName = 'proto.exa.config_pb.PluginMcpUserConfig';
}
/**
 * Interface form of PluginMcpUserConfig as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  variablesMap: (!ReadonlyMap<string,string>|undefined)
 * }}
 */
jspb$exa$config_pb$MutablePluginMcpUserConfig.FieldsInterface;

/**
 * Constructs a set of proto fields into an immutable proto.
 *
 * This method can only be called in TS and must be passed an object.
 * literal with keys matching the setter names (so where you have
 * setFooList on the type, you can write {fooList: ...} here).
 *
 * See go/jspb-fields-interface for more information.
 *
 * This record format is **not a serialization format**.
 * @package this cannot be called from JS.
 * @param {!jspb$exa$config_pb$MutablePluginMcpUserConfig.FieldsInterface} record
 * @return {!jspb$exa$config_pb$ImmutablePluginMcpUserConfig}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$exa$config_pb$MutablePluginMcpUserConfig, ಠ_ಠ.clutz.jspb$exa$config_pb$MutablePluginMcpUserConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$exa$config_pb$ImmutablePluginMcpUserConfig
 */
jspb$exa$config_pb$MutablePluginMcpUserConfig.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$exa$config_pb$MutablePluginMcpUserConfig));

/**
 * Retrieves the fields of this proto in a destructurable interface.
 *
 * This method can only be called in TS and the result must be
 * immediately destructured (so you can write
 * const {a} = Foo.getFields(value);).
 *
 * See go/jspb-fields-interface for more information.
 *
 * @package this cannot be called from JS.
 * @param {!jspb$ro.exa$config_pb$ReadonlyPluginMcpUserConfig} value
 * @return {!jspb$exa$config_pb$MutablePluginMcpUserConfig.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.exa$config_pb$ReadonlyPluginMcpUserConfig): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$exa$config_pb$MutablePluginMcpUserConfig, ಠ_ಠ.clutz.jspb$exa$config_pb$MutablePluginMcpUserConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$exa$config_pb$MutablePluginMcpUserConfig.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$exa$cortex_pb$MutableMarketplaceInstall;
Object.defineProperty(this, 'jspb$exa$cortex_pb$MutableMarketplaceInstall', {
  get() { return jspb$exa$cortex_pb$MutableMarketplaceInstall; },
  set(v) { jspb$exa$cortex_pb$MutableMarketplaceInstall = v; },
