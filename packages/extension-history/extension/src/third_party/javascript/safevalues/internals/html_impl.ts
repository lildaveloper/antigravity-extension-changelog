/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview Internal implementations of SafeHtml.
 * Generated from: third_party/javascript/safevalues/internals/html_impl.ts
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
goog.module('google3.third_party.javascript.safevalues.internals.html_impl');
var module = module || { id: 'third_party/javascript/safevalues/internals/html_impl.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_trusted_types_1 = goog.requireType("google3.third_party.javascript.safevalues.internals.trusted_types");
const tsickle_trusted_types_typings_2 = goog.requireType("google3.third_party.javascript.safevalues.internals.trusted_types_typings");
const tsickle_dev_3 = goog.requireType("google3.third_party.javascript.safevalues.environment.dev");
const tsickle_pure_4 = goog.requireType("google3.third_party.javascript.safevalues.internals.pure");
const tsickle_secrets_5 = goog.requireType("google3.third_party.javascript.safevalues.internals.secrets");
const trusted_types_1 = goog.require('google3.third_party.javascript.safevalues.internals.trusted_types');
const dev_1 = goog.require('google3.third_party.javascript.safevalues.environment.dev');
const pure_1 = goog.require('google3.third_party.javascript.safevalues.internals.pure');
const secrets_1 = goog.require('google3.third_party.javascript.safevalues.internals.secrets');
/**
 * String that is safe to use in HTML contexts in DOM APIs and HTML documents.
 *
 * @final
 */
class SafeHtml {
    /**
     * @private
     * @param {!Object} token
     * @param {(string|?)} value
     */
    constructor(token, value) {
        if (dev_1.DEV_MODE) {
            (0, secrets_1.ensureTokenIsValid)(token);
        }
        this.privateDoNotAccessOrElseWrappedHtml = value;
    }
    /**
     * @public
     * @return {string}
     */
    toString() {
        // String coercion minimizes code size.
        // tslint:disable-next-line:restrict-plus-operands
        return this.privateDoNotAccessOrElseWrappedHtml + '';
    }
}
exports.SafeHtml = SafeHtml;
/* istanbul ignore if */
if (false) {
    /**
     * @const {(string|?)}
     * @private
     */
    SafeHtml.prototype.privateDoNotAccessOrElseWrappedHtml;
}
// WARNING: interface has both a type and a value, skipping emit
/** @type {function(new:SafeHtml, !Object, (string|?))} */
const HtmlImpl = (/** @type {function(new:SafeHtml, !Object, (string|?))} */ (SafeHtml));
/**
 * @param {(string|?)} value
 * @return {!SafeHtml}
 */
function constructHtml(value) {
    return new HtmlImpl(secrets_1.secretToken, value);
}
/**
 * Builds a new `SafeHtml` from the given string, without enforcing
 * safety guarantees. It may cause side effects by creating a Trusted Types
 * policy. This shouldn't be exposed to application developers, and must only be
 * used as a step towards safe builders or safe constants.
 * @param {string} value
 * @return {!SafeHtml}
 */
function createHtmlInternal(value) {
    // Inlining this variable can cause large codesize increases when it is a
    // large constant string. See sizetests/examples/constants for an example.
    /**
     * @noinline
     * @type {string}
     */
    const noinlineValue = value;
    /** @type {(null|!tsickle_trusted_types_typings_2.TrustedTypePolicy)} */
    const policy = (0, trusted_types_1.getPolicy)();
    return constructHtml(policy ? policy.createHTML(noinlineValue) : noinlineValue);
}
exports.createHtmlInternal = createHtmlInternal;
/**
 * An empty `SafeHtml` constant.
 * Unlike the functions above, using this will not create a policy.
 * @type {!SafeHtml}
 */
exports.EMPTY_HTML = (0, pure_1.pure)((/**
 * @return {!SafeHtml}
 */
() => constructHtml(trusted_types_1.trustedTypes ? trusted_types_1.trustedTypes.emptyHTML : '')));
/**
 * Checks if the given value is a `SafeHtml` instance
 * // BEGIN-INTERNAL
 * \@google3-ignore-for-3p-optimization-safety {value} Used only in an instanceof
 *     check.
 * // END-INTERNAL
 * @param {*} value
 * @return {boolean}
 */
function isHtml(value) {
    return value instanceof SafeHtml;
}
exports.isHtml = isHtml;
/**
 * Returns the value of the passed `SafeHtml` object while ensuring it
 * has the correct type.
 * Using this function directly is not common. Safe types are not meant to be
 * unwrapped, but rather passed to other APIs that consume them, like the DOM
 * wrappers in safevalues/dom.
 *
 * Returns a native `TrustedHTML` or a string if Trusted Types are disabled.  // LINE-INTERNAL
 * // LINE-EXTERNAL * Returns a native `TrustedHTML` instance typed as {toString(): string} or a string if Trusted Types are disabled.
 * @param {!SafeHtml} value
 * @return {(string|?)}
 */
function unwrapHtml(value) {
    if (isHtml(value)) {
        return ((/** @type {?} */ ((/** @type {*} */ (value))))).privateDoNotAccessOrElseWrappedHtml;
    }
    else {
        /** @type {string} */
        let message = '';
        if (dev_1.DEV_MODE) {
            message = 'Unexpected type when unwrapping SafeHtml';
        }
        throw new Error(message);
    }
}
exports.unwrapHtml = unwrapHtml;
