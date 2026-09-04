/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Definition of the FancyWindow class. Please minimize
 * dependencies this file has on other closure classes as any dependency it
 * takes won't be able to use the logging infrastructure.
 *
 * This is a pretty hacky implementation, aimed at making debugging of large
 * applications more manageable.
 */
goog.module('goog.debug.FancyWindow');
goog.module.declareLegacyNamespace();

// TODO(b/130421259): We're trying to migrate all ES5 subclasses of Closure
// Library to ES6. In ES6 this cannot be referenced before super is called. This
// file has at least one this before a super call (in ES5) and cannot be
// automatically upgraded to ES6 as a result. Please fix this if you have a
// chance. Note: This can sometimes be caused by not calling the super
// constructor at all. You can run the conversion tool yourself to see what it
const DebugWindow = goog.require('goog.debug.DebugWindow');
const TagName = goog.require('goog.dom.TagName');
const asserts = goog.require('goog.asserts');
const dom = goog.require('goog.dom');
const googArray = goog.require('goog.array');
const googString = goog.require('goog.string');
const log = goog.require('goog.log');
const safevalues = goog.require('google3.third_party.javascript.safevalues.index');
const safevaluesDom = goog.require('google3.third_party.javascript.safevalues.dom.index');

// TODO(mlourenco): Introduce goog.scope for goog.html.SafeHtml once b/12014412
// is fixed.
/**
 * Provides a Fancy extension to the DebugWindow class.  Allows filtering based
 * on loggers and levels.
 *
 * @param {string=} opt_identifier Idenitifier for this logging class.
 * @param {string=} opt_prefix Prefix pre-pended to messages.
 * @constructor
 * @extends {DebugWindow}
 */
function FancyWindow(opt_identifier, opt_prefix) {
  this.readOptionsFromLocalStorage_();
  FancyWindow.base(this, 'constructor', opt_identifier, opt_prefix);
  /** @private {?dom.DomHelper} */
  this.dh_ = null;
}
goog.inherits(FancyWindow, DebugWindow);

/**
 * Constant indicating if we are able to use localStorage to persist filters
 * @type {boolean}
 */
FancyWindow.HAS_LOCAL_STORE = (function() {
  try {
    return !!window['localStorage'].getItem;
  } catch (e) {
  }
  return false;
})();

/**
 * Constant defining the prefix to use when storing log levels
 * @type {string}
 */
FancyWindow.LOCAL_STORE_PREFIX = 'fancywindow.sel.';

/** @override */
FancyWindow.prototype.writeBufferToLog = function() {
  this.lastCall = goog.now();
  if (this.hasActiveWindow()) {
    const logel = /** @type {!HTMLElement} */ (this.dh_.getElement('log'));

    // Work out if scrolling is needed before we add the content
    const scroll =
        logel.scrollHeight - (logel.scrollTop + logel.offsetHeight) <= 100;

    for (let i = 0; i < this.outputBuffer.length; i++) {
      const div = this.dh_.createDom(TagName.DIV, 'logmsg');
      safevaluesDom.setElementInnerHtml(div, this.outputBuffer[i]);
      logel.appendChild(div);
    }
    this.outputBuffer.length = 0;
    this.resizeStuff_();

    if (scroll) {
      logel.scrollTop = logel.scrollHeight;
    }
  }
};

/** @override */
FancyWindow.prototype.writeInitialDocument = function() {
  if (!this.hasActiveWindow()) {
    return;
  }

  const doc = this.win.document;
  doc.open();
  safevaluesDom.documentWrite(doc, this.getHtml_());
  doc.close();

  this.win.onresize = goog.bind(this.resizeStuff_, this);

  // Create a dom helper for the logging window
  this.dh_ = new dom.DomHelper(doc);

  // Don't use events system to reduce dependencies
  this.dh_.getElement('openbutton').onclick =
      goog.bind(this.openOptions_, this);
  this.dh_.getElement('closebutton').onclick =
      goog.bind(this.closeOptions_, this);
  this.dh_.getElement('clearbutton').onclick = goog.bind(this.clear, this);
  this.dh_.getElement('exitbutton').onclick = goog.bind(this.exit_, this);

  this.writeSavedMessages();
};

/**
 * Show the options menu.
 * @return {boolean} false.
 * @private
 */
