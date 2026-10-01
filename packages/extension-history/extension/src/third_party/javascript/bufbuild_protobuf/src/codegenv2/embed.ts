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
 * Generated from: third_party/javascript/bufbuild_protobuf/src/codegenv2/embed.ts
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
goog.module('google3.third_party.javascript.bufbuild_protobuf.src.codegenv2.embed');
var module = module || { id: 'third_party/javascript/bufbuild_protobuf/src/codegenv2/embed.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_descriptors_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.descriptors");
const tsickle_names_2 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.names");
const tsickle_fields_3 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.fields");
const tsickle_base64_encoding_4 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wire.base64$2dencoding");
const tsickle_to_binary_5 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.to$2dbinary");
const tsickle_clone_6 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.clone");
const tsickle_descriptor_pb_7 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.descriptor_pb");
const tsickle_boot_8 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.codegenv2.boot");
const names_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.reflect.names');
const fields_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.fields');
const base64_encoding_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wire.base64$2dencoding');
const to_binary_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.to$2dbinary');
const clone_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.clone');
const descriptor_pb_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.descriptor_pb');
/** @typedef {{bootable: boolean, proto: function(): ?, base64: function(): string}} */
var EmbedUnknown;
/** @typedef {?} */
var EmbedDescriptorProto;
/**
 * Create necessary information to embed a file descriptor in
 * generated code.
 *
 * @param {?} file
 * @return {({bootable: boolean, proto: function(): ?, base64: function(): string}|?)}
 */
function embedFileDesc(file) {
    /** @type {{bootable: boolean, proto: function(): ?, base64: function(): string}} */
    const embed = {
        bootable: false,
        /**
         * @public
         * @return {?}
         */
        proto() {
            /** @type {?} */
            const stripped = (0, clone_js_1.clone)(descriptor_pb_js_1.FileDescriptorProtoSchema, file);
            (0, fields_js_1.clearField)(stripped, descriptor_pb_js_1.FileDescriptorProtoSchema.field.dependency);
            (0, fields_js_1.clearField)(stripped, descriptor_pb_js_1.FileDescriptorProtoSchema.field.sourceCodeInfo);
            stripped.messageType.map(stripJsonNames);
            return stripped;
        },
        /**
         * @public
         * @return {string}
         */
        base64() {
            /** @type {!Uint8Array} */
            const bytes = (0, to_binary_js_1.toBinary)(descriptor_pb_js_1.FileDescriptorProtoSchema, this.proto());
            return (0, base64_encoding_js_1.base64Encode)(bytes, "std_raw");
        },
    };
    return file.name == "google/protobuf/descriptor.proto"
        ? {
            ...embed,
            bootable: true,
            /**
             * @public
             * @return {{name: string, package: string, messageType: !Array<{name: string, field: (undefined|!Array<{name: string, number: number, label: (undefined|!tsickle_descriptor_pb_7.FieldDescriptorProto_Label), type: !tsickle_descriptor_pb_7.FieldDescriptorProto_Type, typeName: (undefined|string), extendee: (undefined|string), defaultValue: (undefined|string), options: (undefined|{packed: (undefined|boolean), deprecated: (undefined|boolean), retention: (undefined|!tsickle_descriptor_pb_7.FieldOptions_OptionRetention), targets: (undefined|!Array<!tsickle_descriptor_pb_7.FieldOptions_OptionTargetType>), editionDefaults: (undefined|!Array<?>)})}>), nestedType: (undefined|?), enumType: (undefined|!Array<{name: string, value: !Array<?>}>), extensionRange: (undefined|!Array<?>)}>, enumType: !Array<{name: string, value: !Array<?>}>}}
             */
            boot() {
                return createFileDescriptorProtoBoot(this.proto());
            },
        }
        : embed;
}
exports.embedFileDesc = embedFileDesc;
/**
 * @param {?} d
 * @return {void}
 */
function stripJsonNames(d) {
    for (const f of d.field) {
        if (f.jsonName === (0, names_js_1.protoCamelCase)(f.name)) {
            (0, fields_js_1.clearField)(f, descriptor_pb_js_1.FieldDescriptorProtoSchema.field.jsonName);
        }
    }
    for (const n of d.nestedType) {
        stripJsonNames(n);
    }
}
/**
 * Compute the path to a message, enumeration, extension, or service in a
 * file descriptor.
 *
 * @param {(!tsickle_descriptors_1.DescEnum|!tsickle_descriptors_1.DescMessage|!tsickle_descriptors_1.DescService|?)} desc
 * @return {!Array<number>}
 */
function pathInFileDesc(desc) {
    if (desc.kind == "service") {
        return [(/** @type {!tsickle_descriptors_1.DescService} */ (desc)).file.services.indexOf(desc)];
    }
    /** @type {(undefined|!tsickle_descriptors_1.DescMessage)} */
    const parent = (/** @type {(!tsickle_descriptors_1.DescEnum|!tsickle_descriptors_1.DescMessage|?)} */ (desc)).parent;
    if (parent == undefined) {
        switch ((/** @type {(!tsickle_descriptors_1.DescEnum|!tsickle_descriptors_1.DescMessage|?)} */ (desc)).kind) {
            case "enum":
                return [(/** @type {!tsickle_descriptors_1.DescEnum} */ (desc)).file.enums.indexOf(desc)];
            case "message":
                return [(/** @type {!tsickle_descriptors_1.DescMessage} */ (desc)).file.messages.indexOf(desc)];
            case "extension":
                return [desc.file.extensions.indexOf(desc)];
        }
    }
    /**
     * @param {!tsickle_descriptors_1.DescMessage} cur
     * @return {!Array<number>}
     */
    function findPath(cur) {
        /** @type {!Array<number>} */
        const nested = [];
        for (let parent = cur.parent; parent;) {
            /** @type {number} */
            const idx = parent.nestedMessages.indexOf(cur);
            nested.unshift(idx);
            cur = parent;
            parent = cur.parent;
        }
        nested.unshift(cur.file.messages.indexOf(cur));
        return nested;
    }
    /** @type {!Array<number>} */
    const path = findPath(parent);
    switch ((/** @type {(!tsickle_descriptors_1.DescEnum|!tsickle_descriptors_1.DescMessage|?)} */ (desc)).kind) {
        case "extension":
            return [...path, parent.nestedExtensions.indexOf(desc)];
        case "message":
            return [...path, parent.nestedMessages.indexOf(desc)];
        case "enum":
            return [...path, parent.nestedEnums.indexOf(desc)];
    }
}
exports.pathInFileDesc = pathInFileDesc;
/**
 * The file descriptor for google/protobuf/descriptor.proto cannot be embedded
 * in serialized form, since it is required to parse itself.
 *
 * This function takes an instance of the message, and returns a plain object
 * that can be hydrated to the message again via bootFileDescriptorProto().
 *
 * This function only works with a message google.protobuf.FileDescriptorProto
 * for google/protobuf/descriptor.proto, and only supports features that are
 * relevant for the specific use case. For example, it discards file options,
 * reserved ranges and reserved names, and field options that are unused in
 * descriptor.proto.
 *
 * @param {?} proto
 * @return {{name: string, package: string, messageType: !Array<{name: string, field: (undefined|!Array<{name: string, number: number, label: (undefined|!tsickle_descriptor_pb_7.FieldDescriptorProto_Label), type: !tsickle_descriptor_pb_7.FieldDescriptorProto_Type, typeName: (undefined|string), extendee: (undefined|string), defaultValue: (undefined|string), options: (undefined|{packed: (undefined|boolean), deprecated: (undefined|boolean), retention: (undefined|!tsickle_descriptor_pb_7.FieldOptions_OptionRetention), targets: (undefined|!Array<!tsickle_descriptor_pb_7.FieldOptions_OptionTargetType>), editionDefaults: (undefined|!Array<?>)})}>), nestedType: (undefined|?), enumType: (undefined|!Array<{name: string, value: !Array<?>}>), extensionRange: (undefined|!Array<?>)}>, enumType: !Array<{name: string, value: !Array<?>}>}}
 */
function createFileDescriptorProtoBoot(proto) {
    assert(proto.name == "google/protobuf/descriptor.proto");
    assert(proto.package == "google.protobuf");
    assert(!proto.dependency.length);
    assert(!proto.publicDependency.length);
    assert(!proto.weakDependency.length);
    assert(!proto.optionDependency.length);
    assert(!proto.service.length);
    assert(!proto.extension.length);
    assert(proto.sourceCodeInfo === undefined);
    assert(proto.syntax == "" || proto.syntax == "proto2");
    assert(!proto.options?.features); // we're dropping file options
    // we're dropping file options
    assert(proto.edition === descriptor_pb_js_1.Edition.EDITION_UNKNOWN);
    return {
        name: proto.name,
        package: proto.package,
        messageType: proto.messageType.map(createDescriptorBoot),
        enumType: proto.enumType.map(createEnumDescriptorBoot),
    };
}
exports.createFileDescriptorProtoBoot = createFileDescriptorProtoBoot;
/**
 * @param {?} proto
 * @return {{name: string, field: (undefined|!Array<{name: string, number: number, label: (undefined|!tsickle_descriptor_pb_7.FieldDescriptorProto_Label), type: !tsickle_descriptor_pb_7.FieldDescriptorProto_Type, typeName: (undefined|string), extendee: (undefined|string), defaultValue: (undefined|string), options: (undefined|{packed: (undefined|boolean), deprecated: (undefined|boolean), retention: (undefined|!tsickle_descriptor_pb_7.FieldOptions_OptionRetention), targets: (undefined|!Array<!tsickle_descriptor_pb_7.FieldOptions_OptionTargetType>), editionDefaults: (undefined|!Array<?>)})}>), nestedType: (undefined|!Array<?>), enumType: (undefined|!Array<{name: string, value: !Array<?>}>), extensionRange: (undefined|!Array<?>)}}
 */
function createDescriptorBoot(proto) {
    assert(proto.extension.length == 0);
    assert(!proto.oneofDecl.length);
    assert(!proto.options);
    assert(!(0, fields_js_1.isFieldSet)(proto, descriptor_pb_js_1.DescriptorProtoSchema.field.visibility));
    /** @type {{name: string, field: (undefined|!Array<{name: string, number: number, label: (undefined|!tsickle_descriptor_pb_7.FieldDescriptorProto_Label), type: !tsickle_descriptor_pb_7.FieldDescriptorProto_Type, typeName: (undefined|string), extendee: (undefined|string), defaultValue: (undefined|string), options: (undefined|{packed: (undefined|boolean), deprecated: (undefined|boolean), retention: (undefined|!tsickle_descriptor_pb_7.FieldOptions_OptionRetention), targets: (undefined|!Array<!tsickle_descriptor_pb_7.FieldOptions_OptionTargetType>), editionDefaults: (undefined|!Array<?>)})}>), nestedType: (undefined|!Array<?>), enumType: (undefined|!Array<{name: string, value: !Array<?>}>), extensionRange: (undefined|!Array<?>)}} */
    const b = {
        name: proto.name,
    };
    if (proto.field.length) {
        b.field = proto.field.map(createFieldDescriptorBoot);
    }
    if (proto.nestedType.length) {
        b.nestedType = proto.nestedType.map(createDescriptorBoot);
    }
    if (proto.enumType.length) {
        b.enumType = proto.enumType.map(createEnumDescriptorBoot);
    }
    if (proto.extensionRange.length) {
        b.extensionRange = proto.extensionRange.map((/**
         * @param {?} r
         * @return {{start: number, end: number}}
         */
        (r) => {
            assert(!r.options);
            return { start: r.start, end: r.end };
        }));
    }
    return b;
}
/**
 * @param {?} proto
 * @return {{name: string, number: number, label: (undefined|!tsickle_descriptor_pb_7.FieldDescriptorProto_Label), type: !tsickle_descriptor_pb_7.FieldDescriptorProto_Type, typeName: (undefined|string), extendee: (undefined|string), defaultValue: (undefined|string), options: (undefined|{packed: (undefined|boolean), deprecated: (undefined|boolean), retention: (undefined|!tsickle_descriptor_pb_7.FieldOptions_OptionRetention), targets: (undefined|!Array<!tsickle_descriptor_pb_7.FieldOptions_OptionTargetType>), editionDefaults: (undefined|!Array<?>)})}}
 */
function createFieldDescriptorBoot(proto) {
    assert((0, fields_js_1.isFieldSet)(proto, descriptor_pb_js_1.FieldDescriptorProtoSchema.field.name));
    assert((0, fields_js_1.isFieldSet)(proto, descriptor_pb_js_1.FieldDescriptorProtoSchema.field.number));
    assert((0, fields_js_1.isFieldSet)(proto, descriptor_pb_js_1.FieldDescriptorProtoSchema.field.type));
    assert(!(0, fields_js_1.isFieldSet)(proto, descriptor_pb_js_1.FieldDescriptorProtoSchema.field.oneofIndex));
    assert(!(0, fields_js_1.isFieldSet)(proto, descriptor_pb_js_1.FieldDescriptorProtoSchema.field.jsonName) ||
        proto.jsonName === (0, names_js_1.protoCamelCase)(proto.name));
    /** @type {{name: string, number: number, label: (undefined|!tsickle_descriptor_pb_7.FieldDescriptorProto_Label), type: !tsickle_descriptor_pb_7.FieldDescriptorProto_Type, typeName: (undefined|string), extendee: (undefined|string), defaultValue: (undefined|string), options: (undefined|{packed: (undefined|boolean), deprecated: (undefined|boolean), retention: (undefined|!tsickle_descriptor_pb_7.FieldOptions_OptionRetention), targets: (undefined|!Array<!tsickle_descriptor_pb_7.FieldOptions_OptionTargetType>), editionDefaults: (undefined|!Array<?>)})}} */
    const b = {
        name: proto.name,
        number: proto.number,
        type: proto.type,
    };
    if ((0, fields_js_1.isFieldSet)(proto, descriptor_pb_js_1.FieldDescriptorProtoSchema.field.label)) {
        b.label = proto.label;
    }
    if ((0, fields_js_1.isFieldSet)(proto, descriptor_pb_js_1.FieldDescriptorProtoSchema.field.typeName)) {
        b.typeName = proto.typeName;
    }
    if ((0, fields_js_1.isFieldSet)(proto, descriptor_pb_js_1.FieldDescriptorProtoSchema.field.extendee)) {
        b.extendee = proto.extendee;
    }
    if ((0, fields_js_1.isFieldSet)(proto, descriptor_pb_js_1.FieldDescriptorProtoSchema.field.defaultValue)) {
        b.defaultValue = proto.defaultValue;
    }
    if (proto.options) {
        b.options = createFieldOptionsBoot(proto.options);
    }
    return b;
}
/**
 * @param {?} proto
 * @return {{packed: (undefined|boolean), deprecated: (undefined|boolean), retention: (undefined|!tsickle_descriptor_pb_7.FieldOptions_OptionRetention), targets: (undefined|!Array<!tsickle_descriptor_pb_7.FieldOptions_OptionTargetType>), editionDefaults: (undefined|!Array<?>)}}
 */
function createFieldOptionsBoot(proto) {
    /** @type {{packed: (undefined|boolean), deprecated: (undefined|boolean), retention: (undefined|!tsickle_descriptor_pb_7.FieldOptions_OptionRetention), targets: (undefined|!Array<!tsickle_descriptor_pb_7.FieldOptions_OptionTargetType>), editionDefaults: (undefined|!Array<?>)}} */
    const b = {};
    assert(!(0, fields_js_1.isFieldSet)(proto, descriptor_pb_js_1.FieldOptionsSchema.field.ctype));
    if ((0, fields_js_1.isFieldSet)(proto, descriptor_pb_js_1.FieldOptionsSchema.field.packed)) {
        b.packed = proto.packed;
    }
    assert(!(0, fields_js_1.isFieldSet)(proto, descriptor_pb_js_1.FieldOptionsSchema.field.jstype));
    assert(!(0, fields_js_1.isFieldSet)(proto, descriptor_pb_js_1.FieldOptionsSchema.field.lazy));
    assert(!(0, fields_js_1.isFieldSet)(proto, descriptor_pb_js_1.FieldOptionsSchema.field.unverifiedLazy));
    if ((0, fields_js_1.isFieldSet)(proto, descriptor_pb_js_1.FieldOptionsSchema.field.deprecated)) {
        b.deprecated = proto.deprecated;
    }
    assert(!(0, fields_js_1.isFieldSet)(proto, descriptor_pb_js_1.FieldOptionsSchema.field.weak));
    assert(!(0, fields_js_1.isFieldSet)(proto, descriptor_pb_js_1.FieldOptionsSchema.field.debugRedact));
    if ((0, fields_js_1.isFieldSet)(proto, descriptor_pb_js_1.FieldOptionsSchema.field.retention)) {
        b.retention = proto.retention;
    }
    if (proto.targets.length) {
        b.targets = proto.targets;
    }
    if (proto.editionDefaults.length) {
        b.editionDefaults = proto.editionDefaults.map((/**
         * @param {?} d
         * @return {?}
         */
        (d) => ({
            value: d.value,
            edition: d.edition,
        })));
    }
    assert(!(0, fields_js_1.isFieldSet)(proto, descriptor_pb_js_1.FieldOptionsSchema.field.features));
    assert(!(0, fields_js_1.isFieldSet)(proto, descriptor_pb_js_1.FieldOptionsSchema.field.uninterpretedOption));
    return b;
}
/**
 * @param {?} proto
 * @return {{name: string, value: !Array<?>}}
 */
function createEnumDescriptorBoot(proto) {
    assert(!proto.options);
    assert(!(0, fields_js_1.isFieldSet)(proto, descriptor_pb_js_1.EnumDescriptorProtoSchema.field.visibility));
    return {
        name: proto.name,
        value: proto.value.map((/**
         * @param {?} v
         * @return {?}
         */
        (v) => {
            assert(!v.options);
            return {
                name: v.name,
                number: v.number,
            };
        })),
    };
}
/**
 * Assert that condition is truthy or throw error.
 * @param {*} condition
 * @return {void}
 */
function assert(condition) {
    if (!condition) {
        throw new Error();
    }
}
