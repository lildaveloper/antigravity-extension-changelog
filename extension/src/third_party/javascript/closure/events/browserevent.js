/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A patched, standardized event object for browser events.
 *
 * <pre>
 * The patched event object contains the following members:
 * - type           {string}    Event type, e.g. 'click'
 * - target         {Object}    The element that actually triggered the event
 * - currentTarget  {Object}    The element the listener is attached to
 * - relatedTarget  {Object}    For mouseover and mouseout, the previous object
 * - offsetX        {number}    X-coordinate relative to target
 * - offsetY        {number}    Y-coordinate relative to target
 * - clientX        {number}    X-coordinate relative to viewport
 * - clientY        {number}    Y-coordinate relative to viewport
 * - screenX        {number}    X-coordinate relative to the edge of the screen
 * - screenY        {number}    Y-coordinate relative to the edge of the screen
 * - button         {number}    Mouse button. Use isButton() to test.
 * - keyCode        {number}    Key-code
 * - ctrlKey        {boolean}   Was ctrl key depressed
 * - altKey         {boolean}   Was alt key depressed
 * - shiftKey       {boolean}   Was shift key depressed
 * - metaKey        {boolean}   Was meta key depressed
 * - pointerId      {number}    Pointer ID
 * - pointerType    {string}    Pointer type, e.g. 'mouse', 'pen', or 'touch'
 * - defaultPrevented {boolean} Whether the default action has been prevented
 * - state          {Object}    History state object
 * - timeStamp      {number}    Number of milliseconds since the window's time
 *                              origin
 *
 * NOTE: The keyCode member contains the raw browser keyCode. For normalized
 * key and character code use {@link goog.events.KeyHandler}.
 * </pre>
 */
goog.module('goog.events.BrowserEvent');
goog.module.declareLegacyNamespace();

const EventType = goog.require('goog.events.EventType');
const GoogEvent = goog.require('goog.events.Event');
const userAgent = goog.require('goog.userAgent');

/**
 * Accepts a browser event object and creates a patched, cross browser event
 * object.
 * The content of this object will not be initialized if no event object is
 * provided. If this is the case, init() needs to be invoked separately.
 * @param {Event=} opt_e Browser event object.
 * @param {EventTarget=} opt_currentTarget Current target for event.
 * @constructor
 * @extends {GoogEvent}
 */
function BrowserEvent(opt_e, opt_currentTarget) {
  BrowserEvent.base(this, 'constructor', opt_e ? opt_e.type : '');

  /**
   * Target that fired the event.
   * @override
   * @type {?Node}
   */
  this.target = null;

  /**
   * Node that had the listener attached.
   * @override
   * @type {?Node|undefined}
   */
  this.currentTarget = null;

  /**
   * For mouseover and mouseout events, the related object for the event.
   * @type {?Node}
   */
  this.relatedTarget = null;

  /**
   * X-coordinate relative to target.
   * @type {number}
   */
  this.offsetX = 0;

  /**
   * Y-coordinate relative to target.
   * @type {number}
   */
  this.offsetY = 0;

  /**
   * X-coordinate relative to the window.
   * @type {number}
   */
  this.clientX = 0;

  /**
   * Y-coordinate relative to the window.
   * @type {number}
   */
  this.clientY = 0;

  /**
   * X-coordinate relative to the monitor.
   * @type {number}
   */
  this.screenX = 0;

  /**
   * Y-coordinate relative to the monitor.
   * @type {number}
   */
  this.screenY = 0;

  /**
   * Which mouse button was pressed.
   * @type {number}
   */
  this.button = 0;

  /**
   * Key of key press.
   * @type {string}
   */
  this.key = '';

  /**
   * Keycode of key press.
   * @type {number}
   */
  this.keyCode = 0;

  /**
   * Keycode of key press.
   * @type {number}
   */
  this.charCode = 0;

  /**
   * Whether control was pressed at time of event.
   * @type {boolean}
   */
  this.ctrlKey = false;

  /**
   * Whether alt was pressed at time of event.
   * @type {boolean}
   */
  this.altKey = false;

  /**
   * Whether shift was pressed at time of event.
   * @type {boolean}
   */
  this.shiftKey = false;

  /**
   * Whether the meta key was pressed at time of event.
   * @type {boolean}
   */
  this.metaKey = false;

  /**
   * History state object, only set for PopState events where it's a copy of the
   * state object provided to pushState or replaceState.
   * @type {?Object}
   */
  this.state = null;

  /**
   * Whether the default platform modifier key was pressed at time of event.
   * (This is control for all platforms except Mac, where it's Meta.)
   * @type {boolean}
   */
  this.platformModifierKey = false;

  /**
   * @type {number}
   */
  this.pointerId = 0;

  /**
   * @type {string}
   */
  this.pointerType = '';

  /**
   * @type {number}
   */
  this.timeStamp = 0;

  /**
   * The browser event object.
   * @private {?Event}
   */
  this.event_ = null;

  if (opt_e) {
    this.init(opt_e, opt_currentTarget);
  }
}
goog.inherits(BrowserEvent, GoogEvent);

