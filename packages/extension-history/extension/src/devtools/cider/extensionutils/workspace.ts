/**
 * @fileoverview added by tsickle
 * Generated from: devtools/cider/extensionutils/workspace.ts
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
goog.module('google3.devtools.cider.extensionutils.workspace');
var module = module || { id: 'devtools/cider/extensionutils/workspace.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_cider_1 = goog.requireType("google3.devtools.cider.extensions.cider");
const tsickle_ids_2 = goog.requireType("google3.devtools.cider.webclient.workspace.ids");
const tsickle_vscode_3 = goog.requireType("vscode");
const tsickle_uri_4 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.uri");
const cider_1 = goog.require('google3.devtools.cider.extensions.cider');
const internal = goog.require('google3.devtools.cider.webclient.workspace.ids');
const vscode = goog.require('vscode'); // from //devtools/cider/extensions:vscode
/**
 * Type of the filesystem provider used by the workspace.
 * @typedef {string}
 */
exports.FilesystemProvider;
/**
 * Information about a parsed CitC, Cog, or Remote workspace root.
 * @record
 */
function WorkspaceRootInfo() { }
exports.WorkspaceRootInfo = WorkspaceRootInfo;
/* istanbul ignore if */
if (false) {
    /**
     * @const {(undefined|string)}
     * @public
     */
    WorkspaceRootInfo.prototype.owner;
    /**
     * @const {(undefined|string)}
     * @public
     */
    WorkspaceRootInfo.prototype.name;
    /**
     * @const {string}
     * @public
     */
    WorkspaceRootInfo.prototype.filesystemProvider;
    /**
     * @const {!tsickle_vscode_3.Uri}
     * @public
     */
    WorkspaceRootInfo.prototype.rootUri;
}
/**
 * Parses a workspace root URI and returns owner, name, filesystemProvider, and rootUri.
 * @param {!tsickle_vscode_3.Uri} uri
 * @return {!WorkspaceRootInfo}
 */
function parseWorkspaceRootUri(uri) {
    const { owner, name, filesystemProvider, rootUri } = internal.parseWorkspaceRoot((/** @type {!tsickle_uri_4.URI} */ (uri)));
    return {
        owner,
        name,
        filesystemProvider,
        rootUri: vscode.Uri.parse(rootUri.toString()),
    };
}
exports.parseWorkspaceRootUri = parseWorkspaceRootUri;
/**
 * Attempts to parse a workspace root URI, returning undefined if it is not
 * a CitC, Cog, or Remote workspace root.
 * @param {!tsickle_vscode_3.Uri} uri
 * @return {(undefined|!WorkspaceRootInfo)}
 */
function tryParseWorkspaceRootUri(uri) {
    try {
        return parseWorkspaceRootUri(uri);
    }
    catch {
        return undefined;
    }
}
exports.tryParseWorkspaceRootUri = tryParseWorkspaceRootUri;
/**
 * Appends workspace parameters ('ws', 'vcs', or 'remoteFolder') to the given
 * query parameters.
 * @param {!URLSearchParams} params
 * @param {!WorkspaceRootInfo} workspace
 * @return {void}
 */
function appendWorkspaceParams(params, workspace) {
    internal.appendWorkspaceParams(params, workspace);
}
exports.appendWorkspaceParams = appendWorkspaceParams;
/**
 * Information about a remote workspace, if active.
 * @record
 */
function RemoteWorkspaceInfo() { }
exports.RemoteWorkspaceInfo = RemoteWorkspaceInfo;
/* istanbul ignore if */
if (false) {
    /**
     * The remote machine hostname (e.g. "my-host.c.googlers.com").
     * @type {string}
     * @public
     */
    RemoteWorkspaceInfo.prototype.host;
    /**
     * The root directory path on the remote host (e.g. "/home/user/project").
     * @type {string}
     * @public
     */
    RemoteWorkspaceInfo.prototype.folder;
}
/**
 * Returns remote workspace info (host and folder) if the active workspace
 * is a remote workspace (i.e. has scheme 'vscode-remote'), or undefined otherwise.
 * @return {(undefined|!RemoteWorkspaceInfo)}
 */
function getRemoteWorkspaceInfo() {
    /** @type {(undefined|!tsickle_vscode_3.WorkspaceFolder)} */
    const remoteFolder = vscode.workspace.workspaceFolders?.find((/**
     * @param {!tsickle_vscode_3.WorkspaceFolder} f
     * @return {boolean}
     */
    (f) => f.uri.scheme === 'vscode-remote'));
    if (remoteFolder) {
        return {
            host: remoteFolder.uri.authority,
            folder: cleanPath(remoteFolder.uri.path),
        };
    }
    return undefined;
}
exports.getRemoteWorkspaceInfo = getRemoteWorkspaceInfo;
/**
 * Returns true if the active workspace is a remote workspace.
 * @return {boolean}
 */
