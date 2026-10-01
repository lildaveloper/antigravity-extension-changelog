/**
 * @fileoverview added by tsickle
 * Generated from: devtools/cider/extensionutils/filesystem.ts
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
goog.module('google3.devtools.cider.extensionutils.filesystem');
var module = module || { id: 'devtools/cider/extensionutils/filesystem.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_vscode_1 = goog.requireType("vscode");
const tsickle_cancelation_2 = goog.requireType("google3.devtools.cider.extensionutils.vscode.cancelation");
const vscode = goog.require('vscode'); // from //devtools/cider/extensions:vscode
// from //devtools/cider/extensions:vscode
const cancelation_1 = goog.require('google3.devtools.cider.extensionutils.vscode.cancelation');
/**
 * This class extends the TextDocumentContentProvider interface to support
 * providing binary data as well.
 * @record
 * tsickle: dropped extends: dropped extends of a type literal: Partial<vscode.TextDocumentContentProvider>
 */
function VirtualFilesystemContentProvider() { }
exports.VirtualFilesystemContentProvider = VirtualFilesystemContentProvider;
/* istanbul ignore if */
if (false) {
    /**
     * @public
     * @param {!tsickle_vscode_1.Uri} uri
     * @param {!tsickle_vscode_1.CancellationToken} token
     * @return {(undefined|null|!Thenable<(undefined|null|!Uint8Array)>|!Uint8Array)}
     */
    VirtualFilesystemContentProvider.prototype.provideBinaryContent = function (uri, token) { };
    /**
     * @public
     * @param {!tsickle_vscode_1.Uri} uri
     * @return {(undefined|null|?|!Thenable<(undefined|null|?)>)}
     */
    VirtualFilesystemContentProvider.prototype.provideStat = function (uri) { };
}
/**
 * This is a filesystem which is generated from a TextDocumentContentProvider.
 * @implements {tsickle_vscode_1.FileSystemProvider}
 */
class VirtualFileFilesystem {
    /**
     * @public
     * @param {!VirtualFilesystemContentProvider} provider
     */
    constructor(provider) {
        this.provider = provider;
        this.onDidChangeFileEmitter = new vscode.EventEmitter();
        this.onDidChangeFile = this.onDidChangeFileEmitter.event;
        provider.onDidChange?.((/**
         * @param {!tsickle_vscode_1.Uri} uri
         * @return {void}
         */
        (uri) => {
            this.onDidChangeFileEmitter.fire([
                {
                    type: vscode.FileChangeType.Changed,
                    uri,
                },
            ]);
        }));
    }
    /**
     * @public
     * @return {!tsickle_vscode_1.Disposable}
     */
    watch() {
        return new vscode.Disposable((/**
         * @return {void}
         */
        () => { }));
    }
    /**
     * @public
     * @param {!tsickle_vscode_1.Uri} uri
     * @return {!Promise<!tsickle_vscode_1.FileStat>}
     */
    async stat(uri) {
        /** @type {?} */
        const stat = (await this.provider.provideStat?.(uri)) ?? {};
        return {
            type: stat.type ?? vscode.FileType.File,
            ctime: stat.ctime ?? 0,
            mtime: stat.mtime ?? new Date().getTime(),
            size: stat.size ?? 0,
        };
    }
    /**
     * @public
     * @param {!tsickle_vscode_1.Uri} uri
     * @return {!Array<!Array<?>>}
     */
    readDirectory(uri) {
        return [];
    }
    /**
     * @public
     * @param {!tsickle_vscode_1.Uri} uri
     * @return {void}
     */
    createDirectory(uri) {
        throw vscode.FileSystemError.NoPermissions(uri);
    }
    /**
     * @public
     * @param {!tsickle_vscode_1.Uri} uri
     * @return {!Promise<!Uint8Array>}
     */
    async readFile(uri) {
        if (this.provider.provideBinaryContent) {
            /** @type {(undefined|null|!Uint8Array)} */
            const content = await this.provider.provideBinaryContent(uri, cancelation_1.CancellationToken.None);
            if (content === undefined || content === null) {
                throw vscode.FileSystemError.FileNotFound(uri);
            }
            return content;
        }
        /** @type {(undefined|null|string)} */
        const content = await this.provider.provideTextDocumentContent?.(uri, cancelation_1.CancellationToken.None);
        if (content === undefined || content === null) {
            throw vscode.FileSystemError.FileNotFound(uri);
        }
        return new TextEncoder().encode(content);
    }
    /**
     * @public
     * @param {!tsickle_vscode_1.Uri} uri
     * @return {void}
     */
    writeFile(uri) {
        throw vscode.FileSystemError.NoPermissions(uri);
    }
    /**
     * @public
     * @param {!tsickle_vscode_1.Uri} uri
     * @return {void}
     */
    delete(uri) {
        throw vscode.FileSystemError.NoPermissions(uri);
    }
    /**
     * @public
     * @param {!tsickle_vscode_1.Uri} uri
     * @return {void}
     */
    rename(uri) {
        throw vscode.FileSystemError.NoPermissions(uri);
    }
}
/* istanbul ignore if */
if (false) {
    /**
     * @const {!tsickle_vscode_1.EventEmitter<!Array<!tsickle_vscode_1.FileChangeEvent>>}
     * @private
     */
    VirtualFileFilesystem.prototype.onDidChangeFileEmitter;
    /**
     * @const {!tsickle_vscode_1.Event<!Array<!tsickle_vscode_1.FileChangeEvent>>}
     * @public
     */
    VirtualFileFilesystem.prototype.onDidChangeFile;
    /**
     * @const {!VirtualFilesystemContentProvider}
     * @private
     */
    VirtualFileFilesystem.prototype.provider;
}
/**
 * This registers a full VS Code filesytem, given a TextDocumentContentProvider.
 *
 * It is designed to be a drop-in replacement for
 * vscode.workspace.registerTextDocumentContentProvider.
 *
 * The provider argument has been extended from TextDocumentContentProvider
 * to support providing binary data as well.
 * @param {string} schema
 * @param {!VirtualFilesystemContentProvider} provider
 * @param {{isCaseSensitive: (undefined|boolean), isReadonly: (undefined|!tsickle_vscode_1.MarkdownString)}=} options
 * @return {!tsickle_vscode_1.Disposable}
 */
function registerTextDocumentContentProviderAsFilesystem(schema, provider, options = {}) {
    /** @type {!VirtualFileFilesystem} */
    const fs = new VirtualFileFilesystem(provider);
    return vscode.workspace.registerFileSystemProvider(schema, fs, {
        isCaseSensitive: options.isCaseSensitive,
        isReadonly: options.isReadonly ?? true,
    });
}
exports.registerTextDocumentContentProviderAsFilesystem = registerTextDocumentContentProviderAsFilesystem;
