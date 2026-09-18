/**
 * @fileoverview added by tsickle
 * Generated from: devtools/cider/webclient/workspace/ids.ts
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
goog.module('google3.devtools.cider.webclient.workspace.ids');
var module = module || { id: 'devtools/cider/webclient/workspace/ids.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_ReadonlyWorkspaceId_1 = goog.requireType("devtools.sourcerers.ReadonlyWorkspaceId");
const tsickle_WorkspaceId_2 = goog.requireType("devtools.sourcerers.WorkspaceId");
const tsickle_resources_3 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.resources");
const tsickle_uri_4 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.uri");
const goog_devtools_sourcerers_WorkspaceId_1 = goog.require('devtools.sourcerers.WorkspaceId');
const workspace_id_proto_1 = {};
/** @const */ workspace_id_proto_1.WorkspaceId = goog_devtools_sourcerers_WorkspaceId_1;
const resources_1 = goog.require('google3.third_party.antigravity.src.vs.base.common.resources');
const uri_1 = goog.require('google3.third_party.antigravity.src.vs.base.common.uri');
/**
 * Produces the citc workspace id, like owner/123.
 * @param {(!jspb$devtools$sourcerers$ImmutableWorkspaceId|!tsickle_WorkspaceId_2)} id
 * @return {string}
 */
function workspaceIdToCitcId(id) {
    return `${id.getOwner()}/${id.getCitcId()}`;
}
exports.workspaceIdToCitcId = workspaceIdToCitcId;
/**
 * Produces the piper workspace id, like owner:alias:123:citc.
 * @param {(!jspb$devtools$sourcerers$ImmutableWorkspaceId|!tsickle_WorkspaceId_2)} id
 * @return {string}
 */
function workspaceIdToPiperId(id) {
    return `${id.getOwner()}:${id.getName()}:${id.getCitcId()}:citc`;
}
exports.workspaceIdToPiperId = workspaceIdToPiperId;
/**
 * Produces the VCS-specific workspace id, like owner:alias:123:cog.
 * @param {(!jspb$devtools$sourcerers$ImmutableWorkspaceId|!tsickle_WorkspaceId_2)} id
 * @return {string}
 */
function workspaceIdToVcsId(id) {
    /** @type {(undefined|string)} */
    const suffix = id.getVcs() === workspace_id_proto_1.WorkspaceId.Vcs.UNKNOWN
        ? 'citc'
        : exports.VCS_CONTEXT_NAMES.get(id.getVcs());
    return `${id.getOwner()}:${id.getName()}:${id.getCitcId()}:${suffix}`;
}
exports.workspaceIdToVcsId = workspaceIdToVcsId;
/**
 * Returns the workspace ID in the human-readable form owner/alias.
 * @param {(!jspb$devtools$sourcerers$ImmutableWorkspaceId|!tsickle_WorkspaceId_2)} id
 * @return {string}
 */
function workspaceIdToString(id) {
    /** @type {string} */
    let workspaceFragment = id.getOwner() + '/';
    if (id.getName()) {
        workspaceFragment += id.getName();
    }
    else {
        // If the workspace doesn't have an alias, put the citc id in the fragment.
        // If used in a URL, reloading Cider will keep the same workspace.
        workspaceFragment += String(id.getCitcId());
    }
    return workspaceFragment;
}
exports.workspaceIdToString = workspaceIdToString;
/**
 * Returns the human-readable name of the VCS.
 * @type {!Map<!jspb$e.devtools$sourcerers$WorkspaceId$Vcs, string>}
 */
exports.VCS_CONTEXT_NAMES = new Map([
    [workspace_id_proto_1.WorkspaceId.Vcs.UNKNOWN, 'unknown'],
    [workspace_id_proto_1.WorkspaceId.Vcs.PIPER, 'piper'],
    [workspace_id_proto_1.WorkspaceId.Vcs.FIG, 'fig'],
    [workspace_id_proto_1.WorkspaceId.Vcs.COG, 'cog'],
    [workspace_id_proto_1.WorkspaceId.Vcs.JJ, 'jj'],
    [workspace_id_proto_1.WorkspaceId.Vcs.REMOTE, 'remote'],
]);
/**
 * Key for storing the last used workspace in storage service / user data.
 * @type {string}
 */
exports.LAST_WORKSPACE_STORAGE_KEY = 'cider.lastWorkspace';
/** @type {!tsickle_uri_4.URI} */
const CITC_PREFIX = uri_1.URI.file('/google/src/cloud');
/** @type {!tsickle_uri_4.URI} */
const COG_PREFIX = uri_1.URI.file('/google/cog/cloud');
/**
 * @param {!jspb$e.devtools$sourcerers$WorkspaceId$Vcs} vcs
 * @return {!tsickle_uri_4.URI}
 */
