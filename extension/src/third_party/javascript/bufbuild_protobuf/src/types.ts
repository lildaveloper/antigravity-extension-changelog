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
 * Generated from: third_party/javascript/bufbuild_protobuf/src/types.ts
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
goog.module('google3.third_party.javascript.bufbuild_protobuf.src.types');
var module = module || { id: 'third_party/javascript/bufbuild_protobuf/src/types.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_types_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.codegenv1.types");
const tsickle_types_2 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.codegenv2.types");
const tsickle_descriptors_3 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.descriptors");
const tsickle_guard_4 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.guard");
const tsickle_wire_5 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wire.index");
const tsickle_json_value_6 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.json$2dvalue");
/**
 * The type `Message` contains the properties shared by all messages.
 * @typedef {*}
 */
exports.Message;
/**
 * Extract the message type from a message descriptor.
 * @typedef {?}
 */
exports.MessageShape;
/**
 * Extract the message JSON type from a message descriptor.
 *
 * JSON types are only available for code generated with the plugin option
 * `json_types=true`. If JSON types are unavailable, this type falls back to the
 * `JsonValue` type.
 * @typedef {?}
 */
exports.MessageJsonType;
/**
 * Extract the message Valid type from a message descriptor.
 *
 * Valid types are only available for code generated with the plugin option
 * `valid_types`. If Valid types are unavailable, this type falls back to the
 * regular message shape.
 * @typedef {?}
 */
exports.MessageValidType;
/**
 * Extract the init type from a message descriptor.
 * The init type is accepted by the function create().
 * @typedef {?}
 */
exports.MessageInitShape;
/**
 * Extract the enum type of from an enum descriptor.
 * @typedef {?}
 */
exports.EnumShape;
/**
 * Extract the enum JSON type from a enum descriptor.
 * @typedef {?}
 */
exports.EnumJsonType;
/**
 * Extract the value type from an extension descriptor.
 * @typedef {?}
 */
exports.ExtensionValueShape;
/**
 * Extract the type of the extended message from an extension descriptor.
 * @typedef {?}
 */
exports.Extendee;
/**
 * Unknown fields are fields that were not recognized during parsing, or
 * extension.
 * @typedef {{no: number, wireType: !tsickle_wire_5.WireType, data: !Uint8Array}}
 */
exports.UnknownField;
/**
 * Describes a streaming RPC declaration.
 * @typedef {?}
 */
exports.DescMethodStreaming;
/**
 * Describes a unary RPC declaration.
 * @typedef {?}
 */
exports.DescMethodUnary;
/**
 * Describes a server streaming RPC declaration.
 * @typedef {?}
 */
exports.DescMethodServerStreaming;
/**
 * Describes a client streaming RPC declaration.
 * @typedef {?}
 */
exports.DescMethodClientStreaming;
/**
 * Describes a bidi streaming RPC declaration.
 * @typedef {?}
 */
exports.DescMethodBiDiStreaming;
/**
 * The init type for a message, which makes all fields optional.
 * The init type is accepted by the function create().
 * @typedef {?}
 */
var MessageInit;
/** @typedef {?} */
var FieldInit;
/** @typedef {!Object<string,?>} */
var MapWithMessage;
/** @typedef {{case: ?, value: ?}} */
var OneofSelectedMessage;
/** @typedef {?} */
var DescMethodTyped;
