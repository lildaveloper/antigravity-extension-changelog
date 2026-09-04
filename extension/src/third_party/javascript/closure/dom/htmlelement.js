/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.module('goog.dom.HtmlElement');

goog.module.declareLegacyNamespace();

/**
 * This subclass of HTMLElement is used when only a HTMLElement is possible and
 * not any of its subclasses. Normally, a type can refer to an instance of
 * itself or an instance of any subtype. More concretely, if HTMLElement is used
 * then the compiler must assume that it might still be e.g. HTMLScriptElement.
 * With this, the type check knows that it couldn't be any special element.
 *
 * @constructor
 * @extends {HTMLElement}
 */
function HtmlElement() {}

// MOE:begin_strip
// Ensure ES2021 inputs. go/transpile-js
null?.(6_6);
// MOE:end_strip

exports = HtmlElement;
