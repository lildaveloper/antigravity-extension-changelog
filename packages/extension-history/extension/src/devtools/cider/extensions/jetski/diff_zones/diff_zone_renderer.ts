/**
 * @fileoverview added by tsickle
 * Generated from: devtools/cider/extensions/jetski/diff_zones/diff_zone_renderer.ts
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
goog.module('google3.devtools.cider.extensions.jetski.diff_zones.diff_zone_renderer');
var module = module || { id: 'devtools/cider/extensions/jetski/diff_zones/diff_zone_renderer.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_cider_1 = goog.requireType("google3.devtools.cider.extensions.cider");
const tsickle_cell_2 = goog.requireType("google3.research.colab.frontend.common.nbformat.v4.cell");
const tsickle_notebook_3 = goog.requireType("google3.research.colab.frontend.common.nbformat.v4.notebook");
const tsickle_vscode_4 = goog.requireType("vscode");
const tsickle_agent_edit_manager_5 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.agent_edit_manager");
const tsickle_hunk_storage_6 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.hunk_storage");
const tsickle_cell_7 = goog.requireType("google3.research.colab.frontend.common.nbformat.colab.cell");
const cider_1 = goog.require('google3.devtools.cider.extensions.cider');
const cell_1 = goog.require('google3.research.colab.frontend.common.nbformat.v4.cell');
const vscode = goog.require('vscode'); // from //devtools/cider/extensions:vscode
/**
 * Event payload emitted when a single diff hunk or an entire file is resolved by
 * the user in the UI.
 * @record
 */
function HunkResolutionEvent() { }
exports.HunkResolutionEvent = HunkResolutionEvent;
/* istanbul ignore if */
if (false) {
    /**
     * @type {string}
     * @public
     */
    HunkResolutionEvent.prototype.fileUri;
    /**
     * @type {(undefined|number)}
     * @public
     */
    HunkResolutionEvent.prototype.hunkIndex;
    /**
     * @type {(undefined|string)}
     * @public
     */
    HunkResolutionEvent.prototype.hunkHash;
    /**
     * @type {boolean}
     * @public
     */
    HunkResolutionEvent.prototype.accept;
    /**
     * @type {(undefined|boolean)}
     * @public
     */
    HunkResolutionEvent.prototype.final;
    /**
     * Set after Ctrl+Z / Ctrl+Y: every change still pending in the review.
     * @type {(undefined|!Array<string>)}
     * @public
     */
    HunkResolutionEvent.prototype.pendingHunkHashes;
}
/**
 * Summary info of a diff hunk used for line count stats and hashing.
 * @record
 */
function DiffHunkInfo() { }
exports.DiffHunkInfo = DiffHunkInfo;
/* istanbul ignore if */
if (false) {
    /**
     * @type {(undefined|number)}
     * @public
     */
    DiffHunkInfo.prototype.startLine;
    /**
     * @type {!ReadonlyArray<string>}
     * @public
     */
    DiffHunkInfo.prototype.insertions;
    /**
     * @type {!ReadonlyArray<string>}
     * @public
     */
    DiffHunkInfo.prototype.deletions;
}
/**
 * Result returned by rendering a text edit.
 * @record
 */
function RenderTextEditResult() { }
exports.RenderTextEditResult = RenderTextEditResult;
/* istanbul ignore if */
if (false) {
    /**
     * @type {boolean}
     * @public
     */
    RenderTextEditResult.prototype.added;
    /**
     * @type {boolean}
     * @public
     */
    RenderTextEditResult.prototype.fullyResolved;
    /**
     * @type {!Array<!DiffHunkInfo>}
     * @public
     */
    RenderTextEditResult.prototype.hunks;
    /**
     * @type {(undefined|!Array<string>)}
     * @public
     */
    RenderTextEditResult.prototype.hunkHashes;
}
/**
 * Result returned by rendering a notebook edit.
 * @record
 */
function RenderNotebookEditResult() { }
exports.RenderNotebookEditResult = RenderNotebookEditResult;
/* istanbul ignore if */
if (false) {
    /**
     * @type {boolean}
     * @public
     */
    RenderNotebookEditResult.prototype.added;
    /**
     * @type {boolean}
     * @public
     */
    RenderNotebookEditResult.prototype.fullyResolved;
    /**
     * @type {!Array<!DiffHunkInfo>}
     * @public
     */
    RenderNotebookEditResult.prototype.hunks;
    /**
     * @type {(undefined|!Array<string>)}
     * @public
     */
    RenderNotebookEditResult.prototype.hunkHashes;
}
/**
 * Callback type for checking stored hunk resolutions.
 * @typedef {function(string): (undefined|!tsickle_hunk_storage_6.HunkResolutionAction)}
 */
