/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A disposable implementation of a custom
 * listenable/event target. See also: documentation for
 * `Listenable`.
 *
 * @see Listenable
 */
goog.module('goog.events.EventTarget');
goog.module.declareLegacyNamespace();

const Disposable = goog.require('goog.Disposable');
const EventId = goog.requireType('goog.events.EventId');
const EventLike = goog.requireType('goog.events.EventLike');
const GoogEvent = goog.require('goog.events.Event');
const Listenable = goog.require('goog.events.Listenable');
const ListenableKey = goog.requireType('goog.events.ListenableKey');
const ListenerMap = goog.require('goog.events.ListenerMap');
const asserts = goog.require('goog.asserts');
const events = goog.require('goog.events');
const googObject = goog.require('goog.object');

/**
 * An implementation of `Listenable` with full W3C
 * EventTarget-like support (capture/bubble mechanism, stopping event
 * propagation, preventing default actions).
 *
 * You may subclass this class to turn your class into a Listenable.
 *
 * Unless propagation is stopped, an event dispatched by an
 * EventTarget will bubble to the parent returned by
 * `getParentEventTarget`. To set the parent, call
 * `setParentEventTarget`. Subclasses that don't support
 * changing the parent can override the setter to throw an error.
 *
 * Example usage:
 * <pre>
 *   var source = new EventsEventTarget();
 *   function handleEvent(e) {
 *     alert('Type: ' + e.type + '; Target: ' + e.target);
 *   }
 *   source.listen('foo', handleEvent);
 *   // Or: events.listen(source, 'foo', handleEvent);
 *   ...
 *   source.dispatchEvent('foo');  // will call handleEvent
 *   ...
 *   source.unlisten('foo', handleEvent);
 *   // Or: events.unlisten(source, 'foo', handleEvent);
 * </pre>
 *
 * @constructor
 * @extends {Disposable}
 * @implements {Listenable}
 */
function EventsEventTarget() {
  Disposable.call(this);

  /**
   * Maps of event type to an array of listeners.
   * @private {!ListenerMap}
   */
  this.eventTargetListeners_ = new ListenerMap(this);

  /**
   * The object to use for event.target. Useful when mixing in an
   * EventTarget to another object.
   * @private {!Object}
   */
  this.actualEventTarget_ = this;

  /**
   * Parent event target, used during event bubbling.
   *
   * TODO(chrishenry): Change this to Listenable. This
   * currently breaks people who expect getParentEventTarget to return
   * EventsEventTarget.
   *
   * @private {?EventsEventTarget}
   */
  this.parentEventTarget_ = null;
}
goog.inherits(EventsEventTarget, Disposable);
Listenable.addImplementation(EventsEventTarget);

/**
 * An artificial cap on the number of ancestors you can have. This is mainly
 * for loop detection.
 * @const {number}
 * @private
 */
EventsEventTarget.MAX_ANCESTORS_ = 1000;

/**
 * Returns the parent of this event target to use for bubbling.
 *
 * @return {EventsEventTarget} The parent EventTarget or null if
 *     there is no parent.
 * @override
 */
EventsEventTarget.prototype.getParentEventTarget = function() {
  return this.parentEventTarget_;
};

/**
 * Sets the parent of this event target to use for capture/bubble
 * mechanism.
 * @param {EventsEventTarget} parent Parent listenable (null if none).
 */
EventsEventTarget.prototype.setParentEventTarget = function(parent) {
  this.parentEventTarget_ = parent;
};

/**
 * Adds an event listener to the event target. The same handler can only be
 * added once per the type. Even if you add the same handler multiple times
 * using the same type then it will only be called once when the event is
 * dispatched.
 *
 * @param {string|!EventId} type The type of the event to listen for
 * @param {function(?):?|{handleEvent:function(?):?}|null} handler The function
 *     to handle the event. The handler can also be an object that implements
 *     the handleEvent method which takes the event object as argument.
 * @param {boolean=} opt_capture In DOM-compliant browsers, this determines
 *     whether the listener is fired during the capture or bubble phase
 *     of the event.
 * @param {Object=} opt_handlerScope Object in whose scope to call
 *     the listener.
 * @deprecated Use `EventsEventTarget.prototype.listen` instead, when
 *     possible. Otherwise, use `events.listen` if you are passing Object
 *     (instead of Function) as handler.
 */
