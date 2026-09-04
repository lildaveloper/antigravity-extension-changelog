// source: learning/gemini/agents/projects/memory/fuse/proto/config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$jetski_memory$MutableFakeLatency');
goog.provide('jspb$ro.jetski_memory$ReadonlyFakeLatency');

goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$jetski_memory$ImmutableFakeLatency');
goog.requireType('jspb$r$jetski_memory$FakeLatency$internalDoNotUseReader');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$jetski_memory$ImmutableFakeLatency>}
 * @implements {jspb$r$jetski_memory$FakeLatency$internalDoNotUseReader}
 */
jspb$jetski_memory$MutableFakeLatency = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional double mean_ms = 1;
   * @override
   * @return {number}
   */
  getMeanMs() {
    return jspb_internal_adapters.getFloatingPointFieldWithDefault(this, 1, 50.0);
  }


  /**
   * @param {number|null|undefined} value
   * @return {!jspb$jetski_memory$MutableFakeLatency} returns this
   */
  setMeanMs(value) {
    return jspb_internal_adapters.setFloatingPointField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableFakeLatency} returns this
   */
  clearMeanMs() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasMeanMs() {
    return jspb_internal_adapters.hasFloatingPointField(this, 1);
  }


  /**
   * optional double mean_ms = 1;
   * @override
   * @return {number|undefined}
   */
  getMeanMsOrUndefined() {
    return jspb_internal_adapters.getFloatingPointFieldOrUndefined(this, 1);
  }


  /**
   * optional double stddev_ms = 2;
   * @override
   * @return {number}
   */
  getStddevMs() {
    return jspb_internal_adapters.getFloatingPointFieldWithDefault(this, 2, 10.0);
  }


  /**
   * @param {number|null|undefined} value
   * @return {!jspb$jetski_memory$MutableFakeLatency} returns this
   */
  setStddevMs(value) {
    return jspb_internal_adapters.setFloatingPointField(this, 2, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableFakeLatency} returns this
   */
  clearStddevMs() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasStddevMs() {
    return jspb_internal_adapters.hasFloatingPointField(this, 2);
  }


  /**
   * optional double stddev_ms = 2;
   * @override
   * @return {number|undefined}
   */
  getStddevMsOrUndefined() {
    return jspb_internal_adapters.getFloatingPointFieldOrUndefined(this, 2);
  }


};

/**
 * @override
 * @return {!jspb$jetski_memory$ImmutableFakeLatency}
 */
jspb$jetski_memory$MutableFakeLatency.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$jetski_memory$MutableFakeLatency}
 */
jspb$jetski_memory$MutableFakeLatency.prototype.clone;
/**
 * @const {function(string):!jspb$jetski_memory$MutableFakeLatency}
 */
jspb$jetski_memory$MutableFakeLatency.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$jetski_memory$MutableFakeLatency));

/**
 * Returns whether the given value is an instance of jspb$jetski_memory$MutableFakeLatency.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$jetski_memory$MutableFakeLatency>}
 */
jspb$jetski_memory$MutableFakeLatency.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$jetski_memory$MutableFakeLatency));

/**
 * Object form of FakeLatency as accepted by the `fromObject` method.
 * @typedef {{
 *  meanMs: (?number|undefined),
 *  stddevMs: (?number|undefined)
 * }}
 */
jspb$jetski_memory$MutableFakeLatency.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$jetski_memory$MutableFakeLatency.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$jetski_memory$MutableFakeLatency.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$jetski_memory$MutableFakeLatency.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for jetski_memory$MutableFakeLatency.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$jetski_memory$MutableFakeLatency.internalDoNotUse_debugOnlyProtoTypeName = "jetski_memory.FakeLatency";
}

/**
 * @typedef {!jspb$jetski_memory$ImmutableFakeLatency|!jspb$jetski_memory$MutableFakeLatency}
 */
jspb$ro.jetski_memory$ReadonlyFakeLatency = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'jetski_memory.FakeLatency'}
   */
  jspb$jetski_memory$MutableFakeLatency.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$jetski_memory$MutableFakeLatency.displayName = 'proto.jetski_memory.FakeLatency';
}
/**
 * Interface form of FakeLatency as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  meanMs: (number|undefined),
 *  stddevMs: (number|undefined)
 * }}
 */
jspb$jetski_memory$MutableFakeLatency.FieldsInterface;

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
 * @param {!jspb$jetski_memory$MutableFakeLatency.FieldsInterface} record
 * @return {!jspb$jetski_memory$ImmutableFakeLatency}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$jetski_memory$MutableFakeLatency, ಠ_ಠ.clutz.jspb$jetski_memory$MutableFakeLatency.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$jetski_memory$ImmutableFakeLatency
 */
jspb$jetski_memory$MutableFakeLatency.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$jetski_memory$MutableFakeLatency));

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
 * @param {!jspb$ro.jetski_memory$ReadonlyFakeLatency} value
 * @return {!jspb$jetski_memory$MutableFakeLatency.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.jetski_memory$ReadonlyFakeLatency): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$jetski_memory$MutableFakeLatency, ಠ_ಠ.clutz.jspb$jetski_memory$MutableFakeLatency.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$jetski_memory$MutableFakeLatency.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$jetski_memory$MutableFakeMemoryBackendConfig;
Object.defineProperty(this, 'jspb$jetski_memory$MutableFakeMemoryBackendConfig', {
  get() { return jspb$jetski_memory$MutableFakeMemoryBackendConfig; },
  set(v) { jspb$jetski_memory$MutableFakeMemoryBackendConfig = v; },
