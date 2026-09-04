// source: third_party/jetski/jetbox_state_pb/jetbox_state.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$jetbox_state_pb$MutableSidebarWorkspaceInfo');
goog.provide('jspb$ro.jetbox_state_pb$ReadonlySidebarWorkspaceInfo');

goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$jetbox_state_pb$ImmutableSidebarWorkspaceInfo');
goog.requireType('jspb$r$jetbox_state_pb$SidebarWorkspaceInfo$internalDoNotUseReader');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$jetbox_state_pb$ImmutableSidebarWorkspaceInfo>}
 * @implements {jspb$r$jetbox_state_pb$SidebarWorkspaceInfo$internalDoNotUseReader}
 */
jspb$jetbox_state_pb$MutableSidebarWorkspaceInfo = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional bool is_collapsed = 1;
   * @override
   * @return {boolean}
   */
  getIsCollapsed() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 1);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableSidebarWorkspaceInfo} returns this
   */
  setIsCollapsed(value) {
    return jspb_internal_adapters.setBooleanField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableSidebarWorkspaceInfo} returns this
   */
  clearIsCollapsed() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasIsCollapsed() {
    return jspb_internal_adapters.hasBooleanField(this, 1);
  }


  /**
   * optional bool is_collapsed = 1;
   * @override
   * @return {boolean|undefined}
   */
  getIsCollapsedOrUndefined() {
    return jspb_internal_adapters.getBooleanFieldOrUndefined(this, 1);
  }


  /**
   * optional bool is_hidden = 2;
   * @override
   * @return {boolean}
   */
  getIsHidden() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 2);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$jetbox_state_pb$MutableSidebarWorkspaceInfo} returns this
   */
  setIsHidden(value) {
    return jspb_internal_adapters.setBooleanField(this, 2, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetbox_state_pb$MutableSidebarWorkspaceInfo} returns this
   */
  clearIsHidden() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasIsHidden() {
    return jspb_internal_adapters.hasBooleanField(this, 2);
  }


  /**
   * optional bool is_hidden = 2;
   * @override
   * @return {boolean|undefined}
   */
  getIsHiddenOrUndefined() {
    return jspb_internal_adapters.getBooleanFieldOrUndefined(this, 2);
  }


};

/**
 * @override
 * @return {!jspb$jetbox_state_pb$ImmutableSidebarWorkspaceInfo}
 */
jspb$jetbox_state_pb$MutableSidebarWorkspaceInfo.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$jetbox_state_pb$MutableSidebarWorkspaceInfo}
 */
jspb$jetbox_state_pb$MutableSidebarWorkspaceInfo.prototype.clone;
/**
 * @const {function(string):!jspb$jetbox_state_pb$MutableSidebarWorkspaceInfo}
 */
jspb$jetbox_state_pb$MutableSidebarWorkspaceInfo.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$jetbox_state_pb$MutableSidebarWorkspaceInfo));

/**
 * Returns whether the given value is an instance of jspb$jetbox_state_pb$MutableSidebarWorkspaceInfo.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$jetbox_state_pb$MutableSidebarWorkspaceInfo>}
 */
jspb$jetbox_state_pb$MutableSidebarWorkspaceInfo.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$jetbox_state_pb$MutableSidebarWorkspaceInfo));

/**
 * Object form of SidebarWorkspaceInfo as accepted by the `fromObject` method.
 * @typedef {{
 *  isCollapsed: (?boolean|undefined),
 *  isHidden: (?boolean|undefined)
 * }}
 */
jspb$jetbox_state_pb$MutableSidebarWorkspaceInfo.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$jetbox_state_pb$MutableSidebarWorkspaceInfo.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$jetbox_state_pb$MutableSidebarWorkspaceInfo.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$jetbox_state_pb$MutableSidebarWorkspaceInfo.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for jetbox_state_pb$MutableSidebarWorkspaceInfo.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$jetbox_state_pb$MutableSidebarWorkspaceInfo.internalDoNotUse_debugOnlyProtoTypeName = "jetbox_state_pb.SidebarWorkspaceInfo";
}

/**
 * @typedef {!jspb$jetbox_state_pb$ImmutableSidebarWorkspaceInfo|!jspb$jetbox_state_pb$MutableSidebarWorkspaceInfo}
 */
jspb$ro.jetbox_state_pb$ReadonlySidebarWorkspaceInfo = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'jetbox_state_pb.SidebarWorkspaceInfo'}
   */
  jspb$jetbox_state_pb$MutableSidebarWorkspaceInfo.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$jetbox_state_pb$MutableSidebarWorkspaceInfo.displayName = 'proto.jetbox_state_pb.SidebarWorkspaceInfo';
}
/**
 * Interface form of SidebarWorkspaceInfo as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  isCollapsed: (boolean|undefined),
 *  isHidden: (boolean|undefined)
 * }}
 */
jspb$jetbox_state_pb$MutableSidebarWorkspaceInfo.FieldsInterface;

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
 * @param {!jspb$jetbox_state_pb$MutableSidebarWorkspaceInfo.FieldsInterface} record
 * @return {!jspb$jetbox_state_pb$ImmutableSidebarWorkspaceInfo}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableSidebarWorkspaceInfo, ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableSidebarWorkspaceInfo.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$jetbox_state_pb$ImmutableSidebarWorkspaceInfo
 */
jspb$jetbox_state_pb$MutableSidebarWorkspaceInfo.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$jetbox_state_pb$MutableSidebarWorkspaceInfo));

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
 * @param {!jspb$ro.jetbox_state_pb$ReadonlySidebarWorkspaceInfo} value
 * @return {!jspb$jetbox_state_pb$MutableSidebarWorkspaceInfo.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.jetbox_state_pb$ReadonlySidebarWorkspaceInfo): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableSidebarWorkspaceInfo, ಠ_ಠ.clutz.jspb$jetbox_state_pb$MutableSidebarWorkspaceInfo.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$jetbox_state_pb$MutableSidebarWorkspaceInfo.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$jetbox_state_pb$MutableJetboxAppState;
Object.defineProperty(this, 'jspb$jetbox_state_pb$MutableJetboxAppState', {
  get() { return jspb$jetbox_state_pb$MutableJetboxAppState; },
  set(v) { jspb$jetbox_state_pb$MutableJetboxAppState = v; },
