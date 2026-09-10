// source: java/com/google/devtools/sourcerers/workspace/workspace_id.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$devtools$sourcerers$ImmutableWorkspaceId');

goog.require('jspb$devtools$sourcerers$MutableWorkspaceId');
goog.require('jspb.immutable_message.ImmutableMessage');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$e.devtools$sourcerers$WorkspaceId$Vcs');
goog.requireType('jspb$r$devtools$sourcerers$WorkspaceId$internalDoNotUseReader');

/**
 * @abstract
 * @constructor
 * @extends {jspb.immutable_message.ImmutableMessage<!jspb$devtools$sourcerers$MutableWorkspaceId>}
 * @implements {jspb$r$devtools$sourcerers$WorkspaceId$internalDoNotUseReader}
 * @suppress {undefinedVars} empty function decls
 */
jspb$devtools$sourcerers$ImmutableWorkspaceId = function() {
  /**
   * optional string owner = 1;
   * @override
   * @return {string}
   * @abstract
   */
  this.getOwner;

  /**
   * optional uint64 citc_id = 2;
   * @override
   * @return {!gbigint}
   * @abstract
   */
  this.getCitcId;

  /**
   * optional uint64 citc_id = 2;
   * @override
   * @return {number}
   * @deprecated unsafe int64 behavior: go/jspb-api-gotchas#int64
   * @abstract
   */
  this.getCitcId_asLegacyNumberOrString;

  /**
   * optional uint64 citc_id = 2;
   * @override
   * @return {string}
   * @abstract
   */
  this.getCitcId_asString;

  /**
   * optional string name = 3;
   * @override
   * @return {string}
   * @abstract
   */
  this.getName;

  /**
   * optional Vcs vcs = 4;
   * @override
   * @return {!jspb$e.devtools$sourcerers$WorkspaceId$Vcs}
   * @abstract
   */
  this.getVcs;

};

/**
 * @override
 * @return {!jspb$devtools$sourcerers$ImmutableWorkspaceId}
 */
jspb$devtools$sourcerers$ImmutableWorkspaceId.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$devtools$sourcerers$MutableWorkspaceId}
 */
jspb$devtools$sourcerers$ImmutableWorkspaceId.prototype.toMutable;
/**
 * @override
 * @return {!jspb$devtools$sourcerers$MutableWorkspaceId}
 */
jspb$devtools$sourcerers$ImmutableWorkspaceId.prototype.clone;
/** @const {function(string):!jspb$devtools$sourcerers$ImmutableWorkspaceId} */
jspb$devtools$sourcerers$ImmutableWorkspaceId.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeImmutableDeserializeFunction(jspb$devtools$sourcerers$MutableWorkspaceId));

/** @const {function():!jspb$devtools$sourcerers$ImmutableWorkspaceId} */
jspb$devtools$sourcerers$ImmutableWorkspaceId.getDefaultInstance = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeGetDefaultInstanceFunction(jspb$devtools$sourcerers$MutableWorkspaceId));

/**
 * Returns whether the given value is an instance of jspb$devtools$sourcerers$ImmutableWorkspaceId.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$devtools$sourcerers$ImmutableWorkspaceId>}
 */
jspb$devtools$sourcerers$ImmutableWorkspaceId.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasImmutableInstance(jspb$devtools$sourcerers$MutableWorkspaceId));


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
 * @param {!jspb$devtools$sourcerers$MutableWorkspaceId.FieldsInterface} record
 * @return {!jspb$devtools$sourcerers$ImmutableWorkspaceId}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$devtools$sourcerers$MutableWorkspaceId, ಠ_ಠ.clutz.jspb$devtools$sourcerers$MutableWorkspaceId.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$devtools$sourcerers$ImmutableWorkspaceId
 */
jspb$devtools$sourcerers$ImmutableWorkspaceId.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$devtools$sourcerers$MutableWorkspaceId));

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
 * @param {!jspb$devtools$sourcerers$ImmutableWorkspaceId} value
 * @return {!jspb$devtools$sourcerers$MutableWorkspaceId.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$devtools$sourcerers$ImmutableWorkspaceId): import('google3/javascript/apps/jspb/internal_records').ImmutableFields<ಠ_ಠ.clutz.jspb$devtools$sourcerers$MutableWorkspaceId, ಠ_ಠ.clutz.jspb$devtools$sourcerers$MutableWorkspaceId.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$devtools$sourcerers$ImmutableWorkspaceId.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());
if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'devtools.sourcerers.WorkspaceId'}
   */
  jspb$devtools$sourcerers$ImmutableWorkspaceId.prototype.internalDoNotUse_annotations;
}

var jspb$o$devtools$sourcerers$WorkspaceId;
Object.defineProperty(this, 'jspb$o$devtools$sourcerers$WorkspaceId', {
  get() { return jspb$o$devtools$sourcerers$WorkspaceId; },
  set(v) { jspb$o$devtools$sourcerers$WorkspaceId = v; },
