/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Library that provides safe getters for different node properties and
 * checks for clobbering.
 */
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/javascript/safevalues/builders/html_sanitizer/no_clobber.ts
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
goog.module('google3.third_party.javascript.safevalues.builders.html_sanitizer.no_clobber');
var module = module || { id: 'third_party/javascript/safevalues/builders/html_sanitizer/no_clobber.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
/**
 * Gets a reasonable nodeName, even for clobbered nodes.
 * @param {!Node} node
 * @return {string}
 */
function getNodeName(node) {
    /** @type {string} */
    const nodeName = node.nodeName;
    // If the property is clobbered, assume it is an `HTMLFormElement`.
    return typeof nodeName === 'string' ? nodeName : 'FORM';
}
exports.getNodeName = getNodeName;
/**
 * Returns true if the object passed is a Text node.
 * @param {!Node} node
 * @return {boolean}
 */
function isText(node) {
    // The property cannot get clobbered on Text nodes.
    return node.nodeType === 3; // Node.TEXT_NODE
}
exports.isText = isText;
/**
 * Returns true if the object passed is an Element node.
 * @param {!Node} node
 * @return {boolean}
 */
function isElement(node) {
    /** @type {number} */
    const nodeType = node.nodeType;
    // If the property is clobbered, we can assume it is an `HTMLFormElement`, and
    // thus an `Element`.
    return nodeType === 1 /* Node.ELEMENT_NODE */ || typeof nodeType !== 'number';
}
exports.isElement = isElement;
