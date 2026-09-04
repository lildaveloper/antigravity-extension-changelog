// Copyright 2009 Google Inc. All Rights Reserved.

/**
 * @fileoverview Defines constants that are overridden by
 * JSCompiler for different users depending on user's settitngs.
 * @author anatol@google.com (Anatol Pomazau)
 */

// It is a fake namespece used to load constants from this file.
goog.provide('fava.core');

/**
 * @define {boolean} Enable extra logging for users experiencing some problems
 * but would not be a good idea to be turned on a widespread basis. Only a
 * subset of the debugging code is enabled unless goog.DEBUG is also true.
 */
fava.core.DEBUG_LOGGING = goog.define('fava.core.DEBUG_LOGGING', true);
