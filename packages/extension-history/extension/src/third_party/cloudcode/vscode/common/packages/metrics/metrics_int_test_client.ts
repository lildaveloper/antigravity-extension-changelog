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
 * Generated from: third_party/cloudcode/vscode/common/packages/metrics/metrics_int_test_client.ts
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
goog.module('google3.third_party.cloudcode.vscode.common.packages.metrics.metrics_int_test_client');
var module = module || { id: 'third_party/cloudcode/vscode/common/packages/metrics/metrics_int_test_client.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
/**
 * Handles storing metrics specifically used for the integration tests
 */
class MetricsIntegrationTestClient {
    constructor() {
        // Used for metrics validation in integration tests only
        this.metricsListForIntegrationTests = [];
    }
    /**
     * Adds an emitted metric to the metrics list to be used for validations in
     * the integration tests
     * @public
     * @param {string} eventName
     * @param {!Map<string, string>} eventMetadata
     * @return {void}
     */
    recordMetricForIntegrationTest(eventName, eventMetadata) {
        this.metricsListForIntegrationTests.push(new MetricWithMetadata(eventName, eventMetadata));
    }
    /**
     * Returns the current actual metrics list used for validations in the
     * integration tests. These should be cleared in between tests.
     * @public
     * @return {!Array<!MetricWithMetadata>}
     */
    get metricsForIntegrationTest() {
        return this.metricsListForIntegrationTests;
    }
    /**
     * Clears the metrics list used for validations in the integration tests. This
     * is called in between tests.
     * @public
     * @return {void}
     */
    clearMetricsForIntegrationTest() {
        this.metricsListForIntegrationTests = [];
    }
    /**
     * Returns a filtered version of the actual metrics list. All metrics with
     * event names that are not in `expected` are removed to avoid noise. All
     * metadata fields that exist in `actual` but do not exist in the metrics with
     * matching event names in `expected` are also removed, since we do not want
     * to require the user to add irrelevant metadata fields when creating a test.
     * @public
     * @param {!Array<!MetricWithMetadata>} expectedMetricsWithMetadata
     * @param {!Array<!MetricWithMetadata>} recordedMetrics
     * @return {!Array<!MetricWithMetadata>}
     */
    removeUnusedMetricsAndMetadataFromRecordedList(expectedMetricsWithMetadata, recordedMetrics) {
        return recordedMetrics
            .filter((/**
         * @param {!MetricWithMetadata} recordedMetric
         * @return {boolean}
         */
        (recordedMetric) => {
            // Filter metrics based on eventName
            return expectedMetricsWithMetadata.some((/**
             * @param {!MetricWithMetadata} it
             * @return {boolean}
             */
            it => it.eventName === recordedMetric.eventName));
        }))
            .map((/**
         * @param {!MetricWithMetadata} metricFilteredByEventName
         * @return {!MetricWithMetadata}
         */
        (metricFilteredByEventName) => {
            // Filter metadata within matching metrics
            /** @type {!Map<string, string>} */
            const filteredMetadata = new Map();
            for (const [key__tsickle_destructured_1, val__tsickle_destructured_2] of metricFilteredByEventName.eventMetadata.entries()) {
                const key = /** @type {string} */ (key__tsickle_destructured_1);
                const val = /** @type {string} */ (val__tsickle_destructured_2);
                if (expectedMetricsWithMetadata.some((/**
                 * @param {!MetricWithMetadata} expectedMetric
                 * @return {boolean}
                 */
                expectedMetric => expectedMetric.eventName === metricFilteredByEventName.eventName && expectedMetric.eventMetadata.has(key)))) {
                    filteredMetadata.set(key, val);
                }
            }
            return new MetricWithMetadata(metricFilteredByEventName.eventName, filteredMetadata);
        }));
    }
}
exports.MetricsIntegrationTestClient = MetricsIntegrationTestClient;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!Array<!MetricWithMetadata>}
     * @private
     */
    MetricsIntegrationTestClient.prototype.metricsListForIntegrationTests;
}
/**
 * Stores a simplified metric with its corresponding metadata map for testing
 */
class MetricWithMetadata {
    /**
     * @public
     * @param {string} eventName
     * @param {!Map<string, string>} eventMetadata
     */
    constructor(eventName, eventMetadata) {
        this.eventName = eventName;
        this.eventMetadata = eventMetadata;
    }
    /**
     * @public
     * @return {string}
     */
    toString() {
        return this.eventName + ' - ' + this.mapToStringSorted(this.eventMetadata);
    }
    /**
     * Converts the map entries into an array and sorts by key. Returns the output as a string.
     * @private
     * @param {!Map<string, string>} map
     * @return {string}
     */
    mapToStringSorted(map) {
        /** @type {!Array<string>} */
        const sortedKeys = Array.from(map.keys()).sort();
        /** @type {string} */
        let result = '{';
        for (const key of sortedKeys) {
            /** @type {(undefined|string)} */
            const value = map.get(key);
            result += `${key}: ${value}, `;
        }
        if (result.endsWith(', ')) {
            result = result.slice(0, -2);
        }
        result += '}';
        return result;
    }
}
exports.MetricWithMetadata = MetricWithMetadata;
/* istanbul ignore if */
if (false) {
    /**
     * @const {string}
     * @public
     */
    MetricWithMetadata.prototype.eventName;
    /**
     * @const {!Map<string, string>}
     * @public
     */
    MetricWithMetadata.prototype.eventMetadata;
}
