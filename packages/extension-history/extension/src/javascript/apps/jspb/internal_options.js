/**
 * @fileoverview Internal options for JSPB.
 *
 * DO NOT USE THIS OUTSIDE OF javascript/apps/jspb/.
 */

goog.module('jspb.internal_options');

const {JSPB_THROW_IN_ARRAY_CONSTRUCTOR_IF_ARRAY_IS_ALREADY_CONSTRUCTED} = goog.require('goog.flags');
const {assertBoolean} = goog.require('goog.asserts');

/**
 * @define {boolean} Whether we should disable subclasses of native Maps
 *    for testing.
 */
const DISABLE_ES6_MAP_SUBCLASSES_FOR_TESTING =
    goog.define('jspb.DISABLE_ES6_MAP_SUBCLASSES_FOR_TESTING', false);


/**
 * @define {boolean} BigInt is part of ES2020 version, and was included in
 *     closure compiler's Feature Set Year 2021.
 * See also https://github.com/google/closure-compiler/wiki/BigInt-support
 *
 * Note: Do not use this constant directly; use isBigIntAvailable(), which
 * checks if BigInt is supported on this platform.
 */
const ALLOW_BIG_INT = goog.define('jspb.ALLOW_BIG_INT', true);

/**
 * @return {boolean} True if BigInt is permitted for use and supported by the
 *     platform.
 * @nosideeffects
 */
function isBigIntAvailable() {
  return ALLOW_BIG_INT &&
      (goog.FEATURESET_YEAR >= 2021 || (typeof BigInt === 'function'));
}


/**
 * Whether to throw in the message constructor if a data array
 *     is passed in and the array already belongs to a different proto instance.
 * @return {boolean}
 */
function shouldThrowInArrayConstructorIfArrayIsAlreadyConstructed() {
  return JSPB_THROW_IN_ARRAY_CONSTRUCTOR_IF_ARRAY_IS_ALREADY_CONSTRUCTED;
}

/**
 * @define {boolean} Whether to throw in the message constructor if a data array
 *     is passed in and the array already belongs to a different proto instance.
 */
const SHOULD_TRANSFER_ARRAY_IN_CONSTRUCTOR =
    goog.define('jspb.Message.SHOULD_TRANSFER_ARRAY_IN_CONSTRUCTOR', false);

/**
 * Whether to throw in the message constructor if a data array
 *     is passed in and the array already belongs to a different proto instance.
 * @return {boolean}
 */
function shouldTransferArrayInConstructor() {
  return SHOULD_TRANSFER_ARRAY_IN_CONSTRUCTOR;
}



/** @enum {number} */
const CheckLevel = {
  OFF: 0,
  ASYNC_THROW: 1,
  THROW: 2,
};


/**
 * Controls whether or not we enforce that the types of 32-bit int fields
 * (int32, uint32, ...) are correct.
 *
 * @type {!CheckLevel}
 */
let typeCheck32BitIntFields = CheckLevel.THROW;

/**
 * Returns whether a 32-bit int field (int32, uint32, ...) field type checks
 * should be skipped.
 * @return {!CheckLevel}
 */
function getTypeCheck32BitIntFields() {
  return typeCheck32BitIntFields;
}

/**
 * TODO(b/235619036): Delete this setter
 */
function setTypeCheck32BitIntFields(/** !CheckLevel */ value) {
  typeCheck32BitIntFields = value;
}

/**
 * Controls whether we coerce 64-bit int strings according to jstype.
 * Originally, number-shaped enforcement was an aspect of this flag, but it
 * has been split off into typeCheck64BitIntFieldsAreNumberShaped, which is a
 * precondition.
 *
 * @type {boolean}
 */
let typeCheck64BitIntFields = goog.DEBUG;

/**
 * Returns 64-bit int field values should be coerced according to jstype.
 * @param {boolean} forceTypeChecking
 * @return {boolean}
 */
function getTypeCheck64BitIntFields(forceTypeChecking) {
  return forceTypeChecking || typeCheck64BitIntFields;
}

