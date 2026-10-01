/**
 * @fileoverview Closure shim module for diff typings.
 *
 * When using these typings TypeScript, you write:
 *   import * as Diff from 'diff';
 *
 * That code compiles into a goog.require() statement, which is
 * satisfied by this file.
 *
 * This shim requires the raw_js_library for diff to ensure that the library is
 * loaded when you depend on the typings.
 */
/** @preserve google3 shim file. */
goog.module('google3.third_party.javascript.typings.diff.index');
goog.require('google3.third_party.javascript.node_modules.diff.diff_raw_raw');

/** @type {?} */
exports = globalThis['Diff'];
