/**
 * @fileoverview added by tsickle
 * Generated from: cloud/developer_experience/antigravity_extensions/vscode/auto_save_notice.ts
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
goog.module('google3.cloud.developer_experience.antigravity_extensions.vscode.auto_save_notice');
var module = module || { id: 'cloud/developer_experience/antigravity_extensions/vscode/auto_save_notice.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_vscode_1 = goog.requireType("vscode");
const tsickle_deferred_renderer_switch_2 = goog.requireType("google3.cloud.developer_experience.antigravity_extensions.vscode.deferred_renderer_switch");
const vscode = goog.require('vscode'); // from //third_party/javascript/typings/vscode
/**
 * Set once the user picks "Don't Show Again".
 * @type {string}
 */
const AUTO_SAVE_NOTICE_DISMISSED_KEY = 'antigravity.autoSaveInlineNotice.dismissed';
/**
 * The notice text.
 * @type {string}
 */
const AUTO_SAVE_NOTICE_MESSAGE = 'Inline diffs work best with Auto Save off. Turn off Auto Save, or switch to side-by-side diffs.';
/**
 * Button that turns off `files.autoSave`.
 * @type {string}
 */
const TURN_OFF_AUTO_SAVE = 'Turn Off Auto Save';
/**
 * Button that switches to side-by-side diffs.
 * @type {string}
 */
const USE_SIDE_BY_SIDE = 'Use Side-by-Side';
/**
 * Button that stops the notice for good.
 * @type {string}
 */
const DONT_SHOW_AGAIN = "Don't Show Again";
/**
 * Shown when the switch waits for the open inline reviews.
 * @type {string}
 */
const SIDE_BY_SIDE_LATER_MESSAGE = 'Side-by-side diffs will be used once the open inline reviews are done.';
/**
 * Suggests turning off Auto Save or using side-by-side diffs when an inline
 * review starts with Auto Save on. Shown at most once per window.
 */
class AutoSaveNotice {
    /**
     * @public
     * @param {!tsickle_vscode_1.Memento} globalState
     */
    constructor(globalState) {
        this.globalState = globalState;
        this.shown = false;
    }
    /**
     * @public
     * @param {!tsickle_deferred_renderer_switch_2.InlineReviews} reviews
     * @return {!Promise<void>}
     */
    async maybeShow(reviews) {
        if (this.shown ||
            this.globalState.get(AUTO_SAVE_NOTICE_DISMISSED_KEY)) {
            return;
        }
        /** @type {(undefined|!tsickle_vscode_1.TextDocument)} */
        const scope = activeScope();
        if (autoSaveOf(scope) === 'off')
            return;
        this.shown = true;
        /** @type {(undefined|string)} */
        const choice = await vscode.window.showInformationMessage(AUTO_SAVE_NOTICE_MESSAGE, TURN_OFF_AUTO_SAVE, USE_SIDE_BY_SIDE, DONT_SHOW_AGAIN);
        if (choice === TURN_OFF_AUTO_SAVE) {
            await turnOffAutoSave(scope);
        }
        else if (choice === USE_SIDE_BY_SIDE) {
            // The switch itself waits for the open reviews (see extension.ts).
            await vscode.workspace
                .getConfiguration('antigravity')
                .update('enableInlineDiff', false, vscode.ConfigurationTarget.Global);
            if (reviews.hasActiveDiffs()) {
                void vscode.window.showInformationMessage(SIDE_BY_SIDE_LATER_MESSAGE);
            }
        }
        else if (choice === DONT_SHOW_AGAIN) {
            await this.globalState.update(AUTO_SAVE_NOTICE_DISMISSED_KEY, true);
        }
    }
}
exports.AutoSaveNotice = AutoSaveNotice;
/* istanbul ignore if */
if (false) {
    /**
     * @type {boolean}
     * @private
     */
    AutoSaveNotice.prototype.shown;
    /**
     * @const {!tsickle_vscode_1.Memento}
     * @private
     */
    AutoSaveNotice.prototype.globalState;
}
/**
 * The active document, so language-specific settings apply.
 * @return {(undefined|!tsickle_vscode_1.TextDocument)}
 */
function activeScope() {
    return vscode.window.activeTextEditor?.document;
}
/**
 * @param {(undefined|!tsickle_vscode_1.TextDocument)} scope
 * @return {string}
 */
function autoSaveOf(scope) {
    return vscode.workspace
        .getConfiguration('files', scope)
        .get('autoSave', 'off');
}
/**
 * Turns Auto Save off where it was turned on.
 * @param {(undefined|!tsickle_vscode_1.TextDocument)} scope
 * @return {!Promise<void>}
 */
async function turnOffAutoSave(scope) {
    /** @type {!tsickle_vscode_1.WorkspaceConfiguration} */
    const files = vscode.workspace.getConfiguration('files', scope);
    /** @type {(undefined|{key: string, defaultValue: (undefined|string), globalValue: (undefined|string), workspaceValue: (undefined|string), workspaceFolderValue: (undefined|string), defaultLanguageValue: (undefined|string), globalLanguageValue: (undefined|string), workspaceLanguageValue: (undefined|string), workspaceFolderLanguageValue: (undefined|string), languageIds: (undefined|!Array<string>)})} */
    const inspected = files.inspect('autoSave');
    /** @type {function((undefined|string)): boolean} */
    const isOn = (/**
     * @param {(undefined|string)} value
     * @return {boolean}
     */
    (value) => value !== undefined && value !== 'off');
    /** @type {!tsickle_vscode_1.ConfigurationTarget} */
    const target = isOn(inspected?.workspaceFolderValue)
        ? vscode.ConfigurationTarget.WorkspaceFolder
        : isOn(inspected?.workspaceValue)
            ? vscode.ConfigurationTarget.Workspace
            : vscode.ConfigurationTarget.Global;
    await files.update('autoSave', 'off', target);
    // Still on, e.g. from a language override: let the user turn it off.
    if (autoSaveOf(scope) !== 'off') {
        await vscode.commands.executeCommand('workbench.action.openSettings', 'files.autoSave');
    }
}
/** @type {{AUTO_SAVE_NOTICE_DISMISSED_KEY: string, AUTO_SAVE_NOTICE_MESSAGE: string, TURN_OFF_AUTO_SAVE: string, USE_SIDE_BY_SIDE: string, DONT_SHOW_AGAIN: string, SIDE_BY_SIDE_LATER_MESSAGE: string}} */
exports.TEST_ONLY = {
    AUTO_SAVE_NOTICE_DISMISSED_KEY,
    AUTO_SAVE_NOTICE_MESSAGE,
    TURN_OFF_AUTO_SAVE,
    USE_SIDE_BY_SIDE,
    DONT_SHOW_AGAIN,
    SIDE_BY_SIDE_LATER_MESSAGE,
};
