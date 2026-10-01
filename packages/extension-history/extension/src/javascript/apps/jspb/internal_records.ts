/**
 * @fileoverview Test/Dev-only utilities to replicate records interface.
 *
 * DO NOT USE THIS OUTSIDE OF THIS PACKAGE.
 * Generated from: javascript/apps/jspb/internal_records.ts
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
goog.module('google3.javascript.apps.jspb.internal_records');
var module = module || { id: 'javascript/apps/jspb/internal_records.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_bytestring_1 = goog.requireType("jspb.bytestring");
const tsickle_extension_field_info_2 = goog.requireType("jspb.extension_field_info");
const tsickle_immutable_message_3 = goog.requireType("jspb.immutable_message");
const tsickle_internal_4 = goog.requireType("jspb.internal");
const tsickle_internal_options_5 = goog.requireType("jspb.internal_options");
const tsickle_internal_symbols_6 = goog.requireType("jspb.internal_symbols");
const tsickle_message_7 = goog.requireType("jspb");
const tsickle_mutable_message_8 = goog.requireType("jspb.mutable_message");
const tsickle_constructors_9 = goog.requireType("google3.javascript.apps.jspb.types.constructors");
const tsickle_readonly_type_conversions_10 = goog.requireType("google3.javascript.apps.jspb.types.readonly_type_conversions");
const extension_field_info_1 = goog.require('jspb.extension_field_info');
const internal_1 = goog.require('jspb.internal');
const internal_options_1 = goog.require('jspb.internal_options');
const internal_symbols_1 = goog.require('jspb.internal_symbols');
const message_1 = goog.require('jspb');
const assert_1 = goog.require('google3.javascript.typescript.contrib.assert');
/**
 * @param {!tsickle_constructors_9.MessageConstructor<!tsickle_mutable_message_8.MutableMessage<?>>} ctor
 * @param {(undefined|boolean)=} useOrUndefinedIfPresent
 * @return {!Map<string, !Function>}
 */
function getPropNameToGetter(ctor, useOrUndefinedIfPresent) {
    /** @type {!tsickle_mutable_message_8.MutableMessage<?>} */
    const empty = new ctor();
    /** @type {!Map<string, function(): *>} */
    const result = new Map();
    /** @type {?} */
    const prototype = ctor.prototype;
    /** @type {!Set<string>} */
    const props = new Set(Object.getOwnPropertyNames(prototype));
    for (let key of props) {
        // We only care about getters with a corresponding setter.
        if (!(0, internal_1.startsWith)(key, 'set'))
            continue;
        /** @type {string} */
        let stem = key.substring('set'.length);
        /** @type {string} */
        const propName = stem[0].toLowerCase() + stem.slice(1);
        // If we want -orUndefined behavior, and a getter is present, use it.
        if (useOrUndefinedIfPresent && props.has('get' + stem + 'OrUndefined')) {
            stem += 'OrUndefined';
        }
        // For our setter key, we now select a getter key. If there is a readonly
        // variant, we should use it.
        key = (props.has('getReadonly' + stem) ? 'getReadonly' : 'get') + stem;
        // Eliminate indexed getters. List and map getters are special-cased as
        // they have a parameter.
        /** @type {?} */
        const getter = prototype[key];
        if (getter.length !== 0 &&
            !((0, internal_1.endsWith)(key, 'List') && getter.length === 1) &&
            !((0, internal_1.endsWith)(key, 'Map') && getter.length === 1)) {
            continue;
        }
        // Check that the getter is actually callable and, for getFields calls, not
        // nullable. This will prevent our accidentally missing a getter that needs
        // an argument or accidentally calling a broken semantics getter.
        /** @type {?} */
        const valueForEmptyProto = getter.call(empty);
        if (!useOrUndefinedIfPresent)
            (0, assert_1.assertExists)(valueForEmptyProto);
        // Cache this getter.
        result.set(propName, getter);
        if (props.has(`${key}_asString`)) {
            /** @type {string} */
            const asStringPropName = `${propName}_asString`;
            /** @type {?} */
            const asStringGetter = prototype[`${key}_asString`];
            if (asStringGetter) {
                result.set(asStringPropName, asStringGetter);
            }
        }
    }
    return result;
}
/** @type {symbol} */
const PROP_NAME_TO_GETTER_SYMBOL = Symbol();
/** @type {symbol} */
const PROP_NAME_TO_OR_UNDEFINED_GETTER_SYMBOL = Symbol();
/**
 * Replicates the behavior of getFields in uncompiled test environments.
 * @param {!tsickle_message_7.Message} value
 * @param {boolean=} nonPresentAsUndefined
 * @return {!Object}
 */
