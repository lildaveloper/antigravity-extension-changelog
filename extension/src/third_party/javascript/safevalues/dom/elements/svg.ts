/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/javascript/safevalues/dom/elements/svg.ts
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
goog.module('google3.third_party.javascript.safevalues.dom.elements.svg');
var module = module || { id: 'third_party/javascript/safevalues/dom/elements/svg.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_dev_1 = goog.requireType("google3.third_party.javascript.safevalues.environment.dev");
const dev_1 = goog.require('google3.third_party.javascript.safevalues.environment.dev');
/** @type {!Array<string>} */
const UNSAFE_SVG_ATTRIBUTES = ['href', 'xlink:href'];
/**
 * Set attribute on SVGElement if the attribute doesn't have security
 * implications. If the attribute can potentially cause XSS, throw an error.
 * @param {!SVGElement} svg
 * @param {string} attr
 * @param {string} value
 * @return {void}
 */
function setSvgAttribute(svg, attr, value) {
    /** @type {string} */
    const attrLower = attr.toLowerCase();
    if (UNSAFE_SVG_ATTRIBUTES.indexOf(attrLower) !== -1 ||
        attrLower.indexOf('on') === 0) {
        /** @type {string} */
        let msg = '';
        if (dev_1.DEV_MODE) {
            msg = `Setting the '${attrLower}' attribute on SVG can cause XSS.`;
        }
        throw new Error(msg);
    }
    svg.setAttribute(attr, value);
}
exports.setSvgAttribute = setSvgAttribute;
