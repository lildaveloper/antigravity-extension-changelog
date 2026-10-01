// source: devtools/jetski/boq/provisioning_service/proto/deployment_config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$devtools_jetski_provisioning$MutableCustomizationConfig');
goog.provide('jspb$ro.devtools_jetski_provisioning$ReadonlyCustomizationConfig');

goog.require('jspb$devtools_jetski_provisioning$MutablePathEntry');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$devtools_jetski_provisioning$ImmutableCustomizationConfig');
goog.requireType('jspb$r$devtools_jetski_provisioning$CustomizationConfig$internalDoNotUseReader');
goog.requireType('jspb$ro.devtools_jetski_provisioning$ReadonlyPathEntry');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$devtools_jetski_provisioning$ImmutableCustomizationConfig>}
 * @implements {jspb$r$devtools_jetski_provisioning$CustomizationConfig$internalDoNotUseReader}
 */
jspb$devtools_jetski_provisioning$MutableCustomizationConfig = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * repeated PathEntry inherits = 1;
   * @param {!jspb_internal_public_for_gencode.DoNotFreezeToken=} freezeOptOut
   * @tsType (freezeOptOut: import('google3/javascript/apps/jspb/internal_public').DoNotFreezeToken): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutablePathEntry[]
   * @tsType (): readonly ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutablePathEntry[]
   * @override
   * @return {!ReadonlyArray<!jspb$devtools_jetski_provisioning$MutablePathEntry>}
   */
  getInheritsList(freezeOptOut) {
    return jspb_internal_adapters.getRepeatedWrapperField(this, jspb$devtools_jetski_provisioning$MutablePathEntry, 1, jspb_internal_adapters.getRepeatedFieldReturnType(freezeOptOut));
  }


  /**
   * repeated PathEntry inherits = 1;
   * @override
   * @return {!ReadonlyArray<!jspb$ro.devtools_jetski_provisioning$ReadonlyPathEntry>}
   */
  getReadonlyInheritsList() {
    return jspb_internal_adapters.getReadonlyRepeatedWrapperField(this, jspb$devtools_jetski_provisioning$MutablePathEntry, 1);
  }


  /**
   * @param {!ReadonlyArray<!jspb$ro.devtools_jetski_provisioning$ReadonlyPathEntry>|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableCustomizationConfig} returns this
   */
  setInheritsList(value) {
    return jspb_internal_adapters.setRepeatedWrapperField(this, jspb$devtools_jetski_provisioning$MutablePathEntry, 1, value);
  }


  /**
   * Gets mutable repeated field reference.
   * @param {number} index
   * @return {!jspb$devtools_jetski_provisioning$MutablePathEntry}
   */
  getMutableInherits(index) {
    return jspb_internal_adapters.getRepeatedIndexedMutableWrapper(this, 1, jspb$devtools_jetski_provisioning$MutablePathEntry, index);
  }


  /**
   * Gets readonly repeated field reference.
   * @override
   * @param {number} index
   * @return {!jspb$ro.devtools_jetski_provisioning$ReadonlyPathEntry}
   */
  getReadonlyInherits(index) {
    return jspb_internal_adapters.getRepeatedIndexedReadonlyWrapper(this, 1, jspb$devtools_jetski_provisioning$MutablePathEntry, index);
  }


  /**
   * Adds repeated field and returns `this`.
   * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyPathEntry} value
   * @param {number=} index
   * @return {!jspb$devtools_jetski_provisioning$MutableCustomizationConfig} returns this
   */
  addInherits(value, index) {
    return jspb_internal_adapters.addToRepeatedWrapperField(this, 1, jspb$devtools_jetski_provisioning$MutablePathEntry, value, index);
  }


  /**
   * Adds repeated field and returns newly added submessage.
   * @param {!jspb$devtools_jetski_provisioning$MutablePathEntry=} value
   * @param {number=} index
   * @return {!jspb$devtools_jetski_provisioning$MutablePathEntry} the value that was added
   */
  addAndReturnInherits(value, index) {
    return jspb_internal_adapters.addAndReturnRepeatedWrapperField(this, 1, jspb$devtools_jetski_provisioning$MutablePathEntry, value, index);
  }


  /**
   * Adds multiple values to a repeated field and returns `this`.
   * @param {!Iterable<!jspb$ro.devtools_jetski_provisioning$ReadonlyPathEntry>} values
   * @return {!jspb$devtools_jetski_provisioning$MutableCustomizationConfig} returns this
   */
  addAllInherits(values) {
    return jspb_internal_adapters.addAllToRepeatedWrapperField(this, 1, jspb$devtools_jetski_provisioning$MutablePathEntry, values);
  }


  /**
   * Sets repeated field value at `index` and returns `this`.
   * @param {number} index
   * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyPathEntry} value
   * @return {!jspb$devtools_jetski_provisioning$MutableCustomizationConfig} returns this
   */
  setInherits(index, value) {
    return jspb_internal_adapters.setRepeatedIndexedWrapper(this, 1, jspb$devtools_jetski_provisioning$MutablePathEntry, index, value);
  }


  /**
   * Removes a value from a repeated field and returns `this`.
   * @param {number=} index defaults to the end
   * @return {!jspb$devtools_jetski_provisioning$MutableCustomizationConfig} returns this
   */
  removeInherits(index) {
    return jspb_internal_adapters.removeFromRepeatedWrapperField(this, 1, jspb$devtools_jetski_provisioning$MutablePathEntry, index);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableCustomizationConfig} returns this
   */
  clearInheritsList() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * Returns the size of this field.
   * @override
   * @return {number}
   */
  getInheritsCount() {
    return jspb_internal_adapters.getRepeatedWrapperCount(this, jspb$devtools_jetski_provisioning$MutablePathEntry, 1);
  }


  /**
   * repeated PathEntry entries = 2;
   * @param {!jspb_internal_public_for_gencode.DoNotFreezeToken=} freezeOptOut
   * @tsType (freezeOptOut: import('google3/javascript/apps/jspb/internal_public').DoNotFreezeToken): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutablePathEntry[]
   * @tsType (): readonly ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutablePathEntry[]
   * @override
   * @return {!ReadonlyArray<!jspb$devtools_jetski_provisioning$MutablePathEntry>}
   */
  getEntriesList(freezeOptOut) {
    return jspb_internal_adapters.getRepeatedWrapperField(this, jspb$devtools_jetski_provisioning$MutablePathEntry, 2, jspb_internal_adapters.getRepeatedFieldReturnType(freezeOptOut));
  }


  /**
   * repeated PathEntry entries = 2;
   * @override
   * @return {!ReadonlyArray<!jspb$ro.devtools_jetski_provisioning$ReadonlyPathEntry>}
   */
  getReadonlyEntriesList() {
    return jspb_internal_adapters.getReadonlyRepeatedWrapperField(this, jspb$devtools_jetski_provisioning$MutablePathEntry, 2);
  }


  /**
   * @param {!ReadonlyArray<!jspb$ro.devtools_jetski_provisioning$ReadonlyPathEntry>|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableCustomizationConfig} returns this
   */
  setEntriesList(value) {
    return jspb_internal_adapters.setRepeatedWrapperField(this, jspb$devtools_jetski_provisioning$MutablePathEntry, 2, value);
  }


  /**
   * Gets mutable repeated field reference.
   * @param {number} index
   * @return {!jspb$devtools_jetski_provisioning$MutablePathEntry}
   */
  getMutableEntries(index) {
    return jspb_internal_adapters.getRepeatedIndexedMutableWrapper(this, 2, jspb$devtools_jetski_provisioning$MutablePathEntry, index);
  }


  /**
   * Gets readonly repeated field reference.
   * @override
   * @param {number} index
   * @return {!jspb$ro.devtools_jetski_provisioning$ReadonlyPathEntry}
   */
  getReadonlyEntries(index) {
    return jspb_internal_adapters.getRepeatedIndexedReadonlyWrapper(this, 2, jspb$devtools_jetski_provisioning$MutablePathEntry, index);
  }


  /**
   * Adds repeated field and returns `this`.
   * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyPathEntry} value
   * @param {number=} index
   * @return {!jspb$devtools_jetski_provisioning$MutableCustomizationConfig} returns this
   */
  addEntries(value, index) {
    return jspb_internal_adapters.addToRepeatedWrapperField(this, 2, jspb$devtools_jetski_provisioning$MutablePathEntry, value, index);
  }


  /**
   * Adds repeated field and returns newly added submessage.
   * @param {!jspb$devtools_jetski_provisioning$MutablePathEntry=} value
   * @param {number=} index
   * @return {!jspb$devtools_jetski_provisioning$MutablePathEntry} the value that was added
   */
  addAndReturnEntries(value, index) {
    return jspb_internal_adapters.addAndReturnRepeatedWrapperField(this, 2, jspb$devtools_jetski_provisioning$MutablePathEntry, value, index);
  }


  /**
   * Adds multiple values to a repeated field and returns `this`.
   * @param {!Iterable<!jspb$ro.devtools_jetski_provisioning$ReadonlyPathEntry>} values
   * @return {!jspb$devtools_jetski_provisioning$MutableCustomizationConfig} returns this
   */
  addAllEntries(values) {
    return jspb_internal_adapters.addAllToRepeatedWrapperField(this, 2, jspb$devtools_jetski_provisioning$MutablePathEntry, values);
  }


  /**
   * Sets repeated field value at `index` and returns `this`.
   * @param {number} index
   * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyPathEntry} value
   * @return {!jspb$devtools_jetski_provisioning$MutableCustomizationConfig} returns this
   */
  setEntries(index, value) {
    return jspb_internal_adapters.setRepeatedIndexedWrapper(this, 2, jspb$devtools_jetski_provisioning$MutablePathEntry, index, value);
  }


  /**
   * Removes a value from a repeated field and returns `this`.
   * @param {number=} index defaults to the end
   * @return {!jspb$devtools_jetski_provisioning$MutableCustomizationConfig} returns this
   */
  removeEntries(index) {
    return jspb_internal_adapters.removeFromRepeatedWrapperField(this, 2, jspb$devtools_jetski_provisioning$MutablePathEntry, index);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableCustomizationConfig} returns this
   */
  clearEntriesList() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * Returns the size of this field.
   * @override
   * @return {number}
   */
  getEntriesCount() {
    return jspb_internal_adapters.getRepeatedWrapperCount(this, jspb$devtools_jetski_provisioning$MutablePathEntry, 2);
  }


};

