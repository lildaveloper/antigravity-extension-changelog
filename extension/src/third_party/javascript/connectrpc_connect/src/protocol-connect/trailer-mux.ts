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
 * Generated from: third_party/javascript/connectrpc_connect/src/protocol-connect/trailer-mux.ts
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
goog.module('google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.trailer$2dmux');
var module = module || { id: 'third_party/javascript/connectrpc_connect/src/protocol-connect/trailer-mux.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
/**
 * In unary RPCs, Connect transports trailing metadata as response header
 * fields, prefixed with "trailer-".
 *
 * This function demuxes headers and trailers into two separate Headers
 * objects.
 *
 * @param {!Headers} header
 * @return {!Array<?>}
 */
function trailerDemux(header) {
    /** @type {!Headers} */
    const h = new Headers();
    /** @type {!Headers} */
    const t = new Headers();
    header.forEach((/**
     * @param {string} value
     * @param {string} key
     * @return {void}
     */
    (value, key) => {
        if (key.toLowerCase().startsWith("trailer-")) {
            t.append(key.substring(8), value);
        }
        else {
            h.append(key, value);
        }
    }));
    return [h, t];
}
exports.trailerDemux = trailerDemux;
/**
 * In unary RPCs, Connect transports trailing metadata as response header
 * fields, prefixed with "trailer-".
 *
 * This function muxes a header and a trailer into a single Headers object.
 *
 * @param {!Headers} header
 * @param {!Headers} trailer
 * @return {!Headers}
 */
function trailerMux(header, trailer) {
    /** @type {!Headers} */
    const h = new Headers(header);
    trailer.forEach((/**
     * @param {string} value
     * @param {string} key
     * @return {void}
     */
    (value, key) => {
        h.append(`trailer-${key}`, value);
    }));
    return h;
}
exports.trailerMux = trailerMux;
