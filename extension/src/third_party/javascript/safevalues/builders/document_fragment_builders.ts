/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/javascript/safevalues/builders/document_fragment_builders.ts
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
goog.module('google3.third_party.javascript.safevalues.builders.document_fragment_builders');
var module = module || { id: 'third_party/javascript/safevalues/builders/document_fragment_builders.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_dev_1 = goog.requireType("google3.third_party.javascript.safevalues.environment.dev");
const tsickle_html_impl_2 = goog.requireType("google3.third_party.javascript.safevalues.internals.html_impl");
const tsickle_string_literal_3 = goog.requireType("google3.third_party.javascript.safevalues.internals.string_literal");
const dev_1 = goog.require('google3.third_party.javascript.safevalues.environment.dev');
const html_impl_1 = goog.require('google3.third_party.javascript.safevalues.internals.html_impl');
const string_literal_1 = goog.require('google3.third_party.javascript.safevalues.internals.string_literal');
/**
 * Creates a DocumentFragment object from a template literal (without any
 * embedded expressions) using the document context (HTML).
 *
 * Note: use svgFragment instead to create a DocumentFragment belonging to the
 * SVG namespace.
 *
 * This function is a template literal tag function. It should be called with
 * a template literal that does not contain any expressions. For example,
 *                           htmlFragment`foo`;
 *
 * @param {!TemplateStringsArray} templateObj This contains the literal part of the template literal.
 * @return {!DocumentFragment}
 */
function htmlFragment(templateObj) {
    if (dev_1.DEV_MODE) {
        (0, string_literal_1.assertIsTemplateObject)(templateObj, 0);
    }
    /** @type {!Range} */
    const range = document.createRange();
    return range.createContextualFragment((/** @type {string} */ ((0, html_impl_1.unwrapHtml)((0, html_impl_1.createHtmlInternal)(templateObj[0])))));
}
exports.htmlFragment = htmlFragment;
/**
 * Creates a DocumentFragment object from a template literal (without any
 * embedded expressions), with an SVG context.
 *
 * This function is a template literal tag function. It should be called with
 * a template literal that does not contain any expressions. For example,
 *                           svgFragment`foo`;
 *
 * @param {!TemplateStringsArray} templateObj This contains the literal part of the template literal.
 * @return {!DocumentFragment}
 */
function svgFragment(templateObj) {
    if (dev_1.DEV_MODE) {
        (0, string_literal_1.assertIsTemplateObject)(templateObj, 0);
    }
    /** @type {!SVGSVGElement} */
    const svgElem = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    /** @type {!Range} */
    const range = document.createRange();
    range.selectNodeContents(svgElem);
    return range.createContextualFragment((/** @type {string} */ ((0, html_impl_1.unwrapHtml)((0, html_impl_1.createHtmlInternal)(templateObj[0])))));
}
exports.svgFragment = svgFragment;
/**
 * Converts HTML markup into a node.
 * @param {!tsickle_html_impl_2.SafeHtml} html
 * @return {!Node}
 */
function htmlToNode(html) {
    /** @type {!Range} */
    const range = document.createRange();
    /** @type {!DocumentFragment} */
    const fragment = range.createContextualFragment((/** @type {string} */ ((0, html_impl_1.unwrapHtml)(html))));
    if (fragment.childNodes.length === 1) {
        return fragment.childNodes[0];
    }
    else {
        return fragment;
    }
}
exports.htmlToNode = htmlToNode;
