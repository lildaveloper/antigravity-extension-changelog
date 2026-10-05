/**
 * @fileoverview added by tsickle
 * Generated from: devtools/cider/extensions/jetski/diff_zones/inline_diff_manager.ts
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
goog.module('google3.devtools.cider.extensions.jetski.diff_zones.inline_diff_manager');
var module = module || { id: 'devtools/cider/extensions/jetski/diff_zones/inline_diff_manager.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_cider_1 = goog.requireType("google3.devtools.cider.extensions.cider");
const tsickle_vscode_2 = goog.requireType("vscode");
const tsickle_diff_helper_3 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.diff_helper");
const tsickle_hunk_storage_4 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.hunk_storage");
const tsickle_inline_diff_change_range_5 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.inline_diff_change_range");
const tsickle_inline_diff_changes_6 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.inline_diff_changes");
const tsickle_inline_diff_range_tracker_7 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.inline_diff_range_tracker");
const tsickle_utils_8 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.utils");
const cider_1 = goog.require('google3.devtools.cider.extensions.cider');
const vscode = goog.require('vscode'); // from //devtools/cider/extensions:vscode
// from //devtools/cider/extensions:vscode
const diff_helper_1 = goog.require('google3.devtools.cider.extensions.jetski.diff_zones.diff_helper');
const hunk_storage_1 = goog.require('google3.devtools.cider.extensions.jetski.diff_zones.hunk_storage');
const inline_diff_change_range_1 = goog.require('google3.devtools.cider.extensions.jetski.diff_zones.inline_diff_change_range');
const inline_diff_changes_1 = goog.require('google3.devtools.cider.extensions.jetski.diff_zones.inline_diff_changes');
const inline_diff_range_tracker_1 = goog.require('google3.devtools.cider.extensions.jetski.diff_zones.inline_diff_range_tracker');
const utils_1 = goog.require('google3.devtools.cider.extensions.jetski.diff_zones.utils');
/**
 * String representation of a vscode.Uri (via uri.toString())
 * @typedef {string}
 */
var FileUriStr;
/**
 * Lines of `text`, for laying out ranges on text that isn't in the buffer.
 * @param {string} text
 * @return {!tsickle_vscode_2.TextDocument}
 */
function textDocumentOf(text) {
    /** @type {!Array<string>} */
    const lines = text === '' ? [] : text.split(/\r?\n/);
    return (/** @type {!tsickle_vscode_2.TextDocument} */ ((/** @type {?} */ ({
        lineCount: lines.length,
        lineAt: (/**
         * @param {number} line
         * @return {{text: string}}
         */
        (line) => ({ text: lines[line] })),
    }))));
}
/**
 * Remaps ranges to a buffer whose deleted lines were removed.
 * @param {!Array<!tsickle_inline_diff_change_range_5.InlineDiffChangeRange>} ranges
 * @return {!Array<!tsickle_inline_diff_change_range_5.InlineDiffChangeRange>}
 */
function hideDeletionLines(ranges) {
    /** @type {function(!tsickle_vscode_2.Range): number} */
    const lineCount = (/**
     * @param {!tsickle_vscode_2.Range} r
     * @return {number}
     */
    (r) => r.end.line - r.start.line + 1);
    return ranges.map((/**
     * @param {!tsickle_inline_diff_change_range_5.InlineDiffChangeRange} r
     * @return {!tsickle_inline_diff_change_range_5.InlineDiffChangeRange}
     */
    (r) => {
        /** @type {(undefined|!tsickle_vscode_2.Range)} */
        const del = r.deletionRange;
        // Deleted lines of earlier hunks shift this hunk up.
        /** @type {number} */
        const removed = ranges.reduce((/**
         * @param {number} sum
         * @param {!tsickle_inline_diff_change_range_5.InlineDiffChangeRange} o
         * @return {number}
         */
        (sum, o) => {
            /** @type {(undefined|!tsickle_vscode_2.Range)} */
            const d = o.deletionRange;
            return d && d.end.line < r.start ? sum + lineCount(d) : sum;
        }), 0);
        /** @type {function(number): number} */
        const shift = (/**
         * @param {number} line
         * @return {number}
         */
        (line) => line - removed - (del && line > del.end.line ? lineCount(del) : 0));
        /** @type {!tsickle_inline_diff_change_range_5.InlineDiffChangeRange} */
        const out = inline_diff_change_range_1.InlineDiffChangeRange.clone(r);
        if (r.additionRange) {
            out.additionStart = shift(r.additionRange.start.line);
            out.additionEnd = shift(r.additionRange.end.line);
            out.additionRange = new vscode.Range(out.additionStart, 0, out.additionEnd, r.additionRange.end.character);
            out.start = out.additionStart;
            out.end = out.additionEnd;
        }
        else {
            // Removed lines are gone; anchor to the line that replaced them.
            out.start = del ? del.start.line - removed : shift(r.start);
            out.end = out.start;
        }
        out.deletionRange = undefined;
        out.deletionStart = -1;
        out.deletionEnd = -1;
        return out;
    }));
}
/**
 * Rebuilds the original text from a buffer whose deleted lines are hidden:
 * drops each change's added lines and puts its removed lines back.
 * @param {string} text
 * @param {!Array<!tsickle_inline_diff_change_range_5.InlineDiffChangeRange>} ranges
 * @return {string}
 */
function restoreHiddenOriginal(text, ranges) {
    /** @type {string} */
    const eol = text.includes('\r\n') ? '\r\n' : '\n';
    /** @type {!Array<string>} */
    const lines = text === '' ? [] : text.split(/\r?\n/);
    /** @type {!Set<number>} */
    const added = new Set();
    /** @type {!Map<number, !Array<string>>} */
    const removedAt = new Map();
    for (const r of ranges) {
        /** @type {(undefined|!tsickle_vscode_2.Range)} */
        const add = r.additionRange;
        for (let l = add?.start.line ?? 0; add && l <= add.end.line; l++) {
            added.add(l);
        }
        if (r.deletedLinesCount > 0) {
            /** @type {number} */
            const at = Math.min(add ? add.start.line : r.start, lines.length);
            /** @type {!Array<string>} */
            const removed = removedAt.get(at) ?? [];
            removed.push(...r.originalText.split(/\r?\n/));
            removedAt.set(at, removed);
        }
    }
    /** @type {!Array<string>} */
    const out = [];
    for (let l = 0; l <= lines.length; l++) {
        out.push(...(removedAt.get(l) ?? []));
        if (l < lines.length && !added.has(l))
            out.push(lines[l]);
    }
    return out.join(eol);
}
/**
 * Edits that drop the deleted (red) lines of `ranges` from `doc`, and the text
 * they leave. Only those lines are touched, so the cursor and scroll stay put.
 * @param {!tsickle_vscode_2.TextDocument} doc
 * @param {!Array<!tsickle_inline_diff_change_range_5.InlineDiffChangeRange>} ranges
 * @return {(undefined|{edits: !Array<!tsickle_vscode_2.TextEdit>, text: string})}
 */
function deletedLinesRemoval(doc, ranges) {
    /** @type {string} */
    const text = doc.getText();
    /** @type {!Array<string>} */
    const lines = text.split('\n');
    /** @type {!Set<number>} */
    const drop = new Set();
    for (const r of ranges) {
        /** @type {(undefined|!tsickle_vscode_2.Range)} */
        const d = r.deletionRange;
        for (let l = d?.start.line ?? 0; d && l <= d.end.line; l++) {
            if (l < lines.length)
                drop.add(l);
        }
    }
    if (drop.size === 0)
        return undefined;
    /** @type {!Array<number>} */
    const lineStarts = [];
    /** @type {number} */
    let offset = 0;
    for (const line of lines) {
        lineStarts.push(offset);
        offset += line.length + 1;
    }
    // [from, to) offsets of each run of deleted lines, with one line break.
    /** @type {!Array<!Array<?>>} */
    const spans = [];
    for (let l = 0; l < lines.length; l++) {
        if (!drop.has(l))
            continue;
        /** @type {number} */
        let last = l;
        while (drop.has(last + 1))
            last++;
        /** @type {number} */
        let from = lineStarts[l];
        /** @type {number} */
        let to = text.length;
        if (last + 1 < lines.length) {
            to = lineStarts[last + 1];
        }
        else if (l > 0) {
            // Runs to the end of the file: drop the line break before it instead.
            from = lineStarts[l] - 1;
            if (text[from - 1] === '\r')
                from--;
        }
        spans.push([from, to]);
        l = last;
    }
    /** @type {string} */
    let kept = '';
    /** @type {number} */
    let prev = 0;
    for (const [from__tsickle_destructured_1, to__tsickle_destructured_2] of spans) {
        const from = /** @type {number} */ (from__tsickle_destructured_1);
        const to = /** @type {number} */ (to__tsickle_destructured_2);
        kept += text.slice(prev, from);
        prev = to;
    }
    kept += text.slice(prev);
    /** @type {!Array<!tsickle_vscode_2.TextEdit>} */
    const edits = spans.map((/**
     * @param {!Array<?>} __0
     * @return {!tsickle_vscode_2.TextEdit}
     */
    ([from__tsickle_destructured_3, to__tsickle_destructured_4]) => {
        let from = /** @type {number} */ (from__tsickle_destructured_3);
        let to = /** @type {number} */ (to__tsickle_destructured_4);
        return (vscode.TextEdit.replace(new vscode.Range(doc.positionAt(from), doc.positionAt(to)), ''));
    }));
    return { edits, text: kept };
}
/**
 * Represents an active inline diff session for a document.
 * @record
 */
function ActiveDiff() { }
exports.ActiveDiff = ActiveDiff;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!tsickle_vscode_2.Uri}
     * @public
     */
    ActiveDiff.prototype.uri;
    /**
     * The baseline original text of the file before any edits were made.
     * @type {string}
     * @public
     */
    ActiveDiff.prototype.originalText;
    /**
     * The final target modified text generated by the agent.
     * @type {string}
     * @public
     */
    ActiveDiff.prototype.modifiedText;
    /**
     * The current intermediate text buffer in the editor, updating as hunks are accepted or rejected.
     * @type {string}
     * @public
     */
    ActiveDiff.prototype.combinedText;
    /**
     * @type {!tsickle_inline_diff_changes_6.InlineDiffChanges}
     * @public
     */
    ActiveDiff.prototype.changes;
    /**
     * @type {boolean}
     * @public
     */
    ActiveDiff.prototype.hasBeenShown;
    /**
     * @type {(undefined|boolean)}
     * @public
     */
    ActiveDiff.prototype.hasUserEdits;
    /**
     * Agent text written back after an auto-save; VS Code reloads it next.
     * @type {(undefined|string)}
     * @public
     */
    ActiveDiff.prototype.pendingReloadText;
    /**
     * The deleted lines are no longer in the buffer (after an auto-save).
     * @type {(undefined|boolean)}
     * @public
     */
    ActiveDiff.prototype.deletionsHidden;
    /**
     * The buffer an auto-save's pre-save edit leaves once it drops them.
     * @type {(undefined|string)}
     * @public
     */
    ActiveDiff.prototype.pendingHideText;
    /**
     * The buffer when the review started; Ctrl+Z stops here.
     * @type {(undefined|string)}
     * @public
     */
    ActiveDiff.prototype.stagedText;
    /**
     * Whether the buffer was unsaved, i.e. closing its tab asks to save. A
     * revert to disk (as "Don't Save" does before the tab closes) keeps it.
     * @type {(undefined|boolean)}
     * @public
     */
    ActiveDiff.prototype.lastKnownDirty;
    /**
     * Texts VS Code or this review saved; any other disk text is outside.
     * @type {(undefined|!Set<string>)}
     * @public
     */
    ActiveDiff.prototype.savedTexts;
}
/**
 * @record
 */
function DiffStyleGroup() { }
/* istanbul ignore if */
if (false) {
    /**
     * @type {!tsickle_vscode_2.TextEditorDecorationType}
     * @public
     */
    DiffStyleGroup.prototype.base;
    /**
     * @type {!tsickle_vscode_2.TextEditorDecorationType}
     * @public
     */
    DiffStyleGroup.prototype.single;
    /**
     * @type {!tsickle_vscode_2.TextEditorDecorationType}
     * @public
     */
    DiffStyleGroup.prototype.top;
    /**
     * @type {!tsickle_vscode_2.TextEditorDecorationType}
     * @public
     */
    DiffStyleGroup.prototype.mid;
    /**
     * @type {!tsickle_vscode_2.TextEditorDecorationType}
     * @public
     */
    DiffStyleGroup.prototype.bottom;
}
/**
 * @record
 */
function DiffStyles() { }
/* istanbul ignore if */
if (false) {
    /**
     * @type {!DiffStyleGroup}
     * @public
     */
    DiffStyles.prototype.add;
    /**
     * @type {!DiffStyleGroup}
     * @public
     */
    DiffStyles.prototype.delete;
}
/**
 * Options for InlineDiffManager.
 * @record
 */
function InlineDiffManagerOptions() { }
exports.InlineDiffManagerOptions = InlineDiffManagerOptions;
/* istanbul ignore if */
if (false) {
    /**
     * Returns true to review `document` without staging the deleted lines in its
     * buffer, e.g. when Auto Save would write them to disk. Removed lines then
     * show in the CodeLens with a hover.
     * @type {(undefined|function(!tsickle_vscode_2.TextDocument): boolean)}
     * @public
     */
    InlineDiffManagerOptions.prototype.hideDeletedLines;
}
/**
 * Manages in-editor inline diff reviews by temporarily editing the file buffer,
 * coloring line ranges, and overlaying Accept/Reject CodeLenses.
 * @extends {tsickle_vscode_2.Disposable}
 */
