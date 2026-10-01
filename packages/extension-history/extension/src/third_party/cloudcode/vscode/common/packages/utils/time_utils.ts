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
 * Generated from: third_party/cloudcode/vscode/common/packages/utils/time_utils.ts
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
goog.module('google3.third_party.cloudcode.vscode.common.packages.utils.time_utils');
var module = module || { id: 'third_party/cloudcode/vscode/common/packages/utils/time_utils.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_vscode_1 = goog.requireType("vscode");
/**
 * A specific amount of time
 *
 * @see {\@link SECOND}
 * @see {\@link MINUTE}
 * @see {\@link HOUR}
 * @typedef {number}
 */
exports.Duration;
/** @type {number} */
exports.SECOND = 1000;
// ms
/** @type {number} */
exports.MINUTE = exports.SECOND * 60;
/** @type {number} */
exports.HOUR = exports.MINUTE * 60;
/**
 * Sleeps for the specified period of time
 * @param {number} duration amount of time to sleep in milliseconds
 * @return {!Promise<void>}
 */
function sleep(duration) {
    return new Promise((/**
     * @param {function((void|!PromiseLike<void>)): void} resolve
     * @return {!NodeJS.Timeout}
     */
    resolve => setTimeout(resolve, duration)));
}
exports.sleep = sleep;
class Timer {
    /**
     * @public
     * @param {!Date=} start
     */
    constructor(start = new Date()) {
        this.start = start;
    }
    /**
     * @public
     * @param {!Date=} newStart
     * @return {void}
     */
    reset(newStart = new Date()) {
        this.start = newStart;
    }
    /**
     * @public
     * @return {number}
     */
    now() {
        return Date.now();
    }
    /**
     * @public
     * @return {number}
     */
    elapsed() {
        return Date.now() - this.start.getTime();
    }
}
exports.Timer = Timer;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!Date}
     * @private
     */
    Timer.prototype.start;
}
/**
 *
 * @param {!tsickle_vscode_1.OutputChannel} output Logger to outputs to VSCode's output window.
 * @return {function(string, function(): !Promise<?>): !Promise<?>} A timer function that will time and log the duration to complete a task.
 */
function timerFactory(output) {
    return (/**
     * @template T
     * @param {string} name
     * @param {function(): !Promise<?>} func
     * @return {!Promise<?>}
     */
    async (name, func) => {
        /** @type {!Timer} */
        const timer = new Timer();
        output.appendLine(`${name} started`);
        /** @type {?} */
        const response = await func();
        output.appendLine(`${name} finished. time elapsed: ${timer.elapsed() / 1000}s`);
        return response;
    });
}
exports.timerFactory = timerFactory;
