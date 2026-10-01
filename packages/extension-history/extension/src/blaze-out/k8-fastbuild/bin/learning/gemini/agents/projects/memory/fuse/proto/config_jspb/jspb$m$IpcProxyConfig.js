// source: learning/gemini/agents/projects/memory/fuse/proto/config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$jetski_memory$MutableIpcProxyConfig');
goog.provide('jspb$ro.jetski_memory$ReadonlyIpcProxyConfig');

goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$jetski_memory$ImmutableIpcProxyConfig');
goog.requireType('jspb$r$jetski_memory$IpcProxyConfig$internalDoNotUseReader');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$jetski_memory$ImmutableIpcProxyConfig>}
 * @implements {jspb$r$jetski_memory$IpcProxyConfig$internalDoNotUseReader}
 */
jspb$jetski_memory$MutableIpcProxyConfig = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional int32 fd_req = 1;
   * @override
   * @return {number}
   */
  getFdReq() {
    return jspb_internal_adapters.getInt32FieldWithDefault(this, 1, 4);
  }


  /**
   * @param {number|null|undefined} value
   * @return {!jspb$jetski_memory$MutableIpcProxyConfig} returns this
   */
  setFdReq(value) {
    return jspb_internal_adapters.setInt32Field(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableIpcProxyConfig} returns this
   */
  clearFdReq() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasFdReq() {
    return jspb_internal_adapters.hasInt32Field(this, 1);
  }


  /**
   * optional int32 fd_req = 1;
   * @override
   * @return {number|undefined}
   */
  getFdReqOrUndefined() {
    return jspb_internal_adapters.getInt32FieldOrUndefined(this, 1);
  }


  /**
   * optional int32 fd_resp = 2;
   * @override
   * @return {number}
   */
  getFdResp() {
    return jspb_internal_adapters.getInt32FieldWithDefault(this, 2, 3);
  }


  /**
   * @param {number|null|undefined} value
   * @return {!jspb$jetski_memory$MutableIpcProxyConfig} returns this
   */
  setFdResp(value) {
    return jspb_internal_adapters.setInt32Field(this, 2, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableIpcProxyConfig} returns this
   */
  clearFdResp() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasFdResp() {
    return jspb_internal_adapters.hasInt32Field(this, 2);
  }


  /**
   * optional int32 fd_resp = 2;
   * @override
   * @return {number|undefined}
   */
  getFdRespOrUndefined() {
    return jspb_internal_adapters.getInt32FieldOrUndefined(this, 2);
  }


  /**
   * optional int32 timeout_ms = 3;
   * @override
   * @return {number}
   */
  getTimeoutMs() {
    return jspb_internal_adapters.getInt32FieldWithDefault(this, 3, 5000);
  }


  /**
   * @param {number|null|undefined} value
   * @return {!jspb$jetski_memory$MutableIpcProxyConfig} returns this
   */
  setTimeoutMs(value) {
    return jspb_internal_adapters.setInt32Field(this, 3, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableIpcProxyConfig} returns this
   */
  clearTimeoutMs() {
    return jspb_internal_adapters.clearField(this, 3);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasTimeoutMs() {
    return jspb_internal_adapters.hasInt32Field(this, 3);
  }


  /**
   * optional int32 timeout_ms = 3;
   * @override
   * @return {number|undefined}
   */
  getTimeoutMsOrUndefined() {
    return jspb_internal_adapters.getInt32FieldOrUndefined(this, 3);
  }


};

/**
 * @override
 * @return {!jspb$jetski_memory$ImmutableIpcProxyConfig}
 */
jspb$jetski_memory$MutableIpcProxyConfig.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$jetski_memory$MutableIpcProxyConfig}
 */
jspb$jetski_memory$MutableIpcProxyConfig.prototype.clone;
/**
 * @const {function(string):!jspb$jetski_memory$MutableIpcProxyConfig}
 */
jspb$jetski_memory$MutableIpcProxyConfig.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$jetski_memory$MutableIpcProxyConfig));

/**
 * Returns whether the given value is an instance of jspb$jetski_memory$MutableIpcProxyConfig.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$jetski_memory$MutableIpcProxyConfig>}
 */
jspb$jetski_memory$MutableIpcProxyConfig.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$jetski_memory$MutableIpcProxyConfig));

/**
 * Object form of IpcProxyConfig as accepted by the `fromObject` method.
 * @typedef {{
 *  fdReq: (?number|undefined),
 *  fdResp: (?number|undefined),
 *  timeoutMs: (?number|undefined)
 * }}
 */
jspb$jetski_memory$MutableIpcProxyConfig.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$jetski_memory$MutableIpcProxyConfig.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$jetski_memory$MutableIpcProxyConfig.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$jetski_memory$MutableIpcProxyConfig.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for jetski_memory$MutableIpcProxyConfig.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$jetski_memory$MutableIpcProxyConfig.internalDoNotUse_debugOnlyProtoTypeName = "jetski_memory.IpcProxyConfig";
}

/**
 * @typedef {!jspb$jetski_memory$ImmutableIpcProxyConfig|!jspb$jetski_memory$MutableIpcProxyConfig}
 */
jspb$ro.jetski_memory$ReadonlyIpcProxyConfig = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'jetski_memory.IpcProxyConfig'}
   */
  jspb$jetski_memory$MutableIpcProxyConfig.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$jetski_memory$MutableIpcProxyConfig.displayName = 'proto.jetski_memory.IpcProxyConfig';
}
/**
 * Interface form of IpcProxyConfig as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  fdReq: (number|undefined),
 *  fdResp: (number|undefined),
 *  timeoutMs: (number|undefined)
 * }}
 */
jspb$jetski_memory$MutableIpcProxyConfig.FieldsInterface;

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
 * @param {!jspb$jetski_memory$MutableIpcProxyConfig.FieldsInterface} record
 * @return {!jspb$jetski_memory$ImmutableIpcProxyConfig}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$jetski_memory$MutableIpcProxyConfig, ಠ_ಠ.clutz.jspb$jetski_memory$MutableIpcProxyConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$jetski_memory$ImmutableIpcProxyConfig
 */
jspb$jetski_memory$MutableIpcProxyConfig.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$jetski_memory$MutableIpcProxyConfig));

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
 * @param {!jspb$ro.jetski_memory$ReadonlyIpcProxyConfig} value
 * @return {!jspb$jetski_memory$MutableIpcProxyConfig.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.jetski_memory$ReadonlyIpcProxyConfig): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$jetski_memory$MutableIpcProxyConfig, ಠ_ಠ.clutz.jspb$jetski_memory$MutableIpcProxyConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$jetski_memory$MutableIpcProxyConfig.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$jetski_memory$MutableDumboBackendConfig;
Object.defineProperty(this, 'jspb$jetski_memory$MutableDumboBackendConfig', {
  get() { return jspb$jetski_memory$MutableDumboBackendConfig; },
  set(v) { jspb$jetski_memory$MutableDumboBackendConfig = v; },
