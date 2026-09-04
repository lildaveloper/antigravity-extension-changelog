/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview Utilities for interacting with Trusted Types, create and/or
 * retrieve the policy for the library.
 * Generated from: third_party/javascript/safevalues/internals/trusted_types.ts
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
goog.module('google3.third_party.javascript.safevalues.internals.trusted_types');
var module = module || { id: 'third_party/javascript/safevalues/internals/trusted_types.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_dev_1 = goog.requireType("google3.third_party.javascript.safevalues.environment.dev");
const tsickle_trusted_types_typings_2 = goog.requireType("google3.third_party.javascript.safevalues.internals.trusted_types_typings");
const dev_1 = goog.require('google3.third_party.javascript.safevalues.environment.dev');
/** @typedef {boolean} */
var ExposeTrustedTypes;
/**
 * Controls whether to expose Trusted Types to the user through unwrapper
 * functions.
 * @typedef {?}
 */
exports.UnwrapType;
// BEGIN-INTERNAL
/**
 * The name of the Trusted Types policy used by the library, or empty
 * to disable Trusted Types.
 *
 * TODO(b/365132434): Migrate everyone to stop relying on goog.TRUSTED_TYPES_POLICY_NAME
 *
 * @define {string}
 */
const configuredPolicyName = goog.define('goog.html.trustedtypes.POLICY_NAME', goog.TRUSTED_TYPES_POLICY_NAME
    ? goog.TRUSTED_TYPES_POLICY_NAME + '#html'
    : '');
// END-INTERNAL
// BEGIN-EXTERNAL
// /**
//  * The name of the Trusted Types policy used by the library, or empty
//  * to disable Trusted Types.
//  */
// const configuredPolicyName = 'google#safe';
// END-EXTERNAL
/**
 * Mutable version of the policy name so it is testable.
 * @type {string}
 */
let policyName = configuredPolicyName;
/**
 * Re-exports the global trustedTypes object for convenience.
 * @type {(undefined|!tsickle_trusted_types_typings_2.TrustedTypePolicyFactory)}
 */
exports.trustedTypes = ((/** @type {?} */ (globalThis))).trustedTypes;
/**
 * Mutable version of trustedTypes object so it is testable
 *
 * Note: we need to mark this as not inlineable to prevent the compiler from
 * inlining it and causing soy conformance tests to fail.
 * @noinline
 * @type {(undefined|!tsickle_trusted_types_typings_2.TrustedTypePolicyFactory)}
 */
let trustedTypesInternal = exports.trustedTypes;
/**
 * Cached Trusted Types policy:
 *  - `null` if Trusted Types are not enabled/supported
 *  - `undefined` if the policy has not been created yet.
 * @type {(undefined|null|!tsickle_trusted_types_typings_2.TrustedTypePolicy)}
 */
let policy;
/**
 * @return {(null|!tsickle_trusted_types_typings_2.TrustedTypePolicy)}
 */
function createPolicy() {
    /** @type {(null|!tsickle_trusted_types_typings_2.TrustedTypePolicy)} */
    let policy = null;
    if (policyName === '') {
        // Binary is not configured to use Trusted Types.
        return policy;
    }
    if (!trustedTypesInternal) {
        return policy;
    }
    // trustedTypes.createPolicy throws in some older versions of chrome if
    // called with a name that is already registered, even in report-only mode.
    // Until the API changes, catch the error not to break the applications
    // functionally. In such case, the code will fall back to using strings.
    // TODO(engels): Check if this code can be simplified now.  // LINE-INTERNAL
    try {
        /** @type {function(string): string} */
        const identity = (/**
         * @param {string} x
         * @return {string}
         */
        (x) => x);
        policy = trustedTypesInternal.createPolicy(policyName, {
            createHTML: identity,
            createScript: identity,
            createScriptURL: identity,
        });
    }
    catch (e) {
        if (dev_1.DEV_MODE) {
            throw (/** @type {!Error} */ (e));
        }
    }
    return policy;
}
/**
 * Returns the Trusted Types policy used by safevalues, or null if Trusted
 * Types are not enabled/supported.
 *
 * The first call to this function will create the policy, and all subsequent
 * calls will return the same policy.
 * @return {(null|!tsickle_trusted_types_typings_2.TrustedTypePolicy)}
 */
function getPolicy() {
    if (policy === undefined) {
        policy = createPolicy();
    }
    return policy;
}
exports.getPolicy = getPolicy;
/**
 * Helpers for tests.
 * @type {{setPolicyName: function(string): void, setTrustedTypes: function((undefined|!tsickle_trusted_types_typings_2.TrustedTypePolicyFactory)): void, resetDefaults: function(): void}}
 */
exports.TEST_ONLY = {
    /**
     * @public
     * @param {string} name
     * @return {void}
     */
    setPolicyName(name) {
        policyName = name;
    },
    /**
     * @public
     * @param {(undefined|!tsickle_trusted_types_typings_2.TrustedTypePolicyFactory)} mockTrustedTypes
     * @return {void}
     */
    setTrustedTypes(mockTrustedTypes) {
        trustedTypesInternal = mockTrustedTypes;
    },
    /**
     * @public
     * @return {void}
     */
    resetDefaults() {
        policy = undefined;
        policyName = configuredPolicyName;
        trustedTypesInternal = exports.trustedTypes;
    },
};
