// source: learning/gemini/agents/projects/memory/deployment/config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$jetski_memory$MutableDreamingConfig');
goog.provide('jspb$ro.jetski_memory$ReadonlyDreamingConfig');

goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$e.exa$codeium_common_pb$Model');
goog.requireType('jspb$jetski_memory$ImmutableDreamingConfig');
goog.requireType('jspb$r$jetski_memory$DreamingConfig$internalDoNotUseReader');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$jetski_memory$ImmutableDreamingConfig>}
 * @implements {jspb$r$jetski_memory$DreamingConfig$internalDoNotUseReader}
 */
jspb$jetski_memory$MutableDreamingConfig = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional bool disable = 1;
   * @override
   * @return {boolean}
   */
  getDisable() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 1);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$jetski_memory$MutableDreamingConfig} returns this
   */
  setDisable(value) {
    return jspb_internal_adapters.setProto3BooleanField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableDreamingConfig} returns this
   */
  clearDisable() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * optional string prompt_path = 2;
   * @override
   * @return {string}
   */
  getPromptPath() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 2);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$jetski_memory$MutableDreamingConfig} returns this
   */
  setPromptPath(value) {
    return jspb_internal_adapters.setProto3StringField(this, 2, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableDreamingConfig} returns this
   */
  clearPromptPath() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * optional string bin = 3;
   * @override
   * @return {string}
   */
  getBin() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 3);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$jetski_memory$MutableDreamingConfig} returns this
   */
  setBin(value) {
    return jspb_internal_adapters.setProto3StringField(this, 3, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableDreamingConfig} returns this
   */
  clearBin() {
    return jspb_internal_adapters.clearField(this, 3);
  }


  /**
   * optional exa.codeium_common_pb.Model model_enum = 4;
   * @override
   * @return {!jspb$e.exa$codeium_common_pb$Model}
   */
  getModelEnum() {
    return /** @type {!jspb$e.exa$codeium_common_pb$Model} */ (jspb_internal_adapters.getEnumFieldWithDefault(this, 4));
  }


  /**
   * @param {!jspb$e.exa$codeium_common_pb$Model|null|undefined} value
   * @return {!jspb$jetski_memory$MutableDreamingConfig} returns this
   */
  setModelEnum(value) {
    return jspb_internal_adapters.setProto3EnumField(this, 4, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableDreamingConfig} returns this
   */
  clearModelEnum() {
    return jspb_internal_adapters.clearField(this, 4);
  }


};

/**
 * @override
 * @return {!jspb$jetski_memory$ImmutableDreamingConfig}
 */
jspb$jetski_memory$MutableDreamingConfig.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$jetski_memory$MutableDreamingConfig}
 */
jspb$jetski_memory$MutableDreamingConfig.prototype.clone;
/**
 * @const {function(string):!jspb$jetski_memory$MutableDreamingConfig}
 */
jspb$jetski_memory$MutableDreamingConfig.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$jetski_memory$MutableDreamingConfig));

/**
 * Returns whether the given value is an instance of jspb$jetski_memory$MutableDreamingConfig.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$jetski_memory$MutableDreamingConfig>}
 */
jspb$jetski_memory$MutableDreamingConfig.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$jetski_memory$MutableDreamingConfig));

/**
 * Object form of DreamingConfig as accepted by the `fromObject` method.
 * @typedef {{
 *  disable: (?boolean|undefined),
 *  promptPath: (?string|undefined),
 *  bin: (?string|undefined),
 *  modelEnum: (?number|undefined)
 * }}
 */
jspb$jetski_memory$MutableDreamingConfig.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$jetski_memory$MutableDreamingConfig.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$jetski_memory$MutableDreamingConfig.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$jetski_memory$MutableDreamingConfig.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for jetski_memory$MutableDreamingConfig.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$jetski_memory$MutableDreamingConfig.internalDoNotUse_debugOnlyProtoTypeName = "jetski_memory.DreamingConfig";
}

/**
 * @typedef {!jspb$jetski_memory$ImmutableDreamingConfig|!jspb$jetski_memory$MutableDreamingConfig}
 */
jspb$ro.jetski_memory$ReadonlyDreamingConfig = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'jetski_memory.DreamingConfig'}
   */
  jspb$jetski_memory$MutableDreamingConfig.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$jetski_memory$MutableDreamingConfig.displayName = 'proto.jetski_memory.DreamingConfig';
}
/**
 * Interface form of DreamingConfig as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  disable: (boolean|undefined),
 *  promptPath: (string|undefined),
 *  bin: (string|undefined),
 *  modelEnum: (!jspb$e.exa$codeium_common_pb$Model|undefined)
 * }}
 */
jspb$jetski_memory$MutableDreamingConfig.FieldsInterface;

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
 * @param {!jspb$jetski_memory$MutableDreamingConfig.FieldsInterface} record
 * @return {!jspb$jetski_memory$ImmutableDreamingConfig}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$jetski_memory$MutableDreamingConfig, ಠ_ಠ.clutz.jspb$jetski_memory$MutableDreamingConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$jetski_memory$ImmutableDreamingConfig
 */
jspb$jetski_memory$MutableDreamingConfig.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$jetski_memory$MutableDreamingConfig));

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
 * @param {!jspb$ro.jetski_memory$ReadonlyDreamingConfig} value
 * @return {!jspb$jetski_memory$MutableDreamingConfig.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.jetski_memory$ReadonlyDreamingConfig): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$jetski_memory$MutableDreamingConfig, ಠ_ಠ.clutz.jspb$jetski_memory$MutableDreamingConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$jetski_memory$MutableDreamingConfig.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$google$protobuf$MutableDuration;
Object.defineProperty(this, 'jspb$google$protobuf$MutableDuration', {
  get() { return jspb$google$protobuf$MutableDuration; },
  set(v) { jspb$google$protobuf$MutableDuration = v; },
