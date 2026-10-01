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
 * Generated from: third_party/javascript/bufbuild_protobuf/src/wkt/timestamp.ts
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
goog.module('google3.third_party.javascript.bufbuild_protobuf.src.wkt.timestamp');
var module = module || { id: 'third_party/javascript/bufbuild_protobuf/src/wkt/timestamp.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_timestamp_pb_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.timestamp_pb");
const tsickle_create_2 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.create");
const tsickle_proto_int64_3 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.proto$2dint64");
const timestamp_pb_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.timestamp_pb');
const create_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.create');
const proto_int64_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.proto$2dint64');
/**
 * Create a google.protobuf.Timestamp for the current time.
 * @return {?}
 */
function timestampNow() {
    return timestampFromDate(new Date());
}
exports.timestampNow = timestampNow;
/**
 * Create a google.protobuf.Timestamp message from an ECMAScript Date.
 * @param {!Date} date
 * @return {?}
 */
function timestampFromDate(date) {
    return timestampFromMs(date.getTime());
}
exports.timestampFromDate = timestampFromDate;
/**
 * Convert a google.protobuf.Timestamp message to an ECMAScript Date.
 * @param {?} timestamp
 * @return {!Date}
 */
function timestampDate(timestamp) {
    return new Date(timestampMs(timestamp));
}
exports.timestampDate = timestampDate;
/**
 * Create a google.protobuf.Timestamp message from a Unix timestamp in milliseconds.
 * @param {number} timestampMs
 * @return {?}
 */
function timestampFromMs(timestampMs) {
    /** @type {number} */
    const seconds = Math.floor(timestampMs / 1000);
    return (0, create_js_1.create)(timestamp_pb_js_1.TimestampSchema, {
        seconds: proto_int64_js_1.protoInt64.parse(seconds),
        nanos: (timestampMs - seconds * 1000) * 1000000,
    });
}
exports.timestampFromMs = timestampFromMs;
/**
 * Convert a google.protobuf.Timestamp to a Unix timestamp in milliseconds.
 * @param {?} timestamp
 * @return {number}
 */
function timestampMs(timestamp) {
    return (Number(timestamp.seconds) * 1000 + Math.round(timestamp.nanos / 1000000));
}
exports.timestampMs = timestampMs;
