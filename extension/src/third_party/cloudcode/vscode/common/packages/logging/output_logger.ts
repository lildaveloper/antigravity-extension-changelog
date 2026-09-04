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
 * Generated from: third_party/cloudcode/vscode/common/packages/logging/output_logger.ts
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
goog.module('google3.third_party.cloudcode.vscode.common.packages.logging.output_logger');
var module = module || { id: 'third_party/cloudcode/vscode/common/packages/logging/output_logger.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_vscode_1 = goog.requireType("vscode");
const tsickle_logger_2 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.logging.logger");
const logger_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.logging.logger');
/** @type {!RegExp} */
const klogFormat = /^([IWEF])\d{4}\s+\d{2}:\d{2}:\d{2}\.\d{6}\s+\d+\s+([^:]+):(\d+)\] (.*)$/gm;
/**
 * A collection of logging methods.
 * @typedef {{trace: function(*=, ...*): void, debug: function(*=, ...*): void, info: function(*=, ...*): void, warn: function(*=, ...*): void, error: function(*=, ...*): void}}
 */
exports.LoggerMethods;
/**
 * Creates an output channel.
 * @param {?} code The vscode module.
 * @param {!tsickle_vscode_1.ExtensionContext} context The extension context.
 * @param {string} outputName The name of the output channel.
 * @param {(undefined|string|{log: boolean})} options The options for the output channel.
 * @return {(!tsickle_vscode_1.LogOutputChannel|!tsickle_vscode_1.OutputChannel)} The output channel.
 */
function createOutputChannel(code, context, outputName, options) {
    /** @type {boolean} */
    const combine = combineOutput(code, context);
    if (options === undefined || typeof options === 'string') {
        /** @type {!tsickle_vscode_1.OutputChannel} */
        const channel = code.window.createOutputChannel(outputName, options);
        return combine ? new OutputChannelLogger(channel) : channel;
    }
    /** @type {!tsickle_vscode_1.LogOutputChannel} */
    const channel = code.window.createOutputChannel(outputName, { log: true });
    return combine ? new LogOutputChannelLogger(channel) : channel;
}
exports.createOutputChannel = createOutputChannel;
/**
 * Determines if output should be combined to the debug logger
 * @param {?} code vscode API
 * @param {!tsickle_vscode_1.ExtensionContext} context The extension context
 * @return {boolean} true if output should be sent to the debug logger, false otherwise
 */
function combineOutput(code, context) {
    /** @type {?} */
    const name = context.extension.packageJSON.name;
    if (!name) {
        throw new Error('name is undefined in package.json');
    }
    /** @type {(undefined|boolean)} */
    const combine = code.workspace.getConfiguration()?.get(`${name}.combineOutput`);
    return !!(process.env['CLOUDCODE_TEST'] || combine);
}
exports.combineOutput = combineOutput;
/** @typedef {{logFn: (undefined|function(string): void), message: string}} */
var ParsedOutput;
/**
 * Wraps an OutputChannel with logging statements to the console and the debug
 * output window.
 * @implements {tsickle_vscode_1.OutputChannel}
 */
