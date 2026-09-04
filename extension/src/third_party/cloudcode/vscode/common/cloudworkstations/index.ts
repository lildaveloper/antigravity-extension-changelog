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
 * Generated from: third_party/cloudcode/vscode/common/cloudworkstations/index.ts
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
goog.module('google3.third_party.cloudcode.vscode.common.cloudworkstations.index');
var module = module || { id: 'third_party/cloudcode/vscode/common/cloudworkstations/index.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_vscode_1 = goog.requireType("vscode");
/**
 * CloudWorkstationsEnvironment provides the functionality to describe the current Cloud Workstations environment.  It should be used to provide instrumentation,
 * not to differ functionality, use feature flags for this.
 *
 * DO NOT USE THIS CLASS TO DIFFERENTIATE FUNCTIONALITY, USE FEATURE FLAGS FOR THIS!!!
 */
class CloudWorkstationsEnvironment {
    /**
     * @public
     * @param {!NodeJS.ProcessEnv=} env
     */
    constructor(env = process.env) {
        this.env = env;
    }
    /**
     * runningOnCloudWorkstations provides signal that the code is running.
     *
     * @public
     * @return {boolean} true if the extension is running in Cloud Workstations, false otherwise
     */
    runningOnCloudWorkstations() {
        return !!this.env['GOOGLE_CLOUD_WORKSTATIONS'];
    }
    /**
     * Sets the context value `runningOnCloudWorkstations` based on whether the user is running Cloud Workstations
     * @public
     * @param {?} vscodeCommands The commands module to use for setting context
     * @return {void}
     */
    setContext(vscodeCommands) {
        vscodeCommands.executeCommand('setContext', 'runningOnCloudWorkstations', this.runningOnCloudWorkstations());
    }
}
exports.CloudWorkstationsEnvironment = CloudWorkstationsEnvironment;
/* istanbul ignore if */
if (false) {
    /**
     * @const {!NodeJS.ProcessEnv}
     * @private
     */
    CloudWorkstationsEnvironment.prototype.env;
}
