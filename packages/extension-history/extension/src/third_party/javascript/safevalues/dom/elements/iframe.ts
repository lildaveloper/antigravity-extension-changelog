/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview Safe iframe helpers and go/intents-for-iframes-for-closure
 * Generated from: third_party/javascript/safevalues/dom/elements/iframe.ts
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
goog.module('google3.third_party.javascript.safevalues.dom.elements.iframe');
var module = module || { id: 'third_party/javascript/safevalues/dom/elements/iframe.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_check_1 = goog.requireType("google3.javascript.typescript.contrib.check");
const tsickle_url_builders_2 = goog.requireType("google3.third_party.javascript.safevalues.builders.url_builders");
const tsickle_html_impl_3 = goog.requireType("google3.third_party.javascript.safevalues.internals.html_impl");
const tsickle_resource_url_impl_4 = goog.requireType("google3.third_party.javascript.safevalues.internals.resource_url_impl");
const tsickle_url_impl_5 = goog.requireType("google3.third_party.javascript.safevalues.internals.url_impl");
const check_1 = goog.require('google3.javascript.typescript.contrib.check'); // LINE-INTERNAL
// LINE-INTERNAL
const url_builders_1 = goog.require('google3.third_party.javascript.safevalues.builders.url_builders'); // LINE-INTERNAL
// LINE-INTERNAL
const html_impl_1 = goog.require('google3.third_party.javascript.safevalues.internals.html_impl');
const resource_url_impl_1 = goog.require('google3.third_party.javascript.safevalues.internals.resource_url_impl');
const html_impl_2 = html_impl_1; // LINE-INTERNAL
// LINE-INTERNAL
/**
 * Sets the Src attribute using a TrustedResourceUrl
 * @param {!HTMLIFrameElement} iframe
 * @param {!tsickle_resource_url_impl_4.TrustedResourceUrl} v
 * @return {void}
 */
function setIframeSrc(iframe, v) {
    iframe.src = (0, resource_url_impl_1.unwrapResourceUrl)(v).toString();
}
exports.setIframeSrc = setIframeSrc;
/**
 * Sets the Srcdoc attribute using a SafeHtml
 * @param {!HTMLIFrameElement} iframe
 * @param {!tsickle_html_impl_3.SafeHtml} v
 * @return {void}
 */
function setIframeSrcdoc(iframe, v) {
    iframe.srcdoc = (/** @type {string} */ ((0, html_impl_1.unwrapHtml)(v)));
}
exports.setIframeSrcdoc = setIframeSrcdoc;
/**
 * IframeIntent is an enum of 'embed intents' -- reasons to embed some content
 * that are used for security defaults.
 *
 * @see http://go/iframe-intents
 * @enum {number}
 */
const IframeIntent = {
    /**
     * Rich-text like content formatted with HTML tags, but which does not need to
     * run scripts, forms or other potentially dangerous non-formatting content.
     *
     * Example: a license agreement.
     */
    FORMATTED_HTML_CONTENT: 0,
    /**
     * Embed some content created by Google and its employees.
     *
     * Example: a widget to display some content in our app.
     */
    EMBEDDED_INTERNAL_CONTENT: 1,
    /**
     * Trusted content created outside of Google.
     *
     * Example: a checkin widget for a partner airline
     */
    EMBEDDED_TRUSTED_EXTERNAL_CONTENT: 2,
};
exports.IframeIntent = IframeIntent;
IframeIntent[IframeIntent.FORMATTED_HTML_CONTENT] = 'FORMATTED_HTML_CONTENT';
IframeIntent[IframeIntent.EMBEDDED_INTERNAL_CONTENT] = 'EMBEDDED_INTERNAL_CONTENT';
IframeIntent[IframeIntent.EMBEDDED_TRUSTED_EXTERNAL_CONTENT] = 'EMBEDDED_TRUSTED_EXTERNAL_CONTENT';
/** @enum {string} */
const SandboxDirective = {
    ALLOW_SAME_ORIGIN: "allow-same-origin",
    ALLOW_SCRIPTS: "allow-scripts",
    ALLOW_FORMS: "allow-forms",
    ALLOW_POPUPS: "allow-popups",
    ALLOW_POPUPS_TO_ESCAPE_SANDBOX: "allow-popups-to-escape-sandbox",
    ALLOW_STORAGE_ACCESS_BY_USER_ACTIVATION: "allow-storage-access-by-user-activation",
};
/**
 * setSandboxDirectives sets the given sandbox directives on the given iframe.
 * Deletes any existing directives.
 * @param {!HTMLIFrameElement} ifr iframe element.
 * @param {!ReadonlyArray<!SandboxDirective>} directives list of directives to set
 * @return {void} void.
 */
function setSandboxDirectives(ifr, directives) {
    ifr.setAttribute('sandbox', '');
    // Cannot be a for..of loop due to GWS conformance rule:
    // go/gws-inline-js-conformance#heading=h.cecxx7mh5dc5
    for (let i = 0; i < directives.length; i++) {
        if (!ifr.sandbox.supports || ifr.sandbox.supports(directives[i])) {
            ifr.sandbox.add(directives[i]);
        }
    }
}
/**
 * TypeCannotBeUsedWithIframeIntentError is a type of {\@link Error} that is returned
 * when
 * {\@link setIframeSrcWithIntent} or {\@link setIframeSrcdocWithIntent} is called
 * with parameters of the wrong type.
 * @extends {Error}
 */
class TypeCannotBeUsedWithIframeIntentError extends Error {
    /**
     * @public
     * @param {string} type
     * @param {!IframeIntent} intent
     */
    constructor(type, intent) {
        super(`${type} cannot be used with intent ${IframeIntent[intent]}`);
        this.type = type;
        this.intent = intent;
        this.name = 'TypeCannotBeUsedWithIframeIntentError';
    }
}
exports.TypeCannotBeUsedWithIframeIntentError = TypeCannotBeUsedWithIframeIntentError;
/* istanbul ignore if */
if (false) {
    /**
     * @type {string}
     * @public
     */
    TypeCannotBeUsedWithIframeIntentError.prototype.name;
    /**
     * @type {string}
     * @public
     */
    TypeCannotBeUsedWithIframeIntentError.prototype.type;
    /**
     * @type {!IframeIntent}
     * @public
     */
    TypeCannotBeUsedWithIframeIntentError.prototype.intent;
}
/**
 * @param {!HTMLIFrameElement} element
 * @param {!IframeIntent} intent
 * @param {(string|!tsickle_url_impl_5.SafeUrl|!tsickle_resource_url_impl_4.TrustedResourceUrl)} src
 * @return {void}
 */
function setIframeSrcWithIntent(element, intent, src) {
    // if srcdoc was already set, unset it to prevent using an src policy with
    // an srcdoc
    element.removeAttribute('srcdoc');
    switch (intent) {
        case IframeIntent.FORMATTED_HTML_CONTENT: {
            if (src instanceof resource_url_impl_1.TrustedResourceUrl) {
                throw new TypeCannotBeUsedWithIframeIntentError('TrustedResourceUrl', IframeIntent.FORMATTED_HTML_CONTENT);
            }
            setSandboxDirectives(element, []);
            /** @type {(undefined|string)} */
            const sanitizedUrl = (0, url_builders_1.unwrapUrlOrSanitize)(src);
            if (sanitizedUrl !== undefined) {
                element.src = sanitizedUrl;
            }
            return;
        }
        case IframeIntent.EMBEDDED_INTERNAL_CONTENT: {
            if (!(src instanceof resource_url_impl_1.TrustedResourceUrl)) {
                throw new TypeCannotBeUsedWithIframeIntentError(typeof src, IframeIntent.EMBEDDED_INTERNAL_CONTENT);
            }
            setSandboxDirectives(element, [
                SandboxDirective.ALLOW_SAME_ORIGIN,
                SandboxDirective.ALLOW_SCRIPTS,
                SandboxDirective.ALLOW_FORMS,
                SandboxDirective.ALLOW_POPUPS,
                SandboxDirective.ALLOW_POPUPS_TO_ESCAPE_SANDBOX,
                SandboxDirective.ALLOW_STORAGE_ACCESS_BY_USER_ACTIVATION,
            ]);
            setIframeSrc(element, src);
            return;
        }
        case IframeIntent.EMBEDDED_TRUSTED_EXTERNAL_CONTENT: {
            if (src instanceof resource_url_impl_1.TrustedResourceUrl) {
                throw new TypeCannotBeUsedWithIframeIntentError('TrustedResourceUrl', IframeIntent.EMBEDDED_TRUSTED_EXTERNAL_CONTENT);
            }
            setSandboxDirectives(element, [
                SandboxDirective.ALLOW_SAME_ORIGIN,
                SandboxDirective.ALLOW_SCRIPTS,
                SandboxDirective.ALLOW_FORMS,
                SandboxDirective.ALLOW_POPUPS,
                SandboxDirective.ALLOW_POPUPS_TO_ESCAPE_SANDBOX,
                SandboxDirective.ALLOW_STORAGE_ACCESS_BY_USER_ACTIVATION,
            ]);
            /** @type {(undefined|string)} */
            const sanitizedUrl = (0, url_builders_1.unwrapUrlOrSanitize)(src);
            if (sanitizedUrl !== undefined) {
                element.src = sanitizedUrl;
            }
            return;
        }
        default:
            (0, check_1.checkExhaustive)(intent);
    }
}
exports.setIframeSrcWithIntent = setIframeSrcWithIntent;
/**
 * @param {!HTMLIFrameElement} element
 * @param {!IframeIntent} intent
 * @param {(string|!tsickle_html_impl_3.SafeHtml)} srcdoc
 * @return {void}
 */
function setIframeSrcdocWithIntent(element, intent, srcdoc) {
    // if src was already set, unset it to prevent using an src policy with an
    // srcdoc
    element.removeAttribute('src');
    switch (intent) {
        case IframeIntent.FORMATTED_HTML_CONTENT: {
            if (srcdoc instanceof html_impl_1.SafeHtml) {
                throw new TypeCannotBeUsedWithIframeIntentError('SafeHtml', IframeIntent.FORMATTED_HTML_CONTENT);
            }
            // type assertion required as declare global syntax is pollutive in
            // google3 at the time of writing.
            ((/** @type {?} */ (element))).csp =
                "default-src 'none'";
            setSandboxDirectives(element, []);
            setIframeSrcdoc(element, (0, html_impl_2.createHtmlInternal)(srcdoc));
            return;
        }
        case IframeIntent.EMBEDDED_INTERNAL_CONTENT: {
            if (!(srcdoc instanceof html_impl_1.SafeHtml)) {
                throw new TypeCannotBeUsedWithIframeIntentError('string', IframeIntent.EMBEDDED_INTERNAL_CONTENT);
            }
            setSandboxDirectives(element, [
                SandboxDirective.ALLOW_SAME_ORIGIN,
                SandboxDirective.ALLOW_SCRIPTS,
                SandboxDirective.ALLOW_FORMS,
                SandboxDirective.ALLOW_POPUPS,
                SandboxDirective.ALLOW_POPUPS_TO_ESCAPE_SANDBOX,
                SandboxDirective.ALLOW_STORAGE_ACCESS_BY_USER_ACTIVATION,
            ]);
            setIframeSrcdoc(element, srcdoc);
            return;
        }
        case IframeIntent.EMBEDDED_TRUSTED_EXTERNAL_CONTENT: {
            if (srcdoc instanceof html_impl_1.SafeHtml) {
                throw new TypeCannotBeUsedWithIframeIntentError('SafeHtml', IframeIntent.EMBEDDED_INTERNAL_CONTENT);
            }
            setSandboxDirectives(element, [
                SandboxDirective.ALLOW_SCRIPTS,
                SandboxDirective.ALLOW_FORMS,
                SandboxDirective.ALLOW_POPUPS,
                SandboxDirective.ALLOW_POPUPS_TO_ESCAPE_SANDBOX,
                SandboxDirective.ALLOW_STORAGE_ACCESS_BY_USER_ACTIVATION,
            ]);
            setIframeSrcdoc(element, (0, html_impl_2.createHtmlInternal)(srcdoc));
            return;
        }
        default:
            (0, check_1.checkExhaustive)(intent);
    }
}
exports.setIframeSrcdocWithIntent = setIframeSrcdocWithIntent;
