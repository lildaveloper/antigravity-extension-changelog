/**
 * @fileoverview added by tsickle
 * Generated from: devtools/cider/extensions/jetski/diff_zones/agent_edit_manager.ts
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
goog.module('google3.devtools.cider.extensions.jetski.diff_zones.agent_edit_manager');
var module = module || { id: 'devtools/cider/extensions/jetski/diff_zones/agent_edit_manager.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_cider_1 = goog.requireType("google3.devtools.cider.extensions.cider");
const tsickle_workspace_2 = goog.requireType("google3.devtools.cider.extensionutils.workspace");
const tsickle_vscode_3 = goog.requireType("vscode");
const tsickle_diff_helper_4 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.diff_helper");
const tsickle_diff_zone_renderer_5 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.diff_zone_renderer");
const tsickle_hunk_storage_6 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.hunk_storage");
const tsickle_utils_7 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.utils");
const cider_1 = goog.require('google3.devtools.cider.extensions.cider');
const workspace_1 = goog.require('google3.devtools.cider.extensionutils.workspace');
const vscode = goog.require('vscode'); // from //devtools/cider/extensions:vscode
// from //devtools/cider/extensions:vscode
const diff_helper_1 = goog.require('google3.devtools.cider.extensions.jetski.diff_zones.diff_helper');
const hunk_storage_1 = goog.require('google3.devtools.cider.extensions.jetski.diff_zones.hunk_storage');
const utils_1 = goog.require('google3.devtools.cider.extensions.jetski.diff_zones.utils');
const diff_zone_renderer_1 = goog.require('google3.devtools.cider.extensions.jetski.diff_zones.diff_zone_renderer');
exports.computeNotebookDiffStats = diff_zone_renderer_1.computeNotebookDiffStats;
exports.parseNotebookCells = diff_zone_renderer_1.parseNotebookCells;
/**
 * Shapes of messages received from the Jetski iframe.
 * @record
 */
function AddAgentEditMessage() { }
exports.AddAgentEditMessage = AddAgentEditMessage;
/* istanbul ignore if */
if (false) {
    /**
     * @type {(undefined|string)}
     * @public
     */
    AddAgentEditMessage.prototype.fileUri;
    /**
     * @type {(undefined|string)}
     * @public
     */
    AddAgentEditMessage.prototype.originalContents;
    /**
     * @type {(undefined|string)}
     * @public
     */
    AddAgentEditMessage.prototype.modifiedContents;
    /**
     * @type {(undefined|boolean)}
     * @public
     */
    AddAgentEditMessage.prototype.skipOpen;
    /**
     * @type {(undefined|number)}
     * @public
     */
    AddAgentEditMessage.prototype.turnIndex;
    /**
     * @type {(undefined|string)}
     * @public
     */
    AddAgentEditMessage.prototype.conversationId;
    /**
     * @type {(undefined|boolean)}
     * @public
     */
    AddAgentEditMessage.prototype.strictNav;
    /**
     * Open the file as a regular tab rather than a preview tab, so opening the
     * next file does not replace it. Set when opening every file of a turn.
     * @type {(undefined|boolean)}
     * @public
     */
    AddAgentEditMessage.prototype.keepOpen;
}
/**
 * Opens the read-only diff for a resolved edit. `preview` false opens it as a
 * regular tab rather than a preview tab. `outcomeLabel` (e.g.
 * "Resolved: Rejected", "Resolved: 2 of 3 accepted") describes the saved
 * decisions and is shown in the title; when absent the view is titled
 * "Resolved".
 * @typedef {function(string, string, string, (undefined|boolean)=, (undefined|string)=): !Promise<void>}
 */
exports.OpenStandardDiff;
/**
 * The rejected changes to mark in the read-only (Resolved) diff last opened
 * for a file.
 * @record
 * @extends {tsickle_diff_zone_renderer_5.RejectedChanges}
 */
function ResolvedDiffMarks() { }
exports.ResolvedDiffMarks = ResolvedDiffMarks;
/* istanbul ignore if */
if (false) {
    /**
     * The file URI the diff was opened with.
     * @type {string}
     * @public
     */
    ResolvedDiffMarks.prototype.fileUri;
    /**
     * The diff's title label, e.g. "Resolved: 2 of 3 accepted".
     * @type {string}
     * @public
     */
    ResolvedDiffMarks.prototype.outcomeLabel;
}
/**
 * Per-file diff state sent back to the iframe for the Changes Overview toolbar.
 * @record
 */
function FileAgentEditState() { }
exports.FileAgentEditState = FileAgentEditState;
/* istanbul ignore if */
if (false) {
    /**
     * @type {string}
     * @public
     */
    FileAgentEditState.prototype.uri;
    /**
     * @type {number}
     * @public
     */
    FileAgentEditState.prototype.numLinesInserted;
    /**
     * @type {number}
     * @public
     */
    FileAgentEditState.prototype.numLinesDeleted;
    /**
     * @type {boolean}
     * @public
     */
    FileAgentEditState.prototype.createdByCascade;
}
/**
 * Diff display mode configuration option for agent file edits.
 * @typedef {string}
 */
exports.DiffZoneType;
/**
 * @record
 */
function FileOpenOptions() { }
/* istanbul ignore if */
if (false) {
    /**
     * @type {boolean}
     * @public
     */
    FileOpenOptions.prototype.shouldOpen;
    /**
     * @type {boolean}
     * @public
     */
    FileOpenOptions.prototype.preview;
}
/**
 * Options for configuring AgentEditManager.
 * @record
 */
function AgentEditManagerOptions() { }
exports.AgentEditManagerOptions = AgentEditManagerOptions;
/* istanbul ignore if */
if (false) {
    /**
     * @type {(undefined|boolean)}
     * @public
     */
    AgentEditManagerOptions.prototype.autoAcceptOnChat;
    /**
     * @type {(undefined|number)}
     * @public
     */
    AgentEditManagerOptions.prototype.ageOutThreshold;
    /**
     * Inline only: Ctrl+Z can undo the user's Accept all / Reject all.
     * @type {(undefined|boolean)}
     * @public
     */
    AgentEditManagerOptions.prototype.undoableUserResolutions;
    /**
     * With the side-by-side renderer, opens the diff tab when a review starts
     * and when the file is opened (e.g. from the changes overview), counts
     * changed lines with a line diff, and remembers Accept / Reject so a
     * resolved file reopens as a read-only diff (an open review tab switches to
     * it when the user resolves the file). Like inline, sending a chat
     * message saves unsaved edits (accepting a review the user typed in), and
     * age-out is skipped while auto-accept-on-chat is on.
     * @type {(undefined|boolean)}
     * @public
     */
    AgentEditManagerOptions.prototype.openSideBySideDiffs;
    /**
     * Explicit navigation to a turn (clicking Review on it, or a file in the
     * review pane) that doesn't land on an open review opens a read-only diff
     * instead of building a new editable review, unless the turn's review was
     * still pending when last seen (recorded as a content snapshot) and the
     * file still holds that content. Pending reviews are recorded as such
     * snapshots (text files only), so they stay editable after a window reload.
     * See b/548760759.
     * @type {(undefined|boolean)}
     * @public
     */
    AgentEditManagerOptions.prototype.readOnlyNavigationWithoutOpenReview;
}
/**
 * Hunk hash under which a whole-file side-by-side resolution is stored.
 * @type {string}
 */
const SIDE_BY_SIDE_FILE_HASH = 'side-by-side-file';
/**
 * Workspace state key for inline reviews to restore after a reload.
 * @type {string}
 */
const PENDING_INLINE_EDITS_KEY = 'jetski.pendingInlineEdits';
/**
 * @param {string} normalizedUri
 * @param {(undefined|string)=} modifiedContents
 * @return {boolean}
 */
function hasUnsavedEdits(normalizedUri, modifiedContents) {
    return (vscode.workspace.textDocuments ?? []).some((/**
     * @param {!tsickle_vscode_3.TextDocument} doc
     * @return {boolean}
     */
    (doc) => doc.isDirty &&
        (0, utils_1.normalizeUri)(doc.uri.toString()) === normalizedUri &&
        (modifiedContents === undefined ||
            (0, utils_1.normalizeLineEndings)(doc.getText()) !==
                (0, utils_1.normalizeLineEndings)(modifiedContents))));
}
/**
 * Manages the lifecycle of interactive editor diff zones.
 * Tracks active diff zones, handles hunk resolution events, and manages cleaning them up.
 * @implements {tsickle_vscode_3.TextDocumentContentProvider}
 * @extends {tsickle_vscode_3.Disposable}
 */
