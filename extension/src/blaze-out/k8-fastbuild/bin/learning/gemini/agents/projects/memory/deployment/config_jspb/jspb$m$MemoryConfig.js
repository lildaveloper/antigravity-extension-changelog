// source: learning/gemini/agents/projects/memory/deployment/config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$jetski_memory$MutableMemoryConfig');
goog.provide('jspb$ro.jetski_memory$ReadonlyMemoryConfig');

goog.require('jspb$jetski_memory$MutableAmbientInjectionConfig');
goog.require('jspb$jetski_memory$MutableDreamingConfig');
goog.require('jspb$jetski_memory$MutableFuseConfig');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$e.jetski_memory$ReleaseTrack');
goog.requireType('jspb$jetski_memory$ImmutableMemoryConfig');
goog.requireType('jspb$r$jetski_memory$MemoryConfig$internalDoNotUseReader');
goog.requireType('jspb$ro.jetski_memory$ReadonlyAmbientInjectionConfig');
goog.requireType('jspb$ro.jetski_memory$ReadonlyDreamingConfig');
goog.requireType('jspb$ro.jetski_memory$ReadonlyFuseConfig');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$jetski_memory$ImmutableMemoryConfig>}
 * @implements {jspb$r$jetski_memory$MemoryConfig$internalDoNotUseReader}
 */
