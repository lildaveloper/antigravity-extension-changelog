/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/javascript/safevalues/dom/globals/document.ts
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
goog.module('google3.third_party.javascript.safevalues.dom.globals.document');
var module = module || { id: 'third_party/javascript/safevalues/dom/globals/document.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_html_impl_1 = goog.requireType("google3.third_party.javascript.safevalues.internals.html_impl");
const html_impl_1 = goog.require('google3.third_party.javascript.safevalues.internals.html_impl');
/**
 * documentWrite safely calls {\@link Document.write} on the given
 * {\@link Document} with the given {\@link SafeHtml}.
 * @param {!Document} doc
 * @param {!tsickle_html_impl_1.SafeHtml} text
 * @return {void}
 */
function documentWrite(doc, text) {
    doc.write((/** @type {string} */ ((0, html_impl_1.unwrapHtml)(text))));
}
exports.documentWrite = documentWrite;
/** @typedef {?} */
var ValueType;
/**
 * Safely calls {\@link Document.execCommand}. When command is insertHtml, a
 * SafeHtml must be passed in as value.
 * @template Cmd
 * @param {!Document} doc
 * @param {Cmd} command
 * @param {(undefined|?)=} value
 * @return {boolean}
 */
function documentExecCommand(doc, command, value) {
    /** @type {string} */
    const commandString = String(command);
    /** @type {string} */
    let valueArgument = (/** @type {string} */ (value));
    if (commandString.toLowerCase() === 'inserthtml') {
        valueArgument = (/** @type {string} */ ((0, html_impl_1.unwrapHtml)((/** @type {!tsickle_html_impl_1.SafeHtml} */ (value)))));
    }
    return doc.execCommand(commandString, /* showUi= */ false, valueArgument);
}
exports.documentExecCommand = documentExecCommand;
// BEGIN-INTERNAL
/**
 * Safely calls {\@link Document.execCommand}('insertHtml').
 * @deprecated Use documentExecCommand instead.
 * @param {!Document} doc
 * @param {!tsickle_html_impl_1.SafeHtml} html
 * @return {boolean}
 */
function documentExecCommandInsertHtml(doc, html) {
    return doc.execCommand('insertHTML', 
    /* showUi= */ false, (/** @type {string} */ ((0, html_impl_1.unwrapHtml)(html))));
}
exports.documentExecCommandInsertHtml = documentExecCommandInsertHtml;
