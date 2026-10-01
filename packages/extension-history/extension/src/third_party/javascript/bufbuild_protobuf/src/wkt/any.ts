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
 * Generated from: third_party/javascript/bufbuild_protobuf/src/wkt/any.ts
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
goog.module('google3.third_party.javascript.bufbuild_protobuf.src.wkt.any');
var module = module || { id: 'third_party/javascript/bufbuild_protobuf/src/wkt/any.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_types_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.types");
const tsickle_any_pb_2 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.any_pb");
const tsickle_descriptors_3 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.descriptors");
const tsickle_registry_4 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.registry");
const tsickle_create_5 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.create");
const tsickle_to_binary_6 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.to$2dbinary");
const tsickle_from_binary_7 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.from$2dbinary");
const any_pb_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.any_pb');
const create_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.create');
const to_binary_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.to$2dbinary');
const from_binary_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.from$2dbinary');
/**
 * @template Desc
 * @param {Desc} schema
 * @param {?} message
 * @param {(undefined|?)=} into
 * @return {(undefined|?)}
 */
function anyPack(schema, message, into) {
    /** @type {boolean} */
    let ret = false;
    if (!into) {
        into = (0, create_js_1.create)(any_pb_js_1.AnySchema);
        ret = true;
    }
    into.value = (0, to_binary_js_1.toBinary)(schema, message);
    into.typeUrl = typeNameToUrl((/** @type {*} */ (message)).$typeName);
    return ret ? into : undefined;
}
exports.anyPack = anyPack;
/**
 * @param {?} any
 * @param {(string|!tsickle_descriptors_3.DescMessage)} descOrTypeName
 * @return {boolean}
 */
function anyIs(any, descOrTypeName) {
    if (any.typeUrl === "") {
        return false;
    }
    /** @type {string} */
    const want = typeof descOrTypeName == "string"
        ? descOrTypeName
        : (/** @type {!tsickle_descriptors_3.DescMessage} */ (descOrTypeName)).typeName;
    /** @type {string} */
    const got = typeUrlToName(any.typeUrl);
    return want === got;
}
exports.anyIs = anyIs;
/**
 * @param {?} any
 * @param {(!tsickle_descriptors_3.DescMessage|!tsickle_registry_4.Registry)} registryOrMessageDesc
 * @return {(undefined|*)}
 */
function anyUnpack(any, registryOrMessageDesc) {
    if (any.typeUrl === "") {
        return undefined;
    }
    /** @type {(undefined|!tsickle_descriptors_3.DescMessage)} */
    const desc = registryOrMessageDesc.kind == "message"
        ? registryOrMessageDesc
        : (/** @type {!tsickle_registry_4.Registry} */ (registryOrMessageDesc)).getMessage(typeUrlToName(any.typeUrl));
    if (!desc || !anyIs(any, desc)) {
        return undefined;
    }
    return (0, from_binary_js_1.fromBinary)(desc, any.value);
}
exports.anyUnpack = anyUnpack;
/**
 * Same as anyUnpack but unpacks into the target message.
 * @template Desc
 * @param {?} any
 * @param {Desc} schema
 * @param {?} message
 * @return {(undefined|?)}
 */
function anyUnpackTo(any, schema, message) {
    if (!anyIs(any, schema)) {
        return undefined;
    }
    return (0, from_binary_js_1.mergeFromBinary)(schema, message, any.value);
}
exports.anyUnpackTo = anyUnpackTo;
/**
 * @param {string} name
 * @return {string}
 */
function typeNameToUrl(name) {
    return `type.googleapis.com/${name}`;
}
/**
 * @param {string} url
 * @return {string}
 */
function typeUrlToName(url) {
    /** @type {number} */
    const slash = url.lastIndexOf("/");
    /** @type {string} */
    const name = slash >= 0 ? url.substring(slash + 1) : url;
    if (!name.length) {
        throw new Error(`invalid type url: ${url}`);
    }
    return name;
}
