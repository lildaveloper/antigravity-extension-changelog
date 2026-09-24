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
const tsickle_stacktrace_parser_1 = goog.requireType("google3.third_party.javascript.node_modules.stacktrace_parser.v0_1_10.dist.stack$2dtrace$2dparser");
const tsickle_vscode_2 = goog.requireType("vscode");
const tsickle_delegate_interfaces_3 = goog.requireType("google3.devtools.cider.extensions.jetski.delegate_interfaces");
const tsickle_config_enforcement_manager_4 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.config.config_enforcement_manager");
const tsickle_memento_key_provider_5 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.memento.memento_key_provider");
const tsickle_constants_6 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.metrics.constants");
const tsickle_metrics_meta_7 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.metrics.metadata.metrics_meta");
const tsickle_metrics_client_8 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.metrics.metrics_client");
const tsickle_metrics_proxy_9 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.metrics.metrics_proxy");
const tsickle_utils_10 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.metrics.utils");
const tsickle_telemetry_constants_11 = goog.requireType("google3.cloud.developer_experience.antigravity_extensions.vscode.telemetry_constants");
const stackTraceParser = goog.require('google3.third_party.javascript.node_modules.stacktrace_parser.v0_1_10.dist.stack$2dtrace$2dparser');
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
 * Sanitizes a string to remove potential PII such as user directories, file paths, quoted strings, and hashes.
 * @param {string} message
 * @return {string}
 */
