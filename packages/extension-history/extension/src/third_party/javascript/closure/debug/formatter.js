/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Definition of various formatters for logging. Please minimize
 * dependencies this file has on other closure classes as any dependency it
 * takes won't be able to use the logging infrastructure.
 */

goog.provide('goog.debug.Formatter');
goog.provide('goog.debug.HtmlFormatter');
goog.provide('goog.debug.TextFormatter');
goog.provide('goog.debug.formatter');

goog.require('goog.debug');
goog.require('goog.debug.RelativeTimeProvider');
goog.require('goog.log');
goog.require('google3.third_party.javascript.safevalues.index');
goog.require('google3.third_party.javascript.safevalues.restricted.reviewed');


/**
 * Base class for Formatters. A Formatter is used to format a LogRecord into
 * something that can be displayed to the user.
 *
 * @param {string=} opt_prefix The prefix to place before text records.
 * @constructor
 */
goog.debug.formatter.Formatter = function(opt_prefix) {
  'use strict';
  this.prefix_ = opt_prefix || '';

  /**
   * A provider that returns the relative start time.
   * @type {goog.debug.RelativeTimeProvider}
   * @private
   */
  this.startTimeProvider_ =
      goog.debug.RelativeTimeProvider.getDefaultInstance();
};


/**
 * Whether to append newlines to the end of formatted log records.
 * @type {boolean}
 */
goog.debug.formatter.Formatter.prototype.appendNewline = true;


/**
 * Whether to show absolute time in the DebugWindow.
 * @type {boolean}
 */
goog.debug.formatter.Formatter.prototype.showAbsoluteTime = true;


/**
 * Whether to show relative time in the DebugWindow.
 * @type {boolean}
 */
goog.debug.formatter.Formatter.prototype.showRelativeTime = true;


/**
 * Whether to show the logger name in the DebugWindow.
 * @type {boolean}
 */
goog.debug.formatter.Formatter.prototype.showLoggerName = true;


/**
 * Whether to show the logger exception text.
 * @type {boolean}
 */
goog.debug.formatter.Formatter.prototype.showExceptionText = false;


/**
 * Whether to show the severity level.
 * @type {boolean}
 */
goog.debug.formatter.Formatter.prototype.showSeverityLevel = false;


/**
 * Formats a record.
 * @param {?goog.log.LogRecord} logRecord the logRecord to format.
 * @return {string} The formatted string.
 */
goog.debug.formatter.Formatter.prototype.formatRecord = goog.abstractMethod;


/**
 * Formats a record as SafeHtml.
 * @param {?goog.log.LogRecord} logRecord the logRecord to format.
 * @return {!google3.third_party.javascript.safevalues.index.SafeHtml} The
 *     formatted string as SafeHtml.
 */
goog.debug.formatter.Formatter.prototype.formatRecordAsHtml =
    goog.abstractMethod;


/**
 * Sets the start time provider. By default, this is the default instance
 * but can be changed.
 * @param {goog.debug.RelativeTimeProvider} provider The provider to use.
 */
goog.debug.formatter.Formatter.prototype.setStartTimeProvider = function(
    provider) {
  'use strict';
  this.startTimeProvider_ = provider;
};


/**
 * Returns the start time provider. By default, this is the default instance
 * but can be changed.
 * @return {goog.debug.RelativeTimeProvider} The start time provider.
 */
goog.debug.formatter.Formatter.prototype.getStartTimeProvider = function() {
  'use strict';
  return this.startTimeProvider_;
};


/**
 * Resets the start relative time.
 */
goog.debug.formatter.Formatter.prototype.resetRelativeTimeStart = function() {
  'use strict';
  this.startTimeProvider_.reset();
};


/**
 * Returns a string for the time/date of the LogRecord.
 * @param {?goog.log.LogRecord} logRecord The record to get a time stamp for.
 * @return {string} A string representation of the time/date of the LogRecord.
 * @private
 */
goog.debug.formatter.Formatter.getDateTimeStamp_ = function(logRecord) {
  'use strict';
  const time = new Date(logRecord.getMillis());
  return goog.debug.formatter.Formatter.getTwoDigitString_(
             (time.getFullYear() - 2000)) +
      goog.debug.formatter.Formatter.getTwoDigitString_((time.getMonth() + 1)) +
      goog.debug.formatter.Formatter.getTwoDigitString_(time.getDate()) + ' ' +
      goog.debug.formatter.Formatter.getTwoDigitString_(time.getHours()) + ':' +
      goog.debug.formatter.Formatter.getTwoDigitString_(time.getMinutes()) +
      ':' +
      goog.debug.formatter.Formatter.getTwoDigitString_(time.getSeconds()) +
      '.' +
      goog.debug.formatter.Formatter.getTwoDigitString_(
          Math.floor(time.getMilliseconds() / 10));
};


