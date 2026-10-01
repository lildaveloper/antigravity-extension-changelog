// source: devtools/jetski/boq/provisioning_service/proto/deployment_config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$devtools_jetski_provisioning$MutableSidecar');
goog.provide('jspb$ro.devtools_jetski_provisioning$ReadonlySidecar');

goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$devtools_jetski_provisioning$ImmutableSidecar');
goog.requireType('jspb$r$devtools_jetski_provisioning$Sidecar$internalDoNotUseReader');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$devtools_jetski_provisioning$ImmutableSidecar>}
 * @implements {jspb$r$devtools_jetski_provisioning$Sidecar$internalDoNotUseReader}
 */
jspb$devtools_jetski_provisioning$MutableSidecar = class extends jspb_internal_public_for_gencode.GeneratedMessage {
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
   * @return {!jspb$devtools_jetski_provisioning$MutableSidecar} returns this
   */
  setPath(value) {
    return jspb_internal_adapters.setStringField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableSidecar} returns this
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
   * optional string inline_json = 2;
   * @override
   * @return {string}
   */
  getInlineJson() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 2);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableSidecar} returns this
   */
  setInlineJson(value) {
    return jspb_internal_adapters.setStringField(this, 2, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableSidecar} returns this
   */
  clearInlineJson() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasInlineJson() {
    return jspb_internal_adapters.hasStringField(this, 2);
  }


  /**
   * optional string inline_json = 2;
   * @override
   * @return {string|undefined}
   */
  getInlineJsonOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 2);
  }


  /**
   * optional string id = 3;
   * @override
   * @return {string}
   */
  getId() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 3);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableSidecar} returns this
   */
  setId(value) {
    return jspb_internal_adapters.setStringField(this, 3, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableSidecar} returns this
   */
  clearId() {
    return jspb_internal_adapters.clearField(this, 3);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasId() {
    return jspb_internal_adapters.hasStringField(this, 3);
  }


  /**
   * optional string id = 3;
   * @override
   * @return {string|undefined}
   */
  getIdOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 3);
  }


};

/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$ImmutableSidecar}
 */
jspb$devtools_jetski_provisioning$MutableSidecar.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$MutableSidecar}
 */
jspb$devtools_jetski_provisioning$MutableSidecar.prototype.clone;
/**
 * @const {function(string):!jspb$devtools_jetski_provisioning$MutableSidecar}
 */
jspb$devtools_jetski_provisioning$MutableSidecar.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$devtools_jetski_provisioning$MutableSidecar));

/**
 * Returns whether the given value is an instance of jspb$devtools_jetski_provisioning$MutableSidecar.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$devtools_jetski_provisioning$MutableSidecar>}
 */
jspb$devtools_jetski_provisioning$MutableSidecar.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$devtools_jetski_provisioning$MutableSidecar));

/**
 * Object form of Sidecar as accepted by the `fromObject` method.
 * @typedef {{
 *  path: (?string|undefined),
 *  inlineJson: (?string|undefined),
 *  id: (?string|undefined)
 * }}
 */
jspb$devtools_jetski_provisioning$MutableSidecar.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$devtools_jetski_provisioning$MutableSidecar.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$devtools_jetski_provisioning$MutableSidecar.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$devtools_jetski_provisioning$MutableSidecar.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for devtools_jetski_provisioning$MutableSidecar.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$devtools_jetski_provisioning$MutableSidecar.internalDoNotUse_debugOnlyProtoTypeName = "devtools_jetski_provisioning.Sidecar";
}

/**
 * @typedef {!jspb$devtools_jetski_provisioning$ImmutableSidecar|!jspb$devtools_jetski_provisioning$MutableSidecar}
 */
jspb$ro.devtools_jetski_provisioning$ReadonlySidecar = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'devtools_jetski_provisioning.Sidecar'}
   */
  jspb$devtools_jetski_provisioning$MutableSidecar.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$devtools_jetski_provisioning$MutableSidecar.displayName = 'proto.devtools_jetski_provisioning.Sidecar';
}
/**
 * Interface form of Sidecar as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  path: (string|undefined),
 *  inlineJson: (string|undefined),
 *  id: (string|undefined)
 * }}
 */
jspb$devtools_jetski_provisioning$MutableSidecar.FieldsInterface;

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
 * @param {!jspb$devtools_jetski_provisioning$MutableSidecar.FieldsInterface} record
 * @return {!jspb$devtools_jetski_provisioning$ImmutableSidecar}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableSidecar, ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableSidecar.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$ImmutableSidecar
 */
jspb$devtools_jetski_provisioning$MutableSidecar.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$devtools_jetski_provisioning$MutableSidecar));

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
 * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlySidecar} value
 * @return {!jspb$devtools_jetski_provisioning$MutableSidecar.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.devtools_jetski_provisioning$ReadonlySidecar): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableSidecar, ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableSidecar.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$devtools_jetski_provisioning$MutableSidecar.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$b$devtools_jetski_provisioning$Sidecar;
Object.defineProperty(this, 'jspb$b$devtools_jetski_provisioning$Sidecar', {
  get() { return jspb$b$devtools_jetski_provisioning$Sidecar; },
  set(v) { jspb$b$devtools_jetski_provisioning$Sidecar = v; },
