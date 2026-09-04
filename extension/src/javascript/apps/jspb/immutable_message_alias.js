/**
 * @fileoverview Re-exports ImmutableMessage for compatibility with the old
 * namespace and export style.
 */
goog.module('jspb.immutable_message.ImmutableMessage');
goog.module.declareLegacyNamespace();

const {ImmutableMessage: JspbImmutableMessage} = goog.require('jspb.immutable_message');

/** @type {typeof JspbImmutableMessage} */
const ImmutableMessage = JspbImmutableMessage;

exports = ImmutableMessage;
