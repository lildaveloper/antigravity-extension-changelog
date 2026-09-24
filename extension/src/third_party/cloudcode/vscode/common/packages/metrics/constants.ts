/**
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/cloudcode/vscode/common/packages/metrics/constants.ts
 * @suppress {checkTypes} added by tsickle
 * @suppress {extraRequire} added by tsickle
 * @suppress {missingRequire} added by tsickle
 * @suppress {uselessCode} added by tsickle
 * @suppress {suspiciousCode} added by tsickle
 * @suppress {missingReturn} added by tsickle
 * @suppress {unusedLocalVariables} added by tsickle
 * @suppress {missingOverride} added by tsickle
 * @suppress {const} added by tsickle
 */
goog.module('google3.third_party.cloudcode.vscode.common.packages.metrics.constants');
var module = module || { id: 'third_party/cloudcode/vscode/common/packages/metrics/constants.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_constants_1 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.metrics.antigravity.constants");
const tsickle_constants_2 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.metrics.datacloud.constants");
const tsickle_constants_3 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.metrics.looker.constants");
const constants_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.metrics.antigravity.constants');
exports.AntigravityMetadataKey = constants_1.AntigravityMetadataKey;
const constants_2 = goog.require('google3.third_party.cloudcode.vscode.common.packages.metrics.datacloud.constants');
exports.DataCloudMetadataKey = constants_2.DataCloudMetadataKey;
const constants_3 = goog.require('google3.third_party.cloudcode.vscode.common.packages.metrics.looker.constants');
exports.LookerVSCodeMetadataKey = constants_3.LookerVSCodeMetadataKey;
/** @type {string} */
exports.CHANGE_LIST = typeof WEBPACK_CHANGE_LIST !== 'undefined' ? WEBPACK_CHANGE_LIST : 'UNKNOWN_COMMIT';
/** @type {string} */
exports.BUILD_DATE = typeof WEBPACK_BUILD_DATE !== 'undefined' ? WEBPACK_BUILD_DATE : 'UNKNOWN_BUILD_DATE';
/** @type {string} */
exports.UNDEFINED_EXIT_CODE = 'no_exit_code';
/** @type {string} */
exports.CONFIG_MODE = 'config';
/** @type {string} */
exports.CONFIG_LESS_MODE = 'config_less';
/** @type {string} */
exports.PROD_ENVIRONMENT = 'prod';
/** @type {string} */
exports.SOURCE_PROTECT = 'source_protect';
/** @type {string} */
exports.TRUE = true.toString();
/** @type {string} */
exports.LIST_EXPERIMENTS_EVENT = 'cloudcode.experiment.list';
/** @type {string} */
exports.METRICS_FOLDER = 'metrics_to_send';
/** @type {string} */
exports.METRICS_FILE_EXTENSION_TMP = '.tmp';
/** @type {string} */
exports.METRICS_FILE_EXTENSION_JSON = '.json';
/** @type {number} */
exports.METRICS_MAX_LIFETIME_MS = 7 * 24 * 60 * 60 * 1_000;
// 7 days
/** @type {string} */
exports.LSP_INITIALIZATION_EVENT = 'cloudcode.lsp.initialization';
/** @type {string} */
exports.UNRECOGNIZED_METADATA_EVENT = 'cloudcode.unrecognized_metadata_event';
/** @type {string} */
exports.TRACE_ID_EVENT_DATA = 'trace_id';
/** @type {string} */
exports.TIME_TO_FIRST_TOKEN = 'time_to_first_token';
/** @enum {string} */
const TelemetryUserMessages = {
    TELEMETRY_DISABLED_BY_ADMIN: "Telemetry is disabled by the admin",
};
exports.TelemetryUserMessages = TelemetryUserMessages;
/** @enum {string} */
const SkaffoldErrorCode = {
    IMAGE_PULL_ERR: "IMAGE_PULL_ERR",
    STATUSCHECK_POD_INITIALIZING: "STATUSCHECK_POD_INITIALIZING",
    STATUSCHECK_CONTAINER_TERMINATED: "STATUSCHECK_CONTAINER_TERMINATED",
    ERR_WAITING_FOR_DELETION: "ERR_WAITING_FOR_DELETION",
};
exports.SkaffoldErrorCode = SkaffoldErrorCode;
class MetricSources {
}
exports.MetricSources = MetricSources;
MetricSources.PROTOCOL_HANDLER = 'protocol_handler';
/* istanbul ignore if */
if (false) {
    /**
     * @const {string}
     * @public
     */
    MetricSources.PROTOCOL_HANDLER;
}
/**
 * Failure reasons attributed throughout the codebase
 * @enum {string}
 */
const FailureReason = {
    DEBUG_ATTACH_ERROR: "debug_attach_error",
    CONTAINER_TERMINATED: "container_terminated",
    DEBUG_SESSION_EXITED: "debug_session_exited",
    UNKNOWN: "unknown_failure",
    USER_CANCEL: "user_cancel",
    OPEN_URL_FAILED: "url_open_cancel",
    USER_CREATE_CLUSTER_JOURNEY: "user_create_cluster_journey",
    MISSING_LANGUAGE_EXTESION: "missing_language_extension",
    UNEXPECTED_FAILURE: "unexpected_failure",
    DEPENDENCY_CHECK_FAILURE: "dependency_check_failed",
    CONFIGURED_MODULES_NOT_FOUND: "configured_modules_not_found",
    MODULES_INSPECTION_FAILED: "modules_inspection_failed",
    BUILDER_DETECTION_FAILURE: "builder_detection_failed",
    INVALID_LAUNCH_CONFIG: "invalid_launch_config",
    BUILD_FAILURE: "build_failed",
    GCLOUD_RUN_DEPLOY_FAILURE: "gcloud_run_deploy_failed",
    SESSION_ALREADY_RUNNING_SAME_LAUNCH_CONFIG: "session_already_running_same_launch_config",
    NOT_LOGGED_IN: "not_logged_in",
    NO_PROJECT_SELECTED: "no_project_selected",
    NO_BUILDERS_FOUND: "no_builders_found",
    NO_IMAGES_FOUND: "no_images_found",
    NO_POD_FOUND: "no_pod_found",
    NO_DEBUG_SUPPORT: "no_debug_support",
    NO_SKAFFOLD_CONFIG: "no_skaffold_config",
    NO_SKAFFOLD_PROFILE: "no_skaffold_profile",
    ERROR_READING_SKAFFOLD_CONFIG: "error_reading_skaffold_config",
    SKAFFOLD_BUILDPACKS_ARM64: "skaffold_buildpacks_arm64",
    NO_SKAFFOLD_COMMAND_INFO: "no_skaffold_command_info",
    NO_APP_CONTEXT_FOUND: "no_app_context_found",
    NO_MINIKUBE_PROFILE: "no_minikube_profile",
    WORKSPACE_NOT_OPENED: "workspace_not_opened",
    EXIT_CODE: "exit_code",
    MISSING_REMOTE_SSH_EXTENSION: "missing_remote_ssh_extension",
    FAILED_TO_PARSE_SSH_COMMAND: "failed_to_parse_ssh_command",
    FAILED_TO_CLONE_REMOTE_REPOSITORY: "failed_to_clone_remote_repository",
    FAILED_TO_ENABLE_CONTAINER_REGISTRY_API: "failed_to_enable_container_registry_api",
    FAILED_TO_ENABLE_ARTIFACT_REGISTRY_API: "failed_to_enable_artifact_registry_api",
    MINIKUBE_START_FAILURE: "minikube_start_failure",
    MINIKUBE_ENABLE_GCP_AUTH_FAILURE: "minikube_enable_gcp_auth_failure",
    MINIKUBE_DISABLE_GCP_AUTH_FAILURE: "minikube_disable_gcp_auth_failure",
    MINIKUBE_ROOT_USER: "minikube_root_user",
    MINIKUBE_LIST_FAILURE: "minikube_list_failure",
    KUBECTL_CONNECTION_REFUSED: "connection_to_server_refused",
    KUBECTL_UNABLE_TO_CONNECT: "unable_to_connect_to_server",
    KUBECTL_UNEXPECTED_SERVER_RESPONSE: "server_returned_unexpected_response",
    KUBECTL_NOT_LOGGED_INTO_SERVER: "not_logged_into_server",
    KUBECTL_CONFIG_ERROR: "config_error",
    KUBECTL_INVALID_REQUEST: "invalid_request",
    KUBECTL_METADATA_LABEL_MISSING: "metadata_label_missing",
    KUBECTL_NO_RESOURCE_TYPE: "no_resource_type",
    KUBECTL_PROVIDERID_MISSING: "provider_id_missing",
    ERROR_FROM_SERVER: "error_from_server",
    COMPONENT_UPDATE_FAILED: "component_update_failed",
    COMPONENT_INSTALL_FAILED: "component_install_failed",
    UNSUPPORTED_ARCHITECTURE: "unsupported_architecture",
    FAILED_DOWNLOAD: "failed_download",
    FAILED_HASHCHECK: "failed_hashcheck",
    FAILED_PARSE: "failed_parse",
    FAILED_EMPTY: "failed_empty",
    FAILED_COPY: "failed_copy",
    FAILED_CHECKSUM_EXRACT: "failed_checksum_extract",
    FAILED_DECOMPRESS: "failed_decompress",
    FAILED_INSTALLER_DIR_FETCH: "failed_installer_dir_fetch",
    UNSUPPORTED_OS: "unsupported_platform",
    API_BILLING_NOT_ENABLED: "api_billing_not_enabled",
    API_PERMISSION_DENIED: "api_permission_denied",
    FAILED_VALIDITY_CHECK: "failed_validity_check",
    FAILED_OBJECT_PARSE: "failed_object_parse",
    FORBIDDEN: "Forbidden",
    INVALID_OBJECT: "invalid_object",
    PATH_NOT_EXIST: "path_not_exist",
    FAILED_OBJECT_CREATE: "failed_object_create",
    VALIDATION_ERROR: "validation_error",
    ACTIVE_CONTEXT_NOT_FOUND: "active_context_not_found",
    METADATA_FETCH_FAILED: "metadata_fetch_failed",
    CHANNEL_NAME_INVALID: "channel_name_invalid",
    VSCODE_VERSION_INVALID: "vscode_version_invalid",
    EXTENSION_INSTALL_FAILED: "extension_install_failed",
    CLUSTER_ALREADY_EXISTS: "cluster_already_exists",
    CLUSTER_INACCESSIBLE_MINIKUBE: "cluster_inaccessible_minikube",
    CLUSTER_INACCESSIBLE_GENERAL: "cluster_inaccessible_general",
    INVALID_CLUSTER_NAME: "invalid_cluster_name",
    INVALID_REGION: "invalid_region",
    INIT_FAILURE: "init_failure",
    KUBECONFIG_ADD_FAILURE: "kubeconfig_add_failure",
    CLUSTER_METADATA_FETCH_FROM_CLUSTER_FAILED: "cluster_metadata_fetch_from_cluster_failed",
    GKE_CLUSTER_METADATA_FETCH_FAILED: "gke_cluster_metadata_fetch_failed",
    SURVEY_NOTIFICATION_DISMISS: "survey_notification_dismiss",
    SURVEY_NOTIFICATION_DISMISS_FOREVER: "survey_notification_dismiss_forever",
    SURVEY_WEBVIEW_CLOSE: "survey_webview_close",
    FAILED_DOCKER_IMAGE_REPO_PUSH_CONFIG: "failed_docker_image_repo_push_config",
    GCLOUD_INSTALL_FAILED: "gcloud_install_failed",
    NOT_ONBOARDED: "not_onboarded",
    UNDEFINED_VERSION: "undefined_version",
    UNSUPPORTED_FILE_TYPE: "unsupported_file_type",
    DEPENDENCIES_NOT_INSTALLED_OR_OUTDATED: "dependencies_not_installed_or_outdated",
    // OAuthFailureReasons
    OAUTH_USER_CANCEL_PROMPT: "oauth_user_cancel_prompt",
    OAUTH_USER_CANCEL_TOKEN: "oauth_user_cancel_token",
    OAUTH_CALLBACK_SERVER_TIMEOUT: "oauth_callback_server_timeout",
    OAUTH_NO_TOKEN_IN_CALLBACK: "oauth_no_token_in_callback",
    OAUTH_CSRF_MISMATCH_IN_CALLBACK: "oauth_csrf_mismatch_in_callback",
    OAUTH_DUPE_LOGIN_REQUEST: "oauth_dupe_login_request",
    OAUTH_NO_REFRESH_TOKEN: "oauth_no_refresh_token",
    OAUTH_REFRESH_ACCESS_TOKEN_FETCH_FAILURE: "oauth_refresh_access_token_failure",
    OAUTH_NO_ACCESS_TOKEN_TO_REVOKE: "oauth_no_access_token_to_revoke",
    OAUTH_ACCESS_DENIED_IN_CALLBACK: "oauth_access_denied_in_callback",
    OAUTH_INVALID_REQUEST_IN_CALLBACK: "oauth_invalid_request_in_callback",
    OAUTH_UNAUTHORIZED_CLIENT_TOKEN_IN_CALLBACK: "oauth_unauthorized_client_token_in_callback",
    OAUTH_UNSUPPORTED_RESPONSE_TYPE_IN_CALLBACK: "oauth_unsupported_response_type_in_callback",
    OAUTH_INVALID_SCOPE_IN_CALLBACK: "oauth_invalid_scope_in_callback",
    OAUTH_SERVER_ERROR_IN_CALLBACK: "oauth_server_error_in_callback",
    OAUTH_TEMPORARILY_UNAVAILABLE_IN_CALLBACK: "oauth_temporarily_unavailable_in_callback",
    DUPLICATE_LOGIN_ATTEMPT: "oauth_duplicated_login",
    UNABLE_TO_GET_ISSUER_CERT: "unable_to_get_issuer_cert",
    // Gcloud on Demand Failure Reasons
    OVERRIDE_NOT_FOUND: "override_not_found",
    NEED_GCLOUD_INSTALL: "need_gcloud_install",
    GCLOUD_FAILED_DOWNLOAD: "Failed to download the Google Cloud SDK",
    // GCF Failure Reasons
    NO_WORKSPACE: "no_workspace_found",
    // Common system errors:
    // https://nodejs.org/api/errors.html#errors_common_system_errors
    EACCES: "EACCES",
    EADDRINUSE: "EADDRINUSE",
    ECONNREFUSED: "ECONNREFUSED",
    ECONNRESET: "ECONNRESET",
    EEXIST: "EEXIST",
    EISDIR: "EISDIR",
    EMFILE: "EMFILE",
    ENOENT: "ENOENT",
    ENOTDIR: "ENOTDIR",
    ENOTEMPTY: "ENOTEMPTY",
    ENOTFOUND: "ENOTFOUND",
    EPERM: "EPERM",
    EPIPE: "EPIPE",
    ETIMEDOUT: "ETIMEDOUT",
    ETXTBSY: "ETXTBSY",
    // Node error codes:
    // https://nodejs.org/api/errors.html#errors_node_js_error_codes
    ERR_AMBIGUOUS_ARGUMENT: "ERR_AMBIGUOUS_ARGUMENT",
    ERR_ARG_NOT_ITERABLE: "ERR_ARG_NOT_ITERABLE",
    ERR_ASSERTION: "ERR_ASSERTION",
    ERR_ASYNC_CALLBACK: "ERR_ASYNC_CALLBACK",
    ERR_ASYNC_TYPE: "ERR_ASYNC_TYPE",
    ERR_BROTLI_COMPRESSION_FAILED: "ERR_BROTLI_COMPRESSION_FAILED",
    ERR_BROTLI_INVALID_PARAM: "ERR_BROTLI_INVALID_PARAM",
    ERR_BUFFER_CONTEXT_NOT_AVAILABLE: "ERR_BUFFER_CONTEXT_NOT_AVAILABLE",
    ERR_BUFFER_OUT_OF_BOUNDS: "ERR_BUFFER_OUT_OF_BOUNDS",
    ERR_BUFFER_TOO_LARGE: "ERR_BUFFER_TOO_LARGE",
    ERR_CANNOT_WATCH_SIGINT: "ERR_CANNOT_WATCH_SIGINT",
    ERR_CHILD_CLOSED_BEFORE_REPLY: "ERR_CHILD_CLOSED_BEFORE_REPLY",
    ERR_CHILD_PROCESS_IPC_REQUIRED: "ERR_CHILD_PROCESS_IPC_REQUIRED",
    ERR_CHILD_PROCESS_STDIO_MAXBUFFER: "ERR_CHILD_PROCESS_STDIO_MAXBUFFER",
    ERR_CONSOLE_WRITABLE_STREAM: "ERR_CONSOLE_WRITABLE_STREAM",
    ERR_CONSTRUCT_CALL_REQUIRED: "ERR_CONSTRUCT_CALL_REQUIRED",
    ERR_CONSTRUCT_CALL_INVALID: "ERR_CONSTRUCT_CALL_INVALID",
    ERR_CPU_USAGE: "ERR_CPU_USAGE",
    ERR_CRYPTO_CUSTOM_ENGINE_NOT_SUPPORTED: "ERR_CRYPTO_CUSTOM_ENGINE_NOT_SUPPORTED",
    ERR_CRYPTO_ECDH_INVALID_FORMAT: "ERR_CRYPTO_ECDH_INVALID_FORMAT",
    ERR_CRYPTO_ECDH_INVALID_PUBLIC_KEY: "ERR_CRYPTO_ECDH_INVALID_PUBLIC_KEY",
    ERR_CRYPTO_ENGINE_UNKNOWN: "ERR_CRYPTO_ENGINE_UNKNOWN",
    ERR_CRYPTO_FIPS_FORCED: "ERR_CRYPTO_FIPS_FORCED",
    ERR_CRYPTO_FIPS_UNAVAILABLE: "ERR_CRYPTO_FIPS_UNAVAILABLE",
    ERR_CRYPTO_HASH_DIGEST_NO_UTF16: "ERR_CRYPTO_HASH_DIGEST_NO_UTF16",
    ERR_CRYPTO_HASH_FINALIZED: "ERR_CRYPTO_HASH_FINALIZED",
    ERR_CRYPTO_HASH_UPDATE_FAILED: "ERR_CRYPTO_HASH_UPDATE_FAILED",
    ERR_CRYPTO_INCOMPATIBLE_KEY_OPTIONS: "ERR_CRYPTO_INCOMPATIBLE_KEY_OPTIONS",
    ERR_CRYPTO_INVALID_DIGEST: "ERR_CRYPTO_INVALID_DIGEST",
    ERR_CRYPTO_INVALID_KEY_OBJECT_TYPE: "ERR_CRYPTO_INVALID_KEY_OBJECT_TYPE",
    ERR_CRYPTO_INVALID_STATE: "ERR_CRYPTO_INVALID_STATE",
    ERR_CRYPTO_PBKDF2_ERROR: "ERR_CRYPTO_PBKDF2_ERROR",
    ERR_CRYPTO_SCRYPT_INVALID_PARAMETER: "ERR_CRYPTO_SCRYPT_INVALID_PARAMETER",
    ERR_CRYPTO_SCRYPT_NOT_SUPPORTED: "ERR_CRYPTO_SCRYPT_NOT_SUPPORTED",
    ERR_CRYPTO_SIGN_KEY_REQUIRED: "ERR_CRYPTO_SIGN_KEY_REQUIRED",
    ERR_CRYPTO_TIMING_SAFE_EQUAL_LENGTH: "ERR_CRYPTO_TIMING_SAFE_EQUAL_LENGTH",
    ERR_DNS_SET_SERVERS_FAILED: "ERR_DNS_SET_SERVERS_FAILED",
    ERR_DOMAIN_CALLBACK_NOT_AVAILABLE: "ERR_DOMAIN_CALLBACK_NOT_AVAILABLE",
    ERR_DOMAIN_CANNOT_SET_UNCAUGHT_EXCEPTION_CAPTURE: "ERR_DOMAIN_CANNOT_SET_UNCAUGHT_EXCEPTION_CAPTURE",
    ERR_ENCODING_INVALID_ENCODED_DATA: "ERR_ENCODING_INVALID_ENCODED_DATA",
    ERR_ENCODING_NOT_SUPPORTED: "ERR_ENCODING_NOT_SUPPORTED",
    ERR_FALSY_VALUE_REJECTION: "ERR_FALSY_VALUE_REJECTION",
    ERR_FS_FILE_TOO_LARGE: "ERR_FS_FILE_TOO_LARGE",
    ERR_FS_INVALID_SYMLINK_TYPE: "ERR_FS_INVALID_SYMLINK_TYPE",
    ERR_HTTP_HEADERS_SENT: "ERR_HTTP_HEADERS_SENT",
    ERR_HTTP_INVALID_HEADER_VALUE: "ERR_HTTP_INVALID_HEADER_VALUE",
    ERR_HTTP_INVALID_STATUS_CODE: "ERR_HTTP_INVALID_STATUS_CODE",
    ERR_HTTP_TRAILER_INVALID: "ERR_HTTP_TRAILER_INVALID",
    ERR_HTTP2_ALTSVC_INVALID_ORIGIN: "ERR_HTTP2_ALTSVC_INVALID_ORIGIN",
    ERR_HTTP2_ALTSVC_LENGTH: "ERR_HTTP2_ALTSVC_LENGTH",
    ERR_HTTP2_CONNECT_AUTHORITY: "ERR_HTTP2_CONNECT_AUTHORITY",
    ERR_HTTP2_CONNECT_PATH: "ERR_HTTP2_CONNECT_PATH",
    ERR_HTTP2_CONNECT_SCHEME: "ERR_HTTP2_CONNECT_SCHEME",
    ERR_HTTP2_ERROR: "ERR_HTTP2_ERROR",
    ERR_HTTP2_GOAWAY_SESSION: "ERR_HTTP2_GOAWAY_SESSION",
    ERR_HTTP2_HEADERS_AFTER_RESPOND: "ERR_HTTP2_HEADERS_AFTER_RESPOND",
    ERR_HTTP2_HEADERS_SENT: "ERR_HTTP2_HEADERS_SENT",
    ERR_HTTP2_HEADER_SINGLE_VALUE: "ERR_HTTP2_HEADER_SINGLE_VALUE",
    ERR_HTTP2_INFO_STATUS_NOT_ALLOWED: "ERR_HTTP2_INFO_STATUS_NOT_ALLOWED",
    ERR_HTTP2_INVALID_CONNECTION_HEADERS: "ERR_HTTP2_INVALID_CONNECTION_HEADERS",
    ERR_HTTP2_INVALID_HEADER_VALUE: "ERR_HTTP2_INVALID_HEADER_VALUE",
    ERR_HTTP2_INVALID_INFO_STATUS: "ERR_HTTP2_INVALID_INFO_STATUS",
    ERR_HTTP2_INVALID_ORIGIN: "ERR_HTTP2_INVALID_ORIGIN",
    ERR_HTTP2_INVALID_PACKED_SETTINGS_LENGTH: "ERR_HTTP2_INVALID_PACKED_SETTINGS_LENGTH",
    ERR_HTTP2_INVALID_PSEUDOHEADER: "ERR_HTTP2_INVALID_PSEUDOHEADER",
    ERR_HTTP2_INVALID_SESSION: "ERR_HTTP2_INVALID_SESSION",
    ERR_HTTP2_INVALID_SETTING_VALUE: "ERR_HTTP2_INVALID_SETTING_VALUE",
    ERR_HTTP2_INVALID_STREAM: "ERR_HTTP2_INVALID_STREAM",
    ERR_HTTP2_MAX_PENDING_SETTINGS_ACK: "ERR_HTTP2_MAX_PENDING_SETTINGS_ACK",
    ERR_HTTP2_NESTED_PUSH: "ERR_HTTP2_NESTED_PUSH",
    ERR_HTTP2_NO_SOCKET_MANIPULATION: "ERR_HTTP2_NO_SOCKET_MANIPULATION",
    ERR_HTTP2_ORIGIN_LENGTH: "ERR_HTTP2_ORIGIN_LENGTH",
    ERR_HTTP2_OUT_OF_STREAMS: "ERR_HTTP2_OUT_OF_STREAMS",
    ERR_HTTP2_PAYLOAD_FORBIDDEN: "ERR_HTTP2_PAYLOAD_FORBIDDEN",
    ERR_HTTP2_PING_CANCEL: "ERR_HTTP2_PING_CANCEL",
    ERR_HTTP2_PING_LENGTH: "ERR_HTTP2_PING_LENGTH",
    ERR_HTTP2_PSEUDOHEADER_NOT_ALLOWED: "ERR_HTTP2_PSEUDOHEADER_NOT_ALLOWED",
    ERR_HTTP2_PUSH_DISABLED: "ERR_HTTP2_PUSH_DISABLED",
    ERR_HTTP2_SEND_FILE: "ERR_HTTP2_SEND_FILE",
    ERR_HTTP2_SEND_FILE_NOSEEK: "ERR_HTTP2_SEND_FILE_NOSEEK",
    ERR_HTTP2_SESSION_ERROR: "ERR_HTTP2_SESSION_ERROR",
    ERR_HTTP2_SETTINGS_CANCEL: "ERR_HTTP2_SETTINGS_CANCEL",
    ERR_HTTP2_SOCKET_BOUND: "ERR_HTTP2_SOCKET_BOUND",
    ERR_HTTP2_SOCKET_UNBOUND: "ERR_HTTP2_SOCKET_UNBOUND",
    ERR_HTTP2_STATUS_101: "ERR_HTTP2_STATUS_101",
    ERR_HTTP2_STATUS_INVALID: "ERR_HTTP2_STATUS_INVALID",
    ERR_HTTP2_STREAM_CANCEL: "ERR_HTTP2_STREAM_CANCEL",
    ERR_HTTP2_STREAM_ERROR: "ERR_HTTP2_STREAM_ERROR",
    ERR_HTTP2_STREAM_SELF_DEPENDENCY: "ERR_HTTP2_STREAM_SELF_DEPENDENCY",
    ERR_HTTP2_TRAILERS_ALREADY_SENT: "ERR_HTTP2_TRAILERS_ALREADY_SENT",
    ERR_HTTP2_TRAILERS_NOT_READY: "ERR_HTTP2_TRAILERS_NOT_READY",
    ERR_HTTP2_UNSUPPORTED_PROTOCOL: "ERR_HTTP2_UNSUPPORTED_PROTOCOL",
    ERR_INTERNAL_ASSERTION: "ERR_INTERNAL_ASSERTION",
    ERR_INCOMPATIBLE_OPTION_PAIR: "ERR_INCOMPATIBLE_OPTION_PAIR",
    ERR_INPUT_TYPE_NOT_ALLOWED: "ERR_INPUT_TYPE_NOT_ALLOWED",
    ERR_INSPECTOR_ALREADY_CONNECTED: "ERR_INSPECTOR_ALREADY_CONNECTED",
    ERR_INSPECTOR_CLOSED: "ERR_INSPECTOR_CLOSED",
    ERR_INSPECTOR_COMMAND: "ERR_INSPECTOR_COMMAND",
    ERR_INSPECTOR_NOT_ACTIVE: "ERR_INSPECTOR_NOT_ACTIVE",
    ERR_INSPECTOR_NOT_AVAILABLE: "ERR_INSPECTOR_NOT_AVAILABLE",
    ERR_INSPECTOR_NOT_CONNECTED: "ERR_INSPECTOR_NOT_CONNECTED",
    ERR_INVALID_ADDRESS_FAMILY: "ERR_INVALID_ADDRESS_FAMILY",
    ERR_INVALID_ARG_TYPE: "ERR_INVALID_ARG_TYPE",
    ERR_INVALID_ARG_VALUE: "ERR_INVALID_ARG_VALUE",
    ERR_INVALID_ASYNC_ID: "ERR_INVALID_ASYNC_ID",
    ERR_INVALID_BUFFER_SIZE: "ERR_INVALID_BUFFER_SIZE",
    ERR_INVALID_CALLBACK: "ERR_INVALID_CALLBACK",
    ERR_INVALID_CHAR: "ERR_INVALID_CHAR",
    ERR_INVALID_CURSOR_POS: "ERR_INVALID_CURSOR_POS",
    ERR_INVALID_FD: "ERR_INVALID_FD",
    ERR_INVALID_FD_TYPE: "ERR_INVALID_FD_TYPE",
    ERR_INVALID_FILE_URL_HOST: "ERR_INVALID_FILE_URL_HOST",
    ERR_INVALID_FILE_URL_PATH: "ERR_INVALID_FILE_URL_PATH",
    ERR_INVALID_HANDLE_TYPE: "ERR_INVALID_HANDLE_TYPE",
    ERR_INVALID_HTTP_TOKEN: "ERR_INVALID_HTTP_TOKEN",
    ERR_INVALID_IP_ADDRESS: "ERR_INVALID_IP_ADDRESS",
    ERR_INVALID_OPT_VALUE: "ERR_INVALID_OPT_VALUE",
    ERR_INVALID_OPT_VALUE_ENCODING: "ERR_INVALID_OPT_VALUE_ENCODING",
    ERR_INVALID_PACKAGE_CONFIG: "ERR_INVALID_PACKAGE_CONFIG",
    ERR_INVALID_PERFORMANCE_MARK: "ERR_INVALID_PERFORMANCE_MARK",
    ERR_INVALID_PROTOCOL: "ERR_INVALID_PROTOCOL",
    ERR_INVALID_REPL_EVAL_CONFIG: "ERR_INVALID_REPL_EVAL_CONFIG",
    ERR_INVALID_REPL_INPUT: "ERR_INVALID_REPL_INPUT",
    ERR_INVALID_RETURN_PROPERTY: "ERR_INVALID_RETURN_PROPERTY",
    ERR_INVALID_RETURN_PROPERTY_VALUE: "ERR_INVALID_RETURN_PROPERTY_VALUE",
    ERR_INVALID_RETURN_VALUE: "ERR_INVALID_RETURN_VALUE",
    ERR_INVALID_SYNC_FORK_INPUT: "ERR_INVALID_SYNC_FORK_INPUT",
    ERR_INVALID_THIS: "ERR_INVALID_THIS",
    ERR_INVALID_TRANSFER_OBJECT: "ERR_INVALID_TRANSFER_OBJECT",
    ERR_INVALID_TUPLE: "ERR_INVALID_TUPLE",
    ERR_INVALID_URI: "ERR_INVALID_URI",
    ERR_INVALID_URL: "ERR_INVALID_URL",
    ERR_INVALID_URL_SCHEME: "ERR_INVALID_URL_SCHEME",
    ERR_IPC_CHANNEL_CLOSED: "ERR_IPC_CHANNEL_CLOSED",
    ERR_IPC_DISCONNECTED: "ERR_IPC_DISCONNECTED",
    ERR_IPC_ONE_PIPE: "ERR_IPC_ONE_PIPE",
    ERR_IPC_SYNC_FORK: "ERR_IPC_SYNC_FORK",
    ERR_MANIFEST_ASSERT_INTEGRITY: "ERR_MANIFEST_ASSERT_INTEGRITY",
    ERR_MANIFEST_DEPENDENCY_MISSING: "ERR_MANIFEST_DEPENDENCY_MISSING",
    ERR_MANIFEST_INTEGRITY_MISMATCH: "ERR_MANIFEST_INTEGRITY_MISMATCH",
    ERR_MANIFEST_INVALID_RESOURCE_FIELD: "ERR_MANIFEST_INVALID_RESOURCE_FIELD",
    ERR_MANIFEST_PARSE_POLICY: "ERR_MANIFEST_PARSE_POLICY",
    ERR_MANIFEST_TDZ: "ERR_MANIFEST_TDZ",
    ERR_MANIFEST_UNKNOWN_ONERROR: "ERR_MANIFEST_UNKNOWN_ONERROR",
    ERR_MEMORY_ALLOCATION_FAILED: "ERR_MEMORY_ALLOCATION_FAILED",
    ERR_METHOD_NOT_IMPLEMENTED: "ERR_METHOD_NOT_IMPLEMENTED",
    ERR_MISSING_ARGS: "ERR_MISSING_ARGS",
    ERR_MISSING_DYNAMIC_INSTANTIATE_HOOK: "ERR_MISSING_DYNAMIC_INSTANTIATE_HOOK",
    ERR_MISSING_MESSAGE_PORT_IN_TRANSFER_LIST: "ERR_MISSING_MESSAGE_PORT_IN_TRANSFER_LIST",
    ERR_MISSING_PASSPHRASE: "ERR_MISSING_PASSPHRASE",
    ERR_MISSING_PLATFORM_FOR_WORKER: "ERR_MISSING_PLATFORM_FOR_WORKER",
    ERR_MODULE_NOT_FOUND: "ERR_MODULE_NOT_FOUND",
    ERR_MULTIPLE_CALLBACK: "ERR_MULTIPLE_CALLBACK",
    ERR_NAPI_CONS_FUNCTION: "ERR_NAPI_CONS_FUNCTION",
    ERR_NAPI_INVALID_DATAVIEW_ARGS: "ERR_NAPI_INVALID_DATAVIEW_ARGS",
    ERR_NAPI_INVALID_TYPEDARRAY_ALIGNMENT: "ERR_NAPI_INVALID_TYPEDARRAY_ALIGNMENT",
    ERR_NAPI_INVALID_TYPEDARRAY_LENGTH: "ERR_NAPI_INVALID_TYPEDARRAY_LENGTH",
    ERR_NAPI_TSFN_CALL_JS: "ERR_NAPI_TSFN_CALL_JS",
    ERR_NAPI_TSFN_GET_UNDEFINED: "ERR_NAPI_TSFN_GET_UNDEFINED",
    ERR_NAPI_TSFN_START_IDLE_LOOP: "ERR_NAPI_TSFN_START_IDLE_LOOP",
    ERR_NAPI_TSFN_STOP_IDLE_LOOP: "ERR_NAPI_TSFN_STOP_IDLE_LOOP",
    ERR_NO_CRYPTO: "ERR_NO_CRYPTO",
    ERR_NO_ICU: "ERR_NO_ICU",
    ERR_OUT_OF_RANGE: "ERR_OUT_OF_RANGE",
    ERR_REQUIRE_ESM: "ERR_REQUIRE_ESM",
    ERR_SCRIPT_EXECUTION_INTERRUPTED: "ERR_SCRIPT_EXECUTION_INTERRUPTED",
    ERR_SCRIPT_EXECUTION_TIMEOUT: "ERR_SCRIPT_EXECUTION_TIMEOUT",
    ERR_SERVER_ALREADY_LISTEN: "ERR_SERVER_ALREADY_LISTEN",
    ERR_SERVER_NOT_RUNNING: "ERR_SERVER_NOT_RUNNING",
    ERR_SOCKET_ALREADY_BOUND: "ERR_SOCKET_ALREADY_BOUND",
    ERR_SOCKET_BAD_BUFFER_SIZE: "ERR_SOCKET_BAD_BUFFER_SIZE",
    ERR_SOCKET_BAD_PORT: "ERR_SOCKET_BAD_PORT",
    ERR_SOCKET_BAD_TYPE: "ERR_SOCKET_BAD_TYPE",
    ERR_SOCKET_BUFFER_SIZE: "ERR_SOCKET_BUFFER_SIZE",
    ERR_SOCKET_CANNOT_SEND: "ERR_SOCKET_CANNOT_SEND",
    ERR_SOCKET_CLOSED: "ERR_SOCKET_CLOSED",
    ERR_SOCKET_DGRAM_IS_CONNECTED: "ERR_SOCKET_DGRAM_IS_CONNECTED",
    ERR_SOCKET_DGRAM_NOT_CONNECTED: "ERR_SOCKET_DGRAM_NOT_CONNECTED",
    ERR_SOCKET_DGRAM_NOT_RUNNING: "ERR_SOCKET_DGRAM_NOT_RUNNING",
    ERR_SRI_PARSE: "ERR_SRI_PARSE",
    ERR_STREAM_CANNOT_PIPE: "ERR_STREAM_CANNOT_PIPE",
    ERR_STREAM_DESTROYED: "ERR_STREAM_DESTROYED",
    ERR_STREAM_NULL_VALUES: "ERR_STREAM_NULL_VALUES",
    ERR_STREAM_PREMATURE_CLOSE: "ERR_STREAM_PREMATURE_CLOSE",
    ERR_STREAM_PUSH_AFTER_EOF: "ERR_STREAM_PUSH_AFTER_EOF",
    ERR_STREAM_UNSHIFT_AFTER_END_EVENT: "ERR_STREAM_UNSHIFT_AFTER_END_EVENT",
    ERR_STREAM_WRAP: "ERR_STREAM_WRAP",
    ERR_STREAM_WRITE_AFTER_END: "ERR_STREAM_WRITE_AFTER_END",
    ERR_STRING_TOO_LONG: "ERR_STRING_TOO_LONG",
    ERR_SYNTHETIC: "ERR_SYNTHETIC",
    ERR_SYSTEM_ERROR: "ERR_SYSTEM_ERROR",
    ERR_TLS_CERT_ALTNAME_INVALID: "ERR_TLS_CERT_ALTNAME_INVALID",
    ERR_TLS_DH_PARAM_SIZE: "ERR_TLS_DH_PARAM_SIZE",
    ERR_TLS_HANDSHAKE_TIMEOUT: "ERR_TLS_HANDSHAKE_TIMEOUT",
    ERR_TLS_INVALID_PROTOCOL_METHOD: "ERR_TLS_INVALID_PROTOCOL_METHOD",
    ERR_TLS_INVALID_PROTOCOL_VERSION: "ERR_TLS_INVALID_PROTOCOL_VERSION",
    ERR_TLS_PROTOCOL_VERSION_CONFLICT: "ERR_TLS_PROTOCOL_VERSION_CONFLICT",
    ERR_TLS_RENEGOTIATION_DISABLED: "ERR_TLS_RENEGOTIATION_DISABLED",
    ERR_TLS_REQUIRED_SERVER_NAME: "ERR_TLS_REQUIRED_SERVER_NAME",
    ERR_TLS_SESSION_ATTACK: "ERR_TLS_SESSION_ATTACK",
    ERR_TLS_SNI_FROM_SERVER: "ERR_TLS_SNI_FROM_SERVER",
    ERR_TRACE_EVENTS_CATEGORY_REQUIRED: "ERR_TRACE_EVENTS_CATEGORY_REQUIRED",
    ERR_TRACE_EVENTS_UNAVAILABLE: "ERR_TRACE_EVENTS_UNAVAILABLE",
    ERR_TRANSFERRING_EXTERNALIZED_SHAREDARRAYBUFFER: "ERR_TRANSFERRING_EXTERNALIZED_SHAREDARRAYBUFFER",
    ERR_TRANSFORM_ALREADY_TRANSFORMING: "ERR_TRANSFORM_ALREADY_TRANSFORMING",
    ERR_TRANSFORM_WITH_LENGTH_0: "ERR_TRANSFORM_WITH_LENGTH_0",
    ERR_TTY_INIT_FAILED: "ERR_TTY_INIT_FAILED",
    ERR_UNCAUGHT_EXCEPTION_CAPTURE_ALREADY_SET: "ERR_UNCAUGHT_EXCEPTION_CAPTURE_ALREADY_SET",
    ERR_UNESCAPED_CHARACTERS: "ERR_UNESCAPED_CHARACTERS",
    ERR_UNHANDLED_ERROR: "ERR_UNHANDLED_ERROR",
    ERR_UNKNOWN_BUILTIN_MODULE: "ERR_UNKNOWN_BUILTIN_MODULE",
    ERR_UNKNOWN_CREDENTIAL: "ERR_UNKNOWN_CREDENTIAL",
    ERR_UNKNOWN_ENCODING: "ERR_UNKNOWN_ENCODING",
    ERR_UNKNOWN_FILE_EXTENSION: "ERR_UNKNOWN_FILE_EXTENSION",
    ERR_UNKNOWN_MODULE_FORMAT: "ERR_UNKNOWN_MODULE_FORMAT",
    ERR_UNKNOWN_SIGNAL: "ERR_UNKNOWN_SIGNAL",
    ERR_V8BREAKITERATOR: "ERR_V8BREAKITERATOR",
    ERR_VALID_PERFORMANCE_ENTRY_TYPE: "ERR_VALID_PERFORMANCE_ENTRY_TYPE",
    ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING: "ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING",
    ERR_VM_MODULE_ALREADY_LINKED: "ERR_VM_MODULE_ALREADY_LINKED",
    ERR_VM_MODULE_DIFFERENT_CONTEXT: "ERR_VM_MODULE_DIFFERENT_CONTEXT",
    ERR_VM_MODULE_LINKING_ERRORED: "ERR_VM_MODULE_LINKING_ERRORED",
    ERR_VM_MODULE_NOT_LINKED: "ERR_VM_MODULE_NOT_LINKED",
    ERR_VM_MODULE_NOT_MODULE: "ERR_VM_MODULE_NOT_MODULE",
    ERR_VM_MODULE_STATUS: "ERR_VM_MODULE_STATUS",
    ERR_WORKER_INVALID_EXEC_ARGV: "ERR_WORKER_INVALID_EXEC_ARGV",
    ERR_WORKER_PATH: "ERR_WORKER_PATH",
    ERR_WORKER_UNSERIALIZABLE_ERROR: "ERR_WORKER_UNSERIALIZABLE_ERROR",
    ERR_WORKER_UNSUPPORTED_EXTENSION: "ERR_WORKER_UNSUPPORTED_EXTENSION",
    ERR_WORKER_UNSUPPORTED_OPERATION: "ERR_WORKER_UNSUPPORTED_OPERATION",
    ERR_ZLIB_INITIALIZATION_FAILED: "ERR_ZLIB_INITIALIZATION_FAILED",
    HPE_HEADER_OVERFLOW: "HPE_HEADER_OVERFLOW",
    MODULE_NOT_FOUND: "MODULE_NOT_FOUND",
};
exports.FailureReason = FailureReason;
/** @enum {string} */
const CommandSource = {
    COMMAND_PALETTE: "command_palette",
    SOURCE_TREE: "source_tree",
    EDITOR_ACTION: "editor_action",
    WELCOME_PAGE: "welcome_page",
    SURVEY: "survey",
    STATUS_BAR_MENU: "status_bar_menu",
    NOTIFICATION: "notification",
    STATUS_BAR: "status_bar",
    DUET_STATUS_BAR: "duet_status_bar",
    MINIKUBE_STATUS_BAR_MENU: "minikube_status_bar_menu",
    GCLOUD_STATUS_BAR_MENU: "gcloud_status_bar_menu",
    API_BROWSER: "api_browser",
    WALKTHROUGH: "walkthrough",
    KEYBIND: "keybind",
    DUET_CODE_ACTIONS: "duet_code_actions",
    CHIP: "chip",
    REGISTERED_COMMAND: "registered_command",
    DUET_CODELENS: "duet_codelens",
};
exports.CommandSource = CommandSource;
/**
 * Enum for the different states of the exclusion file settings.
 * @enum {string}
 */
const ExclusionFileSetting = {
    EXCLUSION_FILE_EXISTS: "exclusion_file_exists",
    EXCLUSION_FILE_NOT_EXIST: "exclusion_file_not_exist",
    EXCLUSION_FILE_READ_ERROR: "exclusion_file_read_error",
    EXCLUSION_FILE_SETTING_EMPTY: "exclusion_file_empty",
    EXCLUSION_FILE_SETTING_NOT_EMPTY: "exclusion_file_not_empty",
    GITIGNORE_FILE_EXIST: "gitignore_file_exist",
    GITIGNORE_FILE_NOT_EXIST: "gitignore_file_not_exist",
    GITIGNORE_FILE_READ_ERROR: "gitignore_file_read_error",
    GITIGNORE_SETTING_OFF: "gitignore_setting_off",
    GITIGNORE_SETTING_ON: "gitignore_setting_on",
};
exports.ExclusionFileSetting = ExclusionFileSetting;
/** @enum {string} */
const API_DETAIL_METRICS = {
    PROJECT_SWITCH: "cloudcode.cloudapi.projectSwitch",
    VIEW_MORE_INFO: "cloudcode.cloudapi.info",
    ADD_LIBRARY: "cloudcode.cloudapi.add",
    RUN_IN_TERMINAL: "cloudcode.cloudapi.runInTerminal",
    VIEW_PRODUCT: "cloudcode.cloudapi.view",
    ENABLE_API: "cloudcode.cloudapi.enable",
    VIEW_SAMPLE: "cloudcode.cloudapi.sample.view",
    COPY_SAMPLE: "cloudcode.cloudapi.sample.copy",
    OPEN_TAB_CODE_SAMPLES: "cloudcode.cloudapi.sample.openTab",
    SELECT_LANGUAGE: "cloudcode.cloudapi.selectLanguage",
    SEARCH_SAMPLE: "cloudcode.cloudapi.sample.search",
};
exports.API_DETAIL_METRICS = API_DETAIL_METRICS;
/**
 * Metadata keys that are specific to the Apigee plugin
 * @enum {string}
 */
const ApigeeMetadataKey = {
    AVG_POLICIES_PER_PROXY: "avg_policies_per_proxy",
    AVG_POLICIES_PER_SHAREDFLOW: "avg_policies_per_shared_flow",
    AVG_PROXY_ENDPOINTS: "avg_proxy_endpoints",
    AVG_RESOURCES_IN_PROXY: "avg_resources_in_proxy",
    AVG_RESOURCES_IN_ENVIRONMENT: "avg_resources_in_environment",
    AVG_RESOURCES_IN_SHAREDFLOW: "avg_resources_in_shared_flow",
    AVG_TARGT_ENDPOINTS: "avg_target_endpoints",
    AVG_TARGET_SERVERS_PER_ENVIRONMENT: "avg_target_servers_per_environment",
    COUNT_APPS: "developerapp_count",
    COUNT_DEVELOPERS: "developer_count",
    COUNT_ENVIRONMENTS: "environment_count",
    COUNT_FLOW_HOOKS: "flow_hooks_count",
    COUNT_MAPS: "map_count",
    COUNT_POLICIES: "policie_count",
    COUNT_PRODUCTS: "product_count",
    COUNT_PROXY_BUNDLES: "proxy_bundle_count",
    COUNT_PROXY_ENDPOINTS: "proxy_endpoint_count",
    COUNT_REPORTED_ERRORS: "error_count",
    COUNT_REPORTED_WARNINGS: "warning_count",
    COUNT_RESOURCES: "resource_count",
    COUNT_SHARED_FLOWS: "shared_flow_count",
    COUNT_SHAREDFLOW_BUNDLES: "sharedflow_bundle_count",
    COUNT_TEST_BUNDLES: "test_bundle_count",
    COUNT_TARGET_SERVERS: "target_servers_count",
    COUNT_TARGET_ENDPOINTS: "target_endpoint_count",
    EMULATOR_VERSION: "emulator_version",
    FLAGS: "flags",
    PROXY_AUTH_TYPE: "auth_type",
    PROXY_TYPE: "proxy_type",
    RESPONSE_STATUS: "deployment_status",
    SPAWN_TYPE: "spawn_type",
};
exports.ApigeeMetadataKey = ApigeeMetadataKey;
/**
 * Metadata keys specific to the API Explorer & Metadata Client
 * @enum {string}
 */
const ApiMetadataKey = {
    FILE_NAME: "file_name",
    SERVICE_NAME: "service_name",
};
exports.ApiMetadataKey = ApiMetadataKey;
/**
 * Metadata keys specific to auth
 * @enum {string}
 */
const AuthMetadataKey = {
    METHOD: "method",
    PROJECT_RECENTLY_USED: "project_recently_used",
    PROJECT_SAVE_LOCATION: "project_save_location",
    PROJECT_SET: "project_set",
};
exports.AuthMetadataKey = AuthMetadataKey;
/**
 * Metadata keys specific to Cloud Run
 * @enum {string}
 */
const CloudRunMetadataKey = {
    FULLY_MANAGED_SERVICE_COUNT: "fully_managed_service_count",
    IS_NEW_SERVICE: "is_new_service",
    PLATFORM_TYPE: "platform_type",
};
exports.CloudRunMetadataKey = CloudRunMetadataKey;
/**
 * Metadata keys that are used in multiple plugins
 * @enum {string}
 */
const CommonMetadataKey = {
    ACTION: "action",
    BOOTSTRAP_TYPE: "bootstrapType",
    CLOUDCODE_ERROR_MESSAGE: "cloudcode_error_message",
    COMMAND: "command",
    COMMAND_SOURCE: "command_source",
    CONFIG_CREATION_MODE: "config_creation_mode",
    DURATION_MS: "duration_ms",
    ERROR_CODE: "error_code",
    EXIT_CODE: "exit_code",
    FAILURE_REASON: "failure_reason",
    IDE_SESSION_INDEX: "ide_session_index",
    LANGUAGE: "language",
    PLUGIN: "plugin",
    RUN_PLATFORM: "run_platform",
    SELECTION_TYPE: "selection_type",
    SOURCE: "source",
    STACK: "cloudcode_event_stack",
    SUCCESS: "success",
    UNRECOGNIZED_METADATA: "unrecognized_metadata",
    DUET_AI_LS_ERROR_TYPE: "duet_ai_ls_error_type",
    DUET_AI_LS_ERROR_MODE: "duet_ai_ls_error_mode",
    NUM_DIFF_BLOCKS: "num_diff_blocks",
    MESSAGE_DISPLAYED: "message_displayed",
    MESSAGE_SEVERITY: "message_severity",
    NO_MESSAGE_REASON: "no_message_reason",
    LINK_INCLUDED: "link_included",
};
exports.CommonMetadataKey = CommonMetadataKey;
/**
 * Metadata keys that are used in Crash Feedback
 * @enum {string}
 */
const CrashFeedbackMetadataKey = {
    ERROR_TYPE: "error_type",
    REASON: "reason",
    SELECTION: "selection",
};
exports.CrashFeedbackMetadataKey = CrashFeedbackMetadataKey;
/**
 * Metadata keys specific to Compute Engine (GCE)
 * @enum {string}
 */
const ComputeMetadataKey = {
    IS_DIRECTORY: "is_directory",
    VM_COUNT: "vm_count",
};
exports.ComputeMetadataKey = ComputeMetadataKey;
/**
 * Metadata keys specific to Custom Slash Commands.
 * @enum {string}
 */
const CustomSlashCommandMetadataKey = {
    CUSTOM_COMMAND_COUNT: "custom_command_count",
    BASE_COMMAND_INVOKED: "base_command_invoked",
};
exports.CustomSlashCommandMetadataKey = CustomSlashCommandMetadataKey;
/**
 * Metadata keys specific to the Deployment Manager
 * @enum {string}
 */
const DeploymentManagerMetadataKey = {
    BOOTSTRAP_TYPE: "bootstrapType",
    BUILDER: "builder",
    BUILDPACKS_BUILDER_COUNT: "buildpacks_builder_count",
    CLEANUP_KEY: "cleanUp",
    CONFIG_COUNT: "config_count",
    CONTEXT_CHANGED: "context_changed",
    CPU: "cpu",
    DEPS_REQUIRING_ACTION: "deps_requiring_action",
    DOCKER_BUILDER_COUNT: "docker_builder_count",
    EMPTY_SERVICE_ACCOUNT: "empty_service_account",
    HAS_IMAGE_REGISTRY: "hasImageRegistry",
    HAS_SKAFFOLD_PROFILE: "hasSkaffoldProfile",
    IDE_SESSION_INDEX: "ide_session_index",
    IMAGE_COUNT: "image_count",
    IS_DEBUG: "is_debug",
    IS_DEFAULT_REGISTRY_DEFINED: "is_default_registry_defined",
    IS_LOCAL_DEPLOYMENT: "is_local_deployment",
    IS_REGISTRY_CONFIG_UPDATED: "is_registry_config_updated",
    IS_REGISTRY_MATCH: "is_registry_match_default",
    JIB_GRADLE_BUILDER_COUNT: "jib_gradle_builder_count",
    JIB_MAVEN_BUILDER_COUNT: "jib_maven_builder_count",
    MEMORY: "memory",
    PORT_FORWARD: "portForward",
    REQUEST_TYPE: "request_type",
    RUN_MODE: "run_mode",
    RUN_PLATFORM: "run_platform",
    SELECTION: "selection",
    SKAFFOLD_CREATION_MODE: "skaffold_creation_mode",
    WATCH: "watch",
};
exports.DeploymentManagerMetadataKey = DeploymentManagerMetadataKey;
/**
 * Metadata keys specific to Duet AI (Gemini Code Assist)
 * @enum {string}
 */
const DuetMetadataKey = {
    ACCEPTANCE_TYPE: "acceptance_type",
    CANNED_PROMPT_KEY: "canned_prompt_key",
    CITATION_COUNT: "citation_count",
    COMPLETION_INDEX: "completion_index",
    COMPLETION_METHOD: "completion_method",
    COMPLETION_MODE: "completion_mode",
    ENDPOINT: "endpoint",
    FULLY_MATCHES: "fully_matches",
    IDE_SESSION_INDEX: "ide_session_index",
    INCLUDED_CODE: "included_code",
    LAST_EDIT: "last_edit",
    PARTIAL_ACCEPTED_CHARACTERS: "partial_accepted_characters",
    PARTIAL_ACCEPTED_LINES: "partial_accepted_lines",
    PER_RESULT_METRICS: "per_result_metrics",
    PROMPT_CITATION_COUNT: "prompt_citation_count",
    RELEASE_NOTES_SOURCE: "source",
    REMOTE_REPOSITORIES_MENTIONED: "remote_repositories_mentioned",
    REMOTE_REPOSITORIES_TOTAL: "remote_repositories_total",
    RESPONSE_LINES: "response_lines",
    RESPONSE_RECEIVED_INDEX: "response_received_index",
    RESPONSE_SCORE: "score",
    RESPONSE_SIZE: "response_size",
    RESULT_COUNT: "result_count",
    TRUNCATED: "truncated",
    TIME_TO_FIRST_TOKEN: "time_to_first_token",
    SLASH_COMMAND: "slash_command",
    DETECTED_INTENT: "detected_intent",
    REDIRECTED_TO_CHAT: "redirected_to_chat",
    CHAT_ATTACHED_SNIPPETS_COUNT: "attached_snippets_count",
    CHAT_ATTACHED_TERMINAL_SNIPPETS_COUNT: "attached_terminal_snippets_count",
    CHAT_HISTORY_COUNT: "chat_history_count",
    CHAT_HISTORY_BYTE_SIZE: "chat_history_bytes_size",
    CHAT_THREAD_COUNT: "chat_thread_count",
    CHAT_THREAD_ITEM_COUNT: "chat_thread_item_count",
    CHAT_THREAD_PERSISTENCE_SOURCE: "chat_thread_persistence_source",
    INSTALL_TOOL_NAME: "install_tool_name",
    INSTALL_EXTENSION_ID: "install_extension_id",
    LS_COMPLETION_ACCEPTED_COMMAND_FAILURE_REASON: "ls_completion_accepted_command_failure_reason",
    WHITESPACE_COUNT: "whitespace_count",
    IS_AGENT_MODE: "is_agent_mode",
    LONG_STARTUP_EVENTS: "long_startup_events",
    FAILED_STARTUP_EVENTS: "failed_startup_events",
    CALLSTACK: "CALLSTACK",
    AGENT_INTERACTION_ID: "agent_interaction_id",
};
exports.DuetMetadataKey = DuetMetadataKey;
/**
 * Metadata keys specific to Duet AI (Gemini Code Assist), v2. See go/code-assist-metrics-denormalization.
 * @enum {string}
 */
const DuetMetadataV2Key = {
    COMPLETION_INDEX: "v2_completion_index",
    COMPLETION_METHOD: "v2_completion_method",
    FROM_CACHE: "v2_from_cache",
    LANGUAGE: "v2_language",
    RAG_STATUS: "v2_rag_status",
    RESPONSE_LINES: "v2_response_lines",
    RESPONSE_RECEIVED_INDEX: "v2_response_received_index",
    RESPONSE_SIZE: "v2_response_size",
    RESULT_COUNT: "v2_result_count",
    SCORE: "v2_score",
    SERVER_CONTEXT: "v2_server_context",
    SUGGESTION_SPEED_LEVEL: "suggestion_speed_level",
    TYPEOVER: "v2_typeover",
    COMMENT_LINES_COUNT: "v2_comment_lines_count",
};
exports.DuetMetadataV2Key = DuetMetadataV2Key;
/**
 * Metadata keys specific to error stack metadata
 * @enum {string}
 */
const ErrorStackMetadataKey = {
    COLUMN: "column",
    LINE: "line",
    METHOD: "method",
};
exports.ErrorStackMetadataKey = ErrorStackMetadataKey;
/**
 * Metadata keys specific to experiment metadata
 * @enum {string}
 */
const ExperimentMetadataKey = {
    FAILURE_REASON: "failure_reason",
};
exports.ExperimentMetadataKey = ExperimentMetadataKey;
/**
 * Metadata keys specific to Cloud Functions
 * @enum {string}
 */
const FunctionsMetadataKey = {
    DEPLOYMENT_DURATION: "deployment_duration",
    DEPLOYMENT_SUCCESS: "deployment_success",
    DEPLOY_CREATION_DURATION: "deploy_creation_duration",
    DEPLOY_SESSION_INDEX: "deploy_session_index",
    DOWNLOAD_SIZE: "download_size",
    GEN: "gen",
    LAST_STEP: "last_step",
    REGION: "region",
    RUNTIME: "runtime",
    TRIGGER: "trigger",
    UNSUPPORTED_CLOUD_FUNCTION_TYPE: "unsupported_cloud_function_type",
    UPLOAD_SIZE: "upload_size",
};
exports.FunctionsMetadataKey = FunctionsMetadataKey;
/**
 * Metadata keys specific to HATS feedback
 * @enum {string}
 */
const HatsFeedbackMetadataKey = {
    EVENT_TYPE: "event_type",
    HATS_RESPONSE: "hats_response",
    HATS_SESSION_INDEX: "hats_session_index",
    RESPONSE_TYPE: "response_type",
    SURVEY_INSTANCE_ID: "survey_instance_id",
};
exports.HatsFeedbackMetadataKey = HatsFeedbackMetadataKey;
/**
 * Metadata keys that are specific to Kubernetes / GKE
 * @enum {string}
 */
const KubernetesMetadataKey = {
    CLUSTER_TYPE: "cluster_type",
    IS_DEBUG: "is_debug",
    IS_EXISTING_CLUSTER: "is_existing_cluster",
    IS_KUBECTL_PROXIED: "is_kubectl_proxied",
    IS_LOCAL_DEPLOYMENT: "is_local_deployment",
    IS_PRIVATE: "is_private",
    MODE: "mode",
    MODULES: "modules",
    MODULE_TYPE: "module_type",
    PRIVATE_CLUSTER_TYPE: "private_cluster_type",
    RESOURCE: "resource",
    RESOURCE_VERSION: "resource_version",
    RESOURCE_KIND: "resource_kind",
};
exports.KubernetesMetadataKey = KubernetesMetadataKey;
/** @enum {string} */
const LogsViewerMetadataKey = {
    LOG_TYPE: "log_type",
};
exports.LogsViewerMetadataKey = LogsViewerMetadataKey;
/**
 * Metadata keys that are specific to managed dependencies (including Gcloud)
 * @enum {string}
 */
const ManagedDependenciesMetadataKey = {
    ARCH: "arch",
    COMPONENTS: "components",
    DEPENDENCY_FAILURE_REASON: "dependency_failure_reason",
    DEPENDENCY_STATE: "dependency_state",
    DEPENDENCY_STATE_START: "dependency_state_start",
    DEPENDENCY_STATE_TRANSITION_MS: "dependency_state_transition_ms",
    DEPS_REQUIRING_ACTION: "deps_requiring_action",
    EXISTING_GCLOUD_OPTION_SHOWN: "existing_gcloud_option_shown",
    FAILED_DEPENDENCIES: "failed_dependencies",
    FIRST_TIME_OPTION_SELECTED: "first_time_option_selected",
    FLAGS: "flags",
    INITIALIZED: "initialized",
    INSTALL_ATTEMPT: "install_attempt",
    INSTALL_CONDITION: "install_condition",
    IS_INITIALIZED: "is_initialized",
    IS_INSTALLED: "is_installed",
    IS_MANAGED: "is_managed",
    IS_OVERRIDDEN: "is_overridden",
    SIZE_MB: "size_in_MB",
    SPAWN_TYPE: "spawn_type",
    STEP: "step",
    URL: "url",
    VERSION: "version",
};
exports.ManagedDependenciesMetadataKey = ManagedDependenciesMetadataKey;
/**
 * Metadata keys that are specific to minikube
 * @enum {string}
 */
const MinikubeMetadataKey = {
    ADDON: "addon",
    DRIVER: "driver",
    ENABLED_ADDONS: "enabled_addons",
    ORIGINAL_SOURCE: "original_source",
    VERSION: "minikube_version",
};
exports.MinikubeMetadataKey = MinikubeMetadataKey;
/**
 * Metadata keys that are specific to project manager
 * @enum {string}
 */
const ProjectManagerMetadataKey = {
    SAMPLE_TYPE: "sample_type",
    TEMPLATE: "template",
};
exports.ProjectManagerMetadataKey = ProjectManagerMetadataKey;
/**
 * Metadata keys that are specific to secrets manager
 * @enum {string}
 */
const SecretMetadataKey = {
    METADATA_TYPE: "metadata_type",
};
exports.SecretMetadataKey = SecretMetadataKey;
/**
 * Metadata keys that are specific to Skaffold
 * @enum {string}
 */
const SkaffoldMetadataKey = {
    BUILD_ENVIRONMENT: "build_environment",
    BUILDER_TYPE: "builder_type",
    FAILURE_PHASE: "failure_phase",
    IS_DEFAULT_PROFILE: "is_default_profile",
    IS_LOCAL_DEPLOYMENT: "is_local_deployment",
    IS_SUB_TASK: "is_sub_task",
    IS_WATCH: "is_watch",
    ITERATION: "iteration",
    ITERATION_STATUSES: "iteration_statuses",
    PROMPT_TYPE: "prompt_type",
    REPO_TYPE: "repo_type",
    RESOURCE_DELETION_TIMEOUT_MINS: "resource_deletion_timeout_mins",
    SKAFFOLD_COMMAND: "skaffold_command",
    SKAFFOLD_IS_MANAGED: "managed",
    SKAFFOLD_METADATA: "skaffold_metadata",
    SKAFFOLD_SESSION_INDEX: "skaffold_session_index",
    SKAFFOLD_VERSION: "skaffold_version",
    TASK: "task",
    TASK_STATUS: "task_status",
};
exports.SkaffoldMetadataKey = SkaffoldMetadataKey;
/**
 * Metadata keys that are specific to our generic `tree_explorer` objects
 * @enum {string}
 */
const TreeExplorerMetadataKey = {
    COMMAND_RUN: "command_run",
    ERROR_TYPE: "error_type",
};
exports.TreeExplorerMetadataKey = TreeExplorerMetadataKey;
/**
 * Metadata keys that are specific to Cloud Code update/version information
 * @enum {string}
 */
const UpdateManagerMetadataKey = {
    CHANNEL_NAME: "channel_name",
    SETTING_CHANGED: "setting_changed",
    VERSION_INSTALLED: "version_installed",
};
exports.UpdateManagerMetadataKey = UpdateManagerMetadataKey;
/**
 * Metadata keys that are specific to upgrades.
 * @enum {string}
 */
const UpgradeMetadataKey = {
    UPGRADE_SOURCE: "upgrade_source",
    TIER_CHANGE: "tier_change",
    UPGRADE_TYPE: "upgrade_type",
};
exports.UpgradeMetadataKey = UpgradeMetadataKey;
/**
 * Metadata keys that are specific to campaign notifications.
 * @enum {string}
 */
const CampaignNotificationMetadataKey = {
    CAMPAIGN_ID: "campaign_id",
    ACTION: "action",
};
exports.CampaignNotificationMetadataKey = CampaignNotificationMetadataKey;
/**
 * Metadata keys that are specific to Exclusion files like .gitignore and .aiexclude.
 * @enum {string}
 */
const ExclusionFilesMetadataKey = {
    EXCLUSION_FILE_SETTING_CHANGED: "exclusion_file_setting_changed",
    GITIGNORE_FILE_SETTING_CHANGED: "gitignore_file_setting_changed",
    SETTING_ON_FILE_STATE: "exclusion_file_setting_on_file_state",
};
exports.ExclusionFilesMetadataKey = ExclusionFilesMetadataKey;
/** @enum {string} */
const InlineDiffSettingMetadataKey = {
    DIFF_SETTING: "diff_setting",
};
exports.InlineDiffSettingMetadataKey = InlineDiffSettingMetadataKey;
/**
 * Metadata keys that are specific to Webviews
 * @enum {string}
 */
const WebviewMetadataKey = {
    EXTERNAL_URL_TARGET: "external_url_target",
};
exports.WebviewMetadataKey = WebviewMetadataKey;
/**
 * Metadata keys that are specific to the GCA onboarding
 * @enum {string}
 */
const OnboardingMetadataKey = {
    ONBOARD_SESSION_INDEX: "onboard_session_index",
    WEBFLOW_DURATION_MS: "webflow_duration_ms",
    TIER_ID: "tier_id",
    TOTAL_DURATION_MS: "total_duration_ms",
    ONBOARDING_STATUS: "onboarding_status",
};
exports.OnboardingMetadataKey = OnboardingMetadataKey;
/**
 * Metadata keys specific to Structured Code Edits in GCA Chat
 * @enum {string}
 */
const StructuredCodeEditsMetadataKey = {
    FILE_CHANGE_COUNT: "file_change_count",
    DIFF_CODE_BLOCK_COUNT: "diff_code_block_count",
    DIFF_CHANGED_LINES_COUNT: "diff_changed_lines_count",
    DIFF_ADDED_LINES_COUNT: "diff_added_lines_count",
    DIFF_BYTE_SIZE: "diff_byte_size",
    FILE_CHANGE_WITH_FAILED_HUNKS_COUNT: "file_change_with_failed_hunks_count",
};
exports.StructuredCodeEditsMetadataKey = StructuredCodeEditsMetadataKey;
/**
 * Metadata keys that are specific to the context source
 * @enum {string}
 */
const ContextSourceMetadataKey = {
    INCLUDED_FILES_COUNT: "included_files_count",
    EXCLUDED_FILES_COUNT: "excluded_files_count",
    CONTEXT_SOURCES_EXPAND_COUNT: "context_sources_expand_count",
    INCLUDED_FILES_EXPAND_COUNT: "included_files_expand_count",
    EXCLUDED_FILES_EXPAND_COUNT: "excluded_files_expand_count",
};
exports.ContextSourceMetadataKey = ContextSourceMetadataKey;
// LINT.IfChange(collection)
/**
 * A collection of all metadata keys.
 *
 * This allows for runtime checks to ensure no unacceptable keys are logged.
 * @type {!Set<(!tsickle_constants_1.AntigravityMetadataKey|!tsickle_constants_2.DataCloudMetadataKey|!tsickle_constants_3.LookerVSCodeMetadataKey|!ApigeeMetadataKey|!ApiMetadataKey|!AuthMetadataKey|!CloudRunMetadataKey|!CommonMetadataKey|!CrashFeedbackMetadataKey|!ComputeMetadataKey|!CustomSlashCommandMetadataKey|!DeploymentManagerMetadataKey|!DuetMetadataKey|!DuetMetadataV2Key|!ErrorStackMetadataKey|!ExperimentMetadataKey|!FunctionsMetadataKey|!HatsFeedbackMetadataKey|!KubernetesMetadataKey|!LogsViewerMetadataKey|!ManagedDependenciesMetadataKey|!MinikubeMetadataKey|!ProjectManagerMetadataKey|!SecretMetadataKey|!SkaffoldMetadataKey|!TreeExplorerMetadataKey|!UpdateManagerMetadataKey|!UpgradeMetadataKey|!CampaignNotificationMetadataKey|!ExclusionFilesMetadataKey|!InlineDiffSettingMetadataKey|!WebviewMetadataKey|!OnboardingMetadataKey|!StructuredCodeEditsMetadataKey|!ContextSourceMetadataKey)>}
 */
exports.ALL_METADATA_KEYS = new Set([
    ...Object.values(constants_1.AntigravityMetadataKey),
    ...Object.values(ApigeeMetadataKey),
    ...Object.values(ApiMetadataKey),
    ...Object.values(AuthMetadataKey),
    ...Object.values(CloudRunMetadataKey),
    ...Object.values(CustomSlashCommandMetadataKey),
    ...Object.values(CommonMetadataKey),
    ...Object.values(ComputeMetadataKey),
    ...Object.values(CrashFeedbackMetadataKey),
    ...Object.values(constants_2.DataCloudMetadataKey),
    ...Object.values(DeploymentManagerMetadataKey),
    ...Object.values(DuetMetadataKey),
    ...Object.values(DuetMetadataV2Key),
    ...Object.values(ErrorStackMetadataKey),
    ...Object.values(ExperimentMetadataKey),
    ...Object.values(FunctionsMetadataKey),
    ...Object.values(HatsFeedbackMetadataKey),
    ...Object.values(KubernetesMetadataKey),
    ...Object.values(LogsViewerMetadataKey),
    ...Object.values(constants_3.LookerVSCodeMetadataKey),
    ...Object.values(ManagedDependenciesMetadataKey),
    ...Object.values(MinikubeMetadataKey),
    ...Object.values(ProjectManagerMetadataKey),
    ...Object.values(SecretMetadataKey),
    ...Object.values(SkaffoldMetadataKey),
    ...Object.values(TreeExplorerMetadataKey),
    ...Object.values(UpdateManagerMetadataKey),
    ...Object.values(UpgradeMetadataKey),
    ...Object.values(WebviewMetadataKey),
    ...Object.values(OnboardingMetadataKey),
    ...Object.values(StructuredCodeEditsMetadataKey),
    ...Object.values(ContextSourceMetadataKey),
    ...Object.values(ExclusionFilesMetadataKey),
    ...Object.values(InlineDiffSettingMetadataKey),
    ...Object.values(CampaignNotificationMetadataKey),
]);
/**
 * A shared type of accepted MetadataKeys
 *
 * This allows for features such as autocomplete and linting support in the IDE
 * @typedef {(!tsickle_constants_1.AntigravityMetadataKey|!tsickle_constants_2.DataCloudMetadataKey|!tsickle_constants_3.LookerVSCodeMetadataKey|!ApigeeMetadataKey|!ApiMetadataKey|!AuthMetadataKey|!CloudRunMetadataKey|!CommonMetadataKey|!CrashFeedbackMetadataKey|!ComputeMetadataKey|!CustomSlashCommandMetadataKey|!DeploymentManagerMetadataKey|!DuetMetadataKey|!DuetMetadataV2Key|!ErrorStackMetadataKey|!ExperimentMetadataKey|!FunctionsMetadataKey|!HatsFeedbackMetadataKey|!KubernetesMetadataKey|!LogsViewerMetadataKey|!ManagedDependenciesMetadataKey|!MinikubeMetadataKey|!ProjectManagerMetadataKey|!SecretMetadataKey|!SkaffoldMetadataKey|!TreeExplorerMetadataKey|!UpdateManagerMetadataKey|!UpgradeMetadataKey|!CampaignNotificationMetadataKey|!ExclusionFilesMetadataKey|!InlineDiffSettingMetadataKey|!WebviewMetadataKey|!OnboardingMetadataKey|!StructuredCodeEditsMetadataKey|!ContextSourceMetadataKey)}
 */
exports.MetadataKey;
/**
 * Possible values for DuetMetadataKey.RELEASE_NOTES_SOURCE
 * @enum {string}
 */
const ReleaseNotesUrlSource = {
    STATUS_BAR: "STATUS_BAR",
    INFORMATION_NOTIFICATION: "INFORMATION_NOTIFICATION",
    CHAT: "CHAT",
};
exports.ReleaseNotesUrlSource = ReleaseNotesUrlSource;
/** @type {string} */
exports.TEST_MODE_NOTIFICATION_TITLE = 'TEST MODE: All metrics will be sent to the test environment.';
/**
 * Name of output channel for streamed metrics of a provided extension
 * @type {string}
 */
exports.TELEMETRY_OUTPUT_WINDOW_FORMAT = '%s Telemetry';
/**
 * Name of filtered telemetry output channel for streamed metrics of a provided extension
 * @type {string}
 */
exports.FILTERED_METRICS_OUTPUT_WINDOW_FORMAT = '%s Filtered Telemetry';
