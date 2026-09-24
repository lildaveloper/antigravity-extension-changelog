// source: third_party/jetski/jetbox_state_pb/jetbox_state.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$jetbox_state_pb$MutableCustomThemeSeeds');
goog.provide('jspb$ro.jetbox_state_pb$ReadonlyCustomThemeSeeds');

goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$jetbox_state_pb$ImmutableCustomThemeSeeds');
goog.requireType('jspb$r$jetbox_state_pb$CustomThemeSeeds$internalDoNotUseReader');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$jetbox_state_pb$ImmutableCustomThemeSeeds>}
 * @implements {jspb$r$jetbox_state_pb$CustomThemeSeeds$internalDoNotUseReader}
 */
jspb$jetbox_state_pb$MutableCustomThemeSeeds = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional string background = 1;
   * @override
   * @return {string}
   */
  getBackground() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 1);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableCustomThemeSeeds} returns this
   */
  setBackground(value) {
    return jspb_internal_adapters.setStringField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableCustomThemeSeeds} returns this
   */
  clearBackground() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasBackground() {
    return jspb_internal_adapters.hasStringField(this, 1);
  }


  /**
   * optional string background = 1;
   * @override
   * @return {string|undefined}
   */
  getBackgroundOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 1);
  }


  /**
   * optional string primary = 2;
   * @override
   * @return {string}
   */
  getPrimary() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 2);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableCustomThemeSeeds} returns this
   */
  setPrimary(value) {
    return jspb_internal_adapters.setStringField(this, 2, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableCustomThemeSeeds} returns this
   */
  clearPrimary() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasPrimary() {
    return jspb_internal_adapters.hasStringField(this, 2);
  }


  /**
   * optional string primary = 2;
   * @override
   * @return {string|undefined}
   */
  getPrimaryOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 2);
  }


  /**
   * optional string foreground_override = 3;
   * @override
   * @return {string}
   */
  getForegroundOverride() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 3);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableCustomThemeSeeds} returns this
   */
  setForegroundOverride(value) {
    return jspb_internal_adapters.setStringField(this, 3, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableCustomThemeSeeds} returns this
   */
  clearForegroundOverride() {
    return jspb_internal_adapters.clearField(this, 3);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasForegroundOverride() {
    return jspb_internal_adapters.hasStringField(this, 3);
  }


  /**
   * optional string foreground_override = 3;
   * @override
   * @return {string|undefined}
   */
  getForegroundOverrideOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 3);
  }


  /**
   * optional string primary_foreground_override = 4;
   * @override
   * @return {string}
   */
  getPrimaryForegroundOverride() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 4);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableCustomThemeSeeds} returns this
   */
  setPrimaryForegroundOverride(value) {
    return jspb_internal_adapters.setStringField(this, 4, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableCustomThemeSeeds} returns this
   */
  clearPrimaryForegroundOverride() {
    return jspb_internal_adapters.clearField(this, 4);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasPrimaryForegroundOverride() {
    return jspb_internal_adapters.hasStringField(this, 4);
  }


  /**
   * optional string primary_foreground_override = 4;
   * @override
   * @return {string|undefined}
   */
  getPrimaryForegroundOverrideOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 4);
  }


};

/**
 * @override
 * @return {!jspb$jetbox_state_pb$ImmutableCustomThemeSeeds}
 */
jspb$jetbox_state_pb$MutableCustomThemeSeeds.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$jetbox_state_pb$MutableCustomThemeSeeds}
 */
jspb$jetbox_state_pb$MutableCustomThemeSeeds.prototype.clone;
/**
 * @const {function(string):!jspb$jetbox_state_pb$MutableCustomThemeSeeds}
 */
jspb$jetbox_state_pb$MutableCustomThemeSeeds.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$jetbox_state_pb$MutableCustomThemeSeeds));

/**
 * Returns whether the given value is an instance of jspb$jetbox_state_pb$MutableCustomThemeSeeds.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$jetbox_state_pb$MutableCustomThemeSeeds>}
 */
jspb$jetbox_state_pb$MutableCustomThemeSeeds.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$jetbox_state_pb$MutableCustomThemeSeeds));

/**
 * Object form of CustomThemeSeeds as accepted by the `fromObject` method.
 * @typedef {{
 *  background: (?string|undefined),
 *  primary: (?string|undefined),
 *  foregroundOverride: (?string|undefined),
 *  primaryForegroundOverride: (?string|undefined)
 * }}
 */
jspb$jetbox_state_pb$MutableCustomThemeSeeds.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$jetbox_state_pb$MutableCustomThemeSeeds.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$jetbox_state_pb$MutableCustomThemeSeeds.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$jetbox_state_pb$MutableCustomThemeSeeds.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for jetbox_state_pb$MutableCustomThemeSeeds.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$jetbox_state_pb$MutableCustomThemeSeeds.internalDoNotUse_debugOnlyProtoTypeName = "jetbox_state_pb.CustomThemeSeeds";
}

/**
 * @typedef {!jspb$jetbox_state_pb$ImmutableCustomThemeSeeds|!jspb$jetbox_state_pb$MutableCustomThemeSeeds}
 */
jspb$ro.jetbox_state_pb$ReadonlyCustomThemeSeeds = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'jetbox_state_pb.CustomThemeSeeds'}
   */
  jspb$jetbox_state_pb$MutableCustomThemeSeeds.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$jetbox_state_pb$MutableCustomThemeSeeds.displayName = 'proto.jetbox_state_pb.CustomThemeSeeds';
}
/**
 * Interface form of CustomThemeSeeds as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  background: (string|undefined),
 *  primary: (string|undefined),
 *  foregroundOverride: (string|undefined),
 *  primaryForegroundOverride: (string|undefined)
 * }}
 */
jspb$jetbox_state_pb$MutableCustomThemeSeeds.FieldsInterface;

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
 * @param {!jspb$jetbox_state_pb$MutableCustomThemeSeeds.FieldsInterface} record
 * @return {!jspb$jetbox_state_pb$ImmutableCustomThemeSeeds}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableCustomThemeSeeds, ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableCustomThemeSeeds.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$jetbox_state_pb$ImmutableCustomThemeSeeds
 */
jspb$jetbox_state_pb$MutableCustomThemeSeeds.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$jetbox_state_pb$MutableCustomThemeSeeds));

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
 * @param {!jspb$ro.jetbox_state_pb$ReadonlyCustomThemeSeeds} value
 * @return {!jspb$jetbox_state_pb$MutableCustomThemeSeeds.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.jetbox_state_pb$ReadonlyCustomThemeSeeds): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableCustomThemeSeeds, ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableCustomThemeSeeds.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$jetbox_state_pb$MutableCustomThemeSeeds.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$jetbox_state_pb$MutableCogWorkspaceConfig;
Object.defineProperty(this, 'jspb$jetbox_state_pb$MutableCogWorkspaceConfig', {
  get() { return jspb$jetbox_state_pb$MutableCogWorkspaceConfig; },
  set(v) { jspb$jetbox_state_pb$MutableCogWorkspaceConfig = v; },
