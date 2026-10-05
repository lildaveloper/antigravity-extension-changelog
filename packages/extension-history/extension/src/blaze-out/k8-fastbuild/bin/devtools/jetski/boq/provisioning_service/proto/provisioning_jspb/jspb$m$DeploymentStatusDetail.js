// source: devtools/jetski/boq/provisioning_service/proto/provisioning.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail');
goog.provide('jspb$ro.devtools_jetski_provisioning$ReadonlyDeploymentStatusDetail');

goog.require('jspb$devtools_jetski_provisioning$MutableInstanceFailure');
goog.require('jspb$google$protobuf$MutableTimestamp');
goog.require('jspb$google$rpc$MutableStatus');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$devtools_jetski_provisioning$ImmutableDeploymentStatusDetail');
goog.requireType('jspb$e.devtools_jetski_provisioning$OperationType');
goog.requireType('jspb$r$devtools_jetski_provisioning$DeploymentStatusDetail$internalDoNotUseReader');
goog.requireType('jspb$ro.devtools_jetski_provisioning$ReadonlyInstanceFailure');
goog.requireType('jspb$ro.google$protobuf$ReadonlyTimestamp');
goog.requireType('jspb$ro.google$rpc$ReadonlyStatus');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$devtools_jetski_provisioning$ImmutableDeploymentStatusDetail>}
 * @implements {jspb$r$devtools_jetski_provisioning$DeploymentStatusDetail$internalDoNotUseReader}
 */
jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional string message = 1;
   * @override
   * @return {string}
   */
  getMessage() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 1);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail} returns this
   */
  setMessage(value) {
    return jspb_internal_adapters.setStringField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail} returns this
   */
  clearMessage() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasMessage() {
    return jspb_internal_adapters.hasStringField(this, 1);
  }


  /**
   * optional string message = 1;
   * @override
   * @return {string|undefined}
   */
  getMessageOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 1);
  }


  /**
   * optional google.rpc.Status last_operation_error = 2;
   * @override
   * @return {!jspb$google$rpc$MutableStatus|undefined}
   */
  getLastOperationError() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$google$rpc$MutableStatus, 2);
  }


  /**
   * optional google.rpc.Status last_operation_error = 2;
   * @override
   * @return {!jspb$ro.google$rpc$ReadonlyStatus}
   */
  getReadonlyLastOperationError() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$google$rpc$MutableStatus, 2);
  }


  /**
   * optional google.rpc.Status last_operation_error = 2;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$google$rpc$MutableStatus|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$google$rpc$MutableStatus') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$google$rpc$MutableStatus|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$google$rpc$MutableStatus
   */
  getMutableLastOperationError(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$google$rpc$MutableStatus, 2, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.google$rpc$ReadonlyStatus|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail} returns this
   */
  setLastOperationError(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$google$rpc$MutableStatus, 2, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail} returns this
   */
  clearLastOperationError() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasLastOperationError() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$google$rpc$MutableStatus, 2);
  }


  /**
   * optional google.rpc.Status last_operation_error = 2;
   * @override
   * @return {!jspb$ro.google$rpc$ReadonlyStatus|undefined}
   */
  getLastOperationErrorOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$google$rpc$MutableStatus, 2);
  }


  /**
   * optional OperationType failed_operation_type = 3;
   * @override
   * @return {!jspb$e.devtools_jetski_provisioning$OperationType}
   */
  getFailedOperationType() {
    return /** @type {!jspb$e.devtools_jetski_provisioning$OperationType} */ (jspb_internal_adapters.getEnumFieldWithDefault(this, 3));
  }


  /**
   * @param {!jspb$e.devtools_jetski_provisioning$OperationType|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail} returns this
   */
  setFailedOperationType(value) {
    return jspb_internal_adapters.setEnumField(this, 3, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail} returns this
   */
  clearFailedOperationType() {
    return jspb_internal_adapters.clearField(this, 3);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasFailedOperationType() {
    return jspb_internal_adapters.hasEnumField(this, 3);
  }


  /**
   * optional OperationType failed_operation_type = 3;
   * @override
   * @return {!jspb$e.devtools_jetski_provisioning$OperationType|undefined}
   */
  getFailedOperationTypeOrUndefined() {
    return /** @type {!jspb$e.devtools_jetski_provisioning$OperationType|undefined} */ (jspb_internal_adapters.getEnumFieldOrUndefined(this, 3));
  }


  /**
   * optional string last_operation_id = 4;
   * @override
   * @return {string}
   */
  getLastOperationId() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 4);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail} returns this
   */
  setLastOperationId(value) {
    return jspb_internal_adapters.setStringField(this, 4, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail} returns this
   */
  clearLastOperationId() {
    return jspb_internal_adapters.clearField(this, 4);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasLastOperationId() {
    return jspb_internal_adapters.hasStringField(this, 4);
  }


  /**
   * optional string last_operation_id = 4;
   * @override
   * @return {string|undefined}
   */
  getLastOperationIdOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 4);
  }


  /**
   * optional google.protobuf.Timestamp status_time = 5;
   * @override
   * @return {!jspb$google$protobuf$MutableTimestamp|undefined}
   */
  getStatusTime() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$google$protobuf$MutableTimestamp, 5);
  }


  /**
   * optional google.protobuf.Timestamp status_time = 5;
   * @override
   * @return {!jspb$ro.google$protobuf$ReadonlyTimestamp}
   */
  getReadonlyStatusTime() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$google$protobuf$MutableTimestamp, 5);
  }


  /**
   * optional google.protobuf.Timestamp status_time = 5;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$google$protobuf$MutableTimestamp|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$google$protobuf$MutableTimestamp') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$google$protobuf$MutableTimestamp|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$google$protobuf$MutableTimestamp
   */
  getMutableStatusTime(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$google$protobuf$MutableTimestamp, 5, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.google$protobuf$ReadonlyTimestamp|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail} returns this
   */
  setStatusTime(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$google$protobuf$MutableTimestamp, 5, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail} returns this
   */
  clearStatusTime() {
    return jspb_internal_adapters.clearField(this, 5);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasStatusTime() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$google$protobuf$MutableTimestamp, 5);
  }


  /**
   * optional google.protobuf.Timestamp status_time = 5;
   * @override
   * @return {!jspb$ro.google$protobuf$ReadonlyTimestamp|undefined}
   */
  getStatusTimeOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$google$protobuf$MutableTimestamp, 5);
  }


  /**
   * optional string failed_phase = 6;
   * @override
   * @return {string}
   */
  getFailedPhase() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 6);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail} returns this
   */
  setFailedPhase(value) {
    return jspb_internal_adapters.setStringField(this, 6, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail} returns this
   */
  clearFailedPhase() {
    return jspb_internal_adapters.clearField(this, 6);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasFailedPhase() {
    return jspb_internal_adapters.hasStringField(this, 6);
  }


  /**
   * optional string failed_phase = 6;
   * @override
   * @return {string|undefined}
   */
  getFailedPhaseOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 6);
  }


  /**
   * repeated InstanceFailure instance_failures = 7;
   * @param {!jspb_internal_public_for_gencode.DoNotFreezeToken=} freezeOptOut
   * @tsType (freezeOptOut: import('google3/javascript/apps/jspb/internal_public').DoNotFreezeToken): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableInstanceFailure[]
   * @tsType (): readonly ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableInstanceFailure[]
   * @override
   * @return {!ReadonlyArray<!jspb$devtools_jetski_provisioning$MutableInstanceFailure>}
   */
  getInstanceFailuresList(freezeOptOut) {
    return jspb_internal_adapters.getRepeatedWrapperField(this, jspb$devtools_jetski_provisioning$MutableInstanceFailure, 7, jspb_internal_adapters.getRepeatedFieldReturnType(freezeOptOut));
  }


  /**
   * repeated InstanceFailure instance_failures = 7;
   * @override
   * @return {!ReadonlyArray<!jspb$ro.devtools_jetski_provisioning$ReadonlyInstanceFailure>}
   */
  getReadonlyInstanceFailuresList() {
    return jspb_internal_adapters.getReadonlyRepeatedWrapperField(this, jspb$devtools_jetski_provisioning$MutableInstanceFailure, 7);
  }


  /**
   * @param {!ReadonlyArray<!jspb$ro.devtools_jetski_provisioning$ReadonlyInstanceFailure>|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail} returns this
   */
  setInstanceFailuresList(value) {
    return jspb_internal_adapters.setRepeatedWrapperField(this, jspb$devtools_jetski_provisioning$MutableInstanceFailure, 7, value);
  }


  /**
   * Gets mutable repeated field reference.
   * @param {number} index
   * @return {!jspb$devtools_jetski_provisioning$MutableInstanceFailure}
   */
  getMutableInstanceFailures(index) {
    return jspb_internal_adapters.getRepeatedIndexedMutableWrapper(this, 7, jspb$devtools_jetski_provisioning$MutableInstanceFailure, index);
  }


  /**
   * Gets readonly repeated field reference.
   * @override
   * @param {number} index
   * @return {!jspb$ro.devtools_jetski_provisioning$ReadonlyInstanceFailure}
   */
  getReadonlyInstanceFailures(index) {
    return jspb_internal_adapters.getRepeatedIndexedReadonlyWrapper(this, 7, jspb$devtools_jetski_provisioning$MutableInstanceFailure, index);
  }


  /**
   * Adds repeated field and returns `this`.
   * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyInstanceFailure} value
   * @param {number=} index
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail} returns this
   */
  addInstanceFailures(value, index) {
    return jspb_internal_adapters.addToRepeatedWrapperField(this, 7, jspb$devtools_jetski_provisioning$MutableInstanceFailure, value, index);
  }


  /**
   * Adds repeated field and returns newly added submessage.
   * @param {!jspb$devtools_jetski_provisioning$MutableInstanceFailure=} value
   * @param {number=} index
   * @return {!jspb$devtools_jetski_provisioning$MutableInstanceFailure} the value that was added
   */
  addAndReturnInstanceFailures(value, index) {
    return jspb_internal_adapters.addAndReturnRepeatedWrapperField(this, 7, jspb$devtools_jetski_provisioning$MutableInstanceFailure, value, index);
  }


  /**
   * Adds multiple values to a repeated field and returns `this`.
   * @param {!Iterable<!jspb$ro.devtools_jetski_provisioning$ReadonlyInstanceFailure>} values
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail} returns this
   */
  addAllInstanceFailures(values) {
    return jspb_internal_adapters.addAllToRepeatedWrapperField(this, 7, jspb$devtools_jetski_provisioning$MutableInstanceFailure, values);
  }


  /**
   * Sets repeated field value at `index` and returns `this`.
   * @param {number} index
   * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyInstanceFailure} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail} returns this
   */
  setInstanceFailures(index, value) {
    return jspb_internal_adapters.setRepeatedIndexedWrapper(this, 7, jspb$devtools_jetski_provisioning$MutableInstanceFailure, index, value);
  }


  /**
   * Removes a value from a repeated field and returns `this`.
   * @param {number=} index defaults to the end
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail} returns this
   */
  removeInstanceFailures(index) {
    return jspb_internal_adapters.removeFromRepeatedWrapperField(this, 7, jspb$devtools_jetski_provisioning$MutableInstanceFailure, index);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail} returns this
   */
  clearInstanceFailuresList() {
    return jspb_internal_adapters.clearField(this, 7);
  }


  /**
   * Returns the size of this field.
   * @override
   * @return {number}
   */
  getInstanceFailuresCount() {
    return jspb_internal_adapters.getRepeatedWrapperCount(this, jspb$devtools_jetski_provisioning$MutableInstanceFailure, 7);
  }


};

