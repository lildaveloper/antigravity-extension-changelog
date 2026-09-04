/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview Internal implementations of SafeUrl.
 * Generated from: third_party/javascript/safevalues/internals/url_impl.ts
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
goog.module('google3.third_party.javascript.safevalues.internals.url_impl');
var module = module || { id: 'third_party/javascript/safevalues/internals/url_impl.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_dev_1 = goog.requireType("google3.third_party.javascript.safevalues.environment.dev");
const tsickle_secrets_2 = goog.requireType("google3.third_party.javascript.safevalues.internals.secrets");
const dev_1 = goog.require('google3.third_party.javascript.safevalues.environment.dev');
const secrets_1 = goog.require('google3.third_party.javascript.safevalues.internals.secrets');
/**
 * URL that is safe to use in navigation contexts
 * (e.g. `document.location`, `a.href`)
 *
 * @final
 */
class SafeUrl {
    /**
     * @private
     * @param {!Object} token
     * @param {string} value
     */
    constructor(token, value) {
        if (dev_1.DEV_MODE) {
            (0, secrets_1.ensureTokenIsValid)(token);
        }
        this.privateDoNotAccessOrElseWrappedUrl = value;
    }
    /**
     * @public
     * @return {string}
     */
    toString() {
        return this.privateDoNotAccessOrElseWrappedUrl;
    }
}
exports.SafeUrl = SafeUrl;
/* istanbul ignore if */
if (false) {
    /**
     * @const {string}
     * @private
     */
    SafeUrl.prototype.privateDoNotAccessOrElseWrappedUrl;
}
// WARNING: interface has both a type and a value, skipping emit
/** @type {function(new:SafeUrl, !Object, string)} */
const UrlImpl = (/** @type {function(new:SafeUrl, !Object, string)} */ (SafeUrl));
/**
 * Builds a new `SafeUrl` from the given string, without enforcing
 * safety guarantees. This shouldn't be exposed to application developers, and
 * must only be used as a step towards safe builders or safe constants.
 * @param {string} value
 * @return {!SafeUrl}
 */
function createUrlInternal(value) {
    return new UrlImpl(secrets_1.secretToken, value);
}
exports.createUrlInternal = createUrlInternal;
/**
 * A SafeUrl containing 'about:blank'.
 * @type {!SafeUrl}
 */
exports.ABOUT_BLANK = createUrlInternal('about:blank');
/**
 * A SafeUrl containing an inert URL, used as an inert return value when
 * an unsafe input was sanitized.
 * @type {!SafeUrl}
 */
exports.INNOCUOUS_URL = createUrlInternal('about:invalid#zClosurez');
/**
 * Checks if the given value is a `SafeUrl` instance.
 * // BEGIN-INTERNAL
 * \@google3-ignore-for-3p-optimization-safety {value} Used only in an instanceof
 *     check.
 * // END-INTERNAL
 * @param {*} value
 * @return {boolean}
 */
function isUrl(value) {
    return value instanceof SafeUrl;
}
exports.isUrl = isUrl;
/**
 * Returns the string value of the passed `SafeUrl` object while ensuring it
 * has the correct type.
 * @param {!SafeUrl} value
 * @return {string}
 */
function unwrapUrl(value) {
    if (isUrl(value)) {
        return ((/** @type {?} */ ((/** @type {*} */ (value))))).privateDoNotAccessOrElseWrappedUrl;
    }
    /** @type {string} */
    let message = '';
    if (dev_1.DEV_MODE) {
        message = `Unexpected type when unwrapping SafeUrl, got '${value}' of type '${typeof value}'`;
    }
    throw new Error(message);
}
exports.unwrapUrl = unwrapUrl;
