goog.module('fava.debug.JsReporter');

const ErrorReport = goog.require('fava.debug.ErrorReport');
const ErrorReportSender = goog.require('fava.debug.ErrorReportSender');
const ErrorReporter = goog.require('goog.debug.ErrorReporter');
const core = goog.require('fava.core');
const debug = goog.require('goog.debug');
const errorContext = goog.require('fava.debug.errorContext');
const googArray = goog.require('goog.array');
const log = goog.require('goog.log');
const {ErrorSeverity} = goog.require('google3.javascript.apps.fava.debug.error_severity');
const {scrubFileNameIfError} = goog.require('google3.javascript.apps.fava.debug.urlutil');

/** @typedef {!Object<string, string>} */
let Context;

/** @enum {string} */
const ContextKey = {
  CALL_STACK: 'call-stack',
  DROPPED_INSTANCES: 'dropped-instances',
  LOG_LEVEL: 'log-level',
  LOGGER_NAME: 'logger-name',
  MESSAGE: 'message',
  SEVERITY: 'severity',
  ERROR_REPORT_SESSION_TIMESTAMP: 'error-report-session-time-ms',
  ERROR_REPORT_TIMESTAMP: 'error-report-time-ms',
};

/**
 * JsReporter sends reports to the server for reported and unhandled errors,
 * and for severe logs in debugging/logging modes.
 * TODO: Refactor with Pinto JsReporter and Fava and Closure error reporters.
 * @implements {ErrorReportSender}
 * @final
 */
