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
 * Generated from: third_party/javascript/bufbuild_protobuf/src/index.ts
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
goog.module('google3.third_party.javascript.bufbuild_protobuf.src.index');
var module = module || { id: 'third_party/javascript/bufbuild_protobuf/src/index.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_types_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.types");
const tsickle_is_message_2 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.is$2dmessage");
const tsickle_create_3 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.create");
const tsickle_clone_4 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.clone");
const tsickle_descriptors_5 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.descriptors");
const tsickle_equals_6 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.equals");
const tsickle_fields_7 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.fields");
const tsickle_registry_8 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.registry");
const tsickle_json_value_9 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.json$2dvalue");
const tsickle_to_binary_10 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.to$2dbinary");
const tsickle_from_binary_11 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.from$2dbinary");
const tsickle_to_json_12 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.to$2djson");
const tsickle_from_json_13 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.from$2djson");
const tsickle_merge_14 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.merge");
const tsickle_extensions_15 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.extensions");
const tsickle_proto_int64_16 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.proto$2dint64");
const types_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.types');
/** @typedef {!tsickle_types_1.Message} */
exports.Message; // re-export typedef
/** @typedef {!tsickle_types_1.MessageShape} */
exports.MessageShape; // re-export typedef
/** @typedef {!tsickle_types_1.MessageJsonType} */
exports.MessageJsonType; // re-export typedef
/** @typedef {!tsickle_types_1.MessageValidType} */
exports.MessageValidType; // re-export typedef
/** @typedef {!tsickle_types_1.MessageInitShape} */
exports.MessageInitShape; // re-export typedef
/** @typedef {!tsickle_types_1.EnumShape} */
exports.EnumShape; // re-export typedef
/** @typedef {!tsickle_types_1.EnumJsonType} */
exports.EnumJsonType; // re-export typedef
/** @typedef {!tsickle_types_1.ExtensionValueShape} */
exports.ExtensionValueShape; // re-export typedef
/** @typedef {!tsickle_types_1.Extendee} */
exports.Extendee; // re-export typedef
/** @typedef {!tsickle_types_1.UnknownField} */
exports.UnknownField; // re-export typedef
/** @typedef {!tsickle_types_1.DescMethodStreaming} */
exports.DescMethodStreaming; // re-export typedef
/** @typedef {!tsickle_types_1.DescMethodUnary} */
exports.DescMethodUnary; // re-export typedef
/** @typedef {!tsickle_types_1.DescMethodServerStreaming} */
exports.DescMethodServerStreaming; // re-export typedef
/** @typedef {!tsickle_types_1.DescMethodClientStreaming} */
exports.DescMethodClientStreaming; // re-export typedef
/** @typedef {!tsickle_types_1.DescMethodBiDiStreaming} */
exports.DescMethodBiDiStreaming; // re-export typedef
const is_message_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.is$2dmessage');
exports.isMessage = is_message_js_1.isMessage;
const create_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.create');
exports.create = create_js_1.create;
const clone_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.clone');
exports.clone = clone_js_1.clone;
const descriptors_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.descriptors');
exports.ScalarType = descriptors_js_1.ScalarType;
/** @typedef {!tsickle_descriptors_5.SupportedEdition} */
exports.SupportedEdition; // re-export typedef
/** @typedef {!tsickle_descriptors_5.AnyDesc} */
exports.AnyDesc; // re-export typedef
/** @typedef {!tsickle_descriptors_5.DescFile} */
exports.DescFile; // re-export typedef
/** @typedef {!tsickle_descriptors_5.DescEnum} */
exports.DescEnum; // re-export typedef
/** @typedef {!tsickle_descriptors_5.DescEnumValue} */
exports.DescEnumValue; // re-export typedef
/** @typedef {!tsickle_descriptors_5.DescMessage} */
exports.DescMessage; // re-export typedef
/** @typedef {!tsickle_descriptors_5.DescField} */
exports.DescField; // re-export typedef
/** @typedef {!tsickle_descriptors_5.DescExtension} */
exports.DescExtension; // re-export typedef
/** @typedef {!tsickle_descriptors_5.DescOneof} */
exports.DescOneof; // re-export typedef
/** @typedef {!tsickle_descriptors_5.DescService} */
exports.DescService; // re-export typedef
/** @typedef {!tsickle_descriptors_5.DescMethod} */
exports.DescMethod; // re-export typedef
/** @typedef {!tsickle_descriptors_5.DescComments} */
exports.DescComments; // re-export typedef
const equals_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.equals');
exports.equals = equals_js_1.equals;
const fields_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.fields');
exports.isFieldSet = fields_js_1.isFieldSet;
exports.clearField = fields_js_1.clearField;
const registry_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.registry');
exports.createRegistry = registry_js_1.createRegistry;
exports.createMutableRegistry = registry_js_1.createMutableRegistry;
exports.createFileRegistry = registry_js_1.createFileRegistry;
exports.minimumEdition = registry_js_1.minimumEdition;
exports.maximumEdition = registry_js_1.maximumEdition;
/** @typedef {!tsickle_registry_8.Registry} */
exports.Registry; // re-export typedef
/** @typedef {!tsickle_registry_8.MutableRegistry} */
exports.MutableRegistry; // re-export typedef
/** @typedef {!tsickle_registry_8.FileRegistry} */
exports.FileRegistry; // re-export typedef
/** @typedef {!tsickle_json_value_9.JsonValue} */
exports.JsonValue; // type-only export
/** @typedef {!tsickle_json_value_9.JsonObject} */
exports.JsonObject; // type-only export
const to_binary_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.to$2dbinary');
exports.toBinary = to_binary_js_1.toBinary;
/** @typedef {!tsickle_to_binary_10.BinaryWriteOptions} */
exports.BinaryWriteOptions; // type-only export
const from_binary_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.from$2dbinary');
exports.fromBinary = from_binary_js_1.fromBinary;
exports.mergeFromBinary = from_binary_js_1.mergeFromBinary;
/** @typedef {!tsickle_from_binary_11.BinaryReadOptions} */
exports.BinaryReadOptions; // type-only export
const to_json_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.to$2djson');
exports.toJson = to_json_js_1.toJson;
exports.toJsonString = to_json_js_1.toJsonString;
exports.enumToJson = to_json_js_1.enumToJson;
/** @typedef {!tsickle_to_json_12.JsonWriteOptions} */
exports.JsonWriteOptions; // re-export typedef
/** @typedef {!tsickle_to_json_12.JsonWriteStringOptions} */
exports.JsonWriteStringOptions; // re-export typedef
const from_json_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.from$2djson');
exports.fromJsonString = from_json_js_1.fromJsonString;
exports.mergeFromJsonString = from_json_js_1.mergeFromJsonString;
exports.fromJson = from_json_js_1.fromJson;
exports.mergeFromJson = from_json_js_1.mergeFromJson;
exports.enumFromJson = from_json_js_1.enumFromJson;
exports.isEnumJson = from_json_js_1.isEnumJson;
/** @typedef {!tsickle_from_json_13.JsonReadOptions} */
exports.JsonReadOptions; // re-export typedef
const merge_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.merge');
exports.merge = merge_js_1.merge;
const extensions_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.extensions');
exports.hasExtension = extensions_js_1.hasExtension;
exports.getExtension = extensions_js_1.getExtension;
exports.setExtension = extensions_js_1.setExtension;
exports.clearExtension = extensions_js_1.clearExtension;
exports.hasOption = extensions_js_1.hasOption;
exports.getOption = extensions_js_1.getOption;
const proto_int64_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.proto$2dint64');
exports.protoInt64 = proto_int64_js_1.protoInt64;
