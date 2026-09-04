// source: third_party/jetski/project_pb/project.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$exa$project_pb$MutableProjectConversations');
goog.provide('jspb$ro.exa$project_pb$ReadonlyProjectConversations');

goog.require('jspb$exa$project_pb$MutableProjectConversation');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$exa$project_pb$ImmutableProjectConversations');
goog.requireType('jspb$r$exa$project_pb$ProjectConversations$internalDoNotUseReader');
goog.requireType('jspb$ro.exa$project_pb$ReadonlyProjectConversation');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$exa$project_pb$ImmutableProjectConversations>}
 * @implements {jspb$r$exa$project_pb$ProjectConversations$internalDoNotUseReader}
 */
jspb$exa$project_pb$MutableProjectConversations = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * repeated ProjectConversation conversations = 1;
   * @param {!jspb_internal_public_for_gencode.DoNotFreezeToken=} freezeOptOut
   * @tsType (freezeOptOut: import('google3/javascript/apps/jspb/internal_public').DoNotFreezeToken): ಠ_ಠ.clutz.jspb$exa$project_pb$MutableProjectConversation[]
   * @tsType (): readonly ಠ_ಠ.clutz.jspb$exa$project_pb$MutableProjectConversation[]
   * @override
   * @return {!ReadonlyArray<!jspb$exa$project_pb$MutableProjectConversation>}
   */
  getConversationsList(freezeOptOut) {
    return jspb_internal_adapters.getRepeatedWrapperField(this, jspb$exa$project_pb$MutableProjectConversation, 1, jspb_internal_adapters.getRepeatedFieldReturnType(freezeOptOut));
  }


  /**
   * repeated ProjectConversation conversations = 1;
   * @override
   * @return {!ReadonlyArray<!jspb$ro.exa$project_pb$ReadonlyProjectConversation>}
   */
  getReadonlyConversationsList() {
    return jspb_internal_adapters.getReadonlyRepeatedWrapperField(this, jspb$exa$project_pb$MutableProjectConversation, 1);
  }


  /**
   * @param {!ReadonlyArray<!jspb$ro.exa$project_pb$ReadonlyProjectConversation>|null|undefined} value
   * @return {!jspb$exa$project_pb$MutableProjectConversations} returns this
   */
  setConversationsList(value) {
    return jspb_internal_adapters.setRepeatedWrapperField(this, jspb$exa$project_pb$MutableProjectConversation, 1, value);
  }


  /**
   * Gets mutable repeated field reference.
   * @param {number} index
   * @return {!jspb$exa$project_pb$MutableProjectConversation}
   */
  getMutableConversations(index) {
    return jspb_internal_adapters.getRepeatedIndexedMutableWrapper(this, 1, jspb$exa$project_pb$MutableProjectConversation, index);
  }


  /**
   * Gets readonly repeated field reference.
   * @override
   * @param {number} index
   * @return {!jspb$ro.exa$project_pb$ReadonlyProjectConversation}
   */
  getReadonlyConversations(index) {
    return jspb_internal_adapters.getRepeatedIndexedReadonlyWrapper(this, 1, jspb$exa$project_pb$MutableProjectConversation, index);
  }


  /**
   * Adds repeated field and returns `this`.
   * @param {!jspb$ro.exa$project_pb$ReadonlyProjectConversation} value
   * @param {number=} index
   * @return {!jspb$exa$project_pb$MutableProjectConversations} returns this
   */
  addConversations(value, index) {
    return jspb_internal_adapters.addToRepeatedWrapperField(this, 1, jspb$exa$project_pb$MutableProjectConversation, value, index);
  }


  /**
   * Adds repeated field and returns newly added submessage.
   * @param {!jspb$exa$project_pb$MutableProjectConversation=} value
   * @param {number=} index
   * @return {!jspb$exa$project_pb$MutableProjectConversation} the value that was added
   */
  addAndReturnConversations(value, index) {
    return jspb_internal_adapters.addAndReturnRepeatedWrapperField(this, 1, jspb$exa$project_pb$MutableProjectConversation, value, index);
  }


  /**
   * Adds multiple values to a repeated field and returns `this`.
   * @param {!Iterable<!jspb$ro.exa$project_pb$ReadonlyProjectConversation>} values
   * @return {!jspb$exa$project_pb$MutableProjectConversations} returns this
   */
  addAllConversations(values) {
    return jspb_internal_adapters.addAllToRepeatedWrapperField(this, 1, jspb$exa$project_pb$MutableProjectConversation, values);
  }


  /**
   * Sets repeated field value at `index` and returns `this`.
   * @param {number} index
   * @param {!jspb$ro.exa$project_pb$ReadonlyProjectConversation} value
   * @return {!jspb$exa$project_pb$MutableProjectConversations} returns this
   */
  setConversations(index, value) {
    return jspb_internal_adapters.setRepeatedIndexedWrapper(this, 1, jspb$exa$project_pb$MutableProjectConversation, index, value);
  }


  /**
   * Removes a value from a repeated field and returns `this`.
   * @param {number=} index defaults to the end
   * @return {!jspb$exa$project_pb$MutableProjectConversations} returns this
   */
  removeConversations(index) {
    return jspb_internal_adapters.removeFromRepeatedWrapperField(this, 1, jspb$exa$project_pb$MutableProjectConversation, index);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$project_pb$MutableProjectConversations} returns this
   */
  clearConversationsList() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * Returns the size of this field.
   * @override
   * @return {number}
   */
  getConversationsCount() {
    return jspb_internal_adapters.getRepeatedWrapperCount(this, jspb$exa$project_pb$MutableProjectConversation, 1);
  }


};

