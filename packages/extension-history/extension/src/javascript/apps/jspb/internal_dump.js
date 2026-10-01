/**
 * @fileoverview Internal proto-dumping utilities.
 * @package
 *
 * DO NOT USE THIS OUTSIDE OF THIS PACKAGE.
 */
goog.module('jspb.internal_dump');

const base64 = goog.require('goog.crypt.base64');
const jspbAdapters = goog.require('jspb_internal_adapters');
const {BinaryReader} = goog.require('jspb.binary.reader');
const {ByteString} = goog.require('jspb.bytestring');
const {EXEMPTED_SUBCLASS_MARKER, InternalMessage, NO_MESSAGE_ID, endsWith, fieldNumberFromIndex, getExtensionRegistryForDebugging, getHasMessageId, getInternalArray, isAny, isMessage, isSparseObject, startsWith} = goog.require('jspb.internal');
const {WireType} = goog.require('jspb.BinaryConstants');
const {assert, assertArray} = goog.require('goog.asserts');
const {cloneToJsonFormat} = goog.require('jspb.internal_copy');
const {getArrayIndexOffset, getArrayState, getMessageArrayState} = goog.require('jspb.internal_array_state');
const {getUnknownFields} = goog.require('jspb.internal_unknown_fields');
const {isU8} = goog.require('jspb.internal_bytes');
const {noChangePivotSelector} = goog.require('jspb.internal_pivot_selectors');
const {toGbigint} = goog.require('google3.javascript.common.bigint.index');
const {unsafeByteStringFromUint8Array, unsafeUint8ArrayFromByteString, unsafeUnwrapByteString} = goog.require('jspb.unsafe_bytestring');
const {withoutAsyncThrowingIfStringTypedInt64FieldDowngrade} = goog.require('jspb.internal_options');
const {withoutLogging} = goog.require('jspb.internal_operations');

/** @const {!Object} */
const obj = {};

/** @const {{isPropertyRenamingEnabled: !Object}} */
const canary = {
  isPropertyRenamingEnabled: obj
};

// DCE canary
class Canary {
  getFoo() {
    return obj;
  }
}

/** @return {boolean} */
function isPropertyRenamingEnabled() {
  // If property renaming is enabled then the property in `canary` will get
  // renamed and this check will fail.
  return canary['isPropertyRenamingEnabled'] !==
      canary.isPropertyRenamingEnabled;
}

/** @return {boolean} */
function isDceEnabled() {
  const canaryPrototype = Object.getPrototypeOf(new Canary());
  if (!canaryPrototype) return true;

  const propertyNames = Object.getOwnPropertyNames(canaryPrototype);

  // If property renaming is enabled then the property in `canary` will get
  // renamed and this check will fail.
  return !propertyNames.includes('getFoo');
}

/** @return {boolean} */
function isUnsupportedSubclass(/** ? */ instance) {
  // Unsupported subclasses will break our property traversal.
  return !!(
      instance && EXEMPTED_SUBCLASS_MARKER &&
      instance[EXEMPTED_SUBCLASS_MARKER]);
}

/** @enum {number} */
const DumpMode = {
  TO_OBJECT: 1,
  DUMP: 2,
  MESSAGE_EQUALS: 3,
  MESSAGE_EQUALS_IGNORE_UNKNOWN: 4,
  JS_PROTO_TO_OBJECT: 5,
  DUMP_REJECTING_MESSAGE_IDS: 6,
  TO_OBJECT_NO_EXTENSION_SUFFIX: 7,
};

/**
 * Recursively introspects a message and the values its getters return to
 * make a best effort in creating a human readable representation of the
 * message.
 * @param {?} thing Message, Map, Array, ByteString, or primitive type to
 *     dump.
 * @param {!DumpMode} mode
 * @return {*}
 */
