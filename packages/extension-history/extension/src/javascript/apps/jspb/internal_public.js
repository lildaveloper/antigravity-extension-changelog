/**
 * @fileoverview Public APIs exposed purely for use by generated code.  Use of
 * these APIs outside of that context is not supported and actively discouraged.
 * @public
 *
 * DO NOT USE THIS OUTSIDE OF THIS PACKAGE.
 */

goog.module('jspb_internal_public_for_gencode');
goog.module.declareLegacyNamespace();

const asserts = goog.require('goog.asserts');
const garray = goog.require('goog.array');
const {ANY_PROTOTYPE_MARKER_VALUE, DoNotFreezeToken, GENERATED_SUBCLASS_MARKER, HAS_MESSAGE_ID, NO_MESSAGE_ID, OrUndefinedToken, SUPPORTS_HAS_INSTANCE, SerializeBinaryFnHolder, getInternalArray, invisiblePropValue, isImmutableMessage, isInternalMessage, registerExtensionsForDebugging} = goog.require('jspb.internal');
const {ArrayState, ArrayStateFlags, TypeSpecificApiFormat, getMessageArrayState, hasFlagBit} = goog.require('jspb.internal_array_state');
const {BinaryReader, BinaryReaderOptions, LIMIT_RECURSION_DEPTH} = goog.require('jspb.binary.reader');
const {ByteSource} = goog.requireType('jspb.binary.bytesource');
const {ByteString} = goog.require('jspb.bytestring');
const {DescriptorTypeReference, EnumDescriptorTypeReference} = goog.require('google3.javascript.apps.jspb.descriptor');
const {ExtensionReference, makeDescriptorGetter, makeEnumDescriptorGetter, makeExtensionReference} = goog.require('google3.javascript.apps.jspb.internal_descriptor');
const {GENERATE_FIELDS_INTERFACE_FOR_TESTING, GENERATE_TYPE_NAME_PROPERTIES, USE_DETAILED_MESSAGE_TYPE_HIERARCHY, getUnsafeDisableJspbAnyTypeChecks} = goog.require('jspb.internal_options');
const {LAZILY_PARSE_LATE_LOADED_EXTENSIONS_SYMBOL} = goog.require('jspb.internal_symbols');
const {Message} = goog.require('jspb');
const {MutableMessage} = goog.require('jspb.mutable_message');
const {OpaqueTypeTable} = goog.require('google3.javascript.apps.jspb.opaque_type_table_internal');
const {RecordExtensionRegistry, createMessageExtension, createPrimitiveExtension, createRepeatedMessageExtension, createRepeatedPrimitiveExtension} = goog.require('jspb.internal_extension_field_info');
const {coerceToNullishBytes, getDefaultImmutableInstance, messageFromInlineStorage} = goog.require('jspb.internal_accessor_helpers');
const {defineTypeGuard} = goog.require('google3.javascript.common.asserts.asserts');
const {deserializeAsImmutable, leakedMutableSubstructures, maybeCopyOnWrite} = goog.require('jspb.internal_immutability');
const {deserializeBinary, makeCrossSerializerComparisonsCompatible, makeDeserializeBinaryFromReaderFromBinaryFields, serializeBinary, serializeBinaryToByteString} = goog.require('jspb_internal_binary');
const {fromFieldsForTestingGeneric, getFieldsForTestingGeneric} = goog.require('google3.javascript.apps.jspb.internal_records');
const {fromObjectAnyValue, toObjectAnyValue} = goog.require('jspb.internal_dump');
const {getBytesFieldWithDefault, getFieldNullable, getFieldNullableInternal, getStringFieldWithDefault, setFieldIgnoringImmutability, setProto3BytesField, setProto3StringField, setWrapperField} = goog.require('jspb_internal_adapters');
const {getCtorTypeName, installTypeNameExport} = goog.require('jspb.internal_get_type_name');
const {logNewArray} = goog.require('jspb.internal_operations');
const {maxRecursionDepthExceededError} = goog.require('jspb.binary.errors');
const {toGbigint} = goog.require('google3.javascript.common.bigint.index');
const {wrappedTypeTableForBinaryFields} = goog.require('google3.javascript.apps.jspb.internal_binary_table');

// Install jspbGetTypeName for debugging. All generated messages require this
// file so this ensures it's available.
installTypeNameExport();

/**
 * @define {boolean} Whether to generate toObject methods for objects. Turn
 *     this off, if you do not want toObject to be ever used in your project.
 *     When turning off this flag, consider adding a conformance test that bans
 *     calling toObject. Enabling this will disable the JSCompiler's ability to
 *     dead code eliminate fields used in protocol buffers that are never used
 *     in an application.
 */
