/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/antigravity/src/vs/base/common/stream.ts
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
goog.module('google3.third_party.antigravity.src.vs.base.common.stream');
var module = module || { id: 'third_party/antigravity/src/vs/base/common/stream.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_cancellation_1 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.cancellation");
const tsickle_errors_2 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.errors");
const tsickle_lifecycle_3 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.lifecycle");
const errors_1 = goog.require('google3.third_party.antigravity.src.vs.base.common.errors');
const lifecycle_1 = goog.require('google3.third_party.antigravity.src.vs.base.common.lifecycle');
/**
 * The payload that flows in readable stream events.
 * @typedef {(?|!Error|string)}
 */
exports.ReadableStreamEventPayload;
/**
 * @record
 * @template T
 */
function ReadableStreamEvents() { }
exports.ReadableStreamEvents = ReadableStreamEvents;
/* istanbul ignore if */
if (false) {
    /**
     * The 'data' event is emitted whenever the stream is
     * relinquishing ownership of a chunk of data to a consumer.
     *
     * NOTE: PLEASE UNDERSTAND THAT ADDING A DATA LISTENER CAN
     * TURN THE STREAM INTO FLOWING MODE. IT IS THEREFOR THE
     * LAST LISTENER THAT SHOULD BE ADDED AND NOT THE FIRST
     *
     * Use `listenStream` as a helper method to listen to
     * stream events in the right order.
     * @public
     * @param {string} event
     * @param {function(T): void} callback
     * @return {void}
     */
    ReadableStreamEvents.prototype.on = function (event, callback) { };
    /**
     * Emitted when any error occurs.
     * @public
     * @param {string} event
     * @param {function(!Error): void} callback
     * @return {void}
     */
    ReadableStreamEvents.prototype.on = function (event, callback) { };
    /**
     * The 'end' event is emitted when there is no more data
     * to be consumed from the stream. The 'end' event will
     * not be emitted unless the data is completely consumed.
     * @public
     * @param {string} event
     * @param {function(): void} callback
     * @return {void}
     */
    ReadableStreamEvents.prototype.on = function (event, callback) { };
}
/**
 * A interface that emulates the API shape of a node.js readable
 * stream for use in native and web environments.
 * @record
 * @template T
 * @extends {ReadableStreamEvents}
 */
function ReadableStream() { }
exports.ReadableStream = ReadableStream;
/* istanbul ignore if */
if (false) {
    /**
     * Stops emitting any events until resume() is called.
     * @public
     * @return {void}
     */
    ReadableStream.prototype.pause = function () { };
    /**
     * Starts emitting events again after pause() was called.
     * @public
     * @return {void}
     */
    ReadableStream.prototype.resume = function () { };
    /**
     * Destroys the stream and stops emitting any event.
     * @public
     * @return {void}
     */
    ReadableStream.prototype.destroy = function () { };
    /**
     * Allows to remove a listener that was previously added.
     * @public
     * @param {string} event
     * @param {!Function} callback
     * @return {void}
     */
    ReadableStream.prototype.removeListener = function (event, callback) { };
}
/**
 * A interface that emulates the API shape of a node.js readable
 * for use in native and web environments.
 * @record
 * @template T
 */
function Readable() { }
exports.Readable = Readable;
/* istanbul ignore if */
if (false) {
    /**
     * Read data from the underlying source. Will return
     * null to indicate that no more data can be read.
     * @public
     * @return {(null|T)}
     */
    Readable.prototype.read = function () { };
}
/**
 * @template T
 * @param {*} obj
 * @return {boolean}
 */
function isReadable(obj) {
    /** @type {(undefined|!Readable<T>)} */
    const candidate = (/** @type {(undefined|!Readable<T>)} */ (obj));
    if (!candidate) {
        return false;
    }
    return typeof candidate.read === 'function';
}
exports.isReadable = isReadable;
/**
 * A interface that emulates the API shape of a node.js writeable
 * stream for use in native and web environments.
 * @record
 * @template T
 * @extends {ReadableStream}
 */
function WriteableStream() { }
exports.WriteableStream = WriteableStream;
/* istanbul ignore if */
if (false) {
    /**
     * Writing data to the stream will trigger the on('data')
     * event listener if the stream is flowing and buffer the
     * data otherwise until the stream is flowing.
     *
     * If a `highWaterMark` is configured and writing to the
     * stream reaches this mark, a promise will be returned
     * that should be awaited on before writing more data.
     * Otherwise there is a risk of buffering a large number
     * of data chunks without consumer.
     * @public
     * @param {T} data
     * @return {(void|!Promise<void>)}
     */
    WriteableStream.prototype.write = function (data) { };
    /**
     * Signals an error to the consumer of the stream via the
     * on('error') handler if the stream is flowing.
     *
     * NOTE: call `end` to signal that the stream has ended,
     * this DOES NOT happen automatically from `error`.
     * @public
     * @param {!Error} error
     * @return {void}
     */
    WriteableStream.prototype.error = function (error) { };
    /**
     * Signals the end of the stream to the consumer. If the
     * result is provided, will trigger the on('data') event
     * listener if the stream is flowing and buffer the data
     * otherwise until the stream is flowing.
     * @public
     * @param {(undefined|T)=} result
     * @return {void}
     */
    WriteableStream.prototype.end = function (result) { };
}
/**
 * A stream that has a buffer already read. Returns the original stream
 * that was read as well as the chunks that got read.
 *
 * The `ended` flag indicates if the stream has been fully consumed.
 * @record
 * @template T
 */
function ReadableBufferedStream() { }
exports.ReadableBufferedStream = ReadableBufferedStream;
/* istanbul ignore if */
if (false) {
    /**
     * The original stream that is being read.
     * @type {!ReadableStream<T>}
     * @public
     */
    ReadableBufferedStream.prototype.stream;
    /**
     * An array of chunks already read from this stream.
     * @type {!Array<T>}
     * @public
     */
    ReadableBufferedStream.prototype.buffer;
    /**
     * Signals if the stream has ended or not. If not, consumers
     * should continue to read from the stream until consumed.
     * @type {boolean}
     * @public
     */
    ReadableBufferedStream.prototype.ended;
}
/**
 * @template T
 * @param {*} obj
 * @return {boolean}
 */
function isReadableStream(obj) {
    /** @type {(undefined|!ReadableStream<T>)} */
    const candidate = (/** @type {(undefined|!ReadableStream<T>)} */ (obj));
    if (!candidate) {
        return false;
    }
    return [candidate.on, candidate.pause, candidate.resume, candidate.destroy].every((/**
     * @param {?} fn
     * @return {boolean}
     */
    fn => typeof fn === 'function'));
}
exports.isReadableStream = isReadableStream;
/**
 * @template T
 * @param {*} obj
 * @return {boolean}
 */
function isReadableBufferedStream(obj) {
    /** @type {(undefined|!ReadableBufferedStream<T>)} */
    const candidate = (/** @type {(undefined|!ReadableBufferedStream<T>)} */ (obj));
    if (!candidate) {
        return false;
    }
    return isReadableStream(candidate.stream) && Array.isArray(candidate.buffer) && typeof candidate.ended === 'boolean';
}
exports.isReadableBufferedStream = isReadableBufferedStream;
/**
 * @record
 * @template T, R
 */
function IReducer() { }
exports.IReducer = IReducer;
/**
 * @record
 * @template Original, Transformed
 */
function IDataTransformer() { }
exports.IDataTransformer = IDataTransformer;
/**
 * @record
 */
function IErrorTransformer() { }
exports.IErrorTransformer = IErrorTransformer;
/**
 * @record
 * @template Original, Transformed
 */
function ITransformer() { }
exports.ITransformer = ITransformer;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!IDataTransformer<Original, Transformed>}
     * @public
     */
    ITransformer.prototype.data;
    /**
     * @type {(undefined|!IErrorTransformer)}
     * @public
     */
    ITransformer.prototype.error;
}
/**
 * @template T
 * @param {(null|!IReducer<T, T>)} reducer
 * @param {(undefined|!WriteableStreamOptions)=} options
 * @return {!WriteableStream<T>}
 */
