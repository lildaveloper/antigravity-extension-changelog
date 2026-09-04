// source: third_party/jetski/jetbox_state_pb/jetbox_state.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$jetbox_state_pb$MutablePostOnboardingState');
goog.provide('jspb$ro.jetbox_state_pb$ReadonlyPostOnboardingState');

goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$e.jetbox_state_pb$PostOnboardingStepType');
goog.requireType('jspb$jetbox_state_pb$ImmutablePostOnboardingState');
goog.requireType('jspb$r$jetbox_state_pb$PostOnboardingState$internalDoNotUseReader');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$jetbox_state_pb$ImmutablePostOnboardingState>}
 * @implements {jspb$r$jetbox_state_pb$PostOnboardingState$internalDoNotUseReader}
 */
jspb$jetbox_state_pb$MutablePostOnboardingState = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * repeated PostOnboardingStepType completed_steps = 1;
   * @override
   * @param {!jspb_internal_public_for_gencode.DoNotFreezeToken=} freezeOptOut
   * @tsType (freezeOptOut: import('google3/javascript/apps/jspb/internal_public').DoNotFreezeToken): ಠ_ಠ.clutz.jspb$e.jetbox_state_pb$PostOnboardingStepType[]
   * @tsType (): readonly ಠ_ಠ.clutz.jspb$e.jetbox_state_pb$PostOnboardingStepType[]
   * @return {!ReadonlyArray<!jspb$e.jetbox_state_pb$PostOnboardingStepType>}
   */
  getCompletedStepsList(freezeOptOut) {
    return /** @type {!ReadonlyArray<!jspb$e.jetbox_state_pb$PostOnboardingStepType>} */ (jspb_internal_adapters.getRepeatedEnumField(this, 1, jspb_internal_adapters.getRepeatedFieldReturnType(freezeOptOut)));
  }


  /**
   * @param {!ReadonlyArray<!jspb$e.jetbox_state_pb$PostOnboardingStepType>|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutablePostOnboardingState} returns this
   */
  setCompletedStepsList(value) {
    return jspb_internal_adapters.setRepeatedEnumField(this, 1, value);
  }


  /**
   * @param {!jspb$e.jetbox_state_pb$PostOnboardingStepType} value
   * @param {number=} index
   * @return {!jspb$jetbox_state_pb$MutablePostOnboardingState} returns this
   */
  addCompletedSteps(value, index) {
    return jspb_internal_adapters.addToRepeatedEnumField(this, 1, value, index);
  }


  /**
   * @param {!Iterable<!jspb$e.jetbox_state_pb$PostOnboardingStepType>} values
   * @return {!jspb$jetbox_state_pb$MutablePostOnboardingState} returns this
   */
  addAllCompletedSteps(values) {
    return jspb_internal_adapters.addAllToRepeatedEnumField(this, 1, values);
  }


  /**
   * @param {number=} index If not passed, defaults to the end.
   * @return {!jspb$jetbox_state_pb$MutablePostOnboardingState} returns this
   */
  removeCompletedSteps(index) {
    return jspb_internal_adapters.removeFromRepeatedEnumField(this, 1, index);
  }


  /**
   * Returns value at `index`.
   * @override
   * @param {number} index
   * @return {!jspb$e.jetbox_state_pb$PostOnboardingStepType}
   */
  getCompletedSteps(index) {
   return /** @type {!jspb$e.jetbox_state_pb$PostOnboardingStepType} */ (jspb_internal_adapters.getRepeatedIndexedEnumField(this, 1, index));
  }


  /**
   * @param {number} index
   * @param {!jspb$e.jetbox_state_pb$PostOnboardingStepType} value
   * @return {!jspb$jetbox_state_pb$MutablePostOnboardingState} returns this
   */
  setCompletedSteps(index, value) {
    return jspb_internal_adapters.setRepeatedIndexedEnumField(this, 1, index, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutablePostOnboardingState} returns this
   */
  clearCompletedStepsList() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * Returns the size of this field.
   * @override
   * @return {number}
   */
  getCompletedStepsCount() {
    return jspb_internal_adapters.getRepeatedEnumCount(this, 1);
  }


};

/**
 * @override
 * @return {!jspb$jetbox_state_pb$ImmutablePostOnboardingState}
 */
jspb$jetbox_state_pb$MutablePostOnboardingState.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$jetbox_state_pb$MutablePostOnboardingState}
 */
jspb$jetbox_state_pb$MutablePostOnboardingState.prototype.clone;
/**
 * @const {function(string):!jspb$jetbox_state_pb$MutablePostOnboardingState}
 */
jspb$jetbox_state_pb$MutablePostOnboardingState.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$jetbox_state_pb$MutablePostOnboardingState));

/**
 * Returns whether the given value is an instance of jspb$jetbox_state_pb$MutablePostOnboardingState.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$jetbox_state_pb$MutablePostOnboardingState>}
 */
jspb$jetbox_state_pb$MutablePostOnboardingState.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$jetbox_state_pb$MutablePostOnboardingState));

/**
 * Object form of PostOnboardingState as accepted by the `fromObject` method.
 * @typedef {{
 *  completedStepsList: (?Array<number>|undefined)
 * }}
 */
jspb$jetbox_state_pb$MutablePostOnboardingState.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$jetbox_state_pb$MutablePostOnboardingState.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$jetbox_state_pb$MutablePostOnboardingState.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$jetbox_state_pb$MutablePostOnboardingState.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for jetbox_state_pb$MutablePostOnboardingState.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$jetbox_state_pb$MutablePostOnboardingState.internalDoNotUse_debugOnlyProtoTypeName = "jetbox_state_pb.PostOnboardingState";
}

/**
 * @typedef {!jspb$jetbox_state_pb$ImmutablePostOnboardingState|!jspb$jetbox_state_pb$MutablePostOnboardingState}
 */
jspb$ro.jetbox_state_pb$ReadonlyPostOnboardingState = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'jetbox_state_pb.PostOnboardingState'}
   */
  jspb$jetbox_state_pb$MutablePostOnboardingState.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$jetbox_state_pb$MutablePostOnboardingState.displayName = 'proto.jetbox_state_pb.PostOnboardingState';
}
/**
 * Interface form of PostOnboardingState as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  completedStepsList: (!ReadonlyArray<!jspb$e.jetbox_state_pb$PostOnboardingStepType>|undefined)
 * }}
 */
jspb$jetbox_state_pb$MutablePostOnboardingState.FieldsInterface;

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
 * @param {!jspb$jetbox_state_pb$MutablePostOnboardingState.FieldsInterface} record
 * @return {!jspb$jetbox_state_pb$ImmutablePostOnboardingState}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutablePostOnboardingState, ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutablePostOnboardingState.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$jetbox_state_pb$ImmutablePostOnboardingState
 */
jspb$jetbox_state_pb$MutablePostOnboardingState.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$jetbox_state_pb$MutablePostOnboardingState));

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
 * @param {!jspb$ro.jetbox_state_pb$ReadonlyPostOnboardingState} value
 * @return {!jspb$jetbox_state_pb$MutablePostOnboardingState.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.jetbox_state_pb$ReadonlyPostOnboardingState): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutablePostOnboardingState, ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutablePostOnboardingState.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$jetbox_state_pb$MutablePostOnboardingState.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$jetbox_state_pb$MutableSeenNuxUids;
Object.defineProperty(this, 'jspb$jetbox_state_pb$MutableSeenNuxUids', {
  get() { return jspb$jetbox_state_pb$MutableSeenNuxUids; },
  set(v) { jspb$jetbox_state_pb$MutableSeenNuxUids = v; },
