/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Helper methods that operate on Map-like objects (e.g. ES6
 * Maps).
 */

goog.module('goog.collections.maps');
goog.module.declareLegacyNamespace();

/**
 * A MapLike implements the same public interface as an ES6 Map, without tying
 * the underlying code directly to the implementation. Any additions to this
 * type should also be present on ES6 Maps.
 * @template K,V
 * @record
 */
class MapLike {
  constructor() {
    /** @const {number} The number of items in this map. */
    this.size;
  }

  /**
   * @param {K} key The key to set in the map.
   * @param {V} val The value to set for the given key in the map.
   */
  set(key, val) {};

  /**
   * @param {K} key The key to retrieve from the map.
   * @return {V|undefined} The value for this key, or undefined if the key is
   *     not present in the map.
   */
  get(key) {};

  /**
   * @return {!IteratorIterable<K>} An ES6 Iterator that iterates over the keys
   *     in the map.
   */
  keys() {};

  /**
   * @return {!IteratorIterable<V>} An ES6 Iterator that iterates over the
   *     values in the map.
   */
  values() {};

  /**
   * @param {K} key The key to check.
   * @return {boolean} True iff this key is present in the map.
   */
  has(key) {};
}
exports.MapLike = MapLike;

/**
 * Iterates over each entry in the given entries and sets the entry in
 * the map, overwriting any existing entries for the key.
 * @param {!MapLike<K,V>} map The map to set entries on.
 * @param {ENTRIES} entries The iterable of entries. This iterable should really
 *     be of type Iterable<Array<[K,V]>>, but the tuple type is not
 *     representable in the Closure Type System.
 * @template K,V
 * @template ENTRIES :=
 *     union('null', type('Iterable', type('Array', union(K, V)))) =:
 */
function setAll(map, entries) {
  if (!entries) return;
  for (const [k, v] of entries) {
    map.set(k, v);
  }
}
exports.setAll = setAll;

/**
 * Determines if a given map contains the given value, optionally using
 * a custom comparison function.
 * @param {!MapLike<?,V1>} map The map whose values to check.
 * @param {V2} val The value to check for.
 * @param {(function(V1,V2): boolean)=} valueEqualityFn The comparison function
 *     used to determine if the given value is equivalent to any of the values
 *     in the map. If no function is provided, defaults to strict equality
 *     (===).
 * @return {boolean} True iff the given map contains the given value according
 *     to the comparison function.
 * @template V1,V2
 */
function hasValue(map, val, valueEqualityFn = defaultEqualityFn) {
  for (const v of map.values()) {
    if (valueEqualityFn(v, val)) return true;
  }
  return false;
}
exports.hasValue = hasValue;

/**
 * Gets a value from a map, returning a default value if it's not present.
 * @param {!MapLike<K,V1>} map The map to get the value from.
 * @param {K} key The key to get the value for.
 * @param {V2} defaultValue The value to return if the key is not present in
 *     the map.
 * @return {V1|V2} The value for the given key, or the default value if
 *     the key is not present in the map.
 * @template K,V1,V2
 */
function getWithDefault(map, key, defaultValue) {
  return map.has(key) ? map.get(key) : defaultValue;
}
exports.getWithDefault = getWithDefault;

/** @const {function(?,?): boolean} */
const defaultEqualityFn = (a, b) => a === b;

/**
 * Compares two maps using their public APIs to determine if they have
 * equal contents, optionally using a custom comparison function when comaring
 * values.
 * @param {!MapLike<K,V1>} map The first map
 * @param {!MapLike<K,V2>} otherMap The other map
 * @param {(function(V1,V2): boolean)=} valueEqualityFn The comparison function
 *     used to determine if the values obtained from each map are equivalent. If
 *     no function is provided, defaults to strict equality (===).
 * @return {boolean}
 * @template K,V1,V2
 */
function equals(map, otherMap, valueEqualityFn = defaultEqualityFn) {
  if (map === otherMap) return true;
  if (map.size !== otherMap.size) return false;
  for (const key of map.keys()) {
    if (!otherMap.has(key)) return false;
    if (!valueEqualityFn(map.get(key), otherMap.get(key))) return false;
  }
  return true;
}
exports.equals = equals;

/**
 * Returns a new ES6 Map in which all the keys and values from the
 * given map are interchanged (keys become values and values become keys). If
 * multiple keys in the given map to the same value, the resulting value in the
 * transposed map is implementation-dependent.
 *
 * It acts very similarly to {goog.object.transpose(Object)}.
 * @param {!MapLike<K,V>} map The map to transpose.
 * @return {!Map<V,K>} A transposed version of the given map.
 * @template K,V
 */
function transpose(map) {
  const /** !Map<V,K> */ transposed = new Map();
  for (const key of map.keys()) {
    const val = map.get(key);
    transposed.set(val, key);
  }
  return transposed;
}
exports.transpose = transpose;

/**
 * ToObject returns a new object whose properties are the keys from the Map.
 * @param {!MapLike<K,V>} map The map to convert into an object.
 * @return {!Object<K,V>} An object representation of the Map.
 * @template K,V
 */
function toObject(map) {
  const /** !Object<K,V> */ obj = {};
  for (const key of map.keys()) {
    obj[key] = map.get(key);
  }
  return obj;
}
exports.toObject = toObject;

/**
 * Returns a new map with the same entries.  Assumes that map.constructor
 * takes an iterable of entries.
 * NOTE: once we have deleted goog.structs.Map, we will delete this method and
 * replace it with a direct constructor call.
 * @param {!MapLike<K,V>} map The map to copy.
 * @return {!MapLike<K,V>} A copy of the given map.
 * @template K,V
 */
function clone(map) {
  return new map.constructor(map);
}
exports.clone = clone;

// MOE:begin_strip
// Ensure ES2021 inputs. go/transpile-js
null?.(6_6);
// MOE:end_strip