function getFieldsForTestingGeneric(value, nonPresentAsUndefined = false) {
    // We should not call this in compiled tests.
    (0, assert_1.assert)(!COMPILED && internal_options_1.GENERATE_FIELDS_INTERFACE_FOR_TESTING);
    /** @type {!tsickle_constructors_9.MessageConstructor<!tsickle_mutable_message_8.MutableMessage<?>>} */
    const ctor = (/** @type {!tsickle_constructors_9.MessageConstructor<!tsickle_mutable_message_8.MutableMessage<?>>} */ ((/** @type {*} */ (value.constructor))));
    // Retrieve and cache our property <-> getter mapping.
    /** @type {symbol} */
    const cacheKey = nonPresentAsUndefined
        ? PROP_NAME_TO_OR_UNDEFINED_GETTER_SYMBOL
        : PROP_NAME_TO_GETTER_SYMBOL;
    /** @type {!Map<string, !Function>} */
    const propNameToGetter = (((/** @type {*} */ ((/** @type {*} */ (ctor)))))[cacheKey] ??= getPropNameToGetter(ctor, nonPresentAsUndefined));
    // Call each getter we know about.
    /** @type {!Object<string,*>} */
    const result = {};
    for (const [propName__tsickle_destructured_1, getter__tsickle_destructured_2] of propNameToGetter.entries()) {
        const propName = /** @type {string} */ (propName__tsickle_destructured_1);
        const getter = /** @type {!Function} */ (getter__tsickle_destructured_2);
        result[propName] = getter.call(value);
    }
    // Get each extension we have registered.
    /** @type {(null|!ExtensionsObject)} */
    const extensions = getCtorExtensionsObject(ctor);
    if (extensions) {
        for (const obj of Object.values(extensions)) {
            /** @type {!tsickle_extension_field_info_2.ExtensionFieldInfo<?, ?, ?, ?, ?>} */
            const fieldInfo = (/** @type {!tsickle_extension_field_info_2.ExtensionFieldInfo<?, ?, ?, ?, ?>} */ (Object.values(obj)[0]));
            if (!fieldInfo)
                continue;
            /** @type {!tsickle_message_7.Message} */
            const msg = (/** @type {!tsickle_message_7.Message} */ ((/** @type {*} */ (value))));
            result[fieldInfo.key] = fieldInfo.ctor
                ? msg.getReadonlyExtension(fieldInfo)
                : !nonPresentAsUndefined || fieldInfo.isRepeated
                    ? msg.getExtension(fieldInfo)
                    : msg.getExtensionOrUndefined(fieldInfo);
        }
    }
    return result;
}
exports.getFieldsForTestingGeneric = getFieldsForTestingGeneric;
/**
 * @template M
 * @param {!tsickle_constructors_9.MessageConstructor<M>} ctor
 * @return {!Map<string, !Function>}
 */
