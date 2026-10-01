/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview An interface that describes a single registered listener.
 */
goog.module('goog.events.ListenableKey');
goog.module.declareLegacyNamespace();

const Listenable = goog.requireType('goog.events.Listenable');

/**
 * An interface that describes a single registered listener.
 * @interface
 */
function ListenableKey() {}

/**
 * Counter used to create a unique key
 * @type {number}
 * @private
 */
ListenableKey.counter_ = 0;

/**
 * Reserves a key to be used for ListenableKey#key field.
 * @return {number} A number to be used to fill ListenableKey#key
 *     field.
 */
ListenableKey.reserveKey = function() {
  return ++ListenableKey.counter_;
};

/**
 * The source event target.
 * @type {?Object|?Listenable}
 */
ListenableKey.prototype.src;

/**
 * The event type the listener is listening to.
 * @type {string}
 */
ListenableKey.prototype.type;

/**
 * The listener function.
 * @type {function(?):?|{handleEvent:function(?):?}|null}
 */
ListenableKey.prototype.listener;

/**
 * Whether the listener works on capture phase.
 * @type {boolean}
 */
ListenableKey.prototype.capture;

/**
 * The 'this' object for the listener function's scope.
 * @type {?Object|undefined}
 */
ListenableKey.prototype.handler;

/**
 * A globally unique number to identify the key.
 * @type {number}
 */
ListenableKey.prototype.key;

// MOE:begin_strip
// Ensure ES2021 inputs. go/transpile-js
null?.(6_6);
// MOE:end_strip

exports = ListenableKey;
