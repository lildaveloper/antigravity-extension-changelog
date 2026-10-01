/**
 * @fileoverview added by tsickle
 * Generated from: cloud/developer_experience/antigravity_extensions/vscode/cde_auth_service.ts
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
goog.module('google3.cloud.developer_experience.antigravity_extensions.vscode.cde_auth_service');
var module = module || { id: 'cloud/developer_experience/antigravity_extensions/vscode/cde_auth_service.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_fs_1 = goog.requireType("google3.third_party.javascript.typings.node.node.fs");
const tsickle_os_2 = goog.requireType("google3.third_party.javascript.typings.node.node.os");
const tsickle_path_3 = goog.requireType("google3.third_party.javascript.typings.node.node.path");
const tsickle_vscode_4 = goog.requireType("vscode");
const fs = goog.require('google3.third_party.javascript.typings.node.node.fs');
const os = goog.require('google3.third_party.javascript.typings.node.node.os');
const path = goog.require('google3.third_party.javascript.typings.node.node.path');
const vscode = goog.require('vscode'); // from //third_party/javascript/typings/vscode
/**
 * Supported Cloud Developer Environment types.
 * @enum {string}
 */
const DeveloperEnvironmentType = {
    CLOUD_WORKSTATIONS: "CLOUD_WORKSTATIONS",
    CLOUD_SHELL: "CLOUD_SHELL",
    UNKNOWN: "UNKNOWN",
};
exports.DeveloperEnvironmentType = DeveloperEnvironmentType;
/**
 * Access token returned by the companion auth extension's `getOauthAccessToken` API.
 * @record
 */
function AccessToken() { }
exports.AccessToken = AccessToken;
/* istanbul ignore if */
if (false) {
    /**
     * @type {string}
     * @public
     */
    AccessToken.prototype.access_token;
    /**
     * @type {number}
     * @public
     */
    AccessToken.prototype.expires_in;
    /**
     * @type {string}
     * @public
     */
    AccessToken.prototype.token_type;
    /**
     * @type {(undefined|string)}
     * @public
     */
    AccessToken.prototype.email;
}
/**
 * Result returned by the companion auth extension's `getHttpAccessToken` API.
 * @record
 */
function EnvironmentHttpAccessToken() { }
exports.EnvironmentHttpAccessToken = EnvironmentHttpAccessToken;
/* istanbul ignore if */
if (false) {
    /**
     * The raw HTTP access token (JWT) string.
     * @type {string}
     * @public
     */
    EnvironmentHttpAccessToken.prototype.token;
    /**
     * The detected developer environment type (CLOUD_WORKSTATIONS | CLOUD_SHELL).
     * @type {!DeveloperEnvironmentType}
     * @public
     */
    EnvironmentHttpAccessToken.prototype.environmentType;
    /**
     * The query parameter name used to bootstrap gateway authentication cookies:
     * - Cloud Workstations: '_workstationAccessToken'
     * - Cloud Shell: '_cloudshellAccessToken'
     * @type {string}
     * @public
     */
    EnvironmentHttpAccessToken.prototype.urlParameter;
    /**
     * Expiration timestamp in epoch milliseconds.
     * @type {(undefined|number)}
     * @public
     */
    EnvironmentHttpAccessToken.prototype.expiresAtMs;
}
/**
 * Options for querying an HTTP access token.
 * @record
 */
function GetHttpAccessTokenOptions() { }
exports.GetHttpAccessTokenOptions = GetHttpAccessTokenOptions;
/* istanbul ignore if */
if (false) {
    /**
     * Force a fresh token fetch bypassing cache.
     * @type {(undefined|boolean)}
     * @public
     */
    GetHttpAccessTokenOptions.prototype.forceRefresh;
    /**
     * Optional OAuth access token to use directly instead of retrieving
     * one from the local access token service.
     * @type {(undefined|string|!AccessToken)}
     * @public
     */
    GetHttpAccessTokenOptions.prototype.oauthToken;
}
/**
 * Public API exposed by the `google.cloud-developer-environments-auth` companion extension.
 * @record
 */
function DeveloperEnvironmentsAuthApi() { }
exports.DeveloperEnvironmentsAuthApi = DeveloperEnvironmentsAuthApi;
/* istanbul ignore if */
if (false) {
    /**
     * @const {(undefined|!tsickle_vscode_4.Event<(undefined|!EnvironmentHttpAccessToken)>)}
     * @public
     */
    DeveloperEnvironmentsAuthApi.prototype.onDidChangeHttpAccessToken;
    /**
     * @public
     * @param {(undefined|!GetHttpAccessTokenOptions)=} options
     * @return {!Promise<(undefined|!EnvironmentHttpAccessToken)>}
     */
    DeveloperEnvironmentsAuthApi.prototype.getHttpAccessToken = function (options) { };
    /**
     * @public
     * @param {(undefined|boolean)=} forceRefresh
     * @return {!Promise<(undefined|!AccessToken)>}
     */
    DeveloperEnvironmentsAuthApi.prototype.getOauthAccessToken = function (forceRefresh) { };
}
// tslint:enable:enforce-name-casing
/**
 * Service encapsulating detection of Cloud Developer Environments (CDE)
 * (Cloud Workstations and Cloud Shell) and interactions with the companion
 * extension `google.cloud-developer-environments-auth`.
 */