class OutputChannelLogger {
    /**
     * Creates a new OutputChannelLogger.
     * @public
     * @param {!tsickle_vscode_1.OutputChannel} channel The output channel to wrap.
     */
    constructor(channel) {
        /**
         * The logger methods.
         */
        this.logger = {
            trace: logger_1.trace,
            debug: logger_1.debug,
            info: logger_1.info,
            warn: logger_1.warn,
            error: logger_1.error,
        };
        this.channel = channel;
        this.name = channel.name;
    }
    /**
     * Appends a string to the output channel.
     * @public
     * @param {string} value The string to append.
     * @return {void}
     */
    append(value) {
        this.channel?.append(value);
        /** @type {(null|!Array<{logFn: (undefined|function(string): void), message: string}>)} */
        const parsed = this.parseLogLine(value);
        if (parsed && parsed.length > 0) {
            for (const entry of parsed) {
                entry.logFn?.(entry.message);
            }
        }
        else {
            this.logger?.info(value);
        }
    }
    /**
     * Appends a line to the output channel.
     * @public
     * @param {string} value The line to append.
     * @return {void}
     */
    appendLine(value) {
        this.channel?.appendLine(value);
        /** @type {(null|!Array<{logFn: (undefined|function(string): void), message: string}>)} */
        const parsed = this.parseLogLine(value);
        if (parsed && parsed.length > 0) {
            for (const entry of parsed) {
                entry.logFn?.(entry.message);
            }
        }
        else {
            this.logger?.info(value);
        }
    }
    /**
     * Parses a glog formatted line, strips timestamp/pid,
     * and returns the normalized level and formatted message.
     * @protected
     * @param {string} line The line to parse.
     * @return {(null|!Array<{logFn: (undefined|function(string): void), message: string}>)} The parsed log line.
     */
    parseLogLine(line) {
        if (!line) {
            return null;
        }
        /** @type {!RegExpStringIterator<!RegExpExecArray>} */
        const matches = line.matchAll(klogFormat);
        if (!matches) {
            return null;
        }
        /** @type {!Array<?>} */
        const ret = [];
        for (const m of matches) {
            const [___tsickle_destructured_1, rawLevel__tsickle_destructured_2, filename__tsickle_destructured_3, lineNum__tsickle_destructured_4, content__tsickle_destructured_5] = m;
            const _ = /** @type {string} */ (___tsickle_destructured_1);
            const rawLevel = /** @type {string} */ (rawLevel__tsickle_destructured_2);
            const filename = /** @type {string} */ (filename__tsickle_destructured_3);
            const lineNum = /** @type {string} */ (lineNum__tsickle_destructured_4);
            const content = /** @type {string} */ (content__tsickle_destructured_5);
            ret.push({
                logFn: this.getLogFn(rawLevel),
                message: `[${filename}:${lineNum}] ${content}`,
            });
        }
        return ret;
    }
    /**
     * Returns the log function for the given log level.
     * @private
     * @param {string} char The log level character.
     * @return {(undefined|function(string): void)} The log function.
     */
    getLogFn(char) {
        switch (char) {
            case 'W':
                return this.logger?.warn;
            case 'E':
                return this.logger?.error;
            case 'F':
                return this.logger?.error;
            case 'I':
            default:
                return this.logger?.info;
        }
    }
    /**
     * Replaces the content of the output channel.
     * @public
     * @param {string} value The new content.
     * @return {void}
     */
    replace(value) {
        this.channel?.replace(value);
    }
    /**
     * Clears the output channel.
     * @public
     * @return {void}
     */
    clear() {
        this.channel?.clear();
    }
    /**
     * Shows the output channel.
     * @public
     * @param {(undefined|boolean|!tsickle_vscode_1.ViewColumn)=} columnOrPreserveFocus The view column to show the channel in or whether to preserve focus.
     * @param {(undefined|boolean)=} preserveFocus Whether to preserve focus on the editor.
     * @return {void}
     */
    show(columnOrPreserveFocus, preserveFocus) {
        if (preserveFocus === undefined && (typeof columnOrPreserveFocus === 'boolean' || columnOrPreserveFocus === undefined)) {
            this.channel?.show(columnOrPreserveFocus);
            return;
        }
        else {
            this.channel?.show((/** @type {!tsickle_vscode_1.ViewColumn} */ (columnOrPreserveFocus)), preserveFocus);
        }
    }
    /**
     * Hides the output channel.
     * @public
     * @return {void}
     */
    hide() {
        this.channel?.hide();
    }
    /**
     * Disposes the output channel.
     * @public
     * @return {void}
     */
    dispose() {
        this.channel?.dispose();
        this.channel = null;
        this.logger = null;
    }
}
exports.OutputChannelLogger = OutputChannelLogger;
/* istanbul ignore if */
if (false) {
    /**
     * @type {(null|!tsickle_vscode_1.OutputChannel)}
     * @private
     */
    OutputChannelLogger.prototype.channel;
    /**
     * The logger methods.
     * @type {(null|{trace: function(*=, ...*): void, debug: function(*=, ...*): void, info: function(*=, ...*): void, warn: function(*=, ...*): void, error: function(*=, ...*): void})}
     * @protected
     */
    OutputChannelLogger.prototype.logger;
    /**
     * The name of the output channel.
     * @const {string}
     * @public
     */
    OutputChannelLogger.prototype.name;
}
/**
 * Wraps a LogOutputChannel with logging statements to the console and the debug
 * output window.
 * @extends {OutputChannelLogger}
 * @implements {tsickle_vscode_1.LogOutputChannel}
 */
