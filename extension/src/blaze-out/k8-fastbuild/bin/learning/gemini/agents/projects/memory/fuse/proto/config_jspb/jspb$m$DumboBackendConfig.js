// source: learning/gemini/agents/projects/memory/fuse/proto/config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$jetski_memory$MutableDumboBackendConfig');
goog.provide('jspb$ro.jetski_memory$ReadonlyDumboBackendConfig');

goog.require('jspb$jetski_memory$MutableIpcProxyConfig');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$jetski_memory$ImmutableDumboBackendConfig');
goog.requireType('jspb$r$jetski_memory$DumboBackendConfig$internalDoNotUseReader');
goog.requireType('jspb$ro.jetski_memory$ReadonlyIpcProxyConfig');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$jetski_memory$ImmutableDumboBackendConfig>}
 * @implements {jspb$r$jetski_memory$DumboBackendConfig$internalDoNotUseReader}
 */
jspb$jetski_memory$MutableDumboBackendConfig = class extends jspb_internal_public_for_gencode.GeneratedMessage {
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
   * @return {!jspb$jetski_memory$MutableDumboBackendConfig} returns this
   */
  setTarget(value) {
    return jspb_internal_adapters.setStringField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableDumboBackendConfig} returns this
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
   * optional string resource_name = 2;
   * @override
   * @return {string}
   */
  getResourceName() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 2);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$jetski_memory$MutableDumboBackendConfig} returns this
   */
  setResourceName(value) {
    return jspb_internal_adapters.setStringField(this, 2, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableDumboBackendConfig} returns this
   */
  clearResourceName() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasResourceName() {
    return jspb_internal_adapters.hasStringField(this, 2);
  }


  /**
   * optional string resource_name = 2;
   * @override
   * @return {string|undefined}
   */
  getResourceNameOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 2);
  }


  /**
   * optional IpcProxyConfig ipc_proxy = 3;
   * @override
   * @return {!jspb$jetski_memory$MutableIpcProxyConfig|undefined}
   */
  getIpcProxy() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$jetski_memory$MutableIpcProxyConfig, 3);
  }


  /**
   * optional IpcProxyConfig ipc_proxy = 3;
   * @override
   * @return {!jspb$ro.jetski_memory$ReadonlyIpcProxyConfig}
   */
  getReadonlyIpcProxy() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$jetski_memory$MutableIpcProxyConfig, 3);
  }


  /**
   * optional IpcProxyConfig ipc_proxy = 3;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$jetski_memory$MutableIpcProxyConfig|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$jetski_memory$MutableIpcProxyConfig') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$jetski_memory$MutableIpcProxyConfig|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$jetski_memory$MutableIpcProxyConfig
   */
  getMutableIpcProxy(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$jetski_memory$MutableIpcProxyConfig, 3, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.jetski_memory$ReadonlyIpcProxyConfig|null|undefined} value
   * @return {!jspb$jetski_memory$MutableDumboBackendConfig} returns this
   */
  setIpcProxy(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$jetski_memory$MutableIpcProxyConfig, 3, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableDumboBackendConfig} returns this
   */
  clearIpcProxy() {
    return jspb_internal_adapters.clearField(this, 3);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasIpcProxy() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$jetski_memory$MutableIpcProxyConfig, 3);
  }


  /**
   * optional IpcProxyConfig ipc_proxy = 3;
   * @override
   * @return {!jspb$ro.jetski_memory$ReadonlyIpcProxyConfig|undefined}
   */
  getIpcProxyOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$jetski_memory$MutableIpcProxyConfig, 3);
  }


  /**
   * optional bool read_only = 4;
   * @override
   * @return {boolean}
   */
  getReadOnly() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 4);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$jetski_memory$MutableDumboBackendConfig} returns this
   */
  setReadOnly(value) {
    return jspb_internal_adapters.setBooleanField(this, 4, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableDumboBackendConfig} returns this
   */
  clearReadOnly() {
    return jspb_internal_adapters.clearField(this, 4);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasReadOnly() {
    return jspb_internal_adapters.hasBooleanField(this, 4);
  }


  /**
   * optional bool read_only = 4;
   * @override
   * @return {boolean|undefined}
   */
  getReadOnlyOrUndefined() {
    return jspb_internal_adapters.getBooleanFieldOrUndefined(this, 4);
  }


};

/**
 * @override
 * @return {!jspb$jetski_memory$ImmutableDumboBackendConfig}
 */
jspb$jetski_memory$MutableDumboBackendConfig.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$jetski_memory$MutableDumboBackendConfig}
 */
