/**
 * @fileoverview added by tsickle
 * Generated from: javascript/apps/wiz/inject/pending/canceled_error.ts
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
goog.module('google3.javascript.apps.wiz.inject.pending.canceled_error');
var module = module || { id: 'javascript/apps/wiz/inject/pending/canceled_error.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
/**
 * An `Error` name that can be used to indicate a canceled `Pending` that can be
 * converted to a canceled `Deferred`.
 * @type {string}
 */
const CANCELED_ERROR_NAME = 'CanceledError';
/**
 * @record
 * @extends {Error}
 */
function CanceledError() { }
/* istanbul ignore if */
if (false) {
    /**
     * @type {string}
     * @public
     */
    CanceledError.prototype.name;
}
/**
 * Checks if `Error` is a `CanceledError`.
 * @param {*} e
 * @return {boolean}
 */
function isCanceledError(e) {
    // Errors constructed in iframes will have a different Error base class, so
    // we check for the `name` property.
    return ((/** @type {(undefined|null|?)} */ (e)))?.name === CANCELED_ERROR_NAME;
}
exports.isCanceledError = isCanceledError;
/**
 * Create an `Error` that would get converted to a canceled `Deferred` if it
 * is the rejected value. This will still be
 * a rejection, but should generally be ignored by other error handlers (because
 * cancellation should not be a reportable error). `fava.debug.ErrorReporter`
 * can auto-ignore this type of error.
 *
 * Pending does not have any special cancellation semantics like `Deferred` or
 * `GoogPromise`. But since it is often used as a light-weight replacement for
 * `Deferred`, this error can be used to distinguish existing cancellation
 * errors from other errors.
 * @param {string} message
 * @return {!CanceledError}
 */
function createCanceledError(message) {
    /** @type {!Error} */
    const canceledError = new Error(message);
    canceledError.name = CANCELED_ERROR_NAME;
    return (/** @type {!CanceledError} */ (canceledError));
}
exports.createCanceledError = createCanceledError;
