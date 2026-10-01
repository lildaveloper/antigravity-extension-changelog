// source: third_party/jetski/config_pb/config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$exa$config_pb$MutableUserConfig');
goog.provide('jspb$ro.exa$config_pb$ReadonlyUserConfig');

goog.require('jspb$exa$config_pb$MutableConversationGroupRegistry');
goog.require('jspb$exa$config_pb$MutablePluginUserConfig');
goog.require('jspb$exa$config_pb$MutableSkillUserConfig');
goog.require('jspb$exa$cortex_pb$MutableSidecarUserConfig');
goog.require('jspb$jetbox_state_pb$MutableUserSettings');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$exa$config_pb$ImmutablePluginUserConfig');
goog.requireType('jspb$exa$config_pb$ImmutableSkillUserConfig');
goog.requireType('jspb$exa$config_pb$ImmutableUserConfig');
goog.requireType('jspb$exa$cortex_pb$ImmutableSidecarUserConfig');
goog.requireType('jspb$r$exa$config_pb$UserConfig$internalDoNotUseReader');
goog.requireType('jspb$ro.exa$config_pb$ReadonlyConversationGroupRegistry');
goog.requireType('jspb$ro.exa$config_pb$ReadonlyPluginUserConfig');
goog.requireType('jspb$ro.exa$config_pb$ReadonlySkillUserConfig');
goog.requireType('jspb$ro.exa$cortex_pb$ReadonlySidecarUserConfig');
goog.requireType('jspb$ro.jetbox_state_pb$ReadonlyUserSettings');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$exa$config_pb$ImmutableUserConfig>}
 * @implements {jspb$r$exa$config_pb$UserConfig$internalDoNotUseReader}
 */
