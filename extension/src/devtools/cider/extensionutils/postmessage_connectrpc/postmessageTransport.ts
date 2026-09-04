/**
 * @fileoverview Sets up connectrpc over postmessage.
 * Generated from: devtools/cider/extensionutils/postmessage_connectrpc/postmessageTransport.ts
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
goog.module('google3.devtools.cider.extensionutils.postmessage_connectrpc.postmessageTransport');
var module = module || { id: 'devtools/cider/extensionutils/postmessage_connectrpc/postmessageTransport.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_protobuf_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.index");
const tsickle_connect_2 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.index");
const tsickle_event_3 = goog.requireType("google3.devtools.cider.extensionutils.vscode.event");
const protobuf_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.index');
const connect_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.index');
/**
 * Returns true if the message is a DataMessage used by the postmessage
 * transport.
 * @param {*} message
 * @return {boolean}
 */
function isDataMessage(message) {
    return (message != null &&
        typeof message === 'object' &&
        'type' in message &&
        message.type === 'postmessage-rpc');
}
exports.isDataMessage = isDataMessage;
/**
 * A transport that uses postmessage to communicate with the server.
 * @implements {tsickle_connect_2.Transport}
 */
class PostMessageTransport {
    /**
     * @public
     * @param {string} channel
     * @param {function(!DataMessage): *} postMessage
     * @param {(!BaseEvent<*>|?)} onDidReceiveMessage
     */
    constructor(channel, postMessage, onDidReceiveMessage) {
        this.channel = channel;
        this.postMessage = postMessage;
        this.onDidReceiveMessage = onDidReceiveMessage;
        this.pendingRequests = new Map();
        this.lastRequestId = 0;
        this.onDidReceiveMessage((/**
         * @param {*} message
         * @return {void}
         */
        (message) => {
            if (!isDataMessage(message) || (/** @type {(!DataMessage|!DataErrorMessage)} */ (message)).channel !== this.channel) {
                return;
            }
            /** @type {(undefined|!PromiseWithResolvers<(*|?)>)} */
            const resolver = this.pendingRequests.get((/** @type {(!DataMessage|!DataErrorMessage)} */ (message)).requestId);
            if (!resolver) {
                return;
            }
            if ((/** @type {(!DataMessage|!DataErrorMessage)} */ (message)).error) {
                console.error('[Jetski] PostMessageTransport error: ', message);
                resolver.reject(new connect_1.ConnectError((/** @type {!DataErrorMessage} */ (message)).errorVal.message, (/** @type {!DataErrorMessage} */ (message)).errorVal.code));
            }
            else {
                resolver.resolve((/** @type {!DataMessage} */ (message)).payload);
            }
        }));
    }
    /**
     * Call a unary RPC - a method that takes a single input message, and
     * responds with a single output message.
     * @public
     * @template I, O
     * @param {?} method
     * @param {(undefined|!AbortSignal)} signal
     * @param {(undefined|number)} timeoutMs
     * @param {(undefined|!Array<!Array<?>>|?|!Headers)} header
     * @param {?} input
     * @return {!Promise<!tsickle_connect_2.UnaryResponse<I, O>>}
     */
    async unary(method, signal, timeoutMs, header, input) {
        /** @type {?} */
        const inputMessage = (0, protobuf_1.create)(method.input, input);
        /** @type {string} */
        const rpcPath = `/${method.parent.typeName}/${method.name}`;
        /** @type {!Array<{desc: I, value: ?}>} */
        const outgoingDetails = [
            {
                desc: method.input,
                value: input,
            },
        ];
        /** @type {number} */
        const requestId = ++this.lastRequestId;
        /** @type {!PromiseWithResolvers<?>} */
        const resolver = Promise.withResolvers();
        this.pendingRequests.set(requestId, (/** @type {!PromiseWithResolvers<(*|?)>} */ ((/** @type {*} */ (resolver)))));
        /** @type {!DataMessage} */
        const message = {
            type: 'postmessage-rpc',
            channel: this.channel,
            requestId,
            rpcPath,
            payload: inputMessage,
        };
        this.postMessage(message);
        /** @type {function(): void} */
        const onAbort = (/**
         * @return {void}
         */
        () => {
            resolver.reject(new connect_1.ConnectError('Request aborted', connect_1.Code.Canceled, header, outgoingDetails, signal));
        });
        signal?.addEventListener('abort', onAbort, { once: true });
        /** @type {(undefined|number)} */
        let timeoutHandle;
        if (timeoutMs) {
            timeoutHandle = setTimeout((/**
             * @return {void}
             */
            () => {
                resolver.reject(new connect_1.ConnectError('Request timed out', connect_1.Code.DeadlineExceeded, header, outgoingDetails, signal));
            }), timeoutMs);
        }
        try {
            /** @type {?} */
            const outputMessage = await resolver.promise;
            return {
                stream: false,
                service: method.parent,
                method,
                header: new Headers(),
                message: (0, protobuf_1.create)(method.output, outputMessage),
                trailer: new Headers(),
            };
        }
        finally {
            this.pendingRequests.delete(requestId);
            clearTimeout(timeoutHandle);
            signal?.removeEventListener('abort', onAbort);
        }
    }
    /**
     * Call a streaming RPC - a method that takes zero or more input messages,
     * and responds with zero or more output messages.
     * @public
     * @template I, O
     * @return {!Promise<!tsickle_connect_2.StreamResponse<I, O>>}
     */
    stream() {
        throw new Error('Streaming methods are not supported by PostMessageTransport.');
    }
}
exports.PostMessageTransport = PostMessageTransport;
/* istanbul ignore if */
if (false) {
    /**
     * @const {!Map<number, !PromiseWithResolvers<(*|?)>>}
     * @private
     */
    PostMessageTransport.prototype.pendingRequests;
    /**
     * @type {number}
     * @private
     */
    PostMessageTransport.prototype.lastRequestId;
    /**
     * @const {string}
     * @private
     */
    PostMessageTransport.prototype.channel;
    /**
     * @const {function(!DataMessage): *}
     * @private
     */
    PostMessageTransport.prototype.postMessage;
    /**
     * @const {(!BaseEvent<*>|?)}
     * @private
     */
    PostMessageTransport.prototype.onDidReceiveMessage;
}
/** @typedef {function(?): (?|!Promise<?>)} */
var MethodFunction;
/**
 * @record
 * @template I, O
 */
