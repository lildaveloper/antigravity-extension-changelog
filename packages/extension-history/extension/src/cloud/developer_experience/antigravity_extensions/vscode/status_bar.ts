/**
 * @fileoverview added by tsickle
 * Generated from: cloud/developer_experience/antigravity_extensions/vscode/status_bar.ts
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
goog.module('google3.cloud.developer_experience.antigravity_extensions.vscode.status_bar');
var module = module || { id: 'cloud/developer_experience/antigravity_extensions/vscode/status_bar.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_settings_editor_provider_1 = goog.requireType("google3.devtools.cider.extensions.jetski.settings_editor_provider");
const tsickle_vscode_2 = goog.requireType("vscode");
const tsickle_feedback_3 = goog.requireType("google3.cloud.developer_experience.antigravity_extensions.vscode.feedback");
const tsickle_server_manager_4 = goog.requireType("google3.cloud.developer_experience.antigravity_extensions.vscode.server_manager");
const settings_editor_provider_1 = goog.require('google3.devtools.cider.extensions.jetski.settings_editor_provider');
const vscode = goog.require('vscode'); // from //third_party/javascript/typings/vscode
// from //third_party/javascript/typings/vscode
const feedback_1 = goog.require('google3.cloud.developer_experience.antigravity_extensions.vscode.feedback');
const server_manager_1 = goog.require('google3.cloud.developer_experience.antigravity_extensions.vscode.server_manager');
/**
 * Opens the Antigravity Settings editor with an optional target screen.
 * @param {(undefined|string)=} targetScreen
 * @return {!Promise<void>}
 */
async function openAntigravitySettings(targetScreen) {
    /** @type {!URLSearchParams} */
    const queryParams = new URLSearchParams();
    if (targetScreen) {
        queryParams.set('targetScreen', targetScreen);
    }
    /** @type {string} */
    const queryString = queryParams.toString();
    /** @type {!tsickle_vscode_2.Uri} */
    const uri = vscode.Uri.parse(`${settings_editor_provider_1.SettingsEditorProvider.fileScheme}://global${queryString ? `?${queryString}` : ''}`);
    await vscode.commands.executeCommand('vscode.openWith', uri, settings_editor_provider_1.SettingsEditorProvider.viewType, { preview: false });
}
exports.openAntigravitySettings = openAntigravitySettings;
/**
 * Initializes and registers the Antigravity status bar item.
 * @param {!tsickle_vscode_2.ExtensionContext} context
 * @return {!tsickle_vscode_2.StatusBarItem}
 */
function registerAntigravityStatusBar(context) {
    /** @type {!tsickle_vscode_2.StatusBarItem} */
    const statusBarItem = vscode.window.createStatusBarItem('settings', vscode.StatusBarAlignment.Right, 100);
    statusBarItem.name = 'Antigravity Settings';
    statusBarItem.text = 'Antigravity - Settings';
    statusBarItem.tooltip = 'Open Antigravity Settings';
    statusBarItem.command = 'antigravity.openSettings';
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);
    context.subscriptions.push(vscode.commands.registerCommand('antigravity.openSettings', (/**
     * @param {(undefined|string)=} targetScreen
     * @return {!Promise<void>}
     */
    async (targetScreen) => {
        await openAntigravitySettings(targetScreen);
    })));
    context.subscriptions.push(vscode.commands.registerCommand('antigravity.feedback', (/**
     * @param {(undefined|!ProvideFeedbackOptions)=} options
     * @return {!Promise<void>}
     */
    async (options) => {
        await provideFeedback(context, undefined, options);
    })));
    return statusBarItem;
}
exports.registerAntigravityStatusBar = registerAntigravityStatusBar;
/**
 * Optional parameters for triggering the Provide Feedback command.
 * @record
 */
function ProvideFeedbackOptions() { }
exports.ProvideFeedbackOptions = ProvideFeedbackOptions;
/* istanbul ignore if */
if (false) {
    /**
     * @const {(undefined|boolean)}
     * @public
     */
    ProvideFeedbackOptions.prototype.skipHealthCheck;
    /**
     * @const {(undefined|string)}
     * @public
     */
    ProvideFeedbackOptions.prototype.detail;
    /**
     * @const {(undefined|string)}
     * @public
     */
    ProvideFeedbackOptions.prototype.title;
    /**
     * @const {(undefined|string)}
     * @public
     */
    ProvideFeedbackOptions.prototype.description;
}
/**
 * Opens the "Provide Feedback" experience, preferring the CLI-served feedback
 * screen when the backend is healthy and falling back to one-click feedback
 * submission otherwise (e.g. on CLI loading failure or backend crash).
 * @param {!tsickle_vscode_2.ExtensionContext} context
 * @param {!tsickle_server_manager_4.AntigravityServerManager=} serverManager
 * @param {(undefined|!ProvideFeedbackOptions)=} options
 * @return {!Promise<void>}
 */
async function provideFeedback(context, serverManager = server_manager_1.AntigravityServerManager.getInstance(), options) {
    if (!options?.skipHealthCheck) {
        /** @type {boolean} */
        let healthy = false;
        try {
            healthy = await serverManager.isServerHealthy();
        }
        catch {
            healthy = false;
        }
        if (healthy) {
            await openAntigravitySettings('Provide Feedback');
            return;
        }
    }
    /** @type {(undefined|string)} */
    const lastStartupError = serverManager.getLastStartupError?.();
    /** @type {(undefined|string)} */
    const detail = options?.detail ??
        options?.description ??
        (lastStartupError ? `CLI failed to load: ${lastStartupError}` : undefined);
    await (0, feedback_1.sendFeedback)(context, serverManager, detail ? { detail } : undefined);
}
exports.provideFeedback = provideFeedback;
