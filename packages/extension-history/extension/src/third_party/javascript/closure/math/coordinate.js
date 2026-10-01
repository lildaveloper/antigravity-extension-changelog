/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A utility class for representing two-dimensional positions.
 */


goog.module('goog.math.Coordinate');
goog.module.declareLegacyNamespace();

const googMath = goog.require('goog.math');

/**
 * Class for representing coordinates and positions.
 * @param {number=} opt_x Left, defaults to 0.
 * @param {number=} opt_y Top, defaults to 0.
 * @struct
 * @constructor
 */
function Coordinate(opt_x, opt_y) {
  /**
   * X-value
   * @type {number}
   */
  this.x = (opt_x !== undefined) ? opt_x : 0;

  /**
   * Y-value
   * @type {number}
   */
  this.y = (opt_y !== undefined) ? opt_y : 0;
}

/**
 * Returns a new copy of the coordinate.
 * @return {!Coordinate} A clone of this coordinate.
 */
Coordinate.prototype.clone = function() {
  return new Coordinate(this.x, this.y);
};

if (goog.DEBUG) {
  /**
   * Returns a nice string representing the coordinate.
   * @return {string} In the form (50, 73).
   * @override
   */
  Coordinate.prototype.toString = function() {
    return '(' + this.x + ', ' + this.y + ')';
  };
}

/**
 * Returns whether the specified value is equal to this coordinate.
 * @param {*} other Some other value.
 * @return {boolean} Whether the specified value is equal to this coordinate.
 */
Coordinate.prototype.equals = function(other) {
  return other instanceof Coordinate && Coordinate.equals(this, other);
};

/**
 * Compares coordinates for equality.
 * @param {Coordinate} a A Coordinate.
 * @param {Coordinate} b A Coordinate.
 * @return {boolean} True iff the coordinates are equal, or if both are null.
 */
Coordinate.equals = function(a, b) {
  if (a == b) {
    return true;
  }
  if (!a || !b) {
    return false;
  }
  return a.x == b.x && a.y == b.y;
};

/**
 * Returns the distance between two coordinates.
 * @param {!Coordinate} a A Coordinate.
 * @param {!Coordinate} b A Coordinate.
 * @return {number} The distance between `a` and `b`.
 */
Coordinate.distance = function(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * Returns the magnitude of a coordinate.
 * @param {!Coordinate} a A Coordinate.
 * @return {number} The distance between the origin and `a`.
 */
Coordinate.magnitude = function(a) {
  return Math.sqrt(a.x * a.x + a.y * a.y);
};

/**
 * Returns the angle from the origin to a coordinate.
 * @param {!Coordinate} a A Coordinate.
 * @return {number} The angle, in degrees, clockwise from the positive X
 *     axis to `a`.
 */
Coordinate.azimuth = function(a) {
  return googMath.angle(0, 0, a.x, a.y);
};

/**
 * Returns the squared distance between two coordinates. Squared distances can
 * be used for comparisons when the actual value is not required.
 *
 * Performance note: eliminating the square root is an optimization often used
 * in lower-level languages, but the speed difference is not nearly as
 * pronounced in JavaScript (only a few percent.)
 *
 * @param {!Coordinate} a A Coordinate.
 * @param {!Coordinate} b A Coordinate.
 * @return {number} The squared distance between `a` and `b`.
 */
Coordinate.squaredDistance = function(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return dx * dx + dy * dy;
};

/**
 * Returns the difference between two coordinates as a new
 * Coordinate.
 * @param {!Coordinate} a A Coordinate.
 * @param {!Coordinate} b A Coordinate.
 * @return {!Coordinate} A Coordinate representing the difference
 *     between `a` and `b`.
 */
Coordinate.difference = function(a, b) {
  return new Coordinate(a.x - b.x, a.y - b.y);
};

/**
 * Returns the sum of two coordinates as a new Coordinate.
 * @param {!Coordinate} a A Coordinate.
 * @param {!Coordinate} b A Coordinate.
 * @return {!Coordinate} A Coordinate representing the sum of the two
 *     coordinates.
 */
Coordinate.sum = function(a, b) {
  return new Coordinate(a.x + b.x, a.y + b.y);
};

/**
 * Rounds the x and y fields to the next larger integer values.
 * @return {!Coordinate} This coordinate with ceil'd fields.
 */
Coordinate.prototype.ceil = function() {
  this.x = Math.ceil(this.x);
  this.y = Math.ceil(this.y);
  return this;
};

/**
 * Rounds the x and y fields to the next smaller integer values.
 * @return {!Coordinate} This coordinate with floored fields.
 */
Coordinate.prototype.floor = function() {
  this.x = Math.floor(this.x);
  this.y = Math.floor(this.y);
  return this;
};

/**
 * Rounds the x and y fields to the nearest integer values.
 * @return {!Coordinate} This coordinate with rounded fields.
 */
Coordinate.prototype.round = function() {
  this.x = Math.round(this.x);
  this.y = Math.round(this.y);
  return this;
};

/**
 * Translates this box by the given offsets. If a `Coordinate`
 * is given, then the x and y values are translated by the coordinate's x and y.
 * Otherwise, x and y are translated by `tx` and `opt_ty`
 * respectively.
 * @param {number|Coordinate} tx The value to translate x by or the
 *     the coordinate to translate this coordinate by.
 * @param {number=} opt_ty The value to translate y by.
 * @return {!Coordinate} This coordinate after translating.
 */
Coordinate.prototype.translate = function(tx, opt_ty) {
  if (tx instanceof Coordinate) {
    this.x += tx.x;
    this.y += tx.y;
  } else {
    this.x += Number(tx);
    if (typeof opt_ty === 'number') {
      this.y += opt_ty;
    }
  }
  return this;
};

/**
 * Scales this coordinate by the given scale factors. The x and y values are
 * scaled by `sx` and `opt_sy` respectively.  If `opt_sy`
 * is not given, then `sx` is used for both x and y.
 * @param {number} sx The scale factor to use for the x dimension.
 * @param {number=} opt_sy The scale factor to use for the y dimension.
 * @return {!Coordinate} This coordinate after scaling.
 */
Coordinate.prototype.scale = function(sx, opt_sy) {
  const sy = (typeof opt_sy === 'number') ? opt_sy : sx;
  this.x *= sx;
  this.y *= sy;
  return this;
};

/**
 * Rotates this coordinate clockwise about the origin (or, optionally, the given
 * center) by the given angle, in radians.
 * @param {number} radians The angle by which to rotate this coordinate
 *     clockwise about the given center, in radians.
 * @param {!Coordinate=} opt_center The center of rotation. Defaults
 *     to (0, 0) if not given.
 */
Coordinate.prototype.rotateRadians = function(radians, opt_center) {
  const center = opt_center || new Coordinate(0, 0);

  const x = this.x;
  const y = this.y;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);

  this.x = (x - center.x) * cos - (y - center.y) * sin + center.x;
  this.y = (x - center.x) * sin + (y - center.y) * cos + center.y;
};

/**
 * Rotates this coordinate clockwise about the origin (or, optionally, the given
 * center) by the given angle, in degrees.
 * @param {number} degrees The angle by which to rotate this coordinate
 *     clockwise about the given center, in degrees.
 * @param {!Coordinate=} opt_center The center of rotation. Defaults
 *     to (0, 0) if not given.
 */
Coordinate.prototype.rotateDegrees = function(degrees, opt_center) {
  this.rotateRadians(googMath.toRadians(degrees), opt_center);
};

exports = Coordinate;
