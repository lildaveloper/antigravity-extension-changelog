/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/javascript/safevalues/builders/resource_url_builders.ts
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
goog.module('google3.third_party.javascript.safevalues.builders.resource_url_builders');
var module = module || { id: 'third_party/javascript/safevalues/builders/resource_url_builders.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_dev_1 = goog.requireType("google3.third_party.javascript.safevalues.environment.dev");
const tsickle_resource_url_impl_2 = goog.requireType("google3.third_party.javascript.safevalues.internals.resource_url_impl");
const tsickle_script_impl_3 = goog.requireType("google3.third_party.javascript.safevalues.internals.script_impl");
const tsickle_string_literal_4 = goog.requireType("google3.third_party.javascript.safevalues.internals.string_literal");
const dev_1 = goog.require('google3.third_party.javascript.safevalues.environment.dev');
const resource_url_impl_1 = goog.require('google3.third_party.javascript.safevalues.internals.resource_url_impl');
const script_impl_1 = goog.require('google3.third_party.javascript.safevalues.internals.script_impl');
const string_literal_1 = goog.require('google3.third_party.javascript.safevalues.internals.string_literal');
/**
 * Type that we know how to interpolate
 * @typedef {(string|number|boolean)}
 */
var Primitive;
/**
 * Check whether the base url contains a valid origin,
 *
 * A string for an origin must contain only alphanumeric or any of the
 * following: `-.:`, and must not be an IP address. Remember that, as per the
 * documentation for TrustedResourceUrl, the origin must be trustworthy.
 *
 * @param {string} base The base url that contains an origin.
 * @return {boolean}
 */
function hasValidOrigin(base) {
    if (!(/^https:\/\//.test(base) || /^\/\//.test(base))) {
        return false;
    }
    /** @type {number} */
    const originStart = base.indexOf('//') + 2;
    /** @type {number} */
    const originEnd = base.indexOf('/', originStart);
    // If the base url only contains the prefix (e.g. //), or the slash
    // for the origin is right after the prefix (e.g. ///), the origin is
    // missing.
    if (originEnd <= originStart) {
        throw new Error(`Can't interpolate data in a url's origin, ` +
            `Please make sure to fully specify the origin, terminated with '/'.`);
    }
    /** @type {string} */
    const origin = base.substring(originStart, originEnd);
    if (!/^[0-9a-z.:-]+$/i.test(origin)) {
        throw new Error('The origin contains unsupported characters.');
    }
    if (!/^[^:]*(:[0-9]+)?$/i.test(origin)) {
        throw new Error('Invalid port number.');
    }
    if (!/(^|\.)[a-z][^.]*$/i.test(origin)) {
        throw new Error('The top-level domain must start with a letter.');
    }
    return true;
}
/**
 * Check whether the base url contains a valid about url at its beginning.
 *
 * An about url is either exactly 'about:blank' or 'about:blank#<str>' where
 * <str> can be an arbitrary string.
 *
 * @param {string} base The base url.
 * @return {boolean}
 */
function isValidAboutUrl(base) {
    if (!/^about:blank/.test(base)) {
        return false;
    }
    if (base !== 'about:blank' && !/^about:blank#/.test(base)) {
        throw new Error('The about url is invalid.');
    }
    return true;
}
/**
 * Check whether the base url contains a valid path start at its beginning.
 *
 * A valid path start is either a '/' or a '/' followed by at least one
 * character that is not '/' or '\'.
 *
 * @param {string} base The base url.
 * @return {boolean}
 */
function isValidPathStart(base) {
    if (!/^\//.test(base)) {
        return false;
    }
    if (base === '/' ||
        (base.length > 1 && base[1] !== '/' && base[1] !== '\\')) {
        return true;
    }
    throw new Error('The path start in the url is invalid.');
}
/**
 * Check whether the base url contains a valid relative path start at its
 * beginning.
 *
 * A valid relative path start is a non empty string that has no ':', '/' nor
 * '\', and that is followed by a '/'.
 *
 * @param {string} base The base url.
 * @return {boolean}
 */
function isValidRelativePathStart(base) {
    // Using the RegExp syntax as the native JS RegExp syntax is not well handled
    // by some downstream bundlers with this regex.
    return new RegExp('^[^:\\s\\\\/]+/').test(base);
}
/**
 * @record
 */
function UrlSegments() { }
/* istanbul ignore if */
if (false) {
    /**
     * @const {string}
     * @public
     */
    UrlSegments.prototype.urlPath;
    /**
     * @const {string}
     * @public
     */
    UrlSegments.prototype.params;
    /**
     * @const {string}
     * @public
     */
    UrlSegments.prototype.fragment;
}
/**
 * Splits an url into segments using '?' and '#' delimiters.
 *
 * The URL can later be put back together by concatenating the returned segments
 * like: path + params + hash. Note that the delimiters '?' and '#' will
 * already be included in 'params' and 'hash' values respectively when these are
 * not empty.
 *
 * @param {string} url The url to split.
 * @return {!UrlSegments}
 */
function getUrlSegments(url) {
    /** @type {!Array<string>} */
    const parts = url.split(/[?#]/);
    /** @type {string} */
    const params = /[?]/.test(url) ? '?' + parts[1] : '';
    /** @type {string} */
    const fragment = /[#]/.test(url) ? '#' + (params ? parts[2] : parts[1]) : '';
    return { urlPath: parts[0], params, fragment };
}
/**
 * Builds TrustedResourceUrl from a template literal.
 *
 * This factory is a template literal tag function. It should be called with
 * a template literal, with or without embedded expressions. For example,
 *               trustedResourceUrl`//example.com/${bar}`;
 * or
 *               trustedResourceUrl`//example.com`;
 *
 * When this function is called with a template literal without any embedded
 * expressions, the template string may contain anything as the whole URL is
 * a compile-time string constant.
 *
 * When this function is called with a template literal that contains embedded
 * expressions, the template must start with one of the following:
 * - `https://<origin>/`
 * - `//<origin>/`
 * - `/<pathStart>`
 * - `<relativePathStart>/`
 * - `about:blank`
 * - `data:`
 *
 * `<origin>` must contain only alphanumeric or any of the following: `-.:`.
 * Remember that, as per the documentation for TrustedResourceUrl, the origin
 * must be trustworthy. An origin of "example.com" could be set with this
 * method, but would tie the security of your site to the security of
 * example.com. Similarly, formats that potentially cover redirects hosted
 * on a trusted origin are problematic, since that could lead to untrusted
 * origins.
 *
 * `<pathStart>` is either an empty string, or a non empty string that does not
 * start with '/' or '\'.
 * In other words, `/<pathStart>` is either a '/' or a
 * '/' followed by at least one character that is not '/' or '\'.
 *
 * `<relativePathStart> is a non empty string that has no ':', '/' nor '\'.
 *
 * `data:` (data URL) does not allow embedded expressions in the template
 * literal input.
 *
 * All embedded expressions are URL encoded when they are interpolated. Do not
 * embed expressions that are already URL encoded as they will be double encoded
 * by the builder.
 *
 * @param {!TemplateStringsArray} templateObj This contains the literal part of the template literal.
 * @param {...(string|number|boolean)} rest This represents the template's embedded expressions.
 * @return {!tsickle_resource_url_impl_2.TrustedResourceUrl}
 */
function trustedResourceUrl(templateObj, ...rest) {
    // Check if templateObj is actually from a template literal.
    if (dev_1.DEV_MODE) {
        (0, string_literal_1.assertIsTemplateObject)(templateObj, rest.length);
    }
    if (rest.length === 0) {
        return (0, resource_url_impl_1.createResourceUrlInternal)(templateObj[0]);
    }
    /** @type {string} */
    const base = templateObj[0].toLowerCase();
    if (dev_1.DEV_MODE) {
        if (/^data:/.test(base)) {
            throw new Error('Data URLs cannot have expressions in the template literal input.');
        }
        if (!hasValidOrigin(base) &&
            !isValidPathStart(base) &&
            !isValidRelativePathStart(base) &&
            !isValidAboutUrl(base)) {
            throw new Error('Trying to interpolate expressions in an unsupported url format.');
        }
    }
    /** @type {string} */
    let url = templateObj[0];
    for (let i = 0; i < rest.length; i++) {
        url += encodeURIComponent(rest[i]) + templateObj[i + 1];
    }
    return (0, resource_url_impl_1.createResourceUrlInternal)(url);
}
exports.trustedResourceUrl = trustedResourceUrl;
/**
 * Similar to iterable, but using the concrete types so we don't rely on the
 * iterable protocol, which needs a poyfill in ES5
 * @typedef {(!ReadonlyMap<string, ?>|!ReadonlyArray<!Array<?>>|?)}
 */
var IterableEntries;
/** @typedef {(!ReadonlyMap<string, (undefined|null|string|number|boolean|!ReadonlyArray<(undefined|null|string|number|boolean)>)>|!ReadonlyArray<!Array<?>>|?|!ReadonlyMap<string, string>|!URLSearchParams)} */
var SearchParams;
/**
 * Creates a new TrustedResourceUrl with params to replace the URL's existing
 * search parameters.
 *
 * @param {!tsickle_resource_url_impl_2.TrustedResourceUrl} trustedUrl
 * @param {(!ReadonlyMap<string, (undefined|null|string|number|boolean|!ReadonlyArray<(undefined|null|string|number|boolean)>)>|!ReadonlyArray<!Array<?>>|?|!ReadonlyMap<string, string>|!URLSearchParams)} params What to add to the URL. Parameters with value `null` or
 * `undefined` are skipped. Both keys and values will be encoded. Do not pass
 * pre-encoded values as this will result them being double encoded. If the
 * value is an array then the same parameter is added for every element in the
 * array.
 * @return {!tsickle_resource_url_impl_2.TrustedResourceUrl}
 */
function replaceParams(trustedUrl, params) {
    /** @type {!UrlSegments} */
    const urlSegments = getUrlSegments((0, resource_url_impl_1.unwrapResourceUrl)(trustedUrl).toString());
    return appendParamsInternal(urlSegments.urlPath, '', urlSegments.fragment, params);
}
exports.replaceParams = replaceParams;
/**
 * Creates a new TrustedResourceUrl with params added to the URL's search
 * parameters.
 *
 * @param {!tsickle_resource_url_impl_2.TrustedResourceUrl} trustedUrl
 * @param {(!ReadonlyMap<string, (undefined|null|string|number|boolean|!ReadonlyArray<(undefined|null|string|number|boolean)>)>|!ReadonlyArray<!Array<?>>|?|!ReadonlyMap<string, string>|!URLSearchParams)} params What to add to the URL. Parameters with value `null` or
 * `undefined` are skipped. Both keys and values will be encoded. Do not pass
 * pre-encoded values as this will result them being double encoded. If the
 * value is an array then the same parameter is added for every element in the
 * array.
 * @return {!tsickle_resource_url_impl_2.TrustedResourceUrl}
 */
function appendParams(trustedUrl, params) {
    /** @type {!UrlSegments} */
    const urlSegments = getUrlSegments((0, resource_url_impl_1.unwrapResourceUrl)(trustedUrl).toString());
    return appendParamsInternal(urlSegments.urlPath, urlSegments.params, urlSegments.fragment, params);
}
exports.appendParams = appendParams;
/**
 * @param {string} path
 * @param {string} params
 * @param {string} hash
 * @param {(!ReadonlyMap<string, (undefined|null|string|number|boolean|!ReadonlyArray<(undefined|null|string|number|boolean)>)>|!ReadonlyArray<!Array<?>>|?|!ReadonlyMap<string, string>|!URLSearchParams)} newParams
 * @return {!tsickle_resource_url_impl_2.TrustedResourceUrl}
 */
function appendParamsInternal(path, params, hash, newParams) {
    /** @type {string} */
    let separator = params.length ? '&' : '?';
    /**
     * @param {(undefined|null|string|number|boolean|!ReadonlyArray<(undefined|null|string|number|boolean)>)} value
     * @param {string} key
     * @return {void}
     */
    function addParam(value, key) {
        if (value == null) {
            return;
        }
        if (isArray(value)) {
            // tslint:disable-next-line:g3-no-void-expression
            (/** @type {!ReadonlyArray<(undefined|null|string|number|boolean)>} */ (value)).forEach((/**
             * @param {(undefined|null|string|number|boolean)} v
             * @return {void}
             */
            (v) => addParam(v, key)));
        }
        else {
            params +=
                separator + encodeURIComponent(key) + '=' + encodeURIComponent(value);
            separator = '&';
        }
    }
    if (isPlainObject(newParams)) {
        newParams = Object.entries(newParams);
    }
    // Avoids for-of and/or Array.from which has a big polyfill in ES5.
    if (isArray(newParams)) {
        // tslint:disable-next-line:g3-no-void-expression
        (/** @type {!ReadonlyArray<!Array<?>>} */ (newParams)).forEach((/**
         * @param {!Array<?>} pair
         * @return {void}
         */
        (pair) => addParam(pair[1], pair[0])));
    }
    else {
        // tslint:disable-next-line:g3-no-void-expression
        (/** @type {(!ReadonlyMap<string, (undefined|null|string|number|boolean|!ReadonlyArray<(undefined|null|string|number|boolean)>)>|!ReadonlyMap<string, string>|!URLSearchParams)} */ (newParams)).forEach(addParam);
    }
    return (0, resource_url_impl_1.createResourceUrlInternal)(path + params + hash);
}
/**
 * @template T
 * @param {*} x
 * @return {boolean}
 */
function isArray(x) {
    return Array.isArray(x);
}
/**
 * @template T
 * @param {(!Object|?)} x
 * @return {boolean}
 */
function isPlainObject(x) {
    return x.constructor === Object;
}
/** @type {!RegExp} */
const BEFORE_FRAGMENT_REGEXP = /[^#]*/;
/**
 * Creates a new TrustedResourceUrl based on an existing one but with the
 * addition of a fragment (the part after `#`). If the URL already has a
 * fragment, it is replaced with the new one.
 * @param {!tsickle_resource_url_impl_2.TrustedResourceUrl} trustedUrl
 * @param {string} fragment The fragment to add to the URL, verbatim, without the leading
 * `#`. No additional escaping is applied.
 * @return {!tsickle_resource_url_impl_2.TrustedResourceUrl}
 */
function replaceFragment(trustedUrl, fragment) {
    /** @type {string} */
    const urlString = (0, resource_url_impl_1.unwrapResourceUrl)(trustedUrl).toString();
    return (0, resource_url_impl_1.createResourceUrlInternal)((/** @type {!RegExpExecArray} */ (BEFORE_FRAGMENT_REGEXP.exec(urlString)))[0] +
        (fragment.trim() ? '#' + fragment : ''));
}
exports.replaceFragment = replaceFragment;
/**
 * Creates a new TrustedResourceUrl based on an existing one with a single
 * subpath segment added to the end of the existing path and prior to any query
 * parameters and/or fragments that already exist in the URL.
 * @param {!tsickle_resource_url_impl_2.TrustedResourceUrl} trustedUrl
 * @param {string} pathSegment The singular sub path being added to the URL. Do not pass
 *     a pre-encoded value as this will result in it being double encoded.
 * @return {!tsickle_resource_url_impl_2.TrustedResourceUrl}
 */
function appendPathSegment(trustedUrl, pathSegment) {
    /** @type {!UrlSegments} */
    const urlSegments = getUrlSegments((0, resource_url_impl_1.unwrapResourceUrl)(trustedUrl).toString());
    /** @type {string} */
    const separator = urlSegments.urlPath.slice(-1) === '/' ? '' : '/';
    /** @type {string} */
    const newPath = urlSegments.urlPath + separator + encodeURIComponent(pathSegment);
    return (0, resource_url_impl_1.createResourceUrlInternal)(newPath + urlSegments.params + urlSegments.fragment);
}
exports.appendPathSegment = appendPathSegment;
/**
 * Creates a `TrustedResourceUrl` by generating a `Blob` from a
 * `SafeScript` and then calling `URL.createObjectURL` with that `Blob`.
 *
 * Caller must call `URL.revokeObjectURL()` on the stringified url to
 * release the underlying `Blob`.
 * @param {!tsickle_script_impl_3.SafeScript} safeScript
 * @return {!tsickle_resource_url_impl_2.TrustedResourceUrl}
 */
function objectUrlFromScript(safeScript) {
    /** @type {string} */
    const scriptContent = (0, script_impl_1.unwrapScript)(safeScript).toString();
    /** @type {!Blob} */
    const blob = new Blob([scriptContent], { type: 'text/javascript' });
    return (0, resource_url_impl_1.createResourceUrlInternal)(URL.createObjectURL(blob));
}
exports.objectUrlFromScript = objectUrlFromScript;
/**
 * A function to safely retrieve the base URI from the Window object and set it
 * at the beginning of a given path-relative (starts with "/") resource url.
 *
 * @param {!tsickle_resource_url_impl_2.TrustedResourceUrl} pathRelativeUrl The resource to which the origin shall be prepended.
 * @return {!tsickle_resource_url_impl_2.TrustedResourceUrl}
 */
function toAbsoluteResourceUrl(pathRelativeUrl) {
    /** @type {string} */
    const originalUrl = (0, resource_url_impl_1.unwrapResourceUrl)(pathRelativeUrl).toString();
    /** @type {!URL} */
    const qualifiedUrl = new URL(originalUrl, window.document.baseURI);
    return (0, resource_url_impl_1.createResourceUrlInternal)(qualifiedUrl.toString());
}
exports.toAbsoluteResourceUrl = toAbsoluteResourceUrl;
