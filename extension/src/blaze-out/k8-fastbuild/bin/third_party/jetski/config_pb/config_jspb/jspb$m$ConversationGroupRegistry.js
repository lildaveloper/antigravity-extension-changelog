// source: third_party/jetski/config_pb/config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$exa$config_pb$MutableConversationGroupRegistry');
goog.provide('jspb$ro.exa$config_pb$ReadonlyConversationGroupRegistry');

goog.require('jspb$exa$config_pb$MutableConversationGroupConfig');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$exa$config_pb$ImmutableConversationGroupConfig');
goog.requireType('jspb$exa$config_pb$ImmutableConversationGroupRegistry');
goog.requireType('jspb$r$exa$config_pb$ConversationGroupRegistry$internalDoNotUseReader');
goog.requireType('jspb$ro.exa$config_pb$ReadonlyConversationGroupConfig');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$exa$config_pb$ImmutableConversationGroupRegistry>}
 * @implements {jspb$r$exa$config_pb$ConversationGroupRegistry$internalDoNotUseReader}
 */
jspb$exa$config_pb$MutableConversationGroupRegistry = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * map<string, ConversationGroupConfig> groups = 1;
   * @override
   * @return {!Map<string,!jspb$exa$config_pb$MutableConversationGroupConfig>}
   */
  getGroupsMap() {
    return jspb_internal_adapters.getStringWrapperMapField(this, 1,
        jspb$exa$config_pb$MutableConversationGroupConfig);}



  /**
   * map<string, ConversationGroupConfig> groups = 1;
   * @override
   * @return {!Map<string,!jspb$ro.exa$config_pb$ReadonlyConversationGroupConfig>}
   */
  getReadonlyGroupsMap() {
    return jspb_internal_adapters.getReadonlyStringWrapperMapField(this, 1,
        jspb$exa$config_pb$MutableConversationGroupConfig);}



  /**
   * @param {string} key The key of value to set or replace.
   * @param {!jspb$ro.exa$config_pb$ReadonlyConversationGroupConfig} value The new value.
   * @return {!jspb$exa$config_pb$MutableConversationGroupRegistry} returns this
   */
  putGroups(key, value) {
    return jspb_internal_adapters.putStringWrapperMapField(this, 1, key, value, jspb$exa$config_pb$MutableConversationGroupConfig);
  }


  /**
   * @param {!ReadonlyMap<string,!jspb$ro.exa$config_pb$ReadonlyConversationGroupConfig>} value The new values.
   * @return {!jspb$exa$config_pb$MutableConversationGroupRegistry} returns this
   */
  putAllGroups(value) {
    return jspb_internal_adapters.putAllStringWrapperMapField(this, 1, value, jspb$exa$config_pb$MutableConversationGroupConfig);
  }


  /**
   * @param {!ReadonlyMap<string,!jspb$ro.exa$config_pb$ReadonlyConversationGroupConfig>|undefined} value The new values.
   * @return {!jspb$exa$config_pb$MutableConversationGroupRegistry} returns this
   */
  setGroupsMap(value) {
    return jspb_internal_adapters.setStringWrapperMapField(this, 1, value, jspb$exa$config_pb$MutableConversationGroupConfig);
  }


  /**
   * @param {string} key The key of value to remove.
   * @return {!jspb$exa$config_pb$MutableConversationGroupRegistry} returns this
   */
  deleteGroups(key) {
    return jspb_internal_adapters.deleteStringWrapperMapField(this, 1, key, jspb$exa$config_pb$MutableConversationGroupConfig);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$config_pb$MutableConversationGroupRegistry} returns this
   */
  clearGroupsMap() {
    return jspb_internal_adapters.clearMapField(this, 1);
  }


};

/**
 * @override
 * @return {!jspb$exa$config_pb$ImmutableConversationGroupRegistry}
 */
jspb$exa$config_pb$MutableConversationGroupRegistry.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$exa$config_pb$MutableConversationGroupRegistry}
 */
jspb$exa$config_pb$MutableConversationGroupRegistry.prototype.clone;
/**
 * @const {function(string):!jspb$exa$config_pb$MutableConversationGroupRegistry}
 */
jspb$exa$config_pb$MutableConversationGroupRegistry.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$exa$config_pb$MutableConversationGroupRegistry));

/**
 * Returns whether the given value is an instance of jspb$exa$config_pb$MutableConversationGroupRegistry.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$exa$config_pb$MutableConversationGroupRegistry>}
 */
jspb$exa$config_pb$MutableConversationGroupRegistry.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$exa$config_pb$MutableConversationGroupRegistry));

/**
 * Object form of ConversationGroupRegistry as accepted by the `fromObject` method.
 * @typedef {{
 *  groupsMap: (?Array<!Array<!jspb$exa$config_pb$MutableConversationGroupConfig.ObjectFormat|string>>|undefined)
 * }}
 */
jspb$exa$config_pb$MutableConversationGroupRegistry.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$exa$config_pb$MutableConversationGroupRegistry.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$exa$config_pb$MutableConversationGroupRegistry.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$exa$config_pb$MutableConversationGroupRegistry.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for exa$config_pb$MutableConversationGroupRegistry.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$exa$config_pb$MutableConversationGroupRegistry.internalDoNotUse_debugOnlyProtoTypeName = "exa.config_pb.ConversationGroupRegistry";
}

/**
 * @typedef {!jspb$exa$config_pb$ImmutableConversationGroupRegistry|!jspb$exa$config_pb$MutableConversationGroupRegistry}
 */
jspb$ro.exa$config_pb$ReadonlyConversationGroupRegistry = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'exa.config_pb.ConversationGroupRegistry'}
   */
  jspb$exa$config_pb$MutableConversationGroupRegistry.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$exa$config_pb$MutableConversationGroupRegistry.displayName = 'proto.exa.config_pb.ConversationGroupRegistry';
}
/**
 * Interface form of ConversationGroupRegistry as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  groupsMap: (!ReadonlyMap<string,!jspb$ro.exa$config_pb$ReadonlyConversationGroupConfig>|!ReadonlyMap<string,!jspb$exa$config_pb$ImmutableConversationGroupConfig>|undefined)
 * }}
 */
jspb$exa$config_pb$MutableConversationGroupRegistry.FieldsInterface;

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
 * @param {!jspb$exa$config_pb$MutableConversationGroupRegistry.FieldsInterface} record
 * @return {!jspb$exa$config_pb$ImmutableConversationGroupRegistry}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$exa$config_pb$MutableConversationGroupRegistry, ಠ_ಠ.clutz.jspb$exa$config_pb$MutableConversationGroupRegistry.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$exa$config_pb$ImmutableConversationGroupRegistry
 */
jspb$exa$config_pb$MutableConversationGroupRegistry.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$exa$config_pb$MutableConversationGroupRegistry));

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
 * @param {!jspb$ro.exa$config_pb$ReadonlyConversationGroupRegistry} value
 * @return {!jspb$exa$config_pb$MutableConversationGroupRegistry.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.exa$config_pb$ReadonlyConversationGroupRegistry): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$exa$config_pb$MutableConversationGroupRegistry, ಠ_ಠ.clutz.jspb$exa$config_pb$MutableConversationGroupRegistry.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$exa$config_pb$MutableConversationGroupRegistry.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$exa$config_pb$MutableMarketplaceInstall;
Object.defineProperty(this, 'jspb$exa$config_pb$MutableMarketplaceInstall', {
  get() { return jspb$exa$config_pb$MutableMarketplaceInstall; },
  set(v) { jspb$exa$config_pb$MutableMarketplaceInstall = v; },
