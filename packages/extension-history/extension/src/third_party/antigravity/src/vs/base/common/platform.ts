/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/antigravity/src/vs/base/common/platform.ts
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
goog.module('google3.third_party.antigravity.src.vs.base.common.platform');
var module = module || { id: 'third_party/antigravity/src/vs/base/common/platform.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_nls_1 = goog.requireType("google3.third_party.antigravity.src.vs.nls");
const nls = goog.require('google3.third_party.antigravity.src.vs.nls');
/** @type {string} */
exports.LANGUAGE_DEFAULT = 'en';
/** @type {boolean} */
let _isWindows = false;
/** @type {boolean} */
let _isMacintosh = false;
/** @type {boolean} */
let _isLinux = false;
/** @type {boolean} */
let _isLinuxSnap = false;
/** @type {boolean} */
let _isNative = false;
/** @type {boolean} */
let _isWeb = false;
/** @type {boolean} */
let _isElectron = false;
/** @type {boolean} */
let _isIOS = false;
/** @type {boolean} */
let _isCI = false;
/** @type {boolean} */
let _isMobile = false;
/** @type {(undefined|string)} */
let _locale = undefined;
/** @type {string} */
let _language = exports.LANGUAGE_DEFAULT;
/** @type {string} */
let _platformLocale = exports.LANGUAGE_DEFAULT;
/** @type {(undefined|string)} */
let _translationsConfigFile = undefined;
/** @type {(undefined|string)} */
let _userAgent = undefined;
/**
 * @record
 */
function IProcessEnvironment() { }
exports.IProcessEnvironment = IProcessEnvironment;
/**
 * This interface is intentionally not identical to node.js
 * process because it also works in sandboxed environments
 * where the process object is implemented differently. We
 * define the properties here that we need for `platform`
 * to work and nothing else.
 * @record
 */
function INodeProcess() { }
exports.INodeProcess = INodeProcess;
/* istanbul ignore if */
if (false) {
    /**
     * @type {string}
     * @public
     */
    INodeProcess.prototype.platform;
    /**
     * @type {string}
     * @public
     */
    INodeProcess.prototype.arch;
    /**
     * @type {!IProcessEnvironment}
     * @public
     */
    INodeProcess.prototype.env;
    /**
     * @type {(undefined|{node: (undefined|string), electron: (undefined|string), chrome: (undefined|string)})}
     * @public
     */
    INodeProcess.prototype.versions;
    /**
     * @type {(undefined|string)}
     * @public
     */
    INodeProcess.prototype.type;
    /**
     * @type {function(): string}
     * @public
     */
    INodeProcess.prototype.cwd;
}
/** @type {?} */
const $globalThis = globalThis;
/** @type {(undefined|!INodeProcess)} */
let nodeProcess = undefined;
if (typeof $globalThis.vscode !== 'undefined' && typeof $globalThis.vscode.process !== 'undefined') {
    // Native environment (sandboxed)
    nodeProcess = $globalThis.vscode.process;
}
else if (typeof process !== 'undefined' && typeof process?.versions?.node === 'string') {
    // Native environment (non-sandboxed)
    nodeProcess = process;
}
/** @type {boolean} */
const isElectronProcess = typeof nodeProcess?.versions?.electron === 'string';
/** @type {boolean} */
const isElectronRenderer = isElectronProcess && nodeProcess?.type === 'renderer';
/**
 * @record
 */
function INavigator() { }
/* istanbul ignore if */
if (false) {
    /**
     * @type {string}
     * @public
     */
    INavigator.prototype.userAgent;
    /**
     * @type {(undefined|number)}
     * @public
     */
    INavigator.prototype.maxTouchPoints;
    /**
     * @type {string}
     * @public
     */
    INavigator.prototype.language;
}
// Native environment
if (typeof nodeProcess === 'object') {
    _isWindows = (nodeProcess.platform === 'win32');
    _isMacintosh = (nodeProcess.platform === 'darwin');
    _isLinux = (nodeProcess.platform === 'linux');
    _isLinuxSnap = _isLinux && !!nodeProcess.env['SNAP'] && !!nodeProcess.env['SNAP_REVISION'];
    _isElectron = isElectronProcess;
    _isCI = !!nodeProcess.env['CI'] || !!nodeProcess.env['BUILD_ARTIFACTSTAGINGDIRECTORY'] || !!nodeProcess.env['GITHUB_WORKSPACE'];
    _locale = exports.LANGUAGE_DEFAULT;
    _language = exports.LANGUAGE_DEFAULT;
    /** @type {(undefined|string)} */
    const rawNlsConfig = nodeProcess.env['VSCODE_NLS_CONFIG'];
    if (rawNlsConfig) {
        try {
            /** @type {!tsickle_nls_1.INLSConfiguration} */
            const nlsConfig = (/** @type {!tsickle_nls_1.INLSConfiguration} */ (JSON.parse(rawNlsConfig)));
            _locale = nlsConfig.userLocale;
            _platformLocale = nlsConfig.osLocale;
            _language = nlsConfig.resolvedLanguage || exports.LANGUAGE_DEFAULT;
            _translationsConfigFile = nlsConfig.languagePack?.translationsConfigFile;
        }
        catch (e) {
        }
    }
    _isNative = true;
}
// Web environment
else if (typeof navigator === 'object' && !isElectronRenderer) {
    _userAgent = navigator.userAgent;
    _isWindows = _userAgent.indexOf('Windows') >= 0;
    _isMacintosh = _userAgent.indexOf('Macintosh') >= 0;
    _isIOS = (_userAgent.indexOf('Macintosh') >= 0 || _userAgent.indexOf('iPad') >= 0 || _userAgent.indexOf('iPhone') >= 0) && !!navigator.maxTouchPoints && navigator.maxTouchPoints > 0;
    // go/vscode-patch#fast-forward https://github.com/microsoft/vscode/pull/248134
    _isLinux = _userAgent.indexOf('Linux') >= 0 || _userAgent.indexOf('CrOS') >= 0;
    _isMobile = _userAgent?.indexOf('Mobi') >= 0;
    _isWeb = true;
    _language = nls.getNLSLanguage() || exports.LANGUAGE_DEFAULT;
    _locale = navigator.language.toLowerCase();
    _platformLocale = _locale;
}
// Unknown environment
else {
    console.error('Unable to resolve platform.');
}
/** @enum {number} */
var Platform = {
    Web: 0,
    Mac: 1,
    Linux: 2,
    Windows: 3,
};
exports.Platform = Platform;
Platform[Platform.Web] = 'Web';
Platform[Platform.Mac] = 'Mac';
Platform[Platform.Linux] = 'Linux';
Platform[Platform.Windows] = 'Windows';
/** @typedef {string} */
exports.PlatformName;
/**
 * @param {!Platform} platform
 * @return {string}
 */
function PlatformToString(platform) {
    switch (platform) {
        case Platform.Web: return 'Web';
        case Platform.Mac: return 'Mac';
        case Platform.Linux: return 'Linux';
        case Platform.Windows: return 'Windows';
    }
}
exports.PlatformToString = PlatformToString;
/** @type {!Platform} */
let _platform = Platform.Web;
if (_isMacintosh) {
    _platform = Platform.Mac;
}
else if (_isWindows) {
    _platform = Platform.Windows;
}
else if (_isLinux) {
    _platform = Platform.Linux;
}
/** @type {boolean} */
exports.isWindows = _isWindows;
/** @type {boolean} */
exports.isMacintosh = _isMacintosh;
/** @type {boolean} */
exports.isLinux = _isLinux;
/** @type {boolean} */
exports.isLinuxSnap = _isLinuxSnap;
/** @type {boolean} */
exports.isNative = _isNative;
/** @type {boolean} */
exports.isElectron = _isElectron;
/** @type {boolean} */
exports.isWeb = _isWeb;
/** @type {boolean} */
exports.isWebWorker = (_isWeb && typeof $globalThis.importScripts === 'function');
/** @type {?} */
exports.webWorkerOrigin = exports.isWebWorker ? $globalThis.origin : undefined;
/** @type {boolean} */
exports.isIOS = _isIOS;
/** @type {boolean} */
exports.isMobile = _isMobile;
/**
 * Whether we run inside a CI environment, such as
 * GH actions or Azure Pipelines.
 * @type {boolean}
 */
exports.isCI = _isCI;
/** @type {!Platform} */
exports.platform = _platform;
/** @type {(undefined|string)} */
exports.userAgent = _userAgent;
/**
 * The language used for the user interface. The format of
 * the string is all lower case (e.g. zh-tw for Traditional
 * Chinese or de for German)
 * @type {string}
 */
exports.language = _language;
var Language;
(function (Language) {
    /**
     * @return {string}
     */
    function value() {
        return exports.language;
    }
    Language.value = value;
    /**
     * @return {boolean}
     */
    function isDefaultVariant() {
        if (exports.language.length === 2) {
            return exports.language === 'en';
        }
        else if (exports.language.length >= 3) {
            return exports.language[0] === 'e' && exports.language[1] === 'n' && exports.language[2] === '-';
        }
        else {
            return false;
        }
    }
    Language.isDefaultVariant = isDefaultVariant;
    /**
     * @return {boolean}
     */
    function isDefault() {
        return exports.language === 'en';
    }
    Language.isDefault = isDefault;
})(Language || (Language = {}));
exports.Language = Language;
/**
 * Desktop: The OS locale or the locale specified by --locale or `argv.json`.
 * Web: matches `platformLocale`.
 *
 * The UI is not necessarily shown in the provided locale.
 * @type {(undefined|string)}
 */
exports.locale = _locale;
/**
 * This will always be set to the OS/browser's locale regardless of
 * what was specified otherwise. The format of the string is all
 * lower case (e.g. zh-tw for Traditional Chinese). The UI is not
 * necessarily shown in the provided locale.
 * @type {string}
 */
exports.platformLocale = _platformLocale;
/**
 * The translations that are available through language packs.
 * @type {(undefined|string)}
 */
exports.translationsConfigFile = _translationsConfigFile;
/** @type {boolean} */
exports.setTimeout0IsFaster = (typeof $globalThis.postMessage === 'function' && !$globalThis.importScripts);
/**
 * See https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#:~:text=than%204%2C%20then-,set%20timeout%20to%204,-.
 *
 * Works similarly to `setTimeout(0)` but doesn't suffer from the 4ms artificial delay
 * that browsers set when the nesting level is > 5.
 * @type {function(function(): void): void}
 */
exports.setTimeout0 = ((/**
 * @return {function(function(): void): void}
 */
() => {
    if (exports.setTimeout0IsFaster) {
        /**
         * @record
         */
        function IQueueElement() { }
        /* istanbul ignore if */
        if (false) {
            /**
             * @type {number}
             * @public
             */
            IQueueElement.prototype.id;
            /**
             * @type {function(): void}
             * @public
             */
            IQueueElement.prototype.callback;
        }
        /** @type {!Array<!IQueueElement>} */
        const pending = [];
        $globalThis.addEventListener('message', (/**
         * @param {?} e
         * @return {void}
         */
        (e) => {
            if (e.data && e.data.vscodeScheduleAsyncWork) {
                for (let i = 0, len = pending.length; i < len; i++) {
                    /** @type {!IQueueElement} */
                    const candidate = pending[i];
                    if (candidate.id === e.data.vscodeScheduleAsyncWork) {
                        pending.splice(i, 1);
                        candidate.callback();
                        return;
                    }
                }
            }
        }));
        /** @type {number} */
        let lastId = 0;
        return (/**
         * @param {function(): void} callback
         * @return {void}
         */
        (callback) => {
            /** @type {number} */
            const myId = ++lastId;
            pending.push({
                id: myId,
                callback: callback
            });
            $globalThis.postMessage({ vscodeScheduleAsyncWork: myId }, '*');
        });
    }
    return (/**
     * @param {function(): void} callback
     * @return {number}
     */
    (callback) => setTimeout(callback));
}))();
/** @enum {number} */
var OperatingSystem = {
    Windows: 1,
    Macintosh: 2,
    Linux: 3,
};
exports.OperatingSystem = OperatingSystem;
OperatingSystem[OperatingSystem.Windows] = 'Windows';
OperatingSystem[OperatingSystem.Macintosh] = 'Macintosh';
OperatingSystem[OperatingSystem.Linux] = 'Linux';
/** @type {!OperatingSystem} */
exports.OS = (_isMacintosh || _isIOS ? OperatingSystem.Macintosh : (_isWindows ? OperatingSystem.Windows : OperatingSystem.Linux));
/** @type {boolean} */
let _isLittleEndian = true;
/** @type {boolean} */
let _isLittleEndianComputed = false;
/**
 * @return {boolean}
 */
function isLittleEndian() {
    if (!_isLittleEndianComputed) {
        _isLittleEndianComputed = true;
        /** @type {!Uint8Array} */
        const test = new Uint8Array(2);
        test[0] = 1;
        test[1] = 2;
        /** @type {!Uint16Array} */
        const view = new Uint16Array(test.buffer);
        _isLittleEndian = (view[0] === (2 << 8) + 1);
    }
    return _isLittleEndian;
}
exports.isLittleEndian = isLittleEndian;
/** @type {boolean} */
exports.isChrome = !!(exports.userAgent && exports.userAgent.indexOf('Chrome') >= 0);
/** @type {boolean} */
exports.isFirefox = !!(exports.userAgent && exports.userAgent.indexOf('Firefox') >= 0);
/** @type {boolean} */
exports.isSafari = !!(!exports.isChrome && (exports.userAgent && exports.userAgent.indexOf('Safari') >= 0));
/** @type {boolean} */
exports.isEdge = !!(exports.userAgent && exports.userAgent.indexOf('Edg/') >= 0);
/** @type {boolean} */
exports.isAndroid = !!(exports.userAgent && exports.userAgent.indexOf('Android') >= 0);
/**
 * @param {string} osVersion
 * @return {boolean}
 */
function isTahoeOrNewer(osVersion) {
    return parseFloat(osVersion) >= 25;
}
exports.isTahoeOrNewer = isTahoeOrNewer;
