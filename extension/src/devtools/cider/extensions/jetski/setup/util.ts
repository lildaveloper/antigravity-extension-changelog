/**
 * @fileoverview added by tsickle
 * Generated from: devtools/cider/extensions/jetski/setup/util.ts
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
goog.module('google3.devtools.cider.extensions.jetski.setup.util');
var module = module || { id: 'devtools/cider/extensions/jetski/setup/util.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_filesystem_1 = goog.requireType("google3.devtools.cider.extensionutils.filesystem");
const tsickle_check_2 = goog.requireType("google3.javascript.typescript.contrib.check");
const tsickle_vscode_3 = goog.requireType("vscode");
const filesystem_1 = goog.require('google3.devtools.cider.extensionutils.filesystem');
const check_1 = goog.require('google3.javascript.typescript.contrib.check');
const vscode = goog.require('vscode'); // from //devtools/cider/extensions:vscode
/**
 * Type of Jetski log files.
 * @typedef {string}
 */
exports.LogType;
/**
 * Information about the Jetski server.
 * @record
 */
function ServerInfo() { }
exports.ServerInfo = ServerInfo;
/* istanbul ignore if */
if (false) {
    /**
     * The effective URL used for connection (can be a proxy URL).
     * @type {string}
     * @public
     */
    ServerInfo.prototype.effectiveUrl;
    /**
     * A human-readable name or host (e.g. cloudtop host).
     * @type {string}
     * @public
     */
    ServerInfo.prototype.humanReadable;
}
/**
 * Returns true if running inside Cider instead of VS Code desktop.
 * @return {boolean}
 */
function isInCider() {
    try {
        /** @type {string} */
        const appName = vscode.env?.appName?.toLowerCase() || '';
        return appName.includes('cider');
    }
    catch (e) {
        return false;
    }
}
exports.isInCider = isInCider;
/**
 * Helper to parse the port number from the server URL.
 * @param {string} urlStr
 * @return {(undefined|{port: (undefined|number), hostname: (undefined|string)})}
 */
function parseUrl(urlStr) {
    try {
        /** @type {string} */
        const safeUrlStr = urlStr.includes('://') ? urlStr : 'https://' + urlStr;
        /** @type {!URL} */
        const url = new URL(safeUrlStr);
        /** @type {{port: (undefined|number), hostname: (undefined|string)}} */
        const result = {
            hostname: url.hostname,
        };
        if (url.port) {
            result.port = Number(url.port);
        }
        return result;
    }
    catch (e) {
        return undefined;
    }
}
exports.parseUrl = parseUrl;
/**
 * Extracts the hostname from the server URL, handling PEN proxy URLs.
 * @param {string} url
 * @return {string}
 */
function extractHost(url) {
    try {
        if (url.includes('uberproxy-pen-redirect')) {
            /** @type {!URLSearchParams} */
            const urlParams = new URL(url).searchParams;
            /** @type {(null|string)} */
            const targetUrl = urlParams.get('url');
            if (targetUrl) {
                return new URL(targetUrl).hostname;
            }
        }
        return new URL(url).hostname;
    }
    catch (e) {
        return 'Unknown';
    }
}
exports.extractHost = extractHost;
/**
 * Scheme for Jetski log files.
 * @type {string}
 */
exports.JETSKI_LOG_URI_SCHEMA = 'jetski-log';
/**
 * URI for the Jetski output channel log file.
 * @type {!tsickle_vscode_3.Uri}
 */
exports.JETSKI_OUTPUT_LOG_FILE = vscode.Uri.parse(`${exports.JETSKI_LOG_URI_SCHEMA}://logs/output.log`);
/**
 * URI for the Jetski main view log file.
 * @type {!tsickle_vscode_3.Uri}
 */
exports.JETSKI_MAIN_VIEW_LOG_FILE = vscode.Uri.parse(`${exports.JETSKI_LOG_URI_SCHEMA}://logs/main_view.log`);
/**
 * URI for the Jetski artifact view log file.
 * @type {!tsickle_vscode_3.Uri}
 */
exports.JETSKI_ARTIFACT_VIEW_LOG_FILE = vscode.Uri.parse(`${exports.JETSKI_LOG_URI_SCHEMA}://logs/artifact_view.log`);
/**
 * @implements {tsickle_filesystem_1.VirtualFilesystemContentProvider}
 */
