// source: third_party/jetski/project_pb/project.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$exa$project_pb$MutableResources');
goog.provide('jspb$ro.exa$project_pb$ReadonlyResources');

goog.require('jspb$exa$project_pb$MutableResource');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$exa$project_pb$ImmutableResources');
goog.requireType('jspb$r$exa$project_pb$Resources$internalDoNotUseReader');
goog.requireType('jspb$ro.exa$project_pb$ReadonlyResource');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$exa$project_pb$ImmutableResources>}
 * @implements {jspb$r$exa$project_pb$Resources$internalDoNotUseReader}
 */
jspb$exa$project_pb$MutableResources = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * repeated Resource resources = 1;
   * @param {!jspb_internal_public_for_gencode.DoNotFreezeToken=} freezeOptOut
   * @tsType (freezeOptOut: import('google3/javascript/apps/jspb/internal_public').DoNotFreezeToken): ಠ_ಠ.clutz.jspb$exa$project_pb$MutableResource[]
   * @tsType (): readonly ಠ_ಠ.clutz.jspb$exa$project_pb$MutableResource[]
   * @override
   * @return {!ReadonlyArray<!jspb$exa$project_pb$MutableResource>}
   */
  getResourcesList(freezeOptOut) {
    return jspb_internal_adapters.getRepeatedWrapperField(this, jspb$exa$project_pb$MutableResource, 1, jspb_internal_adapters.getRepeatedFieldReturnType(freezeOptOut));
  }


  /**
   * repeated Resource resources = 1;
   * @override
   * @return {!ReadonlyArray<!jspb$ro.exa$project_pb$ReadonlyResource>}
   */
  getReadonlyResourcesList() {
    return jspb_internal_adapters.getReadonlyRepeatedWrapperField(this, jspb$exa$project_pb$MutableResource, 1);
  }


  /**
   * @param {!ReadonlyArray<!jspb$ro.exa$project_pb$ReadonlyResource>|null|undefined} value
   * @return {!jspb$exa$project_pb$MutableResources} returns this
   */
  setResourcesList(value) {
    return jspb_internal_adapters.setRepeatedWrapperField(this, jspb$exa$project_pb$MutableResource, 1, value);
  }


  /**
   * Gets mutable repeated field reference.
   * @param {number} index
   * @return {!jspb$exa$project_pb$MutableResource}
   */
  getMutableResources(index) {
    return jspb_internal_adapters.getRepeatedIndexedMutableWrapper(this, 1, jspb$exa$project_pb$MutableResource, index);
  }


  /**
   * Gets readonly repeated field reference.
   * @override
   * @param {number} index
   * @return {!jspb$ro.exa$project_pb$ReadonlyResource}
   */
  getReadonlyResources(index) {
    return jspb_internal_adapters.getRepeatedIndexedReadonlyWrapper(this, 1, jspb$exa$project_pb$MutableResource, index);
  }


  /**
   * Adds repeated field and returns `this`.
   * @param {!jspb$ro.exa$project_pb$ReadonlyResource} value
   * @param {number=} index
   * @return {!jspb$exa$project_pb$MutableResources} returns this
   */
  addResources(value, index) {
    return jspb_internal_adapters.addToRepeatedWrapperField(this, 1, jspb$exa$project_pb$MutableResource, value, index);
  }


  /**
   * Adds repeated field and returns newly added submessage.
   * @param {!jspb$exa$project_pb$MutableResource=} value
   * @param {number=} index
   * @return {!jspb$exa$project_pb$MutableResource} the value that was added
   */
  addAndReturnResources(value, index) {
    return jspb_internal_adapters.addAndReturnRepeatedWrapperField(this, 1, jspb$exa$project_pb$MutableResource, value, index);
  }


  /**
   * Adds multiple values to a repeated field and returns `this`.
   * @param {!Iterable<!jspb$ro.exa$project_pb$ReadonlyResource>} values
   * @return {!jspb$exa$project_pb$MutableResources} returns this
   */
  addAllResources(values) {
    return jspb_internal_adapters.addAllToRepeatedWrapperField(this, 1, jspb$exa$project_pb$MutableResource, values);
  }


  /**
   * Sets repeated field value at `index` and returns `this`.
   * @param {number} index
   * @param {!jspb$ro.exa$project_pb$ReadonlyResource} value
   * @return {!jspb$exa$project_pb$MutableResources} returns this
   */
  setResources(index, value) {
    return jspb_internal_adapters.setRepeatedIndexedWrapper(this, 1, jspb$exa$project_pb$MutableResource, index, value);
  }


  /**
   * Removes a value from a repeated field and returns `this`.
   * @param {number=} index defaults to the end
   * @return {!jspb$exa$project_pb$MutableResources} returns this
   */
  removeResources(index) {
    return jspb_internal_adapters.removeFromRepeatedWrapperField(this, 1, jspb$exa$project_pb$MutableResource, index);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$project_pb$MutableResources} returns this
   */
  clearResourcesList() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * Returns the size of this field.
   * @override
   * @return {number}
   */
  getResourcesCount() {
    return jspb_internal_adapters.getRepeatedWrapperCount(this, jspb$exa$project_pb$MutableResource, 1);
  }


};

