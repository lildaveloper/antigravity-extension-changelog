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
 * @type {{EXTENSION_ACTIVATE: string, CONVERSATION_STARTED: string, CHAT_MESSAGE_SENT: string, SERVER_START: string, SERVER_START_SUCCESS: string, SERVER_START_FAILURE: string, WEBVIEW_CONNECT_URL: string, WEBVIEW_SETUP_ERROR: string}}
 */
exports.AntigravityEvent = (/** @type {{EXTENSION_ACTIVATE: string, CONVERSATION_STARTED: string, CHAT_MESSAGE_SENT: string, SERVER_START: string, SERVER_START_SUCCESS: string, SERVER_START_FAILURE: string, WEBVIEW_CONNECT_URL: string, WEBVIEW_SETUP_ERROR: string}} */ ({
    EXTENSION_ACTIVATE: `${exports.EXTENSION_PREFIX}.activate`,
    CONVERSATION_STARTED: `${exports.EXTENSION_PREFIX}.web.conversation_started`,
    CHAT_MESSAGE_SENT: `${exports.EXTENSION_PREFIX}.web.chat_message_sent`,
    SERVER_START: `${exports.EXTENSION_PREFIX}.server.start`,
    SERVER_START_SUCCESS: `${exports.EXTENSION_PREFIX}.server.start_success`,
    SERVER_START_FAILURE: `${exports.EXTENSION_PREFIX}.server.start_failure`,
    WEBVIEW_CONNECT_URL: `${exports.EXTENSION_PREFIX}.web.connect_url`,
    WEBVIEW_SETUP_ERROR: `${exports.EXTENSION_PREFIX}.web.setup_error`,
}));
