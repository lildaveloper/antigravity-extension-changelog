// source: third_party/jetski/jetbox_state_pb/jetbox_state.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$jetbox_state_pb$MutableGoogleSpecificConfig');
goog.provide('jspb$ro.jetbox_state_pb$ReadonlyGoogleSpecificConfig');

goog.require('jspb$jetbox_state_pb$MutableCogWorkspaceConfig');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$e.exa$vcs_pb$VcsType');
goog.requireType('jspb$jetbox_state_pb$ImmutableGoogleSpecificConfig');
goog.requireType('jspb$r$jetbox_state_pb$GoogleSpecificConfig$internalDoNotUseReader');
goog.requireType('jspb$ro.jetbox_state_pb$ReadonlyCogWorkspaceConfig');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$jetbox_state_pb$ImmutableGoogleSpecificConfig>}
 * @implements {jspb$r$jetbox_state_pb$GoogleSpecificConfig$internalDoNotUseReader}
 */
jspb$jetbox_state_pb$MutableGoogleSpecificConfig = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional exa.vcs_pb.VcsType magic_workspace_vcs = 1;
   * @override
   * @return {!jspb$e.exa$vcs_pb$VcsType}
   */
  getMagicWorkspaceVcs() {
    return /** @type {!jspb$e.exa$vcs_pb$VcsType} */ (jspb_internal_adapters.getEnumFieldWithDefault(this, 1));
  }


  /**
   * @param {!jspb$e.exa$vcs_pb$VcsType|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableGoogleSpecificConfig} returns this
   */
  setMagicWorkspaceVcs(value) {
    return jspb_internal_adapters.setEnumField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableGoogleSpecificConfig} returns this
   */
  clearMagicWorkspaceVcs() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasMagicWorkspaceVcs() {
    return jspb_internal_adapters.hasEnumField(this, 1);
  }


  /**
   * optional exa.vcs_pb.VcsType magic_workspace_vcs = 1;
   * @override
   * @return {!jspb$e.exa$vcs_pb$VcsType|undefined}
   */
  getMagicWorkspaceVcsOrUndefined() {
    return /** @type {!jspb$e.exa$vcs_pb$VcsType|undefined} */ (jspb_internal_adapters.getEnumFieldOrUndefined(this, 1));
  }


  /**
   * optional CogWorkspaceConfig magic_workspace_cog_config = 2;
   * @override
   * @return {!jspb$jetbox_state_pb$MutableCogWorkspaceConfig|undefined}
   */
  getMagicWorkspaceCogConfig() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$jetbox_state_pb$MutableCogWorkspaceConfig, 2);
  }


  /**
   * optional CogWorkspaceConfig magic_workspace_cog_config = 2;
   * @override
   * @return {!jspb$ro.jetbox_state_pb$ReadonlyCogWorkspaceConfig}
   */
  getReadonlyMagicWorkspaceCogConfig() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$jetbox_state_pb$MutableCogWorkspaceConfig, 2);
  }


  /**
   * optional CogWorkspaceConfig magic_workspace_cog_config = 2;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$jetbox_state_pb$MutableCogWorkspaceConfig|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$jetbox_state_pb$MutableCogWorkspaceConfig') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableCogWorkspaceConfig|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableCogWorkspaceConfig
   */
  getMutableMagicWorkspaceCogConfig(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$jetbox_state_pb$MutableCogWorkspaceConfig, 2, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.jetbox_state_pb$ReadonlyCogWorkspaceConfig|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableGoogleSpecificConfig} returns this
   */
  setMagicWorkspaceCogConfig(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$jetbox_state_pb$MutableCogWorkspaceConfig, 2, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableGoogleSpecificConfig} returns this
   */
  clearMagicWorkspaceCogConfig() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasMagicWorkspaceCogConfig() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$jetbox_state_pb$MutableCogWorkspaceConfig, 2);
  }


  /**
   * optional CogWorkspaceConfig magic_workspace_cog_config = 2;
   * @override
   * @return {!jspb$ro.jetbox_state_pb$ReadonlyCogWorkspaceConfig|undefined}
   */
  getMagicWorkspaceCogConfigOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$jetbox_state_pb$MutableCogWorkspaceConfig, 2);
  }


};

