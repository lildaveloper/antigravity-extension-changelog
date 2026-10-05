/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/javascript/safevalues/builders/style_sheet_builders.ts
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
goog.module('google3.third_party.javascript.safevalues.builders.style_sheet_builders');
var module = module || { id: 'third_party/javascript/safevalues/builders/style_sheet_builders.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_dev_1 = goog.requireType("google3.third_party.javascript.safevalues.environment.dev");
const tsickle_string_literal_2 = goog.requireType("google3.third_party.javascript.safevalues.internals.string_literal");
const tsickle_style_sheet_impl_3 = goog.requireType("google3.third_party.javascript.safevalues.internals.style_sheet_impl");
const dev_1 = goog.require('google3.third_party.javascript.safevalues.environment.dev');
const string_literal_1 = goog.require('google3.third_party.javascript.safevalues.internals.string_literal');
const style_sheet_impl_1 = goog.require('google3.third_party.javascript.safevalues.internals.style_sheet_impl');
/** @typedef {(string|number|boolean)} */
var Primitive;
/**
 * Creates a SafeStyleSheet object from a template literal, representing a
 * single CSSStyleRule.
 * This builder parses the CSSStyleRule using browser APIs and serializes it
 * back to a string. This may change the string representation of the
 * stylesheet.
 *
 * This function is a template literal tag function. It should be called with
 * a template literal. For example,
 *                         safeStyleRule`.foo {}`.
 * @param {!TemplateStringsArray} templateObj
 * @param {...(string|number|boolean)} rest
 * @return {(undefined|!tsickle_style_sheet_impl_3.SafeStyleSheet)} A SafeStyleSheet object for the CSSStyleRule if successfuly parsed,
 *     undefined otherwise.
 */
function safeStyleRule(templateObj, ...rest) {
    if (dev_1.DEV_MODE) {
        (0, string_literal_1.assertIsTemplateObject)(templateObj, rest.length);
    }
    /** @type {string} */
    let stringifiedRule = templateObj[0];
    for (let i = 0; i < templateObj.length - 1; i++) {
        stringifiedRule += String(rest[i]);
        stringifiedRule += templateObj[i + 1];
    }
    // TODO(gweg): use the CSSStyleSheet API when it has broader browser support.
    /** @type {!Document} */
    const doc = document.implementation.createHTMLDocument('');
    /** @type {!HTMLStyleElement} */
    const styleEl = doc.createElement('style');
    doc.head.appendChild(styleEl);
    /** @type {!CSSStyleSheet} */
    const styleSheet = (/** @type {!CSSStyleSheet} */ (styleEl.sheet));
    styleSheet.insertRule(stringifiedRule, 0);
    if (styleSheet.cssRules.length !== 1) {
        if (dev_1.DEV_MODE) {
            throw new Error('safeStyleRule can be used to construct only 1 CSSStyleRule at a time. Use the concatStyle function to create sheet with several rules. Tried to parse: ' +
                stringifiedRule +
                `which has ${styleSheet.cssRules.length} rules: ${styleSheet.cssRules[0].cssText} #$% ${styleSheet.cssRules[1].cssText}.`);
        }
        return undefined;
    }
    /** @type {!CSSRule} */
    const styleSheetRule = styleSheet.cssRules[0];
    if (!(styleSheetRule instanceof CSSStyleRule)) {
        if (dev_1.DEV_MODE) {
            throw new Error('safeStyleRule can be used to construct a CSSStyleRule. @-rules should be constructed with the safeStyleSheet builder. Tried to parse: ' +
                stringifiedRule);
        }
        return undefined;
    }
    /** @type {string} */
    const styleSheetValue = (/** @type {!CSSStyleRule} */ (styleSheetRule)).cssText;
    return (0, style_sheet_impl_1.createStyleSheetInternal)(styleSheetValue.replace(/</g, '\\3C '));
}
exports.safeStyleRule = safeStyleRule;
// END-INTERNAL
/**
 * Creates a SafeStyleSheet object from a template literal.
 *
 * This function is a template literal tag function. It should be called with
 * a template literal, with or without embedded `SafeStyleSheet` expressions.
 * For example,
 *                         safeStyleSheet`foo`;
 * The literal parts must not have any < characters in them. This is so that
 * SafeStyleSheet's contract is preserved, allowing the SafeStyleSheet to
 * correctly be interpreted as a sequence of CSS declarations and without
 * affecting the syntactic structure of any surrounding CSS and HTML.
 *
 * @param {!TemplateStringsArray} templateObj This contains the literal part of the template literal.
 * @param {...!tsickle_style_sheet_impl_3.SafeStyleSheet} rest This represents the template's embedded `SafeStyleSheet`
 *     expressions.
 * @return {!tsickle_style_sheet_impl_3.SafeStyleSheet}
 */
function safeStyleSheet(templateObj, ...rest) {
    if (dev_1.DEV_MODE) {
        (0, string_literal_1.assertIsTemplateObject)(templateObj, rest.length);
    }
    /** @type {string} */
    let styleSheet = '';
    for (let i = 0; i < templateObj.length; i++) {
        if (dev_1.DEV_MODE) {
            if (/</.test(templateObj[i])) {
                throw new Error(`'<' character is forbidden in styleSheet string: ${templateObj[i]}`);
            }
        }
        styleSheet += templateObj[i];
        if (i < rest.length) {
            styleSheet += (0, style_sheet_impl_1.unwrapStyleSheet)(rest[i]);
        }
    }
    return (0, style_sheet_impl_1.createStyleSheetInternal)(styleSheet);
}
exports.safeStyleSheet = safeStyleSheet;
/**
 * Creates a `SafeStyleSheet` value by concatenating multiple
 * `SafeStyleSheet`s.
 * @param {!ReadonlyArray<!tsickle_style_sheet_impl_3.SafeStyleSheet>} sheets
 * @return {!tsickle_style_sheet_impl_3.SafeStyleSheet}
 */
function concatStyleSheets(sheets) {
    return (0, style_sheet_impl_1.createStyleSheetInternal)(sheets.map(style_sheet_impl_1.unwrapStyleSheet).join(''));
}
exports.concatStyleSheets = concatStyleSheets;
