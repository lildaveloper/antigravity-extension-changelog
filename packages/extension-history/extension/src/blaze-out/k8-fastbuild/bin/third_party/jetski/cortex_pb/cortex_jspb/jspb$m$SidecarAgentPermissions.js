// source: third_party/jetski/cortex_pb/cortex.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$exa$cortex_pb$MutableSidecarAgentPermissions');
goog.provide('jspb$ro.exa$cortex_pb$ReadonlySidecarAgentPermissions');

goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$exa$cortex_pb$ImmutableSidecarAgentPermissions');
goog.requireType('jspb$r$exa$cortex_pb$SidecarAgentPermissions$internalDoNotUseReader');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$exa$cortex_pb$ImmutableSidecarAgentPermissions>}
 * @implements {jspb$r$exa$cortex_pb$SidecarAgentPermissions$internalDoNotUseReader}
 */
jspb$exa$cortex_pb$MutableSidecarAgentPermissions = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * repeated string workspace_uris = 1;
   * @override
   * @param {!jspb_internal_public_for_gencode.DoNotFreezeToken=} freezeOptOut
   * @tsType (freezeOptOut: import('google3/javascript/apps/jspb/internal_public').DoNotFreezeToken): string[]
   * @tsType (): readonly string[]
   * @return {!ReadonlyArray<string>}
   */
  getWorkspaceUrisList(freezeOptOut) {
    return jspb_internal_adapters.getRepeatedStringField(this, 1, jspb_internal_adapters.getRepeatedFieldReturnType(freezeOptOut));
  }


  /**
   * @param {!ReadonlyArray<string>|null|undefined} value
   * @return {!jspb$exa$cortex_pb$MutableSidecarAgentPermissions} returns this
   */
  setWorkspaceUrisList(value) {
    return jspb_internal_adapters.setRepeatedStringField(this, 1, value);
  }


  /**
   * @param {string} value
   * @param {number=} index
   * @return {!jspb$exa$cortex_pb$MutableSidecarAgentPermissions} returns this
   */
  addWorkspaceUris(value, index) {
    return jspb_internal_adapters.addToRepeatedStringField(this, 1, value, index);
  }


  /**
   * @param {!Iterable<string>} values
   * @return {!jspb$exa$cortex_pb$MutableSidecarAgentPermissions} returns this
   */
  addAllWorkspaceUris(values) {
    return jspb_internal_adapters.addAllToRepeatedStringField(this, 1, values);
  }


  /**
   * @param {number=} index If not passed, defaults to the end.
   * @return {!jspb$exa$cortex_pb$MutableSidecarAgentPermissions} returns this
   */
  removeWorkspaceUris(index) {
    return jspb_internal_adapters.removeFromRepeatedStringField(this, 1, index);
  }


  /**
   * Returns value at `index`.
   * @override
   * @param {number} index
   * @return {string}
   */
  getWorkspaceUris(index) {
   return jspb_internal_adapters.getRepeatedIndexedStringField(this, 1, index);
  }


  /**
   * @param {number} index
   * @param {string} value
   * @return {!jspb$exa$cortex_pb$MutableSidecarAgentPermissions} returns this
   */
  setWorkspaceUris(index, value) {
    return jspb_internal_adapters.setRepeatedIndexedStringField(this, 1, index, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$cortex_pb$MutableSidecarAgentPermissions} returns this
   */
  clearWorkspaceUrisList() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * Returns the size of this field.
   * @override
   * @return {number}
   */
  getWorkspaceUrisCount() {
    return jspb_internal_adapters.getRepeatedStringCount(this, 1);
  }


  /**
   * repeated string access_grants = 2;
   * @override
   * @param {!jspb_internal_public_for_gencode.DoNotFreezeToken=} freezeOptOut
   * @tsType (freezeOptOut: import('google3/javascript/apps/jspb/internal_public').DoNotFreezeToken): string[]
   * @tsType (): readonly string[]
   * @return {!ReadonlyArray<string>}
   */
  getAccessGrantsList(freezeOptOut) {
    return jspb_internal_adapters.getRepeatedStringField(this, 2, jspb_internal_adapters.getRepeatedFieldReturnType(freezeOptOut));
  }


  /**
   * @param {!ReadonlyArray<string>|null|undefined} value
   * @return {!jspb$exa$cortex_pb$MutableSidecarAgentPermissions} returns this
   */
  setAccessGrantsList(value) {
    return jspb_internal_adapters.setRepeatedStringField(this, 2, value);
  }


  /**
   * @param {string} value
   * @param {number=} index
   * @return {!jspb$exa$cortex_pb$MutableSidecarAgentPermissions} returns this
   */
  addAccessGrants(value, index) {
    return jspb_internal_adapters.addToRepeatedStringField(this, 2, value, index);
  }


  /**
   * @param {!Iterable<string>} values
   * @return {!jspb$exa$cortex_pb$MutableSidecarAgentPermissions} returns this
   */
  addAllAccessGrants(values) {
    return jspb_internal_adapters.addAllToRepeatedStringField(this, 2, values);
  }


  /**
   * @param {number=} index If not passed, defaults to the end.
   * @return {!jspb$exa$cortex_pb$MutableSidecarAgentPermissions} returns this
   */
  removeAccessGrants(index) {
    return jspb_internal_adapters.removeFromRepeatedStringField(this, 2, index);
  }


  /**
   * Returns value at `index`.
   * @override
   * @param {number} index
   * @return {string}
   */
  getAccessGrants(index) {
   return jspb_internal_adapters.getRepeatedIndexedStringField(this, 2, index);
  }


  /**
   * @param {number} index
   * @param {string} value
   * @return {!jspb$exa$cortex_pb$MutableSidecarAgentPermissions} returns this
   */
  setAccessGrants(index, value) {
    return jspb_internal_adapters.setRepeatedIndexedStringField(this, 2, index, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$cortex_pb$MutableSidecarAgentPermissions} returns this
   */
  clearAccessGrantsList() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * Returns the size of this field.
   * @override
   * @return {number}
   */
  getAccessGrantsCount() {
    return jspb_internal_adapters.getRepeatedStringCount(this, 2);
  }


  /**
   * optional bool allows_user_interactions = 3;
   * @override
   * @return {boolean}
   */
  getAllowsUserInteractions() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 3);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$exa$cortex_pb$MutableSidecarAgentPermissions} returns this
   */
  setAllowsUserInteractions(value) {
    return jspb_internal_adapters.setProto3BooleanField(this, 3, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$cortex_pb$MutableSidecarAgentPermissions} returns this
   */
  clearAllowsUserInteractions() {
    return jspb_internal_adapters.clearField(this, 3);
  }


};

