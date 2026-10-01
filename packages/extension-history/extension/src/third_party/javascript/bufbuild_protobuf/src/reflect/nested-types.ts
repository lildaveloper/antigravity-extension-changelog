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
 * Generated from: third_party/javascript/bufbuild_protobuf/src/reflect/nested-types.ts
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
goog.module('google3.third_party.javascript.bufbuild_protobuf.src.reflect.nested$2dtypes');
var module = module || { id: 'third_party/javascript/bufbuild_protobuf/src/reflect/nested-types.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_descriptors_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.descriptors");
/**
 * Iterate over all types - enumerations, extensions, services, messages -
 * and enumerations, extensions and messages nested in messages.
 * @param {(!tsickle_descriptors_1.DescFile|!tsickle_descriptors_1.DescMessage)} desc
 * @return {!Iterable<(!tsickle_descriptors_1.DescEnum|!tsickle_descriptors_1.DescMessage|!tsickle_descriptors_1.DescService|?), ?, ?>}
 */
function* nestedTypes(desc) {
    switch (desc.kind) {
        case "file":
            for (const message of (/** @type {!tsickle_descriptors_1.DescFile} */ (desc)).messages) {
                yield message;
                yield* nestedTypes(message);
            }
            yield* (/** @type {!tsickle_descriptors_1.DescFile} */ (desc)).enums;
            yield* (/** @type {!tsickle_descriptors_1.DescFile} */ (desc)).services;
            yield* (/** @type {!tsickle_descriptors_1.DescFile} */ (desc)).extensions;
            break;
        case "message":
            for (const message of (/** @type {!tsickle_descriptors_1.DescMessage} */ (desc)).nestedMessages) {
                yield message;
                yield* nestedTypes(message);
            }
            yield* (/** @type {!tsickle_descriptors_1.DescMessage} */ (desc)).nestedEnums;
            yield* (/** @type {!tsickle_descriptors_1.DescMessage} */ (desc)).nestedExtensions;
            break;
    }
}
exports.nestedTypes = nestedTypes;
/**
 * Iterate over types referenced by fields of the given message.
 *
 * For example:
 *
 * ```proto
 * syntax="proto3";
 *
 * message Example {
 *   Msg singular = 1;
 *   repeated Level list = 2;
 * }
 *
 * message Msg {}
 *
 * enum Level {
 *   LEVEL_UNSPECIFIED = 0;
 * }
 * ```
 *
 * The message Example references the message Msg, and the enum Level.
 * @param {!tsickle_descriptors_1.DescMessage} descMessage
 * @return {!Iterable<(!tsickle_descriptors_1.DescEnum|!tsickle_descriptors_1.DescMessage), ?, ?>}
 */
function usedTypes(descMessage) {
    return usedTypesInternal(descMessage, new Set());
}
exports.usedTypes = usedTypes;
/**
 * @param {!tsickle_descriptors_1.DescMessage} descMessage
 * @param {!Set<string>} seen
 * @return {!Iterable<(!tsickle_descriptors_1.DescEnum|!tsickle_descriptors_1.DescMessage), ?, ?>}
 */
function* usedTypesInternal(descMessage, seen) {
    for (const field of descMessage.fields) {
        /** @type {(undefined|!tsickle_descriptors_1.DescEnum|!tsickle_descriptors_1.DescMessage)} */
        const ref = field.enum ?? field.message ?? undefined;
        if (!ref || seen.has(ref.typeName)) {
            continue;
        }
        seen.add(ref.typeName);
        yield ref;
        if (ref.kind == "message") {
            yield* usedTypesInternal(ref, seen);
        }
    }
}
/**
 * Returns the ancestors of a given Protobuf element, up to the file.
 * @param {(!tsickle_descriptors_1.DescEnum|!tsickle_descriptors_1.DescEnumValue|!tsickle_descriptors_1.DescFile|!tsickle_descriptors_1.DescMessage|!tsickle_descriptors_1.DescMethod|!tsickle_descriptors_1.DescOneof|!tsickle_descriptors_1.DescService|?)} desc
 * @return {!Array<(!tsickle_descriptors_1.DescEnum|!tsickle_descriptors_1.DescFile|!tsickle_descriptors_1.DescMessage|!tsickle_descriptors_1.DescService)>}
 */
function parentTypes(desc) {
    /** @type {!Array<(!tsickle_descriptors_1.DescEnum|!tsickle_descriptors_1.DescFile|!tsickle_descriptors_1.DescMessage|!tsickle_descriptors_1.DescService)>} */
    const parents = [];
    while (desc.kind !== "file") {
        /** @type {(!tsickle_descriptors_1.DescEnum|!tsickle_descriptors_1.DescFile|!tsickle_descriptors_1.DescMessage|!tsickle_descriptors_1.DescService)} */
        const p = parent(desc);
        desc = p;
        parents.push(p);
    }
    return parents;
}
exports.parentTypes = parentTypes;
/** @typedef {(!tsickle_descriptors_1.DescEnum|!tsickle_descriptors_1.DescFile|!tsickle_descriptors_1.DescMessage|!tsickle_descriptors_1.DescService)} */
var Parent;
/**
 * @param {(!tsickle_descriptors_1.DescEnum|!tsickle_descriptors_1.DescEnumValue|!tsickle_descriptors_1.DescMessage|!tsickle_descriptors_1.DescMethod|!tsickle_descriptors_1.DescOneof|!tsickle_descriptors_1.DescService|?)} desc
 * @return {(!tsickle_descriptors_1.DescEnum|!tsickle_descriptors_1.DescFile|!tsickle_descriptors_1.DescMessage|!tsickle_descriptors_1.DescService)}
 */
function parent(desc) {
    switch (desc.kind) {
        case "enum_value":
        case "field":
        case "oneof":
        case "rpc":
            return (/** @type {(!tsickle_descriptors_1.DescEnumValue|!tsickle_descriptors_1.DescMethod|!tsickle_descriptors_1.DescOneof|?)} */ (desc)).parent;
        case "service":
            return (/** @type {!tsickle_descriptors_1.DescService} */ (desc)).file;
        case "extension":
        case "enum":
        case "message":
            return (/** @type {(!tsickle_descriptors_1.DescEnum|!tsickle_descriptors_1.DescMessage|?)} */ (desc)).parent ?? (/** @type {(!tsickle_descriptors_1.DescEnum|!tsickle_descriptors_1.DescMessage|?)} */ (desc)).file;
    }
}
