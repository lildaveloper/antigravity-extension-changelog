/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Definition of the DebugWindow class. Please minimize
 * dependencies this file has on other closure classes as any dependency it
 * takes won't be able to use the logging infrastructure.
 */

goog.module('goog.debug.DebugWindow');
goog.module.declareLegacyNamespace();

const CircularBuffer = goog.require('goog.structs.CircularBuffer');
const Formatter = goog.requireType('goog.debug.Formatter');
const HtmlFormatter = goog.require('goog.debug.HtmlFormatter');
const index = goog.require('google3.third_party.javascript.safevalues.dom.index');
const log = goog.require('goog.log');
const safevaluesIndex = goog.require('google3.third_party.javascript.safevalues.index');

/**
 * Provides a debug DebugWindow that is bound to the log.Logger.
 * It handles log messages and writes them to the DebugWindow. This doesn't
 * provide a lot of functionality that the old Gmail logging infrastructure
 * provided like saving debug logs for exporting to the server. Now that we
 * have an event-based logging infrastructure, we can encapsulate that
 * functionality in a separate class.
 *
 * @constructor
 * @param {string=} opt_identifier Identifier for this logging class.
 * @param {string=} opt_prefix Prefix prepended to messages.
 */
function DebugWindow(opt_identifier, opt_prefix) {
  /**
   * Identifier for this logging class
   * @protected {string}
   */
  this.identifier = opt_identifier || '';

  /**
   * Array used to buffer log output
   * @protected {!Array<!safevaluesIndex.SafeHtml>}
   */
  this.outputBuffer = [];

  /**
   * Optional prefix to be prepended to error strings
   * @private {string}
   */
  this.prefix_ = opt_prefix || '';

  /**
   * Buffer for saving the last 1000 messages
   * @private {!CircularBuffer}
   */
  this.savedMessages_ = new CircularBuffer(DebugWindow.MAX_SAVED);

  /**
   * Save the publish handler so it can be removed
   * @private {!Function}
   */
  this.publishHandler_ = goog.bind(this.addLogRecord, this);

  /**
   * Formatter for formatted output
   * @private {Formatter}
   */
  this.formatter_ = new HtmlFormatter(this.prefix_);

  /**
   * Loggers that we shouldn't output
   * @private {!Object}
   */
  this.filteredLoggers_ = {};

  // enable by default
  this.setCapturing(true);

  /**
   * Whether we are currently enabled. When the DebugWindow is enabled, it tries
   * to keep its window open. When it's disabled, it can still be capturing log
   * output if, but it won't try to write them to the DebugWindow window until
   * it's enabled.
   * @private {boolean}
   */
  this.enabled_ = DebugWindow.isEnabled(this.identifier);

  // timer to save the DebugWindow's window position in a cookie
  goog.global.setInterval(goog.bind(this.saveWindowPositionSize_, this), 7500);
}

/**
 * Max number of messages to be saved
 * @type {number}
 */
DebugWindow.MAX_SAVED = 500;

/**
 * How long to keep the cookies for in milliseconds
 * @type {number}
 */
DebugWindow.COOKIE_TIME = 30 * 24 * 60 * 60 * 1000;  // 30-days

/**
 * HTML string printed when the debug window opens
 * @type {string}
 * @protected
 */
DebugWindow.prototype.welcomeMessage = 'LOGGING';

/**
 * Whether to force enable the window on a severe log.
 * @type {boolean}
 * @private
 */
DebugWindow.prototype.enableOnSevere_ = false;

/**
 * Reference to debug window
 * @type {?Window}
 * @protected
 */
DebugWindow.prototype.win = null;

/**
 * In the process of opening the window
 * @type {boolean}
 * @private
 */
DebugWindow.prototype.winOpening_ = false;

/**
 * Whether we are currently capturing logger output.
 *
 * @type {boolean}
 * @private
 */
DebugWindow.prototype.isCapturing_ = false;

/**
 * Whether we already showed an alert that the DebugWindow was blocked.
 * @type {boolean}
 * @private
 */
DebugWindow.showedBlockedAlert_ = false;

/**
 * Reference to timeout used to buffer the output stream.
 * @type {?number}
 * @private
 */
DebugWindow.prototype.bufferTimeout_ = null;

/**
 * Timestamp for the last time the log was written to.
 * @protected {number}
 */
DebugWindow.prototype.lastCall = goog.now();

/**
 * Sets the welcome message shown when the window is first opened or reset.
 *
 * @param {string} msg An HTML string.
 */
