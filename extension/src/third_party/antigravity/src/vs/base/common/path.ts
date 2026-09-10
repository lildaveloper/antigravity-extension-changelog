/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// NOTE: VSCode's copy of nodejs path library to be usable in common (non-node) namespace
// Copied from: https://github.com/nodejs/node/commits/v22.15.0/lib/path.js
// Excluding: the change that adds primordials
// (https://github.com/nodejs/node/commit/187a862d221dec42fa9a5c4214e7034d9092792f and others)
// Excluding: the change that adds glob matching
// (https://github.com/nodejs/node/commit/57b8b8e18e5e2007114c63b71bf0baedc01936a6)
/**
 * Copyright Joyent, Inc. and other Node contributors.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to permit
 * persons to whom the Software is furnished to do so, subject to the
 * following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
 * NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
 * USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/antigravity/src/vs/base/common/path.ts
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
goog.module('google3.third_party.antigravity.src.vs.base.common.path');
var module = module || { id: 'third_party/antigravity/src/vs/base/common/path.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_process_1 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.process");
const process = goog.require('google3.third_party.antigravity.src.vs.base.common.process');
/** @type {number} */
const CHAR_UPPERCASE_A = 65;
/* A */
/** @type {number} */
const CHAR_LOWERCASE_A = 97;
/* a */
/** @type {number} */
const CHAR_UPPERCASE_Z = 90;
/* Z */
/** @type {number} */
const CHAR_LOWERCASE_Z = 122;
/* z */
/** @type {number} */
const CHAR_DOT = 46;
/* . */
/** @type {number} */
const CHAR_FORWARD_SLASH = 47;
/* / */
/** @type {number} */
const CHAR_BACKWARD_SLASH = 92;
/* \ */
/** @type {number} */
const CHAR_COLON = 58;
/* : */
/** @type {number} */
const CHAR_QUESTION_MARK = 63;
/* ? */
/**
 * @extends {Error}
 */
class ErrorInvalidArgType extends Error {
    /**
     * @public
     * @param {string} name
     * @param {string} expected
     * @param {*} actual
     */
    constructor(name, expected, actual) {
        // determiner: 'must be' or 'must not be'
        /** @type {?} */
        let determiner;
        if (typeof expected === 'string' && expected.indexOf('not ') === 0) {
            determiner = 'must not be';
            expected = expected.replace(/^not /, '');
        }
        else {
            determiner = 'must be';
        }
        /** @type {string} */
        const type = name.indexOf('.') !== -1 ? 'property' : 'argument';
        /** @type {string} */
        let msg = `The "${name}" ${type} ${determiner} of type ${expected}`;
        msg += `. Received type ${typeof actual}`;
        super(msg);
        this.code = 'ERR_INVALID_ARG_TYPE';
        // See go/typescript/extending_builtins
        Object.setPrototypeOf(this, ErrorInvalidArgType.prototype);
    }
}
/* istanbul ignore if */
if (false) {
    /**
     * @type {string}
     * @public
     */
    ErrorInvalidArgType.prototype.code;
}
/**
 * @param {!Object} pathObject
 * @param {string} name
 * @return {void}
 */
function validateObject(pathObject, name) {
    if (pathObject === null || typeof pathObject !== 'object') {
        throw new ErrorInvalidArgType(name, 'Object', pathObject);
    }
}
/**
 * @param {string} value
 * @param {string} name
 * @return {void}
 */
function validateString(value, name) {
    if (typeof value !== 'string') {
        throw new ErrorInvalidArgType(name, 'string', value);
    }
}
/** @type {boolean} */
const platformIsWin32 = (process.platform === 'win32');
/**
 * @param {(undefined|number)} code
 * @return {boolean}
 */
function isPathSeparator(code) {
    return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
}
/**
 * @param {(undefined|number)} code
 * @return {boolean}
 */
function isPosixPathSeparator(code) {
    return code === CHAR_FORWARD_SLASH;
}
/**
 * @param {number} code
 * @return {boolean}
 */
function isWindowsDeviceRoot(code) {
    return (code >= CHAR_UPPERCASE_A && code <= CHAR_UPPERCASE_Z) ||
        (code >= CHAR_LOWERCASE_A && code <= CHAR_LOWERCASE_Z);
}
// Resolves . and .. elements in a path with directory names
/**
 * @param {string} path
 * @param {boolean} allowAboveRoot
 * @param {string} separator
 * @param {function((undefined|number)=): boolean} isPathSeparator
 * @return {string}
 */
function normalizeString(path, allowAboveRoot, separator, isPathSeparator) {
    /** @type {string} */
    let res = '';
    /** @type {number} */
    let lastSegmentLength = 0;
    /** @type {number} */
    let lastSlash = -1;
    /** @type {number} */
    let dots = 0;
    /** @type {number} */
    let code = 0;
    for (let i = 0; i <= path.length; ++i) {
        if (i < path.length) {
            code = path.charCodeAt(i);
        }
        else if (isPathSeparator(code)) {
            break;
        }
        else {
            code = CHAR_FORWARD_SLASH;
        }
        if (isPathSeparator(code)) {
            if (lastSlash === i - 1 || dots === 1) {
                // NOOP
            }
            else if (dots === 2) {
                if (res.length < 2 || lastSegmentLength !== 2 ||
                    res.charCodeAt(res.length - 1) !== CHAR_DOT ||
                    res.charCodeAt(res.length - 2) !== CHAR_DOT) {
                    if (res.length > 2) {
                        /** @type {number} */
                        const lastSlashIndex = res.lastIndexOf(separator);
                        if (lastSlashIndex === -1) {
                            res = '';
                            lastSegmentLength = 0;
                        }
                        else {
                            res = res.slice(0, lastSlashIndex);
                            lastSegmentLength = res.length - 1 - res.lastIndexOf(separator);
                        }
                        lastSlash = i;
                        dots = 0;
                        continue;
                    }
                    else if (res.length !== 0) {
                        res = '';
                        lastSegmentLength = 0;
                        lastSlash = i;
                        dots = 0;
                        continue;
                    }
                }
                if (allowAboveRoot) {
                    res += res.length > 0 ? `${separator}..` : '..';
                    lastSegmentLength = 2;
                }
            }
            else {
                if (res.length > 0) {
                    res += `${separator}${path.slice(lastSlash + 1, i)}`;
                }
                else {
                    res = path.slice(lastSlash + 1, i);
                }
                lastSegmentLength = i - lastSlash - 1;
            }
            lastSlash = i;
            dots = 0;
        }
        else if (code === CHAR_DOT && dots !== -1) {
            ++dots;
        }
        else {
            dots = -1;
        }
    }
    return res;
}
/**
 * @param {string} ext
 * @return {string}
 */
