// source: devtools/jetski/boq/provisioning_service/proto/deployment_config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$devtools_jetski_provisioning$MutablePathEntry');
goog.provide('jspb$ro.devtools_jetski_provisioning$ReadonlyPathEntry');

goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$devtools_jetski_provisioning$ImmutablePathEntry');
goog.requireType('jspb$r$devtools_jetski_provisioning$PathEntry$internalDoNotUseReader');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$devtools_jetski_provisioning$ImmutablePathEntry>}
 * @implements {jspb$r$devtools_jetski_provisioning$PathEntry$internalDoNotUseReader}
 */
jspb$devtools_jetski_provisioning$MutablePathEntry = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional string path = 1;
   * @override
   * @return {string}
   */
  getPath() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 1);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutablePathEntry} returns this
   */
  setPath(value) {
    return jspb_internal_adapters.setStringField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutablePathEntry} returns this
   */
  clearPath() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasPath() {
    return jspb_internal_adapters.hasStringField(this, 1);
  }


  /**
   * optional string path = 1;
   * @override
   * @return {string|undefined}
   */
  getPathOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 1);
  }


  /**
   * repeated string include_only = 2;
   * @override
   * @param {!jspb_internal_public_for_gencode.DoNotFreezeToken=} freezeOptOut
   * @tsType (freezeOptOut: import('google3/javascript/apps/jspb/internal_public').DoNotFreezeToken): string[]
   * @tsType (): readonly string[]
   * @return {!ReadonlyArray<string>}
   */
  getIncludeOnlyList(freezeOptOut) {
    return jspb_internal_adapters.getRepeatedStringField(this, 2, jspb_internal_adapters.getRepeatedFieldReturnType(freezeOptOut));
  }


  /**
   * @param {!ReadonlyArray<string>|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutablePathEntry} returns this
   */
  setIncludeOnlyList(value) {
    return jspb_internal_adapters.setRepeatedStringField(this, 2, value);
  }


  /**
   * @param {string} value
   * @param {number=} index
   * @return {!jspb$devtools_jetski_provisioning$MutablePathEntry} returns this
   */
  addIncludeOnly(value, index) {
    return jspb_internal_adapters.addToRepeatedStringField(this, 2, value, index);
  }


  /**
   * @param {!Iterable<string>} values
   * @return {!jspb$devtools_jetski_provisioning$MutablePathEntry} returns this
   */
  addAllIncludeOnly(values) {
    return jspb_internal_adapters.addAllToRepeatedStringField(this, 2, values);
  }


  /**
   * @param {number=} index If not passed, defaults to the end.
   * @return {!jspb$devtools_jetski_provisioning$MutablePathEntry} returns this
   */
  removeIncludeOnly(index) {
    return jspb_internal_adapters.removeFromRepeatedStringField(this, 2, index);
  }


  /**
   * Returns value at `index`.
   * @override
   * @param {number} index
   * @return {string}
   */
  getIncludeOnly(index) {
   return jspb_internal_adapters.getRepeatedIndexedStringField(this, 2, index);
  }


  /**
   * @param {number} index
   * @param {string} value
   * @return {!jspb$devtools_jetski_provisioning$MutablePathEntry} returns this
   */
  setIncludeOnly(index, value) {
    return jspb_internal_adapters.setRepeatedIndexedStringField(this, 2, index, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutablePathEntry} returns this
   */
  clearIncludeOnlyList() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * Returns the size of this field.
   * @override
   * @return {number}
   */
  getIncludeOnlyCount() {
    return jspb_internal_adapters.getRepeatedStringCount(this, 2);
  }


  /**
   * repeated string exclude = 3;
   * @override
   * @param {!jspb_internal_public_for_gencode.DoNotFreezeToken=} freezeOptOut
   * @tsType (freezeOptOut: import('google3/javascript/apps/jspb/internal_public').DoNotFreezeToken): string[]
   * @tsType (): readonly string[]
   * @return {!ReadonlyArray<string>}
   */
  getExcludeList(freezeOptOut) {
    return jspb_internal_adapters.getRepeatedStringField(this, 3, jspb_internal_adapters.getRepeatedFieldReturnType(freezeOptOut));
  }


  /**
   * @param {!ReadonlyArray<string>|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutablePathEntry} returns this
   */
  setExcludeList(value) {
    return jspb_internal_adapters.setRepeatedStringField(this, 3, value);
  }


  /**
   * @param {string} value
   * @param {number=} index
   * @return {!jspb$devtools_jetski_provisioning$MutablePathEntry} returns this
   */
  addExclude(value, index) {
    return jspb_internal_adapters.addToRepeatedStringField(this, 3, value, index);
  }


  /**
   * @param {!Iterable<string>} values
   * @return {!jspb$devtools_jetski_provisioning$MutablePathEntry} returns this
   */
  addAllExclude(values) {
    return jspb_internal_adapters.addAllToRepeatedStringField(this, 3, values);
  }


  /**
   * @param {number=} index If not passed, defaults to the end.
   * @return {!jspb$devtools_jetski_provisioning$MutablePathEntry} returns this
   */
  removeExclude(index) {
    return jspb_internal_adapters.removeFromRepeatedStringField(this, 3, index);
  }


  /**
   * Returns value at `index`.
   * @override
   * @param {number} index
   * @return {string}
   */
  getExclude(index) {
   return jspb_internal_adapters.getRepeatedIndexedStringField(this, 3, index);
  }


  /**
   * @param {number} index
   * @param {string} value
   * @return {!jspb$devtools_jetski_provisioning$MutablePathEntry} returns this
   */
  setExclude(index, value) {
    return jspb_internal_adapters.setRepeatedIndexedStringField(this, 3, index, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutablePathEntry} returns this
   */
  clearExcludeList() {
    return jspb_internal_adapters.clearField(this, 3);
  }


  /**
   * Returns the size of this field.
   * @override
   * @return {number}
   */
  getExcludeCount() {
    return jspb_internal_adapters.getRepeatedStringCount(this, 3);
  }


};

/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$ImmutablePathEntry}
 */
