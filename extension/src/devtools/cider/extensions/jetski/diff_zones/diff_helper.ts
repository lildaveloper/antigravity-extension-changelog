/**
 * @fileoverview added by tsickle
 * Generated from: devtools/cider/extensions/jetski/diff_zones/diff_helper.ts
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
goog.module('google3.devtools.cider.extensions.jetski.diff_zones.diff_helper');
var module = module || { id: 'devtools/cider/extensions/jetski/diff_zones/diff_helper.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_diff_1 = goog.requireType("google3.third_party.javascript.typings.diff.index");
const jsdiff = goog.require('google3.third_party.javascript.typings.diff.index'); // from //third_party/javascript/typings/diff:diff_raw
// from //third_party/javascript/typings/diff:diff_raw
/**
 * Generates diff hunks between original and new text.
 * @param {string} originalText
 * @param {string} newText
 * @return {!Array<!tsickle_diff_1.Hunk>}
 */
function getDiffHunks(originalText, newText) {
    /** @type {function(string): string} */
    const normalize = (/**
     * @param {string} text
     * @return {string}
     */
    (text) => {
        /** @type {string} */
        let normalized = text.replace(/\r\n|\r/g, '\n');
        if (normalized.length > 0 && !normalized.endsWith('\n')) {
            normalized += '\n';
        }
        return normalized;
    });
    /** @type {string} */
    const normOriginal = normalize(originalText || '');
    /** @type {string} */
    const normNew = normalize(newText || '');
    /** @type {!tsickle_diff_1.ParsedDiff} */
    const patch = jsdiff.structuredPatch('', '', normOriginal, normNew, '', '', {
        context: 0,
    });
    return patch.hunks;
}
exports.getDiffHunks = getDiffHunks;
/**
 * Constructs a combined text by applying diff hunks to the original text.
 * Strips the '+' and '-' prefixes, inserting both versions sequentially.
 * @param {string} originalText
 * @param {!Array<!tsickle_diff_1.Hunk>} hunks
 * @return {string}
 */
function getTextWithHunks(originalText, hunks) {
    /** @type {!Array<string>} */
    const originalLines = originalText.split(/\r?\n/);
    /** @type {!Array<string>} */
    const resultLines = [];
    /** @type {number} */
    let lastLineProcessed = -1;
    /** @type {!Array<!tsickle_diff_1.Hunk>} */
    const sortedHunks = [...hunks].sort((/**
     * @param {!tsickle_diff_1.Hunk} a
     * @param {!tsickle_diff_1.Hunk} b
     * @return {number}
     */
    (a, b) => a.oldStart - b.oldStart));
    for (const hunk of sortedHunks) {
        /** @type {number} */
        const hunkStartLine = hunk.oldStart - 1;
        for (let i = lastLineProcessed + 1; i < hunkStartLine; i++) {
            resultLines.push(originalLines[i]);
        }
        /** @type {!Array<string>} */
        const hunkContent = hunk.lines
            .filter((/**
         * @param {string} line
         * @return {boolean}
         */
        (line) => line !== '\\ No newline at end of file'))
            .map((/**
         * @param {string} line
         * @return {string}
         */
        (line) => line.substring(1)));
        resultLines.push(...hunkContent);
        lastLineProcessed = hunkStartLine + hunk.oldLines - 1;
    }
    for (let i = lastLineProcessed + 1; i < originalLines.length; i++) {
        resultLines.push(originalLines[i]);
    }
    return resultLines.join('\n');
}
exports.getTextWithHunks = getTextWithHunks;
