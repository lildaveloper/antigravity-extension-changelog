/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/javascript/safevalues/builders/html_sanitizer/html_sanitizer.ts
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
goog.module('google3.third_party.javascript.safevalues.builders.html_sanitizer.html_sanitizer');
var module = module || { id: 'third_party/javascript/safevalues/builders/html_sanitizer/html_sanitizer.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_dev_1 = goog.requireType("google3.third_party.javascript.safevalues.environment.dev");
const tsickle_html_impl_2 = goog.requireType("google3.third_party.javascript.safevalues.internals.html_impl");
const tsickle_pure_3 = goog.requireType("google3.third_party.javascript.safevalues.internals.pure");
const tsickle_secrets_4 = goog.requireType("google3.third_party.javascript.safevalues.internals.secrets");
const tsickle_html_builders_5 = goog.requireType("google3.third_party.javascript.safevalues.builders.html_builders");
const tsickle_url_builders_6 = goog.requireType("google3.third_party.javascript.safevalues.builders.url_builders");
const tsickle_css_isolation_7 = goog.requireType("google3.third_party.javascript.safevalues.builders.html_sanitizer.css.css_isolation");
const tsickle_inert_fragment_8 = goog.requireType("google3.third_party.javascript.safevalues.builders.html_sanitizer.inert_fragment");
const tsickle_no_clobber_9 = goog.requireType("google3.third_party.javascript.safevalues.builders.html_sanitizer.no_clobber");
const tsickle_default_sanitizer_table_10 = goog.requireType("google3.third_party.javascript.safevalues.builders.html_sanitizer.sanitizer_table.default_sanitizer_table");
const tsickle_sanitizer_table_11 = goog.requireType("google3.third_party.javascript.safevalues.builders.html_sanitizer.sanitizer_table.sanitizer_table");
const tsickle_url_policy_12 = goog.requireType("google3.third_party.javascript.safevalues.builders.html_sanitizer.url_policy");
const dev_1 = goog.require('google3.third_party.javascript.safevalues.environment.dev');
const pure_1 = goog.require('google3.third_party.javascript.safevalues.internals.pure');
const secrets_1 = goog.require('google3.third_party.javascript.safevalues.internals.secrets');
const html_builders_1 = goog.require('google3.third_party.javascript.safevalues.builders.html_builders');
const url_builders_1 = goog.require('google3.third_party.javascript.safevalues.builders.url_builders');
const css_isolation_1 = goog.require('google3.third_party.javascript.safevalues.builders.html_sanitizer.css.css_isolation');
const inert_fragment_1 = goog.require('google3.third_party.javascript.safevalues.builders.html_sanitizer.inert_fragment');
const no_clobber_1 = goog.require('google3.third_party.javascript.safevalues.builders.html_sanitizer.no_clobber');
const default_sanitizer_table_1 = goog.require('google3.third_party.javascript.safevalues.builders.html_sanitizer.sanitizer_table.default_sanitizer_table');
const sanitizer_table_1 = goog.require('google3.third_party.javascript.safevalues.builders.html_sanitizer.sanitizer_table.sanitizer_table');
const url_policy_1 = goog.require('google3.third_party.javascript.safevalues.builders.html_sanitizer.url_policy');
// BEGIN-INTERNAL
const default_sanitizer_table_2 = default_sanitizer_table_1;
/**
 * An HTML5-compliant markup sanitizer that produces SafeHtml markup.
 *
 * You can build sanitizers with a custom configuration using the
 * HtmlSanitizerBuilder. // BEGIN-INTERNAL
 *
 * For any questions: go/safehtml-yaqs
 * Design document: go/ts-safehtml-sanitizer // END-INTERNAL
 * @record
 */
function HtmlSanitizer() { }
exports.HtmlSanitizer = HtmlSanitizer;
/* istanbul ignore if */
if (false) {
    /**
     * @public
     * @param {string} html
     * @return {!tsickle_html_impl_2.SafeHtml}
     */
    HtmlSanitizer.prototype.sanitize = function (html) { };
    /**
     * @public
     * @param {string} html
     * @return {!DocumentFragment}
     */
    HtmlSanitizer.prototype.sanitizeToFragment = function (html) { };
    /**
     * @public
     * @param {string} html
     * @return {!tsickle_html_impl_2.SafeHtml}
     */
    HtmlSanitizer.prototype.sanitizeAssertUnchanged = function (html) { };
}
/**
 * CSS Sanitizer that returns a DocumentFragment with sanitized content.
 *
 * The reason why this is not part of the HtmlSanitizer is to avoid a potential
 * misuse of the CSS Sanitizer that would break its security guarantees.
 *
 * The CSS Sanitizer uses Shadow DOM to isolate the sanitized content from the
 * rest of the page. It provides an encapsulation layer for stylesheets and
 * ensures that there are no clashes between ids or class names.
 *
 * If the CSS Sanitizer was part of the HtmlSanitizer, it would be possible
 * to call `sanitize` with a string that contains both HTML and CSS, which
 * wouldn't be nested inside a shadow DOM.
 *
 * So to avoid this potential pitfall, the CSS Sanitizer is separated out into
 * its own interface.
 * @record
 */
function CssSanitizer() { }
exports.CssSanitizer = CssSanitizer;
/* istanbul ignore if */
if (false) {
    /**
     * @public
     * @param {string} htmlWithCss
     * @return {!DocumentFragment}
     */
    CssSanitizer.prototype.sanitizeToFragment = function (htmlWithCss) { };
}
/**
 * A function that sanitizes a CSS string.
 * @typedef {function(string): string}
 */
exports.CssSanitizationFn;
/**
 * Implementation for `HtmlSanitizer`
 * @implements {HtmlSanitizer}
 * @implements {CssSanitizer}
 */
class HtmlSanitizerImpl {
    /**
     * @public
     * @param {!tsickle_sanitizer_table_11.SanitizerTable} sanitizerTable
     * @param {!Object} token
     * @param {(undefined|function(string): string)=} styleElementSanitizer
     * @param {(undefined|function(string): string)=} styleAttributeSanitizer
     * @param {(undefined|function(!URL, (!StyleElementOrAttributeUrlPolicyHints|!HtmlAttributeUrlPolicyHints)): (null|!URL))=} resourceUrlPolicy
     * @param {(undefined|function(!URL, (!StyleElementOrAttributeUrlPolicyHints|!HtmlAttributeUrlPolicyHints)): (null|!URL))=} navigationUrlPolicy
     * @param {(undefined|boolean)=} openShadow
     */
    constructor(sanitizerTable, token, styleElementSanitizer, styleAttributeSanitizer, resourceUrlPolicy, navigationUrlPolicy, openShadow) {
        this.sanitizerTable = sanitizerTable;
        this.styleElementSanitizer = styleElementSanitizer;
        this.styleAttributeSanitizer = styleAttributeSanitizer;
        this.resourceUrlPolicy = resourceUrlPolicy;
        this.navigationUrlPolicy = navigationUrlPolicy;
        this.openShadow = openShadow;
        this.changes = [];
        (0, secrets_1.ensureTokenIsValid)(token);
    }
    /**
     * @public
     * @param {string} html
     * @return {!tsickle_html_impl_2.SafeHtml}
     */
    sanitizeAssertUnchanged(html) {
        if (dev_1.DEV_MODE) {
            this.changes = [];
        }
        /** @type {!tsickle_html_impl_2.SafeHtml} */
        const sanitizedHtml = this.sanitize(html);
        if (dev_1.DEV_MODE && this.changes.length !== 0) {
            throw new Error(`Unexpected change to HTML value as a result of sanitization. ` +
                `Input: "${html}", sanitized output: "${sanitizedHtml}"\n` +
                `List of changes:${this.changes.join('\n')}`);
        }
        return sanitizedHtml;
    }
    /**
     * @public
     * @param {string} html
     * @return {!tsickle_html_impl_2.SafeHtml}
     */
    sanitize(html) {
        /** @type {!Document} */
        const inertDocument = document.implementation.createHTMLDocument('');
        return (0, html_builders_1.nodeToHtmlInternal)(this.sanitizeToFragmentInternal(html, inertDocument), inertDocument.body);
    }
    /**
     * @public
     * @param {string} html
     * @return {!DocumentFragment}
     */
    sanitizeToFragment(html) {
        /** @type {!Document} */
        const inertDocument = document.implementation.createHTMLDocument('');
        if (this.styleElementSanitizer && this.styleAttributeSanitizer) {
            return this.sanitizeWithCssToFragment(html, inertDocument);
        }
        return this.sanitizeToFragmentInternal(html, inertDocument);
    }
    /**
     * @private
     * @param {string} htmlWithCss
     * @param {!Document} inertDocument
     * @return {!DocumentFragment}
     */
    sanitizeWithCssToFragment(htmlWithCss, inertDocument) {
        // BEGIN-INTERNAL
        // TODO(securitymb): Per go/safevalues-css-sanitization-api-shape,
        // safevalues-with-css should be a custom element. At this point however,
        // we can achieve the same result with just using a "normal" element with
        // a shadow DOM. Thanks to that, the name of the element is not part of the
        // public API (yet) so we can change it later if we want to.
        // END-INTERNAL
        /** @type {!HTMLElement} */
        const elem = document.createElement('safevalues-with-css');
        /** @type {string} */
        const mode = this.openShadow ? 'open' : 'closed';
        /** @type {!ShadowRoot} */
        const shadow = elem.attachShadow({ mode });
        /** @type {!DocumentFragment} */
        const sanitized = this.sanitizeToFragmentInternal(htmlWithCss, inertDocument);
        /** @type {!HTMLStyleElement} */
        const internalStyle = document.createElement('style');
        internalStyle.textContent = css_isolation_1.CSS_ISOLATION_STYLESHEET;
        internalStyle.id = 'safevalues-internal-style';
        shadow.appendChild(internalStyle);
        shadow.appendChild(sanitized);
        /** @type {!DocumentFragment} */
        const fragment = inertDocument.createDocumentFragment();
        fragment.appendChild(elem);
        return fragment;
    }
    /**
     * @private
     * @param {string} html
     * @param {!Document} inertDocument
     * @return {!DocumentFragment}
     */
    sanitizeToFragmentInternal(html, inertDocument) {
        /** @type {!DocumentFragment} */
        const dirtyFragment = (0, inert_fragment_1.createInertFragment)(html, inertDocument);
        /** @type {!TreeWalker} */
        const treeWalker = document.createTreeWalker(dirtyFragment, 5 /* NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT */, (/**
         * @param {!Node} n
         * @return {number}
         */
        (n) => this.nodeFilter(n)));
        // `nextNode` is called so we skip the root `DocumentFragment`.
        /** @type {(null|!Node)} */
        let currentNode = treeWalker.nextNode();
        // We create a root element to attach all the children of the body to. We
        // use div as it as a semantic-free, generic container and does not
        // represent anything. This is removed when we serialize the tree back
        // into a string.
        /** @type {!DocumentFragment} */
        const sanitizedFragment = inertDocument.createDocumentFragment();
        /** @type {!Node} */
        let sanitizedParent = sanitizedFragment;
        while (currentNode !== null) {
            /** @type {?} */
            let sanitizedNode;
            if ((0, no_clobber_1.isText)(currentNode)) {
                if (this.styleElementSanitizer &&
                    sanitizedParent.nodeName === 'STYLE') {
                    // TODO(securitymb): The sanitizer should record a change whenever  // LINE-INTERNAL
                    // any meaningful change is made to the stylesheet.                 // LINE-INTERNAL
                    /** @type {string} */
                    const sanitizedCss = this.styleElementSanitizer((/** @type {!Text} */ (currentNode)).data);
                    sanitizedNode = this.createTextNode(sanitizedCss);
                }
                else {
                    sanitizedNode = this.sanitizeTextNode(currentNode);
                }
            }
            else if ((0, no_clobber_1.isElement)(currentNode)) {
                sanitizedNode = this.sanitizeElementNode(currentNode, inertDocument);
            }
            else {
                /** @type {string} */
                let message = '';
                if (dev_1.DEV_MODE) {
                    message = 'Node is not of type text or element';
                }
                throw new Error(message);
            }
            sanitizedParent.appendChild(sanitizedNode);
            // Advance iterator while keeping track of the sanitized parent for the
            // current node
            currentNode = treeWalker.firstChild();
            if (currentNode) {
                sanitizedParent = sanitizedNode;
            }
            else {
                while (!(currentNode = treeWalker.nextSibling())) {
                    if (!(currentNode = treeWalker.parentNode())) {
                        break;
                    }
                    sanitizedParent = (/** @type {!ParentNode} */ (sanitizedParent.parentNode));
                }
            }
        }
        return sanitizedFragment;
    }
    /**
     * @private
     * @param {string} text
     * @return {!Text}
     */
    createTextNode(text) {
        return document.createTextNode(text);
    }
    /**
     * @private
     * @param {!Text} textNode
     * @return {!Text}
     */
    sanitizeTextNode(textNode) {
        return this.createTextNode(textNode.data);
    }
    /**
     * @private
     * @param {!Element} elementNode
     * @param {!Document} inertDocument
     * @return {!Element}
     */
    sanitizeElementNode(elementNode, inertDocument) {
        /** @type {string} */
        const elementName = (0, no_clobber_1.getNodeName)(elementNode);
        /** @type {!HTMLElement} */
        const newNode = inertDocument.createElement(elementName);
        /** @type {!NamedNodeMap} */
        const dirtyAttributes = elementNode.attributes;
        for (const { name, value } of dirtyAttributes) {
            /** @type {!tsickle_sanitizer_table_11.AttributePolicy} */
            const policy = this.sanitizerTable.getAttributePolicy(name, elementName);
            if (!this.satisfiesAllConditions(policy.conditions, dirtyAttributes)) {
                this.recordChange(`Not all conditions satisfied for attribute: ${name}.`);
                continue;
            }
            switch (policy.policyAction) {
                case sanitizer_table_1.AttributePolicyAction.KEEP:
                    setAttribute(newNode, name, value);
                    break;
                case sanitizer_table_1.AttributePolicyAction.KEEP_AND_SANITIZE_URL:
                    if (dev_1.DEV_MODE) {
                        throw new Error(`All KEEP_AND_SANITIZE_URL cases in the safevalues sanitizer should go through the navigation or resource url policy cases. Got ${name} on element ${elementName}.`);
                    }
                    throw new Error();
                case sanitizer_table_1.AttributePolicyAction.KEEP_AND_NORMALIZE:
                    // We don't consider changing the case of an attribute value to be a
                    // semantic change
                    setAttribute(newNode, name, value.toLowerCase());
                    break;
                case sanitizer_table_1.AttributePolicyAction.KEEP_AND_SANITIZE_STYLE:
                    if (this.styleAttributeSanitizer) {
                        /** @type {string} */
                        const sanitizedCss = this.styleAttributeSanitizer(value);
                        // TODO(securitymb): The sanitizer should record a change whenever  // LINE-INTERNAL
                        // any meaningful change is made to the stylesheet.                 // LINE-INTERNAL
                        setAttribute(newNode, name, sanitizedCss);
                    }
                    else {
                        setAttribute(newNode, name, value);
                    }
                    break;
                case sanitizer_table_1.AttributePolicyAction.KEEP_AND_USE_RESOURCE_URL_POLICY:
                    if (this.resourceUrlPolicy) {
                        /** @type {(!StyleElementOrAttributeUrlPolicyHints|!HtmlAttributeUrlPolicyHints)} */
                        const hints = {
                            type: url_policy_1.UrlPolicyHintsType.HTML_ATTRIBUTE,
                            attributeName: name,
                            elementName,
                        };
                        /** @type {!URL} */
                        const url = (0, url_policy_1.parseUrl)(value);
                        /** @type {(null|!URL)} */
                        const sanitizedUrl = this.resourceUrlPolicy(url, hints);
                        // TODO(securitymb): A change should be recorded if the resource url  // LINE-INTERNAL
                        // changes the URL.                                                   // LINE-INTERNAL
                        if (sanitizedUrl) {
                            setAttribute(newNode, name, sanitizedUrl.toString());
                        }
                        // If null is returned, the attribute is dropped.
                    }
                    else {
                        // If the resource url policy is not set, we allow all resources.
                        // This is how the sanitizer behaved before the resource url policy
                        // was introduced.
                        setAttribute(newNode, name, value);
                    }
                    break;
                case sanitizer_table_1.AttributePolicyAction.KEEP_AND_USE_RESOURCE_URL_POLICY_FOR_SRCSET:
                    if (this.resourceUrlPolicy) {
                        /** @type {(!StyleElementOrAttributeUrlPolicyHints|!HtmlAttributeUrlPolicyHints)} */
                        const hints = {
                            type: url_policy_1.UrlPolicyHintsType.HTML_ATTRIBUTE,
                            attributeName: name,
                            elementName,
                        };
                        /** @type {!Srcset} */
                        const srcset = parseSrcset(value);
                        /** @type {!Srcset} */
                        const sanitizedSrcset = { parts: [] };
                        for (const part of srcset.parts) {
                            /** @type {!URL} */
                            const url = (0, url_policy_1.parseUrl)(part.url);
                            /** @type {(null|!URL)} */
                            const sanitizedUrl = this.resourceUrlPolicy(url, hints);
                            if (sanitizedUrl) {
                                sanitizedSrcset.parts.push({
                                    url: sanitizedUrl.toString(),
                                    descriptor: part.descriptor,
                                });
                            }
                        }
                        setAttribute(newNode, name, serializeSrcset(sanitizedSrcset));
                    }
                    else {
                        // If the resource url policy is not set, we allow all resources.
                        // This is how the sanitizer behaved before the resource url
                        // policy was introduced.
                        setAttribute(newNode, name, value);
                    }
                    break;
                case sanitizer_table_1.AttributePolicyAction.KEEP_AND_USE_NAVIGATION_URL_POLICY:
                    /** @type {string} */
                    let attrUrl = value;
                    if (this.navigationUrlPolicy) {
                        /** @type {(!StyleElementOrAttributeUrlPolicyHints|!HtmlAttributeUrlPolicyHints)} */
                        const hints = {
                            type: url_policy_1.UrlPolicyHintsType.HTML_ATTRIBUTE,
                            attributeName: name,
                            elementName,
                        };
                        /** @type {!URL} */
                        const url = (0, url_policy_1.parseUrl)(value);
                        /** @type {(null|!URL)} */
                        const policyUrl = this.navigationUrlPolicy(url, hints);
                        if (policyUrl === null) {
                            this.recordChange(`Url in attribute ${name} was blocked during sanitization. Original url:"${value}"`);
                            break;
                        }
                        attrUrl = policyUrl.toString();
                    }
                    // Always restrictively sanitize the URL independently of the policy.
                    attrUrl = (0, url_builders_1.restrictivelySanitizeUrl)(attrUrl);
                    setAttribute(newNode, name, attrUrl);
                    if (attrUrl !== value) {
                        this.recordChange(`Url in attribute ${name} was modified during sanitization. Original url:"${value}" was sanitized to: "${attrUrl}"`);
                    }
                    break;
                case sanitizer_table_1.AttributePolicyAction.DROP:
                    this.recordChange(`Attribute: ${name} was dropped`);
                    break;
                default:
                    if (dev_1.DEV_MODE) {
                        checkExhaustive(policy.policyAction, 'Unhandled AttributePolicyAction case');
                    }
            }
        }
        return newNode;
    }
    /**
     * @public
     * @param {!Node} node
     * @return {number}
     */
    nodeFilter(node) {
        if ((0, no_clobber_1.isText)(node)) {
            return 1; // NodeFilter.FILTER_ACCEPT
        }
        else if (!(0, no_clobber_1.isElement)(node)) {
            // Getting a node that is neither an `Element` or a `Text` node. This is
            // likely due to something that is not supposed to be an element in user
            // code but recognized as such by the TreeWalker (e.g. a polyfill for
            // other kind of nodes). Since we can't recognize it as an element, we
            // drop the node, but we don't record it as a meaningful change.
            return 2; // NodeFilter.FILTER_REJECT
        }
        /** @type {string} */
        const nodeName = (0, no_clobber_1.getNodeName)(node);
        if (nodeName === null) {
            this.recordChange(`Node name was null for node: ${node}`);
            return 2; // NodeFilter.FILTER_REJECT
        }
        if (this.sanitizerTable.isAllowedElement(nodeName)) {
            return 1; // NodeFilter.FILTER_ACCEPT
        }
        this.recordChange(`Element: ${nodeName} was dropped`);
        return 2; // NodeFilter.FILTER_REJECT
    }
    /**
     * @private
     * @param {string} errorMessage
     * @return {void}
     */
    recordChange(errorMessage) {
        if (dev_1.DEV_MODE) {
            this.changes.push(errorMessage);
        }
    }
    /**
     * @private
     * @param {(undefined|!ReadonlyMap<string, !Set<string>>)} conditions
     * @param {!NamedNodeMap} attrs
     * @return {boolean}
     */
    satisfiesAllConditions(conditions, attrs) {
        if (!conditions) {
            return true;
        }
        for (const [attrName__tsickle_destructured_1, expectedValues__tsickle_destructured_2] of conditions) {
            const attrName = /** @type {string} */ (attrName__tsickle_destructured_1);
            const expectedValues = /** @type {!Set<string>} */ (expectedValues__tsickle_destructured_2);
            /** @type {(undefined|string)} */
            const value = attrs.getNamedItem(attrName)?.value;
            if (value && !expectedValues.has(value)) {
                return false;
            }
        }
        return true;
    }
}
exports.HtmlSanitizerImpl = HtmlSanitizerImpl;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!Array<string>}
     * @private
     */
    HtmlSanitizerImpl.prototype.changes;
    /**
     * @const {!tsickle_sanitizer_table_11.SanitizerTable}
     * @private
     */
    HtmlSanitizerImpl.prototype.sanitizerTable;
    /**
     * @const {(undefined|function(string): string)}
     * @private
     */
    HtmlSanitizerImpl.prototype.styleElementSanitizer;
    /**
     * @const {(undefined|function(string): string)}
     * @private
     */
    HtmlSanitizerImpl.prototype.styleAttributeSanitizer;
    /**
     * @const {(undefined|function(!URL, (!StyleElementOrAttributeUrlPolicyHints|!HtmlAttributeUrlPolicyHints)): (null|!URL))}
     * @private
     */
    HtmlSanitizerImpl.prototype.resourceUrlPolicy;
    /**
     * @const {(undefined|function(!URL, (!StyleElementOrAttributeUrlPolicyHints|!HtmlAttributeUrlPolicyHints)): (null|!URL))}
     * @private
     */
    HtmlSanitizerImpl.prototype.navigationUrlPolicy;
    /**
     * @const {(undefined|boolean)}
     * @private
     */
    HtmlSanitizerImpl.prototype.openShadow;
}
/**
 * @noinline Helper to save on codesize.
 * @param {!Element} el
 * @param {string} name
 * @param {string} value
 * @return {void}
 */
