// source: devtools/jetski/boq/provisioning_service/proto/provisioning.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$devtools_jetski_provisioning$MutableDeployment');
goog.provide('jspb$ro.devtools_jetski_provisioning$ReadonlyDeployment');

goog.require('jspb$devtools_jetski_provisioning$MutableBlueprintBinding');
goog.require('jspb$devtools_jetski_provisioning$MutableDeploymentConfig');
goog.require('jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail');
goog.require('jspb$devtools_jetski_provisioning$MutableInstance');
goog.require('jspb$devtools_jetski_provisioning$MutableInstanceMetrics');
goog.require('jspb$devtools_jetski_provisioning$MutableProvisioningConfig');
goog.require('jspb$google$protobuf$MutableDuration');
goog.require('jspb$google$protobuf$MutableTimestamp');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$devtools_jetski_provisioning$ImmutableDeployment');
goog.requireType('jspb$e.devtools_jetski_provisioning$AutoRenewalEligibility');
goog.requireType('jspb$e.devtools_jetski_provisioning$DeploymentStatus');
goog.requireType('jspb$r$devtools_jetski_provisioning$Deployment$internalDoNotUseReader');
goog.requireType('jspb$ro.devtools_jetski_provisioning$ReadonlyBlueprintBinding');
goog.requireType('jspb$ro.devtools_jetski_provisioning$ReadonlyDeploymentConfig');
goog.requireType('jspb$ro.devtools_jetski_provisioning$ReadonlyDeploymentStatusDetail');
goog.requireType('jspb$ro.devtools_jetski_provisioning$ReadonlyInstance');
goog.requireType('jspb$ro.devtools_jetski_provisioning$ReadonlyInstanceMetrics');
goog.requireType('jspb$ro.devtools_jetski_provisioning$ReadonlyProvisioningConfig');
goog.requireType('jspb$ro.google$protobuf$ReadonlyDuration');
goog.requireType('jspb$ro.google$protobuf$ReadonlyTimestamp');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$devtools_jetski_provisioning$ImmutableDeployment>}
 * @implements {jspb$r$devtools_jetski_provisioning$Deployment$internalDoNotUseReader}
 */
