// source: third_party/jetski/project_pb/project.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$exa$project_pb$MutableResource');
goog.provide('jspb$ro.exa$project_pb$ReadonlyResource');

goog.require('jspb$exa$project_pb$MutableGitFolder');
goog.require('jspb$exa$project_pb$MutableGoogle3');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$e.exa$project_pb$Resource$TypeCase');
goog.requireType('jspb$exa$project_pb$ImmutableResource');
goog.requireType('jspb$r$exa$project_pb$Resource$internalDoNotUseReader');
goog.requireType('jspb$ro.exa$project_pb$ReadonlyGitFolder');
goog.requireType('jspb$ro.exa$project_pb$ReadonlyGoogle3');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$exa$project_pb$ImmutableResource>}
 * @implements {jspb$r$exa$project_pb$Resource$internalDoNotUseReader}
 */
jspb$exa$project_pb$MutableResource = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * @override
   * @return {!jspb$e.exa$project_pb$Resource$TypeCase}
   */
  getTypeCase() {
    return /** @type {!jspb$e.exa$project_pb$Resource$TypeCase} */(jspb_internal_adapters.computeOneofCase(this, jspb$exa$project_pb$MutableResource.oneofGroup_type_));
  }


  /**
   * @return {!jspb$exa$project_pb$MutableResource}
   */
  clearType() {
    return jspb_internal_adapters.clearAllFieldsInOneof(this, jspb$exa$project_pb$MutableResource.oneofGroup_type_);
  }


  /**
   * optional string folder_uri = 1;
   * @override
   * @return {string}
   */
  getFolderUri() {
    return jspb_internal_adapters.getOneofStringFieldWithDefault(this, 1, jspb$exa$project_pb$MutableResource.oneofGroup_type_);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$exa$project_pb$MutableResource} returns this
   */
  setFolderUri(value) {
    return jspb_internal_adapters.setOneofStringField(this, 1, jspb$exa$project_pb$MutableResource.oneofGroup_type_, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$project_pb$MutableResource} returns this
   */
  clearFolderUri() {
    return jspb_internal_adapters.clearOneofField(this, 1, jspb$exa$project_pb$MutableResource.oneofGroup_type_);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasFolderUri() {
    return jspb_internal_adapters.hasOneofStringField(this, 1, jspb$exa$project_pb$MutableResource.oneofGroup_type_);
  }


  /**
   * optional string folder_uri = 1;
   * @override
   * @return {string|undefined}
   */
  getFolderUriOrUndefined() {
    return jspb_internal_adapters.getOneofStringFieldOrUndefined(this, 1, jspb$exa$project_pb$MutableResource.oneofGroup_type_);
  }


  /**
   * optional Google3 google3 = 2;
   * @override
   * @return {!jspb$exa$project_pb$MutableGoogle3|undefined}
   */
  getGoogle3() {
    return jspb_internal_adapters.getOneofWrapperFieldOrUndefined(this, jspb$exa$project_pb$MutableGoogle3, 2, jspb$exa$project_pb$MutableResource.oneofGroup_type_);
  }


  /**
   * optional Google3 google3 = 2;
   * @override
   * @return {!jspb$ro.exa$project_pb$ReadonlyGoogle3}
   */
  getReadonlyGoogle3() {
    return jspb_internal_adapters.getReadonlyOneofWrapperField(this, jspb$exa$project_pb$MutableGoogle3, 2, jspb$exa$project_pb$MutableResource.oneofGroup_type_);
  }


  /**
   * optional Google3 google3 = 2;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$exa$project_pb$MutableGoogle3|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$exa$project_pb$MutableGoogle3') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$exa$project_pb$MutableGoogle3|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$exa$project_pb$MutableGoogle3
   */
  getMutableGoogle3(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableOneofWrapperField(this, jspb$exa$project_pb$MutableGoogle3, 2, jspb$exa$project_pb$MutableResource.oneofGroup_type_, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.exa$project_pb$ReadonlyGoogle3|null|undefined} value
   * @return {!jspb$exa$project_pb$MutableResource} returns this
   */
  setGoogle3(value) {
    return jspb_internal_adapters.setOneofWrapperField(this, jspb$exa$project_pb$MutableGoogle3, 2, jspb$exa$project_pb$MutableResource.oneofGroup_type_, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$project_pb$MutableResource} returns this
   */
  clearGoogle3() {
    return jspb_internal_adapters.clearOneofField(this, 2, jspb$exa$project_pb$MutableResource.oneofGroup_type_);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasGoogle3() {
    return jspb_internal_adapters.hasOneofWrapperField(this, jspb$exa$project_pb$MutableGoogle3, 2, jspb$exa$project_pb$MutableResource.oneofGroup_type_);
  }


  /**
   * optional Google3 google3 = 2;
   * @override
   * @return {!jspb$ro.exa$project_pb$ReadonlyGoogle3|undefined}
   */
  getGoogle3OrUndefined() {
    return jspb_internal_adapters.getReadonlyOneofWrapperFieldOrUndefined(this, jspb$exa$project_pb$MutableGoogle3, 2, jspb$exa$project_pb$MutableResource.oneofGroup_type_);
  }


  /**
   * optional GitFolder git_folder = 3;
   * @override
   * @return {!jspb$exa$project_pb$MutableGitFolder|undefined}
   */
  getGitFolder() {
    return jspb_internal_adapters.getOneofWrapperFieldOrUndefined(this, jspb$exa$project_pb$MutableGitFolder, 3, jspb$exa$project_pb$MutableResource.oneofGroup_type_);
  }


  /**
   * optional GitFolder git_folder = 3;
   * @override
   * @return {!jspb$ro.exa$project_pb$ReadonlyGitFolder}
   */
  getReadonlyGitFolder() {
    return jspb_internal_adapters.getReadonlyOneofWrapperField(this, jspb$exa$project_pb$MutableGitFolder, 3, jspb$exa$project_pb$MutableResource.oneofGroup_type_);
  }


  /**
   * optional GitFolder git_folder = 3;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$exa$project_pb$MutableGitFolder|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$exa$project_pb$MutableGitFolder') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$exa$project_pb$MutableGitFolder|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$exa$project_pb$MutableGitFolder
   */
  getMutableGitFolder(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableOneofWrapperField(this, jspb$exa$project_pb$MutableGitFolder, 3, jspb$exa$project_pb$MutableResource.oneofGroup_type_, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.exa$project_pb$ReadonlyGitFolder|null|undefined} value
   * @return {!jspb$exa$project_pb$MutableResource} returns this
   */
  setGitFolder(value) {
    return jspb_internal_adapters.setOneofWrapperField(this, jspb$exa$project_pb$MutableGitFolder, 3, jspb$exa$project_pb$MutableResource.oneofGroup_type_, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$project_pb$MutableResource} returns this
   */
  clearGitFolder() {
    return jspb_internal_adapters.clearOneofField(this, 3, jspb$exa$project_pb$MutableResource.oneofGroup_type_);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasGitFolder() {
    return jspb_internal_adapters.hasOneofWrapperField(this, jspb$exa$project_pb$MutableGitFolder, 3, jspb$exa$project_pb$MutableResource.oneofGroup_type_);
  }


  /**
   * optional GitFolder git_folder = 3;
   * @override
   * @return {!jspb$ro.exa$project_pb$ReadonlyGitFolder|undefined}
   */
  getGitFolderOrUndefined() {
    return jspb_internal_adapters.getReadonlyOneofWrapperFieldOrUndefined(this, jspb$exa$project_pb$MutableGitFolder, 3, jspb$exa$project_pb$MutableResource.oneofGroup_type_);
  }


};

/**
 * @override
 * @return {!jspb$exa$project_pb$ImmutableResource}
 */
jspb$exa$project_pb$MutableResource.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$exa$project_pb$MutableResource}
 */
jspb$exa$project_pb$MutableResource.prototype.clone;
/**
 * @const {function(string):!jspb$exa$project_pb$MutableResource}
 */
jspb$exa$project_pb$MutableResource.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$exa$project_pb$MutableResource));

/**
 * Returns whether the given value is an instance of jspb$exa$project_pb$MutableResource.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$exa$project_pb$MutableResource>}
 */
jspb$exa$project_pb$MutableResource.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$exa$project_pb$MutableResource));

/**
 * Object form of Resource as accepted by the `fromObject` method.
 * @typedef {{
 *  folderUri: (?string|undefined),
 *  google3: (?jspb$exa$project_pb$MutableGoogle3.ObjectFormat|undefined),
 *  gitFolder: (?jspb$exa$project_pb$MutableGitFolder.ObjectFormat|undefined)
 * }}
 */
jspb$exa$project_pb$MutableResource.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$exa$project_pb$MutableResource.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$exa$project_pb$MutableResource.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$exa$project_pb$MutableResource.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for exa$project_pb$MutableResource.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$exa$project_pb$MutableResource.internalDoNotUse_debugOnlyProtoTypeName = "exa.project_pb.Resource";
}

/**
 * @typedef {!jspb$exa$project_pb$ImmutableResource|!jspb$exa$project_pb$MutableResource}
 */
jspb$ro.exa$project_pb$ReadonlyResource = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'exa.project_pb.Resource'}
   */
  jspb$exa$project_pb$MutableResource.prototype.internalDoNotUse_annotations;
}
/**
 * Oneof group definition.
 * @private {!ReadonlyArray<number>}
 * @const
 * @nodts
 */
