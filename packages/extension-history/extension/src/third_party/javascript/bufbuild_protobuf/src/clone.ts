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
 * Generated from: third_party/javascript/bufbuild_protobuf/src/clone.ts
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
goog.module('google3.third_party.javascript.bufbuild_protobuf.src.clone');
var module = module || { id: 'third_party/javascript/bufbuild_protobuf/src/clone.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_types_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.types");
const tsickle_descriptors_2 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.descriptors");
const tsickle_reflect_types_3 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.reflect$2dtypes");
const tsickle_reflect_4 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.reflect");
const tsickle_guard_5 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.guard");
const tsickle_binary_encoding_6 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wire.binary$2dencoding");
const descriptors_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.descriptors');
const reflect_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.reflect.reflect');
const guard_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.reflect.guard');
/**
 * Create a deep copy of a message, including extensions and unknown fields.
 * @template Desc
 * @param {Desc} schema
 * @param {?} message
 * @return {?}
 */
function clone(schema, message) {
    return (/** @type {?} */ (cloneReflect((0, reflect_js_1.reflect)(schema, message)).message));
}
exports.clone = clone;
/**
 * @param {!tsickle_reflect_types_3.ReflectMessage} i
 * @return {!tsickle_reflect_types_3.ReflectMessage}
 */
function cloneReflect(i) {
    /** @type {!tsickle_reflect_types_3.ReflectMessage} */
    const o = (0, reflect_js_1.reflect)(i.desc);
    for (const f of i.fields) {
        if (!i.isSet(f)) {
            continue;
        }
        switch (f.fieldKind) {
            case "list":
                /** @type {!tsickle_reflect_types_3.ReflectList<*>} */
                const list = o.get(f);
                for (const item of i.get(f)) {
                    list.add(cloneSingular(f, item));
                }
                break;
            case "map":
                /** @type {!tsickle_reflect_types_3.ReflectMap<*, *>} */
                const map = o.get(f);
                for (const entry of i.get(f).entries()) {
                    map.set(entry[0], cloneSingular(f, entry[1]));
                }
                break;
            default: {
                o.set(f, cloneSingular(f, i.get(f)));
                break;
            }
        }
    }
    /** @type {(undefined|!Array<{no: number, wireType: !tsickle_binary_encoding_6.WireType, data: !Uint8Array}>)} */
    const unknown = i.getUnknown();
    if (unknown && unknown.length > 0) {
        o.setUnknown([...unknown]);
    }
    return o;
}
/**
 * @template T
 * @param {?} field
 * @param {T} value
 * @return {T}
 */
function cloneSingular(field, value) {
    if (field.message !== undefined && (0, guard_js_1.isReflectMessage)(value)) {
        return (/** @type {T} */ (cloneReflect(value)));
    }
    if (field.scalar == descriptors_js_1.ScalarType.BYTES && value instanceof Uint8Array) {
        // @ts-expect-error T cannot extend Uint8Array in practice
        return value.slice();
    }
    return value;
}
