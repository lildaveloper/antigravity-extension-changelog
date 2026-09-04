// source: learning/gemini/agents/projects/memory/fuse/proto/config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$jetski_memory$MutableMemoryMountConfig');
goog.provide('jspb$ro.jetski_memory$ReadonlyMemoryMountConfig');

goog.require('jspb$google$protobuf$MutableDuration');
goog.require('jspb$jetski_memory$MutableDumboBackendConfig');
goog.require('jspb$jetski_memory$MutableFakeMemoryBackendConfig');
goog.require('jspb$jetski_memory$MutableSkillsBackendConfig');
goog.require('jspb$jetski_memory$MutableSmithBackendConfig');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$e.jetski_memory$MemoryMountConfig$BackendConfigCase');
goog.requireType('jspb$jetski_memory$ImmutableMemoryMountConfig');
goog.requireType('jspb$r$jetski_memory$MemoryMountConfig$internalDoNotUseReader');
goog.requireType('jspb$ro.google$protobuf$ReadonlyDuration');
goog.requireType('jspb$ro.jetski_memory$ReadonlyDumboBackendConfig');
goog.requireType('jspb$ro.jetski_memory$ReadonlyFakeMemoryBackendConfig');
goog.requireType('jspb$ro.jetski_memory$ReadonlySkillsBackendConfig');
goog.requireType('jspb$ro.jetski_memory$ReadonlySmithBackendConfig');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$jetski_memory$ImmutableMemoryMountConfig>}
 * @implements {jspb$r$jetski_memory$MemoryMountConfig$internalDoNotUseReader}
 */
