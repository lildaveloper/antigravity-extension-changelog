/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview Internal implementations of SafeAttributePrefix.
 * Generated from: third_party/javascript/safevalues/internals/attribute_impl.ts
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
goog.module('google3.third_party.javascript.safevalues.internals.attribute_impl');
var module = module || { id: 'third_party/javascript/safevalues/internals/attribute_impl.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_dev_1 = goog.requireType("google3.third_party.javascript.safevalues.environment.dev");
const tsickle_secrets_2 = goog.requireType("google3.third_party.javascript.safevalues.internals.secrets");
const dev_1 = goog.require('google3.third_party.javascript.safevalues.environment.dev');
const secrets_1 = goog.require('google3.third_party.javascript.safevalues.internals.secrets');
/**
 * A prefix with which an attribute is safe to set using plain strings.
 *
 * @final
 */
class SafeAttributePrefix {
    /**
     * @private
     * @param {!Object} token
     * @param {string} value
     */
    constructor(token, value) {
        if (dev_1.DEV_MODE) {
            (0, secrets_1.ensureTokenIsValid)(token);
        }
        this.privateDoNotAccessOrElseWrappedAttributePrefix = value;
    }
    /**
     * @public
     * @return {string}
     */
    toString() {
        return this.privateDoNotAccessOrElseWrappedAttributePrefix;
    }
}
exports.SafeAttributePrefix = SafeAttributePrefix;
/* istanbul ignore if */
if (false) {
    /**
     * @const {string}
     * @private
     */
    SafeAttributePrefix.prototype.privateDoNotAccessOrElseWrappedAttributePrefix;
}
// WARNING: interface has both a type and a value, skipping emit
/** @type {function(new:SafeAttributePrefix, !Object, string)} */
const AttributePrefixImpl = (/** @type {function(new:SafeAttributePrefix, !Object, string)} */ (SafeAttributePrefix));
/**
 * Builds a new `SafeAttributePrefix` from the given string, without enforcing
 * safety guarantees. This shouldn't be exposed to application developers, and
 * must only be used as a step towards safe builders or safe constants.
 * @param {string} value
 * @return {!SafeAttributePrefix}
 */
function createAttributePrefixInternal(value) {
    return new AttributePrefixImpl(secrets_1.secretToken, value);
}
exports.createAttributePrefixInternal = createAttributePrefixInternal;
/**
 * Checks if the given value is a `SafeAttributePrefix` instance.
 * @param {*} value
 * @return {boolean}
 */
function isAttributePrefix(value) {
    return value instanceof SafeAttributePrefix;
}
exports.isAttributePrefix = isAttributePrefix;
/**
 * Returns the string value of the passed `SafeAttributePrefix` object while
 * ensuring it has the correct type.
 * @param {!SafeAttributePrefix} value
 * @return {string}
 */
function unwrapAttributePrefix(value) {
    if (isAttributePrefix(value)) {
        return ((/** @type {?} */ ((/** @type {*} */ (value)))))
            .privateDoNotAccessOrElseWrappedAttributePrefix;
    }
    /** @type {string} */
    let message = '';
    if (dev_1.DEV_MODE) {
        message = `Unexpected type when unwrapping SafeAttributePrefix, got '${value}' of type '${typeof value}'`;
    }
    throw new Error(message);
}
exports.unwrapAttributePrefix = unwrapAttributePrefix;
