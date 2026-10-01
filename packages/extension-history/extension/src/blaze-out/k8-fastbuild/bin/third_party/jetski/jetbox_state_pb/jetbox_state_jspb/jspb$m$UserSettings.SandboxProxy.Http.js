// source: third_party/jetski/jetbox_state_pb/jetbox_state.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp');
goog.provide('jspb$ro.jetbox_state_pb$UserSettings$SandboxProxy$ReadonlyHttp');

goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$jetbox_state_pb$UserSettings$SandboxProxy$ImmutableHttp');
goog.requireType('jspb$r$jetbox_state_pb$UserSettings$SandboxProxy$Http$internalDoNotUseReader');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$jetbox_state_pb$UserSettings$SandboxProxy$ImmutableHttp>}
 * @implements {jspb$r$jetbox_state_pb$UserSettings$SandboxProxy$Http$internalDoNotUseReader}
 */
jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional string address = 1;
   * @override
   * @return {string}
   */
  getAddress() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 1);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp} returns this
   */
  setAddress(value) {
    return jspb_internal_adapters.setStringField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp} returns this
   */
  clearAddress() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasAddress() {
    return jspb_internal_adapters.hasStringField(this, 1);
  }


  /**
   * optional string address = 1;
   * @override
   * @return {string|undefined}
   */
  getAddressOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 1);
  }


  /**
   * optional string cert_file = 2;
   * @override
   * @return {string}
   */
  getCertFile() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 2);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp} returns this
   */
  setCertFile(value) {
    return jspb_internal_adapters.setStringField(this, 2, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp} returns this
   */
  clearCertFile() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasCertFile() {
    return jspb_internal_adapters.hasStringField(this, 2);
  }


  /**
   * optional string cert_file = 2;
   * @override
   * @return {string|undefined}
   */
  getCertFileOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 2);
  }


  /**
   * optional string username = 3;
   * @override
   * @return {string}
   */
  getUsername() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 3);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp} returns this
   */
  setUsername(value) {
    return jspb_internal_adapters.setStringField(this, 3, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp} returns this
   */
  clearUsername() {
    return jspb_internal_adapters.clearField(this, 3);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasUsername() {
    return jspb_internal_adapters.hasStringField(this, 3);
  }


  /**
   * optional string username = 3;
   * @override
   * @return {string|undefined}
   */
  getUsernameOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 3);
  }


  /**
   * optional string password = 4;
   * @override
   * @return {string}
   */
  getPassword() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 4);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp} returns this
   */
  setPassword(value) {
    return jspb_internal_adapters.setStringField(this, 4, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp} returns this
   */
  clearPassword() {
    return jspb_internal_adapters.clearField(this, 4);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasPassword() {
    return jspb_internal_adapters.hasStringField(this, 4);
  }


  /**
   * optional string password = 4;
   * @override
   * @return {string|undefined}
   */
  getPasswordOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 4);
  }


};

/**
 * @override
 * @return {!jspb$jetbox_state_pb$UserSettings$SandboxProxy$ImmutableHttp}
 */
jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp}
 */
jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp.prototype.clone;
/**
 * @const {function(string):!jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp}
 */
jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp));

/**
 * Returns whether the given value is an instance of jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp>}
 */
jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp));

/**
 * Object form of Http as accepted by the `fromObject` method.
 * @typedef {{
 *  address: (?string|undefined),
 *  certFile: (?string|undefined),
 *  username: (?string|undefined),
 *  password: (?string|undefined)
 * }}
 */
jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp.internalDoNotUse_debugOnlyProtoTypeName = "jetbox_state_pb.UserSettings.SandboxProxy.Http";
}

/**
 * @typedef {!jspb$jetbox_state_pb$UserSettings$SandboxProxy$ImmutableHttp|!jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp}
 */
jspb$ro.jetbox_state_pb$UserSettings$SandboxProxy$ReadonlyHttp = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'jetbox_state_pb.UserSettings.SandboxProxy.Http'}
   */
  jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp.displayName = 'proto.jetbox_state_pb.UserSettings.SandboxProxy.Http';
}
/**
 * Interface form of Http as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  address: (string|undefined),
 *  certFile: (string|undefined),
 *  username: (string|undefined),
 *  password: (string|undefined)
 * }}
 */
jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp.FieldsInterface;

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
 * @param {!jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp.FieldsInterface} record
 * @return {!jspb$jetbox_state_pb$UserSettings$SandboxProxy$ImmutableHttp}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp, ಠ_ಠ.clutz.jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$jetbox_state_pb$UserSettings$SandboxProxy$ImmutableHttp
 */
jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp));

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
 * @param {!jspb$ro.jetbox_state_pb$UserSettings$SandboxProxy$ReadonlyHttp} value
 * @return {!jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.jetbox_state_pb$UserSettings$SandboxProxy$ReadonlyHttp): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp, ಠ_ಠ.clutz.jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy;
Object.defineProperty(this, 'jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy', {
  get() { return jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy; },
  set(v) { jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy = v; },