function dump_(thing, mode) {
  if (thing && isMessage(thing) && isUnsupportedSubclass(thing)) {
    return thing.toJsonValue();
  }

  if (mode === DumpMode.JS_PROTO_TO_OBJECT) {
    thing = maybeDecodeBytes(thing);
    if (thing instanceof Uint8Array) {
      return thing;
    }
  } else {
    thing = maybeEncodeBytes(thing);
  }
  const type = goog.typeOf(thing);
  let message = thing;  // Copy because we don't want type inference on thing.
  if (type === 'number' || type === 'string' || type === 'boolean' ||
      type === 'null' || type === 'undefined') {
    return thing;
  }

  if (type === 'bigint') {
    if (mode === DumpMode.JS_PROTO_TO_OBJECT) {
      return thing;
    }
    const maybeUnsafe = Number(thing);
    return Number.isSafeInteger(maybeUnsafe) ? maybeUnsafe : ('' + thing);
  }

  // For known-invalid types (e.g. a MyMessage constructor without a call),
  // render as `invalidValue` so clients can immediately see where the error
  // is.
  if (type === 'function' || type === 'symbol') {
    // use a random key so these values never compare equal with messageEquals
    return {['$invalidValue:' + Math.random()]: thing};
  }

  if (type == 'array') {
    assertArray(thing);
    return thing.map((v) => dump_(v, mode));
  }

  const isToObjectMode = mode === DumpMode.TO_OBJECT ||
      mode === DumpMode.JS_PROTO_TO_OBJECT ||
      mode === DumpMode.TO_OBJECT_NO_EXTENSION_SUFFIX;

  if (message instanceof Map) {
    const mapEntries = [];
    const entries = message.entries();
    for (let entry = entries.next(); !entry.done; entry = entries.next()) {
      mapEntries.push([entry.value[0], dump_(entry.value[1], mode)]);
    }
    // Map.toObject confusingly returns an array, so we do the same here,
    // otherwise we produce an object (which probably should be the behavior
    // of Map.toObject).
    if (isToObjectMode) {
      return mapEntries;
    }
    return mapAsMap(mode) ? new Map(mapEntries) :
                            Object.fromEntries(mapEntries);
  }

  assert(isMessage(message), 'Only messages expected: %s', thing);
  message = /** @type {!InternalMessage} */ (message);
  if (mode === DumpMode.DUMP_REJECTING_MESSAGE_IDS &&
      message.getJsPbMessageId()) {
    throw new Error(
        `Message type ${message.constructor.displayName} has message_id ${
            message.getJsPbMessageId()}`);
  }
  const ctor = message.constructor;
  const object = {};
  if (!isToObjectMode) {
    // toObject doesn't contain these properties
    object['$name'] = getMessageName(ctor);
  }
  let unknownFieldSet = null;
  if (isAny(message)) {
    // any has a custom internal representation that requires special handling
    // We split the internal payload across two properties to prevent
    // comparisons between them and allow the jspb payload to be compared
    // using jspb semantics.
    object['typeUrl'] = jspbAdapters.getStringFieldNullable(
        message, ANY_TYPE_URL_FIELD_NUMBER, NO_MESSAGE_ID);
    const anyValue = toObjectAnyValue(message);
    if (mode === DumpMode.TO_OBJECT ||
        mode === DumpMode.TO_OBJECT_NO_EXTENSION_SUFFIX) {
      object['value'] = anyValue;
    } else {
      if (Array.isArray(anyValue)) {
        object['value$jspb'] = anyValue;
      } else {
        object['value$binary'] = anyValue;
      }
    }
  } else {
    for (let getterName of Object.getOwnPropertyNames(ctor.prototype)) {
      if (endsWith(getterName, '_asString') ||
          endsWith(getterName, '_asLegacyNumberOrString')) {
        continue;
      }

      const isGbigintGetter = ctor.prototype[`${getterName}_asString`] ||
          ctor.prototype[`${getterName}OrUndefined_asString`];

      // Captures the name of the proto field, in CamelCase, including
      // mangling
      const match = /^get(.+)$/.exec(getterName);
      if (!match) continue;
      const fieldNameFromGetter = match[1];

      // We only want to use the 'primary' getter
      // for each field and not an an alternate getter like getMutableFoo or
      // getFooOrUndefined. For each primary getter, there must be a setter or
      // clearer of the same base name (setter alone covers most fields, the
      // only exception being map fields which have no setters but do have
      // clearers; non-optional proto3 primitive fields have no clearers). If
      // there's no setter or clearer, then this is either an alternate getter
      // or a oneof case getter.
      if (!ctor.prototype['set' + fieldNameFromGetter] &&
          !ctor.prototype['clear' + fieldNameFromGetter]) {
        // This might be a oneof 'case' enum accessor
        // if it is then there will be a corresponding property on the
        // constructor for the enum itself e.g. Bar.getFooCase => Bar.FooCase
        // if we are performing toObject emulation then skip such properties.
        // TODO(lukes): maybe we should always skip these properties.
        if (endsWith(fieldNameFromGetter, 'Case') &&
            ctor[fieldNameFromGetter] &&
            !(isMessage(ctor[fieldNameFromGetter]))) {
          if (isToObjectMode) {
            continue;
          }
        } else {
          // An alternate getter
          continue;
        }
      }
      const hasserName = 'has' + fieldNameFromGetter;
      const hasser = thing[hasserName];
      if (!hasser || hasser.call(thing)) {
        if (isIndexedGetter(thing, getterName)) {
          continue;
        }
        const repeatedFieldAccess =
            getRepeatedFieldAccess(thing, fieldNameFromGetter);
        if (repeatedFieldAccess) {
          const val = [];
          const length = repeatedFieldAccess.count.call(thing);
          let fieldName = fieldNameFromGetter;
          if (mode === DumpMode.JS_PROTO_TO_OBJECT) {
            // The JsProto format does not contain empty repeated fields.
            if (!length) continue;

            // The JsProto format has no "list" suffix on repeated fields.
            const repeatedFieldName = fieldNameFromGetter.slice(
                0, fieldNameFromGetter.lastIndexOf('List'));
            fieldName = repeatedFieldName;
          }
          for (let i = 0; i < length; i++) {
            val.push(dump_(repeatedFieldAccess.getter.call(thing, i), mode));
          }
          if (mode === DumpMode.JS_PROTO_TO_OBJECT && isGbigintGetter) {
            for (let i = 0; i < length; i++) {
              val[i] = normalize64BitAsGbigint(val[i]);
            }
          }
          object[formatFieldName(fieldName, mode)] = val;
        } else {
          const getReadonlyGetter = 'getReadonly' + fieldNameFromGetter;
          // if there is a readonly getter we should call it to avoid eager
          // mutable copies
          const rawVal = thing[getReadonlyGetter] &&
                  !thing['setReadonly' + fieldNameFromGetter] ?
              thing[getReadonlyGetter]() :
              thing[getterName]();

          const keepAsGbigint =
              mode === DumpMode.JS_PROTO_TO_OBJECT && isGbigintGetter;
          let val = keepAsGbigint ? rawVal : dump_(rawVal, mode);
          // JsProto format skips empty maps.
          if (mode === DumpMode.JS_PROTO_TO_OBJECT && Array.isArray(val) &&
              !val.length) {
            continue;
          }
          object[formatFieldName(fieldNameFromGetter, mode)] = val;
        }
      } else if (
          (mode === DumpMode.TO_OBJECT ||
           mode === DumpMode.TO_OBJECT_NO_EXTENSION_SUFFIX) &&
          thing[getterName + 'OrUndefined'] && !thing[hasserName]()) {
        // toObject includes properties for primitive fields with defaults. We
        // approximate that as any truthy value (except an empty ByteString).
        let value = thing[getterName]();
        if ((value instanceof ByteString && value.isEmpty()) || !value ||
            value === toGbigint(0)) {
          value = undefined;
        }
        object[formatFieldName(fieldNameFromGetter, mode)] = value;
      } else if (
          mode === DumpMode.TO_OBJECT ||
          mode === DumpMode.TO_OBJECT_NO_EXTENSION_SUFFIX) {
        // toObject includes properties for unset fields
        object[formatFieldName(fieldNameFromGetter, mode)] = undefined;
      } else if (
          dumpUnknownFields(mode) && thing[hasserName] &&
          !thing[hasserName]()) {
        // absent fields may be holding 'invalid data' to find out we need to
        // figure out the field number and then call getFieldNullable directly
        // so we can represent this data as unknown data.
        const fieldNumber = getKnownFieldsOf(message.constructor)
                                .getterToNumber.get(getterName) ||
            -1;
        const hasMessageId =
            getHasMessageId(getArrayState(getInternalArray(message)));
        const unknownData =
            jspbAdapters.getFieldNullable(message, fieldNumber, hasMessageId);
        if (unknownData != null) {
          unknownFieldSet = unknownFieldSet || {};
          unknownFieldSet[fieldNumber] = dump_(unknownData, mode);
        }
      }
    }

    // in toObject mode, extensions go directly on the object.
    let extensionsObject = isToObjectMode ? object : null;
    const registry = getExtensionRegistryForDebugging(ctor);
    if (registry) {
      for (const extObj of Object.values(registry)) {
        const fieldName = Object.keys(extObj)[0];
        const fieldInfo =
            /** !InternalExtensionFieldInfo */ (extObj[fieldName]);
        let extVal;
        if (fieldInfo.isRepeated) {
          extVal = [];
          const length = message.getExtensionCount(fieldInfo);
          for (let i = 0; i < length; i++) {
            extVal.push(message.getExtensionAtIndex(fieldInfo, i));
          }
        } else {
          extVal = message.hasExtension(fieldInfo) ?
              (fieldInfo.ctor ? message.getReadonlyExtension(fieldInfo) :
                                message.getExtension(fieldInfo)) :
              undefined;
        }
        if (extVal != null) {
          if (!extensionsObject) {
            extensionsObject = object['$extensions'] = {};
          }
          // The key written into the registry might collide with other
          // extensions with the same short name. We append a numeric suffix to
          // avoid this in formatFieldName, if one is not already present.
          //
          // TODO: varomodt - if we patched the fully qualified name onto the
          // extension object we could avoid this with optimal readability.
          extensionsObject[formatFieldName(
              fieldName, mode, fieldInfo.fieldIndex)] = dump_(extVal, mode);
        } else {
          // N.B. toObject mode doesn't include properties for absent
          // extensions unlike normal fields.
          if (dumpUnknownFields(mode)) {
            const fieldNumber = fieldInfo.fieldIndex;
            const unknownData = jspbAdapters.getFieldNullable(
                message, fieldNumber,
                getHasMessageId(getArrayState(getInternalArray(message))));
            if (unknownData != null) {
              unknownFieldSet = unknownFieldSet || {};
              unknownFieldSet[fieldNumber] = dump_(unknownData, mode);
            }
          }
        }
      }
    }
  }
  if (dumpUnknownFields(mode)) {
    // in message_equals mode we need to handle unknown fields
    const knownFieldSet = getKnownFieldsOf(message.constructor).fieldNumbers;
    const array = getInternalArray(message);
    const arrayIndexOffset = getArrayIndexOffset(getMessageArrayState(array));
    for (let i = message.getJsPbMessageId() ? 1 : 0; i < array.length; i++) {
      const value = array[i];
      if (value == null) {
        continue;
      }
      if (i === array.length - 1 && isSparseObject(value)) {
        // Proto entries in the extension object are indexed by field number.
        // JSPB metadata uses letters.
        for (let entry in value) {
          const fieldNumber = +entry;
          if (!Number.isNaN(fieldNumber)) {
            const propValue = value[entry];
            if (!knownFieldSet.has(fieldNumber) && propValue != null) {
              unknownFieldSet = unknownFieldSet || {};
              unknownFieldSet[fieldNumber] = propValue;
            }
          }
        }
      } else {
        const fieldNumber = fieldNumberFromIndex(i, arrayIndexOffset);
        if (!knownFieldSet.has(fieldNumber)) {
          unknownFieldSet = unknownFieldSet || {};
          unknownFieldSet[fieldNumber] = value;
        }
      }
    }
    if (unknownFieldSet) {
      object['$unknownFields'] = unknownFieldSet;
    }
    // handle unknown binary fields
    const unknownFields = getUnknownFields(array);
    if (unknownFields) {
      const unknownBinaryFields = object['$unknownBinaryFields'] = {};
      unknownFields.forEachUnknownField(
          (fieldSet, fieldNumber, fieldEntries) => {
            for (const unknown of fieldEntries) {
              const reader = BinaryReader.alloc(
                  unknown, 0, unknown.sizeBytes(), {aliasBytesFields: true});
              while (
                  reader
                      .nextField()) {  // there should only be one field but if
                const fieldNumber = reader.getFieldNumber();
                switch (reader.getWireType()) {
                  case WireType.VARINT:
                    unknownBinaryFields[fieldNumber] =
                        `VARINT: ${reader.readInt64String()}`;
                    break;
                  case WireType.FIXED64:
                    unknownBinaryFields[fieldNumber] =
                        `FIXED64: ${reader.readUint64String()}`;
                    break;
                  case WireType.DELIMITED:
                    unknownBinaryFields[fieldNumber] =
                        `DELIMITED: ${reader.readByteString().asBase64()}`;
                    break;
                  case WireType.START_GROUP: {
                    const start = reader.getCursor();
                    reader.skipField();
                    const end = reader.getCursor();
                    unknownBinaryFields[fieldNumber] = `GROUP: ${
                        unsafeByteStringFromUint8Array(
                            unsafeUint8ArrayFromByteString(unknown).subarray(
                                start, end))
                            .asBase64()}`;
                  } break;
                  case WireType.FIXED32:
                    unknownBinaryFields[fieldNumber] =
                        `FIXED_32: ${reader.readFixed32()}`;
                    break;
                  case WireType.INVALID:
                  case WireType.END_GROUP:
                  default:
                    throw new Error(
                        'unexpected wiretype: ' + reader.getWireType());
                }
              }
              reader.free();
            }
          });
    }
  }
  return object;
}

