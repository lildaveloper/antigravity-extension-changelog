// source: devtools/jetski/boq/provisioning_service/proto/provisioning.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse');
goog.provide('jspb$ro.devtools_jetski_provisioning$ReadonlyListDeploymentsResponse');

goog.require('jspb$devtools_jetski_provisioning$MutableDeployment');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$devtools_jetski_provisioning$ImmutableListDeploymentsResponse');
goog.requireType('jspb$e.devtools_jetski_provisioning$AutoRenewalEligibility');
goog.requireType('jspb$r$devtools_jetski_provisioning$ListDeploymentsResponse$internalDoNotUseReader');
goog.requireType('jspb$ro.devtools_jetski_provisioning$ReadonlyDeployment');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$devtools_jetski_provisioning$ImmutableListDeploymentsResponse>}
 * @implements {jspb$r$devtools_jetski_provisioning$ListDeploymentsResponse$internalDoNotUseReader}
 */
jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * repeated Deployment deployments = 1;
   * @param {!jspb_internal_public_for_gencode.DoNotFreezeToken=} freezeOptOut
   * @tsType (freezeOptOut: import('google3/javascript/apps/jspb/internal_public').DoNotFreezeToken): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableDeployment[]
   * @tsType (): readonly ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableDeployment[]
   * @override
   * @return {!ReadonlyArray<!jspb$devtools_jetski_provisioning$MutableDeployment>}
   */
  getDeploymentsList(freezeOptOut) {
    return jspb_internal_adapters.getRepeatedWrapperField(this, jspb$devtools_jetski_provisioning$MutableDeployment, 1, jspb_internal_adapters.getRepeatedFieldReturnType(freezeOptOut));
  }


  /**
   * repeated Deployment deployments = 1;
   * @override
   * @return {!ReadonlyArray<!jspb$ro.devtools_jetski_provisioning$ReadonlyDeployment>}
   */
  getReadonlyDeploymentsList() {
    return jspb_internal_adapters.getReadonlyRepeatedWrapperField(this, jspb$devtools_jetski_provisioning$MutableDeployment, 1);
  }


  /**
   * @param {!ReadonlyArray<!jspb$ro.devtools_jetski_provisioning$ReadonlyDeployment>|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse} returns this
   */
  setDeploymentsList(value) {
    return jspb_internal_adapters.setRepeatedWrapperField(this, jspb$devtools_jetski_provisioning$MutableDeployment, 1, value);
  }


  /**
   * Gets mutable repeated field reference.
   * @param {number} index
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment}
   */
  getMutableDeployments(index) {
    return jspb_internal_adapters.getRepeatedIndexedMutableWrapper(this, 1, jspb$devtools_jetski_provisioning$MutableDeployment, index);
  }


  /**
   * Gets readonly repeated field reference.
   * @override
   * @param {number} index
   * @return {!jspb$ro.devtools_jetski_provisioning$ReadonlyDeployment}
   */
  getReadonlyDeployments(index) {
    return jspb_internal_adapters.getRepeatedIndexedReadonlyWrapper(this, 1, jspb$devtools_jetski_provisioning$MutableDeployment, index);
  }


  /**
   * Adds repeated field and returns `this`.
   * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyDeployment} value
   * @param {number=} index
   * @return {!jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse} returns this
   */
  addDeployments(value, index) {
    return jspb_internal_adapters.addToRepeatedWrapperField(this, 1, jspb$devtools_jetski_provisioning$MutableDeployment, value, index);
  }


  /**
   * Adds repeated field and returns newly added submessage.
   * @param {!jspb$devtools_jetski_provisioning$MutableDeployment=} value
   * @param {number=} index
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} the value that was added
   */
  addAndReturnDeployments(value, index) {
    return jspb_internal_adapters.addAndReturnRepeatedWrapperField(this, 1, jspb$devtools_jetski_provisioning$MutableDeployment, value, index);
  }


  /**
   * Adds multiple values to a repeated field and returns `this`.
   * @param {!Iterable<!jspb$ro.devtools_jetski_provisioning$ReadonlyDeployment>} values
   * @return {!jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse} returns this
   */
  addAllDeployments(values) {
    return jspb_internal_adapters.addAllToRepeatedWrapperField(this, 1, jspb$devtools_jetski_provisioning$MutableDeployment, values);
  }


  /**
   * Sets repeated field value at `index` and returns `this`.
   * @param {number} index
   * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyDeployment} value
   * @return {!jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse} returns this
   */
  setDeployments(index, value) {
    return jspb_internal_adapters.setRepeatedIndexedWrapper(this, 1, jspb$devtools_jetski_provisioning$MutableDeployment, index, value);
  }


  /**
   * Removes a value from a repeated field and returns `this`.
   * @param {number=} index defaults to the end
   * @return {!jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse} returns this
   */
  removeDeployments(index) {
    return jspb_internal_adapters.removeFromRepeatedWrapperField(this, 1, jspb$devtools_jetski_provisioning$MutableDeployment, index);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse} returns this
   */
  clearDeploymentsList() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * Returns the size of this field.
   * @override
   * @return {number}
   */
  getDeploymentsCount() {
    return jspb_internal_adapters.getRepeatedWrapperCount(this, jspb$devtools_jetski_provisioning$MutableDeployment, 1);
  }


  /**
   * optional AutoRenewalEligibility caller_auto_renewal_eligibility = 2;
   * @override
   * @return {!jspb$e.devtools_jetski_provisioning$AutoRenewalEligibility}
   */
  getCallerAutoRenewalEligibility() {
    return /** @type {!jspb$e.devtools_jetski_provisioning$AutoRenewalEligibility} */ (jspb_internal_adapters.getEnumFieldWithDefault(this, 2));
  }


  /**
   * @param {!jspb$e.devtools_jetski_provisioning$AutoRenewalEligibility|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse} returns this
   */
  setCallerAutoRenewalEligibility(value) {
    return jspb_internal_adapters.setEnumField(this, 2, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse} returns this
   */
  clearCallerAutoRenewalEligibility() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasCallerAutoRenewalEligibility() {
    return jspb_internal_adapters.hasEnumField(this, 2);
  }


  /**
   * optional AutoRenewalEligibility caller_auto_renewal_eligibility = 2;
   * @override
   * @return {!jspb$e.devtools_jetski_provisioning$AutoRenewalEligibility|undefined}
   */
  getCallerAutoRenewalEligibilityOrUndefined() {
    return /** @type {!jspb$e.devtools_jetski_provisioning$AutoRenewalEligibility|undefined} */ (jspb_internal_adapters.getEnumFieldOrUndefined(this, 2));
  }


};

