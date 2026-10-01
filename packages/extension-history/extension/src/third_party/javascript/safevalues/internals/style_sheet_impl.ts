/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview Internal implementations of SafeStyleSheet.
 * Generated from: third_party/javascript/safevalues/internals/style_sheet_impl.ts
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
goog.module('google3.third_party.javascript.safevalues.internals.style_sheet_impl');
var module = module || { id: 'third_party/javascript/safevalues/internals/style_sheet_impl.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_dev_1 = goog.requireType("google3.third_party.javascript.safevalues.environment.dev");
const tsickle_secrets_2 = goog.requireType("google3.third_party.javascript.safevalues.internals.secrets");
const dev_1 = goog.require('google3.third_party.javascript.safevalues.environment.dev');
const secrets_1 = goog.require('google3.third_party.javascript.safevalues.internals.secrets');
/**
 * A complete CSS style sheet, safe to use in style contexts in an HTML
 * document or DOM APIs.
 *
 * @final
 */
class SafeStyleSheet {
    /**
     * @private
     * @param {!Object} token
     * @param {string} value
     */
    constructor(token, value) {
        if (dev_1.DEV_MODE) {
            (0, secrets_1.ensureTokenIsValid)(token);
        }
        this.privateDoNotAccessOrElseWrappedStyleSheet = value;
    }
    /**
     * @public
     * @return {string}
     */
    toString() {
        return this.privateDoNotAccessOrElseWrappedStyleSheet;
    }
}
exports.SafeStyleSheet = SafeStyleSheet;
/* istanbul ignore if */
if (false) {
    /**
     * @const {string}
     * @private
     */
    SafeStyleSheet.prototype.privateDoNotAccessOrElseWrappedStyleSheet;
}
// WARNING: interface has both a type and a value, skipping emit
/** @type {function(new:SafeStyleSheet, !Object, string)} */
const StyleSheetImpl = (/** @type {function(new:SafeStyleSheet, !Object, string)} */ (SafeStyleSheet));
/**
 * Builds a new `SafeStyleSheet` from the given string, without enforcing
 * safety guarantees. This shouldn't be exposed to application developers, and
 * must only be used as a step towards safe builders or safe constants.
 * @param {string} value
 * @return {!SafeStyleSheet}
 */
function createStyleSheetInternal(value) {
    return new StyleSheetImpl(secrets_1.secretToken, value);
}
exports.createStyleSheetInternal = createStyleSheetInternal;
/**
 * Checks if the given value is a `SafeStyleSheet` instance.
 * // BEGIN-INTERNAL
 * \@google3-ignore-for-3p-optimization-safety {value} Used only in an instanceof
 *     check.
 * // END-INTERNAL
 * @param {*} value
 * @return {boolean}
 */
function isStyleSheet(value) {
    return value instanceof SafeStyleSheet;
}
exports.isStyleSheet = isStyleSheet;
/**
 * Returns the string value of the passed `SafeStyleSheet` object while ensuring it
 * has the correct type.
 * @param {!SafeStyleSheet} value
 * @return {string}
 */
function unwrapStyleSheet(value) {
    if (isStyleSheet(value)) {
        return ((/** @type {?} */ ((/** @type {*} */ (value)))))
            .privateDoNotAccessOrElseWrappedStyleSheet;
    }
    /** @type {string} */
    let message = '';
    if (dev_1.DEV_MODE) {
        message = `Unexpected type when unwrapping SafeStyleSheet, got '${value}' of type '${typeof value}'`;
    }
    throw new Error(message);
}
exports.unwrapStyleSheet = unwrapStyleSheet;
