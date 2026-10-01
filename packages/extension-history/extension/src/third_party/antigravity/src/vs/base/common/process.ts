/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/antigravity/src/vs/base/common/process.ts
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
goog.module('google3.third_party.antigravity.src.vs.base.common.process');
var module = module || { id: 'third_party/antigravity/src/vs/base/common/process.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_platform_1 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.platform");
const platform_1 = goog.require('google3.third_party.antigravity.src.vs.base.common.platform');
/** @type {?} */
let safeProcess;
// Native sandbox environment
/** @type {(undefined|{process: (undefined|!tsickle_platform_1.INodeProcess)})} */
const vscodeGlobal = ((/** @type {{vscode: (undefined|{process: (undefined|!tsickle_platform_1.INodeProcess)})}} */ (globalThis))).vscode;
if (typeof vscodeGlobal !== 'undefined' && typeof vscodeGlobal.process !== 'undefined') {
    /** @type {!tsickle_platform_1.INodeProcess} */
    const sandboxProcess = vscodeGlobal.process;
    safeProcess = {
        /**
         * @public
         * @return {string}
         */
        get platform() { return sandboxProcess.platform; },
        /**
         * @public
         * @return {string}
         */
        get arch() { return sandboxProcess.arch; },
        /**
         * @public
         * @return {!tsickle_platform_1.IProcessEnvironment}
         */
        get env() { return sandboxProcess.env; },
        /**
         * @public
         * @return {string}
         */
        cwd() { return sandboxProcess.cwd(); }
    };
}
// Native node.js environment
else if (typeof process !== 'undefined' && typeof process?.versions?.node === 'string') {
    safeProcess = {
        /**
         * @public
         * @return {string}
         */
        get platform() { return process.platform; },
        /**
         * @public
         * @return {string}
         */
        get arch() { return process.arch; },
        /**
         * @public
         * @return {!tsickle_platform_1.IProcessEnvironment}
         */
        get env() { return process.env; },
        /**
         * @public
         * @return {string}
         */
        cwd() { return process.env['VSCODE_CWD'] || process.cwd(); }
    };
}
// Web environment
else {
    safeProcess = {
        // Supported
        /**
         * @public
         * @return {string}
         */
        get platform() { return platform_1.isWindows ? 'win32' : platform_1.isMacintosh ? 'darwin' : 'linux'; },
        /**
         * @public
         * @return {undefined}
         */
        get arch() { return undefined; /* arch is undefined in web */ },
        // Unsupported
        /**
         * @public
         * @return {*}
         */
        get env() { return {}; },
        /**
         * @public
         * @return {string}
         */
        cwd() { return '/'; }
    };
}
/**
 * Provides safe access to the `cwd` property in node.js, sandboxed or web
 * environments.
 *
 * Note: in web, this property is hardcoded to be `/`.
 *
 * \@skipMangle
 * @type {function(): string}
 */
exports.cwd = safeProcess.cwd;
/**
 * Provides safe access to the `env` property in node.js, sandboxed or web
 * environments.
 *
 * Note: in web, this property is hardcoded to be `{}`.
 * @type {!tsickle_platform_1.IProcessEnvironment}
 */
exports.env = safeProcess.env;
/**
 * Provides safe access to the `platform` property in node.js, sandboxed or web
 * environments.
 * @type {string}
 */
exports.platform = safeProcess.platform;
/**
 * Provides safe access to the `arch` method in node.js, sandboxed or web
 * environments.
 * Note: `arch` is `undefined` in web
 * @type {(undefined|string)}
 */
exports.arch = safeProcess.arch;
