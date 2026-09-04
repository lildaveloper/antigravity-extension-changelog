/**
 * @license
 * Copyright 2005, 2007 Bob Ippolito. All Rights Reserved.
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: MIT
 */

// Portions of this code are from MochiKit, received by The Closure
// Library Authors under the MIT license. All other code is Copyright
// The Closure Library Authors.

goog.module('goog.async.DeferredDefines');
goog.module.declareLegacyNamespace();

/**
 * @define {boolean} Whether unhandled errors should always get rethrown to the
 * global scope. Defaults to false.
 *
 * NOTE(b/235488242): This has a surprising side effect that when STRICT_ERRORS
 * is true, successfully resolving a `Deferred` with a value that is `instanceof
 * Error` (other than `CanceledError`, which is treated as _not an error_ for
 * this purpose) will actually cause the `Deferred` to end up in a rejected
 * state. Thus, `Deferred.succeed(new Error()).addErrback(f)` will actually call
 * `f`. This is similar to existing behavior where (independent of
 * STRICT_ERRORS) _errbacks_ that return (rather than throw) any `Error`
 * (including `CanceledError`) will cause a rejection. We believe this behavior
 * is unintended and will try to fix it in the future to be more consistent.
 */
exports.STRICT_ERRORS = goog.define('goog.async.Deferred.STRICT_ERRORS', false);


/**
 * @define {boolean} Whether to attempt to make stack traces long.  Defaults to
 * false.
 */
exports.LONG_STACK_TRACES =
    goog.define('goog.async.Deferred.LONG_STACK_TRACES', false);