jspb$exa$config_pb$MutableUserConfig = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * map<string, exa.cortex_pb.SidecarUserConfig> sidecars = 1;
   * @override
   * @return {!Map<string,!jspb$exa$cortex_pb$MutableSidecarUserConfig>}
   */
  getSidecarsMap() {
    return jspb_internal_adapters.getStringWrapperMapField(this, 1,
        jspb$exa$cortex_pb$MutableSidecarUserConfig);}



  /**
   * map<string, exa.cortex_pb.SidecarUserConfig> sidecars = 1;
   * @override
   * @return {!Map<string,!jspb$ro.exa$cortex_pb$ReadonlySidecarUserConfig>}
   */
  getReadonlySidecarsMap() {
    return jspb_internal_adapters.getReadonlyStringWrapperMapField(this, 1,
        jspb$exa$cortex_pb$MutableSidecarUserConfig);}



  /**
   * @param {string} key The key of value to set or replace.
   * @param {!jspb$ro.exa$cortex_pb$ReadonlySidecarUserConfig} value The new value.
   * @return {!jspb$exa$config_pb$MutableUserConfig} returns this
   */
  putSidecars(key, value) {
    return jspb_internal_adapters.putStringWrapperMapField(this, 1, key, value, jspb$exa$cortex_pb$MutableSidecarUserConfig);
  }


  /**
   * @param {!ReadonlyMap<string,!jspb$ro.exa$cortex_pb$ReadonlySidecarUserConfig>} value The new values.
   * @return {!jspb$exa$config_pb$MutableUserConfig} returns this
   */
  putAllSidecars(value) {
    return jspb_internal_adapters.putAllStringWrapperMapField(this, 1, value, jspb$exa$cortex_pb$MutableSidecarUserConfig);
  }


  /**
   * @param {!ReadonlyMap<string,!jspb$ro.exa$cortex_pb$ReadonlySidecarUserConfig>|undefined} value The new values.
   * @return {!jspb$exa$config_pb$MutableUserConfig} returns this
   */
  setSidecarsMap(value) {
    return jspb_internal_adapters.setStringWrapperMapField(this, 1, value, jspb$exa$cortex_pb$MutableSidecarUserConfig);
  }


  /**
   * @param {string} key The key of value to remove.
   * @return {!jspb$exa$config_pb$MutableUserConfig} returns this
   */
  deleteSidecars(key) {
    return jspb_internal_adapters.deleteStringWrapperMapField(this, 1, key, jspb$exa$cortex_pb$MutableSidecarUserConfig);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$config_pb$MutableUserConfig} returns this
   */
  clearSidecarsMap() {
    return jspb_internal_adapters.clearMapField(this, 1);
  }


  /**
   * optional jetbox_state_pb.UserSettings user_settings = 2;
   * @override
   * @return {!jspb$jetbox_state_pb$MutableUserSettings|undefined}
   */
  getUserSettings() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$jetbox_state_pb$MutableUserSettings, 2);
  }


  /**
   * optional jetbox_state_pb.UserSettings user_settings = 2;
   * @override
   * @return {!jspb$ro.jetbox_state_pb$ReadonlyUserSettings}
   */
  getReadonlyUserSettings() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$jetbox_state_pb$MutableUserSettings, 2);
  }


  /**
   * optional jetbox_state_pb.UserSettings user_settings = 2;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$jetbox_state_pb$MutableUserSettings|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$jetbox_state_pb$MutableUserSettings') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableUserSettings|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableUserSettings
   */
  getMutableUserSettings(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$jetbox_state_pb$MutableUserSettings, 2, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.jetbox_state_pb$ReadonlyUserSettings|null|undefined} value
   * @return {!jspb$exa$config_pb$MutableUserConfig} returns this
   */
  setUserSettings(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$jetbox_state_pb$MutableUserSettings, 2, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$config_pb$MutableUserConfig} returns this
   */
  clearUserSettings() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasUserSettings() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$jetbox_state_pb$MutableUserSettings, 2);
  }


  /**
   * optional jetbox_state_pb.UserSettings user_settings = 2;
   * @override
   * @return {!jspb$ro.jetbox_state_pb$ReadonlyUserSettings|undefined}
   */
  getUserSettingsOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$jetbox_state_pb$MutableUserSettings, 2);
  }


  /**
   * map<string, PluginUserConfig> plugins = 3;
   * @override
   * @return {!Map<string,!jspb$exa$config_pb$MutablePluginUserConfig>}
   */
  getPluginsMap() {
    return jspb_internal_adapters.getStringWrapperMapField(this, 3,
        jspb$exa$config_pb$MutablePluginUserConfig);}



  /**
   * map<string, PluginUserConfig> plugins = 3;
   * @override
   * @return {!Map<string,!jspb$ro.exa$config_pb$ReadonlyPluginUserConfig>}
   */
  getReadonlyPluginsMap() {
    return jspb_internal_adapters.getReadonlyStringWrapperMapField(this, 3,
        jspb$exa$config_pb$MutablePluginUserConfig);}



  /**
   * @param {string} key The key of value to set or replace.
   * @param {!jspb$ro.exa$config_pb$ReadonlyPluginUserConfig} value The new value.
   * @return {!jspb$exa$config_pb$MutableUserConfig} returns this
   */
  putPlugins(key, value) {
    return jspb_internal_adapters.putStringWrapperMapField(this, 3, key, value, jspb$exa$config_pb$MutablePluginUserConfig);
  }


  /**
   * @param {!ReadonlyMap<string,!jspb$ro.exa$config_pb$ReadonlyPluginUserConfig>} value The new values.
   * @return {!jspb$exa$config_pb$MutableUserConfig} returns this
   */
  putAllPlugins(value) {
    return jspb_internal_adapters.putAllStringWrapperMapField(this, 3, value, jspb$exa$config_pb$MutablePluginUserConfig);
  }


  /**
   * @param {!ReadonlyMap<string,!jspb$ro.exa$config_pb$ReadonlyPluginUserConfig>|undefined} value The new values.
   * @return {!jspb$exa$config_pb$MutableUserConfig} returns this
   */
  setPluginsMap(value) {
    return jspb_internal_adapters.setStringWrapperMapField(this, 3, value, jspb$exa$config_pb$MutablePluginUserConfig);
  }


  /**
   * @param {string} key The key of value to remove.
   * @return {!jspb$exa$config_pb$MutableUserConfig} returns this
   */
  deletePlugins(key) {
    return jspb_internal_adapters.deleteStringWrapperMapField(this, 3, key, jspb$exa$config_pb$MutablePluginUserConfig);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$config_pb$MutableUserConfig} returns this
   */
  clearPluginsMap() {
    return jspb_internal_adapters.clearMapField(this, 3);
  }


  /**
   * optional ConversationGroupRegistry conversation_groups = 4;
   * @override
   * @return {!jspb$exa$config_pb$MutableConversationGroupRegistry|undefined}
   */
  getConversationGroups() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$exa$config_pb$MutableConversationGroupRegistry, 4);
  }


  /**
   * optional ConversationGroupRegistry conversation_groups = 4;
   * @override
   * @return {!jspb$ro.exa$config_pb$ReadonlyConversationGroupRegistry}
   */
  getReadonlyConversationGroups() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$exa$config_pb$MutableConversationGroupRegistry, 4);
  }


  /**
   * optional ConversationGroupRegistry conversation_groups = 4;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$exa$config_pb$MutableConversationGroupRegistry|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$exa$config_pb$MutableConversationGroupRegistry') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$exa$config_pb$MutableConversationGroupRegistry|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$exa$config_pb$MutableConversationGroupRegistry
   */
  getMutableConversationGroups(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$exa$config_pb$MutableConversationGroupRegistry, 4, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.exa$config_pb$ReadonlyConversationGroupRegistry|null|undefined} value
   * @return {!jspb$exa$config_pb$MutableUserConfig} returns this
   */
  setConversationGroups(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$exa$config_pb$MutableConversationGroupRegistry, 4, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$config_pb$MutableUserConfig} returns this
   */
  clearConversationGroups() {
    return jspb_internal_adapters.clearField(this, 4);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasConversationGroups() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$exa$config_pb$MutableConversationGroupRegistry, 4);
  }


  /**
   * optional ConversationGroupRegistry conversation_groups = 4;
   * @override
   * @return {!jspb$ro.exa$config_pb$ReadonlyConversationGroupRegistry|undefined}
   */
  getConversationGroupsOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$exa$config_pb$MutableConversationGroupRegistry, 4);
  }


  /**
   * map<string, SkillUserConfig> skills = 5;
   * @override
   * @return {!Map<string,!jspb$exa$config_pb$MutableSkillUserConfig>}
   */
  getSkillsMap() {
    return jspb_internal_adapters.getStringWrapperMapField(this, 5,
        jspb$exa$config_pb$MutableSkillUserConfig);}



  /**
   * map<string, SkillUserConfig> skills = 5;
   * @override
   * @return {!Map<string,!jspb$ro.exa$config_pb$ReadonlySkillUserConfig>}
   */
  getReadonlySkillsMap() {
    return jspb_internal_adapters.getReadonlyStringWrapperMapField(this, 5,
        jspb$exa$config_pb$MutableSkillUserConfig);}



  /**
   * @param {string} key The key of value to set or replace.
   * @param {!jspb$ro.exa$config_pb$ReadonlySkillUserConfig} value The new value.
   * @return {!jspb$exa$config_pb$MutableUserConfig} returns this
   */
  putSkills(key, value) {
    return jspb_internal_adapters.putStringWrapperMapField(this, 5, key, value, jspb$exa$config_pb$MutableSkillUserConfig);
  }


  /**
   * @param {!ReadonlyMap<string,!jspb$ro.exa$config_pb$ReadonlySkillUserConfig>} value The new values.
   * @return {!jspb$exa$config_pb$MutableUserConfig} returns this
   */
  putAllSkills(value) {
    return jspb_internal_adapters.putAllStringWrapperMapField(this, 5, value, jspb$exa$config_pb$MutableSkillUserConfig);
  }


  /**
   * @param {!ReadonlyMap<string,!jspb$ro.exa$config_pb$ReadonlySkillUserConfig>|undefined} value The new values.
   * @return {!jspb$exa$config_pb$MutableUserConfig} returns this
   */
  setSkillsMap(value) {
    return jspb_internal_adapters.setStringWrapperMapField(this, 5, value, jspb$exa$config_pb$MutableSkillUserConfig);
  }


  /**
   * @param {string} key The key of value to remove.
   * @return {!jspb$exa$config_pb$MutableUserConfig} returns this
   */
  deleteSkills(key) {
    return jspb_internal_adapters.deleteStringWrapperMapField(this, 5, key, jspb$exa$config_pb$MutableSkillUserConfig);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$config_pb$MutableUserConfig} returns this
   */
  clearSkillsMap() {
    return jspb_internal_adapters.clearMapField(this, 5);
  }


};

