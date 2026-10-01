goog.module('fava.debug.ErrorReporter');
goog.module.declareLegacyNamespace();

const Deferred = goog.require('goog.async.Deferred');
const Disposable = goog.require('goog.Disposable');
const ErrorReportSender = goog.require('fava.debug.ErrorReportSender');
const GoogPromise = goog.require('goog.Promise');
const browser = goog.require('goog.labs.userAgent.browser');
const debug = goog.require('goog.debug');
const googArray = goog.require('goog.array');
const log = goog.require('goog.log');
const {ErrorSeverity} = goog.require('google3.javascript.apps.fava.debug.error_severity');
const {isCanceledError: isPendingCanceledError} = goog.require('google3.javascript.apps.wiz.inject.pending.canceled_error');
const {scrubFileNameIfError, urlForReporting} = goog.require('google3.javascript.apps.fava.debug.urlutil');

/**
 * @define {boolean} When enabled, defaults various cancellation-style errors to
 * not send error reports. These Promise-like `.cancel()` behaviors are
 * typically part of nominal (async) app behavior.
 */
const IGNORE_CANCELLATION_ERRORS =
    goog.define('fava.debug.ErrorReporter.IGNORE_CANCELLATION_ERRORS', true);

/**
 * @define {boolean} When enabled, prevents values propagated from
 * goog.async.Deferred's .cancel() from sending error reports. This takes
 * precedence over the `IGNORE_CANCELLATION_ERRORS` setting.
 */
const IGNORE_GOOG_ASYNC_DEFERRED_CANCELLATION = goog.define(
    'fava.debug.ErrorReporter.IGNORE_GOOG_ASYNC_DEFERRED_CANCELLATION',
    IGNORE_CANCELLATION_ERRORS);

/**
 * @define {boolean} When enabled, prevents values propagated from
 * goog.Promise's .cancel() from sending error reports. This takes precedence
 * over the `IGNORE_CANCELLATION_ERRORS` setting.
 */
const IGNORE_GOOG_PROMISE_CANCELLATION = goog.define(
    'fava.debug.ErrorReporter.IGNORE_GOOG_PROMISE_CANCELLATION',
    IGNORE_CANCELLATION_ERRORS);

/**
 * @define {boolean} When enabled, prevents values propagated from
 * wiz pending cancellation from sending error reports. This takes precedence
 * over the `IGNORE_CANCELLATION_ERRORS` setting.
 */
const IGNORE_WIZ_PENDING_CANCELLATION = goog.define(
    'fava.debug.ErrorReporter.IGNORE_WIZ_PENDING_CANCELLATION',
    IGNORE_CANCELLATION_ERRORS);

/**
 * ErrorReporter_ class for the singleton.
 * @private @final
 */
