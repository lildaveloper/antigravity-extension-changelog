// source: third_party/jetski/project_pb/project.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$exa$project_pb$MutableSecurityPluginSettings');
goog.provide('jspb$ro.exa$project_pb$ReadonlySecurityPluginSettings');

goog.require('jspb$exa$project_pb$SecurityPluginSettings$MutableCli');
goog.require('jspb$exa$project_pb$SecurityPluginSettings$MutableVetted');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$exa$project_pb$ImmutableSecurityPluginSettings');
goog.requireType('jspb$r$exa$project_pb$SecurityPluginSettings$internalDoNotUseReader');
goog.requireType('jspb$ro.exa$project_pb$SecurityPluginSettings$ReadonlyCli');
goog.requireType('jspb$ro.exa$project_pb$SecurityPluginSettings$ReadonlyVetted');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$exa$project_pb$ImmutableSecurityPluginSettings>}
 * @implements {jspb$r$exa$project_pb$SecurityPluginSettings$internalDoNotUseReader}
 */
jspb$exa$project_pb$MutableSecurityPluginSettings = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional Cli cli = 1;
   * @override
   * @return {!jspb$exa$project_pb$SecurityPluginSettings$MutableCli|undefined}
   */
  getCli() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$exa$project_pb$SecurityPluginSettings$MutableCli, 1);
  }


  /**
   * optional Cli cli = 1;
   * @override
   * @return {!jspb$ro.exa$project_pb$SecurityPluginSettings$ReadonlyCli}
   */
  getReadonlyCli() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$exa$project_pb$SecurityPluginSettings$MutableCli, 1);
  }


  /**
   * optional Cli cli = 1;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$exa$project_pb$SecurityPluginSettings$MutableCli|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$exa$project_pb$SecurityPluginSettings$MutableCli') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$exa$project_pb$SecurityPluginSettings$MutableCli|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$exa$project_pb$SecurityPluginSettings$MutableCli
   */
  getMutableCli(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$exa$project_pb$SecurityPluginSettings$MutableCli, 1, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.exa$project_pb$SecurityPluginSettings$ReadonlyCli|null|undefined} value
   * @return {!jspb$exa$project_pb$MutableSecurityPluginSettings} returns this
   */
  setCli(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$exa$project_pb$SecurityPluginSettings$MutableCli, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$project_pb$MutableSecurityPluginSettings} returns this
   */
  clearCli() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasCli() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$exa$project_pb$SecurityPluginSettings$MutableCli, 1);
  }


  /**
   * optional Cli cli = 1;
   * @override
   * @return {!jspb$ro.exa$project_pb$SecurityPluginSettings$ReadonlyCli|undefined}
   */
  getCliOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$exa$project_pb$SecurityPluginSettings$MutableCli, 1);
  }


  /**
   * optional Vetted vetted = 2;
   * @override
   * @return {!jspb$exa$project_pb$SecurityPluginSettings$MutableVetted|undefined}
   */
  getVetted() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$exa$project_pb$SecurityPluginSettings$MutableVetted, 2);
  }


  /**
   * optional Vetted vetted = 2;
   * @override
   * @return {!jspb$ro.exa$project_pb$SecurityPluginSettings$ReadonlyVetted}
   */
  getReadonlyVetted() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$exa$project_pb$SecurityPluginSettings$MutableVetted, 2);
  }


  /**
   * optional Vetted vetted = 2;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$exa$project_pb$SecurityPluginSettings$MutableVetted|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$exa$project_pb$SecurityPluginSettings$MutableVetted') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$exa$project_pb$SecurityPluginSettings$MutableVetted|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$exa$project_pb$SecurityPluginSettings$MutableVetted
   */
  getMutableVetted(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$exa$project_pb$SecurityPluginSettings$MutableVetted, 2, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.exa$project_pb$SecurityPluginSettings$ReadonlyVetted|null|undefined} value
   * @return {!jspb$exa$project_pb$MutableSecurityPluginSettings} returns this
   */
  setVetted(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$exa$project_pb$SecurityPluginSettings$MutableVetted, 2, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$project_pb$MutableSecurityPluginSettings} returns this
   */
  clearVetted() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasVetted() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$exa$project_pb$SecurityPluginSettings$MutableVetted, 2);
  }


  /**
   * optional Vetted vetted = 2;
   * @override
   * @return {!jspb$ro.exa$project_pb$SecurityPluginSettings$ReadonlyVetted|undefined}
   */
  getVettedOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$exa$project_pb$SecurityPluginSettings$MutableVetted, 2);
  }


};