/**
 * @override
 * @return {!jspb$exa$project_pb$ImmutableProjectConversations}
 */
jspb$exa$project_pb$MutableProjectConversations.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$exa$project_pb$MutableProjectConversations}
 */
jspb$exa$project_pb$MutableProjectConversations.prototype.clone;
/**
 * @const {function(string):!jspb$exa$project_pb$MutableProjectConversations}
 */
jspb$exa$project_pb$MutableProjectConversations.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$exa$project_pb$MutableProjectConversations));

/**
 * Returns whether the given value is an instance of jspb$exa$project_pb$MutableProjectConversations.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$exa$project_pb$MutableProjectConversations>}
 */
jspb$exa$project_pb$MutableProjectConversations.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$exa$project_pb$MutableProjectConversations));

/**
 * Object form of ProjectConversations as accepted by the `fromObject` method.
 * @typedef {{
 *  conversationsList: (?Array<!jspb$exa$project_pb$MutableProjectConversation.ObjectFormat>|undefined)
 * }}
 */
jspb$exa$project_pb$MutableProjectConversations.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$exa$project_pb$MutableProjectConversations.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$exa$project_pb$MutableProjectConversations.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$exa$project_pb$MutableProjectConversations.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for exa$project_pb$MutableProjectConversations.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$exa$project_pb$MutableProjectConversations.internalDoNotUse_debugOnlyProtoTypeName = "exa.project_pb.ProjectConversations";
}

/**
 * @typedef {!jspb$exa$project_pb$ImmutableProjectConversations|!jspb$exa$project_pb$MutableProjectConversations}
 */
jspb$ro.exa$project_pb$ReadonlyProjectConversations = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'exa.project_pb.ProjectConversations'}
   */
  jspb$exa$project_pb$MutableProjectConversations.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$exa$project_pb$MutableProjectConversations.displayName = 'proto.exa.project_pb.ProjectConversations';
}
/**
 * Interface form of ProjectConversations as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  conversationsList: (!ReadonlyArray<!jspb$ro.exa$project_pb$ReadonlyProjectConversation>|undefined)
 * }}
 */
jspb$exa$project_pb$MutableProjectConversations.FieldsInterface;

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
 * @param {!jspb$exa$project_pb$MutableProjectConversations.FieldsInterface} record
 * @return {!jspb$exa$project_pb$ImmutableProjectConversations}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$exa$project_pb$MutableProjectConversations, ಠ_ಠ.clutz.jspb$exa$project_pb$MutableProjectConversations.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$exa$project_pb$ImmutableProjectConversations
 */
jspb$exa$project_pb$MutableProjectConversations.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$exa$project_pb$MutableProjectConversations));

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
 * @param {!jspb$ro.exa$project_pb$ReadonlyProjectConversations} value
 * @return {!jspb$exa$project_pb$MutableProjectConversations.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.exa$project_pb$ReadonlyProjectConversations): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$exa$project_pb$MutableProjectConversations, ಠ_ಠ.clutz.jspb$exa$project_pb$MutableProjectConversations.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$exa$project_pb$MutableProjectConversations.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$exa$project_pb$MutableProjectSettings;
Object.defineProperty(this, 'jspb$exa$project_pb$MutableProjectSettings', {
  get() { return jspb$exa$project_pb$MutableProjectSettings; },
  set(v) { jspb$exa$project_pb$MutableProjectSettings = v; },
