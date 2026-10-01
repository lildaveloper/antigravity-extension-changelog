/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/javascript/safevalues/dom/globals/location.ts
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
goog.module('google3.third_party.javascript.safevalues.dom.globals.location');
var module = module || { id: 'third_party/javascript/safevalues/dom/globals/location.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_url_builders_1 = goog.requireType("google3.third_party.javascript.safevalues.builders.url_builders");
const tsickle_url_impl_2 = goog.requireType("google3.third_party.javascript.safevalues.internals.url_impl");
const url_builders_1 = goog.require('google3.third_party.javascript.safevalues.builders.url_builders');
/**
 * setLocationHref safely sets {\@link Location.href} on the given
 * {\@link Location} with given {\@link Url}.
 * @param {!Location} loc
 * @param {(string|!tsickle_url_impl_2.SafeUrl)} url
 * @return {void}
 */
function setLocationHref(loc, url) {
    /** @type {(undefined|string)} */
    const sanitizedUrl = (0, url_builders_1.unwrapUrlOrSanitize)(url);
    if (sanitizedUrl !== undefined) {
        loc.href = sanitizedUrl;
    }
}
exports.setLocationHref = setLocationHref;
/**
 * locationReplace safely calls {\@link Location.replace} on the given
 * {\@link Location} with given {\@link Url}.
 * @param {!Location} loc
 * @param {(string|!tsickle_url_impl_2.SafeUrl)} url
 * @return {void}
 */
function locationReplace(loc, url) {
    /** @type {(undefined|string)} */
    const sanitizedUrl = (0, url_builders_1.unwrapUrlOrSanitize)(url);
    if (sanitizedUrl !== undefined) {
        loc.replace(sanitizedUrl);
    }
}
exports.locationReplace = locationReplace;
/**
 * locationAssign safely calls {\@link Location.assign} on the given
 * {\@link Location} with given {\@link Url}.
 * @param {!Location} loc
 * @param {(string|!tsickle_url_impl_2.SafeUrl)} url
 * @return {void}
 */
function locationAssign(loc, url) {
    /** @type {(undefined|string)} */
    const sanitizedUrl = (0, url_builders_1.unwrapUrlOrSanitize)(url);
    if (sanitizedUrl !== undefined) {
        loc.assign(sanitizedUrl);
    }
}
exports.locationAssign = locationAssign;