const GENERATE_TO_OBJECT = goog.define('jspb.Message.GENERATE_TO_OBJECT', true);


/**
 * @define {boolean} Whether to generate fromObject methods for objects. Turn
 *     this off, if you do not want fromObject to be ever used in your project.
 *     When turning off this flag, consider adding a conformance test that bans
 *     calling fromObject. Enabling this might disable the JSCompiler's ability
 *     to dead code eliminate fields used in protocol buffers that are never
 *     used in an application.
 *     By default this is enabled for test code only.
 */
const GENERATE_FROM_OBJECT = goog.define(
    'jspb.Message.GENERATE_FROM_OBJECT', !goog.DISALLOW_TEST_ONLY_CODE);


/**
 * Converts a JsPb repeated message field into an object list.
 * @param {!ReadonlyArray<T>} field The repeated message field to be
 *     converted.
 * @param {function(T_OR_NULL_UNDEFINED):(!O|undefined)}
 *     toObjectFn The toObject function for this field.  We need to pass this
 *     for effective dead code removal.
 * @return {!Array<O>} An array of converted message objects.
 * @template T, O
 * Use go/closure-ttl  to create a `?T|undefined` type
 * @template T_OR_NULL_UNDEFINED := union(T, 'null', 'undefined') =:
 */
function toObjectList(field, toObjectFn) {
  // Not using array.map in the generated code to keep it small.
  // And not using it here to avoid a function call.
  const result = logNewArray([]);
  for (let i = 0; i < field.length; i++) {
    result.push(toObjectFn(field[i]));
  }
  return result;
}

/**
 * Converts an object-formatted list into a repeated message field.
 *
 * @param {?Array<!O_ALIAS>|undefined} field The repeated message
 *     field to be converted.
 * @param {function(!O):!T} fromObjectFn The fromObject function for type T.
 * @return {?Array<!T>|undefined} An array of converted message objects.
 * @template T, O
 * Use go/closure-ttl  to create a `?O|undefined` type
 * @template O_ALIAS := O =:
 */
function fromObjectList(field, fromObjectFn) {
  // Not using array.map in the generated code to keep it small.
  // And not using it here to avoid a function call.
  const result = logNewArray([]);
  if (field == null) {
    return field;
  }
  for (let i = 0; i < field.length; i++) {
    if (field[i] != null) {
      result.push(fromObjectFn(field[i]));
    }
  }
  return result;
}

/**
 * Converts an object-formatted message field into a JSPB message.
 *
 * @param {?O_OR_NULL_OR_UNDEFINED} field The object field to be converted.
 * @param {function(!O):!T} fromObjectFn The fromObject function for type T.
 * @return {?T|undefined} A converted message object, if any.
 * @template T, O
 * Use go/closure-ttl to create a `?O|undefined` type
 * @template O_OR_NULL_OR_UNDEFINED := union(O, 'null', 'undefined') =:
 */
function fromObjectNullable(field, fromObjectFn) {
  return field == null ? field : fromObjectFn(field);
}

/**
 * Coerce a 'bytes' field to base 64 or Uint8Array.
 * @param {string|!Uint8Array|!ByteString|null} value
 * @return {string|!Uint8Array|null} The field's coerced value.
 */
function bytesAsBase64OrUint8Array(value) {
  return value instanceof ByteString ? value.legacyUnwrap() : value;
}


/** @return {string} */
function nonNullByteStringAsB64(/** !ByteString*/ b) {
  return b.asBase64();
}

/** @return {string|null|undefined} */
function byteStringAsB64(/** !ByteString|null|undefined */ b) {
  return b == null ? b : b.asBase64();
}

/**
 * Coerce a repeated 'bytes' field to an array of base 64 strings.
 * Note: the returned array should be treated as immutable.
 * @param {!Array<!ByteString>} value
 * @return {!Array<string>} The field's coerced value.
 */
function byteStringListAsB64(value) {
  return logNewArray(garray.map(value, nonNullByteStringAsB64));
}

/** @return {!Uint8Array} */
function nonNullByteStringAsU8(/** !ByteString*/ b) {
  return b.asUint8Array();
}

/** @return {!Uint8Array|null|undefined} */
function byteStringAsU8(/** !ByteString|null|undefined */ b) {
  return b == null ? b : b.asUint8Array();
}

/**
 * Coerce a repeated 'bytes' field to an array of Uint8Array byte buffers.
 * Note: the returned array should be treated as immutable.
 * Note that Uint8Array is not supported on IE versions before 10 nor on Opera
 * Mini. @see http://caniuse.com/Uint8Array
 * @param {!Array<!ByteString>} value
 * @return {!Array<!Uint8Array>} The field's coerced value.
 */
