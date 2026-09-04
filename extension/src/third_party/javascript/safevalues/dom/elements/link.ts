/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/javascript/safevalues/dom/elements/link.ts
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
goog.module('google3.third_party.javascript.safevalues.dom.elements.link');
var module = module || { id: 'third_party/javascript/safevalues/dom/elements/link.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_url_builders_1 = goog.requireType("google3.third_party.javascript.safevalues.builders.url_builders");
const tsickle_resource_url_impl_2 = goog.requireType("google3.third_party.javascript.safevalues.internals.resource_url_impl");
const tsickle_url_impl_3 = goog.requireType("google3.third_party.javascript.safevalues.internals.url_impl");
const url_builders_1 = goog.require('google3.third_party.javascript.safevalues.builders.url_builders');
const resource_url_impl_1 = goog.require('google3.third_party.javascript.safevalues.internals.resource_url_impl');
/* Values from google3/webutil/html/types/codegen/html5_contract.textpb */ 
// LINE-INTERNAL
/** @type {!Array<?>} */
const SAFE_URL_REL_VALUES = (/** @type {!Array<?>} */ ([
    'alternate',
    'author',
    'bookmark',
    'canonical',
    'cite',
    'help',
    'icon',
    'license',
    'modulepreload',
    'next',
    'prefetch',
    'dns-prefetch',
    'prerender',
    'preconnect',
    'preload',
    'prev',
    'search',
    'subresource',
]));
/**
 * Values of the "rel" attribute when "href" should accept `SafeUrl` instead of
 * `TrustedResourceUrl`.
 * @typedef {string}
 */
exports.SafeUrlRelTypes;
/**
 * Values of the "rel" attribute when "href" should accept a
 * `TrustedResourceUrl`. Note that this list is not exhaustive and is here just
 * for better documentation, any unknown "rel" values will also require passing
 * a `TrustedResourceUrl` "href".
 * @typedef {string}
 */
exports.TrustedResourecUrlRelTypes;
/**
 * @param {!HTMLLinkElement} link
 * @param {(string|!tsickle_resource_url_impl_2.TrustedResourceUrl|!tsickle_url_impl_3.SafeUrl)} url
 * @param {string} rel
 * @return {void}
 */
function setLinkHrefAndRel(link, url, rel) {
    if ((0, resource_url_impl_1.isResourceUrl)(url)) {
        setLinkWithResourceUrlHrefAndRel(link, url, rel);
        return;
    }
    else {
        if (((/** @type {!ReadonlyArray<string>} */ (SAFE_URL_REL_VALUES))).indexOf(rel) === -1) {
            throw new Error(`TrustedResourceUrl href attribute required with rel="${rel}"`);
        }
        /** @type {(undefined|string)} */
        const sanitizedUrl = (0, url_builders_1.unwrapUrlOrSanitize)(url);
        if (sanitizedUrl === undefined) {
            return;
        }
        link.href = sanitizedUrl;
    }
    link.rel = rel;
}
exports.setLinkHrefAndRel = setLinkHrefAndRel;
/**
 * Safely sets a link element's "href" property using a TrustedResourceUrl and
 * an arbitrary "rel" value. It is recommended to use this method when the url
 * is always a TrustedResourceUrl, since the resulting binary size will be
 * smaller.
 * @param {!HTMLLinkElement} link
 * @param {!tsickle_resource_url_impl_2.TrustedResourceUrl} url
 * @param {string} rel
 * @return {void}
 */
function setLinkWithResourceUrlHrefAndRel(link, url, rel) {
    link.href = (0, resource_url_impl_1.unwrapResourceUrl)(url).toString();
    link.rel = rel;
}
exports.setLinkWithResourceUrlHrefAndRel = setLinkWithResourceUrlHrefAndRel;
