/**
 * @fileoverview added by tsickle
 * Generated from: cloud/developer_experience/antigravity_extensions/vscode/telemetry_constants.ts
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
goog.module('google3.cloud.developer_experience.antigravity_extensions.vscode.telemetry_constants');
var module = module || { id: 'cloud/developer_experience/antigravity_extensions/vscode/telemetry_constants.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
/**
 * Configuration ID for telemetry opt-in in Antigravity.
 * @type {string}
 */
exports.METRICS_OPT_IN_CONFIG_ID = 'antigravity.enableTelemetry';
/**
 * Common event prefix for Antigravity VS Code extension telemetry.
 * @type {string}
 */
exports.EXTENSION_PREFIX = 'google.antigravity.vscode.extension';
/**
 * Known telemetry event names for Antigravity.
 * @enum {string}
 */
const AntigravityEvent = {
    EXTENSION_ACTIVATE: "google.antigravity.vscode.extension.activate",
    CONVERSATION_STARTED: "google.antigravity.vscode.extension.web.conversation_started",
    CHAT_MESSAGE_SENT: "google.antigravity.vscode.extension.web.chat_message_sent",
    SERVER_START: "google.antigravity.vscode.extension.server.start",
    SERVER_START_SUCCESS: "google.antigravity.vscode.extension.server.start_success",
    SERVER_START_FAILURE: "google.antigravity.vscode.extension.server.start_failure",
    SERVER_CRASH: "google.antigravity.vscode.extension.server.crash",
    WEBVIEW_CONNECT_URL: "google.antigravity.vscode.extension.web.connect_url",
    WEBVIEW_SETUP_ERROR: "google.antigravity.vscode.extension.web.setup_error",
};
exports.AntigravityEvent = AntigravityEvent;