fava.debug.ErrorReporter_ = class extends Disposable {
  constructor() {
    super();

    /**
     * Depth tracking for reentrant calls to this reporter. If too many calls
     * are detected, we assume we are caught in an infinite recursive loop and
     * abort trying to report the deepest error. This scenario can arise if
     * client context providers manually try to report an exception in the
     * `createContext` step of `fava.debug.JsReporter`.
     * @private {number}
     */
    this.recursiveDepth_ = 0;

    /**
     * This is where we track exceptions that occur before the ErrorReportSender
     * is initialized. This is cleared once the ErrorReportSender loads and
     * calls logSavedExceptions(), so we know we can just pass the exceptions
     * along to the ErrorReportSender immediately instead of saving them up.
     * @private {?Array<!SavedException>}
     */
    this.savedExceptions_ = null;

    /**
     * The ErrorReportSender to log exceptions.
     * @private {?ErrorReportSender}
     */
    this.sender_ = null;

    /**
     * Whether to not log error messages.
     * @private {boolean}
     */
    this.sanitizeErrors_ = false;

    /**
     * An error prefix that can be optionally prepended to sanitized error
     * messages.
     * @private {string}
     */
    this.errorPrefix_ = '';
  }

  /**
   * Initializes the ErrorReporter. It will start saving any exceptions that
   * occur until the ErrorReportSender is set.
   */
  init() {
    this.savedExceptions_ = [];
  }

  /**
   * Sets the ErrorReportSender to send exceptions to the server.
   * @param {!ErrorReportSender} sender The ErrorReportSender.
   */
  setErrorReportSender(sender) {
    if (this.sender_) {
      log.warning(this.logger_, 'ErrorReportSender already set.');
    }
    this.sender_ = sender;
    this.logSavedExceptions_();
  }

  /**
   * Whether to sanitize error messages.
   *
   * Used to ensure that error messages containing potentially sensitive
   * information are sanitized before being sent to backends.
   *
   * @param {boolean} sanitize Whether to sanitize error messages.
   * @param {string=} errorPrefix A prefix that can be optionally prepended to
   *   error messages. Can be used to set hints for downstream error processing
   *   systems such as eye3.
   */
  setSanitizeErrors(sanitize, errorPrefix = '') {
    this.sanitizeErrors_ = sanitize;
    this.errorPrefix_ = errorPrefix;
    if (this.sanitizeErrors_) {
      // Ensures that only the function name, file name and line number are
      // recorded (i.e. no arguments which could contain PII).
      // Runs on V8 only:
      // https://v8.dev/docs/stack-trace-api#compatibility
      goog.global.Error.prepareStackTrace = function(err, trace) {
        const stackSample = trace.slice(0, STACK_DEPTH);
        const sanitizedTrace = stackSample.map(callSite => {
          const functionName = callSite.getFunctionName();
          // In Chrome, stack traces including inline JS could contain the
          // document URL with fragment, and thus must be scrubbed:
          // https://screenshot.googleplex.com/BLzXLD3dC9S5tZE
          const fileName = urlForReporting(callSite.getFileName());
          const lineNumber = callSite.getLineNumber();
          return `${functionName}@${fileName}:${lineNumber}`;
        });
        let result = errorPrefix;
        result += 'Sanitized stack trace:\n' + sanitizedTrace.join('\n');
        if (trace.length > STACK_DEPTH) {
          const numOmitted = trace.length - STACK_DEPTH;
          result += `
...${numOmitted} more frames omitted.`;
        }
        return result;
      };
    }
  }

  /**
   * Reports an exception report to the server.
   * @param {?string} msg Message to log. This message will not be stripped so
   * care should be taken that it doesn't reveal anything important in the
   * javascript.
   * @param {?Error} e An exception to report.
   * @param {!ErrorSeverity} severity The severity of the error to report on the
   *     error context.
   * @suppress {strictMissingProperties} go/strict_warnings_migration
   */
  reportException(msg, e, severity) {
    if (this.sanitizeErrors_) {
      msg = this.errorPrefix_ + REDACTED_ERROR_MESSAGE;
      const newError = Error(REDACTED_ERROR_MESSAGE);
      newError.columnNumber = e.columnNumber;
      newError.lineNumber = e.lineNumber;
      newError.name = e.name;
      newError.fileName = e.fileName;
      // Preserve the stack on Chrome and Firefox since we sanitize the stack of
      // the former, and the latter documents that it won't put method
      // parameters in the stack trace.
      if ((browser.isAtLeast(browser.Brand.CHROMIUM, 28)) ||
          (browser.isAtLeast(browser.Brand.FIREFOX, 14))) {
        newError.stack = e.stack;
      }
      e = newError;
    }
    // If using the default JsReporter as this.sender, then the following scrub
    // is redundant. However, not all of google3 is using the default sender.
    scrubFileNameIfError(e);

    if (this.recursiveDepth_ >= 3) {
      throw new Error(
          'Recursive loop detected while trying to report exception. ' +
          'Message: ' + msg);
    }
    this.recursiveDepth_++;

    try {
      if (this.isDisposed()) {
        log.info(
            this.logger_,
            'reportException was called but ErrorReporter already disposed. ' +
                'Message: ' + msg,
            e);
        return;
      }

      // Log (Promise-like) cancellation errors but don't report them back to
      // the server: These errors are just a side-effect of non-native Promise
      // classes implementing .cancel() functionality.
      if (IGNORE_GOOG_ASYNC_DEFERRED_CANCELLATION &&
          e instanceof Deferred.CanceledError) {
        // Frequently a result of how Fava code retrieves services from the
        // AppContext.
        log.info(this.logger_, msg || 'goog.async.Deferred CanceledError', e);
        return;
      }
      if (IGNORE_GOOG_PROMISE_CANCELLATION &&
          e instanceof GoogPromise.CancellationError) {
        log.info(this.logger_, msg || 'goog.Promise CancellationError', e);
        return;
      }
      if (IGNORE_WIZ_PENDING_CANCELLATION &&
          isPendingCanceledError(e)) {
        log.info(this.logger_, msg || 'Wiz Pending CanceledError', e);
        return;
      }

      if (debug.LOGGING_ENABLED && this.logger_) {
        // Log error reports locally. 'dontReport' prevents duplicate reporting
        // from the log handler.
        const logRecord = log.getLogRecord(
            this.logger_, log.Level.SEVERE, msg || 'Exception', e);
        /** @type {*} */ (logRecord).dontReport = true;
        log.publishLogRecord(this.logger_, logRecord);
      }
      if (this.sender_) {
        this.sender_.sendExceptionReport(e, msg, severity);
      } else if (this.savedExceptions_) {
        // Save the message for when we got an ErrorReportSender to report them.
        if (this.savedExceptions_.length < 10) {
          this.savedExceptions_.push(new SavedException(msg, e, severity));
        }
      }
    } finally {
      this.recursiveDepth_--;
    }
  }

  /**
   * Reports an exception report to the server.
   * @param {?Error} e An exception to report.
   * @param {!ErrorSeverity} severity The severity of the error to report on the
   *     error context.
   */
  reportExceptionNoMsg(e, severity) {
    this.reportException(null, e, severity);
  }

  /**
   * For unit testing. JSCompiler inlines this.
   * @return {boolean} goog.DEBUG.
   */
  static getGoogDebug() {
    return goog.DEBUG;
  }

  /**
   * Called after ErrorReportSender is set, so we can report any exceptions
   * we've saved up.
   * @private
   */
  logSavedExceptions_() {
    if (this.savedExceptions_) {
      googArray.forEach(
          this.savedExceptions_,
          function(savedException) {
            this.sender_.sendExceptionReport(
                savedException.e, savedException.msg, savedException.severity);
          },
          this);
      this.savedExceptions_ = null;
    }
  }
};

