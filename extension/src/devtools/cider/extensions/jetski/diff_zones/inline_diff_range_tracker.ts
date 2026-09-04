/**
 * @fileoverview added by tsickle
 * Generated from: devtools/cider/extensions/jetski/diff_zones/inline_diff_range_tracker.ts
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
goog.module('google3.devtools.cider.extensions.jetski.diff_zones.inline_diff_range_tracker');
var module = module || { id: 'devtools/cider/extensions/jetski/diff_zones/inline_diff_range_tracker.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_vscode_1 = goog.requireType("vscode");
const tsickle_inline_diff_change_range_2 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.inline_diff_change_range");
const vscode = goog.require('vscode'); // from //devtools/cider/extensions:vscode
// from //devtools/cider/extensions:vscode
const inline_diff_change_range_1 = goog.require('google3.devtools.cider.extensions.jetski.diff_zones.inline_diff_change_range');
/**
 * Calculates updated position based on VS Code content change events.
 * @param {!tsickle_vscode_1.Position} position
 * @param {!tsickle_vscode_1.TextDocumentContentChangeEvent} change
 * @return {!tsickle_vscode_1.Position}
 */
function calculateNewPosition(position, change) {
    /** @type {number} */
    let newLine = position.line;
    /** @type {number} */
    let newChar = position.character;
    if (!change.range.end.isBeforeOrEqual(position)) {
        return position;
    }
    // Handle deletions
    if (!change.range.start.isEqual(change.range.end)) {
        if (change.range.end.line === newLine) {
            newChar -= change.range.end.character - change.range.start.character;
        }
        newLine -= change.range.end.line - change.range.start.line;
    }
    // Handle insertions
    if (change.text) {
        if (change.range.start.line === newLine) {
            if (change.text.includes('\n')) {
                newChar -= change.range.start.character;
                newChar += change.text.slice(change.text.lastIndexOf('\n') + 1, change.text.length).length;
            }
            else {
                newChar += change.text.length;
            }
        }
        newLine += change.text.split('\n').length - 1;
    }
    return new vscode.Position(newLine, newChar);
}
exports.calculateNewPosition = calculateNewPosition;
/**
 * Shrinks range if change event overlaps it.
 * @param {(null|!tsickle_vscode_1.Range)} range
 * @param {!tsickle_vscode_1.TextDocumentContentChangeEvent} change
 * @return {(null|!tsickle_vscode_1.Range)}
 */
function handleRangeShrinkage(range, change) {
    if (!range)
        return null;
    if (change.range.intersection(range) &&
        !change.range.end.isEqual(range.start) &&
        !change.range.start.isEqual(range.end)) {
        if (!change.range.start.isEqual(change.range.end)) {
            /** @type {!tsickle_vscode_1.Position} */
            let updatedStart = range.start;
            /** @type {!tsickle_vscode_1.Position} */
            let updatedEnd = range.end;
            if (change.range.contains(range.start)) {
                updatedStart = change.range.end;
            }
            if (change.range.contains(range.end)) {
                updatedEnd = change.range.start;
            }
            if (updatedEnd.isBefore(updatedStart)) {
                return null;
            }
            else {
                return new vscode.Range(updatedStart, updatedEnd);
            }
        }
    }
    return range;
}
/**
 * Nullifies invalid ranges collapsed on themselves.
 * @param {!Array<(null|!tsickle_vscode_1.Range)>} updatedRanges
 * @return {void}
 */
function nullifyInvalidRanges(updatedRanges) {
    for (let i = 0; i < updatedRanges.length - 1; i++) {
        if (!updatedRanges[i])
            continue;
        for (let j = i + 1; j < updatedRanges.length; j++) {
            if (!updatedRanges[j])
                continue;
            if ((/** @type {!tsickle_vscode_1.Range} */ (updatedRanges[i])).end.isEqual((/** @type {!tsickle_vscode_1.Range} */ (updatedRanges[j])).start) ||
                (/** @type {!tsickle_vscode_1.Range} */ (updatedRanges[i])).start.isEqual((/** @type {!tsickle_vscode_1.Range} */ (updatedRanges[j])).end)) {
                if ((/** @type {!tsickle_vscode_1.Range} */ (updatedRanges[j])).start.isEqual((/** @type {!tsickle_vscode_1.Range} */ (updatedRanges[j])).end)) {
                    updatedRanges[j] = null;
                }
                else if ((/** @type {!tsickle_vscode_1.Range} */ (updatedRanges[i])).start.isEqual((/** @type {!tsickle_vscode_1.Range} */ (updatedRanges[i])).end)) {
                    updatedRanges[i] = null;
                }
            }
        }
    }
}
/**
 * Merges overlapping/adjacent ranges.
 * @param {!Array<(null|!tsickle_vscode_1.Range)>} ranges
 * @return {void}
 */