exports.StoredResolutionResolver;
/**
 * A range of whole lines, 0-based and inclusive.
 * @record
 */
function LineRange() { }
exports.LineRange = LineRange;
/* istanbul ignore if */
if (false) {
    /**
     * @type {number}
     * @public
     */
    LineRange.prototype.startLine;
    /**
     * @type {number}
     * @public
     */
    LineRange.prototype.endLine;
}
/**
 * Where the rejected changes are in a read-only (Resolved) diff.
 * @record
 */
function RejectedChanges() { }
exports.RejectedChanges = RejectedChanges;
/* istanbul ignore if */
if (false) {
    /**
     * The added lines of each rejected change, in the agent's proposal (the
     * diff's right side). The user threw these lines away.
     * @type {!Array<!LineRange>}
     * @public
     */
    RejectedChanges.prototype.modifiedRanges;
    /**
     * The deleted lines of each rejected change that only deletes lines, in the
     * original (the diff's left side). The user kept these lines.
     * @type {!Array<!LineRange>}
     * @public
     */
    RejectedChanges.prototype.originalRanges;
}
/**
 * How the read-only diff of a resolved edit describes the saved decisions.
 * The diff itself always shows the agent's proposal.
 * @record
 */
function ResolvedDiffView() { }
exports.ResolvedDiffView = ResolvedDiffView;
/* istanbul ignore if */
if (false) {
    /**
     * Shown in the title, e.g. "Resolved: Rejected" or
     * "Resolved: 2 of 3 accepted".
     * @type {string}
     * @public
     */
    ResolvedDiffView.prototype.outcomeLabel;
    /**
     * Set when at least one change was rejected, so it can be marked.
     * @type {(undefined|!RejectedChanges)}
     * @public
     */
    ResolvedDiffView.prototype.rejectedChanges;
}
/**
 * Abstract interface for rendering and interacting with diff zones across different
 * environments (e.g., Cider native DiffZones, VS Code side-by-side diffs, VS Code inline decorations, or No-op).
 * @record
 * tsickle: dropped extends: interface cannot extend/implement class
 */
