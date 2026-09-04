/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A map of listeners that provides utility functions to
 * deal with listeners on an event target. Used by
 * `goog.events.EventTarget`.
 *
 * WARNING: Do not use this class from outside goog.events package.
 *
 */

goog.module('goog.events.ListenerMap');

goog.module.declareLegacyNamespace();

const EventId = goog.requireType('goog.events.EventId');
const Listenable = goog.requireType('goog.events.Listenable');
const ListenableKey = goog.requireType('goog.events.ListenableKey');
const Listener = goog.require('goog.events.Listener');
const array = goog.require('goog.array');
const object = goog.require('goog.object');

/**
 * Creates a new listener map.
 * @param {EventTarget|Listenable} src The src object.
 * @constructor
 * @final
 */
function ListenerMap(src) {
  /** @type {EventTarget|Listenable} */
  this.src = src;

  /**
   * Maps of event type to an array of listeners.
   * @type {!Object<string, !Array<!Listener>>}
   */
  this.listeners = {};

  /**
   * The count of types in this map that have registered listeners.
   * @private {number}
   */
  this.typeCount_ = 0;
}


/**
 * @return {number} The count of event types in this map that actually
 *     have registered listeners.
 */
ListenerMap.prototype.getTypeCount = function() {
  return this.typeCount_;
};


/**
 * @return {number} Total number of registered listeners.
 */
ListenerMap.prototype.getListenerCount = function() {
  let count = 0;
  for (const type in this.listeners) {
    count += this.listeners[type].length;
  }
  return count;
};


/**
 * Adds an event listener. A listener can only be added once to an
 * object and if it is added again the key for the listener is
 * returned.
 *
 * Note that a one-off listener will not change an existing listener,
 * if any. On the other hand a normal listener will change existing
 * one-off listener to become a normal listener.
 *
 * @param {string|!EventId} type The listener event type.
 * @param {!Function} listener This listener callback method.
 * @param {boolean} callOnce Whether the listener is a one-off
 *     listener.
 * @param {boolean=} opt_useCapture The capture mode of the listener.
 * @param {Object=} opt_listenerScope Object in whose scope to call the
 *     listener.
 * @return {!ListenableKey} Unique key for the listener.
 */
ListenerMap.prototype.add = function(
    type, listener, callOnce, opt_useCapture, opt_listenerScope) {
  const typeStr = type.toString();
  let listenerArray = this.listeners[typeStr];
  if (!listenerArray) {
    listenerArray = this.listeners[typeStr] = [];
    this.typeCount_++;
  }

  let listenerObj;
  const index = ListenerMap.findListenerIndex_(
      listenerArray, listener, opt_useCapture, opt_listenerScope);
  if (index > -1) {
    listenerObj = listenerArray[index];
    if (!callOnce) {
      // Ensure that, if there is an existing callOnce listener, it is no
      // longer a callOnce listener.
      listenerObj.callOnce = false;
    }
  } else {
    listenerObj = new Listener(
        listener, null, this.src, typeStr, !!opt_useCapture, opt_listenerScope);
    listenerObj.callOnce = callOnce;
    listenerArray.push(listenerObj);
  }
  return listenerObj;
};


/**
 * Removes a matching listener.
 * @param {string|!EventId} type The listener event type.
 * @param {!Function} listener This listener callback method.
 * @param {boolean=} opt_useCapture The capture mode of the listener.
 * @param {Object=} opt_listenerScope Object in whose scope to call the
 *     listener.
 * @return {boolean} Whether any listener was removed.
 */
ListenerMap.prototype.remove = function(
    type, listener, opt_useCapture, opt_listenerScope) {
  const typeStr = type.toString();
  if (!(typeStr in this.listeners)) {
    return false;
  }

  const listenerArray = this.listeners[typeStr];
  const index = ListenerMap.findListenerIndex_(
      listenerArray, listener, opt_useCapture, opt_listenerScope);
  if (index > -1) {
    const listenerObj = listenerArray[index];
    listenerObj.markAsRemoved();
    array.removeAt(listenerArray, index);
    if (listenerArray.length == 0) {
      delete this.listeners[typeStr];
      this.typeCount_--;
    }
    return true;
  }
  return false;
};


/**
 * Removes the given listener object.
 * @param {!ListenableKey} listener The listener to remove.
 * @return {boolean} Whether the listener is removed.
 */