function sanitizeString(message) {
    return (message
        // Scrub user profile and home directories across standard platforms (Windows, macOS, Linux)
        .replace(/(?:[a-zA-Z]:\\Users|\/Users|\/home)[\\\/][^\\\/:\s'"]+/gi, '<USER_DIR>')
        // Scrub URL query parameters
        .replace(/\?[^#\s]*/g, '?<REDACTED_PARAMS>')
        .replace(/'[^']+'/g, "'<REDACTED>'") // Scrub single quoted strings
        .replace(/"[^"]+"/g, '"<REDACTED>"') // Scrub double quoted strings
        // Scrub IPv4 addresses with optional port (e.g. 127.0.0.1:45123, 192.168.1.1)
        .replace(/\b\d{1,3}(?:\.\d{1,3}){3}(?::\d+)?\b/g, '<IP_REDACTED>')
        // Scrub file paths and names with various extensions, preserving the extension
        .replace(/(?:[\w/\\.:<>-]+[/\\])?[\w-]+\.((?:ts|js|json|md|py|go|html|css|txt|code-workspace|vsix|sock|log|out|sh|cfg|conf|yaml|yml))\b/gi, '<REDACTED>.$1')
        // Scrub git commit hashes (SHA-1)
        .replace(/\b[0-9a-f]{40}\b/gi, '<REDACTED_SHA>'));
}
exports.sanitizeString = sanitizeString;
/**
 * Cleans a stack frame file path to remove all directory paths and user identifiers,
 * preserving only the base file name or core node internal module specifier.
 * @param {(null|string)} file
 * @return {string}
 */
function cleanFrameFile(file) {
    if (!file) {
        return '<unknown>';
    }
    // Preserve node core internals (e.g. "node:internal/process/task_queues")
    if (file.startsWith('node:')) {
        return file;
    }
    // Strip all directory path segments (POSIX or Windows) and keep only the filename
    /** @type {!Array<string>} */
    const segments = file.split(/[/\\]/);
    return segments[segments.length - 1] || '<unknown>';
}
/**
 * Reconstructs a clean stack frame line without directory paths or user directories.
 * @param {!tsickle_stacktrace_parser_1.StackFrame} frame
 * @return {string}
 */
function formatCleanFrame(frame) {
    /** @type {string} */
    const baseFile = cleanFrameFile(frame.file);
    /** @type {string} */
    const loc = frame.lineNumber !== null && frame.lineNumber !== undefined
        ? `:${frame.lineNumber}${frame.column !== null && frame.column !== undefined ? `:${frame.column}` : ''}`
        : '';
    /** @type {string} */
    const fileAndLoc = `${baseFile}${loc}`;
    if (frame.methodName && frame.methodName !== '<unknown>') {
        return `    at ${frame.methodName} (${fileAndLoc})`;
    }
    return `    at ${fileAndLoc}`;
}
/**
 * Sanitizes a stack trace to remove user home directories, workspace paths, and potential PII
 * using structured stack trace parsing (matching Cloud Code error_util) while preserving method
 * names, source file names, and line:column numbers.
 * @param {string} stack
 * @param {{parse: function(string): !Array<!tsickle_stacktrace_parser_1.StackFrame>}=} parser
 * @return {string}
 */
function sanitizeStackTrace(stack, parser = { parse: (/**
     * @param {string} s
     * @return {!Array<!tsickle_stacktrace_parser_1.StackFrame>}
     */
    (s) => stackTraceParser.parse(s)) }) {
    if (!stack) {
        return '';
    }
    // Separate leading error header lines (e.g. "Error: Connection failed") from stack frames
    /** @type {!Array<string>} */
    const rawLines = stack.split('\n');
    /** @type {!Array<string>} */
    const headerLines = [];
    for (const line of rawLines) {
        /** @type {string} */
        const trimmed = line.trim();
        if (trimmed.startsWith('at ')) {
            break;
        }
        headerLines.push(sanitizeString(line));
    }
    try {
        /** @type {!Array<!tsickle_stacktrace_parser_1.StackFrame>} */
        const frames = parser.parse(stack);
        if (frames && frames.length > 0) {
            /** @type {!Array<string>} */
            const sanitizedFrames = frames.map(formatCleanFrame);
            return [...headerLines, ...sanitizedFrames].join('\n');
        }
    }
    catch {
        // If parsing throws, fall back to line-by-line regex sanitization below.
    }
    // Fallback if parser returns no frames
    return rawLines
        .map((/**
     * @param {string} line
     * @return {string}
     */
    (line) => {
        /** @type {string} */
        const trimmed = line.trim();
        if (!trimmed.startsWith('at ')) {
            return sanitizeString(line);
        }
        return line.replace(/^(\s*at\s+(?:async\s+)?(?:.+?\s+\()?(?:file:\/\/)?)(?:[a-zA-Z]:)?.*[\\\/]([^\\\/:\s()]+\.[a-zA-Z0-9]+(?::\d+)?(?::\d+)?\)?.*)$/, '$1$2');
    }))
        .join('\n');
}
exports.sanitizeStackTrace = sanitizeStackTrace;
/**
 * Antigravity telemetry service that delegates to Cloud Code's Metrics client.
 * @implements {tsickle_delegate_interfaces_3.Telemetry}
 */
class AntigravityTelemetryService {
    /**
     * @public
     * @param {(undefined|!tsickle_metrics_client_8.Metrics)} metrics
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
            /** @type {!tsickle_metrics_meta_7.MetricsMeta} */
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
                            meta.set((/** @type {(!tsickle_constants_6.AntigravityMetadataKey|!tsickle_constants_6.DataCloudMetadataKey|!tsickle_constants_6.LookerVSCodeMetadataKey|!tsickle_constants_6.ApigeeMetadataKey|!tsickle_constants_6.ApiMetadataKey|!tsickle_constants_6.AuthMetadataKey|!tsickle_constants_6.CloudRunMetadataKey|!tsickle_constants_6.CommonMetadataKey|!tsickle_constants_6.CrashFeedbackMetadataKey|!tsickle_constants_6.ComputeMetadataKey|!tsickle_constants_6.CustomSlashCommandMetadataKey|!tsickle_constants_6.DeploymentManagerMetadataKey|!tsickle_constants_6.DuetMetadataKey|!tsickle_constants_6.DuetMetadataV2Key|!tsickle_constants_6.ErrorStackMetadataKey|!tsickle_constants_6.ExperimentMetadataKey|!tsickle_constants_6.FunctionsMetadataKey|!tsickle_constants_6.HatsFeedbackMetadataKey|!tsickle_constants_6.KubernetesMetadataKey|!tsickle_constants_6.LogsViewerMetadataKey|!tsickle_constants_6.ManagedDependenciesMetadataKey|!tsickle_constants_6.MinikubeMetadataKey|!tsickle_constants_6.ProjectManagerMetadataKey|!tsickle_constants_6.SecretMetadataKey|!tsickle_constants_6.SkaffoldMetadataKey|!tsickle_constants_6.TreeExplorerMetadataKey|!tsickle_constants_6.UpdateManagerMetadataKey|!tsickle_constants_6.UpgradeMetadataKey|!tsickle_constants_6.CampaignNotificationMetadataKey|!tsickle_constants_6.ExclusionFilesMetadataKey|!tsickle_constants_6.InlineDiffSettingMetadataKey|!tsickle_constants_6.WebviewMetadataKey|!tsickle_constants_6.OnboardingMetadataKey|!tsickle_constants_6.StructuredCodeEditsMetadataKey|!tsickle_constants_6.ContextSourceMetadataKey)} */ (key)), stringVal);
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
            /** @type {!tsickle_metrics_meta_7.MetricsMeta} */
            const meta = new metrics_meta_1.MetricsMeta(normalizedName);
            meta.set(constants_1.CommonMetadataKey.SUCCESS, 'false');
            if (data) {
                for (const [key__tsickle_destructured_3, value__tsickle_destructured_4] of Object.entries(data)) {
                    const key = /** @type {string} */ (key__tsickle_destructured_3);
                    const value = /** @type {(undefined|string|number|boolean)} */ (value__tsickle_destructured_4);
                    if (value !== undefined && value !== null) {
                        /** @type {string} */
                        const stringVal = typeof value === 'string' ? sanitizeString(value) : String(value);
                        // Map common error payload keys (supporting both camelCase and snake_case) to standard Cloud Code metadata.
                        if (key === 'error' ||
                            key === 'errorMessage' ||
                            key === 'error_message' ||
                            key === 'message') {
                            meta.set(constants_1.CommonMetadataKey.CLOUDCODE_ERROR_MESSAGE, stringVal);
                        }
                        else if (key === 'failureReason' ||
                            key === 'failure_reason' ||
                            key === 'reason') {
                            meta.set(constants_1.CommonMetadataKey.FAILURE_REASON, stringVal);
                        }
                        else if (key === 'duration_ms' ||
                            key === 'durationMs' ||
                            key === 'duration') {
                            meta.set(constants_1.CommonMetadataKey.DURATION_MS, stringVal);
                        }
                        else if (key === 'exit_code' || key === 'exitCode') {
                            meta.set(constants_1.CommonMetadataKey.EXIT_CODE, stringVal);
                        }
                        else if (key === 'error_code' || key === 'errorCode') {
                            meta.set(constants_1.CommonMetadataKey.ERROR_CODE, stringVal);
                        }
                        else if (key === 'stack' ||
                            key === 'stackName' ||
                            key === 'stack_trace') {
                            /** @type {string} */
                            const sanitizedStack = typeof value === 'string'
                                ? sanitizeStackTrace(value)
                                : String(value);
                            /** @type {string} */
                            const currentStack = meta.get(constants_1.CommonMetadataKey.STACK) || normalizedName;
                            meta.set(constants_1.CommonMetadataKey.STACK, `${currentStack}/${sanitizedStack}`);
                            meta.set(constants_1.DuetMetadataKey.CALLSTACK, sanitizedStack);
                        }
                        else {
                            meta.set((/** @type {(!tsickle_constants_6.AntigravityMetadataKey|!tsickle_constants_6.DataCloudMetadataKey|!tsickle_constants_6.LookerVSCodeMetadataKey|!tsickle_constants_6.ApigeeMetadataKey|!tsickle_constants_6.ApiMetadataKey|!tsickle_constants_6.AuthMetadataKey|!tsickle_constants_6.CloudRunMetadataKey|!tsickle_constants_6.CommonMetadataKey|!tsickle_constants_6.CrashFeedbackMetadataKey|!tsickle_constants_6.ComputeMetadataKey|!tsickle_constants_6.CustomSlashCommandMetadataKey|!tsickle_constants_6.DeploymentManagerMetadataKey|!tsickle_constants_6.DuetMetadataKey|!tsickle_constants_6.DuetMetadataV2Key|!tsickle_constants_6.ErrorStackMetadataKey|!tsickle_constants_6.ExperimentMetadataKey|!tsickle_constants_6.FunctionsMetadataKey|!tsickle_constants_6.HatsFeedbackMetadataKey|!tsickle_constants_6.KubernetesMetadataKey|!tsickle_constants_6.LogsViewerMetadataKey|!tsickle_constants_6.ManagedDependenciesMetadataKey|!tsickle_constants_6.MinikubeMetadataKey|!tsickle_constants_6.ProjectManagerMetadataKey|!tsickle_constants_6.SecretMetadataKey|!tsickle_constants_6.SkaffoldMetadataKey|!tsickle_constants_6.TreeExplorerMetadataKey|!tsickle_constants_6.UpdateManagerMetadataKey|!tsickle_constants_6.UpgradeMetadataKey|!tsickle_constants_6.CampaignNotificationMetadataKey|!tsickle_constants_6.ExclusionFilesMetadataKey|!tsickle_constants_6.InlineDiffSettingMetadataKey|!tsickle_constants_6.WebviewMetadataKey|!tsickle_constants_6.OnboardingMetadataKey|!tsickle_constants_6.StructuredCodeEditsMetadataKey|!tsickle_constants_6.ContextSourceMetadataKey)} */ (key)), stringVal);
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
     * @const {(undefined|!tsickle_metrics_client_8.Metrics)}
     * @private
     */
    AntigravityTelemetryService.prototype.metrics;
}
/**
 * Initializes the Antigravity Telemetry service and underlying Cloud Code Metrics client.
 * @param {!tsickle_vscode_2.ExtensionContext} context
 * @return {{metrics: !tsickle_metrics_client_8.Metrics, telemetry: !AntigravityTelemetryService}}
 */
function initTelemetry(context) {
    if (context.extensionMode === vscode.ExtensionMode.Development) {
        process.env['NODE_ENV'] = 'development';
    }
    /** @type {boolean} */
    const isDoNotTrack = process.env['DO_NOT_TRACK'] === '1' ||
        process.env['DO_NOT_TRACK'] === 'true';
    /** @type {!tsickle_utils_10.Poster} */
    const poster = isDoNotTrack ? utils_1.NOOP_POSTER : utils_1.PROD_POSTER;
    /** @type {!tsickle_metrics_client_8.Metrics} */
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
