/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/antigravity/src/vs/base/common/resources.ts
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
goog.module('google3.third_party.antigravity.src.vs.base.common.resources');
var module = module || { id: 'third_party/antigravity/src/vs/base/common/resources.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_charCode_1 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.charCode");
const tsickle_extpath_2 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.extpath");
const tsickle_network_3 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.network");
const tsickle_path_4 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.path");
const tsickle_platform_5 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.platform");
const tsickle_strings_6 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.strings");
const tsickle_uri_7 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.uri");
const charCode_1 = goog.require('google3.third_party.antigravity.src.vs.base.common.charCode');
const extpath = goog.require('google3.third_party.antigravity.src.vs.base.common.extpath');
const network_1 = goog.require('google3.third_party.antigravity.src.vs.base.common.network');
const paths = goog.require('google3.third_party.antigravity.src.vs.base.common.path');
const platform_1 = goog.require('google3.third_party.antigravity.src.vs.base.common.platform');
const strings_1 = goog.require('google3.third_party.antigravity.src.vs.base.common.strings');
const uri_1 = goog.require('google3.third_party.antigravity.src.vs.base.common.uri');
/**
 * @param {!tsickle_uri_7.URI} uri
 * @return {string}
 */
function originalFSPath(uri) {
    return (0, uri_1.uriToFsPath)(uri, true);
}
exports.originalFSPath = originalFSPath;
/**
 * @record
 */
function IExtUri() { }
exports.IExtUri = IExtUri;
/* istanbul ignore if */
if (false) {
    /**
     * Compares two uris.
     *
     * @public
     * @param {!tsickle_uri_7.URI} uri1 Uri
     * @param {!tsickle_uri_7.URI} uri2 Uri
     * @param {(undefined|boolean)=} ignoreFragment Ignore the fragment (defaults to `false`)
     * @return {number}
     */
    IExtUri.prototype.compare = function (uri1, uri2, ignoreFragment) { };
    /**
     * Tests whether two uris are equal
     *
     * @public
     * @param {(undefined|!tsickle_uri_7.URI)} uri1 Uri
     * @param {(undefined|!tsickle_uri_7.URI)} uri2 Uri
     * @param {(undefined|boolean)=} ignoreFragment Ignore the fragment (defaults to `false`)
     * @return {boolean}
     */
    IExtUri.prototype.isEqual = function (uri1, uri2, ignoreFragment) { };
    /**
     * Tests whether a `candidate` URI is a parent or equal of a given `base` URI.
     *
     * @public
     * @param {!tsickle_uri_7.URI} base A uri which is "longer" or at least same length as `parentCandidate`
     * @param {!tsickle_uri_7.URI} parentCandidate A uri which is "shorter" or up to same length as `base`
     * @param {(undefined|boolean)=} ignoreFragment Ignore the fragment (defaults to `false`)
     * @return {boolean}
     */
    IExtUri.prototype.isEqualOrParent = function (base, parentCandidate, ignoreFragment) { };
    /**
     * Creates a key from a resource URI to be used to resource comparison and for resource maps.
     * @see {\@link ResourceMap}
     * @public
     * @param {!tsickle_uri_7.URI} uri Uri
     * @param {(undefined|boolean)=} ignoreFragment Ignore the fragment (defaults to `false`)
     * @return {string}
     */
    IExtUri.prototype.getComparisonKey = function (uri, ignoreFragment) { };
    /**
     * Whether the casing of the path-component of the uri should be ignored.
     * @public
     * @param {!tsickle_uri_7.URI} uri
     * @return {boolean}
     */
    IExtUri.prototype.ignorePathCasing = function (uri) { };
    /**
     * @public
     * @param {!tsickle_uri_7.URI} resource
     * @return {string}
     */
    IExtUri.prototype.basenameOrAuthority = function (resource) { };
    /**
     * Returns the basename of the path component of an uri.
     * @public
     * @param {!tsickle_uri_7.URI} resource
     * @return {string}
     */
    IExtUri.prototype.basename = function (resource) { };
    /**
     * Returns the extension of the path component of an uri.
     * @public
     * @param {!tsickle_uri_7.URI} resource
     * @return {string}
     */
    IExtUri.prototype.extname = function (resource) { };
    /**
     * Return a URI representing the directory of a URI path.
     *
     * @public
     * @param {!tsickle_uri_7.URI} resource The input URI.
     * @return {!tsickle_uri_7.URI} The URI representing the directory of the input URI.
     */
    IExtUri.prototype.dirname = function (resource) { };
    /**
     * Join a URI path with path fragments and normalizes the resulting path.
     *
     * @public
     * @param {!tsickle_uri_7.URI} resource The input URI.
     * @param {...string} pathFragment The path fragment to add to the URI path.
     * @return {!tsickle_uri_7.URI} The resulting URI.
     */
    IExtUri.prototype.joinPath = function (resource, pathFragment) { };
    /**
     * Normalizes the path part of a URI: Resolves `.` and `..` elements with directory names.
     *
     * @public
     * @param {!tsickle_uri_7.URI} resource The URI to normalize the path.
     * @return {!tsickle_uri_7.URI} The URI with the normalized path.
     */
    IExtUri.prototype.normalizePath = function (resource) { };
    /**
     *
     * @public
     * @param {!tsickle_uri_7.URI} from
     * @param {!tsickle_uri_7.URI} to
     * @return {(undefined|string)}
     */
    IExtUri.prototype.relativePath = function (from, to) { };
    /**
     * Resolves an absolute or relative path against a base URI.
     * The path can be relative or absolute posix or a Windows path
     * @public
     * @param {!tsickle_uri_7.URI} base
     * @param {string} path
     * @return {!tsickle_uri_7.URI}
     */
    IExtUri.prototype.resolvePath = function (base, path) { };
    /**
     * Returns true if the URI path is absolute.
     * @public
     * @param {!tsickle_uri_7.URI} resource
     * @return {boolean}
     */
    IExtUri.prototype.isAbsolutePath = function (resource) { };
    /**
     * Tests whether the two authorities are the same
     * @public
     * @param {string} a1
     * @param {string} a2
     * @return {boolean}
     */
    IExtUri.prototype.isEqualAuthority = function (a1, a2) { };
    /**
     * Returns true if the URI path has a trailing path separator
     * @public
     * @param {!tsickle_uri_7.URI} resource
     * @param {(undefined|string)=} sep
     * @return {boolean}
     */
    IExtUri.prototype.hasTrailingPathSeparator = function (resource, sep) { };
    /**
     * Removes a trailing path separator, if there's one.
     * Important: Doesn't remove the first slash, it would make the URI invalid
     * @public
     * @param {!tsickle_uri_7.URI} resource
     * @param {(undefined|string)=} sep
     * @return {!tsickle_uri_7.URI}
     */
    IExtUri.prototype.removeTrailingPathSeparator = function (resource, sep) { };
    /**
     * Adds a trailing path separator to the URI if there isn't one already.
     * For example, c:\ would be unchanged, but c:\users would become c:\users\
     * @public
     * @param {!tsickle_uri_7.URI} resource
     * @param {(undefined|string)=} sep
     * @return {!tsickle_uri_7.URI}
     */
    IExtUri.prototype.addTrailingPathSeparator = function (resource, sep) { };
}
/**
 * @implements {IExtUri}
 */
class ExtUri {
    /**
     * @public
     * @param {function(!tsickle_uri_7.URI): boolean} _ignorePathCasing
     */
    constructor(_ignorePathCasing) {
        this._ignorePathCasing = _ignorePathCasing;
    }
    /**
     * @public
     * @param {!tsickle_uri_7.URI} uri1
     * @param {!tsickle_uri_7.URI} uri2
     * @param {boolean=} ignoreFragment
     * @return {number}
     */
    compare(uri1, uri2, ignoreFragment = false) {
        if (uri1 === uri2) {
            return 0;
        }
        return (0, strings_1.compare)(this.getComparisonKey(uri1, ignoreFragment), this.getComparisonKey(uri2, ignoreFragment));
    }
    /**
     * @public
     * @param {(undefined|!tsickle_uri_7.URI)} uri1
     * @param {(undefined|!tsickle_uri_7.URI)} uri2
     * @param {boolean=} ignoreFragment
     * @return {boolean}
     */
    isEqual(uri1, uri2, ignoreFragment = false) {
        if (uri1 === uri2) {
            return true;
        }
        if (!uri1 || !uri2) {
            return false;
        }
        return this.getComparisonKey(uri1, ignoreFragment) === this.getComparisonKey(uri2, ignoreFragment);
    }
    /**
     * @public
     * @param {!tsickle_uri_7.URI} uri
     * @param {boolean=} ignoreFragment
     * @return {string}
     */
    getComparisonKey(uri, ignoreFragment = false) {
        return uri.with({
            path: this._ignorePathCasing(uri) ? uri.path.toLowerCase() : undefined,
            fragment: ignoreFragment ? null : undefined
        }).toString();
    }
    /**
     * @public
     * @param {!tsickle_uri_7.URI} uri
     * @return {boolean}
     */
    ignorePathCasing(uri) {
        return this._ignorePathCasing(uri);
    }
    /**
     * @public
     * @param {!tsickle_uri_7.URI} base
     * @param {!tsickle_uri_7.URI} parentCandidate
     * @param {boolean=} ignoreFragment
     * @return {boolean}
     */
    isEqualOrParent(base, parentCandidate, ignoreFragment = false) {
        if (base.scheme === parentCandidate.scheme) {
            if (base.scheme === network_1.Schemas.file) {
                return extpath.isEqualOrParent(originalFSPath(base), originalFSPath(parentCandidate), this._ignorePathCasing(base)) && base.query === parentCandidate.query && (ignoreFragment || base.fragment === parentCandidate.fragment);
            }
            if ((0, exports.isEqualAuthority)(base.authority, parentCandidate.authority)) {
                return extpath.isEqualOrParent(base.path, parentCandidate.path, this._ignorePathCasing(base), true) && base.query === parentCandidate.query && (ignoreFragment || base.fragment === parentCandidate.fragment);
            }
        }
        return false;
    }
    // --- path math
    /**
     * @public
     * @param {!tsickle_uri_7.URI} resource
     * @param {...string} pathFragment
     * @return {!tsickle_uri_7.URI}
     */
    joinPath(resource, ...pathFragment) {
        return uri_1.URI.joinPath(resource, ...pathFragment);
    }
    /**
     * @public
     * @param {!tsickle_uri_7.URI} resource
     * @return {string}
     */
    basenameOrAuthority(resource) {
        return (0, exports.basename)(resource) || resource.authority;
    }
    /**
     * @public
     * @param {!tsickle_uri_7.URI} resource
     * @param {(undefined|string)=} suffix
     * @return {string}
     */
    basename(resource, suffix) {
        return paths.posix.basename(resource.path, suffix);
    }
    /**
     * @public
     * @param {!tsickle_uri_7.URI} resource
     * @return {string}
     */
    extname(resource) {
        return paths.posix.extname(resource.path);
    }
    /**
     * @public
     * @param {!tsickle_uri_7.URI} resource
     * @return {!tsickle_uri_7.URI}
     */
    dirname(resource) {
        if (resource.path.length === 0) {
            return resource;
        }
        /** @type {?} */
        let dirname;
        if (resource.scheme === network_1.Schemas.file) {
            dirname = uri_1.URI.file(paths.dirname(originalFSPath(resource))).path;
        }
        else {
            dirname = paths.posix.dirname(resource.path);
            if (resource.authority && (/** @type {string} */ (dirname)).length && (/** @type {string} */ (dirname)).charCodeAt(0) !== charCode_1.CharCode.Slash) {
                console.error(`dirname("${resource.toString})) resulted in a relative path`);
                dirname = '/'; // If a URI contains an authority component, then the path component must either be empty or begin with a CharCode.Slash ("/") character
            }
        }
        return resource.with({
            path: dirname
        });
    }
    /**
     * @public
     * @param {!tsickle_uri_7.URI} resource
     * @return {!tsickle_uri_7.URI}
     */
    normalizePath(resource) {
        if (!resource.path.length) {
            return resource;
        }
        /** @type {string} */
        let normalizedPath;
        if (resource.scheme === network_1.Schemas.file) {
            normalizedPath = uri_1.URI.file(paths.normalize(originalFSPath(resource))).path;
        }
        else {
            normalizedPath = paths.posix.normalize(resource.path);
        }
        return resource.with({
            path: normalizedPath
        });
    }
    /**
     * @public
     * @param {!tsickle_uri_7.URI} from
     * @param {!tsickle_uri_7.URI} to
     * @return {(undefined|string)}
     */
    relativePath(from, to) {
        if (from.scheme !== to.scheme || !(0, exports.isEqualAuthority)(from.authority, to.authority)) {
            return undefined;
        }
        if (from.scheme === network_1.Schemas.file) {
            /** @type {string} */
            const relativePath = paths.relative(originalFSPath(from), originalFSPath(to));
            // go/vscode-patch/use-posix-paths
            return relativePath;
        }
        /** @type {string} */
        let fromPath = from.path || '/';
        /** @type {string} */
        const toPath = to.path || '/';
        if (this._ignorePathCasing(from)) {
            // make casing of fromPath match toPath
            /** @type {number} */
            let i = 0;
            for (const len = Math.min(fromPath.length, toPath.length); i < len; i++) {
                if (fromPath.charCodeAt(i) !== toPath.charCodeAt(i)) {
                    if (fromPath.charAt(i).toLowerCase() !== toPath.charAt(i).toLowerCase()) {
                        break;
                    }
                }
            }
            fromPath = toPath.substr(0, i) + fromPath.substr(i);
        }
        return paths.posix.relative(fromPath, toPath);
    }
    /**
     * @public
     * @param {!tsickle_uri_7.URI} base
     * @param {string} path
     * @return {!tsickle_uri_7.URI}
     */
    resolvePath(base, path) {
        if (base.scheme === network_1.Schemas.file) {
            /** @type {!tsickle_uri_7.URI} */
            const newURI = uri_1.URI.file(paths.resolve(originalFSPath(base), path));
            return base.with({
                authority: newURI.authority,
                path: newURI.path
            });
        }
        path = extpath.toPosixPath(path); // we allow path to be a windows path
        return base.with({
            path: paths.posix.resolve(base.path, path)
        });
    }
    // --- misc
    /**
     * @public
     * @param {!tsickle_uri_7.URI} resource
     * @return {boolean}
     */
    isAbsolutePath(resource) {
        return !!resource.path && resource.path[0] === '/';
    }
    /**
     * @public
     * @param {(undefined|string)} a1
     * @param {(undefined|string)} a2
     * @return {boolean}
     */
    isEqualAuthority(a1, a2) {
        return a1 === a2 || (a1 !== undefined && a2 !== undefined && (0, strings_1.equalsIgnoreCase)(a1, a2));
    }
    /**
     * @public
     * @param {!tsickle_uri_7.URI} resource
     * @param {string=} sep
     * @return {boolean}
     */
    hasTrailingPathSeparator(resource, sep = paths.sep) {
        if (resource.scheme === network_1.Schemas.file) {
            /** @type {string} */
            const fsp = originalFSPath(resource);
            return fsp.length > extpath.getRoot(fsp).length && fsp[fsp.length - 1] === sep;
        }
        else {
            /** @type {string} */
            const p = resource.path;
            return (p.length > 1 && p.charCodeAt(p.length - 1) === charCode_1.CharCode.Slash) && !(/^[a-zA-Z]:(\/$|\\$)/.test(resource.fsPath)); // ignore the slash at offset 0
        }
    }
    /**
     * @public
     * @param {!tsickle_uri_7.URI} resource
     * @param {string=} sep
     * @return {!tsickle_uri_7.URI}
     */
    removeTrailingPathSeparator(resource, sep = paths.sep) {
        // Make sure that the path isn't a drive letter. A trailing separator there is not removable.
        if ((0, exports.hasTrailingPathSeparator)(resource, sep)) {
            return resource.with({ path: resource.path.substr(0, resource.path.length - 1) });
        }
        return resource;
    }
    /**
     * @public
     * @param {!tsickle_uri_7.URI} resource
     * @param {string=} sep
     * @return {!tsickle_uri_7.URI}
     */
    addTrailingPathSeparator(resource, sep = paths.sep) {
        /** @type {boolean} */
        let isRootSep = false;
        if (resource.scheme === network_1.Schemas.file) {
            /** @type {string} */
            const fsp = originalFSPath(resource);
            isRootSep = ((fsp !== undefined) && (fsp.length === extpath.getRoot(fsp).length) && (fsp[fsp.length - 1] === sep));
        }
        else {
            sep = '/';
            /** @type {string} */
            const p = resource.path;
            isRootSep = p.length === 1 && p.charCodeAt(p.length - 1) === charCode_1.CharCode.Slash;
        }
        if (!isRootSep && !(0, exports.hasTrailingPathSeparator)(resource, sep)) {
            return resource.with({ path: resource.path + '/' });
        }
        return resource;
    }
}
exports.ExtUri = ExtUri;
/* istanbul ignore if */
if (false) {
    /**
     * @type {function(!tsickle_uri_7.URI): boolean}
     * @private
     */
    ExtUri.prototype._ignorePathCasing;
}
/**
 * Unbiased utility that takes uris "as they are". This means it can be interchanged with
 * uri#toString() usages. The following is true
 * ```
 * assertEqual(aUri.toString() === bUri.toString(), exturi.isEqual(aUri, bUri))
 * ```
 * @type {!ExtUri}
 */
exports.extUri = new ExtUri((/**
 * @return {boolean}
 */
() => false));
/**
 * BIASED utility that _mostly_ ignored the case of urs paths. ONLY use this util if you
 * understand what you are doing.
 *
 * This utility is INCOMPATIBLE with `uri.toString()`-usages and both CANNOT be used interchanged.
 *
 * When dealing with uris from files or documents, `extUri` (the unbiased friend)is sufficient
 * because those uris come from a "trustworthy source". When creating unknown uris it's always
 * better to use `IUriIdentityService` which exposes an `IExtUri`-instance which knows when path
 * casing matters.
 * @type {!ExtUri}
 */
exports.extUriBiasedIgnorePathCase = new ExtUri((/**
 * @param {!tsickle_uri_7.URI} uri
 * @return {boolean}
 */
uri => {
    // A file scheme resource is in the same platform as code, so ignore case for non linux platforms
    // Resource can be from another platform. Lowering the case as an hack. Should come from File system provider
    return uri.scheme === network_1.Schemas.file ? !platform_1.isLinux : true;
}));
/**
 * BIASED utility that always ignores the casing of uris paths. ONLY use this util if you
 * understand what you are doing.
 *
 * This utility is INCOMPATIBLE with `uri.toString()`-usages and both CANNOT be used interchanged.
 *
 * When dealing with uris from files or documents, `extUri` (the unbiased friend)is sufficient
 * because those uris come from a "trustworthy source". When creating unknown uris it's always
 * better to use `IUriIdentityService` which exposes an `IExtUri`-instance which knows when path
 * casing matters.
 * @type {!ExtUri}
 */
exports.extUriIgnorePathCase = new ExtUri((/**
 * @param {!tsickle_uri_7.URI} _
 * @return {boolean}
 */
_ => true));
/** @type {function((undefined|!tsickle_uri_7.URI), (undefined|!tsickle_uri_7.URI), boolean=): boolean} */
exports.isEqual = exports.extUri.isEqual.bind(exports.extUri);
/** @type {function(!tsickle_uri_7.URI, !tsickle_uri_7.URI, boolean=): boolean} */
exports.isEqualOrParent = exports.extUri.isEqualOrParent.bind(exports.extUri);
/** @type {function(!tsickle_uri_7.URI, boolean=): string} */
exports.getComparisonKey = exports.extUri.getComparisonKey.bind(exports.extUri);
/** @type {function(!tsickle_uri_7.URI): string} */
exports.basenameOrAuthority = exports.extUri.basenameOrAuthority.bind(exports.extUri);
/** @type {function(!tsickle_uri_7.URI, (undefined|string)=): string} */
exports.basename = exports.extUri.basename.bind(exports.extUri);
/** @type {function(!tsickle_uri_7.URI): string} */
exports.extname = exports.extUri.extname.bind(exports.extUri);
/** @type {function(!tsickle_uri_7.URI): !tsickle_uri_7.URI} */
exports.dirname = exports.extUri.dirname.bind(exports.extUri);
/** @type {function(!tsickle_uri_7.URI, ...string): !tsickle_uri_7.URI} */
exports.joinPath = exports.extUri.joinPath.bind(exports.extUri);
/** @type {function(!tsickle_uri_7.URI): !tsickle_uri_7.URI} */
exports.normalizePath = exports.extUri.normalizePath.bind(exports.extUri);
/** @type {function(!tsickle_uri_7.URI, !tsickle_uri_7.URI): (undefined|string)} */
exports.relativePath = exports.extUri.relativePath.bind(exports.extUri);
/** @type {function(!tsickle_uri_7.URI, string): !tsickle_uri_7.URI} */
exports.resolvePath = exports.extUri.resolvePath.bind(exports.extUri);
/** @type {function(!tsickle_uri_7.URI): boolean} */
exports.isAbsolutePath = exports.extUri.isAbsolutePath.bind(exports.extUri);
/** @type {function((undefined|string), (undefined|string)): boolean} */
exports.isEqualAuthority = exports.extUri.isEqualAuthority.bind(exports.extUri);
/** @type {function(!tsickle_uri_7.URI, string=): boolean} */
exports.hasTrailingPathSeparator = exports.extUri.hasTrailingPathSeparator.bind(exports.extUri);
/** @type {function(!tsickle_uri_7.URI, string=): !tsickle_uri_7.URI} */
exports.removeTrailingPathSeparator = exports.extUri.removeTrailingPathSeparator.bind(exports.extUri);
/** @type {function(!tsickle_uri_7.URI, string=): !tsickle_uri_7.URI} */
exports.addTrailingPathSeparator = exports.extUri.addTrailingPathSeparator.bind(exports.extUri);
//#endregion
/**
 * @template T
 * @param {!Array<T>} items
 * @param {function(T): !tsickle_uri_7.URI} resourceAccessor
 * @return {!Array<T>}
 */
function distinctParents(items, resourceAccessor) {
    /** @type {!Array<T>} */
    const distinctParents = [];
    for (let i = 0; i < items.length; i++) {
        /** @type {!tsickle_uri_7.URI} */
        const candidateResource = resourceAccessor(items[i]);
        if (items.some((/**
         * @param {T} otherItem
         * @param {number} index
         * @return {boolean}
         */
        (otherItem, index) => {
            if (index === i) {
                return false;
            }
            return (0, exports.isEqualOrParent)(candidateResource, resourceAccessor(otherItem));
        }))) {
            continue;
        }
        distinctParents.push(items[i]);
    }
    return distinctParents;
}
exports.distinctParents = distinctParents;
/**
 * Data URI related helpers.
 */
var DataUri;
(function (DataUri) {
    /** @type {string} */
    DataUri.META_DATA_LABEL = 'label';
    /** @type {string} */
    DataUri.META_DATA_DESCRIPTION = 'description';
    /** @type {string} */
    DataUri.META_DATA_SIZE = 'size';
    /** @type {string} */
    DataUri.META_DATA_MIME = 'mime';
    /**
     * @param {!tsickle_uri_7.URI} dataUri
     * @return {!Map<string, string>}
     */
    function parseMetaData(dataUri) {
        /** @type {!Map<string, string>} */
        const metadata = new Map();
        // Given a URI of:  data:image/png;size:2313;label:SomeLabel;description:SomeDescription;base64,77+9UE5...
        // the metadata is: size:2313;label:SomeLabel;description:SomeDescription
        /** @type {string} */
        const meta = dataUri.path.substring(dataUri.path.indexOf(';') + 1, dataUri.path.lastIndexOf(';'));
        meta.split(';').forEach((/**
         * @param {string} property
         * @return {void}
         */
        property => {
            const [key__tsickle_destructured_1, value__tsickle_destructured_2] = property.split(':');
            const key = /** @type {string} */ (key__tsickle_destructured_1);
            const value = /** @type {string} */ (value__tsickle_destructured_2);
            if (key && value) {
                metadata.set(key, value);
            }
        }));
        // Given a URI of:  data:image/png;size:2313;label:SomeLabel;description:SomeDescription;base64,77+9UE5...
        // the mime is: image/png
        /** @type {string} */
        const mime = dataUri.path.substring(0, dataUri.path.indexOf(';'));
        if (mime) {
            metadata.set(DataUri.META_DATA_MIME, mime);
        }
        return metadata;
    }
    DataUri.parseMetaData = parseMetaData;
})(DataUri || (DataUri = {}));
exports.DataUri = DataUri;
/**
 * @param {!tsickle_uri_7.URI} resource
 * @param {(undefined|string)} authority
 * @param {string} localScheme
 * @return {!tsickle_uri_7.URI}
 */
function toLocalResource(resource, authority, localScheme) {
    if (authority) {
        /** @type {string} */
        let path = resource.path;
        if (path && path[0] !== paths.posix.sep) {
            path = paths.posix.sep + path;
        }
        return resource.with({ scheme: localScheme, authority, path });
    }
    return resource.with({ scheme: localScheme });
}
exports.toLocalResource = toLocalResource;