function getPropNameToSetter(ctor) {
    /** @type {!Map<string, function(*): M>} */
    const result = new Map();
    /** @type {?} */
    const prototype = ctor.prototype;
    /** @type {!Set<string>} */
    const props = new Set(Object.getOwnPropertyNames(prototype));
    for (const key of props) {
        if (typeof key !== 'string')
            continue;
        /** @type {?} */
        const fn = prototype[key];
        if (typeof fn !== 'function')
            continue;
        if ((0, internal_1.startsWith)(key, 'set')) {
            result.set(key['set'.length].toLowerCase() + key.substring(1 + 'set'.length), fn);
        }
    }
    return result;
}
/** @type {symbol} */
const PROP_NAME_TO_SETTER_SYMBOL = Symbol();
/**
 * Replicates the behavior of fromFields in uncompiled test environments.
 * @template M, I
 * @param {!tsickle_constructors_9.MessageConstructor<?>} ctor
 * @param {!Object<string,*>} obj
 * @return {I}
 */
function fromFieldsForTestingGeneric(ctor, obj) {
    // We should not call this in compiled tests.
    (0, assert_1.assert)(!COMPILED && internal_options_1.GENERATE_FIELDS_INTERFACE_FOR_TESTING);
    // Retrieve and cache our property <-> setter mapping.
    /** @type {!Map<string, !Function>} */
    const propNameToSetter = (((/** @type {*} */ ((/** @type {*} */ (ctor)))))[PROP_NAME_TO_SETTER_SYMBOL] ??= getPropNameToSetter(ctor));
    // Walk our object properties and call each setter.
    /** @type {!tsickle_mutable_message_8.MutableMessage<?>} */
    const result = (/** @type {!tsickle_mutable_message_8.MutableMessage<?>} */ ((0, assert_1.assertInstanceof)(new ctor(), message_1.Message)));
    for (const [propName__tsickle_destructured_3, value__tsickle_destructured_4] of Object.entries(obj)) {
        const propName = /** @type {string} */ (propName__tsickle_destructured_3);
        const value = /** @type {*} */ (value__tsickle_destructured_4);
        // In IE the polyfill makes symbols a string.
        if ((0, internal_1.startsWith)(propName, 'jscomp_symbol_')) {
            throw new Error('Cannot use symbols in fromFields when running in browsers that do not support symbols.');
        }
        if (value == null)
            continue;
        /** @type {(undefined|!Function)} */
        const setter = propNameToSetter.get(propName);
        if (setter == null) {
            throw new Error(`No setter found for property ${propName}. Entries: ${[
                ...propNameToSetter.keys(),
            ]}`);
        }
        setter.call(result, obj[propName]);
    }
    // Set extension values.
    if (internal_symbols_1.HAS_NATIVE_SYMBOL) {
        /** @type {(null|!ExtensionsObject)} */
        const extObj = getCtorExtensionsObject(ctor);
        for (const sym of Object.getOwnPropertySymbols(obj)) {
            /** @type {!ExtensionsObject} */
            const extensions = (0, assert_1.assert)(extObj, 'Set an extension on a non-extendable message.');
            /** @type {*} */
            const value = ((/** @type {*} */ ((/** @type {*} */ (obj)))))[sym];
            (0, assert_1.assert)(value);
            /** @type {string} */
            const internalPrefix = 'jspbInternalDoNotUseExtensionSymbol$';
            /** @type {string} */
            const description = sym.description ??
                sym.toString().substring('Symbol('.length, sym.toString().length - 1);
            (0, assert_1.assert)((0, internal_1.startsWith)(description, internalPrefix));
            /** @type {string} */
            const fieldNumberStr = description.substring((/** @type {string} */ (internalPrefix)).length);
            (0, assert_1.assert)(!isNaN((/** @type {number} */ ((/** @type {*} */ (fieldNumberStr))))));
            /** @type {!Object<string,!tsickle_extension_field_info_2.ExtensionFieldInfo<?, ?, ?, ?, ?>>} */
            const o = (0, assert_1.assert)(extensions[(/** @type {number} */ ((/** @type {*} */ (fieldNumberStr))))]);
            /** @type {!tsickle_extension_field_info_2.ExtensionFieldInfo<?, ?, ?, ?, ?>} */
            const fieldInfo = (0, assert_1.assertInstanceof)(Object.values(o)[0], extension_field_info_1.ExtensionFieldInfo);
            (0, assert_1.assert)(fieldInfo.key === sym);
            result.setExtension(fieldInfo, value);
        }
    }
    return result.toImmutable();
}
exports.fromFieldsForTestingGeneric = fromFieldsForTestingGeneric;
/**
 * @record
 */
