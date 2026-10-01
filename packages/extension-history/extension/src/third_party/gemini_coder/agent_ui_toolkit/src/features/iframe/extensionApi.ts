/**
 * @fileoverview added by tsickle
 * Generated from: third_party/gemini_coder/agent_ui_toolkit/src/features/iframe/extensionApi.ts
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
goog.module('google3.third_party.gemini_coder.agent_ui_toolkit.src.features.iframe.extensionApi');
var module = module || { id: 'third_party/gemini_coder/agent_ui_toolkit/src/features/iframe/extensionApi.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_protobuf_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.index");
const tsickle_connect_2 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.index");
const tsickle_iframe_messages_pb_3 = goog.requireType("google3.third_party.gemini_coder.proto.iframe_messages_pb");
const tsickle_postmessageTransport_4 = goog.requireType("google3.devtools.cider.extensionutils.postmessage_connectrpc.postmessageTransport");
const tsickle_event_5 = goog.requireType("google3.third_party.gemini_coder.agent_ui_toolkit.src.vscode.base.common.event");
const tsickle_lifecycle_6 = goog.requireType("google3.third_party.gemini_coder.agent_ui_toolkit.src.vscode.base.common.lifecycle");
const iframe_messages_pb_1 = goog.require('google3.third_party.gemini_coder.proto.iframe_messages_pb');
const postmessageTransport_1 = goog.require('google3.devtools.cider.extensionutils.postmessage_connectrpc.postmessageTransport');
const event_1 = goog.require('google3.third_party.gemini_coder.agent_ui_toolkit.src.vscode.base.common.event');
/**
 * Channel name for Antigravity API.
 * @type {string}
 */
exports.AGY_API_CHANNEL = 'agy-ext-antigravity-api';
/**
 * Channel name for Extension API.
 * @type {string}
 */
exports.EXTENSION_API_CHANNEL = 'agy-ext-extension-api';
/**
 * Source name for Antigravity iframe.
 * @type {string}
 */
exports.ANTIGRAVITY_IFRAME_SOURCE = 'antigravity-iframe';
/**
 * Source name for Antigravity extension.
 * @type {string}
 */
exports.ANTIGRAVITY_EXTENSION_SOURCE = 'antigravity-extension';
/**
 * For use in agent-ui-toolkit - this will return the callable API provided by
 * the IDE extension.
 * @type {{client: ?, router: !tsickle_postmessageTransport_4.PostMessageRouter<?>}}
 */
let cachedExtensionApi;
/**
 * Returns the Extension API client and router.
 *
 * Do not use this outside of main.tsx - use `useExtensionApi()` and
 * `useApiRouter()` instead.
 * @return {{client: ?, router: !tsickle_postmessageTransport_4.PostMessageRouter<?>}}
 */
function getExtensionApi() {
    if (!cachedExtensionApi) {
        cachedExtensionApi = (0, postmessageTransport_1.createClientAndRouter)(iframe_messages_pb_1.ExtensionApi, exports.EXTENSION_API_CHANNEL, iframe_messages_pb_1.AntigravityApi, exports.AGY_API_CHANNEL, (/**
         * @param {?} message
         * @return {void}
         */
        (message) => {
            window.parent.postMessage({ ...message, source: exports.ANTIGRAVITY_IFRAME_SOURCE }, '*');
        }), (/**
         * @param {function(*): *} listener
         * @return {{dispose: function(): void}}
         */
        (listener) => {
            /** @type {function(!MessageEvent<?>): void} */
            const eventListener = (/**
             * @param {!MessageEvent<?>} event
             * @return {void}
             */
            (event) => {
                listener(event.data);
            });
            window.addEventListener('message', eventListener);
            return {
                dispose: (/**
                 * @return {void}
                 */
                () => {
                    window.removeEventListener('message', eventListener);
                }),
            };
        }));
    }
    return cachedExtensionApi;
}
exports.getExtensionApi = getExtensionApi;
/**
 * For use in extensions - this will return the callable API provided by the
 * agent-ui-toolkit extension.
 * @param {function(*): *} postMessage
 * @param {!Event<*>} onDidReceiveMessage
 * @param {function(?): ?} implementation
 * @return {?}
 */
function getAntigravityApi(postMessage, onDidReceiveMessage, implementation) {
    return (0, postmessageTransport_1.createClientAndServer)(iframe_messages_pb_1.AntigravityApi, exports.AGY_API_CHANNEL, iframe_messages_pb_1.ExtensionApi, exports.EXTENSION_API_CHANNEL, (/**
     * @param {?} message
     * @return {void}
     */
    (message) => {
        postMessage({ ...message, source: exports.ANTIGRAVITY_EXTENSION_SOURCE });
    }), onDidReceiveMessage, implementation);
}
exports.getAntigravityApi = getAntigravityApi;
/**
 * A VS Code like Event, usable in any IDE.
 * @record
 * @template T
 */
