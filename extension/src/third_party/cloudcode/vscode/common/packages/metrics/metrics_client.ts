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
 * Generated from: third_party/cloudcode/vscode/common/packages/metrics/metrics_client.ts
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
goog.module('google3.third_party.cloudcode.vscode.common.packages.metrics.metrics_client');
var module = module || { id: 'third_party/cloudcode/vscode/common/packages/metrics/metrics_client.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_async_lock_1 = goog.requireType("google3.third_party.javascript.typings.async_lock.index");
const tsickle_gaxios_2 = goog.requireType("google3.third_party.javascript.node_modules.gaxios.v6_7_1.build.src.index");
const tsickle_os_3 = goog.requireType("google3.third_party.javascript.typings.node.node.os");
const tsickle_perf_hooks_4 = goog.requireType("google3.third_party.javascript.typings.node.node.perf_hooks");
const tsickle_util_5 = goog.requireType("google3.third_party.javascript.typings.node.node.util");
const tsickle_uuid_6 = goog.requireType("google3.third_party.javascript.typings.uuid.index");
const tsickle_vscode_7 = goog.requireType("vscode");
const tsickle_cloudworkstations_8 = goog.requireType("google3.third_party.cloudcode.vscode.common.cloudworkstations.index");
const tsickle_environment_9 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.cloudshell.environment");
const tsickle_constants_10 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.config.config.constants");
const tsickle_config_enforcement_manager_11 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.config.config_enforcement_manager");
const tsickle_config_helper_12 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.config.config_helper");
const tsickle_constants_13 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.config.constants");
const tsickle_types_14 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.experimentation.types");
const tsickle_constants_15 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.gcp.constants");
const tsickle_logging_16 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.logging.index");
const tsickle_constants_17 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.memento.constants");
const tsickle_memento_key_provider_18 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.memento.memento_key_provider");
const tsickle_extensionUtil_19 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.utils.extensionUtil");
const tsickle_file_utils_20 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.utils.file_utils");
const tsickle_ide_utils_21 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.utils.ide_utils");
const tsickle_time_utils_22 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.utils.time_utils");
const tsickle_constants_23 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.metrics.constants");
const tsickle_install_session_id_24 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.metrics.install_session_id");
const tsickle_metrics_meta_25 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.metrics.metadata.metrics_meta");
const tsickle_metrics_debug_output_26 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.metrics.metrics_debug_output");
const tsickle_metrics_int_test_client_27 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.metrics.metrics_int_test_client");
const tsickle_metrics_proxy_28 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.metrics.metrics_proxy");
const tsickle_utils_29 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.metrics.utils");
const AsyncLock = goog.require('google3.third_party.javascript.typings.async_lock.index');
const gaxios_1 = goog.require('google3.third_party.javascript.node_modules.gaxios.v6_7_1.build.src.index');
const os = goog.require('google3.third_party.javascript.typings.node.node.os');
const perf_hooks_1 = goog.require('google3.third_party.javascript.typings.node.node.perf_hooks');
const util_1 = goog.require('google3.third_party.javascript.typings.node.node.util');
const uuid = goog.require('google3.third_party.javascript.typings.uuid.index');
const vscode = goog.require('vscode');
const cloudworkstations_1 = goog.require('google3.third_party.cloudcode.vscode.common.cloudworkstations.index');
const environment_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.cloudshell.environment');
const constants_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.config.config.constants');
const config_helper_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.config.config_helper');
const constants_2 = goog.require('google3.third_party.cloudcode.vscode.common.packages.config.constants');
const constants_3 = goog.require('google3.third_party.cloudcode.vscode.common.packages.gcp.constants');
const logging_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.logging.index');
const constants_4 = goog.require('google3.third_party.cloudcode.vscode.common.packages.memento.constants');
const extensionUtil_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.utils.extensionUtil');
const file_utils_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.utils.file_utils');
const ide_utils_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.utils.ide_utils');
const time_utils_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.utils.time_utils');
const constants_5 = goog.require('google3.third_party.cloudcode.vscode.common.packages.metrics.constants');
const install_session_id_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.metrics.install_session_id');
const metrics_meta_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.metrics.metadata.metrics_meta');
const metrics_debug_output_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.metrics.metrics_debug_output');
const metrics_int_test_client_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.metrics.metrics_int_test_client');
const utils_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.metrics.utils');
/**
 * Interface for email getter that caches the email to prevent spamming gcloud.
 * @record
 */
function ClientEmailCacheInterface() { }
exports.ClientEmailCacheInterface = ClientEmailCacheInterface;
/* istanbul ignore if */
if (false) {
    /**
     * @public
     * @return {!Promise<string>}
     */
    ClientEmailCacheInterface.prototype.get = function () { };
    /**
     * @public
     * @return {!Promise<void>}
     */
    ClientEmailCacheInterface.prototype.updateCache = function () { };
}
/**
 * @record
 */
function MetricsRegistrationOptions() { }
/* istanbul ignore if */
if (false) {
    /**
     * @type {(undefined|!tsickle_constants_23.CommandSource)}
     * @public
     */
    MetricsRegistrationOptions.prototype.commandSource;
    /**
     * @type {(undefined|string)}
     * @public
     */
    MetricsRegistrationOptions.prototype.metricsEventName;
}
/**
 * Represents a pairing between a command and a command source
 * @record
 */
function CommandMetricsSourcePair() { }
/* istanbul ignore if */
if (false) {
    /**
     * @type {string}
     * @public
     */
    CommandMetricsSourcePair.prototype.cmd;
    /**
     * @type {!tsickle_constants_23.CommandSource}
     * @public
     */
    CommandMetricsSourcePair.prototype.commandSource;
}
/**
 * Represents details surrounding when a metric is logged
 * @record
 */
function MetricLoggedEvent() { }
exports.MetricLoggedEvent = MetricLoggedEvent;
/* istanbul ignore if */
if (false) {
    /**
     * @type {string}
     * @public
     */
    MetricLoggedEvent.prototype.action;
    /**
     * @type {number}
     * @public
     */
    MetricLoggedEvent.prototype.time;
    /**
     * @type {!Map<string, string>}
     * @public
     */
    MetricLoggedEvent.prototype.eventData;
    /**
     * @type {!Map<string, string>}
     * @public
     */
    MetricLoggedEvent.prototype.metadata;
    /**
     * @type {(undefined|!Array<*>)}
     * @public
     */
    MetricLoggedEvent.prototype.args;
}
/**
 * Metrics handles sending metrics from the extension and its related components to our
 * metrics pipeline
 */
class Metrics {
    /**
     * @public
     * @param {?} code
     * @param {string} extName
     * @param {string} extVersion
     * @param {!tsickle_vscode_7.ExtensionContext} extensionContext
     * @param {!tsickle_vscode_7.Memento} memento
     * @param {!tsickle_metrics_proxy_28.MetricsProxy} metricsProxy
     * @param {!tsickle_utils_29.Poster=} poster
     * @param {!tsickle_memento_key_provider_18.SharedPackageMementoKeyProvider=} mementoKeyProvider
     * @param {string=} metricsOptInConfigId
     * @param {!tsickle_config_enforcement_manager_11.ConfigEnforcementManager=} configEnforcementManager
     * @param {!tsickle_file_utils_20.FileUtils=} fileUtils
     * @param {string=} platform
     * @param {string=} arch
     * @param {string=} platformVersion
     * @param {?=} env
     * @param {function(): number=} now
     * @param {!tsickle_vscode_7.EventEmitter<!MetricLoggedEvent>=} eventEmitter
     */
    constructor(code, extName, extVersion, extensionContext, memento, metricsProxy, poster = utils_1.PROD_POSTER, mementoKeyProvider, metricsOptInConfigId, configEnforcementManager, fileUtils = new file_utils_1.FileUtils(), platform = process.platform, arch = process.arch, platformVersion = os.release(), env = process.env, now = (/**
     * @return {number}
     */
    () => perf_hooks_1.performance.now()), eventEmitter = new vscode.EventEmitter()) {
        this.code = code;
        this.extName = extName;
        this.extVersion = extVersion;
        this.extensionContext = extensionContext;
        this.memento = memento;
        this.metricsProxy = metricsProxy;
        this.poster = poster;
        this.mementoKeyProvider = mementoKeyProvider;
        this.metricsOptInConfigId = metricsOptInConfigId;
        this.configEnforcementManager = configEnforcementManager;
        this.platform = platform;
        this.arch = arch;
        this.platformVersion = platformVersion;
        this.env = env;
        this.now = now;
        this.eventEmitter = eventEmitter;
        this.lock = new AsyncLock();
        this.pendingMetrics = new Map();
        this.currentDependencyStatus = constants_3.DependencyStatus.UNCHECKED;
        this.statusUpdateSubscribers = [];
        this.signedIn = false;
        // Visible for testing.
        this.emailSessionId = uuid.v4();
        // Logging server expects things individual events to each be wrapped in an
        // array. I'm not sure why, but this should work according to local dev
        // server.
        this.events = [];
        this.stickyMetadata = new Map();
        this.metricsProxy.listenForMetrics((/**
         * @param {!tsickle_metrics_proxy_28.Metric} m
         * @return {!Promise<void>}
         */
        m => this.sendMetrics(m.action, m.addProp, m.eventEntries)));
        this.installSessionId = new install_session_id_1.InstallSessionId(fileUtils);
        this.debugOutput = new config_helper_1.ConfigHelper(`${(0, extensionUtil_1.getExtensionName)(extensionContext)}.debug.telemetryOutput`, this.code);
        this.debugOutput.onDidChangeConfiguration((/**
         * @return {void}
         */
        () => {
            if (this.debugOutput.getConfig()) {
                if (!this.telemetryOutputChannel) {
                    this.createOutputChannel();
                }
            }
            else if (!(this.isDevMode() || (0, utils_1.hasTestMetricsEnvironmentOverride)())) {
                this.disposeOutputChannel();
            }
        }));
        if (this.isDevMode() || (0, utils_1.hasTestMetricsEnvironmentOverride)() || this.debugOutput.getConfig()) {
            this.createOutputChannel();
        }
        if (this.isIntegrationTestMode()) {
            this.metricsIntegrationTestClient = new metrics_int_test_client_1.MetricsIntegrationTestClient();
        }
        this.cloudWorkstationsEnv = new cloudworkstations_1.CloudWorkstationsEnvironment(this.env);
        this.configEnforcementManager.enforce({
            name: this.metricsOptInConfigId,
            enforcementPolicy: (/**
             * @return {boolean}
             */
            () => this.isAdminTelemetryBlocked()),
            enforcedValue: false,
            userMessage: 'Telemetry is disabled by the admin',
            userMessageInModal: true,
        });
    }
    /**
     * Creates the output and debug output channels.
     * @public
     * @return {void}
     */
    createOutputChannel() {
        this.telemetryOutputChannel = (0, logging_1.createOutputChannel)(this.code, this.extensionContext, (0, util_1.format)(constants_5.TELEMETRY_OUTPUT_WINDOW_FORMAT, this.extensionContext.extension.packageJSON.displayName), { log: true });
        this.filteredTelemetryOutputChannel = new metrics_debug_output_1.MetricsDebugOutput(this.code, this.extensionContext);
    }
    /**
     * Disposes of the output and debug channels.
     * @public
     * @return {void}
     */
    disposeOutputChannel() {
        this.telemetryOutputChannel?.dispose();
        this.filteredTelemetryOutputChannel?.dispose();
        this.telemetryOutputChannel = undefined;
        this.filteredTelemetryOutputChannel = undefined;
    }
    /**
     * Similar to vscode.commands.registerCommand, except we send metrics after
     * the callback finishes executing. We respect vscode's
     * cloudcode.enableTelemetry settings.
     * @public
     * @template P, R
     * @param {string} cmd The name of the command to be executed.
     * @param {function(!tsickle_metrics_meta_25.MetricsMeta, ...P): R} fn The function to wrap.
     * @param {(undefined|!MetricsRegistrationOptions)=} options
     * @return {!tsickle_vscode_7.Disposable}
     */
    registerCommand(cmd, fn, options) {
        return this.code.commands.registerCommand(cmd, this.metricSender(fn, options?.metricsEventName ? options.metricsEventName : cmd, options?.commandSource));
    }
    /**
     * Registers multiple commands to the same callback and metricName, but with different commandSources
     * @public
     * @template P, R
     * @param {!Array<!CommandMetricsSourcePair>} commands The pairs of commands and their source
     * @param {function(!tsickle_metrics_meta_25.MetricsMeta, ...P): R} fn The function to wrap.
     * @param {string} metricName The common metric name that the commands should share
     * @return {!Array<!tsickle_vscode_7.Disposable>}
     */
    registerCommands(commands, fn, metricName) {
        return commands.map((/**
         * @param {!CommandMetricsSourcePair} c
         * @return {!tsickle_vscode_7.Disposable}
         */
        c => this.code.commands.registerCommand(c.cmd, this.metricSender(fn, metricName, c.commandSource))));
    }
    /**
     * Similar to vscode.commands.registerTextEditorCommand, except we send metrics after
     * the callback finishes executing. We respect vscode's
     * cloudcode.enableTelemetry settings.
     * @public
     * @param {string} cmd The name of the command to be executed.
     * @param {function(!tsickle_metrics_meta_25.MetricsMeta, !tsickle_vscode_7.TextEditor, !tsickle_vscode_7.TextEditorEdit, ...?): ?} fn The function to wrap.
     * @param {(undefined|!tsickle_constants_23.CommandSource)=} commandSource Corresponding source from which the command will be executed.
     * @return {!tsickle_vscode_7.Disposable}
     */
    registerTextEditorCommand(cmd, fn, commandSource) {
        /** @type {function(!tsickle_vscode_7.TextEditor, !tsickle_vscode_7.TextEditorEdit, ...?): ?} */
        const callback = (/**
         * @param {!tsickle_vscode_7.TextEditor} textEditor
         * @param {!tsickle_vscode_7.TextEditorEdit} edit
         * @param {...?} args
         * @return {?}
         */
        (textEditor, edit, 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...args) => {
            /** @type {!tsickle_metrics_meta_25.MetricsMeta} */
            const meta = new metrics_meta_1.MetricsMeta(cmd);
            meta.set(constants_5.CommonMetadataKey.COMMAND_SOURCE, commandSource || constants_5.CommandSource.COMMAND_PALETTE);
            return this.withMetrics(cmd, meta, fn, textEditor, edit, ...args);
        });
        return this.code.commands.registerTextEditorCommand(cmd, callback);
    }
    /**
     * Wraps a function, sending metric every time the function is called.
     * If registerSource is set, the callback with take command source besides command args as input during invocation.
     * Else, the callback takes only command args and source is set to default.
     * @public
     * @template P, R
     * @param {function(!tsickle_metrics_meta_25.MetricsMeta, ...P): R} fn The function to wrap.
     * @param {string} action The name of this event, to be reported in the metric.
     * @param {(undefined|!tsickle_constants_23.CommandSource)=} commandSource Corresponding source from which the command will be executed.
     * @param {string=} command
     * @return {function(...P): R}
     */
    metricSender(fn, action, commandSource, command = action) {
        return (/**
         * @param {...P} args
         * @return {R}
         */
        (...args) => {
            /** @type {(undefined|!tsickle_constants_23.CommandSource)} */
            let source = commandSource;
            args.forEach((/**
             * @param {?} arg
             * @return {void}
             */
            (arg) => {
                if (arg && typeof arg === 'object' && 'source' in arg && arg.source && Object.values(constants_5.CommandSource).includes((/** @type {!tsickle_constants_23.CommandSource} */ (arg.source)))) {
                    source = (/** @type {!tsickle_constants_23.CommandSource} */ (arg.source));
                }
            }));
            /** @type {!tsickle_metrics_meta_25.MetricsMeta} */
            const meta = new metrics_meta_1.MetricsMeta(action);
            meta.set(constants_5.CommonMetadataKey.COMMAND_SOURCE, source || constants_5.CommandSource.COMMAND_PALETTE);
            /** @type {number} */
            const start = perf_hooks_1.performance.now();
            (0, logging_1.info)(`Executing command ${command}.`);
            /** @type {R} */
            const ret = this.withMetrics(action, meta, fn, ...args);
            Promise.resolve(ret).then((/**
             * @return {void}
             */
            () => {
                (0, logging_1.info)(`Command ${command} done in ${perf_hooks_1.performance.now() - start}ms.`);
            }), (/**
             * @param {?} e
             * @return {void}
             */
            (e) => {
                (0, logging_1.warn)(`Command ${command} failed with ${e} in ${perf_hooks_1.performance.now() - start}ms.`);
            }));
            return ret;
        });
    }
    /**
     * Calls the specified function reporting metrics for the call
     *
     * @public
     * @template T
     * @param {string} event the metrics event name
     * @param {(function(!tsickle_metrics_meta_25.MetricsMeta): T|function(): T)} fn the function to wrap
     * @return {T}
     */
    wrapWithMetrics(event, fn) {
        /** @type {!tsickle_metrics_meta_25.MetricsMeta} */
        const meta = new metrics_meta_1.MetricsMeta(event);
        try {
            return (/** @type {T} */ (this.withMetrics(event, meta, (/**
             * @return {T}
             */
            () => fn(meta)))));
        }
        catch (err) {
            if (!(err instanceof Error)) {
                /** @type {string} */
                const unknownError = `Unknown error calling ${event} with metrics: ${JSON.stringify(err, undefined, 4)}`;
                (0, logging_1.error)(unknownError);
                throw new Error(unknownError);
            }
            (0, logging_1.error)(`Error calling ${event} with metrics. Message: ${(/** @type {!Error} */ (err)).message} Stack: ${(/** @type {!Error} */ (err)).stack}`);
            throw err;
        }
    }
    /**
     * Calls the indicated function, wrapping the call with metrics.
     *
     * @public
     * @template P, R
     * @param {string} action The name of this event, to be reported in the metric.
     * @param {!tsickle_metrics_meta_25.MetricsMeta} meta The metadata for the event.
     * @param {function(!tsickle_metrics_meta_25.MetricsMeta, ...P): R} fn The function to call.
     * @param {...P} args Arguments to pass to the function when being called.
     * @return {R}
     */
    withMetrics(action, meta, fn, ...args) {
        /** @type {?} */
        let result;
        /** @type {string} */
        const key = uuid.v4();
        /** @type {number} */
        const start = this.now();
        /** @type {number} */
        let delta = 0;
        /** @type {!tsickle_constants_15.DependencyStatus} */
        const startState = this.currentDependencyStatus;
        /** @type {function(): void} */
        const hook = (/**
         * @return {void}
         */
        () => {
            delta = this.now() - start;
        });
        this.statusUpdateSubscribers.push(hook);
        /** @type {function(): void} */
        const unhook = (/**
         * @return {void}
         */
        () => {
            this.statusUpdateSubscribers.splice(this.statusUpdateSubscribers.indexOf(hook), 1);
        });
        /** @type {function(): void} */
        const setDependencyMeta = (/**
         * @return {void}
         */
        () => {
            unhook();
            meta.set(constants_5.ManagedDependenciesMetadataKey.DEPENDENCY_STATE_START, startState);
            meta.set(constants_5.ManagedDependenciesMetadataKey.DEPENDENCY_STATE, this.currentDependencyStatus);
            meta.set(constants_5.ManagedDependenciesMetadataKey.DEPENDENCY_STATE_TRANSITION_MS, delta.toString());
            if (this.dependencyFailureReason) {
                meta.set(constants_5.ManagedDependenciesMetadataKey.DEPENDENCY_FAILURE_REASON, this.dependencyFailureReason);
            }
        });
        /** @type {function(): void} */
        const updateDurationMS = (/**
         * @return {void}
         */
        () => {
            if (!meta.has(constants_5.CommonMetadataKey.DURATION_MS)) {
                meta.set(constants_5.CommonMetadataKey.DURATION_MS, `${this.now() - start}`);
            }
        });
        /** @type {function(): void} */
        const updateMeta = (/**
         * @return {void}
         */
        () => {
            setDependencyMeta();
            updateDurationMS();
        });
        try {
            result = fn.apply(null, [meta, ...args]);
        }
        catch (e) {
            if (!meta.has(constants_5.CommonMetadataKey.FAILURE_REASON)) {
                meta.commonErrorDetails = e;
                meta.failureReason = typeof meta.commonErrorDetails === 'string' ? meta.commonErrorDetails : constants_5.FailureReason.UNKNOWN;
            }
            setDependencyMeta();
            this.pendingMetrics.set(key, this.sendMetrics(action, meta, undefined, args).finally((/**
             * @return {boolean}
             */
            () => this.pendingMetrics.delete(key))));
            throw e;
        }
        this.pendingMetrics.set(key, Promise.resolve(result).then((/**
         * @return {!Promise<void>}
         */
        async () => {
            updateMeta();
            await this.sendMetrics(action, meta);
            this.pendingMetrics.delete(key);
        }), (/**
         * @param {?} e
         * @return {!Promise<void>}
         */
        async (e) => {
            if (!meta.has(constants_5.CommonMetadataKey.FAILURE_REASON)) {
                meta.commonErrorDetails = e;
                meta.failureReason = typeof meta.commonErrorDetails === 'string' ? meta.commonErrorDetails : constants_5.FailureReason.UNKNOWN;
            }
            updateMeta();
            await this.sendMetrics(action, meta);
            this.pendingMetrics.delete(key);
        })));
        return result;
    }
    /**
     * @public
     * @return {!Promise<void>}
     */
    async awaitMetrics() {
        await Promise.all(this.pendingMetrics.values());
    }
    /**
     * @public
     * @param {!tsickle_constants_15.DependencyStatus} value
     * @param {(undefined|string)=} failureReason
     * @return {void}
     */
    setDependencyStatus(value, failureReason) {
        this.currentDependencyStatus = value;
        this.dependencyFailureReason = failureReason;
        this.statusUpdateSubscribers.forEach((/**
         * @param {function(): void} s
         * @return {void}
         */
        s => s()));
    }
    /**
     * @private
     * @return {boolean}
     */
    optedIn() {
        return !this.isAdminTelemetryBlocked() && this.code.workspace.getConfiguration().get(this.metricsOptInConfigId, true);
    }
    /**
     * @private
     * @return {boolean}
     */
    isAdminTelemetryBlocked() {
        return !!this.experimentationService?.experimentOverrides?.enableAdminTelemetryBlock;
    }
    /**
     * @private
     * @param {string} action
     * @return {string}
     */
    projectId(action) {
        // Only use duet project ID for duet metrics
        if (action.startsWith('cloudcode.aipp')) {
            return this.code.workspace.getConfiguration().get(constants_2.SharedSettings.PROJECT, '');
        }
        else if (action.startsWith('cloudcode')) {
            return this.code.workspace.getConfiguration().get(constants_1.Settings.GOOGLE_CLOUD_PROJECT, '');
        }
        return '';
    }
    /**
     * Sends metric, unless the user opted out.
     *
     * @public
     * @param {string} action The name of this event.
     * @param {!tsickle_metrics_meta_25.MetricsMeta=} addProp Any additional properties of the action. The type is
     * essentially anything you can `new Map<string, string>(addProp)` with.
     * @param {!Map<string, *>=} eventEntries Any additional top level event entries. You probably
     * don't need to use this.
     * @param {(undefined|!Array<*>)=} args
     * @return {!Promise<void>}
     */
    async sendMetrics(action, addProp = new metrics_meta_1.MetricsMeta(''), eventEntries = new Map(), args) {
        if (this.optedIn()) {
            // Add event entries from MetricsMeta
            addProp.event.forEach((/**
             * @param {string} v
             * @param {string} k
             * @return {void}
             */
            (v, k) => {
                eventEntries.set(k, v);
            }));
            await this.sendMetricsInner(action, addProp.entries, eventEntries, args, addProp.processingDetails);
            for (const prop in addProp) {
                if (prop[0] === constants_5.CommonMetadataKey.UNRECOGNIZED_METADATA) {
                    await this.checkAndSendUnrecognizedMetadataEvent(constants_5.CommonMetadataKey.ACTION, addProp);
                }
            }
        }
    }
    /**
     * Send a metric that designates that a given action has attempted to
     * log invalid metadata fields
     * @private
     * @param {string} action
     * @param {!tsickle_metrics_meta_25.MetricsMeta} meta
     * @return {!Promise<void>}
     */
    async checkAndSendUnrecognizedMetadataEvent(action, meta) {
        for (const field of meta.entries) {
            if (field[0] === constants_5.CommonMetadataKey.UNRECOGNIZED_METADATA) {
                /** @type {!tsickle_metrics_meta_25.MetricsMeta} */
                const unrecognizedEventMetadata = new metrics_meta_1.MetricsMeta('cloudcode.metrics');
                unrecognizedEventMetadata.set(constants_5.CommonMetadataKey.ACTION, action);
                await this.sendMetricsInner(constants_5.UNRECOGNIZED_METADATA_EVENT, unrecognizedEventMetadata.entries);
            }
        }
    }
    /**
     * Sends a Language Server Metric, unless the user opted out
     *
     * **NOTE: This should only be used when piping along metrics from a language server. For other use cases, use `sendMetrics`.**
     * @public
     * @param {string} action
     * @param {!Iterable<!Array<?>, ?, ?>=} addProp
     * @param {!Map<string, *>=} eventEntries
     * @return {!Promise<void>}
     */
    async sendLanguageServerMetrics(action, addProp = [], eventEntries = new Map()) {
        if (this.optedIn()) {
            await this.sendMetricsInner(action, addProp, eventEntries);
        }
    }
    /**
     * Sends a HATS feedback response.
     *
     * **NOTE: This should only be used when submitting feedback for the HATS survey. For other use cases, use `sendMetrics`.**
     * @public
     * @param {string} action
     * @param {!Iterable<!Array<?>, ?, ?>=} addProp
     * @param {!Map<string, *>=} eventEntries
     * @return {!Promise<void>}
     */
    async sendHatsFeedbackResponse(action, addProp = [], eventEntries = new Map()) {
        if (this.optedIn()) {
            await this.sendMetricsInner(action, addProp, eventEntries);
        }
    }
    /**
     * @private
     * @param {string} action
     * @param {!Iterable<!Array<?>, ?, ?>=} metadata
     * @param {!Map<string, *>=} eventEntries
     * @param {(undefined|!Array<*>)=} args
     * @param {!Map<string, string>=} processingDetailsMetadata
     * @return {!Promise<void>}
     */
    async sendMetricsInner(action, metadata = [], eventEntries = new Map(), args, processingDetailsMetadata = new Map()) {
        // Ignore errors. Users are probably not interested.
        void this.checkSignIn().catch((/**
         * @return {void}
         */
        () => { }));
        // Because this is cast to `any`, you should be careful when using
        // as inputs for downstream functions.
        /** @type {?} */
        const event = {
            console_type: (0, utils_1.getConsoleType)(),
            event_name: action,
            event_metadata: (/** @type {!Array<!Object>} */ ([])),
        };
        // NOTE(pongad): Privacy implications on Session IDs are surprisingly
        // subtle. Disabling them for now until we get a good story.
        /** @type {(undefined|string)} */
        const email = await this.clientEmailCache?.get();
        if (email) {
            event['client_email'] = email;
            // event['client_session_id'] = this.emailSessionId;
        }
        else {
            const [installId__tsickle_destructured_1] = await this.installSessionId.get();
            const installId = /** @type {string} */ (installId__tsickle_destructured_1);
            event['client_install_id'] = installId;
            // event['client_session_id'] = sessionId;
            if (!installId) {
                event.event_metadata.push({
                    key: 'install_id_failure_cause',
                    value: this.installSessionId.errText,
                });
            }
        }
        /** @type {string} */
        const projectId = this.projectId(action);
        if (projectId) {
            event['project_id'] = projectId;
        }
        if ((0, utils_1.hasTestMetricsEnvironmentOverride)()
            || (process.env['CLOUDCODE_TEST'] && process.env['UI_TEST_NAME'])) {
            event['environment'] = 'TEST';
        }
        else if (this.env['NODE_ENV'] === 'development') {
            event['environment'] = 'DEV';
        }
        else {
            event['environment'] = 'PROD';
        }
        // Pass through gce_esv2_unique_id to concord for tracking when it is present
        if (this.env['GCE_ESV2_UNIQUE_ID']) {
            event['gce_esv2_unique_id'] = this.env['GCE_ESV2_UNIQUE_ID'];
        }
        // Pass through gce_resource_number to concord for tracking when it is present
        if (this.env['GCE_RESOURCE_NUMBER']) {
            event['gce_resource_number'] = this.env['GCE_RESOURCE_NUMBER'];
        }
        /** @type {string} */
        const runningOnCloudWorkstations = this.cloudWorkstationsEnv.runningOnCloudWorkstations().toString();
        /** @type {string} */
        const runningInCloudShellEditor = environment_1.CloudShellEnv.runningInCloudShellEditor(this.env).toString();
        eventEntries.forEach((/**
         * @param {*} v
         * @param {string} k
         * @return {*}
         */
        (v, k) => (event[k] = v)));
        /** @type {!Map<string, string>} */
        const fullMetadata = new Map([
            ...this.stickyMetadata,
            ...metadata,
            ['editor_version', (0, ide_utils_1.getIdeVersion)(this.code)],
            ['editor_name', (0, ide_utils_1.getIdeName)(this.code)],
            ['ext_name', this.extName],
            ['ext_version', this.extVersion],
            ['os_platform', this.platform],
            ['arch_platform', this.arch],
            ['os_release', this.platformVersion],
            ['change_list', constants_5.CHANGE_LIST],
            ['built_on', constants_5.BUILD_DATE],
            ['is_cloud_workstations', runningOnCloudWorkstations],
            ['is_cloud_shell', runningInCloudShellEditor],
        ]);
        processingDetailsMetadata.forEach((/**
         * @param {string} value
         * @param {string} key
         * @return {void}
         */
        (value, key) => {
            fullMetadata.set(`processing_details_metadata_${key}`, value);
        }));
        if (this.code.env.remoteName) {
            fullMetadata.set('remote_name', this.code.env.remoteName);
        }
        if (!fullMetadata.has(constants_5.ManagedDependenciesMetadataKey.DEPENDENCY_STATE)) {
            fullMetadata.set(constants_5.ManagedDependenciesMetadataKey.DEPENDENCY_STATE, this.currentDependencyStatus);
        }
        if (this.dependencyFailureReason && !fullMetadata.has(constants_5.ManagedDependenciesMetadataKey.DEPENDENCY_FAILURE_REASON)) {
            fullMetadata.set(constants_5.ManagedDependenciesMetadataKey.DEPENDENCY_FAILURE_REASON, this.dependencyFailureReason);
        }
        if (this.experimentationService?.experimentOverrides?.isCodeAssistTeam) {
            fullMetadata.set('is_code_assist_team', 'true');
        }
        if (this.experimentationService?.experimentOverrides?.isSurfaceTeam) {
            fullMetadata.set('is_surface_team', 'true');
        }
        fullMetadata.forEach((/**
         * @param {string} v
         * @param {string} k
         * @return {void}
         */
        (v, k) => {
            if (v) {
                event['event_metadata'].push({ key: k, value: v });
            }
        }));
        /** @type {string} */
        const eventString = JSON.stringify(event);
        /** @type {({gws_experiment: !Array<number>}|!Array<?>)} */
        const exp = (0, utils_1.fixBuf)({ gws_experiment: this.experimentationService?.experimentIds ?? [] });
        /** @type {!Map<string, string>} */
        const eventData = new Map(Object.keys(event)
            .filter((/**
         * @param {string} k
         * @return {boolean}
         */
        k => k !== 'event_name' && k !== 'event_metadata'))
            .map((/**
         * @param {string} k
         * @return {!Array<?>}
         */
        k => [k, `${event[k]}`])));
        this.eventEmitter.fire({ time: Date.now(), metadata: fullMetadata, eventData, action, args });
        this.events.push((0, utils_1.fixBuf)({
            event_time_ms: Date.now(),
            source_extension_json: eventString,
            exp,
        }));
        this.telemetryOutputChannel?.info('[' + event.event_name + ']: ' + eventString + '\nexperiments ==> ' + JSON.stringify(exp));
        this.filteredTelemetryOutputChannel?.appendEventString(eventString);
        if (this.isIntegrationTestMode()) {
            this.metricsIntegrationTestClient?.recordMetricForIntegrationTest(event.event_name, fullMetadata);
        }
    }
    /**
     * @private
     * @return {boolean}
     */
    retryMetricsUpload() {
        // TODO(b/367302144): launch in other modes once we get approvals
        return this.isDevMode();
    }
    // Visible for testing.
    /**
     * @public
     * @return {!Promise<(undefined|!tsickle_utils_29.LogResponse)>}
     */
    async flush() {
        if (this.events.length === 0) {
            return undefined;
        }
        /** @type {!Array<!Object>} */
        const eventsToFlush = [...this.events];
        /** @type {({client_info: ({client_type: string, desktop_client_info: ({os: string}|!Array<?>)}|!Array<?>), log_source_name: string, request_time_ms: number, log_event: !Array<!Object>}|!Array<?>)} */
        const request = (0, utils_1.fixBuf)({
            client_info: (0, utils_1.fixBuf)({
                client_type: 'DESKTOP',
                desktop_client_info: (0, utils_1.fixBuf)({ os: process.platform }),
            }),
            log_source_name: 'CONCORD',
            request_time_ms: Date.now(),
            log_event: eventsToFlush,
        });
        /** @type {string} */
        const body = JSON.stringify(request);
        this.events.splice(0);
        /** @type {function(number): !Promise<!tsickle_utils_29.LogResponse>} */
        const postWithRetry = (/**
         * @param {number} attempt
         * @return {!Promise<!tsickle_utils_29.LogResponse>}
         */
        async (attempt) => {
            try {
                return await this.poster.post(body);
            }
            catch (err) {
                if (this.retryMetricsUpload()) {
                    this.poster.writeToFile(body, this.extensionContext);
                }
                else if (attempt <= 3) {
                    /** @type {number} */
                    let delayMs = this.poster.defaultWait;
                    if (err instanceof gaxios_1.GaxiosError
                        && (/** @type {!tsickle_gaxios_2.GaxiosError<?>} */ (err)).response?.headers['retry-after']) {
                        /** @type {?} */
                        const retryAfter = (/** @type {!tsickle_gaxios_2.GaxiosError<?>} */ (err)).response.headers['retry-after'];
                        /** @type {number} */
                        const retryAfterSeconds = Number(retryAfter);
                        if (!isNaN(retryAfterSeconds)) {
                            delayMs = retryAfterSeconds * 1000;
                        }
                        else {
                            /** @type {number} */
                            const retryAfterDate = Date.parse(retryAfter);
                            if (!isNaN(retryAfterDate)) {
                                delayMs = Math.max(0, retryAfterDate - Date.now());
                            }
                        }
                    }
                    await new Promise((/**
                     * @param {function(*): void} resolve
                     * @return {?}
                     */
                    resolve => setTimeout(resolve, delayMs)));
                    return postWithRetry(attempt + 1);
                }
                else {
                    // Re-insert the events if all retries failed and disk retry is
                    // disabled. We put them at the front of the queue to maintain some
                    // ordering, though absolute ordering is difficult with asynchronous
                    // flushing.
                    this.events.unshift(...eventsToFlush);
                }
                throw err;
            }
        });
        return postWithRetry(1);
    }
    /**
     * @public
     * @return {!tsickle_vscode_7.Disposable}
     */
    flushPeriodically() {
        /** @type {boolean} */
        let stop = false;
        ((/**
         * @return {!Promise<void>}
         */
        async () => {
            while (!stop) {
                /** @type {number} */
                const waitMs = await this.flush()
                    .catch((/**
                 * @param {?} e
                 * @return {void}
                 */
                (e) => {
                    this.telemetryOutputChannel?.appendLine(`Error writing metrics: ${e}`);
                    this.filteredTelemetryOutputChannel?.appendLine(`Error writing metrics: ${e}`);
                }))
                    .then((/**
                 * @param {(undefined|void|!tsickle_utils_29.LogResponse)} respOrUndef
                 * @return {!tsickle_utils_29.LogResponse}
                 */
                respOrUndef => respOrUndef || {}))
                    .then((/**
                 * @param {!tsickle_utils_29.LogResponse} resp
                 * @return {number}
                 */
                resp => resp.nextRequestWaitMs || this.poster.defaultWait));
                await new Promise((/**
                 * @param {function(*): void} resolve
                 * @return {?}
                 */
                resolve => setTimeout(resolve, waitMs)));
            }
        }))().catch((/**
         * @return {void}
         */
        () => { }));
        return new this.code.Disposable((/**
         * @return {void}
         */
        () => {
            stop = true;
            this.flush().catch((/**
             * @param {?} e
             * @return {void}
             */
            (e) => {
                this.telemetryOutputChannel?.appendLine(`Error writing metrics: ${e}`);
                this.filteredTelemetryOutputChannel?.appendLine(`Error writing metrics: ${e}`);
            }));
        }));
    }
    /**
     * @public
     * @return {!tsickle_vscode_7.Disposable}
     */
    retryPeriodically() {
        if (!this.retryMetricsUpload()) {
            return new this.code.Disposable((/**
             * @return {void}
             */
            () => { }));
        }
        /** @type {boolean} */
        let stop = false;
        /** @type {number} */
        let attempt = 0;
        ((/**
         * @return {!Promise<void>}
         */
        async () => {
            while (!stop) {
                attempt = await this.poster.sendMetricsFromDisk(attempt, this.extensionContext);
                await new Promise((/**
                 * @param {function(*): void} resolve
                 * @return {?}
                 */
                resolve => setTimeout(resolve, attempt * attempt * time_utils_1.MINUTE)));
            }
        }))().catch((/**
         * @return {void}
         */
        () => { }));
        return new this.code.Disposable((/**
         * @return {void}
         */
        () => {
            stop = true;
            this.poster.sendMetricsFromDisk(attempt, this.extensionContext).catch((/**
             * @param {?} e
             * @return {void}
             */
            (e) => {
                this.telemetryOutputChannel?.appendLine(`Error sending metrics: ${e}`);
            }));
        }));
    }
    /**
     * Sends a signinEvent when we detect that user signs into Cloud SDK.
     * We use this so that we don't double-count users.
     *
     * Visible for testing.
     * @public
     * @return {!Promise<void>}
     */
    async checkSignIn() {
        // If the email cache is not yet initialized, assume we're not yet signed in
        /** @type {boolean} */
        const signedIn = !!(await this.clientEmailCache?.get());
        /** @type {boolean} */
        const sendEvent = !this.signedIn && signedIn;
        this.signedIn = signedIn;
        if (sendEvent) {
            const [installId__tsickle_destructured_2] = await this.installSessionId.get();
            const installId = /** @type {string} */ (installId__tsickle_destructured_2);
            /** @type {number} */
            const now = Date.now();
            /** @type {{event_time_ms: number, source_extension_json: string}} */
            const event = {
                event_time_ms: now,
                source_extension_json: JSON.stringify({
                    console_type: (0, utils_1.getConsoleType)(),
                    event_name: 'signinEvent',
                    client_install_id: installId,
                }),
            };
            if (utils_1.USE_FIRELOG) {
                // The aligning metrics doc between VSCode and IntelliJ specify that
                // we should use time_stamp field.
                ((/** @type {?} */ (event))).time_stamp = now;
            }
            this.events.push((0, utils_1.fixBuf)(event));
        }
    }
    /**
     * Retrieves the site name of the extension from the package.json file.
     *
     * @public
     * @return {string}
     */
    getSiteName() {
        /** @type {?} */
        const name = this.extensionContext.extension.packageJSON.displayName;
        if (!name) {
            throw new Error('displayName is undefined in package.json');
        }
        return name;
    }
    /**
     * @public
     * @return {!tsickle_vscode_7.Disposable}
     */
    watchWipeout() {
        /** @type {!tsickle_vscode_7.Disposable} */
        const configDisposable = this.code.workspace.onDidChangeConfiguration((/**
         * @param {!tsickle_vscode_7.ConfigurationChangeEvent} event
         * @return {!Promise<void>}
         */
        event => this.processWipeoutConfigChange(event)));
        // NOTE(pongad): We normally wouldn't care too much if a metric goes missing
        // sometimes. However, sending the wipeout metrics has privacy implications,
        // so we need to make sure we don't drop this.
        /** @type {number} */
        const interval = 1000 * 60 * 10;
        // 10 minutes
        const intervalId = setInterval((/**
         * @return {!Promise<void>}
         */
        () => this.ensureWipeout()), interval);
        /** @type {!tsickle_vscode_7.Disposable} */
        const intervalDisposable = new this.code.Disposable((/**
         * @return {void}
         */
        () => clearInterval(intervalId)));
        return this.code.Disposable.from(configDisposable, intervalDisposable);
    }
    // Visible for testing.
    /**
     * @public
     * @return {!Promise<void>}
     */
    ensureWipeout() {
        return this.lock.acquire('ensureWipeout', (/**
         * @return {!Promise<void>}
         */
        async () => {
            /** @type {!Array<string>} */
            const wipeoutIds = this.memento.get(this.mementoKeyProvider.getKey(constants_4.SharedMementoKey.WIPEOUT), []);
            if (!wipeoutIds.length) {
                return;
            }
            /** @type {string} */
            const body = (0, utils_1.wipeoutBody)(wipeoutIds);
            try {
                await this.poster.post(body);
                await this.memento.update(this.mementoKeyProvider.getKey(constants_4.SharedMementoKey.WIPEOUT), []);
            }
            catch {
                // Ignore errors. We'll keep trying until we successfully send
                // the wipeout.
            }
        }));
    }
    /**
     * @private
     * @param {!tsickle_vscode_7.ConfigurationChangeEvent} event
     * @return {!Promise<void>}
     */
    async processWipeoutConfigChange(event) {
        if (!this.isLocalTelemetryConfigurationAffected(event)) {
            return;
        }
        if (this.optedIn()) {
            return;
        }
        // User turned off telemetry. So we send a metric requesting a
        // wipeout.
        const [installId__tsickle_destructured_3] = await this.installSessionId.get();
        const installId = /** @type {string} */ (installId__tsickle_destructured_3);
        /** @type {!Array<string>} */
        const wipeoutIds = this.memento.get(this.mementoKeyProvider.getKey(constants_4.SharedMementoKey.WIPEOUT), []);
        wipeoutIds.push(installId);
        await this.memento.update(this.mementoKeyProvider.getKey(constants_4.SharedMementoKey.WIPEOUT), wipeoutIds);
        await this.ensureWipeout();
        await this.installSessionId.reset();
        // We reset signedIn, so that when we run checkSignedIn() the next
        // time it can report the Install ID.
        this.signedIn = false;
    }
    /**
     * @private
     * @return {boolean}
     */
    isDevMode() {
        return this.extensionContext.extensionMode === vscode.ExtensionMode.Development;
    }
    /**
     * @private
     * @return {boolean}
     */
    isIntegrationTestMode() {
        return process.env['CLOUD_CODE_IS_INTEGRATION_TEST'] === 'true';
    }
    /**
     * Checks if telemetry configuration was modified on ConfigurationChangeEvent
     * @private
     * @param {!tsickle_vscode_7.ConfigurationChangeEvent} event
     * @return {boolean}
     */
    isLocalTelemetryConfigurationAffected(event) {
        return event.affectsConfiguration(this.metricsOptInConfigId);
    }
    /**
     * @public
     * @param {(!tsickle_constants_23.AntigravityMetadataKey|!tsickle_constants_23.ApigeeMetadataKey|!tsickle_constants_23.ApiMetadataKey|!tsickle_constants_23.AuthMetadataKey|!tsickle_constants_23.CloudRunMetadataKey|!tsickle_constants_23.CommonMetadataKey|!tsickle_constants_23.ComputeMetadataKey|!tsickle_constants_23.ContextSourceMetadataKey|!tsickle_constants_23.CustomSlashCommandMetadataKey|!tsickle_constants_23.CrashFeedbackMetadataKey|!tsickle_constants_23.DataCloudMetadataKey|!tsickle_constants_23.DeploymentManagerMetadataKey|!tsickle_constants_23.DuetMetadataKey|!tsickle_constants_23.DuetMetadataV2Key|!tsickle_constants_23.ErrorStackMetadataKey|!tsickle_constants_23.ExperimentMetadataKey|!tsickle_constants_23.FunctionsMetadataKey|!tsickle_constants_23.HatsFeedbackMetadataKey|!tsickle_constants_23.KubernetesMetadataKey|!tsickle_constants_23.LogsViewerMetadataKey|!tsickle_constants_23.LookerVSCodeMetadataKey|!tsickle_constants_23.ManagedDependenciesMetadataKey|!tsickle_constants_23.MinikubeMetadataKey|!tsickle_constants_23.ProjectManagerMetadataKey|!tsickle_constants_23.SecretMetadataKey|!tsickle_constants_23.SkaffoldMetadataKey|!tsickle_constants_23.TreeExplorerMetadataKey|!tsickle_constants_23.UpdateManagerMetadataKey|!tsickle_constants_23.UpgradeMetadataKey|!tsickle_constants_23.WebviewMetadataKey|!tsickle_constants_23.OnboardingMetadataKey|!tsickle_constants_23.StructuredCodeEditsMetadataKey|!tsickle_constants_23.ExclusionFilesMetadataKey|!tsickle_constants_23.InlineDiffSettingMetadataKey|!tsickle_constants_23.CampaignNotificationMetadataKey)} key
     * @param {(undefined|string)} value
     * @return {void}
     */
    setMetadataForAllEvents(key, value) {
        this.stickyMetadata.delete(key);
        if (value) {
            this.stickyMetadata.set(key, value);
        }
    }
}
exports.Metrics = Metrics;
/* istanbul ignore if */
if (false) {
    /**
     * @const {!AsyncLock}
     * @private
     */
    Metrics.prototype.lock;
    /**
     * @const {!tsickle_install_session_id_24.InstallSessionId}
     * @private
     */
    Metrics.prototype.installSessionId;
    /**
     * @const {!Map<string, !Promise<void>>}
     * @public
     */
    Metrics.prototype.pendingMetrics;
    /**
     * @const {!tsickle_cloudworkstations_8.CloudWorkstationsEnvironment}
     * @private
     */
    Metrics.prototype.cloudWorkstationsEnv;
    /**
     * @type {!tsickle_constants_15.DependencyStatus}
     * @private
     */
    Metrics.prototype.currentDependencyStatus;
    /**
     * @type {!Array<function(): void>}
     * @private
     */
    Metrics.prototype.statusUpdateSubscribers;
    /**
     * @type {boolean}
     * @private
     */
    Metrics.prototype.signedIn;
    /**
     * @type {!tsickle_config_helper_12.ConfigHelper<boolean>}
     * @private
     */
    Metrics.prototype.debugOutput;
    /**
     * @const {string}
     * @public
     */
    Metrics.prototype.emailSessionId;
    /**
     * @type {(undefined|string)}
     * @private
     */
    Metrics.prototype.dependencyFailureReason;
    /**
     * @const {!Array<!Object>}
     * @private
     */
    Metrics.prototype.events;
    /**
     * @type {!Map<(!tsickle_constants_23.AntigravityMetadataKey|!tsickle_constants_23.ApigeeMetadataKey|!tsickle_constants_23.ApiMetadataKey|!tsickle_constants_23.AuthMetadataKey|!tsickle_constants_23.CloudRunMetadataKey|!tsickle_constants_23.CommonMetadataKey|!tsickle_constants_23.ComputeMetadataKey|!tsickle_constants_23.ContextSourceMetadataKey|!tsickle_constants_23.CustomSlashCommandMetadataKey|!tsickle_constants_23.CrashFeedbackMetadataKey|!tsickle_constants_23.DataCloudMetadataKey|!tsickle_constants_23.DeploymentManagerMetadataKey|!tsickle_constants_23.DuetMetadataKey|!tsickle_constants_23.DuetMetadataV2Key|!tsickle_constants_23.ErrorStackMetadataKey|!tsickle_constants_23.ExperimentMetadataKey|!tsickle_constants_23.FunctionsMetadataKey|!tsickle_constants_23.HatsFeedbackMetadataKey|!tsickle_constants_23.KubernetesMetadataKey|!tsickle_constants_23.LogsViewerMetadataKey|!tsickle_constants_23.LookerVSCodeMetadataKey|!tsickle_constants_23.ManagedDependenciesMetadataKey|!tsickle_constants_23.MinikubeMetadataKey|!tsickle_constants_23.ProjectManagerMetadataKey|!tsickle_constants_23.SecretMetadataKey|!tsickle_constants_23.SkaffoldMetadataKey|!tsickle_constants_23.TreeExplorerMetadataKey|!tsickle_constants_23.UpdateManagerMetadataKey|!tsickle_constants_23.UpgradeMetadataKey|!tsickle_constants_23.WebviewMetadataKey|!tsickle_constants_23.OnboardingMetadataKey|!tsickle_constants_23.StructuredCodeEditsMetadataKey|!tsickle_constants_23.ExclusionFilesMetadataKey|!tsickle_constants_23.InlineDiffSettingMetadataKey|!tsickle_constants_23.CampaignNotificationMetadataKey), string>}
     * @private
     */
    Metrics.prototype.stickyMetadata;
    /**
     * @type {(undefined|!ClientEmailCacheInterface)}
     * @public
     */
    Metrics.prototype.clientEmailCache;
    /**
     * @type {(undefined|!tsickle_vscode_7.LogOutputChannel)}
     * @public
     */
    Metrics.prototype.telemetryOutputChannel;
    /**
     * @type {(undefined|!tsickle_metrics_debug_output_26.MetricsDebugOutput)}
     * @public
     */
    Metrics.prototype.filteredTelemetryOutputChannel;
    /**
     * @type {(undefined|!tsickle_types_14.ExperimentationServiceInterface)}
     * @public
     */
    Metrics.prototype.experimentationService;
    /**
     * @type {(undefined|!tsickle_metrics_int_test_client_27.MetricsIntegrationTestClient)}
     * @public
     */
    Metrics.prototype.metricsIntegrationTestClient;
    /**
     * @const {?}
     * @private
     */
    Metrics.prototype.code;
    /**
     * @const {string}
     * @private
     */
    Metrics.prototype.extName;
    /**
     * @const {string}
     * @private
     */
    Metrics.prototype.extVersion;
    /**
     * @const {!tsickle_vscode_7.ExtensionContext}
     * @private
     */
    Metrics.prototype.extensionContext;
    /**
     * @const {!tsickle_vscode_7.Memento}
     * @private
     */
    Metrics.prototype.memento;
    /**
     * @const {!tsickle_metrics_proxy_28.MetricsProxy}
     * @private
     */
    Metrics.prototype.metricsProxy;
    /**
     * @const {!tsickle_utils_29.Poster}
     * @private
     */
    Metrics.prototype.poster;
    /**
     * @const {!tsickle_memento_key_provider_18.SharedPackageMementoKeyProvider}
     * @private
     */
    Metrics.prototype.mementoKeyProvider;
    /**
     * @const {string}
     * @private
     */
    Metrics.prototype.metricsOptInConfigId;
    /**
     * @const {!tsickle_config_enforcement_manager_11.ConfigEnforcementManager}
     * @private
     */
    Metrics.prototype.configEnforcementManager;
    /**
     * @const {string}
     * @private
     */
    Metrics.prototype.platform;
    /**
     * @const {string}
     * @private
     */
    Metrics.prototype.arch;
    /**
     * @const {string}
     * @private
     */
    Metrics.prototype.platformVersion;
    /**
     * @const {?}
     * @private
     */
    Metrics.prototype.env;
    /**
     * @const {function(): number}
     * @private
     */
    Metrics.prototype.now;
    /**
     * @const {!tsickle_vscode_7.EventEmitter<!MetricLoggedEvent>}
     * @public
     */
    Metrics.prototype.eventEmitter;
}
/**
 * Runs a function that calls googleapis and reports metrics on the run and the failure reason (status code text) on failure
 * @template T
 * @param {function(): !Promise<T>} fn
 * @param {!Metrics} metricsClient
 * @param {string} eventName
 * @param {!tsickle_metrics_meta_25.MetricsMeta=} meta
 * @param {(undefined|function(T, !tsickle_metrics_meta_25.MetricsMeta): void)=} modifyMeta
 * @return {!Promise<T>}
 */
async function reportMetricsForClientCall(fn, metricsClient, eventName, meta = new metrics_meta_1.MetricsMeta(''), modifyMeta) {
    try {
        /** @type {?} */
        const result = await fn();
        if (modifyMeta) {
            modifyMeta(result, meta);
        }
        void metricsClient.sendMetrics(eventName, meta).catch((/**
         * @return {void}
         */
        () => { }));
        return result;
    }
    catch (e) {
        /** @type {!tsickle_gaxios_2.GaxiosError<?>} */
        const gaxiosError = (/** @type {!tsickle_gaxios_2.GaxiosError<?>} */ (e));
        meta.failureReason = gaxiosError.response?.statusText;
        void metricsClient.sendMetrics(eventName, meta).catch((/**
         * @return {void}
         */
        () => { }));
        throw e;
    }
}
exports.reportMetricsForClientCall = reportMetricsForClientCall;
