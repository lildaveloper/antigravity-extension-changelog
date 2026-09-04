/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/javascript/safevalues/internals/secrets.ts
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
goog.module('google3.third_party.javascript.safevalues.internals.secrets');
var module = module || { id: 'third_party/javascript/safevalues/internals/secrets.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_dev_1 = goog.requireType("google3.third_party.javascript.safevalues.environment.dev");
const dev_1 = goog.require('google3.third_party.javascript.safevalues.environment.dev');
/**
 * A secret token that must be passed to safe type constructors. It is only
 * accessible from within safevalues, ensuring that unrestricted safe type
 * creation is only possible within safevalues. In particular, this prevents
 * forgery such as `safeHtmlValue.constructor('javascript:evil')`.
 * @type {*}
 */
exports.secretToken = {};
/**
 * Asserts that the given token matches the secret safevalues token. An
 * exception is thrown if that is not the case.
 * @param {!Object} token
 * @return {void}
 */
function ensureTokenIsValid(token) {
    if (dev_1.DEV_MODE) {
        if (token !== exports.secretToken) {
            throw new Error('Bad secret');
        }
    }
}
exports.ensureTokenIsValid = ensureTokenIsValid;
