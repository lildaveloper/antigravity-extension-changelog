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
 * Generated from: third_party/javascript/bufbuild_protobuf/src/reflect/names.ts
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
goog.module('google3.third_party.javascript.bufbuild_protobuf.src.reflect.names');
var module = module || { id: 'third_party/javascript/bufbuild_protobuf/src/reflect/names.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_descriptors_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.descriptors");
/**
 * Return a fully-qualified name for a Protobuf descriptor.
 * For a file descriptor, return the original file path.
 *
 * See https://protobuf.com/docs/language-spec#fully-qualified-names
 * @param {(!tsickle_descriptors_1.DescEnum|!tsickle_descriptors_1.DescEnumValue|!tsickle_descriptors_1.DescFile|!tsickle_descriptors_1.DescMessage|!tsickle_descriptors_1.DescMethod|!tsickle_descriptors_1.DescOneof|!tsickle_descriptors_1.DescService|?)} desc
 * @return {string}
 */
function qualifiedName(desc) {
    switch (desc.kind) {
        case "field":
        case "oneof":
        case "rpc":
            return (/** @type {(!tsickle_descriptors_1.DescMethod|!tsickle_descriptors_1.DescOneof|?)} */ (desc)).parent.typeName + "." + (/** @type {(!tsickle_descriptors_1.DescMethod|!tsickle_descriptors_1.DescOneof|?)} */ (desc)).name;
        case "enum_value": {
            /** @type {string} */
            const p = (/** @type {!tsickle_descriptors_1.DescEnumValue} */ (desc)).parent.parent
                ? (/** @type {!tsickle_descriptors_1.DescEnumValue} */ (desc)).parent.parent.typeName
                : (/** @type {!tsickle_descriptors_1.DescEnumValue} */ (desc)).parent.file.proto.package;
            return p + (p.length > 0 ? "." : "") + (/** @type {!tsickle_descriptors_1.DescEnumValue} */ (desc)).name;
        }
        case "service":
        case "message":
        case "enum":
        case "extension":
            return (/** @type {(!tsickle_descriptors_1.DescEnum|!tsickle_descriptors_1.DescMessage|!tsickle_descriptors_1.DescService|?)} */ (desc)).typeName;
        case "file":
            return (/** @type {!tsickle_descriptors_1.DescFile} */ (desc)).proto.name;
    }
}
exports.qualifiedName = qualifiedName;
/**
 * Converts snake_case to protoCamelCase according to the convention
 * used by protoc to convert a field name to a JSON name.
 * @param {string} snakeCase
 * @return {string}
 */
function protoCamelCase(snakeCase) {
    /** @type {boolean} */
    let capNext = false;
    /** @type {!Array<?>} */
    const b = [];
    for (let i = 0; i < snakeCase.length; i++) {
        /** @type {string} */
        let c = snakeCase.charAt(i);
        switch (c) {
            case "_":
                capNext = true;
                break;
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                b.push(c);
                capNext = false;
                break;
            default:
                if (capNext) {
                    capNext = false;
                    c = c.toUpperCase();
                }
                b.push(c);
                break;
        }
    }
    return (/** @type {!Array<string>} */ (b)).join("");
}
exports.protoCamelCase = protoCamelCase;
/**
 * Names that cannot be used for object properties because they are reserved
 * by built-in JavaScript properties.
 * @type {!Set<string>}
 */
const reservedObjectProperties = new Set([
    // names reserved by JavaScript
    "constructor",
    "toString",
    "toJSON",
    "valueOf",
]);
/**
 * Escapes names that are reserved for ECMAScript built-in object properties.
 *
 * Also see safeIdentifier() from \@bufbuild/protoplugin.
 * @param {string} name
 * @return {string}
 */
function safeObjectProperty(name) {
    return reservedObjectProperties.has(name) ? name + "$" : name;
}
exports.safeObjectProperty = safeObjectProperty;