/**
 * @override
 * @return {!jspb$exa$config_pb$ImmutableUserConfig}
 */
jspb$exa$config_pb$MutableUserConfig.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$exa$config_pb$MutableUserConfig}
 */
jspb$exa$config_pb$MutableUserConfig.prototype.clone;
/**
 * @const {function(string):!jspb$exa$config_pb$MutableUserConfig}
 */
jspb$exa$config_pb$MutableUserConfig.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$exa$config_pb$MutableUserConfig));

/**
 * Returns whether the given value is an instance of jspb$exa$config_pb$MutableUserConfig.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$exa$config_pb$MutableUserConfig>}
 */
jspb$exa$config_pb$MutableUserConfig.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$exa$config_pb$MutableUserConfig));

/**
 * Object form of UserConfig as accepted by the `fromObject` method.
 * @typedef {{
 *  sidecarsMap: (?Array<!Array<!jspb$exa$cortex_pb$MutableSidecarUserConfig.ObjectFormat|string>>|undefined),
 *  userSettings: (?jspb$jetbox_state_pb$MutableUserSettings.ObjectFormat|undefined),
 *  pluginsMap: (?Array<!Array<!jspb$exa$config_pb$MutablePluginUserConfig.ObjectFormat|string>>|undefined),
 *  conversationGroups: (?jspb$exa$config_pb$MutableConversationGroupRegistry.ObjectFormat|undefined),
 *  skillsMap: (?Array<!Array<!jspb$exa$config_pb$MutableSkillUserConfig.ObjectFormat|string>>|undefined)
 * }}
 */