/** @return {boolean} Whether dump is supported. */
function isDumpSupported() {
  return goog.DEBUG && !isPropertyRenamingEnabled() && !isDceEnabled();
}

/**
 * Turns a proto into a human readable object that can i.e. be written to the
 * console: `console.log(jspb.debug.dump(myProto))`.
 * This function makes a best effort and may not work in all cases. It will not
 * work in obfuscated and or optimized code.
 * Use this in environments where {@see jspb.Message.prototype.toObject} is
 * not available for code size reasons.
 * @param {?} message A jspb.Message.
 * @param {!DumpMode=} mode
 * @return {?Object|undefined}
 */
function dumpInternal(message, mode = DumpMode.DUMP) {
  // We can't use dump in optimized or obfuscated modes.
  if (!isDumpSupported()) {
    return null;
  }
  // Pass through nulls.
  if (message == null) {
    return message;
  }
  // Drop out with mocks.
  if (!(getInternalArray(/** @type {!InternalMessage} */ (message)))) {
    return null;
  }
  assert(isMessage(message));
  // Don't log the internal getter calls during the course of dumping protos.
  // They include a lot of uninformative noise.
  return withoutAsyncThrowingIfStringTypedInt64FieldDowngrade(
      () => withoutLogging(
          () =>
              /** @type {!Object} */ (dump_(message, mode ?? DumpMode.DUMP))));
}

