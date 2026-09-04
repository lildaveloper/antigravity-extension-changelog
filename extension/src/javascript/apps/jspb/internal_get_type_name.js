/**
 * @fileoverview internal utilities for retrieving JSPB type names.
 * @package
 *
 * DO NOT RENAME THE TYPE NAME PROPERTY: it is used variously, e.g. in
 * javascript/apps/jspb/testing/install_jspb_custom_formatter.js
 *
 * DO NOT USE THIS OUTSIDE OF THIS PACKAGE.
 */
goog.module('jspb.internal_get_type_name');

const {GENERATE_TYPE_NAME_PROPERTIES} = goog.require('jspb.internal_options');
const {Message} = goog.require('jspb');

/**
 * @param {!Function} messageCtor
 * @return {string|undefined}
 */
function getCtorTypeName(messageCtor) {
  if (!GENERATE_TYPE_NAME_PROPERTIES) return undefined;
  return /** @type {{internalDoNotUse_debugOnlyProtoTypeName: (string|undefined)}} */ (
      /** @type {?} */ (
        messageCtor))
        .internalDoNotUse_debugOnlyProtoTypeName;
}

/**
 * @param {!Message} messageInstance
 * @return {string|undefined}
 */
function getMessageInstanceTypeName(messageInstance) {
  if (!(messageInstance instanceof Message)) return undefined;
  return getCtorTypeName(messageInstance.constructor);
}

/** Installs our jspbGetTypeName export for debugging. */
function installTypeNameExport() {
  if (GENERATE_TYPE_NAME_PROPERTIES) {
    const prev = goog.global['jspbGetTypeName'];
    // Chain to support multiple versions of the message runtime being loaded in
    // the same environment.
    goog.global['jspbGetTypeName'] = prev ?
        ((x) => prev(x) || getMessageInstanceTypeName(x)) :
        getMessageInstanceTypeName;
  }
}

exports = {
  getCtorTypeName,
  getMessageInstanceTypeName,
  installTypeNameExport,
};