jspb$exa$project_pb$MutableResource.oneofGroup_type_ = [1,2,3];

if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$exa$project_pb$MutableResource.displayName = 'proto.exa.project_pb.Resource';
}
/**
 * Interface form of Resource as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  folderUri: (string|undefined),
 *  google3: (!jspb$ro.exa$project_pb$ReadonlyGoogle3|undefined),
 *  gitFolder: (!jspb$ro.exa$project_pb$ReadonlyGitFolder|undefined)
 * }}
 */
jspb$exa$project_pb$MutableResource.FieldsInterface;

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
 * @param {!jspb$exa$project_pb$MutableResource.FieldsInterface} record
 * @return {!jspb$exa$project_pb$ImmutableResource}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$exa$project_pb$MutableResource, ಠ_ಠ.clutz.jspb$exa$project_pb$MutableResource.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$exa$project_pb$ImmutableResource
 */
jspb$exa$project_pb$MutableResource.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$exa$project_pb$MutableResource));

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
 * @param {!jspb$ro.exa$project_pb$ReadonlyResource} value
 * @return {!jspb$exa$project_pb$MutableResource.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.exa$project_pb$ReadonlyResource): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$exa$project_pb$MutableResource, ಠ_ಠ.clutz.jspb$exa$project_pb$MutableResource.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$exa$project_pb$MutableResource.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$exa$project_pb$MutableResources;
Object.defineProperty(this, 'jspb$exa$project_pb$MutableResources', {
  get() { return jspb$exa$project_pb$MutableResources; },
  set(v) { jspb$exa$project_pb$MutableResources = v; },