/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$ImmutableCustomizationConfig}
 */
jspb$devtools_jetski_provisioning$MutableCustomizationConfig.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$MutableCustomizationConfig}
 */
jspb$devtools_jetski_provisioning$MutableCustomizationConfig.prototype.clone;
/**
 * @const {function(string):!jspb$devtools_jetski_provisioning$MutableCustomizationConfig}
 */
jspb$devtools_jetski_provisioning$MutableCustomizationConfig.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$devtools_jetski_provisioning$MutableCustomizationConfig));

/**
 * Returns whether the given value is an instance of jspb$devtools_jetski_provisioning$MutableCustomizationConfig.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$devtools_jetski_provisioning$MutableCustomizationConfig>}
 */
jspb$devtools_jetski_provisioning$MutableCustomizationConfig.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$devtools_jetski_provisioning$MutableCustomizationConfig));

/**
 * Object form of CustomizationConfig as accepted by the `fromObject` method.
 * @typedef {{
 *  inheritsList: (?Array<!jspb$devtools_jetski_provisioning$MutablePathEntry.ObjectFormat>|undefined),
 *  entriesList: (?Array<!jspb$devtools_jetski_provisioning$MutablePathEntry.ObjectFormat>|undefined)
 * }}
 */
jspb$devtools_jetski_provisioning$MutableCustomizationConfig.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$devtools_jetski_provisioning$MutableCustomizationConfig.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$devtools_jetski_provisioning$MutableCustomizationConfig.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$devtools_jetski_provisioning$MutableCustomizationConfig.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for devtools_jetski_provisioning$MutableCustomizationConfig.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$devtools_jetski_provisioning$MutableCustomizationConfig.internalDoNotUse_debugOnlyProtoTypeName = "devtools_jetski_provisioning.CustomizationConfig";
}

