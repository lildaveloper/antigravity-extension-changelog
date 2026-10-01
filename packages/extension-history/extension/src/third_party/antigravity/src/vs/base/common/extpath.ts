/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/antigravity/src/vs/base/common/extpath.ts
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
goog.module('google3.third_party.antigravity.src.vs.base.common.extpath');
var module = module || { id: 'third_party/antigravity/src/vs/base/common/extpath.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_charCode_1 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.charCode");
const tsickle_path_2 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.path");
const tsickle_platform_3 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.platform");
const tsickle_strings_4 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.strings");
const tsickle_types_5 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.types");
const charCode_1 = goog.require('google3.third_party.antigravity.src.vs.base.common.charCode');
const path_1 = goog.require('google3.third_party.antigravity.src.vs.base.common.path');
const platform_1 = goog.require('google3.third_party.antigravity.src.vs.base.common.platform');
const strings_1 = goog.require('google3.third_party.antigravity.src.vs.base.common.strings');
const types_1 = goog.require('google3.third_party.antigravity.src.vs.base.common.types');
/**
 * @param {number} code
 * @return {boolean}
 */
function isPathSeparator(code) {
    return code === charCode_1.CharCode.Slash || code === charCode_1.CharCode.Backslash;
}
exports.isPathSeparator = isPathSeparator;
/**
 * Takes a Windows OS path and changes backward slashes to forward slashes.
 * This should only be done for OS paths from Windows (or user provided paths potentially from Windows).
 * Using it on a Linux or MaxOS path might change it.
 * @param {string} osPath
 * @return {string}
 */
function toSlashes(osPath) {
    return osPath.replace(/[\\/]/g, path_1.posix.sep);
}
exports.toSlashes = toSlashes;
/**
 * Takes a Windows OS path (using backward or forward slashes) and turns it into a posix path:
 * - turns backward slashes into forward slashes
 * - makes it absolute if it starts with a drive letter
 * This should only be done for OS paths from Windows (or user provided paths potentially from Windows).
 * Using it on a Linux or MaxOS path might change it.
 * @param {string} osPath
 * @return {string}
 */
function toPosixPath(osPath) {
    if (osPath.indexOf('/') === -1) {
        osPath = toSlashes(osPath);
    }
    if (/^[a-zA-Z]:(\/|$)/.test(osPath)) { // starts with a drive letter
        // starts with a drive letter
        osPath = '/' + osPath;
    }
    return osPath;
}
exports.toPosixPath = toPosixPath;
/**
 * Computes the _root_ this path, like `getRoot('c:\files') === c:\`,
 * `getRoot('files:///files/path') === files:///`,
 * or `getRoot('\\server\shares\path') === \\server\shares\`
 * @param {string} path
 * @param {string=} sep
 * @return {string}
 */
function getRoot(path, sep = path_1.posix.sep) {
    if (!path) {
        return '';
    }
    /** @type {number} */
    const len = path.length;
    /** @type {number} */
    const firstLetter = path.charCodeAt(0);
    if (isPathSeparator(firstLetter)) {
        if (isPathSeparator(path.charCodeAt(1))) {
            // UNC candidate \\localhost\shares\ddd
            //               ^^^^^^^^^^^^^^^^^^^
            if (!isPathSeparator(path.charCodeAt(2))) {
                /** @type {number} */
                let pos = 3;
                /** @type {number} */
                const start = pos;
                for (; pos < len; pos++) {
                    if (isPathSeparator(path.charCodeAt(pos))) {
                        break;
                    }
                }
                if (start !== pos && !isPathSeparator(path.charCodeAt(pos + 1))) {
                    pos += 1;
                    for (; pos < len; pos++) {
                        if (isPathSeparator(path.charCodeAt(pos))) {
                            return path.slice(0, pos + 1) // consume this separator
                                .replace(/[\\/]/g, sep);
                        }
                    }
                }
            }
        }
        // /user/far
        // ^
        return sep;
    }
    else if (isWindowsDriveLetter(firstLetter)) {
        // check for windows drive letter c:\ or c:
        if (path.charCodeAt(1) === charCode_1.CharCode.Colon) {
            if (isPathSeparator(path.charCodeAt(2))) {
                // C:\fff
                // ^^^
                return path.slice(0, 2) + sep;
            }
            else {
                // C:
                // ^^
                return path.slice(0, 2);
            }
        }
    }
    // check for URI
    // scheme://authority/path
    // ^^^^^^^^^^^^^^^^^^^
    /** @type {number} */
    let pos = path.indexOf('://');
    if (pos !== -1) {
        pos += 3; // 3 -> "://".length
        for (; pos < len; pos++) {
            if (isPathSeparator(path.charCodeAt(pos))) {
                return path.slice(0, pos + 1); // consume this separator
            }
        }
    }
    return '';
}
exports.getRoot = getRoot;
/**
 * Check if the path follows this pattern: `\\hostname\sharename`.
 *
 * @see https://msdn.microsoft.com/en-us/library/gg465305.aspx
 * @param {string} path
 * @return {boolean} A boolean indication if the path is a UNC path, on none-windows
 * always false.
 */
function isUNC(path) {
    if (!platform_1.isWindows) {
        // UNC is a windows concept
        return false;
    }
    if (!path || path.length < 5) {
        // at least \\a\b
        return false;
    }
    /** @type {number} */
    let code = path.charCodeAt(0);
    if (code !== charCode_1.CharCode.Backslash) {
        return false;
    }
    code = path.charCodeAt(1);
    if (code !== charCode_1.CharCode.Backslash) {
        return false;
    }
    /** @type {number} */
    let pos = 2;
    /** @type {number} */
    const start = pos;
    for (; pos < path.length; pos++) {
        code = path.charCodeAt(pos);
        if (code === charCode_1.CharCode.Backslash) {
            break;
        }
    }
    if (start === pos) {
        return false;
    }
    code = path.charCodeAt(pos + 1);
    if (isNaN(code) || code === charCode_1.CharCode.Backslash) {
        return false;
    }
    return true;
}
exports.isUNC = isUNC;
// Reference: https://en.wikipedia.org/wiki/Filename
/** @type {!RegExp} */
const WINDOWS_INVALID_FILE_CHARS = /[\\/:\*\?"<>\|]/g;
/** @type {!RegExp} */
const UNIX_INVALID_FILE_CHARS = /[/]/g;
/** @type {!RegExp} */
const WINDOWS_FORBIDDEN_NAMES = /^(con|prn|aux|clock\$|nul|lpt[0-9]|com[0-9])(\.(.*?))?$/i;
/**
 * @param {(undefined|null|string)} name
 * @param {boolean=} isWindowsOS
 * @return {boolean}
 */
function isValidBasename(name, isWindowsOS = platform_1.isWindows) {
    /** @type {!RegExp} */
    const invalidFileChars = isWindowsOS ? WINDOWS_INVALID_FILE_CHARS : UNIX_INVALID_FILE_CHARS;
    if (!name || name.length === 0 || /^\s+$/.test(name)) {
        return false; // require a name that is not just whitespace
    }
    invalidFileChars.lastIndex = 0; // the holy grail of software development
    if (invalidFileChars.test(name)) {
        return false; // check for certain invalid file characters
    }
    if (isWindowsOS && WINDOWS_FORBIDDEN_NAMES.test(name)) {
        return false; // check for certain invalid file names
    }
    if (name === '.' || name === '..') {
        return false; // check for reserved values
    }
    if (isWindowsOS && name[name.length - 1] === '.') {
        return false; // Windows: file cannot end with a "."
    }
    if (isWindowsOS && name.length !== name.trim().length) {
        return false; // Windows: file cannot end with a whitespace
    }
    if (name.length > 255) {
        return false; // most file systems do not allow files > 255 length
    }
    return true;
}
exports.isValidBasename = isValidBasename;
/**
 * @deprecated please use `IUriIdentityService.extUri.isEqual` instead. If you are
 * in a context without services, consider to pass down the `extUri` from the outside
 * or use `extUriBiasedIgnorePathCase` if you know what you are doing.
 * @param {string} pathA
 * @param {string} pathB
 * @param {(undefined|boolean)=} ignoreCase
 * @return {boolean}
 */
function isEqual(pathA, pathB, ignoreCase) {
    /** @type {boolean} */
    const identityEquals = (pathA === pathB);
    if (!ignoreCase || identityEquals) {
        return identityEquals;
    }
    if (!pathA || !pathB) {
        return false;
    }
    return (0, strings_1.equalsIgnoreCase)(pathA, pathB);
}
exports.isEqual = isEqual;
/**
 * @deprecated please use `IUriIdentityService.extUri.isEqualOrParent` instead. If
 * you are in a context without services, consider to pass down the `extUri` from the
 * outside, or use `extUriBiasedIgnorePathCase` if you know what you are doing.
 * @param {string} base
 * @param {string} parentCandidate
 * @param {(undefined|boolean)=} ignoreCase
 * @param {string=} separator
 * @return {boolean}
 */
function isEqualOrParent(base, parentCandidate, ignoreCase, separator = path_1.sep) {
    if (base === parentCandidate) {
        return true;
    }
    if (!base || !parentCandidate) {
        return false;
    }
    if (parentCandidate.length > base.length) {
        return false;
    }
    if (ignoreCase) {
        /** @type {boolean} */
        const beginsWith = (0, strings_1.startsWithIgnoreCase)(base, parentCandidate);
        if (!beginsWith) {
            return false;
        }
        if (parentCandidate.length === base.length) {
            return true; // same path, different casing
        }
        /** @type {number} */
        let sepOffset = parentCandidate.length;
        if (parentCandidate.charAt(parentCandidate.length - 1) === separator) {
            sepOffset--; // adjust the expected sep offset in case our candidate already ends in separator character
        }
        return base.charAt(sepOffset) === separator;
    }
    if (parentCandidate.charAt(parentCandidate.length - 1) !== separator) {
        parentCandidate += separator;
    }
    return base.indexOf(parentCandidate) === 0;
}
exports.isEqualOrParent = isEqualOrParent;
/**
 * @param {number} char0
 * @return {boolean}
 */
function isWindowsDriveLetter(char0) {
    return char0 >= charCode_1.CharCode.A && char0 <= charCode_1.CharCode.Z || char0 >= charCode_1.CharCode.a && char0 <= charCode_1.CharCode.z;
}
exports.isWindowsDriveLetter = isWindowsDriveLetter;
/**
 * @param {string} candidate
 * @param {string} cwd
 * @return {string}
 */
function sanitizeFilePath(candidate, cwd) {
    // Special case: allow to open a drive letter without trailing backslash
    if (platform_1.isWindows && candidate.endsWith(':')) {
        candidate += path_1.sep;
    }
    // Ensure absolute
    if (!(0, path_1.isAbsolute)(candidate)) {
        candidate = (0, path_1.join)(cwd, candidate);
    }
    // Ensure normalized
    candidate = (0, path_1.normalize)(candidate);
    // Ensure no trailing slash/backslash
    return removeTrailingPathSeparator(candidate);
}
exports.sanitizeFilePath = sanitizeFilePath;
/**
 * @param {string} candidate
 * @return {string}
 */
function removeTrailingPathSeparator(candidate) {
    if (platform_1.isWindows) {
        candidate = (0, strings_1.rtrim)(candidate, path_1.sep);
        // Special case: allow to open drive root ('C:\')
        if (candidate.endsWith(':')) {
            candidate += path_1.sep;
        }
    }
    else {
        candidate = (0, strings_1.rtrim)(candidate, path_1.sep);
        // Special case: allow to open root ('/')
        if (!candidate) {
            candidate = path_1.sep;
        }
    }
    return candidate;
}
exports.removeTrailingPathSeparator = removeTrailingPathSeparator;
/**
 * @param {string} path
 * @return {boolean}
 */
function isRootOrDriveLetter(path) {
    /** @type {string} */
    const pathNormalized = (0, path_1.normalize)(path);
    if (platform_1.isWindows) {
        if (path.length > 3) {
            return false;
        }
        return hasDriveLetter(pathNormalized) &&
            (path.length === 2 || pathNormalized.charCodeAt(2) === charCode_1.CharCode.Backslash);
    }
    return pathNormalized === path_1.posix.sep;
}
exports.isRootOrDriveLetter = isRootOrDriveLetter;
/**
 * @param {string} path
 * @param {boolean=} isWindowsOS
 * @return {boolean}
 */
function hasDriveLetter(path, isWindowsOS = platform_1.isWindows) {
    if (isWindowsOS) {
        return isWindowsDriveLetter(path.charCodeAt(0)) && path.charCodeAt(1) === charCode_1.CharCode.Colon;
    }
    return false;
}
exports.hasDriveLetter = hasDriveLetter;
/**
 * @param {string} path
 * @param {boolean=} isWindowsOS
 * @return {(undefined|string)}
 */
function getDriveLetter(path, isWindowsOS = platform_1.isWindows) {
    return hasDriveLetter(path, isWindowsOS) ? path[0] : undefined;
}
exports.getDriveLetter = getDriveLetter;
/**
 * @param {string} path
 * @param {string} candidate
 * @param {(undefined|boolean)=} ignoreCase
 * @return {number}
 */
function indexOfPath(path, candidate, ignoreCase) {
    if (candidate.length > path.length) {
        return -1;
    }
    if (path === candidate) {
        return 0;
    }
    if (ignoreCase) {
        path = path.toLowerCase();
        candidate = candidate.toLowerCase();
    }
    return path.indexOf(candidate);
}
exports.indexOfPath = indexOfPath;
/**
 * @record
 */
function IPathWithLineAndColumn() { }
exports.IPathWithLineAndColumn = IPathWithLineAndColumn;
/* istanbul ignore if */
if (false) {
    /**
     * @type {string}
     * @public
     */
    IPathWithLineAndColumn.prototype.path;
    /**
     * @type {(undefined|number)}
     * @public
     */
    IPathWithLineAndColumn.prototype.line;
    /**
     * @type {(undefined|number)}
     * @public
     */
    IPathWithLineAndColumn.prototype.column;
}
/**
 * @param {string} rawPath
 * @return {!IPathWithLineAndColumn}
 */
function parseLineAndColumnAware(rawPath) {
    /** @type {!Array<string>} */
    const segments = rawPath.split(':');
    // C:\file.txt:<line>:<column>
    /** @type {(undefined|string)} */
    let path;
    /** @type {(undefined|number)} */
    let line;
    /** @type {(undefined|number)} */
    let column;
    for (const segment of segments) {
        /** @type {number} */
        const segmentAsNumber = Number(segment);
        if (!(0, types_1.isNumber)(segmentAsNumber)) {
            path = path ? [path, segment].join(':') : segment; // a colon can well be part of a path (e.g. C:\...)
        }
        else if (line === undefined) {
            line = segmentAsNumber;
        }
        else if (column === undefined) {
            column = segmentAsNumber;
        }
    }
    if (!path) {
        throw new Error('Format for `--goto` should be: `FILE:LINE(:COLUMN)`');
    }
    return {
        path,
        line: line !== undefined ? line : undefined,
        column: column !== undefined ? column : line !== undefined ? 1 : undefined // if we have a line, make sure column is also set
    };
}
exports.parseLineAndColumnAware = parseLineAndColumnAware;
/** @type {string} */
const pathChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
/** @type {string} */
const windowsSafePathFirstChars = 'BDEFGHIJKMOQRSTUVWXYZbdefghijkmoqrstuvwxyz0123456789';
/**
 * @param {(undefined|string)=} parent
 * @param {(undefined|string)=} prefix
 * @param {number=} randomLength
 * @return {string}
 */
function randomPath(parent, prefix, randomLength = 8) {
    /** @type {string} */
    let suffix = '';
    for (let i = 0; i < randomLength; i++) {
        /** @type {string} */
        let pathCharsTouse;
        if (i === 0 && platform_1.isWindows && !prefix && (randomLength === 3 || randomLength === 4)) {
            // Windows has certain reserved file names that cannot be used, such
            // as AUX, CON, PRN, etc. We want to avoid generating a random name
            // that matches that pattern, so we use a different set of characters
            // for the first character of the name that does not include any of
            // the reserved names first characters.
            pathCharsTouse = windowsSafePathFirstChars;
        }
        else {
            pathCharsTouse = pathChars;
        }
        suffix += pathCharsTouse.charAt(Math.floor(Math.random() * pathCharsTouse.length));
    }
    /** @type {string} */
    let randomFileName;
    if (prefix) {
        randomFileName = `${prefix}-${suffix}`;
    }
    else {
        randomFileName = suffix;
    }
    if (parent) {
        return (0, path_1.join)(parent, randomFileName);
    }
    return randomFileName;
}
exports.randomPath = randomPath;
