// source: third_party/jetski/jetbox_state_pb/jetbox_state.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$jetbox_state_pb$MutableGoogleSpecificSettings');
goog.provide('jspb$ro.jetbox_state_pb$ReadonlyGoogleSpecificSettings');

goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$jetbox_state_pb$ImmutableGoogleSpecificSettings');
goog.requireType('jspb$r$jetbox_state_pb$GoogleSpecificSettings$internalDoNotUseReader');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$jetbox_state_pb$ImmutableGoogleSpecificSettings>}
 * @implements {jspb$r$jetbox_state_pb$GoogleSpecificSettings$internalDoNotUseReader}
 */
jspb$jetbox_state_pb$MutableGoogleSpecificSettings = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional bool google3_project_created = 1;
   * @override
   * @return {boolean}
   * @deprecated
   */
  getGoogle3ProjectCreated() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 1);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableGoogleSpecificSettings} returns this
   * @deprecated
   */
  setGoogle3ProjectCreated(value) {
    return jspb_internal_adapters.setProto3BooleanField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableGoogleSpecificSettings} returns this
   * @deprecated
   */
  clearGoogle3ProjectCreated() {
    return jspb_internal_adapters.clearField(this, 1);
  }


};

/**
 * @override
 * @return {!jspb$jetbox_state_pb$ImmutableGoogleSpecificSettings}
 */
jspb$jetbox_state_pb$MutableGoogleSpecificSettings.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$jetbox_state_pb$MutableGoogleSpecificSettings}
 */
jspb$jetbox_state_pb$MutableGoogleSpecificSettings.prototype.clone;
/**
 * @const {function(string):!jspb$jetbox_state_pb$MutableGoogleSpecificSettings}
 */
jspb$jetbox_state_pb$MutableGoogleSpecificSettings.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$jetbox_state_pb$MutableGoogleSpecificSettings));

/**
 * Returns whether the given value is an instance of jspb$jetbox_state_pb$MutableGoogleSpecificSettings.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$jetbox_state_pb$MutableGoogleSpecificSettings>}
 */
jspb$jetbox_state_pb$MutableGoogleSpecificSettings.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$jetbox_state_pb$MutableGoogleSpecificSettings));

/**
 * Object form of GoogleSpecificSettings as accepted by the `fromObject` method.
 * @typedef {{
 *  google3ProjectCreated: (?boolean|undefined)
 * }}
 */
jspb$jetbox_state_pb$MutableGoogleSpecificSettings.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$jetbox_state_pb$MutableGoogleSpecificSettings.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$jetbox_state_pb$MutableGoogleSpecificSettings.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$jetbox_state_pb$MutableGoogleSpecificSettings.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for jetbox_state_pb$MutableGoogleSpecificSettings.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$jetbox_state_pb$MutableGoogleSpecificSettings.internalDoNotUse_debugOnlyProtoTypeName = "jetbox_state_pb.GoogleSpecificSettings";
}

/**
 * @typedef {!jspb$jetbox_state_pb$ImmutableGoogleSpecificSettings|!jspb$jetbox_state_pb$MutableGoogleSpecificSettings}
 */
jspb$ro.jetbox_state_pb$ReadonlyGoogleSpecificSettings = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'jetbox_state_pb.GoogleSpecificSettings'}
   */
  jspb$jetbox_state_pb$MutableGoogleSpecificSettings.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$jetbox_state_pb$MutableGoogleSpecificSettings.displayName = 'proto.jetbox_state_pb.GoogleSpecificSettings';
}
/**
 * Interface form of GoogleSpecificSettings as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  google3ProjectCreated: (boolean|undefined)
 * }}
 */
jspb$jetbox_state_pb$MutableGoogleSpecificSettings.FieldsInterface;

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
 * @param {!jspb$jetbox_state_pb$MutableGoogleSpecificSettings.FieldsInterface} record
 * @return {!jspb$jetbox_state_pb$ImmutableGoogleSpecificSettings}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableGoogleSpecificSettings, ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableGoogleSpecificSettings.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$jetbox_state_pb$ImmutableGoogleSpecificSettings
 */
jspb$jetbox_state_pb$MutableGoogleSpecificSettings.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$jetbox_state_pb$MutableGoogleSpecificSettings));

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
 * @param {!jspb$ro.jetbox_state_pb$ReadonlyGoogleSpecificSettings} value
 * @return {!jspb$jetbox_state_pb$MutableGoogleSpecificSettings.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.jetbox_state_pb$ReadonlyGoogleSpecificSettings): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableGoogleSpecificSettings, ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableGoogleSpecificSettings.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$jetbox_state_pb$MutableGoogleSpecificSettings.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$jetbox_state_pb$MutablePostOnboardingState;
Object.defineProperty(this, 'jspb$jetbox_state_pb$MutablePostOnboardingState', {
  get() { return jspb$jetbox_state_pb$MutablePostOnboardingState; },
  set(v) { jspb$jetbox_state_pb$MutablePostOnboardingState = v; },