class InlineDiffManager {
    /**
     * @public
     * @param {!InlineDiffManagerOptions=} options
     */
    constructor(options = {}) {
        this.options = options;
        this.activeDiffs = new Map();
        // URIs currently undergoing internal saves/reverts to prevent event loops.
        this.internalSaveUris = new Set();
        // URIs with pending manual save (Cmd/Ctrl+S) to finalize as accepted on didSave.
        this.pendingManualSaveUris = new Set();
        // Disk contents just before an auto-save, consumed by didSave.
        this.preAutoSaveDiskText = new Map();
        // In-flight finalizations by URI; tab-close handlers wait on these.
        this.finalizingUris = new Map();
        this.disposables = [];
        this.isResolvingHunk = false;
        this.onDidFinalizeFileEmitter = new vscode.EventEmitter();
        this.onDidFinalizeFile = this.onDidFinalizeFileEmitter.event;
        this.onDidResolveHunkEmitter = new vscode.EventEmitter();
        this.onDidResolveHunk = this.onDidResolveHunkEmitter.event;
        /**
         * Ctrl+Z / Ctrl+Y changed which changes are pending in an open review.
         */
        this.onDidReplayResolutionEmitter = new vscode.EventEmitter();
        this.onDidReplayResolution = this.onDidReplayResolutionEmitter.event;
        this.onDidChangeActiveDiffsEmitter = new vscode.EventEmitter();
        this.onDidChangeActiveDiffs = this.onDidChangeActiveDiffsEmitter.event;
        /**
         * URIs whose diff is mid-application; their change events must be ignored.
         */
        this.applyingDiffUris = new Set();
        /**
         * Per-change resolutions that Ctrl+Z / Ctrl+Y can replay, by URI.
         */
        this.resolutionUndo = new Map();
        this.resolutionRedo = new Map();
        /** @type {string} */
        const BORDER_WIDTH = '1px';
        /** @type {string} */
        const BORDER_STYLE = 'solid';
        /** @type {!tsickle_vscode_2.ThemeColor} */
        const addBorderColor = new vscode.ThemeColor('diffEditor.insertedTextBorder');
        /** @type {!tsickle_vscode_2.ThemeColor} */
        const deleteBorderColor = new vscode.ThemeColor('diffEditor.removedTextBorder');
        this.styles = {
            add: {
                base: vscode.window.createTextEditorDecorationType({
                    backgroundColor: new vscode.ThemeColor('diffEditor.insertedTextBackground'),
                    isWholeLine: true,
                    rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
                }),
                single: vscode.window.createTextEditorDecorationType({
                    isWholeLine: true,
                    rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
                    borderWidth: BORDER_WIDTH,
                    borderStyle: BORDER_STYLE,
                    borderColor: addBorderColor,
                }),
                top: vscode.window.createTextEditorDecorationType({
                    isWholeLine: true,
                    rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
                    borderWidth: `${BORDER_WIDTH} ${BORDER_WIDTH} 0 ${BORDER_WIDTH}`,
                    borderStyle: BORDER_STYLE,
                    borderColor: addBorderColor,
                }),
                mid: vscode.window.createTextEditorDecorationType({
                    isWholeLine: true,
                    rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
                    borderWidth: `0 ${BORDER_WIDTH} 0 ${BORDER_WIDTH}`,
                    borderStyle: BORDER_STYLE,
                    borderColor: addBorderColor,
                }),
                bottom: vscode.window.createTextEditorDecorationType({
                    isWholeLine: true,
                    rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
                    borderWidth: `0 ${BORDER_WIDTH} ${BORDER_WIDTH} ${BORDER_WIDTH}`,
                    borderStyle: BORDER_STYLE,
                    borderColor: addBorderColor,
                }),
            },
            delete: {
                base: vscode.window.createTextEditorDecorationType({
                    backgroundColor: new vscode.ThemeColor('diffEditor.removedTextBackground'),
                    isWholeLine: true,
                    rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
                }),
                single: vscode.window.createTextEditorDecorationType({
                    isWholeLine: true,
                    rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
                    borderWidth: BORDER_WIDTH,
                    borderStyle: BORDER_STYLE,
                    borderColor: deleteBorderColor,
                }),
                top: vscode.window.createTextEditorDecorationType({
                    isWholeLine: true,
                    rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
                    borderWidth: `${BORDER_WIDTH} ${BORDER_WIDTH} 0 ${BORDER_WIDTH}`,
                    borderStyle: BORDER_STYLE,
                    borderColor: deleteBorderColor,
                }),
                mid: vscode.window.createTextEditorDecorationType({
                    isWholeLine: true,
                    rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
                    borderWidth: `0 ${BORDER_WIDTH} 0 ${BORDER_WIDTH}`,
                    borderStyle: BORDER_STYLE,
                    borderColor: deleteBorderColor,
                }),
                bottom: vscode.window.createTextEditorDecorationType({
                    isWholeLine: true,
                    rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
                    borderWidth: `0 ${BORDER_WIDTH} ${BORDER_WIDTH} ${BORDER_WIDTH}`,
                    borderStyle: BORDER_STYLE,
                    borderColor: deleteBorderColor,
                }),
            },
        };
        for (const group of [this.styles.add, this.styles.delete]) {
            for (const style of Object.values(group)) {
                this.disposables.push(style);
            }
        }
        this.codeLensProvider = new InlineDiffCodeLensProvider(this);
        this.disposables.push(vscode.workspace.registerTextDocumentContentProvider('antigravity-diff-original', new OriginalDocumentProvider(this)), vscode.languages.registerCodeLensProvider({ scheme: 'file' }, this.codeLensProvider), vscode.commands.registerCommand('antigravity.inlineDiff.accept', (/**
         * @param {(undefined|string|!tsickle_vscode_2.Uri)=} fileUriStr
         * @param {(undefined|number)=} index
         * @return {!Promise<void>}
         */
        (fileUriStr, index) => this.acceptHunk(fileUriStr, index))), vscode.commands.registerCommand('antigravity.inlineDiff.reject', (/**
         * @param {(undefined|string|!tsickle_vscode_2.Uri)=} fileUriStr
         * @param {(undefined|number)=} index
         * @return {!Promise<void>}
         */
        (fileUriStr, index) => this.rejectHunk(fileUriStr, index))), vscode.commands.registerCommand('antigravity.inlineDiff.acceptAll', (/**
         * @param {(undefined|string|!tsickle_vscode_2.Uri)=} fileUriStr
         * @return {!Promise<void>}
         */
        (fileUriStr) => this.acceptAll(fileUriStr, { undoable: true }))), vscode.commands.registerCommand('antigravity.inlineDiff.rejectAll', (/**
         * @param {(undefined|string|!tsickle_vscode_2.Uri)=} fileUriStr
         * @return {!Promise<void>}
         */
        (fileUriStr) => this.rejectAll(fileUriStr, { undoable: true }))), vscode.commands.registerCommand('antigravity.inlineDiff.undo', (/**
         * @return {!Promise<void>}
         */
        () => this.undoInReview(false))), vscode.commands.registerCommand('antigravity.inlineDiff.redo', (/**
         * @return {!Promise<void>}
         */
        () => this.undoInReview(true))), vscode.window.onDidChangeActiveTextEditor((/**
         * @param {(undefined|!tsickle_vscode_2.TextEditor)} editor
         * @return {void}
         */
        (editor) => {
            this.updateUndoContext();
            if (editor) {
                this.handleActiveEditorChange(editor).catch((/**
                 * @param {?} e
                 * @return {void}
                 */
                (e) => {
                    console.error('[Antigravity] Error handling active editor change:', e);
                }));
            }
        })), vscode.window.onDidChangeVisibleTextEditors((/**
         * @return {void}
         */
        () => {
            this.refreshAllVisibleDecorations();
        })), vscode.workspace.onDidChangeTextDocument((/**
         * @param {!tsickle_vscode_2.TextDocumentChangeEvent} event
         * @return {void}
         */
        (event) => {
            this.handleDocumentEdit(event);
        })), 
        // Intercept file save events: on manual save (Cmd+S/Ctrl+S), synchronously replace the buffer
        // with clean modified text via waitUntil before content is flushed to disk.
        ...(typeof vscode.workspace.onWillSaveTextDocument === 'function'
            ? [
                vscode.workspace.onWillSaveTextDocument((/**
                 * @param {!tsickle_vscode_2.TextDocumentWillSaveEvent} event
                 * @return {void}
                 */
                (event) => {
                    this.handleDocumentWillSave(event);
                })),
            ]
            : []), 
        // Finalize the diff session as accepted once the save completes to disk.
        ...(typeof vscode.workspace.onDidSaveTextDocument === 'function'
            ? [
                vscode.workspace.onDidSaveTextDocument((/**
                 * @param {!tsickle_vscode_2.TextDocument} doc
                 * @return {void}
                 */
                (doc) => {
                    this.handleDocumentDidSave(doc);
                })),
            ]
            : []), 
        // Handle document close events when documents are explicitly closed/disposed.
        vscode.workspace.onDidCloseTextDocument((/**
         * @param {!tsickle_vscode_2.TextDocument} doc
         * @return {void}
         */
        (doc) => {
            this.handleDocumentClose(doc).catch((/**
             * @param {?} e
             * @return {void}
             */
            (e) => {
                console.error('[Antigravity] Error handling document close:', e);
            }));
        })), 
        // A rename keeps the agent's version.
        ...(typeof vscode.workspace.onWillRenameFiles === 'function'
            ? [
                vscode.workspace.onWillRenameFiles((/**
                 * @param {!tsickle_vscode_2.FileWillRenameEvent} event
                 * @return {void}
                 */
                (event) => {
                    for (const { oldUri } of event.files) {
                        /** @type {(undefined|!ActiveDiff)} */
                        const activeDiff = this.getActiveDiff(oldUri.toString());
                        if (activeDiff) {
                            event.waitUntil(this.keepAgentTextBeforeRename(activeDiff));
                        }
                    }
                })),
            ]
            : []), 
        // Handle closing tabs (e.g. user clicks [X] and chooses "Don't Save").
        // VS Code closes the visual tab and discards dirty buffer state without closing/disposing
        // the underlying TextDocument model, so onDidChangeTabs is required to catch tab closures.
        ...(vscode.window?.tabGroups?.onDidChangeTabs
            ? [
                vscode.window.tabGroups.onDidChangeTabs((/**
                 * @param {!tsickle_vscode_2.TabChangeEvent} event
                 * @return {void}
                 */
                (event) => {
                    this.handleTabsChange(event).catch((/**
                     * @param {?} e
                     * @return {void}
                     */
                    (e) => {
                        console.error('[Antigravity] Error handling tab change:', e);
                    }));
                })),
            ]
            : []));
        this.disposables.push(this.onDidChangeActiveDiffsEmitter, this.onDidFinalizeFileEmitter, this.onDidResolveHunkEmitter, this.onDidReplayResolutionEmitter);
    }
    /**
     * @public
     * @param {string} uriStr
     * @return {(undefined|!ActiveDiff)}
     */
    getActiveDiff(uriStr) {
        return this.activeDiffs.get(uriStr) ?? this.findActiveDiffFuzzy(uriStr);
    }
    /**
     * @private
     * @param {string} uriStr
     * @return {(undefined|!ActiveDiff)}
     */
    findActiveDiffFuzzy(uriStr) {
        /** @type {string} */
        const normalizedTarget = (0, utils_1.normalizeUri)(uriStr);
        for (const [key__tsickle_destructured_5, diff__tsickle_destructured_6] of this.activeDiffs.entries()) {
            const key = /** @type {string} */ (key__tsickle_destructured_5);
            const diff = /** @type {!ActiveDiff} */ (diff__tsickle_destructured_6);
            if ((0, utils_1.normalizeUri)(key) === normalizedTarget ||
                (0, utils_1.normalizeUri)(diff.uri.toString()) === normalizedTarget) {
                return diff;
            }
        }
        return undefined;
    }
    /**
     * @public
     * @return {boolean}
     */
    hasActiveDiffs() {
        return this.activeDiffs.size > 0;
    }
    /**
     * Whether the open review has a per-change Reject (not undone) that only the
     * buffer has: disk, which the agent reads next, still has that change.
     * @public
     * @param {string} uriStr
     * @return {boolean}
     */
    hasUnsavedRejection(uriStr) {
        /** @type {(undefined|!ActiveDiff)} */
        const diff = this.getActiveDiff(uriStr);
        if (!diff)
            return false;
        /** @type {string} */
        const key = (0, utils_1.normalizeUri)(diff.uri.toString());
        return !!this.resolutionUndo
            .get(key)
            ?.some((/**
         * @param {!ResolutionRecord} r
         * @return {boolean}
         */
        (r) => r.diff === diff && !r.accept));
    }
    /**
     * Registers a new file diff and starts the in-editor review process.
     * @public
     * @param {!tsickle_vscode_2.Uri} uri
     * @param {string} originalText
     * @param {string} modifiedText
     * @return {!Promise<boolean>}
     */
    async registerDiff(uri, originalText, modifiedText) {
        /** @type {string} */
        const key = uri.toString();
        /** @type {!Array<!google3$third_party$javascript$typings$diff$index.Hunk>} */
        const hunks = (0, diff_helper_1.getDiffHunks)(originalText, modifiedText);
        if (hunks.length === 0) {
            console.info('[Antigravity] No differences found for:', key);
            return false;
        }
        if (this.activeDiffs.has(key)) {
            // Clear decorations in all visible editors of the obsolete session
            for (const editor of vscode.window.visibleTextEditors) {
                if (editor.document.uri.toString() === key) {
                    this.clearDecorations(editor);
                }
            }
            this.activeDiffs.delete(key);
        }
        this.clearResolutionHistory(key);
        /** @type {!tsickle_vscode_2.TextDocument} */
        const document = await vscode.workspace.openTextDocument(uri);
        /** @type {!tsickle_inline_diff_changes_6.InlineDiffChanges} */
        const changes = new inline_diff_changes_1.InlineDiffChanges();
        /** @type {!ActiveDiff} */
        const activeDiff = {
            uri,
            originalText,
            modifiedText,
            combinedText: (0, diff_helper_1.getTextWithHunks)(originalText, hunks),
            changes,
            hasBeenShown: true,
            // The agent wrote modifiedText; user edits later rewrite both texts.
            savedTexts: new Set([originalText, modifiedText]),
        };
        this.activeDiffs.set(key, activeDiff);
        /** @type {string} */
        const normalizedKey = (0, utils_1.normalizeUri)(key);
        /** @type {string} */
        const combinedText = activeDiff.combinedText;
        // Keep the deleted lines out of the buffer so Auto Save can't write them.
        /** @type {boolean} */
        const hideDeletions = this.options.hideDeletedLines?.(document) === true;
        /** @type {string} */
        const bufferText = hideDeletions ? modifiedText : combinedText;
        /** @type {!tsickle_vscode_2.TextDocument} */
        let docForSetup = document;
        // The agent already wrote modifiedText to disk (as in Cider). Leave disk
        // alone; stage combinedText in the buffer to render both sides.
        this.applyingDiffUris.add(normalizedKey);
        try {
            /** @type {boolean} */
            const applied = (hideDeletions && docForSetup.getText() === bufferText) ||
                (await this.applyContentReplacement(docForSetup, bufferText));
            if (!applied) {
                await this.forceReloadFromFile(uri);
                docForSetup = await vscode.workspace.openTextDocument(uri);
                /** @type {boolean} */
                const retryApplied = await this.applyContentReplacement(docForSetup, bufferText);
                if (!retryApplied) {
                    this.activeDiffs.delete(key);
                    return false;
                }
            }
            try {
                docForSetup = await vscode.workspace.openTextDocument(uri);
            }
            catch { }
        }
        finally {
            // Release the guard only after our own change events have drained.
            await new Promise((/**
             * @param {function(*): void} r
             * @return {void}
             */
            (r) => {
                setTimeout(r, 0);
            }));
            this.applyingDiffUris.delete(normalizedKey);
        }
        if (hideDeletions) {
            // Lay out the ranges on the combined text, then drop the deleted lines.
            activeDiff.changes.setup(hunks, textDocumentOf(combinedText));
            activeDiff.changes.ranges = hideDeletionLines(activeDiff.changes.ranges);
            activeDiff.deletionsHidden = true;
            activeDiff.combinedText = modifiedText;
        }
        else {
            activeDiff.combinedText = combinedText;
            activeDiff.changes.setup(hunks, docForSetup);
        }
        activeDiff.stagedText = activeDiff.combinedText;
        activeDiff.lastKnownDirty = docForSetup.isDirty;
        this.codeLensProvider.refresh();
        this.refreshVisibleEditorDecorations(key, activeDiff.changes);
        await vscode.commands.executeCommand('setContext', 'antigravity.hasActiveDiff', true);
        this.updateUndoContext();
        this.refreshGitAndGitLens(uri);
        this.onDidChangeActiveDiffsEmitter.fire();
        return true;
    }
    /**
     * Accepts a specific hunk inside a file.
     * @public
     * @param {(undefined|string|!tsickle_vscode_2.Uri)=} targetUri
     * @param {(undefined|number)=} index
     * @return {!Promise<void>}
     */
    async acceptHunk(targetUri, index) {
        if (targetUri == null || index == null) {
            return;
        }
        /** @type {string} */
        const uriStr = typeof targetUri === 'string' ? targetUri : (/** @type {!tsickle_vscode_2.Uri} */ (targetUri)).toString();
        /** @type {(undefined|!ActiveDiff)} */
        const activeDiff = this.activeDiffs.get(uriStr);
        if (!activeDiff) {
            console.warn(`[Antigravity] acceptHunk failed: no active diff found for uriStr: ${uriStr}`);
            return;
        }
        /** @type {!tsickle_inline_diff_change_range_5.InlineDiffChangeRange} */
        const rangeToResolve = activeDiff.changes.ranges[index];
        if (!rangeToResolve) {
            console.warn(`[Antigravity] acceptHunk failed: no range found at index: ${index}`);
            return;
        }
        /** @type {string} */
        const hunkHash = changeHash(rangeToResolve);
        this.onDidResolveHunkEmitter.fire({
            uri: activeDiff.uri,
            hunkIndex: index,
            accept: true,
            hunkHash,
        });
        /** @type {!Array<!tsickle_inline_diff_change_range_5.InlineDiffChangeRange>} */
        const remainingRanges = activeDiff.changes.ranges.filter((/**
         * @param {!tsickle_inline_diff_change_range_5.InlineDiffChangeRange} _
         * @param {number} i
         * @return {boolean}
         */
        (_, i) => i !== index));
        /** @type {!tsickle_vscode_2.TextDocument} */
        const document = await vscode.workspace.openTextDocument(activeDiff.uri);
        /** @type {!ResolutionState} */
        const before = snapshotResolutionState(activeDiff, document.getText());
        if (rangeToResolve.deletionRange) {
            /** @type {!tsickle_vscode_2.Range} */
            const rangeToDelete = wholeLinesRange(document, rangeToResolve.deletionRange.start, rangeToResolve.deletionRange.end.line);
            /** @type {!tsickle_vscode_2.WorkspaceEdit} */
            const edit = new vscode.WorkspaceEdit();
            edit.delete(activeDiff.uri, rangeToDelete);
            this.isResolvingHunk = true;
            await vscode.workspace.applyEdit(edit);
            this.isResolvingHunk = false;
            /** @type {!tsickle_vscode_2.TextDocumentContentChangeEvent} */
            const changeEvent = {
                range: rangeToDelete,
                text: '',
                rangeLength: document.offsetAt(rangeToDelete.end) -
                    document.offsetAt(rangeToDelete.start),
                rangeOffset: document.offsetAt(rangeToDelete.start),
            };
            activeDiff.changes.ranges = (0, inline_diff_range_tracker_1.recalculateInlineDiffRanges)(remainingRanges, [
                changeEvent,
            ]);
        }
        else {
            activeDiff.changes.ranges = remainingRanges;
        }
        activeDiff.combinedText = document.getText();
        // Accept all / Reject all / Ctrl+S on the rest must keep this decision.
        if (activeDiff.changes.ranges.length > 0) {
            this.syncBaselines(activeDiff, activeDiff.combinedText);
        }
        activeDiff.lastKnownDirty = document.isDirty;
        this.recordResolution(activeDiff, before, true);
        if (activeDiff.changes.ranges.length === 0) {
            await this.finalizeFile(uriStr);
        }
        else {
            this.codeLensProvider.refresh();
            this.refreshVisibleEditorDecorations(uriStr, activeDiff.changes);
            this.focusNextHunk(uriStr, index);
            this.refreshGitAndGitLens(activeDiff.uri);
        }
    }
    /**
     * Rejects a specific hunk inside a file.
     * @public
     * @param {(undefined|string|!tsickle_vscode_2.Uri)=} targetUri
     * @param {(undefined|number)=} index
     * @return {!Promise<void>}
     */
    async rejectHunk(targetUri, index) {
        if (targetUri == null || index == null) {
            return;
        }
        /** @type {string} */
        const uriStr = typeof targetUri === 'string' ? targetUri : (/** @type {!tsickle_vscode_2.Uri} */ (targetUri)).toString();
        /** @type {(undefined|!ActiveDiff)} */
        const activeDiff = this.activeDiffs.get(uriStr);
        if (!activeDiff) {
            console.warn(`[Antigravity] rejectHunk failed: no active diff found for uriStr: ${uriStr}`);
            return;
        }
        /** @type {!tsickle_inline_diff_change_range_5.InlineDiffChangeRange} */
        const rangeToResolve = activeDiff.changes.ranges[index];
        if (!rangeToResolve) {
            console.warn(`[Antigravity] rejectHunk failed: no range found at index: ${index}`);
            return;
        }
        /** @type {string} */
        const hunkHash = changeHash(rangeToResolve);
        this.onDidResolveHunkEmitter.fire({
            uri: activeDiff.uri,
            hunkIndex: index,
            accept: false,
            hunkHash,
        });
        /** @type {!Array<!tsickle_inline_diff_change_range_5.InlineDiffChangeRange>} */
        const remainingRanges = activeDiff.changes.ranges.filter((/**
         * @param {!tsickle_inline_diff_change_range_5.InlineDiffChangeRange} _
         * @param {number} i
         * @return {boolean}
         */
        (_, i) => i !== index));
        /** @type {!tsickle_vscode_2.TextDocument} */
        const document = await vscode.workspace.openTextDocument(activeDiff.uri);
        /** @type {!ResolutionState} */
        const before = snapshotResolutionState(activeDiff, document.getText());
        // With deleted lines hidden, rejecting must also bring them back.
        /** @type {string} */
        let restored = activeDiff.deletionsHidden && rangeToResolve.deletedLinesCount > 0
            ? `${rangeToResolve.originalText}\n`
            : '';
        /** @type {(undefined|!tsickle_vscode_2.Range)} */
        let rangeToReplace;
        if (rangeToResolve.additionRange) {
            rangeToReplace = wholeLinesRange(document, rangeToResolve.additionRange.start, rangeToResolve.additionRange.end.line);
            // The added lines end the file without a line break; match that.
            /** @type {boolean} */
            const endsFile = rangeToResolve.additionRange.end.line >= document.lineCount - 1;
            if (restored && endsFile) {
                /** @type {boolean} */
                const takesPrevBreak = rangeToReplace.start.line < rangeToResolve.additionRange.start.line;
                restored = `${takesPrevBreak ? '\n' : ''}${rangeToResolve.originalText}`;
            }
        }
        else if (restored) {
            /** @type {!tsickle_vscode_2.Position} */
            let pos = new vscode.Position(rangeToResolve.start, 0);
            if (document.getText() === '' &&
                !activeDiff.originalText.endsWith('\n')) {
                restored = rangeToResolve.originalText;
            }
            else if (rangeToResolve.start >= document.lineCount) {
                pos = document.lineAt(document.lineCount - 1).range.end;
                restored = `\n${rangeToResolve.originalText}`;
            }
            rangeToReplace = new vscode.Range(pos, pos);
        }
        if (rangeToReplace) {
            /** @type {!tsickle_vscode_2.WorkspaceEdit} */
            const edit = new vscode.WorkspaceEdit();
            if (restored) {
                edit.replace(activeDiff.uri, rangeToReplace, restored);
            }
            else {
                edit.delete(activeDiff.uri, rangeToReplace);
            }
            this.isResolvingHunk = true;
            await vscode.workspace.applyEdit(edit);
            this.isResolvingHunk = false;
            /** @type {!tsickle_vscode_2.TextDocumentContentChangeEvent} */
            const changeEvent = {
                range: rangeToReplace,
                text: restored,
                rangeLength: document.offsetAt(rangeToReplace.end) -
                    document.offsetAt(rangeToReplace.start),
                rangeOffset: document.offsetAt(rangeToReplace.start),
            };
            activeDiff.changes.ranges = (0, inline_diff_range_tracker_1.recalculateInlineDiffRanges)(remainingRanges, [
                changeEvent,
            ]);
        }
        else {
            activeDiff.changes.ranges = remainingRanges;
        }
        activeDiff.combinedText = document.getText();
        // Accept all / Reject all / Ctrl+S on the rest must keep this decision.
        if (activeDiff.changes.ranges.length > 0) {
            this.syncBaselines(activeDiff, activeDiff.combinedText);
        }
        activeDiff.lastKnownDirty = document.isDirty;
        this.recordResolution(activeDiff, before, false);
        if (activeDiff.changes.ranges.length === 0) {
            await this.finalizeFile(uriStr);
        }
        else {
            this.codeLensProvider.refresh();
            this.refreshVisibleEditorDecorations(uriStr, activeDiff.changes);
            this.focusNextHunk(uriStr, index);
            this.refreshGitAndGitLens(activeDiff.uri);
        }
    }
    /**
     * Scrolls the editor to reveal and select the next remaining hunk after a hunk resolution.
     * @private
     * @param {string} uriStr
     * @param {number} resolvedIndex
     * @return {void}
     */
    focusNextHunk(uriStr, resolvedIndex) {
        /** @type {(undefined|!ActiveDiff)} */
        const activeDiff = this.activeDiffs.get(uriStr);
        if (!activeDiff || activeDiff.changes.ranges.length === 0) {
            return;
        }
        /** @type {string} */
        const targetUri = activeDiff.uri.toString();
        /** @type {(undefined|!tsickle_vscode_2.TextEditor)} */
        const editor = (0, utils_1.findEditorForUri)(targetUri);
        if (!editor)
            return;
        // Target the same index (which now points to the next hunk) or clamp to the last remaining hunk.
        /** @type {number} */
        const nextIndex = Math.min(resolvedIndex, activeDiff.changes.ranges.length - 1);
        /** @type {!tsickle_inline_diff_change_range_5.InlineDiffChangeRange} */
        const nextHunk = activeDiff.changes.ranges[nextIndex];
        if (!nextHunk)
            return;
        /** @type {(undefined|!tsickle_vscode_2.Range)} */
        const targetRange = nextHunk.additionRange ?? nextHunk.deletionRange;
        if (targetRange) {
            editor.revealRange(targetRange, vscode.TextEditorRevealType.InCenter);
            editor.selection = new vscode.Selection(targetRange.start, targetRange.start);
        }
    }
    /**
     * Accepts all pending changes in a file. `undoable` lets Ctrl+Z reopen it.
     * @public
     * @param {(undefined|string|!tsickle_vscode_2.Uri)=} uri
     * @param {(undefined|{undoable: (undefined|boolean)})=} options
     * @return {!Promise<void>}
     */
    async acceptAll(uri, options) {
        /** @type {(undefined|string|!tsickle_vscode_2.Uri)} */
        const targetUri = uri ?? vscode.window.activeTextEditor?.document.uri;
        if (!targetUri) {
            return;
        }
        /** @type {string} */
        const uriStr = typeof targetUri === 'string' ? targetUri : (/** @type {!tsickle_vscode_2.Uri} */ (targetUri)).toString();
        /** @type {(undefined|!ActiveDiff)} */
        const activeDiff = this.getActiveDiff(uriStr);
        if (!activeDiff) {
            console.warn(`[Antigravity] acceptAll failed: no active diff found for uriStr: ${uriStr}`);
            return;
        }
        /** @type {!tsickle_vscode_2.TextDocument} */
        const document = await vscode.workspace.openTextDocument(activeDiff.uri);
        // Superseded by a newer diff while awaiting; don't accept it.
        if (this.getActiveDiff(uriStr) !== activeDiff) {
            return;
        }
        if (await this.endIfChangedOutside(activeDiff, document, activeDiff.modifiedText)) {
            return;
        }
        /** @type {!ResolutionState} */
        const before = snapshotResolutionState(activeDiff, document.getText());
        await this.applyContentReplacement(document, activeDiff.modifiedText, options?.undoable);
        await this.finalizeFile(activeDiff.uri.toString(), true, activeDiff, options?.undoable);
        if (options?.undoable) {
            this.recordWholeFileResolution(activeDiff, before, document, true);
        }
    }
    /**
     * Rejects all pending changes in a file. `undoable` lets Ctrl+Z reopen it.
     * @public
     * @param {(undefined|string|!tsickle_vscode_2.Uri)=} uri
     * @param {(undefined|{undoable: (undefined|boolean)})=} options
     * @return {!Promise<void>}
     */
    async rejectAll(uri, options) {
        /** @type {(undefined|string|!tsickle_vscode_2.Uri)} */
        const targetUri = uri ?? vscode.window.activeTextEditor?.document.uri;
        if (!targetUri) {
            return;
        }
        /** @type {string} */
        const uriStr = typeof targetUri === 'string' ? targetUri : (/** @type {!tsickle_vscode_2.Uri} */ (targetUri)).toString();
        /** @type {(undefined|!ActiveDiff)} */
        const activeDiff = this.getActiveDiff(uriStr);
        if (!activeDiff) {
            console.warn(`[Antigravity] rejectAll failed: no active diff found for uriStr: ${uriStr}`);
            return;
        }
        /** @type {!tsickle_vscode_2.TextDocument} */
        const document = await vscode.workspace.openTextDocument(activeDiff.uri);
        // Superseded by a newer diff while awaiting; don't revert it.
        if (this.getActiveDiff(uriStr) !== activeDiff) {
            return;
        }
        if (await this.endIfChangedOutside(activeDiff, document, activeDiff.originalText)) {
            return;
        }
        /** @type {!ResolutionState} */
        const before = snapshotResolutionState(activeDiff, document.getText());
        await this.applyContentReplacement(document, activeDiff.originalText, options?.undoable);
        // Guarantee originalText is written directly to disk even if the editor buffer was closed/discarded.
        if (vscode.workspace?.fs) {
            try {
                /** @type {!Uint8Array} */
                const encoded = new TextEncoder().encode(activeDiff.originalText);
                await vscode.workspace.fs.writeFile(activeDiff.uri, encoded);
            }
            catch (fsError) {
                console.error(`[Antigravity] rejectAll: fs.writeFile failed for ${activeDiff.uri.toString()}:`, fsError);
            }
        }
        await this.finalizeFile(activeDiff.uri.toString(), false, activeDiff, options?.undoable);
        if (options?.undoable) {
            this.recordWholeFileResolution(activeDiff, before, document, false);
        }
    }
    /**
     * Disposes a diff session without saving to disk.
     * @public
     * @param {(string|!tsickle_vscode_2.Uri)} targetUri
     * @return {!Promise<void>}
     */
    async disposeDiff(targetUri) {
        /** @type {string} */
        const uriStr = typeof targetUri === 'string' ? targetUri : (/** @type {!tsickle_vscode_2.Uri} */ (targetUri)).toString();
        /** @type {(undefined|!ActiveDiff)} */
        const activeDiff = this.getActiveDiff(uriStr);
        if (!activeDiff) {
            return;
        }
        /** @type {string} */
        const key = activeDiff.uri.toString();
        for (const editor of vscode.window.visibleTextEditors) {
            if (editor.document.uri.toString() === key) {
                this.clearDecorations(editor);
            }
        }
        this.activeDiffs.delete(key);
        if (uriStr !== key) {
            this.activeDiffs.delete(uriStr);
        }
        this.onDidChangeActiveDiffsEmitter.fire();
        this.debouncedRefreshCodeLenses();
        this.clearResolutionHistory(key);
        await vscode.commands.executeCommand('setContext', 'antigravity.hasActiveDiff', this.activeDiffs.size > 0);
        // Sync buffer to modifiedText without a focus-stealing revert.
        try {
            if ((0, utils_1.hasCiderForceResolveFromFile)()) {
                await cider_1.cider.ai.forceResolveFromFile(activeDiff.uri);
            }
            else {
                /** @type {!tsickle_vscode_2.TextDocument} */
                const document = await vscode.workspace.openTextDocument(activeDiff.uri);
                if (document.getText() !== activeDiff.modifiedText) {
                    await this.applyContentReplacement(document, activeDiff.modifiedText);
                }
            }
        }
        catch {
            // Best-effort cleanup
        }
    }
    /**
     * Reverts all registered diff files to their original state and disposes resource hooks.
     * @public
     * @return {!Promise<void>}
     */
    async cleanUpAll() {
        for (const activeDiff of this.activeDiffs.values()) {
            try {
                /** @type {!tsickle_vscode_2.TextDocument} */
                const document = await vscode.workspace.openTextDocument(activeDiff.uri);
                await this.revertDocument(document, activeDiff.originalText);
            }
            catch (e) {
                console.error('[Antigravity] Revert failed on cleanup for:', activeDiff.uri.toString(), e);
            }
        }
        this.activeDiffs.clear();
        this.onDidChangeActiveDiffsEmitter.fire();
        this.debouncedRefreshCodeLenses();
        await vscode.commands.executeCommand('setContext', 'antigravity.hasActiveDiff', false);
    }
    /**
     * @public
     * @return {void}
     */
    dispose() {
        this.clearTimers();
        this.cleanUpAll()
            .then((/**
         * @return {void}
         */
        () => {
            this.disposables.forEach((/**
             * @param {!tsickle_vscode_2.Disposable} d
             * @return {void}
             */
            (d) => {
                d.dispose();
            }));
        }))
            .catch((/**
         * @param {?} e
         * @return {void}
         */
        (e) => {
            console.error('[Antigravity] Error during dispose cleanup:', e);
        }));
    }
    /**
     * Stops listening on shutdown without reverting or saving files.
     * @public
     * @return {void}
     */
    disposeForShutdown() {
        this.clearTimers();
        for (const d of this.disposables) {
            d?.dispose();
        }
        this.activeDiffs.clear();
    }
    /**
     * @private
     * @return {void}
     */
    clearTimers() {
        if (this.refreshTimeout) {
            clearTimeout(this.refreshTimeout);
            this.refreshTimeout = undefined;
        }
        if (this.gitRefreshTimeout) {
            clearTimeout(this.gitRefreshTimeout);
            this.gitRefreshTimeout = undefined;
        }
    }
    // Debounce CodeLens refresh calls by 250ms to eliminate UI thrashing during rapid edits.
    /**
     * @private
     * @return {void}
     */
    debouncedRefreshCodeLenses() {
        if (this.refreshTimeout) {
            clearTimeout(this.refreshTimeout);
        }
        this.refreshTimeout = setTimeout((/**
         * @return {void}
         */
        () => {
            this.refreshTimeout = undefined;
            this.codeLensProvider.refresh();
        }), 250);
    }
    // ---------------------------------------------------------------------------
    // Private Helpers
    // ---------------------------------------------------------------------------
    // Flushes GitLens line annotations and triggers a VS Code Git status refresh so new/accepted
    // code displays uncommitted changes rather than stale commit blame.
    //
    // The refresh is always scoped to the repository owning the edited document. Dispatching a
    // parameterless 'git.refresh' makes the Git extension fall back to Model.pickRepository(),
    // which shows a "Choose a repository" quick pick in multi-repo workspaces and an unsuppressable
    // modal error in non-Git ones. See refreshGitForUri() for details.
    //
    // Nothing here is awaited: in a big repository (e.g. one rooted at the home
    // directory) a refresh takes seconds, and reviews must not wait for it.
    /**
     * @private
     * @param {(undefined|!tsickle_vscode_2.Uri)=} targetUri
     * @return {void}
     */
    refreshGitAndGitLens(targetUri) {
        /** @type {(undefined|!tsickle_vscode_2.Uri)} */
        const docUri = targetUri ?? vscode.window?.activeTextEditor?.document?.uri;
        // Rejects when GitLens isn't installed; nothing to do then.
        void vscode.commands
            .executeCommand('gitlens.clearFileAnnotations')
            .then(undefined, (/**
         * @return {void}
         */
        () => { }));
        void refreshGitForUri(docUri);
        if (this.gitRefreshTimeout) {
            clearTimeout(this.gitRefreshTimeout);
            this.gitRefreshTimeout = undefined;
        }
        this.gitRefreshTimeout = setTimeout((/**
         * @return {!Promise<void>}
         */
        async () => {
            this.gitRefreshTimeout = undefined;
            await refreshGitForUri(docUri);
            if (docUri) {
                await this.touchGitIndexForUri(docUri);
            }
        }), 100);
    }
    // Updates the modification time of .git/index if the document is inside a Git repository.
    // This notifies GitLens's repository index watcher to invalidate in-memory blame snapshots,
    // preventing GitLens from attributing newly inserted lines to historical commits.
    /**
     * @public
     * @param {(undefined|!tsickle_vscode_2.Uri)=} targetUri
     * @return {!Promise<void>}
     */
    async touchGitIndexForUri(targetUri) {
        if (!targetUri ||
            targetUri.scheme !== 'file' ||
            !isGitLensActive() ||
            !vscode.workspace?.fs) {
            return;
        }
        try {
            /** @type {!tsickle_vscode_2.Uri} */
            let cur = targetUri;
            // Walk up directory tree to locate .git
            while (cur.path !== '/' && cur.path !== '.') {
                /** @type {!tsickle_vscode_2.Uri} */
                const parent = vscode.Uri.joinPath(cur, '..');
                if (parent.path === cur.path) {
                    break;
                }
                cur = parent;
                /** @type {!tsickle_vscode_2.Uri} */
                const gitUri = vscode.Uri.joinPath(cur, '.git');
                try {
                    /** @type {!tsickle_vscode_2.FileStat} */
                    const stat = await vscode.workspace.fs.stat(gitUri);
                    if (stat.type & vscode.FileType.Directory) {
                        /** @type {!tsickle_vscode_2.Uri} */
                        const indexUri = vscode.Uri.joinPath(gitUri, 'index');
                        await safeTouchFile(indexUri);
                        return;
                    }
                    else if (stat.type & vscode.FileType.File) {
                        // Git worktree or submodule: .git file contains "gitdir: <path>"
                        /** @type {string} */
                        const content = new TextDecoder().decode(await vscode.workspace.fs.readFile(gitUri));
                        /** @type {(null|!RegExpExecArray)} */
                        const match = /^gitdir:\s*(.+)$/m.exec(content);
                        if (match) {
                            /** @type {string} */
                            const gitdirStr = match[1].trim();
                            /** @type {!tsickle_vscode_2.Uri} */
                            const resolvedGitDir = gitdirStr.startsWith('/')
                                ? vscode.Uri.file(gitdirStr)
                                : vscode.Uri.joinPath(cur, gitdirStr);
                            /** @type {!tsickle_vscode_2.Uri} */
                            const indexUri = vscode.Uri.joinPath(resolvedGitDir, 'index');
                            await safeTouchFile(indexUri);
                            return;
                        }
                    }
                }
                catch {
                    // .git does not exist at this level, continue walking up.
                }
            }
        }
        catch {
            // Best-effort; ignore any filesystem errors.
        }
    }
    /**
     * @private
     * @param {!tsickle_vscode_2.TextEditor} editor
     * @param {!ActiveDiff} activeDiff
     * @return {!Promise<void>}
     */
    async showDiffInEditor(editor, activeDiff) {
        this.applyDecorations(editor, activeDiff.changes);
    }
    /**
     * Replaces buffer contents, preferring editor.edit over applyEdit.
     * `undoStop` makes it a separate Ctrl+Z step instead of merging it.
     * @private
     * @param {!tsickle_vscode_2.TextDocument} document
     * @param {string} text
     * @param {boolean=} undoStop
     * @return {!Promise<boolean>}
     */
    async applyContentReplacement(document, text, undoStop = false) {
        if (document.getText() === text) {
            return true;
        }
        /** @type {string} */
        const normalizedDocUri = (0, utils_1.normalizeUri)(document.uri.toString());
        /** @type {(undefined|!tsickle_vscode_2.TextEditor)} */
        const visibleEditor = vscode.window.visibleTextEditors?.find((/**
         * @param {!tsickle_vscode_2.TextEditor} e
         * @return {boolean}
         */
        (e) => (0, utils_1.normalizeUri)(e.document?.uri?.toString()) === normalizedDocUri));
        if (visibleEditor && typeof visibleEditor.edit === 'function') {
            this.isResolvingHunk = true;
            try {
                /** @type {!tsickle_vscode_2.Position} */
                const endPosition = visibleEditor.document.lineCount > 0
                    ? visibleEditor.document.lineAt(visibleEditor.document.lineCount - 1).range.end
                    : new vscode.Position(0, 0);
                /** @type {!tsickle_vscode_2.Range} */
                const fullRange = new vscode.Range(new vscode.Position(0, 0), endPosition);
                /** @type {boolean} */
                const success = await visibleEditor.edit((/**
                 * @param {!tsickle_vscode_2.TextEditorEdit} editBuilder
                 * @return {void}
                 */
                (editBuilder) => {
                    editBuilder.replace(fullRange, text);
                }), { undoStopBefore: undoStop, undoStopAfter: undoStop });
                if (success) {
                    return true;
                }
            }
            catch (e) {
                console.warn('[Antigravity] applyContentReplacement editor.edit error:', e);
            }
            finally {
                this.isResolvingHunk = false;
            }
        }
        /** @type {!tsickle_vscode_2.WorkspaceEdit} */
        const edit = new vscode.WorkspaceEdit();
        /** @type {!tsickle_vscode_2.Position} */
        const endPosition = document.lineCount > 0
            ? document.lineAt(document.lineCount - 1).range.end
            : new vscode.Position(0, 0);
        /** @type {!tsickle_vscode_2.Range} */
        const fullRange = new vscode.Range(new vscode.Position(0, 0), endPosition);
        edit.replace(document.uri, fullRange, text);
        this.isResolvingHunk = true;
        try {
            return await vscode.workspace.applyEdit(edit);
        }
        catch (e) {
            console.warn('[Antigravity] applyContentReplacement applyEdit error:', e);
            return false;
        }
        finally {
            this.isResolvingHunk = false;
        }
    }
    /**
     * @private
     * @param {!tsickle_vscode_2.TextEditor} editor
     * @param {!tsickle_inline_diff_changes_6.InlineDiffChanges} changes
     * @return {void}
     */
    applyDecorations(editor, changes) {
        /** @type {!Array<!tsickle_vscode_2.Range>} */
        const additionRanges = changes.ranges
            .map((/**
         * @param {!tsickle_inline_diff_change_range_5.InlineDiffChangeRange} r
         * @return {(undefined|!tsickle_vscode_2.Range)}
         */
        (r) => r.additionRange))
            .filter((/**
         * @param {(undefined|!tsickle_vscode_2.Range)} r
         * @return {boolean}
         */
        (r) => !!r));
        /** @type {!Array<!tsickle_vscode_2.Range>} */
        const deletionRanges = changes.ranges
            .map((/**
         * @param {!tsickle_inline_diff_change_range_5.InlineDiffChangeRange} r
         * @return {(undefined|!tsickle_vscode_2.Range)}
         */
        (r) => r.deletionRange))
            .filter((/**
         * @param {(undefined|!tsickle_vscode_2.Range)} r
         * @return {boolean}
         */
        (r) => !!r));
        editor.setDecorations(this.styles.add.base, additionRanges);
        editor.setDecorations(this.styles.delete.base, deletionRanges);
        this.applyBorderDecorations(editor, additionRanges, 'add');
        this.applyBorderDecorations(editor, deletionRanges, 'delete');
    }
    /**
     * @private
     * @param {!tsickle_vscode_2.TextEditor} editor
     * @param {!Array<!tsickle_vscode_2.Range>} ranges
     * @param {string} type
     * @return {void}
     */
    applyBorderDecorations(editor, ranges, type) {
        /** @type {!Array<!tsickle_vscode_2.Range>} */
        const singleLine = [];
        /** @type {!Array<!tsickle_vscode_2.Range>} */
        const top = [];
        /** @type {!Array<!tsickle_vscode_2.Range>} */
        const mid = [];
        /** @type {!Array<!tsickle_vscode_2.Range>} */
        const bottom = [];
        /** @type {number} */
        const lineCount = editor.document.lineCount;
        for (const range of ranges) {
            if (range.start.line < 0 ||
                range.start.line >= lineCount ||
                range.end.line < 0 ||
                range.end.line >= lineCount) {
                continue;
            }
            if (range.isSingleLine) {
                singleLine.push(range);
            }
            else {
                top.push(editor.document.lineAt(range.start.line).range);
                if (range.end.line > range.start.line + 1) {
                    /** @type {number} */
                    const midStartLine = range.start.line + 1;
                    /** @type {number} */
                    const midEndLine = range.end.line - 1;
                    mid.push(new vscode.Range(new vscode.Position(midStartLine, 0), editor.document.lineAt(midEndLine).range.end));
                }
                bottom.push(editor.document.lineAt(range.end.line).range);
            }
        }
        /** @type {!DiffStyleGroup} */
        const typeStyles = type === 'add' ? this.styles.add : this.styles.delete;
        editor.setDecorations(typeStyles.single, singleLine);
        editor.setDecorations(typeStyles.top, top);
        editor.setDecorations(typeStyles.mid, mid);
        editor.setDecorations(typeStyles.bottom, bottom);
    }
    /**
     * @private
     * @param {!tsickle_vscode_2.TextEditor} editor
     * @return {void}
     */
    clearDecorations(editor) {
        for (const group of [this.styles.add, this.styles.delete]) {
            for (const style of Object.values(group)) {
                editor.setDecorations(style, []);
            }
        }
    }
    /**
     * Remembers a per-change Accept/Reject so Ctrl+Z can bring it back.
     * @private
     * @param {!ActiveDiff} diff
     * @param {!ResolutionState} before
     * @param {boolean} accept
     * @return {void}
     */
    recordResolution(diff, before, accept) {
        /** @type {string} */
        const key = (0, utils_1.normalizeUri)(diff.uri.toString());
        /** @type {!Array<!ResolutionRecord>} */
        const stack = this.resolutionUndo.get(key) ?? [];
        stack.push({ diff, before, after: snapshotResolutionState(diff), accept });
        if (stack.length > MAX_RESOLUTION_HISTORY)
            stack.shift();
        this.resolutionUndo.set(key, stack);
        this.resolutionRedo.delete(key);
        this.updateUndoContext();
    }
    /**
     * Remembers a user's Accept all / Reject all once the review has closed.
     * @private
     * @param {!ActiveDiff} diff
     * @param {!ResolutionState} before
     * @param {!tsickle_vscode_2.TextDocument} document
     * @param {boolean} accept
     * @return {void}
     */
    recordWholeFileResolution(diff, before, document, accept) {
        if (this.activeDiffs.has(diff.uri.toString()))
            return; // Not finalized.
        // Not finalized.
        diff.changes.ranges = [];
        diff.combinedText = document.getText();
        this.recordResolution(diff, before, accept);
    }
    /**
     * @private
     * @param {string} uriStr
     * @return {void}
     */
    clearResolutionHistory(uriStr) {
        /** @type {string} */
        const key = (0, utils_1.normalizeUri)(uriStr);
        this.resolutionUndo.delete(key);
        this.resolutionRedo.delete(key);
        this.updateUndoContext();
    }
    /**
     * Sets the context keys that route Ctrl+Z / Ctrl+Y to the review.
     * @private
     * @return {void}
     */
    updateUndoContext() {
        /** @type {(undefined|!tsickle_vscode_2.TextDocument)} */
        const doc = vscode.window.activeTextEditor?.document;
        /** @type {(undefined|string)} */
        const key = doc ? (0, utils_1.normalizeUri)(doc.uri.toString()) : undefined;
        /** @type {boolean} */
        const canUndo = !!doc &&
            (!!this.getActiveDiff(doc.uri.toString()) ||
                !!this.resolutionUndo.get((/** @type {string} */ (key)))?.length);
        /** @type {boolean} */
        const canRedo = !!key && !!this.resolutionRedo.get(key)?.length;
        void vscode.commands.executeCommand('setContext', 'antigravity.inlineDiffCanUndo', canUndo);
        void vscode.commands.executeCommand('setContext', 'antigravity.inlineDiffCanRedo', canRedo);
    }
    /**
     * Ctrl+Z / Ctrl+Y in a file under review. Decisions that changed no text are
     * restored here; everything else goes through VS Code's undo/redo.
     * @private
     * @param {boolean} isRedo
     * @return {!Promise<void>}
     */
    async undoInReview(isRedo) {
        /** @type {string} */
        const fallback = isRedo ? 'redo' : 'undo';
        /** @type {(undefined|!tsickle_vscode_2.TextDocument)} */
        const doc = vscode.window.activeTextEditor?.document;
        if (!doc) {
            await vscode.commands.executeCommand(fallback);
            return;
        }
        /** @type {string} */
        const key = (0, utils_1.normalizeUri)(doc.uri.toString());
        /** @type {string} */
        const text = doc.getText();
        /** @type {(undefined|!ResolutionRecord)} */
        const record = (isRedo ? this.resolutionRedo : this.resolutionUndo)
            .get(key)
            ?.at(-1);
        /** @type {boolean} */
        const matches = !!record && text === (isRedo ? record.before : record.after).text;
        if (matches && record.before.text === record.after.text) {
            if (this.applyResolution(key, record, !isRedo, text)) {
                // No text changed, so no change event updates the dirty state.
                record.diff.lastKnownDirty = doc.isDirty;
                return;
            }
        }
        /** @type {(undefined|!ActiveDiff)} */
        const diff = this.getActiveDiff(doc.uri.toString());
        if (!matches && !isRedo && diff && text === diff.stagedText) {
            // Nothing left to undo in the review; don't undo the staged red lines.
            vscode.window.setStatusBarMessage("Use Reject to undo the agent's change", UNDO_HINT_TIMEOUT_MS);
            return;
        }
        await vscode.commands.executeCommand(fallback);
    }
    /**
     * Returns whether `event` was Ctrl+Z / Ctrl+Y of a per-change Accept/Reject,
     * after putting that change back to pending (or resolving it again).
     * @private
     * @param {string} uriStr
     * @param {!tsickle_vscode_2.TextDocumentChangeEvent} event
     * @return {boolean}
     */
    replayResolution(uriStr, event) {
        /** @type {boolean} */
        const isUndo = event.reason === vscode.TextDocumentChangeReason?.Undo;
        /** @type {boolean} */
        const isRedo = event.reason === vscode.TextDocumentChangeReason?.Redo;
        if (!isUndo && !isRedo)
            return false;
        /** @type {string} */
        const key = (0, utils_1.normalizeUri)(uriStr);
        /** @type {(undefined|!ResolutionRecord)} */
        const record = (isUndo ? this.resolutionUndo : this.resolutionRedo)
            .get(key)
            ?.at(-1);
        /** @type {string} */
        const text = event.document.getText();
        if (!record ||
            // Decisions that changed no text are replayed by undoInReview only.
            record.before.text === record.after.text ||
            text !== (isUndo ? record.before : record.after).text) {
            return false;
        }
        return this.applyResolution(key, record, isUndo, text);
    }
    /**
     * Moves `record` to the other stack and restores its review state.
     * @private
     * @param {string} key
     * @param {!ResolutionRecord} record
     * @param {boolean} isUndo
     * @param {string} text
     * @return {boolean}
     */
    applyResolution(key, record, isUndo, text) {
        /** @type {!Map<string, !Array<!ResolutionRecord>>} */
        const from = isUndo ? this.resolutionUndo : this.resolutionRedo;
        /** @type {!Map<string, !Array<!ResolutionRecord>>} */
        const to = isUndo ? this.resolutionRedo : this.resolutionUndo;
        /** @type {string} */
        const diffKey = record.diff.uri.toString();
        /** @type {(undefined|!ActiveDiff)} */
        const current = this.activeDiffs.get(diffKey);
        if (current && current !== record.diff) {
            this.clearResolutionHistory(key);
            return false;
        }
        (/** @type {!Array<!ResolutionRecord>} */ (from.get(key))).pop();
        to.set(key, [...(to.get(key) ?? []), record]);
        /** @type {!ActiveDiff} */
        const diff = record.diff;
        if (isUndo) {
            // The texts may have been updated after the resolution was recorded.
            record.after = snapshotResolutionState(diff, record.after.text);
        }
        /** @type {!ResolutionState} */
        const state = isUndo ? record.before : record.after;
        diff.changes.ranges = cloneRanges(state.ranges);
        diff.originalText = state.originalText;
        diff.modifiedText = state.modifiedText;
        diff.combinedText = text;
        if (diff.changes.ranges.length === 0) {
            void this.finalizeFile(diffKey, undefined, diff);
            return true;
        }
        if (!current) {
            // Undoing the last change's resolution reopens the review.
            this.activeDiffs.set(diffKey, diff);
            this.onDidChangeActiveDiffsEmitter.fire();
            void vscode.commands.executeCommand('setContext', 'antigravity.hasActiveDiff', true);
        }
        // Lets AgentEditManager update the changes overview.
        this.onDidReplayResolutionEmitter.fire({
            uri: diff.uri,
            pendingHunkHashes: diff.changes.ranges.map(changeHash),
            accept: record.accept,
        });
        this.updateUndoContext();
        this.codeLensProvider.refresh();
        this.refreshVisibleEditorDecorations(diffKey, diff.changes);
        return true;
    }
    /**
     * Returns whether `event` is the pre-save edit of an auto-save dropping the
     * deleted lines (see handleDocumentWillSave), after remapping the review
     * onto the buffer without them.
     * @private
     * @param {string} key
     * @param {!tsickle_vscode_2.TextDocumentChangeEvent} event
     * @return {boolean}
     */
    applyPendingHide(key, event) {
        /** @type {(undefined|!ActiveDiff)} */
        const activeDiff = this.activeDiffs.get(key);
        /** @type {(undefined|string)} */
        const expected = activeDiff?.pendingHideText;
        if (!activeDiff || expected === undefined)
            return false;
        /** @type {string} */
        const text = event.document.getText();
        // Wait for the buffer that edit leaves; other edits may land first.
        if (text !== expected)
            return false;
        activeDiff.pendingHideText = undefined;
        if (activeDiff.deletionsHidden)
            return false;
        activeDiff.changes.ranges = hideDeletionLines(activeDiff.changes.ranges);
        activeDiff.deletionsHidden = true;
        activeDiff.combinedText = text;
        activeDiff.modifiedText = text;
        // Like the reload after an auto-save: Ctrl+Z can't bring the red lines back.
        activeDiff.stagedText = text;
        this.refreshVisibleEditorDecorations(key, activeDiff.changes);
        this.debouncedRefreshCodeLenses();
        return true;
    }
    /**
     * @private
     * @param {!tsickle_vscode_2.TextDocumentChangeEvent} event
     * @return {void}
     */
    handleDocumentEdit(event) {
        this.trackDirtyState(event);
        if (this.isResolvingHunk)
            return;
        /** @type {string} */
        const key = event.document.uri.toString();
        /** @type {string} */
        const normalizedKey = (0, utils_1.normalizeUri)(key);
        // Ignore async echoes of registerDiff's own edits and save hooks.
        if (this.applyingDiffUris.has(normalizedKey) ||
            this.internalSaveUris.has(normalizedKey) ||
            this.pendingManualSaveUris.has(normalizedKey)) {
            return;
        }
        if (this.applyPendingHide(key, event))
            return;
        if (this.replayResolution(key, event)) {
            // Ctrl+Z may have reopened a closed review; track it from here on.
            this.trackDirtyState(event);
            return;
        }
        // Typing ends Ctrl+Y of undone decisions, like VS Code's own redo.
        if (event.reason === undefined &&
            event.contentChanges.length > 0 &&
            this.resolutionRedo.delete(normalizedKey)) {
            this.updateUndoContext();
        }
        /** @type {(undefined|!ActiveDiff)} */
        const activeDiff = this.activeDiffs.get(key);
        if (!activeDiff || !activeDiff.hasBeenShown)
            return;
        // VS Code reloaded the agent text restored after an auto-save.
        /** @type {string} */
        const text = event.document.getText();
        if (activeDiff.pendingReloadText !== undefined) {
            /** @type {boolean} */
            const isReload = !event.document.isDirty && text === activeDiff.pendingReloadText;
            if (isReload || event.document.isDirty) {
                activeDiff.pendingReloadText = undefined;
            }
            if (isReload) {
                activeDiff.changes.ranges = hideDeletionLines(activeDiff.changes.ranges);
                activeDiff.deletionsHidden = true;
                activeDiff.combinedText = text;
                activeDiff.modifiedText = text;
                activeDiff.stagedText = text;
                this.refreshVisibleEditorDecorations(key, activeDiff.changes);
                this.debouncedRefreshCodeLenses();
                return;
            }
        }
        // Ctrl+Z removed the red lines, leaving the agent text.
        if (event.reason === vscode.TextDocumentChangeReason?.Undo &&
            !activeDiff.deletionsHidden &&
            !event.document.isDirty &&
            text === activeDiff.modifiedText &&
            text !== activeDiff.combinedText) {
            activeDiff.changes.ranges = hideDeletionLines(activeDiff.changes.ranges);
            activeDiff.deletionsHidden = true;
            activeDiff.combinedText = text;
            activeDiff.stagedText = text;
            this.refreshVisibleEditorDecorations(key, activeDiff.changes);
            this.debouncedRefreshCodeLenses();
            return;
        }
        activeDiff.changes.ranges = (0, inline_diff_range_tracker_1.recalculateInlineDiffRanges)(activeDiff.changes.ranges, event.contentChanges);
        activeDiff.combinedText = text;
        // A clean buffer was reverted to disk (e.g. "Don't Save"), not user typing.
        if (event.document.isDirty) {
            activeDiff.hasUserEdits = true;
            this.syncBaselines(activeDiff, text);
        }
        this.refreshVisibleEditorDecorations(key, activeDiff.changes);
        this.debouncedRefreshCodeLenses();
    }
    /**
     * Recomputes the texts Accept all / Reject all / Ctrl+S write from the buffer
     * and the pending changes, so decisions and typing so far are kept.
     * @private
     * @param {!ActiveDiff} diff
     * @param {string} text
     * @return {void}
     */
    syncBaselines(diff, text) {
        if (diff.deletionsHidden) {
            // The deleted lines aren't in the buffer; restore them from the ranges.
            diff.modifiedText = text;
            diff.originalText = restoreHiddenOriginal(text, diff.changes.ranges);
        }
        else {
            diff.modifiedText = this.stripHunkLines(text, diff.changes.ranges, (/**
             * @param {!tsickle_inline_diff_change_range_5.InlineDiffChangeRange} r
             * @return {(undefined|!tsickle_vscode_2.Range)}
             */
            (r) => r.deletionRange));
            diff.originalText = this.stripHunkLines(text, diff.changes.ranges, (/**
             * @param {!tsickle_inline_diff_change_range_5.InlineDiffChangeRange} r
             * @return {(undefined|!tsickle_vscode_2.Range)}
             */
            (r) => r.additionRange));
        }
    }
    /**
     * Records whether closing the tab would ask to save. A clean buffer after a
     * dirty one, without undo or our own edits, is a revert to disk: "Don't Save"
     * does that right before the tab closes, so the dialog was shown.
     * @private
     * @param {!tsickle_vscode_2.TextDocumentChangeEvent} event
     * @return {void}
     */
    trackDirtyState(event) {
        /** @type {(undefined|!ActiveDiff)} */
        const diff = this.activeDiffs.get(event.document.uri.toString());
        if (!diff)
            return;
        /** @type {boolean} */
        const dirty = event.document.isDirty;
        /** @type {string} */
        const normalizedKey = (0, utils_1.normalizeUri)(diff.uri.toString());
        /** @type {boolean} */
        const isRevert = !dirty &&
            diff.lastKnownDirty === true &&
            event.reason === undefined &&
            !this.isResolvingHunk &&
            !this.applyingDiffUris.has(normalizedKey) &&
            !this.internalSaveUris.has(normalizedKey) &&
            !this.pendingManualSaveUris.has(normalizedKey);
        if (!isRevert)
            diff.lastKnownDirty = dirty;
    }
    /**
     * @private
     * @template T
     * @param {string} text
     * @param {!Array<T>} ranges
     * @param {function(T): (undefined|!tsickle_vscode_2.Range)} pickRange
     * @return {string}
     */
    stripHunkLines(text, ranges, pickRange) {
        /** @type {!Set<number>} */
        const excluded = new Set();
        for (const r of ranges) {
            /** @type {(undefined|!tsickle_vscode_2.Range)} */
            const target = pickRange(r);
            if (target) {
                for (let line = target.start.line; line <= target.end.line; line++) {
                    excluded.add(line);
                }
            }
        }
        if (excluded.size === 0)
            return text;
        return text
            .split('\n')
            .filter((/**
         * @param {string} _
         * @param {number} idx
         * @return {boolean}
         */
        (_, idx) => !excluded.has(idx)))
            .join('\n');
    }
    // Update antigravity.hasActiveDiff context key when active editor focus changes.
    /**
     * @private
     * @param {!tsickle_vscode_2.TextEditor} editor
     * @return {!Promise<void>}
     */
    async handleActiveEditorChange(editor) {
        /** @type {string} */
        const key = editor.document.uri.toString();
        /** @type {(undefined|!ActiveDiff)} */
        const activeDiff = this.getActiveDiff(key);
        if (activeDiff) {
            await this.showDiffInEditor(editor, activeDiff);
            await vscode.commands.executeCommand('setContext', 'antigravity.hasActiveDiff', true);
        }
        else {
            this.clearDecorations(editor);
            await vscode.commands.executeCommand('setContext', 'antigravity.hasActiveDiff', false);
        }
    }
    // Revert to originalText and reject diff when document is closed without saving.
    /**
     * @private
     * @param {!tsickle_vscode_2.TextDocument} document
     * @return {!Promise<void>}
     */
    async handleDocumentClose(document) {
        /** @type {string} */
        const key = document.uri.toString();
        // Wait for a "Save"-driven finalization before deciding to reject.
        await this.finalizingUris.get((0, utils_1.normalizeUri)(key));
        /** @type {(undefined|!ActiveDiff)} */
        const activeDiff = this.getActiveDiff(key);
        if (!activeDiff) {
            return;
        }
        // Do not reject if document is still open in any tab group or visible editor.
        /** @type {string} */
        const normalizedKey = (0, utils_1.normalizeUri)(key);
        for (const group of vscode.window.tabGroups?.all ?? []) {
            for (const tab of group.tabs) {
                /** @type {(undefined|!tsickle_vscode_2.Uri)} */
                const uri = getTabUri(tab);
                if (uri && (0, utils_1.normalizeUri)(uri.toString()) === normalizedKey) {
                    return;
                }
            }
        }
        for (const editor of vscode.window.visibleTextEditors ?? []) {
            if ((0, utils_1.normalizeUri)(editor.document.uri.toString()) === normalizedKey) {
                return;
            }
        }
        if (!hadSaveDialog(activeDiff)) {
            await this.finalizeFile(key, undefined, activeDiff);
            return;
        }
        await this.rejectAll(activeDiff.uri);
    }
    // Handle closed tabs to reject diffs when dirty buffer state is discarded.
    /**
     * @private
     * @param {!tsickle_vscode_2.TabChangeEvent} event
     * @return {!Promise<void>}
     */
    async handleTabsChange(event) {
        if (!event.closed || event.closed.length === 0) {
            return;
        }
        // Collect all URIs currently open in any tab group.
        /** @type {!Set<string>} */
        const openUris = new Set();
        for (const group of vscode.window.tabGroups?.all ?? []) {
            for (const tab of group.tabs) {
                /** @type {(undefined|!tsickle_vscode_2.Uri)} */
                const uri = getTabUri(tab);
                if (uri) {
                    openUris.add((0, utils_1.normalizeUri)(uri.toString()));
                }
            }
        }
        for (const tab of event.closed) {
            /** @type {(undefined|!tsickle_vscode_2.Uri)} */
            const uri = getTabUri(tab);
            if (!uri)
                continue;
            /** @type {string} */
            const uriStr = uri.toString();
            /** @type {string} */
            const normalizedUri = (0, utils_1.normalizeUri)(uriStr);
            // Skip if the file remains open in another split editor.
            if (openUris.has(normalizedUri)) {
                continue;
            }
            // Wait for a "Save"-driven finalization first.
            await this.finalizingUris.get(normalizedUri);
            /** @type {(undefined|!ActiveDiff)} */
            const activeDiff = this.getActiveDiff(uriStr);
            if (!activeDiff) {
                continue;
            }
            if (!hadSaveDialog(activeDiff)) {
                await this.finalizeFile(uriStr, undefined, activeDiff);
                continue;
            }
            await this.rejectAll(activeDiff.uri);
        }
    }
    /**
     * Reloads from disk via AntigravityFiles, then cider.ai, then revert.
     * @private
     * @param {!tsickle_vscode_2.Uri} uri
     * @return {!Promise<void>}
     */
    async forceReloadFromFile(uri) {
        try {
            /** @type {boolean} */
            let inCider = false;
            try {
                inCider = (0, utils_1.hasCiderForceResolveFromFile)();
            }
            catch {
                // Not in Cider.
            }
            if (inCider) {
                await cider_1.cider.ai.forceResolveFromFile(uri);
                return;
            }
            /** @type {!tsickle_vscode_2.TextDocument} */
            const doc = await vscode.workspace.openTextDocument(uri);
            if (doc.isDirty) {
                /** @type {(undefined|!tsickle_vscode_2.TextDocument)} */
                const previousActiveDoc = vscode.window.activeTextEditor?.document;
                await vscode.window.showTextDocument(doc, {
                    preview: false,
                    preserveFocus: false,
                });
                await vscode.commands.executeCommand('workbench.action.files.revert');
                if (previousActiveDoc &&
                    previousActiveDoc.uri.toString() !== doc.uri.toString()) {
                    await vscode.window.showTextDocument(previousActiveDoc, {
                        preview: false,
                        preserveFocus: true,
                    });
                }
            }
        }
        catch (e) {
            console.warn(`[Antigravity] forceReloadFromFile failed for ${uri.toString()}:`, e);
        }
    }
    /**
     * Saves textToPersist, falling back to fs.writeFile plus a reload.
     * @private
     * @param {!tsickle_vscode_2.TextDocument} document
     * @param {(undefined|string)=} targetText
     * @return {!Promise<void>}
     */
    async safeSaveDocument(document, targetText) {
        /** @type {!tsickle_vscode_2.Uri} */
        const uri = document.uri;
        /** @type {string} */
        const textToPersist = targetText ?? document.getText();
        if (document.isDirty) {
            try {
                await document.save();
            }
            catch { }
        }
        if (vscode.workspace?.fs) {
            try {
                /** @type {!Uint8Array} */
                const targetBytes = new TextEncoder().encode(textToPersist);
                /** @type {boolean} */
                let diskMatches = false;
                try {
                    /** @type {!Uint8Array} */
                    const diskBytes = await vscode.workspace.fs.readFile(uri);
                    diskMatches =
                        diskBytes.length === targetBytes.length &&
                            diskBytes.every((/**
                             * @param {number} b
                             * @param {number} i
                             * @return {boolean}
                             */
                            (b, i) => b === targetBytes[i]));
                }
                catch {
                    diskMatches = false;
                }
                if (!diskMatches) {
                    await vscode.workspace.fs.writeFile(uri, targetBytes);
                }
            }
            catch { }
        }
        if (document.isDirty) {
            await this.forceReloadFromFile(uri);
            if (document.isDirty) {
                try {
                    await document.save();
                }
                catch { }
            }
        }
    }
    /**
     * Reverts to originalText and saves.
     * @private
     * @param {!tsickle_vscode_2.TextDocument} document
     * @param {string} originalText
     * @return {!Promise<void>}
     */
    async revertDocument(document, originalText) {
        /** @type {string} */
        const normalizedKey = (0, utils_1.normalizeUri)(document.uri.toString());
        this.internalSaveUris.add(normalizedKey);
        try {
            await this.applyContentReplacement(document, originalText);
            await this.safeSaveDocument(document, originalText);
        }
        finally {
            this.internalSaveUris.delete(normalizedKey);
        }
    }
    /**
     * Whether the file was deleted or rewritten outside the review.
     * @private
     * @param {!ActiveDiff} activeDiff
     * @return {!Promise<boolean>}
     */
    async isChangedOutside(activeDiff) {
        if (!vscode.workspace?.fs) {
            return false;
        }
        /** @type {string} */
        let diskText;
        try {
            diskText = new TextDecoder().decode(await vscode.workspace.fs.readFile(activeDiff.uri));
        }
        catch (e) {
            return e instanceof vscode.FileSystemError && (/** @type {!tsickle_vscode_2.FileSystemError} */ (e)).code === 'FileNotFound';
        }
        /** @type {string} */
        const disk = (0, utils_1.normalizeLineEndings)(diskText);
        /** @type {!Array<string>} */
        const known = [
            activeDiff.originalText,
            activeDiff.modifiedText,
            ...(activeDiff.savedTexts ?? []),
        ];
        return !known.some((/**
         * @param {string} text
         * @return {boolean}
         */
        (text) => (0, utils_1.normalizeLineEndings)(text) === disk));
    }
    /**
     * Ends the review without writing if the file changed outside it. A dirty
     * buffer gets `bufferText` instead of the red lines.
     * @private
     * @param {!ActiveDiff} activeDiff
     * @param {(undefined|!tsickle_vscode_2.TextDocument)=} document
     * @param {(undefined|string)=} bufferText
     * @return {!Promise<boolean>}
     */
    async endIfChangedOutside(activeDiff, document, bufferText) {
        if (!(await this.isChangedOutside(activeDiff))) {
            return false;
        }
        /** @type {string} */
        const key = activeDiff.uri.toString();
        if (this.activeDiffs.get(key) !== activeDiff) {
            return true;
        }
        console.info(`[Antigravity] ${key} changed outside the review; closing it without writing.`);
        await this.dropDiff(activeDiff);
        if (document?.isDirty && bufferText !== undefined) {
            await this.applyContentReplacement(document, bufferText);
            // Revert unless the text was never on disk (e.g. typing).
            if (activeDiff.savedTexts?.has(bufferText)) {
                await this.forceReloadFromFile(activeDiff.uri);
            }
        }
        return true;
    }
    /**
     * Ends a review without touching the buffer or disk; reports it kept.
     * @private
     * @param {!ActiveDiff} activeDiff
     * @return {!Promise<void>}
     */
    async dropDiff(activeDiff) {
        /** @type {string} */
        const key = activeDiff.uri.toString();
        this.activeDiffs.delete(key);
        this.clearResolutionHistory(key);
        for (const editor of vscode.window.visibleTextEditors) {
            if (editor.document.uri.toString() === key) {
                this.clearDecorations(editor);
            }
        }
        this.onDidChangeActiveDiffsEmitter.fire();
        this.debouncedRefreshCodeLenses();
        this.updateUndoContext();
        await vscode.commands.executeCommand('setContext', 'antigravity.hasActiveDiff', this.activeDiffs.size > 0);
        this.onDidFinalizeFileEmitter.fire({
            uri: activeDiff.uri,
            accepted: true,
            modifiedText: activeDiff.modifiedText,
        });
    }
    /**
     * Closes the review before a rename, dropping the red lines.
     * @private
     * @param {!ActiveDiff} activeDiff
     * @return {!Promise<void>}
     */
    async keepAgentTextBeforeRename(activeDiff) {
        /** @type {!tsickle_vscode_2.TextDocument} */
        const document = await vscode.workspace.openTextDocument(activeDiff.uri);
        if (this.activeDiffs.get(activeDiff.uri.toString()) !== activeDiff) {
            return;
        }
        /** @type {string} */
        const agentText = activeDiff.deletionsHidden
            ? document.getText()
            : this.stripHunkLines(document.getText(), activeDiff.changes.ranges, (/**
             * @param {!tsickle_inline_diff_change_range_5.InlineDiffChangeRange} r
             * @return {(undefined|!tsickle_vscode_2.Range)}
             */
            (r) => r.deletionRange));
        await this.dropDiff(activeDiff);
        await this.applyContentReplacement(document, agentText);
        // Without typing this matches disk, so save to move a clean buffer.
        if (document.isDirty &&
            !(await this.isDiskDifferent(document, agentText))) {
            await document.save();
        }
    }
    /**
     * @private
     * @param {!tsickle_vscode_2.TextDocument} document
     * @param {string} text
     * @return {!Promise<boolean>}
     */
    async isDiskDifferent(document, text) {
        try {
            /** @type {string} */
            const disk = new TextDecoder().decode(await vscode.workspace.fs.readFile(document.uri));
            return (0, utils_1.normalizeLineEndings)(disk) !== (0, utils_1.normalizeLineEndings)(text);
        }
        catch {
            return true;
        }
    }
    /**
     * Applies targetText, saves, clears diff state, fires onDidFinalizeFile.
     *
     * Abandoned if `expectedDiff` is no longer the current diff.
     * @private
     * @param {string} uriStr
     * @param {(undefined|boolean)=} accepted
     * @param {(undefined|!ActiveDiff)=} expectedDiff
     * @param {boolean=} keepHistory
     * @return {!Promise<void>}
     */
    async finalizeFile(uriStr, accepted, expectedDiff, keepHistory = false) {
        /** @type {(undefined|!ActiveDiff)} */
        const activeDiff = this.getActiveDiff(uriStr);
        if (!activeDiff) {
            console.warn(`[Antigravity] finalizeFile: no active diff found for ${uriStr}`);
            return;
        }
        if (expectedDiff !== undefined && activeDiff !== expectedDiff) {
            return;
        }
        /** @type {string} */
        const key = activeDiff.uri.toString();
        /** @type {string} */
        const normalizedKey = (0, utils_1.normalizeUri)(key);
        if (this.internalSaveUris.has(normalizedKey)) {
            return;
        }
        // Whole-file resolutions end Ctrl+Z history unless the user can undo them.
        if (accepted !== undefined && !keepHistory) {
            this.clearResolutionHistory(key);
        }
        this.internalSaveUris.add(normalizedKey);
        try {
            /** @type {!tsickle_vscode_2.TextDocument} */
            const document = await vscode.workspace.openTextDocument(activeDiff.uri);
            // Superseded by a newer diff; writing targetText would revert it.
            if (this.activeDiffs.get(key) !== activeDiff) {
                return;
            }
            /** @type {string} */
            const targetText = accepted === true
                ? activeDiff.modifiedText
                : accepted === false
                    ? activeDiff.originalText
                    : document.getText();
            if (await this.endIfChangedOutside(activeDiff, document, targetText)) {
                return;
            }
            if (document.getText() !== targetText) {
                await this.applyContentReplacement(document, targetText);
            }
            // Ctrl+Z can reopen this review over what is written here.
            (activeDiff.savedTexts ??= new Set()).add(targetText);
            await this.safeSaveDocument(document, targetText);
            // Ctrl+Z can reopen this diff, and the save's dirty-change event may
            // arrive only after the diff is gone.
            activeDiff.lastKnownDirty = document.isDirty;
            // Re-check: applying and saving both yield to the event loop.
            if (this.activeDiffs.get(key) !== activeDiff) {
                return;
            }
            this.activeDiffs.delete(key);
            if (uriStr !== key && this.activeDiffs.get(uriStr) === activeDiff) {
                this.activeDiffs.delete(uriStr);
            }
            this.onDidChangeActiveDiffsEmitter.fire();
            this.debouncedRefreshCodeLenses();
            this.updateUndoContext();
            await vscode.commands.executeCommand('setContext', 'antigravity.hasActiveDiff', this.activeDiffs.size > 0);
            for (const editor of vscode.window.visibleTextEditors) {
                if (editor.document.uri.toString() === key) {
                    this.clearDecorations(editor);
                }
            }
            this.refreshGitAndGitLens(activeDiff.uri);
            /** @type {boolean} */
            const finalAccepted = accepted ?? document.getText() !== activeDiff.originalText;
            this.onDidFinalizeFileEmitter.fire({
                uri: activeDiff.uri,
                accepted: finalAccepted,
                modifiedText: activeDiff.modifiedText,
            });
        }
        finally {
            this.internalSaveUris.delete(normalizedKey);
        }
    }
    // Pre-save: manual saves write modifiedText; auto-saves are left alone.
    /**
     * @private
     * @param {!tsickle_vscode_2.TextDocumentWillSaveEvent} event
     * @return {void}
     */
    handleDocumentWillSave(event) {
        try {
            /** @type {string} */
            const normalizedKey = (0, utils_1.normalizeUri)(event.document.uri.toString());
            if (this.internalSaveUris.has(normalizedKey)) {
                return;
            }
            /** @type {string} */
            const key = event.document.uri.toString();
            /** @type {(undefined|!ActiveDiff)} */
            const activeDiff = this.getActiveDiff(key);
            if (!activeDiff) {
                // A manual Save after the review closed ends Ctrl+Z into it.
                /** @type {string} */
                const normalizedUri = (0, utils_1.normalizeUri)(key);
                if ((event.reason == null ||
                    event.reason === vscode.TextDocumentSaveReason.Manual) &&
                    (this.resolutionUndo.has(normalizedUri) ||
                        this.resolutionRedo.has(normalizedUri))) {
                    this.clearResolutionHistory(key);
                }
                return;
            }
            /** @type {!tsickle_vscode_2.TextDocument} */
            const doc = event.document;
            /** @type {!tsickle_vscode_2.Position} */
            const endPosition = doc.lineCount > 0
                ? doc.lineAt(doc.lineCount - 1).range.end
                : new vscode.Position(0, 0);
            /** @type {!tsickle_vscode_2.Range} */
            const fullRange = new vscode.Range(new vscode.Position(0, 0), endPosition);
            // Auto-saves never resolve the diff. They drop the red deleted lines from
            // the buffer first, so disk only ever gets the agent text plus the user's
            // typing, whatever the Auto Save setting was when the review started.
            if (event.reason != null &&
                event.reason !== vscode.TextDocumentSaveReason.Manual) {
                /** @type {(undefined|{edits: !Array<!tsickle_vscode_2.TextEdit>, text: string})} */
                const removal = activeDiff.deletionsHidden
                    ? undefined
                    : deletedLinesRemoval(doc, activeDiff.changes.ranges);
                // handleDocumentEdit switches the review over once this edit lands.
                activeDiff.pendingHideText = removal?.text;
                /** @type {!Array<!tsickle_vscode_2.TextEdit>} */
                const edits = removal?.edits ?? [];
                // Snapshot disk before the flush so didSave can keep a newer write.
                /** @type {!tsickle_vscode_2.FileSystem} */
                const fs = vscode.workspace?.fs;
                if (fs) {
                    event.waitUntil(Promise.resolve(fs.readFile(doc.uri))
                        .then((/**
                     * @param {!Uint8Array} bytes
                     * @return {void}
                     */
                    (bytes) => {
                        this.preAutoSaveDiskText.set(normalizedKey, new TextDecoder().decode(bytes));
                    }))
                        .catch((/**
                     * @return {void}
                     */
                    () => { }))
                        .then((/**
                     * @return {!Array<!tsickle_vscode_2.TextEdit>}
                     */
                    () => edits)));
                }
                else if (edits.length > 0) {
                    event.waitUntil(Promise.resolve(edits));
                }
                return;
            }
            this.pendingManualSaveUris.add(normalizedKey);
            // A clean buffer reloaded after an outside change: save it as is.
            event.waitUntil(((/**
             * @return {!Promise<!Array<!tsickle_vscode_2.TextEdit>>}
             */
            async () => {
                /** @type {boolean} */
                const isReloaded = !doc.isDirty && (await this.isChangedOutside(activeDiff));
                if (!isReloaded) {
                    return [
                        vscode.TextEdit.replace(fullRange, activeDiff.modifiedText),
                    ];
                }
                // End the review so didSave doesn't finalize it.
                this.pendingManualSaveUris.delete(normalizedKey);
                if (this.activeDiffs.get(key) === activeDiff) {
                    await this.dropDiff(activeDiff);
                }
                return [];
            }))());
        }
        catch (e) {
            console.error('[Antigravity] Error handling document will save:', e);
        }
    }
    // Post-save: a manual save accepts; an auto-save keeps the diff open.
    /**
     * @private
     * @param {!tsickle_vscode_2.TextDocument} document
     * @return {void}
     */
    handleDocumentDidSave(document) {
        /** @type {string} */
        const normalizedKey = (0, utils_1.normalizeUri)(document.uri.toString());
        /** @type {(undefined|!ActiveDiff)} */
        const savedDiff = this.getActiveDiff(document.uri.toString());
        if (savedDiff) {
            (savedDiff.savedTexts ??= new Set()).add(document.getText());
        }
        if (this.internalSaveUris.has(normalizedKey)) {
            return;
        }
        /** @type {boolean} */
        const isManualSave = this.pendingManualSaveUris.delete(normalizedKey);
        if (!isManualSave) {
            /** @type {(undefined|string)} */
            const snapshot = this.preAutoSaveDiskText.get(normalizedKey);
            this.preAutoSaveDiskText.delete(normalizedKey);
            // Fallback if willSave's edit didn't land: put the agent text back on disk.
            /** @type {(undefined|!ActiveDiff)} */
            const activeDiff = this.getActiveDiff(document.uri.toString());
            if (activeDiff)
                activeDiff.lastKnownDirty = document.isDirty;
            if (!activeDiff || !vscode.workspace?.fs)
                return;
            /** @type {string} */
            const savedText = document.getText();
            // The saved buffer minus its red deleted lines.
            /** @type {string} */
            const agentText = this.stripHunkLines(savedText, activeDiff.changes.ranges, (/**
             * @param {!tsickle_inline_diff_change_range_5.InlineDiffChangeRange} r
             * @return {(undefined|!tsickle_vscode_2.Range)}
             */
            (r) => r.deletionRange));
            // Keep a newer backend write this diff hasn't seen yet (no user typing).
            // After an unsaved per-change Reject, disk differs only because it still
            // has the rejected change, so it isn't newer.
            /** @type {boolean} */
            const isNewerWrite = snapshot !== undefined &&
                snapshot !== savedText &&
                snapshot !== agentText &&
                snapshot !== activeDiff.modifiedText &&
                !activeDiff.hasUserEdits &&
                !this.hasUnsavedRejection(document.uri.toString());
            /** @type {string} */
            const restoreText = isNewerWrite ? snapshot : agentText;
            if (savedText !== restoreText) {
                (activeDiff.savedTexts ??= new Set()).add(restoreText);
                // Remap ranges once VS Code reloads the restored agent text.
                if (!isNewerWrite)
                    activeDiff.pendingReloadText = restoreText;
                Promise.resolve(vscode.workspace.fs.readFile(activeDiff.uri))
                    .then((/**
                 * @param {!Uint8Array} diskBytes
                 * @return {!Promise<void>}
                 */
                async (diskBytes) => {
                    // Skip if something else has written to disk since.
                    if (new TextDecoder().decode(diskBytes) !== savedText)
                        return;
                    /** @type {!Uint8Array} */
                    const encoded = new TextEncoder().encode(restoreText);
                    await vscode.workspace.fs.writeFile(activeDiff.uri, encoded);
                }))
                    .catch((/**
                 * @param {?} e
                 * @return {void}
                 */
                (e) => {
                    console.warn(`[Antigravity] Failed to restore modifiedText after auto-save for ${activeDiff.uri.toString()}:`, e);
                }));
            }
            return;
        }
        /** @type {string} */
        const key = document.uri.toString();
        /** @type {(undefined|!ActiveDiff)} */
        const activeDiff = this.getActiveDiff(key);
        if (activeDiff) {
            // Publish so a concurrent tab close waits instead of rejecting.
            /** @type {!Promise<void>} */
            const finalizing = this.finalizeFile(key, true).catch((/**
             * @param {?} e
             * @return {void}
             */
            (e) => {
                console.error('[Antigravity] Error finalizing file on save:', e);
            }));
            this.finalizingUris.set(normalizedKey, finalizing);
            void finalizing.finally((/**
             * @return {void}
             */
            () => {
                if (this.finalizingUris.get(normalizedKey) === finalizing) {
                    this.finalizingUris.delete(normalizedKey);
                }
            }));
        }
    }
    /**
     * @private
     * @param {string} uriStr
     * @param {!tsickle_inline_diff_changes_6.InlineDiffChanges} changes
     * @return {void}
     */
    refreshVisibleEditorDecorations(uriStr, changes) {
        /** @type {string} */
        const normalizedTarget = (0, utils_1.normalizeUri)(uriStr);
        for (const editor of vscode.window.visibleTextEditors) {
            if ((0, utils_1.normalizeUri)(editor.document.uri.toString()) === normalizedTarget) {
                this.applyDecorations(editor, changes);
            }
        }
    }
    /**
     * @private
     * @return {void}
     */
    refreshAllVisibleDecorations() {
        for (const editor of vscode.window.visibleTextEditors) {
            /** @type {string} */
            const key = editor.document.uri.toString();
            /** @type {(undefined|!ActiveDiff)} */
            const activeDiff = this.activeDiffs.get(key);
            if (activeDiff) {
                this.applyDecorations(editor, activeDiff.changes);
            }
            else {
                this.clearDecorations(editor);
            }
        }
    }
}
exports.InlineDiffManager = InlineDiffManager;
/* istanbul ignore if */
if (false) {
    /**
     * @const {!Map<string, !ActiveDiff>}
     * @private
     */
    InlineDiffManager.prototype.activeDiffs;
    /**
     * @const {!Set<string>}
     * @private
     */
    InlineDiffManager.prototype.internalSaveUris;
    /**
     * @const {!Set<string>}
     * @private
     */
    InlineDiffManager.prototype.pendingManualSaveUris;
    /**
     * @const {!Map<string, string>}
     * @private
     */
    InlineDiffManager.prototype.preAutoSaveDiskText;
    /**
     * @const {!Map<string, !Promise<void>>}
     * @private
     */
    InlineDiffManager.prototype.finalizingUris;
    /**
     * @const {!Array<!tsickle_vscode_2.Disposable>}
     * @private
     */
    InlineDiffManager.prototype.disposables;
    /**
     * @const {!InlineDiffCodeLensProvider}
     * @private
     */
    InlineDiffManager.prototype.codeLensProvider;
    /**
     * @type {boolean}
     * @private
     */
    InlineDiffManager.prototype.isResolvingHunk;
    /**
     * @const {!tsickle_vscode_2.EventEmitter<{uri: !tsickle_vscode_2.Uri, accepted: boolean, modifiedText: string}>}
     * @private
     */
    InlineDiffManager.prototype.onDidFinalizeFileEmitter;
    /**
     * @const {!tsickle_vscode_2.Event<{uri: !tsickle_vscode_2.Uri, accepted: boolean, modifiedText: string}>}
     * @public
     */
    InlineDiffManager.prototype.onDidFinalizeFile;
    /**
     * @const {!tsickle_vscode_2.EventEmitter<{uri: !tsickle_vscode_2.Uri, hunkIndex: number, accept: boolean, hunkHash: string}>}
     * @private
     */
    InlineDiffManager.prototype.onDidResolveHunkEmitter;
    /**
     * @const {!tsickle_vscode_2.Event<{uri: !tsickle_vscode_2.Uri, hunkIndex: number, accept: boolean, hunkHash: string}>}
     * @public
     */
    InlineDiffManager.prototype.onDidResolveHunk;
    /**
     * Ctrl+Z / Ctrl+Y changed which changes are pending in an open review.
     * @const {!tsickle_vscode_2.EventEmitter<{uri: !tsickle_vscode_2.Uri, pendingHunkHashes: !Array<string>, accept: boolean}>}
     * @private
     */
    InlineDiffManager.prototype.onDidReplayResolutionEmitter;
    /**
     * @const {!tsickle_vscode_2.Event<{uri: !tsickle_vscode_2.Uri, pendingHunkHashes: !Array<string>, accept: boolean}>}
     * @public
     */
    InlineDiffManager.prototype.onDidReplayResolution;
    /**
     * @const {!tsickle_vscode_2.EventEmitter<void>}
     * @private
     */
    InlineDiffManager.prototype.onDidChangeActiveDiffsEmitter;
    /**
     * @const {!tsickle_vscode_2.Event<void>}
     * @public
     */
    InlineDiffManager.prototype.onDidChangeActiveDiffs;
    /**
     * @type {(undefined|number)}
     * @private
     */
    InlineDiffManager.prototype.refreshTimeout;
    /**
     * @type {(undefined|number)}
     * @private
     */
    InlineDiffManager.prototype.gitRefreshTimeout;
    /**
     * @const {!DiffStyles}
     * @private
     */
    InlineDiffManager.prototype.styles;
    /**
     * URIs whose diff is mid-application; their change events must be ignored.
     * @const {!Set<string>}
     * @private
     */
    InlineDiffManager.prototype.applyingDiffUris;
    /**
     * Per-change resolutions that Ctrl+Z / Ctrl+Y can replay, by URI.
     * @const {!Map<string, !Array<!ResolutionRecord>>}
     * @private
     */
    InlineDiffManager.prototype.resolutionUndo;
    /**
     * @const {!Map<string, !Array<!ResolutionRecord>>}
     * @private
     */
    InlineDiffManager.prototype.resolutionRedo;
    /**
     * @const {!InlineDiffManagerOptions}
     * @private
     */
    InlineDiffManager.prototype.options;
}
/**
 * TextDocumentContentProvider providing original document content from register Diff states.
 * @implements {tsickle_vscode_2.TextDocumentContentProvider}
 */