function byteStringListAsU8(value) {
  return logNewArray(garray.map(value, nonNullByteStringAsU8));
}

/** @return {string|!Uint8Array} */
function nonNullByteStringLegacyUnwrap(/** !ByteString*/ b) {
  return b.legacyUnwrap();
}

/** @return {string|!Uint8Array|null|undefined} */
function byteStringAsBase64OrUint8Array(/** null|undefined|!ByteString*/ b) {
  return b == null ? b : b.legacyUnwrap();
}

/**
 * @param {?} v The value to normalize. True bigints will be converted to
 *     numbers when within the safe integer range and strings otherwise.
 *     Non-bigints will be returned as-is.
 * @return {?}
 */
function normalizeBigInt(v) {
  if (typeof v === 'bigint') {
    const num = Number(v);
    return Number.isSafeInteger(num) ? num : '' + v;
  }

  return v;
}

/**
 * Returns the map formatted as an array of key-value pairs, suitable for the
 * toObject() form of a message.
 *
 * @template K, V
 * Use go/closure-ttl  to create a `?V|undefined` type
 * @template V_OR_NULL_UNDEFINED := union(V, 'null', 'undefined') =:
 * @param {!Map<K,V>} map
 * @param {function(V_OR_NULL_UNDEFINED):(!Object|undefined)=}
 *     valueToObject
 *    The static toObject() method, if V is a message type.
 * @return {!Array<!Array<!Object>>}
 */
function mapToObject(map, valueToObject) {
  // this would be more natural as a call to Array.from passing a mapper
  // but that is disallowed by some applications.
  const entries = logNewArray([]);
  map.forEach(valueToObject ? (v, k) => {
    entries.push(logNewArray([normalizeBigInt(k), valueToObject(v)]));
  } : (v, k) => {
    entries.push(logNewArray([normalizeBigInt(k), normalizeBigInt(v)]));
  });
  return entries;
}

/**
 * Normalize `null` -> `undefined`, and slice arrays, for the `ObjectFormat` of
 * a message.
 * @return {?}
 */
function toObjectPrimitive(/** ? */ v) {
  if (Array.isArray(v)) {
    return logNewArray(v.map(normalizeBigInt));
  }

  return v == null ? undefined : normalizeBigInt(v);
}

/**
 * Normalizes a bytes field for toObject. Returns base64 string, array of
 * string (for repeated field), or normalizes null to undefined.
 * @return {string|!Array<string>|undefined}
 */
function toObjectBytes(/** ?ByteString|!ReadonlyArray<!ByteString> */ value) {
  return value == null     ? undefined :
      Array.isArray(value) ? logNewArray(value.map(b => b.asBase64())) :
                             /** @type {!ByteString} */ (value).asBase64();
}

/**
 * Returns a Map from the given array of key-value pairs when the values are
 * of message type. The values in the array must match the format returned by
 * their message type's toObject() method.
 *
 * @template K, V
 * @template V_OR_NULL_UNDEFINED := union(V, 'null', 'undefined') =:
 * @param {!Map<K,V>} map
 * @param {!Array<!Array<?>>} entries
 * @param {(function(?):V_OR_NULL_UNDEFINED)=} valueFromObject
 *    The fromObject function for type V.
 * @return {!Map<K, V>}
 */
function mapFromObject(map, entries, valueFromObject) {
  for (let i = 0; i < entries.length; i++) {
    const key = entries[i][0];
    const value =
        valueFromObject ? valueFromObject(entries[i][1]) : entries[i][1];
    map.set(key, value);
  }
  return map;
}

/**
 * Virtual baseclass used by generated code.
 *
 * This class does not exist at runtime in compiled code: do not reference it.
 *
 * @extends {MutableMessage<I>}
 * @template I
 */
class GeneratedMessageImpl extends MutableMessage {
  /**
   * Builds this message into an immutable one.
   *
   * @public
   * @return {!I}
   * @override
   * @tsType (): I
   */
  toImmutable() {
    return super.toImmutable();
  }

  /**
   * Returns a mutable copy of this message.
   *
   * @protected
   * @return {!THIS}
   * @this {THIS}
   * @template THIS
   * @override
   * @tsType (): this
   */
  toMutable() {
    return super.toMutable();
  }
}

if (asserts.ENABLE_ASSERTS && USE_DETAILED_MESSAGE_TYPE_HIERARCHY) {
  GeneratedMessageImpl.prototype[GENERATED_SUBCLASS_MARKER] = true;
}

/*
 * Install hasInstance handlers.
 *
 * Technically, the runtime instances declared as `ImmutableMessage` will
 * have `MutableMessage` in their prototype chain; so an `instanceof` check
 * will be a highly incorrect means to decide a value's immutability. For this
 * reason, we should prevent `instanceof` checks on `MutableMessage`, but we
 * have to revert the handler on `GeneratedMessage`.
 */
