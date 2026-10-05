// source: devtools/jetski/boq/provisioning_service/proto/vmstorage_config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig');
goog.provide('jspb$ro.devtools_jetski_provisioning$ReadonlyVolumeCreationConfig');

goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$devtools_jetski_provisioning$ImmutableVolumeCreationConfig');
goog.requireType('jspb$e.devtools_jetski_provisioning$VolumeScope');
goog.requireType('jspb$r$devtools_jetski_provisioning$VolumeCreationConfig$internalDoNotUseReader');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$devtools_jetski_provisioning$ImmutableVolumeCreationConfig>}
 * @implements {jspb$r$devtools_jetski_provisioning$VolumeCreationConfig$internalDoNotUseReader}
 */
jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional VolumeScope scope = 1;
   * @override
   * @return {!jspb$e.devtools_jetski_provisioning$VolumeScope}
   */
  getScope() {
    return /** @type {!jspb$e.devtools_jetski_provisioning$VolumeScope} */ (jspb_internal_adapters.getEnumFieldWithDefault(this, 1));
  }


  /**
   * @param {!jspb$e.devtools_jetski_provisioning$VolumeScope|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig} returns this
   */
  setScope(value) {
    return jspb_internal_adapters.setEnumField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig} returns this
   */
  clearScope() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasScope() {
    return jspb_internal_adapters.hasEnumField(this, 1);
  }


  /**
   * optional VolumeScope scope = 1;
   * @override
   * @return {!jspb$e.devtools_jetski_provisioning$VolumeScope|undefined}
   */
  getScopeOrUndefined() {
    return /** @type {!jspb$e.devtools_jetski_provisioning$VolumeScope|undefined} */ (jspb_internal_adapters.getEnumFieldOrUndefined(this, 1));
  }


  /**
   * optional int64 ttl_seconds = 2;
   * @override
   * @return {!gbigint}
   */
  getTtlSeconds() {
    return jspb_internal_adapters.getInt64GbigintFieldWithDefault(this, 2);
  }


  /**
   * optional int64 ttl_seconds = 2;
   * @override
   * @return {number}
   * @deprecated unsafe int64 behavior: go/jspb-api-gotchas#int64
   */
  getTtlSeconds_asLegacyNumberOrString() {
    return jspb_internal_adapters.getInt64FieldWithDefault(this, 2);
  }


  /**
   * optional int64 ttl_seconds = 2;
   * @override
   * @return {string}
   */
  getTtlSeconds_asString() {
    return jspb_internal_adapters.getInt64FieldWithDefault_asString(this, 2);
  }


  /**
   * @param {number|string|!gbigint|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig} returns this
   */
  setTtlSeconds(value) {
    return jspb_internal_adapters.setInt64Field(this, 2, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig} returns this
   */
  clearTtlSeconds() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasTtlSeconds() {
    return jspb_internal_adapters.hasInt64Field(this, 2);
  }


  /**
   * optional int64 ttl_seconds = 2;
   * @override
   * @return {!gbigint|undefined}
   */
  getTtlSecondsOrUndefined() {
    return jspb_internal_adapters.getInt64GbigintFieldOrUndefined(this, 2);
  }


  /**
   * optional int64 ttl_seconds = 2;
   * @override
   * @return {number|undefined}
   * @deprecated unsafe int64 behavior: go/jspb-api-gotchas#int64
   */
  getTtlSecondsOrUndefined_asLegacyNumberOrString() {
    return jspb_internal_adapters.getInt64FieldOrUndefined(this, 2);
  }


  /**
   * optional int64 ttl_seconds = 2;
   * @override
   * @return {string|undefined}
   */
  getTtlSecondsOrUndefined_asString() {
    return jspb_internal_adapters.getInt64FieldOrUndefined_asString(this, 2);
  }


  /**
   * optional int64 volume_quota_bytes = 3;
   * @override
   * @return {!gbigint}
   */
  getVolumeQuotaBytes() {
    return jspb_internal_adapters.getInt64GbigintFieldWithDefault(this, 3);
  }


  /**
   * optional int64 volume_quota_bytes = 3;
   * @override
   * @return {number}
   * @deprecated unsafe int64 behavior: go/jspb-api-gotchas#int64
   */
  getVolumeQuotaBytes_asLegacyNumberOrString() {
    return jspb_internal_adapters.getInt64FieldWithDefault(this, 3);
  }


  /**
   * optional int64 volume_quota_bytes = 3;
   * @override
   * @return {string}
   */
  getVolumeQuotaBytes_asString() {
    return jspb_internal_adapters.getInt64FieldWithDefault_asString(this, 3);
  }


  /**
   * @param {number|string|!gbigint|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig} returns this
   */
  setVolumeQuotaBytes(value) {
    return jspb_internal_adapters.setInt64Field(this, 3, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig} returns this
   */
  clearVolumeQuotaBytes() {
    return jspb_internal_adapters.clearField(this, 3);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasVolumeQuotaBytes() {
    return jspb_internal_adapters.hasInt64Field(this, 3);
  }


  /**
   * optional int64 volume_quota_bytes = 3;
   * @override
   * @return {!gbigint|undefined}
   */
  getVolumeQuotaBytesOrUndefined() {
    return jspb_internal_adapters.getInt64GbigintFieldOrUndefined(this, 3);
  }


  /**
   * optional int64 volume_quota_bytes = 3;
   * @override
   * @return {number|undefined}
   * @deprecated unsafe int64 behavior: go/jspb-api-gotchas#int64
   */
  getVolumeQuotaBytesOrUndefined_asLegacyNumberOrString() {
    return jspb_internal_adapters.getInt64FieldOrUndefined(this, 3);
  }


  /**
   * optional int64 volume_quota_bytes = 3;
   * @override
   * @return {string|undefined}
   */
  getVolumeQuotaBytesOrUndefined_asString() {
    return jspb_internal_adapters.getInt64FieldOrUndefined_asString(this, 3);
  }


};

/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$ImmutableVolumeCreationConfig}
 */
jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig}
 */
jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig.prototype.clone;
/**
 * @const {function(string):!jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig}
 */
jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig));

/**
 * Returns whether the given value is an instance of jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig>}
 */
jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig));

/**
 * Object form of VolumeCreationConfig as accepted by the `fromObject` method.
 * @typedef {{
 *  scope: (?number|undefined),
 *  ttlSeconds: (?number|string|undefined),
 *  volumeQuotaBytes: (?number|string|undefined)
 * }}
 */
jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for devtools_jetski_provisioning$MutableVolumeCreationConfig.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig.internalDoNotUse_debugOnlyProtoTypeName = "devtools_jetski_provisioning.VolumeCreationConfig";
}

/**
 * @typedef {!jspb$devtools_jetski_provisioning$ImmutableVolumeCreationConfig|!jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig}
 */
jspb$ro.devtools_jetski_provisioning$ReadonlyVolumeCreationConfig = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'devtools_jetski_provisioning.VolumeCreationConfig'}
   */
  jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig.displayName = 'proto.devtools_jetski_provisioning.VolumeCreationConfig';
}
/**
 * Interface form of VolumeCreationConfig as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  scope: (!jspb$e.devtools_jetski_provisioning$VolumeScope|undefined),
 *  ttlSeconds: (!gbigint|undefined),
 *  ttlSeconds_asLegacyNumberOrString: (number|string|undefined),
 *  volumeQuotaBytes: (!gbigint|undefined),
 *  volumeQuotaBytes_asLegacyNumberOrString: (number|string|undefined)
 * }}
 */
jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig.FieldsInterface;

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
 * @param {!jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig.FieldsInterface} record
 * @return {!jspb$devtools_jetski_provisioning$ImmutableVolumeCreationConfig}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig, ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$ImmutableVolumeCreationConfig
 */
jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig));

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
 * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyVolumeCreationConfig} value
 * @return {!jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.devtools_jetski_provisioning$ReadonlyVolumeCreationConfig): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig, ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$devtools_jetski_provisioning$MutableMountedDirectory;
Object.defineProperty(this, 'jspb$devtools_jetski_provisioning$MutableMountedDirectory', {
  get() { return jspb$devtools_jetski_provisioning$MutableMountedDirectory; },
  set(v) { jspb$devtools_jetski_provisioning$MutableMountedDirectory = v; },
