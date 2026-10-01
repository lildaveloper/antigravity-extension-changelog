// source: third_party/jetski/codeium_common_pb/codeium_common.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$exa$codeium_common_pb$MutableModelInfo');
goog.provide('jspb$ro.exa$codeium_common_pb$ReadonlyModelInfo');

goog.require('jspb$exa$codeium_common_pb$MutableModelFeatures');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$e.exa$codeium_common_pb$APIProvider');
goog.requireType('jspb$e.exa$codeium_common_pb$Model');
goog.requireType('jspb$e.exa$codeium_common_pb$ModelProvider');
goog.requireType('jspb$e.exa$codeium_common_pb$ModelType');
goog.requireType('jspb$e.exa$codeium_common_pb$PromptTemplaterType');
goog.requireType('jspb$e.exa$codeium_common_pb$ToolFormatterType');
goog.requireType('jspb$exa$codeium_common_pb$ImmutableModelInfo');
goog.requireType('jspb$r$exa$codeium_common_pb$ModelInfo$internalDoNotUseReader');
goog.requireType('jspb$ro.exa$codeium_common_pb$ReadonlyModelFeatures');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$exa$codeium_common_pb$ImmutableModelInfo>}
 * @implements {jspb$r$exa$codeium_common_pb$ModelInfo$internalDoNotUseReader}
 */