jspb$jetski_memory$MutableMemoryConfig = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional AmbientInjectionConfig ambient_memory = 1;
   * @override
   * @return {!jspb$jetski_memory$MutableAmbientInjectionConfig|undefined}
   */
  getAmbientMemory() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$jetski_memory$MutableAmbientInjectionConfig, 1);
  }


  /**
   * optional AmbientInjectionConfig ambient_memory = 1;
   * @override
   * @return {!jspb$ro.jetski_memory$ReadonlyAmbientInjectionConfig}
   */
  getReadonlyAmbientMemory() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$jetski_memory$MutableAmbientInjectionConfig, 1);
  }


  /**
   * optional AmbientInjectionConfig ambient_memory = 1;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$jetski_memory$MutableAmbientInjectionConfig|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$jetski_memory$MutableAmbientInjectionConfig') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$jetski_memory$MutableAmbientInjectionConfig|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$jetski_memory$MutableAmbientInjectionConfig
   */
  getMutableAmbientMemory(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$jetski_memory$MutableAmbientInjectionConfig, 1, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.jetski_memory$ReadonlyAmbientInjectionConfig|null|undefined} value
   * @return {!jspb$jetski_memory$MutableMemoryConfig} returns this
   */
  setAmbientMemory(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$jetski_memory$MutableAmbientInjectionConfig, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableMemoryConfig} returns this
   */
  clearAmbientMemory() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasAmbientMemory() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$jetski_memory$MutableAmbientInjectionConfig, 1);
  }


  /**
   * optional AmbientInjectionConfig ambient_memory = 1;
   * @override
   * @return {!jspb$ro.jetski_memory$ReadonlyAmbientInjectionConfig|undefined}
   */
  getAmbientMemoryOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$jetski_memory$MutableAmbientInjectionConfig, 1);
  }


  /**
   * optional DreamingConfig dreaming = 4;
   * @override
   * @return {!jspb$jetski_memory$MutableDreamingConfig|undefined}
   */
  getDreaming() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$jetski_memory$MutableDreamingConfig, 4);
  }


  /**
   * optional DreamingConfig dreaming = 4;
   * @override
   * @return {!jspb$ro.jetski_memory$ReadonlyDreamingConfig}
   */
  getReadonlyDreaming() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$jetski_memory$MutableDreamingConfig, 4);
  }


  /**
   * optional DreamingConfig dreaming = 4;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$jetski_memory$MutableDreamingConfig|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$jetski_memory$MutableDreamingConfig') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$jetski_memory$MutableDreamingConfig|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$jetski_memory$MutableDreamingConfig
   */
  getMutableDreaming(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$jetski_memory$MutableDreamingConfig, 4, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.jetski_memory$ReadonlyDreamingConfig|null|undefined} value
   * @return {!jspb$jetski_memory$MutableMemoryConfig} returns this
   */
  setDreaming(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$jetski_memory$MutableDreamingConfig, 4, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableMemoryConfig} returns this
   */
  clearDreaming() {
    return jspb_internal_adapters.clearField(this, 4);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasDreaming() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$jetski_memory$MutableDreamingConfig, 4);
  }


  /**
   * optional DreamingConfig dreaming = 4;
   * @override
   * @return {!jspb$ro.jetski_memory$ReadonlyDreamingConfig|undefined}
   */
  getDreamingOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$jetski_memory$MutableDreamingConfig, 4);
  }


  /**
   * optional FuseConfig fuse = 3;
   * @override
   * @return {!jspb$jetski_memory$MutableFuseConfig|undefined}
   */
  getFuse() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$jetski_memory$MutableFuseConfig, 3);
  }


  /**
   * optional FuseConfig fuse = 3;
   * @override
   * @return {!jspb$ro.jetski_memory$ReadonlyFuseConfig}
   */
  getReadonlyFuse() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$jetski_memory$MutableFuseConfig, 3);
  }


  /**
   * optional FuseConfig fuse = 3;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$jetski_memory$MutableFuseConfig|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$jetski_memory$MutableFuseConfig') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$jetski_memory$MutableFuseConfig|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$jetski_memory$MutableFuseConfig
   */
  getMutableFuse(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$jetski_memory$MutableFuseConfig, 3, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.jetski_memory$ReadonlyFuseConfig|null|undefined} value
   * @return {!jspb$jetski_memory$MutableMemoryConfig} returns this
   */
  setFuse(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$jetski_memory$MutableFuseConfig, 3, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableMemoryConfig} returns this
   */
  clearFuse() {
    return jspb_internal_adapters.clearField(this, 3);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasFuse() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$jetski_memory$MutableFuseConfig, 3);
  }


  /**
   * optional FuseConfig fuse = 3;
   * @override
   * @return {!jspb$ro.jetski_memory$ReadonlyFuseConfig|undefined}
   */
  getFuseOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$jetski_memory$MutableFuseConfig, 3);
  }


  /**
   * optional bool disable_skills = 5;
   * @override
   * @return {boolean}
   */
  getDisableSkills() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 5);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$jetski_memory$MutableMemoryConfig} returns this
   */
  setDisableSkills(value) {
    return jspb_internal_adapters.setProto3BooleanField(this, 5, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableMemoryConfig} returns this
   */
  clearDisableSkills() {
    return jspb_internal_adapters.clearField(this, 5);
  }


  /**
   * optional string profile = 6;
   * @override
   * @return {string}
   */
  getProfile() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 6);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$jetski_memory$MutableMemoryConfig} returns this
   */
  setProfile(value) {
    return jspb_internal_adapters.setProto3StringField(this, 6, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableMemoryConfig} returns this
   */
  clearProfile() {
    return jspb_internal_adapters.clearField(this, 6);
  }


  /**
   * optional ReleaseTrack release_track = 7;
   * @override
   * @return {!jspb$e.jetski_memory$ReleaseTrack}
   */
  getReleaseTrack() {
    return /** @type {!jspb$e.jetski_memory$ReleaseTrack} */ (jspb_internal_adapters.getEnumFieldWithDefault(this, 7));
  }


  /**
   * @param {!jspb$e.jetski_memory$ReleaseTrack|null|undefined} value
   * @return {!jspb$jetski_memory$MutableMemoryConfig} returns this
   */
  setReleaseTrack(value) {
    return jspb_internal_adapters.setProto3EnumField(this, 7, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableMemoryConfig} returns this
   */
  clearReleaseTrack() {
    return jspb_internal_adapters.clearField(this, 7);
  }


};

/**
 * @override
 * @return {!jspb$jetski_memory$ImmutableMemoryConfig}
 */
jspb$jetski_memory$MutableMemoryConfig.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$jetski_memory$MutableMemoryConfig}
 */
