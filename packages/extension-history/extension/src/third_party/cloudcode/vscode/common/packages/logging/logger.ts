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
 * @fileoverview Functions related to output logging for Cloud Code
 * Generated from: third_party/cloudcode/vscode/common/packages/logging/logger.ts
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
goog.module('google3.third_party.cloudcode.vscode.common.packages.logging.logger');
var module = module || { id: 'third_party/cloudcode/vscode/common/packages/logging/logger.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_fs_1 = goog.requireType("google3.third_party.javascript.typings.node.node.fs");
const tsickle_os_2 = goog.requireType("google3.third_party.javascript.typings.node.node.os");
const tsickle_path_3 = goog.requireType("google3.third_party.javascript.typings.node.node.path");
const tsickle_vscode_4 = goog.requireType("vscode");
const tsickle_util_5 = goog.requireType("google3.third_party.javascript.typings.node.node.util");
const tsickle_stacktrace_parser_6 = goog.requireType("google3.third_party.javascript.node_modules.stacktrace_parser.v0_1_10.dist.stack$2dtrace$2dparser");
const tsickle_constants_7 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.config.config.constants");
const tsickle_constants_8 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.logging.constants");
const fs = goog.require('google3.third_party.javascript.typings.node.node.fs');
const os = goog.require('google3.third_party.javascript.typings.node.node.os');
const path = goog.require('google3.third_party.javascript.typings.node.node.path');
const util_1 = goog.require('google3.third_party.javascript.typings.node.node.util');
const stackTraceParser = goog.require('google3.third_party.javascript.node_modules.stacktrace_parser.v0_1_10.dist.stack$2dtrace$2dparser');
const constants_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.config.config.constants');
const constants_2 = goog.require('google3.third_party.cloudcode.vscode.common.packages.logging.constants');
/** @type {number} */
const MAX_LOG_COUNT = 1000;
/**
 * Logs error level messages using the console logger, output logging
 * buffer, and optionally the debug output window.
 * @param {*=} msg The message or object to log.
 * @param {...*} optArgs Additional messages or objects to log.
 * @return {void}
 */
function error(msg, ...optArgs) {
    Logger.singleton().error(msg, ...optArgs);
}
exports.error = error;
/**
 * Logs warning level messages using the console logger, output logging
 * buffer, and optionally the debug output window.
 * @param {*=} msg The message or object to log.
 * @param {...*} optArgs Additional messages or objects to log.
 * @return {void}
 */
function warn(msg, ...optArgs) {
    Logger.singleton().warn(msg, ...optArgs);
}
exports.warn = warn;
/**
 * Logs information level messages using the console logger, output logging
 * buffer, and optionally the debug output window.
 * @param {*=} msg The message or object to log.
 * @param {...*} optArgs Additional messages or objects to log.
 * @return {void}
 */
function info(msg, ...optArgs) {
    Logger.singleton().info(msg, ...optArgs);
}
exports.info = info;
/**
 * Logs trace level messages using the console logger, output logging
 * buffer, and optionally the debug output window.
 * @param {*=} msg The message or object to log.
 * @param {...*} optArgs Additional messages or objects to log.
 * @return {void}
 */
function trace(msg, ...optArgs) {
    Logger.singleton().trace(msg, ...optArgs);
}
exports.trace = trace;
/**
 * Logs debug level messages using the console logger, output logging buffer,
 * and optionally the debug output window.
 * @param {*=} msg The message or object to log.
 * @param {...*} optArgs Additional messages or objects to log.
 * @return {void}
 */
function debug(msg, ...optArgs) {
    Logger.singleton().debug(msg, ...optArgs);
}
exports.debug = debug;
/**
 * Specifies the information level of log entries.
 * @enum {string}
 */
const LogLevel = {
    LOG_LEVEL_ERROR: "error",
    LOG_LEVEL_WARNING: "warning",
    LOG_LEVEL_INFO: "info",
    LOG_LEVEL_TRACE: "trace",
    LOG_LEVEL_DEBUG: "debug",
};
/**
 * Implements a logging mechanism for the extension, allowing user level logs
 * and error reporting to diagnose and fix issues that cannot be reproduced
 * locally by the development team.
 */
class Logger {
    /**
     * Creates a new logging instance.
     *
     * @private
     * @param {(undefined|?)} code The vscode module, can be undefined.  If this is not specified
     * the output window will not exist and the verbose setting will not be
     * respected.
     * @param {(undefined|!tsickle_vscode_4.ExtensionContext)} context The extension context, can be undefined.  If this is not
     * specified the extension id and the extension name cannot be inferred by
     * the logger.
     * @param {!Array<string>} rollingLogsBuffer The buffer to utilize for the rolling log.
     * @param {number} latestLogIndex  The index of the last log entry added to the rolling
     * log.
     */
    constructor(code, context, rollingLogsBuffer, latestLogIndex) {
        this.code = code;
        this.context = context;
        this.rollingLogsBuffer = rollingLogsBuffer;
        this.latestLogIndex = latestLogIndex;
        this.loggers = new Map([
            [LogLevel.LOG_LEVEL_ERROR, console.error],
            [LogLevel.LOG_LEVEL_WARNING, console.warn],
            [LogLevel.LOG_LEVEL_INFO, console.log],
            [LogLevel.LOG_LEVEL_TRACE, console.trace],
            [LogLevel.LOG_LEVEL_DEBUG, console.debug],
        ]);
        // This method is designed to be able to be started detached prior to
        // initialization.  When the logger is initialized via Logger.createLogger
        // in the extension the singleton will be replaced and its buffer will be
        // swapped into the proper instance.
        /** @type {string} */
        const settingPrefix = (this.context?.extension?.id ?? 'googlecloudtools.cloudcode').split('.')[1];
        this.outputName = `${this.context?.extension?.packageJSON?.displayName ?? 'Cloud Code'} Debug`;
        this.setting = (0, util_1.format)(constants_1.VERBOSE_LOGGING_SETTING, settingPrefix);
        this.context?.subscriptions?.push(this);
        this.processLoggingSetting();
        this.changeSubscription = this.code?.workspace?.onDidChangeConfiguration((/**
         * @param {!tsickle_vscode_4.ConfigurationChangeEvent} e
         * @return {void}
         */
        (e) => {
            if (e.affectsConfiguration(this.setting)) {
                this.processLoggingSetting();
            }
        }));
    }
    /**
     * Creates the singleton logger with the specified context
     * @public
     * @param {(undefined|?)=} code the vscode module to use allows mocking for testing purposes
     * @param {(undefined|!tsickle_vscode_4.ExtensionContext)=} context the extension context to use when logging
     * @return {!Logger} the created logger
     */
    static createLogger(code, context) {
        // Collect previous logging buffer for the logger being created.
        /** @type {!Array<string>} */
        const buffer = Logger.singletonLogger?.rollingLogsBuffer ?? [];
        /** @type {number} */
        const index = Logger.singletonLogger?.latestLogIndex ?? -1;
        Logger.singletonLogger?.dispose();
        return (Logger.singletonLogger = new Logger(code, context, buffer, index));
    }
    /**
     * The currently stored singleton instance.
     * @public
     * @return {!Logger} The current singleton instance.
     *
     * This function will create a new singleton instance if the singleton has
     * not been initialized yet.
     */
    static singleton() {
        return Logger.singletonLogger ?? this.createLogger();
    }
    /**
     * Logs error level messages using the console logger, output logging
     * buffer, and optionally the debug output window.
     * @public
     * @param {*} msg The message or object to log.
     * @param {...*} optArgs Additional messages or objects to log.
     * @return {void}
     */
    error(msg, ...optArgs) {
        this.logMethod(LogLevel.LOG_LEVEL_ERROR, msg, ...optArgs);
    }
    /**
     * Logs warning level messages using the console logger, output logging
     * buffer, and optionally the debug output window.
     * @public
     * @param {*} msg The message or object to log.
     * @param {...*} optArgs Additional messages or objects to log.
     * @return {void}
     */
    warn(msg, ...optArgs) {
        this.logMethod(LogLevel.LOG_LEVEL_WARNING, msg, ...optArgs);
    }
    /**
     * Logs information level messages using the console logger, output logging
     * buffer, and optionally the debug output window.
     * @public
     * @param {*} msg The message or object to log.
     * @param {...*} optArgs Additional messages or objects to log.
     * @return {void}
     */
    info(msg, ...optArgs) {
        this.logMethod(LogLevel.LOG_LEVEL_INFO, msg, ...optArgs);
    }
    /**
     * Logs trace level messages using the console logger, output logging
     * buffer, and optionally the debug output window.
     * @public
     * @param {*} msg The message or object to log.
     * @param {...*} optArgs Additional messages or objects to log.
     * @return {void}
     */
    trace(msg, ...optArgs) {
        this.logMethod(LogLevel.LOG_LEVEL_TRACE, msg, ...optArgs);
    }
    /**
     * Logs debug level messages using the console logger, output logging buffer,
     * and optionally the debug output window.
     * @public
     * @param {*} msg The message or object to log.
     * @param {...*} optArgs Additional messages or objects to log.
     * @return {void}
     */
    debug(msg, ...optArgs) {
        this.logMethod(LogLevel.LOG_LEVEL_DEBUG, msg, ...optArgs);
    }
    /**
     * @private
     * @return {void}
     */
    appendLine() {
        this.file?.write(os.EOL);
    }
    /**
     * @private
     * @param {(undefined|string)=} toOutput
     * @return {void}
     */
    append(toOutput) {
        if (!toOutput) {
            return;
        }
        this.file?.write(toOutput);
    }
    /**
     * Logs the specified msg as string or stringified representation if msg is
     * an object.  All optArgs are stringified or written in a similar manner.
     * @private
     * @param {!LogLevel} level
     * @param {*} msg The message to log
     * @param {...*} optArgs Optional additional log entries.
     * @return {void}
     */
    logMethod(level, msg, ...optArgs) {
        if (!msg && optArgs.length === 0) {
            this.appendLine();
            return;
        }
        this.bufferOutput(level, msg, ...optArgs);
        this.logOutput(level, msg, ...optArgs);
    }
    /**
     * @private
     * @param {!LogLevel} level
     * @param {*} msg
     * @param {...*} optArgs
     * @return {void}
     */
    bufferOutput(level, msg, ...optArgs) {
        /** @type {string} */
        let log = '';
        /** @type {!Date} */
        const timestamp = new Date();
        if (process.env['CLOUDCODE_TEST']) {
            log = log.concat(this.getAnalogParsablePrefix(timestamp, level));
        }
        else {
            log = log.concat(`[${timestamp.toISOString()}] [${level}]: `);
        }
        log = log.concat(this.stringifyObj(msg));
        if (optArgs) {
            optArgs.forEach((/**
             * @param {*} element
             * @return {void}
             */
            (element) => {
                log = log.concat(this.stringifyObj(element));
            }));
        }
        this.append(log);
        this.appendLine();
        this.addToBuffer(log);
    }
    /**
     * @private
     * @param {!LogLevel} level
     * @param {*} msg
     * @param {...*} optArgs
     * @return {void}
     */
    logOutput(level, msg, ...optArgs) {
        this.loggers.get(level)?.(msg, ...optArgs);
        if (!this.channel) {
            return;
        }
        switch (level) {
            case LogLevel.LOG_LEVEL_ERROR:
                if (msg instanceof Error) {
                    this.channel.error(msg, ...optArgs);
                }
                else {
                    this.channel.error(this.stringifyObj(msg), ...optArgs);
                }
                break;
            case LogLevel.LOG_LEVEL_WARNING:
                this.channel.warn(this.stringifyObj(msg), ...optArgs);
                break;
            case LogLevel.LOG_LEVEL_INFO:
                this.channel.info(this.stringifyObj(msg), ...optArgs);
                break;
            case LogLevel.LOG_LEVEL_TRACE:
                this.channel.trace(this.stringifyObj(msg), ...optArgs);
                break;
            case LogLevel.LOG_LEVEL_DEBUG:
                this.channel.debug(this.stringifyObj(msg), ...optArgs);
                break;
            default:
                this.channel.appendLine(this.stringifyObj(msg));
        }
    }
    /**
     * Format severity, timestamp, source location in a prefix that Analog can understand.
     * This is to be used when running integration tests so that debugging is much easier.
     * The Analog format:
     * <one character for severity>MMDD HH:mm:ss.xxxxxx  <thread number> <filename>:<line number>] <content>
     * Example:
     * I0808 16:10:25.837429  123456 fileThatCalledInfo.ts:35] Hello, World!
     * @private
     * @param {!Date} timestamp datetime to be associated with log
     * @param {!LogLevel} level TRACE, INFO, WARN, ERROR
     * @return {string} String containing everything before the log content itself
     */
    getAnalogParsablePrefix(timestamp, level) {
        if (level === LogLevel.LOG_LEVEL_TRACE || level === LogLevel.LOG_LEVEL_DEBUG) {
            // Analog only supports I(nfo), W(arning), E(rror), F(atal)
            level = LogLevel.LOG_LEVEL_INFO;
        }
        /** @type {string} */
        const monthStr = (timestamp.getMonth() + 1).toString().padStart(2, '0');
        /** @type {string} */
        const dayStr = timestamp.getDate().toString().padStart(2, '0');
        /** @type {string} */
        const hourStr = timestamp.getHours().toString().padStart(2, '0');
        /** @type {string} */
        const minStr = timestamp.getMinutes().toString().padStart(2, '0');
        /** @type {string} */
        const secStr = timestamp.getSeconds().toString().padStart(2, '0');
        /** @type {string} */
        const msStr = timestamp.getMilliseconds().toString().padEnd(6, '0');
        /** @type {number} */
        const thread = process.pid;
        const { fileName, lineNumber } = this.getLogSource();
        return `${level[0].toUpperCase()}${monthStr}${dayStr} ${hourStr}:${minStr}:${secStr}.${msStr}  ${thread} ${fileName}:${lineNumber}] `;
    }
    /**
     * Get the original filename and line number of the caller of the logging
     * function.  To be used in testing only since it adds some additional
     * processing to every logging operation.
     * @private
     * @return {{fileName: string, lineNumber: number}} base filename and line number
     */
    getLogSource() {
        /** @type {!Error} */
        const err = new Error();
        /** @type {!Array<!tsickle_stacktrace_parser_6.StackFrame>} */
        const stack = stackTraceParser.parse(err.stack || '');
        // Find the first stack frame that is not part of the logger
        /** @type {(undefined|!tsickle_stacktrace_parser_6.StackFrame)} */
        const frame 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        = stack.find((/**
         * @param {?} f
         * @return {?}
         */
        (f) => f.file && !f.file.endsWith('logger.ts')));
        if (frame) {
            const { file, lineNumber } = frame;
            if (file && lineNumber) {
                /** @type {string} */
                const fileName = path.basename(file);
                return { fileName, lineNumber };
            }
        }
        return { fileName: 'unknown', lineNumber: 0 };
    }
    /**
     * Disposes of all resources used by the logger along with clearing out the
     * singleton instance.
     * @public
     * @return {void}
     */
    dispose() {
        this.channel?.dispose?.();
        this.changeSubscription?.dispose?.();
        this.file?.close?.();
        this.file = undefined;
        this.channel = undefined;
        Logger.singletonLogger = undefined;
    }
    /**
     * Try calling JSON.stringify on provided object and returning an error string
     * instead of throwing exception
     * @private
     * @param {*} obj
     * @return {string}
     */
    stringifyObj(obj) {
        if (typeof obj === 'string') {
            return obj;
        }
        /** @type {?} */
        let inspectErr;
        try {
            return (0, util_1.inspect)(obj);
        }
        catch (err) {
            inspectErr = err;
        }
        try {
            return `${obj} (logger afailed to stringify with '${inspectErr}')`;
        }
        catch (err) {
            return `Logger fatally failed to process object (original: ${inspectErr}, err: ${err}).`;
        }
    }
    /**
     * Takes the verbose logging setting and either enables or  disables verbose
     * logging.
     * @private
     * @return {void}
     */
    processLoggingSetting() {
        if (!this.file && process.env[constants_2.CLOUD_CODE_LOG_FILE]) {
            // Append existing log
            this.file = fs.createWriteStream((/** @type {string} */ (process.env[constants_2.CLOUD_CODE_LOG_FILE])), { flags: 'a' });
            this.file.on('close', (/**
             * @return {undefined}
             */
            () => (this.file = undefined)));
            this.file.on('error', (/**
             * @param {!Error} err
             * @return {void}
             */
            (err) => {
                this.file = undefined;
                this.error(`Could not write to ${process.env[constants_2.CLOUD_CODE_LOG_FILE]}:  ${err}`);
            }));
        }
        if (!this.code) {
            return;
        }
        /** @type {!tsickle_vscode_4.WorkspaceConfiguration} */
        const config = this.code?.workspace?.getConfiguration?.();
        /** @type {boolean} */
        const enabled = config?.get(this.setting) ?? false;
        if (this.channel && !enabled) {
            this.info('Verbose logging disabled');
            this.channel.hide();
            this.channel.dispose();
            this.channel = undefined;
        }
        else if (enabled && !this.channel && this.code?.window) {
            this.channel = this.code.window.createOutputChannel(this.outputName, { log: true });
            this.channel.show();
            this.backFillOutputChannel(this.channel);
            this.info('Verbose logging enabled');
        }
    }
    /**
     * Adds a value to the rolling buffer.
     *
     * If the buffer reaches its max size, it is shifted and the
     * first index is removed.
     * @private
     * @param {string} output
     * @return {void}
     */
    addToBuffer(output) {
        this.rollingLogsBuffer[++this.latestLogIndex % MAX_LOG_COUNT] = output;
    }
    /**
     * Appends all logs currently in the buffer to the output channel
     * @private
     * @param {!tsickle_vscode_4.OutputChannel} channel
     * @return {void}
     */
    backFillOutputChannel(channel) {
        this.getLogsInOrder(this.rollingLogsBuffer, this.latestLogIndex % MAX_LOG_COUNT).forEach((/**
         * @param {string} log
         * @return {void}
         */
        log => channel?.appendLine(log)));
    }
    /**
     * Returns the current rolling logs buffer stored in memory in the order
     * in which they were logged
     *
     * @public
     * @param {!Array<string>=} buffer A buffer to interpret (**INTENDED FOR TESTING ONLY**)
     * @param {number=} normalizedIndex A normalized index (**INTENDED FOR TESTING ONLY**)
     * @return {string} The composite string representing the entire buffer
     */
    getRollingLogsBuffer(buffer = this.rollingLogsBuffer, normalizedIndex = this.latestLogIndex % MAX_LOG_COUNT) {
        return this.getLogsInOrder(buffer, normalizedIndex).join('\n');
    }
    /**
     * Retrieves the circular buffer contents in order.
     * @private
     * @param {!Array<string>} buffer The buffer from which to retrieve logs.
     * @param {number} latestIndex The last index that was written.
     * @return {!Array<string>} The flattened buffer contents.
     */
    getLogsInOrder(buffer, latestIndex) {
        if (latestIndex === -1) {
            return [];
        }
        /** @type {!Array<string>} */
        const logs = [];
        for (let i = latestIndex + 1; i % MAX_LOG_COUNT !== latestIndex; i++) {
            if (buffer[i % MAX_LOG_COUNT]) {
                logs.push(buffer[i % MAX_LOG_COUNT]);
            }
        }
        logs.push(buffer[latestIndex]);
        return logs;
    }
}
exports.Logger = Logger;
/* istanbul ignore if */
if (false) {
    /**
     * @type {(undefined|!Logger)}
     * @private
     */
    Logger.singletonLogger;
    /**
     * @const {!Map<!LogLevel, function(*, ...*): void>}
     * @private
     */
    Logger.prototype.loggers;
    /**
     * @type {(undefined|!tsickle_fs_1.WriteStream)}
     * @private
     */
    Logger.prototype.file;
    /**
     * @type {(undefined|!tsickle_vscode_4.LogOutputChannel)}
     * @private
     */
    Logger.prototype.channel;
    /**
     * @type {string}
     * @private
     */
    Logger.prototype.setting;
    /**
     * @type {string}
     * @private
     */
    Logger.prototype.outputName;
    /**
     * @type {(undefined|!tsickle_vscode_4.Disposable)}
     * @private
     */
    Logger.prototype.changeSubscription;
    /**
     * @const {(undefined|?)}
     * @private
     */
    Logger.prototype.code;
    /**
     * @const {(undefined|!tsickle_vscode_4.ExtensionContext)}
     * @private
     */
    Logger.prototype.context;
    /**
     * @const {!Array<string>}
     * @private
     */
    Logger.prototype.rollingLogsBuffer;
    /**
     * @type {number}
     * @private
     */
    Logger.prototype.latestLogIndex;
}
