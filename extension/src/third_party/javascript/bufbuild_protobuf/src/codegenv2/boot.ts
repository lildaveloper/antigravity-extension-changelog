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
 * Generated from: third_party/javascript/bufbuild_protobuf/src/codegenv2/boot.ts
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
goog.module('google3.third_party.javascript.bufbuild_protobuf.src.codegenv2.boot');
var module = module || { id: 'third_party/javascript/bufbuild_protobuf/src/codegenv2/boot.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_descriptor_pb_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.descriptor_pb");
const tsickle_descriptors_2 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.descriptors");
const tsickle_restore_json_names_3 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.codegenv2.restore$2djson$2dnames");
const tsickle_registry_4 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.registry");
const restore_json_names_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.codegenv2.restore$2djson$2dnames');
const registry_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.registry');
/**
 * Hydrate a file descriptor for google/protobuf/descriptor.proto from a plain
 * object.
 *
 * See createFileDescriptorProtoBoot() for details.
 *
 * @param {{name: string, package: string, messageType: !Array<{name: string, field: (undefined|!Array<{name: string, number: number, label: (undefined|!tsickle_descriptor_pb_1.FieldDescriptorProto_Label), type: !tsickle_descriptor_pb_1.FieldDescriptorProto_Type, typeName: (undefined|string), extendee: (undefined|string), defaultValue: (undefined|string), options: (undefined|{packed: (undefined|boolean), deprecated: (undefined|boolean), retention: (undefined|!tsickle_descriptor_pb_1.FieldOptions_OptionRetention), targets: (undefined|!Array<!tsickle_descriptor_pb_1.FieldOptions_OptionTargetType>), editionDefaults: (undefined|!Array<?>)})}>), nestedType: (undefined|?), enumType: (undefined|!Array<{name: string, value: !Array<?>}>), extensionRange: (undefined|!Array<?>)}>, enumType: !Array<{name: string, value: !Array<?>}>}} boot
 * @return {!tsickle_descriptors_2.DescFile}
 */
function boot(boot) {
    /** @type {?} */
    const root = bootFileDescriptorProto(boot);
    root.messageType.forEach(restore_json_names_js_1.restoreJsonNames);
    /** @type {!tsickle_registry_4.FileRegistry} */
    const reg = (0, registry_js_1.createFileRegistry)(root, (/**
     * @return {undefined}
     */
    () => undefined));
    // biome-ignore lint/style/noNonNullAssertion: non-null assertion because we just created the registry from the file we look up
    return (/** @type {!tsickle_descriptors_2.DescFile} */ (reg.getFile(root.name)));
}
exports.boot = boot;
/**
 * An object literal for initializing the message google.protobuf.FileDescriptorProto
 * for google/protobuf/descriptor.proto.
 *
 * See createFileDescriptorProtoBoot() for details.
 *
 * @typedef {{name: string, package: string, messageType: !Array<{name: string, field: (undefined|!Array<{name: string, number: number, label: (undefined|!tsickle_descriptor_pb_1.FieldDescriptorProto_Label), type: !tsickle_descriptor_pb_1.FieldDescriptorProto_Type, typeName: (undefined|string), extendee: (undefined|string), defaultValue: (undefined|string), options: (undefined|{packed: (undefined|boolean), deprecated: (undefined|boolean), retention: (undefined|!tsickle_descriptor_pb_1.FieldOptions_OptionRetention), targets: (undefined|!Array<!tsickle_descriptor_pb_1.FieldOptions_OptionTargetType>), editionDefaults: (undefined|!Array<?>)})}>), nestedType: (undefined|?), enumType: (undefined|!Array<{name: string, value: !Array<?>}>), extensionRange: (undefined|!Array<?>)}>, enumType: !Array<{name: string, value: !Array<?>}>}}
 */
exports.FileDescriptorProtoBoot;
/** @typedef {{name: string, field: (undefined|!Array<{name: string, number: number, label: (undefined|!tsickle_descriptor_pb_1.FieldDescriptorProto_Label), type: !tsickle_descriptor_pb_1.FieldDescriptorProto_Type, typeName: (undefined|string), extendee: (undefined|string), defaultValue: (undefined|string), options: (undefined|{packed: (undefined|boolean), deprecated: (undefined|boolean), retention: (undefined|!tsickle_descriptor_pb_1.FieldOptions_OptionRetention), targets: (undefined|!Array<!tsickle_descriptor_pb_1.FieldOptions_OptionTargetType>), editionDefaults: (undefined|!Array<?>)})}>), nestedType: (undefined|!Array<?>), enumType: (undefined|!Array<{name: string, value: !Array<?>}>), extensionRange: (undefined|!Array<?>)}} */
exports.DescriptorProtoBoot;
/** @typedef {{name: string, number: number, label: (undefined|!tsickle_descriptor_pb_1.FieldDescriptorProto_Label), type: !tsickle_descriptor_pb_1.FieldDescriptorProto_Type, typeName: (undefined|string), extendee: (undefined|string), defaultValue: (undefined|string), options: (undefined|{packed: (undefined|boolean), deprecated: (undefined|boolean), retention: (undefined|!tsickle_descriptor_pb_1.FieldOptions_OptionRetention), targets: (undefined|!Array<!tsickle_descriptor_pb_1.FieldOptions_OptionTargetType>), editionDefaults: (undefined|!Array<?>)})}} */
exports.FieldDescriptorProtoBoot;
/** @typedef {{packed: (undefined|boolean), deprecated: (undefined|boolean), retention: (undefined|!tsickle_descriptor_pb_1.FieldOptions_OptionRetention), targets: (undefined|!Array<!tsickle_descriptor_pb_1.FieldOptions_OptionTargetType>), editionDefaults: (undefined|!Array<?>)}} */
exports.FieldOptionsBoot;
/** @typedef {?} */
exports.FieldOptions_EditionDefaultBoot;
/** @typedef {{name: string, value: !Array<?>}} */
exports.EnumDescriptorProtoBoot;
/** @typedef {?} */
exports.EnumValueDescriptorProtoBoot;
/**
 * Creates the message google.protobuf.FileDescriptorProto from an object literal.
 *
 * See createFileDescriptorProtoBoot() for details.
 *
 * @param {{name: string, package: string, messageType: !Array<{name: string, field: (undefined|!Array<{name: string, number: number, label: (undefined|!tsickle_descriptor_pb_1.FieldDescriptorProto_Label), type: !tsickle_descriptor_pb_1.FieldDescriptorProto_Type, typeName: (undefined|string), extendee: (undefined|string), defaultValue: (undefined|string), options: (undefined|{packed: (undefined|boolean), deprecated: (undefined|boolean), retention: (undefined|!tsickle_descriptor_pb_1.FieldOptions_OptionRetention), targets: (undefined|!Array<!tsickle_descriptor_pb_1.FieldOptions_OptionTargetType>), editionDefaults: (undefined|!Array<?>)})}>), nestedType: (undefined|?), enumType: (undefined|!Array<{name: string, value: !Array<?>}>), extensionRange: (undefined|!Array<?>)}>, enumType: !Array<{name: string, value: !Array<?>}>}} init
 * @return {?}
 */
function bootFileDescriptorProto(init) {
    /** @typedef {?} */
    var Prototype;
    /** @type {?} */
    const proto = (/** @type {?} */ (Object.create({
        syntax: "",
        edition: 0,
    })));
    return Object.assign(proto, {
        $typeName: (/** @type {string} */ ("google.protobuf.FileDescriptorProto")),
        dependency: [],
        publicDependency: [],
        weakDependency: [],
        optionDependency: [],
        service: [],
        extension: [],
        ...init,
        messageType: init.messageType.map(bootDescriptorProto),
        enumType: init.enumType.map(bootEnumDescriptorProto),
    });
}
exports.bootFileDescriptorProto = bootFileDescriptorProto;
/**
 * @param {{name: string, field: (undefined|!Array<{name: string, number: number, label: (undefined|!tsickle_descriptor_pb_1.FieldDescriptorProto_Label), type: !tsickle_descriptor_pb_1.FieldDescriptorProto_Type, typeName: (undefined|string), extendee: (undefined|string), defaultValue: (undefined|string), options: (undefined|{packed: (undefined|boolean), deprecated: (undefined|boolean), retention: (undefined|!tsickle_descriptor_pb_1.FieldOptions_OptionRetention), targets: (undefined|!Array<!tsickle_descriptor_pb_1.FieldOptions_OptionTargetType>), editionDefaults: (undefined|!Array<?>)})}>), nestedType: (undefined|!Array<?>), enumType: (undefined|!Array<{name: string, value: !Array<?>}>), extensionRange: (undefined|!Array<?>)}} init
 * @return {?}
 */
function bootDescriptorProto(init) {
    /** @typedef {?} */
    var Prototype;
    /** @type {?} */
    const proto = (/** @type {?} */ (Object.create({
        visibility: 0,
    })));
    return Object.assign(proto, {
        $typeName: (/** @type {string} */ ("google.protobuf.DescriptorProto")),
        name: init.name,
        field: init.field?.map(bootFieldDescriptorProto) ?? [],
        extension: [],
        nestedType: init.nestedType?.map(bootDescriptorProto) ?? [],
        enumType: init.enumType?.map(bootEnumDescriptorProto) ?? [],
        extensionRange: init.extensionRange?.map((/**
         * @param {?} e
         * @return {{start: number, end: number}}
         */
        (e) => ({
            $typeName: (/** @type {string} */ ("google.protobuf.DescriptorProto.ExtensionRange")),
            ...e,
        }))) ?? [],
        oneofDecl: [],
        reservedRange: [],
        reservedName: [],
    });
}
/**
 * @param {{name: string, number: number, label: (undefined|!tsickle_descriptor_pb_1.FieldDescriptorProto_Label), type: !tsickle_descriptor_pb_1.FieldDescriptorProto_Type, typeName: (undefined|string), extendee: (undefined|string), defaultValue: (undefined|string), options: (undefined|{packed: (undefined|boolean), deprecated: (undefined|boolean), retention: (undefined|!tsickle_descriptor_pb_1.FieldOptions_OptionRetention), targets: (undefined|!Array<!tsickle_descriptor_pb_1.FieldOptions_OptionTargetType>), editionDefaults: (undefined|!Array<?>)})}} init
 * @return {?}
 */
function bootFieldDescriptorProto(init) {
    /** @typedef {?} */
    var Prototype;
    /** @type {?} */
    const proto = (/** @type {?} */ (Object.create({
        label: 1,
        typeName: "",
        extendee: "",
        defaultValue: "",
        oneofIndex: 0,
        jsonName: "",
        proto3Optional: false,
    })));
    return Object.assign(proto, {
        $typeName: (/** @type {string} */ ("google.protobuf.FieldDescriptorProto")),
        ...init,
        options: init.options ? bootFieldOptions(init.options) : undefined,
    });
}
/**
 * @param {{packed: (undefined|boolean), deprecated: (undefined|boolean), retention: (undefined|!tsickle_descriptor_pb_1.FieldOptions_OptionRetention), targets: (undefined|!Array<!tsickle_descriptor_pb_1.FieldOptions_OptionTargetType>), editionDefaults: (undefined|!Array<?>)}} init
 * @return {?}
 */
function bootFieldOptions(init) {
    /** @typedef {?} */
    var Prototype;
    /** @type {?} */
    const proto = (/** @type {?} */ (Object.create({
        ctype: 0,
        packed: false,
        jstype: 0,
        lazy: false,
        unverifiedLazy: false,
        deprecated: false,
        weak: false,
        debugRedact: false,
        retention: 0,
    })));
    return Object.assign(proto, {
        $typeName: (/** @type {string} */ ("google.protobuf.FieldOptions")),
        ...init,
        targets: init.targets ?? [],
        editionDefaults: init.editionDefaults?.map((/**
         * @param {?} e
         * @return {{value: string, edition: !tsickle_descriptor_pb_1.Edition}}
         */
        (e) => ({
            $typeName: (/** @type {string} */ ("google.protobuf.FieldOptions.EditionDefault")),
            ...e,
        }))) ?? [],
        uninterpretedOption: [],
    });
}
/**
 * @param {{name: string, value: !Array<?>}} init
 * @return {?}
 */
function bootEnumDescriptorProto(init) {
    /** @typedef {?} */
    var Prototype;
    /** @type {?} */
    const proto = (/** @type {?} */ (Object.create({
        visibility: 0,
    })));
    return Object.assign(proto, {
        $typeName: (/** @type {string} */ ("google.protobuf.EnumDescriptorProto")),
        name: init.name,
        reservedName: [],
        reservedRange: [],
        value: init.value.map((/**
         * @param {?} e
         * @return {{number: number, name: string}}
         */
        (e) => ({
            $typeName: (/** @type {string} */ ("google.protobuf.EnumValueDescriptorProto")),
            ...e,
        }))),
    });
}
