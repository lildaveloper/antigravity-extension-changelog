/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Helpers for defining EventTypes.
 */


goog.module('goog.events.eventTypeHelpers');

goog.module.declareLegacyNamespace();

const BrowserFeature = goog.require('goog.events.BrowserFeature');
const userAgent = goog.require('goog.userAgent');

/**
 * Returns a prefixed event name for the current browser.
 * @param {string} eventName The name of the event.
 * @return {string} The prefixed event name.
 * @package
 */
function getVendorPrefixedName(eventName) {
  return userAgent.WEBKIT ? 'webkit' + eventName : eventName.toLowerCase();
}

/**
 * Returns one of the given pointer fallback event names in order of preference:
 *   1. pointerEventName
 *   2. fallbackEventName
 * @param {string} pointerEventName
 * @param {string} fallbackEventName
 * @return {string} The supported pointer or fallback (mouse or touch) event
 *     name.
 * @package
 */
function getPointerFallbackEventName(pointerEventName, fallbackEventName) {
  if (BrowserFeature.POINTER_EVENTS) {
    return pointerEventName;
  }
  return fallbackEventName;
}

exports = {
  getPointerFallbackEventName,
  getVendorPrefixedName,
};
