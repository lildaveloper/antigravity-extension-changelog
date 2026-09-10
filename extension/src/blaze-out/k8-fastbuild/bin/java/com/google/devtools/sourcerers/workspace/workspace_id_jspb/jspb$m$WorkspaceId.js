// source: java/com/google/devtools/sourcerers/workspace/workspace_id.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$devtools$sourcerers$MutableWorkspaceId');
goog.provide('jspb$ro.devtools$sourcerers$ReadonlyWorkspaceId');

goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$devtools$sourcerers$ImmutableWorkspaceId');
goog.requireType('jspb$e.devtools$sourcerers$WorkspaceId$Vcs');
goog.requireType('jspb$r$devtools$sourcerers$WorkspaceId$internalDoNotUseReader');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$devtools$sourcerers$ImmutableWorkspaceId>}
 * @implements {jspb$r$devtools$sourcerers$WorkspaceId$internalDoNotUseReader}
 */
jspb$devtools$sourcerers$MutableWorkspaceId = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional string owner = 1;
   * @override
   * @return {string}
   */
  getOwner() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 1);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools$sourcerers$MutableWorkspaceId} returns this
   */
  setOwner(value) {
    return jspb_internal_adapters.setProto3StringField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools$sourcerers$MutableWorkspaceId} returns this
   */
  clearOwner() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * optional uint64 citc_id = 2;
   * @override
   * @return {!gbigint}
   */
  getCitcId() {
    return jspb_internal_adapters.getUint64GbigintFieldWithDefault(this, 2);
  }


  /**
   * optional uint64 citc_id = 2;
   * @override
   * @return {number}
   * @deprecated unsafe int64 behavior: go/jspb-api-gotchas#int64
   */
  getCitcId_asLegacyNumberOrString() {
    return jspb_internal_adapters.getUint64FieldWithDefault(this, 2);
  }


  /**
   * optional uint64 citc_id = 2;
   * @override
   * @return {string}
   */
  getCitcId_asString() {
    return jspb_internal_adapters.getUint64FieldWithDefault_asString(this, 2);
  }


  /**
   * @param {number|string|!gbigint|null|undefined} value
   * @return {!jspb$devtools$sourcerers$MutableWorkspaceId} returns this
   */
  setCitcId(value) {
    return jspb_internal_adapters.setProto3Uint64Field(this, 2, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools$sourcerers$MutableWorkspaceId} returns this
   */
  clearCitcId() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * optional string name = 3;
   * @override
   * @return {string}
   */
  getName() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 3);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools$sourcerers$MutableWorkspaceId} returns this
   */
  setName(value) {
    return jspb_internal_adapters.setProto3StringField(this, 3, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools$sourcerers$MutableWorkspaceId} returns this
   */
  clearName() {
    return jspb_internal_adapters.clearField(this, 3);
  }


  /**
   * optional Vcs vcs = 4;
   * @override
   * @return {!jspb$e.devtools$sourcerers$WorkspaceId$Vcs}
   */
  getVcs() {
    return /** @type {!jspb$e.devtools$sourcerers$WorkspaceId$Vcs} */ (jspb_internal_adapters.getEnumFieldWithDefault(this, 4));
  }


  /**
   * @param {!jspb$e.devtools$sourcerers$WorkspaceId$Vcs|null|undefined} value
   * @return {!jspb$devtools$sourcerers$MutableWorkspaceId} returns this
   */
  setVcs(value) {
    return jspb_internal_adapters.setProto3EnumField(this, 4, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools$sourcerers$MutableWorkspaceId} returns this
   */
  clearVcs() {
    return jspb_internal_adapters.clearField(this, 4);
  }


};

/**
 * @override
 * @return {!jspb$devtools$sourcerers$ImmutableWorkspaceId}
 */
jspb$devtools$sourcerers$MutableWorkspaceId.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$devtools$sourcerers$MutableWorkspaceId}
 */
jspb$devtools$sourcerers$MutableWorkspaceId.prototype.clone;
/**
 * @const {function(string):!jspb$devtools$sourcerers$MutableWorkspaceId}
 */
jspb$devtools$sourcerers$MutableWorkspaceId.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$devtools$sourcerers$MutableWorkspaceId));

/**
 * Returns whether the given value is an instance of jspb$devtools$sourcerers$MutableWorkspaceId.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$devtools$sourcerers$MutableWorkspaceId>}
 */
jspb$devtools$sourcerers$MutableWorkspaceId.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$devtools$sourcerers$MutableWorkspaceId));

/**
 * Object form of WorkspaceId as accepted by the `fromObject` method.
 * @typedef {{
 *  owner: (?string|undefined),
 *  citcId: (?number|string|undefined),
 *  name: (?string|undefined),
 *  vcs: (?number|undefined)
 * }}
 */
jspb$devtools$sourcerers$MutableWorkspaceId.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$devtools$sourcerers$MutableWorkspaceId.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @return {!jspb$devtools$sourcerers$MutableWorkspaceId.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$devtools$sourcerers$MutableWorkspaceId.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for devtools$sourcerers$MutableWorkspaceId.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$devtools$sourcerers$MutableWorkspaceId.internalDoNotUse_debugOnlyProtoTypeName = "devtools.sourcerers.WorkspaceId";
}

/**
 * @typedef {!jspb$devtools$sourcerers$ImmutableWorkspaceId|!jspb$devtools$sourcerers$MutableWorkspaceId}
 */
jspb$ro.devtools$sourcerers$ReadonlyWorkspaceId = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'devtools.sourcerers.WorkspaceId'}
   */
  jspb$devtools$sourcerers$MutableWorkspaceId.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$devtools$sourcerers$MutableWorkspaceId.displayName = 'devtools.sourcerers.WorkspaceId';
}
/**
 * Interface form of WorkspaceId as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  owner: (string|undefined),
 *  citcId: (!gbigint|undefined),
 *  citcId_asLegacyNumberOrString: (number|string|undefined),
 *  name: (string|undefined),
 *  vcs: (!jspb$e.devtools$sourcerers$WorkspaceId$Vcs|undefined)
 * }}
 */
jspb$devtools$sourcerers$MutableWorkspaceId.FieldsInterface;

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
 * @param {!jspb$devtools$sourcerers$MutableWorkspaceId.FieldsInterface} record
 * @return {!jspb$devtools$sourcerers$ImmutableWorkspaceId}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$devtools$sourcerers$MutableWorkspaceId, ಠ_ಠ.clutz.jspb$devtools$sourcerers$MutableWorkspaceId.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$devtools$sourcerers$ImmutableWorkspaceId
 */
jspb$devtools$sourcerers$MutableWorkspaceId.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$devtools$sourcerers$MutableWorkspaceId));

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
 * @param {!jspb$ro.devtools$sourcerers$ReadonlyWorkspaceId} value
 * @return {!jspb$devtools$sourcerers$MutableWorkspaceId.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.devtools$sourcerers$ReadonlyWorkspaceId): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$devtools$sourcerers$MutableWorkspaceId, ಠ_ಠ.clutz.jspb$devtools$sourcerers$MutableWorkspaceId.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$devtools$sourcerers$MutableWorkspaceId.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$b$devtools$sourcerers$WorkspaceId;
Object.defineProperty(this, 'jspb$b$devtools$sourcerers$WorkspaceId', {
  get() { return jspb$b$devtools$sourcerers$WorkspaceId; },
  set(v) { jspb$b$devtools$sourcerers$WorkspaceId = v; },