class LogContentProvider {
    /**
     * @public
     * @param {function(string): string} getLogContent
     */
    constructor(getLogContent) {
        this.getLogContent = getLogContent;
        this.onDidChangeEmitter = new vscode.EventEmitter();
        this.onDidChange = this.onDidChangeEmitter.event;
    }
    /**
     * @public
     * @param {!tsickle_vscode_3.Uri} uri
     * @return {string}
     */
    provideTextDocumentContent(uri) {
        switch (uri.toString()) {
            case exports.JETSKI_OUTPUT_LOG_FILE.toString():
                return this.getLogContent('output');
            case exports.JETSKI_MAIN_VIEW_LOG_FILE.toString():
                return this.getLogContent('main');
            case exports.JETSKI_ARTIFACT_VIEW_LOG_FILE.toString():
                return this.getLogContent('artifact');
            default:
                return '';
        }
    }
    /**
     * @public
     * @param {(undefined|string)=} type
     * @return {void}
     */
    fireChangeEvent(type) {
        switch (type) {
            case 'main':
                this.onDidChangeEmitter.fire(exports.JETSKI_MAIN_VIEW_LOG_FILE);
                break;
            case 'artifact':
                this.onDidChangeEmitter.fire(exports.JETSKI_ARTIFACT_VIEW_LOG_FILE);
                break;
            case 'settings':
            case 'terminal':
                // No virtual file for these logs yet.
                break;
            case 'output':
            case undefined:
                this.onDidChangeEmitter.fire(exports.JETSKI_OUTPUT_LOG_FILE);
                break;
            default:
                (0, check_1.checkExhaustive)(type);
        }
    }
}
/* istanbul ignore if */
if (false) {
    /**
     * @const {!tsickle_vscode_3.EventEmitter<!tsickle_vscode_3.Uri>}
     * @private
     */
    LogContentProvider.prototype.onDidChangeEmitter;
    /**
     * @const {!tsickle_vscode_3.Event<!tsickle_vscode_3.Uri>}
     * @public
     */
    LogContentProvider.prototype.onDidChange;
    /**
     * @const {function(string): string}
     * @private
     */
    LogContentProvider.prototype.getLogContent;
}
/**
 * An output channel that supports logging network requests, it will do special
 * handling for these types of logs.
 * @record
 * @extends {tsickle_vscode_3.OutputChannel}
 */
function OutputChannelWithNetwork() { }
exports.OutputChannelWithNetwork = OutputChannelWithNetwork;
/* istanbul ignore if */
if (false) {
    /**
     * @public
     * @param {string} type
     * @param {string} value
     * @return {void}
     */
    OutputChannelWithNetwork.prototype.appendNetworkLine = function (type, value) { };
    /**
     * @public
     * @param {string} type
     * @param {string} value
     * @return {void}
     */
    OutputChannelWithNetwork.prototype.appendNetwork = function (type, value) { };
}
/**
 * @implements {OutputChannelWithNetwork}
 */
class BufferedOutputChannel {
    /**
     * @public
     * @param {!tsickle_vscode_3.OutputChannel} delegate
     */
    constructor(delegate) {
        this.delegate = delegate;
        this.lines = new Map([
            ['output', ['']],
            ['main', ['']],
            ['artifact', ['']],
            ['settings', ['']],
            ['terminal', ['']],
        ]);
        this.maxLines = 101;
    }
    /**
     * @public
     * @param {function(string): void} onChanged
     * @return {void}
     */
    setOnChanged(onChanged) {
        this.onChanged = onChanged;
    }
    /**
     * @public
     * @return {string}
     */
    get name() {
        return this.delegate.name;
    }
    /**
     * @public
     * @param {string} value
     * @return {void}
     */
    append(value) {
        this.delegate.append(value);
        this.addToBuffer(value, 'output');
    }
    /**
     * @public
     * @param {string} type
     * @param {string} value
     * @return {void}
     */
    appendNetwork(type, value) {
        this.delegate.append(`[${type}] ${value}`);
        this.addToBuffer(value, type);
    }
    /**
     * @public
     * @param {string} value
     * @return {void}
     */
    appendLine(value) {
        this.delegate.appendLine(value);
        this.addToBuffer(value + '\n', 'output');
    }
    /**
     * @public
     * @param {string} type
     * @param {string} value
     * @return {void}
     */
    appendNetworkLine(type, value) {
        this.delegate.appendLine(`[${type}] ${value}`);
        this.addToBuffer(value + '\n', type);
    }
    /**
     * @public
     * @param {string} value
     * @return {void}
     */
    replace(value) {
        this.delegate.replace(value);
        (/** @type {!Array<string>} */ (this.lines.get('output'))).length = 0;
        (/** @type {!Array<string>} */ (this.lines.get('output'))).push('');
        this.addToBuffer(value, 'output');
    }
    /**
     * @public
     * @return {void}
     */
    clear() {
        this.delegate.clear();
        (/** @type {!Array<string>} */ (this.lines.get('output'))).length = 0;
        (/** @type {!Array<string>} */ (this.lines.get('output'))).push('');
        this.triggerChange('output');
    }
    /**
     * @public
     * @param {(undefined|boolean|!tsickle_vscode_3.ViewColumn)=} column
     * @param {(undefined|boolean)=} preserveFocus
     * @return {void}
     */
    show(column, preserveFocus) {
        if (column === undefined) {
            this.delegate.show();
        }
        else if (typeof column === 'boolean') {
            this.delegate.show(column);
        }
        else {
            // @ts-ignore
            this.delegate.show(column, preserveFocus);
        }
    }
    /**
     * @public
     * @return {void}
     */
    hide() {
        this.delegate.hide();
    }
    /**
     * @public
     * @return {void}
     */
    dispose() {
        this.delegate.dispose();
    }
    /**
     * @private
     * @param {string} value
     * @param {string} type
     * @return {void}
     */
    addToBuffer(value, type) {
        /** @type {!Array<string>} */
        const parts = value.split('\n');
        if (!this.lines.has(type)) {
            this.lines.set(type, ['']);
        }
        /** @type {!Array<string>} */
        const lines = (/** @type {!Array<string>} */ (this.lines.get(type)));
        lines[lines.length - 1] += parts[0];
        for (let i = 1; i < parts.length; i++) {
            lines.push(parts[i]);
        }
        while (lines.length > this.maxLines) {
            lines.shift();
        }
        this.triggerChange(type);
    }
    /**
     * @private
     * @param {string} type
     * @return {void}
     */
    triggerChange(type) {
        if (this.onChanged) {
            this.onChanged(type);
        }
    }
    /**
     * @public
     * @param {string} type
     * @return {string}
     */
    getLogs(type) {
        return (this.lines.get(type) || []).join('\n');
    }
}
/* istanbul ignore if */
if (false) {
    /**
     * @const {!Map<string, !Array<string>>}
     * @private
     */
    BufferedOutputChannel.prototype.lines;
    /**
     * @const {number}
     * @private
     */
    BufferedOutputChannel.prototype.maxLines;
    /**
     * @type {(undefined|function(string): void)}
     * @private
     */
    BufferedOutputChannel.prototype.onChanged;
    /**
     * @const {!tsickle_vscode_3.OutputChannel}
     * @private
     */
    BufferedOutputChannel.prototype.delegate;
}
/** @type {(undefined|!BufferedOutputChannel)} */
let outputChannel;
/** @type {(undefined|!LogContentProvider)} */
let logContentProvider;
/**
 * Initializes the log system with the extension context.
 * @param {!tsickle_vscode_3.ExtensionContext} context
 * @param {string=} channelName
 * @return {void}
 */