function newWriteableStream(reducer, options) {
    return new WriteableStreamImpl(reducer, options);
}
exports.newWriteableStream = newWriteableStream;
/**
 * @record
 */
function WriteableStreamOptions() { }
exports.WriteableStreamOptions = WriteableStreamOptions;
/* istanbul ignore if */
if (false) {
    /**
     * The number of objects to buffer before WriteableStream#write()
     * signals back that the buffer is full. Can be used to reduce
     * the memory pressure when the stream is not flowing.
     * @type {(undefined|number)}
     * @public
     */
    WriteableStreamOptions.prototype.highWaterMark;
}
/**
 * @template T
 * @implements {WriteableStream<T>}
 */
class WriteableStreamImpl {
    /**
     * @public
     * @param {(null|!IReducer<T, T>)} reducer a function that reduces the buffered data into a single object;
     * 				  because some objects can be complex and non-reducible, we also
     * 				  allow passing the explicit `null` value to skip the reduce step
     * @param {(undefined|!WriteableStreamOptions)=} options stream options
     */
    constructor(reducer, options) {
        this.reducer = reducer;
        this.options = options;
        this.state = {
            flowing: false,
            ended: false,
            destroyed: false
        };
        this.buffer = {
            data: (/** @type {!Array<T>} */ ([])),
            error: (/** @type {!Array<!Error>} */ ([]))
        };
        this.listeners = {
            data: (/** @type {!Array<function(T): void>} */ ([])),
            error: (/** @type {!Array<function(!Error): void>} */ ([])),
            end: (/** @type {!Array<function(): void>} */ ([]))
        };
        this.pendingWritePromises = [];
    }
    /**
     * @public
     * @return {void}
     */
    pause() {
        if (this.state.destroyed) {
            return;
        }
        this.state.flowing = false;
    }
    /**
     * @public
     * @return {void}
     */
    resume() {
        if (this.state.destroyed) {
            return;
        }
        if (!this.state.flowing) {
            this.state.flowing = true;
            // emit buffered events
            this.flowData();
            this.flowErrors();
            this.flowEnd();
        }
    }
    /**
     * @public
     * @param {T} data
     * @return {(void|!Promise<void>)}
     */
    write(data) {
        if (this.state.destroyed) {
            return;
        }
        // flowing: directly send the data to listeners
        if (this.state.flowing) {
            this.emitData(data);
        }
        // not yet flowing: buffer data until flowing
        else {
            this.buffer.data.push(data);
            // highWaterMark: if configured, signal back when buffer reached limits
            if (typeof this.options?.highWaterMark === 'number' && this.buffer.data.length > this.options.highWaterMark) {
                return new Promise((/**
                 * @param {function((void|!PromiseLike<void>)): void} resolve
                 * @return {number}
                 */
                resolve => this.pendingWritePromises.push(resolve)));
            }
        }
    }
    /**
     * @public
     * @param {!Error} error
     * @return {void}
     */
    error(error) {
        if (this.state.destroyed) {
            return;
        }
        // flowing: directly send the error to listeners
        if (this.state.flowing) {
            this.emitError(error);
        }
        // not yet flowing: buffer errors until flowing
        else {
            this.buffer.error.push(error);
        }
    }
    /**
     * @public
     * @param {(undefined|T)=} result
     * @return {void}
     */
    end(result) {
        if (this.state.destroyed) {
            return;
        }
        // end with data if provided
        if (typeof result !== 'undefined') {
            this.write(result);
        }
        // flowing: send end event to listeners
        if (this.state.flowing) {
            this.emitEnd();
            this.destroy();
        }
        // not yet flowing: remember state
        else {
            this.state.ended = true;
        }
    }
    /**
     * @private
     * @param {T} data
     * @return {void}
     */
    emitData(data) {
        this.listeners.data.slice(0).forEach((/**
         * @param {function(T): void} listener
         * @return {void}
         */
        listener => listener(data))); // slice to avoid listener mutation from delivering event
    }
    /**
     * @private
     * @param {!Error} error
     * @return {void}
     */
    emitError(error) {
        if (this.listeners.error.length === 0) {
            (0, errors_1.onUnexpectedError)(error); // nobody listened to this error so we log it as unexpected
        }
        else {
            this.listeners.error.slice(0).forEach((/**
             * @param {function(!Error): void} listener
             * @return {void}
             */
            listener => listener(error))); // slice to avoid listener mutation from delivering event
        }
    }
    /**
     * @private
     * @return {void}
     */
    emitEnd() {
        this.listeners.end.slice(0).forEach((/**
         * @param {function(): void} listener
         * @return {void}
         */
        listener => listener())); // slice to avoid listener mutation from delivering event
    }
    /**
     * @public
     * @param {string} event
     * @param {(function(T): void|function(!Error): void|function(): void)} callback
     * @return {void}
     */
    on(event, callback) {
        if (this.state.destroyed) {
            return;
        }
        switch (event) {
            case 'data':
                this.listeners.data.push((/** @type {function(T): void} */ (callback)));
                // switch into flowing mode as soon as the first 'data'
                // listener is added and we are not yet in flowing mode
                this.resume();
                break;
            case 'end':
                this.listeners.end.push((/** @type {function(): void} */ (callback)));
                // emit 'end' event directly if we are flowing
                // and the end has already been reached
                //
                // finish() when it went through
                if (this.state.flowing && this.flowEnd()) {
                    this.destroy();
                }
                break;
            case 'error':
                this.listeners.error.push((/** @type {function(!Error): void} */ (callback)));
                // emit buffered 'error' events unless done already
                // now that we know that we have at least one listener
                if (this.state.flowing) {
                    this.flowErrors();
                }
                break;
        }
    }
    /**
     * @public
     * @param {string} event
     * @param {!Function} callback
     * @return {void}
     */
    removeListener(event, callback) {
        if (this.state.destroyed) {
            return;
        }
        /** @type {(undefined|!Array<*>)} */
        let listeners = undefined;
        switch (event) {
            case 'data':
                listeners = this.listeners.data;
                break;
            case 'end':
                listeners = this.listeners.end;
                break;
            case 'error':
                listeners = this.listeners.error;
                break;
        }
        if (listeners) {
            /** @type {number} */
            const index = listeners.indexOf(callback);
            if (index >= 0) {
                listeners.splice(index, 1);
            }
        }
    }
    /**
     * @private
     * @return {void}
     */
    flowData() {
        // if buffer is empty, nothing to do
        if (this.buffer.data.length === 0) {
            return;
        }
        // if buffer data can be reduced into a single object,
        // emit the reduced data
        if (typeof this.reducer === 'function') {
            /** @type {T} */
            const fullDataBuffer = this.reducer(this.buffer.data);
            this.emitData(fullDataBuffer);
        }
        else {
            // otherwise emit each buffered data instance individually
            for (const data of this.buffer.data) {
                this.emitData(data);
            }
        }
        this.buffer.data.length = 0;
        // when the buffer is empty, resolve all pending writers
        /** @type {!Array<!Function>} */
        const pendingWritePromises = [...this.pendingWritePromises];
        this.pendingWritePromises.length = 0;
        pendingWritePromises.forEach((/**
         * @param {!Function} pendingWritePromise
         * @return {?}
         */
        pendingWritePromise => pendingWritePromise()));
    }
    /**
     * @private
     * @return {void}
     */
    flowErrors() {
        if (this.listeners.error.length > 0) {
            for (const error of this.buffer.error) {
                this.emitError(error);
            }
            this.buffer.error.length = 0;
        }
    }
    /**
     * @private
     * @return {boolean}
     */
    flowEnd() {
        if (this.state.ended) {
            this.emitEnd();
            return this.listeners.end.length > 0;
        }
        return false;
    }
    /**
     * @public
     * @return {void}
     */
    destroy() {
        if (!this.state.destroyed) {
            this.state.destroyed = true;
            this.state.ended = true;
            this.buffer.data.length = 0;
            this.buffer.error.length = 0;
            this.listeners.data.length = 0;
            this.listeners.error.length = 0;
            this.listeners.end.length = 0;
            this.pendingWritePromises.length = 0;
        }
    }
}
/* istanbul ignore if */
if (false) {
    /**
     * @const {{flowing: boolean, ended: boolean, destroyed: boolean}}
     * @private
     */
    WriteableStreamImpl.prototype.state;
    /**
     * @const {{data: !Array<T>, error: !Array<!Error>}}
     * @private
     */
    WriteableStreamImpl.prototype.buffer;
    /**
     * @const {{data: !Array<function(T): void>, error: !Array<function(!Error): void>, end: !Array<function(): void>}}
     * @private
     */
    WriteableStreamImpl.prototype.listeners;
    /**
     * @const {!Array<!Function>}
     * @private
     */
    WriteableStreamImpl.prototype.pendingWritePromises;
    /**
     * @type {(null|!IReducer<T, T>)}
     * @private
     */
    WriteableStreamImpl.prototype.reducer;
    /**
     * @type {(undefined|!WriteableStreamOptions)}
     * @private
     */
    WriteableStreamImpl.prototype.options;
}
/**
 * Helper to fully read a T readable into a T.
 * @template T
 * @param {!Readable<T>} readable
 * @param {!IReducer<T, T>} reducer
 * @return {T}
 */