DebugWindow.prototype.setWelcomeMessage = function(msg) {
  this.welcomeMessage = msg;
};

/**
 * Initializes the debug window.
 */
DebugWindow.prototype.init = function() {
  if (this.enabled_) {
    this.openWindow_();
  }
};

/**
 * Whether the DebugWindow is enabled. When the DebugWindow is enabled, it
 * tries to keep its window open and logs all messages to the window.  When the
 * DebugWindow is disabled, it stops logging messages to its window.
 *
 * @return {boolean} Whether the DebugWindow is enabled.
 */
DebugWindow.prototype.isEnabled = function() {
  return this.enabled_;
};

/**
 * Sets whether the DebugWindow is enabled. When the DebugWindow is enabled, it
 * tries to keep its window open and log all messages to the window. When the
 * DebugWindow is disabled, it stops logging messages to its window. The
 * DebugWindow also saves this state to a cookie so that it's persisted across
 * application refreshes.
 * @param {boolean} enable Whether the DebugWindow is enabled.
 */
DebugWindow.prototype.setEnabled = function(enable) {
  this.enabled_ = enable;

  if (this.enabled_) {
    this.openWindow_();
  }

  this.setCookie_('enabled', enable ? '1' : '0');
};

/**
 * Sets whether the debug window should be force enabled when a severe log is
 * encountered.
 * @param {boolean} enableOnSevere Whether to enable on severe logs..
 */
DebugWindow.prototype.setForceEnableOnSevere = function(enableOnSevere) {
  this.enableOnSevere_ = enableOnSevere;
};

/**
 * Whether we are currently capturing logger output.
 * @return {boolean} whether we are currently capturing logger output.
 */
DebugWindow.prototype.isCapturing = function() {
  return this.isCapturing_;
};

/**
 * Sets whether we are currently capturing logger output.
 * @param {boolean} capturing Whether to capture logger output.
 */
DebugWindow.prototype.setCapturing = function(capturing) {
  if (capturing == this.isCapturing_) {
    return;
  }
  this.isCapturing_ = capturing;

  // attach or detach handler from the root logger
  const rootLogger = log.getRootLogger();
  if (capturing) {
    log.addHandler(rootLogger, this.publishHandler_);
  } else {
    log.removeHandler(rootLogger, this.publishHandler_);
  }
};

/**
 * Gets the formatter for outputting to the debug window. The default formatter
 * is an instance of HtmlFormatter
 * @return {Formatter} The formatter in use.
 */
DebugWindow.prototype.getFormatter = function() {
  return this.formatter_;
};

/**
 * Sets the formatter for outputting to the debug window.
 * @param {Formatter} formatter The formatter to use.
 */
DebugWindow.prototype.setFormatter = function(formatter) {
  this.formatter_ = formatter;
};

/**
 * Adds a separator to the debug window.
 */
DebugWindow.prototype.addSeparator = function() {
  this.write_(goog.module.get('google3.third_party.javascript.safevalues.index')
                  .createHtml('hr'));
};

/**
 * @return {boolean} Whether there is an active window.
 */
DebugWindow.prototype.hasActiveWindow = function() {
  return !!this.win && !this.win.closed;
};

/**
 * Clears the contents of the debug window
 * @protected
 */
DebugWindow.prototype.clear = function() {
  this.savedMessages_.clear();
  if (this.hasActiveWindow()) {
    this.writeInitialDocument();
  }
};

/**
 * Adds a log record.
 * @param {?log.LogRecord} logRecord the LogRecord.
 */
DebugWindow.prototype.addLogRecord = function(logRecord) {
  if (this.filteredLoggers_[logRecord.getLoggerName()]) {
    return;
  }
  const html = this.formatter_.formatRecordAsHtml(logRecord);
  this.write_(html);
  if (this.enableOnSevere_ &&
      logRecord.getLevel().value >= log.Level.SEVERE.value) {
    this.setEnabled(true);
  }
};

/**
 * Writes a message to the log, possibly opening up the window if it's enabled,
 * or saving it if it's disabled.
 * @param {!safevaluesIndex.SafeHtml} html The
 *     HTML to write.
 * @private
 */
DebugWindow.prototype.write_ = function(html) {
  // If the logger is enabled, open window and write html message to log
  // otherwise save it
  if (this.enabled_) {
    this.openWindow_();
    this.savedMessages_.add(html);
    this.writeToLog_(html);
  } else {
    this.savedMessages_.add(html);
  }
};

