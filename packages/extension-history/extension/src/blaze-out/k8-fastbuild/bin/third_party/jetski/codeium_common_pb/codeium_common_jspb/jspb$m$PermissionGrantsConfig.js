// source: third_party/jetski/codeium_common_pb/codeium_common.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig');
goog.provide('jspb$ro.exa$codeium_common_pb$ReadonlyPermissionGrantsConfig');

goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$exa$codeium_common_pb$ImmutablePermissionGrantsConfig');
goog.requireType('jspb$r$exa$codeium_common_pb$PermissionGrantsConfig$internalDoNotUseReader');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$exa$codeium_common_pb$ImmutablePermissionGrantsConfig>}
 * @implements {jspb$r$exa$codeium_common_pb$PermissionGrantsConfig$internalDoNotUseReader}
 */
jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * repeated string allow = 1;
   * @override
   * @param {!jspb_internal_public_for_gencode.DoNotFreezeToken=} freezeOptOut
   * @tsType (freezeOptOut: import('google3/javascript/apps/jspb/internal_public').DoNotFreezeToken): string[]
   * @tsType (): readonly string[]
   * @return {!ReadonlyArray<string>}
   */
  getAllowList(freezeOptOut) {
    return jspb_internal_adapters.getRepeatedStringField(this, 1, jspb_internal_adapters.getRepeatedFieldReturnType(freezeOptOut));
  }


  /**
   * @param {!ReadonlyArray<string>|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig} returns this
   */
  setAllowList(value) {
    return jspb_internal_adapters.setRepeatedStringField(this, 1, value);
  }


  /**
   * @param {string} value
   * @param {number=} index
   * @return {!jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig} returns this
   */
  addAllow(value, index) {
    return jspb_internal_adapters.addToRepeatedStringField(this, 1, value, index);
  }


  /**
   * @param {!Iterable<string>} values
   * @return {!jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig} returns this
   */
  addAllAllow(values) {
    return jspb_internal_adapters.addAllToRepeatedStringField(this, 1, values);
  }


  /**
   * @param {number=} index If not passed, defaults to the end.
   * @return {!jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig} returns this
   */
  removeAllow(index) {
    return jspb_internal_adapters.removeFromRepeatedStringField(this, 1, index);
  }


  /**
   * Returns value at `index`.
   * @override
   * @param {number} index
   * @return {string}
   */
  getAllow(index) {
   return jspb_internal_adapters.getRepeatedIndexedStringField(this, 1, index);
  }


  /**
   * @param {number} index
   * @param {string} value
   * @return {!jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig} returns this
   */
  setAllow(index, value) {
    return jspb_internal_adapters.setRepeatedIndexedStringField(this, 1, index, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig} returns this
   */
  clearAllowList() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * Returns the size of this field.
   * @override
   * @return {number}
   */
  getAllowCount() {
    return jspb_internal_adapters.getRepeatedStringCount(this, 1);
  }


  /**
   * repeated string deny = 2;
   * @override
   * @param {!jspb_internal_public_for_gencode.DoNotFreezeToken=} freezeOptOut
   * @tsType (freezeOptOut: import('google3/javascript/apps/jspb/internal_public').DoNotFreezeToken): string[]
   * @tsType (): readonly string[]
   * @return {!ReadonlyArray<string>}
   */
  getDenyList(freezeOptOut) {
    return jspb_internal_adapters.getRepeatedStringField(this, 2, jspb_internal_adapters.getRepeatedFieldReturnType(freezeOptOut));
  }


  /**
   * @param {!ReadonlyArray<string>|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig} returns this
   */
  setDenyList(value) {
    return jspb_internal_adapters.setRepeatedStringField(this, 2, value);
  }


  /**
   * @param {string} value
   * @param {number=} index
   * @return {!jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig} returns this
   */
  addDeny(value, index) {
    return jspb_internal_adapters.addToRepeatedStringField(this, 2, value, index);
  }


  /**
   * @param {!Iterable<string>} values
   * @return {!jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig} returns this
   */
  addAllDeny(values) {
    return jspb_internal_adapters.addAllToRepeatedStringField(this, 2, values);
  }


  /**
   * @param {number=} index If not passed, defaults to the end.
   * @return {!jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig} returns this
   */
  removeDeny(index) {
    return jspb_internal_adapters.removeFromRepeatedStringField(this, 2, index);
  }


  /**
   * Returns value at `index`.
   * @override
   * @param {number} index
   * @return {string}
   */
  getDeny(index) {
   return jspb_internal_adapters.getRepeatedIndexedStringField(this, 2, index);
  }


  /**
   * @param {number} index
   * @param {string} value
   * @return {!jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig} returns this
   */
  setDeny(index, value) {
    return jspb_internal_adapters.setRepeatedIndexedStringField(this, 2, index, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig} returns this
   */
  clearDenyList() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * Returns the size of this field.
   * @override
   * @return {number}
   */
  getDenyCount() {
    return jspb_internal_adapters.getRepeatedStringCount(this, 2);
  }


  /**
   * repeated string ask = 3;
   * @override
   * @param {!jspb_internal_public_for_gencode.DoNotFreezeToken=} freezeOptOut
   * @tsType (freezeOptOut: import('google3/javascript/apps/jspb/internal_public').DoNotFreezeToken): string[]
   * @tsType (): readonly string[]
   * @return {!ReadonlyArray<string>}
   */
  getAskList(freezeOptOut) {
    return jspb_internal_adapters.getRepeatedStringField(this, 3, jspb_internal_adapters.getRepeatedFieldReturnType(freezeOptOut));
  }


  /**
   * @param {!ReadonlyArray<string>|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig} returns this
   */
  setAskList(value) {
    return jspb_internal_adapters.setRepeatedStringField(this, 3, value);
  }


  /**
   * @param {string} value
   * @param {number=} index
   * @return {!jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig} returns this
   */
  addAsk(value, index) {
    return jspb_internal_adapters.addToRepeatedStringField(this, 3, value, index);
  }


  /**
   * @param {!Iterable<string>} values
   * @return {!jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig} returns this
   */
  addAllAsk(values) {
    return jspb_internal_adapters.addAllToRepeatedStringField(this, 3, values);
  }


  /**
   * @param {number=} index If not passed, defaults to the end.
   * @return {!jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig} returns this
   */
  removeAsk(index) {
    return jspb_internal_adapters.removeFromRepeatedStringField(this, 3, index);
  }


  /**
   * Returns value at `index`.
   * @override
   * @param {number} index
   * @return {string}
   */
  getAsk(index) {
   return jspb_internal_adapters.getRepeatedIndexedStringField(this, 3, index);
  }


  /**
   * @param {number} index
   * @param {string} value
   * @return {!jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig} returns this
   */
  setAsk(index, value) {
    return jspb_internal_adapters.setRepeatedIndexedStringField(this, 3, index, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig} returns this
   */
  clearAskList() {
    return jspb_internal_adapters.clearField(this, 3);
  }


  /**
   * Returns the size of this field.
   * @override
   * @return {number}
   */
  getAskCount() {
    return jspb_internal_adapters.getRepeatedStringCount(this, 3);
  }


};

/**
 * @override
 * @return {!jspb$exa$codeium_common_pb$ImmutablePermissionGrantsConfig}
 */
jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig}
 */
jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig.prototype.clone;
/**
 * @const {function(string):!jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig}
 */
jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig));

