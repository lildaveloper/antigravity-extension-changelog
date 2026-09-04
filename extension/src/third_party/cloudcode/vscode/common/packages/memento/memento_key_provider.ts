/**
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/cloudcode/vscode/common/packages/memento/memento_key_provider.ts
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
goog.module('google3.third_party.cloudcode.vscode.common.packages.memento.memento_key_provider');
var module = module || { id: 'third_party/cloudcode/vscode/common/packages/memento/memento_key_provider.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_vscode_1 = goog.requireType("vscode");
const tsickle_extensionUtil_2 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.utils.extensionUtil");
const tsickle_util_3 = goog.requireType("google3.third_party.javascript.typings.node.node.util");
const extensionUtil_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.utils.extensionUtil');
const util_1 = goog.require('google3.third_party.javascript.typings.node.node.util');
/**
 * A class appends extension specific prefix to shared memento key.
 */
class SharedPackageMementoKeyProvider {
    /**
     * @public
     * @param {!tsickle_vscode_1.ExtensionContext} extensionContext
     */
    constructor(extensionContext) {
        this.mementoKeyPrefix = (0, extensionUtil_1.getExtensionName)(extensionContext);
    }
    /**
     * @public
     * @param {string} sharedMementoKey
     * @return {string}
     */
    getKey(sharedMementoKey) {
        return (0, util_1.format)(sharedMementoKey, this.mementoKeyPrefix);
    }
}
exports.SharedPackageMementoKeyProvider = SharedPackageMementoKeyProvider;
/* istanbul ignore if */
if (false) {
    /**
     * @type {string}
     * @private
     */
    SharedPackageMementoKeyProvider.prototype.mementoKeyPrefix;
}