jspb$jetski_memory$MutableMemoryConfig.prototype.clone;
/**
 * @const {function(string):!jspb$jetski_memory$MutableMemoryConfig}
 */
jspb$jetski_memory$MutableMemoryConfig.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$jetski_memory$MutableMemoryConfig));

/**
 * Returns whether the given value is an instance of jspb$jetski_memory$MutableMemoryConfig.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$jetski_memory$MutableMemoryConfig>}
 */
jspb$jetski_memory$MutableMemoryConfig.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$jetski_memory$MutableMemoryConfig));

/**
 * Object form of MemoryConfig as accepted by the `fromObject` method.
 * @typedef {{
 *  ambientMemory: (?jspb$jetski_memory$MutableAmbientInjectionConfig.ObjectFormat|undefined),
 *  dreaming: (?jspb$jetski_memory$MutableDreamingConfig.ObjectFormat|undefined),
 *  fuse: (?jspb$jetski_memory$MutableFuseConfig.ObjectFormat|undefined),
 *  disableSkills: (?boolean|undefined),
 *  profile: (?string|undefined),
 *  releaseTrack: (?number|undefined)
 * }}
 */
jspb$jetski_memory$MutableMemoryConfig.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$jetski_memory$MutableMemoryConfig.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$jetski_memory$MutableMemoryConfig.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$jetski_memory$MutableMemoryConfig.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for jetski_memory$MutableMemoryConfig.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$jetski_memory$MutableMemoryConfig.internalDoNotUse_debugOnlyProtoTypeName = "jetski_memory.MemoryConfig";
}

/**
 * @typedef {!jspb$jetski_memory$ImmutableMemoryConfig|!jspb$jetski_memory$MutableMemoryConfig}
 */
jspb$ro.jetski_memory$ReadonlyMemoryConfig = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'jetski_memory.MemoryConfig'}
   */
  jspb$jetski_memory$MutableMemoryConfig.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$jetski_memory$MutableMemoryConfig.displayName = 'proto.jetski_memory.MemoryConfig';
}
/**
 * Interface form of MemoryConfig as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  ambientMemory: (!jspb$ro.jetski_memory$ReadonlyAmbientInjectionConfig|undefined),
 *  dreaming: (!jspb$ro.jetski_memory$ReadonlyDreamingConfig|undefined),
 *  fuse: (!jspb$ro.jetski_memory$ReadonlyFuseConfig|undefined),
 *  disableSkills: (boolean|undefined),
 *  profile: (string|undefined),
 *  releaseTrack: (!jspb$e.jetski_memory$ReleaseTrack|undefined)
 * }}
 */
jspb$jetski_memory$MutableMemoryConfig.FieldsInterface;

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
 * @param {!jspb$jetski_memory$MutableMemoryConfig.FieldsInterface} record
 * @return {!jspb$jetski_memory$ImmutableMemoryConfig}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$jetski_memory$MutableMemoryConfig, ಠ_ಠ.clutz.jspb$jetski_memory$MutableMemoryConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$jetski_memory$ImmutableMemoryConfig
 */
jspb$jetski_memory$MutableMemoryConfig.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$jetski_memory$MutableMemoryConfig));

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
 * @param {!jspb$ro.jetski_memory$ReadonlyMemoryConfig} value
 * @return {!jspb$jetski_memory$MutableMemoryConfig.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.jetski_memory$ReadonlyMemoryConfig): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$jetski_memory$MutableMemoryConfig, ಠ_ಠ.clutz.jspb$jetski_memory$MutableMemoryConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$jetski_memory$MutableMemoryConfig.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$devtools_jetski_provisioning$MutableMemoryConfig;
Object.defineProperty(this, 'jspb$devtools_jetski_provisioning$MutableMemoryConfig', {
  get() { return jspb$devtools_jetski_provisioning$MutableMemoryConfig; },
  set(v) { jspb$devtools_jetski_provisioning$MutableMemoryConfig = v; },
