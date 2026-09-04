// source: third_party/jetski/project_pb/project.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$exa$project_pb$MutablePermissionGrants');
goog.provide('jspb$ro.exa$project_pb$ReadonlyPermissionGrants');

goog.require('jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$exa$project_pb$ImmutablePermissionGrants');
goog.requireType('jspb$r$exa$project_pb$PermissionGrants$internalDoNotUseReader');
goog.requireType('jspb$ro.exa$codeium_common_pb$ReadonlyPermissionGrantsConfig');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$exa$project_pb$ImmutablePermissionGrants>}
 * @implements {jspb$r$exa$project_pb$PermissionGrants$internalDoNotUseReader}
 */
jspb$exa$project_pb$MutablePermissionGrants = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional exa.codeium_common_pb.PermissionGrantsConfig permission_grants = 2;
   * @override
   * @return {!jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig|undefined}
   */
  getPermissionGrants() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig, 2);
  }


  /**
   * optional exa.codeium_common_pb.PermissionGrantsConfig permission_grants = 2;
   * @override
   * @return {!jspb$ro.exa$codeium_common_pb$ReadonlyPermissionGrantsConfig}
   */
  getReadonlyPermissionGrants() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig, 2);
  }


  /**
   * optional exa.codeium_common_pb.PermissionGrantsConfig permission_grants = 2;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig
   */
  getMutablePermissionGrants(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig, 2, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.exa$codeium_common_pb$ReadonlyPermissionGrantsConfig|null|undefined} value
   * @return {!jspb$exa$project_pb$MutablePermissionGrants} returns this
   */
  setPermissionGrants(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig, 2, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$project_pb$MutablePermissionGrants} returns this
   */
  clearPermissionGrants() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasPermissionGrants() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig, 2);
  }


  /**
   * optional exa.codeium_common_pb.PermissionGrantsConfig permission_grants = 2;
   * @override
   * @return {!jspb$ro.exa$codeium_common_pb$ReadonlyPermissionGrantsConfig|undefined}
   */
  getPermissionGrantsOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig, 2);
  }


};

/**
 * @override
 * @return {!jspb$exa$project_pb$ImmutablePermissionGrants}
 */
jspb$exa$project_pb$MutablePermissionGrants.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$exa$project_pb$MutablePermissionGrants}
 */
jspb$exa$project_pb$MutablePermissionGrants.prototype.clone;
/**
 * @const {function(string):!jspb$exa$project_pb$MutablePermissionGrants}
 */
jspb$exa$project_pb$MutablePermissionGrants.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$exa$project_pb$MutablePermissionGrants));

/**
 * Returns whether the given value is an instance of jspb$exa$project_pb$MutablePermissionGrants.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$exa$project_pb$MutablePermissionGrants>}
 */
jspb$exa$project_pb$MutablePermissionGrants.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$exa$project_pb$MutablePermissionGrants));

/**
 * Object form of PermissionGrants as accepted by the `fromObject` method.
 * @typedef {{
 *  permissionGrants: (?jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig.ObjectFormat|undefined)
 * }}
 */
jspb$exa$project_pb$MutablePermissionGrants.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$exa$project_pb$MutablePermissionGrants.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$exa$project_pb$MutablePermissionGrants.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$exa$project_pb$MutablePermissionGrants.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for exa$project_pb$MutablePermissionGrants.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$exa$project_pb$MutablePermissionGrants.internalDoNotUse_debugOnlyProtoTypeName = "exa.project_pb.PermissionGrants";
}

/**
 * @typedef {!jspb$exa$project_pb$ImmutablePermissionGrants|!jspb$exa$project_pb$MutablePermissionGrants}
 */
jspb$ro.exa$project_pb$ReadonlyPermissionGrants = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'exa.project_pb.PermissionGrants'}
   */
  jspb$exa$project_pb$MutablePermissionGrants.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$exa$project_pb$MutablePermissionGrants.displayName = 'proto.exa.project_pb.PermissionGrants';
}
/**
 * Interface form of PermissionGrants as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  permissionGrants: (!jspb$ro.exa$codeium_common_pb$ReadonlyPermissionGrantsConfig|undefined)
 * }}
 */
jspb$exa$project_pb$MutablePermissionGrants.FieldsInterface;

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
 * @param {!jspb$exa$project_pb$MutablePermissionGrants.FieldsInterface} record
 * @return {!jspb$exa$project_pb$ImmutablePermissionGrants}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$exa$project_pb$MutablePermissionGrants, ಠ_ಠ.clutz.jspb$exa$project_pb$MutablePermissionGrants.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$exa$project_pb$ImmutablePermissionGrants
 */
jspb$exa$project_pb$MutablePermissionGrants.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$exa$project_pb$MutablePermissionGrants));

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
 * @param {!jspb$ro.exa$project_pb$ReadonlyPermissionGrants} value
 * @return {!jspb$exa$project_pb$MutablePermissionGrants.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.exa$project_pb$ReadonlyPermissionGrants): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$exa$project_pb$MutablePermissionGrants, ಠ_ಠ.clutz.jspb$exa$project_pb$MutablePermissionGrants.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$exa$project_pb$MutablePermissionGrants.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$exa$project_pb$MutableProjectConversation;
Object.defineProperty(this, 'jspb$exa$project_pb$MutableProjectConversation', {
  get() { return jspb$exa$project_pb$MutableProjectConversation; },
  set(v) { jspb$exa$project_pb$MutableProjectConversation = v; },
