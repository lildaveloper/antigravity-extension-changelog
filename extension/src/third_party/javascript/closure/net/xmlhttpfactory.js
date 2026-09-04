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
 * @return {!XhrLike.OrNative} A new XhrLike instance.
 */
XmlHttpFactory.prototype.createInstance = goog.abstractMethod;

exports = XmlHttpFactory;
