/**
 * @fileoverview This file contains helper code used by jspb.utils to
 * handle 64-bit integer conversion to/from strings.
 *
 * @author cfallin@google.com (Chris Fallin)
 *
 * TODO(haberman): move this to javascript/closure/math?
 */
goog.module('jspb.arith');

const {getSplit64High, getSplit64Low, joinSignedDecimalString, joinUnsignedDecimalString, splitDecimalString} = goog.require('jspb.utils');
const {assertExists} = goog.require('goog.asserts');

/**
 * UInt64 implements some 64-bit arithmetic routines necessary for properly
 * handling 64-bit integer fields from protobuf fields with decimal string
 * conversions.
 * @final
 */
class UInt64 {
  /**
   * @param {number} lo The low 32 bits.
   * @param {number} hi The high 32 bits.
   */
  constructor(lo, hi) {
    /**
     * The low 32 bits, always stored as uint32.
     * @public @const {number}
     */
    this.lo = lo >>> 0;

    /**
     * The high 32 bits, always stored as uint32.
     * @public @const {number}
     */
    this.hi = hi >>> 0;
  }

  /**
   * Convert a 64-bit number to a string.
   * @return {string}
   */
  toDecimalString() {
    return joinUnsignedDecimalString(this.lo, this.hi);
  }

  /**
   * Negates this uint64 in twos-complement.
   *
   * @return {!UInt64}
   */
  negateInTwosComplement() {
    if (this.lo === 0) {
      return new UInt64(0, 1 + ~this.hi);
    }
    return new UInt64(~this.lo + 1, ~this.hi);
  }

  /**
   *  Construct a Uint64 from a bigint
   *
   * @param {bigint} n
   * @return {!UInt64}
   */
  static fromBigInt(n) {
    return fromBigInt(n, UInt64, UInt64.fromNumber);
  }

  /**
   * Parse a string into a 64-bit number. Returns `null` on a parse error.
   *
   * @param {string} s
   * @return {?UInt64}
   */
  static fromString(s) {
    if (!s) return UInt64.getZero();
    if (!/^\d+$/.test(s)) {
      // TODO(web-protos-team): Throw an error rather than returning null.
      return null;
    }
    splitDecimalString(s);
    return new UInt64(getSplit64Low(), getSplit64High());
  }

  /**
   * Construct a Uint64 from a JavaScript number.
   * @param {number} n
   * @return {!UInt64}
   */
  static fromNumber(n) {
    return new UInt64(n & ALL_32_BITS, Math.floor(n / TWO_PWR_32_DBL));
  }

  static getZero() {
    return uint64Zero || (uint64Zero = new UInt64(0, 0));
  }
}

let /** !UInt64|undefined */ uint64Zero;

/**
 * Int64 is like UInt64, but modifies string conversions to interpret the stored
 * 64-bit value as a twos-complement-signed integer with decimal string
 * conversions.
 * @final
 */
class Int64 {
  /**
   * @param {number} lo The low 32 bits.
   * @param {number} hi The high 32 bits.
   */
  constructor(lo, hi) {
    /**
     * The low 32 bits, always stored as uint32.
     * @public @const {number}
     */
    this.lo = lo >>> 0;

    /**
     * The high 32 bits, always stored as uint32.
     * @public @const {number}
     */
    this.hi = hi >>> 0;
  }

  /**
   * Convert a 64-bit number to a string.
   * @return {string}
   */
  toDecimalString() {
    return joinSignedDecimalString(this.lo, this.hi);
  }

  /**
   *  Construct a Int64 from a bigint
   *
   * @param {bigint} n
   * @return {!Int64}
   */
  static fromBigInt(n) {
    return fromBigInt(n, Int64, Int64.fromNumber);
  }

  /**
   * Parse a string into a 64-bit number. Returns `null` on a parse error.
   * @param {string} s
   * @return {?Int64}
   */
  static fromString(s) {
    if (!s) return Int64.getZero();
    if (!/^-?\d+$/.test(s)) {
      // TODO(web-protos-team): Throw an error rather than returning null.
      return null;
    }
    splitDecimalString(s);
    return new Int64(getSplit64Low(), getSplit64High());
  }

