/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview CSS tokenizer implementing
 * https://www.w3.org/TR/2021/CRD-css-syntax-3-20211224/#tokenization.
 *
 * While the tokenizer attempts to be as close to the spec as possible, there
 * are are certain willful violations, which are described in the comments.
 * Generated from: third_party/javascript/safevalues/builders/html_sanitizer/css/tokenizer.ts
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
goog.module('google3.third_party.javascript.safevalues.builders.html_sanitizer.css.tokenizer');
var module = module || { id: 'third_party/javascript/safevalues/builders/html_sanitizer/css/tokenizer.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_tokens_1 = goog.requireType("google3.third_party.javascript.safevalues.builders.html_sanitizer.css.tokens");
const tokens_1 = goog.require('google3.third_party.javascript.safevalues.builders.html_sanitizer.css.tokens');
/** @type {!RegExp} */
const HEX_DIGIT_REGEX = /^[0-9a-fA-F]$/;
/**
 * We use undefined as a marker of the end of string for the CSS. To make
 * the intent more clear, instead of using `undefined` directly, we use `EOF`.
 * @type {undefined}
 */
const EOF = undefined;
class Tokenizer {
    /**
     * @public
     * @param {string} css
     */
    constructor(css) {
        /**
         * The position in the CSS string of the first code point that hasn't been
         * consumed.
         */
        this.pos = 0;
        this.css = this.preprocess(css);
    }
    /**
     * @public
     * @return {!Array<(!tsickle_tokens_1.AtKeywordToken|!tsickle_tokens_1.CdcToken|!tsickle_tokens_1.CdoToken|!tsickle_tokens_1.CloseCurlyToken|!tsickle_tokens_1.CloseParenToken|!tsickle_tokens_1.CloseSquareToken|!tsickle_tokens_1.ColonToken|!tsickle_tokens_1.CommaToken|!tsickle_tokens_1.DelimToken|!tsickle_tokens_1.DimensionToken|!tsickle_tokens_1.EofToken|!tsickle_tokens_1.FunctionToken|!tsickle_tokens_1.HashToken|!tsickle_tokens_1.IdentToken|!tsickle_tokens_1.NumberToken|!tsickle_tokens_1.OpenCurlyToken|!tsickle_tokens_1.OpenParenToken|!tsickle_tokens_1.OpenSquareToken|!tsickle_tokens_1.PercentageToken|!tsickle_tokens_1.SemicolonToken|!tsickle_tokens_1.StringToken|!tsickle_tokens_1.WhitespaceToken)>}
     */
    tokenize() {
        /** @type {!Array<(!tsickle_tokens_1.AtKeywordToken|!tsickle_tokens_1.CdcToken|!tsickle_tokens_1.CdoToken|!tsickle_tokens_1.CloseCurlyToken|!tsickle_tokens_1.CloseParenToken|!tsickle_tokens_1.CloseSquareToken|!tsickle_tokens_1.ColonToken|!tsickle_tokens_1.CommaToken|!tsickle_tokens_1.DelimToken|!tsickle_tokens_1.DimensionToken|!tsickle_tokens_1.EofToken|!tsickle_tokens_1.FunctionToken|!tsickle_tokens_1.HashToken|!tsickle_tokens_1.IdentToken|!tsickle_tokens_1.NumberToken|!tsickle_tokens_1.OpenCurlyToken|!tsickle_tokens_1.OpenParenToken|!tsickle_tokens_1.OpenSquareToken|!tsickle_tokens_1.PercentageToken|!tsickle_tokens_1.SemicolonToken|!tsickle_tokens_1.StringToken|!tsickle_tokens_1.WhitespaceToken)>} */
        const tokens = [];
        /** @type {(undefined|!tsickle_tokens_1.AtKeywordToken|!tsickle_tokens_1.CdcToken|!tsickle_tokens_1.CdoToken|!tsickle_tokens_1.CloseCurlyToken|!tsickle_tokens_1.CloseParenToken|!tsickle_tokens_1.CloseSquareToken|!tsickle_tokens_1.ColonToken|!tsickle_tokens_1.CommaToken|!tsickle_tokens_1.DelimToken|!tsickle_tokens_1.DimensionToken|!tsickle_tokens_1.EofToken|!tsickle_tokens_1.FunctionToken|!tsickle_tokens_1.HashToken|!tsickle_tokens_1.IdentToken|!tsickle_tokens_1.NumberToken|!tsickle_tokens_1.OpenCurlyToken|!tsickle_tokens_1.OpenParenToken|!tsickle_tokens_1.OpenSquareToken|!tsickle_tokens_1.PercentageToken|!tsickle_tokens_1.SemicolonToken|!tsickle_tokens_1.StringToken|!tsickle_tokens_1.WhitespaceToken)} */
        let lastToken = EOF;
        while (true) {
            /** @type {(!Array<(!tsickle_tokens_1.AtKeywordToken|!tsickle_tokens_1.CdcToken|!tsickle_tokens_1.CdoToken|!tsickle_tokens_1.CloseCurlyToken|!tsickle_tokens_1.CloseParenToken|!tsickle_tokens_1.CloseSquareToken|!tsickle_tokens_1.ColonToken|!tsickle_tokens_1.CommaToken|!tsickle_tokens_1.DelimToken|!tsickle_tokens_1.DimensionToken|!tsickle_tokens_1.EofToken|!tsickle_tokens_1.FunctionToken|!tsickle_tokens_1.HashToken|!tsickle_tokens_1.IdentToken|!tsickle_tokens_1.NumberToken|!tsickle_tokens_1.OpenCurlyToken|!tsickle_tokens_1.OpenParenToken|!tsickle_tokens_1.OpenSquareToken|!tsickle_tokens_1.PercentageToken|!tsickle_tokens_1.SemicolonToken|!tsickle_tokens_1.StringToken|!tsickle_tokens_1.WhitespaceToken)>|!tsickle_tokens_1.AtKeywordToken|!tsickle_tokens_1.CdcToken|!tsickle_tokens_1.CdoToken|!tsickle_tokens_1.CloseCurlyToken|!tsickle_tokens_1.CloseParenToken|!tsickle_tokens_1.CloseSquareToken|!tsickle_tokens_1.ColonToken|!tsickle_tokens_1.CommaToken|!tsickle_tokens_1.DelimToken|!tsickle_tokens_1.DimensionToken|!tsickle_tokens_1.EofToken|!tsickle_tokens_1.FunctionToken|!tsickle_tokens_1.HashToken|!tsickle_tokens_1.IdentToken|!tsickle_tokens_1.NumberToken|!tsickle_tokens_1.OpenCurlyToken|!tsickle_tokens_1.OpenParenToken|!tsickle_tokens_1.OpenSquareToken|!tsickle_tokens_1.PercentageToken|!tsickle_tokens_1.SemicolonToken|!tsickle_tokens_1.StringToken|!tsickle_tokens_1.WhitespaceToken)} */
            const token = this.consumeToken();
            if (Array.isArray(token)) {
                // Array is only returned by consumeUrlToken so there's no need
                // to check for whitespaces.
                tokens.push(...token);
                continue;
            }
            /** @type {boolean} */
            const twoConsecutiveWhitespace = (/** @type {(!tsickle_tokens_1.AtKeywordToken|!tsickle_tokens_1.CdcToken|!tsickle_tokens_1.CdoToken|!tsickle_tokens_1.CloseCurlyToken|!tsickle_tokens_1.CloseParenToken|!tsickle_tokens_1.CloseSquareToken|!tsickle_tokens_1.ColonToken|!tsickle_tokens_1.CommaToken|!tsickle_tokens_1.DelimToken|!tsickle_tokens_1.DimensionToken|!tsickle_tokens_1.EofToken|!tsickle_tokens_1.FunctionToken|!tsickle_tokens_1.HashToken|!tsickle_tokens_1.IdentToken|!tsickle_tokens_1.NumberToken|!tsickle_tokens_1.OpenCurlyToken|!tsickle_tokens_1.OpenParenToken|!tsickle_tokens_1.OpenSquareToken|!tsickle_tokens_1.PercentageToken|!tsickle_tokens_1.SemicolonToken|!tsickle_tokens_1.StringToken|!tsickle_tokens_1.WhitespaceToken)} */ (token)).tokenKind === tokens_1.CssTokenKind.WHITESPACE &&
                lastToken?.tokenKind === tokens_1.CssTokenKind.WHITESPACE;
            if (twoConsecutiveWhitespace) {
                // Willful violation of the spec. There's no use in producing multiple,
                // consecutive whitespace tokens, and merging them into a single token
                // makes parsing easier.
                continue;
            }
            tokens.push(token);
            if ((/** @type {(!tsickle_tokens_1.AtKeywordToken|!tsickle_tokens_1.CdcToken|!tsickle_tokens_1.CdoToken|!tsickle_tokens_1.CloseCurlyToken|!tsickle_tokens_1.CloseParenToken|!tsickle_tokens_1.CloseSquareToken|!tsickle_tokens_1.ColonToken|!tsickle_tokens_1.CommaToken|!tsickle_tokens_1.DelimToken|!tsickle_tokens_1.DimensionToken|!tsickle_tokens_1.EofToken|!tsickle_tokens_1.FunctionToken|!tsickle_tokens_1.HashToken|!tsickle_tokens_1.IdentToken|!tsickle_tokens_1.NumberToken|!tsickle_tokens_1.OpenCurlyToken|!tsickle_tokens_1.OpenParenToken|!tsickle_tokens_1.OpenSquareToken|!tsickle_tokens_1.PercentageToken|!tsickle_tokens_1.SemicolonToken|!tsickle_tokens_1.StringToken|!tsickle_tokens_1.WhitespaceToken)} */ (token)).tokenKind === tokens_1.CssTokenKind.EOF) {
                return tokens;
            }
            lastToken = token;
        }
    }
    /**
     * The first code point in the input stream that has not yet been consumed.
     *
     * https://www.w3.org/TR/2021/CRD-css-syntax-3-20211224/#next-input-code-point
     * @private
     * @return {(undefined|string)}
     */
    nextInputCodePoint() {
        return this.css[this.pos];
    }
    /**
     * @private
     * @return {!Array<?>}
     */
    nextTwoInputCodePoints() {
        return [this.css[this.pos], this.css[this.pos + 1]];
    }
    /**
     * @private
     * @return {!Array<?>}
     */
    nextThreeInputCodePoints() {
        return [this.css[this.pos], this.css[this.pos + 1], this.css[this.pos + 2]];
    }
    /**
     * @private
     * @return {(undefined|string)}
     */
    currentInputCodePoint() {
        return this.css[this.pos - 1];
    }
    /**
     * @private
     * @param {number} n
     * @return {string}
     */
    nextNInputCodePoints(n) {
        return this.css.slice(this.pos, this.pos + n);
    }
    /**
     * @private
     * @return {void}
     */
    consumeTheNextInputCodePoint() {
        this.pos++;
    }
    /**
     * @private
     * @param {number} n
     * @return {void}
     */
    consumeNInputCodePoints(n) {
        this.pos += n;
    }
    /**
     * https://www.w3.org/TR/2021/CRD-css-syntax-3-20211224/#reconsume-the-current-input-code-point
     * @private
     * @return {void}
     */
    reconsumeTheCurrentInputCodePoint() {
        this.pos--;
    }
    /**
     * https://www.w3.org/TR/2021/CRD-css-syntax-3-20211224/#input-preprocessing
     * @private
     * @param {string} css
     * @return {string}
     */
    preprocess(css) {
        return css.replace(/[\x0d\x0c]|\x0d\x0a/g, '\n').replace(/\x00/g, '\ufffd');
    }
    /**
     * https://www.w3.org/TR/2021/CRD-css-syntax-3-20211224/#consume-token
     * @private
     * @return {(!Array<(!tsickle_tokens_1.AtKeywordToken|!tsickle_tokens_1.CdcToken|!tsickle_tokens_1.CdoToken|!tsickle_tokens_1.CloseCurlyToken|!tsickle_tokens_1.CloseParenToken|!tsickle_tokens_1.CloseSquareToken|!tsickle_tokens_1.ColonToken|!tsickle_tokens_1.CommaToken|!tsickle_tokens_1.DelimToken|!tsickle_tokens_1.DimensionToken|!tsickle_tokens_1.EofToken|!tsickle_tokens_1.FunctionToken|!tsickle_tokens_1.HashToken|!tsickle_tokens_1.IdentToken|!tsickle_tokens_1.NumberToken|!tsickle_tokens_1.OpenCurlyToken|!tsickle_tokens_1.OpenParenToken|!tsickle_tokens_1.OpenSquareToken|!tsickle_tokens_1.PercentageToken|!tsickle_tokens_1.SemicolonToken|!tsickle_tokens_1.StringToken|!tsickle_tokens_1.WhitespaceToken)>|!tsickle_tokens_1.AtKeywordToken|!tsickle_tokens_1.CdcToken|!tsickle_tokens_1.CdoToken|!tsickle_tokens_1.CloseCurlyToken|!tsickle_tokens_1.CloseParenToken|!tsickle_tokens_1.CloseSquareToken|!tsickle_tokens_1.ColonToken|!tsickle_tokens_1.CommaToken|!tsickle_tokens_1.DelimToken|!tsickle_tokens_1.DimensionToken|!tsickle_tokens_1.EofToken|!tsickle_tokens_1.FunctionToken|!tsickle_tokens_1.HashToken|!tsickle_tokens_1.IdentToken|!tsickle_tokens_1.NumberToken|!tsickle_tokens_1.OpenCurlyToken|!tsickle_tokens_1.OpenParenToken|!tsickle_tokens_1.OpenSquareToken|!tsickle_tokens_1.PercentageToken|!tsickle_tokens_1.SemicolonToken|!tsickle_tokens_1.StringToken|!tsickle_tokens_1.WhitespaceToken)}
     */
    consumeToken() {
        /** @type {boolean} */
        const consumedComment = this.consumeComments();
        if (consumedComment) {
            // A willful violation of the spec. Per spec no tokens are produced for
            // comments. However, this leads to a risk where two tokens separated by
            // a comment are merged into a single token on serialization. To avoid
            // this, we produce a whitespace token.
            //
            // For example, consider the following input: :ho/**/st { }
            // This will issue two ident tokens: for ":ho" and "st". On serialization,
            // the two tokens will be merged into a single token: ":host", which we
            // consider dangerous.
            //
            // When we add the whitespace then ":ho/**/st" will be serialized as
            // ":ho st", which is safe.
            return { tokenKind: tokens_1.CssTokenKind.WHITESPACE };
        }
        /** @type {(undefined|string)} */
        const codePoint = this.nextInputCodePoint();
        this.consumeTheNextInputCodePoint();
        if (codePoint === EOF) {
            return { tokenKind: tokens_1.CssTokenKind.EOF };
        }
        else if (this.isWhitespace(codePoint)) {
            this.consumeAsMuchWhitespaceAsPossible();
            return { tokenKind: tokens_1.CssTokenKind.WHITESPACE };
        }
        else if (codePoint === "'" || codePoint === '"') {
            return this.consumeString(codePoint);
        }
        else if (codePoint === '#') {
            if (this.isIdentCodePoint(this.nextInputCodePoint()) ||
                this.twoCodePointsAreValidEscape(...this.nextTwoInputCodePoints())) {
                // In spec there's also a step to check if the next three code points
                // would start an ident sequence. However, the only reason to do so
                // is to set the type flag to "id". We don't store this flag, so we
                // don't need to check this.
                return {
                    tokenKind: tokens_1.CssTokenKind.HASH,
                    value: this.consumeIdentSequence(),
                };
            }
            else {
                return { tokenKind: tokens_1.CssTokenKind.DELIM, codePoint: '#' };
            }
        }
        else if (codePoint === '(') {
            return { tokenKind: tokens_1.CssTokenKind.OPEN_PAREN };
        }
        else if (codePoint === ')') {
            return { tokenKind: tokens_1.CssTokenKind.CLOSE_PAREN };
        }
        else if (codePoint === '+') {
            if (this.streamStartsWithANumber()) {
                this.reconsumeTheCurrentInputCodePoint();
                return this.consumeNumericToken();
            }
            else {
                return { tokenKind: tokens_1.CssTokenKind.DELIM, codePoint: '+' };
            }
        }
        else if (codePoint === ',') {
            return { tokenKind: tokens_1.CssTokenKind.COMMA };
        }
        else if (codePoint === '-') {
            if (this.streamStartsWithANumber()) {
                this.reconsumeTheCurrentInputCodePoint();
                return this.consumeNumericToken();
            }
            else if (this.nextNInputCodePoints(2) === '->') {
                this.consumeNInputCodePoints(2);
                return { tokenKind: tokens_1.CssTokenKind.CDC };
            }
            else if (this.streamStartsWithAnIdentSequence()) {
                this.reconsumeTheCurrentInputCodePoint();
                return this.consumeIdentLikeToken();
            }
            else {
                return { tokenKind: tokens_1.CssTokenKind.DELIM, codePoint: '-' };
            }
        }
        else if (codePoint === '.') {
            if (this.streamStartsWithANumber()) {
                this.reconsumeTheCurrentInputCodePoint();
                return this.consumeNumericToken();
            }
            else {
                return { tokenKind: tokens_1.CssTokenKind.DELIM, codePoint: '.' };
            }
        }
        else if (codePoint === ':') {
            return { tokenKind: tokens_1.CssTokenKind.COLON };
        }
        else if (codePoint === ';') {
            return { tokenKind: tokens_1.CssTokenKind.SEMICOLON };
        }
        else if (codePoint === '<') {
            if (this.nextNInputCodePoints(3) === '!--') {
                this.consumeNInputCodePoints(3);
                return { tokenKind: tokens_1.CssTokenKind.CDO };
            }
            else {
                return { tokenKind: tokens_1.CssTokenKind.DELIM, codePoint: '<' };
            }
        }
        else if (codePoint === '@') {
            if (this.threeCodePointsWouldStartAnIdentSequence(...this.nextThreeInputCodePoints())) {
                /** @type {string} */
                const ident = this.consumeIdentSequence();
                return { tokenKind: tokens_1.CssTokenKind.AT_KEYWORD, name: ident };
            }
            else {
                return { tokenKind: tokens_1.CssTokenKind.DELIM, codePoint: '@' };
            }
        }
        else if (codePoint === '\\') {
            if (this.streamStartsWithValidEscape()) {
                this.reconsumeTheCurrentInputCodePoint();
                return this.consumeIdentLikeToken();
            }
            else {
                return { tokenKind: tokens_1.CssTokenKind.DELIM, codePoint: '\\' };
            }
        }
        else if (codePoint === '[') {
            return { tokenKind: tokens_1.CssTokenKind.OPEN_SQUARE };
        }
        else if (codePoint === ']') {
            return { tokenKind: tokens_1.CssTokenKind.CLOSE_SQUARE };
        }
        else if (codePoint === '{') {
            return { tokenKind: tokens_1.CssTokenKind.OPEN_CURLY };
        }
        else if (codePoint === '}') {
            return { tokenKind: tokens_1.CssTokenKind.CLOSE_CURLY };
        }
        else if (this.isDigit(codePoint)) {
            this.reconsumeTheCurrentInputCodePoint();
            return this.consumeNumericToken();
        }
        else if (this.isIdentStartCodePoint(codePoint)) {
            this.reconsumeTheCurrentInputCodePoint();
            return this.consumeIdentLikeToken();
        }
        else {
            return { tokenKind: tokens_1.CssTokenKind.DELIM, codePoint };
        }
    }
    /**
     * https://www.w3.org/TR/2021/CRD-css-syntax-3-20211224/#consume-comments
     * @private
     * @return {boolean}
     */
    consumeComments() {
        /** @type {boolean} */
        let anyComments = false;
        while (this.nextNInputCodePoints(2) === '/*') {
            anyComments = true;
            this.consumeNInputCodePoints(2);
            /** @type {number} */
            const endIndex = this.css.indexOf('*/', this.pos);
            if (endIndex === -1) {
                // If there's no end comment, we assume the rest of the input is a
                // comment.
                this.pos = this.css.length;
                return anyComments;
            }
            this.pos = endIndex + 2;
        }
        return anyComments;
    }
    /**
     * https://www.w3.org/TR/2021/CRD-css-syntax-3-20211224/#consume-string-token
     *
     * @private
     * @param {string} quote The quote character that starts the string.
     * @return {!tsickle_tokens_1.StringToken}
     */
    consumeString(quote) {
        /** @type {!tsickle_tokens_1.StringToken} */
        const stringToken = {
            tokenKind: tokens_1.CssTokenKind.STRING,
            value: '',
        };
        while (true) {
            /** @type {(undefined|string)} */
            const codePoint = this.nextInputCodePoint();
            this.consumeTheNextInputCodePoint();
            if (codePoint === EOF || codePoint === quote) {
                return stringToken;
            }
            else if (this.isNewline(codePoint)) {
                // Per spec, here a bad-string token should be returned. However,
                // because this token isn't really useful for sanitization, we just
                // return an empty string token.
                this.reconsumeTheCurrentInputCodePoint();
                stringToken.value = '';
                return stringToken;
            }
            else if (codePoint === '\\') {
                if (this.nextInputCodePoint() === EOF) {
                    // > If the next input code point is EOF, do nothing.
                    continue;
                }
                else if (this.isNewline(this.nextInputCodePoint())) {
                    this.consumeTheNextInputCodePoint();
                }
                else {
                    /** @type {string} */
                    const escapedCodePoint = this.consumeEscapedCodePoint();
                    stringToken.value += escapedCodePoint;
                }
            }
            else {
                stringToken.value += codePoint;
            }
        }
    }
    /**
     * https://www.w3.org/TR/2021/CRD-css-syntax-3-20211224/#consume-an-escaped-code-point
     * @private
     * @return {string}
     */
    consumeEscapedCodePoint() {
        /** @type {(undefined|string)} */
        const codePoint = this.nextInputCodePoint();
        this.consumeTheNextInputCodePoint();
        if (codePoint === EOF) {
            return '\ufffd';
        }
        else if (this.isHexDigit(codePoint)) {
            /** @type {string} */
            let hexDigits = codePoint;
            // > Consume as many hex digits as possible but no more than 5.
            //
            // The spec assumes here that the first hex digit has already been
            // consumed. So in fact, the maximum number of hex digits that can be
            // consumed is 6.
            while (this.isHexDigit(this.nextInputCodePoint()) &&
                hexDigits.length < 6) {
                hexDigits += this.nextInputCodePoint();
                this.consumeTheNextInputCodePoint();
            }
            // Whitespace directly following an escape sequence is ignored.
            if (this.isWhitespace(this.nextInputCodePoint())) {
                this.consumeTheNextInputCodePoint();
            }
            // Needed to parse hexadecimal.
            // tslint:disable-next-line:ban
            /** @type {number} */
            const num = parseInt(hexDigits, 16);
            return String.fromCodePoint(num);
        }
        else {
            return codePoint;
        }
    }
    /**
     * @private
     * @return {void}
     */
    consumeAsMuchWhitespaceAsPossible() {
        while (this.isWhitespace(this.nextInputCodePoint())) {
            this.consumeTheNextInputCodePoint();
        }
    }
    /**
     * https://www.w3.org/TR/2021/CRD-css-syntax-3-20211224/#consume-an-ident-sequence
     * @private
     * @return {string}
     */
    consumeIdentSequence() {
        /** @type {string} */
        let result = '';
        while (true) {
            /** @type {(undefined|string)} */
            const codePoint = this.nextInputCodePoint();
            this.consumeTheNextInputCodePoint();
            /** @type {(undefined|string)} */
            const codePoint2 = this.nextInputCodePoint();
            if (this.isIdentCodePoint(codePoint)) {
                result += codePoint;
            }
            else if (this.twoCodePointsAreValidEscape(codePoint, codePoint2)) {
                result += this.consumeEscapedCodePoint();
            }
            else {
                this.reconsumeTheCurrentInputCodePoint();
                return result;
            }
        }
    }
    /**
     * https://www.w3.org/TR/2021/CRD-css-syntax-3-20211224/#consume-an-ident-like-token
     * @private
     * @return {(!Array<(!tsickle_tokens_1.AtKeywordToken|!tsickle_tokens_1.CdcToken|!tsickle_tokens_1.CdoToken|!tsickle_tokens_1.CloseCurlyToken|!tsickle_tokens_1.CloseParenToken|!tsickle_tokens_1.CloseSquareToken|!tsickle_tokens_1.ColonToken|!tsickle_tokens_1.CommaToken|!tsickle_tokens_1.DelimToken|!tsickle_tokens_1.DimensionToken|!tsickle_tokens_1.EofToken|!tsickle_tokens_1.FunctionToken|!tsickle_tokens_1.HashToken|!tsickle_tokens_1.IdentToken|!tsickle_tokens_1.NumberToken|!tsickle_tokens_1.OpenCurlyToken|!tsickle_tokens_1.OpenParenToken|!tsickle_tokens_1.OpenSquareToken|!tsickle_tokens_1.PercentageToken|!tsickle_tokens_1.SemicolonToken|!tsickle_tokens_1.StringToken|!tsickle_tokens_1.WhitespaceToken)>|!tsickle_tokens_1.AtKeywordToken|!tsickle_tokens_1.CdcToken|!tsickle_tokens_1.CdoToken|!tsickle_tokens_1.CloseCurlyToken|!tsickle_tokens_1.CloseParenToken|!tsickle_tokens_1.CloseSquareToken|!tsickle_tokens_1.ColonToken|!tsickle_tokens_1.CommaToken|!tsickle_tokens_1.DelimToken|!tsickle_tokens_1.DimensionToken|!tsickle_tokens_1.EofToken|!tsickle_tokens_1.FunctionToken|!tsickle_tokens_1.HashToken|!tsickle_tokens_1.IdentToken|!tsickle_tokens_1.NumberToken|!tsickle_tokens_1.OpenCurlyToken|!tsickle_tokens_1.OpenParenToken|!tsickle_tokens_1.OpenSquareToken|!tsickle_tokens_1.PercentageToken|!tsickle_tokens_1.SemicolonToken|!tsickle_tokens_1.StringToken|!tsickle_tokens_1.WhitespaceToken)}
     */
    consumeIdentLikeToken() {
        /** @type {string} */
        const ident = this.consumeIdentSequence();
        if (/^url$/i.test(ident) && this.nextInputCodePoint() === '(') {
            // TODO(securitymb): This algorithm may look a little weird but we're   // LINE-INTERNAL
            // following the spec here exactly. We will see later on if this can be // LINE-INTERNAL
            // optimized.                                                           // LINE-INTERNAL
            this.consumeTheNextInputCodePoint();
            while (this.nextTwoInputsPointsAreWhitespace()) {
                this.consumeTheNextInputCodePoint();
            }
            /** @type {!Array<?>} */
            const nextTwo = this.nextTwoInputCodePoints();
            if ((this.isWhitespace(nextTwo[0]) &&
                (nextTwo[1] === '"' || nextTwo[1] === "'")) ||
                nextTwo[0] === '"' ||
                nextTwo[0] === "'") {
                // Function names are case-insensitive in CSS so instead of returning
                // "url" in its original casing, we just lowercase it.
                return { tokenKind: tokens_1.CssTokenKind.FUNCTION, lowercaseName: 'url' };
            }
            else {
                return this.consumeUrlToken();
            }
        }
        else if (this.nextInputCodePoint() === '(') {
            this.consumeTheNextInputCodePoint();
            // We lowercase the function name because function names are
            // case-insensitive in CSS.
            return {
                tokenKind: tokens_1.CssTokenKind.FUNCTION,
                lowercaseName: ident.toLowerCase(),
            };
        }
        return { tokenKind: tokens_1.CssTokenKind.IDENT, ident };
    }
    /**
     * https://www.w3.org/TR/2021/CRD-css-syntax-3-20211224/#consume-a-url-token
     *
     * This method has a significant willful violation of the spec. Per spec,
     * URLs in CSS (such as "url(...)") can return two types of tokens, depending
     * on whether the argument is a quoted string or not.
     *
     * So `url(https://example.com)` returns a URL token, while
     * `url('https://example.com')` returns a function token, followed by a string
     * token, followed by a close paren token.
     *
     * Having two types of tokens for URL functions make the sanitization logic
     * more complicated and there's no real benefit to it.
     *
     * So this function will always return a function token, followed by a string
     * token, followed by a close paren token to be consistent.
     *
     * The spec also uses a bad-url token but we instead return an empty string
     * token.
     *
     * @private
     * @return {!Array<(!tsickle_tokens_1.AtKeywordToken|!tsickle_tokens_1.CdcToken|!tsickle_tokens_1.CdoToken|!tsickle_tokens_1.CloseCurlyToken|!tsickle_tokens_1.CloseParenToken|!tsickle_tokens_1.CloseSquareToken|!tsickle_tokens_1.ColonToken|!tsickle_tokens_1.CommaToken|!tsickle_tokens_1.DelimToken|!tsickle_tokens_1.DimensionToken|!tsickle_tokens_1.EofToken|!tsickle_tokens_1.FunctionToken|!tsickle_tokens_1.HashToken|!tsickle_tokens_1.IdentToken|!tsickle_tokens_1.NumberToken|!tsickle_tokens_1.OpenCurlyToken|!tsickle_tokens_1.OpenParenToken|!tsickle_tokens_1.OpenSquareToken|!tsickle_tokens_1.PercentageToken|!tsickle_tokens_1.SemicolonToken|!tsickle_tokens_1.StringToken|!tsickle_tokens_1.WhitespaceToken)>}
     */
    consumeUrlToken() {
        /** @type {string} */
        let url = '';
        this.consumeAsMuchWhitespaceAsPossible();
        while (true) {
            /** @type {(undefined|string)} */
            const codePoint = this.nextInputCodePoint();
            this.consumeTheNextInputCodePoint();
            if (codePoint === ')' || codePoint === EOF) {
                return this.createFunctionUrlToken(url);
            }
            else if (this.isWhitespace(codePoint)) {
                this.consumeAsMuchWhitespaceAsPossible();
                if (this.nextInputCodePoint() === ')' ||
                    this.nextInputCodePoint() === EOF) {
                    this.consumeTheNextInputCodePoint();
                    return this.createFunctionUrlToken(url);
                }
                else {
                    this.consumeRemnantsOfBadUrl();
                    return this.createFunctionUrlToken('');
                }
            }
            else if (codePoint === '"' ||
                codePoint === "'" ||
                codePoint === '(' ||
                this.isNonPrintableCodePoint(codePoint)) {
                this.consumeRemnantsOfBadUrl();
                return this.createFunctionUrlToken('');
            }
            else if (codePoint === '\\') {
                if (this.streamStartsWithValidEscape()) {
                    url += this.consumeEscapedCodePoint();
                }
                else {
                    this.consumeRemnantsOfBadUrl();
                    return this.createFunctionUrlToken('');
                }
            }
            else {
                url += codePoint;
            }
        }
    }
    /**
     * Helper function to make `consumeUrlToken` a little more readable.
     * @private
     * @param {string} url
     * @return {!Array<(!tsickle_tokens_1.AtKeywordToken|!tsickle_tokens_1.CdcToken|!tsickle_tokens_1.CdoToken|!tsickle_tokens_1.CloseCurlyToken|!tsickle_tokens_1.CloseParenToken|!tsickle_tokens_1.CloseSquareToken|!tsickle_tokens_1.ColonToken|!tsickle_tokens_1.CommaToken|!tsickle_tokens_1.DelimToken|!tsickle_tokens_1.DimensionToken|!tsickle_tokens_1.EofToken|!tsickle_tokens_1.FunctionToken|!tsickle_tokens_1.HashToken|!tsickle_tokens_1.IdentToken|!tsickle_tokens_1.NumberToken|!tsickle_tokens_1.OpenCurlyToken|!tsickle_tokens_1.OpenParenToken|!tsickle_tokens_1.OpenSquareToken|!tsickle_tokens_1.PercentageToken|!tsickle_tokens_1.SemicolonToken|!tsickle_tokens_1.StringToken|!tsickle_tokens_1.WhitespaceToken)>}
     */
    createFunctionUrlToken(url) {
        return [
            { tokenKind: tokens_1.CssTokenKind.FUNCTION, lowercaseName: 'url' },
            { tokenKind: tokens_1.CssTokenKind.STRING, value: url },
            { tokenKind: tokens_1.CssTokenKind.CLOSE_PAREN },
        ];
    }
    /**
     * https://www.w3.org/TR/2021/CRD-css-syntax-3-20211224/#consume-the-remnants-of-a-bad-url
     * @private
     * @return {void}
     */
    consumeRemnantsOfBadUrl() {
        while (true) {
            /** @type {(undefined|string)} */
            const codePoint = this.nextInputCodePoint();
            this.consumeTheNextInputCodePoint();
            if (codePoint === EOF || codePoint === ')') {
                return;
            }
            else if (this.streamStartsWithValidEscape()) {
                this.consumeEscapedCodePoint();
            }
        }
    }
    /**
     * The function returns the original representation of the number; we don't
     * try to parse the number, as required by the spec.
     *
     * We also don't return the information whether a number is integer or not
     * since it's irrelevant for sanitization.
     *
     * https://www.w3.org/TR/2021/CRD-css-syntax-3-20211224/#consume-number
     * @private
     * @return {string}
     */
    consumeNumber() {
        /** @type {string} */
        let repr = '';
        {
            /** @type {(undefined|string)} */
            const next = this.nextInputCodePoint();
            if (next === '+' || next === '-') {
                this.consumeTheNextInputCodePoint();
                repr += next;
            }
        }
        repr += this.consumeDigits();
        {
            /** @type {(undefined|string)} */
            const next = this.nextInputCodePoint();
            /** @type {string} */
            const next2 = this.css[this.pos + 1];
            if (next === '.' && this.isDigit(next2)) {
                this.consumeTheNextInputCodePoint();
                repr += '.' + this.consumeDigits();
            }
        }
        {
            /** @type {(undefined|string)} */
            const next = this.nextInputCodePoint();
            /** @type {string} */
            const next2 = this.css[this.pos + 1];
            /** @type {string} */
            const next3 = this.css[this.pos + 2];
            if (next === 'e' || next === 'E') {
                if ((next2 === '+' || next2 === '-') && this.isDigit(next3)) {
                    this.consumeNInputCodePoints(2);
                    repr += next + next2 + this.consumeDigits();
                }
                else if (this.isDigit(next2)) {
                    this.consumeTheNextInputCodePoint();
                    repr += next + this.consumeDigits();
                }
            }
        }
        return repr;
    }
    /**
     * @private
     * @return {string}
     */
    consumeDigits() {
        /** @type {string} */
        let repr = '';
        while (this.isDigit(this.nextInputCodePoint())) {
            repr += this.nextInputCodePoint();
            this.consumeTheNextInputCodePoint();
        }
        return repr;
    }
    /**
     * https://www.w3.org/TR/2021/CRD-css-syntax-3-20211224/#consume-numeric-token
     * @private
     * @return {(!tsickle_tokens_1.DimensionToken|!tsickle_tokens_1.NumberToken|!tsickle_tokens_1.PercentageToken)}
     */
    consumeNumericToken() {
        /** @type {string} */
        const repr = this.consumeNumber();
        if (this.threeCodePointsWouldStartAnIdentSequence(...this.nextThreeInputCodePoints())) {
            return {
                tokenKind: tokens_1.CssTokenKind.DIMENSION,
                repr,
                dimension: this.consumeIdentSequence(),
            };
        }
        if (this.nextInputCodePoint() === '%') {
            this.consumeTheNextInputCodePoint();
            return { tokenKind: tokens_1.CssTokenKind.PERCENTAGE, repr };
        }
        return { tokenKind: tokens_1.CssTokenKind.NUMBER, repr };
    }
    /**
     * @private
     * @return {boolean}
     */
    nextTwoInputsPointsAreWhitespace() {
        return this.nextTwoInputCodePoints().every((/**
         * @param {(undefined|string)} c
         * @return {boolean}
         */
        (c) => this.isWhitespace(c)));
    }
    /**
     * https://www.w3.org/TR/2021/CRD-css-syntax-3-20211224/#check-if-two-code-points-are-a-valid-escape
     * @private
     * @param {(undefined|string)=} codePoint1
     * @param {(undefined|string)=} codePoint2
     * @return {boolean}
     */
    twoCodePointsAreValidEscape(codePoint1, codePoint2) {
        return codePoint1 === '\\' && codePoint2 !== '\n';
    }
    /**
     * @private
     * @return {boolean}
     */
    streamStartsWithValidEscape() {
        return this.twoCodePointsAreValidEscape(this.currentInputCodePoint(), this.nextInputCodePoint());
    }
    /**
     * https://www.w3.org/TR/2021/CRD-css-syntax-3-20211224/#check-if-three-code-points-would-start-a-number
     * @private
     * @param {(undefined|string)=} codePoint1
     * @param {(undefined|string)=} codePoint2
     * @param {(undefined|string)=} codePoint3
     * @return {boolean}
     */
    threeCodePointsWouldStartANumber(codePoint1, codePoint2, codePoint3) {
        if (codePoint1 === '+' || codePoint1 === '-') {
            return (this.isDigit(codePoint2) ||
                (codePoint2 === '.' && this.isDigit(codePoint3)));
        }
        else if (codePoint1 === '.') {
            return this.isDigit(codePoint2);
        }
        else {
            return this.isDigit(codePoint1);
        }
    }
    /**
     * @private
     * @return {boolean}
     */
    streamStartsWithANumber() {
        return this.threeCodePointsWouldStartANumber(this.currentInputCodePoint(), ...this.nextTwoInputCodePoints());
    }
    /**
     * https://www.w3.org/TR/2021/CRD-css-syntax-3-20211224/#would-start-an-identifier
     * @private
     * @param {(undefined|string)=} codePoint1
     * @param {(undefined|string)=} codePoint2
     * @param {(undefined|string)=} codePoint3
     * @return {boolean}
     */
    threeCodePointsWouldStartAnIdentSequence(codePoint1, codePoint2, codePoint3) {
        if (codePoint1 === '-') {
            if (this.isIdentStartCodePoint(codePoint2) || codePoint2 === '-') {
                return true;
            }
            else if (this.twoCodePointsAreValidEscape(codePoint2, codePoint3)) {
                return true;
            }
            else {
                return false;
            }
        }
        else if (this.isIdentStartCodePoint(codePoint1)) {
            return true;
        }
        else if (codePoint1 === '\\') {
            return this.twoCodePointsAreValidEscape(codePoint1, codePoint2);
        }
        else {
            return false;
        }
    }
    /**
     * @private
     * @return {boolean}
     */
    streamStartsWithAnIdentSequence() {
        return this.threeCodePointsWouldStartAnIdentSequence(this.currentInputCodePoint(), ...this.nextTwoInputCodePoints());
    }
    /**
     * @private
     * @param {(undefined|string)} codePoint
     * @return {boolean}
     */
    isDigit(codePoint) {
        return codePoint !== EOF && codePoint >= '0' && codePoint <= '9';
    }
    /**
     * @private
     * @param {(undefined|string)} codePoint
     * @return {boolean}
     */
    isHexDigit(codePoint) {
        return codePoint !== EOF && HEX_DIGIT_REGEX.test(codePoint);
    }
    /**
     * https://www.w3.org/TR/2021/CRD-css-syntax-3-20211224/#newline
     * @private
     * @param {(undefined|string)} codePoint
     * @return {boolean}
     */
    isNewline(codePoint) {
        return codePoint === '\u000a';
    }
    /**
     * https://www.w3.org/TR/2021/CRD-css-syntax-3-20211224/#whitespace
     * @private
     * @param {(undefined|string)} codePoint
     * @return {boolean}
     */
    isWhitespace(codePoint) {
        return (codePoint === ' ' || codePoint === '\u0009' || this.isNewline(codePoint));
    }
    /**
     * True for letters, digits, underscores, hyphens, and non-ASCII code points.
     *
     * https://www.w3.org/TR/2021/CRD-css-syntax-3-20211224/#ident-code-point
     * @private
     * @param {(undefined|string)} codePoint
     * @return {boolean}
     */
    isIdentCodePoint(codePoint) {
        if (codePoint === undefined) {
            return false;
        }
        return /^([A-Za-z0-9_-]|[^\u0000-\u007f])$/.test(codePoint);
    }
    /**
     * https://www.w3.org/TR/2021/CRD-css-syntax-3-20211224/#ident-start-code-point
     * @private
     * @param {(undefined|string)} codePoint
     * @return {boolean}
     */
    isIdentStartCodePoint(codePoint) {
        if (codePoint === undefined) {
            return false;
        }
        return /^([A-Za-z_]|[^\u0000-\u007f])$/.test(codePoint);
    }
    /**
     * https://www.w3.org/TR/2021/CRD-css-syntax-3-20211224/#non-printable-code-point
     * @private
     * @param {(undefined|string)} codePoint
     * @return {boolean}
     */
    isNonPrintableCodePoint(codePoint) {
        if (codePoint === undefined) {
            return false;
        }
        return /[\x00-\x08\x0b\x0e-\x1f\x7f]/.test(codePoint);
    }
}
/* istanbul ignore if */
if (false) {
    /**
     * The position in the CSS string of the first code point that hasn't been
     * consumed.
     * @type {number}
     * @private
     */
    Tokenizer.prototype.pos;
    /**
     * The CSS string to tokenize.
     * @const {string}
     * @private
     */
    Tokenizer.prototype.css;
}
/**
 * Tokenizes the given CSS string.
 *
 * @param {string} css The CSS string to tokenize.
 * @return {!Array<(!tsickle_tokens_1.AtKeywordToken|!tsickle_tokens_1.CdcToken|!tsickle_tokens_1.CdoToken|!tsickle_tokens_1.CloseCurlyToken|!tsickle_tokens_1.CloseParenToken|!tsickle_tokens_1.CloseSquareToken|!tsickle_tokens_1.ColonToken|!tsickle_tokens_1.CommaToken|!tsickle_tokens_1.DelimToken|!tsickle_tokens_1.DimensionToken|!tsickle_tokens_1.EofToken|!tsickle_tokens_1.FunctionToken|!tsickle_tokens_1.HashToken|!tsickle_tokens_1.IdentToken|!tsickle_tokens_1.NumberToken|!tsickle_tokens_1.OpenCurlyToken|!tsickle_tokens_1.OpenParenToken|!tsickle_tokens_1.OpenSquareToken|!tsickle_tokens_1.PercentageToken|!tsickle_tokens_1.SemicolonToken|!tsickle_tokens_1.StringToken|!tsickle_tokens_1.WhitespaceToken)>} The list of tokens.
 */
function tokenizeCss(css) {
    return new Tokenizer(css).tokenize();
}
exports.tokenizeCss = tokenizeCss;