function formatExt(ext) {
    return ext ? `${ext[0] === '.' ? '' : '.'}${ext}` : '';
}
/**
 * @param {string} sep
 * @param {!ParsedPath} pathObject
 * @return {string}
 */
function _format(sep, pathObject) {
    validateObject(pathObject, 'pathObject');
    /** @type {string} */
    const dir = pathObject.dir || pathObject.root;
    /** @type {string} */
    const base = pathObject.base ||
        `${pathObject.name || ''}${formatExt(pathObject.ext)}`;
    if (!dir) {
        return base;
    }
    return dir === pathObject.root ? `${dir}${base}` : `${dir}${sep}${base}`;
}
/**
 * @record
 */
function ParsedPath() { }
exports.ParsedPath = ParsedPath;
/* istanbul ignore if */
if (false) {
    /**
     * @type {string}
     * @public
     */
    ParsedPath.prototype.root;
    /**
     * @type {string}
     * @public
     */
    ParsedPath.prototype.dir;
    /**
     * @type {string}
     * @public
     */
    ParsedPath.prototype.base;
    /**
     * @type {string}
     * @public
     */
    ParsedPath.prototype.ext;
    /**
     * @type {string}
     * @public
     */
    ParsedPath.prototype.name;
}
/**
 * @record
 */
