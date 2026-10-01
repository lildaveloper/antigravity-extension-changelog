/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/javascript/safevalues/dom/globals/dom_parser.ts
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
goog.module('google3.third_party.javascript.safevalues.dom.globals.dom_parser');
var module = module || { id: 'third_party/javascript/safevalues/dom/globals/dom_parser.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_dev_1 = goog.requireType("google3.third_party.javascript.safevalues.environment.dev");
const tsickle_html_impl_2 = goog.requireType("google3.third_party.javascript.safevalues.internals.html_impl");
const dev_1 = goog.require('google3.third_party.javascript.safevalues.environment.dev');
const html_impl_1 = goog.require('google3.third_party.javascript.safevalues.internals.html_impl');
/**
 * Safely parses a string using the HTML parser.
 * @param {!DOMParser} parser
 * @param {!tsickle_html_impl_2.SafeHtml} html
 * @return {!Document}
 */
function domParserParseHtml(parser, html) {
    return domParserParseFromString(parser, html, 'text/html');
}
exports.domParserParseHtml = domParserParseHtml;
/**
 * Safely parses a string using the XML parser. If the XML document is found to
 * contain any elements from the HTML or SVG namespaces, an error is thrown for
 * security reasons.
 * @param {!DOMParser} parser
 * @param {string} xml
 * @return {!XMLDocument}
 */
function domParserParseXml(parser, xml) {
    /** @type {!Document} */
    const doc = domParserParseFromString(parser, (0, html_impl_1.createHtmlInternal)(xml), 'text/xml');
    /** @type {!NodeIterator} */
    const iterator = document.createNodeIterator(doc, NodeFilter.SHOW_ELEMENT);
    /** @type {(null|!Node)} */
    let currentNode;
    while ((currentNode = iterator.nextNode())) {
        /** @type {(null|string)} */
        const ns = ((/** @type {!Element} */ (currentNode))).namespaceURI;
        if (isUnsafeNamespace(ns)) {
            /** @type {string} */
            let message = 'unsafe XML';
            if (dev_1.DEV_MODE) {
                message += ` - attempted to parse an XML document containing an element with namespace ${ns}. Parsing HTML, SVG or MathML content is unsafe because it may lead to XSS when the content is appended to the document.`;
            }
            throw new Error(message);
        }
    }
    return doc;
}
exports.domParserParseXml = domParserParseXml;
/**
 * Checks if an element has one of: HTML, SVG or MathML namespace.
 * Appending elements with these namespaces to the document may lead to XSS.
 * @param {(null|string)} ns
 * @return {boolean}
 */
function isUnsafeNamespace(ns) {
    return (ns === 'http://www.w3.org/1999/xhtml' ||
        ns === 'http://www.w3.org/2000/svg' ||
        ns === 'http://www.w3.org/1998/Math/MathML');
}
/**
 * Safely parses a string using the HTML or XML parser.
 * @param {!DOMParser} parser
 * @param {!tsickle_html_impl_2.SafeHtml} content
 * @param {string} contentType
 * @return {!Document}
 */
function domParserParseFromString(parser, content, contentType) {
    return parser.parseFromString((/** @type {string} */ ((0, html_impl_1.unwrapHtml)(content))), contentType);
}
exports.domParserParseFromString = domParserParseFromString;
