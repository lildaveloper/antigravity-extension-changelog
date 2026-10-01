// source: devtools/jetski/boq/provisioning_service/proto/provisioning.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {useOfGoogProvide}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('proto.devtools_jetski_provisioning.ImmutableListDeploymentsRequest');
goog.provide('proto.devtools_jetski_provisioning.ListDeploymentsRequest');
/** @provideAlreadyProvided */
goog.provide('proto.devtools_jetski_provisioning.ListDeploymentsRequest.View');
goog.provide('proto.devtools_jetski_provisioning.MutableListDeploymentsRequest');
goog.provide('proto.devtools_jetski_provisioning.ReadonlyListDeploymentsRequest');

goog.require('jspb$b$devtools_jetski_provisioning$ListDeploymentsRequest');
goog.require('jspb$devtools_jetski_provisioning$ImmutableListDeploymentsRequest');
goog.require('jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest');
goog.require('jspb$e.devtools_jetski_provisioning$ListDeploymentsRequest$View');
/** @suppress {extraRequire} */
goog.require('jspb$o$devtools_jetski_provisioning$ListDeploymentsRequest');
goog.require('jspb.bytestring');
goog.require('jspb_internal_public_for_gencode');
goog.requireType('jspb$ro.devtools_jetski_provisioning$ReadonlyListDeploymentsRequest');
goog.requireType('jspb.binary.reader');

/** @const */
proto.devtools_jetski_provisioning.ListDeploymentsRequest = jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest;

/**
 * Deserializes binary data (in protobuf wire format).
 * @const {function(?jspb_internal_public_for_gencode.BinarySource,!jspb_internal_public_for_gencode.BinaryReaderOptions=):!jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest}
 */
jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest.deserializeBinary = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeDeserializeBinaryFunction(
    jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest, jspb$b$devtools_jetski_provisioning$ListDeploymentsRequest.fields));

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @const {function(!jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest,!jspb.binary.reader.BinaryReader):!jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest}
 */
jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest.deserializeBinaryFromReader = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeDeserializeBinaryFromReaderFunction(
    jspb$b$devtools_jetski_provisioning$ListDeploymentsRequest.fields));

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyListDeploymentsRequest} msg
 * @return {!Uint8Array}
 */
jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest.serializeBinary = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeSerializeBinaryFunction(jspb$b$devtools_jetski_provisioning$ListDeploymentsRequest.fields));

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyListDeploymentsRequest} msg
 * @return {!jspb.bytestring.ByteString}
 */
jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest.serializeBinaryToByteString = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeSerializeBinaryToByteStringFunction(jspb$b$devtools_jetski_provisioning$ListDeploymentsRequest.fields));

/**
 * Ensures the representation of the given class is annotated with
 * sufficient type information for Message.equals to be reliable.
 * @const {function(!jspb$ro.devtools_jetski_provisioning$ReadonlyListDeploymentsRequest): undefined}
 */
jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest.makeCrossSerializerComparisonsCompatible = /** @pureOrBreakMyCode */( jspb_internal_public_for_gencode.makeCrossSerializerComparisonsCompatibleFunction(
    jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest, jspb$b$devtools_jetski_provisioning$ListDeploymentsRequest.fields));

/**
 * Returns an opaque binary type table for a message.
 * @const {function(): !jspb_internal_public_for_gencode.OpaqueTypeTable<!jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest,!jspb$devtools_jetski_provisioning$ImmutableListDeploymentsRequest>}
 */
jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest.getTypeTable = /** @pureOrBreakMyCode */( jspb_internal_public_for_gencode.makeGetTypeTable(
    jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest, jspb$b$devtools_jetski_provisioning$ListDeploymentsRequest.fields));

/**
 * Loads data from an object into a new instance of this proto.
 *
 * The object format is **not a stable serialization format**.
 * See go/jspb-api-gotchas#objects.
 *
 * @private
 * @deprecated this method is being restricted by LSC in go/lsc-constrain-jspb-object-format-usage.
 * @const {function(!jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest.ObjectFormat): !jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest}
 */
jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest.fromObject = jspb$o$devtools_jetski_provisioning$ListDeploymentsRequest.fromObject;

/** @const */
proto.devtools_jetski_provisioning.MutableListDeploymentsRequest = jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest;

/** @typedef{!jspb$ro.devtools_jetski_provisioning$ReadonlyListDeploymentsRequest} */
proto.devtools_jetski_provisioning.ReadonlyListDeploymentsRequest;

/** @const {function(!jspb$ro.devtools_jetski_provisioning$ReadonlyListDeploymentsRequest):!Uint8Array} */
jspb$devtools_jetski_provisioning$ImmutableListDeploymentsRequest.serializeBinary = jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest.serializeBinary;

/** @const {function(!jspb$ro.devtools_jetski_provisioning$ReadonlyListDeploymentsRequest):!jspb.bytestring.ByteString} */
jspb$devtools_jetski_provisioning$ImmutableListDeploymentsRequest.serializeBinaryToByteString = jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest.serializeBinaryToByteString;

/** @const {function(?jspb_internal_public_for_gencode.BinarySource, !jspb_internal_public_for_gencode.BinaryReaderOptions=):!jspb$devtools_jetski_provisioning$ImmutableListDeploymentsRequest} */
jspb$devtools_jetski_provisioning$ImmutableListDeploymentsRequest.deserializeBinary = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeDeserializeBinaryImmutableFunction(jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest.deserializeBinary));

/** @const {function(!jspb$ro.devtools_jetski_provisioning$ReadonlyListDeploymentsRequest): undefined} */
jspb$devtools_jetski_provisioning$ImmutableListDeploymentsRequest.makeCrossSerializerComparisonsCompatible = jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest.makeCrossSerializerComparisonsCompatible;

/** @const */
proto.devtools_jetski_provisioning.ImmutableListDeploymentsRequest = jspb$devtools_jetski_provisioning$ImmutableListDeploymentsRequest;

/** @const */
jspb$devtools_jetski_provisioning$MutableListDeploymentsRequest.View = jspb$e.devtools_jetski_provisioning$ListDeploymentsRequest$View;


var jspb$google$protobuf$MutableAny;
Object.defineProperty(this, 'jspb$google$protobuf$MutableAny', {
  get() { return jspb$google$protobuf$MutableAny; },
  set(v) { jspb$google$protobuf$MutableAny = v; },
