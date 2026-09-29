/**
 * @fileoverview added by tsickle
 * Generated from: devtools/cider/extensions/jetski/setup/cider_host_management.ts
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
goog.module('google3.devtools.cider.extensions.jetski.setup.cider_host_management');
var module = module || { id: 'devtools/cider/extensions/jetski/setup/cider_host_management.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_cider_1 = goog.requireType("google3.devtools.cider.extensions.cider");
const tsickle_workspace_2 = goog.requireType("google3.devtools.cider.extensionutils.workspace");
const tsickle_ListDeploymentsRequest_3 = goog.requireType("proto.devtools_jetski_provisioning.ListDeploymentsRequest");
const tsickle_ListDeploymentsResponse_4 = goog.requireType("proto.devtools_jetski_provisioning.ListDeploymentsResponse");
const tsickle_vscode_5 = goog.requireType("vscode");
const tsickle_util_6 = goog.requireType("google3.devtools.cider.extensions.jetski.setup.util");
const cider_1 = goog.require('google3.devtools.cider.extensions.cider');
const workspace_1 = goog.require('google3.devtools.cider.extensionutils.workspace');
const goog_proto_devtools_jetski_provisioning_ListDeploymentsRequest_1 = goog.require('proto.devtools_jetski_provisioning.ListDeploymentsRequest');
const goog_proto_devtools_jetski_provisioning_ListDeploymentsResponse_1 = goog.require('proto.devtools_jetski_provisioning.ListDeploymentsResponse');
const provisioning_proto_1 = {};
/** @const */ provisioning_proto_1.ListDeploymentsRequest = goog_proto_devtools_jetski_provisioning_ListDeploymentsRequest_1;
/** @const */ provisioning_proto_1.ListDeploymentsResponse = goog_proto_devtools_jetski_provisioning_ListDeploymentsResponse_1;
const vscode = goog.require('vscode'); // from //devtools/cider/extensions:vscode
// from //devtools/cider/extensions:vscode
const util_1 = goog.require('google3.devtools.cider.extensions.jetski.setup.util');
/**
 * Parses a host string that may contain a username prefix (e.g.
 * "user\@host.c.googlers.com") into its components.
 * @param {string} hostWithUser
 * @return {{username: (undefined|string), hostname: string}}
 */
function parseHost(hostWithUser) {
    /** @type {number} */
    const atIndex = hostWithUser.indexOf('@');
    if (atIndex === -1) {
        return { username: undefined, hostname: hostWithUser };
    }
    return {
        username: hostWithUser.substring(0, atIndex),
        hostname: hostWithUser.substring(atIndex + 1),
    };
}
exports.parseHost = parseHost;
/**
 * Validates that a hostname containing dots ends with a known domain suffix.
 * Returns an error message if the hostname appears incomplete, or undefined if
 * valid.
 * @param {string} hostname
 * @return {(undefined|string)}
 */
function validateHostname(hostname) {
    if (hostname.includes('.') &&
        !hostname.endsWith('.corp.google.com') &&
        !hostname.endsWith('.c.googlers.com')) {
        return (`Hostname "${hostname}" appears incomplete. ` +
            'It should end with ".corp.google.com" or ".c.googlers.com" ' +
            `(e.g., "${hostname}.corp.google.com" or "${hostname}.c.googlers.com").`);
    }
    return undefined;
}
exports.validateHostname = validateHostname;
/**
 * Expands short hostnames, handling the optional "user\@" prefix:
 * - "johnd" → "johnd.c.googlers.com"
 * - "johnd.mtv" → "johnd.mtv.corp.google.com" (3-letter office code)
 * Returns the input unchanged if no expansion applies.
 * @param {string} hostWithUser
 * @return {string}
 */
