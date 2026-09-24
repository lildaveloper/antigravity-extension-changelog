// source: devtools/jetski/boq/provisioning_service/proto/provisioning.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$devtools_jetski_provisioning$ImmutableListDeploymentsRequest');

goog.require('jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest');
goog.require('jspb.immutable_message.ImmutableMessage');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$e.devtools_jetski_provisioning$ListDeploymentsRequest$View');
goog.requireType('jspb$r$devtools_jetski_provisioning$ListDeploymentsRequest$internalDoNotUseReader');

/**
 * @abstract
 * @constructor
 * @extends {jspb.immutable_message.ImmutableMessage<!jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest>}
 * @implements {jspb$r$devtools_jetski_provisioning$ListDeploymentsRequest$internalDoNotUseReader}
 * @suppress {undefinedVars} empty function decls
 */
jspb$devtools_jetski_provisioning$ImmutableListDeploymentsRequest = function() {
  /**
   * optional View view = 1;
   * @override
   * @return {!jspb$e.devtools_jetski_provisioning$ListDeploymentsRequest$View}
   * @deprecated
   * @abstract
   */
  this.getView;

  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   * @abstract
   * @deprecated
   */
  this.hasView;

  /**
   * optional View view = 1;
   * @override
   * @return {!jspb$e.devtools_jetski_provisioning$ListDeploymentsRequest$View|undefined}
   * @deprecated
   * @abstract
   */
  this.getViewOrUndefined;

  /**
   * repeated string tags = 2;
   * @override
   * @param {!jspb_internal_public_for_gencode.DoNotFreezeToken=} freezeOptOut
   * @tsType (): readonly string[]
   * @return {!ReadonlyArray<string>}
   * @abstract
   */
  this.getTagsList;

  /**
   * Returns value at `index`.
   * @override
   * @param {number} index
   * @return {string}
   */
  this.getTags;

  /**
   * Returns the size of this field.
   * @override
   * @return {number}
   * @abstract
   */
  this.getTagsCount;

  /**
   * optional bool force_refresh_cache = 3;
   * @override
   * @return {boolean}
   * @abstract
   */
  this.getForceRefreshCache;

  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   * @abstract
   */
  this.hasForceRefreshCache;

  /**
   * optional bool force_refresh_cache = 3;
   * @override
   * @return {boolean|undefined}
   * @abstract
   */
  this.getForceRefreshCacheOrUndefined;

  /**
   * optional string filter = 4;
   * @override
   * @return {string}
   * @abstract
   */
  this.getFilter;

  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   * @abstract
   */
  this.hasFilter;

  /**
   * optional string filter = 4;
   * @override
   * @return {string|undefined}
   * @abstract
   */
  this.getFilterOrUndefined;

};

/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$ImmutableListDeploymentsRequest}
 */
jspb$devtools_jetski_provisioning$ImmutableListDeploymentsRequest.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest}
 */
jspb$devtools_jetski_provisioning$ImmutableListDeploymentsRequest.prototype.toMutable;
/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest}
 */
jspb$devtools_jetski_provisioning$ImmutableListDeploymentsRequest.prototype.clone;
/** @const {function(string):!jspb$devtools_jetski_provisioning$ImmutableListDeploymentsRequest} */
jspb$devtools_jetski_provisioning$ImmutableListDeploymentsRequest.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeImmutableDeserializeFunction(jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest));

/** @const {function():!jspb$devtools_jetski_provisioning$ImmutableListDeploymentsRequest} */
jspb$devtools_jetski_provisioning$ImmutableListDeploymentsRequest.getDefaultInstance = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeGetDefaultInstanceFunction(jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest));

/**
 * Returns whether the given value is an instance of jspb$devtools_jetski_provisioning$ImmutableListDeploymentsRequest.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$devtools_jetski_provisioning$ImmutableListDeploymentsRequest>}
 */
jspb$devtools_jetski_provisioning$ImmutableListDeploymentsRequest.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasImmutableInstance(jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest));


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
jspb$devtools_jetski_provisioning$ImmutableListDeploymentsRequest.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest));

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
 * @param {!jspb$devtools_jetski_provisioning$ImmutableListDeploymentsRequest} value
 * @return {!jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$ImmutableListDeploymentsRequest): import('google3/javascript/apps/jspb/internal_records').ImmutableFields<ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest, ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$devtools_jetski_provisioning$ImmutableListDeploymentsRequest.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());
if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'devtools_jetski_provisioning.ListDeploymentsRequest'}
   */
  jspb$devtools_jetski_provisioning$ImmutableListDeploymentsRequest.prototype.internalDoNotUse_annotations;
}

var jspb$o$devtools_jetski_provisioning$ListDeploymentsRequest;
Object.defineProperty(this, 'jspb$o$devtools_jetski_provisioning$ListDeploymentsRequest', {
  get() { return jspb$o$devtools_jetski_provisioning$ListDeploymentsRequest; },
  set(v) { jspb$o$devtools_jetski_provisioning$ListDeploymentsRequest = v; },