/** @return {?} */
function maybeDecodeBytes(/** ? */ v) {
  if (v && v.constructor === ByteString) {
    // we can do an unsafe unwrap because we'll convert any Uint8Array to base64
    // We do this because we don't want to change the internal state of the
    // bytestring.
    v = unsafeUnwrapByteString(v);
    if (typeof v === 'string') {
      return base64.decodeStringToUint8Array(v);
    }
  }
  return v;
}

/** @return {?} */
function maybeEncodeBytes(/** ? */ v) {
  if (v && v.constructor === ByteString) {
    // we can do an unsafe unwrap because we'll convert any Uint8Array to base64
    // We do this because we don't want to change the internal state of the
    // bytestring.
    v = unsafeUnwrapByteString(v);
    if (v instanceof Uint8Array) return base64.encodeByteArray(v);
  }
  return v;
}

/**
 * Whether to yield maps as an es6 map.
 * @return {boolean}
 */
function mapAsMap(/** !DumpMode */ mode) {
  return mode === DumpMode.MESSAGE_EQUALS ||
      mode === DumpMode.MESSAGE_EQUALS_IGNORE_UNKNOWN;
}

/**
 * Whether to yield maps as an es6 map.
 * @return {boolean}
 */
function dumpUnknownFields(/** !DumpMode */ mode) {
  return mode === DumpMode.MESSAGE_EQUALS || mode === DumpMode.DUMP ||
      mode === DumpMode.DUMP_REJECTING_MESSAGE_IDS;
}

