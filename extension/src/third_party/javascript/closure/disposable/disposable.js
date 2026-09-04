/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Implements the disposable interface.
 */

goog.module('goog.Disposable');
goog.module.declareLegacyNamespace();

const IDisposable = goog.require('goog.disposable.IDisposable');
const dispose = goog.require('goog.dispose');
/**
 * TODO(b/175587766): Remove this require.
 * @suppress {extraRequire}
 */
const disposeAll = goog.require('goog.disposeAll');

/**
 * Class that provides the basic implementation for disposable objects. If your
 * class holds references or resources that can't be collected by standard GC,
 * it should extend this class or implement the disposable interface (defined
 * in IDisposable). See description of
 * IDisposable for examples of cleanup.
 * @constructor
 * @implements {IDisposable}
 */
function Disposable() {
  /**
   * If monitoring the Disposable instances is enabled, stores the creation
   * stack trace of the Disposable instance.
   * @type {string|undefined}
   */
  this.creationStack;

  if (Disposable.MONITORING_MODE != Disposable.MonitoringMode.OFF) {
    if (Disposable.INCLUDE_STACK_ON_CREATION) {
      this.creationStack = new Error().stack;
    }
    Disposable.instances_[goog.getUid(this)] = this;
  }
  // Support sealing
  this.disposed_ = this.disposed_;
  this.onDisposeCallbacks_ = this.onDisposeCallbacks_;
}

/**
 * @enum {number} Different monitoring modes for Disposable.
 */
Disposable.MonitoringMode = {
  /**
   * No monitoring.
   */
  OFF: 0,
  /**
   * Creating and disposing the Disposable instances is monitored. All
   * disposable objects need to call the `Disposable` base
   * constructor. The PERMANENT mode must be switched on before creating any
   * Disposable instances.
   */
  PERMANENT: 1,
  /**
   * INTERACTIVE mode can be switched on and off on the fly without producing
   * errors. It also doesn't warn if the disposable objects don't call the
   * `Disposable` base constructor.
   */
  INTERACTIVE: 2
};

/**
 * @define {number} The monitoring mode of the Disposable
 *     instances. Default is OFF. Switching on the monitoring is only
 *     recommended for debugging because it has a significant impact on
 *     performance and memory usage. If switched off, the monitoring code
 *     compiles down to 0 bytes.
 */
Disposable.MONITORING_MODE = goog.define('goog.Disposable.MONITORING_MODE', 0);

/**
 * @define {boolean} Whether to attach creation stack to each created disposable
 *     instance; This is only relevant for when MonitoringMode != OFF.
 */
Disposable.INCLUDE_STACK_ON_CREATION =
    goog.define('goog.Disposable.INCLUDE_STACK_ON_CREATION', true);

/**
 * Maps the unique ID of every undisposed `Disposable` object to
 * the object itself.
 * @type {!Object<number, !Disposable>}
 * @private
 */
Disposable.instances_ = {};

/**
 * @return {!Array<!Disposable>} All `Disposable` objects that
 *     haven't been disposed of.
 */
Disposable.getUndisposedObjects = function() {
  const ret = [];
  for (const id in Disposable.instances_) {
    if (Disposable.instances_.hasOwnProperty(id)) {
      ret.push(Disposable.instances_[Number(id)]);
    }
  }
  return ret;
};

/**
 * Clears the registry of undisposed objects but doesn't dispose of them.
 */
Disposable.clearUndisposedObjects = function() {
  Disposable.instances_ = {};
};

/**
 * Whether the object has been disposed of.
 * @type {boolean}
 * @private
 */
Disposable.prototype.disposed_ = false;

/**
 * Callbacks to invoke when this object is disposed.
 * @type {Array<!Function>}
 * @private
 */
Disposable.prototype.onDisposeCallbacks_;

/**
 * @return {boolean} Whether the object has been disposed of.
 * @override
 */
Disposable.prototype.isDisposed = function() {
  return this.disposed_;
};

/**
 * @return {boolean} Whether the object has been disposed of.
 * @deprecated Use {@link #isDisposed} instead.
 */
Disposable.prototype.getDisposed = Disposable.prototype.isDisposed;

/**
 * Disposes of the object. If the object hasn't already been disposed of, calls
 * {@link #disposeInternal}. Classes that extend `Disposable` should
 * override {@link #disposeInternal} in order to cleanup references, resources
 * and other disposable objects. Reentrant.
 *
 * @return {void} Nothing.
 * @override
 */
