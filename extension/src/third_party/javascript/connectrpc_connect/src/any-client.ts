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
 * Generated from: third_party/javascript/connectrpc_connect/src/any-client.ts
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
goog.module('google3.third_party.javascript.connectrpc_connect.src.any$2dclient');
var module = module || { id: 'third_party/javascript/connectrpc_connect/src/any-client.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_protobuf_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.index");
/**
 * AnyClient is an arbitrary service client with any method signature.
 *
 * It usually has methods for all methods defined for a service, but may
 * omit some, for example because it's transport does not support streaming.
 * @typedef {?}
 */
exports.AnyClient;
/** @typedef {function(...?): ?} */
var AnyClientMethod;
/** @typedef {function(?): (null|function(...?): ?)} */
var CreateAnyClientMethod;
/**
 * Create any client for the given service.
 *
 * The given createMethod function is called for each method definition
 * of the service. The function it returns is added to the client object
 * as a method.
 * @param {!tsickle_protobuf_1.DescService} service
 * @param {function(?): (null|function(...?): ?)} createMethod
 * @return {?}
 */
function makeAnyClient(service, createMethod) {
    /** @type {?} */
    const client = {};
    for (const desc of service.methods) {
        /** @type {(null|function(...?): ?)} */
        const method = createMethod(desc);
        if (method != null) {
            client[desc.localName] = method;
        }
    }
    return client;
}
exports.makeAnyClient = makeAnyClient;
