/**
 * @fileoverview added by tsickle
 * Generated from: devtools/cider/extensions/jetski/diff_zones/inline_diff_zone_renderer.ts
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
goog.module('google3.devtools.cider.extensions.jetski.diff_zones.inline_diff_zone_renderer');
var module = module || { id: 'devtools/cider/extensions/jetski/diff_zones/inline_diff_zone_renderer.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_vscode_1 = goog.requireType("vscode");
const tsickle_agent_edit_manager_2 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.agent_edit_manager");
const tsickle_diff_helper_3 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.diff_helper");
const tsickle_diff_zone_renderer_4 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.diff_zone_renderer");
const tsickle_inline_diff_manager_5 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.inline_diff_manager");
const tsickle_utils_6 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.utils");
const tsickle_hunk_storage_7 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.hunk_storage");
const tsickle_inline_diff_change_range_8 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.inline_diff_change_range");
const vscode = goog.require('vscode');
const diff_helper_1 = goog.require('google3.devtools.cider.extensions.jetski.diff_zones.diff_helper');
const inline_diff_manager_1 = goog.require('google3.devtools.cider.extensions.jetski.diff_zones.inline_diff_manager');
const utils_1 = goog.require('google3.devtools.cider.extensions.jetski.diff_zones.utils');
/**
 * Implementation of DiffZoneRenderer using inline decorations and CodeLenses in standard VS Code.
 * @implements {tsickle_diff_zone_renderer_4.DiffZoneRenderer}
 */
