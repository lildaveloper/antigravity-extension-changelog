/**
 * @fileoverview Internal declaration of the opaque type table type.
 * Generated from: javascript/apps/jspb/opaque_type_table_internal.ts
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
goog.module('google3.javascript.apps.jspb.opaque_type_table_internal');
var module = module || { id: 'javascript/apps/jspb/opaque_type_table_internal.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_immutable_message_1 = goog.requireType("jspb.immutable_message");
const tsickle_mutable_message_2 = goog.requireType("jspb.mutable_message");
/**
 * An opaque type table for special serializers, such as for the URL format.
 *
 * Do not attempt to inspect this value. It should be only passed to APIs owned
 * by go/jspb.
 * @abstract
 * @template MutableMessageType, ImmutableMessageType
 */
class OpaqueTypeTable {
    /**
     * @public
     */
    constructor() {
        throw new Error();
    }
}
exports.OpaqueTypeTable = OpaqueTypeTable;
/* istanbul ignore if */
if (false) {
    /**
     * @type {MutableMessageType}
     * @protected
     */
    OpaqueTypeTable.prototype.propertyToEnsureTypeArgumentIsNotIgnored;
    /**
     * @type {ImmutableMessageType}
     * @protected
     */
    OpaqueTypeTable.prototype.propertyToEnsureImmutableTypeArgumentIsNotIgnored;
}
if (goog.DEBUG) {
    Object.defineProperties(OpaqueTypeTable.prototype, {
        [Symbol.hasInstance]: {
            /**
             * @public
             * @return {?}
             */
            get() {
                throw new Error('OpaqueTypeTable is not a type. Use isOpaqueTypeTable to check if a value is an OpaqueTypeTable.');
            },
            enumerable: false,
            configurable: false,
        },
    });
}