/**
 * @typedef {
 *   {
 *     count: function(this:InternalMessage):number,
 *     getter: function(this:InternalMessage, number):?,
 *   }
 * }
 */
let RepeatedFieldAccess;

/** @return {!RepeatedFieldAccess|undefined} */
function getRepeatedFieldAccess(
    /** !Object */ msg, /** string */ fieldNameFromGetter) {
  // _asString 64-bit int getters are expected to have be pre-filtered.
  assert(!endsWith(fieldNameFromGetter, '_asString'));
  assert(!endsWith(fieldNameFromGetter, '_asLegacyNumberOrString'));
  if (!endsWith(fieldNameFromGetter, 'List')) {
    return undefined;
  }

  // If this is a repeated field, it should have a Count method and indexed
  // getter.
  const fieldNameFromGetterWithoutList = fieldNameFromGetter.slice(0, -4);

  const count = msg['get' + fieldNameFromGetterWithoutList + 'Count'];

  if (!count) {
    return undefined;
  }

  let getter = msg['getReadonly' + fieldNameFromGetterWithoutList];
  // make sure it isn't another field with a getReadonly prefix by
  // making sure it has a parameter and isn't another repeated field
  // or a map field
  if (!getter || getter.length !== 1 ||
      msg['getReadonly' + fieldNameFromGetterWithoutList + 'Count'] ||
      msg['getReadonly' + fieldNameFromGetterWithoutList + 'Map']) {
    getter = msg['get' + fieldNameFromGetterWithoutList];
  }

  return {count, getter};
}

