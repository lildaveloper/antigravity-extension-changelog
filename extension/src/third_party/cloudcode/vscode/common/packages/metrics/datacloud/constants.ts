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
 * Generated from: third_party/cloudcode/vscode/common/packages/metrics/datacloud/constants.ts
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
goog.module('google3.third_party.cloudcode.vscode.common.packages.metrics.datacloud.constants');
var module = module || { id: 'third_party/cloudcode/vscode/common/packages/metrics/datacloud/constants.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
/**
 * Metadata keys that are specific to Data Cloud
 * @enum {string}
 */
const DataCloudMetadataKey = {
    GCLOUD_PROPERTY: "gcloudProperty",
    VIEW_NAME: "datacloudViewName",
    // The UNIVERSAL_SEARCH_TRIGGER_SOURCE will be set to "Antigravity" for all
    // universal search events within Antigravity. This metadata key is to
    // distinguish between the events coming from the Antigravity and events from
    // other sources (like Pantheon) in the concord table.
    UNIVERSAL_SEARCH_TRIGGER_SOURCE: "searchTriggerSource",
    UNIVERSAL_SEARCH_RESOURCE_TYPE: "resourceType",
    UNIVERSAL_SEARCH_RESULT_RANK: "resultRank",
    UNIVERSAL_SEARCH_HAS_SYSTEMS_FILTER: "hasSystemsFilter",
    UNIVERSAL_SEARCH_HAS_PROJECTS_FILTER: "hasProjectsFilter",
    UNIVERSAL_SEARCH_HAS_LOCATION_FILTER: "hasLocationFilter",
    UNIVERSAL_SEARCH_HAS_TYPE_FILTER: "hasTypeFilter",
    UNIVERSAL_SEARCH_HAS_SUBTYPE_FILTER: "hasSubTypeFilter",
    UNIVERSAL_SEARCH_QUERY_WORD_COUNT: "searchQueryWordCount",
    UNIVERSAL_SEARCH_QUERY_OPERATOR_EQUAL_COUNT: "searchQueryOperatorEqualCount",
    // clang-format off
    // reason: long line and @stylistic/indent
    UNIVERSAL_SEARCH_QUERY_OPERATOR_INCLUDE_COUNT: "searchQueryOperatorIncludeCount",
    // clang-format on
    UNIVERSAL_SEARCH_FREE_TEXT_SEARCH_WORD_COUNT: "freeTextSearchWordCount",
    UNIVERSAL_SEARCH_ERROR_CODE: "errorCode",
    UNIVERSAL_SEARCH_RESULT_COUNT: "resultCount",
    // The UNIVERSAL_SEARCH_ENTRY_POINT represents the component within
    // Antigravity that the user initiated the search from.
    UNIVERSAL_SEARCH_ENTRY_POINT: "searchEntryPoint",
    UNIVERSAL_SEARCH_FILTER_TYPE_ADDED: "filterTypeAdded",
    UNIVERSAL_SEARCH_FILTER_TYPE_REMOVED: "filterTypeRemoved",
    SKILL_ID: "skill_id",
    INSTALL_LOCATION: "install_location",
    ENABLED: "enabled",
    REASON: "reason",
    WEBVIEW_ERROR: "webviewError",
    FILE_NAME: "file_name",
    OUTCOME: "outcome",
    // The identifier of the agent installation profile (e.g. 'antigravity-ide',
    // 'copilot') used during skill installation or configuration management
    // events.
    AGENT_ID: "agent_id",
    ERROR_TYPE: "error_type",
    STATUS: "status",
    TYPE: "type",
    PREVIOUS_STATUS: "previousStatus",
    ACTION: "action",
    MCP_SERVER_NAME: "mcpServerName",
    MCP_TOOL_NAME: "mcpToolName",
    MCP_ARGUMENT_KEYS: "mcpArgumentKeys",
    MCP_ARGUMENTS_SUMMARY: "mcpArgumentsSummary",
    SAVED_SETTING: "savedSetting",
    RESOURCE_ID: "resource_id",
    RESOURCE_TYPE: "resource_type",
    RESOURCE_COUNT: "resource_count",
    RESOURCE_TYPES: "resource_types",
    DB_TYPE: "dbType",
    SCHEMA_FIELD_COUNT: "schemaFieldCount",
    IS_DRY_RUN: "isDryRun",
    NOTEBOOK_TYPE: "notebook_type",
    NOTEBOOK_KERNEL_TYPE: "notebook_kernel_type",
    NOTEBOOK_IS_SAMPLE: "notebook_is_sample",
    NOTEBOOK_SAMPLE_URL: "notebook_sample_url",
    AUTH_STATUS_BAR_HAS_WARNINGS: "authStatusBarHasWarnings",
    AUTH_STATUS_BAR_ACCOUNT_MISMATCH: "authStatusBarAccountMismatch",
    CORRELATION_ID: "correlation_id",
    EXECUTE_CELL_TOOL_FOR_NOTEBOOK_MCP: "executeCellToolForNotebookMcp",
    EXECUTE_CELL_TOOL_CONSENT: "executeCellToolConsent",
    HAS_NODE_IN_SYSTEM_PATH: "has_node_in_system_path",
    // The name of the active agent running at runtime (e.g. 'gemini', 'copilot')
    // passed as an argument to the spawned background telemetry hook process.
    AGENT_RUNTIME: "agent_runtime",
    HOOK_INSTALL_SOURCE: "hook_install_source",
    // The number of nodes currently rendered or present in the BigQuery graph
    // view.
    GRAPH_NODE_COUNT: "graphNodeCount",
    // The number of edges currently rendered or present in the BigQuery graph
    // view.
    GRAPH_EDGE_COUNT: "graphEdgeCount",
    // The location in the UI where the event was triggered from (e.g. 'bq' or
    // 'kc').
    UI_LOCATION: "ui_location",
    // The type of zoom action performed on the graph (e.g. 'in', 'out').
    ZOOM_ACTION: "zoom_action",
    // The resulting zoom level percentage after the zoom action (e.g. '150').
    ZOOMED_TO: "zoomed_to",
    AUTH_METHOD: "authMethod",
};
exports.DataCloudMetadataKey = DataCloudMetadataKey;
/**
 * Metadata values that are specific to Data Cloud
 * @enum {string}
 */
const DataCloudMetadataValue = {
    NOTEBOOK_TYPE_BIGQUERY: "BigQuery",
    NOTEBOOK_TYPE_SPARK: "Spark",
    NOTEBOOK_KERNEL_TYPE_LOCAL: "Local",
    NOTEBOOK_KERNEL_TYPE_REMOTE: "Remote",
};
exports.DataCloudMetadataValue = DataCloudMetadataValue;
