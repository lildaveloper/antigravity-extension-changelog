// DO NOT OPENSOURCE
goog.module('goog.flags');
goog.module.declareLegacyNamespace();

const toggles = goog.require('google3.third_party.javascript.closure.flags.flags$2etoggles');

// NOTE: STAGING defaults to true unless overridden by command-line flag.
/** @type {boolean} */
const STAGING = goog.readFlagInternalDoNotUseOrElse(1, goog.FLAGS_STAGING_DEFAULT);
/**
 * @const {boolean}
 * @see google3/third_party/javascript/closure/flags/flags.proto?q=symbol:\bUSE_USER_AGENT_CLIENT_HINTS\b
 */
exports.USE_USER_AGENT_CLIENT_HINTS = toggles.TOGGLE_GoogFlags__use_toggles ? toggles.TOGGLE_GoogFlags__use_user_agent_client_hints__enable :
    goog.readFlagInternalDoNotUseOrElse(610401301, false);
/**
 * @const {boolean}
 * @see google3/third_party/javascript/closure/flags/flags.proto?q=symbol:\bASYNC_THROW_ON_UNICODE_TO_BYTE\b
 */
exports.ASYNC_THROW_ON_UNICODE_TO_BYTE = toggles.TOGGLE_GoogFlags__use_toggles ? toggles.TOGGLE_GoogFlags__async_throw_on_unicode_to_byte__enable :
    goog.readFlagInternalDoNotUseOrElse(899588437, false);
/**
 * @const {boolean}
 * @see google3/third_party/javascript/closure/flags/flags.proto?q=symbol:\bCLIENT_ONLY_WIZ_QUEUE_EFFECT_AND_ON_INIT_INITIAL_RUNS\b
 */
exports.CLIENT_ONLY_WIZ_QUEUE_EFFECT_AND_ON_INIT_INITIAL_RUNS = toggles.TOGGLE_GoogFlags__use_toggles ? toggles.TOGGLE_GoogFlags__override_disable_toggles || !toggles.TOGGLE_GoogFlags__client_only_wiz_queue_effect_and_on_init_initial_runs__disable :
    goog.readFlagInternalDoNotUseOrElse(772657768, true);
/**
 * @const {boolean}
 * @see google3/third_party/javascript/closure/flags/flags.proto?q=symbol:\bCLIENT_ONLY_WIZ_CONTEXT_PER_COMPONENT\b
 */
exports.CLIENT_ONLY_WIZ_CONTEXT_PER_COMPONENT = toggles.TOGGLE_GoogFlags__use_toggles ? goog.DEBUG || toggles.TOGGLE_GoogFlags__client_only_wiz_context_per_component__enable :
    goog.readFlagInternalDoNotUseOrElse(513659523, goog.DEBUG);
/**
 * @const {boolean}
 * @see google3/third_party/javascript/closure/flags/flags.proto?q=symbol:\bCLIENT_ONLY_WIZ_LAZY_TSX\b
 */
exports.CLIENT_ONLY_WIZ_LAZY_TSX = toggles.TOGGLE_GoogFlags__use_toggles ? toggles.TOGGLE_GoogFlags__override_disable_toggles || !toggles.TOGGLE_GoogFlags__client_only_wiz_lazy_tsx__disable :
    goog.readFlagInternalDoNotUseOrElse(568333945, true);
/**
 * @const {boolean}
 * @see google3/third_party/javascript/closure/flags/flags.proto?q=symbol:\bFIXED_NOOPENER_BEHAVIOR\b
 */
exports.FIXED_NOOPENER_BEHAVIOR = toggles.TOGGLE_GoogFlags__use_toggles ? toggles.TOGGLE_GoogFlags__override_disable_toggles || !toggles.TOGGLE_GoogFlags__fixed_noopener_behavior__disable :
    goog.readFlagInternalDoNotUseOrElse(1331761403, true);
/**
 * @const {boolean}
 * @see google3/third_party/javascript/closure/flags/flags.proto?q=symbol:\bWIZ_ENABLE_NATIVE_PROMISE\b
 */
exports.WIZ_ENABLE_NATIVE_PROMISE = toggles.TOGGLE_GoogFlags__use_toggles ? goog.DEBUG || toggles.TOGGLE_GoogFlags__wiz_enable_native_promise__enable :
    goog.readFlagInternalDoNotUseOrElse(651175828, goog.DEBUG);
/**
 * @const {boolean}
 * @see google3/third_party/javascript/closure/flags/flags.proto?q=symbol:\bJSPB_DISALLOW_MESSAGE_TOJSON\b
 */
exports.JSPB_DISALLOW_MESSAGE_TOJSON = toggles.TOGGLE_GoogFlags__use_toggles ? goog.DEBUG || toggles.TOGGLE_GoogFlags__jspb_disallow_message_tojson__enable :
    goog.readFlagInternalDoNotUseOrElse(722764542, goog.DEBUG);