jspb$jetski_memory$MutableMemoryMountConfig = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * @override
   * @return {!jspb$e.jetski_memory$MemoryMountConfig$BackendConfigCase}
   */
  getBackendConfigCase() {
    return /** @type {!jspb$e.jetski_memory$MemoryMountConfig$BackendConfigCase} */(jspb_internal_adapters.computeOneofCase(this, jspb$jetski_memory$MutableMemoryMountConfig.oneofGroup_backend_config_));
  }


  /**
   * @return {!jspb$jetski_memory$MutableMemoryMountConfig}
   */
  clearBackendConfig() {
    return jspb_internal_adapters.clearAllFieldsInOneof(this, jspb$jetski_memory$MutableMemoryMountConfig.oneofGroup_backend_config_);
  }


  /**
   * optional SmithBackendConfig smith = 1;
   * @override
   * @return {!jspb$jetski_memory$MutableSmithBackendConfig|undefined}
   * @deprecated
   */
  getSmith() {
    return jspb_internal_adapters.getOneofWrapperFieldOrUndefined(this, jspb$jetski_memory$MutableSmithBackendConfig, 1, jspb$jetski_memory$MutableMemoryMountConfig.oneofGroup_backend_config_);
  }


  /**
   * optional SmithBackendConfig smith = 1;
   * @override
   * @return {!jspb$ro.jetski_memory$ReadonlySmithBackendConfig}
   * @deprecated
   */
  getReadonlySmith() {
    return jspb_internal_adapters.getReadonlyOneofWrapperField(this, jspb$jetski_memory$MutableSmithBackendConfig, 1, jspb$jetski_memory$MutableMemoryMountConfig.oneofGroup_backend_config_);
  }


  /**
   * optional SmithBackendConfig smith = 1;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$jetski_memory$MutableSmithBackendConfig|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$jetski_memory$MutableSmithBackendConfig') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$jetski_memory$MutableSmithBackendConfig|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$jetski_memory$MutableSmithBackendConfig
   * @deprecated
   */
  getMutableSmith(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableOneofWrapperField(this, jspb$jetski_memory$MutableSmithBackendConfig, 1, jspb$jetski_memory$MutableMemoryMountConfig.oneofGroup_backend_config_, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.jetski_memory$ReadonlySmithBackendConfig|null|undefined} value
   * @return {!jspb$jetski_memory$MutableMemoryMountConfig} returns this
   * @deprecated
   */
  setSmith(value) {
    return jspb_internal_adapters.setOneofWrapperField(this, jspb$jetski_memory$MutableSmithBackendConfig, 1, jspb$jetski_memory$MutableMemoryMountConfig.oneofGroup_backend_config_, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableMemoryMountConfig} returns this
   * @deprecated
   */
  clearSmith() {
    return jspb_internal_adapters.clearOneofField(this, 1, jspb$jetski_memory$MutableMemoryMountConfig.oneofGroup_backend_config_);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   * @deprecated
   */
  hasSmith() {
    return jspb_internal_adapters.hasOneofWrapperField(this, jspb$jetski_memory$MutableSmithBackendConfig, 1, jspb$jetski_memory$MutableMemoryMountConfig.oneofGroup_backend_config_);
  }


  /**
   * optional SmithBackendConfig smith = 1;
   * @override
   * @return {!jspb$ro.jetski_memory$ReadonlySmithBackendConfig|undefined}
   * @deprecated
   */
  getSmithOrUndefined() {
    return jspb_internal_adapters.getReadonlyOneofWrapperFieldOrUndefined(this, jspb$jetski_memory$MutableSmithBackendConfig, 1, jspb$jetski_memory$MutableMemoryMountConfig.oneofGroup_backend_config_);
  }


  /**
   * optional DumboBackendConfig dumbo = 2;
   * @override
   * @return {!jspb$jetski_memory$MutableDumboBackendConfig|undefined}
   */
  getDumbo() {
    return jspb_internal_adapters.getOneofWrapperFieldOrUndefined(this, jspb$jetski_memory$MutableDumboBackendConfig, 2, jspb$jetski_memory$MutableMemoryMountConfig.oneofGroup_backend_config_);
  }


  /**
   * optional DumboBackendConfig dumbo = 2;
   * @override
   * @return {!jspb$ro.jetski_memory$ReadonlyDumboBackendConfig}
   */
  getReadonlyDumbo() {
    return jspb_internal_adapters.getReadonlyOneofWrapperField(this, jspb$jetski_memory$MutableDumboBackendConfig, 2, jspb$jetski_memory$MutableMemoryMountConfig.oneofGroup_backend_config_);
  }


  /**
   * optional DumboBackendConfig dumbo = 2;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$jetski_memory$MutableDumboBackendConfig|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$jetski_memory$MutableDumboBackendConfig') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$jetski_memory$MutableDumboBackendConfig|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$jetski_memory$MutableDumboBackendConfig
   */
  getMutableDumbo(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableOneofWrapperField(this, jspb$jetski_memory$MutableDumboBackendConfig, 2, jspb$jetski_memory$MutableMemoryMountConfig.oneofGroup_backend_config_, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.jetski_memory$ReadonlyDumboBackendConfig|null|undefined} value
   * @return {!jspb$jetski_memory$MutableMemoryMountConfig} returns this
   */
  setDumbo(value) {
    return jspb_internal_adapters.setOneofWrapperField(this, jspb$jetski_memory$MutableDumboBackendConfig, 2, jspb$jetski_memory$MutableMemoryMountConfig.oneofGroup_backend_config_, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableMemoryMountConfig} returns this
   */
  clearDumbo() {
    return jspb_internal_adapters.clearOneofField(this, 2, jspb$jetski_memory$MutableMemoryMountConfig.oneofGroup_backend_config_);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasDumbo() {
    return jspb_internal_adapters.hasOneofWrapperField(this, jspb$jetski_memory$MutableDumboBackendConfig, 2, jspb$jetski_memory$MutableMemoryMountConfig.oneofGroup_backend_config_);
  }


  /**
   * optional DumboBackendConfig dumbo = 2;
   * @override
   * @return {!jspb$ro.jetski_memory$ReadonlyDumboBackendConfig|undefined}
   */
  getDumboOrUndefined() {
    return jspb_internal_adapters.getReadonlyOneofWrapperFieldOrUndefined(this, jspb$jetski_memory$MutableDumboBackendConfig, 2, jspb$jetski_memory$MutableMemoryMountConfig.oneofGroup_backend_config_);
  }


  /**
   * optional FakeMemoryBackendConfig fake = 3;
   * @override
   * @return {!jspb$jetski_memory$MutableFakeMemoryBackendConfig|undefined}
   */
  getFake() {
    return jspb_internal_adapters.getOneofWrapperFieldOrUndefined(this, jspb$jetski_memory$MutableFakeMemoryBackendConfig, 3, jspb$jetski_memory$MutableMemoryMountConfig.oneofGroup_backend_config_);
  }


  /**
   * optional FakeMemoryBackendConfig fake = 3;
   * @override
   * @return {!jspb$ro.jetski_memory$ReadonlyFakeMemoryBackendConfig}
   */
  getReadonlyFake() {
    return jspb_internal_adapters.getReadonlyOneofWrapperField(this, jspb$jetski_memory$MutableFakeMemoryBackendConfig, 3, jspb$jetski_memory$MutableMemoryMountConfig.oneofGroup_backend_config_);
  }


  /**
   * optional FakeMemoryBackendConfig fake = 3;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$jetski_memory$MutableFakeMemoryBackendConfig|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$jetski_memory$MutableFakeMemoryBackendConfig') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$jetski_memory$MutableFakeMemoryBackendConfig|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$jetski_memory$MutableFakeMemoryBackendConfig
   */
  getMutableFake(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableOneofWrapperField(this, jspb$jetski_memory$MutableFakeMemoryBackendConfig, 3, jspb$jetski_memory$MutableMemoryMountConfig.oneofGroup_backend_config_, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.jetski_memory$ReadonlyFakeMemoryBackendConfig|null|undefined} value
   * @return {!jspb$jetski_memory$MutableMemoryMountConfig} returns this
   */
  setFake(value) {
    return jspb_internal_adapters.setOneofWrapperField(this, jspb$jetski_memory$MutableFakeMemoryBackendConfig, 3, jspb$jetski_memory$MutableMemoryMountConfig.oneofGroup_backend_config_, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableMemoryMountConfig} returns this
   */
  clearFake() {
    return jspb_internal_adapters.clearOneofField(this, 3, jspb$jetski_memory$MutableMemoryMountConfig.oneofGroup_backend_config_);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasFake() {
    return jspb_internal_adapters.hasOneofWrapperField(this, jspb$jetski_memory$MutableFakeMemoryBackendConfig, 3, jspb$jetski_memory$MutableMemoryMountConfig.oneofGroup_backend_config_);
  }


  /**
   * optional FakeMemoryBackendConfig fake = 3;
   * @override
   * @return {!jspb$ro.jetski_memory$ReadonlyFakeMemoryBackendConfig|undefined}
   */
  getFakeOrUndefined() {
    return jspb_internal_adapters.getReadonlyOneofWrapperFieldOrUndefined(this, jspb$jetski_memory$MutableFakeMemoryBackendConfig, 3, jspb$jetski_memory$MutableMemoryMountConfig.oneofGroup_backend_config_);
  }


  /**
   * optional SkillsBackendConfig skills = 5;
   * @override
   * @return {!jspb$jetski_memory$MutableSkillsBackendConfig|undefined}
   */
  getSkills() {
    return jspb_internal_adapters.getOneofWrapperFieldOrUndefined(this, jspb$jetski_memory$MutableSkillsBackendConfig, 5, jspb$jetski_memory$MutableMemoryMountConfig.oneofGroup_backend_config_);
  }


  /**
   * optional SkillsBackendConfig skills = 5;
   * @override
   * @return {!jspb$ro.jetski_memory$ReadonlySkillsBackendConfig}
   */
  getReadonlySkills() {
    return jspb_internal_adapters.getReadonlyOneofWrapperField(this, jspb$jetski_memory$MutableSkillsBackendConfig, 5, jspb$jetski_memory$MutableMemoryMountConfig.oneofGroup_backend_config_);
  }


  /**
   * optional SkillsBackendConfig skills = 5;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$jetski_memory$MutableSkillsBackendConfig|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$jetski_memory$MutableSkillsBackendConfig') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$jetski_memory$MutableSkillsBackendConfig|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$jetski_memory$MutableSkillsBackendConfig
   */
  getMutableSkills(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableOneofWrapperField(this, jspb$jetski_memory$MutableSkillsBackendConfig, 5, jspb$jetski_memory$MutableMemoryMountConfig.oneofGroup_backend_config_, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.jetski_memory$ReadonlySkillsBackendConfig|null|undefined} value
   * @return {!jspb$jetski_memory$MutableMemoryMountConfig} returns this
   */
  setSkills(value) {
    return jspb_internal_adapters.setOneofWrapperField(this, jspb$jetski_memory$MutableSkillsBackendConfig, 5, jspb$jetski_memory$MutableMemoryMountConfig.oneofGroup_backend_config_, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableMemoryMountConfig} returns this
   */
  clearSkills() {
    return jspb_internal_adapters.clearOneofField(this, 5, jspb$jetski_memory$MutableMemoryMountConfig.oneofGroup_backend_config_);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasSkills() {
    return jspb_internal_adapters.hasOneofWrapperField(this, jspb$jetski_memory$MutableSkillsBackendConfig, 5, jspb$jetski_memory$MutableMemoryMountConfig.oneofGroup_backend_config_);
  }


  /**
   * optional SkillsBackendConfig skills = 5;
   * @override
   * @return {!jspb$ro.jetski_memory$ReadonlySkillsBackendConfig|undefined}
   */
  getSkillsOrUndefined() {
    return jspb_internal_adapters.getReadonlyOneofWrapperFieldOrUndefined(this, jspb$jetski_memory$MutableSkillsBackendConfig, 5, jspb$jetski_memory$MutableMemoryMountConfig.oneofGroup_backend_config_);
  }


  /**
   * optional bool eager_cache_warming = 4;
   * @override
   * @return {boolean}
   */
  getEagerCacheWarming() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 4, true);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$jetski_memory$MutableMemoryMountConfig} returns this
   */
  setEagerCacheWarming(value) {
    return jspb_internal_adapters.setBooleanField(this, 4, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableMemoryMountConfig} returns this
   */
  clearEagerCacheWarming() {
    return jspb_internal_adapters.clearField(this, 4);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasEagerCacheWarming() {
    return jspb_internal_adapters.hasBooleanField(this, 4);
  }


  /**
   * optional bool eager_cache_warming = 4;
   * @override
   * @return {boolean|undefined}
   */
  getEagerCacheWarmingOrUndefined() {
    return jspb_internal_adapters.getBooleanFieldOrUndefined(this, 4);
  }


  /**
   * optional google.protobuf.Duration poll_changes_period = 6;
   * @override
   * @return {!jspb$google$protobuf$MutableDuration|undefined}
   */
  getPollChangesPeriod() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$google$protobuf$MutableDuration, 6);
  }


  /**
   * optional google.protobuf.Duration poll_changes_period = 6;
   * @override
   * @return {!jspb$ro.google$protobuf$ReadonlyDuration}
   */
  getReadonlyPollChangesPeriod() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$google$protobuf$MutableDuration, 6);
  }


  /**
   * optional google.protobuf.Duration poll_changes_period = 6;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$google$protobuf$MutableDuration|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$google$protobuf$MutableDuration') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$google$protobuf$MutableDuration|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$google$protobuf$MutableDuration
   */
  getMutablePollChangesPeriod(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$google$protobuf$MutableDuration, 6, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.google$protobuf$ReadonlyDuration|null|undefined} value
   * @return {!jspb$jetski_memory$MutableMemoryMountConfig} returns this
   */
  setPollChangesPeriod(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$google$protobuf$MutableDuration, 6, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableMemoryMountConfig} returns this
   */
  clearPollChangesPeriod() {
    return jspb_internal_adapters.clearField(this, 6);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasPollChangesPeriod() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$google$protobuf$MutableDuration, 6);
  }


  /**
   * optional google.protobuf.Duration poll_changes_period = 6;
   * @override
   * @return {!jspb$ro.google$protobuf$ReadonlyDuration|undefined}
   */
  getPollChangesPeriodOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$google$protobuf$MutableDuration, 6);
  }


};

/**
 * @override
 * @return {!jspb$jetski_memory$ImmutableMemoryMountConfig}
 */
jspb$jetski_memory$MutableMemoryMountConfig.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$jetski_memory$MutableMemoryMountConfig}
 */
jspb$jetski_memory$MutableMemoryMountConfig.prototype.clone;
/**
 * @const {function(string):!jspb$jetski_memory$MutableMemoryMountConfig}
 */
jspb$jetski_memory$MutableMemoryMountConfig.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$jetski_memory$MutableMemoryMountConfig));

/**
 * Returns whether the given value is an instance of jspb$jetski_memory$MutableMemoryMountConfig.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$jetski_memory$MutableMemoryMountConfig>}
 */
jspb$jetski_memory$MutableMemoryMountConfig.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$jetski_memory$MutableMemoryMountConfig));

