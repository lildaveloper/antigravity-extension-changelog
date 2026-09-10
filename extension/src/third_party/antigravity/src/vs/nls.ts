/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/antigravity/src/vs/nls.ts
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
goog.module('google3.third_party.antigravity.src.vs.nls');
var module = module || { id: 'third_party/antigravity/src/vs/nls.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
/**
 * @return {!Array<string>}
 */
function getNLSMessages() {
    return globalThis._VSCODE_NLS_MESSAGES;
}
exports.getNLSMessages = getNLSMessages;
/**
 * @return {(undefined|string)}
 */
function getNLSLanguage() {
    return globalThis._VSCODE_NLS_LANGUAGE;
}
exports.getNLSLanguage = getNLSLanguage;
/**
 * @record
 */
function ILocalizeInfo() { }
exports.ILocalizeInfo = ILocalizeInfo;
/* istanbul ignore if */
if (false) {
    /**
     * @type {string}
     * @public
     */
    ILocalizeInfo.prototype.key;
    /**
     * @type {!Array<string>}
     * @public
     */
    ILocalizeInfo.prototype.comment;
}
/**
 * @record
 */
function ILocalizedString() { }
exports.ILocalizedString = ILocalizedString;
/* istanbul ignore if */
if (false) {
    /**
     * @type {string}
     * @public
     */
    ILocalizedString.prototype.original;
    /**
     * @type {string}
     * @public
     */
    ILocalizedString.prototype.value;
}
/**
 * @param {string} message
 * @param {!Array<?>} args
 * @return {string}
 */
function _format(message, args) {
    /** @type {string} */
    let result;
    if (args.length === 0) {
        result = message;
    }
    else {
        result = message.replace(/\{(\d+)\}/g, (/**
         * @param {string} match
         * @param {?} rest
         * @return {?}
         */
        function (match, rest) {
            /** @type {?} */
            const index = rest[0];
            return typeof args[index] !== 'undefined' ? args[index] : match;
        }));
    }
    return result;
}
/**
 * @param {(string|!ILocalizeInfo)} data
 * @param {string} message
 * @param {...?} args
 * @return {string}
 */
function localize(data, message, ...args) {
    return _format(message, args);
}
exports.localize = localize;
/**
 * @param {(string|!ILocalizeInfo)} data
 * @param {string} message
 * @param {...?} args
 * @return {!ILocalizedString}
 */
function localize2(data, message, ...args) {
    /** @type {string} */
    const res = _format(message, args);
    return {
        original: res,
        value: res
    };
}
exports.localize2 = localize2;
/**
 * @param {string} _
 * @return {undefined}
 */
function getConfiguredDefaultLocale(_) {
    return undefined;
}
exports.getConfiguredDefaultLocale = getConfiguredDefaultLocale;
/**
 * @record
 */
function INLSLanguagePackConfiguration() { }
exports.INLSLanguagePackConfiguration = INLSLanguagePackConfiguration;
/* istanbul ignore if */
if (false) {
    /**
     * The path to the translations config file that contains pointers to
     * all message bundles for `main` and extensions.
     * @const {string}
     * @public
     */
    INLSLanguagePackConfiguration.prototype.translationsConfigFile;
    /**
     * The path to the file containing the translations for this language
     * pack as flat string array.
     * @const {string}
     * @public
     */
    INLSLanguagePackConfiguration.prototype.messagesFile;
    /**
     * The path to the file that can be used to signal a corrupt language
     * pack, for example when reading the `messagesFile` fails. This will
     * instruct the application to re-create the cache on next startup.
     * @const {string}
     * @public
     */
    INLSLanguagePackConfiguration.prototype.corruptMarkerFile;
}
/**
 * @record
 */
function INLSConfiguration() { }
exports.INLSConfiguration = INLSConfiguration;
/* istanbul ignore if */
if (false) {
    /**
     * Locale as defined in `argv.json` or `app.getLocale()`.
     * @const {string}
     * @public
     */
    INLSConfiguration.prototype.userLocale;
    /**
     * Locale as defined by the OS (e.g. `app.getPreferredSystemLanguages()`).
     * @const {string}
     * @public
     */
    INLSConfiguration.prototype.osLocale;
    /**
     * The actual language of the UI that ends up being used considering `userLocale`
     * and `osLocale`.
     * @const {string}
     * @public
     */
    INLSConfiguration.prototype.resolvedLanguage;
    /**
     * Defined if a language pack is used that is not the
     * default english language pack. This requires a language
     * pack to be installed as extension.
     * @const {(undefined|!INLSLanguagePackConfiguration)}
     * @public
     */
    INLSConfiguration.prototype.languagePack;
    /**
     * The path to the file containing the default english messages
     * as flat string array. The file is only present in built
     * versions of the application.
     * @const {string}
     * @public
     */
    INLSConfiguration.prototype.defaultMessagesFile;
    /**
     * @deprecated
     * @const {string}
     * @public
     */
    INLSConfiguration.prototype.locale;
    /**
     * @deprecated
     * @const {?}
     * @public
     */
    INLSConfiguration.prototype.availableLanguages;
    /**
     * @deprecated
     * @const {(undefined|boolean)}
     * @public
     */
    INLSConfiguration.prototype._languagePackSupport;
    /**
     * @deprecated
     * @const {(undefined|string)}
     * @public
     */
    INLSConfiguration.prototype._languagePackId;
    /**
     * @deprecated
     * @const {(undefined|string)}
     * @public
     */
    INLSConfiguration.prototype._translationsConfigFile;
    /**
     * @deprecated
     * @const {(undefined|string)}
     * @public
     */
    INLSConfiguration.prototype._cacheRoot;
    /**
     * @deprecated
     * @const {(undefined|string)}
     * @public
     */
    INLSConfiguration.prototype._resolvedLanguagePackCoreLocation;
    /**
     * @deprecated
     * @const {(undefined|string)}
     * @public
     */
    INLSConfiguration.prototype._corruptedFile;
}
/**
 * @record
 */
function ILanguagePack() { }
exports.ILanguagePack = ILanguagePack;
/* istanbul ignore if */
if (false) {
    /**
     * @const {string}
     * @public
     */
    ILanguagePack.prototype.hash;
    /**
     * @const {(undefined|string)}
     * @public
     */
    ILanguagePack.prototype.label;
    /**
     * @const {!Array<{extensionIdentifier: {id: string, uuid: (undefined|string)}, version: string}>}
     * @public
     */
    ILanguagePack.prototype.extensions;
    /**
     * @const {?}
     * @public
     */
    ILanguagePack.prototype.translations;
}
/** @typedef {?} */
exports.ILanguagePacks;