/**
 * @const {boolean}
 * @see google3/third_party/javascript/closure/flags/flags.proto?q=symbol:\bJSPB_USE_CONSTANT_DEFAULT_PIVOT\b
 */
exports.JSPB_USE_CONSTANT_DEFAULT_PIVOT = toggles.TOGGLE_GoogFlags__use_toggles ? goog.DEBUG || toggles.TOGGLE_GoogFlags__jspb_use_constant_default_pivot__enable :
    goog.readFlagInternalDoNotUseOrElse(748402145, goog.DEBUG);
/**
 * @const {boolean}
 * @see google3/third_party/javascript/closure/flags/flags.proto?q=symbol:\bJSPB_SERIALIZE_WITH_DYNAMIC_PIVOT_SELECTOR\b
 */
exports.JSPB_SERIALIZE_WITH_DYNAMIC_PIVOT_SELECTOR = toggles.TOGGLE_GoogFlags__use_toggles ? goog.DEBUG || toggles.TOGGLE_GoogFlags__jspb_serialize_with_dynamic_pivot_selector__enable :
    goog.readFlagInternalDoNotUseOrElse(748402146, goog.DEBUG);
/**
 * @const {boolean}
 * @see google3/third_party/javascript/closure/flags/flags.proto?q=symbol:\bJSPB_THROW_IN_ARRAY_CONSTRUCTOR_IF_ARRAY_IS_ALREADY_CONSTRUCTED\b
 */
exports.JSPB_THROW_IN_ARRAY_CONSTRUCTOR_IF_ARRAY_IS_ALREADY_CONSTRUCTED = toggles.TOGGLE_GoogFlags__use_toggles ? toggles.TOGGLE_GoogFlags__override_disable_toggles || !toggles.TOGGLE_GoogFlags__jspb_throw_in_array_constructor_if_array_is_already_constructed__disable :
    goog.readFlagInternalDoNotUseOrElse(748402147, true);
/**
 * @const {boolean}
 * @see google3/third_party/javascript/closure/flags/flags.proto?q=symbol:\bJSPB_LIMIT_RECURSION_DEPTH\b
 */
exports.JSPB_LIMIT_RECURSION_DEPTH = toggles.TOGGLE_GoogFlags__use_toggles ? toggles.TOGGLE_GoogFlags__override_disable_toggles || !toggles.TOGGLE_GoogFlags__jspb_limit_recursion_depth__disable :
    goog.readFlagInternalDoNotUseOrElse(1602613185, true);
/**
 * @const {boolean}
 * @see google3/third_party/javascript/closure/flags/flags.proto?q=symbol:\bBATCH_FC_DATA_FETCHES_IN_MICROTASK\b
 */
exports.BATCH_FC_DATA_FETCHES_IN_MICROTASK = toggles.TOGGLE_GoogFlags__use_toggles ? goog.DEBUG || toggles.TOGGLE_GoogFlags__batch_fc_data_fetches_in_microtask__enable :
    goog.readFlagInternalDoNotUseOrElse(861377723, goog.DEBUG);
/**
 * @const {boolean}
 * @see google3/third_party/javascript/closure/flags/flags.proto?q=symbol:\bUSE_UNOBFUSCATED_RPC_METHOD_NAMES\b
 */
exports.USE_UNOBFUSCATED_RPC_METHOD_NAMES = toggles.TOGGLE_GoogFlags__use_toggles ? goog.DEBUG || toggles.TOGGLE_GoogFlags__use_unobfuscated_rpc_method_names__enable :
    goog.readFlagInternalDoNotUseOrElse(861377724, goog.DEBUG);
/**
 * @const {boolean}
 * @see google3/third_party/javascript/closure/flags/flags.proto?q=symbol:\bMINIMIZE_RPC_ID_URL_PARAMS\b
 */
exports.MINIMIZE_RPC_ID_URL_PARAMS = toggles.TOGGLE_GoogFlags__use_toggles ? goog.DEBUG || toggles.TOGGLE_GoogFlags__minimize_rpc_id_url_params__enable :
    goog.readFlagInternalDoNotUseOrElse(869336903, goog.DEBUG);
/**
 * @const {boolean}
 * @see google3/third_party/javascript/closure/flags/flags.proto?q=symbol:\bJSPB_COERCE_INT64_BY_JSTYPE\b
 */
exports.JSPB_COERCE_INT64_BY_JSTYPE = toggles.TOGGLE_GoogFlags__use_toggles ? goog.DEBUG || toggles.TOGGLE_GoogFlags__jspb_coerce_int64_by_jstype__enable :
    goog.readFlagInternalDoNotUseOrElse(882674507, goog.DEBUG);
/**
 * @const {boolean}
 * @see google3/third_party/javascript/closure/flags/flags.proto?q=symbol:\bCHECK_FC_DATA_PARSER_BREAKERS\b
 */
exports.CHECK_FC_DATA_PARSER_BREAKERS = toggles.TOGGLE_GoogFlags__use_toggles ? goog.FLAGS_STAGING_DEFAULT && (toggles.TOGGLE_GoogFlags__override_disable_toggles || !toggles.TOGGLE_GoogFlags__check_fc_data_parser_breakers__disable) :
    goog.readFlagInternalDoNotUseOrElse(869336904, STAGING);