/**
 * @typedef {!jspb$devtools_jetski_provisioning$ImmutableCustomizationConfig|!jspb$devtools_jetski_provisioning$MutableCustomizationConfig}
 */
jspb$ro.devtools_jetski_provisioning$ReadonlyCustomizationConfig = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'devtools_jetski_provisioning.CustomizationConfig'}
   */
  jspb$devtools_jetski_provisioning$MutableCustomizationConfig.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$devtools_jetski_provisioning$MutableCustomizationConfig.displayName = 'proto.devtools_jetski_provisioning.CustomizationConfig';
}
/**
 * Interface form of CustomizationConfig as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  inheritsList: (!ReadonlyArray<!jspb$ro.devtools_jetski_provisioning$ReadonlyPathEntry>|undefined),
 *  entriesList: (!ReadonlyArray<!jspb$ro.devtools_jetski_provisioning$ReadonlyPathEntry>|undefined)
 * }}
 */
jspb$devtools_jetski_provisioning$MutableCustomizationConfig.FieldsInterface;

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
 * @param {!jspb$devtools_jetski_provisioning$MutableCustomizationConfig.FieldsInterface} record
 * @return {!jspb$devtools_jetski_provisioning$ImmutableCustomizationConfig}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableCustomizationConfig, ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableCustomizationConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$ImmutableCustomizationConfig
 */
jspb$devtools_jetski_provisioning$MutableCustomizationConfig.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$devtools_jetski_provisioning$MutableCustomizationConfig));

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
 * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyCustomizationConfig} value
 * @return {!jspb$devtools_jetski_provisioning$MutableCustomizationConfig.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.devtools_jetski_provisioning$ReadonlyCustomizationConfig): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableCustomizationConfig, ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableCustomizationConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$devtools_jetski_provisioning$MutableCustomizationConfig.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$b$devtools_jetski_provisioning$CustomizationConfig;
Object.defineProperty(this, 'jspb$b$devtools_jetski_provisioning$CustomizationConfig', {
  get() { return jspb$b$devtools_jetski_provisioning$CustomizationConfig; },
  set(v) { jspb$b$devtools_jetski_provisioning$CustomizationConfig = v; },