/**
 * @define {boolean} If true, use the layerX and layerY properties of a native
 * browser event over the offsetX and offsetY properties, which cause expensive
 * reflow. If layerX or layerY is not defined, offsetX and offsetY will be used
 * as usual.
 */
BrowserEvent.USE_LAYER_XY_AS_OFFSET_XY =
    goog.define('goog.events.BrowserEvent.USE_LAYER_XY_AS_OFFSET_XY', false);

/**
 * Normalized button constants for the mouse.
 * @enum {number}
 */
BrowserEvent.MouseButton = {
  LEFT: 0,
  MIDDLE: 1,
  RIGHT: 2,
  BACK: 3,
  FORWARD: 4,
};

/**
 * Normalized pointer type constants for pointer events.
 * @enum {string}
 */
BrowserEvent.PointerType = {
  MOUSE: 'mouse',
  PEN: 'pen',
  TOUCH: 'touch'
};

/**
 * Accepts a browser event object and creates a patched, cross browser event
 * object.
 * @param {Event} e Browser event object.
 * @param {EventTarget=} opt_currentTarget Current target for event.
 */
BrowserEvent.prototype.init = function(e, opt_currentTarget) {
  const type = this.type = e.type;

  const touchEvent = /** @type {!TouchEvent} */ (e);
  /**
   * On touch devices use the first "changed touch" as the relevant touch.
   * @type {?Touch}
   */
  const relevantTouch =
      touchEvent.changedTouches && touchEvent.changedTouches.length ?
      touchEvent.changedTouches[0] :
      null;

  // TODO(nicksantos): Change this.target to type EventTarget.
  this.target = /** @type {Node} */ (e.target) || e.srcElement;

  // TODO(nicksantos): Change this.currentTarget to type EventTarget.
  this.currentTarget = /** @type {Node} */ (opt_currentTarget);

  let relatedTarget = /** @type {Node} */ (e.relatedTarget);
  if (!relatedTarget) {
    if (type == EventType.MOUSEOVER) {
      relatedTarget = e.fromElement;
    } else if (type == EventType.MOUSEOUT) {
      relatedTarget = e.toElement;
    }
  }

  this.relatedTarget = relatedTarget;

  if (relevantTouch) {
    this.clientX = relevantTouch.clientX !== undefined ? relevantTouch.clientX :
                                                         relevantTouch.pageX;
    this.clientY = relevantTouch.clientY !== undefined ? relevantTouch.clientY :
                                                         relevantTouch.pageY;
    this.screenX = relevantTouch.screenX || 0;
    this.screenY = relevantTouch.screenY || 0;
  } else {
    if (BrowserEvent.USE_LAYER_XY_AS_OFFSET_XY) {
      this.offsetX = (e.layerX !== undefined) ? e.layerX : e.offsetX;
      this.offsetY = (e.layerY !== undefined) ? e.layerY : e.offsetY;
    } else {
      // Webkit emits a lame warning whenever layerX/layerY is accessed.
      // http://code.google.com/p/chromium/issues/detail?id=101733
      this.offsetX =
          (userAgent.WEBKIT || e.offsetX !== undefined) ? e.offsetX : e.layerX;
      this.offsetY =
          (userAgent.WEBKIT || e.offsetY !== undefined) ? e.offsetY : e.layerY;
    }
    this.clientX = e.clientX !== undefined ? e.clientX : e.pageX;
    this.clientY = e.clientY !== undefined ? e.clientY : e.pageY;
    this.screenX = e.screenX || 0;
    this.screenY = e.screenY || 0;
  }

  this.button = e.button;

  this.keyCode = e.keyCode || 0;
  this.key = (/** @type {!KeyboardEvent} */ (e)).key || '';
  this.charCode = e.charCode || (type == 'keypress' ? e.keyCode : 0);
  this.ctrlKey = e.ctrlKey;
  this.altKey = e.altKey;
  this.shiftKey = e.shiftKey;
  this.metaKey = e.metaKey;
  this.platformModifierKey = userAgent.MAC ? e.metaKey : e.ctrlKey;
  this.pointerId = (/** @type {!PointerEvent} */ (e)).pointerId || 0;
  this.pointerType = BrowserEvent.getPointerType_(e);
  this.state =
      /** @type {?Object} */ ((/** @type {!PopStateEvent} */ (e)).state);
  this.timeStamp = e.timeStamp;
  this.event_ = e;
  if (e.defaultPrevented) {
    // Sync native event state to internal state via super class, where default
    // prevention is implemented and managed.
    BrowserEvent.superClass_.preventDefault.call(this);
  }
};

