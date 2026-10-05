// source: google/protobuf/timestamp.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$google$protobuf$MutableTimestamp');
goog.provide('jspb$ro.google$protobuf$ReadonlyTimestamp');

goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$google$protobuf$ImmutableTimestamp');
goog.requireType('jspb$r$google$protobuf$Timestamp$internalDoNotUseReader');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$google$protobuf$ImmutableTimestamp>}
 * @implements {jspb$r$google$protobuf$Timestamp$internalDoNotUseReader}
 */
jspb$google$protobuf$MutableTimestamp = class extends jspb_internal_public_for_gencode.GeneratedMessage {
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
   * @return {!jspb$google$protobuf$MutableTimestamp} returns this
   */
  setSeconds(value) {
    return jspb_internal_adapters.setProto3Int64Field(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$google$protobuf$MutableTimestamp} returns this
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
   * @return {!jspb$google$protobuf$MutableTimestamp} returns this
   */
  setNanos(value) {
    return jspb_internal_adapters.setProto3Int32Field(this, 2, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$google$protobuf$MutableTimestamp} returns this
   */
  clearNanos() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * Returns a JavaScript 'Date' object corresponding to this Timestamp.
   * @return {!Date}
   * @override
   */
  toDate() {
    const seconds = Number(this.getSeconds_asString());
    const nanos = this.getNanos();

    return new Date((seconds * 1000) + (nanos / 1e6));
  }

  /**
   * Sets the value of this Timestamp object to be the given Date.
   * @param {!Date} value The value to set.
   * @return {!jspb$google$protobuf$MutableTimestamp}
   */
  fromDate(value) {
    return this.fromMillis(value.getTime());
  }

  /**
   * Sets the value of this Timestamp object to be the given value in milliseconds.
   * @param {number} value The value to set.
   * @return {!jspb$google$protobuf$MutableTimestamp}
   */
  fromMillis(value) {
    if (!Number.isFinite(value)) {
      value = 0;
    }
    return this.setSeconds(Math.floor(value / 1000)).setNanos(((value % 1000 + 1000) % 1000) * 1e6);
  }

  /**
   * Factory method that returns a Timestamp object with value equal to
   * the given Date.
   * @param {!Date} value The value to set.
   * @return {!jspb$google$protobuf$MutableTimestamp}
   */
  static fromDate(value) {
    const timestamp = new jspb$google$protobuf$MutableTimestamp();
    return timestamp.fromDate(value);
  }

  /**
   * Factory method that returns a Timestamp object with value equal to
   * the given milliseconds.
   * @param {number} value The value to set.
   * @return {!jspb$google$protobuf$MutableTimestamp}
   */
  static fromMillis(value) {
    const timestamp = new jspb$google$protobuf$MutableTimestamp();
    return timestamp.fromMillis(value);
  }
};

/**
 * @override
 * @return {!jspb$google$protobuf$ImmutableTimestamp}
 */
jspb$google$protobuf$MutableTimestamp.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$google$protobuf$MutableTimestamp}
 */
jspb$google$protobuf$MutableTimestamp.prototype.clone;
/**
 * @const {function(string):!jspb$google$protobuf$MutableTimestamp}
 */
jspb$google$protobuf$MutableTimestamp.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$google$protobuf$MutableTimestamp));

/**
 * Returns whether the given value is an instance of jspb$google$protobuf$MutableTimestamp.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$google$protobuf$MutableTimestamp>}
 */
jspb$google$protobuf$MutableTimestamp.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$google$protobuf$MutableTimestamp));

/**
 * Object form of Timestamp as accepted by the `fromObject` method.
 * @typedef {{
 *  seconds: (?number|string|undefined),
 *  nanos: (?number|undefined)
 * }}
 */
jspb$google$protobuf$MutableTimestamp.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$google$protobuf$MutableTimestamp.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @return {!jspb$google$protobuf$MutableTimestamp.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$google$protobuf$MutableTimestamp.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for google$protobuf$MutableTimestamp.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$google$protobuf$MutableTimestamp.internalDoNotUse_debugOnlyProtoTypeName = "google.protobuf.Timestamp";
}

/**
 * @typedef {!jspb$google$protobuf$ImmutableTimestamp|!jspb$google$protobuf$MutableTimestamp}
 */
jspb$ro.google$protobuf$ReadonlyTimestamp = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'google.protobuf.Timestamp'}
   */
  jspb$google$protobuf$MutableTimestamp.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$google$protobuf$MutableTimestamp.displayName = 'proto.google.protobuf.Timestamp';
}
/**
 * Interface form of Timestamp as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  seconds: (!gbigint|undefined),
 *  seconds_asLegacyNumberOrString: (number|string|undefined),
 *  nanos: (number|undefined)
 * }}
 */
jspb$google$protobuf$MutableTimestamp.FieldsInterface;

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
 * @param {!jspb$google$protobuf$MutableTimestamp.FieldsInterface} record
 * @return {!jspb$google$protobuf$ImmutableTimestamp}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$google$protobuf$MutableTimestamp, ಠ_ಠ.clutz.jspb$google$protobuf$MutableTimestamp.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$google$protobuf$ImmutableTimestamp
 */
jspb$google$protobuf$MutableTimestamp.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$google$protobuf$MutableTimestamp));

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
 * @param {!jspb$ro.google$protobuf$ReadonlyTimestamp} value
 * @return {!jspb$google$protobuf$MutableTimestamp.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.google$protobuf$ReadonlyTimestamp): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$google$protobuf$MutableTimestamp, ಠ_ಠ.clutz.jspb$google$protobuf$MutableTimestamp.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$google$protobuf$MutableTimestamp.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$devtools_jetski_provisioning$MutableVolumeClientConfig;
Object.defineProperty(this, 'jspb$devtools_jetski_provisioning$MutableVolumeClientConfig', {
  get() { return jspb$devtools_jetski_provisioning$MutableVolumeClientConfig; },
  set(v) { jspb$devtools_jetski_provisioning$MutableVolumeClientConfig = v; },
