// source: learning/gemini/agents/projects/memory/fuse/proto/config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$jetski_memory$MutableFakeMemoryBackendConfig');
goog.provide('jspb$ro.jetski_memory$ReadonlyFakeMemoryBackendConfig');

goog.require('jspb$jetski_memory$MutableFakeLatency');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$jetski_memory$ImmutableFakeMemoryBackendConfig');
goog.requireType('jspb$r$jetski_memory$FakeMemoryBackendConfig$internalDoNotUseReader');
goog.requireType('jspb$ro.jetski_memory$ReadonlyFakeLatency');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$jetski_memory$ImmutableFakeMemoryBackendConfig>}
 * @implements {jspb$r$jetski_memory$FakeMemoryBackendConfig$internalDoNotUseReader}
 */
jspb$jetski_memory$MutableFakeMemoryBackendConfig = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional int32 port = 1;
   * @override
   * @return {number}
   */
  getPort() {
    return jspb_internal_adapters.getInt32FieldWithDefault(this, 1);
  }


  /**
   * @param {number|null|undefined} value
   * @return {!jspb$jetski_memory$MutableFakeMemoryBackendConfig} returns this
   */
  setPort(value) {
    return jspb_internal_adapters.setInt32Field(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableFakeMemoryBackendConfig} returns this
   */
  clearPort() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasPort() {
    return jspb_internal_adapters.hasInt32Field(this, 1);
  }


  /**
   * optional int32 port = 1;
   * @override
   * @return {number|undefined}
   */
  getPortOrUndefined() {
    return jspb_internal_adapters.getInt32FieldOrUndefined(this, 1);
  }


  /**
   * optional FakeLatency read_latency = 2;
   * @override
   * @return {!jspb$jetski_memory$MutableFakeLatency|undefined}
   */
  getReadLatency() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$jetski_memory$MutableFakeLatency, 2);
  }


  /**
   * optional FakeLatency read_latency = 2;
   * @override
   * @return {!jspb$ro.jetski_memory$ReadonlyFakeLatency}
   */
  getReadonlyReadLatency() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$jetski_memory$MutableFakeLatency, 2);
  }


  /**
   * optional FakeLatency read_latency = 2;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$jetski_memory$MutableFakeLatency|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$jetski_memory$MutableFakeLatency') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$jetski_memory$MutableFakeLatency|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$jetski_memory$MutableFakeLatency
   */
  getMutableReadLatency(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$jetski_memory$MutableFakeLatency, 2, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.jetski_memory$ReadonlyFakeLatency|null|undefined} value
   * @return {!jspb$jetski_memory$MutableFakeMemoryBackendConfig} returns this
   */
  setReadLatency(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$jetski_memory$MutableFakeLatency, 2, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableFakeMemoryBackendConfig} returns this
   */
  clearReadLatency() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasReadLatency() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$jetski_memory$MutableFakeLatency, 2);
  }


  /**
   * optional FakeLatency read_latency = 2;
   * @override
   * @return {!jspb$ro.jetski_memory$ReadonlyFakeLatency|undefined}
   */
  getReadLatencyOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$jetski_memory$MutableFakeLatency, 2);
  }


  /**
   * optional FakeLatency write_latency = 3;
   * @override
   * @return {!jspb$jetski_memory$MutableFakeLatency|undefined}
   */
  getWriteLatency() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$jetski_memory$MutableFakeLatency, 3);
  }


  /**
   * optional FakeLatency write_latency = 3;
   * @override
   * @return {!jspb$ro.jetski_memory$ReadonlyFakeLatency}
   */
  getReadonlyWriteLatency() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$jetski_memory$MutableFakeLatency, 3);
  }


  /**
   * optional FakeLatency write_latency = 3;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$jetski_memory$MutableFakeLatency|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$jetski_memory$MutableFakeLatency') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$jetski_memory$MutableFakeLatency|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$jetski_memory$MutableFakeLatency
   */
  getMutableWriteLatency(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$jetski_memory$MutableFakeLatency, 3, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.jetski_memory$ReadonlyFakeLatency|null|undefined} value
   * @return {!jspb$jetski_memory$MutableFakeMemoryBackendConfig} returns this
   */
  setWriteLatency(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$jetski_memory$MutableFakeLatency, 3, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableFakeMemoryBackendConfig} returns this
   */
  clearWriteLatency() {
    return jspb_internal_adapters.clearField(this, 3);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasWriteLatency() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$jetski_memory$MutableFakeLatency, 3);
  }


  /**
   * optional FakeLatency write_latency = 3;
   * @override
   * @return {!jspb$ro.jetski_memory$ReadonlyFakeLatency|undefined}
   */
  getWriteLatencyOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$jetski_memory$MutableFakeLatency, 3);
  }


  /**
   * optional FakeLatency list_latency = 4;
   * @override
   * @return {!jspb$jetski_memory$MutableFakeLatency|undefined}
   */
  getListLatency() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$jetski_memory$MutableFakeLatency, 4);
  }


  /**
   * optional FakeLatency list_latency = 4;
   * @override
   * @return {!jspb$ro.jetski_memory$ReadonlyFakeLatency}
   */
  getReadonlyListLatency() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$jetski_memory$MutableFakeLatency, 4);
  }


  /**
   * optional FakeLatency list_latency = 4;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$jetski_memory$MutableFakeLatency|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$jetski_memory$MutableFakeLatency') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$jetski_memory$MutableFakeLatency|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$jetski_memory$MutableFakeLatency
   */
  getMutableListLatency(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$jetski_memory$MutableFakeLatency, 4, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.jetski_memory$ReadonlyFakeLatency|null|undefined} value
   * @return {!jspb$jetski_memory$MutableFakeMemoryBackendConfig} returns this
   */
  setListLatency(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$jetski_memory$MutableFakeLatency, 4, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableFakeMemoryBackendConfig} returns this
   */
  clearListLatency() {
    return jspb_internal_adapters.clearField(this, 4);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasListLatency() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$jetski_memory$MutableFakeLatency, 4);
  }


  /**
   * optional FakeLatency list_latency = 4;
   * @override
   * @return {!jspb$ro.jetski_memory$ReadonlyFakeLatency|undefined}
   */
  getListLatencyOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$jetski_memory$MutableFakeLatency, 4);
  }


  /**
   * optional int32 num_initial_memories = 8;
   * @override
   * @return {number}
   */
  getNumInitialMemories() {
    return jspb_internal_adapters.getInt32FieldWithDefault(this, 8, 100);
  }


  /**
   * @param {number|null|undefined} value
   * @return {!jspb$jetski_memory$MutableFakeMemoryBackendConfig} returns this
   */
  setNumInitialMemories(value) {
    return jspb_internal_adapters.setInt32Field(this, 8, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableFakeMemoryBackendConfig} returns this
   */
  clearNumInitialMemories() {
    return jspb_internal_adapters.clearField(this, 8);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasNumInitialMemories() {
    return jspb_internal_adapters.hasInt32Field(this, 8);
  }


  /**
   * optional int32 num_initial_memories = 8;
   * @override
   * @return {number|undefined}
   */
  getNumInitialMemoriesOrUndefined() {
    return jspb_internal_adapters.getInt32FieldOrUndefined(this, 8);
  }


  /**
   * optional int64 size_mean_bytes = 9;
   * @override
   * @return {!gbigint}
   */
  getSizeMeanBytes() {
    return jspb_internal_adapters.getInt64GbigintFieldWithDefault(this, 9, jspb_internal_public_for_gencode.toGbigint(4096));
  }


  /**
   * optional int64 size_mean_bytes = 9;
   * @override
   * @return {number}
   * @deprecated unsafe int64 behavior: go/jspb-api-gotchas#int64
   */
  getSizeMeanBytes_asLegacyNumberOrString() {
    return jspb_internal_adapters.getInt64FieldWithDefault(this, 9, 4096);
  }


  /**
   * optional int64 size_mean_bytes = 9;
   * @override
   * @return {string}
   */
  getSizeMeanBytes_asString() {
    return jspb_internal_adapters.getInt64FieldWithDefault_asString(this, 9, '4096');
  }


  /**
   * @param {number|string|!gbigint|null|undefined} value
   * @return {!jspb$jetski_memory$MutableFakeMemoryBackendConfig} returns this
   */
  setSizeMeanBytes(value) {
    return jspb_internal_adapters.setInt64Field(this, 9, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableFakeMemoryBackendConfig} returns this
   */
  clearSizeMeanBytes() {
    return jspb_internal_adapters.clearField(this, 9);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasSizeMeanBytes() {
    return jspb_internal_adapters.hasInt64Field(this, 9);
  }


  /**
   * optional int64 size_mean_bytes = 9;
   * @override
   * @return {!gbigint|undefined}
   */
  getSizeMeanBytesOrUndefined() {
    return jspb_internal_adapters.getInt64GbigintFieldOrUndefined(this, 9);
  }


  /**
   * optional int64 size_mean_bytes = 9;
   * @override
   * @return {number|undefined}
   * @deprecated unsafe int64 behavior: go/jspb-api-gotchas#int64
   */
  getSizeMeanBytesOrUndefined_asLegacyNumberOrString() {
    return jspb_internal_adapters.getInt64FieldOrUndefined(this, 9);
  }


  /**
   * optional int64 size_mean_bytes = 9;
   * @override
   * @return {string|undefined}
   */
  getSizeMeanBytesOrUndefined_asString() {
    return jspb_internal_adapters.getInt64FieldOrUndefined_asString(this, 9);
  }


  /**
   * optional int64 size_stddev_bytes = 10;
   * @override
   * @return {!gbigint}
   */
  getSizeStddevBytes() {
    return jspb_internal_adapters.getInt64GbigintFieldWithDefault(this, 10, jspb_internal_public_for_gencode.toGbigint(1024));
  }


  /**
   * optional int64 size_stddev_bytes = 10;
   * @override
   * @return {number}
   * @deprecated unsafe int64 behavior: go/jspb-api-gotchas#int64
   */
  getSizeStddevBytes_asLegacyNumberOrString() {
    return jspb_internal_adapters.getInt64FieldWithDefault(this, 10, 1024);
  }


  /**
   * optional int64 size_stddev_bytes = 10;
   * @override
   * @return {string}
   */
  getSizeStddevBytes_asString() {
    return jspb_internal_adapters.getInt64FieldWithDefault_asString(this, 10, '1024');
  }


  /**
   * @param {number|string|!gbigint|null|undefined} value
   * @return {!jspb$jetski_memory$MutableFakeMemoryBackendConfig} returns this
   */
  setSizeStddevBytes(value) {
    return jspb_internal_adapters.setInt64Field(this, 10, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableFakeMemoryBackendConfig} returns this
   */
  clearSizeStddevBytes() {
    return jspb_internal_adapters.clearField(this, 10);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasSizeStddevBytes() {
    return jspb_internal_adapters.hasInt64Field(this, 10);
  }


  /**
   * optional int64 size_stddev_bytes = 10;
   * @override
   * @return {!gbigint|undefined}
   */
  getSizeStddevBytesOrUndefined() {
    return jspb_internal_adapters.getInt64GbigintFieldOrUndefined(this, 10);
  }


  /**
   * optional int64 size_stddev_bytes = 10;
   * @override
   * @return {number|undefined}
   * @deprecated unsafe int64 behavior: go/jspb-api-gotchas#int64
   */
  getSizeStddevBytesOrUndefined_asLegacyNumberOrString() {
    return jspb_internal_adapters.getInt64FieldOrUndefined(this, 10);
  }


  /**
   * optional int64 size_stddev_bytes = 10;
   * @override
   * @return {string|undefined}
   */
  getSizeStddevBytesOrUndefined_asString() {
    return jspb_internal_adapters.getInt64FieldOrUndefined_asString(this, 10);
  }


  /**
   * optional int64 random_seed = 11;
   * @override
   * @return {!gbigint}
   */
  getRandomSeed() {
    return jspb_internal_adapters.getInt64GbigintFieldWithDefault(this, 11);
  }


  /**
   * optional int64 random_seed = 11;
   * @override
   * @return {number}
   * @deprecated unsafe int64 behavior: go/jspb-api-gotchas#int64
   */
  getRandomSeed_asLegacyNumberOrString() {
    return jspb_internal_adapters.getInt64FieldWithDefault(this, 11);
  }


  /**
   * optional int64 random_seed = 11;
   * @override
   * @return {string}
   */
  getRandomSeed_asString() {
    return jspb_internal_adapters.getInt64FieldWithDefault_asString(this, 11);
  }


  /**
   * @param {number|string|!gbigint|null|undefined} value
   * @return {!jspb$jetski_memory$MutableFakeMemoryBackendConfig} returns this
   */
  setRandomSeed(value) {
    return jspb_internal_adapters.setInt64Field(this, 11, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableFakeMemoryBackendConfig} returns this
   */
  clearRandomSeed() {
    return jspb_internal_adapters.clearField(this, 11);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasRandomSeed() {
    return jspb_internal_adapters.hasInt64Field(this, 11);
  }


  /**
   * optional int64 random_seed = 11;
   * @override
   * @return {!gbigint|undefined}
   */
  getRandomSeedOrUndefined() {
    return jspb_internal_adapters.getInt64GbigintFieldOrUndefined(this, 11);
  }


  /**
   * optional int64 random_seed = 11;
   * @override
   * @return {number|undefined}
   * @deprecated unsafe int64 behavior: go/jspb-api-gotchas#int64
   */
  getRandomSeedOrUndefined_asLegacyNumberOrString() {
    return jspb_internal_adapters.getInt64FieldOrUndefined(this, 11);
  }


  /**
   * optional int64 random_seed = 11;
   * @override
   * @return {string|undefined}
   */
  getRandomSeedOrUndefined_asString() {
    return jspb_internal_adapters.getInt64FieldOrUndefined_asString(this, 11);
  }


};

/**
 * @override
 * @return {!jspb$jetski_memory$ImmutableFakeMemoryBackendConfig}
 */
jspb$jetski_memory$MutableFakeMemoryBackendConfig.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$jetski_memory$MutableFakeMemoryBackendConfig}
 */
jspb$jetski_memory$MutableFakeMemoryBackendConfig.prototype.clone;
/**
 * @const {function(string):!jspb$jetski_memory$MutableFakeMemoryBackendConfig}
 */
jspb$jetski_memory$MutableFakeMemoryBackendConfig.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$jetski_memory$MutableFakeMemoryBackendConfig));

/**
 * Returns whether the given value is an instance of jspb$jetski_memory$MutableFakeMemoryBackendConfig.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$jetski_memory$MutableFakeMemoryBackendConfig>}
 */
jspb$jetski_memory$MutableFakeMemoryBackendConfig.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$jetski_memory$MutableFakeMemoryBackendConfig));

/**
 * Object form of FakeMemoryBackendConfig as accepted by the `fromObject` method.
 * @typedef {{
 *  port: (?number|undefined),
 *  readLatency: (?jspb$jetski_memory$MutableFakeLatency.ObjectFormat|undefined),
 *  writeLatency: (?jspb$jetski_memory$MutableFakeLatency.ObjectFormat|undefined),
 *  listLatency: (?jspb$jetski_memory$MutableFakeLatency.ObjectFormat|undefined),
 *  numInitialMemories: (?number|undefined),
 *  sizeMeanBytes: (?number|string|undefined),
 *  sizeStddevBytes: (?number|string|undefined),
 *  randomSeed: (?number|string|undefined)
 * }}
 */
jspb$jetski_memory$MutableFakeMemoryBackendConfig.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$jetski_memory$MutableFakeMemoryBackendConfig.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$jetski_memory$MutableFakeMemoryBackendConfig.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$jetski_memory$MutableFakeMemoryBackendConfig.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for jetski_memory$MutableFakeMemoryBackendConfig.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$jetski_memory$MutableFakeMemoryBackendConfig.internalDoNotUse_debugOnlyProtoTypeName = "jetski_memory.FakeMemoryBackendConfig";
}

/**
 * @typedef {!jspb$jetski_memory$ImmutableFakeMemoryBackendConfig|!jspb$jetski_memory$MutableFakeMemoryBackendConfig}
 */
jspb$ro.jetski_memory$ReadonlyFakeMemoryBackendConfig = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'jetski_memory.FakeMemoryBackendConfig'}
   */
  jspb$jetski_memory$MutableFakeMemoryBackendConfig.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$jetski_memory$MutableFakeMemoryBackendConfig.displayName = 'proto.jetski_memory.FakeMemoryBackendConfig';
}
/**
 * Interface form of FakeMemoryBackendConfig as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  port: (number|undefined),
 *  readLatency: (!jspb$ro.jetski_memory$ReadonlyFakeLatency|undefined),
 *  writeLatency: (!jspb$ro.jetski_memory$ReadonlyFakeLatency|undefined),
 *  listLatency: (!jspb$ro.jetski_memory$ReadonlyFakeLatency|undefined),
 *  numInitialMemories: (number|undefined),
 *  sizeMeanBytes: (!gbigint|undefined),
 *  sizeMeanBytes_asLegacyNumberOrString: (number|string|undefined),
 *  sizeStddevBytes: (!gbigint|undefined),
 *  sizeStddevBytes_asLegacyNumberOrString: (number|string|undefined),
 *  randomSeed: (!gbigint|undefined),
 *  randomSeed_asLegacyNumberOrString: (number|string|undefined)
 * }}
 */
