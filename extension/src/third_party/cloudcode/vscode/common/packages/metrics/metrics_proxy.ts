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
 * Generated from: third_party/cloudcode/vscode/common/packages/metrics/metrics_proxy.ts
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
goog.module('google3.third_party.cloudcode.vscode.common.packages.metrics.metrics_proxy');
var module = module || { id: 'third_party/cloudcode/vscode/common/packages/metrics/metrics_proxy.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_events_1 = goog.requireType("google3.third_party.javascript.typings.node.node.events");
const tsickle_metrics_meta_2 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.metrics.metadata.metrics_meta");
const events_1 = goog.require('google3.third_party.javascript.typings.node.node.events');
/** @enum {string} */
const MetricEnum = {
    CLOUDSHELL_AUTHORIZE: "cloudcode.cloudshell.authorize.end",
};
exports.MetricEnum = MetricEnum;
/**
 * @record
 */
function Metric() { }
exports.Metric = Metric;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!MetricEnum}
     * @public
     */
    Metric.prototype.action;
    /**
     * @type {(undefined|!tsickle_metrics_meta_2.MetricsMeta)}
     * @public
     */
    Metric.prototype.addProp;
    /**
     * @type {(undefined|!Map<string, *>)}
     * @public
     */
    Metric.prototype.eventEntries;
}
/** @type {string} */
const METRICS_PROXY = 'METRICS_PROXY';
class MetricsProxy {
    constructor() {
        this.eventEmitter = new events_1.EventEmitter();
    }
    /**
     * @public
     * @param {!Metric} metric
     * @return {boolean}
     */
    sendMetrics(metric) {
        return this.eventEmitter.emit(METRICS_PROXY, metric);
    }
    /**
     * @public
     * @param {function(!Metric): void} listener
     * @return {!tsickle_events_1.EventEmitter}
     */
    listenForMetrics(listener) {
        return this.eventEmitter.on(METRICS_PROXY, listener);
    }
}
exports.MetricsProxy = MetricsProxy;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!tsickle_events_1.EventEmitter}
     * @public
     */
    MetricsProxy.prototype.eventEmitter;
}
