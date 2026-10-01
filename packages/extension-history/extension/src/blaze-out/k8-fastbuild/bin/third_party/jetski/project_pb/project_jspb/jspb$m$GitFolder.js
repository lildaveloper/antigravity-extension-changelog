// source: third_party/jetski/project_pb/project.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$exa$project_pb$MutableGitFolder');
goog.provide('jspb$ro.exa$project_pb$ReadonlyGitFolder');

goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$exa$project_pb$ImmutableGitFolder');
goog.requireType('jspb$r$exa$project_pb$GitFolder$internalDoNotUseReader');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$exa$project_pb$ImmutableGitFolder>}
 * @implements {jspb$r$exa$project_pb$GitFolder$internalDoNotUseReader}
 */
jspb$exa$project_pb$MutableGitFolder = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional string folder_uri = 1;
   * @override
   * @return {string}
   */
  getFolderUri() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 1);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$exa$project_pb$MutableGitFolder} returns this
   */
  setFolderUri(value) {
    return jspb_internal_adapters.setProto3StringField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$project_pb$MutableGitFolder} returns this
   */
  clearFolderUri() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * optional string default_branch = 2;
   * @override
   * @return {string}
   */
  getDefaultBranch() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 2);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$exa$project_pb$MutableGitFolder} returns this
   */
  setDefaultBranch(value) {
    return jspb_internal_adapters.setProto3StringField(this, 2, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$project_pb$MutableGitFolder} returns this
   */
  clearDefaultBranch() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * optional bool allow_write = 3;
   * @override
   * @return {boolean}
   * @deprecated
   */
  getAllowWrite() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 3);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$exa$project_pb$MutableGitFolder} returns this
   * @deprecated
   */
  setAllowWrite(value) {
    return jspb_internal_adapters.setProto3BooleanField(this, 3, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$project_pb$MutableGitFolder} returns this
   * @deprecated
   */
  clearAllowWrite() {
    return jspb_internal_adapters.clearField(this, 3);
  }


};

/**
 * @override
 * @return {!jspb$exa$project_pb$ImmutableGitFolder}
 */
jspb$exa$project_pb$MutableGitFolder.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$exa$project_pb$MutableGitFolder}
 */
jspb$exa$project_pb$MutableGitFolder.prototype.clone;
/**
 * @const {function(string):!jspb$exa$project_pb$MutableGitFolder}
 */
jspb$exa$project_pb$MutableGitFolder.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$exa$project_pb$MutableGitFolder));

/**
 * Returns whether the given value is an instance of jspb$exa$project_pb$MutableGitFolder.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$exa$project_pb$MutableGitFolder>}
 */
jspb$exa$project_pb$MutableGitFolder.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$exa$project_pb$MutableGitFolder));

/**
 * Object form of GitFolder as accepted by the `fromObject` method.
 * @typedef {{
 *  folderUri: (?string|undefined),
 *  defaultBranch: (?string|undefined),
 *  allowWrite: (?boolean|undefined)
 * }}
 */
jspb$exa$project_pb$MutableGitFolder.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$exa$project_pb$MutableGitFolder.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$exa$project_pb$MutableGitFolder.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$exa$project_pb$MutableGitFolder.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for exa$project_pb$MutableGitFolder.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$exa$project_pb$MutableGitFolder.internalDoNotUse_debugOnlyProtoTypeName = "exa.project_pb.GitFolder";
}

/**
 * @typedef {!jspb$exa$project_pb$ImmutableGitFolder|!jspb$exa$project_pb$MutableGitFolder}
 */
jspb$ro.exa$project_pb$ReadonlyGitFolder = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'exa.project_pb.GitFolder'}
   */
  jspb$exa$project_pb$MutableGitFolder.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$exa$project_pb$MutableGitFolder.displayName = 'proto.exa.project_pb.GitFolder';
}
/**
 * Interface form of GitFolder as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  folderUri: (string|undefined),
 *  defaultBranch: (string|undefined),
 *  allowWrite: (boolean|undefined)
 * }}
 */
jspb$exa$project_pb$MutableGitFolder.FieldsInterface;

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
 * @param {!jspb$exa$project_pb$MutableGitFolder.FieldsInterface} record
 * @return {!jspb$exa$project_pb$ImmutableGitFolder}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$exa$project_pb$MutableGitFolder, ಠ_ಠ.clutz.jspb$exa$project_pb$MutableGitFolder.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$exa$project_pb$ImmutableGitFolder
 */
jspb$exa$project_pb$MutableGitFolder.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$exa$project_pb$MutableGitFolder));

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
 * @param {!jspb$ro.exa$project_pb$ReadonlyGitFolder} value
 * @return {!jspb$exa$project_pb$MutableGitFolder.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.exa$project_pb$ReadonlyGitFolder): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$exa$project_pb$MutableGitFolder, ಠ_ಠ.clutz.jspb$exa$project_pb$MutableGitFolder.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$exa$project_pb$MutableGitFolder.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$exa$project_pb$MutableGoogle3;
Object.defineProperty(this, 'jspb$exa$project_pb$MutableGoogle3', {
  get() { return jspb$exa$project_pb$MutableGoogle3; },
  set(v) { jspb$exa$project_pb$MutableGoogle3 = v; },