class OriginalDocumentProvider {
    /**
     * @public
     * @param {!InlineDiffManager} manager
     */
    constructor(manager) {
        this.manager = manager;
    }
    /**
     * @public
     * @param {!tsickle_vscode_2.Uri} uri
     * @return {string}
     */
    provideTextDocumentContent(uri) {
        /** @type {string} */
        const cleanPath = decodeURIComponent(uri.path).replace(/^\//, '');
        /** @type {(undefined|!ActiveDiff)} */
        const activeDiff = this.manager.getActiveDiff(cleanPath);
        return activeDiff ? activeDiff.originalText : '';
    }
}
/* istanbul ignore if */
if (false) {
    /**
     * @const {!InlineDiffManager}
     * @private
     */
    OriginalDocumentProvider.prototype.manager;
}
/**
 * CodeLensProvider generating Accept/Reject buttons above active hunks.
 * @implements {tsickle_vscode_2.CodeLensProvider<!tsickle_vscode_2.CodeLens>}
 */
class InlineDiffCodeLensProvider {
    /**
     * @public
     * @param {!InlineDiffManager} manager
     */
    constructor(manager) {
        this.manager = manager;
        this.changeEmitter = new vscode.EventEmitter();
        this.onDidChangeCodeLenses = this.changeEmitter.event;
    }
    /**
     * @public
     * @param {!tsickle_vscode_2.TextDocument} document
     * @param {!tsickle_vscode_2.CancellationToken} token
     * @return {!Array<!tsickle_vscode_2.CodeLens>}
     */
    provideCodeLenses(document, token) {
        /** @type {(undefined|!ActiveDiff)} */
        const activeDiff = this.manager.getActiveDiff(document.uri.toString());
        if (!activeDiff ||
            !activeDiff.changes.exists() ||
            token.isCancellationRequested) {
            return [];
        }
        /** @type {!Array<!tsickle_vscode_2.CodeLens>} */
        const codeLenses = [];
        for (const [index__tsickle_destructured_7, range__tsickle_destructured_8] of activeDiff.changes.ranges.entries()) {
            const index = /** @type {number} */ (index__tsickle_destructured_7);
            const range = /** @type {!tsickle_inline_diff_change_range_5.InlineDiffChangeRange} */ (range__tsickle_destructured_8);
            /** @type {!tsickle_vscode_2.Position} */
            const position = new vscode.Position(range.start, 0);
            /** @type {!tsickle_vscode_2.Range} */
            const codeLensRange = new vscode.Range(position, position);
            codeLenses.push(new vscode.CodeLens(codeLensRange, {
                title: '$(check) Accept',
                tooltip: 'Accept this suggestion block',
                command: 'antigravity.inlineDiff.accept',
                arguments: [document.uri.toString(), index],
            }), new vscode.CodeLens(codeLensRange, {
                title: '$(chrome-close) Reject',
                tooltip: 'Reject this suggestion block',
                command: 'antigravity.inlineDiff.reject',
                arguments: [document.uri.toString(), index],
            }));
            if (activeDiff.deletionsHidden) {
                /** @type {number} */
                const delCount = range.deletedLinesCount;
                /** @type {number} */
                const addCount = range.addedLinesCount;
                if (delCount > 0 && addCount === 0) {
                    codeLenses.push(new vscode.CodeLens(codeLensRange, {
                        title: `−${delCount} ${delCount === 1 ? 'line' : 'lines'} deleted`,
                        command: '',
                        tooltip: `Deleted lines:\n${range.originalText}`,
                    }));
                }
                else if (delCount > 0 && addCount > 0) {
                    codeLenses.push(new vscode.CodeLens(codeLensRange, {
                        title: `+${addCount} ${addCount === 1 ? 'line' : 'lines'}, −${delCount} ${delCount === 1 ? 'line' : 'lines'}`,
                        command: '',
                        tooltip: `Replaced lines:\n${range.originalText}`,
                    }));
                }
            }
        }
        return codeLenses;
    }
    /**
     * @public
     * @return {void}
     */
    refresh() {
        this.changeEmitter.fire();
    }
}
/* istanbul ignore if */
if (false) {
    /**
     * @const {!tsickle_vscode_2.EventEmitter<void>}
     * @private
     */
    InlineDiffCodeLensProvider.prototype.changeEmitter;
    /**
     * @const {!tsickle_vscode_2.Event<void>}
     * @public
     */
    InlineDiffCodeLensProvider.prototype.onDidChangeCodeLenses;
    /**
     * @const {!InlineDiffManager}
     * @private
     */
    InlineDiffCodeLensProvider.prototype.manager;
}
/**
 * Resolves the Git repository that owns `targetUri`.
 *
 * Resolution is delegated to the Git extension's own `getRepository()` so that
 * nested repositories, submodules and platform-specific path comparison behave
 * exactly as they do elsewhere in VS Code.
 *
 * Returns undefined when the Git extension is missing or inactive, when the API
 * is unavailable, or when the URI does not belong to any open repository.
 * @param {(undefined|!tsickle_vscode_2.Uri)=} targetUri
 * @return {(undefined|!GitApiRepository)}
 */
function getOwningGitRepository(targetUri) {
    if (!targetUri) {
        return undefined;
    }
    try {
        /** @type {(undefined|!tsickle_vscode_2.Extension<!GitExtensionExports>)} */
        const gitExtension = vscode.extensions?.getExtension('vscode.git');
        if (!gitExtension || !gitExtension.isActive) {
            return undefined;
        }
        /** @type {(undefined|!GitApi)} */
        const gitApi = gitExtension.exports?.getAPI?.(1);
        if (typeof gitApi?.getRepository !== 'function') {
            return undefined;
        }
        return gitApi.getRepository(targetUri) ?? undefined;
    }
    catch {
        // Resolution is best-effort: the Git extension is third-party and may throw
        // from getAPI() or getRepository(). Callers treat undefined as "no owning
        // repository" and skip the refresh, which is the safe outcome here.
        return undefined;
    }
}
/**
 * Refreshes VS Code's Git status for the repository that owns `targetUri`.
 *
 * 'git.refresh' is registered with `{ repository: true }`, so the Git extension
 * resolves its first argument through `Model.getRepository()`. When that
 * resolution yields nothing it falls back to `Model.pickRepository()`, which:
 *   - throws "There are no available repositories" when none are open, which
 *     VS Code surfaces as a modal dialog the caller cannot suppress, and
 *   - shows a "Choose a repository" quick pick when more than one is open.
 *
 * Because this runs on every diff registration and on every hunk accept/reject,
 * an unresolved 'git.refresh' spams that quick pick in workspaces containing
 * more than one repository (b/561494994). Passing the owning repository's root
 * URI makes resolution deterministic, so neither branch above can be reached.
 * When no repository owns the file there is nothing meaningful to refresh, so
 * the command is skipped rather than left to prompt.
 * @param {(undefined|!tsickle_vscode_2.Uri)=} targetUri
 * @return {!Promise<void>}
 */
async function refreshGitForUri(targetUri) {
    /** @type {(undefined|!GitApiRepository)} */
    const repository = getOwningGitRepository(targetUri);
    if (!repository) {
        return;
    }
    try {
        await vscode.commands.executeCommand('git.refresh', repository.rootUri);
    }
    catch {
        // git.refresh may fail if the repository is busy or locked; safe to ignore.
    }
}
/**
 * Checks whether GitLens is installed and active in the current editor session.
 * @return {boolean}
 */
function isGitLensActive() {
    try {
        /** @type {(undefined|!tsickle_vscode_2.Extension<?>)} */
        const gitLens = vscode.extensions?.getExtension('eamodio.gitlens');
        return Boolean(gitLens?.isActive);
    }
    catch {
        return false;
    }
}
/**
 * @record
 */
function NodeFsPromises() { }
/* istanbul ignore if */
if (false) {
    /**
     * @public
     * @param {string} path
     * @param {(string|number|!Date)} atime
     * @param {(string|number|!Date)} mtime
     * @return {!Promise<void>}
     */
    NodeFsPromises.prototype.utimes = function (path, atime, mtime) { };
}
/**
 * @record
 */
function NodeFs() { }
/* istanbul ignore if */
if (false) {
    /**
     * @type {(undefined|!NodeFsPromises)}
     * @public
     */
    NodeFs.prototype.promises;
}
/** @type {number} */
const MAX_RESOLUTION_HISTORY = 50;
/** @type {number} */
const UNDO_HINT_TIMEOUT_MS = 4000;
/**
 * Review state on one side of a per-change Accept/Reject.
 * @record
 */
function ResolutionState() { }
/* istanbul ignore if */
if (false) {
    /**
     * @type {string}
     * @public
     */
    ResolutionState.prototype.text;
    /**
     * @type {!Array<!tsickle_inline_diff_change_range_5.InlineDiffChangeRange>}
     * @public
     */
    ResolutionState.prototype.ranges;
    /**
     * @type {string}
     * @public
     */
    ResolutionState.prototype.originalText;
    /**
     * @type {string}
     * @public
     */
    ResolutionState.prototype.modifiedText;
}
/**
 * Review state before and after a per-change Accept/Reject.
 * @record
 */
function ResolutionRecord() { }
/* istanbul ignore if */
if (false) {
    /**
     * @type {!ActiveDiff}
     * @public
     */
    ResolutionRecord.prototype.diff;
    /**
     * @type {!ResolutionState}
     * @public
     */
    ResolutionRecord.prototype.before;
    /**
     * @type {!ResolutionState}
     * @public
     */
    ResolutionRecord.prototype.after;
    /**
     * @type {boolean}
     * @public
     */
    ResolutionRecord.prototype.accept;
}
/**
 * The hunk hash AgentEditManager uses to track a change.
 * @param {!tsickle_inline_diff_change_range_5.InlineDiffChangeRange} r
 * @return {string}
 */
function changeHash(r) {
    /** @type {!Array<string>} */
    const insertions = r.modifiedText ? r.modifiedText.split('\n') : [];
    /** @type {!Array<string>} */
    const deletions = r.originalText ? r.originalText.split('\n') : [];
    return (0, hunk_storage_1.computeHunkHash)(insertions, deletions);
}
/**
 * @param {!ActiveDiff} diff
 * @param {string=} text
 * @return {!ResolutionState}
 */
function snapshotResolutionState(diff, text = diff.combinedText) {
    return {
        text,
        ranges: cloneRanges(diff.changes.ranges),
        originalText: diff.originalText,
        modifiedText: diff.modifiedText,
    };
}
/**
 * @param {!Array<!tsickle_inline_diff_change_range_5.InlineDiffChangeRange>} ranges
 * @return {!Array<!tsickle_inline_diff_change_range_5.InlineDiffChangeRange>}
 */
function cloneRanges(ranges) {
    return ranges.map((/**
     * @param {!tsickle_inline_diff_change_range_5.InlineDiffChangeRange} r
     * @return {!tsickle_inline_diff_change_range_5.InlineDiffChangeRange}
     */
    (r) => inline_diff_change_range_1.InlineDiffChangeRange.clone(r)));
}
/**
 * Returns whether closing showed a Save dialog: only if the buffer was unsaved.
 * A clean close accepts the on-disk edit as-is. Without a tracked state, guess
 * from deleted lines or user typing.
 * @param {!ActiveDiff} diff
 * @return {boolean}
 */
function hadSaveDialog(diff) {
    if (diff.lastKnownDirty !== undefined)
        return diff.lastKnownDirty;
    return (!!diff.hasUserEdits || diff.changes.ranges.some((/**
     * @param {!tsickle_inline_diff_change_range_5.InlineDiffChangeRange} r
     * @return {boolean}
     */
    (r) => !!r.deletionRange)));
}
/**
 * Returns lines `start.line..endLine` with their line break. The last line has
 * none, so the range then starts at the previous line's break instead.
 * @param {!tsickle_vscode_2.TextDocument} document
 * @param {!tsickle_vscode_2.Position} start
 * @param {number} endLine
 * @return {!tsickle_vscode_2.Range}
 */
function wholeLinesRange(document, start, endLine) {
    if (document.lineCount === 0) {
        return new vscode.Range(start, new vscode.Position(0, 0));
    }
    /** @type {number} */
    const lastLine = document.lineCount - 1;
    /** @type {number} */
    const line = Math.min(endLine, lastLine);
    /** @type {!tsickle_vscode_2.Position} */
    const end = document.lineAt(line).rangeIncludingLineBreak.end;
    if (line === lastLine && start.line > 0 && start.character === 0) {
        return new vscode.Range(document.lineAt(start.line - 1).range.end, end);
    }
    return new vscode.Range(start, end);
}
/**
 * Safely extracts the document Uri from a vscode.Tab input.
 * @param {!tsickle_vscode_2.Tab} tab
 * @return {(undefined|!tsickle_vscode_2.Uri)}
 */
function getTabUri(tab) {
    if (!tab || !tab.input)
        return undefined;
    // Cast untyped tab.input to probe uri/modified properties safely.
    /** @type {{uri: (undefined|!tsickle_vscode_2.Uri), modified: (undefined|!tsickle_vscode_2.Uri)}} */
    const input = (/** @type {{uri: (undefined|!tsickle_vscode_2.Uri), modified: (undefined|!tsickle_vscode_2.Uri)}} */ (tab.input));
    if (input.uri && typeof input.uri.toString === 'function') {
        return input.uri;
    }
    if (input.modified && typeof input.modified.toString === 'function') {
        return input.modified;
    }
    return undefined;
}
/**
 * Safely touches a file's access and modification timestamps without opening or
 * truncating the file contents. Gracefully no-ops in non-Node environments.
 * @param {!tsickle_vscode_2.Uri} uri
 * @return {!Promise<void>}
 */
async function safeTouchFile(uri) {
    if (uri.scheme !== 'file') {
        return;
    }
    try {
        // tslint:disable-next-line:no-require-imports
        /** @type {(undefined|function(string): *)} */
        const req = typeof require === 'function' ? require : undefined;
        /** @type {(undefined|!NodeFs)} */
        const fs = req ? ((/** @type {(undefined|!NodeFs)} */ (req('fs')))) : undefined;
        if (fs?.promises?.utimes) {
            /** @type {!Date} */
            const now = new Date();
            await fs.promises.utimes(uri.fsPath, now, now);
        }
    }
    catch {
        // Best-effort timestamp update; ignore if file is inaccessible or locked.
    }
}
/** @type {{getOwningGitRepository: function((undefined|!tsickle_vscode_2.Uri)=): (undefined|!GitApiRepository), isGitLensActive: function(): boolean, refreshGitForUri: function((undefined|!tsickle_vscode_2.Uri)=): !Promise<void>, safeTouchFile: function(!tsickle_vscode_2.Uri): !Promise<void>}} */
exports.TEST_ONLY = {
    getOwningGitRepository,
    isGitLensActive,
    refreshGitForUri,
    safeTouchFile,
};
