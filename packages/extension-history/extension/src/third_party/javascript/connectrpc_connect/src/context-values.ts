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
 * Generated from: third_party/javascript/connectrpc_connect/src/context-values.ts
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
goog.module('google3.third_party.javascript.connectrpc_connect.src.context$2dvalues');
var module = module || { id: 'third_party/javascript/connectrpc_connect/src/context-values.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
/**
 * ContextValues is a collection of context values.
 * @record
 */
function ContextValues() { }
exports.ContextValues = ContextValues;
/* istanbul ignore if */
if (false) {
    /**
     * get returns a context value.
     * @public
     * @template T
     * @param {{id: symbol, defaultValue: T}} key
     * @return {T}
     */
    ContextValues.prototype.get = function (key) { };
    /**
     * set sets a context value. It returns the ContextValues to allow chaining.
     * @public
     * @template THIS,T
     * @this {THIS}
     * @param {{id: symbol, defaultValue: T}} key
     * @param {T} value
     * @return {THIS}
     */
    ContextValues.prototype.set = function (key, value) { };
    /**
     * delete deletes a context value. It returns the ContextValues to allow chaining.
     * @public
     * @template THIS
     * @this {THIS}
     * @param {{id: symbol, defaultValue: *}} key
     * @return {THIS}
     */
    ContextValues.prototype.delete = function (key) { };
}
/**
 * createContextValues creates a new ContextValues.
 * @return {!ContextValues}
 */
function createContextValues() {
    return (/** @type {?} */ ({
        /**
         * @public
         * @template T
         * @param {{id: symbol, defaultValue: T}} key
         * @return {T}
         */
        get(key) {
            return key.id in this ? ((/** @type {T} */ (this[key.id]))) : key.defaultValue;
        },
        /**
         * @public
         * @template T
         * @param {{id: symbol, defaultValue: T}} key
         * @param {T} value
         * @return {?}
         */
        set(key, value) {
            this[key.id] = value;
            return this;
        },
        /**
         * @public
         * @param {{id: symbol, defaultValue: *}} key
         * @return {?}
         */
        delete(key) {
            delete this[key.id];
            return this;
        },
    }));
}
exports.createContextValues = createContextValues;
/**
 * ContextKey is a unique identifier for a context value.
 * @typedef {{id: symbol, defaultValue: ?}}
 */
exports.ContextKey;
/**
 * createContextKey creates a new ContextKey.
 * @template T
 * @param {T} defaultValue
 * @param {(undefined|{description: (undefined|string)})=} options
 * @return {{id: symbol, defaultValue: T}}
 */
function createContextKey(defaultValue, options) {
    return { id: Symbol(options?.description), defaultValue };
}
exports.createContextKey = createContextKey;
