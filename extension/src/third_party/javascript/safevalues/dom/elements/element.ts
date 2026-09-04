/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview This contains safe wrappers for properties that aren't specific
 * to one kind of HTMLElement (like innerHTML), plus other setters and functions
 * that are not tied to elements (like location.href or Worker constructor).
 * Generated from: third_party/javascript/safevalues/dom/elements/element.ts
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
goog.module('google3.third_party.javascript.safevalues.dom.elements.element');
var module = module || { id: 'third_party/javascript/safevalues/dom/elements/element.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_dev_1 = goog.requireType("google3.third_party.javascript.safevalues.environment.dev");
const tsickle_attribute_impl_2 = goog.requireType("google3.third_party.javascript.safevalues.internals.attribute_impl");
const tsickle_html_impl_3 = goog.requireType("google3.third_party.javascript.safevalues.internals.html_impl");
const tsickle_resource_url_impl_4 = goog.requireType("google3.third_party.javascript.safevalues.internals.resource_url_impl");
const tsickle_anchor_5 = goog.requireType("google3.third_party.javascript.safevalues.dom.elements.anchor");
const tsickle_area_6 = goog.requireType("google3.third_party.javascript.safevalues.dom.elements.area");
const tsickle_base_7 = goog.requireType("google3.third_party.javascript.safevalues.dom.elements.base");
const tsickle_button_8 = goog.requireType("google3.third_party.javascript.safevalues.dom.elements.button");
const tsickle_embed_9 = goog.requireType("google3.third_party.javascript.safevalues.dom.elements.embed");
const tsickle_form_10 = goog.requireType("google3.third_party.javascript.safevalues.dom.elements.form");
const tsickle_iframe_11 = goog.requireType("google3.third_party.javascript.safevalues.dom.elements.iframe");
const tsickle_input_12 = goog.requireType("google3.third_party.javascript.safevalues.dom.elements.input");
const tsickle_object_13 = goog.requireType("google3.third_party.javascript.safevalues.dom.elements.object");
const tsickle_script_14 = goog.requireType("google3.third_party.javascript.safevalues.dom.elements.script");
const dev_1 = goog.require('google3.third_party.javascript.safevalues.environment.dev');
const attribute_impl_1 = goog.require('google3.third_party.javascript.safevalues.internals.attribute_impl');
const html_impl_1 = goog.require('google3.third_party.javascript.safevalues.internals.html_impl');
const anchor_1 = goog.require('google3.third_party.javascript.safevalues.dom.elements.anchor');
const area_1 = goog.require('google3.third_party.javascript.safevalues.dom.elements.area');
const base_1 = goog.require('google3.third_party.javascript.safevalues.dom.elements.base');
const button_1 = goog.require('google3.third_party.javascript.safevalues.dom.elements.button');
const embed_1 = goog.require('google3.third_party.javascript.safevalues.dom.elements.embed');
const form_1 = goog.require('google3.third_party.javascript.safevalues.dom.elements.form');
const iframe_1 = goog.require('google3.third_party.javascript.safevalues.dom.elements.iframe');
const input_1 = goog.require('google3.third_party.javascript.safevalues.dom.elements.input');
const object_1 = goog.require('google3.third_party.javascript.safevalues.dom.elements.object');
const script_1 = goog.require('google3.third_party.javascript.safevalues.dom.elements.script');
/** @typedef {(!HTMLScriptElement|!HTMLStyleElement|!SVGScriptElement|!SVGStyleElement)} */
var ScriptOrStyle;
/**
 * Safely set {\@link Element.innerHTML} on a given ShadowRoot or Element which
 * may not be a `<script>` element or a `<style>` element.
 * @template T
 * @param {?} elOrRoot
 * @param {!tsickle_html_impl_3.SafeHtml} v
 * @return {void}
 */
function setElementInnerHtml(elOrRoot, v) {
    if (isElement(elOrRoot)) {
        throwIfScriptOrStyle(elOrRoot);
    }
    (/** @type {(!Element|!ShadowRoot)} */ (elOrRoot)).innerHTML = (/** @type {string} */ ((0, html_impl_1.unwrapHtml)(v)));
}
exports.setElementInnerHtml = setElementInnerHtml;
/**
 * Safely set {\@link Element.outerHTML} for the given Element.
 * @param {!Element} e
 * @param {!tsickle_html_impl_3.SafeHtml} v
 * @return {void}
 */
function setElementOuterHtml(e, v) {
    /** @type {(null|!HTMLElement)} */
    const parent = e.parentElement;
    if (parent !== null) {
        throwIfScriptOrStyle(parent);
    }
    e.outerHTML = (/** @type {string} */ ((0, html_impl_1.unwrapHtml)(v)));
}
exports.setElementOuterHtml = setElementOuterHtml;
/**
 * Safely call {\@link Element.insertAdjacentHTML} for the given Element.
 * @template T
 * @param {?} element
 * @param {string} position
 * @param {!tsickle_html_impl_3.SafeHtml} v
 * @return {void}
 */
function elementInsertAdjacentHtml(element, position, v) {
    /** @type {(null|!HTMLElement|?)} */
    const tagContext = position === 'beforebegin' || position === 'afterend'
        ? element.parentElement
        : element;
    if (tagContext !== null) {
        throwIfScriptOrStyle(tagContext);
    }
    element.insertAdjacentHTML(position, (/** @type {string} */ ((0, html_impl_1.unwrapHtml)(v))));
}
exports.elementInsertAdjacentHtml = elementInsertAdjacentHtml;
/**
 * Given a set of known-to-be-safe prefixes (e.g., "data-", "aria-", "js"),
 * return a setter function that allows you to set attributes on an element,
 * as long as the names of the attributes to be set has one of the prefixes.
 *
 * The returned setter ensures that setting any dangerous attribute, e.g.,
 * "src", "href" will cause an exception. This is intended to be used as the
 * safe alternative of `Element#setAttribute`, when applications need to set
 * attributes that do not have security implications and do not have a
 * corresponding DOM property.
 * @param {!tsickle_attribute_impl_2.SafeAttributePrefix} prefix
 * @param {...!tsickle_attribute_impl_2.SafeAttributePrefix} otherPrefixes
 * @return {function(!Element, string, string): void}
 */
function buildPrefixedAttributeSetter(prefix, ...otherPrefixes) {
    /** @type {!Array<!tsickle_attribute_impl_2.SafeAttributePrefix>} */
    const prefixes = [prefix, ...otherPrefixes];
    return (/**
     * @param {!Element} e
     * @param {string} attr
     * @param {string} value
     * @return {void}
     */
    (e, attr, value) => {
        setElementPrefixedAttribute(prefixes, e, attr, value);
    });
}
exports.buildPrefixedAttributeSetter = buildPrefixedAttributeSetter;
/**
 * A safe alternative to Element#setAttribute. The function takes a list of
 * `SafeAttributePrefix`, making developer intention explicit. The attribute
 * to be set must has one of the safe prefixes, otherwise the function throws
 * an Error.
 * @param {!ReadonlyArray<!tsickle_attribute_impl_2.SafeAttributePrefix>} attrPrefixes
 * @param {!Element} e
 * @param {string} attr
 * @param {string} value
 * @return {void}
 */
function setElementPrefixedAttribute(attrPrefixes, e, attr, value) {
    if (attrPrefixes.length === 0) {
        /** @type {string} */
        let message = '';
        if (dev_1.DEV_MODE) {
            message = 'No prefixes are provided';
        }
        throw new Error(message);
    }
    /** @type {!Array<string>} */
    const prefixes = attrPrefixes.map((/**
     * @param {!tsickle_attribute_impl_2.SafeAttributePrefix} s
     * @return {string}
     */
    (s) => (0, attribute_impl_1.unwrapAttributePrefix)(s)));
    /** @type {string} */
    const attrLower = attr.toLowerCase();
    if (prefixes.every((/**
     * @param {string} p
     * @return {boolean}
     */
    (p) => attrLower.indexOf(p) !== 0))) {
        throw new Error(`Attribute "${attr}" does not match any of the allowed prefixes.`);
    }
    e.setAttribute(attr, value);
}
exports.setElementPrefixedAttribute = setElementPrefixedAttribute;
/**
 * @param {!Element} element
 * @return {void}
 */
function throwIfScriptOrStyle(element) {
    /** @type {string} */
    let message = '';
    /** @type {string} */
    const tagName = element.tagName;
    if (/^(script|style)$/i.test(tagName)) {
        if (dev_1.DEV_MODE) {
            if (tagName.toLowerCase() === 'script') {
                message = 'Use setScriptTextContent with a SafeScript.';
            }
            else {
                message = 'Use setStyleTextContent with a SafeStyleSheet.';
            }
        }
        throw new Error(message);
    }
}
/**
 * @param {(!Element|!ShadowRoot)} elOrRoot
 * @return {boolean}
 */
function isElement(elOrRoot) {
    return elOrRoot.nodeType === 1; // Node.ELEMENT_NODE
}
/**
 * A safe alternative to Element#setAttribute.
 *
 * The function has essentially the same signature as `Element.setAttribute`,
 * but requires a safe type (or sanitizes the value) when used with a security
 * sensitive attribute. It does this by forwarding the call to the
 * element-specific setters within `safevalues/dom`.
 *
 * Note that this function doesn't currently support elements outside of the
 * html namespace & might throw if used with the wrong type of element or
 * attribute value
 *
 * If code size is a concern, consider using `setElementPrefixedAttribute`, or
 * the element-specific setters.
 *
 * The security sensitive element/attributes pairs are the following:
 *   - anchor#href -> forwarded to `setAnchorHref`
 *   - area#href -> forwarded to `setAreaHref`
 *   - base#href -> forwarded to `setBaseHref`
 *   - button#formaction -> forwarded to `setButtonFormaction`
 *   - embed#src -> forwarded to `setEmbedSrc`
 *   - form#action -> forwarded to `setFormAction`
 *   - iframe#src -> forwarded to `setIframeSrc`
 *   - iframe#srcdoc -> forwarded to `setIframeSrcdoc`
 *   - iframe#sandbox -> rejected, use `setIframeSrcWithIntent` or
 *       `setIframeSrcdocWithIntent` instead
 *   - input#formaction -> forwarded to `setInputFormaction`
 *   - link#href -> rejected, use `setLinkHrefAndRel` instead
 *   - link#rel -> rejected, use `setLinkHrefAndRel` instead
 *   - object#data -> forwarded to `setObjectData`
 *   - script#src -> forwarded to `setScriptSrc`
 *   - global attributes:
 *   - target -> forwarded to `el.setAttribute`
 *   - cite -> forwarded to `el.setAttribute`
 *   - poster -> forwarded to `el.setAttribute`
 *   - srcset -> forwarded to `el.setAttribute`
 *   - src -> forwarded to `el.setAttribute`
 *   - href -> forwarded to `el.setAttribute`
 *   - any attribute starting with `on` -> rejected
 *
 * Every other attribute is set as is using `element.setAttribute`
 * @param {!HTMLElement} el
 * @param {string} attr
 * @param {(string|!tsickle_html_impl_3.SafeHtml|!tsickle_resource_url_impl_4.TrustedResourceUrl)} value
 * @return {void}
 */
function setElementAttribute(el, attr, value) {
    if (el.namespaceURI !== 'http://www.w3.org/1999/xhtml') {
        throw new Error(`Cannot set attribute '${attr}' on '${el.tagName}'.` +
            `Element is not in the HTML namespace`);
    }
    attr = attr.toLowerCase();
    /** @type {string} */
    const key = `${el.tagName} ${attr}`;
    switch (key) {
        case 'A href':
            (0, anchor_1.setAnchorHref)((/** @type {!HTMLAnchorElement} */ (el)), (/** @type {string} */ (value)));
            return;
        case 'AREA href':
            (0, area_1.setAreaHref)((/** @type {!HTMLAreaElement} */ (el)), (/** @type {string} */ (value)));
            return;
        case 'BASE href':
            (0, base_1.setBaseHref)((/** @type {!HTMLBaseElement} */ (el)), (/** @type {!tsickle_resource_url_impl_4.TrustedResourceUrl} */ (value)));
            return;
        case 'BUTTON formaction':
            (0, button_1.setButtonFormaction)((/** @type {!HTMLButtonElement} */ (el)), (/** @type {string} */ (value)));
            return;
        case 'EMBED src':
            (0, embed_1.setEmbedSrc)((/** @type {!HTMLEmbedElement} */ (el)), (/** @type {!tsickle_resource_url_impl_4.TrustedResourceUrl} */ (value)));
            return;
        case 'FORM action':
            (0, form_1.setFormAction)((/** @type {!HTMLFormElement} */ (el)), (/** @type {string} */ (value)));
            return;
        case 'IFRAME src':
            (0, iframe_1.setIframeSrc)((/** @type {!HTMLIFrameElement} */ (el)), (/** @type {!tsickle_resource_url_impl_4.TrustedResourceUrl} */ (value)));
            return;
        case 'IFRAME srcdoc':
            (0, iframe_1.setIframeSrcdoc)((/** @type {!HTMLIFrameElement} */ (el)), (/** @type {!tsickle_html_impl_3.SafeHtml} */ (value)));
            return;
        case 'IFRAME sandbox':
            throw new Error("Can't set 'sandbox' on iframe tags. " +
                'Use setIframeSrcWithIntent or setIframeSrcdocWithIntent instead');
        case 'INPUT formaction':
            (0, input_1.setInputFormaction)((/** @type {!HTMLInputElement} */ (el)), (/** @type {string} */ (value)));
            return;
        case 'LINK href':
            throw new Error("Can't set 'href' attribute on link tags. " +
                'Use setLinkHrefAndRel instead');
        case 'LINK rel':
            throw new Error("Can't set 'rel' attribute on link tags. " +
                'Use setLinkHrefAndRel instead');
        case 'OBJECT data':
            (0, object_1.setObjectData)((/** @type {!HTMLObjectElement} */ (el)), (/** @type {!tsickle_resource_url_impl_4.TrustedResourceUrl} */ (value)));
            return;
        case 'SCRIPT src':
            (0, script_1.setScriptSrc)((/** @type {!HTMLScriptElement} */ (el)), (/** @type {!tsickle_resource_url_impl_4.TrustedResourceUrl} */ (value)));
            return;
        default:
            if (/^on./.test(attr)) {
                throw new Error(`Attribute "${attr}" looks like an event handler attribute. ` +
                    `Please use a safe alternative like addEventListener instead.`);
            }
            el.setAttribute(attr, (/** @type {string} */ (value)));
    }
}
exports.setElementAttribute = setElementAttribute;
