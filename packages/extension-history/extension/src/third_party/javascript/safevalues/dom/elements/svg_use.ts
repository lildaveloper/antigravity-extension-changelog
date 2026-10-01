/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/javascript/safevalues/dom/elements/svg_use.ts
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
goog.module('google3.third_party.javascript.safevalues.dom.elements.svg_use');
var module = module || { id: 'third_party/javascript/safevalues/dom/elements/svg_use.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_log_1 = goog.requireType("goog.log");
const tsickle_url_builders_2 = goog.requireType("google3.third_party.javascript.safevalues.builders.url_builders");
const tsickle_dev_3 = goog.requireType("google3.third_party.javascript.safevalues.environment.dev");
// BEGIN-INTERNAL
const log_1 = goog.require('goog.log');
// END-INTERNAL
const url_builders_1 = goog.require('google3.third_party.javascript.safevalues.builders.url_builders');
const dev_1 = goog.require('google3.third_party.javascript.safevalues.environment.dev');
/**
 * Sets the Href attribute from the given URL.
 * javascript: and data: URL are blocked as they can lead to XSS and the <use>
 * element only loads resources same-origin.
 * @param {!SVGUseElement} useEl
 * @param {string} url
 * @return {void}
 */
function setSvgUseHref(useEl, url) {
    /** @type {(undefined|string)} */
    const scheme = (0, url_builders_1.extractScheme)(url);
    if (scheme === 'javascript:' || scheme === 'data:') {
        if (dev_1.DEV_MODE) {
            /** @type {string} */
            const msg = `A URL with content '${url}' was sanitized away.`;
            // BEGIN-EXTERNAL
            // console.error(msg);
            // END-EXTERNAL
            // BEGIN-INTERNAL
            (0, log_1.warning)((0, log_1.getLogger)('safevalues'), msg);
            // END-INTERNAL
        }
        return;
    }
    // Note that the href property is read-only, so setAttribute must be used.
    useEl.setAttribute('href', url);
}
exports.setSvgUseHref = setSvgUseHref;
