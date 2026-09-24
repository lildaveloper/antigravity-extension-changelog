// source: learning/gemini/agents/projects/memory/fuse/proto/config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$jetski_memory$MutableSojoBackendConfig');
goog.provide('jspb$ro.jetski_memory$ReadonlySojoBackendConfig');

goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$jetski_memory$ImmutableSojoBackendConfig');
goog.requireType('jspb$r$jetski_memory$SojoBackendConfig$internalDoNotUseReader');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$jetski_memory$ImmutableSojoBackendConfig>}
 * @implements {jspb$r$jetski_memory$SojoBackendConfig$internalDoNotUseReader}
 */
jspb$jetski_memory$MutableSojoBackendConfig = class extends jspb_internal_public_for_gencode.GeneratedMessage {
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
   * @return {!jspb$jetski_memory$MutableSojoBackendConfig} returns this
   */
  setTarget(value) {
    return jspb_internal_adapters.setStringField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableSojoBackendConfig} returns this
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


  /**
   * optional string agent_id = 2;
   * @override
   * @return {string}
   */
  getAgentId() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 2);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$jetski_memory$MutableSojoBackendConfig} returns this
   */
  setAgentId(value) {
    return jspb_internal_adapters.setStringField(this, 2, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableSojoBackendConfig} returns this
   */
  clearAgentId() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasAgentId() {
    return jspb_internal_adapters.hasStringField(this, 2);
  }


  /**
   * optional string agent_id = 2;
   * @override
   * @return {string|undefined}
   */
  getAgentIdOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 2);
  }


  /**
   * optional bool read_only = 3;
   * @override
   * @return {boolean}
   */
  getReadOnly() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 3);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$jetski_memory$MutableSojoBackendConfig} returns this
   */
  setReadOnly(value) {
    return jspb_internal_adapters.setBooleanField(this, 3, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableSojoBackendConfig} returns this
   */
  clearReadOnly() {
    return jspb_internal_adapters.clearField(this, 3);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasReadOnly() {
    return jspb_internal_adapters.hasBooleanField(this, 3);
  }


  /**
   * optional bool read_only = 3;
   * @override
   * @return {boolean|undefined}
   */
  getReadOnlyOrUndefined() {
    return jspb_internal_adapters.getBooleanFieldOrUndefined(this, 3);
  }


};

/**
 * @override
 * @return {!jspb$jetski_memory$ImmutableSojoBackendConfig}
 */
jspb$jetski_memory$MutableSojoBackendConfig.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$jetski_memory$MutableSojoBackendConfig}
 */
jspb$jetski_memory$MutableSojoBackendConfig.prototype.clone;
/**
 * @const {function(string):!jspb$jetski_memory$MutableSojoBackendConfig}
 */
jspb$jetski_memory$MutableSojoBackendConfig.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$jetski_memory$MutableSojoBackendConfig));

/**
 * Returns whether the given value is an instance of jspb$jetski_memory$MutableSojoBackendConfig.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$jetski_memory$MutableSojoBackendConfig>}
 */
jspb$jetski_memory$MutableSojoBackendConfig.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$jetski_memory$MutableSojoBackendConfig));

/**
 * Object form of SojoBackendConfig as accepted by the `fromObject` method.
 * @typedef {{
 *  target: (?string|undefined),
 *  agentId: (?string|undefined),
 *  readOnly: (?boolean|undefined)
 * }}
 */
jspb$jetski_memory$MutableSojoBackendConfig.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$jetski_memory$MutableSojoBackendConfig.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$jetski_memory$MutableSojoBackendConfig.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$jetski_memory$MutableSojoBackendConfig.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for jetski_memory$MutableSojoBackendConfig.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$jetski_memory$MutableSojoBackendConfig.internalDoNotUse_debugOnlyProtoTypeName = "jetski_memory.SojoBackendConfig";
}

/**
 * @typedef {!jspb$jetski_memory$ImmutableSojoBackendConfig|!jspb$jetski_memory$MutableSojoBackendConfig}
 */
jspb$ro.jetski_memory$ReadonlySojoBackendConfig = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'jetski_memory.SojoBackendConfig'}
   */
  jspb$jetski_memory$MutableSojoBackendConfig.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$jetski_memory$MutableSojoBackendConfig.displayName = 'proto.jetski_memory.SojoBackendConfig';
}
/**
 * Interface form of SojoBackendConfig as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  target: (string|undefined),
 *  agentId: (string|undefined),
 *  readOnly: (boolean|undefined)
 * }}
 */
jspb$jetski_memory$MutableSojoBackendConfig.FieldsInterface;

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
 * @param {!jspb$jetski_memory$MutableSojoBackendConfig.FieldsInterface} record
 * @return {!jspb$jetski_memory$ImmutableSojoBackendConfig}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$jetski_memory$MutableSojoBackendConfig, ಠ_ಠ.clutz.jspb$jetski_memory$MutableSojoBackendConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$jetski_memory$ImmutableSojoBackendConfig
 */
jspb$jetski_memory$MutableSojoBackendConfig.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$jetski_memory$MutableSojoBackendConfig));

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
 * @param {!jspb$ro.jetski_memory$ReadonlySojoBackendConfig} value
 * @return {!jspb$jetski_memory$MutableSojoBackendConfig.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.jetski_memory$ReadonlySojoBackendConfig): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$jetski_memory$MutableSojoBackendConfig, ಠ_ಠ.clutz.jspb$jetski_memory$MutableSojoBackendConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$jetski_memory$MutableSojoBackendConfig.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$jetski_memory$MutableMemoryMountConfig;
Object.defineProperty(this, 'jspb$jetski_memory$MutableMemoryMountConfig', {
  get() { return jspb$jetski_memory$MutableMemoryMountConfig; },
  set(v) { jspb$jetski_memory$MutableMemoryMountConfig = v; },