function MethodHandler() { }
/* istanbul ignore if */
if (false) {
    /**
     * @type {function(?): (?|!Promise<?>)}
     * @public
     */
    MethodHandler.prototype.fn;
    /**
     * @type {I}
     * @public
     */
    MethodHandler.prototype.input;
    /**
     * @type {O}
     * @public
     */
    MethodHandler.prototype.output;
}
/**
 * A router that uses postmessage to receive messages.
 * This can be used to register service implementations and individual RPC
 * handlers.
 * @template T
 */
class PostMessageRouter {
    /**
     * @public
     * @param {T} serviceDesc
     * @param {string} channel
     * @param {function((!DataMessage|!DataErrorMessage)): *} postMessage
     * @param {(!BaseEvent<*>|?)} onDidReceiveMessage
     */
    constructor(serviceDesc, channel, postMessage, onDidReceiveMessage) {
        this.serviceDesc = serviceDesc;
        this.channel = channel;
        this.postMessage = postMessage;
        this.onDidReceiveMessage = onDidReceiveMessage;
        this.methods = new Map();
        this.onDidReceiveMessage((/**
         * @param {*} message
         * @return {!Promise<void>}
         */
        async (message) => {
            if (!isDataMessage(message) ||
                (/** @type {(!DataMessage|!DataErrorMessage)} */ (message)).error ||
                (/** @type {!DataMessage} */ (message)).channel !== this.channel ||
                !(/** @type {!DataMessage} */ (message)).payload) {
                return;
            }
            /** @type {(undefined|!MethodHandler<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>)} */
            const method = this.methods.get((/** @type {!DataMessage} */ (message)).rpcPath);
            if (!method) {
                this.postMessage({
                    type: 'postmessage-rpc',
                    channel: this.channel,
                    requestId: (/** @type {!DataMessage} */ (message)).requestId,
                    rpcPath: (/** @type {!DataMessage} */ (message)).rpcPath,
                    error: true,
                    errorVal: {
                        message: `Endpoint ${(/** @type {!DataMessage} */ (message)).rpcPath} not implemented`,
                        code: connect_1.Code.NotFound,
                    },
                });
                return;
            }
            try {
                /** @type {(*|?)} */
                const result = await method.fn((0, protobuf_1.create)(method.input, (/** @type {!DataMessage} */ (message)).payload));
                this.postMessage({
                    ...message,
                    error: false,
                    payload: result,
                });
            }
            catch (e) {
                /** @type {!tsickle_connect_2.ConnectError} */
                const error = connect_1.ConnectError.from(e);
                this.postMessage({
                    type: 'postmessage-rpc',
                    channel: this.channel,
                    requestId: (/** @type {!DataMessage} */ (message)).requestId,
                    rpcPath: (/** @type {!DataMessage} */ (message)).rpcPath,
                    error: true,
                    errorVal: {
                        message: error.rawMessage,
                        code: error.code,
                    },
                });
            }
        }));
    }
    /**
     * @public
     * @param {?} implementation
     * @return {!PostMessageRouter}
     */
    service(implementation) {
        for (const method of this.serviceDesc.methods) {
            if (method.methodKind !== 'unary') {
                continue;
            }
            /** @type {(undefined|?)} */
            const implFn = implementation[method.localName];
            if (!implFn || typeof implFn !== 'function') {
                continue;
            }
            /** @type {!tsickle_connect_2.HandlerContext} */
            const context = (/** @type {!tsickle_connect_2.HandlerContext} */ ((/** @type {?} */ ({
                method,
                service: this.serviceDesc,
                requestMethod: 'POST',
                requestHeader: new Headers(),
                responseHeader: new Headers(),
                responseTrailer: new Headers(),
            }))));
            this.methods.set(`/${this.serviceDesc.typeName}/${method.name}`, {
                fn: this.loosen((
                // Some weird typing is here since typescript does not pick up that
                // the handler is a unary handler.
                /**
                 * @param {*} req
                 * @return {!Promise<(*|?)>}
                 */
                (req) => (/** @type {!Promise<(*|?)>} */ ((/** @type {(function(*, !tsickle_connect_2.HandlerContext): (?|!Promise<?>)|function(*, !tsickle_connect_2.HandlerContext): !AsyncIterable<?, ?, ?>|function(!AsyncIterable<*, ?, ?>, !tsickle_connect_2.HandlerContext): !Promise<?>|function(!AsyncIterable<*, ?, ?>, !tsickle_connect_2.HandlerContext): !AsyncIterable<?, ?, ?>)} */ (implFn)).bind(implementation)((/** @type {?} */ (req)), context))))),
                input: method.input,
                output: method.output,
            });
        }
        return this;
    }
    /**
     * @public
     * @template I, O
     * @param {?} method
     * @param {function(?): (?|!Promise<?>)} handler
     * @return {!PostMessageRouter}
     */
    rpc(method, handler) {
        this.methods.set(`/${this.serviceDesc.typeName}/${method.name}`, {
            fn: this.loosen(handler),
            input: method.input,
            output: method.output,
        });
        return this;
    }
    /**
     * @private
     * @template I, O
     * @param {function(?): (?|!Promise<?>)} handler
     * @return {function(*): (*|?|!Promise<?>|!Promise<*>)}
     */
    loosen(handler) {
        return (/** @type {function(*): (*|!Promise<*>)} */ ((/** @type {*} */ (handler))));
    }
}
exports.PostMessageRouter = PostMessageRouter;
/* istanbul ignore if */
if (false) {
    /**
     * @const {!Map<string, !MethodHandler<!tsickle_protobuf_1.DescMessage, !tsickle_protobuf_1.DescMessage>>}
     * @private
     */
    PostMessageRouter.prototype.methods;
    /**
     * @const {T}
     * @private
     */
    PostMessageRouter.prototype.serviceDesc;
    /**
     * @const {string}
     * @private
     */
    PostMessageRouter.prototype.channel;
    /**
     * @const {function((!DataMessage|!DataErrorMessage)): *}
     * @private
     */
    PostMessageRouter.prototype.postMessage;
    /**
     * @const {(!BaseEvent<*>|?)}
     * @private
     */
    PostMessageRouter.prototype.onDidReceiveMessage;
}
/**
 * Helper function to set up a client and server router with the same transport.
 * @template C, S
 * @param {C} clientService
 * @param {string} clientChannel
 * @param {S} serverService
 * @param {string} serverChannel
 * @param {function((!DataMessage|!DataErrorMessage)): *} postMessage
 * @param {(!BaseEvent<*>|?)} onDidReceiveMessage
 * @return {{client: ?, router: !PostMessageRouter<S>}}
 */
