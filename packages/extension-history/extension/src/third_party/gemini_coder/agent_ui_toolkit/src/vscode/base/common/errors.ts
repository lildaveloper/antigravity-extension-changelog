/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/gemini_coder/agent_ui_toolkit/src/vscode/base/common/errors.ts
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
goog.module('google3.third_party.gemini_coder.agent_ui_toolkit.src.vscode.base.common.errors');
var module = module || { id: 'third_party/gemini_coder/agent_ui_toolkit/src/vscode/base/common/errors.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
/**
 * @record
 */
function ErrorListenerCallback() { }
exports.ErrorListenerCallback = ErrorListenerCallback;
/**
 * @record
 */
function ErrorListenerUnbind() { }
exports.ErrorListenerUnbind = ErrorListenerUnbind;
// Avoid circular dependency on EventEmitter by implementing a subset of the interface.
class ErrorHandler {
    /**
     * @public
     */
    constructor() {
        this.listeners = [];
        this.unexpectedErrorHandler = (/**
         * @param {?} e
         * @return {void}
         */
        function (e) {
            setTimeout((/**
             * @return {?}
             */
            () => {
                if (e.stack) {
                    if (ErrorNoTelemetry.isErrorNoTelemetry(e)) {
                        throw new ErrorNoTelemetry((/** @type {!ErrorNoTelemetry} */ (e)).message + '\n\n' + (/** @type {!ErrorNoTelemetry} */ (e)).stack);
                    }
                    throw new Error(e.message + '\n\n' + e.stack);
                }
                throw e;
            }), 0);
        });
    }
    /**
     * @public
     * @param {!ErrorListenerCallback} listener
     * @return {!ErrorListenerUnbind}
     */
    addListener(listener) {
        this.listeners.push(listener);
        return (/**
         * @return {void}
         */
        () => {
            this._removeListener(listener);
        });
    }
    /**
     * @private
     * @param {?} e
     * @return {void}
     */
    emit(e) {
        this.listeners.forEach((/**
         * @param {!ErrorListenerCallback} listener
         * @return {void}
         */
        (listener) => {
            listener(e);
        }));
    }
    /**
     * @private
     * @param {!ErrorListenerCallback} listener
     * @return {void}
     */
    _removeListener(listener) {
        this.listeners.splice(this.listeners.indexOf(listener), 1);
    }
    /**
     * @public
     * @param {function(?): void} newUnexpectedErrorHandler
     * @return {void}
     */
    setUnexpectedErrorHandler(newUnexpectedErrorHandler) {
        this.unexpectedErrorHandler = newUnexpectedErrorHandler;
    }
    /**
     * @public
     * @return {function(?): void}
     */
    getUnexpectedErrorHandler() {
        return this.unexpectedErrorHandler;
    }
    /**
     * @public
     * @param {?} e
     * @return {void}
     */
    onUnexpectedError(e) {
        this.unexpectedErrorHandler(e);
        this.emit(e);
    }
    // For external errors, we don't want the listeners to be called
    /**
     * @public
     * @param {?} e
     * @return {void}
     */
    onUnexpectedExternalError(e) {
        this.unexpectedErrorHandler(e);
    }
}
exports.ErrorHandler = ErrorHandler;
/* istanbul ignore if */
if (false) {
    /**
     * @type {function(?): void}
     * @private
     */
    ErrorHandler.prototype.unexpectedErrorHandler;
    /**
     * @type {!Array<!ErrorListenerCallback>}
     * @private
     */
    ErrorHandler.prototype.listeners;
}
/** @type {!ErrorHandler} */
exports.errorHandler = new ErrorHandler();
/**
 * \@skipMangle
 * @param {function(?): void} newUnexpectedErrorHandler
 * @return {void}
 */
function setUnexpectedErrorHandler(newUnexpectedErrorHandler) {
    exports.errorHandler.setUnexpectedErrorHandler(newUnexpectedErrorHandler);
}
exports.setUnexpectedErrorHandler = setUnexpectedErrorHandler;
/**
 * Returns if the error is a SIGPIPE error. SIGPIPE errors should generally be
 * logged at most once, to avoid a loop.
 *
 * @see https://github.com/microsoft/vscode-remote-release/issues/6481
 * @param {*} e
 * @return {boolean}
 */
function isSigPipeError(e) {
    if (!e || typeof e !== 'object') {
        return false;
    }
    /** @type {?} */
    const cast = (/** @type {?} */ (e));
    return cast.code === 'EPIPE' && cast.syscall?.toUpperCase() === 'WRITE';
}
exports.isSigPipeError = isSigPipeError;
/**
 * This function should only be called with errors that indicate a bug in the product.
 * E.g. buggy extensions/invalid user-input/network issues should not be able to trigger this code path.
 * If they are, this indicates there is also a bug in the product.
 * @param {?} e
 * @return {undefined}
 */
function onBugIndicatingError(e) {
    exports.errorHandler.onUnexpectedError(e);
    return undefined;
}
exports.onBugIndicatingError = onBugIndicatingError;
/**
 * @param {?} e
 * @return {undefined}
 */
function onUnexpectedError(e) {
    // ignore errors from cancelled promises
    if (!isCancellationError(e)) {
        exports.errorHandler.onUnexpectedError(e);
    }
    return undefined;
}
exports.onUnexpectedError = onUnexpectedError;
/**
 * @param {?} e
 * @return {undefined}
 */
function onUnexpectedExternalError(e) {
    // ignore errors from cancelled promises
    if (!isCancellationError(e)) {
        exports.errorHandler.onUnexpectedExternalError(e);
    }
    return undefined;
}
exports.onUnexpectedExternalError = onUnexpectedExternalError;
/**
 * @record
 */
function SerializedError() { }
exports.SerializedError = SerializedError;
/* istanbul ignore if */
if (false) {
    /**
     * @const {boolean}
     * @public
     */
    SerializedError.prototype.$isError;
    /**
     * @const {string}
     * @public
     */
    SerializedError.prototype.name;
    /**
     * @const {string}
     * @public
     */
    SerializedError.prototype.message;
    /**
     * @const {string}
     * @public
     */
    SerializedError.prototype.stack;
    /**
     * @const {boolean}
     * @public
     */
    SerializedError.prototype.noTelemetry;
    /**
     * @const {(undefined|string)}
     * @public
     */
    SerializedError.prototype.code;
    /**
     * @const {(undefined|!SerializedError)}
     * @public
     */
    SerializedError.prototype.cause;
}
/** @typedef {?} */
var ErrorWithCode;
/**
 * @param {?} error
 * @return {?}
 */
function transformErrorForSerialization(error) {
    if (error instanceof Error) {
        const { name, message, cause } = error;
        // eslint-disable-next-line local/code-no-any-casts
        /** @type {string} */
        const stack = ((/** @type {?} */ (error))).stacktrace || ((/** @type {?} */ (error))).stack;
        return {
            $isError: true,
            name,
            message,
            stack,
            noTelemetry: ErrorNoTelemetry.isErrorNoTelemetry(error),
            cause: cause ? transformErrorForSerialization(cause) : undefined,
            code: ((/** @type {?} */ (error))).code,
        };
    }
    // return as is
    return error;
}
exports.transformErrorForSerialization = transformErrorForSerialization;
/**
 * @param {!SerializedError} data
 * @return {!Error}
 */
function transformErrorFromSerialization(data) {
    /** @type {!Error} */
    let error;
    if (data.noTelemetry) {
        error = new ErrorNoTelemetry();
    }
    else {
        error = new Error();
        error.name = data.name;
    }
    error.message = data.message;
    error.stack = data.stack;
    if (data.code) {
        ((/** @type {?} */ (error))).code = data.code;
    }
    if (data.cause) {
        error.cause = transformErrorFromSerialization(data.cause);
    }
    return error;
}
exports.transformErrorFromSerialization = transformErrorFromSerialization;
/**
 * @record
 */
function V8CallSite() { }
exports.V8CallSite = V8CallSite;
/* istanbul ignore if */
if (false) {
    /**
     * @public
     * @return {*}
     */
    V8CallSite.prototype.getThis = function () { };
    /**
     * @public
     * @return {(null|string)}
     */
    V8CallSite.prototype.getTypeName = function () { };
    /**
     * @public
     * @return {(undefined|!Function)}
     */
    V8CallSite.prototype.getFunction = function () { };
    /**
     * @public
     * @return {(null|string)}
     */
    V8CallSite.prototype.getFunctionName = function () { };
    /**
     * @public
     * @return {(null|string)}
     */
    V8CallSite.prototype.getMethodName = function () { };
    /**
     * @public
     * @return {(null|string)}
     */
    V8CallSite.prototype.getFileName = function () { };
    /**
     * @public
     * @return {(null|number)}
     */
    V8CallSite.prototype.getLineNumber = function () { };
    /**
     * @public
     * @return {(null|number)}
     */
    V8CallSite.prototype.getColumnNumber = function () { };
    /**
     * @public
     * @return {(undefined|string)}
     */
    V8CallSite.prototype.getEvalOrigin = function () { };
    /**
     * @public
     * @return {boolean}
     */
    V8CallSite.prototype.isToplevel = function () { };
    /**
     * @public
     * @return {boolean}
     */
    V8CallSite.prototype.isEval = function () { };
    /**
     * @public
     * @return {boolean}
     */
    V8CallSite.prototype.isNative = function () { };
    /**
     * @public
     * @return {boolean}
     */
    V8CallSite.prototype.isConstructor = function () { };
    /**
     * @public
     * @return {string}
     */
    V8CallSite.prototype.toString = function () { };
}
/** @type {string} */
exports.canceledName = 'Canceled';
/**
 * Checks if the given error is a promise in canceled state
 * @param {?} error
 * @return {boolean}
 */
function isCancellationError(error) {
    if (error instanceof CancellationError) {
        return true;
    }
    return (error instanceof Error &&
        (/** @type {!Error} */ (error)).name === exports.canceledName &&
        (/** @type {!Error} */ (error)).message === exports.canceledName);
}
exports.isCancellationError = isCancellationError;
// !!!IMPORTANT!!!
// Do NOT change this class because it is also used as an API-type.
/**
 * @extends {Error}
 */
class CancellationError extends Error {
    /**
     * @public
     */
    constructor() {
        super(exports.canceledName);
        this.name = this.message;
    }
}
exports.CancellationError = CancellationError;
/**
 * @extends {Error}
 */
class PendingMigrationError extends Error {
    /**
     * @public
     * @param {*} error
     * @return {boolean}
     */
    static is(error) {
        return (error instanceof PendingMigrationError ||
            (error instanceof Error && (/** @type {!Error} */ (error)).name === PendingMigrationError._name));
    }
    /**
     * @public
     * @param {string} message
     */
    constructor(message) {
        super(message);
        this.name = PendingMigrationError._name;
    }
}
exports.PendingMigrationError = PendingMigrationError;
PendingMigrationError._name = 'PendingMigrationError';
/* istanbul ignore if */
if (false) {
    /**
     * @const {string}
     * @private
     */
    PendingMigrationError._name;
}
/**
 * @deprecated use {\@link CancellationError `new CancellationError()`} instead
 * @return {!Error}
 */
function canceled() {
    /** @type {!Error} */
    const error = new Error(exports.canceledName);
    error.name = error.message;
    return error;
}
exports.canceled = canceled;
/**
 * @param {(undefined|string)=} name
 * @return {!Error}
 */
function illegalArgument(name) {
    if (name) {
        return new Error(`Illegal argument: ${name}`);
    }
    else {
        return new Error('Illegal argument');
    }
}
exports.illegalArgument = illegalArgument;
/**
 * @param {(undefined|string)=} name
 * @return {!Error}
 */
function illegalState(name) {
    if (name) {
        return new Error(`Illegal state: ${name}`);
    }
    else {
        return new Error('Illegal state');
    }
}
exports.illegalState = illegalState;
/**
 * @extends {TypeError}
 */
class ReadonlyError extends TypeError {
    /**
     * @public
     * @param {(undefined|string)=} name
     */
    constructor(name) {
        super(name
            ? `${name} is read-only and cannot be changed`
            : 'Cannot change read-only property');
    }
}
exports.ReadonlyError = ReadonlyError;
/**
 * @param {?} err
 * @return {string}
 */
function getErrorMessage(err) {
    if (!err) {
        return 'Error';
    }
    if (err.message) {
        return err.message;
    }
    if (err.stack) {
        return err.stack.split('\n')[0];
    }
    return String(err);
}
exports.getErrorMessage = getErrorMessage;
/**
 * @extends {Error}
 */
class NotImplementedError extends Error {
    /**
     * @public
     * @param {(undefined|string)=} message
     */
    constructor(message) {
        super('NotImplemented');
        if (message) {
            this.message = message;
        }
    }
}
exports.NotImplementedError = NotImplementedError;
/**
 * @extends {Error}
 */
class NotSupportedError extends Error {
    /**
     * @public
     * @param {(undefined|string)=} message
     */
    constructor(message) {
        super('NotSupported');
        if (message) {
            this.message = message;
        }
    }
}
exports.NotSupportedError = NotSupportedError;
/**
 * @extends {Error}
 */
class ExpectedError extends Error {
    constructor() {
        super(...arguments);
        this.isExpected = true;
    }
}
exports.ExpectedError = ExpectedError;
/* istanbul ignore if */
if (false) {
    /**
     * @const {boolean}
     * @public
     */
    ExpectedError.prototype.isExpected;
}
/**
 * Error that when thrown won't be logged in telemetry as an unhandled error.
 * @extends {Error}
 */
class ErrorNoTelemetry extends Error {
    /**
     * @public
     * @param {(undefined|string)=} msg
     */
    constructor(msg) {
        super(msg);
        this.name = 'CodeExpectedError';
    }
    /**
     * @public
     * @param {!Error} err
     * @return {!ErrorNoTelemetry}
     */
    static fromError(err) {
        if (err instanceof ErrorNoTelemetry) {
            return err;
        }
        /** @type {!ErrorNoTelemetry} */
        const result = new ErrorNoTelemetry();
        result.message = err.message;
        result.stack = err.stack;
        return result;
    }
    /**
     * @public
     * @param {!Error} err
     * @return {boolean}
     */
    static isErrorNoTelemetry(err) {
        return err.name === 'CodeExpectedError';
    }
}
exports.ErrorNoTelemetry = ErrorNoTelemetry;
/* istanbul ignore if */
if (false) {
    /**
     * @const {string}
     * @public
     */
    ErrorNoTelemetry.prototype.name;
}
/**
 * This error indicates a bug.
 * Do not throw this for invalid user input.
 * Only catch this error to recover gracefully from bugs.
 * @extends {Error}
 */
class BugIndicatingError extends Error {
    /**
     * @public
     * @param {(undefined|string)=} message
     */
    constructor(message) {
        super(message || 'An unexpected bug occurred.');
        Object.setPrototypeOf(this, BugIndicatingError.prototype);
        // Because we know for sure only buggy code throws this,
        // we definitely want to break here and fix the bug.
        // debugger;
    }
}
exports.BugIndicatingError = BugIndicatingError;