if (SUPPORTS_HAS_INSTANCE && USE_DETAILED_MESSAGE_TYPE_HIERARCHY) {
  // TODO(b/219105470): use defineProperty once JSC supports it
  Object.defineProperties(GeneratedMessageImpl, {
    [Symbol.hasInstance]: invisiblePropValue(Object[Symbol.hasInstance]),
  });
  asserts.assert(
      GeneratedMessageImpl[Symbol.hasInstance] === Object[Symbol.hasInstance],
      'broken defineProperties implementation');
}

/**
 * Virtual baseclass used by generated code.
 *
 * This class does not exist at runtime in compiled code: do not reference it.
 *
 * This is conditional so that we get detailed type overrides in DEBUG but
 * they do not incur additional costs due to the length of their prototype
 * chain in production (especially during message construction.
 *
 * @type {typeof GeneratedMessageImpl}
 */
const GeneratedMessage = /** @type {typeof GeneratedMessageImpl} */ (
    USE_DETAILED_MESSAGE_TYPE_HIERARCHY ? GeneratedMessageImpl : Message);

/** Field number for the `type_url` field. */
const ANY_TYPE_URL_FIELD_NUMBER = 1;

/** Field number for the `value` field. */
const ANY_VALUE_FIELD_NUMBER = 2;

/** @return {!ByteString} */
function getAnyValueField(/** !Message */ any) {
  const value = getFieldNullable(any, ANY_VALUE_FIELD_NUMBER, NO_MESSAGE_ID);
  if (Array.isArray(value) || (value instanceof Message)) {
    throw new Error(
        'Cannot access the Any.value field on Any protos encoded using the jspb format, call unpackJspb instead');
  }
  return getBytesFieldWithDefault(any, ANY_VALUE_FIELD_NUMBER);
}

/**
 * Implementation of pack()
 * `T` is really proto.google.protobuf.Any, but we can't reference that type
 * here for circular deps reasons
 * @template T
 * @return {T}
 */
function packAnyValueBinary(
    /** T */ any, /** !Uint8Array|string|!ByteString*/ bytes, /** string*/ name,
    /** string= */ typeUrlPrefix) {
  asserts.assertInstanceof(any, Message);
  setAnyTypeName(any, name, typeUrlPrefix);
  return setProto3BytesField(any, ANY_VALUE_FIELD_NUMBER, bytes);
}


/**
 * Sets the type URL on an Any.
 *
 * `T` is really proto.google.protobuf.Any, but we can't reference that type
 * here for circular deps reasons.
 *
 * @template T
 * @return {T}
 */
function setAnyTypeUrl(/** T */ any, /** string */ type_url) {
  return setProto3StringField(any, ANY_TYPE_URL_FIELD_NUMBER, type_url);
}

/**
 * Sets the type name on an Any.
 *
 * `T` is really proto.google.protobuf.Any, but we can't reference that type
 * here for circular deps reasons.
 *
 * @template T
 * @return {T}
 */
function setAnyTypeName(
    /** T */ any, /** string */ name,
    /** string= */ typeUrlPrefix = 'type.googleapis.com/') {
  if (typeUrlPrefix.substr(-1) !== '/') {
    typeUrlPrefix += '/';
  }
  return setAnyTypeUrl(any, typeUrlPrefix + name);
}

/**
 * Packs a message into an Any.
 *
 * `T` is really proto.google.protobuf.Any, but we can't reference that type
 * here for circular deps reasons.
 *
 * @template T
 * @return {T}
 */
function packAnyValueJspb(
    /** T */ any, /** !Message */ value, /** string */ name,
    /** function(?):!Uint8Array= */ serializeBinaryFn,
    /** string= */ typeUrlPrefix) {
  asserts.assertInstanceof(any, Message);
  asserts.assertInstanceof(value, Message);
  const ctor = value.constructor;
  assertCorrectAnyType(ctor, name, /* isPack = */ true);
  // Store serializer as a new function on the any proto
  // Note: must cast to ? first to avoid disambiguation invalidation
  const holder =
      /** @type{!SerializeBinaryFnHolder} */ (/** @type{?} */ (value));
  // TODO(varomodt): copy this property in clone and toImmutable, and
  // maybe also attach it to the ctor as well.
  holder.serializeBinaryFnForAnyProto_ = serializeBinaryFn;
  setAnyTypeName(any, name, typeUrlPrefix);
  setWrapperField(any, ctor, ANY_VALUE_FIELD_NUMBER, value, NO_MESSAGE_ID);
  return any;
}

/**
 * @return {string}
 */