/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$ImmutableListDeploymentsResponse}
 */
jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse}
 */
jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse.prototype.clone;
/**
 * @const {function(string):!jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse}
 */
jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse));

/**
 * Returns whether the given value is an instance of jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse>}
 */
jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse));

/**
 * Object form of ListDeploymentsResponse as accepted by the `fromObject` method.
 * @typedef {{
 *  deploymentsList: (?Array<!jspb$devtools_jetski_provisioning$MutableDeployment.ObjectFormat>|undefined),
 *  callerAutoRenewalEligibility: (?number|undefined)
 * }}
 */
jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for devtools_jetski_provisioning$MutableListDeploymentsResponse.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse.internalDoNotUse_debugOnlyProtoTypeName = "devtools_jetski_provisioning.ListDeploymentsResponse";
}

/**
 * @typedef {!jspb$devtools_jetski_provisioning$ImmutableListDeploymentsResponse|!jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse}
 */
jspb$ro.devtools_jetski_provisioning$ReadonlyListDeploymentsResponse = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'devtools_jetski_provisioning.ListDeploymentsResponse'}
   */
  jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse.displayName = 'proto.devtools_jetski_provisioning.ListDeploymentsResponse';
}
/**
 * Interface form of ListDeploymentsResponse as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  deploymentsList: (!ReadonlyArray<!jspb$ro.devtools_jetski_provisioning$ReadonlyDeployment>|undefined),
 *  callerAutoRenewalEligibility: (!jspb$e.devtools_jetski_provisioning$AutoRenewalEligibility|undefined)
 * }}
 */
jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse.FieldsInterface;

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
 * @param {!jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse.FieldsInterface} record
 * @return {!jspb$devtools_jetski_provisioning$ImmutableListDeploymentsResponse}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse, ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$ImmutableListDeploymentsResponse
 */
jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse));

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
 * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyListDeploymentsResponse} value
 * @return {!jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.devtools_jetski_provisioning$ReadonlyListDeploymentsResponse): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse, ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$b$devtools_jetski_provisioning$ListDeploymentsResponse;
Object.defineProperty(this, 'jspb$b$devtools_jetski_provisioning$ListDeploymentsResponse', {
  get() { return jspb$b$devtools_jetski_provisioning$ListDeploymentsResponse; },
  set(v) { jspb$b$devtools_jetski_provisioning$ListDeploymentsResponse = v; },
