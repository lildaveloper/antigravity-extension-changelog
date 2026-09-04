/**
 * @fileoverview Internal properties of ExtensionFieldInfo.
 *
 * DO NOT USE THIS OUTSIDE OF THIS PACKAGE.
 */
goog.module('jspb.internal_extension_field_info');

const {ExtensionFieldInfo} = goog.require('jspb.extension_field_info');
const {LAZILY_PARSE_LATE_LOADED_EXTENSIONS_SYMBOL} = goog.require('jspb.internal_symbols');
const {Message} = goog.requireType('jspb');
const {addToRepeatedWrapperField, getRepeatedIndexedReadonlyWrapper, getRepeatedWrapperCount, getRepeatedWrapperField, getWrapperFieldOrUndefined, setRepeatedIndexedWrapper, setRepeatedWrapperField, setWrapperField} = goog.require('jspb_internal_adapters');

/**
 * @extends {IObject<string, !ExtensionFieldInfo>}
 * @interface
 */
class ExtensionWithName {
  constructor() {
    /** @const {function((?Message|undefined)):?|undefined} */
    this.$toObjectFn;
  }
}

/**
 * Creates a singular primitive valued extension.
 * @return {!ExtensionFieldInfo<!T, !T, MutableExtendee, ImmutableExtendee>}
 * @template T, MutableExtendee, ImmutableExtendee
 * @suppress {visibility} ExtensionFieldInfo constructor.
 * @nosideeffects
 */
function createPrimitiveExtension(
    /** number */ fieldNumber,
    /** function(new: MutableExtendee, ?Array=) */ extendeeCtor,
    /** ? */ getExtensionFn,
    /** ? */ setExtensionFn,
    /** ?= */ defaultValue,
    /** (typeof LAZILY_PARSE_LATE_LOADED_EXTENSIONS_SYMBOL)= */ lazyParse) {
  return new ExtensionFieldInfo(
      fieldNumber, extendeeCtor, null, /* isRepeated= */ 0, getExtensionFn,
      /* getExtensionAtIndexFn = */ undefined,
      /* getExtensionCountFn = */ undefined, setExtensionFn,
      /* setExtensionAtIndexFn = */ undefined, /* addExtensionFn = */ undefined,
      defaultValue, lazyParse);
}

/**
 * Creates a primitive valued extension.
 * @return {!ExtensionFieldInfo<!ReadonlyArray<T>, !ReadonlyArray<T>,
 *     MutableExtendee, ImmutableExtendee>}
 * @template T, MutableExtendee, ImmutableExtendee
 * @suppress {visibility} ExtensionFieldInfo constructor.
 * @nosideeffects
 */
function createRepeatedPrimitiveExtension(
    /** number */ fieldNumber,
    /** function(new: MutableExtendee, ?Array=) */ extendeeCtor,
    /** ? */ getExtensionFn,
    /** ? */ getExtensionAtIndexFn,
    /** ? */ getExtensionCountFn,
    /** ? */ setExtensionFn,
    /** ? */ setExtensionAtIndexFn,
    /** ? */ addExtensionFn,
    /** (typeof LAZILY_PARSE_LATE_LOADED_EXTENSIONS_SYMBOL)= */ lazyParse) {
  return new ExtensionFieldInfo(
      fieldNumber, extendeeCtor, null, /* isRepeated= */ 1, getExtensionFn,
      getExtensionAtIndexFn, getExtensionCountFn, setExtensionFn,
      setExtensionAtIndexFn, addExtensionFn,
      /* defaultValue= */ undefined, lazyParse);
}

/**
 * Creates a message valued extension
 * @return {!ExtensionFieldInfo<M, I, MutableExtendee, ImmutableExtendee>}
 * @template M, I, MutableExtendee, ImmutableExtendee
 * @template M_OR_NULL_UNDEFINED := union(M, 'null', 'undefined') =:
 * @suppress {visibility} ExtensionFieldInfo constructor.
 * @nosideeffects
 */
function createMessageExtension(
    /** number */ fieldNumber,
    /** function(new: MutableExtendee, ?Array=) */ extendeeCtor,
    /** function(new:M, ?Array<?>=) */ ctor,
    /** (typeof LAZILY_PARSE_LATE_LOADED_EXTENSIONS_SYMBOL)= */ lazyParse) {
  return new ExtensionFieldInfo(
      fieldNumber, extendeeCtor, ctor,
      /* isRepeated= */ 0, getWrapperFieldOrUndefined,
      /* getExtensionAtIndexFn = */ undefined,
      /* getExtensionCountFn = */ undefined, setWrapperField,
      /* setExtensionAtIndexFn = */ undefined, /* addExtensionFn = */ undefined,
      /* defaultValue= */ undefined, lazyParse);
}

/**
 * Creates a message valued extension
 * @return {!ExtensionFieldInfo<!ReadonlyArray<M>, !ReadonlyArray<I>,
 *     MutableExtendee, ImmutableExtendee>}
 * @template M, I, MutableExtendee, ImmutableExtendee
 * @template M_OR_NULL_UNDEFINED := union(M, 'null', 'undefined') =:
 * @suppress {visibility} ExtensionFieldInfo constructor.
 * @nosideeffects
 */
function createRepeatedMessageExtension(
    /** number */ fieldNumber,
    /** function(new: MutableExtendee, ?Array=) */ extendeeCtor,
    /** function(new:M, ?Array<?>=) */ ctor,
    /** (typeof LAZILY_PARSE_LATE_LOADED_EXTENSIONS_SYMBOL)= */ lazyParse) {
  return new ExtensionFieldInfo(
      fieldNumber, extendeeCtor, ctor,
      /* isRepeated= */ 1, getRepeatedWrapperField,
      getRepeatedIndexedReadonlyWrapper, getRepeatedWrapperCount,
      setRepeatedWrapperField, setRepeatedIndexedWrapper,
      addToRepeatedWrapperField,
      /* defaultValue= */ undefined, lazyParse);
}

/**
 * @record
 * @template ApiType, InternalAppsJspbType
 */
class Conversions {
  constructor() {
    /** @const {function(!InternalAppsJspbType): !ApiType} */
    this.toApi;

    /** @const {function(!ApiType): !InternalAppsJspbType} */
    this.fromApi;

    /** @const {!ApiType|undefined} */
    this.defaultValue;
  }
}

/** @interface */
class RecordExtensionRegistry {}

exports = {
  Conversions,
  ExtensionWithName,
  RecordExtensionRegistry,
  createMessageExtension,
  createPrimitiveExtension,
  createRepeatedMessageExtension,
  createRepeatedPrimitiveExtension,
};
