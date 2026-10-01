/**
 * @fileoverview Closure shim module for lodash typings.
 *
 * When using these typings from TypeScript, you write:
 *
 *   import * as lodash from 'lodash';  // from //third_party/javascript/typings/lodash:bundle
 *
 * That code compiles into a goog.require() statement, which is
 * satisfied by this file.
 *
 * Note: this import includes the entire lodash library as a goog.module.
 *
 * Then run taze
 *
 */
goog.module('google3.third_party.javascript.typings.lodash.index');

/** @suppress {extraRequire} */
goog.require('google3.third_party.javascript.lodash.lodash_raw_raw');

exports = /** @type {?} */ (globalThis['_']);
