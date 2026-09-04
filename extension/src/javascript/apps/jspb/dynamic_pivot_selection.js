/**
 * @fileoverview Utilities for enabling dynamic pivot selection.
 *
 * This file provides helpers for selecting a "pivot" for JSPB serializations.
 * In the go/jspb-wireformat, you can select which values are serialized into
 * the 'dense array' or 'sparse object' according to where the 'pivot' index
 * is (representing the first field number which would be represented in the
 * sparse object). For example, see the following serializations:
 *
 * - [1,null,2,3]
 *   + Here, the pivot is effectively `4`, or any greater number.
 * - [1,{"2":"hi"}]
 *   + Here, the pivot is `2`.
 * - [{"1":"hi"}]
 *   + Here, the pivot is `1` or `0`.
 *
 * This file provides two different strategies for selecting a pivot:
 *
 * - `MEMORY_COST_PIVOT_SELECTOR`: This strategy selects the pivot which
 *   minimizes the total memory cost of the serialization as a JS object, in V8.
 *   This will eventually be the default for server-side pivot selection.
 *
 * - `WIRE_COST_PIVOT_SELECTOR`: This strategy selects the pivot which
 *   minimizes the uncompressed wire length of the serialization. This may
 *   be useful when application performance is sensitive to serialization size
 *   (e.g. if you have a lot of serializations attached to the DOM), or in some
 *   special cases (such as huge oneofs).
 *
 * The default is to "do nothing", wherein we use the default pivot, which is
 * 500. In practice, this is actually quite close to the result of the
 * `MEMORY_COST_PIVOT_SELECTOR` and is preferable for most applications since it
 * avoids object copies.
 *
 * **NOTE**: These pivot selectors will be ignored on messages with a
 * `message_id` so as not to break the semantics of `equals`. Message IDs
 * **cannot be removed**: see go/jspb-options#message_id.
 */

goog.module('jspb.dynamic_pivot_selection');

const internalPivotSelectors = goog.require('jspb.internal_pivot_selectors');

/**
 * This is an opaque type which represents a pivot selection strategy.
 *
 * See the file overview on dynamic_pivot_selection.js for more information.
 *
 * You cannot construct these directly, use the constants below.
 *
 * @abstract
 */
class PivotSelector {
  constructor() {
    throw (
        goog.DEBUG ? new Error('Do not construct these yourself.') :
                     new Error());
  }
}

/**
 * A pivot selector which minimizes the memory cost of the serialization in V8.
 *
 * @const {!PivotSelector}
 */
const MEMORY_COST_PIVOT_SELECTOR =
    /** @type {!PivotSelector} */ (
        /** @type {?} */ (internalPivotSelectors.memoryCostPivotSelector));

/**
 * A pivot selector which minimizes the uncompressed wire size of the
 * serialization.
 *
 * @const {!PivotSelector}
 */
const WIRE_COST_PIVOT_SELECTOR =
    /** @type {!PivotSelector} */ (
        /** @type {?} */ (internalPivotSelectors.wireCostPivotSelector));

/**
 * A pivot selector which never moves the pivot, even in tests.
 *
 * @const {!PivotSelector}
 * @deprecated there is no good reason to use this. If you are asserting on
 *   proto content, see go/jspb-testing. If you are trying to use a proto as
 *   a key, consider a solution involving hash_code_reexport.js and
 *   Message.equals.
 */
const DETERMINISTIC_PIVOT_SELECTOR =
    /** @type {!PivotSelector} */ (
        /** @type {?} */ (internalPivotSelectors.noChangePivotSelector));

/**
 * This returns the default pivot selector.
 *
 * @const {!PivotSelector}
 */
const DEFAULT_PIVOT_SELECTOR = /** @type {!PivotSelector} */ (
    /** @type {?} */ (
        goog.DEBUG ? internalPivotSelectors.defaultPivotSelector :
                     internalPivotSelectors.noChangePivotSelector));

exports = {
  DETERMINISTIC_PIVOT_SELECTOR,
  MEMORY_COST_PIVOT_SELECTOR,
  PivotSelector,
  WIRE_COST_PIVOT_SELECTOR,
  DEFAULT_PIVOT_SELECTOR,
};