jspb$jetski_memory$MutableDumboBackendConfig.prototype.clone;
/**
 * @const {function(string):!jspb$jetski_memory$MutableDumboBackendConfig}
 */
jspb$jetski_memory$MutableDumboBackendConfig.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$jetski_memory$MutableDumboBackendConfig));

/**
 * Returns whether the given value is an instance of jspb$jetski_memory$MutableDumboBackendConfig.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$jetski_memory$MutableDumboBackendConfig>}
 */
jspb$jetski_memory$MutableDumboBackendConfig.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$jetski_memory$MutableDumboBackendConfig));

/**
 * Object form of DumboBackendConfig as accepted by the `fromObject` method.
 * @typedef {{
 *  target: (?string|undefined),
 *  resourceName: (?string|undefined),
 *  ipcProxy: (?jspb$jetski_memory$MutableIpcProxyConfig.ObjectFormat|undefined),
 *  readOnly: (?boolean|undefined)
 * }}
 */
jspb$jetski_memory$MutableDumboBackendConfig.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$jetski_memory$MutableDumboBackendConfig.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$jetski_memory$MutableDumboBackendConfig.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$jetski_memory$MutableDumboBackendConfig.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for jetski_memory$MutableDumboBackendConfig.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$jetski_memory$MutableDumboBackendConfig.internalDoNotUse_debugOnlyProtoTypeName = "jetski_memory.DumboBackendConfig";
}

/**
 * @typedef {!jspb$jetski_memory$ImmutableDumboBackendConfig|!jspb$jetski_memory$MutableDumboBackendConfig}
 */
jspb$ro.jetski_memory$ReadonlyDumboBackendConfig = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'jetski_memory.DumboBackendConfig'}
   */
  jspb$jetski_memory$MutableDumboBackendConfig.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$jetski_memory$MutableDumboBackendConfig.displayName = 'proto.jetski_memory.DumboBackendConfig';
}
/**
 * Interface form of DumboBackendConfig as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  target: (string|undefined),
 *  resourceName: (string|undefined),
 *  ipcProxy: (!jspb$ro.jetski_memory$ReadonlyIpcProxyConfig|undefined),
 *  readOnly: (boolean|undefined)
 * }}
 */
jspb$jetski_memory$MutableDumboBackendConfig.FieldsInterface;

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
 * @param {!jspb$jetski_memory$MutableDumboBackendConfig.FieldsInterface} record
 * @return {!jspb$jetski_memory$ImmutableDumboBackendConfig}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$jetski_memory$MutableDumboBackendConfig, ಠ_ಠ.clutz.jspb$jetski_memory$MutableDumboBackendConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$jetski_memory$ImmutableDumboBackendConfig
 */
jspb$jetski_memory$MutableDumboBackendConfig.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$jetski_memory$MutableDumboBackendConfig));

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
 * @param {!jspb$ro.jetski_memory$ReadonlyDumboBackendConfig} value
 * @return {!jspb$jetski_memory$MutableDumboBackendConfig.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.jetski_memory$ReadonlyDumboBackendConfig): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$jetski_memory$MutableDumboBackendConfig, ಠ_ಠ.clutz.jspb$jetski_memory$MutableDumboBackendConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$jetski_memory$MutableDumboBackendConfig.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$jetski_memory$MutableMemoryBankBackendConfig;
Object.defineProperty(this, 'jspb$jetski_memory$MutableMemoryBankBackendConfig', {
  get() { return jspb$jetski_memory$MutableMemoryBankBackendConfig; },
  set(v) { jspb$jetski_memory$MutableMemoryBankBackendConfig = v; },
