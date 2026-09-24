/**
 * @fileoverview added by tsickle
 * Generated from: devtools/cider/extensions/jetski/diff_zones/inline_diff_changes.ts
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
goog.module('google3.devtools.cider.extensions.jetski.diff_zones.inline_diff_changes');
var module = module || { id: 'devtools/cider/extensions/jetski/diff_zones/inline_diff_changes.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_diff_1 = goog.requireType("google3.third_party.javascript.typings.diff.index");
const tsickle_vscode_2 = goog.requireType("vscode");
const tsickle_inline_diff_change_range_3 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.inline_diff_change_range");
// from //third_party/javascript/typings/diff:diff_raw
const vscode = goog.require('vscode'); // from //devtools/cider/extensions:vscode
// from //devtools/cider/extensions:vscode
const inline_diff_change_range_1 = goog.require('google3.devtools.cider.extensions.jetski.diff_zones.inline_diff_change_range');
/**
 * Manages the collection of InlineDiffChangeRange objects for a document.
 */
class InlineDiffChanges {
    constructor() {
        this.ranges = [];
    }
    /**
     * @public
     * @return {boolean}
     */
    exists() {
        return this.ranges.length > 0;
    }
    /**
     * Calculates and populates the diff ranges.
     * @public
     * @param {!Array<!tsickle_diff_1.Hunk>} hunks The list of diff hunks.
     * @param {!tsickle_vscode_2.TextDocument} document The document with combined text applied.
     * @return {void}
     */
    setup(hunks, document) {
        /** @type {!Array<!tsickle_diff_1.Hunk>} */
        const sortedHunks = [...hunks].sort((/**
         * @param {!tsickle_diff_1.Hunk} a
         * @param {!tsickle_diff_1.Hunk} b
         * @return {number}
         */
        (a, b) => a.oldStart - b.oldStart));
        /** @type {!Array<!tsickle_inline_diff_change_range_3.InlineDiffChangeRange>} */
        const newRanges = [];
        /** @type {number} */
        let currentLineInPreview = 0;
        /** @type {number} */
        let lastLineProcessedInOriginal = -1;
        for (const hunk of sortedHunks) {
            /** @type {{oldStart: number, oldLines: number, newStart: number, newLines: number, linedelimiters: !Array<string>, lines: !Array<string>}} */
            const cleanHunk = {
                ...hunk,
                lines: hunk.lines.filter((/**
                 * @param {string} l
                 * @return {boolean}
                 */
                (l) => l !== '\\ No newline at end of file')),
            };
            /** @type {number} */
            const hunkStartLineInOriginal = cleanHunk.oldStart - 1;
            // Unchanged lines before this hunk
            /** @type {number} */
            const linesBefore = hunkStartLineInOriginal - (lastLineProcessedInOriginal + 1);
            currentLineInPreview += linesBefore;
            /** @type {number} */
            const startLineOffset = currentLineInPreview;
            /** @type {!tsickle_inline_diff_change_range_3.InlineDiffChangeRange} */
            const range = inline_diff_change_range_1.InlineDiffChangeRange.fromDiffHunk(cleanHunk, startLineOffset, document);
            newRanges.push(range);
            /** @type {number} */
            const hunkLinesCount = cleanHunk.lines.length;
            currentLineInPreview += hunkLinesCount;
            lastLineProcessedInOriginal =
                hunkStartLineInOriginal + cleanHunk.oldLines - 1;
        }
        this.ranges = newRanges;
    }
    /**
     * Helper to get a selection range (0-character width) at the start of a hunk
     * to scroll the editor.
     * @public
     * @param {number=} rangeIndex
     * @return {!tsickle_vscode_2.Range}
     */
    getRangeOrDefault(rangeIndex = 0) {
        /** @type {number} */
        const startLine = this.ranges[rangeIndex]?.start ?? 0;
        return new vscode.Range(startLine, 0, startLine, 0);
    }
}
exports.InlineDiffChanges = InlineDiffChanges;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!Array<!tsickle_inline_diff_change_range_3.InlineDiffChangeRange>}
     * @public
     */
    InlineDiffChanges.prototype.ranges;
}
