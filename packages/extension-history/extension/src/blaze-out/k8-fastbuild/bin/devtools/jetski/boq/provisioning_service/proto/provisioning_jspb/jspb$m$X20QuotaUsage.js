// source: devtools/jetski/boq/provisioning_service/proto/provisioning.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$devtools_jetski_provisioning$MutableX20QuotaUsage');
goog.provide('jspb$ro.devtools_jetski_provisioning$ReadonlyX20QuotaUsage');

goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$devtools_jetski_provisioning$ImmutableX20QuotaUsage');
goog.requireType('jspb$r$devtools_jetski_provisioning$X20QuotaUsage$internalDoNotUseReader');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$devtools_jetski_provisioning$ImmutableX20QuotaUsage>}
 * @implements {jspb$r$devtools_jetski_provisioning$X20QuotaUsage$internalDoNotUseReader}
 */
jspb$devtools_jetski_provisioning$MutableX20QuotaUsage = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional string quota_path = 1;
   * @override
   * @return {string}
   */
  getQuotaPath() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 1);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableX20QuotaUsage} returns this
   */
  setQuotaPath(value) {
    return jspb_internal_adapters.setStringField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableX20QuotaUsage} returns this
   */
  clearQuotaPath() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasQuotaPath() {
    return jspb_internal_adapters.hasStringField(this, 1);
  }


  /**
   * optional string quota_path = 1;
   * @override
   * @return {string|undefined}
   */
  getQuotaPathOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 1);
  }


  /**
   * optional int64 used_mbytes = 2;
   * @override
   * @return {!gbigint}
   */
  getUsedMbytes() {
    return jspb_internal_adapters.getInt64GbigintFieldWithDefault(this, 2);
  }


  /**
   * optional int64 used_mbytes = 2;
   * @override
   * @return {number}
   * @deprecated unsafe int64 behavior: go/jspb-api-gotchas#int64
   */
  getUsedMbytes_asLegacyNumberOrString() {
    return jspb_internal_adapters.getInt64FieldWithDefault(this, 2);
  }


  /**
   * optional int64 used_mbytes = 2;
   * @override
   * @return {string}
   */
  getUsedMbytes_asString() {
    return jspb_internal_adapters.getInt64FieldWithDefault_asString(this, 2);
  }


  /**
   * @param {number|string|!gbigint|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableX20QuotaUsage} returns this
   */
  setUsedMbytes(value) {
    return jspb_internal_adapters.setInt64Field(this, 2, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableX20QuotaUsage} returns this
   */
  clearUsedMbytes() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasUsedMbytes() {
    return jspb_internal_adapters.hasInt64Field(this, 2);
  }


  /**
   * optional int64 used_mbytes = 2;
   * @override
   * @return {!gbigint|undefined}
   */
  getUsedMbytesOrUndefined() {
    return jspb_internal_adapters.getInt64GbigintFieldOrUndefined(this, 2);
  }


  /**
   * optional int64 used_mbytes = 2;
   * @override
   * @return {number|undefined}
   * @deprecated unsafe int64 behavior: go/jspb-api-gotchas#int64
   */
  getUsedMbytesOrUndefined_asLegacyNumberOrString() {
    return jspb_internal_adapters.getInt64FieldOrUndefined(this, 2);
  }


  /**
   * optional int64 used_mbytes = 2;
   * @override
   * @return {string|undefined}
   */
  getUsedMbytesOrUndefined_asString() {
    return jspb_internal_adapters.getInt64FieldOrUndefined_asString(this, 2);
  }


  /**
   * optional int64 total_mbytes = 3;
   * @override
   * @return {!gbigint}
   */
  getTotalMbytes() {
    return jspb_internal_adapters.getInt64GbigintFieldWithDefault(this, 3);
  }


  /**
   * optional int64 total_mbytes = 3;
   * @override
   * @return {number}
   * @deprecated unsafe int64 behavior: go/jspb-api-gotchas#int64
   */
  getTotalMbytes_asLegacyNumberOrString() {
    return jspb_internal_adapters.getInt64FieldWithDefault(this, 3);
  }


  /**
   * optional int64 total_mbytes = 3;
   * @override
   * @return {string}
   */
  getTotalMbytes_asString() {
    return jspb_internal_adapters.getInt64FieldWithDefault_asString(this, 3);
  }


  /**
   * @param {number|string|!gbigint|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableX20QuotaUsage} returns this
   */
  setTotalMbytes(value) {
    return jspb_internal_adapters.setInt64Field(this, 3, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableX20QuotaUsage} returns this
   */
  clearTotalMbytes() {
    return jspb_internal_adapters.clearField(this, 3);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasTotalMbytes() {
    return jspb_internal_adapters.hasInt64Field(this, 3);
  }


  /**
   * optional int64 total_mbytes = 3;
   * @override
   * @return {!gbigint|undefined}
   */
  getTotalMbytesOrUndefined() {
    return jspb_internal_adapters.getInt64GbigintFieldOrUndefined(this, 3);
  }


  /**
   * optional int64 total_mbytes = 3;
   * @override
   * @return {number|undefined}
   * @deprecated unsafe int64 behavior: go/jspb-api-gotchas#int64
   */
  getTotalMbytesOrUndefined_asLegacyNumberOrString() {
    return jspb_internal_adapters.getInt64FieldOrUndefined(this, 3);
  }


  /**
   * optional int64 total_mbytes = 3;
   * @override
   * @return {string|undefined}
   */
  getTotalMbytesOrUndefined_asString() {
    return jspb_internal_adapters.getInt64FieldOrUndefined_asString(this, 3);
  }


};

/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$ImmutableX20QuotaUsage}
 */
jspb$devtools_jetski_provisioning$MutableX20QuotaUsage.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$MutableX20QuotaUsage}
 */
