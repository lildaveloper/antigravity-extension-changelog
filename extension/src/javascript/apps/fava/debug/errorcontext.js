// Copyright 2011 Google Inc. All Rights Reserved.

/**
 * @fileoverview Registry of providers that allows different parts of an app
 * to register information that can be helpful when debugging errors.
 *
 * @author pupius@google.com (Daniel Pupius)
 */

goog.module('fava.debug.errorContext');
goog.module.declareLegacyNamespace();

const asserts = goog.require('goog.asserts');
const dom = goog.require('fava.dom');
const {urlForReporting} = goog.require('google3.javascript.apps.fava.debug.urlutil');

/**
 * Map of functions that will provide additional context for error reports.
 * @type {!Object}
 */
let providers = {};

/**
 * Adds additional context providers which can add extra information about the
 * current state of the application.
 * @param {string} key The string key to use in the report.
 * @param {function() : ?string} fn The provider.
 *
 */
function add(key, fn) {
  asserts.assert(
      !providers[key], 'Context provider already registered for %s', key);
  providers[key] = fn;
}

/**
 * Detects if a context provider has been registered.
 * @param {string} key The string key to use in the report.
 * @return {boolean} Whether the context provider has been registered.
 *
 */
function has(key) {
  return !!providers[key];
}

/**
 * Removes a context provider.
 * @param {string} key The string key to remove.
 */
function remove(key) {
  delete providers[key];
}

/**
 * Resets the registry.  For tests.
 */
function reset() {
  providers = {};
}

/**
 * Returns a new object consisting of the latest values from each of the
 * providers.
 * @return {!Object} The error context object.
 */
function get() {
  const context = getDefaultContext();
  for (let key in providers) {
    try {
      context[key] = providers[key].call();
    } catch (e) {
      context[key] = '[error] ' + e.message;
    }
  }
  return context;
}

/**
 * Returns the default context, before any providers have been called.  It is
 * possible for applications to override these values by registering their own
 * providers for the keys.
 * @return {!Object} Error context.
 */
function getDefaultContext() {
  const context = {};
  context['location'] = urlForReporting(location);
  if (dom.isTopAccessAllowed()) {
    try {
      context['top.location'] = urlForReporting(top.location);
    } catch (e) {
      // Can not query top.location, which means we're hosted in another domain.
      context['top.location'] = '[external]';
    }
  } else {
    context['top.location'] = '[external]';
  }
  return context;
}

exports = {
  add,
  get,
  has,
  remove,
  reset,
};
