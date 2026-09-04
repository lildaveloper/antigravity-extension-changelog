// source: devtools/jetski/boq/provisioning_service/proto/provisioning.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$devtools_jetski_provisioning$MutableProvisioningConfig');
goog.provide('jspb$ro.devtools_jetski_provisioning$ReadonlyProvisioningConfig');

goog.require('jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$devtools_jetski_provisioning$ImmutableProvisioningConfig');
goog.requireType('jspb$e.devtools_jetski_provisioning$Product');
goog.requireType('jspb$r$devtools_jetski_provisioning$ProvisioningConfig$internalDoNotUseReader');
goog.requireType('jspb$ro.devtools_jetski_provisioning$ReadonlyAutoRenewalPolicy');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$devtools_jetski_provisioning$ImmutableProvisioningConfig>}
 * @implements {jspb$r$devtools_jetski_provisioning$ProvisioningConfig$internalDoNotUseReader}
 */
jspb$devtools_jetski_provisioning$MutableProvisioningConfig = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional string capsule_accounting_group = 1;
   * @override
   * @return {string}
   */
  getCapsuleAccountingGroup() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 1);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableProvisioningConfig} returns this
   */
  setCapsuleAccountingGroup(value) {
    return jspb_internal_adapters.setStringField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableProvisioningConfig} returns this
   */
  clearCapsuleAccountingGroup() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasCapsuleAccountingGroup() {
    return jspb_internal_adapters.hasStringField(this, 1);
  }


  /**
   * optional string capsule_accounting_group = 1;
   * @override
   * @return {string|undefined}
   */
  getCapsuleAccountingGroupOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 1);
  }


  /**
   * repeated string auto_add_to_groups = 2;
   * @override
   * @param {!jspb_internal_public_for_gencode.DoNotFreezeToken=} freezeOptOut
   * @tsType (freezeOptOut: import('google3/javascript/apps/jspb/internal_public').DoNotFreezeToken): string[]
   * @tsType (): readonly string[]
   * @return {!ReadonlyArray<string>}
   */
  getAutoAddToGroupsList(freezeOptOut) {
    return jspb_internal_adapters.getRepeatedStringField(this, 2, jspb_internal_adapters.getRepeatedFieldReturnType(freezeOptOut));
  }


  /**
   * @param {!ReadonlyArray<string>|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableProvisioningConfig} returns this
   */
  setAutoAddToGroupsList(value) {
    return jspb_internal_adapters.setRepeatedStringField(this, 2, value);
  }


  /**
   * @param {string} value
   * @param {number=} index
   * @return {!jspb$devtools_jetski_provisioning$MutableProvisioningConfig} returns this
   */
  addAutoAddToGroups(value, index) {
    return jspb_internal_adapters.addToRepeatedStringField(this, 2, value, index);
  }


  /**
   * @param {!Iterable<string>} values
   * @return {!jspb$devtools_jetski_provisioning$MutableProvisioningConfig} returns this
   */
  addAllAutoAddToGroups(values) {
    return jspb_internal_adapters.addAllToRepeatedStringField(this, 2, values);
  }


  /**
   * @param {number=} index If not passed, defaults to the end.
   * @return {!jspb$devtools_jetski_provisioning$MutableProvisioningConfig} returns this
   */
  removeAutoAddToGroups(index) {
    return jspb_internal_adapters.removeFromRepeatedStringField(this, 2, index);
  }


  /**
   * Returns value at `index`.
   * @override
   * @param {number} index
   * @return {string}
   */
  getAutoAddToGroups(index) {
   return jspb_internal_adapters.getRepeatedIndexedStringField(this, 2, index);
  }


  /**
   * @param {number} index
   * @param {string} value
   * @return {!jspb$devtools_jetski_provisioning$MutableProvisioningConfig} returns this
   */
  setAutoAddToGroups(index, value) {
    return jspb_internal_adapters.setRepeatedIndexedStringField(this, 2, index, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableProvisioningConfig} returns this
   */
  clearAutoAddToGroupsList() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * Returns the size of this field.
   * @override
   * @return {number}
   */
  getAutoAddToGroupsCount() {
    return jspb_internal_adapters.getRepeatedStringCount(this, 2);
  }


  /**
   * optional string deployment_name = 3;
   * @override
   * @return {string}
   */
  getDeploymentName() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 3);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableProvisioningConfig} returns this
   */
  setDeploymentName(value) {
    return jspb_internal_adapters.setStringField(this, 3, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableProvisioningConfig} returns this
   */
  clearDeploymentName() {
    return jspb_internal_adapters.clearField(this, 3);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasDeploymentName() {
    return jspb_internal_adapters.hasStringField(this, 3);
  }


  /**
   * optional string deployment_name = 3;
   * @override
   * @return {string|undefined}
   */
  getDeploymentNameOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 3);
  }


  /**
   * optional string origin = 4;
   * @override
   * @return {string}
   * @deprecated
   */
  getOrigin() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 4);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableProvisioningConfig} returns this
   * @deprecated
   */
  setOrigin(value) {
    return jspb_internal_adapters.setStringField(this, 4, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableProvisioningConfig} returns this
   * @deprecated
   */
  clearOrigin() {
    return jspb_internal_adapters.clearField(this, 4);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   * @deprecated
   */
  hasOrigin() {
    return jspb_internal_adapters.hasStringField(this, 4);
  }


  /**
   * optional string origin = 4;
   * @override
   * @return {string|undefined}
   * @deprecated
   */
  getOriginOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 4);
  }


  /**
   * optional AutoRenewalPolicy auto_renewal_policy = 5;
   * @override
   * @return {!jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy|undefined}
   */
  getAutoRenewalPolicy() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy, 5);
  }


  /**
   * optional AutoRenewalPolicy auto_renewal_policy = 5;
   * @override
   * @return {!jspb$ro.devtools_jetski_provisioning$ReadonlyAutoRenewalPolicy}
   */
  getReadonlyAutoRenewalPolicy() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy, 5);
  }


  /**
   * optional AutoRenewalPolicy auto_renewal_policy = 5;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy
   */
  getMutableAutoRenewalPolicy(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy, 5, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyAutoRenewalPolicy|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableProvisioningConfig} returns this
   */
  setAutoRenewalPolicy(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy, 5, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableProvisioningConfig} returns this
   */
  clearAutoRenewalPolicy() {
    return jspb_internal_adapters.clearField(this, 5);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasAutoRenewalPolicy() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy, 5);
  }


  /**
   * optional AutoRenewalPolicy auto_renewal_policy = 5;
   * @override
   * @return {!jspb$ro.devtools_jetski_provisioning$ReadonlyAutoRenewalPolicy|undefined}
   */
  getAutoRenewalPolicyOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy, 5);
  }


  /**
   * optional Product product = 6;
   * @override
   * @return {!jspb$e.devtools_jetski_provisioning$Product}
   */
  getProduct() {
    return /** @type {!jspb$e.devtools_jetski_provisioning$Product} */ (jspb_internal_adapters.getEnumFieldWithDefault(this, 6));
  }


  /**
   * @param {!jspb$e.devtools_jetski_provisioning$Product|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableProvisioningConfig} returns this
   */
  setProduct(value) {
    return jspb_internal_adapters.setEnumField(this, 6, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableProvisioningConfig} returns this
   */
  clearProduct() {
    return jspb_internal_adapters.clearField(this, 6);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasProduct() {
    return jspb_internal_adapters.hasEnumField(this, 6);
  }


  /**
   * optional Product product = 6;
   * @override
   * @return {!jspb$e.devtools_jetski_provisioning$Product|undefined}
   */
  getProductOrUndefined() {
    return /** @type {!jspb$e.devtools_jetski_provisioning$Product|undefined} */ (jspb_internal_adapters.getEnumFieldOrUndefined(this, 6));
  }


};

/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$ImmutableProvisioningConfig}
 */
