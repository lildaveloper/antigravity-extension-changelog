// source: third_party/jetski/project_pb/project.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$exa$project_pb$MutableEnvironment');
goog.provide('jspb$ro.exa$project_pb$ReadonlyEnvironment');

goog.require('jspb$exa$project_pb$MutableResources');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$exa$project_pb$ImmutableEnvironment');
goog.requireType('jspb$r$exa$project_pb$Environment$internalDoNotUseReader');
goog.requireType('jspb$ro.exa$project_pb$ReadonlyResources');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$exa$project_pb$ImmutableEnvironment>}
 * @implements {jspb$r$exa$project_pb$Environment$internalDoNotUseReader}
 */
jspb$exa$project_pb$MutableEnvironment = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional string id = 1;
   * @override
   * @return {string}
   */
  getId() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 1);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$exa$project_pb$MutableEnvironment} returns this
   */
  setId(value) {
    return jspb_internal_adapters.setProto3StringField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$project_pb$MutableEnvironment} returns this
   */
  clearId() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * optional string name = 2;
   * @override
   * @return {string}
   */
  getName() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 2);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$exa$project_pb$MutableEnvironment} returns this
   */
  setName(value) {
    return jspb_internal_adapters.setProto3StringField(this, 2, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$project_pb$MutableEnvironment} returns this
   */
  clearName() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * optional Resources resources = 3;
   * @override
   * @return {!jspb$exa$project_pb$MutableResources|undefined}
   */
  getResources() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$exa$project_pb$MutableResources, 3);
  }


  /**
   * optional Resources resources = 3;
   * @override
   * @return {!jspb$ro.exa$project_pb$ReadonlyResources}
   */
  getReadonlyResources() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$exa$project_pb$MutableResources, 3);
  }


  /**
   * optional Resources resources = 3;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$exa$project_pb$MutableResources|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$exa$project_pb$MutableResources') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$exa$project_pb$MutableResources|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$exa$project_pb$MutableResources
   */
  getMutableResources(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$exa$project_pb$MutableResources, 3, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.exa$project_pb$ReadonlyResources|null|undefined} value
   * @return {!jspb$exa$project_pb$MutableEnvironment} returns this
   */
  setResources(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$exa$project_pb$MutableResources, 3, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$project_pb$MutableEnvironment} returns this
   */
  clearResources() {
    return jspb_internal_adapters.clearField(this, 3);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasResources() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$exa$project_pb$MutableResources, 3);
  }


  /**
   * optional Resources resources = 3;
   * @override
   * @return {!jspb$ro.exa$project_pb$ReadonlyResources|undefined}
   */
  getResourcesOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$exa$project_pb$MutableResources, 3);
  }


};

/**
 * @override
 * @return {!jspb$exa$project_pb$ImmutableEnvironment}
 */
jspb$exa$project_pb$MutableEnvironment.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$exa$project_pb$MutableEnvironment}
 */
jspb$exa$project_pb$MutableEnvironment.prototype.clone;
/**
 * @const {function(string):!jspb$exa$project_pb$MutableEnvironment}
 */
jspb$exa$project_pb$MutableEnvironment.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$exa$project_pb$MutableEnvironment));

/**
 * Returns whether the given value is an instance of jspb$exa$project_pb$MutableEnvironment.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$exa$project_pb$MutableEnvironment>}
 */
jspb$exa$project_pb$MutableEnvironment.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$exa$project_pb$MutableEnvironment));

/**
 * Object form of Environment as accepted by the `fromObject` method.
 * @typedef {{
 *  id: (?string|undefined),
 *  name: (?string|undefined),
 *  resources: (?jspb$exa$project_pb$MutableResources.ObjectFormat|undefined)
 * }}
 */
jspb$exa$project_pb$MutableEnvironment.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$exa$project_pb$MutableEnvironment.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$exa$project_pb$MutableEnvironment.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$exa$project_pb$MutableEnvironment.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for exa$project_pb$MutableEnvironment.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$exa$project_pb$MutableEnvironment.internalDoNotUse_debugOnlyProtoTypeName = "exa.project_pb.Environment";
}

/**
 * @typedef {!jspb$exa$project_pb$ImmutableEnvironment|!jspb$exa$project_pb$MutableEnvironment}
 */
jspb$ro.exa$project_pb$ReadonlyEnvironment = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'exa.project_pb.Environment'}
   */
  jspb$exa$project_pb$MutableEnvironment.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$exa$project_pb$MutableEnvironment.displayName = 'proto.exa.project_pb.Environment';
}
/**
 * Interface form of Environment as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  id: (string|undefined),
 *  name: (string|undefined),
 *  resources: (!jspb$ro.exa$project_pb$ReadonlyResources|undefined)
 * }}
 */
jspb$exa$project_pb$MutableEnvironment.FieldsInterface;

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
 * @param {!jspb$exa$project_pb$MutableEnvironment.FieldsInterface} record
 * @return {!jspb$exa$project_pb$ImmutableEnvironment}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$exa$project_pb$MutableEnvironment, ಠ_ಠ.clutz.jspb$exa$project_pb$MutableEnvironment.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$exa$project_pb$ImmutableEnvironment
 */
jspb$exa$project_pb$MutableEnvironment.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$exa$project_pb$MutableEnvironment));

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
 * @param {!jspb$ro.exa$project_pb$ReadonlyEnvironment} value
 * @return {!jspb$exa$project_pb$MutableEnvironment.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.exa$project_pb$ReadonlyEnvironment): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$exa$project_pb$MutableEnvironment, ಠ_ಠ.clutz.jspb$exa$project_pb$MutableEnvironment.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$exa$project_pb$MutableEnvironment.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$exa$project_pb$MutableEnvironments;
Object.defineProperty(this, 'jspb$exa$project_pb$MutableEnvironments', {
  get() { return jspb$exa$project_pb$MutableEnvironments; },
  set(v) { jspb$exa$project_pb$MutableEnvironments = v; },