function getPrefix(vcs) {
    if (vcs === workspace_id_proto_1.WorkspaceId.Vcs.COG)
        return COG_PREFIX;
    return CITC_PREFIX;
}
/**
 * Returns where a given workspace should be mounted in the file system.
 * @param {(!jspb$devtools$sourcerers$ImmutableWorkspaceId|!tsickle_WorkspaceId_2)} workspaceId
 * @return {!tsickle_uri_4.URI}
 */
function getWorkspaceRoot(workspaceId) {
    return (0, resources_1.joinPath)(getPrefix(workspaceId.getVcs()), workspaceId.getOwner(), workspaceId.getName());
}
exports.getWorkspaceRoot = getWorkspaceRoot;
/**
 * Returns the query params for a given workspace, persisting debug params if
 * needed.
 * @param {(!jspb$devtools$sourcerers$ImmutableWorkspaceId|!tsickle_WorkspaceId_2)} workspaceId
 * @param {(undefined|string)=} scmExtensionConfig
 * @return {string}
 */
function getWorkspaceQueryParams(workspaceId, scmExtensionConfig) {
    /** @type {!URLSearchParams} */
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('ws', `${workspaceId.getOwner()}/${workspaceId.getName()}`);
    if (workspaceId.getVcs() === workspace_id_proto_1.WorkspaceId.Vcs.COG) {
        searchParams.set('vcs', 'cog');
        if (!!scmExtensionConfig) {
            // Replace an existing value if present. This is ok because
            // scmExtensionConfig is only set when a creation was instructed by the
            // Cider FE server, and externally provided values in an existing
            // ext_google.cog parameter will likely contradict the configuration
            // provided through the user.
            searchParams.set('ext_google.cog', scmExtensionConfig);
        }
    }
    else if (workspaceId.getVcs() === workspace_id_proto_1.WorkspaceId.Vcs.REMOTE) {
        searchParams.set('vcs', 'remote');
    }
    else {
        searchParams.delete('vcs');
        searchParams.delete('ext_google.cog');
    }
    return searchParams.toString();
}
exports.getWorkspaceQueryParams = getWorkspaceQueryParams;
/**
 * Returns the query params for a given workspace, stripping creation params
 * (e.g. createWs, cloneRepo, promptUser).
 * @param {string} search
 * @return {string}
 */
function stripCreationParams(search) {
    /** @type {!URLSearchParams} */
    const params = new URLSearchParams(search);
    // The following params are only used for workspace creation, either for
    // Cog or Piper/Fig.
    params.delete('createWs');
    params.delete('openChangeInRepo');
    params.delete('openChangeTopic');
    params.delete('openChangeContext');
    params.delete('cloneRepo');
    params.delete('syncCl');
    params.delete('syncBranch');
    params.delete('promptUser');
    return params.toString();
}
exports.stripCreationParams = stripCreationParams;
/**
 * Returns where a given workspace should be mounted in the file system when
 * accessed by its citc ID (instead of its alias).
 * @param {(!jspb$devtools$sourcerers$ImmutableWorkspaceId|!tsickle_WorkspaceId_2)} workspaceId
 * @return {!tsickle_uri_4.URI}
 */
function getWorkspaceRootById(workspaceId) {
    return (0, resources_1.joinPath)(getPrefix(workspaceId.getVcs()), workspaceId.getOwner(), workspaceId.getCitcId().toString());
}
exports.getWorkspaceRootById = getWorkspaceRootById;
/**
 * Supported filesystem provider types for Cider workspaces.
 * @typedef {string}
 */
exports.FilesystemProvider;
/**
 * Returns the workspace ID in string format given a workspace URI.
 * @param {!tsickle_uri_4.URI} uri
 * @return {{owner: string, name: string, isCog: boolean, filesystemProvider: string, rootUri: !tsickle_uri_4.URI}}
 */
