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
 * Generated from: third_party/javascript/connectrpc_connect/src/protocol/universal-handler-client.ts
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
goog.module('google3.third_party.javascript.connectrpc_connect.src.protocol.universal$2dhandler$2dclient');
var module = module || { id: 'third_party/javascript/connectrpc_connect/src/protocol/universal-handler-client.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_code_1 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.code");
const tsickle_connect_error_2 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.connect$2derror");
const tsickle_async_iterable_3 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.async$2diterable");
const tsickle_universal_handler_4 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.universal$2dhandler");
const tsickle_universal_5 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.universal");
const tsickle_signals_6 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.signals");
const code_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.code');
const connect_error_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.connect$2derror');
const async_iterable_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol.async$2diterable');
const signals_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol.signals');
/**
 * An in-memory UniversalClientFn that can be used to route requests to a ConnectRouter
 * bypassing network calls. Useful for testing and calling in-process services.
 * @param {!Array<!tsickle_universal_handler_4.UniversalHandler>} uHandlers
 * @return {function(!tsickle_universal_5.UniversalClientRequest): !Promise<!tsickle_universal_5.UniversalClientResponse>}
 */
function createUniversalHandlerClient(uHandlers) {
    /** @type {!Map<string, !tsickle_universal_handler_4.UniversalHandler>} */
    const handlerMap = new Map();
    for (const handler of uHandlers) {
        handlerMap.set(handler.requestPath, handler);
    }
    return (/**
     * @param {!tsickle_universal_5.UniversalClientRequest} uClientReq
     * @return {!Promise<{body: !AsyncIterable<!Uint8Array, ?, ?>, header: !Headers, status: number, trailer: !Headers}>}
     */
    async (uClientReq) => {
        /** @type {string} */
        const pathname = new URL(uClientReq.url).pathname;
        /** @type {(undefined|!tsickle_universal_handler_4.UniversalHandler)} */
        const handler = handlerMap.get(pathname);
        if (!handler) {
            throw new connect_error_js_1.ConnectError(`RouterHttpClient: no handler registered for ${pathname}`, code_js_1.Code.Unimplemented);
        }
        /** @type {!AbortSignal} */
        const reqSignal = uClientReq.signal ?? new AbortController().signal;
        /** @type {!tsickle_universal_5.UniversalServerResponse} */
        const uServerRes = await raceSignal(reqSignal, handler({
            body: uClientReq.body ?? (0, async_iterable_js_1.createAsyncIterable)([]),
            httpVersion: "2.0",
            method: uClientReq.method,
            url: uClientReq.url,
            header: uClientReq.header,
            signal: reqSignal,
        }));
        /** @type {!AsyncIterable<!Uint8Array, ?, ?>} */
        const body = uServerRes.body ?? (0, async_iterable_js_1.createAsyncIterable)([]);
        return {
            body: (0, async_iterable_js_1.pipe)(body, (/**
             * @param {!AsyncIterable<!Uint8Array, ?, ?>} iterable
             * @return {*}
             */
            (iterable) => {
                return {
                    /**
                     * @public
                     * @return {!AsyncIterator<!Uint8Array, ?, ?>}
                     */
                    [Symbol.asyncIterator]() {
                        /** @type {!AsyncIterator<!Uint8Array, ?, ?>} */
                        const it = iterable[Symbol.asyncIterator]();
                        /** @type {!AsyncIterator<!Uint8Array, ?, ?>} */
                        const w = {
                            /**
                             * @public
                             * @return {!Promise<(!IteratorReturnResult<?>|!IteratorYieldResult<!Uint8Array>)>}
                             */
                            next() {
                                return raceSignal(reqSignal, it.next());
                            },
                        };
                        if (it.throw !== undefined) {
                            w.throw = (/**
                             * @param {*} e
                             * @return {!Promise<(!IteratorReturnResult<?>|!IteratorYieldResult<!Uint8Array>)>}
                             */
                            (e) => ((/** @type {?} */ (it))).throw(e));
                        }
                        if (it.return !== undefined) {
                            w.return = (/**
                             * @param {*=} value
                             * @return {!Promise<(!IteratorReturnResult<?>|!IteratorYieldResult<!Uint8Array>)>}
                             */
                            (value) => ((/** @type {?} */ (it))).return(value));
                        }
                        return w;
                    },
                };
            })),
            header: new Headers(uServerRes.header),
            status: uServerRes.status,
            trailer: new Headers(uServerRes.trailer),
        };
    });
}
exports.createUniversalHandlerClient = createUniversalHandlerClient;
/**
 * Wrap a promise, and reject early if the given signal triggers before the
 * promise is settled.
 * @template T
 * @param {!AbortSignal} signal
 * @param {!Promise<T>} promise
 * @return {!Promise<T>}
 */
function raceSignal(signal, promise) {
    /** @type {(undefined|function(): void)} */
    let cleanup;
    /** @type {!Promise<?>} */
    const signalPromise = new Promise((/**
     * @param {function(!PromiseLike<?>): void} _
     * @param {function(?=): void} reject
     * @return {void}
     */
    (_, reject) => {
        /** @type {function(): void} */
        const onAbort = (/**
         * @return {void}
         */
        () => reject((0, signals_js_1.getAbortSignalReason)(signal)));
        if (signal.aborted) {
            return onAbort();
        }
        signal.addEventListener("abort", onAbort);
        cleanup = (/**
         * @return {void}
         */
        () => signal.removeEventListener("abort", onAbort));
    }));
    return Promise.race([signalPromise, promise]).finally(cleanup);
}
