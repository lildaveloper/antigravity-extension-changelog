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
 * Generated from: third_party/cloudcode/vscode/common/packages/metrics/metadata/metrics_meta.ts
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
goog.module('google3.third_party.cloudcode.vscode.common.packages.metrics.metadata.metrics_meta');
var module = module || { id: 'third_party/cloudcode/vscode/common/packages/metrics/metadata/metrics_meta.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_error_types_1 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.metrics.error_types");
const tsickle_constants_2 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.metrics.constants");
const tsickle_extract_error_3 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.metrics.extract_error");
const tsickle_logger_4 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.logging.logger");
const constants_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.metrics.constants');
const extract_error_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.metrics.extract_error');
const logger_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.logging.logger');
/**
 * MetricsMeta encapsulates the passing of metrics data and the ability to
 * correlate nested actions with metrics.
 */
class MetricsMeta {
    /**
     * Initializes a new instance of the MetricsMeta class.
     *
     * @public
     * @param {string} stack The stack for the metrics calls, allows the data to be
     * correlated through nested calls.
     * @param {(undefined|!Iterable<!Array<?>, ?, ?>)=} elements Optional starting elements for the metrics meta
     */
    constructor(stack, elements) {
        this.metadata = new Map(elements);
        this.eventData = new Map();
        this.processingDetailsMetadata = new Map();
        this.set(constants_1.CommonMetadataKey.STACK, stack);
    }
    /**
     * Appends a recognized metadata key and value to the MetricMeta
     *
     * If an unrecognized key is passed in, the metadata is instead appended with
     * `"unrecognized_metadata": "true"`.
     * @public
     * @template THIS
     * @this {THIS}
     * @param {(!tsickle_constants_2.AntigravityMetadataKey|!tsickle_constants_2.DataCloudMetadataKey|!tsickle_constants_2.LookerVSCodeMetadataKey|!tsickle_constants_2.ApigeeMetadataKey|!tsickle_constants_2.ApiMetadataKey|!tsickle_constants_2.AuthMetadataKey|!tsickle_constants_2.CloudRunMetadataKey|!tsickle_constants_2.CommonMetadataKey|!tsickle_constants_2.CrashFeedbackMetadataKey|!tsickle_constants_2.ComputeMetadataKey|!tsickle_constants_2.CustomSlashCommandMetadataKey|!tsickle_constants_2.DeploymentManagerMetadataKey|!tsickle_constants_2.DuetMetadataKey|!tsickle_constants_2.DuetMetadataV2Key|!tsickle_constants_2.ErrorStackMetadataKey|!tsickle_constants_2.ExperimentMetadataKey|!tsickle_constants_2.FunctionsMetadataKey|!tsickle_constants_2.HatsFeedbackMetadataKey|!tsickle_constants_2.KubernetesMetadataKey|!tsickle_constants_2.LogsViewerMetadataKey|!tsickle_constants_2.ManagedDependenciesMetadataKey|!tsickle_constants_2.MinikubeMetadataKey|!tsickle_constants_2.ProjectManagerMetadataKey|!tsickle_constants_2.SecretMetadataKey|!tsickle_constants_2.SkaffoldMetadataKey|!tsickle_constants_2.TreeExplorerMetadataKey|!tsickle_constants_2.UpdateManagerMetadataKey|!tsickle_constants_2.UpgradeMetadataKey|!tsickle_constants_2.CampaignNotificationMetadataKey|!tsickle_constants_2.ExclusionFilesMetadataKey|!tsickle_constants_2.InlineDiffSettingMetadataKey|!tsickle_constants_2.WebviewMetadataKey|!tsickle_constants_2.OnboardingMetadataKey|!tsickle_constants_2.StructuredCodeEditsMetadataKey|!tsickle_constants_2.ContextSourceMetadataKey)} key
     * @param {string} value
     * @return {THIS}
     */
    set(key, value) {
        if (constants_1.ALL_METADATA_KEYS.has(key)) {
            (/** @type {!MetricsMeta} */ (this)).metadata.set(key, value);
        }
        else {
            (0, logger_1.error)('Metadata not appended as it was not recognized.');
            (/** @type {!MetricsMeta} */ (this)).metadata.set(constants_1.CommonMetadataKey.UNRECOGNIZED_METADATA, 'true');
        }
        return (/** @type {!MetricsMeta} */ (this));
    }
    /**
     * @public
     * @param {(!tsickle_constants_2.AntigravityMetadataKey|!tsickle_constants_2.DataCloudMetadataKey|!tsickle_constants_2.LookerVSCodeMetadataKey|!tsickle_constants_2.ApigeeMetadataKey|!tsickle_constants_2.ApiMetadataKey|!tsickle_constants_2.AuthMetadataKey|!tsickle_constants_2.CloudRunMetadataKey|!tsickle_constants_2.CommonMetadataKey|!tsickle_constants_2.CrashFeedbackMetadataKey|!tsickle_constants_2.ComputeMetadataKey|!tsickle_constants_2.CustomSlashCommandMetadataKey|!tsickle_constants_2.DeploymentManagerMetadataKey|!tsickle_constants_2.DuetMetadataKey|!tsickle_constants_2.DuetMetadataV2Key|!tsickle_constants_2.ErrorStackMetadataKey|!tsickle_constants_2.ExperimentMetadataKey|!tsickle_constants_2.FunctionsMetadataKey|!tsickle_constants_2.HatsFeedbackMetadataKey|!tsickle_constants_2.KubernetesMetadataKey|!tsickle_constants_2.LogsViewerMetadataKey|!tsickle_constants_2.ManagedDependenciesMetadataKey|!tsickle_constants_2.MinikubeMetadataKey|!tsickle_constants_2.ProjectManagerMetadataKey|!tsickle_constants_2.SecretMetadataKey|!tsickle_constants_2.SkaffoldMetadataKey|!tsickle_constants_2.TreeExplorerMetadataKey|!tsickle_constants_2.UpdateManagerMetadataKey|!tsickle_constants_2.UpgradeMetadataKey|!tsickle_constants_2.CampaignNotificationMetadataKey|!tsickle_constants_2.ExclusionFilesMetadataKey|!tsickle_constants_2.InlineDiffSettingMetadataKey|!tsickle_constants_2.WebviewMetadataKey|!tsickle_constants_2.OnboardingMetadataKey|!tsickle_constants_2.StructuredCodeEditsMetadataKey|!tsickle_constants_2.ContextSourceMetadataKey)} key
     * @return {(undefined|string)}
     */
    get(key) {
        return this.metadata.get(key);
    }
    /**
     * @public
     * @param {(!tsickle_constants_2.AntigravityMetadataKey|!tsickle_constants_2.DataCloudMetadataKey|!tsickle_constants_2.LookerVSCodeMetadataKey|!tsickle_constants_2.ApigeeMetadataKey|!tsickle_constants_2.ApiMetadataKey|!tsickle_constants_2.AuthMetadataKey|!tsickle_constants_2.CloudRunMetadataKey|!tsickle_constants_2.CommonMetadataKey|!tsickle_constants_2.CrashFeedbackMetadataKey|!tsickle_constants_2.ComputeMetadataKey|!tsickle_constants_2.CustomSlashCommandMetadataKey|!tsickle_constants_2.DeploymentManagerMetadataKey|!tsickle_constants_2.DuetMetadataKey|!tsickle_constants_2.DuetMetadataV2Key|!tsickle_constants_2.ErrorStackMetadataKey|!tsickle_constants_2.ExperimentMetadataKey|!tsickle_constants_2.FunctionsMetadataKey|!tsickle_constants_2.HatsFeedbackMetadataKey|!tsickle_constants_2.KubernetesMetadataKey|!tsickle_constants_2.LogsViewerMetadataKey|!tsickle_constants_2.ManagedDependenciesMetadataKey|!tsickle_constants_2.MinikubeMetadataKey|!tsickle_constants_2.ProjectManagerMetadataKey|!tsickle_constants_2.SecretMetadataKey|!tsickle_constants_2.SkaffoldMetadataKey|!tsickle_constants_2.TreeExplorerMetadataKey|!tsickle_constants_2.UpdateManagerMetadataKey|!tsickle_constants_2.UpgradeMetadataKey|!tsickle_constants_2.CampaignNotificationMetadataKey|!tsickle_constants_2.ExclusionFilesMetadataKey|!tsickle_constants_2.InlineDiffSettingMetadataKey|!tsickle_constants_2.WebviewMetadataKey|!tsickle_constants_2.OnboardingMetadataKey|!tsickle_constants_2.StructuredCodeEditsMetadataKey|!tsickle_constants_2.ContextSourceMetadataKey)} key
     * @return {boolean}
     */
    has(key) {
        return this.metadata.has(key);
    }
    /**
     * setEventData sets a top level event field with the specified telemetry value
     * @public
     * @template THIS
     * @this {THIS}
     * @param {string} key
     * @param {string} value
     * @return {THIS}
     */
    setEventData(key, value) {
        (/** @type {!MetricsMeta} */ (this)).eventData.set(key, value);
        return (/** @type {!MetricsMeta} */ (this));
    }
    /**
     *  getEventData gets the top level event field and returns the associated telemetry value or undefined if the value does not exist
     * @public
     * @param {string} key
     * @return {(undefined|string)}
     */
    getEventData(key) {
        if (this.eventData.has(key)) {
            return this.eventData.get(key);
        }
        return undefined;
    }
    /**
     * hasEventData determines if the defined event field name exists in the metadata and returns true if it is defined, false otherwise.
     * @public
     * @param {string} key
     * @return {boolean}
     */
    hasEventData(key) {
        return this.eventData.has(key);
    }
    /**
     * event carries the top level event data fields and values
     * @public
     * @return {!Map<string, string>}
     */
    get event() {
        return this.eventData;
    }
    /**
     * entries returns the metadata entries as a map
     * @public
     * @return {!Map<(!tsickle_constants_2.AntigravityMetadataKey|!tsickle_constants_2.DataCloudMetadataKey|!tsickle_constants_2.LookerVSCodeMetadataKey|!tsickle_constants_2.ApigeeMetadataKey|!tsickle_constants_2.ApiMetadataKey|!tsickle_constants_2.AuthMetadataKey|!tsickle_constants_2.CloudRunMetadataKey|!tsickle_constants_2.CommonMetadataKey|!tsickle_constants_2.CrashFeedbackMetadataKey|!tsickle_constants_2.ComputeMetadataKey|!tsickle_constants_2.CustomSlashCommandMetadataKey|!tsickle_constants_2.DeploymentManagerMetadataKey|!tsickle_constants_2.DuetMetadataKey|!tsickle_constants_2.DuetMetadataV2Key|!tsickle_constants_2.ErrorStackMetadataKey|!tsickle_constants_2.ExperimentMetadataKey|!tsickle_constants_2.FunctionsMetadataKey|!tsickle_constants_2.HatsFeedbackMetadataKey|!tsickle_constants_2.KubernetesMetadataKey|!tsickle_constants_2.LogsViewerMetadataKey|!tsickle_constants_2.ManagedDependenciesMetadataKey|!tsickle_constants_2.MinikubeMetadataKey|!tsickle_constants_2.ProjectManagerMetadataKey|!tsickle_constants_2.SecretMetadataKey|!tsickle_constants_2.SkaffoldMetadataKey|!tsickle_constants_2.TreeExplorerMetadataKey|!tsickle_constants_2.UpdateManagerMetadataKey|!tsickle_constants_2.UpgradeMetadataKey|!tsickle_constants_2.CampaignNotificationMetadataKey|!tsickle_constants_2.ExclusionFilesMetadataKey|!tsickle_constants_2.InlineDiffSettingMetadataKey|!tsickle_constants_2.WebviewMetadataKey|!tsickle_constants_2.OnboardingMetadataKey|!tsickle_constants_2.StructuredCodeEditsMetadataKey|!tsickle_constants_2.ContextSourceMetadataKey), string>}
     */
    get entries() {
        return this.metadata;
    }
    /**
     * size returns the size of the contained metadata
     * @public
     * @return {number}
     */
    get size() {
        return this.metadata.size;
    }
    /**
     * source is the command source for the event, for example COMMAND_PALETTE
     * @public
     * @return {string}
     */
    get source() {
        return this.get(constants_1.CommonMetadataKey.SOURCE) || '';
    }
    /**
     * source is the command source for the event, for example COMMAND_PALETTE
     * @public
     * @param {string} s
     * @return {void}
     */
    set source(s) {
        this.set(constants_1.CommonMetadataKey.SOURCE, s);
    }
    /**
     * Maps to the failure reason on the meta object
     * @public
     * @return {(undefined|string)}
     */
    get failureReason() {
        return this.metadata.get(constants_1.CommonMetadataKey.FAILURE_REASON);
    }
    /**
     * Maps to the failure reason on the meta object
     * @public
     * @param {(undefined|string)} reason
     * @return {void}
     */
    set failureReason(reason) {
        if (reason !== undefined) {
            this.set(constants_1.CommonMetadataKey.FAILURE_REASON, reason);
        }
        else if (this.has(constants_1.CommonMetadataKey.FAILURE_REASON)) {
            this.metadata.delete(constants_1.CommonMetadataKey.FAILURE_REASON);
        }
    }
    /**
     * Retrieves the exit code from metrics meta data
     * @public
     * @return {(undefined|number)}
     */
    get exitCode() {
        /** @type {(undefined|string)} */
        const ret = this.metadata.get(constants_1.CommonMetadataKey.EXIT_CODE);
        if (ret === undefined || ret === constants_1.UNDEFINED_EXIT_CODE) {
            return undefined;
        }
        return Number.parseInt(ret, 10);
    }
    /**
     * Sets the exit code in metrics meta data.  Treats undefined with string to
     * differentiate no exit code set with catastrophic failure (no exit code present).
     * @public
     * @param {(undefined|number)} code
     * @return {void}
     */
    set exitCode(code) {
        if (code === undefined) {
            this.set(constants_1.CommonMetadataKey.EXIT_CODE, constants_1.UNDEFINED_EXIT_CODE);
        }
        else {
            this.set(constants_1.CommonMetadataKey.EXIT_CODE, code.toString());
        }
    }
    /**
     * Gets the duration of the metrics call in ms
     * @public
     * @return {(undefined|number)}
     */
    get duration() {
        /** @type {(undefined|string)} */
        const ret = this.metadata.get(constants_1.CommonMetadataKey.DURATION_MS);
        if (ret === undefined) {
            return undefined;
        }
        return Number.parseInt(ret, 10);
    }
    /**
     * Sets or clears the duration of the metrics call in ms.
     * @public
     * @param {(undefined|number)} durationMS
     * @return {void}
     */
    set duration(durationMS) {
        if (durationMS === undefined) {
            this.metadata.delete(constants_1.CommonMetadataKey.DURATION_MS);
        }
        else {
            this.set(constants_1.CommonMetadataKey.DURATION_MS, durationMS.toString());
        }
    }
    /**
     * Gets error report based on failure reason and stack
     * @public
     * @return {(undefined|!tsickle_error_types_1.ErrorReport)}
     */
    get errorReport() {
        /** @type {string} */
        const failureReason = this.metadata.get(constants_1.CommonMetadataKey.FAILURE_REASON) || '';
        /** @type {string} */
        const stack = this.metadata.get(constants_1.CommonMetadataKey.STACK) || '';
        if (!(failureReason || stack)) {
            return;
        }
        return { stack, failureReason };
    }
    /**
     * Sets failure reason and updates stack based on error report
     * @public
     * @param {(undefined|!tsickle_error_types_1.ErrorReport)} errorReport
     * @return {void}
     */
    set errorReport(errorReport) {
        if (!errorReport) {
            return;
        }
        this.set(constants_1.CommonMetadataKey.FAILURE_REASON, errorReport.failureReason);
        /** @type {(undefined|string)} */
        const callerStack = this.get(constants_1.CommonMetadataKey.STACK);
        this.set(constants_1.CommonMetadataKey.STACK, `${callerStack}/${errorReport.stack}`);
    }
    /**
     * Retrieves common error details from metrics meta data
     * @public
     * @return {(undefined|string)}
     */
    get commonErrorDetails() {
        return this.get(constants_1.CommonMetadataKey.ERROR_CODE);
    }
    /**
     * Extracts and sets common error details in metrics meta data
     * @public
     * @param {*} e
     * @return {void}
     */
    set commonErrorDetails(e) {
        this.set(constants_1.CommonMetadataKey.ERROR_CODE, (0, extract_error_1.extractError)((/** @type {(!Error|!tsickle_error_types_1.NodeJsSystemError|!tsickle_error_types_1.ReasonedError|!tsickle_error_types_1.UnsupportedOsError)} */ (e))));
    }
    /**
     * @public
     * @template THIS
     * @this {THIS}
     * @param {string} key
     * @param {string} value
     * @return {THIS}
     */
    setProcessingDetailsMetadata(key, value) {
        (/** @type {!MetricsMeta} */ (this)).processingDetailsMetadata.set(key, value);
        return (/** @type {!MetricsMeta} */ (this));
    }
    /**
     * @public
     * @param {string} key
     * @return {(undefined|string)}
     */
    getProcessingDetailsMetadata(key) {
        if (this.processingDetailsMetadata.has(key)) {
            return this.processingDetailsMetadata.get(key);
        }
        return undefined;
    }
    /**
     * @public
     * @param {string} key
     * @return {boolean}
     */
    hasProcessingDetailsMetadata(key) {
        return this.processingDetailsMetadata.has(key);
    }
    /**
     * @public
     * @return {!Map<string, string>}
     */
    get processingDetails() {
        return this.processingDetailsMetadata;
    }
}
exports.MetricsMeta = MetricsMeta;
/* istanbul ignore if */
if (false) {
    /**
     * @const {!Map<(!tsickle_constants_2.AntigravityMetadataKey|!tsickle_constants_2.DataCloudMetadataKey|!tsickle_constants_2.LookerVSCodeMetadataKey|!tsickle_constants_2.ApigeeMetadataKey|!tsickle_constants_2.ApiMetadataKey|!tsickle_constants_2.AuthMetadataKey|!tsickle_constants_2.CloudRunMetadataKey|!tsickle_constants_2.CommonMetadataKey|!tsickle_constants_2.CrashFeedbackMetadataKey|!tsickle_constants_2.ComputeMetadataKey|!tsickle_constants_2.CustomSlashCommandMetadataKey|!tsickle_constants_2.DeploymentManagerMetadataKey|!tsickle_constants_2.DuetMetadataKey|!tsickle_constants_2.DuetMetadataV2Key|!tsickle_constants_2.ErrorStackMetadataKey|!tsickle_constants_2.ExperimentMetadataKey|!tsickle_constants_2.FunctionsMetadataKey|!tsickle_constants_2.HatsFeedbackMetadataKey|!tsickle_constants_2.KubernetesMetadataKey|!tsickle_constants_2.LogsViewerMetadataKey|!tsickle_constants_2.ManagedDependenciesMetadataKey|!tsickle_constants_2.MinikubeMetadataKey|!tsickle_constants_2.ProjectManagerMetadataKey|!tsickle_constants_2.SecretMetadataKey|!tsickle_constants_2.SkaffoldMetadataKey|!tsickle_constants_2.TreeExplorerMetadataKey|!tsickle_constants_2.UpdateManagerMetadataKey|!tsickle_constants_2.UpgradeMetadataKey|!tsickle_constants_2.CampaignNotificationMetadataKey|!tsickle_constants_2.ExclusionFilesMetadataKey|!tsickle_constants_2.InlineDiffSettingMetadataKey|!tsickle_constants_2.WebviewMetadataKey|!tsickle_constants_2.OnboardingMetadataKey|!tsickle_constants_2.StructuredCodeEditsMetadataKey|!tsickle_constants_2.ContextSourceMetadataKey), string>}
     * @private
     */
    MetricsMeta.prototype.metadata;
    /**
     * @const {!Map<string, string>}
     * @private
     */
    MetricsMeta.prototype.eventData;
    /**
     * @const {!Map<string, string>}
     * @private
     */
    MetricsMeta.prototype.processingDetailsMetadata;
}
