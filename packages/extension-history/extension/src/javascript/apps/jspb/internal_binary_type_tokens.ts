/**
 * @fileoverview Opaque type tokens to switch on type information.
 *
 * DO NOT USE THIS OUTSIDE OF THIS PACKAGE.
 * Generated from: javascript/apps/jspb/internal_binary_type_tokens.ts
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
goog.module('google3.javascript.apps.jspb.internal_binary_type_tokens');
var module = module || { id: 'javascript/apps/jspb/internal_binary_type_tokens.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
/**
 * @record
 * @template Description
 */
function TypeTokenInstance() { }
/* istanbul ignore if */
if (false) {
    /* Skipping unnamed member:
    [typeTokenInstanceBrand]: Description;*/
}
/**
 * An opaque reference to a type token.
 * @record
 * @template Description
 */
function OpaqueTypeToken() { }
exports.OpaqueTypeToken = OpaqueTypeToken;
/**
 * @record
 * @template Description
 * @extends {OpaqueTypeToken}
 */
function OpaqueTypeTokenInternal() { }
/* istanbul ignore if */
if (false) {
    /**
     * @type {(undefined|Description)}
     * @public
     */
    OpaqueTypeTokenInternal.prototype.typeTokenDebugTypeDescription;
}
/**
 * This creates opaque type tokens which can be compared with either `===` or
 * `equals`.
 *
 * @nosideeffects
 * @template Description
 * @param {(undefined|Description)=} debugName
 * @return {!OpaqueTypeToken<Description>}
 */
function newOpaqueTypeToken(debugName) {
    /** @type {!OpaqueTypeTokenInternal<Description>} */
    const t = (/** @type {!OpaqueTypeTokenInternal<Description>} */ ((/** @type {*} */ (class {
        /**
         * @public
         */
        constructor() {
            throw goog.DEBUG
                ? new Error('cannot construct an instance of a type token')
                : new Error();
        }
    }))));
    Object.setPrototypeOf(t, t.prototype);
    if (goog.DEBUG && !COMPILED) {
        t.typeTokenDebugTypeDescription = debugName;
    }
    return t;
}
/**
 * Returns whether the given type tokens are equal.
 *
 * This uses `instanceof` under the hood to enable code motion when the
 * right-hand side is late-loaded.
 *
 * @requireInlining
 * @param {!OpaqueTypeToken<string>} a
 * @param {!OpaqueTypeToken<string>} b
 * @return {boolean}
 */
function typeTokensEqual(a, b) {
    return a instanceof b;
}
exports.typeTokensEqual = typeTokensEqual;
/**
 * Type token for REPEATED fields
 * @type {!OpaqueTypeToken<string>}
 */
exports.REPEATED = newOpaqueTypeToken('REPEATED');
/**
 * Type token for MAP fields
 * @type {!OpaqueTypeToken<string>}
 */
exports.MAP = newOpaqueTypeToken('MAP');
/**
 * Type token for MESSAGE fields
 * @type {!OpaqueTypeToken<string>}
 */
exports.MESSAGE = newOpaqueTypeToken('MESSAGE');
/**
 * Type token for GROUP fields
 * @type {!OpaqueTypeToken<string>}
 */
exports.GROUP = newOpaqueTypeToken('GROUP');
/**
 * Type token for BOOLEAN fields
 * @type {!OpaqueTypeToken<string>}
 */
exports.BOOLEAN = newOpaqueTypeToken('BOOLEAN');
/**
 * Type token for STRING fields
 * @type {!OpaqueTypeToken<string>}
 */
exports.STRING = newOpaqueTypeToken('STRING');
/**
 * Type token for INT32 fields
 * @type {!OpaqueTypeToken<string>}
 */
exports.INT32 = newOpaqueTypeToken('INT32');
/**
 * Type token for UINT32 fields
 * @type {!OpaqueTypeToken<string>}
 */
exports.UINT32 = newOpaqueTypeToken('UINT32');
/**
 * Type token for SINT32 fields
 * @type {!OpaqueTypeToken<string>}
 */
exports.SINT32 = newOpaqueTypeToken('SINT32');
/**
 * Type token for FIXED32 fields
 * @type {!OpaqueTypeToken<string>}
 */
exports.FIXED32 = newOpaqueTypeToken('FIXED32');
/**
 * Type token for SFIXED32 fields
 * @type {!OpaqueTypeToken<string>}
 */
exports.SFIXED32 = newOpaqueTypeToken('SFIXED32');
/**
 * Type token for INT64 fields
 * @type {!OpaqueTypeToken<string>}
 */
exports.INT64 = newOpaqueTypeToken('INT64');
/**
 * Type token for UINT64 fields
 * @type {!OpaqueTypeToken<string>}
 */
exports.UINT64 = newOpaqueTypeToken('UINT64');
/**
 * Type token for SINT64 fields
 * @type {!OpaqueTypeToken<string>}
 */
exports.SINT64 = newOpaqueTypeToken('SINT64');
/**
 * Type token for FIXED64 fields
 * @type {!OpaqueTypeToken<string>}
 */
exports.FIXED64 = newOpaqueTypeToken('FIXED64');
/**
 * Type token for SFIXED64 fields
 * @type {!OpaqueTypeToken<string>}
 */
exports.SFIXED64 = newOpaqueTypeToken('SFIXED64');
/**
 * Type token for FLOAT fields
 * @type {!OpaqueTypeToken<string>}
 */
exports.FLOAT = newOpaqueTypeToken('FLOAT');
/**
 * Type token for DOUBLE fields
 * @type {!OpaqueTypeToken<string>}
 */
exports.DOUBLE = newOpaqueTypeToken('DOUBLE');
/**
 * Type token for BYTES fields
 * @type {!OpaqueTypeToken<string>}
 */
exports.BYTES = newOpaqueTypeToken('BYTES');
/**
 * Type token for ENUM fields
 * @type {!OpaqueTypeToken<string>}
 */
exports.ENUM = newOpaqueTypeToken('ENUM');