function IPath() { }
exports.IPath = IPath;
/* istanbul ignore if */
if (false) {
    /**
     * @type {string}
     * @public
     */
    IPath.prototype.sep;
    /**
     * @type {string}
     * @public
     */
    IPath.prototype.delimiter;
    /**
     * @type {(null|!IPath)}
     * @public
     */
    IPath.prototype.win32;
    /**
     * @type {(null|!IPath)}
     * @public
     */
    IPath.prototype.posix;
    /**
     * @public
     * @param {string} path
     * @return {string}
     */
    IPath.prototype.normalize = function (path) { };
    /**
     * @public
     * @param {string} path
     * @return {boolean}
     */
    IPath.prototype.isAbsolute = function (path) { };
    /**
     * @public
     * @param {...string} paths
     * @return {string}
     */
    IPath.prototype.join = function (paths) { };
    /**
     * @public
     * @param {...string} pathSegments
     * @return {string}
     */
    IPath.prototype.resolve = function (pathSegments) { };
    /**
     * @public
     * @param {string} from
     * @param {string} to
     * @return {string}
     */
    IPath.prototype.relative = function (from, to) { };
    /**
     * @public
     * @param {string} path
     * @return {string}
     */
    IPath.prototype.dirname = function (path) { };
    /**
     * @public
     * @param {string} path
     * @param {(undefined|string)=} suffix
     * @return {string}
     */
    IPath.prototype.basename = function (path, suffix) { };
    /**
     * @public
     * @param {string} path
     * @return {string}
     */
    IPath.prototype.extname = function (path) { };
    /**
     * @public
     * @param {!ParsedPath} pathObject
     * @return {string}
     */
    IPath.prototype.format = function (pathObject) { };
    /**
     * @public
     * @param {string} path
     * @return {!ParsedPath}
     */
    IPath.prototype.parse = function (path) { };
    /**
     * @public
     * @param {string} path
     * @return {string}
     */
    IPath.prototype.toNamespacedPath = function (path) { };
}
// go/vscode-patch/use-posix-paths
/*
export const win32: IPath = {
    // path.resolve([from ...], to)
    resolve(...pathSegments: string[]): string {
        let resolvedDevice = '';
        let resolvedTail = '';
        let resolvedAbsolute = false;

        for (let i = pathSegments.length - 1; i >= -1; i--) {
            let path;
            if (i >= 0) {
                path = pathSegments[i];
                validateString(path, `paths[${i}]`);

                // Skip empty entries
                if (path.length === 0) {
                    continue;
                }
            } else if (resolvedDevice.length === 0) {
                path = process.cwd();
            } else {
                // Windows has the concept of drive-specific current working
                // directories. If we've resolved a drive letter but not yet an
                // absolute path, get cwd for that drive, or the process cwd if
                // the drive cwd is not available. We're sure the device is not
                // a UNC path at this points, because UNC paths are always absolute.
                path = process.env[`=${resolvedDevice}`] || process.cwd();

                // Verify that a cwd was found and that it actually points
                // to our drive. If not, default to the drive's root.
                if (path === undefined ||
                    (path.slice(0, 2).toLowerCase() !== resolvedDevice.toLowerCase() &&
                        path.charCodeAt(2) === CHAR_BACKWARD_SLASH)) {
                    path = `${resolvedDevice}\\`;
                }
            }

            const len = path.length;
            let rootEnd = 0;
            let device = '';
            let isAbsolute = false;
            const code = path.charCodeAt(0);

            // Try to match a root
            if (len === 1) {
                if (isPathSeparator(code)) {
                    // `path` contains just a path separator
                    rootEnd = 1;
                    isAbsolute = true;
                }
            } else if (isPathSeparator(code)) {
                // Possible UNC root

                // If we started with a separator, we know we at least have an
                // absolute path of some kind (UNC or otherwise)
                isAbsolute = true;

                if (isPathSeparator(path.charCodeAt(1))) {
                    // Matched double path separator at beginning
                    let j = 2;
                    let last = j;
                    // Match 1 or more non-path separators
                    while (j < len && !isPathSeparator(path.charCodeAt(j))) {
                        j++;
                    }
                    if (j < len && j !== last) {
                        const firstPart = path.slice(last, j);
                        // Matched!
                        last = j;
                        // Match 1 or more path separators
                        while (j < len && isPathSeparator(path.charCodeAt(j))) {
                            j++;
                        }
                        if (j < len && j !== last) {
                            // Matched!
                            last = j;
                            // Match 1 or more non-path separators
                            while (j < len && !isPathSeparator(path.charCodeAt(j))) {
                                j++;
                            }
                            if (j === len || j !== last) {
                                // We matched a UNC root
                                device = `\\\\${firstPart}\\${path.slice(last, j)}`;
                                rootEnd = j;
                            }
                        }
                    }
                } else {
                    rootEnd = 1;
                }
            } else if (isWindowsDeviceRoot(code) &&
                path.charCodeAt(1) === CHAR_COLON) {
                // Possible device root
                device = path.slice(0, 2);
                rootEnd = 2;
                if (len > 2 && isPathSeparator(path.charCodeAt(2))) {
                    // Treat separator following drive name as an absolute path
                    // indicator
                    isAbsolute = true;
                    rootEnd = 3;
                }
            }

            if (device.length > 0) {
                if (resolvedDevice.length > 0) {
                    if (device.toLowerCase() !== resolvedDevice.toLowerCase()) {
                        // This path points to another device so it is not applicable
                        continue;
                    }
                } else {
                    resolvedDevice = device;
                }
            }

            if (resolvedAbsolute) {
                if (resolvedDevice.length > 0) {
                    break;
                }
            } else {
                resolvedTail = `${path.slice(rootEnd)}\\${resolvedTail}`;
                resolvedAbsolute = isAbsolute;
                if (isAbsolute && resolvedDevice.length > 0) {
                    break;
                }
            }
        }

        // At this point the path should be resolved to a full absolute path,
        // but handle relative paths to be safe (might happen when process.cwd()
        // fails)

        // Normalize the tail path
        resolvedTail = normalizeString(resolvedTail, !resolvedAbsolute, '\\',
            isPathSeparator);

        return resolvedAbsolute ?
            `${resolvedDevice}\\${resolvedTail}` :
            `${resolvedDevice}${resolvedTail}` || '.';
    },

    normalize(path: string): string {
        validateString(path, 'path');
        const len = path.length;
        if (len === 0) {
            return '.';
        }
        let rootEnd = 0;
        let device;
        let isAbsolute = false;
        const code = path.charCodeAt(0);

        // Try to match a root
        if (len === 1) {
            // `path` contains just a single char, exit early to avoid
            // unnecessary work
            return isPosixPathSeparator(code) ? '\\' : path;
        }
        if (isPathSeparator(code)) {
            // Possible UNC root

            // If we started with a separator, we know we at least have an absolute
            // path of some kind (UNC or otherwise)
            isAbsolute = true;

            if (isPathSeparator(path.charCodeAt(1))) {
                // Matched double path separator at beginning
                let j = 2;
                let last = j;
                // Match 1 or more non-path separators
                while (j < len && !isPathSeparator(path.charCodeAt(j))) {
                    j++;
                }
                if (j < len && j !== last) {
                    const firstPart = path.slice(last, j);
                    // Matched!
                    last = j;
                    // Match 1 or more path separators
                    while (j < len && isPathSeparator(path.charCodeAt(j))) {
                        j++;
                    }
                    if (j < len && j !== last) {
                        // Matched!
                        last = j;
                        // Match 1 or more non-path separators
                        while (j < len && !isPathSeparator(path.charCodeAt(j))) {
                            j++;
                        }
                        if (j === len) {
                            // We matched a UNC root only
                            // Return the normalized version of the UNC root since there
                            // is nothing left to process
                            return `\\\\${firstPart}\\${path.slice(last)}\\`;
                        }
                        if (j !== last) {
                            // We matched a UNC root with leftovers
                            device = `\\\\${firstPart}\\${path.slice(last, j)}`;
                            rootEnd = j;
                        }
                    }
                }
            } else {
                rootEnd = 1;
            }
        } else if (isWindowsDeviceRoot(code) && path.charCodeAt(1) === CHAR_COLON) {
            // Possible device root
            device = path.slice(0, 2);
            rootEnd = 2;
            if (len > 2 && isPathSeparator(path.charCodeAt(2))) {
                // Treat separator following drive name as an absolute path
                // indicator
                isAbsolute = true;
                rootEnd = 3;
            }
        }

        let tail = rootEnd < len ?
            normalizeString(path.slice(rootEnd), !isAbsolute, '\\', isPathSeparator) :
            '';
        if (tail.length === 0 && !isAbsolute) {
            tail = '.';
        }
        if (tail.length > 0 && isPathSeparator(path.charCodeAt(len - 1))) {
            tail += '\\';
        }
        if (!isAbsolute && device === undefined && path.includes(':')) {
            // If the original path was not absolute and if we have not been able to
            // resolve it relative to a particular device, we need to ensure that the
            // `tail` has not become something that Windows might interpret as an
            // absolute path. See CVE-2024-36139.
            if (tail.length >= 2 &&
                isWindowsDeviceRoot(tail.charCodeAt(0)) &&
                tail.charCodeAt(1) === CHAR_COLON) {
                return `.\\${tail}`;
            }
            let index = path.indexOf(':');
            do {
                if (index === len - 1 || isPathSeparator(path.charCodeAt(index + 1))) {
                    return `.\\${tail}`;
                }
            } while ((index = path.indexOf(':', index + 1)) !== -1);
        }
        if (device === undefined) {
            return isAbsolute ? `\\${tail}` : tail;
        }
        return isAbsolute ? `${device}\\${tail}` : `${device}${tail}`;
    },

    isAbsolute(path: string): boolean {
        validateString(path, 'path');
        const len = path.length;
        if (len === 0) {
            return false;
        }

        const code = path.charCodeAt(0);
        return isPathSeparator(code) ||
            // Possible device root
            (len > 2 &&
                isWindowsDeviceRoot(code) &&
                path.charCodeAt(1) === CHAR_COLON &&
                isPathSeparator(path.charCodeAt(2)));
    },

    join(...paths: string[]): string {
        if (paths.length === 0) {
            return '.';
        }

        let joined;
        let firstPart: string | undefined;
        for (let i = 0; i < paths.length; ++i) {
            const arg = paths[i];
            validateString(arg, 'path');
            if (arg.length > 0) {
                if (joined === undefined) {
                    joined = firstPart = arg;
                }
                else {
                    joined += `\\${arg}`;
                }
            }
        }

        if (joined === undefined) {
            return '.';
        }

        // Make sure that the joined path doesn't start with two slashes, because
        // normalize() will mistake it for a UNC path then.
        //
        // This step is skipped when it is very clear that the user actually
        // intended to point at a UNC path. This is assumed when the first
        // non-empty string arguments starts with exactly two slashes followed by
        // at least one more non-slash character.
        //
        // Note that for normalize() to treat a path as a UNC path it needs to
        // have at least 2 components, so we don't filter for that here.
        // This means that the user can use join to construct UNC paths from
        // a server name and a share name; for example:
        //   path.join('//server', 'share') -> '\\\\server\\share\\')
        let needsReplace = true;
        let slashCount = 0;
        if (typeof firstPart === 'string' && isPathSeparator(firstPart.charCodeAt(0))) {
            ++slashCount;
            const firstLen = firstPart.length;
            if (firstLen > 1 && isPathSeparator(firstPart.charCodeAt(1))) {
                ++slashCount;
                if (firstLen > 2) {
                    if (isPathSeparator(firstPart.charCodeAt(2))) {
                        ++slashCount;
                    } else {
                        // We matched a UNC path in the first part
                        needsReplace = false;
                    }
                }
            }
        }
        if (needsReplace) {
            // Find any more consecutive slashes we need to replace
            while (slashCount < joined.length &&
                isPathSeparator(joined.charCodeAt(slashCount))) {
                slashCount++;
            }

            // Replace the slashes if needed
            if (slashCount >= 2) {
                joined = `\\${joined.slice(slashCount)}`;
            }
        }

        return win32.normalize(joined);
    },


    // It will solve the relative path from `from` to `to`, for instance:
    //  from = 'C:\\orandea\\test\\aaa'
    //  to = 'C:\\orandea\\impl\\bbb'
    // The output of the function should be: '..\\..\\impl\\bbb'
    relative(from: string, to: string): string {
        validateString(from, 'from');
        validateString(to, 'to');

        if (from === to) {
            return '';
        }

        const fromOrig = win32.resolve(from);
        const toOrig = win32.resolve(to);

        if (fromOrig === toOrig) {
            return '';
        }

        from = fromOrig.toLowerCase();
        to = toOrig.toLowerCase();

        if (from === to) {
            return '';
        }

        if (fromOrig.length !== from.length || toOrig.length !== to.length) {
            const fromSplit = fromOrig.split('\\');
            const toSplit = toOrig.split('\\');
            if (fromSplit[fromSplit.length - 1] === '') {
                fromSplit.pop();
            }
            if (toSplit[toSplit.length - 1] === '') {
                toSplit.pop();
            }

            const fromLen = fromSplit.length;
            const toLen = toSplit.length;
            const length = fromLen < toLen ? fromLen : toLen;

            let i;
            for (i = 0; i < length; i++) {
                if (fromSplit[i].toLowerCase() !== toSplit[i].toLowerCase()) {
                    break;
                }
            }

            if (i === 0) {
                return toOrig;
            } else if (i === length) {
                if (toLen > length) {
                    return toSplit.slice(i).join('\\');
                }
                if (fromLen > length) {
                    return '..\\'.repeat(fromLen - 1 - i) + '..';
                }
                return '';
            }

            return '..\\'.repeat(fromLen - i) + toSplit.slice(i).join('\\');
        }

        // Trim any leading backslashes
        let fromStart = 0;
        while (fromStart < from.length &&
            from.charCodeAt(fromStart) === CHAR_BACKWARD_SLASH) {
            fromStart++;
        }
        // Trim trailing backslashes (applicable to UNC paths only)
        let fromEnd = from.length;
        while (fromEnd - 1 > fromStart &&
            from.charCodeAt(fromEnd - 1) === CHAR_BACKWARD_SLASH) {
            fromEnd--;
        }
        const fromLen = fromEnd - fromStart;

        // Trim any leading backslashes
        let toStart = 0;
        while (toStart < to.length &&
            to.charCodeAt(toStart) === CHAR_BACKWARD_SLASH) {
            toStart++;
        }
        // Trim trailing backslashes (applicable to UNC paths only)
        let toEnd = to.length;
        while (toEnd - 1 > toStart &&
            to.charCodeAt(toEnd - 1) === CHAR_BACKWARD_SLASH) {
            toEnd--;
        }
        const toLen = toEnd - toStart;

        // Compare paths to find the longest common path from root
        const length = fromLen < toLen ? fromLen : toLen;
        let lastCommonSep = -1;
        let i = 0;
        for (; i < length; i++) {
            const fromCode = from.charCodeAt(fromStart + i);
            if (fromCode !== to.charCodeAt(toStart + i)) {
                break;
            } else if (fromCode === CHAR_BACKWARD_SLASH) {
                lastCommonSep = i;
            }
        }

        // We found a mismatch before the first common path separator was seen, so
        // return the original `to`.
        if (i !== length) {
            if (lastCommonSep === -1) {
                return toOrig;
            }
        } else {
            if (toLen > length) {
                if (to.charCodeAt(toStart + i) === CHAR_BACKWARD_SLASH) {
                    // We get here if `from` is the exact base path for `to`.
                    // For example: from='C:\\foo\\bar'; to='C:\\foo\\bar\\baz'
                    return toOrig.slice(toStart + i + 1);
                }
                if (i === 2) {
                    // We get here if `from` is the device root.
                    // For example: from='C:\\'; to='C:\\foo'
                    return toOrig.slice(toStart + i);
                }
            }
            if (fromLen > length) {
                if (from.charCodeAt(fromStart + i) === CHAR_BACKWARD_SLASH) {
                    // We get here if `to` is the exact base path for `from`.
                    // For example: from='C:\\foo\\bar'; to='C:\\foo'
                    lastCommonSep = i;
                } else if (i === 2) {
                    // We get here if `to` is the device root.
                    // For example: from='C:\\foo\\bar'; to='C:\\'
                    lastCommonSep = 3;
                }
            }
            if (lastCommonSep === -1) {
                lastCommonSep = 0;
            }
        }

        let out = '';
        // Generate the relative path based on the path difference between `to` and
        // `from`
        for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
            if (i === fromEnd || from.charCodeAt(i) === CHAR_BACKWARD_SLASH) {
                out += out.length === 0 ? '..' : '\\..';
            }
        }

        toStart += lastCommonSep;

        // Lastly, append the rest of the destination (`to`) path that comes after
        // the common path parts
        if (out.length > 0) {
            return `${out}${toOrig.slice(toStart, toEnd)}`;
        }

        if (toOrig.charCodeAt(toStart) === CHAR_BACKWARD_SLASH) {
            ++toStart;
        }

        return toOrig.slice(toStart, toEnd);
    },

    toNamespacedPath(path: string): string {
        // Note: this will *probably* throw somewhere.
        if (typeof path !== 'string' || path.length === 0) {
            return path;
        }

        const resolvedPath = win32.resolve(path);

        if (resolvedPath.length <= 2) {
            return path;
        }

        if (resolvedPath.charCodeAt(0) === CHAR_BACKWARD_SLASH) {
            // Possible UNC root
            if (resolvedPath.charCodeAt(1) === CHAR_BACKWARD_SLASH) {
                const code = resolvedPath.charCodeAt(2);
                if (code !== CHAR_QUESTION_MARK && code !== CHAR_DOT) {
                    // Matched non-long UNC root, convert the path to a long UNC path
                    return `\\\\?\\UNC\\${resolvedPath.slice(2)}`;
                }
            }
        } else if (isWindowsDeviceRoot(resolvedPath.charCodeAt(0)) &&
            resolvedPath.charCodeAt(1) === CHAR_COLON &&
            resolvedPath.charCodeAt(2) === CHAR_BACKWARD_SLASH) {
            // Matched device root, convert the path to a long UNC path
            return `\\\\?\\${resolvedPath}`;
        }

        return resolvedPath;
    },

    dirname(path: string): string {
        validateString(path, 'path');
        const len = path.length;
        if (len === 0) {
            return '.';
        }
        let rootEnd = -1;
        let offset = 0;
        const code = path.charCodeAt(0);

        if (len === 1) {
            // `path` contains just a path separator, exit early to avoid
            // unnecessary work or a dot.
            return isPathSeparator(code) ? path : '.';
        }

        // Try to match a root
        if (isPathSeparator(code)) {
            // Possible UNC root

            rootEnd = offset = 1;

            if (isPathSeparator(path.charCodeAt(1))) {
                // Matched double path separator at beginning
                let j = 2;
                let last = j;
                // Match 1 or more non-path separators
                while (j < len && !isPathSeparator(path.charCodeAt(j))) {
                    j++;
                }
                if (j < len && j !== last) {
                    // Matched!
                    last = j;
                    // Match 1 or more path separators
                    while (j < len && isPathSeparator(path.charCodeAt(j))) {
                        j++;
                    }
                    if (j < len && j !== last) {
                        // Matched!
                        last = j;
                        // Match 1 or more non-path separators
                        while (j < len && !isPathSeparator(path.charCodeAt(j))) {
                            j++;
                        }
                        if (j === len) {
                            // We matched a UNC root only
                            return path;
                        }
                        if (j !== last) {
                            // We matched a UNC root with leftovers

                            // Offset by 1 to include the separator after the UNC root to
                            // treat it as a "normal root" on top of a (UNC) root
                            rootEnd = offset = j + 1;
                        }
                    }
                }
            }
            // Possible device root
        } else if (isWindowsDeviceRoot(code) && path.charCodeAt(1) === CHAR_COLON) {
            rootEnd = len > 2 && isPathSeparator(path.charCodeAt(2)) ? 3 : 2;
            offset = rootEnd;
        }

        let end = -1;
        let matchedSlash = true;
        for (let i = len - 1; i >= offset; --i) {
            if (isPathSeparator(path.charCodeAt(i))) {
                if (!matchedSlash) {
                    end = i;
                    break;
                }
            } else {
                // We saw the first non-path separator
                matchedSlash = false;
            }
        }

        if (end === -1) {
            if (rootEnd === -1) {
                return '.';
            }

            end = rootEnd;
        }
        return path.slice(0, end);
    },

    basename(path: string, suffix?: string): string {
        if (suffix !== undefined) {
            validateString(suffix, 'suffix');
        }
        validateString(path, 'path');
        let start = 0;
        let end = -1;
        let matchedSlash = true;
        let i;

        // Check for a drive letter prefix so as not to mistake the following
        // path separator as an extra separator at the end of the path that can be
        // disregarded
        if (path.length >= 2 &&
            isWindowsDeviceRoot(path.charCodeAt(0)) &&
            path.charCodeAt(1) === CHAR_COLON) {
            start = 2;
        }

        if (suffix !== undefined && suffix.length > 0 && suffix.length <= path.length) {
            if (suffix === path) {
                return '';
            }
            let extIdx = suffix.length - 1;
            let firstNonSlashEnd = -1;
            for (i = path.length - 1; i >= start; --i) {
                const code = path.charCodeAt(i);
                if (isPathSeparator(code)) {
                    // If we reached a path separator that was not part of a set of path
                    // separators at the end of the string, stop now
                    if (!matchedSlash) {
                        start = i + 1;
                        break;
                    }
                } else {
                    if (firstNonSlashEnd === -1) {
                        // We saw the first non-path separator, remember this index in case
                        // we need it if the extension ends up not matching
                        matchedSlash = false;
                        firstNonSlashEnd = i + 1;
                    }
                    if (extIdx >= 0) {
                        // Try to match the explicit extension
                        if (code === suffix.charCodeAt(extIdx)) {
                            if (--extIdx === -1) {
                                // We matched the extension, so mark this as the end of our path
                                // component
                                end = i;
                            }
                        } else {
                            // Extension does not match, so our result is the entire path
                            // component
                            extIdx = -1;
                            end = firstNonSlashEnd;
                        }
                    }
                }
            }

            if (start === end) {
                end = firstNonSlashEnd;
            } else if (end === -1) {
                end = path.length;
            }
            return path.slice(start, end);
        }
        for (i = path.length - 1; i >= start; --i) {
            if (isPathSeparator(path.charCodeAt(i))) {
                // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                if (!matchedSlash) {
                    start = i + 1;
                    break;
                }
            } else if (end === -1) {
                // We saw the first non-path separator, mark this as the end of our
                // path component
                matchedSlash = false;
                end = i + 1;
            }
        }

        if (end === -1) {
            return '';
        }
        return path.slice(start, end);
    },

    extname(path: string): string {
        validateString(path, 'path');
        let start = 0;
        let startDot = -1;
        let startPart = 0;
        let end = -1;
        let matchedSlash = true;
        // Track the state of characters (if any) we see before our first dot and
        // after any path separator we find
        let preDotState = 0;

        // Check for a drive letter prefix so as not to mistake the following
        // path separator as an extra separator at the end of the path that can be
        // disregarded

        if (path.length >= 2 &&
            path.charCodeAt(1) === CHAR_COLON &&
            isWindowsDeviceRoot(path.charCodeAt(0))) {
            start = startPart = 2;
        }

        for (let i = path.length - 1; i >= start; --i) {
            const code = path.charCodeAt(i);
            if (isPathSeparator(code)) {
                // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                if (!matchedSlash) {
                    startPart = i + 1;
                    break;
                }
                continue;
            }
            if (end === -1) {
                // We saw the first non-path separator, mark this as the end of our
                // extension
                matchedSlash = false;
                end = i + 1;
            }
            if (code === CHAR_DOT) {
                // If this is our first dot, mark it as the start of our extension
                if (startDot === -1) {
                    startDot = i;
                }
                else if (preDotState !== 1) {
                    preDotState = 1;
                }
            } else if (startDot !== -1) {
                // We saw a non-dot and non-path separator before our dot, so we should
                // have a good chance at having a non-empty extension
                preDotState = -1;
            }
        }

        if (startDot === -1 ||
            end === -1 ||
            // We saw a non-dot character immediately before the dot
            preDotState === 0 ||
            // The (right-most) trimmed path component is exactly '..'
            (preDotState === 1 &&
                startDot === end - 1 &&
                startDot === startPart + 1)) {
            return '';
        }
        return path.slice(startDot, end);
    },

    format: _format.bind(null, '\\'),

    parse(path) {
        validateString(path, 'path');

        const ret = { root: '', dir: '', base: '', ext: '', name: '' };
        if (path.length === 0) {
            return ret;
        }

        const len = path.length;
        let rootEnd = 0;
        let code = path.charCodeAt(0);

        if (len === 1) {
            if (isPathSeparator(code)) {
                // `path` contains just a path separator, exit early to avoid
                // unnecessary work
                ret.root = ret.dir = path;
                return ret;
            }
            ret.base = ret.name = path;
            return ret;
        }
        // Try to match a root
        if (isPathSeparator(code)) {
            // Possible UNC root

            rootEnd = 1;
            if (isPathSeparator(path.charCodeAt(1))) {
                // Matched double path separator at beginning
                let j = 2;
                let last = j;
                // Match 1 or more non-path separators
                while (j < len && !isPathSeparator(path.charCodeAt(j))) {
                    j++;
                }
                if (j < len && j !== last) {
                    // Matched!
                    last = j;
                    // Match 1 or more path separators
                    while (j < len && isPathSeparator(path.charCodeAt(j))) {
                        j++;
                    }
                    if (j < len && j !== last) {
                        // Matched!
                        last = j;
                        // Match 1 or more non-path separators
                        while (j < len && !isPathSeparator(path.charCodeAt(j))) {
                            j++;
                        }
                        if (j === len) {
                            // We matched a UNC root only
                            rootEnd = j;
                        } else if (j !== last) {
                            // We matched a UNC root with leftovers
                            rootEnd = j + 1;
                        }
                    }
                }
            }
        } else if (isWindowsDeviceRoot(code) && path.charCodeAt(1) === CHAR_COLON) {
            // Possible device root
            if (len <= 2) {
                // `path` contains just a drive root, exit early to avoid
                // unnecessary work
                ret.root = ret.dir = path;
                return ret;
            }
            rootEnd = 2;
            if (isPathSeparator(path.charCodeAt(2))) {
                if (len === 3) {
                    // `path` contains just a drive root, exit early to avoid
                    // unnecessary work
                    ret.root = ret.dir = path;
                    return ret;
                }
                rootEnd = 3;
            }
        }
        if (rootEnd > 0) {
            ret.root = path.slice(0, rootEnd);
        }

        let startDot = -1;
        let startPart = rootEnd;
        let end = -1;
        let matchedSlash = true;
        let i = path.length - 1;

        // Track the state of characters (if any) we see before our first dot and
        // after any path separator we find
        let preDotState = 0;

        // Get non-dir info
        for (; i >= rootEnd; --i) {
            code = path.charCodeAt(i);
            if (isPathSeparator(code)) {
                // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                if (!matchedSlash) {
                    startPart = i + 1;
                    break;
                }
                continue;
            }
            if (end === -1) {
                // We saw the first non-path separator, mark this as the end of our
                // extension
                matchedSlash = false;
                end = i + 1;
            }
            if (code === CHAR_DOT) {
                // If this is our first dot, mark it as the start of our extension
                if (startDot === -1) {
                    startDot = i;
                } else if (preDotState !== 1) {
                    preDotState = 1;
                }
            } else if (startDot !== -1) {
                // We saw a non-dot and non-path separator before our dot, so we should
                // have a good chance at having a non-empty extension
                preDotState = -1;
            }
        }

        if (end !== -1) {
            if (startDot === -1 ||
                // We saw a non-dot character immediately before the dot
                preDotState === 0 ||
                // The (right-most) trimmed path component is exactly '..'
                (preDotState === 1 &&
                    startDot === end - 1 &&
                    startDot === startPart + 1)) {
                ret.base = ret.name = path.slice(startPart, end);
            } else {
                ret.name = path.slice(startPart, startDot);
                ret.base = path.slice(startPart, end);
                ret.ext = path.slice(startDot, end);
            }
        }

        // If the directory is the root, use the entire root as the `dir` including
        // the trailing slash if any (`C:\abc` -> `C:\`). Otherwise, strip out the
        // trailing slash (`C:\abc\def` -> `C:\abc`).
        if (startPart > 0 && startPart !== rootEnd) {
            ret.dir = path.slice(0, startPart - 1);
        } else {
            ret.dir = ret.root;
        }

        return ret;
    },

    sep: '\\',
    delimiter: ';',
    win32: null,
    posix: null
};*/
/** @type {function(): string} */
const posixCwd = ((/**
 * @return {function(): string}
 */
() => {
    if (platformIsWin32) {
        // Converts Windows' backslash path separators to POSIX forward slashes
        // and truncates any drive indicator
        /** @type {!RegExp} */
        const regexp = /\\/g;
        return (/**
         * @return {string}
         */
        () => {
            /** @type {string} */
            const cwd = process.cwd().replace(regexp, '/');
            return cwd.slice(cwd.indexOf('/'));
        });
    }
    // We're already on POSIX, no need for any transformations
    return (/**
     * @return {string}
     */
    () => process.cwd());
}))();
/** @type {!IPath} */
exports.posix = {
    // path.resolve([from ...], to)
    /**
     * @public
     * @param {...string} pathSegments
     * @return {string}
     */
    resolve(...pathSegments) {
        /** @type {string} */
        let resolvedPath = '';
        /** @type {boolean} */
        let resolvedAbsolute = false;
        for (let i = pathSegments.length - 1; i >= 0 && !resolvedAbsolute; i--) {
            /** @type {string} */
            const path = pathSegments[i];
            validateString(path, `paths[${i}]`);
            // Skip empty entries
            if (path.length === 0) {
                continue;
            }
            resolvedPath = `${path}/${resolvedPath}`;
            resolvedAbsolute = path.charCodeAt(0) === CHAR_FORWARD_SLASH;
        }
        if (!resolvedAbsolute) {
            /** @type {string} */
            const cwd = posixCwd();
            resolvedPath = `${cwd}/${resolvedPath}`;
            resolvedAbsolute =
                cwd.charCodeAt(0) === CHAR_FORWARD_SLASH;
        }
        // At this point the path should be resolved to a full absolute path, but
        // handle relative paths to be safe (might happen when process.cwd() fails)
        // Normalize the path
        resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute, '/', isPosixPathSeparator);
        if (resolvedAbsolute) {
            return `/${resolvedPath}`;
        }
        return resolvedPath.length > 0 ? resolvedPath : '.';
    },
    /**
     * @public
     * @param {string} path
     * @return {string}
     */
    normalize(path) {
        validateString(path, 'path');
        if (path.length === 0) {
            return '.';
        }
        /** @type {boolean} */
        const isAbsolute = path.charCodeAt(0) === CHAR_FORWARD_SLASH;
        /** @type {boolean} */
        const trailingSeparator = path.charCodeAt(path.length - 1) === CHAR_FORWARD_SLASH;
        // Normalize the path
        path = normalizeString(path, !isAbsolute, '/', isPosixPathSeparator);
        if (path.length === 0) {
            if (isAbsolute) {
                return '/';
            }
            return trailingSeparator ? './' : '.';
        }
        if (trailingSeparator) {
            path += '/';
        }
        return isAbsolute ? `/${path}` : path;
    },
    /**
     * @public
     * @param {string} path
     * @return {boolean}
     */
    isAbsolute(path) {
        validateString(path, 'path');
        return path.length > 0 && path.charCodeAt(0) === CHAR_FORWARD_SLASH;
    },
    /**
     * @public
     * @param {...string} paths
     * @return {string}
     */
    join(...paths) {
        if (paths.length === 0) {
            return '.';
        }
        /** @type {!Array<?>} */
        const path = [];
        for (let i = 0; i < paths.length; ++i) {
            /** @type {string} */
            const arg = paths[i];
            validateString(arg, 'path');
            if (arg.length > 0) {
                path.push(arg);
            }
        }
        if (path.length === 0) {
            return '.';
        }
        return exports.posix.normalize((/** @type {!Array<string>} */ (path)).join('/'));
    },
    /**
     * @public
     * @param {string} from
     * @param {string} to
     * @return {string}
     */
    relative(from, to) {
        validateString(from, 'from');
        validateString(to, 'to');
        if (from === to) {
            return '';
        }
        // Trim leading forward slashes.
        from = exports.posix.resolve(from);
        to = exports.posix.resolve(to);
        if (from === to) {
            return '';
        }
        /** @type {number} */
        const fromStart = 1;
        /** @type {number} */
        const fromEnd = from.length;
        /** @type {number} */
        const fromLen = fromEnd - fromStart;
        /** @type {number} */
        const toStart = 1;
        /** @type {number} */
        const toLen = to.length - toStart;
        // Compare paths to find the longest common path from root
        /** @type {number} */
        const length = (fromLen < toLen ? fromLen : toLen);
        /** @type {number} */
        let lastCommonSep = -1;
        /** @type {number} */
        let i = 0;
        for (; i < length; i++) {
            /** @type {number} */
            const fromCode = from.charCodeAt(fromStart + i);
            if (fromCode !== to.charCodeAt(toStart + i)) {
                break;
            }
            else if (fromCode === CHAR_FORWARD_SLASH) {
                lastCommonSep = i;
            }
        }
        if (i === length) {
            if (toLen > length) {
                if (to.charCodeAt(toStart + i) === CHAR_FORWARD_SLASH) {
                    // We get here if `from` is the exact base path for `to`.
                    // For example: from='/foo/bar'; to='/foo/bar/baz'
                    return to.slice(toStart + i + 1);
                }
                if (i === 0) {
                    // We get here if `from` is the root
                    // For example: from='/'; to='/foo'
                    return to.slice(toStart + i);
                }
            }
            else if (fromLen > length) {
                if (from.charCodeAt(fromStart + i) === CHAR_FORWARD_SLASH) {
                    // We get here if `to` is the exact base path for `from`.
                    // For example: from='/foo/bar/baz'; to='/foo/bar'
                    lastCommonSep = i;
                }
                else if (i === 0) {
                    // We get here if `to` is the root.
                    // For example: from='/foo/bar'; to='/'
                    lastCommonSep = 0;
                }
            }
        }
        /** @type {string} */
        let out = '';
        // Generate the relative path based on the path difference between `to`
        // and `from`.
        for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
            if (i === fromEnd || from.charCodeAt(i) === CHAR_FORWARD_SLASH) {
                out += out.length === 0 ? '..' : '/..';
            }
        }
        // Lastly, append the rest of the destination (`to`) path that comes after
        // the common path parts.
        return `${out}${to.slice(toStart + lastCommonSep)}`;
    },
    /**
     * @public
     * @param {string} path
     * @return {string}
     */
    toNamespacedPath(path) {
        // Non-op on posix systems
        return path;
    },
    /**
     * @public
     * @param {string} path
     * @return {string}
     */
    dirname(path) {
        validateString(path, 'path');
        if (path.length === 0) {
            return '.';
        }
        /** @type {boolean} */
        const hasRoot = path.charCodeAt(0) === CHAR_FORWARD_SLASH;
        /** @type {number} */
        let end = -1;
        /** @type {boolean} */
        let matchedSlash = true;
        for (let i = path.length - 1; i >= 1; --i) {
            if (path.charCodeAt(i) === CHAR_FORWARD_SLASH) {
                if (!matchedSlash) {
                    end = i;
                    break;
                }
            }
            else {
                // We saw the first non-path separator
                matchedSlash = false;
            }
        }
        if (end === -1) {
            return hasRoot ? '/' : '.';
        }
        if (hasRoot && end === 1) {
            return '//';
        }
        return path.slice(0, end);
    },
    /**
     * @public
     * @param {string} path
     * @param {(undefined|string)=} suffix
     * @return {string}
     */
    basename(path, suffix) {
        if (suffix !== undefined) {
            validateString(suffix, 'suffix');
        }
        validateString(path, 'path');
        /** @type {number} */
        let start = 0;
        /** @type {number} */
        let end = -1;
        /** @type {boolean} */
        let matchedSlash = true;
        /** @type {?} */
        let i;
        if (suffix !== undefined && suffix.length > 0 && suffix.length <= path.length) {
            if (suffix === path) {
                return '';
            }
            /** @type {number} */
            let extIdx = suffix.length - 1;
            /** @type {number} */
            let firstNonSlashEnd = -1;
            for (i = path.length - 1; i >= 0; --i) {
                /** @type {number} */
                const code = path.charCodeAt(i);
                if (code === CHAR_FORWARD_SLASH) {
                    // If we reached a path separator that was not part of a set of path
                    // separators at the end of the string, stop now
                    if (!matchedSlash) {
                        start = i + 1;
                        break;
                    }
                }
                else {
                    if (firstNonSlashEnd === -1) {
                        // We saw the first non-path separator, remember this index in case
                        // we need it if the extension ends up not matching
                        matchedSlash = false;
                        firstNonSlashEnd = i + 1;
                    }
                    if (extIdx >= 0) {
                        // Try to match the explicit extension
                        if (code === suffix.charCodeAt(extIdx)) {
                            if (--extIdx === -1) {
                                // We matched the extension, so mark this as the end of our path
                                // component
                                end = i;
                            }
                        }
                        else {
                            // Extension does not match, so our result is the entire path
                            // component
                            extIdx = -1;
                            end = firstNonSlashEnd;
                        }
                    }
                }
            }
            if (start === end) {
                end = firstNonSlashEnd;
            }
            else if (end === -1) {
                end = path.length;
            }
            return path.slice(start, end);
        }
        for (i = path.length - 1; i >= 0; --i) {
            if (path.charCodeAt(i) === CHAR_FORWARD_SLASH) {
                // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                if (!matchedSlash) {
                    start = i + 1;
                    break;
                }
            }
            else if (end === -1) {
                // We saw the first non-path separator, mark this as the end of our
                // path component
                matchedSlash = false;
                end = i + 1;
            }
        }
        if (end === -1) {
            return '';
        }
        return path.slice(start, end);
    },
    /**
     * @public
     * @param {string} path
     * @return {string}
     */
    extname(path) {
        validateString(path, 'path');
        /** @type {number} */
        let startDot = -1;
        /** @type {number} */
        let startPart = 0;
        /** @type {number} */
        let end = -1;
        /** @type {boolean} */
        let matchedSlash = true;
        // Track the state of characters (if any) we see before our first dot and
        // after any path separator we find
        /** @type {number} */
        let preDotState = 0;
        for (let i = path.length - 1; i >= 0; --i) {
            /** @type {string} */
            const char = path[i];
            if (char === '/') {
                // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                if (!matchedSlash) {
                    startPart = i + 1;
                    break;
                }
                continue;
            }
            if (end === -1) {
                // We saw the first non-path separator, mark this as the end of our
                // extension
                matchedSlash = false;
                end = i + 1;
            }
            if (char === '.') {
                // If this is our first dot, mark it as the start of our extension
                if (startDot === -1) {
                    startDot = i;
                }
                else if (preDotState !== 1) {
                    preDotState = 1;
                }
            }
            else if (startDot !== -1) {
                // We saw a non-dot and non-path separator before our dot, so we should
                // have a good chance at having a non-empty extension
                preDotState = -1;
            }
        }
        if (startDot === -1 ||
            end === -1 ||
            // We saw a non-dot character immediately before the dot
            preDotState === 0 ||
            // The (right-most) trimmed path component is exactly '..'
            (preDotState === 1 &&
                startDot === end - 1 &&
                startDot === startPart + 1)) {
            return '';
        }
        return path.slice(startDot, end);
    },
    format: _format.bind(null, '/'),
    /**
     * @public
     * @param {string} path
     * @return {!ParsedPath}
     */
    parse(path) {
        validateString(path, 'path');
        /** @type {{root: string, dir: string, base: string, ext: string, name: string}} */
        const ret = { root: '', dir: '', base: '', ext: '', name: '' };
        if (path.length === 0) {
            return ret;
        }
        /** @type {boolean} */
        const isAbsolute = path.charCodeAt(0) === CHAR_FORWARD_SLASH;
        /** @type {?} */
        let start;
        if (isAbsolute) {
            ret.root = '/';
            start = 1;
        }
        else {
            start = 0;
        }
        /** @type {number} */
        let startDot = -1;
        /** @type {number} */
        let startPart = 0;
        /** @type {number} */
        let end = -1;
        /** @type {boolean} */
        let matchedSlash = true;
        /** @type {number} */
        let i = path.length - 1;
        // Track the state of characters (if any) we see before our first dot and
        // after any path separator we find
        /** @type {number} */
        let preDotState = 0;
        // Get non-dir info
        for (; i >= start; --i) {
            /** @type {number} */
            const code = path.charCodeAt(i);
            if (code === CHAR_FORWARD_SLASH) {
                // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                if (!matchedSlash) {
                    startPart = i + 1;
                    break;
                }
                continue;
            }
            if (end === -1) {
                // We saw the first non-path separator, mark this as the end of our
                // extension
                matchedSlash = false;
                end = i + 1;
            }
            if (code === CHAR_DOT) {
                // If this is our first dot, mark it as the start of our extension
                if (startDot === -1) {
                    startDot = i;
                }
                else if (preDotState !== 1) {
                    preDotState = 1;
                }
            }
            else if (startDot !== -1) {
                // We saw a non-dot and non-path separator before our dot, so we should
                // have a good chance at having a non-empty extension
                preDotState = -1;
            }
        }
        if (end !== -1) {
            /** @type {number} */
            const start = startPart === 0 && isAbsolute ? 1 : startPart;
            if (startDot === -1 ||
                // We saw a non-dot character immediately before the dot
                preDotState === 0 ||
                // The (right-most) trimmed path component is exactly '..'
                (preDotState === 1 &&
                    startDot === end - 1 &&
                    startDot === startPart + 1)) {
                ret.base = ret.name = path.slice(start, end);
            }
            else {
                ret.name = path.slice(start, startDot);
                ret.base = path.slice(start, end);
                ret.ext = path.slice(startDot, end);
            }
        }
        if (startPart > 0) {
            ret.dir = path.slice(0, startPart - 1);
        }
        else if (isAbsolute) {
            ret.dir = '/';
        }
        return ret;
    },
    sep: '/',
    delimiter: ':',
    win32: null,
    posix: null
};
// go/vscode-patch/use-posix-paths
/** @type {!IPath} */
exports.win32 = exports.posix;
exports.posix.win32 = exports.win32.win32 = exports.win32;
exports.posix.posix = exports.win32.posix = exports.posix;
/** @type {function(string): string} */
exports.normalize = (platformIsWin32 ? exports.win32.normalize : exports.posix.normalize);
/** @type {function(string): boolean} */
exports.isAbsolute = (platformIsWin32 ? exports.win32.isAbsolute : exports.posix.isAbsolute);
/** @type {function(...string): string} */
exports.join = (platformIsWin32 ? exports.win32.join : exports.posix.join);
/** @type {function(...string): string} */
exports.resolve = (platformIsWin32 ? exports.win32.resolve : exports.posix.resolve);
/** @type {function(string, string): string} */
exports.relative = (platformIsWin32 ? exports.win32.relative : exports.posix.relative);
/** @type {function(string): string} */
exports.dirname = (platformIsWin32 ? exports.win32.dirname : exports.posix.dirname);
/** @type {function(string, (undefined|string)=): string} */
exports.basename = (platformIsWin32 ? exports.win32.basename : exports.posix.basename);
/** @type {function(string): string} */
exports.extname = (platformIsWin32 ? exports.win32.extname : exports.posix.extname);
/** @type {function(!ParsedPath): string} */
exports.format = (platformIsWin32 ? exports.win32.format : exports.posix.format);
/** @type {function(string): !ParsedPath} */
exports.parse = (platformIsWin32 ? exports.win32.parse : exports.posix.parse);
/** @type {function(string): string} */
exports.toNamespacedPath = (platformIsWin32 ? exports.win32.toNamespacedPath : exports.posix.toNamespacedPath);
/** @type {string} */
exports.sep = (platformIsWin32 ? exports.win32.sep : exports.posix.sep);
/** @type {string} */
exports.delimiter = (platformIsWin32 ? exports.win32.delimiter : exports.posix.delimiter);
