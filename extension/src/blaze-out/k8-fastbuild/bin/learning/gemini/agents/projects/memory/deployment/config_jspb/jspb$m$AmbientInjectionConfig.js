// source: learning/gemini/agents/projects/memory/deployment/config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$jetski_memory$MutableAmbientInjectionConfig');
goog.provide('jspb$ro.jetski_memory$ReadonlyAmbientInjectionConfig');

goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$jetski_memory$ImmutableAmbientInjectionConfig');
goog.requireType('jspb$r$jetski_memory$AmbientInjectionConfig$internalDoNotUseReader');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$jetski_memory$ImmutableAmbientInjectionConfig>}
 * @implements {jspb$r$jetski_memory$AmbientInjectionConfig$internalDoNotUseReader}
 */
jspb$jetski_memory$MutableAmbientInjectionConfig = class extends jspb_internal_public_for_gencode.GeneratedMessage {
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
   * @return {!jspb$jetski_memory$MutableAmbientInjectionConfig} returns this
   */
  setDisable(value) {
    return jspb_internal_adapters.setProto3BooleanField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableAmbientInjectionConfig} returns this
   */
  clearDisable() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * optional string bin = 2;
   * @override
   * @return {string}
   */
  getBin() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 2);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$jetski_memory$MutableAmbientInjectionConfig} returns this
   */
  setBin(value) {
    return jspb_internal_adapters.setProto3StringField(this, 2, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableAmbientInjectionConfig} returns this
   */
  clearBin() {
    return jspb_internal_adapters.clearField(this, 2);
  }


};

/**
 * @override
 * @return {!jspb$jetski_memory$ImmutableAmbientInjectionConfig}
 */
jspb$jetski_memory$MutableAmbientInjectionConfig.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$jetski_memory$MutableAmbientInjectionConfig}
 */
jspb$jetski_memory$MutableAmbientInjectionConfig.prototype.clone;
/**
 * @const {function(string):!jspb$jetski_memory$MutableAmbientInjectionConfig}
 */
jspb$jetski_memory$MutableAmbientInjectionConfig.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$jetski_memory$MutableAmbientInjectionConfig));

/**
 * Returns whether the given value is an instance of jspb$jetski_memory$MutableAmbientInjectionConfig.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$jetski_memory$MutableAmbientInjectionConfig>}
 */
jspb$jetski_memory$MutableAmbientInjectionConfig.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$jetski_memory$MutableAmbientInjectionConfig));

/**
 * Object form of AmbientInjectionConfig as accepted by the `fromObject` method.
 * @typedef {{
 *  disable: (?boolean|undefined),
 *  bin: (?string|undefined)
 * }}
 */
jspb$jetski_memory$MutableAmbientInjectionConfig.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$jetski_memory$MutableAmbientInjectionConfig.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$jetski_memory$MutableAmbientInjectionConfig.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$jetski_memory$MutableAmbientInjectionConfig.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for jetski_memory$MutableAmbientInjectionConfig.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$jetski_memory$MutableAmbientInjectionConfig.internalDoNotUse_debugOnlyProtoTypeName = "jetski_memory.AmbientInjectionConfig";
}

/**
 * @typedef {!jspb$jetski_memory$ImmutableAmbientInjectionConfig|!jspb$jetski_memory$MutableAmbientInjectionConfig}
 */
jspb$ro.jetski_memory$ReadonlyAmbientInjectionConfig = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'jetski_memory.AmbientInjectionConfig'}
   */
  jspb$jetski_memory$MutableAmbientInjectionConfig.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$jetski_memory$MutableAmbientInjectionConfig.displayName = 'proto.jetski_memory.AmbientInjectionConfig';
}
/**
 * Interface form of AmbientInjectionConfig as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  disable: (boolean|undefined),
 *  bin: (string|undefined)
 * }}
 */
jspb$jetski_memory$MutableAmbientInjectionConfig.FieldsInterface;

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
 * @param {!jspb$jetski_memory$MutableAmbientInjectionConfig.FieldsInterface} record
 * @return {!jspb$jetski_memory$ImmutableAmbientInjectionConfig}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$jetski_memory$MutableAmbientInjectionConfig, ಠ_ಠ.clutz.jspb$jetski_memory$MutableAmbientInjectionConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$jetski_memory$ImmutableAmbientInjectionConfig
 */
jspb$jetski_memory$MutableAmbientInjectionConfig.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$jetski_memory$MutableAmbientInjectionConfig));

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
 * @param {!jspb$ro.jetski_memory$ReadonlyAmbientInjectionConfig} value
 * @return {!jspb$jetski_memory$MutableAmbientInjectionConfig.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.jetski_memory$ReadonlyAmbientInjectionConfig): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$jetski_memory$MutableAmbientInjectionConfig, ಠ_ಠ.clutz.jspb$jetski_memory$MutableAmbientInjectionConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$jetski_memory$MutableAmbientInjectionConfig.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$jetski_memory$MutableDreamingConfig;
Object.defineProperty(this, 'jspb$jetski_memory$MutableDreamingConfig', {
  get() { return jspb$jetski_memory$MutableDreamingConfig; },
  set(v) { jspb$jetski_memory$MutableDreamingConfig = v; },