Disposable.prototype.dispose = function() {
  if (!this.disposed_) {
    // Set disposed_ to true first, in case during the chain of disposal this
    // gets disposed recursively.
    this.disposed_ = true;
    this.disposeInternal();
    if (Disposable.MONITORING_MODE != Disposable.MonitoringMode.OFF) {
      const uid = goog.getUid(this);
      if (Disposable.MONITORING_MODE == Disposable.MonitoringMode.PERMANENT &&
          !Disposable.instances_.hasOwnProperty(uid)) {
        throw new Error(
            this + ' did not call the goog.Disposable base ' +
            'constructor or was disposed of after a clearUndisposedObjects ' +
            'call');
      }
      if (Disposable.MONITORING_MODE != Disposable.MonitoringMode.OFF &&
          this.onDisposeCallbacks_ && this.onDisposeCallbacks_.length > 0) {
        throw new Error(
            this + ' did not empty its onDisposeCallbacks queue. This ' +
            'probably means it overrode dispose() or disposeInternal() ' +
            'without calling the superclass\' method.');
      }
      delete Disposable.instances_[uid];
    }
  }
};

/**
 * The same as calling {@link #dispose}.
 *
 * This makes a Disposable object a standard disposable object, in the
 * sense of the Explicit Resource Management spec. Details at
 * {@link https://github.com/tc39/proposal-explicit-resource-management}.
 *
 * @return {void} Nothing.
 */
Disposable.prototype[Symbol.dispose] = function() {
  // By implementing it this way rather than assigning this.dispose to
  // Symbol.dispose, we support cases where subclasses have overridden
  // dispose.
  this.dispose();
};

/**
 * Associates a disposable object with this object so that they will be disposed
 * together.
 * @param {IDisposable} disposable that will be disposed when
 *     this object is disposed.
 */
Disposable.prototype.registerDisposable = function(disposable) {
  this.addOnDisposeCallback(goog.partial(dispose, disposable));
};

/**
 * Invokes a callback function when this object is disposed. Callbacks are
 * invoked in the order in which they were added. If a callback is added to
 * an already disposed Disposable, it will be called immediately.
 * @param {function(this:T):?} callback The callback function.
 * @param {T=} opt_scope An optional scope to call the callback in.
 * @template T
 */
Disposable.prototype.addOnDisposeCallback = function(callback, opt_scope) {
  if (this.disposed_) {
    opt_scope !== undefined ? callback.call(opt_scope) : callback();
    return;
  }

  if (!this.onDisposeCallbacks_) {
    this.onDisposeCallbacks_ = [];
  }

  if (opt_scope) {
    callback = (goog.TRUSTED_SITE) ? callback.bind(opt_scope) :
                                     goog.bind(callback, opt_scope);
  }

  this.onDisposeCallbacks_.push(callback);
};

/**
 * Performs appropriate cleanup. See description of IDisposable
 * for examples. Classes that extend `Disposable` should override this
 * method. Not reentrant. To avoid calling it twice, it must only be called from
 * the subclass' `disposeInternal` method. Everywhere else the public `dispose`
 * method must be used. For example:
 *
 * <pre>
 * mypackage.MyClass = function() {
 * mypackage.MyClass.base(this, 'constructor');
 *     // Constructor logic specific to MyClass.
 *     ...
 *   };
 *   goog.inherits(mypackage.MyClass, Disposable);
 *
 *   mypackage.MyClass.prototype.disposeInternal = function() {
 *     // Dispose logic specific to MyClass.
 *     ...
 *     // Call superclass's disposeInternal at the end of the subclass's, like
 *     // in C++, to avoid hard-to-catch issues.
 *     mypackage.MyClass.base(this, 'disposeInternal');
 *   };
 * </pre>
 *
 * @protected
 */
Disposable.prototype.disposeInternal = function() {
  if (this.onDisposeCallbacks_) {
    while (this.onDisposeCallbacks_.length) {
      this.onDisposeCallbacks_.shift()();
    }
  }
};

/**
 * Returns True if we can verify the object is disposed.
 * Calls `isDisposed` on the argument if it supports it.  If obj
 * is not an object with an isDisposed() method, return false.
 * @param {*} obj The object to investigate.
 * @return {boolean} True if we can verify the object is disposed.
 */
Disposable.isDisposed = function(obj) {
  if (obj && typeof obj.isDisposed == 'function') {
    return obj.isDisposed();
  }
  return false;
};

exports = Disposable;