jspb$devtools_jetski_provisioning$MutableProvisioningConfig.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$MutableProvisioningConfig}
 */
jspb$devtools_jetski_provisioning$MutableProvisioningConfig.prototype.clone;
/**
 * @const {function(string):!jspb$devtools_jetski_provisioning$MutableProvisioningConfig}
 */
jspb$devtools_jetski_provisioning$MutableProvisioningConfig.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$devtools_jetski_provisioning$MutableProvisioningConfig));

/**
 * Returns whether the given value is an instance of jspb$devtools_jetski_provisioning$MutableProvisioningConfig.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$devtools_jetski_provisioning$MutableProvisioningConfig>}
 */
jspb$devtools_jetski_provisioning$MutableProvisioningConfig.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$devtools_jetski_provisioning$MutableProvisioningConfig));

/**
 * Object form of ProvisioningConfig as accepted by the `fromObject` method.
 * @typedef {{
 *  capsuleAccountingGroup: (?string|undefined),
 *  autoAddToGroupsList: (?Array<string>|undefined),
 *  deploymentName: (?string|undefined),
 *  origin: (?string|undefined),
 *  autoRenewalPolicy: (?jspb$devtools_jetski_provisioning$MutableAutoRenewalPolicy.ObjectFormat|undefined),
 *  product: (?number|undefined)
 * }}
 */
