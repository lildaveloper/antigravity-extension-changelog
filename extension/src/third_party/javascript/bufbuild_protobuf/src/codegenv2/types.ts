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
 * Generated from: third_party/javascript/bufbuild_protobuf/src/codegenv2/types.ts
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
goog.module('google3.third_party.javascript.bufbuild_protobuf.src.codegenv2.types');
var module = module || { id: 'third_party/javascript/bufbuild_protobuf/src/codegenv2/types.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_types_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.types");
const tsickle_descriptors_2 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.descriptors");
const tsickle_json_value_3 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.json$2dvalue");
/**
 * Describes a protobuf source file.
 *
 * @typedef {!tsickle_descriptors_2.DescFile}
 */
exports.GenFile;
/**
 * Describes a message declaration in a protobuf source file.
 *
 * This type is identical to DescMessage, but carries additional type
 * information.
 *
 * @typedef {?}
 */
exports.GenMessage;
/**
 * Describes an enumeration in a protobuf source file.
 *
 * This type is identical to DescEnum, but carries additional type
 * information.
 *
 * @typedef {?}
 */
exports.GenEnum;
/**
 * Describes an extension in a protobuf source file.
 *
 * This type is identical to DescExtension, but carries additional type
 * information.
 *
 * @typedef {?}
 */
exports.GenExtension;
/**
 * Describes a service declaration in a protobuf source file.
 *
 * This type is identical to DescService, but carries additional type
 * information.
 *
 * @typedef {?}
 */
exports.GenService;
/** @typedef {?} */
exports.GenServiceMethods;
/**
 * @template A, B
 */
class brandv2 {
    constructor() {
        this.v = (/** @type {string} */ ("codegenv2"));
        this.a = false;
        this.b = false;
    }
}
/* istanbul ignore if */
if (false) {
    /**
     * @type {string}
     * @protected
     */
    brandv2.prototype.v;
    /**
     * @type {(boolean|A)}
     * @protected
     */
    brandv2.prototype.a;
    /**
     * @type {(boolean|B)}
     * @protected
     */
    brandv2.prototype.b;
}
/**
 * Union of the property names of all fields, including oneof members.
 * For an anonymous message (no generated message shape), it's simply a string.
 * @typedef {?}
 */
var MessageFieldNames;
/** @typedef {{case: (undefined|?), value: *}} */
var Oneof;
