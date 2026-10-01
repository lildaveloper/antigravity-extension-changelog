/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview List of tokens that can be produced by the CSS tokenizer.
 * Generated from: third_party/javascript/safevalues/builders/html_sanitizer/css/tokens.ts
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
goog.module('google3.third_party.javascript.safevalues.builders.html_sanitizer.css.tokens');
var module = module || { id: 'third_party/javascript/safevalues/builders/html_sanitizer/css/tokens.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
/** @enum {number} */
const CssTokenKind = {
    AT_KEYWORD: 0,
    CDC: 1,
    CDO: 2,
    CLOSE_CURLY: 3,
    CLOSE_PAREN: 4,
    CLOSE_SQUARE: 5,
    COLON: 6,
    COMMA: 7,
    DELIM: 8,
    DIMENSION: 9,
    EOF: 10,
    FUNCTION: 11,
    HASH: 12,
    IDENT: 13,
    NUMBER: 14,
    OPEN_CURLY: 15,
    OPEN_PAREN: 16,
    OPEN_SQUARE: 17,
    PERCENTAGE: 18,
    SEMICOLON: 19,
    STRING: 20,
    WHITESPACE: 21,
};
exports.CssTokenKind = CssTokenKind;
CssTokenKind[CssTokenKind.AT_KEYWORD] = 'AT_KEYWORD';
CssTokenKind[CssTokenKind.CDC] = 'CDC';
CssTokenKind[CssTokenKind.CDO] = 'CDO';
CssTokenKind[CssTokenKind.CLOSE_CURLY] = 'CLOSE_CURLY';
CssTokenKind[CssTokenKind.CLOSE_PAREN] = 'CLOSE_PAREN';
CssTokenKind[CssTokenKind.CLOSE_SQUARE] = 'CLOSE_SQUARE';
CssTokenKind[CssTokenKind.COLON] = 'COLON';
CssTokenKind[CssTokenKind.COMMA] = 'COMMA';
CssTokenKind[CssTokenKind.DELIM] = 'DELIM';
CssTokenKind[CssTokenKind.DIMENSION] = 'DIMENSION';
CssTokenKind[CssTokenKind.EOF] = 'EOF';
CssTokenKind[CssTokenKind.FUNCTION] = 'FUNCTION';
CssTokenKind[CssTokenKind.HASH] = 'HASH';
CssTokenKind[CssTokenKind.IDENT] = 'IDENT';
CssTokenKind[CssTokenKind.NUMBER] = 'NUMBER';
CssTokenKind[CssTokenKind.OPEN_CURLY] = 'OPEN_CURLY';
CssTokenKind[CssTokenKind.OPEN_PAREN] = 'OPEN_PAREN';
CssTokenKind[CssTokenKind.OPEN_SQUARE] = 'OPEN_SQUARE';
CssTokenKind[CssTokenKind.PERCENTAGE] = 'PERCENTAGE';
CssTokenKind[CssTokenKind.SEMICOLON] = 'SEMICOLON';
CssTokenKind[CssTokenKind.STRING] = 'STRING';
CssTokenKind[CssTokenKind.WHITESPACE] = 'WHITESPACE';
/**
 * At-keyword token.
 *
 * https://www.w3.org/TR/2021/CRD-css-syntax-3-20211224/#typedef-at-keyword-token
 * @record
 */
function AtKeywordToken() { }
exports.AtKeywordToken = AtKeywordToken;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!CssTokenKind}
     * @public
     */
    AtKeywordToken.prototype.tokenKind;
    /**
     * @type {string}
     * @public
     */
    AtKeywordToken.prototype.name;
}
/**
 * CDC (Comment Delimiter Close) token. Represents `"-->"`.
 *
 * https://www.w3.org/TR/2021/CRD-css-syntax-3-20211224/#typedef-cdc-token
 * @record
 */
function CdcToken() { }
exports.CdcToken = CdcToken;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!CssTokenKind}
     * @public
     */
    CdcToken.prototype.tokenKind;
}
/**
 * CDO (Comment Delimiter Open) token. Represents `"<!--"`.
 *
 * https://www.w3.org/TR/2021/CRD-css-syntax-3-20211224/#typedef-cdo-token
 * @record
 */
function CdoToken() { }
exports.CdoToken = CdoToken;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!CssTokenKind}
     * @public
     */
    CdoToken.prototype.tokenKind;
}
/**
 * Close curly bracket token.
 *
 * https://www.w3.org/TR/2021/CRD-css-syntax-3-20211224/#tokendef-close-curly
 * @record
 */