function setAttribute(el, name, value) {
    el.setAttribute(name, value);
}
/**
 * @record
 */
function SrcsetPart() { }
/* istanbul ignore if */
if (false) {
    /**
     * @type {string}
     * @public
     */
    SrcsetPart.prototype.url;
    /**
     * @type {(undefined|string)}
     * @public
     */
    SrcsetPart.prototype.descriptor;
}
/**
 * A structured representation of a srcset attribute.
 * @record
 */
function Srcset() { }
exports.Srcset = Srcset;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!Array<!SrcsetPart>}
     * @public
     */
    Srcset.prototype.parts;
}
/**
 * Parses a srcset attribute into a structured representation.
 *
 * @param {string} srcset The srcset attribute value.
 * @return {!Srcset} The parsed srcset.
 */
function parseSrcset(srcset) {
    // The algorithm is described in the spec at
    // https://html.spec.whatwg.org/multipage/images.html#srcset-attributes.
    //
    // The code below is greatly simplified though; we don't check the validity of
    // the descriptors, only extract them. If they happen to be invalid, the
    // browser will ignore them anyway.
    // The algorithm is described in the spec at
    // https://html.spec.whatwg.org/multipage/images.html#srcset-attributes.
    //
    // The code below is greatly simplified though; we don't check the validity of
    // the descriptors, only extract them. If they happen to be invalid, the
    // browser will ignore them anyway.
    /** @type {!Array<!SrcsetPart>} */
    const parts = [];
    for (const part of srcset.split(',')) {
        const [url__tsickle_destructured_3, descriptor__tsickle_destructured_4] = part.trim().split(/\s+/, 2);
        const url = /** @type {string} */ (url__tsickle_destructured_3);
        const descriptor = /** @type {string} */ (descriptor__tsickle_destructured_4);
        parts.push({ url, descriptor });
    }
    return { parts };
}
exports.parseSrcset = parseSrcset;
/**
 * Serializes a srcset into a string.
 *
 * @param {!Srcset} srcset The srcset to serialize.
 * @return {string} The serialized srcset.
 */
