/**
 * @fileoverview goog.define for whether to enable asserts. In a separate file
 * so that Guards & Asserts can also depend on it without needing to depend on
 * the entire asserts library.
 * Generated from: javascript/common/asserts/enable_goog_asserts.ts
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
goog.module('google3.javascript.common.asserts.enable_goog_asserts');
var module = module || { id: 'javascript/common/asserts/enable_goog_asserts.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
/**
 * @define {boolean} Whether to strip out goog.asserts or to leave them in.
 */
exports.ENABLE_GOOG_ASSERTS = goog.define('goog.asserts.ENABLE_ASSERTS', goog.DEBUG);
