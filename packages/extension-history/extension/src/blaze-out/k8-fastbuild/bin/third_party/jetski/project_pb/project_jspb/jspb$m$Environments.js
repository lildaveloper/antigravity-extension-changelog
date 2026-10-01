// source: third_party/jetski/project_pb/project.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$exa$project_pb$MutableEnvironments');
goog.provide('jspb$ro.exa$project_pb$ReadonlyEnvironments');

goog.require('jspb$exa$project_pb$MutableEnvironment');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$exa$project_pb$ImmutableEnvironments');
goog.requireType('jspb$r$exa$project_pb$Environments$internalDoNotUseReader');
goog.requireType('jspb$ro.exa$project_pb$ReadonlyEnvironment');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$exa$project_pb$ImmutableEnvironments>}
 * @implements {jspb$r$exa$project_pb$Environments$internalDoNotUseReader}
 */
jspb$exa$project_pb$MutableEnvironments = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * repeated Environment environments = 1;
   * @param {!jspb_internal_public_for_gencode.DoNotFreezeToken=} freezeOptOut
   * @tsType (freezeOptOut: import('google3/javascript/apps/jspb/internal_public').DoNotFreezeToken): ಠ_ಠ.clutz.jspb$exa$project_pb$MutableEnvironment[]
   * @tsType (): readonly ಠ_ಠ.clutz.jspb$exa$project_pb$MutableEnvironment[]
   * @override
   * @return {!ReadonlyArray<!jspb$exa$project_pb$MutableEnvironment>}
   */
  getEnvironmentsList(freezeOptOut) {
    return jspb_internal_adapters.getRepeatedWrapperField(this, jspb$exa$project_pb$MutableEnvironment, 1, jspb_internal_adapters.getRepeatedFieldReturnType(freezeOptOut));
  }


  /**
   * repeated Environment environments = 1;
   * @override
   * @return {!ReadonlyArray<!jspb$ro.exa$project_pb$ReadonlyEnvironment>}
   */
  getReadonlyEnvironmentsList() {
    return jspb_internal_adapters.getReadonlyRepeatedWrapperField(this, jspb$exa$project_pb$MutableEnvironment, 1);
  }


  /**
   * @param {!ReadonlyArray<!jspb$ro.exa$project_pb$ReadonlyEnvironment>|null|undefined} value
   * @return {!jspb$exa$project_pb$MutableEnvironments} returns this
   */
  setEnvironmentsList(value) {
    return jspb_internal_adapters.setRepeatedWrapperField(this, jspb$exa$project_pb$MutableEnvironment, 1, value);
  }


  /**
   * Gets mutable repeated field reference.
   * @param {number} index
   * @return {!jspb$exa$project_pb$MutableEnvironment}
   */
  getMutableEnvironments(index) {
    return jspb_internal_adapters.getRepeatedIndexedMutableWrapper(this, 1, jspb$exa$project_pb$MutableEnvironment, index);
  }


  /**
   * Gets readonly repeated field reference.
   * @override
   * @param {number} index
   * @return {!jspb$ro.exa$project_pb$ReadonlyEnvironment}
   */
  getReadonlyEnvironments(index) {
    return jspb_internal_adapters.getRepeatedIndexedReadonlyWrapper(this, 1, jspb$exa$project_pb$MutableEnvironment, index);
  }


  /**
   * Adds repeated field and returns `this`.
   * @param {!jspb$ro.exa$project_pb$ReadonlyEnvironment} value
   * @param {number=} index
   * @return {!jspb$exa$project_pb$MutableEnvironments} returns this
   */
  addEnvironments(value, index) {
    return jspb_internal_adapters.addToRepeatedWrapperField(this, 1, jspb$exa$project_pb$MutableEnvironment, value, index);
  }


  /**
   * Adds repeated field and returns newly added submessage.
   * @param {!jspb$exa$project_pb$MutableEnvironment=} value
   * @param {number=} index
   * @return {!jspb$exa$project_pb$MutableEnvironment} the value that was added
   */
  addAndReturnEnvironments(value, index) {
    return jspb_internal_adapters.addAndReturnRepeatedWrapperField(this, 1, jspb$exa$project_pb$MutableEnvironment, value, index);
  }


  /**
   * Adds multiple values to a repeated field and returns `this`.
   * @param {!Iterable<!jspb$ro.exa$project_pb$ReadonlyEnvironment>} values
   * @return {!jspb$exa$project_pb$MutableEnvironments} returns this
   */
  addAllEnvironments(values) {
    return jspb_internal_adapters.addAllToRepeatedWrapperField(this, 1, jspb$exa$project_pb$MutableEnvironment, values);
  }


  /**
   * Sets repeated field value at `index` and returns `this`.
   * @param {number} index
   * @param {!jspb$ro.exa$project_pb$ReadonlyEnvironment} value
   * @return {!jspb$exa$project_pb$MutableEnvironments} returns this
   */
  setEnvironments(index, value) {
    return jspb_internal_adapters.setRepeatedIndexedWrapper(this, 1, jspb$exa$project_pb$MutableEnvironment, index, value);
  }


  /**
   * Removes a value from a repeated field and returns `this`.
   * @param {number=} index defaults to the end
   * @return {!jspb$exa$project_pb$MutableEnvironments} returns this
   */
  removeEnvironments(index) {
    return jspb_internal_adapters.removeFromRepeatedWrapperField(this, 1, jspb$exa$project_pb$MutableEnvironment, index);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$project_pb$MutableEnvironments} returns this
   */
  clearEnvironmentsList() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * Returns the size of this field.
   * @override
   * @return {number}
   */
  getEnvironmentsCount() {
    return jspb_internal_adapters.getRepeatedWrapperCount(this, jspb$exa$project_pb$MutableEnvironment, 1);
  }


};