  /**
   * Construct a Uint64 from a JavaScript number.
   * @param {number} n
   * @return {!Int64}
   */
  static fromNumber(n) {
    return new Int64(n & ALL_32_BITS, Math.floor(n / TWO_PWR_32_DBL));
  }

  static getZero() {
    return int64Zero || (int64Zero = new Int64(0, 0));
  }
}

let /** !Int64|undefined */ int64Zero;

/** @const {number} */
const ALL_32_BITS = 0xFFFFFFFF;

/** @const {number} */
const TWO_PWR_32_DBL = 0x100000000;

let /** bigint */ bigIntMinSafeNumber;
let /** bigint */ bigIntMaxSafeNumber;
let /** bigint */ bigIntAll32Bits;
let /** bigint */ bigInt32;
let /** boolean */ isLittleEndian;
let /** ?BigInt64Array */ sharedBigInt64Array;
let /** ?Uint32Array */ sharedUint32Array;

/**
 * Initializes the BigInt constants on demand.
 */
function initBigIntConstants() {
  if (bigInt32) {
    return;
  }
  bigIntMinSafeNumber = BigInt(Number.MIN_SAFE_INTEGER);
  bigIntMaxSafeNumber = BigInt(Number.MAX_SAFE_INTEGER);
  bigIntAll32Bits = BigInt(ALL_32_BITS);
  bigInt32 = BigInt(32);
}

/**
 * Initializes the shared buffers used by fromBigIntWithBuffer.
 */
function initSharedUintBuffers() {
  if (sharedBigInt64Array) {
    return;
  }
  sharedBigInt64Array = new BigInt64Array(1);
  sharedUint32Array = new Uint32Array(sharedBigInt64Array.buffer);

  // Closure thinks that the BigInt64Array has number values, not bigints.
  // b/519709046
  sharedBigInt64Array[0] = /** @type {?} */ (BigInt(1));
  isLittleEndian = sharedUint32Array[0] === 1;
}

/**
 * Helper to convert a BigInt to a 64-bit integer object using shared buffers.
 * @param {bigint} n
 * @param {function(new:T, number, number)} ctor Constructor for the 64-bit
 *     object.
 * @return {T}
 * @template T
 */
function fromBigIntWithBuffer(n, ctor) {
  initSharedUintBuffers();
  // Closure thinks that the BigInt64Array has number values, not bigints.
  // b/519709046
  assertExists(sharedBigInt64Array)[0] = /** @type {?} */ (n);

  const lo = isLittleEndian ? 0 : 1;
  const hi = 1 - lo;
  return new ctor(
    assertExists(sharedUint32Array)[lo],
    assertExists(sharedUint32Array)[hi],
  );
}

/**
 * Helper to convert from a BigInt to a 64-bit integer object.
 * @param {bigint} n
 * @param {function(new:T, number, number)} ctor Constructor for the 64-bit
 *     object.
 * @param {function(number):T} fromNumber Constructs the 64-bit object from
 *     a number.
 * @return {T}
 * @template T
 */
function fromBigInt(n, ctor, fromNumber) {
  if (typeof BigInt64Array !== 'undefined') {
    return fromBigIntWithBuffer(n, ctor);
  }
  initBigIntConstants();
  // Bigint math is very slow, so if we can safely convert to a number, we can
  // do the math on that instead.
  if (n >= bigIntMinSafeNumber && n <= bigIntMaxSafeNumber) {
    return fromNumber(Number(n));
  }
  const asU64 = BigInt.asUintN(64, n);
  return new ctor(
    /* lowBits = */ Number(asU64 & bigIntAll32Bits),
    /* highBits = */ Number(asU64 >> bigInt32),
  );
}

exports = {
  UInt64,
  Int64,
};
