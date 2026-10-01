/**
 * @fileoverview internal implementation of jspb map fields
 *
 * DO NOT USE THIS OUTSIDE OF THIS PACKAGE.
 */
goog.module('jspb.internal_map');

const {ArrayState, ArrayStateFlags, getArrayState, markArrayImmutable, markKnownMapArray} = goog.require('jspb.internal_array_state');
const {ComparisonTypeInfo, InternalMap, InternalMessage, MAP_PROTOTYPE_MARKER_VALUE, SUPPORTS_HAS_INSTANCE, invisiblePropValue, isImmutableMessage, isMessage, newTransformingIteratorIterable} = goog.require('jspb.internal');
const {DETAILED_JSPB_ASSERTS, DISABLE_ES6_MAP_SUBCLASSES_FOR_TESTING} = goog.require('jspb.internal_options');
const {assert, assertExists} = goog.require('goog.asserts');
const {checkMessageType, messageFromInlineStorage} = goog.require('jspb.internal_accessor_helpers');
const {logNewArray, logOperation, slice} = goog.require('jspb.internal_operations');
const {sinkValue} = goog.require('goog.reflect');

/**
 * @suppress{lateProvide} We are in a require cycle with internal_compare.
 * However it is 'safe' because we only access symbols 'late' and it shouldn't
 * be possible to reference .equals from within the cycle.
 */
goog.require('jspb.internal_compare');

/** @typedef {?} */
let RuntimeValue;

/** @typedef {boolean} */
let CallToMutableOnAccess;

/**
 * Whether we should assert that the given value is of the correct type. This
 * is applied to both keys and values.
 *
 * @typedef {boolean}
 */
let AssertCorrectTypeForSetters;

/**
 * Whether we should return a default value (such as 0 for int fields) for
 * a non-present or invalid value.
 *
 * @typedef {boolean}
 */
let ConstructMissing;



/** @abstract */
class InternalOnlyEmptyMapToken {}

/** @const */
const EMPTY_MAP_TOKEN =
    /** @type {!InternalOnlyEmptyMapToken} */ (/** @type {?} */ ({}));

/**
 * @return {boolean}
 * @nosideeffects
 */
function constructingMapSubclassFails() {
  try {
    sinkValue(new (class extends Map {
      constructor() {
        super();
      }
    })());
    return false;
  } catch {
    return true;
  }
}

/** @const {boolean} */
let USE_DELEGATING_MAPS = /** @type {{valueOf: (function(): boolean)}} */ ({
                            valueOf: () => goog.FEATURESET_YEAR <= 2017 &&
                                (DISABLE_ES6_MAP_SUBCLASSES_FOR_TESTING ||
                                 constructingMapSubclassFails())
                          }).valueOf();

/**
 * @extends {Map<K, V>}
 * @template K, V
 */
class DelegatingMapForPseudoEs6Systems {
  constructor() {
    /** @const {!Map<K, V>} */
    this.map_ = new Map();
  }

  /**
   * @override
   * @param {K} key
   * @return {V|undefined}
   */
  get(key) {
    assert(this.size === this.map_.size);
    return this.map_.get(key);
  }

  /**
   * @override
   * @param {K} key
   * @param {V} value
   * @return {!DelegatingMapForPseudoEs6Systems<K,V>}
   */
  set(key, value) {
    assert(this.size === this.map_.size);
    this.map_.set(key, value);
    this.updateSize_();
    return this;
  }

  /**
   * @override
   * @param {K} key
   * @return {boolean}
   */
  delete(key) {
    assert(this.size === this.map_.size);
    const deleted = this.map_.delete(key);
    this.updateSize_();
    return deleted;
  }

  /**
   * @override
   */
  clear() {
    assert(this.size === this.map_.size);
    this.map_.clear();
    this.updateSize_();
  }

  /**
   * @override
   * @param {K} key
   * @return {boolean}
   */
  has(key) {
    assert(this.size === this.map_.size);
    return this.map_.has(key);
  }

  /**
   * Returns an iterator-iterable over [key, value] pairs in the map.
   *
   * @override
   * @return {!MapIterator<!Array<K|V>>} The iterator-iterable.
   */
  entries() {
    assert(this.size === this.map_.size);
    return this.map_.entries();
  }

  /**
   * Returns an iterator-iterable over keys in the map.
   * @override
   * @return {!MapIterator<K>} The iterator-iterable.
   */
  keys() {
    assert(this.size === this.map_.size);
    return this.map_.keys();
  }

  /**
   * Returns an iterator-iterable over values in the map.
   * @override
   * @return {!MapIterator<V>} The iterator-iterable.
   */
  values() {
    assert(this.size === this.map_.size);
    return this.map_.values();
  }

