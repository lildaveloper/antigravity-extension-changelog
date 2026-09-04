/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview SafeHtml builder API to make it possible to use goog.getMsg
 * safely with HTML.
 * Generated from: third_party/javascript/safevalues/builders/html_formatter.ts
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
goog.module('google3.third_party.javascript.safevalues.builders.html_formatter');
var module = module || { id: 'third_party/javascript/safevalues/builders/html_formatter.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_dev_1 = goog.requireType("google3.third_party.javascript.safevalues.environment.dev");
const tsickle_html_impl_2 = goog.requireType("google3.third_party.javascript.safevalues.internals.html_impl");
const tsickle_html_builders_3 = goog.requireType("google3.third_party.javascript.safevalues.builders.html_builders");
const tsickle_url_impl_4 = goog.requireType("google3.third_party.javascript.safevalues.internals.url_impl");
const dev_1 = goog.require('google3.third_party.javascript.safevalues.environment.dev');
const html_impl_1 = goog.require('google3.third_party.javascript.safevalues.internals.html_impl');
const html_builders_1 = goog.require('google3.third_party.javascript.safevalues.builders.html_builders');
/**
 * @record
 */
function HtmlReplacement() { }
/* istanbul ignore if */
if (false) {
    /**
     * @type {string}
     * @public
     */
    HtmlReplacement.prototype.type;
    /**
     * @type {string}
     * @public
     */
    HtmlReplacement.prototype.html;
}
/**
 * @record
 */
function StartTagReplacement() { }
/* istanbul ignore if */
if (false) {
    /**
     * @type {string}
     * @public
     */
    StartTagReplacement.prototype.type;
    /**
     * @type {string}
     * @public
     */
    StartTagReplacement.prototype.tagName;
    /**
     * @type {string}
     * @public
     */
    StartTagReplacement.prototype.attributes;
}
/**
 * @record
 */
function EndTagReplacement() { }
/* istanbul ignore if */
if (false) {
    /**
     * @type {string}
     * @public
     */
    EndTagReplacement.prototype.type;
    /**
     * @type {string}
     * @public
     */
    EndTagReplacement.prototype.tagName;
}
/** @typedef {(!HtmlReplacement|!StartTagReplacement|!EndTagReplacement)} */
var Replacement;
/**
 * Marker used for replacements.
 * @type {string}
 */
const MARKER = '_safevalues_format_marker_:';
/**
 * Formatter producing SafeHtml from a plain text format and HTML fragments.
 * Example usage:
 * const formatter = new HtmlFormatter();
 * const safeHtml = formatter.format(
 *     formatter.startTag('b') +
 *     'User input:' +
 *     formatter.endTag('b') +
 *     ' ' +
 *     formatter.text(userInput));
 * The most common usage is with goog.getMsg:
 * const MSG_USER_INPUT = goog.getMsg(
 *     '{$startLink}Learn more{$endLink} about {$userInput}', {
 *       'startLink': formatter.startTag('a', {'href': url}),
 *       'endLink': formatter.endTag('a'),
 *       'userInput': formatter.text(userInput)
 *     });
 * const safeHtml = formatter.format(MSG_USER_INPUT);
 * The formatting string should be constant with all variables processed by
 * formatter.text().
 * @final
 */
class HtmlFormatter {
    constructor() {
        this.replacements = new Map();
    }
    /**
     * Formats a plain text string with markers holding HTML fragments to
     * SafeHtml.
     * @public
     * @param {string} format
     * @return {!tsickle_html_impl_2.SafeHtml}
     */
    format(format) {
        /** @type {!Array<string>} */
        const openedTags = [];
        /** @type {string} */
        const marker = (0, html_builders_1.htmlEscape)(MARKER).toString();
        /** @type {string} */
        const html = (0, html_builders_1.htmlEscape)(format)
            .toString()
            .replace(new RegExp(`\\{${marker}[\\w&#;]+\\}`, 'g'), (/**
         * @param {string} match
         * @return {string}
         */
        (match) => this.replaceFormattingString(openedTags, match)));
        if (openedTags.length !== 0) {
            if (dev_1.DEV_MODE) {
                throw new Error('Expected no unclosed tags, got <' + openedTags.join('>, <') + '>.');
            }
            else {
                throw new Error();
            }
        }
        return (0, html_impl_1.createHtmlInternal)(html);
    }
    /**
     * Replaces found formatting strings with saved tags.
     * @private
     * @param {!Array<string>} openedTags
     * @param {string} match
     * @return {string}
     */
    replaceFormattingString(openedTags, match) {
        /** @type {(undefined|!HtmlReplacement|!StartTagReplacement|!EndTagReplacement)} */
        const replacement = this.replacements.get(match);
        if (!replacement) {
            // Someone included a string looking like our internal marker in the
            // format.
            return match;
        }
        /** @type {string} */
        let result = '';
        switch (replacement.type) {
            case 'html':
                result = (/** @type {!HtmlReplacement} */ (replacement)).html;
                break;
            case 'startTag':
                result = `<${(/** @type {!StartTagReplacement} */ (replacement)).tagName}${(/** @type {!StartTagReplacement} */ (replacement)).attributes}>`;
                if (dev_1.DEV_MODE) {
                    if (!(0, html_builders_1.isVoidTag)((/** @type {!StartTagReplacement} */ (replacement)).tagName.toLowerCase())) {
                        openedTags.push((/** @type {!StartTagReplacement} */ (replacement)).tagName.toLowerCase());
                    }
                }
                break;
            case 'endTag':
                result = `</${(/** @type {!EndTagReplacement} */ (replacement)).tagName}>`;
                if (dev_1.DEV_MODE) {
                    /** @type {(undefined|string)} */
                    const lastTag = openedTags.pop();
                    if (lastTag !== (/** @type {!EndTagReplacement} */ (replacement)).tagName.toLowerCase()) {
                        throw new Error(`Expected </${lastTag}>, got </${(/** @type {!EndTagReplacement} */ (replacement)).tagName}>.`);
                    }
                }
                break;
            default:
                if (dev_1.DEV_MODE) {
                    checkExhaustive(replacement, 'type had an unknown value');
                }
        }
        return result;
    }
    /**
     * Saves a start tag and returns its marker.
     * @throws {!Error} If invalid tag name, attribute name, or attribute value is
     *     provided. This function accepts the same tags and attributes as
     *     safevalues.createHtml.
     * @public
     * @param {string} tagName
     * @param {(undefined|!Object<string,(undefined|string|number|!tsickle_url_impl_4.SafeUrl)>)=} attributes
     *     Mapping from attribute names to their values. Only attribute names
     *     consisting of [a-zA-Z0-9-] are allowed. Value of null or undefined
     * causes the attribute to be omitted.
     * @return {string}
     */
    startTag(tagName, attributes) {
        (0, html_builders_1.verifyTagName)(tagName);
        return this.storeReplacement({
            type: 'startTag',
            tagName,
            attributes: attributes !== undefined
                ? (0, html_builders_1.stringifyAttributes)(tagName, attributes)
                : '',
        });
    }
    /**
     * Saves an end tag and returns its marker.
     * @throws {!Error} If invalid tag name, attribute name, or attribute value is
     *     provided. This function accepts the same tags as {\@link
     *     safevalues.createHtml}.
     * @public
     * @param {string} tagName
     * @return {string}
     */
    endTag(tagName) {
        (0, html_builders_1.verifyTagName)(tagName);
        return this.storeReplacement({ type: 'endTag', tagName });
    }
    /**
     * Escapes a text, saves it and returns its marker.
     *
     * Wrapping any user input to .text() prevents the attacker with access to
     * the random number generator to duplicate tags used elsewhere in the format.
     * @public
     * @param {string} text
     * @return {string}
     */
    text(text) {
        return this.storeReplacement({
            type: 'html',
            html: (0, html_builders_1.htmlEscape)(text).toString(),
        });
    }
    /**
     * Saves SafeHtml and returns its marker.
     * @public
     * @param {!tsickle_html_impl_2.SafeHtml} safeHtml
     * @return {string}
     */
    safeHtml(safeHtml) {
        return this.storeReplacement({
            type: 'html',
            html: (0, html_impl_1.unwrapHtml)(safeHtml).toString(),
        });
    }
    /**
     * Stores a replacement and returns its marker.
     * @private
     * @param {(!HtmlReplacement|!StartTagReplacement|!EndTagReplacement)} replacement
     * @return {string}
     */
    storeReplacement(replacement) {
        /** @type {string} */
        const marker = `{${MARKER}${this.replacements.size}_${getRandomString()}}`;
        this.replacements.set((0, html_builders_1.htmlEscape)(marker).toString(), replacement);
        return marker;
    }
}
exports.HtmlFormatter = HtmlFormatter;
/* istanbul ignore if */
if (false) {
    /**
     * @const {!Map<string, (!HtmlReplacement|!StartTagReplacement|!EndTagReplacement)>}
     * @private
     */
    HtmlFormatter.prototype.replacements;
}
/**
 * @return {string}
 */
function getRandomString() {
    return Math.random().toString(36).slice(2);
}
/**
 * @param {?} value
 * @param {string=} msg
 * @return {?}
 */
function checkExhaustive(value, msg = `unexpected value ${value}!`) {
    throw new Error(msg);
}
