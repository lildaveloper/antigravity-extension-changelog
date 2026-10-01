// source: third_party/jetski/project_pb/project.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$exa$project_pb$MutableGoogle3');
goog.provide('jspb$ro.exa$project_pb$ReadonlyGoogle3');

goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$e.exa$project_pb$Google3$ForkType');
goog.requireType('jspb$exa$project_pb$ImmutableGoogle3');
goog.requireType('jspb$r$exa$project_pb$Google3$internalDoNotUseReader');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$exa$project_pb$ImmutableGoogle3>}
 * @implements {jspb$r$exa$project_pb$Google3$internalDoNotUseReader}
 */
jspb$exa$project_pb$MutableGoogle3 = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional ForkType fork_type = 1;
   * @override
   * @return {!jspb$e.exa$project_pb$Google3$ForkType}
   */
  getForkType() {
    return /** @type {!jspb$e.exa$project_pb$Google3$ForkType} */ (jspb_internal_adapters.getEnumFieldWithDefault(this, 1));
  }


  /**
   * @param {!jspb$e.exa$project_pb$Google3$ForkType|null|undefined} value
   * @return {!jspb$exa$project_pb$MutableGoogle3} returns this
   */
  setForkType(value) {
    return jspb_internal_adapters.setProto3EnumField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$project_pb$MutableGoogle3} returns this
   */
  clearForkType() {
    return jspb_internal_adapters.clearField(this, 1);
  }


};

/**
 * @override
 * @return {!jspb$exa$project_pb$ImmutableGoogle3}
 */
jspb$exa$project_pb$MutableGoogle3.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$exa$project_pb$MutableGoogle3}
 */
jspb$exa$project_pb$MutableGoogle3.prototype.clone;
/**
 * @const {function(string):!jspb$exa$project_pb$MutableGoogle3}
 */
jspb$exa$project_pb$MutableGoogle3.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$exa$project_pb$MutableGoogle3));

/**
 * Returns whether the given value is an instance of jspb$exa$project_pb$MutableGoogle3.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$exa$project_pb$MutableGoogle3>}
 */
jspb$exa$project_pb$MutableGoogle3.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$exa$project_pb$MutableGoogle3));

/**
 * Object form of Google3 as accepted by the `fromObject` method.
 * @typedef {{
 *  forkType: (?number|undefined)
 * }}
 */
jspb$exa$project_pb$MutableGoogle3.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$exa$project_pb$MutableGoogle3.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$exa$project_pb$MutableGoogle3.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$exa$project_pb$MutableGoogle3.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for exa$project_pb$MutableGoogle3.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$exa$project_pb$MutableGoogle3.internalDoNotUse_debugOnlyProtoTypeName = "exa.project_pb.Google3";
}

/**
 * @typedef {!jspb$exa$project_pb$ImmutableGoogle3|!jspb$exa$project_pb$MutableGoogle3}
 */
jspb$ro.exa$project_pb$ReadonlyGoogle3 = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'exa.project_pb.Google3'}
   */
  jspb$exa$project_pb$MutableGoogle3.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$exa$project_pb$MutableGoogle3.displayName = 'proto.exa.project_pb.Google3';
}
/**
 * Interface form of Google3 as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  forkType: (!jspb$e.exa$project_pb$Google3$ForkType|undefined)
 * }}
 */
jspb$exa$project_pb$MutableGoogle3.FieldsInterface;

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
 * @param {!jspb$exa$project_pb$MutableGoogle3.FieldsInterface} record
 * @return {!jspb$exa$project_pb$ImmutableGoogle3}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$exa$project_pb$MutableGoogle3, ಠ_ಠ.clutz.jspb$exa$project_pb$MutableGoogle3.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$exa$project_pb$ImmutableGoogle3
 */
jspb$exa$project_pb$MutableGoogle3.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$exa$project_pb$MutableGoogle3));

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
 * @param {!jspb$ro.exa$project_pb$ReadonlyGoogle3} value
 * @return {!jspb$exa$project_pb$MutableGoogle3.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.exa$project_pb$ReadonlyGoogle3): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$exa$project_pb$MutableGoogle3, ಠ_ಠ.clutz.jspb$exa$project_pb$MutableGoogle3.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$exa$project_pb$MutableGoogle3.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$exa$project_pb$MutableResource;
Object.defineProperty(this, 'jspb$exa$project_pb$MutableResource', {
  get() { return jspb$exa$project_pb$MutableResource; },
  set(v) { jspb$exa$project_pb$MutableResource = v; },