function isRemoteWorkspace() {
    return getRemoteWorkspaceInfo() !== undefined;
}
exports.isRemoteWorkspace = isRemoteWorkspace;
/**
 * Returns true if the path is a CitC or Cog workspace path.
 * @param {string} path
 * @return {boolean}
 */
function isCitcOrCogPath(path) {
    return (path.startsWith('/google/src/cloud') || path.startsWith('/google/cog/cloud'));
}
exports.isCitcOrCogPath = isCitcOrCogPath;
/**
 * Returns the path with trailing slashes removed.
 * @param {string} path
 * @return {string}
 */
function cleanPath(path) {
    return path === '/' ? path : path.replace(/\/+$/, '');
}
exports.cleanPath = cleanPath;
/**
 * Converts a URI or URI string from the local/remote machine perspective (`file:///path`)
 * to Cider's remote perspective (`vscode-remote://${host}${path}`) if in a remote workspace.
 * If not in a remote workspace or if the URI refers to CitC/Cog, returns the URI unchanged.
 * @param {(string|!tsickle_vscode_3.Uri)} uri
 * @return {!tsickle_vscode_3.Uri}
 */
function toCiderWebclientUri(uri) {
    /** @type {!tsickle_vscode_3.Uri} */
    const parsed = typeof uri === 'string'
        ? (/** @type {string} */ (uri)).startsWith('/')
            ? vscode.Uri.file(uri)
            : vscode.Uri.parse(uri)
        : typeof (/** @type {!tsickle_vscode_3.Uri} */ (uri)).with === 'function'
            ? uri
            : vscode.Uri.parse((/** @type {!tsickle_vscode_3.Uri} */ (uri)).toString());
    if (isCitcOrCogPath(parsed.path)) {
        return parsed;
    }
    /** @type {(undefined|!RemoteWorkspaceInfo)} */
    const remoteInfo = getRemoteWorkspaceInfo();
    if (remoteInfo && parsed.scheme === 'file') {
        return parsed.with({
            scheme: 'vscode-remote',
            authority: remoteInfo.host,
        });
    }
    return parsed;
}
exports.toCiderWebclientUri = toCiderWebclientUri;
/**
 * Converts a URI or URI string from Cider's remote perspective (`vscode-remote://${host}${path}`)
 * to Jetski's file perspective (`file:///path`).
 * If the URI is not a `vscode-remote` URI, returns the URI unchanged.
 * @param {(string|!tsickle_vscode_3.Uri)} uri
 * @return {!tsickle_vscode_3.Uri}
 */
function toJetskiFileUri(uri) {
    /** @type {!tsickle_vscode_3.Uri} */
    const parsed = typeof uri === 'string'
        ? (/** @type {string} */ (uri)).startsWith('/')
            ? vscode.Uri.file(uri)
            : vscode.Uri.parse(uri)
        : typeof (/** @type {!tsickle_vscode_3.Uri} */ (uri)).with === 'function'
            ? uri
            : vscode.Uri.parse((/** @type {!tsickle_vscode_3.Uri} */ (uri)).toString());
    if (parsed.scheme === 'vscode-remote') {
        return parsed.with({
            scheme: 'file',
            authority: '',
        });
    }
    return parsed;
}
exports.toJetskiFileUri = toJetskiFileUri;
/**
 * Resolves a workspace path (relative or absolute) to a resource URI.
 * In a remote workspace, resolves relative to the remote workspace root and converts to Cider's remote URI.
 * In a CitC or Cog workspace, delegates to cider.citc.getResourceFromWorkspacePath.
 * @param {string} workspacePath
 * @return {!tsickle_vscode_3.Uri}
 */
// TODO(b/552486224): Replace this with cider.citc.getResourceFromWorkspacePath once that can handle remote workspaces (cl/973772437 is deployed).
function getResourceFromWorkspacePath(workspacePath) {
    /** @type {(undefined|!RemoteWorkspaceInfo)} */
    const remoteInfo = getRemoteWorkspaceInfo();
    if (remoteInfo) {
        /** @type {string} */
        const fullPath = workspacePath.startsWith('/')
            ? workspacePath
            : `${remoteInfo.folder}/${workspacePath}`;
        return toCiderWebclientUri(fullPath);
    }
    return cider_1.cider.citc.getResourceFromWorkspacePath(workspacePath);
}
exports.getResourceFromWorkspacePath = getResourceFromWorkspacePath;
