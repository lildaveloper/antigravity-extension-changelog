// source: devtools/jetski/boq/provisioning_service/proto/provisioning.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$devtools_jetski_provisioning$ImmutableListDeploymentsResponse');

goog.require('jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse');
goog.require('jspb.immutable_message.ImmutableMessage');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$devtools_jetski_provisioning$ImmutableDeployment');
goog.requireType('jspb$e.devtools_jetski_provisioning$AutoRenewalEligibility');
goog.requireType('jspb$r$devtools_jetski_provisioning$ListDeploymentsResponse$internalDoNotUseReader');

/**
 * @abstract
 * @constructor
 * @extends {jspb.immutable_message.ImmutableMessage<!jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse>}
 * @implements {jspb$r$devtools_jetski_provisioning$ListDeploymentsResponse$internalDoNotUseReader}
 * @suppress {undefinedVars} empty function decls
 */
jspb$devtools_jetski_provisioning$ImmutableListDeploymentsResponse = function() {
  /**
   * repeated Deployment deployments = 1;
   * @param {!jspb_internal_public_for_gencode.DoNotFreezeToken=} freezeOptOut
   * @tsType (): readonly ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$ImmutableDeployment[]
   * @override
   * @return {!ReadonlyArray<!jspb$devtools_jetski_provisioning$ImmutableDeployment>}
   * @abstract
   */
  this.getDeploymentsList;

  /**
   * repeated Deployment deployments = 1;
   * @override
   * @return {!ReadonlyArray<!jspb$devtools_jetski_provisioning$ImmutableDeployment>}
   * @abstract
   */
  this.getReadonlyDeploymentsList;

  /**
   * Gets readonly repeated field reference.
   * @override
   * @param {number} index
   * @return {!jspb$devtools_jetski_provisioning$ImmutableDeployment}
   */
  this.getReadonlyDeployments;

  /**
   * Returns the size of this field.
   * @override
   * @return {number}
   * @abstract
   */
  this.getDeploymentsCount;

  /**
   * optional AutoRenewalEligibility caller_auto_renewal_eligibility = 2;
   * @override
   * @return {!jspb$e.devtools_jetski_provisioning$AutoRenewalEligibility}
   * @abstract
   */
  this.getCallerAutoRenewalEligibility;

  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   * @abstract
   */
  this.hasCallerAutoRenewalEligibility;

  /**
   * optional AutoRenewalEligibility caller_auto_renewal_eligibility = 2;
   * @override
   * @return {!jspb$e.devtools_jetski_provisioning$AutoRenewalEligibility|undefined}
   * @abstract
   */
  this.getCallerAutoRenewalEligibilityOrUndefined;

};

/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$ImmutableListDeploymentsResponse}
 */
jspb$devtools_jetski_provisioning$ImmutableListDeploymentsResponse.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse}
 */
jspb$devtools_jetski_provisioning$ImmutableListDeploymentsResponse.prototype.toMutable;
/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse}
 */
jspb$devtools_jetski_provisioning$ImmutableListDeploymentsResponse.prototype.clone;
/** @const {function(string):!jspb$devtools_jetski_provisioning$ImmutableListDeploymentsResponse} */
jspb$devtools_jetski_provisioning$ImmutableListDeploymentsResponse.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeImmutableDeserializeFunction(jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse));

/** @const {function():!jspb$devtools_jetski_provisioning$ImmutableListDeploymentsResponse} */
jspb$devtools_jetski_provisioning$ImmutableListDeploymentsResponse.getDefaultInstance = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeGetDefaultInstanceFunction(jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse));

/**
 * Returns whether the given value is an instance of jspb$devtools_jetski_provisioning$ImmutableListDeploymentsResponse.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$devtools_jetski_provisioning$ImmutableListDeploymentsResponse>}
 */
jspb$devtools_jetski_provisioning$ImmutableListDeploymentsResponse.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasImmutableInstance(jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse));


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
jspb$devtools_jetski_provisioning$ImmutableListDeploymentsResponse.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse));

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
 * @param {!jspb$devtools_jetski_provisioning$ImmutableListDeploymentsResponse} value
 * @return {!jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$ImmutableListDeploymentsResponse): import('google3/javascript/apps/jspb/internal_records').ImmutableFields<ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse, ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$devtools_jetski_provisioning$ImmutableListDeploymentsResponse.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());
if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'devtools_jetski_provisioning.ListDeploymentsResponse'}
   */
  jspb$devtools_jetski_provisioning$ImmutableListDeploymentsResponse.prototype.internalDoNotUse_annotations;
}

var jspb$o$google$protobuf$Any;
Object.defineProperty(this, 'jspb$o$google$protobuf$Any', {
  get() { return jspb$o$google$protobuf$Any; },
  set(v) { jspb$o$google$protobuf$Any = v; },
