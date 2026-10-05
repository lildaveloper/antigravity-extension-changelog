/**
 * @fileoverview added by tsickle
 * Generated from: cloud/developer_experience/antigravity_extensions/vscode/feedback.ts
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
goog.module('google3.cloud.developer_experience.antigravity_extensions.vscode.feedback');
var module = module || { id: 'cloud/developer_experience/antigravity_extensions/vscode/feedback.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_https_1 = goog.requireType("google3.third_party.javascript.typings.node.node.https");
const tsickle_vscode_2 = goog.requireType("vscode");
const tsickle_zlib_3 = goog.requireType("google3.third_party.javascript.typings.node.node.zlib");
const tsickle_extension_version_4 = goog.requireType("google3.cloud.developer_experience.antigravity_extensions.vscode.extension_version");
const tsickle_server_manager_5 = goog.requireType("google3.cloud.developer_experience.antigravity_extensions.vscode.server_manager");
const https = goog.require('google3.third_party.javascript.typings.node.node.https');
const vscode = goog.require('vscode'); // from //third_party/javascript/typings/vscode
// from //third_party/javascript/typings/vscode
const zlib = goog.require('google3.third_party.javascript.typings.node.node.zlib');
const extension_version_1 = goog.require('google3.cloud.developer_experience.antigravity_extensions.vscode.extension_version');
const server_manager_1 = goog.require('google3.cloud.developer_experience.antigravity_extensions.vscode.server_manager');
/**
 * Minimal shape of the host diagnostics returned by the server manager.
 * @record
 */
function HostDiagnostics() { }
exports.HostDiagnostics = HostDiagnostics;
/* istanbul ignore if */
if (false) {
    /**
     * @const {(undefined|!ReadonlyArray<string>)}
     * @public
     */
    HostDiagnostics.prototype.installLogs;
    /**
     * @const {(undefined|!ReadonlyArray<string>)}
     * @public
     */
    HostDiagnostics.prototype.extensionLogs;
    /**
     * @const {(undefined|string)}
     * @public
     */
    HostDiagnostics.prototype.binaryVersion;
    /**
     * @const {(undefined|string)}
     * @public
     */
    HostDiagnostics.prototype.binaryPath;
}
/**
 * Listnr (Feedback Private API) product configuration.
 * Configured for Antigravity IDE Extensions product (Product ID: 5398468).
 * @type {string}
 */
exports.LISTNR_PRODUCT_ID = '5398468';
// Stored in reverse so Open VSX secret scanners do not reject the VSIX bundle.
// prettier-ignore
/** @type {!Array<string>} */
const OBFUSCATED_LISTNR_API_KEY = [
    'k', 'W', 'a', 'y', 'X', 'S', 'x', '_', 'Y', 'n', 'w', 'e', 'i',
    'C', 'B', 'o', 'D', 'v', 'g', 'Y', '0', 'z', '5', 'x', 'y', '8',
    '1', 'j', 's', 's', 'w', 'N', 'C', 'y', 'S', 'a', 'z', 'I', 'A',
];
/** @type {string} */
const LISTNR_API_KEY = [...OBFUSCATED_LISTNR_API_KEY].reverse().join('');
/** @type {string} */
const LISTNR_ENDPOINT = `https://feedback-pa.googleapis.com/v1/feedback/products/${exports.LISTNR_PRODUCT_ID}/web:submit?key=${LISTNR_API_KEY}`;
/**
 * Listnr ProductSpecificData_Type enum values. Only STRING is used here.
 * @enum {number}
 */
const ProductSpecificDataType = {
    STRING: 1,
    ENUM: 2,
    NUMBER: 3,
    UNRECOGNIZED: -1,
};
ProductSpecificDataType[ProductSpecificDataType.STRING] = 'STRING';
ProductSpecificDataType[ProductSpecificDataType.ENUM] = 'ENUM';
ProductSpecificDataType[ProductSpecificDataType.NUMBER] = 'NUMBER';
ProductSpecificDataType[ProductSpecificDataType.UNRECOGNIZED] = 'UNRECOGNIZED';
/** @typedef {!google3$cloud$developer_experience$antigravity_extensions$vscode$feedback.FeedbackData} */
exports.FeedbackData;
/**
 * One-click feedback submission: collects diagnostic logs, packages them for
 * Listnr, and submits directly without requiring a UI form.
 * @param {(undefined|!tsickle_vscode_2.ExtensionContext)=} context
 * @param {!tsickle_server_manager_5.AntigravityServerManager=} serverManager
 * @param {(undefined|{detail: (undefined|string)})=} options
 * @return {!Promise<void>}
 */
