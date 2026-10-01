/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Definition the goog.debug.RelativeTimeProvider class.
 */

goog.module('goog.debug.RelativeTimeProvider');

goog.module.declareLegacyNamespace();

/**
 * A simple object to keep track of a timestamp considered the start of
 * something. The main use is for the logger system to maintain a start time
 * that is occasionally reset. For example, in Gmail, we reset this relative
 * time at the start of a user action so that timings are offset from the
 * beginning of the action. This class also provides a singleton as the default
 * behavior for most use cases is to share the same start time.
 *
 * @constructor
 * @final
 */
function RelativeTimeProvider() {
  /**
   * The start time.
   * @type {number}
   * @private
   */
  this.relativeTimeStart_ = goog.now();
}


/**
 * Default instance.
 * @type {?RelativeTimeProvider}
 * @private
 */
RelativeTimeProvider.defaultInstance_ = null;


/**
 * Sets the start time to the specified time.
 * @param {number} timeStamp The start time.
 */
RelativeTimeProvider.prototype.set = function(timeStamp) {
  this.relativeTimeStart_ = timeStamp;
};


/**
 * Resets the start time to now.
 */
RelativeTimeProvider.prototype.reset = function() {
  this.set(goog.now());
};


/**
 * @return {number} The start time.
 */
RelativeTimeProvider.prototype.get = function() {
  return this.relativeTimeStart_;
};


/**
 * @return {!RelativeTimeProvider} The default instance.
 */
RelativeTimeProvider.getDefaultInstance = function() {
  if (!RelativeTimeProvider.defaultInstance_) {
    RelativeTimeProvider.defaultInstance_ = new RelativeTimeProvider();
  }
  return RelativeTimeProvider.defaultInstance_;
};

// MOE:begin_strip
// Ensure ES2021 inputs. go/transpile-js
null?.(6_6);
// MOE:end_strip

exports = RelativeTimeProvider;