  /**
   * Iterates over entries in the map, calling a function on each.
   * @template T
   * @param {function(this:T, V, K, !Map<K, V>)} cb
   * @param {T=} thisArg
   * @return {undefined}
   * @override
   */
  forEach(cb, thisArg) {
    assert(this.size === this.map_.size);
    return this.map_.forEach(cb, thisArg);
  }

  /**
   * @override
   * @return {!MapIterator<!Array<K|V>>} The iterator-iterable.
   */
  [Symbol.iterator]() {
    assert(this.size === this.map_.size);
    return this.entries();
  }

  /** @private */
  updateSize_() {
    this.size = this.map_.size;
  }
}

/** @const {!Function} */
const MapBase =
    /** @type {{valueOf: (function(): !Function)}} */ ({
      valueOf: () => {
        if (USE_DELEGATING_MAPS) {
          // Ensure that we are always `instanceof Map` when delegating.
          Object.setPrototypeOf(
              DelegatingMapForPseudoEs6Systems.prototype, Map.prototype);

          // The prototype will be ignored except for `size`, which we need to
          // redefine as an ordinary property so setting doesn't throw for lack
          // of a `set size()`
          Object.defineProperties(DelegatingMapForPseudoEs6Systems.prototype, {
            size: {
              value: 0,
              configurable: true,
              enumerable: true,
              writable: true,
            }
          });

          // Now we can safely use our subclass.
          return DelegatingMapForPseudoEs6Systems;
        } else /* if (!USE_DELEGATING_MAPS) */ {
          // We do this because `extends Map` is special-cased in the JsCompiler
          // so we get special treatment here; but if we were to just write
          // `Map` and extend `MapBase`, it would generate an ES5-style call and
          // fail.
          //
          // TODO(b/36789413): eliminate the intermediate type when possible.
          return class extends Map {
            constructor() {
              super();
            }
          };
        }
      }
    }).valueOf();

/** @return {?} */
function noopToApi(/** ? */ v) {
  return v;
}

/**
 * A Map is a container that is used to implement map fields on message objects.
 *
 * This API closely follows the ES6 Map API, though differs in a few ways:
 *
 * - Constructor doesn't accept standard parameters for Map
 * - The toString is different
 * - Iteration order of iterators is different, es6 Map is insertion ordered and
 * this provides keys in an unspecified order.
 * - We support a `del` method that is equal to `delete` for IE compatibility
 * reasons.
 *
 * See b/206524315 for efforts to resolve these API deltas.
 *
 * If the value type of the map is a message, the `valueCtor` parameter must
 * be passed. In addition to that, there are two other parameters which mediate
 * access to the runtime representation of map values in the underlying array:
 *
 * - `keyToApi` converts a key from its "runtime" representation in the
 *   interanl array to its representation on the API surface (`!V`). The
 *   "runtime" representation in the internal array **must** be a supertype of
 *   the "api" representation.
 *
 * - `valueToApi` converts a value from its "runtime" representation in the
 *   interanl array to its representation on the API surface (`!V`). The
 *   "runtime" representation in the internal array **must** be a supertype of
 *   the "api" representation.
 *
 * @implements {InternalMap}
 * @extends {Map<K,V>}
 * @template K, V
 */
