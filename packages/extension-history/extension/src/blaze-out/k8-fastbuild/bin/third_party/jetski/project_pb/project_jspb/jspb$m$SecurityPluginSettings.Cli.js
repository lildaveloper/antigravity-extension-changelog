// source: third_party/jetski/project_pb/project.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$exa$project_pb$SecurityPluginSettings$MutableCli');
goog.provide('jspb$ro.exa$project_pb$SecurityPluginSettings$ReadonlyCli');

goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$exa$project_pb$SecurityPluginSettings$ImmutableCli');
goog.requireType('jspb$r$exa$project_pb$SecurityPluginSettings$Cli$internalDoNotUseReader');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$exa$project_pb$SecurityPluginSettings$ImmutableCli>}
 * @implements {jspb$r$exa$project_pb$SecurityPluginSettings$Cli$internalDoNotUseReader}
 */
jspb$exa$project_pb$SecurityPluginSettings$MutableCli = class extends jspb_internal_public_for_gencode.GeneratedMessage {
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
   * @return {!jspb$exa$project_pb$SecurityPluginSettings$MutableCli} returns this
   */
  setEnabled(value) {
    return jspb_internal_adapters.setProto3BooleanField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$project_pb$SecurityPluginSettings$MutableCli} returns this
   */
  clearEnabled() {
    return jspb_internal_adapters.clearField(this, 1);
  }


};

/**
 * @override
 * @return {!jspb$exa$project_pb$SecurityPluginSettings$ImmutableCli}
 */
jspb$exa$project_pb$SecurityPluginSettings$MutableCli.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$exa$project_pb$SecurityPluginSettings$MutableCli}
 */
jspb$exa$project_pb$SecurityPluginSettings$MutableCli.prototype.clone;
/**
 * @const {function(string):!jspb$exa$project_pb$SecurityPluginSettings$MutableCli}
 */
jspb$exa$project_pb$SecurityPluginSettings$MutableCli.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$exa$project_pb$SecurityPluginSettings$MutableCli));

/**
 * Returns whether the given value is an instance of jspb$exa$project_pb$SecurityPluginSettings$MutableCli.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$exa$project_pb$SecurityPluginSettings$MutableCli>}
 */
jspb$exa$project_pb$SecurityPluginSettings$MutableCli.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$exa$project_pb$SecurityPluginSettings$MutableCli));

/**
 * Object form of Cli as accepted by the `fromObject` method.
 * @typedef {{
 *  enabled: (?boolean|undefined)
 * }}
 */
jspb$exa$project_pb$SecurityPluginSettings$MutableCli.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$exa$project_pb$SecurityPluginSettings$MutableCli.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$exa$project_pb$SecurityPluginSettings$MutableCli.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$exa$project_pb$SecurityPluginSettings$MutableCli.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for exa$project_pb$SecurityPluginSettings$MutableCli.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$exa$project_pb$SecurityPluginSettings$MutableCli.internalDoNotUse_debugOnlyProtoTypeName = "exa.project_pb.SecurityPluginSettings.Cli";
}

/**
 * @typedef {!jspb$exa$project_pb$SecurityPluginSettings$ImmutableCli|!jspb$exa$project_pb$SecurityPluginSettings$MutableCli}
 */
jspb$ro.exa$project_pb$SecurityPluginSettings$ReadonlyCli = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'exa.project_pb.SecurityPluginSettings.Cli'}
   */
  jspb$exa$project_pb$SecurityPluginSettings$MutableCli.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$exa$project_pb$SecurityPluginSettings$MutableCli.displayName = 'proto.exa.project_pb.SecurityPluginSettings.Cli';
}
/**
 * Interface form of Cli as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  enabled: (boolean|undefined)
 * }}
 */
jspb$exa$project_pb$SecurityPluginSettings$MutableCli.FieldsInterface;

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
 * @param {!jspb$exa$project_pb$SecurityPluginSettings$MutableCli.FieldsInterface} record
 * @return {!jspb$exa$project_pb$SecurityPluginSettings$ImmutableCli}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$exa$project_pb$SecurityPluginSettings$MutableCli, ಠ_ಠ.clutz.jspb$exa$project_pb$SecurityPluginSettings$MutableCli.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$exa$project_pb$SecurityPluginSettings$ImmutableCli
 */
jspb$exa$project_pb$SecurityPluginSettings$MutableCli.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$exa$project_pb$SecurityPluginSettings$MutableCli));

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
 * @param {!jspb$ro.exa$project_pb$SecurityPluginSettings$ReadonlyCli} value
 * @return {!jspb$exa$project_pb$SecurityPluginSettings$MutableCli.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.exa$project_pb$SecurityPluginSettings$ReadonlyCli): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$exa$project_pb$SecurityPluginSettings$MutableCli, ಠ_ಠ.clutz.jspb$exa$project_pb$SecurityPluginSettings$MutableCli.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$exa$project_pb$SecurityPluginSettings$MutableCli.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$exa$project_pb$SecurityPluginSettings$MutableVetted;
Object.defineProperty(this, 'jspb$exa$project_pb$SecurityPluginSettings$MutableVetted', {
  get() { return jspb$exa$project_pb$SecurityPluginSettings$MutableVetted; },
  set(v) { jspb$exa$project_pb$SecurityPluginSettings$MutableVetted = v; },