/**
 * Historically, typeCheck64BitIntFields covered both number-shaped validation
 * and type coercion according to jstype (implicit or otherwise). However, we
 * decided to separate the two and now the flag only covers the coercion aspect.
 *
 * This alias is just for code readability within the runtime. External
 * facing code will continue to use the old name since it's tied to the
 * test exemptions.
 */
const shouldCoerce64BitIntFieldsByJsType = getTypeCheck64BitIntFields;
const setShouldCoerce64BitIntFieldsByJsType = setTypeCheck64BitIntFields;

/**
 * TODO(b/169076588): Delete this setter
 */
function setTypeCheck64BitIntFields(/** boolean */ value) {
  assertBoolean(value);
  typeCheck64BitIntFields = value;
}

/**
 * Controls whether or not we range check that 64-bit int values fall
 * within the appropriate (un)signed range for their field type. Values outside
 * of the range will be truncated via two's complement.
 * @type {boolean}
 */
let typeCheck64BitIntFieldsAreInRange = true;

/**
 * Returns whether a 64-bit int field (int64, uint64, ...) fields should
 * be range checked and truncated if necessary.
 *
 * @param {boolean} forceTypeChecking
 * @return {boolean}
 */
function getTypeCheck64BitIntFieldsAreInRange(forceTypeChecking) {
  return forceTypeChecking || typeCheck64BitIntFieldsAreInRange;
}

/**
 * TODO(b/169076588): Delete this setter
 */
function setTypeCheck64BitIntFieldsAreInRange(/** boolean*/ value) {
  assertBoolean(value);
  typeCheck64BitIntFieldsAreInRange = value;
}

/**
 * Controls whether to async throw when the advertised return type of a
 * 64-bit int accessor does not match the actual value's type. For example, if
 * an int64 getter is typed as returning `number`, but actual runtime value is a
 * `string`.
 *
 * This check is temporary as part of the migration to gbigint. The goal is to
 * help us identify what type getter callers actual use in their applications so
 * that we can later apply caller-side type coercions.
 */
let asyncThrowIf64BitIntReturnTypeMismatches = false;

/**
 * Returns true if we should async throw when the advertised return type of a
 * 64-bit int accessor does not match the actual value's type.
 * @return {boolean}
 */
function getAsyncThrowIf64BitIntReturnTypeMismatches() {
  return asyncThrowIf64BitIntReturnTypeMismatches;
}

/**
 * @param {boolean} value
 */
function setAsyncThrowIf64BitIntReturnTypeMismatches(value) {
  asyncThrowIf64BitIntReturnTypeMismatches = value;
}


/**
 * Controls whether or not we enforce that the types of enum fields are
 * correct.
 *
 * @type {!CheckLevel}
 */
let typeCheckEnumFields = CheckLevel.THROW;

/**
 * Returns whether enum field type checks should be skipped.
 * @return {!CheckLevel}
 */
function getTypeCheckEnumFields() {
  return typeCheckEnumFields;
}

/**
 * Enables or disables enum field type-checking.
 *
 * This should be called as little as possible, only for legacy usages.
 */
// TODO(b/235621146): Delete this setter
function setTypeCheckEnumFields(/** !CheckLevel */ value) {
  typeCheckEnumFields = value;
}


/** @define {boolean} */
const USE_DETAILED_MESSAGE_TYPE_HIERARCHY = goog.define(
    'jspb.Message.USE_DETAILED_MESSAGE_TYPE_HIERARCHY',
    goog.DEBUG && !COMPILED);

/** @define {boolean} */
const DETAILED_JSPB_ASSERTS =
    goog.define('jspb.Message.DETAILED_JSPB_ASSERTS', false);

/** @define {boolean} */
const UNSAFE_DISABLE_JSPB_ANY_TYPE_CHECKS =
    goog.define('jspb.Message.UNSAFE_DISABLE_JSPB_ANY_TYPE_CHECKS', false);

/**
 * Controls whether or not we enforce that the types of any fields are
 * correct.
 *
 * @type {boolean}
 */
// TODO(b/261991676): burn down
let unsafeDisableJspbAnyTypeChecks = false;

/**
 * Returns whether string field type checks should be skipped.
 * @return {boolean}
 */
function getUnsafeDisableJspbAnyTypeChecks() {
  return UNSAFE_DISABLE_JSPB_ANY_TYPE_CHECKS || unsafeDisableJspbAnyTypeChecks;
}