function CloseCurlyToken() { }
exports.CloseCurlyToken = CloseCurlyToken;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!CssTokenKind}
     * @public
     */
    CloseCurlyToken.prototype.tokenKind;
}
/**
 * Close parenthesis token.
 *
 * https://www.w3.org/TR/2021/CRD-css-syntax-3-20211224/#tokendef-close-paren
 * @record
 */
function CloseParenToken() { }
exports.CloseParenToken = CloseParenToken;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!CssTokenKind}
     * @public
     */
    CloseParenToken.prototype.tokenKind;
}
/**
 * Close square bracket token.
 *
 * https://www.w3.org/TR/2021/CRD-css-syntax-3-20211224/#tokendef-close-square
 * @record
 */
function CloseSquareToken() { }
exports.CloseSquareToken = CloseSquareToken;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!CssTokenKind}
     * @public
     */
    CloseSquareToken.prototype.tokenKind;
}
/**
 * Colon token.
 *
 * https://www.w3.org/TR/2021/CRD-css-syntax-3-20211224/#typedef-colon-token
 * @record
 */
function ColonToken() { }
exports.ColonToken = ColonToken;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!CssTokenKind}
     * @public
     */
    ColonToken.prototype.tokenKind;
}
/**
 * Comma token.
 *
 * https://www.w3.org/TR/2021/CRD-css-syntax-3-20211224/#typedef-comma-token
 * @record
 */
function CommaToken() { }
exports.CommaToken = CommaToken;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!CssTokenKind}
     * @public
     */
    CommaToken.prototype.tokenKind;
}
/**
 * Delim token.
 *
 * It has a value composed of a single code point.
 *
 * https://www.w3.org/TR/2021/CRD-css-syntax-3-20211224/#typedef-delim-token
 * @record
 */
function DelimToken() { }
exports.DelimToken = DelimToken;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!CssTokenKind}
     * @public
     */
    DelimToken.prototype.tokenKind;
    /**
     * @type {string}
     * @public
     */
    DelimToken.prototype.codePoint;
}
/**
 * Dimension token. (for values such as "10px")
 *
 * The CSS spec requires to also store a flag whether the dimension is an
 * integer or not. We don't need this information for sanitization or
 * serialization, so we'll just ignore it. We also don't store the numeric
 * value of the dimension token; instead we'll just store the original string
 * representation and will always serialize it back.
 *
 * https://www.w3.org/TR/2021/CRD-css-syntax-3-20211224/#typedef-dimension
 * @record
 */
function DimensionToken() { }
exports.DimensionToken = DimensionToken;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!CssTokenKind}
     * @public
     */
    DimensionToken.prototype.tokenKind;
    /**
     * @type {string}
     * @public
     */
    DimensionToken.prototype.repr;
    /**
     * @type {string}
     * @public
     */
    DimensionToken.prototype.dimension;
}
/**
 * EOF token. Always the last token produced by the tokenizer.
 *
 * https://www.w3.org/TR/2021/CRD-css-syntax-3-20211224/#typedef-eof-token
 * @record
 */
function EofToken() { }
exports.EofToken = EofToken;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!CssTokenKind}
     * @public
     */
    EofToken.prototype.tokenKind;
}
/**
 * Function token.
 *
 * https://www.w3.org/TR/2021/CRD-css-syntax-3-20211224/#typedef-function-token
 * @record
 */
function FunctionToken() { }
exports.FunctionToken = FunctionToken;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!CssTokenKind}
     * @public
     */
    FunctionToken.prototype.tokenKind;
    /**
     * @type {string}
     * @public
     */
    FunctionToken.prototype.lowercaseName;
}
/**
 * Hash token.
 *
 * Per spec, the hash token should also have a type flag with value either "id"
 * or "unrestricted". We don't need this information neither for sanitization
 * nor for serialization, so we'll just ignore it.
 *
 * https://www.w3.org/TR/2021/CRD-css-syntax-3-20211224/#typedef-hash-token
 * @record
 */
function HashToken() { }
exports.HashToken = HashToken;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!CssTokenKind}
     * @public
     */
    HashToken.prototype.tokenKind;
    /**
     * @type {string}
     * @public
     */
    HashToken.prototype.value;
}
/**
 * Identifier token.
 *
 * https://www.w3.org/TR/2021/CRD-css-syntax-3-20211224/#typedef-ident-token
 * @record
 */
