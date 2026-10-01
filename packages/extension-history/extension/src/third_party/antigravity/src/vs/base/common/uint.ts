/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/antigravity/src/vs/base/common/uint.ts
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
goog.module('google3.third_party.antigravity.src.vs.base.common.uint');
var module = module || { id: 'third_party/antigravity/src/vs/base/common/uint.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
/** @enum {number} */
var Constants = {
    /**
     * MAX SMI (SMall Integer) as defined in v8.
     * one bit is lost for boxing/unboxing flag.
     * one bit is lost for sign flag.
     * See https://thibaultlaurens.github.io/javascript/2013/04/29/how-the-v8-engine-works/#tagged-values
     */
    MAX_SAFE_SMALL_INTEGER: 1073741824,
    /**
     * MIN SMI (SMall Integer) as defined in v8.
     * one bit is lost for boxing/unboxing flag.
     * one bit is lost for sign flag.
     * See https://thibaultlaurens.github.io/javascript/2013/04/29/how-the-v8-engine-works/#tagged-values
     */
    MIN_SAFE_SMALL_INTEGER: -1073741824,
    /**
     * Max unsigned integer that fits on 8 bits.
     */
    MAX_UINT_8: 255, // 2^8 - 1
    // 2^8 - 1
    /**
     * Max unsigned integer that fits on 16 bits.
     */
    MAX_UINT_16: 65535, // 2^16 - 1
    // 2^16 - 1
    /**
     * Max unsigned integer that fits on 32 bits.
     */
    MAX_UINT_32: 4294967295, // 2^32 - 1
    // 2^32 - 1
    UNICODE_SUPPLEMENTARY_PLANE_BEGIN: 65536,
};
exports.Constants = Constants;
Constants[Constants.MAX_SAFE_SMALL_INTEGER] = 'MAX_SAFE_SMALL_INTEGER';
Constants[Constants.MIN_SAFE_SMALL_INTEGER] = 'MIN_SAFE_SMALL_INTEGER';
Constants[Constants.MAX_UINT_8] = 'MAX_UINT_8';
Constants[Constants.MAX_UINT_16] = 'MAX_UINT_16';
Constants[Constants.MAX_UINT_32] = 'MAX_UINT_32';
Constants[Constants.UNICODE_SUPPLEMENTARY_PLANE_BEGIN] = 'UNICODE_SUPPLEMENTARY_PLANE_BEGIN';
/**
 * @param {number} v
 * @return {number}
 */
function toUint8(v) {
    if (v < 0) {
        return 0;
    }
    if (v > Constants.MAX_UINT_8) {
        return Constants.MAX_UINT_8;
    }
    return v | 0;
}
exports.toUint8 = toUint8;
/**
 * @param {number} v
 * @return {number}
 */
function toUint32(v) {
    if (v < 0) {
        return 0;
    }
    if (v > Constants.MAX_UINT_32) {
        return Constants.MAX_UINT_32;
    }
    return v | 0;
}
exports.toUint32 = toUint32;
