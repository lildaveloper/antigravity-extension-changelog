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
const tsickle_inline_diff_change_range_6 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.inline_diff_change_range");
const tsickle_inline_diff_manager_7 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.inline_diff_manager");
const tsickle_utils_8 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.utils");
const vscode = goog.require('vscode');
const diff_helper_1 = goog.require('google3.devtools.cider.extensions.jetski.diff_zones.diff_helper');
const hunk_storage_1 = goog.require('google3.devtools.cider.extensions.jetski.diff_zones.hunk_storage');
const inline_diff_manager_1 = goog.require('google3.devtools.cider.extensions.jetski.diff_zones.inline_diff_manager');
const utils_1 = goog.require('google3.devtools.cider.extensions.jetski.diff_zones.utils');
/**
 * Editor range of a change; removals hidden by an auto-save use their line.
 * @param {!tsickle_inline_diff_change_range_6.InlineDiffChangeRange} r
 * @return {!tsickle_vscode_1.Range}
 */
function changeRange(r) {
    return (r.additionRange ??
        r.deletionRange ??
        new vscode.Range(r.start, 0, r.start, 0));
}
/**
 * Inserted / deleted lines of each hunk, as hashed for stored resolutions.
 * @param {!Array<!google3$third_party$javascript$typings$diff$index.Hunk>} hunks
 * @return {!Array<!tsickle_diff_zone_renderer_4.DiffHunkInfo>}
 */