/**
 * @param {!Object} receiver
 * @param {string} name
 * @return {boolean}
 */
function isIndexedGetter(receiver, name) {
  // indexed getters start with 'get' and have 1 parameter.
  const hasOneParamGetter = Boolean(
      startsWith(name, 'get') && receiver[name] && receiver[name].length === 1);
  if (!hasOneParamGetter) {
    return false;
  }

  // Strip off int64-related getter suffixes.
  const alternate64BitIntGetterMatch =
      /^get(.+)_asLegacyNumberOrString$/.exec(name);
  if (alternate64BitIntGetterMatch) {
    name = `get${assert(alternate64BitIntGetterMatch[1])}`;
  }

  // List and Map getters also have 1 parameter, but these have a
  // corresponding clearer that the indexed getters don't have; so
  // at this point we are an indexed getter if that method doesn't exist.
  return Boolean(!receiver['clear' + name.substring(3)]);
}

/** @return {string|undefined|null} */
function getMessageName(/** ? */ ctor) {
  const name = ctor.displayName || ctor.name;
  const type = typeof name;
  // This may be null or undefined depending on compiler settings and browser
  // but if present, it should always be a string.
  // This check is here to prevent future occurrence of odd framework code
  // monkey patching `displayName`.
  if (name === null || type === 'string' || type === 'undefined') {
    return name;
  }
  throw new Error(`Unexpected name '${name}' (type ${
      type}) found on proto constructor. Is something monkey patching displayName?`);
}

/** @const{symbol}*/
const knownFieldsSymbol = Symbol(goog.DEBUG ? 'jspb.knownfieldset' : undefined);

/**
 * Returns the set of known field numbers for the given message
 *
 * Caches the value on the constructor to save redundant work.
 * @return {{fieldNumbers:!Set<number>, getterToNumber:!Map<string,number>}}
 */
