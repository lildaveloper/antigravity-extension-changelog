// source: learning/gemini/agents/projects/memory/fuse/proto/config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$jetski_memory$MutableSkillsBackendConfig');
goog.provide('jspb$ro.jetski_memory$ReadonlySkillsBackendConfig');

goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$jetski_memory$ImmutableSkillsBackendConfig');
goog.requireType('jspb$r$jetski_memory$SkillsBackendConfig$internalDoNotUseReader');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$jetski_memory$ImmutableSkillsBackendConfig>}
 * @implements {jspb$r$jetski_memory$SkillsBackendConfig$internalDoNotUseReader}
 */
jspb$jetski_memory$MutableSkillsBackendConfig = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional string target = 1;
   * @override
   * @return {string}
   */
  getTarget() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 1);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$jetski_memory$MutableSkillsBackendConfig} returns this
   */
  setTarget(value) {
    return jspb_internal_adapters.setStringField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableSkillsBackendConfig} returns this
   */
  clearTarget() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasTarget() {
    return jspb_internal_adapters.hasStringField(this, 1);
  }


  /**
   * optional string target = 1;
   * @override
   * @return {string|undefined}
   */
  getTargetOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 1);
  }


};

/**
 * @override
 * @return {!jspb$jetski_memory$ImmutableSkillsBackendConfig}
 */
jspb$jetski_memory$MutableSkillsBackendConfig.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$jetski_memory$MutableSkillsBackendConfig}
 */
jspb$jetski_memory$MutableSkillsBackendConfig.prototype.clone;
/**
 * @const {function(string):!jspb$jetski_memory$MutableSkillsBackendConfig}
 */
jspb$jetski_memory$MutableSkillsBackendConfig.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$jetski_memory$MutableSkillsBackendConfig));

/**
 * Returns whether the given value is an instance of jspb$jetski_memory$MutableSkillsBackendConfig.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$jetski_memory$MutableSkillsBackendConfig>}
 */
jspb$jetski_memory$MutableSkillsBackendConfig.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$jetski_memory$MutableSkillsBackendConfig));

/**
 * Object form of SkillsBackendConfig as accepted by the `fromObject` method.
 * @typedef {{
 *  target: (?string|undefined)
 * }}
 */
jspb$jetski_memory$MutableSkillsBackendConfig.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$jetski_memory$MutableSkillsBackendConfig.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$jetski_memory$MutableSkillsBackendConfig.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$jetski_memory$MutableSkillsBackendConfig.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for jetski_memory$MutableSkillsBackendConfig.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$jetski_memory$MutableSkillsBackendConfig.internalDoNotUse_debugOnlyProtoTypeName = "jetski_memory.SkillsBackendConfig";
}

/**
 * @typedef {!jspb$jetski_memory$ImmutableSkillsBackendConfig|!jspb$jetski_memory$MutableSkillsBackendConfig}
 */
jspb$ro.jetski_memory$ReadonlySkillsBackendConfig = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'jetski_memory.SkillsBackendConfig'}
   */
  jspb$jetski_memory$MutableSkillsBackendConfig.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$jetski_memory$MutableSkillsBackendConfig.displayName = 'proto.jetski_memory.SkillsBackendConfig';
}
/**
 * Interface form of SkillsBackendConfig as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  target: (string|undefined)
 * }}
 */
jspb$jetski_memory$MutableSkillsBackendConfig.FieldsInterface;

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
 * @param {!jspb$jetski_memory$MutableSkillsBackendConfig.FieldsInterface} record
 * @return {!jspb$jetski_memory$ImmutableSkillsBackendConfig}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$jetski_memory$MutableSkillsBackendConfig, ಠ_ಠ.clutz.jspb$jetski_memory$MutableSkillsBackendConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$jetski_memory$ImmutableSkillsBackendConfig
 */
jspb$jetski_memory$MutableSkillsBackendConfig.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$jetski_memory$MutableSkillsBackendConfig));

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
 * @param {!jspb$ro.jetski_memory$ReadonlySkillsBackendConfig} value
 * @return {!jspb$jetski_memory$MutableSkillsBackendConfig.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.jetski_memory$ReadonlySkillsBackendConfig): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$jetski_memory$MutableSkillsBackendConfig, ಠ_ಠ.clutz.jspb$jetski_memory$MutableSkillsBackendConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$jetski_memory$MutableSkillsBackendConfig.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$jetski_memory$MutableSmithBackendConfig;
Object.defineProperty(this, 'jspb$jetski_memory$MutableSmithBackendConfig', {
  get() { return jspb$jetski_memory$MutableSmithBackendConfig; },
  set(v) { jspb$jetski_memory$MutableSmithBackendConfig = v; },