class JspbMap extends MapBase {
  /**
   * This constructor should only be called from generated message code. It is
   * not intended for general use by library consumers.
   *
   * @param {!Array<!Array<?>>} arr the underlying array.
   * @param {?function(new:V, ?=)=} valueCtor The constructor for type
   *     V, if type V is a message type, or else `null`.
   * @param {(function(!RuntimeValue, !AssertCorrectTypeForSetters,
   *     !ConstructMissing):
   *     (!K|undefined))=} keyToApi Decodes keys from their runtime
   *     representation, see the class documentation.
   * @param {(function(!RuntimeValue, !AssertCorrectTypeForSetters,
   *     !ConstructMissing):
   *     (!V|undefined))=} valueToApi Decodes values from their runtime
   *     representation, see the class documentation.
   * @param {!InternalOnlyEmptyMapToken=} amITheEmptyMap an internal-only token
   *     to indicate the given value is the immutable empty map.
   */
  constructor(
      arr, valueCtor, keyToApi = noopToApi, valueToApi = noopToApi,
      amITheEmptyMap) {
    super();

    if (DETAILED_JSPB_ASSERTS) {
      logOperation({constructMap: 1});
    }

    // Require that all maps propagate key and value coercions unless they
    // have a message type.
    assert(
        !DETAILED_JSPB_ASSERTS || (amITheEmptyMap === EMPTY_MAP_TOKEN) ||
        (keyToApi !== noopToApi));
    assert(
        !DETAILED_JSPB_ASSERTS || (amITheEmptyMap === EMPTY_MAP_TOKEN) ||
        (valueCtor !== undefined || valueToApi !== noopToApi));

    /**
     * @private @const {number}
     */
    this.arrayState = getArrayState(arr);

    /**
     * @override
     * @private @const {?function(new:V, ?=)|undefined}
     */
    this.valueCtor = valueCtor;

    /**
     * @private @const {function(!RuntimeValue, !AssertCorrectTypeForSetters,
     *     !ConstructMissing): (!V|undefined)}
     */
    this.keyToApi = keyToApi;

    /**
     * @private @const {function(!RuntimeValue, !AssertCorrectTypeForSetters,
     *     !ConstructMissing,
     *     (?function(new:V,
     * ?=)|undefined), (!CallToMutableOnAccess|undefined),
     * !ArrayState): (!V|undefined)}
     */
    this.valueToApi = this.valueCtor ? messageToApi : valueToApi;

    /**
     * If set, we will call `toMutable` on returned messages to avoid eager
     * shallow copies.
     *
     * @private {!CallToMutableOnAccess|undefined}
     */
    this.callToMutableOnAccess;

    /**
     * The size of this map. Set by ES6 map. Only declared for clutz.
     *
     * @override @public @const {number}
     */
    this.size;

    for (let i = 0; i < arr.length; i++) {
      // Extract a key and value from the given entry.
      //
      // We always apply the key coercion but only apply the value coercion if
      // our values are not messages (in which case it would be expensive).
      //
      // We do this eagerly to avoid having to coerce primitives on every
      // access. Given that for maps we expect ~ one iteration, this should be
      // on average a benefit and does not change the complexity in any case.
      // TODO(lukes): we don't actually check that the entry is an array here
      // we should skip non-Array entries.
      const entry = arr[i];
      const key = keyToApi(
          getKey(entry), /* assertCorrectTypeForSetters= */ false,
          /* constructMissing= */ true);
      let value = getValue(entry);
      if (!valueCtor) {
        value = valueToApi(
            getValue(entry), /* assertCorrectTypeForSetters= */ false,
            /* constructMissing= */ true,
            /* valueCtor = */ undefined,
            /* callToMutableOnAccess = */ undefined, this.arrayState);
      } else {
        // If we are constructed with a missing value payload we want to
        // model this as a default instance.  Due to logic in get() we cannot
        // model this as `undefined` so instead we use `null` (undefined implies
        // no entry)
        if (value === undefined) {
          value = null;
        }
      }
      super.set(key, value);
    }
  }

  /**
   * Throws if trying to mutate a frozen map.
   * @private
   */
  checkNotImmutable_() {
    if (this.arrayState & ArrayStateFlags.IS_IMMUTABLE_ARRAY) {
      throw new Error('Cannot mutate an immutable Map');
    }
  }

  /**
   * Builds a new map from the given arrary using this map as a template
   * @return {!JspbMap<K,V>}
   * @private
   */
  buildNewFromArray(/** !Array<?> */ arr) {
    return new JspbMap(
        arr, this.valueCtor, this.keyToApi,
        // We cast to ? because this might be the message coercion, which has
        // more parameters.
        /** @type {?} */ (this.valueToApi));
  }

  /**
   * Return the map as a 'raw' array, or undefined if it is empty.
   * @param {(function(!Array<?>):!Array<?>)} entryCopier
   * @return {!Array<!Array<!Object>>|undefined}
   * @private
   * @tsType (internalOnlyDoNotUse: never): never
   */
  toArrayOrUndefinedInternal(entryCopier) {
    if (this.size === 0) return undefined;
    return this.toArrayInternalUnsorted(entryCopier);
  }

  /**
   * Return the map as a 'raw' array
   * @param {(function(!Array<?>):!Array<?>)=} entryCopier
   * @return {!Array<!Array<*>>}
   * @private
   * @tsType (internalOnlyDoNotUse: never): never
   */
  toArrayInternalUnsorted(entryCopier) {
    return logNewArray(markKnownMapArray(Array.from(
        super.entries(),
        // Cast to ? because the externs require us to declare an index param.
        /** @type {?} */ (entryCopier))));
  }

  /**
   * Clears the map.
   * @override
   */
  clear() {
    this.checkNotImmutable_();
    super.clear();
  }

  /**
   * Deletes a particular key from the map.
   *
   * @param {K} key
   * @return {boolean} Whether any entry with this key was deleted.
   * @override
   */
  delete(key) {
    this.checkNotImmutable_();
    return super.delete(this.keyToApi(
        key, /* assertCorrectTypeForSetters= */ true,
        /* constructMissing= */ false));
  }

