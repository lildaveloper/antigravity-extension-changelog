/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview Internal implementations of TrustedResourceUrl.
 * Generated from: third_party/javascript/safevalues/internals/resource_url_impl.ts
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
goog.module('google3.third_party.javascript.safevalues.internals.resource_url_impl');
var module = module || { id: 'third_party/javascript/safevalues/internals/resource_url_impl.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_trusted_types_1 = goog.requireType("google3.third_party.javascript.safevalues.internals.trusted_types");
const tsickle_trusted_types_typings_2 = goog.requireType("google3.third_party.javascript.safevalues.internals.trusted_types_typings");
const tsickle_dev_3 = goog.requireType("google3.third_party.javascript.safevalues.environment.dev");
const tsickle_secrets_4 = goog.requireType("google3.third_party.javascript.safevalues.internals.secrets");
const trusted_types_1 = goog.require('google3.third_party.javascript.safevalues.internals.trusted_types');
const dev_1 = goog.require('google3.third_party.javascript.safevalues.environment.dev');
const secrets_1 = goog.require('google3.third_party.javascript.safevalues.internals.secrets');
/**
 * String that is safe to use in all URL contexts in DOM APIs and HTML
 * documents; even as a reference to resources that may load in the current
 * origin (e.g. scripts and stylesheets).
 *
 * @final
 */
class TrustedResourceUrl {
    /**
     * @private
     * @param {!Object} token
     * @param {(string|?)} value
     */
    constructor(token, value) {
        if (dev_1.DEV_MODE) {
            (0, secrets_1.ensureTokenIsValid)(token);
        }
        this.privateDoNotAccessOrElseWrappedResourceUrl = value;
    }
    /**
     * @public
     * @return {string}
     */
    toString() {
        // String coercion minimizes code size.
        // tslint:disable-next-line:restrict-plus-operands
        return this.privateDoNotAccessOrElseWrappedResourceUrl + '';
    }
}
exports.TrustedResourceUrl = TrustedResourceUrl;
/* istanbul ignore if */
if (false) {
    /**
     * @const {(string|?)}
     * @private
     */
    TrustedResourceUrl.prototype.privateDoNotAccessOrElseWrappedResourceUrl;
}
// WARNING: interface has both a type and a value, skipping emit
/** @type {function(new:TrustedResourceUrl, !Object, (string|?))} */
const ResourceUrlImpl = (/** @type {function(new:TrustedResourceUrl, !Object, (string|?))} */ (TrustedResourceUrl));
/**
 * @param {(string|?)} value
 * @return {!TrustedResourceUrl}
 */
function constructResourceUrl(value) {
    return new ResourceUrlImpl(secrets_1.secretToken, value);
}
/**
 * Builds a new `TrustedResourceUrl` from the given string, without enforcing
 * safety guarantees. It may cause side effects by creating a Trusted Types
 * policy. This shouldn't be exposed to application developers, and must only be
 * used as a step towards safe builders or safe constants.
 * @param {string} value
 * @return {!TrustedResourceUrl}
 */
function createResourceUrlInternal(value) {
    // Inlining this variable can cause large codesize increases when it is a
    // large constant string. See sizetests/examples/constants for an example.
    /**
     * @noinline
     * @type {string}
     */
    const noinlineValue = value;
    /** @type {(null|!tsickle_trusted_types_typings_2.TrustedTypePolicy)} */
    const policy = (0, trusted_types_1.getPolicy)();
    return constructResourceUrl(policy ? policy.createScriptURL(noinlineValue) : noinlineValue);
}
exports.createResourceUrlInternal = createResourceUrlInternal;
/**
 * Checks if the given value is a `TrustedResourceUrl` instance
 * // BEGIN-INTERNAL
 * \@google3-ignore-for-3p-optimization-safety {value} Used only in an instanceof
 *     check.
 * // END-INTERNAL
 * @param {*} value
 * @return {boolean}
 */
function isResourceUrl(value) {
    return value instanceof TrustedResourceUrl;
}
exports.isResourceUrl = isResourceUrl;
/**
 * Returns the value of the passed `TrustedResourceUrl` object while ensuring it
 * has the correct type.
 * Using this function directly is not common. Safe types are not meant to be
 * unwrapped, but rather passed to other APIs that consume them, like the DOM
 * wrappers in safevalues/dom.
 *
 * Returns a native `TrustedScriptURL` or a string if Trusted Types are disabled.  // LINE-INTERNAL
 * // LINE-EXTERNAL * Returns a native `TrustedScriptURL` instance typed as {toString(): string} or a string if Trusted Types are disabled.
 * @param {!TrustedResourceUrl} value
 * @return {(string|?)}
 */
function unwrapResourceUrl(value) {
    if (isResourceUrl(value)) {
        return ((/** @type {?} */ ((/** @type {*} */ (value)))))
            .privateDoNotAccessOrElseWrappedResourceUrl;
    }
    else {
        /** @type {string} */
        let message = '';
        if (dev_1.DEV_MODE) {
            message = 'Unexpected type when unwrapping TrustedResourceUrl';
        }
        throw new Error(message);
    }
}
exports.unwrapResourceUrl = unwrapResourceUrl;
