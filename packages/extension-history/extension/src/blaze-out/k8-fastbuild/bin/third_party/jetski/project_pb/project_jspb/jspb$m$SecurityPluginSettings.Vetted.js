// source: third_party/jetski/project_pb/project.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$exa$project_pb$SecurityPluginSettings$MutableVetted');
goog.provide('jspb$ro.exa$project_pb$SecurityPluginSettings$ReadonlyVetted');

goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$exa$project_pb$SecurityPluginSettings$ImmutableVetted');
goog.requireType('jspb$r$exa$project_pb$SecurityPluginSettings$Vetted$internalDoNotUseReader');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$exa$project_pb$SecurityPluginSettings$ImmutableVetted>}
 * @implements {jspb$r$exa$project_pb$SecurityPluginSettings$Vetted$internalDoNotUseReader}
 */
jspb$exa$project_pb$SecurityPluginSettings$MutableVetted = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional bool enabled = 1;
   * @override
   * @return {boolean}
   */
  getEnabled() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 1);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$exa$project_pb$SecurityPluginSettings$MutableVetted} returns this
   */
  setEnabled(value) {
    return jspb_internal_adapters.setProto3BooleanField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$project_pb$SecurityPluginSettings$MutableVetted} returns this
   */
  clearEnabled() {
    return jspb_internal_adapters.clearField(this, 1);
  }


};

/**
 * @override
 * @return {!jspb$exa$project_pb$SecurityPluginSettings$ImmutableVetted}
 */
jspb$exa$project_pb$SecurityPluginSettings$MutableVetted.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$exa$project_pb$SecurityPluginSettings$MutableVetted}
 */
jspb$exa$project_pb$SecurityPluginSettings$MutableVetted.prototype.clone;
/**
 * @const {function(string):!jspb$exa$project_pb$SecurityPluginSettings$MutableVetted}
 */
jspb$exa$project_pb$SecurityPluginSettings$MutableVetted.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$exa$project_pb$SecurityPluginSettings$MutableVetted));

/**
 * Returns whether the given value is an instance of jspb$exa$project_pb$SecurityPluginSettings$MutableVetted.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$exa$project_pb$SecurityPluginSettings$MutableVetted>}
 */
jspb$exa$project_pb$SecurityPluginSettings$MutableVetted.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$exa$project_pb$SecurityPluginSettings$MutableVetted));

/**
 * Object form of Vetted as accepted by the `fromObject` method.
 * @typedef {{
 *  enabled: (?boolean|undefined)
 * }}
 */
jspb$exa$project_pb$SecurityPluginSettings$MutableVetted.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$exa$project_pb$SecurityPluginSettings$MutableVetted.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$exa$project_pb$SecurityPluginSettings$MutableVetted.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$exa$project_pb$SecurityPluginSettings$MutableVetted.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for exa$project_pb$SecurityPluginSettings$MutableVetted.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$exa$project_pb$SecurityPluginSettings$MutableVetted.internalDoNotUse_debugOnlyProtoTypeName = "exa.project_pb.SecurityPluginSettings.Vetted";
}

/**
 * @typedef {!jspb$exa$project_pb$SecurityPluginSettings$ImmutableVetted|!jspb$exa$project_pb$SecurityPluginSettings$MutableVetted}
 */
jspb$ro.exa$project_pb$SecurityPluginSettings$ReadonlyVetted = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'exa.project_pb.SecurityPluginSettings.Vetted'}
   */
  jspb$exa$project_pb$SecurityPluginSettings$MutableVetted.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$exa$project_pb$SecurityPluginSettings$MutableVetted.displayName = 'proto.exa.project_pb.SecurityPluginSettings.Vetted';
}
/**
 * Interface form of Vetted as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  enabled: (boolean|undefined)
 * }}
 */
jspb$exa$project_pb$SecurityPluginSettings$MutableVetted.FieldsInterface;

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
 * @param {!jspb$exa$project_pb$SecurityPluginSettings$MutableVetted.FieldsInterface} record
 * @return {!jspb$exa$project_pb$SecurityPluginSettings$ImmutableVetted}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$exa$project_pb$SecurityPluginSettings$MutableVetted, ಠ_ಠ.clutz.jspb$exa$project_pb$SecurityPluginSettings$MutableVetted.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$exa$project_pb$SecurityPluginSettings$ImmutableVetted
 */
jspb$exa$project_pb$SecurityPluginSettings$MutableVetted.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$exa$project_pb$SecurityPluginSettings$MutableVetted));

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
 * @param {!jspb$ro.exa$project_pb$SecurityPluginSettings$ReadonlyVetted} value
 * @return {!jspb$exa$project_pb$SecurityPluginSettings$MutableVetted.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.exa$project_pb$SecurityPluginSettings$ReadonlyVetted): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$exa$project_pb$SecurityPluginSettings$MutableVetted, ಠ_ಠ.clutz.jspb$exa$project_pb$SecurityPluginSettings$MutableVetted.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$exa$project_pb$SecurityPluginSettings$MutableVetted.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$exa$project_pb$MutableSecurityPluginSettings;
Object.defineProperty(this, 'jspb$exa$project_pb$MutableSecurityPluginSettings', {
  get() { return jspb$exa$project_pb$MutableSecurityPluginSettings; },
  set(v) { jspb$exa$project_pb$MutableSecurityPluginSettings = v; },
