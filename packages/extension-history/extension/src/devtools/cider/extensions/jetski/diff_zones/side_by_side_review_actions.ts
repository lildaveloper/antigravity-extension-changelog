/**
 * @fileoverview added by tsickle
 * Generated from: devtools/cider/extensions/jetski/diff_zones/side_by_side_review_actions.ts
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
goog.module('google3.devtools.cider.extensions.jetski.diff_zones.side_by_side_review_actions');
var module = module || { id: 'devtools/cider/extensions/jetski/diff_zones/side_by_side_review_actions.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_vscode_1 = goog.requireType("vscode");
const tsickle_agent_edit_manager_2 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.agent_edit_manager");
const vscode = goog.require('vscode'); // from //devtools/cider/extensions:vscode
/**
 * Context key: the active tab's file has a pending side-by-side review.
 * @type {string}
 */
exports.SIDE_BY_SIDE_REVIEW_PENDING_KEY = 'antigravity.sideBySideReviewPending';
/**
 * Accepts every change in the diff tab's file.
 * @type {string}
 */
exports.SIDE_BY_SIDE_ACCEPT_ALL_COMMAND = 'antigravity.sideBySide.acceptAll';
/**
 * Rejects every change in the diff tab's file.
 * @type {string}
 */
exports.SIDE_BY_SIDE_REJECT_ALL_COMMAND = 'antigravity.sideBySide.rejectAll';
/**
 * The file shown in the active tab; the right side for diff tabs.
 * @return {(undefined|!tsickle_vscode_1.Uri)}
 */
function activeTabFile() {
    /** @type {*} */
    const input = vscode.window.tabGroups?.activeTabGroup?.activeTab?.input;
    if (!input || typeof input !== 'object')
        return undefined;
    if ('modified' in input)
        return ((/** @type {!tsickle_vscode_1.TabInputTextDiff} */ (input))).modified;
    if ('uri' in input)
        return ((/** @type {!tsickle_vscode_1.TabInputText} */ (input))).uri;
    return undefined;
}
/**
 * Adds Accept All / Reject All buttons to the title bar of a pending
 * side-by-side review's tab. Only used by VS Code.
 * @param {!tsickle_agent_edit_manager_2.AgentEditManager} agentEditManager
 * @return {!tsickle_vscode_1.Disposable}
 */
function registerSideBySideReviewActions(agentEditManager) {
    /** @type {(undefined|boolean)} */
    let pending;
    /** @type {function(): void} */
    const updateContext = (/**
     * @return {void}
     */
    () => {
        /** @type {(undefined|!tsickle_vscode_1.Uri)} */
        const file = activeTabFile();
        /** @type {boolean} */
        const value = !!file && agentEditManager.hasPendingSideBySideReview(file.toString());
        if (value === pending)
            return;
        pending = value;
        void vscode.commands.executeCommand('setContext', exports.SIDE_BY_SIDE_REVIEW_PENDING_KEY, value);
    });
    /** @type {function(boolean, (undefined|!tsickle_vscode_1.Uri)=): !Promise<void>} */
    const resolve = (/**
     * @param {boolean} accept
     * @param {(undefined|!tsickle_vscode_1.Uri)=} uri
     * @return {!Promise<void>}
     */
    async (accept, uri) => {
        // The title bar passes the tab's file; the command palette passes nothing.
        /** @type {(undefined|!tsickle_vscode_1.Uri)} */
        const file = uri ?? activeTabFile();
        if (!file ||
            !agentEditManager.hasPendingSideBySideReview(file.toString())) {
            return;
        }
        await agentEditManager.handleResolveAllAgentEditsInFile(file.toString(), accept, 
        /* userAction= */ true);
    });
    /** @type {!tsickle_vscode_1.TabGroups} */
    const tabGroups = vscode.window.tabGroups;
    /** @type {!Array<!tsickle_vscode_1.Disposable>} */
    const disposables = [
        vscode.commands.registerCommand(exports.SIDE_BY_SIDE_ACCEPT_ALL_COMMAND, (/**
         * @param {?} uri
         * @return {!Promise<void>}
         */
        (uri) => resolve(true, uri))),
        vscode.commands.registerCommand(exports.SIDE_BY_SIDE_REJECT_ALL_COMMAND, (/**
         * @param {?} uri
         * @return {!Promise<void>}
         */
        (uri) => resolve(false, uri))),
        agentEditManager.onDidChangeDiffZones(updateContext),
        vscode.window.onDidChangeActiveTextEditor(updateContext),
        ...(tabGroups
            ? [
                tabGroups.onDidChangeTabs(updateContext),
                tabGroups.onDidChangeTabGroups(updateContext),
            ]
            : []),
    ];
    updateContext();
    return vscode.Disposable.from(...disposables);
}
exports.registerSideBySideReviewActions = registerSideBySideReviewActions;