function consumeReadable(readable, reducer) {
    /** @type {!Array<T>} */
    const chunks = [];
    /** @type {(null|T)} */
    let chunk;
    while ((chunk = readable.read()) !== null) {
        chunks.push(chunk);
    }
    return reducer(chunks);
}
exports.consumeReadable = consumeReadable;
/**
 * Helper to read a T readable up to a maximum of chunks. If the limit is
 * reached, will return a readable instead to ensure all data can still
 * be read.
 * @template T
 * @param {!Readable<T>} readable
 * @param {!IReducer<T, T>} reducer
 * @param {number} maxChunks
 * @return {(T|!Readable<T>)}
 */
function peekReadable(readable, reducer, maxChunks) {
    /** @type {!Array<T>} */
    const chunks = [];
    /** @type {(undefined|null|T)} */
    let chunk = undefined;
    while ((chunk = readable.read()) !== null && chunks.length < maxChunks) {
        chunks.push(chunk);
    }
    // If the last chunk is null, it means we reached the end of
    // the readable and return all the data at once
    if (chunk === null && chunks.length > 0) {
        return reducer(chunks);
    }
    // Otherwise, we still have a chunk, it means we reached the maxChunks
    // value and as such we return a new Readable that first returns
    // the existing read chunks and then continues with reading from
    // the underlying readable.
    return {
        read: (/**
         * @return {(null|T)}
         */
        () => {
            // First consume chunks from our array
            if (chunks.length > 0) {
                return (/** @type {T} */ (chunks.shift()));
            }
            // Then ensure to return our last read chunk
            if (typeof chunk !== 'undefined') {
                /** @type {(null|?)} */
                const lastReadChunk = chunk;
                // explicitly use undefined here to indicate that we consumed
                // the chunk, which could have either been null or valued.
                chunk = undefined;
                return lastReadChunk;
            }
            // Finally delegate back to the Readable
            return readable.read();
        })
    };
}
exports.peekReadable = peekReadable;
/**
 * @template T, R
 * @param {!ReadableStreamEvents<T>} stream
 * @param {(undefined|!IReducer<T, R>)=} reducer
 * @return {!Promise<(undefined|R)>}
 */