FancyWindow.prototype.openOptions_ = function() {
  const el = asserts.assert(this.dh_.getElement('optionsarea'));
  safevaluesDom.setElementInnerHtml(el, safevalues.EMPTY_HTML);

  const loggers = FancyWindow.getLoggers_();
  const dh = this.dh_;
  for (let i = 0; i < loggers.length; i++) {
    const logger = loggers[i];
    const curlevel =
        log.getLevel(logger) ? log.getLevel(logger).name : 'INHERIT';
    const div = dh.createDom(
        TagName.DIV, {}, this.getDropDown_('sel' + logger.getName(), curlevel),
        dh.createDom(TagName.SPAN, {}, logger.getName() || '(root)'));
    el.appendChild(div);
  }

  this.dh_.getElement('options').style.display = 'block';
  return false;
};

/**
 * Make a drop down for the log levels.
 * @param {string} id Logger id.
 * @param {string} selected What log level is currently selected.
 * @return {!Element} The newly created 'select' DOM element.
 * @private
 */
FancyWindow.prototype.getDropDown_ = function(id, selected) {
  const dh = this.dh_;
  const sel = dh.createDom(TagName.SELECT, {'id': id});
  const levels = log.Level.PREDEFINED_LEVELS;
  for (let i = 0; i < levels.length; i++) {
    const level = levels[i];
    const option = dh.createDom(TagName.OPTION, {}, level.name);
    if (selected == level.name) {
      option.selected = true;
    }
    sel.appendChild(option);
  }
  sel.appendChild(dh.createDom(
      TagName.OPTION, {'selected': selected == 'INHERIT'}, 'INHERIT'));
  return sel;
};

/**
 * Close the options menu.
 * @return {boolean} The value false.
 * @private
 */
FancyWindow.prototype.closeOptions_ = function() {
  this.dh_.getElement('options').style.display = 'none';
  const loggers = FancyWindow.getLoggers_();
  const dh = this.dh_;
  for (let i = 0; i < loggers.length; i++) {
    const logger = loggers[i];
    const sel = /** @type {?HTMLSelectElement} */ (
        dh.getElement('sel' + logger.getName()));
    if (!sel) {
      // Skip loggers added after the options opened with no matching element.
      continue;
    }
    const level = sel.options[sel.selectedIndex].text;
    if (level == 'INHERIT') {
      log.setLevel(logger, null);
    } else {
      log.setLevel(logger, log.Level.getPredefinedLevel(level));
    }
  }
  this.writeOptionsToLocalStorage_();
  return false;
};

/**
 * Resizes the log elements
 * @private
 */
FancyWindow.prototype.resizeStuff_ = function() {
  const dh = this.dh_;
  const logel = /** @type {!HTMLElement} */ (dh.getElement('log'));
  const headel = /** @type {!HTMLElement} */ (dh.getElement('head'));
  logel.style.top = headel.offsetHeight + 'px';
  logel.style.height =
      (dh.getDocument().body.offsetHeight - headel.offsetHeight) + 'px';
};

/**
 * Handles the user clicking the exit button, disabled the debug window and
 * closes the popup.
 * @param {Event} e Event object.
 * @private
 */
FancyWindow.prototype.exit_ = function(e) {
  this.setEnabled(false);
  if (this.win) {
    this.win.close();
  }
};

/** @override */
FancyWindow.prototype.getStyleRules = function() {
  const baseRules = FancyWindow.base(this, 'getStyleRules');
  const extraRules = safevalues.safeStyleSheet`
      html,body{height:100%;width:100%;margin:0px;padding:0px;background-color:#FFF;overflow:hidden}
      *{}
      .logmsg{border-bottom:1px solid #CCC;padding:2px;font:90% monospace}
      #head{position:absolute;width:100%;font:x-small arial;border-bottom:2px solid #999;background-color:#EEE;}
      #head p{margin:0px 5px;}
      #log{position:absolute;width:100%;background-color:#FFF;}
      #options{position:absolute;right:0px;width:50%;height:100%;border-left:1px solid #999;background-color:#DDD;display:none;padding-left: 5px;font:normal small arial;overflow:auto;}
      #openbutton,#closebutton{text-decoration:underline;color:#00F;cursor:pointer;position:absolute;top:0px;right:5px;font:x-small arial;}
      #clearbutton{text-decoration:underline;color:#00F;cursor:pointer;position:absolute;top:0px;right:80px;font:x-small arial;}
      #exitbutton{text-decoration:underline;color:#00F;cursor:pointer;position:absolute;top:0px;right:50px;font:x-small arial;}
      select{font:x-small arial;margin-right:10px;}
      hr{border:0;height:5px;background-color:#8c8;color:#8c8;}`;
  return safevalues.concatStyleSheets([baseRules, extraRules]);
};

