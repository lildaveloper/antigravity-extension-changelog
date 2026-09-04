/**
 * @fileoverview Reexport wrapper for goog.asserts.  This lets us provide
 * TypeScript-specific typings for goog.asserts.
 */

goog.module('google3.javascript.typescript.contrib.assert');

const asserts = goog.require('goog.asserts');

// The straightfoward thing to do here would be to reexport the entire module
// as is, via
//   exports = asserts;
// but it turns out that you cannot actually use the goog.asserts module as
// written from TypeScript in some contexts due to interactions with
// JSC_PARTIAL_NAMESPACE errors.
//
// The reason people have been able to use goog.asserts in their TS code
// in google3 so far is because they have instead been using this wrapper,
// which reexported only a subset of the goog.asserts API.  This .js file
// replaces that wrapper, so it must preserve that behavior here by only
// exposing the subset of goog.asserts API that avoids exposing the symbols that
// trigger the JSC_PARTIAL_NAMESPACE.
//
// This list of exports matches the symbols exposed by the d.ts.

exports.AssertionError   = asserts.AssertionError;
exports.ENABLE_ASSERTS   = asserts.ENABLE_ASSERTS;
exports.assert           = asserts.assert;
exports.assertArray      = asserts.assertArray;
exports.assertBoolean    = asserts.assertBoolean;
exports.assertElement    = asserts.assertElement;
exports.assertExists     = asserts.assertExists;
exports.assertFinite     = asserts.assertFinite;
exports.assertFunction   = asserts.assertFunction;
exports.assertInstanceof = asserts.assertInstanceof;
exports.assertNumber     = asserts.assertNumber;
exports.assertObject     = asserts.assertObject;
exports.assertString     = asserts.assertString;
exports.fail             = asserts.fail;
