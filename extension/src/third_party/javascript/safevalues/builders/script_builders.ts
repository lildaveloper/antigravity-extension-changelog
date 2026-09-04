/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/javascript/safevalues/builders/script_builders.ts
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
goog.module('google3.third_party.javascript.safevalues.builders.script_builders');
var module = module || { id: 'third_party/javascript/safevalues/builders/script_builders.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_dev_1 = goog.requireType("google3.third_party.javascript.safevalues.environment.dev");
const tsickle_script_impl_2 = goog.requireType("google3.third_party.javascript.safevalues.internals.script_impl");
const tsickle_string_literal_3 = goog.requireType("google3.third_party.javascript.safevalues.internals.string_literal");
const dev_1 = goog.require('google3.third_party.javascript.safevalues.environment.dev');
const script_impl_1 = goog.require('google3.third_party.javascript.safevalues.internals.script_impl');
const string_literal_1 = goog.require('google3.third_party.javascript.safevalues.internals.string_literal');
/** @typedef {(string|number|boolean)} */
var Primitive;
/** @typedef {(string|number|boolean|!ReadonlyArray<(null|string|number|boolean|?|!Object<string,?>)>|!Object<string,(null|string|number|boolean|!ReadonlyArray<?>|?)>)} */
var Serializable;
/**
 * Creates a SafeScript object from a template literal (without any embedded
 * expressions).
 *
 * This function is a template literal tag function. It should be called with
 * a template literal that does not contain any expressions. For example,
 *                           safeScript`foo`;
 *
 * @param {!TemplateStringsArray} templateObj This contains the literal part of the template literal.
 * @param {...string} emptyArgs Expressions that evaluate to the empty string to enable
 *     inline comments.
 * @return {!tsickle_script_impl_2.SafeScript}
 */
function safeScript(templateObj, ...emptyArgs) {
    if (dev_1.DEV_MODE) {
        if (emptyArgs.some((/**
         * @param {string} a
         * @return {boolean}
         */
        (a) => a !== ''))) {
            throw new Error('safeScript only allows empty string expressions ' +
                'to enable inline comments.');
        }
        (0, string_literal_1.assertIsTemplateObject)(templateObj, emptyArgs.length);
    }
    return (0, script_impl_1.createScriptInternal)(templateObj.join(''));
}
exports.safeScript = safeScript;
/**
 * Creates a `SafeScript` value by concatenating multiple `SafeScript`s.
 * @param {!ReadonlyArray<!tsickle_script_impl_2.SafeScript>} scripts
 * @return {!tsickle_script_impl_2.SafeScript}
 */
function concatScripts(scripts) {
    return (0, script_impl_1.createScriptInternal)(scripts.map(script_impl_1.unwrapScript).join(''));
}
exports.concatScripts = concatScripts;
/**
 * Converts a serializable value into JSON that is safe to interpolate into a
 * script context. In particular it escapes < characters so that a value of
 * "&lt/script>" doesn't break out of the context.
 * @param {(null|string|number|boolean|!ReadonlyArray<?>|!Object<string,?>)} value The value to serialize.
 * @return {!tsickle_script_impl_2.SafeScript}
 */
function valueAsScript(value) {
    return (0, script_impl_1.createScriptInternal)(JSON.stringify(value).replace(/</g, '\\u003C'));
}
exports.valueAsScript = valueAsScript;
/**
 * Creates a `SafeScript` object from a template literal (without any embedded
 * expressions) along with additional arguments that the script should have
 * access to. These arguments will be JSON-encoded and passed to the script as
 * a function call.
 * \@example
 * ```ts
 * safeScriptWithArgs`function (name, props) {
 *  console.log(name + ' is ' + props.age);
 * }`('Bob', { 'age': 42 })
 * ```
 * would return a `SafeScript` that represents the following code:
 * ```js
 * (function (name, props) {
 *  console.log(name + ' is ' + props.age);
 * })("Bob",{"age":42})
 * ```
 * \@note Be careful when passing objects as arguments, as unquoted property
 * names may be changed during compilation.
 * @param {!TemplateStringsArray} templateObj This contains the literal part of the template literal.
 * @param {...string} emptyArgs Expressions that evaluate to the empty string to enable
 *     inline comments.
 * @return {function(...(null|string|number|boolean|!ReadonlyArray<?>|!Object<string,?>)): !tsickle_script_impl_2.SafeScript}
 */
function safeScriptWithArgs(templateObj, ...emptyArgs) {
    if (dev_1.DEV_MODE) {
        if (emptyArgs.some((/**
         * @param {string} a
         * @return {boolean}
         */
        (a) => a !== ''))) {
            throw new Error('safeScriptWithArgs only allows empty string expressions ' +
                'to enable inline comments.');
        }
        (0, string_literal_1.assertIsTemplateObject)(templateObj, emptyArgs.length);
    }
    return (/**
     * @param {...(null|string|number|boolean|!ReadonlyArray<?>|!Object<string,?>)} argValues
     * @return {!tsickle_script_impl_2.SafeScript}
     */
    (...argValues) => {
        /** @type {!Array<string>} */
        const values = argValues.map((/**
         * @param {(null|string|number|boolean|!ReadonlyArray<?>|!Object<string,?>)} v
         * @return {string}
         */
        (v) => valueAsScript(v).toString()));
        return (0, script_impl_1.createScriptInternal)(`(${templateObj.join('')})(${values.join(',')})`);
    });
}
exports.safeScriptWithArgs = safeScriptWithArgs;
