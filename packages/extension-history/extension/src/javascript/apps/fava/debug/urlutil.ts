/**
 * @fileoverview Package-private utilities for manipulating URLs.
 * Generated from: javascript/apps/fava/debug/urlutil.ts
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
goog.module('google3.javascript.apps.fava.debug.urlutil');
var module = module || { id: 'javascript/apps/fava/debug/urlutil.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_utils_1 = goog.requireType("goog.uri.utils");
const utils = goog.require('goog.uri.utils');
// URL is available on 2018+ based on https://caniuse.com/?search=url and
// go/jscompiler-flags#browser-featureset-year-options.
/**
 * True iff urlForReporting is built on the URL API, else it's built on
 * goog.uri. This has a slight impact on behavior -- see urlutil_test -- and
 * therefore is visible for other unit tests to depend on.
 * @type {boolean}
 */
exports.STRIP_FRAGMENT_USING_URL_API = goog.FEATURESET_YEAR >= 2018;
/** @typedef {(string|!Location|!URL)} */
var URLLike;
/** @type {function((undefined|string|!Location|!URL)): (undefined|string)} */
let scrubUrl;
/**
 * @param {(string|!Location|!URL)} loc
 * @return {string}
 */
function href(loc) {
    // Can't use an instanceof check because Location doesn't exist in service
    // workers and WorkerLocation doesn't exist on the main thread.
    return typeof loc === 'object' ? (/** @type {(!Location|!URL)} */ (loc)).href : loc;
}
// This is not runtime-configurable because we want the compiler to optimize
// away the goog.uri.utils import on modern builds.
if (exports.STRIP_FRAGMENT_USING_URL_API) {
    scrubUrl = (/**
     * @param {(undefined|string|!Location|!URL)} loc
     * @return {(undefined|string)}
     */
    (loc) => {
        if (!loc) {
            return loc;
        }
        // Convert loc to URL, from string or {,Worker}Location.
        try {
            // TODO(mariakhomenko): Use URL.canParse() or URL.parse() to do this
            // checkout without try/catch once those APIs are more ubiquitous.
            loc = new URL(href(loc));
        }
        catch (e) {
            // Could not parse URL, will just return.
            return href(loc);
        }
        if ((/** @type {!URL} */ (loc)).protocol !== 'http:' && (/** @type {!URL} */ (loc)).protocol !== 'https:') {
            // Per https://url.spec.whatwg.org/#dom-url-protocol, it always includes a
            // trailing colon. Remove it for parity with the CSP spec.
            return (/** @type {!URL} */ (loc)).protocol.slice(0, -1);
        }
        (/** @type {!URL} */ (loc)).username = '';
        (/** @type {!URL} */ (loc)).password = '';
        (/** @type {!URL} */ (loc)).hash = '';
        return (/** @type {!URL} */ (loc)).href;
    });
}
else {
    scrubUrl = (/**
     * @param {(undefined|string|!Location|!URL)} loc
     * @return {(undefined|string)}
     */
    (loc) => {
        if (!loc) {
            return loc;
        }
        /** @type {?} */
        const C = utils.ComponentIndex;
        /** @type {!Array<(undefined|string)>} */
        const parts = utils.split(href(loc));
        /** @type {(undefined|string)} */
        const protocol = parts[C.SCHEME];
        if (protocol !== 'http' && protocol !== 'https') {
            return protocol || '';
        }
        return utils.buildFromEncodedParts(parts[C.SCHEME], 
        /*opt_userInfo=*/ '', parts[C.DOMAIN], parts[C.PORT], parts[C.PATH], parts[C.QUERY_DATA], 
        /*opt_fragment=*/ '');
    });
}
/**
 * Returns a scrubbed version of the location that's safe to report to a server.
 * Mirrors the algorithm in
 * https://w3c.github.io/webappsec-csp/#strip-url-for-use-in-reports.
 *
 * @param {(undefined|string|!Location|!URL)} loc The unscrubbed URL.
 * @return {(undefined|string)}
 */
function urlForReporting(loc) {
    return scrubUrl(loc);
}
exports.urlForReporting = urlForReporting;
/**
 * Modifies the given argument if it is an Object and it has a writable fileName
 * property, by scrubbing the URL userinfo and fragment from it.
 *
 * @param {*} error The Error-like object (as for JsReporter or ErrorReporter).
 * @return {void}
 */
function scrubFileNameIfError(error) {
    // TODO(b/271258535): Narrow the type of the error parameter and eliminate
    // these type checks and casts once existing unknown-type callers are
    // migrated. This is necessary because attempting to write a property on a
    // primitive value raises an exception in strict mode:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cant_assign_to_property
    if (error instanceof Object && !Object.isFrozen(error)) {
        // The underlying goog.debug.normalizeErrorObject looks for a variety of
        // properties irrespective of type, so we should scrub regardless of type.
        // Thus, we cast to a structural type defining these properties.
        /** @type {{fileName: *, filename: *, sourceURL: *}} */
        const errorCast = (/** @type {{fileName: *, filename: *, sourceURL: *}} */ (error));
        // Duplicate the logic in goog.debug.normalizeErrorObject. This code runs
        // upstream from that function, therefore we must ensure it doesn't get an
        // unscrubbed URL from any of these places.
        // TODO(twifkak): After successfully proving the safety and efficaciousness
        // in Fava, implement scrubbing in goog.debug.normalizeErrorObject and
        // remove this duplication.
        /** @type {?} */
        const fileName = errorCast.fileName ||
            errorCast.filename ||
            errorCast.sourceURL ||
            goog.global['$googDebugFname'] ||
            location.href;
        /** @type {(undefined|string)} */
        const scrubbedFileName = urlForReporting(fileName);
        // TODO(twifkak): Modify all the tests this breaks.
        try {
            errorCast.fileName = scrubbedFileName;
        }
        catch (e) {
            // Ignore errors while setting; these could be "Cannot assign to read
            // only property 'fileName'".
        }
    }
}
exports.scrubFileNameIfError = scrubFileNameIfError;
