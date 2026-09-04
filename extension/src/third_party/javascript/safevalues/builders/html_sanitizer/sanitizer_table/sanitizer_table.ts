/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/javascript/safevalues/builders/html_sanitizer/sanitizer_table/sanitizer_table.ts
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
goog.module('google3.third_party.javascript.safevalues.builders.html_sanitizer.sanitizer_table.sanitizer_table');
var module = module || { id: 'third_party/javascript/safevalues/builders/html_sanitizer/sanitizer_table/sanitizer_table.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
/**
 * Class for holding element and attribute policies used for sanitization.
 */
class SanitizerTable {
    /**
     * @public
     * @param {!ReadonlySet<string>} allowedElements
     * @param {!ReadonlyMap<string, !ReadonlyMap<string, !AttributePolicy>>} elementPolicies
     * @param {!ReadonlySet<string>} allowedGlobalAttributes
     * @param {!ReadonlyMap<string, !AttributePolicy>} globalAttributePolicies
     * @param {(undefined|!ReadonlySet<string>)} globallyAllowedAttributePrefixes
     */
    constructor(allowedElements, elementPolicies, allowedGlobalAttributes, globalAttributePolicies, globallyAllowedAttributePrefixes) {
        this.allowedElements = allowedElements;
        this.elementPolicies = elementPolicies;
        this.allowedGlobalAttributes = allowedGlobalAttributes;
        this.globalAttributePolicies = globalAttributePolicies;
        this.globallyAllowedAttributePrefixes = globallyAllowedAttributePrefixes;
    }
    /**
     * @public
     * @param {string} elementName
     * @return {boolean}
     */
    isAllowedElement(elementName) {
        // Note: `HTMLFormElement`s are always dropped, supporting them is very
        // costly because of the DOM clobberring they can cause. The additional code
        // size required to properly work around DOM clobberring issues is large and
        // shouldn't be put on every user of the sanitizer. Thoroughly review
        // b/210975025 and the CLs linked there before you start allowing form
        // elements.
        return (elementName !== 'FORM' &&
            (this.allowedElements.has(elementName) ||
                this.elementPolicies.has(elementName)));
    }
    /**
     * @public
     * @param {string} attributeName
     * @param {string} elementName
     * @return {!AttributePolicy}
     */
    getAttributePolicy(attributeName, elementName) {
        /** @type {(undefined|!ReadonlyMap<string, !AttributePolicy>)} */
        const elementPolicy = this.elementPolicies.get(elementName);
        if (elementPolicy?.has(attributeName)) {
            return (/** @type {!AttributePolicy} */ (elementPolicy.get(attributeName)));
        }
        if (this.allowedGlobalAttributes.has(attributeName)) {
            return { policyAction: AttributePolicyAction.KEEP };
        }
        /** @type {(undefined|!AttributePolicy)} */
        const globalPolicy = this.globalAttributePolicies.get(attributeName);
        if (globalPolicy) {
            return globalPolicy;
        }
        if (this.globallyAllowedAttributePrefixes &&
            [...this.globallyAllowedAttributePrefixes].some((/**
             * @param {string} prefix
             * @return {boolean}
             */
            (prefix) => attributeName.indexOf(prefix) === 0))) {
            return { policyAction: AttributePolicyAction.KEEP };
        }
        return { policyAction: AttributePolicyAction.DROP };
    }
}
exports.SanitizerTable = SanitizerTable;
/* istanbul ignore if */
if (false) {
    /**
     * @const {!ReadonlySet<string>}
     * @public
     */
    SanitizerTable.prototype.allowedElements;
    /**
     * @const {!ReadonlyMap<string, !ReadonlyMap<string, !AttributePolicy>>}
     * @public
     */
    SanitizerTable.prototype.elementPolicies;
    /**
     * @const {!ReadonlySet<string>}
     * @public
     */
    SanitizerTable.prototype.allowedGlobalAttributes;
    /**
     * @const {!ReadonlyMap<string, !AttributePolicy>}
     * @public
     */
    SanitizerTable.prototype.globalAttributePolicies;
    /**
     * @const {(undefined|!ReadonlySet<string>)}
     * @public
     */
    SanitizerTable.prototype.globallyAllowedAttributePrefixes;
}
/**
 * Holds information on how to sanitize the attributes of a particular element.
 * An element with an ElementPolicy specified is implicitly kept in the output.
 * @typedef {!ReadonlyMap<string, !AttributePolicy>}
 */
exports.ElementPolicy;
/**
 * Values derived from
 * https://godoc.corp.google.com/pkg/google3/third_party/safehtml/sanitizer/policy#AttributePolicy
 * @enum {number}
 */
const AttributePolicyAction = {
    DROP: 0,
    KEEP: 1,
    KEEP_AND_SANITIZE_URL: 2,
    KEEP_AND_NORMALIZE: 3,
    // This action is currently equivalent to KEEP as there is no style sanitizer.
    KEEP_AND_SANITIZE_STYLE: 4,
    KEEP_AND_USE_RESOURCE_URL_POLICY: 5,
    KEEP_AND_USE_RESOURCE_URL_POLICY_FOR_SRCSET: 6,
    KEEP_AND_USE_NAVIGATION_URL_POLICY: 7,
};
exports.AttributePolicyAction = AttributePolicyAction;
AttributePolicyAction[AttributePolicyAction.DROP] = 'DROP';
AttributePolicyAction[AttributePolicyAction.KEEP] = 'KEEP';
AttributePolicyAction[AttributePolicyAction.KEEP_AND_SANITIZE_URL] = 'KEEP_AND_SANITIZE_URL';
AttributePolicyAction[AttributePolicyAction.KEEP_AND_NORMALIZE] = 'KEEP_AND_NORMALIZE';
AttributePolicyAction[AttributePolicyAction.KEEP_AND_SANITIZE_STYLE] = 'KEEP_AND_SANITIZE_STYLE';
AttributePolicyAction[AttributePolicyAction.KEEP_AND_USE_RESOURCE_URL_POLICY] = 'KEEP_AND_USE_RESOURCE_URL_POLICY';
AttributePolicyAction[AttributePolicyAction.KEEP_AND_USE_RESOURCE_URL_POLICY_FOR_SRCSET] = 'KEEP_AND_USE_RESOURCE_URL_POLICY_FOR_SRCSET';
AttributePolicyAction[AttributePolicyAction.KEEP_AND_USE_NAVIGATION_URL_POLICY] = 'KEEP_AND_USE_NAVIGATION_URL_POLICY';
/**
 * Holds information on how to sanitize the values of a particular attribute.
 * @record
 */
function AttributePolicy() { }
exports.AttributePolicy = AttributePolicy;
/* istanbul ignore if */
if (false) {
    /**
     * @const {!AttributePolicyAction}
     * @public
     */
    AttributePolicy.prototype.policyAction;
    /**
     * @const {(undefined|!ReadonlyMap<string, !Set<string>>)}
     * @public
     */
    AttributePolicy.prototype.conditions;
}
// From the spec:
// https://html.spec.whatwg.org/multipage/custom-elements.html#prod-potentialcustomelementname:~:text=name%20must%20not%20be%20any%20of%20the%20following%3A
/** @type {!Set<string>} */
const FORBIDDEN_CUSTOM_ELEMENT_NAMES = new Set([
    'ANNOTATION-XML',
    'COLOR-PROFILE',
    'FONT-FACE',
    'FONT-FACE-SRC',
    'FONT-FACE-URI',
    'FONT-FACE-FORMAT',
    'FONT-FACE-NAME',
    'MISSING-GLYPH',
]);
/**
 * Helper for checking if an element tag is a custom element.
 * @param {string} tag
 * @return {boolean}
 */
function isCustomElement(tag) {
    return (!FORBIDDEN_CUSTOM_ELEMENT_NAMES.has(tag.toUpperCase()) &&
        /^[a-z][-_.a-z0-9]*-[-_.a-z0-9]*$/i.test(tag));
}
exports.isCustomElement = isCustomElement;
