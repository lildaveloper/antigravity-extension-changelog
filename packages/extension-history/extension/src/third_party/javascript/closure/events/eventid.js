/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */
goog.module('goog.events.EventId');
goog.module.declareLegacyNamespace();

/**
 * A templated class that is used when registering for events. Typical usage:
 *
 *    /** @type {EventId<MyEventObj>} *\
 *    var myEventId = new EventId(
 *        goog.events.getUniqueId(('someEvent'));
 *
 *    // No need to cast or declare here since the compiler knows the
 *    // correct type of 'evt' (MyEventObj).
 *    something.listen(myEventId, function(evt) {});
 *
 * @param {string} eventId
 * @template T
 * @constructor
 * @struct
 * @final
 */
function EventId(eventId) {
  /** @const */ this.id = eventId;
}

/**
 * @override
 * @return {string}
 */
EventId.prototype.toString = function() {
  return this.id;
};

// MOE:begin_strip
// Ensure ES2021 inputs. go/transpile-js
null?.(6_6);
// MOE:end_strip

exports = EventId;
