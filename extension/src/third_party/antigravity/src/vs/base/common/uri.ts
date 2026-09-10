/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/antigravity/src/vs/base/common/uri.ts
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
goog.module('google3.third_party.antigravity.src.vs.base.common.uri');
var module = module || { id: 'third_party/antigravity/src/vs/base/common/uri.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_charCode_1 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.charCode");
const tsickle_marshallingIds_2 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.marshallingIds");
const tsickle_path_3 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.path");
// go/vscode-patch/use-posix-paths
/** @type {boolean} */
const isWindows = false;
const charCode_1 = goog.require('google3.third_party.antigravity.src.vs.base.common.charCode');
const marshallingIds_1 = goog.require('google3.third_party.antigravity.src.vs.base.common.marshallingIds');
const paths = goog.require('google3.third_party.antigravity.src.vs.base.common.path');
/** @type {!RegExp} */
const _schemePattern = /^\w[\w\d+.-]*$/;
/** @type {!RegExp} */
const _singleSlashStart = /^\//;
/** @type {!RegExp} */
const _doubleSlashStart = /^\/\//;
/**
 * @param {!URI} ret
 * @param {(undefined|boolean)=} _strict
 * @return {void}
 */
function _validateUri(ret, _strict) {
    // scheme, must be set
    if (!ret.scheme && _strict) {
        throw new Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${ret.authority}", path: "${ret.path}", query: "${ret.query}", fragment: "${ret.fragment}"}`);
    }
    // scheme, https://tools.ietf.org/html/rfc3986#section-3.1
    // ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )
    if (ret.scheme && !_schemePattern.test(ret.scheme)) {
        throw new Error('[UriError]: Scheme contains illegal characters.');
    }
    // path, http://tools.ietf.org/html/rfc3986#section-3.3
    // If a URI contains an authority component, then the path component
    // must either be empty or begin with a slash ("/") character.  If a URI
    // does not contain an authority component, then the path cannot begin
    // with two slash characters ("//").
    if (ret.path) {
        if (ret.authority) {
            if (!_singleSlashStart.test(ret.path)) {
                throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character');
            }
        }
        else {
            if (_doubleSlashStart.test(ret.path)) {
                throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")');
            }
        }
    }
}
// for a while we allowed uris *without* schemes and this is the migration
// for them, e.g. an uri without scheme and without strict-mode warns and falls
// back to the file-scheme. that should cause the least carnage and still be a
// clear warning
/**
 * @param {string} scheme
 * @param {boolean} _strict
 * @return {string}
 */
function _schemeFix(scheme, _strict) {
    if (!scheme && !_strict) {
        return 'file';
    }
    return scheme;
}
// implements a bit of https://tools.ietf.org/html/rfc3986#section-5
/**
 * @param {string} scheme
 * @param {string} path
 * @return {string}
 */
function _referenceResolution(scheme, path) {
    // the slash-character is our 'default base' as we don't
    // support constructing URIs relative to other URIs. This
    // also means that we alter and potentially break paths.
    // see https://tools.ietf.org/html/rfc3986#section-5.1.4
    switch (scheme) {
        case 'https':
        case 'http':
        case 'file':
            if (!path) {
                path = _slash;
            }
            else if (path[0] !== _slash) {
                path = _slash + path;
            }
            break;
    }
    return path;
}
/** @type {string} */
const _empty = '';
/** @type {string} */
const _slash = '/';
/** @type {!RegExp} */
const _regexp = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
/**
 * Uniform Resource Identifier (URI) http://tools.ietf.org/html/rfc3986.
 * This class is a simple parser which creates the basic component parts
 * (http://tools.ietf.org/html/rfc3986#section-3) with minimal validation
 * and encoding.
 *
 * ```txt
 *       foo://example.com:8042/over/there?name=ferret#nose
 *       \_/   \______________/\_________/ \_________/ \__/
 *        |           |            |            |        |
 *     scheme     authority       path        query   fragment
 *        |   _____________________|__
 *       / \ /                        \
 *       urn:example:animal:ferret:nose
 * ```
 * @implements {UriComponents}
 */
class URI {
    /**
     * @public
     * @param {*} thing
     * @return {boolean}
     */
    static isUri(thing) {
        if (thing instanceof URI) {
            return true;
        }
        if (!thing || typeof thing !== 'object') {
            return false;
        }
        return typeof ((/** @type {!URI} */ (thing))).authority === 'string'
            && typeof ((/** @type {!URI} */ (thing))).fragment === 'string'
            && typeof ((/** @type {!URI} */ (thing))).path === 'string'
            && typeof ((/** @type {!URI} */ (thing))).query === 'string'
            && typeof ((/** @type {!URI} */ (thing))).scheme === 'string'
            && typeof ((/** @type {!URI} */ (thing))).fsPath === 'string'
            && typeof ((/** @type {!URI} */ (thing))).with === 'function'
            && typeof ((/** @type {!URI} */ (thing))).toString === 'function';
    }
    /**
     * \@vscode-internal
     * @protected
     * @param {(string|!UriComponents)} schemeOrData
     * @param {(undefined|string)=} authority
     * @param {(undefined|string)=} path
     * @param {(undefined|string)=} query
     * @param {(undefined|string)=} fragment
     * @param {boolean=} _strict
     */
    constructor(schemeOrData, authority, path, query, fragment, _strict = false) {
        if (typeof schemeOrData === 'object') {
            this.scheme = (/** @type {!UriComponents} */ (schemeOrData)).scheme || _empty;
            this.authority = (/** @type {!UriComponents} */ (schemeOrData)).authority || _empty;
            this.path = (/** @type {!UriComponents} */ (schemeOrData)).path || _empty;
            this.query = (/** @type {!UriComponents} */ (schemeOrData)).query || _empty;
            this.fragment = (/** @type {!UriComponents} */ (schemeOrData)).fragment || _empty;
            // no validation because it's this URI
            // that creates uri components.
            // _validateUri(this);
        }
        else {
            this.scheme = _schemeFix(schemeOrData, _strict);
            this.authority = authority || _empty;
            this.path = _referenceResolution(this.scheme, path || _empty);
            this.query = query || _empty;
            this.fragment = fragment || _empty;
            _validateUri(this, _strict);
        }
    }
    // ---- filesystem path -----------------------
    /**
     * Returns a string representing the corresponding file system path of this URI.
     * Will handle UNC paths, normalizes windows drive letters to lower-case, and uses the
     * platform specific path separator.
     *
     * * Will *not* validate the path for invalid characters and semantics.
     * * Will *not* look at the scheme of this URI.
     * * The result shall *not* be used for display purposes but for accessing a file on disk.
     *
     *
     * The *difference* to `URI#path` is the use of the platform specific separator and the handling
     * of UNC paths. See the below sample of a file-uri with an authority (UNC path).
     *
     * ```ts
     * const u = URI.parse('file://server/c$/folder/file.txt')
     * u.authority === 'server'
     * u.path === '/shares/c$/file.txt'
     * u.fsPath === '\\server\c$\folder\file.txt'
     * ```
     *
     * Using `URI#path` to read a file (using fs-apis) would not be enough because parts of the path,
     * namely the server name, would be missing. Therefore `URI#fsPath` exists - it's sugar to ease working
     * with URIs that represent files on disk (`file` scheme).
     * @public
     * @return {string}
     */
    get fsPath() {
        // if (this.scheme !== 'file') {
        // 	console.warn(`[UriError] calling fsPath with scheme ${this.scheme}`);
        // }
        return uriToFsPath(this, false);
    }
    // ---- modify to new -------------------------
    /**
     * @public
     * @param {{scheme: (undefined|string), authority: (undefined|null|string), path: (undefined|null|string), query: (undefined|null|string), fragment: (undefined|null|string)}} change
     * @return {!URI}
     */
    with(change) {
        if (!change) {
            return this;
        }
        let { scheme, authority, path, query, fragment } = change;
        if (scheme === undefined) {
            scheme = this.scheme;
        }
        else if (scheme === null) {
            scheme = _empty;
        }
        if (authority === undefined) {
            authority = this.authority;
        }
        else if (authority === null) {
            authority = _empty;
        }
        if (path === undefined) {
            path = this.path;
        }
        else if (path === null) {
            path = _empty;
        }
        if (query === undefined) {
            query = this.query;
        }
        else if (query === null) {
            query = _empty;
        }
        if (fragment === undefined) {
            fragment = this.fragment;
        }
        else if (fragment === null) {
            fragment = _empty;
        }
        if (scheme === this.scheme
            && authority === this.authority
            && path === this.path
            && query === this.query
            && fragment === this.fragment) {
            return this;
        }
        return new Uri(scheme, authority, path, query, fragment);
    }
    // ---- parse & validate ------------------------
    /**
     * Creates a new URI from a string, e.g. `http://www.example.com/some/path`,
     * `file:///usr/home`, or `scheme:with/path`.
     *
     * @public
     * @param {string} value A string which represents an URI (see `URI#toString`).
     * @param {boolean=} _strict
     * @return {!URI}
     */
    static parse(value, _strict = false) {
        /** @type {(null|!RegExpExecArray)} */
        const match = _regexp.exec(value);
        if (!match) {
            return new Uri(_empty, _empty, _empty, _empty, _empty);
        }
        return new Uri(match[2] || _empty, percentDecode(match[4] || _empty), percentDecode(match[5] || _empty), percentDecode(match[7] || _empty), percentDecode(match[9] || _empty), _strict);
    }
    /**
     * Creates a new URI from a file system path, e.g. `c:\my\files`,
     * `/usr/home`, or `\\server\share\some\path`.
     *
     * The *difference* between `URI#parse` and `URI#file` is that the latter treats the argument
     * as path, not as stringified-uri. E.g. `URI.file(path)` is **not the same as**
     * `URI.parse('file://' + path)` because the path might contain characters that are
     * interpreted (# and ?). See the following sample:
     * ```ts
     * const good = URI.file('/coding/c#/project1');
     * good.scheme === 'file';
     * good.path === '/coding/c#/project1';
     * good.fragment === '';
     * const bad = URI.parse('file://' + '/coding/c#/project1');
     * bad.scheme === 'file';
     * bad.path === '/coding/c'; // path is now broken
     * bad.fragment === '/project1';
     * ```
     *
     * @public
     * @param {string} path A file system path (see `URI#fsPath`)
     * @return {!URI}
     */
    static file(path) {
        /** @type {string} */
        let authority = _empty;
        // normalize to fwd-slashes on windows,
        // on other systems bwd-slashes are valid
        // filename character, eg /f\oo/ba\r.txt
        if (isWindows) {
            path = path.replace(/\\/g, _slash);
        }
        // check for authority as used in UNC shares
        // or use the path as given
        if (path[0] === _slash && path[1] === _slash) {
            /** @type {number} */
            const idx = path.indexOf(_slash, 2);
            if (idx === -1) {
                authority = path.substring(2);
                path = _slash;
            }
            else {
                authority = path.substring(2, idx);
                path = path.substring(idx) || _slash;
            }
        }
        return new Uri('file', authority, path, _empty, _empty);
    }
    /**
     * Creates new URI from uri components.
     *
     * Unless `strict` is `true` the scheme is defaults to be `file`. This function performs
     * validation and should be used for untrusted uri components retrieved from storage,
     * user input, command arguments etc
     * @public
     * @param {!UriComponents} components
     * @param {(undefined|boolean)=} strict
     * @return {!URI}
     */
    static from(components, strict) {
        /** @type {!Uri} */
        const result = new Uri(components.scheme, components.authority, components.path, components.query, components.fragment, strict);
        return result;
    }
    /**
     * Join a URI path with path fragments and normalizes the resulting path.
     *
     * @public
     * @param {!URI} uri The input URI.
     * @param {...string} pathFragment The path fragment to add to the URI path.
     * @return {!URI} The resulting URI.
     */
    static joinPath(uri, ...pathFragment) {
        if (!uri.path) {
            throw new Error(`[UriError]: cannot call joinPath on URI without path`);
        }
        /** @type {string} */
        let newPath;
        if (isWindows && uri.scheme === 'file') {
            newPath = URI.file(paths.win32.join(uriToFsPath(uri, true), ...pathFragment)).path;
        }
        else {
            newPath = paths.posix.join(uri.path, ...pathFragment);
        }
        return uri.with({ path: newPath });
    }
    // ---- printing/externalize ---------------------------
    /**
     * Creates a string representation for this URI. It's guaranteed that calling
     * `URI.parse` with the result of this function creates an URI which is equal
     * to this URI.
     *
     * * The result shall *not* be used for display purposes but for externalization or transport.
     * * The result will be encoded using the percentage encoding and encoding happens mostly
     * ignore the scheme-specific encoding rules.
     *
     * @public
     * @param {boolean=} skipEncoding Do not encode the result, default is `false`
     * @return {string}
     */
    toString(skipEncoding = false) {
        return _asFormatted(this, skipEncoding);
    }
    /**
     * @public
     * @return {!UriComponents}
     */
    toJSON() {
        return this;
    }
    /**
     * @public
     * @param {(undefined|null|!URI|!UriComponents)} data
     * @return {(undefined|null|!URI)}
     */
    static revive(data) {
        if (!data) {
            return data;
        }
        else if (data instanceof URI) {
            return data;
        }
        else {
            /** @type {!Uri} */
            const result = new Uri(data);
            result._formatted = ((/** @type {!UriState} */ (data))).external ?? null;
            result._fsPath = ((/** @type {!UriState} */ (data)))._sep === _pathSepMarker ? ((/** @type {!UriState} */ (data))).fsPath ?? null : null;
            return result;
        }
    }
    /**
     * @public
     * @return {string}
     */
    [Symbol.for('debug.description')]() {
        return `URI(${this.toString()})`;
    }
}
exports.URI = URI;
/* istanbul ignore if */
if (false) {
    /**
     * scheme is the 'http' part of 'http://www.example.com/some/path?query#fragment'.
     * The part before the first colon.
     * @const {string}
     * @public
     */
    URI.prototype.scheme;
    /**
     * authority is the 'www.example.com' part of 'http://www.example.com/some/path?query#fragment'.
     * The part between the first double slashes and the next slash.
     * @const {string}
     * @public
     */
    URI.prototype.authority;
    /**
     * path is the '/some/path' part of 'http://www.example.com/some/path?query#fragment'.
     * @const {string}
     * @public
     */
    URI.prototype.path;
    /**
     * query is the 'query' part of 'http://www.example.com/some/path?query#fragment'.
     * @const {string}
     * @public
     */
    URI.prototype.query;
    /**
     * fragment is the 'fragment' part of 'http://www.example.com/some/path?query#fragment'.
     * @const {string}
     * @public
     */
    URI.prototype.fragment;
}
/**
 * @record
 */
function UriComponents() { }
exports.UriComponents = UriComponents;
/* istanbul ignore if */
if (false) {
    /**
     * @type {string}
     * @public
     */
    UriComponents.prototype.scheme;
    /**
     * @type {(undefined|string)}
     * @public
     */
    UriComponents.prototype.authority;
    /**
     * @type {(undefined|string)}
     * @public
     */
    UriComponents.prototype.path;
    /**
     * @type {(undefined|string)}
     * @public
     */
    UriComponents.prototype.query;
    /**
     * @type {(undefined|string)}
     * @public
     */
    UriComponents.prototype.fragment;
}
/**
 * @param {*} thing
 * @return {boolean}
 */
function isUriComponents(thing) {
    if (!thing || typeof thing !== 'object') {
        return false;
    }
    return typeof ((/** @type {!UriComponents} */ (thing))).scheme === 'string'
        && (typeof ((/** @type {!UriComponents} */ (thing))).authority === 'string' || typeof ((/** @type {!UriComponents} */ (thing))).authority === 'undefined')
        && (typeof ((/** @type {!UriComponents} */ (thing))).path === 'string' || typeof ((/** @type {!UriComponents} */ (thing))).path === 'undefined')
        && (typeof ((/** @type {!UriComponents} */ (thing))).query === 'string' || typeof ((/** @type {!UriComponents} */ (thing))).query === 'undefined')
        && (typeof ((/** @type {!UriComponents} */ (thing))).fragment === 'string' || typeof ((/** @type {!UriComponents} */ (thing))).fragment === 'undefined');
}
exports.isUriComponents = isUriComponents;
/**
 * @record
 * @extends {UriComponents}
 */
function UriState() { }
/* istanbul ignore if */
if (false) {
    /**
     * @type {!tsickle_marshallingIds_2.MarshalledId}
     * @public
     */
    UriState.prototype.$mid;
    /**
     * @type {(undefined|string)}
     * @public
     */
    UriState.prototype.external;
    /**
     * @type {(undefined|string)}
     * @public
     */
    UriState.prototype.fsPath;
    /**
     * @type {(undefined|number)}
     * @public
     */
    UriState.prototype._sep;
}
/** @type {(undefined|number)} */
const _pathSepMarker = isWindows ? 1 : undefined;
// This class exists so that URI is compatible with vscode.Uri (API).
// go/vscode-patch/workspace-uri
/**
 * @extends {URI}
 */
class Uri extends URI {
    constructor() {
        super(...arguments);
        this._formatted = null;
        this._fsPath = null;
    }
    /**
     * @public
     * @return {string}
     */
    get fsPath() {
        if (!this._fsPath) {
            this._fsPath = uriToFsPath(this, false);
        }
        return this._fsPath;
    }
    /**
     * @public
     * @param {boolean=} skipEncoding
     * @return {string}
     */
    toString(skipEncoding = false) {
        if (!skipEncoding) {
            if (!this._formatted) {
                this._formatted = _asFormatted(this, false);
            }
            return this._formatted;
        }
        else {
            // we don't cache that
            return _asFormatted(this, true);
        }
    }
    /**
     * @public
     * @return {!UriComponents}
     */
    toJSON() {
        // eslint-disable-next-line local/code-no-dangerous-type-assertions
        /** @type {!UriState} */
        const res = (/** @type {!UriState} */ ({
            $mid: marshallingIds_1.MarshalledId.Uri
        }));
        // cached state
        if (this._fsPath) {
            res.fsPath = this._fsPath;
            res._sep = _pathSepMarker;
        }
        if (this._formatted) {
            res.external = this._formatted;
        }
        //--- uri components
        if (this.path) {
            res.path = this.path;
        }
        // TODO
        // this isn't correct and can violate the UriComponents contract but
        // this is part of the vscode.Uri API and we shouldn't change how that
        // works anymore
        if (this.scheme) {
            res.scheme = this.scheme;
        }
        if (this.authority) {
            res.authority = this.authority;
        }
        if (this.query) {
            res.query = this.query;
        }
        if (this.fragment) {
            res.fragment = this.fragment;
        }
        return res;
    }
}
exports.Uri = Uri;
/* istanbul ignore if */
if (false) {
    /**
     * @type {(null|string)}
     * @public
     */
    Uri.prototype._formatted;
    /**
     * @type {(null|string)}
     * @public
     */
    Uri.prototype._fsPath;
}
// reserved characters: https://tools.ietf.org/html/rfc3986#section-2.2
/** @type {!Object<number,string>} */
const encodeTable = {
    [charCode_1.CharCode.Colon]: '%3A', // gen-delims
    // gen-delims
    [charCode_1.CharCode.Slash]: '%2F',
    [charCode_1.CharCode.QuestionMark]: '%3F',
    [charCode_1.CharCode.Hash]: '%23',
    [charCode_1.CharCode.OpenSquareBracket]: '%5B',
    [charCode_1.CharCode.CloseSquareBracket]: '%5D',
    [charCode_1.CharCode.AtSign]: '%40',
    [charCode_1.CharCode.ExclamationMark]: '%21', // sub-delims
    // sub-delims
    [charCode_1.CharCode.DollarSign]: '%24',
    [charCode_1.CharCode.Ampersand]: '%26',
    [charCode_1.CharCode.SingleQuote]: '%27',
    [charCode_1.CharCode.OpenParen]: '%28',
    [charCode_1.CharCode.CloseParen]: '%29',
    [charCode_1.CharCode.Asterisk]: '%2A',
    [charCode_1.CharCode.Plus]: '%2B',
    [charCode_1.CharCode.Comma]: '%2C',
    [charCode_1.CharCode.Semicolon]: '%3B',
    [charCode_1.CharCode.Equals]: '%3D',
    [charCode_1.CharCode.Space]: '%20',
};
/**
 * @param {string} uriComponent
 * @param {boolean} isPath
 * @param {boolean} isAuthority
 * @return {string}
 */
function encodeURIComponentFast(uriComponent, isPath, isAuthority) {
    /** @type {(undefined|string)} */
    let res = undefined;
    /** @type {number} */
    let nativeEncodePos = -1;
    for (let pos = 0; pos < uriComponent.length; pos++) {
        /** @type {number} */
        const code = uriComponent.charCodeAt(pos);
        // unreserved characters: https://tools.ietf.org/html/rfc3986#section-2.3
        if ((code >= charCode_1.CharCode.a && code <= charCode_1.CharCode.z)
            || (code >= charCode_1.CharCode.A && code <= charCode_1.CharCode.Z)
            || (code >= charCode_1.CharCode.Digit0 && code <= charCode_1.CharCode.Digit9)
            || code === charCode_1.CharCode.Dash
            || code === charCode_1.CharCode.Period
            || code === charCode_1.CharCode.Underline
            || code === charCode_1.CharCode.Tilde
            || (isPath && code === charCode_1.CharCode.Slash)
            || (isAuthority && code === charCode_1.CharCode.OpenSquareBracket)
            || (isAuthority && code === charCode_1.CharCode.CloseSquareBracket)
            || (isAuthority && code === charCode_1.CharCode.Colon)) {
            // check if we are delaying native encode
            if (nativeEncodePos !== -1) {
                res += encodeURIComponent(uriComponent.substring(nativeEncodePos, pos));
                nativeEncodePos = -1;
            }
            // check if we write into a new string (by default we try to return the param)
            if (res !== undefined) {
                res += uriComponent.charAt(pos);
            }
        }
        else {
            // encoding needed, we need to allocate a new string
            if (res === undefined) {
                res = uriComponent.substr(0, pos);
            }
            // check with default table first
            /** @type {string} */
            const escaped = encodeTable[code];
            if (escaped !== undefined) {
                // check if we are delaying native encode
                if (nativeEncodePos !== -1) {
                    res += encodeURIComponent(uriComponent.substring(nativeEncodePos, pos));
                    nativeEncodePos = -1;
                }
                // append escaped variant to result
                res += escaped;
            }
            else if (nativeEncodePos === -1) {
                // use native encode only when needed
                nativeEncodePos = pos;
            }
        }
    }
    if (nativeEncodePos !== -1) {
        res += encodeURIComponent(uriComponent.substring(nativeEncodePos));
    }
    return res !== undefined ? res : uriComponent;
}
/**
 * @param {string} path
 * @return {string}
 */
function encodeURIComponentMinimal(path) {
    /** @type {(undefined|string)} */
    let res = undefined;
    for (let pos = 0; pos < path.length; pos++) {
        /** @type {number} */
        const code = path.charCodeAt(pos);
        if (code === charCode_1.CharCode.Hash || code === charCode_1.CharCode.QuestionMark) {
            if (res === undefined) {
                res = path.substr(0, pos);
            }
            res += encodeTable[code];
        }
        else {
            if (res !== undefined) {
                res += path[pos];
            }
        }
    }
    return res !== undefined ? res : path;
}
/**
 * Compute `fsPath` for the given uri
 * @param {!URI} uri
 * @param {boolean} keepDriveLetterCasing
 * @return {string}
 */
function uriToFsPath(uri, keepDriveLetterCasing) {
    /** @type {string} */
    let value;
    if (uri.authority && uri.path.length > 1 && uri.scheme === 'file') {
        // unc path: file://shares/c$/far/boo
        value = `//${uri.authority}${uri.path}`;
    }
    else if (uri.path.charCodeAt(0) === charCode_1.CharCode.Slash
        && (uri.path.charCodeAt(1) >= charCode_1.CharCode.A && uri.path.charCodeAt(1) <= charCode_1.CharCode.Z || uri.path.charCodeAt(1) >= charCode_1.CharCode.a && uri.path.charCodeAt(1) <= charCode_1.CharCode.z)
        && uri.path.charCodeAt(2) === charCode_1.CharCode.Colon) {
        if (!keepDriveLetterCasing) {
            // windows drive letter: file:///c:/far/boo
            value = uri.path[1].toLowerCase() + uri.path.substr(2);
        }
        else {
            value = uri.path.substr(1);
        }
    }
    else {
        // other path
        value = uri.path;
    }
    if (isWindows) {
        value = value.replace(/\//g, '\\');
    }
    return value;
}
exports.uriToFsPath = uriToFsPath;
/**
 * Create the external version of a uri
 * @param {!URI} uri
 * @param {boolean} skipEncoding
 * @return {string}
 */
function _asFormatted(uri, skipEncoding) {
    /** @type {function(string, boolean, boolean): string} */
    const encoder = !skipEncoding
        ? encodeURIComponentFast
        : encodeURIComponentMinimal;
    /** @type {string} */
    let res = '';
    let { scheme, authority, path, query, fragment } = uri;
    if (scheme) {
        res += scheme;
        res += ':';
    }
    if (authority || scheme === 'file') {
        res += _slash;
        res += _slash;
    }
    if (authority) {
        /** @type {number} */
        let idx = authority.indexOf('@');
        if (idx !== -1) {
            // <user>@<auth>
            /** @type {string} */
            const userinfo = authority.substr(0, idx);
            authority = authority.substr(idx + 1);
            idx = userinfo.lastIndexOf(':');
            if (idx === -1) {
                res += encoder(userinfo, false, false);
            }
            else {
                // <user>:<pass>@<auth>
                res += encoder(userinfo.substr(0, idx), false, false);
                res += ':';
                res += encoder(userinfo.substr(idx + 1), false, true);
            }
            res += '@';
        }
        authority = authority.toLowerCase();
        idx = authority.lastIndexOf(':');
        if (idx === -1) {
            res += encoder(authority, false, true);
        }
        else {
            // <auth>:<port>
            res += encoder(authority.substr(0, idx), false, true);
            res += authority.substr(idx);
        }
    }
    if (path) {
        // lower-case windows drive letters in /C:/fff or C:/fff
        if (path.length >= 3 && path.charCodeAt(0) === charCode_1.CharCode.Slash && path.charCodeAt(2) === charCode_1.CharCode.Colon) {
            /** @type {number} */
            const code = path.charCodeAt(1);
            if (code >= charCode_1.CharCode.A && code <= charCode_1.CharCode.Z) {
                path = `/${String.fromCharCode(code + 32)}:${path.substr(3)}`; // "/c:".length === 3
            }
        }
        else if (path.length >= 2 && path.charCodeAt(1) === charCode_1.CharCode.Colon) {
            /** @type {number} */
            const code = path.charCodeAt(0);
            if (code >= charCode_1.CharCode.A && code <= charCode_1.CharCode.Z) {
                path = `${String.fromCharCode(code + 32)}:${path.substr(2)}`; // "/c:".length === 3
            }
        }
        // encode the rest of the path
        res += encoder(path, true, false);
    }
    if (query) {
        res += '?';
        res += encoder(query, false, false);
    }
    if (fragment) {
        res += '#';
        res += !skipEncoding ? encodeURIComponentFast(fragment, false, false) : fragment;
    }
    return res;
}
// --- decode
/**
 * @param {string} str
 * @return {string}
 */
function decodeURIComponentGraceful(str) {
    try {
        return decodeURIComponent(str);
    }
    catch {
        if (str.length > 3) {
            return str.substr(0, 3) + decodeURIComponentGraceful(str.substr(3));
        }
        else {
            return str;
        }
    }
}
/** @type {!RegExp} */
const _rEncodedAsHex = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
/**
 * @param {string} str
 * @return {string}
 */
function percentDecode(str) {
    if (!str.match(_rEncodedAsHex)) {
        return str;
    }
    return str.replace(_rEncodedAsHex, (/**
     * @param {string} match
     * @return {string}
     */
    (match) => decodeURIComponentGraceful(match)));
}
/**
 * Mapped-type that replaces all occurrences of URI with UriComponents
 * @typedef {?}
 */
exports.UriDto;
