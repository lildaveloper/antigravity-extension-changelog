/**
 * @fileoverview added by tsickle
 * Generated from: devtools/cider/extensions/jetski/diff_zones/inline_diff_change_range.ts
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
goog.module('google3.devtools.cider.extensions.jetski.diff_zones.inline_diff_change_range');
var module = module || { id: 'devtools/cider/extensions/jetski/diff_zones/inline_diff_change_range.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_diff_1 = goog.requireType("google3.third_party.javascript.typings.diff.index");
const tsickle_vscode_2 = goog.requireType("vscode");
// from //third_party/javascript/typings/diff:diff_raw
const vscode = goog.require('vscode'); // from //devtools/cider/extensions:vscode
// from //devtools/cider/extensions:vscode
/**
 * End character of a hunk's last line: the document line if it exists,
 * otherwise the hunk line without its +/- marker.
 * @param {!tsickle_vscode_2.TextDocument} document
 * @param {number} line
 * @param {string} hunkLine
 * @return {number}
 */
function lineEndChar(document, line, hunkLine) {
    if (line < document.lineCount) {
        return document.lineAt(line).text.length;
    }
    return /^[+-]/.test(hunkLine) ? hunkLine.length - 1 : hunkLine.length;
}
/**
 * Represents a single contiguous block of changes (hunk) in the inline diff view.
 * Stores range coordinates for additions and deletions within the document buffer.
 */
class InlineDiffChangeRange {
    /**
     * @private
     */
    constructor() {
        this.start = 0;
        this.end = 0;
        this.deletionStart = -1;
        this.deletionEnd = -1;
        this.additionStart = -1;
        this.additionEnd = -1;
        this.addedLinesCount = 0;
        this.deletedLinesCount = 0;
        this.originalText = '';
        this.modifiedText = '';
    }
    /**
     * Creates a shallow copy of the given InlineDiffChangeRange instance.
     * @public
     * @param {!InlineDiffChangeRange} range
     * @return {!InlineDiffChangeRange}
     */
    static clone(range) {
        /** @type {!InlineDiffChangeRange} */
        const newRange = new InlineDiffChangeRange();
        Object.assign(newRange, range);
        return newRange;
    }
    /**
     * Creates and initializes a range mapping from a diff library hunk.
     * @public
     * @param {!tsickle_diff_1.Hunk} hunk The jsdiff Hunk.
     * @param {number} startLineOffset Zero-based line number of hunk start.
     * @param {!tsickle_vscode_2.TextDocument} document The document with combined text already applied.
     * @return {!InlineDiffChangeRange}
     */
    static fromDiffHunk(hunk, startLineOffset, document) {
        /** @type {!InlineDiffChangeRange} */
        const range = new InlineDiffChangeRange();
        /** @type {!Array<string>} */
        const hunkLines = hunk.lines;
        /** @type {!Array<string>} */
        const deletedLines = hunkLines
            .filter((/**
         * @param {string} line
         * @return {boolean}
         */
        (line) => line.startsWith('-')))
            .map((/**
         * @param {string} line
         * @return {string}
         */
        (line) => line.substring(1)));
        /** @type {!Array<string>} */
        const addedLines = hunkLines
            .filter((/**
         * @param {string} line
         * @return {boolean}
         */
        (line) => line.startsWith('+')))
            .map((/**
         * @param {string} line
         * @return {string}
         */
        (line) => line.substring(1)));
        range.deletedLinesCount = deletedLines.length;
        range.addedLinesCount = addedLines.length;
        range.originalText = deletedLines.join('\n');
        range.modifiedText = addedLines.join('\n');
        range.start = startLineOffset;
        range.end = startLineOffset + hunkLines.length - 1;
        /** @type {number} */
        const firstDeletionIndex = hunkLines.findIndex((/**
         * @param {string} line
         * @return {boolean}
         */
        (line) => line.startsWith('-')));
        /** @type {number} */
        const lastDeletionIndex = hunkLines.findLastIndex((/**
         * @param {string} line
         * @return {boolean}
         */
        (line) => line.startsWith('-')));
        /** @type {number} */
        const firstAdditionIndex = hunkLines.findIndex((/**
         * @param {string} line
         * @return {boolean}
         */
        (line) => line.startsWith('+')));
        /** @type {number} */
        const lastAdditionIndex = hunkLines.findLastIndex((/**
         * @param {string} line
         * @return {boolean}
         */
        (line) => line.startsWith('+')));
        if (firstDeletionIndex !== -1) {
            range.deletionStart = startLineOffset + firstDeletionIndex;
            range.deletionEnd = startLineOffset + lastDeletionIndex;
            range.deletionRange = new vscode.Range(new vscode.Position(range.deletionStart, 0), new vscode.Position(range.deletionEnd, lineEndChar(document, range.deletionEnd, hunkLines[lastDeletionIndex])));
        }
        if (firstAdditionIndex !== -1) {
            range.additionStart = startLineOffset + firstAdditionIndex;
            range.additionEnd = startLineOffset + lastAdditionIndex;
            range.additionRange = new vscode.Range(new vscode.Position(range.additionStart, 0), new vscode.Position(range.additionEnd, lineEndChar(document, range.additionEnd, hunkLines[lastAdditionIndex])));
        }
        return range;
    }
}
exports.InlineDiffChangeRange = InlineDiffChangeRange;
/* istanbul ignore if */
if (false) {
    /**
     * @type {number}
     * @public
     */
    InlineDiffChangeRange.prototype.start;
    /**
     * @type {number}
     * @public
     */
    InlineDiffChangeRange.prototype.end;
    /**
     * @type {number}
     * @public
     */
    InlineDiffChangeRange.prototype.deletionStart;
    /**
     * @type {number}
     * @public
     */
    InlineDiffChangeRange.prototype.deletionEnd;
    /**
     * @type {number}
     * @public
     */
    InlineDiffChangeRange.prototype.additionStart;
    /**
     * @type {number}
     * @public
     */
    InlineDiffChangeRange.prototype.additionEnd;
    /**
     * @type {(undefined|!tsickle_vscode_2.Range)}
     * @public
     */
    InlineDiffChangeRange.prototype.additionRange;
    /**
     * @type {(undefined|!tsickle_vscode_2.Range)}
     * @public
     */
    InlineDiffChangeRange.prototype.deletionRange;
    /**
     * @type {number}
     * @public
     */
    InlineDiffChangeRange.prototype.addedLinesCount;
    /**
     * @type {number}
     * @public
     */
    InlineDiffChangeRange.prototype.deletedLinesCount;
    /**
     * @type {string}
     * @public
     */
    InlineDiffChangeRange.prototype.originalText;
    /**
     * @type {string}
     * @public
     */
    InlineDiffChangeRange.prototype.modifiedText;
}