function consumeStream(stream, reducer) {
    return new Promise((/**
     * @param {function((undefined|R|!PromiseLike<(undefined|R)>)): void} resolve
     * @param {function(?=): void} reject
     * @return {void}
     */
    (resolve, reject) => {
        /** @type {!Array<T>} */
        const chunks = [];
        listenStream(stream, {
            onData: (/**
             * @param {T} chunk
             * @return {void}
             */
            chunk => {
                if (reducer) {
                    chunks.push(chunk);
                }
            }),
            onError: (/**
             * @param {!Error} error
             * @return {void}
             */
            error => {
                if (reducer) {
                    reject(error);
                }
                else {
                    resolve(undefined);
                }
            }),
            onEnd: (/**
             * @return {void}
             */
            () => {
                if (reducer) {
                    resolve(reducer(chunks));
                }
                else {
                    resolve(undefined);
                }
            })
        });
    }));
}
exports.consumeStream = consumeStream;
/**
 * @record
 * @template T
 */
function IStreamListener() { }
exports.IStreamListener = IStreamListener;
/* istanbul ignore if */
if (false) {
    /**
     * The 'data' event is emitted whenever the stream is
     * relinquishing ownership of a chunk of data to a consumer.
     * @public
     * @param {T} data
     * @return {void}
     */
    IStreamListener.prototype.onData = function (data) { };
    /**
     * Emitted when any error occurs.
     * @public
     * @param {!Error} err
     * @return {void}
     */
    IStreamListener.prototype.onError = function (err) { };
    /**
     * The 'end' event is emitted when there is no more data
     * to be consumed from the stream. The 'end' event will
     * not be emitted unless the data is completely consumed.
     * @public
     * @return {void}
     */
    IStreamListener.prototype.onEnd = function () { };
}
/**
 * Helper to listen to all events of a T stream in proper order.
 * @template T
 * @param {!ReadableStreamEvents<T>} stream
 * @param {!IStreamListener<T>} listener
 * @param {(undefined|?)=} token
 * @return {void}
 */
