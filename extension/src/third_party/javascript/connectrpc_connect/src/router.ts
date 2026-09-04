/**
 * @license
 * Copyright 2021-2025 The Connect Authors
 * SPDX-License-Identifier: Apache-2.0
 */
// Copyright 2021-2025 The Connect Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/javascript/connectrpc_connect/src/router.ts
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
goog.module('google3.third_party.javascript.connectrpc_connect.src.router');
var module = module || { id: 'third_party/javascript/connectrpc_connect/src/router.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_connect_error_1 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.connect$2derror");
const tsickle_code_2 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.code");
const tsickle_implementation_3 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.implementation");
const tsickle_handler_factory_4 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol$2dgrpc$2dweb.handler$2dfactory");
const tsickle_handler_factory_5 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol$2dgrpc.handler$2dfactory");
const tsickle_handler_factory_6 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.handler$2dfactory");
const tsickle_universal_handler_7 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.universal$2dhandler");
const tsickle_protocol_handler_factory_8 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.protocol$2dhandler$2dfactory");
const tsickle_protobuf_9 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.index");
const connect_error_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.connect$2derror');
const code_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.code');
const implementation_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.implementation');
const handler_factory_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol$2dgrpc$2dweb.handler$2dfactory');
const handler_factory_js_2 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol$2dgrpc.handler$2dfactory');
const handler_factory_js_3 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol$2dconnect.handler$2dfactory');
const universal_handler_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol.universal$2dhandler');
/**
 * ConnectRouter is your single registration point for RPCs.
 *
 * Create a file `connect.ts` with a default export such as this:
 *
 * ```ts
 * import {ConnectRouter} from "\@connectrpc/connect";
 *
 * export default (router: ConnectRouter) => {
 *   router.service(ElizaService, {});
 * }
 * ```
 *
 * Then pass this function to adapters and plugins, for example
 * from \@connectrpc/connect-node, or from \@connectrpc/connect-fastify.
 * @record
 */
function ConnectRouter() { }
exports.ConnectRouter = ConnectRouter;
/* istanbul ignore if */
if (false) {
    /**
     * @const {!Array<!tsickle_universal_handler_7.UniversalHandler>}
     * @public
     */
    ConnectRouter.prototype.handlers;
    /**
     * Register a service implementation, and object with methods for the
     * individual RPCs.
     *
     * You don't have to implement all RPCs of a service. If you omit a method,
     * the router adds a method that responds with an error code `unimplemented`.
     * @type {function(?, ?, (undefined|?)=): !ConnectRouter}
     * @public
     */
    ConnectRouter.prototype.service;
    /**
     * Register a single RPC implementation.
     * @type {function(?, ?, (undefined|?)=): !ConnectRouter}
     * @public
     */
    ConnectRouter.prototype.rpc;
}
/**
 * Options for a ConnectRouter. By default, all three protocols gRPC, gRPC-web,
 * and Connect are enabled.
 * @record
 * tsickle: dropped extends: dropped extends of a type literal: Partial<UniversalHandlerOptions>
 */
function ConnectRouterOptions() { }
exports.ConnectRouterOptions = ConnectRouterOptions;
/* istanbul ignore if */
if (false) {
    /**
     * Enable the gRPC protocol and make your API available to all gRPC clients
     * for various platforms and languages. See https://grpc.io/
     *
     * The protocol is enabled by default. Set this option to `false` to disable
     * it, but mind that at least one protocol must be enabled.
     *
     * Note that gRPC is typically served with TLS over HTTP/2 and requires access
     * to HTTP trailers.
     * @type {(undefined|boolean)}
     * @public
     */
    ConnectRouterOptions.prototype.grpc;
    /**
     * Enable the gRPC-web protocol and make your API available to all gRPC-web
     * clients. gRPC-web is commonly used in web browsers, but there are client
     * implementations for other platforms as well, for example in Dart, Kotlin,
     * and Swift. See https://github.com/grpc/grpc-web
     *
     * The protocol is enabled by default. Set this option to `false` to disable
     * it, but mind that at least one protocol must be enabled.
     *
     * gRPC-web works over HTTP 1.1 or HTTP/2 and does not require access to HTTP
     * trailers. Note that bidi streaming requires HTTP/2, and web browsers may
     * not support all streaming types.
     * @type {(undefined|boolean)}
     * @public
     */
    ConnectRouterOptions.prototype.grpcWeb;
    /**
     * Enable the Connect protocol and make your API available to all Connect
     * clients, but also for a simple call with curl. See https://connectrpc.com/
     *
     * The protocol is enabled by default. Set this option to `false` to disable
     * it, but mind that at least one protocol must be enabled.
     *
     * Connect works over HTTP 1.1 or HTTP/2 and does not require access to HTTP
     * trailers. Note that bidi streaming requires HTTP/2, and web browsers may
     * not support all streaming types.
     * @type {(undefined|boolean)}
     * @public
     */
    ConnectRouterOptions.prototype.connect;
}
/**
 * Create a new ConnectRouter.
 * @param {(undefined|!ConnectRouterOptions)=} routerOptions
 * @return {!ConnectRouter}
 */
function createConnectRouter(routerOptions) {
    /** @type {{options: !ConnectRouterOptions, protocols: !Array<!tsickle_protocol_handler_factory_8.ProtocolHandlerFactory>}} */
    const base = whichProtocols(routerOptions);
    /** @type {!Array<!tsickle_universal_handler_7.UniversalHandler>} */
    const handlers = [];
    /** @type {!ConnectRouter} */
    const router = {
        handlers,
        service: (/**
         * @param {?} service
         * @param {?} implementation
         * @param {(undefined|?)} options
         * @return {!ConnectRouter}
         */
        (service, implementation, options) => {
            const { protocols } = whichProtocols(options, base);
            handlers.push(...(0, universal_handler_js_1.createUniversalServiceHandlers)((0, implementation_js_1.createServiceImplSpec)(service, implementation), protocols));
            return router;
        }),
        rpc: (/**
         * @param {?} method
         * @param {?} impl
         * @param {(undefined|?)} opt
         * @return {!ConnectRouter}
         */
        (method, impl, opt) => {
            const { protocols } = whichProtocols(opt, base);
            handlers.push((0, universal_handler_js_1.createUniversalMethodHandler)((0, implementation_js_1.createMethodImplSpec)(method, impl), protocols));
            return router;
        }),
    };
    return router;
}
exports.createConnectRouter = createConnectRouter;
/**
 * @param {(undefined|!ConnectRouterOptions)} options
 * @param {(undefined|{options: !ConnectRouterOptions, protocols: !Array<!tsickle_protocol_handler_factory_8.ProtocolHandlerFactory>})=} base
 * @return {{options: !ConnectRouterOptions, protocols: !Array<!tsickle_protocol_handler_factory_8.ProtocolHandlerFactory>}}
 */
function whichProtocols(options, base) {
    if (base && !options) {
        return base;
    }
    /** @type {!ConnectRouterOptions} */
    const opt = base
        ? {
            ...(0, universal_handler_js_1.validateUniversalHandlerOptions)(base.options),
            ...options,
        }
        : {
            ...options,
            ...(0, universal_handler_js_1.validateUniversalHandlerOptions)(options ?? {}),
        };
    /** @type {!Array<!tsickle_protocol_handler_factory_8.ProtocolHandlerFactory>} */
    const protocols = [];
    if (options?.grpc !== false) {
        protocols.push((0, handler_factory_js_2.createHandlerFactory)(opt));
    }
    if (options?.grpcWeb !== false) {
        protocols.push((0, handler_factory_js_1.createHandlerFactory)(opt));
    }
    if (options?.connect !== false) {
        protocols.push((0, handler_factory_js_3.createHandlerFactory)(opt));
    }
    if (protocols.length === 0) {
        throw new connect_error_js_1.ConnectError("cannot create handler, all protocols are disabled", code_js_1.Code.InvalidArgument);
    }
    return {
        options: opt,
        protocols,
    };
}