ListenerMap.prototype.removeByKey = function(listener) {
  const type = listener.type;
  if (!(type in this.listeners)) {
    return false;
  }

  const removed = array.remove(this.listeners[type], listener);
  if (removed) {
    /** @type {!Listener} */ (listener).markAsRemoved();
    if (this.listeners[type].length == 0) {
      delete this.listeners[type];
      this.typeCount_--;
    }
  }
  return removed;
};


/**
 * Removes all listeners from this map. If opt_type is provided, only
 * listeners that match the given type are removed.
 * @param {string|!EventId=} opt_type Type of event to remove.
 * @return {number} Number of listeners removed.
 */
ListenerMap.prototype.removeAll = function(opt_type) {
  const typeStr = opt_type && opt_type.toString();
  let count = 0;
  for (const type in this.listeners) {
    if (!typeStr || type == typeStr) {
      const listenerArray = this.listeners[type];
      for (let i = 0; i < listenerArray.length; i++) {
        ++count;
        listenerArray[i].markAsRemoved();
      }
      delete this.listeners[type];
      this.typeCount_--;
    }
  }
  return count;
};


/**
 * Gets all listeners that match the given type and capture mode. The
 * returned array is a copy (but the listener objects are not).
 * @param {string|!EventId} type The type of the listeners
 *     to retrieve.
 * @param {boolean} capture The capture mode of the listeners to retrieve.
 * @return {!Array<!ListenableKey>} An array of matching
 *     listeners.
 */
ListenerMap.prototype.getListeners = function(type, capture) {
  const listenerArray = this.listeners[type.toString()];
  const rv = [];
  if (listenerArray) {
    for (let i = 0; i < listenerArray.length; ++i) {
      const listenerObj = listenerArray[i];
      if (listenerObj.capture == capture) {
        rv.push(listenerObj);
      }
    }
  }
  return rv;
};


/**
 * Gets the goog.events.ListenableKey for the event or null if no such
 * listener is in use.
 *
 * @param {string|!EventId} type The type of the listener
 *     to retrieve.
 * @param {!Function} listener The listener function to get.
 * @param {boolean} capture Whether the listener is a capturing listener.
 * @param {Object=} opt_listenerScope Object in whose scope to call the
 *     listener.
 * @return {ListenableKey} the found listener or null if not found.
 */
ListenerMap.prototype.getListener = function(
    type, listener, capture, opt_listenerScope) {
  const listenerArray = this.listeners[type.toString()];
  let i = -1;
  if (listenerArray) {
    i = ListenerMap.findListenerIndex_(
        listenerArray, listener, capture, opt_listenerScope);
  }
  return i > -1 ? listenerArray[i] : null;
};


/**
 * Whether there is a matching listener. If either the type or capture
 * parameters are unspecified, the function will match on the
 * remaining criteria.
 *
 * @param {string|!EventId=} opt_type The type of the listener.
 * @param {boolean=} opt_capture The capture mode of the listener.
 * @return {boolean} Whether there is an active listener matching
 *     the requested type and/or capture phase.
 */
ListenerMap.prototype.hasListener = function(opt_type, opt_capture) {
  const hasType = (opt_type !== undefined);
  const typeStr = hasType ? opt_type.toString() : '';
  const hasCapture = (opt_capture !== undefined);

  return object.some(this.listeners, function(listenerArray, type) {
    for (let i = 0; i < listenerArray.length; ++i) {
      if ((!hasType || listenerArray[i].type == typeStr) &&
          (!hasCapture || listenerArray[i].capture == opt_capture)) {
        return true;
      }
    }

    return false;
  });
};


/**
 * Finds the index of a matching goog.events.Listener in the given
 * listenerArray.
 * @param {!Array<!Listener>} listenerArray Array of listener.
 * @param {!Function} listener The listener function.
 * @param {boolean=} opt_useCapture The capture flag for the listener.
 * @param {Object=} opt_listenerScope The listener scope.
 * @return {number} The index of the matching listener within the
 *     listenerArray.
 * @private
 */
ListenerMap.findListenerIndex_ = function(
    listenerArray, listener, opt_useCapture, opt_listenerScope) {
  for (let i = 0; i < listenerArray.length; ++i) {
    const listenerObj = listenerArray[i];
    if (!listenerObj.removed && listenerObj.listener == listener &&
        listenerObj.capture == !!opt_useCapture &&
        listenerObj.handler == opt_listenerScope) {
      return i;
    }
  }
  return -1;
};

exports = ListenerMap;
