/**
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Shared client for posting telemetry metrics to Concord.
 *
 * WARNING: Do NOT add any dependencies on 'vscode' or other IDE-specific
 * modules in this file. This module must remain dependency-free as it is
 * imported by scripts running in standalone environments outside the IDE
 * extension host.
 */
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/cloudcode/vscode/common/packages/metrics/concord_client.ts
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
goog.module('google3.third_party.cloudcode.vscode.common.packages.metrics.concord_client');
var module = module || { id: 'third_party/cloudcode/vscode/common/packages/metrics/concord_client.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_https_1 = goog.requireType("google3.third_party.javascript.typings.node.node.https");
const https = goog.require('google3.third_party.javascript.typings.node.node.https');
/**
 * Response containing the next request wait interval returned by the logging server.
 * @record
 */
function LogResponse() { }
exports.LogResponse = LogResponse;
/* istanbul ignore if */
if (false) {
    /**
     * @type {(undefined|number)}
     * @public
     */
    LogResponse.prototype.nextRequestWaitMs;
}
/**
 * Whether to use the Firelog backend format instead of the old legacy format.
 * @type {boolean}
 */
exports.USE_FIRELOG = true;
// Obfuscated API Key for CloudCode Desktop metrics
/** @type {!Array<string>} */
const KEY = [
    'I', 'H', 'A', 'z', 'h', 'U', 'h', 'T', 'l', 'G', 'X', '1', 'S',
    'S', 'C', 'N', 'l', 'a', 'w', '_', 'Y', 'N', 'O', 'h', 'v', 'h',
    'f', 'Y', 'm', 'v', '5', 'v', 'C', 'y', 'S', 'a', 'z', 'I', 'A',
];
// Firelog API Key
/** @type {string} */
const IDENTIFIER = [...KEY].reverse().join('');
/**
 * Decodes protobuf-encoded response from Firelog server.
 * Visible for testing.
 * @param {?} buf
 * @return {(undefined|!LogResponse)}
 */
function decodeLogResponse(buf) {
    if (buf.length < 1) {
        return undefined;
    }
    if (exports.USE_FIRELOG) {
        try {
            /** @type {string} */
            const responseString = buf.toString('utf8');
            /** @type {?} */
            const json = (/** @type {?} */ (JSON.parse(responseString)));
            if (json && typeof json === 'object') {
                /** @type {*} */
                const msString = json['nextRequestWaitMillis'];
                if (msString !== undefined) {
                    /** @type {number} */
                    const ms = Number(msString);
                    if (!isNaN(ms)) {
                        return { nextRequestWaitMs: ms };
                    }
                }
            }
        }
        catch {
            // Fall back to legacy binary protobuf decoding
        }
    }
    // The first byte of the buffer is `field<<3 | type`. We're looking for field
    // 1, with type varint, represented by type=0. If the first byte isn't 8, that
    // means field 1 is missing or the message is corrupted. Either way, we return
    // undefined.
    if (buf.readUInt8(0) !== 8) {
        return undefined;
    }
    /** @type {bigint} */
    let ms = BigInt(0);
    /** @type {boolean} */
    let cont = true;
    // In each byte, the most significant bit is the continuation bit. If it's
    // set, we keep going. The lowest 7 bits, are data bits. They are concatenated
    // in reverse order to form the final number.
    for (let i = 1; cont && i < buf.length; i++) {
        /** @type {number} */
        const byte = buf.readUInt8(i);
        ms |= BigInt(byte & 0x7f) << BigInt(7 * (i - 1));
        cont = (byte & 0x80) !== 0;
    }
    if (cont) {
        // We have fallen off the buffer without seeing a terminating byte. The
        // message is corrupted.
        return undefined;
    }
    return { nextRequestWaitMs: Number(ms) };
}
exports.decodeLogResponse = decodeLogResponse;
/**
 * Wraps the payload in an array if required by the legacy backend format.
 * @template T
 * @param {T} toFix
 * @return {(T|!Array<?>)}
 */
function fixBuf(toFix) {
    return exports.USE_FIRELOG ? toFix : [toFix];
}
exports.fixBuf = fixBuf;
/**
 * Sends a body message to the metrics server.
 * @param {string} body
 * @param {(undefined|function(!Error): void)=} onError
 * @return {!Promise<!LogResponse>}
 */
function postMetricsToConcordServer(body, onError) {
    return new Promise((/**
     * @param {function((?|!PromiseLike<?>)): void} resolve
     * @param {function(?=): void} reject
     * @return {void}
     */
    (resolve, reject) => {
        /** @type {{hostname: string, path: string, method: string, headers: *}} */
        const optionsForFirelog = {
            hostname: 'firebaselogging-pa.googleapis.com',
            path: `/v1/firelog/legacy/log?key=${IDENTIFIER}`,
            method: 'POST',
            headers: {
                'Content-Length': Buffer.byteLength(body),
                'Content-Type': 'application/json',
            },
        };
        /** @type {{hostname: string, path: string, method: string, headers: *}} */
        const optionsForClearcut = {
            hostname: 'play.googleapis.com',
            path: '/log',
            method: 'POST',
            headers: { 'Content-Length': Buffer.byteLength(body) },
        };
        /** @type {!Array<?>} */
        const bufs = [];
        /** @type {!ClientRequest} */
        const req = https.request(exports.USE_FIRELOG ? optionsForFirelog : optionsForClearcut, (/**
         * @param {!IncomingMessage} res
         * @return {void}
         */
        (res) => {
            res.on('data', (/**
             * @param {?} buf
             * @return {number}
             */
            buf => bufs.push(buf)));
            res.on('end', (/**
             * @return {void}
             */
            () => {
                // Cast bufs to the type expected by Buffer.concat
                // Node.js Buffer instances are Uint8Arrays, so this cast is
                // safe.
                resolve(Buffer.concat((/** @type {!ReadonlyArray<!Uint8Array>} */ (bufs))));
            }));
        }));
        req.on('error', (/**
         * @param {!Error} e
         * @return {void}
         */
        (e) => {
            if (onError) {
                onError(e);
            }
            reject(e);
        }));
        req.end(body);
    })).then((/**
     * @param {?} buf
     * @return {!LogResponse}
     */
    (buf) => {
        try {
            return decodeLogResponse(buf) || {};
        }
        catch {
            return {};
        }
    }));
}
exports.postMetricsToConcordServer = postMetricsToConcordServer;