jspb$devtools_jetski_provisioning$MutableDeployment = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional string deployment_id = 1;
   * @override
   * @return {string}
   */
  getDeploymentId() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 1);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  setDeploymentId(value) {
    return jspb_internal_adapters.setStringField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  clearDeploymentId() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasDeploymentId() {
    return jspb_internal_adapters.hasStringField(this, 1);
  }


  /**
   * optional string deployment_id = 1;
   * @override
   * @return {string|undefined}
   */
  getDeploymentIdOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 1);
  }


  /**
   * optional string identity = 8;
   * @override
   * @return {string}
   */
  getIdentity() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 8);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  setIdentity(value) {
    return jspb_internal_adapters.setStringField(this, 8, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  clearIdentity() {
    return jspb_internal_adapters.clearField(this, 8);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasIdentity() {
    return jspb_internal_adapters.hasStringField(this, 8);
  }


  /**
   * optional string identity = 8;
   * @override
   * @return {string|undefined}
   */
  getIdentityOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 8);
  }


  /**
   * optional google.protobuf.Duration lifetime = 10;
   * @override
   * @return {!jspb$google$protobuf$MutableDuration|undefined}
   */
  getLifetime() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$google$protobuf$MutableDuration, 10);
  }


  /**
   * optional google.protobuf.Duration lifetime = 10;
   * @override
   * @return {!jspb$ro.google$protobuf$ReadonlyDuration}
   */
  getReadonlyLifetime() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$google$protobuf$MutableDuration, 10);
  }


  /**
   * optional google.protobuf.Duration lifetime = 10;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$google$protobuf$MutableDuration|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$google$protobuf$MutableDuration') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$google$protobuf$MutableDuration|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$google$protobuf$MutableDuration
   */
  getMutableLifetime(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$google$protobuf$MutableDuration, 10, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.google$protobuf$ReadonlyDuration|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  setLifetime(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$google$protobuf$MutableDuration, 10, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  clearLifetime() {
    return jspb_internal_adapters.clearField(this, 10);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasLifetime() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$google$protobuf$MutableDuration, 10);
  }


  /**
   * optional google.protobuf.Duration lifetime = 10;
   * @override
   * @return {!jspb$ro.google$protobuf$ReadonlyDuration|undefined}
   */
  getLifetimeOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$google$protobuf$MutableDuration, 10);
  }


  /**
   * optional string alias = 15;
   * @override
   * @return {string}
   */
  getAlias() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 15);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  setAlias(value) {
    return jspb_internal_adapters.setStringField(this, 15, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  clearAlias() {
    return jspb_internal_adapters.clearField(this, 15);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasAlias() {
    return jspb_internal_adapters.hasStringField(this, 15);
  }


  /**
   * optional string alias = 15;
   * @override
   * @return {string|undefined}
   */
  getAliasOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 15);
  }


  /**
   * optional DeploymentConfig config = 9;
   * @override
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig|undefined}
   */
  getConfig() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$devtools_jetski_provisioning$MutableDeploymentConfig, 9);
  }


  /**
   * optional DeploymentConfig config = 9;
   * @override
   * @return {!jspb$ro.devtools_jetski_provisioning$ReadonlyDeploymentConfig}
   */
  getReadonlyConfig() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$devtools_jetski_provisioning$MutableDeploymentConfig, 9);
  }


  /**
   * optional DeploymentConfig config = 9;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentConfig|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$devtools_jetski_provisioning$MutableDeploymentConfig') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableDeploymentConfig|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableDeploymentConfig
   */
  getMutableConfig(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$devtools_jetski_provisioning$MutableDeploymentConfig, 9, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyDeploymentConfig|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  setConfig(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$devtools_jetski_provisioning$MutableDeploymentConfig, 9, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  clearConfig() {
    return jspb_internal_adapters.clearField(this, 9);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasConfig() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$devtools_jetski_provisioning$MutableDeploymentConfig, 9);
  }


  /**
   * optional DeploymentConfig config = 9;
   * @override
   * @return {!jspb$ro.devtools_jetski_provisioning$ReadonlyDeploymentConfig|undefined}
   */
  getConfigOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$devtools_jetski_provisioning$MutableDeploymentConfig, 9);
  }


  /**
   * optional BlueprintBinding blueprint_binding = 22;
   * @override
   * @return {!jspb$devtools_jetski_provisioning$MutableBlueprintBinding|undefined}
   */
  getBlueprintBinding() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$devtools_jetski_provisioning$MutableBlueprintBinding, 22);
  }


  /**
   * optional BlueprintBinding blueprint_binding = 22;
   * @override
   * @return {!jspb$ro.devtools_jetski_provisioning$ReadonlyBlueprintBinding}
   */
  getReadonlyBlueprintBinding() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$devtools_jetski_provisioning$MutableBlueprintBinding, 22);
  }


  /**
   * optional BlueprintBinding blueprint_binding = 22;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$devtools_jetski_provisioning$MutableBlueprintBinding|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$devtools_jetski_provisioning$MutableBlueprintBinding') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableBlueprintBinding|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableBlueprintBinding
   */
  getMutableBlueprintBinding(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$devtools_jetski_provisioning$MutableBlueprintBinding, 22, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyBlueprintBinding|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  setBlueprintBinding(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$devtools_jetski_provisioning$MutableBlueprintBinding, 22, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  clearBlueprintBinding() {
    return jspb_internal_adapters.clearField(this, 22);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasBlueprintBinding() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$devtools_jetski_provisioning$MutableBlueprintBinding, 22);
  }


  /**
   * optional BlueprintBinding blueprint_binding = 22;
   * @override
   * @return {!jspb$ro.devtools_jetski_provisioning$ReadonlyBlueprintBinding|undefined}
   */
  getBlueprintBindingOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$devtools_jetski_provisioning$MutableBlueprintBinding, 22);
  }


  /**
   * optional ProvisioningConfig provisioning_config = 24;
   * @override
   * @return {!jspb$devtools_jetski_provisioning$MutableProvisioningConfig|undefined}
   */
  getProvisioningConfig() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$devtools_jetski_provisioning$MutableProvisioningConfig, 24);
  }


  /**
   * optional ProvisioningConfig provisioning_config = 24;
   * @override
   * @return {!jspb$ro.devtools_jetski_provisioning$ReadonlyProvisioningConfig}
   */
  getReadonlyProvisioningConfig() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$devtools_jetski_provisioning$MutableProvisioningConfig, 24);
  }


  /**
   * optional ProvisioningConfig provisioning_config = 24;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$devtools_jetski_provisioning$MutableProvisioningConfig|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$devtools_jetski_provisioning$MutableProvisioningConfig') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableProvisioningConfig|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableProvisioningConfig
   */
  getMutableProvisioningConfig(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$devtools_jetski_provisioning$MutableProvisioningConfig, 24, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyProvisioningConfig|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  setProvisioningConfig(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$devtools_jetski_provisioning$MutableProvisioningConfig, 24, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  clearProvisioningConfig() {
    return jspb_internal_adapters.clearField(this, 24);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasProvisioningConfig() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$devtools_jetski_provisioning$MutableProvisioningConfig, 24);
  }


  /**
   * optional ProvisioningConfig provisioning_config = 24;
   * @override
   * @return {!jspb$ro.devtools_jetski_provisioning$ReadonlyProvisioningConfig|undefined}
   */
  getProvisioningConfigOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$devtools_jetski_provisioning$MutableProvisioningConfig, 24);
  }


  /**
   * optional string display_name = 14;
   * @override
   * @return {string}
   */
  getDisplayName() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 14);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  setDisplayName(value) {
    return jspb_internal_adapters.setStringField(this, 14, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  clearDisplayName() {
    return jspb_internal_adapters.clearField(this, 14);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasDisplayName() {
    return jspb_internal_adapters.hasStringField(this, 14);
  }


  /**
   * optional string display_name = 14;
   * @override
   * @return {string|undefined}
   */
  getDisplayNameOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 14);
  }


  /**
   * repeated string tags = 13;
   * @override
   * @param {!jspb_internal_public_for_gencode.DoNotFreezeToken=} freezeOptOut
   * @tsType (freezeOptOut: import('google3/javascript/apps/jspb/internal_public').DoNotFreezeToken): string[]
   * @tsType (): readonly string[]
   * @return {!ReadonlyArray<string>}
   */
  getTagsList(freezeOptOut) {
    return jspb_internal_adapters.getRepeatedStringField(this, 13, jspb_internal_adapters.getRepeatedFieldReturnType(freezeOptOut));
  }


  /**
   * @param {!ReadonlyArray<string>|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  setTagsList(value) {
    return jspb_internal_adapters.setRepeatedStringField(this, 13, value);
  }


  /**
   * @param {string} value
   * @param {number=} index
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  addTags(value, index) {
    return jspb_internal_adapters.addToRepeatedStringField(this, 13, value, index);
  }


  /**
   * @param {!Iterable<string>} values
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  addAllTags(values) {
    return jspb_internal_adapters.addAllToRepeatedStringField(this, 13, values);
  }


  /**
   * @param {number=} index If not passed, defaults to the end.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  removeTags(index) {
    return jspb_internal_adapters.removeFromRepeatedStringField(this, 13, index);
  }


  /**
   * Returns value at `index`.
   * @override
   * @param {number} index
   * @return {string}
   */
  getTags(index) {
   return jspb_internal_adapters.getRepeatedIndexedStringField(this, 13, index);
  }


  /**
   * @param {number} index
   * @param {string} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  setTags(index, value) {
    return jspb_internal_adapters.setRepeatedIndexedStringField(this, 13, index, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  clearTagsList() {
    return jspb_internal_adapters.clearField(this, 13);
  }


  /**
   * Returns the size of this field.
   * @override
   * @return {number}
   */
  getTagsCount() {
    return jspb_internal_adapters.getRepeatedStringCount(this, 13);
  }


  /**
   * optional string creator = 2;
   * @override
   * @return {string}
   */
  getCreator() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 2);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  setCreator(value) {
    return jspb_internal_adapters.setStringField(this, 2, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  clearCreator() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasCreator() {
    return jspb_internal_adapters.hasStringField(this, 2);
  }


  /**
   * optional string creator = 2;
   * @override
   * @return {string|undefined}
   */
  getCreatorOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 2);
  }


  /**
   * optional string instance_id = 3;
   * @override
   * @return {string}
   */
  getInstanceId() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 3);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  setInstanceId(value) {
    return jspb_internal_adapters.setStringField(this, 3, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  clearInstanceId() {
    return jspb_internal_adapters.clearField(this, 3);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasInstanceId() {
    return jspb_internal_adapters.hasStringField(this, 3);
  }


  /**
   * optional string instance_id = 3;
   * @override
   * @return {string|undefined}
   */
  getInstanceIdOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 3);
  }


  /**
   * optional string instance_fqdn = 4;
   * @override
   * @return {string}
   */
  getInstanceFqdn() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 4);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  setInstanceFqdn(value) {
    return jspb_internal_adapters.setStringField(this, 4, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  clearInstanceFqdn() {
    return jspb_internal_adapters.clearField(this, 4);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasInstanceFqdn() {
    return jspb_internal_adapters.hasStringField(this, 4);
  }


  /**
   * optional string instance_fqdn = 4;
   * @override
   * @return {string|undefined}
   */
  getInstanceFqdnOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 4);
  }


  /**
   * optional DeploymentStatus status = 5;
   * @override
   * @return {!jspb$e.devtools_jetski_provisioning$DeploymentStatus}
   */
  getStatus() {
    return /** @type {!jspb$e.devtools_jetski_provisioning$DeploymentStatus} */ (jspb_internal_adapters.getEnumFieldWithDefault(this, 5));
  }


  /**
   * @param {!jspb$e.devtools_jetski_provisioning$DeploymentStatus|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  setStatus(value) {
    return jspb_internal_adapters.setEnumField(this, 5, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  clearStatus() {
    return jspb_internal_adapters.clearField(this, 5);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasStatus() {
    return jspb_internal_adapters.hasEnumField(this, 5);
  }


  /**
   * optional DeploymentStatus status = 5;
   * @override
   * @return {!jspb$e.devtools_jetski_provisioning$DeploymentStatus|undefined}
   */
  getStatusOrUndefined() {
    return /** @type {!jspb$e.devtools_jetski_provisioning$DeploymentStatus|undefined} */ (jspb_internal_adapters.getEnumFieldOrUndefined(this, 5));
  }


  /**
   * optional google.protobuf.Timestamp create_time = 6;
   * @override
   * @return {!jspb$google$protobuf$MutableTimestamp|undefined}
   */
  getCreateTime() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$google$protobuf$MutableTimestamp, 6);
  }


  /**
   * optional google.protobuf.Timestamp create_time = 6;
   * @override
   * @return {!jspb$ro.google$protobuf$ReadonlyTimestamp}
   */
  getReadonlyCreateTime() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$google$protobuf$MutableTimestamp, 6);
  }


  /**
   * optional google.protobuf.Timestamp create_time = 6;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$google$protobuf$MutableTimestamp|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$google$protobuf$MutableTimestamp') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$google$protobuf$MutableTimestamp|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$google$protobuf$MutableTimestamp
   */
  getMutableCreateTime(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$google$protobuf$MutableTimestamp, 6, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.google$protobuf$ReadonlyTimestamp|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  setCreateTime(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$google$protobuf$MutableTimestamp, 6, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  clearCreateTime() {
    return jspb_internal_adapters.clearField(this, 6);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasCreateTime() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$google$protobuf$MutableTimestamp, 6);
  }


  /**
   * optional google.protobuf.Timestamp create_time = 6;
   * @override
   * @return {!jspb$ro.google$protobuf$ReadonlyTimestamp|undefined}
   */
  getCreateTimeOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$google$protobuf$MutableTimestamp, 6);
  }


  /**
   * optional google.protobuf.Timestamp update_time = 26;
   * @override
   * @return {!jspb$google$protobuf$MutableTimestamp|undefined}
   */
  getUpdateTime() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$google$protobuf$MutableTimestamp, 26);
  }


  /**
   * optional google.protobuf.Timestamp update_time = 26;
   * @override
   * @return {!jspb$ro.google$protobuf$ReadonlyTimestamp}
   */
  getReadonlyUpdateTime() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$google$protobuf$MutableTimestamp, 26);
  }


  /**
   * optional google.protobuf.Timestamp update_time = 26;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$google$protobuf$MutableTimestamp|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$google$protobuf$MutableTimestamp') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$google$protobuf$MutableTimestamp|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$google$protobuf$MutableTimestamp
   */
  getMutableUpdateTime(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$google$protobuf$MutableTimestamp, 26, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.google$protobuf$ReadonlyTimestamp|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  setUpdateTime(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$google$protobuf$MutableTimestamp, 26, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  clearUpdateTime() {
    return jspb_internal_adapters.clearField(this, 26);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasUpdateTime() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$google$protobuf$MutableTimestamp, 26);
  }


  /**
   * optional google.protobuf.Timestamp update_time = 26;
   * @override
   * @return {!jspb$ro.google$protobuf$ReadonlyTimestamp|undefined}
   */
  getUpdateTimeOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$google$protobuf$MutableTimestamp, 26);
  }


  /**
   * optional string last_updated_by = 27;
   * @override
   * @return {string}
   */
  getLastUpdatedBy() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 27);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  setLastUpdatedBy(value) {
    return jspb_internal_adapters.setStringField(this, 27, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  clearLastUpdatedBy() {
    return jspb_internal_adapters.clearField(this, 27);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasLastUpdatedBy() {
    return jspb_internal_adapters.hasStringField(this, 27);
  }


  /**
   * optional string last_updated_by = 27;
   * @override
   * @return {string|undefined}
   */
  getLastUpdatedByOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 27);
  }


  /**
   * optional google.protobuf.Timestamp expiry_time = 7;
   * @override
   * @return {!jspb$google$protobuf$MutableTimestamp|undefined}
   */
  getExpiryTime() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$google$protobuf$MutableTimestamp, 7);
  }


  /**
   * optional google.protobuf.Timestamp expiry_time = 7;
   * @override
   * @return {!jspb$ro.google$protobuf$ReadonlyTimestamp}
   */
  getReadonlyExpiryTime() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$google$protobuf$MutableTimestamp, 7);
  }


  /**
   * optional google.protobuf.Timestamp expiry_time = 7;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$google$protobuf$MutableTimestamp|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$google$protobuf$MutableTimestamp') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$google$protobuf$MutableTimestamp|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$google$protobuf$MutableTimestamp
   */
  getMutableExpiryTime(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$google$protobuf$MutableTimestamp, 7, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.google$protobuf$ReadonlyTimestamp|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  setExpiryTime(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$google$protobuf$MutableTimestamp, 7, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  clearExpiryTime() {
    return jspb_internal_adapters.clearField(this, 7);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasExpiryTime() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$google$protobuf$MutableTimestamp, 7);
  }


  /**
   * optional google.protobuf.Timestamp expiry_time = 7;
   * @override
   * @return {!jspb$ro.google$protobuf$ReadonlyTimestamp|undefined}
   */
  getExpiryTimeOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$google$protobuf$MutableTimestamp, 7);
  }


  /**
   * optional int32 jetski_port = 11;
   * @override
   * @return {number}
   */
  getJetskiPort() {
    return jspb_internal_adapters.getInt32FieldWithDefault(this, 11);
  }


  /**
   * @param {number|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  setJetskiPort(value) {
    return jspb_internal_adapters.setInt32Field(this, 11, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  clearJetskiPort() {
    return jspb_internal_adapters.clearField(this, 11);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasJetskiPort() {
    return jspb_internal_adapters.hasInt32Field(this, 11);
  }


  /**
   * optional int32 jetski_port = 11;
   * @override
   * @return {number|undefined}
   */
  getJetskiPortOrUndefined() {
    return jspb_internal_adapters.getInt32FieldOrUndefined(this, 11);
  }


  /**
   * optional string jetski_csrf_token = 20;
   * @override
   * @return {string}
   */
  getJetskiCsrfToken() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 20);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  setJetskiCsrfToken(value) {
    return jspb_internal_adapters.setStringField(this, 20, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  clearJetskiCsrfToken() {
    return jspb_internal_adapters.clearField(this, 20);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasJetskiCsrfToken() {
    return jspb_internal_adapters.hasStringField(this, 20);
  }


  /**
   * optional string jetski_csrf_token = 20;
   * @override
   * @return {string|undefined}
   */
  getJetskiCsrfTokenOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 20);
  }


  /**
   * optional google.protobuf.Timestamp instance_expiry_time = 16;
   * @override
   * @return {!jspb$google$protobuf$MutableTimestamp|undefined}
   */
  getInstanceExpiryTime() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$google$protobuf$MutableTimestamp, 16);
  }


  /**
   * optional google.protobuf.Timestamp instance_expiry_time = 16;
   * @override
   * @return {!jspb$ro.google$protobuf$ReadonlyTimestamp}
   */
  getReadonlyInstanceExpiryTime() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$google$protobuf$MutableTimestamp, 16);
  }


  /**
   * optional google.protobuf.Timestamp instance_expiry_time = 16;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$google$protobuf$MutableTimestamp|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$google$protobuf$MutableTimestamp') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$google$protobuf$MutableTimestamp|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$google$protobuf$MutableTimestamp
   */
  getMutableInstanceExpiryTime(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$google$protobuf$MutableTimestamp, 16, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.google$protobuf$ReadonlyTimestamp|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  setInstanceExpiryTime(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$google$protobuf$MutableTimestamp, 16, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  clearInstanceExpiryTime() {
    return jspb_internal_adapters.clearField(this, 16);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasInstanceExpiryTime() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$google$protobuf$MutableTimestamp, 16);
  }


  /**
   * optional google.protobuf.Timestamp instance_expiry_time = 16;
   * @override
   * @return {!jspb$ro.google$protobuf$ReadonlyTimestamp|undefined}
   */
  getInstanceExpiryTimeOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$google$protobuf$MutableTimestamp, 16);
  }


  /**
   * optional google.protobuf.Timestamp last_checkin_time = 17;
   * @override
   * @return {!jspb$google$protobuf$MutableTimestamp|undefined}
   */
  getLastCheckinTime() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$google$protobuf$MutableTimestamp, 17);
  }


  /**
   * optional google.protobuf.Timestamp last_checkin_time = 17;
   * @override
   * @return {!jspb$ro.google$protobuf$ReadonlyTimestamp}
   */
  getReadonlyLastCheckinTime() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$google$protobuf$MutableTimestamp, 17);
  }


  /**
   * optional google.protobuf.Timestamp last_checkin_time = 17;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$google$protobuf$MutableTimestamp|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$google$protobuf$MutableTimestamp') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$google$protobuf$MutableTimestamp|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$google$protobuf$MutableTimestamp
   */
  getMutableLastCheckinTime(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$google$protobuf$MutableTimestamp, 17, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.google$protobuf$ReadonlyTimestamp|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  setLastCheckinTime(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$google$protobuf$MutableTimestamp, 17, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  clearLastCheckinTime() {
    return jspb_internal_adapters.clearField(this, 17);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasLastCheckinTime() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$google$protobuf$MutableTimestamp, 17);
  }


  /**
   * optional google.protobuf.Timestamp last_checkin_time = 17;
   * @override
   * @return {!jspb$ro.google$protobuf$ReadonlyTimestamp|undefined}
   */
  getLastCheckinTimeOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$google$protobuf$MutableTimestamp, 17);
  }


  /**
   * optional InstanceMetrics metrics = 23;
   * @override
   * @return {!jspb$devtools_jetski_provisioning$MutableInstanceMetrics|undefined}
   */
  getMetrics() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$devtools_jetski_provisioning$MutableInstanceMetrics, 23);
  }


  /**
   * optional InstanceMetrics metrics = 23;
   * @override
   * @return {!jspb$ro.devtools_jetski_provisioning$ReadonlyInstanceMetrics}
   */
  getReadonlyMetrics() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$devtools_jetski_provisioning$MutableInstanceMetrics, 23);
  }


  /**
   * optional InstanceMetrics metrics = 23;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$devtools_jetski_provisioning$MutableInstanceMetrics|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$devtools_jetski_provisioning$MutableInstanceMetrics') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableInstanceMetrics|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableInstanceMetrics
   */
  getMutableMetrics(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$devtools_jetski_provisioning$MutableInstanceMetrics, 23, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyInstanceMetrics|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  setMetrics(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$devtools_jetski_provisioning$MutableInstanceMetrics, 23, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  clearMetrics() {
    return jspb_internal_adapters.clearField(this, 23);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasMetrics() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$devtools_jetski_provisioning$MutableInstanceMetrics, 23);
  }


  /**
   * optional InstanceMetrics metrics = 23;
   * @override
   * @return {!jspb$ro.devtools_jetski_provisioning$ReadonlyInstanceMetrics|undefined}
   */
  getMetricsOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$devtools_jetski_provisioning$MutableInstanceMetrics, 23);
  }


  /**
   * optional int32 desired_replicas = 18;
   * @override
   * @return {number}
   */
  getDesiredReplicas() {
    return jspb_internal_adapters.getInt32FieldWithDefault(this, 18);
  }


  /**
   * @param {number|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  setDesiredReplicas(value) {
    return jspb_internal_adapters.setInt32Field(this, 18, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  clearDesiredReplicas() {
    return jspb_internal_adapters.clearField(this, 18);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasDesiredReplicas() {
    return jspb_internal_adapters.hasInt32Field(this, 18);
  }


  /**
   * optional int32 desired_replicas = 18;
   * @override
   * @return {number|undefined}
   */
  getDesiredReplicasOrUndefined() {
    return jspb_internal_adapters.getInt32FieldOrUndefined(this, 18);
  }


  /**
   * repeated Instance instances = 19;
   * @param {!jspb_internal_public_for_gencode.DoNotFreezeToken=} freezeOptOut
   * @tsType (freezeOptOut: import('google3/javascript/apps/jspb/internal_public').DoNotFreezeToken): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableInstance[]
   * @tsType (): readonly ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableInstance[]
   * @override
   * @return {!ReadonlyArray<!jspb$devtools_jetski_provisioning$MutableInstance>}
   */
  getInstancesList(freezeOptOut) {
    return jspb_internal_adapters.getRepeatedWrapperField(this, jspb$devtools_jetski_provisioning$MutableInstance, 19, jspb_internal_adapters.getRepeatedFieldReturnType(freezeOptOut));
  }


  /**
   * repeated Instance instances = 19;
   * @override
   * @return {!ReadonlyArray<!jspb$ro.devtools_jetski_provisioning$ReadonlyInstance>}
   */
  getReadonlyInstancesList() {
    return jspb_internal_adapters.getReadonlyRepeatedWrapperField(this, jspb$devtools_jetski_provisioning$MutableInstance, 19);
  }


  /**
   * @param {!ReadonlyArray<!jspb$ro.devtools_jetski_provisioning$ReadonlyInstance>|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  setInstancesList(value) {
    return jspb_internal_adapters.setRepeatedWrapperField(this, jspb$devtools_jetski_provisioning$MutableInstance, 19, value);
  }


  /**
   * Gets mutable repeated field reference.
   * @param {number} index
   * @return {!jspb$devtools_jetski_provisioning$MutableInstance}
   */
  getMutableInstances(index) {
    return jspb_internal_adapters.getRepeatedIndexedMutableWrapper(this, 19, jspb$devtools_jetski_provisioning$MutableInstance, index);
  }


  /**
   * Gets readonly repeated field reference.
   * @override
   * @param {number} index
   * @return {!jspb$ro.devtools_jetski_provisioning$ReadonlyInstance}
   */
  getReadonlyInstances(index) {
    return jspb_internal_adapters.getRepeatedIndexedReadonlyWrapper(this, 19, jspb$devtools_jetski_provisioning$MutableInstance, index);
  }


  /**
   * Adds repeated field and returns `this`.
   * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyInstance} value
   * @param {number=} index
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  addInstances(value, index) {
    return jspb_internal_adapters.addToRepeatedWrapperField(this, 19, jspb$devtools_jetski_provisioning$MutableInstance, value, index);
  }


  /**
   * Adds repeated field and returns newly added submessage.
   * @param {!jspb$devtools_jetski_provisioning$MutableInstance=} value
   * @param {number=} index
   * @return {!jspb$devtools_jetski_provisioning$MutableInstance} the value that was added
   */
  addAndReturnInstances(value, index) {
    return jspb_internal_adapters.addAndReturnRepeatedWrapperField(this, 19, jspb$devtools_jetski_provisioning$MutableInstance, value, index);
  }


  /**
   * Adds multiple values to a repeated field and returns `this`.
   * @param {!Iterable<!jspb$ro.devtools_jetski_provisioning$ReadonlyInstance>} values
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  addAllInstances(values) {
    return jspb_internal_adapters.addAllToRepeatedWrapperField(this, 19, jspb$devtools_jetski_provisioning$MutableInstance, values);
  }


  /**
   * Sets repeated field value at `index` and returns `this`.
   * @param {number} index
   * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyInstance} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  setInstances(index, value) {
    return jspb_internal_adapters.setRepeatedIndexedWrapper(this, 19, jspb$devtools_jetski_provisioning$MutableInstance, index, value);
  }


  /**
   * Removes a value from a repeated field and returns `this`.
   * @param {number=} index defaults to the end
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  removeInstances(index) {
    return jspb_internal_adapters.removeFromRepeatedWrapperField(this, 19, jspb$devtools_jetski_provisioning$MutableInstance, index);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  clearInstancesList() {
    return jspb_internal_adapters.clearField(this, 19);
  }


  /**
   * Returns the size of this field.
   * @override
   * @return {number}
   */
  getInstancesCount() {
    return jspb_internal_adapters.getRepeatedWrapperCount(this, jspb$devtools_jetski_provisioning$MutableInstance, 19);
  }


  /**
   * optional AutoRenewalEligibility auto_renewal_eligibility = 28;
   * @override
   * @return {!jspb$e.devtools_jetski_provisioning$AutoRenewalEligibility}
   */
  getAutoRenewalEligibility() {
    return /** @type {!jspb$e.devtools_jetski_provisioning$AutoRenewalEligibility} */ (jspb_internal_adapters.getEnumFieldWithDefault(this, 28));
  }


  /**
   * @param {!jspb$e.devtools_jetski_provisioning$AutoRenewalEligibility|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  setAutoRenewalEligibility(value) {
    return jspb_internal_adapters.setEnumField(this, 28, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  clearAutoRenewalEligibility() {
    return jspb_internal_adapters.clearField(this, 28);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasAutoRenewalEligibility() {
    return jspb_internal_adapters.hasEnumField(this, 28);
  }


  /**
   * optional AutoRenewalEligibility auto_renewal_eligibility = 28;
   * @override
   * @return {!jspb$e.devtools_jetski_provisioning$AutoRenewalEligibility|undefined}
   */
  getAutoRenewalEligibilityOrUndefined() {
    return /** @type {!jspb$e.devtools_jetski_provisioning$AutoRenewalEligibility|undefined} */ (jspb_internal_adapters.getEnumFieldOrUndefined(this, 28));
  }


  /**
   * optional float uptime7d = 29;
   * @override
   * @return {number}
   */
  getUptime7d() {
    return jspb_internal_adapters.getFloatingPointFieldWithDefault(this, 29);
  }


  /**
   * @param {number|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  setUptime7d(value) {
    return jspb_internal_adapters.setFloatingPointField(this, 29, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  clearUptime7d() {
    return jspb_internal_adapters.clearField(this, 29);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasUptime7d() {
    return jspb_internal_adapters.hasFloatingPointField(this, 29);
  }


  /**
   * optional float uptime7d = 29;
   * @override
   * @return {number|undefined}
   */
  getUptime7dOrUndefined() {
    return jspb_internal_adapters.getFloatingPointFieldOrUndefined(this, 29);
  }


  /**
   * optional DeploymentStatusDetail status_detail = 30;
   * @override
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail|undefined}
   */
  getStatusDetail() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail, 30);
  }


  /**
   * optional DeploymentStatusDetail status_detail = 30;
   * @override
   * @return {!jspb$ro.devtools_jetski_provisioning$ReadonlyDeploymentStatusDetail}
   */
  getReadonlyStatusDetail() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail, 30);
  }


  /**
   * optional DeploymentStatusDetail status_detail = 30;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail
   */
  getMutableStatusDetail(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail, 30, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyDeploymentStatusDetail|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  setStatusDetail(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail, 30, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableDeployment} returns this
   */
  clearStatusDetail() {
    return jspb_internal_adapters.clearField(this, 30);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasStatusDetail() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail, 30);
  }


  /**
   * optional DeploymentStatusDetail status_detail = 30;
   * @override
   * @return {!jspb$ro.devtools_jetski_provisioning$ReadonlyDeploymentStatusDetail|undefined}
   */
  getStatusDetailOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail, 30);
  }


};

