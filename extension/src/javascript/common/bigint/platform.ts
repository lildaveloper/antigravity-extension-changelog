/**
 * @fileoverview Platform definitions for bigint usage in google3.
 *
 * Direct access to the exported constants in this file are restricted to
 * web platform code.
 * Generated from: javascript/common/bigint/platform.ts
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
goog.module('google3.javascript.common.bigint.platform');
var module = module || { id: 'javascript/common/bigint/platform.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
/**
 * Indicates that all browsers or platforms used in the JS binary natively
 * support `BigInt`. This permits removing `BigInt` related fallback code from
 * binaries.
 *
 * Prefer setting go/browser_featureset_year. If infeasible, you can exclusively
 * set this define for code-size improvements. For more info, see
 * go/typescript-g3patterns#closure-compile-time-defines
 *
 * For library authors, it is discouraged to set this to true in debug or
 * testing as this assumption may prove false for some binaries.
 *
 * @define {boolean}
 */
const ASSUME_NATIVE_BIGINT = goog.define('javascript.common.bigint.ASSUME_NATIVE_BIGINT', goog.FEATURESET_YEAR >= 2021);
/**
 * Indicates that BigInt is natively supported on the current platform.
 *
 * If `ASSUME_NATIVE_BIGINT` is `true`, this is a compile-time `true `constant.
 * Otherwise this will either be `true` or `false` at runtime depending on the
 * platform availability of `BigInt`
 *
 * In general, code authors should not need to use this. If you are an
 * application and `ASSUME_NATIVE_BIGINT` is true, just use the `BigInt()`
 * constructor directly. Otherwise, use `JSBI.BigInt()`.
 *
 * Core libraries that need to support `BigInt` related fallback code may use
 * this.
 * @type {boolean}
 */
exports.NATIVE_BIGINT_AVAILABLE = ASSUME_NATIVE_BIGINT ||
    (typeof goog.global.BigInt === 'function' &&
        typeof goog.global.BigInt(0) === 'bigint');
/**
 * In DEBUG builds, makes `gbigintForcedAsStringHalfTheTime` and
 * `isGbigintForcedAsStringHalfTheTime` represent `gbigint` values as `string`
 * _always_ on odd numbers instead of session-random.
 *
 * Set this if, for debug builds, you need to ensure consistent `gbigint` value
 * representation across multiple JS VMs (e.g., a web app with a worker thread).
 *
 * @define {boolean}
 */
exports.ODD_FORCED_STRING_IN_DEBUG = goog.define('javascript.common.bigint.ODD_FORCED_STRING_IN_DEBUG', false);