/**
 * @override
 * @return {!jspb$exa$cortex_pb$ImmutableSidecarAgentPermissions}
 */
jspb$exa$cortex_pb$MutableSidecarAgentPermissions.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$exa$cortex_pb$MutableSidecarAgentPermissions}
 */
jspb$exa$cortex_pb$MutableSidecarAgentPermissions.prototype.clone;
/**
 * @const {function(string):!jspb$exa$cortex_pb$MutableSidecarAgentPermissions}
 */
jspb$exa$cortex_pb$MutableSidecarAgentPermissions.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$exa$cortex_pb$MutableSidecarAgentPermissions));

/**
 * Returns whether the given value is an instance of jspb$exa$cortex_pb$MutableSidecarAgentPermissions.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$exa$cortex_pb$MutableSidecarAgentPermissions>}
 */
jspb$exa$cortex_pb$MutableSidecarAgentPermissions.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$exa$cortex_pb$MutableSidecarAgentPermissions));

/**
 * Object form of SidecarAgentPermissions as accepted by the `fromObject` method.
 * @typedef {{
 *  workspaceUrisList: (?Array<string>|undefined),
 *  accessGrantsList: (?Array<string>|undefined),
 *  allowsUserInteractions: (?boolean|undefined)
 * }}
 */
jspb$exa$cortex_pb$MutableSidecarAgentPermissions.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$exa$cortex_pb$MutableSidecarAgentPermissions.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$exa$cortex_pb$MutableSidecarAgentPermissions.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$exa$cortex_pb$MutableSidecarAgentPermissions.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for exa$cortex_pb$MutableSidecarAgentPermissions.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$exa$cortex_pb$MutableSidecarAgentPermissions.internalDoNotUse_debugOnlyProtoTypeName = "exa.cortex_pb.SidecarAgentPermissions";
}

/**
 * @typedef {!jspb$exa$cortex_pb$ImmutableSidecarAgentPermissions|!jspb$exa$cortex_pb$MutableSidecarAgentPermissions}
 */
jspb$ro.exa$cortex_pb$ReadonlySidecarAgentPermissions = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'exa.cortex_pb.SidecarAgentPermissions'}
   */
  jspb$exa$cortex_pb$MutableSidecarAgentPermissions.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$exa$cortex_pb$MutableSidecarAgentPermissions.displayName = 'proto.exa.cortex_pb.SidecarAgentPermissions';
}
/**
 * Interface form of SidecarAgentPermissions as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  workspaceUrisList: (!ReadonlyArray<string>|undefined),
 *  accessGrantsList: (!ReadonlyArray<string>|undefined),
 *  allowsUserInteractions: (boolean|undefined)
 * }}
 */
jspb$exa$cortex_pb$MutableSidecarAgentPermissions.FieldsInterface;

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
 * @param {!jspb$exa$cortex_pb$MutableSidecarAgentPermissions.FieldsInterface} record
 * @return {!jspb$exa$cortex_pb$ImmutableSidecarAgentPermissions}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$exa$cortex_pb$MutableSidecarAgentPermissions, ಠ_ಠ.clutz.jspb$exa$cortex_pb$MutableSidecarAgentPermissions.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$exa$cortex_pb$ImmutableSidecarAgentPermissions
 */
jspb$exa$cortex_pb$MutableSidecarAgentPermissions.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$exa$cortex_pb$MutableSidecarAgentPermissions));

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
 * @param {!jspb$ro.exa$cortex_pb$ReadonlySidecarAgentPermissions} value
 * @return {!jspb$exa$cortex_pb$MutableSidecarAgentPermissions.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.exa$cortex_pb$ReadonlySidecarAgentPermissions): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$exa$cortex_pb$MutableSidecarAgentPermissions, ಠ_ಠ.clutz.jspb$exa$cortex_pb$MutableSidecarAgentPermissions.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$exa$cortex_pb$MutableSidecarAgentPermissions.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$exa$cortex_pb$MutableSidecarUserConfig;
Object.defineProperty(this, 'jspb$exa$cortex_pb$MutableSidecarUserConfig', {
  get() { return jspb$exa$cortex_pb$MutableSidecarUserConfig; },
  set(v) { jspb$exa$cortex_pb$MutableSidecarUserConfig = v; },
