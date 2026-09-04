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
 * Generated from: third_party/javascript/connectrpc_connect/src/protocol/content-type-matcher.ts
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
goog.module('google3.third_party.javascript.connectrpc_connect.src.protocol.content$2dtype$2dmatcher');
var module = module || { id: 'third_party/javascript/connectrpc_connect/src/protocol/content-type-matcher.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
/**
 * A function that returns true if a given mime type is supported.
 *
 * @record
 */
function ContentTypeMatcher() { }
exports.ContentTypeMatcher = ContentTypeMatcher;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!Array<!RegExp>}
     * @public
     */
    ContentTypeMatcher.prototype.supported;
    /* Skipping unhandled member: (contentType: string | null): boolean;*/
}
/** @type {number} */
const contentTypeMatcherCacheSize = 1024;
/**
 * Create a function that returns true if the given mime type is supported.
 * A mime type is supported when one of the regular expressions match.
 *
 * @param {...(!RegExp|?)} supported
 * @return {!ContentTypeMatcher}
 */
function contentTypeMatcher(...supported) {
    /** @type {!Map<string, boolean>} */
    const cache = new Map();
    /** @type {!Array<!RegExp>} */
    const source = supported.reduce((/**
     * @param {!Array<!RegExp>} previousValue
     * @param {(!RegExp|?)} currentValue
     * @return {!Array<!RegExp>}
     */
    (previousValue, currentValue) => previousValue.concat("supported" in currentValue ? currentValue.supported : currentValue)), []);
    /**
     * @param {(null|string)} contentType
     * @return {boolean}
     */
    function match(contentType) {
        if (contentType === null || contentType.length == 0) {
            return false;
        }
        /** @type {(undefined|boolean)} */
        const cached = cache.get(contentType);
        if (cached !== undefined) {
            return cached;
        }
        /** @type {boolean} */
        const ok = source.some((/**
         * @param {!RegExp} re
         * @return {boolean}
         */
        (re) => re.test(contentType)));
        if (cache.size < contentTypeMatcherCacheSize) {
            cache.set(contentType, ok);
        }
        return ok;
    }
    match.supported = source;
    return match;
}
exports.contentTypeMatcher = contentTypeMatcher;