function serializeSrcset(srcset) {
    return (srcset.parts
        .map((/**
     * @param {!SrcsetPart} part
     * @return {string}
     */
    (part) => {
        const { url, descriptor } = part;
        return `${url}${descriptor ? ` ${descriptor}` : ''}`;
    }))
        // We always add whitespaces around the parts to remove the ambiguity of
        // whether a comma character is a part of the URL or not.
        .join(' , '));
}
exports.serializeSrcset = serializeSrcset;
/** @type {!HtmlSanitizerImpl} */
const defaultHtmlSanitizer = (0, pure_1.pure)((/**
 * @return {!HtmlSanitizerImpl}
 */
() => new HtmlSanitizerImpl(default_sanitizer_table_1.DEFAULT_SANITIZER_TABLE, secrets_1.secretToken)));
/**
 * Sanitizes untrusted html using the default sanitizer configuration.
 * @param {string} html
 * @return {!tsickle_html_impl_2.SafeHtml}
 */
function sanitizeHtml(html) {
    return defaultHtmlSanitizer.sanitize(html);
}
exports.sanitizeHtml = sanitizeHtml;
/**
 * Sanitizes untrusted html using the default sanitizer configuration. Throws
 * an error if the html was changed.
 * @param {string} html
 * @return {!tsickle_html_impl_2.SafeHtml}
 */
