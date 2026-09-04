// Copyright 2010 Google Inc. All Rights Reserved.

/**
 * @fileoverview Definition of fava.debug.DebugService.
 *
 * @author mwr@google.com (Mark Rawling)
 */

goog.module('fava.debug.DebugService');
goog.module.declareLegacyNamespace();

const DebugErrorReporter = goog.require('goog.debug.ErrorReporter');
const ErrorHandler = goog.require('goog.debug.ErrorHandler');
const ErrorReporter = goog.require('fava.debug.ErrorReporter');
const FancyWindow = goog.require('goog.debug.FancyWindow');
const JsReporter = goog.require('fava.debug.JsReporter');
const browser = goog.require('goog.labs.userAgent.browser');
const core = goog.require('fava.core');
const debug = goog.require('goog.debug');
const entryPointRegistry = goog.require('goog.debug.entryPointRegistry');
const errorContext = goog.require('fava.debug.errorContext');
const googArray = goog.require('goog.array');
const googString = goog.require('goog.string');
const log = goog.require('goog.log');
const {ErrorSeverity} = goog.require('google3.javascript.apps.fava.debug.error_severity');

/**
 * A service for managing debugging, error handling, and log/error reporting.
 *
 * NOTE: This service does not require an AppContext. You should initialize
 * it as early as possible in your startup code.
 *
 * Initialize the debug service.
 *
 * <ul>
 *   <li>Sets up a local debug/log window.</li>
 *   <li>Sets up error catching and logging.</li>
 *   <li>Sets up log and error reporting back to the server.</li>
 * </ul>
 *
 * Error reports are generated and processed by ErrorReporter.
 * Severe log records are reported in DEBUG and LOGGING modes.
 *
 * @see {ErrorReporter}
 * @see {DebugErrorReporter}
 *
 * @param {?string=} opt_debugWindowName Debug window name.
 * @param {?string=} opt_debugWindowWelcome Debug window Welcome message.
 * @param {string=} opt_reportingUrl The URL to which logs and errors are
 *     reported. If not provided, reporting is disabled.
 * @param {(?Array<!Window>)=} opt_additionalWindows Additional windows for
 *     which window.onerror should be trapped. By default, we only catch errors
 *     in the current window (goog.global).
 * @param {function(string, string, string, ?Object=)=}
 *     opt_xhrSender Overriding XHR sender to use.
 * @param {boolean=} opt_onlyIncludeErrorsFromWindowOnError Only sends
 *     errors from the window.onerror handler to the server when the error has
 *     a real error object associated with it.  When this is enabled, there
 *     should be less noise in the JS error reports, but some real issues may be
 *     missed without it.
 * @param {boolean=} opt_doNotUseProtectedFunctionsInModernBrowsers Do not set
 *     up protected functions in browsers that support a complete stack trace in
 *     errors that propagate to window.onerror. See
 *     https://github.com/mknichel/javascript-errors#protected-entry-points and
 *     https://github.com/mknichel/javascript-errors#windowonerror for more
 *     information. This option should be strictly better but is being evaluated
 *     by products before being turned on by default.
 * @param {!Object<string, string>=} opt_additionalErrorArguments Any additional
 *     key/value pairs to append to JS error reporting URL (if specified).
 * @param {!Object=} opt_additionalExportToNamespace The namespace object to
 *     export various handling functions to. When provided, various functions
 *     that would normally be exported to the global scope will be exported to
 *     the namespace object as well.
 * @return {!fava.debug.DebugService_} This instance.
 */
