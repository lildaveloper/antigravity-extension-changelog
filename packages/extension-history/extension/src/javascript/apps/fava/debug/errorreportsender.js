// Copyright 2009 Google Inc. All Rights Reserved.

/**
 * @fileoverview Definition of ErrorReportSender interface.
 *
 * @author jonp@google.com
 */

goog.module('fava.debug.ErrorReportSender');
goog.module.declareLegacyNamespace();

const {ErrorSeverity} = goog.require('google3.javascript.apps.fava.debug.error_severity');

/**
 * Interface for reporting exceptions.
 * @interface
 */
function ErrorReportSender() {}

/**
 * Sends an exception report to the server.
 * @param {?Object} e An exception.
 * @param {?string=} opt_logMessage logger message.
 * @param {!ErrorSeverity=} severity The severity of the error report to attach
 *     to the context.
 */
ErrorReportSender.prototype.sendExceptionReport = function(
    e, opt_logMessage, severity = ErrorSeverity.UNKNOWN) {};

exports = ErrorReportSender;
