/**
 * @fileoverview added by tsickle
 * Generated from: cloud/developer_experience/antigravity_extensions/vscode/buffered_output_channel.ts
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
goog.module('google3.cloud.developer_experience.antigravity_extensions.vscode.buffered_output_channel');
var module = module || { id: 'cloud/developer_experience/antigravity_extensions/vscode/buffered_output_channel.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_fs_1 = goog.requireType("google3.third_party.javascript.typings.node.node.fs");
const tsickle_os_2 = goog.requireType("google3.third_party.javascript.typings.node.node.os");
const tsickle_path_3 = goog.requireType("google3.third_party.javascript.typings.node.node.path");
const tsickle_vscode_4 = goog.requireType("vscode");
const fs = goog.require('google3.third_party.javascript.typings.node.node.fs');
const os = goog.require('google3.third_party.javascript.typings.node.node.os');
const path = goog.require('google3.third_party.javascript.typings.node.node.path');
// from //third_party/javascript/typings/vscode
/**
 * Default maximum number of log lines retained in the in-memory ring buffer.
 * @type {number}
 */
const DEFAULT_MAX_BUFFERED_LINES = 1000;
/**
 * Default path to persistent installation and operational log file on disk.
 * @return {string}
 */
function getDefaultInstallLogPath() {
    return path.join(os.homedir(), '.gemini', 'logs', 'install.log');
}
/**
 * Options for configuring BufferedOutputChannel.
 * @record
 */
function BufferedOutputChannelOptions() { }
exports.BufferedOutputChannelOptions = BufferedOutputChannelOptions;
/* istanbul ignore if */
if (false) {
    /**
     * Maximum number of lines to retain in memory. Defaults to 1000.
     * @type {(undefined|number)}
     * @public
     */
    BufferedOutputChannelOptions.prototype.maxLines;
    /**
     * Path to append persistent log lines to on disk. Defaults to ~/.gemini/logs/install.log.
     * @type {(undefined|string)}
     * @public
     */
    BufferedOutputChannelOptions.prototype.logFilePath;
    /**
     * Whether to write to disk. Defaults to true. Set false in unit tests to avoid disk I/O.
     * @type {(undefined|boolean)}
     * @public
     */
    BufferedOutputChannelOptions.prototype.enableDiskLogging;
}
/**
 * An implementation of vscode.OutputChannel that maintains an in-memory ring buffer
 * of recent log lines and persists them to an install log file on disk.
 *
 * This allows diagnostic services (such as in-IDE feedback and bug reporting) to
 * inspect and bundle host-side installation and server lifecycle logs across the webview bridge.
 * @implements {tsickle_vscode_4.OutputChannel}
 */
