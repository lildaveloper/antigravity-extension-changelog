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
 * Generated from: third_party/javascript/bufbuild_protobuf/src/codegenv2/restore-json-names.ts
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
goog.module('google3.third_party.javascript.bufbuild_protobuf.src.codegenv2.restore$2djson$2dnames');
var module = module || { id: 'third_party/javascript/bufbuild_protobuf/src/codegenv2/restore-json-names.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_descriptor_pb_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.descriptor_pb");
const tsickle_names_2 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.names");
const tsickle_unsafe_3 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.unsafe");
const names_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.reflect.names');
const unsafe_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.reflect.unsafe');
/**
 * @param {?} message
 * @return {void}
 */
function restoreJsonNames(message) {
    for (const f of message.field) {
        if (!(0, unsafe_js_1.unsafeIsSetExplicit)(f, "jsonName")) {
            f.jsonName = (0, names_js_1.protoCamelCase)(f.name);
        }
    }
    message.nestedType.forEach(restoreJsonNames);
}
exports.restoreJsonNames = restoreJsonNames;