  /**
   * Returns an iterator-iterable over [key, value] pairs in the map.
   *
   * @override
   * @return {!MapIterator<!Array<K|V>>} The iterator-iterable.
   * @tsType (): MapIterator<[K, V]>
   */
  entries() {
    // We only need to call through the logic in `get` for message valued maps.
    if (this.valueCtor) {
      return /** @type {!MapIterator<!Array<K|V>>} */ (
          newTransformingIteratorIterable(super.keys(), getEntryFromMap, this));
    }
    return super.entries();
  }


  // NOTE: we do not need to override keys() because it is already implemented
  // in the superclass and all keys are already coerced.

  /**
   * Returns an iterator-iterable over values in the map.
   * @override
   * @return {!MapIterator<V>} The iterator-iterable.
   * @tsType (): MapIterator<V>
   */
  values() {
    // We only need to call through the logic in `get` for message valued maps.
    if (this.valueCtor) {
      return /** @type {!MapIterator<V>} */ (newTransformingIteratorIterable(
          super.keys(), JspbMap.prototype.get, this));
    }
    // TODO: b/398440852 - trick the compiler by indirectly accessing the
    // superclass's `values` method.
    return super['values']();
  }

  /**
   * Iterates over entries in the map, calling a function on each.
   * @template T
   * @param {function(this:T, V, K, !Map<K, V>)} cb
   * @param {T=} thisArg
   * @override
   */
  forEach(cb, thisArg) {
    if (this.valueCtor) {
      super.forEach((ignores, key, thisMap) => {
        cb.call(thisArg, thisMap.get(key), key, thisMap);
      });
    } else {
      super.forEach(cb, thisArg);
    }
  }


  /**
   * Sets a key in the map to the given value.
   *
   * @override
   * @param {K} key The key
   * @param {V} value The value
   * @return {!JspbMap<K,V>}
   */
  set(key, value) {
    this.checkNotImmutable_();
    key = this.keyToApi(
        key, /* assertCorrectTypeForSetters= */ true,
        /* constructMissing= */ false);

    // If we got an invalid key, it's semantically undefined.
    if (key == null) {
      return this;
    }

    // Assigning null/undefined is the same as clearing. This is slightly
    // inconsistent with es6 maps which allow storing null/undefined.
    // Also we reserve storing literal `null` values to mean a default
    // unconstructed message.
    if (value == null) {
      super.delete(key);
      return this;
    }

    // Type-check the key and value, then set them into the map.
    return super.set(
        key,
        this.valueToApi(
            value, /* assertCorrectTypeForSetters= */ true,
            /* constructMissing = */ true, this.valueCtor,
            /* callToMutableOnAccess= */ false, this.arrayState));
  }

  /**
   * Called by the binary implementation when parsing into an exiting map.
   *
   * The value may be in wire format and require coercions to be inserted into
   * the map.
   * @private
   * @tsType (internalOnlyDoNotUse: never): never
   */
  setWireEntry(/** !Array<?> */ entry) {
    const key = this.keyToApi(
        entry[0], /* assertCorrectTypeForSetters= */ false,
        /* constructMissing= */ true);
    const rawValue = entry[1];
    const value =  // Delay constructing message values until accessed
        this.valueCtor ?
        // similar to the constructor we need to map undefined->null to
        // ensure that we construct a default instance on access instead of
        // treating the field as unset.
        (rawValue === undefined ? null : rawValue) :
        this.valueToApi(
            rawValue, /* assertCorrectTypeForSetters= */ false,
            /* constructMissing= */ true, undefined, false, this.arrayState);
    super.set(key, value);
  }

  /**
   * Returns whether this map contains the given key.
   * @param {K} key
   * @return {boolean}
   * @override
   */
  has(key) {
    return super.has(this.keyToApi(
        key, /* assertCorrectType= */ false, /* constructMissing= */ false));
  }

  /**
   * Gets the value corresponding to a key in the map.
   * @param {K} key
   * @return {V|undefined} The value, or `undefined` if key not present
   * @override
   */
  get(key) {
    // Type-check the key.
    key = this.keyToApi(
        key, /* assertCorrectType= */ false, /* constructMissing= */ false);

    // Retrieve a value and short-circuit if it's undefined.
    const runtimeValue = super.get(key);
    if (runtimeValue === undefined) {
      return undefined;
    }

    // If this is a message valued map with an un-accessed array value,
    // propagate our ownership bit to the unconstructed message value.
    //
    // Note that non-message-valued maps do not need a coercion here because
    // we will already have coereced in the constructor.
    const valueCtor = this.valueCtor;
    if (valueCtor) {
      const value = this.valueToApi(
          runtimeValue, /* assertCorrectTypeForSetters = */ false,
          /* constructMissing = */ true, valueCtor, this.callToMutableOnAccess,
          this.arrayState);

      // Copy back if a coercion should be performed.
      if (value !== runtimeValue) {
        super.set(key, value);
      }
      return value;
    } else {
      // If we had a value coercion, we already ran it in the constructor.
      return runtimeValue;
    }
  }


