// source: google/rpc/status.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$google$rpc$MutableStatus');
goog.provide('jspb$ro.google$rpc$ReadonlyStatus');

goog.require('jspb$google$protobuf$MutableAny');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$google$rpc$ImmutableStatus');
goog.requireType('jspb$r$google$rpc$Status$internalDoNotUseReader');
goog.requireType('jspb$ro.google$protobuf$ReadonlyAny');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$google$rpc$ImmutableStatus>}
 * @implements {jspb$r$google$rpc$Status$internalDoNotUseReader}
 */
jspb$google$rpc$MutableStatus = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional int32 code = 1;
   * @override
   * @return {number}
   */
  getCode() {
    return jspb_internal_adapters.getInt32FieldWithDefault(this, 1);
  }


  /**
   * @param {number|null|undefined} value
   * @return {!jspb$google$rpc$MutableStatus} returns this
   */
  setCode(value) {
    return jspb_internal_adapters.setProto3Int32Field(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$google$rpc$MutableStatus} returns this
   */
  clearCode() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * optional string message = 2;
   * @override
   * @return {string}
   */
  getMessage() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 2);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$google$rpc$MutableStatus} returns this
   */
  setMessage(value) {
    return jspb_internal_adapters.setProto3StringField(this, 2, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$google$rpc$MutableStatus} returns this
   */
  clearMessage() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * repeated google.protobuf.Any details = 3;
   * @param {!jspb_internal_public_for_gencode.DoNotFreezeToken=} freezeOptOut
   * @tsType (freezeOptOut: import('google3/javascript/apps/jspb/internal_public').DoNotFreezeToken): ಠ_ಠ.clutz.jspb$google$protobuf$MutableAny[]
   * @tsType (): readonly ಠ_ಠ.clutz.jspb$google$protobuf$MutableAny[]
   * @override
   * @return {!ReadonlyArray<!jspb$google$protobuf$MutableAny>}
   */
  getDetailsList(freezeOptOut) {
    return jspb_internal_adapters.getRepeatedWrapperField(this, jspb$google$protobuf$MutableAny, 3, jspb_internal_adapters.getRepeatedFieldReturnType(freezeOptOut));
  }


  /**
   * repeated google.protobuf.Any details = 3;
   * @override
   * @return {!ReadonlyArray<!jspb$ro.google$protobuf$ReadonlyAny>}
   */
  getReadonlyDetailsList() {
    return jspb_internal_adapters.getReadonlyRepeatedWrapperField(this, jspb$google$protobuf$MutableAny, 3);
  }


  /**
   * @param {!ReadonlyArray<!jspb$ro.google$protobuf$ReadonlyAny>|null|undefined} value
   * @return {!jspb$google$rpc$MutableStatus} returns this
   */
  setDetailsList(value) {
    return jspb_internal_adapters.setRepeatedWrapperField(this, jspb$google$protobuf$MutableAny, 3, value);
  }


  /**
   * Gets mutable repeated field reference.
   * @param {number} index
   * @return {!jspb$google$protobuf$MutableAny}
   */
  getMutableDetails(index) {
    return jspb_internal_adapters.getRepeatedIndexedMutableWrapper(this, 3, jspb$google$protobuf$MutableAny, index);
  }


  /**
   * Gets readonly repeated field reference.
   * @override
   * @param {number} index
   * @return {!jspb$ro.google$protobuf$ReadonlyAny}
   */
  getReadonlyDetails(index) {
    return jspb_internal_adapters.getRepeatedIndexedReadonlyWrapper(this, 3, jspb$google$protobuf$MutableAny, index);
  }


  /**
   * Adds repeated field and returns `this`.
   * @param {!jspb$ro.google$protobuf$ReadonlyAny} value
   * @param {number=} index
   * @return {!jspb$google$rpc$MutableStatus} returns this
   */
  addDetails(value, index) {
    return jspb_internal_adapters.addToRepeatedWrapperField(this, 3, jspb$google$protobuf$MutableAny, value, index);
  }


  /**
   * Adds repeated field and returns newly added submessage.
   * @param {!jspb$google$protobuf$MutableAny=} value
   * @param {number=} index
   * @return {!jspb$google$protobuf$MutableAny} the value that was added
   */
  addAndReturnDetails(value, index) {
    return jspb_internal_adapters.addAndReturnRepeatedWrapperField(this, 3, jspb$google$protobuf$MutableAny, value, index);
  }


  /**
   * Adds multiple values to a repeated field and returns `this`.
   * @param {!Iterable<!jspb$ro.google$protobuf$ReadonlyAny>} values
   * @return {!jspb$google$rpc$MutableStatus} returns this
   */
  addAllDetails(values) {
    return jspb_internal_adapters.addAllToRepeatedWrapperField(this, 3, jspb$google$protobuf$MutableAny, values);
  }


  /**
   * Sets repeated field value at `index` and returns `this`.
   * @param {number} index
   * @param {!jspb$ro.google$protobuf$ReadonlyAny} value
   * @return {!jspb$google$rpc$MutableStatus} returns this
   */
  setDetails(index, value) {
    return jspb_internal_adapters.setRepeatedIndexedWrapper(this, 3, jspb$google$protobuf$MutableAny, index, value);
  }


  /**
   * Removes a value from a repeated field and returns `this`.
   * @param {number=} index defaults to the end
   * @return {!jspb$google$rpc$MutableStatus} returns this
   */
  removeDetails(index) {
    return jspb_internal_adapters.removeFromRepeatedWrapperField(this, 3, jspb$google$protobuf$MutableAny, index);
  }


  /**
   * Clears the field.
   * @return {!jspb$google$rpc$MutableStatus} returns this
   */
  clearDetailsList() {
    return jspb_internal_adapters.clearField(this, 3);
  }


  /**
   * Returns the size of this field.
   * @override
   * @return {number}
   */
  getDetailsCount() {
    return jspb_internal_adapters.getRepeatedWrapperCount(this, jspb$google$protobuf$MutableAny, 3);
  }


};