/**
 * @override
 * @return {!jspb$exa$project_pb$ImmutableSecurityPluginSettings}
 */
jspb$exa$project_pb$MutableSecurityPluginSettings.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$exa$project_pb$MutableSecurityPluginSettings}
 */
jspb$exa$project_pb$MutableSecurityPluginSettings.prototype.clone;
/**
 * @const {function(string):!jspb$exa$project_pb$MutableSecurityPluginSettings}
 */
jspb$exa$project_pb$MutableSecurityPluginSettings.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$exa$project_pb$MutableSecurityPluginSettings));

/**
 * Returns whether the given value is an instance of jspb$exa$project_pb$MutableSecurityPluginSettings.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$exa$project_pb$MutableSecurityPluginSettings>}
 */
jspb$exa$project_pb$MutableSecurityPluginSettings.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$exa$project_pb$MutableSecurityPluginSettings));

/**
 * Object form of SecurityPluginSettings as accepted by the `fromObject` method.
 * @typedef {{
 *  cli: (?jspb$exa$project_pb$SecurityPluginSettings$MutableCli.ObjectFormat|undefined),
 *  vetted: (?jspb$exa$project_pb$SecurityPluginSettings$MutableVetted.ObjectFormat|undefined)
 * }}
 */
jspb$exa$project_pb$MutableSecurityPluginSettings.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$exa$project_pb$MutableSecurityPluginSettings.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$exa$project_pb$MutableSecurityPluginSettings.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$exa$project_pb$MutableSecurityPluginSettings.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for exa$project_pb$MutableSecurityPluginSettings.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$exa$project_pb$MutableSecurityPluginSettings.internalDoNotUse_debugOnlyProtoTypeName = "exa.project_pb.SecurityPluginSettings";
}

/**
 * @typedef {!jspb$exa$project_pb$ImmutableSecurityPluginSettings|!jspb$exa$project_pb$MutableSecurityPluginSettings}
 */
jspb$ro.exa$project_pb$ReadonlySecurityPluginSettings = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'exa.project_pb.SecurityPluginSettings'}
   */
  jspb$exa$project_pb$MutableSecurityPluginSettings.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$exa$project_pb$MutableSecurityPluginSettings.displayName = 'proto.exa.project_pb.SecurityPluginSettings';
}
/**
 * Interface form of SecurityPluginSettings as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  cli: (!jspb$ro.exa$project_pb$SecurityPluginSettings$ReadonlyCli|undefined),
 *  vetted: (!jspb$ro.exa$project_pb$SecurityPluginSettings$ReadonlyVetted|undefined)
 * }}
 */
jspb$exa$project_pb$MutableSecurityPluginSettings.FieldsInterface;

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
 * @param {!jspb$exa$project_pb$MutableSecurityPluginSettings.FieldsInterface} record
 * @return {!jspb$exa$project_pb$ImmutableSecurityPluginSettings}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$exa$project_pb$MutableSecurityPluginSettings, ಠ_ಠ.clutz.jspb$exa$project_pb$MutableSecurityPluginSettings.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$exa$project_pb$ImmutableSecurityPluginSettings
 */
jspb$exa$project_pb$MutableSecurityPluginSettings.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$exa$project_pb$MutableSecurityPluginSettings));

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
 * @param {!jspb$ro.exa$project_pb$ReadonlySecurityPluginSettings} value
 * @return {!jspb$exa$project_pb$MutableSecurityPluginSettings.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.exa$project_pb$ReadonlySecurityPluginSettings): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$exa$project_pb$MutableSecurityPluginSettings, ಠ_ಠ.clutz.jspb$exa$project_pb$MutableSecurityPluginSettings.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$exa$project_pb$MutableSecurityPluginSettings.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$exa$project_pb$MutableProjectSettings;
Object.defineProperty(this, 'jspb$exa$project_pb$MutableProjectSettings', {
  get() { return jspb$exa$project_pb$MutableProjectSettings; },
  set(v) { jspb$exa$project_pb$MutableProjectSettings = v; },
