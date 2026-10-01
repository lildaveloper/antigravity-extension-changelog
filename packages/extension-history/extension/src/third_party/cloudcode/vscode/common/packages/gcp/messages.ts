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
 * Generated from: third_party/cloudcode/vscode/common/packages/gcp/messages.ts
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
goog.module('google3.third_party.cloudcode.vscode.common.packages.gcp.messages');
var module = module || { id: 'third_party/cloudcode/vscode/common/packages/gcp/messages.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_util_1 = goog.requireType("google3.third_party.javascript.typings.node.node.util");
const tsickle_constants_2 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.gcp.constants");
const util_1 = goog.require('google3.third_party.javascript.typings.node.node.util');
const constants_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.gcp.constants');
/**
 * Class that contains messages used in the extension.
 */
class Message {
}
exports.Message = Message;
/**
 * \@param 0 Installed gcloud version.
 * \@param 1 Required gcloud version.
 */
Message.API_ENABLE_PROGRESS = `Enabling %s API in project %s...`;
Message.GCLOUD_INSTALL_MORE_RECENT_VERSION = 'Installed Google Cloud SDK version is %s. Expected minimum version %s';
Message.GOOGLE_CLOUD_CLI_NAME = 'Google Cloud CLI';
Message.GOOGLE_CLOUD_CLI_ALPHA_NAME = 'Google Cloud CLI Alpha';
Message.INSTALL = 'Install';
Message.READ_MORE = 'Read more';
Message.GCP_ACCESS_TOKEN_NEED_REFRESHED = 'Access token has expired, click here to refresh';
Message.GCP_LOGIN_REQUIRED = 'Click here to login to Google Cloud';
Message.GCLOUD_SIGNIN = 'Sign into Google Cloud SDK';
Message.INSTALLING_CLOUD_SDK = 'Cloud Code: Installing Cloud SDK...';
Message.UPDATING_CLOUD_SDK_COMPONENTS = 'Cloud Code: Updating Cloud SDK Components...';
Message.INSTALLING_CLOUD_SDK_COMPONENTS = 'Cloud Code: Installing Cloud SDK Components...';
Message.CONFIGURING_CLOUD_SDK_BUNDLED_PYTHON = 'Cloud Code: Configuring Cloud SDK Bundled Python...';
Message.GCLOUD_ARCH_NO_SUP = 'Unsupported architecture: %s';
Message.GCLOUD_FAIL_HASH = 'Downloaded SDK installer failed hash verification';
Message.GCLOUD_FAIL_CHECKSUM_EXTRACT = 'Unable to determine hash for the latest version of Cloud SDK';
Message.OBTAIN_ADC = 'Obtain GCP Application Default Credentials';
Message.OBTAIN_ADC_INFO_PROMPT = 'GCP Application Default Credentials ensure applications can authenticate to Google APIs when running locally. Obtain credentials now?';
Message.OBTAIN_ADC_QUICKPICK_PROMPT = 'Obtain application default credentials to authenticate with Google APIs in your app?';
Message.UPDATE_ADC_WARNING = 'Cloud Code has a new login flow. Now when you log in, your Application Default Credentials will be updated automatically. This ensures that GCP API calls through Cloud Code will work automatically.';
Message.PROCEED_TO_SIGNIN = 'Proceed to sign in';
Message.CANCEL_AND_LEARN_MORE = 'Cancel and learn more';
Message.LEARN_MORE = 'Learn more';
Message.GCLOUD_FAILED_DOWNLOAD = 'Failed to download the Google Cloud SDK';
Message.GCLOUD_AUTH_CONFIGURE_DOCKER_FAILED = 'Failed to configure docker authentication, Jib builds may fail to push to Google Container Registries as a result.  Error: %s';
Message.YES = 'Yes';
Message.NO = 'No';
Message.DONT_SHOW_AGAIN = `Don't show again`;
Message.LOGIN_ACCEPT_DESCRIPTION = 'sign in with GCP';
Message.CANCEL = 'cancel';
Message.ERROR_LOGIN = `Log in with your GCP account and try again.`;
Message.ERROR_PROJECT_SELECT = `Select a GCP project and try again.`;
Message.API_ENABLE_PROMPT = 'Enable GCP APIs';
Message.API_ENABLE_YES_NO = 'Do you want to enable %s GCP API under project %s?';
Message.API_ENABLE_ERROR = 'Enable the requisite GCP APIs and try again.';
Message.SIGNOUT_BUTTON_TEXT = 'Sign-out';
Message.SIGNOUT_MESSAGE = 'Google Cloud SDK Sign-out';
Message.SWITCH_ACCOUNT_BUTTON_TEXT = 'Switch Account';
Message.GCLOUD_INIT = 'Google Cloud SDK Initialization';
Message.DEFAULT = 'default';
Message.RECENTLY_USED = 'recently used';
Message.PROJECT_ID = 'id: %s';
Message.PICK_PROJECT = 'Select a Google Cloud Project';
Message.PICK_PROJECT_QUICKPICK_TITLE_TEMPLATE = '%s (%s)';
Message.SWITCH_PROJECT = '$(arrow-swap) Switch Project';
Message.STATUS_BAR_TITLE = 'Cloud Code';
Message.STATUS_BAR_TITLE_NO_PROJECT = 'Cloud Code - No Project selected';
Message.STATUS_BAR_CONNECT_TO_GOOGLE_CLOUD = '$(cloud) Cloud Code - Sign in';
Message.STATUS_BAR_NO_PROJECT = '$(cloud) Cloud Code - No Project';
Message.STATUS_BAR_PROJECT_WITH_ACCOUNT = '%s (%s)';
Message.STATUS_BAR_PROJECT = '$(cloud) %s';
Message.STATUS_BAR_SELECT_PROJECT = '$(cloud) Select a Google Cloud project';
Message.CREATE_NEW_GCP_PROJECT_QUICKPICK_LABEL = '$(add) Create a New Google Cloud Project';
Message.REFRESH_PROJECTS = 'Refresh Project List';
Message.REFRESH_QUICKPICK_LABEL = '$(refresh) Refresh';
Message.LOAD_MORE_QUICKPICK_LABEL = 'Load more';
Message.LOAD_MORE_QUICKPICK_DETAIL = 'Load more projects';
Message.REFRESH_QUICKPICK_DETAIL = 'Refresh this view and then select your new project after it is created.';
Message.RETRY = 'retry';
Message.OPTION_CONTINUE_WITH_MANAGED_DEPENDENCIES = 'Continue with Managed Dependencies';
Message.DESCRIPTION_CONTINUE_WITH_MANAGED_DEPENDENCIES = 'This will install a hidden Google Cloud SDK just for use in Cloud Code. This may take a while.';
Message.OPTION_CONTINUE_WITH_EXISTING_GCLOUD_INSTALL = 'Continue with existing Google Cloud CLI installation';
Message.DESCRIPTION_USE_EXISTING_GCLOUD_INSTALL = 'Found in path at %s';
Message.OPTION_INSTALL_GCLOUD = 'Install the Google Cloud CLI';
Message.DESCRIPTION_INSTALL_GCLOUD = 'This will cancel the current operation';
Message.TITLE_GCLOUD_FIRST_TIME_PROMPT = 'This operation requires the Google Cloud CLI';
Message.TITLE_GCLOUD_COMPONENT_FIRST_TIME_PROMPT = 'This operation requires %s, a component of the Google Cloud CLI';
Message.INSTALLER_OUTPUT_CHANNEL_NAME = `Google Cloud CLI Installation`;
Message.STARTING_GCLOUD_INSTALL = 'Starting installation process...';
Message.STATUS_GCLOUD_OVERRIDDEN = 'The path to Google Cloud CLI set in VS Code Settings is being used.';
Message.STATUS_GCLOUD_MANAGED = 'Google Cloud CLI is being managed by Cloud Code.';
Message.STATUS_GCLOUD_UNMANAGED = 'The Google Cloud CLI from your PATH is being used.';
Message.STATUS_GCLOUD_BINARY_PATH_FOUND_FORMAT = `It is found at %s.`;
Message.STATUS_GCLOUD_BINARY_PATH_NOT_FOUND = 'The binary cannot be found.';
Message.INSTALL_FAILED = 'Failed to install %s: %s';
Message.UPGRADE_FAILED = 'Failed to upgrade %s: %s';
Message.DEPENDENCY_MISSING = 'This operation is dependent on %s, which is not installed. Please try again after installing.';
Message.DEPENDENCY_STALE = 'This operation is dependent on %s, which is out of date. Please try again after updating.';
Message.INSTALL_DEPENDENCIES_DESCRIPTION = `Run gcloud components update && gcloud components install ${constants_1.REQUIRED_COMPONENTS.join(', ')}`;
Message.INSTALL_DEPENDENCIES_PROMPT = '%s required for this operation';
Message.INSTALL_DEPENDENCIES_PLACEHOLDER = 'Would you like to install all Google Cloud CLI Components';
Message.DEPENDECY_OUT_OF_DATE_DESCRIPTION = 'Run gcloud components update';
Message.DEPENDENCY_OUT_OF_DATE_PROMPT = '%s >= %s required for this operation, %s installed';
Message.DEPENDENCY_OUT_OF_DATE_PLACEHOLDER = 'Would you like to update all Google Cloud CLI Components';
Message.DEPENDENCIES_CANCEL = 'Cancels the operation';
// #region Error messages.
// All error messages should have a regex defined in ErrorMessageRegexes for logging purposes
Message.UNSUPPORTED_OS = 'OS %s is not supported.';
Message.FAILED_LIST_CLOUDRUN_MANAGED = `cannot get list of cloud run managed services: %s`;
Message.FAILED_LIST_CLOUDRUN_MANAGED_REVISIONS = `cannot get list of cloud run managed revisions: %s`;
Message.FAILED_DETAILS_CLOUDRUN_MANAGED_SERVICE = `cannot get details of cloud run managed service %s: %s`;
Message.FAILED_LIST_PROJECTS = `cannot get list of projects: %s`;
Message.FAILED_LIST_ENABLED_API = `cannot get list of enabled APIS: %s`;
Message.FAILED_ENABLE_SERVICES = `cannot enable services: %s`;
Message.FAILED_CLOUDSHELL_SSH = `cannot get cloud-shell ssh command: %s`;
Message.INSTALL_GCLOUD_INSTRUCTION = `Cloud SDK not found. Install Cloud SDK manually following [these steps](https://cloud.google.com/sdk/install).`;
Message.GCLOUD_CURRENTLY_UNAVAILABLE = 'Managed dependencies are currently unavailable due to failure.  Cloud Code will reattempt to install managed dependencies after Visual Studio Code is restarted. %s';
Message.GCLOUD_VALIDATION_FAILED = 'Cloud SDK was installed but was found to be invalid or corrupted so it was removed. Attempting to reinstall. Managed dependencies will be unavailable during this process. (install attempt %s)';
Message.GCLOUD_INSTALL_FAILED = 'Failed to install Cloud SDK. %s';
Message.GCLOUD_COMPONENTS_UPDATE_FAILED = 'Failed to update Cloud SDK to the latest version. %s';
Message.GCLOUD_COMPONENTS_INSTALL_FAILED = 'Failed to install required Cloud SDK components. %s';
Message.CREDENTIALS_CANNOT_BE_FETCHED = 'Credentials cannot be fetched';
Message.OPERATION_TIMEOUT = 'Operation timed out. Please try again.';
Message.FAILED_FETCH_CLUSTER_CONFIG = 'cannot fetch configs for cluster %s in region %s';
Message.FAILED_TO_LIST_ARTIFACT_REGISTRY_REGIONS = 'Failed to list Artifact Registry regions: %s';
Message.FAILED_TO_LIST_ARTIFACT_REGISTRY_REPOS = 'Failed to list Artifact Registry repositories: %s';
Message.FAILED_TO_ADD_REGISTRY_TO_CONFIG = 'Failed to add registry %s to the docker config: %s';
Message.SSH_TERMINAL_TITLE = `SSH for Compute Instance "%s"`;
Message.SCP_TERMINAL_TITLE = `SCP for Compute Instance "%s"`;
Message.SCP_PROGRESS_BAR_TITLE = `Uploading File to Compute Instance "%s"`;
Message.SSH_TROUBLESHOOT_TERMINAL_TITLE = `SSH Troubleshoot for Compute Instance "%s"`;
Message.WINDOWS_FILE_UPLOAD_TERMINAL_WARNING = `File Upload via SCP is only supported for GCE Linux-based VMs. To upload files to a GCE Windows VM, please see https://cloud.google.com/compute/docs/instances/transfer-files-windows\r\n\r\n`;
Message.TRY_AGAIN_AFTER_GCLOUD_INSTALL_INSTRUCTIONS = 'Try again after installing Google Cloud CLI, per the on-screen instructions.';
Message.TRY_AGAIN_AND_MAKE_INSTALL_SELECTION = 'Try again and select how you want to install Google Cloud CLI.';
Message.OVERRIDE_GCLOUD_NOT_FOUND = 'Could not find the version of Google Cloud CLI at the path set in the `cloudcode.dependencyPaths` setting. Please ensure this path is a valid `gcloud` binary.';
Message.OPEN_WELCOME_PAGE = '$(book) Open Welcome Page';
Message.MANAGE_GOOGLE_APIS = '$(search) Search Google Cloud APIs';
Message.NEW_APPLICATION = '$(new-folder) New Application';
Message.RUN_ON_KUBERNETES = '$(play) Run on Kubernetes';
Message.DEBUG_ON_KUBERNETES = '$(debug) Debug on Kubernetes';
Message.CLOUDRUN_RUN_LOCALLY_STATUS_BAR_NAME = '$(play) Run on Cloud Run Emulator';
Message.CLOUDRUN_DEBUG_LOCALLY_STATUS_BAR_NAME = '$(debug) Debug on Cloud Run Emulator';
Message.CLOUDRUN_DEPLOY_STATUS_BAR_NAME = '$(cloud-upload) Deploy to Cloud Run';
Message.MINIKUBE_BAR_NAME = '$(gear) Control minikube';
/* istanbul ignore if */
if (false) {
    /**
     * \@param 0 Installed gcloud version.
     * \@param 1 Required gcloud version.
     * @const {string}
     * @public
     */
    Message.API_ENABLE_PROGRESS;
    /**
     * @const {string}
     * @public
     */
    Message.GCLOUD_INSTALL_MORE_RECENT_VERSION;
    /**
     * @const {string}
     * @public
     */
    Message.GOOGLE_CLOUD_CLI_NAME;
    /**
     * @const {string}
     * @public
     */
    Message.GOOGLE_CLOUD_CLI_ALPHA_NAME;
    /**
     * @const {string}
     * @public
     */
    Message.INSTALL;
    /**
     * @const {string}
     * @public
     */
    Message.READ_MORE;
    /**
     * @const {string}
     * @public
     */
    Message.GCP_ACCESS_TOKEN_NEED_REFRESHED;
    /**
     * @const {string}
     * @public
     */
    Message.GCP_LOGIN_REQUIRED;
    /**
     * @const {string}
     * @public
     */
    Message.GCLOUD_SIGNIN;
    /**
     * @const {string}
     * @public
     */
    Message.INSTALLING_CLOUD_SDK;
    /**
     * @const {string}
     * @public
     */
    Message.UPDATING_CLOUD_SDK_COMPONENTS;
    /**
     * @const {string}
     * @public
     */
    Message.INSTALLING_CLOUD_SDK_COMPONENTS;
    /**
     * @const {string}
     * @public
     */
    Message.CONFIGURING_CLOUD_SDK_BUNDLED_PYTHON;
    /**
     * @const {string}
     * @public
     */
    Message.GCLOUD_ARCH_NO_SUP;
    /**
     * @const {string}
     * @public
     */
    Message.GCLOUD_FAIL_HASH;
    /**
     * @const {string}
     * @public
     */
    Message.GCLOUD_FAIL_CHECKSUM_EXTRACT;
    /**
     * @const {string}
     * @public
     */
    Message.OBTAIN_ADC;
    /**
     * @const {string}
     * @public
     */
    Message.OBTAIN_ADC_INFO_PROMPT;
    /**
     * @const {string}
     * @public
     */
    Message.OBTAIN_ADC_QUICKPICK_PROMPT;
    /**
     * @const {string}
     * @public
     */
    Message.UPDATE_ADC_WARNING;
    /**
     * @const {string}
     * @public
     */
    Message.PROCEED_TO_SIGNIN;
    /**
     * @const {string}
     * @public
     */
    Message.CANCEL_AND_LEARN_MORE;
    /**
     * @const {string}
     * @public
     */
    Message.LEARN_MORE;
    /**
     * @const {string}
     * @public
     */
    Message.GCLOUD_FAILED_DOWNLOAD;
    /**
     * @const {string}
     * @public
     */
    Message.GCLOUD_AUTH_CONFIGURE_DOCKER_FAILED;
    /**
     * @const {string}
     * @public
     */
    Message.YES;
    /**
     * @const {string}
     * @public
     */
    Message.NO;
    /**
     * @const {string}
     * @public
     */
    Message.DONT_SHOW_AGAIN;
    /**
     * @const {string}
     * @public
     */
    Message.LOGIN_ACCEPT_DESCRIPTION;
    /**
     * @const {string}
     * @public
     */
    Message.CANCEL;
    /**
     * @const {string}
     * @public
     */
    Message.ERROR_LOGIN;
    /**
     * @const {string}
     * @public
     */
    Message.ERROR_PROJECT_SELECT;
    /**
     * @const {string}
     * @public
     */
    Message.API_ENABLE_PROMPT;
    /**
     * @const {string}
     * @public
     */
    Message.API_ENABLE_YES_NO;
    /**
     * @const {string}
     * @public
     */
    Message.API_ENABLE_ERROR;
    /**
     * @const {string}
     * @public
     */
    Message.SIGNOUT_BUTTON_TEXT;
    /**
     * @const {string}
     * @public
     */
    Message.SIGNOUT_MESSAGE;
    /**
     * @const {string}
     * @public
     */
    Message.SWITCH_ACCOUNT_BUTTON_TEXT;
    /**
     * @const {string}
     * @public
     */
    Message.GCLOUD_INIT;
    /**
     * @const {string}
     * @public
     */
    Message.DEFAULT;
    /**
     * @const {string}
     * @public
     */
    Message.RECENTLY_USED;
    /**
     * @const {string}
     * @public
     */
    Message.PROJECT_ID;
    /**
     * @const {string}
     * @public
     */
    Message.PICK_PROJECT;
    /**
     * @const {string}
     * @public
     */
    Message.PICK_PROJECT_QUICKPICK_TITLE_TEMPLATE;
    /**
     * @const {string}
     * @public
     */
    Message.SWITCH_PROJECT;
    /**
     * @const {string}
     * @public
     */
    Message.STATUS_BAR_TITLE;
    /**
     * @const {string}
     * @public
     */
    Message.STATUS_BAR_TITLE_NO_PROJECT;
    /**
     * @const {string}
     * @public
     */
    Message.STATUS_BAR_CONNECT_TO_GOOGLE_CLOUD;
    /**
     * @const {string}
     * @public
     */
    Message.STATUS_BAR_NO_PROJECT;
    /**
     * @const {string}
     * @public
     */
    Message.STATUS_BAR_PROJECT_WITH_ACCOUNT;
    /**
     * @const {string}
     * @public
     */
    Message.STATUS_BAR_PROJECT;
    /**
     * @const {string}
     * @public
     */
    Message.STATUS_BAR_SELECT_PROJECT;
    /**
     * @const {string}
     * @public
     */
    Message.CREATE_NEW_GCP_PROJECT_QUICKPICK_LABEL;
    /**
     * @const {string}
     * @public
     */
    Message.REFRESH_PROJECTS;
    /**
     * @const {string}
     * @public
     */
    Message.REFRESH_QUICKPICK_LABEL;
    /**
     * @const {string}
     * @public
     */
    Message.LOAD_MORE_QUICKPICK_LABEL;
    /**
     * @const {string}
     * @public
     */
    Message.LOAD_MORE_QUICKPICK_DETAIL;
    /**
     * @const {string}
     * @public
     */
    Message.REFRESH_QUICKPICK_DETAIL;
    /**
     * @const {string}
     * @public
     */
    Message.RETRY;
    /**
     * @const {string}
     * @public
     */
    Message.OPTION_CONTINUE_WITH_MANAGED_DEPENDENCIES;
    /**
     * @const {string}
     * @public
     */
    Message.DESCRIPTION_CONTINUE_WITH_MANAGED_DEPENDENCIES;
    /**
     * @const {string}
     * @public
     */
    Message.OPTION_CONTINUE_WITH_EXISTING_GCLOUD_INSTALL;
    /**
     * @const {string}
     * @public
     */
    Message.DESCRIPTION_USE_EXISTING_GCLOUD_INSTALL;
    /**
     * @const {string}
     * @public
     */
    Message.OPTION_INSTALL_GCLOUD;
    /**
     * @const {string}
     * @public
     */
    Message.DESCRIPTION_INSTALL_GCLOUD;
    /**
     * @const {string}
     * @public
     */
    Message.TITLE_GCLOUD_FIRST_TIME_PROMPT;
    /**
     * @const {string}
     * @public
     */
    Message.TITLE_GCLOUD_COMPONENT_FIRST_TIME_PROMPT;
    /**
     * @const {string}
     * @public
     */
    Message.INSTALLER_OUTPUT_CHANNEL_NAME;
    /**
     * @const {string}
     * @public
     */
    Message.STARTING_GCLOUD_INSTALL;
    /**
     * @const {string}
     * @public
     */
    Message.STATUS_GCLOUD_OVERRIDDEN;
    /**
     * @const {string}
     * @public
     */
    Message.STATUS_GCLOUD_MANAGED;
    /**
     * @const {string}
     * @public
     */
    Message.STATUS_GCLOUD_UNMANAGED;
    /**
     * @const {string}
     * @public
     */
    Message.STATUS_GCLOUD_BINARY_PATH_FOUND_FORMAT;
    /**
     * @const {string}
     * @public
     */
    Message.STATUS_GCLOUD_BINARY_PATH_NOT_FOUND;
    /**
     * @const {string}
     * @public
     */
    Message.INSTALL_FAILED;
    /**
     * @const {string}
     * @public
     */
    Message.UPGRADE_FAILED;
    /**
     * @const {string}
     * @public
     */
    Message.DEPENDENCY_MISSING;
    /**
     * @const {string}
     * @public
     */
    Message.DEPENDENCY_STALE;
    /**
     * @const {string}
     * @public
     */
    Message.INSTALL_DEPENDENCIES_DESCRIPTION;
    /**
     * @const {string}
     * @public
     */
    Message.INSTALL_DEPENDENCIES_PROMPT;
    /**
     * @const {string}
     * @public
     */
    Message.INSTALL_DEPENDENCIES_PLACEHOLDER;
    /**
     * @const {string}
     * @public
     */
    Message.DEPENDECY_OUT_OF_DATE_DESCRIPTION;
    /**
     * @const {string}
     * @public
     */
    Message.DEPENDENCY_OUT_OF_DATE_PROMPT;
    /**
     * @const {string}
     * @public
     */
    Message.DEPENDENCY_OUT_OF_DATE_PLACEHOLDER;
    /**
     * @const {string}
     * @public
     */
    Message.DEPENDENCIES_CANCEL;
    /**
     * @const {string}
     * @public
     */
    Message.UNSUPPORTED_OS;
    /**
     * @const {string}
     * @public
     */
    Message.FAILED_LIST_CLOUDRUN_MANAGED;
    /**
     * @const {string}
     * @public
     */
    Message.FAILED_LIST_CLOUDRUN_MANAGED_REVISIONS;
    /**
     * @const {string}
     * @public
     */
    Message.FAILED_DETAILS_CLOUDRUN_MANAGED_SERVICE;
    /**
     * @const {string}
     * @public
     */
    Message.FAILED_LIST_PROJECTS;
    /**
     * @const {string}
     * @public
     */
    Message.FAILED_LIST_ENABLED_API;
    /**
     * @const {string}
     * @public
     */
    Message.FAILED_ENABLE_SERVICES;
    /**
     * @const {string}
     * @public
     */
    Message.FAILED_CLOUDSHELL_SSH;
    /**
     * @const {string}
     * @public
     */
    Message.INSTALL_GCLOUD_INSTRUCTION;
    /**
     * @const {string}
     * @public
     */
    Message.GCLOUD_CURRENTLY_UNAVAILABLE;
    /**
     * @const {string}
     * @public
     */
    Message.GCLOUD_VALIDATION_FAILED;
    /**
     * @const {string}
     * @public
     */
    Message.GCLOUD_INSTALL_FAILED;
    /**
     * @const {string}
     * @public
     */
    Message.GCLOUD_COMPONENTS_UPDATE_FAILED;
    /**
     * @const {string}
     * @public
     */
    Message.GCLOUD_COMPONENTS_INSTALL_FAILED;
    /**
     * @const {string}
     * @public
     */
    Message.CREDENTIALS_CANNOT_BE_FETCHED;
    /**
     * @const {string}
     * @public
     */
    Message.OPERATION_TIMEOUT;
    /**
     * @const {string}
     * @public
     */
    Message.FAILED_FETCH_CLUSTER_CONFIG;
    /**
     * @const {string}
     * @public
     */
    Message.FAILED_TO_LIST_ARTIFACT_REGISTRY_REGIONS;
    /**
     * @const {string}
     * @public
     */
    Message.FAILED_TO_LIST_ARTIFACT_REGISTRY_REPOS;
    /**
     * @const {string}
     * @public
     */
    Message.FAILED_TO_ADD_REGISTRY_TO_CONFIG;
    /**
     * @const {string}
     * @public
     */
    Message.SSH_TERMINAL_TITLE;
    /**
     * @const {string}
     * @public
     */
    Message.SCP_TERMINAL_TITLE;
    /**
     * @const {string}
     * @public
     */
    Message.SCP_PROGRESS_BAR_TITLE;
    /**
     * @const {string}
     * @public
     */
    Message.SSH_TROUBLESHOOT_TERMINAL_TITLE;
    /**
     * @const {string}
     * @public
     */
    Message.WINDOWS_FILE_UPLOAD_TERMINAL_WARNING;
    /**
     * @const {string}
     * @public
     */
    Message.TRY_AGAIN_AFTER_GCLOUD_INSTALL_INSTRUCTIONS;
    /**
     * @const {string}
     * @public
     */
    Message.TRY_AGAIN_AND_MAKE_INSTALL_SELECTION;
    /**
     * @const {string}
     * @public
     */
    Message.OVERRIDE_GCLOUD_NOT_FOUND;
    /**
     * @const {string}
     * @public
     */
    Message.OPEN_WELCOME_PAGE;
    /**
     * @const {string}
     * @public
     */
    Message.MANAGE_GOOGLE_APIS;
    /**
     * @const {string}
     * @public
     */
    Message.NEW_APPLICATION;
    /**
     * @const {string}
     * @public
     */
    Message.RUN_ON_KUBERNETES;
    /**
     * @const {string}
     * @public
     */
    Message.DEBUG_ON_KUBERNETES;
    /**
     * @const {string}
     * @public
     */
    Message.CLOUDRUN_RUN_LOCALLY_STATUS_BAR_NAME;
    /**
     * @const {string}
     * @public
     */
    Message.CLOUDRUN_DEBUG_LOCALLY_STATUS_BAR_NAME;
    /**
     * @const {string}
     * @public
     */
    Message.CLOUDRUN_DEPLOY_STATUS_BAR_NAME;
    /**
     * @const {string}
     * @public
     */
    Message.MINIKUBE_BAR_NAME;
}
/** @type {string} */
const wildcard = '.*';
/**
 * Class containing Regexes for gcloud errors.
 */
class ErrorMessageRegexes {
}
exports.ErrorMessageRegexes = ErrorMessageRegexes;
ErrorMessageRegexes.UNSUPPORTED_OS = new RegExp((0, util_1.format)(Message.UNSUPPORTED_OS, wildcard));
ErrorMessageRegexes.FAILED_LIST_CLOUDRUN_MANAGED = new RegExp((0, util_1.format)(Message.FAILED_LIST_CLOUDRUN_MANAGED, wildcard));
ErrorMessageRegexes.FAILED_LIST_CLOUDRUN_MANAGED_REVISIONS = new RegExp((0, util_1.format)(Message.FAILED_LIST_CLOUDRUN_MANAGED_REVISIONS, wildcard));
ErrorMessageRegexes.FAILED_DETAILS_CLOUDRUN_MANAGED_SERVICE = new RegExp((0, util_1.format)(Message.FAILED_DETAILS_CLOUDRUN_MANAGED_SERVICE, wildcard, wildcard));
ErrorMessageRegexes.FAILED_LIST_PROJECTS = new RegExp((0, util_1.format)(Message.FAILED_LIST_PROJECTS, wildcard));
ErrorMessageRegexes.FAILED_LIST_ENABLED_API = new RegExp((0, util_1.format)(Message.FAILED_LIST_ENABLED_API, wildcard));
ErrorMessageRegexes.FAILED_ENABLE_SERVICES = new RegExp((0, util_1.format)(Message.FAILED_ENABLE_SERVICES, wildcard));
ErrorMessageRegexes.FAILED_CLOUDSHELL_SSH = new RegExp((0, util_1.format)(Message.FAILED_CLOUDSHELL_SSH, wildcard));
ErrorMessageRegexes.INSTALL_GCLOUD_INSTRUCTION = new RegExp(Message.INSTALL_GCLOUD_INSTRUCTION);
ErrorMessageRegexes.GCLOUD_CURRENTLY_UNAVAILABLE = new RegExp((0, util_1.format)(Message.GCLOUD_CURRENTLY_UNAVAILABLE, wildcard));
ErrorMessageRegexes.GCLOUD_VALIDATION_FAILED = new RegExp((0, util_1.format)(Message.GCLOUD_VALIDATION_FAILED, wildcard));
ErrorMessageRegexes.GCLOUD_INSTALL_FAILED = new RegExp((0, util_1.format)(Message.GCLOUD_INSTALL_FAILED, wildcard));
ErrorMessageRegexes.GCLOUD_COMPONENTS_UPDATE_FAILED = new RegExp((0, util_1.format)(Message.GCLOUD_COMPONENTS_UPDATE_FAILED, wildcard));
ErrorMessageRegexes.GCLOUD_COMPONENTS_INSTALL_FAILED = new RegExp((0, util_1.format)(Message.GCLOUD_COMPONENTS_INSTALL_FAILED, wildcard));
ErrorMessageRegexes.CREDENTIALS_CANNOT_BE_FETCHED = new RegExp(Message.CREDENTIALS_CANNOT_BE_FETCHED);
ErrorMessageRegexes.OPERATION_TIMEOUT = new RegExp(Message.OPERATION_TIMEOUT);
ErrorMessageRegexes.FAILED_FETCH_CLUSTER_CONFIG = new RegExp((0, util_1.format)(Message.FAILED_FETCH_CLUSTER_CONFIG, wildcard, wildcard));
ErrorMessageRegexes.FAILED_TO_LIST_ARTIFACT_REGISTRY_REGIONS = new RegExp((0, util_1.format)(Message.FAILED_TO_LIST_ARTIFACT_REGISTRY_REGIONS, wildcard));
ErrorMessageRegexes.FAILED_TO_ADD_REGISTRY_TO_CONFIG = new RegExp((0, util_1.format)(Message.FAILED_TO_ADD_REGISTRY_TO_CONFIG, wildcard));
ErrorMessageRegexes.SSH_TERMINAL_TITLE = new RegExp((0, util_1.format)(Message.SSH_TERMINAL_TITLE, wildcard));
ErrorMessageRegexes.SSH_TROUBLESHOOT_TERMINAL_TITLE = new RegExp((0, util_1.format)(Message.SSH_TROUBLESHOOT_TERMINAL_TITLE, wildcard));
ErrorMessageRegexes.ALL_REGEXES = [
    ErrorMessageRegexes.UNSUPPORTED_OS,
    ErrorMessageRegexes.FAILED_LIST_CLOUDRUN_MANAGED,
    ErrorMessageRegexes.FAILED_LIST_CLOUDRUN_MANAGED_REVISIONS,
    ErrorMessageRegexes.FAILED_DETAILS_CLOUDRUN_MANAGED_SERVICE,
    ErrorMessageRegexes.FAILED_LIST_PROJECTS,
    ErrorMessageRegexes.FAILED_LIST_ENABLED_API,
    ErrorMessageRegexes.FAILED_ENABLE_SERVICES,
    ErrorMessageRegexes.FAILED_CLOUDSHELL_SSH,
    ErrorMessageRegexes.INSTALL_GCLOUD_INSTRUCTION,
    ErrorMessageRegexes.GCLOUD_CURRENTLY_UNAVAILABLE,
    ErrorMessageRegexes.GCLOUD_VALIDATION_FAILED,
    ErrorMessageRegexes.GCLOUD_INSTALL_FAILED,
    ErrorMessageRegexes.GCLOUD_COMPONENTS_UPDATE_FAILED,
    ErrorMessageRegexes.GCLOUD_COMPONENTS_INSTALL_FAILED,
    ErrorMessageRegexes.CREDENTIALS_CANNOT_BE_FETCHED,
    ErrorMessageRegexes.OPERATION_TIMEOUT,
    ErrorMessageRegexes.FAILED_FETCH_CLUSTER_CONFIG,
    ErrorMessageRegexes.FAILED_TO_LIST_ARTIFACT_REGISTRY_REGIONS,
    ErrorMessageRegexes.FAILED_TO_ADD_REGISTRY_TO_CONFIG,
    ErrorMessageRegexes.SSH_TERMINAL_TITLE,
    ErrorMessageRegexes.SSH_TROUBLESHOOT_TERMINAL_TITLE,
];
/* istanbul ignore if */
if (false) {
    /**
     * @const {!RegExp}
     * @public
     */
    ErrorMessageRegexes.UNSUPPORTED_OS;
    /**
     * @const {!RegExp}
     * @public
     */
    ErrorMessageRegexes.FAILED_LIST_CLOUDRUN_MANAGED;
    /**
     * @const {!RegExp}
     * @public
     */
    ErrorMessageRegexes.FAILED_LIST_CLOUDRUN_MANAGED_REVISIONS;
    /**
     * @const {!RegExp}
     * @public
     */
    ErrorMessageRegexes.FAILED_DETAILS_CLOUDRUN_MANAGED_SERVICE;
    /**
     * @const {!RegExp}
     * @public
     */
    ErrorMessageRegexes.FAILED_LIST_PROJECTS;
    /**
     * @const {!RegExp}
     * @public
     */
    ErrorMessageRegexes.FAILED_LIST_ENABLED_API;
    /**
     * @const {!RegExp}
     * @public
     */
    ErrorMessageRegexes.FAILED_ENABLE_SERVICES;
    /**
     * @const {!RegExp}
     * @public
     */
    ErrorMessageRegexes.FAILED_CLOUDSHELL_SSH;
    /**
     * @const {!RegExp}
     * @public
     */
    ErrorMessageRegexes.INSTALL_GCLOUD_INSTRUCTION;
    /**
     * @const {!RegExp}
     * @public
     */
    ErrorMessageRegexes.GCLOUD_CURRENTLY_UNAVAILABLE;
    /**
     * @const {!RegExp}
     * @public
     */
    ErrorMessageRegexes.GCLOUD_VALIDATION_FAILED;
    /**
     * @const {!RegExp}
     * @public
     */
    ErrorMessageRegexes.GCLOUD_INSTALL_FAILED;
    /**
     * @const {!RegExp}
     * @public
     */
    ErrorMessageRegexes.GCLOUD_COMPONENTS_UPDATE_FAILED;
    /**
     * @const {!RegExp}
     * @public
     */
    ErrorMessageRegexes.GCLOUD_COMPONENTS_INSTALL_FAILED;
    /**
     * @const {!RegExp}
     * @public
     */
    ErrorMessageRegexes.CREDENTIALS_CANNOT_BE_FETCHED;
    /**
     * @const {!RegExp}
     * @public
     */
    ErrorMessageRegexes.OPERATION_TIMEOUT;
    /**
     * @const {!RegExp}
     * @public
     */
    ErrorMessageRegexes.FAILED_FETCH_CLUSTER_CONFIG;
    /**
     * @const {!RegExp}
     * @public
     */
    ErrorMessageRegexes.FAILED_TO_LIST_ARTIFACT_REGISTRY_REGIONS;
    /**
     * @const {!RegExp}
     * @public
     */
    ErrorMessageRegexes.FAILED_TO_ADD_REGISTRY_TO_CONFIG;
    /**
     * @const {!RegExp}
     * @public
     */
    ErrorMessageRegexes.SSH_TERMINAL_TITLE;
    /**
     * @const {!RegExp}
     * @public
     */
    ErrorMessageRegexes.SSH_TROUBLESHOOT_TERMINAL_TITLE;
    /**
     * @const {!Array<!RegExp>}
     * @public
     */
    ErrorMessageRegexes.ALL_REGEXES;
}