function mergeOverlappingRanges(ranges) {
    /** @type {!Array<!tsickle_vscode_1.Range>} */
    const validRanges = ranges.filter((/**
     * @param {(null|!tsickle_vscode_1.Range)} r
     * @return {boolean}
     */
    (r) => r !== null));
    if (validRanges.length < 2)
        return;
    /** @type {!Array<!tsickle_vscode_1.Range>} */
    const merged = [];
    /** @type {!tsickle_vscode_1.Range} */
    let currentMerge = validRanges[0];
    for (let i = 1; i < validRanges.length; i++) {
        /** @type {!tsickle_vscode_1.Range} */
        const nextRange = validRanges[i];
        if (currentMerge.intersection(nextRange) !== undefined) {
            currentMerge = currentMerge.union(nextRange);
        }
        else {
            merged.push(currentMerge);
            currentMerge = nextRange;
        }
    }
    merged.push(currentMerge);
    ranges.length = 0;
    ranges.push(...merged);
}
/**
 * Shifts an array of vscode.Ranges based on a list of content changes.
 * @param {!Array<!tsickle_vscode_1.Range>} ranges
 * @param {!ReadonlyArray<!tsickle_vscode_1.TextDocumentContentChangeEvent>} changes
 * @return {!Array<!tsickle_vscode_1.Range>}
 */
function calculateUpdatedRanges(ranges, changes) {
    /** @type {!Array<(null|!tsickle_vscode_1.Range)>} */
    const updatedRanges = [...ranges];
    /** @type {!Array<!tsickle_vscode_1.TextDocumentContentChangeEvent>} */
    const docChanges = [...changes].sort((/**
     * @param {!tsickle_vscode_1.TextDocumentContentChangeEvent} c1
     * @param {!tsickle_vscode_1.TextDocumentContentChangeEvent} c2
     * @return {number}
     */
    (c1, c2) => c2.range.start.compareTo(c1.range.start)));
    for (const change of docChanges) {
        for (let i = 0; i < updatedRanges.length; i++) {
            updatedRanges[i] = handleRangeShrinkage(updatedRanges[i], change);
            if (!updatedRanges[i])
                continue;
            updatedRanges[i] = new vscode.Range(calculateNewPosition((/** @type {!tsickle_vscode_1.Range} */ (updatedRanges[i])).start, change), calculateNewPosition((/** @type {!tsickle_vscode_1.Range} */ (updatedRanges[i])).end, change));
        }
    }
    nullifyInvalidRanges(updatedRanges);
    mergeOverlappingRanges(updatedRanges);
    return updatedRanges.filter((/**
     * @param {(null|!tsickle_vscode_1.Range)} range
     * @return {boolean}
     */
    (range) => range !== null));
}
exports.calculateUpdatedRanges = calculateUpdatedRanges;
/**
 * Helper to adjust tracked InlineDiffChangeRange line numbers on document changes.
 * @param {!Array<!tsickle_inline_diff_change_range_2.InlineDiffChangeRange>} ranges
 * @param {!ReadonlyArray<!tsickle_vscode_1.TextDocumentContentChangeEvent>} changes
 * @return {!Array<!tsickle_inline_diff_change_range_2.InlineDiffChangeRange>}
 */
function recalculateInlineDiffRanges(ranges, changes) {
    return ranges
        .map((/**
     * @param {!tsickle_inline_diff_change_range_2.InlineDiffChangeRange} range
     * @return {(null|!tsickle_inline_diff_change_range_2.InlineDiffChangeRange)}
     */
    (range) => {
        /** @type {!tsickle_inline_diff_change_range_2.InlineDiffChangeRange} */
        const newRange = inline_diff_change_range_1.InlineDiffChangeRange.clone(range);
        /** @type {!tsickle_vscode_1.Range} */
        const mainRange = new vscode.Range(range.start, 0, range.end, Number.MAX_SAFE_INTEGER);
        /** @type {!Array<!tsickle_vscode_1.Range>} */
        const updatedMainRanges = calculateUpdatedRanges([mainRange], changes);
        if (updatedMainRanges.length === 0)
            return null;
        /** @type {!tsickle_vscode_1.Range} */
        const updatedMainRange = updatedMainRanges[0];
        newRange.start = updatedMainRange.start.line;
        newRange.end = updatedMainRange.end.line;
        if (range.deletionRange) {
            /** @type {!Array<!tsickle_vscode_1.Range>} */
            const updatedDeletion = calculateUpdatedRanges([range.deletionRange], changes);
            if (updatedDeletion.length > 0) {
                newRange.deletionRange = updatedDeletion[0];
                newRange.deletionStart = newRange.deletionRange.start.line;
                newRange.deletionEnd = newRange.deletionRange.end.line;
            }
            else {
                newRange.deletionRange = undefined;
                newRange.deletionStart = -1;
                newRange.deletionEnd = -1;
            }
        }
        if (range.additionRange) {
            /** @type {!Array<!tsickle_vscode_1.Range>} */
            const updatedAddition = calculateUpdatedRanges([range.additionRange], changes);
            if (updatedAddition.length > 0) {
                newRange.additionRange = updatedAddition[0];
                newRange.additionStart = newRange.additionRange.start.line;
                newRange.additionEnd = newRange.additionRange.end.line;
            }
            else {
                newRange.additionRange = undefined;
                newRange.additionStart = -1;
                newRange.additionEnd = -1;
            }
        }
        return newRange;
    }))
        .filter((/**
     * @param {(null|!tsickle_inline_diff_change_range_2.InlineDiffChangeRange)} r
     * @return {boolean}
     */
    (r) => r !== null));
}
exports.recalculateInlineDiffRanges = recalculateInlineDiffRanges;