jspb$devtools_jetski_provisioning$MutableProvisioningConfig.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$devtools_jetski_provisioning$MutableProvisioningConfig.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$devtools_jetski_provisioning$MutableProvisioningConfig.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$devtools_jetski_provisioning$MutableProvisioningConfig.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for devtools_jetski_provisioning$MutableProvisioningConfig.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$devtools_jetski_provisioning$MutableProvisioningConfig.internalDoNotUse_debugOnlyProtoTypeName = "devtools_jetski_provisioning.ProvisioningConfig";
}

/**
 * @typedef {!jspb$devtools_jetski_provisioning$ImmutableProvisioningConfig|!jspb$devtools_jetski_provisioning$MutableProvisioningConfig}
 */
jspb$ro.devtools_jetski_provisioning$ReadonlyProvisioningConfig = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'devtools_jetski_provisioning.ProvisioningConfig'}
   */
  jspb$devtools_jetski_provisioning$MutableProvisioningConfig.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$devtools_jetski_provisioning$MutableProvisioningConfig.displayName = 'proto.devtools_jetski_provisioning.ProvisioningConfig';
}
/**
 * Interface form of ProvisioningConfig as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  capsuleAccountingGroup: (string|undefined),
 *  autoAddToGroupsList: (!ReadonlyArray<string>|undefined),
 *  deploymentName: (string|undefined),
 *  origin: (string|undefined),
 *  autoRenewalPolicy: (!jspb$ro.devtools_jetski_provisioning$ReadonlyAutoRenewalPolicy|undefined),
 *  product: (!jspb$e.devtools_jetski_provisioning$Product|undefined)
 * }}
 */
jspb$devtools_jetski_provisioning$MutableProvisioningConfig.FieldsInterface;

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
 * @param {!jspb$devtools_jetski_provisioning$MutableProvisioningConfig.FieldsInterface} record
 * @return {!jspb$devtools_jetski_provisioning$ImmutableProvisioningConfig}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableProvisioningConfig, ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableProvisioningConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$ImmutableProvisioningConfig
 */
jspb$devtools_jetski_provisioning$MutableProvisioningConfig.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$devtools_jetski_provisioning$MutableProvisioningConfig));

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
 * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyProvisioningConfig} value
 * @return {!jspb$devtools_jetski_provisioning$MutableProvisioningConfig.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.devtools_jetski_provisioning$ReadonlyProvisioningConfig): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableProvisioningConfig, ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableProvisioningConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$devtools_jetski_provisioning$MutableProvisioningConfig.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$b$devtools_jetski_provisioning$ProvisioningConfig;
Object.defineProperty(this, 'jspb$b$devtools_jetski_provisioning$ProvisioningConfig', {
  get() { return jspb$b$devtools_jetski_provisioning$ProvisioningConfig; },
  set(v) { jspb$b$devtools_jetski_provisioning$ProvisioningConfig = v; },
