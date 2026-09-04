// Copyright 2009 Google Inc.  All Rights Reserved.

/**
 * @fileoverview A hidden helper div for measuring.
 * @author larrypo@google.com (Larry Powelson)
 */

goog.module('fava.dom.MeasuringDiv');
goog.module.declareLegacyNamespace();

const Disposable = goog.require('goog.Disposable');
const dom = goog.require('goog.dom');

/**
 * A hidden helper div for measuring.
 * @final
 */
const MeasuringDiv = class extends Disposable {
  /**
   * @param {dom.DomHelper=} opt_domHelper The DOM helper object for the
   *     document we want to render in.  If not provided, default document is
   *     used.
   * @param {string=} opt_className Optional CSS class name.
   * @param {Object=} opt_styles Name-value map of styles to apply to the text.
   */
  constructor(opt_domHelper, opt_className, opt_styles) {
    super();

    /**
     * @type {Document}
     * @private
     */
    this.doc_ = opt_domHelper ? opt_domHelper.getDocument() : document;

    /**
     * @type {string}
     * @private
     */
    this.className_ = opt_className || '';

    /**
     * @type {Object|undefined}
     * @private
     */
    this.styles_ = opt_styles;
  }

  /** @override */
  disposeInternal() {
    // Removes the helper div after using it.
    if (this.div_) {
      dom.removeNode(this.div_);
    }
    this.div_ = null;
    this.doc_ = null;
  }

  /**
   * @return {!Element} Hidden helper div.
   */
  getDiv() {
    if (!this.div_) {
      this.div_ = this.doc_.createElement('div');

      // Style the div to be accurately measureable.
      this.div_.className = this.className_;
      this.div_.style.whiteSpace = 'nowrap';
      this.div_.style.overflow = 'auto';
      if (this.styles_) {
        for (const attribute in this.styles_) {
          this.div_.style[attribute] = this.styles_[attribute];
        }
      }
      this.div_.style.visibility = 'hidden';
      this.div_.style.width = '0px';
      this.div_.style.display = '';
      this.div_.style.position = 'absolute';
      this.div_.style.top = '-1000px';

      this.doc_.body.appendChild(this.div_);
    }

    return this.div_;
  }

  /**
   * Sets the text on the helper div for measurement. Avoids a dependency on
   * dom.setTextContent.
   * @param {string} text Text to set.
   * @suppress {checkTypes} Auto-added to allow setting parameters in Node
   * methods to required
   */
  setText(text) {
    const div = this.getDiv();
    if ('textContent' in div) {
      div.textContent = text;
    } else {
      while (div.hasChildNodes()) {
        div.removeChild(div.firstChild);
      }
      div.appendChild(this.doc_.createTextNode(text));
    }
  }
};

/**
 * @type {Element}
 * @private
 */
MeasuringDiv.prototype.div_;

exports = MeasuringDiv;
