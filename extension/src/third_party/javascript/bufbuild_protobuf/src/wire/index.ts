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
 * Generated from: third_party/javascript/bufbuild_protobuf/src/wire/index.ts
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
goog.module('google3.third_party.javascript.bufbuild_protobuf.src.wire.index');
var module = module || { id: 'third_party/javascript/bufbuild_protobuf/src/wire/index.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_binary_encoding_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wire.binary$2dencoding");
const tsickle_base64_encoding_2 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wire.base64$2dencoding");
const tsickle_text_encoding_3 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wire.text$2dencoding");
const tsickle_text_format_4 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wire.text$2dformat");
const tsickle_size_delimited_5 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wire.size$2ddelimited");
const binary_encoding_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wire.binary$2dencoding');
exports.WireType = binary_encoding_js_1.WireType;
exports.FLOAT32_MAX = binary_encoding_js_1.FLOAT32_MAX;
exports.FLOAT32_MIN = binary_encoding_js_1.FLOAT32_MIN;
exports.UINT32_MAX = binary_encoding_js_1.UINT32_MAX;
exports.INT32_MAX = binary_encoding_js_1.INT32_MAX;
exports.INT32_MIN = binary_encoding_js_1.INT32_MIN;
exports.BinaryWriter = binary_encoding_js_1.BinaryWriter;
exports.BinaryReader = binary_encoding_js_1.BinaryReader;
const base64_encoding_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wire.base64$2dencoding');
exports.base64Decode = base64_encoding_js_1.base64Decode;
exports.base64Encode = base64_encoding_js_1.base64Encode;
const text_encoding_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wire.text$2dencoding');
exports.configureTextEncoding = text_encoding_js_1.configureTextEncoding;
exports.getTextEncoding = text_encoding_js_1.getTextEncoding;
const text_format_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wire.text$2dformat');
exports.parseTextFormatEnumValue = text_format_js_1.parseTextFormatEnumValue;
exports.parseTextFormatScalarValue = text_format_js_1.parseTextFormatScalarValue;
const size_delimited_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wire.size$2ddelimited');
exports.sizeDelimitedEncode = size_delimited_js_1.sizeDelimitedEncode;
exports.sizeDelimitedDecodeStream = size_delimited_js_1.sizeDelimitedDecodeStream;
exports.sizeDelimitedPeek = size_delimited_js_1.sizeDelimitedPeek;