/**
 * @const {boolean}
 * @see google3/third_party/javascript/closure/flags/flags.proto?q=symbol:\bLOG_CORRECT_XHR_ERROR_STATUSES\b
 */
exports.LOG_CORRECT_XHR_ERROR_STATUSES = toggles.TOGGLE_GoogFlags__use_toggles ? goog.FLAGS_STAGING_DEFAULT && (toggles.TOGGLE_GoogFlags__override_disable_toggles || !toggles.TOGGLE_GoogFlags__log_correct_xhr_error_statuses__disable) :
    goog.readFlagInternalDoNotUseOrElse(869336905, STAGING);
/**
 * @const {boolean}
 * @see google3/third_party/javascript/closure/flags/flags.proto?q=symbol:\bFC_DATA_USE_FETCH_TRANSPORT\b
 */
exports.FC_DATA_USE_FETCH_TRANSPORT = toggles.TOGGLE_GoogFlags__use_toggles ? goog.DEBUG || toggles.TOGGLE_GoogFlags__fc_data_use_fetch_transport__enable :
    goog.readFlagInternalDoNotUseOrElse(283953155, goog.DEBUG);
/**
 * @const {boolean}
 * @see google3/third_party/javascript/closure/flags/flags.proto?q=symbol:\bOPTIMIZE_MODULE_INFO_CALLBACKS\b
 */
exports.OPTIMIZE_MODULE_INFO_CALLBACKS = toggles.TOGGLE_GoogFlags__use_toggles ? toggles.TOGGLE_GoogFlags__override_disable_toggles || !toggles.TOGGLE_GoogFlags__optimize_module_info_callbacks__disable :
    goog.readFlagInternalDoNotUseOrElse(919444824, true);
/**
 * @const {boolean}
 * @see google3/third_party/javascript/closure/flags/flags.proto?q=symbol:\bOPTIMIZE_EXTRA_EDGES_MAP\b
 */
exports.OPTIMIZE_EXTRA_EDGES_MAP = toggles.TOGGLE_GoogFlags__use_toggles ? toggles.TOGGLE_GoogFlags__override_disable_toggles || !toggles.TOGGLE_GoogFlags__optimize_extra_edges_map__disable :
    goog.readFlagInternalDoNotUseOrElse(928875398, true);
/**
 * @const {boolean}
 * @see google3/third_party/javascript/closure/flags/flags.proto?q=symbol:\bOPTIMIZE_MODULE_DEPENDENCY_RESOLUTION\b
 */
exports.OPTIMIZE_MODULE_DEPENDENCY_RESOLUTION = toggles.TOGGLE_GoogFlags__use_toggles ? toggles.TOGGLE_GoogFlags__optimize_module_dependency_resolution__enable :
    goog.readFlagInternalDoNotUseOrElse(683749201, false);
/**
 * @const {boolean}
 * @see google3/third_party/javascript/closure/flags/flags.proto?q=symbol:\bTESTONLY_DISABLED_FLAG\b
 */
exports.TESTONLY_DISABLED_FLAG = toggles.TOGGLE_GoogFlags__use_toggles ? toggles.TOGGLE_GoogFlags__testonly_disabled_flag__enable :
    goog.readFlagInternalDoNotUseOrElse(2147483644, false);
/**
 * @const {boolean}
 * @see google3/third_party/javascript/closure/flags/flags.proto?q=symbol:\bTESTONLY_DEBUG_FLAG\b
 */
exports.TESTONLY_DEBUG_FLAG = toggles.TOGGLE_GoogFlags__use_toggles ? goog.DEBUG || toggles.TOGGLE_GoogFlags__testonly_debug_flag__enable :
    goog.readFlagInternalDoNotUseOrElse(2147483645, goog.DEBUG);
/**
 * @const {boolean}
 * @see google3/third_party/javascript/closure/flags/flags.proto?q=symbol:\bTESTONLY_STAGING_FLAG\b
 */
exports.TESTONLY_STAGING_FLAG = toggles.TOGGLE_GoogFlags__use_toggles ? goog.FLAGS_STAGING_DEFAULT && (toggles.TOGGLE_GoogFlags__override_disable_toggles || !toggles.TOGGLE_GoogFlags__testonly_staging_flag__disable) :
    goog.readFlagInternalDoNotUseOrElse(2147483646, STAGING);
/**
 * @const {boolean}
 * @see google3/third_party/javascript/closure/flags/flags.proto?q=symbol:\bTESTONLY_STABLE_FLAG\b
 */
exports.TESTONLY_STABLE_FLAG = toggles.TOGGLE_GoogFlags__use_toggles ? toggles.TOGGLE_GoogFlags__override_disable_toggles || !toggles.TOGGLE_GoogFlags__testonly_stable_flag__disable :
    goog.readFlagInternalDoNotUseOrElse(2147483647, true);