/**
 * Object form of MemoryMountConfig as accepted by the `fromObject` method.
 * @typedef {{
 *  smith: (?jspb$jetski_memory$MutableSmithBackendConfig.ObjectFormat|undefined),
 *  dumbo: (?jspb$jetski_memory$MutableDumboBackendConfig.ObjectFormat|undefined),
 *  fake: (?jspb$jetski_memory$MutableFakeMemoryBackendConfig.ObjectFormat|undefined),
 *  skills: (?jspb$jetski_memory$MutableSkillsBackendConfig.ObjectFormat|undefined),
 *  eagerCacheWarming: (?boolean|undefined),
 *  pollChangesPeriod: (?jspb$google$protobuf$MutableDuration.ObjectFormat|undefined)
 * }}
 */
jspb$jetski_memory$MutableMemoryMountConfig.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$jetski_memory$MutableMemoryMountConfig.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$jetski_memory$MutableMemoryMountConfig.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$jetski_memory$MutableMemoryMountConfig.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for jetski_memory$MutableMemoryMountConfig.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$jetski_memory$MutableMemoryMountConfig.internalDoNotUse_debugOnlyProtoTypeName = "jetski_memory.MemoryMountConfig";
}

/**
 * @typedef {!jspb$jetski_memory$ImmutableMemoryMountConfig|!jspb$jetski_memory$MutableMemoryMountConfig}
 */
