/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/javascript/safevalues/builders/html_builders.ts
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
goog.module('google3.third_party.javascript.safevalues.builders.html_builders');
var module = module || { id: 'third_party/javascript/safevalues/builders/html_builders.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_dev_1 = goog.requireType("google3.third_party.javascript.safevalues.environment.dev");
const tsickle_html_impl_2 = goog.requireType("google3.third_party.javascript.safevalues.internals.html_impl");
const tsickle_resource_url_impl_3 = goog.requireType("google3.third_party.javascript.safevalues.internals.resource_url_impl");
const tsickle_script_impl_4 = goog.requireType("google3.third_party.javascript.safevalues.internals.script_impl");
const tsickle_style_sheet_impl_5 = goog.requireType("google3.third_party.javascript.safevalues.internals.style_sheet_impl");
const tsickle_url_impl_6 = goog.requireType("google3.third_party.javascript.safevalues.internals.url_impl");
const tsickle_style_sheet_builders_7 = goog.requireType("google3.third_party.javascript.safevalues.builders.style_sheet_builders");
const tsickle_url_builders_8 = goog.requireType("google3.third_party.javascript.safevalues.builders.url_builders");
const dev_1 = goog.require('google3.third_party.javascript.safevalues.environment.dev'); // LINE-INTERNAL
// LINE-INTERNAL
const html_impl_1 = goog.require('google3.third_party.javascript.safevalues.internals.html_impl');
const resource_url_impl_1 = goog.require('google3.third_party.javascript.safevalues.internals.resource_url_impl');
const script_impl_1 = goog.require('google3.third_party.javascript.safevalues.internals.script_impl');
const style_sheet_impl_1 = goog.require('google3.third_party.javascript.safevalues.internals.style_sheet_impl'); // LINE-INTERNAL
// LINE-INTERNAL
const url_impl_1 = goog.require('google3.third_party.javascript.safevalues.internals.url_impl'); // LINE-INTERNAL
// LINE-INTERNAL
const style_sheet_builders_1 = goog.require('google3.third_party.javascript.safevalues.builders.style_sheet_builders'); // LINE-INTERNAL
// LINE-INTERNAL
const url_builders_1 = goog.require('google3.third_party.javascript.safevalues.builders.url_builders'); // LINE-INTERNAL
// LINE-INTERNAL
/**
 * Returns HTML-escaped text as a `SafeHtml` object. No-op if value is already a
 * SafeHtml instance.
 *
 * Available options:
 * - `preserveSpaces` turns every second consecutive space character into its
 * HTML entity representation (`&#160;`).
 * - `preserveNewlines` turns newline characters into breaks (`<br>`).
 * - `preserveTabs` wraps tab characters in a span with style=white-space:pre.
 * @param {(string|!tsickle_html_impl_2.SafeHtml)} value
 * @param {(undefined|{preserveNewlines: (undefined|boolean), preserveSpaces: (undefined|boolean), preserveTabs: (undefined|boolean)})=} options
 * @return {!tsickle_html_impl_2.SafeHtml}
 */
function htmlEscape(value, options) {
    if ((0, html_impl_1.isHtml)(value)) {
        return value;
    }
    /** @type {string} */
    let htmlEscapedString = htmlEscapeToString(String(value));
    if (options?.preserveSpaces) {
        // Do this first to ensure we preserve spaces after newlines and tabs.
        htmlEscapedString = htmlEscapedString.replace(/(^|[\r\n\t ]) /g, '$1&#160;');
    }
    if (options?.preserveNewlines) {
        htmlEscapedString = htmlEscapedString.replace(/(\r\n|\n|\r)/g, '<br>');
    }
    if (options?.preserveTabs) {
        htmlEscapedString = htmlEscapedString.replace(/(\t+)/g, '<span style="white-space:pre">$1</span>');
    }
    return (0, html_impl_1.createHtmlInternal)(htmlEscapedString);
}
exports.htmlEscape = htmlEscape;
/**
 * Creates a `SafeHtml` representing a script tag with inline script content.
 * @param {!tsickle_script_impl_4.SafeScript} script
 * @param {(undefined|{defer: (undefined|boolean), id: (undefined|string), nonce: (undefined|string), type: (undefined|string)})=} options
 * @return {!tsickle_html_impl_2.SafeHtml}
 */
function scriptToHtml(script, options) {
    /** @type {string} */
    const unwrappedScript = (0, script_impl_1.unwrapScript)(script).toString();
    /** @type {string} */
    let stringTag = `<script`;
    if (options?.id) {
        stringTag += ` id="${htmlEscapeToString(options.id)}"`;
    }
    if (options?.nonce) {
        stringTag += ` nonce="${htmlEscapeToString(options.nonce)}"`;
    }
    if (options?.type) {
        stringTag += ` type="${htmlEscapeToString(options.type)}"`;
    }
    if (options?.defer) {
        stringTag += ` defer`;
    }
    stringTag += `>${unwrappedScript}\u003C/script>`;
    return (0, html_impl_1.createHtmlInternal)(stringTag);
}
exports.scriptToHtml = scriptToHtml;
/**
 * Creates a `SafeHtml` representing a script tag with the src attribute.
 * This also supports CSP nonces and async loading.
 * @param {!tsickle_resource_url_impl_3.TrustedResourceUrl} src
 * @param {(undefined|{async: (undefined|boolean), attributionSrc: (undefined|string), customElement: (undefined|string), defer: (undefined|boolean), id: (undefined|string), nonce: (undefined|string), type: (undefined|string), crossorigin: (undefined|string)})=} options
 * @return {!tsickle_html_impl_2.SafeHtml}
 */
function scriptUrlToHtml(src, options) {
    /** @type {string} */
    const unwrappedSrc = (0, resource_url_impl_1.unwrapResourceUrl)(src).toString();
    /** @type {string} */
    let stringTag = `<script src="${htmlEscapeToString(unwrappedSrc)}"`;
    if (options?.async) {
        stringTag += ' async';
    }
    if (options?.attributionSrc !== undefined) {
        stringTag += ` attributionsrc="${htmlEscapeToString(options.attributionSrc)}"`;
    }
    if (options?.customElement) {
        stringTag += ` custom-element="${htmlEscapeToString(options.customElement)}"`;
    }
    if (options?.defer) {
        stringTag += ` defer`;
    }
    if (options?.id) {
        stringTag += ` id="${htmlEscapeToString(options.id)}"`;
    }
    if (options?.nonce) {
        stringTag += ` nonce="${htmlEscapeToString(options.nonce)}"`;
    }
    if (options?.type) {
        stringTag += ` type="${htmlEscapeToString(options.type)}"`;
    }
    if (options?.crossorigin) {
        stringTag += ` crossorigin="${htmlEscapeToString(options.crossorigin)}"`;
    }
    stringTag += '>\u003C/script>';
    return (0, html_impl_1.createHtmlInternal)(stringTag);
}
exports.scriptUrlToHtml = scriptUrlToHtml;
/**
 * HTML-escapes the given text (`&`, `<`, `>`, `"` and `'`).
 * @param {string} text
 * @return {string}
 */
function htmlEscapeToString(text) {
    /** @type {string} */
    const escaped = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
    return escaped;
}
/**
 * Creates a `SafeHtml` value by concatenating multiple `SafeHtml`s.
 * @param {!ReadonlyArray<(string|!tsickle_html_impl_2.SafeHtml)>} htmls
 * @return {!tsickle_html_impl_2.SafeHtml}
 */
function concatHtmls(htmls) {
    return joinHtmls('', htmls);
}
exports.concatHtmls = concatHtmls;
/**
 * Creates a `SafeHtml` value by concatenating multiple `SafeHtml`s interleaved
 * with a separator.
 * @param {(string|!tsickle_html_impl_2.SafeHtml)} separator
 * @param {!ReadonlyArray<(string|!tsickle_html_impl_2.SafeHtml)>} htmls
 * @return {!tsickle_html_impl_2.SafeHtml}
 */
function joinHtmls(separator, htmls) {
    /** @type {!tsickle_html_impl_2.SafeHtml} */
    const separatorHtml = htmlEscape(separator);
    return (0, html_impl_1.createHtmlInternal)(htmls
        .map((/**
     * @param {(string|!tsickle_html_impl_2.SafeHtml)} value
     * @return {(string|?)}
     */
    (value) => (0, html_impl_1.unwrapHtml)(htmlEscape(value))))
        .join((0, html_impl_1.unwrapHtml)(separatorHtml).toString()));
}
exports.joinHtmls = joinHtmls;
/**
 * Returns a `SafeHtml` that contains `<!DOCTYPE html>`.
 * This is defined as a function to prevent the definition of a Trusted Type
 * policy when simply importing safevalues.
 * @return {!tsickle_html_impl_2.SafeHtml}
 */
function doctypeHtml() {
    return (0, html_impl_1.createHtmlInternal)('<!DOCTYPE html>');
}
exports.doctypeHtml = doctypeHtml;
/**
 * Non-exported version of `nodeToHtml`, with an explicit temporary root to
 * accommodate for the sanitizer's user case.
 * @param {!Node} node
 * @param {!Element} temporaryRoot
 * @return {!tsickle_html_impl_2.SafeHtml}
 */
function nodeToHtmlInternal(node, temporaryRoot) {
    temporaryRoot.appendChild(node);
    // XML serialization is preferred over HTML serialization as it is
    // stricter and makes sure all attributes are properly escaped, avoiding
    // cases where the tree might mutate when parsed again later due to the
    // complexities of the HTML parsing algorithm
    /** @type {string} */
    let serializedNewTree = new XMLSerializer().serializeToString(temporaryRoot);
    // We remove the outer most element as this is the span node created as
    // the root for the sanitized tree and contains a spurious xmlns attribute
    // from the XML serialization step.
    serializedNewTree = serializedNewTree.slice(serializedNewTree.indexOf('>') + 1, serializedNewTree.lastIndexOf('</'));
    return (0, html_impl_1.createHtmlInternal)(serializedNewTree);
}
exports.nodeToHtmlInternal = nodeToHtmlInternal;
/**
 * Serializes a Node into it's HTML representation.
 *
 * Note: this method uses strict XML serialization to mitigate mutation issues
 * when the html is then re-parsed by the browser.
 * @param {!Node} node
 * @return {!tsickle_html_impl_2.SafeHtml}
 */
function nodeToHtml(node) {
    /** @type {!HTMLSpanElement} */
    const tempRoot = document.createElement('span');
    return nodeToHtmlInternal(node, tempRoot);
}
exports.nodeToHtml = nodeToHtml;
/**
 * Type for the attribute value in SafeHtml builders. SafeUrl is
 * in for legacy reasons.
 * @typedef {(string|number|!tsickle_url_impl_6.SafeUrl)}
 */
exports.AttributeValue;
/**
 * Shorthand for union of types that can sensibly be converted to strings
 * or might already be SafeHtml.
 * @typedef {(string|number|boolean|!tsickle_html_impl_2.SafeHtml)}
 */
var TextOrHtml;
/** @type {!RegExp} */
const VALID_TAG_OR_ATTRIBUTE_NAMES = /^[a-z][a-z\d-]*$/i;
/**
 * Tags which are unsupported via createHtml(). They might be
 * supported via a tag-specific create method. These are tags which might
 * require a TrustedResourceUrl in one of their attributes or a restricted
 * type for their content.
 * @type {!Array<string>}
 */
const DISALLOWED_TAG_NAMES = [
    'APPLET',
    'BASE',
    'EMBED',
    'IFRAME',
    'LINK',
    'MATH',
    'META',
    'OBJECT',
    'SCRIPT',
    'STYLE',
    'SVG',
    'TEMPLATE',
];
/**
 * List of void tags.
 * @type {!Array<string>}
 */
exports.VOID_TAG_NAMES = [
    'AREA',
    'BR',
    'COL',
    'COMMAND',
    'HR',
    'IMG',
    'INPUT',
    'KEYGEN',
    'PARAM',
    'SOURCE',
    'TRACK',
    'WBR',
];
/**
 * Attributes that can cause the execution of javascript: URLs.
 * @type {!Array<string>}
 */
const URL_ATTRIBUTES = ['action', 'formaction', 'href'];
/**
 * Verifies if the tag name is valid and if it doesn't change the context.
 * E.g. STRONG is fine but SCRIPT throws because it changes context. See
 * createHtml for an explanation of allowed tags.
 * @throws {!Error} If invalid tag name is provided.
 * @param {string} tagName
 * @return {void}
 */
function verifyTagName(tagName) {
    if (!VALID_TAG_OR_ATTRIBUTE_NAMES.test(tagName)) {
        throw new Error(dev_1.DEV_MODE ? `Invalid tag name <${tagName}>.` : '');
    }
    if (DISALLOWED_TAG_NAMES.indexOf(tagName.toUpperCase()) !== -1) {
        throw new Error(dev_1.DEV_MODE ? `Tag name <${tagName}> is not allowed for createHtml.` : '');
    }
}
exports.verifyTagName = verifyTagName;
/**
 * Returns true if the tag name is a void tag.
 * @param {string} tagName
 * @return {boolean}
 */
function isVoidTag(tagName) {
    return exports.VOID_TAG_NAMES.indexOf(tagName.toUpperCase()) !== -1;
}
exports.isVoidTag = isVoidTag;
/**
 * Creates a SafeHtml content consisting of a tag with optional attributes and
 * optional content.
 * This is roughly equivalent to Closure's goog.html.SafeHtml.create function,
 * with a few dropped features, like Const strings. It is discouraged for new
 * usages. Prefer using a recommended templating system like Lit instead.
 *
 * Example usage:
 *
 * createHtml('br');
 * createHtml('div', {'class': 'a'});
 * createHtml('p', {}, 'a');
 * createHtml('p', {}, createHtml('br'));
 *
 * createHtml('span', {
 *   'style': {'margin': '0'}
 * });
 *
 * To guarantee SafeHtml's type contract is upheld there are restrictions on
 * attribute values and tag names.
 *
 * - Attributes which contain script code (e.g. on*) are disallowed.
 * - For attributes which are interpreted as URLs (e.g. src, href), the URL
 * will be sanitized with javascript: URLs blocked.
 * - Tags which are not supported by this function are applet, base, embed,
 *   iframe, link, math, meta, object, script, style, svg, and template.
 * @param {string} tagName
 * @param {(undefined|!Object<string,(undefined|string|number|!tsickle_url_impl_6.SafeUrl)>)=} attributes
 * @param {(undefined|string|number|boolean|!Array<(string|number|boolean|!tsickle_html_impl_2.SafeHtml)>|!tsickle_html_impl_2.SafeHtml)=} content
 * @return {!tsickle_html_impl_2.SafeHtml}
 */
function createHtml(tagName, attributes, content) {
    verifyTagName(tagName);
    /** @type {string} */
    let result = `<${tagName}`;
    if (attributes) {
        result += stringifyAttributes(tagName, attributes);
    }
    if (!Array.isArray(content)) {
        content = content === undefined ? [] : [content];
    }
    if (isVoidTag(tagName)) {
        if (dev_1.DEV_MODE) {
            if ((/** @type {!Array<(string|number|boolean|!tsickle_html_impl_2.SafeHtml)>} */ (content)).length > 0) {
                throw new Error(`Void tag <${tagName}> does not allow content.`);
            }
        }
        result += '>';
    }
    else {
        /** @type {!tsickle_html_impl_2.SafeHtml} */
        const html = concatHtmls((/** @type {!Array<(string|number|boolean|!tsickle_html_impl_2.SafeHtml)>} */ (content)).map((/**
         * @param {(string|number|boolean|!tsickle_html_impl_2.SafeHtml)} value
         * @return {!tsickle_html_impl_2.SafeHtml}
         */
        (value) => (0, html_impl_1.isHtml)(value) ? value : htmlEscape(String(value)))));
        result += '>' + html.toString() + '</' + tagName + '>';
    }
    return (0, html_impl_1.createHtmlInternal)(result);
}
exports.createHtml = createHtml;
/**
 * Creates a SafeHtml representing a style tag. The type attribute is set
 * to "text/css".
 * @throws {!Error} If invalid attribute name or attribute value is provided or
 *     if attributes contains the type attribute.
 * @param {(!Array<!tsickle_style_sheet_impl_5.SafeStyleSheet>|!tsickle_style_sheet_impl_5.SafeStyleSheet)} styleSheet Content to put inside the tag. Array elements are
 *     concatenated.
 * @param {(undefined|!Object<string,(undefined|string|number|!tsickle_url_impl_6.SafeUrl)>)=} attributes Mapping from attribute names to their values. Only
 *     attribute names consisting of [a-zA-Z0-9-] are allowed. Value of
 *     undefined causes the attribute to be omitted.
 * @return {!tsickle_html_impl_2.SafeHtml} The SafeHtml content with the tag.
 */
function styleSheetToHtml(styleSheet, attributes) {
    /** @type {!Object<string,(undefined|string|number|!tsickle_url_impl_6.SafeUrl)>} */
    const combinedAttributes = {};
    if (attributes) {
        /** @type {!Array<string>} */
        const customAttrNames = Object.keys(attributes);
        for (let i = 0; i < customAttrNames.length; i++) {
            /** @type {string} */
            const name = customAttrNames[i];
            if (name.toLowerCase() === 'type') {
                throw new Error(dev_1.DEV_MODE
                    ? `Cannot override the 'type' attribute with value ${attributes[name]}.`
                    : '');
            }
            combinedAttributes[name] = attributes[name];
        }
    }
    combinedAttributes['type'] = 'text/css';
    /** @type {string} */
    const stringifiedAttributes = stringifyAttributes('style', combinedAttributes);
    if (Array.isArray(styleSheet)) {
        styleSheet = (0, style_sheet_builders_1.concatStyleSheets)(styleSheet);
    }
    /** @type {string} */
    const styleContent = (0, style_sheet_impl_1.unwrapStyleSheet)(styleSheet);
    return (0, html_impl_1.createHtmlInternal)(`<style ${stringifiedAttributes}>${styleContent}</style>`);
}
exports.styleSheetToHtml = styleSheetToHtml;
/**
 * Creates a string with attributes to insert after tagName.
 * @throws {!Error} If attribute value is unsafe for the given tag and
 *     attribute.
 * @param {string} tagName
 * @param {!Object<string,(undefined|string|number|!tsickle_url_impl_6.SafeUrl)>} attributes
 * @return {string}
 */
function stringifyAttributes(tagName, attributes) {
    /** @type {string} */
    let result = '';
    /** @type {!Array<string>} */
    const attrNames = Object.keys(attributes);
    for (let i = 0; i < attrNames.length; i++) {
        /** @type {string} */
        const name = attrNames[i];
        /** @type {(undefined|string|number|!tsickle_url_impl_6.SafeUrl)} */
        const value = attributes[name];
        if (!VALID_TAG_OR_ATTRIBUTE_NAMES.test(name)) {
            throw new Error(dev_1.DEV_MODE ? `Invalid attribute name "${name}".` : '');
        }
        if (value === undefined || value === null) {
            continue;
        }
        result += ' ' + getAttrNameAndValue(tagName, name, value);
    }
    return result;
}
exports.stringifyAttributes = stringifyAttributes;
/**
 * @param {string} tagName
 * @param {string} name
 * @param {(string|number|!tsickle_url_impl_6.SafeUrl)} value
 * @return {string}
 */
function getAttrNameAndValue(tagName, name, value) {
    if (/^on./i.test(name)) {
        throw new Error(dev_1.DEV_MODE
            ? `Attribute "${name} is forbidden. Inline event handlers can lead to XSS. Please use the 'addEventListener' API instead.`
            : '');
    }
    else if (URL_ATTRIBUTES.indexOf(name.toLowerCase()) !== -1) {
        if ((0, url_impl_1.isUrl)(value)) {
            value = (/** @type {!tsickle_url_impl_6.SafeUrl} */ (value)).toString();
        }
        else {
            value = (0, url_builders_1.sanitizeJavaScriptUrl)(String(value)) || 'about:invalid#zClosurez';
        }
    }
    if (dev_1.DEV_MODE) {
        if (!(0, url_impl_1.isUrl)(value) &&
            !(0, html_impl_1.isHtml)(value) &&
            typeof value !== 'string' &&
            typeof value !== 'number') {
            throw new Error(`String or number value expected, got ${typeof value} with value '${value}' given.`);
        }
    }
    return `${name}="${htmlEscape(String(value))}"`;
}