  /**
   * A `Message.equals` comparator for inlined `jspb.Map` values.
   * @private
   * @param {*} right
   * @param {!ComparisonTypeInfo=} comparisonTypeInfo
   * @return {boolean}
   */
  internalMapComparator(right, comparisonTypeInfo) {
    // This allows for JspbMap|Array|null|undefined to potentially compare as
    // equal so it needs to come before the typeof test below
    return right instanceof JspbMap ?
        compareMapToMap(this, right, comparisonTypeInfo) :
        compareMapToMaybeArray(this, right, comparisonTypeInfo);
  }

  /**
   * @override
   * @return {!MapIterator<!Array<K|V>>} The iterator-iterable.
   * @tsType (): MapIterator<[K, V]>
   */
  [Symbol.iterator]() {
    return this.entries();
  }

  /**
   * @private
   * @return {!MapIterator<!V>} The iterator-iterable.
   */
  rawValuesInternal_() {
    return super.values();
  }
}

/**
 * Indicates to J2CL that equals and hashCode should be available.
 *
 * @private will only be called via interface from j2cl
 * @const {*}
 * @suppress {accessControls} so that we can write as private.
 */
JspbMap.prototype.equalsAndHashCodeShouldBeAvailable = 1;

/**
 * Prevents inheriting monkey patched toJSON properties from Map.
 *
 * See http://yaqs/3206291355315732480
 *
 * @override
 * @private
 * @const {function(): *}
 */
JspbMap.prototype.toJSON = /** @type {?} */ (undefined);

/**
 * A marker for map type-checks.
 *
 * See isEmptyMap in internal.js for more information.
 *
 * @private
 * @override
 * @const {!Object}
 */
JspbMap.prototype.mapPrototypeMarker = MAP_PROTOTYPE_MARKER_VALUE;


/** @return {number} */
function legacySortFunction(/** ? */ a, /** ? */ b) {
  // NOTE: benchmarks reveal that, even on a mix of values, "'' + x" is faster
  // than String(x)
  const aString = '' + a;
  const bString = '' + b;
  return aString > bString ? 1 : aString < bString ? -1 : 0;
}

/**
 * A Map is a container that is used to implement map
 * fields on message objects. It closely follows the ES6 Map API; however,
 * it is distinct because we do not want to depend on external polyfills or
 * on ES6 itself.
 *
 * @implements ReadonlyMap<K, V>
 * @template K, V
 * @abstract
 */
class ImmutableMap {
  constructor() {
    /** @public @const {number} */
    this.size;
    throw new Error('please construct maps as mutable then call toImmutable');
  }


  /**
   * Returns an iterator-iterable over [key, value] pairs in the map.
   * Closure compiler sadly doesn't support tuples, ie. Iterator<[K,V]>.
   * @return {!MapIterator<!Array<K|V>>} The iterator-iterable.
   * @override
   * @abstract
   * @tsType (): MapIterator<[K, V]>
   */
  entries() {}

  /**
   * Returns an iterator-iterable over keys in the map.
   * @return {!MapIterator<K>} The iterator-iterable.
   * @override
   * @abstract
   * @tsType (): MapIterator<K>
   */
  keys() {}

  /**
   * Returns an iterator-iterable over values in the map.
   * @return {!MapIterator<V>} The iterator-iterable.
   * @override
   * @abstract
   * @tsType (): MapIterator<V>
   */
  values() {}

  /**
   * Iterates over entries in the map, calling a function on each.
   * @template T
   * @template THIS
   * @param {function(this:T, V, K, THIS)} cb
   * @param {T=} thisArg
   * @this {THIS}
   * @override
   * @abstract
   */
  forEach(cb, thisArg) {}

  /**
   * Gets the value corresponding to a key in the map.
   * @param {K} key
   * @return {V|undefined} The value, or `undefined` if key not present
   * @override
   * @abstract
   */
  get(key) {}

  /**
   * Determines whether the given key is present in the map.
   * @param {K} key
   * @return {boolean} `true` if the key is present
   * @override
   * @abstract
   */
  has(key) {}

