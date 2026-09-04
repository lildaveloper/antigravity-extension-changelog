// source: third_party/jetski/project_pb/project.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$exa$project_pb$MutableProjectConversation');
goog.provide('jspb$ro.exa$project_pb$ReadonlyProjectConversation');

goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$exa$project_pb$ImmutableProjectConversation');
goog.requireType('jspb$r$exa$project_pb$ProjectConversation$internalDoNotUseReader');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$exa$project_pb$ImmutableProjectConversation>}
 * @implements {jspb$r$exa$project_pb$ProjectConversation$internalDoNotUseReader}
 */
jspb$exa$project_pb$MutableProjectConversation = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional string conversation_id = 1;
   * @override
   * @return {string}
   */
  getConversationId() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 1);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$exa$project_pb$MutableProjectConversation} returns this
   */
  setConversationId(value) {
    return jspb_internal_adapters.setProto3StringField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$project_pb$MutableProjectConversation} returns this
   */
  clearConversationId() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * optional string environment_id = 2;
   * @override
   * @return {string}
   */
  getEnvironmentId() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 2);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$exa$project_pb$MutableProjectConversation} returns this
   */
  setEnvironmentId(value) {
    return jspb_internal_adapters.setProto3StringField(this, 2, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$project_pb$MutableProjectConversation} returns this
   */
  clearEnvironmentId() {
    return jspb_internal_adapters.clearField(this, 2);
  }


};

/**
 * @override
 * @return {!jspb$exa$project_pb$ImmutableProjectConversation}
 */
jspb$exa$project_pb$MutableProjectConversation.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$exa$project_pb$MutableProjectConversation}
 */
jspb$exa$project_pb$MutableProjectConversation.prototype.clone;
/**
 * @const {function(string):!jspb$exa$project_pb$MutableProjectConversation}
 */
jspb$exa$project_pb$MutableProjectConversation.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$exa$project_pb$MutableProjectConversation));

/**
 * Returns whether the given value is an instance of jspb$exa$project_pb$MutableProjectConversation.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$exa$project_pb$MutableProjectConversation>}
 */
jspb$exa$project_pb$MutableProjectConversation.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$exa$project_pb$MutableProjectConversation));

/**
 * Object form of ProjectConversation as accepted by the `fromObject` method.
 * @typedef {{
 *  conversationId: (?string|undefined),
 *  environmentId: (?string|undefined)
 * }}
 */
jspb$exa$project_pb$MutableProjectConversation.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$exa$project_pb$MutableProjectConversation.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$exa$project_pb$MutableProjectConversation.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$exa$project_pb$MutableProjectConversation.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for exa$project_pb$MutableProjectConversation.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$exa$project_pb$MutableProjectConversation.internalDoNotUse_debugOnlyProtoTypeName = "exa.project_pb.ProjectConversation";
}

/**
 * @typedef {!jspb$exa$project_pb$ImmutableProjectConversation|!jspb$exa$project_pb$MutableProjectConversation}
 */
jspb$ro.exa$project_pb$ReadonlyProjectConversation = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'exa.project_pb.ProjectConversation'}
   */
  jspb$exa$project_pb$MutableProjectConversation.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$exa$project_pb$MutableProjectConversation.displayName = 'proto.exa.project_pb.ProjectConversation';
}
/**
 * Interface form of ProjectConversation as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  conversationId: (string|undefined),
 *  environmentId: (string|undefined)
 * }}
 */
jspb$exa$project_pb$MutableProjectConversation.FieldsInterface;

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
 * @param {!jspb$exa$project_pb$MutableProjectConversation.FieldsInterface} record
 * @return {!jspb$exa$project_pb$ImmutableProjectConversation}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$exa$project_pb$MutableProjectConversation, ಠ_ಠ.clutz.jspb$exa$project_pb$MutableProjectConversation.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$exa$project_pb$ImmutableProjectConversation
 */
jspb$exa$project_pb$MutableProjectConversation.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$exa$project_pb$MutableProjectConversation));

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
 * @param {!jspb$ro.exa$project_pb$ReadonlyProjectConversation} value
 * @return {!jspb$exa$project_pb$MutableProjectConversation.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.exa$project_pb$ReadonlyProjectConversation): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$exa$project_pb$MutableProjectConversation, ಠ_ಠ.clutz.jspb$exa$project_pb$MutableProjectConversation.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$exa$project_pb$MutableProjectConversation.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$exa$project_pb$MutableProjectConversations;
Object.defineProperty(this, 'jspb$exa$project_pb$MutableProjectConversations', {
  get() { return jspb$exa$project_pb$MutableProjectConversations; },
  set(v) { jspb$exa$project_pb$MutableProjectConversations = v; },
