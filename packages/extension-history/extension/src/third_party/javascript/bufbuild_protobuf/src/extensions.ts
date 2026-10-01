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
 * Generated from: third_party/javascript/bufbuild_protobuf/src/extensions.ts
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
goog.module('google3.third_party.javascript.bufbuild_protobuf.src.extensions');
var module = module || { id: 'third_party/javascript/bufbuild_protobuf/src/extensions.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_descriptors_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.descriptors");
const tsickle_create_2 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.create");
const tsickle_from_binary_3 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.from$2dbinary");
const tsickle_reflect_types_4 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.reflect$2dtypes");
const tsickle_reflect_5 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.reflect");
const tsickle_scalar_6 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.scalar");
const tsickle_to_binary_7 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.to$2dbinary");
const tsickle_types_8 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.types");
const tsickle_binary_encoding_9 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wire.binary$2dencoding");
const tsickle_wrappers_10 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wkt.wrappers");
const tsickle_descriptor_pb_11 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.descriptor_pb");
const create_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.create');
const from_binary_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.from$2dbinary');
const reflect_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.reflect.reflect');
const scalar_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.reflect.scalar');
const to_binary_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.to$2dbinary');
const binary_encoding_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wire.binary$2dencoding');
const wrappers_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wkt.wrappers');
/**
 * Retrieve an extension value from a message.
 *
 * The function never returns undefined. Use hasExtension() to check whether an
 * extension is set. If the extension is not set, this function returns the
 * default value (if one was specified in the protobuf source), or the zero value
 * (for example `0` for numeric types, `[]` for repeated extension fields, and
 * an empty message instance for message fields).
 *
 * Extensions are stored as unknown fields on a message. To mutate an extension
 * value, make sure to store the new value with setExtension() after mutating.
 *
 * If the extension does not extend the given message, an error is raised.
 * @template Desc
 * @param {?} message
 * @param {Desc} extension
 * @return {?}
 */
function getExtension(message, extension) {
    assertExtendee(extension, message);
    /** @type {!Array<{no: number, wireType: !tsickle_binary_encoding_9.WireType, data: !Uint8Array}>} */
    const ufs = filterUnknownFields((/** @type {*} */ (message)).$unknown, extension);
    const [container__tsickle_destructured_1, field__tsickle_destructured_2, get__tsickle_destructured_3] = createExtensionContainer(extension);
    const container = /** @type {!tsickle_reflect_types_4.ReflectMessage} */ (container__tsickle_destructured_1);
    const field = /** @type {?} */ (field__tsickle_destructured_2);
    const get = /** @type {function(): ?} */ (get__tsickle_destructured_3);
    for (const uf of ufs) {
        (0, from_binary_js_1.readField)(container, new binary_encoding_js_1.BinaryReader(uf.data), field, uf.wireType, {
            readUnknownFields: true,
        });
    }
    return get();
}
exports.getExtension = getExtension;
/**
 * Set an extension value on a message. If the message already has a value for
 * this extension, the value is replaced.
 *
 * If the extension does not extend the given message, an error is raised.
 * @template Desc
 * @param {?} message
 * @param {Desc} extension
 * @param {?} value
 * @return {void}
 */
function setExtension(message, extension, value) {
    assertExtendee(extension, message);
    /** @type {!Array<{no: number, wireType: !tsickle_binary_encoding_9.WireType, data: !Uint8Array}>} */
    const ufs = ((/** @type {*} */ (message)).$unknown ?? []).filter((/**
     * @param {{no: number, wireType: !tsickle_binary_encoding_9.WireType, data: !Uint8Array}} uf
     * @return {boolean}
     */
    (uf) => uf.no !== extension.number));
    const [container__tsickle_destructured_4, field__tsickle_destructured_5] = createExtensionContainer(extension, value);
    const container = /** @type {!tsickle_reflect_types_4.ReflectMessage} */ (container__tsickle_destructured_4);
    const field = /** @type {?} */ (field__tsickle_destructured_5);
    /** @type {!tsickle_binary_encoding_9.BinaryWriter} */
    const writer = new binary_encoding_js_1.BinaryWriter();
    (0, to_binary_js_1.writeField)(writer, { writeUnknownFields: true }, container, field);
    /** @type {!tsickle_binary_encoding_9.BinaryReader} */
    const reader = new binary_encoding_js_1.BinaryReader(writer.finish());
    while (reader.pos < reader.len) {
        const [no__tsickle_destructured_6, wireType__tsickle_destructured_7] = reader.tag();
        const no = /** @type {number} */ (no__tsickle_destructured_6);
        const wireType = /** @type {!tsickle_binary_encoding_9.WireType} */ (wireType__tsickle_destructured_7);
        /** @type {!Uint8Array} */
        const data = reader.skip(wireType, no);
        ufs.push({ no, wireType, data });
    }
    (/** @type {*} */ (message)).$unknown = ufs;
}
exports.setExtension = setExtension;
/**
 * Remove an extension value from a message.
 *
 * If the extension does not extend the given message, an error is raised.
 * @template Desc
 * @param {?} message
 * @param {Desc} extension
 * @return {void}
 */
function clearExtension(message, extension) {
    assertExtendee(extension, message);
    if ((/** @type {*} */ (message)).$unknown === undefined) {
        return;
    }
    (/** @type {*} */ (message)).$unknown = (/** @type {*} */ (message)).$unknown.filter((/**
     * @param {{no: number, wireType: !tsickle_binary_encoding_9.WireType, data: !Uint8Array}} uf
     * @return {boolean}
     */
    (uf) => uf.no !== extension.number));
}
exports.clearExtension = clearExtension;
/**
 * Check whether an extension is set on a message.
 * @template Desc
 * @param {?} message
 * @param {Desc} extension
 * @return {boolean}
 */
function hasExtension(message, extension) {
    return (extension.extendee.typeName === (/** @type {*} */ (message)).$typeName &&
        !!(/** @type {*} */ (message)).$unknown?.find((/**
         * @param {{no: number, wireType: !tsickle_binary_encoding_9.WireType, data: !Uint8Array}} uf
         * @return {boolean}
         */
        (uf) => uf.no === extension.number)));
}
exports.hasExtension = hasExtension;
/**
 * Check whether an option is set on a descriptor.
 *
 * Options are extensions to the `google.protobuf.*Options` messages defined in
 * google/protobuf/descriptor.proto. This function gets the option message from
 * the descriptor, and calls hasExtension().
 * @template Ext, Desc
 * @param {Desc} element
 * @param {Ext} option
 * @return {boolean}
 */
function hasOption(element, option) {
    /** @type {(undefined|?)} */
    const message = (/** @type {(undefined|?)} */ ((/** @type {(!tsickle_descriptors_1.DescEnum|!tsickle_descriptors_1.DescEnumValue|!tsickle_descriptors_1.DescFile|!tsickle_descriptors_1.DescMessage|!tsickle_descriptors_1.DescMethod|!tsickle_descriptors_1.DescOneof|!tsickle_descriptors_1.DescService|?)} */ (element)).proto.options));
    if (!message) {
        return false;
    }
    return hasExtension(message, option);
}
exports.hasOption = hasOption;
/**
 * Retrieve an option value from a descriptor.
 *
 * Options are extensions to the `google.protobuf.*Options` messages defined in
 * google/protobuf/descriptor.proto. This function gets the option message from
 * the descriptor, and calls getExtension(). Same as getExtension(), this
 * function never returns undefined.
 * @template Ext, Desc
 * @param {Desc} element
 * @param {Ext} option
 * @return {?}
 */
function getOption(element, option) {
    /** @type {(undefined|?)} */
    const message = (/** @type {(undefined|?)} */ ((/** @type {(!tsickle_descriptors_1.DescEnum|!tsickle_descriptors_1.DescEnumValue|!tsickle_descriptors_1.DescFile|!tsickle_descriptors_1.DescMessage|!tsickle_descriptors_1.DescMethod|!tsickle_descriptors_1.DescOneof|!tsickle_descriptors_1.DescService|?)} */ (element)).proto.options));
    if (!message) {
        const [, , get__tsickle_destructured_8] = createExtensionContainer(option);
        const get = /** @type {function(): ?} */ (get__tsickle_destructured_8);
        return get();
    }
    return getExtension(message, option);
}
exports.getOption = getOption;
/** @typedef {?} */
var DescForOptionExtension;
/**
 * @param {(undefined|!Array<{no: number, wireType: !tsickle_binary_encoding_9.WireType, data: !Uint8Array}>)} unknownFields
 * @param {?} extension
 * @return {!Array<{no: number, wireType: !tsickle_binary_encoding_9.WireType, data: !Uint8Array}>}
 */
function filterUnknownFields(unknownFields, extension) {
    if (unknownFields === undefined)
        return [];
    if (extension.fieldKind === "enum" || extension.fieldKind === "scalar") {
        // singular scalar fields do not merge, we pick the last
        for (let i = unknownFields.length - 1; i >= 0; --i) {
            if (unknownFields[i].no == extension.number) {
                return [unknownFields[i]];
            }
        }
        return [];
    }
    return unknownFields.filter((/**
     * @param {{no: number, wireType: !tsickle_binary_encoding_9.WireType, data: !Uint8Array}} uf
     * @return {boolean}
     */
    (uf) => uf.no === extension.number));
}
/**
 * @template Desc
 * @param {Desc} extension
 * @param {(undefined|?)=} value
 * @return {!Array<?>}
 */
function createExtensionContainer(extension, value) {
    /** @type {string} */
    const localName = extension.typeName;
    /** @type {?} */
    const field = (/** @type {?} */ ({
        ...extension,
        kind: "field",
        parent: extension.extendee,
        localName,
    }));
    /** @type {{kind: string, typeName: string, name: string, file: !tsickle_descriptors_1.DescFile, parent: (undefined|!tsickle_descriptors_1.DescMessage), field: ?, nestedEnums: !Array<!tsickle_descriptors_1.DescEnum>, nestedMessages: !Array<!tsickle_descriptors_1.DescMessage>, nestedExtensions: !Array<?>, deprecated: boolean, proto: ?, toString: function(): string, fields: !Array<?>, members: !Array<?>, oneofs: !Array<?>}} */
    const desc = {
        ...extension.extendee,
        fields: [field],
        members: [field],
        oneofs: [],
    };
    /** @type {*} */
    const container = (0, create_js_1.create)(desc, value !== undefined ? { [localName]: value } : undefined);
    return [
        (0, reflect_js_1.reflect)(desc, container),
        field,
        (/**
         * @return {?}
         */
        () => {
            /** @type {*} */
            const value = ((/** @type {?} */ (container)))[localName];
            if (value === undefined) {
                // biome-ignore lint/style/noNonNullAssertion: Only message fields are undefined, rest will have a zero value.
                /** @type {!tsickle_descriptors_1.DescMessage} */
                const desc = (/** @type {!tsickle_descriptors_1.DescMessage} */ (extension.message));
                if ((0, wrappers_js_1.isWrapperDesc)(desc)) {
                    return (/** @type {?} */ ((0, scalar_js_1.scalarZeroValue)(desc.fields[0].scalar, desc.fields[0].longAsString)));
                }
                return (/** @type {?} */ ((0, create_js_1.create)(desc)));
            }
            return (/** @type {?} */ (value));
        }),
    ];
}
exports.createExtensionContainer = createExtensionContainer;
/**
 * @param {?} extension
 * @param {*} message
 * @return {void}
 */
function assertExtendee(extension, message) {
    if (extension.extendee.typeName != message.$typeName) {
        throw new Error(`extension ${extension.typeName} can only be applied to message ${extension.extendee.typeName}`);
    }
}
