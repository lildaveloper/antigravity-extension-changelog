// source: java/com/google/devtools/sourcerers/workspace/workspace_id.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('devtools.sourcerers.ImmutableWorkspaceId');
goog.provide('devtools.sourcerers.MutableWorkspaceId');
goog.provide('devtools.sourcerers.ReadonlyWorkspaceId');
goog.provide('devtools.sourcerers.WorkspaceId');
/** @provideAlreadyProvided */
goog.provide('devtools.sourcerers.WorkspaceId.Vcs');

goog.require('jspb$b$devtools$sourcerers$WorkspaceId');
goog.require('jspb$devtools$sourcerers$ImmutableWorkspaceId');
goog.require('jspb$devtools$sourcerers$MutableWorkspaceId');
goog.require('jspb$e.devtools$sourcerers$WorkspaceId$Vcs');
/** @suppress {extraRequire} */
goog.require('jspb$o$devtools$sourcerers$WorkspaceId');
goog.require('jspb.bytestring');
goog.require('jspb_internal_public_for_gencode');
goog.requireType('jspb$ro.devtools$sourcerers$ReadonlyWorkspaceId');
goog.requireType('jspb.binary.reader');

/** @const */
devtools.sourcerers.WorkspaceId = jspb$devtools$sourcerers$MutableWorkspaceId;

/**
 * Deserializes binary data (in protobuf wire format).
 * @const {function(?jspb_internal_public_for_gencode.BinarySource,!jspb_internal_public_for_gencode.BinaryReaderOptions=):!jspb$devtools$sourcerers$MutableWorkspaceId}
 */
jspb$devtools$sourcerers$MutableWorkspaceId.deserializeBinary = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeDeserializeBinaryFunction(
    jspb$devtools$sourcerers$MutableWorkspaceId, jspb$b$devtools$sourcerers$WorkspaceId.fields));

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @const {function(!jspb$devtools$sourcerers$MutableWorkspaceId,!jspb.binary.reader.BinaryReader):!jspb$devtools$sourcerers$MutableWorkspaceId}
 */
jspb$devtools$sourcerers$MutableWorkspaceId.deserializeBinaryFromReader = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeDeserializeBinaryFromReaderFunction(
    jspb$b$devtools$sourcerers$WorkspaceId.fields));

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @param {!jspb$ro.devtools$sourcerers$ReadonlyWorkspaceId} msg
 * @return {!Uint8Array}
 */
jspb$devtools$sourcerers$MutableWorkspaceId.serializeBinary = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeSerializeBinaryFunction(jspb$b$devtools$sourcerers$WorkspaceId.fields));

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @param {!jspb$ro.devtools$sourcerers$ReadonlyWorkspaceId} msg
 * @return {!jspb.bytestring.ByteString}
 */
jspb$devtools$sourcerers$MutableWorkspaceId.serializeBinaryToByteString = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeSerializeBinaryToByteStringFunction(jspb$b$devtools$sourcerers$WorkspaceId.fields));

/**
 * Ensures the representation of the given class is annotated with
 * sufficient type information for Message.equals to be reliable.
 * @const {function(!jspb$ro.devtools$sourcerers$ReadonlyWorkspaceId): undefined}
 */
jspb$devtools$sourcerers$MutableWorkspaceId.makeCrossSerializerComparisonsCompatible = /** @pureOrBreakMyCode */( jspb_internal_public_for_gencode.makeCrossSerializerComparisonsCompatibleFunction(
    jspb$devtools$sourcerers$MutableWorkspaceId, jspb$b$devtools$sourcerers$WorkspaceId.fields));

/**
 * Returns an opaque binary type table for a message.
 * @const {function(): !jspb_internal_public_for_gencode.OpaqueTypeTable<!jspb$devtools$sourcerers$MutableWorkspaceId,!jspb$devtools$sourcerers$ImmutableWorkspaceId>}
 */
jspb$devtools$sourcerers$MutableWorkspaceId.getTypeTable = /** @pureOrBreakMyCode */( jspb_internal_public_for_gencode.makeGetTypeTable(
    jspb$devtools$sourcerers$MutableWorkspaceId, jspb$b$devtools$sourcerers$WorkspaceId.fields));

/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @deprecated this method is being restricted by LSC in go/lsc-constrain-jspb-object-format-usage.
 * @const {function(!jspb$devtools$sourcerers$MutableWorkspaceId.ObjectFormat): !jspb$devtools$sourcerers$MutableWorkspaceId}
 */
jspb$devtools$sourcerers$MutableWorkspaceId.fromObject = jspb$o$devtools$sourcerers$WorkspaceId.fromObject;

/** @const */
devtools.sourcerers.MutableWorkspaceId = jspb$devtools$sourcerers$MutableWorkspaceId;

/** @typedef{!jspb$ro.devtools$sourcerers$ReadonlyWorkspaceId} */
devtools.sourcerers.ReadonlyWorkspaceId;

/** @const {function(!jspb$ro.devtools$sourcerers$ReadonlyWorkspaceId):!Uint8Array} */
jspb$devtools$sourcerers$ImmutableWorkspaceId.serializeBinary = jspb$devtools$sourcerers$MutableWorkspaceId.serializeBinary;

/** @const {function(!jspb$ro.devtools$sourcerers$ReadonlyWorkspaceId):!jspb.bytestring.ByteString} */
jspb$devtools$sourcerers$ImmutableWorkspaceId.serializeBinaryToByteString = jspb$devtools$sourcerers$MutableWorkspaceId.serializeBinaryToByteString;

/** @const {function(?jspb_internal_public_for_gencode.BinarySource, !jspb_internal_public_for_gencode.BinaryReaderOptions=):!jspb$devtools$sourcerers$ImmutableWorkspaceId} */
jspb$devtools$sourcerers$ImmutableWorkspaceId.deserializeBinary = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeDeserializeBinaryImmutableFunction(jspb$devtools$sourcerers$MutableWorkspaceId.deserializeBinary));

/** @const {function(!jspb$ro.devtools$sourcerers$ReadonlyWorkspaceId): undefined} */
jspb$devtools$sourcerers$ImmutableWorkspaceId.makeCrossSerializerComparisonsCompatible = jspb$devtools$sourcerers$MutableWorkspaceId.makeCrossSerializerComparisonsCompatible;

/** @const */
devtools.sourcerers.ImmutableWorkspaceId = jspb$devtools$sourcerers$ImmutableWorkspaceId;

/** @const */
jspb$devtools$sourcerers$MutableWorkspaceId.Vcs = jspb$e.devtools$sourcerers$WorkspaceId$Vcs;
