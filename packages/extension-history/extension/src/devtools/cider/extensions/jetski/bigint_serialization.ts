/**
 * Utilities for serializing and deserializing BigInt values through VS Code's
 * webview postMessage boundary.
 *
 * VS Code internally uses JSON.stringify/JSON.parse for messages passed between
 * the extension host and webviews. JSON.stringify throws a TypeError when it
 * encounters a BigInt value. Protobuf int64/uint64 fields are represented as
 * BigInt in \@bufbuild/protobuf, so any RPC message containing such fields will
 * fail to cross the webview boundary.
 *
 * These utilities convert BigInt values to/from a tagged object sentinel
 * ({$bigint: "123"}) so they survive the JSON round-trip.
 */
// taze: BigInt from //third_party/javascript/node_modules/typescript:es2020.bigint
/**
 * @fileoverview added by tsickle
 * Generated from: devtools/cider/extensions/jetski/bigint_serialization.ts
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
goog.module('google3.devtools.cider.extensions.jetski.bigint_serialization');
var module = module || { id: 'devtools/cider/extensions/jetski/bigint_serialization.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
/**
 * @record
 */
function BigIntSentinel() { }
exports.BigIntSentinel = BigIntSentinel;
/* istanbul ignore if */
if (false) {
    /**
     * @type {string}
     * @public
     */
    BigIntSentinel.prototype.$bigint;
}
/**
 * Recursively transforms bigint fields in T to BigIntSentinel objects.
 * @typedef {?}
 */
exports.BigIntSerialized;
/**
 * @param {*} value
 * @return {boolean}
 */
function isBigIntSentinel(value) {
    return (value !== null &&
        typeof value === 'object' &&
        !Array.isArray(value) &&
        Object.keys(value).length === 1 &&
        '$bigint' in value &&
        typeof ((/** @type {!BigIntSentinel} */ (value))).$bigint === 'string');
}
/**
 * Deeply replaces all BigInt values in an object tree with tagged sentinel
 * objects that are safe for JSON.stringify. Returns the original value if no
 * BigInts are present.
 * @template T
 * @param {T} value
 * @return {?}
 */
function serializeBigInts(value) {
    return (/** @type {?} */ (serializeBigIntsImpl(value)));
}
exports.serializeBigInts = serializeBigInts;
/**
 * @param {*} value
 * @return {*}
 */
function serializeBigIntsImpl(value) {
    if (typeof value === 'bigint') {
        return { $bigint: (/** @type {bigint} */ (value)).toString() };
    }
    if (value === null || typeof value !== 'object') {
        return value;
    }
    if (value instanceof Uint8Array) {
        return value;
    }
    if (Array.isArray(value)) {
        /** @type {boolean} */
        let changed = false;
        /** @type {!Array<*>} */
        const result = (/** @type {!Array<?>} */ (value)).map((/**
         * @param {?} item
         * @return {*}
         */
        (item) => {
            /** @type {*} */
            const serialized = serializeBigIntsImpl(item);
            if (serialized !== item)
                changed = true;
            return serialized;
        }));
        return changed ? result : value;
    }
    /** @type {boolean} */
    let changed = false;
    /** @type {?} */
    const result = {};
    for (const [key__tsickle_destructured_1, val__tsickle_destructured_2] of Object.entries(value)) {
        const key = /** @type {string} */ (key__tsickle_destructured_1);
        const val = /** @type {?} */ (val__tsickle_destructured_2);
        /** @type {*} */
        const serialized = serializeBigIntsImpl(val);
        if (serialized !== val)
            changed = true;
        result[key] = serialized;
    }
    return changed ? result : value;
}
/**
 * Deeply restores BigInt values from tagged sentinel objects produced by
 * serializeBigInts. Returns the original value if no sentinels are present.
 * @template T
 * @param {?} value
 * @return {T}
 */
function deserializeBigInts(value) {
    return (/** @type {T} */ (deserializeBigIntsImpl(value)));
}
exports.deserializeBigInts = deserializeBigInts;
/**
 * @param {*} value
 * @return {*}
 */
function deserializeBigIntsImpl(value) {
    if (value === null || typeof value !== 'object') {
        return value;
    }
    if (isBigIntSentinel(value)) {
        return BigInt((/** @type {!BigIntSentinel} */ (value)).$bigint);
    }
    if (Array.isArray(value)) {
        /** @type {boolean} */
        let changed = false;
        /** @type {!Array<*>} */
        const result = (/** @type {!Array<?>} */ (value)).map((/**
         * @param {?} item
         * @return {*}
         */
        (item) => {
            /** @type {*} */
            const deserialized = deserializeBigIntsImpl(item);
            if (deserialized !== item)
                changed = true;
            return deserialized;
        }));
        return changed ? result : value;
    }
    /** @type {boolean} */
    let changed = false;
    /** @type {?} */
    const result = {};
    for (const [key__tsickle_destructured_3, val__tsickle_destructured_4] of Object.entries(value)) {
        const key = /** @type {string} */ (key__tsickle_destructured_3);
        const val = /** @type {?} */ (val__tsickle_destructured_4);
        /** @type {*} */
        const deserialized = deserializeBigIntsImpl(val);
        if (deserialized !== val)
            changed = true;
        result[key] = deserialized;
    }
    return changed ? result : value;
}
