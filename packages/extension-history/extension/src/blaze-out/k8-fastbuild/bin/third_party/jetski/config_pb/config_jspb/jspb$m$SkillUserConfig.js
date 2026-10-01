// source: third_party/jetski/config_pb/config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$exa$config_pb$MutableSkillUserConfig');
goog.provide('jspb$ro.exa$config_pb$ReadonlySkillUserConfig');

goog.require('jspb$exa$cortex_pb$MutableMarketplaceInstall');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$exa$config_pb$ImmutableSkillUserConfig');
goog.requireType('jspb$r$exa$config_pb$SkillUserConfig$internalDoNotUseReader');
goog.requireType('jspb$ro.exa$cortex_pb$ReadonlyMarketplaceInstall');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$exa$config_pb$ImmutableSkillUserConfig>}
 * @implements {jspb$r$exa$config_pb$SkillUserConfig$internalDoNotUseReader}
 */
jspb$exa$config_pb$MutableSkillUserConfig = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional exa.cortex_pb.MarketplaceInstall installed_from = 1;
   * @override
   * @return {!jspb$exa$cortex_pb$MutableMarketplaceInstall|undefined}
   */
  getInstalledFrom() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$exa$cortex_pb$MutableMarketplaceInstall, 1);
  }


  /**
   * optional exa.cortex_pb.MarketplaceInstall installed_from = 1;
   * @override
   * @return {!jspb$ro.exa$cortex_pb$ReadonlyMarketplaceInstall}
   */
  getReadonlyInstalledFrom() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$exa$cortex_pb$MutableMarketplaceInstall, 1);
  }


  /**
   * optional exa.cortex_pb.MarketplaceInstall installed_from = 1;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$exa$cortex_pb$MutableMarketplaceInstall|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$exa$cortex_pb$MutableMarketplaceInstall') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$exa$cortex_pb$MutableMarketplaceInstall|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$exa$cortex_pb$MutableMarketplaceInstall
   */
  getMutableInstalledFrom(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$exa$cortex_pb$MutableMarketplaceInstall, 1, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.exa$cortex_pb$ReadonlyMarketplaceInstall|null|undefined} value
   * @return {!jspb$exa$config_pb$MutableSkillUserConfig} returns this
   */
  setInstalledFrom(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$exa$cortex_pb$MutableMarketplaceInstall, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$config_pb$MutableSkillUserConfig} returns this
   */
  clearInstalledFrom() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasInstalledFrom() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$exa$cortex_pb$MutableMarketplaceInstall, 1);
  }


  /**
   * optional exa.cortex_pb.MarketplaceInstall installed_from = 1;
   * @override
   * @return {!jspb$ro.exa$cortex_pb$ReadonlyMarketplaceInstall|undefined}
   */
  getInstalledFromOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$exa$cortex_pb$MutableMarketplaceInstall, 1);
  }


};

/**
 * @override
 * @return {!jspb$exa$config_pb$ImmutableSkillUserConfig}
 */
jspb$exa$config_pb$MutableSkillUserConfig.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$exa$config_pb$MutableSkillUserConfig}
 */
jspb$exa$config_pb$MutableSkillUserConfig.prototype.clone;
/**
 * @const {function(string):!jspb$exa$config_pb$MutableSkillUserConfig}
 */
jspb$exa$config_pb$MutableSkillUserConfig.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$exa$config_pb$MutableSkillUserConfig));

/**
 * Returns whether the given value is an instance of jspb$exa$config_pb$MutableSkillUserConfig.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$exa$config_pb$MutableSkillUserConfig>}
 */
jspb$exa$config_pb$MutableSkillUserConfig.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$exa$config_pb$MutableSkillUserConfig));

/**
 * Object form of SkillUserConfig as accepted by the `fromObject` method.
 * @typedef {{
 *  installedFrom: (?jspb$exa$cortex_pb$MutableMarketplaceInstall.ObjectFormat|undefined)
 * }}
 */
jspb$exa$config_pb$MutableSkillUserConfig.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$exa$config_pb$MutableSkillUserConfig.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$exa$config_pb$MutableSkillUserConfig.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$exa$config_pb$MutableSkillUserConfig.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for exa$config_pb$MutableSkillUserConfig.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$exa$config_pb$MutableSkillUserConfig.internalDoNotUse_debugOnlyProtoTypeName = "exa.config_pb.SkillUserConfig";
}

/**
 * @typedef {!jspb$exa$config_pb$ImmutableSkillUserConfig|!jspb$exa$config_pb$MutableSkillUserConfig}
 */
jspb$ro.exa$config_pb$ReadonlySkillUserConfig = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'exa.config_pb.SkillUserConfig'}
   */
  jspb$exa$config_pb$MutableSkillUserConfig.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$exa$config_pb$MutableSkillUserConfig.displayName = 'proto.exa.config_pb.SkillUserConfig';
}
/**
 * Interface form of SkillUserConfig as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  installedFrom: (!jspb$ro.exa$cortex_pb$ReadonlyMarketplaceInstall|undefined)
 * }}
 */
jspb$exa$config_pb$MutableSkillUserConfig.FieldsInterface;

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
 * @param {!jspb$exa$config_pb$MutableSkillUserConfig.FieldsInterface} record
 * @return {!jspb$exa$config_pb$ImmutableSkillUserConfig}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$exa$config_pb$MutableSkillUserConfig, ಠ_ಠ.clutz.jspb$exa$config_pb$MutableSkillUserConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$exa$config_pb$ImmutableSkillUserConfig
 */
jspb$exa$config_pb$MutableSkillUserConfig.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$exa$config_pb$MutableSkillUserConfig));

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
 * @param {!jspb$ro.exa$config_pb$ReadonlySkillUserConfig} value
 * @return {!jspb$exa$config_pb$MutableSkillUserConfig.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.exa$config_pb$ReadonlySkillUserConfig): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$exa$config_pb$MutableSkillUserConfig, ಠ_ಠ.clutz.jspb$exa$config_pb$MutableSkillUserConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$exa$config_pb$MutableSkillUserConfig.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$exa$cortex_pb$MutableSidecarAgentPermissions;
Object.defineProperty(this, 'jspb$exa$cortex_pb$MutableSidecarAgentPermissions', {
  get() { return jspb$exa$cortex_pb$MutableSidecarAgentPermissions; },
  set(v) { jspb$exa$cortex_pb$MutableSidecarAgentPermissions = v; },
