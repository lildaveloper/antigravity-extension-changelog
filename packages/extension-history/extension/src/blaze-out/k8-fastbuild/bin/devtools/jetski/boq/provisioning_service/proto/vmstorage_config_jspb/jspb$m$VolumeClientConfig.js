// source: devtools/jetski/boq/provisioning_service/proto/vmstorage_config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$devtools_jetski_provisioning$MutableVolumeClientConfig');
goog.provide('jspb$ro.devtools_jetski_provisioning$ReadonlyVolumeClientConfig');

goog.require('jspb$google$protobuf$MutableTimestamp');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$devtools_jetski_provisioning$ImmutableVolumeClientConfig');
goog.requireType('jspb$r$devtools_jetski_provisioning$VolumeClientConfig$internalDoNotUseReader');
goog.requireType('jspb$ro.google$protobuf$ReadonlyTimestamp');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$devtools_jetski_provisioning$ImmutableVolumeClientConfig>}
 * @implements {jspb$r$devtools_jetski_provisioning$VolumeClientConfig$internalDoNotUseReader}
 */
jspb$devtools_jetski_provisioning$MutableVolumeClientConfig = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional string family = 1;
   * @override
   * @return {string}
   */
  getFamily() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 1);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableVolumeClientConfig} returns this
   */
  setFamily(value) {
    return jspb_internal_adapters.setStringField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableVolumeClientConfig} returns this
   */
  clearFamily() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasFamily() {
    return jspb_internal_adapters.hasStringField(this, 1);
  }


  /**
   * optional string family = 1;
   * @override
   * @return {string|undefined}
   */
  getFamilyOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 1);
  }


  /**
   * optional string user = 2;
   * @override
   * @return {string}
   */
  getUser() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 2);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableVolumeClientConfig} returns this
   */
  setUser(value) {
    return jspb_internal_adapters.setStringField(this, 2, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableVolumeClientConfig} returns this
   */
  clearUser() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasUser() {
    return jspb_internal_adapters.hasStringField(this, 2);
  }


  /**
   * optional string user = 2;
   * @override
   * @return {string|undefined}
   */
  getUserOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 2);
  }


  /**
   * optional string volume = 3;
   * @override
   * @return {string}
   */
  getVolume() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 3);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableVolumeClientConfig} returns this
   */
  setVolume(value) {
    return jspb_internal_adapters.setStringField(this, 3, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableVolumeClientConfig} returns this
   */
  clearVolume() {
    return jspb_internal_adapters.clearField(this, 3);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasVolume() {
    return jspb_internal_adapters.hasStringField(this, 3);
  }


  /**
   * optional string volume = 3;
   * @override
   * @return {string|undefined}
   */
  getVolumeOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 3);
  }


  /**
   * optional string auth_token = 4;
   * @override
   * @return {string}
   */
  getAuthToken() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 4);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableVolumeClientConfig} returns this
   */
  setAuthToken(value) {
    return jspb_internal_adapters.setStringField(this, 4, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableVolumeClientConfig} returns this
   */
  clearAuthToken() {
    return jspb_internal_adapters.clearField(this, 4);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasAuthToken() {
    return jspb_internal_adapters.hasStringField(this, 4);
  }


  /**
   * optional string auth_token = 4;
   * @override
   * @return {string|undefined}
   */
  getAuthTokenOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 4);
  }


  /**
   * optional google.protobuf.Timestamp auth_token_expiration = 5;
   * @override
   * @return {!jspb$google$protobuf$MutableTimestamp|undefined}
   */
  getAuthTokenExpiration() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$google$protobuf$MutableTimestamp, 5);
  }


  /**
   * optional google.protobuf.Timestamp auth_token_expiration = 5;
   * @override
   * @return {!jspb$ro.google$protobuf$ReadonlyTimestamp}
   */
  getReadonlyAuthTokenExpiration() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$google$protobuf$MutableTimestamp, 5);
  }


  /**
   * optional google.protobuf.Timestamp auth_token_expiration = 5;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$google$protobuf$MutableTimestamp|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$google$protobuf$MutableTimestamp') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$google$protobuf$MutableTimestamp|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$google$protobuf$MutableTimestamp
   */
  getMutableAuthTokenExpiration(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$google$protobuf$MutableTimestamp, 5, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.google$protobuf$ReadonlyTimestamp|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableVolumeClientConfig} returns this
   */
  setAuthTokenExpiration(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$google$protobuf$MutableTimestamp, 5, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableVolumeClientConfig} returns this
   */
  clearAuthTokenExpiration() {
    return jspb_internal_adapters.clearField(this, 5);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasAuthTokenExpiration() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$google$protobuf$MutableTimestamp, 5);
  }


  /**
   * optional google.protobuf.Timestamp auth_token_expiration = 5;
   * @override
   * @return {!jspb$ro.google$protobuf$ReadonlyTimestamp|undefined}
   */
  getAuthTokenExpirationOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$google$protobuf$MutableTimestamp, 5);
  }


};

