/**
 * @fileoverview Closure shim module for JSZip typings.
 *
 * When using these typings from TypeScript, you write:
 *   import * as ... from 'jszip';
 *
 * That code compiles into a goog.require() statement, which is
 * satisfied by this file.
 *
 * Note: your app is responsible for ensuring JSZip is loaded and
 * available on window, e.g. via a <script> tag.
 */

goog.module('google3.third_party.javascript.typings.jszip.index');

/** @type {?} */
exports = goog.global['JSZip']
