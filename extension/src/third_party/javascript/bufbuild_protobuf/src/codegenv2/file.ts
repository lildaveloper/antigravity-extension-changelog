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
 * Generated from: third_party/javascript/bufbuild_protobuf/src/codegenv2/file.ts
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
goog.module('google3.third_party.javascript.bufbuild_protobuf.src.codegenv2.file');
var module = module || { id: 'third_party/javascript/bufbuild_protobuf/src/codegenv2/file.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_base64_encoding_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wire.base64$2dencoding");
const tsickle_descriptor_pb_2 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.descriptor_pb");
const tsickle_descriptors_3 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.descriptors");
const tsickle_registry_4 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.registry");
const tsickle_restore_json_names_5 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.codegenv2.restore$2djson$2dnames");
const tsickle_from_binary_6 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.from$2dbinary");
const base64_encoding_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wire.base64$2dencoding');
const descriptor_pb_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.descriptor_pb');
const registry_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.registry');
const restore_json_names_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.codegenv2.restore$2djson$2dnames');
const from_binary_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.from$2dbinary');
/**
 * Hydrate a file descriptor.
 *
 * @param {string} b64
 * @param {(undefined|!Array<!tsickle_descriptors_3.DescFile>)=} imports
 * @return {!tsickle_descriptors_3.DescFile}
 */
function fileDesc(b64, imports) {
    /** @type {?} */
    const root = (0, from_binary_js_1.fromBinary)(descriptor_pb_js_1.FileDescriptorProtoSchema, (0, base64_encoding_js_1.base64Decode)(b64));
    root.messageType.forEach(restore_json_names_js_1.restoreJsonNames);
    root.dependency = imports?.map((/**
     * @param {!tsickle_descriptors_3.DescFile} f
     * @return {string}
     */
    (f) => f.proto.name)) ?? [];
    /** @type {!tsickle_registry_4.FileRegistry} */
    const reg = (0, registry_js_1.createFileRegistry)(root, (/**
     * @param {string} protoFileName
     * @return {(undefined|!tsickle_descriptors_3.DescFile)}
     */
    (protoFileName) => imports?.find((/**
     * @param {!tsickle_descriptors_3.DescFile} f
     * @return {boolean}
     */
    (f) => f.proto.name === protoFileName))));
    // biome-ignore lint/style/noNonNullAssertion: non-null assertion because we just created the registry from the file we look up
    return (/** @type {!tsickle_descriptors_3.DescFile} */ (reg.getFile(root.name)));
}
exports.fileDesc = fileDesc;