jspb$devtools_jetski_provisioning$MutablePathEntry.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$MutablePathEntry}
 */
jspb$devtools_jetski_provisioning$MutablePathEntry.prototype.clone;
/**
 * @const {function(string):!jspb$devtools_jetski_provisioning$MutablePathEntry}
 */
jspb$devtools_jetski_provisioning$MutablePathEntry.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$devtools_jetski_provisioning$MutablePathEntry));

/**
 * Returns whether the given value is an instance of jspb$devtools_jetski_provisioning$MutablePathEntry.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$devtools_jetski_provisioning$MutablePathEntry>}
 */
jspb$devtools_jetski_provisioning$MutablePathEntry.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$devtools_jetski_provisioning$MutablePathEntry));

/**
 * Object form of PathEntry as accepted by the `fromObject` method.
 * @typedef {{
 *  path: (?string|undefined),
 *  includeOnlyList: (?Array<string>|undefined),
 *  excludeList: (?Array<string>|undefined)
 * }}
 */
jspb$devtools_jetski_provisioning$MutablePathEntry.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$devtools_jetski_provisioning$MutablePathEntry.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$devtools_jetski_provisioning$MutablePathEntry.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$devtools_jetski_provisioning$MutablePathEntry.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for devtools_jetski_provisioning$MutablePathEntry.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$devtools_jetski_provisioning$MutablePathEntry.internalDoNotUse_debugOnlyProtoTypeName = "devtools_jetski_provisioning.PathEntry";
}

/**
 * @typedef {!jspb$devtools_jetski_provisioning$ImmutablePathEntry|!jspb$devtools_jetski_provisioning$MutablePathEntry}
 */
jspb$ro.devtools_jetski_provisioning$ReadonlyPathEntry = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'devtools_jetski_provisioning.PathEntry'}
   */
  jspb$devtools_jetski_provisioning$MutablePathEntry.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$devtools_jetski_provisioning$MutablePathEntry.displayName = 'proto.devtools_jetski_provisioning.PathEntry';
}
/**
 * Interface form of PathEntry as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  path: (string|undefined),
 *  includeOnlyList: (!ReadonlyArray<string>|undefined),
 *  excludeList: (!ReadonlyArray<string>|undefined)
 * }}
 */
jspb$devtools_jetski_provisioning$MutablePathEntry.FieldsInterface;

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
 * @param {!jspb$devtools_jetski_provisioning$MutablePathEntry.FieldsInterface} record
 * @return {!jspb$devtools_jetski_provisioning$ImmutablePathEntry}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutablePathEntry, ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutablePathEntry.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$ImmutablePathEntry
 */
jspb$devtools_jetski_provisioning$MutablePathEntry.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$devtools_jetski_provisioning$MutablePathEntry));

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
 * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyPathEntry} value
 * @return {!jspb$devtools_jetski_provisioning$MutablePathEntry.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.devtools_jetski_provisioning$ReadonlyPathEntry): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutablePathEntry, ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutablePathEntry.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$devtools_jetski_provisioning$MutablePathEntry.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$b$devtools_jetski_provisioning$PathEntry;
Object.defineProperty(this, 'jspb$b$devtools_jetski_provisioning$PathEntry', {
  get() { return jspb$b$devtools_jetski_provisioning$PathEntry; },
  set(v) { jspb$b$devtools_jetski_provisioning$PathEntry = v; },