/**
 * Return the default HTML for the debug window
 * @return {!safevalues.SafeHtml} Html.
 * @private
 */
FancyWindow.prototype.getHtml_ = function() {
  const head = safevalues.createHtml('head', {}, safevalues.concatHtmls([
    safevalues.createHtml('title', {}, 'Logging: ' + this.identifier),
    safevalues.styleSheetToHtml(this.getStyleRules())
  ]));

  const body = safevalues.createHtml('body', {}, safevalues.concatHtmls([
    safevalues.createHtml('div', {'id': 'log', 'style': 'overflow:auto'}),
    safevalues.createHtml('div', {'id': 'head'}, safevalues.concatHtmls([
      safevalues.createHtml(
          'p', {},
          safevalues.createHtml('b', {}, 'Logging: ' + this.identifier)),
      safevalues.createHtml('p', {}, this.welcomeMessage),
      safevalues.createHtml('span', {'id': 'clearbutton'}, 'clear'),
      safevalues.createHtml('span', {'id': 'exitbutton'}, 'exit'),
      safevalues.createHtml('span', {'id': 'openbutton'}, 'options')
    ])),
    safevalues.createHtml('div', {'id': 'options'}, safevalues.concatHtmls([
      safevalues.createHtml(
          'big', {}, safevalues.createHtml('b', {}, 'Options:')),
      safevalues.createHtml('div', {'id': 'optionsarea'}),
      safevalues.createHtml('span', {'id': 'closebutton'}, 'save and close')
    ]))
  ]));

  return safevalues.createHtml(
      'html', {}, safevalues.concatHtmls([head, body]));
};

/**
 * Write logger levels to localStorage if possible.
 * @private
 */
FancyWindow.prototype.writeOptionsToLocalStorage_ = function() {
  if (!FancyWindow.HAS_LOCAL_STORE) {
    return;
  }
  const loggers = FancyWindow.getLoggers_();
  const storedKeys = FancyWindow.getStoredKeys_();
  for (let i = 0; i < loggers.length; i++) {
    const key = FancyWindow.LOCAL_STORE_PREFIX + loggers[i].getName();
    const level = log.getLevel(loggers[i]);
    if (key in storedKeys) {
      if (!level) {
        window.localStorage.removeItem(key);
      } else if (window.localStorage.getItem(key) != level.name) {
        window.localStorage.setItem(key, level.name);
      }
    } else if (level) {
      window.localStorage.setItem(key, level.name);
    }
  }
};

/**
 * Sync logger levels with any values stored in localStorage.
 * @private
 */
FancyWindow.prototype.readOptionsFromLocalStorage_ = function() {
  if (!FancyWindow.HAS_LOCAL_STORE) {
    return;
  }
  const storedKeys = FancyWindow.getStoredKeys_();
  for (const key in storedKeys) {
    const loggerName = key.replace(FancyWindow.LOCAL_STORE_PREFIX, '');
    const logger = log.getLogger(loggerName);
    const curLevel = log.getLevel(logger);
    const storedLevel = window.localStorage.getItem(key).toString();
    if (!curLevel || curLevel.toString() != storedLevel) {
      log.setLevel(logger, log.Level.getPredefinedLevel(storedLevel));
    }
  }
};

/**
 * Helper function to create a list of locally stored keys. Used to avoid
 * expensive localStorage.getItem() calls.
 * @return {!Object} List of keys.
 * @private
 */
FancyWindow.getStoredKeys_ = function() {
  const storedKeys = {};
  const len = window.localStorage.length;
  for (let i = 0; i < len; i++) {
    const key = window.localStorage.key(i);
    if (key != null &&
        googString.startsWith(key, FancyWindow.LOCAL_STORE_PREFIX)) {
      storedKeys[key] = true;
    }
  }
  return storedKeys;
};

/**
 * Gets a sorted array of all the loggers registered.
 * @return {!Array<!log.Logger>} Array of logger instances.
 * @private
 */
FancyWindow.getLoggers_ = function() {
  const loggers = log.getAllLoggers();

  /**
   * @param {!log.Logger} a
   * @param {!log.Logger} b
   * @return {number}
   */
  const loggerSort = (a, b) => {
    return googArray.defaultCompare(a.getName(), b.getName());
  };
  loggers.sort(loggerSort);
  return loggers;
};

exports = FancyWindow;