  /**
   * @abstract
   * @override
   * @return {!MapIterator<!Array<K|V>>} The iterator-iterable.
   * @tsType (): MapIterator<[K, V]>
   */
  [Symbol.iterator]() {};
}

/**
 * @return {K}
 * @template K,V
 */
function getKey(/** !Array<K|V> */ entry) {
  return entry[0];
}
/**
 * @return {V}
 * @template K,V
 */
function getValue(/** !Array<K|V> */ entry) {
  return entry[1];
}
/**
 * @return {V}
 * @template K,V
 */
function setValue(/** !Array<K|V> */ entry, /** V */ value) {
  return entry[1] = value;
}


/*
 * Overrides the behavior of `instanceof` to prevent checks.
 *
 * Because this class should be completely devirtualized and optimized away
 * by the JSCompiler, we cannot depend on its constructor or prototype. As
 * a result, `instanceof` checks cannot be made to work at runtime and we need
 * to defensively fail.
 */
if (SUPPORTS_HAS_INSTANCE) {
  // TODO(b/219105470): use defineProperty once JSC supports it
  const rejectInstanceof = () => {
    throw new Error(
        goog.DEBUG ?
            ('Cannot perform instanceof checks on ImmutableMap: ' +
             'please use isImmutableMap or isMutableMap to assert on the ' +
             'mutability of a map. See go/jspb-api-gotchas#immutable-classes for ' +
             'more information') :
            undefined);
  };
  Object.defineProperties(ImmutableMap, {
    [Symbol.hasInstance]: invisiblePropValue(rejectInstanceof),
  });
  assert(
      ImmutableMap[Symbol.hasInstance] === rejectInstanceof,
      'defineProperties did not work: was it monkey-patched?');
}


/**
 * Returns whether a map is immutable.
 *
 * @param {!ReadonlyMap<K,V>} m
 * @template K, V
 * @return {boolean}
 * @tsType <K, V>(m: ReadonlyMap<K, V>): m is
 * import('google3/javascript/apps/jspb/internal_map').ImmutableMap<K, V>
 */
function isImmutableMap(m) {
  return m instanceof JspbMap &&
      !!(m.arrayState & ArrayStateFlags.IS_IMMUTABLE_ARRAY);
}

/**
 * Returns whether a map is mutable.
 *
 * @param {!ReadonlyMap<K,V>} m
 * @return {boolean}
 * @template K, V
 * @suppress {visibility}
 * @tsType <K,V>(m: ReadonlyMap<K,V>):
 * m is import('google3/javascript/apps/jspb/internal_map').JspbMap<K,V>
 */
function isMutableMap(m) {
  return m instanceof JspbMap &&
      !(m.arrayState & ArrayStateFlags.IS_IMMUTABLE_ARRAY);
}

/**
 * Converts an immutable wire representation of a message (either an inline
 * object or a JSPB array) to an API representation (a Message object).
 *
 * @param {!RuntimeValue} encoded
 * @param {!AssertCorrectTypeForSetters} assertCorrectTypeForSetters
 * @param {!ConstructMissing} constructMissing
 * @param {?function(new:V, ?=)|undefined} ctor
 * @param {!CallToMutableOnAccess|undefined} callToMutableOnAccess
 * @param {!ArrayState} parentArrayState
 * @return {V}
 * @template V
 */
function messageToApi(
    encoded, assertCorrectTypeForSetters, constructMissing, ctor,
    callToMutableOnAccess, parentArrayState) {
  if (assertCorrectTypeForSetters) {
    checkMessageType(encoded, /** @type {?} */ (ctor));
  }

  let msg = messageFromInlineStorage(
      encoded,
      /** @type {function(new:V, ?=)} */ (ctor),
      /* constructMissing = */ constructMissing,
      /* parentArrayState = */ parentArrayState);
  if (callToMutableOnAccess) {
    msg = msg.toMutable();
  }

  // Make sure we don't return a mutable message from an immutable map.
  assert(
      !(parentArrayState & ArrayStateFlags.IS_IMMUTABLE_ARRAY) ||
      isImmutableMessage(msg));

  // If !isImmutable and !callToMutableOnAccess, then this a readonly map access
  // and we don't care whether the returned message is mutable.
  return msg;
}

/**
 * @param {!Map<*,*>} map1
 * @param {!Map<*,*>} map2
 * @param {!ComparisonTypeInfo=} comparisonTypeInfo
 * @return {boolean}
 */
