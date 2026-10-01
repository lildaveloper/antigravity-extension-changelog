// source: devtools/jetski/boq/provisioning_service/storage/proto/storage.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo');
goog.provide('jspb$ro.devtools_jetski_provisioning$storage$ReadonlySidecarStatusInfo');

goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$devtools_jetski_provisioning$storage$ImmutableSidecarStatusInfo');
goog.requireType('jspb$e.devtools_jetski_provisioning$storage$SidecarStatus');
goog.requireType('jspb$r$devtools_jetski_provisioning$storage$SidecarStatusInfo$internalDoNotUseReader');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$devtools_jetski_provisioning$storage$ImmutableSidecarStatusInfo>}
 * @implements {jspb$r$devtools_jetski_provisioning$storage$SidecarStatusInfo$internalDoNotUseReader}
 */
jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional string sidecar_id = 1;
   * @override
   * @return {string}
   */
  getSidecarId() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 1);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo} returns this
   */
  setSidecarId(value) {
    return jspb_internal_adapters.setStringField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo} returns this
   */
  clearSidecarId() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasSidecarId() {
    return jspb_internal_adapters.hasStringField(this, 1);
  }


  /**
   * optional string sidecar_id = 1;
   * @override
   * @return {string|undefined}
   */
  getSidecarIdOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 1);
  }


  /**
   * optional SidecarStatus status = 2;
   * @override
   * @return {!jspb$e.devtools_jetski_provisioning$storage$SidecarStatus}
   */
  getStatus() {
    return /** @type {!jspb$e.devtools_jetski_provisioning$storage$SidecarStatus} */ (jspb_internal_adapters.getEnumFieldWithDefault(this, 2));
  }


  /**
   * @param {!jspb$e.devtools_jetski_provisioning$storage$SidecarStatus|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo} returns this
   */
  setStatus(value) {
    return jspb_internal_adapters.setEnumField(this, 2, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo} returns this
   */
  clearStatus() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasStatus() {
    return jspb_internal_adapters.hasEnumField(this, 2);
  }


  /**
   * optional SidecarStatus status = 2;
   * @override
   * @return {!jspb$e.devtools_jetski_provisioning$storage$SidecarStatus|undefined}
   */
  getStatusOrUndefined() {
    return /** @type {!jspb$e.devtools_jetski_provisioning$storage$SidecarStatus|undefined} */ (jspb_internal_adapters.getEnumFieldOrUndefined(this, 2));
  }


  /**
   * optional string last_error = 3;
   * @override
   * @return {string}
   */
  getLastError() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 3);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo} returns this
   */
  setLastError(value) {
    return jspb_internal_adapters.setStringField(this, 3, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo} returns this
   */
  clearLastError() {
    return jspb_internal_adapters.clearField(this, 3);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasLastError() {
    return jspb_internal_adapters.hasStringField(this, 3);
  }


  /**
   * optional string last_error = 3;
   * @override
   * @return {string|undefined}
   */
  getLastErrorOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 3);
  }


  /**
   * optional int64 start_time_ms = 4;
   * @override
   * @return {!gbigint}
   */
  getStartTimeMs() {
    return jspb_internal_adapters.getInt64GbigintFieldWithDefault(this, 4);
  }


  /**
   * optional int64 start_time_ms = 4;
   * @override
   * @return {number}
   * @deprecated unsafe int64 behavior: go/jspb-api-gotchas#int64
   */
  getStartTimeMs_asLegacyNumberOrString() {
    return jspb_internal_adapters.getInt64FieldWithDefault(this, 4);
  }


  /**
   * optional int64 start_time_ms = 4;
   * @override
   * @return {string}
   */
  getStartTimeMs_asString() {
    return jspb_internal_adapters.getInt64FieldWithDefault_asString(this, 4);
  }


  /**
   * @param {number|string|!gbigint|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo} returns this
   */
  setStartTimeMs(value) {
    return jspb_internal_adapters.setInt64Field(this, 4, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo} returns this
   */
  clearStartTimeMs() {
    return jspb_internal_adapters.clearField(this, 4);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasStartTimeMs() {
    return jspb_internal_adapters.hasInt64Field(this, 4);
  }


  /**
   * optional int64 start_time_ms = 4;
   * @override
   * @return {!gbigint|undefined}
   */
  getStartTimeMsOrUndefined() {
    return jspb_internal_adapters.getInt64GbigintFieldOrUndefined(this, 4);
  }


  /**
   * optional int64 start_time_ms = 4;
   * @override
   * @return {number|undefined}
   * @deprecated unsafe int64 behavior: go/jspb-api-gotchas#int64
   */
  getStartTimeMsOrUndefined_asLegacyNumberOrString() {
    return jspb_internal_adapters.getInt64FieldOrUndefined(this, 4);
  }


  /**
   * optional int64 start_time_ms = 4;
   * @override
   * @return {string|undefined}
   */
  getStartTimeMsOrUndefined_asString() {
    return jspb_internal_adapters.getInt64FieldOrUndefined_asString(this, 4);
  }


  /**
   * optional int32 port = 5;
   * @override
   * @return {number}
   */
  getPort() {
    return jspb_internal_adapters.getInt32FieldWithDefault(this, 5);
  }


  /**
   * @param {number|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo} returns this
   */
  setPort(value) {
    return jspb_internal_adapters.setInt32Field(this, 5, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo} returns this
   */
  clearPort() {
    return jspb_internal_adapters.clearField(this, 5);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasPort() {
    return jspb_internal_adapters.hasInt32Field(this, 5);
  }


  /**
   * optional int32 port = 5;
   * @override
   * @return {number|undefined}
   */
  getPortOrUndefined() {
    return jspb_internal_adapters.getInt32FieldOrUndefined(this, 5);
  }


  /**
   * optional string base_url = 6;
   * @override
   * @return {string}
   */
  getBaseUrl() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 6);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo} returns this
   */
  setBaseUrl(value) {
    return jspb_internal_adapters.setStringField(this, 6, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo} returns this
   */
  clearBaseUrl() {
    return jspb_internal_adapters.clearField(this, 6);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasBaseUrl() {
    return jspb_internal_adapters.hasStringField(this, 6);
  }


  /**
   * optional string base_url = 6;
   * @override
   * @return {string|undefined}
   */
  getBaseUrlOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 6);
  }


  /**
   * optional bool is_bundled = 7;
   * @override
   * @return {boolean}
   */
  getIsBundled() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 7);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo} returns this
   */
  setIsBundled(value) {
    return jspb_internal_adapters.setBooleanField(this, 7, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo} returns this
   */
  clearIsBundled() {
    return jspb_internal_adapters.clearField(this, 7);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasIsBundled() {
    return jspb_internal_adapters.hasBooleanField(this, 7);
  }


  /**
   * optional bool is_bundled = 7;
   * @override
   * @return {boolean|undefined}
   */
  getIsBundledOrUndefined() {
    return jspb_internal_adapters.getBooleanFieldOrUndefined(this, 7);
  }


};

/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$storage$ImmutableSidecarStatusInfo}
 */
jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo}
 */
jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo.prototype.clone;
/**
 * @const {function(string):!jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo}
 */
jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo));

/**
 * Returns whether the given value is an instance of jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo>}
 */
jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo));

/**
 * Object form of SidecarStatusInfo as accepted by the `fromObject` method.
 * @typedef {{
 *  sidecarId: (?string|undefined),
 *  status: (?number|undefined),
 *  lastError: (?string|undefined),
 *  startTimeMs: (?number|string|undefined),
 *  port: (?number|undefined),
 *  baseUrl: (?string|undefined),
 *  isBundled: (?boolean|undefined)
 * }}
 */
jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for devtools_jetski_provisioning$storage$MutableSidecarStatusInfo.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo.internalDoNotUse_debugOnlyProtoTypeName = "devtools_jetski_provisioning.storage.SidecarStatusInfo";
}

/**
 * @typedef {!jspb$devtools_jetski_provisioning$storage$ImmutableSidecarStatusInfo|!jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo}
 */
jspb$ro.devtools_jetski_provisioning$storage$ReadonlySidecarStatusInfo = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'devtools_jetski_provisioning.storage.SidecarStatusInfo'}
   */
  jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo.displayName = 'proto.devtools_jetski_provisioning.storage.SidecarStatusInfo';
}
/**
 * Interface form of SidecarStatusInfo as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  sidecarId: (string|undefined),
 *  status: (!jspb$e.devtools_jetski_provisioning$storage$SidecarStatus|undefined),
 *  lastError: (string|undefined),
 *  startTimeMs: (!gbigint|undefined),
 *  startTimeMs_asLegacyNumberOrString: (number|string|undefined),
 *  port: (number|undefined),
 *  baseUrl: (string|undefined),
 *  isBundled: (boolean|undefined)
 * }}
 */
jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo.FieldsInterface;

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
 * @param {!jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo.FieldsInterface} record
 * @return {!jspb$devtools_jetski_provisioning$storage$ImmutableSidecarStatusInfo}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo, ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$storage$ImmutableSidecarStatusInfo
 */
jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo));

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
 * @param {!jspb$ro.devtools_jetski_provisioning$storage$ReadonlySidecarStatusInfo} value
 * @return {!jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.devtools_jetski_provisioning$storage$ReadonlySidecarStatusInfo): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo, ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$devtools_jetski_provisioning$MutableInstance;
Object.defineProperty(this, 'jspb$devtools_jetski_provisioning$MutableInstance', {
  get() { return jspb$devtools_jetski_provisioning$MutableInstance; },
  set(v) { jspb$devtools_jetski_provisioning$MutableInstance = v; },