function DiffZoneRenderer() { }
exports.DiffZoneRenderer = DiffZoneRenderer;
/* istanbul ignore if */
if (false) {
    /**
     * @const {string}
     * @public
     */
    DiffZoneRenderer.prototype.type;
    /**
     * Renders a proposed text edit in the editor.
     *
     * @public
     * @param {!tsickle_vscode_4.Uri} uri Target file URI.
     * @param {!tsickle_vscode_4.TextDocument} document The opened TextDocument.
     * @param {!tsickle_agent_edit_manager_5.AddAgentEditMessage} message Edit message options.
     * @param {function(string): (undefined|!tsickle_hunk_storage_6.HunkResolutionAction)} getStoredResolution Callback to query previously stored hunk resolutions.
     * @param {function(!HunkResolutionEvent): !Promise<void>} onHunkResolved Callback triggered when a hunk is resolved interactively in the UI.
     * @return {!Promise<!RenderTextEditResult>}
     */
    DiffZoneRenderer.prototype.renderTextEdit = function (uri, document, message, getStoredResolution, onHunkResolved) { };
    /**
     * Renders a proposed notebook edit in the editor.
     *
     * @public
     * @param {!tsickle_vscode_4.Uri} uri Target notebook file URI.
     * @param {!tsickle_vscode_4.NotebookDocument} document The opened NotebookDocument.
     * @param {!tsickle_agent_edit_manager_5.AddAgentEditMessage} message Edit message options.
     * @param {function(string): (undefined|!tsickle_hunk_storage_6.HunkResolutionAction)} getStoredResolution Callback to query previously stored hunk resolutions.
     * @param {function(!HunkResolutionEvent): !Promise<void>} onHunkResolved Callback triggered when a hunk is resolved interactively in the UI.
     * @return {!Promise<!RenderNotebookEditResult>}
     */
    DiffZoneRenderer.prototype.renderNotebookEdit = function (uri, document, message, getStoredResolution, onHunkResolved) { };
    /**
     * Focuses a specific hunk or moves focus ('next'/'previous') in the active editor for the given file.
     * @public
     * @param {string} fileUri
     * @param {(number|string)} target
     * @return {void}
     */
    DiffZoneRenderer.prototype.focusHunk = function (fileUri, target) { };
    /**
     * Focuses an existing diff zone for a file that is already rendered.
     * @public
     * @param {string} fileUri
     * @return {void}
     */
    DiffZoneRenderer.prototype.focusExistingZone = function (fileUri) { };
    /**
     * Accepts the currently focused diff hunk in the given file.
     * @public
     * @param {string} fileUri
     * @return {!Promise<void>}
     */
    DiffZoneRenderer.prototype.acceptFocusedHunk = function (fileUri) { };
    /**
     * Rejects the currently focused diff hunk in the given file.
     * @public
     * @param {string} fileUri
     * @return {!Promise<void>}
     */
    DiffZoneRenderer.prototype.rejectFocusedHunk = function (fileUri) { };
    /**
     * Closes and resolves the active diff zone for a specific file (accepting or reverting changes).
     * `undoable` lets Ctrl+Z reopen the review (inline only).
     * @public
     * @param {string} fileUri
     * @param {boolean} accept
     * @param {(undefined|{undoable: (undefined|boolean)})=} options
     * @return {!Promise<boolean>}
     */
    DiffZoneRenderer.prototype.closeDiffZone = function (fileUri, accept, options) { };
    /**
     * Disposes a file's diff zone without saving or reverting disk.
     * @public
     * @param {string} fileUri
     * @return {!Promise<void>}
     */
    DiffZoneRenderer.prototype.disposeDiffZone = function (fileUri) { };
    /**
     * Whether the user has manually edited the active diff zone buffer.
     * @public
     * @param {string} fileUri
     * @return {boolean}
     */
    DiffZoneRenderer.prototype.hasUserEditedZone = function (fileUri) { };
    /**
     * Disposes all active diff renderers across all files without resolving or saving.
     * @public
     * @return {!Promise<void>}
     */
    DiffZoneRenderer.prototype.disposeAll = function () { };
    /**
     * Disposes on shutdown without editing or saving files.
     * @public
     * @return {void}
     */
    DiffZoneRenderer.prototype.disposeForShutdown = function () { };
    /**
     * Optional provider for original file contents in virtual document schemas (e.g. side-by-side diff view).
     * @public
     * @param {!tsickle_vscode_4.Uri} uri
     * @return {(undefined|string)}
     */
    DiffZoneRenderer.prototype.provideTextDocumentContent = function (uri) { };
    /**
     * Optional notification called when active agent edits or diff zone state changes.
     * @public
     * @return {void}
     */
    DiffZoneRenderer.prototype.onAgentEditsChanged = function () { };
    /**
     * Optionally reveals/opens the document or diff view in the editor.
     * @public
     * @param {string} fileUri
     * @param {(undefined|boolean)=} preview
     * @return {!Promise<void>}
     */
    DiffZoneRenderer.prototype.revealDocument = function (fileUri, preview) { };
    /**
     * Closes the review tabs of `fileUri` (side-by-side only). Returns whether
     * any was open.
     * @public
     * @param {string} fileUri
     * @return {!Promise<boolean>}
     */
    DiffZoneRenderer.prototype.closeReviewTabs = function (fileUri) { };
    /**
     * Describes the read-only diff of a resolved edit from the decisions saved
     * for this renderer's hunks (`getStoredResolution` looks up a hunk hash as
     * computed by `renderTextEdit`). The diff always shows the agent's
     * proposal; this provides the title's label and where the rejected changes
     * are. Returns undefined when the outcome is unknown; the default
     * "Resolved" title is then used.
     * @public
     * @param {string} originalContents
     * @param {string} modifiedContents
     * @param {function(string): (undefined|!tsickle_hunk_storage_6.HunkResolutionAction)} getStoredResolution
     * @return {(undefined|!ResolvedDiffView)}
     */
    DiffZoneRenderer.prototype.getResolvedDiffView = function (originalContents, modifiedContents, getStoredResolution) { };
}
/**
 * Counts inserted/deleted lines between original and modified content strings.
 * @param {string} original
 * @param {string} modified
 * @return {{numLinesInserted: number, numLinesDeleted: number}}
 */
function computeLineCounts(original, modified) {
    /** @type {!Array<string>} */
    const originalLines = original === '' ? [] : original.split(/\r?\n/);
    /** @type {!Array<string>} */
    const modifiedLines = modified === '' ? [] : modified.split(/\r?\n/);
    /** @type {number} */
    const diff = modifiedLines.length - originalLines.length;
    return {
        numLinesInserted: Math.max(0, diff),
        numLinesDeleted: Math.max(0, -diff),
    };
}
exports.computeLineCounts = computeLineCounts;
/**
 * Counts inserted/deleted lines from notebook diff hunks.
 * @param {!Array<!google3$devtools$cider$webclient$cider.cider.ai.NotebookDiffHunk>} hunks
 * @return {{numLinesInserted: number, numLinesDeleted: number}}
 */