function parseWorkspaceRoot(uri) {
    /** @type {!tsickle_uri_4.URI} */
    const cleanUri = uri.with({ query: '' });
    if ((0, resources_1.isEqualOrParent)(cleanUri, CITC_PREFIX)) {
        const [owner__tsickle_destructured_1, name__tsickle_destructured_2] = (0, resources_1.relativePath)(CITC_PREFIX, cleanUri)?.split('/') ?? [];
        const owner = /** @type {string} */ (owner__tsickle_destructured_1);
        const name = /** @type {string} */ (name__tsickle_destructured_2);
        if (name) {
            return {
                owner,
                name,
                isCog: false,
                filesystemProvider: 'citc',
                rootUri: (0, resources_1.joinPath)(CITC_PREFIX, owner, name),
            };
        }
    }
    if ((0, resources_1.isEqualOrParent)(cleanUri, COG_PREFIX)) {
        const [owner__tsickle_destructured_3, name__tsickle_destructured_4] = (0, resources_1.relativePath)(COG_PREFIX, cleanUri)?.split('/') ?? [];
        const owner = /** @type {string} */ (owner__tsickle_destructured_3);
        const name = /** @type {string} */ (name__tsickle_destructured_4);
        if (name) {
            return {
                owner,
                name,
                isCog: true,
                filesystemProvider: 'cog',
                rootUri: (0, resources_1.joinPath)(COG_PREFIX, owner, name),
            };
        }
    }
    if (cleanUri.scheme === 'vscode-remote' &&
        cleanUri.authority &&
        cleanUri.path) {
        /** @type {!URLSearchParams} */
        const urlParams = new URLSearchParams(uri.query);
        /** @type {(null|string)} */
        const vcsParam = urlParams.get('vcs');
        const [owner__tsickle_destructured_5 = '', name__tsickle_destructured_6 = ''] = vcsParam && vcsParam !== 'remote'
            ? ['', '']
            : (urlParams.get('ws')?.split('/') ?? ['', '']);
        const owner = /** @type {string} */ (owner__tsickle_destructured_5);
        const name = /** @type {string} */ (name__tsickle_destructured_6);
        return {
            owner,
            name,
            isCog: false,
            filesystemProvider: 'remote',
            rootUri: cleanUri,
        };
    }
    throw new Error(`Not a workspace root URI: ${uri}`);
}
exports.parseWorkspaceRoot = parseWorkspaceRoot;
/**
 * Parses a human-readable workspace identifier (e.g. "owner/name" or "name")
 * into its owner (if present) and workspace name/alias.
 * @param {string} identifier
 * @return {{owner: (undefined|string), name: string}}
 */
function parseWorkspaceIdentifier(identifier) {
    /** @type {!Array<string>} */
    const parts = identifier.split('/', 2);
    if (parts.length === 2 && parts[0] && parts[1]) {
        return { owner: parts[0], name: parts[1] };
    }
    return { name: identifier };
}
exports.parseWorkspaceIdentifier = parseWorkspaceIdentifier;
/**
 * Details of a remote folder location (host and folder path).
 * @record
 */
function RemoteFolderDetails() { }
exports.RemoteFolderDetails = RemoteFolderDetails;
/* istanbul ignore if */
if (false) {
    /**
     * @type {string}
     * @public
     */
    RemoteFolderDetails.prototype.host;
    /**
     * @type {string}
     * @public
     */
    RemoteFolderDetails.prototype.folder;
}
/**
 * Parses the remoteFolder parameter into host and folder.
 * @param {string} remoteFolder
 * @return {!RemoteFolderDetails}
 */
function parseRemoteFolder(remoteFolder) {
    if (remoteFolder.startsWith('/')) {
        return { host: '', folder: remoteFolder };
    }
    /** @type {number} */
    const slashIndex = remoteFolder.indexOf('/');
    if (slashIndex === -1) {
        return { host: remoteFolder, folder: '' };
    }
    return {
        host: remoteFolder.substring(0, slashIndex),
        folder: remoteFolder.substring(slashIndex),
    };
}
exports.parseRemoteFolder = parseRemoteFolder;
/**
 * Appends workspace parameters ('ws', 'vcs', or 'remoteFolder') to the given
 * query parameters.
 * @param {!URLSearchParams} params
 * @param {{owner: (undefined|string), name: (undefined|string), filesystemProvider: string, rootUri: {authority: (undefined|string), path: (undefined|string)}}} workspace
 * @return {void}
 */
function appendWorkspaceParams(params, workspace) {
    params.delete('remoteFolder');
    params.delete('vcs');
    /** @type {?} */
    let ws;
    if (workspace.owner && workspace.name) {
        ws = `${workspace.owner}/${workspace.name}`;
        params.set('ws', ws);
    }
    if (workspace.filesystemProvider === 'cog') {
        params.set('vcs', 'cog');
    }
    else if (workspace.filesystemProvider === 'remote') {
        if (ws) {
            params.set('vcs', 'remote');
        }
        else if (workspace.rootUri.authority && workspace.rootUri.path) {
            params.delete('ws');
            params.set('remoteFolder', `${workspace.rootUri.authority}${workspace.rootUri.path}`);
        }
    }
}
exports.appendWorkspaceParams = appendWorkspaceParams;