function initLogSystem(context, channelName = 'Jetski') {
    if (outputChannel) {
        return;
    }
    /** @type {!tsickle_vscode_3.OutputChannel} */
    const rawChannel = vscode.window.createOutputChannel(channelName);
    outputChannel = new BufferedOutputChannel(rawChannel);
    logContentProvider = new LogContentProvider((/**
     * @param {string} type
     * @return {string}
     */
    (type) => (/** @type {!BufferedOutputChannel} */ (outputChannel)).getLogs(type)));
    outputChannel.setOnChanged((/**
     * @param {string} type
     * @return {void}
     */
    (type) => {
        (/** @type {!LogContentProvider} */ (logContentProvider)).fireChangeEvent(type);
    }));
    context.subscriptions.push((0, filesystem_1.registerTextDocumentContentProviderAsFilesystem)(exports.JETSKI_LOG_URI_SCHEMA, logContentProvider, {}));
}
exports.initLogSystem = initLogSystem;
/**
 * Returns the global output channel for Jetski.
 * @return {!OutputChannelWithNetwork}
 */
function getOutputChannel() {
    if (!outputChannel) {
        /** @type {!tsickle_vscode_3.OutputChannel} */
        const rawChannel = vscode.window.createOutputChannel('Jetski');
        outputChannel = new BufferedOutputChannel(rawChannel);
    }
    return outputChannel;
}
exports.getOutputChannel = getOutputChannel;
/**
 * Error type that contains a human-readable display message.
 * @extends {Error}
 */
class DisplayableError extends Error {
    /**
     * @public
     * @param {string} message
     * @param {string} displayError
     */
    constructor(message, displayError) {
        super(message);
        this.displayError = displayError;
        this.name = 'DisplayableError';
    }
}
exports.DisplayableError = DisplayableError;
/* istanbul ignore if */
if (false) {
    /**
     * @const {string}
     * @public
     */
    DisplayableError.prototype.displayError;
}
/**
 * Returns a human-readable error message from the given error.
 * @param {*} e
 * @return {string}
 */
function getHumanReadableError(e) {
    if (e instanceof DisplayableError) {
        return (/** @type {!DisplayableError} */ (e)).displayError;
    }
    /** @type {string} */
    const message = e instanceof Error ? (/** @type {!Error} */ (e)).message : String(e);
    return `An unexpected error occurred:\n${message}`;
}
exports.getHumanReadableError = getHumanReadableError;
/**
 * Builds a query string from the given parameters.
 * @param {?} params
 * @return {string}
 */
function buildExtraParams(params) {
    /** @type {!URLSearchParams} */
    const searchParams = new URLSearchParams();
    for (const [key__tsickle_destructured_1, value__tsickle_destructured_2] of Object.entries(params)) {
        const key = /** @type {string} */ (key__tsickle_destructured_1);
        const value = /** @type {(undefined|string)} */ (value__tsickle_destructured_2);
        if (value) {
            searchParams.set(key, value);
        }
    }
    return searchParams.toString();
}
exports.buildExtraParams = buildExtraParams;
/** @type {{BufferedOutputChannel: function(new:BufferedOutputChannel, !tsickle_vscode_3.OutputChannel)}} */
exports.TEST_ONLY = {
    BufferedOutputChannel,
};
