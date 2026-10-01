/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Interface for a factory for creating XMLHttpRequest objects
 * and metadata about them.
 */

goog.module('goog.net.XmlHttpFactory');

goog.module.declareLegacyNamespace();

/** @suppress {extraRequire} Typedef. */
const XhrLike = goog.require('goog.net.XhrLike');

/**
 * Abstract base class for an XmlHttpRequest factory.
 * @constructor
 */
function XmlHttpFactory() {}


/**
 * @param {!RequestInit=} requestInit A RequestInit object for this request.
 *     This is meant for use with factories (like `FetchXmlHttpFactory`) that
 *     will use `fetch()` as the underlying mechanism as opposed to
 *     `XMLHttpRequest`. The user may provide additional options in this
 *     RequestInit meant to be passed to the underlying `fetch()` call.
 *     Factories are not required to support this parameter and may ignore it if
 *     they do not use `fetch()`. Users wishing to preserve the options in
 *     RequestInit are responsible for using the appropriate factory.
 * @return {!XhrLike.OrNative} A new XhrLike instance.
 */
XmlHttpFactory.prototype.createInstance = goog.abstractMethod;

exports = XmlHttpFactory;