function computeNotebookDiffStats(hunks) {
    /** @type {number} */
    let numLinesInserted = 0;
    /** @type {number} */
    let numLinesDeleted = 0;
    for (const hunk of hunks) {
        if (hunk.type === cider_1.cider.ai.NotebookDiffHunkType.Modified) {
            /** @type {string} */
            const originalText = hunk.deletions.join('\n');
            /** @type {string} */
            const modifiedText = hunk.insertions.join('\n');
            /** @type {{numLinesInserted: number, numLinesDeleted: number}} */
            const counts = computeLineCounts(originalText, modifiedText);
            numLinesInserted += counts.numLinesInserted;
            numLinesDeleted += counts.numLinesDeleted;
        }
        else {
            numLinesInserted += hunk.insertions.reduce((/**
             * @param {number} sum
             * @param {string} v
             * @return {number}
             */
            (sum, v) => sum + (v === '' ? 0 : v.split(/\r?\n/).length)), 0);
            numLinesDeleted += hunk.deletions.reduce((/**
             * @param {number} sum
             * @param {string} v
             * @return {number}
             */
            (sum, v) => sum + (v === '' ? 0 : v.split(/\r?\n/).length)), 0);
        }
    }
    return { numLinesInserted, numLinesDeleted };
}
exports.computeNotebookDiffStats = computeNotebookDiffStats;
/**
 * Parses raw Colab notebook JSON content string into NotebookCellSnapshots. Returns undefined if parsing fails.
 * @param {string} originalContents
 * @return {(undefined|!Array<!google3$devtools$cider$webclient$cider.cider.ai.NotebookCellSnapshot>)}
 */
function parseNotebookCells(originalContents) {
    if (!originalContents)
        return [];
    try {
        /** @type {!tsickle_notebook_3.Notebook} */
        const notebook = (/** @type {!tsickle_notebook_3.Notebook} */ (JSON.parse(originalContents)));
        /** @type {!Array<!tsickle_cell_2.Cell>} */
        const cells = notebook.cells ?? [];
        return cells.map((/**
         * @param {!tsickle_cell_2.Cell} cell
         * @return {{cellKind: !tsickle_vscode_4.NotebookCellKind, language: string, value: string, metadata: (undefined|{name: (undefined|string), tags: (undefined|!Array<string>), id: (undefined|string), colab: (undefined|!tsickle_cell_7.Metadata), imported_from: (undefined|!tsickle_cell_7.ImportedFrom), colab_type: (undefined|!tsickle_cell_7.CellType), nbgrader: (undefined|!NbGrader), editable: (undefined|boolean)})}}
         */
        (cell) => {
            /** @type {(undefined|string)} */
            const cellId = cell.id ?? cell.metadata?.id;
            /** @type {string} */
            const value = typeof cell.source === 'string'
                ? cell.source
                : (cell.source ?? []).join('');
            /** @type {!tsickle_vscode_4.NotebookCellKind} */
            const cellKind = cell.cell_type === cell_1.CellType.CODE
                ? vscode.NotebookCellKind.Code
                : vscode.NotebookCellKind.Markup;
            /** @type {string} */
            const language = cell.cell_type === cell_1.CellType.CODE ? 'python' : 'markdown';
            return {
                cellKind,
                language,
                value,
                metadata: cell.metadata != null || cellId != null
                    ? {
                        ...cell.metadata,
                        ...(cellId != null ? { 'id': cellId } : {}),
                    }
                    : undefined,
            };
        }));
    }
    catch (e) {
        console.error('[Jetski] Failed to parse notebook contents', e);
        return undefined;
    }
}
exports.parseNotebookCells = parseNotebookCells;
/**
 * Converts a NotebookCellSnapshot to NotebookCellData for workspace edits.
 * @param {!google3$devtools$cider$webclient$cider.cider.ai.NotebookCellSnapshot} snapshot
 * @return {!tsickle_vscode_4.NotebookCellData}
 */
function snapshotToCellData(snapshot) {
    /** @type {!tsickle_vscode_4.NotebookCellData} */
    const cellData = new vscode.NotebookCellData(snapshot.cellKind, snapshot.value, snapshot.language);
    cellData.metadata = snapshot.metadata;
    return cellData;
}
exports.snapshotToCellData = snapshotToCellData;
/**
 * Finds the active or visible notebook editor for the given file URI.
 * @param {string} fileUri
 * @return {(undefined|!tsickle_vscode_4.NotebookEditor)}
 */
function getNotebookEditor(fileUri) {
    /** @type {(undefined|!tsickle_vscode_4.NotebookEditor)} */
    const active = vscode.window.activeNotebookEditor;
    if (active && active.notebook.uri.toString() === fileUri) {
        return active;
    }
    return vscode.window.visibleNotebookEditors.find((/**
     * @param {!tsickle_vscode_4.NotebookEditor} e
     * @return {boolean}
     */
    (e) => e.notebook.uri.toString() === fileUri));
}
exports.getNotebookEditor = getNotebookEditor;
