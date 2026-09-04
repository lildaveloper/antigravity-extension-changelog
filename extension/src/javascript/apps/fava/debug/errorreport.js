/**
 * @fileoverview Definition of ErrorReport.
 *
 * @author mwr@google.com (Mark Rawling)
 */

goog.provide('fava.debug.ErrorReport');


/**
 * An ErrorReport is created when the exception reporter is called without
 * a real Error object to ensure that we get a stack trace with each report.
 * The stack trace will contain the reporting context and won't always reveal
 * the originating context, but it is often helpful. This is similar to the
 * call-stack object, but it will be deobfuscated, it contains the stringified
 * cause in the stack trace, and it is more actionable.
 * @extends {Error}
 * @final
 * @struct
 */
fava.debug.ErrorReport = class extends Error {
  /**
   * @param {*} cause A non-Error that was reported as an error. It will appear
   *     as the error in the stack trace, and in the error message.
   */
  constructor(cause) {
    const message = fava.debug.ErrorReport.stringify_(cause);
    super(message);
    // 'name' appears as the error type in the Chrome stack trace.
    this.name = 'ErrorReport: ' + message;
  }

  /**
   * Convert the cause to a string, either via stringify for non-recursive
   * objects, or via the `String` method otherwise.
   * @param {*} cause The cause of the exception. Can be any non error.
   * @return {string}
   * @private
   */
  static stringify_(cause) {
    try {
      return cause instanceof Object ? JSON.stringify(cause) : String(cause);
    } catch (e) {
      // In case of stringify failing on recursive objects
      return String(cause);
    }
  }
};