jspb$exa$config_pb$MutableUserConfig.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$exa$config_pb$MutableUserConfig.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$exa$config_pb$MutableUserConfig.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$exa$config_pb$MutableUserConfig.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for exa$config_pb$MutableUserConfig.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$exa$config_pb$MutableUserConfig.internalDoNotUse_debugOnlyProtoTypeName = "exa.config_pb.UserConfig";
}

/**
 * @typedef {!jspb$exa$config_pb$ImmutableUserConfig|!jspb$exa$config_pb$MutableUserConfig}
 */
jspb$ro.exa$config_pb$ReadonlyUserConfig = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'exa.config_pb.UserConfig'}
   */
  jspb$exa$config_pb$MutableUserConfig.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$exa$config_pb$MutableUserConfig.displayName = 'proto.exa.config_pb.UserConfig';
}
/**
 * Interface form of UserConfig as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  sidecarsMap: (!ReadonlyMap<string,!jspb$ro.exa$cortex_pb$ReadonlySidecarUserConfig>|!ReadonlyMap<string,!jspb$exa$cortex_pb$ImmutableSidecarUserConfig>|undefined),
 *  userSettings: (!jspb$ro.jetbox_state_pb$ReadonlyUserSettings|undefined),
 *  pluginsMap: (!ReadonlyMap<string,!jspb$ro.exa$config_pb$ReadonlyPluginUserConfig>|!ReadonlyMap<string,!jspb$exa$config_pb$ImmutablePluginUserConfig>|undefined),
 *  conversationGroups: (!jspb$ro.exa$config_pb$ReadonlyConversationGroupRegistry|undefined),
 *  skillsMap: (!ReadonlyMap<string,!jspb$ro.exa$config_pb$ReadonlySkillUserConfig>|!ReadonlyMap<string,!jspb$exa$config_pb$ImmutableSkillUserConfig>|undefined)
 * }}
 */
jspb$exa$config_pb$MutableUserConfig.FieldsInterface;

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
 * @param {!jspb$exa$config_pb$MutableUserConfig.FieldsInterface} record
 * @return {!jspb$exa$config_pb$ImmutableUserConfig}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$exa$config_pb$MutableUserConfig, ಠ_ಠ.clutz.jspb$exa$config_pb$MutableUserConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$exa$config_pb$ImmutableUserConfig
 */
jspb$exa$config_pb$MutableUserConfig.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$exa$config_pb$MutableUserConfig));

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
 * @param {!jspb$ro.exa$config_pb$ReadonlyUserConfig} value
 * @return {!jspb$exa$config_pb$MutableUserConfig.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.exa$config_pb$ReadonlyUserConfig): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$exa$config_pb$MutableUserConfig, ಠ_ಠ.clutz.jspb$exa$config_pb$MutableUserConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$exa$config_pb$MutableUserConfig.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$exa$codeium_common_pb$MutableModelFeatures;
Object.defineProperty(this, 'jspb$exa$codeium_common_pb$MutableModelFeatures', {
  get() { return jspb$exa$codeium_common_pb$MutableModelFeatures; },
  set(v) { jspb$exa$codeium_common_pb$MutableModelFeatures = v; },
