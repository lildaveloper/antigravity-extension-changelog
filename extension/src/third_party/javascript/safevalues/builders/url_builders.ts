/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/javascript/safevalues/builders/url_builders.ts
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
goog.module('google3.third_party.javascript.safevalues.builders.url_builders');
var module = module || { id: 'third_party/javascript/safevalues/builders/url_builders.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_dev_1 = goog.requireType("google3.third_party.javascript.safevalues.environment.dev");
const tsickle_pure_2 = goog.requireType("google3.third_party.javascript.safevalues.internals.pure");
const tsickle_resource_url_impl_3 = goog.requireType("google3.third_party.javascript.safevalues.internals.resource_url_impl");
const tsickle_string_literal_4 = goog.requireType("google3.third_party.javascript.safevalues.internals.string_literal");
const tsickle_url_impl_5 = goog.requireType("google3.third_party.javascript.safevalues.internals.url_impl");
const dev_1 = goog.require('google3.third_party.javascript.safevalues.environment.dev');
// BEGIN-INTERNAL
const pure_1 = goog.require('google3.third_party.javascript.safevalues.internals.pure');
const resource_url_impl_1 = goog.require('google3.third_party.javascript.safevalues.internals.resource_url_impl');
const string_literal_1 = goog.require('google3.third_party.javascript.safevalues.internals.string_literal');
const url_impl_1 = goog.require('google3.third_party.javascript.safevalues.internals.url_impl');
// END-INTERNAL
// BEGIN-INTERNAL
/**
 * A pattern that matches safe MIME types. Only matches image, video, audio and
 * application/octet-stream types, with some parameter support (most notably, we
 * haven't implemented the more complex parts like %-encoded characters or
 * non-alphanumerical ones for simplicity's sake). Also, the specs are fairly
 * complex, and they don't necessarily agree with Chrome on some aspects, and so
 * we settled on a subset where the behavior makes sense to all parties
 * involved.
 * Use application/octet-stream for blobs that are meant to be downloaded.
 *
 * The spec is available at https://mimesniff.spec.whatwg.org/ (and see
 * https://tools.ietf.org/html/rfc2397 for data: urls, which override some of
 * it).
 * @param {string} mimeType
 * @return {boolean}
 */
function isSafeMimeType(mimeType) {
    if (mimeType.toLowerCase() === 'application/octet-stream') {
        return true;
    }
    /** @type {(null|!RegExpMatchArray)} */
    const match = mimeType.match(/^([^;]+)(?:;\w+=(?:\w+|"[\w;,= ]+"))*$/i);
    return (match?.length === 2 &&
        (isSafeImageMimeType(match[1]) ||
            isSafeVideoMimeType(match[1]) ||
            isSafeAudioMimeType(match[1]) ||
            isSafeFontMimeType(match[1])));
}
/**
 * @param {string} mimeType
 * @return {boolean}
 */
function isSafeImageMimeType(mimeType) {
    return /^image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp|x-icon|heic|heif|avif|x-ms-bmp)$/i.test(mimeType);
}
/**
 * @param {string} mimeType
 * @return {boolean}
 */
function isSafeVideoMimeType(mimeType) {
    return /^video\/(?:3gpp|avi|mpeg|mpg|mp4|ogg|webm|x-flv|matroska|x-matroska|quicktime|x-ms-wmv)$/i.test(mimeType);
}
/**
 * @param {string} mimeType
 * @return {boolean}
 */
function isSafeAudioMimeType(mimeType) {
    return /^audio\/(?:3gpp2|3gpp|aac|amr|L16|midi|mp3|mp4|mpeg|oga|ogg|opus|x-m4a|matroska|x-matroska|x-wav|wav|webm)$/i.test(mimeType);
}
/**
 * @param {string} mimeType
 * @return {boolean}
 */
function isSafeFontMimeType(mimeType) {
    return /^font\/[\w-]+$/i.test(mimeType);
}
/**
 * Interface representing a scheme that sanitizeUrl can optionally accommodate.
 * Even though this interface could be implemented by user code, the code will
 * ignore any implementation that doesn't come from this file.
 * @record
 */
