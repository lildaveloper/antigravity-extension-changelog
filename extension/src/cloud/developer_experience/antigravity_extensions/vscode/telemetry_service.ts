/**
 * @fileoverview added by tsickle
 * Generated from: cloud/developer_experience/antigravity_extensions/vscode/telemetry_service.ts
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
goog.module('google3.cloud.developer_experience.antigravity_extensions.vscode.telemetry_service');
var module = module || { id: 'cloud/developer_experience/antigravity_extensions/vscode/telemetry_service.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_vscode_1 = goog.requireType("vscode");
const tsickle_delegate_interfaces_2 = goog.requireType("google3.devtools.cider.extensions.jetski.delegate_interfaces");
const tsickle_config_enforcement_manager_3 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.config.config_enforcement_manager");
const tsickle_memento_key_provider_4 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.memento.memento_key_provider");
const tsickle_constants_5 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.metrics.constants");
const tsickle_metrics_meta_6 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.metrics.metadata.metrics_meta");
const tsickle_metrics_client_7 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.metrics.metrics_client");
const tsickle_metrics_proxy_8 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.metrics.metrics_proxy");
const tsickle_utils_9 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.metrics.utils");
const tsickle_telemetry_constants_10 = goog.requireType("google3.cloud.developer_experience.antigravity_extensions.vscode.telemetry_constants");
const vscode = goog.require('vscode'); // from //third_party/javascript/typings/vscode
const config_enforcement_manager_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.config.config_enforcement_manager');
const memento_key_provider_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.memento.memento_key_provider');
const constants_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.metrics.constants');
const metrics_meta_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.metrics.metadata.metrics_meta');
const metrics_client_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.metrics.metrics_client');
const metrics_proxy_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.metrics.metrics_proxy');
const utils_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.metrics.utils');
const telemetry_constants_1 = goog.require('google3.cloud.developer_experience.antigravity_extensions.vscode.telemetry_constants');
/**
 * Normalizes an event name to ensure it follows the standard Antigravity hierarchy.
 * @param {string} eventName
 * @return {string}
 */
function normalizeEventName(eventName) {
    if (eventName.startsWith('google.')) {
        return eventName;
    }
    if (eventName.startsWith('jetski_web.')) {
        return `${telemetry_constants_1.EXTENSION_PREFIX}.${eventName.replace('jetski_web.', 'web.')}`;
    }
    if (eventName.startsWith('antigravity.')) {
        return `${telemetry_constants_1.EXTENSION_PREFIX}.${eventName.replace('antigravity.', '')}`;
    }
    return `${telemetry_constants_1.EXTENSION_PREFIX}.${eventName}`;
}
exports.normalizeEventName = normalizeEventName;
/**
 * Sanitizes a string to remove potential PII such as file paths, quoted strings, and hashes.
 * @param {string} message
 * @return {string}
 */
function sanitizeString(message) {
    return (message
        .replace(/'[^']+'/g, "'<REDACTED>'") // Scrub single quoted strings
        .replace(/"[^"]+"/g, '"<REDACTED>"') // Scrub double quoted strings
        // Scrub file paths and names with various extensions, preserving the extension
        .replace(/(?:[\w/\\.:-]+[/\\])?[\w-]+\.((?:ts|js|json|md|py|go|html|css|txt|code-workspace|vsix|sock|log|out|sh|cfg|conf|yaml|yml))\b/gi, '<REDACTED>.$1')
        // Scrub git commit hashes (SHA-1)
        .replace(/\b[0-9a-f]{40}\b/gi, '<REDACTED_SHA>'));
}
exports.sanitizeString = sanitizeString;
/**
 * Antigravity telemetry service that delegates to Cloud Code's Metrics client.
 * @implements {tsickle_delegate_interfaces_2.Telemetry}
 */