EventsEventTarget.prototype.addEventListener = function(
    type, handler, opt_capture, opt_handlerScope) {
  events.listen(this, type, handler, opt_capture, opt_handlerScope);
};

/**
 * Removes an event listener from the event target. The handler must be the
 * same object as the one added. If the handler has not been added then
 * nothing is done.
 *
 * @param {string|!EventId} type The type of the event to listen for
 * @param {function(?):?|{handleEvent:function(?):?}|null} handler The function
 *     to handle the event. The handler can also be an object that implements
 *     the handleEvent method which takes the event object as argument.
 * @param {boolean=} opt_capture In DOM-compliant browsers, this determines
 *     whether the listener is fired during the capture or bubble phase
 *     of the event.
 * @param {Object=} opt_handlerScope Object in whose scope to call
 *     the listener.
 * @deprecated Use `#unlisten` instead, when possible. Otherwise, use
 *     `events.unlisten` if you are passing Object
 *     (instead of Function) as handler.
 */
EventsEventTarget.prototype.removeEventListener = function(
    type, handler, opt_capture, opt_handlerScope) {
  events.unlisten(this, type, handler, opt_capture, opt_handlerScope);
};

/**
 * @param {?EventLike} e Event object.
 * @return {boolean} If anyone called preventDefault on the event object (or
 *     if any of the listeners returns false) this will also return false.
 * @override
 */
EventsEventTarget.prototype.dispatchEvent = function(e) {
  this.assertInitialized_();

  let ancestorsTree;
  let ancestor = this.getParentEventTarget();
  if (ancestor) {
    ancestorsTree = [];
    let ancestorCount = 1;
    for (; ancestor; ancestor = ancestor.getParentEventTarget()) {
      ancestorsTree.push(ancestor);
      asserts.assert(
          (++ancestorCount < EventsEventTarget.MAX_ANCESTORS_),
          'infinite loop');
    }
  }

  return EventsEventTarget.dispatchEventInternal_(
      this.actualEventTarget_, e, ancestorsTree);
};

/**
 * Removes listeners from this object.  Classes that extend EventTarget may
 * need to override this method in order to remove references to DOM Elements
 * and additional listeners.
 * @override
 * @protected
 */
EventsEventTarget.prototype.disposeInternal = function() {
  EventsEventTarget.superClass_.disposeInternal.call(this);

  this.removeAllListeners();
  this.parentEventTarget_ = null;
};

/**
 * @param {string|!EventId<EVENTOBJ>} type The event type id.
 * @param {function(this:SCOPE, EVENTOBJ):(boolean|undefined)} listener Callback
 *     method.
 * @param {boolean=} opt_useCapture Whether to fire in capture phase
 *     (defaults to false).
 * @param {SCOPE=} opt_listenerScope Object in whose scope to call the
 *     listener.
 * @return {!ListenableKey} Unique key for the listener.
 * @template SCOPE,EVENTOBJ
 * @override
 */
EventsEventTarget.prototype.listen = function(
    type, listener, opt_useCapture, opt_listenerScope) {
  this.assertInitialized_();
  return this.eventTargetListeners_.add(
      String(type), listener, false /* callOnce */, opt_useCapture,
      opt_listenerScope);
};

/**
 * @param {string|!EventId<EVENTOBJ>} type The event type id.
 * @param {function(this:SCOPE, EVENTOBJ):(boolean|undefined)} listener Callback
 *     method.
 * @param {boolean=} opt_useCapture Whether to fire in capture phase
 *     (defaults to false).
 * @param {SCOPE=} opt_listenerScope Object in whose scope to call the
 *     listener.
 * @return {!ListenableKey} Unique key for the listener.
 * @template SCOPE,EVENTOBJ
 * @override
 */