jspb$ro.jetski_memory$ReadonlyMemoryMountConfig = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'jetski_memory.MemoryMountConfig'}
   */
  jspb$jetski_memory$MutableMemoryMountConfig.prototype.internalDoNotUse_annotations;
}
/**
 * Oneof group definition.
 * @private {!ReadonlyArray<number>}
 * @const
 * @nodts
 */
jspb$jetski_memory$MutableMemoryMountConfig.oneofGroup_backend_config_ = [1,2,3,5];

if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$jetski_memory$MutableMemoryMountConfig.displayName = 'proto.jetski_memory.MemoryMountConfig';
}
/**
 * Interface form of MemoryMountConfig as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  smith: (!jspb$ro.jetski_memory$ReadonlySmithBackendConfig|undefined),
 *  dumbo: (!jspb$ro.jetski_memory$ReadonlyDumboBackendConfig|undefined),
 *  fake: (!jspb$ro.jetski_memory$ReadonlyFakeMemoryBackendConfig|undefined),
 *  skills: (!jspb$ro.jetski_memory$ReadonlySkillsBackendConfig|undefined),
 *  eagerCacheWarming: (boolean|undefined),
 *  pollChangesPeriod: (!jspb$ro.google$protobuf$ReadonlyDuration|undefined)
 * }}
 */
