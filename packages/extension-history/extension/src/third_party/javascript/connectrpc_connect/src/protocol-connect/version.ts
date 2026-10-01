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
 * Generated from: third_party/javascript/connectrpc_connect/src/protocol-connect/version.ts
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
goog.module('google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.version');
var module = module || { id: 'third_party/javascript/connectrpc_connect/src/protocol-connect/version.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_headers_1 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.headers");
const tsickle_query_params_2 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.query$2dparams");
const tsickle_connect_error_3 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.connect$2derror");
const tsickle_code_4 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.code");
const headers_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.headers');
const query_params_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.query$2dparams');
const connect_error_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.connect$2derror');
const code_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.code');
/**
 * The only know value for the header Connect-Protocol-Version.
 *
 * @type {string}
 */
exports.protocolVersion = "1";
/**
 * Requires the Connect-Protocol-Version header to be present with the expected
 * value. Raises a ConnectError with Code.InvalidArgument otherwise.
 *
 * @param {!Headers} requestHeader
 * @return {void}
 */
function requireProtocolVersionHeader(requestHeader) {
    /** @type {(null|string)} */
    const v = requestHeader.get(headers_js_1.headerProtocolVersion);
    if (v === null) {
        throw new connect_error_js_1.ConnectError(`missing required header: set ${headers_js_1.headerProtocolVersion} to "${exports.protocolVersion}"`, code_js_1.Code.InvalidArgument);
    }
    if (v !== exports.protocolVersion) {
        throw new connect_error_js_1.ConnectError(`${headers_js_1.headerProtocolVersion} must be "${exports.protocolVersion}": got "${v}"`, code_js_1.Code.InvalidArgument);
    }
}
exports.requireProtocolVersionHeader = requireProtocolVersionHeader;
/**
 * Requires the connect query parameter to be present with the expected value.
 * Raises a ConnectError with Code.InvalidArgument otherwise.
 *
 * @param {!URLSearchParams} queryParams
 * @return {void}
 */
function requireProtocolVersionParam(queryParams) {
    /** @type {(null|string)} */
    const v = queryParams.get(query_params_js_1.paramConnectVersion);
    if (v === null) {
        throw new connect_error_js_1.ConnectError(`missing required parameter: set ${query_params_js_1.paramConnectVersion} to "v${exports.protocolVersion}"`, code_js_1.Code.InvalidArgument);
    }
    if (v !== `v${exports.protocolVersion}`) {
        throw new connect_error_js_1.ConnectError(`${query_params_js_1.paramConnectVersion} must be "v${exports.protocolVersion}": got "${v}"`, code_js_1.Code.InvalidArgument);
    }
}
exports.requireProtocolVersionParam = requireProtocolVersionParam;
