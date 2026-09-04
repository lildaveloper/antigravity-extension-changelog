// Copyright 2009 Google Inc. All Rights Reserved.

/**
 * @fileoverview Utilities for manipulating the browser's Document Object Model.
 * Please consider putting methods in goog.dom before adding methods here.
 *
 * @author wud@google.com (David Wu)
 */

goog.provide('fava.dom');

goog.require('fava.dom.MeasuringDiv');
goog.require('goog.asserts');
goog.require('goog.dom');
goog.require('goog.log');
goog.require('goog.object');


/**
 * Similar to {@link goog.dom.getElement} except that it expects the element
 * to be present in the dom thus returning a required value. Otherwise,
 * will assert.
 *
 * @param {string|Element} element Element ID or a DOM element node.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional helper to use.
 * @return {!Element} The element with the given ID, or the node passed in.
 */
fava.dom.getRequiredElement = function(element, opt_domHelper) {
  const dh = opt_domHelper || goog.dom.getDomHelper();
  const el = dh.getElement(element);
  goog.asserts.assertObject(el, 'Expected element: %s', element);
  return el;
};


/**
 * Similar to {@link goog.dom.getElementByClass} except that it expects the
 * element to be present in the dom thus returning a required value. Otherwise,
 * will assert.
 *
 * @param {string} className Class name to search for.
 * @param {Element=} opt_el Optional element to look in.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional helper to use.
 * @return {!Element} The element with the given class.
 */
fava.dom.getRequiredElementByClass = function(
    className, opt_el, opt_domHelper) {
  const dh = opt_domHelper || goog.dom.getDomHelper(opt_el);
  const el = dh.getElementByClass(className, opt_el);
  goog.asserts.assertObject(el, 'Expected element with class: %s', className);
  return el;
};


/**
 * Similar to {@link goog.dom.getElementsByTagNameAndClass} except that it
 * expects at least one element to be present in the dom, and returns the
 * first found. Otherwise, will assert.
 *
 * @param {string=} opt_tag Optional element tag name to filter by.
 * @param {string=} opt_class Optional class name to search for.
 * @param {Element=} opt_el Optional element to look in.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional helper to use.
 * @return {!Element} The element with the given ID, or the node passed in.
 */
fava.dom.getRequiredElementByTagNameAndClass = function(
    opt_tag, opt_class, opt_el, opt_domHelper) {
  const dh = opt_domHelper || goog.dom.getDomHelper(opt_el);
  const elems = dh.getElementsByTagNameAndClass(opt_tag, opt_class, opt_el);
  goog.asserts.assert(elems.length > 0,
      'Expected at least one element with tag \'%s\' and class \'%s\'',
      opt_tag ? opt_tag : '*', opt_class ? opt_class : '*');
  return elems[0];
};


/**
 * Measures the width in pixels of a plain-text string, as rendered by the
 * browser.
 * @param {string} text A plain-text string (not HTML).
 * @param {goog.dom.DomHelper=} opt_domHelper The DOM helper object for the
 *     document we want to render in.  If not provided, default document is
 *     used.
 * @param {string=} opt_className Optional style name to apply to the text.
 * @param {Object=} opt_styles Name-value map of styles to apply to the text.
 * @return {number} A length in pixels.
 */
fava.dom.getTextWidthInPixels = function(
    text, opt_domHelper, opt_className, opt_styles) {
  const measuringDiv =
      new fava.dom.MeasuringDiv(opt_domHelper, opt_className, opt_styles);
  measuringDiv.setText(text);
  const div = measuringDiv.getDiv();
  const width = div.scrollWidth || div.clientWidth;
  measuringDiv.dispose();
  return width;
};


/**
 * Converts a width with any valid units (e.g. '4em', '3.5mm') to a numeric
 * pixel value.
 * @param {string} width The width to convert, with any valid units.
 * @param {goog.dom.DomHelper=} opt_domHelper The DOM helper object for the
 *     document we want to render in.  If not provided, default document is
 *     used.
 * @param {string=} opt_className Optional CSS class name.
 * @param {Object=} opt_styles Name-value map of styles to apply to the text.
 * @return {number} A length in pixels.
 * @suppress {strictMissingProperties} go/strict_warnings_migration
 */
fava.dom.widthToPixels = function(
    width, opt_domHelper, opt_className, opt_styles) {
  const measuringDiv =
      new fava.dom.MeasuringDiv(opt_domHelper, opt_className, opt_styles);
  const div = measuringDiv.getDiv();
  div.style.width = width;
  const newWidth = div.clientWidth || div.offsetWidth;
  measuringDiv.dispose();
  return newWidth;
};


/**
 * @param {boolean} useParent True if the parent. False if the top.
 * @param {Window=} opt_window Optional window to use.
 * @return {boolean} If access to the parent is allowed.
 * @private
 */
fava.dom.isParentOrTopAccessAllowed_ = function(useParent, opt_window) {
  const win = opt_window || window;
  if (!win.location) {
    let out;
    // If the object is too big/deep, serialize will fail.  In that case, just
    // report the properties.
    try {
      out = JSON.stringify(win);
    } catch (e) {
      out = goog.object.getKeys(win).toString();
    }
    goog.log.error(
        goog.log.getLogger('fava.dom'), 'Bug 8201764 => ' + out);
  }
  const ancestorOrigins = win.location && win.location.ancestorOrigins;
  if (ancestorOrigins !== undefined) {
    if (!ancestorOrigins || !ancestorOrigins.length) {
      return true;
    }
    const index = useParent ? 0 : ancestorOrigins.length - 1;
    return ancestorOrigins[index] == win.location.origin;
  }

  // Since window.location.ancestorOrgins wasn't supported, fallback to
  // attempting access to determine if it is allowed.
  try {
    const windowAncestor = useParent ? win.parent : win.top;
    return windowAncestor.location.href !== undefined;
  } catch (e) {
    return false;
  }
};


/**
 * @param {Window=} opt_window Optional window to use.
 * @return {boolean} If access to the parent is allowed.
 */
fava.dom.isParentAccessAllowed = function(opt_window) {
  return fava.dom.isParentOrTopAccessAllowed_(true, opt_window);
};


/**
 * @param {Window=} opt_window Optional window to use.
 * @return {boolean} If access to window.top is allowed.
 */
fava.dom.isTopAccessAllowed = function(opt_window) {
  return fava.dom.isParentOrTopAccessAllowed_(false, opt_window);
};
