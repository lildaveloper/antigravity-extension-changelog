/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview Internal implementations of SafeScript.
 * Generated from: third_party/javascript/safevalues/internals/script_impl.ts
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
goog.module('google3.third_party.javascript.safevalues.internals.script_impl');
var module = module || { id: 'third_party/javascript/safevalues/internals/script_impl.closure.js' };
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
 * JavaScript code that is safe to evaluate and use as the content of an HTML
 * script element.
 *
 * @final
 */
class SafeScript {
    /**
     * @private
     * @param {!Object} token
     * @param {(string|?)} value
     */
    constructor(token, value) {
        if (dev_1.DEV_MODE) {
            (0, secrets_1.ensureTokenIsValid)(token);
        }
        this.privateDoNotAccessOrElseWrappedScript = value;
    }
    /**
     * @public
     * @return {string}
     */
    toString() {
        // String coercion minimizes code size.
        // tslint:disable-next-line:restrict-plus-operands
        return this.privateDoNotAccessOrElseWrappedScript + '';
    }
}
exports.SafeScript = SafeScript;
/* istanbul ignore if */
if (false) {
    /**
     * @const {(string|?)}
     * @private
     */
    SafeScript.prototype.privateDoNotAccessOrElseWrappedScript;
}
// WARNING: interface has both a type and a value, skipping emit
/** @type {function(new:SafeScript, !Object, (string|?))} */
const ScriptImpl = (/** @type {function(new:SafeScript, !Object, (string|?))} */ (SafeScript));
/**
 * @param {(string|?)} value
 * @return {!SafeScript}
 */
function constructScript(value) {
    return new ScriptImpl(secrets_1.secretToken, value);
}
/**
 * Builds a new `SafeScript` from the given string, without enforcing
 * safety guarantees. It may cause side effects by creating a Trusted Types
 * policy. This shouldn't be exposed to application developers, and must only be
 * used as a step towards safe builders or safe constants.
 * @param {string} value
 * @return {!SafeScript}
 */
function createScriptInternal(value) {
    // Inlining this variable can cause large codesize increases when it is a
    // large constant string. See sizetests/examples/constants for an example.
    /**
     * @noinline
     * @type {string}
     */
    const noinlineValue = value;
    /** @type {(null|!tsickle_trusted_types_typings_2.TrustedTypePolicy)} */
    const policy = (0, trusted_types_1.getPolicy)();
    return constructScript(policy ? policy.createScript(noinlineValue) : noinlineValue);
}
exports.createScriptInternal = createScriptInternal;
/**
 * An empty `SafeScript` constant.
 * Unlike the functions above, using this will not create a policy.
 * @type {!SafeScript}
 */
exports.EMPTY_SCRIPT = (0, pure_1.pure)((/**
 * @return {!SafeScript}
 */
() => constructScript(trusted_types_1.trustedTypes ? trusted_types_1.trustedTypes.emptyScript : '')));
/**
 * Checks if the given value is a `SafeScript` instance
 * // BEGIN-INTERNAL
 * \@google3-ignore-for-3p-optimization-safety {value} Used only in an instanceof
 *     check.
 * // END-INTERNAL
 * @param {*} value
 * @return {boolean}
 */
function isScript(value) {
    return value instanceof SafeScript;
}
exports.isScript = isScript;
/**
 * Returns the value of the passed `SafeScript` object while ensuring it
 * has the correct type.
 * Using this function directly is not common. Safe types are not meant to be
 * unwrapped, but rather passed to other APIs that consume them, like the DOM
 * wrappers in safevalues/dom.
 *
 * Returns a native `TrustedScript` or a string if Trusted Types are disabled.  // LINE-INTERNAL
 * // LINE-EXTERNAL * Returns a native `TrustedScript` instance typed as {toString(): string} or a string if Trusted Types are disabled.
 * @param {!SafeScript} value
 * @return {(string|?)}
 */
function unwrapScript(value) {
    if (isScript(value)) {
        return ((/** @type {?} */ ((/** @type {*} */ (value)))))
            .privateDoNotAccessOrElseWrappedScript;
    }
    else {
        /** @type {string} */
        let message = '';
        if (dev_1.DEV_MODE) {
            message = 'Unexpected type when unwrapping SafeScript';
        }
        throw new Error(message);
    }
}
exports.unwrapScript = unwrapScript;
