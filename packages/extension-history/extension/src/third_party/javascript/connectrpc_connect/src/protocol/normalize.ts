/**
 * @license
 * Copyright 2021-2025 The Connect Authors
 * SPDX-License-Identifier: Apache-2.0
 */
// Copyright 2021-2025 The Connect Authors
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
 * Generated from: third_party/javascript/connectrpc_connect/src/protocol/normalize.ts
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
goog.module('google3.third_party.javascript.connectrpc_connect.src.protocol.normalize');
var module = module || { id: 'third_party/javascript/connectrpc_connect/src/protocol/normalize.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_protobuf_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.index");
const protobuf_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.index');
/**
 *  Takes a partial protobuf messages of the
 *  specified message type as input, and returns full instances.
 * @template Desc
 * @param {Desc} desc
 * @param {?} message
 * @return {?}
 */
function normalize(desc, message) {
    return (0, protobuf_1.create)(desc, message);
}
exports.normalize = normalize;
/**
 * Takes an AsyncIterable of partial protobuf messages of the
 * specified message type as input, and yields full instances.
 * @template Desc
 * @param {Desc} desc
 * @param {!AsyncIterable<?, ?, ?>} input
 * @return {!AsyncIterable<?, ?, ?>}
 */
function normalizeIterable(desc, input) {
    /**
     * @param {(!IteratorReturnResult<?>|!IteratorYieldResult<?>)} result
     * @return {(!IteratorReturnResult<?>|{done: (undefined|boolean), value: ?})}
     */
    function transform(result) {
        if (result.done === true) {
            return result;
        }
        return {
            done: (/** @type {!IteratorYieldResult<?>} */ (result)).done,
            value: normalize(desc, (/** @type {!IteratorYieldResult<?>} */ (result)).value),
        };
    }
    return {
        /**
         * @public
         * @return {!AsyncIterator<?, ?, ?>}
         */
        [Symbol.asyncIterator]() {
            /** @type {!AsyncIterator<?, ?, ?>} */
            const it = input[Symbol.asyncIterator]();
            /** @type {!AsyncIterator<?, ?, ?>} */
            const res = {
                next: (/**
                 * @return {!Promise<(!IteratorReturnResult<?>|!IteratorYieldResult<?>|{done: (undefined|boolean), value: ?})>}
                 */
                () => it.next().then(transform)),
            };
            if (it.throw !== undefined) {
                res.throw = (/**
                 * @param {*} e
                 * @return {!Promise<(!IteratorReturnResult<?>|!IteratorYieldResult<?>|{done: (undefined|boolean), value: ?})>}
                 */
                (e) => ((/** @type {?} */ (it))).throw(e).then(transform));
            }
            if (it.return !== undefined) {
                res.return = (/**
                 * @param {*} v
                 * @return {!Promise<(!IteratorReturnResult<?>|!IteratorYieldResult<?>|{done: (undefined|boolean), value: ?})>}
                 */
                (v) => ((/** @type {?} */ (it))).return(v).then(transform));
            }
            return res;
        },
    };
}
exports.normalizeIterable = normalizeIterable;