function Event() { }
exports.Event = Event;
/**
 * Excludes the event properties from the service implementation type.
 * @typedef {?}
 */
exports.ServiceImplWithoutEvents;
/**
 * Maps the service implementation methods to Event emitters.
 * @typedef {?}
 */
var ServiceImplEvents;
/**
 * List of methods from ExtensionApi that should be treated as events.
 * @type {!Array<?>}
 */
const ANTIGRAVITY_EVENTS = (/** @type {!Array<?>} */ ([
    'onAntigravityReady',
    'onDidChangeUrl',
    'onDidSendChatMessage',
    'onDidStartConversation',
    'onDidChangeConversations',
    'onKeyboardEvent',
    'onMouseEvent',
    'onWebviewFocused',
]));
/** @typedef {string} */
var AntigravityEventName;
/**
 * @param {string} name
 * @return {boolean}
 */
function isAntigravityEvent(name) {
    return ((/** @type {!ReadonlyArray<string>} */ (ANTIGRAVITY_EVENTS))).includes(name);
}
/** @typedef {?} */
var AntigravityApiEvents;
/**
 * Manages event emitters for the Antigravity API.
 */
class AntigravityApiEmitters {
    /**
     * @public
     */
    constructor() {
        this.emitters = new Map();
        // Automatically implement all RPC methods defined in ANTIGRAVITY_EVENTS.
        for (const name of ANTIGRAVITY_EVENTS) {
            /** @type {!tsickle_event_5.Emitter<*>} */
            const emitter = new event_1.Emitter();
            this.emitters.set(name, emitter);
            // Dynamic implementation: fire the emitter and return an empty object (standard for onFoo RPCs).
            this[name] = (/**
             * @param {*} req
             * @return {*}
             */
            (req) => {
                emitter.fire(req);
                return {};
            });
        }
    }
    /**
     * @public
     * @return {?}
     */
    getEvents() {
        /** @type {?} */
        const events = {};
        for (const name of ANTIGRAVITY_EVENTS) {
            // tslint:disable-next-line:no-any no-dict-access-on-struct-type
            events[name] = (/** @type {!Event<?>} */ ((/** @type {!tsickle_event_5.Emitter<*>} */ (this.emitters.get(name))).event));
        }
        return (/** @type {?} */ (events));
    }
    /**
     * Merges the base implementation with the event emitters.
     * @public
     * @param {?} base
     * @return {?}
     */
    merge(base) {
        /** @type {?} */
        const impl = {};
        for (const method of iframe_messages_pb_1.ExtensionApi.methods) {
            /** @type {string} */
            const name = method.localName;
            if (name in this && isAntigravityEvent(name)) {
                /** @type {(function(*, !tsickle_connect_2.HandlerContext): (*|!Promise<(*|?)>|?)|function(?, !tsickle_connect_2.HandlerContext): (*|!Promise<(*|?)>|?))} */
                const eventFn = this[name];
                if (typeof eventFn === 'function') {
                    impl[name] = eventFn.bind(this);
                }
            }
            else {
                /** @type {*} */
                const baseFn = ((/** @type {?} */ (base)))[name];
                if (typeof baseFn === 'function') {
                    impl[name] = (/** @type {!Function} */ (baseFn)).bind(base);
                }
            }
        }
        return (/** @type {?} */ (impl));
    }
}
exports.AntigravityApiEmitters = AntigravityApiEmitters;
/* istanbul ignore if */
if (false) {
    /**
     * @const {!Map<string, !tsickle_event_5.Emitter<*>>}
     * @private
     */
    AntigravityApiEmitters.prototype.emitters;
}
/**
 * Client type for Antigravity API with events.
 * @typedef {?}
 */
exports.AntigravityApiClient;
/**
 * Helper function to replace some handlers with events.
 * @param {function(*): *} postMessage
 * @param {!Event<*>} onDidReceiveMessage
 * @param {function(?): ?} implementation
 * @return {?}
 */
function getAntigravityApiV2(postMessage, onDidReceiveMessage, implementation) {
    /** @type {!AntigravityApiEmitters} */
    const emitters = new AntigravityApiEmitters();
    /** @type {?} */
    const api = getAntigravityApi(postMessage, onDidReceiveMessage, (/**
     * @param {?} c
     * @return {?}
     */
    (c) => {
        return emitters.merge(implementation(c));
    }));
    return { ...api, ...emitters.getEvents() };
}
exports.getAntigravityApiV2 = getAntigravityApiV2;
