/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview Defines the CSS sanitizer.
 *
 * Note that the CSS sanitizer is performing custom serialization of the CSS
 * string, instead of using `cssText`. The reason for that is twofold:
 *
 * 1. Serialization is not super precisely defined in the CSS spec so we have no
 *    guarantees that it will be stable across browsers and versions.
 * 2. At the moment of writing the sanitizer, a bug in serialization was found
 *    in Chromium. Controlling the serialization ourselves is a way to avoid
 *    that bug and possibly other ones.
 * Generated from: third_party/javascript/safevalues/builders/html_sanitizer/css/sanitizer.ts
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
goog.module('google3.third_party.javascript.safevalues.builders.html_sanitizer.css.sanitizer');
var module = module || { id: 'third_party/javascript/safevalues/builders/html_sanitizer/css/sanitizer.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_style_1 = goog.requireType("google3.third_party.javascript.safevalues.dom.elements.style");
const tsickle_style_sheet_impl_2 = goog.requireType("google3.third_party.javascript.safevalues.internals.style_sheet_impl");
const tsickle_url_policy_3 = goog.requireType("google3.third_party.javascript.safevalues.builders.html_sanitizer.url_policy");
const tsickle_serializer_4 = goog.requireType("google3.third_party.javascript.safevalues.builders.html_sanitizer.css.serializer");
const tsickle_tokenizer_5 = goog.requireType("google3.third_party.javascript.safevalues.builders.html_sanitizer.css.tokenizer");
const tsickle_tokens_6 = goog.requireType("google3.third_party.javascript.safevalues.builders.html_sanitizer.css.tokens");
const style_1 = goog.require('google3.third_party.javascript.safevalues.dom.elements.style');
const style_sheet_impl_1 = goog.require('google3.third_party.javascript.safevalues.internals.style_sheet_impl');
const url_policy_1 = goog.require('google3.third_party.javascript.safevalues.builders.html_sanitizer.url_policy');
const serializer_1 = goog.require('google3.third_party.javascript.safevalues.builders.html_sanitizer.css.serializer');
const tokenizer_1 = goog.require('google3.third_party.javascript.safevalues.builders.html_sanitizer.css.tokenizer');
const tokens_1 = goog.require('google3.third_party.javascript.safevalues.builders.html_sanitizer.css.tokens');
/**
 * A function that can be used to discard a property.
 *
 * \@param name The name of the property.
 * \@return Whether the property should be discarded.
 * @typedef {function(string): boolean}
 */
exports.PropertyDiscarder;
class CssSanitizer {
    /**
     * @public
     * @param {!ReadonlySet<string>} propertyAllowlist
     * @param {!ReadonlySet<string>} functionAllowlist
     * @param {(undefined|function(!URL, (!StyleElementOrAttributeUrlPolicyHints|!HtmlAttributeUrlPolicyHints)): (null|!URL))} resourceUrlPolicy
     * @param {boolean} allowKeyframes
     * @param {!Array<function(string): boolean>} propertyDiscarders
     */
    constructor(propertyAllowlist, functionAllowlist, resourceUrlPolicy, allowKeyframes, propertyDiscarders) {
        this.propertyAllowlist = propertyAllowlist;
        this.functionAllowlist = functionAllowlist;
        this.resourceUrlPolicy = resourceUrlPolicy;
        this.allowKeyframes = allowKeyframes;
        this.propertyDiscarders = propertyDiscarders;
        this.inertDocument = document.implementation.createHTMLDocument();
    }
    /**
     * @private
     * @param {string} cssText
     * @return {!CSSStyleSheet}
     */
    getStyleSheet(cssText) {
        /** @type {!HTMLStyleElement} */
        const styleEl = this.inertDocument.createElement('style');
        /** @type {!tsickle_style_sheet_impl_2.SafeStyleSheet} */
        const safeStyleSheet = (0, style_sheet_impl_1.createStyleSheetInternal)(cssText);
        (0, style_1.setStyleTextContent)(styleEl, safeStyleSheet);
        this.inertDocument.head.appendChild(styleEl);
        /** @type {!CSSStyleSheet} */
        const sheet = (/** @type {!CSSStyleSheet} */ (styleEl.sheet));
        // guaranteed to be non-null
        styleEl.remove();
        return sheet;
    }
    /**
     * @private
     * @param {string} cssText
     * @return {!CSSStyleDeclaration}
     */
    getStyleDeclaration(cssText) {
        /** @type {!HTMLDivElement} */
        const div = this.inertDocument.createElement('div');
        div.style.cssText = cssText;
        this.inertDocument.body.appendChild(div);
        /** @type {!CSSStyleDeclaration} */
        const style = div.style;
        div.remove();
        return style;
    }
    /**
     * @private
     * @param {(!tsickle_tokens_6.AtKeywordToken|!tsickle_tokens_6.CdcToken|!tsickle_tokens_6.CdoToken|!tsickle_tokens_6.CloseCurlyToken|!tsickle_tokens_6.CloseParenToken|!tsickle_tokens_6.CloseSquareToken|!tsickle_tokens_6.ColonToken|!tsickle_tokens_6.CommaToken|!tsickle_tokens_6.DelimToken|!tsickle_tokens_6.DimensionToken|!tsickle_tokens_6.EofToken|!tsickle_tokens_6.FunctionToken|!tsickle_tokens_6.HashToken|!tsickle_tokens_6.IdentToken|!tsickle_tokens_6.NumberToken|!tsickle_tokens_6.OpenCurlyToken|!tsickle_tokens_6.OpenParenToken|!tsickle_tokens_6.OpenSquareToken|!tsickle_tokens_6.PercentageToken|!tsickle_tokens_6.SemicolonToken|!tsickle_tokens_6.StringToken|!tsickle_tokens_6.WhitespaceToken)} token
     * @param {(!tsickle_tokens_6.AtKeywordToken|!tsickle_tokens_6.CdcToken|!tsickle_tokens_6.CdoToken|!tsickle_tokens_6.CloseCurlyToken|!tsickle_tokens_6.CloseParenToken|!tsickle_tokens_6.CloseSquareToken|!tsickle_tokens_6.ColonToken|!tsickle_tokens_6.CommaToken|!tsickle_tokens_6.DelimToken|!tsickle_tokens_6.DimensionToken|!tsickle_tokens_6.EofToken|!tsickle_tokens_6.FunctionToken|!tsickle_tokens_6.HashToken|!tsickle_tokens_6.IdentToken|!tsickle_tokens_6.NumberToken|!tsickle_tokens_6.OpenCurlyToken|!tsickle_tokens_6.OpenParenToken|!tsickle_tokens_6.OpenSquareToken|!tsickle_tokens_6.PercentageToken|!tsickle_tokens_6.SemicolonToken|!tsickle_tokens_6.StringToken|!tsickle_tokens_6.WhitespaceToken)} nextToken
     * @return {boolean}
     */
    hasShadowDomEscapingTokens(token, nextToken) {
        // Thanks to using shadow DOM, the only real worry in selectors are
        // pseudo-classes and pseudo-elements that can be used to target elements
        // outside of the shadow DOM. There are three of them:
        //
        // 1. `:host`
        // 2. `:host()`
        // 3. `:host-context()`
        //
        // We'll disallow all of them.
        if (token.tokenKind !== tokens_1.CssTokenKind.COLON) {
            return false;
        }
        if (nextToken.tokenKind === tokens_1.CssTokenKind.IDENT &&
            (/** @type {!tsickle_tokens_6.IdentToken} */ (nextToken)).ident.toLowerCase() === 'host') {
            return true;
        }
        if (nextToken.tokenKind === tokens_1.CssTokenKind.FUNCTION &&
            ((/** @type {!tsickle_tokens_6.FunctionToken} */ (nextToken)).lowercaseName === 'host' ||
                (/** @type {!tsickle_tokens_6.FunctionToken} */ (nextToken)).lowercaseName === 'host-context')) {
            return true;
        }
        return false;
    }
    /**
     * @private
     * @param {string} selector
     * @return {(null|string)}
     */
    sanitizeSelector(selector) {
        // If we find any tokens we deem insecure in a selector, we'll then treat
        // the whole selector as insecure. In this case, we'll return null;
        // otherwise we'll return the re-serialized tokens.
        /** @type {!Array<(!tsickle_tokens_6.AtKeywordToken|!tsickle_tokens_6.CdcToken|!tsickle_tokens_6.CdoToken|!tsickle_tokens_6.CloseCurlyToken|!tsickle_tokens_6.CloseParenToken|!tsickle_tokens_6.CloseSquareToken|!tsickle_tokens_6.ColonToken|!tsickle_tokens_6.CommaToken|!tsickle_tokens_6.DelimToken|!tsickle_tokens_6.DimensionToken|!tsickle_tokens_6.EofToken|!tsickle_tokens_6.FunctionToken|!tsickle_tokens_6.HashToken|!tsickle_tokens_6.IdentToken|!tsickle_tokens_6.NumberToken|!tsickle_tokens_6.OpenCurlyToken|!tsickle_tokens_6.OpenParenToken|!tsickle_tokens_6.OpenSquareToken|!tsickle_tokens_6.PercentageToken|!tsickle_tokens_6.SemicolonToken|!tsickle_tokens_6.StringToken|!tsickle_tokens_6.WhitespaceToken)>} */
        const tokens = (0, tokenizer_1.tokenizeCss)(selector);
        for (let i = 0; i < tokens.length - 1; i++) {
            /** @type {(!tsickle_tokens_6.AtKeywordToken|!tsickle_tokens_6.CdcToken|!tsickle_tokens_6.CdoToken|!tsickle_tokens_6.CloseCurlyToken|!tsickle_tokens_6.CloseParenToken|!tsickle_tokens_6.CloseSquareToken|!tsickle_tokens_6.ColonToken|!tsickle_tokens_6.CommaToken|!tsickle_tokens_6.DelimToken|!tsickle_tokens_6.DimensionToken|!tsickle_tokens_6.EofToken|!tsickle_tokens_6.FunctionToken|!tsickle_tokens_6.HashToken|!tsickle_tokens_6.IdentToken|!tsickle_tokens_6.NumberToken|!tsickle_tokens_6.OpenCurlyToken|!tsickle_tokens_6.OpenParenToken|!tsickle_tokens_6.OpenSquareToken|!tsickle_tokens_6.PercentageToken|!tsickle_tokens_6.SemicolonToken|!tsickle_tokens_6.StringToken|!tsickle_tokens_6.WhitespaceToken)} */
            const token = tokens[i];
            /** @type {(!tsickle_tokens_6.AtKeywordToken|!tsickle_tokens_6.CdcToken|!tsickle_tokens_6.CdoToken|!tsickle_tokens_6.CloseCurlyToken|!tsickle_tokens_6.CloseParenToken|!tsickle_tokens_6.CloseSquareToken|!tsickle_tokens_6.ColonToken|!tsickle_tokens_6.CommaToken|!tsickle_tokens_6.DelimToken|!tsickle_tokens_6.DimensionToken|!tsickle_tokens_6.EofToken|!tsickle_tokens_6.FunctionToken|!tsickle_tokens_6.HashToken|!tsickle_tokens_6.IdentToken|!tsickle_tokens_6.NumberToken|!tsickle_tokens_6.OpenCurlyToken|!tsickle_tokens_6.OpenParenToken|!tsickle_tokens_6.OpenSquareToken|!tsickle_tokens_6.PercentageToken|!tsickle_tokens_6.SemicolonToken|!tsickle_tokens_6.StringToken|!tsickle_tokens_6.WhitespaceToken)} */
            const nextToken = tokens[i + 1];
            if (this.hasShadowDomEscapingTokens(token, nextToken)) {
                return null;
            }
        }
        return (0, serializer_1.serializeTokens)(tokens);
    }
    /**
     * @private
     * @param {string} propertyName
     * @param {string} value
     * @param {boolean} calledFromStyleElement
     * @return {(null|string)}
     */
    sanitizeValue(propertyName, value, calledFromStyleElement) {
        // Values can contain functions, such as url() or rgba(). We maintain
        // an allowlist of functions and we make sure that only those are allowed.
        // Furthermore, a special logic is needed to handle url() functions.
        /** @type {!Array<(!tsickle_tokens_6.AtKeywordToken|!tsickle_tokens_6.CdcToken|!tsickle_tokens_6.CdoToken|!tsickle_tokens_6.CloseCurlyToken|!tsickle_tokens_6.CloseParenToken|!tsickle_tokens_6.CloseSquareToken|!tsickle_tokens_6.ColonToken|!tsickle_tokens_6.CommaToken|!tsickle_tokens_6.DelimToken|!tsickle_tokens_6.DimensionToken|!tsickle_tokens_6.EofToken|!tsickle_tokens_6.FunctionToken|!tsickle_tokens_6.HashToken|!tsickle_tokens_6.IdentToken|!tsickle_tokens_6.NumberToken|!tsickle_tokens_6.OpenCurlyToken|!tsickle_tokens_6.OpenParenToken|!tsickle_tokens_6.OpenSquareToken|!tsickle_tokens_6.PercentageToken|!tsickle_tokens_6.SemicolonToken|!tsickle_tokens_6.StringToken|!tsickle_tokens_6.WhitespaceToken)>} */
        const tokens = (0, tokenizer_1.tokenizeCss)(value);
        for (let i = 0; i < tokens.length; i++) {
            /** @type {(!tsickle_tokens_6.AtKeywordToken|!tsickle_tokens_6.CdcToken|!tsickle_tokens_6.CdoToken|!tsickle_tokens_6.CloseCurlyToken|!tsickle_tokens_6.CloseParenToken|!tsickle_tokens_6.CloseSquareToken|!tsickle_tokens_6.ColonToken|!tsickle_tokens_6.CommaToken|!tsickle_tokens_6.DelimToken|!tsickle_tokens_6.DimensionToken|!tsickle_tokens_6.EofToken|!tsickle_tokens_6.FunctionToken|!tsickle_tokens_6.HashToken|!tsickle_tokens_6.IdentToken|!tsickle_tokens_6.NumberToken|!tsickle_tokens_6.OpenCurlyToken|!tsickle_tokens_6.OpenParenToken|!tsickle_tokens_6.OpenSquareToken|!tsickle_tokens_6.PercentageToken|!tsickle_tokens_6.SemicolonToken|!tsickle_tokens_6.StringToken|!tsickle_tokens_6.WhitespaceToken)} */
            const token = tokens[i];
            if (token.tokenKind !== tokens_1.CssTokenKind.FUNCTION) {
                continue;
            }
            // The whole value is disregarded if it contains a disallowed function.
            if (!this.functionAllowlist.has((/** @type {!tsickle_tokens_6.FunctionToken} */ (token)).lowercaseName)) {
                return null;
            }
            if ((/** @type {!tsickle_tokens_6.FunctionToken} */ (token)).lowercaseName === 'url') {
                /** @type {(undefined|!tsickle_tokens_6.AtKeywordToken|!tsickle_tokens_6.CdcToken|!tsickle_tokens_6.CdoToken|!tsickle_tokens_6.CloseCurlyToken|!tsickle_tokens_6.CloseParenToken|!tsickle_tokens_6.CloseSquareToken|!tsickle_tokens_6.ColonToken|!tsickle_tokens_6.CommaToken|!tsickle_tokens_6.DelimToken|!tsickle_tokens_6.DimensionToken|!tsickle_tokens_6.EofToken|!tsickle_tokens_6.FunctionToken|!tsickle_tokens_6.HashToken|!tsickle_tokens_6.IdentToken|!tsickle_tokens_6.NumberToken|!tsickle_tokens_6.OpenCurlyToken|!tsickle_tokens_6.OpenParenToken|!tsickle_tokens_6.OpenSquareToken|!tsickle_tokens_6.PercentageToken|!tsickle_tokens_6.SemicolonToken|!tsickle_tokens_6.StringToken|!tsickle_tokens_6.WhitespaceToken)} */
                const nextToken = (/** @type {(undefined|!tsickle_tokens_6.AtKeywordToken|!tsickle_tokens_6.CdcToken|!tsickle_tokens_6.CdoToken|!tsickle_tokens_6.CloseCurlyToken|!tsickle_tokens_6.CloseParenToken|!tsickle_tokens_6.CloseSquareToken|!tsickle_tokens_6.ColonToken|!tsickle_tokens_6.CommaToken|!tsickle_tokens_6.DelimToken|!tsickle_tokens_6.DimensionToken|!tsickle_tokens_6.EofToken|!tsickle_tokens_6.FunctionToken|!tsickle_tokens_6.HashToken|!tsickle_tokens_6.IdentToken|!tsickle_tokens_6.NumberToken|!tsickle_tokens_6.OpenCurlyToken|!tsickle_tokens_6.OpenParenToken|!tsickle_tokens_6.OpenSquareToken|!tsickle_tokens_6.PercentageToken|!tsickle_tokens_6.SemicolonToken|!tsickle_tokens_6.StringToken|!tsickle_tokens_6.WhitespaceToken)} */ (tokens[i + 1]));
                if (nextToken?.tokenKind !== tokens_1.CssTokenKind.STRING) {
                    // Browsers always serialize the first argument of url() as a string.
                    // If this doesn't happen, something weird is going on and we'll
                    // reject the whole value for good measure.
                    return null;
                }
                /** @type {string} */
                const url = (/** @type {!tsickle_tokens_6.StringToken} */ (nextToken)).value;
                /** @type {(null|!URL)} */
                let parsedUrl = (0, url_policy_1.parseUrl)(url);
                if (this.resourceUrlPolicy) {
                    parsedUrl = this.resourceUrlPolicy(parsedUrl, {
                        type: calledFromStyleElement
                            ? url_policy_1.UrlPolicyHintsType.STYLE_ELEMENT
                            : url_policy_1.UrlPolicyHintsType.STYLE_ATTRIBUTE,
                        propertyName,
                    });
                }
                if (!parsedUrl) {
                    return null;
                }
                tokens[i + 1] = {
                    tokenKind: tokens_1.CssTokenKind.STRING,
                    value: parsedUrl.toString(),
                };
                // Skip the string token.
                i++;
            }
        }
        return (0, serializer_1.serializeTokens)(tokens);
    }
    /**
     * @private
     * @param {!CSSKeyframeRule} rule
     * @return {(null|string)}
     */
    sanitizeKeyframeRule(rule) {
        /** @type {string} */
        const sanitizedProperties = this.sanitizeStyleDeclaration(rule.style, true);
        // It should be safe to just re-use `rule.keyText` here because it can only
        // contain comma-separated percentages.
        //
        // https://drafts.csswg.org/css-animations/#dom-csskeyframerule-keytext
        return `${rule.keyText} { ${sanitizedProperties} }`;
    }
    /**
     * @private
     * @param {!CSSKeyframesRule} keyframesRule
     * @return {(null|string)}
     */
    sanitizeKeyframesRule(keyframesRule) {
        if (!this.allowKeyframes) {
            return null;
        }
        /** @type {!Array<string>} */
        const keyframeRules = [];
        for (const rule of keyframesRule.cssRules) {
            if (!(rule instanceof CSSKeyframeRule)) {
                // The only allowed child rules of CSSKeyframesRule are CSSKeyframeRule.
                continue;
            }
            /** @type {(null|string)} */
            const sanitizedRule = this.sanitizeKeyframeRule(rule);
            if (sanitizedRule) {
                keyframeRules.push(sanitizedRule);
            }
        }
        return `@keyframes ${(0, serializer_1.escapeIdent)(keyframesRule.name)} { ${keyframeRules.join(' ')} }`;
    }
    /**
     * @private
     * @param {string} name
     * @return {boolean}
     */
    isPropertyNameAllowed(name) {
        if (!this.propertyAllowlist.has(name)) {
            return false;
        }
        for (const discarder of this.propertyDiscarders) {
            if (discarder(name)) {
                return false;
            }
        }
        return true;
    }
    /**
     * @private
     * @param {string} name
     * @param {string} value
     * @param {boolean} isImportant
     * @param {boolean} calledFromStyleElement
     * @return {(null|string)}
     */
    sanitizeProperty(name, value, isImportant, calledFromStyleElement) {
        if (!this.isPropertyNameAllowed(name)) {
            return null;
        }
        /** @type {(null|string)} */
        const sanitizedValue = this.sanitizeValue(name, value, calledFromStyleElement);
        if (!sanitizedValue) {
            return null;
        }
        return `${(0, serializer_1.escapeIdent)(name)}: ${sanitizedValue}${isImportant ? ' !important' : ''}`;
    }
    /**
     * @private
     * @param {!CSSStyleDeclaration} style
     * @param {boolean} calledFromStyleElement
     * @return {string}
     */
    sanitizeStyleDeclaration(style, calledFromStyleElement) {
        // We sort the property names to ensure a stable serialization. This also
        // makes the output easier to test.
        /** @type {!Array<string>} */
        const sortedPropertyNames = [...style].sort();
        /** @type {string} */
        let sanitizedProperties = '';
        for (const name of sortedPropertyNames) {
            /** @type {string} */
            const value = style.getPropertyValue(name);
            /** @type {boolean} */
            const isImportant = style.getPropertyPriority(name) === 'important';
            /** @type {(null|string)} */
            const sanitizedProperty = this.sanitizeProperty(name, value, isImportant, calledFromStyleElement);
            if (sanitizedProperty) {
                sanitizedProperties += sanitizedProperty + ';';
            }
        }
        return sanitizedProperties;
    }
    /**
     * @private
     * @param {!CSSStyleRule} rule
     * @return {(null|string)}
     */
    sanitizeStyleRule(rule) {
        /** @type {(null|string)} */
        const selector = this.sanitizeSelector(rule.selectorText);
        if (!selector) {
            return null;
        }
        /** @type {string} */
        const sanitizedProperties = this.sanitizeStyleDeclaration(rule.style, true);
        return `${selector} { ${sanitizedProperties} }`;
    }
    /**
     * @public
     * @param {string} cssText
     * @return {string}
     */
    sanitizeStyleElement(cssText) {
        /** @type {!CSSStyleSheet} */
        const styleSheet = this.getStyleSheet(cssText);
        /** @type {!CSSRuleList} */
        const rules = styleSheet.cssRules;
        /** @type {!Array<string>} */
        const output = [];
        for (const rule of rules) {
            if (rule instanceof CSSStyleRule) {
                /** @type {(null|string)} */
                const sanitizedRule = this.sanitizeStyleRule(rule);
                if (sanitizedRule) {
                    output.push(sanitizedRule);
                }
            }
            else if (rule instanceof CSSKeyframesRule) {
                /** @type {(null|string)} */
                const sanitizedRule = this.sanitizeKeyframesRule(rule);
                if (sanitizedRule) {
                    output.push(sanitizedRule);
                }
            }
        }
        return output.join('\n');
    }
    /**
     * @public
     * @param {string} cssText
     * @return {string}
     */
    sanitizeStyleAttribute(cssText) {
        /** @type {!CSSStyleDeclaration} */
        const styleDeclaration = this.getStyleDeclaration(cssText);
        return this.sanitizeStyleDeclaration(styleDeclaration, false);
    }
}
/* istanbul ignore if */
if (false) {
    /**
     * @const {!Document}
     * @private
     */
    CssSanitizer.prototype.inertDocument;
    /**
     * @const {!ReadonlySet<string>}
     * @private
     */
    CssSanitizer.prototype.propertyAllowlist;
    /**
     * @const {!ReadonlySet<string>}
     * @private
     */
    CssSanitizer.prototype.functionAllowlist;
    /**
     * @const {(undefined|function(!URL, (!StyleElementOrAttributeUrlPolicyHints|!HtmlAttributeUrlPolicyHints)): (null|!URL))}
     * @private
     */
    CssSanitizer.prototype.resourceUrlPolicy;
    /**
     * @const {boolean}
     * @private
     */
    CssSanitizer.prototype.allowKeyframes;
    /**
     * @const {!Array<function(string): boolean>}
     * @private
     */
    CssSanitizer.prototype.propertyDiscarders;
}
/**
 * Sanitizes a CSS string in a `<style>` tag.
 *
 * @param {string} cssText The CSS string to sanitize.
 * @param {!ReadonlySet<string>} propertyAllowlist
 * @param {!ReadonlySet<string>} functionAllowlist
 * @param {(undefined|function(!URL, (!StyleElementOrAttributeUrlPolicyHints|!HtmlAttributeUrlPolicyHints)): (null|!URL))} resourceUrlPolicy
 * @param {boolean} allowKeyframes
 * @param {!Array<function(string): boolean>} propertyDiscarders
 * @return {string} The sanitized CSS string.
 */
function sanitizeStyleElement(cssText, propertyAllowlist, functionAllowlist, resourceUrlPolicy, allowKeyframes, propertyDiscarders) {
    return new CssSanitizer(propertyAllowlist, functionAllowlist, resourceUrlPolicy, allowKeyframes, propertyDiscarders).sanitizeStyleElement(cssText);
}
exports.sanitizeStyleElement = sanitizeStyleElement;
/**
 * Sanitizes a CSS string in a `style` attribute.
 *
 * @param {string} cssText The CSS string to sanitize.
 * @param {!ReadonlySet<string>} propertyAllowlist
 * @param {!ReadonlySet<string>} functionAllowlist
 * @param {(undefined|function(!URL, (!StyleElementOrAttributeUrlPolicyHints|!HtmlAttributeUrlPolicyHints)): (null|!URL))} resourceUrlPolicy
 * @param {!Array<function(string): boolean>} propertyDiscarders
 * @return {string} The sanitized CSS string.
 */
function sanitizeStyleAttribute(cssText, propertyAllowlist, functionAllowlist, resourceUrlPolicy, propertyDiscarders) {
    return new CssSanitizer(propertyAllowlist, functionAllowlist, resourceUrlPolicy, false, // allowKeyframes is not relevant for the style attribute
    propertyDiscarders).sanitizeStyleAttribute(cssText);
}
exports.sanitizeStyleAttribute = sanitizeStyleAttribute;
