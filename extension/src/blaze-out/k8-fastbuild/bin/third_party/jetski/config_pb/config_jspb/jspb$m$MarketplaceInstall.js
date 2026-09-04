// source: third_party/jetski/config_pb/config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$exa$config_pb$MutableMarketplaceInstall');
goog.provide('jspb$ro.exa$config_pb$ReadonlyMarketplaceInstall');

goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$exa$config_pb$ImmutableMarketplaceInstall');
goog.requireType('jspb$r$exa$config_pb$MarketplaceInstall$internalDoNotUseReader');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$exa$config_pb$ImmutableMarketplaceInstall>}
 * @implements {jspb$r$exa$config_pb$MarketplaceInstall$internalDoNotUseReader}
 */
jspb$exa$config_pb$MutableMarketplaceInstall = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional string marketplace = 1;
   * @override
   * @return {string}
   */
  getMarketplace() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 1);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$exa$config_pb$MutableMarketplaceInstall} returns this
   */
  setMarketplace(value) {
    return jspb_internal_adapters.setProto3StringField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$config_pb$MutableMarketplaceInstall} returns this
   */
  clearMarketplace() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * optional string id = 2;
   * @override
   * @return {string}
   */
  getId() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 2);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$exa$config_pb$MutableMarketplaceInstall} returns this
   */
  setId(value) {
    return jspb_internal_adapters.setProto3StringField(this, 2, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$config_pb$MutableMarketplaceInstall} returns this
   */
  clearId() {
    return jspb_internal_adapters.clearField(this, 2);
  }


};

/**
 * @override
 * @return {!jspb$exa$config_pb$ImmutableMarketplaceInstall}
 */
jspb$exa$config_pb$MutableMarketplaceInstall.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$exa$config_pb$MutableMarketplaceInstall}
 */
jspb$exa$config_pb$MutableMarketplaceInstall.prototype.clone;
/**
 * @const {function(string):!jspb$exa$config_pb$MutableMarketplaceInstall}
 */
jspb$exa$config_pb$MutableMarketplaceInstall.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$exa$config_pb$MutableMarketplaceInstall));

/**
 * Returns whether the given value is an instance of jspb$exa$config_pb$MutableMarketplaceInstall.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$exa$config_pb$MutableMarketplaceInstall>}
 */
jspb$exa$config_pb$MutableMarketplaceInstall.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$exa$config_pb$MutableMarketplaceInstall));

/**
 * Object form of MarketplaceInstall as accepted by the `fromObject` method.
 * @typedef {{
 *  marketplace: (?string|undefined),
 *  id: (?string|undefined)
 * }}
 */
jspb$exa$config_pb$MutableMarketplaceInstall.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$exa$config_pb$MutableMarketplaceInstall.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$exa$config_pb$MutableMarketplaceInstall.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$exa$config_pb$MutableMarketplaceInstall.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for exa$config_pb$MutableMarketplaceInstall.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$exa$config_pb$MutableMarketplaceInstall.internalDoNotUse_debugOnlyProtoTypeName = "exa.config_pb.MarketplaceInstall";
}

/**
 * @typedef {!jspb$exa$config_pb$ImmutableMarketplaceInstall|!jspb$exa$config_pb$MutableMarketplaceInstall}
 */
jspb$ro.exa$config_pb$ReadonlyMarketplaceInstall = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'exa.config_pb.MarketplaceInstall'}
   */
  jspb$exa$config_pb$MutableMarketplaceInstall.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$exa$config_pb$MutableMarketplaceInstall.displayName = 'proto.exa.config_pb.MarketplaceInstall';
}
/**
 * Interface form of MarketplaceInstall as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  marketplace: (string|undefined),
 *  id: (string|undefined)
 * }}
 */
jspb$exa$config_pb$MutableMarketplaceInstall.FieldsInterface;

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
 * @param {!jspb$exa$config_pb$MutableMarketplaceInstall.FieldsInterface} record
 * @return {!jspb$exa$config_pb$ImmutableMarketplaceInstall}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$exa$config_pb$MutableMarketplaceInstall, ಠ_ಠ.clutz.jspb$exa$config_pb$MutableMarketplaceInstall.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$exa$config_pb$ImmutableMarketplaceInstall
 */
jspb$exa$config_pb$MutableMarketplaceInstall.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$exa$config_pb$MutableMarketplaceInstall));

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
 * @param {!jspb$ro.exa$config_pb$ReadonlyMarketplaceInstall} value
 * @return {!jspb$exa$config_pb$MutableMarketplaceInstall.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.exa$config_pb$ReadonlyMarketplaceInstall): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$exa$config_pb$MutableMarketplaceInstall, ಠ_ಠ.clutz.jspb$exa$config_pb$MutableMarketplaceInstall.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$exa$config_pb$MutableMarketplaceInstall.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$exa$config_pb$MutablePluginUserConfig;
Object.defineProperty(this, 'jspb$exa$config_pb$MutablePluginUserConfig', {
  get() { return jspb$exa$config_pb$MutablePluginUserConfig; },
  set(v) { jspb$exa$config_pb$MutablePluginUserConfig = v; },
