/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview
 * Functions which allow fetch() on resourceUrls to be
 * interpreted as SafeHtml or SafeScript.
 * Generated from: third_party/javascript/safevalues/dom/globals/fetch.ts
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
goog.module('google3.third_party.javascript.safevalues.dom.globals.fetch');
var module = module || { id: 'third_party/javascript/safevalues/dom/globals/fetch.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_html_impl_1 = goog.requireType("google3.third_party.javascript.safevalues.internals.html_impl");
const tsickle_resource_url_impl_2 = goog.requireType("google3.third_party.javascript.safevalues.internals.resource_url_impl");
const tsickle_script_impl_3 = goog.requireType("google3.third_party.javascript.safevalues.internals.script_impl");
const tsickle_style_sheet_impl_4 = goog.requireType("google3.third_party.javascript.safevalues.internals.style_sheet_impl");
const html_impl_1 = goog.require('google3.third_party.javascript.safevalues.internals.html_impl');
const resource_url_impl_1 = goog.require('google3.third_party.javascript.safevalues.internals.resource_url_impl');
const script_impl_1 = goog.require('google3.third_party.javascript.safevalues.internals.script_impl');
const style_sheet_impl_1 = goog.require('google3.third_party.javascript.safevalues.internals.style_sheet_impl');
/**
 * IncorrectTypeError represents an error that can occur with {\@link
 * fetchResourceUrl} when the server responds with a content type that would be
 * unsafe for the type of content requested.
 * @extends {Error}
 */
class IncorrectContentTypeError extends Error {
    /**
     * @public
     * @param {string} url
     * @param {string} typeName
     * @param {string} contentType
     */
    constructor(url, typeName, contentType) {
        super(`${url} was requested as a ${typeName}, but the response Content-Type, "${contentType} is not appropriate for this type of content.`);
        this.url = url;
        this.typeName = typeName;
        this.contentType = contentType;
    }
}
exports.IncorrectContentTypeError = IncorrectContentTypeError;
/* istanbul ignore if */
if (false) {
    /**
     * @const {string}
     * @public
     */
    IncorrectContentTypeError.prototype.url;
    /**
     * @const {string}
     * @public
     */
    IncorrectContentTypeError.prototype.typeName;
    /**
     * @const {string}
     * @public
     */
    IncorrectContentTypeError.prototype.contentType;
}
/**
 * A SafeResponse is the response value of a {\@link fetchResourceUrl} call.
 * @record
 */
function SafeResponse() { }
exports.SafeResponse = SafeResponse;
/* istanbul ignore if */
if (false) {
    /**
     * html returns this {\@link Response} as a SafeHtml, or throws an error.
     * @public
     * @return {!Promise<!tsickle_html_impl_1.SafeHtml>}
     */
    SafeResponse.prototype.html = function () { };
    /**
     * script returns the fetch response as a {\@link SafeScript}, or returns an
     * error.
     * @public
     * @return {!Promise<!tsickle_script_impl_3.SafeScript>}
     */
    SafeResponse.prototype.script = function () { };
    /**
     * styleSheet returns the fetch response as a {\@link SafeStyleSheet}, or
     * returns an error.
     * @public
     * @return {!Promise<!tsickle_style_sheet_impl_4.SafeStyleSheet>}
     */
    SafeResponse.prototype.styleSheet = function () { };
}
/**
 * This causes the compiler to better optimize `createHtmlInternal` calls, where
 * previously it was building and including the whole module without
 * tree-shaking.
 *
 * TODO(b/254093954) find out why this is and remove this workaround.  // LINE-INTERNAL
 * @param {string} html
 * @return {!tsickle_html_impl_1.SafeHtml}
 */
function privatecreateHtmlInternal(html) {
    return (0, html_impl_1.createHtmlInternal)(html);
}
/**
 * fetches a given {\@link TrustedResourceUrl},
 * and returns a value which can be turned into a given safe type.
 * @param {!tsickle_resource_url_impl_2.TrustedResourceUrl} u
 * @param {(undefined|!RequestInit)=} init
 * @return {!Promise<!SafeResponse>}
 */
async function fetchResourceUrl(u, init) {
    /** @type {!Response} */
    const response = await fetch((0, resource_url_impl_1.unwrapResourceUrl)(u).toString(), init);
    /**
     * the content type type of the response, excluding any MIME params
     * @type {(undefined|string)}
     */
    const mimeType = response.headers
        .get('Content-Type')
        ?.split(';', 2)?.[0]
        ?.toLowerCase();
    return {
        /**
         * @public
         * @return {!Promise<!tsickle_html_impl_1.SafeHtml>}
         */
        async html() {
            if (mimeType !== 'text/html') {
                throw new IncorrectContentTypeError(response.url, 'SafeHtml', 'text/html');
            }
            /** @type {string} */
            const text = await response.text();
            return privatecreateHtmlInternal(text);
        },
        /**
         * @public
         * @return {!Promise<!tsickle_script_impl_3.SafeScript>}
         */
        async script() {
            // see:
            // https://html.spec.whatwg.org/multipage/scripting.html#scriptingLanguages
            if (mimeType !== 'text/javascript' &&
                mimeType !== 'application/javascript') {
                throw new IncorrectContentTypeError(response.url, 'SafeScript', 'text/javascript');
            }
            /** @type {string} */
            const text = await response.text();
            return (0, script_impl_1.createScriptInternal)(text);
        },
        /**
         * @public
         * @return {!Promise<!tsickle_style_sheet_impl_4.SafeStyleSheet>}
         */
        async styleSheet() {
            if (mimeType !== 'text/css') {
                throw new IncorrectContentTypeError(response.url, 'SafeStyleSheet', 'text/css');
            }
            /** @type {string} */
            const text = await response.text();
            return (0, style_sheet_impl_1.createStyleSheetInternal)(text);
        },
    };
}
exports.fetchResourceUrl = fetchResourceUrl;