/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$ImmutableDeployment}
 */
jspb$devtools_jetski_provisioning$MutableDeployment.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$MutableDeployment}
 */
jspb$devtools_jetski_provisioning$MutableDeployment.prototype.clone;
/**
 * @const {function(string):!jspb$devtools_jetski_provisioning$MutableDeployment}
 */
jspb$devtools_jetski_provisioning$MutableDeployment.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$devtools_jetski_provisioning$MutableDeployment));

/**
 * Returns whether the given value is an instance of jspb$devtools_jetski_provisioning$MutableDeployment.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$devtools_jetski_provisioning$MutableDeployment>}
 */
jspb$devtools_jetski_provisioning$MutableDeployment.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$devtools_jetski_provisioning$MutableDeployment));

/**
 * Object form of Deployment as accepted by the `fromObject` method.
 * @typedef {{
 *  deploymentId: (?string|undefined),
 *  identity: (?string|undefined),
 *  lifetime: (?jspb$google$protobuf$MutableDuration.ObjectFormat|undefined),
 *  alias: (?string|undefined),
 *  config: (?jspb$devtools_jetski_provisioning$MutableDeploymentConfig.ObjectFormat|undefined),
 *  blueprintBinding: (?jspb$devtools_jetski_provisioning$MutableBlueprintBinding.ObjectFormat|undefined),
 *  provisioningConfig: (?jspb$devtools_jetski_provisioning$MutableProvisioningConfig.ObjectFormat|undefined),
 *  displayName: (?string|undefined),
 *  tagsList: (?Array<string>|undefined),
 *  creator: (?string|undefined),
 *  instanceId: (?string|undefined),
 *  instanceFqdn: (?string|undefined),
 *  status: (?number|undefined),
 *  createTime: (?jspb$google$protobuf$MutableTimestamp.ObjectFormat|undefined),
 *  updateTime: (?jspb$google$protobuf$MutableTimestamp.ObjectFormat|undefined),
 *  lastUpdatedBy: (?string|undefined),
 *  expiryTime: (?jspb$google$protobuf$MutableTimestamp.ObjectFormat|undefined),
 *  jetskiPort: (?number|undefined),
 *  jetskiCsrfToken: (?string|undefined),
 *  instanceExpiryTime: (?jspb$google$protobuf$MutableTimestamp.ObjectFormat|undefined),
 *  lastCheckinTime: (?jspb$google$protobuf$MutableTimestamp.ObjectFormat|undefined),
 *  metrics: (?jspb$devtools_jetski_provisioning$MutableInstanceMetrics.ObjectFormat|undefined),
 *  desiredReplicas: (?number|undefined),
 *  instancesList: (?Array<!jspb$devtools_jetski_provisioning$MutableInstance.ObjectFormat>|undefined),
 *  autoRenewalEligibility: (?number|undefined),
 *  uptime7d: (?number|undefined),
 *  statusDetail: (?jspb$devtools_jetski_provisioning$MutableDeploymentStatusDetail.ObjectFormat|undefined)
 * }}
 */
