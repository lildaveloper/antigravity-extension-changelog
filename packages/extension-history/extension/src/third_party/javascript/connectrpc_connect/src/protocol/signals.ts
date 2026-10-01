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
 * Generated from: third_party/javascript/connectrpc_connect/src/protocol/signals.ts
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
goog.module('google3.third_party.javascript.connectrpc_connect.src.protocol.signals');
var module = module || { id: 'third_party/javascript/connectrpc_connect/src/protocol/signals.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_connect_error_1 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.connect$2derror");
const tsickle_code_2 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.code");
const connect_error_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.connect$2derror');
const code_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.code');
/**
 * Create an AbortController that is automatically aborted if one of the given
 * signals is aborted.
 *
 * For convenience, the linked AbortSignals can be undefined.
 *
 * If the controller or any of the signals is aborted, all event listeners are
 * removed.
 *
 * @param {...(undefined|!AbortSignal)} signals
 * @return {!AbortController}
 */
function createLinkedAbortController(...signals) {
    /** @type {!AbortController} */
    const controller = new AbortController();
    /** @type {!Array<!AbortSignal>} */
    const sa = signals.filter((/**
     * @param {(undefined|!AbortSignal)} s
     * @return {boolean}
     */
    (s) => s !== undefined)).concat(controller.signal);
    for (const signal of sa) {
        if (signal.aborted) {
            onAbort.apply(signal);
            break;
        }
        signal.addEventListener("abort", onAbort);
    }
    /**
     * @this {!AbortSignal}
     * @return {void}
     */
    function onAbort() {
        if (!controller.signal.aborted) {
            controller.abort(getAbortSignalReason(this));
        }
        for (const signal of sa) {
            signal.removeEventListener("abort", onAbort);
        }
    }
    return controller;
}
exports.createLinkedAbortController = createLinkedAbortController;
/**
 * Create a deadline signal. The returned object contains an AbortSignal, but
 * also a cleanup function to stop the timer, which must be called once the
 * calling code is no longer interested in the signal.
 *
 * Ideally, we would simply use AbortSignal.timeout(), but it is not widely
 * available yet.
 *
 * @param {(undefined|number)} timeoutMs
 * @return {{signal: !AbortSignal, cleanup: function(): void}}
 */
function createDeadlineSignal(timeoutMs) {
    /** @type {!AbortController} */
    const controller = new AbortController();
    /** @type {function(): void} */
    const listener = (/**
     * @return {void}
     */
    () => {
        controller.abort(new connect_error_js_1.ConnectError("the operation timed out", code_js_1.Code.DeadlineExceeded));
    });
    /** @type {(undefined|number)} */
    let timeoutId;
    if (timeoutMs !== undefined) {
        if (timeoutMs <= 0)
            listener();
        else
            timeoutId = setTimeout(listener, timeoutMs);
    }
    return {
        signal: controller.signal,
        cleanup: (/**
         * @return {void}
         */
        () => clearTimeout(timeoutId)),
    };
}
exports.createDeadlineSignal = createDeadlineSignal;
/**
 * Returns the reason why an AbortSignal was aborted. Returns undefined if the
 * signal has not been aborted.
 *
 * The property AbortSignal.reason is not widely available. This function
 * returns an AbortError if the signal is aborted, but reason is undefined.
 *
 * @param {!AbortSignal} signal
 * @return {*}
 */
function getAbortSignalReason(signal) {
    if (!signal.aborted) {
        return undefined;
    }
    if (signal.reason !== undefined) {
        return signal.reason;
    }
    // AbortSignal.reason is available in Node.js v16, v18, and later,
    // and in all browsers since early 2022.
    /** @type {!Error} */
    const e = new Error("This operation was aborted");
    e.name = "AbortError";
    return e;
}
exports.getAbortSignalReason = getAbortSignalReason;