function listenStream(stream, listener, token) {
    stream.on('error', (/**
     * @param {!Error} error
     * @return {void}
     */
    error => {
        if (!token?.isCancellationRequested) {
            listener.onError(error);
        }
    }));
    stream.on('end', (/**
     * @return {void}
     */
    () => {
        if (!token?.isCancellationRequested) {
            listener.onEnd();
        }
    }));
    // Adding the `data` listener will turn the stream
    // into flowing mode. As such it is important to
    // add this listener last (DO NOT CHANGE!)
    stream.on('data', (/**
     * @param {T} data
     * @return {void}
     */
    data => {
        if (!token?.isCancellationRequested) {
            listener.onData(data);
        }
    }));
}
exports.listenStream = listenStream;
/**
 * Helper to peek up to `maxChunks` into a stream. The return type signals if
 * the stream has ended or not. If not, caller needs to add a `data` listener
 * to continue reading.
 * @template T
 * @param {!ReadableStream<T>} stream
 * @param {number} maxChunks
 * @return {!Promise<!ReadableBufferedStream<T>>}
 */
function peekStream(stream, maxChunks) {
    return new Promise((/**
     * @param {function((!ReadableBufferedStream<T>|!PromiseLike<!ReadableBufferedStream<T>>)): void} resolve
     * @param {function(?=): void} reject
     * @return {void}
     */
    (resolve, reject) => {
        /** @type {!tsickle_lifecycle_3.DisposableStore} */
        const streamListeners = new lifecycle_1.DisposableStore();
        /** @type {!Array<T>} */
        const buffer = [];
        // Data Listener
        /** @type {function(T): void} */
        const dataListener = (/**
         * @param {T} chunk
         * @return {void}
         */
        (chunk) => {
            // Add to buffer
            buffer.push(chunk);
            // We reached maxChunks and thus need to return
            if (buffer.length > maxChunks) {
                // Dispose any listeners and ensure to pause the
                // stream so that it can be consumed again by caller
                streamListeners.dispose();
                stream.pause();
                return resolve({ stream, buffer, ended: false });
            }
        });
        // Error Listener
        /** @type {function(!Error): void} */
        const errorListener = (/**
         * @param {!Error} error
         * @return {void}
         */
        (error) => {
            streamListeners.dispose();
            return reject(error);
        });
        // End Listener
        /** @type {function(): void} */
        const endListener = (/**
         * @return {void}
         */
        () => {
            streamListeners.dispose();
            return resolve({ stream, buffer, ended: true });
        });
        streamListeners.add((0, lifecycle_1.toDisposable)((/**
         * @return {void}
         */
        () => stream.removeListener('error', errorListener))));
        stream.on('error', errorListener);
        streamListeners.add((0, lifecycle_1.toDisposable)((/**
         * @return {void}
         */
        () => stream.removeListener('end', endListener))));
        stream.on('end', endListener);
        // Important: leave the `data` listener last because
        // this can turn the stream into flowing mode and we
        // want `error` events to be received as well.
        streamListeners.add((0, lifecycle_1.toDisposable)((/**
         * @return {void}
         */
        () => stream.removeListener('data', dataListener))));
        stream.on('data', dataListener);
    }));
}
exports.peekStream = peekStream;
/**
 * Helper to create a readable stream from an existing T.
 * @template T
 * @param {T} t
 * @param {!IReducer<T, T>} reducer
 * @return {!ReadableStream<T>}
 */