/** Sets whether we should disable any type checks. */
function setUnsafeDisableJspbAnyTypeChecks(/** boolean */ value) {
  assertBoolean(value);
  unsafeDisableJspbAnyTypeChecks = value;
}

/** @define {boolean} */
const CHECK_EQUALS_CONSISTENT_WITH_HASH_CODE = goog.define(
    'jspb.CHECK_EQUALS_CONSISTENT_WITH_HASH_CODE', goog.DEBUG && !COMPILED);

/** @type {boolean} */
let checkEqualsConsistentWithHashCode = CHECK_EQUALS_CONSISTENT_WITH_HASH_CODE;

/**
 * Returns whether we should check that `equals` is consistent with `hashCode`.
 * @return {boolean}
 */
function getCheckEqualsConsistentWithHashCode() {
  return CHECK_EQUALS_CONSISTENT_WITH_HASH_CODE &&
      checkEqualsConsistentWithHashCode;
}

/**
 * Sets whether we should check that `equals` is consistent with `hashCode`.
 */
function setCheckEqualsConsistentWithHashCode(/** boolean */ value) {
  checkEqualsConsistentWithHashCode = value;
}

/** @define {boolean} */
const GENERATE_TYPE_NAME_PROPERTIES =
    goog.define('jspb.Message.GENERATE_TYPE_NAME_PROPERTIES', goog.DEBUG);


/** @type {boolean} */
let checkEqualsDoesNotChangeWithTypeInformation = goog.DEBUG;

/**
 * Updates whether we should check that equality checks are not sensitive to
 * type information.
 *
 * @return {boolean}
 */
function getCheckEqualsDoesNotChangeWithTypeInformation() {
  return checkEqualsDoesNotChangeWithTypeInformation;
}

/**
 * Updates whether we should check that equality checks are not sensitive to
 * type information.
 *
 * @param {boolean} updatedCheckEqualsDoesNotChangeWithTypeInformation
 */
function setCheckEqualsDoesNotChangeWithTypeInformation(
    updatedCheckEqualsDoesNotChangeWithTypeInformation) {
  checkEqualsDoesNotChangeWithTypeInformation =
      updatedCheckEqualsDoesNotChangeWithTypeInformation;
}

/**
 * Runs a function without checking that equality checks are not sensitive to
 * type information.
 *
 * @param {function(): T} fn
 * @template T
 */
function withoutCheckingEqualsDoesNotChangeWithTypeInformation(fn) {
  const originalCheckEqualsDoesNotChangeWithTypeInformation =
      checkEqualsDoesNotChangeWithTypeInformation;
  checkEqualsDoesNotChangeWithTypeInformation = false;
  try {
    fn();
  } finally {
    checkEqualsDoesNotChangeWithTypeInformation =
        originalCheckEqualsDoesNotChangeWithTypeInformation;
  }
}

/** @enum {number} */
const LegacyNullableBehavior = {
  LEGACY_NULLABLE: 0,
  ALWAYS_UNDEFINED: 1,
};

/**
 * @define {boolean} Emergency switch to force behavior of legacy nullable
 *     getters to being legacy nullable. go/jspb-api-gotchas#nullability
 */
const LEGACY_NULLABLE_LEGACY_NULLABLE =
    goog.define('jspb.Message.LEGACY_NULLABLE_LEGACY_NULLABLE', false);

/** @type {!LegacyNullableBehavior} */
let legacyNullableBehavior = LEGACY_NULLABLE_LEGACY_NULLABLE ?
    LegacyNullableBehavior.LEGACY_NULLABLE :
    goog.DEBUG && !COMPILED && Math.random() < 0.5 ?
    LegacyNullableBehavior.ALWAYS_UNDEFINED :
    LegacyNullableBehavior.LEGACY_NULLABLE;

/** @return {!LegacyNullableBehavior} */
function getLegacyNullableBehavior() {
  return legacyNullableBehavior;
}

/** @param {!LegacyNullableBehavior} value */
function setLegacyNullableBehavior(value) {
  legacyNullableBehavior = value;
}

/** @type {boolean} */
let asyncThrowIfStringTypedInt64FieldDowngrade = true;

