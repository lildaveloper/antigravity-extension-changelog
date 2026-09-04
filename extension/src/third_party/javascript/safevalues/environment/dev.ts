/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/javascript/safevalues/environment/dev.ts
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
// BEGIN-INTERNAL
goog.module('google3.third_party.javascript.safevalues.environment.dev');
var module = module || { id: 'third_party/javascript/safevalues/environment/dev.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
/**
 * Whether we are in development mode. Used for stripping out unnecessary error
 * messages and security checks from production binaries. This will be rewritten
 * to use process.env.NODE_ENV in open-source.
 * @type {boolean}
 */
exports.DEV_MODE = goog.DEBUG;