class LogOutputChannelLogger extends OutputChannelLogger {
    /**
     * Creates a new LogOutputChannelLogger.
     * @public
     * @param {!tsickle_vscode_1.LogOutputChannel} logChannel The log output channel to wrap.
     */
    constructor(logChannel) {
        super(logChannel);
        this.logChannel = logChannel;
    }
    /**
     * The log level of the channel.
     * @public
     * @return {!tsickle_vscode_1.LogLevel}
     */
    get logLevel() {
        return this.logChannel?.logLevel || 0; /* vscode.LogLevel.Off */
    }
    /**
     * An event that fires when the log level changes.
     * @public
     * @return {!tsickle_vscode_1.Event<!tsickle_vscode_1.LogLevel>}
     */
    get onDidChangeLogLevel() {
        if (!this.logChannel) {
            return (/**
             * @return {{dispose: function(): void}}
             */
            () => {
                return { /**
                     * @public
                     * @return {void}
                     */
                    dispose() { } };
            });
        }
        return this.logChannel?.onDidChangeLogLevel;
    }
    /**
     * Logs a trace message.
     * @public
     * @param {string} message The message to log.
     * @param {...*} args The arguments to log.
     * @return {void}
     */
    trace(message, ...args) {
        this.logChannel?.trace(message, ...args);
        this.logger?.trace(message, ...args);
    }
    /**
     * Logs a debug message.
     * @public
     * @param {string} message The message to log.
     * @param {...*} args The arguments to log.
     * @return {void}
     */
    debug(message, ...args) {
        this.logChannel?.debug(message, ...args);
        this.logger?.debug(message, ...args);
    }
    /**
     * Logs an info message.
     * @public
     * @param {string} message The message to log.
     * @param {...*} args The arguments to log.
     * @return {void}
     */
    info(message, ...args) {
        this.logChannel?.info(message, ...args);
        this.logger?.info(message, ...args);
    }
    /**
     * Logs a warning message.
     * @public
     * @param {string} message The message to log.
     * @param {...*} args The arguments to log.
     * @return {void}
     */
    warn(message, ...args) {
        this.logChannel?.warn(message, ...args);
        this.logger?.warn(message, ...args);
    }
    /**
     * Logs an error message.
     * @public
     * @param {(string|!Error)} message The message to log.
     * @param {...*} args The arguments to log.
     * @return {void}
     */
    error(message, ...args) {
        this.logChannel?.error(message, ...args);
        this.logger?.error(message, ...args);
    }
    /**
     * Disposes the output channel.
     * @public
     * @return {void}
     */
    dispose() {
        super.dispose();
        this.logChannel = null;
    }
}
exports.LogOutputChannelLogger = LogOutputChannelLogger;
/* istanbul ignore if */
if (false) {
    /**
     * @type {(null|!tsickle_vscode_1.LogOutputChannel)}
     * @private
     */
    LogOutputChannelLogger.prototype.logChannel;
}