function getKnownFieldsOf(/** ? */ ctor) {
  if (ctor[knownFieldsSymbol]) {
    return ctor[knownFieldsSymbol];
  }
  const /** !Map<string, number> */ knownFields = new Map();
  const /** !Set<number> */ fieldNumbers = new Set();
  const originalGetFieldNullableInternal =
      jspbAdapters.getFieldNullableInternal;
  const originalIsOneofCase = jspbAdapters.isOneofCase;

  try {
    // This works because the gencode always references the function
    // indirectly through the exports object.  If the gencode ever
    // destructures it we will need a new solution.
    let /** number|undefined */ prevFieldNumber = undefined;

    /**
     * @return {?}
     * @suppress {constantProperty}
     */
    jspbAdapters.getFieldNullableInternal = function(
        /** !Array<?> */ array, /** number|undefined */ arrayState,
        /** number */ fieldNumber, /** ?= */ hasMessageId, /** ?= */ coerceFn) {
      if (fieldNumber > 0) {
        prevFieldNumber = fieldNumber;
      }
      return originalGetFieldNullableInternal(...arguments);
    };

    /**
     * @return {?}
     * @suppress {constantProperty}
     */
    jspbAdapters.isOneofCase = function(
        /** !InternalMessage */ message, /** !ReadonlyArray<number>*/ members,
        /** number */ fieldNumber) {
      prevFieldNumber = fieldNumber;
      return /* NO_SUCH_FIELD */ -1;
    };

    const empty = new ctor();
    for (const name of Object.getOwnPropertyNames(ctor.prototype)) {
      if (startsWith(name, 'get')) {
        if (endsWith(name, '_asLegacyNumberOrString') ||
            endsWith(name, '_asString')) {
          continue;
        }

        const value = empty[name];
        if (typeof value === 'function' && !isIndexedGetter(empty, name)) {
          value.call(empty);
          if (prevFieldNumber !== undefined) {
            knownFields.set(name, /** @type{number} */ (prevFieldNumber));
            fieldNumbers.add(/** @type{number} */ (prevFieldNumber));
            prevFieldNumber = undefined;
          }
        }
      }
    }
    const registry = getExtensionRegistryForDebugging(ctor);
    if (registry) {
      for (const n of Object.keys(registry)) {
        fieldNumbers.add(+n);
      }
    }
  } catch (e) {
    // This only happens with non standard jspb subclasses. Like youtubes
    // DynamicMessage.
    fieldNumbers.clear();
    knownFields.clear();
  } finally {
    // restore
    /** @suppress {constantProperty} */
    jspbAdapters.getFieldNullableInternal = originalGetFieldNullableInternal;
    /** @suppress {constantProperty} */
    jspbAdapters.isOneofCase = originalIsOneofCase;
  }
  const result = {fieldNumbers: fieldNumbers, getterToNumber: knownFields};
  ctor[knownFieldsSymbol] = result;
  return result;
}

/** @const {!RegExp} */
const LEADING_CAPITAL_RE = new RegExp('^[A-Z]');
/** @const {!RegExp} */
const ALL_CAPITALS_RE = new RegExp('[A-Z]', 'g');

/**
 * Formats a field name for output as camelCase.
 *
 * @param {string} name Name of the field.
 * @param {!DumpMode} mode
 * @param {number=} requiredNumericSuffix
 * @return {string}
 */
function formatFieldName(name, mode, requiredNumericSuffix) {
  const requiredNumericSuffixString =
      requiredNumericSuffix ? `_${requiredNumericSuffix}` : '';
  if (mode !== DumpMode.TO_OBJECT_NO_EXTENSION_SUFFIX &&
      requiredNumericSuffix && !endsWith(name, requiredNumericSuffixString)) {
    name += requiredNumericSuffixString;
  }
  if (mode === DumpMode.JS_PROTO_TO_OBJECT) {
    return formatSnakeCaseFieldName(name);
  }
  // Name may be in TitleCase.
  let result = name.replace(LEADING_CAPITAL_RE, (c) => c.toLowerCase());
  if (mode === DumpMode.TO_OBJECT && BUILTIN_NAMES.has(result)) {
    result = `pb_${result}`;
  }
  return result;
}

/**
 * Formats a field name for output as snake_case.
 *
 * @param {string} name Name of the field.
 * @return {string}
 */
function formatSnakeCaseFieldName(name) {
  // Name may be in TitleCase.
  return name.replace(LEADING_CAPITAL_RE, (c) => c.toLowerCase())
      .replaceAll(ALL_CAPITALS_RE, (c) => '_' + c.toLowerCase());
}