jspb$exa$codeium_common_pb$MutableModelInfo = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional Model model_id = 1;
   * @override
   * @return {!jspb$e.exa$codeium_common_pb$Model}
   */
  getModelId() {
    return /** @type {!jspb$e.exa$codeium_common_pb$Model} */ (jspb_internal_adapters.getEnumFieldWithDefault(this, 1));
  }


  /**
   * @param {!jspb$e.exa$codeium_common_pb$Model|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  setModelId(value) {
    return jspb_internal_adapters.setProto3EnumField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  clearModelId() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * optional bool is_internal = 2;
   * @override
   * @return {boolean}
   */
  getIsInternal() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 2);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  setIsInternal(value) {
    return jspb_internal_adapters.setProto3BooleanField(this, 2, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  clearIsInternal() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * optional ModelType model_type = 3;
   * @override
   * @return {!jspb$e.exa$codeium_common_pb$ModelType}
   */
  getModelType() {
    return /** @type {!jspb$e.exa$codeium_common_pb$ModelType} */ (jspb_internal_adapters.getEnumFieldWithDefault(this, 3));
  }


  /**
   * @param {!jspb$e.exa$codeium_common_pb$ModelType|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  setModelType(value) {
    return jspb_internal_adapters.setProto3EnumField(this, 3, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  clearModelType() {
    return jspb_internal_adapters.clearField(this, 3);
  }


  /**
   * optional int32 max_tokens = 4;
   * @override
   * @return {number}
   */
  getMaxTokens() {
    return jspb_internal_adapters.getInt32FieldWithDefault(this, 4);
  }


  /**
   * @param {number|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  setMaxTokens(value) {
    return jspb_internal_adapters.setProto3Int32Field(this, 4, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  clearMaxTokens() {
    return jspb_internal_adapters.clearField(this, 4);
  }


  /**
   * optional string tokenizer_type = 5;
   * @override
   * @return {string}
   * @deprecated
   */
  getTokenizerType() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 5);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   * @deprecated
   */
  setTokenizerType(value) {
    return jspb_internal_adapters.setProto3StringField(this, 5, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   * @deprecated
   */
  clearTokenizerType() {
    return jspb_internal_adapters.clearField(this, 5);
  }


  /**
   * optional ModelFeatures model_features = 6;
   * @override
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures|undefined}
   */
  getModelFeatures() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$exa$codeium_common_pb$MutableModelFeatures, 6);
  }


  /**
   * optional ModelFeatures model_features = 6;
   * @override
   * @return {!jspb$ro.exa$codeium_common_pb$ReadonlyModelFeatures}
   */
  getReadonlyModelFeatures() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$exa$codeium_common_pb$MutableModelFeatures, 6);
  }


  /**
   * optional ModelFeatures model_features = 6;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$exa$codeium_common_pb$MutableModelFeatures') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$exa$codeium_common_pb$MutableModelFeatures|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$exa$codeium_common_pb$MutableModelFeatures
   */
  getMutableModelFeatures(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$exa$codeium_common_pb$MutableModelFeatures, 6, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.exa$codeium_common_pb$ReadonlyModelFeatures|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  setModelFeatures(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$exa$codeium_common_pb$MutableModelFeatures, 6, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  clearModelFeatures() {
    return jspb_internal_adapters.clearField(this, 6);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasModelFeatures() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$exa$codeium_common_pb$MutableModelFeatures, 6);
  }


  /**
   * optional ModelFeatures model_features = 6;
   * @override
   * @return {!jspb$ro.exa$codeium_common_pb$ReadonlyModelFeatures|undefined}
   */
  getModelFeaturesOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$exa$codeium_common_pb$MutableModelFeatures, 6);
  }


  /**
   * optional APIProvider api_provider = 7;
   * @override
   * @return {!jspb$e.exa$codeium_common_pb$APIProvider}
   */
  getApiProvider() {
    return /** @type {!jspb$e.exa$codeium_common_pb$APIProvider} */ (jspb_internal_adapters.getEnumFieldWithDefault(this, 7));
  }


  /**
   * @param {!jspb$e.exa$codeium_common_pb$APIProvider|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  setApiProvider(value) {
    return jspb_internal_adapters.setProto3EnumField(this, 7, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  clearApiProvider() {
    return jspb_internal_adapters.clearField(this, 7);
  }


  /**
   * optional string model_name = 8;
   * @override
   * @return {string}
   */
  getModelName() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 8);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  setModelName(value) {
    return jspb_internal_adapters.setProto3StringField(this, 8, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  clearModelName() {
    return jspb_internal_adapters.clearField(this, 8);
  }


  /**
   * optional bool supports_context = 9;
   * @override
   * @return {boolean}
   */
  getSupportsContext() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 9);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  setSupportsContext(value) {
    return jspb_internal_adapters.setProto3BooleanField(this, 9, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  clearSupportsContext() {
    return jspb_internal_adapters.clearField(this, 9);
  }


  /**
   * optional int32 embed_dim = 10;
   * @override
   * @return {number}
   */
  getEmbedDim() {
    return jspb_internal_adapters.getInt32FieldWithDefault(this, 10);
  }


  /**
   * @param {number|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  setEmbedDim(value) {
    return jspb_internal_adapters.setProto3Int32Field(this, 10, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  clearEmbedDim() {
    return jspb_internal_adapters.clearField(this, 10);
  }


  /**
   * optional string base_url = 11;
   * @override
   * @return {string}
   */
  getBaseUrl() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 11);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  setBaseUrl(value) {
    return jspb_internal_adapters.setProto3StringField(this, 11, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  clearBaseUrl() {
    return jspb_internal_adapters.clearField(this, 11);
  }


  /**
   * optional string chat_model_name = 12;
   * @override
   * @return {string}
   */
  getChatModelName() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 12);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  setChatModelName(value) {
    return jspb_internal_adapters.setProto3StringField(this, 12, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  clearChatModelName() {
    return jspb_internal_adapters.clearField(this, 12);
  }


  /**
   * optional int32 max_output_tokens = 13;
   * @override
   * @return {number}
   */
  getMaxOutputTokens() {
    return jspb_internal_adapters.getInt32FieldWithDefault(this, 13);
  }


  /**
   * @param {number|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  setMaxOutputTokens(value) {
    return jspb_internal_adapters.setProto3Int32Field(this, 13, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  clearMaxOutputTokens() {
    return jspb_internal_adapters.clearField(this, 13);
  }


  /**
   * optional PromptTemplaterType prompt_templater_type = 14;
   * @override
   * @return {!jspb$e.exa$codeium_common_pb$PromptTemplaterType}
   */
  getPromptTemplaterType() {
    return /** @type {!jspb$e.exa$codeium_common_pb$PromptTemplaterType} */ (jspb_internal_adapters.getEnumFieldWithDefault(this, 14));
  }


  /**
   * @param {!jspb$e.exa$codeium_common_pb$PromptTemplaterType|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  setPromptTemplaterType(value) {
    return jspb_internal_adapters.setProto3EnumField(this, 14, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  clearPromptTemplaterType() {
    return jspb_internal_adapters.clearField(this, 14);
  }


  /**
   * optional ToolFormatterType tool_formatter_type = 15;
   * @override
   * @return {!jspb$e.exa$codeium_common_pb$ToolFormatterType}
   */
  getToolFormatterType() {
    return /** @type {!jspb$e.exa$codeium_common_pb$ToolFormatterType} */ (jspb_internal_adapters.getEnumFieldWithDefault(this, 15));
  }


  /**
   * @param {!jspb$e.exa$codeium_common_pb$ToolFormatterType|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  setToolFormatterType(value) {
    return jspb_internal_adapters.setProto3EnumField(this, 15, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  clearToolFormatterType() {
    return jspb_internal_adapters.clearField(this, 15);
  }


  /**
   * optional int32 thinking_budget = 16;
   * @override
   * @return {number}
   */
  getThinkingBudget() {
    return jspb_internal_adapters.getInt32FieldWithDefault(this, 16);
  }


  /**
   * @param {number|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  setThinkingBudget(value) {
    return jspb_internal_adapters.setProto3Int32Field(this, 16, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  clearThinkingBudget() {
    return jspb_internal_adapters.clearField(this, 16);
  }


  /**
   * optional int32 min_thinking_budget = 17;
   * @override
   * @return {number}
   */
  getMinThinkingBudget() {
    return jspb_internal_adapters.getInt32FieldWithDefault(this, 17);
  }


  /**
   * @param {number|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  setMinThinkingBudget(value) {
    return jspb_internal_adapters.setProto3Int32Field(this, 17, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  clearMinThinkingBudget() {
    return jspb_internal_adapters.clearField(this, 17);
  }


  /**
   * optional bool use_ccpa_for_eval = 18;
   * @override
   * @return {boolean}
   */
  getUseCcpaForEval() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 18);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  setUseCcpaForEval(value) {
    return jspb_internal_adapters.setProto3BooleanField(this, 18, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  clearUseCcpaForEval() {
    return jspb_internal_adapters.clearField(this, 18);
  }


  /**
   * optional int32 thinking_level = 19;
   * @override
   * @return {number}
   */
  getThinkingLevel() {
    return jspb_internal_adapters.getInt32FieldWithDefault(this, 19);
  }


  /**
   * @param {number|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  setThinkingLevel(value) {
    return jspb_internal_adapters.setProto3Int32Field(this, 19, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  clearThinkingLevel() {
    return jspb_internal_adapters.clearField(this, 19);
  }


  /**
   * optional string display_name = 20;
   * @override
   * @return {string}
   */
  getDisplayName() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 20);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  setDisplayName(value) {
    return jspb_internal_adapters.setProto3StringField(this, 20, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  clearDisplayName() {
    return jspb_internal_adapters.clearField(this, 20);
  }


  /**
   * optional string tool_response_key = 21;
   * @override
   * @return {string}
   */
  getToolResponseKey() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 21);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  setToolResponseKey(value) {
    return jspb_internal_adapters.setProto3StringField(this, 21, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  clearToolResponseKey() {
    return jspb_internal_adapters.clearField(this, 21);
  }


  /**
   * optional uint32 tokens_per_image = 22;
   * @override
   * @return {number}
   */
  getTokensPerImage() {
    return jspb_internal_adapters.getUint32FieldWithDefault(this, 22);
  }


  /**
   * @param {number|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  setTokensPerImage(value) {
    return jspb_internal_adapters.setProto3Uint32Field(this, 22, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  clearTokensPerImage() {
    return jspb_internal_adapters.clearField(this, 22);
  }


  /**
   * optional string vertex_model_id = 23;
   * @override
   * @return {string}
   */
  getVertexModelId() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 23);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  setVertexModelId(value) {
    return jspb_internal_adapters.setProto3StringField(this, 23, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  clearVertexModelId() {
    return jspb_internal_adapters.clearField(this, 23);
  }


  /**
   * optional ModelProvider model_provider = 24;
   * @override
   * @return {!jspb$e.exa$codeium_common_pb$ModelProvider}
   */
  getModelProvider() {
    return /** @type {!jspb$e.exa$codeium_common_pb$ModelProvider} */ (jspb_internal_adapters.getEnumFieldWithDefault(this, 24));
  }


  /**
   * @param {!jspb$e.exa$codeium_common_pb$ModelProvider|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  setModelProvider(value) {
    return jspb_internal_adapters.setProto3EnumField(this, 24, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  clearModelProvider() {
    return jspb_internal_adapters.clearField(this, 24);
  }


  /**
   * optional string model_url = 25;
   * @override
   * @return {string}
   */
  getModelUrl() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 25);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  setModelUrl(value) {
    return jspb_internal_adapters.setProto3StringField(this, 25, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelInfo} returns this
   */
  clearModelUrl() {
    return jspb_internal_adapters.clearField(this, 25);
  }


};

/**
 * @override
 * @return {!jspb$exa$codeium_common_pb$ImmutableModelInfo}
 */
jspb$exa$codeium_common_pb$MutableModelInfo.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$exa$codeium_common_pb$MutableModelInfo}
 */
jspb$exa$codeium_common_pb$MutableModelInfo.prototype.clone;
/**
 * @const {function(string):!jspb$exa$codeium_common_pb$MutableModelInfo}
 */
jspb$exa$codeium_common_pb$MutableModelInfo.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$exa$codeium_common_pb$MutableModelInfo));

/**
 * Returns whether the given value is an instance of jspb$exa$codeium_common_pb$MutableModelInfo.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$exa$codeium_common_pb$MutableModelInfo>}
 */
jspb$exa$codeium_common_pb$MutableModelInfo.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$exa$codeium_common_pb$MutableModelInfo));

/**
 * Object form of ModelInfo as accepted by the `fromObject` method.
 * @typedef {{
 *  modelId: (?number|undefined),
 *  isInternal: (?boolean|undefined),
 *  modelType: (?number|undefined),
 *  maxTokens: (?number|undefined),
 *  tokenizerType: (?string|undefined),
 *  modelFeatures: (?jspb$exa$codeium_common_pb$MutableModelFeatures.ObjectFormat|undefined),
 *  apiProvider: (?number|undefined),
 *  modelName: (?string|undefined),
 *  supportsContext: (?boolean|undefined),
 *  embedDim: (?number|undefined),
 *  baseUrl: (?string|undefined),
 *  chatModelName: (?string|undefined),
 *  maxOutputTokens: (?number|undefined),
 *  promptTemplaterType: (?number|undefined),
 *  toolFormatterType: (?number|undefined),
 *  thinkingBudget: (?number|undefined),
 *  minThinkingBudget: (?number|undefined),
 *  useCcpaForEval: (?boolean|undefined),
 *  thinkingLevel: (?number|undefined),
 *  displayName: (?string|undefined),
 *  toolResponseKey: (?string|undefined),
 *  tokensPerImage: (?number|undefined),
 *  vertexModelId: (?string|undefined),
 *  modelProvider: (?number|undefined),
 *  modelUrl: (?string|undefined)
 * }}
 */
jspb$exa$codeium_common_pb$MutableModelInfo.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$exa$codeium_common_pb$MutableModelInfo.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$exa$codeium_common_pb$MutableModelInfo.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$exa$codeium_common_pb$MutableModelInfo.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for exa$codeium_common_pb$MutableModelInfo.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$exa$codeium_common_pb$MutableModelInfo.internalDoNotUse_debugOnlyProtoTypeName = "exa.codeium_common_pb.ModelInfo";
}

/**
 * @typedef {!jspb$exa$codeium_common_pb$ImmutableModelInfo|!jspb$exa$codeium_common_pb$MutableModelInfo}
 */
jspb$ro.exa$codeium_common_pb$ReadonlyModelInfo = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'exa.codeium_common_pb.ModelInfo'}
   */
  jspb$exa$codeium_common_pb$MutableModelInfo.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$exa$codeium_common_pb$MutableModelInfo.displayName = 'proto.exa.codeium_common_pb.ModelInfo';
}
/**
 * Interface form of ModelInfo as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  modelId: (!jspb$e.exa$codeium_common_pb$Model|undefined),
 *  isInternal: (boolean|undefined),
 *  modelType: (!jspb$e.exa$codeium_common_pb$ModelType|undefined),
 *  maxTokens: (number|undefined),
 *  tokenizerType: (string|undefined),
 *  modelFeatures: (!jspb$ro.exa$codeium_common_pb$ReadonlyModelFeatures|undefined),
 *  apiProvider: (!jspb$e.exa$codeium_common_pb$APIProvider|undefined),
 *  modelName: (string|undefined),
 *  supportsContext: (boolean|undefined),
 *  embedDim: (number|undefined),
 *  baseUrl: (string|undefined),
 *  chatModelName: (string|undefined),
 *  maxOutputTokens: (number|undefined),
 *  promptTemplaterType: (!jspb$e.exa$codeium_common_pb$PromptTemplaterType|undefined),
 *  toolFormatterType: (!jspb$e.exa$codeium_common_pb$ToolFormatterType|undefined),
 *  thinkingBudget: (number|undefined),
 *  minThinkingBudget: (number|undefined),
 *  useCcpaForEval: (boolean|undefined),
 *  thinkingLevel: (number|undefined),
 *  displayName: (string|undefined),
 *  toolResponseKey: (string|undefined),
 *  tokensPerImage: (number|undefined),
 *  vertexModelId: (string|undefined),
 *  modelProvider: (!jspb$e.exa$codeium_common_pb$ModelProvider|undefined),
 *  modelUrl: (string|undefined)
 * }}
 */