/**
 * The default error message for errors containing potentially sensitive
 * messages.
 * @public {string}
 */
const REDACTED_ERROR_MESSAGE =
    'Potentially sensitive message stripped for security reasons.';

/**
 * The number of stack frames to preserve when catching and re-throwing a
 * stripped error message.
 * @type {number}
 */
const STACK_DEPTH = 15;

/** @private @const {?log.Logger} */
fava.debug.ErrorReporter_.prototype.logger_ =
    log.getLogger('fava.debug.ErrorReporter');

/**
 * Singleton ErrorReporter.
 * @type {!fava.debug.ErrorReporter_}
 */
const singleton = new fava.debug.ErrorReporter_();

/**
 * Initializes the ErrorReporter. It will start saving any exceptions that
 * occur until the ErrorReportSender is set.
 */
function init() {
  singleton.init();
}

/**
 * Sets the ErrorReportSender to send exceptions to the server.
 * @param {!ErrorReportSender} sender The ErrorReportSender.
 */
function setErrorReportSender(sender) {
  singleton.setErrorReportSender(sender);
}

/**
 * Whether to sanitize error messages.
 * Used to ensure that error messages containing potentially sensitive
 * information are sanitized before being sent to backends.
 * @param {boolean} sanitize Whether to sanitize error messages.
 * @param {string=} errorPrefix A prefix that can be optionally prepended to
 *   error messages. Can be used to set hints for downstream error processing
 *   systems such as eye3.
 */
function setSanitizeErrors(sanitize, errorPrefix) {
  singleton.setSanitizeErrors(sanitize, errorPrefix);
}

/**
 * Reports an exception report to the server.
 * @param {?string} msg Message to log. This message will not be stripped so
 * care should be taken that it doesn't reveal anything important in the
 * javascript.
 * @param {?Error} e An exception to report.
 * @param {!ErrorSeverity=} severity An optional severity level to report on the
 *     error context.
 */
function reportException(msg, e, severity = ErrorSeverity.UNKNOWN) {
  singleton.reportException(msg, e, severity);
}

/**
 * Reports an exception report to the server.
 * @param {?Error} e An exception to report.
 * @param {!ErrorSeverity=} severity An optional severity level to report on the
 *     error context.
 */
function reportExceptionNoMsg(e, severity = ErrorSeverity.UNKNOWN) {
  singleton.reportExceptionNoMsg(e, severity);
}

/**
 * Disposes of the Fava error reporter.
 */
function dispose() {
  singleton.dispose();
}

/**
 * @private
 */
const SavedException = class {
  /**
   * @param {?string} msg
   * @param {?Object} e
   * @param {!ErrorSeverity} severity
   */
  constructor(msg, e, severity) {
    /**
     * @const {?string}
     */
    this.msg = msg;

    /**
     * @const {?Object}
     */
    this.e = e;

    /**
     * @const {!ErrorSeverity}
     */
    this.severity = severity;
  }
};

exports = {
  REDACTED_ERROR_MESSAGE,
  STACK_DEPTH,
  dispose,
  init,
  reportException,
  reportExceptionNoMsg,
  setErrorReportSender,
  setSanitizeErrors,
};