function sanitizeHtmlAssertUnchanged(html) {
    return defaultHtmlSanitizer.sanitizeAssertUnchanged(html);
}
exports.sanitizeHtmlAssertUnchanged = sanitizeHtmlAssertUnchanged;
/**
 * Sanitizes untrusted html using the default sanitizer configuration. Throws
 * an error if the html was changed.
 * @param {string} html
 * @return {!DocumentFragment}
 */
function sanitizeHtmlToFragment(html) {
    return defaultHtmlSanitizer.sanitizeToFragment(html);
}
exports.sanitizeHtmlToFragment = sanitizeHtmlToFragment;
// BEGIN-INTERNAL
/** @type {!HtmlSanitizerImpl} */
const lenientHtmlSanitizer = (0, pure_1.pure)((/**
 * @return {!HtmlSanitizerImpl}
 */
() => new HtmlSanitizerImpl(default_sanitizer_table_2.LENIENT_SANITIZER_TABLE, secrets_1.secretToken)));
/**
 * Sanitize the given HTML fragment in as lenient of a way as possible while
 * still guaranteeing that the output is safe.
 *
 * This sanitizer does not protect against go/dom-clobbering. Use the normal
 * sanitizer instead if possible.
 *
 * If at all possible, prefer using `sanitizeHtml` over this method.
 *
 * If the main reason for using this sanitizer is allowing styles, consider
 * using sanitizeHtmlWithCss instead, which performs sanitization of stylesheet
 * and its usage doesn't require security approval.
 * @param {string} html
 * @return {!tsickle_html_impl_2.SafeHtml}
 */
