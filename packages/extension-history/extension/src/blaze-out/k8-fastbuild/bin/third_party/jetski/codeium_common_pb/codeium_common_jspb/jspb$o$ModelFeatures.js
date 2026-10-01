// source: third_party/jetski/codeium_common_pb/codeium_common.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$exa$codeium_common_pb$ModelFeatures');

goog.require('jspb$exa$codeium_common_pb$MutableModelFeatures');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$exa$codeium_common_pb$MutableModelFeatures|undefined} msg The msg instance to transform.
 * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$exa$codeium_common_pb$ModelFeatures.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$exa$codeium_common_pb$MutableModelFeatures.ObjectFormat} */ ({
    supportsContextTokens: jspb_internal_adapters.getBooleanFieldWithDefault(msg, 2),
    requiresInstructTags: jspb_internal_adapters.getBooleanFieldWithDefault(msg, 3),
    requiresFimContext: jspb_internal_adapters.getBooleanFieldWithDefault(msg, 4),
    requiresContextSnippetPrefix: jspb_internal_adapters.getBooleanFieldWithDefault(msg, 5),
    requiresContextRelevanceTags: jspb_internal_adapters.getBooleanFieldWithDefault(msg, 6),
    requiresLlama3Tokens: jspb_internal_adapters.getBooleanFieldWithDefault(msg, 7),
    zeroShotCapable: jspb_internal_adapters.getBooleanFieldWithDefault(msg, 8),
    requiresAutocompleteAsCommand: jspb_internal_adapters.getBooleanFieldWithDefault(msg, 9),
    supportsCursorAwareSupercomplete: jspb_internal_adapters.getBooleanFieldWithDefault(msg, 10),
    supportsImages: jspb_internal_adapters.getBooleanFieldWithDefault(msg, 11),
    supportsPdf: jspb_internal_adapters.getBooleanFieldWithDefault(msg, 22),
    supportsVideo: jspb_internal_adapters.getBooleanFieldWithDefault(msg, 23),
    supportedMimeTypesMap: jspb_internal_public_for_gencode.mapToObject(msg.getSupportedMimeTypesMap()),
    supportsToolCalls: jspb_internal_adapters.getBooleanFieldWithDefault(msg, 12),
    doesNotSupportToolChoice: jspb_internal_adapters.getBooleanFieldWithDefault(msg, 27),
    supportsCumulativeContext: jspb_internal_adapters.getBooleanFieldWithDefault(msg, 13),
    tabJumpPrintLineRange: jspb_internal_adapters.getBooleanFieldWithDefault(msg, 14),
    supportsThinking: jspb_internal_adapters.getBooleanFieldWithDefault(msg, 15),
    supportsAdaptiveThinking: jspb_internal_adapters.getBooleanFieldWithDefault(msg, 29),
    supportsRawThinking: jspb_internal_adapters.getBooleanFieldWithDefault(msg, 21),
    supportsEstimateTokenCounter: jspb_internal_adapters.getBooleanFieldWithDefault(msg, 17),
    addCursorToFindReplaceTarget: jspb_internal_adapters.getBooleanFieldWithDefault(msg, 18),
    supportsTabJumpUseWholeDocument: jspb_internal_adapters.getBooleanFieldWithDefault(msg, 19),
    supportsModelInfoOverride: jspb_internal_adapters.getBooleanFieldWithDefault(msg, 24),
    requiresLeadInGeneration: jspb_internal_adapters.getBooleanFieldWithDefault(msg, 25),
    requiresNoXmlToolExamples: jspb_internal_adapters.getBooleanFieldWithDefault(msg, 26),
    supportsThoughtCirculation: jspb_internal_adapters.getBooleanFieldWithDefault(msg, 30),
    supportsDeferredToolLoading: jspb_internal_adapters.getBooleanFieldWithDefault(msg, 31),
  }));

};

/**
 * Creates a bad object rep of this proto. Please do not use.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @nodts
 * @const
 * @private
 * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures.ObjectFormat}
 */