function compareMapToMap(map1, map2, comparisonTypeInfo) {
  const result = compareMapToMapInternal(map1, map2, comparisonTypeInfo);
  if (DETAILED_JSPB_ASSERTS) {
    // Check that our map equality tests are consistent, since there are
    // three implementations.
    assert(
        result ===
        compareMapArraysInternal(
            [...map1.entries()], [...map2.entries()], comparisonTypeInfo));
    assert(
        result ===
        compareMapToMaybeArrayInternal(
            map2, [...map1.entries()], comparisonTypeInfo));
  }
  return result;
}

/**
 * @param {!Map<*,*>} map1
 * @param {!Map<*,*>} map2
 * @param {!ComparisonTypeInfo=} comparisonTypeInfo
 * @return {boolean}
 */
function compareMapToMapInternal(map1, map2, comparisonTypeInfo) {
  if (map1.size != map2.size) {
    return false;
  }

  let equal = true;
  map1.forEach((value, key) => {
    if (!goog.module.get('jspb.internal_compare')
             .compareFields(
                 value, map2.get(key),
                 comparisonTypeInfo?.getFieldComparisonTypeInfo(2))) {
      equal = false;
    }
  });
  return equal;
}

/** @return {number} */
function compareEntryKeys(/** ? */ a, /** ? */ b) {
  if (!Array.isArray(a) || !Array.isArray(b)) return 0;
  const aKey = '' + a[0];
  const bKey = '' + b[0];
  return (aKey === bKey) ? 0 : ((aKey < bKey) ? -1 : 1);
}

/**
 * @param {!JspbMap<*,*>} map
 * @param {*} arr
 * @param {!ComparisonTypeInfo=} comparisonTypeInfo
 * @return {boolean}
 */
function compareMapToMaybeArray(map, arr, comparisonTypeInfo) {
  const result = compareMapToMaybeArrayInternal(map, arr, comparisonTypeInfo);
  if (DETAILED_JSPB_ASSERTS) {
    // Check that our map equality tests are consistent, since there are
    // three implementations.
    // Make a deep copy of the array so that we don't accidentally
    // mark arrays as constructed when they are not.
    const cloned = Array.isArray(arr) ? arr.map(e => {
      if (Array.isArray(e)) {
        let [key, value] = e;
        if (isMessage(value)) {
          value = /** @type {!InternalMessage} */ (value).toJsonValue();
        } else if (Array.isArray(value)) {
          // Try to clone the array.  This is not guaranteed to work,
          // consider a nested immutable message.  However, this is only needed
          // for our own tests and it happens to work in those cases.
          // Ideally we would just call `cloneToJsonValue` but `internal_copy`
          // is already importing us so we cannot easily import them.
          value = typeof structuredClone === 'function' ?
              structuredClone(value) :
              JSON.parse(JSON.stringify(value));
        }
        return [key, value];  // other keys and values are safe to share.
      }
      return e;  // shrug, no idea what this is
    }) :
                                        [];
    assert(
        result ===
            compareMapToMapInternal(
                map,
                new JspbMap(
                    cloned, map.valueCtor,
                    /** @type {?} */ (map.keyToApi ?? noopToApi),
                    /** @type {?} */ (map.valueToApi ?? noopToApi)),
                comparisonTypeInfo),
        'Map to map comparison failed');
    assert(
        result ===
            compareMapArraysInternal(
                [...map.entries()], Array.isArray(arr) ? slice(arr) : [],
                comparisonTypeInfo),
        'Map to array comparison failed');
  }
  return result;
}

/**
 * @param {!Map<*,*>} map
 * @param {*} arr
 * @param {!ComparisonTypeInfo=} comparisonTypeInfo
 * @return {boolean}
 */
function compareMapToMaybeArrayInternal(map, arr, comparisonTypeInfo) {
  // A null value is equivalent to an empty map.
  if (arr == null) return map.size === 0;

  // A non-array is a schema mismatch.
  if (!(Array.isArray(arr))) return false;

  // Fail fast if the array is not at least as long.
  if (map.size > arr.length) return false;

  // Sort keys so that we can find duplicates. We pass a manual comparator
  // to avoid stringification of numeric keys (which is about a 4x improvement).
  //
  // TODO(b/268642072): we should not re-do this work for every comparison.
  const arrArray = /** @type {!Array<!Array<?>>} */ (arr);
  const entries = slice(arrArray);
  Array.prototype.sort.call(entries, compareEntryKeys);

  // Ensure that every key-value pair in the array is also in the map.
  //
  // Array sorting has to be stable so the last element in the original array
  // will always be the last element of this one, for any given key. As a
  // result, we iterate backward and simply continue if the last element we
  // checked has the same key.
  let uniqueKeys = 0;
  let /** ? */ lastKey = undefined;
  for (let i = entries.length - 1; i >= 0; i--) {
    const entry = entries[i];
    if (!entry || !Array.isArray(entry) || entry.length !== 2) {
      return false;
    }
    const key = entry[0];
    if (key === lastKey) continue;
    if (!goog.module.get('jspb.internal_compare')
             .compareFields(
                 map.get(key), entry[1],
                 comparisonTypeInfo?.getFieldComparisonTypeInfo(2))) {
      return false;
    }
    lastKey = key;
    uniqueKeys++;
  }

  // Ensure we did not have any missing entries.
  return uniqueKeys === map.size;
}

