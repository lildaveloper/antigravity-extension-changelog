// source: third_party/jetski/config_pb/config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$exa$config_pb$MutableConversationGroupConfig');
goog.provide('jspb$ro.exa$config_pb$ReadonlyConversationGroupConfig');

goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$exa$config_pb$ImmutableConversationGroupConfig');
goog.requireType('jspb$r$exa$config_pb$ConversationGroupConfig$internalDoNotUseReader');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$exa$config_pb$ImmutableConversationGroupConfig>}
 * @implements {jspb$r$exa$config_pb$ConversationGroupConfig$internalDoNotUseReader}
 */
jspb$exa$config_pb$MutableConversationGroupConfig = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional string name = 1;
   * @override
   * @return {string}
   */
  getName() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 1);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$exa$config_pb$MutableConversationGroupConfig} returns this
   */
  setName(value) {
    return jspb_internal_adapters.setStringField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$config_pb$MutableConversationGroupConfig} returns this
   */
  clearName() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasName() {
    return jspb_internal_adapters.hasStringField(this, 1);
  }


  /**
   * optional string name = 1;
   * @override
   * @return {string|undefined}
   */
  getNameOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 1);
  }


};

/**
 * @override
 * @return {!jspb$exa$config_pb$ImmutableConversationGroupConfig}
 */
jspb$exa$config_pb$MutableConversationGroupConfig.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$exa$config_pb$MutableConversationGroupConfig}
 */
jspb$exa$config_pb$MutableConversationGroupConfig.prototype.clone;
/**
 * @const {function(string):!jspb$exa$config_pb$MutableConversationGroupConfig}
 */
jspb$exa$config_pb$MutableConversationGroupConfig.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$exa$config_pb$MutableConversationGroupConfig));

/**
 * Returns whether the given value is an instance of jspb$exa$config_pb$MutableConversationGroupConfig.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$exa$config_pb$MutableConversationGroupConfig>}
 */
jspb$exa$config_pb$MutableConversationGroupConfig.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$exa$config_pb$MutableConversationGroupConfig));

/**
 * Object form of ConversationGroupConfig as accepted by the `fromObject` method.
 * @typedef {{
 *  name: (?string|undefined)
 * }}
 */
jspb$exa$config_pb$MutableConversationGroupConfig.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$exa$config_pb$MutableConversationGroupConfig.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$exa$config_pb$MutableConversationGroupConfig.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$exa$config_pb$MutableConversationGroupConfig.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for exa$config_pb$MutableConversationGroupConfig.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$exa$config_pb$MutableConversationGroupConfig.internalDoNotUse_debugOnlyProtoTypeName = "exa.config_pb.ConversationGroupConfig";
}

/**
 * @typedef {!jspb$exa$config_pb$ImmutableConversationGroupConfig|!jspb$exa$config_pb$MutableConversationGroupConfig}
 */
jspb$ro.exa$config_pb$ReadonlyConversationGroupConfig = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'exa.config_pb.ConversationGroupConfig'}
   */
  jspb$exa$config_pb$MutableConversationGroupConfig.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$exa$config_pb$MutableConversationGroupConfig.displayName = 'proto.exa.config_pb.ConversationGroupConfig';
}
/**
 * Interface form of ConversationGroupConfig as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  name: (string|undefined)
 * }}
 */
jspb$exa$config_pb$MutableConversationGroupConfig.FieldsInterface;

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
 * @param {!jspb$exa$config_pb$MutableConversationGroupConfig.FieldsInterface} record
 * @return {!jspb$exa$config_pb$ImmutableConversationGroupConfig}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$exa$config_pb$MutableConversationGroupConfig, ಠ_ಠ.clutz.jspb$exa$config_pb$MutableConversationGroupConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$exa$config_pb$ImmutableConversationGroupConfig
 */
jspb$exa$config_pb$MutableConversationGroupConfig.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$exa$config_pb$MutableConversationGroupConfig));

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
 * @param {!jspb$ro.exa$config_pb$ReadonlyConversationGroupConfig} value
 * @return {!jspb$exa$config_pb$MutableConversationGroupConfig.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.exa$config_pb$ReadonlyConversationGroupConfig): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$exa$config_pb$MutableConversationGroupConfig, ಠ_ಠ.clutz.jspb$exa$config_pb$MutableConversationGroupConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$exa$config_pb$MutableConversationGroupConfig.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$exa$config_pb$MutableConversationGroupRegistry;
Object.defineProperty(this, 'jspb$exa$config_pb$MutableConversationGroupRegistry', {
  get() { return jspb$exa$config_pb$MutableConversationGroupRegistry; },
  set(v) { jspb$exa$config_pb$MutableConversationGroupRegistry = v; },