function toStream(t, reducer) {
    /** @type {!WriteableStream<T>} */
    const stream = newWriteableStream(reducer);
    stream.end(t);
    return stream;
}
exports.toStream = toStream;
/**
 * Helper to create an empty stream
 * @return {!ReadableStream<?>}
 */
function emptyStream() {
    /** @type {!WriteableStream<?>} */
    const stream = newWriteableStream((/**
     * @return {?}
     */
    () => { throw new Error('not supported'); }));
    stream.end();
    return stream;
}
exports.emptyStream = emptyStream;
/**
 * Helper to convert a T into a Readable<T>.
 * @template T
 * @param {T} t
 * @return {!Readable<T>}
 */
function toReadable(t) {
    /** @type {boolean} */
    let consumed = false;
    return {
        read: (/**
         * @return {(null|T)}
         */
        () => {
            if (consumed) {
                return null;
            }
            consumed = true;
            return t;
        })
    };
}
exports.toReadable = toReadable;
/**
 * Helper to transform a readable stream into another stream.
 * @template Original, Transformed
 * @param {!ReadableStreamEvents<Original>} stream
 * @param {!ITransformer<Original, Transformed>} transformer
 * @param {!IReducer<Transformed, Transformed>} reducer
 * @return {!ReadableStream<Transformed>}
 */