function expandHostname(hostWithUser) {
    const { username, hostname } = parseHost(hostWithUser);
    /** @type {(undefined|string)} */
    let expanded;
    if (hostname && !hostname.includes('.') && hostname !== 'localhost') {
        // Short hostname without dots (e.g. "johnd").
        expanded = `${hostname}.c.googlers.com`;
    }
    else if (/^[^.]+\.[a-zA-Z]{3}$/.test(hostname)) {
        // Hostname with a 3-letter office code (e.g. "johnd.mtv").
        expanded = `${hostname}.corp.google.com`;
    }
    if (expanded) {
        return username ? `${username}@${expanded}` : expanded;
    }
    return hostWithUser;
}
exports.expandHostname = expandHostname;
/**
 * Validator function for vscode.showInputBox.
 * @param {string} value
 * @return {(undefined|string)}
 */
function validateHostInput(value) {
    /** @type {string} */
    const trimmed = value.trim();
    if (!trimmed) {
        return 'Hostname cannot be empty';
    }
    /** @type {string} */
    const expanded = expandHostname(trimmed);
    const { hostname } = parseHost(expanded);
    return validateHostname(hostname);
}
exports.validateHostInput = validateHostInput;
/**
 * Updates the description of the webview view with the current host.
 * @param {(undefined|!tsickle_vscode_5.WebviewPanel|!tsickle_vscode_5.WebviewView)} view
 * @param {!Promise<!tsickle_util_6.ServerInfo>} serverInfo
 * @return {!Promise<void>}
 */
async function updateTitle(view, serverInfo) {
    if (!view) {
        return;
    }
    try {
        /** @type {!tsickle_util_6.ServerInfo} */
        const info = await serverInfo;
        /** @type {string} */
        const host = info.humanReadable;
        // Distinguish between WebviewView (sidebar) and WebviewPanel (editor tab).
        // WebviewView has 'onDidChangeVisibility' and 'description' property.
        // WebviewPanel only has 'title' (no 'description').
        if ('onDidChangeVisibility' in view) {
            // WebviewView (sidebar)
            if ((0, util_1.isInCider)()) {
                // Cider V might not support 'description' in the sidebar, and shows "ContainerName: ViewTitle".
                // Setting view.title to host results in "Jetski: <host>" which is cleaner than "Jetski: Jetski (<host>)".
                (/** @type {!tsickle_vscode_5.WebviewView} */ (view)).title = host;
                (/** @type {!tsickle_vscode_5.WebviewView} */ (view)).description = undefined;
            }
            else {
                // VS Code Desktop supports 'description' for WebviewView, allowing a cleaner title.
                (/** @type {!tsickle_vscode_5.WebviewView} */ (view)).title = 'Jetski';
                (/** @type {!tsickle_vscode_5.WebviewView} */ (view)).description = host;
            }
        }
        else {
            // WebviewPanel (editor tab)
            (/** @type {!tsickle_vscode_5.WebviewPanel} */ (view)).title = `Jetski (${host})`;
        }
    }
    catch (e) {
        view.title = 'Jetski (Error)';
        if ('onDidChangeVisibility' in view) {
            (/** @type {!tsickle_vscode_5.WebviewView} */ (view)).description = undefined;
        }
    }
}
exports.updateTitle = updateTitle;
/**
 * Returns the list of configured hosts from the connector configuration.
 * @return {!Array<string>}
 */
function getConnectorHosts() {
    /** @type {!tsickle_vscode_5.WorkspaceConfiguration} */
    const connectorConfig = vscode.workspace.getConfiguration('connector');
    return connectorConfig.get('hosts') || [];
}
exports.getConnectorHosts = getConnectorHosts;
/**
 * @param {!tsickle_vscode_5.WorkspaceConfiguration} config
 * @param {!tsickle_vscode_5.ConfigurationTarget} target
 * @return {void}
 */
function clearSettings(config, target) {
    config.update('serverUrl', undefined, target);
    config.update('host', undefined, target);
    config.update('cloudtopHost', undefined, target);
}
/**
 * Executes the server configuration flow.
 * @param {!tsickle_vscode_5.ExtensionContext} context
 * @return {!Promise<void>}
 */