/**
 * Returns whether the given value is an instance of jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig>}
 */
jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig));

/**
 * Object form of PermissionGrantsConfig as accepted by the `fromObject` method.
 * @typedef {{
 *  allowList: (?Array<string>|undefined),
 *  denyList: (?Array<string>|undefined),
 *  askList: (?Array<string>|undefined)
 * }}
 */
jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for exa$codeium_common_pb$MutablePermissionGrantsConfig.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig.internalDoNotUse_debugOnlyProtoTypeName = "exa.codeium_common_pb.PermissionGrantsConfig";
}

/**
 * @typedef {!jspb$exa$codeium_common_pb$ImmutablePermissionGrantsConfig|!jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig}
 */
jspb$ro.exa$codeium_common_pb$ReadonlyPermissionGrantsConfig = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'exa.codeium_common_pb.PermissionGrantsConfig'}
   */
  jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig.displayName = 'proto.exa.codeium_common_pb.PermissionGrantsConfig';
}
/**
 * Interface form of PermissionGrantsConfig as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  allowList: (!ReadonlyArray<string>|undefined),
 *  denyList: (!ReadonlyArray<string>|undefined),
 *  askList: (!ReadonlyArray<string>|undefined)
 * }}
 */
jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig.FieldsInterface;

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
 * @param {!jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig.FieldsInterface} record
 * @return {!jspb$exa$codeium_common_pb$ImmutablePermissionGrantsConfig}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig, ಠ_ಠ.clutz.jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$exa$codeium_common_pb$ImmutablePermissionGrantsConfig
 */
jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig));

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
 * @param {!jspb$ro.exa$codeium_common_pb$ReadonlyPermissionGrantsConfig} value
 * @return {!jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.exa$codeium_common_pb$ReadonlyPermissionGrantsConfig): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig, ಠ_ಠ.clutz.jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$exa$codeium_common_pb$MutablePermissionGrantsConfig.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$jetbox_state_pb$MutableCustomThemeSeeds;
Object.defineProperty(this, 'jspb$jetbox_state_pb$MutableCustomThemeSeeds', {
  get() { return jspb$jetbox_state_pb$MutableCustomThemeSeeds; },
  set(v) { jspb$jetbox_state_pb$MutableCustomThemeSeeds = v; },
