// source: devtools/jetski/boq/provisioning_service/proto/deployment_config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$devtools_jetski_provisioning$MutableMemoryConfig');
goog.provide('jspb$ro.devtools_jetski_provisioning$ReadonlyMemoryConfig');

goog.require('jspb$jetski_memory$MutableMemoryConfig');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$devtools_jetski_provisioning$ImmutableMemoryConfig');
goog.requireType('jspb$e.devtools_jetski_provisioning$MemoryConfig$State');
goog.requireType('jspb$r$devtools_jetski_provisioning$MemoryConfig$internalDoNotUseReader');
goog.requireType('jspb$ro.jetski_memory$ReadonlyMemoryConfig');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$devtools_jetski_provisioning$ImmutableMemoryConfig>}
 * @implements {jspb$r$devtools_jetski_provisioning$MemoryConfig$internalDoNotUseReader}
 */
jspb$devtools_jetski_provisioning$MutableMemoryConfig = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional State state = 1;
   * @override
   * @return {!jspb$e.devtools_jetski_provisioning$MemoryConfig$State}
   */
  getState() {
    return /** @type {!jspb$e.devtools_jetski_provisioning$MemoryConfig$State} */ (jspb_internal_adapters.getEnumFieldWithDefault(this, 1));
  }


  /**
   * @param {!jspb$e.devtools_jetski_provisioning$MemoryConfig$State|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableMemoryConfig} returns this
   */
  setState(value) {
    return jspb_internal_adapters.setEnumField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableMemoryConfig} returns this
   */
  clearState() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasState() {
    return jspb_internal_adapters.hasEnumField(this, 1);
  }


  /**
   * optional State state = 1;
   * @override
   * @return {!jspb$e.devtools_jetski_provisioning$MemoryConfig$State|undefined}
   */
  getStateOrUndefined() {
    return /** @type {!jspb$e.devtools_jetski_provisioning$MemoryConfig$State|undefined} */ (jspb_internal_adapters.getEnumFieldOrUndefined(this, 1));
  }


  /**
   * optional jetski_memory.MemoryConfig config = 2;
   * @override
   * @return {!jspb$jetski_memory$MutableMemoryConfig|undefined}
   */
  getConfig() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$jetski_memory$MutableMemoryConfig, 2);
  }


  /**
   * optional jetski_memory.MemoryConfig config = 2;
   * @override
   * @return {!jspb$ro.jetski_memory$ReadonlyMemoryConfig}
   */
  getReadonlyConfig() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$jetski_memory$MutableMemoryConfig, 2);
  }


  /**
   * optional jetski_memory.MemoryConfig config = 2;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$jetski_memory$MutableMemoryConfig|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$jetski_memory$MutableMemoryConfig') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$jetski_memory$MutableMemoryConfig|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$jetski_memory$MutableMemoryConfig
   */
  getMutableConfig(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$jetski_memory$MutableMemoryConfig, 2, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.jetski_memory$ReadonlyMemoryConfig|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableMemoryConfig} returns this
   */
  setConfig(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$jetski_memory$MutableMemoryConfig, 2, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableMemoryConfig} returns this
   */
  clearConfig() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasConfig() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$jetski_memory$MutableMemoryConfig, 2);
  }


  /**
   * optional jetski_memory.MemoryConfig config = 2;
   * @override
   * @return {!jspb$ro.jetski_memory$ReadonlyMemoryConfig|undefined}
   */
  getConfigOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$jetski_memory$MutableMemoryConfig, 2);
  }


};

/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$ImmutableMemoryConfig}
 */
jspb$devtools_jetski_provisioning$MutableMemoryConfig.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$MutableMemoryConfig}
 */
jspb$devtools_jetski_provisioning$MutableMemoryConfig.prototype.clone;
/**
 * @const {function(string):!jspb$devtools_jetski_provisioning$MutableMemoryConfig}
 */
jspb$devtools_jetski_provisioning$MutableMemoryConfig.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$devtools_jetski_provisioning$MutableMemoryConfig));

/**
 * Returns whether the given value is an instance of jspb$devtools_jetski_provisioning$MutableMemoryConfig.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$devtools_jetski_provisioning$MutableMemoryConfig>}
 */
jspb$devtools_jetski_provisioning$MutableMemoryConfig.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$devtools_jetski_provisioning$MutableMemoryConfig));

/**
 * Object form of MemoryConfig as accepted by the `fromObject` method.
 * @typedef {{
 *  state: (?number|undefined),
 *  config: (?jspb$jetski_memory$MutableMemoryConfig.ObjectFormat|undefined)
 * }}
 */
jspb$devtools_jetski_provisioning$MutableMemoryConfig.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$devtools_jetski_provisioning$MutableMemoryConfig.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$devtools_jetski_provisioning$MutableMemoryConfig.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$devtools_jetski_provisioning$MutableMemoryConfig.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for devtools_jetski_provisioning$MutableMemoryConfig.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$devtools_jetski_provisioning$MutableMemoryConfig.internalDoNotUse_debugOnlyProtoTypeName = "devtools_jetski_provisioning.MemoryConfig";
}

/**
 * @typedef {!jspb$devtools_jetski_provisioning$ImmutableMemoryConfig|!jspb$devtools_jetski_provisioning$MutableMemoryConfig}
 */
jspb$ro.devtools_jetski_provisioning$ReadonlyMemoryConfig = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'devtools_jetski_provisioning.MemoryConfig'}
   */
  jspb$devtools_jetski_provisioning$MutableMemoryConfig.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$devtools_jetski_provisioning$MutableMemoryConfig.displayName = 'proto.devtools_jetski_provisioning.MemoryConfig';
}
/**
 * Interface form of MemoryConfig as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  state: (!jspb$e.devtools_jetski_provisioning$MemoryConfig$State|undefined),
 *  config: (!jspb$ro.jetski_memory$ReadonlyMemoryConfig|undefined)
 * }}
 */
jspb$devtools_jetski_provisioning$MutableMemoryConfig.FieldsInterface;

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
 * @param {!jspb$devtools_jetski_provisioning$MutableMemoryConfig.FieldsInterface} record
 * @return {!jspb$devtools_jetski_provisioning$ImmutableMemoryConfig}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableMemoryConfig, ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableMemoryConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$ImmutableMemoryConfig
 */
jspb$devtools_jetski_provisioning$MutableMemoryConfig.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$devtools_jetski_provisioning$MutableMemoryConfig));

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
 * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyMemoryConfig} value
 * @return {!jspb$devtools_jetski_provisioning$MutableMemoryConfig.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.devtools_jetski_provisioning$ReadonlyMemoryConfig): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableMemoryConfig, ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableMemoryConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$devtools_jetski_provisioning$MutableMemoryConfig.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$b$jetski_memory$AmbientInjectionConfig;
Object.defineProperty(this, 'jspb$b$jetski_memory$AmbientInjectionConfig', {
  get() { return jspb$b$jetski_memory$AmbientInjectionConfig; },
  set(v) { jspb$b$jetski_memory$AmbientInjectionConfig = v; },