/**
 * Returns the number as a two-digit string, meaning it prepends a 0 if the
 * number if less than 10.
 * @param {number} n The number to format.
 * @return {string} A two-digit string representation of `n`.
 * @private
 */
goog.debug.formatter.Formatter.getTwoDigitString_ = function(n) {
  'use strict';
  if (n < 10) {
    return '0' + n;
  }
  return String(n);
};


/**
 * Returns a string for the number of seconds relative to the start time.
 * Prepads with spaces so that anything less than 1000 seconds takes up the
 * same number of characters for better formatting.
 * @param {?goog.log.LogRecord} logRecord The log to compare time to.
 * @param {number} relativeTimeStart The start time to compare to.
 * @return {string} The number of seconds of the LogRecord relative to the
 *     start time.
 * @private
 */
goog.debug.formatter.Formatter.getRelativeTime_ = function(
    logRecord, relativeTimeStart) {
  'use strict';
  const ms = logRecord.getMillis() - relativeTimeStart;
  let sec = ms / 1000;
  let str = sec.toFixed(3);

  let spacesToPrepend = 0;
  if (sec < 1) {
    spacesToPrepend = 2;
  } else {
    while (sec < 100) {
      spacesToPrepend++;
      sec *= 10;
    }
  }
  while (spacesToPrepend-- > 0) {
    str = ' ' + str;
  }
  return str;
};



/**
 * Formatter that returns formatted html. See formatRecord for the classes
 * it uses for various types of formatted output.
 *
 * @param {string=} opt_prefix The prefix to place before text records.
 * @constructor
 * @extends {goog.debug.formatter.Formatter}
 */
goog.debug.formatter.HtmlFormatter = function(opt_prefix) {
  'use strict';
  goog.debug.formatter.Formatter.call(this, opt_prefix);
};
goog.inherits(
    goog.debug.formatter.HtmlFormatter, goog.debug.formatter.Formatter);


/**
 * Exposes an exception that has been caught by a try...catch and outputs the
 * error as HTML with a stack trace.
 *
 * @param {*} err Error object or string.
 * @param {?Function=} fn If provided, when collecting the stack trace all
 *     frames above the topmost call to this function, including that call,
 *     will be left out of the stack trace.
 * @return {string} Details of exception, as HTML.
 */
goog.debug.formatter.HtmlFormatter.exposeException = function(err, fn) {
  'use strict';
  const html =
      goog.debug.formatter.HtmlFormatter.exposeExceptionAsHtml(err, fn);
  return goog.module.get('google3.third_party.javascript.safevalues.index')
      .unwrapHtml(html)
      .toString();
};


/**
 * Exposes an exception that has been caught by a try...catch and outputs the
 * error with a stack trace.
 *
 * @param {*} err Error object or string.
 * @param {?Function=} fn If provided, when collecting the stack trace all
 *     frames above the topmost call to this function, including that call,
 *     will be left out of the stack trace.
 * @return {!google3.third_party.javascript.safevalues.index.SafeHtml} Details
 *     of exception.
 */
goog.debug.formatter.HtmlFormatter.exposeExceptionAsHtml = function(err, fn) {
  'use strict';
  try {
    const e = goog.debug.normalizeErrorObject(err);
    // Create the error message
    const viewSourceUrl =
        goog.debug.formatter.HtmlFormatter.createViewSourceUrl_(e.fileName);
    const error =
        goog.module.get('google3.third_party.javascript.safevalues.index')
            .concatHtmls([
              goog.module.get('google3.third_party.javascript.safevalues.index')
                  .htmlEscape(
                      'Message: ' + e.message + '\nUrl: ',
                      {preserveNewlines: true, preserveSpaces: true}),
              goog.module.get('google3.third_party.javascript.safevalues.index')
                  .createHtml(
                      'a', {'href': viewSourceUrl, 'target': '_new'},
                      e.fileName),
              goog.module.get('google3.third_party.javascript.safevalues.index')
                  .htmlEscape(
                      '\nLine: ' + e.lineNumber + '\n\nBrowser stack:\n' +
                          e.stack + '-> ' +
                          '[end]\n\nJS stack traversal:\n' +
                          goog.debug.getStacktrace(fn) + '-> ',
                      {preserveNewlines: true, preserveSpaces: true})
            ]);
    return error;
  } catch (e2) {
    return goog.module.get('google3.third_party.javascript.safevalues.index')
        .htmlEscape(
            'Exception trying to expose exception! You win, we lose. ' + e2,
            {preserveNewlines: true, preserveSpaces: true});
  }
};