jspb$devtools_jetski_provisioning$MutableX20QuotaUsage.prototype.clone;
/**
 * @const {function(string):!jspb$devtools_jetski_provisioning$MutableX20QuotaUsage}
 */
jspb$devtools_jetski_provisioning$MutableX20QuotaUsage.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$devtools_jetski_provisioning$MutableX20QuotaUsage));

/**
 * Returns whether the given value is an instance of jspb$devtools_jetski_provisioning$MutableX20QuotaUsage.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$devtools_jetski_provisioning$MutableX20QuotaUsage>}
 */
jspb$devtools_jetski_provisioning$MutableX20QuotaUsage.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$devtools_jetski_provisioning$MutableX20QuotaUsage));

/**
 * Object form of X20QuotaUsage as accepted by the `fromObject` method.
 * @typedef {{
 *  quotaPath: (?string|undefined),
 *  usedMbytes: (?number|string|undefined),
 *  totalMbytes: (?number|string|undefined)
 * }}
 */
jspb$devtools_jetski_provisioning$MutableX20QuotaUsage.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$devtools_jetski_provisioning$MutableX20QuotaUsage.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$devtools_jetski_provisioning$MutableX20QuotaUsage.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$devtools_jetski_provisioning$MutableX20QuotaUsage.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for devtools_jetski_provisioning$MutableX20QuotaUsage.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$devtools_jetski_provisioning$MutableX20QuotaUsage.internalDoNotUse_debugOnlyProtoTypeName = "devtools_jetski_provisioning.X20QuotaUsage";
}

/**
 * @typedef {!jspb$devtools_jetski_provisioning$ImmutableX20QuotaUsage|!jspb$devtools_jetski_provisioning$MutableX20QuotaUsage}
 */
jspb$ro.devtools_jetski_provisioning$ReadonlyX20QuotaUsage = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'devtools_jetski_provisioning.X20QuotaUsage'}
   */
  jspb$devtools_jetski_provisioning$MutableX20QuotaUsage.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$devtools_jetski_provisioning$MutableX20QuotaUsage.displayName = 'proto.devtools_jetski_provisioning.X20QuotaUsage';
}
/**
 * Interface form of X20QuotaUsage as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  quotaPath: (string|undefined),
 *  usedMbytes: (!gbigint|undefined),
 *  usedMbytes_asLegacyNumberOrString: (number|string|undefined),
 *  totalMbytes: (!gbigint|undefined),
 *  totalMbytes_asLegacyNumberOrString: (number|string|undefined)
 * }}
 */
jspb$devtools_jetski_provisioning$MutableX20QuotaUsage.FieldsInterface;

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
 * @param {!jspb$devtools_jetski_provisioning$MutableX20QuotaUsage.FieldsInterface} record
 * @return {!jspb$devtools_jetski_provisioning$ImmutableX20QuotaUsage}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableX20QuotaUsage, ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableX20QuotaUsage.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$ImmutableX20QuotaUsage
 */
jspb$devtools_jetski_provisioning$MutableX20QuotaUsage.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$devtools_jetski_provisioning$MutableX20QuotaUsage));

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
 * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyX20QuotaUsage} value
 * @return {!jspb$devtools_jetski_provisioning$MutableX20QuotaUsage.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.devtools_jetski_provisioning$ReadonlyX20QuotaUsage): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableX20QuotaUsage, ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableX20QuotaUsage.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$devtools_jetski_provisioning$MutableX20QuotaUsage.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$b$devtools_jetski_provisioning$X20QuotaUsage;
Object.defineProperty(this, 'jspb$b$devtools_jetski_provisioning$X20QuotaUsage', {
  get() { return jspb$b$devtools_jetski_provisioning$X20QuotaUsage; },
  set(v) { jspb$b$devtools_jetski_provisioning$X20QuotaUsage = v; },