function getAnyTypeName(/** !Message */ msg) {
  return getStringFieldWithDefault(msg, ANY_TYPE_URL_FIELD_NUMBER)
      .split('/')
      .pop();
}

/**
 * @template M, I
 * @return {function(new:M,?Array<?>=)}
 */
function ctorFromCtorOrDefaultInstance(
    /** function(new:M, !Array<?>=)|I */ ctorOrDefaultInstance) {
  return typeof ctorOrDefaultInstance === 'function' ?
      ctorOrDefaultInstance :
      ctorOrDefaultInstance.constructor;
}

/**
 * @template M,I
 * @return {!M|I}
 */
function unpackAnyJspbCompat(
    /** !Message */ msg,
    /** function(new:M, !Array<?>=)|I|undefined */ ctorOrDefaultInstance,
    /** (function(!Uint8Array):M)|undefined */ deserializeFn,
    /** string */ typeName) {
  // If we have a deserialize function, we can derive a ctor.
  if (deserializeFn != null) {
    ctorOrDefaultInstance ??=
        /** @type {!DeserializeFnWithCtorAndTypeName} */ (deserializeFn)
            .internalDoNotUse_ctor;
  }

  // If this Any did not have the expected type name, return null.
  if (getAnyTypeName(msg) != typeName) return null;

  // Derive a constructor from the passed in value, since we use default
  // instances for immutable protos.
  const ctor = ctorFromCtorOrDefaultInstance(ctorOrDefaultInstance);

  // Assert that the passed in type name matches the type name on the Any.
  //
  // This should be a throw but for now we only do this in debug mode because
  // for JSPB unpacks we do not have a type name on the constructor at runtime.
  assertCorrectAnyType(ctor, typeName, /* isPack = */ false);

  // Retrieve the value field from the Any.
  let messageArray = getInternalArray(msg);
  let messageArrayState = getMessageArrayState(messageArray);
  const value = getFieldNullableInternal(
      messageArray, messageArrayState, ANY_VALUE_FIELD_NUMBER, NO_MESSAGE_ID);
  let result;
  if (!deserializeFn || value == null || isArrayOrMessage(value)) {
    // If the parent is mutable we must CoW: if we had an immutable value we
    // would have to write it back as mutable anyway to obey the types.
    if (maybeCopyOnWrite(msg)) {
      messageArray = getInternalArray(msg);
      messageArrayState = getMessageArrayState(messageArray);
    }

    // If the value was JSPB-formatted, use the inline value to construct
    // a JSPB message. We follow this path for `null` as it should be a little
    // faster than deserializing an empty byte string.
    result = getInlineAnyValue(messageArray, messageArrayState, ctor, value);
  } else {
    // Otherwise the value must be binary-formatted.
    //
    // TODO(varomodt): should we write this back? It would save the
    // deserialization cost of subsequent reads and we could attach a binary
    // serializer to avoid dropping the value (though serializeBinary would
    // get a bit more expensive).
    result = deserializeFn(
        (coerceToNullishBytes(value) ?? ByteString.empty())
            // TODO(varomodt): change deserializeFn to `function(ByteString):M`
            // so we don't have to convert ByteStrings. And enforce that it is
            // our generated deserializer.
            .asUint8Array());

    // Ensure our mutabilities match.
    if (isImmutableMessage(msg)) {
      if (!isImmutableMessage(result)) result = result.toImmutable();
    } else {
      if (isImmutableMessage(result)) result = result.toMutable();
    }
  }

  // According to the types our result should have the parent's mutability.
  asserts.assert(isImmutableMessage(result) === isImmutableMessage(msg));
  return result;
}

/**
 * Asserts that this message is mutable.
 * @param {!Message} msg
 */
function assertMutable(msg) {
  if (isImmutableMessage(msg)) {
    throw new Error('message must be mutable');
  }
}

/**
 * @param {*} value
 * @return {boolean}
 */
function isArrayOrMessage(value) {
  return Array.isArray(value) || isInternalMessage(value);
}

/**
 * Gets and wraps an inline proto field on access, with the mutability of the
 * parent message. Returns the literal value if null or undefined.
 *
 * If the value in the message is immutable and its parent is mutable, this
 * method will coerce and copy back to the parent message.
 *
 * @param {!Array<?>} parentArray
 * @param {!ArrayState} parentArrayState
 * @param {function(new:T, ?Array<?>=)} ctor
 * @param {?} inlineValue
 * @return {!T} The message field, or else null or undefined.
 * @template T
 * @suppress {visibility}
 */