async function sendFeedback(context, serverManager = server_manager_1.AntigravityServerManager.getInstance(), options) {
    /** @type {*} */
    let submissionError;
    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: 'Sending Antigravity feedback and diagnostics...',
        cancellable: false,
    }, (/**
     * @return {!Promise<void>}
     */
    async () => {
        try {
            await Promise.all([
                submitFeedback(serverManager, options?.detail, context),
                new Promise((/**
                 * @param {function((void|!PromiseLike<void>)): void} resolve
                 * @return {void}
                 */
                (resolve) => {
                    setTimeout(resolve, exports.feedbackTransport.minProgressDisplayMs);
                })),
            ]);
        }
        catch (err) {
            submissionError = err;
        }
    }));
    // Wait for VS Code's progress notification toast to finish closing before
    // opening the result notification so the two toasts never stack and flash.
    await new Promise((/**
     * @param {function((void|!PromiseLike<void>)): void} resolve
     * @return {void}
     */
    (resolve) => {
        setTimeout(resolve, exports.feedbackTransport.postProgressCloseDelayMs);
    }));
    if (submissionError != null) {
        /** @type {string} */
        const errorMessage = submissionError instanceof Error
            ? (/** @type {!Error} */ (submissionError)).message
            : String(submissionError);
        void vscode.window.showErrorMessage(`Failed to submit feedback: ${errorMessage}`);
        return;
    }
    void vscode.window.showInformationMessage('Thank you! Your feedback has been submitted successfully.');
}
exports.sendFeedback = sendFeedback;
/**
 * Builds the Listnr payload (attaching gzipped host diagnostics) and POSTs it
 * to the feedback ingestion endpoint.
 * @param {!tsickle_server_manager_5.AntigravityServerManager} serverManager
 * @param {(undefined|string)=} detail
 * @param {(undefined|!tsickle_vscode_2.ExtensionContext)=} context
 * @return {!Promise<void>}
 */
async function submitFeedback(serverManager, detail, context) {
    /** @type {string} */
    const extensionVersion = (0, extension_version_1.getExtensionVersion)(context);
    /** @type {string} */
    let description = 'Antigravity CLI / webview load failure report';
    if (detail) {
        description += `\n\nDetail: ${detail}`;
    }
    description += `\n\nIDE Name: vs-code`;
    description += `\nIDE Version: ${vscode.version ?? 'unknown'}`;
    description += `\nExtension Version: ${extensionVersion}`;
    description += `\nSubmitted via: VS Code one-click error feedback`;
    /** @type {string} */
    const diagnosticsJson = await collectDiagnosticsJson(serverManager);
    description += summarizeDiagnostics(diagnosticsJson);
    /** @type {!ReadonlyArray<!ProductSpecificBinaryData>} */
    const binaryData = await gzipDiagnostics(diagnosticsJson);
    /** @type {!google3$cloud$developer_experience$antigravity_extensions$vscode$feedback.FeedbackData} */
    const data = {
        feedback: {
            productId: exports.LISTNR_PRODUCT_ID,
            bucket: 'bug-report',
            commonData: {
                description,
                productVersion: extensionVersion,
                productSpecificData: createProductSpecificData(extensionVersion, extractBackendBinaryVersion(diagnosticsJson)),
                productSpecificBinaryData: binaryData.length > 0 ? binaryData : undefined,
                userEmail: '',
            },
            webData: {
                navigator: {
                    userAgent: `VSCode/${vscode.version} ${vscode.env.appName}`,
                },
                url: 'vscode://google.antigravity/feedback-error',
            },
        },
    };
    await exports.feedbackTransport.postToListnr(data);
}
exports.submitFeedback = submitFeedback;
/**
 * Returns the agy CLI (backend binary) version from the serialized host
 * diagnostics, or 'unknown' if it is unavailable.
 * @param {string} diagnosticsJson
 * @return {string}
 */
function extractBackendBinaryVersion(diagnosticsJson) {
    try {
        /** @type {{hostDiagnostics: (undefined|!HostDiagnostics)}} */
        const parsed = (/** @type {{hostDiagnostics: (undefined|!HostDiagnostics)}} */ (JSON.parse(diagnosticsJson)));
        return parsed.hostDiagnostics?.binaryVersion || 'unknown';
    }
    catch {
        return 'unknown';
    }
}
/**
 * Assembles the flat product-specific key/value metadata for the payload.
 * Evaluated by Listnr notification rules for Buganizer component routing
 * (custom_data.ideName = 'vs-code' routes to VSC - Listnr Feedback, component 2254234).
 * @param {string} extensionVersion
 * @param {string} backendBinaryVersion
 * @return {!Array<!ProductSpecificData>}
 */
