// source: third_party/jetski/codeium_common_pb/codeium_common.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$exa$codeium_common_pb$MutableModelFeatures');
goog.provide('jspb$ro.exa$codeium_common_pb$ReadonlyModelFeatures');

goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$exa$codeium_common_pb$ImmutableModelFeatures');
goog.requireType('jspb$r$exa$codeium_common_pb$ModelFeatures$internalDoNotUseReader');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$exa$codeium_common_pb$ImmutableModelFeatures>}
 * @implements {jspb$r$exa$codeium_common_pb$ModelFeatures$internalDoNotUseReader}
 */
jspb$exa$codeium_common_pb$MutableModelFeatures = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional bool supports_context_tokens = 2;
   * @override
   * @return {boolean}
   */
  getSupportsContextTokens() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 2);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  setSupportsContextTokens(value) {
    return jspb_internal_adapters.setProto3BooleanField(this, 2, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  clearSupportsContextTokens() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * optional bool requires_instruct_tags = 3;
   * @override
   * @return {boolean}
   */
  getRequiresInstructTags() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 3);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  setRequiresInstructTags(value) {
    return jspb_internal_adapters.setProto3BooleanField(this, 3, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  clearRequiresInstructTags() {
    return jspb_internal_adapters.clearField(this, 3);
  }


  /**
   * optional bool requires_fim_context = 4;
   * @override
   * @return {boolean}
   */
  getRequiresFimContext() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 4);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  setRequiresFimContext(value) {
    return jspb_internal_adapters.setProto3BooleanField(this, 4, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  clearRequiresFimContext() {
    return jspb_internal_adapters.clearField(this, 4);
  }


  /**
   * optional bool requires_context_snippet_prefix = 5;
   * @override
   * @return {boolean}
   */
  getRequiresContextSnippetPrefix() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 5);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  setRequiresContextSnippetPrefix(value) {
    return jspb_internal_adapters.setProto3BooleanField(this, 5, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  clearRequiresContextSnippetPrefix() {
    return jspb_internal_adapters.clearField(this, 5);
  }


  /**
   * optional bool requires_context_relevance_tags = 6;
   * @override
   * @return {boolean}
   */
  getRequiresContextRelevanceTags() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 6);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  setRequiresContextRelevanceTags(value) {
    return jspb_internal_adapters.setProto3BooleanField(this, 6, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  clearRequiresContextRelevanceTags() {
    return jspb_internal_adapters.clearField(this, 6);
  }


  /**
   * optional bool requires_llama3_tokens = 7;
   * @override
   * @return {boolean}
   * @deprecated
   */
  getRequiresLlama3Tokens() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 7);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   * @deprecated
   */
  setRequiresLlama3Tokens(value) {
    return jspb_internal_adapters.setProto3BooleanField(this, 7, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   * @deprecated
   */
  clearRequiresLlama3Tokens() {
    return jspb_internal_adapters.clearField(this, 7);
  }


  /**
   * optional bool zero_shot_capable = 8;
   * @override
   * @return {boolean}
   */
  getZeroShotCapable() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 8);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  setZeroShotCapable(value) {
    return jspb_internal_adapters.setProto3BooleanField(this, 8, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  clearZeroShotCapable() {
    return jspb_internal_adapters.clearField(this, 8);
  }


  /**
   * optional bool requires_autocomplete_as_command = 9;
   * @override
   * @return {boolean}
   */
  getRequiresAutocompleteAsCommand() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 9);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  setRequiresAutocompleteAsCommand(value) {
    return jspb_internal_adapters.setProto3BooleanField(this, 9, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  clearRequiresAutocompleteAsCommand() {
    return jspb_internal_adapters.clearField(this, 9);
  }


  /**
   * optional bool supports_cursor_aware_supercomplete = 10;
   * @override
   * @return {boolean}
   */
  getSupportsCursorAwareSupercomplete() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 10);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  setSupportsCursorAwareSupercomplete(value) {
    return jspb_internal_adapters.setProto3BooleanField(this, 10, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  clearSupportsCursorAwareSupercomplete() {
    return jspb_internal_adapters.clearField(this, 10);
  }


  /**
   * optional bool supports_images = 11;
   * @override
   * @return {boolean}
   * @deprecated
   */
  getSupportsImages() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 11);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   * @deprecated
   */
  setSupportsImages(value) {
    return jspb_internal_adapters.setProto3BooleanField(this, 11, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   * @deprecated
   */
  clearSupportsImages() {
    return jspb_internal_adapters.clearField(this, 11);
  }


  /**
   * optional bool supports_pdf = 22;
   * @override
   * @return {boolean}
   * @deprecated
   */
  getSupportsPdf() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 22);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   * @deprecated
   */
  setSupportsPdf(value) {
    return jspb_internal_adapters.setProto3BooleanField(this, 22, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   * @deprecated
   */
  clearSupportsPdf() {
    return jspb_internal_adapters.clearField(this, 22);
  }


  /**
   * optional bool supports_video = 23;
   * @override
   * @return {boolean}
   * @deprecated
   */
  getSupportsVideo() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 23);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   * @deprecated
   */
  setSupportsVideo(value) {
    return jspb_internal_adapters.setProto3BooleanField(this, 23, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   * @deprecated
   */
  clearSupportsVideo() {
    return jspb_internal_adapters.clearField(this, 23);
  }


  /**
   * map<string, bool> supported_mime_types = 28;
   * @override
   * @return {!Map<string,boolean>}
   */
  getSupportedMimeTypesMap() {
    return jspb_internal_adapters.getStringBooleanMapField(this, 28);}



  /**
   * @param {string} key The key of value to set or replace.
   * @param {boolean} value The new value.
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  putSupportedMimeTypes(key, value) {
    return jspb_internal_adapters.putStringBooleanMapField(this, 28, key, value);
  }


  /**
   * @param {!ReadonlyMap<string,boolean>} value The new values.
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  putAllSupportedMimeTypes(value) {
    return jspb_internal_adapters.putAllStringBooleanMapField(this, 28, value);
  }


  /**
   * @param {!ReadonlyMap<string,boolean>|undefined} value The new values.
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  setSupportedMimeTypesMap(value) {
    return jspb_internal_adapters.setStringBooleanMapField(this, 28, value);
  }


  /**
   * @param {string} key The key of value to remove.
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  deleteSupportedMimeTypes(key) {
    return jspb_internal_adapters.deleteStringBooleanMapField(this, 28, key);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  clearSupportedMimeTypesMap() {
    return jspb_internal_adapters.clearMapField(this, 28);
  }


  /**
   * optional bool supports_tool_calls = 12;
   * @override
   * @return {boolean}
   */
  getSupportsToolCalls() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 12);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  setSupportsToolCalls(value) {
    return jspb_internal_adapters.setProto3BooleanField(this, 12, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  clearSupportsToolCalls() {
    return jspb_internal_adapters.clearField(this, 12);
  }


  /**
   * optional bool does_not_support_tool_choice = 27;
   * @override
   * @return {boolean}
   */
  getDoesNotSupportToolChoice() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 27);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  setDoesNotSupportToolChoice(value) {
    return jspb_internal_adapters.setProto3BooleanField(this, 27, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  clearDoesNotSupportToolChoice() {
    return jspb_internal_adapters.clearField(this, 27);
  }


  /**
   * optional bool supports_cumulative_context = 13;
   * @override
   * @return {boolean}
   */
  getSupportsCumulativeContext() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 13);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  setSupportsCumulativeContext(value) {
    return jspb_internal_adapters.setProto3BooleanField(this, 13, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  clearSupportsCumulativeContext() {
    return jspb_internal_adapters.clearField(this, 13);
  }


  /**
   * optional bool tab_jump_print_line_range = 14;
   * @override
   * @return {boolean}
   */
  getTabJumpPrintLineRange() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 14);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  setTabJumpPrintLineRange(value) {
    return jspb_internal_adapters.setProto3BooleanField(this, 14, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  clearTabJumpPrintLineRange() {
    return jspb_internal_adapters.clearField(this, 14);
  }


  /**
   * optional bool supports_thinking = 15;
   * @override
   * @return {boolean}
   */
  getSupportsThinking() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 15);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  setSupportsThinking(value) {
    return jspb_internal_adapters.setProto3BooleanField(this, 15, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  clearSupportsThinking() {
    return jspb_internal_adapters.clearField(this, 15);
  }


  /**
   * optional bool supports_adaptive_thinking = 29;
   * @override
   * @return {boolean}
   */
  getSupportsAdaptiveThinking() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 29);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  setSupportsAdaptiveThinking(value) {
    return jspb_internal_adapters.setProto3BooleanField(this, 29, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  clearSupportsAdaptiveThinking() {
    return jspb_internal_adapters.clearField(this, 29);
  }


  /**
   * optional bool supports_raw_thinking = 21;
   * @override
   * @return {boolean}
   * @deprecated
   */
  getSupportsRawThinking() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 21);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   * @deprecated
   */
  setSupportsRawThinking(value) {
    return jspb_internal_adapters.setProto3BooleanField(this, 21, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   * @deprecated
   */
  clearSupportsRawThinking() {
    return jspb_internal_adapters.clearField(this, 21);
  }


  /**
   * optional bool supports_estimate_token_counter = 17;
   * @override
   * @return {boolean}
   */
  getSupportsEstimateTokenCounter() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 17);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  setSupportsEstimateTokenCounter(value) {
    return jspb_internal_adapters.setProto3BooleanField(this, 17, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  clearSupportsEstimateTokenCounter() {
    return jspb_internal_adapters.clearField(this, 17);
  }


  /**
   * optional bool add_cursor_to_find_replace_target = 18;
   * @override
   * @return {boolean}
   */
  getAddCursorToFindReplaceTarget() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 18);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  setAddCursorToFindReplaceTarget(value) {
    return jspb_internal_adapters.setProto3BooleanField(this, 18, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  clearAddCursorToFindReplaceTarget() {
    return jspb_internal_adapters.clearField(this, 18);
  }


  /**
   * optional bool supports_tab_jump_use_whole_document = 19;
   * @override
   * @return {boolean}
   */
  getSupportsTabJumpUseWholeDocument() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 19);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  setSupportsTabJumpUseWholeDocument(value) {
    return jspb_internal_adapters.setProto3BooleanField(this, 19, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  clearSupportsTabJumpUseWholeDocument() {
    return jspb_internal_adapters.clearField(this, 19);
  }


  /**
   * optional bool supports_model_info_override = 24;
   * @override
   * @return {boolean}
   */
  getSupportsModelInfoOverride() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 24);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  setSupportsModelInfoOverride(value) {
    return jspb_internal_adapters.setProto3BooleanField(this, 24, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  clearSupportsModelInfoOverride() {
    return jspb_internal_adapters.clearField(this, 24);
  }


  /**
   * optional bool requires_lead_in_generation = 25;
   * @override
   * @return {boolean}
   */
  getRequiresLeadInGeneration() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 25);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  setRequiresLeadInGeneration(value) {
    return jspb_internal_adapters.setProto3BooleanField(this, 25, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  clearRequiresLeadInGeneration() {
    return jspb_internal_adapters.clearField(this, 25);
  }


  /**
   * optional bool requires_no_xml_tool_examples = 26;
   * @override
   * @return {boolean}
   */
  getRequiresNoXmlToolExamples() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 26);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  setRequiresNoXmlToolExamples(value) {
    return jspb_internal_adapters.setProto3BooleanField(this, 26, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  clearRequiresNoXmlToolExamples() {
    return jspb_internal_adapters.clearField(this, 26);
  }


  /**
   * optional bool supports_thought_circulation = 30;
   * @override
   * @return {boolean}
   */
  getSupportsThoughtCirculation() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 30);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  setSupportsThoughtCirculation(value) {
    return jspb_internal_adapters.setProto3BooleanField(this, 30, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  clearSupportsThoughtCirculation() {
    return jspb_internal_adapters.clearField(this, 30);
  }


  /**
   * optional bool supports_deferred_tool_loading = 31;
   * @override
   * @return {boolean}
   */
  getSupportsDeferredToolLoading() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 31);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  setSupportsDeferredToolLoading(value) {
    return jspb_internal_adapters.setProto3BooleanField(this, 31, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures} returns this
   */
  clearSupportsDeferredToolLoading() {
    return jspb_internal_adapters.clearField(this, 31);
  }


};

/**
 * @override
 * @return {!jspb$exa$codeium_common_pb$ImmutableModelFeatures}
 */
jspb$exa$codeium_common_pb$MutableModelFeatures.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures}
 */
jspb$exa$codeium_common_pb$MutableModelFeatures.prototype.clone;
/**
 * @const {function(string):!jspb$exa$codeium_common_pb$MutableModelFeatures}
 */
jspb$exa$codeium_common_pb$MutableModelFeatures.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$exa$codeium_common_pb$MutableModelFeatures));

/**
 * Returns whether the given value is an instance of jspb$exa$codeium_common_pb$MutableModelFeatures.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$exa$codeium_common_pb$MutableModelFeatures>}
 */
jspb$exa$codeium_common_pb$MutableModelFeatures.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$exa$codeium_common_pb$MutableModelFeatures));

/**
 * Object form of ModelFeatures as accepted by the `fromObject` method.
 * @typedef {{
 *  supportsContextTokens: (?boolean|undefined),
 *  requiresInstructTags: (?boolean|undefined),
 *  requiresFimContext: (?boolean|undefined),
 *  requiresContextSnippetPrefix: (?boolean|undefined),
 *  requiresContextRelevanceTags: (?boolean|undefined),
 *  requiresLlama3Tokens: (?boolean|undefined),
 *  zeroShotCapable: (?boolean|undefined),
 *  requiresAutocompleteAsCommand: (?boolean|undefined),
 *  supportsCursorAwareSupercomplete: (?boolean|undefined),
 *  supportsImages: (?boolean|undefined),
 *  supportsPdf: (?boolean|undefined),
 *  supportsVideo: (?boolean|undefined),
 *  supportedMimeTypesMap: (?Array<!Array<boolean|string>>|undefined),
 *  supportsToolCalls: (?boolean|undefined),
 *  doesNotSupportToolChoice: (?boolean|undefined),
 *  supportsCumulativeContext: (?boolean|undefined),
 *  tabJumpPrintLineRange: (?boolean|undefined),
 *  supportsThinking: (?boolean|undefined),
 *  supportsAdaptiveThinking: (?boolean|undefined),
 *  supportsRawThinking: (?boolean|undefined),
 *  supportsEstimateTokenCounter: (?boolean|undefined),
 *  addCursorToFindReplaceTarget: (?boolean|undefined),
 *  supportsTabJumpUseWholeDocument: (?boolean|undefined),
 *  supportsModelInfoOverride: (?boolean|undefined),
 *  requiresLeadInGeneration: (?boolean|undefined),
 *  requiresNoXmlToolExamples: (?boolean|undefined),
 *  supportsThoughtCirculation: (?boolean|undefined),
 *  supportsDeferredToolLoading: (?boolean|undefined)
 * }}
 */
jspb$exa$codeium_common_pb$MutableModelFeatures.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$exa$codeium_common_pb$MutableModelFeatures.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$exa$codeium_common_pb$MutableModelFeatures.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for exa$codeium_common_pb$MutableModelFeatures.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$exa$codeium_common_pb$MutableModelFeatures.internalDoNotUse_debugOnlyProtoTypeName = "exa.codeium_common_pb.ModelFeatures";
}

/**
 * @typedef {!jspb$exa$codeium_common_pb$ImmutableModelFeatures|!jspb$exa$codeium_common_pb$MutableModelFeatures}
 */
jspb$ro.exa$codeium_common_pb$ReadonlyModelFeatures = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'exa.codeium_common_pb.ModelFeatures'}
   */
  jspb$exa$codeium_common_pb$MutableModelFeatures.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$exa$codeium_common_pb$MutableModelFeatures.displayName = 'proto.exa.codeium_common_pb.ModelFeatures';
}
/**
 * Interface form of ModelFeatures as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  supportsContextTokens: (boolean|undefined),
 *  requiresInstructTags: (boolean|undefined),
 *  requiresFimContext: (boolean|undefined),
 *  requiresContextSnippetPrefix: (boolean|undefined),
 *  requiresContextRelevanceTags: (boolean|undefined),
 *  requiresLlama3Tokens: (boolean|undefined),
 *  zeroShotCapable: (boolean|undefined),
 *  requiresAutocompleteAsCommand: (boolean|undefined),
 *  supportsCursorAwareSupercomplete: (boolean|undefined),
 *  supportsImages: (boolean|undefined),
 *  supportsPdf: (boolean|undefined),
 *  supportsVideo: (boolean|undefined),
 *  supportedMimeTypesMap: (!ReadonlyMap<string,boolean>|undefined),
 *  supportsToolCalls: (boolean|undefined),
 *  doesNotSupportToolChoice: (boolean|undefined),
 *  supportsCumulativeContext: (boolean|undefined),
 *  tabJumpPrintLineRange: (boolean|undefined),
 *  supportsThinking: (boolean|undefined),
 *  supportsAdaptiveThinking: (boolean|undefined),
 *  supportsRawThinking: (boolean|undefined),
 *  supportsEstimateTokenCounter: (boolean|undefined),
 *  addCursorToFindReplaceTarget: (boolean|undefined),
 *  supportsTabJumpUseWholeDocument: (boolean|undefined),
 *  supportsModelInfoOverride: (boolean|undefined),
 *  requiresLeadInGeneration: (boolean|undefined),
 *  requiresNoXmlToolExamples: (boolean|undefined),
 *  supportsThoughtCirculation: (boolean|undefined),
 *  supportsDeferredToolLoading: (boolean|undefined)
 * }}
 */
jspb$exa$codeium_common_pb$MutableModelFeatures.FieldsInterface;

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
 * @param {!jspb$exa$codeium_common_pb$MutableModelFeatures.FieldsInterface} record
 * @return {!jspb$exa$codeium_common_pb$ImmutableModelFeatures}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$exa$codeium_common_pb$MutableModelFeatures, ಠ_ಠ.clutz.jspb$exa$codeium_common_pb$MutableModelFeatures.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$exa$codeium_common_pb$ImmutableModelFeatures
 */
jspb$exa$codeium_common_pb$MutableModelFeatures.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$exa$codeium_common_pb$MutableModelFeatures));

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
 * @param {!jspb$ro.exa$codeium_common_pb$ReadonlyModelFeatures} value
 * @return {!jspb$exa$codeium_common_pb$MutableModelFeatures.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.exa$codeium_common_pb$ReadonlyModelFeatures): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$exa$codeium_common_pb$MutableModelFeatures, ಠ_ಠ.clutz.jspb$exa$codeium_common_pb$MutableModelFeatures.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$exa$codeium_common_pb$MutableModelFeatures.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$exa$codeium_common_pb$MutableModelInfo;
Object.defineProperty(this, 'jspb$exa$codeium_common_pb$MutableModelInfo', {
  get() { return jspb$exa$codeium_common_pb$MutableModelInfo; },
  set(v) { jspb$exa$codeium_common_pb$MutableModelInfo = v; },