jspb$jetski_memory$MutableFakeMemoryBackendConfig.FieldsInterface;

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
 * @param {!jspb$jetski_memory$MutableFakeMemoryBackendConfig.FieldsInterface} record
 * @return {!jspb$jetski_memory$ImmutableFakeMemoryBackendConfig}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$jetski_memory$MutableFakeMemoryBackendConfig, ಠ_ಠ.clutz.jspb$jetski_memory$MutableFakeMemoryBackendConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$jetski_memory$ImmutableFakeMemoryBackendConfig
 */
jspb$jetski_memory$MutableFakeMemoryBackendConfig.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$jetski_memory$MutableFakeMemoryBackendConfig));

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
 * @param {!jspb$ro.jetski_memory$ReadonlyFakeMemoryBackendConfig} value
 * @return {!jspb$jetski_memory$MutableFakeMemoryBackendConfig.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.jetski_memory$ReadonlyFakeMemoryBackendConfig): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$jetski_memory$MutableFakeMemoryBackendConfig, ಠ_ಠ.clutz.jspb$jetski_memory$MutableFakeMemoryBackendConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$jetski_memory$MutableFakeMemoryBackendConfig.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$jetski_memory$MutableIpcProxyConfig;
Object.defineProperty(this, 'jspb$jetski_memory$MutableIpcProxyConfig', {
  get() { return jspb$jetski_memory$MutableIpcProxyConfig; },
  set(v) { jspb$jetski_memory$MutableIpcProxyConfig = v; },
