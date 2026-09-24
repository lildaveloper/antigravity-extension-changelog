/**
 * @fileoverview added by tsickle
 * Generated from: devtools/cider/extensions/jetski/loading/loading_message_impl.ts
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
goog.module('google3.devtools.cider.extensions.jetski.loading.loading_message_impl');
var module = module || { id: 'devtools/cider/extensions/jetski/loading/loading_message_impl.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_check_1 = goog.requireType("google3.javascript.typescript.contrib.check");
const tsickle_vscode_2 = goog.requireType("vscode");
const tsickle_loading_message_3 = goog.requireType("google3.devtools.cider.extensions.jetski.loading.loading_message");
const check_1 = goog.require('google3.javascript.typescript.contrib.check');
const vscode = goog.require('vscode'); // from //devtools/cider/extensions:vscode
/**
 * Notifies the loading indicator with a message.
 * @implements {tsickle_loading_message_3.MessageNotifier}
 */
class MessageNotifierImpl {
    constructor() {
        this.retryEmitter = new vscode.EventEmitter();
        this.onRetry = this.retryEmitter.event;
        this.hostSubmitEmitter = new vscode.EventEmitter();
        this.onHostSubmit = this.hostSubmitEmitter.event;
        this.webviewReady = Promise.withResolvers();
    }
    /**
     * @public
     * @param {(!tsickle_vscode_2.WebviewPanel|!tsickle_vscode_2.WebviewView)} webviewView
     * @return {void}
     */
    resolveWebviewView(webviewView) {
        if (this.disposable) {
            this.disposable.dispose();
        }
        this.view = webviewView;
        this.webviewReady = Promise.withResolvers();
        this.disposable = webviewView.webview.onDidReceiveMessage((/**
         * @param {(!ReadyMessage|!RetryMessage|!SubmitHostMessage)} message
         * @return {!Promise<void>}
         */
        async (message) => {
            switch (message.type) {
                case 'retry':
                    this.retryEmitter.fire();
                    break;
                case 'submitHost':
                    this.hostSubmitEmitter.fire((/** @type {!SubmitHostMessage} */ (message)).host);
                    break;
                case 'ready':
                    this.webviewReady.resolve();
                    break;
                default:
                    (0, check_1.checkExhaustive)(message, `Unknown message type: ${((/** @type {(!ReadyMessage|!RetryMessage|!SubmitHostMessage)} */ (message))).type}`);
            }
        }));
    }
    /**
     * @private
     * @param {(!ErrorMessage|!PlainMessage|!PromptHostMessage)} message
     * @return {!Promise<void>}
     */
    async postMessage(message) {
        await this.webviewReady.promise;
        await this.view?.webview.postMessage(message);
    }
    /**
     * @public
     * @param {(undefined|string)=} message
     * @return {void}
     */
    notifyMessage(message) {
        this.postMessage({ type: 'message', message });
    }
    /**
     * @public
     * @param {string} error
     * @return {void}
     */
    notifyError(error) {
        this.postMessage({ type: 'error', error });
    }
    /**
     * @public
     * @param {string} currentHost
     * @param {(undefined|string)=} message
     * @param {(undefined|!Array<string>)=} hosts
     * @return {!Promise<string>}
     */
    async promptHost(currentHost, message, hosts) {
        await this.postMessage({
            type: 'promptHost',
            currentHost,
            message,
            hosts,
        });
        return new Promise((/**
         * @param {function((string|!PromiseLike<string>)): void} resolve
         * @return {void}
         */
        (resolve) => {
            /** @type {!tsickle_vscode_2.Disposable} */
            const disposable = this.onHostSubmit((/**
             * @param {string} host
             * @return {void}
             */
            (host) => {
                disposable.dispose();
                resolve(host);
            }));
        }));
    }
    /**
     * @public
     * @return {void}
     */
    dispose() {
        this.disposable?.dispose();
        this.disposable = undefined;
        this.view = undefined;
    }
}
exports.MessageNotifierImpl = MessageNotifierImpl;
/* istanbul ignore if */
if (false) {
    /**
     * @type {(undefined|!tsickle_vscode_2.WebviewPanel|!tsickle_vscode_2.WebviewView)}
     * @private
     */
    MessageNotifierImpl.prototype.view;
    /**
     * @const {!tsickle_vscode_2.EventEmitter<void>}
     * @private
     */
    MessageNotifierImpl.prototype.retryEmitter;
    /**
     * @const {!tsickle_vscode_2.Event<void>}
     * @public
     */
    MessageNotifierImpl.prototype.onRetry;
    /**
     * @const {!tsickle_vscode_2.EventEmitter<string>}
     * @private
     */
    MessageNotifierImpl.prototype.hostSubmitEmitter;
    /**
     * @const {!tsickle_vscode_2.Event<string>}
     * @public
     */
    MessageNotifierImpl.prototype.onHostSubmit;
    /**
     * @type {!PromiseWithResolvers<void>}
     * @private
     */
    MessageNotifierImpl.prototype.webviewReady;
    /**
     * @type {(undefined|!tsickle_vscode_2.Disposable)}
     * @private
     */
    MessageNotifierImpl.prototype.disposable;
}
