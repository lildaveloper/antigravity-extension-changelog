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
 * @fileoverview Helper functions related to reading IDE related metadata
 * Generated from: third_party/cloudcode/vscode/common/packages/utils/ide_utils.ts
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
goog.module('google3.third_party.cloudcode.vscode.common.packages.utils.ide_utils');
var module = module || { id: 'third_party/cloudcode/vscode/common/packages/utils/ide_utils.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_semver_1 = goog.requireType("google3.third_party.javascript.typings.semver.index");
const tsickle_vscode_2 = goog.requireType("vscode");
const tsickle_config_helper_3 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.config.config_helper");
const tsickle_commands_constants_4 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.constants.commands_constants");
const tsickle_ui_constants_5 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.constants.ui_constants");
const tsickle_logging_6 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.logging.index");
const semver = goog.require('google3.third_party.javascript.typings.semver.index');
const vscode = goog.require('vscode');
const config_helper_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.config.config_helper');
const commands_constants_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.constants.commands_constants');
const ui_constants_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.constants.ui_constants');
const logging_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.logging.index');
/**
 * @param {?} code
 * @return {string}
 */
function getIdeName(code) {
    return code.env.appName;
}
exports.getIdeName = getIdeName;
/**
 * @param {?} code
 * @return {string}
 */
function getIdeVersion(code) {
    return code.version;
}
exports.getIdeVersion = getIdeVersion;
/**
 * Returns `true` if the current VSCode version is recommended to have the setting `http.systemCertificatesNode` set to `true`.
 * @param {?} code The `vscode` module.
 * @return {boolean}
 */
function shouldHaveSystemCertificatesNodeSettingRecommendation(code) {
    /** @type {(undefined|boolean)} */
    const configValue = new config_helper_1.ConfigHelper('http.systemCertificatesNode', code).getConfig();
    return semver.satisfies(code.version, '>=1.106.0', { includePrerelease: true }) && !configValue;
}
exports.shouldHaveSystemCertificatesNodeSettingRecommendation = shouldHaveSystemCertificatesNodeSettingRecommendation;
/**
 * Sets a boolean configuration value to true and prompts the user to reload VS Code.
 * @param {!tsickle_config_helper_3.ConfigHelper<boolean>} configHelper The configuration helper for the setting.
 * @param {?} code The `vscode` module.
 * @return {!Promise<void>}
 */
async function setConfigAndReload(configHelper, code) {
    await configHelper.setConfig(true, vscode.ConfigurationTarget.Global);
    /** @type {(undefined|string)} */
    const reloadSelection = await code.window.showInformationMessage(ui_constants_1.RELOAD_NEEDED, { modal: true }, ui_constants_1.RELOAD);
    if (reloadSelection === ui_constants_1.RELOAD) {
        await code.commands.executeCommand(commands_constants_1.RELOAD_VSCODE_COMMAND);
    }
}
exports.setConfigAndReload = setConfigAndReload;
/**
 * Shows an error message with a button that opens an external URL.
 * @param {?} code The `vscode` module.
 * @param {string} errorMessage The error message to display.
 * @param {string} buttonText The text for the button.
 * @param {string} buttonUrl The URL to open when the button is clicked.
 * @return {void}
 */
function showErrorMessageWithButton(code, errorMessage, buttonText, buttonUrl) {
    void Promise.resolve(code.window.showErrorMessage(errorMessage, buttonText)).then((/**
     * @param {(undefined|string)} selection
     * @return {!Promise<void>}
     */
    async (selection) => {
        if (selection === buttonText) {
            void code.env.openExternal(code.Uri.parse(buttonUrl));
        }
    }));
}
exports.showErrorMessageWithButton = showErrorMessageWithButton;
/**
 * Prompts the user to enable a specific setting if it's not already configured.
 * @param {?} code The `vscode` module.
 * @param {string} configSection The configuration section (e.g., 'http').
 * @param {string} settingName The name of the setting to check and update.
 * @param {string} message The message to display to the user.
 * @return {!Promise<void>}
 */
async function promptToEnableSetting(code, configSection, settingName, message) {
    /** @type {!tsickle_config_helper_3.ConfigHelper<boolean>} */
    const configHelper = new config_helper_1.ConfigHelper(`${configSection}.${settingName}`, code);
    if (!configHelper.hasConfig()) {
        void Promise.resolve(code.window.showErrorMessage(message, 'Enable setting')).then((/**
         * @param {(undefined|string)} selection
         * @return {!Promise<void>}
         */
        async (selection) => {
            if (selection === 'Enable setting') {
                await exports.setConfigAndReload(configHelper, code);
            }
        })).catch((/**
         * @param {?} e
         * @return {void}
         */
        e => (0, logging_1.warn)(`Failed to set default for ${configSection}.${settingName}: ${e}`)));
    }
}
exports.promptToEnableSetting = promptToEnableSetting;
/**
 * Set `http.systemCertificatesNode` to `true`
 * Context: b/462262599.
 * @param {?} code
 * @return {!Promise<void>}
 */
async function enableSystemCertificatesNodeSetting(code) {
    try {
        if (!exports.shouldHaveSystemCertificatesNodeSettingRecommendation(code)) {
            return;
        }
        /** @type {!tsickle_config_helper_3.ConfigHelper<boolean>} */
        const configHelper = new config_helper_1.ConfigHelper('http.systemCertificatesNode', code);
        if (!configHelper.hasConfig()) {
            await exports.setConfigAndReload(configHelper, code);
        }
    }
    catch (e) {
        (0, logging_1.warn)(`Failed to set true for http.systemCertificatesNode: ${e}`);
    }
}
exports.enableSystemCertificatesNodeSetting = enableSystemCertificatesNodeSetting;
/**
 * Set `http.systemCertificatesNode` to `true` if this property exists.
 * Context: b/462262599.
 * @param {?} code
 * @return {!Promise<void>}
 */
async function promptMustSetDefaultExperimentalHttpConfig(code) {
    if (exports.shouldHaveSystemCertificatesNodeSettingRecommendation(code)) {
        await exports.promptToEnableSetting(code, 'http', 'systemCertificatesNode', 'Failed to refresh Google Credentials. Enable the http.systemCertificatesNode setting to correct this issue.');
    }
}
exports.promptMustSetDefaultExperimentalHttpConfig = promptMustSetDefaultExperimentalHttpConfig;
