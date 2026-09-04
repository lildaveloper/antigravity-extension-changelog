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
// This file does NOT depend on vscode, so that it can be depended on by
// uninstall hook.
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/cloudcode/vscode/common/packages/metrics/utils.ts
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
goog.module('google3.third_party.cloudcode.vscode.common.packages.metrics.utils');
var module = module || { id: 'third_party/cloudcode/vscode/common/packages/metrics/utils.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_fs_extra_1 = goog.requireType("google3.third_party.javascript.typings.fs_extra.index");
const tsickle_gaxios_2 = goog.requireType("google3.third_party.javascript.node_modules.gaxios.v6_7_1.build.src.index");
const tsickle_http_3 = goog.requireType("google3.third_party.javascript.typings.node.node.http");
const tsickle_os_4 = goog.requireType("google3.third_party.javascript.typings.node.node.os");
const tsickle_path_5 = goog.requireType("google3.third_party.javascript.typings.node.node.path");
const tsickle_uuid_6 = goog.requireType("google3.third_party.javascript.typings.uuid.index");
const tsickle_vscode_7 = goog.requireType("vscode");
const tsickle_file_utils_8 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.utils.file_utils");
const tsickle_messages_9 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.gcp.messages");
const tsickle_logger_10 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.logging.logger");
const tsickle_constants_11 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.metrics.constants");
const tsickle_error_types_12 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.metrics.error_types");
const tsickle_extract_error_13 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.metrics.extract_error");
const tsickle_concord_client_14 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.metrics.concord_client");
const fs_extra_1 = goog.require('google3.third_party.javascript.typings.fs_extra.index');
const gaxios_1 = goog.require('google3.third_party.javascript.node_modules.gaxios.v6_7_1.build.src.index');
const http = goog.require('google3.third_party.javascript.typings.node.node.http');
const os_1 = goog.require('google3.third_party.javascript.typings.node.node.os');
const path_1 = goog.require('google3.third_party.javascript.typings.node.node.path');
const uuid = goog.require('google3.third_party.javascript.typings.uuid.index');
const vscode = goog.require('vscode');
const file_utils_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.utils.file_utils');
const messages_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.gcp.messages');
const logger_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.logging.logger');
const constants_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.metrics.constants');
const error_types_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.metrics.error_types');
const extract_error_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.metrics.extract_error');
exports.extractError = extract_error_1.extractError;
const concord_client_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.metrics.concord_client');
exports.USE_FIRELOG = concord_client_1.USE_FIRELOG;
exports.decodeLogResponse = concord_client_1.decodeLogResponse;
exports.fixBuf = concord_client_1.fixBuf;
/** @typedef {!tsickle_concord_client_14.LogResponse} */
exports.LogResponse; // type-only export
/**
 * Wrapper for HTTP POST functionality. Used for testing.
 * @record
 */
function Poster() { }
exports.Poster = Poster;
/* istanbul ignore if */
if (false) {
    /**
     * Duration, in ms, to wait before polling again if there's no event or if
     * previous post() errors.
     * @const {number}
     * @public
     */
    Poster.prototype.defaultWait;
    /**
     * Sends a body message to the metrics server.
     * @public
     * @param {string} body
     * @return {!Promise<!tsickle_concord_client_14.LogResponse>}
     */
    Poster.prototype.post = function (body) { };
    /**
     * Writes metrics to a file in a folder in a VSC Global State directory
     * @public
     * @param {string} data
     * @param {!tsickle_vscode_7.ExtensionContext} extensionContext
     * @return {void}
     */
    Poster.prototype.writeToFile = function (data, extensionContext) { };
    /**
     * Tries to send files from the METRICS_FOLDER folder.
     * @public
     * @param {number} attempt
     * @param {!tsickle_vscode_7.ExtensionContext} extensionContext
     * @return {!Promise<number>} number of failed attempts (or 1 if there are no files to send)
     */
    Poster.prototype.sendMetricsFromDisk = function (attempt, extensionContext) { };
}
/** @type {number} */
const SECOND = 1_000;
/** @type {number} */
const MINUTE = 60 * SECOND;
/**
 * Saves events that we failed to upload to a file, to be uploaded later.
 *
 * First writes to a file with a .tmp extension and then renames it to .json exension.
 * It allows for another process to read only .json files which are fully and successfully written on the disk.
 * @param {string} data
 * @param {!tsickle_vscode_7.ExtensionContext} extensionContext
 * @return {void}
 */
function saveMetricsToLocalFolder(data, extensionContext) {
    /** @type {string} */
    const fileName = uuid.v4();
    /** @type {!tsickle_vscode_7.Uri} */
    const fileUri = vscode.Uri.joinPath(extensionContext.globalStorageUri, constants_1.METRICS_FOLDER, fileName + constants_1.METRICS_FILE_EXTENSION_TMP);
    /** @type {!Uint8Array} */
    const encodedData = new TextEncoder().encode(data);
    vscode.workspace.fs.writeFile(fileUri, encodedData)
        .then((/**
     * @return {void}
     */
    () => {
        /** @type {!tsickle_vscode_7.Uri} */
        const newFileUri = vscode.Uri.joinPath(extensionContext.globalStorageUri, constants_1.METRICS_FOLDER, fileName + constants_1.METRICS_FILE_EXTENSION_JSON);
        vscode.workspace.fs.rename(fileUri, newFileUri)
            .then((/**
         * @return {void}
         */
        () => { }), (/**
         * @param {?} e
         * @return {void}
         */
        (e) => {
            (0, logger_1.info)(`Error renaming a file with metrics: ${((/** @type {!Error} */ (e))).message}`);
        }));
    }), (/**
     * @param {?} e
     * @return {void}
     */
    (e) => {
        (0, logger_1.info)(`Error writing metrics to file: ${((/** @type {!Error} */ (e))).message}`);
    }));
}
/**
 * @param {number} attempt
 * @param {!tsickle_vscode_7.ExtensionContext} extensionContext
 * @return {!Promise<number>}
 */
async function sendMetricsFromLocalFolder(attempt, extensionContext) {
    /** @type {!tsickle_vscode_7.Uri} */
    const folderUri = vscode.Uri.joinPath(extensionContext.globalStorageUri, constants_1.METRICS_FOLDER);
    try {
        // Check if the folder exists
        await vscode.workspace.fs.stat(folderUri);
    }
    catch {
        return 1;
    }
    /** @type {!Array<!Array<?>>} */
    const directoryContents = (await vscode.workspace.fs.readDirectory(folderUri)).filter((/**
     * @param {!Array<?>} file
     * @return {boolean}
     */
    file => file[0].endsWith(constants_1.METRICS_FILE_EXTENSION_JSON)));
    /** @type {!TextDecoder} */
    const decoder = new TextDecoder();
    for (const [fileName__tsickle_destructured_1] of directoryContents) {
        const fileName = /** @type {string} */ (fileName__tsickle_destructured_1);
        /** @type {!tsickle_vscode_7.Uri} */
        const fileUri = vscode.Uri.joinPath(folderUri, fileName);
        /** @type {!tsickle_vscode_7.FileStat} */
        const fileStats = await vscode.workspace.fs.stat(fileUri);
        /** @type {number} */
        const fileLifeTime = Date.now() - fileStats.ctime;
        if (fileLifeTime > constants_1.METRICS_MAX_LIFETIME_MS) {
            try {
                await vscode.workspace.fs.delete(fileUri);
            }
            catch (e) {
                (0, logger_1.info)(`Error deleting file with metrics: ${((/** @type {!Error} */ (e))).message}`);
            }
        }
        else {
            /** @type {!Uint8Array} */
            const fileContentBytes = await vscode.workspace.fs.readFile(fileUri);
            /** @type {string} */
            const fileContent = decoder.decode(fileContentBytes);
            try {
                await postMetricsToConcordServer(fileContent);
                try {
                    await vscode.workspace.fs.delete(fileUri);
                }
                catch (e) {
                    (0, logger_1.info)(`Error deleting file with metrics: ${((/** @type {!Error} */ (e))).message}`);
                }
            }
            catch {
                return attempt + 1;
            }
        }
    }
    return 1;
}
/**
 * @param {string} body
 * @return {!Promise<!tsickle_concord_client_14.LogResponse>}
 */
function postMetricsToConcordServer(body) {
    return (0, concord_client_1.postMetricsToConcordServer)(body, (/**
     * @param {!Error} err
     * @return {void}
     */
    err => (0, logger_1.info)(`Error sending metrics: ${err.message}`)));
}
/** @type {!Poster} */
exports.PROD_POSTER = {
    defaultWait: MINUTE,
    post: (/**
     * @param {string} body
     * @return {!Promise<!tsickle_concord_client_14.LogResponse>}
     */
    (body) => postMetricsToConcordServer(body)),
    /**
     * @public
     * @param {string} data
     * @param {!tsickle_vscode_7.ExtensionContext} extensionContext
     * @return {void}
     */
    writeToFile(data, extensionContext) {
        saveMetricsToLocalFolder(data, extensionContext);
    },
    /**
     * @public
     * @param {number} attempt
     * @param {!tsickle_vscode_7.ExtensionContext} extensionContext
     * @return {!Promise<number>}
     */
    sendMetricsFromDisk(attempt, extensionContext) {
        return sendMetricsFromLocalFolder(attempt, extensionContext);
    },
};
/** @type {!Poster} */
exports.TEST_POSTER = {
    defaultWait: SECOND,
    post: (/**
     * @param {string} body
     * @return {!Promise<!tsickle_concord_client_14.LogResponse>}
     */
    (body) => {
        return new Promise((/**
         * @param {function((!tsickle_concord_client_14.LogResponse|!PromiseLike<!tsickle_concord_client_14.LogResponse>)): void} resolve
         * @param {function(?=): void} reject
         * @return {void}
         */
        (resolve, reject) => {
            /** @type {{hostname: string, port: number, path: string, method: string, headers: *}} */
            const options = {
                hostname: 'localhost',
                port: 27910,
                path: '/log',
                method: 'POST',
                headers: { 'Content-Length': Buffer.byteLength(body) },
            };
            const req = http.request(options, (/**
             * @param {?} res
             * @return {void}
             */
            (res) => {
                res.on('data', (/**
                 * @return {void}
                 */
                () => { }));
                res.on('end', (/**
                 * @return {void}
                 */
                () => resolve({ nextRequestWaitMs: SECOND })));
            }));
            req.on('error', (/**
             * @param {!Error} e
             * @return {void}
             */
            e => reject(e)));
            req.end(body);
        }));
    }),
    /**
     * @public
     * @return {void}
     */
    writeToFile() { },
    /**
     * @public
     * @return {!Promise<number>}
     */
    sendMetricsFromDisk() {
        return Promise.resolve(1);
    },
};
/** @type {(undefined|?)} */
const fileStream = process.env['CLOUDCODE_TEST'] && process.env['UI_TEST_NAME'] ? (0, fs_extra_1.createWriteStream)(process.env['METRICS_TEST_FILE'] || (0, path_1.join)((0, os_1.tmpdir)(), 'metrics'), { flags: 'a' }) : undefined;
/** @type {!Poster} */
exports.UI_TEST_POSTER = {
    defaultWait: SECOND,
    post: (/**
     * @param {string} body
     * @return {!Promise<!tsickle_concord_client_14.LogResponse>}
     */
    (body) => {
        return new Promise((/**
         * @param {function((!tsickle_concord_client_14.LogResponse|!PromiseLike<!tsickle_concord_client_14.LogResponse>)): void} resolve
         * @return {void}
         */
        (resolve) => {
            (0, logger_1.info)('posting metrics to server');
            if (process.env['KOKORO_JOB_TYPE'] === 'CONTINUOUS_INTEGRATION' || process.env['KOKORO_JOB_TYPE'] === 'RELEASE') {
                postMetricsToConcordServer(body).catch((/**
                 * @return {void}
                 */
                () => { }));
            }
            fileStream?.write(body);
            fileStream?.write(os_1.EOL);
            resolve({ nextRequestWaitMs: SECOND });
        }));
    }),
    /**
     * @public
     * @return {void}
     */
    writeToFile() { },
    /**
     * @public
     * @return {!Promise<number>}
     */
    sendMetricsFromDisk() {
        return Promise.resolve(1);
    },
};
/** @type {!Poster} */
exports.NOOP_POSTER = {
    defaultWait: MINUTE,
    post: (/**
     * @return {!Promise<{nextRequestWaitMs: number}>}
     */
    () => Promise.resolve({ nextRequestWaitMs: MINUTE })),
    /**
     * @public
     * @return {void}
     */
    writeToFile() { },
    /**
     * @public
     * @return {!Promise<number>}
     */
    sendMetricsFromDisk() {
        return Promise.resolve(1);
    },
};
/**
 * @param {!tsickle_file_utils_8.FileUtils=} fu
 * @param {(undefined|string)=} dir
 * @return {!Promise<string>}
 */
async function defaultInstallIdFile(fu = new file_utils_1.FileUtils(), dir) {
    if (!dir) {
        dir = await fu.getExtensionAppDataFolder();
    }
    return (0, path_1.join)(dir, 'install_id.txt');
}
exports.defaultInstallIdFile = defaultInstallIdFile;
/**
 * @return {string}
 */
function getConsoleType() {
    return 'CLOUDCODE_VSCODE';
}
exports.getConsoleType = getConsoleType;
/**
 * @param {!Array<string>} installIds
 * @return {string}
 */
function wipeoutBody(installIds) {
    /** @type {number} */
    const now = Date.now();
    /** @type {!Array<{event_time_ms: number, source_extension_json: string}>} */
    const events = installIds.map((/**
     * @param {string} id
     * @return {{event_time_ms: number, source_extension_json: string}}
     */
    (id) => {
        return {
            event_time_ms: now,
            source_extension_json: JSON.stringify({
                console_type: getConsoleType(),
                event_type: 'wipeoutRequest',
                event_name: 'INSTALL_ID',
                client_install_id: id,
            }),
        };
    }));
    /** @type {{log_source_name: string, request_time_ms: number, log_event: (!Array<{event_time_ms: number, source_extension_json: string}>|!Array<?>)}} */
    const request = {
        log_source_name: 'CONCORD',
        request_time_ms: now,
        log_event: (0, concord_client_1.fixBuf)(events),
    };
    return JSON.stringify((0, concord_client_1.fixBuf)(request));
}
exports.wipeoutBody = wipeoutBody;
/**
 * @param {*} error
 * @param {string=} defaultError
 * @return {string}
 */
function categorizeError(error, defaultError = constants_1.FailureReason.UNKNOWN) {
    /** @type {(undefined|string)} */
    let categorizedError;
    if (error instanceof gaxios_1.GaxiosError) {
        categorizedError = (/** @type {!tsickle_gaxios_2.GaxiosError<?>} */ (error)).response?.statusText ?? categorizedError;
    }
    else if (error instanceof error_types_1.PiiWrappedError) {
        categorizedError = (/** @type {!tsickle_error_types_12.PiiWrappedError} */ (error)).cloudcodeErrorMessage;
    }
    else if (error instanceof Error) {
        error = (/** @type {!Error} */ (error)).message;
    }
    if (typeof error === 'string') {
        if (/billing must be enabled/.test(error)) {
            categorizedError = constants_1.FailureReason.API_BILLING_NOT_ENABLED;
        }
        else if (/permission denied/.test(error) || /does not have permission/.test(error)) {
            categorizedError = constants_1.FailureReason.API_PERMISSION_DENIED;
        }
        else {
            for (const regex of messages_1.ErrorMessageRegexes.ALL_REGEXES) {
                if (regex.test(error)) {
                    categorizedError = regex.toString();
                    break;
                }
            }
        }
    }
    return categorizedError ?? defaultError;
}
exports.categorizeError = categorizeError;
/**
 * @param {number} n
 * @return {string}
 */
function bucketizeNumber(n) {
    n = n | 0;
    if (n < 10) {
        return '0-9';
    }
    /** @type {string} */
    const strN = n.toString();
    /** @type {number} */
    const baseValue = Number(strN[0] + '0'.repeat(strN.length - 1));
    /** @type {number} */
    const addingValue = Number('1' + '0'.repeat(strN.length - 1));
    /** @type {number} */
    const maxValue = baseValue + addingValue - 1;
    return `${baseValue}-${maxValue}`;
}
exports.bucketizeNumber = bucketizeNumber;
/**
 * Returns the message field if a valid Error object is given,
 * otherwise returns the string value of the object
 *
 * @param {*} e
 * @return {string}
 */
function getErrorMessage(e) {
    if (e instanceof Error) {
        return (/** @type {!Error} */ (e)).message;
    }
    return String(e);
}
exports.getErrorMessage = getErrorMessage;
/**
 * Returns the code field if a valid NodeJsSystemError type object
 * is given, otherwise returns undefined.
 *
 * @param {*} e
 * @return {(undefined|string)}
 */
function getErrorCode(e) {
    return ((/** @type {!tsickle_error_types_12.NodeJsSystemError} */ (e))).code;
}
exports.getErrorCode = getErrorCode;
/**
 * Returns the syscall field if a valid NodeJsSystemError type object
 * is given, otherwise returns undefined.
 *
 * @param {*} e
 * @return {(undefined|string)}
 */
function getSysCall(e) {
    return ((/** @type {!tsickle_error_types_12.NodeJsSystemError} */ (e))).syscall;
}
exports.getSysCall = getSysCall;
/**
 * @return {boolean}
 */
function hasTestMetricsEnvironmentOverride() {
    return process.env['CLOUDCODE_METRICS_MODE'] === 'TEST';
}
exports.hasTestMetricsEnvironmentOverride = hasTestMetricsEnvironmentOverride;
/**
 * Displays a notification if the user is in test mode
 * @return {!Promise<void>}
 */
async function showMetricsTestModeNotificationIfEnabled() {
    if (hasTestMetricsEnvironmentOverride()) {
        await vscode.window.showInformationMessage(constants_1.TEST_MODE_NOTIFICATION_TITLE);
    }
}
exports.showMetricsTestModeNotificationIfEnabled = showMetricsTestModeNotificationIfEnabled;