/**
 * @param {?string=} fileName
 * @return {!google3.third_party.javascript.safevalues.index.SafeUrl} SafeUrl
 *     with view-source scheme, pointing at fileName.
 * @private
 */
goog.debug.formatter.HtmlFormatter.createViewSourceUrl_ = function(fileName) {
  'use strict';
  if (fileName == null) {
    fileName = '';
  }
  if (!/^https?:\/\//i.test(fileName)) {
    return goog.module.get('google3.third_party.javascript.safevalues.index')
        .sanitizeUrl('sanitizedviewsrc');
  }
  const sanitizedFileName =
      goog.module.get('google3.third_party.javascript.safevalues.index')
          .sanitizeUrl(fileName);
  return goog.module
      .get('google3.third_party.javascript.safevalues.restricted.reviewed')
      .urlSafeByReview(
          'view-source:' +
              goog.module.get('google3.third_party.javascript.safevalues.index')
                  .unwrapUrl(sanitizedFileName),
          {justification: 'view-source scheme plus HTTP/HTTPS URL'});
};



/**
 * Whether to show the logger exception text
 * @type {boolean}
 * @override
 */
goog.debug.formatter.HtmlFormatter.prototype.showExceptionText = true;


/**
 * Formats a record
 * @param {?goog.log.LogRecord} logRecord the logRecord to format.
 * @return {string} The formatted string as html.
 * @override
 */
goog.debug.formatter.HtmlFormatter.prototype.formatRecord = function(
    logRecord) {
  'use strict';
  if (!logRecord) {
    return '';
  }
  // OK not to use goog.html.SafeHtml.unwrap() here.
  return this.formatRecordAsHtml(logRecord).toString();
};


/**
 * Formats a record.
 * @param {?goog.log.LogRecord} logRecord the logRecord to format.
 * @return {!google3.third_party.javascript.safevalues.index.SafeHtml} The
 *     formatted string as SafeHtml.
 * @override
 */
goog.debug.formatter.HtmlFormatter.prototype.formatRecordAsHtml = function(
    logRecord) {
  'use strict';
  if (!logRecord) {
    return goog.module.get('google3.third_party.javascript.safevalues.index')
        .EMPTY_HTML;
  }

  let className;
  switch (logRecord.getLevel().value) {
    case goog.log.Level.SHOUT.value:
      className = 'dbg-sh';
      break;
    case goog.log.Level.SEVERE.value:
      className = 'dbg-sev';
      break;
    case goog.log.Level.WARNING.value:
      className = 'dbg-w';
      break;
    case goog.log.Level.INFO.value:
      className = 'dbg-i';
      break;
    case goog.log.Level.FINE.value:
    default:
      className = 'dbg-f';
      break;
  }

  // HTML for user defined prefix, time, logger name, and severity.
  const sb = [];
  sb.push(this.prefix_, ' ');
  if (this.showAbsoluteTime) {
    sb.push(
        '[', goog.debug.formatter.Formatter.getDateTimeStamp_(logRecord), '] ');
  }
  if (this.showRelativeTime) {
    sb.push(
        '[',
        goog.debug.formatter.Formatter.getRelativeTime_(
            logRecord, this.startTimeProvider_.get()),
        's] ');
  }
  if (this.showLoggerName) {
    sb.push('[', logRecord.getLoggerName(), '] ');
  }
  if (this.showSeverityLevel) {
    sb.push('[', logRecord.getLevel().name, '] ');
  }
  const fullPrefixHtml =
      goog.module.get('google3.third_party.javascript.safevalues.index')
          .htmlEscape(
              sb.join(''), {preserveNewlines: true, preserveSpaces: true});

  // HTML for exception text and log record.
  let exceptionHtml =
      goog.module.get('google3.third_party.javascript.safevalues.index')
          .EMPTY_HTML;
  if (this.showExceptionText && logRecord.getException()) {
    exceptionHtml =
        goog.module.get('google3.third_party.javascript.safevalues.index')
            .concatHtmls([
              goog.module.get('google3.third_party.javascript.safevalues.index')
                  .createHtml('br'),
              goog.debug.formatter.HtmlFormatter.exposeExceptionAsHtml(
                  logRecord.getException())
            ]);
  }
  const logRecordHtml =
      goog.module.get('google3.third_party.javascript.safevalues.index')
          .htmlEscape(
              logRecord.getMessage(),
              {preserveNewlines: true, preserveSpaces: true});
  const recordAndExceptionHtml =
      goog.module.get('google3.third_party.javascript.safevalues.index')
          .createHtml(
              'span', {'class': className},
              goog.module.get('google3.third_party.javascript.safevalues.index')
                  .concatHtmls([logRecordHtml, exceptionHtml]));


  // Combine both pieces of HTML and, if needed, append a final newline.
  let html;
  if (this.appendNewline) {
    html =
        goog.module.get('google3.third_party.javascript.safevalues.index')
            .concatHtmls([
              fullPrefixHtml, recordAndExceptionHtml,
              goog.module.get('google3.third_party.javascript.safevalues.index')
                  .createHtml('br')
            ]);
  } else {
    html = goog.module.get('google3.third_party.javascript.safevalues.index')
               .concatHtmls([fullPrefixHtml, recordAndExceptionHtml]);
  }
  return html;
};