class AntigravityTelemetryService {
    /**
     * @public
     * @param {(undefined|!tsickle_metrics_client_7.Metrics)} metrics
     */
    constructor(metrics) {
        this.metrics = metrics;
    }
    /**
     * @public
     * @param {string} eventName
     * @param {(undefined|?)=} data
     * @return {!Promise<void>}
     */
    async logEvent(eventName, data) {
        try {
            /** @type {string} */
            const normalizedName = normalizeEventName(eventName);
            /** @type {!tsickle_metrics_meta_6.MetricsMeta} */
            const meta = new metrics_meta_1.MetricsMeta(normalizedName);
            if (data) {
                for (const [key__tsickle_destructured_1, value__tsickle_destructured_2] of Object.entries(data)) {
                    const key = /** @type {string} */ (key__tsickle_destructured_1);
                    const value = /** @type {(undefined|string|number|boolean)} */ (value__tsickle_destructured_2);
                    if (value !== undefined && value !== null) {
                        /** @type {string} */
                        const stringVal = typeof value === 'string' ? sanitizeString(value) : String(value);
                        if (key === 'duration_ms' ||
                            key === 'durationMs' ||
                            key === 'duration') {
                            meta.set(constants_1.CommonMetadataKey.DURATION_MS, stringVal);
                        }
                        else {
                            meta.set((/** @type {(!tsickle_constants_5.AntigravityMetadataKey|!tsickle_constants_5.ApigeeMetadataKey|!tsickle_constants_5.ApiMetadataKey|!tsickle_constants_5.AuthMetadataKey|!tsickle_constants_5.CloudRunMetadataKey|!tsickle_constants_5.CommonMetadataKey|!tsickle_constants_5.ComputeMetadataKey|!tsickle_constants_5.ContextSourceMetadataKey|!tsickle_constants_5.CustomSlashCommandMetadataKey|!tsickle_constants_5.CrashFeedbackMetadataKey|!tsickle_constants_5.DataCloudMetadataKey|!tsickle_constants_5.DeploymentManagerMetadataKey|!tsickle_constants_5.DuetMetadataKey|!tsickle_constants_5.DuetMetadataV2Key|!tsickle_constants_5.ErrorStackMetadataKey|!tsickle_constants_5.ExperimentMetadataKey|!tsickle_constants_5.FunctionsMetadataKey|!tsickle_constants_5.HatsFeedbackMetadataKey|!tsickle_constants_5.KubernetesMetadataKey|!tsickle_constants_5.LogsViewerMetadataKey|!tsickle_constants_5.LookerVSCodeMetadataKey|!tsickle_constants_5.ManagedDependenciesMetadataKey|!tsickle_constants_5.MinikubeMetadataKey|!tsickle_constants_5.ProjectManagerMetadataKey|!tsickle_constants_5.SecretMetadataKey|!tsickle_constants_5.SkaffoldMetadataKey|!tsickle_constants_5.TreeExplorerMetadataKey|!tsickle_constants_5.UpdateManagerMetadataKey|!tsickle_constants_5.UpgradeMetadataKey|!tsickle_constants_5.WebviewMetadataKey|!tsickle_constants_5.OnboardingMetadataKey|!tsickle_constants_5.StructuredCodeEditsMetadataKey|!tsickle_constants_5.ExclusionFilesMetadataKey|!tsickle_constants_5.InlineDiffSettingMetadataKey|!tsickle_constants_5.CampaignNotificationMetadataKey)} */ (key)), stringVal);
                        }
                    }
                }
            }
            await this.metrics?.sendMetrics(normalizedName, meta);
        }
        catch (e) {
            console.error(`[Telemetry] Failed to log event ${eventName}:`, e);
        }
    }
    /**
     * @public
     * @param {string} eventName
     * @param {(undefined|?)=} data
     * @return {!Promise<void>}
     */
    async logError(eventName, data) {
        try {
            /** @type {string} */
            const normalizedName = normalizeEventName(eventName);
            /** @type {!tsickle_metrics_meta_6.MetricsMeta} */
            const meta = new metrics_meta_1.MetricsMeta(normalizedName);
            meta.set(constants_1.CommonMetadataKey.SUCCESS, 'false');
            if (data) {
                for (const [key__tsickle_destructured_3, value__tsickle_destructured_4] of Object.entries(data)) {
                    const key = /** @type {string} */ (key__tsickle_destructured_3);
                    const value = /** @type {(undefined|string|number|boolean)} */ (value__tsickle_destructured_4);
                    if (value !== undefined && value !== null) {
                        /** @type {string} */
                        const stringVal = typeof value === 'string' ? sanitizeString(value) : String(value);
                        if (key === 'error' ||
                            key === 'errorMessage' ||
                            key === 'message') {
                            meta.set(constants_1.CommonMetadataKey.CLOUDCODE_ERROR_MESSAGE, stringVal);
                        }
                        else if (key === 'failureReason' || key === 'reason') {
                            meta.set(constants_1.CommonMetadataKey.FAILURE_REASON, stringVal);
                        }
                        else if (key === 'duration_ms' ||
                            key === 'durationMs' ||
                            key === 'duration') {
                            meta.set(constants_1.CommonMetadataKey.DURATION_MS, stringVal);
                        }
                        else if (key === 'stack' || key === 'stackName') {
                            /** @type {string} */
                            const currentStack = meta.get(constants_1.DuetMetadataKey.CALLSTACK) || normalizedName;
                            meta.set(constants_1.DuetMetadataKey.CALLSTACK, `${currentStack}/${stringVal}`);
                        }
                        else {
                            meta.set((/** @type {(!tsickle_constants_5.AntigravityMetadataKey|!tsickle_constants_5.ApigeeMetadataKey|!tsickle_constants_5.ApiMetadataKey|!tsickle_constants_5.AuthMetadataKey|!tsickle_constants_5.CloudRunMetadataKey|!tsickle_constants_5.CommonMetadataKey|!tsickle_constants_5.ComputeMetadataKey|!tsickle_constants_5.ContextSourceMetadataKey|!tsickle_constants_5.CustomSlashCommandMetadataKey|!tsickle_constants_5.CrashFeedbackMetadataKey|!tsickle_constants_5.DataCloudMetadataKey|!tsickle_constants_5.DeploymentManagerMetadataKey|!tsickle_constants_5.DuetMetadataKey|!tsickle_constants_5.DuetMetadataV2Key|!tsickle_constants_5.ErrorStackMetadataKey|!tsickle_constants_5.ExperimentMetadataKey|!tsickle_constants_5.FunctionsMetadataKey|!tsickle_constants_5.HatsFeedbackMetadataKey|!tsickle_constants_5.KubernetesMetadataKey|!tsickle_constants_5.LogsViewerMetadataKey|!tsickle_constants_5.LookerVSCodeMetadataKey|!tsickle_constants_5.ManagedDependenciesMetadataKey|!tsickle_constants_5.MinikubeMetadataKey|!tsickle_constants_5.ProjectManagerMetadataKey|!tsickle_constants_5.SecretMetadataKey|!tsickle_constants_5.SkaffoldMetadataKey|!tsickle_constants_5.TreeExplorerMetadataKey|!tsickle_constants_5.UpdateManagerMetadataKey|!tsickle_constants_5.UpgradeMetadataKey|!tsickle_constants_5.WebviewMetadataKey|!tsickle_constants_5.OnboardingMetadataKey|!tsickle_constants_5.StructuredCodeEditsMetadataKey|!tsickle_constants_5.ExclusionFilesMetadataKey|!tsickle_constants_5.InlineDiffSettingMetadataKey|!tsickle_constants_5.CampaignNotificationMetadataKey)} */ (key)), stringVal);
                        }
                    }
                }
            }
            if (!meta.has(constants_1.CommonMetadataKey.FAILURE_REASON)) {
                meta.set(constants_1.CommonMetadataKey.FAILURE_REASON, constants_1.FailureReason.UNEXPECTED_FAILURE);
            }
            await this.metrics?.sendMetrics(normalizedName, meta);
        }
        catch (e) {
            console.error(`[Telemetry] Failed to log error ${eventName}:`, e);
        }
    }
}
exports.AntigravityTelemetryService = AntigravityTelemetryService;
/* istanbul ignore if */
if (false) {
    /**
     * @const {(undefined|!tsickle_metrics_client_7.Metrics)}
     * @private
     */
    AntigravityTelemetryService.prototype.metrics;
}
/**
 * Initializes the Antigravity Telemetry service and underlying Cloud Code Metrics client.
 * @param {!tsickle_vscode_1.ExtensionContext} context
 * @return {{metrics: !tsickle_metrics_client_7.Metrics, telemetry: !AntigravityTelemetryService}}
 */