class CdeAuthService {
    /**
     * Returns the singleton instance of CdeAuthService.
     * @public
     * @return {!CdeAuthService}
     */
    static getInstance() {
        if (!CdeAuthService.instance) {
            CdeAuthService.instance = new CdeAuthService();
        }
        return CdeAuthService.instance;
    }
    /**
     * Overrides or resets the singleton instance (primarily for testing).
     * @public
     * @param {(undefined|!CdeAuthService)=} service
     * @return {void}
     */
    static setInstance(service) {
        CdeAuthService.instance = service;
    }
    /**
     * Checks whether running in a Cloud Developer Environment (Cloud Workstations or Cloud Shell).
     *
     * Verifies either the presence of container environment variables
     * (`CLOUD_WORKSTATIONS=true` or `CLOUD_SHELL=true`) or the presence
     * of the bundled companion extension (`google.cloud-developer-environments-auth`).
     * @public
     * @return {boolean}
     */
    isCdeEnvironment() {
        return (process.env['CLOUD_WORKSTATIONS'] === 'true' ||
            process.env['CLOUD_SHELL'] === 'true' ||
            this.isExtensionInstalled());
    }
    /**
     * Checks whether the companion auth extension is installed.
     * @public
     * @return {boolean}
     */
    isExtensionInstalled() {
        return Boolean(vscode.extensions.getExtension(CdeAuthService.EXTENSION_ID));
    }
    /**
     * Fetches an environment HTTP access token from the companion extension.
     *
     * Returns `undefined` if running outside a supported environment or unauthenticated.
     * @public
     * @param {(undefined|!GetHttpAccessTokenOptions)=} options
     * @return {!Promise<(undefined|!EnvironmentHttpAccessToken)>}
     */
    async getHttpAccessToken(options) {
        /** @type {(undefined|!tsickle_vscode_4.Extension<!DeveloperEnvironmentsAuthApi>)} */
        const ext = vscode.extensions.getExtension(CdeAuthService.EXTENSION_ID);
        if (!ext) {
            return undefined;
        }
        /** @type {!DeveloperEnvironmentsAuthApi} */
        const api = ext.isActive ? ext.exports : await ext.activate();
        if (!api) {
            return undefined;
        }
        /** @type {(undefined|string|!AccessToken)} */
        const token = await this.resolveOauthToken(api, options);
        if (!token) {
            return undefined;
        }
        return api.getHttpAccessToken({
            oauthToken: token,
            forceRefresh: options?.forceRefresh ?? false,
        });
    }
    /**
     * @private
     * @param {!DeveloperEnvironmentsAuthApi} api
     * @param {(undefined|!GetHttpAccessTokenOptions)=} options
     * @return {!Promise<(undefined|string|!AccessToken)>}
     */
    async resolveOauthToken(api, options) {
        if (options?.oauthToken) {
            return options.oauthToken;
        }
        /** @type {(undefined|!AccessToken)} */
        let companionToken;
        if (typeof api.getOauthAccessToken === 'function') {
            try {
                companionToken = await api.getOauthAccessToken(options?.forceRefresh);
            }
            catch (e) {
                console.warn('[Jetski] Failed to acquire OAuth access token from companion extension:', e);
            }
        }
        return companionToken ?? (await this.getAgyOauthAccessToken());
    }
    /**
     * @private
     * @return {!Promise<(undefined|string)>}
     */
    async getAgyOauthAccessToken() {
        try {
            /** @type {string} */
            const tokenPath = path.join(os.homedir(), CdeAuthService.STANDALONE_TOKEN_DIR, CdeAuthService.STANDALONE_TOKEN_FILE);
            if (!fs.existsSync(tokenPath)) {
                return undefined;
            }
            /** @type {string} */
            const raw = await fs.promises.readFile(tokenPath, 'utf-8');
            return this.parseStandaloneOauthToken(raw);
        }
        catch {
            return undefined;
        }
    }
    /**
     * @private
     * @param {string} raw
     * @param {number=} nowMs
     * @return {(undefined|string)}
     */
    parseStandaloneOauthToken(raw, nowMs = Date.now()) {
        try {
            /** @type {!StandaloneOauthTokenFile} */
            const parsed = (/** @type {!StandaloneOauthTokenFile} */ (JSON.parse(raw)));
            /** @type {{access_token: (undefined|string), expiry: (undefined|string)}} */
            const tokenObj = parsed?.token ?? parsed;
            /** @type {string} */
            const accessToken = typeof tokenObj?.access_token === 'string'
                ? tokenObj.access_token.trim()
                : '';
            if (!accessToken || this.isTokenExpired(tokenObj?.expiry, nowMs)) {
                return undefined;
            }
            return accessToken;
        }
        catch {
            return undefined;
        }
    }
    /**
     * @private
     * @param {(undefined|string)} expiry
     * @param {number} nowMs
     * @return {boolean}
     */
    isTokenExpired(expiry, nowMs) {
        if (!expiry) {
            return false;
        }
        /** @type {number} */
        const expiryMs = new Date(expiry).getTime();
        return !isNaN(expiryMs) && expiryMs <= nowMs;
    }
}
exports.CdeAuthService = CdeAuthService;
CdeAuthService.EXTENSION_ID = 'google.cloud-developer-environments-auth';
CdeAuthService.STANDALONE_TOKEN_DIR = '.gemini';
CdeAuthService.STANDALONE_TOKEN_FILE = 'jetski-standalone-oauth-token';
/* istanbul ignore if */
if (false) {
    /**
     * @const {string}
     * @public
     */
    CdeAuthService.EXTENSION_ID;
    /**
     * @const {string}
     * @public
     */
    CdeAuthService.STANDALONE_TOKEN_DIR;
    /**
     * @const {string}
     * @public
     */
    CdeAuthService.STANDALONE_TOKEN_FILE;
    /**
     * @type {(undefined|!CdeAuthService)}
     * @private
     */
    CdeAuthService.instance;
}