function IdentToken() { }
exports.IdentToken = IdentToken;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!CssTokenKind}
     * @public
     */
    IdentToken.prototype.tokenKind;
    /**
     * @type {string}
     * @public
     */
    IdentToken.prototype.ident;
}
/**
 * Number token.
 *
 * The CSS spec requires to also store a flag whether the number is an integer
 * or not. We don't need this information for sanitization or serialization,
 * so we'll just ignore it. We also don't store the numeric value of the number
 * token; instead we'll just store the original string representation and will
 * always serialize it back.
 *
 * https://www.w3.org/TR/2021/CRD-css-syntax-3-20211224/#typedef-number-token
 * @record
 */
function NumberToken() { }
exports.NumberToken = NumberToken;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!CssTokenKind}
     * @public
     */
    NumberToken.prototype.tokenKind;
    /**
     * @type {string}
     * @public
     */
    NumberToken.prototype.repr;
}
/**
 * Open curly bracket token.
 *
 * https://www.w3.org/TR/2021/CRD-css-syntax-3-20211224/#tokendef-open-curly
 * @record
 */
function OpenCurlyToken() { }
exports.OpenCurlyToken = OpenCurlyToken;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!CssTokenKind}
     * @public
     */
    OpenCurlyToken.prototype.tokenKind;
}
/**
 * Open parenthesis token.
 *
 * https://www.w3.org/TR/2021/CRD-css-syntax-3-20211224/#tokendef-open-paren
 * @record
 */
function OpenParenToken() { }
exports.OpenParenToken = OpenParenToken;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!CssTokenKind}
     * @public
     */
    OpenParenToken.prototype.tokenKind;
}
/**
 * Open square bracket token.
 *
 * https://www.w3.org/TR/2021/CRD-css-syntax-3-20211224/#tokendef-open-square
 * @record
 */
function OpenSquareToken() { }
exports.OpenSquareToken = OpenSquareToken;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!CssTokenKind}
     * @public
     */
    OpenSquareToken.prototype.tokenKind;
}
/**
 * Percentage token. (for values such as "10%")
 *
 * The CSS spec requires to also store a flag whether the percentage is an
 * integer or not. We don't need this information for sanitization or
 * serialization, so we'll just ignore it. We also don't store the numeric
 * value of the percentage token; instead we'll just store the original string
 * representation and will always serialize it back.
 *
 * https://www.w3.org/TR/2021/CRD-css-syntax-3-20211224/#typedef-percentage
 * @record
 */
function PercentageToken() { }
exports.PercentageToken = PercentageToken;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!CssTokenKind}
     * @public
     */
    PercentageToken.prototype.tokenKind;
    /**
     * @type {string}
     * @public
     */
    PercentageToken.prototype.repr;
}
/**
 * Semicolon token.
 *
 * https://www.w3.org/TR/2021/CRD-css-syntax-3-20211224/#typedef-semicolon-token
 * @record
 */
function SemicolonToken() { }
exports.SemicolonToken = SemicolonToken;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!CssTokenKind}
     * @public
     */
    SemicolonToken.prototype.tokenKind;
}
/**
 * String token.
 *
 * The CSS spec also defines a bad-string token, which is not included here
 * because it serves no value for the purposes of the CSS sanitizer. Instead
 * we'll emit just an empty string.
 *
 * https://www.w3.org/TR/2021/CRD-css-syntax-3-20211224/#typedef-string-token
 * @record
 */
function StringToken() { }
exports.StringToken = StringToken;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!CssTokenKind}
     * @public
     */
    StringToken.prototype.tokenKind;
    /**
     * @type {string}
     * @public
     */
    StringToken.prototype.value;
}
/**
 * Whitespace token.
 *
 * https://www.w3.org/TR/2021/CRD-css-syntax-3-20211224/#typedef-whitespace-token
 * @record
 */
function WhitespaceToken() { }
exports.WhitespaceToken = WhitespaceToken;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!CssTokenKind}
     * @public
     */
    WhitespaceToken.prototype.tokenKind;
}
/**
 * A token produced by the CSS tokenizer.
 * @typedef {(!AtKeywordToken|!CdcToken|!CdoToken|!CloseCurlyToken|!CloseParenToken|!CloseSquareToken|!ColonToken|!CommaToken|!DelimToken|!DimensionToken|!EofToken|!FunctionToken|!HashToken|!IdentToken|!NumberToken|!OpenCurlyToken|!OpenParenToken|!OpenSquareToken|!PercentageToken|!SemicolonToken|!StringToken|!WhitespaceToken)}
 */
exports.CssToken;