/**
 * @param {!Array} aArr
 * @param {!Array} bArr
 * @param {!ComparisonTypeInfo=} comparisonTypeInfo
 * @return {boolean}
 */
function compareMapArraysInternal(aArr, bArr, comparisonTypeInfo) {
  // A non-array is a schema mismatch.
  if (!(Array.isArray(aArr))) return false;
  if (!(Array.isArray(bArr))) return false;

  // Sort keys so that we can find duplicates. We pass a manual comparator
  // to avoid stringification of numeric keys (which is about a 4x improvement).
  //
  // TODO(b/268642072): we should not re-do this work for every comparison.
  const a = slice(aArr);
  const b = slice(bArr);
  Array.prototype.sort.call(a, compareEntryKeys);
  Array.prototype.sort.call(b, compareEntryKeys);

  // Special-case zero-length maps.
  const aLen = a.length;
  const bLen = b.length;
  if (aLen === 0 && bLen === 0) return true;

  // Ensure that every key-value pair is in each array.
  let aIdx = 0;
  let bIdx = 0;
  while (aIdx < aLen && bIdx < bLen) {
    // Advance to the last entry with this key for both arrays.
    let aNextEntry;
    let aEntry = a[aIdx];
    if (!Array.isArray(aEntry)) return false;
    let aKey = aEntry[0];
    while (aIdx < (aLen - 1) &&
           goog.module.get('jspb.internal_compare')
               .compareFields((aNextEntry = a[aIdx + 1])[0], aKey)) {
      aIdx++;
      aEntry = aNextEntry;
    }

    let bNextEntry;
    let bEntry = b[bIdx];
    if (!Array.isArray(bEntry)) return false;
    let bKey = bEntry[0];
    while (bIdx < (bLen - 1) &&
           goog.module.get('jspb.internal_compare')
               .compareFields((bNextEntry = b[bIdx + 1])[0], bKey)) {
      bIdx++;
      bEntry = bNextEntry;
    }

    // If our keys are unequal, the values are unequal. We use the field
    // comparison methods here so we tolerate number vs string/bool comparisons.
    if (!goog.module.get('jspb.internal_compare').compareFields(aKey, bKey)) {
      return false;
    }

    // Otherwise compare the values.
    if (!goog.module.get('jspb.internal_compare')
             .compareFields(
                 aEntry[1], bEntry[1],
                 comparisonTypeInfo?.getFieldComparisonTypeInfo(2))) {
      return false;
    }

    // Advance to our next index.
    aIdx++;
    bIdx++;
  }

  // If it wasn't the case that both aIdx and bIdx consumed all elements,
  // then we're unequal.
  return (aIdx >= aLen && bIdx >= bLen);
}

/**
 * @param {!Array} a
 * @param {!Array} b
 * @param {!ComparisonTypeInfo=} comparisonTypeInfo
 * @return {boolean}
 */
function compareMapArrays(a, b, comparisonTypeInfo) {
  const result = compareMapArraysInternal(a, b);
  // TODO: varomodt - add back an internal assert here once we know how to
  // deal with number vs bigint variance.
  return result;
}

/**
 * Gets the entry corresponding to a key in the map.
 *
 * Asserts that the key is present.
 *
 * @this {!JspbMap<K, V>}
 * @param {K} key
 * @return {!Array<K|V>} The entry
 * @template K, V
 */
function getEntryFromMap(key) {
  return [key, assertExists(this.get(key))];
}

let /** !JspbMap<?, ?>|undefined */ immutableEmptyMap;

/**
 * @return {!JspbMap<?, ?>}
 */
function getImmutableEmptyMap() {
  return immutableEmptyMap ||= new JspbMap(
             markArrayImmutable(logNewArray([])), /* valueCtor = */ undefined,
             /* keyToApi = */ undefined, /* valueToApi = */ undefined,
             /* amITheEmptyMap = */ EMPTY_MAP_TOKEN);
}

exports = {
  ImmutableMap,
  getImmutableEmptyMap,
  JspbMap,
  isImmutableMap,
  isMutableMap,
  compareMapArrays,
};