/**
 * Tests to see which button was pressed during the event. This is really only
 * useful in IE and Gecko browsers. And in IE, it's only useful for
 * mousedown/mouseup events, because click only fires for the left mouse button.
 *
 * Safari 2 only reports the left button being clicked, and uses the value '1'
 * instead of 0. Opera only reports a mousedown event for the middle button, and
 * no mouse events for the right button. Opera has default behavior for left and
 * middle click that can only be overridden via a configuration setting.
 *
 * There's a nice table of this mess at http://www.unixpapa.com/js/mouse.html.
 *
 * @param {BrowserEvent.MouseButton} button The button
 *     to test for.
 * @return {boolean} True if button was pressed.
 */
BrowserEvent.prototype.isButton = function(button) {
  return this.event_.button == button;
};

/**
 * Whether this has an "action"-producing mouse button.
 *
 * By definition, this includes left-click on windows/linux, and left-click
 * without the ctrl key on Macs.
 *
 * @return {boolean} The result.
 */
BrowserEvent.prototype.isMouseActionButton = function() {
  // Ctrl+click should never behave like a left-click on mac, regardless of
  // whether or not the browser will actually ever emit such an event.  If
  // we see it, treat it like right-click always.
  return this.isButton(BrowserEvent.MouseButton.LEFT) &&
      !(userAgent.MAC && this.ctrlKey);
};

/**
 * @override
 */
BrowserEvent.prototype.stopPropagation = function() {
  BrowserEvent.superClass_.stopPropagation.call(this);
  if (this.event_.stopPropagation) {
    this.event_.stopPropagation();
  } else {
    this.event_.cancelBubble = true;
  }
};

/**
 * @override
 */
BrowserEvent.prototype.preventDefault = function() {
  BrowserEvent.superClass_.preventDefault.call(this);
  const be = this.event_;
  if (!be.preventDefault) {
    be.returnValue = false;
  } else {
    be.preventDefault();
  }
};

/**
 * @return {Event} The underlying browser event object.
 */
BrowserEvent.prototype.getBrowserEvent = function() {
  return this.event_;
};

/**
 * Extracts the pointer type from the given event.
 * @param {!Event} e
 * @return {string} The pointer type, e.g. 'mouse', 'pen', or 'touch'.
 * @private
 */
BrowserEvent.getPointerType_ = function(e) {
  return (/** @type {!PointerEvent} */ (e)).pointerType;
};

exports = BrowserEvent;