function initialize(
    opt_debugWindowName, opt_debugWindowWelcome, opt_reportingUrl,
    opt_additionalWindows, opt_xhrSender,
    opt_onlyIncludeErrorsFromWindowOnError,
    opt_doNotUseProtectedFunctionsInModernBrowsers,
    opt_additionalErrorArguments, opt_additionalExportToNamespace) {
  if (goog.DEBUG) {
    // Set up the debug window, initially hidden.
    const windowName = opt_debugWindowName || window.location.pathname;
    instance.debugWindow_ = new FancyWindow(windowName);
    if (opt_debugWindowWelcome) {
      instance.debugWindow_.setWelcomeMessage(opt_debugWindowWelcome);
    }
    instance.debugWindow_.init();
  }

  // Set up the Fava error reporter.
  ErrorReporter.init();

  if (opt_reportingUrl) {
    // Install the reporter. If no reporting url is given, the Fava error
    // reporter will save up to 10 errors. They may never be sent.

    // JsReporter builds and (eventually) manages reports and uses a Closure
    // reporter to send them to the server. We set Closure's opt_noAutoProtect
    // to true because we install our own protection below.
    const closureReporter = DebugErrorReporter.install(
        opt_reportingUrl,
        /*opt_contextProvider*/ undefined, /*opt_noAutoProtect*/ true);
    if (opt_additionalErrorArguments) {
      closureReporter.setAdditionalArguments(opt_additionalErrorArguments);
    }
    if (opt_xhrSender) {
      closureReporter.setXhrSender(opt_xhrSender);
    }
    const jsReporter = new JsReporter(closureReporter);
    instance.jsReporter_ = jsReporter;

    if (core.DEBUG_LOGGING) {
      log.addHandler(
          log.getRootLogger(),
          goog.bind(JsReporter.prototype.sendLogReport, jsReporter));
    }
    ErrorReporter.setErrorReportSender(jsReporter);
  }

  const reportExceptionNoMsgFn = (e) =>
      ErrorReporter.reportExceptionNoMsg(e, ErrorSeverity.SEVERE);

  // Handle errors from the external code, such as module loading.
  let firstModuleLoadException = null;
  let numModuleLoadExceptions = 0;
  const reportModuleLoadException = function(e) {
    numModuleLoadExceptions++;
    // Append filename to error message for syntax errors in code loaded
    // as SUPER_UNCOMPILED. These errors, coming from eval, lack line number
    // and file name. This at least adds back the filename
    if (goog.global['$googDebugFname'] && e && e.message && !e.fileName) {
      e.message += ' in ' + goog.global['$googDebugFname'];
    }
    if (firstModuleLoadException) {
      // This is a subsequent module load exception.
      // If there was a previous exception during code loading, all subsequent
      // exceptions are likely caused by a dependency loading incompletely.
      if (e && e.message) {
        e.message += ' [Possibly caused by: ' + firstModuleLoadException + ']';
      }
    } else {
      firstModuleLoadException = `error:${e} stack:${e.stack}`;
      errorContext.add('moduleLoadExceptions', () => {
        return `first:${firstModuleLoadException} #received:${
            numModuleLoadExceptions}`;
      });
    }
    reportExceptionNoMsgFn(e);
    if (goog.DEBUG) {
      throw e;
    }
  };
  goog.exportSymbol('_DumpException', reportModuleLoadException);
  goog.exportSymbol('_B_err', reportModuleLoadException);
  if (opt_additionalExportToNamespace) {
    goog.exportSymbol(
        '_DumpException', reportModuleLoadException,
        opt_additionalExportToNamespace);
  }

  if (COMPILED || !isTesting()) {
    // When not in unit tests, catch errors and protect all entry points.
    // As with goog.debug.ErrorReporter we don't protect entry points in IE,
    // but rather rely on window.onerror.  This does mean we don't get
    // synthetic stack traces, but their value is negligible given the
    // current set up.
    // COMPILED is true in compiled mode, including compiled automation tests.
    // !isTesting() is true if DISALLOW_TEST_ONLY_CODE is set to true.
    // TODO(mwr): Explore removing this condition given that this code is only
    // active when directly installed and initialized, presumably not in tests.
    googArray.forEach(
        [goog.global].concat(opt_additionalWindows || []),
        goog.partial(
            debug.catchErrors,
            goog.partial(
                handleGlobalError, !!opt_onlyIncludeErrorsFromWindowOnError,
                reportExceptionNoMsgFn),
            !goog.DEBUG /* Stop prod users from seeing errors */));

    // See https://github.com/mknichel/javascript-errors#windowonerror for the
    // details behind which browsers support this properly.
    const browserSupportsWindowOnErrorProperly =
        (browser.isAtLeast(browser.Brand.CHROMIUM, 28)) ||
        (browser.isAtLeast(browser.Brand.FIREFOX, 14)) ||
        (browser.isAtLeast(browser.Brand.IE, 11)) ||
        (browser.isAtLeast(browser.Brand.SAFARI, 10));
    if (!(opt_doNotUseProtectedFunctionsInModernBrowsers &&
          browserSupportsWindowOnErrorProperly) &&
        !browser.isAtMost(browser.Brand.IE, 9)) {
      // For all browsers except IE < 10 (which doesn't produce stack traces),
      // we wrap entry points so we can catch errors and get their stack traces.
      const errorHandler = new ErrorHandler(reportExceptionNoMsgFn);
      errorHandler.setWrapErrors(COMPILED);
      // Ensures that errors always have a well defined prefix. This is used in
      // fava.debug.DebugService.handleGlobalError_ to check whether the
      // globally caught error has been previously handled by the errorHandler.
      errorHandler.setPrefixErrorMessages(true);
      errorHandler.protectWindowRequestAnimationFrame();
      errorHandler.protectWindowSetTimeout();
      errorHandler.protectWindowSetInterval();
      errorHandler.catchUnhandledRejections();
      entryPointRegistry.monitorAll(errorHandler);
      instance.errorHandler_ = errorHandler;
    }
  }
  return instance;
}

