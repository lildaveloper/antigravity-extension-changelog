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
 * Generated from: third_party/javascript/bufbuild_protobuf/src/descriptors.ts
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
goog.module('google3.third_party.javascript.bufbuild_protobuf.src.descriptors');
var module = module || { id: 'third_party/javascript/bufbuild_protobuf/src/descriptors.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_descriptor_pb_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.descriptor_pb");
const tsickle_scalar_2 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.scalar");
/** @typedef {!tsickle_descriptor_pb_1.Edition} */
exports.SupportedEdition;
/** @typedef {!tsickle_descriptor_pb_1.FeatureSet_FieldPresence} */
var SupportedFieldPresence;
/**
 * Scalar value types. This is a subset of field types declared by protobuf
 * enum google.protobuf.FieldDescriptorProto.Type The types GROUP and MESSAGE
 * are omitted, but the numerical values are identical.
 * @enum {number}
 */
const ScalarType = {
    // 0 is reserved for errors.
    // Order is weird for historical reasons.
    DOUBLE: 1,
    FLOAT: 2,
    // Not ZigZag encoded.  Negative numbers take 10 bytes.  Use TYPE_SINT64 if
    // negative values are likely.
    INT64: 3,
    UINT64: 4,
    // Not ZigZag encoded.  Negative numbers take 10 bytes.  Use TYPE_SINT32 if
    // negative values are likely.
    INT32: 5,
    FIXED64: 6,
    FIXED32: 7,
    BOOL: 8,
    STRING: 9,
    // Tag-delimited aggregate.
    // Group type is deprecated and not supported in proto3. However, Proto3
    // implementations should still be able to parse the group wire format and
    // treat group fields as unknown fields.
    // TYPE_GROUP = 10,
    // TYPE_MESSAGE = 11,  // Length-delimited aggregate.
    // New in version 2.
    BYTES: 12,
    UINT32: 13,
    // TYPE_ENUM = 14,
    SFIXED32: 15,
    SFIXED64: 16,
    SINT32: 17, // Uses ZigZag encoding.
    // Uses ZigZag encoding.
    SINT64: 18,
};
exports.ScalarType = ScalarType;
ScalarType[ScalarType.DOUBLE] = 'DOUBLE';
ScalarType[ScalarType.FLOAT] = 'FLOAT';
ScalarType[ScalarType.INT64] = 'INT64';
ScalarType[ScalarType.UINT64] = 'UINT64';
ScalarType[ScalarType.INT32] = 'INT32';
ScalarType[ScalarType.FIXED64] = 'FIXED64';
ScalarType[ScalarType.FIXED32] = 'FIXED32';
ScalarType[ScalarType.BOOL] = 'BOOL';
ScalarType[ScalarType.STRING] = 'STRING';
ScalarType[ScalarType.BYTES] = 'BYTES';
ScalarType[ScalarType.UINT32] = 'UINT32';
ScalarType[ScalarType.SFIXED32] = 'SFIXED32';
ScalarType[ScalarType.SFIXED64] = 'SFIXED64';
ScalarType[ScalarType.SINT32] = 'SINT32';
ScalarType[ScalarType.SINT64] = 'SINT64';
/**
 * A union of all descriptors, discriminated by a `kind` property.
 * @typedef {(!DescFile|!DescMessage|?|!DescEnum|!DescEnumValue|!DescMethod|!DescService|!DescOneof)}
 */
exports.AnyDesc;
/**
 * Describes a protobuf source file.
 * @record
 */
function DescFile() { }
exports.DescFile = DescFile;
/* istanbul ignore if */
if (false) {
    /**
     * @const {string}
     * @public
     */
    DescFile.prototype.kind;
    /**
     * The edition of the protobuf file. Will be EDITION_PROTO2 for syntax="proto2",
     * EDITION_PROTO3 for syntax="proto3";
     * @const {!tsickle_descriptor_pb_1.Edition}
     * @public
     */
    DescFile.prototype.edition;
    /**
     * The name of the file, excluding the .proto suffix.
     * For a protobuf file `foo/bar.proto`, this is `foo/bar`.
     * @const {string}
     * @public
     */
    DescFile.prototype.name;
    /**
     * Files imported by this file.
     * @const {!Array<!DescFile>}
     * @public
     */
    DescFile.prototype.dependencies;
    /**
     * Top-level enumerations declared in this file.
     * Note that more enumerations might be declared within message declarations.
     * @const {!Array<!DescEnum>}
     * @public
     */
    DescFile.prototype.enums;
    /**
     * Top-level messages declared in this file.
     * Note that more messages might be declared within message declarations.
     * @const {!Array<!DescMessage>}
     * @public
     */
    DescFile.prototype.messages;
    /**
     * Top-level extensions declared in this file.
     * Note that more extensions might be declared within message declarations.
     * @const {!Array<?>}
     * @public
     */
    DescFile.prototype.extensions;
    /**
     * Services declared in this file.
     * @const {!Array<!DescService>}
     * @public
     */
    DescFile.prototype.services;
    /**
     * Marked as deprecated in the protobuf source.
     * @const {boolean}
     * @public
     */
    DescFile.prototype.deprecated;
    /**
     * The compiler-generated descriptor.
     * @const {?}
     * @public
     */
    DescFile.prototype.proto;
    /**
     * @public
     * @return {string}
     */
    DescFile.prototype.toString = function () { };
}
/**
 * Describes an enumeration in a protobuf source file.
 * @record
 */
function DescEnum() { }
exports.DescEnum = DescEnum;
/* istanbul ignore if */
if (false) {
    /**
     * @const {string}
     * @public
     */
    DescEnum.prototype.kind;
    /**
     * The fully qualified name of the enumeration. (We omit the leading dot.)
     * @const {string}
     * @public
     */
    DescEnum.prototype.typeName;
    /**
     * The name of the enumeration, as declared in the protobuf source.
     * @const {string}
     * @public
     */
    DescEnum.prototype.name;
    /**
     * The file this enumeration was declared in.
     * @const {!DescFile}
     * @public
     */
    DescEnum.prototype.file;
    /**
     * The parent message, if this enumeration was declared inside a message declaration.
     * @const {(undefined|!DescMessage)}
     * @public
     */
    DescEnum.prototype.parent;
    /**
     * Enumerations can be open or closed.
     * See https://protobuf.dev/programming-guides/enum/
     * @const {boolean}
     * @public
     */
    DescEnum.prototype.open;
    /**
     * Values declared for this enumeration.
     * @const {!Array<!DescEnumValue>}
     * @public
     */
    DescEnum.prototype.values;
    /**
     * All values of this enum by their number.
     * @const {?}
     * @public
     */
    DescEnum.prototype.value;
    /**
     * A prefix shared by all enum values.
     * For example, `my_enum_` for `enum MyEnum {MY_ENUM_A=0; MY_ENUM_B=1;}`
     * @const {(undefined|string)}
     * @public
     */
    DescEnum.prototype.sharedPrefix;
    /**
     * Marked as deprecated in the protobuf source.
     * @const {boolean}
     * @public
     */
    DescEnum.prototype.deprecated;
    /**
     * The compiler-generated descriptor.
     * @const {?}
     * @public
     */
    DescEnum.prototype.proto;
    /**
     * @public
     * @return {string}
     */
    DescEnum.prototype.toString = function () { };
}
/**
 * Describes an individual value of an enumeration in a protobuf source file.
 * @record
 */
function DescEnumValue() { }
exports.DescEnumValue = DescEnumValue;
/* istanbul ignore if */
if (false) {
    /**
     * @const {string}
     * @public
     */
    DescEnumValue.prototype.kind;
    /**
     * The name of the enumeration value, as specified in the protobuf source.
     * @const {string}
     * @public
     */
    DescEnumValue.prototype.name;
    /**
     * A safe and idiomatic name for the value in a TypeScript enum.
     * @const {string}
     * @public
     */
    DescEnumValue.prototype.localName;
    /**
     * The enumeration this value belongs to.
     * @const {!DescEnum}
     * @public
     */
    DescEnumValue.prototype.parent;
    /**
     * The numeric enumeration value, as specified in the protobuf source.
     * @const {number}
     * @public
     */
    DescEnumValue.prototype.number;
    /**
     * Marked as deprecated in the protobuf source.
     * @const {boolean}
     * @public
     */
    DescEnumValue.prototype.deprecated;
    /**
     * The compiler-generated descriptor.
     * @const {?}
     * @public
     */
    DescEnumValue.prototype.proto;
    /**
     * @public
     * @return {string}
     */
    DescEnumValue.prototype.toString = function () { };
}
/**
 * Describes a message declaration in a protobuf source file.
 * @record
 */
function DescMessage() { }
exports.DescMessage = DescMessage;
/* istanbul ignore if */
if (false) {
    /**
     * @const {string}
     * @public
     */
    DescMessage.prototype.kind;
    /**
     * The fully qualified name of the message. (We omit the leading dot.)
     * @const {string}
     * @public
     */
    DescMessage.prototype.typeName;
    /**
     * The name of the message, as specified in the protobuf source.
     * @const {string}
     * @public
     */
    DescMessage.prototype.name;
    /**
     * The file this message was declared in.
     * @const {!DescFile}
     * @public
     */
    DescMessage.prototype.file;
    /**
     * The parent message, if this message was declared inside a message declaration.
     * @const {(undefined|!DescMessage)}
     * @public
     */
    DescMessage.prototype.parent;
    /**
     * Fields declared for this message, including fields declared in a oneof
     * group.
     * @const {!Array<?>}
     * @public
     */
    DescMessage.prototype.fields;
    /**
     * All fields of this message by their "localName".
     * @const {?}
     * @public
     */
    DescMessage.prototype.field;
    /**
     * Oneof groups declared for this message.
     * This does not include synthetic oneofs for proto3 optionals.
     * @const {!Array<!DescOneof>}
     * @public
     */
    DescMessage.prototype.oneofs;
    /**
     * Fields and oneof groups for this message, ordered by their appearance in the
     * protobuf source.
     * @const {!Array<(?|!DescOneof)>}
     * @public
     */
    DescMessage.prototype.members;
    /**
     * Enumerations declared within the message, if any.
     * @const {!Array<!DescEnum>}
     * @public
     */
    DescMessage.prototype.nestedEnums;
    /**
     * Messages declared within the message, if any.
     * This does not include synthetic messages like map entries.
     * @const {!Array<!DescMessage>}
     * @public
     */
    DescMessage.prototype.nestedMessages;
    /**
     * Extensions declared within the message, if any.
     * @const {!Array<?>}
     * @public
     */
    DescMessage.prototype.nestedExtensions;
    /**
     * Marked as deprecated in the protobuf source.
     * @const {boolean}
     * @public
     */
    DescMessage.prototype.deprecated;
    /**
     * The compiler-generated descriptor.
     * @const {?}
     * @public
     */
    DescMessage.prototype.proto;
    /**
     * @public
     * @return {string}
     */
    DescMessage.prototype.toString = function () { };
}
/**
 * Describes a field declaration in a protobuf source file.
 * @typedef {?}
 */
exports.DescField;
/** @typedef {?} */
var descFieldCommon;
/**
 * Describes an extension in a protobuf source file.
 * @typedef {?}
 */
exports.DescExtension;
/** @typedef {?} */
var descExtensionCommon;
/**
 * @record
 */
function descFieldAndExtensionShared() { }
/* istanbul ignore if */
if (false) {
    /**
     * The field name, as specified in the protobuf source
     * @const {string}
     * @public
     */
    descFieldAndExtensionShared.prototype.name;
    /**
     * The field number, as specified in the protobuf source.
     * @const {number}
     * @public
     */
    descFieldAndExtensionShared.prototype.number;
    /**
     * The field name in JSON.
     * @const {string}
     * @public
     */
    descFieldAndExtensionShared.prototype.jsonName;
    /**
     * Marked as deprecated in the protobuf source.
     * @const {boolean}
     * @public
     */
    descFieldAndExtensionShared.prototype.deprecated;
    /**
     * Presence of the field.
     * See https://protobuf.dev/programming-guides/field_presence/
     * @const {!tsickle_descriptor_pb_1.FeatureSet_FieldPresence}
     * @public
     */
    descFieldAndExtensionShared.prototype.presence;
    /**
     * The compiler-generated descriptor.
     * @const {?}
     * @public
     */
    descFieldAndExtensionShared.prototype.proto;
    /**
     * Get the edition features for this protobuf element.
     * @public
     * @return {string}
     */
    descFieldAndExtensionShared.prototype.toString = function () { };
}
/** @typedef {{oneof: (undefined|!DescOneof)}} */
var descFieldSingularCommon;
/** @typedef {?} */
var descFieldScalar;
/** @typedef {?} */
var descFieldMessage;
/** @typedef {?} */
var descFieldEnum;
/** @typedef {?} */
var descFieldList;
/** @typedef {{fieldKind: string, packed: boolean, oneof: undefined}} */
var descFieldListCommon;
/** @typedef {?} */
var descFieldListScalar;
/** @typedef {{listKind: string, enum: !DescEnum, message: undefined, scalar: undefined}} */
var descFieldListEnum;
/** @typedef {{listKind: string, enum: undefined, message: !DescMessage, scalar: undefined, delimitedEncoding: boolean}} */
var descFieldListMessage;
/** @typedef {?} */
var descFieldMap;
/** @typedef {?} */
var descFieldMapCommon;
/** @typedef {?} */
var descFieldMapScalar;
/** @typedef {{mapKind: string, enum: !DescEnum, message: undefined, scalar: undefined}} */
var descFieldMapEnum;
/** @typedef {{mapKind: string, enum: undefined, message: !DescMessage, scalar: undefined}} */
var descFieldMapMessage;
/**
 * Describes a oneof group in a protobuf source file.
 * @record
 */
function DescOneof() { }
exports.DescOneof = DescOneof;
/* istanbul ignore if */
if (false) {
    /**
     * @const {string}
     * @public
     */
    DescOneof.prototype.kind;
    /**
     * The name of the oneof group, as specified in the protobuf source.
     * @const {string}
     * @public
     */
    DescOneof.prototype.name;
    /**
     * A safe and idiomatic name for the oneof group as a property in ECMAScript.
     * @const {string}
     * @public
     */
    DescOneof.prototype.localName;
    /**
     * The message this oneof group was declared in.
     * @const {!DescMessage}
     * @public
     */
    DescOneof.prototype.parent;
    /**
     * The fields declared in this oneof group.
     * @const {!Array<?>}
     * @public
     */
    DescOneof.prototype.fields;
    /**
     * Marked as deprecated in the protobuf source.
     * Note that oneof groups cannot be marked as deprecated, this property
     * only exists for consistency and will always be false.
     * @const {boolean}
     * @public
     */
    DescOneof.prototype.deprecated;
    /**
     * The compiler-generated descriptor.
     * @const {?}
     * @public
     */
    DescOneof.prototype.proto;
    /**
     * @public
     * @return {string}
     */
    DescOneof.prototype.toString = function () { };
}
/**
 * Describes a service declaration in a protobuf source file.
 * @record
 */
function DescService() { }
exports.DescService = DescService;
/* istanbul ignore if */
if (false) {
    /**
     * @const {string}
     * @public
     */
    DescService.prototype.kind;
    /**
     * The fully qualified name of the service. (We omit the leading dot.)
     * @const {string}
     * @public
     */
    DescService.prototype.typeName;
    /**
     * The name of the service, as specified in the protobuf source.
     * @const {string}
     * @public
     */
    DescService.prototype.name;
    /**
     * The file this service was declared in.
     * @const {!DescFile}
     * @public
     */
    DescService.prototype.file;
    /**
     * The RPCs this service declares.
     * @const {!Array<!DescMethod>}
     * @public
     */
    DescService.prototype.methods;
    /**
     * All methods of this service by their "localName".
     * @const {?}
     * @public
     */
    DescService.prototype.method;
    /**
     * Marked as deprecated in the protobuf source.
     * @const {boolean}
     * @public
     */
    DescService.prototype.deprecated;
    /**
     * The compiler-generated descriptor.
     * @const {?}
     * @public
     */
    DescService.prototype.proto;
    /**
     * @public
     * @return {string}
     */
    DescService.prototype.toString = function () { };
}
/**
 * Describes an RPC declaration in a protobuf source file.
 * @record
 */
function DescMethod() { }
exports.DescMethod = DescMethod;
/* istanbul ignore if */
if (false) {
    /**
     * @const {string}
     * @public
     */
    DescMethod.prototype.kind;
    /**
     * The name of the RPC, as specified in the protobuf source.
     * @const {string}
     * @public
     */
    DescMethod.prototype.name;
    /**
     * A safe and idiomatic name for the RPC as a method in ECMAScript.
     * @const {string}
     * @public
     */
    DescMethod.prototype.localName;
    /**
     * The parent service.
     * @const {!DescService}
     * @public
     */
    DescMethod.prototype.parent;
    /**
     * One of the four available method types.
     * @const {string}
     * @public
     */
    DescMethod.prototype.methodKind;
    /**
     * The message type for requests.
     * @const {!DescMessage}
     * @public
     */
    DescMethod.prototype.input;
    /**
     * The message type for responses.
     * @const {!DescMessage}
     * @public
     */
    DescMethod.prototype.output;
    /**
     * The idempotency level declared in the protobuf source, if any.
     * @const {!tsickle_descriptor_pb_1.MethodOptions_IdempotencyLevel}
     * @public
     */
    DescMethod.prototype.idempotency;
    /**
     * Marked as deprecated in the protobuf source.
     * @const {boolean}
     * @public
     */
    DescMethod.prototype.deprecated;
    /**
     * The compiler-generated descriptor.
     * @const {?}
     * @public
     */
    DescMethod.prototype.proto;
    /**
     * @public
     * @return {string}
     */
    DescMethod.prototype.toString = function () { };
}
/**
 * Comments on an element in a protobuf source file.
 * @record
 */
function DescComments() { }
exports.DescComments = DescComments;
/* istanbul ignore if */
if (false) {
    /**
     * @const {!ReadonlyArray<string>}
     * @public
     */
    DescComments.prototype.leadingDetached;
    /**
     * @const {(undefined|string)}
     * @public
     */
    DescComments.prototype.leading;
    /**
     * @const {(undefined|string)}
     * @public
     */
    DescComments.prototype.trailing;
    /**
     * @const {!ReadonlyArray<number>}
     * @public
     */
    DescComments.prototype.sourcePath;
}
