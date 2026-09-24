/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/javascript/safevalues/builders/html_sanitizer/html_sanitizer_builder.ts
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
goog.module('google3.third_party.javascript.safevalues.builders.html_sanitizer.html_sanitizer_builder');
var module = module || { id: 'third_party/javascript/safevalues/builders/html_sanitizer/html_sanitizer_builder.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_secrets_1 = goog.requireType("google3.third_party.javascript.safevalues.internals.secrets");
const tsickle_allowlists_2 = goog.requireType("google3.third_party.javascript.safevalues.builders.html_sanitizer.css.allowlists");
const tsickle_sanitizer_3 = goog.requireType("google3.third_party.javascript.safevalues.builders.html_sanitizer.css.sanitizer");
const tsickle_html_sanitizer_4 = goog.requireType("google3.third_party.javascript.safevalues.builders.html_sanitizer.html_sanitizer");
const tsickle_url_policy_5 = goog.requireType("google3.third_party.javascript.safevalues.builders.html_sanitizer.url_policy");
const tsickle_default_sanitizer_table_6 = goog.requireType("google3.third_party.javascript.safevalues.builders.html_sanitizer.sanitizer_table.default_sanitizer_table");
const tsickle_sanitizer_table_7 = goog.requireType("google3.third_party.javascript.safevalues.builders.html_sanitizer.sanitizer_table.sanitizer_table");
const secrets_1 = goog.require('google3.third_party.javascript.safevalues.internals.secrets');
const allowlists_1 = goog.require('google3.third_party.javascript.safevalues.builders.html_sanitizer.css.allowlists');
const sanitizer_1 = goog.require('google3.third_party.javascript.safevalues.builders.html_sanitizer.css.sanitizer');
const html_sanitizer_1 = goog.require('google3.third_party.javascript.safevalues.builders.html_sanitizer.html_sanitizer');
const default_sanitizer_table_1 = goog.require('google3.third_party.javascript.safevalues.builders.html_sanitizer.sanitizer_table.default_sanitizer_table');
const sanitizer_table_1 = goog.require('google3.third_party.javascript.safevalues.builders.html_sanitizer.sanitizer_table.sanitizer_table');
/**
 * The base class for all sanitizer builders.
 * @abstract
 * @template T
 */
class BaseSanitizerBuilder {
    // For controlling 1-click exfiltrations.
    /**
     * @public
     */
    constructor() {
        // To denote if the builder has called build() and therefore should make no
        // further changes to the sanitizer table.
        this.calledBuild = false;
        this.sanitizerTable = default_sanitizer_table_1.DEFAULT_SANITIZER_TABLE;
    }
    /**
     * Builder option to restrict allowed elements to a smaller subset.
     * @public
     * @template THIS
     * @this {THIS}
     * @param {!ReadonlySet<string>} elementSet
     * @return {THIS}
     */
    onlyAllowElements(elementSet) {
        /** @type {!Set<string>} */
        const allowedElements = new Set();
        /** @type {!Map<string, !ReadonlyMap<string, !tsickle_sanitizer_table_7.AttributePolicy>>} */
        const allowedElementPolicies = new Map();
        for (let element of elementSet) {
            element = element.toUpperCase();
            if (!(/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable.isAllowedElement(element)) {
                throw new Error(`Element: ${element}, is not allowed by html5_contract.textpb`);
            }
            /** @type {(undefined|!ReadonlyMap<string, !tsickle_sanitizer_table_7.AttributePolicy>)} */
            const elementPolicy = (/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable.elementPolicies.get(element);
            if (elementPolicy !== undefined) {
                allowedElementPolicies.set(element, elementPolicy);
            }
            else {
                allowedElements.add(element);
            }
        }
        (/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable = new sanitizer_table_1.SanitizerTable(allowedElements, allowedElementPolicies, (/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable.allowedGlobalAttributes, (/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable.globalAttributePolicies, (/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable.globallyAllowedAttributePrefixes);
        return (/** @type {!BaseSanitizerBuilder} */ (this));
    }
    /**
     * Builder option to allow a set of custom elements. Must be called either
     * without or after `onlyAllowElements` - will be overwritten otherwise.
     * Custom elements must contain a dash.
     * @public
     * @template THIS
     * @this {THIS}
     * @param {string} element
     * @param {(undefined|!ReadonlySet<string>)=} allowedAttributes
     * @return {THIS}
     */
    allowCustomElement(element, allowedAttributes) {
        /** @type {!Set<string>} */
        const allowedElements = new Set((/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable.allowedElements);
        /** @type {!Map<string, !ReadonlyMap<string, !tsickle_sanitizer_table_7.AttributePolicy>>} */
        const allowedElementPolicies = new Map((/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable.elementPolicies);
        element = element.toUpperCase();
        if (!(0, sanitizer_table_1.isCustomElement)(element)) {
            throw new Error(`Element: ${element} is not a custom element`);
        }
        if (allowedAttributes) {
            /** @type {!Map<string, !tsickle_sanitizer_table_7.AttributePolicy>} */
            const elementPolicy = new Map();
            for (const attribute of allowedAttributes) {
                elementPolicy.set(attribute.toLowerCase(), {
                    policyAction: sanitizer_table_1.AttributePolicyAction.KEEP,
                });
            }
            allowedElementPolicies.set(element, elementPolicy);
        }
        else {
            allowedElements.add(element);
        }
        (/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable = new sanitizer_table_1.SanitizerTable(allowedElements, allowedElementPolicies, (/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable.allowedGlobalAttributes, (/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable.globalAttributePolicies, (/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable.globallyAllowedAttributePrefixes);
        return (/** @type {!BaseSanitizerBuilder} */ (this));
    }
    /**
     * Builder option to restrict allowed attributes to a smaller subset.
     *
     * If the attribute isn't currently allowed then it won't be added.
     * @public
     * @template THIS
     * @this {THIS}
     * @param {!ReadonlySet<string>} attributeSet
     * @return {THIS}
     */
    onlyAllowAttributes(attributeSet) {
        /** @type {!Set<string>} */
        const allowedGlobalAttributes = new Set();
        /** @type {!Map<string, !tsickle_sanitizer_table_7.AttributePolicy>} */
        const globalAttributePolicies = new Map();
        /** @type {!Map<string, !ReadonlyMap<string, !tsickle_sanitizer_table_7.AttributePolicy>>} */
        const elementPolicies = new Map();
        for (const attribute of attributeSet) {
            if ((/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable.allowedGlobalAttributes.has(attribute)) {
                allowedGlobalAttributes.add(attribute);
            }
            if ((/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable.globalAttributePolicies.has(attribute)) {
                globalAttributePolicies.set(attribute, (/** @type {!tsickle_sanitizer_table_7.AttributePolicy} */ ((/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable.globalAttributePolicies.get(attribute))));
            }
        }
        for (const [elementName__tsickle_destructured_1, originalElementPolicy__tsickle_destructured_2] of (/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable.elementPolicies.entries()) {
            const elementName = /** @type {string} */ (elementName__tsickle_destructured_1);
            const originalElementPolicy = /** @type {!ReadonlyMap<string, !tsickle_sanitizer_table_7.AttributePolicy>} */ (originalElementPolicy__tsickle_destructured_2);
            /** @type {!Map<string, !tsickle_sanitizer_table_7.AttributePolicy>} */
            const newElementPolicy = new Map();
            for (const [attribute__tsickle_destructured_3, attributePolicy__tsickle_destructured_4] of originalElementPolicy.entries()) {
                const attribute = /** @type {string} */ (attribute__tsickle_destructured_3);
                const attributePolicy = /** @type {!tsickle_sanitizer_table_7.AttributePolicy} */ (attributePolicy__tsickle_destructured_4);
                if (attributeSet.has(attribute)) {
                    newElementPolicy.set(attribute, attributePolicy);
                }
            }
            elementPolicies.set(elementName, newElementPolicy);
        }
        (/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable = new sanitizer_table_1.SanitizerTable((/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable.allowedElements, elementPolicies, allowedGlobalAttributes, globalAttributePolicies, (/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable.globallyAllowedAttributePrefixes);
        return (/** @type {!BaseSanitizerBuilder} */ (this));
    }
    /**
     * Allows all or a definite set of data attributes passed.
     *
     * When called without arguments, all data attributes are allowed.
     * When a set of attributes is passed, its values must be prefixed with "data-"
     *
     * If called with onlyAllowElements or onlyAllowAttributes, those methods must
     * be called first.
     * @public
     * @template THIS
     * @this {THIS}
     * @param {(undefined|!Array<string>)=} attributes
     * @return {THIS}
     */
    allowDataAttributes(attributes) {
        if (attributes === undefined) {
            /** @type {!Set<string>} */
            const globallyAllowedAttributePrefixes = new Set((/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable.globallyAllowedAttributePrefixes);
            globallyAllowedAttributePrefixes.add('data-');
            (/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable = new sanitizer_table_1.SanitizerTable((/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable.allowedElements, (/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable.elementPolicies, (/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable.allowedGlobalAttributes, (/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable.globalAttributePolicies, globallyAllowedAttributePrefixes);
            return (/** @type {!BaseSanitizerBuilder} */ (this));
        }
        /** @type {!Set<string>} */
        const allowedGlobalAttributes = new Set((/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable.allowedGlobalAttributes);
        for (const attribute of attributes) {
            if (attribute.indexOf('data-') !== 0) {
                throw new Error(`data attribute: ${attribute} does not begin with the prefix "data-"`);
            }
            allowedGlobalAttributes.add(attribute);
        }
        (/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable = new sanitizer_table_1.SanitizerTable((/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable.allowedElements, (/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable.elementPolicies, allowedGlobalAttributes, (/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable.globalAttributePolicies, (/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable.globallyAllowedAttributePrefixes);
        return (/** @type {!BaseSanitizerBuilder} */ (this));
    }
    /**
     * Preserves style attributes. Note that the sanitizer won't parse and
     * sanitize the values but keep them as they are. In particular this means
     * that the code will be able to call functions that could do undesirable
     * things (e.g. `url` to trigger a network request), as well as any custom
     * properties or functions defined by the application.
     * @public
     * @template THIS
     * @this {THIS}
     * @return {THIS}
     */
    allowStyleAttributes() {
        /** @type {!Map<string, !tsickle_sanitizer_table_7.AttributePolicy>} */
        const globalAttributePolicies = new Map((/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable.globalAttributePolicies);
        globalAttributePolicies.set('style', {
            policyAction: sanitizer_table_1.AttributePolicyAction.KEEP_AND_SANITIZE_STYLE,
        });
        (/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable = new sanitizer_table_1.SanitizerTable((/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable.allowedElements, (/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable.elementPolicies, (/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable.allowedGlobalAttributes, globalAttributePolicies, (/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable.globallyAllowedAttributePrefixes);
        return (/** @type {!BaseSanitizerBuilder} */ (this));
    }
    /**
     * Preserves the class attribute on all elements. This means contents can
     * adopt CSS styles from other page elements and possibly mask themselves as
     * legitimate UI elements, which can lead to phishing.
     * @public
     * @template THIS
     * @this {THIS}
     * @return {THIS}
     */
    allowClassAttributes() {
        /** @type {!Set<string>} */
        const allowedGlobalAttributes = new Set((/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable.allowedGlobalAttributes);
        allowedGlobalAttributes.add('class');
        (/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable = new sanitizer_table_1.SanitizerTable((/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable.allowedElements, (/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable.elementPolicies, allowedGlobalAttributes, (/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable.globalAttributePolicies, (/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable.globallyAllowedAttributePrefixes);
        return (/** @type {!BaseSanitizerBuilder} */ (this));
    }
    /**
     * Preserves id attributes. This carries moderate risk as it allows an
     * element to override other elements with the same ID.
     * @public
     * @template THIS
     * @this {THIS}
     * @return {THIS}
     */
    allowIdAttributes() {
        /** @type {!Set<string>} */
        const allowedGlobalAttributes = new Set((/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable.allowedGlobalAttributes);
        allowedGlobalAttributes.add('id');
        (/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable = new sanitizer_table_1.SanitizerTable((/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable.allowedElements, (/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable.elementPolicies, allowedGlobalAttributes, (/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable.globalAttributePolicies, (/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable.globallyAllowedAttributePrefixes);
        return (/** @type {!BaseSanitizerBuilder} */ (this));
    }
    /**
     * Preserves (some) attributes that reference existing ids. This carries a
     * moderate security risk, because sanitized content can create semantic
     * associations with existing elements in the page, regardless of the layout.
     * This could be used to override the label associated with a form input by a
     * screen reader, and facilitate phishing.
     * @public
     * @template THIS
     * @this {THIS}
     * @return {THIS}
     */
    allowIdReferenceAttributes() {
        /** @type {!Set<string>} */
        const allowedGlobalAttributes = new Set((/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable.allowedGlobalAttributes);
        // TODO(b/190693339): Generate this subtable from the contract.  // LINE-INTERNAL
        allowedGlobalAttributes
            .add('aria-activedescendant')
            .add('aria-controls')
            .add('aria-labelledby')
            .add('aria-owns')
            .add('for')
            .add('list');
        (/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable = new sanitizer_table_1.SanitizerTable((/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable.allowedElements, (/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable.elementPolicies, allowedGlobalAttributes, (/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable.globalAttributePolicies, (/** @type {!BaseSanitizerBuilder} */ (this)).sanitizerTable.globallyAllowedAttributePrefixes);
        return (/** @type {!BaseSanitizerBuilder} */ (this));
    }
    /**
     * Sets the UrlPolicy to be used for resource URLs by the sanitizer.
     *
     * The resource UrlPolicy can be used to decide whether a given URL is allowed
     * to be loaded as an external resource. It is a function that an instance
     * of `URL` and a set of hints giving a context on why an image was loaded.
     *
     * The policy can return `null` to indicate that the resource should be
     * dropped, otherwise it should return a valid `URL` that will be used to
     * replace the original URL in the sanitized output.
     *
     * For example the following policy drops all images loaded from
     * `https://forbidden.google.com` but allows all other images.
     *
     * ```typescript
     * const resourceUrlPolicy: UrlPolicy = (url) => {
     *   if (url.origin === 'https://forbidden.google.com') {
     *     return null;
     *   }
     *   return url;
     * };
     * ```
     *
     * You can also use the `UrlPolicyHints` to make the policy more
     * informed. For example the following policy only allows images loaded
     * via an <img src> element but drops all other images.
     *
     * ```typescript
     * const resourceUrlPolicy: UrlPolicy = (url, hints) => {
     *   if (hints.type === UrlPolicyHintsType.HTML_ATTRIBUTE &&
     *       hints.attributeName === 'src' &&
     *       hints.elementName === 'IMG') {
     *     return url;
     *   }
     *   return null;
     * };
     * ```
     * @public
     * @template THIS
     * @this {THIS}
     * @param {function(!URL, (!HtmlAttributeUrlPolicyHints|!StyleElementOrAttributeUrlPolicyHints)): (null|!URL)} resourceUrlPolicy
     * @return {THIS}
     */
    withResourceUrlPolicy(resourceUrlPolicy) {
        (/** @type {!BaseSanitizerBuilder} */ (this)).resourceUrlPolicy = resourceUrlPolicy;
        return (/** @type {!BaseSanitizerBuilder} */ (this));
    }
    /**
     * Sets the UrlPolicy to be used for navigation URLs by the sanitizer.
     *
     * The navigation UrlPolicy can be used to decide whether a given URL is
     * allowed to be used for navigation. It is a function that takes an instance
     * of `URL` and a set of hints giving a context on where this URL is used.
     *
     * The policy can return `null` to indicate that the attribute should be
     * dropped, otherwise it should return a valid `URL` that will be used to
     * replace the original URL in the sanitized output. URLs are always sanitized
     * after the policy is applied.
     *
     * For example the following policy only allows navigations to
     * `https://allowed.google.com`.
     *
     * ```typescript
     * const navigationUrlPolicy: UrlPolicy = (url) => {
     *   if (url.origin === 'https://allowed.google.com') {
     *     return url;
     *   }
     *   return null;
     * };
     * ```
     *
     * You can also use the `UrlPolicyHints` to make the policy more
     * informed. For example the following policy only allows navigations from an
     * anchor tag but drops all other navigations.
     *
     * ```typescript
     * const navigationUrlPolicy: UrlPolicy = (url, hints) => {
     *   if (hints.type === UrlPolicyHintsType.HTML_ATTRIBUTE &&
     *       hints.attributeName === 'href' &&
     *       hints.elementName === 'A') {
     *     return url;
     *   }
     *   return null;
     * };
     * ```
     * @public
     * @template THIS
     * @this {THIS}
     * @param {function(!URL, (!HtmlAttributeUrlPolicyHints|!StyleElementOrAttributeUrlPolicyHints)): (null|!URL)} navigationUrlPolicy
     * @return {THIS}
     */
    withNavigationUrlPolicy(navigationUrlPolicy) {
        (/** @type {!BaseSanitizerBuilder} */ (this)).navigationUrlPolicy = navigationUrlPolicy;
        return (/** @type {!BaseSanitizerBuilder} */ (this));
    }
}
exports.BaseSanitizerBuilder = BaseSanitizerBuilder;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!tsickle_sanitizer_table_7.SanitizerTable}
     * @protected
     */
    BaseSanitizerBuilder.prototype.sanitizerTable;
    /**
     * @type {boolean}
     * @protected
     */
    BaseSanitizerBuilder.prototype.calledBuild;
    /**
     * @type {(undefined|function(!URL, (!HtmlAttributeUrlPolicyHints|!StyleElementOrAttributeUrlPolicyHints)): (null|!URL))}
     * @protected
     */
    BaseSanitizerBuilder.prototype.resourceUrlPolicy;
    /**
     * @type {(undefined|function(!URL, (!HtmlAttributeUrlPolicyHints|!StyleElementOrAttributeUrlPolicyHints)): (null|!URL))}
     * @protected
     */
    BaseSanitizerBuilder.prototype.navigationUrlPolicy;
    /**
     * @abstract
     * @public
     * @return {T}
     */
    BaseSanitizerBuilder.prototype.build = function () { };
}
/**
 * This class allows modifications to the default sanitizer configuration.
 * It builds an instance of `HtmlSanitizer`.
 * @extends {BaseSanitizerBuilder<!tsickle_html_sanitizer_4.HtmlSanitizer>}
 */
class HtmlSanitizerBuilder extends BaseSanitizerBuilder {
    /**
     * @public
     * @return {!tsickle_html_sanitizer_4.HtmlSanitizer}
     */
    build() {
        if (this.calledBuild) {
            throw new Error('this sanitizer has already called build');
        }
        this.calledBuild = true;
        return new html_sanitizer_1.HtmlSanitizerImpl(this.sanitizerTable, secrets_1.secretToken, 
        /* styleElementSanitizer= */ undefined, 
        /* styleAttributeSanitizer= */ undefined, this.resourceUrlPolicy, this.navigationUrlPolicy);
    }
}
exports.HtmlSanitizerBuilder = HtmlSanitizerBuilder;
/**
 * This class allows modifications to the default sanitizer configuration.
 * It builds an instance of `CssSanitizer`.
 * @extends {BaseSanitizerBuilder<!tsickle_html_sanitizer_4.CssSanitizer>}
 */
class CssSanitizerBuilder extends BaseSanitizerBuilder {
    constructor() {
        super(...arguments);
        this.animationsAllowed = false;
        this.transitionsAllowed = false;
        this.openShadow = false;
    }
    /**
     * @public
     * @template THIS
     * @this {THIS}
     * @return {THIS}
     */
    allowAnimations() {
        (/** @type {!CssSanitizerBuilder} */ (this)).animationsAllowed = true;
        return (/** @type {!CssSanitizerBuilder} */ (this));
    }
    /**
     * @public
     * @template THIS
     * @this {THIS}
     * @return {THIS}
     */
    allowTransitions() {
        (/** @type {!CssSanitizerBuilder} */ (this)).transitionsAllowed = true;
        return (/** @type {!CssSanitizerBuilder} */ (this));
    }
    /**
     * Sets the shadow DOM mode to 'open'.
     *
     * While this method is not formally restricted, it can potentially be used to
     * bypass the security guarantees of the CSS sanitizer. If you need open
     * shadow DOM, please contact ise-web-members\@ to discuss your use case.
     * @public
     * @template THIS
     * @this {THIS}
     * @return {THIS}
     */
    withOpenShadow() {
        (/** @type {!CssSanitizerBuilder} */ (this)).openShadow = true;
        return (/** @type {!CssSanitizerBuilder} */ (this));
    }
    /**
     * Builds a CSS sanitizer.
     *
     * Note that this function always adds `style`, `id`, `name` and `class`
     * attributes to the allowlist as well as the `STYLE` element.
     * @public
     * @return {!tsickle_html_sanitizer_4.CssSanitizer}
     */
    build() {
        this.extendSanitizerTableForCss();
        /** @type {!Array<function(string): boolean>} */
        const propertyDiscarders = [];
        if (!this.animationsAllowed) {
            propertyDiscarders.push((/**
             * @param {string} property
             * @return {boolean}
             */
            (property) => /^(animation|offset)(-|$)/.test(property)));
        }
        if (!this.transitionsAllowed) {
            propertyDiscarders.push((/**
             * @param {string} property
             * @return {boolean}
             */
            (property) => /^transition(-|$)/.test(property)));
        }
        /** @type {function(string): string} */
        const styleElementSanitizer = (/**
         * @param {string} cssText
         * @return {string}
         */
        (cssText) => (0, sanitizer_1.sanitizeStyleElement)(cssText, allowlists_1.CSS_PROPERTY_ALLOWLIST, allowlists_1.CSS_FUNCTION_ALLOWLIST, this.resourceUrlPolicy, this.animationsAllowed, propertyDiscarders));
        /** @type {function(string): string} */
        const styleAttributeSanitizer = (/**
         * @param {string} cssText
         * @return {string}
         */
        (cssText) => (0, sanitizer_1.sanitizeStyleAttribute)(cssText, allowlists_1.CSS_PROPERTY_ALLOWLIST, allowlists_1.CSS_FUNCTION_ALLOWLIST, this.resourceUrlPolicy, propertyDiscarders));
        return new html_sanitizer_1.HtmlSanitizerImpl(this.sanitizerTable, secrets_1.secretToken, styleElementSanitizer, styleAttributeSanitizer, this.resourceUrlPolicy, this.navigationUrlPolicy, this.openShadow);
    }
    /**
     * @private
     * @return {void}
     */
    extendSanitizerTableForCss() {
        /** @type {!Set<string>} */
        const allowedElements = new Set(this.sanitizerTable.allowedElements);
        /** @type {!Set<string>} */
        const allowedGlobalAttributes = new Set(this.sanitizerTable.allowedGlobalAttributes);
        /** @type {!Map<string, !tsickle_sanitizer_table_7.AttributePolicy>} */
        const globalAttributePolicies = new Map(this.sanitizerTable.globalAttributePolicies);
        allowedElements.add('STYLE');
        globalAttributePolicies.set('style', {
            policyAction: sanitizer_table_1.AttributePolicyAction.KEEP_AND_SANITIZE_STYLE,
        });
        allowedGlobalAttributes.add('id');
        allowedGlobalAttributes.add('name');
        allowedGlobalAttributes.add('class');
        this.sanitizerTable = new sanitizer_table_1.SanitizerTable(allowedElements, this.sanitizerTable.elementPolicies, allowedGlobalAttributes, globalAttributePolicies, this.sanitizerTable.globallyAllowedAttributePrefixes);
    }
}
exports.CssSanitizerBuilder = CssSanitizerBuilder;
/* istanbul ignore if */
if (false) {
    /**
     * @type {boolean}
     * @private
     */
    CssSanitizerBuilder.prototype.animationsAllowed;
    /**
     * @type {boolean}
     * @private
     */
    CssSanitizerBuilder.prototype.transitionsAllowed;
    /**
     * @type {boolean}
     * @private
     */
    CssSanitizerBuilder.prototype.openShadow;
}
