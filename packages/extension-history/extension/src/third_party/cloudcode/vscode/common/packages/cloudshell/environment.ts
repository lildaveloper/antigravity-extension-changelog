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
// taze: process from //third_party/javascript/typings/node
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/cloudcode/vscode/common/packages/cloudshell/environment.ts
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
goog.module('google3.third_party.cloudcode.vscode.common.packages.cloudshell.environment');
var module = module || { id: 'third_party/cloudcode/vscode/common/packages/cloudshell/environment.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
class CloudShellEnv {
    /**
     * runningOnCloudShell returns true if the extension is currently activated on Cloud Shell, false otherwise.
     * @public
     * @return {boolean}
     */
    static runningOnCloudShell() {
        return process.env['CLOUD_SHELL'] === 'true' || CloudShellEnv.runningInCloudShellEditor();
    }
    /**
     * runningInCloudShellEditor returns true if the extension is currently activated in Theia on Cloud Shell, false otherwise.
     *
     * @export
     * @param {!NodeJS.ProcessEnv=} env
     * @return {boolean}
     */
    static runningInCloudShellEditor(env = process.env) {
        return env['EDITOR_IN_CLOUD_SHELL'] === 'true';
    }
    /**
     * Returns false if either CLOUD_CODE_CLOUD_SHELL_AUTHENTICATION environment variable is explicitly set to 'false' or if the extension is not running on Cloud Shell.
     * @public
     * @param {!NodeJS.ProcessEnv=} env
     * @return {boolean}
     */
    static cloudShellAuthEnabled(env = process.env) {
        /** @type {(undefined|string)} */
        const enabled = env['CLOUD_CODE_CLOUD_SHELL_AUTHENTICATION'];
        return enabled !== undefined ? !(enabled === 'false') : CloudShellEnv.runningOnCloudShell();
    }
    /**
     * Returns true iff the extension is running on Cloud Shell AND the
     * NEW_GCA_AUTH_FLOW environment variable is explicitly set to 'true' (not
     * case sensitive).
     * @public
     * @param {!NodeJS.ProcessEnv=} env
     * @return {boolean}
     */
    static cloudShellAutoAuthEnabled(env = process.env) {
        return CloudShellEnv.runningOnCloudShell() && env['NEW_GCA_AUTH_FLOW']?.toLocaleLowerCase() === 'true';
    }
}
exports.CloudShellEnv = CloudShellEnv;