function getInlineAnyValue(parentArray, parentArrayState, ctor, inlineValue) {
  // We specifically throw on invalid values (instead of treating them as
  // missing a la messageFromInlineStorage) to guard against accidentally having
  // a binary wire proto in the payload
  if (inlineValue != null && !isArrayOrMessage(inlineValue)) {
    throw new Error(`saw an invalid value of type '${
        goog.typeOf(inlineValue)}' in the Any.value field`);
  }

  // Construct a new value if we need to.
  let value = messageFromInlineStorage(
      inlineValue, ctor,
      /* constructMissing = */ true,
      /* parentArrayState = */ parentArrayState);
  if (!(value instanceof ctor)) {
    throw new Error(`incorrect type in any value: got ${
        value.constructor.displayName}, expected ${ctor.displayName}`);
  }

  // We always return a mutable value from a mutable parent.
  const isParentImmutable =
      hasFlagBit(parentArrayState, ArrayStateFlags.IS_IMMUTABLE_ARRAY);
  if (!isParentImmutable) {
    value = /** @type {!Message} */ (value).toMutable();
  }

  // Write back if we constructed a new message.
  if (inlineValue !== value) {
    setFieldIgnoringImmutability(
        parentArray, parentArrayState, ANY_VALUE_FIELD_NUMBER, value,
        NO_MESSAGE_ID);
    // The value is always mutable so we have always leaked.
    if (!isParentImmutable) leakedMutableSubstructures(parentArray);
  }
  return value;
}

/** @typedef {!ByteString|!ByteSource} */
let BinarySource;

/** @return {string} */
function getTypeName(/** function(new:Message, !Array<?>=) */ ctor) {
  let name;
  if (GENERATE_TYPE_NAME_PROPERTIES) {
    name = getCtorTypeName(ctor);
    if (name) {
      return name;
    }
  }
  name = ctor.displayName;
  if (name) {
    return name;
  }
  return ctor.name || '';
}

/**
 * Asserts that the given constructor represents the type described by the given
 * type.
 *
 * @param {function(new:Message, !Array<?>=)} ctor
 * @param {string} typeName
 * @param {boolean} isPack
 */
function assertCorrectAnyType(ctor, typeName, isPack) {
  // To be extra sure we don't retain the type name.
  if (!GENERATE_TYPE_NAME_PROPERTIES || getUnsafeDisableJspbAnyTypeChecks()) {
    return;
  }
  const ctorType = getCtorTypeName(ctor);
  if (ctorType !== typeName) {
    if (isPack) {
      throw new Error(`tried to pack type ${
          ctorType} into an Any with type label ${typeName}`);
    } else {
      throw new Error(`tried to unpack type ${
          ctorType} out of an Any with type label ${typeName}`);
    }
  }
}

// NOTE: for nearly all the factory functions below we mark the return type as
// `?` to avoid needing casts in the gencode
// For some of these it is possible to write valid types, but not all (e.g.
// `makeGetDefaultInstanceFunction`), so for simplicity we just don't bother.

/**
 * Returns a `getDefaultInstance` function implementation.
 * @return {?}
 * @nosideeffects
 */
function makeGetDefaultInstanceFunction(
    /** function(new:Message, ?Array<?>=)*/ ctor) {
  return () => getDefaultImmutableInstance(ctor);
}


/** @record */
function DeserializeFnWithCtorAndTypeName() {
  /** @type {!Function} */
  this.internalDoNotUse_ctor;
}

/**
 * Returns a `deserializeBinary` function for an immutable message
 * @return {?}
 * @nosideeffects
 */
function makeDeserializeBinaryImmutableFunction(
    /** function(!BinarySource, !BinaryReaderOptions=):!Message */
    deserializeBinaryFn) {
  const fn = /** @return {!Message} */ (
      /** !BinarySource */ source,
      /** !BinaryReaderOptions= */ options) => {
    return deserializeBinaryFn(source, options).toImmutable();
  };
  /** @type {!DeserializeFnWithCtorAndTypeName} */ (fn).internalDoNotUse_ctor =
      /** @type {!DeserializeFnWithCtorAndTypeName} */ (deserializeBinaryFn)
          .internalDoNotUse_ctor;
  return fn;
}

/**
 * Returns a `deserializeBinary` function for a mutable message.
 * @return {function(?BinarySource,!BinaryReaderOptions=):T}
 * @template T
 * @nosideeffects
 */
function makeDeserializeBinaryFunction(
    /** function(new:T, ?Array<?>=) */ ctor, /** !Array<?> */ binaryFields) {
  const fn = /** @return {!T} */ (
      /** ?BinarySource */ source,
      /** !BinaryReaderOptions= */ options) =>
      deserializeBinary(source, ctor, binaryFields, options);
  /** @type {!DeserializeFnWithCtorAndTypeName} */ (fn).internalDoNotUse_ctor =
      ctor;
  return fn;
}

