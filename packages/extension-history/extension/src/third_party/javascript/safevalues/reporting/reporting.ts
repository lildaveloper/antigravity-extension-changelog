/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/javascript/safevalues/reporting/reporting.ts
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
goog.module('google3.third_party.javascript.safevalues.reporting.reporting');
var module = module || { id: 'third_party/javascript/safevalues/reporting/reporting.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_html_builders_1 = goog.requireType("google3.third_party.javascript.safevalues.builders.html_builders");
const tsickle_html_sanitizer_2 = goog.requireType("google3.third_party.javascript.safevalues.builders.html_sanitizer.html_sanitizer");
const tsickle_dev_3 = goog.requireType("google3.third_party.javascript.safevalues.environment.dev");
const html_builders_1 = goog.require('google3.third_party.javascript.safevalues.builders.html_builders');
const html_sanitizer_1 = goog.require('google3.third_party.javascript.safevalues.builders.html_sanitizer.html_sanitizer');
const dev_1 = goog.require('google3.third_party.javascript.safevalues.environment.dev');
/**
 * If {\@link legacyUnsafeHtml} is being used with a
 * `reportingId` to enable reporting, the percentage of sampled calls that
 * will be checked for active content. The key is the first character of the
 * `reportingId` and the float is the proportion of requests (in the range
 * 0.0-1.0).
 * @type {!Object<string,number>}
 */
const REPORTING_ID_PREFIX_TO_SAMPLING_RATE = {
    '0': 1.0,
    '1': 1.0,
};
/**
 * If {\@link legacyUnsafeHtml} is being used with a
 * `reportingId` to enable reporting, the percentage of sampled calls that
 * will trigger a heartbeat report to notify us that the function is being
 * called. The key is the first character of the `reportingId` and the float
 * is the proportion of requests (in the range 0.0-1.0).
 *
 * Note: This means that effectively samplingRate*heartbeatRate calls will send
 * a heartbeat.
 * @type {!Object<string,number>}
 */
const REPORTING_ID_PREFIX_TO_HEARTBEAT_RATE = {
    '0': 0.1,
    '1': 0.1,
};
/**
 * Options for configuring reporting used for {\@link legacyUnsafeHtml}.
 * @record
 */
function ReportingOptions() { }
exports.ReportingOptions = ReportingOptions;
/* istanbul ignore if */
if (false) {
    /**
     * A unique ID that identifies the callsite of a specific legacy conversion.
     * If this option is set, the legacy conversion becomes a report-only legacy
     * conversion that logs whether the callsite can be converted to a safer
     * alternative to the go/security-collector. See
     * go/report-only-safehtml-legacy-exemptions for more details on this design
     * and project.
     *
     * This is set via LSC and should not be manually changed.
     * @type {string}
     * @public
     */
    ReportingOptions.prototype.reportingId;
    /**
     * Override {\@link DEFAULT_SAMPLING_RATE} for this specific
     * legacy conversion. It is generally not necessary to use this override
     * unless this legacy conversion is triggering a massive number of reports and
     * it is necessary to decrease the sampling rate to decrease the number of
     * reports.
     * @type {(undefined|number)}
     * @public
     */
    ReportingOptions.prototype.samplingRate;
    /**
     * Override {\@link DEFAULT_HEARTBEAT_RATE} for this specific
     * legacy conversion. It is generally not necessary to use this override
     * unless this legacy conversion is triggering a massive number of reports and
     * it is necessary to decrease the sampling rate to decrease the number of
     * reports.
     * @type {(undefined|number)}
     * @public
     */
    ReportingOptions.prototype.heartbeatRate;
    /**
     * Override for how reports associated with this legacy conversion will be
     * sent to the go/security-collector. It is generally not necessary to use
     * this override unless a caller needs to change how reports are collected
     * (e.g. choosing to collect them via a service's own collection
     * infrastructure).
     * @type {(undefined|function(string, string): void)}
     * @public
     */
    ReportingOptions.prototype.sendReport;
}
/**
 * Passes through the given HTML string unchanged, but logs metadata about
 * whether various transformations would have changed the input to the security
 * collector.
 *
 * Note that this purposefully does not return a SafeHtml and is meant to be
 * used in scenarios where we do not want to introduce a legacy conversion.
 * @param {string} s
 * @param {(undefined|!ReportingOptions)=} options
 * @return {string}
 */
function reportOnlyHtmlPassthrough(s, options) {
    if (!options ||
        !isCallSampled(options, REPORTING_ID_PREFIX_TO_SAMPLING_RATE[options.reportingId[0]]) ||
        isReportingDisabled()) {
        return s;
    }
    if (isBrowserIncompatibleWithSanitizing()) {
        // Avoid sanitization for browsers that are incompatible with the sanitizer
        // so that this function never crashes.
        return s;
    }
    maybeSendHeartbeat(options);
    /** @type {boolean} */
    const changedBySanitizing = isChangedBySanitizing(s, options);
    if (!changedBySanitizing) {
        // Note: If something gets changed by the sanitizer, it will also
        // inevitably get changed by escaping as the sanitizer will always
        // preserve single text nodes.
        isChangedByEscaping(s, options);
    }
    return s;
}
exports.reportOnlyHtmlPassthrough = reportOnlyHtmlPassthrough;
/**
 * @return {boolean}
 */
function isBrowserIncompatibleWithSanitizing() {
    // Currently the only known incompatibility is cobalt which doesn't support
    // document.createDocumentFragment. See b/28115809. This method of detecting
    // if DocumentFragment is supported is based on
    // google3/chrome/dongle/web_framework/app_cobalt/polyfills/document_fragment.ts?rcl=482322361
    // TODO(b/255336776): Remove this once the sanitizer is able to run on Cobalt
    return !('DocumentFragment' in window);
}
/**
 * Helper method to check if this call should be sampled based on the provided options and a default sampling rate.
 * @param {!ReportingOptions} options The reporting options, which may contain an override for the sampling rate.
 * @param {number} defaultSamplingRate The default sampling rate to use if no override is provided in the options.
 * @return {boolean} True if the call should be sampled, false otherwise.
 */
function isCallSampled(options, defaultSamplingRate) {
    return Math.random() < (options.samplingRate ?? defaultSamplingRate ?? 0.0);
}
exports.isCallSampled = isCallSampled;
/**
 * Checks if reporting has been disabled globally by setting `window.SAFEVALUES_REPORTING` to false.
 * @return {boolean} True if reporting is disabled, false otherwise.
 */
function isReportingDisabled() {
    // Note that if it is undefined, then that means reporting should be enabled
    return window['SAFEVALUES_REPORTING'] === false;
}
exports.isReportingDisabled = isReportingDisabled;
/**
 * @param {!ReportingOptions} options
 * @return {void}
 */
function maybeSendHeartbeat(options) {
    if (Math.random() <
        (options.heartbeatRate ??
            REPORTING_ID_PREFIX_TO_HEARTBEAT_RATE[options.reportingId[0]] ??
            0.0)) {
        // Report a heartbeat signifying that the legacy conversion is being called
        reportLegacyConversion(options, ReportingType.HEARTBEAT);
    }
}
/**
 * @param {string} s
 * @param {!ReportingOptions} options
 * @return {boolean}
 */
function isChangedByEscaping(s, options) {
    if ((0, html_builders_1.htmlEscape)(s).toString() !== s) {
        // The legacy conversion is being used with something other than plain
        // text
        reportLegacyConversion(options, ReportingType.HTML_CHANGED_BY_ESCAPING);
        return true;
    }
    return false;
}
/**
 * @param {string} s
 * @param {!ReportingOptions} options
 * @return {boolean}
 */
function isChangedBySanitizing(s, options) {
    // First try checking if it is changed by the super lenient sanitizer. If it
    // is changed by the super lenient sanitizer, report that and return true.
    try {
        (0, html_sanitizer_1.superLenientlySanitizeHtmlAssertUnchanged)(s);
        // Continue
    }
    catch (e) {
        // A regex that matches corp domains to ensure that we only record
        // additional data if the request is in dev mode AND is an internal request
        // from a Googler. External facing domains should never be added to this
        // list.
        /** @type {!RegExp} */
        const corpRe = /([.]corp[.]google[.]com|[.]proxy[.]googleprod[.]com|[.]googlers[.]com)$/;
        if (dev_1.DEV_MODE &&
            corpRe.test(window.location.hostname) &&
            e instanceof Error) {
            reportLegacyConversion(options, ReportingType.HTML_CHANGED_BY_SUPER_LENIENT_SANITIZING, (/** @type {!Error} */ (e)).message);
        }
        else {
            reportLegacyConversion(options, ReportingType.HTML_CHANGED_BY_SUPER_LENIENT_SANITIZING);
        }
        return true;
    }
    // If it isn't changed by the super lenient sanitizer, fall back to the
    // relaxed sanitizer.
    try {
        (0, html_sanitizer_1.lenientlySanitizeHtmlAssertUnchanged)(s);
        // Continue
    }
    catch {
        reportLegacyConversion(options, ReportingType.HTML_CHANGED_BY_RELAXED_SANITIZING);
        return true;
    }
    // If it isn't changed by the relaxed sanitizer, see if it is changed by the
    // strict sanitizer. If possible we'd rather migrate legacy conversions to the
    // strict sanitizer.
    try {
        (0, html_sanitizer_1.sanitizeHtmlAssertUnchanged)(s);
        // Continue
    }
    catch {
        reportLegacyConversion(options, ReportingType.HTML_CHANGED_BY_SANITIZING);
        return true;
    }
    // It wasn't changed by either sanitizer
    return false;
}
/**
 * The type of the report
 * @enum {string}
 */
const ReportingType = {
    // The type if the report signifies just that the legacy conversion was
    // called.
    HEARTBEAT: "HEARTBEAT",
    // The type if the report signifies that the legacy conversion code crashed.
    CRASHED: "CRASHED",
    // The type if the report signifies that escaping the input changed it.
    HTML_CHANGED_BY_ESCAPING: "H_ESCAPE",
    // The type if the report signifies that sanitizing the input with the strict
    // sanitizer changed it.
    HTML_CHANGED_BY_SANITIZING: "H_SANITIZE",
    // The type if the report signifies that sanitizing the input with the relaxed
    // sanitizer changed it.
    HTML_CHANGED_BY_RELAXED_SANITIZING: "H_RSANITIZE",
    // The type if the report signifies that sanitizing the input with the super
    // lenient sanitizer changed it.
    HTML_CHANGED_BY_SUPER_LENIENT_SANITIZING: "H_SLSANITIZE",
};
/**
 * @param {!ReportingOptions} options
 * @param {!ReportingType} type
 * @param {(undefined|string)=} additionalData
 * @return {void}
 */
function reportLegacyConversion(options, type, additionalData) {
    /** @type {?} */
    let sendReport = undefined;
    if (exports.TEST_ONLY.sendReport) {
        sendReport = exports.TEST_ONLY.sendReport;
    }
    else if (typeof window !== 'undefined' &&
        window.navigator &&
        window.navigator.sendBeacon !== undefined) {
        sendReport = navigator.sendBeacon.bind(navigator);
    }
    else {
        sendReport = sendBeaconPolyfill;
    }
    /** @type {!ReportingPayload} */
    const payload = {
        'host': window.location.hostname,
        'type': type,
        'additionalData': additionalData,
    };
    sendReport('https://csp.withgoogle.com/csp/lcreport/' + options.reportingId, JSON.stringify(payload));
}
/**
 * A very naive polyfill for navigator.sendBeacon for browsers that don't
 * support navigator.sendBeacon.
 * @param {string} url
 * @param {string} body
 * @return {void}
 */
function sendBeaconPolyfill(url, body) {
    /** @type {!XMLHttpRequest} */
    const req = new XMLHttpRequest();
    req.open('POST', url);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(body);
}
exports.sendBeaconPolyfill = sendBeaconPolyfill;
/**
 * @record
 */
function TestOnlyOptions() { }
/* istanbul ignore if */
if (false) {
    /**
     * @type {(undefined|function(string, string): void)}
     * @public
     */
    TestOnlyOptions.prototype.sendReport;
    /**
     * @type {function(): void}
     * @public
     */
    TestOnlyOptions.prototype.reset;
}
/** @type {!TestOnlyOptions} */
exports.TEST_ONLY = {
    reset: (/**
     * @return {void}
     */
    () => {
        exports.TEST_ONLY.sendReport = undefined;
    }),
};