function ExtensionsObject() { }
/** @type {symbol} */
const EXTENSIONS_SYMBOL = Symbol();
/**
 * @param {!Function} ctor
 * @return {(null|!ExtensionsObject)}
 */
function getCtorExtensionsObject(ctor) {
    /** @type {*} */
    const withExtensions = (/** @type {*} */ ((/** @type {*} */ (ctor))));
    if (withExtensions[EXTENSIONS_SYMBOL] !== undefined) {
        return withExtensions[EXTENSIONS_SYMBOL];
    }
    // Find extensions on our constructor.
    /** @type {(null|!ExtensionsObject)} */
    let extensionsObj = null;
    for (const key of Object.keys(ctor)) {
        if ((0, internal_1.startsWith)(key, 'internalDoNotUse$') && (0, internal_1.endsWith)(key, '$extensions')) {
            extensionsObj = ((/** @type {!Object<string,!ExtensionsObject>} */ ((/** @type {*} */ (ctor)))))[key];
            break;
        }
    }
    // Inspect its content a little bit to make sure this is an extensions object
    // and not something else.
    (0, assert_1.assert)(typeof extensionsObj === 'object');
    if (extensionsObj) {
        // tslint:disable-next-line:ban-unsafe-reflection
        for (const [key__tsickle_destructured_5, obj__tsickle_destructured_6] of Object.entries(extensionsObj)) {
            const key = /** @type {string} */ (key__tsickle_destructured_5);
            const obj = /** @type {?} */ (obj__tsickle_destructured_6);
            (0, assert_1.assert)(!isNaN((/** @type {number} */ ((/** @type {*} */ (key))))));
            (0, assert_1.assertInstanceof)(Object.values(obj)[0], extension_field_info_1.ExtensionFieldInfo);
        }
    }
    // Cache and return the extensions object.
    return (withExtensions[EXTENSIONS_SYMBOL] = extensionsObj);
}
/** @typedef {?} */
var ReadonlyValue;
/** @typedef {?} */
var ImmutableValue;
/** @typedef {?} */
var SingularPartialValue;
/** @typedef {?} */
var PartialValue;
/** @typedef {?} */
var GetValue;
/** @typedef {?} */
var GetImmutableValue;
/**
 * Any readonly extension for the given extendee.
 * @typedef {?}
 */
exports.ReadonlyPartialExtensions;
/**
 * Any readonly extension for the given extendee.
 *
 * It would be nice for these always to be present but we cannot guarantee that
 * due to load order.
 * @typedef {?}
 */
exports.ReadonlyExtensions;
/**
 * Converts a record type to a partial set of fields.
 * @typedef {?}
 */
exports.PartialFields;
/** @typedef {?} */
var PartialFieldsWithoutInt64Suffixes;
/** @typedef {?} */
var ReadonlyDirectFields;
/**
 * Converts a record type to a readonly object.
 * @typedef {?}
 */
exports.ReadonlyFields;
/** @typedef {?} */
var ImmutableDirectFields;
/**
 * Any immutable extension for the given extendee.
 *
 * It would be nice for these always to be present but we cannot guarantee that
 * due to load order.
 * @typedef {?}
 */
exports.ImmutableExtensions;
/**
 * Converts a record type to all immutable values.
 * @typedef {?}
 */
exports.ImmutableFields;