async function configureServer(context) {
    /** @type {(undefined|!tsickle_workspace_2.RemoteWorkspaceInfo)} */
    const remoteInfo = (0, workspace_1.getRemoteWorkspaceInfo)();
    if (remoteInfo) {
        void vscode.window.showInformationMessage(`Jetski server is automatically managed for remote host "${remoteInfo.host}".`);
        return;
    }
    /** @type {!tsickle_vscode_5.WorkspaceConfiguration} */
    const config = vscode.workspace.getConfiguration('jetski-web');
    /** @type {boolean} */
    let workspaceActive = isWorkspaceScopeActive();
    /** @type {(undefined|{label: string, description: string, action: string})} */
    let selected;
    while (true) {
        /** @type {!Array<{label: string, description: string, action: string}>} */
        const options = [
            {
                label: '$(device-desktop) Set Host',
                description: 'Configure your host (e.g. johnd.c.googlers.com)',
                action: 'host',
            },
            {
                label: workspaceActive
                    ? '$(globe) Use Global Configuration'
                    : '$(file-submodule) Use Workspace Configuration',
                description: workspaceActive
                    ? 'Switch to global configuration'
                    : 'Switch to workspace configuration',
                action: 'scope',
            },
            {
                label: '$(clear-all) Reset Settings',
                description: 'Clear configured host and URL to trigger auto-detection',
                action: 'reset',
            },
        ];
        selected = await vscode.window.showQuickPick(options, {
            placeHolder: 'Configure Jetski Server Connection',
        });
        if (!selected) {
            return;
        }
        if (selected.action === 'scope') {
            if (workspaceActive) {
                clearSettings(config, vscode.ConfigurationTarget.Workspace);
            }
            workspaceActive = !workspaceActive;
        }
        else {
            break;
        }
    }
    /** @type {!tsickle_vscode_5.ConfigurationTarget} */
    const target = workspaceActive
        ? vscode.ConfigurationTarget.Workspace
        : vscode.ConfigurationTarget.Global;
    if (selected.action === 'host') {
        /** @type {string} */
        const currentHost = config.get('host') || config.get('cloudtopHost') || '';
        /** @type {!Array<string>} */
        const connectorHosts = getConnectorHosts();
        /** @type {(undefined|string)} */
        let newHost;
        if (connectorHosts.length > 0) {
            /** @type {function(): !Promise<!Array<{label: string, description: string}>>} */
            const fetchHostOptions = (/**
             * @return {!Promise<!Array<{label: string, description: string}>>}
             */
            async () => {
                /** @type {!Array<string>} */
                const activeDeployments = await getActiveDeployments();
                /** @type {!Array<string>} */
                const allHosts = Array.from(new Set([...connectorHosts, ...activeDeployments]));
                /** @type {!Array<{label: string, description: string}>} */
                const hostOptions = allHosts.map((/**
                 * @param {string} host
                 * @return {{label: string, description: string}}
                 */
                (host) => ({
                    label: host,
                    description: host === currentHost ? 'Current' : '',
                })));
                hostOptions.push({
                    label: '$(edit) Enter manually...',
                    description: '',
                });
                return hostOptions;
            });
            /** @type {(undefined|{label: string, description: string})} */
            const selectedHostOption = await vscode.window.showQuickPick(fetchHostOptions(), {
                placeHolder: 'Select a host or enter manually',
            });
            if (!selectedHostOption) {
                return;
            }
            if (selectedHostOption.label === '$(edit) Enter manually...') {
                newHost = await promptForHost(currentHost);
            }
            else {
                newHost = selectedHostOption.label;
            }
        }
        else {
            // Fallback to manual input if no connector hosts
            newHost = await promptForHost(currentHost);
        }
        while (newHost !== undefined) {
            newHost = expandHostname(newHost.trim());
            // Validate hostname ends with a known domain suffix.
            /** @type {(undefined|string)} */
            const validationError = validateHostname(parseHost(newHost).hostname);
            if (!validationError) {
                break;
            }
            // Re-prompt with the validation error.
            newHost = await promptForHost(newHost, validationError);
        }
        if (newHost !== undefined) {
            try {
                await config.update('host', newHost, target);
                await config.update('serverUrl', undefined, target);
            }
            catch (e) {
                throw new util_1.DisplayableError(`Failed to save host setting: ${e}`, `Failed to save settings. Your settings.json may contain syntax ` +
                    `errors (e.g., trailing commas or invalid JSON). Please open ` +
                    `your settings.json and fix any errors, then try again.` +
                    `\n\nDetails: ${e}`);
            }
        }
    }
    else if (selected.action === 'reset') {
        clearSettings(config, target);
        void vscode.window.showInformationMessage('Jetski settings reset. Reloading...');
    }
}
exports.configureServer = configureServer;
/**
 * @param {string} currentHost
 * @param {(undefined|string)=} message
 * @return {!Promise<(undefined|string)>}
 */