/**
 * @override
 * @return {!jspb$google$rpc$ImmutableStatus}
 */
jspb$google$rpc$MutableStatus.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$google$rpc$MutableStatus}
 */
jspb$google$rpc$MutableStatus.prototype.clone;
/**
 * @const {function(string):!jspb$google$rpc$MutableStatus}
 */
jspb$google$rpc$MutableStatus.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$google$rpc$MutableStatus));

/**
 * Returns whether the given value is an instance of jspb$google$rpc$MutableStatus.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$google$rpc$MutableStatus>}
 */
jspb$google$rpc$MutableStatus.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$google$rpc$MutableStatus));

/**
 * Object form of Status as accepted by the `fromObject` method.
 * @typedef {{
 *  code: (?number|undefined),
 *  message: (?string|undefined),
 *  detailsList: (?Array<!jspb$google$protobuf$MutableAny.ObjectFormat>|undefined)
 * }}
 */
jspb$google$rpc$MutableStatus.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$google$rpc$MutableStatus.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @return {!jspb$google$rpc$MutableStatus.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$google$rpc$MutableStatus.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for google$rpc$MutableStatus.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$google$rpc$MutableStatus.internalDoNotUse_debugOnlyProtoTypeName = "google.rpc.Status";
}

/**
 * @typedef {!jspb$google$rpc$ImmutableStatus|!jspb$google$rpc$MutableStatus}
 */
jspb$ro.google$rpc$ReadonlyStatus = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'google.rpc.Status'}
   */
  jspb$google$rpc$MutableStatus.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$google$rpc$MutableStatus.displayName = 'proto.google.rpc.Status';
}
/**
 * Interface form of Status as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  code: (number|undefined),
 *  message: (string|undefined),
 *  detailsList: (!ReadonlyArray<!jspb$ro.google$protobuf$ReadonlyAny>|undefined)
 * }}
 */
jspb$google$rpc$MutableStatus.FieldsInterface;

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
 * @param {!jspb$google$rpc$MutableStatus.FieldsInterface} record
 * @return {!jspb$google$rpc$ImmutableStatus}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$google$rpc$MutableStatus, ಠ_ಠ.clutz.jspb$google$rpc$MutableStatus.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$google$rpc$ImmutableStatus
 */
jspb$google$rpc$MutableStatus.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$google$rpc$MutableStatus));

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
 * @param {!jspb$ro.google$rpc$ReadonlyStatus} value
 * @return {!jspb$google$rpc$MutableStatus.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.google$rpc$ReadonlyStatus): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$google$rpc$MutableStatus, ಠ_ಠ.clutz.jspb$google$rpc$MutableStatus.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$google$rpc$MutableStatus.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail;
Object.defineProperty(this, 'jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail', {
  get() { return jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail; },
  set(v) { jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail = v; },
