// source: learning/gemini/agents/projects/memory/fuse/proto/config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$jetski_memory$MutableSmithBackendConfig');
goog.provide('jspb$ro.jetski_memory$ReadonlySmithBackendConfig');

goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$jetski_memory$ImmutableSmithBackendConfig');
goog.requireType('jspb$r$jetski_memory$SmithBackendConfig$internalDoNotUseReader');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$jetski_memory$ImmutableSmithBackendConfig>}
 * @implements {jspb$r$jetski_memory$SmithBackendConfig$internalDoNotUseReader}
 */
jspb$jetski_memory$MutableSmithBackendConfig = class extends jspb_internal_public_for_gencode.GeneratedMessage {
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
   * @return {!jspb$jetski_memory$MutableSmithBackendConfig} returns this
   */
  setTarget(value) {
    return jspb_internal_adapters.setStringField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableSmithBackendConfig} returns this
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
   * optional string memory_group = 2;
   * @override
   * @return {string}
   */
  getMemoryGroup() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 2);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$jetski_memory$MutableSmithBackendConfig} returns this
   */
  setMemoryGroup(value) {
    return jspb_internal_adapters.setStringField(this, 2, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableSmithBackendConfig} returns this
   */
  clearMemoryGroup() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasMemoryGroup() {
    return jspb_internal_adapters.hasStringField(this, 2);
  }


  /**
   * optional string memory_group = 2;
   * @override
   * @return {string|undefined}
   */
  getMemoryGroupOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 2);
  }


};

/**
 * @override
 * @return {!jspb$jetski_memory$ImmutableSmithBackendConfig}
 */
jspb$jetski_memory$MutableSmithBackendConfig.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$jetski_memory$MutableSmithBackendConfig}
 */
jspb$jetski_memory$MutableSmithBackendConfig.prototype.clone;
/**
 * @const {function(string):!jspb$jetski_memory$MutableSmithBackendConfig}
 */
jspb$jetski_memory$MutableSmithBackendConfig.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$jetski_memory$MutableSmithBackendConfig));

/**
 * Returns whether the given value is an instance of jspb$jetski_memory$MutableSmithBackendConfig.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$jetski_memory$MutableSmithBackendConfig>}
 */
jspb$jetski_memory$MutableSmithBackendConfig.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$jetski_memory$MutableSmithBackendConfig));

/**
 * Object form of SmithBackendConfig as accepted by the `fromObject` method.
 * @typedef {{
 *  target: (?string|undefined),
 *  memoryGroup: (?string|undefined)
 * }}
 */
jspb$jetski_memory$MutableSmithBackendConfig.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$jetski_memory$MutableSmithBackendConfig.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$jetski_memory$MutableSmithBackendConfig.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$jetski_memory$MutableSmithBackendConfig.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for jetski_memory$MutableSmithBackendConfig.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$jetski_memory$MutableSmithBackendConfig.internalDoNotUse_debugOnlyProtoTypeName = "jetski_memory.SmithBackendConfig";
}

/**
 * @typedef {!jspb$jetski_memory$ImmutableSmithBackendConfig|!jspb$jetski_memory$MutableSmithBackendConfig}
 */
jspb$ro.jetski_memory$ReadonlySmithBackendConfig = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'jetski_memory.SmithBackendConfig'}
   */
  jspb$jetski_memory$MutableSmithBackendConfig.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$jetski_memory$MutableSmithBackendConfig.displayName = 'proto.jetski_memory.SmithBackendConfig';
}
/**
 * Interface form of SmithBackendConfig as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  target: (string|undefined),
 *  memoryGroup: (string|undefined)
 * }}
 */
jspb$jetski_memory$MutableSmithBackendConfig.FieldsInterface;

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
 * @param {!jspb$jetski_memory$MutableSmithBackendConfig.FieldsInterface} record
 * @return {!jspb$jetski_memory$ImmutableSmithBackendConfig}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$jetski_memory$MutableSmithBackendConfig, ಠ_ಠ.clutz.jspb$jetski_memory$MutableSmithBackendConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$jetski_memory$ImmutableSmithBackendConfig
 */
jspb$jetski_memory$MutableSmithBackendConfig.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$jetski_memory$MutableSmithBackendConfig));

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
 * @param {!jspb$ro.jetski_memory$ReadonlySmithBackendConfig} value
 * @return {!jspb$jetski_memory$MutableSmithBackendConfig.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.jetski_memory$ReadonlySmithBackendConfig): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$jetski_memory$MutableSmithBackendConfig, ಠ_ಠ.clutz.jspb$jetski_memory$MutableSmithBackendConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$jetski_memory$MutableSmithBackendConfig.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$jetski_memory$MutableMemoryMountConfig;
Object.defineProperty(this, 'jspb$jetski_memory$MutableMemoryMountConfig', {
  get() { return jspb$jetski_memory$MutableMemoryMountConfig; },
  set(v) { jspb$jetski_memory$MutableMemoryMountConfig = v; },
