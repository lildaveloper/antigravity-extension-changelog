/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview Exports methods for serializing CSS tokens.
 * Generated from: third_party/javascript/safevalues/builders/html_sanitizer/css/serializer.ts
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
goog.module('google3.third_party.javascript.safevalues.builders.html_sanitizer.css.serializer');
var module = module || { id: 'third_party/javascript/safevalues/builders/html_sanitizer/css/serializer.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_tokens_1 = goog.requireType("google3.third_party.javascript.safevalues.builders.html_sanitizer.css.tokens");
const tokens_1 = goog.require('google3.third_party.javascript.safevalues.builders.html_sanitizer.css.tokens');
/**
 * @param {string} c
 * @return {string}
 */
function escapeCodePoint(c) {
    return `\\${(/** @type {number} */ (c.codePointAt(0))).toString(16)} `;
}
/**
 * @param {string} str
 * @return {string}
 */
function escapeString(str) {
    // We don't escape some characters to increase readability.
    return ('"' +
        str.replace(/[^A-Za-z0-9_/. :,?=%;-]/g, (/**
         * @param {string} c
         * @return {string}
         */
        (c) => escapeCodePoint(c))) +
        '"');
}
/**
 * Escapes a CSS identifier.
 *
 * @param {string} ident The identifier to escape.
 * @return {string} The escaped identifier.
 */
function escapeIdent(ident) {
    // We don't generally escape digits or "-" in identifiers, however we do need
    // to do this for the first character to avoid ambiguity.
    //
    // For example, the string "123" would create a valid number token, but if
    // we want to have an ident-token, it needs to be escaped as a "\31 23".
    /** @type {string} */
    const firstChar = /^[^A-Za-z_]/.test(ident)
        ? escapeCodePoint(ident[0])
        : ident[0];
    return (firstChar +
        ident.slice(1).replace(/[^A-Za-z0-9_-]/g, (/**
         * @param {string} c
         * @return {string}
         */
        (c) => escapeCodePoint(c))));
}
exports.escapeIdent = escapeIdent;
/**
 * Serializes a CSS token to a string.
 *
 * @param {(!tsickle_tokens_1.AtKeywordToken|!tsickle_tokens_1.CdcToken|!tsickle_tokens_1.CdoToken|!tsickle_tokens_1.CloseCurlyToken|!tsickle_tokens_1.CloseParenToken|!tsickle_tokens_1.CloseSquareToken|!tsickle_tokens_1.ColonToken|!tsickle_tokens_1.CommaToken|!tsickle_tokens_1.DelimToken|!tsickle_tokens_1.DimensionToken|!tsickle_tokens_1.EofToken|!tsickle_tokens_1.FunctionToken|!tsickle_tokens_1.HashToken|!tsickle_tokens_1.IdentToken|!tsickle_tokens_1.NumberToken|!tsickle_tokens_1.OpenCurlyToken|!tsickle_tokens_1.OpenParenToken|!tsickle_tokens_1.OpenSquareToken|!tsickle_tokens_1.PercentageToken|!tsickle_tokens_1.SemicolonToken|!tsickle_tokens_1.StringToken|!tsickle_tokens_1.WhitespaceToken)} token The token to serialize.
 * @return {string} The serialized token.
 */
function serializeToken(token) {
    switch (token.tokenKind) {
        case tokens_1.CssTokenKind.AT_KEYWORD:
            return `@${escapeIdent((/** @type {!tsickle_tokens_1.AtKeywordToken} */ (token)).name)}`;
        case tokens_1.CssTokenKind.CDC:
            return '-->';
        case tokens_1.CssTokenKind.CDO:
            return '<!--';
        case tokens_1.CssTokenKind.CLOSE_CURLY:
            return '}';
        case tokens_1.CssTokenKind.CLOSE_PAREN:
            return ')';
        case tokens_1.CssTokenKind.CLOSE_SQUARE:
            return ']';
        case tokens_1.CssTokenKind.COLON:
            return ':';
        case tokens_1.CssTokenKind.COMMA:
            return ',';
        case tokens_1.CssTokenKind.DELIM:
            // A <delim-token> containing U+005C REVERSE SOLIDUS (\) must be
            // serialized as U+005C REVERSE SOLIDUS followed by a newline. (The
            // tokenizer only ever emits such a token followed by a <whitespace-token>
            // that starts with a newline.)
            // Source: https://www.w3.org/TR/2021/CRD-css-syntax-3-20211224/#serialization
            if ((/** @type {!tsickle_tokens_1.DelimToken} */ (token)).codePoint === '\\') {
                return '\\\n';
            }
            return (/** @type {!tsickle_tokens_1.DelimToken} */ (token)).codePoint;
        case tokens_1.CssTokenKind.DIMENSION:
            return (/** @type {!tsickle_tokens_1.DimensionToken} */ (token)).repr + escapeIdent((/** @type {!tsickle_tokens_1.DimensionToken} */ (token)).dimension);
        case tokens_1.CssTokenKind.EOF:
            return '';
        case tokens_1.CssTokenKind.FUNCTION:
            return escapeIdent((/** @type {!tsickle_tokens_1.FunctionToken} */ (token)).lowercaseName) + '(';
        case tokens_1.CssTokenKind.HASH:
            return '#' + escapeIdent((/** @type {!tsickle_tokens_1.HashToken} */ (token)).value);
        case tokens_1.CssTokenKind.IDENT:
            return escapeIdent((/** @type {!tsickle_tokens_1.IdentToken} */ (token)).ident);
        case tokens_1.CssTokenKind.NUMBER:
            return (/** @type {!tsickle_tokens_1.NumberToken} */ (token)).repr;
        case tokens_1.CssTokenKind.OPEN_CURLY:
            return '{';
        case tokens_1.CssTokenKind.OPEN_PAREN:
            return '(';
        case tokens_1.CssTokenKind.OPEN_SQUARE:
            return '[';
        case tokens_1.CssTokenKind.PERCENTAGE:
            return (/** @type {!tsickle_tokens_1.PercentageToken} */ (token)).repr + '%';
        case tokens_1.CssTokenKind.SEMICOLON:
            return ';';
        case tokens_1.CssTokenKind.STRING:
            return escapeString((/** @type {!tsickle_tokens_1.StringToken} */ (token)).value);
        case tokens_1.CssTokenKind.WHITESPACE:
            return ' ';
        default:
            checkExhaustive(token);
    }
}
exports.serializeToken = serializeToken;
/**
 * Serializes a list of CSS tokens to a string.
 *
 * @param {!Array<(!tsickle_tokens_1.AtKeywordToken|!tsickle_tokens_1.CdcToken|!tsickle_tokens_1.CdoToken|!tsickle_tokens_1.CloseCurlyToken|!tsickle_tokens_1.CloseParenToken|!tsickle_tokens_1.CloseSquareToken|!tsickle_tokens_1.ColonToken|!tsickle_tokens_1.CommaToken|!tsickle_tokens_1.DelimToken|!tsickle_tokens_1.DimensionToken|!tsickle_tokens_1.EofToken|!tsickle_tokens_1.FunctionToken|!tsickle_tokens_1.HashToken|!tsickle_tokens_1.IdentToken|!tsickle_tokens_1.NumberToken|!tsickle_tokens_1.OpenCurlyToken|!tsickle_tokens_1.OpenParenToken|!tsickle_tokens_1.OpenSquareToken|!tsickle_tokens_1.PercentageToken|!tsickle_tokens_1.SemicolonToken|!tsickle_tokens_1.StringToken|!tsickle_tokens_1.WhitespaceToken)>} tokens The tokens to serialize.
 * @return {string} The serialized tokens.
 */
function serializeTokens(tokens) {
    // BEGIN-INTERNAL
    // TODO(securitymb): Per spec [1] we should add an empty comment between certain
    // kinds of tokens. However, given that we're willfully violating the spec
    // by emitting a whitespace token for comments, we *probably* don't need to
    // worry about this.
    //
    // We should probably test it more thouroughly though, and implement the
    // empty comments if needed.
    //
    // [1]: https://www.w3.org/TR/css-syntax-3/#serialization:~:text=For%20any%20consecutive,(%2Dtoken
    // END-INTERNAL
    return tokens.map(serializeToken).join('');
}
exports.serializeTokens = serializeTokens;
/**
 * @param {?} value
 * @param {string=} msg
 * @return {?}
 */
function checkExhaustive(value, msg = `unexpected value ${value}!`) {
    throw new Error(msg);
}