EventsEventTarget.prototype.listenOnce = function(
    type, listener, opt_useCapture, opt_listenerScope) {
  return this.eventTargetListeners_.add(
      String(type), listener, true /* callOnce */, opt_useCapture,
      opt_listenerScope);
};

/**
 * @param {string|!EventId<EVENTOBJ>} type The event type id.
 * @param {function(this:SCOPE, EVENTOBJ):(boolean|undefined)} listener Callback
 *     method.
 * @param {boolean=} opt_useCapture Whether to fire in capture phase
 *     (defaults to false).
 * @param {SCOPE=} opt_listenerScope Object in whose scope to call
 *     the listener.
 * @return {boolean} Whether any listener was removed.
 * @template SCOPE,EVENTOBJ
 * @override
 */
EventsEventTarget.prototype.unlisten = function(
    type, listener, opt_useCapture, opt_listenerScope) {
  return this.eventTargetListeners_.remove(
      String(type), listener, opt_useCapture, opt_listenerScope);
};

/**
 * @param {!ListenableKey} key The key returned by
 *     listen() or listenOnce().
 * @return {boolean} Whether any listener was removed.
 * @override
 */
EventsEventTarget.prototype.unlistenByKey = function(key) {
  return this.eventTargetListeners_.removeByKey(key);
};

/**
 * @param {string|!EventId=} opt_type Type of event to remove,
 *     default is to remove all types.
 * @return {number} Number of listeners removed.
 * @override
 */
EventsEventTarget.prototype.removeAllListeners = function(opt_type) {
  // TODO(chrishenry): Previously, removeAllListeners can be called on
  // uninitialized EventTarget, so we preserve that behavior. We
  // should remove this when usages that rely on that fact are purged.
  if (!this.eventTargetListeners_) {
    return 0;
  }
  return this.eventTargetListeners_.removeAll(opt_type);
};

/**
 * @param {string|!EventId<EVENTOBJ>} type The type of the
 *     listeners to fire.
 * @param {boolean} capture The capture mode of the listeners to fire.
 * @param {EVENTOBJ} eventObject The event object to fire.
 * @return {boolean} Whether all listeners succeeded without
 *     attempting to prevent default behavior. If any listener returns
 *     false or called GoogEvent#preventDefault, this returns
 *     false.
 * @template EVENTOBJ
 * @override
 */
EventsEventTarget.prototype.fireListeners = function(
    type, capture, eventObject) {
  // TODO(chrishenry): Original code avoids array creation when there
  // is no listener, so we do the same. If this optimization turns
  // out to be not required, we can replace this with
  // getListeners(type, capture) instead, which is simpler.
  let listenerArray = this.eventTargetListeners_.listeners[String(type)];
  if (!listenerArray) {
    return true;
  }
  listenerArray = listenerArray.concat();

  let rv = true;
  for (let i = 0; i < listenerArray.length; ++i) {
    const listener = listenerArray[i];
    // We might not have a listener if the listener was removed.
    if (listener && !listener.removed && listener.capture == capture) {
      const listenerFn = listener.listener;
      const listenerHandler = listener.handler || listener.src;

      if (listener.callOnce) {
        this.unlistenByKey(listener);
      }
      rv = listenerFn.call(listenerHandler, eventObject) !== false && rv;
    }
  }

  return rv && !eventObject.defaultPrevented;
};

/**
 * @param {string|!EventId} type The type of the listeners to fire.
 * @param {boolean} capture The capture mode of the listeners to fire.
 * @return {!Array<!ListenableKey>} An array of registered
 *     listeners.
 * @template EVENTOBJ
 * @override
 */
EventsEventTarget.prototype.getListeners = function(type, capture) {
  return this.eventTargetListeners_.getListeners(String(type), capture);
};