jspb$devtools_jetski_provisioning$MutableDeployment.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$devtools_jetski_provisioning$MutableDeployment.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$devtools_jetski_provisioning$MutableDeployment.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$devtools_jetski_provisioning$MutableDeployment.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for devtools_jetski_provisioning$MutableDeployment.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$devtools_jetski_provisioning$MutableDeployment.internalDoNotUse_debugOnlyProtoTypeName = "devtools_jetski_provisioning.Deployment";
}

/**
 * @typedef {!jspb$devtools_jetski_provisioning$ImmutableDeployment|!jspb$devtools_jetski_provisioning$MutableDeployment}
 */
jspb$ro.devtools_jetski_provisioning$ReadonlyDeployment = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'devtools_jetski_provisioning.Deployment'}
   */
  jspb$devtools_jetski_provisioning$MutableDeployment.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$devtools_jetski_provisioning$MutableDeployment.displayName = 'proto.devtools_jetski_provisioning.Deployment';
}
/**
 * Interface form of Deployment as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  deploymentId: (string|undefined),
 *  identity: (string|undefined),
 *  lifetime: (!jspb$ro.google$protobuf$ReadonlyDuration|undefined),
 *  alias: (string|undefined),
 *  config: (!jspb$ro.devtools_jetski_provisioning$ReadonlyDeploymentConfig|undefined),
 *  blueprintBinding: (!jspb$ro.devtools_jetski_provisioning$ReadonlyBlueprintBinding|undefined),
 *  provisioningConfig: (!jspb$ro.devtools_jetski_provisioning$ReadonlyProvisioningConfig|undefined),
 *  displayName: (string|undefined),
 *  tagsList: (!ReadonlyArray<string>|undefined),
 *  creator: (string|undefined),
 *  instanceId: (string|undefined),
 *  instanceFqdn: (string|undefined),
 *  status: (!jspb$e.devtools_jetski_provisioning$DeploymentStatus|undefined),
 *  createTime: (!jspb$ro.google$protobuf$ReadonlyTimestamp|undefined),
 *  updateTime: (!jspb$ro.google$protobuf$ReadonlyTimestamp|undefined),
 *  lastUpdatedBy: (string|undefined),
 *  expiryTime: (!jspb$ro.google$protobuf$ReadonlyTimestamp|undefined),
 *  jetskiPort: (number|undefined),
 *  jetskiCsrfToken: (string|undefined),
 *  instanceExpiryTime: (!jspb$ro.google$protobuf$ReadonlyTimestamp|undefined),
 *  lastCheckinTime: (!jspb$ro.google$protobuf$ReadonlyTimestamp|undefined),
 *  metrics: (!jspb$ro.devtools_jetski_provisioning$ReadonlyInstanceMetrics|undefined),
 *  desiredReplicas: (number|undefined),
 *  instancesList: (!ReadonlyArray<!jspb$ro.devtools_jetski_provisioning$ReadonlyInstance>|undefined),
 *  autoRenewalEligibility: (!jspb$e.devtools_jetski_provisioning$AutoRenewalEligibility|undefined),
 *  uptime7d: (number|undefined),
 *  statusDetail: (!jspb$ro.devtools_jetski_provisioning$ReadonlyDeploymentStatusDetail|undefined)
 * }}
 */
jspb$devtools_jetski_provisioning$MutableDeployment.FieldsInterface;

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
 * @param {!jspb$devtools_jetski_provisioning$MutableDeployment.FieldsInterface} record
 * @return {!jspb$devtools_jetski_provisioning$ImmutableDeployment}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableDeployment, ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableDeployment.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$ImmutableDeployment
 */
jspb$devtools_jetski_provisioning$MutableDeployment.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$devtools_jetski_provisioning$MutableDeployment));

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
 * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyDeployment} value
 * @return {!jspb$devtools_jetski_provisioning$MutableDeployment.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.devtools_jetski_provisioning$ReadonlyDeployment): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableDeployment, ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableDeployment.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$devtools_jetski_provisioning$MutableDeployment.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$b$devtools_jetski_provisioning$Deployment;
Object.defineProperty(this, 'jspb$b$devtools_jetski_provisioning$Deployment', {
  get() { return jspb$b$devtools_jetski_provisioning$Deployment; },
  set(v) { jspb$b$devtools_jetski_provisioning$Deployment = v; },