function transform(stream, transformer, reducer) {
    /** @type {!WriteableStream<Transformed>} */
    const target = newWriteableStream(reducer);
    listenStream(stream, {
        onData: (/**
         * @param {Original} data
         * @return {(void|!Promise<void>)}
         */
        data => target.write(transformer.data(data))),
        onError: (/**
         * @param {!Error} error
         * @return {void}
         */
        error => target.error(transformer.error ? transformer.error(error) : error)),
        onEnd: (/**
         * @return {void}
         */
        () => target.end())
    });
    return target;
}
exports.transform = transform;
/**
 * Helper to take an existing readable that will
 * have a prefix injected to the beginning.
 * @template T
 * @param {T} prefix
 * @param {!Readable<T>} readable
 * @param {!IReducer<T, T>} reducer
 * @return {!Readable<T>}
 */
function prefixedReadable(prefix, readable, reducer) {
    /** @type {boolean} */
    let prefixHandled = false;
    return {
        read: (/**
         * @return {(null|T)}
         */
        () => {
            /** @type {(null|T)} */
            const chunk = readable.read();
            // Handle prefix only once
            if (!prefixHandled) {
                prefixHandled = true;
                // If we have also a read-result, make
                // sure to reduce it to a single result
                if (chunk !== null) {
                    return reducer([prefix, chunk]);
                }
                // Otherwise, just return prefix directly
                return prefix;
            }
            return chunk;
        })
    };
}
exports.prefixedReadable = prefixedReadable;
/**
 * Helper to take an existing stream that will
 * have a prefix injected to the beginning.
 * @template T
 * @param {T} prefix
 * @param {!ReadableStream<T>} stream
 * @param {!IReducer<T, T>} reducer
 * @return {!ReadableStream<T>}
 */
function prefixedStream(prefix, stream, reducer) {
    /** @type {boolean} */
    let prefixHandled = false;
    /** @type {!WriteableStream<T>} */
    const target = newWriteableStream(reducer);
    listenStream(stream, {
        onData: (/**
         * @param {T} data
         * @return {(void|!Promise<void>)}
         */
        data => {
            // Handle prefix only once
            if (!prefixHandled) {
                prefixHandled = true;
                return target.write(reducer([prefix, data]));
            }
            return target.write(data);
        }),
        onError: (/**
         * @param {!Error} error
         * @return {void}
         */
        error => target.error(error)),
        onEnd: (/**
         * @return {void}
         */
        () => {
            // Handle prefix only once
            if (!prefixHandled) {
                prefixHandled = true;
                target.write(prefix);
            }
            target.end();
        })
    });
    return target;
}
exports.prefixedStream = prefixedStream;