function initTelemetry(context) {
    if (context.extensionMode === vscode.ExtensionMode.Development) {
        process.env['NODE_ENV'] = 'development';
    }
    /** @type {boolean} */
    const isDoNotTrack = process.env['DO_NOT_TRACK'] === '1' ||
        process.env['DO_NOT_TRACK'] === 'true';
    /** @type {!tsickle_utils_9.Poster} */
    const poster = isDoNotTrack ? utils_1.NOOP_POSTER : utils_1.PROD_POSTER;
    /** @type {!tsickle_metrics_client_7.Metrics} */
    const metrics = new metrics_client_1.Metrics(
    // tslint:disable-next-line:ban-module-namespace-object-escape
    /* code= */ vscode, 
    /* extName= */ context.extension.packageJSON.name || 'google.antigravity', 
    /* extVersion= */ context.extension.packageJSON.version || '0.0.1', 
    /* extensionContext= */ context, 
    /* memento= */ context.globalState, 
    /* metricsProxy= */ new metrics_proxy_1.MetricsProxy(), 
    /* poster= */ poster, 
    /* mementoKeyProvider= */ new memento_key_provider_1.SharedPackageMementoKeyProvider(context), 
    /* metricsOptInConfigId= */ telemetry_constants_1.METRICS_OPT_IN_CONFIG_ID, 
    // tslint:disable-next-line:ban-module-namespace-object-escape
    /* configEnforcementManager= */ new config_enforcement_manager_1.ConfigEnforcementManager(vscode));
    context.subscriptions.push(metrics.flushPeriodically());
    context.subscriptions.push(metrics.watchWipeout());
    /** @type {!AntigravityTelemetryService} */
    const telemetry = new AntigravityTelemetryService(metrics);
    return { metrics, telemetry };
}
exports.initTelemetry = initTelemetry;