/**
 * Returns a `deserializeBinaryFromReader` function implementation.
 * @return {?}
 * @suppress{visibility} accesses private properties of message
 * @nosideeffects
 */
function makeDeserializeBinaryFromReaderFunction(
    /** !Array<?> */ binaryFields) {
  return /** @return {T} @template T */ (
             /** !T */ msg, /** !BinaryReader*/ reader) => {
    maybeCopyOnWrite(msg);
    reader.pushRecursion();
    try {
      makeDeserializeBinaryFromReaderFromBinaryFields(binaryFields)(
          getInternalArray(/** @type{!Message}*/ (msg)), reader);
    } catch (err) {
      if (LIMIT_RECURSION_DEPTH && err instanceof RangeError) {
        throw maxRecursionDepthExceededError();
      }
      throw asserts.assertInstanceof(err, Error);
    } finally {
      reader.popRecursion();
    }
    return msg;
  };
}

/**
 * Returns a `serializeBinary` static function for a message.
 * @return {?}
 * @nosideeffects
 */
function makeSerializeBinaryFunction(/** !Array<?> */ binaryFields) {
  return (/** !Message */ msg) => serializeBinary(msg, binaryFields);
}

/**
 * Returns a `serializeBinaryToByteString` static function for a message.
 * @return {?}
 * @nosideeffects
 */
function makeSerializeBinaryToByteStringFunction(
    /** !Array<?> */ binaryFields) {
  return (/** !Message */ msg) =>
             serializeBinaryToByteString(msg, binaryFields);
}

/**
 * Returns an opaque binary type table for a message.
 * @template T
 * @return {function(): !OpaqueTypeTable<T>}
 * @nosideeffects
 * @tsType <
 *   T extends
 * import('google3/javascript/apps/jspb/mutable_message').MutableMessage
 * >(
 *   messageType: new (data?: unknown[] | null) => T,
 *   binaryFields: unknown[],
 * ): () => OpaqueTypeTable<T>
 */
function makeGetTypeTable(
    /** function(new:T, ?Array<?>=) */ messageType,
    /** !Array<?> */ binaryFields) {
  let /** ? */ table;
  return () => /** @type {!OpaqueTypeTable<T>} */ (
             table ??=
                 wrappedTypeTableForBinaryFields(messageType, binaryFields));
}

/**
 * Returns a `serializeBinary` instance method for a message.
 * @return {?}
 * @nosideeffects
 */
function makePrototypeSerializeBinaryFunction(/** !Array<?> */ binaryFields) {
  return (/**
           * @this {!Message}
           * @return {!Uint8Array}
           */
          function() {
            return serializeBinary(this, binaryFields);
          });
}

/**
 * Returns a `makeCrossSerializerComparisonsCompatible` static function for a
 * message.
 * @return {?}
 * @nosideeffects
 */
function makeCrossSerializerComparisonsCompatibleFunction(
    /** !Function*/ ctor, /** !Array<?> */ binaryFields) {
  const fn = (/** !Message */ msg) => makeCrossSerializerComparisonsCompatible(
      asserts.assertInstanceof(asserts.assertInstanceof(msg, ctor), Message),
      binaryFields);
  if (goog.DEBUG) {
    // In debug mode we can leverage this property to improve an error message.
    ctor['makeCrossSerializerComparisonsCompatible'] = fn;
  }
  return fn;
}

/**
 * Returns a `hasInstance` function for an ImmutableMessage
 * @return {?}
 * @nosideeffects
 */
function makeHasImmutableInstance(
    /** function(new:Message, ?Array<?>=) */ ctor) {
  return defineTypeGuard(
      /**
       * @param {*} value
       * @return {boolean}
       */
      (value) => value instanceof ctor && isImmutableMessage(value),
      () => 'ImmutableMessage:' + getTypeName(ctor));
}

/**
 * Returns a `hasInstance` function for a MutableMessage
 * @return {?}
 * @nosideeffects
 */
function makeHasMutableInstance(
    /** function(new:Message, ?Array<?>=) */ ctor) {
  return defineTypeGuard(
      /**
       * @param {*} value
       * @return {boolean}
       */
      (value) => value instanceof ctor && !isImmutableMessage(value),
      () => 'MutableMessage:' + getTypeName(ctor));
}


/**
 * Returns a `deserialize` function for an immutable message.
 * @param {function(new:?, ?Array=)} ctor Constructor for the message.
 * @return {!Function} a deserializeFunction
 * @nosideeffects
 */
function makeImmutableDeserializeFunction(ctor) {
  return (/** string */ data) => deserializeAsImmutable(ctor, data);
}

/**
 * Returns a `deserialize` function for a message.
 * @return {?}
 * @nosideeffects
 */
