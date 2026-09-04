// source: third_party/jetski/codeium_common_pb/codeium_common.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$o$exa$codeium_common_pb$ModelInfo');

goog.require('jspb$exa$codeium_common_pb$MutableModelFeatures');
goog.require('jspb$exa$codeium_common_pb$MutableModelInfo');
goog.require('jspb$o$exa$codeium_common_pb$ModelFeatures');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');

if (jspb_internal_public_for_gencode.GENERATE_TO_OBJECT) {
/**
 * Static, internal implementation of the {@see toObject} method.
 * @param {?jspb$exa$codeium_common_pb$MutableModelInfo|undefined} msg The msg instance to transform.
 * @return {!jspb$exa$codeium_common_pb$MutableModelInfo.ObjectFormat|undefined}
 * @suppress {visibility} access to oneof field sets.
 * @nodts
 */
jspb$o$exa$codeium_common_pb$ModelInfo.internal_toObject = function(msg) {
  if (msg == null) return undefined;
  jspb_internal_public_for_gencode.checkCanCallToObject(msg);
  return /** @type {?} */ (/** @type {!jspb$exa$codeium_common_pb$MutableModelInfo.ObjectFormat} */ ({
    modelId: jspb_internal_adapters.getEnumFieldWithDefault(msg, 1),
    isInternal: jspb_internal_adapters.getBooleanFieldWithDefault(msg, 2),
    modelType: jspb_internal_adapters.getEnumFieldWithDefault(msg, 3),
    maxTokens: jspb_internal_adapters.getInt32FieldWithDefault(msg, 4),
    tokenizerType: jspb_internal_adapters.getStringFieldWithDefault(msg, 5),
    modelFeatures: jspb$o$exa$codeium_common_pb$ModelFeatures.internal_toObject(msg.getModelFeatures()),
    apiProvider: jspb_internal_adapters.getEnumFieldWithDefault(msg, 7),
    modelName: jspb_internal_adapters.getStringFieldWithDefault(msg, 8),
    supportsContext: jspb_internal_adapters.getBooleanFieldWithDefault(msg, 9),
    embedDim: jspb_internal_adapters.getInt32FieldWithDefault(msg, 10),
    baseUrl: jspb_internal_adapters.getStringFieldWithDefault(msg, 11),
    chatModelName: jspb_internal_adapters.getStringFieldWithDefault(msg, 12),
    maxOutputTokens: jspb_internal_adapters.getInt32FieldWithDefault(msg, 13),
    promptTemplaterType: jspb_internal_adapters.getEnumFieldWithDefault(msg, 14),
    toolFormatterType: jspb_internal_adapters.getEnumFieldWithDefault(msg, 15),
    thinkingBudget: jspb_internal_adapters.getInt32FieldWithDefault(msg, 16),
    minThinkingBudget: jspb_internal_adapters.getInt32FieldWithDefault(msg, 17),
    useCcpaForEval: jspb_internal_adapters.getBooleanFieldWithDefault(msg, 18),
    thinkingLevel: jspb_internal_adapters.getInt32FieldWithDefault(msg, 19),
    displayName: jspb_internal_adapters.getStringFieldWithDefault(msg, 20),
    toolResponseKey: jspb_internal_adapters.getStringFieldWithDefault(msg, 21),
    tokensPerImage: jspb_internal_adapters.getUint32FieldWithDefault(msg, 22),
    vertexModelId: jspb_internal_adapters.getStringFieldWithDefault(msg, 23),
    modelProvider: jspb_internal_adapters.getEnumFieldWithDefault(msg, 24),
    modelUrl: jspb_internal_adapters.getStringFieldWithDefault(msg, 25),
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
 * @return {!jspb$exa$codeium_common_pb$MutableModelInfo.ObjectFormat}
 */
jspb$exa$codeium_common_pb$MutableModelInfo.prototype.toObject = function() {
  return /** @type {!jspb$exa$codeium_common_pb$MutableModelInfo.ObjectFormat} */ (jspb$o$exa$codeium_common_pb$ModelInfo.internal_toObject(this));
};
}
if (jspb_internal_public_for_gencode.GENERATE_FROM_OBJECT) {
/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @param {!jspb$exa$codeium_common_pb$MutableModelInfo.ObjectFormat} obj
 *     The object representation of this proto to load the data from.
 * @return {!jspb$exa$codeium_common_pb$MutableModelInfo}
 * @suppress {visibility} access to oneof field sets.
 */
jspb$o$exa$codeium_common_pb$ModelInfo.fromObject = function(obj) {
  const msg = new jspb$exa$codeium_common_pb$MutableModelInfo();
  jspb_internal_adapters.setProto3EnumField(msg, 1, obj.modelId);
  jspb_internal_adapters.setProto3BooleanField(msg, 2, obj.isInternal);
  jspb_internal_adapters.setProto3EnumField(msg, 3, obj.modelType);
  jspb_internal_adapters.setProto3Int32Field(msg, 4, obj.maxTokens);
  jspb_internal_adapters.setProto3StringField(msg, 5, obj.tokenizerType);
  jspb_internal_adapters.setWrapperField(msg,
      jspb$exa$codeium_common_pb$MutableModelFeatures,
      6, jspb_internal_public_for_gencode.fromObjectNullable(obj.modelFeatures, jspb$o$exa$codeium_common_pb$ModelFeatures.fromObject));
  jspb_internal_adapters.setProto3EnumField(msg, 7, obj.apiProvider);
  jspb_internal_adapters.setProto3StringField(msg, 8, obj.modelName);
  jspb_internal_adapters.setProto3BooleanField(msg, 9, obj.supportsContext);
  jspb_internal_adapters.setProto3Int32Field(msg, 10, obj.embedDim);
  jspb_internal_adapters.setProto3StringField(msg, 11, obj.baseUrl);
  jspb_internal_adapters.setProto3StringField(msg, 12, obj.chatModelName);
  jspb_internal_adapters.setProto3Int32Field(msg, 13, obj.maxOutputTokens);
  jspb_internal_adapters.setProto3EnumField(msg, 14, obj.promptTemplaterType);
  jspb_internal_adapters.setProto3EnumField(msg, 15, obj.toolFormatterType);
  jspb_internal_adapters.setProto3Int32Field(msg, 16, obj.thinkingBudget);
  jspb_internal_adapters.setProto3Int32Field(msg, 17, obj.minThinkingBudget);
  jspb_internal_adapters.setProto3BooleanField(msg, 18, obj.useCcpaForEval);
  jspb_internal_adapters.setProto3Int32Field(msg, 19, obj.thinkingLevel);
  jspb_internal_adapters.setProto3StringField(msg, 20, obj.displayName);
  jspb_internal_adapters.setProto3StringField(msg, 21, obj.toolResponseKey);
  jspb_internal_adapters.setProto3Uint32Field(msg, 22, obj.tokensPerImage);
  jspb_internal_adapters.setProto3StringField(msg, 23, obj.vertexModelId);
  jspb_internal_adapters.setProto3EnumField(msg, 24, obj.modelProvider);
  jspb_internal_adapters.setProto3StringField(msg, 25, obj.modelUrl);
  return msg;
};
}

var jspb$o$jetbox_state_pb$CustomModelsConfig;
Object.defineProperty(this, 'jspb$o$jetbox_state_pb$CustomModelsConfig', {
  get() { return jspb$o$jetbox_state_pb$CustomModelsConfig; },
  set(v) { jspb$o$jetbox_state_pb$CustomModelsConfig = v; },