async function promptForHost(currentHost, message) {
    return await vscode.window.showInputBox({
        prompt: message ||
            'Enter your host (e.g. Cloudtop). Optionally prefix with user@',
        value: currentHost,
        placeHolder: 'e.g., johnd.c.googlers.com or user@johnd.c.googlers.com',
        validateInput: validateHostInput,
    });
}
/**
 * Returns true if any Jetski settings are defined in the workspace scope.
 * @return {boolean}
 */
function isWorkspaceScopeActive() {
    /** @type {!tsickle_vscode_5.WorkspaceConfiguration} */
    const config = vscode.workspace.getConfiguration('jetski-web');
    /** @type {(undefined|{key: string, defaultValue: (undefined|string), globalValue: (undefined|string), workspaceValue: (undefined|string), workspaceFolderValue: (undefined|string), defaultLanguageValue: (undefined|string), globalLanguageValue: (undefined|string), workspaceLanguageValue: (undefined|string), workspaceFolderLanguageValue: (undefined|string), languageIds: (undefined|!Array<string>)})} */
    const inspectHost = config.inspect('host');
    /** @type {(undefined|{key: string, defaultValue: (undefined|string), globalValue: (undefined|string), workspaceValue: (undefined|string), workspaceFolderValue: (undefined|string), defaultLanguageValue: (undefined|string), globalLanguageValue: (undefined|string), workspaceLanguageValue: (undefined|string), workspaceFolderLanguageValue: (undefined|string), languageIds: (undefined|!Array<string>)})} */
    const inspectUrl = config.inspect('serverUrl');
    /** @type {(undefined|{key: string, defaultValue: (undefined|string), globalValue: (undefined|string), workspaceValue: (undefined|string), workspaceFolderValue: (undefined|string), defaultLanguageValue: (undefined|string), globalLanguageValue: (undefined|string), workspaceLanguageValue: (undefined|string), workspaceFolderLanguageValue: (undefined|string), languageIds: (undefined|!Array<string>)})} */
    const inspectCloudtop = config.inspect('cloudtopHost');
    return (inspectHost?.workspaceValue !== undefined ||
        inspectUrl?.workspaceValue !== undefined ||
        inspectCloudtop?.workspaceValue !== undefined);
}
exports.isWorkspaceScopeActive = isWorkspaceScopeActive;
/**
 * Returns the configuration target based on whether workspace scope is active.
 * @return {!tsickle_vscode_5.ConfigurationTarget}
 */
function getConfigurationTarget() {
    return isWorkspaceScopeActive()
        ? vscode.ConfigurationTarget.Workspace
        : vscode.ConfigurationTarget.Global;
}
exports.getConfigurationTarget = getConfigurationTarget;
/**
 * Resolves the hostname (without username) from the configuration.
 * Defaults to 'localhost' if no configuration is found.
 *
 * Note: webview_renderer.ts has similar config reads (host/cloudtopHost) to
 * extract username + backendHost for iframe URL params. That code operates on
 * an already-resolved serverUrl parameter and also needs the username, so it
 * cannot directly reuse this function.
 * @return {string}
 */
