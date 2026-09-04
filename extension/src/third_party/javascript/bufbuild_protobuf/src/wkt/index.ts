/**
 * @license
 * Copyright 2021-2025 Buf Technologies, Inc
 * SPDX-License-Identifier: Apache-2.0
 */
// Copyright 2021-2025 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/javascript/bufbuild_protobuf/src/wkt/index.ts
 * @suppress {checkTypes} added by tsickle
 * @suppress {extraRequire} added by tsickle
 * @suppress {missingRequire} added by tsickle
 * @suppress {uselessCode} added by tsickle
 * @suppress {suspiciousCode} added by tsickle
 * @suppress {missingReturn} added by tsickle
 * @suppress {unusedLocalVariables} added by tsickle
 * @suppress {missingOverride} added by tsickle
 * @suppress {const} added by tsickle
 */
goog.module('google3.third_party.javascript.bufbuild_protobuf.src.wkt.index');
var module = module || { id: 'third_party/javascript/bufbuild_protobuf/src/wkt/index.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_timestamp_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wkt.timestamp");
const tsickle_duration_2 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wkt.duration");
const tsickle_any_3 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wkt.any");
const tsickle_wrappers_4 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wkt.wrappers");
const tsickle_any_pb_5 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.any_pb");
const tsickle_api_pb_6 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.api_pb");
const tsickle_cpp_features_pb_7 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.cpp_features_pb");
const tsickle_descriptor_pb_8 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.descriptor_pb");
const tsickle_duration_pb_9 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.duration_pb");
const tsickle_empty_pb_10 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.empty_pb");
const tsickle_field_mask_pb_11 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.field_mask_pb");
const tsickle_go_features_pb_12 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.go_features_pb");
const tsickle_java_features_pb_13 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.java_features_pb");
const tsickle_source_context_pb_14 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.source_context_pb");
const tsickle_struct_pb_15 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.struct_pb");
const tsickle_timestamp_pb_16 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.timestamp_pb");
const tsickle_type_pb_17 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.type_pb");
const tsickle_wrappers_pb_18 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.wrappers_pb");
const tsickle_plugin_pb_19 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.compiler.plugin_pb");
const timestamp_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wkt.timestamp');
exports.timestampNow = timestamp_js_1.timestampNow;
exports.timestampFromDate = timestamp_js_1.timestampFromDate;
exports.timestampDate = timestamp_js_1.timestampDate;
exports.timestampFromMs = timestamp_js_1.timestampFromMs;
exports.timestampMs = timestamp_js_1.timestampMs;
const duration_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wkt.duration');
exports.durationFromMs = duration_js_1.durationFromMs;
exports.durationMs = duration_js_1.durationMs;
const any_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wkt.any');
exports.anyPack = any_js_1.anyPack;
exports.anyIs = any_js_1.anyIs;
exports.anyUnpack = any_js_1.anyUnpack;
exports.anyUnpackTo = any_js_1.anyUnpackTo;
const wrappers_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wkt.wrappers');
exports.isWrapper = wrappers_js_1.isWrapper;
exports.isWrapperDesc = wrappers_js_1.isWrapperDesc;
/** @typedef {!tsickle_wrappers_4.WktWrapperDesc} */
exports.WktWrapperDesc; // re-export typedef
const any_pb_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.any_pb');
exports.file_google_protobuf_any = any_pb_js_1.file_google_protobuf_any;
exports.AnySchema = any_pb_js_1.AnySchema;
/** @typedef {!tsickle_any_pb_5.Any} */
exports.Any; // re-export typedef
/** @typedef {!tsickle_any_pb_5.AnyJson} */
exports.AnyJson; // re-export typedef
const api_pb_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.api_pb');
exports.file_google_protobuf_api = api_pb_js_1.file_google_protobuf_api;
exports.ApiSchema = api_pb_js_1.ApiSchema;
exports.MethodSchema = api_pb_js_1.MethodSchema;
exports.MixinSchema = api_pb_js_1.MixinSchema;
/** @typedef {!tsickle_api_pb_6.Api} */
exports.Api; // re-export typedef
/** @typedef {!tsickle_api_pb_6.ApiJson} */
exports.ApiJson; // re-export typedef
/** @typedef {!tsickle_api_pb_6.Method} */
exports.Method; // re-export typedef
/** @typedef {!tsickle_api_pb_6.MethodJson} */
exports.MethodJson; // re-export typedef
/** @typedef {!tsickle_api_pb_6.Mixin} */
exports.Mixin; // re-export typedef
/** @typedef {!tsickle_api_pb_6.MixinJson} */
exports.MixinJson; // re-export typedef
const cpp_features_pb_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.cpp_features_pb');
exports.file_google_protobuf_cpp_features = cpp_features_pb_js_1.file_google_protobuf_cpp_features;
exports.CppFeaturesSchema = cpp_features_pb_js_1.CppFeaturesSchema;
exports.CppFeatures_StringType = cpp_features_pb_js_1.CppFeatures_StringType;
exports.CppFeatures_StringTypeSchema = cpp_features_pb_js_1.CppFeatures_StringTypeSchema;
exports.cpp = cpp_features_pb_js_1.cpp;
/** @typedef {!tsickle_cpp_features_pb_7.CppFeatures} */
exports.CppFeatures; // re-export typedef
/** @typedef {!tsickle_cpp_features_pb_7.CppFeaturesJson} */
exports.CppFeaturesJson; // re-export typedef
/** @typedef {!tsickle_cpp_features_pb_7.CppFeatures_StringTypeJson} */
exports.CppFeatures_StringTypeJson; // re-export typedef
const descriptor_pb_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.descriptor_pb');
exports.file_google_protobuf_descriptor = descriptor_pb_js_1.file_google_protobuf_descriptor;
exports.FileDescriptorSetSchema = descriptor_pb_js_1.FileDescriptorSetSchema;
exports.FileDescriptorProtoSchema = descriptor_pb_js_1.FileDescriptorProtoSchema;
exports.DescriptorProtoSchema = descriptor_pb_js_1.DescriptorProtoSchema;
exports.DescriptorProto_ExtensionRangeSchema = descriptor_pb_js_1.DescriptorProto_ExtensionRangeSchema;
exports.DescriptorProto_ReservedRangeSchema = descriptor_pb_js_1.DescriptorProto_ReservedRangeSchema;
exports.ExtensionRangeOptionsSchema = descriptor_pb_js_1.ExtensionRangeOptionsSchema;
exports.ExtensionRangeOptions_DeclarationSchema = descriptor_pb_js_1.ExtensionRangeOptions_DeclarationSchema;
exports.ExtensionRangeOptions_VerificationState = descriptor_pb_js_1.ExtensionRangeOptions_VerificationState;
exports.ExtensionRangeOptions_VerificationStateSchema = descriptor_pb_js_1.ExtensionRangeOptions_VerificationStateSchema;
exports.FieldDescriptorProtoSchema = descriptor_pb_js_1.FieldDescriptorProtoSchema;
exports.FieldDescriptorProto_Type = descriptor_pb_js_1.FieldDescriptorProto_Type;
exports.FieldDescriptorProto_TypeSchema = descriptor_pb_js_1.FieldDescriptorProto_TypeSchema;
exports.FieldDescriptorProto_Label = descriptor_pb_js_1.FieldDescriptorProto_Label;
exports.FieldDescriptorProto_LabelSchema = descriptor_pb_js_1.FieldDescriptorProto_LabelSchema;
exports.OneofDescriptorProtoSchema = descriptor_pb_js_1.OneofDescriptorProtoSchema;
exports.EnumDescriptorProtoSchema = descriptor_pb_js_1.EnumDescriptorProtoSchema;
exports.EnumDescriptorProto_EnumReservedRangeSchema = descriptor_pb_js_1.EnumDescriptorProto_EnumReservedRangeSchema;
exports.EnumValueDescriptorProtoSchema = descriptor_pb_js_1.EnumValueDescriptorProtoSchema;
exports.ServiceDescriptorProtoSchema = descriptor_pb_js_1.ServiceDescriptorProtoSchema;
exports.MethodDescriptorProtoSchema = descriptor_pb_js_1.MethodDescriptorProtoSchema;
exports.FileOptionsSchema = descriptor_pb_js_1.FileOptionsSchema;
exports.FileOptions_OptimizeMode = descriptor_pb_js_1.FileOptions_OptimizeMode;
exports.FileOptions_OptimizeModeSchema = descriptor_pb_js_1.FileOptions_OptimizeModeSchema;
exports.MessageOptionsSchema = descriptor_pb_js_1.MessageOptionsSchema;
exports.FieldOptionsSchema = descriptor_pb_js_1.FieldOptionsSchema;
exports.FieldOptions_EditionDefaultSchema = descriptor_pb_js_1.FieldOptions_EditionDefaultSchema;
exports.FieldOptions_FeatureSupportSchema = descriptor_pb_js_1.FieldOptions_FeatureSupportSchema;
exports.FieldOptions_CType = descriptor_pb_js_1.FieldOptions_CType;
exports.FieldOptions_CTypeSchema = descriptor_pb_js_1.FieldOptions_CTypeSchema;
exports.FieldOptions_JSType = descriptor_pb_js_1.FieldOptions_JSType;
exports.FieldOptions_JSTypeSchema = descriptor_pb_js_1.FieldOptions_JSTypeSchema;
exports.FieldOptions_OptionRetention = descriptor_pb_js_1.FieldOptions_OptionRetention;
exports.FieldOptions_OptionRetentionSchema = descriptor_pb_js_1.FieldOptions_OptionRetentionSchema;
exports.FieldOptions_OptionTargetType = descriptor_pb_js_1.FieldOptions_OptionTargetType;
exports.FieldOptions_OptionTargetTypeSchema = descriptor_pb_js_1.FieldOptions_OptionTargetTypeSchema;
exports.OneofOptionsSchema = descriptor_pb_js_1.OneofOptionsSchema;
exports.EnumOptionsSchema = descriptor_pb_js_1.EnumOptionsSchema;
exports.EnumValueOptionsSchema = descriptor_pb_js_1.EnumValueOptionsSchema;
exports.ServiceOptionsSchema = descriptor_pb_js_1.ServiceOptionsSchema;
exports.MethodOptionsSchema = descriptor_pb_js_1.MethodOptionsSchema;
exports.MethodOptions_IdempotencyLevel = descriptor_pb_js_1.MethodOptions_IdempotencyLevel;
exports.MethodOptions_IdempotencyLevelSchema = descriptor_pb_js_1.MethodOptions_IdempotencyLevelSchema;
exports.UninterpretedOptionSchema = descriptor_pb_js_1.UninterpretedOptionSchema;
exports.UninterpretedOption_NamePartSchema = descriptor_pb_js_1.UninterpretedOption_NamePartSchema;
exports.FeatureSetSchema = descriptor_pb_js_1.FeatureSetSchema;
exports.FeatureSet_VisibilityFeatureSchema = descriptor_pb_js_1.FeatureSet_VisibilityFeatureSchema;
exports.FeatureSet_VisibilityFeature_DefaultSymbolVisibility = descriptor_pb_js_1.FeatureSet_VisibilityFeature_DefaultSymbolVisibility;
exports.FeatureSet_VisibilityFeature_DefaultSymbolVisibilitySchema = descriptor_pb_js_1.FeatureSet_VisibilityFeature_DefaultSymbolVisibilitySchema;
exports.FeatureSet_FieldPresence = descriptor_pb_js_1.FeatureSet_FieldPresence;
exports.FeatureSet_FieldPresenceSchema = descriptor_pb_js_1.FeatureSet_FieldPresenceSchema;
exports.FeatureSet_EnumType = descriptor_pb_js_1.FeatureSet_EnumType;
exports.FeatureSet_EnumTypeSchema = descriptor_pb_js_1.FeatureSet_EnumTypeSchema;
exports.FeatureSet_RepeatedFieldEncoding = descriptor_pb_js_1.FeatureSet_RepeatedFieldEncoding;
exports.FeatureSet_RepeatedFieldEncodingSchema = descriptor_pb_js_1.FeatureSet_RepeatedFieldEncodingSchema;
exports.FeatureSet_Utf8Validation = descriptor_pb_js_1.FeatureSet_Utf8Validation;
exports.FeatureSet_Utf8ValidationSchema = descriptor_pb_js_1.FeatureSet_Utf8ValidationSchema;
exports.FeatureSet_MessageEncoding = descriptor_pb_js_1.FeatureSet_MessageEncoding;
exports.FeatureSet_MessageEncodingSchema = descriptor_pb_js_1.FeatureSet_MessageEncodingSchema;
exports.FeatureSet_JsonFormat = descriptor_pb_js_1.FeatureSet_JsonFormat;
exports.FeatureSet_JsonFormatSchema = descriptor_pb_js_1.FeatureSet_JsonFormatSchema;
exports.FeatureSet_EnforceNamingStyle = descriptor_pb_js_1.FeatureSet_EnforceNamingStyle;
exports.FeatureSet_EnforceNamingStyleSchema = descriptor_pb_js_1.FeatureSet_EnforceNamingStyleSchema;
exports.FeatureSetDefaultsSchema = descriptor_pb_js_1.FeatureSetDefaultsSchema;
exports.FeatureSetDefaults_FeatureSetEditionDefaultSchema = descriptor_pb_js_1.FeatureSetDefaults_FeatureSetEditionDefaultSchema;
exports.SourceCodeInfoSchema = descriptor_pb_js_1.SourceCodeInfoSchema;
exports.SourceCodeInfo_LocationSchema = descriptor_pb_js_1.SourceCodeInfo_LocationSchema;
exports.GeneratedCodeInfoSchema = descriptor_pb_js_1.GeneratedCodeInfoSchema;
exports.GeneratedCodeInfo_AnnotationSchema = descriptor_pb_js_1.GeneratedCodeInfo_AnnotationSchema;
exports.GeneratedCodeInfo_Annotation_Semantic = descriptor_pb_js_1.GeneratedCodeInfo_Annotation_Semantic;
exports.GeneratedCodeInfo_Annotation_SemanticSchema = descriptor_pb_js_1.GeneratedCodeInfo_Annotation_SemanticSchema;
exports.Edition = descriptor_pb_js_1.Edition;
exports.EditionSchema = descriptor_pb_js_1.EditionSchema;
exports.SymbolVisibility = descriptor_pb_js_1.SymbolVisibility;
exports.SymbolVisibilitySchema = descriptor_pb_js_1.SymbolVisibilitySchema;
/** @typedef {!tsickle_descriptor_pb_8.FileDescriptorSet} */
exports.FileDescriptorSet; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.FileDescriptorSetJson} */
exports.FileDescriptorSetJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.FileDescriptorProto} */
exports.FileDescriptorProto; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.FileDescriptorProtoJson} */
exports.FileDescriptorProtoJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.DescriptorProto} */
exports.DescriptorProto; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.DescriptorProtoJson} */
exports.DescriptorProtoJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.DescriptorProto_ExtensionRange} */
exports.DescriptorProto_ExtensionRange; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.DescriptorProto_ExtensionRangeJson} */
exports.DescriptorProto_ExtensionRangeJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.DescriptorProto_ReservedRange} */
exports.DescriptorProto_ReservedRange; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.DescriptorProto_ReservedRangeJson} */
exports.DescriptorProto_ReservedRangeJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.ExtensionRangeOptions} */
exports.ExtensionRangeOptions; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.ExtensionRangeOptionsJson} */
exports.ExtensionRangeOptionsJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.ExtensionRangeOptions_Declaration} */
exports.ExtensionRangeOptions_Declaration; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.ExtensionRangeOptions_DeclarationJson} */
exports.ExtensionRangeOptions_DeclarationJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.ExtensionRangeOptions_VerificationStateJson} */
exports.ExtensionRangeOptions_VerificationStateJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.FieldDescriptorProto} */
exports.FieldDescriptorProto; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.FieldDescriptorProtoJson} */
exports.FieldDescriptorProtoJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.FieldDescriptorProto_TypeJson} */
exports.FieldDescriptorProto_TypeJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.FieldDescriptorProto_LabelJson} */
exports.FieldDescriptorProto_LabelJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.OneofDescriptorProto} */
exports.OneofDescriptorProto; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.OneofDescriptorProtoJson} */
exports.OneofDescriptorProtoJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.EnumDescriptorProto} */
exports.EnumDescriptorProto; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.EnumDescriptorProtoJson} */
exports.EnumDescriptorProtoJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.EnumDescriptorProto_EnumReservedRange} */
exports.EnumDescriptorProto_EnumReservedRange; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.EnumDescriptorProto_EnumReservedRangeJson} */
exports.EnumDescriptorProto_EnumReservedRangeJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.EnumValueDescriptorProto} */
exports.EnumValueDescriptorProto; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.EnumValueDescriptorProtoJson} */
exports.EnumValueDescriptorProtoJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.ServiceDescriptorProto} */
exports.ServiceDescriptorProto; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.ServiceDescriptorProtoJson} */
exports.ServiceDescriptorProtoJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.MethodDescriptorProto} */
exports.MethodDescriptorProto; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.MethodDescriptorProtoJson} */
exports.MethodDescriptorProtoJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.FileOptions} */
exports.FileOptions; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.FileOptionsJson} */
exports.FileOptionsJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.FileOptions_OptimizeModeJson} */
exports.FileOptions_OptimizeModeJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.MessageOptions} */
exports.MessageOptions; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.MessageOptionsJson} */
exports.MessageOptionsJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.FieldOptions} */
exports.FieldOptions; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.FieldOptionsJson} */
exports.FieldOptionsJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.FieldOptions_EditionDefault} */
exports.FieldOptions_EditionDefault; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.FieldOptions_EditionDefaultJson} */
exports.FieldOptions_EditionDefaultJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.FieldOptions_FeatureSupport} */
exports.FieldOptions_FeatureSupport; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.FieldOptions_FeatureSupportJson} */
exports.FieldOptions_FeatureSupportJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.FieldOptions_CTypeJson} */
exports.FieldOptions_CTypeJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.FieldOptions_JSTypeJson} */
exports.FieldOptions_JSTypeJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.FieldOptions_OptionRetentionJson} */
exports.FieldOptions_OptionRetentionJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.FieldOptions_OptionTargetTypeJson} */
exports.FieldOptions_OptionTargetTypeJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.OneofOptions} */
exports.OneofOptions; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.OneofOptionsJson} */
exports.OneofOptionsJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.EnumOptions} */
exports.EnumOptions; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.EnumOptionsJson} */
exports.EnumOptionsJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.EnumValueOptions} */
exports.EnumValueOptions; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.EnumValueOptionsJson} */
exports.EnumValueOptionsJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.ServiceOptions} */
exports.ServiceOptions; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.ServiceOptionsJson} */
exports.ServiceOptionsJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.MethodOptions} */
exports.MethodOptions; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.MethodOptionsJson} */
exports.MethodOptionsJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.MethodOptions_IdempotencyLevelJson} */
exports.MethodOptions_IdempotencyLevelJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.UninterpretedOption} */
exports.UninterpretedOption; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.UninterpretedOptionJson} */
exports.UninterpretedOptionJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.UninterpretedOption_NamePart} */
exports.UninterpretedOption_NamePart; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.UninterpretedOption_NamePartJson} */
exports.UninterpretedOption_NamePartJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.FeatureSet} */
exports.FeatureSet; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.FeatureSetJson} */
exports.FeatureSetJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.FeatureSet_VisibilityFeature} */
exports.FeatureSet_VisibilityFeature; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.FeatureSet_VisibilityFeatureJson} */
exports.FeatureSet_VisibilityFeatureJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.FeatureSet_VisibilityFeature_DefaultSymbolVisibilityJson} */
exports.FeatureSet_VisibilityFeature_DefaultSymbolVisibilityJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.FeatureSet_FieldPresenceJson} */
exports.FeatureSet_FieldPresenceJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.FeatureSet_EnumTypeJson} */
exports.FeatureSet_EnumTypeJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.FeatureSet_RepeatedFieldEncodingJson} */
exports.FeatureSet_RepeatedFieldEncodingJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.FeatureSet_Utf8ValidationJson} */
exports.FeatureSet_Utf8ValidationJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.FeatureSet_MessageEncodingJson} */
exports.FeatureSet_MessageEncodingJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.FeatureSet_JsonFormatJson} */
exports.FeatureSet_JsonFormatJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.FeatureSet_EnforceNamingStyleJson} */
exports.FeatureSet_EnforceNamingStyleJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.FeatureSetDefaults} */
exports.FeatureSetDefaults; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.FeatureSetDefaultsJson} */
exports.FeatureSetDefaultsJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.FeatureSetDefaults_FeatureSetEditionDefault} */
exports.FeatureSetDefaults_FeatureSetEditionDefault; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.FeatureSetDefaults_FeatureSetEditionDefaultJson} */
exports.FeatureSetDefaults_FeatureSetEditionDefaultJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.SourceCodeInfo} */
exports.SourceCodeInfo; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.SourceCodeInfoJson} */
exports.SourceCodeInfoJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.SourceCodeInfo_Location} */
exports.SourceCodeInfo_Location; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.SourceCodeInfo_LocationJson} */
exports.SourceCodeInfo_LocationJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.GeneratedCodeInfo} */
exports.GeneratedCodeInfo; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.GeneratedCodeInfoJson} */
exports.GeneratedCodeInfoJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.GeneratedCodeInfo_Annotation} */
exports.GeneratedCodeInfo_Annotation; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.GeneratedCodeInfo_AnnotationJson} */
exports.GeneratedCodeInfo_AnnotationJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.GeneratedCodeInfo_Annotation_SemanticJson} */
exports.GeneratedCodeInfo_Annotation_SemanticJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.EditionJson} */
exports.EditionJson; // re-export typedef
/** @typedef {!tsickle_descriptor_pb_8.SymbolVisibilityJson} */
exports.SymbolVisibilityJson; // re-export typedef
const duration_pb_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.duration_pb');
exports.file_google_protobuf_duration = duration_pb_js_1.file_google_protobuf_duration;
exports.DurationSchema = duration_pb_js_1.DurationSchema;
/** @typedef {!tsickle_duration_pb_9.Duration} */
exports.Duration; // re-export typedef
/** @typedef {!tsickle_duration_pb_9.DurationJson} */
exports.DurationJson; // re-export typedef
const empty_pb_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.empty_pb');
exports.file_google_protobuf_empty = empty_pb_js_1.file_google_protobuf_empty;
exports.EmptySchema = empty_pb_js_1.EmptySchema;
/** @typedef {!tsickle_empty_pb_10.Empty} */
exports.Empty; // re-export typedef
/** @typedef {!tsickle_empty_pb_10.EmptyJson} */
exports.EmptyJson; // re-export typedef
const field_mask_pb_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.field_mask_pb');
exports.file_google_protobuf_field_mask = field_mask_pb_js_1.file_google_protobuf_field_mask;
exports.FieldMaskSchema = field_mask_pb_js_1.FieldMaskSchema;
/** @typedef {!tsickle_field_mask_pb_11.FieldMask} */
exports.FieldMask; // re-export typedef
/** @typedef {!tsickle_field_mask_pb_11.FieldMaskJson} */
exports.FieldMaskJson; // re-export typedef
const go_features_pb_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.go_features_pb');
exports.file_google_protobuf_go_features = go_features_pb_js_1.file_google_protobuf_go_features;
exports.GoFeaturesSchema = go_features_pb_js_1.GoFeaturesSchema;
exports.GoFeatures_APILevel = go_features_pb_js_1.GoFeatures_APILevel;
exports.GoFeatures_APILevelSchema = go_features_pb_js_1.GoFeatures_APILevelSchema;
exports.GoFeatures_StripEnumPrefix = go_features_pb_js_1.GoFeatures_StripEnumPrefix;
exports.GoFeatures_StripEnumPrefixSchema = go_features_pb_js_1.GoFeatures_StripEnumPrefixSchema;
exports.go = go_features_pb_js_1.go;
/** @typedef {!tsickle_go_features_pb_12.GoFeatures} */
exports.GoFeatures; // re-export typedef
/** @typedef {!tsickle_go_features_pb_12.GoFeaturesJson} */
exports.GoFeaturesJson; // re-export typedef
/** @typedef {!tsickle_go_features_pb_12.GoFeatures_APILevelJson} */
exports.GoFeatures_APILevelJson; // re-export typedef
/** @typedef {!tsickle_go_features_pb_12.GoFeatures_StripEnumPrefixJson} */
exports.GoFeatures_StripEnumPrefixJson; // re-export typedef
const java_features_pb_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.java_features_pb');
exports.file_google_protobuf_java_features = java_features_pb_js_1.file_google_protobuf_java_features;
exports.JavaFeaturesSchema = java_features_pb_js_1.JavaFeaturesSchema;
exports.JavaFeatures_NestInFileClassFeatureSchema = java_features_pb_js_1.JavaFeatures_NestInFileClassFeatureSchema;
exports.JavaFeatures_NestInFileClassFeature_NestInFileClass = java_features_pb_js_1.JavaFeatures_NestInFileClassFeature_NestInFileClass;
exports.JavaFeatures_NestInFileClassFeature_NestInFileClassSchema = java_features_pb_js_1.JavaFeatures_NestInFileClassFeature_NestInFileClassSchema;
exports.JavaFeatures_Utf8Validation = java_features_pb_js_1.JavaFeatures_Utf8Validation;
exports.JavaFeatures_Utf8ValidationSchema = java_features_pb_js_1.JavaFeatures_Utf8ValidationSchema;
exports.java = java_features_pb_js_1.java;
/** @typedef {!tsickle_java_features_pb_13.JavaFeatures} */
exports.JavaFeatures; // re-export typedef
/** @typedef {!tsickle_java_features_pb_13.JavaFeaturesJson} */
exports.JavaFeaturesJson; // re-export typedef
/** @typedef {!tsickle_java_features_pb_13.JavaFeatures_NestInFileClassFeature} */
exports.JavaFeatures_NestInFileClassFeature; // re-export typedef
/** @typedef {!tsickle_java_features_pb_13.JavaFeatures_NestInFileClassFeatureJson} */
exports.JavaFeatures_NestInFileClassFeatureJson; // re-export typedef
/** @typedef {!tsickle_java_features_pb_13.JavaFeatures_NestInFileClassFeature_NestInFileClassJson} */
exports.JavaFeatures_NestInFileClassFeature_NestInFileClassJson; // re-export typedef
/** @typedef {!tsickle_java_features_pb_13.JavaFeatures_Utf8ValidationJson} */
exports.JavaFeatures_Utf8ValidationJson; // re-export typedef
const source_context_pb_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.source_context_pb');
exports.file_google_protobuf_source_context = source_context_pb_js_1.file_google_protobuf_source_context;
exports.SourceContextSchema = source_context_pb_js_1.SourceContextSchema;
/** @typedef {!tsickle_source_context_pb_14.SourceContext} */
exports.SourceContext; // re-export typedef
/** @typedef {!tsickle_source_context_pb_14.SourceContextJson} */
exports.SourceContextJson; // re-export typedef
const struct_pb_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.struct_pb');
exports.file_google_protobuf_struct = struct_pb_js_1.file_google_protobuf_struct;
exports.StructSchema = struct_pb_js_1.StructSchema;
exports.ValueSchema = struct_pb_js_1.ValueSchema;
exports.ListValueSchema = struct_pb_js_1.ListValueSchema;
exports.NullValue = struct_pb_js_1.NullValue;
exports.NullValueSchema = struct_pb_js_1.NullValueSchema;
/** @typedef {!tsickle_struct_pb_15.Struct} */
exports.Struct; // re-export typedef
/** @typedef {!tsickle_struct_pb_15.StructJson} */
exports.StructJson; // re-export typedef
/** @typedef {!tsickle_struct_pb_15.Value} */
exports.Value; // re-export typedef
/** @typedef {!tsickle_struct_pb_15.ValueJson} */
exports.ValueJson; // re-export typedef
/** @typedef {!tsickle_struct_pb_15.ListValue} */
exports.ListValue; // re-export typedef
/** @typedef {!tsickle_struct_pb_15.ListValueJson} */
exports.ListValueJson; // re-export typedef
/** @typedef {!tsickle_struct_pb_15.NullValueJson} */
exports.NullValueJson; // re-export typedef
const timestamp_pb_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.timestamp_pb');
exports.file_google_protobuf_timestamp = timestamp_pb_js_1.file_google_protobuf_timestamp;
exports.TimestampSchema = timestamp_pb_js_1.TimestampSchema;
/** @typedef {!tsickle_timestamp_pb_16.Timestamp} */
exports.Timestamp; // re-export typedef
/** @typedef {!tsickle_timestamp_pb_16.TimestampJson} */
exports.TimestampJson; // re-export typedef
const type_pb_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.type_pb');
exports.file_google_protobuf_type = type_pb_js_1.file_google_protobuf_type;
exports.TypeSchema = type_pb_js_1.TypeSchema;
exports.FieldSchema = type_pb_js_1.FieldSchema;
exports.Field_Kind = type_pb_js_1.Field_Kind;
exports.Field_KindSchema = type_pb_js_1.Field_KindSchema;
exports.Field_Cardinality = type_pb_js_1.Field_Cardinality;
exports.Field_CardinalitySchema = type_pb_js_1.Field_CardinalitySchema;
exports.EnumSchema = type_pb_js_1.EnumSchema;
exports.EnumValueSchema = type_pb_js_1.EnumValueSchema;
exports.OptionSchema = type_pb_js_1.OptionSchema;
exports.Syntax = type_pb_js_1.Syntax;
exports.SyntaxSchema = type_pb_js_1.SyntaxSchema;
/** @typedef {!tsickle_type_pb_17.Type} */
exports.Type; // re-export typedef
/** @typedef {!tsickle_type_pb_17.TypeJson} */
exports.TypeJson; // re-export typedef
/** @typedef {!tsickle_type_pb_17.Field} */
exports.Field; // re-export typedef
/** @typedef {!tsickle_type_pb_17.FieldJson} */
exports.FieldJson; // re-export typedef
/** @typedef {!tsickle_type_pb_17.Field_KindJson} */
exports.Field_KindJson; // re-export typedef
/** @typedef {!tsickle_type_pb_17.Field_CardinalityJson} */
exports.Field_CardinalityJson; // re-export typedef
/** @typedef {!tsickle_type_pb_17.Enum} */
exports.Enum; // re-export typedef
/** @typedef {!tsickle_type_pb_17.EnumJson} */
exports.EnumJson; // re-export typedef
/** @typedef {!tsickle_type_pb_17.EnumValue} */
exports.EnumValue; // re-export typedef
/** @typedef {!tsickle_type_pb_17.EnumValueJson} */
exports.EnumValueJson; // re-export typedef
/** @typedef {!tsickle_type_pb_17.Option} */
exports.Option; // re-export typedef
/** @typedef {!tsickle_type_pb_17.OptionJson} */
exports.OptionJson; // re-export typedef
/** @typedef {!tsickle_type_pb_17.SyntaxJson} */
exports.SyntaxJson; // re-export typedef
const wrappers_pb_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.wrappers_pb');
exports.file_google_protobuf_wrappers = wrappers_pb_js_1.file_google_protobuf_wrappers;
exports.DoubleValueSchema = wrappers_pb_js_1.DoubleValueSchema;
exports.FloatValueSchema = wrappers_pb_js_1.FloatValueSchema;
exports.Int64ValueSchema = wrappers_pb_js_1.Int64ValueSchema;
exports.UInt64ValueSchema = wrappers_pb_js_1.UInt64ValueSchema;
exports.Int32ValueSchema = wrappers_pb_js_1.Int32ValueSchema;
exports.UInt32ValueSchema = wrappers_pb_js_1.UInt32ValueSchema;
exports.BoolValueSchema = wrappers_pb_js_1.BoolValueSchema;
exports.StringValueSchema = wrappers_pb_js_1.StringValueSchema;
exports.BytesValueSchema = wrappers_pb_js_1.BytesValueSchema;
/** @typedef {!tsickle_wrappers_pb_18.DoubleValue} */
exports.DoubleValue; // re-export typedef
/** @typedef {!tsickle_wrappers_pb_18.DoubleValueJson} */
exports.DoubleValueJson; // re-export typedef
/** @typedef {!tsickle_wrappers_pb_18.FloatValue} */
exports.FloatValue; // re-export typedef
/** @typedef {!tsickle_wrappers_pb_18.FloatValueJson} */
exports.FloatValueJson; // re-export typedef
/** @typedef {!tsickle_wrappers_pb_18.Int64Value} */
exports.Int64Value; // re-export typedef
/** @typedef {!tsickle_wrappers_pb_18.Int64ValueJson} */
exports.Int64ValueJson; // re-export typedef
/** @typedef {!tsickle_wrappers_pb_18.UInt64Value} */
exports.UInt64Value; // re-export typedef
/** @typedef {!tsickle_wrappers_pb_18.UInt64ValueJson} */
exports.UInt64ValueJson; // re-export typedef
/** @typedef {!tsickle_wrappers_pb_18.Int32Value} */
exports.Int32Value; // re-export typedef
/** @typedef {!tsickle_wrappers_pb_18.Int32ValueJson} */
exports.Int32ValueJson; // re-export typedef
/** @typedef {!tsickle_wrappers_pb_18.UInt32Value} */
exports.UInt32Value; // re-export typedef
/** @typedef {!tsickle_wrappers_pb_18.UInt32ValueJson} */
exports.UInt32ValueJson; // re-export typedef
/** @typedef {!tsickle_wrappers_pb_18.BoolValue} */
exports.BoolValue; // re-export typedef
/** @typedef {!tsickle_wrappers_pb_18.BoolValueJson} */
exports.BoolValueJson; // re-export typedef
/** @typedef {!tsickle_wrappers_pb_18.StringValue} */
exports.StringValue; // re-export typedef
/** @typedef {!tsickle_wrappers_pb_18.StringValueJson} */
exports.StringValueJson; // re-export typedef
/** @typedef {!tsickle_wrappers_pb_18.BytesValue} */
exports.BytesValue; // re-export typedef
/** @typedef {!tsickle_wrappers_pb_18.BytesValueJson} */
exports.BytesValueJson; // re-export typedef
const plugin_pb_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.compiler.plugin_pb');
exports.file_google_protobuf_compiler_plugin = plugin_pb_js_1.file_google_protobuf_compiler_plugin;
exports.VersionSchema = plugin_pb_js_1.VersionSchema;
exports.CodeGeneratorRequestSchema = plugin_pb_js_1.CodeGeneratorRequestSchema;
exports.CodeGeneratorResponseSchema = plugin_pb_js_1.CodeGeneratorResponseSchema;
exports.CodeGeneratorResponse_FileSchema = plugin_pb_js_1.CodeGeneratorResponse_FileSchema;
exports.CodeGeneratorResponse_Feature = plugin_pb_js_1.CodeGeneratorResponse_Feature;
exports.CodeGeneratorResponse_FeatureSchema = plugin_pb_js_1.CodeGeneratorResponse_FeatureSchema;
/** @typedef {!tsickle_plugin_pb_19.Version} */
exports.Version; // re-export typedef
/** @typedef {!tsickle_plugin_pb_19.VersionJson} */
exports.VersionJson; // re-export typedef
/** @typedef {!tsickle_plugin_pb_19.CodeGeneratorRequest} */
exports.CodeGeneratorRequest; // re-export typedef
/** @typedef {!tsickle_plugin_pb_19.CodeGeneratorRequestJson} */
exports.CodeGeneratorRequestJson; // re-export typedef
/** @typedef {!tsickle_plugin_pb_19.CodeGeneratorResponse} */
exports.CodeGeneratorResponse; // re-export typedef
/** @typedef {!tsickle_plugin_pb_19.CodeGeneratorResponseJson} */
exports.CodeGeneratorResponseJson; // re-export typedef
/** @typedef {!tsickle_plugin_pb_19.CodeGeneratorResponse_File} */
exports.CodeGeneratorResponse_File; // re-export typedef
/** @typedef {!tsickle_plugin_pb_19.CodeGeneratorResponse_FileJson} */
exports.CodeGeneratorResponse_FileJson; // re-export typedef
/** @typedef {!tsickle_plugin_pb_19.CodeGeneratorResponse_FeatureJson} */
exports.CodeGeneratorResponse_FeatureJson; // re-export typedef
