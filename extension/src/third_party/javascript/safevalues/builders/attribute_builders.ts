/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/javascript/safevalues/builders/attribute_builders.ts
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
goog.module('google3.third_party.javascript.safevalues.builders.attribute_builders');
var module = module || { id: 'third_party/javascript/safevalues/builders/attribute_builders.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_dev_1 = goog.requireType("google3.third_party.javascript.safevalues.environment.dev");
const tsickle_attribute_impl_2 = goog.requireType("google3.third_party.javascript.safevalues.internals.attribute_impl");
const tsickle_string_literal_3 = goog.requireType("google3.third_party.javascript.safevalues.internals.string_literal");
const tsickle_sensitive_attributes_4 = goog.requireType("google3.third_party.javascript.safevalues.builders.sensitive_attributes");
const dev_1 = goog.require('google3.third_party.javascript.safevalues.environment.dev');
const attribute_impl_1 = goog.require('google3.third_party.javascript.safevalues.internals.attribute_impl');
const string_literal_1 = goog.require('google3.third_party.javascript.safevalues.internals.string_literal');
const sensitive_attributes_1 = goog.require('google3.third_party.javascript.safevalues.builders.sensitive_attributes');
/**
 * Creates a SafeAttributePrefix object from a template literal with no
 * interpolations for attributes that share a common prefix guaranteed to be not
 * security sensitive.
 *
 * The template literal is a prefix that makes it obvious this attribute is not
 * security sensitive. If it doesn't, this function will throw.
 * @param {!TemplateStringsArray} templ
 * @return {!tsickle_attribute_impl_2.SafeAttributePrefix}
 */
function safeAttrPrefix(templ) {
    if (dev_1.DEV_MODE) {
        (0, string_literal_1.assertIsTemplateObject)(templ, 0);
    }
    /** @type {string} */
    const attrPrefix = templ[0].toLowerCase();
    if (dev_1.DEV_MODE) {
        if (attrPrefix.indexOf('on') === 0 || 'on'.indexOf(attrPrefix) === 0) {
            throw new Error(`Prefix '${templ[0]}' does not guarantee the attribute ` +
                `to be safe as it is also a prefix for event handler attributes` +
                `Please use 'addEventListener' to set event handlers.`);
        }
        sensitive_attributes_1.SECURITY_SENSITIVE_ATTRIBUTES.forEach((/**
         * @param {string} sensitiveAttr
         * @return {void}
         */
        (sensitiveAttr) => {
            if (sensitiveAttr.indexOf(attrPrefix) === 0) {
                throw new Error(`Prefix '${templ[0]}' does not guarantee the attribute ` +
                    `to be safe as it is also a prefix for ` +
                    `the security sensitive attribute '${sensitiveAttr}'. ` +
                    `Please use native or safe DOM APIs to set the attribute.`);
            }
        }));
    }
    return (0, attribute_impl_1.createAttributePrefixInternal)(attrPrefix);
}
exports.safeAttrPrefix = safeAttrPrefix;