/**
 * @override
 * @return {!jspb$jetbox_state_pb$ImmutableGoogleSpecificConfig}
 */
jspb$jetbox_state_pb$MutableGoogleSpecificConfig.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$jetbox_state_pb$MutableGoogleSpecificConfig}
 */
jspb$jetbox_state_pb$MutableGoogleSpecificConfig.prototype.clone;
/**
 * @const {function(string):!jspb$jetbox_state_pb$MutableGoogleSpecificConfig}
 */
jspb$jetbox_state_pb$MutableGoogleSpecificConfig.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$jetbox_state_pb$MutableGoogleSpecificConfig));

/**
 * Returns whether the given value is an instance of jspb$jetbox_state_pb$MutableGoogleSpecificConfig.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$jetbox_state_pb$MutableGoogleSpecificConfig>}
 */
jspb$jetbox_state_pb$MutableGoogleSpecificConfig.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$jetbox_state_pb$MutableGoogleSpecificConfig));

/**
 * Object form of GoogleSpecificConfig as accepted by the `fromObject` method.
 * @typedef {{
 *  magicWorkspaceVcs: (?number|undefined),
 *  magicWorkspaceCogConfig: (?jspb$jetbox_state_pb$MutableCogWorkspaceConfig.ObjectFormat|undefined)
 * }}
 */
jspb$jetbox_state_pb$MutableGoogleSpecificConfig.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$jetbox_state_pb$MutableGoogleSpecificConfig.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$jetbox_state_pb$MutableGoogleSpecificConfig.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$jetbox_state_pb$MutableGoogleSpecificConfig.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for jetbox_state_pb$MutableGoogleSpecificConfig.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$jetbox_state_pb$MutableGoogleSpecificConfig.internalDoNotUse_debugOnlyProtoTypeName = "jetbox_state_pb.GoogleSpecificConfig";
}

/**
 * @typedef {!jspb$jetbox_state_pb$ImmutableGoogleSpecificConfig|!jspb$jetbox_state_pb$MutableGoogleSpecificConfig}
 */
jspb$ro.jetbox_state_pb$ReadonlyGoogleSpecificConfig = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'jetbox_state_pb.GoogleSpecificConfig'}
   */
  jspb$jetbox_state_pb$MutableGoogleSpecificConfig.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$jetbox_state_pb$MutableGoogleSpecificConfig.displayName = 'proto.jetbox_state_pb.GoogleSpecificConfig';
}
/**
 * Interface form of GoogleSpecificConfig as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  magicWorkspaceVcs: (!jspb$e.exa$vcs_pb$VcsType|undefined),
 *  magicWorkspaceCogConfig: (!jspb$ro.jetbox_state_pb$ReadonlyCogWorkspaceConfig|undefined)
 * }}
 */
jspb$jetbox_state_pb$MutableGoogleSpecificConfig.FieldsInterface;

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
 * @param {!jspb$jetbox_state_pb$MutableGoogleSpecificConfig.FieldsInterface} record
 * @return {!jspb$jetbox_state_pb$ImmutableGoogleSpecificConfig}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableGoogleSpecificConfig, ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableGoogleSpecificConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$jetbox_state_pb$ImmutableGoogleSpecificConfig
 */
jspb$jetbox_state_pb$MutableGoogleSpecificConfig.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$jetbox_state_pb$MutableGoogleSpecificConfig));

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
 * @param {!jspb$ro.jetbox_state_pb$ReadonlyGoogleSpecificConfig} value
 * @return {!jspb$jetbox_state_pb$MutableGoogleSpecificConfig.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.jetbox_state_pb$ReadonlyGoogleSpecificConfig): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableGoogleSpecificConfig, ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableGoogleSpecificConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$jetbox_state_pb$MutableGoogleSpecificConfig.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$jetbox_state_pb$MutableUserSettings;
Object.defineProperty(this, 'jspb$jetbox_state_pb$MutableUserSettings', {
  get() { return jspb$jetbox_state_pb$MutableUserSettings; },
  set(v) { jspb$jetbox_state_pb$MutableUserSettings = v; },