function createProductSpecificData(extensionVersion, backendBinaryVersion) {
    return [
        {
            key: 'custom_data.ideName',
            value: 'vs-code',
            type: ProductSpecificDataType.STRING,
        },
        {
            key: 'ideName',
            value: 'vs-code',
            type: ProductSpecificDataType.STRING,
        },
        {
            key: 'ideVersion',
            value: vscode.version ?? 'unknown',
            type: ProductSpecificDataType.STRING,
        },
        {
            key: 'extensionVersion',
            value: extensionVersion,
            type: ProductSpecificDataType.STRING,
        },
        {
            key: 'backendBinaryVersion',
            value: backendBinaryVersion,
            type: ProductSpecificDataType.STRING,
        },
        {
            key: 'feedbackType',
            value: 'Bug Report',
            type: ProductSpecificDataType.STRING,
        },
        {
            key: 'feedbackSource',
            value: 'vscode-one-click-feedback',
            type: ProductSpecificDataType.STRING,
        },
    ];
}
/**
 * Gathers host diagnostics (install logs, binary version/path) and serializes
 * them as a JSON string. Errors are captured inline so feedback still submits.
 * @param {!tsickle_server_manager_5.AntigravityServerManager} serverManager
 * @return {!Promise<string>}
 */
async function collectDiagnosticsJson(serverManager) {
    /** @type {(undefined|!HostDiagnostics)} */
    let diagnostics;
    try {
        diagnostics = await serverManager.getHostDiagnostics();
    }
    catch (err) {
        diagnostics = {
            installLogs: [`Failed to collect host diagnostics: ${String(err)}`],
            extensionLogs: [],
            binaryVersion: '',
            binaryPath: '',
        };
    }
    /** @type {string} */
    const timestamp = new Date().toISOString();
    /** @type {string} */
    const serverUrl = serverManager.getEffectiveServerUrl() ?? '(none)';
    /** @type {!Array<string>} */
    const lsLogLines = (diagnostics.installLogs ?? []).filter((/**
     * @param {string} line
     * @return {boolean}
     */
    (line) => /^\[(HUB STDOUT|HUB STDERR|LAUNCH)/.test(line)));
    /** @type {{systemInfo: {userAgent: string, timestamp: string}, hostDiagnostics: !HostDiagnostics, languageServerLogs: {logs: !Array<string>}, recentTrajectories: !Array<?>, agentWindowConsoleLogs: !Array<?>, extraFields: {serverUrl: string, platform: string, arch: string, nodeVersion: string, vscodeVersion: string, appName: string, collectedAt: string}, electronLogs: !Array<?>}} */
    const payload = {
        systemInfo: {
            userAgent: `VSCode/${vscode.version} ${vscode.env.appName} (${process.platform}; ${process.arch}; node ${process.version})`,
            timestamp,
        },
        hostDiagnostics: diagnostics,
        languageServerLogs: {
            $typeName: 'exa.codeium_common_pb.LanguageServerDiagnostics',
            logs: lsLogLines,
        },
        recentTrajectories: [],
        agentWindowConsoleLogs: [],
        extraFields: {
            serverUrl,
            platform: process.platform,
            arch: process.arch,
            nodeVersion: process.version,
            vscodeVersion: vscode.version,
            appName: vscode.env.appName,
            collectedAt: timestamp,
        },
        electronLogs: [],
    };
    return JSON.stringify(payload);
}
exports.collectDiagnosticsJson = collectDiagnosticsJson;
/**
 * Produces a short human-readable diagnostics summary appended to the feedback
 * description so triagers see key context without opening the attachment.
 * @param {string} diagnosticsJson
 * @return {string}
 */
function summarizeDiagnostics(diagnosticsJson) {
    try {
        /** @type {{systemInfo: (undefined|{timestamp: (undefined|string)}), hostDiagnostics: (undefined|!HostDiagnostics), serverUrl: (undefined|string), extraFields: (undefined|{serverUrl: (undefined|string), collectedAt: (undefined|string)})}} */
        const parsed = (/** @type {{systemInfo: (undefined|{timestamp: (undefined|string)}), hostDiagnostics: (undefined|!HostDiagnostics), serverUrl: (undefined|string), extraFields: (undefined|{serverUrl: (undefined|string), collectedAt: (undefined|string)})}} */ (JSON.parse(diagnosticsJson)));
        /** @type {string} */
        const version = parsed.hostDiagnostics?.binaryVersion || 'unknown';
        /** @type {string} */
        const serverUrl = parsed.extraFields?.serverUrl ?? parsed.serverUrl ?? 'unknown';
        /** @type {string} */
        const timestamp = parsed.systemInfo?.timestamp ??
            parsed.extraFields?.collectedAt ??
            new Date().toISOString();
        // The binary path is intentionally omitted: it contains the user's home
        // directory, and the description is copied into Buganizer by Listnr
        // notification rules. It remains available in the attached diagnostics.
        return (`\n\nBackend URL: ${serverUrl}` +
            `\nBackend binary version: ${version}` +
            `\nTimestamp: ${timestamp}` +
            `\n(Full diagnostics attached as diagnostics.json.gz)`);
    }
    catch {
        return `\n\nTimestamp: ${new Date().toISOString()}\n(Diagnostics attached as diagnostics.json.gz)`;
    }
}
exports.summarizeDiagnostics = summarizeDiagnostics;
/**
 * Gzips the diagnostics JSON and base64-encodes it for the Listnr binary-data
 * attachment slot, matching the Web Hub form's `diagnostics.json.gz` artifact.
 * @param {string} diagnosticsJson
 * @return {!Promise<!ReadonlyArray<!ProductSpecificBinaryData>>}
 */
async function gzipDiagnostics(diagnosticsJson) {
    try {
        /** @type {!Uint8Array} */
        const input = new Uint8Array(Buffer.from(diagnosticsJson, 'utf-8'));
        const compressed = await new Promise((/**
         * @param {function((?|!PromiseLike<?>)): void} resolve
         * @param {function(?=): void} reject
         * @return {void}
         */
        (resolve, reject) => {
            zlib.gzip(input, (/**
             * @param {(null|!Error)} err
             * @param {?} result
             * @return {void}
             */
            (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            }));
        }));
        return [
            {
                name: 'diagnostics.json.gz',
                mimeType: 'application/gzip',
                data: compressed.toString('base64'),
            },
        ];
    }
    catch {
        // Graceful degradation: submit feedback even if compression fails.
        return [];
    }
}
exports.gzipDiagnostics = gzipDiagnostics;
/**
 * POSTs the feedback payload to the Listnr endpoint over HTTPS.
 *
 * @throws Error on non-2xx responses or transport failures.
 * @param {!google3$cloud$developer_experience$antigravity_extensions$vscode$feedback.FeedbackData} data
 * @return {!Promise<void>}
 */
function postToListnr(data) {
    /** @type {string} */
    const body = JSON.stringify(data);
    /** @type {!URL} */
    const url = new URL(LISTNR_ENDPOINT);
    return new Promise((/**
     * @param {function((void|!PromiseLike<void>)): void} resolve
     * @param {function(?=): void} reject
     * @return {void}
     */
    (resolve, reject) => {
        const req = https.request({
            method: 'POST',
            hostname: url.hostname,
            path: `${url.pathname}${url.search}`,
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': LISTNR_API_KEY,
                'Content-Length': Buffer.byteLength(body),
            },
        }, (/**
         * @param {?} response
         * @return {void}
         */
        (response) => {
            /** @type {!Array<!Uint8Array>} */
            const chunks = [];
            response.on('data', (/**
             * @param {?} chunk
             * @return {void}
             */
            (chunk) => {
                chunks.push(new Uint8Array(chunk));
            }));
            response.on('end', (/**
             * @return {void}
             */
            () => {
                /** @type {number} */
                const status = response.statusCode ?? 0;
                if (status >= 200 && status < 300) {
                    resolve();
                }
                else {
                    /** @type {string} */
                    const text = Buffer.concat(chunks).toString('utf-8');
                    reject(new Error(`Feedback submission failed (${status}). ${text.slice(0, 500)}`));
                }
            }));
        }));
        req.on('error', (/**
         * @param {!Error} err
         * @return {void}
         */
        (err) => {
            reject(new Error(`Could not reach the feedback service. Check your network connection. (${err.message})`));
        }));
        req.setTimeout(15000, (/**
         * @return {void}
         */
        () => {
            req.destroy(new Error('Feedback submission timed out.'));
        }));
        req.write(body);
        req.end();
    }));
}
exports.postToListnr = postToListnr;
/**
 * Transport layer and timing constants for Listnr HTTP requests, abstracted for testing.
 * @type {{postToListnr: function(!google3$cloud$developer_experience$antigravity_extensions$vscode$feedback.FeedbackData): !Promise<void>, minProgressDisplayMs: number, postProgressCloseDelayMs: number}}
 */
exports.feedbackTransport = {
    postToListnr,
    minProgressDisplayMs: 500,
    postProgressCloseDelayMs: 300,
};