/**
 * Write to the buffer.  If a message hasn't been sent for more than 750ms just
 * write, otherwise delay for a minimum of 250ms.
 * @param {!safevaluesIndex.SafeHtml} html HTML
 *     to post to the log.
 * @private
 */
DebugWindow.prototype.writeToLog_ = function(html) {
  this.outputBuffer.push(html);
  goog.global.clearTimeout(this.bufferTimeout_);

  if (goog.now() - this.lastCall > 750) {
    this.writeBufferToLog();
  } else {
    this.bufferTimeout_ =
        goog.global.setTimeout(goog.bind(this.writeBufferToLog, this), 250);
  }
};

/**
 * Write to the log and maybe scroll into view.
 * @protected
 */
DebugWindow.prototype.writeBufferToLog = function() {
  this.lastCall = goog.now();
  if (this.hasActiveWindow()) {
    const body = this.win.document.body;
    const scroll =
        body && body.scrollHeight - (body.scrollTop + body.clientHeight) <= 100;

    goog.module.get('google3.third_party.javascript.safevalues.dom.index')
        .documentWrite(
            this.win.document,
            goog.module.get('google3.third_party.javascript.safevalues.index')
                .concatHtmls(this.outputBuffer));
    this.outputBuffer.length = 0;

    if (scroll) {
      this.win.scrollTo(0, 1000000);
    }
  }
};

/**
 * Writes all saved messages to the DebugWindow.
 * @protected
 */
DebugWindow.prototype.writeSavedMessages = function() {
  const messages = this.savedMessages_.getValues();
  for (let i = 0; i < messages.length; i++) {
    this.writeToLog_(messages[i]);
  }
};

/**
 * Opens the debug window if it is not already referenced
 * @private
 */
DebugWindow.prototype.openWindow_ = function() {
  if (this.hasActiveWindow() || this.winOpening_) {
    return;
  }

  const winpos = this.getCookie_('dbg', '0,0,800,500').split(',');
  const x = Number(winpos[0]);
  const y = Number(winpos[1]);
  const w = Number(winpos[2]);
  const h = Number(winpos[3]);

  this.winOpening_ = true;
  this.win =
      goog.module.get('google3.third_party.javascript.safevalues.dom.index')
          .windowOpen(
              window, '', this.getWindowName_(),
              'width=' + w + ',height=' + h + ',toolbar=no,resizable=yes,' +
                  'scrollbars=yes,left=' + x + ',top=' + y +
                  ',status=no,screenx=' + x + ',screeny=' + y);

  if (!this.win) {
    if (!DebugWindow.showedBlockedAlert_) {
      // only show this once
      alert('Logger popup was blocked');
      DebugWindow.showedBlockedAlert_ = true;
    }
  }

  this.winOpening_ = false;

  if (this.win) {
    this.writeInitialDocument();
  }
};

/**
 * Gets a valid window name for the debug window. Replaces invalid characters in
 * IE.
 * @return {string} Valid window name.
 * @private
 */
DebugWindow.prototype.getWindowName_ = function() {
  return this.identifier;
};

/**
 * @return {!safevaluesIndex.SafeStyleSheet} The
 *     stylesheet, for inclusion in the initial HTML.
 */
DebugWindow.prototype.getStyleRules = function() {
  return goog.module.get('google3.third_party.javascript.safevalues.index')
      .safeStyleSheet`
      *{font:normal 14px monospace;}
      .dbg-sev{color:#F00}
      .dbg-w{color:#E92}
      .dbg-sh{background-color:#fd4;font-weight:bold;color:#000}
      .dbg-i{color:#666}
      .dbg-f{color:#999}
      .dbg-ev{color:#0A0}
      .dbg-m{color:#990}`;
};

/**
 * Writes the initial HTML of the debug window.
 * @protected
 */
DebugWindow.prototype.writeInitialDocument = function() {
  if (!this.hasActiveWindow()) {
    return;
  }

  this.win.document.open();

  const div =
      goog.module.get('google3.third_party.javascript.safevalues.index')
          .createHtml(
              'div', {'class': 'dbg-ev', 'style': 'text-align:center;'},
              goog.module.get('google3.third_party.javascript.safevalues.index')
                  .concatHtmls([
                    this.welcomeMessage,
                    goog.module
                        .get('google3.third_party.javascript.safevalues.index')
                        .createHtml('br'),
                    goog.module
                        .get('google3.third_party.javascript.safevalues.index')
                        .createHtml('small', {}, 'Logger: ' + this.identifier)
                  ]));
  const html =
      goog.module.get('google3.third_party.javascript.safevalues.index')
          .concatHtmls([
            goog.module.get('google3.third_party.javascript.safevalues.index')
                .styleSheetToHtml(this.getStyleRules()),
            goog.module.get('google3.third_party.javascript.safevalues.index')
                .createHtml('hr'),
            div,
            goog.module.get('google3.third_party.javascript.safevalues.index')
                .createHtml('hr')
          ]);

  this.writeToLog_(html);
  this.writeSavedMessages();
};

