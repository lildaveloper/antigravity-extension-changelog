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
const tsickle_hunk_storage_5 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.hunk_storage");
const tsickle_inline_diff_manager_6 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.inline_diff_manager");
const tsickle_utils_7 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.utils");
const tsickle_inline_diff_change_range_8 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.inline_diff_change_range");
const vscode = goog.require('vscode');
const diff_helper_1 = goog.require('google3.devtools.cider.extensions.jetski.diff_zones.diff_helper');
const hunk_storage_1 = goog.require('google3.devtools.cider.extensions.jetski.diff_zones.hunk_storage');
const inline_diff_manager_1 = goog.require('google3.devtools.cider.extensions.jetski.diff_zones.inline_diff_manager');
const utils_1 = goog.require('google3.devtools.cider.extensions.jetski.diff_zones.utils');
/**
 * Implementation of DiffZoneRenderer using inline decorations and CodeLenses in standard VS Code.
 * @implements {tsickle_diff_zone_renderer_4.DiffZoneRenderer}
 */
class InlineDiffZoneRenderer {
    /**
     * @public
     * @param {!tsickle_inline_diff_manager_6.InlineDiffManager=} inlineDiffManager
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
     * @param {function(string): (undefined|!tsickle_hunk_storage_5.HunkResolutionAction)} _getStoredResolution
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
        // Compute hashes for all diff hunks so AgentEditManager can track hunk resolutions.
        /** @type {!Array<string>} */
        const hunkHashes = hunkInfos.map((/**
         * @param {!tsickle_diff_zone_renderer_4.DiffHunkInfo} h
         * @return {string}
         */
        (h) => (0, hunk_storage_1.computeHunkHash)(h.insertions, h.deletions)));
        // Listen for hunk resolutions from InlineDiffManager
        /** @type {!tsickle_vscode_1.Disposable} */
        const resolveSub = this.inlineDiffManager.onDidResolveHunk((/**
         * @param {{uri: !tsickle_vscode_1.Uri, hunkIndex: number, accept: boolean, hunkHash: string}} event
         * @return {!Promise<void>}
         */
        async (event) => {
            /** @type {string} */
            const normalizedEventUri = (0, utils_1.normalizeUri)(event.uri.toString());
            /** @type {string} */
            const normalizedTargetUri = (0, utils_1.normalizeUri)(uri.toString());
            if (normalizedEventUri === normalizedTargetUri) {
                await onHunkResolved({
                    fileUri: event.uri.toString(),
                    hunkIndex: event.hunkIndex,
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
            /** @type {string} */
            const normalizedEventUri = (0, utils_1.normalizeUri)(event.uri.toString());
            /** @type {string} */
            const normalizedTargetUri = (0, utils_1.normalizeUri)(uri.toString());
            if (normalizedEventUri === normalizedTargetUri) {
                await onHunkResolved({
                    fileUri: event.uri.toString(),
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
            hunkHashes,
        };
    }
    /**
     * @public
     * @param {!tsickle_vscode_1.Uri} _uri
     * @param {!tsickle_vscode_1.NotebookDocument} _document
     * @param {!tsickle_agent_edit_manager_2.AddAgentEditMessage} _message
     * @param {function(string): (undefined|!tsickle_hunk_storage_5.HunkResolutionAction)} _getStoredResolution
     * @param {function(!tsickle_diff_zone_renderer_4.HunkResolutionEvent): !Promise<void>} _onHunkResolved
     * @return {!Promise<!tsickle_diff_zone_renderer_4.RenderNotebookEditResult>}
     */
    async renderNotebookEdit(_uri, _document, _message, _getStoredResolution, _onHunkResolved) {
        console.warn('[Jetski] Inline diff view for notebooks is not supported.');
        return { added: false, fullyResolved: false, hunks: [] };
    }
    /**
     * Focuses and reveals a targeted hunk range based on index or relative direction ('next' | 'previous').
     * @public
     * @param {string} fileUri
     * @param {(number|string)} target
     * @return {void}
     */
    focusHunk(fileUri, target) {
        /** @type {string} */
        const normalizedUri = (0, utils_1.normalizeUri)(fileUri);
        /** @type {(undefined|!tsickle_vscode_1.TextEditor)} */
        const editor = (0, utils_1.findEditorForUri)(normalizedUri);
        if (!editor)
            return;
        /** @type {(undefined|!tsickle_inline_diff_manager_6.ActiveDiff)} */
        const activeDiff = this.inlineDiffManager.getActiveDiff(normalizedUri);
        if (!activeDiff || activeDiff.changes.ranges.length === 0)
            return;
        /** @type {number} */
        let targetIndex = 0;
        if (typeof target === 'number') {
            targetIndex = Math.max(0, Math.min(target, activeDiff.changes.ranges.length - 1));
        }
        else {
            // Relative navigation based on current active cursor line position.
            /** @type {number} */
            const cursorLine = editor.selection.active.line;
            if (target === 'next') {
                /** @type {number} */
                const found = activeDiff.changes.ranges.findIndex((/**
                 * @param {!tsickle_inline_diff_change_range_8.InlineDiffChangeRange} r
                 * @return {(undefined|boolean)}
                 */
                (r) => {
                    /** @type {(undefined|!tsickle_vscode_1.Range)} */
                    const range = r.additionRange ?? r.deletionRange;
                    return range && range.start.line > cursorLine;
                }));
                targetIndex = found !== -1 ? found : 0;
            }
            else if (target === 'previous') {
                /** @type {number} */
                let found = -1;
                for (let i = activeDiff.changes.ranges.length - 1; i >= 0; i--) {
                    /** @type {(undefined|!tsickle_vscode_1.Range)} */
                    const range = activeDiff.changes.ranges[i].additionRange ??
                        activeDiff.changes.ranges[i].deletionRange;
                    if (range && range.start.line < cursorLine) {
                        found = i;
                        break;
                    }
                }
                targetIndex =
                    found !== -1 ? found : activeDiff.changes.ranges.length - 1;
            }
        }
        /** @type {!tsickle_inline_diff_change_range_8.InlineDiffChangeRange} */
        const targetChange = activeDiff.changes.ranges[targetIndex];
        /** @type {(undefined|!tsickle_vscode_1.Range)} */
        const targetRange = targetChange.additionRange ?? targetChange.deletionRange;
        if (targetRange) {
            editor.revealRange(targetRange, vscode.TextEditorRevealType.InCenter);
            editor.selection = new vscode.Selection(targetRange.start, targetRange.start);
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
     * @return {!Promise<void>}
     */
    async acceptFocusedHunk(fileUri) {
        /** @type {string} */
        const normalizedUri = (0, utils_1.normalizeUri)(fileUri);
        /** @type {(undefined|!tsickle_vscode_1.TextEditor)} */
        const editor = (0, utils_1.findEditorForUri)(normalizedUri);
        /** @type {(undefined|!tsickle_inline_diff_manager_6.ActiveDiff)} */
        const activeDiff = this.inlineDiffManager.getActiveDiff(normalizedUri);
        if (!activeDiff || activeDiff.changes.ranges.length === 0)
            return;
        /** @type {number} */
        let targetIndex = 0;
        if (editor) {
            /** @type {number} */
            const cursorLine = editor.selection.active.line;
            /** @type {number} */
            const found = activeDiff.changes.ranges.findIndex((/**
             * @param {!tsickle_inline_diff_change_range_8.InlineDiffChangeRange} r
             * @return {(undefined|boolean)}
             */
            (r) => {
                /** @type {(undefined|!tsickle_vscode_1.Range)} */
                const range = r.additionRange ?? r.deletionRange;
                return (range &&
                    cursorLine >= range.start.line &&
                    cursorLine <= range.end.line);
            }));
            if (found !== -1) {
                targetIndex = found;
            }
        }
        await this.inlineDiffManager.acceptHunk(normalizedUri, targetIndex);
    }
    /**
     * @public
     * @param {string} fileUri
     * @return {!Promise<void>}
     */
    async rejectFocusedHunk(fileUri) {
        /** @type {string} */
        const normalizedUri = (0, utils_1.normalizeUri)(fileUri);
        /** @type {(undefined|!tsickle_vscode_1.TextEditor)} */
        const editor = (0, utils_1.findEditorForUri)(normalizedUri);
        /** @type {(undefined|!tsickle_inline_diff_manager_6.ActiveDiff)} */
        const activeDiff = this.inlineDiffManager.getActiveDiff(normalizedUri);
        if (!activeDiff || activeDiff.changes.ranges.length === 0)
            return;
        /** @type {number} */
        let targetIndex = 0;
        if (editor) {
            /** @type {number} */
            const cursorLine = editor.selection.active.line;
            /** @type {number} */
            const found = activeDiff.changes.ranges.findIndex((/**
             * @param {!tsickle_inline_diff_change_range_8.InlineDiffChangeRange} r
             * @return {(undefined|boolean)}
             */
            (r) => {
                /** @type {(undefined|!tsickle_vscode_1.Range)} */
                const range = r.additionRange ?? r.deletionRange;
                return (range &&
                    cursorLine >= range.start.line &&
                    cursorLine <= range.end.line);
            }));
            if (found !== -1) {
                targetIndex = found;
            }
        }
        await this.inlineDiffManager.rejectHunk(normalizedUri, targetIndex);
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
     * @const {!tsickle_inline_diff_manager_6.InlineDiffManager}
     * @private
     */
    InlineDiffZoneRenderer.prototype.inlineDiffManager;
}
