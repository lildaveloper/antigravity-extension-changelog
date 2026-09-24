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
 * Generated from: third_party/javascript/connectrpc_connect/src/protocol/async-iterable.ts
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
goog.module('google3.third_party.javascript.connectrpc_connect.src.protocol.async$2diterable');
var module = module || { id: 'third_party/javascript/connectrpc_connect/src/protocol/async-iterable.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_code_1 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.code");
const tsickle_connect_error_2 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.connect$2derror");
const tsickle_envelope_3 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.envelope");
const tsickle_serialization_4 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.serialization");
const tsickle_compression_5 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.compression");
const tsickle_limit_io_6 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.protocol.limit$2dio");
const code_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.code');
const connect_error_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.connect$2derror');
const envelope_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol.envelope');
const envelope_js_2 = envelope_js_1;
const limit_io_js_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.protocol.limit$2dio');
/**
 * A function that takes an asynchronous iterable as a source, and returns a
 * transformed asynchronous iterable.
 *
 * The following function is a simple no-op implementation that yields every
 * element from the source:
 *
 * ```ts
 * async function* t<T>(input) {
 *   yield* input;
 * }
 * ```
 *
 * The following function takes fetch responses as a source, and yields the
 * text body of each:
 *
 * ```ts
 * async function* t<T>(input: AsyncIterable<Response>): AsyncIterable<string> {
 *   for await (const r of input) {
 *     yield await r.text();
 *   }
 * }
 * ```
 *
 * Transformation functions can be passed to pipe() and pipeTo().
 *
 * @typedef {function(!AsyncIterable<?, ?, ?>): !AsyncIterable<?, ?, ?>}
 */
exports.AsyncIterableTransform;
/**
 * A function that takes an asynchronous iterable as a source and consumes it
 * to the end, optionally returning a cumulative value.
 *
 * Sinks are the used with pipeTo().
 *
 * @typedef {function(!AsyncIterable<?, ?, ?>): !Promise<?>}
 */
exports.AsyncIterableSink;
/**
 * Options for pipe() and pipeTo().
 *
 * @record
 */
function PipeOptions() { }
/* istanbul ignore if */
if (false) {
    /**
     * Set to true to abort the source iterable on downstream errors.
     * The source iterable must not swallow errors raised by yield.
     *
     * Why? If iterators are chained, any error raised by the source or any
     * transform travels down the stream. But if an error happens downstream, the
     * source and transformations are left dangling:
     *
     * ```ts
     * async function source*() {
     *   const conn = await dbConn();
     *   yield await conn.query("SELECT 1"); // consumed downstream
     *   yield await conn.query("SELECT 2"); // never consumed
     *   conn.close(); // never runs
     * }
     * for await (const element of source()) {
     *   // let's say we try to write the element to disk, but the disk is full
     *   throw "err";
     * }
     * ```
     *
     * If this option is set to true, an error raised by the sink function given
     * to pipeTo() will raise the same error in the source iterable.
     *
     * ```ts
     * async function source*() {
     *   const conn = await dbConn();
     *   try {
     *     yield await conn.query("SELECT 1"); // consumed downstream
     *     yield await conn.query("SELECT 2"); // never consumed
     *   } finally {
     *     conn.close(); // runs!
     *   }
     * }
     * await pipeTo(source(), async iterable => {
     *   for await (const element of source()) {
     *     // let's say we try to write the element to disk, but the disk is full
     *     throw "err";
     *   }
     * }, { propagateDownStreamError: true });
     * ```
     *
     * If this option is set to true with pipe(), the downstream consumer of the
     * iterable returned by pipe() can abort the source iterable by calling throw()
     * on the iterator.
     * @type {(undefined|boolean)}
     * @public
     */
    PipeOptions.prototype.propagateDownStreamError;
}
/**
 * ParsedEnvelopedMessage is the deserialized counterpart to an
 * EnvelopedMessage.
 *
 * It is either a deserialized message M, or a deserialized end-of-stream
 * message E, typically distinguished by a flag on an enveloped message.
 *
 * @typedef {{end: boolean, value: ?}}
 */
var ParsedEnvelopedMessage;
/**
 * @param {!AsyncIterable<*, ?, ?>} source
 * @param {...*} rest
 * @return {!Promise<*>}
 */
function pipeTo(source, ...rest) {
    const [transforms__tsickle_destructured_1, sink__tsickle_destructured_2, opt__tsickle_destructured_3] = pickTransformsAndSink(rest);
    const transforms = /** @type {!Array<function(!AsyncIterable<*, ?, ?>): !AsyncIterable<*, ?, ?>>} */ (transforms__tsickle_destructured_1);
    const sink = /** @type {function(!AsyncIterable<*, ?, ?>): !Promise<void>} */ (sink__tsickle_destructured_2);
    const opt = /** @type {(undefined|!PipeOptions)} */ (opt__tsickle_destructured_3);
    /** @type {!AsyncIterable<*, ?, ?>} */
    let iterable = source;
    /** @type {(undefined|!Abortable)} */
    let abortable;
    if (opt?.propagateDownStreamError === true) {
        iterable = abortable = makeIterableAbortable(iterable);
    }
    // @ts-ignore
    iterable = pipe(iterable, ...transforms, { propagateDownStreamError: false });
    return sink(iterable).catch((/**
     * @param {?} reason
     * @return {!Promise<?>}
     */
    (reason) => {
        if (abortable) {
            return abortable.abort(reason).then((/**
             * @return {!Promise<?>}
             */
            () => Promise.reject(reason)));
        }
        return Promise.reject(reason);
    }));
}
exports.pipeTo = pipeTo;
// pick transforms, the sink, and options from the pipeTo() rest parameter
/**
 * @param {!Array<*>} rest
 * @return {!Array<?>}
 */
function pickTransformsAndSink(rest) {
    /** @type {(undefined|!PipeOptions)} */
    let opt;
    if (typeof rest[rest.length - 1] != "function") {
        opt = (/** @type {!PipeOptions} */ (rest.pop()));
    }
    /** @type {function(!AsyncIterable<*, ?, ?>): !Promise<void>} */
    const sink = (/** @type {function(!AsyncIterable<*, ?, ?>): !Promise<void>} */ (rest.pop()));
    return [(/** @type {!Array<function(!AsyncIterable<*, ?, ?>): !AsyncIterable<*, ?, ?>>} */ (rest)), sink, opt];
}
/**
 * Creates an AsyncIterableSink that concatenates all elements from the input.
 *
 * @template T
 * @return {function(!AsyncIterable<T, ?, ?>): !Promise<!Array<T>>}
 */
function sinkAll() {
    return (/**
     * @param {!AsyncIterable<T, ?, ?>} iterable
     * @return {!Promise<!Array<T>>}
     */
    async (iterable) => {
        /** @type {!Array<T>} */
        const all = [];
        for await (const chunk of iterable) {
            all.push(chunk);
        }
        return all;
    });
}
exports.sinkAll = sinkAll;
/**
 * Creates an AsyncIterableSink that concatenates all chunks from the input into
 * a single Uint8Array.
 *
 * The iterable raises an error if the more than readMaxBytes are read.
 *
 * An optional length hint can be provided to optimize allocation and validation.
 * If more or less bytes are present in the source that the length hint indicates,
 * and error is raised.
 * If the length hint is larger than readMaxBytes, an error is raised.
 * If the length hint is not a positive integer, it is ignored.
 *
 * @param {number} readMaxBytes
 * @param {(undefined|null|string|number)=} lengthHint
 * @return {function(!AsyncIterable<!Uint8Array, ?, ?>): !Promise<!Uint8Array>}
 */
function sinkAllBytes(readMaxBytes, lengthHint) {
    return (/**
     * @param {!AsyncIterable<!Uint8Array, ?, ?>} iterable
     * @return {!Promise<!Uint8Array>}
     */
    async (iterable) => await readAllBytes(iterable, readMaxBytes, lengthHint));
}
exports.sinkAllBytes = sinkAllBytes;
/**
 * @template I, O
 * @param {!AsyncIterable<I, ?, ?>} source
 * @param {...(undefined|function(!AsyncIterable<*, ?, ?>): !AsyncIterable<*, ?, ?>|!PipeOptions)} rest
 * @return {!AsyncIterable<O, ?, ?>}
 */
async function* pipe(source, ...rest) {
    const [transforms__tsickle_destructured_4, opt__tsickle_destructured_5] = pickTransforms(rest);
    const transforms = /** @type {!Array<function(!AsyncIterable<*, ?, ?>): !AsyncIterable<*, ?, ?>>} */ (transforms__tsickle_destructured_4);
    const opt = /** @type {(undefined|!PipeOptions)} */ (opt__tsickle_destructured_5);
    /** @type {(undefined|!Abortable)} */
    let abortable;
    /** @type {!AsyncIterator<I, ?, ?>} */
    const sourceIt = source[Symbol.asyncIterator]();
    /** @type {*} */
    const cachedSource = {
        /**
         * @public
         * @return {!AsyncIterator<I, ?, ?>}
         */
        [Symbol.asyncIterator]() {
            return sourceIt;
        },
    };
    /** @type {!AsyncIterable<*, ?, ?>} */
    let iterable = cachedSource;
    if (opt?.propagateDownStreamError === true) {
        iterable = abortable = makeIterableAbortable(iterable);
    }
    for (const t of transforms) {
        iterable = t(iterable);
    }
    /** @type {!AsyncIterator<*, ?, ?>} */
    const it = iterable[Symbol.asyncIterator]();
    try {
        for (;;) {
            /** @type {(!IteratorReturnResult<?>|!IteratorYieldResult<*>)} */
            const r = await it.next();
            if (r.done === true) {
                break;
            }
            if (!abortable) {
                yield (/** @type {O} */ ((/** @type {!IteratorYieldResult<*>} */ (r)).value));
                continue;
            }
            try {
                yield (/** @type {O} */ ((/** @type {!IteratorYieldResult<*>} */ (r)).value));
            }
            catch (e) {
                await abortable.abort(e); // propagate downstream error to the source
                throw e;
            }
        }
    }
    finally {
        if (opt?.propagateDownStreamError === true) {
            // Call return on the source iterable to indicate
            // that we will no longer consume it and it should
            // cleanup any allocated resources.
            sourceIt.return?.().catch((/**
             * @return {void}
             */
            () => {
                // return returns a promise, which we don't care about.
                //
                // Uncaught promises are thrown at sometime/somewhere by the event loop,
                // this is to ensure error is caught and ignored.
            }));
        }
    }
}
exports.pipe = pipe;
/**
 * @param {!Array<(undefined|function(!AsyncIterable<*, ?, ?>): !AsyncIterable<*, ?, ?>|!PipeOptions)>} rest
 * @return {!Array<?>}
 */
function pickTransforms(rest) {
    /** @type {(undefined|!PipeOptions)} */
    let opt;
    if (typeof rest[rest.length - 1] != "function") {
        opt = (/** @type {!PipeOptions} */ (rest.pop()));
    }
    return [(/** @type {!Array<function(!AsyncIterable<*, ?, ?>): !AsyncIterable<*, ?, ?>>} */ (rest)), opt];
}
/**
 * Creates an AsyncIterableTransform that catches any error from the input, and
 * passes it to the given catchError function.
 *
 * The catchError function may return a final value.
 *
 * @template T
 * @param {(function(*): void|function(*): (undefined|T)|function(*): !Promise<(undefined|T)>)} catchError
 * @return {function(!AsyncIterable<T, ?, ?>): !AsyncIterable<T, ?, ?>}
 */
function transformCatch(catchError) {
    return (/**
     * @param {!AsyncIterable<T, ?, ?>} iterable
     * @return {!AsyncGenerator<?, void, ?>}
     */
    async function* (iterable) {
        // we deliberate avoid a for-await loop because we only want to catch upstream
        // errors, not downstream errors (yield).
        /** @type {!AsyncIterator<T, ?, ?>} */
        const it = iterable[Symbol.asyncIterator]();
        for (;;) {
            /** @type {(!IteratorReturnResult<?>|!IteratorYieldResult<T>)} */
            let r;
            try {
                r = await it.next();
            }
            catch (e) {
                /** @type {(undefined|void|?)} */
                const caught = await catchError(e);
                if (caught !== undefined) {
                    yield caught;
                }
                break;
            }
            if (r.done === true) {
                break;
            }
            yield (/** @type {!IteratorYieldResult<T>} */ (r)).value;
        }
    });
}
exports.transformCatch = transformCatch;
/** @typedef {(function(*): void|function(*): (undefined|?)|function(*): !Promise<(undefined|?)>)} */
var TransformCatchErrorFn;
/**
 * Creates an AsyncIterableTransform that catches any error from the input, and
 * passes it to the given function. Unlike transformCatch(), the given function
 * is also called when no error is raised.
 *
 * @template T
 * @param {(function(*): void|function(*): (undefined|T)|function(*): !Promise<(undefined|T)>)} catchFinally
 * @return {function(!AsyncIterable<T, ?, ?>): !AsyncIterable<T, ?, ?>}
 */
function transformCatchFinally(catchFinally) {
    return (/**
     * @param {!AsyncIterable<T, ?, ?>} iterable
     * @return {!AsyncGenerator<?, void, ?>}
     */
    async function* (iterable) {
        // we deliberate avoid a for-await loop because we only want to catch upstream
        // errors, not downstream errors (yield).
        /** @type {*} */
        let err;
        /** @type {!AsyncIterator<T, ?, ?>} */
        const it = iterable[Symbol.asyncIterator]();
        for (;;) {
            /** @type {(!IteratorReturnResult<?>|!IteratorYieldResult<T>)} */
            let r;
            try {
                r = await it.next();
            }
            catch (e) {
                err = e;
                break;
            }
            if (r.done === true) {
                break;
            }
            yield (/** @type {!IteratorYieldResult<T>} */ (r)).value;
        }
        /** @type {(undefined|void|?)} */
        const caught = await catchFinally(err);
        if (caught !== undefined) {
            yield caught;
        }
    });
}
exports.transformCatchFinally = transformCatchFinally;
/**
 * The function to always run at the end of an async iterable.
 * If an error was caught, it is passed as the `reason` argument.
 * If the iterable finished successfully, `reason` is undefined.
 * @typedef {(function(*): void|function(*): (undefined|?)|function(*): !Promise<(undefined|?)>)}
 */
var TransformCatchFinallyFn;
/**
 * Creates an AsyncIterableTransform that appends a value.
 *
 * The element to append is provided by a function. If the function returns
 * undefined, no element is appended.
 *
 * @template T
 * @param {?} provide
 * @return {function(!AsyncIterable<?, ?, ?>): !AsyncIterable<?, ?, ?>}
 */
function transformAppend(provide) {
    return (/**
     * @param {!AsyncIterable<?, ?, ?>} iterable
     * @return {!AsyncGenerator<?, void, ?>}
     */
    async function* (iterable) {
        for await (const chunk of iterable) {
            yield chunk;
        }
        /** @type {(undefined|?)} */
        const append = await provide();
        if (append !== undefined) {
            yield append;
        }
    });
}
exports.transformAppend = transformAppend;
/**
 * Creates an AsyncIterableTransform that prepends an element.
 *
 * The element to prepend is provided by a function. If the function returns
 * undefined, no element is appended.
 *
 * @template T
 * @param {?} provide
 * @return {function(!AsyncIterable<?, ?, ?>): !AsyncIterable<?, ?, ?>}
 */
function transformPrepend(provide) {
    return (/**
     * @param {!AsyncIterable<?, ?, ?>} iterable
     * @return {!AsyncGenerator<?, void, ?>}
     */
    async function* (iterable) {
        /** @type {(undefined|?)} */
        const prepend = await provide();
        if (prepend !== undefined) {
            yield prepend;
        }
        for await (const chunk of iterable) {
            yield chunk;
        }
    });
}
exports.transformPrepend = transformPrepend;
/** @typedef {?} */
var TransformXpendProvide;
/**
 * Creates an AsyncIterableTransform that reads all bytes from the input, and
 * concatenates them to a single Uint8Array.
 *
 * The iterable raises an error if the more than readMaxBytes are read.
 *
 * An optional length hint can be provided to optimize allocation and validation.
 * If more or less bytes are present in the source that the length hint indicates,
 * and error is raised.
 * If the length hint is larger than readMaxBytes, an error is raised.
 * If the length hint is not a positive integer, it is ignored.
 *
 * @param {number} readMaxBytes
 * @param {(undefined|null|string|number)=} lengthHint
 * @return {function(!AsyncIterable<!Uint8Array, ?, ?>): !AsyncIterable<!Uint8Array, ?, ?>}
 */
function transformReadAllBytes(readMaxBytes, lengthHint) {
    return (/**
     * @param {!AsyncIterable<!Uint8Array, ?, ?>} iterable
     * @return {!AsyncGenerator<!Uint8Array, void, ?>}
     */
    async function* (iterable) {
        yield await readAllBytes(iterable, readMaxBytes, lengthHint);
    });
}
exports.transformReadAllBytes = transformReadAllBytes;
/**
 * @template T, E
 * @param {!tsickle_serialization_4.Serialization<T>} serialization
 * @param {(undefined|number)=} endStreamFlag
 * @param {(undefined|!tsickle_serialization_4.Serialization<E>)=} endSerialization
 * @return {(function(!AsyncIterable<T, ?, ?>): !AsyncIterable<!tsickle_envelope_3.EnvelopedMessage, ?, ?>|function(!AsyncIterable<({end: boolean, value: T}|{end: boolean, value: E}), ?, ?>): !AsyncIterable<!tsickle_envelope_3.EnvelopedMessage, ?, ?>)}
 */
function transformSerializeEnvelope(serialization, endStreamFlag, endSerialization) {
    if (endStreamFlag === undefined || endSerialization === undefined) {
        return (/**
         * @param {!AsyncIterable<T, ?, ?>} iterable
         * @return {!AsyncIterable<!tsickle_envelope_3.EnvelopedMessage, ?, ?>}
         */
        async function* (iterable) {
            for await (const chunk of iterable) {
                /** @type {!Uint8Array} */
                const data = serialization.serialize(chunk);
                yield { flags: 0, data };
            }
        });
    }
    return (/**
     * @param {!AsyncIterable<({end: boolean, value: T}|{end: boolean, value: E}), ?, ?>} iterable
     * @return {!AsyncIterable<!tsickle_envelope_3.EnvelopedMessage, ?, ?>}
     */
    async function* (iterable) {
        for await (const chunk of iterable) {
            /** @type {!Uint8Array} */
            let data;
            /** @type {number} */
            let flags = 0;
            if (chunk.end) {
                flags = flags | endStreamFlag;
                data = endSerialization.serialize((/** @type {{end: boolean, value: E}} */ (chunk)).value);
            }
            else {
                data = serialization.serialize((/** @type {{end: boolean, value: T}} */ (chunk)).value);
            }
            yield { flags, data };
        }
    });
}
exports.transformSerializeEnvelope = transformSerializeEnvelope;
/**
 * @template T, E
 * @param {!tsickle_serialization_4.Serialization<T>} serialization
 * @param {(undefined|number)=} endStreamFlag
 * @param {(undefined|null|!tsickle_serialization_4.Serialization<E>)=} endSerialization
 * @return {(function(!AsyncIterable<!tsickle_envelope_3.EnvelopedMessage, ?, ?>): !AsyncIterable<T, ?, ?>|function(!AsyncIterable<!tsickle_envelope_3.EnvelopedMessage, ?, ?>): !AsyncIterable<({end: boolean, value: T}|{end: boolean, value: E}), ?, ?>)}
 */
function transformParseEnvelope(serialization, endStreamFlag, endSerialization) {
    // code path always yields ParsedEnvelopedMessage<T, E>
    if (endSerialization && endStreamFlag !== undefined) {
        return (/**
         * @param {!AsyncIterable<!tsickle_envelope_3.EnvelopedMessage, ?, ?>} iterable
         * @return {!AsyncIterable<({end: boolean, value: T}|{end: boolean, value: E}), ?, ?>}
         */
        async function* (iterable) {
            for await (const { flags, data } of iterable) {
                if ((flags & endStreamFlag) === endStreamFlag) {
                    yield { value: endSerialization.parse(data), end: true };
                }
                else {
                    yield { value: serialization.parse(data), end: false };
                }
            }
        });
    }
    // code path always yields T
    return (/**
     * @param {!AsyncIterable<!tsickle_envelope_3.EnvelopedMessage, ?, ?>} iterable
     * @return {!AsyncIterable<T, ?, ?>}
     */
    async function* (iterable) {
        for await (const { flags, data } of iterable) {
            if (endStreamFlag !== undefined &&
                (flags & endStreamFlag) === endStreamFlag) {
                if (endSerialization === null) {
                    throw new connect_error_js_1.ConnectError("unexpected end flag", code_js_1.Code.InvalidArgument);
                }
                // skips end-of-stream envelope
                continue;
            }
            yield serialization.parse(data);
        }
    });
}
exports.transformParseEnvelope = transformParseEnvelope;
/**
 * Creates an AsyncIterableTransform that takes enveloped messages as a source,
 * and compresses them if they are larger than compressMinBytes.
 *
 * @param {(null|!tsickle_compression_5.Compression)} compression
 * @param {number} compressMinBytes
 * @return {function(!AsyncIterable<!tsickle_envelope_3.EnvelopedMessage, ?, ?>): !AsyncIterable<!tsickle_envelope_3.EnvelopedMessage, ?, ?>}
 */
function transformCompressEnvelope(compression, compressMinBytes) {
    return (/**
     * @param {!AsyncIterable<!tsickle_envelope_3.EnvelopedMessage, ?, ?>} iterable
     * @return {!AsyncGenerator<!tsickle_envelope_3.EnvelopedMessage, void, ?>}
     */
    async function* (iterable) {
        for await (const env of iterable) {
            yield await (0, envelope_js_2.envelopeCompress)(env, compression, compressMinBytes);
        }
    });
}
exports.transformCompressEnvelope = transformCompressEnvelope;
/**
 * Creates an AsyncIterableTransform that takes enveloped messages as a source,
 * and decompresses them using the given compression.
 *
 * The iterable raises an error if the decompressed payload of an enveloped
 * message is larger than readMaxBytes, or if no compression is provided.
 *
 * @param {(null|!tsickle_compression_5.Compression)} compression
 * @param {number} readMaxBytes
 * @return {function(!AsyncIterable<!tsickle_envelope_3.EnvelopedMessage, ?, ?>): !AsyncIterable<!tsickle_envelope_3.EnvelopedMessage, ?, ?>}
 */
function transformDecompressEnvelope(compression, readMaxBytes) {
    return (/**
     * @param {!AsyncIterable<!tsickle_envelope_3.EnvelopedMessage, ?, ?>} iterable
     * @return {!AsyncGenerator<!tsickle_envelope_3.EnvelopedMessage, void, ?>}
     */
    async function* (iterable) {
        for await (const env of iterable) {
            yield await (0, envelope_js_2.envelopeDecompress)(env, compression, readMaxBytes);
        }
    });
}
exports.transformDecompressEnvelope = transformDecompressEnvelope;
/**
 * Create an AsyncIterableTransform that takes enveloped messages as a source,
 * and joins them into a stream of raw bytes.
 *
 * @return {function(!AsyncIterable<!tsickle_envelope_3.EnvelopedMessage, ?, ?>): !AsyncIterable<!Uint8Array, ?, ?>}
 */
function transformJoinEnvelopes() {
    return (/**
     * @param {!AsyncIterable<!tsickle_envelope_3.EnvelopedMessage, ?, ?>} iterable
     * @return {!AsyncGenerator<!Uint8Array, void, ?>}
     */
    async function* (iterable) {
        for await (const { flags, data } of iterable) {
            yield (0, envelope_js_2.encodeEnvelope)(flags, data);
        }
    });
}
exports.transformJoinEnvelopes = transformJoinEnvelopes;
/**
 * Create an AsyncIterableTransform that takes raw bytes as a source, and splits
 * them into enveloped messages.
 *
 * The iterable raises an error
 * - if the payload of an enveloped message is larger than readMaxBytes,
 * - if the stream ended before an enveloped message fully arrived,
 * - or if the stream ended with extraneous data.
 *
 * @param {number} readMaxBytes
 * @return {function(!AsyncIterable<!Uint8Array, ?, ?>): !AsyncIterable<!tsickle_envelope_3.EnvelopedMessage, ?, ?>}
 */
function transformSplitEnvelope(readMaxBytes) {
    return (/**
     * @param {!AsyncIterable<!Uint8Array, ?, ?>} iterable
     * @return {!AsyncIterable<!tsickle_envelope_3.EnvelopedMessage, ?, ?>}
     */
    async function* (iterable) {
        /** @type {{decode: function(!Uint8Array): !Array<!tsickle_envelope_3.EnvelopedMessage>, byteLength: number, readMaxBytes: number}} */
        const buffer = (0, envelope_js_1.createEnvelopeDecoder)(readMaxBytes);
        for await (const chunk of iterable) {
            for (const env of buffer.decode(chunk)) {
                yield env;
            }
        }
        if (buffer.byteLength > 0) {
            throw new connect_error_js_1.ConnectError("protocol error: incomplete envelope", code_js_1.Code.InvalidArgument);
        }
    });
}
exports.transformSplitEnvelope = transformSplitEnvelope;
/**
 * Reads all bytes from the source, and concatenates them to a single Uint8Array.
 *
 * Raises an error if:
 * - more than readMaxBytes are read
 * - lengthHint is a positive integer, but larger than readMaxBytes
 * - lengthHint is a positive integer, and the source contains more or less bytes
 *   than promised
 *
 * @param {!AsyncIterable<!Uint8Array, ?, ?>} iterable
 * @param {number} readMaxBytes
 * @param {(undefined|null|string|number)=} lengthHint
 * @return {!Promise<!Uint8Array>}
 */
async function readAllBytes(iterable, readMaxBytes, lengthHint) {
    const [ok__tsickle_destructured_6, hint__tsickle_destructured_7] = parseLengthHint(lengthHint);
    const ok = /** @type {boolean} */ (ok__tsickle_destructured_6);
    const hint = /** @type {number} */ (hint__tsickle_destructured_7);
    if (ok) {
        if (hint > readMaxBytes) {
            (0, limit_io_js_1.assertReadMaxBytes)(readMaxBytes, hint, true);
        }
        /** @type {!Uint8Array} */
        const buffer = new Uint8Array(hint);
        /** @type {number} */
        let offset = 0;
        for await (const chunk of iterable) {
            if (offset + chunk.byteLength > hint) {
                throw new connect_error_js_1.ConnectError(`protocol error: promised ${hint} bytes, received ${offset + chunk.byteLength}`, code_js_1.Code.InvalidArgument);
            }
            buffer.set(chunk, offset);
            offset += chunk.byteLength;
        }
        if (offset < hint) {
            throw new connect_error_js_1.ConnectError(`protocol error: promised ${hint} bytes, received ${offset}`, code_js_1.Code.InvalidArgument);
        }
        return buffer;
    }
    /** @type {!Array<!Uint8Array>} */
    const chunks = [];
    /** @type {number} */
    let count = 0;
    for await (const chunk of iterable) {
        count += chunk.byteLength;
        (0, limit_io_js_1.assertReadMaxBytes)(readMaxBytes, count);
        chunks.push(chunk);
    }
    /** @type {!Uint8Array} */
    const all = new Uint8Array(count);
    /** @type {number} */
    let offset = 0;
    for (let chunk = chunks.shift(); chunk; chunk = chunks.shift()) {
        all.set(chunk, offset);
        offset += chunk.byteLength;
    }
    return all;
}
exports.readAllBytes = readAllBytes;
// parse the lengthHint argument of readAllBytes()
/**
 * @param {(undefined|null|string|number)} lengthHint
 * @return {!Array<?>}
 */
function parseLengthHint(lengthHint) {
    if (lengthHint === undefined || lengthHint === null) {
        return [false, 0];
    }
    /** @type {number} */
    const n = typeof lengthHint == "string" ? parseInt(lengthHint, 10) : lengthHint;
    if (!Number.isSafeInteger(n) || n < 0) {
        return [false, n];
    }
    return [true, n];
}
/**
 * Wait for the first element of an iterable without modifying the iterable.
 * This consumes the first element, but pushes it back on the stack.
 *
 * @template T
 * @param {!AsyncIterable<T, ?, ?>} iterable
 * @return {!Promise<!AsyncIterable<T, ?, ?>>}
 */
async function untilFirst(iterable) {
    /** @type {!AsyncIterator<T, ?, ?>} */
    const it = iterable[Symbol.asyncIterator]();
    /** @type {(null|!IteratorReturnResult<?>|!IteratorYieldResult<T>)} */
    let first = await it.next();
    return {
        /**
         * @public
         * @return {!AsyncIterator<T, ?, ?>}
         */
        [Symbol.asyncIterator]() {
            /** @type {!AsyncIterator<T, ?, ?>} */
            const w = {
                /**
                 * @public
                 * @return {!Promise<(!IteratorReturnResult<?>|!IteratorYieldResult<T>)>}
                 */
                async next() {
                    if (first !== null) {
                        /** @type {(!IteratorReturnResult<?>|!IteratorYieldResult<T>)} */
                        const n = first;
                        first = null;
                        return n;
                    }
                    return await it.next();
                },
            };
            if (it.throw !== undefined) {
                w.throw = (/**
                 * @param {*} e
                 * @return {!Promise<(!IteratorReturnResult<?>|!IteratorYieldResult<T>)>}
                 */
                (e) => ((/** @type {?} */ (it))).throw(e));
            }
            if (it.return !== undefined) {
                w.return = (/**
                 * @param {*=} value
                 * @return {!Promise<(!IteratorReturnResult<?>|!IteratorYieldResult<T>)>}
                 */
                (value) => ((/** @type {?} */ (it))).return(value));
            }
            return w;
        },
    };
}
exports.untilFirst = untilFirst;
/**
 * @record
 */
function Abortable() { }
/* istanbul ignore if */
if (false) {
    /**
     * Abort the iterator.
     * @const {function(*): !Promise<string>}
     * @public
     */
    Abortable.prototype.abort;
}
/** @typedef {string} */
var AbortState;
/**
 * Wrap the given iterable and return an iterable with an abort() method.
 *
 * This function exists purely for convenience. Where one would typically have
 * to access the iterator directly, advance through all elements, and call
 * AsyncIterator.throw() to notify the upstream iterable, this function allows
 * to use convenient for-await loops and still notify the upstream iterable:
 *
 * ```ts
 * const abortable = makeIterableAbortable(iterable);
 * for await (const ele of abortable) {
 *   await abortable.abort("ERR");
 * }
 * ```
 * There are a couple of limitations of this function:
 * - the given async iterable must implement throw
 * - the async iterable cannot be re-use
 * - if source catches errors and yields values for them, they are ignored, and
 *   the source may still dangle
 *
 * There are four possible ways an async function* can handle yield errors:
 * 1. don't catch errors at all - Abortable.abort() will resolve "rethrown"
 * 2. catch errors and rethrow - Abortable.abort() will resolve "rethrown"
 * 3. catch errors and return - Abortable.abort() will resolve "completed"
 * 4. catch errors and yield a value - Abortable.abort() will resolve "caught"
 *
 * Note that catching errors and yielding a value is problematic, and it should
 * be documented that this may leave the source in a dangling state.
 *
 * @template T
 * @param {!AsyncIterable<T, ?, ?>} iterable
 * @return {?}
 */
function makeIterableAbortable(iterable) {
    /** @type {!AsyncIterator<T, ?, ?>} */
    const innerCandidate = iterable[Symbol.asyncIterator]();
    if (innerCandidate.throw === undefined) {
        throw new Error("AsyncIterable does not implement throw");
    }
    /** @type {?} */
    const inner = (/** @type {?} */ (innerCandidate));
    /** @type {(undefined|{reason: *, state: !Promise<string>})} */
    let aborted;
    /** @type {(undefined|!Promise<(!IteratorReturnResult<?>|!IteratorYieldResult<T>)>)} */
    let resultPromise;
    /** @type {!AsyncIterator<T, ?, ?>} */
    let it = {
        /**
         * @public
         * @return {!Promise<(!IteratorReturnResult<?>|!IteratorYieldResult<T>)>}
         */
        next() {
            resultPromise = inner.next().finally((/**
             * @return {void}
             */
            () => {
                resultPromise = undefined;
            }));
            return resultPromise;
        },
        /**
         * @public
         * @param {*=} e
         * @return {!Promise<(!IteratorReturnResult<?>|!IteratorYieldResult<T>)>}
         */
        throw(e) {
            return inner.throw(e);
        },
    };
    if (innerCandidate.return !== undefined) {
        it = {
            ...it,
            /**
             * @public
             * @param {*=} value
             * @return {!Promise<(!IteratorReturnResult<?>|!IteratorYieldResult<T>)>}
             */
            return(value) {
                return inner.return(value);
            },
        };
    }
    /** @type {boolean} */
    let used = false;
    return {
        /**
         * @public
         * @param {*} reason
         * @return {!Promise<string>}
         */
        abort(reason) {
            if (aborted) {
                return aborted.state;
            }
            /** @type {function(): !Promise<string>} */
            const f = (/**
             * @return {!Promise<string>}
             */
            () => {
                return inner.throw(reason).then((/**
                 * @param {(!IteratorReturnResult<?>|!IteratorYieldResult<T>)} r
                 * @return {string}
                 */
                (r) => (r.done === true ? "completed" : "caught")), (/**
                 * @return {string}
                 */
                () => "rethrown"));
            });
            if (resultPromise) {
                aborted = { reason, state: resultPromise.then(f, f) };
                return aborted.state;
            }
            aborted = { reason, state: f() };
            return aborted.state;
        },
        /**
         * @public
         * @return {!AsyncIterator<T, ?, ?>}
         */
        [Symbol.asyncIterator]() {
            if (used) {
                throw new Error("AsyncIterable cannot be re-used");
            }
            used = true;
            return it;
        },
    };
}
exports.makeIterableAbortable = makeIterableAbortable;
/**
 * WritableIterable is an AsyncIterable that can be used
 * to supply values imperatively to the consumer of the
 * AsyncIterable.
 * @record
 * @template T
 * @extends {AsyncIterable<T, ?>}
 */
function WritableIterable() { }
exports.WritableIterable = WritableIterable;
/* istanbul ignore if */
if (false) {
    /**
     * Makes the payload available to the consumer of the
     * iterable.
     * @type {function(T): !Promise<void>}
     * @public
     */
    WritableIterable.prototype.write;
    /**
     * Closes the writer indicating to its consumer that no further
     * payloads will be received.
     *
     * Any writes that happen after close is called will return an error.
     * @type {function(): void}
     * @public
     */
    WritableIterable.prototype.close;
}
/**
 * Create a new WritableIterable.
 * @template T
 * @return {!WritableIterable<T>}
 */
function createWritableIterable() {
    // We start with two queues to capture the read and write attempts.
    //
    // The writes and reads each check of their counterpart is
    // already available and either interact/add themselves to the queue.
    /** @type {!Array<function((!IteratorReturnResult<undefined>|!IteratorYieldResult<T>)): void>} */
    const readQueue = [];
    /** @type {!Array<T>} */
    const writeQueue = [];
    /** @type {*} */
    let err = undefined;
    /** @type {function(): void} */
    let nextResolve;
    /** @type {function(*): void} */
    let nextReject;
    /** @type {!Promise<void>} */
    let nextPromise = new Promise((/**
     * @param {function((void|!PromiseLike<void>)): void} resolve
     * @param {function(?=): void} reject
     * @return {void}
     */
    (resolve, reject) => {
        nextResolve = resolve;
        nextReject = reject;
    }));
    /** @type {boolean} */
    let closed = false;
    // drain the readQueue in case of error/writer is closed by sending a
    // done result.
    /**
     * @return {void}
     */
    function drain() {
        for (const next of readQueue.splice(0, readQueue.length)) {
            next({ done: true, value: undefined });
        }
    }
    return {
        /**
         * @public
         * @return {void}
         */
        close() {
            closed = true;
            drain();
        },
        /**
         * @public
         * @param {T} payload
         * @return {!Promise<void>}
         */
        async write(payload) {
            if (closed) {
                throw err ?? new Error("cannot write, WritableIterable already closed");
            }
            /** @type {(undefined|function((!IteratorReturnResult<undefined>|!IteratorYieldResult<T>)): void)} */
            const read = readQueue.shift();
            if (read === undefined) {
                // We didn't find a pending read so we add the payload to the write queue.
                writeQueue.push(payload);
            }
            else {
                // We found a pending read so we respond with the payload.
                read({ done: false, value: payload });
                if (readQueue.length > 0) {
                    // If there are more in the read queue we can mark the write as complete.
                    // as the error reporting is not guaranteed to be sequential and therefore cannot
                    // to linked to a specific write.
                    return;
                }
            }
            // We await the next call for as many times as there are items in the queue + 1
            //
            // If there are no items in the write queue that means write happened and we just have
            // to wait for one more call likewise if we are the nth write in the queue we
            // have to wait for n writes to complete and one more.
            /** @type {number} */
            const limit = writeQueue.length + 1;
            for (let i = 0; i < limit; i++) {
                await nextPromise;
            }
        },
        /**
         * @public
         * @return {!AsyncIterator<T, ?, ?>}
         */
        [Symbol.asyncIterator]() {
            return {
                /**
                 * @public
                 * @return {!Promise<(!IteratorReturnResult<?>|!IteratorYieldResult<T>)>}
                 */
                next() {
                    // Resolve the nextPromise to indicate
                    // pending writes that a read attempt has been made
                    // after their write.
                    //
                    // We also need to reset the promise for future writes.
                    nextResolve();
                    nextPromise = new Promise((/**
                     * @param {function((void|!PromiseLike<void>)): void} resolve
                     * @param {function(?=): void} reject
                     * @return {void}
                     */
                    (resolve, reject) => {
                        nextResolve = resolve;
                        nextReject = reject;
                    }));
                    /** @type {(undefined|T)} */
                    const write = writeQueue.shift();
                    if (write !== undefined) {
                        // We found a pending write so response with the payload.
                        return Promise.resolve({ done: false, value: write });
                    }
                    if (closed) {
                        return Promise.resolve({ done: true, value: undefined });
                    }
                    // We return a promise immediately that is either resolved/rejected
                    // as writes happen.
                    /** @type {function((!IteratorReturnResult<?>|!IteratorYieldResult<T>)): void} */
                    let readResolve;
                    /** @type {!Promise<(!IteratorReturnResult<?>|!IteratorYieldResult<T>)>} */
                    const readPromise = new Promise((/**
                     * @param {function((!IteratorReturnResult<?>|!IteratorYieldResult<T>|!PromiseLike<(!IteratorReturnResult<?>|!IteratorYieldResult<T>)>)): void} resolve
                     * @return {void}
                     */
                    (resolve) => {
                        readResolve = resolve;
                    }));
                    // biome-ignore lint/style/noNonNullAssertion: initialized by promise executor
                    readQueue.push((/** @type {function((!IteratorReturnResult<?>|!IteratorYieldResult<T>)): void} */ (readResolve)));
                    return readPromise;
                },
                /**
                 * @public
                 * @param {*} throwErr
                 * @return {!Promise<{done: boolean, value: undefined}>}
                 */
                throw(throwErr) {
                    err = throwErr;
                    closed = true;
                    writeQueue.splice(0, writeQueue.length);
                    nextPromise.catch((/**
                     * @return {void}
                     */
                    () => {
                        // To make sure that the nextPromise is always resolved.
                    }));
                    // This will reject all pending writes.
                    nextReject(err);
                    drain();
                    return Promise.resolve({ done: true, value: undefined });
                },
                /**
                 * @public
                 * @return {!Promise<{done: boolean, value: undefined}>}
                 */
                return() {
                    closed = true;
                    writeQueue.splice(0, writeQueue.length);
                    // Resolve once for the write awaiting confirmation.
                    nextResolve();
                    // Reject all future writes.
                    nextPromise = Promise.reject(new Error("cannot write, consumer called return"));
                    nextPromise.catch((/**
                     * @return {void}
                     */
                    () => {
                        // To make sure that the nextPromise is always resolved.
                    }));
                    drain();
                    return Promise.resolve({ done: true, value: undefined });
                },
            };
        },
    };
}
exports.createWritableIterable = createWritableIterable;
/**
 * Create an asynchronous iterable from an array.
 *
 * @template T
 * @param {!Array<T>} items
 * @return {!AsyncIterable<T, ?, ?>}
 */
async function* createAsyncIterable(items) {
    yield* items;
}
exports.createAsyncIterable = createAsyncIterable;