jspb$exa$codeium_common_pb$MutableModelInfo.FieldsInterface;

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
 * @param {!jspb$exa$codeium_common_pb$MutableModelInfo.FieldsInterface} record
 * @return {!jspb$exa$codeium_common_pb$ImmutableModelInfo}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$exa$codeium_common_pb$MutableModelInfo, ಠ_ಠ.clutz.jspb$exa$codeium_common_pb$MutableModelInfo.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$exa$codeium_common_pb$ImmutableModelInfo
 */
jspb$exa$codeium_common_pb$MutableModelInfo.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$exa$codeium_common_pb$MutableModelInfo));

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
 * @param {!jspb$ro.exa$codeium_common_pb$ReadonlyModelInfo} value
 * @return {!jspb$exa$codeium_common_pb$MutableModelInfo.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.exa$codeium_common_pb$ReadonlyModelInfo): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$exa$codeium_common_pb$MutableModelInfo, ಠ_ಠ.clutz.jspb$exa$codeium_common_pb$MutableModelInfo.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$exa$codeium_common_pb$MutableModelInfo.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$jetbox_state_pb$MutableCustomModelsConfig;
Object.defineProperty(this, 'jspb$jetbox_state_pb$MutableCustomModelsConfig', {
  get() { return jspb$jetbox_state_pb$MutableCustomModelsConfig; },
  set(v) { jspb$jetbox_state_pb$MutableCustomModelsConfig = v; },
