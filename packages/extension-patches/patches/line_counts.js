/**
 * Patch: Accurate Side-by-Side Line Counts
 * ID: line_counts
 *
 * Fixes the +0 -0 line count bug in side-by-side diff mode (when antigravity.enableInlineDiff is false).
 * Replaces the naive length subtraction in computeLineCounts() with real unified diff hunk parsing.
 */

const ID = 'line_counts';
const NAME = 'Accurate Side-by-Side Line Counts';
const DESCRIPTION = 'Fixes +0 -0 diff count calculation in side-by-side mode by parsing unified diff hunks.';

const ORIGINAL = `function computeLineCounts(original, modified) {
    /** @type {!Array<string>} */
    const originalLines = original === '' ? [] : original.split(/\\r?\\n/);
    /** @type {!Array<string>} */
    const modifiedLines = modified === '' ? [] : modified.split(/\\r?\\n/);
    /** @type {number} */
    const diff = modifiedLines.length - originalLines.length;
    return {
        numLinesInserted: Math.max(0, diff),
        numLinesDeleted: Math.max(0, -diff),
    };
}`;

const REPLACEMENT = `function computeLineCounts(original, modified) {
    if (original === modified) {
        return { numLinesInserted: 0, numLinesDeleted: 0 };
    }
    try {
        const helper = goog.module.get('google3.devtools.cider.extensions.jetski.diff_zones.diff_helper') ||
            goog.loadedModules_?.['google3.devtools.cider.extensions.jetski.diff_zones.diff_helper']?.exports;
        const hunks = helper.getDiffHunks(original, modified);
        let numLinesInserted = 0;
        let numLinesDeleted = 0;
        for (const hunk of hunks) {
            for (const line of hunk.lines) {
                if (line.startsWith('+')) {
                    numLinesInserted++;
                } else if (line.startsWith('-')) {
                    numLinesDeleted++;
                }
            }
        }
        return { numLinesInserted, numLinesDeleted };
    } catch {
        const originalLines = original === '' ? [] : original.split(/\\r?\\n/);
        const modifiedLines = modified === '' ? [] : modified.split(/\\r?\\n/);
        const diff = modifiedLines.length - originalLines.length;
        return {
            numLinesInserted: Math.max(0, diff),
            numLinesDeleted: Math.max(0, -diff),
        };
    }
}`;

const REPLACEMENTS = [[ORIGINAL, REPLACEMENT]];

module.exports = {
  ID,
  NAME,
  DESCRIPTION,
  REPLACEMENTS,
};