/**
 * @override
 * @return {!jspb$exa$project_pb$ImmutableEnvironments}
 */
jspb$exa$project_pb$MutableEnvironments.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$exa$project_pb$MutableEnvironments}
 */
jspb$exa$project_pb$MutableEnvironments.prototype.clone;
/**
 * @const {function(string):!jspb$exa$project_pb$MutableEnvironments}
 */
jspb$exa$project_pb$MutableEnvironments.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$exa$project_pb$MutableEnvironments));

/**
 * Returns whether the given value is an instance of jspb$exa$project_pb$MutableEnvironments.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$exa$project_pb$MutableEnvironments>}
 */
jspb$exa$project_pb$MutableEnvironments.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$exa$project_pb$MutableEnvironments));

/**
 * Object form of Environments as accepted by the `fromObject` method.
 * @typedef {{
 *  environmentsList: (?Array<!jspb$exa$project_pb$MutableEnvironment.ObjectFormat>|undefined)
 * }}
 */
jspb$exa$project_pb$MutableEnvironments.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$exa$project_pb$MutableEnvironments.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$exa$project_pb$MutableEnvironments.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$exa$project_pb$MutableEnvironments.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for exa$project_pb$MutableEnvironments.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$exa$project_pb$MutableEnvironments.internalDoNotUse_debugOnlyProtoTypeName = "exa.project_pb.Environments";
}

/**
 * @typedef {!jspb$exa$project_pb$ImmutableEnvironments|!jspb$exa$project_pb$MutableEnvironments}
 */
jspb$ro.exa$project_pb$ReadonlyEnvironments = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'exa.project_pb.Environments'}
   */
  jspb$exa$project_pb$MutableEnvironments.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$exa$project_pb$MutableEnvironments.displayName = 'proto.exa.project_pb.Environments';
}
/**
 * Interface form of Environments as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  environmentsList: (!ReadonlyArray<!jspb$ro.exa$project_pb$ReadonlyEnvironment>|undefined)
 * }}
 */
jspb$exa$project_pb$MutableEnvironments.FieldsInterface;

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
 * @param {!jspb$exa$project_pb$MutableEnvironments.FieldsInterface} record
 * @return {!jspb$exa$project_pb$ImmutableEnvironments}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$exa$project_pb$MutableEnvironments, ಠ_ಠ.clutz.jspb$exa$project_pb$MutableEnvironments.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$exa$project_pb$ImmutableEnvironments
 */
jspb$exa$project_pb$MutableEnvironments.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$exa$project_pb$MutableEnvironments));

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
 * @param {!jspb$ro.exa$project_pb$ReadonlyEnvironments} value
 * @return {!jspb$exa$project_pb$MutableEnvironments.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.exa$project_pb$ReadonlyEnvironments): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$exa$project_pb$MutableEnvironments, ಠ_ಠ.clutz.jspb$exa$project_pb$MutableEnvironments.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$exa$project_pb$MutableEnvironments.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$exa$project_pb$MutablePermissionGrants;
Object.defineProperty(this, 'jspb$exa$project_pb$MutablePermissionGrants', {
  get() { return jspb$exa$project_pb$MutablePermissionGrants; },
  set(v) { jspb$exa$project_pb$MutablePermissionGrants = v; },