/** @return {boolean} True if in a testing context. */
function isTesting() {
  return !goog.DISALLOW_TEST_ONLY_CODE;
}

/**
 * Handles errors from debug.catchErrors.
 * @param {boolean} onlyIncludeErrors Only send reports to the server when the
 *     error-like object contains a real error.
 * @param {function(?Object): void} reportExceptionFn A function that reports
 *     exceptions of an error-like object.
 * @param {?Object} e Error-like object.
 * @suppress {strictMissingProperties} go/strict_warnings_migration
 */
function handleGlobalError(onlyIncludeErrors, reportExceptionFn, e) {
  if (googString.contains(
          e.message, ErrorHandler.ProtectedFunctionError.MESSAGE_PREFIX)) {
    // Don't report errors that were re-thrown by goog.debug.ErrorHandler, since
    // they have already been reported.
    return;
  }
  if (e.error && e.error.stack) {
    reportExceptionFn(/** @type {?Error} */ (e.error));
  } else if (!onlyIncludeErrors) {
    reportExceptionFn(/** @type {?Error} */ (e));
  }
}

/**
 * Gets the debug window.
 * @return {FancyWindow} The debug window.
 */
function getDebugWindow() {
  return instance.debugWindow_;
}

/**
 * Enable or disable the debug window.
 * @param {boolean=} opt_enable If specified and false, the window will be
 *     disabled, otherwise it will be enabled.
 */
function enableDebugWindow(opt_enable) {
  instance.enableDebugWindow(opt_enable);
}

/**
 * Toggles the enabled state of the debug window.
 */
function toggleDebugWindow() {
  instance.toggleDebugWindow();
}

/**
 * Gets the Closure error handler.
 * TODO(mwr): Get rid of this. It's currently needed for setting up the
 * iframe request transport.
 * @return {ErrorHandler} The error handler.
 */
function getErrorHandler() {
  return instance.errorHandler_;
}

/**
 * Gets the JSReporter.
 * @return {JsReporter} The JS log/error reporter.
 */
function getJsReporter() {
  return instance.jsReporter_;
}

// End of public interface.

/**
 * Class for the singleton instance.
 * The constructor and singleton instance are private. Use the public static
 * interface from client code.
 * @final
 * @private
 */
fava.debug.DebugService_ = class {
  constructor() {}

  /**
   * Enable or disable the debug window.
   * @param {boolean=} opt_enable If specified and false, the window will be
   *     disabled, otherwise it will be enabled.
   */
  enableDebugWindow(opt_enable) {
    if (goog.DEBUG) {
      if ((opt_enable === undefined || opt_enable) ==
          this.debugWindow_.isEnabled()) {
        return;  // no change, do nothing
      }
      this.toggleDebugWindow();
    }
  }

  /**
   * Sets whether the debug window should be force enabled when a severe log is
   * encountered.
   * @param {boolean} enable Whether to enable severe logs.
   */
  setForceEnableOnSevere(enable) {
    if (goog.DEBUG) {
      this.debugWindow_.setForceEnableOnSevere(enable);
    }
  }

  /**
   * Toggles the enabled state of the debug window.
   */
  toggleDebugWindow() {
    if (goog.DEBUG) {
      if (this.debugWindow_.isEnabled()) {
        log.info(this.logger_, 'Disabling debug window');
        this.debugWindow_.setEnabled(false);
      } else {
        this.debugWindow_.setEnabled(true);
        log.info(this.logger_, 'Enabled debug window');
      }
    }
  }
};

/**
 * Logger.
 * @type {?log.Logger}
 * @private
 */
fava.debug.DebugService_.prototype.logger_ =
    log.getLogger('fava.debug.DebugService');

/**
 * Debug window.
 * @type {?FancyWindow}
 * @private
 */
fava.debug.DebugService_.prototype.debugWindow_ = null;

/**
 * The Closure error handler.
 * @type {?ErrorHandler}
 * @private
 */
fava.debug.DebugService_.prototype.errorHandler_ = null;

/**
 * The Fava JsReporter.
 * @type {?JsReporter}
 * @private
 */
fava.debug.DebugService_.prototype.jsReporter_ = null;

/**
 * Singleton instance.
 * @const {!fava.debug.DebugService_}
 */
const instance = new fava.debug.DebugService_();

exports = {
  enableDebugWindow,
  getDebugWindow,
  getErrorHandler,
  getJsReporter,
  initialize,
  toggleDebugWindow,
};