/**
 * Formatter that returns formatted plain text
 *
 * @param {string=} opt_prefix The prefix to place before text records.
 * @constructor
 * @extends {goog.debug.formatter.Formatter}
 * @final
 */
goog.debug.formatter.TextFormatter = function(opt_prefix) {
  'use strict';
  goog.debug.formatter.Formatter.call(this, opt_prefix);
};
goog.inherits(
    goog.debug.formatter.TextFormatter, goog.debug.formatter.Formatter);


/**
 * Formats a record as text
 * @param {?goog.log.LogRecord} logRecord the logRecord to format.
 * @return {string} The formatted string.
 * @override
 */
goog.debug.formatter.TextFormatter.prototype.formatRecord = function(
    logRecord) {
  'use strict';
  const sb = [];
  sb.push(this.prefix_, ' ');
  if (this.showAbsoluteTime) {
    sb.push(
        '[', goog.debug.formatter.Formatter.getDateTimeStamp_(logRecord), '] ');
  }
  if (this.showRelativeTime) {
    sb.push(
        '[',
        goog.debug.formatter.Formatter.getRelativeTime_(
            logRecord, this.startTimeProvider_.get()),
        's] ');
  }

  if (this.showLoggerName) {
    sb.push('[', logRecord.getLoggerName(), '] ');
  }
  if (this.showSeverityLevel) {
    sb.push('[', logRecord.getLevel().name, '] ');
  }
  sb.push(logRecord.getMessage());
  if (this.showExceptionText) {
    const exception = logRecord.getException();
    if (exception !== undefined) {
      const exceptionText =
          exception instanceof Error ? exception.message : String(exception);
      sb.push('\n', exceptionText);
    }
  }
  if (this.appendNewline) {
    sb.push('\n');
  }
  return sb.join('');
};


/**
 * Formats a record as text
 * @param {?goog.log.LogRecord} logRecord the logRecord to format.
 * @return {!google3.third_party.javascript.safevalues.index.SafeHtml} The
 *     formatted string as SafeHtml. This is just an HTML-escaped version of the
 *     text obtained from formatRecord().
 * @override
 */
goog.debug.formatter.TextFormatter.prototype.formatRecordAsHtml = function(
    logRecord) {
  'use strict';
  return goog.module.get('google3.third_party.javascript.safevalues.index')
      .htmlEscape(
          goog.debug.formatter.TextFormatter.prototype.formatRecord(logRecord),
          {preserveNewlines: true, preserveSpaces: true});
};

// Aliases for the above formatters.
// TODO(kelvinjin): Delete these aliases when there are no more usages.

/**
 * @constructor
 */
goog.debug.Formatter = goog.debug.formatter.Formatter;

/**
 * @constructor
 */
goog.debug.TextFormatter = goog.debug.formatter.TextFormatter;

/**
 * @constructor
 */
goog.debug.HtmlFormatter = goog.debug.formatter.HtmlFormatter;
