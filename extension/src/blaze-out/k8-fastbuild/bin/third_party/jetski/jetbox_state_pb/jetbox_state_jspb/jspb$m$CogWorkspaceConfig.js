// source: third_party/jetski/jetbox_state_pb/jetbox_state.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$jetbox_state_pb$MutableCogWorkspaceConfig');
goog.provide('jspb$ro.jetbox_state_pb$ReadonlyCogWorkspaceConfig');

goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$jetbox_state_pb$ImmutableCogWorkspaceConfig');
goog.requireType('jspb$r$jetbox_state_pb$CogWorkspaceConfig$internalDoNotUseReader');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$jetbox_state_pb$ImmutableCogWorkspaceConfig>}
 * @implements {jspb$r$jetbox_state_pb$CogWorkspaceConfig$internalDoNotUseReader}
 */
jspb$jetbox_state_pb$MutableCogWorkspaceConfig = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional string repo_name = 1;
   * @override
   * @return {string}
   */
  getRepoName() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 1);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableCogWorkspaceConfig} returns this
   */
  setRepoName(value) {
    return jspb_internal_adapters.setStringField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableCogWorkspaceConfig} returns this
   */
  clearRepoName() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasRepoName() {
    return jspb_internal_adapters.hasStringField(this, 1);
  }


  /**
   * optional string repo_name = 1;
   * @override
   * @return {string|undefined}
   */
  getRepoNameOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 1);
  }


  /**
   * optional string branch_name = 2;
   * @override
   * @return {string}
   */
  getBranchName() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 2);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableCogWorkspaceConfig} returns this
   */
  setBranchName(value) {
    return jspb_internal_adapters.setStringField(this, 2, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableCogWorkspaceConfig} returns this
   */
  clearBranchName() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasBranchName() {
    return jspb_internal_adapters.hasStringField(this, 2);
  }


  /**
   * optional string branch_name = 2;
   * @override
   * @return {string|undefined}
   */
  getBranchNameOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 2);
  }


};

/**
 * @override
 * @return {!jspb$jetbox_state_pb$ImmutableCogWorkspaceConfig}
 */
jspb$jetbox_state_pb$MutableCogWorkspaceConfig.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$jetbox_state_pb$MutableCogWorkspaceConfig}
 */
jspb$jetbox_state_pb$MutableCogWorkspaceConfig.prototype.clone;
/**
 * @const {function(string):!jspb$jetbox_state_pb$MutableCogWorkspaceConfig}
 */
jspb$jetbox_state_pb$MutableCogWorkspaceConfig.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$jetbox_state_pb$MutableCogWorkspaceConfig));

/**
 * Returns whether the given value is an instance of jspb$jetbox_state_pb$MutableCogWorkspaceConfig.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$jetbox_state_pb$MutableCogWorkspaceConfig>}
 */
jspb$jetbox_state_pb$MutableCogWorkspaceConfig.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$jetbox_state_pb$MutableCogWorkspaceConfig));

/**
 * Object form of CogWorkspaceConfig as accepted by the `fromObject` method.
 * @typedef {{
 *  repoName: (?string|undefined),
 *  branchName: (?string|undefined)
 * }}
 */
jspb$jetbox_state_pb$MutableCogWorkspaceConfig.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$jetbox_state_pb$MutableCogWorkspaceConfig.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$jetbox_state_pb$MutableCogWorkspaceConfig.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$jetbox_state_pb$MutableCogWorkspaceConfig.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for jetbox_state_pb$MutableCogWorkspaceConfig.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$jetbox_state_pb$MutableCogWorkspaceConfig.internalDoNotUse_debugOnlyProtoTypeName = "jetbox_state_pb.CogWorkspaceConfig";
}

/**
 * @typedef {!jspb$jetbox_state_pb$ImmutableCogWorkspaceConfig|!jspb$jetbox_state_pb$MutableCogWorkspaceConfig}
 */
jspb$ro.jetbox_state_pb$ReadonlyCogWorkspaceConfig = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'jetbox_state_pb.CogWorkspaceConfig'}
   */
  jspb$jetbox_state_pb$MutableCogWorkspaceConfig.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$jetbox_state_pb$MutableCogWorkspaceConfig.displayName = 'proto.jetbox_state_pb.CogWorkspaceConfig';
}
/**
 * Interface form of CogWorkspaceConfig as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  repoName: (string|undefined),
 *  branchName: (string|undefined)
 * }}
 */
jspb$jetbox_state_pb$MutableCogWorkspaceConfig.FieldsInterface;

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
 * @param {!jspb$jetbox_state_pb$MutableCogWorkspaceConfig.FieldsInterface} record
 * @return {!jspb$jetbox_state_pb$ImmutableCogWorkspaceConfig}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableCogWorkspaceConfig, ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableCogWorkspaceConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$jetbox_state_pb$ImmutableCogWorkspaceConfig
 */
jspb$jetbox_state_pb$MutableCogWorkspaceConfig.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$jetbox_state_pb$MutableCogWorkspaceConfig));

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
 * @param {!jspb$ro.jetbox_state_pb$ReadonlyCogWorkspaceConfig} value
 * @return {!jspb$jetbox_state_pb$MutableCogWorkspaceConfig.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.jetbox_state_pb$ReadonlyCogWorkspaceConfig): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableCogWorkspaceConfig, ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableCogWorkspaceConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$jetbox_state_pb$MutableCogWorkspaceConfig.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$jetbox_state_pb$MutableGoogleSpecificConfig;
Object.defineProperty(this, 'jspb$jetbox_state_pb$MutableGoogleSpecificConfig', {
  get() { return jspb$jetbox_state_pb$MutableGoogleSpecificConfig; },
  set(v) { jspb$jetbox_state_pb$MutableGoogleSpecificConfig = v; },