function Scheme() { }
exports.Scheme = Scheme;
/* istanbul ignore if */
if (false) {
    /**
     * @public
     * @param {string} url
     * @return {boolean}
     */
    Scheme.prototype.isValid = function (url) { };
}
/**
 * @implements {Scheme}
 */
class SchemeImpl {
    /**
     * @public
     * @param {function(string): boolean} isValid
     */
    constructor(isValid) {
        this.isValid = isValid;
    }
}
/* istanbul ignore if */
if (false) {
    /**
     * @const {function(string): boolean}
     * @public
     */
    SchemeImpl.prototype.isValid;
}
/**
 * @param {!Scheme} scheme
 * @return {boolean}
 */
function isValidScheme(scheme) {
    return scheme instanceof SchemeImpl;
}
/**
 * @param {string} scheme
 * @return {!Scheme}
 */
function simpleScheme(scheme) {
    return new SchemeImpl((/**
     * @param {string} url
     * @return {boolean}
     */
    (url) => {
        return url.substr(0, scheme.length + 1).toLowerCase() === scheme + ':';
    }));
}
/** @type {!Scheme} */
const RELATIVE_SCHEME = new SchemeImpl((/**
 * @param {string} url
 * @return {boolean}
 */
(url) => /^[^:]*([/?#]|$)/.test(url)));
/** @type {!Scheme} */
const CALLTO_SCHEME = new SchemeImpl((/**
 * @param {string} url
 * @return {boolean}
 */
(url) => /^callto:\+?\d*$/i.test(url)));
/** @type {!Scheme} */
const SSH_SCHEME = new SchemeImpl((/**
 * @param {string} url
 * @return {boolean}
 */
(url) => url.indexOf('ssh://') === 0));
/** @type {!Scheme} */
const EXTENSION_SCHEME = new SchemeImpl((/**
 * @param {string} url
 * @return {boolean}
 */
(url) => {
    return (url.indexOf('chrome-extension://') === 0 ||
        url.indexOf('moz-extension://') === 0 ||
        url.indexOf('ms-browser-extension://') === 0 ||
        url.indexOf('safari-web-extension://') === 0);
}));
/** @type {!Scheme} */
const SIP_SCHEME = new SchemeImpl((/**
 * @param {string} url
 * @return {boolean}
 */
(url) => {
    return url.indexOf('sip:') === 0 || url.indexOf('sips:') === 0;
}));
// This used to be an enum, we preserved the name avoid changing the API.
// tslint:disable:enforce-name-casing
/**
 * The list of schemes sanitizeUrl can optionally accommodate.
 * @type {{TEL: !Scheme, CALLTO: !Scheme, SSH: !Scheme, RTSP: !Scheme, DATA: !Scheme, HTTP: !Scheme, HTTPS: !Scheme, EXTENSION: !Scheme, FTP: !Scheme, RELATIVE: !Scheme, MAILTO: !Scheme, INTENT: !Scheme, MARKET: !Scheme, ITMS: !Scheme, ITMS_APPSS: !Scheme, ITMS_SERVICES: !Scheme, FACEBOOK_MESSENGER: !Scheme, WHATSAPP: !Scheme, SIP: !Scheme, SMS: !Scheme, VND_YOUTUBE: !Scheme, GOOGLEHOME: !Scheme, GOOGLEHOMESDK: !Scheme, LINE: !Scheme}}
 */
exports.SanitizableUrlScheme = {
    TEL: simpleScheme('tel'),
    CALLTO: CALLTO_SCHEME,
    SSH: SSH_SCHEME,
    RTSP: simpleScheme('rtsp'),
    DATA: simpleScheme('data'),
    HTTP: simpleScheme('http'),
    HTTPS: simpleScheme('https'),
    EXTENSION: EXTENSION_SCHEME,
    FTP: simpleScheme('ftp'),
    RELATIVE: RELATIVE_SCHEME,
    MAILTO: simpleScheme('mailto'),
    INTENT: simpleScheme('intent'),
    MARKET: simpleScheme('market'),
    ITMS: simpleScheme('itms'),
    ITMS_APPSS: simpleScheme('itms-appss'),
    ITMS_SERVICES: simpleScheme('itms-services'),
    FACEBOOK_MESSENGER: simpleScheme('fb-messenger'),
    WHATSAPP: simpleScheme('whatsapp'),
    SIP: SIP_SCHEME,
    SMS: simpleScheme('sms'),
    VND_YOUTUBE: simpleScheme('vnd.youtube'),
    GOOGLEHOME: simpleScheme('googlehome'),
    GOOGLEHOMESDK: simpleScheme('googlehomesdk'),
    LINE: simpleScheme('line'),
};
// tslint:enable:enforce-name-casing
/**
 * List of schemes used by default.
 * @type {!Array<!Scheme>}
 */
const DEFAULT_SCHEMES = [
    exports.SanitizableUrlScheme.DATA,
    exports.SanitizableUrlScheme.HTTP,
    exports.SanitizableUrlScheme.HTTPS,
    exports.SanitizableUrlScheme.MAILTO,
    exports.SanitizableUrlScheme.FTP,
    exports.SanitizableUrlScheme.RELATIVE,
];
/**
 * Creates a SafeUrl object from a string `url` by sanitizing it.
 *
 * Note: If your url is partially known statically, you should prefer using the
 * `safeUrl` function directly.
 *
 * The input string is validated against the set of `allowedSchemes`, which
 * defaults to a set of commonly used safe URL schemes. If validation fails,
 * `undefined` is returned.
 *
 * If no `allowedSchemes` are passed, the `url` may use the http, https, mailto,
 * ftp or data schemes, or a relative URL (i.e., a URL without a scheme;
 * specifically, a scheme-relative, absolute-path-relative, or path-relative
 * URL).
 *
 * Other supported schemes don't have direct security issues (i.e. no JS
 * execution), but their inherent capabilities are not touched: for instance, if
 * you allow TEL only, you won't get javascript execution, but the resulting
 * link could still potentially be used to call toll numbers.
 * \@google3-ignore-for-3p-optimization-safety {allowedSchemes} Schemes are
 *     defined in this file and can be treated like a token object for the
 *     purposes of this API.
 * @param {(string|!tsickle_url_impl_5.SafeUrl)} url
 * @param {!ReadonlyArray<!Scheme>=} allowedSchemes
 * @return {(undefined|!tsickle_url_impl_5.SafeUrl)}
 */
function trySanitizeUrl(url, allowedSchemes = DEFAULT_SCHEMES) {
    if ((0, url_impl_1.isUrl)(url)) {
        return url;
    }
    // Using simple iteration because the compiler doesn't optimize this well for
    // es5.
    for (let i = 0; i < allowedSchemes.length; ++i) {
        /** @type {!Scheme} */
        const scheme = allowedSchemes[i];
        if (isValidScheme(scheme) && scheme.isValid(url)) {
            return (0, url_impl_1.createUrlInternal)(url);
        }
    }
    return undefined;
}
exports.trySanitizeUrl = trySanitizeUrl;
/**
 * Creates a SafeUrl object from a string `url` by sanitizing it.
 *
 * Works the same way as `trySanitizeUrl`, but returns an innocuous url instead
 * of `undefined`.
 * Triggers the sanitization callbacks if the url is sanitized away (see
 * addJavaScriptUrlSanitizationCallback).
 * \@google3-ignore-for-3p-optimization-safety {allowedSchemes} Schemes are
 *     defined in this file and can be treated like a token object for the
 *     purposes of this API.
 * @param {(string|!tsickle_url_impl_5.SafeUrl)} url
 * @param {!ReadonlyArray<!Scheme>=} allowedSchemes
 * @return {!tsickle_url_impl_5.SafeUrl}
 */
function sanitizeUrl(url, allowedSchemes = DEFAULT_SCHEMES) {
    /** @type {(undefined|!tsickle_url_impl_5.SafeUrl)} */
    const sanitizedUrl = trySanitizeUrl(url, allowedSchemes);
    if (sanitizedUrl === undefined) {
        triggerCallbacks(url.toString());
    }
    return sanitizedUrl || url_impl_1.INNOCUOUS_URL;
}
exports.sanitizeUrl = sanitizeUrl;
/**
 * Creates a SafeUrl object from a Blob or MediaSource. For blobs, the function
 * validates that the Blob's type is amongst the safe MIME types, and throws if
 * that's not the case.
 *
 * Caller must call `URL.revokeObjectUrl()` on the stringified url to
 * release the underlying `Blob`.
 * @param {(!Blob|!MediaSource)} source
 * @return {!tsickle_url_impl_5.SafeUrl}
 */
function objectUrlFromSafeSource(source) {
    // MediaSource support in Safari is limited
    // https://developer.mozilla.org/en-US/docs/Web/API/MediaSource#browser_compatibility
    // MediaSource support in Safari is limited
    // https://developer.mozilla.org/en-US/docs/Web/API/MediaSource#browser_compatibility
    // If we declare ManagedMediaSource or anything in this TS file, it will
    // generate an extern that will be added to all JS files which import this
    // file. We have issues like this before with conflicting externs and it is
    // hard to root cause the issue. So instead we would rather use
    // window['ManagedMediaSource'] directly by casting the window to any.
    // tslint:disable-next-line:no-any
    /** @type {?} */
    const windowAsAny = (/** @type {?} */ (window));
    if ((typeof MediaSource !== 'undefined' && source instanceof MediaSource) ||
        (typeof windowAsAny['ManagedMediaSource'] !== 'undefined' &&
            source instanceof windowAsAny['ManagedMediaSource'])) {
        return (0, url_impl_1.createUrlInternal)(URL.createObjectURL(source));
    }
    /** @type {!Blob} */
    const blob = (/** @type {!Blob} */ (source));
    if (!isSafeMimeType(blob.type)) {
        /** @type {string} */
        let message = '';
        if (dev_1.DEV_MODE) {
            message = `unsafe blob MIME type: ${blob.type}`;
        }
        throw new Error(message);
    }
    return (0, url_impl_1.createUrlInternal)(URL.createObjectURL(blob));
}
exports.objectUrlFromSafeSource = objectUrlFromSafeSource;
/**
 * Creates a SafeUrl object from a MediaSource.
 * @deprecated Use objectUrlFromSafeSource.
 * @param {!MediaSource} media
 * @return {!tsickle_url_impl_5.SafeUrl}
 */
function fromMediaSource(media) {
    // MediaSource support in Safari is limited
    // https://developer.mozilla.org/en-US/docs/Web/API/MediaSource#browser_compatibility
    if (typeof MediaSource !== 'undefined' && media instanceof MediaSource) {
        return (0, url_impl_1.createUrlInternal)(URL.createObjectURL(media));
    }
    /** @type {string} */
    let message = '';
    if (dev_1.DEV_MODE) {
        message = `fromMediaSource only accepts MediaSource instances, but was called with ${media}.`;
    }
    throw new Error(message);
}
exports.fromMediaSource = fromMediaSource;
/**
 * Builds SafeUrl object from a TrustedResourceUrl. This is safe because
 * TrustedResourceUrl is more tightly restricted than SafeUrl.
 * @deprecated Unwrap to string instead. SafeUrl sinks accept string values.
 * @param {!tsickle_resource_url_impl_3.TrustedResourceUrl} url
 * @return {!tsickle_url_impl_5.SafeUrl}
 */
function fromTrustedResourceUrl(url) {
    return (0, url_impl_1.createUrlInternal)((0, resource_url_impl_1.unwrapResourceUrl)(url).toString());
}
exports.fromTrustedResourceUrl = fromTrustedResourceUrl;
/**
 * Checks whether this url prefix contains:
 *  - a fully specified and valid scheme
 *  - a character forcing it to be a relative url
 *
 * Since this function is only called with compile-time constants, we don't need
 * to be as careful as in `sanitizeUrl` and we can just check that the scheme is
 * valid and non-'javascript:'. If we discover other dangerous schemes we want
 * to prevent, we can statically find all instances and refactor them. See
 * https://url.spec.whatwg.org/#url-scheme-string for scheme validation.
 * @param {string} prefix
 * @param {boolean} isWholeUrl
 * @return {boolean}
 */
function isSafeUrlPrefix(prefix, isWholeUrl) {
    /** @type {number} */
    const markerIdx = prefix.search(/[:/?#]/);
    if (markerIdx < 0) {
        // If we don't find a marker, but there is no interpolation, the url is
        // relative
        return isWholeUrl;
    }
    if (prefix.charAt(markerIdx) !== ':') {
        // Relative URL
        return true;
    }
    /** @type {string} */
    const scheme = prefix.substring(0, markerIdx).toLowerCase();
    return /^[a-z][a-z\d+.-]*$/.test(scheme) && scheme !== 'javascript';
}
/**
 * Builds a SafeUrl from a template literal.
 *
 * Use this function if your url has a static prefix containing the whole scheme
 * of the url.
 *
 * This factory is a template literal tag function. It should be called with
 * a template literal, with or without embedded expressions. For example,
 *               safeUrl`./somepath.html`;
 * or
 *               safeUrl`data:text/html;base64,${btoa('<div></div>')}`;
 *
 * To be successfully built, we must ensure that the scheme is correctly defined
 * and not dangerous. In practice this means the first chunk of the template
 * must satisfy one of the following conditions:
 * - Start with an explicit scheme that is valid and is not `javascript`
 *    (e.g. safeUrl`https:${...}`)
 * - Start with a prefix that ensures the url is relative
 *    (e.g. safeUrl`./${...}` or safeUrl`#${...}`)
 * Embedded expressions are interpolated as-is and no URL encoding is applied.
 * \@google3-ignore-for-3p-optimization-safety {rest} This is safe because the
 *     values for rest are only being passed to String().
 * @param {!TemplateStringsArray} templateObj
 * @param {...*} rest
 * @return {!tsickle_url_impl_5.SafeUrl}
 */
function safeUrl(templateObj, ...rest) {
    if (dev_1.DEV_MODE) {
        (0, string_literal_1.assertIsTemplateObject)(templateObj, rest.length);
    }
    /** @type {string} */
    const prefix = templateObj[0];
    if (dev_1.DEV_MODE) {
        if (!isSafeUrlPrefix(prefix, rest.length === 0)) {
            throw new Error(`Trying to interpolate with unsupported prefix: ${prefix}`);
        }
    }
    /** @type {!Array<string>} */
    const urlParts = [prefix];
    for (let i = 0; i < rest.length; i++) {
        urlParts.push(String(rest[i]));
        urlParts.push(templateObj[i + 1]);
    }
    return (0, url_impl_1.createUrlInternal)(urlParts.join(''));
}
exports.safeUrl = safeUrl;
/**
 * @define {boolean}
 */
const ASSUME_IMPLEMENTS_URL_API = goog.define('ASSUME_IMPLEMENTS_URL_API', 
// TODO(b/154845327) narrow this down if earlier featureset years allow,
// if they get defined. FY2020 does NOT include Edge (EdgeHTML), which is
// good as workarounds are needed for spec compliance and a searchParams
// polyfill.
goog.FEATURESET_YEAR >= 2020);
// Tests for URL browser API support. e.g. IE doesn't support it.
/** @type {boolean} */
const supportsURLAPI = (0, pure_1.pure)((/**
 * @return {boolean}
 */
() => {
    if (ASSUME_IMPLEMENTS_URL_API) {
        return true;
    }
    return typeof URL === 'function';
}));
/**
 * @param {string} url
 * @return {(undefined|string)}
 */
function legacyExtractScheme(url) {
    /** @type {!HTMLAnchorElement} */
    const aTag = document.createElement('a');
    try {
        // We don't use the safe wrapper here because we don't want to sanitize the
        // URL (which would lead to a dependency loop anyway). This is safe because
        // this node is NEVER attached to the DOM.
        aTag.href = url;
    }
    catch (e) {
        return undefined;
    }
    // Chrome and Firefox resolve relative scheme to https directly,
    // while IE keeps a ':' or empty string protocol.
    /** @type {string} */
    const protocol = aTag.protocol;
    return protocol === ':' || protocol === '' ? 'https:' : protocol;
}
/** @typedef {function(string): void} */
var JavaScriptUrlSanitizationCallback;
// END-INTERNAL
/**
 * Extracts the scheme from the given URL. If the URL is relative, https: is
 * assumed.
 * @param {string} url The URL to extract the scheme from.
 * @return {(undefined|string)} the URL scheme.
 */
function extractScheme(url) {
    // BEGIN-INTERNAL
    // We defer to the browser URL parsing as much as possible to detect
    // javascript: schemes. However, old browsers like IE don't support it.
    if (!supportsURLAPI) {
        return legacyExtractScheme(url);
    }
    // END-INTERNAL
    /** @type {?} */
    let parsedUrl;
    try {
        parsedUrl = new URL(url);
    }
    catch (e) {
        // According to https://url.spec.whatwg.org/#constructors, the URL
        // constructor with one parameter throws if `url` is not absolute. In this
        // case, we are sure that no explicit scheme (javascript: ) is set.
        // This can also be a URL parsing error, but in this case the URL won't be
        // run anyway.
        return 'https:';
    }
    return (/** @type {!URL} */ (parsedUrl)).protocol;
}
exports.extractScheme = extractScheme;
// We can't use an ES6 Set here because gws somehow depends on this code and
// doesn't want to pay the cost of a polyfill.
/** @type {!Array<string>} */
const ALLOWED_SCHEMES = ['data:', 'http:', 'https:', 'mailto:', 'ftp:'];
/**
 * A pattern that blocks javascript: URLs. Matches
 * (a) Urls with an explicit scheme that is not javascript and that only has
 *     alphanumeric or [.-+_] characters; or
 * (b) Urls with no explicit scheme. The pattern allows the first colon
 *     (`:`) character to appear after one of  the `/` `?` or `#` characters,
 *     which means the colon appears in path, query or fragment part of the URL.
 * @type {!RegExp}
 */
exports.IS_NOT_JAVASCRIPT_URL_PATTERN = /^\s*(?!javascript:)(?:[\w+.-]+:|[^:/?#]*(?:[/?#]|$))/i;
/**
 * Checks whether a urls has a `javascript:` scheme.
 * If the url has a `javascript:` scheme, reports it and returns true.
 * Otherwise, returns false.
 * @param {string} url
 * @return {boolean}
 */
function reportJavaScriptUrl(url) {
    /** @type {boolean} */
    const hasJavascriptUrlScheme = !exports.IS_NOT_JAVASCRIPT_URL_PATTERN.test(url);
    if (hasJavascriptUrlScheme) {
        // BEGIN-EXTERNAL
        // if (DEV_MODE) {
        //   console.error(`A URL with content '${url}' was sanitized away.`);
        // }
        // END-EXTERNAL
        triggerCallbacks(url); // LINE-INTERNAL
    }
    return hasJavascriptUrlScheme;
}
exports.reportJavaScriptUrl = reportJavaScriptUrl;
/**
 * Checks that the URL scheme is not javascript.
 * The URL parsing relies on the URL API in browsers that support it.
 * @param {string} url The URL to sanitize for a SafeUrl sink.
 * @return {(undefined|string)} undefined if url has a javascript: scheme, the original URL
 *     otherwise.
 */
function sanitizeJavaScriptUrl(url) {
    if (reportJavaScriptUrl(url)) {
        return undefined;
    }
    return url;
}
exports.sanitizeJavaScriptUrl = sanitizeJavaScriptUrl;
// BEGIN-INTERNAL
/**
 * Sanitizes a URL by blocking javascript: URLs.
 *
 * This function is a temporary solution to refactor SafeUrl builders that can
 * bless javascript: URLs as SafeUrl. It sanitizes the URL and returns an
 * innocuous URL if the URL is sanitized away. This is part of go/safeurl-deletion-steps.
 * @param {string} url
 * @return {!tsickle_url_impl_5.SafeUrl}
 */
function sanitizeUrlForMigration(url) {
    /** @type {(undefined|string)} */
    const sanitizedUrl = sanitizeJavaScriptUrl(url);
    if (sanitizedUrl === undefined) {
        return url_impl_1.INNOCUOUS_URL;
    }
    return (0, url_impl_1.createUrlInternal)(sanitizedUrl);
}
exports.sanitizeUrlForMigration = sanitizeUrlForMigration;
/**
 * Type alias for URLs passed to DOM sink wrappers.
 * @typedef {(string|!tsickle_url_impl_5.SafeUrl)}
 */
exports.Url;
// END-INTERNAL
// BEGIN-EXTERNAL
// /**
//  * Type alias for URLs passed to DOM sink wrappers.
//  */
// export type Url = string;
// END-EXTERNAL
// BEGIN-EXTERNAL
// /**
//  * Adapter to sanitize string URLs in DOM sink wrappers.
//  * @return undefined if the URL was sanitized.
//  */
// END-EXTERNAL
// BEGIN-INTERNAL
/**
 * Adapter to support string and SafeUrl in DOM sink wrappers.
 * @param {(string|!tsickle_url_impl_5.SafeUrl)} url
 * @return {(undefined|string)} undefined if the URL was sanitized.
 */
// END-INTERNAL
function unwrapUrlOrSanitize(url) {
    // BEGIN-INTERNAL
    return url instanceof url_impl_1.SafeUrl ? (0, url_impl_1.unwrapUrl)(url) : sanitizeJavaScriptUrl(url);
    // END-INTERNAL
    // LINE-EXTERNAL return sanitizeJavaScriptUrl(url);
}
exports.unwrapUrlOrSanitize = unwrapUrlOrSanitize;
/**
 * Sanitizes a URL restrictively.
 * This sanitizer protects against XSS and potentially other uncommon and
 * undesirable schemes that an attacker could use e.g. phishing (tel:, callto:
 * ssh: etc schemes). This sanitizer is primarily meant to be used by the HTML
 * sanitizer.
 * @param {string} url
 * @return {string}
 */
function restrictivelySanitizeUrl(url) {
    /** @type {(undefined|string)} */
    const parsedScheme = extractScheme(url);
    if (parsedScheme !== undefined &&
        ALLOWED_SCHEMES.indexOf(parsedScheme.toLowerCase()) !== -1) {
        return url;
    }
    // BEGIN-INTERNAL
    // The sanitizer used to sanitize URLs with SafeUrl's sanitizeUrl which
    // returns this innocuous URL. We need to keep this behavior here because some
    // golden tests still expect this value.
    // TODO(b/238861489): return a short innocuous URL
    // END-INTERNAL
    return 'about:invalid#zClosurez';
}
exports.restrictivelySanitizeUrl = restrictivelySanitizeUrl;
// BEGIN-INTERNAL
// We need to avoid using ES6 Sets here to avoid the expenssive ES5 polyfill.
// This is acceptable anyway because this array should have only few elements.
/** @type {!Array<function(string): void>} */
const sanitizationCallbacks = [];
// This callback is re-defined when a new callback is registered/removed.
// When no callback is registered, there are no references to the
// sanitizationCallbacks array, which make it possible for the compiler to
// optimize it away.
/** @type {function(string): void} */
let triggerCallbacks = (/**
 * @param {string} url
 * @return {void}
 */
(url) => { });
if (dev_1.DEV_MODE) {
    addJavaScriptUrlSanitizationCallback((/**
     * @param {string} url
     * @return {void}
     */
    (url) => {
        console.warn(`A URL with content '${url}' was sanitized away.`);
    }));
}
/**
 * Registers a sanitization callback that is called whenever a javascript: URL
 * is sanitized away.
 * @param {function(string): void} callback
 * @return {void}
 */
function addJavaScriptUrlSanitizationCallback(callback) {
    if (sanitizationCallbacks.indexOf(callback) === -1) {
        sanitizationCallbacks.push(callback);
    }
    triggerCallbacks = (/**
     * @param {string} url
     * @return {void}
     */
    (url) => {
        sanitizationCallbacks.forEach((/**
         * @param {function(string): void} callback
         * @return {void}
         */
        (callback) => {
            callback(url);
        }));
    });
}
exports.addJavaScriptUrlSanitizationCallback = addJavaScriptUrlSanitizationCallback;
/**
 * Unregister the JavaScript URL sanitization callback.
 * @param {function(string): void} callback
 * @return {void}
 */
function removeJavaScriptUrlSanitizationCallback(callback) {
    /** @type {number} */
    const callbackIndex = sanitizationCallbacks.indexOf(callback);
    if (callbackIndex !== -1) {
        sanitizationCallbacks.splice(callbackIndex, 1);
    }
}
exports.removeJavaScriptUrlSanitizationCallback = removeJavaScriptUrlSanitizationCallback;