function lenientlySanitizeHtml(html) {
    return lenientHtmlSanitizer.sanitize(html);
}
exports.lenientlySanitizeHtml = lenientlySanitizeHtml;
/**
 * Like `sanitizeHtmlAssertUnchanged` but using the lenient sanitizer.
 * @param {string} html
 * @return {!tsickle_html_impl_2.SafeHtml}
 */
function lenientlySanitizeHtmlAssertUnchanged(html) {
    return lenientHtmlSanitizer.sanitizeAssertUnchanged(html);
}
exports.lenientlySanitizeHtmlAssertUnchanged = lenientlySanitizeHtmlAssertUnchanged;
/** @type {!HtmlSanitizerImpl} */
const superLenientHtmlSanitizer = (0, pure_1.pure)((/**
 * @return {!HtmlSanitizerImpl}
 */
() => new HtmlSanitizerImpl(default_sanitizer_table_2.SUPER_LENIENT_SANITIZER_TABLE, secrets_1.secretToken)));
/**
 * Sanitize the given HTML fragment in an extremely lenient way while
 * still guaranteeing that the output cannot lead to XSS in modern browsers.
 *
 * If at all possible, prefer using `sanitizeHtml` or `lenientlySanitizeHtml`
 * over this method.
 *
 * If the main reason for using this sanitizer is allowing styles, consider
 * using sanitizeHtmlWithCss instead, which performs sanitization of stylesheet
 * and its usage doesn't require security approval.
 * @param {string} html
 * @return {!tsickle_html_impl_2.SafeHtml}
 */
function superLenientlySanitizeHtml(html) {
    return superLenientHtmlSanitizer.sanitize(html);
}
exports.superLenientlySanitizeHtml = superLenientlySanitizeHtml;
/**
 * Like `superLenientlySanitizeHtml` but it throws an exception if the output
 * is changed.
 * @param {string} html
 * @return {!tsickle_html_impl_2.SafeHtml}
 */
function superLenientlySanitizeHtmlAssertUnchanged(html) {
    return superLenientHtmlSanitizer.sanitizeAssertUnchanged(html);
}
exports.superLenientlySanitizeHtmlAssertUnchanged = superLenientlySanitizeHtmlAssertUnchanged;
// END-INTERNAL
/**
 * @param {?} value
 * @param {string=} msg
 * @return {?}
 */
function checkExhaustive(value, msg = `unexpected value ${value}!`) {
    throw new Error(msg);
}