/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$ImmutableDeploymentStatusDetail}
 */
jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail}
 */
jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail.prototype.clone;
/**
 * @const {function(string):!jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail}
 */
jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail));

/**
 * Returns whether the given value is an instance of jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail>}
 */
jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail));

/**
 * Object form of DeploymentStatusDetail as accepted by the `fromObject` method.
 * @typedef {{
 *  message: (?string|undefined),
 *  lastOperationError: (?jspb$google$rpc$MutableStatus.ObjectFormat|undefined),
 *  failedOperationType: (?number|undefined),
 *  lastOperationId: (?string|undefined),
 *  statusTime: (?jspb$google$protobuf$MutableTimestamp.ObjectFormat|undefined),
 *  failedPhase: (?string|undefined),
 *  instanceFailuresList: (?Array<!jspb$devtools_jetski_provisioning$MutableInstanceFailure.ObjectFormat>|undefined)
 * }}
 */
jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for devtools_jetski_provisioning$MutableDeploymentStatusDetail.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail.internalDoNotUse_debugOnlyProtoTypeName = "devtools_jetski_provisioning.DeploymentStatusDetail";
}

/**
 * @typedef {!jspb$devtools_jetski_provisioning$ImmutableDeploymentStatusDetail|!jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail}
 */
jspb$ro.devtools_jetski_provisioning$ReadonlyDeploymentStatusDetail = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'devtools_jetski_provisioning.DeploymentStatusDetail'}
   */
  jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail.displayName = 'proto.devtools_jetski_provisioning.DeploymentStatusDetail';
}
/**
 * Interface form of DeploymentStatusDetail as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  message: (string|undefined),
 *  lastOperationError: (!jspb$ro.google$rpc$ReadonlyStatus|undefined),
 *  failedOperationType: (!jspb$e.devtools_jetski_provisioning$OperationType|undefined),
 *  lastOperationId: (string|undefined),
 *  statusTime: (!jspb$ro.google$protobuf$ReadonlyTimestamp|undefined),
 *  failedPhase: (string|undefined),
 *  instanceFailuresList: (!ReadonlyArray<!jspb$ro.devtools_jetski_provisioning$ReadonlyInstanceFailure>|undefined)
 * }}
 */
jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail.FieldsInterface;

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
 * @param {!jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail.FieldsInterface} record
 * @return {!jspb$devtools_jetski_provisioning$ImmutableDeploymentStatusDetail}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail, ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$ImmutableDeploymentStatusDetail
 */
jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail));

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
 * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyDeploymentStatusDetail} value
 * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.devtools_jetski_provisioning$ReadonlyDeploymentStatusDetail): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail, ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$b$google$rpc$Status;
Object.defineProperty(this, 'jspb$b$google$rpc$Status', {
  get() { return jspb$b$google$rpc$Status; },
  set(v) { jspb$b$google$rpc$Status = v; },