jspb$exa$codeium_common_pb$MutableModelFeatures.prototype.toObject = function() {
  return /** @type {!jspb$exa$codeium_common_pb$MutableModelFeatures.ObjectFormat} */ (jspb$o$exa$codeium_common_pb$ModelFeatures.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$exa$codeium_common_pb$MutableModelFeatures.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$exa$codeium_common_pb$ModelFeatures.fromObject = function(obj) {
  const msg = new jspb$exa$codeium_common_pb$MutableModelFeatures();
  jspb_internal_adapters.setProto3BooleanField(msg, 2, obj.supportsContextTokens);
  jspb_internal_adapters.setProto3BooleanField(msg, 3, obj.requiresInstructTags);
  jspb_internal_adapters.setProto3BooleanField(msg, 4, obj.requiresFimContext);
  jspb_internal_adapters.setProto3BooleanField(msg, 5, obj.requiresContextSnippetPrefix);
  jspb_internal_adapters.setProto3BooleanField(msg, 6, obj.requiresContextRelevanceTags);
  jspb_internal_adapters.setProto3BooleanField(msg, 7, obj.requiresLlama3Tokens);
  jspb_internal_adapters.setProto3BooleanField(msg, 8, obj.zeroShotCapable);
  jspb_internal_adapters.setProto3BooleanField(msg, 9, obj.requiresAutocompleteAsCommand);
  jspb_internal_adapters.setProto3BooleanField(msg, 10, obj.supportsCursorAwareSupercomplete);
  jspb_internal_adapters.setProto3BooleanField(msg, 11, obj.supportsImages);
  jspb_internal_adapters.setProto3BooleanField(msg, 22, obj.supportsPdf);
  jspb_internal_adapters.setProto3BooleanField(msg, 23, obj.supportsVideo);
  obj.supportedMimeTypesMap && jspb_internal_public_for_gencode.mapFromObject(msg.getSupportedMimeTypesMap(), obj.supportedMimeTypesMap);
  jspb_internal_adapters.setProto3BooleanField(msg, 12, obj.supportsToolCalls);
  jspb_internal_adapters.setProto3BooleanField(msg, 27, obj.doesNotSupportToolChoice);
  jspb_internal_adapters.setProto3BooleanField(msg, 13, obj.supportsCumulativeContext);
  jspb_internal_adapters.setProto3BooleanField(msg, 14, obj.tabJumpPrintLineRange);
  jspb_internal_adapters.setProto3BooleanField(msg, 15, obj.supportsThinking);
  jspb_internal_adapters.setProto3BooleanField(msg, 29, obj.supportsAdaptiveThinking);
  jspb_internal_adapters.setProto3BooleanField(msg, 21, obj.supportsRawThinking);
  jspb_internal_adapters.setProto3BooleanField(msg, 17, obj.supportsEstimateTokenCounter);
  jspb_internal_adapters.setProto3BooleanField(msg, 18, obj.addCursorToFindReplaceTarget);
  jspb_internal_adapters.setProto3BooleanField(msg, 19, obj.supportsTabJumpUseWholeDocument);
  jspb_internal_adapters.setProto3BooleanField(msg, 24, obj.supportsModelInfoOverride);
  jspb_internal_adapters.setProto3BooleanField(msg, 25, obj.requiresLeadInGeneration);
  jspb_internal_adapters.setProto3BooleanField(msg, 26, obj.requiresNoXmlToolExamples);
  jspb_internal_adapters.setProto3BooleanField(msg, 30, obj.supportsThoughtCirculation);
  jspb_internal_adapters.setProto3BooleanField(msg, 31, obj.supportsDeferredToolLoading);
  return msg;
};
}

var jspb$o$exa$codeium_common_pb$ModelInfo;
Object.defineProperty(this, 'jspb$o$exa$codeium_common_pb$ModelInfo', {
  get() { return jspb$o$exa$codeium_common_pb$ModelInfo; },
  set(v) { jspb$o$exa$codeium_common_pb$ModelInfo = v; },