function makeMutableDeserializeFunction(
    /** function(new:Message, ?Array<?>=) */ ctor) {
  return (/** string */ data) => Message.deserializeWithCtor(ctor, data);
}

/**
 * Returns a `fromFields` function for a message.
 * @return {?}
 * @nosideeffects
 */
function makeFromFieldsForTesting(
    /** function(new:Message, ?Array<?>=) */ ctor) {
  if (COMPILED || !GENERATE_FIELDS_INTERFACE_FOR_TESTING) {
    return undefined;
  }
  return /** @return {?} */ (/** !Object */ fields) => {
    triggerLeakTest(ctor);
    return fromFieldsForTestingGeneric(ctor, fields);
  };
}

/**
 * Returns a `getFields` function for a message.
 * @return {?}
 * @nosideeffects
 */
function makeGetFieldsForTesting() {
  if (COMPILED || !GENERATE_FIELDS_INTERFACE_FOR_TESTING) {
    return undefined;
  }
  return /** @return {?} */ (/** !Message */ msg) => {
    triggerLeakTest(msg.constructor);
    return getFieldsForTestingGeneric(msg);
  };
}

/** @return {!Object<number, *>} */
function makeExtensionsObject(/** function(new:Message, ?Array<?>=) */ ctor) {
  const extensions = {};
  if (goog.DEBUG) {
    registerExtensionsForDebugging(ctor, extensions);
  }
  return extensions;
}


/** Triggers leak tests if this code ever ends up in an optimized binary. */
function triggerLeakTest(/** ? */ ctor) {
  if (ctor['property_that_will_never_exist_do_not_use_jspb-syntax-that-must-be-optimized']) {
    throw new Error(
        'jspb-syntax-that-must-be-optimized: see go/closure-js-conformance#jspbRecords');
  }
}

/**
 * This is a constant which will compile to `false` but will not trigger useless
 * code checks.
 *
 * @const {boolean}
 */
const ALWAYS_FALSE = !COMPILED && (Math.random() < 0);

/**
 * An empty record type.
 *
 * We use this in fromObject so that the JSCompiler does not degrade the
 * receiver type and emit JSConformance violations from gencode.
 *
 * @record
 */
function EmptyRecord() {}

exports = {
  ALWAYS_FALSE,
  ANY_PROTOTYPE_MARKER_VALUE,
  BinaryReaderOptions,
  BinarySource,
  DescriptorTypeReference,
  DoNotFreezeToken,
  EmptyRecord,
  EnumDescriptorTypeReference,
  ExtensionReference,
  GENERATE_FROM_OBJECT,
  GENERATE_TO_OBJECT,
  GENERATE_TYPE_NAME_PROPERTIES,  // Re-export for gencode
  GeneratedMessage,
  HAS_MESSAGE_ID,
  LAZILY_PARSE_LATE_LOADED_EXTENSIONS_SYMBOL,
  OpaqueTypeTable,
  OrUndefinedToken,
  RecordExtensionRegistry,
  assertCorrectAnyType,
  assertMutable,
  byteStringAsB64,
  byteStringAsBase64OrUint8Array,
  byteStringAsU8,
  byteStringListAsB64,
  byteStringListAsU8,
  checkCanCallToObject: assertMutable,
  registerExtensionsForDebugging,
  createMessageExtension,
  createPrimitiveExtension,
  createRepeatedMessageExtension,
  createRepeatedPrimitiveExtension,
  fromObjectAnyValue,
  fromObjectBytes: coerceToNullishBytes,
  fromObjectList,
  fromObjectNullable,
  getAnyTypeName,
  getAnyValueField,
  makeCrossSerializerComparisonsCompatibleFunction,
  makeDeserializeBinaryFromReaderFunction,
  makeDeserializeBinaryFunction,
  makeDeserializeBinaryImmutableFunction,
  makeExtensionsObject,
  makeFromFieldsForTesting,
  makeGetDefaultInstanceFunction,
  makeGetFieldsForTesting,
  makeHasImmutableInstance,
  makeHasMutableInstance,
  makeImmutableDeserializeFunction,
  makeMutableDeserializeFunction,
  makePrototypeSerializeBinaryFunction,
  makeSerializeBinaryFunction,
  makeSerializeBinaryToByteStringFunction,
  mapFromObject,
  mapToObject,
  packAnyValueBinary,
  packAnyValueJspb,
  makeDescriptorGetter,
  makeEnumDescriptorGetter,
  makeExtensionReference,
  makeGetTypeTable,
  setAnyTypeName,
  setAnyTypeUrl,
  toGbigint,
  toObjectAnyValue,
  toObjectBytes,
  toObjectList,
  toObjectPrimitive,
  TypeSpecificApiFormat,
  unpackAnyJspbCompat,
};
