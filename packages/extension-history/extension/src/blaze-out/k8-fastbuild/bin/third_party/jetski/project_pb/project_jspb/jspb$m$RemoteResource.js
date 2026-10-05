// source: third_party/jetski/project_pb/project.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$exa$project_pb$MutableRemoteResource');
goog.provide('jspb$ro.exa$project_pb$ReadonlyRemoteResource');

goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$exa$project_pb$ImmutableRemoteResource');
goog.requireType('jspb$r$exa$project_pb$RemoteResource$internalDoNotUseReader');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$exa$project_pb$ImmutableRemoteResource>}
 * @implements {jspb$r$exa$project_pb$RemoteResource$internalDoNotUseReader}
 */
jspb$exa$project_pb$MutableRemoteResource = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional string type = 1;
   * @override
   * @return {string}
   */
  getType() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 1);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$exa$project_pb$MutableRemoteResource} returns this
   */
  setType(value) {
    return jspb_internal_adapters.setProto3StringField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$project_pb$MutableRemoteResource} returns this
   */
  clearType() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * optional string resource_id = 2;
   * @override
   * @return {string}
   */
  getResourceId() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 2);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$exa$project_pb$MutableRemoteResource} returns this
   */
  setResourceId(value) {
    return jspb_internal_adapters.setProto3StringField(this, 2, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$project_pb$MutableRemoteResource} returns this
   */
  clearResourceId() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * optional string display_name = 3;
   * @override
   * @return {string}
   */
  getDisplayName() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 3);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$exa$project_pb$MutableRemoteResource} returns this
   */
  setDisplayName(value) {
    return jspb_internal_adapters.setProto3StringField(this, 3, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$project_pb$MutableRemoteResource} returns this
   */
  clearDisplayName() {
    return jspb_internal_adapters.clearField(this, 3);
  }


  /**
   * optional string icon_url = 4;
   * @override
   * @return {string}
   */
  getIconUrl() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 4);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$exa$project_pb$MutableRemoteResource} returns this
   */
  setIconUrl(value) {
    return jspb_internal_adapters.setProto3StringField(this, 4, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$project_pb$MutableRemoteResource} returns this
   */
  clearIconUrl() {
    return jspb_internal_adapters.clearField(this, 4);
  }


  /**
   * optional string url = 5;
   * @override
   * @return {string}
   */
  getUrl() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 5);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$exa$project_pb$MutableRemoteResource} returns this
   */
  setUrl(value) {
    return jspb_internal_adapters.setProto3StringField(this, 5, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$project_pb$MutableRemoteResource} returns this
   */
  clearUrl() {
    return jspb_internal_adapters.clearField(this, 5);
  }


};

/**
 * @override
 * @return {!jspb$exa$project_pb$ImmutableRemoteResource}
 */
jspb$exa$project_pb$MutableRemoteResource.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$exa$project_pb$MutableRemoteResource}
 */
jspb$exa$project_pb$MutableRemoteResource.prototype.clone;
/**
 * @const {function(string):!jspb$exa$project_pb$MutableRemoteResource}
 */
jspb$exa$project_pb$MutableRemoteResource.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$exa$project_pb$MutableRemoteResource));

/**
 * Returns whether the given value is an instance of jspb$exa$project_pb$MutableRemoteResource.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$exa$project_pb$MutableRemoteResource>}
 */
jspb$exa$project_pb$MutableRemoteResource.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$exa$project_pb$MutableRemoteResource));

/**
 * Object form of RemoteResource as accepted by the `fromObject` method.
 * @typedef {{
 *  type: (?string|undefined),
 *  resourceId: (?string|undefined),
 *  displayName: (?string|undefined),
 *  iconUrl: (?string|undefined),
 *  url: (?string|undefined)
 * }}
 */
jspb$exa$project_pb$MutableRemoteResource.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$exa$project_pb$MutableRemoteResource.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$exa$project_pb$MutableRemoteResource.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$exa$project_pb$MutableRemoteResource.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for exa$project_pb$MutableRemoteResource.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$exa$project_pb$MutableRemoteResource.internalDoNotUse_debugOnlyProtoTypeName = "exa.project_pb.RemoteResource";
}

/**
 * @typedef {!jspb$exa$project_pb$ImmutableRemoteResource|!jspb$exa$project_pb$MutableRemoteResource}
 */
jspb$ro.exa$project_pb$ReadonlyRemoteResource = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'exa.project_pb.RemoteResource'}
   */
  jspb$exa$project_pb$MutableRemoteResource.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$exa$project_pb$MutableRemoteResource.displayName = 'proto.exa.project_pb.RemoteResource';
}
/**
 * Interface form of RemoteResource as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  type: (string|undefined),
 *  resourceId: (string|undefined),
 *  displayName: (string|undefined),
 *  iconUrl: (string|undefined),
 *  url: (string|undefined)
 * }}
 */
jspb$exa$project_pb$MutableRemoteResource.FieldsInterface;

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
 * @param {!jspb$exa$project_pb$MutableRemoteResource.FieldsInterface} record
 * @return {!jspb$exa$project_pb$ImmutableRemoteResource}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$exa$project_pb$MutableRemoteResource, ಠ_ಠ.clutz.jspb$exa$project_pb$MutableRemoteResource.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$exa$project_pb$ImmutableRemoteResource
 */
jspb$exa$project_pb$MutableRemoteResource.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$exa$project_pb$MutableRemoteResource));

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
 * @param {!jspb$ro.exa$project_pb$ReadonlyRemoteResource} value
 * @return {!jspb$exa$project_pb$MutableRemoteResource.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.exa$project_pb$ReadonlyRemoteResource): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$exa$project_pb$MutableRemoteResource, ಠ_ಠ.clutz.jspb$exa$project_pb$MutableRemoteResource.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$exa$project_pb$MutableRemoteResource.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$exa$project_pb$MutableResource;
Object.defineProperty(this, 'jspb$exa$project_pb$MutableResource', {
  get() { return jspb$exa$project_pb$MutableResource; },
  set(v) { jspb$exa$project_pb$MutableResource = v; },
