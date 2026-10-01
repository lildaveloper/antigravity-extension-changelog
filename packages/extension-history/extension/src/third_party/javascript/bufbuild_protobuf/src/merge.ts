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
 * Generated from: third_party/javascript/bufbuild_protobuf/src/merge.ts
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
goog.module('google3.third_party.javascript.bufbuild_protobuf.src.merge');
var module = module || { id: 'third_party/javascript/bufbuild_protobuf/src/merge.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_types_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.types");
const tsickle_descriptors_2 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.descriptors");
const tsickle_reflect_3 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.reflect");
const tsickle_reflect_types_4 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.reflect$2dtypes");
const tsickle_binary_encoding_5 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wire.binary$2dencoding");
const reflect_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.reflect.reflect');
/**
 * Merge message `source` into message `target`, following Protobuf semantics.
 *
 * This is the same as serializing the source message, then deserializing it
 * into the target message via `mergeFromBinary()`, with one difference:
 * While serialization will create a copy of all values, `merge()` will copy
 * the reference for `bytes` and messages.
 *
 * Also see https://protobuf.com/docs/language-spec#merging-protobuf-messages
 * @template Desc
 * @param {Desc} schema
 * @param {?} target
 * @param {?} source
 * @return {void}
 */
function merge(schema, target, source) {
    reflectMerge((0, reflect_js_1.reflect)(schema, target), (0, reflect_js_1.reflect)(schema, source));
}
exports.merge = merge;
/**
 * @param {!tsickle_reflect_types_4.ReflectMessage} target
 * @param {!tsickle_reflect_types_4.ReflectMessage} source
 * @return {void}
 */
function reflectMerge(target, source) {
    /** @type {(undefined|!Array<{no: number, wireType: !tsickle_binary_encoding_5.WireType, data: !Uint8Array}>)} */
    const sourceUnknown = source.message.$unknown;
    if (sourceUnknown !== undefined && sourceUnknown.length > 0) {
        target.message.$unknown ??= [];
        target.message.$unknown.push(...sourceUnknown);
    }
    for (const f of target.fields) {
        if (!source.isSet(f)) {
            continue;
        }
        switch (f.fieldKind) {
            case "scalar":
            case "enum":
                target.set(f, source.get(f));
                break;
            case "message":
                if (target.isSet(f)) {
                    reflectMerge(target.get(f), source.get(f));
                }
                else {
                    target.set(f, source.get(f));
                }
                break;
            case "list":
                /** @type {!tsickle_reflect_types_4.ReflectList<*>} */
                const list = target.get(f);
                for (const e of source.get(f)) {
                    list.add(e);
                }
                break;
            case "map":
                /** @type {!tsickle_reflect_types_4.ReflectMap<*, *>} */
                const map = target.get(f);
                for (const [k__tsickle_destructured_1, v__tsickle_destructured_2] of source.get(f)) {
                    const k = /** @type {*} */ (k__tsickle_destructured_1);
                    const v = /** @type {*} */ (v__tsickle_destructured_2);
                    map.set(k, v);
                }
                break;
        }
    }
}
