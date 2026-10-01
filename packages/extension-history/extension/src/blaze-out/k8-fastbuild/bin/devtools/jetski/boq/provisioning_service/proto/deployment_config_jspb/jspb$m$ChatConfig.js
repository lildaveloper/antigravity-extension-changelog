// source: devtools/jetski/boq/provisioning_service/proto/deployment_config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$devtools_jetski_provisioning$MutableChatConfig');
goog.provide('jspb$ro.devtools_jetski_provisioning$ReadonlyChatConfig');

goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$devtools_jetski_provisioning$ImmutableChatConfig');
goog.requireType('jspb$r$devtools_jetski_provisioning$ChatConfig$internalDoNotUseReader');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$devtools_jetski_provisioning$ImmutableChatConfig>}
 * @implements {jspb$r$devtools_jetski_provisioning$ChatConfig$internalDoNotUseReader}
 */
jspb$devtools_jetski_provisioning$MutableChatConfig = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional bool enabled = 1;
   * @override
   * @return {boolean}
   */
  getEnabled() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 1);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableChatConfig} returns this
   */
  setEnabled(value) {
    return jspb_internal_adapters.setBooleanField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableChatConfig} returns this
   */
  clearEnabled() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasEnabled() {
    return jspb_internal_adapters.hasBooleanField(this, 1);
  }


  /**
   * optional bool enabled = 1;
   * @override
   * @return {boolean|undefined}
   */
  getEnabledOrUndefined() {
    return jspb_internal_adapters.getBooleanFieldOrUndefined(this, 1);
  }


  /**
   * optional string display_name = 2;
   * @override
   * @return {string}
   */
  getDisplayName() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 2);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableChatConfig} returns this
   */
  setDisplayName(value) {
    return jspb_internal_adapters.setStringField(this, 2, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableChatConfig} returns this
   */
  clearDisplayName() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasDisplayName() {
    return jspb_internal_adapters.hasStringField(this, 2);
  }


  /**
   * optional string display_name = 2;
   * @override
   * @return {string|undefined}
   */
  getDisplayNameOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 2);
  }


  /**
   * optional string avatar_url = 3;
   * @override
   * @return {string}
   */
  getAvatarUrl() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 3);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableChatConfig} returns this
   */
  setAvatarUrl(value) {
    return jspb_internal_adapters.setStringField(this, 3, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableChatConfig} returns this
   */
  clearAvatarUrl() {
    return jspb_internal_adapters.clearField(this, 3);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasAvatarUrl() {
    return jspb_internal_adapters.hasStringField(this, 3);
  }


  /**
   * optional string avatar_url = 3;
   * @override
   * @return {string|undefined}
   */
  getAvatarUrlOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 3);
  }


};

/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$ImmutableChatConfig}
 */
jspb$devtools_jetski_provisioning$MutableChatConfig.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$MutableChatConfig}
 */
jspb$devtools_jetski_provisioning$MutableChatConfig.prototype.clone;
/**
 * @const {function(string):!jspb$devtools_jetski_provisioning$MutableChatConfig}
 */
jspb$devtools_jetski_provisioning$MutableChatConfig.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$devtools_jetski_provisioning$MutableChatConfig));

/**
 * Returns whether the given value is an instance of jspb$devtools_jetski_provisioning$MutableChatConfig.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$devtools_jetski_provisioning$MutableChatConfig>}
 */
jspb$devtools_jetski_provisioning$MutableChatConfig.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$devtools_jetski_provisioning$MutableChatConfig));

/**
 * Object form of ChatConfig as accepted by the `fromObject` method.
 * @typedef {{
 *  enabled: (?boolean|undefined),
 *  displayName: (?string|undefined),
 *  avatarUrl: (?string|undefined)
 * }}
 */
jspb$devtools_jetski_provisioning$MutableChatConfig.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$devtools_jetski_provisioning$MutableChatConfig.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$devtools_jetski_provisioning$MutableChatConfig.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$devtools_jetski_provisioning$MutableChatConfig.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for devtools_jetski_provisioning$MutableChatConfig.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$devtools_jetski_provisioning$MutableChatConfig.internalDoNotUse_debugOnlyProtoTypeName = "devtools_jetski_provisioning.ChatConfig";
}

/**
 * @typedef {!jspb$devtools_jetski_provisioning$ImmutableChatConfig|!jspb$devtools_jetski_provisioning$MutableChatConfig}
 */
jspb$ro.devtools_jetski_provisioning$ReadonlyChatConfig = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'devtools_jetski_provisioning.ChatConfig'}
   */
  jspb$devtools_jetski_provisioning$MutableChatConfig.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$devtools_jetski_provisioning$MutableChatConfig.displayName = 'proto.devtools_jetski_provisioning.ChatConfig';
}
/**
 * Interface form of ChatConfig as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  enabled: (boolean|undefined),
 *  displayName: (string|undefined),
 *  avatarUrl: (string|undefined)
 * }}
 */
jspb$devtools_jetski_provisioning$MutableChatConfig.FieldsInterface;

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
 * @param {!jspb$devtools_jetski_provisioning$MutableChatConfig.FieldsInterface} record
 * @return {!jspb$devtools_jetski_provisioning$ImmutableChatConfig}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableChatConfig, ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableChatConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$ImmutableChatConfig
 */
jspb$devtools_jetski_provisioning$MutableChatConfig.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$devtools_jetski_provisioning$MutableChatConfig));

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
 * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyChatConfig} value
 * @return {!jspb$devtools_jetski_provisioning$MutableChatConfig.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.devtools_jetski_provisioning$ReadonlyChatConfig): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableChatConfig, ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableChatConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$devtools_jetski_provisioning$MutableChatConfig.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$b$devtools_jetski_provisioning$ChatConfig;
Object.defineProperty(this, 'jspb$b$devtools_jetski_provisioning$ChatConfig', {
  get() { return jspb$b$devtools_jetski_provisioning$ChatConfig; },
  set(v) { jspb$b$devtools_jetski_provisioning$ChatConfig = v; },
