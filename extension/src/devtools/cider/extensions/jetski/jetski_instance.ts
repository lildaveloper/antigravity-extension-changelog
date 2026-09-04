/**
 * @fileoverview added by tsickle
 * Generated from: devtools/cider/extensions/jetski/jetski_instance.ts
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
goog.module('google3.devtools.cider.extensions.jetski.jetski_instance');
var module = module || { id: 'devtools/cider/extensions/jetski/jetski_instance.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_vscode_1 = goog.requireType("vscode");
const tsickle_constants_2 = goog.requireType("google3.devtools.cider.extensions.jetski.constants");
const tsickle_iframe_messages_pb_3 = goog.requireType("google3.third_party.gemini_coder.proto.iframe_messages_pb");
const tsickle_extensionApi_4 = goog.requireType("google3.third_party.gemini_coder.agent_ui_toolkit.src.features.iframe.extensionApi");
const tsickle_event_5 = goog.requireType("google3.devtools.cider.extensionutils.vscode.event");
const tsickle_bigint_serialization_6 = goog.requireType("google3.devtools.cider.extensions.jetski.bigint_serialization");
const tsickle_util_7 = goog.requireType("google3.devtools.cider.extensions.jetski.setup.util");
const vscode = goog.require('vscode'); // from //devtools/cider/extensions:vscode
const extensionApi_1 = goog.require('google3.third_party.gemini_coder.agent_ui_toolkit.src.features.iframe.extensionApi');
const event_1 = goog.require('google3.devtools.cider.extensionutils.vscode.event');
const bigint_serialization_1 = goog.require('google3.devtools.cider.extensions.jetski.bigint_serialization');
const util_1 = goog.require('google3.devtools.cider.extensions.jetski.setup.util');
/**
 * Configuration for initializing a JetskiInstance.
 * @record
 */
function JetskiInstanceConfig() { }
exports.JetskiInstanceConfig = JetskiInstanceConfig;
/* istanbul ignore if */
if (false) {
    /**
     * @type {?}
     * @public
     */
    JetskiInstanceConfig.prototype.extensionApi;
    /**
     * @type {string}
     * @public
     */
    JetskiInstanceConfig.prototype.type;
    /**
     * @type {(!tsickle_vscode_1.WebviewView|!tsickle_vscode_1.WebviewPanel)}
     * @public
     */
    JetskiInstanceConfig.prototype.view;
    /**
     * @type {string}
     * @public
     */
    JetskiInstanceConfig.prototype.prefix;
}
/**
 * Delegate for handling messages from the Jetski iframe.
 * @extends {tsickle_vscode_1.Disposable}
 */
class JetskiInstance {
    /**
     * @public
     * @param {!JetskiInstanceConfig} config
     */
    constructor(config) {
        // Private fields
        this.disposables = [];
        this.view = config.view;
        this.type = config.type;
        this.title = this.view.title;
        this.api = (0, extensionApi_1.getAntigravityApiV2)((/**
         * @param {*} message
         * @return {!Thenable<boolean>}
         */
        (message) => {
            this.logMessage(message);
            return this.view.webview.postMessage((0, bigint_serialization_1.serializeBigInts)(message));
        }), (/**
         * @param {function(*): *} listener
         * @return {!tsickle_vscode_1.Disposable}
         */
        (listener) => {
            /** @type {!tsickle_vscode_1.Disposable} */
            const disposable = this.view.webview.onDidReceiveMessage((/**
             * @param {?} message
             * @return {void}
             */
            (message) => {
                listener((0, bigint_serialization_1.deserializeBigInts)(message));
            }));
            this.disposables.push(disposable);
            return disposable;
        }), (/**
         * @return {?}
         */
        () => config.extensionApi));
        this.ready = (0, event_1.toPromise)(this.api.onAntigravityReady, this.disposables);
        this.api.onMouseEvent((/**
         * @param {?} __0
         * @return {*}
         */
        ({ type, data }) => {
            // Only handle mousedown to trigger navigation once (not on both
            // mousedown and mouseup). Mouseup is still intercepted to prevent
            // the browser default behavior.
            if (!data || type !== 'mousedown') {
                return {};
            }
            // The iframe uses memory history (see cl/951477478), so the
            // browser's default back/forward behavior for mouse buttons 3/4
            // is a no-op (there is no browser history stack to navigate).
            // Intercept these events and ask the extension host to execute
            // VS Code's editor navigation commands directly.
            if (data.button === 3) {
                vscode.commands.executeCommand('workbench.action.navigateBack');
            }
            else if (data.button === 4) {
                vscode.commands.executeCommand('workbench.action.navigateForward');
            }
            return {};
        }));
    }
    /**
     * @private
     * @param {*} message
     * @param {boolean=} received
     * @return {void}
     */
    logMessage(message, received = false) {
        /** @type {string} */
        const prefix = received ? '<= ' : '=> ';
        try {
            (0, util_1.getOutputChannel)().appendNetworkLine(this.type, prefix + JSON.stringify(message));
        }
        catch (e) {
            (0, util_1.getOutputChannel)().appendNetworkLine(this.type, prefix + '<unserializable message, see console>');
            console.log(prefix, message);
        }
    }
    /**
     * @public
     * @return {void}
     */
    focus() {
        if ('reveal' in this.view) {
            // WebviewPanel
            (/** @type {!tsickle_vscode_1.WebviewPanel} */ (this.view)).reveal();
        }
        else {
            // WebviewView
            (/** @type {!tsickle_vscode_1.WebviewView} */ (this.view)).show();
        }
    }
    /**
     * @public
     * @return {boolean}
     */
    get visible() {
        return this.view.visible;
    }
    /**
     * @public
     * @return {?}
     */
    get webview() {
        return this.view.webview;
    }
    /**
     * @public
     * @return {void}
     */
    dispose() {
        for (const disposable of this.disposables) {
            disposable.dispose();
        }
    }
    /**
     * Exposes a way for external managers to register disposables that should be
     * disposed when this instance is disposed. This is similar to
     * `context.subscriptions.push` which is commonly used with extension
     * activation.
     * @public
     * @return {?}
     */
    get subscriptions() {
        return this.disposables;
    }
}
exports.JetskiInstance = JetskiInstance;
/* istanbul ignore if */
if (false) {
    /**
     * @const {?}
     * @public
     */
    JetskiInstance.prototype.api;
    /**
     * @const {(undefined|string)}
     * @public
     */
    JetskiInstance.prototype.title;
    /**
     * @const {string}
     * @public
     */
    JetskiInstance.prototype.type;
    /**
     * @const {!Promise<*>}
     * @public
     */
    JetskiInstance.prototype.ready;
    /**
     * @const {!Array<!tsickle_vscode_1.Disposable>}
     * @private
     */
    JetskiInstance.prototype.disposables;
    /**
     * @const {(!tsickle_vscode_1.WebviewView|!tsickle_vscode_1.WebviewPanel)}
     * @private
     */
    JetskiInstance.prototype.view;
}