function createClientAndRouter(clientService, clientChannel, serverService, serverChannel, postMessage, onDidReceiveMessage) {
    /** @type {?} */
    const client = (0, connect_1.createClient)(clientService, new PostMessageTransport(clientChannel, postMessage, onDidReceiveMessage));
    /** @type {!PostMessageRouter<S>} */
    const router = new PostMessageRouter(serverService, serverChannel, postMessage, onDidReceiveMessage);
    return { client, router };
}
exports.createClientAndRouter = createClientAndRouter;
/**
 * Helper function to set up a client and full server with the same transport.
 * @template C, S
 * @param {C} clientService
 * @param {string} clientChannel
 * @param {S} serverService
 * @param {string} serverChannel
 * @param {function((!DataMessage|!DataErrorMessage)): *} postMessage
 * @param {(!BaseEvent<*>|?)} onDidReceiveMessage
 * @param {function(?): ?} implementation
 * @return {?}
 */
function createClientAndServer(clientService, clientChannel, serverService, serverChannel, postMessage, onDidReceiveMessage, implementation) {
    const { client, router } = createClientAndRouter(clientService, clientChannel, serverService, serverChannel, postMessage, onDidReceiveMessage);
    router.service(implementation(client));
    return client;
}
exports.createClientAndServer = createClientAndServer;
