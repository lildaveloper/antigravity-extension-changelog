// source: third_party/jetski/jetbox_state_pb/jetbox_state.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$jetbox_state_pb$MutableSeenNuxUids');
goog.provide('jspb$ro.jetbox_state_pb$ReadonlySeenNuxUids');

goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$jetbox_state_pb$ImmutableSeenNuxUids');
goog.requireType('jspb$r$jetbox_state_pb$SeenNuxUids$internalDoNotUseReader');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$jetbox_state_pb$ImmutableSeenNuxUids>}
 * @implements {jspb$r$jetbox_state_pb$SeenNuxUids$internalDoNotUseReader}
 */
jspb$jetbox_state_pb$MutableSeenNuxUids = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * repeated int32 uids = 1;
   * @override
   * @param {!jspb_internal_public_for_gencode.DoNotFreezeToken=} freezeOptOut
   * @tsType (freezeOptOut: import('google3/javascript/apps/jspb/internal_public').DoNotFreezeToken): number[]
   * @tsType (): readonly number[]
   * @return {!ReadonlyArray<number>}
   */
  getUidsList(freezeOptOut) {
    return jspb_internal_adapters.getRepeatedInt32Field(this, 1, jspb_internal_adapters.getRepeatedFieldReturnType(freezeOptOut));
  }


  /**
   * @param {!ReadonlyArray<number>|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableSeenNuxUids} returns this
   */
  setUidsList(value) {
    return jspb_internal_adapters.setRepeatedInt32Field(this, 1, value);
  }


  /**
   * @param {number} value
   * @param {number=} index
   * @return {!jspb$jetbox_state_pb$MutableSeenNuxUids} returns this
   */
  addUids(value, index) {
    return jspb_internal_adapters.addToRepeatedInt32Field(this, 1, value, index);
  }


  /**
   * @param {!Iterable<number>} values
   * @return {!jspb$jetbox_state_pb$MutableSeenNuxUids} returns this
   */
  addAllUids(values) {
    return jspb_internal_adapters.addAllToRepeatedInt32Field(this, 1, values);
  }


  /**
   * @param {number=} index If not passed, defaults to the end.
   * @return {!jspb$jetbox_state_pb$MutableSeenNuxUids} returns this
   */
  removeUids(index) {
    return jspb_internal_adapters.removeFromRepeatedInt32Field(this, 1, index);
  }


  /**
   * Returns value at `index`.
   * @override
   * @param {number} index
   * @return {number}
   */
  getUids(index) {
   return jspb_internal_adapters.getRepeatedIndexedInt32Field(this, 1, index);
  }


  /**
   * @param {number} index
   * @param {number} value
   * @return {!jspb$jetbox_state_pb$MutableSeenNuxUids} returns this
   */
  setUids(index, value) {
    return jspb_internal_adapters.setRepeatedIndexedInt32Field(this, 1, index, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableSeenNuxUids} returns this
   */
  clearUidsList() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * Returns the size of this field.
   * @override
   * @return {number}
   */
  getUidsCount() {
    return jspb_internal_adapters.getRepeatedInt32Count(this, 1);
  }


};

/**
 * @override
 * @return {!jspb$jetbox_state_pb$ImmutableSeenNuxUids}
 */
jspb$jetbox_state_pb$MutableSeenNuxUids.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$jetbox_state_pb$MutableSeenNuxUids}
 */
jspb$jetbox_state_pb$MutableSeenNuxUids.prototype.clone;
/**
 * @const {function(string):!jspb$jetbox_state_pb$MutableSeenNuxUids}
 */
jspb$jetbox_state_pb$MutableSeenNuxUids.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$jetbox_state_pb$MutableSeenNuxUids));

/**
 * Returns whether the given value is an instance of jspb$jetbox_state_pb$MutableSeenNuxUids.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$jetbox_state_pb$MutableSeenNuxUids>}
 */
jspb$jetbox_state_pb$MutableSeenNuxUids.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$jetbox_state_pb$MutableSeenNuxUids));

/**
 * Object form of SeenNuxUids as accepted by the `fromObject` method.
 * @typedef {{
 *  uidsList: (?Array<number>|undefined)
 * }}
 */
jspb$jetbox_state_pb$MutableSeenNuxUids.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$jetbox_state_pb$MutableSeenNuxUids.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$jetbox_state_pb$MutableSeenNuxUids.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$jetbox_state_pb$MutableSeenNuxUids.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for jetbox_state_pb$MutableSeenNuxUids.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$jetbox_state_pb$MutableSeenNuxUids.internalDoNotUse_debugOnlyProtoTypeName = "jetbox_state_pb.SeenNuxUids";
}

/**
 * @typedef {!jspb$jetbox_state_pb$ImmutableSeenNuxUids|!jspb$jetbox_state_pb$MutableSeenNuxUids}
 */
jspb$ro.jetbox_state_pb$ReadonlySeenNuxUids = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'jetbox_state_pb.SeenNuxUids'}
   */
  jspb$jetbox_state_pb$MutableSeenNuxUids.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$jetbox_state_pb$MutableSeenNuxUids.displayName = 'proto.jetbox_state_pb.SeenNuxUids';
}
/**
 * Interface form of SeenNuxUids as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  uidsList: (!ReadonlyArray<number>|undefined)
 * }}
 */
jspb$jetbox_state_pb$MutableSeenNuxUids.FieldsInterface;

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
 * @param {!jspb$jetbox_state_pb$MutableSeenNuxUids.FieldsInterface} record
 * @return {!jspb$jetbox_state_pb$ImmutableSeenNuxUids}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableSeenNuxUids, ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableSeenNuxUids.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$jetbox_state_pb$ImmutableSeenNuxUids
 */
jspb$jetbox_state_pb$MutableSeenNuxUids.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$jetbox_state_pb$MutableSeenNuxUids));

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
 * @param {!jspb$ro.jetbox_state_pb$ReadonlySeenNuxUids} value
 * @return {!jspb$jetbox_state_pb$MutableSeenNuxUids.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.jetbox_state_pb$ReadonlySeenNuxUids): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableSeenNuxUids, ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableSeenNuxUids.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$jetbox_state_pb$MutableSeenNuxUids.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$jetbox_state_pb$MutableSidebarWorkspaceInfo;
Object.defineProperty(this, 'jspb$jetbox_state_pb$MutableSidebarWorkspaceInfo', {
  get() { return jspb$jetbox_state_pb$MutableSidebarWorkspaceInfo; },
  set(v) { jspb$jetbox_state_pb$MutableSidebarWorkspaceInfo = v; },
