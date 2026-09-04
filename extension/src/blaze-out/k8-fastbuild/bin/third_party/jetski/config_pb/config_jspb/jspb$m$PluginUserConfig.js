// source: third_party/jetski/config_pb/config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$exa$config_pb$MutablePluginUserConfig');
goog.provide('jspb$ro.exa$config_pb$ReadonlyPluginUserConfig');

goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$exa$config_pb$ImmutablePluginUserConfig');
goog.requireType('jspb$r$exa$config_pb$PluginUserConfig$internalDoNotUseReader');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$exa$config_pb$ImmutablePluginUserConfig>}
 * @implements {jspb$r$exa$config_pb$PluginUserConfig$internalDoNotUseReader}
 */
jspb$exa$config_pb$MutablePluginUserConfig = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional bool enabled = 1;
   * @override
   * @return {boolean}
   */
  getEnabled() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 1);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$exa$config_pb$MutablePluginUserConfig} returns this
   */
  setEnabled(value) {
    return jspb_internal_adapters.setBooleanField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$config_pb$MutablePluginUserConfig} returns this
   */
  clearEnabled() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasEnabled() {
    return jspb_internal_adapters.hasBooleanField(this, 1);
  }


  /**
   * optional bool enabled = 1;
   * @override
   * @return {boolean|undefined}
   */
  getEnabledOrUndefined() {
    return jspb_internal_adapters.getBooleanFieldOrUndefined(this, 1);
  }


};

/**
 * @override
 * @return {!jspb$exa$config_pb$ImmutablePluginUserConfig}
 */
jspb$exa$config_pb$MutablePluginUserConfig.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$exa$config_pb$MutablePluginUserConfig}
 */
jspb$exa$config_pb$MutablePluginUserConfig.prototype.clone;
/**
 * @const {function(string):!jspb$exa$config_pb$MutablePluginUserConfig}
 */
jspb$exa$config_pb$MutablePluginUserConfig.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$exa$config_pb$MutablePluginUserConfig));

/**
 * Returns whether the given value is an instance of jspb$exa$config_pb$MutablePluginUserConfig.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$exa$config_pb$MutablePluginUserConfig>}
 */
jspb$exa$config_pb$MutablePluginUserConfig.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$exa$config_pb$MutablePluginUserConfig));

/**
 * Object form of PluginUserConfig as accepted by the `fromObject` method.
 * @typedef {{
 *  enabled: (?boolean|undefined)
 * }}
 */
jspb$exa$config_pb$MutablePluginUserConfig.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$exa$config_pb$MutablePluginUserConfig.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$exa$config_pb$MutablePluginUserConfig.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$exa$config_pb$MutablePluginUserConfig.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for exa$config_pb$MutablePluginUserConfig.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$exa$config_pb$MutablePluginUserConfig.internalDoNotUse_debugOnlyProtoTypeName = "exa.config_pb.PluginUserConfig";
}

/**
 * @typedef {!jspb$exa$config_pb$ImmutablePluginUserConfig|!jspb$exa$config_pb$MutablePluginUserConfig}
 */
jspb$ro.exa$config_pb$ReadonlyPluginUserConfig = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'exa.config_pb.PluginUserConfig'}
   */
  jspb$exa$config_pb$MutablePluginUserConfig.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$exa$config_pb$MutablePluginUserConfig.displayName = 'proto.exa.config_pb.PluginUserConfig';
}
/**
 * Interface form of PluginUserConfig as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  enabled: (boolean|undefined)
 * }}
 */
jspb$exa$config_pb$MutablePluginUserConfig.FieldsInterface;

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
 * @param {!jspb$exa$config_pb$MutablePluginUserConfig.FieldsInterface} record
 * @return {!jspb$exa$config_pb$ImmutablePluginUserConfig}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$exa$config_pb$MutablePluginUserConfig, ಠ_ಠ.clutz.jspb$exa$config_pb$MutablePluginUserConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$exa$config_pb$ImmutablePluginUserConfig
 */
jspb$exa$config_pb$MutablePluginUserConfig.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$exa$config_pb$MutablePluginUserConfig));

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
 * @param {!jspb$ro.exa$config_pb$ReadonlyPluginUserConfig} value
 * @return {!jspb$exa$config_pb$MutablePluginUserConfig.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.exa$config_pb$ReadonlyPluginUserConfig): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$exa$config_pb$MutablePluginUserConfig, ಠ_ಠ.clutz.jspb$exa$config_pb$MutablePluginUserConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$exa$config_pb$MutablePluginUserConfig.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$exa$cortex_pb$MutableSidecarAgentPermissions;
Object.defineProperty(this, 'jspb$exa$cortex_pb$MutableSidecarAgentPermissions', {
  get() { return jspb$exa$cortex_pb$MutableSidecarAgentPermissions; },
  set(v) { jspb$exa$cortex_pb$MutableSidecarAgentPermissions = v; },