class AgentEditManager {
    /**
     * @public
     * @param {!tsickle_vscode_3.ExtensionContext} context Extension context for state persistence.
     * @param {function(): (undefined|!tsickle_diff_zone_renderer_5.DiffZoneRenderer)} createDiffZoneRenderer Factory method returning the active DiffZoneRenderer strategy.
     * @param {(undefined|!AgentEditManagerOptions)=} options Options bucket for settings such as autoAcceptOnChat and ageOutThreshold.
     * @param {(undefined|function(string, string, string, (undefined|boolean)=, (undefined|string)=): !Promise<void>)=} openStandardDiff Optional callback for opening standard resolved diff views.
     */
    constructor(context, createDiffZoneRenderer, options, openStandardDiff) {
        this.createDiffZoneRenderer = createDiffZoneRenderer;
        this.openStandardDiff = openStandardDiff;
        this.activeDiffZoneDetails = new Map();
        /**
         * Prior-turn texts per URI; stale buffers aren't formatter edits.
         */
        this.priorTurnContents = new Map();
        /**
         * Per-file insertion/deletion counts.
         */
        this.fileDiffStats = new Map();
        this.onDidChangeDiffZonesEmitter = new vscode.EventEmitter();
        this.onDidChangeDiffZones = this.onDidChangeDiffZonesEmitter.event;
        /**
         * Rejected changes to mark in the read-only (Resolved) diff last opened for
         * each file, per normalized file URI. Only set when that diff has a
         * rejected change.
         */
        this.resolvedDiffMarks = new Map();
        this.onDidChangeResolvedDiffMarksEmitter = new vscode.EventEmitter();
        /**
         * Fires when a `getResolvedDiffMarks` result may have changed.
         */
        this.onDidChangeResolvedDiffMarks = this.onDidChangeResolvedDiffMarksEmitter.event;
        /**
         * Tracks files currently being processed. Maps file URI to a Promise that
         * resolves when processing completes. Concurrent callers wait for the
         * in-flight processing to finish instead of being silently dropped.
         */
        this.processingFiles = new Map();
        this.autoAcceptOnChat = false;
        this.ageOutThreshold = 5;
        /**
         * While restoring, skip persisting a partial list of reviews.
         */
        this.isRestoringPendingEdits = false;
        /**
         * Files being restored; their stored decisions are already applied.
         */
        this.restoringUris = new Set();
        this.hunkStorage = new hunk_storage_1.HunkStorage(context);
        this.workspaceState = context.workspaceState;
        this.autoAcceptOnChat = options?.autoAcceptOnChat ?? false;
        this.ageOutThreshold = options?.ageOutThreshold ?? 5;
        this.undoableUserResolutions = options?.undoableUserResolutions ?? false;
        this.openSideBySideDiffs = options?.openSideBySideDiffs ?? false;
        this.readOnlyNavigationWithoutOpenReview =
            options?.readOnlyNavigationWithoutOpenReview ?? false;
        this.updateDiffZoneRenderer();
        this.restoredPendingEdits = this.restorePendingInlineEdits();
    }
    /**
     * Disposes the renderer on shutdown, leaving files and saved reviews.
     * @public
     * @return {void}
     */
    dispose() {
        if (this.renderer?.disposeForShutdown) {
            this.renderer.disposeForShutdown();
        }
        else {
            this.renderer?.dispose();
        }
        this.activeDiffZoneDetails.clear();
        this.fileDiffStats.clear();
        this.resolvedDiffMarks.clear();
    }
    /**
     * Reopens inline reviews left pending by the previous window.
     * @private
     * @return {!Promise<void>}
     */
    async restorePendingInlineEdits() {
        /** @type {(undefined|!Array<!AddAgentEditMessage>)} */
        const pending = this.workspaceState?.get(PENDING_INLINE_EDITS_KEY);
        if (!pending?.length || this.renderer?.type !== 'inline')
            return;
        this.isRestoringPendingEdits = true;
        try {
            for (const edit of pending) {
                /** @type {(undefined|!AddAgentEditMessage)} */
                const restored = await this.getRestorableEdit(edit);
                if (!restored?.fileUri)
                    continue;
                /** @type {string} */
                const normalizedUri = (0, utils_1.normalizeUri)(restored.fileUri);
                this.restoringUris.add(normalizedUri);
                try {
                    await this.handleAddAgentEdit({ ...restored, skipOpen: true });
                }
                finally {
                    this.restoringUris.delete(normalizedUri);
                }
            }
        }
        catch (e) {
            console.error('[Jetski] Failed to restore pending inline reviews', e);
        }
        finally {
            this.isRestoringPendingEdits = false;
            this.persistPendingInlineEdits();
        }
    }
    /**
     * The edit to reopen, with decided changes applied, or undefined if the file
     * changed on disk meanwhile.
     * @private
     * @param {!AddAgentEditMessage} edit
     * @return {!Promise<(undefined|!AddAgentEditMessage)>}
     */
    async getRestorableEdit(edit) {
        const { fileUri, originalContents, modifiedContents } = edit;
        if (fileUri === undefined ||
            originalContents === undefined ||
            modifiedContents === undefined) {
            return undefined;
        }
        /** @type {!Array<string>} */
        const originalLines = originalContents === '' ? [] : originalContents.split(/\r?\n/);
        /** @type {!Array<string>} */
        const restoredOriginal = [];
        /** @type {!Array<string>} */
        const restoredModified = [];
        /** @type {number} */
        let next = 0;
        /** @type {number} */
        let decided = 0;
        /** @type {number} */
        let undecided = 0;
        /** @type {!Array<!google3$third_party$javascript$typings$diff$index.Hunk>} */
        const hunks = (0, diff_helper_1.getDiffHunks)(originalContents, modifiedContents).sort((/**
         * @param {!google3$third_party$javascript$typings$diff$index.Hunk} a
         * @param {!google3$third_party$javascript$typings$diff$index.Hunk} b
         * @return {number}
         */
        (a, b) => a.oldStart - b.oldStart));
        for (const hunk of hunks) {
            // With no context lines, a pure insertion's oldStart is the line before.
            /** @type {number} */
            const start = hunk.oldLines === 0 ? hunk.oldStart : hunk.oldStart - 1;
            /** @type {!Array<string>} */
            const unchanged = originalLines.slice(next, start);
            restoredOriginal.push(...unchanged);
            restoredModified.push(...unchanged);
            next = start + hunk.oldLines;
            /** @type {!Array<string>} */
            const lines = hunk.lines.filter((/**
             * @param {string} l
             * @return {boolean}
             */
            (l) => !l.startsWith('\\')));
            /** @type {!Array<string>} */
            const deletions = lines
                .filter((/**
             * @param {string} l
             * @return {boolean}
             */
            (l) => l.startsWith('-')))
                .map((/**
             * @param {string} l
             * @return {string}
             */
            (l) => l.substring(1)));
            /** @type {!Array<string>} */
            const insertions = lines
                .filter((/**
             * @param {string} l
             * @return {boolean}
             */
            (l) => l.startsWith('+')))
                .map((/**
             * @param {string} l
             * @return {string}
             */
            (l) => l.substring(1)));
            /** @type {(undefined|!tsickle_hunk_storage_6.HunkResolutionAction)} */
            const action = this.hunkStorage.getResolution(edit, (0, hunk_storage_1.computeHunkHash)(insertions, deletions));
            if (action === undefined)
                undecided++;
            else
                decided++;
            restoredOriginal.push(...(action === hunk_storage_1.HunkResolutionAction.ACCEPT ? insertions : deletions));
            restoredModified.push(...(action === hunk_storage_1.HunkResolutionAction.REJECT ? deletions : insertions));
        }
        if (decided > 0 && undecided === 0)
            return undefined;
        /** @type {!Array<string>} */
        const rest = originalLines.slice(next);
        restoredOriginal.push(...rest);
        restoredModified.push(...rest);
        /** @type {string} */
        const nextModified = decided === 0 ? modifiedContents : restoredModified.join('\n');
        if (vscode.workspace?.fs) {
            try {
                /** @type {!tsickle_vscode_3.Uri} */
                const uri = vscode.Uri.parse(fileUri);
                /** @type {string} */
                const disk = (0, utils_1.normalizeLineEndings)(new TextDecoder().decode(await vscode.workspace.fs.readFile(uri)));
                // Decisions reach disk when the review ends, or with Auto Save.
                if (disk !== (0, utils_1.normalizeLineEndings)(modifiedContents) &&
                    disk !== (0, utils_1.normalizeLineEndings)(nextModified)) {
                    return undefined;
                }
                // Keep disk in line with the review so its outside-change check holds.
                if (disk !== (0, utils_1.normalizeLineEndings)(nextModified)) {
                    await vscode.workspace.fs.writeFile(uri, new TextEncoder().encode(nextModified));
                }
            }
            catch {
                return undefined;
            }
        }
        if (decided === 0)
            return edit;
        return {
            ...edit,
            originalContents: restoredOriginal.join('\n'),
            modifiedContents: nextModified,
        };
    }
    /**
     * Saves the pending inline reviews so a new window can restore them.
     * @private
     * @return {void}
     */
    persistPendingInlineEdits() {
        if (this.isRestoringPendingEdits || !this.workspaceState)
            return;
        /** @type {!Array<!AddAgentEditMessage>} */
        const pending = [];
        if (this.renderer?.type === 'inline') {
            for (const [fileUri__tsickle_destructured_1, details__tsickle_destructured_2] of this.activeDiffZoneDetails) {
                const fileUri = /** @type {string} */ (fileUri__tsickle_destructured_1);
                const details = /** @type {{originalContents: string, modifiedContents: string, rawModifiedContents: (undefined|string), hunkHashes: (undefined|!Array<string>), conversationId: (undefined|string), turnIndex: (undefined|number)}} */ (details__tsickle_destructured_2);
                pending.push({
                    fileUri,
                    originalContents: details.originalContents,
                    modifiedContents: details.modifiedContents,
                    conversationId: details.conversationId,
                    turnIndex: details.turnIndex,
                });
            }
        }
        void Promise.resolve(this.workspaceState.update(PENDING_INLINE_EDITS_KEY, pending.length ? pending : undefined)).catch((/**
         * @param {*} e
         * @return {void}
         */
        (e) => {
            console.error('[Jetski] Failed to save pending inline reviews', e);
        }));
    }
    /**
     * @public
     * @param {function(string, string, string, (undefined|boolean)=, (undefined|string)=): !Promise<void>} openStandardDiff
     * @return {void}
     */
    setOpenStandardDiff(openStandardDiff) {
        this.openStandardDiff = openStandardDiff;
    }
    /**
     * @public
     * @param {boolean} autoAccept
     * @return {void}
     */
    setAutoAcceptOnChat(autoAccept) {
        this.autoAcceptOnChat = autoAccept;
    }
    /**
     * @public
     * @param {number} threshold
     * @return {void}
     */
    setAgeOutThreshold(threshold) {
        this.ageOutThreshold = threshold;
    }
    /**
     * Updates the active DiffZoneRenderer strategy if configuration has changed.
     * @public
     * @return {void}
     */
    updateDiffZoneRenderer() {
        /** @type {(undefined|!tsickle_diff_zone_renderer_5.DiffZoneRenderer)} */
        const newRenderer = this.createDiffZoneRenderer();
        if (newRenderer?.type !== this.renderer?.type) {
            this.renderer?.dispose();
            this.renderer = newRenderer;
        }
        else if (newRenderer && newRenderer !== this.renderer) {
            newRenderer.dispose();
        }
    }
    /**
     * @public
     * @return {string}
     */
    get diffZoneType() {
        return this.renderer?.type ?? 'disabled';
    }
    /**
     * Side-by-side renderer with `openSideBySideDiffs` (VS Code only).
     * @private
     * @return {boolean}
     */
    get isSideBySideReview() {
        return this.openSideBySideDiffs && this.renderer?.type === 'sideBySide';
    }
    /**
     * Clears stored hunk resolutions.
     * @public
     * @return {!Promise<void>}
     */
    async clearHunkStorage() {
        await this.hunkStorage.clear();
        if (this.resolvedDiffMarks.size > 0) {
            this.resolvedDiffMarks.clear();
            this.onDidChangeResolvedDiffMarksEmitter.fire();
        }
    }
    /**
     * The rejected changes to mark in the read-only diff last opened for
     * `fileUri`, if it has any. Opening a read-only diff for the file without
     * rejected changes forgets them.
     * @public
     * @param {string} fileUri
     * @return {(undefined|?)}
     */
    getResolvedDiffMarks(fileUri) {
        return this.resolvedDiffMarks.get((0, utils_1.normalizeUri)(fileUri));
    }
    /**
     * Remembers or (with `marks` undefined) forgets `fileUri`'s marks.
     * @private
     * @param {string} fileUri
     * @param {(undefined|!ResolvedDiffMarks)} marks
     * @return {void}
     */
    setResolvedDiffMarks(fileUri, marks) {
        /** @type {string} */
        const key = (0, utils_1.normalizeUri)(fileUri);
        if (marks) {
            this.resolvedDiffMarks.set(key, marks);
        }
        else if (!this.resolvedDiffMarks.delete(key)) {
            return;
        }
        this.onDidChangeResolvedDiffMarksEmitter.fire();
    }
    /**
     * Gets details (contents) for an active diff zone.
     * @public
     * @param {string} fileUri
     * @return {(undefined|{originalContents: string, modifiedContents: string})}
     */
    getDiffZoneDetails(fileUri) {
        /** @type {string} */
        const normalizedUri = (0, utils_1.normalizeUri)(fileUri);
        return this.activeDiffZoneDetails.get(normalizedUri);
    }
    /**
     * @public
     * @param {string} fileUri
     * @return {boolean}
     */
    hasUnresolvedHunks(fileUri) {
        /** @type {string} */
        const normalizedUri = (0, utils_1.normalizeUri)(fileUri);
        /** @type {(undefined|{originalContents: string, modifiedContents: string, rawModifiedContents: (undefined|string), hunkHashes: (undefined|!Array<string>), conversationId: (undefined|string), turnIndex: (undefined|number)})} */
        const details = this.activeDiffZoneDetails.get(normalizedUri);
        return !!(details?.hunkHashes && details.hunkHashes.length > 0);
    }
    /**
     * Provides original file contents for fallback diff views.
     * @public
     * @param {!tsickle_vscode_3.Uri} uri
     * @return {string}
     */
    provideTextDocumentContent(uri) {
        return this.renderer?.provideTextDocumentContent?.(uri) ?? '';
    }
    /**
     * Checks if the file's current content has diverged from both original and modified.
     *
     * "Diverged" means the buffer holds content this edit does not account for,
     * so rendering it as a diff zone would destroy work. Callers skip the edit
     * when this returns `true`.
     *
     * The cases that are *not* divergence, in the order checked below:
     * - the buffer still matches `originalContents` (the edit has not been
     *   applied) or already matches `modifiedContents` (it has). Either way the
     *   buffer is consistent with this edit. Note this also covers a creation
     *   edit against an empty buffer, since both sides are then `''`;
     * - the buffer matches the `modifiedContents` of a diff zone already active
     *   for this file, which happens when an edit is re-proposed while its zone
     *   is still open.
     * @private
     * @param {!tsickle_vscode_3.TextDocument} doc
     * @param {!AddAgentEditMessage} message
     * @return {boolean}
     */
    hasContentDiverged(doc, message) {
        /** @type {string} */
        const rawText = doc.getText();
        /** @type {string} */
        const currentContent = (0, utils_1.normalizeLineEndings)(rawText);
        /** @type {string} */
        const normalizedOriginal = (0, utils_1.normalizeLineEndings)(message.originalContents ?? '');
        /** @type {string} */
        const normalizedModified = (0, utils_1.normalizeLineEndings)(message.modifiedContents ?? '');
        if (currentContent === normalizedOriginal ||
            currentContent === normalizedModified) {
            return false;
        }
        if (message.fileUri) {
            /** @type {string} */
            const normalizedUri = (0, utils_1.normalizeUri)(message.fileUri);
            /** @type {(undefined|{originalContents: string, modifiedContents: string, rawModifiedContents: (undefined|string), hunkHashes: (undefined|!Array<string>), conversationId: (undefined|string), turnIndex: (undefined|number)})} */
            const existingDetails = this.activeDiffZoneDetails.get(normalizedUri);
            if (existingDetails?.modifiedContents !== undefined) {
                /** @type {string} */
                const normalizedExistingModified = (0, utils_1.normalizeLineEndings)(existingDetails.modifiedContents);
                if (currentContent === normalizedExistingModified) {
                    return false;
                }
            }
        }
        // NOTE: An edit that creates a file (empty `originalContents`) used to be
        // treated as never diverged. That let a replayed creation edit overwrite a
        // file the user has since written: the empty-original case is already
        // covered above, where an empty `currentContent` matches the empty
        // original. Reaching this point means the file has real content that is
        // neither the original nor the modified one. See b/561515185.
        return true;
    }
    /**
     * Proposes a new file edit using the configured DiffZoneRenderer strategy.
     * @public
     * @param {!AddAgentEditMessage} message
     * @return {!Promise<void>}
     */
    async handleAddAgentEdit(message) {
        if (!message.fileUri ||
            message.originalContents === undefined ||
            message.modifiedContents === undefined) {
            return;
        }
        if (!this.renderer || this.renderer.type === 'disabled') {
            if (message.strictNav === true && message.skipOpen !== true) {
                await this.handleFullyResolvedEdit(message);
            }
            return;
        }
        try {
            /** @type {string} */
            const normalizedUri = (0, utils_1.normalizeUri)(message.fileUri);
            if (message.turnIndex !== undefined) {
                // Inline only: skip the target file; its zone is recreated below.
                await this.handleResolveStaleAgentEdits(message.turnIndex, this.renderer?.type === 'inline' ? normalizedUri : undefined);
            }
            // Inline only: serialize globally, since inline edits share the buffer.
            /** @type {boolean} */
            const useGlobalLock = this.renderer?.type === 'inline';
            while ((useGlobalLock && this.globalProcessingLock) ||
                this.processingFiles.has(normalizedUri)) {
                await ((useGlobalLock ? this.globalProcessingLock : undefined) ??
                    this.processingFiles.get(normalizedUri));
            }
            const { promise, resolve } = Promise.withResolvers();
            this.processingFiles.set(normalizedUri, promise);
            if (useGlobalLock) {
                this.globalProcessingLock = promise;
            }
            try {
                /** @type {string} */
                const rawModifiedContents = message.modifiedContents;
                /** @type {string} */
                const normalizedModifiedContents = (0, utils_1.normalizeLineEndings)(message.modifiedContents);
                /** @type {boolean} */
                const hasExistingZoneWithSameContent = await this.handleExistingDiffZone(normalizedUri, normalizedModifiedContents, message.skipOpen, message.strictNav, message);
                if (hasExistingZoneWithSameContent) {
                    return;
                }
                // With `readOnlyNavigationWithoutOpenReview` (VS Code only): explicit
                // user navigation (strictNav: clicking Review on a turn, or a file in
                // the review pane) that did not land on an open review above must not
                // build a new editable Accept/Reject review.
                // Without an open review there may be no stored decision (HunkStorage
                // eviction, a turn never reviewed, or a trajectory-wide review-pane
                // message), yet the disk may already hold that turn's code
                // as committed work: a live review would let Reject revert it, and the
                // replacement below would record ACCEPT for, and dispose, a newer zone
                // of the same file. The only safe rebuild is switching back to a
                // conversation whose review was still open, which
                // `disposeAllDiffZones` records as a content snapshot. Anything else
                // gets a read-only diff that leaves disk and other zones untouched.
                // See b/548760759.
                if (this.readOnlyNavigationWithoutOpenReview &&
                    message.strictNav === true &&
                    !(await this.canRebuildReviewOnNavigation(normalizedUri, message))) {
                    console.info(`[Jetski] No open review to rebuild for ${message.fileUri}, showing read-only diff.`);
                    await this.handleFullyResolvedEdit(message);
                    return;
                }
                /** @type {(undefined|{originalContents: string, modifiedContents: string, rawModifiedContents: (undefined|string), hunkHashes: (undefined|!Array<string>), conversationId: (undefined|string), turnIndex: (undefined|number)})} */
                const existingDetails = this.activeDiffZoneDetails.get(normalizedUri);
                /** @type {boolean} */
                const isInlineRenderer = this.renderer?.type === 'inline';
                /** @type {boolean} */
                const isSameTurnStreaming = (isInlineRenderer || this.isSideBySideReview) &&
                    existingDetails !== undefined &&
                    ((message.turnIndex === undefined &&
                        existingDetails.turnIndex === undefined) ||
                        (message.turnIndex !== undefined &&
                            existingDetails.turnIndex !== undefined &&
                            message.turnIndex === existingDetails.turnIndex &&
                            message.conversationId === existingDetails.conversationId));
                // Inline only: a background message (skipOpen without strictNav) must
                // never close an open review just to show nothing. A proactive sync
                // sends such messages for every file of a turn (and older chat panels
                // also sent them on a Review click), so closing here dropped the file
                // from the changes overview and left the agent's text on disk, as if
                // the user had accepted it.
                if (isInlineRenderer &&
                    existingDetails !== undefined &&
                    message.skipOpen === true &&
                    message.strictNav !== true &&
                    (await this.shouldKeepOpenReview(normalizedUri, message, existingDetails, isSameTurnStreaming))) {
                    console.info(`[Jetski] Keeping the open review for ${message.fileUri}; a background edit does not replace it.`);
                    return;
                }
                if (existingDetails) {
                    // The outgoing review is no longer pending. For same-turn streaming
                    // the marker is re-recorded below with the new modified contents;
                    // leaving the stale one would make the snapshot check below treat
                    // the streamed update as an external change.
                    await this.clearPendingReviewSnapshot(normalizedUri, existingDetails);
                }
                if (existingDetails && !isInlineRenderer) {
                    // Non-inline: accept the outgoing zone as before.
                    await this.renderer.closeDiffZone(normalizedUri, true);
                    if (isSameTurnStreaming) {
                        // Keep reviewing the whole turn against its first baseline.
                        message = {
                            ...message,
                            originalContents: existingDetails.originalContents,
                        };
                    }
                    else if (this.isSideBySideReview) {
                        await this.hunkStorage.recordResolution({
                            conversationId: existingDetails.conversationId,
                            turnIndex: existingDetails.turnIndex,
                            fileUri: normalizedUri,
                        }, SIDE_BY_SIDE_FILE_HASH, hunk_storage_1.HunkResolutionAction.ACCEPT);
                    }
                }
                else if (existingDetails) {
                    this.recordPriorTurnContents(normalizedUri, existingDetails.originalContents, existingDetails.modifiedContents);
                    if (isSameTurnStreaming) {
                        message = {
                            ...message,
                            originalContents: existingDetails.originalContents,
                        };
                    }
                    else if (existingDetails.hunkHashes) {
                        for (const hash of existingDetails.hunkHashes) {
                            await this.hunkStorage.recordResolution({
                                conversationId: existingDetails.conversationId,
                                turnIndex: existingDetails.turnIndex,
                                fileUri: normalizedUri,
                            }, hash, hunk_storage_1.HunkResolutionAction.ACCEPT);
                        }
                    }
                    if (typeof this.renderer.disposeDiffZone === 'function') {
                        await this.renderer.disposeDiffZone(normalizedUri);
                    }
                    else {
                        await this.renderer.closeDiffZone(normalizedUri, true);
                    }
                }
                /** @type {!tsickle_vscode_3.Uri} */
                const uri = vscode.Uri.parse(normalizedUri);
                /** @type {function(!tsickle_diff_zone_renderer_5.HunkResolutionEvent): !Promise<void>} */
                const onHunkResolved = (/**
                 * @param {!tsickle_diff_zone_renderer_5.HunkResolutionEvent} event
                 * @return {!Promise<void>}
                 */
                async (event) => {
                    await this.handleHunkResolved(message, event);
                });
                /** @type {function(string): (undefined|!tsickle_hunk_storage_6.HunkResolutionAction)} */
                const getStoredResolution = (/**
                 * @param {string} hash
                 * @return {(undefined|!tsickle_hunk_storage_6.HunkResolutionAction)}
                 */
                (hash) => this.hunkStorage.getResolution(message, hash));
                // A restored review already applied its stored decisions.
                /** @type {boolean} */
                const isRestoring = this.restoringUris.has(normalizedUri);
                // If all hunks for this edit were already resolved, or if navigating from
                // the review sidebar to a previously resolved file, show the read-only diff.
                if (!isRestoring && this.hunkStorage.hasAnyResolutions(message)) {
                    // A partially resolved review can't be resumed; drop its marker.
                    await this.clearPendingReviewSnapshot(normalizedUri, message);
                    await this.handleFullyResolvedEdit(message);
                    return;
                }
                /** @type {!tsickle_diff_zone_renderer_5.RenderTextEditResult} */
                let result;
                if ((0, utils_1.isNotebook)(normalizedUri)) {
                    // If the notebook is already open in an editor, force reload it from
                    // disk to ensure VS Code's in-memory model reflects the agent's
                    // on-disk writes before creating the diff zone. If the document was
                    // dirty from concurrent edits, this reverts to disk so the DiffZone
                    // accurately presents the agent's proposed turn diff.
                    // Non-inline: call directly so a rejection still aborts the edit.
                    if (this.renderer?.type === 'inline') {
                        await this.forceResolveFromFile(uri);
                    }
                    else {
                        await cider_1.cider.ai.forceResolveFromFile(uri);
                    }
                    /** @type {!tsickle_vscode_3.NotebookDocument} */
                    const doc = await vscode.workspace.openNotebookDocument(uri);
                    result = await this.renderer.renderNotebookEdit(uri, doc, message, getStoredResolution, onHunkResolved);
                }
                else {
                    /** @type {!tsickle_vscode_3.TextDocument} */
                    const doc = await vscode.workspace.openTextDocument(uri);
                    // Check if the file content has changed since the DiffZone was last
                    // disposed (e.g., on a previous conversation switch). If the content
                    // changed externally (via undo, VCS revert, manual edit, etc.), skip
                    // the destructive DiffZone creation and show a read-only diff.
                    if (!isRestoring &&
                        message.conversationId !== undefined &&
                        message.turnIndex !== undefined) {
                        /** @type {(undefined|string)} */
                        const snapshot = this.hunkStorage.getSnapshot(message);
                        if (snapshot !== undefined) {
                            /** @type {string} */
                            const currentHash = this.hunkStorage.computeContentHash((0, utils_1.normalizeLineEndings)(doc.getText()));
                            if (currentHash !== snapshot) {
                                console.info(`[Jetski] File content changed since last DiffZone disposal for ${message.fileUri}, showing read-only diff.`);
                                await this.handleFullyResolvedEdit(message);
                                return;
                            }
                            // Content matches the snapshot — safe to recreate. Clear the snapshot.
                            await this.hunkStorage.clearSnapshot(message);
                        }
                    }
                    if (!isRestoring &&
                        message.conversationId !== undefined &&
                        message.turnIndex !== undefined &&
                        this.hunkStorage.hasAnyResolutions(message)) {
                        console.info(`[Jetski] Hunks already resolved for ${message.fileUri}, showing read-only diff.`);
                        await this.handleFullyResolvedEdit(message);
                        return;
                    }
                    // Only used by the inline-gated checks below.
                    /** @type {string} */
                    const currentContent = isInlineRenderer
                        ? (0, utils_1.normalizeLineEndings)(doc.getText())
                        : '';
                    /** @type {boolean} */
                    const isPriorInlineCombinedText = this.isPriorInlineCombinedText(normalizedUri, currentContent, existingDetails) ||
                        // This edit's review buffer, restored by hot exit.
                        (this.renderer.type === 'inline' &&
                            currentContent ===
                                (0, utils_1.normalizeLineEndings)((0, diff_helper_1.getTextWithHunks)(message.originalContents ?? '', (0, diff_helper_1.getDiffHunks)(message.originalContents ?? '', message.modifiedContents ?? ''))));
                    // When using inline diff zones, check if on-disk content diverged due to
                    // formatters or commands running during the turn. If the document on disk
                    // differs from both original and modified, but has been changed from original,
                    // adopt the on-disk content as the modified content so the inline diff displays
                    // the true state of the workspace rather than falsely reporting divergence.
                    if (this.renderer.type === 'inline' &&
                        !doc.isDirty &&
                        !isPriorInlineCombinedText &&
                        this.hasContentDiverged(doc, message)) {
                        /** @type {string} */
                        const normalizedOriginal = (0, utils_1.normalizeLineEndings)(message.originalContents ?? '');
                        if (currentContent !== normalizedOriginal) {
                            message = {
                                ...message,
                                modifiedContents: doc.getText(),
                            };
                        }
                    }
                    if (!isPriorInlineCombinedText &&
                        this.hasContentDiverged(doc, message)) {
                        console.info(`[Jetski] File content has diverged for ${message.fileUri}, showing read-only diff.`);
                        await this.handleFullyResolvedEdit(message);
                        return;
                    }
                    if (this.renderer.type === 'inline' &&
                        isPriorInlineCombinedText &&
                        vscode.workspace?.fs &&
                        currentContent !==
                            (0, utils_1.normalizeLineEndings)(message.modifiedContents ?? '')) {
                        try {
                            /** @type {!Uint8Array} */
                            const encoded = new TextEncoder().encode(message.modifiedContents ?? '');
                            await vscode.workspace.fs.writeFile(uri, encoded);
                        }
                        catch {
                            // Best-effort sync of modifiedContents to disk
                        }
                    }
                    result = await this.renderer.renderTextEdit(uri, doc, message, getStoredResolution, onHunkResolved);
                }
                if (result.fullyResolved) {
                    await this.clearPendingReviewSnapshot(normalizedUri, message);
                    await this.handleFullyResolvedEdit(message);
                    return;
                }
                /** @type {boolean} */
                const autoOpenAll = this.isAutoOpenEnabled();
                if (autoOpenAll && message.skipOpen !== true) {
                    await this.revealDocument(normalizedUri, false);
                }
                else if (message.strictNav === true && message.skipOpen !== true) {
                    // The user clicked Review or a file: show the review it built, as
                    // `getOpenOptions` does for existing reviews.
                    await this.revealDocument(normalizedUri, message.keepOpen !== true);
                }
                else if (this.openSideBySideDiffs &&
                    this.renderer.type === 'sideBySide' &&
                    message.skipOpen !== true) {
                    // Nothing shows a side-by-side review unless its diff tab is open.
                    await this.revealDocument(normalizedUri, true);
                }
                this.recordPriorTurnContents(normalizedUri, (/** @type {string} */ (message.originalContents)), (/** @type {string} */ (message.modifiedContents)));
                this.activeDiffZoneDetails.set(normalizedUri, {
                    ...message,
                    originalContents: (/** @type {string} */ (message.originalContents)),
                    modifiedContents: (/** @type {string} */ (message.modifiedContents)),
                    rawModifiedContents,
                    hunkHashes: result.hunkHashes ?? [],
                });
                await this.recordPendingReviewSnapshot(normalizedUri, message, (/** @type {string} */ (message.modifiedContents)));
                // The review may have been built from the file on disk rather than
                // the turn's text (see the divergence check above). Keep that text so
                // the read-only diff can find this review's decisions later (only
                // renderers that describe that diff use it).
                if (this.renderer.getResolvedDiffView !== undefined &&
                    message.conversationId !== undefined &&
                    message.turnIndex !== undefined &&
                    message.modifiedContents !== rawModifiedContents) {
                    await this.hunkStorage.recordReviewedContents(message, (/** @type {string} */ (message.modifiedContents)));
                }
                /** @type {number} */
                let totalInserted = 0;
                /** @type {number} */
                let totalDeleted = 0;
                for (const h of result.hunks) {
                    totalInserted += h.insertions.length;
                    totalDeleted += h.deletions.length;
                }
                // The side-by-side renderer only compares line counts.
                /** @type {boolean} */
                const useLineDiff = this.isSideBySideReview;
                this.fileDiffStats.set(normalizedUri, useLineDiff
                    ? countDiffLines(message.originalContents ?? '', message.modifiedContents ?? '')
                    : { numLinesInserted: totalInserted, numLinesDeleted: totalDeleted });
                this.fireAgentEditsChanged();
            }
            finally {
                resolve();
                this.processingFiles.delete(normalizedUri);
                if (this.globalProcessingLock === promise) {
                    this.globalProcessingLock = undefined;
                }
            }
        }
        catch (e) {
            console.error(`[Jetski] Failed to open diff zone for: ${message.fileUri}`, e);
        }
    }
    /**
     * @private
     * @param {!AddAgentEditMessage} message
     * @param {!tsickle_diff_zone_renderer_5.HunkResolutionEvent} event
     * @return {!Promise<void>}
     */
    async handleHunkResolved(message, event) {
        /** @type {string} */
        const fileUri = event.fileUri;
        /** @type {string} */
        const normalizedUri = (0, utils_1.normalizeUri)(fileUri);
        /** @type {(undefined|{originalContents: string, modifiedContents: string, rawModifiedContents: (undefined|string), hunkHashes: (undefined|!Array<string>), conversationId: (undefined|string), turnIndex: (undefined|number)})} */
        const details = this.activeDiffZoneDetails.get(normalizedUri);
        // Inline only: ignore resolutions from a superseded turn.
        if (this.renderer?.type === 'inline' &&
            details &&
            (details.conversationId !== message.conversationId ||
                details.turnIndex !== message.turnIndex)) {
            return;
        }
        if (event.pendingHunkHashes) {
            await this.handleReplayedResolution(message, event.pendingHunkHashes, event.accept);
            return;
        }
        if (details && details.hunkHashes) {
            /** @type {(undefined|boolean)} */
            const isBulkResolution = event.final && event.hunkIndex == null && event.hunkHash == null;
            if (isBulkResolution) {
                // Record all remaining hunks as resolved so state persists across window reloads.
                for (const hunkHash of details.hunkHashes) {
                    await this.hunkStorage.recordResolution(message, hunkHash, event.accept
                        ? hunk_storage_1.HunkResolutionAction.ACCEPT
                        : hunk_storage_1.HunkResolutionAction.REJECT);
                }
                details.hunkHashes = [];
            }
            else {
                /** @type {(undefined|string)} */
                const hunkHash = event.hunkHash ??
                    (event.hunkIndex != null
                        ? details.hunkHashes[event.hunkIndex]
                        : undefined);
                if (hunkHash) {
                    /** @type {number} */
                    const indexToRecord = event.hunkIndex != null &&
                        details.hunkHashes[event.hunkIndex] === event.hunkHash
                        ? event.hunkIndex
                        : event.hunkHash
                            ? details.hunkHashes.indexOf(event.hunkHash)
                            : (event.hunkIndex ?? -1);
                    if (indexToRecord !== -1) {
                        details.hunkHashes.splice(indexToRecord, 1);
                    }
                    await this.hunkStorage.recordResolution(message, hunkHash, event.accept
                        ? hunk_storage_1.HunkResolutionAction.ACCEPT
                        : hunk_storage_1.HunkResolutionAction.REJECT);
                }
            }
        }
        // Inline only: re-read, since a newer zone may have replaced this one.
        /** @type {(undefined|{originalContents: string, modifiedContents: string, rawModifiedContents: (undefined|string), hunkHashes: (undefined|!Array<string>), conversationId: (undefined|string), turnIndex: (undefined|number)})} */
        const currentDetails = this.renderer?.type === 'inline'
            ? this.activeDiffZoneDetails.get(normalizedUri)
            : details;
        if (this.renderer?.type === 'inline' &&
            currentDetails &&
            (currentDetails.conversationId !== message.conversationId ||
                currentDetails.turnIndex !== message.turnIndex)) {
            return;
        }
        if (!currentDetails ||
            !currentDetails.hunkHashes ||
            currentDetails.hunkHashes.length === 0 ||
            (event.final && event.hunkIndex == null && event.hunkHash == null)) {
            this.activeDiffZoneDetails.delete(normalizedUri);
            this.fileDiffStats.delete(normalizedUri);
            if (fileUri !== normalizedUri) {
                this.activeDiffZoneDetails.delete(fileUri);
                this.fileDiffStats.delete(fileUri);
            }
            await this.clearPendingReviewSnapshot(normalizedUri, message);
            this.fireAgentEditsChanged();
        }
    }
    /**
     * Syncs the changes overview after Ctrl+Z / Ctrl+Y in an inline review, and
     * brings the file back if Ctrl+Z reopened a review that had closed.
     * @private
     * @param {!AddAgentEditMessage} message
     * @param {!Array<string>} pendingHunkHashes
     * @param {boolean} accept
     * @return {!Promise<void>}
     */
    async handleReplayedResolution(message, pendingHunkHashes, accept) {
        /** @type {string} */
        const normalizedUri = (0, utils_1.normalizeUri)((/** @type {string} */ (message.fileUri)));
        /** @type {(undefined|{originalContents: string, modifiedContents: string, rawModifiedContents: (undefined|string), hunkHashes: (undefined|!Array<string>), conversationId: (undefined|string), turnIndex: (undefined|number)})} */
        let details = this.activeDiffZoneDetails.get(normalizedUri);
        if (!details) {
            details = {
                ...message,
                originalContents: (/** @type {string} */ (message.originalContents)),
                modifiedContents: (/** @type {string} */ (message.modifiedContents)),
                rawModifiedContents: message.modifiedContents,
                hunkHashes: [],
            };
            this.activeDiffZoneDetails.set(normalizedUri, details);
        }
        /** @type {!Array<string>} */
        const previous = details.hunkHashes ?? [];
        for (const hash of pendingHunkHashes) {
            if (!previous.includes(hash)) {
                await this.hunkStorage.clearResolution(message, hash);
            }
        }
        for (const hash of previous) {
            if (!pendingHunkHashes.includes(hash)) {
                await this.hunkStorage.recordResolution(message, hash, accept ? hunk_storage_1.HunkResolutionAction.ACCEPT : hunk_storage_1.HunkResolutionAction.REJECT);
            }
        }
        details.hunkHashes = [...pendingHunkHashes];
        // Keep the pending-review marker in step: Ctrl+Z can reopen a review whose
        // resolution cleared it, and Ctrl+Y can resolve it again.
        if (pendingHunkHashes.length > 0) {
            await this.recordPendingReviewSnapshot(normalizedUri, details, details.rawModifiedContents ?? details.modifiedContents);
        }
        else {
            await this.clearPendingReviewSnapshot(normalizedUri, details);
        }
        if (!this.fileDiffStats.has(normalizedUri)) {
            this.fileDiffStats.set(normalizedUri, countDiffLines(details.originalContents, details.modifiedContents));
        }
        this.fireAgentEditsChanged();
    }
    /**
     * Whether a background message (skipOpen without strictNav) must leave the
     * open inline review of `normalizedUri` alone.
     *
     * True when the message comes from an older turn of the same conversation,
     * or when it is from the same turn but replacing the review would only end
     * in the read-only path, which a background message never shows.
     * @private
     * @param {string} normalizedUri
     * @param {!AddAgentEditMessage} message
     * @param {{originalContents: string, modifiedContents: string, conversationId: (undefined|string), turnIndex: (undefined|number)}} existingDetails
     * @param {boolean} isSameTurn
     * @return {!Promise<boolean>}
     */
    async shouldKeepOpenReview(normalizedUri, message, existingDetails, isSameTurn) {
        if (existingDetails.conversationId !== message.conversationId) {
            return false;
        }
        if (message.turnIndex !== undefined &&
            existingDetails.turnIndex !== undefined &&
            message.turnIndex < existingDetails.turnIndex) {
            return true;
        }
        if (!isSameTurn) {
            return false;
        }
        // Same-turn messages keep reviewing against the turn's first baseline.
        /** @type {!AddAgentEditMessage} */
        const candidate = {
            ...message,
            originalContents: existingDetails.originalContents,
        };
        if (this.hunkStorage.hasAnyResolutions(candidate)) {
            return true;
        }
        if ((0, utils_1.isNotebook)(normalizedUri)) {
            return false;
        }
        /** @type {!tsickle_vscode_3.TextDocument} */
        const doc = await vscode.workspace.openTextDocument(vscode.Uri.parse(normalizedUri));
        /** @type {string} */
        const currentContent = (0, utils_1.normalizeLineEndings)(doc.getText());
        if (
        // With `readOnlyNavigationWithoutOpenReview` this turn's snapshot is the
        // open review's own pending marker, which replacing it clears first.
        !this.readOnlyNavigationWithoutOpenReview &&
            candidate.conversationId !== undefined &&
            candidate.turnIndex !== undefined) {
            /** @type {(undefined|string)} */
            const snapshot = this.hunkStorage.getSnapshot(candidate);
            if (snapshot !== undefined &&
                this.hunkStorage.computeContentHash(currentContent) !== snapshot) {
                return true;
            }
        }
        if (this.isPriorInlineCombinedText(normalizedUri, currentContent, existingDetails)) {
            return false;
        }
        // Mirrors handleAddAgentEdit: a clean buffer changed on disk (e.g. by a
        // formatter) is adopted as the modified text rather than diverged.
        /** @type {!AddAgentEditMessage} */
        let effective = candidate;
        if (!doc.isDirty &&
            this.hasContentDiverged(doc, candidate) &&
            currentContent !== (0, utils_1.normalizeLineEndings)(candidate.originalContents ?? '')) {
            effective = { ...candidate, modifiedContents: doc.getText() };
        }
        return this.hasContentDiverged(doc, effective);
    }
    /**
     * Inline only: whether `currentContent` is a text a previous review of the
     * file left in the buffer (its original, modified, or combined text).
     * @private
     * @param {string} normalizedUri
     * @param {string} currentContent
     * @param {(undefined|{originalContents: string, modifiedContents: string})=} existingDetails
     * @return {boolean}
     */
    isPriorInlineCombinedText(normalizedUri, currentContent, existingDetails) {
        if (this.renderer?.type !== 'inline') {
            return false;
        }
        if (this.priorTurnContents.get(normalizedUri)?.has(currentContent)) {
            return true;
        }
        if (existingDetails === undefined) {
            return false;
        }
        const { originalContents, modifiedContents } = existingDetails;
        return (currentContent === (0, utils_1.normalizeLineEndings)(originalContents) ||
            currentContent === (0, utils_1.normalizeLineEndings)(modifiedContents) ||
            currentContent ===
                (0, utils_1.normalizeLineEndings)((0, diff_helper_1.getTextWithHunks)(originalContents, (0, diff_helper_1.getDiffHunks)(originalContents, modifiedContents))));
    }
    /**
     * @private
     * @param {string} normalizedUri
     * @param {string} normalizedModifiedContents
     * @param {(undefined|boolean)=} skipOpen
     * @param {boolean=} strictNav
     * @param {(undefined|!AddAgentEditMessage)=} message
     * @return {!Promise<boolean>}
     */
    async handleExistingDiffZone(normalizedUri, normalizedModifiedContents, skipOpen, strictNav = false, message) {
        /** @type {(undefined|{originalContents: string, modifiedContents: string, rawModifiedContents: (undefined|string), hunkHashes: (undefined|!Array<string>), conversationId: (undefined|string), turnIndex: (undefined|number)})} */
        const existingDetails = this.activeDiffZoneDetails.get(normalizedUri);
        if (!existingDetails) {
            return false;
        }
        /** @type {boolean} */
        const isSameConversation = message?.conversationId == null ||
            existingDetails.conversationId == null ||
            existingDetails.conversationId === message.conversationId;
        if (!isSameConversation) {
            return false;
        }
        /** @type {boolean} */
        const isSameTurn = this.renderer?.type === 'inline' &&
            message?.conversationId !== undefined &&
            message?.turnIndex !== undefined &&
            existingDetails.conversationId === message.conversationId &&
            existingDetails.turnIndex === message.turnIndex &&
            (strictNav ||
                (0, utils_1.normalizeLineEndings)(existingDetails.rawModifiedContents ??
                    existingDetails.modifiedContents ??
                    '') === normalizedModifiedContents);
        // Explicit user navigation from review sidebar without turnIndex (e.g. clicking
        // an unresolved file in Files Changed). Do not compare modifiedContents here
        // since the sidebar passes trajectory diffs which may differ from turn diffs.
        /** @type {boolean} */
        const isNavigationOnly = message?.turnIndex == null && strictNav;
        if (!isSameTurn &&
            !isNavigationOnly &&
            (0, utils_1.normalizeLineEndings)(existingDetails.modifiedContents ?? '') !==
                normalizedModifiedContents) {
            return false;
        }
        console.info(`[Jetski] Diff zone already exists with same content for ${normalizedUri}, skipping recreation.`);
        const { shouldOpen, preview } = this.getOpenOptions(skipOpen, strictNav, message?.keepOpen);
        if (shouldOpen) {
            await this.revealDocument(normalizedUri, preview);
            this.renderer?.focusExistingZone(normalizedUri);
        }
        return true;
    }
    /**
     * With `readOnlyNavigationWithoutOpenReview`: persists that a live review is
     * pending for this turn and file, as the content snapshot
     * `canRebuildReviewOnNavigation` accepts, so an explicit Review after a
     * window reload can rebuild it. Every path that resolves or replaces the
     * review must call `clearPendingReviewSnapshot`, or a resolved turn would
     * become editable again (b/548760759).
     * @private
     * @param {string} normalizedUri
     * @param {{conversationId: (undefined|string), turnIndex: (undefined|number)}} context
     * @param {string} modifiedContents
     * @return {!Promise<void>}
     */
    async recordPendingReviewSnapshot(normalizedUri, context, modifiedContents) {
        const { conversationId, turnIndex } = context;
        if (!this.readOnlyNavigationWithoutOpenReview ||
            conversationId == null ||
            turnIndex == null ||
            // Consistent with `disposeAllDiffZones`: no snapshots for notebooks.
            (0, utils_1.isNotebook)(normalizedUri)) {
            return;
        }
        try {
            await this.hunkStorage.recordSnapshot({ conversationId, turnIndex, fileUri: normalizedUri }, this.hunkStorage.computeContentHash((0, utils_1.normalizeLineEndings)(modifiedContents)));
        }
        catch (e) {
            console.error(`[Jetski] Failed to record pending review for ${normalizedUri}`, e);
        }
    }
    /**
     * With `readOnlyNavigationWithoutOpenReview`: forgets the pending-review
     * marker of a resolved review.
     * @private
     * @param {string} normalizedUri
     * @param {{conversationId: (undefined|string), turnIndex: (undefined|number)}} context
     * @return {!Promise<void>}
     */
    async clearPendingReviewSnapshot(normalizedUri, context) {
        const { conversationId, turnIndex } = context;
        if (!this.readOnlyNavigationWithoutOpenReview ||
            conversationId == null ||
            turnIndex == null) {
            return;
        }
        try {
            await this.hunkStorage.clearSnapshot({
                conversationId,
                turnIndex,
                fileUri: normalizedUri,
            });
        }
        catch (e) {
            console.error(`[Jetski] Failed to clear pending review for ${normalizedUri}`, e);
        }
    }
    /**
     * Returns whether an explicit navigation (`strictNav`) may build a live
     * review.
     *
     * Only true when this exact turn is already under review, or when the turn's
     * review was still open when last seen (recorded as a content snapshot by
     * `recordPendingReviewSnapshot` and `disposeAllDiffZones`) and the file
     * still holds that content.
     * @private
     * @param {string} normalizedUri
     * @param {!AddAgentEditMessage} message
     * @return {!Promise<boolean>}
     */
    async canRebuildReviewOnNavigation(normalizedUri, message) {
        if (message.conversationId == null || message.turnIndex == null) {
            return false;
        }
        // The same turn is already under review: keep the existing flow.
        // (`handleExistingDiffZone` normally reveals such a zone first.)
        /** @type {(undefined|{originalContents: string, modifiedContents: string, rawModifiedContents: (undefined|string), hunkHashes: (undefined|!Array<string>), conversationId: (undefined|string), turnIndex: (undefined|number)})} */
        const existingDetails = this.activeDiffZoneDetails.get(normalizedUri);
        if (existingDetails?.conversationId === message.conversationId &&
            existingDetails.turnIndex === message.turnIndex) {
            return true;
        }
        // Snapshots are only recorded for text files.
        if ((0, utils_1.isNotebook)(normalizedUri)) {
            return false;
        }
        /** @type {(undefined|string)} */
        const snapshot = this.hunkStorage.getSnapshot(message);
        if (snapshot === undefined) {
            return false;
        }
        /** @type {!tsickle_vscode_3.TextDocument} */
        const doc = await vscode.workspace.openTextDocument(vscode.Uri.parse(normalizedUri));
        return (this.hunkStorage.computeContentHash((0, utils_1.normalizeLineEndings)(doc.getText())) === snapshot);
    }
    /**
     * @private
     * @param {!AddAgentEditMessage} message
     * @return {!Promise<void>}
     */
    async handleFullyResolvedEdit(message) {
        if (message.fileUri === undefined ||
            message.originalContents === undefined ||
            message.modifiedContents === undefined) {
            return;
        }
        const { shouldOpen, preview } = this.getOpenOptions(message.skipOpen, message.strictNav, message.keepOpen);
        if (!shouldOpen) {
            return;
        }
        if (message.conversationId !== undefined &&
            message.turnIndex !== undefined &&
            !message.strictNav) {
            /** @type {boolean} */
            const isTurnResolved = this.isTurnFullyResolved(message.fileUri, message.conversationId, message.turnIndex);
            if (!isTurnResolved) {
                /** @type {boolean} */
                const opened = await this.openUnresolvedFileFromSameTurn(message.conversationId, message.turnIndex, preview);
                if (opened) {
                    return;
                }
            }
        }
        if (this.openStandardDiff) {
            // Opening every file of a turn keeps each one in its own tab.
            /** @type {(undefined|boolean)} */
            const preview = message.keepOpen === true ? false : undefined;
            /** @type {(undefined|?)} */
            const view = this.getResolvedDiffView(message, message.originalContents, message.modifiedContents);
            // Set before opening so the diff is marked as soon as it shows. Any
            // other read-only diff for the file replaces this one, as it reuses the
            // same tab, so a diff without rejected changes forgets the marks.
            this.setResolvedDiffMarks(message.fileUri, view?.rejectedChanges
                ? {
                    fileUri: message.fileUri,
                    outcomeLabel: view.outcomeLabel,
                    modifiedRanges: view.rejectedChanges.modifiedRanges,
                    originalRanges: view.rejectedChanges.originalRanges,
                }
                : undefined);
            if (view) {
                await this.openStandardDiff(message.fileUri, message.originalContents, view.proposal, preview, view.outcomeLabel);
            }
            else if (preview !== undefined) {
                await this.openStandardDiff(message.fileUri, message.originalContents, message.modifiedContents, preview);
            }
            else {
                await this.openStandardDiff(message.fileUri, message.originalContents, message.modifiedContents);
            }
        }
    }
    /**
     * Describes the read-only diff for a turn from the decisions saved for its
     * hunks, if the renderer can tell (`DiffZoneRenderer.getResolvedDiffView`;
     * b/548760759). `proposal`, the diff's right side, is the agent's text as
     * reviewed; the decisions only change the title.
     *
     * Returns undefined, keeping the default "Resolved" title, when the
     * renderer can't tell and for messages without a turn, whose decisions
     * can't be looked up.
     * @private
     * @param {!AddAgentEditMessage} message
     * @param {string} originalContents
     * @param {string} modifiedContents
     * @return {(undefined|?)}
     */
    getResolvedDiffView(message, originalContents, modifiedContents) {
        if (!this.renderer?.getResolvedDiffView ||
            message.conversationId == null ||
            message.turnIndex == null) {
            return undefined;
        }
        // The review may have been built from different modified text than the
        // turn reports (e.g. after a formatter ran); diff what was reviewed.
        /** @type {string} */
        const proposal = this.hunkStorage.getReviewedContents(message) ?? modifiedContents;
        /** @type {(undefined|!tsickle_diff_zone_renderer_5.ResolvedDiffView)} */
        const view = this.renderer.getResolvedDiffView(originalContents, proposal, (/**
         * @param {string} hash
         * @return {(undefined|!tsickle_hunk_storage_6.HunkResolutionAction)}
         */
        (hash) => this.hunkStorage.getResolution(message, hash)));
        return view && { ...view, proposal };
    }
    /**
     * @private
     * @param {(undefined|string)=} conversationId
     * @param {(undefined|number)=} turnIndex
     * @param {(undefined|boolean)=} preview
     * @return {!Promise<boolean>}
     */
    async openUnresolvedFileFromSameTurn(conversationId, turnIndex, preview) {
        if (conversationId === undefined || turnIndex === undefined) {
            return false;
        }
        for (const [uri__tsickle_destructured_3, details__tsickle_destructured_4] of this.activeDiffZoneDetails.entries()) {
            const uri = /** @type {string} */ (uri__tsickle_destructured_3);
            const details = /** @type {{originalContents: string, modifiedContents: string, rawModifiedContents: (undefined|string), hunkHashes: (undefined|!Array<string>), conversationId: (undefined|string), turnIndex: (undefined|number)}} */ (details__tsickle_destructured_4);
            if (details.conversationId === conversationId &&
                details.turnIndex === turnIndex &&
                details.hunkHashes &&
                details.hunkHashes.length > 0) {
                await this.revealDocument(uri, preview);
                this.renderer?.focusExistingZone(uri);
                return true;
            }
        }
        return false;
    }
    /**
     * @private
     * @param {string} currentFileUri
     * @param {(undefined|string)=} conversationId
     * @param {(undefined|number)=} turnIndex
     * @return {boolean}
     */
    isTurnFullyResolved(currentFileUri, conversationId, turnIndex) {
        if (conversationId === undefined || turnIndex === undefined) {
            return true;
        }
        for (const [uri__tsickle_destructured_5, details__tsickle_destructured_6] of this.activeDiffZoneDetails.entries()) {
            const uri = /** @type {string} */ (uri__tsickle_destructured_5);
            const details = /** @type {{originalContents: string, modifiedContents: string, rawModifiedContents: (undefined|string), hunkHashes: (undefined|!Array<string>), conversationId: (undefined|string), turnIndex: (undefined|number)}} */ (details__tsickle_destructured_6);
            if (uri === currentFileUri) {
                continue;
            }
            if (details.conversationId === conversationId &&
                details.turnIndex === turnIndex &&
                details.hunkHashes &&
                details.hunkHashes.length > 0) {
                return false;
            }
        }
        return true;
    }
    /**
     * Disposes all active diff zones without reverting or applying changes.
     *
     * Records content snapshots for each active text DiffZone before disposing.
     * These snapshots are used to detect external file modifications when the
     * DiffZone is later recreated (e.g., on conversation switch-back).
     * @public
     * @return {!Promise<void>}
     */
    async disposeAllDiffZones() {
        // Record content snapshots before disposing so we can detect external
        // file modifications when the DiffZone is later recreated.
        //
        // We snapshot the EXPECTED file content (modifiedContents) rather than
        // reading the actual file. This way, if the file was reverted externally
        // (e.g., `jj undo`, VCS revert) while the DiffZone was active, the
        // snapshot won't match the current file content on re-creation, and we'll
        // correctly show a read-only diff instead of destructively recreating.
        for (const [uri__tsickle_destructured_7, details__tsickle_destructured_8] of this.activeDiffZoneDetails.entries()) {
            const uri = /** @type {string} */ (uri__tsickle_destructured_7);
            const details = /** @type {{originalContents: string, modifiedContents: string, rawModifiedContents: (undefined|string), hunkHashes: (undefined|!Array<string>), conversationId: (undefined|string), turnIndex: (undefined|number)}} */ (details__tsickle_destructured_8);
            if (details.conversationId !== undefined &&
                details.turnIndex !== undefined &&
                !(0, utils_1.isNotebook)(uri)) {
                try {
                    /** @type {string} */
                    const contentHash = this.hunkStorage.computeContentHash((0, utils_1.normalizeLineEndings)(details.modifiedContents));
                    await this.hunkStorage.recordSnapshot({
                        conversationId: details.conversationId,
                        turnIndex: details.turnIndex,
                        fileUri: uri,
                    }, contentHash);
                }
                catch (e) {
                    console.error(`[Jetski] Failed to record content snapshot for ${uri}`, e);
                }
            }
        }
        if (this.renderer) {
            await this.renderer.disposeAll();
        }
        this.activeDiffZoneDetails.clear();
        this.fileDiffStats.clear();
        this.fireAgentEditsChanged();
    }
    /**
     * Resolves all agent edits across all tracked files.
     *
     * `userAction` marks a user click, which Ctrl+Z can undo if enabled.
     * @public
     * @param {boolean} accept
     * @param {boolean=} userAction
     * @return {!Promise<void>}
     */
    async handleResolveAllAgentEdits(accept, userAction = false) {
        /** @type {!Set<string>} */
        const files = new Set([
            ...this.activeDiffZoneDetails.keys(),
            ...this.fileDiffStats.keys(),
        ]);
        await Promise.all(Array.from(files).flatMap((/**
         * @param {string} fileUri
         * @return {!Array<!Promise<*>>}
         */
        (fileUri) => this.resolveEditsInFile(fileUri, accept, userAction))));
        this.fireAgentEditsChanged();
    }
    /**
     * Auto-accepts stale agent edits based on turn index.
     *
     * `excludeUri` is never aged out; its zone is about to be replaced.
     * @public
     * @param {number} currentTurnIndex
     * @param {(undefined|string)=} excludeUri
     * @return {!Promise<void>}
     */
    async handleResolveStaleAgentEdits(currentTurnIndex, excludeUri) {
        if (this.ageOutThreshold <= 0)
            return;
        // Inline and VS Code side-by-side: onChatSent already accepts background
        // files, and turnIndex can jump past the threshold in one message,
        // accepting the active review.
        if (this.autoAcceptOnChat &&
            (this.renderer?.type === 'inline' || this.isSideBySideReview)) {
            return;
        }
        /** @type {(undefined|string)} */
        const normalizedExcludeUri = excludeUri
            ? (0, utils_1.normalizeUri)(excludeUri)
            : undefined;
        /** @type {!Set<string>} */
        const staleFiles = new Set();
        for (const [uri__tsickle_destructured_9, details__tsickle_destructured_10] of this.activeDiffZoneDetails.entries()) {
            const uri = /** @type {string} */ (uri__tsickle_destructured_9);
            const details = /** @type {{originalContents: string, modifiedContents: string, rawModifiedContents: (undefined|string), hunkHashes: (undefined|!Array<string>), conversationId: (undefined|string), turnIndex: (undefined|number)}} */ (details__tsickle_destructured_10);
            if (uri !== normalizedExcludeUri &&
                details.turnIndex !== undefined &&
                details.turnIndex < currentTurnIndex - this.ageOutThreshold) {
                staleFiles.add(uri);
            }
        }
        if (staleFiles.size > 0) {
            console.info(`[Jetski] Auto-accepting stale edits for: ${Array.from(staleFiles).join(', ')}`);
            await Promise.all(Array.from(staleFiles).flatMap((/**
             * @param {string} fileUri
             * @return {!Array<!Promise<*>>}
             */
            (fileUri) => this.resolveEditsInFile(fileUri, true))));
            this.fireAgentEditsChanged();
        }
    }
    /**
     * Called when a chat message is sent. Auto-accepts background edits if enabled.
     * @public
     * @param {(undefined|string)=} activeFileUri
     * @return {!Promise<void>}
     */
    async onChatSent(activeFileUri) {
        if (!this.autoAcceptOnChat)
            return;
        /** @type {(undefined|string)} */
        const normalizedActiveUri = activeFileUri
            ? (0, utils_1.normalizeUri)(activeFileUri)
            : undefined;
        /** @type {!Set<string>} */
        const filesToAccept = new Set();
        for (const uri of this.activeDiffZoneDetails.keys()) {
            if (uri !== normalizedActiveUri ||
                (this.renderer?.type === 'inline' &&
                    this.renderer.hasUserEditedZone?.(uri) === true) ||
                (this.isSideBySideReview &&
                    hasUnsavedEdits(uri, this.activeDiffZoneDetails.get(uri)?.modifiedContents))) {
                filesToAccept.add(uri);
            }
        }
        if (filesToAccept.size > 0) {
            console.info(`[Jetski] Auto-accepting edits in background files: ${Array.from(filesToAccept).join(', ')}`);
            if (this.renderer?.type === 'inline') {
                // Inline only: drain one at a time; the buffer is shared.
                for (const fileUri of filesToAccept) {
                    await Promise.all(this.resolveEditsInFile(fileUri, true));
                }
            }
            else {
                await Promise.all(Array.from(filesToAccept).flatMap((/**
                 * @param {string} fileUri
                 * @return {!Array<!Promise<*>>}
                 */
                (fileUri) => this.resolveEditsInFile(fileUri, true))));
            }
            this.fireAgentEditsChanged();
        }
        // Flush unsaved user edits so the backend reads them from disk.
        if (this.renderer?.type === 'inline' || this.isSideBySideReview) {
            for (const doc of vscode.workspace.textDocuments ?? []) {
                if (doc.isDirty &&
                    doc.uri.scheme === 'file' &&
                    !this.activeDiffZoneDetails.has((0, utils_1.normalizeUri)(doc.uri.toString()))) {
                    try {
                        await doc.save();
                    }
                    catch (e) {
                        console.warn(`[Jetski] Failed to save ${doc.uri.toString()}:`, e);
                    }
                }
            }
        }
    }
    /**
     * Resolves all agent edits in a specific file.
     * @public
     * @param {string} fileUri
     * @param {boolean} accept
     * @param {boolean=} userAction
     * @return {!Promise<void>}
     */
    async handleResolveAllAgentEditsInFile(fileUri, accept, userAction = false) {
        /** @type {string} */
        const normalizedUri = (0, utils_1.normalizeUri)(fileUri);
        await Promise.all(this.resolveEditsInFile(normalizedUri, accept, userAction));
        this.fireAgentEditsChanged();
    }
    /**
     * @private
     * @param {string} fileUri
     * @param {boolean} accept
     * @param {boolean=} userAction
     * @return {!Array<!Promise<*>>}
     */
    resolveEditsInFile(fileUri, accept, userAction = false) {
        /** @type {!Array<!Promise<*>>} */
        const promises = [];
        /** @type {(undefined|{originalContents: string, modifiedContents: string, rawModifiedContents: (undefined|string), hunkHashes: (undefined|!Array<string>), conversationId: (undefined|string), turnIndex: (undefined|number)})} */
        const details = this.activeDiffZoneDetails.get(fileUri);
        if (details) {
            this.recordPriorTurnContents(fileUri, details.originalContents, details.modifiedContents);
            if (details.hunkHashes) {
                for (const hash of details.hunkHashes) {
                    promises.push(this.hunkStorage.recordResolution({
                        conversationId: details.conversationId,
                        turnIndex: details.turnIndex,
                        fileUri,
                    }, hash, accept
                        ? hunk_storage_1.HunkResolutionAction.ACCEPT
                        : hunk_storage_1.HunkResolutionAction.REJECT));
                }
            }
            // Side-by-side reviews have no hunks; record the whole file so opening
            // it again shows the read-only diff instead of a new review.
            if (this.isSideBySideReview) {
                promises.push(this.hunkStorage.recordResolution({
                    conversationId: details.conversationId,
                    turnIndex: details.turnIndex,
                    fileUri,
                }, SIDE_BY_SIDE_FILE_HASH, accept ? hunk_storage_1.HunkResolutionAction.ACCEPT : hunk_storage_1.HunkResolutionAction.REJECT));
            }
            promises.push(this.clearPendingReviewSnapshot(fileUri, details));
        }
        if (this.renderer) {
            /** @type {boolean} */
            const undoable = userAction && this.undoableUserResolutions;
            /** @type {!Promise<boolean>} */
            const closed = undoable
                ? this.renderer.closeDiffZone(fileUri, accept, { undoable })
                : this.renderer.closeDiffZone(fileUri, accept);
            promises.push(closed);
            // Only on a click: auto-accepts (e.g. on chat send) shouldn't steal focus.
            if (details && userAction && this.isSideBySideReview) {
                promises.push(closed.then((/**
                 * @param {boolean} didClose
                 * @return {(undefined|!Promise<void>)}
                 */
                (didClose) => didClose
                    ? this.showResolvedDiff(fileUri, details, accept)
                    : undefined)));
            }
        }
        this.activeDiffZoneDetails.delete(fileUri);
        this.fileDiffStats.delete(fileUri);
        return promises;
    }
    /**
     * Swaps an open side-by-side review tab for the read-only resolved diff on
     * Accept, or for the file itself on Reject (the diff would show the rejected
     * lines).
     * @private
     * @param {string} fileUri
     * @param {{originalContents: string, modifiedContents: string}} details
     * @param {boolean} accept
     * @return {!Promise<void>}
     */
    async showResolvedDiff(fileUri, details, accept) {
        // Leave the tab alone if a newer review of the file already started.
        if (this.activeDiffZoneDetails.has(fileUri) ||
            this.processingFiles.has(fileUri)) {
            return;
        }
        if (!(await this.renderer?.closeReviewTabs?.(fileUri)))
            return;
        if (!accept) {
            await vscode.window.showTextDocument(vscode.Uri.parse(fileUri));
            return;
        }
        await this.openStandardDiff?.(fileUri, details.originalContents, details.modifiedContents);
    }
    /**
     * @private
     * @param {string} normalizedUri
     * @param {string} originalContents
     * @param {string} modifiedContents
     * @return {void}
     */
    recordPriorTurnContents(normalizedUri, originalContents, modifiedContents) {
        // Only inline reads `priorTurnContents`; skip it for other renderers.
        if (this.renderer?.type !== 'inline') {
            return;
        }
        /** @type {!Set<string>} */
        const set = new Set();
        set.add((0, utils_1.normalizeLineEndings)(originalContents));
        set.add((0, utils_1.normalizeLineEndings)(modifiedContents));
        set.add((0, utils_1.normalizeLineEndings)((0, diff_helper_1.getTextWithHunks)(originalContents, (0, diff_helper_1.getDiffHunks)(originalContents, modifiedContents))));
        this.priorTurnContents.set(normalizedUri, set);
    }
    /**
     * Focuses the next or previous hunk in the diff zone for the specified file.
     * @public
     * @param {string} fileUri
     * @param {string} direction
     * @return {void}
     */
    focusHunk(fileUri, direction) {
        this.renderer?.focusHunk(fileUri, direction);
    }
    /**
     * Accepts the currently focused hunk in the diff zone for the specified file.
     * @public
     * @param {string} fileUri
     * @return {!Promise<void>}
     */
    async handleAcceptFocusedHunk(fileUri) {
        /** @type {string} */
        const normalizedUri = (0, utils_1.normalizeUri)(fileUri);
        await this.renderer?.acceptFocusedHunk?.(normalizedUri);
    }
    /**
     * Rejects the currently focused hunk in the diff zone for the specified file.
     * @public
     * @param {string} fileUri
     * @return {!Promise<void>}
     */
    async handleRejectFocusedHunk(fileUri) {
        /** @type {string} */
        const normalizedUri = (0, utils_1.normalizeUri)(fileUri);
        await this.renderer?.rejectFocusedHunk?.(normalizedUri);
    }
    /**
     * @private
     * @return {void}
     */
    fireAgentEditsChanged() {
        this.persistPendingInlineEdits();
        this.renderer?.onAgentEditsChanged?.();
        this.onDidChangeDiffZonesEmitter.fire(this.getCurrentStates());
    }
    /**
     * Returns the current list of active edit states.
     * @public
     * @return {!Array<!FileAgentEditState>}
     */
    getCurrentStates() {
        /** @type {!Array<!FileAgentEditState>} */
        const states = [];
        for (const [uri__tsickle_destructured_11, stats__tsickle_destructured_12] of this.fileDiffStats.entries()) {
            const uri = /** @type {string} */ (uri__tsickle_destructured_11);
            const stats = /** @type {{numLinesInserted: number, numLinesDeleted: number}} */ (stats__tsickle_destructured_12);
            states.push({
                uri: (0, workspace_1.toJetskiFileUri)(uri).toString(),
                numLinesInserted: stats.numLinesInserted,
                numLinesDeleted: stats.numLinesDeleted,
                createdByCascade: false,
            });
        }
        return states;
    }
    /**
     * @private
     * @return {boolean}
     */
    isAutoOpenEnabled() {
        /** @type {!tsickle_vscode_3.WorkspaceConfiguration} */
        const antigravityConfig = vscode.workspace.getConfiguration('antigravity');
        /** @type {(undefined|{key: string, defaultValue: (undefined|boolean), globalValue: (undefined|boolean), workspaceValue: (undefined|boolean), workspaceFolderValue: (undefined|boolean), defaultLanguageValue: (undefined|boolean), globalLanguageValue: (undefined|boolean), workspaceLanguageValue: (undefined|boolean), workspaceFolderLanguageValue: (undefined|boolean), languageIds: (undefined|!Array<string>)})} */
        const inspected = antigravityConfig?.inspect?.('autoOpenFiles');
        /** @type {(undefined|boolean)} */
        const antigravityExplicit = inspected?.workspaceFolderValue ??
            inspected?.workspaceValue ??
            inspected?.globalValue;
        if (antigravityExplicit !== undefined) {
            return antigravityExplicit;
        }
        /** @type {!tsickle_vscode_3.WorkspaceConfiguration} */
        const jetskiConfig = vscode.workspace.getConfiguration('jetski-web');
        return jetskiConfig?.get?.('autoOpenFiles', false) ?? false;
    }
    /**
     * @private
     * @param {(undefined|boolean)=} skipOpen
     * @param {boolean=} strictNav
     * @param {boolean=} keepOpen
     * @return {!FileOpenOptions}
     */
    getOpenOptions(skipOpen, strictNav = false, keepOpen = false) {
        if (skipOpen === true) {
            return { shouldOpen: false, preview: true };
        }
        /** @type {boolean} */
        const autoOpenAll = this.isAutoOpenEnabled();
        if (strictNav) {
            return { shouldOpen: true, preview: !keepOpen };
        }
        if (autoOpenAll) {
            return { shouldOpen: true, preview: false };
        }
        return { shouldOpen: false, preview: true };
    }
    /**
     * Whether `fileUri` has a pending side-by-side review. Always false unless
     * `openSideBySideDiffs` is set.
     * @public
     * @param {string} fileUri
     * @return {boolean}
     */
    hasPendingSideBySideReview(fileUri) {
        return (this.isSideBySideReview &&
            this.activeDiffZoneDetails.has((0, utils_1.normalizeUri)(fileUri)));
    }
    /**
     * Opens the diff tab of a pending side-by-side review of `fileUri`, if
     * `openSideBySideDiffs` is set. Returns whether it did.
     * @public
     * @param {string} fileUri
     * @return {!Promise<boolean>}
     */
    async revealPendingDiff(fileUri) {
        if (!this.hasPendingSideBySideReview(fileUri)) {
            return false;
        }
        await this.revealDocument((0, utils_1.normalizeUri)(fileUri), true);
        return true;
    }
    /**
     * @private
     * @param {string} uriStr
     * @param {boolean=} preview
     * @return {!Promise<void>}
     */
    async revealDocument(uriStr, preview = true) {
        try {
            if (this.renderer?.revealDocument) {
                await this.renderer.revealDocument(uriStr, preview);
                return;
            }
            /** @type {!tsickle_vscode_3.Uri} */
            const uri = vscode.Uri.parse(uriStr);
            if ((0, utils_1.isNotebook)(uriStr)) {
                /** @type {!tsickle_vscode_3.NotebookDocument} */
                const doc = await vscode.workspace.openNotebookDocument(uri);
                await vscode.window.showNotebookDocument(doc, { preview });
            }
            else {
                /** @type {!tsickle_vscode_3.TextDocument} */
                const doc = await vscode.workspace.openTextDocument(uri);
                await vscode.window.showTextDocument(doc, { preview });
            }
        }
        catch (e) {
            console.error(`[Jetski] Failed to reveal file ${uriStr}`, e);
        }
    }
    /**
     * @private
     * @param {!tsickle_vscode_3.Uri} uri
     * @return {!Promise<void>}
     */
    async forceResolveFromFile(uri) {
        try {
            if ((0, utils_1.hasCiderForceResolveFromFile)()) {
                await cider_1.cider.ai.forceResolveFromFile(uri);
                return;
            }
            // Inline: registerDiff sets the buffer; skip focus-stealing revert.
            if (this.renderer?.type === 'inline' && !(0, utils_1.isNotebook)(uri.toString())) {
                return;
            }
            /** @type {!tsickle_vscode_3.TextDocument} */
            const doc = await vscode.workspace.openTextDocument(uri);
            if (doc.isDirty) {
                await vscode.window.showTextDocument(doc, {
                    preview: false,
                    preserveFocus: false,
                });
                await vscode.commands.executeCommand('workbench.action.files.revert');
            }
        }
        catch (e) {
            console.warn(`[Jetski] forceResolveFromFile failed for ${uri.toString()}`, e);
        }
    }
}
exports.AgentEditManager = AgentEditManager;
/* istanbul ignore if */
if (false) {
    /**
     * @type {(undefined|!tsickle_diff_zone_renderer_5.DiffZoneRenderer)}
     * @private
     */
    AgentEditManager.prototype.renderer;
    /**
     * @const {!Map<string, {originalContents: string, modifiedContents: string, rawModifiedContents: (undefined|string), hunkHashes: (undefined|!Array<string>), conversationId: (undefined|string), turnIndex: (undefined|number)}>}
     * @private
     */
    AgentEditManager.prototype.activeDiffZoneDetails;
    /**
     * Prior-turn texts per URI; stale buffers aren't formatter edits.
     * @const {!Map<string, !Set<string>>}
     * @private
     */
    AgentEditManager.prototype.priorTurnContents;
    /**
     * Per-file insertion/deletion counts.
     * @const {!Map<string, {numLinesInserted: number, numLinesDeleted: number}>}
     * @private
     */
    AgentEditManager.prototype.fileDiffStats;
    /**
     * @const {!tsickle_vscode_3.EventEmitter<!Array<!FileAgentEditState>>}
     * @private
     */
    AgentEditManager.prototype.onDidChangeDiffZonesEmitter;
    /**
     * @const {!tsickle_vscode_3.Event<!Array<!FileAgentEditState>>}
     * @public
     */
    AgentEditManager.prototype.onDidChangeDiffZones;
    /**
     * Rejected changes to mark in the read-only (Resolved) diff last opened for
     * each file, per normalized file URI. Only set when that diff has a
     * rejected change.
     * @const {!Map<string, !ResolvedDiffMarks>}
     * @private
     */
    AgentEditManager.prototype.resolvedDiffMarks;
    /**
     * @const {!tsickle_vscode_3.EventEmitter<void>}
     * @private
     */
    AgentEditManager.prototype.onDidChangeResolvedDiffMarksEmitter;
    /**
     * Fires when a `getResolvedDiffMarks` result may have changed.
     * @const {!tsickle_vscode_3.Event<void>}
     * @public
     */
    AgentEditManager.prototype.onDidChangeResolvedDiffMarks;
    /**
     * Tracks files currently being processed. Maps file URI to a Promise that
     * resolves when processing completes. Concurrent callers wait for the
     * in-flight processing to finish instead of being silently dropped.
     * @const {!Map<string, !Promise<void>>}
     * @private
     */
    AgentEditManager.prototype.processingFiles;
    /**
     * @type {(undefined|!Promise<void>)}
     * @private
     */
    AgentEditManager.prototype.globalProcessingLock;
    /**
     * @const {!tsickle_hunk_storage_6.HunkStorage}
     * @private
     */
    AgentEditManager.prototype.hunkStorage;
    /**
     * @type {boolean}
     * @private
     */
    AgentEditManager.prototype.autoAcceptOnChat;
    /**
     * @type {number}
     * @private
     */
    AgentEditManager.prototype.ageOutThreshold;
    /**
     * @const {boolean}
     * @private
     */
    AgentEditManager.prototype.undoableUserResolutions;
    /**
     * @const {boolean}
     * @private
     */
    AgentEditManager.prototype.openSideBySideDiffs;
    /**
     * @const {boolean}
     * @private
     */
    AgentEditManager.prototype.readOnlyNavigationWithoutOpenReview;
    /**
     * @const {!tsickle_vscode_3.Memento}
     * @private
     */
    AgentEditManager.prototype.workspaceState;
    /**
     * While restoring, skip persisting a partial list of reviews.
     * @type {boolean}
     * @private
     */
    AgentEditManager.prototype.isRestoringPendingEdits;
    /**
     * Files being restored; their stored decisions are already applied.
     * @const {!Set<string>}
     * @private
     */
    AgentEditManager.prototype.restoringUris;
    /**
     * Settles once the previous window's pending reviews are reopened.
     * @const {!Promise<void>}
     * @public
     */
    AgentEditManager.prototype.restoredPendingEdits;
    /**
     * @const {function(): (undefined|!tsickle_diff_zone_renderer_5.DiffZoneRenderer)}
     * @private
     */
    AgentEditManager.prototype.createDiffZoneRenderer;
    /**
     * @type {(undefined|function(string, string, string, (undefined|boolean)=, (undefined|string)=): !Promise<void>)}
     * @private
     */
    AgentEditManager.prototype.openStandardDiff;
}
/**
 * Counts the lines an edit inserts and deletes, as shown in the overview.
 * @param {string} originalContents
 * @param {string} modifiedContents
 * @return {{numLinesInserted: number, numLinesDeleted: number}}
 */
function countDiffLines(originalContents, modifiedContents) {
    /** @type {number} */
    let numLinesInserted = 0;
    /** @type {number} */
    let numLinesDeleted = 0;
    for (const hunk of (0, diff_helper_1.getDiffHunks)(originalContents, modifiedContents)) {
        for (const line of hunk.lines) {
            if (line.startsWith('+'))
                numLinesInserted++;
            if (line.startsWith('-'))
                numLinesDeleted++;
        }
    }
    return { numLinesInserted, numLinesDeleted };
}
