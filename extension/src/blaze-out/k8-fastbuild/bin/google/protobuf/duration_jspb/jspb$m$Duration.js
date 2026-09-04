// source: google/protobuf/duration.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$google$protobuf$MutableDuration');
goog.provide('jspb$ro.google$protobuf$ReadonlyDuration');

goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$google$protobuf$ImmutableDuration');
goog.requireType('jspb$r$google$protobuf$Duration$internalDoNotUseReader');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$google$protobuf$ImmutableDuration>}
 * @implements {jspb$r$google$protobuf$Duration$internalDoNotUseReader}
 */
jspb$google$protobuf$MutableDuration = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional int64 seconds = 1;
   * @override
   * @return {!gbigint}
   */
  getSeconds() {
    return jspb_internal_adapters.getInt64GbigintFieldWithDefault(this, 1);
  }


  /**
   * optional int64 seconds = 1;
   * @override
   * @return {number}
   * @deprecated unsafe int64 behavior: go/jspb-api-gotchas#int64
   */
  getSeconds_asLegacyNumberOrString() {
    return jspb_internal_adapters.getInt64FieldWithDefault(this, 1);
  }


  /**
   * optional int64 seconds = 1;
   * @override
   * @return {string}
   */
  getSeconds_asString() {
    return jspb_internal_adapters.getInt64FieldWithDefault_asString(this, 1);
  }


  /**
   * @param {number|string|!gbigint|null|undefined} value
   * @return {!jspb$google$protobuf$MutableDuration} returns this
   */
  setSeconds(value) {
    return jspb_internal_adapters.setProto3Int64Field(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$google$protobuf$MutableDuration} returns this
   */
  clearSeconds() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * optional int32 nanos = 2;
   * @override
   * @return {number}
   */
  getNanos() {
    return jspb_internal_adapters.getInt32FieldWithDefault(this, 2);
  }


  /**
   * @param {number|null|undefined} value
   * @return {!jspb$google$protobuf$MutableDuration} returns this
   */
  setNanos(value) {
    return jspb_internal_adapters.setProto3Int32Field(this, 2, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$google$protobuf$MutableDuration} returns this
   */
  clearNanos() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * Returns the milliseconds of this Duration with fractional nanos.
   * @override
   * @return {number}
   */
  toMillis() {
    const seconds = Number(this.getSeconds_asString());
    const nanos = this.getNanos();

    return (seconds * 1000) + (nanos / 1000000);
  }


  /**
   * Sets the value of this Duration object to be the given number of milliseconds
   * @param {number} value The milliseconds with fractional nanos to set.
   * @return {!jspb$google$protobuf$MutableDuration}
   */
  fromMillis(value) {
    if (!Number.isFinite(value)) throw new Error();
    const millis = Math.trunc(value);
    const nanos = (value - millis + (millis % 1000)) * 1e6;
    return this.setSeconds(Math.trunc(millis / 1000)).setNanos(Math.trunc(nanos));
  }
  /**
   * Factory method that returns a Duration object with value equal to
   * the given milliseconds with fractional microseconds.
   * @param {number}  value The milliseconds of this 'Duration' with fractional microseconds to set.
   * @return {!jspb$google$protobuf$MutableDuration}
   */
  static fromMillis(value) {
    return new jspb$google$protobuf$MutableDuration().fromMillis(value);
  }
};

/**
 * @override
 * @return {!jspb$google$protobuf$ImmutableDuration}
 */
jspb$google$protobuf$MutableDuration.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$google$protobuf$MutableDuration}
 */
jspb$google$protobuf$MutableDuration.prototype.clone;
/**
 * @const {function(string):!jspb$google$protobuf$MutableDuration}
 */
jspb$google$protobuf$MutableDuration.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$google$protobuf$MutableDuration));

/**
 * Returns whether the given value is an instance of jspb$google$protobuf$MutableDuration.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$google$protobuf$MutableDuration>}
 */
jspb$google$protobuf$MutableDuration.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$google$protobuf$MutableDuration));

/**
 * Object form of Duration as accepted by the `fromObject` method.
 * @typedef {{
 *  seconds: (?number|string|undefined),
 *  nanos: (?number|undefined)
 * }}
 */
jspb$google$protobuf$MutableDuration.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$google$protobuf$MutableDuration.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @return {!jspb$google$protobuf$MutableDuration.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$google$protobuf$MutableDuration.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for google$protobuf$MutableDuration.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$google$protobuf$MutableDuration.internalDoNotUse_debugOnlyProtoTypeName = "google.protobuf.Duration";
}

/**
 * @typedef {!jspb$google$protobuf$ImmutableDuration|!jspb$google$protobuf$MutableDuration}
 */
jspb$ro.google$protobuf$ReadonlyDuration = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'google.protobuf.Duration'}
   */
  jspb$google$protobuf$MutableDuration.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$google$protobuf$MutableDuration.displayName = 'proto.google.protobuf.Duration';
}
/**
 * Interface form of Duration as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  seconds: (!gbigint|undefined),
 *  seconds_asLegacyNumberOrString: (number|string|undefined),
 *  nanos: (number|undefined)
 * }}
 */
jspb$google$protobuf$MutableDuration.FieldsInterface;

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
 * @param {!jspb$google$protobuf$MutableDuration.FieldsInterface} record
 * @return {!jspb$google$protobuf$ImmutableDuration}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$google$protobuf$MutableDuration, ಠ_ಠ.clutz.jspb$google$protobuf$MutableDuration.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$google$protobuf$ImmutableDuration
 */
jspb$google$protobuf$MutableDuration.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$google$protobuf$MutableDuration));

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
 * @param {!jspb$ro.google$protobuf$ReadonlyDuration} value
 * @return {!jspb$google$protobuf$MutableDuration.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.google$protobuf$ReadonlyDuration): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$google$protobuf$MutableDuration, ಠ_ಠ.clutz.jspb$google$protobuf$MutableDuration.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$google$protobuf$MutableDuration.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$jetski_memory$MutableFakeLatency;
Object.defineProperty(this, 'jspb$jetski_memory$MutableFakeLatency', {
  get() { return jspb$jetski_memory$MutableFakeLatency; },
  set(v) { jspb$jetski_memory$MutableFakeLatency = v; },
