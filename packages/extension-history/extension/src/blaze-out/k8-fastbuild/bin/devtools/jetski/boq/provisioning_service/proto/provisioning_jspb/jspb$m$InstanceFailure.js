// source: devtools/jetski/boq/provisioning_service/proto/provisioning.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$devtools_jetski_provisioning$MutableInstanceFailure');
goog.provide('jspb$ro.devtools_jetski_provisioning$ReadonlyInstanceFailure');

goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$devtools_jetski_provisioning$ImmutableInstanceFailure');
goog.requireType('jspb$r$devtools_jetski_provisioning$InstanceFailure$internalDoNotUseReader');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$devtools_jetski_provisioning$ImmutableInstanceFailure>}
 * @implements {jspb$r$devtools_jetski_provisioning$InstanceFailure$internalDoNotUseReader}
 */
jspb$devtools_jetski_provisioning$MutableInstanceFailure = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional string instance_id = 1;
   * @override
   * @return {string}
   */
  getInstanceId() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 1);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableInstanceFailure} returns this
   */
  setInstanceId(value) {
    return jspb_internal_adapters.setStringField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableInstanceFailure} returns this
   */
  clearInstanceId() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasInstanceId() {
    return jspb_internal_adapters.hasStringField(this, 1);
  }


  /**
   * optional string instance_id = 1;
   * @override
   * @return {string|undefined}
   */
  getInstanceIdOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 1);
  }


  /**
   * optional int32 replica_index = 2;
   * @override
   * @return {number}
   */
  getReplicaIndex() {
    return jspb_internal_adapters.getInt32FieldWithDefault(this, 2);
  }


  /**
   * @param {number|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableInstanceFailure} returns this
   */
  setReplicaIndex(value) {
    return jspb_internal_adapters.setInt32Field(this, 2, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableInstanceFailure} returns this
   */
  clearReplicaIndex() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasReplicaIndex() {
    return jspb_internal_adapters.hasInt32Field(this, 2);
  }


  /**
   * optional int32 replica_index = 2;
   * @override
   * @return {number|undefined}
   */
  getReplicaIndexOrUndefined() {
    return jspb_internal_adapters.getInt32FieldOrUndefined(this, 2);
  }


  /**
   * optional string failed_phase = 3;
   * @override
   * @return {string}
   */
  getFailedPhase() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 3);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableInstanceFailure} returns this
   */
  setFailedPhase(value) {
    return jspb_internal_adapters.setStringField(this, 3, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableInstanceFailure} returns this
   */
  clearFailedPhase() {
    return jspb_internal_adapters.clearField(this, 3);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasFailedPhase() {
    return jspb_internal_adapters.hasStringField(this, 3);
  }


  /**
   * optional string failed_phase = 3;
   * @override
   * @return {string|undefined}
   */
  getFailedPhaseOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 3);
  }


  /**
   * optional string remoteshell_cause = 4;
   * @override
   * @return {string}
   */
  getRemoteshellCause() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 4);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableInstanceFailure} returns this
   */
  setRemoteshellCause(value) {
    return jspb_internal_adapters.setStringField(this, 4, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableInstanceFailure} returns this
   */
  clearRemoteshellCause() {
    return jspb_internal_adapters.clearField(this, 4);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasRemoteshellCause() {
    return jspb_internal_adapters.hasStringField(this, 4);
  }


  /**
   * optional string remoteshell_cause = 4;
   * @override
   * @return {string|undefined}
   */
  getRemoteshellCauseOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 4);
  }


  /**
   * optional string error_message = 5;
   * @override
   * @return {string}
   */
  getErrorMessage() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 5);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableInstanceFailure} returns this
   */
  setErrorMessage(value) {
    return jspb_internal_adapters.setStringField(this, 5, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableInstanceFailure} returns this
   */
  clearErrorMessage() {
    return jspb_internal_adapters.clearField(this, 5);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasErrorMessage() {
    return jspb_internal_adapters.hasStringField(this, 5);
  }


  /**
   * optional string error_message = 5;
   * @override
   * @return {string|undefined}
   */
  getErrorMessageOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 5);
  }


};

