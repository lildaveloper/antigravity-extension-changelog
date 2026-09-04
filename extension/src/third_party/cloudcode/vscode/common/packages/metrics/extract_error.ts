/**
 * @fileoverview added by tsickle
 * Generated from: third_party/cloudcode/vscode/common/packages/metrics/extract_error.ts
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
goog.module('google3.third_party.cloudcode.vscode.common.packages.metrics.extract_error');
var module = module || { id: 'third_party/cloudcode/vscode/common/packages/metrics/extract_error.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_constants_1 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.metrics.constants");
const tsickle_error_types_2 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.metrics.error_types");
const constants_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.metrics.constants');
/**
 * Takes a given error and returns a non-PII containing error based on its provided error code or message
 * @param {(undefined|!Error|!tsickle_error_types_2.NodeJsSystemError|!tsickle_error_types_2.ReasonedError|!tsickle_error_types_2.UnsupportedOsError)=} e Object with either (or both) a Cloud Code error message or an error code.
 * @param {!tsickle_constants_1.FailureReason=} defaultReason
 * @return {!tsickle_constants_1.FailureReason}
 */
function extractError(e, defaultReason = constants_1.FailureReason.UNKNOWN) {
    if (!e) {
        return defaultReason;
    }
    // TODO(b/302367379): Rip this out
    if (constants_1.CommonMetadataKey.CLOUDCODE_ERROR_MESSAGE in e) {
        // FailureReason is already a constant, non-PII containing value
        return (/** @type {!tsickle_constants_1.FailureReason} */ (e[constants_1.CommonMetadataKey.CLOUDCODE_ERROR_MESSAGE]));
    }
    /** @type {!Array<!tsickle_constants_1.FailureReason>} */
    const failureReasons = Object.values(constants_1.FailureReason);
    return failureReasons.find((/**
     * @param {!tsickle_constants_1.FailureReason} val
     * @return {boolean}
     */
    val => checkErrorForMatch(val, e))) || failureReasons.find((/**
     * @param {!tsickle_constants_1.FailureReason} val
     * @return {boolean}
     */
    val => e.message?.includes(val))) || defaultReason;
}
exports.extractError = extractError;
/**
 * @param {string} val
 * @param {(!Error|!tsickle_error_types_2.NodeJsSystemError|!tsickle_error_types_2.ReasonedError|!tsickle_error_types_2.UnsupportedOsError)} e
 * @return {boolean}
 */
function checkErrorForMatch(val, e) {
    if ('code' in e) {
        return (/** @type {!tsickle_error_types_2.NodeJsSystemError} */ (e)).code === val || (/** @type {!tsickle_error_types_2.NodeJsSystemError} */ (e)).message === val;
    }
    else {
        return e.message === val;
    }
}
