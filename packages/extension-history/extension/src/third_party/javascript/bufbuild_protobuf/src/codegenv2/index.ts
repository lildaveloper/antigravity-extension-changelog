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
 * Generated from: third_party/javascript/bufbuild_protobuf/src/codegenv2/index.ts
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
goog.module('google3.third_party.javascript.bufbuild_protobuf.src.codegenv2.index');
var module = module || { id: 'third_party/javascript/bufbuild_protobuf/src/codegenv2/index.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_boot_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.codegenv2.boot");
const tsickle_embed_2 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.codegenv2.embed");
const tsickle_enum_3 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.codegenv2.enum");
const tsickle_extension_4 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.codegenv2.extension");
const tsickle_file_5 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.codegenv2.file");
const tsickle_message_6 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.codegenv2.message");
const tsickle_service_7 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.codegenv2.service");
const tsickle_symbols_8 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.codegenv2.symbols");
const tsickle_scalar_9 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.codegenv2.scalar");
const tsickle_types_10 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.codegenv2.types");
const boot_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.codegenv2.boot');
exports.boot = boot_js_1.boot;
exports.bootFileDescriptorProto = boot_js_1.bootFileDescriptorProto;
/** @typedef {!tsickle_boot_1.FileDescriptorProtoBoot} */
exports.FileDescriptorProtoBoot; // re-export typedef
/** @typedef {!tsickle_boot_1.DescriptorProtoBoot} */
exports.DescriptorProtoBoot; // re-export typedef
/** @typedef {!tsickle_boot_1.FieldDescriptorProtoBoot} */
exports.FieldDescriptorProtoBoot; // re-export typedef
/** @typedef {!tsickle_boot_1.FieldOptionsBoot} */
exports.FieldOptionsBoot; // re-export typedef
/** @typedef {!tsickle_boot_1.FieldOptions_EditionDefaultBoot} */
exports.FieldOptions_EditionDefaultBoot; // re-export typedef
/** @typedef {!tsickle_boot_1.EnumDescriptorProtoBoot} */
exports.EnumDescriptorProtoBoot; // re-export typedef
/** @typedef {!tsickle_boot_1.EnumValueDescriptorProtoBoot} */
exports.EnumValueDescriptorProtoBoot; // re-export typedef
const embed_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.codegenv2.embed');
exports.embedFileDesc = embed_js_1.embedFileDesc;
exports.pathInFileDesc = embed_js_1.pathInFileDesc;
exports.createFileDescriptorProtoBoot = embed_js_1.createFileDescriptorProtoBoot;
const enum_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.codegenv2.enum');
exports.enumDesc = enum_js_1.enumDesc;
exports.tsEnum = enum_js_1.tsEnum;
const extension_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.codegenv2.extension');
exports.extDesc = extension_js_1.extDesc;
const file_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.codegenv2.file');
exports.fileDesc = file_js_1.fileDesc;
const message_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.codegenv2.message');
exports.messageDesc = message_js_1.messageDesc;
const service_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.codegenv2.service');
exports.serviceDesc = service_js_1.serviceDesc;
const symbols_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.codegenv2.symbols');
exports.packageName = symbols_js_1.packageName;
exports.wktPublicImportPaths = symbols_js_1.wktPublicImportPaths;
exports.symbols = symbols_js_1.symbols;
const scalar_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.codegenv2.scalar');
exports.scalarTypeScriptType = scalar_js_1.scalarTypeScriptType;
exports.scalarJsonType = scalar_js_1.scalarJsonType;
const types_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.codegenv2.types');
/** @typedef {!tsickle_types_10.GenFile} */
exports.GenFile; // re-export typedef
/** @typedef {!tsickle_types_10.GenMessage} */
exports.GenMessage; // re-export typedef
/** @typedef {!tsickle_types_10.GenEnum} */
exports.GenEnum; // re-export typedef
/** @typedef {!tsickle_types_10.GenExtension} */
exports.GenExtension; // re-export typedef
/** @typedef {!tsickle_types_10.GenService} */
exports.GenService; // re-export typedef
/** @typedef {!tsickle_types_10.GenServiceMethods} */
exports.GenServiceMethods; // re-export typedef