/**
 * Formats a field name for output as camelCase.
 *
 * @param {string} name Name of the field.
 * @return {string}
 */
function fieldNameToGetter(name) {
  // Name may be in TitleCase.
  return `get${name.replace(/^[a-z]/, (c) => c.toUpperCase())}()`;
}

/** Field number for the `value` field. */
const /** number */ ANY_TYPE_URL_FIELD_NUMBER = 1;

/** Field number for the `value` field. */
const /** number */ ANY_VALUE_FIELD_NUMBER = 2;

/**
 * @return {string|!Array<?>}
 */
function toObjectAnyValue(/** !InternalMessage */ any) {
  const value =
      jspbAdapters.getFieldNullable(any, ANY_VALUE_FIELD_NUMBER, NO_MESSAGE_ID);
  if (value == null) {
    // Because this is a proto3 field empty should be treated as a default in
    // toObject
    return '';
  }
  if (typeof value === 'string') {
    return value;
  }
  if (Array.isArray(value)) {
    return cloneToJsonFormat(value);
  }
  if (value instanceof ByteString) {
    return value.asBase64();
  }
  if (value && isMessage(/** @type {?} */ (value))) {
    return /** @type {?} */ (value).toJsonValue(
        /** @type {?} */ (noChangePivotSelector));
  }
  throw new Error('invalid value in Any.value field: ' + value);
}

/**
 * @return {T}
 * @template T
 */
function fromObjectAnyValue(
    /** T */ any,
    /** !ByteString|string|!Array<?>|!Uint8Array|null|undefined */ value) {
  assert(any && isMessage(any));
  if (value == null) {
    return any;
  }
  if (Array.isArray(value)) {
    // this array copy will be stored internally
    return jspbAdapters.setField(
        any, ANY_VALUE_FIELD_NUMBER, cloneToJsonFormat(value), NO_MESSAGE_ID);
  } else if (
      typeof value === 'string' || value instanceof ByteString || isU8(value)) {
    return jspbAdapters.setProto3BytesField(
        any, ANY_VALUE_FIELD_NUMBER, value, NO_MESSAGE_ID);
  }
  throw new Error(
      'invalid value in Any.value field: ' + value +
      ' expected a ByteString, a base64 encoded string, a Uint8Array or a jspb array');
}

/**
 * Normalizes any numbers or strings to gbigint. Arrays return a new array with
 * each element normalized.
 * @param {*} value
 * @return {*} numbers or string converted to gbigint, others left as-is.
 */
function normalize64BitAsGbigint(value) {
  if (Array.isArray(value)) {
    return value.map(normalize64BitAsGbigint);
  }
  if (typeof value !== 'bigint' &&
      (typeof value === 'number' || typeof value === 'string')) {
    return toGbigint(value);
  }
  return value;
}

// LINT.IfChange(reservedNames)
/** @const {!Set<string>} */
const BUILTIN_NAMES = new Set([
  'abstract',   'boolean',      'break',      'byte',    'case',
  'catch',      'char',         'class',      'const',   'constructor',
  'continue',   'default',      'delete',     'do',      'double',
  'else',       'enum',         'export',     'extends', 'false',
  'final',      'finally',      'float',      'for',     'function',
  'goto',       'if',           'implements', 'import',  'in',
  'instanceof', 'int',          'interface',  'long',    'native',
  'new',        'null',         'package',    'private', 'protected',
  'public',     'return',       'short',      'static',  'super',
  'switch',     'synchronized', 'this',       'throw',   'throws',
  'toString',   'transient',    'try',        'typeof',  'var',
  'void',       'volatile',     'while',      'with',
]);
// LINT.ThenChange(//depot/google3/net/proto2/compiler/js/internal/generator.cc:reservedNames)

exports = {
  BUILTIN_NAMES,
  DumpMode,
  dumpInternal,
  dumpValue: dump_,
  fieldNameToGetter,
  fromObjectAnyValue,
  formatSnakeCaseFieldName,
  isDceEnabled,
  isDumpSupported,
  isPropertyRenamingEnabled,
  isUnsupportedSubclass,
  toObjectAnyValue,
  normalize64BitAsGbigint,
};