/**
 * @override
 * @return {!jspb$exa$project_pb$ImmutableResources}
 */
jspb$exa$project_pb$MutableResources.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$exa$project_pb$MutableResources}
 */
jspb$exa$project_pb$MutableResources.prototype.clone;
/**
 * @const {function(string):!jspb$exa$project_pb$MutableResources}
 */
jspb$exa$project_pb$MutableResources.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$exa$project_pb$MutableResources));

/**
 * Returns whether the given value is an instance of jspb$exa$project_pb$MutableResources.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$exa$project_pb$MutableResources>}
 */
jspb$exa$project_pb$MutableResources.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$exa$project_pb$MutableResources));

/**
 * Object form of Resources as accepted by the `fromObject` method.
 * @typedef {{
 *  resourcesList: (?Array<!jspb$exa$project_pb$MutableResource.ObjectFormat>|undefined)
 * }}
 */
jspb$exa$project_pb$MutableResources.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$exa$project_pb$MutableResources.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$exa$project_pb$MutableResources.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$exa$project_pb$MutableResources.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for exa$project_pb$MutableResources.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$exa$project_pb$MutableResources.internalDoNotUse_debugOnlyProtoTypeName = "exa.project_pb.Resources";
}

/**
 * @typedef {!jspb$exa$project_pb$ImmutableResources|!jspb$exa$project_pb$MutableResources}
 */
jspb$ro.exa$project_pb$ReadonlyResources = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'exa.project_pb.Resources'}
   */
  jspb$exa$project_pb$MutableResources.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$exa$project_pb$MutableResources.displayName = 'proto.exa.project_pb.Resources';
}
/**
 * Interface form of Resources as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  resourcesList: (!ReadonlyArray<!jspb$ro.exa$project_pb$ReadonlyResource>|undefined)
 * }}
 */
jspb$exa$project_pb$MutableResources.FieldsInterface;

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
 * @param {!jspb$exa$project_pb$MutableResources.FieldsInterface} record
 * @return {!jspb$exa$project_pb$ImmutableResources}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$exa$project_pb$MutableResources, ಠ_ಠ.clutz.jspb$exa$project_pb$MutableResources.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$exa$project_pb$ImmutableResources
 */
jspb$exa$project_pb$MutableResources.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$exa$project_pb$MutableResources));

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
 * @param {!jspb$ro.exa$project_pb$ReadonlyResources} value
 * @return {!jspb$exa$project_pb$MutableResources.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.exa$project_pb$ReadonlyResources): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$exa$project_pb$MutableResources, ಠ_ಠ.clutz.jspb$exa$project_pb$MutableResources.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$exa$project_pb$MutableResources.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$exa$project_pb$MutableEnvironment;
Object.defineProperty(this, 'jspb$exa$project_pb$MutableEnvironment', {
  get() { return jspb$exa$project_pb$MutableEnvironment; },
  set(v) { jspb$exa$project_pb$MutableEnvironment = v; },