function toHunkInfos(hunks) {
    return hunks.map((/**
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
}
/**
 * Where `rejectedHunks` are in the read-only diff: their added lines on the
 * right, and, for hunks that only delete lines, those lines on the left.
 * @param {!Array<!google3$third_party$javascript$typings$diff$index.Hunk>} rejectedHunks
 * @return {!tsickle_diff_zone_renderer_4.RejectedChanges}
 */
function toRejectedChanges(rejectedHunks) {
    /** @type {!Array<!tsickle_diff_zone_renderer_4.LineRange>} */
    const modifiedRanges = [];
    /** @type {!Array<!tsickle_diff_zone_renderer_4.LineRange>} */
    const originalRanges = [];
    for (const hunk of rejectedHunks) {
        // jsdiff's starts are 1-based and point at the hunk's first line when it
        // has lines on that side.
        if (hunk.newLines > 0) {
            /** @type {number} */
            const startLine = hunk.newStart - 1;
            modifiedRanges.push({ startLine, endLine: startLine + hunk.newLines - 1 });
        }
        else if (hunk.oldLines > 0) {
            /** @type {number} */
            const startLine = hunk.oldStart - 1;
            originalRanges.push({ startLine, endLine: startLine + hunk.oldLines - 1 });
        }
    }
    return { modifiedRanges, originalRanges };
}
/**
 * Implementation of DiffZoneRenderer using inline decorations and CodeLenses in standard VS Code.
 * @implements {tsickle_diff_zone_renderer_4.DiffZoneRenderer}
 */
class InlineDiffZoneRenderer {
    /**
     * @public
     * @param {!tsickle_inline_diff_manager_7.InlineDiffManager=} inlineDiffManager
     */
    constructor(inlineDiffManager = new inline_diff_manager_1.InlineDiffManager()) {
        this.inlineDiffManager = inlineDiffManager;
        this.type = 'inline';
        this.subscriptions = [];
        this.fileSubscriptions = new Map();
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
        const hunkInfos = toHunkInfos(diffHunks);
        // Compute hashes for all diff hunks so AgentEditManager can track hunk resolutions.
        /** @type {!Array<string>} */
        const hunkHashes = hunkInfos.map((/**
         * @param {!tsickle_diff_zone_renderer_4.DiffHunkInfo} h
         * @return {string}
         */
        (h) => (0, hunk_storage_1.computeHunkHash)(h.insertions, h.deletions)));
        /** @type {string} */
        const normalizedTargetUri = (0, utils_1.normalizeUri)(uri.toString());
        this.clearFileSubscriptions(normalizedTargetUri);
        // Listen for hunk resolutions from InlineDiffManager
        /** @type {!tsickle_vscode_1.Disposable} */
        const resolveSub = this.inlineDiffManager.onDidResolveHunk((/**
         * @param {{uri: !tsickle_vscode_1.Uri, hunkIndex: number, accept: boolean, hunkHash: string}} event
         * @return {!Promise<void>}
         */
        async (event) => {
            /** @type {string} */
            const normalizedEventUri = (0, utils_1.normalizeUri)(event.uri.toString());
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
        /** @type {!tsickle_vscode_1.Disposable} */
        const finalizeSub = this.inlineDiffManager.onDidFinalizeFile((/**
         * @param {{uri: !tsickle_vscode_1.Uri, accepted: boolean, modifiedText: string}} event
         * @return {!Promise<void>}
         */
        async (event) => {
            /** @type {string} */
            const normalizedEventUri = (0, utils_1.normalizeUri)(event.uri.toString());
            if (normalizedEventUri === normalizedTargetUri) {
                await onHunkResolved({
                    fileUri: event.uri.toString(),
                    accept: event.accepted,
                    final: true,
                });
            }
        }));
        /** @type {!tsickle_vscode_1.Disposable} */
        const replaySub = this.inlineDiffManager.onDidReplayResolution((/**
         * @param {{uri: !tsickle_vscode_1.Uri, pendingHunkHashes: !Array<string>, accept: boolean}} event
         * @return {!Promise<void>}
         */
        async (event) => {
            if ((0, utils_1.normalizeUri)(event.uri.toString()) === normalizedTargetUri) {
                await onHunkResolved({
                    fileUri: event.uri.toString(),
                    accept: event.accept,
                    pendingHunkHashes: event.pendingHunkHashes,
                });
            }
        }));
        this.fileSubscriptions.set(normalizedTargetUri, [
            resolveSub,
            finalizeSub,
            replaySub,
        ]);
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
     * From the decisions saved for the hunks (b/548760759):
     * - all accepted: "Resolved: Accepted";
     * - all rejected: "Resolved: Rejected";
     * - mixed: "Resolved: X of Y accepted";
     * - no hunks, or any hunk without a saved decision (never reviewed,
     *   evicted, or resolved outside the inline review): undefined, since the
     *   outcome is unknown.
     * When any hunk was rejected, `rejectedChanges` says where those hunks are.
     * @public
     * @param {string} originalContents
     * @param {string} modifiedContents
     * @param {function(string): (undefined|!tsickle_hunk_storage_5.HunkResolutionAction)} getStoredResolution
     * @return {(undefined|!tsickle_diff_zone_renderer_4.ResolvedDiffView)}
     */
    getResolvedDiffView(originalContents, modifiedContents, getStoredResolution) {
        /** @type {!Array<!google3$third_party$javascript$typings$diff$index.Hunk>} */
        const hunks = (0, diff_helper_1.getDiffHunks)(originalContents, modifiedContents);
        /** @type {!Array<(undefined|!tsickle_hunk_storage_5.HunkResolutionAction)>} */
        const decisions = toHunkInfos(hunks).map((/**
         * @param {!tsickle_diff_zone_renderer_4.DiffHunkInfo} h
         * @return {(undefined|!tsickle_hunk_storage_5.HunkResolutionAction)}
         */
        (h) => getStoredResolution((0, hunk_storage_1.computeHunkHash)(h.insertions, h.deletions))));
        if (hunks.length === 0 || decisions.some((/**
         * @param {(undefined|!tsickle_hunk_storage_5.HunkResolutionAction)} d
         * @return {boolean}
         */
        (d) => d === undefined))) {
            return undefined;
        }
        /** @type {!Array<!google3$third_party$javascript$typings$diff$index.Hunk>} */
        const rejectedHunks = hunks.filter((/**
         * @param {!google3$third_party$javascript$typings$diff$index.Hunk} _
         * @param {number} i
         * @return {boolean}
         */
        (_, i) => decisions[i] !== hunk_storage_1.HunkResolutionAction.ACCEPT));
        /** @type {number} */
        const acceptedCount = hunks.length - rejectedHunks.length;
        if (acceptedCount === hunks.length) {
            return { outcomeLabel: 'Resolved: Accepted' };
        }
        /** @type {!tsickle_diff_zone_renderer_4.RejectedChanges} */
        const rejectedChanges = toRejectedChanges(rejectedHunks);
        if (acceptedCount === 0) {
            return { outcomeLabel: 'Resolved: Rejected', rejectedChanges };
        }
        return {
            outcomeLabel: `Resolved: ${acceptedCount} of ${hunks.length} accepted`,
            rejectedChanges,
        };
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
        /** @type {(undefined|!tsickle_inline_diff_manager_7.ActiveDiff)} */
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
                 * @param {!tsickle_inline_diff_change_range_6.InlineDiffChangeRange} r
                 * @return {boolean}
                 */
                (r) => {
                    return changeRange(r).start.line > cursorLine;
                }));
                targetIndex = found !== -1 ? found : 0;
            }
            else if (target === 'previous') {
                /** @type {number} */
                let found = -1;
                for (let i = activeDiff.changes.ranges.length - 1; i >= 0; i--) {
                    if (changeRange(activeDiff.changes.ranges[i]).start.line < cursorLine) {
                        found = i;
                        break;
                    }
                }
                targetIndex =
                    found !== -1 ? found : activeDiff.changes.ranges.length - 1;
            }
        }
        /** @type {!tsickle_inline_diff_change_range_6.InlineDiffChangeRange} */
        const targetChange = activeDiff.changes.ranges[targetIndex];
        /** @type {!tsickle_vscode_1.Range} */
        const targetRange = changeRange(targetChange);
        editor.revealRange(targetRange, vscode.TextEditorRevealType.InCenter);
        editor.selection = new vscode.Selection(targetRange.start, targetRange.start);
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
        /** @type {(undefined|!tsickle_inline_diff_manager_7.ActiveDiff)} */
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
             * @param {!tsickle_inline_diff_change_range_6.InlineDiffChangeRange} r
             * @return {boolean}
             */
            (r) => {
                /** @type {!tsickle_vscode_1.Range} */
                const range = changeRange(r);
                return cursorLine >= range.start.line && cursorLine <= range.end.line;
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
        /** @type {(undefined|!tsickle_inline_diff_manager_7.ActiveDiff)} */
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
             * @param {!tsickle_inline_diff_change_range_6.InlineDiffChangeRange} r
             * @return {boolean}
             */
            (r) => {
                /** @type {!tsickle_vscode_1.Range} */
                const range = changeRange(r);
                return cursorLine >= range.start.line && cursorLine <= range.end.line;
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
     * @param {(undefined|{undoable: (undefined|boolean)})=} options
     * @return {!Promise<boolean>}
     */
    async closeDiffZone(fileUri, accept, options) {
        /** @type {boolean} */
        const undoable = options?.undoable === true;
        if (!undoable) {
            this.clearFileSubscriptions((0, utils_1.normalizeUri)(fileUri));
            if (accept) {
                await this.inlineDiffManager.acceptAll(fileUri);
            }
            else {
                await this.inlineDiffManager.rejectAll(fileUri);
            }
            return true;
        }
        // Keep listening so Ctrl+Z can reopen the review.
        if (accept) {
            await this.inlineDiffManager.acceptAll(fileUri, { undoable });
        }
        else {
            await this.inlineDiffManager.rejectAll(fileUri, { undoable });
        }
        return true;
    }
    /**
     * Disposes the diff session and subscriptions without touching disk.
     * @public
     * @param {string} fileUri
     * @return {!Promise<void>}
     */
    async disposeDiffZone(fileUri) {
        this.clearFileSubscriptions((0, utils_1.normalizeUri)(fileUri));
        await this.inlineDiffManager.disposeDiff(fileUri);
    }
    /**
     * @private
     * @param {string} normalizedUri
     * @return {void}
     */
    clearFileSubscriptions(normalizedUri) {
        for (const subscription of this.fileSubscriptions.get(normalizedUri) ??
            []) {
            subscription.dispose();
        }
        this.fileSubscriptions.delete(normalizedUri);
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
     * @param {string} fileUri
     * @return {boolean}
     */
    hasUserEditedZone(fileUri) {
        // A per-change Reject, like typing, is only in the buffer; the next turn
        // would read the rejected code from disk.
        return (this.inlineDiffManager.getActiveDiff(fileUri)?.hasUserEdits === true ||
            this.inlineDiffManager.hasUnsavedRejection(fileUri));
    }
    /**
     * @public
     * @return {void}
     */
    dispose() {
        this.disposeFileSubscriptions();
        for (const sub of this.subscriptions) {
            sub.dispose();
        }
        this.subscriptions.length = 0;
    }
    /**
     * @public
     * @return {void}
     */
    disposeForShutdown() {
        this.disposeFileSubscriptions();
        this.inlineDiffManager.disposeForShutdown();
        this.subscriptions.length = 0;
    }
    /**
     * @private
     * @return {void}
     */
    disposeFileSubscriptions() {
        for (const subs of this.fileSubscriptions.values()) {
            for (const sub of subs) {
                sub.dispose();
            }
        }
        this.fileSubscriptions.clear();
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
     * @const {!Map<string, !Array<!tsickle_vscode_1.Disposable>>}
     * @private
     */
    InlineDiffZoneRenderer.prototype.fileSubscriptions;
    /**
     * @const {!tsickle_inline_diff_manager_7.InlineDiffManager}
     * @private
     */
    InlineDiffZoneRenderer.prototype.inlineDiffManager;
}
