/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/antigravity/src/vs/base/common/network.ts
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
goog.module('google3.third_party.antigravity.src.vs.base.common.network');
var module = module || { id: 'third_party/antigravity/src/vs/base/common/network.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_errors_1 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.errors");
const tsickle_platform_2 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.platform");
const tsickle_strings_3 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.strings");
const tsickle_uri_4 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.uri");
const tsickle_path_5 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.path");
const errors = goog.require('google3.third_party.antigravity.src.vs.base.common.errors');
const platform = goog.require('google3.third_party.antigravity.src.vs.base.common.platform');
const strings_1 = goog.require('google3.third_party.antigravity.src.vs.base.common.strings');
const uri_1 = goog.require('google3.third_party.antigravity.src.vs.base.common.uri');
const paths = goog.require('google3.third_party.antigravity.src.vs.base.common.path');
var Schemas;
(function (Schemas) {
    /**
     * A schema that is used for models that exist in memory
     * only and that have no correspondence on a server or such.
     * @type {string}
     */
    Schemas.inMemory = 'inmemory';
    /**
     * A schema that is used for setting files
     * @type {string}
     */
    Schemas.vscode = 'vscode';
    /**
     * A schema that is used for internal private files
     * @type {string}
     */
    Schemas.internal = 'private';
    /**
     * A walk-through document.
     * @type {string}
     */
    Schemas.walkThrough = 'walkThrough';
    /**
     * An embedded code snippet.
     * @type {string}
     */
    Schemas.walkThroughSnippet = 'walkThroughSnippet';
    /** @type {string} */
    Schemas.http = 'http';
    /** @type {string} */
    Schemas.https = 'https';
    /** @type {string} */
    Schemas.file = 'file';
    /** @type {string} */
    Schemas.mailto = 'mailto';
    /** @type {string} */
    Schemas.untitled = 'untitled';
    /** @type {string} */
    Schemas.data = 'data';
    /** @type {string} */
    Schemas.command = 'command';
    /** @type {string} */
    Schemas.vscodeRemote = 'vscode-remote';
    /** @type {string} */
    Schemas.vscodeRemoteResource = 'vscode-remote-resource';
    /** @type {string} */
    Schemas.vscodeManagedRemoteResource = 'vscode-managed-remote-resource';
    /** @type {string} */
    Schemas.vscodeUserData = 'vscode-userdata';
    /** @type {string} */
    Schemas.vscodeCustomEditor = 'vscode-custom-editor';
    /** @type {string} */
    Schemas.vscodeNotebookCell = 'vscode-notebook-cell';
    /** @type {string} */
    Schemas.vscodeNotebookCellMetadata = 'vscode-notebook-cell-metadata';
    /** @type {string} */
    Schemas.vscodeNotebookCellMetadataDiff = 'vscode-notebook-cell-metadata-diff';
    /** @type {string} */
    Schemas.vscodeNotebookCellOutput = 'vscode-notebook-cell-output';
    /** @type {string} */
    Schemas.vscodeNotebookCellOutputDiff = 'vscode-notebook-cell-output-diff';
    /** @type {string} */
    Schemas.vscodeNotebookMetadata = 'vscode-notebook-metadata';
    /** @type {string} */
    Schemas.vscodeInteractiveInput = 'vscode-interactive-input';
    /** @type {string} */
    Schemas.vscodeSettings = 'vscode-settings';
    /** @type {string} */
    Schemas.vscodeWorkspaceTrust = 'vscode-workspace-trust';
    /** @type {string} */
    Schemas.vscodeTerminal = 'vscode-terminal';
    /**
     * Scheme used for code blocks in chat.
     * @type {string}
     */
    Schemas.vscodeChatCodeBlock = 'vscode-chat-code-block';
    /**
     * Scheme used for LHS of code compare (aka diff) blocks in chat.
     * @type {string}
     */
    Schemas.vscodeChatCodeCompareBlock = 'vscode-chat-code-compare-block';
    /**
     * Scheme used for the chat input editor.
     * @type {string}
     */
    Schemas.vscodeChatEditor = 'vscode-chat-editor';
    /**
     * Scheme used for the chat input part
     * @type {string}
     */
    Schemas.vscodeChatInput = 'chatSessionInput';
    /**
     * Scheme used for local chat session content
     * @type {string}
     */
    Schemas.vscodeLocalChatSession = 'vscode-chat-session';
    /**
     * Scheme used internally for webviews that aren't linked to a resource (i.e. not custom editors)
     * @type {string}
     */
    Schemas.webviewPanel = 'webview-panel';
    /**
     * Scheme used for loading the wrapper html and script in webviews.
     * @type {string}
     */
    Schemas.vscodeWebview = 'vscode-webview';
    /**
     * Scheme used for extension pages
     * @type {string}
     */
    Schemas.extension = 'extension';
    /**
     * Scheme used as a replacement of `file` scheme to load
     * files with our custom protocol handler (desktop only).
     * @type {string}
     */
    Schemas.vscodeFileResource = 'vscode-file';
    /**
     * Scheme used for temporary resources
     * @type {string}
     */
    Schemas.tmp = 'tmp';
    /**
     * Scheme used vs live share
     * @type {string}
     */
    Schemas.vsls = 'vsls';
    /**
     * Scheme used for the Source Control commit input's text document
     * @type {string}
     */
    Schemas.vscodeSourceControl = 'vscode-scm';
    /**
     * Scheme used for input box for creating comments.
     * @type {string}
     */
    Schemas.commentsInput = 'comment';
    /**
     * Scheme used for special rendering of settings in the release notes
     * @type {string}
     */
    Schemas.codeSetting = 'code-setting';
    /**
     * Scheme used for output panel resources
     * @type {string}
     */
    Schemas.outputChannel = 'output';
    /**
     * Scheme used for the accessible view
     * @type {string}
     */
    Schemas.accessibleView = 'accessible-view';
    /**
     * Used for snapshots of chat edits
     * @type {string}
     */
    Schemas.chatEditingSnapshotScheme = 'chat-editing-snapshot-text-model';
    /** @type {string} */
    Schemas.chatEditingModel = 'chat-editing-text-model';
    /**
     * Used for rendering multidiffs in copilot agent sessions
     * @type {string}
     */
    Schemas.copilotPr = 'copilot-pr';
})(Schemas || (Schemas = {}));
exports.Schemas = Schemas;
/**
 * @param {(string|!tsickle_uri_4.URI)} target
 * @param {string} scheme
 * @return {boolean}
 */
function matchesScheme(target, scheme) {
    if (uri_1.URI.isUri(target)) {
        return (0, strings_1.equalsIgnoreCase)((/** @type {!tsickle_uri_4.URI} */ (target)).scheme, scheme);
    }
    else {
        return (0, strings_1.startsWithIgnoreCase)(target, scheme + ':');
    }
}
exports.matchesScheme = matchesScheme;
/**
 * @param {(string|!tsickle_uri_4.URI)} target
 * @param {...string} schemes
 * @return {boolean}
 */
function matchesSomeScheme(target, ...schemes) {
    return schemes.some((/**
     * @param {string} scheme
     * @return {boolean}
     */
    scheme => matchesScheme(target, scheme)));
}
exports.matchesSomeScheme = matchesSomeScheme;
/** @type {string} */
exports.connectionTokenCookieName = 'vscode-tkn';
/** @type {string} */
exports.connectionTokenQueryName = 'tkn';
class RemoteAuthoritiesImpl {
    constructor() {
        this._hosts = Object.create(null);
        this._ports = Object.create(null);
        this._connectionTokens = Object.create(null);
        this._preferredWebSchema = 'http';
        this._delegate = null;
        this._serverRootPath = '/';
    }
    /**
     * @public
     * @param {string} schema
     * @return {void}
     */
    setPreferredWebSchema(schema) {
        this._preferredWebSchema = schema;
    }
    /**
     * @public
     * @param {function(!tsickle_uri_4.URI): !tsickle_uri_4.URI} delegate
     * @return {void}
     */
    setDelegate(delegate) {
        this._delegate = delegate;
    }
    /**
     * @public
     * @param {{quality: (undefined|string), commit: (undefined|string)}} product
     * @param {(undefined|string)} serverBasePath
     * @return {void}
     */
    setServerRootPath(product, serverBasePath) {
        this._serverRootPath = paths.posix.join(serverBasePath ?? '/', getServerProductSegment(product));
    }
    /**
     * @public
     * @return {string}
     */
    getServerRootPath() {
        return this._serverRootPath;
    }
    /**
     * @private
     * @return {string}
     */
    get _remoteResourcesPath() {
        return paths.posix.join(this._serverRootPath, Schemas.vscodeRemoteResource);
    }
    /**
     * @public
     * @param {string} authority
     * @param {string} host
     * @param {number} port
     * @return {void}
     */
    set(authority, host, port) {
        this._hosts[authority] = host;
        this._ports[authority] = port;
    }
    /**
     * @public
     * @param {string} authority
     * @param {string} connectionToken
     * @return {void}
     */
    setConnectionToken(authority, connectionToken) {
        this._connectionTokens[authority] = connectionToken;
    }
    /**
     * @public
     * @return {string}
     */
    getPreferredWebSchema() {
        return this._preferredWebSchema;
    }
    /**
     * @public
     * @param {!tsickle_uri_4.URI} uri
     * @return {!tsickle_uri_4.URI}
     */
    rewrite(uri) {
        if (this._delegate) {
            try {
                return this._delegate(uri);
            }
            catch (err) {
                errors.onUnexpectedError(err);
                return uri;
            }
        }
        /** @type {string} */
        const authority = uri.authority;
        /** @type {(undefined|string)} */
        let host = this._hosts[authority];
        if (host && host.indexOf(':') !== -1 && host.indexOf('[') === -1) {
            host = `[${host}]`;
        }
        /** @type {(undefined|number)} */
        const port = this._ports[authority];
        /** @type {(undefined|string)} */
        const connectionToken = this._connectionTokens[authority];
        /** @type {string} */
        let query = `path=${encodeURIComponent(uri.path)}`;
        if (typeof connectionToken === 'string') {
            query += `&${exports.connectionTokenQueryName}=${encodeURIComponent(connectionToken)}`;
        }
        return uri_1.URI.from({
            scheme: platform.isWeb ? this._preferredWebSchema : Schemas.vscodeRemoteResource,
            authority: `${host}:${port}`,
            path: this._remoteResourcesPath,
            query
        });
    }
}
/* istanbul ignore if */
if (false) {
    /**
     * @const {!Object<string,(undefined|string)>}
     * @private
     */
    RemoteAuthoritiesImpl.prototype._hosts;
    /**
     * @const {!Object<string,(undefined|number)>}
     * @private
     */
    RemoteAuthoritiesImpl.prototype._ports;
    /**
     * @const {!Object<string,(undefined|string)>}
     * @private
     */
    RemoteAuthoritiesImpl.prototype._connectionTokens;
    /**
     * @type {string}
     * @private
     */
    RemoteAuthoritiesImpl.prototype._preferredWebSchema;
    /**
     * @type {(null|function(!tsickle_uri_4.URI): !tsickle_uri_4.URI)}
     * @private
     */
    RemoteAuthoritiesImpl.prototype._delegate;
    /**
     * @type {string}
     * @private
     */
    RemoteAuthoritiesImpl.prototype._serverRootPath;
}
/** @type {!RemoteAuthoritiesImpl} */
exports.RemoteAuthorities = new RemoteAuthoritiesImpl();
/**
 * @param {{quality: (undefined|string), commit: (undefined|string)}} product
 * @return {string}
 */
function getServerProductSegment(product) {
    return `${product.quality ?? 'oss'}-${product.commit ?? 'dev'}`;
}
exports.getServerProductSegment = getServerProductSegment;
/**
 * A string pointing to a path inside the app. It should not begin with ./ or ../
 * @typedef {string}
 */
exports.AppResourcePath;
/** @type {string} */
exports.builtinExtensionsPath = 'vs/../../extensions';
/** @type {string} */
exports.nodeModulesPath = 'vs/../../node_modules';
/** @type {string} */
exports.nodeModulesAsarPath = 'vs/../../node_modules.asar';
/** @type {string} */
exports.nodeModulesAsarUnpackedPath = 'vs/../../node_modules.asar.unpacked';
/** @type {string} */
exports.VSCODE_AUTHORITY = 'vscode-app';
class FileAccessImpl {
    /**
     * Returns a URI to use in contexts where the browser is responsible
     * for loading (e.g. fetch()) or when used within the DOM.
     *
     * **Note:** use `dom.ts#asCSSUrl` whenever the URL is to be used in CSS context.
     * @public
     * @param {string} resourcePath
     * @return {!tsickle_uri_4.URI}
     */
    asBrowserUri(resourcePath) {
        /** @type {!tsickle_uri_4.URI} */
        const uri = this.toUri(resourcePath);
        return this.uriToBrowserUri(uri);
    }
    /**
     * Returns a URI to use in contexts where the browser is responsible
     * for loading (e.g. fetch()) or when used within the DOM.
     *
     * **Note:** use `dom.ts#asCSSUrl` whenever the URL is to be used in CSS context.
     * @public
     * @param {!tsickle_uri_4.URI} uri
     * @return {!tsickle_uri_4.URI}
     */
    uriToBrowserUri(uri) {
        // Handle remote URIs via `RemoteAuthorities`
        if (uri.scheme === Schemas.vscodeRemote) {
            return exports.RemoteAuthorities.rewrite(uri);
        }
        // Convert to `vscode-file` resource..
        if (
        // ...only ever for `file` resources
        uri.scheme === Schemas.file &&
            (
            // ...and we run in native environments
            platform.isNative ||
                // ...or web worker extensions on desktop
                (platform.webWorkerOrigin === `${Schemas.vscodeFileResource}://${FileAccessImpl.FALLBACK_AUTHORITY}`))) {
            return uri.with({
                scheme: Schemas.vscodeFileResource,
                // We need to provide an authority here so that it can serve
                // as origin for network and loading matters in chromium.
                // If the URI is not coming with an authority already, we
                // add our own
                authority: uri.authority || FileAccessImpl.FALLBACK_AUTHORITY,
                query: null,
                fragment: null
            });
        }
        return uri;
    }
    /**
     * Returns the `file` URI to use in contexts where node.js
     * is responsible for loading.
     * @public
     * @param {string} resourcePath
     * @return {!tsickle_uri_4.URI}
     */
    asFileUri(resourcePath) {
        /** @type {!tsickle_uri_4.URI} */
        const uri = this.toUri(resourcePath);
        return this.uriToFileUri(uri);
    }
    /**
     * Returns the `file` URI to use in contexts where node.js
     * is responsible for loading.
     * @public
     * @param {!tsickle_uri_4.URI} uri
     * @return {!tsickle_uri_4.URI}
     */
    uriToFileUri(uri) {
        // Only convert the URI if it is `vscode-file:` scheme
        if (uri.scheme === Schemas.vscodeFileResource) {
            return uri.with({
                scheme: Schemas.file,
                // Only preserve the `authority` if it is different from
                // our fallback authority. This ensures we properly preserve
                // Windows UNC paths that come with their own authority.
                authority: uri.authority !== FileAccessImpl.FALLBACK_AUTHORITY ? uri.authority : null,
                query: null,
                fragment: null
            });
        }
        return uri;
    }
    /**
     * @private
     * @param {(string|!tsickle_uri_4.URI)} uriOrModule
     * @return {!tsickle_uri_4.URI}
     */
    toUri(uriOrModule) {
        if (uri_1.URI.isUri(uriOrModule)) {
            return uriOrModule;
        }
        // go/vscode-patch/static-content#file-access
        if (globalThis._VSCODE_STATIC_CONTENT_URL) {
            /** @type {(undefined|string)} */
            const url = globalThis._VSCODE_STATIC_CONTENT_URL(uriOrModule);
            if (url)
                return uri_1.URI.parse(url);
            if ((/** @type {string} */ (uriOrModule)).endsWith('.js'))
                return uri_1.URI.from({ scheme: 'mss', path: uriOrModule });
            return uri_1.URI.from({ scheme: 'unknown-file-access', path: uriOrModule });
        }
        if (globalThis._VSCODE_FILE_ROOT) {
            /** @type {string} */
            const rootUriOrPath = globalThis._VSCODE_FILE_ROOT;
            // File URL (with scheme)
            if (/^\w[\w\d+.-]*:\/\//.test(rootUriOrPath)) {
                return uri_1.URI.joinPath(uri_1.URI.parse(rootUriOrPath, true), uriOrModule);
            }
            // File Path (no scheme)
            /** @type {string} */
            const modulePath = paths.join(rootUriOrPath, uriOrModule);
            return uri_1.URI.file(modulePath);
        }
        throw new Error('Cannot determine URI for module id!');
    }
}
FileAccessImpl.FALLBACK_AUTHORITY = exports.VSCODE_AUTHORITY;
/* istanbul ignore if */
if (false) {
    /**
     * @const {string}
     * @private
     */
    FileAccessImpl.FALLBACK_AUTHORITY;
}
/** @type {!FileAccessImpl} */
exports.FileAccess = new FileAccessImpl();
/** @type {?} */
exports.CacheControlheaders = Object.freeze({
    'Cache-Control': 'no-cache, no-store'
});
/** @type {?} */
exports.DocumentPolicyheaders = Object.freeze({
    'Document-Policy': 'include-js-call-stacks-in-crash-reports'
});
var COI;
(function (COI) {
    /** @type {!Map<string, ?>} */
    const coiHeaders = new Map([
        ['1', { 'Cross-Origin-Opener-Policy': 'same-origin' }],
        ['2', { 'Cross-Origin-Embedder-Policy': 'require-corp' }],
        ['3', { 'Cross-Origin-Opener-Policy': 'same-origin', 'Cross-Origin-Embedder-Policy': 'require-corp' }],
    ]);
    /** @type {(undefined|?)} */
    COI.CoopAndCoep = Object.freeze(coiHeaders.get('3'));
    /** @type {string} */
    const coiSearchParamName = 'vscode-coi';
    /**
     * Extract desired headers from `vscode-coi` invocation
     * @param {(string|!tsickle_uri_4.URI|!URL)} url
     * @return {(undefined|?)}
     */
    function getHeadersFromQuery(url) {
        /** @type {(undefined|!URLSearchParams)} */
        let params;
        if (typeof url === 'string') {
            params = new URL(url).searchParams;
        }
        else if (url instanceof URL) {
            params = (/** @type {!URL} */ (url)).searchParams;
        }
        else if (uri_1.URI.isUri(url)) {
            params = new URL((/** @type {!tsickle_uri_4.URI} */ (url)).toString(true)).searchParams;
        }
        /** @type {(undefined|null|string)} */
        const value = params?.get(coiSearchParamName);
        if (!value) {
            return undefined;
        }
        return coiHeaders.get(value);
    }
    COI.getHeadersFromQuery = getHeadersFromQuery;
    /**
     * Add the `vscode-coi` query attribute based on wanting `COOP` and `COEP`. Will be a noop when `crossOriginIsolated`
     * isn't enabled the current context
     * @param {(?|!URLSearchParams)} urlOrSearch
     * @param {boolean} coop
     * @param {boolean} coep
     * @return {void}
     */
    function addSearchParam(urlOrSearch, coop, coep) {
        if (!((/** @type {?} */ (globalThis))).crossOriginIsolated) {
            // depends on the current context being COI
            return;
        }
        /** @type {string} */
        const value = coop && coep ? '3' : coep ? '2' : '1';
        if (urlOrSearch instanceof URLSearchParams) {
            (/** @type {!URLSearchParams} */ (urlOrSearch)).set(coiSearchParamName, value);
        }
        else {
            urlOrSearch[coiSearchParamName] = value;
        }
    }
    COI.addSearchParam = addSearchParam;
})(COI || (COI = {}));
exports.COI = COI;
