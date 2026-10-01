/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Detects the specific browser and not just the rendering engine.
 */

goog.module('goog.userAgent.product');
goog.module.declareLegacyNamespace();

const browser = goog.require('goog.labs.userAgent.browser');
const platform = goog.require('goog.labs.userAgent.platform');
const userAgent = goog.require('goog.userAgent');

/**
 * @define {boolean} Whether the code is running on the Firefox web browser.
 */
const ASSUME_FIREFOX =
    goog.define('goog.userAgent.product.ASSUME_FIREFOX', false);

/**
 * @define {boolean} Whether we know at compile-time that the product is an
 *     iPhone.
 */
const ASSUME_IPHONE =
    goog.define('goog.userAgent.product.ASSUME_IPHONE', false);

/**
 * @define {boolean} Whether we know at compile-time that the product is an
 *     iPad.
 */
const ASSUME_IPAD = goog.define('goog.userAgent.product.ASSUME_IPAD', false);

/**
 * @define {boolean} Whether we know at compile-time that the product is an
 *     AOSP browser or WebView inside a pre KitKat Android phone or tablet.
 */
const ASSUME_ANDROID =
    goog.define('goog.userAgent.product.ASSUME_ANDROID', false);

/**
 * @define {boolean} Whether the code is running on the Chrome web browser on
 * any platform or AOSP browser or WebView in a KitKat+ Android phone or tablet.
 */
const ASSUME_CHROME =
    goog.define('goog.userAgent.product.ASSUME_CHROME', false);

/**
 * @define {boolean} Whether the code is running on the Safari web browser.
 */
const ASSUME_SAFARI =
    goog.define('goog.userAgent.product.ASSUME_SAFARI', false);

/**
 * Whether we know the product type at compile-time.
 * @type {boolean}
 */
const PRODUCT_KNOWN = userAgent.ASSUME_IE || userAgent.ASSUME_EDGE ||
    userAgent.ASSUME_OPERA || ASSUME_FIREFOX || ASSUME_IPHONE || ASSUME_IPAD ||
    ASSUME_ANDROID || ASSUME_CHROME || ASSUME_SAFARI;

/**
 * Whether the code is running on the Opera web browser.
 * @type {boolean}
 */
const OPERA = userAgent.OPERA;

/**
 * Whether the code is running on an IE web browser.
 * @type {boolean}
 */
const IE = userAgent.IE;

/**
 * Whether the code is running on an Edge web browser (EdgeHTML based).
 * @type {boolean}
 */
const EDGE = userAgent.EDGE;

/**
 * Whether the code is running on the Firefox web browser.
 * @type {boolean}
 */
const FIREFOX = PRODUCT_KNOWN ? ASSUME_FIREFOX : browser.isFirefox();

/**
 * Whether the user agent is an iPhone or iPod (as in iPod touch).
 * @return {boolean}
 */
function isIphoneOrIpod() {
  return platform.isIphone() || platform.isIpod();
}

/**
 * Whether the code is running on an iPhone or iPod touch.
 *
 * iPod touch is considered an iPhone for legacy reasons.
 * @type {boolean}
 */
const IPHONE = PRODUCT_KNOWN ? ASSUME_IPHONE : isIphoneOrIpod();

/**
 * Whether the code is running on an iPad.
 * @type {boolean}
 */
const IPAD = PRODUCT_KNOWN ? ASSUME_IPAD : platform.isIpad();

/**
 * Whether the code is running on AOSP browser or WebView inside
 * a pre KitKat Android phone or tablet.
 * @type {boolean}
 */
const ANDROID = PRODUCT_KNOWN ? ASSUME_ANDROID : browser.isAndroidBrowser();

/**
 * Whether the code is running on any Chromium-based web browser on any platform
 * or AOSP browser or WebView in a KitKat+ Android phone or tablet.
 * @type {boolean}
 */
const CHROME = PRODUCT_KNOWN ? ASSUME_CHROME : browser.isChrome();

/** @return {boolean} Whether the browser is Safari on desktop. */
function isSafariDesktop() {
  return browser.isSafari() && !platform.isIos();
}

/**
 * Whether the code is running on the desktop Safari web browser.
 * Note: the legacy behavior here is only true for Safari not running
 * on iOS.
 * @type {boolean}
 */
const SAFARI = PRODUCT_KNOWN ? ASSUME_SAFARI : isSafariDesktop();

exports = {
  ANDROID,
  ASSUME_ANDROID,
  ASSUME_CHROME,
  ASSUME_FIREFOX,
  ASSUME_IPAD,
  ASSUME_IPHONE,
  ASSUME_SAFARI,
  CHROME,
  EDGE,
  FIREFOX,
  IE,
  IPAD,
  IPHONE,
  OPERA,
  SAFARI,
  isIphoneOrIpod_: isIphoneOrIpod,    // for testing only
  isSafariDesktop_: isSafariDesktop,  // for testing only
};