/**
 * Save persistent data (using cookies) for 1 month (cookie specific to this
 * logger object).
 * @param {string} key Data name.
 * @param {string} value Data value.
 * @private
 */
DebugWindow.prototype.setCookie_ = function(key, value) {
  const fullKey = DebugWindow.getCookieKey_(this.identifier, key);
  document.cookie = fullKey + '=' + encodeURIComponent(value) +
      ';path=/;expires=' +
      (new Date(goog.now() + DebugWindow.COOKIE_TIME)).toUTCString();
};

/**
 * Retrieve data (using cookies).
 * @param {string} key Data name.
 * @param {string=} opt_default Optional default value if cookie doesn't exist.
 * @return {string} Cookie value.
 * @private
 */
DebugWindow.prototype.getCookie_ = function(key, opt_default) {
  return DebugWindow.getCookieValue_(this.identifier, key, opt_default);
};

/**
 * Creates a valid cookie key name which is scoped to the given identifier.
 * Substitutes all occurrences of invalid cookie name characters (whitespace,
 * ';', and '=') with '_', which is a valid and readable alternative.
 * @see goog.net.Cookies#isValidName
 * @see <a href="http://tools.ietf.org/html/rfc2109">RFC 2109</a>
 * @param {string} identifier Identifier for logging class.
 * @param {string} key Data name.
 * @return {string} Cookie key name.
 * @private
 */
DebugWindow.getCookieKey_ = function(identifier, key) {
  const fullKey = key + identifier;
  return fullKey.replace(/[;=\s]/g, '_');
};

/**
 * Retrieve data (using cookies).
 * @param {string} identifier Identifier for logging class.
 * @param {string} key Data name.
 * @param {string=} opt_default Optional default value if cookie doesn't exist.
 * @return {string} Cookie value.
 * @private
 */
DebugWindow.getCookieValue_ = function(identifier, key, opt_default) {
  const fullKey = DebugWindow.getCookieKey_(identifier, key);
  const cookie = String(document.cookie);
  const start = cookie.indexOf(fullKey + '=');
  if (start != -1) {
    const end = cookie.indexOf(';', start);
    return decodeURIComponent(
        cookie.substring(
            start + fullKey.length + 1, end == -1 ? cookie.length : end));
  } else {
    return opt_default || '';
  }
};

/**
 * @param {string} identifier Identifier for logging class.
 * @return {boolean} Whether the DebugWindow is enabled.
 */
DebugWindow.isEnabled = function(identifier) {
  return DebugWindow.getCookieValue_(identifier, 'enabled') == '1';
};

/**
 * Saves the window position size to a cookie
 * @private
 */
DebugWindow.prototype.saveWindowPositionSize_ = function() {
  if (!this.hasActiveWindow()) {
    return;
  }
  const x = this.win.screenX || this.win.screenLeft || 0;
  const y = this.win.screenY || this.win.screenTop || 0;
  const w = this.win.outerWidth || 800;
  const h = this.win.outerHeight || 500;
  this.setCookie_('dbg', x + ',' + y + ',' + w + ',' + h);
};

/**
 * Adds a logger name to be filtered.
 * @param {string} loggerName the logger name to add.
 */
DebugWindow.prototype.addFilter = function(loggerName) {
  this.filteredLoggers_[loggerName] = 1;
};

/**
 * Removes a logger name to be filtered.
 * @param {string} loggerName the logger name to remove.
 */
DebugWindow.prototype.removeFilter = function(loggerName) {
  delete this.filteredLoggers_[loggerName];
};

/**
 * Modify the size of the circular buffer. Allows the log to retain more
 * information while the window is closed.
 * @param {number} size New size of the circular buffer.
 */
DebugWindow.prototype.resetBufferWithNewSize = function(size) {
  if (size > 0 && size < 50000) {
    this.clear();
    this.savedMessages_ = new CircularBuffer(size);
  }
};

exports = DebugWindow;