/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$ImmutableInstanceFailure}
 */
jspb$devtools_jetski_provisioning$MutableInstanceFailure.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$MutableInstanceFailure}
 */
jspb$devtools_jetski_provisioning$MutableInstanceFailure.prototype.clone;
/**
 * @const {function(string):!jspb$devtools_jetski_provisioning$MutableInstanceFailure}
 */
jspb$devtools_jetski_provisioning$MutableInstanceFailure.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$devtools_jetski_provisioning$MutableInstanceFailure));

/**
 * Returns whether the given value is an instance of jspb$devtools_jetski_provisioning$MutableInstanceFailure.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$devtools_jetski_provisioning$MutableInstanceFailure>}
 */
jspb$devtools_jetski_provisioning$MutableInstanceFailure.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$devtools_jetski_provisioning$MutableInstanceFailure));

/**
 * Object form of InstanceFailure as accepted by the `fromObject` method.
 * @typedef {{
 *  instanceId: (?string|undefined),
 *  replicaIndex: (?number|undefined),
 *  failedPhase: (?string|undefined),
 *  remoteshellCause: (?string|undefined),
 *  errorMessage: (?string|undefined)
 * }}
 */
jspb$devtools_jetski_provisioning$MutableInstanceFailure.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$devtools_jetski_provisioning$MutableInstanceFailure.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$devtools_jetski_provisioning$MutableInstanceFailure.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$devtools_jetski_provisioning$MutableInstanceFailure.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for devtools_jetski_provisioning$MutableInstanceFailure.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$devtools_jetski_provisioning$MutableInstanceFailure.internalDoNotUse_debugOnlyProtoTypeName = "devtools_jetski_provisioning.InstanceFailure";
}

/**
 * @typedef {!jspb$devtools_jetski_provisioning$ImmutableInstanceFailure|!jspb$devtools_jetski_provisioning$MutableInstanceFailure}
 */
jspb$ro.devtools_jetski_provisioning$ReadonlyInstanceFailure = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'devtools_jetski_provisioning.InstanceFailure'}
   */
  jspb$devtools_jetski_provisioning$MutableInstanceFailure.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$devtools_jetski_provisioning$MutableInstanceFailure.displayName = 'proto.devtools_jetski_provisioning.InstanceFailure';
}
/**
 * Interface form of InstanceFailure as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  instanceId: (string|undefined),
 *  replicaIndex: (number|undefined),
 *  failedPhase: (string|undefined),
 *  remoteshellCause: (string|undefined),
 *  errorMessage: (string|undefined)
 * }}
 */
jspb$devtools_jetski_provisioning$MutableInstanceFailure.FieldsInterface;

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
 * @param {!jspb$devtools_jetski_provisioning$MutableInstanceFailure.FieldsInterface} record
 * @return {!jspb$devtools_jetski_provisioning$ImmutableInstanceFailure}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableInstanceFailure, ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableInstanceFailure.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$ImmutableInstanceFailure
 */
jspb$devtools_jetski_provisioning$MutableInstanceFailure.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$devtools_jetski_provisioning$MutableInstanceFailure));

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
 * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyInstanceFailure} value
 * @return {!jspb$devtools_jetski_provisioning$MutableInstanceFailure.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.devtools_jetski_provisioning$ReadonlyInstanceFailure): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableInstanceFailure, ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableInstanceFailure.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$devtools_jetski_provisioning$MutableInstanceFailure.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$b$devtools_jetski_provisioning$InstanceFailure;
Object.defineProperty(this, 'jspb$b$devtools_jetski_provisioning$InstanceFailure', {
  get() { return jspb$b$devtools_jetski_provisioning$InstanceFailure; },
  set(v) { jspb$b$devtools_jetski_provisioning$InstanceFailure = v; },
