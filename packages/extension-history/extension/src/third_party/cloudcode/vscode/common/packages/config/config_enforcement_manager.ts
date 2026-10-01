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
 * Generated from: third_party/cloudcode/vscode/common/packages/config/config_enforcement_manager.ts
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
goog.module('google3.third_party.cloudcode.vscode.common.packages.config.config_enforcement_manager');
var module = module || { id: 'third_party/cloudcode/vscode/common/packages/config/config_enforcement_manager.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_vscode_1 = goog.requireType("vscode");
const tsickle_constants_2 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.experimentation.constants");
const tsickle_types_3 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.experimentation.types");
const tsickle_logger_4 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.logging.logger");
const tsickle_config_helper_5 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.config.config_helper");
const constants_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.experimentation.constants');
const logger_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.logging.logger');
const config_helper_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.config.config_helper');
/**
 * Represents enforceable configuration.
 * @record
 * @template T
 */
function EnforceableConfig() { }
exports.EnforceableConfig = EnforceableConfig;
/* istanbul ignore if */
if (false) {
    /**
     * @type {string}
     * @public
     */
    EnforceableConfig.prototype.name;
    /**
     * @type {function((undefined|!tsickle_types_3.ExperimentationServiceInterface)): boolean}
     * @public
     */
    EnforceableConfig.prototype.enforcementPolicy;
    /**
     * @type {T}
     * @public
     */
    EnforceableConfig.prototype.enforcedValue;
    /**
     * @type {(undefined|string)}
     * @public
     */
    EnforceableConfig.prototype.userMessage;
    /**
     * @type {(undefined|boolean)}
     * @public
     */
    EnforceableConfig.prototype.userMessageInModal;
}
/**
 * ConfigEnforcementManager enforces the extension workspace configuration values
 */
class ConfigEnforcementManager {
    /**
     * @public
     * @return {(undefined|!tsickle_types_3.ExperimentationServiceInterface)}
     */
    get experimentationService() {
        return this.experimentationServiceInternal;
    }
    /**
     * @public
     * @param {(undefined|!tsickle_types_3.ExperimentationServiceInterface)} experimentationService
     * @return {void}
     */
    set experimentationService(experimentationService) {
        this.experimentationServiceInternal = experimentationService;
        // Start watching the experiment changes
        if (experimentationService && !this.watchingExperiments) {
            this.watchingExperiments = true;
            this.watchForExperimentChanges();
            this.enforceConfigValues().catch(logger_1.error);
        }
    }
    /**
     * @public
     * @param {?} code
     */
    constructor(code) {
        this.code = code;
        /**
         * Enforced configurations Map
         */
        this.enforcedConfigs = new Map();
        /**
         * Indicates if the experiment watcher already enabled, not to add multiple listeners.
         */
        this.watchingExperiments = false;
        this.watchForConfigurationChanges();
        this.enforceConfigValues().catch(logger_1.error);
    }
    /**
     * Add configuration to have an enforced value
     * @public
     * @param {!EnforceableConfig<*>} config - Configuration to be forced
     * @return {void}
     */
    enforce(config) {
        this.enforcedConfigs.set(config.name, config);
    }
    /**
     * Removes the configuration enforcement, so it will be freely editable by the user.
     * @public
     * @param {!EnforceableConfig<*>} config - Configuration to be unforced
     * @return {void}
     */
    unforce(config) {
        this.enforcedConfigs.delete(config.name);
    }
    /**
     * Iterates through the enforced configs Map to check and set the forced values.
     * @private
     * @param {boolean=} userInteracted - Represents if the value enforcement is triggered by a user action. Used in unit testing only.
     * @return {!Promise<void>}
     */
    async enforceConfigValues(userInteracted = false) {
        for (const config of this.enforcedConfigs.values()) {
            await this.enforceConfigValue(config, userInteracted);
        }
    }
    /**
     * Enforces configuration value with a message in a modal or notification
     * @private
     * @param {!EnforceableConfig<*>} config - EnforceableConfig to be forced
     * @param {boolean=} userInteracted - Represents if the value enforcement is triggered by a user action
     * @return {!Promise<void>}
     */
    async enforceConfigValue(config, userInteracted = false) {
        try {
            /** @type {!tsickle_config_helper_5.ConfigHelper<*>} */
            const configToEnforce = new config_helper_1.ConfigHelper(config.name, this.code);
            /** @type {*} */
            const currentValue = configToEnforce.getConfig();
            if (config.enforcementPolicy(this.experimentationService) && currentValue !== config.enforcedValue) {
                // Without a specified configurationTarget, the ConfigHelper will resolve the
                // configuration target, respecting user overrides.
                await configToEnforce.setConfig(config.enforcedValue);
                await this.showUserMessage(config, userInteracted);
            }
        }
        catch (err) {
            (0, logger_1.error)(`Unable to set the configuration '${config.name}' value`, err);
        }
    }
    /**
     * Watches for workspace configuration changes
     * @private
     * @return {void}
     */
    watchForConfigurationChanges() {
        this.code.workspace.onDidChangeConfiguration((/**
         * @param {!tsickle_vscode_1.ConfigurationChangeEvent} event
         * @return {!Promise<void>}
         */
        async (event) => {
            for (const config of this.enforcedConfigs.values()) {
                if (this.isConfigAffected(event, config.name)) {
                    await this.enforceConfigValue(config, true);
                }
            }
        }));
    }
    /**
     * Watches for experiments values changes
     * @private
     * @return {void}
     */
    watchForExperimentChanges() {
        this.experimentationService?.events.on(constants_1.ExperimentEvent.Update, (/**
         * @return {!Promise<void>}
         */
        async () => {
            await this.enforceConfigValues();
        }));
    }
    /**
     * Checks if workspace configuration was modified on ConfigurationChangeEvent
     * @private
     * @param {!tsickle_vscode_1.ConfigurationChangeEvent} event - emitted ConfigurationChangeEvent
     * @param {string} configName - Name of configuration to be checked for modification
     * @return {boolean} True if the configuration was affected, otherwise False
     */
    isConfigAffected(event, configName) {
        return event.affectsConfiguration(configName);
    }
    /**
     * Shows a simple or modal notification about configuration being enforced.
     * @private
     * @param {!EnforceableConfig<*>} config - EnforceableConfig to be forced
     * @param {boolean} userInteracted - Represents if the value enforcement is triggered by a user action
     * @return {!Promise<void>}
     */
    async showUserMessage(config, userInteracted) {
        if (config.userMessage) {
            void this.code.window.showWarningMessage(config.userMessage, {
                modal: userInteracted && config.userMessageInModal,
            });
        }
    }
}
exports.ConfigEnforcementManager = ConfigEnforcementManager;
/* istanbul ignore if */
if (false) {
    /**
     * Enforced configurations Map
     * @type {!Map<string, !EnforceableConfig<*>>}
     * @private
     */
    ConfigEnforcementManager.prototype.enforcedConfigs;
    /**
     * Indicates if the experiment watcher already enabled, not to add multiple listeners.
     * @type {boolean}
     * @private
     */
    ConfigEnforcementManager.prototype.watchingExperiments;
    /**
     * ExperimentService rely on user auth, initialize this after.
     * @type {(undefined|!tsickle_types_3.ExperimentationServiceInterface)}
     * @private
     */
    ConfigEnforcementManager.prototype.experimentationServiceInternal;
    /**
     * @const {?}
     * @private
     */
    ConfigEnforcementManager.prototype.code;
}
