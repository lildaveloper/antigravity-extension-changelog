/**
 * @fileoverview Standard error messages for errors detected when parsing
 * binary protos.
 */
goog.module('jspb.binary.errors');

/**
 * Reports that we didn't read the number of expected bytes for a message.
 * @return {!Error}
 */
function messageLengthMismatchError(
    /** number */ messageLength, /** number */ readLength) {
  // NOTE: we directly throw here instead of report because this is what we used
  // to do as well.
  return goog.DEBUG ?
      new Error(
          `Message parsing ended unexpectedly. Expected to read ` +
          `${messageLength} bytes, instead read ${
              readLength} bytes, either the ` +
          `data ended unexpectedly or the message misreported its own length`) :
      new Error();
}


/**
 * Reports an invalid wire type value.
 *
 * @return {!Error}
 */
function invalidWireTypeError(/** number */ wireType, /** number */ position) {
  return goog.DEBUG ?
      new Error(`Invalid wire type: ${wireType} (at position ${position})`) :
      new Error();
}

/**
 * Reports an invalid field number.
 *
 * @return {!Error}
 */
function invalidFieldNumberError(
    /** number */ fieldNumber, /** number */ position) {
  return goog.DEBUG ?
      new Error(
          `Invalid field number: ${fieldNumber} (at position ${position})`) :
      new Error();
}

/**
 * Reports message-set parsing faield
 * @return {!Error}
 */
function malformedBinaryBytesForMessageSet() {
  return goog.DEBUG ? new Error('Malformed binary bytes for message set') :
                      new Error();
}

/**
 * Reports a failure to find an END_GROUP tag because we hit end of stream.
 *
 * @return {!Error}
 */
function unmatchedStartGroupEofError() {
  return goog.DEBUG ? new Error('Unmatched start-group tag: stream EOF') :
                      new Error();
}

/**
 * Reports a general failure to find an END_GROUP tag matching a START_GROUP.
 *
 * @return {!Error}
 */
function unmatchedStartGroupError() {
  return goog.DEBUG ? new Error('Unmatched end-group tag') : new Error();
}

/**
 * Reports that parsing a group did not end on an END_GROUP tag.
 *
 * @return {!Error}
 */
function groupDidNotEndWithEndGroupError() {
  return goog.DEBUG ?
      new Error('Group submessage did not end with an END_GROUP tag') :
      new Error();
}

/**
 * Reports that the varint is invalid in some way.
 *
 * @return {!Error}
 */
function invalidVarintError() {
  return goog.DEBUG ? new Error('Failed to read varint, encoding is invalid.') :
                      new Error();
}

/**
 * Reports that we read more bytes than were available.
 *
 * @return {!Error}
 */
function readTooFarError(
    /** number */ expectedLength, /** number */ readLength) {
  return goog.DEBUG ? new Error(`Tried to read past the end of the data ${
                          readLength} > ${expectedLength}`) :
                      new Error();
}

/**
 * Reports that we read more bytes than were available.
 *
 * @return {!Error}
 */
function negativeByteLengthError(
    /** number */ length) {
  return goog.DEBUG ?
      new Error(`Tried to read a negative byte length: ${length}`) :
      new Error();
}

/**
 * Reports that maximum recursion depth was exceeded.
 *
 * @return {!Error}
 */
function maxRecursionDepthExceededError() {
  // If there are no depth guards, the VM will throw a RangeError. We want to
  // throw a SyntaxError instead to match Json.parse().
  return goog.DEBUG ?
      new SyntaxError('Maximum protobuf recursion depth exceeded') :
      new SyntaxError();
}

exports = {
  messageLengthMismatchError,
  groupDidNotEndWithEndGroupError,
  invalidFieldNumberError,
  invalidVarintError,
  invalidWireTypeError,
  malformedBinaryBytesForMessageSet,
  maxRecursionDepthExceededError,
  negativeByteLengthError,
  readTooFarError,
  unmatchedStartGroupError,
  unmatchedStartGroupEofError,
};
