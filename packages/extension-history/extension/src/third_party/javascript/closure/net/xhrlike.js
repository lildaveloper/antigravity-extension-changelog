/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */
goog.module('goog.net.XhrLike');
goog.module.declareLegacyNamespace();

/**
 * Interface for the common parts of XMLHttpRequest.
 *
 * Mostly copied from externs/w3c_xml.js.
 *
 * @interface
 * @see http://www.w3.org/TR/XMLHttpRequest/
 */
function XhrLike() {}

/**
 * Typedef that refers to either native or custom-implemented XHR objects.
 * @typedef {!XhrLike|!XMLHttpRequest}
 */
let OrNative;

/**
 * @type {function()|null|undefined}
 * @see http://www.w3.org/TR/XMLHttpRequest/#handler-xhr-onreadystatechange
 */
XhrLike.prototype.onreadystatechange;

/**
 * @type {?ArrayBuffer|?Blob|?Document|?Object|?string}
 * @see https://xhr.spec.whatwg.org/#response-object
 */
XhrLike.prototype.response;

/**
 * @type {string}
 * @see http://www.w3.org/TR/XMLHttpRequest/#the-responsetext-attribute
 */
XhrLike.prototype.responseText;

/**
 * @type {string}
 * @see https://xhr.spec.whatwg.org/#the-responsetype-attribute
 */
XhrLike.prototype.responseType;

/**
 * @type {Document}
 * @see http://www.w3.org/TR/XMLHttpRequest/#the-responsexml-attribute
 */
XhrLike.prototype.responseXML;

/**
 * @type {string}
 * @see https://xhr.spec.whatwg.org/#the-responseurl-attribute
 */
XhrLike.prototype.responseURL;

/**
 * @type {number}
 * @see http://www.w3.org/TR/XMLHttpRequest/#readystate
 */
XhrLike.prototype.readyState;

/**
 * @type {number}
 * @see http://www.w3.org/TR/XMLHttpRequest/#status
 */
XhrLike.prototype.status;

/**
 * @type {string}
 * @see http://www.w3.org/TR/XMLHttpRequest/#statustext
 */
XhrLike.prototype.statusText;

/**
 * @param {string} method
 * @param {string} url
 * @param {?boolean=} opt_async
 * @param {?string=} opt_user
 * @param {?string=} opt_password
 * @see http://www.w3.org/TR/XMLHttpRequest/#the-open()-method
 */
XhrLike.prototype.open = function(
    method, url, opt_async, opt_user, opt_password) {};

/**
 * @param {ArrayBuffer|ArrayBufferView|Blob|Document|FormData|string=} opt_data
 * @see http://www.w3.org/TR/XMLHttpRequest/#the-send()-method
 */
XhrLike.prototype.send = function(opt_data) {};

/**
 * @see http://www.w3.org/TR/XMLHttpRequest/#the-abort()-method
 */
XhrLike.prototype.abort = function() {};

/**
 * @param {string} header
 * @param {string} value
 * @see http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader()-method
 */
XhrLike.prototype.setRequestHeader = function(header, value) {};

/**
 * @param {string} header
 * @return {?string}
 * @see http://www.w3.org/TR/XMLHttpRequest/#the-getresponseheader()-method
 */
XhrLike.prototype.getResponseHeader = function(header) {};

/**
 * @return {string}
 * @see http://www.w3.org/TR/XMLHttpRequest/#the-getallresponseheaders()-method
 */
XhrLike.prototype.getAllResponseHeaders = function() {};

/**
 * @type {?function(!TrustTokenAttributeType): void | undefined}
 * @see https://docs.google.com/document/d/1qUjtKgA7nMv9YGMhi0xWKEojkSITKzGLdIcZgoz6ZkI.
 */
XhrLike.prototype.setTrustToken = function(trustTokenAttribute) {};

// MOE:begin_strip
// Ensure ES2021 inputs. go/transpile-js
null?.(6_6);
// MOE:end_strip

exports = XhrLike;
/** @const */
exports.OrNative = OrNative;
