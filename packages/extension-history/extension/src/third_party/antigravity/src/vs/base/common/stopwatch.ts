/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/antigravity/src/vs/base/common/stopwatch.ts
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
goog.module('google3.third_party.antigravity.src.vs.base.common.stopwatch');
var module = module || { id: 'third_party/antigravity/src/vs/base/common/stopwatch.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
/** @type {function(): number} */
const performanceNow = globalThis.performance.now.bind(globalThis.performance);
class StopWatch {
    /**
     * @public
     * @param {(undefined|boolean)=} highResolution
     * @return {!StopWatch}
     */
    static create(highResolution) {
        return new StopWatch(highResolution);
    }
    /**
     * @public
     * @param {(undefined|boolean)=} highResolution
     */
    constructor(highResolution) {
        this._now = highResolution === false ? Date.now : performanceNow;
        this._startTime = this._now();
        this._stopTime = -1;
    }
    /**
     * @public
     * @return {void}
     */
    stop() {
        this._stopTime = this._now();
    }
    /**
     * @public
     * @return {void}
     */
    reset() {
        this._startTime = this._now();
        this._stopTime = -1;
    }
    /**
     * @public
     * @return {number}
     */
    elapsed() {
        if (this._stopTime !== -1) {
            return this._stopTime - this._startTime;
        }
        return this._now() - this._startTime;
    }
}
exports.StopWatch = StopWatch;
/* istanbul ignore if */
if (false) {
    /**
     * @type {number}
     * @private
     */
    StopWatch.prototype._startTime;
    /**
     * @type {number}
     * @private
     */
    StopWatch.prototype._stopTime;
    /**
     * @const {function(): number}
     * @private
     */
    StopWatch.prototype._now;
}
