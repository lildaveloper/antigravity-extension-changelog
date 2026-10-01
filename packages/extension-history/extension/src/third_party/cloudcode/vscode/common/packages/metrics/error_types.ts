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
 * @fileoverview added by tsickle
 * Generated from: third_party/cloudcode/vscode/common/packages/metrics/error_types.ts
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
goog.module('google3.third_party.cloudcode.vscode.common.packages.metrics.error_types');
var module = module || { id: 'third_party/cloudcode/vscode/common/packages/metrics/error_types.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_constants_1 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.metrics.constants");
const constants_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.metrics.constants');
/** @typedef {(!Error|!NodeJsSystemError|!ReasonedError|!UnsupportedOsError)} */
exports.ExtractableError;
/**
 * @extends {Error}
 */
class UnsupportedOsError extends Error {
    /**
     * @public
     * @param {string} msg
     */
    constructor(msg) {
        super(msg);
        this.cloudcodeErrorMessage = constants_1.FailureReason.UNSUPPORTED_OS;
    }
}
exports.UnsupportedOsError = UnsupportedOsError;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!tsickle_constants_1.FailureReason}
     * @public
     */
    UnsupportedOsError.prototype.cloudcodeErrorMessage;
}
/**
 * @extends {Error}
 */
class PiiWrappedError extends Error {
    /**
     * @public
     * @param {string} msg
     * @param {!tsickle_constants_1.FailureReason} noPiiMsg
     */
    constructor(msg, noPiiMsg) {
        super(msg);
        this.cloudcodeErrorMessage = noPiiMsg;
    }
}
exports.PiiWrappedError = PiiWrappedError;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!tsickle_constants_1.FailureReason}
     * @public
     */
    PiiWrappedError.prototype.cloudcodeErrorMessage;
}
/**
 * Known Error doesn't result in Primes crash if unhandled.
 * @extends {Error}
 */
class KnownError extends Error {
    /**
     * @public
     * @param {(undefined|string)=} msg
     */
    constructor(msg) {
        super(msg);
    }
}
exports.KnownError = KnownError;
/**
 * @extends {PiiWrappedError}
 */
class NoPiiError extends PiiWrappedError {
    /**
     * @public
     * @param {!tsickle_constants_1.FailureReason} msg
     */
    constructor(msg) {
        super(msg, msg);
    }
}
exports.NoPiiError = NoPiiError;
/**
 * @extends {Error}
 */
class ReasonedError extends Error {
    /**
     * @public
     * @param {!tsickle_constants_1.FailureReason} reason
     * @param {(undefined|string)=} message
     */
    constructor(reason, message) {
        super(message);
        this.reason = reason;
    }
}
exports.ReasonedError = ReasonedError;
/* istanbul ignore if */
if (false) {
    /**
     * @const {!tsickle_constants_1.FailureReason}
     * @public
     */
    ReasonedError.prototype.reason;
}
/**
 * ReasonedKnownError will not resulted in Primes Crash prompt if uncaught
 * @extends {KnownError}
 */
class ReasonedKnownError extends KnownError {
    /**
     * @public
     * @param {!tsickle_constants_1.FailureReason} reason
     * @param {(undefined|string)=} message
     */
    constructor(reason, message) {
        super(message);
        this.reason = reason;
    }
}
exports.ReasonedKnownError = ReasonedKnownError;
/* istanbul ignore if */
if (false) {
    /**
     * @const {!tsickle_constants_1.FailureReason}
     * @public
     */
    ReasonedKnownError.prototype.reason;
}
/**
 * @extends {Error}
 */
class NodeJsSystemError extends Error {
}
exports.NodeJsSystemError = NodeJsSystemError;
/* istanbul ignore if */
if (false) {
    /**
     * @type {(undefined|string)}
     * @public
     */
    NodeJsSystemError.prototype.code;
    /**
     * @type {(undefined|string)}
     * @public
     */
    NodeJsSystemError.prototype.syscall;
}
class ErrorReport {
    /**
     * @public
     * @param {string} stack
     * @param {string} failureReason
     * @param {(undefined|string)=} failureMessage
     */
    constructor(stack, failureReason, failureMessage) {
        this.stack = stack;
        this.failureReason = failureReason;
        this.failureMessage = failureMessage;
    }
}
exports.ErrorReport = ErrorReport;
/* istanbul ignore if */
if (false) {
    /**
     * @const {string}
     * @public
     */
    ErrorReport.prototype.stack;
    /**
     * @const {string}
     * @public
     */
    ErrorReport.prototype.failureReason;
    /**
     * @const {(undefined|string)}
     * @public
     */
    ErrorReport.prototype.failureMessage;
}