/**
 * Returns whether we should async-throw if we downgraded a STRING field to
 * LEGACY.
 *
 * @return {boolean}
 */
function getAsyncThrowIfStringTypedInt64FieldDowngrade() {
  return asyncThrowIfStringTypedInt64FieldDowngrade;
}

/**
 * Updates whether we should async-throw if we downgraded a STRING field to
 * LEGACY.
 *
 * @param {boolean} updatedAsyncThrowIfStringTypedInt64FieldDowngrade
 */
function setAsyncThrowIfStringTypedInt64FieldDowngrade(
    updatedAsyncThrowIfStringTypedInt64FieldDowngrade) {
  asyncThrowIfStringTypedInt64FieldDowngrade =
      updatedAsyncThrowIfStringTypedInt64FieldDowngrade;
}

/**
 * Runs the given function without potentially async-throwing if we downgraded a
 * STRING field to LEGACY.
 *
 * @param {function(): T} fn
 * @return {T}
 * @template T
 */
function withoutAsyncThrowingIfStringTypedInt64FieldDowngrade(fn) {
  const originalAsyncThrowIfStringTypedInt64FieldDowngrade =
      asyncThrowIfStringTypedInt64FieldDowngrade;
  try {
    asyncThrowIfStringTypedInt64FieldDowngrade = false;
    return fn();
  } finally {
    asyncThrowIfStringTypedInt64FieldDowngrade =
        originalAsyncThrowIfStringTypedInt64FieldDowngrade;
  }
}

/** @define {boolean} */
const disableRandomizeSerialization =
    goog.define('jspb.DISABLE_RANDOMIZE_SERIALIZATION', false);

/** @enum {number} */
const TestSerializationFormat = {
  DEFAULT: 0,
  RANDOMIZED: 1,
  ALWAYS_SPARSE: 2,
};

/** @type {!TestSerializationFormat|undefined} */
let randomizeSerializationFormatSetting = undefined;

/** @return {boolean} */
function randomizationIncompatibleOrDisabledExplicitly() {
  // Disable randomization in optimized code, if our opt out is applied, or
  // if we are in a non-browser environment (e.g. node) in which window will
  // be undefined (note that we use typeof as that allows the variable to be
  // unset).
  //
  // Note that check against node is for build tools for which nondeterminism
  // is problematic as it impacts forge caching.
  return !goog.DEBUG || disableRandomizeSerialization ||
      typeof window === 'undefined' ||
      ((/** @type {{CLOSURE_DEFINES: !Object<string, ?>}} */
        (globalThis))
           ?.CLOSURE_DEFINES)
          ?.['jspb.DISABLE_RANDOMIZE_SERIALIZATION'];
}

/** @return {!TestSerializationFormat} */
function getRandomizeSerializationFormat() {
  const randomizeSerializationFormat = randomizeSerializationFormatSetting ??
      ((goog.DEBUG && !COMPILED && !disableRandomizeSerialization) ?
           TestSerializationFormat.RANDOMIZED :
           TestSerializationFormat.DEFAULT);
  if (randomizeSerializationFormat === TestSerializationFormat.ALWAYS_SPARSE) {
    return randomizeSerializationFormat;
  }

  if (COMPILED || randomizationIncompatibleOrDisabledExplicitly()) {
    return TestSerializationFormat.DEFAULT;
  }

  return randomizeSerializationFormat;
}

function setRandomizeSerializationFormat(
    /** !TestSerializationFormat */ format) {
  randomizeSerializationFormatSetting = format;
}

/**
 * Returns whether binary deserialization should yield gbigint for 64-bit
 * integer fields.
 * @return {boolean}
 */
// TODO: b/319288438 - remove this once we've fully enabled reading gbigint
// values in prod.
function getDeserializeBinary64BitIntsAsGbigint() {
  return true;
}

/**
 * Whether to generate go/jspb-fields-interface devmode functions in uncompiled
 * code.
 *
 * This bit is for tests that explicitly want to exercise the goog.DEBUG=false
 * case.
 *
 * @define {boolean}
 */
const GENERATE_FIELDS_INTERFACE_FOR_TESTING = goog.define(
    'jspb.Message.GENERATE_FIELDS_INTERFACE_FOR_TESTING', goog.DEBUG);

