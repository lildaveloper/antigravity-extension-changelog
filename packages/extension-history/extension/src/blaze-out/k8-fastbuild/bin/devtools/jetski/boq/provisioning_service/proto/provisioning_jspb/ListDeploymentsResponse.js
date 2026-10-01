// source: devtools/jetski/boq/provisioning_service/proto/provisioning.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('proto.devtools_jetski_provisioning.ImmutableListDeploymentsResponse');
goog.provide('proto.devtools_jetski_provisioning.ListDeploymentsResponse');
goog.provide('proto.devtools_jetski_provisioning.MutableListDeploymentsResponse');
goog.provide('proto.devtools_jetski_provisioning.ReadonlyListDeploymentsResponse');

goog.require('jspb$b$devtools_jetski_provisioning$ListDeploymentsResponse');
goog.require('jspb$devtools_jetski_provisioning$ImmutableListDeploymentsResponse');
goog.require('jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse');
/** @suppress {extraRequire} */
goog.require('jspb$o$devtools_jetski_provisioning$ListDeploymentsResponse');
goog.require('jspb.bytestring');
goog.require('jspb_internal_public_for_gencode');
goog.requireType('jspb$ro.devtools_jetski_provisioning$ReadonlyListDeploymentsResponse');
goog.requireType('jspb.binary.reader');

/** @const */
proto.devtools_jetski_provisioning.ListDeploymentsResponse = jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse;

/**
 * Deserializes binary data (in protobuf wire format).
 * @const {function(?jspb_internal_public_for_gencode.BinarySource,!jspb_internal_public_for_gencode.BinaryReaderOptions=):!jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse}
 */
jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse.deserializeBinary = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeDeserializeBinaryFunction(
    jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse, jspb$b$devtools_jetski_provisioning$ListDeploymentsResponse.fields));

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @const {function(!jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse,!jspb.binary.reader.BinaryReader):!jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse}
 */
jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse.deserializeBinaryFromReader = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeDeserializeBinaryFromReaderFunction(
    jspb$b$devtools_jetski_provisioning$ListDeploymentsResponse.fields));

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyListDeploymentsResponse} msg
 * @return {!Uint8Array}
 */
jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse.serializeBinary = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeSerializeBinaryFunction(jspb$b$devtools_jetski_provisioning$ListDeploymentsResponse.fields));

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyListDeploymentsResponse} msg
 * @return {!jspb.bytestring.ByteString}
 */
jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse.serializeBinaryToByteString = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeSerializeBinaryToByteStringFunction(jspb$b$devtools_jetski_provisioning$ListDeploymentsResponse.fields));

/**
 * Ensures the representation of the given class is annotated with
 * sufficient type information for Message.equals to be reliable.
 * @const {function(!jspb$ro.devtools_jetski_provisioning$ReadonlyListDeploymentsResponse): undefined}
 */
jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse.makeCrossSerializerComparisonsCompatible = /** @pureOrBreakMyCode */( jspb_internal_public_for_gencode.makeCrossSerializerComparisonsCompatibleFunction(
    jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse, jspb$b$devtools_jetski_provisioning$ListDeploymentsResponse.fields));

/**
 * Returns an opaque binary type table for a message.
 * @const {function(): !jspb_internal_public_for_gencode.OpaqueTypeTable<!jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse,!jspb$devtools_jetski_provisioning$ImmutableListDeploymentsResponse>}
 */
jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse.getTypeTable = /** @pureOrBreakMyCode */( jspb_internal_public_for_gencode.makeGetTypeTable(
    jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse, jspb$b$devtools_jetski_provisioning$ListDeploymentsResponse.fields));

/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @private
 * @deprecated this method is being restricted by LSC in go/lsc-constrain-jspb-object-format-usage.
 * @const {function(!jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse.ObjectFormat): !jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse}
 */
jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse.fromObject = jspb$o$devtools_jetski_provisioning$ListDeploymentsResponse.fromObject;

/** @const */
proto.devtools_jetski_provisioning.MutableListDeploymentsResponse = jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse;

/** @typedef{!jspb$ro.devtools_jetski_provisioning$ReadonlyListDeploymentsResponse} */
proto.devtools_jetski_provisioning.ReadonlyListDeploymentsResponse;

/** @const {function(!jspb$ro.devtools_jetski_provisioning$ReadonlyListDeploymentsResponse):!Uint8Array} */
jspb$devtools_jetski_provisioning$ImmutableListDeploymentsResponse.serializeBinary = jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse.serializeBinary;

/** @const {function(!jspb$ro.devtools_jetski_provisioning$ReadonlyListDeploymentsResponse):!jspb.bytestring.ByteString} */
jspb$devtools_jetski_provisioning$ImmutableListDeploymentsResponse.serializeBinaryToByteString = jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse.serializeBinaryToByteString;

/** @const {function(?jspb_internal_public_for_gencode.BinarySource, !jspb_internal_public_for_gencode.BinaryReaderOptions=):!jspb$devtools_jetski_provisioning$ImmutableListDeploymentsResponse} */
jspb$devtools_jetski_provisioning$ImmutableListDeploymentsResponse.deserializeBinary = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeDeserializeBinaryImmutableFunction(jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse.deserializeBinary));

/** @const {function(!jspb$ro.devtools_jetski_provisioning$ReadonlyListDeploymentsResponse): undefined} */
jspb$devtools_jetski_provisioning$ImmutableListDeploymentsResponse.makeCrossSerializerComparisonsCompatible = jspb$devtools_jetski_provisioning$MutableListDeploymentsResponse.makeCrossSerializerComparisonsCompatible;

/** @const */
proto.devtools_jetski_provisioning.ImmutableListDeploymentsResponse = jspb$devtools_jetski_provisioning$ImmutableListDeploymentsResponse;
