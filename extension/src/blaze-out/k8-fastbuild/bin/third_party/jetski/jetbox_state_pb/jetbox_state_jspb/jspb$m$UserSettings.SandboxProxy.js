// source: third_party/jetski/jetbox_state_pb/jetbox_state.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy');
goog.provide('jspb$ro.jetbox_state_pb$UserSettings$ReadonlySandboxProxy');

goog.require('jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$jetbox_state_pb$UserSettings$ImmutableSandboxProxy');
goog.requireType('jspb$r$jetbox_state_pb$UserSettings$SandboxProxy$internalDoNotUseReader');
goog.requireType('jspb$ro.jetbox_state_pb$UserSettings$SandboxProxy$ReadonlyHttp');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$jetbox_state_pb$UserSettings$ImmutableSandboxProxy>}
 * @implements {jspb$r$jetbox_state_pb$UserSettings$SandboxProxy$internalDoNotUseReader}
 */
jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional Http http = 1;
   * @override
   * @return {!jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp|undefined}
   */
  getHttp() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp, 1);
  }


  /**
   * optional Http http = 1;
   * @override
   * @return {!jspb$ro.jetbox_state_pb$UserSettings$SandboxProxy$ReadonlyHttp}
   */
  getReadonlyHttp() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp, 1);
  }


  /**
   * optional Http http = 1;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp
   */
  getMutableHttp(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp, 1, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.jetbox_state_pb$UserSettings$SandboxProxy$ReadonlyHttp|null|undefined} value
   * @return {!jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy} returns this
   */
  setHttp(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy} returns this
   */
  clearHttp() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasHttp() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp, 1);
  }


  /**
   * optional Http http = 1;
   * @override
   * @return {!jspb$ro.jetbox_state_pb$UserSettings$SandboxProxy$ReadonlyHttp|undefined}
   */
  getHttpOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp, 1);
  }


};

/**
 * @override
 * @return {!jspb$jetbox_state_pb$UserSettings$ImmutableSandboxProxy}
 */
jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy}
 */
jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy.prototype.clone;
/**
 * @const {function(string):!jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy}
 */
jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy));

/**
 * Returns whether the given value is an instance of jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy>}
 */
jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy));

/**
 * Object form of SandboxProxy as accepted by the `fromObject` method.
 * @typedef {{
 *  http: (?jspb$jetbox_state_pb$UserSettings$SandboxProxy$MutableHttp.ObjectFormat|undefined)
 * }}
 */
jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for jetbox_state_pb$UserSettings$MutableSandboxProxy.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy.internalDoNotUse_debugOnlyProtoTypeName = "jetbox_state_pb.UserSettings.SandboxProxy";
}

/**
 * @typedef {!jspb$jetbox_state_pb$UserSettings$ImmutableSandboxProxy|!jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy}
 */
jspb$ro.jetbox_state_pb$UserSettings$ReadonlySandboxProxy = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'jetbox_state_pb.UserSettings.SandboxProxy'}
   */
  jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy.displayName = 'proto.jetbox_state_pb.UserSettings.SandboxProxy';
}
/**
 * Interface form of SandboxProxy as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  http: (!jspb$ro.jetbox_state_pb$UserSettings$SandboxProxy$ReadonlyHttp|undefined)
 * }}
 */
jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy.FieldsInterface;

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
 * @param {!jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy.FieldsInterface} record
 * @return {!jspb$jetbox_state_pb$UserSettings$ImmutableSandboxProxy}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy, ಠ_ಠ.clutz.jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$jetbox_state_pb$UserSettings$ImmutableSandboxProxy
 */
jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy));

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
 * @param {!jspb$ro.jetbox_state_pb$UserSettings$ReadonlySandboxProxy} value
 * @return {!jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.jetbox_state_pb$UserSettings$ReadonlySandboxProxy): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy, ಠ_ಠ.clutz.jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$jetbox_state_pb$UserSettings$MutableSandboxProxy.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$jetbox_state_pb$MutableUserSettings;
Object.defineProperty(this, 'jspb$jetbox_state_pb$MutableUserSettings', {
  get() { return jspb$jetbox_state_pb$MutableUserSettings; },
  set(v) { jspb$jetbox_state_pb$MutableUserSettings = v; },
