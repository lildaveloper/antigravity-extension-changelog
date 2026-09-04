// source: devtools/jetski/boq/provisioning_service/proto/provisioning.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest');
goog.provide('jspb$ro.devtools_jetski_provisioning$ReadonlyListDeploymentsRequest');

goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$devtools_jetski_provisioning$ImmutableListDeploymentsRequest');
goog.requireType('jspb$e.devtools_jetski_provisioning$ListDeploymentsRequest$View');
goog.requireType('jspb$r$devtools_jetski_provisioning$ListDeploymentsRequest$internalDoNotUseReader');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$devtools_jetski_provisioning$ImmutableListDeploymentsRequest>}
 * @implements {jspb$r$devtools_jetski_provisioning$ListDeploymentsRequest$internalDoNotUseReader}
 */
jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional View view = 1;
   * @override
   * @return {!jspb$e.devtools_jetski_provisioning$ListDeploymentsRequest$View}
   */
  getView() {
    return /** @type {!jspb$e.devtools_jetski_provisioning$ListDeploymentsRequest$View} */ (jspb_internal_adapters.getEnumFieldWithDefault(this, 1));
  }


  /**
   * @param {!jspb$e.devtools_jetski_provisioning$ListDeploymentsRequest$View|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest} returns this
   */
  setView(value) {
    return jspb_internal_adapters.setEnumField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest} returns this
   */
  clearView() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasView() {
    return jspb_internal_adapters.hasEnumField(this, 1);
  }


  /**
   * optional View view = 1;
   * @override
   * @return {!jspb$e.devtools_jetski_provisioning$ListDeploymentsRequest$View|undefined}
   */
  getViewOrUndefined() {
    return /** @type {!jspb$e.devtools_jetski_provisioning$ListDeploymentsRequest$View|undefined} */ (jspb_internal_adapters.getEnumFieldOrUndefined(this, 1));
  }


  /**
   * repeated string tags = 2;
   * @override
   * @param {!jspb_internal_public_for_gencode.DoNotFreezeToken=} freezeOptOut
   * @tsType (freezeOptOut: import('google3/javascript/apps/jspb/internal_public').DoNotFreezeToken): string[]
   * @tsType (): readonly string[]
   * @return {!ReadonlyArray<string>}
   */
  getTagsList(freezeOptOut) {
    return jspb_internal_adapters.getRepeatedStringField(this, 2, jspb_internal_adapters.getRepeatedFieldReturnType(freezeOptOut));
  }


  /**
   * @param {!ReadonlyArray<string>|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest} returns this
   */
  setTagsList(value) {
    return jspb_internal_adapters.setRepeatedStringField(this, 2, value);
  }


  /**
   * @param {string} value
   * @param {number=} index
   * @return {!jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest} returns this
   */
  addTags(value, index) {
    return jspb_internal_adapters.addToRepeatedStringField(this, 2, value, index);
  }


  /**
   * @param {!Iterable<string>} values
   * @return {!jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest} returns this
   */
  addAllTags(values) {
    return jspb_internal_adapters.addAllToRepeatedStringField(this, 2, values);
  }


  /**
   * @param {number=} index If not passed, defaults to the end.
   * @return {!jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest} returns this
   */
  removeTags(index) {
    return jspb_internal_adapters.removeFromRepeatedStringField(this, 2, index);
  }


  /**
   * Returns value at `index`.
   * @override
   * @param {number} index
   * @return {string}
   */
  getTags(index) {
   return jspb_internal_adapters.getRepeatedIndexedStringField(this, 2, index);
  }


  /**
   * @param {number} index
   * @param {string} value
   * @return {!jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest} returns this
   */
  setTags(index, value) {
    return jspb_internal_adapters.setRepeatedIndexedStringField(this, 2, index, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest} returns this
   */
  clearTagsList() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * Returns the size of this field.
   * @override
   * @return {number}
   */
  getTagsCount() {
    return jspb_internal_adapters.getRepeatedStringCount(this, 2);
  }


  /**
   * optional bool force_refresh_cache = 3;
   * @override
   * @return {boolean}
   */
  getForceRefreshCache() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 3);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest} returns this
   */
  setForceRefreshCache(value) {
    return jspb_internal_adapters.setBooleanField(this, 3, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest} returns this
   */
  clearForceRefreshCache() {
    return jspb_internal_adapters.clearField(this, 3);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasForceRefreshCache() {
    return jspb_internal_adapters.hasBooleanField(this, 3);
  }


  /**
   * optional bool force_refresh_cache = 3;
   * @override
   * @return {boolean|undefined}
   */
  getForceRefreshCacheOrUndefined() {
    return jspb_internal_adapters.getBooleanFieldOrUndefined(this, 3);
  }


  /**
   * optional string filter = 4;
   * @override
   * @return {string}
   */
  getFilter() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 4);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest} returns this
   */
  setFilter(value) {
    return jspb_internal_adapters.setStringField(this, 4, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest} returns this
   */
  clearFilter() {
    return jspb_internal_adapters.clearField(this, 4);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasFilter() {
    return jspb_internal_adapters.hasStringField(this, 4);
  }


  /**
   * optional string filter = 4;
   * @override
   * @return {string|undefined}
   */
  getFilterOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 4);
  }


};

/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$ImmutableListDeploymentsRequest}
 */
jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest}
 */
jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest.prototype.clone;
/**
 * @const {function(string):!jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest}
 */
jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest));

/**
 * Returns whether the given value is an instance of jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest>}
 */
jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest));

/**
 * Object form of ListDeploymentsRequest as accepted by the `fromObject` method.
 * @typedef {{
 *  view: (?number|undefined),
 *  tagsList: (?Array<string>|undefined),
 *  forceRefreshCache: (?boolean|undefined),
 *  filter: (?string|undefined)
 * }}
 */
jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for devtools_jetski_provisioning$MutableListDeploymentsRequest.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest.internalDoNotUse_debugOnlyProtoTypeName = "devtools_jetski_provisioning.ListDeploymentsRequest";
}

/**
 * @typedef {!jspb$devtools_jetski_provisioning$ImmutableListDeploymentsRequest|!jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest}
 */
jspb$ro.devtools_jetski_provisioning$ReadonlyListDeploymentsRequest = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'devtools_jetski_provisioning.ListDeploymentsRequest'}
   */
  jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest.displayName = 'proto.devtools_jetski_provisioning.ListDeploymentsRequest';
}
/**
 * Interface form of ListDeploymentsRequest as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  view: (!jspb$e.devtools_jetski_provisioning$ListDeploymentsRequest$View|undefined),
 *  tagsList: (!ReadonlyArray<string>|undefined),
 *  forceRefreshCache: (boolean|undefined),
 *  filter: (string|undefined)
 * }}
 */
jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest.FieldsInterface;

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
 * @param {!jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest.FieldsInterface} record
 * @return {!jspb$devtools_jetski_provisioning$ImmutableListDeploymentsRequest}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest, ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$ImmutableListDeploymentsRequest
 */
jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest));

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
 * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyListDeploymentsRequest} value
 * @return {!jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.devtools_jetski_provisioning$ReadonlyListDeploymentsRequest): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest, ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$b$devtools_jetski_provisioning$ListDeploymentsRequest;
Object.defineProperty(this, 'jspb$b$devtools_jetski_provisioning$ListDeploymentsRequest', {
  get() { return jspb$b$devtools_jetski_provisioning$ListDeploymentsRequest; },
  set(v) { jspb$b$devtools_jetski_provisioning$ListDeploymentsRequest = v; },