/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$ImmutableVolumeClientConfig}
 */
jspb$devtools_jetski_provisioning$MutableVolumeClientConfig.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$MutableVolumeClientConfig}
 */
jspb$devtools_jetski_provisioning$MutableVolumeClientConfig.prototype.clone;
/**
 * @const {function(string):!jspb$devtools_jetski_provisioning$MutableVolumeClientConfig}
 */
jspb$devtools_jetski_provisioning$MutableVolumeClientConfig.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$devtools_jetski_provisioning$MutableVolumeClientConfig));

/**
 * Returns whether the given value is an instance of jspb$devtools_jetski_provisioning$MutableVolumeClientConfig.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$devtools_jetski_provisioning$MutableVolumeClientConfig>}
 */
jspb$devtools_jetski_provisioning$MutableVolumeClientConfig.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$devtools_jetski_provisioning$MutableVolumeClientConfig));

/**
 * Object form of VolumeClientConfig as accepted by the `fromObject` method.
 * @typedef {{
 *  family: (?string|undefined),
 *  user: (?string|undefined),
 *  volume: (?string|undefined),
 *  authToken: (?string|undefined),
 *  authTokenExpiration: (?jspb$google$protobuf$MutableTimestamp.ObjectFormat|undefined)
 * }}
 */
jspb$devtools_jetski_provisioning$MutableVolumeClientConfig.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$devtools_jetski_provisioning$MutableVolumeClientConfig.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$devtools_jetski_provisioning$MutableVolumeClientConfig.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$devtools_jetski_provisioning$MutableVolumeClientConfig.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for devtools_jetski_provisioning$MutableVolumeClientConfig.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$devtools_jetski_provisioning$MutableVolumeClientConfig.internalDoNotUse_debugOnlyProtoTypeName = "devtools_jetski_provisioning.VolumeClientConfig";
}

/**
 * @typedef {!jspb$devtools_jetski_provisioning$ImmutableVolumeClientConfig|!jspb$devtools_jetski_provisioning$MutableVolumeClientConfig}
 */
jspb$ro.devtools_jetski_provisioning$ReadonlyVolumeClientConfig = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'devtools_jetski_provisioning.VolumeClientConfig'}
   */
  jspb$devtools_jetski_provisioning$MutableVolumeClientConfig.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$devtools_jetski_provisioning$MutableVolumeClientConfig.displayName = 'proto.devtools_jetski_provisioning.VolumeClientConfig';
}
/**
 * Interface form of VolumeClientConfig as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  family: (string|undefined),
 *  user: (string|undefined),
 *  volume: (string|undefined),
 *  authToken: (string|undefined),
 *  authTokenExpiration: (!jspb$ro.google$protobuf$ReadonlyTimestamp|undefined)
 * }}
 */
jspb$devtools_jetski_provisioning$MutableVolumeClientConfig.FieldsInterface;

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
 * @param {!jspb$devtools_jetski_provisioning$MutableVolumeClientConfig.FieldsInterface} record
 * @return {!jspb$devtools_jetski_provisioning$ImmutableVolumeClientConfig}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableVolumeClientConfig, ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableVolumeClientConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$ImmutableVolumeClientConfig
 */
jspb$devtools_jetski_provisioning$MutableVolumeClientConfig.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$devtools_jetski_provisioning$MutableVolumeClientConfig));

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
 * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyVolumeClientConfig} value
 * @return {!jspb$devtools_jetski_provisioning$MutableVolumeClientConfig.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.devtools_jetski_provisioning$ReadonlyVolumeClientConfig): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableVolumeClientConfig, ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableVolumeClientConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$devtools_jetski_provisioning$MutableVolumeClientConfig.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig;
Object.defineProperty(this, 'jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig', {
  get() { return jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig; },
  set(v) { jspb$devtools_jetski_provisioning$MutableVolumeCreationConfig = v; },
