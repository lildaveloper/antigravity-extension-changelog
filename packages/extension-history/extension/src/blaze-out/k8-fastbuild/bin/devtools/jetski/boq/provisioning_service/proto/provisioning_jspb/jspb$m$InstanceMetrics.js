// source: devtools/jetski/boq/provisioning_service/proto/provisioning.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$devtools_jetski_provisioning$MutableInstanceMetrics');
goog.provide('jspb$ro.devtools_jetski_provisioning$ReadonlyInstanceMetrics');

goog.require('jspb$devtools_jetski_provisioning$MutableX20QuotaUsage');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$devtools_jetski_provisioning$ImmutableInstanceMetrics');
goog.requireType('jspb$r$devtools_jetski_provisioning$InstanceMetrics$internalDoNotUseReader');
goog.requireType('jspb$ro.devtools_jetski_provisioning$ReadonlyX20QuotaUsage');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$devtools_jetski_provisioning$ImmutableInstanceMetrics>}
 * @implements {jspb$r$devtools_jetski_provisioning$InstanceMetrics$internalDoNotUseReader}
 */
jspb$devtools_jetski_provisioning$MutableInstanceMetrics = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional float load_average = 1;
   * @override
   * @return {number}
   */
  getLoadAverage() {
    return jspb_internal_adapters.getFloatingPointFieldWithDefault(this, 1);
  }


  /**
   * @param {number|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableInstanceMetrics} returns this
   */
  setLoadAverage(value) {
    return jspb_internal_adapters.setFloatingPointField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableInstanceMetrics} returns this
   */
  clearLoadAverage() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasLoadAverage() {
    return jspb_internal_adapters.hasFloatingPointField(this, 1);
  }


  /**
   * optional float load_average = 1;
   * @override
   * @return {number|undefined}
   */
  getLoadAverageOrUndefined() {
    return jspb_internal_adapters.getFloatingPointFieldOrUndefined(this, 1);
  }


  /**
   * optional int32 cpu_count = 6;
   * @override
   * @return {number}
   */
  getCpuCount() {
    return jspb_internal_adapters.getInt32FieldWithDefault(this, 6);
  }


  /**
   * @param {number|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableInstanceMetrics} returns this
   */
  setCpuCount(value) {
    return jspb_internal_adapters.setInt32Field(this, 6, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableInstanceMetrics} returns this
   */
  clearCpuCount() {
    return jspb_internal_adapters.clearField(this, 6);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasCpuCount() {
    return jspb_internal_adapters.hasInt32Field(this, 6);
  }


  /**
   * optional int32 cpu_count = 6;
   * @override
   * @return {number|undefined}
   */
  getCpuCountOrUndefined() {
    return jspb_internal_adapters.getInt32FieldOrUndefined(this, 6);
  }


  /**
   * optional int64 ram_used_mbytes = 2;
   * @override
   * @return {!gbigint}
   */
  getRamUsedMbytes() {
    return jspb_internal_adapters.getInt64GbigintFieldWithDefault(this, 2);
  }


  /**
   * optional int64 ram_used_mbytes = 2;
   * @override
   * @return {number}
   * @deprecated unsafe int64 behavior: go/jspb-api-gotchas#int64
   */
  getRamUsedMbytes_asLegacyNumberOrString() {
    return jspb_internal_adapters.getInt64FieldWithDefault(this, 2);
  }


  /**
   * optional int64 ram_used_mbytes = 2;
   * @override
   * @return {string}
   */
  getRamUsedMbytes_asString() {
    return jspb_internal_adapters.getInt64FieldWithDefault_asString(this, 2);
  }


  /**
   * @param {number|string|!gbigint|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableInstanceMetrics} returns this
   */
  setRamUsedMbytes(value) {
    return jspb_internal_adapters.setInt64Field(this, 2, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableInstanceMetrics} returns this
   */
  clearRamUsedMbytes() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasRamUsedMbytes() {
    return jspb_internal_adapters.hasInt64Field(this, 2);
  }


  /**
   * optional int64 ram_used_mbytes = 2;
   * @override
   * @return {!gbigint|undefined}
   */
  getRamUsedMbytesOrUndefined() {
    return jspb_internal_adapters.getInt64GbigintFieldOrUndefined(this, 2);
  }


  /**
   * optional int64 ram_used_mbytes = 2;
   * @override
   * @return {number|undefined}
   * @deprecated unsafe int64 behavior: go/jspb-api-gotchas#int64
   */
  getRamUsedMbytesOrUndefined_asLegacyNumberOrString() {
    return jspb_internal_adapters.getInt64FieldOrUndefined(this, 2);
  }


  /**
   * optional int64 ram_used_mbytes = 2;
   * @override
   * @return {string|undefined}
   */
  getRamUsedMbytesOrUndefined_asString() {
    return jspb_internal_adapters.getInt64FieldOrUndefined_asString(this, 2);
  }


  /**
   * optional int64 ram_total_mbytes = 3;
   * @override
   * @return {!gbigint}
   */
  getRamTotalMbytes() {
    return jspb_internal_adapters.getInt64GbigintFieldWithDefault(this, 3);
  }


  /**
   * optional int64 ram_total_mbytes = 3;
   * @override
   * @return {number}
   * @deprecated unsafe int64 behavior: go/jspb-api-gotchas#int64
   */
  getRamTotalMbytes_asLegacyNumberOrString() {
    return jspb_internal_adapters.getInt64FieldWithDefault(this, 3);
  }


  /**
   * optional int64 ram_total_mbytes = 3;
   * @override
   * @return {string}
   */
  getRamTotalMbytes_asString() {
    return jspb_internal_adapters.getInt64FieldWithDefault_asString(this, 3);
  }


  /**
   * @param {number|string|!gbigint|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableInstanceMetrics} returns this
   */
  setRamTotalMbytes(value) {
    return jspb_internal_adapters.setInt64Field(this, 3, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableInstanceMetrics} returns this
   */
  clearRamTotalMbytes() {
    return jspb_internal_adapters.clearField(this, 3);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasRamTotalMbytes() {
    return jspb_internal_adapters.hasInt64Field(this, 3);
  }


  /**
   * optional int64 ram_total_mbytes = 3;
   * @override
   * @return {!gbigint|undefined}
   */
  getRamTotalMbytesOrUndefined() {
    return jspb_internal_adapters.getInt64GbigintFieldOrUndefined(this, 3);
  }


  /**
   * optional int64 ram_total_mbytes = 3;
   * @override
   * @return {number|undefined}
   * @deprecated unsafe int64 behavior: go/jspb-api-gotchas#int64
   */
  getRamTotalMbytesOrUndefined_asLegacyNumberOrString() {
    return jspb_internal_adapters.getInt64FieldOrUndefined(this, 3);
  }


  /**
   * optional int64 ram_total_mbytes = 3;
   * @override
   * @return {string|undefined}
   */
  getRamTotalMbytesOrUndefined_asString() {
    return jspb_internal_adapters.getInt64FieldOrUndefined_asString(this, 3);
  }


  /**
   * optional int64 disk_used_mbytes = 4;
   * @override
   * @return {!gbigint}
   */
  getDiskUsedMbytes() {
    return jspb_internal_adapters.getInt64GbigintFieldWithDefault(this, 4);
  }


  /**
   * optional int64 disk_used_mbytes = 4;
   * @override
   * @return {number}
   * @deprecated unsafe int64 behavior: go/jspb-api-gotchas#int64
   */
  getDiskUsedMbytes_asLegacyNumberOrString() {
    return jspb_internal_adapters.getInt64FieldWithDefault(this, 4);
  }


  /**
   * optional int64 disk_used_mbytes = 4;
   * @override
   * @return {string}
   */
  getDiskUsedMbytes_asString() {
    return jspb_internal_adapters.getInt64FieldWithDefault_asString(this, 4);
  }


  /**
   * @param {number|string|!gbigint|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableInstanceMetrics} returns this
   */
  setDiskUsedMbytes(value) {
    return jspb_internal_adapters.setInt64Field(this, 4, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableInstanceMetrics} returns this
   */
  clearDiskUsedMbytes() {
    return jspb_internal_adapters.clearField(this, 4);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasDiskUsedMbytes() {
    return jspb_internal_adapters.hasInt64Field(this, 4);
  }


  /**
   * optional int64 disk_used_mbytes = 4;
   * @override
   * @return {!gbigint|undefined}
   */
  getDiskUsedMbytesOrUndefined() {
    return jspb_internal_adapters.getInt64GbigintFieldOrUndefined(this, 4);
  }


  /**
   * optional int64 disk_used_mbytes = 4;
   * @override
   * @return {number|undefined}
   * @deprecated unsafe int64 behavior: go/jspb-api-gotchas#int64
   */
  getDiskUsedMbytesOrUndefined_asLegacyNumberOrString() {
    return jspb_internal_adapters.getInt64FieldOrUndefined(this, 4);
  }


  /**
   * optional int64 disk_used_mbytes = 4;
   * @override
   * @return {string|undefined}
   */
  getDiskUsedMbytesOrUndefined_asString() {
    return jspb_internal_adapters.getInt64FieldOrUndefined_asString(this, 4);
  }


  /**
   * optional int64 disk_total_mbytes = 5;
   * @override
   * @return {!gbigint}
   */
  getDiskTotalMbytes() {
    return jspb_internal_adapters.getInt64GbigintFieldWithDefault(this, 5);
  }


  /**
   * optional int64 disk_total_mbytes = 5;
   * @override
   * @return {number}
   * @deprecated unsafe int64 behavior: go/jspb-api-gotchas#int64
   */
  getDiskTotalMbytes_asLegacyNumberOrString() {
    return jspb_internal_adapters.getInt64FieldWithDefault(this, 5);
  }


  /**
   * optional int64 disk_total_mbytes = 5;
   * @override
   * @return {string}
   */
  getDiskTotalMbytes_asString() {
    return jspb_internal_adapters.getInt64FieldWithDefault_asString(this, 5);
  }


  /**
   * @param {number|string|!gbigint|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableInstanceMetrics} returns this
   */
  setDiskTotalMbytes(value) {
    return jspb_internal_adapters.setInt64Field(this, 5, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableInstanceMetrics} returns this
   */
  clearDiskTotalMbytes() {
    return jspb_internal_adapters.clearField(this, 5);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasDiskTotalMbytes() {
    return jspb_internal_adapters.hasInt64Field(this, 5);
  }


  /**
   * optional int64 disk_total_mbytes = 5;
   * @override
   * @return {!gbigint|undefined}
   */
  getDiskTotalMbytesOrUndefined() {
    return jspb_internal_adapters.getInt64GbigintFieldOrUndefined(this, 5);
  }


  /**
   * optional int64 disk_total_mbytes = 5;
   * @override
   * @return {number|undefined}
   * @deprecated unsafe int64 behavior: go/jspb-api-gotchas#int64
   */
  getDiskTotalMbytesOrUndefined_asLegacyNumberOrString() {
    return jspb_internal_adapters.getInt64FieldOrUndefined(this, 5);
  }


  /**
   * optional int64 disk_total_mbytes = 5;
   * @override
   * @return {string|undefined}
   */
  getDiskTotalMbytesOrUndefined_asString() {
    return jspb_internal_adapters.getInt64FieldOrUndefined_asString(this, 5);
  }


  /**
   * repeated X20QuotaUsage x20_quotas = 7;
   * @param {!jspb_internal_public_for_gencode.DoNotFreezeToken=} freezeOptOut
   * @tsType (freezeOptOut: import('google3/javascript/apps/jspb/internal_public').DoNotFreezeToken): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableX20QuotaUsage[]
   * @tsType (): readonly ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableX20QuotaUsage[]
   * @override
   * @return {!ReadonlyArray<!jspb$devtools_jetski_provisioning$MutableX20QuotaUsage>}
   */
  getX20QuotasList(freezeOptOut) {
    return jspb_internal_adapters.getRepeatedWrapperField(this, jspb$devtools_jetski_provisioning$MutableX20QuotaUsage, 7, jspb_internal_adapters.getRepeatedFieldReturnType(freezeOptOut));
  }


  /**
   * repeated X20QuotaUsage x20_quotas = 7;
   * @override
   * @return {!ReadonlyArray<!jspb$ro.devtools_jetski_provisioning$ReadonlyX20QuotaUsage>}
   */
  getReadonlyX20QuotasList() {
    return jspb_internal_adapters.getReadonlyRepeatedWrapperField(this, jspb$devtools_jetski_provisioning$MutableX20QuotaUsage, 7);
  }


  /**
   * @param {!ReadonlyArray<!jspb$ro.devtools_jetski_provisioning$ReadonlyX20QuotaUsage>|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableInstanceMetrics} returns this
   */
  setX20QuotasList(value) {
    return jspb_internal_adapters.setRepeatedWrapperField(this, jspb$devtools_jetski_provisioning$MutableX20QuotaUsage, 7, value);
  }


  /**
   * Gets mutable repeated field reference.
   * @param {number} index
   * @return {!jspb$devtools_jetski_provisioning$MutableX20QuotaUsage}
   */
  getMutableX20Quotas(index) {
    return jspb_internal_adapters.getRepeatedIndexedMutableWrapper(this, 7, jspb$devtools_jetski_provisioning$MutableX20QuotaUsage, index);
  }


  /**
   * Gets readonly repeated field reference.
   * @override
   * @param {number} index
   * @return {!jspb$ro.devtools_jetski_provisioning$ReadonlyX20QuotaUsage}
   */
  getReadonlyX20Quotas(index) {
    return jspb_internal_adapters.getRepeatedIndexedReadonlyWrapper(this, 7, jspb$devtools_jetski_provisioning$MutableX20QuotaUsage, index);
  }


  /**
   * Adds repeated field and returns `this`.
   * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyX20QuotaUsage} value
   * @param {number=} index
   * @return {!jspb$devtools_jetski_provisioning$MutableInstanceMetrics} returns this
   */
  addX20Quotas(value, index) {
    return jspb_internal_adapters.addToRepeatedWrapperField(this, 7, jspb$devtools_jetski_provisioning$MutableX20QuotaUsage, value, index);
  }


  /**
   * Adds repeated field and returns newly added submessage.
   * @param {!jspb$devtools_jetski_provisioning$MutableX20QuotaUsage=} value
   * @param {number=} index
   * @return {!jspb$devtools_jetski_provisioning$MutableX20QuotaUsage} the value that was added
   */
  addAndReturnX20Quotas(value, index) {
    return jspb_internal_adapters.addAndReturnRepeatedWrapperField(this, 7, jspb$devtools_jetski_provisioning$MutableX20QuotaUsage, value, index);
  }


  /**
   * Adds multiple values to a repeated field and returns `this`.
   * @param {!Iterable<!jspb$ro.devtools_jetski_provisioning$ReadonlyX20QuotaUsage>} values
   * @return {!jspb$devtools_jetski_provisioning$MutableInstanceMetrics} returns this
   */
  addAllX20Quotas(values) {
    return jspb_internal_adapters.addAllToRepeatedWrapperField(this, 7, jspb$devtools_jetski_provisioning$MutableX20QuotaUsage, values);
  }


  /**
   * Sets repeated field value at `index` and returns `this`.
   * @param {number} index
   * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyX20QuotaUsage} value
   * @return {!jspb$devtools_jetski_provisioning$MutableInstanceMetrics} returns this
   */
  setX20Quotas(index, value) {
    return jspb_internal_adapters.setRepeatedIndexedWrapper(this, 7, jspb$devtools_jetski_provisioning$MutableX20QuotaUsage, index, value);
  }


  /**
   * Removes a value from a repeated field and returns `this`.
   * @param {number=} index defaults to the end
   * @return {!jspb$devtools_jetski_provisioning$MutableInstanceMetrics} returns this
   */
  removeX20Quotas(index) {
    return jspb_internal_adapters.removeFromRepeatedWrapperField(this, 7, jspb$devtools_jetski_provisioning$MutableX20QuotaUsage, index);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableInstanceMetrics} returns this
   */
  clearX20QuotasList() {
    return jspb_internal_adapters.clearField(this, 7);
  }


  /**
   * Returns the size of this field.
   * @override
   * @return {number}
   */
  getX20QuotasCount() {
    return jspb_internal_adapters.getRepeatedWrapperCount(this, jspb$devtools_jetski_provisioning$MutableX20QuotaUsage, 7);
  }


};

/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$ImmutableInstanceMetrics}
 */
jspb$devtools_jetski_provisioning$MutableInstanceMetrics.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$MutableInstanceMetrics}
 */
jspb$devtools_jetski_provisioning$MutableInstanceMetrics.prototype.clone;
/**
 * @const {function(string):!jspb$devtools_jetski_provisioning$MutableInstanceMetrics}
 */
jspb$devtools_jetski_provisioning$MutableInstanceMetrics.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$devtools_jetski_provisioning$MutableInstanceMetrics));

/**
 * Returns whether the given value is an instance of jspb$devtools_jetski_provisioning$MutableInstanceMetrics.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$devtools_jetski_provisioning$MutableInstanceMetrics>}
 */
jspb$devtools_jetski_provisioning$MutableInstanceMetrics.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$devtools_jetski_provisioning$MutableInstanceMetrics));

/**
 * Object form of InstanceMetrics as accepted by the `fromObject` method.
 * @typedef {{
 *  loadAverage: (?number|undefined),
 *  cpuCount: (?number|undefined),
 *  ramUsedMbytes: (?number|string|undefined),
 *  ramTotalMbytes: (?number|string|undefined),
 *  diskUsedMbytes: (?number|string|undefined),
 *  diskTotalMbytes: (?number|string|undefined),
 *  x20QuotasList: (?Array<!jspb$devtools_jetski_provisioning$MutableX20QuotaUsage.ObjectFormat>|undefined)
 * }}
 */
jspb$devtools_jetski_provisioning$MutableInstanceMetrics.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$devtools_jetski_provisioning$MutableInstanceMetrics.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$devtools_jetski_provisioning$MutableInstanceMetrics.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$devtools_jetski_provisioning$MutableInstanceMetrics.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for devtools_jetski_provisioning$MutableInstanceMetrics.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$devtools_jetski_provisioning$MutableInstanceMetrics.internalDoNotUse_debugOnlyProtoTypeName = "devtools_jetski_provisioning.InstanceMetrics";
}

/**
 * @typedef {!jspb$devtools_jetski_provisioning$ImmutableInstanceMetrics|!jspb$devtools_jetski_provisioning$MutableInstanceMetrics}
 */
jspb$ro.devtools_jetski_provisioning$ReadonlyInstanceMetrics = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'devtools_jetski_provisioning.InstanceMetrics'}
   */
  jspb$devtools_jetski_provisioning$MutableInstanceMetrics.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$devtools_jetski_provisioning$MutableInstanceMetrics.displayName = 'proto.devtools_jetski_provisioning.InstanceMetrics';
}
/**
 * Interface form of InstanceMetrics as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  loadAverage: (number|undefined),
 *  cpuCount: (number|undefined),
 *  ramUsedMbytes: (!gbigint|undefined),
 *  ramUsedMbytes_asLegacyNumberOrString: (number|string|undefined),
 *  ramTotalMbytes: (!gbigint|undefined),
 *  ramTotalMbytes_asLegacyNumberOrString: (number|string|undefined),
 *  diskUsedMbytes: (!gbigint|undefined),
 *  diskUsedMbytes_asLegacyNumberOrString: (number|string|undefined),
 *  diskTotalMbytes: (!gbigint|undefined),
 *  diskTotalMbytes_asLegacyNumberOrString: (number|string|undefined),
 *  x20QuotasList: (!ReadonlyArray<!jspb$ro.devtools_jetski_provisioning$ReadonlyX20QuotaUsage>|undefined)
 * }}
 */
jspb$devtools_jetski_provisioning$MutableInstanceMetrics.FieldsInterface;

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
 * @param {!jspb$devtools_jetski_provisioning$MutableInstanceMetrics.FieldsInterface} record
 * @return {!jspb$devtools_jetski_provisioning$ImmutableInstanceMetrics}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableInstanceMetrics, ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableInstanceMetrics.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$ImmutableInstanceMetrics
 */
jspb$devtools_jetski_provisioning$MutableInstanceMetrics.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$devtools_jetski_provisioning$MutableInstanceMetrics));

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
 * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyInstanceMetrics} value
 * @return {!jspb$devtools_jetski_provisioning$MutableInstanceMetrics.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.devtools_jetski_provisioning$ReadonlyInstanceMetrics): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableInstanceMetrics, ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableInstanceMetrics.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$devtools_jetski_provisioning$MutableInstanceMetrics.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$b$devtools_jetski_provisioning$InstanceMetrics;
Object.defineProperty(this, 'jspb$b$devtools_jetski_provisioning$InstanceMetrics', {
  get() { return jspb$b$devtools_jetski_provisioning$InstanceMetrics; },
  set(v) { jspb$b$devtools_jetski_provisioning$InstanceMetrics = v; },
