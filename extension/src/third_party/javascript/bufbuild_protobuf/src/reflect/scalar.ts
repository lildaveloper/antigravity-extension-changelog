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
 * Generated from: third_party/javascript/bufbuild_protobuf/src/reflect/scalar.ts
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
goog.module('google3.third_party.javascript.bufbuild_protobuf.src.reflect.scalar');
var module = module || { id: 'third_party/javascript/bufbuild_protobuf/src/reflect/scalar.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_proto_int64_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.proto$2dint64");
const tsickle_descriptors_2 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.descriptors");
const proto_int64_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.proto$2dint64');
const descriptors_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.descriptors');
/**
 * ScalarValue maps from a scalar field type to a TypeScript value type.
 * @typedef {?}
 */
exports.ScalarValue;
/**
 * Returns true if both scalar values are equal.
 * @param {!tsickle_descriptors_2.ScalarType} type
 * @param {(undefined|string|number|bigint|boolean|!Uint8Array)} a
 * @param {(undefined|string|number|bigint|boolean|!Uint8Array)} b
 * @return {boolean}
 */
function scalarEquals(type, a, b) {
    if (a === b) {
        // This correctly matches equal values except BYTES and (possibly) 64-bit integers.
        return true;
    }
    // Special case BYTES - we need to compare each byte individually
    if (type == descriptors_js_1.ScalarType.BYTES) {
        if (!(a instanceof Uint8Array) || !(b instanceof Uint8Array)) {
            return false;
        }
        if ((/** @type {!Uint8Array} */ (a)).length !== (/** @type {!Uint8Array} */ (b)).length) {
            return false;
        }
        for (let i = 0; i < (/** @type {!Uint8Array} */ (a)).length; i++) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    }
    // Special case 64-bit integers - we support number, string and bigint representation.
    switch (type) {
        case descriptors_js_1.ScalarType.UINT64:
        case descriptors_js_1.ScalarType.FIXED64:
        case descriptors_js_1.ScalarType.INT64:
        case descriptors_js_1.ScalarType.SFIXED64:
        case descriptors_js_1.ScalarType.SINT64:
            // Loose comparison will match between 0n, 0 and "0".
            return a == b;
    }
    // Anything that hasn't been caught by strict comparison or special cased
    // BYTES and 64-bit integers is not equal.
    return false;
}
exports.scalarEquals = scalarEquals;
/**
 * Returns the zero value for the given scalar type.
 * @template T, LongAsString
 * @param {T} type
 * @param {LongAsString} longAsString
 * @return {?}
 */
function scalarZeroValue(type, longAsString) {
    switch (type) {
        case descriptors_js_1.ScalarType.STRING:
            return (/** @type {?} */ (""));
        case descriptors_js_1.ScalarType.BOOL:
            return (/** @type {?} */ (false));
        case descriptors_js_1.ScalarType.DOUBLE:
        case descriptors_js_1.ScalarType.FLOAT:
            return (/** @type {?} */ (0.0));
        case descriptors_js_1.ScalarType.INT64:
        case descriptors_js_1.ScalarType.UINT64:
        case descriptors_js_1.ScalarType.SFIXED64:
        case descriptors_js_1.ScalarType.FIXED64:
        case descriptors_js_1.ScalarType.SINT64:
            return (/** @type {?} */ ((longAsString ? "0" : proto_int64_js_1.protoInt64.zero)));
        case descriptors_js_1.ScalarType.BYTES:
            return (/** @type {?} */ (new Uint8Array(0)));
        default:
            // Handles INT32, UINT32, SINT32, FIXED32, SFIXED32.
            // We do not use individual cases to save a few bytes code size.
            return (/** @type {?} */ (0));
    }
}
exports.scalarZeroValue = scalarZeroValue;
/**
 * Returns true for a zero-value. For example, an integer has the zero-value `0`,
 * a boolean is `false`, a string is `""`, and bytes is an empty Uint8Array.
 *
 * In proto3, zero-values are not written to the wire, unless the field is
 * optional or repeated.
 * @param {!tsickle_descriptors_2.ScalarType} type
 * @param {*} value
 * @return {boolean}
 */
function isScalarZeroValue(type, value) {
    switch (type) {
        case descriptors_js_1.ScalarType.BOOL:
            return value === false;
        case descriptors_js_1.ScalarType.STRING:
            return value === "";
        case descriptors_js_1.ScalarType.BYTES:
            return value instanceof Uint8Array && !(/** @type {!Uint8Array} */ (value)).byteLength;
        default:
            return value == 0; // Loose comparison matches 0n, 0 and "0"
    }
}
exports.isScalarZeroValue = isScalarZeroValue;
