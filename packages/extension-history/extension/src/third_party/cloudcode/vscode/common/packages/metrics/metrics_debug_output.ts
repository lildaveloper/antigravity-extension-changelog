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
 * Generated from: third_party/cloudcode/vscode/common/packages/metrics/metrics_debug_output.ts
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
goog.module('google3.third_party.cloudcode.vscode.common.packages.metrics.metrics_debug_output');
var module = module || { id: 'third_party/cloudcode/vscode/common/packages/metrics/metrics_debug_output.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_vscode_1 = goog.requireType("vscode");
const tsickle_constants_2 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.metrics.constants");
const tsickle_config_helper_3 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.config.config_helper");
const tsickle_util_4 = goog.requireType("google3.third_party.javascript.typings.node.node.util");
const tsickle_extensionUtil_5 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.utils.extensionUtil");
const tsickle_logging_6 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.logging.index");
const vscode = goog.require('vscode');
const constants_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.metrics.constants');
const config_helper_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.config.config_helper');
const util_1 = goog.require('google3.third_party.javascript.typings.node.node.util');
const extensionUtil_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.utils.extensionUtil');
const logging_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.logging.index');
/**
 * @record
 */
function KeyValueMetadata() { }
/* istanbul ignore if */
if (false) {
    /**
     * @type {string}
     * @public
     */
    KeyValueMetadata.prototype.key;
    /**
     * @type {string}
     * @public
     */
    KeyValueMetadata.prototype.value;
}
/**
 * @record
 * tsickle: dropped extends: dropped extends of a type literal: Record<string, unknown>
 */
function EventInterface() { }
/* istanbul ignore if */
if (false) {
    /**
     * @type {string}
     * @public
     */
    EventInterface.prototype.event_name;
    /**
     * @type {!Array<!KeyValueMetadata>}
     * @public
     */
    EventInterface.prototype.event_metadata;
}
// Attributes to be displayed in the output channel for filtered metrics events.
/** @type {!Array<string>} */
const FILTER_KEYS = [
    'event_name',
    'partial_accepted_characters',
    'completion_mode',
    'completion_method',
    'from_cache',
    'completion_index',
    'ide_session_index',
    'response_size',
    'typeover',
    'old_suffix_length',
    'new_suffix_length',
    'trace_id',
    'language',
    'detected_intent',
    'result_count',
    'failure_reason',
    'response_size',
    'partial_accepted_characters',
    'fully_matches',
    'client_email',
    'project_id',
    'response_received_index',
    'last_edit',
];
/**
 * This class provides a way to filter and display
 * specific metrics events in a dedicated output channel.
 * @extends {tsickle_vscode_1.Disposable}
 */
class MetricsDebugOutput {
    /**
     * Creates an instance of the MetricsDebugOutput class
     * and watches for configuration changes.
     * @public
     * @param {?} code instance of the host IDE
     * @param {!tsickle_vscode_1.ExtensionContext} extensionContext
     */
    constructor(code, extensionContext) {
        this.code = code;
        this.extensionContext = extensionContext;
        this.configPrefix = (0, extensionUtil_1.getExtensionName)(extensionContext);
        this.debugTelemetryEventsConfig = new config_helper_1.ConfigHelper(`${this.configPrefix}.debug.telemetry`, this.code);
        this.debugTelemetryFilterConfig = new config_helper_1.ConfigHelper(`${this.configPrefix}.debug.telemetryFilter`, this.code);
        this.debugTelemetryOutputConfig = new config_helper_1.ConfigHelper(`${this.configPrefix}.debug.telemetryOutput`, this.code);
        this.loadConfig();
        this.disposables = [
            this.debugTelemetryEventsConfig.onDidChangeConfiguration((/**
             * @return {void}
             */
            () => this.loadConfig())),
            this.debugTelemetryFilterConfig.onDidChangeConfiguration((/**
             * @return {void}
             */
            () => this.loadConfig())),
            this.debugTelemetryOutputConfig.onDidChangeConfiguration((/**
             * @return {void}
             */
            () => this.loadConfig())),
        ];
    }
    // Loads the configured events from the workspace configuration.
    /**
     * @private
     * @return {void}
     */
    loadConfig() {
        if (this.debugTelemetryOutputConfig.getConfig() || this.isDevMode()) {
            if (!this.debugOutputChannel) {
                this.debugOutputChannel = (0, logging_1.createOutputChannel)(this.code, this.extensionContext, (0, util_1.format)(constants_1.FILTERED_METRICS_OUTPUT_WINDOW_FORMAT, this.extensionContext.extension.packageJSON.displayName), { log: true });
                this.debugOutputChannel.info(`Using the metrics debug window.  This is controlled by the following settings:
  '${this.configPrefix}.debug.telemetry': string[] - Events to show in the window defaults to *
  '${this.configPrefix}.debug.telemetryFilter': string[]  - Event data and metadata keys to log
  '${this.configPrefix}.debug.telemetryOutput': boolean  - Turns the window on/off.`);
            }
        }
        else {
            this.debugOutputChannel?.dispose();
            this.debugOutputChannel = undefined;
        }
    }
    /**
     * @private
     * @return {boolean}
     */
    isDevMode() {
        return this.extensionContext.extensionMode === vscode.ExtensionMode.Development;
    }
    // Disposes the class and cleans up resources.
    /**
     * @public
     * @return {void}
     */
    dispose() {
        this.debugOutputChannel?.dispose();
        this.disposables.forEach((/**
         * @param {!tsickle_vscode_1.Disposable} d
         * @return {?}
         */
        d => d.dispose()));
    }
    /**
     * Appends the specified output to the debug window
     * @public
     * @param {string} output The output to append
     * @return {void}
     */
    appendLine(output) {
        this.debugOutputChannel?.appendLine(output);
    }
    /**
     * This method parses the provided event string,
     * filters the metadata based on the configured events,
     * and displays the filtered information in the output channel.
     * @public
     * @param {string} eventString json event string
     * @return {void}
     */
    appendEventString(eventString) {
        if (!this.debugOutputChannel) {
            return;
        }
        /** @type {!EventInterface} */
        const jsonEvent = (/** @type {!EventInterface} */ (JSON.parse(eventString)));
        /** @type {!Array<?>} */
        const items = (/** @type {!Array<?>} */ (Object.values(jsonEvent['event_metadata'])));
        /** @type {!Array<{key: string, value: string}>} */
        const filteredItems = items.filter((/**
         * @param {{key: string, value: string}} i
         * @return {boolean}
         */
        i => FILTER_KEYS.includes(i.key)));
        /** @type {!Array<string>} */
        const events = this.debugTelemetryEvents || ['*'];
        /** @type {!Array<string>} */
        const filter = this.debugTelemetryFilter || FILTER_KEYS;
        if (events.includes('*') || events.includes(jsonEvent.event_name)) {
            filteredItems.sort();
            /** @type {!Array<string>} */
            const metadata = filteredItems.map((/**
             * @param {{key: string, value: string}} i
             * @return {string}
             */
            i => `${i.key}:"${i.value}"`));
            /** @type {string} */
            const eventData = Object.entries(jsonEvent)
                .filter((/**
             * @param {!Array<?>} i
             * @return {boolean}
             */
            i => filter.includes(i[0])))
                .map((/**
             * @param {!Array<?>} i
             * @return {string}
             */
            i => `${i[0]}:"${i[1]}"`))
                .sort()
                .join(', ');
            metadata.sort();
            if (metadata.length > 1) {
                this.debugOutputChannel.info(`[${jsonEvent.event_name}]: {${eventData} ${metadata}}`);
            }
        }
    }
}
exports.MetricsDebugOutput = MetricsDebugOutput;
/* istanbul ignore if */
if (false) {
    /**
     * @type {(undefined|!tsickle_vscode_1.LogOutputChannel)}
     * @private
     */
    MetricsDebugOutput.prototype.debugOutputChannel;
    /**
     * @type {(undefined|!Array<string>)}
     * @private
     */
    MetricsDebugOutput.prototype.debugTelemetryFilter;
    /**
     * @type {(undefined|!Array<string>)}
     * @private
     */
    MetricsDebugOutput.prototype.debugTelemetryEvents;
    /**
     * @type {!Array<!tsickle_vscode_1.Disposable>}
     * @private
     */
    MetricsDebugOutput.prototype.disposables;
    /**
     * @const {!tsickle_config_helper_3.ConfigHelper<!Array<string>>}
     * @private
     */
    MetricsDebugOutput.prototype.debugTelemetryEventsConfig;
    /**
     * @const {!tsickle_config_helper_3.ConfigHelper<!Array<string>>}
     * @private
     */
    MetricsDebugOutput.prototype.debugTelemetryFilterConfig;
    /**
     * @const {!tsickle_config_helper_3.ConfigHelper<boolean>}
     * @private
     */
    MetricsDebugOutput.prototype.debugTelemetryOutputConfig;
    /**
     * @const {string}
     * @private
     */
    MetricsDebugOutput.prototype.configPrefix;
    /**
     * @const {?}
     * @private
     */
    MetricsDebugOutput.prototype.code;
    /**
     * @const {!tsickle_vscode_1.ExtensionContext}
     * @private
     */
    MetricsDebugOutput.prototype.extensionContext;
}