class InlineDiffZoneRenderer {
    /**
     * @public
     * @param {!tsickle_inline_diff_manager_5.InlineDiffManager=} inlineDiffManager
     */
    constructor(inlineDiffManager = new inline_diff_manager_1.InlineDiffManager()) {
        this.inlineDiffManager = inlineDiffManager;
        this.type = 'inline';
        this.subscriptions = [];
        this.subscriptions.push(this.inlineDiffManager);
    }
    /**
     * @public
     * @param {!tsickle_vscode_1.Uri} uri
     * @param {!tsickle_vscode_1.TextDocument} _doc
     * @param {!tsickle_agent_edit_manager_2.AddAgentEditMessage} message
     * @param {function(string): (undefined|!tsickle_hunk_storage_7.HunkResolutionAction)} _getStoredResolution
     * @param {function(!tsickle_diff_zone_renderer_4.HunkResolutionEvent): !Promise<void>} onHunkResolved
     * @return {!Promise<!tsickle_diff_zone_renderer_4.RenderTextEditResult>}
     */
    async renderTextEdit(uri, _doc, message, _getStoredResolution, onHunkResolved) {
        /** @type {string} */
        const originalContents = (/** @type {string} */ (message.originalContents));
        /** @type {string} */
        const modifiedContents = (/** @type {string} */ (message.modifiedContents));
        /** @type {!Array<!google3$third_party$javascript$typings$diff$index.Hunk>} */
        const diffHunks = (0, diff_helper_1.getDiffHunks)(originalContents, modifiedContents);
        /** @type {!Array<!tsickle_diff_zone_renderer_4.DiffHunkInfo>} */
        const hunkInfos = diffHunks.map((/**
         * @param {!google3$third_party$javascript$typings$diff$index.Hunk} hunk
         * @return {{startLine: number, insertions: !Array<string>, deletions: !Array<string>}}
         */
        (hunk) => ({
            startLine: hunk.oldStart,
            insertions: hunk.lines
                .filter((/**
             * @param {string} l
             * @return {boolean}
             */
            (l) => l.startsWith('+')))
                .map((/**
             * @param {string} l
             * @return {string}
             */
            (l) => l.substring(1))),
            deletions: hunk.lines
                .filter((/**
             * @param {string} l
             * @return {boolean}
             */
            (l) => l.startsWith('-')))
                .map((/**
             * @param {string} l
             * @return {string}
             */
            (l) => l.substring(1))),
        })));
        // Listen for hunk resolutions from InlineDiffManager
        /** @type {!tsickle_vscode_1.Disposable} */
        const resolveSub = this.inlineDiffManager.onDidResolveHunk((/**
         * @param {{uri: !tsickle_vscode_1.Uri, hunkIndex: number, accept: boolean, hunkHash: string}} event
         * @return {!Promise<void>}
         */
        async (event) => {
            if (event.uri.toString() === uri.toString()) {
                await onHunkResolved({
                    fileUri: event.uri.toString(),
                    hunkIndex: 0,
                    hunkHash: event.hunkHash,
                    accept: event.accept,
                    final: false,
                });
            }
        }));
        this.subscriptions.push(resolveSub);
        /** @type {!tsickle_vscode_1.Disposable} */
        const finalizeSub = this.inlineDiffManager.onDidFinalizeFile((/**
         * @param {{uri: !tsickle_vscode_1.Uri, accepted: boolean, modifiedText: string}} event
         * @return {!Promise<void>}
         */
        async (event) => {
            if (event.uri.toString() === uri.toString()) {
                await onHunkResolved({
                    fileUri: event.uri.toString(),
                    hunkIndex: 0,
                    accept: event.accepted,
                    final: true,
                });
            }
        }));
        this.subscriptions.push(finalizeSub);
        /** @type {boolean} */
        const success = await this.inlineDiffManager.registerDiff(uri, originalContents, modifiedContents);
        return {
            added: success,
            fullyResolved: false,
            hunks: hunkInfos,
        };
    }
    /**
     * @public
     * @param {!tsickle_vscode_1.Uri} _uri
     * @param {!tsickle_vscode_1.NotebookDocument} _document
     * @param {!tsickle_agent_edit_manager_2.AddAgentEditMessage} _message
     * @param {!Array<!tsickle_vscode_1.NotebookCellSnapshot>} _originalCells
     * @param {function(string): (undefined|!tsickle_hunk_storage_7.HunkResolutionAction)} _getStoredResolution
     * @param {function(!tsickle_diff_zone_renderer_4.HunkResolutionEvent): !Promise<void>} _onHunkResolved
     * @return {!Promise<!tsickle_diff_zone_renderer_4.RenderNotebookEditResult>}
     */
    async renderNotebookEdit(_uri, _document, _message, _originalCells, _getStoredResolution, _onHunkResolved) {
        console.warn('[Jetski] Inline diff view for notebooks is not supported.');
        return { added: false, fullyResolved: false, hunks: [] };
    }
    /**
     * @public
     * @param {string} fileUri
     * @param {(number|string)} _target
     * @return {void}
     */
    focusHunk(fileUri, _target) {
        /** @type {(undefined|!tsickle_vscode_1.TextEditor)} */
        const editor = vscode.window.activeTextEditor;
        if (!editor || editor.document.uri.toString() !== (0, utils_1.normalizeUri)(fileUri)) {
            return;
        }
        /** @type {(undefined|!tsickle_inline_diff_manager_5.ActiveDiff)} */
        const activeDiff = this.inlineDiffManager.getActiveDiff(fileUri);
        if (!activeDiff || activeDiff.changes.ranges.length === 0)
            return;
        /** @type {!tsickle_inline_diff_change_range_8.InlineDiffChangeRange} */
        const firstChange = activeDiff.changes.ranges[0];
        /** @type {(undefined|!tsickle_vscode_1.Range)} */
        const targetRange = firstChange.additionRange ?? firstChange.deletionRange;
        if (targetRange) {
            editor.revealRange(targetRange, vscode.TextEditorRevealType.InCenter);
        }
    }
    /**
     * @public
     * @param {string} fileUri
     * @return {void}
     */
    focusExistingZone(fileUri) {
        this.focusHunk(fileUri, 'next');
    }
    /**
     * @public
     * @param {string} fileUri
     * @param {boolean} accept
     * @return {!Promise<boolean>}
     */
    async closeDiffZone(fileUri, accept) {
        if (accept) {
            await this.inlineDiffManager.acceptAll(fileUri);
        }
        else {
            await this.inlineDiffManager.rejectAll(fileUri);
        }
        return true;
    }
    /**
     * @public
     * @return {!Promise<void>}
     */
    async disposeAll() {
        await this.inlineDiffManager.cleanUpAll();
    }
    /**
     * @public
     * @return {void}
     */
    dispose() {
        for (const sub of this.subscriptions) {
            sub.dispose();
        }
    }
}
exports.InlineDiffZoneRenderer = InlineDiffZoneRenderer;
/* istanbul ignore if */
if (false) {
    /**
     * @const {string}
     * @public
     */
    InlineDiffZoneRenderer.prototype.type;
    /**
     * @const {!Array<!tsickle_vscode_1.Disposable>}
     * @private
     */
    InlineDiffZoneRenderer.prototype.subscriptions;
    /**
     * @const {!tsickle_inline_diff_manager_5.InlineDiffManager}
     * @private
     */
    InlineDiffZoneRenderer.prototype.inlineDiffManager;
}
