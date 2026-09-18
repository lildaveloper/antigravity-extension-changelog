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
const settings_editor_provider_1 = goog.require('google3.devtools.cider.extensions.jetski.settings_editor_provider');
const vscode = goog.require('vscode'); // from //third_party/javascript/typings/vscode
// from //third_party/javascript/typings/vscode
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
     * @return {!Promise<void>}
     */
    async () => {
        await openAntigravitySettings('Provide Feedback');
    })));
    return statusBarItem;
}
exports.registerAntigravityStatusBar = registerAntigravityStatusBar;