/**
 * @param {string|!EventId<EVENTOBJ>} type The name of the event
 *     without the 'on' prefix.
 * @param {function(this:SCOPE, EVENTOBJ):(boolean|undefined)} listener The
 *     listener function to get.
 * @param {boolean} capture Whether the listener is a capturing listener.
 * @param {SCOPE=} opt_listenerScope Object in whose scope to call the
 *     listener.
 * @return {?ListenableKey} the found listener or null if not found.
 * @template SCOPE,EVENTOBJ
 * @override
 */
EventsEventTarget.prototype.getListener = function(
    type, listener, capture, opt_listenerScope) {
  return this.eventTargetListeners_.getListener(
      String(type), listener, capture, opt_listenerScope);
};

/**
 * @param {string|!EventId<EVENTOBJ>=} opt_type Event type.
 * @param {boolean=} opt_capture Whether to check for capture or bubble
 *     listeners.
 * @return {boolean} Whether there is any active listeners matching
 *     the requested type and/or capture phase.
 * @template EVENTOBJ
 * @override
 */
EventsEventTarget.prototype.hasListener = function(opt_type, opt_capture) {
  const id = (opt_type !== undefined) ? String(opt_type) : undefined;
  return this.eventTargetListeners_.hasListener(id, opt_capture);
};

/**
 * Sets the target to be used for `event.target` when firing
 * event. Mainly used for testing. For example, see
 * `goog.testing.events.mixinListenable`.
 * @param {!Object} target The target.
 */
EventsEventTarget.prototype.setTargetForTesting = function(target) {
  this.actualEventTarget_ = target;
};

/**
 * Asserts that the event target instance is initialized properly.
 * @private
 */
EventsEventTarget.prototype.assertInitialized_ = function() {
  asserts.assert(
      this.eventTargetListeners_,
      'Event target is not initialized. Did you call the superclass ' +
          '(goog.events.EventTarget) constructor?');
};

/**
 * Dispatches the given event on the ancestorsTree.
 *
 * @param {!Object} target The target to dispatch on.
 * @param {GoogEvent|Object|string} e The event object.
 * @param {Array<Listenable>=} opt_ancestorsTree The ancestors
 *     tree of the target, in reverse order from the closest ancestor
 *     to the root event target. May be null if the target has no ancestor.
 * @return {boolean} If anyone called preventDefault on the event object (or
 *     if any of the listeners returns false) this will also return false.
 * @private
 */
EventsEventTarget.dispatchEventInternal_ = function(
    target, e, opt_ancestorsTree) {
  /** @suppress {missingProperties} */
  const type = e.type || /** @type {string} */ (e);

  // If accepting a string or object, create a custom event object so that
  // preventDefault and stopPropagation work with the event.
  if (typeof e === 'string') {
    e = new GoogEvent(e, target);
  } else if (!(e instanceof GoogEvent)) {
    const oldEvent = e;
    e = new GoogEvent(type, target);
    googObject.extend(e, oldEvent);
  } else {
    e.target = e.target || target;
  }

  let rv = true;
  let currentTarget;

  // Executes all capture listeners on the ancestors, if any.
  let i;
  if (opt_ancestorsTree) {
    for (i = opt_ancestorsTree.length - 1; !e.hasPropagationStopped() && i >= 0;
         i--) {
      currentTarget = e.currentTarget = opt_ancestorsTree[i];
      rv = currentTarget.fireListeners(type, true, e) && rv;
    }
  }

  // Executes capture and bubble listeners on the target.
  if (!e.hasPropagationStopped()) {
    currentTarget = /** @type {?} */ (e.currentTarget = target);
    rv = currentTarget.fireListeners(type, true, e) && rv;
    if (!e.hasPropagationStopped()) {
      rv = currentTarget.fireListeners(type, false, e) && rv;
    }
  }

  // Executes all bubble listeners on the ancestors, if any.
  if (opt_ancestorsTree) {
    for (i = 0; !e.hasPropagationStopped() && i < opt_ancestorsTree.length;
         i++) {
      currentTarget = e.currentTarget = opt_ancestorsTree[i];
      rv = currentTarget.fireListeners(type, false, e) && rv;
    }
  }

  return rv;
};

exports = EventsEventTarget;