const JsReporter = class {
  /**
   * @param {?ErrorReporter} closureErrorReporter A Closure error
   *     reporter used to send reports to the server.
   * @param {{
   *   sendThrottleStart: (boolean|undefined),
   *   sendThrottleEnd: (boolean|undefined),
   *   throttleWindowMs: (number|undefined),
   * }=} options Configuration options where
   *     sendThrottleStart: Whether to send a "Throttling: " message upon the
   *         first throttled report.
   *     sendThrottleEnd: Whether to send a "Throttled: " message at the end of
   *         a throttling window when there are one or more throttled reports.
   *     throttleWindowMs: How long, in milliseconds, identical reports should
   *         be throttled. Any negative value will disable throttling.
   */
  constructor(closureErrorReporter, {
    sendThrottleStart = true,
    sendThrottleEnd = true,
    throttleWindowMs = JsReporter.LOGGING_PERIOD,
  } = {}) {
    /**
     * The Closure reporter that we use to send reports to the server.
     * @private @const {?ErrorReporter}
     */
    this.closureReporter_ = closureErrorReporter;

    /**
     * Map of error payloads to information about how many times sending that
     * error has been throttled.
     * @private @const {!Map<string, {duplicates: number}>}
     */
    this.infoMap_ = new Map();

    /**
     * Handlers which can listen to reports.
     * @private @const {!Array}
     */
    this.handlers_ = [];

    /** @private {boolean} */
    this.severeExceptionSent_ = false;

    /**
     * Whether to send a "Throttling: " message upon the first throttled report.
     * @private @const {boolean}
     */
    this.sendThrottleStart_ = sendThrottleStart;

    /**
     * Whether to send a "Throttled: " message at the end of a throttling window
     * when there are one or more throttled reports.
     * @private @const {boolean}
     */
    this.sendThrottleEnd_ = sendThrottleEnd;

    /**
     * How long, in milliseconds, identical reports should be throttled. Any
     * negative value will disable throttling.
     * @private @const {number}
     */
    this.throttleWindowMs_ = throttleWindowMs;
  }

  /**
   * Creates a report context, with some common properties.
   * @return {!Context} opt_context The report context, which contains extra
   *     information fields to be sent with the report.
   * @private
   */
  createContext_() {
    return errorContext.get();
  }

  /**
   * Adds a stack to all error reports that don't otherwise include an error
   * object, eg, log.severe(message). The stack will include the full call path
   * to the reporter.
   */
  addStackTraceToAllErrorReports() {
    this.addStackTraceToAllErrorReports_ = true;
  }

  /**
   * Adds a handler for error reports. This includes reports from
   * `fava.debug.ErrorReporter.reportException` and also severe log
   * records in logging JS modes.
   *
   * <p>Handlers are called before the report is sent to the server, so they
   * can modify it if necessary.
   *
   * <p>The callback arguments are the Error and context objects. The error
   * object holds the error message and a stack trace on some browsers. The
   * context object holds any report or log message, JsVersion, etc.
   *
   * Returning false from a handler will prevent the error from being sent to
   * the server.
   *
   * @param {function(!Error, !Context):(boolean|undefined)} handler A handler
   *     function to be called when a report is sent to the server. Returning
   *     false will cancel the error from being reported.
   */
  addReportHandler(handler) {
    this.handlers_.push(handler);
  }

  /**
   * Removes a report handler.
   * @param {function(!Error, !Context)} handler A handler function to be
   *     removed.
   */
  removeReportHandler(handler) {
    googArray.remove(this.handlers_, handler);
  }

  /**
   * @override
   * @suppress {lintChecks} TODO(b/271258535): Migrate existing callers that are
   * invoking this method with an `unknown`-typed object.
   */
  sendExceptionReport(e, opt_logMessage, severity = ErrorSeverity.UNKNOWN) {
    const context = this.createContext_();
    if (opt_logMessage) {
      context[ContextKey.MESSAGE] = opt_logMessage;
    }

    this.handleException_(e, context, severity);
  }

  /**
   * Sends severe log reports to the JS error action. This is installed as a
   * handler for the publish event from the root logger.
   * @param {!log.LogRecord} logRecord The LogRecord.
   * @suppress {strictMissingProperties} dontReport is not defined on '*'
   */
  sendLogReport(logRecord) {
    // Log handling for DEBUG and LOGGING modes, eg, OPTIMIZED_WITH_LOGGING.
    if (!core.DEBUG_LOGGING) {
      return;
    }

    // Only report severe log records.
    // In OPTIMIZED_WITH_LOGGING mode we'll see log messages from the error
    // reporter, which will also report them, dontReport tells us to skip
    // them.
    if (logRecord.getLevel() !== log.Level.SEVERE ||
        /** @type {*} */ (logRecord).dontReport) {
      return;
    }

    const context = this.createContext_();
    context[ContextKey.LOG_LEVEL] = String(logRecord.getLevel());
    context[ContextKey.LOGGER_NAME] = logRecord.getLoggerName();
    context[ContextKey.MESSAGE] =
        '[' + logRecord.getLoggerName() + '] ' + logRecord.getMessage();

    // TODO: Change the closure reporter to accept optional error and message.
    this.handleException_(
        logRecord.getException(), context, ErrorSeverity.SEVERE);
  }

  /**
   * @return {?ErrorReporter}
   */
  getClosureReporter() {
    return this.closureReporter_;
  }

  /**
   * Processes an exception, eg, throttling, and reports it to the server.
   *
   * @param {*} exception An exception, which is not necessarily an Error
   *     object.
   * @param {!Context} context Context values to include in the error report.
   *     May include a log or report message.
   * @param {!ErrorSeverity} severity The severity to attach to the report
   *     context.
   * @private
   */
  handleException_(exception, context, severity) {
    let error;
    const stack = debug.getStacktrace();
    context[ContextKey.CALL_STACK] = stack;
    if (exception instanceof Error) {
      error = exception;
      // Sometimes the Error object has no stack trace: use what we have, then.
      if (this.addStackTraceToAllErrorReports_ && !error.stack) {
        error.stack = stack;
      }
    } else {
      if (this.addStackTraceToAllErrorReports_) {
        error = new ErrorReport(exception ?? context[ContextKey.MESSAGE]);
      } else {
        // '' is treated as a basic error object with no line info or stack
        // trace.
        error = exception || '';
      }
    }

    const reportSeverity = (error && error['reportSeverity']) ||
        (exception && exception['reportSeverity']);
    if (reportSeverity) {
      severity = /** @type {!ErrorSeverity} */ (reportSeverity);
    }

    this.maybeAddSeverityToContext_(context, severity);

    // Call report handlers before sending to the server, cancelling reporting
    // if a handler returns false.
    for (let i = 0; i < this.handlers_.length; i++) {
      if (this.handlers_[i](error, context) === false) {
        return;
      }
    }

    this.maybeUpdateSeverityToSevereAfterInitial_(context);

    if (this.throttleWindowMs_ >= 0) {
      const message = context[ContextKey.MESSAGE] ?? '';
      const payload = this.getPayload_(error, context);

      // Log the error report timestamp.
      // We should do this after we get the payload, otherwise every payload
      // will be unique and no messages would be throttled.
      context[ContextKey.ERROR_REPORT_SESSION_TIMESTAMP] =
          String(goog.global.performance?.now?.());
      context[ContextKey.ERROR_REPORT_TIMESTAMP] = String(Date.now());

      // Find the last time we sent.
      const errorInfo = this.infoMap_.get(payload);
      if (errorInfo) {
        errorInfo.duplicates++;

        if (this.sendThrottleStart_ && errorInfo.duplicates === 1) {
          // This is the first time we throttled a message. Send a "now
          // throttling" message to the server.
          this.sendThrottleMessage_(
              error, 'Throttling: ' + message, context, 1);
        }
        return;
      }

      const newErrorInfo = {duplicates: 0};
      this.infoMap_.set(payload, newErrorInfo);
      setTimeout(() => {
        this.infoMap_.delete(payload);

        if (this.sendThrottleEnd_ && newErrorInfo.duplicates > 0) {
          // The throttling window has closed and one or more messages were
          // throttled. Send a "finished throttling" message to the server.
          this.sendThrottleMessage_(
              error, 'Throttled: ' + message, context, newErrorInfo.duplicates);
        }
      }, this.throttleWindowMs_);
    }

    // Actually send the message.
    this.dispatchExceptionToMultipleSenders_(error, context);
  }

  /**
   * Sends a throttling-related message instead of a standard exception message.
   *
   * @param {*} error
   * @param {string} message
   * @param {!Context} context Context values to include in the error report.
   *     May include a log or report message.
   * @param {number} droppedInstances
   */
  sendThrottleMessage_(error, message, context, droppedInstances) {
    context[ContextKey.MESSAGE] = message;
    context[ContextKey.DROPPED_INSTANCES] = String(droppedInstances);
    this.dispatchExceptionToMultipleSenders_(error, context);
  }

  /**
   * Dispatch errors to the multiple senders as the final step of handling
   * exceptions.
   *
   * @param {*} error An exception, which is not necessarily an Error object.
   * @param {!Context} context Context values to include in the error report.
   *     May include a log or report message.
   * @private
   */
  dispatchExceptionToMultipleSenders_(error, context) {
    // If being called via ErrorReporter_, then the following scrub is
    // redundant. However, many callers in google3 call this reporter directly.
    scrubFileNameIfError(error);
    // TODO(b/271258535): Eliminate this type cast once existing unknown-type
    // callers are migrated. Changing the Closure library to take a wider type
    // is both infeasible and undesired. This call has been passing primitive
    // values in production for a while, and thus appears to be safe as long as
    // Closure's ErrorReporter implementation doesn't change, or as long as all
    // such changes are guarded by TGP.
    this.closureReporter_.handleException(
        /** @type {?Object} */ (error), context);
  }

  /**
   * Stringifies the payload for the given exception and context.
   *
   * @param {*} error The exception.
   * @param {!Context} context Context values to optionally include in the error
   *     report.
   * @return {string} The payload string.
   * @private
   */
  getPayload_(error, context) {
    const errorEntries = [];
    if (error) {
      // TODO(b/271258535): Narrow the type of the error parameter and eliminate
      // this type cast once existing unknown-type callers are migrated.
      const {message, stack} = /** @type {!Error} */ (error);
      if (message) {
        errorEntries.push('error|:' + escapePayloadValue(message));
      }
      if (stack) {
        errorEntries.push('trace|:' + escapePayloadValue(stack));
      }
    }

    const contextEntries = [];
    for (const key in context) {
      contextEntries.push(
          escapePayloadValue(key) + '|:' + escapePayloadValue(context[key]));
    }

    return errorEntries.join('|;') + '|.' + contextEntries.join('|;');
  }

  /**
   * Annotates the context with severity if it is not already populated on
   * the context.
   * @param {!Context} context Context values to include in the error report.
   * @param {!ErrorSeverity} severity Severity of the error report.
   * @private
   */
  maybeAddSeverityToContext_(context, severity) {
    if (context[ContextKey.SEVERITY]) {
      return;
    }

    context[ContextKey.SEVERITY] = severity;
  }

  /**
   * For severe exception, updates the severity to SEVERE_AFTER_INITIAL if the
   * reporter has already sent a severe exception.
   * @param {!Context} context Context values to include in the error report.
   * @private
   */
  maybeUpdateSeverityToSevereAfterInitial_(context) {
    if (context[ContextKey.SEVERITY] !== ErrorSeverity.SEVERE) {
      return;
    }

    if (this.severeExceptionSent_) {
      context[ContextKey.SEVERITY] = ErrorSeverity.SEVERE_AFTER_INITIAL;
    }
    this.severeExceptionSent_ = true;
  }
};

/**
 * The amount of time between when a given report is sent and when it can
 * next be sent (in ms).
 */
JsReporter.LOGGING_PERIOD = 10000;

/**
 * Whether to create an Error object with a stack trace if an error report
 * doesn't already have one.
 * @private
 */
JsReporter.prototype.addStackTraceToAllErrorReports_ = false;

/**
 * Escapes the payload value string. Only "|" is escaped. "|" is used as the
 * escape sequence start because it is uncommon in payloads and therefore is
 * unlikely to need to require replacement.
 * @param {*} value
 * @return {string}
 */
const escapePayloadValue = (value) => String(value).replace(/\|/g, (c) => '||');

exports = JsReporter;
