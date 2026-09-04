/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Low level handling of XMLHttpRequest.
 */

goog.provide('goog.net.DefaultXmlHttpFactory');
goog.provide('goog.net.XmlHttp');
goog.provide('goog.net.XmlHttp.ReadyState');

goog.require('goog.net.XmlHttpFactory');
goog.requireType('goog.net.XhrLike');


/**
 * Static class for creating XMLHttpRequest objects.
 * @return {!goog.net.XhrLike.OrNative} A new XMLHttpRequest object.
 */
goog.net.XmlHttp = function() {
  'use strict';
  return goog.net.XmlHttp.factory_.createInstance();
};



/**
 * Status constants for XMLHTTP, matches:
 * https://msdn.microsoft.com/en-us/library/ms534361(v=vs.85).aspx
 * @enum {number}
 */
goog.net.XmlHttp.ReadyState = {
  /**
   * Constant for when xmlhttprequest.readyState is uninitialized
   */
  UNINITIALIZED: 0,

  /**
   * Constant for when xmlhttprequest.readyState is loading.
   */
  LOADING: 1,

  /**
   * Constant for when xmlhttprequest.readyState is loaded.
   */
  LOADED: 2,

  /**
   * Constant for when xmlhttprequest.readyState is in an interactive state.
   */
  INTERACTIVE: 3,

  /**
   * Constant for when xmlhttprequest.readyState is completed
   */
  COMPLETE: 4,
};


/**
 * The global factory instance for creating XMLHttpRequest objects.
 * @type {goog.net.XmlHttpFactory}
 * @private
 */
goog.net.XmlHttp.factory_;


/**
 * Sets the global factory object.
 * @param {!goog.net.XmlHttpFactory} factory New global factory object.
 */
goog.net.XmlHttp.setGlobalFactory = function(factory) {
  'use strict';
  goog.net.XmlHttp.factory_ = factory;
};



/**
 * Default factory to use when creating xhr objects.  You probably shouldn't be
 * instantiating this directly, but rather using it via goog.net.XmlHttp.
 * @extends {goog.net.XmlHttpFactory}
 * @constructor
 */
goog.net.DefaultXmlHttpFactory = function() {
  'use strict';
  goog.net.XmlHttpFactory.call(this);
};
goog.inherits(goog.net.DefaultXmlHttpFactory, goog.net.XmlHttpFactory);


/** @override */
goog.net.DefaultXmlHttpFactory.prototype.createInstance = function() {
  'use strict';
  return new XMLHttpRequest();
};


// Set the global factory to an instance of the default factory.
goog.net.XmlHttp.setGlobalFactory(new goog.net.DefaultXmlHttpFactory());
