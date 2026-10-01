/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview Exports the UrlPolicy type and its associated interfaces.
 * Generated from: third_party/javascript/safevalues/builders/html_sanitizer/url_policy.ts
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
goog.module('google3.third_party.javascript.safevalues.builders.html_sanitizer.url_policy');
var module = module || { id: 'third_party/javascript/safevalues/builders/html_sanitizer/url_policy.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
/**
 * A policy that can be used to process URLs for navigation or resource URL sinks.
 * @typedef {function(!URL, (!HtmlAttributeUrlPolicyHints|!StyleElementOrAttributeUrlPolicyHints)): (null|!URL)}
 */
exports.UrlPolicy;
/**
 * The type of the hints that can be passed to a UrlPolicy.
 * @enum {number}
 */
const UrlPolicyHintsType = {
    STYLE_ELEMENT: 0,
    STYLE_ATTRIBUTE: 1,
    HTML_ATTRIBUTE: 2,
};
exports.UrlPolicyHintsType = UrlPolicyHintsType;
UrlPolicyHintsType[UrlPolicyHintsType.STYLE_ELEMENT] = 'STYLE_ELEMENT';
UrlPolicyHintsType[UrlPolicyHintsType.STYLE_ATTRIBUTE] = 'STYLE_ATTRIBUTE';
UrlPolicyHintsType[UrlPolicyHintsType.HTML_ATTRIBUTE] = 'HTML_ATTRIBUTE';
/**
 * @record
 */
function StyleElementOrAttributeUrlPolicyHints() { }
/* istanbul ignore if */
if (false) {
    /**
     * The URL is being loaded by a stylesheet from a <style> tag or a style
     * attribute.
     * @const {!UrlPolicyHintsType}
     * @public
     */
    StyleElementOrAttributeUrlPolicyHints.prototype.type;
    /**
     * The CSS property that attempts to load the resource.
     * @const {string}
     * @public
     */
    StyleElementOrAttributeUrlPolicyHints.prototype.propertyName;
}
/**
 * @record
 */
function HtmlAttributeUrlPolicyHints() { }
/* istanbul ignore if */
if (false) {
    /**
     * The external resource is being loaded by an HTML attribute.
     * @const {!UrlPolicyHintsType}
     * @public
     */
    HtmlAttributeUrlPolicyHints.prototype.type;
    /**
     * The HTML attribute that attempts to load the resource.
     * @const {string}
     * @public
     */
    HtmlAttributeUrlPolicyHints.prototype.attributeName;
    /**
     * The HTML element that contains the attribute.
     * @const {string}
     * @public
     */
    HtmlAttributeUrlPolicyHints.prototype.elementName;
}
/**
 * Hints that can be passed to a UrlPolicy to make the check more
 * informed.
 * @typedef {(!HtmlAttributeUrlPolicyHints|!StyleElementOrAttributeUrlPolicyHints)}
 */
exports.UrlPolicyHints;
/**
 * Parses a URL. If the URL is invalid, returns URL instance with
 * `about:invalid`.
 * @param {string} value
 * @return {!URL}
 */
function parseUrl(value) {
    try {
        return new URL(value, window.document.baseURI);
    }
    catch (e) {
        return new URL('about:invalid');
    }
}
exports.parseUrl = parseUrl;
