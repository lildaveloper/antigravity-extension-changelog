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
 * @fileoverview Config Helper is an intermediary class between the extension and the VS Code API
 * allowing for stronger typing and additional massagers in reading and setting configuration values.
 * Generated from: third_party/cloudcode/vscode/common/packages/config/config_helper.ts
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
goog.module('google3.third_party.cloudcode.vscode.common.packages.config.config_helper');
var module = module || { id: 'third_party/cloudcode/vscode/common/packages/config/config_helper.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_vscode_1 = goog.requireType("vscode");
const tsickle_types_2 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.config.types");
const tsickle_logging_3 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.logging.index");
const logging_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.logging.index');
// TODO(b/241476910) Use blaze built ConfigHelper again.
// We had to reimplement this to be built with webpack because it broke Cloud Shell.
/**
 * @template T
 */
class ConfigHelper {
    /**
     * @public
     * @param {string} configKey
     * @param {?} code
     */
    constructor(configKey, code) {
        this.configKey = configKey;
        this.code = code;
    }
    /**
     * Sets the config value to the specified target
     * @public
     * @template K
     * @param {string} key Settings key
     * @param {K} value Settings value
     * @param {!tsickle_vscode_1.ConfigurationTarget=} configurationTarget
     * @return {!Promise<void>}
     */
    async setConfigValue(key, value, configurationTarget = this.code.ConfigurationTarget.Global) {
        /** @type {!tsickle_vscode_1.WorkspaceConfiguration} */
        const config = this.code.workspace.getConfiguration();
        /** @type {(undefined|T)} */
        const configSetting = config.get(this.configKey);
        /** @type {?} */
        const newSetting = Object.assign({}, configSetting);
        await config.update(this.configKey, { ...((/** @type {!Object} */ (newSetting))), [key]: value }, configurationTarget);
    }
    /**
     * Sets the config value to newConfig.
     * This is useful if the setting is an array instead
     * of a dictionary.
     * @public
     * @param {T} newConfig
     * @param {(undefined|!tsickle_vscode_1.ConfigurationTarget)=} configurationTarget
     * @return {!Promise<void>}
     */
    async setConfig(newConfig, configurationTarget) {
        if (!configurationTarget) {
            configurationTarget = this.getOverriddenConfigurationTarget();
        }
        /** @type {!tsickle_vscode_1.WorkspaceConfiguration} */
        const config = this.code.workspace.getConfiguration();
        await config.update(this.configKey, newConfig, configurationTarget);
    }
    /**
     * Removes the config.
     * @public
     * @param {!tsickle_vscode_1.ConfigurationTarget=} configurationTarget
     * @return {!Promise<void>}
     */
    async removeConfig(configurationTarget = this.code.ConfigurationTarget.Global) {
        /** @type {!tsickle_vscode_1.WorkspaceConfiguration} */
        const config = this.code.workspace.getConfiguration();
        await config.update(this.configKey, undefined, configurationTarget);
    }
    /**
     * Gets the global config value
     * @public
     * @return {(undefined|T)}
     */
    getConfig() {
        /** @type {!tsickle_vscode_1.WorkspaceConfiguration} */
        const config = this.code.workspace.getConfiguration();
        return config.get(this.configKey);
    }
    /**
     * @public
     * @return {boolean}
     */
    hasConfig() {
        /** @type {!tsickle_vscode_1.WorkspaceConfiguration} */
        const config = this.code.workspace.getConfiguration();
        /** @type {(undefined|{key: string, defaultValue: *, globalValue: *, workspaceValue: *, workspaceFolderValue: *, defaultLanguageValue: *, globalLanguageValue: *, workspaceLanguageValue: *, workspaceFolderLanguageValue: *, languageIds: (undefined|!Array<string>)})} */
        const inspectVal = config.inspect(this.configKey);
        return !(inspectVal?.globalValue === undefined && inspectVal?.workspaceValue === undefined);
    }
    /**
     * Gets the ConfigurationTarget to update by inspecting the
     * values of the setting in various levels (global, workspace and
     * workspace folder).
     * @public
     * @return {!tsickle_vscode_1.ConfigurationTarget}
     */
    getOverriddenConfigurationTarget() {
        /** @type {!tsickle_vscode_1.WorkspaceConfiguration} */
        const config = this.code.workspace.getConfiguration();
        /** @type {(undefined|{key: string, defaultValue: *, globalValue: *, workspaceValue: *, workspaceFolderValue: *, defaultLanguageValue: *, globalLanguageValue: *, workspaceLanguageValue: *, workspaceFolderLanguageValue: *, languageIds: (undefined|!Array<string>)})} */
        const inspectionResult = config.inspect(this.configKey);
        if (inspectionResult?.workspaceFolderValue !== undefined) {
            return this.code.ConfigurationTarget.WorkspaceFolder;
        }
        if (inspectionResult?.workspaceValue !== undefined) {
            return this.code.ConfigurationTarget.Workspace;
        }
        return this.code.ConfigurationTarget.Global;
    }
    /**
     * @public
     * @return {!tsickle_vscode_1.Event<!tsickle_vscode_1.ConfigurationChangeEvent>}
     */
    get onDidChangeConfiguration() {
        if (!this.changedEmitter) {
            /** @type {!tsickle_vscode_1.EventEmitter<!tsickle_vscode_1.ConfigurationChangeEvent>} */
            const emitter = (this.changedEmitter = new this.code.EventEmitter());
            this.code.workspace.onDidChangeConfiguration((/**
             * @param {!tsickle_vscode_1.ConfigurationChangeEvent} e
             * @return {void}
             */
            (e) => {
                if (e.affectsConfiguration(this.configKey)) {
                    emitter.fire(e);
                }
            }));
        }
        return this.changedEmitter.event;
    }
    /**
     * Migrates all configs in a given configuration section from one name to another
     * @public
     * @param {string} oldPrefix
     * @param {string} newPrefix
     * @return {!Promise<void>}
     */
    async migrateConfig(oldPrefix, newPrefix) {
        /** @type {!tsickle_vscode_1.WorkspaceConfiguration} */
        const config = this.code.workspace.getConfiguration();
        /** @type {(undefined|{key: string, defaultValue: *, globalValue: *, workspaceValue: *, workspaceFolderValue: *, defaultLanguageValue: *, globalLanguageValue: *, workspaceLanguageValue: *, workspaceFolderLanguageValue: *, languageIds: (undefined|!Array<string>)})} */
        const section = config.inspect(this.configKey);
        if (section) {
            await this.migrateSettingsInConfigTarget(config, section, oldPrefix, newPrefix, this.code.ConfigurationTarget.Global);
            await this.migrateSettingsInConfigTarget(config, section, oldPrefix, newPrefix, this.code.ConfigurationTarget.Workspace);
            await this.migrateSettingsInConfigTarget(config, section, oldPrefix, newPrefix, this.code.ConfigurationTarget.WorkspaceFolder);
        }
    }
    /**
     * Keeps this configuration value to the specified configuration value.
     *
     * @public
     * @param {!ConfigHelper} syncTo The value to sync this configuration value to.
     * @return {!Promise<!tsickle_vscode_1.Disposable>}
     */
    async synchronize(syncTo) {
        await this.copyValue(syncTo);
        return this.onDidChangeConfiguration((/**
         * @return {void}
         */
        () => {
            this.copyValue(syncTo).catch((/**
             * @param {?} e
             * @return {void}
             */
            e => (0, logging_1.error)(`Failed to sync value ${this.configKey} to ${syncTo.configKey}: ${e}`)));
        }));
    }
    /**
     * Copies the current value of this configuration setting to the specified
     * configuration setting.
     *
     * @private
     * @param {!ConfigHelper} copyTo The value to set with this configuration value.
     * @return {!Promise<void>}
     */
    async copyValue(copyTo) {
        /** @type {(undefined|T)} */
        const val = this.getConfig();
        if (val !== undefined) {
            await copyTo.setConfig(val);
        }
        else if (copyTo.hasConfig()) {
            await copyTo.removeConfig();
        }
    }
    /**
     * Recursively migrates all settings in a given section containing one substring to a new setting containing a different substring within a given vscode.ConfigurationTarget.
     *
     * **Note that the new setting must be present in `package.json` prior to migration**
     *
     * @private
     * @param {!tsickle_vscode_1.WorkspaceConfiguration} config The VSCode WorkspaceConfiguration
     * @param {!tsickle_types_2.VsCodeConfigObject} section The section of the configuration to update. Can be a single setting or multiple settings.
     * @param {string} substringToReplace The substring in the setting to replace. This can be used to migrate full sections of settings by passing in a section name. By passing in the full setting name, the one setting will be replaced.
     * @param {string} newSubstring The new substring to be inserted in (or to replace) the setting.
     * @param {!tsickle_vscode_1.ConfigurationTarget} target The vscode.ConfigurationTarget that this migration should be run on
     * @return {!Promise<void>} Promise<void>
     */
    async migrateSettingsInConfigTarget(config, section, substringToReplace, newSubstring, target) {
        /** @type {string} */
        const targetValue = this.getConfigAttributeFromScope(target);
        /** @type {*} */
        const sectionValue = section[targetValue];
        if (sectionValue === undefined) {
            // There are no settings defined for this configuration in the given target
            return;
        }
        if (typeof sectionValue === 'boolean' || typeof sectionValue === 'string' || typeof sectionValue === 'number') {
            // This is a single setting
            try {
                await config.update(section.key.replace(substringToReplace, newSubstring), config.get(section.key, undefined), target);
                await config.update(section.key, undefined, target);
            }
            catch {
                (0, logging_1.error)(`The setting ${section.key} could not be migrated.`);
            }
        }
        else {
            // This is a collection of settings
            /** @type {!Array<{key: string, defaultValue: *, globalValue: *, workspaceValue: *, workspaceFolderValue: *, defaultLanguageValue: *, globalLanguageValue: *, workspaceLanguageValue: *, workspaceFolderLanguageValue: *, languageIds: (undefined|!Array<string>)}>} */
            const embeddedKeys = Object.keys((/** @type {!Object<string,*>} */ (sectionValue))).map((/**
             * @param {string} embeddedSetting
             * @return {{key: string, defaultValue: *, globalValue: *, workspaceValue: *, workspaceFolderValue: *, defaultLanguageValue: *, globalLanguageValue: *, workspaceLanguageValue: *, workspaceFolderLanguageValue: *, languageIds: (undefined|!Array<string>)}}
             */
            embeddedSetting => (/** @type {{key: string, defaultValue: *, globalValue: *, workspaceValue: *, workspaceFolderValue: *, defaultLanguageValue: *, globalLanguageValue: *, workspaceLanguageValue: *, workspaceFolderLanguageValue: *, languageIds: (undefined|!Array<string>)}} */ (config.inspect([section.key, embeddedSetting].join('.'))))));
            for (const embeddedKey of embeddedKeys) {
                await this.migrateSettingsInConfigTarget(config, embeddedKey, substringToReplace, newSubstring, target);
            }
        }
    }
    /**
     * Maps a vscode.ConfigurationTarget value to its corresponding
     * attribute within a VSCode configuration object
     * @private
     * @param {!tsickle_vscode_1.ConfigurationTarget} scope
     * @return {string}
     */
    getConfigAttributeFromScope(scope) {
        switch (scope) {
            case this.code.ConfigurationTarget.Workspace: {
                return 'workspaceValue';
            }
            case this.code.ConfigurationTarget.WorkspaceFolder: {
                return 'workspaceFolderValue';
            }
            default: {
                return 'globalValue';
            }
        }
    }
}
exports.ConfigHelper = ConfigHelper;
/* istanbul ignore if */
if (false) {
    /**
     * @type {(undefined|!tsickle_vscode_1.EventEmitter<!tsickle_vscode_1.ConfigurationChangeEvent>)}
     * @private
     */
    ConfigHelper.prototype.changedEmitter;
    /**
     * @const {string}
     * @public
     */
    ConfigHelper.prototype.configKey;
    /**
     * @const {?}
     * @public
     */
    ConfigHelper.prototype.code;
}