function getHostname() {
    /** @type {(undefined|!tsickle_workspace_2.RemoteWorkspaceInfo)} */
    const remoteInfo = (0, workspace_1.getRemoteWorkspaceInfo)();
    if (remoteInfo) {
        return parseHost(remoteInfo.host).hostname;
    }
    /** @type {!tsickle_vscode_5.WorkspaceConfiguration} */
    const config = vscode.workspace.getConfiguration('jetski-web');
    /** @type {(undefined|string)} */
    const serverUrl = config.get('serverUrl');
    if (serverUrl) {
        /** @type {string} */
        const host = (0, util_1.extractHost)(serverUrl);
        if (host !== 'localhost' && host !== '127.0.0.1' && host !== 'Unknown') {
            return host;
        }
    }
    /** @type {(undefined|string)} */
    const hostConfig = config.get('host') || config.get('cloudtopHost');
    if (hostConfig)
        return parseHost(hostConfig).hostname;
    return 'localhost';
}
exports.getHostname = getHostname;
/**
 * @record
 * @template T
 */
function CacheEntry() { }
/* istanbul ignore if */
if (false) {
    /**
     * @type {T}
     * @public
     */
    CacheEntry.prototype.val;
    /**
     * @type {number}
     * @public
     */
    CacheEntry.prototype.freshUntil;
    /**
     * @type {number}
     * @public
     */
    CacheEntry.prototype.evictAfter;
}
/** @type {(null|!CacheEntry<!Array<string>>)} */
let activeDeploymentsCache = null;
/** @type {number} */
const CACHE_TTL_MS = 15 * 60 * 1000;
// 15 minutes
/** @type {number} */
const EVICTION_TTL_MS = 24 * 60 * 60 * 1000;
// 24 hours
/**
 * For testing.
 * @return {void}
 */
function resetActiveDeploymentsCache() {
    activeDeploymentsCache = null;
}
exports.resetActiveDeploymentsCache = resetActiveDeploymentsCache;
/**
 * Returns the list of active deployments for the current user, using the
 * JetskiProvisioningService.ListDeployments RPC.
 *
 * The results are cached for 15 minutes.
 *
 * Visible for testing.
 * @return {!Promise<!Array<string>>}
 */
async function getActiveDeployments() {
    if (!(0, util_1.isInCider)()) {
        return [];
    }
    /** @type {number} */
    const now = Date.now();
    if (activeDeploymentsCache && now < activeDeploymentsCache.freshUntil) {
        return activeDeploymentsCache.val;
    }
    try {
        /** @type {!tsickle_ListDeploymentsRequest_3} */
        const req = new provisioning_proto_1.ListDeploymentsRequest().setTagsList(['JetskiWeb']);
        /** @type {!tsickle_ListDeploymentsResponse_4} */
        const resp = await cider_1.cider.fe.call('jetski/listDeployments', provisioning_proto_1.ListDeploymentsResponse, req);
        /** @type {string} */
        const currentUser = cider_1.cider.auth.username;
        /** @type {!Array<string>} */
        const deployments = resp
            .getDeploymentsList()
            .map((/**
         * @param {!jspb$devtools_jetski_provisioning$MutableDeployment} d
         * @return {(undefined|string)}
         */
        (d) => {
            /** @type {string} */
            const identity = d.getIdentity();
            /** @type {string} */
            const fqdn = d.getInstanceFqdn();
            if (!fqdn) {
                return undefined;
            }
            if (!identity || identity === currentUser) {
                return fqdn;
            }
            return `${identity}@${fqdn}`;
        }))
            .filter((/**
         * @param {(undefined|string)} host
         * @return {boolean}
         */
        (host) => !!host));
        activeDeploymentsCache = {
            val: deployments,
            freshUntil: now + CACHE_TTL_MS,
            evictAfter: now + EVICTION_TTL_MS,
        };
        return deployments;
    }
    catch (e) {
        console.error('Failed to get active deployments:', e);
        if (activeDeploymentsCache && now < activeDeploymentsCache.evictAfter) {
            console.warn('Serving stale active deployments from cache');
            return activeDeploymentsCache.val;
        }
        return [];
    }
}
exports.getActiveDeployments = getActiveDeployments;