class BufferedOutputChannel {
    /**
     * @public
     * @param {(undefined|!tsickle_vscode_4.OutputChannel)=} inner
     * @param {(undefined|!BufferedOutputChannelOptions)=} options
     */
    constructor(inner, options) {
        this.buffer = [];
        this.currentPartialLine = '';
        this.inner = inner;
        this.name = inner?.name ?? 'Antigravity';
        this.maxLines = options?.maxLines ?? DEFAULT_MAX_BUFFERED_LINES;
        this.logFilePath = options?.logFilePath ?? getDefaultInstallLogPath();
        this.enableDiskLogging = options?.enableDiskLogging ?? true;
    }
    /**
     * Appends raw text to the channel without a trailing newline.
     * @public
     * @param {string} value
     * @return {void}
     */
    append(value) {
        if (!value) {
            return;
        }
        this.inner?.append(value);
        this.currentPartialLine += value;
        if (this.currentPartialLine.includes('\n')) {
            /** @type {!Array<string>} */
            const parts = this.currentPartialLine.split('\n');
            this.currentPartialLine = parts.pop() ?? '';
            for (const line of parts) {
                this.pushLineToBuffer(line);
                this.writeLineToDisk(line);
            }
        }
    }
    /**
     * Appends a line of text to the channel, automatically adding a newline.
     * @public
     * @param {string} value
     * @return {void}
     */
    appendLine(value) {
        this.inner?.appendLine(value);
        /** @type {string} */
        const fullLine = this.currentPartialLine
            ? `${this.currentPartialLine}${value}`
            : value;
        this.currentPartialLine = '';
        /** @type {!Array<string>} */
        const lines = fullLine.split('\n');
        for (const line of lines) {
            this.pushLineToBuffer(line);
            this.writeLineToDisk(line);
        }
    }
    /**
     * Replaces all output from the channel with the given value.
     * @public
     * @param {string} value
     * @return {void}
     */
    replace(value) {
        this.inner?.replace(value);
        this.buffer.length = 0;
        this.currentPartialLine = '';
        if (value) {
            /** @type {!Array<string>} */
            const lines = value.split('\n');
            for (const line of lines) {
                this.pushLineToBuffer(line);
            }
        }
    }
    /**
     * Clears all output from the channel and in-memory buffer.
     * @public
     * @return {void}
     */
    clear() {
        this.inner?.clear();
        this.buffer.length = 0;
        this.currentPartialLine = '';
    }
    /**
     * @public
     * @param {(undefined|boolean|!tsickle_vscode_4.ViewColumn)=} preserveFocusOrColumn
     * @param {(undefined|boolean)=} preserveFocus
     * @return {void}
     */
    show(preserveFocusOrColumn, preserveFocus) {
        if (typeof preserveFocusOrColumn === 'boolean') {
            this.inner?.show(preserveFocusOrColumn);
        }
        else {
            this.inner?.show(preserveFocus);
        }
    }
    /**
     * Hides the output channel from the editor UI.
     * @public
     * @return {void}
     */
    hide() {
        this.inner?.hide();
    }
    /**
     * Disposes the channel and underlying resources.
     * @public
     * @return {void}
     */
    dispose() {
        if (this.currentPartialLine) {
            this.pushLineToBuffer(this.currentPartialLine);
            this.writeLineToDisk(this.currentPartialLine);
            this.currentPartialLine = '';
        }
        this.inner?.dispose();
    }
    /**
     * Returns a snapshot of the buffered log lines.
     * If the in-memory buffer is empty, attempts to read the most recent lines from the disk log file.
     * @public
     * @return {!Array<string>}
     */
    getLines() {
        if (this.buffer.length > 0) {
            return [...this.buffer];
        }
        // Fall back to reading disk log if in-memory buffer is empty (e.g. extension reloaded).
        if (this.enableDiskLogging && fs.existsSync(this.logFilePath)) {
            try {
                /** @type {string} */
                const content = fs.readFileSync(this.logFilePath, 'utf-8');
                /** @type {!Array<string>} */
                const diskLines = content.split('\n').filter((/**
                 * @param {string} line
                 * @return {boolean}
                 */
                (line) => line.length > 0));
                return diskLines.slice(-this.maxLines);
            }
            catch {
                return [];
            }
        }
        return [];
    }
    /**
     * Returns all buffered logs joined by newlines.
     * @public
     * @return {string}
     */
    getText() {
        return this.getLines().join('\n');
    }
    /**
     * @private
     * @param {string} line
     * @return {void}
     */
    pushLineToBuffer(line) {
        this.buffer.push(line);
        if (this.buffer.length > this.maxLines) {
            this.buffer.shift();
        }
    }
    /**
     * @private
     * @param {string} line
     * @return {void}
     */
    writeLineToDisk(line) {
        if (!this.enableDiskLogging) {
            return;
        }
        try {
            /** @type {string} */
            const dir = path.dirname(this.logFilePath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            fs.appendFileSync(this.logFilePath, `${line}\n`, 'utf-8');
        }
        catch {
            // Disk logging is best-effort and must never disrupt extension operations.
        }
    }
}
exports.BufferedOutputChannel = BufferedOutputChannel;
/* istanbul ignore if */
if (false) {
    /**
     * @const {string}
     * @public
     */
    BufferedOutputChannel.prototype.name;
    /**
     * @const {!Array<string>}
     * @private
     */
    BufferedOutputChannel.prototype.buffer;
    /**
     * @const {number}
     * @private
     */
    BufferedOutputChannel.prototype.maxLines;
    /**
     * @const {string}
     * @private
     */
    BufferedOutputChannel.prototype.logFilePath;
    /**
     * @const {boolean}
     * @private
     */
    BufferedOutputChannel.prototype.enableDiskLogging;
    /**
     * @const {(undefined|!tsickle_vscode_4.OutputChannel)}
     * @private
     */
    BufferedOutputChannel.prototype.inner;
    /**
     * @type {string}
     * @private
     */
    BufferedOutputChannel.prototype.currentPartialLine;
}