jspb$jetski_memory$MutableMemoryMountConfig.FieldsInterface;

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
 * @param {!jspb$jetski_memory$MutableMemoryMountConfig.FieldsInterface} record
 * @return {!jspb$jetski_memory$ImmutableMemoryMountConfig}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$jetski_memory$MutableMemoryMountConfig, ಠ_ಠ.clutz.jspb$jetski_memory$MutableMemoryMountConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$jetski_memory$ImmutableMemoryMountConfig
 */
jspb$jetski_memory$MutableMemoryMountConfig.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$jetski_memory$MutableMemoryMountConfig));

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
 * @param {!jspb$ro.jetski_memory$ReadonlyMemoryMountConfig} value
 * @return {!jspb$jetski_memory$MutableMemoryMountConfig.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.jetski_memory$ReadonlyMemoryMountConfig): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$jetski_memory$MutableMemoryMountConfig, ಠ_ಠ.clutz.jspb$jetski_memory$MutableMemoryMountConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$jetski_memory$MutableMemoryMountConfig.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$jetski_memory$MutableFuseConfig;
Object.defineProperty(this, 'jspb$jetski_memory$MutableFuseConfig', {
  get() { return jspb$jetski_memory$MutableFuseConfig; },
  set(v) { jspb$jetski_memory$MutableFuseConfig = v; },
