/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Utility to attempt native JSON processing, falling back to
 *     goog.json if not available.
 *
 *     This is intended as a drop-in for current users of goog.json who want
 *     to take advantage of native JSON if present.
 */

goog.module('goog.json.hybrid');
goog.module.declareLegacyNamespace();

const asserts = goog.require('goog.asserts');
const googJson = goog.require('goog.json');

/**
 * Attempts to serialize the JSON string natively, falling back to
 * `googJson.serialize` if unsuccessful.
 * @param {!Object} obj JavaScript object to serialize to JSON.
 * @return {string} Resulting JSON string.
 */
const stringify = googJson.USE_NATIVE_JSON ?
    goog.global['JSON']['stringify'] :
    function(obj) {
      if (goog.global.JSON) {
        try {
          return goog.global.JSON.stringify(obj);
        } catch (e) {
          // Native serialization failed.  Fall through to retry with
          // goog.json.serialize.
        }
      }

      return googJson.serialize(obj);
    };

/**
 * Attempts to parse the JSON string natively, falling back to
 * the supplied `fallbackParser` if unsuccessful.
 * @param {string} jsonString JSON string to parse.
 * @param {function(string):Object} fallbackParser Fallback JSON parser used
 *     if native
 * @return {?Object} Resulting JSON object.
 */
function parseInternal(jsonString, fallbackParser) {
  if (goog.global.JSON) {
    try {
      const obj = goog.global.JSON.parse(jsonString);
      asserts.assert(typeof obj == 'object');
      return /** @type {?Object} */ (obj);
    } catch (e) {
      // Native parse failed.  Fall through to retry with goog.json.parse.
    }
  }

  return fallbackParser(jsonString);
}

/**
 * Attempts to parse the JSON string natively, falling back to
 * `googJson.parse` if unsuccessful.
 * @param {string} jsonString JSON string to parse.
 * @return {?Object} Resulting JSON object.
 */
const parse = googJson.USE_NATIVE_JSON ?
    goog.global['JSON']['parse'] :
    function(jsonString) {
      return parseInternal(jsonString, googJson.parse);
    };

exports = {
  parse,
  stringify,
};
