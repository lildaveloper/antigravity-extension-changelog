/**
 * @fileoverview Public declarations for JSPB descriptor types.
 * Generated from: javascript/apps/jspb/descriptor.ts
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
goog.module('google3.javascript.apps.jspb.descriptor');
var module = module || { id: 'javascript/apps/jspb/descriptor.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_internal_1 = goog.requireType("jspb.internal");
const tsickle_mutable_message_2 = goog.requireType("jspb.mutable_message");
const internal_1 = goog.require('jspb.internal');
/**
 * A reference to a message type.
 * @abstract
 * @template M, Name
 */
class DescriptorTypeReference {
    /**
     * @public
     * @param {!Object} internalArg
     */
    constructor(internalArg) {
        assertInternalArg(internalArg);
    }
}
exports.DescriptorTypeReference = DescriptorTypeReference;
/* istanbul ignore if */
if (false) {
    /**
     * @type {(undefined|Name)}
     * @protected
     */
    DescriptorTypeReference.prototype.internalTypeName;
    /**
     * @type {(undefined|M)}
     * @protected
     */
    DescriptorTypeReference.prototype.internalType;
    /**
     * @abstract
     * @public
     * @return {string}
     */
    DescriptorTypeReference.prototype.getTypeName = function () { };
}
/**
 * A reference to an enum type.
 * @abstract
 * @template E
 */
class EnumDescriptorTypeReference {
    /**
     * @public
     * @param {!Object} internalArg
     */
    constructor(internalArg) {
        assertInternalArg(internalArg);
    }
}
exports.EnumDescriptorTypeReference = EnumDescriptorTypeReference;
/* istanbul ignore if */
if (false) {
    /**
     * @type {(undefined|E)}
     * @protected
     */
    EnumDescriptorTypeReference.prototype.internalType;
    /**
     * @abstract
     * @public
     * @return {string}
     */
    EnumDescriptorTypeReference.prototype.getTypeName = function () { };
}
/** @typedef {!google3$javascript$apps$jspb$descriptor.DescriptorTypeReferenceProvider} */
exports.DescriptorTypeReferenceProvider;
/**
 * @param {!Object} internalArg
 * @return {void}
 */
function assertInternalArg(internalArg) {
    if (internalArg !== internal_1.DESCRIPTOR_TYPE_REFERENCE_INTERNAL_ARG) {
        throw goog.DEBUG
            ? new Error('do not construct your own descriptors')
            : new Error();
    }
}
