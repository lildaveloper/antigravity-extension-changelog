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
 * Generated from: third_party/javascript/bufbuild_protobuf/src/codegenv2/service.ts
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
goog.module('google3.third_party.javascript.bufbuild_protobuf.src.codegenv2.service');
var module = module || { id: 'third_party/javascript/bufbuild_protobuf/src/codegenv2/service.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_types_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.codegenv2.types");
const tsickle_descriptors_2 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.descriptors");
/**
 * Hydrate a service descriptor.
 *
 * @template T
 * @param {!tsickle_descriptors_2.DescFile} file
 * @param {number} path
 * @param {...number} paths
 * @return {?}
 */
function serviceDesc(file, path, ...paths) {
    if (paths.length > 0) {
        throw new Error();
    }
    return (/** @type {?} */ (file.services[path]));
}
exports.serviceDesc = serviceDesc;