/**
 * Whether to allow copy-on-write for lazy copying of mutable messages.
 *
 * @define {boolean}
 */
const ALLOW_COPY_ON_WRITE =
    goog.define('jspb.Message.ALLOW_COPY_ON_WRITE', true);

/** @type {boolean} */
let disableExtensionRegistryInBinaryDeserializationForTesting = false;

/** @return {boolean} */
function getDisableExtensionRegistryInBinaryDeserializationForTesting() {
  return goog.DEBUG &&
      disableExtensionRegistryInBinaryDeserializationForTesting;
}

function setDisableExtensionRegistryInBinaryDeserializationForTesting(
    /** boolean */ shouldDisable) {
  disableExtensionRegistryInBinaryDeserializationForTesting = shouldDisable;
}

/**
 * Testing bit to disable writing gbigint values back.
 * @define {boolean}
 */
const DISABLE_WRITE_BACK_BIGINT_FOR_TESTING =
    goog.define('jspb.Message.DISABLE_WRITE_BACK_BIGINT_FOR_TESTING', false);

/** @return {boolean} */
function getWriteBackGbigintValues() {
  if (!goog.DEBUG) return true;

  // Coercing to gbigint requires type-checking as it must reject NaN etc.
  if (!typeCheck64BitIntFieldsAreInRange) return false;

  // TODO: b/169076588 - this should be just the defines.
  return !DISABLE_WRITE_BACK_BIGINT_FOR_TESTING &&
      // This excludes tests which explicitly disabled randomization.
      !(randomizeSerializationFormatSetting ===
        TestSerializationFormat.DEFAULT) &&
      // This excludes tests incompatible with randomization.
      !(goog.DEBUG && randomizationIncompatibleOrDisabledExplicitly());
}

exports = {
  ALLOW_COPY_ON_WRITE,
  CheckLevel,
  DETAILED_JSPB_ASSERTS,
  DISABLE_ES6_MAP_SUBCLASSES_FOR_TESTING,
  GENERATE_FIELDS_INTERFACE_FOR_TESTING,
  GENERATE_TYPE_NAME_PROPERTIES,
  USE_DETAILED_MESSAGE_TYPE_HIERARCHY,
  getAsyncThrowIf64BitIntReturnTypeMismatches,
  getAsyncThrowIfStringTypedInt64FieldDowngrade,
  getCheckEqualsDoesNotChangeWithTypeInformation,
  setCheckEqualsDoesNotChangeWithTypeInformation,
  getCheckEqualsConsistentWithHashCode,
  getDeserializeBinary64BitIntsAsGbigint,
  getDisableExtensionRegistryInBinaryDeserializationForTesting,
  TestSerializationFormat,
  getRandomizeSerializationFormat,
  getTypeCheck32BitIntFields,
  getTypeCheck64BitIntFields,
  getTypeCheck64BitIntFieldsAreInRange,
  getTypeCheckEnumFields,
  getUnsafeDisableJspbAnyTypeChecks,
  getWriteBackGbigintValues,
  isBigIntAvailable,
  setAsyncThrowIf64BitIntReturnTypeMismatches,
  setAsyncThrowIfStringTypedInt64FieldDowngrade,
  setCheckEqualsConsistentWithHashCode,
  setDisableExtensionRegistryInBinaryDeserializationForTesting,
  setRandomizeSerializationFormat,
  setShouldCoerce64BitIntFieldsByJsType,
  setTypeCheck32BitIntFields,
  setTypeCheck64BitIntFields,
  setTypeCheck64BitIntFieldsAreInRange,
  setTypeCheckEnumFields,
  setUnsafeDisableJspbAnyTypeChecks,
  shouldCoerce64BitIntFieldsByJsType,
  shouldThrowInArrayConstructorIfArrayIsAlreadyConstructed,
  shouldTransferArrayInConstructor,
  withoutAsyncThrowingIfStringTypedInt64FieldDowngrade,
  withoutCheckingEqualsDoesNotChangeWithTypeInformation,
  LegacyNullableBehavior,
  getLegacyNullableBehavior,
  setLegacyNullableBehavior,
};
