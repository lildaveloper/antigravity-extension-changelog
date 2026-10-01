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
 * Generated from: third_party/javascript/connectrpc_connect/src/protocol-connect/content-type.ts
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
goog.module('google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.content$2dtype');
var module = module || { id: 'third_party/javascript/connectrpc_connect/src/protocol-connect/content-type.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
/**
 * Regular Expression that matches any valid Connect Content-Type header value.
 *
 * @type {!RegExp}
 */
exports.contentTypeRegExp = /^application\/(connect\+)?(?:(json)(?:; ?charset=utf-?8)?|(proto))$/i;
/**
 * Regular Expression that matches a Connect unary Content-Type header value.
 *
 * @type {!RegExp}
 */
exports.contentTypeUnaryRegExp = /^application\/(?:json(?:; ?charset=utf-?8)?|proto)$/i;
/**
 * Regular Expression that matches a Connect streaming Content-Type header value.
 *
 * @type {!RegExp}
 */
exports.contentTypeStreamRegExp = /^application\/connect\+?(?:json(?:; ?charset=utf-?8)?|proto)$/i;
/** @type {string} */
exports.contentTypeUnaryProto = "application/proto";
/** @type {string} */
exports.contentTypeUnaryJson = "application/json";
/** @type {string} */
exports.contentTypeStreamProto = "application/connect+proto";
/** @type {string} */
exports.contentTypeStreamJson = "application/connect+json";
/** @type {string} */
const encodingProto = "proto";
/** @type {string} */
const encodingJson = "json";
/**
 * Parse a Connect Content-Type header.
 *
 * @param {(null|string)} contentType
 * @return {(undefined|{stream: boolean, binary: boolean})}
 */
function parseContentType(contentType) {
    /** @type {(undefined|null|!RegExpMatchArray)} */
    const match = contentType?.match(exports.contentTypeRegExp);
    if (!match) {
        return undefined;
    }
    /** @type {boolean} */
    const stream = !!match[1];
    /** @type {boolean} */
    const binary = !!match[3];
    return { stream, binary };
}
exports.parseContentType = parseContentType;
/**
 * Parse a Connect Get encoding query parameter.
 *
 * @param {(null|string)} encoding
 * @return {(undefined|{stream: boolean, binary: boolean})}
 */
function parseEncodingQuery(encoding) {
    switch (encoding) {
        case encodingProto:
            return { stream: false, binary: true };
        case encodingJson:
            return { stream: false, binary: false };
        default:
            return undefined;
    }
}
exports.parseEncodingQuery = parseEncodingQuery;
